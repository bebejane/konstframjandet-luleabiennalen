'use client'

import s from "./StartFullscreenVideo.module.scss";
import cn from "classnames";
import { VideoPlayer, DatoLink } from "@/components";
import { useRef } from "react";
import {useStore, useShallow} from "@/lib/store";

export type Props = { data: StartFullscreenVideoRecord };

export default function StartFullscreenVideo({ data: { video, text, headline, link } }: Props) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [showMenu] = useStore(useShallow((state) => [state.showMenu]));

	return (
		<DatoLink link={link}>
			<div
				ref={ref}
				className={cn(s.fullScreenVideo, !showMenu && s.full)}				
			>
				<VideoPlayer data={video} />
				<div className={s.textWrap}>
					<h2>{headline}</h2>
				</div>
			</div>
		</DatoLink>
	);
}
