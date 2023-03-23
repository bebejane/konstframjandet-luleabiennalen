import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { LocationDocument, AllLocationsDocument } from "/graphql";
import { Article, Related, BackButton } from '/components';
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";

export type LocationExtendedRecord = (LocationRecord & ThumbnailImage) & {
  exhibitions: ExhibitionRecord[]
  programs: ProgramRecord[]
}

export type Props = {
  location: LocationExtendedRecord
}

export default function Location({ location: { id, image, title, intro, content, exhibitions, programs, _seoMetaTags } }: Props) {
  const t = useTranslations()

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
      <Related header={t('Related.related')} items={[...exhibitions, ...programs]} />
      <BackButton>{t('BackButton.showAllLocations')}</BackButton>
    </>
  );
}

export async function getStaticPaths() {
  const { locations } = await apiQueryAll(AllLocationsDocument)
  const paths = locations.map(({ slug }) => ({ params: { location: slug }, locale: 'sv' }))
  paths.forEach(el => paths.push({ ...el, locale: 'en' }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.location;
  const { location } = await apiQuery(LocationDocument, { variables: { slug, locale: context.locale }, preview: context.preview })

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