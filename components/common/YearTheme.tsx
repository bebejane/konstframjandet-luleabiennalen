'use client';

import useStore, { useShallow } from '@/lib/store';
import s from './YearTheme.module.scss';
import { usePathname } from '@/i18n/routing';
import { Modal } from 'next-dato-utils/components';
import { useEffect } from 'react';
import { Image } from 'react-datocms';

export default function YearTheme({ year }: { year: YearQuery['year'] }) {
	const pathname = usePathname();
	const [setColor] = useStore(useShallow((state) => [state.setColor]));
	const isArchive = year?.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const index = 0;
	const image = year?.background?.[index] ?? null;
	const show = image && isArchive;

	useEffect(() => {
		const color = isArchive ? 'var(--archive)' : 'var(--white)';
		document.body.style.backgroundColor = color;
	}, [pathname, isArchive]);

	useEffect(() => {
		setColor(year?.color?.hex ?? null);
		console.log('set color');
	}, [year, pathname]);

	if (!show) return null;

	return (
		<Modal>
			<div className={s.background}>
				{image.responsiveImage && (
					<Image
						data={image.responsiveImage}
						className={s.wrap}
						imgClassName={s.image}
						style={year?.fullOpacity ? { opacity: 1 } : undefined}
					/>
				)}
			</div>
		</Modal>
	);
}
