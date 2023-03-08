import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllParticipantsDocument } from "/graphql";
import { apiQueryAll } from "/lib/utils";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";

export type Props = {
  participants: (ParticipantRecord & ThumbnailImage)[]
}

export default function Participant({ participants }: Props) {

  const { asPath } = useRouter()

  return (
    <CardContainer key={asPath}>
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

export const getStaticProps = withGlobalProps({ queries: [AllParticipantsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props,
    revalidate
  };
});