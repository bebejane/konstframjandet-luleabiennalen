import s from './LogoType.module.scss';
import React from 'react';
import { Image } from 'react-datocms';

export type Props = { data: LogoTypeRecord };

export default function LogoType({ data: { logotypes } }: Props) {
	return (
		<ul className={s.logotypes}>
			{logotypes.map((image) => (
				<li key={image.id}>
					<Image data={image.responsiveImage} className={s.image} objectFit='contain' />
				</li>
			))}
		</ul>
	);
}
