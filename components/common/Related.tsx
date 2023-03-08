import s from './Related.module.scss'
import cn from 'classnames'
import React from 'react'
import { KFImage as Image } from '/components'
import Link from 'next/link'
import { recordToSlug } from '/lib/utils'

export type Props = {
  header: string
  items: (ParticipantRecord | LocationRecord | ProgramRecord | ExhibitionRecord)[]
}

export default function Related({ header, items }: Props) {

  if (!items?.length) return null

  return (
    <section className={s.related}>
      <h2>{header}</h2>
      <ul>
        {items.map((item, idx) =>
          <li key={item.id}>
            <Link href={recordToSlug(items[idx])}>
              <figure>
                <Image data={item.image.responsiveImage} />
                <figcaption>
                  {item.__typename === 'ParticipantRecord' ? item.name : item.title}
                </figcaption>
              </figure>
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}