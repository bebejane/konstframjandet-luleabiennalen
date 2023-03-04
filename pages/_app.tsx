import '/lib/styles/index.scss'
import { Layout } from '/components';
import { NextIntlProvider } from 'next-intl';
import { sv } from 'date-fns/locale'

import setDefaultOptions from 'date-fns/setDefaultOptions';
setDefaultOptions({ locale: sv })

function App({ Component, pageProps }) {

  const { menu, footer } = pageProps
  const pageTitle = 'Luleåbiennalen'

  return (
    <>
      <NextIntlProvider messages={pageProps.messages}>
        <Layout title={pageTitle} menu={menu || []} footer={footer}>
          <Component {...pageProps} />
        </Layout>
      </NextIntlProvider>
    </>
  );
}

export default App;
