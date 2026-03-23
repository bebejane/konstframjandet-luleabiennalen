import { apiQuery } from 'next-dato-utils/api';
import { NewsDocument, AllNewsDocument } from '@/graphql';
import { Article, BackButton, PageHeader } from '@/components';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';

export type Props = {
	news: NewsRecord;
};

export default async function News({ params }: PageProps<'/[locale]/nyheter/[news]'>) {
	const { locale, news: slug } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { news } = await apiQuery(NewsDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});
	if (!news) return notFound();
	const { id, image, imageEn, title, intro, content, _seoMetaTags } = news;
	const t = await getTranslations();

	return (
		<>
			<PageHeader title={t('Menu.news')} href='/nyheter' />
			<Article
				id={id}
				key={id}
				title={title}
				image={image as FileField}
				imageEn={imageEn as FileField}
				intro={intro}
				content={content}
			/>
			<BackButton>{t('BackButton.showAllNews')}</BackButton>
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

// export const getStaticProps = withGlobalProps(
// 	{ queries: [] },
// 	async ({ props, revalidate, context }: any) => {
// 		const slug = context.params.news;
// 		const { news } = await apiQuery(NewsDocument, {
// 			variables: { slug, locale },
// 			preview: context.preview,
// 		});

// 		if (!news) {
// 			return { notFound: true, revalidate };
// 		}

// 		return {
// 			props: {
// 				...props,
// 				news,
// 				page: {
// 					section: 'news',
// 					parent: true,
// 					overview: `/news`,
// 					title: news.title,
// 					slugs: pageSlugs('news', null, news._allSlugLocales),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
