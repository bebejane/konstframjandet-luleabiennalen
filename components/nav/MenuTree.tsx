'use client';

import s from './MenuTree.module.scss';
import cn from 'classnames';
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import {
	getMenuItem,
	getMenuItemByPathname,
	getMenuItemAncestorChain,
	Menu,
	MenuItem,
	getClosesetMenuItem,
} from '@/lib/menu';
import { usePathname, Link, routing, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useEffect, useState, memo } from 'react';
import { useParams } from 'next/navigation';
import router from 'next-dato-utils/router';

type MenuTreeProps = {
	menu: Menu;
	ref?: React.Ref<HTMLDivElement>;
	onSelect: Function;
};

const MenuTree = memo(function MenuTree({ menu, ref, onSelect }: MenuTreeProps) {
	const locale = useLocale();
	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();
	const [selectedItem, setSelectedItem] = useState<string>('root');
	const [expandedItems, setExpandedItems] = useState<string[]>(['root']);

	const rootItem = {
		id: 'root',
		section: 'root',
		title: 'root',
		sub: menu,
	} as unknown as MenuItem;

	const tree = useTree<MenuItem>({
		state: { expandedItems, selectedItems: [selectedItem] },
		rootItemId: 'root',
		getItemName: (item) => item.getItemData().title,
		isItemFolder: (item) => item.getItemData().sub.length > 0,
		dataLoader: {
			getItem: (itemId) => getItem(itemId),
			getChildren: (itemId) => getItem(itemId).sub.map((el) => el.id) ?? [],
		},
		features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
	});

	function getItem(itemId: string): MenuItem {
		try {
			return itemId === 'root' ? rootItem : getMenuItem(itemId, menu);
		} catch (e) {
			return rootItem;
		}
	}

	useEffect(() => {
		let menuItem: MenuItem | null = null;
		try {
			menuItem = getClosesetMenuItem({ pathname, params, locale }, menu);
		} catch (e) {}

		if (!menuItem) return console.log('No menu item found');

		const chain = getMenuItemAncestorChain(menuItem.id, menu);
		if (chain) {
			const treeChain = ['root', ...chain];
			const currentState = tree.getState();
			const currentExpanded = currentState.expandedItems || [];
			const newExpanded = Array.from(new Set([...currentExpanded, ...treeChain, menuItem.id]));
			setExpandedItems(newExpanded);
		}
		setSelectedItem(menuItem.id);
	}, [pathname, params, locale, menu, tree]);

	useEffect(() => {
		onSelect(selectedItem);
	}, [selectedItem]);

	return (
		<div {...tree.getContainerProps()} className={s.tree} ref={ref}>
			{tree.getItems().map((item) => {
				const folder = item.isFolder();
				const data = item.getItemData();
				const href = data.href ?? undefined;
				const { id, title, year, route, archive } = item.getItemData();
				const props = item.getProps();
				const bold = route === '/arkiv';

				return (
					<div
						{...props}
						key={id}
						style={{ paddingLeft: `${item.getItemMeta().level * 20}px` }}
						title={id}
					>
						{folder ? (
							<button
								className={cn(s.folder, bold && s.bold)}
								onClick={() => {
									setExpandedItems((items) =>
										items.includes(id) ? items.filter((i) => i !== id) : [...items, id],
									);
									href && router.push(href as any);
								}}
							>
								{title}
							</button>
						) : typeof href !== 'undefined' ? (
							<Link href={href as any} locale={locale} onClick={() => setSelectedItem(id)}>
								{title}
							</Link>
						) : null}
					</div>
				);
			})}
		</div>
	);
});

export default MenuTree;
