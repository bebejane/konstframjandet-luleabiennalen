import { apiQuery } from 'next-dato-utils/api';
import { AboutDocument, AllAboutsDocument } from '@/graphql';
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

export default async function AboutItem({ params }: PageProps<'/[locale]/om/[about]'>) {
	const { locale, about: slug } = await params;

	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { about } = await apiQuery(AboutDocument, {
		variables: { slug, locale: locale as SiteLocale },
	});
	if (!about) return notFound();

	const { id, image, imageEn, title, intro, content, _seoMetaTags } = about;
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
			{/* {shortcuts?.length && <ArchiveShortcuts items={shortcuts} />} */}
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/[locale]/om'>) {
	const { locale } = await params;
	const { allAbouts } = await apiQuery(AllAboutsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	return allAbouts.map((about) => ({ about: about.slug }));
}

// export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
// 	const slug = context.params.about;
// 	const { about } = await apiQuery(AboutDocument, {
// 		variables: { slug, locale },
// 		preview: context.preview,
// 	});

// 	if (!about) return { notFound: true, revalidate };

// 	return {
// 		props: {
// 			...props,
// 			about,
// 			page: {
// 				section: 'about',
// 				parent: false,
// 				title: about.title,
// 				slugs: pageSlugs('about', props.year.title, about._allSlugLocales),
// 			} as PageProps,
// 		},
// 		revalidate,
// 	};
// });
