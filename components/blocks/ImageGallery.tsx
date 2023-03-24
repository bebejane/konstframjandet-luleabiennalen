import s from './ImageGallery.module.scss'
import "swiper/css";
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import cn from 'classnames'
import React, { useState, useRef } from 'react'
import { Image } from 'react-datocms'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type ImageGalleryBlockProps = {
	id: string,
	data: ImageGalleryRecord
	onClick?: Function
}

export default function ImageGallery({ data: { id, images }, onClick }: ImageGalleryBlockProps) {

	const swiperRef = useRef<Swiper | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [index, setIndex] = useState(0)

	return (
		<div className={s.gallery} ref={containerRef}>
			<div className={s.fade}></div>
			<SwiperReact
				id={`${id}-swiper-wrap`}
				className={s.swiper}
				loop={true}
				noSwiping={false}
				simulateTouch={true}
				slidesPerView='auto'
				initialSlide={index}
				onSlideChange={({ realIndex }) => setIndex(realIndex)}
				onSwiper={(swiper) => swiperRef.current = swiper}
			>
				{images.map((item, idx) =>
					<SwiperSlide key={`${idx}`} className={cn(s.slide)} >
						<figure id={`${id}-${item.id}`} onClick={() => onClick?.(item.id)} >
							<Image
								data={item.responsiveImage}
								className={s.image}
								pictureClassName={s.picture}
								placeholderClassName={s.picture}
								objectFit={'cover'}
							/>
							<figcaption>
								{item.title && <Markdown allowedElements={['em', 'p']}>{item.title}</Markdown>}
							</figcaption>
						</figure>
					</SwiperSlide>
				)}
			</SwiperReact>
			{images.length > 3 &&
				<div
					className={s.next}
					onClick={() => swiperRef.current?.slideNext()}
				>→</div>
			}
		</div>
	)
}