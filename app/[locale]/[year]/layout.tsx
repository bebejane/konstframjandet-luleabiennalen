import { AllYearsDocument } from '@/graphql';
import { locales } from '@/i18n/routing';
import { apiQuery } from 'next-dato-utils/api';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function YearLayout({ children, params }: LayoutProps<'/[locale]/[year]'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	return (<>{children}</>);
}

export async function generateStaticParams() {
	const { allYears } = await apiQuery(AllYearsDocument);
	return allYears.map((year) => ({ year: year.title }));
}

