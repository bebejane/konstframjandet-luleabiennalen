import s from './Content.module.scss'
import cn from 'classnames'
import React from 'react'
import { SectionHeader } from '/components'
import { Menu } from '/lib/menu'

export type ContentProps = {
	children: React.ReactNode,
	menu: Menu
}

export default function Content({ children, menu }: ContentProps) {

	return (
		<main id="content" className={cn(s.content)}>
			<article>
				<SectionHeader menu={menu} />
				{children}
			</article>
		</main>
	)
}