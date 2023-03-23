type PageProps = {
  year: YearRecord
  title?: string
  isArchive?: boolean
  isHome: boolean
}

type SiteLocale = 'en' | 'sv'

type ThumbnailImage = {
  thumb: FileField
}

type Messages = typeof import('../lib/i18n/en.json');
declare interface IntlMessages extends Messages { }
