'use client';

import s from './MenuTree.module.scss';
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { getMenuItem, Menu, MenuItem } from '@/lib/menu';
import { getPathname, Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function MenuTree({
	menu: _menu,
	style,
}: {
	menu: Menu;
	style?: React.CSSProperties;
}) {
	const locale = useLocale();
	const rootItem = {
		id: 'root',
		section: 'root',
		title: 'root',
		sub: _menu,
	} as unknown as MenuItem;

	function getItem(itemId: string): MenuItem {
		return itemId === 'root' ? rootItem : getMenuItem(itemId, _menu);
	}

	const tree = useTree<MenuItem>({
		//initialState: { expandedItems: [menu[0].id] },
		rootItemId: 'root',
		getItemName: (item) => item.getItemData().title,
		isItemFolder: (item) => item.getItemData().sub.length > 0,
		dataLoader: {
			getItem: (itemId) => getItem(itemId),
			getChildren: (itemId) => getItem(itemId).sub.map((el) => el.id) ?? [],
		},
		features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
	});

	return (
		<div {...tree.getContainerProps()} className={s.tree} style={style}>
			{tree.getItems().map((item) => {
				const folder = item.isFolder();
				const data = item.getItemData();
				const href = data.href ?? undefined;
				const { id, title } = item.getItemData();
				const props = item.getProps();

				return (
					<div {...props} key={id} style={{ paddingLeft: `${item.getItemMeta().level * 20}px` }}>
						{folder ? (
							<button className={s.folder}>{title}</button>
						) : typeof href !== 'undefined' ? (
							<Link href={href as any} locale={locale}>
								{title}
							</Link>
						) : null}
					</div>
				);
			})}
		</div>
	);
}
