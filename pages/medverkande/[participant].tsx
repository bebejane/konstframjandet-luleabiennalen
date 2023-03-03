import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { ParticipantDocument, AllParticipantsDocument } from "/graphql";
import { Article, Related, BackButton } from '/components';

export type ParticipantExtendedRecord = (ParticipantRecord & ThumbnailImage) & {
  exhibitions: ExhibitionRecord[]
  programs: ProgramRecord[]
}

export type Props = {
  participant: ParticipantExtendedRecord
}

export default function Participant({ participant: { id, image, name, intro, content, exhibitions, programs, _seoMetaTags } }: Props) {
  return (
    <>
      <Article
        id={id}
        key={id}
        title={name}
        image={image}
        intro={intro}
        content={content}
        onClick={(imageId) => { }}
      />
      <Related header={'Deltar i'} items={[...exhibitions, ...programs]} />
      <BackButton>Visa alla medverkande</BackButton>
    </>
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
      pageTitle: participant.name
    },
    revalidate
  };
});