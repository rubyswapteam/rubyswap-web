import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NftProvider } from '@/contexts/NftProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <NftProvider>
        <Component {...pageProps} />
      </NftProvider>
    </WalletProvider>
  );
}

export default App;
