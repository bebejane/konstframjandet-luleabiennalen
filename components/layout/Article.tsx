import s from './Article.module.scss';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { MetaSection, StructuredContent } from '/components';
import { MetaSectionProps } from '/components/common/MetaSection';
import { Image } from 'react-datocms';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import { DatoSEO } from 'dato-nextjs-utils/components';
import useStore from '/lib/store';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import useDevice from '/lib/hooks/useDevice';
import BalanceText from 'react-balance-text';

export type ArticleProps = {
	id: string;
	children?: React.ReactNode | React.ReactNode[] | undefined;
	title?: string;
	subtitle?: string;
	intro?: string;
	image?: FileField;
	imageEn?: FileField;
	imageSize?: 'small' | 'medium' | 'large';
	content?: any;
	onClick?: (id: string) => void;
	record?: any;
	date?: string;
	meta?: MetaSectionProps['items'];
};

export default function Article({
	id,
	children,
	title,
	content,
	image: imageSv,
	imageEn,
	imageSize,
	intro,
	date,
	record,
	meta,
}: ArticleProps) {
	const { asPath, locale } = useRouter();
	const t = useTranslations();
	const [setImageId, setImages] = useStore((state) => [state.setImageId, state.setImages]);
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
						viewportHeight
				)
		  )
		: 0;
	const image = locale === 'en' && imageEn ? imageEn : imageSv;

	useEffect(() => {
		const images = [image];
		content?.blocks.forEach((el) => {
			el.__typename === 'ImageRecord' && images.push(el.image);
			el.__typename === 'ImageGalleryRecord' && images.push.apply(images, el.images);
		});
		setImages(images.filter((el) => el));
	}, []);

	useEffect(() => {
		setOffset(captionRef?.current?.offsetTop ?? 0);
	}, [asPath, viewportHeight]);

	return (
		<>
			<DatoSEO title={title} />
			<div className={cn(s.article, 'article')}>
				<h1>
					<BalanceText>{title}</BalanceText>
				</h1>
				{image && (
					<figure
						className={cn(
							s.mainImage,
							imageSize && s[imageSize],
							image.height > image.width && s.portrait
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

				{meta && <MetaSection items={meta} />}

				<section className='intro'>
					{date && (
						<div className={s.date}>
							<span className='small'>{format(new Date(date), 'MMM').replace('.', '')}</span>
							<span>{format(new Date(date), 'dd').replace('.', '')}</span>
						</div>
					)}
					<Markdown className={s.intro}>{intro}</Markdown>
				</section>
				{content && (
					<>
						<div className='structured'>
							<StructuredContent
								id={id}
								record={record}
								content={content}
								onClick={(imageId) => setImageId(imageId)}
							/>
						</div>
					</>
				)}
				{children}
			</div>
		</>
	);
}
