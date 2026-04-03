'use client';

import s from './Thumbnail.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Image } from 'react-datocms/image';
import { usePage } from '@/lib/context/page';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { useLocale } from 'next-intl';
import { defaultLocale, Link } from '@/i18n/routing';
import { rInt, truncateWords } from 'next-dato-utils/utils';
import { stripStega } from '@datocms/content-link';

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
			.processSync(stripStega(intro) ?? '').value as string,
		500,
	);
	const locale = useLocale();
	const { year, isArchive } = usePage();
	const [loadingImages, setLoadingImages] = useState<FileField[] | null>(null);
	const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(null);
	const [loaded, setLoaded] = useState(false);
	const image = locale !== defaultLocale && imageEn ? imageEn : imageSv;

	useEffect(() => {
		if (year?.loadingImage && year?.loadingImage?.length > 0) {
			setLoadingImages(year.loadingImage as FileField[]);
			setLoadingImageIndex(loadingImages?.length ? rInt(0, loadingImages.length - 1) : 0);
		}
	}, [year]);

	if (!slug) return null;

	const showLoadingImages =
		loadingImages &&
		loadingImages?.length > 0 &&
		!isArchive &&
		!loaded &&
		loadingImageIndex !== null;

	const href = stripStega(`${isArchive ? `/${year?.title}` : ''}${slug}` as any);
	return (
		<Link
			href={href}
			locale={locale}
			className={cn(s.thumbnail, !slug && s.nolink)}
			data-datocms-content-link-url={image?._editingUrl}
		>
			<h3 className={cn(s[`rows-${titleRows}`])}>
				<span data-datocms-content-link-source={title}>
					{titleLength ? truncateWords(title ?? '', titleLength) : title}
				</span>
			</h3>
			{image && (
				<div className={cn(s.imageWrap, zoomOutOnHover && s.zoomOutOnHover)}>
					<>
						{image.responsiveImage ? (
							<Image
								data={image.responsiveImage}
								className={s.image}
								usePlaceholder={loadingImages === null}
								style={!isArchive ? { opacity: loaded ? 1 : 0.000001 } : {}}
								onLoad={() => setLoaded(true)}
							/>
						) : image.mimeType.startsWith('image/') ? (
							<img src={image.url} className={s.image} />
						) : image.mimeType.startsWith('video/') ? (
							<video className={s.video} src={image.url} autoPlay loop muted playsInline />
						) : null}
						<div className={s.border}></div>
					</>
					{showLoadingImages && loadingImages[loadingImageIndex].responsiveImage && (
						<Image
							data={loadingImages[loadingImageIndex].responsiveImage}
							className={cn(s.loader, loaded && s.hide)}
							usePlaceholder={false}
							priority={true}
							fadeInDuration={0}
							objectFit={'contain'}
						/>
					)}
				</div>
			)}
			{strippedIntro && (
				<div className='thumb-intro'>
					<p data-datocms-content-link-source={intro}>
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
