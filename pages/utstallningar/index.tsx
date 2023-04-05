import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllExhibitionsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { formatDate } from "/lib/utils";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";

export type Props = {
  exhibitions: (ExhibitionRecord & ThumbnailImage)[]
}

export default function Exhibition({ exhibitions }: Props) {

  const t = useTranslations()
  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={t('Menu.exhibitions')} />
      <CardContainer key={asPath} columns={2}>
        {exhibitions.map(({ id, image, title, startDate, endDate, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              titleLength={80}
              titleRows={1}
              image={image}
              intro={intro}
              meta={`${formatDate(startDate, endDate)}`}
              slug={`/utstallningar/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
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