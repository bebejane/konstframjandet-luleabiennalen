import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ExhibitionDocument, AllExhibitionsDocument } from "/graphql";
import { Article, SectionHeader } from '/components';

export type Props = {
  exhibition: ExhibitionRecord
}

export default function Exhibition({ exhibition: { id, image, title, intro, content, _seoMetaTags } }: Props) {

  return (
    <Article
      id={id}
      key={id}
      title={title}
      image={image}
      intro={intro}
      content={content}
      onClick={(imageId) => { }}
    />
  );
}

export async function getStaticPaths() {
  const { exhibitions } = await apiQueryAll(AllExhibitionsDocument)
  const paths = exhibitions.map(({ slug }) => ({ params: { exhibition: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.exhibition;
  const { exhibition } = await apiQuery(ExhibitionDocument, { variables: { slug }, preview: context.preview })

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