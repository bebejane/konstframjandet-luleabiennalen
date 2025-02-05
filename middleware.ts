import { NextRequest, NextResponse } from "next/server";
import { parseAcceptLanguage } from 'intl-parse-accept-language';
import { locales, defaultLocale } from './next.config.mjs';

export function middleware(request: NextRequest) {
  return NextResponse.next()
  const { pathname } = request.nextUrl
  const locale = request.cookies.get('locale')
  const l = request.nextUrl.searchParams.get('locale')

  if (l) {
    request.nextUrl.searchParams.delete('locale')
    request.cookies.set('locale', l)
    return NextResponse.next()
  }
  if (pathname === '/') {
    const language = parseAcceptLanguage(request.headers.get('accept-language'))
    const country = locale ?? language.find(l => locales.includes(l))
    let response = null

    if (country !== defaultLocale && request.nextUrl.locale !== country) {
      request.nextUrl.pathname = `/${country}`
      response = NextResponse.redirect(request.nextUrl)
    }
    else {
      response = NextResponse.next()
    }
    return response
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    //'/((?!api|_next|_vercel|favicon.ico|sitemap.xml|manifest.webmanifest|robots.txt|.*\\..*).*)',
    // Optional: Only run on root (/) URL
    '/'
  ],
}