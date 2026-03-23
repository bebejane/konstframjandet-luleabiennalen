import { Article, PageHeader } from '@/components';
import { ContactDocument } from '@/graphql';
import { locales } from '@/i18n/routing';
import { PROJECT_ABBR } from '@/lib/constant';
import { apiQuery } from 'next-dato-utils/api';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export type Props = {
	contact: ContactQuery['contact'];
};

export default async function Contact({ params }: PageProps<'/[locale]/kontakt'>) {
	const { locale } = await params;
	if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);

	const { contact } = await apiQuery(ContactDocument, {
		variables: { locale: locale as SiteLocale },
	});
	if (!contact) return notFound();

	const t = await getTranslations('Menu');
	const { id, title, image, intro, content, _seoMetaTags } = contact;

	return (
		<>
			<PageHeader title={t('contact')} />
			<Article
				id={id}
				key={id}
				title={title}
				image={image as FileField}
				intro={intro}
				imageSize='small'
				content={content}
			/>
		</>
	);
}
