'use client';

import { Link, usePathname } from '@/i18n/routing';

export type Props = {
	children: React.ReactNode;
	href?: string;
};

export default function BackButton(props: Props) {
	const { children, href } = props;
	const pathname = usePathname();
	const segemnts = pathname.split('/');
	segemnts.pop();
	return null;
	return (
		<Link href={href ?? segemnts.join('/')}>
			<button className='back'>{children}</button>
		</Link>
	);
}
