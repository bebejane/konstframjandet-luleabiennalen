import '/lib/styles/index.scss'
import { Layout } from '/components';
import { PageProvider, usePage } from '/lib/context/page'
import { NextIntlProvider, IntlErrorCode } from 'next-intl';
import { useEffect } from 'react';
import { sv, enGB } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions';

setDefaultOptions({ locale: sv })

function onMessageError() { }
function getMessageFallback({ namespace, key, error }) { return '' }

function App({ Component, pageProps, router, statusCode }) {

  const title = 'Luleåbiennalen'
  const { isArchive } = usePage()

  setDefaultOptions({ locale: router.locale === 'sv' ? sv : enGB })

  useEffect(() => {
    document.body.style.backgroundColor = isArchive ? 'var(--archive)' : 'var(--white)'
  }, [router.asPath, isArchive])


  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = (!isNaN(errorCode) && (errorCode > 400 && errorCode < 600)) || router.pathname.replace('/', '') === '_error'
  if (isError) return <Component {...pageProps} />

  return (
    <>
      <NextIntlProvider messages={pageProps.messages} onError={onMessageError} getMessageFallback={getMessageFallback}>
        <PageProvider value={{ year: pageProps.year, title }}>
          <Layout title={title} menu={pageProps.menu || []} footer={pageProps.footer}>
            <Component {...pageProps} />
          </Layout>
        </PageProvider>
      </NextIntlProvider>
    </>
  );
}

export default App;
