import { AllYearsDocument } from '@/graphql';
import { locales } from '@/i18n/routing';
import { apiQuery } from 'next-dato-utils/api';

export { default } from '../page';

export async function generateStaticParams() {
	const { allYears } = await apiQuery(AllYearsDocument);
	return locales.map((locale) => allYears.map((year) => ({ year: year.title, locale }))).flat();
}

// export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

// 	const yearId = props.year.id
// 	const { about, exhibition, program, participant, partner } = await apiQuery(ArchiveHomeDocument, { variables: { first: 1, locale, yearId }, preview: context.preview })
// 	if (!about || !about.length)
// 		return { notFound: true, revalidate }

// 	return {
// 		props: {
// 			...props,
// 			about: about[0],
// 			shortcuts: [exhibition[0], program[0], participant[0], partner[0], about[0]].filter(el => el),
// 			page: {
// 				section: 'home',
// 				title: about[0].title,
// 				slugs: pageSlugs('home', props.year.title)
// 			} as PageProps
// 		},
// 		revalidate
// 	};
// });

// export async function getStaticPaths() {
// 	const { years } = await apiQuery(AllYearsDocument)
// 	const paths = years.map(({ title }) => ({ params: { year: title } }))

// 	return {
// 		paths,
// 		fallback: 'blocking',
// 	};
// }
