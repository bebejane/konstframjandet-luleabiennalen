import s from './Button.module.scss'
import React from 'react'
import { recordToSlug } from '/lib/utils'
import Link from 'next/link'

export type ButtonBlockProps = { data: ButtonRecord, onClick: Function }

export default function Button({ data: { link } }: ButtonBlockProps) {

	const slug = link.__typename === 'ExternalLinkRecord' ? link.url : recordToSlug(link.record)
	const { title } = link

	return (
		<Link href={slug}>
			<button className={s.button}>{title}</button>
		</Link>
	)

}