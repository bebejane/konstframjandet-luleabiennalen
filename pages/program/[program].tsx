import s from './[program].module.scss';
import withGlobalProps from '/lib/withGlobalProps';
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ProgramDocument, AllProgramsDocument } from '/graphql';
import { Article, Related, BackButton, MetaSection } from '/components';
import { formatDate } from '/lib/utils';
import { useTranslations } from 'next-intl';
import { DatoSEO } from 'dato-nextjs-utils/components';
import { pageSlugs } from '/lib/i18n';
import { useRouter } from 'next/router';
import Link from '/components/nav/Link';

export type Props = {
	program: ProgramRecord;
};

export default function Program({
	program: {
		id,
		image,
		imageEn,
		title,
		intro,
		startDate,
		endDate,
		time,
		address,
		externalLink,
		location,
		content,
		partipants,
		programPlace,
		programCategory,
		partner,
		slug,
		_seoMetaTags,
	},
}: Props) {
	const t = useTranslations();
	const { locale } = useRouter();

	return (
		<>
			<DatoSEO title={title} description={intro} seo={_seoMetaTags} />
			<Article
				id={id}
				key={id}
				title={title}
				image={image}
				imageEn={imageEn}
				imageSize='small'
				intro={intro}
				content={content}
				partner={partner as PartnerRecord[] | FinancierRecord[]}
				date={startDate}
				onClick={(imageId) => {}}
			/>
			<MetaSection
				key={`${id}-meta`}
				items={[
					{
						title: t('MetaSection.where'),
						value: address,
					},
					{
						title: t('MetaSection.place'),
						value: programPlace?.map(({ title }) => title).join(', '),
					},

					{ title: t('MetaSection.when'), value: formatDate(startDate, endDate, locale) },
					{ title: t('MetaSection.times'), value: time },
					{
						title: t('MetaSection.where'),
						value:
							location.length &&
							location.map(({ slug, title }) => <Link href={`/platser/${slug}`}>{title}</Link>),
					},
					{
						title: t('MetaSection.link'),
						value: externalLink ? t('MetaSection.webpage') : undefined,
						link: externalLink,
					},
				]}
			/>
			<Related header={t('Menu.locations')} items={location} />
			<Related header={t('Menu.participants')} items={partipants} />
			<BackButton>{t('BackButton.showAllPrograms')}</BackButton>
		</>
	);
}

export async function getStaticPaths() {
	const { programs } = await apiQueryAll(AllProgramsDocument);
	const paths = programs.map(({ slug }) => ({ params: { program: slug }, locale: 'sv' }));
	paths.forEach((el) => paths.push({ ...el, locale: 'en' }));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = withGlobalProps(
	{ queries: [] },
	async ({ props, revalidate, context }: any) => {
		const slug = context.params.program;
		const { program } = await apiQuery(ProgramDocument, {
			variables: { slug, locale: context.locale },
			preview: context.preview,
		});

		if (!program) return { notFound: true, revalidate };

		return {
			props: {
				...props,
				program,
				page: {
					section: 'program',
					parent: true,
					title: program.title,
					slugs: pageSlugs('program', props.year.title, program._allSlugLocales),
				} as PageProps,
			},
			revalidate,
		};
	}
);
