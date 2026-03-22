import withGlobalProps from "@/lib/withGlobalProps";
import { apiQuery } from 'next-dato-utils/api';
import { ArchiveHomeDocument, AllYearsDocument } from "@/graphql";


export { default } from '/pages/om'

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const yearId = props.year.id
	const { about, exhibition, program, participant, partner } = await apiQuery(ArchiveHomeDocument, { variables: { first: 1, locale, yearId }, preview: context.preview })
	if (!about || !about.length)
		return { notFound: true, revalidate }

	return {
		props: {
			...props,
			about: about[0],
			shortcuts: [exhibition[0], program[0], participant[0], partner[0], about[0]].filter(el => el),
			page: {
				section: 'home',
				title: about[0].title,
				slugs: pageSlugs('home', props.year.title)
			} as PageProps
		},
		revalidate
	};
});

export async function getStaticPaths() {
	const { years } = await apiQuery(AllYearsDocument)
	const paths = years.map(({ title }) => ({ params: { year: title } }))

	return {
		paths,
		fallback: 'blocking',
	};
}
