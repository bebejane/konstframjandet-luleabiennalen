import s from './Layout.module.scss'
import React, { useEffect, useState } from 'react'
import { Content, Footer, Logo, Grid, Menu, Language, FullscreenGallery, SearchResult } from '/components'
import type { MenuItem } from '/lib/menu'
import { buildMenu } from '/lib/menu'
import { useRouter } from 'next/router'
import { useStore } from '/lib/store'
import { usePage } from '/lib/context/page'
import { Image } from 'react-datocms'

export type LayoutProps = {
	children: React.ReactNode,
	menu: MenuItem[],
	footer: GeneralRecord
	title: string
}

export default function Layout({ children, menu: menuFromProps, footer, title }: LayoutProps) {

	const router = useRouter()
	const { year: { background }, isArchive } = usePage()
	const [menu, setMenu] = useState(menuFromProps)
	const [images, imageId, setImageId, searchQuery] = useStore((state) => [state.images, state.imageId, state.setImageId, state.searchQuery])

	useEffect(() => { // Refresh menu on load.
		buildMenu(router.locale).then(res => setMenu(res)).catch(err => console.error(err))
	}, [router.locale])

	if (!menuFromProps || !footer) return null

	const backgroundImage = background[0];

	return (
		<>
			{backgroundImage && !isArchive &&
				<div className={s.background}>
					<Image data={backgroundImage.responsiveImage} className={s.image} />
				</div>
			}
			<div className={s.layout}>
				<Content menu={menu}>
					{!searchQuery ? <>{children}</> : <SearchResult />}
				</Content>
			</div>
			<Menu items={menu} />
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