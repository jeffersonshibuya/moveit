import React from "react";
import { Provider } from 'next-auth/client'
import { UserProvider } from '../contexts/UserContext';

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
      <Provider session={pageProps.session}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </Provider>
    )
}

export default MyApp
