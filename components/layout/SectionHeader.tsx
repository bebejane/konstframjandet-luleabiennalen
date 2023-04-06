import s from './SectionHeader.module.scss'
import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import Link from '/components/nav/Link'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import { pathToParentMenuItem } from '/lib/utils'
import useStore from '/lib/store'

import Logo from '/public/images/logo-text.svg'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const router = useRouter()
  const { asPath, locale } = router
  const t = useTranslations('Menu')
  const [showMenu] = useStore((state) => [state.showMenu])
  const { year, year: { title, color: { hex } }, isArchive } = usePage()
  const menuItem = pathToParentMenuItem(asPath, locale, menu)

  const isHome = menuItem?.id === 'home'
  const isOverview = menuItem?.slug && !menuItem.sub && !isHome
  const showLine = !menuItem || isOverview
  const isSearch = menuItem?.id === 'search'

  //@ts-ignore
  const subLabel = t(menuItem?.id) || t(menuItem?.id.split('-')[0])
  const yearLabel = `LB°${year.title.substring(2)}`
  const label = !isSearch ? `${yearLabel}${!isHome ? ` — ${subLabel}` : ''}` : t('search')
  const speed = 0.6

  return (
    <>
      <header className={cn(s.header, !showMenu && s.full)}>
        {isHome ? <Logo />
          :
          <Link href={isOverview ? menuItem?.slug : '#'}>
            <h2>
              <span style={{ color: hex }} key={label}>
                {menuItem && label.split('').map((c, idx) =>
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
      {!isHome && <div className={s.spacer}></div>}
      {showLine && <div className={s.line}></div>}
    </>
  )
}