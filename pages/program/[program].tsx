import s from "./[program].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ProgramDocument, AllProgramsDocument } from "/graphql";
import { Article, Related, BackButton, MetaSection } from '/components';
import { formatDate } from "/lib/utils";
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";

export type Props = {
  program: ProgramRecord
}

export default function Program({ program: {
  id,
  image,
  title,
  intro,
  startDate,
  endDate,
  time,
  externalLink,
  location,
  content,
  partipants,
  programCategory,
  slug,
  _seoMetaTags
} }: Props) {

  const t = useTranslations();

  return (
    <>
      <Article
        id={id}
        key={id}
        title={title}
        image={image}
        imageSize="small"
        intro={intro}
        content={content}
        date={startDate}
        onClick={(imageId) => { }}
      />
      <MetaSection
        key={`${id}-meta`}
        items={[
          { title: t('MetaSection.what'), value: programCategory?.title },
          { title: t('MetaSection.where'), value: location?.title, link: `/platser/${location?.slug}` },
          { title: t('MetaSection.when'), value: formatDate(startDate) },
          { title: t('MetaSection.times'), value: time },
          { title: t('MetaSection.where'), value: location?.address },
          { title: t('MetaSection.link'), value: externalLink ? t('MetaSection.webpage') : undefined, link: externalLink }
        ]}
      />
      <Related header={'Medvärkande'} items={partipants} />
      <BackButton>{t('BackButton.showAllPrograms')}</BackButton>
    </>
  );
}

export async function getStaticPaths() {
  const { programs } = await apiQueryAll(AllProgramsDocument)
  const paths = programs.map(({ slug }) => ({ params: { program: slug }, locale: 'sv' }))
  paths.forEach(el => paths.push({ ...el, locale: 'en' }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.program;
  const { program } = await apiQuery(ProgramDocument, { variables: { slug, locale: context.locale }, preview: context.preview })

  if (!program)
    return { notFound: true }

  return {
    props: {
      ...props,
      program,
      pageTitle: program.title
    }
  };
});