import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { StartDataDocument, StartDocument } from "/graphql";
import Link from "next/link";
import format from "date-fns/format";
import { apiQuery } from "dato-nextjs-utils/api";
import { Block } from "/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
	start: StartRecord
}

const fullBlocks = ['StartFullscreenImageRecord', 'StartFullBleedImageRecord', 'StartFullscreenVideoRecord']

export default function Home({ start }: Props) {

	return (
		<div className={s.container}>
			{start.content.map((block, idx) =>
				<section key={idx} className={cn(fullBlocks.includes(block.__typename) && s.noborder)}>
					<Block
						data={block}
						record={start}
					/>
				</section>
			)}
		</div>
	);
}


export const getStaticProps = withGlobalProps({ queries: [StartDocument] }, async ({ props, revalidate, context }: any) => {

	let { start }: { start: StartRecord } = props;
	const date = '2022-01-01' //format(new Date(), 'yyyy-MM-dd')
	const count = {
		participants: parseInt((start.content.find(el => el.__typename === 'StartRandomParticipantRecord') as StartRandomParticipantRecord).amount),
		news: parseInt((start.content.find(el => el.__typename === 'StartNewsRecord') as StartNewsRecord).amount),
		programs: parseInt((start.content.find(el => el.__typename === 'StartProgramRecord') as StartProgramRecord).amount)
	}

	// Add extra items to make sure we have enough to fill the grid
	Object.keys(count).forEach(k => count[k] += count[k] % 2 === 0 ? 0 : 1)

	const variables = {
		newsItems: count.news,
		programItems: count.participants,
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
					participants: block.__typename === 'StartRandomParticipantRecord' ? participants.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, count.participants) : null,
				}))
			},
			page: {
				slugs: pageSlugs('home')
			}
		},
		revalidate
	}
})