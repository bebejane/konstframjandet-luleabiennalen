import s from './StartFullscreenImage.module.scss'
import React from 'react'
import { Image } from 'react-datocms';
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: StartFullscreenImageRecord
}

export default function StartFullscreenImage({ data: { id, image } }: Props) {

  return (
    <div className={s.container}>
      <Image data={image.responsiveImage} className={s.image} />
    </div>
  )
}