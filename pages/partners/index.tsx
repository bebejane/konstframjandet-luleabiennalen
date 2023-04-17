import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllLocationsDocument, AllPartnersDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, Link } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";
import { Image } from "react-datocms";
import { pageSlugs } from "/lib/i18n";
import { usePage } from "/lib/context/page";

export type Props = {
  partners: PartnerRecord[]
  locations: LocationRecord[]
  financiers: YearRecord
}

export default function Partners({ partners, locations, financiers: { fundedBy } }: Props) {

  const t = useTranslations()
  const { asPath } = useRouter()
  const { year } = usePage()

  return (
    <>
      <DatoSEO title={t('Menu.partners')} />
      <CardContainer key={asPath}>
        {partners.map(({ id, image, title, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/partners/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
      <h3>{t('Menu.locations')}</h3>
      <CardContainer key={asPath}>
        {locations.map(({ id, image, title, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/locations/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
      <section className={s.financiers}>
        <h3>Luleåbiennalen {year.title} {t('Partners.supportedBy')}</h3>
        <ul>
          {fundedBy.map(({ id, url, logo }) =>
            <li key={id}>
              <a href={url}>
                <Image data={logo.responsiveImage} className={s.image} objectFit={'contain'} />
              </a>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllPartnersDocument, AllLocationsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'partners',
        slugs: pageSlugs('partners', props.year.title)
      } as PageProps
    },
    revalidate
  };
});