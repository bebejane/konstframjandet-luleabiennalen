import { apiQuery } from 'next-dato-utils/api';
import {
	AboutDocument,
	AllAboutsDocument,
	ArchiveHomeDocument,
	MainAboutDocument,
	YearDocument,
} from '@/graphql';
import { Article, ArchiveShortcuts } from '@/components';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export type Props = {
	about: AboutRecord;
	shortcuts?: (
		| AboutRecord
		| ExhibitionRecord
		| ProgramRecord
		| ParticipantRecord
		| PartnerRecord
	)[];
};

export default async function AboutItem({ params }: PageProps<'/[locale]/[year]/om/[about]'>) {
	const { locale, about: slug, year: _year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { year } = await apiQuery(YearDocument, {
		variables: {
			locale: locale as SiteLocale,
			title: _year ?? process.env.NEXT_PUBLIC_CURRENT_YEAR,
		},
	});

	if (!year) return notFound();

	let about: AboutQuery['about'] | MainAboutQuery['allAbouts'][number];

	if (!slug) {
		const { allAbouts } = await apiQuery(MainAboutDocument, {
			variables: { locale: locale as SiteLocale, yearId: year.id },
		});
		about = allAbouts?.[0];
	} else {
		about = (
			await apiQuery(AboutDocument, {
				variables: { slug, locale: locale as SiteLocale },
			})
		)?.about;
	}

	if (!about) return notFound();

	const { allAbouts, allExhibitions, allParticipants, allPartners, allPrograms } = await apiQuery(
		ArchiveHomeDocument,
		{ variables: { first: 1, locale: locale as SiteLocale, yearId: year.id } },
	);
	const { id, image, imageEn, title, intro, content, _seoMetaTags } = about;
	const shortcuts = _year
		? [allExhibitions[0], allPrograms[0], allParticipants[0], allPartners[0], allAbouts[0]].filter(
				(el) => el,
			)
		: [];

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
			/>
			{shortcuts.length > 0 && <ArchiveShortcuts items={shortcuts} />}
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/om'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	const { allAbouts } = await apiQuery(AllAboutsDocument, {
		all: true,
		variables: {
			locale: locale as SiteLocale,
		},
	});
	return allAbouts.map((about) => ({ about: about.slug }));
}
