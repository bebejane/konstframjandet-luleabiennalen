import s from './Language.module.scss';
import cn from 'classnames';
import { Menu } from '@/lib/menu';
import { locales } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { capitalize } from 'next-dato-utils/utils';

export type Props = {
	menu: Menu;
	className?: string;
};

export default function Language({ className }: Props) {
	const locale = useLocale();

	if (locales.length <= 1) return null;

	return (
		<nav className={cn(s.language, className)}>
			{locales?.map((l, idx) => (
				<Link key={idx} href={'/'} locale={l} className={cn(locale === l && s.selected)}>
					{capitalize(l)}
				</Link>
			))}
		</nav>
	);
}
