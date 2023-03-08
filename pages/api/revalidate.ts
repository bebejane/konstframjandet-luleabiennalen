import years from '/lib/years.json'
import { withRevalidate } from 'dato-nextjs-utils/hoc'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey, } = record.model;
  const { slug } = record
  const year = years.find(({ id }) => record.year === id)
  const prefix = !year || year?.title === process.env.NEXT_PUBLIC_CURRENT_YEAR ? '' : `/${year.title}`

  const paths = []

  switch (apiKey) {
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
    case 'locations':
      paths.push(`/platser/${slug}`)
      prefix && paths.push(`${prefix}/platser/${slug}`)
      break;
    case 'exhibitions':
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