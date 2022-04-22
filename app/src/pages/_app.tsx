import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Solana Application</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <AppBar/>
          <ContentContainer>
            <Component {...pageProps} />
          </ContentContainer>
          <Footer/>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;