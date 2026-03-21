import {format} from 'date-fns';
import { sv, enGB as en } from 'date-fns/locale';
import { useLocale } from 'next-intl';

export type DateProps = {
	date: string;
};

export default function DateTime({ date }: DateProps) {
	const locale = useLocale();
	const f = locale === 'sv' ? 'd MMMM, yyyy' : 'MMMM d yyyy';
	const d = format(new Date(date), f, { locale: locale === 'sv' ? sv : en });
	return <>{d}</>;
}
