import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { NewsDocument, AllNewsDocument } from "/graphql";
import { Article, BackButton } from '/components';

export type Props = {
  news: NewsRecord
}

export default function News({ news: { id, image, title, intro, content, _seoMetaTags } }: Props) {

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
      <BackButton>Visa alla nyheter</BackButton>
    </>
  );
}

export async function getStaticPaths() {
  const { news } = await apiQueryAll(AllNewsDocument)
  const paths = news.map(({ slug }) => ({ params: { news: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.news;
  const { news } = await apiQuery(NewsDocument, { variables: { slug }, preview: context.preview })

  if (!news)
    return { notFound: true }

  return {
    props: {
      ...props,
      news,
      pageTitle: news?.title
    },
    revalidate
  };
});