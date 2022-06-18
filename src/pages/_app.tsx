import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NftProvider } from '@/contexts/NftProviderContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <NftProvider>
      <Component {...pageProps} />
    </NftProvider>
  );
}

export default App;
