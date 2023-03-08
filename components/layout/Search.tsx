import s from "./Search.module.scss";
import { CardContainer, Card, Thumbnail, Loader } from "/components";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Image } from "react-datocms";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import useStore from "/lib/store";
import { useRouter } from "next/router";

export type Props = {

}

export default function SearchResult({ }: Props) {

  const router = useRouter()
  const [query, setSearchQuery] = useStore((state) => [state.searchQuery, state.setSearchQuery])
  const [results, setResults] = useState<any | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const searchTimeout = useRef<NodeJS.Timer | null>(null)

  const siteSearch = (q) => {
    const variables = {
      type: 'site',
      q: q ? `${q.split(' ').filter(el => el).join('|')}` : undefined
    };

    if (!Object.keys(variables).filter(k => variables[k] !== undefined).length)
      return

    setError(undefined)
    setResults(undefined)
    setLoading(true)

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
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => siteSearch(query), 250)
  }, [query])

  useEffect(() => {
    const handleRouteChangeStart = (path: string) => setSearchQuery(undefined)
    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => router.events.off('routeChangeStart', handleRouteChangeStart)
  }, [])

  if (!query) return null

  return (
    <div className={s.container}>
      <h1>Search</h1>
      {query &&
        <div className={s.results}>
          <header>
            <nav>Sökresultat: &quot;{query}&quot;</nav>
          </header>
          <div className={s.matches}>
            {results && Object.keys(results).length > 0 ?
              Object.keys(results).map((type, idx) =>
                <ul key={idx}>
                  {results[type]?.map(({ category, title, text, image, slug }, i) =>
                    <li key={i}>
                      <div className={s.text}>
                        <h5>{category}</h5>
                        <h4>
                          <Link href={slug}>{title}</Link>
                        </h4>
                        <Markdown>{text}</Markdown>
                      </div>
                    </li>
                  )}
                </ul>
              )
              :
              loading ?
                <div className={s.loader}>
                  <Loader />
                </div>
                : <>Inga träffar för: &quot;{query}&quot;</>
            }
            {error &&
              <div className={s.error}>
                <p>
                  {typeof error === 'string' ? error : error.message}
                </p>
                <button onClick={() => setError(undefined)}>Stäng</button>
              </div>
            }
          </div>
        </div>
      }
    </div>
  );
}
