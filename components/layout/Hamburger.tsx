import s from './Hamburger.module.scss'
import React, { useState, useEffect } from 'react'

export default function Hamburger() {

  return (
    <div className={s.hamburger}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}