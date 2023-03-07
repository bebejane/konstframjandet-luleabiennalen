import s from './Hamburger.module.scss'
import cn from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
import useStore from '/lib/store'

export default function Hamburger() {

  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [key, setKey] = useState(Math.random())
  const handleClick = (e) => {
    setShowMenu(!showMenu)
    setKey(Math.random())
    e.stopPropagation();
  }

  return (
    <div className={s.hamburger} onClick={handleClick}>
      <div className={s.wrap}>
        <div id="l1" key={`${key}-1`} className={cn(!showMenu ? s.opened : s.closed)}></div>
        <div id="l2" key={`${key}-2`} className={cn(!showMenu ? s.opened : s.closed)}></div>
        <div id="l3" key={`${key}-3`} className={cn(!showMenu ? s.opened : s.closed)}></div>
      </div>
    </div>
  )
}
