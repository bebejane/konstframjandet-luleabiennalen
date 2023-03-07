import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Hamburger, Temperature } from '/components'
import useStore from '/lib/store'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const t = useTranslations('Menu')
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const router = useRouter()
	const [path, setPath] = useState(router.asPath)
	const [maxHeight, setMaxHeight] = useState<number | undefined>()
	const [showMenu] = useStore((state) => [state.showMenu])

	useEffect(() => {
		const handleRouteChangeStart = (path: string) => setPath(path)
		router.events.on('routeChangeStart', handleRouteChangeStart)
		return () => router.events.off('routeChangeStart', handleRouteChangeStart)
	}, [])

	useEffect(() => {
		//const el = document.getElementById(`menu-${selected}`)
		//setMaxHeight(el ? el.scrollHeight : undefined)
		//console.log(selected)
		//console.log(items)
	}, [selected])

	return (
		<>
			<Hamburger />
			<nav id="menu" ref={menuRef} className={cn(s.menu, !showMenu && s.hide)}>
				<div className={s.wrapper}>
					<Temperature />
					<ul data-level={0}>
						{items.map((item, idx) =>
							<MenuTree
								key={idx}
								item={item}
								level={2}
								selected={selected}
								setSelected={setSelected}
								path={path}
								locale={router.locale}
							/>
						)}
						<li>
							<Search />
						</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export type MenuTreeProps = {
	item: MenuItem
	level?: number,
	selected: MenuItem | undefined
	setSelected: (item: MenuItem) => void
	path: string
	locale: string
}

export function MenuTree({ item, level, selected, setSelected, path, locale }: MenuTreeProps) {
	const [isVisible, setIsVisible] = useState(false);
	const t = useTranslations('Menu')

	const expand = () => {
		setIsVisible(!isVisible)
		setSelected(item)
	}
	useEffect(() => {
		console.log(selected?.id, level)
		if (selected?.id !== item.id) {
			setIsVisible(false)
		}
	}, [selected])

	const isSelected = path === item.slug || path === `/${locale}${item.slug}`
	const isLink = item.slug && !item.sub
	const label = t(item.id) || item.label

	return (
		<>
			<li onClick={expand} className={cn(isSelected && s.active, item.root && s.bold)}>
				{isLink ?
					<Link href={item.slug}>
						{label}
					</Link>
					:
					<>{label}</>
				}
				{item?.sub && isVisible &&
					<ul data-level={level} onClick={e => e.stopPropagation()}>
						{item.sub.map((item, idx) =>
							<MenuTree
								key={idx}
								item={item}
								level={++level}
								selected={selected}
								setSelected={setSelected}
								path={path}
								locale={locale}
							/>
						)}
					</ul>
				}
			</li>
		</>
	);
}


const Search = () => {
	const t = useTranslations('Menu')
	return <input className={s.search} placeholder={t('search')} />
}