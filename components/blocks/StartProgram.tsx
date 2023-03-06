import s from './StartProgram.module.scss'
import React from 'react'
import { CardContainer, Card, Thumbnail } from '/components'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export type Props = {
  data: StartProgramRecord & {
    programs: ProgramRecord[]
  }
}

export default function StartProgram({ data: { programs } }: Props) {
  const t = useTranslations()

  return (
    <div className={s.container}>
      <header>
        <h2>{t('Menu.program')}</h2>
        <Link href={'/program'}>{t('general.showAll')}</Link>
      </header>
      <CardContainer>
        {programs.map(({ id, image, intro, title, slug, }) =>
          <Card key={id}>
            <Thumbnail
              intro={intro}
              image={image}
              title={title}
              slug={`/program/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </div>
  )
}