import { AllYearsDocument } from '/graphql';
import { apiQuery } from 'dato-nextjs-utils/api';
export { default, getStaticProps } from '/pages/om'

export async function getStaticPaths() {
	const { years } = await apiQuery(AllYearsDocument)
	const paths = years.map(({ title }) => ({ params: { year: title } }))

	return {
		paths,
		fallback: 'blocking',
	};
}
