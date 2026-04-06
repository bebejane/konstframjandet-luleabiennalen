import { YearDocument } from '@/graphql';
import { format } from 'date-fns';
import { apiQuery } from 'next-dato-utils/api';
import { capitalize } from 'next-dato-utils/utils';

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

export async function getYear(
	title = process.env.NEXT_PUBLIC_CURRENT_YEAR!,
	locale: SiteLocale | string,
): Promise<NonNullable<YearQuery['year']>> {
	const { year } = await apiQuery(YearDocument, {
		variables: { locale: locale as SiteLocale, title },
	});
	if (!year) throw new Error('No year found');
	return year;
}

export async function getCurrentYear(locale: SiteLocale | string) {
	return await getYear(process.env.NEXT_PUBLIC_CURRENT_YEAR!, locale);
}

export async function getYearId(
	title = process.env.NEXT_PUBLIC_CURRENT_YEAR!,
	locale: SiteLocale | string,
) {
	return (await getYear(title, locale)).id;
}
