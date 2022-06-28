import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="/dist/output.css" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
