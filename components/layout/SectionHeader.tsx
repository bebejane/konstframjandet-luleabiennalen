import s from './SectionHeader.module.scss'
import cn from 'classnames'
import React, { useState, useEffect } from 'react'
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
  const [showMenu, searchQuery] = useStore((state) => [state.showMenu, state.searchQuery])
  const { year, year: { color: { hex } }, isArchive } = usePage()
  const router = useRouter()
  const { asPath, locale } = router

  const menuItem = pathToMenuItem(asPath, locale, menu)

  if (!menuItem) return null

  const isHome = menuItem.id === 'home'
  const isOverview = menuItem?.slug && !menuItem.sub && !isHome
  const isSearch = searchQuery

  //@ts-ignore
  const subLabel = t(menuItem.id) || t(menuItem.id.split('-')[0])
  const yearLabel = `LB°${year.title.substring(2)}`
  const label = !isSearch ? `${yearLabel}${!isHome ? ` — ${subLabel}` : ''}` : t('search')
  const speed = 0.6

  return (
    <>
      <header className={cn(s.header, !showMenu && s.full)}>
        {isHome ? <Logo />
          :
          <Link href={isOverview ? menuItem.slug : '#'}>
            <h2>
              <span style={{ color: hex }} key={label}>
                {label.split('').map((c, idx) =>
                  <span
                    key={`${idx}`}
                    style={{
                      animationDelay: `${((idx / label.length) * speed)}s`,
                    }}
                  >{c}</span>
                )}
              </span>
            </h2>
          </Link>
        }
        {isArchive && <span className={s.archive}>ARKIV</span>}
      </header>
      <div className={s.spacer}></div>
      {isOverview && <div className={s.line}></div>}
    </>
  )
}