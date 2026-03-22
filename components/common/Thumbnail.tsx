'use client'

import s from './Thumbnail.module.scss';
import cn from 'classnames';
import  { useState } from 'react';
import { Image } from 'react-datocms/image';
import { usePage } from '@/lib/context/page';
import { randomInt, truncateWords } from '@/lib/utils';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

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
	const strippedIntro = truncateWords(remark().use(strip).processSync(intro).value as string, 500);
	const isArchive = false
	const loadingImageIndex = 0
	const loadingImage = null
	// const {
	// 	year: { loadingImage, isArchive },
	// } = usePage();
	const locale = useLocale();
	//const [loadingImageIndex] = useState(loadingImage.length ? randomInt(0, loadingImage.length - 1) : 0);
	const [loaded, setLoaded] = useState(false);
	const image = locale === 'en' && imageEn ? imageEn : imageSv;

	return (
		<Link href={slug} className={cn(s.thumbnail, !slug && s.nolink)}>
			<h3 className={cn(s[`rows-${titleRows}`])}>
				<span>{titleLength ? truncateWords(title, titleLength) : title}</span>
			</h3>
			{image && (
				<div className={cn(s.imageWrap, zoomOutOnHover && s.zoomOutOnHover)}>
					<>
						{image.responsiveImage ? (
							<Image
								data={image.responsiveImage}
								className={cn(s.image)}
								pictureClassName={s.picture}
								style={!isArchive ? { opacity: loaded ? 1 : 0.000001 } : {}}
								onLoad={() => setLoaded(true)}
							/>
						) : (
							<img src={image.url} className={cn(s.picture)} />
						)}
						<div className={s.border}></div>
					</>
					{loadingImage && loadingImage?.length > 0 && !isArchive && !loaded && (
						<Image
							data={loadingImage[loadingImageIndex].responsiveImage}
							className={s.loader}
							pictureClassName={cn(s.picture, s.loader, loaded && s.hide)}
							lazyLoad={false}
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
