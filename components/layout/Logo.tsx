import s from './Logo.module.scss'
import LogoIcon from '/public/images/logo.svg'
import { usePage } from '/lib/context/page'
import Link from '/components/nav/Link'

export type Props = {

}

export default function Logo({ }: Props) {
  const { year: { color: { hex } } } = usePage()
  return (
    <div className={s.container} style={{ fill: hex }}>
      <Link href={'/'}><LogoIcon /></Link>
    </div>
  )
}