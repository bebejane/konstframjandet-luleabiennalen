'use client';

import s from './Language.module.scss';
import cn from 'classnames';
import { Menu } from '@/lib/menu';
import { locales, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { capitalize } from 'next-dato-utils/utils';
import { useParams } from 'next/navigation';

export type Props = {
	menu: Menu;
	className?: string;
};

export default function Language({ className, menu }: Props) {
	const locale = useLocale();
	const pathname = usePathname();
	const params = useParams();

	return (
		<nav className={cn(s.language, className)}>
			{locales?.map((l, idx) => (
				<Link key={idx} href='/' locale={l} className={cn(locale === l && s.selected)}>
					{capitalize(l)}
				</Link>
			))}
		</nav>
	);
}
