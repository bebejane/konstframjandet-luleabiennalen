type SiteLocale = 'en' | 'sv'

type PageSlug = {
  locale: SiteLocale
  value: string
}

type PageProps = {
  year: YearRecord
  title?: string
  isArchive?: boolean
  isHome: boolean
  slugs: PageSlugs[]
}



type SectionId = 'home' | 'contact' | 'participants' | 'news' | 'about' | 'locations' | 'program' | 'exhibitions' | 'partners' | 'archive' | 'search'

type ThumbnailImage = {
  thumb: FileField
}

type Messages = typeof import('../lib/i18n/en.json');
declare interface IntlMessages extends Messages { }
