import type { NextApiRequest, NextApiResponse } from 'next'
import { allYears } from '/lib/utils';
import { translatePath } from '/lib/utils';

const generatePreviewUrl = async ({ item, itemType, locale }) => {

  let path = null;

  const { slug: baseSlug, year: yearId } = item.attributes
  const year = yearId ? (await allYears()).find(({ id }) => id === yearId) : undefined
  const yearSlug = year && year.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR ? `/${year.title}` : ''
  const localeSlug = locale !== 'sv' ? `/${locale}` : ''
  const slug = typeof baseSlug === 'object' ? baseSlug[locale] : baseSlug

  switch (itemType.attributes.api_key) {
    case 'start':
      path = `/`
      break;
    case 'about':
      path = `/om/${slug}`
      break;
    case 'program':
      path = `/program/${slug}`
      break;
    case 'participant':
      path = `/medverkande/${slug}`
      break;
    case 'news':
      path = `/nyheter/${slug}`
      break;
    case 'locations':
      path = `/platser/${slug}`
      break;
    case 'exhibitions':
      path = `/utstallningar/${slug}`
      break;
    case 'contact':
      path = `/kontakt`
      break;
    default:
      break;
  }

  return path ? translatePath(`${localeSlug}${yearSlug}${path}`, locale, 'sv', yearSlug !== '') : null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).send('ok');

  const url = await generatePreviewUrl(req.body);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  const previewLinks = !url ? [] : [{
    label: 'Live',
    url: `${baseUrl}${url}`
  }, {
    label: 'Utkast',
    url: `${baseUrl}/api/preview?slug=${url}&secret=${process.env.DATOCMS_PREVIEW_SECRET}`,
  }]

  console.log(previewLinks)
  return res.status(200).json({ previewLinks });
};




/*
export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {

  const body = await req.json();

  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Content-Type', 'application/json');

  // This will allow OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200 })
  }

  const url = generatePreviewUrl(body);
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.URL;
  const previewLinks = !url ? [] : [{
    label: 'Live',
    url: `${baseUrl}${url}`
  }, {
    label: 'Utkast',
    url: `${baseUrl}/api/preview?slug=${url}&secret=${process.env.DATOCMS_PREVIEW_SECRET}`,
  }]
  console.log(previewLinks)
  return new Response(JSON.stringify({ previewLinks }), { status: 200, headers: { 'content-type': 'application/json' } })
};

*/