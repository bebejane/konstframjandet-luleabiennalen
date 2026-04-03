import { apiQuery } from 'next-dato-utils/api';
import { default as AboutPage } from './[about]/page';
import { MainAboutDocument, YearDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/app/[locale]/layout';
import { getPathname } from '@/i18n/routing';

export default async function About({ params, searchParams }: PageProps<'/[locale]/[year]/om'>) {
	const { locale, year } = await params;
	const yearId = (
		await apiQuery(YearDocument, {
			variables: { title: year ?? process.env.NEXT_PUBLIC_CURRENT_YEAR },
		})
	)?.year?.id;

	const { allAbouts } = await apiQuery(MainAboutDocument, {
		variables: { locale: locale as SiteLocale, yearId: yearId },
	});

	const about = allAbouts?.[0];
	if (!about) return notFound();

	return (
		<AboutPage
			searchParams={searchParams}
			params={
				new Promise((resolve) =>
					resolve({
						locale,
						about: about.slug,
						year,
					}),
				)
			}
		/>
	);
}

export async function generateMetadata({
	params,
}: PageProps<'/[locale]/[year]/om/[about]'>): Promise<Metadata> {
	const { locale, about: slug, year } = await params;
	const yearId = (
		await apiQuery(YearDocument, {
			variables: { title: year ?? process.env.NEXT_PUBLIC_CURRENT_YEAR },
		})
	)?.year?.id;

	const { allAbouts } = await apiQuery(MainAboutDocument, {
		variables: { locale: locale as SiteLocale, yearId: yearId },
	});

	const about = allAbouts?.[0];
	if (!about) return notFound();

	const t = await getTranslations('Menu');
	return await buildMetadata({
		title: about?.title,
		locale: locale as SiteLocale,
		year,
		pathname: getPathname({
			locale,
			href: { pathname: `/om` },
		}),
	});
}
