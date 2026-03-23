'use client';

import s from './Logo.module.scss';
import cn from 'classnames';
import LogoIcon from '@/public/images/logo.svg';
import { usePage } from '@/lib/context/page';
import { Icon } from '@/components';
import { Link } from '@/i18n/routing';

export default function Logo() {
	const { year, section } = usePage();
	const color = year?.color.hex;

	return (
		<div className={cn(s.container, section === 'home' && s.home)} key={color}>
			<Link href={'/'}>
				<Icon src={LogoIcon} style={section !== 'archive' ? { color } : undefined} />
			</Link>
		</div>
	);
}
