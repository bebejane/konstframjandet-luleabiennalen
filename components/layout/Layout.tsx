import s from './Layout.module.scss'
import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { Content, Footer, Logo, Grid, Menu, Language } from '/components'
import type { MenuItem } from '/lib/menu'
import { buildMenu } from '/lib/menu'
import { useRouter } from 'next/router'

export type LayoutProps = {
	children: React.ReactNode,
	menu: MenuItem[],
	footer: GeneralRecord
	title: string
}

export default function Layout({ children, menu: menuFromProps, footer, title }: LayoutProps) {

	const router = useRouter()
	const [menu, setMenu] = useState(menuFromProps)

	useEffect(() => { // Refresh menu on load.
		buildMenu().then(res => setMenu(res)).catch(err => console.error(err))
	}, [])

	return (
		<>
			<div className={s.layout}>
				<Content menu={menu}>
					{children}
				</Content>
				<Menu items={menu} />
			</div>
			<Language />
			<Logo />
			<Footer menu={menu} footer={footer} />
			<Grid />
		</>
	)
}