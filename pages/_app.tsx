import '/lib/styles/index.scss'
import { Layout } from '/components';
import { PageProvider, usePage } from '/lib/context/page'
import { NextIntlProvider } from 'next-intl';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { sv, enGB } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions';
import { useRouter } from 'next/router';
import { locales, defaultLocale } from '/lib/utils';

setDefaultOptions({ locale: sv })

function onMessageError() { }
function getMessageFallback({ namespace, key, error }) { return '' }



function App({ Component, pageProps, router }) {

  setDefaultOptions({ locale: router.locale === 'sv' ? sv : enGB })
  const { asPath } = useRouter()
  const siteTitle = 'Luleåbiennalen'
  const isHome = asPath === '/' || locales.find(l => asPath === `/${l}`) !== undefined
  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = (!isNaN(errorCode) && (errorCode > 400 && errorCode < 600)) || router.pathname.replace('/', '') === '_error'

  if (isError) return <Component {...pageProps} />

  return (
    <>
      <DefaultDatoSEO siteTitle={siteTitle} />
      <NextIntlProvider messages={pageProps.messages} onError={onMessageError} getMessageFallback={getMessageFallback}>
        <PageProvider value={{ year: pageProps.year, title: siteTitle, isHome }}>
          <Layout title={siteTitle} menu={pageProps.menu || []} footer={pageProps.footer}>
            <Component {...pageProps} />
          </Layout>
        </PageProvider>
      </NextIntlProvider>
    </>
  );
}

export default App;
