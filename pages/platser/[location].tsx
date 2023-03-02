import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { LocationDocument, AllLocationsDocument } from "/graphql";
import { Article } from '/components';

export type Props = {
  location: LocationRecord
}

export default function Location({ location: { id, image, title, intro, content, _seoMetaTags } }: Props) {

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
  const { locations } = await apiQueryAll(AllLocationsDocument)
  const paths = locations.map(({ slug }) => ({ params: { location: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.location;
  const { location } = await apiQuery(LocationDocument, { variables: { slug }, preview: context.preview })

  if (!location)
    return { notFound: true }

  return {
    props: {
      ...props,
      location,
      pageTitle: location.title
    },
    revalidate
  };
});