import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { StartDataDocument, StartDocument } from "/graphql";
import Link from "next/link";
import format from "date-fns/format";
import { apiQuery } from "dato-nextjs-utils/api";
import { Block } from "/components";

export type Props = {
	start: StartRecord
}

export default function Home({ start }: Props) {

	return (
		<div className={s.container}>
			{start.content.map((block, idx) =>
				<Block
					key={idx}
					data={block}
					record={start}
				/>
			)}
		</div>
	);
}


export const getStaticProps = withGlobalProps({ queries: [StartDocument] }, async ({ props, revalidate, context }: any) => {

	let { start }: { start: StartRecord } = props;
	const date = '2022-01-01' //format(new Date(), 'yyyy-MM-dd')
	const participantCount = parseInt((start.content.find(el => el.__typename === 'StartRandomParticipantRecord') as StartRandomParticipantRecord).amount)
	const variables = {
		newsItems: parseInt((start.content.find(el => el.__typename === 'StartNewsRecord') as StartNewsRecord).amount),
		programItems: parseInt((start.content.find(el => el.__typename === 'StartProgramRecord') as StartProgramRecord).amount),
		yearId: props.year.id,
		locale: props.locale,
		date
	}

	const { news, programs, participants }: {
		news: NewsRecord[],
		programs: ProgramRecord[],
		participants: ParticipantRecord[]
	} = await apiQuery(StartDataDocument, { variables })


	return {
		props: {
			...props,
			start: {
				...start, content: start.content.map(block => ({
					...block,
					news: block.__typename === 'StartNewsRecord' ? news : null,
					programs: block.__typename === 'StartProgramRecord' ? programs : null,
					participants: block.__typename === 'StartRandomParticipantRecord' ? participants.sort(() => Math.random() > 0.5 ? 1 : -1).slice(participantCount) : null,
				}))
			}
		},
		revalidate
	}
})