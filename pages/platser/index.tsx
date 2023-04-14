import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllLocationsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";
import { pageSlugs } from "/lib/i18n";

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
        {locations.map(({ id, image, title, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              titleLength={80}
              titleRows={1}
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
    props: {
      ...props,
      page: {
        section: 'locations',
        slugs: pageSlugs('locations', props.year.title)
      } as PageProps
    },
    revalidate
  };
});