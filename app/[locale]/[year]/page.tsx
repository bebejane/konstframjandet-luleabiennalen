import { buildMetadata } from '@/app/[locale]/layout';
import { getPathname } from '@/i18n/routing';
import { Metadata } from 'next';
export { default } from './om/page';

export async function generateMetadata({
	params,
}: PageProps<'/[locale]/[year]'>): Promise<Metadata> {
	const { locale, year } = await params;
	return await buildMetadata({
		locale: locale as SiteLocale,
		year,
		pathname: getPathname({ locale, href: { pathname: '/[year]', params: { year } } }),
	});
}
