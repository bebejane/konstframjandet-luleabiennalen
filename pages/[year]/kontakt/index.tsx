import years from "/lib/years.json";
export { default, getStaticProps } from '/pages/kontakt'

export async function getStaticPaths() {

  const paths = years.map(({ title }) => ({ params: { year: title } }))

  return {
    paths,
    fallback: 'blocking',
  };
}
