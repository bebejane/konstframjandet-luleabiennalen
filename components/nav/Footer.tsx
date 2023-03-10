import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import KFLogo from '/public/images/kf-logo.svg'
import { useTranslations } from 'next-intl'


export type FooterProps = {
	menu: MenuItem[]
	footer: GeneralRecord
}

export default function Footer({ menu, footer: { email, facebook, instagram, about } }: FooterProps) {
	const t = useTranslations('Footer')

	return (
		<footer className={cn(s.footer)} id="footer">
			<section>
				<div>
					Copyright Luleåbiennalen, 2023 <br />
					<a href={`mailto:${email}`}>{email}</a> · Cookies & GDPR
				</div>
				<div>
					{t('subscribe')} <br />
					{t('followUs')}  <a href={facebook}>Facebook</a> {t('and')} <a href={instagram}>Instagram</a>
				</div>
				<div>
					{about}
				</div>
				<KFLogo className={s.kf} />
			</section>
		</footer>
	)
}