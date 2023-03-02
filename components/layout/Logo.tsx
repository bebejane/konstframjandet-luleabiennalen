import s from './Logo.module.scss'
import cn from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import LogoIcon from '/public/images/logo.svg'
export type Props = {

}


export default function Logo({ }: Props) {

  const router = useRouter()
  return (
    <div className={cn(s.container)}>
      <LogoIcon />
    </div>
  )
}