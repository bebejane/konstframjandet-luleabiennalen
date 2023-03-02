import styles from './ReadMore.module.scss'
import { recordToSlug } from '/lib/utils'
import cn from 'classnames'
import Link from 'next/link'

type Props = {
  message?: string
  link: string,
  invert?: boolean
  regional?: boolean
  external?: boolean
}

export default function ReadMore({ message, link, invert = false, regional, external = false }: Props) {

  if (!link) return null

  return (
    <Link
      href={link}
      className={cn(styles.more)}
    >
      {message}
    </Link>
  )
}