import s from './StartRandomParticipant.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: any
}

export default function StartRandomParticipant({ data: { } }: Props) {

  return (
    <div className={s.container}>

    </div>
  )
}