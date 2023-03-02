import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ParticipantDocument, AllParticipantsDocument } from "/graphql";
import { Article } from '/components';

export type Props = {
  participant: ParticipantRecord
}

export default function Participant({ participant: { id, image, title, intro, content, _seoMetaTags } }: Props) {

  return (
    <Article
      id={id}
      key={id}
      title={title}
      image={image}
      intro={intro}
      content={content}
      onClick={(imageId) => { }}
    />
  );
}

export async function getStaticPaths() {
  const { participants } = await apiQueryAll(AllParticipantsDocument)
  const paths = participants.map(({ slug }) => ({ params: { participant: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.participant;
  const { participant } = await apiQuery(ParticipantDocument, { variables: { slug }, preview: context.preview })

  if (!participant)
    return { notFound: true }

  return {
    props: {
      ...props,
      participant,
      pageTitle: participant.title
    },
    revalidate
  };
});