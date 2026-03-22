import { AllExhibitionsDocument, ContactDocument, LandOwnershipDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail } from '@/components';
import { formatDate } from '@/lib/utils';
import { Markdown } from 'next-dato-utils/components';
import { usePage } from '@/lib/context/page';
import { apiQuery } from 'next-dato-utils/api';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';

export type Props = {
	exhibitions: (ExhibitionRecord & ThumbnailImage)[];
};

export default async function Exhibition({ params }: PageProps<'/[locale]/[year]/utstallningar'>) {
	const { locale, year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { allExhibitions } = await apiQuery(AllExhibitionsDocument, {
		variables: { locale: locale as SiteLocale },
	});
	const t = await getTranslations();

	return (
		<>
			{/* <DatoSEO title={t('Menu.exhibitions')} /> */}
			{/* <Markdown className={s.intro} content={year.introExhibitions} /> */}
			<CardContainer columns={2}>
				{allExhibitions.map(({ id, image, title, startDate, endDate, slug }) => (
					<Card key={id}>
						<Thumbnail
							title={title}
							titleRows={1}
							image={image as FileField}
							meta={`${formatDate(startDate, endDate, locale)}`}
							slug={`/utstallningar/${slug}`}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}

// export const getStaticProps = withGlobalProps(
// 	{ queries: [AllExhibitionsDocument] },
// 	async ({ props, revalidate }: any) => {
// 		return {
// 			props: {
// 				...props,
// 				page: {
// 					section: 'exhibitions',
// 					slugs: pageSlugs('exhibitions', props.year.title),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
