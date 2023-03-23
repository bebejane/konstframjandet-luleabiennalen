import s from './Logo.module.scss'
import cn from 'classnames'
import LogoIcon from '/public/images/logo.svg'
import { usePage } from '/lib/context/page'
import Link from '/components/nav/Link'

export type Props = {

}

export default function Logo({ }: Props) {
  const { year: { color: { hex } }, isHome } = usePage()

  return (
    <div className={cn(s.container, isHome && s.home)} style={{ fill: hex }}>
      <Link href={'/'}><LogoIcon /></Link>
    </div>
  )
}