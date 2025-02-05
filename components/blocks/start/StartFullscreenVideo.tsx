import s from "./StartFullscreenVideo.module.scss";
import cn from "classnames";
import React from "react";
import { VideoPlayer, DatoLink } from "/components";
import Link from "next/link";
import { useRef } from "react";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import useStore from "/lib/store";

export type Props = { data: StartFullscreenVideoRecord };

export default function StartFullscreenVideo({ data: { video, text, headline, link } }: Props) {
	const ref = useRef();
	const [showMenu] = useStore((state) => [state.showMenu]);

	return (
		<DatoLink link={link}>
			<div
				className={cn(s.fullScreenVideo, !showMenu && s.full)}
				ref={ref}
			>
				<VideoPlayer data={video} />
				<div className={s.textWrap}>
					<h2>{headline}</h2>
				</div>
			</div>
		</DatoLink>
	);
}
