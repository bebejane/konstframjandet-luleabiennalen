import { apiQuery } from 'next-dato-utils/api';
import { ExhibitionDocument, AllExhibitionsDocument } from '@/graphql';
import { Article, Related, BackButton } from '@/components';
import { formatDate } from '@/lib/utils';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';

export type Props = {
	exhibition: ExhibitionRecord;
};

export default async function Exhibition({
	params,
}: PageProps<'/[locale]/[year]/utstallningar/[exhibition]'>) {
	const { locale, exhibition: slug, year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { exhibition } = await apiQuery(ExhibitionDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});
	if (!exhibition) return notFound();
	const {
		id,
		image,
		imageEn,
		title,
		intro,
		externalLink,
		time,
		location,
		content,
		participants,
		partner,
		startDate,
		endDate,
		_seoMetaTags,
	} = exhibition;
	const t = await getTranslations();

	return (
		<>
			{/* <DatoSEO title={title} description={intro} seo={_seoMetaTags} /> */}
			<Article
				id={id}
				key={id}
				title={title}
				image={image as FileField}
				imageEn={imageEn as FileField}
				intro={intro}
				content={content}
				meta={[
					{ title: t('MetaSection.when'), value: formatDate(startDate, endDate, locale) },
					{ title: t('MetaSection.times'), value: time },
					{
						title: t('MetaSection.where'),
						value: location?.title,
						link: `/platser/${location?.slug}`,
					},
					{
						title: t('MetaSection.link'),
						value: externalLink ? t('MetaSection.webpage') : undefined,
						link: externalLink ?? undefined,
					},
				]}
			/>
			<Related header={t('Menu.participants')} items={participants} />
			<Related header={t('General.inCooperationWith')} items={partner} noLink={true} />
			<BackButton>{t('BackButton.showAllExhibitons')}</BackButton>
		</>
	);
}

export async function generateStaticParams({
	params,
}: PageProps<'/[locale]/[year]/utstallningar'>) {
	const { locale, year } = await params;
	const { allExhibitions } = await apiQuery(AllExhibitionsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allExhibitions.map((exhibition) => ({ exhibition: exhibition.slug }));
}

// export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
// 	const slug = context.params.exhibition;
// 	const { exhibition } = await apiQuery(ExhibitionDocument, {
// 		variables: { slug, locale },
// 		preview: context.preview,
// 	});

// 	if (!exhibition) return { notFound: true, revalidate };

// 	return {
// 		props: {
// 			...props,
// 			exhibition,
// 			page: {
// 				section: 'exhibitions',
// 				parent: true,
// 				title: exhibition.title,
// 				slugs: pageSlugs('exhibitions', props.year.title, exhibition._allSlugLocales),
// 			} as PageProps,
// 		},
// 		revalidate,
// 	};
//});
