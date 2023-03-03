import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllNewsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";

export type Props = {
  news: (NewsRecord & ThumbnailImage)[]
}

export default function News({ news }: Props) {

  return (
    <CardContainer>
      {news.map(({ id, image, thumb, title, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={title}
            image={thumb}
            slug={`/nyheter/${slug}`}
          />
        </Card>
      )}
    </CardContainer>
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