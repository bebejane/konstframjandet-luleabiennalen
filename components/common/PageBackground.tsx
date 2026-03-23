'use client';

import s from './PageBackground.module.scss';
import { usePathname } from '@/i18n/routing';
import { usePage } from '@/lib/context/page';
import { Modal } from 'next-dato-utils/components';
import { useEffect } from 'react';
import { Image } from 'react-datocms';

export default function PageBackground() {
	const pathname = usePathname();
	const { year, section, isArchive } = usePage();
	const index = 0;
	const image = year?.background?.[index] ?? null;
	const show = image && isArchive && section !== 'archive';

	useEffect(() => {
		const color = isArchive || section === 'archive' ? 'var(--archive)' : 'var(--white)';
		document.body.style.backgroundColor = color;
	}, [pathname, isArchive, section]);

	if (!show) return null;

	return (
		<Modal>
			<div className={s.background}>
				{image.responsiveImage && (
					<Image
						data={image.responsiveImage}
						imgClassName={s.image}
						style={year?.fullOpacity ? { opacity: 1 } : undefined}
					/>
				)}
			</div>
		</Modal>
	);
}
