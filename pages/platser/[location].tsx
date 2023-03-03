import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { LocationDocument, AllLocationsDocument } from "/graphql";
import { Article, Related } from '/components';

export type LocationExtendedRecord = (LocationRecord & ThumbnailImage) & {
  exhibitions: ExhibitionRecord[]
  programs: ProgramRecord[]
}

export type Props = {
  location: LocationExtendedRecord
}

export default function Location({ location: { id, image, title, intro, content, exhibitions, programs, _seoMetaTags } }: Props) {

  return (
    <>
      <Article
        id={id}
        key={id}
        title={title}
        image={image}
        intro={intro}
        imageSize="small"
        content={content}
        onClick={(imageId) => { }}
      />
      <Related header={'Relaterat'} items={[...exhibitions, ...programs]} />
      <button className="back">Visa alla platser</button>
    </>
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