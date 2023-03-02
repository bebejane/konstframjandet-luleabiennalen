import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import type { Menu } from "/lib/menu";
import Link from "next/link";

export type Props = {

}

export default function Home({ }: Props) {
	return (
		<div className={s.container}>
			Hem
		</div>
	);
}


export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	}
})