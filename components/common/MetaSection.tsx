import s from './MetaSection.module.scss';
import Link from '/components/nav/Link';

export type MetaSectionProps = {
	items: {
		title: string;
		value: string | React.ReactNode | React.ReactNode[];
		link?: string;
	}[];
};

export default function MetaSection({ items = [] }: MetaSectionProps) {
	return (
		<section className={s.meta}>
			<ul className='small'>
				{items
					.filter(({ value, title }) => value && title)
					.map(({ title, value, link }, idx) => (
						<li key={idx}>
							{title}:&nbsp;
							<strong>
								{link ? (
									link.startsWith('http') ? (
										<a href={link}>{value} &#8599;</a>
									) : (
										<Link href={link}>{value}</Link>
									)
								) : (
									value
								)}
							</strong>
						</li>
					))}
			</ul>
		</section>
	);
}
