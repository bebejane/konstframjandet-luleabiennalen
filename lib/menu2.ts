import { apiQuery } from 'next-dato-utils/api';
import { AllYearsDocument, MenuDocument } from '@/graphql';
import { getPathname, locales, routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { Locale } from 'next-intl';

export type Pathname = keyof typeof routing.pathnames;
export type Menu = MenuItem[];
export type MenuItem = {
	id: SectionId;
	label: string;
	pathname: Pathname;
	pathnameAlt?: Pathname;
	year?: string;
	archive: boolean;
	sub?: MenuItem[];
	virtual?: boolean;
	count?: number;
};

export type SectionId =
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

export const sections: SectionId[] = [
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

function sectionToPathname(
	section: SectionId,
	locale: Locale,
	params?: any,
): keyof typeof routing.pathnames {
	const { pathnames } = routing;
	const pathname = Object.keys(pathnames).find(
		(k) =>
			pathnames[k as Pathname].en === `/${params?.year ? `[${params.year}]/` : ''}${section}` ||
			(pathnames[k as Pathname].en === `/` && section === 'home'),
	) as Pathname;
	if (!pathname) {
		console.log(params);
		throw new Error(`No pathname found for section ${section}`);
	}

	return getPathname({ locale, href: { pathname, params } }) as Pathname;
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
	const archiveIndex = menu.findIndex((el) => el.id === 'archive');
	if (archiveIndex === -1) throw new Error('No archive index found');

	menu[archiveIndex].sub = archive.map((el) => {
		const year = el.year?.title;
		if (!year) throw new Error('No year found');
		const haveAboutOverview = el.abouts.filter(({ year }) => year).length > 0;

		return {
			id: `archive`,
			label: `LB°${year.substring(2)}`,
			pathname: haveAboutOverview ? `/${year}` : null,
			pathnameAlt: haveAboutOverview ? `/${year}` : null,
			sub: buildYearMenu(el, { locale, altLocale, isArchive: true, messages })
				.filter((e) => e.archive)
				.map((e) => ({
					...e,
					pathname: sectionToPathname(e.id, locale, { year }),
					pathnameAlt: sectionToPathname(e.id, altLocale, { year }),
					sub:
						e.sub?.map((e2) => ({
							...e2,
							pathname: sectionToPathname(e2.id, locale, { year, [e2.id]: e2.pathname }),
							pathnameAlt: sectionToPathname(e2.id, altLocale, {
								year: e2.year,
								[e2.id]: e2.pathnameAlt,
							}),
						})) ?? null,
				}))
				.filter(({ count }) => count || count === null)
				.sort((a, b) => (a.id === 'about' ? -1 : 1)),
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
		{ id: 'home', label: home, pathname: '/', archive: false },
		{ id: 'news', label: news, pathname: '/nyheter', archive: false },
		{ id: 'exhibitions', label: exhibitions, pathname: '/utstallningar', archive: true },
		{ id: 'program', label: program, pathname: '/program', archive: true },
		{ id: 'participants', label: participants, pathname: '/medverkande', archive: true },
		{ id: 'partners', label: partners, pathname: '/partners', archive: false },
		{ id: 'about', label: about, pathname: '/om', virtual: true, sub: [], archive: true },
		{ id: 'contact', label: contact, pathname: '/kontakt', archive: false },
		{ id: 'archive', label: archive, pathname: '/arkiv', sub: [], archive: false },
		{ id: 'search', label: search, pathname: '/sok', archive: false },
	];

	let sub: MenuItem[] = [];

	const menu = base.map((item) => {
		if (item.id === 'participants') item.label = year.participantName;
		else item.label = messages.Menu[item.id];

		item.pathname = sectionToPathname(
			item.id,
			locale,
			item.archive ? { year: year.title } : undefined,
		);

		item.pathnameAlt = sectionToPathname(
			item.id,
			altLocale,
			item.archive ? { year: year.title } : undefined,
		);

		switch (item.id) {
			case 'about':
				sub = abouts
					.filter(({ year }) => (isArchive ? year : true))
					.map((el) => ({
						id: `about`,
						label: el.title,
						pathname: sectionToPathname('about', locale, { year: year.title, about: el.slug }),
						altPathname: sectionToPathname('about', altLocale, {
							year: year.title,
							about: el.altSlug,
						}),
					}));

				const mainAbout =
					abouts.filter(({ year }) => year)[0] || abouts.filter(({ year }) => !year)[0];

				if (mainAbout) {
					((item.pathname = sectionToPathname('about', locale, {
						year: year.title,
						about: mainAbout.slug,
					})),
						(item.pathnameAlt = sectionToPathname('about', altLocale, {
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
			sub: sub || item.sub || null,
			year: year.title,
			count:
				item.id === 'about'
					? aboutMeta?.count
					: item.id === 'participants'
						? participantsMeta?.count
						: item.id === 'exhibitions'
							? exhibitionsMeta?.count
							: item.id === 'locations'
								? locationsMeta?.count
								: null,
		};
	});

	return menu.filter(({ count }) => count || count === null);
};
