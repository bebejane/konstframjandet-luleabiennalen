'use client';

import { getPathname, locales, usePathname as useIntlPathname } from '@/i18n/routing';
import { SectionId, sections } from '@/lib/menu';
import { usePathname } from 'next/navigation';
import { useContext, createContext, use } from 'react';

type PageContextProps = {
	year: YearQuery['year'];
	isArchive: boolean;
	isHome: boolean;
	section: SectionId;
};

const initialState: PageContextProps = {
	year: undefined,
	isHome: true,
	isArchive: false,
	section: 'home',
};

export const PageContext = createContext(initialState);

export type YearProviderProps = {
	children: any;
	value: Pick<PageContextProps, 'year'>;
};

function isValidSection(section: string): section is SectionId {
	return sections.includes(section as SectionId);
}

export function getSection(pathname: string, intlPathname: string, year?: string): SectionId {
	const params: Record<string, string> = {};

	intlPathname.split('/').forEach((p, idx) => {
		if (p.startsWith('[') && p.endsWith(']'))
			params[p.replace('[', '').replace(']', '')] = pathname.split('/')[idx];
	});

	const p = getPathname({
		href: {
			pathname: intlPathname,
			params: Object.keys(params).length ? params : undefined,
		} as any,
		locale: 'en',
	})
		.replace('/en', '')
		.split('/')
		.filter((p) => p);

	const isYear = Number.isInteger(Number(p[0]));
	const section = p.find((p) => isValidSection(p)) ?? 'home';

	return section;
}

export const PageProvider = ({ children, value }: YearProviderProps) => {
	const pathname = usePathname();
	const intlPathname = useIntlPathname();
	const section = getSection(pathname, intlPathname, value.year?.title);

	return (
		<PageContext.Provider
			value={{
				...initialState,
				...value,
				isArchive: value.year?.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR!,
				isHome: locales.some((l) => pathname.startsWith(`/${l}`)) || pathname === '/',
				section,
			}}
		>
			{children}
		</PageContext.Provider>
	);
};

export const usePage = (): PageContextProps => {
	return useContext(PageContext);
};
