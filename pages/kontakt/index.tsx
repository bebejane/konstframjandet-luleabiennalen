import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { DatoSEO } from 'dato-nextjs-utils/components';
import { useTranslations } from "next-intl";

export type Props = {

}

export default function Program({ }: Props) {
  const t = useTranslations('Menu')
  return (
    <>
      <DatoSEO title={t('contact')} />
      Kontakt
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props
    },
    revalidate
  };
});