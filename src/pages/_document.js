import { Html, Head, Main, NextScript } from 'next/document';
import Page from '../../components/Page';

export default function Document() {
  return (
    <Html>
      <Page title="Inicio" description="teste">
        <body>
          <Main />
          <NextScript />
        </body>
      </Page>
    </Html>
  )
}
