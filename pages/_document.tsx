import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const { year }: { year: YearRecord } = this.props?.__NEXT_DATA__?.props?.pageProps || {};
    const isArchive = year && year?.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR

    return (
      <Html>
        <Head />
        <body style={{ backgroundColor: isArchive ? 'var(--archive)' : 'var(--white)' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}