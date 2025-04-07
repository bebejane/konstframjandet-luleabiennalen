import withGlobalProps from '/lib/withGlobalProps';
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { AboutDocument, AllAboutsDocument } from '/graphql';
import { Article, ArchiveShortcuts } from '/components';
import { DatoSEO } from 'dato-nextjs-utils/components';
import { pageSlugs } from '/lib/i18n';

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

export default function AboutItem({
	about: { id, image, imageEn, title, intro, content, _seoMetaTags },
	shortcuts,
}: Props) {
	return (
		<>
			<DatoSEO title={title} description={intro} seo={_seoMetaTags} />
			<Article
				id={id}
				key={id}
				title={title}
				image={image}
				imageEn={imageEn}
				intro={intro}
				content={content}
			/>
			{shortcuts?.length && <ArchiveShortcuts items={shortcuts} />}
		</>
	);
}

export async function getStaticPaths() {
	const { abouts } = await apiQueryAll(AllAboutsDocument);
	const paths = abouts.map(({ slug }) => ({ params: { about: slug }, locale: 'sv' }));
	paths.forEach((el) => paths.push({ ...el, locale: 'en' }));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = withGlobalProps(
	{ queries: [] },
	async ({ props, revalidate, context }: any) => {
		const slug = context.params.about;
		const { about } = await apiQuery(AboutDocument, {
			variables: { slug, locale: context.locale },
			preview: context.preview,
		});

		if (!about) return { notFound: true, revalidate };

		return {
			props: {
				...props,
				about,
				page: {
					section: 'about',
					parent: false,
					title: about.title,
					slugs: pageSlugs('about', props.year.title, about._allSlugLocales),
				} as PageProps,
			},
			revalidate,
		};
	}
);
