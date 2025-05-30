import s from './index.module.scss';
import cn from 'classnames';
import withGlobalProps from '/lib/withGlobalProps';
import { AllLocationsDocument, AllPartnersDocument } from '/graphql';
import { CardContainer, Card, Thumbnail } from '/components';
import { useRouter } from 'next/router';
import { DatoSEO } from 'dato-nextjs-utils/components';
import { useTranslations } from 'next-intl';
import { Image } from 'react-datocms';
import { pageSlugs } from '/lib/i18n';
import { usePage } from '/lib/context/page';

export type Props = {
	partners: PartnerRecord[];
	locations: LocationRecord[];
	financiers: YearRecord;
};

export default function Partners({ partners, locations, financiers: { fundedBy } }: Props) {
	const t = useTranslations();
	const { asPath } = useRouter();

	return (
		<>
			<DatoSEO title={t('Menu.partners')} />
			{locations.length > 0 && (
				<>
					<h2 id='locations' className={cn(s.head, s.locations)}>
						{t('Menu.locations')}
					</h2>
					<CardContainer key={`${asPath}-locations`} className={s.locations}>
						{locations.map(({ id, image, title, intro, slug, year }) => (
							<Card key={id}>
								<Thumbnail
									title={title}
									image={image}
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

			<CardContainer key={`${asPath}-partners`}>
				{partners.map(({ id, image, imageEn, title, intro, slug }) => (
					<Card key={id}>
						<Thumbnail
							image={image}
							imageEn={imageEn}
							slug={`/partners/${slug}`}
							zoomOutOnHover={true}
						/>
					</Card>
				))}
			</CardContainer>

			{fundedBy.length > 0 && (
				<section className={s.financiers}>
					<h2 className={s.head}>{t('Partners.supportedBy')}</h2>
					<ul>
						{fundedBy.map(({ id, url, logo }) => (
							<li key={id}>
								<Image data={logo.responsiveImage} className={s.image} objectFit={'contain'} />
							</li>
						))}
					</ul>
				</section>
			)}
		</>
	);
}

export const getStaticProps = withGlobalProps(
	{ queries: [AllPartnersDocument, AllLocationsDocument] },
	async ({ props, revalidate }: any) => {
		return {
			props: {
				...props,
				page: {
					section: 'partners',
					slugs: pageSlugs('partners', props.year.title),
				} as PageProps,
			},
			revalidate,
		};
	}
);
