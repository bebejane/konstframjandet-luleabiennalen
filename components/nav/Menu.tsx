import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {

	const menuRef = useRef<HTMLDivElement | null>(null);
	const subRef = useRef<HTMLDivElement | null>(null);
	const menuBarRef = useRef<HTMLUListElement | null>(null);

	const router = useRouter()

	return (
		<nav id="menu" ref={menuRef} className={cn(s.menu)}>
			<ul
				className={s.nav}
				ref={menuBarRef}
			>
				<li>Menu</li>
			</ul>
		</nav>
	)
}
