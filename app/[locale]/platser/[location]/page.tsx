
import { apiQuery } from 'next-dato-utils/api';
import { translatePath } from '@/lib/utils';
import { LocationDocument, AllLocationsDocument } from '@/graphql';
import { Article, Related, BackButton, MetaSection } from '@/components';
import { usePage } from '@/lib/context/page';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import { useLocale } from 'next-intl';
import { defaultLocale, locales } from '@/i18n/routing';

export type LocationExtendedRecord = (LocationRecord & ThumbnailImage) & {
	exhibitions: ExhibitionRecord[];
	programs: ProgramRecord[];
};

export type Props = {
	location: LocationExtendedRecord;
};

export default async function Location({ params }: PageProps<'/[locale]/platser/[location]'>) {
	const { locale, location: slug } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);
	
	const { location } = await apiQuery(LocationDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});
	if (!location) return notFound();
	const { id, image, imageEn, title, intro, address, city, webpage, content, exhibitions, programs, _seoMetaTags } = location;
	const t = await getTranslations();
	const { year } = usePage();
	const href = `${translatePath('/partners', locale, defaultLocale, year?.title)}#locations`;

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
				imageSize='small'
				content={content}
				meta={[
					{ title: t('MetaSection.address'), value: address },
					{ title: t('MetaSection.city'), value: city },
					{
						title: t('MetaSection.link'),
						value: webpage ? t('MetaSection.webpage') : undefined,
						link: webpage ?? undefined,
					},
				]}
			/>
			<Related header={t('Related.related')} items={[...exhibitions, ...programs] as any} />
			<BackButton href={href}>{t('BackButton.showAllLocations')}</BackButton>
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/platser/[location]'>) {
	const { locale } = await params;
	const { allLocations } = await apiQuery(AllLocationsDocument, { all:true, variables: { locale: locale as SiteLocale } });
	return allLocations.map((location) => ({ location: location.slug }));
}
// export async function getStaticPaths() {
// 	const { locations } = await apiQueryAll(AllLocationsDocument);
// 	const paths = locations.map(({ slug }) => ({ params: { location: slug }, locale: 'sv' }));
// 	paths.forEach((el) => paths.push({ ...el, locale: 'en' }));

// 	return {
// 		paths,
// 		fallback: 'blocking',
// 	};
// }

// export const getStaticProps = withGlobalProps(
// 	{ queries: [] },
// 	async ({ props, revalidate, context }: any) => {
// 		const slug = context.params.location;
// 		const { location } = await apiQuery(LocationDocument, {
// 			variables: { slug, locale },
// 			preview: context.preview,
// 		});

// 		if (!location) return { notFound: true, revalidate };

// 		return {
// 			props: {
// 				...props,
// 				location,
// 				page: {
// 					section: 'locations',
// 					overview: '/partners#locations',
// 					parent: true,
// 					title: location.title,
// 					slugs: pageSlugs('locations', props.year.title, location._allSlugLocales),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
