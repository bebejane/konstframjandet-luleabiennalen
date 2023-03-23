import s from './StartRandomParticipant.module.scss'
import React from 'react'
import { CardContainer, Card, Thumbnail } from '/components'
import { useTranslations } from 'next-intl'
import Link from '/components/nav/Link'

export type Props = {
  data: StartRandomParticipantRecord & {
    participants: ParticipantRecord[]
  }
}

export default function StartRandomParticipant({ data: { participants } }: Props) {
  const t = useTranslations()

  return (
    <div className={s.container}>
      <header>
        <h2>{t('Menu.participants')}</h2>
        <Link href={'/medverkande'} className="small">
          {t('General.showAll')}
        </Link>
      </header>
      <CardContainer>
        {participants.map(({ id, image, intro, name, slug, }) =>
          <Card key={id}>
            <Thumbnail
              image={image}
              title={name}
              intro={intro}
              slug={`/medverkande/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </div>
  )
}