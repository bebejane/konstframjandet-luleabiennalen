import s from './Language.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { capitalize } from '/lib/utils'
import { usePage } from '/lib/context/page'

export default function Language() {
	const { locale } = useRouter()
	const { slugs, year, isHome } = usePage()

	return (
		<nav className={s.language}>
			{slugs.map((item, idx) =>
				<Link
					key={idx}
					href={`/${!isHome ? year.title : ''}${item.value}`}
					locale={item.locale}
					className={cn(locale === item.locale && s.selected)}
				>
					{capitalize(item.locale)}
				</Link>
			)}
		</nav>
	)
}
