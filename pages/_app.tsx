import '/lib/styles/index.scss'
import { Layout } from '/components';
import { PageProvider } from '/lib/context/page'
import { NextIntlProvider, IntlErrorCode } from 'next-intl';
import { useEffect } from 'react';
import { sv } from 'date-fns/locale'

import setDefaultOptions from 'date-fns/setDefaultOptions';
setDefaultOptions({ locale: sv })

function onMessageError() { }
function getMessageFallback({ namespace, key, error }) { return '' }

function App({ Component, pageProps, router }) {


  const title = 'Luleåbiennalen'
  const { year } = pageProps

  useEffect(() => {
    const isArchive = year.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR
    document.body.style.backgroundColor = isArchive ? 'var(--archive)' : 'var(--white)'
  }, [router.asPath])

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
