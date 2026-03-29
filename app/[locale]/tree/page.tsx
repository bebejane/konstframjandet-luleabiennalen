import s from './page.module.scss';
import cn from 'classnames';
import { getPathname, locales } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildMenu, Menu, MenuItem } from '@/lib/menu2';
import { HeadlessTree } from '@/app/[locale]/tree/HeadlessTree';

export default async function TreePage({ params }: PageProps<'/[locale]/sok'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const menu = await buildMenu(locale as SiteLocale);

	return (
		<div className={s.container}>
			<h1>Tree</h1>
			<HeadlessTree menu={menu} />
		</div>
	);
}
