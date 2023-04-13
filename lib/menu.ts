import { apiQuery } from 'dato-nextjs-utils/api';
import { MenuDocument } from "/graphql";
import i18nPaths from '/lib/i18n/paths.json'
import { allYears, locales } from '/lib/utils';

const base: Menu = [
  { id: 'home', label: 'Hem', slug: '/', general: true, root: true },
  { id: 'news', label: 'Nyheter', slug: '/nyheter', general: true, root: true },
  { id: 'exhibitions', label: 'Utställningar', slug: '/utstallningar', root: true },
  { id: 'program', label: 'Program', slug: '/program', root: true },
  { id: 'participants', label: 'Medverkande', slug: '/medverkande', root: true },
  { id: 'locations', label: 'Platser', slug: '/platser', root: true },
  { id: 'partners', label: 'Partners', slug: '/partners', general: false, root: true },
  { id: 'about', label: 'Om', slug: '/om', sub: [], root: false },
  { id: 'contact', label: 'Kontakt', slug: '/kontakt', general: true, root: true },
  { id: 'archive', label: 'Arkiv', slug: '/arkiv', general: true, sub: [], root: false },
  { id: 'search', label: 'Sök', slug: '/sok', general: true, root: true }
]

export const buildMenu = async (locale: string) => {

  const altLocale = locales.find(l => locale != l)
  const years = await allYears()
  const year = years[0]
  const res: MenuQueryResponse = await apiQuery(MenuDocument, { variables: { yearId: year.id, locale, altLocale } });
  const archive: MenuQueryResponse[] = await Promise.all(years.filter(({ id }) => id !== year.id).map(({ id }) => apiQuery(MenuDocument, { variables: { yearId: id, locale, altLocale } })))
  const menu = buildYearMenu(res, locale, altLocale, false);
  const archiveIndex = menu.findIndex(el => el.id === 'archive')

  //@ts-ignore
  menu[archiveIndex].sub = archive.map(el => {
    const year = el.year.title;
    const haveAboutOverview = el.abouts.filter(({ year }) => year).length > 0

    return {
      id: `about-archive-${year}`,
      label: `LB°${year.substring(2)}`,
      slug: haveAboutOverview ? `/${year}` : null,
      altSlug: haveAboutOverview ? `/${year}` : null,
      sub: buildYearMenu(el, locale, altLocale, true).filter(e => !e.general).map(e => ({
        ...e,
        id: `${e.id}-archive`,
        slug: `${e.slug}`,
        altSlug: `${e.altSlug}`,
        sub: e.sub?.map(e2 => ({
          ...e2,
          slug: `${e2.slug}`,
          altSlug: `${e2.altSlug}`
        })) || null
      }))
        .filter(({ count }) => count || count === null)
        .sort((a, b) => a.id === 'about' ? -1 : 1)
    }
  })

  return menu
}

export const buildYearMenu = (res: MenuQueryResponse, locale: string, altLocale: string, isArchive: boolean = false): MenuItem[] => {

  const menu = base.map(item => {

    let sub: MenuItem[];
    const year = res.year.title

    if (item.slug) {
      item.slug = `/${!item.general ? year + '/' : ''}${i18nPaths[item.id][locale]}`
      item.altSlug = `/${!item.general ? year + '/' : ''}${i18nPaths[item.id][altLocale]}`
    }

    switch (item.id) {
      case 'about':
        //@ts-ignore
        sub = res.abouts.filter(({ year }) => isArchive ? year : true).map(el => ({
          id: `about-${el.slug}`,
          label: el.title,
          slug: `/${year}/${i18nPaths.about[locale]}/${el.slug}`,
          altSlug: `/${year}/${i18nPaths.about[altLocale]}/${el.altSlug}`,
          root: false
        }))
        break;
      default:
        break;
    }
    return {
      ...item,
      sub: sub || item.sub || null,
      year: res.year.title,
      count: res[`${item.id}Meta`]?.count ?? null
    }
  })

  return menu.filter(({ count }) => count || count === null);
}


export type Menu = MenuItem[]
export type MenuQueryResponse = {
  abouts: (AboutRecord & { altSlug: string })[]
  years: YearRecord[]
  year: YearRecord
  aboutMeta: { count: number }
  progamMeta: { count: number }
  participantsMeta: { count: number }
  exhibitionsMeta: { count: number }
  locationsMeta: { count: number }
}

export type MenuItem = {
  id: SectionId
  label: string
  slug?: string
  altSlug?: string
  year?: string
  sub?: MenuItem[]
  count?: number
  root: boolean
  general?: boolean
}
