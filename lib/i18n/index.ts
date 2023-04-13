import { locales } from '/lib/utils'
import i18nPaths from './paths.json'

export const pageSlugs = (id: SectionId, year?: string, slugs?: PageSlug[]): PageSlug[] => {
  return locales.map((locale) => ({
    locale: locale as SiteLocale,
    value: `${year ? `/${year}` : ''}/${i18nPaths[id][locale]}${slugs ? `/${slugs.find((s) => s.locale === locale).value}` : ''}`,
  }))
}