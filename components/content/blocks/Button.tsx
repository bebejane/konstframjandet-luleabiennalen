import { Link } from '@/i18n/routing'
import s from './Button.module.scss'
import { recordToSlug } from '@/lib/utils'

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