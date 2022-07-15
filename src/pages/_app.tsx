import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NftProvider } from '@/contexts/NftProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';
import { Web3Provider } from '../contexts/Web3ProviderContext';
import { MarketplaceProvider } from '@/contexts/MarketplaceProviderContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <WalletProvider>
        <MarketplaceProvider>
          <NftProvider>
            <Component {...pageProps} />
          </NftProvider>
        </MarketplaceProvider>
      </WalletProvider>
    </Web3Provider>
  );
}

export default App;
