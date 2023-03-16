import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { Loader } from "/components";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import useStore from "/lib/store";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export type Props = {
  query?: string
}

export default function Search({ query }: Props) {

  const router = useRouter()
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useStore((state) => [state.searchQuery, state.setSearchQuery])
  const [results, setResults] = useState<any | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const searchTimeout = useRef<NodeJS.Timer | null>(null)

  const siteSearch = (q) => {
    const variables = {
      q: q ? `${q.split(' ').filter(el => el).join('|')}` : undefined
    };

    if (!Object.keys(variables).filter(k => variables[k] !== undefined).length)
      return setLoading(false)

    fetch('/api/search', {
      body: JSON.stringify(variables),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (res) => {
        const results = await res.json()
        if (res.status === 200) {
          setResults(results)
        } else
          setError(new Error('error in search'))
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setResults(undefined)
    setLoading(true)
    setError(undefined)
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => siteSearch(searchQuery), 250)
  }, [searchQuery])

  useEffect(() => {
    const handleRouteChangeStart = (path: string) => setSearchQuery(undefined)
    router.events.on('routeChangeComplete', handleRouteChangeStart)
    return () => router.events.off('routeChangeComplete', handleRouteChangeStart)
  }, [])

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  return (
    <div className={cn(s.container)}>
      <div className={cn(s.search)}>
        <input
          placeholder={t('Menu.search')}
          value={searchQuery || ''}
          onChange={({ target: { value } }) => setSearchQuery(value)}
        />
      </div>
      {results && Object.keys(results).length > 0 ?
        <>
          <h2>{t('Search.searcResults')}</h2>
          {Object.keys(results).map((type, idx) =>
            <ul key={idx}>
              <li><h3>{results[type][0].category}</h3></li>
              {results[type]?.map(({ category, title, text, image, slug }, i) =>
                <li key={i}>
                  <h1>
                    <Link href={slug}>{title}</Link>
                  </h1>
                  <div className={s.intro}>
                    <Markdown>{text}</Markdown>
                  </div>
                  <Link href={slug}><button>{t('General.readMore')}</button></Link>
                </li>
              )}
            </ul>
          )}
        </>
        :
        loading ?
          <div className={s.loading}><Loader /></div>
          :
          results && <p className={cn(s.nohits, "small")}>{t('Search.noHitsFor')}: &quot;{searchQuery}&quot;</p>
      }
      {error &&
        <div className={s.error}>
          <p>
            {typeof error === 'string' ? error : error.message}
          </p>
        </div>
      }
    </div >

  );
}


export const getServerSideProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  return {
    props: {
      ...props,
      query: context.query.q || null
    }
  };
});