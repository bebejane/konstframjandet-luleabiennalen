import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { PartnerDocument, AllPartnersDocument } from "/graphql";
import { Article, Related, BackButton, MetaSection } from '/components';
import { formatDate } from "/lib/utils";
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";

export type Props = {
  partner: PartnerRecord
}

export default function Partner({ partner: {
  id,
  image,
  title,
  intro,
  content,
  address,
  city,
  webpage,
  _seoMetaTags
} }: Props) {

  const t = useTranslations()

  return (
    <>
      <Article
        id={id}
        key={id}
        title={title}
        image={image}
        intro={intro}
        content={content}
        onClick={(imageId) => { }}
      />
      <MetaSection
        key={`${id}-meta`}
        items={[
          { title: t('MetaSection.city'), value: city },
          { title: t('MetaSection.address'), value: address },
          { title: t('MetaSection.link'), value: t('MetaSection.webpage'), link: webpage }
        ]}
      />
      {/*
      <Related header={t('Menu.participants')} items={partners} />
      */}
      <BackButton>{t('BackButton.showAllPartners')}</BackButton>
    </>
  )
}

export async function getStaticPaths() {
  const { partners } = await apiQueryAll(AllPartnersDocument)
  const paths = partners.map(({ slug }) => ({ params: { partner: slug }, locale: 'sv' }))
  paths.forEach(el => paths.push({ ...el, locale: 'en' }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.partner;
  const { partner } = await apiQuery(PartnerDocument, { variables: { slug, locale: context.locale }, preview: context.preview })

  if (!partner)
    return { notFound: true }

  return {
    props: {
      ...props,
      partner,
      pageTitle: partner.title
    }
  };
});