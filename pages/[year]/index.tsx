import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllYearsDocument } from "/graphql";
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

	const year = context.params.year;

	return {
		props: {
			...props,
			year
		},
		revalidate
	}
})