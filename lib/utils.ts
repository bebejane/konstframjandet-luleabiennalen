import i18nPaths from '@/i18n/paths.json';
import type { MenuItem } from '@/lib/menu';
import { format } from 'date-fns';
import { capitalize } from 'next-dato-utils/utils';

export const isServer = typeof window === 'undefined';

export const recordToSlug = (record: any): string => {
	let url;

	if (!record) {
		throw new Error('recordToSlug: Record  is empty');
	}

	if (typeof record === 'string') return record;
	else {
		const { __typename, slug } = record;

		switch (__typename) {
			case 'AboutRecord':
				url = `/om/${slug}`;
				break;
			case 'ParticipantRecord':
				url = `/medverkande/${slug}`;
				break;
			case 'ProgramRecord':
				url = `/program/${slug}`;
				break;
			case 'ExhibitionRecord':
				url = `/utstallningar/${slug}`;
				break;
			case 'NewsRecord':
				url = `/nyheter/${slug}`;
				break;
			case 'LocationRecord':
				url = `/platser/${slug}`;
				break;
			case 'PartnerRecord':
				url = `/partners/${slug}`;
				break;
			default:
				url = '/';
				break;
			//throw Error(`${__typename} is unknown record slug!`)
		}
	}

	return url;
};

export const isEmptyObject = (obj: any) =>
	Object.keys(obj).filter((k) => obj[k] !== undefined).length === 0;

export const formatDate = (
	date: string,
	endDate?: string,
	locale?: string,
	long: boolean = false,
) => {
	if (!date) return '';
	const f = locale === 'sv' ? `d MMM${long ? 'M' : ''}` : `MMM${long ? 'M' : ''} d`;
	const s = capitalize(format(new Date(date), f)).replace('.', '');
	const e = endDate ? capitalize(format(new Date(endDate), f)).replace('.', '') : undefined;
	const d = `${s}${e ? ` – ${e}` : ''}`;
	return locale === 'sv' ? d.toLowerCase() : d;
};

export const pathToParentMenuItem = (
	path: string,
	locale: string,
	items: MenuItem[],
	parent?: MenuItem,
): MenuItem => {
	path = path.split('?')[0];

	let item = items
		.filter((el) => el.slug)
		.find(({ slug, sub }, idx) => {
			return [slug, `/${locale}${slug}`].filter((el) => el).includes(path);
		});

	if (item) return parent;

	for (let i = 0; i < items.length; i++) {
		if (items[i].sub) {
			item = pathToParentMenuItem(path, locale, items[i].sub, items[i]);
			if (item) return items[i];
		}
	}
};

export const pathToMenuItem = (path: string, locale: string, items: MenuItem[]): MenuItem => {
	path = path.split('?')[0];

	let item = items
		.filter((el) => el.slug)
		.find(({ slug, sub }, idx) => {
			return [slug, `/${locale}${slug}`].filter((el) => el).includes(path);
		});

	if (item) return item;

	for (let i = 0; i < items.length; i++) {
		if (items[i].sub) {
			item = pathToMenuItem(path, locale, items[i].sub);
			if (item) return item;
		}
	}
};

export const translatePath = (
	href: string,
	locale: string,
	defaultLocale: string,
	year?: string,
): string => {
	const basePath = href.split('/')[1];
	const slug = href.split('/').slice(2).join('/');
	const key = Object.keys(i18nPaths).find((k) =>
		[i18nPaths[k].sv, i18nPaths[k].en].includes(basePath),
	);
	const translatedPath = !basePath || !key ? '/' : `/${i18nPaths[key][locale]}/${slug}`;

	const fullPath = translatedPath
		? `${locale !== defaultLocale ? `/${locale}` : ''}${year ? `/${year}` : ''}${translatedPath}`
		: undefined;
	return fullPath;
};
