import { AllYearsDocument, YearDocument } from '@/graphql';
import { locales } from '@/i18n/routing';
import { apiQuery } from 'next-dato-utils/api';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function YearLayout({ children, params }: LayoutProps<'/[locale]/[year]'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);
	return <>{children}</>;
}

export async function generateStaticParams({ params }: LayoutProps<'/[locale]/[year]'>) {
	const { locale, year: _year } = await params;
	if (!locales.includes(locale as any)) return notFound();

	const { year } = await apiQuery(YearDocument, {
		variables: {
			locale: locale as SiteLocale,
			title: _year ?? process.env.NEXT_PUBLIC_CURRENT_YEAR,
		},
	});
	const { allYears } = await apiQuery(AllYearsDocument, {
		variables: {
			locale: locale as SiteLocale,
			//year: year?.title,
		},
	});

	return allYears.map((year) => ({ year: year.title, locale }));
}
