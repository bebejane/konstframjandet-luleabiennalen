import s from './page.module.scss';
import cn from 'classnames';
import { AllLocationsDocument, AllPartnersDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail } from '@/components';
import { Image } from 'react-datocms';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { apiQuery } from 'next-dato-utils/api';
import { locales } from '@/i18n/routing';

export type Props = {
	partners: PartnerRecord[];
	locations: LocationRecord[];
	financiers: YearRecord;
};

export default async function Partners({ params }: PageProps<'/[locale]/partners'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { allPartners, financiers } = await apiQuery(AllPartnersDocument, {
		variables: { locale: locale as SiteLocale },
	});
	const { allLocations } = await apiQuery(AllLocationsDocument, {
		variables: { locale: locale as SiteLocale },
	});
	const t = await getTranslations();

	return (
		<>
			{/* <DatoSEO title={t('Menu.partners')} /> */}
			{allLocations.length > 0 && (
				<>
					<h2 id='locations' className={cn(s.head, s.locations)}>
						{t('Menu.locations')}
					</h2>
					<CardContainer className={s.locations}>
						{allLocations.map(({ id, image, title, intro, slug, year }) => (
							<Card key={id}>
								<Thumbnail
									title={title}
									image={image as FileField}
									intro={intro}
									titleRows={1}
									slug={`/platser/${slug}`}
								/>
							</Card>
						))}
					</CardContainer>
				</>
			)}

			<h2 className={s.head}>Partners</h2>
			<CardContainer>
				{allPartners.map(({ id, image, slug }) => (
					<Card key={id}>
						<Thumbnail
							slug={`/partners/${slug}`}
							image={image as FileField}
							zoomOutOnHover={true}
						/>
					</Card>
				))}
			</CardContainer>

			{financiers?.fundedBy && financiers?.fundedBy.length > 0 && (
				<section className={s.financiers}>
					<h2 className={s.head}>{t('Partners.supportedBy')}</h2>
					<ul>
						{financiers.fundedBy.map(({ id, url, logo }) => (
							<li key={id}>
								{logo?.responsiveImage && (
									<Image data={logo.responsiveImage} className={s.image} objectFit={'contain'} />
								)}
							</li>
						))}
					</ul>
				</section>
			)}
		</>
	);
}

// export const getStaticProps = withGlobalProps(
// 	{ queries: [AllPartnersDocument, AllLocationsDocument] },
// 	async ({ props, revalidate }: any) => {
// 		return {
// 			props: {
// 				...props,
// 				page: {
// 					section: 'partners',
// 					slugs: pageSlugs('partners', props.year.title),
// 				} as PageProps,
// 			},
// 			revalidate,
// 		};
// 	}
// );
