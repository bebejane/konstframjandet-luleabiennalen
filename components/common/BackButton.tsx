import Link from "next/link"
import { useRouter } from "next/router"

export type Props = {
  children: React.ReactNode
}

export default function BackButton(props: Props) {
  const { children } = props
  const { asPath, query: { year } } = useRouter()
  const segemnts = asPath.split('/'); segemnts.pop()

  return (
    <Link href={segemnts.join('/')}>
      <button className="back">{children}</button>
    </Link>
  )
}