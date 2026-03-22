'use client';

import s from './PageBackground.module.scss';
import { usePathname } from '@/i18n/routing';
import { useEffect } from 'react';
import { Image } from 'react-datocms';

export default function PageBackground() {
	const pathname = usePathname();
	const backgroundImage = null;
	const year = null;

	useEffect(() => {
		//document.body.style.backgroundColor = year?.isArchive || section === 'archive' ? 'var(--archive)' : 'var(--white)';
	}, [pathname]);

	return (
		<div className={s.background}>
			{backgroundImage && (
				<Image
					data={backgroundImage.responsiveImage}
					className={s.image}
					style={year.fullOpacity ? { opacity: 1 } : undefined}
				/>
			)}
		</div>
	);
}
