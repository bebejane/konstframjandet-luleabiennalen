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
	const { locale, locales, asPath } = useRouter()
	const menuItem = pathToMenuItem(asPath, locale, menu)
	console.log(asPath)
	console.log(menuItem)

	return (
		<nav className={s.language}>
			{locales.map((l, idx) =>
				<Link
					key={idx}
					//href={(l !== locale ? menuItem?.altSlug : menuItem?.slug) ?? '/'}
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
