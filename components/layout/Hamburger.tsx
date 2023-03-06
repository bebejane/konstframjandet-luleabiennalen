import s from './Hamburger.module.scss'
import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import useStore from '/lib/store'

export default function Hamburger() {

  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])

  return (
    <div className={s.hamburger} onClick={() => setShowMenu(!showMenu)}>
      <div className={s.wrap}>
        <div className={cn(!showMenu && s.close)}></div>
        <div className={cn(!showMenu && s.close)}></div>
        <div className={cn(!showMenu && s.close)}></div>
      </div>
    </div>
  )
}