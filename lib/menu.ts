import { apiQuery } from 'dato-nextjs-utils/api';
import { MenuDocument } from "/graphql";
import years from '/lib/years.json'

export type Menu = MenuItem[]
export type MenuQueryResponse = { abouts: AboutRecord[], years: YearRecord[], year: YearRecord }

export type MenuItem = {
  id: 'home' | 'about' | 'program' | 'exhibitions' | 'participants' | 'locations' | 'news' | 'contact' | 'archive'
  label: string
  slug?: string
  year?: string
  sub?: MenuItem[]
  root: boolean
  general?: boolean
}

const base: Menu = [
  { id: 'home', label: 'Hem', slug: '/', general: true, root: true },
  { id: 'about', label: 'Om', slug: '/om', sub: [], root: false },
  { id: 'program', label: 'Program', slug: '/program', root: true },
  { id: 'exhibitions', label: 'Utställningar', slug: '/utstallningar', root: true },
  { id: 'participants', label: 'Medverkande', slug: '/medverkande', root: true },
  { id: 'locations', label: 'Platser', slug: '/platser', root: true },
  { id: 'news', label: 'Nyheter', slug: '/nyheter', general: true, root: true },
  { id: 'contact', label: 'Kontakt', slug: '/kontakt', general: true, root: true },
  { id: 'archive', label: 'Arkiv', sub: [], root: false }
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
      sub: buildYearMenu(el, true).filter(e => !e.general).map(e => ({
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
        //@ts-ignore
        sub = res.abouts.map(el => ({ id: `about-${el.slug}`, label: el.title, slug: `/om/${el.slug}`, root: false }))
        break;
      default:
        break;
    }
    return { ...item, sub: sub || item.sub || null, year: res.year.title }
  })
  return menu
}
