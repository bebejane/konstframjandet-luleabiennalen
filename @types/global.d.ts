import { AriaAttributes, DOMAttributes } from "react";

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

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
};