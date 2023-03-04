import s from './Layout.module.scss'
import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { Content, Footer, Logo, Grid, Menu, Language, FullscreenGallery } from '/components'
import type { MenuItem } from '/lib/menu'
import { buildMenu } from '/lib/menu'
import { useRouter } from 'next/router'
import { useStore } from '/lib/store'

export type LayoutProps = {
	children: React.ReactNode,
	menu: MenuItem[],
	footer: GeneralRecord
	title: string
}

export default function Layout({ children, menu: menuFromProps, footer, title }: LayoutProps) {

	const router = useRouter()
	const [menu, setMenu] = useState(menuFromProps)
	const [images, imageId, setImageId] = useStore((state) => [state.images, state.imageId, state.setImageId, state.showMenu])

	useEffect(() => { // Refresh menu on load.
		buildMenu(router.locale).then(res => setMenu(res)).catch(err => console.error(err))
	}, [router.locale])

	if (!menuFromProps || !footer) return null

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
			<FullscreenGallery
				index={images?.findIndex((image) => image?.id === imageId)}
				images={images}
				show={imageId !== undefined}
				onClose={() => setImageId(undefined)}
			/>
			<Grid />
		</>
	)
}