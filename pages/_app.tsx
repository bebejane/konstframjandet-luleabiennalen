import '/lib/styles/index.scss'
import { Layout } from '/components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sv } from 'date-fns/locale'

import setDefaultOptions from 'date-fns/setDefaultOptions';
setDefaultOptions({ locale: sv })

function App({ Component, pageProps }) {

  const router = useRouter()
  const { district } = pageProps
  const pageTitle = 'Luleåbiennalen'

  return (
    <>
      <Layout title={pageTitle} menu={[]} footer={[]}>
        <Component {...pageProps} />
      </Layout>

    </>
  );
}

export default App;
