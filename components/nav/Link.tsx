import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { translatePath } from '/lib/utils'

export type Props = {
  href: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
  prefetch?: boolean
}

export default function Link({ href, className, children, prefetch }: Props) {

  const { locale, defaultLocale, query: { year } } = useRouter()
  const translatedHref = translatePath(href, locale, defaultLocale, year as string)

  return (
    <NextLink
      href={translatedHref}
      prefetch={prefetch}
      className={className}
      scroll={true}
    >
      {children}
    </NextLink>
  )
}