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

const pathToMenuItem = (path: string, locale, items: MenuItem[]): MenuItem => {

  for (let i = 0; i < items.length; i++) {
    const item = items.find(({ slug }, idx) => {
      return [slug, `/${locale}${slug}`].includes(path)
    })
    if (item) return item
    else if (items[i].sub)
      return pathToMenuItem(path, locale, items[i].sub)
  }
}

export default function SectionHeader({ overview = true, menu }: SectionHeaderProps) {

  const t = useTranslations('Menu')
  const { year, year: { color: { red, green, blue } } } = usePage()
  const { asPath, locale } = useRouter()
  const color = `rgb(${red},${green},${blue})`

  const menuItem = pathToMenuItem(asPath, locale, menu)
  const haveOverview = menuItem?.slug && !menuItem.sub

  if (!menuItem) return null
  const label = t(menuItem.id) || t(menuItem.id.split('-')[0])

  return (
    <>
      <header className={s.header}>
        {menuItem.id !== 'home' ?
          <Link href={haveOverview ? menuItem.slug : '#'}>
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
      {haveOverview && <div className={s.line}></div>}
    </>
  )
}