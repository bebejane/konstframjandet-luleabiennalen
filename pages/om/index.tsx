import s from './[about].module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQueryAll } from 'dato-nextjs-utils/api';
import { AllAboutsDocument } from "/graphql";
import { pageSlugs } from '/lib/i18n';

export { default } from './[about]'

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const yearId = props.year.id
  const { abouts } = await apiQueryAll(AllAboutsDocument, { variables: { locale: context.locale }, preview: context.preview })
  const about = abouts.filter(el => !el.year || el.year?.id === yearId).sort((a, b) => a.year?.title > b.year?.title ? -1 : 1)[0]

  if (!about)
    return { notFound: true, revalidate }

  return {
    props: {
      ...props,
      about,
      page: {
        section: 'about',
        title: about.title,
        slugs: pageSlugs('about', props.year.title, about._allSlugLocales)
      } as PageProps
    },
    revalidate
  };
});