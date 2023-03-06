import s from './StartRandomParticipant.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: StartRandomParticipantRecord & {
    participans: ParticipantRecord[]
  }
}

export default function StartRandomParticipant({ data: { participans } }: Props) {

  return (
    <div className={s.container}>
      participants
    </div>
  )
}