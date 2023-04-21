import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Hamburger, Temperature } from '/components'
import useStore from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { useWindowSize } from 'usehooks-ts'
import i18nPaths from '/lib/i18n/paths.json'
import useDevice from '/lib/hooks/useDevice'


export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const t = useTranslations('Menu')
	const router = useRouter()
	const { locale, defaultLocale } = router
	const menuRef = useRef<HTMLUListElement | null>(null);
	const [showMenu, setShowMenu, searchQuery, setSearchQuery] = useStore((state) => [state.showMenu, state.setShowMenu, state.searchQuery, state.setSearchQuery])
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const [searchFocus, setSearchFocus] = useState(false)
	const [path, setPath] = useState(router.asPath)
	const [query, setQuery] = useState('')
	const [menuPadding, setMenuPadding] = useState(0)
	const [footerScrollPosition, setFooterScrollPosition] = useState(0)
	const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()
	const { width, height } = useWindowSize()
	const { isDesktop, isMobile } = useDevice()

	const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSearchFocus(false)

		const segment = i18nPaths['search'][locale];
		const path = `/${locale === defaultLocale ? segment : `${locale}/${segment}`}`
		router.push(path, undefined, { shallow: true })

	}

	useEffect(() => {
		const handleRouteChangeStart = (path: string) => {
			setPath(path)
			setQuery(undefined)
			!isDesktop && setShowMenu(false)
		}
		router.events.on('routeChangeStart', handleRouteChangeStart)
		return () => router.events.off('routeChangeStart', handleRouteChangeStart)
	}, [isDesktop])

	useEffect(() => {

		const footerHeight = document.getElementById('footer').clientHeight - 1
		const menuOffset = menuRef.current.offsetTop
		const footerScrollPosition = (scrolledPosition + viewportHeight) < documentHeight - footerHeight ? 0 : footerHeight - (documentHeight - (scrolledPosition + viewportHeight))
		const menuPadding = isMobile ? (menuOffset + footerScrollPosition) : footerScrollPosition ? menuOffset + footerScrollPosition : 0

		setMenuPadding(menuPadding)
		setFooterScrollPosition(footerScrollPosition)

	}, [menuRef, selected, scrolledPosition, documentHeight, viewportHeight, width, height, isMobile])

	return (
		<>
			<Hamburger />
			<nav
				className={cn(s.menu, !showMenu && s.hide)}
				style={{ minHeight: `calc(100vh - ${footerScrollPosition}px - 1px)` }}
			>
				<Temperature />
				<ul
					data-level={0}
					ref={menuRef}
					style={{ maxHeight: `calc(100vh - ${menuPadding}px - 1rem)` }}
				>
					{items.map((item, idx) =>
						item.id !== 'search' ?
							<MenuTree
								key={idx}
								item={item}
								level={0}
								selected={selected}
								setSelected={setSelected}
								path={path}
								locale={router.locale}
							/>
							:
							<li key={idx} className={s.search}>
								<form onSubmit={onSubmitSearch}>
									<input
										name="q"
										placeholder={t('search')}
										autoComplete={'off'}
										value={searchQuery ?? ''}
										onFocus={() => setSearchFocus(true)}
										onBlur={() => setSearchFocus(false)}
										onChange={({ target: { value } }) => setSearchQuery(value)}
									/>
								</form>
								<div
									onClick={() => setSearchFocus(false)}
									className={cn(s.close, !searchFocus && s.hide)}
								>×</div>
							</li>
					)}
				</ul>
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

export function MenuTree({ item, level, selected, setSelected, path, locale, }: MenuTreeProps) {

	const expand = () => setSelected(item)
	const itemIncludesPath = (item: MenuItem) => {
		if (!item) return false
		const slugs = [item.slug, item.altSlug].map(s => s.startsWith(`/${locale}`) ? s.replace(`/${locale}`, '') : s)
		const p = path.startsWith(`/${locale}`) ? path.replace(`/${locale}`, '') : path
		return slugs.includes(p)
	}

	const isVisible = (path: string, item: MenuItem) => {
		if (itemIncludesPath(item)) return true
		if (!item.sub?.length) return false

		for (let i = 0; i < item.sub.length; i++) {
			if (item.sub[i].sub && isVisible(path, item.sub[i]))
				return true
			else if (itemIncludesPath(item.sub[i]))
				return true
		}
		return false
	}

	const isSelected = itemIncludesPath(item) && !item.virtual
	const isLink = item.slug
	const isBold = level === 0 || item.sub?.length > 0
	const label = item.label

	return (
		<li onClick={expand} data-parent={item.id} className={cn(isSelected && s.active, isBold && s.bold)}>
			{isLink ? <Link href={item.slug}>{label}</Link> : <>{label}</>}
			{item?.sub && isVisible(path, item) &&
				<ul data-level={++level} onClick={e => e.stopPropagation()}>
					{item.sub.map((item, idx) =>
						<MenuTree
							key={idx}
							item={item}
							level={level}
							selected={selected}
							setSelected={setSelected}
							path={path}
							locale={locale}
						/>
					)}
				</ul>
			}
		</li >
	);
}

