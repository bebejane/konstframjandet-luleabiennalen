import s from './SectionHeader.module.scss'
import cn from 'classnames'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import { pathToMenuItem } from '/lib/utils'
import useStore from '/lib/store'

import Logo from '/public/images/logo-text.svg'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const t = useTranslations('Menu')
  const [showMenu] = useStore((state) => [state.showMenu])
  const { year, year: { color: { red, green, blue } } } = usePage()
  const { asPath, locale } = useRouter()
  const color = `rgb(${red},${green},${blue})`

  const menuItem = pathToMenuItem(asPath, locale, menu)

  if (!menuItem) return null

  const isHome = menuItem.id === 'home'
  const isOverview = menuItem?.slug && !menuItem.sub && !isHome

  //@ts-ignore
  const subLabel = t(menuItem.id) || t(menuItem.id.split('-')[0])
  const yearLabel = `LB°${year.title.substring(2)}`
  const label = `${yearLabel}${!isHome ? ` — ${subLabel}` : ''}`

  return (
    <>
      <header className={cn(s.header, !showMenu && s.full)}>
        {isHome ? <Logo />
          :
          <Link href={isOverview ? menuItem.slug : '#'}>
            <h2>
              <span style={{ color }}>
                {label}
              </span>
            </h2>
          </Link>
        }
      </header>
      <div className={s.spacer}></div>
      {isOverview && <div className={s.line}></div>}
    </>
  )
}