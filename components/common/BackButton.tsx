import Link from '/components/nav/Link'
import { useRouter } from "next/router"

export type Props = {
  children: React.ReactNode
}

export default function BackButton(props: Props) {
  const { children } = props
  const { asPath } = useRouter()
  const segemnts = asPath.split('/'); segemnts.pop()

  return (
    <Link href={segemnts.join('/')}>
      <button className="back">{children}</button>
    </Link>
  )
}