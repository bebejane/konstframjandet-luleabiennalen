import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { YearDocument, AllYearsDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";

export type Props = {
	year: string
}

export default function Year({ year }: Props) {
	return (
		<div className={s.container}>
			Arkiv: {year}
		</div>
	);
}

export async function getStaticPaths(context) {

	const { years } = await apiQuery(AllYearsDocument, { variables: { first: 100 } })
	const paths = years.map(({ title }) => ({ params: { year: title } }))

	return {
		paths,
		fallback: 'blocking',
	};
}


export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.year;
	const { year } = await apiQuery(YearDocument, { variables: { title: slug } })

	if (!year) return { notFound: true }

	return {
		props: {
			...props,
			year
		},
		revalidate
	}
})