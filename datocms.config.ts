import { apiQuery } from 'next-dato-utils/api';
import {
	DatoCmsConfig,
	getItemApiKey,
	getUploadReferenceRoutes,
	getItemReferenceRoutes,
} from 'next-dato-utils/config';
import { MetadataRoute } from 'next';
import { SiteDocument } from '@/graphql';

export function getRoute(item: any): string {
	const apiKey = getItemApiKey(item);
	if (!apiKey) throw new Error('No api key found');

	switch (apiKey) {
		case 'start':
			return '/';
		case 'about':
			return '/om';
		case 'news':
			return `/aktuellt/${item?.slug}`;
		case 'project':
			return `/projekt/${item?.slug}`;
		case 'project_subpage':
			return `/projekt/${item?.project?.slug}/${item?.slug}`;
		case 'district':
			return '/';
		case 'contact':
			return '/kontakt';
		default:
			throw new Error('No route found for apiKey: ' + apiKey);
	}
}

export default {
	route: async (item) => getRoute(item) ?? null,
	routes: {
		// start: async () => [getRoute('start')],
		// about: async () => [getRoute('about')],
		// news: async (item) => [getRoute(item), '/aktuellt', ...(await getItemReferenceRoutes(item.id))],
		// project: async (item) => [getRoute(item), ...(await getItemReferenceRoutes(item.id))],
		// project_subpage: async (item) => {
		// 	const { project } = await apiQuery(ProjectBySubpageDocument, {
		// 		variables: { subpageId: item.id },
		// 	});
		// 	return project ? [getRoute(item), ...(await getItemReferenceRoutes(item.id))] : null;
		// },
		// district: async () => ['/', '/om', '/projekt', '/aktuellt'],
		// contact: async () => ['/kontakt'],
		// upload: async ({ id }) => getUploadReferenceRoutes(id),
	},
	sitemap: async () => {
		// const { allAbouts, allWorkshops, allCourses } = await apiQuery(SitemapDocument, {
		// 	all: true,
		// 	includeDrafts: false,
		// });
		// const staticRoutes = ['/', '/kontakt', '/in-english', '/bli-medlem', '/logga-in'].map((p) => ({
		// 	url: `${process.env.NEXT_PUBLIC_SITE_URL}${p}`,
		// 	lastModified: new Date().toISOString(),
		// 	changeFrequency: p === '/' ? 'daily' : 'weekly',
		// 	priority: p === '/' ? 1 : 0.8,
		// }));

		// const aboutRoutes = allAbouts
		// 	.map(({ slug, _updatedAt }) => ({
		// 		url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss/${slug}`,
		// 		lastModified: new Date(_updatedAt).toISOString(),
		// 		changeFrequency: 'monthly',
		// 		priority: 0.8,
		// 	}))
		// 	.concat({
		// 		url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss`,
		// 		lastModified: new Date(allAbouts.find(({ slug }) => slug === 'om-oss')?._updatedAt).toISOString(),
		// 		changeFrequency: 'monthly',
		// 		priority: 0.8,
		// 	});

		// const allWorkshopRoutes = allWorkshops
		// 	.map(({ slug, _updatedAt }) => ({
		// 		url: `${process.env.NEXT_PUBLIC_SITE_URL}/verkstader/${slug}`,
		// 		lastModified: new Date(_updatedAt).toISOString(),
		// 		changeFrequency: 'monthly',
		// 		priority: 0.8,
		// 	}))
		// 	.concat({
		// 		url: `${process.env.NEXT_PUBLIC_SITE_URL}/verkstader`,
		// 		lastModified: new Date(
		// 			allWorkshops.sort((a, b) => b._updatedAt.localeCompare(a._updatedAt))[0]?._updatedAt
		// 		).toISOString(),
		// 		changeFrequency: 'monthly',
		// 		priority: 0.8,
		// 	});

		// const allCourseRoutes = allCourses
		// 	.map(({ slug, _updatedAt }) => ({
		// 		url: `${process.env.NEXT_PUBLIC_SITE_URL}/kurser/${slug}`,
		// 		lastModified: new Date(_updatedAt).toISOString(),
		// 		changeFrequency: 'monthly',
		// 		priority: 0.8,
		// 	}))
		// 	.concat({
		// 		url: `${process.env.NEXT_PUBLIC_SITE_URL}/kurser`,
		// 		lastModified: new Date(
		// 			allCourses.sort((a, b) => b._updatedAt.localeCompare(a._updatedAt))[0]?._updatedAt
		// 		).toISOString(),
		// 		changeFrequency: 'monthly',
		// 		priority: 0.8,
		// 	});

		// return [...staticRoutes, ...aboutRoutes, ...allWorkshopRoutes, ...allCourseRoutes] as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		const { _site:site } = await apiQuery(SiteDocument);

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
				disallow: ['/api', '/medlem'],
			},
		};
	},
} satisfies DatoCmsConfig;
