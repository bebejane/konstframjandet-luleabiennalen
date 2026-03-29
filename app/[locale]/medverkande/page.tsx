import { AllParticipantsDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail, PageHeader } from '@/components';
import { notFound } from 'next/navigation';
import { apiQuery } from 'next-dato-utils/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPathname, locales } from '@/i18n/routing';
import { DraftMode } from 'next-dato-utils/components';
import { buildMetadata } from '@/app/[locale]/layout';
import { Metadata } from 'next';

export type Props = {
	allParticipants: (ParticipantRecord & ThumbnailImage)[];
};

export default async function Participant({ params }: PageProps<'/[locale]/[year]/medverkande'>) {
	const { locale, year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { allParticipants, draftUrl } = await apiQuery(AllParticipantsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});

	if (!allParticipants) return notFound();
	const t = await getTranslations('Menu');

	return (
		<>
			<PageHeader title={t('participants')} />
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
			<DraftMode path={'/medverkande'} url={draftUrl} />
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

export async function generateMetadata({
	params,
}: PageProps<'/[locale]/[year]/medverkande'>): Promise<Metadata> {
	const { locale, year } = await params;
	const t = await getTranslations('Menu');
	return await buildMetadata({
		title: t('participants'),
		locale: locale as SiteLocale,
		year,
		pathname: getPathname({ locale, href: { pathname: '/medverkande' } }),
	});
}
