import '@/styles/index.scss';
import 'swiper/css';
import s from './layout.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { GeneralDocument, SiteDocument } from '@/graphql';
import { Metadata } from 'next';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { NextIntlClientProvider } from 'next-intl';
import { getPathname, locales } from '@/i18n/routing';
import { DraftModeContentLink } from 'next-dato-utils/components';
import { Footer, Language, Menu } from '@/components';
import { buildMenu } from '@/lib/menu';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PageBackground from '@/components/common/PageBackground';

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const menu = await buildMenu(locale);
	const { general, draftUrl } = await apiQuery(GeneralDocument, {
		variables: { locale: locale as SiteLocale },
	});

	return (
		<html lang='en-US'>
			<body id='root' className='root'>
				<NextIntlClientProvider>
					{/* <PageProvider value={{ ...page, year: pageProps.year, isHome }}> */}

					{/* {showBackground && backgroundImage?.responsiveImage && (
						<div className={s.background}>
							<Image
								data={backgroundImage.responsiveImage}
								className={s.image}
								style={year.fullOpacity ? { opacity: 1 } : undefined}
							/>
						</div>
					)} */}
					<div className={s.layout}>
						<main
							id='content'
							//className={cn(s.content, !showMenu && s.full)}
							className={cn(s.content, s.full)}
						>
							<article>
								{/* <SectionHeader menu={menu} /> */}
								{children}
							</article>
						</main>
					</div>
					<Menu items={menu} />
					<Language menu={menu} />
					<Footer footer={general} />
					<PageBackground />
					{/* <FullscreenGallery
					index={images?.findIndex((image) => image?.id === imageId)}
					images={images}
					show={imageId !== undefined}
					onClose={() => setImageId(undefined)}
				/> */}

					{/* </PageProvider> */}
				</NextIntlClientProvider>
				<DraftModeContentLink />
			</body>
		</html>
	);
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
	const { locale } = await params;
	const {
		_site: { globalSeo, faviconMetaTags },
	} = await apiQuery(SiteDocument, {
		variables: { locale: locale as SiteLocale },
		revalidate: 60 * 60,
	});

	const siteName = globalSeo?.siteName ?? '';

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
		icons: faviconMetaTags.map(({ attributes: { rel, sizes, type, href: url } }) => ({
			rel,
			url,
			sizes,
			type,
		})) as Icon[],
		...(await buildMetadata({
			title: {
				template: `${siteName} — %s`,
				default: siteName ?? '',
			},
			description: globalSeo?.fallbackSeo?.description?.substring(0, 157),
			pathname: getPathname({ locale, href: '/' }),
			image: globalSeo?.fallbackSeo?.image as FileField,
			locale: locale as SiteLocale,
		})),
	};
}

export type BuildMetadataProps = {
	title?: string | any;
	description?: string | null | undefined;
	pathname?: string;
	image?: FileField | null | undefined;
	locale: SiteLocale;
};

export async function buildMetadata({
	title,
	description,
	pathname,
	image,
	locale,
}: BuildMetadataProps): Promise<Metadata> {
	description = !description
		? ''
		: description.length > 160
			? `${description.substring(0, 157)}...`
			: description;

	const url = pathname ? `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}` : undefined;

	return {
		title,
		alternates: {
			canonical: url,
		},
		description,
		openGraph: {
			title,
			description,
			url,
			images: image
				? [
						{
							url: `${image?.url}?w=1200&h=630&fit=fill&q=80`,
							width: 800,
							height: 600,
							alt: title,
						},
						{
							url: `${image?.url}?w=1600&h=800&fit=fill&q=80`,
							width: 1600,
							height: 800,
							alt: title,
						},
						{
							url: `${image?.url}?w=790&h=627&fit=crop&q=80`,
							width: 790,
							height: 627,
							alt: title,
						},
					]
				: undefined,
			locale: locale === 'sv' ? 'sv_SE' : 'en_US',
			type: 'website',
		},
	};
}
