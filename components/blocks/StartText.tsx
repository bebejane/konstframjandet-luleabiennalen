import s from './StartText.module.scss'
import React from 'react'
import Link from '/components/nav/Link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: StartTextRecord
}

export default function StartText({ data: { text, headline, linkText, url } }: Props) {

  return (
    <div className={s.container}>
      {headline &&
        <header>
          <h2>{headline}</h2>
        </header>
      }

      <Markdown className={s.text}>
        {text}
      </Markdown>

      <h3>
        <Link href={url} className="small">{linkText}</Link>
      </h3>
    </div>
  )
}