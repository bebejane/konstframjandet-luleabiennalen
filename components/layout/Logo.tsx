'use client';

import s from './Logo.module.scss';
import cn from 'classnames';
import LogoIcon from '@/public/images/logo.svg';
import { useYear } from '@/lib/context/year';
import Link from 'next/link';
import { Icon } from '@/components';
import { usePathname } from '@/i18n/routing';

export default function Logo() {
	const isHome = usePathname() === '/';
	const { year, isArchive } = useYear();

	return (
		<div
			className={cn(s.container, isHome && s.home)}
			style={isArchive ? { fill: year?.color.hex } : undefined}
		>
			<Link href={'/'}>
				<Icon src={LogoIcon} />
			</Link>
		</div>
	);
}
