import s from './index.module.scss';
import withGlobalProps from '/lib/withGlobalProps';
import { AllYearsDocument } from '/graphql';
import { CardContainer, Card, Thumbnail } from '/components';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { DatoSEO, DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { pageSlugs } from '/lib/i18n';
import { PROJECT_ABBR } from '/lib/constant';

export type Props = {
	years: YearRecord[];
	general: GeneralRecord;
};

export default function Archive({ years, general }: Props) {
	const t = useTranslations('Menu');
	const { asPath } = useRouter();

	return (
		<>
			<DatoSEO title={t('archive')} />
			<Markdown className={s.intro}>{general.archiveIntro}</Markdown>
			<CardContainer key={asPath} columns={2}>
				{years.map(({ id, title, slug, theme, image, imageEn }) => (
					<Card key={id}>
						<Thumbnail
							title={`LB° ${title}`}
							image={image}
							imageEn={imageEn}
							intro={theme}
							slug={`/${title}`}
							transformHref={false}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}

export const getStaticProps = withGlobalProps(
	{ queries: [AllYearsDocument] },
	async ({ props, revalidate }: any) => {
		return {
			props: {
				...props,
				years: props.years.slice(1),
				page: {
					section: 'archive',
					slugs: pageSlugs('archive'),
				} as PageProps,
			},
			revalidate,
		};
	}
);
