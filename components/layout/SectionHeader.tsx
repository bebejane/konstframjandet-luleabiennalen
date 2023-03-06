import s from './SectionHeader.module.scss'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import Logo from '/public/images/logo-text.svg'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const t = useTranslations('Menu')
  const { year, year: { color: { red, green, blue } } } = usePage()
  const { asPath } = useRouter()
  const color = `rgb(${red},${green},${blue})`
  const menuItem = menu.find(el => el.id !== 'home' && (el.slug === asPath || asPath.startsWith(el.slug)))
  const haveOverview = menuItem?.slug && !menuItem.sub
  const url = menuItem?.slug || menuItem?.sub?.find(({ slug }) => slug === asPath)?.slug || '/'

  return (
    <>
      <header className={s.header}>
        {menuItem ?
          <Link href={haveOverview ? url : '#'}>
            <h2>
              <span style={{ color }}>
                LB°{year.title.substring(2)}{menuItem ? ` — ${t(menuItem.id)}` : ''}
              </span>
            </h2>
          </Link>
          :
          <Logo />
        }
      </header>
      <div className={s.spacer}></div>
      {haveOverview && <div className={s.line}></div>}
    </>
  )
}