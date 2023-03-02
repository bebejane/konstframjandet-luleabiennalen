import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React, { useState } from 'react'
import { Image } from 'react-datocms/image'
import Link from 'next/link'

export type Props = {
  image: FileField,
  slug: string,
  title: string,
  subtitle?: string,
}

export default function Thumbnail({ image, slug, title, subtitle }: Props) {

  const [hover, setHover] = useState<undefined | boolean>(false);
  const [ratio, setRatio] = useState<number>(0)
  const horizontal = title.split('').slice((title.length * ratio))
  const vertical = title.split('').slice(0, Math.round(title.length * ratio))
  const readMore = subtitle || 'Visa'
  const more = readMore.split('').slice(readMore.length - (readMore.length * ratio))

  return (
    <Link
      className={s.thumbnail}
      href={slug}
    >
      {image &&
        <Image
          data={image.responsiveImage}
          className={s.image}
          pictureClassName={cn(s.picture, hover && s.hover)}
        />
      }
      <span className={cn('mid', s.title)}>
        {title}
      </span>
    </Link>
  )
}