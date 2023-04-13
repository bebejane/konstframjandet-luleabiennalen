import s from './Language.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { capitalize } from '/lib/utils'
import { usePage } from '/lib/context/page'
import { Menu } from '/lib/menu'

export type Props = {
	menu: Menu
}

export default function Language({ menu }: Props) {

	const { locale } = useRouter()
	const { slugs } = usePage()
	//console.log(slugs.map((item) => item.value))

	return (
		<nav className={s.language}>
			{slugs.map((item, idx) =>
				<Link
					key={idx}
					href={item.value}
					locale={item.locale}
					className={cn(locale === item.locale && s.selected)}
				>
					{capitalize(item.locale)}
				</Link>
			)}
		</nav>
	)
}
