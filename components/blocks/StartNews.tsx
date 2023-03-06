import s from './StartNews.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: any
}

export default function StartNews({ data: { } }: Props) {

  return (
    <div className={s.container}>

    </div>
  )
}