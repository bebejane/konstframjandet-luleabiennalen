import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllYearsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";

export type Props = {
  years: YearRecord[]
}

export default function Archive({ years }: Props) {

  const t = useTranslations('Menu')
  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={t('archive')} />
      <CardContainer key={asPath}>
        {years.map(({ id, title, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              //image={image}
              //intro={intro}
              slug={`/title`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllYearsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props,
    revalidate
  };
});