import s from './StartGallery.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: StartGalleryRecord
}

export default function StartGallery({ data: { images } }: Props) {

  return (
    <div className={s.container}>
      gallery
    </div>
  )
}