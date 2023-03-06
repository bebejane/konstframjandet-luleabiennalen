import s from './Logo.module.scss'
import cn from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import LogoIcon from '/public/images/logo.svg'
import { usePage } from '/lib/context/page'

export type Props = {

}

export default function Logo({ }: Props) {

  const { year: { color: { red, green, blue } } } = usePage()
  const color = `rgb(${red},${green},${blue})`

  return (
    <div className={s.container} style={{ fill: color }}>
      <LogoIcon />
    </div>
  )
}