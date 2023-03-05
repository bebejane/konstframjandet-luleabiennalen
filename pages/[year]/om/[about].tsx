import years from "/lib/years.json";
import { apiQueryAll } from "/lib/utils";
import { AllAboutsDocument } from "/graphql";
export { default, getStaticProps } from '/pages/om/[about]'

export async function getStaticPaths() {

  const { abouts }: { abouts: AboutRecord[] } = await apiQueryAll(AllAboutsDocument)
  const paths = []
  years.forEach(({ title }) => {
    const yearAbouts = abouts.filter(({ year }) => year?.title === title || !year)
    paths.push.apply(paths, yearAbouts.map(a => ({ params: { year: title, about: a.slug } })))
  })

  return {
    paths,
    fallback: 'blocking',
  };
}
