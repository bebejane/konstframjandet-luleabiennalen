import { apiQuery } from 'dato-nextjs-utils/api';
import { MenuDocument } from "/graphql";
import years from '/lib/years.json'

export type Menu = MenuItem[]
export type MenuQueryResponse = { abouts: AboutRecord[], years: YearRecord[], year: YearRecord }

export type MenuItem = {
  id: 'about' | 'program' | 'exhibitions' | 'participants' | 'locations' | 'news' | 'contact' | 'archive'
  label: string
  slug?: string
  year?: string
  sub?: MenuItem[]
  global?: boolean
}

const base: Menu = [
  { id: 'about', label: 'Om', slug: '/om', sub: [] },
  { id: 'program', label: 'Program', slug: '/program' },
  { id: 'exhibitions', label: 'Utställningar', slug: '/utstallningar' },
  { id: 'participants', label: 'Medverkande', slug: '/medverkande' },
  { id: 'locations', label: 'Platser', slug: '/platser' },
  { id: 'news', label: 'Nyheter', slug: '/nyheter', global: true },
  { id: 'contact', label: 'Kontakt', slug: '/kontakt', global: true },
  { id: 'archive', label: 'Arkiv', sub: [] }
]

export const buildMenu = async (locale: string) => {

  const year = years.find(el => el.title === process.env.NEXT_PUBLIC_CURRENT_YEAR)
  const res: MenuQueryResponse = await apiQuery(MenuDocument, { variables: { yearId: year.id, locale } });
  const archive: MenuQueryResponse[] = await Promise.all(years.filter(({ id }) => id !== year.id).map(({ id }) => apiQuery(MenuDocument, { variables: { yearId: id, locale } })))
  const menu = buildYearMenu(res);
  const archiveIndex = menu.findIndex(el => el.id === 'archive')

  //@ts-ignore
  menu[archiveIndex].sub = archive.map(el => {
    return {
      id: `archive-${el.year.title}`,
      label: `LB°${el.year.title.substring(2)}`,
      slug: `/${el.year.title}`,
      sub: buildYearMenu(el, true).filter(e => !e.global).map(e => ({
        ...e,
        slug: `/${el.year.title}${e.slug}`,
        sub: e.sub?.map(e2 => ({ ...e2, slug: `/${el.year.title}${e2.slug}` })) || null
      }))
    }
  })
  return menu
}

export const buildYearMenu = (res: MenuQueryResponse, isArchive: boolean = false): MenuItem[] => {

  const menu = base.filter(({ id }) => isArchive ? id !== 'archive' : true).map(item => {
    let sub: MenuItem[];
    switch (item.id) {
      case 'about':
        sub = res.abouts.map(el => ({ id: 'about', label: el.title, slug: `/om/${el.slug}` }))
        break;
      default:
        break;
    }
    return { ...item, sub: sub || item.sub || null, year: res.year.title }
  })
  return menu
}
