import s from './StartProgram.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: StartProgramRecord & {
    programs: ProgramRecord[]
  }
}

export default function StartProgram({ data: { programs } }: Props) {

  return (
    <div className={s.container}>
      programs
    </div>
  )
}