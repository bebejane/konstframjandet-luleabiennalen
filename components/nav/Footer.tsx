import s from './Footer.module.scss';
import cn from 'classnames';
import KFLogo from '@/public/images/kf-logo.svg';
import Logo from '@/components/layout/Logo';
import { PROJECT_NAME } from '@/lib/constant';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@/components';

export type FooterProps = {
	footer: GeneralQuery['general'];
};

export default async function Footer({ footer }: FooterProps) {
	const { email, facebook, instagram, about } = footer!;
	const t = await getTranslations('Footer');
	const currentYear = new Date().getFullYear();

	return (
		<>
			<footer className={cn(s.footer)} id='footer'>
				<section>
					<Logo />
					<div>
						Copyright {PROJECT_NAME}, {currentYear} <br />
						<a href={`mailto:${email}`}>{email}</a>
					</div>
					<div>
						<a href='https://konstframjandet.us14.list-manage.com/subscribe?u=7dd0bf23c62bd536dd345b0fe&id=5ae8929851'>
							{t('subscribe')}
						</a>
						<br />
						{t('followUs')} {facebook && <a href={facebook}>Facebook</a>} {t('and')}{' '}
						{instagram && <a href={instagram}>Instagram</a>}
					</div>
					<div>
						<a href='https://norrbotten.konstframjandet.se/'>{about}</a>
					</div>
					<Icon src={KFLogo} className={s.kf} />
				</section>
			</footer>
		</>
	);
}
