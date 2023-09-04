import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
          
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="apple-touch-icon" sizes="57x57" href="/icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />
          
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />

          <meta name="msapplication-TileImage" content="/icon-144x144.png"></meta>
          
          <link rel="manifest" href="manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
