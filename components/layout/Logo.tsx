'use client';

import s from './Logo.module.scss';
import cn from 'classnames';
import LogoIcon from '@/public/images/logo.svg';
import { usePage } from '@/lib/context/page';
import { Icon } from '@/components';
import { Link } from '@/i18n/routing';
import useStore, { useShallow } from '@/lib/store';

export default function Logo() {
	const { year, isHome, route } = usePage();
	const [color] = useStore(useShallow((state) => [state.color]));

	return (
		<div className={cn(s.container, isHome && s.home)} key={color}>
			<Link href={'/'}>
				<Icon
					key={color}
					src={LogoIcon}
					style={route !== '/arkiv' && color ? { color } : undefined}
				/>
			</Link>
		</div>
	);
}
