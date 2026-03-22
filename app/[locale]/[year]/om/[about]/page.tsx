import { AllYearsDocument } from '@/graphql';
import { locales } from '@/i18n/routing';
import { apiQuery } from 'next-dato-utils/api';
export { default } from '@/app/[locale]/om/[about]/page';

export async function generateStaticParams() {
	const { allYears } = await apiQuery(AllYearsDocument);
	return locales.map((locale) => allYears.map((year) => ({ year: year.title, locale }))).flat();
}
