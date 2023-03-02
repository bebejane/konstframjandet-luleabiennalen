import s from './Article.module.scss'
import cn from 'classnames'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent } from "/components";
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import { Image } from 'react-datocms/image';

export type ArticleProps = {
  id: string,
  children?: React.ReactNode | React.ReactNode[]
  title?: string,
  subtitle?: string,
  blackHeadline?: boolean,
  text?: string,
  image?: FileField
  showImage?: boolean,
  content?: any
  editable?: any
  noBottom?: boolean
  onClick?: (id: string) => void
}

export default function Article({
  id,
  children,
  title,
  content,
  onClick,
}, record: ArticleProps) {

  const { scrolledPosition } = useScrollInfo()

  return (

    <div className={cn(s.article, 'article')}>
      {content &&
        <StructuredContent
          id={id}
          record={record}
          content={content}
          onClick={(imageId) => onClick?.(imageId)}
        />
      }
      {children}
    </div>
  )
}