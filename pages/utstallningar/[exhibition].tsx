import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ExhibitionDocument, AllExhibitionsDocument } from "/graphql";
import { Article, Related, BackButton, MetaSection } from '/components';
import { formatDate } from "/lib/utils";

export type Props = {
  exhibition: ExhibitionRecord
}

export default function Exhibition({ exhibition: {
  id,
  image,
  title,
  intro,
  externalLink,
  location,
  content,
  participants,
  startDate,
  time,
  _seoMetaTags
} }: Props) {

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
          { title: 'När', value: formatDate(startDate) },
          { title: 'Tider', value: time },
          { title: 'Länk', value: 'Hemsida', link: externalLink },
          { title: 'Var', value: location.title, link: `/platser/${location.slug}` }
        ]}
      />
      <Related header={'Medvärkande'} items={participants} />
      <BackButton>Visa alla utställningar</BackButton>
    </>
  )
}

export async function getStaticPaths() {
  const { exhibitions } = await apiQueryAll(AllExhibitionsDocument)
  const paths = exhibitions.map(({ slug }) => ({ params: { exhibition: slug }, locale: 'sv' }))
  paths.forEach(el => paths.push({ ...el, locale: 'en' }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.exhibition;
  const { exhibition } = await apiQuery(ExhibitionDocument, { variables: { slug, locale: context.locale }, preview: context.preview })

  if (!exhibition)
    return { notFound: true }

  return {
    props: {
      ...props,
      exhibition,
      pageTitle: exhibition.title
    }
  };
});