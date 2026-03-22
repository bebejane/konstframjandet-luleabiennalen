import { apiQuery } from 'next-dato-utils/api';
import { ProgramDocument, AllProgramsDocument } from '@/graphql';
import { Article, Related, BackButton } from '@/components';
import { formatDate } from '@/lib/utils';
import { Link, locales } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export type Props = {
	program: ProgramRecord;
};

export default async function Program({ params }: PageProps<'/[locale]/[year]/program/[program]'>) {
	const { locale, program: slug } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { program } = await apiQuery(ProgramDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});

	if (!program) return notFound();
	const t = await getTranslations();

	const {
		id,
		image,
		imageEn,
		title,
		intro,
		partipants,
		partner,
		supportedBy,
		location,
		programPlace,
		content,
		address,
		startDate,
		externalLink,
		endDate,
		time,
	} = program;

	return (
		<>
			{/* <DatoSEO title={title} description={intro} seo={_seoMetaTags} /> */}
			<Article
				id={id}
				key={id}
				title={title}
				image={image as FileField}
				imageEn={imageEn as FileField}
				imageSize='small'
				intro={intro}
				content={content}
				date={startDate}
				meta={[
					{ title: t('MetaSection.when'), value: formatDate(startDate, endDate, locale) },
					{ title: t('MetaSection.times'), value: time },
					{
						title: t('MetaSection.where'),
						value: address,
					},
					{
						title: t('MetaSection.place'),
						value: programPlace?.map(({ title }) => title).join(', '),
					},
					{
						title: t('MetaSection.where'),
						value:
							location.length &&
							location.map(({ slug, title }) => <Link href={`/platser/${slug}`}>{title}</Link>),
					},
					{
						title: t('MetaSection.link'),
						value: externalLink ? t('MetaSection.webpage') : undefined,
						link: externalLink ?? undefined,
					},
				]}
			/>
			<Related header={t('Menu.participants')} items={partipants} />
			<Related header={t('Menu.locations')} items={location} />
			<Related header={t('General.inCooperationWith')} items={partner} noLink={true} />
			<Related header={t('Partners.supportedBy')} items={supportedBy} />
			<BackButton>{t('BackButton.showAllPrograms')}</BackButton>
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/program'>) {
	const { locale } = await params;
	const { allPrograms } = await apiQuery(AllProgramsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allPrograms.map((program) => ({ program: program.slug }));
}

// 	if (!program) return { notFound: true, revalidate };

// 	return {
// 		props: {
// 			...props,
// 			program,
// 			page: {
// 				section: 'program',
// 				parent: true,
// 				title: program.title,
// 				slugs: pageSlugs('program', props.year.title, program._allSlugLocales),
// 			} as PageProps,
// 		},
// 		revalidate,
// 	};
// });
