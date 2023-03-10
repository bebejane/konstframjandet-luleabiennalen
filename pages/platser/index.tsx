import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllLocationsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";

export type Props = {
  locations: (LocationRecord & ThumbnailImage)[]
}

export default function Location({ locations }: Props) {
  const t = useTranslations()
  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={t('Menu.locations')} />
      <CardContainer key={asPath}>
        {locations.map(({ id, image, thumb, title, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={thumb}
              slug={`/platser/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllLocationsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props,
    revalidate
  };
});