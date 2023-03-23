import s from './StartFullscreenImage.module.scss'
import React from 'react'
import { Image } from 'react-datocms';

export type Props = {
  data: StartFullBleedImageRecord
}

export default function StartFullBleedImage({ data: { id, image } }: Props) {

  return (
    <div className={s.container}>
      <Image data={image.responsiveImage} className={s.image} />
    </div>
  )
}