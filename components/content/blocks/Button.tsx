import s from './Button.module.scss';
import { getRoute } from '@/datocms.config';
import { Link } from '@/i18n/routing';

export type ButtonBlockProps = { data: ButtonRecord };

export default function Button({ data: { link } }: ButtonBlockProps) {
	const t = link.__typename;
	const href =
		t === 'ExternalLinkRecord'
			? link.url
			: t === 'InternalLinkRecord'
				? getRoute(link.record)
				: null;
	const { title } = link;

	if (!href) return null;

	return (
		<Link href={href}>
			<button className={s.button}>{title}</button>
		</Link>
	);
}
