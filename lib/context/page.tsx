'use client';

import { useContext, createContext } from 'react';

type PageContextProps = {
	year: YearExtendedRecord | undefined;
	title: string | undefined;
	isHome: boolean;
};

const initialState: PageContextProps = {
	year: undefined,
	title: undefined,
	isHome: false,
};

export const PageContext = createContext(initialState);

export type PageProviderProps = {
	children: React.ReactElement;
	value: PageContextProps;
};

// Context provider
export const PageProvider = ({ children, value }: PageProviderProps) => {
	return (
		<PageContext.Provider
			value={{
				...initialState,
				...value,
			}}
		>
			{children}
		</PageContext.Provider>
	);
};
// usePage hook
export const usePage = (): PageContextProps => {
	return useContext(PageContext);
};
