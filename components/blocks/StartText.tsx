import s from './StartText.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: any
}

export default function StartText({ data: { text, headline } }: Props) {

  return (
    <div className={s.container}>
      {headline &&
        <h2>{headline}</h2>
      }
      <h3>
        <Markdown className={s.text}>
          {text}
        </Markdown>
      </h3>
    </div>
  )
}