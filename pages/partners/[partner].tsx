import withGlobalProps from '/lib/withGlobalProps';
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { PartnerDocument, AllPartnersDocument } from '/graphql';
import { Article, Related, BackButton, MetaSection } from '/components';
import { useTranslations } from 'next-intl';
import { DatoSEO } from 'dato-nextjs-utils/components';
import { pageSlugs } from '/lib/i18n';

export type Props = {
	partner: PartnerRecord;
};

export default function Partner({
	partner: { id, image, imageEn, title, intro, content, address, city, webpage, _seoMetaTags },
}: Props) {
	const t = useTranslations();

	return (
		<>
			<DatoSEO title={title} description={intro} seo={_seoMetaTags} />
			<Article
				id={id}
				key={id}
				title={title}
				image={image}
				imageEn={imageEn}
				intro={intro}
				content={content}
				onClick={(imageId) => {}}
				meta={[
					{ title: t('MetaSection.city'), value: city },
					{ title: t('MetaSection.address'), value: address },
					{
						title: t('MetaSection.link'),
						value: webpage ? t('MetaSection.webpage') : undefined,
						link: webpage,
					},
				]}
			/>
			<BackButton>{t('BackButton.showAllPartners')}</BackButton>
		</>
	);
}

export async function getStaticPaths() {
	const { partners } = await apiQueryAll(AllPartnersDocument);
	const paths = partners.map(({ slug }) => ({ params: { partner: slug }, locale: 'sv' }));
	paths.forEach((el) => paths.push({ ...el, locale: 'en' }));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = withGlobalProps(
	{ queries: [] },
	async ({ props, revalidate, context }: any) => {
		const slug = context.params.partner;
		const { partner } = await apiQuery(PartnerDocument, {
			variables: { slug, locale: context.locale },
			preview: context.preview,
		});

		if (!partner) return { notFound: true, revalidate };

		return {
			props: {
				...props,
				partner,
				page: {
					section: 'partners',
					parent: true,
					overview: '/partners',
					title: partner.title,
					slugs: pageSlugs('partners', props.year.title, partner._allSlugLocales),
				} as PageProps,
			},
			revalidate,
		};
	}
);
