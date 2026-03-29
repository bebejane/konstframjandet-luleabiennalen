import s from './page.module.scss';
import cn from 'classnames';
import withGlobalProps from '@/lib/withGlobalProps';
import { Loader, PageHeader } from '@/components';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Markdown } from 'next-dato-utils/components';
import { useStore, useShallow } from '@/lib/store';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import type { SearchResult } from '@/app/api/search';
import { pageSlugs } from '@/i18n/utils';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPathname, locales } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/app/[locale]/layout';
import { AllYearsDocument } from '@/graphql';
import { Metadata } from 'next';
import { apiQuery } from 'next-dato-utils/api';

export type Props = {
	query?: string;
};

export default async function Search({ params }: PageProps<'/[locale]/sok'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const t = await getTranslations();
	const [searchQuery, setSearchQuery] = useStore(
		useShallow((state) => [state.searchQuery, state.setSearchQuery]),
	);
	const [results, setResults] = useState<SearchResult | undefined>();
	const [error, setError] = useState<Error | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const searchTimeout = useRef<NodeJS.Timeout | null>(null);

	const siteSearch = (q) => {
		const variables = {
			q: q
				? `${q
						.split(' ')
						.filter((el) => el)
						.join('|')}`
				: undefined,
			locale,
		};

		if (!Object.keys(variables).filter((k) => variables[k] !== undefined).length)
			return setLoading(false);

		fetch('/api/search', {
			body: JSON.stringify(variables),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(async (res) => {
				const results = await res.json();
				if (res.status === 200) {
					setResults(results);
				} else setError(new Error('error in search'));
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setResults(undefined);
		setLoading(true);
		setError(undefined);
		searchTimeout.current && clearTimeout(searchTimeout.current);
		searchTimeout.current = setTimeout(() => siteSearch(searchQuery), 250);
	}, [searchQuery]);

	useEffect(() => {
		// Clear search query on unmount
		return () => setSearchQuery(undefined);
	}, []);

	useEffect(() => {
		const params = new URL(document.location.href).searchParams;
		query && setSearchQuery(query);
		params.get('q') && setSearchQuery(params.get('q'));
	}, [query]);

	return (
		<>
			<PageHeader title={t('Menu.search')} />
			<section className={cn(s.container)}>
				<div className={cn(s.search)}>
					<input
						className={'mid'}
						placeholder={t('Menu.search')}
						value={searchQuery || ''}
						onChange={({ target: { value } }) => setSearchQuery(value)}
					/>
				</div>
				{results && Object.keys(results).length > 0 ? (
					<>
						{Object.keys(results).map((type, idx) => (
							<ul key={idx}>
								<li>
									<h3>{results[type][0].category}</h3>
								</li>
								{results[type]?.map(({ category, title, text, slug }, i) => (
									<li key={i}>
										<h1>
											<Link href={slug}>{title}</Link>
										</h1>
										<div className={s.intro}>
											<Markdown>{text}</Markdown>
										</div>
										<Link href={slug}>
											<button>{t('General.readMore')}</button>
										</Link>
									</li>
								))}
							</ul>
						))}
					</>
				) : loading ? (
					<div className={s.loading}>
						<Loader />
					</div>
				) : (
					results &&
					searchQuery && (
						<p className={cn(s.nohits, 'small')}>
							{t('Search.noHitsFor')}: &quot;{searchQuery}&quot;
						</p>
					)
				)}
				{error && (
					<div className={s.error}>
						<p>{typeof error === 'string' ? error : error.message}</p>
					</div>
				)}
			</section>
		</>
	);
}

export async function generateMetadata({ params }: PageProps<'/[locale]/sok'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations('Menu');
	return await buildMetadata({
		title: t('search'),
		locale: locale as SiteLocale,
		pathname: getPathname({ locale, href: { pathname: '/sok' } }),
	});
}
