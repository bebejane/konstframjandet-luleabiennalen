import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { ContactDocument } from "/graphql";
import { Article } from "/components";
import { apiQuery } from "dato-nextjs-utils/api";

export type Props = {
  contact: ContactRecord
}

export default function Program({ contact: { id, title, image, intro, content } }: Props) {

  return (
    <Article
      id={id}
      key={id}
      title={title}
      image={image}
      intro={intro}
      imageSize="small"
      content={content}
      onClick={(imageId) => { }}
    />
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
  const { contact } = await apiQuery(ContactDocument, { variables: { locale: context.locale } })

  return {
    props: {
      ...props,
      contact
    },
    revalidate
  };
});