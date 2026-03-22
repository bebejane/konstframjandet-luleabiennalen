'use client';

import { locales, usePathname } from '@/i18n/routing';
import { useContext, createContext } from 'react';

type YearContextProps = {
	year?: YearQuery['year'];
	isArchive: boolean;
	isHome: boolean;
};

const initialState: YearContextProps = {
	year: undefined,
	isHome: true,
	isArchive: false,
};

export const YearContext = createContext(initialState);

export type YearProviderProps = {
	children: React.ReactElement[];
	value: Pick<YearContextProps, 'year'>;
};

export const YearProvider = ({ children, value }: YearProviderProps) => {
	const pathname = usePathname();
	return (
		<YearContext.Provider
			value={{
				...initialState,
				...value,
				isArchive: value.year?.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR,
				isHome: locales.some((l) => pathname.startsWith(`/${l}`)) || pathname === '/',
			}}
		>
			{children}
		</YearContext.Provider>
	);
};

export const useYear = (): YearContextProps => {
	return useContext(YearContext);
};
