import s from './StartNews.module.scss';
import { CardContainer, Card, Thumbnail } from '@/components';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export type Props = {
	data: StartNewsRecord & {
		news: NewsRecord[];
	};
};

export default async function StartNews({ data: { news } }: Props) {
	const t = await getTranslations();

	return (
		<div className={s.container}>
			<header>
				<h2>{t('Menu.news')}</h2>
				<Link href={'/nyheter'} className='small'>
					{t('General.showAll')}
				</Link>
			</header>
			<CardContainer>
				{news.map(({ id, intro, title, slug }) => (
					<Card key={id}>
						<Thumbnail
							intro={intro}
							title={title}
							slug={`/nyheter/${slug}`}
							titleLength={80}
							titleRows={2}
						/>
					</Card>
				))}
			</CardContainer>
		</div>
	);
}
