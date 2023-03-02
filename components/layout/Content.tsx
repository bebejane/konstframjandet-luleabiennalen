import s from './Content.module.scss'
import cn from 'classnames'
import React from 'react'

export type ContentProps = {
	children: React.ReactNode,
	noMargins?: boolean
	noBottom?: boolean
}

export default function Content({ children }: ContentProps) {

	return (
		<main id="content" className={cn(s.content)}>
			<article>
				{children}
			</article>
		</main>
	)
}