import s from './StartFullscreenVideo.module.scss'
import React from 'react'
import { VideoPlayer, DatoLink } from '/components'
import Link from 'next/link'
import { useRef } from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'

export type Props = { data: StartFullscreenVideoRecord }

export default function StartFullscreenVideo({ data: { video, text, headline, link } }: Props) {

	const ref = useRef()

	return (
		<section className={s.fullScreenVideo} ref={ref}>
			<DatoLink link={link}>
				<VideoPlayer data={video} />
			</DatoLink>
			<div className={s.textWrap}>
				<h2>{headline}</h2>
				<Markdown className={s.text}>{text}</Markdown>
			</div>
		</section>
	)
}