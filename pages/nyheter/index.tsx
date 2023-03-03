import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllNewsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";

export type Props = {
  news: (NewsRecord & ThumbnailImage)[]
}

export default function News({ news }: Props) {

  return (
    <section>
      {
        news.map(({ id, image, thumb, title, intro, slug }) =>
          <>
            <h1>{title}</h1>
            <div className="intro"><strong className="small">12 jun, 2023</strong>{intro}</div>
            <button>Läs mer</button>
          </>
        )
      }
    </section>
    /*
    <CardContainer>
      {news.map(({ id, image, thumb, title, intro, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={title}
            image={thumb}
            intro={intro}
            meta="23 jun"
            slug={`/nyheter/${slug}`}
          />
        </Card>
      )}
    </CardContainer>
    */
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllNewsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props
    },
    revalidate
  };
});