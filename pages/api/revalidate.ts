import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { allYears } from '/lib/utils';

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey, } = record.model;
  const { slug } = record
  const years = await allYears()
  const year = years.find(({ id }) => record.year === id)
  const prefix = !year || year?.title === process.env.NEXT_PUBLIC_CURRENT_YEAR ? '' : `/${year.title}`

  const paths = []

  switch (apiKey) {
    case 'start':
      paths.push('/')
      break;
    case 'about':
      paths.push(`/om/${slug}`)
      prefix && paths.push(`${prefix}/om/${slug}`)
      break;
    case 'program':
      paths.push(`/program/${slug}`)
      prefix && paths.push(`${prefix}/program/${slug}`)
      break;
    case 'participant':
      paths.push(`/medverkande/${slug}`)
      prefix && paths.push(`${prefix}/medverkande/${slug}`)
      break;
    case 'news':
      paths.push(`/nyheter/${slug}`)
      prefix && paths.push(`${prefix}/nyheter/${slug}`)
      break;
    case 'location':
      paths.push(`/platser/${slug}`)
      prefix && paths.push(`${prefix}/platser/${slug}`)
      break;
    case 'exhibition':
      paths.push(`/utstallningar/${slug}`)
      prefix && paths.push(`${prefix}/utstallningar/${slug}`)
      break;
    case 'contact':
      paths.push(`/kontakt`)
      break;
    default:
      break;
  }
  revalidate(paths)
})