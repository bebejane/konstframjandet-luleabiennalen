import s from './page.module.scss';
import { AllNewsDocument } from '@/graphql';
import { Markdown } from 'next-dato-utils/components';
import { formatDate } from '@/lib/utils';
import { Link, locales } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { apiQuery } from 'next-dato-utils/api';

export type Props = {
	news: (NewsRecord & ThumbnailImage)[];
};

export default async function News({ params }: PageProps<'/[locale]/nyheter'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);
	
	const { allNews } = await apiQuery(AllNewsDocument, { all: true, variables: { locale: locale as SiteLocale } });
	const t = await getTranslations();
	

	return (
		<>
			{/* <DatoSEO title={t('Menu.news')} /> */}
			<section className={s.news}>
				<ul>
					{allNews.map(({ id, title, intro, _createdAt, slug }) => (
						<li key={id}>
							<h3 className='small'>{formatDate(_createdAt, undefined, locale, true)}</h3>
							<h1>{title}</h1>
							<div className='intro'>
								<Markdown className={s.intro} content={intro}/>
							</div>
							<Link href={`/nyheter/${slug}`} >
								<button>{t('General.readMore')}</button>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/nyheter'>) {
	const { locale } = await params;
	const { allNews } = await apiQuery(AllNewsDocument, { all: true, variables: { locale: locale as SiteLocale } });
	return allNews.map((news) => ({ news: news.slug }));
}

// export const getStaticProps = withGlobalProps(
// 	{ queries: [AllNewsDocument] },
// 	async ({ props, revalidate }: any) => {
// 		return {
// 			props: {
// 				...props,
// 				page: {
// 					section: 'news',
// 					slugs: pageSlugs('news'),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
