import s from './SectionHeader.module.scss'
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean

}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const router = useRouter()
  const menuItem = menu.find(el => el.slug === router.asPath || router.asPath.startsWith(el.slug))
  const url = menuItem?.slug || menuItem?.sub?.find(({ slug }) => slug === router.asPath)?.slug || '/'
  const year = '22' // TODO useYear hook

  return (
    <>
      <header className={s.header}>
        <Link href={url}>
          <h2>
            <span>
              LB°{year}{menuItem ? ` — ${menuItem.label}` : ''}
            </span>
          </h2>
        </Link>
      </header>
      <div className={s.spacer}></div>
      {overview &&
        <div className={s.line}></div>
      }
    </>
  )
}