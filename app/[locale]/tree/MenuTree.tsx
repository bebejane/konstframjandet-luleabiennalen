'use client';

import s from './MenuTree.module.scss';
import { Link } from '@/i18n/routing';
import { Menu } from '@/lib/menu2';
import { Tree, NodeRendererProps } from 'react-arborist';

export type MenuTree = {
	data: Menu;
};
export function MenuTree({ data }: MenuTree) {
	return (
		<div className={s.container}>
			<Tree
				openByDefault={false}
				initialData={data}
				childrenAccessor={'sub'}
				disableDrag={true}
				disableDrop={true}
				disableEdit={true}
				indent={0}
			>
				{Node}
			</Tree>
		</div>
	);
}

function Node({ node, tree, style }: NodeRendererProps<Menu[number]>) {
	const { label, href, sub } = node.data;

	return (
		<>
			{href && sub.length === 0 ? (
				//@ts-expect-error
				<Link style={style} href={href}>
					{label}
				</Link>
			) : (
				<span style={style}>{label}</span>
			)}
		</>
	);
}
