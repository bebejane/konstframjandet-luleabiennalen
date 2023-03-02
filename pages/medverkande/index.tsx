import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllParticipantsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
export type Props = {
  participants: ParticipantRecord[]
}

export default function Participant({ participants }: Props) {

  return (
    <CardContainer>
      {participants.map(({ id, image, title, slug }) =>
        <Card key={id}>
          <Thumbnail
            title={title}
            image={image}
            slug={`/medverkande/${slug}`}
          />
        </Card>
      )}
    </CardContainer>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllParticipantsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props
    },
    revalidate
  };
});