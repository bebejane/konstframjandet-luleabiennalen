import s from './ArchiveShortcuts.module.scss';
import { Image } from 'react-datocms';
import { useTranslations } from 'next-intl';
import { getRoute } from '@/datocms.config';
import { Link } from '@/i18n/routing';

export type Props = {
	items: (
		| ArchiveHomeQuery['allAbouts'][number]
		| ArchiveHomeQuery['allExhibitions'][number]
		| ArchiveHomeQuery['allParticipants'][number]
		| ArchiveHomeQuery['allPartners'][number]
		| ArchiveHomeQuery['allPrograms'][number]
	)[];
};

export default function ArchiveShortcuts({ items }: Props) {
	const t = useTranslations('Menu');

	if (!items?.length) return null;

	return (
		<section className={s.shortcuts}>
			<ul>
				{items.map((item, idx) => (
					<li key={item.id}>
						<Link href={getRoute(item)}>
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
