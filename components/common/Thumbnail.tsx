import s from './Thumbnail.module.scss';
import cn from 'classnames';
import React, { useState } from 'react';
import { Image } from 'react-datocms/image';
import Link from '/components/nav/Link';
import { usePage } from '/lib/context/page';
import { randomInt, truncateWords } from '/lib/utils';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { useRouter } from 'next/router';

export type Props = {
	image?: FileField;
	imageEn?: FileField;
	slug?: string;
	title?: string;
	titleLength?: number;
	titleRows?: number;
	intro?: string;
	meta?: string;
	metaRight?: string;
	metaOneLine?: boolean;
	transformHref?: boolean;
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
	transformHref = true,
	zoomOutOnHover = false,
}: Props) {
	const strippedIntro = truncateWords(remark().use(strip).processSync(intro).value as string, 500);
	const {
		year: { loadingImage, isArchive },
	} = usePage();
	const { locale, defaultLocale } = useRouter();
	const [loadingImageIndex] = useState(loadingImage.length ? randomInt(0, loadingImage.length - 1) : 0);
	const [loaded, setLoaded] = useState(false);

	const image = locale === 'en' && imageEn ? imageEn : imageSv;

	return (
		<Link href={slug} transformHref={transformHref} className={cn(s.thumbnail, !slug && s.nolink)}>
			<h3 className={cn(s[`rows-${titleRows}`])}>
				<span>{titleLength ? truncateWords(title, titleLength) : title}</span>
			</h3>
			{image?.responsiveImage && (
				<div className={cn(s.imageWrap, zoomOutOnHover && s.zoomOutOnHover)}>
					<>
						<Image
							data={image.responsiveImage}
							className={cn(s.image)}
							pictureClassName={s.picture}
							style={!isArchive ? { opacity: loaded ? 1 : 0.000001 } : {}}
							onLoad={() => setLoaded(true)}
						/>
						<div className={s.border}></div>
					</>
					{loadingImage.length > 0 && !isArchive && loadingImage[loadingImageIndex]?.responsiveImage && (
						<Image
							data={loadingImage[loadingImageIndex].responsiveImage}
							className={cn(s.loader)}
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
