import { apiQuery } from 'dato-nextjs-utils/api';
import { AllAboutsMenuDocument, AllYearsDocument } from "/graphql";

export type Menu = MenuItem[]

export type MenuItem = {
  type: string
  label: string
  slug?: string
  sub?: MenuItem[]
}

const base: Menu = [
  { type: 'about', label: 'Om', slug: '/om', sub: [] },
  { type: 'program', label: 'Program', slug: '/program' },
  { type: 'exhibition', label: 'Utställningar', slug: '/utstallningar' },
  { type: 'participant', label: 'Medverkande', slug: '/medverkande' },
  { type: 'location', label: 'Platser', slug: '/platser' },
  { type: 'news', label: 'Nyheter', slug: '/nyheter' },
  { type: 'contact', label: 'Kontakt', slug: '/kontakt' },
  { type: 'year', label: 'Arkiv', slug: '/[year]', sub: [] }
]

export const buildMenu = async () => {

  const {
    abouts,
    years,
  }: {
    abouts: AboutRecord[],
    years: YearRecord[],
  } = await apiQuery([
    AllAboutsMenuDocument,
    AllYearsDocument,
  ], { variables: [{ year: process.env.NEXT_PUBLIC_CURRENT_YEAR }] });

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.type) {
      case 'about':
        sub = abouts.map(el => ({ type: 'about', label: el.title, slug: `/om/${el.slug}` }))
        break;
      case 'year':
        sub = item.sub.concat(years.map(el => ({ type: 'year', label: el.title, slug: `/${el.title}` })))
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub || null }
  })

  return menu
}