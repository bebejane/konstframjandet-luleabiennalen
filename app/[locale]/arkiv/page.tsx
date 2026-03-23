import s from './page.module.scss';
import { AllYearsDocument, GeneralDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail, PageHeader } from '@/components';
import { Markdown as Markdown } from 'next-dato-utils/components';
import { apiQuery } from 'next-dato-utils/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export type Props = {
	years: YearRecord[];
	general: GeneralRecord;
};

export default async function Archive({ params }: PageProps<'/[locale]/arkiv'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { allYears } = await apiQuery(AllYearsDocument, {
		variables: { locale: locale as SiteLocale },
	});
	const { general } = await apiQuery(GeneralDocument, {
		variables: { locale: locale as SiteLocale },
	});

	return (
		<>
			<PageHeader title={'Luleåbiennalen'} noPrefix={true} />
			<Markdown className={s.intro} content={general?.archiveIntro} />
			<CardContainer columns={2}>
				{allYears.map(({ id, title, slug, theme, image, imageEn }) => (
					<Card key={id}>
						<Thumbnail
							title={`LB° ${title}`}
							image={image as FileField}
							imageEn={imageEn as FileField}
							intro={theme}
							slug={`/${title}`}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}
