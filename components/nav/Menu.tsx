import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Hamburger, Temperature } from '/components'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const t = useTranslations('Menu')
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [selected, setSelected] = useState<MenuItem | undefined>()
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
		//setMaxHeight(el ? el.scrollHeight : undefined)
	}, [selected])

	return (
		<>
			<Hamburger />
			<nav id="menu" ref={menuRef} className={s.menu}>
				<div className={s.wrapper}>
					<Temperature />
					<ul data-level={1}>
						{items.map(item =>
							<MenuTree
								item={item}
								level={2}
								selected={selected}
								setSelected={setSelected}
								path={path}
							/>
						)}
						<li><Search /></li>
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
}

export function MenuTree({ item, level, selected, setSelected, path }: MenuTreeProps) {
	const [isVisible, setIsVisible] = useState(false);

	const expand = () => {
		setIsVisible(!isVisible)
		setSelected(item)
	}

	const isSelected = path === item.slug
	const isLink = item.slug && !item.sub

	return (
		<>
			<li onClick={expand} className={cn(isSelected && s.active)}>
				{isLink ?
					<Link href={item.slug}>
						{item.label}
					</Link>
					:
					<>{item.label}</>
				}
				{item?.sub && isVisible &&
					<ul data-level={level} onClick={e => e.stopPropagation()}>
						{item.sub.map(item =>
							<MenuTree
								item={item}
								level={++level}
								selected={selected}
								setSelected={setSelected}
								path={path}
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