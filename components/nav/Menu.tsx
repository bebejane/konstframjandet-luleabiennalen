import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const menuRef = useRef<HTMLDivElement | null>(null);
	const menuBarRef = useRef<HTMLUListElement | null>(null);
	const [selected, setSelected] = useState<string | undefined>()

	const router = useRouter()
	console.log(items)

	return (
		<nav id="menu" ref={menuRef} className={cn(s.menu)}>
			<div className={s.wrapper}>
				<ul className={s.nav} ref={menuBarRef}>
					{items.map(({ label, slug, sub }, idx) =>
						<li key={idx} onClick={() => setSelected(label === selected ? undefined : label)}>
							{!slug ? label : <Link href={slug}>{label}</Link>}
							{sub &&
								<ul
									className={cn(s.sub, selected === label && s.selected)}
									onClick={(e) => e.stopPropagation()}
								>
									{sub.map(({ label, slug }) =>
										<li>
											<Link href={slug}>{label}</Link>
										</li>
									)}
								</ul>
							}
						</li>
					)}
					<li>Sök</li>
				</ul>
			</div>
		</nav>
	)
}
