import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllExhibitionsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { formatDate } from "/lib/utils";
import { useRouter } from "next/router";

export type Props = {
  exhibitions: (ExhibitionRecord & ThumbnailImage)[]
}

export default function Exhibition({ exhibitions }: Props) {

  const { asPath } = useRouter()
  return (
    <CardContainer key={asPath}>
      {exhibitions.map(({ id, image, title, startDate, endDate, intro, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={title}
            image={image}
            intro={intro}
            meta={`${formatDate(startDate, endDate)}`}
            slug={`/utstallningar/${slug}`}
          />
        </Card>
      )}
    </CardContainer>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllExhibitionsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props
    },
    revalidate
  };
});