import s from './ImageShortcut.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image } from 'react-datocms'
import { ReadMore } from '/components'

export type ImageShortcutBlockProps = {
  data: ImageShortcutRecord
}

export default function ImageShortcut({ data: { headline, image, link, text, blackHeadline } }: ImageShortcutBlockProps) {

  return (
    <section className={s.container}>
      <figure>
        {image &&
          <Image
            className={s.image}
            data={image.responsiveImage}
            objectFit={'cover'}
          />
        }
        <figcaption>
          <div className={s.fade}></div>
          <h2 className={cn(blackHeadline && s.black)}>
            {headline}
          </h2>
          <p className={cn(blackHeadline && s.black, "intro")}>{text}</p><br />
          <ReadMore link={link} message='Läs mer' external={true} regional={false} />
        </figcaption>
      </figure>
    </section >
  )
}