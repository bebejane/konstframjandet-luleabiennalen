import s from './ArchiveShortcuts.module.scss';
import React from 'react';
import { Image } from 'react-datocms';
import Link from '/components/nav/Link';
import { recordToSlug } from '/lib/utils';
import { useTranslations } from 'next-intl';

export type Props = {
	items: (ParticipantRecord | PartnerRecord | ProgramRecord | ExhibitionRecord | AboutRecord)[];
};

export default function ArchiveShortcuts({ items }: Props) {
	const t = useTranslations('Menu');

	if (!items?.length) return null;

	return (
		<section className={s.shortcuts}>
			<ul>
				{items.map((item, idx) => (
					<li key={item.id}>
						<Link href={recordToSlug(items[idx]).split('/').slice(0, -1).join('/')}>
							<figure>
								{item.image?.responsiveImage && <Image data={item.image.responsiveImage} />}
								<div className={s.border}></div>
							</figure>
							<figcaption>
								{item.__typename === 'ParticipantRecord'
									? t('participants')
									: item.__typename === 'PartnerRecord'
									? t('partners')
									: item.__typename === 'ProgramRecord'
									? t('program')
									: item.__typename === 'ExhibitionRecord'
									? t('exhibitions')
									: item.__typename === 'AboutRecord'
									? t('about')
									: null}
							</figcaption>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
