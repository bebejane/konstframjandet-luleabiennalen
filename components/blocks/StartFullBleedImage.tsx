import s from './StartFullBleedImage.module.scss'
import React from 'react'
import { Image } from 'react-datocms';
import DatoLink from '/components/nav/DatoLink';

export type Props = {
  data: StartFullBleedImageRecord
}

export default function StartFullBleedImage({ data: { id, image, headline, text, link } }: Props) {

  return (
    <figure className={s.container}>
      <DatoLink link={link}>
        <Image data={image.responsiveImage} className={s.image} objectFit="cover" />
      </DatoLink>
    </figure>
  )
}