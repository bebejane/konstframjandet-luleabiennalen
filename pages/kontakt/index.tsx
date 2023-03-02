import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";

export type Props = {

}

export default function Program({ }: Props) {

  return (
    <>
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