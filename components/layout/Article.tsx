import s from './Article.module.scss'
import cn from 'classnames'
import React from 'react'
import { StructuredContent } from "/components";
import { Image } from 'react-datocms/image';
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import format from 'date-fns/format';

export type ArticleProps = {
  id: string
  children?: React.ReactNode | React.ReactNode[] | undefined
  title?: string
  subtitle?: string
  intro?: string
  image?: FileField
  imageSize?: 'small' | 'medium' | 'large'
  content?: any
  onClick?: (id: string) => void
  record?: any
  date?: string
}

const MAX_PORTRAIT_HEIGHT = 600;

export default function Article({ id, children, title, content, image, imageSize, intro, date, onClick, record }: ArticleProps) {

  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const ratio = Math.min(1, scrolledPosition / viewportHeight);
  const padding = `${ratio * 100}px`;
  const opacity = Math.max(0, 1 - (ratio * 4));
  const isPortrait = image.height > image.width
  const portraitStyle = {}

  return (
    <div className={cn(s.article, 'article')}>
      <h1>{title}</h1>
      {image &&
        <figure className={cn(s.mainImage, imageSize && s[imageSize])}>
          <Image
            data={image.responsiveImage}
            pictureClassName={s.picture}
            pictureStyle={{ padding, ...portraitStyle }}
          />
          <figcaption style={{ opacity }}>{image.title}</figcaption>
        </figure>
      }
      <section className="intro">
        {date &&
          <div className={s.date}>
            <span className="small">{format(new Date(date), 'MMM').replace('.', '')}</span>
            <span>{format(new Date(date), 'dd').replace('.', '')}</span>
          </div>
        }
        {intro}
      </section>
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