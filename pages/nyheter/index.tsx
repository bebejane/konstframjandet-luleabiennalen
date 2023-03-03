import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllNewsDocument } from "/graphql";
import Link from 'next/link'
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import format from "date-fns/format";
import { capitalize } from "/lib/utils";

export type Props = {
  news: (NewsRecord & ThumbnailImage)[]
}

export default function News({ news }: Props) {

  return (
    <section className={s.news}>
      <ul>
        {news.map(({ id, image, thumb, title, intro, _createdAt, slug }) =>
          <li>
            <h3 class="small">{format(new Date(_createdAt), 'dd MMM, yyyy')}</h3>

            <h1>{title}</h1>
            <div className="intro">
              <Markdown className={s.intro}>
                {`**${capitalize(format(new Date(_createdAt), 'dd MMM, yyyy'))}**${intro}`}
              </Markdown>
            </div>
            <Link href={`/nyheter/${slug}`}><button>Läs mer</button></Link>
          </li>
        )
        }
      </ul>
    </section>
  )
}

export const getStaticProps = withGlobalProps({ queries: [AllNewsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props
    },
    revalidate
  };
});