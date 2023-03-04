import Link from "next/link"

export type Props = {
  children: React.ReactNode
}

export default function BackButton(props: Props) {
  const { children } = props

  return (
    <Link href="./">
      <button className="back">{children}</button>
    </Link>
  )
}