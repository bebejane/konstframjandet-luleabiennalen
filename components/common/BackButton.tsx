'use client';

import { getPathname, Link, usePathname, exists } from '@/i18n/routing';
import { usePage } from '@/lib/context/page';
import { useLocale } from 'next-intl';

export type Props = {
	children: string;
};

export default function BackButton({ children }: Props) {
	const locale = useLocale();
	const { year } = usePage();
	const _pathname = usePathname().split('/');
	_pathname.pop();
	const pathname = _pathname.join('/');

	if (!exists(pathname)) return null;

	return (
		<Link
			locale={locale}
			href={{
				//@ts-ignore
				pathname,
				params: {
					year: year?.title,
				},
			}}
		>
			<button className='back'>{children}</button>
		</Link>
	);
}
