'use client';

import s from './SectionHeader.module.scss';
import cn from 'classnames';
import { MenuItem } from '@/lib/menu';
import { useLocale, useTranslations } from 'next-intl';
import { usePage } from '@/lib/context/page';
import { PROJECT_NAME, PROJECT_ABBR } from '@/lib/constant';
import { translatePath } from '@/lib/utils';
import { defaultLocale, Link, usePathname } from '@/i18n/routing';
import { useStore, useShallow } from '@/lib/store';

export type SectionHeaderProps = {
	menu: MenuItem[];
	overview?: boolean;
};

export default function SectionHeader() {
	const t = useTranslations('Menu');
	const pathname = usePathname();
	const locale = useLocale();
	const [showMenu] = useStore(useShallow((state) => [state.showMenu]));
	const { year, isArchive, isHome, section } = usePage();
	const slugs: string[] = [];

	const locationsParentPath = `${translatePath(
		'/partners',
		locale,
		defaultLocale,
		year?.title,
	)}#locations`;

	const parent = false;
	const isLocation = section === 'locations';
	const isArchiveHome = section === 'home' && isArchive;
	const isSearch = section === 'search';
	const isArchiveOverview = section === 'archive';
	const isOverview = !parent && !isArchive;
	const showArchive = isArchive || isArchiveOverview;
	const yearLabel = `${PROJECT_ABBR}°${year?.title.substring(2)}`;

	const label = isArchiveOverview
		? PROJECT_NAME
		: isArchiveHome
			? yearLabel
			: !isSearch
				? `${yearLabel}${!isHome ? ` — ${t(isLocation ? 'partners' : section)}` : ''}`
				: t('search');

	const header = (
		<h2>
			<span style={{ color: year?.color.hex }} key={label}>
				{label.split('').map((c, idx) => (
					<span
						key={`${idx}`}
						style={{
							animationDelay: `${(idx / label.length) * 0.6}s`,
						}}
					>
						{c}
					</span>
				))}
			</span>
		</h2>
	);

	if (isHome) return null;

	return (
		<>
			<header className={cn(s.header, !showMenu && s.full)}>
				{!isOverview ? <Link href={'/'}>{header}</Link> : <>{header}</>}
				{showArchive && <span className={s.archive}>{t('archive')}</span>}
			</header>
			{!isHome && <div className={s.spacer}></div>}
			{!isHome && <div className={s.line}></div>}
		</>
	);
}
