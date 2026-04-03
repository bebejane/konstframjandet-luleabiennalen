import { apiQuery } from 'next-dato-utils/api';
import {
	DatoCmsConfig,
	getItemApiKey,
	getUploadReferenceRoutes,
	getItemReferenceRoutes,
} from 'next-dato-utils/config';
import { MetadataRoute } from 'next';
import { SiteDocument, SitemapDocument } from '@/graphql';
import { defaultLocale, getPathname, routing } from '@/i18n/routing';

export function getRoute(item: any, locale?: string | null): string {
	const apiKey = getItemApiKey(item);
	if (!apiKey) throw new Error('No api key found');
	const year = item.year;
	const slug = typeof item.slug === 'string' ? item.slug : item.slug[locale ?? defaultLocale];
	let route: string | null = null;

	switch (apiKey) {
		case 'start':
			route = '/';
			break;
		case 'about':
			route = `/om/[about]`;
			break;
		case 'news':
			route = `/nyheter/[news]`;
			break;
		case 'project':
			route = `/projekt/[project]`;
			break;
		case 'program':
			route = `/program/[program]`;
			break;
		case 'partner':
			route = `/partners/[partner]`;
			break;
		case 'exhibition':
			route = `/utstallningar/[exhibition]`;
			break;
		case 'participant':
			route = `/medverkande/[participant]`;
			break;
		case 'location':
			route = `/platser/[location]`;
			break;
		case 'year':
			route = `/[year]`;
			break;
	}

	if (!route) throw new Error('No route found for apiKey: ' + apiKey);

	const params: any = {};
	const routeParams = route.match(/\[(\w+)\]/g)?.map((el) => el.replace('[', '').replace(']', ''));
	routeParams?.forEach((param) => {
		params[param] = slug;
	});

	if (year?.title && year?.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR) {
		params.year = year.title;
		route = `/[year]${route}`;
	}
	return getPathname({
		locale: locale ?? defaultLocale,
		href: { pathname: route as any, params },
	});
}

export default {
	route: async (item, locale) => getRoute(item, locale) ?? null,
	routes: {
		start: async (item) => [getRoute(item)],
		about: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		news: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		project: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		program: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		partner: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		exhibition: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		participant: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		location: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item))],
		contact: async (item) => [getRoute(item)],
		upload: async ({ id }) => getUploadReferenceRoutes(id),
	},
	sitemap: async (locale) => {
		const {
			allAbouts,
			allExhibitions,
			allLocations,
			allNews,
			allParticipants,
			allPartners,
			allPrograms,
			allYears,
		} = await apiQuery(SitemapDocument, {
			all: true,
			includeDrafts: false,
		});

		const staticRoutes = ['/', '/kontakt', '/nyheter'].map((pathname: any) => ({
			url: getPathname({ locale: locale ?? defaultLocale, href: { pathname } }),
			lastModified: new Date().toISOString(),
			changeFrequency: pathname === '/' ? 'daily' : 'weekly',
			priority: pathname === '/' ? 1 : 0.8,
		}));
		const dynamicRoutes = [
			...allAbouts,
			...allExhibitions,
			...allLocations,
			...allNews,
			...allParticipants,
			...allPartners,
			...allPrograms,
			...allYears,
		].map((item) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/${getRoute(item, locale)}`,
			lastModified: new Date(item._updatedAt).toISOString(),
			changeFrequency: 'monthly',
			priority: 0.8,
		}));
		return [...staticRoutes, ...dynamicRoutes] as MetadataRoute.Sitemap;
	},
	manifest: async (locale = defaultLocale) => {
		const { _site: site } = await apiQuery(SiteDocument, {
			variables: {
				locale: locale as SiteLocale,
			},
		});

		return {
			name: site.globalSeo?.fallbackSeo?.title as string,
			short_name: site.globalSeo?.fallbackSeo?.title as string,
			description: site.globalSeo?.fallbackSeo?.description as string,
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#000000',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
				disallow: ['/api'],
			},
		};
	},
} satisfies DatoCmsConfig;
