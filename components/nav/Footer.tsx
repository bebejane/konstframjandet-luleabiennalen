import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'

export type FooterProps = {
	menu: MenuItem[],
}

export default function Footer({ menu }: FooterProps) {
	return (
		<footer className={cn(s.footer)} id="footer">
			Footer
		</footer>
	)
}