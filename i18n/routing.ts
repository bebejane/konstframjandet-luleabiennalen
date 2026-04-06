import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const general = ['/kontakt', '/nyheter', '/arkiv', '/sok'];
export const locales = ['sv', 'en'];
export const defaultLocale = 'sv';
export const localePrefix = 'as-needed';
export const routing = defineRouting({
	locales,
	localePrefix,
	defaultLocale,
	localeDetection: false,
	pathnames: {
		'/': {
			en: '/',
		},
		'/medverkande': {
			en: '/participants',
		},
		'/medverkande/[participant]': {
			en: '/participants/[participant]',
		},
		'/om': {
			en: '/about',
		},
		'/om/[about]': {
			en: '/about/[about]',
		},
		'/partners': {
			en: '/partners',
		},
		'/partners/[partner]': {
			en: '/partners/[partner]',
		},
		'/platser/[location]': {
			en: '/locations/[location]',
		},
		'/program': {
			en: '/program',
		},
		'/program/[program]': {
			en: '/program/[program]',
		},
		'/utstallningar': {
			en: '/exhibitions',
		},
		'/utstallningar/[exhibition]': {
			en: '/exhibitions/[exhibition]',
		},
		'/arkiv': {
			en: '/archive',
		},
		'/kontakt': {
			en: '/contact',
		},
		'/nyheter': {
			en: '/news',
		},
		'/nyheter/[news]': {
			en: '/news/[news]',
		},
		'/sok': {
			en: '/search',
		},
		'/[year]': {
			en: '/[year]',
		},
		'/[year]/medverkande': {
			en: '/[year]/participants',
		},
		'/[year]/medverkande/[participant]': {
			en: '/[year]/participants/[participant]',
		},
		'/[year]/om': {
			en: '/[year]/about',
		},
		'/[year]/om/[about]': {
			en: '/[year]/about/[about]',
		},
		'/[year]/partners': {
			en: '/[year]/partners',
		},
		'/[year]/partners/[partner]': {
			en: '/[year]/partners/[partner]',
		},
		'/[year]/platser/[location]': {
			en: '/[year]/locations/[location]',
		},
		'/[year]/program': {
			en: '/[year]/program',
		},
		'/[year]/program/[program]': {
			en: '/[year]/program/[program]',
		},
		'/[year]/utstallningar': {
			en: '/[year]/exhibitions',
		},
		'/[year]/utstallningar/[exhibition]': {
			en: '/[year]/exhibitions/[exhibition]',
		},
	},
});

export function exists(pathname: string) {
	const keys = Object.keys(routing.pathnames)
		//@ts-ignore
		.map((k) => [k, routing.pathnames[k].en])
		.flat();
	return keys.includes(pathname);
}

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
