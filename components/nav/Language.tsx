import s from './Language.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { capitalize, pathToMenuItem, defaultLocale } from '/lib/utils'
import { Menu } from '/lib/menu'

export type Props = {
	menu: Menu
}

export default function Language({ menu }) {
	const { locale, locales } = useRouter()

	return (
		<nav className={s.language}>
			{locales.map((l, idx) =>
				<Link
					key={idx}
					href={'/'}
					locale={l}
					className={cn(locale === l && s.selected)}
				>
					{capitalize(l)}
				</Link>
			)}
		</nav>
	)
}
