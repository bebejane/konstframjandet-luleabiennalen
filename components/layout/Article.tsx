'use client';

import s from './Article.module.scss';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { MetaSection, Content, SectionHeader } from '@/components';
import { MetaSectionProps } from '@/components/common/MetaSection';
import { Image } from 'react-datocms';
import { useScrollInfo } from 'next-dato-utils/hooks';
import { useStore, useShallow } from '@/lib/store';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { Markdown } from 'next-dato-utils/components';
import useDevice from '@/lib/hooks/useDevice';
import BalanceText from 'react-balance-text';
import { usePathname } from '@/i18n/routing';

export type ArticleProps = {
	id: string;
	children?: React.ReactNode | React.ReactNode[] | undefined;
	title?: string | null;
	subtitle?: string | null;
	intro?: string | null;
	image?: FileField | null;
	imageEn?: FileField | null;
	imageSize?: 'small' | 'medium' | 'large';
	content?: any;
	date?: string;
	meta?: MetaSectionProps['items'];
};

export default function Article({
	children,
	title,
	content,
	image: imageSv,
	imageEn,
	imageSize,
	intro,
	date,
	meta,
}: ArticleProps) {
	const locale = useLocale();
	const pathname = usePathname();
	const t = useTranslations();
	const [setImageId, setImages] = useStore(
		useShallow((state) => [state.setImageId, state.setImages]),
	);
	const { scrolledPosition, viewportHeight } = useScrollInfo();
	const captionRef = useRef<HTMLElement | null>(null);
	const figureRef = useRef<HTMLElement | null>(null);
	const [offset, setOffset] = useState(0);
	const { isDesktop } = useDevice();
	const ratio = !isDesktop
		? 0
		: offset
			? Math.max(
					0,
					Math.min(
						1,
						(scrolledPosition - (offset > viewportHeight ? offset - viewportHeight + 100 : 0)) /
							viewportHeight,
					),
				)
			: 0;
	const image = locale === 'en' && imageEn ? imageEn : imageSv;

	useEffect(() => {
		const images = [image];
		content?.blocks.forEach((el: any) => {
			el.__typename === 'ImageRecord' && images.push(el.image);
			el.__typename === 'ImageGalleryRecord' && images.push.apply(images, el.images);
		});
		setImages(images.filter((el) => el) as FileField[]);
	}, []);

	useEffect(() => {
		setOffset(captionRef?.current?.offsetTop ?? 0);
	}, [pathname, viewportHeight]);

	return (
		<>
			<div className={cn(s.article, 'article')}>
				<h1>
					<BalanceText>{title}</BalanceText>
				</h1>
				{image?.responsiveImage && (
					<figure
						className={cn(
							s.mainImage,
							imageSize && s[imageSize],
							image.height > image.width && s.portrait,
						)}
						onClick={() => setImageId(image?.id)}
						ref={figureRef}
					>
						<Image
							data={image.responsiveImage}
							pictureClassName={s.picture}
							pictureStyle={{ transform: `scale(${1 - ratio * 0.3})` }}
						/>

						<figcaption ref={captionRef} style={{ opacity: 1 - ratio }}>
							{image.title}
						</figcaption>
					</figure>
				)}

				<section className={s.meta}>
					{meta && <MetaSection items={meta} />}
					{date && (
						<div className={s.date}>
							<span className='small'>{format(new Date(date), 'MMM').replace('.', '')}</span>
							<span>{format(new Date(date), 'dd').replace('.', '')}</span>
						</div>
					)}
				</section>

				<section className='intro'>
					{date && (
						<div className={cn(s.date, s.mobile)}>
							<span className='small'>{format(new Date(date), 'MMM').replace('.', '')}</span>
							<span>{format(new Date(date), 'dd').replace('.', '')}</span>
						</div>
					)}
					<Markdown className={s.intro} content={intro} />
				</section>
				{content && (
					<>
						<div className='structured'>
							<Content content={content} />
						</div>
					</>
				)}
				{children}
			</div>
		</>
	);
}
