import s from './SectionHeader.module.scss'
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

export type SectionHeaderProps = {
  children: React.ReactNode
}

export default function SectionHeader({ children }: SectionHeaderProps) {

  return (
    <header className={s.header}>
      <h2><span>{children}</span></h2>
    </header>
  )
}