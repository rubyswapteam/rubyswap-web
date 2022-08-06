import { Head, Html, Main, NextScript } from 'next/document';
import { useState, useEffect } from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://code.iconify.design/1/1.0.4/iconify.min.js">
          {' '}
        </script>
        <link href="/dist/output.css" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
