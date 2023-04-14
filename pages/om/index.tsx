import s from './[about].module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { AllAboutsDocument } from "/graphql";
import { pageSlugs } from '/lib/i18n';

export { default } from './[about]'

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const yearId = props.year.id
  const { abouts } = await apiQuery(AllAboutsDocument, { variables: { first: 1, locale: context.locale, yearId }, preview: context.preview })

  if (!abouts || !abouts.length)
    return { notFound: true }

  return {
    props: {
      ...props,
      about: abouts[0],
      page: {
        section: 'about',
        title: abouts[0].title,
        slugs: pageSlugs('about', props.year.title, abouts[0]._allSlugLocales)
      } as PageProps
    },
    revalidate
  };
});