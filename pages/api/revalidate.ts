import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { allYears, translatePath } from '/lib/utils';
import { defaultLocale, } from '/lib/i18n'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey, } = record.model;
  const { slug } = record
  const years = await allYears()
  const year = years.find(({ id }) => record.year === id)
  const prefix = !year ? '' : `/${year.title}`
  const slugs = typeof slug === 'object' ? slug : { [defaultLocale]: slug }
  const paths = []

  Object.keys(slugs).forEach((locale) => {
    const slug = slugs[locale]
    const localePaths = []
    switch (apiKey) {
      case 'year':
        localePaths.push('/')
        localePaths.push(`/${record.title}`)
        break;
      case 'start':
        localePaths.push('/')
        prefix && localePaths.push(`${prefix}/`)
        break;
      case 'about':
        localePaths.push(`/om/${slug}`)
        prefix && localePaths.push(`${prefix}/om/${slug}`)
        break;
      case 'program':
        localePaths.push(`/program/${slug}`)
        prefix && localePaths.push(`${prefix}/program/${slug}`)
        break;
      case 'program_category':
        localePaths.push(`/program`)
        prefix && localePaths.push(`${prefix}/program`)
        break;
      case 'participant':
        localePaths.push(`/medverkande/${slug}`)
        prefix && localePaths.push(`${prefix}/medverkande/${slug}`)
        break;
      case 'news':
        localePaths.push(`/nyheter/${slug}`)
        prefix && localePaths.push(`${prefix}/nyheter/${slug}`)
        break;
      case 'location':
        localePaths.push(`/partners`)
        prefix && localePaths.push(`${prefix}/platser/${slug}`)
        break;
      case 'exhibition':
        localePaths.push(`/utstallningar/${slug}`)
        prefix && localePaths.push(`${prefix}/utstallningar/${slug}`)
        break;
      case 'partner':
        localePaths.push(`/partners/${slug}`)
        prefix && localePaths.push(`${prefix}/partners/${slug}`)
        break;
      case 'contact':
        localePaths.push(`/kontakt`)
        break;
      default:
        break;
    }
    // Revalidate original paths before rewrites are applied
    localePaths.forEach(p => {
      const t = translatePath(p, defaultLocale, defaultLocale, year?.title)
      paths.push(locale === defaultLocale ? t : `/${locale}${t}`)
    })
  })

  return await revalidate(paths)
})