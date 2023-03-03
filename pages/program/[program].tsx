import s from "./[program].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ProgramDocument, AllProgramsDocument } from "/graphql";
import { Article, Related, BackButton, MetaSection } from '/components';
import { formatDate } from "/lib/utils";

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
          { title: 'Vad', value: programCategory?.title },
          { title: 'När', value: formatDate(startDate) },
          { title: 'Tider', value: time },
          { title: 'Länk', value: 'Hemsida', link: externalLink },
          { title: 'Var', value: location.title, link: `/platser/${location.slug}` }
        ]}
      />
      <Related header={'Medvärkande'} items={partipants} />
      <BackButton>Visa hela programmet</BackButton>
    </>
  );
}

export async function getStaticPaths() {
  const { programs } = await apiQueryAll(AllProgramsDocument)
  const paths = programs.map(({ slug }) => ({ params: { program: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.program;
  const { program } = await apiQuery(ProgramDocument, { variables: { slug }, preview: context.preview })

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