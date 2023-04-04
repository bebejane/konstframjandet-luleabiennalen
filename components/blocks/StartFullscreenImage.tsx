import s from './StartFullscreenImage.module.scss'
import React from 'react'
import { Image } from 'react-datocms';

export type Props = {
  data: StartFullscreenImageRecord
}

export default function StartFullscreenImage({ data: { id, image, text, headline } }: Props) {

  return (
    <div className={s.container}>
      <Image data={image.responsiveImage} className={s.image} />
      <figcaption>
        <header>{headline}</header>
        <div>{text}</div>
      </figcaption>
    </div>
  )
}