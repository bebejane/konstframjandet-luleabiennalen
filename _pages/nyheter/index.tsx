import s from './page.module.scss';
import withGlobalProps from '@/lib/withGlobalProps';
import { AllNewsDocument } from '/graphql';
import Link from '@/components/nav/Link';
import { Markdown } from 'next-dato-utils/components';
import { useTranslations } from 'next-intl';
import { DatoSEO } from 'next-dato-utils/components';
import { pageSlugs } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/router';

export type Props = {
	news: (NewsRecord & ThumbnailImage)[];
};

export default function News({ news }: Props) {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<>
			<DatoSEO title={t('Menu.news')} />
			<section className={s.news}>
				<ul>
					{news.map(({ id, title, intro, _createdAt, slug }) => (
						<li key={id}>
							<h3 className='small'>{formatDate(_createdAt, null, locale, true)}</h3>
							<h1>{title}</h1>
							<div className='intro'>
								<Markdown className={s.intro}>{intro}</Markdown>
							</div>
							<Link href={`/nyheter/${slug}`} >
								<button>{t('General.readMore')}</button>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}

export const getStaticProps = withGlobalProps(
	{ queries: [AllNewsDocument] },
	async ({ props, revalidate }: any) => {
		return {
			props: {
				...props,
				page: {
					section: 'news',
					slugs: pageSlugs('news'),
				} as PageProps,
			},
			revalidate,
		};
	}
);
