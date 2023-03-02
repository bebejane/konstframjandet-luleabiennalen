import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllLocationsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
export type Props = {
  locations: LocationRecord[]
}

export default function Location({ locations }: Props) {

  return (
    <CardContainer>
      {locations.map(({ id, image, title, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={title}
            image={image}
            slug={`/platser/${slug}`}
          />
        </Card>
      )}
    </CardContainer>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllLocationsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props,
    revalidate
  };
});