import s from './Related.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image } from 'react-datocms'

export type Props = {
  header: string
  items: (ParticipantRecord | LocationRecord)[]
}

export default function Related({ header, items }: Props) {

  return (
    <section className={s.related}>
      <h2>{header}</h2>
      <ul>
        {items.map(({ id, image }) =>
          <li key={id}>
            <figure>
              <Image data={image.responsiveImage} />
              <figcaption>{image.title}</figcaption>
            </figure>
          </li>
        )}
      </ul>
    </section>
  )
}