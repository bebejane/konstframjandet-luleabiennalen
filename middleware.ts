import { NextRequest, NextResponse } from "next/server";
import { parseAcceptLanguage } from 'intl-parse-accept-language';
import { locales, defaultLocale } from './next.config.mjs';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const language = parseAcceptLanguage(request.headers.get('accept-language'))
    const country = language.find(l => locales.includes(l))

    if (country !== defaultLocale && request.nextUrl.locale !== country) {
      request.nextUrl.pathname = `/${country}`
      return NextResponse.redirect(request.nextUrl)
    }
    else
      return NextResponse.next()
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