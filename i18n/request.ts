import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
	const locale = (await requestLocale) ?? (routing.defaultLocale as SiteLocale);
	if (!routing.locales.includes(locale as any)) notFound();
	const messages: any = (await import(`./${locale}.json`)).default;
	// let messages = (await import(`./i18n/${context.locale}.json`)).default
	//     if (year.participantName) {
	//       // Custom translation for participants
	//       messages.Menu.participants = year.participantName
	//       messages.BackButton.showAllParticipants = `${messages.BackButton.showAll} ${year.participantName.toLowerCase()}`
	//     }
	return {
		locale,
		messages,
	};
});
