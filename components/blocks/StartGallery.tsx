import s from './StartGallery.module.scss'
import cn from 'classnames'
import "swiper/css";
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import { Image } from 'react-datocms'
import React, { useRef, useState } from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
  data: StartGalleryRecord
}

export default function StartGallery({ data: { id, images, headline, linkText, url } }: Props) {

  const swiperRef = useRef<Swiper | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)


  return (
    <div className={s.container}>
      <h2>{headline}</h2>
      <SwiperReact
        id={`${id}-swiper-wrap`}
        className={s.swiper}
        loop={true}
        noSwiping={false}
        simulateTouch={true}
        slidesPerView={'auto'}
        navigation={true}
        pagination={true}
        initialSlide={index}
        onSlideChange={({ realIndex }) => setIndex(realIndex)}
        onSwiper={(swiper) => swiperRef.current = swiper}
      >
        {images.map((item, idx) =>
          <SwiperSlide key={`${idx}`} className={cn(s.slide)} >
            <figure id={`${id}-${item.id}`} onClick={() => swiperRef.current.slideNext()}>
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
        <ul className={s.nav}>
          {images.map(({ id }, idx) =>
            <li
              key={id}
              className={cn(index === idx && s.selected)}
              onClick={() => swiperRef.current.slideTo(idx)}
            />
          )}
        </ul>
      </SwiperReact>

      <h3>
        <Link href={url}>{linkText}</Link>
      </h3>
    </div>
  )
}