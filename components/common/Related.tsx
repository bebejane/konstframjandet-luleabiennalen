import s from './Related.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { recordToSlug } from '/lib/utils'

export type Props = {
  header: string
  items: (ParticipantRecord | LocationRecord)[]
}

export default function Related({ header, items }: Props) {

  if (!items?.length) return null

  return (
    <section className={s.related}>
      <h2>{header}</h2>
      <ul>
        {items.map(({ id, image, title }, idx) =>
          <li key={id}>
            <Link href={recordToSlug(items[idx])}>
              <figure>
                <Image data={image.responsiveImage} />
                <figcaption>{title}</figcaption>
              </figure>
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}