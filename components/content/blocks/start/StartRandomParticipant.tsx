import s from './StartRandomParticipant.module.scss';
import { CardContainer, Card, Thumbnail } from '@/components';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export type Props = {
	data: StartRandomParticipantRecord & {
		participants: ParticipantRecord[];
	};
};

export default async function StartRandomParticipant({ data: { participants } }: Props) {
	const t = await getTranslations();

	return (
		<div className={s.container}>
			<header>
				<h2>{t('Menu.participants')}</h2>
				<Link href={'/medverkande'} className='small'>
					{t('General.showAll')}
				</Link>
			</header>
			<CardContainer>
				{participants.map(({ id, image, intro, name, slug, year }) => (
					<Card key={id}>
						<Thumbnail
							image={image}
							title={name}
							intro={intro}
							slug={`/${year?.title}/medverkande/${slug}`}
							titleLength={50}
							titleRows={1}
						/>
					</Card>
				))}
			</CardContainer>
		</div>
	);
}
