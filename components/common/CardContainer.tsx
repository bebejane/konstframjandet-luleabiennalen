'use client';

import s from './CardContainer.module.scss';
import cn from 'classnames';
import useDevice from '@/lib/hooks/useDevice';
import React, { Children, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { chunkArray } from 'next-dato-utils/utils';

export type Props = {
	children?: React.ReactNode | React.ReactNode[];
	columns?: 2 | 3;
	className?: string;
};

export default function CardContainer({ children, columns = 3, className }: Props) {
	const ref = useRef<HTMLUListElement | null>(null);
	const { isDesktop } = useDevice();
	const [cards, setCards] = useState(buildCards());
	const locale = useLocale();

	function buildCards() {
		return chunkArray(Children.toArray(children), !isDesktop ? 2 : columns);
	}

	useEffect(() => {
		setCards(buildCards());
	}, [isDesktop, locale]);

	return (
		<ul ref={ref} className={cn(s.container, s[`col${columns}`], className)}>
			{cards.map((row, idx) => {
				return <React.Fragment key={idx}>{row.map((el) => el)}</React.Fragment>;
			})}
		</ul>
	);
}
