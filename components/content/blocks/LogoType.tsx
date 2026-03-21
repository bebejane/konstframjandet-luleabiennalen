import s from './LogoType.module.scss';
import { Image } from 'react-datocms';

export type Props = { data: LogoTypeRecord };

export default function LogoType({ data: { logotypes } }: Props) {
	return (
		<ul className={s.logotypes}>
			{logotypes.map((image) => (
				<li key={image.id}>
					{image.mimeType === 'image/svg+xml' ? (
						<img src={image.url} alt={image.alt} className={s.image} />
					) : image.responsiveImage ?
						<Image data={image.responsiveImage} className={s.image} objectFit='contain' />
						: null
					}
				</li>
			))}
		</ul>
	);
}
