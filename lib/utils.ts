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
	endDate?: string | null,
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

export function uuidV4() {
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
