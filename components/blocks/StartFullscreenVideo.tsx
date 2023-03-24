import s from './StartFullscreenVideo.module.scss'
import React from 'react'
import { VideoPlayer, DatoLink } from '/components'
import Link from 'next/link'
import { useRef } from 'react'

export type Props = { data: StartFullscreenVideoRecord }

export default function StartFullscreenVideo({ data: { video, text, link } }: Props) {

	const ref = useRef()

	return (
		<section className={s.fullScreenVideo} ref={ref}>
			<DatoLink link={link}>
				<VideoPlayer data={video} />
			</DatoLink>
			<div className={s.textWrap}>
				<div className={s.text}>
					<div><h1 className="start">{text}</h1></div>
					<div className={s.link}>
						<DatoLink link={link}>
							<a>
								<span className="medium white">
									link
								</span>
							</a>
						</DatoLink>
					</div>
				</div>
			</div>
		</section>
	)
}