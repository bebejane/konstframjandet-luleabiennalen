import s from './Language.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { capitalize, pathToMenuItem, defaultLocale } from '/lib/utils'
import { Menu } from '/lib/menu'
import { usePage } from '/lib/context/page'

export type Props = {
	menu: Menu
}

export default function Language({ menu }) {
	const { locale, locales } = useRouter()
	const { slugs, year } = usePage()

	return (
		<nav className={s.language}>
			{slugs.map((item, idx) =>
				<Link
					key={idx}
					href={`/${year.title}${item.value}`}
					locale={item.locale}
					className={cn(locale === item.locale && s.selected)}
				>
					{capitalize(item.locale)}
				</Link>
			)}
		</nav>
	)
}
