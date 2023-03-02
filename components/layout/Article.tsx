import s from './Article.module.scss'
import cn from 'classnames'
import React from 'react'
import { SectionHeader, StructuredContent } from "/components";
import { Image } from 'react-datocms/image';

export type ArticleProps = {
  id: string,
  children?: React.ReactNode | React.ReactNode[] | undefined
  title?: string,
  subtitle?: string,
  intro?: string,
  image?: FileField
  content?: any
  onClick?: (id: string) => void,
  record?: any
}

export default function Article(props: ArticleProps) {
  const { id, children, title, content, image, intro, onClick, record } = props

  return (
    <>
      <SectionHeader>LB22 — Om</SectionHeader>
      <div className={cn(s.article, 'article')}>
        <h1>{title}</h1>
        {image &&
          <figure>
            <Image data={image.responsiveImage} />
            <figcaption>{image.title}</figcaption>
          </figure>
        }
        <section className="intro">{intro}</section>
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
    </>
  )
}