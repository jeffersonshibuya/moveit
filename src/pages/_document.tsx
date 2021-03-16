import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <title>Move.it</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Não fique parado em frente ao computador por longas horas, se movimente. Essa é a proposta do Move.it" />
          <meta name="keywords" content="health, move, saúde, contador, haruo"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}