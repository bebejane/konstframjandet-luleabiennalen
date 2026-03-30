import { apiQuery } from 'next-dato-utils/api';
import { AllYearsDocument, MenuDocument } from '@/graphql';
import { locales, routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';

export type Href = {
	pathname: keyof typeof routing.pathnames;
	params?: any;
};
export type Menu = MenuItem[];
export type MenuItem = {
	id: string;
	title: string;
	route: keyof typeof routing.pathnames;
	href?: Href;
	hrefAlt?: Href;
	year?: string;
	archive?: boolean;
	sub: MenuItem[];
	virtual?: boolean;
	count?: number;
};

const base: Partial<MenuItem>[] = [
	{
		route: '/',
		archive: false,
		sub: [],
	},
	{
		route: '/nyheter',
		archive: false,
		sub: [],
	},
	{
		route: '/utstallningar',
		archive: true,
		sub: [],
	},
	{
		route: '/program',
		archive: true,
		sub: [],
	},
	{
		route: '/medverkande',
		archive: true,
		sub: [],
	},
	{
		route: '/partners',
		archive: false,
		sub: [],
	},
	{
		route: '/om',
		virtual: true,
		archive: true,
		sub: [],
	},
	{
		route: '/kontakt',
		archive: false,
		sub: [],
	},
	{
		route: '/arkiv',
		archive: false,
		sub: [],
	},
	{
		route: '/sok',
		archive: false,
		sub: [],
	},
];

export const buildMenu = async (locale: SiteLocale) => {
	const messages = await getMessages({ locale });
	const altLocale = locales.find((l) => locale != l) as SiteLocale;
	const { allYears } = await apiQuery(AllYearsDocument, {
		variables: { locale },
	});

	const year = allYears.find(({ title }) => title === process.env.NEXT_PUBLIC_CURRENT_YEAR!);
	if (!year) throw new Error('No default year found');

	const res = await apiQuery(MenuDocument, {
		variables: {
			yearId: year.id,
			locale,
			altLocale,
		},
	});

	const archive = await Promise.all(
		allYears
			.filter(({ id }) => id !== year.id)
			.map(({ id }) => apiQuery(MenuDocument, { variables: { yearId: id, locale, altLocale } })),
	);

	const menu = buildYearMenu(res, { locale, altLocale, isArchive: false, messages });
	const archiveIndex = menu.findIndex((el) => el.route === '/arkiv');
	if (archiveIndex === -1) throw new Error('No archive index found');

	menu[archiveIndex].sub = archive.map((el) => {
		const year = el.year?.title;
		if (!year) throw new Error('No year found');
		const abouts = el.abouts;
		const haveAboutOverview = abouts.filter(({ year }) => year).length > 0;

		const href = {
			pathname: `/[year]`,
			params: { year },
		};

		return {
			id: uuidV4(),
			route: `/arkiv`,
			title: `LB°${year.substring(2)}`,
			href: haveAboutOverview ? href : null,
			hrefAlt: haveAboutOverview ? href : null,
			sub: buildYearMenu(el, { locale, altLocale, isArchive: true, messages })
				.filter((e) => e.archive)
				.map((e) => ({
					...e,
					id: uuidV4(),
					href: {
						pathname: `${href.pathname}${e.route}` as Href['pathname'],
						params: { ...href.params, year },
					},
					hrefAlt: {
						pathname: `${href.pathname}${e.route}` as Href['pathname'],
						params: { ...href.params, year },
					},
					sub:
						e.sub?.map((e2) => ({
							...e2,
							id: uuidV4(),
							href: {
								pathname: `${href.pathname}${e.route}/[about]` as Href['pathname'],
								params: {
									...href.params,
									year,
									about: abouts.find(({ title }) => title === e2.title)?.slug,
								},
							},
							hrefAlt: {
								pathname: `${href.pathname}${e.route}/[about]` as Href['pathname'],
								params: {
									...href.params,
									year,
									about: abouts.find(({ title }) => title === e2.title)?.altSlug,
								},
							},
						})) ?? [],
				}))
				.filter(({ count }) => count || count === null)
				.sort((a, b) => (a.route === '/om' ? -1 : 1)),
		} as MenuItem;
	});

	return menu;
};

export const buildYearMenu = (
	{ year: _year, abouts, aboutMeta, participantsMeta, exhibitionsMeta, locationsMeta }: MenuQuery,
	{
		isArchive = false,
		messages,
	}: { locale: string; altLocale: string; isArchive: boolean; messages: any },
): MenuItem[] => {
	if (!_year) throw new Error('No year found');
	const year = _year.title;
	const menu = base.map((item) => {
		const route = item.route;
		const mKey =
			routing.pathnames[route as keyof typeof routing.pathnames].en.replace('/', '') || 'home';
		item.id = uuidV4();
		item.title = item.route === '/medverkande' ? _year.participantName : messages.Menu[mKey];

		const href = {
			pathname:
				`${route === '/arkiv' ? `/[year]` : ''}${route !== '/' ? route : ''}` as Href['pathname'],
			params: route === '/arkiv' ? { year } : {},
		} as Href;

		item.href = href;
		item.hrefAlt = href;

		let sub: MenuItem[] = [];

		switch (item.route) {
			case '/om':
				sub = abouts
					.filter(({ year }) => (isArchive ? year : true))
					.map(({ title, slug, altSlug }) => ({
						id: uuidV4(),
						route: `/om`,
						title: title,
						archive: isArchive,
						href: {
							pathname: `${href.pathname}/[about]` as Href['pathname'],
							params: { ...href.params, about: slug },
						},
						hrefAlt: {
							pathname: `${href.pathname}/[about]` as Href['pathname'],
							params: { ...href.params, about: altSlug },
						},
						sub: [],
					}));

				const mainAbout =
					abouts.filter(({ year }) => year)[0] || abouts.filter(({ year }) => !year)[0];

				if (mainAbout) {
					item.href = {
						pathname: `${href.pathname}/[about]` as Href['pathname'],
						params: { ...href.params, about: mainAbout.slug },
					};
					item.hrefAlt = {
						pathname: `${href.pathname}/[about]` as Href['pathname'],
						params: { ...href.params, about: mainAbout.altSlug },
					};
				}
				break;
			default:
				break;
		}

		return {
			...item,
			sub,
			year,
			count:
				item.route === '/om'
					? aboutMeta?.count
					: item.route === '/medverkande'
						? participantsMeta?.count
						: item.route === '/utstallningar'
							? exhibitionsMeta?.count
							: item.route === '/platser'
								? locationsMeta?.count
								: null,
		};
	});

	return menu.filter(({ count }) => count || count === null) as MenuItem[];
};

export function getMenuItem(id: string, menu: Menu): MenuItem {
	const item = menu.reduce<MenuItem | null>((acc, el) => {
		if (el.id === id) acc = el;
		if (acc) return acc;
		try {
			if (el.sub.length) return getMenuItem(id, el.sub);
		} catch (e) {}
		return acc;
	}, null);

	if (!item) throw new Error(`No menu item found for id: ${id}`);
	return item;
}

function uuidV4() {
	const uuid = new Array(36);
	for (let i = 0; i < 36; i++) {
		uuid[i] = Math.floor(Math.random() * 16);
	}
	uuid[14] = 4; // set bits 12-15 of time-high-and-version to 0100
	uuid[19] = uuid[19] &= ~(1 << 2); // set bit 6 of clock-seq-and-reserved to zero
	uuid[19] = uuid[19] |= 1 << 3; // set bit 7 of clock-seq-and-reserved to one
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	return uuid.map((x) => x.toString(16)).join('');
}
