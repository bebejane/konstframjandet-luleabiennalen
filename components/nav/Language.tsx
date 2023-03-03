import s from './Language.module.scss'
import Link from 'next/link'

export type Props = {}

export default function Language({ }: Props) {

	return (
		<nav className={s.language}>
			<Link className={s.selected} href='/'>Sv</Link> <Link href='/en'>En</Link>
		</nav>
	)
}
