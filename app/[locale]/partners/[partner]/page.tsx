import { apiQuery } from 'next-dato-utils/api';
import { PartnerDocument, AllPartnersDocument } from '@/graphql';
import { Article, Related, BackButton, MetaSection, PageHeader } from '@/components';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';

export type Props = {
	partner: PartnerRecord;
};

export default async function Partner({
	params,
}: PageProps<'/[locale]/[year]/partners/[partner]'>) {
	const { locale, partner: slug } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { partner } = await apiQuery(PartnerDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});
	if (!partner) return notFound();
	const { id, image, imageEn, title, intro, content, address, city, webpage, _seoMetaTags } =
		partner;
	const t = await getTranslations();

	return (
		<>
			<PageHeader title={t('Menu.partners')} href={'/partners'} />
			<Article
				id={id}
				key={id}
				title={title}
				image={image as FileField}
				imageEn={imageEn as FileField}
				intro={intro}
				content={content}
				meta={[
					{ title: t('MetaSection.city'), value: city },
					{ title: t('MetaSection.address'), value: address },
					{
						title: t('MetaSection.link'),
						value: webpage ? t('MetaSection.webpage') : undefined,
						link: webpage ? webpage : undefined,
					},
				]}
			/>
			<BackButton>{t('BackButton.showAllPartners')}</BackButton>
		</>
	);
}

export async function generateStaticParams({
	params,
}: PageProps<'/[locale]/[year]/partners/[partner]'>) {
	const { locale } = await params;
	const { allPartners } = await apiQuery(AllPartnersDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allPartners.map((partner) => ({ partner: partner.slug }));
}

// export const getStaticProps = withGlobalProps(
// 	{ queries: [] },
// 	async ({ props, revalidate, context }: any) => {
// 		const slug = context.params.partner;
// 		const { partner } = await apiQuery(PartnerDocument, {
// 			variables: { slug, locale },
// 			preview: context.preview,
// 		});

// 		if (!partner) return { notFound: true, revalidate };

// 		return {
// 			props: {
// 				...props,
// 				partner,
// 				page: {
// 					section: 'partners',
// 					parent: true,
// 					overview: '/partners',
// 					title: partner.title,
// 					slugs: pageSlugs('partners', props.year.title, partner._allSlugLocales),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
