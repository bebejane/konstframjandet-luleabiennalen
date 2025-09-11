import s from './Related.module.scss';
import React from 'react';
import { Image } from 'react-datocms';
import Link from '/components/nav/Link';
import { recordToSlug } from '/lib/utils';

export type Props = {
	header: string;
	noLink?: boolean;
	items: (
		| ParticipantRecord
		| LocationRecord
		| ProgramRecord
		| ExhibitionRecord
		| ProgramModelPartnerField
		| ProgramRecord['supportedBy'][0]
	)[];
};

export default function Related({ header, items, noLink }: Props) {
	if (!items?.length) return null;

	return (
		<section className={s.related}>
			<h2>{header}</h2>
			<ul>
				{items.map((item, idx) => {
					const title =
						item.__typename === 'ParticipantRecord' || item.__typename === 'FinancierRecord' ? item.name : item.title;
					let href = null;
					try {
						href = noLink ? null : recordToSlug(items[idx]);
					} catch (e) {}
					const content = (
						<>
							<figure>
								{item.image?.responsiveImage && <Image data={item.image.responsiveImage} />}
								<div className={s.border}></div>
							</figure>
							<figcaption>{title}</figcaption>
						</>
					);
					return (
						<li key={item.id} className={noLink && s.nolink}>
							{href && <Link href={href}>{content}</Link>}
							{!href && content}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
