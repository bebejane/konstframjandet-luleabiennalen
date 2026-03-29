'use client';

import s from './HeadlessTree.module.scss';
import cn from 'classnames';
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { Menu } from '@/lib/menu2';

export const HeadlessTree = ({ data }: { data: Menu }) => {
	console.log(data[7]);

	const tree = useTree<string>({
		initialState: { expandedItems: ['folder-1'] },
		rootItemId: 'folder',
		getItemName: (item) => item.getItemData(),
		isItemFolder: (item) => !item.getItemData().endsWith('item'),
		dataLoader: {
			getItem: (itemId) => itemId,
			getChildren: (itemId) => [
				`${itemId}-1`,
				`${itemId}-2`,
				`${itemId}-3`,
				`${itemId}-1item`,
				`${itemId}-2item`,
			],
		},
		indent: 20,
		features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
	});

	return (
		<div {...tree.getContainerProps()} className={s.tree}>
			{tree.getItems().map((item) => (
				<button
					{...item.getProps()}
					key={item.getId()}
					style={{ paddingLeft: `${item.getItemMeta().level * 20}px` }}
				>
					<div
						className={cn('treeitem', {
							focused: item.isFocused(),
							expanded: item.isExpanded(),
							selected: item.isSelected(),
							folder: item.isFolder(),
						})}
					>
						{item.getItemName()}
					</div>
				</button>
			))}
		</div>
	);
};
