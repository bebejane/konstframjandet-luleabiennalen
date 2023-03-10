import s from "./Video.module.scss"
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import Youtube from 'react-youtube'
import Vimeo from '@u-wave/react-vimeo'
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";

export default function Video({ data, editable }) {

	const ref = useRef()
	const [videoHeight, setVideoHeight] = useState(360);
	const { width, height } = useWindowSize()

	useEffect(() => setVideoHeight((ref.current?.clientWidth / 16) * 9), [width, height, data, ref]) // Set to 16:9

	if (!data || !data.video) return null

	const { provider, providerUid } = data.video
	const { title } = data;
	const style = { height: `${videoHeight}px`, width: '100%' }

	return (
		<section className={s.video} data-editable={editable} ref={ref} >
			{provider === 'youtube' ?
				<Youtube
					opts={{
						playerVars: {
							autoplay: false,
							controls: 0,
							rel: 0
						}
					}}
					videoId={providerUid}
					className={s.player}
					style={style}
				/>
				: provider === 'vimeo' ?
					<Vimeo video={providerUid} className={s.player} style={style} />
					:
					null
			}
			{title &&
				<div className={s.caption}>
					<figcaption>
						<Markdown allowedElements={['em', 'p']}>{title}</Markdown>
					</figcaption>
				</div>}
		</section>
	)
}