'use client';

import s from './HeadlessTree.module.scss';
import cn from 'classnames';
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { getMenuItem, Menu, MenuItem } from '@/lib/menu2';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export const HeadlessTree = ({ menu: _menu }: { menu: Menu }) => {
	const locale = useLocale();
	function getItem(itemId: string): MenuItem {
		if (itemId === 'root')
			return {
				id: 'root',
				section: 'root',
				title: 'root',
				sub: _menu,
			};
		return getMenuItem(itemId, _menu);
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
		<div {...tree.getContainerProps()} className={s.tree}>
			{tree.getItems().map((item) => {
				const folder = item.isFolder();
				const href = item.getItemData().href;
				const { id, title } = item.getItemData();
				const props = item.getProps();

				return (
					<div {...props} key={id} style={{ paddingLeft: `${item.getItemMeta().level * 20}px` }}>
						{folder ? (
							<button className={s.folder}>{title}</button>
						) : href ? (
							<Link href={href}>{title}</Link>
						) : null}
					</div>
				);
			})}
		</div>
	);
};
