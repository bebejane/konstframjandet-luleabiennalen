import s from './StartNews.module.scss'
import React from 'react'
import { CardContainer, Card, Thumbnail } from '/components'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export type Props = {
  data: StartNewsRecord & {
    news: NewsRecord[]
  }
}

export default function StartNews({ data: { news } }: Props) {
  const t = useTranslations()

  return (
    <div className={s.container}>
      <header>
        <h2>{t('Menu.news')}</h2>
        <Link href={'/nyheter'} className="small">
          {t('General.showAll')}
        </Link>
      </header>
      <CardContainer>
        {news.map(({ id, intro, title, slug, }) =>
          <Card key={id}>
            <Thumbnail intro={intro} title={title} slug={`/nyheter/${slug}`} />
          </Card>
        )}
      </CardContainer>
    </div>
  )
}