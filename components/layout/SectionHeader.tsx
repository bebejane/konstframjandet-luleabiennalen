import s from './SectionHeader.module.scss'
import cn from 'classnames'
import React from 'react'
import Link from '/components/nav/Link'
import { useRouter } from 'next/router'
import { MenuItem } from '/lib/menu'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import { pathToMenuItem, pathToParentMenuItem } from '/lib/utils'
import useStore from '/lib/store'

import Logo from '/public/images/logo-text.svg'

export type SectionHeaderProps = {
  menu: MenuItem[]
  overview?: boolean
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const router = useRouter()
  const { asPath } = router
  const t = useTranslations('Menu')
  const [showMenu] = useStore((state) => [state.showMenu])
  const { section, parent, year, year: { color: { hex }, isArchive } } = usePage()

  const isHome = section === 'home'
  const isSearch = section === 'search'
  const isArchiveOverview = section === 'archive'
  const isOverview = !parent
  const showArchive = isArchive || isArchiveOverview
  const showLine = !isHome

  const parentPath = asPath.split('/').slice(0, -1).join('/')
  const subLabel = t(section)
  const yearLabel = `LB°${year.title.substring(2)}`
  const label = !isSearch ? `${yearLabel}${!isHome ? ` — ${subLabel}` : ''}` : t('search')
  const speed = 0.6

  const header = (
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