import s from './index.module.scss';
import withGlobalProps from '/lib/withGlobalProps';
import { AllProgramsDocument, AllProgramCategoriesDocument } from '/graphql';
import { CardContainer, Card, Thumbnail, FilterBar } from '/components';
import { formatDate } from '/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { DatoSEO } from 'dato-nextjs-utils/components';
import { useTranslations } from 'next-intl';
import { pageSlugs } from '/lib/i18n';
import { usePage } from '/lib/context/page';
import { isAfter } from 'date-fns';

export type Props = {
	programs: ProgramRecord[];
	programCategories: ProgramCategoryRecord[];
};

export default function Program({ programs, programCategories }: Props) {
	const t = useTranslations();
	const { asPath, locale } = useRouter();
	const { year } = usePage();

	const options = programCategories.map(({ id, title: label, desc }) => ({
		id,
		label,
		description: desc,
	}));
	const [category, setCategory] = useState<string>();
	const [place, setPlace] = useState<string>();
	const categoryFilter = ({ programCategory: { id } }: ProgramRecord) =>
		!category || category === id;
	const placeFilter = (p: ProgramRecord) =>
		!place || (p.programPlace?.id && place === p.programPlace?.id);

	const haveProgramItems = programs.filter(categoryFilter).filter(placeFilter).length > 0;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const pastPrograms = programs
		.filter(
			({ startDate, endDate }) =>
				!year.isArchive &&
				isAfter(today, new Date(startDate)) &&
				(!endDate || isAfter(today, new Date(endDate)))
		)
		.filter(categoryFilter)
		.filter(placeFilter);

	const comingPrograms = programs
		.filter(({ id }) => pastPrograms.find(({ id: pastId }) => pastId === id) === undefined)
		.filter(categoryFilter)
		.filter(placeFilter);

	const places = programs.reduce((acc, el) => {
		if (acc.find(({ id }) => id === el.programPlace?.id)) return acc;
		return el.programPlace ? [...acc, el.programPlace] : acc;
	}, [] as ProgramPlaceRecord[]);

	return (
		<>
			<DatoSEO title={t('Menu.program')} />
			<FilterBar options={options} multi={false} onChange={(opt) => setCategory(opt as string)} />
			<FilterBar
				options={places.map(({ id, title: label }) => ({ id, label, description: '' }))}
				multi={false}
				onChange={(opt) => setPlace(opt as string)}
			/>
			{haveProgramItems ? (
				<CardContainer key={`${category}-${place}-${asPath}`}>
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
									image={image}
									imageEn={imageEn}
									intro={intro}
									meta={`${formatDate(startDate, endDate, locale)} ${
										programPlace?.title ? `• ${programPlace?.title}` : ''
									} • ${programCategory.title}`}
									slug={`/program/${slug}`}
								/>
							</Card>
						)
					)}
				</CardContainer>
			) : (
				<p className={s.nomatch}>{t('Program.noProgramItems')}</p>
			)}
			{pastPrograms.length > 0 && (
				<>
					<h2 className={s.subheader}>{t('Program.finished')}</h2>
					<CardContainer key={`${category}-${place}-${asPath}`}>
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
										image={image}
										intro={intro}
										meta={`${formatDate(startDate, endDate, locale)} ${
											programPlace?.title ? `• ${programPlace?.title}` : ''
										} • ${programCategory.title}`}
										metaOneLine={true}
										slug={`/program/${slug}`}
									/>
								</Card>
							)
						)}
					</CardContainer>
				</>
			)}
		</>
	);
}

export const getStaticProps = withGlobalProps(
	{ queries: [AllProgramsDocument, AllProgramCategoriesDocument] },
	async ({ props, revalidate, context }: any) => {
		// Filter out program categories that don't have any programs
		const programCategories = props.programCategories.filter(({ id }) =>
			props.programs.some(({ programCategory }) => programCategory.id === id)
		);

		return {
			props: {
				...props,
				programCategories,
				page: {
					section: 'program',
					slugs: pageSlugs('program', props.year.title),
				} as PageProps,
			},
			revalidate,
		};
	}
);
