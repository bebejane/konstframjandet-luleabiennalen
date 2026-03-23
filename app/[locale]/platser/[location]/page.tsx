import { apiQuery } from 'next-dato-utils/api';
import { LocationDocument, AllLocationsDocument } from '@/graphql';
import { Article, Related, BackButton, PageHeader } from '@/components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';

export type LocationExtendedRecord = (LocationRecord & ThumbnailImage) & {
	exhibitions: ExhibitionRecord[];
	programs: ProgramRecord[];
};

export type Props = {
	location: LocationExtendedRecord;
};

export default async function Location({
	params,
}: PageProps<'/[locale]/[year]/platser/[location]'>) {
	const { locale, location: slug, year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { location } = await apiQuery(LocationDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});
	if (!location) return notFound();
	const {
		id,
		image,
		imageEn,
		title,
		intro,
		address,
		city,
		webpage,
		content,
		exhibitions,
		programs,
		_seoMetaTags,
	} = location;
	const t = await getTranslations();
	const href = '/locations#locations';
	return (
		<>
			<PageHeader title={t('Menu.locations')} href={href} />
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

export async function generateStaticParams({
	params,
}: PageProps<'/[locale]/[year]/platser/[location]'>) {
	const { locale } = await params;
	const { allLocations } = await apiQuery(AllLocationsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allLocations.map((location) => ({ location: location.slug }));
}
