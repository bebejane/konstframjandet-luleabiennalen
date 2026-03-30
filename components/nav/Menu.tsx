'use client';

import s from './Menu.module.scss';
import cn from 'classnames';
import { useState, useRef, useEffect } from 'react';
import type { Menu, MenuItem } from '@/lib/menu';
import { useLocale, useTranslations } from 'next-intl';
import { Hamburger, Language, MenuTree, Temperature } from '@/components';
import useStore, { useShallow } from '@/lib/store';
import { useScrollInfo } from 'next-dato-utils/hooks';
import { useWindowSize } from 'usehooks-ts';
import useDevice from '@/lib/hooks/useDevice';
import { usePathname } from 'next/navigation';

export type MenuProps = { menu: Menu };

export default function Menu({ menu }: MenuProps) {
	const t = useTranslations('Menu');
	const pathname = usePathname();
	const locale = useLocale();
	const treeRef = useRef<HTMLDivElement | null>(null);
	const [showMenu, setShowMenu, searchQuery, setSearchQuery] = useStore(
		useShallow((state) => [
			state.showMenu,
			state.setShowMenu,
			state.searchQuery,
			state.setSearchQuery,
		]),
	);
	const [selected, setSelected] = useState<MenuItem | undefined>();
	const [searchFocus, setSearchFocus] = useState(false);
	const [menuPadding, setMenuPadding] = useState(0);
	const [footerScrollPosition, setFooterScrollPosition] = useState(0);
	const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo();
	const { width, height } = useWindowSize();
	const { isDesktop, isMobile } = useDevice();

	const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		// e.preventDefault()
		// const segment = i18nPaths['search'][locale];
		// const path = `/${locale === defaultLocale ? segment : `${locale}/${segment}`}`
		// router.push(path, undefined, { shallow: true, scroll: true })
		// setSearchFocus(false)
	};

	useEffect(() => {
		return () => {
			!isDesktop && setShowMenu(false);
		};
	}, [pathname]);

	useEffect(() => {
		const footer = document.getElementById('footer');
		if (!footer || !treeRef.current) return;

		const footerHeight = footer.clientHeight - 1;
		const menuOffset = treeRef.current?.offsetTop;
		const footerScrollPosition =
			scrolledPosition + viewportHeight < documentHeight - footerHeight
				? 0
				: footerHeight - (documentHeight - (scrolledPosition + viewportHeight));
		const menuPadding = isMobile
			? menuOffset + footerScrollPosition
			: footerScrollPosition
				? menuOffset + footerScrollPosition
				: 0;
		setMenuPadding(menuPadding);
		setFooterScrollPosition(footerScrollPosition);
	}, [selected, scrolledPosition, documentHeight, viewportHeight, width, height, isMobile]);

	useEffect(() => {
		const content = document.getElementById('content');
		if (!content) return;
		content.setAttribute('data-full', String(!showMenu));
	}, [showMenu]);

	return (
		<>
			<Hamburger />
			<nav
				className={cn(s.menu, !showMenu && s.hide)}
				style={{ minHeight: `calc(100vh - ${footerScrollPosition}px - 1px)` }}
			>
				<Temperature />
				<MenuTree
					menu={menu}
					style={{ maxHeight: `calc(100vh - ${menuPadding}px - 1rem)` }}
					ref={treeRef}
				/>
				<Language menu={menu} className={s.language} />
			</nav>
		</>
	);
}
