import { apiQuery } from 'dato-nextjs-utils/api';
import { AllAboutsMenuDocument, AllYearsDocument } from "/graphql";

export type Menu = MenuItem[]

export type MenuItem = {
  id: 'about' | 'program' | 'exhibitions' | 'participants' | 'locations' | 'news' | 'contact' | 'archive'
  label: string
  slug?: string
  sub?: MenuItem[]
}

const base: Menu = [
  { id: 'about', label: 'Om', slug: '/om', sub: [] },
  { id: 'program', label: 'Program', slug: '/program' },
  { id: 'exhibitions', label: 'Utställningar', slug: '/utstallningar' },
  { id: 'participants', label: 'Medverkande', slug: '/medverkande' },
  { id: 'locations', label: 'Platser', slug: '/platser' },
  { id: 'news', label: 'Nyheter', slug: '/nyheter' },
  { id: 'contact', label: 'Kontakt', slug: '/kontakt' },
  { id: 'archive', label: 'Arkiv', slug: '/[year]', sub: [] }
]

export const buildMenu = async (locale: string) => {

  const year = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const {
    abouts,
    years,
  }: {
    abouts: AboutRecord[],
    years: YearRecord[],
  } = await apiQuery([
    AllAboutsMenuDocument,
    AllYearsDocument,
  ], { variables: [{ year, locale }, { year, locale }] });

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.id) {
      case 'about':
        sub = abouts.map(el => ({ id: 'about', label: el.title, slug: `/om/${el.slug}` }))
        break;
      case 'archive':
        sub = item.sub.concat(years.map(el => ({ id: 'archive', label: el.title, slug: `/${el.title}` })))
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub || null }
  })

  return menu
}