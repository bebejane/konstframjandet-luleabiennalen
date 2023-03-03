import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image } from 'react-datocms/image'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import Link from 'next/link'

export type Props = {
  image: FileField
  slug: string
  title: string
  intro?: string
  meta?: string
}

export default function Thumbnail({ image, slug, intro, title, meta }: Props) {

  const content = intro ? `${meta ? `**${meta}** ` : ''}${intro}` : undefined

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
          pictureClassName={s.picture}
        />
      }
      {content &&
        <Markdown className="thumb-intro" truncate={200}>
          {content}
        </Markdown>
      }
    </Link>
  )
}