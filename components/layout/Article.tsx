import s from './Article.module.scss'
import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { StructuredContent } from "/components";
import { Image } from 'react-datocms';
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { DatoSEO } from 'dato-nextjs-utils/components';
import Link from '/components/nav/Link'
import useStore from '/lib/store';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'

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
  partner?: PartnerRecord[]
}

export default function Article({ id, children, title, content, image, imageSize, intro, partner, date, onClick, record }: ArticleProps) {

  const { asPath } = useRouter()
  const t = useTranslations()
  const [setImageId, setImages] = useStore((state) => [state.setImageId, state.setImages])
  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const captionRef = useRef<HTMLElement | null>(null)
  const [offset, setOffset] = useState(0)
  const ratio = offset ? Math.max(0, Math.min(1, ((scrolledPosition - (offset > viewportHeight ? offset - viewportHeight + 100 : 0)) / viewportHeight))) : 0
  const padding = `${ratio * 100}px`;
  const opacity = Math.max(0, 1 - (ratio * 1.5));

  useEffect(() => {
    const images = [image]
    content?.blocks.forEach(el => {
      el.__typename === 'ImageRecord' && images.push(el.image)
      el.__typename === 'ImageGalleryRecord' && images.push.apply(images, el.images)
    })
    setImages(images.filter(el => el))
  }, [])

  useEffect(() => {
    setOffset(captionRef?.current?.offsetTop ?? 0)

  }, [asPath, viewportHeight])

  return (
    <>
      <DatoSEO title={title} />
      <div className={cn(s.article, 'article')}>
        <h1>{title}</h1>
        {image &&
          <figure
            className={cn(s.mainImage, imageSize && s[imageSize], image.height > image.width && s.portrait)}
            onClick={() => setImageId(image?.id)}
          >
            <Image
              data={image.responsiveImage}
              pictureClassName={s.picture}
              pictureStyle={{ padding }}
            />
            <figcaption ref={captionRef} style={{ opacity }}>{image.title}</figcaption>
          </figure>
        }
        <section className="intro">
          {date &&
            <div className={s.date}>
              <span className="small">{format(new Date(date), 'MMM').replace('.', '')}</span>
              <span>{format(new Date(date), 'dd').replace('.', '')}</span>
            </div>
          }
          <Markdown className={s.intro}>{intro}</Markdown>
        </section>
        {content &&
          <StructuredContent
            id={id}
            record={record}
            content={content}
            onClick={(imageId) => setImageId(imageId)}
          />
        }
        {children}
        {partner?.length > 0 &&
          <p>
            {t('General.inCooperationWith')} {partner.map(({ title, slug }, idx) =>
              <>
                <Link href={`/partners/${slug}`}>
                  {title}
                </Link>
                {partner.length - 1 > idx && ', '}
              </>
            )}
          </p>
        }
      </div>
    </>
  )
}