'use client';

import s from './Thumbnail.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Image } from 'react-datocms/image';
import { useYear } from '@/lib/context/year';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { useLocale } from 'next-intl';
import { defaultLocale, Link } from '@/i18n/routing';
import { rInt, truncateWords } from 'next-dato-utils/utils';

export type Props = {
	image?: FileField | null;
	imageEn?: FileField | null;
	slug?: string;
	title?: string | null;
	titleLength?: number;
	titleRows?: number;
	intro?: string | null;
	meta?: string;
	metaRight?: string | null;
	metaOneLine?: boolean;
	zoomOutOnHover?: boolean;
};

export default function Thumbnail({
	image: imageSv,
	imageEn,
	slug,
	intro,
	title,
	titleLength,
	titleRows = 3,
	meta,
	metaRight,
	metaOneLine,
	zoomOutOnHover = false,
}: Props) {
	const strippedIntro = truncateWords(
		remark()
			.use(strip)
			.processSync(intro ?? '').value as string,
		500,
	);
	const locale = useLocale();
	const { year, isArchive } = useYear();
	const loadingImages = year?.loadingImage;
	const [loadingImageIndex, setLoadingImageIndex] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const image = locale !== defaultLocale && imageEn ? imageEn : imageSv;

	useEffect(() => {
		setLoadingImageIndex(loadingImages?.length ? rInt(0, loadingImages.length - 1) : 0);
	}, [loadingImages]);

	if (!slug) return null;

	return (
		<Link
			href={`${isArchive ? `/${year?.title}` : ''}${slug}`}
			className={cn(s.thumbnail, !slug && s.nolink)}
		>
			<h3 className={cn(s[`rows-${titleRows}`])}>
				<span>{titleLength ? truncateWords(title ?? '', titleLength) : title}</span>
			</h3>
			{image && (
				<div className={cn(s.imageWrap, zoomOutOnHover && s.zoomOutOnHover)}>
					<>
						{image.responsiveImage ? (
							<Image
								data={image.responsiveImage}
								className={cn(s.image)}
								pictureClassName={s.picture}
								usePlaceholder={false}
								style={!isArchive ? { opacity: loaded ? 1 : 0.000001 } : {}}
								onLoad={() => setLoaded(true)}
							/>
						) : (
							<img src={image.url} className={cn(s.picture)} />
						)}
						<div className={s.border}></div>
					</>
					{loadingImages &&
						loadingImages?.length > 0 &&
						!isArchive &&
						!loaded &&
						loadingImages[loadingImageIndex].responsiveImage && (
							<Image
								data={loadingImages[loadingImageIndex].responsiveImage}
								className={s.loader}
								usePlaceholder={false}
								fadeInDuration={0}
								imgClassName={cn(s.picture, s.loader, loaded && s.hide)}
								objectFit={'contain'}
							/>
						)}
				</div>
			)}
			{strippedIntro && (
				<div className='thumb-intro'>
					<p>
						<span className={cn(s.meta, metaOneLine && s.oneline)}>
							{meta && <strong>{meta}</strong>}
							{metaRight && <strong className={s.right}>{metaRight}</strong>}
						</span>
						{strippedIntro}
					</p>
				</div>
			)}
		</Link>
	);
}
