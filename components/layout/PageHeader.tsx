'use client';

import s from './PageHeader.module.scss';
import cn from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { usePage } from '@/lib/context/page';
import { PROJECT_NAME, PROJECT_ABBR } from '@/lib/constant';
import { translatePath } from '@/lib/utils';
import { AppPathnames, defaultLocale, Link, usePathname } from '@/i18n/routing';
import { useStore, useShallow } from '@/lib/store';

export type PageHeaderProps = {
	title?: string;
	href?: string;
	params?: any;
	noPrefix?: boolean;
};

export default function PageHeader({ title: _title, href, params, noPrefix }: PageHeaderProps) {
	const [showMenu] = useStore(useShallow((state) => [state.showMenu]));
	const t = useTranslations('Menu');
	const locale = useLocale();
	const { year, isArchive, section } = usePage();

	const titlePrefix = `${PROJECT_ABBR}°${year?.title.substring(2)}`;
	const title = _title && noPrefix ? _title : _title ? `${titlePrefix} — ${_title}` : titlePrefix;

	const locationsParentPath = `${translatePath(
		'/partners',
		locale,
		defaultLocale,
		year?.title,
	)}#locations`;

	const isArchiveOverview = section === 'archive';
	const showArchive = isArchive || isArchiveOverview;
	// const isLocation = section === 'locations';
	// const isArchiveHome = section === 'home' && isArchive;
	// const isSearch = section === 'search';

	// const showArchive = isArchive || isArchiveOverview;
	// const yearLabel = `${PROJECT_ABBR}°${year?.title.substring(2)}`;

	// const label = isArchiveOverview
	// 	? PROJECT_NAME
	// 	: isArchiveHome
	// 		? yearLabel
	// 		: !isSearch
	// 			? `${yearLabel}${!isHome ? ` — ${t(isLocation ? 'partners' : section)}` : ''}`
	// 			: t('search');

	return (
		<>
			<header className={cn(s.header, !showMenu && s.full)}>
				{href ? (
					//@ts-expect-error
					<Link href={{ pathname: href, params }}>
						<h2>
							<span style={{ color: year?.color.hex }} key={title}>
								{title.split('').map((c, idx) => (
									<span
										key={`${idx}`}
										style={{
											animationDelay: `${(idx / title.length) * 0.6}s`,
										}}
									>
										{c}
									</span>
								))}
							</span>
						</h2>
					</Link>
				) : (
					<h2>{title}</h2>
				)}
				{showArchive && <span className={s.archive}>{t('archive')}</span>}
			</header>
			<div className={s.spacer} />
			<div className={s.line} />
		</>
	);
}
