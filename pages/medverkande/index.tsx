import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllParticipantsDocument } from "/graphql";
import { apiQueryAll } from "/lib/utils";
import { CardContainer, Card, Thumbnail } from "/components";

export type Props = {
  participants: (ParticipantRecord & ThumbnailImage)[]
}

export default function Participant({ participants }: Props) {

  return (
    <CardContainer>
      {participants.map(({ id, image, thumb, name, intro, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={name}
            image={thumb}
            intro={intro}
            slug={`/medverkande/${slug}`}
          />
        </Card>
      )}
    </CardContainer>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

  const { participants } = await apiQueryAll(AllParticipantsDocument, { variables: { yearId: props.year.id } })

  return {
    props: {
      ...props,
      participants
    },
    revalidate
  };
});