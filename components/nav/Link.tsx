import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { translatePath } from '/lib/utils'

export type Props = {
  href: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export default function Link({ href, className, children }: Props) {
  const { locale } = useRouter()
  const as = translatePath(href, locale)

  return (
    <NextLink href={href} as={as} className={className}>
      {children}
    </NextLink>
  )
}