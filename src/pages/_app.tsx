import { MarketplaceProvider } from '@/contexts/MarketplaceProviderContext';
import { NftProvider } from '@/contexts/NftProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';
import { Web3Provider } from '@/contexts/Web3ProviderContext';
import { AppProps } from 'next/app';
import '../styles/globals.css';

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
