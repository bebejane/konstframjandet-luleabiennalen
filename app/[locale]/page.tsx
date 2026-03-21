import s from "./page.module.scss";
import cn from "classnames";
import { LandOwnershipDocument, StartDataDocument, StartDocument } from "@/graphql";
import { apiQuery } from "next-dato-utils/api";
import { Block, LandOwnershipPopup } from "@/components";
import { locales} from "@/i18n/routing";
import { format } from "date-fns";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { allYears } from "@/lib/utils";

export type Props = {
	start: StartRecord;
	landOwnership: LandOwnershipQuery["landOwnership"];
};

const fullBlocks = [
	"StartFullscreenImageRecord",
	"StartFullBleedImageRecord",
	"StartFullscreenVideoRecord",
];

export default async function Home({ params }: PageProps<'/[locale]'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { start, landOwnership } = await getData(locale, '2026')

	return (
		<>
			<div className={s.container}>
				{start.content.map((block, idx) => (
					<section
						key={idx}
						className={cn(fullBlocks.includes(block.__typename ?? '') && s.noborder)}
					>
						<Block data={block}/>
					</section>
				))}
			</div>
			<LandOwnershipPopup data={landOwnership} />
		</>
	);
}

async function getData(locale: SiteLocale, _year:string) {
	
	let { start } = await apiQuery(StartDocument, {
		variables: { locale },
	});

	if(!start) notFound()

	const years = await allYears(locale)	
  let year = years.find(({ title }) => _year ? title === _year : title === years[0].title)
  year = { ...year, isArchive: year?.title !== years[0].title } as YearExtendedRecord

		
	const date = format(new Date(), "yyyy-MM-dd");
	const count = {
		participants: parseInt(
			(
				start.content.find(
					(el) => el.__typename === "StartRandomParticipantRecord"
				) as StartRandomParticipantRecord
			)?.amount ?? "1"
		),
		news: parseInt(
			(start.content.find((el) => el.__typename === "StartNewsRecord") as StartNewsRecord)
				?.amount ?? "1"
		),
		programs: parseInt(
			(start.content.find((el) => el.__typename === "StartProgramRecord") as StartProgramRecord)
				?.amount ?? "1"
		),
	};

	// Add extra items to make sure we have enough to fill the grid
	Object.keys(count).forEach((k) => (count[k] += count[k] % 2 === 0 ? 0 : 1));

	const variables = {
		newsItems: count.news,
		programItems: count.participants,
		yearId: year.id,
		locale,
		date,
	};

	const {allNews, allPrograms, allParticipants} = await apiQuery(StartDataDocument, { variables });

	const { landOwnership } = await apiQuery(LandOwnershipDocument, {
		variables: { locale }
	});

	return {
		year,
		landOwnership,
		start: {
			...start,
			content: start.content.map((block) => ({
				...block,
				news: block.__typename === "StartNewsRecord" ? allNews : null,
				programs: block.__typename === "StartProgramRecord" ? allPrograms : null,
				participants:
					block.__typename === "StartRandomParticipantRecord"
						? allParticipants
								.sort(() => (Math.random() > 0.5 ? 1 : -1))
								.slice(0, count.participants)
						: null,
			})),
		}
	};
}


// page: {
// 					section: "home",
// 					slugs: pageSlugs("home"),
// 				} as PageProps,