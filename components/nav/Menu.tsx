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
					<Temperature />
					<ul data-level={1}>
						{items.map(item => <MenuTree item={item} level={2} />)}
						<li>{t('search')}</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export function MenuTree({ item, level }: { item: MenuItem, level?: number }) {
	const [isVisible, setIsVisible] = useState(false);
	const expand = () => setIsVisible(!isVisible)

	return (
		<>
			<li onClick={expand}>
				{item.slug && !item.sub ?
					<Link href={item.slug}>
						{item.label}
					</Link>
					:
					<>{item.label}</>
				}
				{item?.sub && isVisible &&
					<ul data-level={level} onClick={e => e.stopPropagation()}>
						{item.sub.map(item =>
							<MenuTree item={item} level={++level} />
						)}
					</ul>
				}
			</li>
		</>
	);
}