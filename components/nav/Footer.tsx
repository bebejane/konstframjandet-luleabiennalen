import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import KFLogo from '/public/images/kf-logo.svg'


export type FooterProps = {
	menu: MenuItem[],
}

export default function Footer({ menu }: FooterProps) {
	return (
		<footer className={cn(s.footer)} id="footer">
			<section>
				<div>
					Copyright Luleåbiennalen, 2023 <br />
					info@luleabiennalen.se
					Cookies & GDPR
				</div>
				<div>
					Prenumerera på vårt nyhetsbrev <br />
					Följ oss på:     Facebook     Instagram
				</div>
				<div>
					Luleåbiennalen är ett projekt inom organisationen Konstfrämjandet Norrbotten sedan 2021.
				</div>
				<KFLogo className={s.kf} />

			</section>

		</footer>
	)
}