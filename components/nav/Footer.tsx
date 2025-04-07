import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import KFLogo from '/public/images/kf-logo.svg'
import { useTranslations } from 'next-intl'
import { usePage } from '/lib/context/page'
import Logo from '/components/layout/Logo'
import { PROJECT_NAME } from '/lib/constant'

export type FooterProps = {
	menu: MenuItem[]
	footer: GeneralRecord
}

export default function Footer({ menu, footer: { email, facebook, instagram, about } }: FooterProps) {
	const t = useTranslations('Footer')
	const { isHome } = usePage()
	const currentYear = new Date().getFullYear();


	return (
		<footer className={cn(s.footer)} id="footer">
			<section>
				<Logo className={s.logo} />
				<div>
					Copyright {PROJECT_NAME}, {currentYear} <br />
					<a href={`mailto:${email}`}>{email}</a>
				</div>
				<div>
					<a href="https://konstframjandet.us14.list-manage.com/subscribe?u=7dd0bf23c62bd536dd345b0fe&id=5ae8929851">{t('subscribe')}</a><br />
					{t('followUs')}  <a href={facebook}>Facebook</a> {t('and')} <a href={instagram}>Instagram</a>
				</div>
				<div>
					<a href="https://norrbotten.konstframjandet.se/">{about}</a>
				</div>
				<KFLogo className={s.kf} />
			</section>
		</footer>
	)
}