import '/lib/styles/index.scss'
import { Layout } from '/components';
import { PageProvider, usePage } from '/lib/context/page'
import { NextIntlProvider } from 'next-intl';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { useEffect } from 'react';
import { sv, enGB } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions';

setDefaultOptions({ locale: sv })

function onMessageError() { }
function getMessageFallback({ namespace, key, error }) { return '' }

function App({ Component, pageProps, router }) {

  const title = 'Luleåbiennalen'
  setDefaultOptions({ locale: router.locale === 'sv' ? sv : enGB })

  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = (!isNaN(errorCode) && (errorCode > 400 && errorCode < 600)) || router.pathname.replace('/', '') === '_error'
  if (isError) return <Component {...pageProps} />

  return (
    <>
      <DefaultDatoSEO siteTitle={'Luleåbienallen'} />
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
