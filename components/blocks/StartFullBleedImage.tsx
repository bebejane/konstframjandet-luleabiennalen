import s from './StartFullBleedImage.module.scss'
import React from 'react'
import { Image } from 'react-datocms';
import DatoLink from '/components/nav/DatoLink';

export type Props = {
  data: StartFullBleedImageRecord
}

export default function StartFullBleedImage({ data: { id, image, headline, text, link } }: Props) {

  return (
    <DatoLink link={link}>
      <figure className={s.container}>

        <Image data={image.responsiveImage} className={s.image} objectFit="cover" />


        <figcaption>
          <h2>{headline}</h2>
          <span>{text}</span>
        </figcaption>
      </figure>
    </DatoLink>
  )
}