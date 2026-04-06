'use client';

import s from './Logo.module.scss';
import cn from 'classnames';
import LogoIcon from '@/public/images/logo.svg';
import { Icon } from '@/components';
import { Link, usePathname } from '@/i18n/routing';
import useStore, { useShallow } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Logo() {
	const [color] = useStore(useShallow((state) => [state.color]));
	const pathname = usePathname();
	const [isHome, setHome] = useState(true);
	const [archiveOverview, setArchiveOverview] = useState(false);

	useEffect(() => {
		setHome(pathname === '/');
		setArchiveOverview(['/arkiv', '/archive'].includes(pathname));
	}, [pathname]);

	return (
		<div className={cn(s.container, isHome && s.home)} key={color}>
			<Link href={'/'}>
				<Icon
					key={pathname}
					src={LogoIcon}
					style={!archiveOverview && color ? { color } : undefined}
				/>
			</Link>
		</div>
	);
}
