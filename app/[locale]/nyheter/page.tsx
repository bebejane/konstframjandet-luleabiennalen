import s from './page.module.scss';
import { AllNewsDocument } from '@/graphql';
import { locales } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { apiQuery } from 'next-dato-utils/api';
import { PageHeader } from '@/components';
import { InfiniteScroll } from 'next-dato-utils/components';
import { NewsItem } from './NewsItem';

export type Props = {
	news: (NewsRecord & ThumbnailImage)[];
};

export const dynamic = 'force-dynamic';

export default async function News({ params }: PageProps<'/[locale]/nyheter'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);
	const t = await getTranslations();

	async function getNews(skip = 0) {
		'use server';
		const { allNews } = await apiQuery(AllNewsDocument, {
			variables: { locale: locale as SiteLocale, skip, first: 5 },
		});
		return allNews;
	}

	const news = await getNews();
	return (
		<>
			<PageHeader title={t('Menu.news')} />
			<section className={s.news}>
				<ul>
					<InfiniteScroll id='news' initial={news} next={getNews}>
						{NewsItem}
					</InfiniteScroll>
				</ul>
			</section>
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/nyheter'>) {
	const { locale } = await params;
	const { allNews } = await apiQuery(AllNewsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allNews.map((news) => ({ news: news.slug }));
}
