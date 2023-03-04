import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu } from '/lib/menu'
import { Hamburger } from '/components'
import format from 'date-fns/format'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const t = useTranslations('Menu')
	const menuRef = useRef<HTMLDivElement | null>(null);
	const menuBarRef = useRef<HTMLUListElement | null>(null);
	const [selected, setSelected] = useState<string | undefined>()
	const router = useRouter()
	const [path, setPath] = useState(router.asPath)
	const [maxHeight, setMaxHeight] = useState<number | undefined>()

	useEffect(() => {
		const handleRouteChangeStart = (path: string) => setPath(path)
		router.events.on('routeChangeStart', handleRouteChangeStart)
		return () => router.events.off('routeChangeStart', handleRouteChangeStart)
	}, [])

	useEffect(() => {
		const el = document.getElementById(`menu-${selected}`)
		setMaxHeight(el ? el.scrollHeight : undefined)
	}, [selected])

	return (
		<>
			<Hamburger />
			<nav id="menu" ref={menuRef} className={s.menu}>
				<div className={s.wrapper}>
					<TodaysInfo />
					<ul className={s.nav} ref={menuBarRef}>
						{items.map(({ id, slug, sub }, idx) => {
							const isActive = id === selected || path.startsWith(slug)
							return (
								<li
									key={id}
									id={`menu-${id}`}
									className={cn(isActive && s.active)}
									onClick={() => {
										setSelected(id === selected ? undefined : id)
										setPath(slug)
									}}
								>
									{sub ? t(id) : <Link href={slug}>{t(id)}</Link>}
									{sub &&
										<ul
											className={cn(s.sub, selected === id && s.selected)}
											style={{ maxHeight: maxHeight && selected === id ? `${maxHeight}px` : 0 }}
											onClick={(e) => e.stopPropagation()}
										>
											{sub.map(({ id, label, slug }, idx) =>
												<li key={`${id}-${idx}`}>
													<Link className={cn(path === slug && s.active)} href={slug}>
														{label}
													</Link>
												</li>
											)}
										</ul>
									}
								</li>
							)
						})}
						<li>{t('search')}</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export function TodaysInfo() {

	const [temp, setTemp] = useState<number | undefined>()

	const refreshWeather = async () => {

		try {
			const url = 'https://api.open-meteo.com/v1/forecast?latitude=65.58&longitude=22.15&hourly=temperature_2m&current_weather=true'
			const res = await fetch(url)
			const { current_weather: { temperature } } = await res.json()
			setTemp(temperature)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		refreshWeather()
		const i = setInterval(refreshWeather, 60 * 1000)
		return () => clearInterval(i)
	}, [])

	return (
		<span style={{ textTransform: 'capitalize' }}>
			{format(new Date(), 'dd MMM')}, {temp > 0 ? '+' : ''}{temp}°C
		</span>
	)
}