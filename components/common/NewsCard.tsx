import s from './NewsCard.module.scss'
import React from 'react'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { Card, ReadMore, RegionLink } from '/components'
import BalanceText from 'react-balance-text'
import { truncateParagraph } from '/lib/utils'

export type NewsCardProps = {
  title: string,
  subtitle: string,
  label?: string,
  text: string,
  slug: string,
  regionName: string,
  image?: FileField
}

export default function NewsCard({ title, subtitle, text, slug, image, label }: NewsCardProps) {

  return (
    <Card className={s.card}>
      {image &&
        <RegionLink href={slug} regional={false}>
          <Image className={s.image} data={image.responsiveImage} />
          {label && <div className={s.label}><h5>{label}</h5></div>}
        </RegionLink>
      }
      <h5>{subtitle}</h5>

      <Link href={slug}>
        <h4><BalanceText>{title}</BalanceText></h4>
      </Link>
      <p className="mid">{truncateParagraph(text, 1, false)}</p>
      <ReadMore link={slug} regional={false} message='Läs mer'></ReadMore>
    </Card>
  )
}