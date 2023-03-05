export { default, getStaticProps } from '/pages/nyheter/[news]'
import { getStaticYearPaths } from '/lib/utils'
import { AllNewsDocument } from '/graphql'

export async function getStaticPaths() {
  return getStaticYearPaths(AllNewsDocument, 'news')
}
