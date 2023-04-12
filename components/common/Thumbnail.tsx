import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React, { useState } from 'react'
import { Image } from 'react-datocms/image'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import Link from '/components/nav/Link'
import { useRouter } from 'next/router'
import { usePage } from '/lib/context/page'
import { randomInt, truncateText, truncateWords } from '/lib/utils'
import { remark } from 'remark'
import strip from 'strip-markdown'

export type Props = {
  image?: FileField
  slug: string
  title: string
  titleLength?: number
  titleRows?: number
  intro?: string
  meta?: string
}

export default function Thumbnail({ image, slug, intro, title, titleLength, titleRows = 3, meta }: Props) {

  const strippedIntro = remark().use(strip).processSync(intro).value as string
  const content = intro ? `${meta ? `**${meta}** ` : ''}${truncateWords(strippedIntro, 500)}` : undefined

  const { query: { year } } = useRouter()
  const { year: { loadingImage, isArchive } } = usePage()
  const [loadingImageIndex] = useState(randomInt(0, loadingImage.length - 1))
  const [loaded, setLoaded] = useState(false);
  const href = year ? `/${year}${slug}` : slug;

  return (
    <Link
      className={s.thumbnail}
      href={href}
    >
      <h3 className={cn(s[`rows-${titleRows}`])}>
        <span>
          {titleLength ? truncateWords(title, titleLength) : title}
        </span>
      </h3>
      {image &&
        <div className={s.imageWrap}>
          <>
            <Image
              data={image.responsiveImage}
              className={s.image}
              pictureClassName={s.picture}
              style={{ opacity: loaded ? 1 : 0.000001 }}
              onLoad={() => setLoaded(true)}
            /><div className={s.border}></div>
          </>
          {!isArchive &&
            <Image
              data={loadingImage[loadingImageIndex].responsiveImage}
              className={cn(s.loader)}
              pictureClassName={cn(s.picture, s.loader, loaded && s.hide)}
              lazyLoad={false}
              objectFit={'contain'}
            />
          }
        </div>
      }
      {content &&
        <Markdown className="thumb-intro">
          {content}
        </Markdown>
      }
    </Link>
  )
}