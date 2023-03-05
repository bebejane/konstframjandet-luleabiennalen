import years from "/lib/years.json";
import { apiQueryAll } from "/lib/utils";
import { AllParticipantsDocument } from "/graphql";
export { default, getStaticProps } from '/pages/medverkande/[participant]'

export async function getStaticPaths() {

  const { participants }: { participants: ParticipantRecord[] } = await apiQueryAll(AllParticipantsDocument)
  const paths = []

  years.forEach(({ title }) => {
    const yearParticipants = participants.filter(({ year }) => year?.title === title || !year)
    paths.push.apply(paths, yearParticipants.map(a => ({ params: { year: title, participant: a.slug } })))
  })

  return {
    paths,
    fallback: 'blocking',
  };
}
