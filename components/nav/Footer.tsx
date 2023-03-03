import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import KFLogo from '/public/images/kf-logo.svg'


export type FooterProps = {
	menu: MenuItem[]
	footer: GeneralRecord
}

export default function Footer({ menu, footer: { email, facebook, instagram, about } }: FooterProps) {
	return (
		<footer className={cn(s.footer)} id="footer">
			<section>
				<div>
					Copyright Luleåbiennalen, 2023 <br />
					<a href={`mailto:${email}`}>{email}</a><br />
					Cookies & GDPR
				</div>
				<div>
					Prenumerera på vårt nyhetsbrev <br />
					Följ oss på: <a href={facebook}>Facebook</a> <a href={instagram}>Instagram</a>
				</div>
				<div>
					{about}
				</div>
				<KFLogo className={s.kf} />
			</section>
		</footer>
	)
}