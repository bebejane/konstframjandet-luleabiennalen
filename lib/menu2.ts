import { apiQuery } from 'next-dato-utils/api';
import { AllYearsDocument, MenuDocument } from '@/graphql';
import { getPathname, locales, routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { Locale } from 'next-intl';

export type Href = {
	pathname: (typeof routing.pathnames)[keyof typeof routing.pathnames]['en'];
	params?: any;
};
export type Menu = MenuItem[];
export type MenuItem = {
	id: string;
	section: Section;
	label: string;
	href: Href;
	hrefAlt: Href;
	year?: string;
	archive: boolean;
	sub: MenuItem[];
	virtual?: boolean;
	count?: number;
};

export type Section =
	| 'home'
	| 'contact'
	| 'participants'
	| 'news'
	| 'about'
	| 'locations'
	| 'program'
	| 'exhibitions'
	| 'partners'
	| 'archive'
	| 'search';

export const sections: Section[] = [
	'home',
	'contact',
	'participants',
	'news',
	'about',
	'locations',
	'program',
	'exhibitions',
	'partners',
	'archive',
	'search',
];

//const base: Pick<MenuItem, 'section' | 'archive' | 'sub' | 'virtual'>[] = [
const base: Partial<MenuItem>[] = [
	{
		section: 'home',
		archive: false,
		sub: [],
	},
	{
		section: 'news',
		archive: false,
		sub: [],
	},
	{
		section: 'exhibitions',
		archive: true,
		sub: [],
	},
	{
		section: 'program',
		archive: true,
		sub: [],
	},
	{
		section: 'participants',
		archive: true,
		sub: [],
	},
	{
		section: 'partners',
		archive: false,
		sub: [],
	},
	{
		section: 'about',
		virtual: true,
		archive: true,
		sub: [],
	},
	{
		section: 'contact',
		archive: false,
		sub: [],
	},
	{
		section: 'archive',
		archive: false,
		sub: [],
	},
	{
		section: 'search',
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
	const archiveIndex = menu.findIndex((el) => el.section === 'archive');
	if (archiveIndex === -1) throw new Error('No archive index found');

	menu[archiveIndex].sub = archive.map((el) => {
		const year = el.year?.title;
		if (!year) throw new Error('No year found');
		const haveAboutOverview = el.abouts.filter(({ year }) => year).length > 0;

		return {
			id: uuidV4(),
			section: `archive`,
			label: `LB°${year.substring(2)}`,
			href: haveAboutOverview ? sectionToHref('home', locale, { year }) : null,
			hrefAlt: haveAboutOverview ? sectionToHref('home', locale, { year }) : null,
			sub: buildYearMenu(el, { locale, altLocale, isArchive: true, messages })
				.filter((e) => e.archive)
				.map((e) => ({
					...e,
					id: uuidV4(),
					href: {
						...e.href,
					},
					hrefAlt: {
						...e.hrefAlt,
					},
					sub:
						e.sub?.map((e2) => ({
							...e2,
							id: uuidV4(),
							href: sectionToHref(e2.section, locale, { year, [e2.section]: e2.href }),
							hrefAlt: sectionToHref(e2.section, altLocale, {
								year: e2.year,
								[e2.section]: e2.hrefAlt,
							}),
						})) ?? [],
				}))
				.filter(({ count }) => count || count === null)
				.sort((a, b) => (a.section === 'about' ? -1 : 1)),
		} as MenuItem;
	});

	return menu;
};

export const buildYearMenu = (
	{ year: _year, abouts, aboutMeta, participantsMeta, exhibitionsMeta, locationsMeta }: MenuQuery,
	{
		locale,
		altLocale,
		isArchive = false,
		messages,
	}: { locale: string; altLocale: string; isArchive: boolean; messages: any },
): MenuItem[] => {
	if (!_year) throw new Error('No year found');
	const year = _year.title;
	const menu = base.map((item) => {
		const section = item.section as Section;
		item.id = uuidV4();
		item.label = item.section === 'participants' ? _year.participantName : messages.Menu[section];

		const href = {
			pathname:
				`${section === 'archive' ? `/[year]` : ''}/${section !== 'home' ? section : ''}` as Href['pathname'],
			params: section === 'archive' ? { year } : {},
		};

		item.href = href;
		item.hrefAlt = href;

		let sub: MenuItem[] = [];

		switch (item.section) {
			case 'about':
				sub = abouts
					.filter(({ year }) => (isArchive ? year : true))
					.map(({ title, slug, altSlug }) => ({
						id: uuidV4(),
						section: `about`,
						label: title,
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
				item.section === 'about'
					? aboutMeta?.count
					: item.section === 'participants'
						? participantsMeta?.count
						: item.section === 'exhibitions'
							? exhibitionsMeta?.count
							: item.section === 'locations'
								? locationsMeta?.count
								: null,
		};
	});

	return menu.filter(({ count }) => count || count === null) as MenuItem[];
};

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

function sectionToHref(section: Section, locale: Locale, params?: any): Href {
	const { pathnames } = routing;
	const year = params?.year !== process.env.NEXT_PUBLIC_CURRENT_YEAR! ? params?.year : undefined;

	const pathname = Object.keys(pathnames).find((k) => {
		const full = `${year ? `/[year]` : ''}/${section}${params?.about ? '/[about]' : ''}`;
		const p = pathnames[k as keyof typeof routing.pathnames].en;
		return p === full || (p === `/` && section === 'home');
	});

	if (!pathname) {
		console.log(section, params);

		throw new Error(`No pathname found for section ${section}`);
	}
	return { pathname, params } as Href;
}
