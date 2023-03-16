import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { translatePath } from '/lib/utils'

export type Props = {
  href: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
  prefetch?: boolean
}

export default function Link({ href, className, children, prefetch = false }: Props) {

  const { locale, query: { year } } = useRouter()
  const as = translatePath(href, locale, year !== undefined)

  return (
    <NextLink
      href={href}
      as={as}
      prefetch={prefetch === false ? false : true}
      className={className}
    >
      {children}
    </NextLink>
  )
}