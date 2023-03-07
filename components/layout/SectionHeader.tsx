import s from './SectionHeader.module.scss'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import { pathToMenuItem } from '/lib/utils'

import Logo from '/public/images/logo-text.svg'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const t = useTranslations('Menu')
  const { year, year: { color: { red, green, blue } } } = usePage()
  const { asPath, locale } = useRouter()
  const color = `rgb(${red},${green},${blue})`

  const menuItem = pathToMenuItem(asPath, locale, menu)

  if (!menuItem) return null

  const isOverview = menuItem?.slug && !menuItem.sub

  //@ts-ignore
  const label = t(menuItem.id) || t(menuItem.id.split('-')[0])

  return (
    <>
      <header className={s.header}>
        {menuItem.id !== 'home' ?
          <Link href={isOverview ? menuItem.slug : '#'}>
            <h2>
              <span style={{ color }}>
                LB°{year.title.substring(2)} {label}
              </span>
            </h2>
          </Link>
          :
          <Logo />
        }
      </header>
      <div className={s.spacer}></div>
      {isOverview && <div className={s.line}></div>}
    </>
  )
}