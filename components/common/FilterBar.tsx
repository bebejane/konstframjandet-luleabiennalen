import { AppPathnames, Link } from '@/i18n/routing';
import s from './FilterBar.module.scss';
import cn from 'classnames';
import { sortSwedish } from 'next-dato-utils/utils';
import { getTranslations } from 'next-intl/server';

export type FilterOption = {
	title?: string | null;
	description?: string | null;
};

export type Props = {
	options: FilterOption[];
	category: string;
	pathname: any;
	name: string;
	value: string;
	params: any;
};

export default async function FilterBar({
	options = [],
	category,
	pathname,
	name,
	value,
	params,
}: Props) {
	const t = await getTranslations('FilterBar');

	return (
		<nav className={s.filter}>
			<ul>
				<li className={cn(!value && s.selected)}>
					<Link
						href={{
							pathname,
							query: { ...params, [name]: null },
						}}
					>
						{t('all')}&nbsp; {category}
					</Link>
				</li>
				{sortSwedish(options, 'label').map(({ title, description }, idx) => (
					<li key={idx} className={cn(value === title && s.selected)}>
						<Link
							href={{
								pathname,
								query: { ...params, [name]: title },
							}}
						>
							{title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
