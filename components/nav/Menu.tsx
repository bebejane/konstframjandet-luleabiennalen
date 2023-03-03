import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import { Hamburger } from '/components'
import format from 'date-fns/format'
import Link from 'next/link'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const menuRef = useRef<HTMLDivElement | null>(null);
	const menuBarRef = useRef<HTMLUListElement | null>(null);
	const [selected, setSelected] = useState<string | undefined>()
	const router = useRouter()
	const [path, setPath] = useState(router.asPath)

	useEffect(() => {
		const handleRouteChangeStart = (path: string) => setPath(path)
		router.events.on('routeChangeStart', handleRouteChangeStart)
		return () => router.events.off('routeChangeStart', handleRouteChangeStart)
	}, [])


	return (
		<>
			<Hamburger />
			<nav id="menu" ref={menuRef} className={cn(s.menu)}>
				<div className={s.wrapper}>
					<TodaysInfo />
					<ul className={s.nav} ref={menuBarRef}>
						{items.map(({ label, slug, sub }, idx) => {
							const isActive = label === selected || path.startsWith(slug)
							return (
								<li
									key={idx}
									onClick={() => {
										setSelected(label === selected ? undefined : label)
										setPath(slug)
									}}
									className={cn(isActive && s.active)}
								>
									{sub ? label : <Link href={slug}>{label}</Link>}
									{sub &&
										<ul
											className={cn(s.sub, selected === label && s.selected)}
											onClick={(e) => e.stopPropagation()}
										>
											{sub.map(({ label, slug }) => {
												const isActiveSub = path === slug
												return (
													<li>
														<Link className={cn(isActiveSub && s.active)} href={slug}>{label}</Link>
													</li>
												)
											})}
										</ul>
									}
								</li>
							)
						})}

						<li>Sök</li>
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