import s from './page.module.scss';
import { AllProgramsDocument, AllProgramCategoriesDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail, FilterBar } from '@/components';
import { formatDate } from '@/lib/utils';
import { usePage } from '@/lib/context/page';
import { isAfter } from 'date-fns';
import { apiQuery } from 'next-dato-utils/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';

export type Props = {
	programs: ProgramRecord[];
	programCategories: ProgramCategoryRecord[];
};

export default async function Program({ params }: PageProps<'/[locale]/[year]/program'>) {
	const { locale, year } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { allPrograms } = await apiQuery(AllProgramsDocument, {
		all: true,
		variables: { locale: locale as SiteLocale },
	});
	const { programCategories } = await apiQuery(AllProgramCategoriesDocument, {
		variables: { locale: locale as SiteLocale },
	});
	const t = await getTranslations();
	//const { year } = usePage();
	const [category, setCategory] = useState<string>();
	const [place, setPlace] = useState<string>();

	const categoryFilter = ({ programCategory: { id } }: ProgramRecord) =>
		!category || category === id;
	const placeFilter = (p: ProgramRecord) =>
		!place || (p.programPlace.length && p.programPlace.find((el) => el.id === place));

	const haveProgramItems = allPrograms.filter(categoryFilter).filter(placeFilter).length > 0;
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const pastPrograms = allPrograms
		.filter(
			({ startDate, endDate }) =>
				!year.isArchive &&
				isAfter(today, new Date(startDate)) &&
				(!endDate || isAfter(today, new Date(endDate))),
		)
		.filter(categoryFilter)
		.filter(placeFilter);

	const comingPrograms = allPrograms
		.filter(({ id }) => pastPrograms.find(({ id: pastId }) => pastId === id) === undefined)
		.filter(categoryFilter)
		.filter(placeFilter);

	const places = allPrograms.reduce((acc, el) => {
		if (acc.find(({ id }) => el.programPlace?.find((el) => el.id === id))) return acc;
		return el.programPlace
			? [...acc, ...el.programPlace.filter(({ id }) => !acc.some(({ id: accId }) => accId === id))]
			: acc;
	}, [] as ProgramPlaceRecord[]);

	return (
		<>
			{/* <DatoSEO title={t('Menu.program')} /> */}
			<FilterBar
				options={programCategories.map(({ id, title: label, desc }) => ({
					id,
					label,
					description: desc,
				}))}
				multi={false}
				category={t('Program.types')}
				onChange={(opt) => setCategory(opt as string)}
			/>
			<FilterBar
				options={places.map(({ id, title: label }) => ({ id, label }))}
				multi={false}
				category={t('Program.places')}
				onChange={(opt) => setPlace(opt as string)}
			/>
			{haveProgramItems ? (
				<CardContainer>
					{comingPrograms.map(
						({
							id,
							image,
							imageEn,
							title,
							intro,
							slug,
							startDate,
							endDate,
							programCategory,
							programPlace,
						}) => (
							<Card key={id}>
								<Thumbnail
									title={title}
									titleRows={2}
									image={image as FileField}
									imageEn={imageEn as FileField}
									intro={intro}
									meta={`${formatDate(startDate, endDate, locale)} • ${programPlace
										?.map(({ title }) => title)
										.join(', ')} • `}
									metaRight={programCategory.title}
									metaOneLine={true}
									slug={`/program/${slug}`}
								/>
							</Card>
						),
					)}
				</CardContainer>
			) : (
				<p className={s.nomatch}>{t('Program.noProgramItems')}</p>
			)}
			{pastPrograms.length > 0 && (
				<>
					<h2 className={s.subheader}>{t('Program.finished')}</h2>
					<CardContainer>
						{pastPrograms.map(
							({
								id,
								image,
								title,
								intro,
								slug,
								startDate,
								endDate,
								programCategory,
								programPlace,
							}) => (
								<Card key={id}>
									<Thumbnail
										title={title}
										titleRows={2}
										image={image as FileField}
										intro={intro}
										meta={`${formatDate(startDate, endDate, locale)} • ${programPlace
											?.map(({ title }) => title)
											.join(', ')} • `}
										metaRight={programCategory.title}
										metaOneLine={true}
										slug={`/program/${slug}`}
									/>
								</Card>
							),
						)}
					</CardContainer>
				</>
			)}
		</>
	);
}

// export const getStaticProps = withGlobalProps(
// 	{ queries: [AllProgramsDocument, AllProgramCategoriesDocument] },
// 	async ({ props, revalidate, context }: any) => {
// 		// Filter out program categories that don't have any programs
// 		const programCategories = props.programCategories.filter(({ id }) =>
// 			props.programs.some(({ programCategory }) => programCategory.id === id)
// 		);

// 		return {
// 			props: {
// 				...props,
// 				programCategories,
// 				page: {
// 					section: 'program',
// 					slugs: pageSlugs('program', props.year.title),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
