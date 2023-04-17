import s from './SectionHeader.module.scss'
import cn from 'classnames'
import React from 'react'
import Link from '/components/nav/Link'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import useStore from '/lib/store'

import Logo from '/public/images/logo-text.svg'
import { translatePath } from '/lib/utils'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const router = useRouter()
  const { asPath, locale, defaultLocale } = router
  const t = useTranslations('Menu')
  const [showMenu] = useStore((state) => [state.showMenu])
  const { section, parent, year, year: { color: { hex }, isArchive }, isHome } = usePage()

  const isArchiveHome = section === 'home' && isArchive
  const isSearch = section === 'search'
  const isArchiveOverview = section === 'archive'
  const isOverview = !parent && !isArchive
  const showArchive = isArchive || isArchiveOverview
  const showLine = !isHome
  const parentPath = !isArchiveHome ? asPath.split('/').slice(0, -1).join('/') : translatePath('/arkiv', locale, defaultLocale)
  const yearLabel = isArchiveHome ? `Luleåbiennalen ${year.title}` : `LB°${year.title.substring(2)}`
  const label = isArchiveOverview ? 'Luleåbiennalen' : isArchiveHome ? yearLabel : !isSearch ? `${yearLabel}${!isHome ? ` — ${t(section)}` : ''}` : t('search')

  const header = (
    <h2>
      <span style={{ color: hex }} key={label}>
        {label.split('').map((c, idx) =>
          <span
            key={`${idx}`}
            style={{
              animationDelay: `${((idx / label.length) * 0.6)}s`,
            }}
          >{c}</span>
        )}
      </span>
    </h2>
  )
  return (
    <>
      <header className={cn(s.header, !showMenu && s.full)}>
        {isHome ? <Logo />
          :
          !isOverview ?
            <Link href={parentPath} transformHref={false}>
              {header}
            </Link>
            : <>{header}</>
        }
        {showArchive && <span className={s.archive}>ARKIV</span>}
      </header>
      {!isHome && <div className={s.spacer}></div>}
      {showLine && <div className={s.line}></div>}
    </>
  )
}