import s from './FilterBar.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { sortSwedish } from 'dato-nextjs-utils/utils';

export type FilterOption = {
	id: string;
	label: string;
	description?: string;
};

export type Props = {
	options: FilterOption[];
	multi?: boolean;
	category: string;
	onChange: (value: string[] | string) => void;
};

export default function FilterBar({ options = [], onChange, multi = false, category }: Props) {
	const t = useTranslations('FilterBar');
	const [selected, setSelected] = useState<FilterOption[]>([]);

	useEffect(() => {
		onChange(multi ? selected.map(({ id }) => id) : selected[0]?.id);
	}, [selected]);

	return (
		<nav className={s.filter}>
			<ul>
				<li onClick={() => setSelected([])} className={cn(!selected?.length && s.selected)}>
					{t('all')}&nbsp; {category}
				</li>
				{sortSwedish(options, 'label').map((opt, idx) => (
					<li
						key={idx}
						className={cn(selected?.find(({ id }) => id === opt.id) && s.selected)}
						onClick={() =>
							setSelected(
								selected.find(({ id }) => id === opt.id)
									? selected.filter(({ id }) => id !== opt.id)
									: multi
									? [...selected, opt]
									: [opt]
							)
						}
					>
						{opt.label}
					</li>
				))}
			</ul>
			{!multi && selected && selected[0]?.description && (
				<div className={s.description}>{selected[0]?.description}</div>
			)}
		</nav>
	);
}
