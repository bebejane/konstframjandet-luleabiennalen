import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllExhibitionsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";

export type Props = {
  exhibitions: ExhibitionRecord[]
}

export default function Exhibition({ exhibitions }: Props) {

  return (

    <CardContainer>
      {exhibitions.map(({ id, image, title, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={title}
            image={image}
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