import { apiQuery } from 'next-dato-utils/api';
import { AllYearsDocument, MenuDocument } from '@/graphql';
import { getPathname, locales, routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { Locale } from 'next-intl';

export type Href = {
	pathname: (typeof routing.pathnames)[keyof typeof routing.pathnames]['en'];
	params?: any;
} | null;
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

	if (!pathname) throw new Error(`No pathname found for section ${section}`);
	return { pathname, params } as Href;
}

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
					href: sectionToHref(e.section, locale, { year }),
					hrefAlt: sectionToHref(e.section, altLocale, { year }),
					sub:
						e.sub?.map((e2) => ({
							...e2,
							id: uuidV4(),
							href: sectionToHref(e2.section, locale, { year, [e2.section]: e2.href }),
							hrefAlt: sectionToHref(e2.section, altLocale, {
								year: e2.year,
								[e2.section]: e2.hrefAlt,
							}),
						})) ?? null,
				}))
				.filter(({ count }) => count || count === null)
				.sort((a, b) => (a.section === 'about' ? -1 : 1)),
		} as MenuItem;
	});

	return menu;
};

export const buildYearMenu = (
	{ year, abouts, aboutMeta, participantsMeta, exhibitionsMeta, locationsMeta }: MenuQuery,
	{
		locale,
		altLocale,
		isArchive = false,
		messages,
	}: { locale: string; altLocale: string; isArchive: boolean; messages: any },
): MenuItem[] => {
	if (!year) throw new Error('No year found');
	const {
		home,
		news,
		exhibitions,
		program,
		participants,
		partners,
		about,
		contact,
		archive,
		search,
	} = messages.Menu;

	const base: Menu = [
		{
			id: uuidV4(),
			section: 'home',
			label: home,
			href: sectionToHref('home', locale),
			hrefAlt: sectionToHref('home', altLocale),
			archive: false,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'news',
			label: news,
			href: sectionToHref('news', locale),
			hrefAlt: sectionToHref('news', altLocale),
			archive: false,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'exhibitions',
			label: exhibitions,
			href: sectionToHref('exhibitions', locale),
			hrefAlt: sectionToHref('exhibitions', altLocale),
			archive: true,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'program',
			label: program,
			href: sectionToHref('program', locale, { year }),
			hrefAlt: sectionToHref('program', altLocale, { year }),
			archive: true,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'participants',
			label: participants,
			href: sectionToHref('participants', locale, { year }),
			hrefAlt: sectionToHref('participants', altLocale, { year }),
			archive: true,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'partners',
			label: partners,
			href: sectionToHref('partners', locale, { year }),
			hrefAlt: sectionToHref('partners', altLocale, { year }),
			archive: false,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'about',
			label: about,
			href: sectionToHref('about', locale, { year }),
			hrefAlt: sectionToHref('about', altLocale, { year }),
			virtual: true,
			archive: true,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'contact',
			label: contact,
			href: sectionToHref('contact', locale),
			hrefAlt: sectionToHref('contact', altLocale),
			archive: false,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'archive',
			label: archive,
			href: sectionToHref('archive', locale),
			hrefAlt: sectionToHref('archive', altLocale),
			archive: false,
			sub: [],
		},
		{
			id: uuidV4(),
			section: 'search',
			label: search,
			href: sectionToHref('search', locale),
			hrefAlt: sectionToHref('search', altLocale),
			archive: false,
			sub: [],
		},
	];

	const menu = base.map((item) => {
		if (item.section === 'participants') item.label = year.participantName;
		else item.label = messages.Menu[item.section];

		item.href = sectionToHref(
			item.section,
			locale,
			item.archive ? { year: year.title } : undefined,
		);

		item.hrefAlt = sectionToHref(
			item.section,
			altLocale,
			item.archive ? { year: year.title } : undefined,
		);

		let sub: MenuItem[] = [];

		switch (item.section) {
			case 'about':
				sub = abouts
					.filter(({ year }) => (isArchive ? year : true))
					.map((el) => ({
						id: uuidV4(),
						section: `about`,
						label: el.title,
						archive: isArchive,
						href: sectionToHref('about', locale, { year: year.title, about: el.slug }),
						hrefAlt: sectionToHref('about', altLocale, {
							year: year.title,
							about: el.altSlug,
						}),
						sub: [],
					}));

				const mainAbout =
					abouts.filter(({ year }) => year)[0] || abouts.filter(({ year }) => !year)[0];

				if (mainAbout) {
					((item.href = sectionToHref('about', locale, {
						year: year.title,
						about: mainAbout.slug,
					})),
						(item.hrefAlt = sectionToHref('about', altLocale, {
							year: year.title,
							about: mainAbout.altSlug,
						})));
				}

				break;
			default:
				break;
		}

		return {
			...item,
			sub,
			year: year.title,
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

	return menu.filter(({ count }) => count || count === null);
};
