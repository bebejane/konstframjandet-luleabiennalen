import { AllParticipantsDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail } from '@/components';
import { notFound } from 'next/navigation';
import { apiQuery } from 'next-dato-utils/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';

export type Props = {
	allParticipants: (ParticipantRecord & ThumbnailImage)[];
};

export default async function Participant({ params }: PageProps<'/[locale]/[year]/medverkande'>) {
	const { locale, year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { allParticipants } = await apiQuery(AllParticipantsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	if (!allParticipants) return notFound();
	const t = getTranslations('Menu');

	return (
		<>
			{/* <DatoSEO title={t('allParticipants')} /> */}
			<CardContainer>
				{allParticipants.map(({ id, image, imageEn, name, intro, slug }) => (
					<Card key={id}>
						<Thumbnail
							title={name}
							image={image as FileField}
							imageEn={imageEn as FileField}
							intro={intro}
							titleRows={1}
							slug={`/medverkande/${slug}`}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/medverkande'>) {
	const { locale } = await params;
	const { allParticipants } = await apiQuery(AllParticipantsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allParticipants.map((participant) => ({ participant: participant.slug }));
}

// export const getStaticProps = withGlobalProps(
// 	{ queries: [AllParticipantsDocument] },
// 	async ({ props, revalidate }: any) => {
// 		return {
// 			props: {
// 				...props,
// 				page: {
// 					section: 'allParticipants',
// 					slugs: pageSlugs('allParticipants', props.year.title),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
