'use client';

import s from './LogoHeader.module.scss';
import cn from 'classnames';
import Logo from '@/public/images/logo-text.svg';
import { Icon } from '@/components';
import useStore, { useShallow } from '@/lib/store';

export function LogoHeader() {
	const [showMenu] = useStore(useShallow((state) => [state.showMenu]));
	return (
		<div className={cn(s.container, !showMenu && s.full)}>
			<Icon src={Logo} className={s.logo} nofill={true} />
		</div>
	);
}
