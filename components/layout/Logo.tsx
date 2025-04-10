import s from './Logo.module.scss';
import cn from 'classnames';
import LogoIcon from '/public/images/logo.svg';
import { usePage } from '/lib/context/page';
import Link from 'next/link';

export default function Logo({ className }: { className: string }) {
	const {
		year: {
			color: { hex },
			isArchive,
		},
		isHome,
	} = usePage();

	return (
		<div
			className={cn(s.container, isHome && s.home, className)}
			style={isArchive ? { fill: hex } : undefined}
		>
			<Link href={'/'}>
				<img src='/images/logo.svg' />
			</Link>
		</div>
	);
}
