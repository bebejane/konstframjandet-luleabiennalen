import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllExhibitionsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { formatDate } from "/lib/utils";

export type Props = {
  q: string
}

export default function Search({ q }: Props) {

  return (
    <div>
      <h1>Search</h1>
      {q}
    </div>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, context }: any) => {

  return {
    props: {
      ...props,
    }
  };
});
