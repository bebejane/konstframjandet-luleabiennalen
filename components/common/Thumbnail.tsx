import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React, { useState } from 'react'
import { Image } from 'react-datocms/image'
import Link from 'next/link'

export type Props = {
  image: FileField,
  slug: string,
  title: string,
  intro?: string,
  subtitle?: string,
}

export default function Thumbnail({ image, slug, intro, title, subtitle }: Props) {

  const [hover, setHover] = useState<undefined | boolean>(false);
  const [ratio, setRatio] = useState<number>(0)
  const readMore = subtitle || 'Visa'

  return (
    <Link
      className={s.thumbnail}
      href={slug}
    >
      <h3>{title}</h3>
      {image &&
        <Image
          data={image.responsiveImage}
          className={s.image}
          pictureClassName={cn(s.picture, hover && s.hover)}
        />
      }
      <div className="thumb-intro">{intro}</div>


    </Link>
  )
}