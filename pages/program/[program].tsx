import s from "./[program].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ProgramDocument, AllProgramsDocument } from "/graphql";
import { Article } from '/components';

export type Props = {
  program: ProgramRecord
}

export default function Program({ program: { id, image, title, intro, content, _seoMetaTags } }: Props) {

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
      <section className={s.related}>
        <h2>Medverkande</h2>
        <ul>
          <li>
            <img src="https://www.datocms-assets.com/95303/1677686597-orakel-2-olof-marsja.jpeg?auto=format&dpr=2"></img>
            <figcaption>Namn på konstnär</figcaption>
          </li>
          <li>
            <img src="https://www.datocms-assets.com/95303/1677682748-galleri-syster-wood-wall-alva-hoggren.jpeg?auto=format&dpr=2"></img>
            <figcaption>Namn på konstnär</figcaption>
          </li>
        </ul>
      </section>
      <button className="back">Visa alla utställningar</button>
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