import s from './Logo.module.scss'
import LogoIcon from '/public/images/logo.svg'
import { usePage } from '/lib/context/page'
import Link from 'next/link'

export type Props = {

}

export default function Logo({ }: Props) {

  const { year: { color: { red, green, blue } } } = usePage()
  const color = `rgb(${red},${green},${blue})`

  return (
    <div className={s.container} style={{ fill: color }}>
      <Link href={'/'}><LogoIcon /></Link>
    </div>
  )
}