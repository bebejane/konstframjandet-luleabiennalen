import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { sv, enGB as en } from 'date-fns/locale';
import setDefaultOptions from 'date-fns/setDefaultOptions';

export type DateProps = {
	date: string;
};
export default function DateTime({ date }: DateProps) {
	const { locale } = useRouter();
	const f = locale === 'sv' ? 'd MMMM, yyyy' : 'MMMM d yyyy';
	const d = format(new Date(date), f, { locale: locale === 'sv' ? sv : en });
	return <>{d}</>;
}
