import { Html, Head, Main, NextScript } from 'next/document';
import Page from '../../components/Page';

export default function Document() {
  return (
    <Html>
      {/* <Page title="Inicio" description="teste"> */}
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      {/* </Page> */}
    </Html>
  )
}
