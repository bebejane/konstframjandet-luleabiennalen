type PageProps = {
  year: YearRecord
  title?: string
  isArchive?: boolean
}

type ThumbnailImage = {
  thumb: FileField
}

type Messages = typeof import('../lib/messages/en.json');
declare interface IntlMessages extends Messages { }
