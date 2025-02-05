import s from "./Language.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalize } from "/lib/utils";
import { usePage } from "/lib/context/page";
import { Menu } from "/lib/menu";
import { locales } from "/lib/i18n";
import classNames from "classnames";

export type Props = {
	menu: Menu;
	className?: string;
};

export default function Language({ menu, className }: Props) {
	const { locale } = useRouter();
	const { slugs } = usePage();

	if (locales.length <= 1) return null;

	return (
		<nav className={cn(s.language, className)}>
			{slugs.map((item, idx) => (
				<Link
					key={idx}
					href={item.value}
					//href={`${item.value}?locale=${item.locale}`}
					locale={item.locale}
					className={cn(locale === item.locale && s.selected)}
				>
					{capitalize(item.locale)}
				</Link>
			))}
		</nav>
	);
}
