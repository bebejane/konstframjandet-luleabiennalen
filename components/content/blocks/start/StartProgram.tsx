import s from './StartProgram.module.scss';
import { CardContainer, Card, Thumbnail } from '@/components';
import { useLocale} from 'next-intl';
import { formatDate } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export type Props = {
	data: StartProgramRecord & {
		programs: ProgramRecord[];
	};
};

export default function StartProgram({ data: { programs } }: Props) {
	const t = getTranslations()
	const locale = useLocale();

	return (
		<div className={s.container}>
			<header>
				<h2>{t('Menu.program')}</h2>
				<Link href={'/program'} className='small'>
					{t('General.showAll')}
				</Link>
			</header>
			<CardContainer>
				{programs.map(
					({ id, image, intro, title, slug, year, startDate, endDate, programCategory }) => (
						<Card key={id}>
							<Thumbnail
								intro={intro}
								image={image}
								title={title}
								titleLength={100}
								titleRows={3}
								meta={`${formatDate(startDate, endDate, locale)} — ${programCategory.title}`}
								slug={`/${year.title}/program/${slug}`}
								
							/>
						</Card>
					)
				)}
			</CardContainer>
		</div>
	);
}
