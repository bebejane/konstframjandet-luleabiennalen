
import { apiQuery } from 'next-dato-utils/api';
import { ParticipantDocument, AllParticipantsDocument } from '@/graphql';
import { Article, Related, BackButton } from '@/components';

import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';

export type ParticipantExtendedRecord = (ParticipantRecord & ThumbnailImage) & {
	exhibitions: ExhibitionRecord[];
	programs: ProgramRecord[];
};

export default async function Participant({
	params
}: PageProps<'/[locale]/medverkande/[participant]'>) {
	const { locale, participant: slug } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);
	
	const { participant } = await apiQuery(ParticipantDocument, {
		variables: { slug, locale: locale as SiteLocale }
	});
	if (!participant) return notFound();
	const { id, image, imageEn, name, intro, content, exhibitions, colab, programs, _seoMetaTags } = participant;
	const t = await getTranslations();

	return (
		<>
			{/* <DatoSEO title={name} description={intro} seo={_seoMetaTags} /> */}
			<Article
				id={id}
				key={id}
				title={name}
				image={image as FileField}
				imageEn={imageEn as FileField}
				intro={intro}
				content={content}
			/>
			<Related header={t('Related.participatingIn')} items={[...exhibitions, ...programs]} />
			<Related header={t('General.inCooperationWith')} items={colab} noLink={true} />
			<BackButton>{t('BackButton.showAllParticipants')}</BackButton>
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/medverkande'>) {
	const { locale } = await params;	
	const { participants } = await apiQuery(AllParticipantsDocument, {all:true,  variables: { locale: locale as SiteLocale } });
	return participants.map((participant) => ({ participant: participant.slug }));
}

// export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
// 	const slug = context.params.participant;
// 	const { participant } = await apiQuery(ParticipantDocument, {
// 		variables: { slug, locale },
// 		preview: context.preview,
// 	});

// 	if (!participant) return { notFound: true, revalidate };

// 	return {
// 		props: {
// 			...props,
// 			participant,
// 			page: {
// 				section: 'participants',
// 				parent: true,
// 				title: participant.name,
// 				slugs: pageSlugs('participants', props.year.title, participant._allSlugLocales),
// 			} as PageProps,
// 		},
// 		revalidate,
// 	};
// });
