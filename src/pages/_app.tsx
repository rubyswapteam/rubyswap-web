import SearchModal from '@/components/SearchModal';
import { MarketplaceProvider } from '@/contexts/MarketplaceProviderContext';
import { NftProvider } from '@/contexts/NftProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';
import { Web3Provider } from '@/contexts/Web3ProviderContext';
import { AppProps } from 'next/app';
import { useState } from 'react';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [searchModalState, setSearchModalState] = useState(false);

  return (
    <Web3Provider>
      <WalletProvider>
        <MarketplaceProvider>
          <NftProvider>
            <>
              <SearchModal
                open={searchModalState}
                setOpen={setSearchModalState}
              />
              <Component
                setSearchModalState={setSearchModalState}
                {...pageProps}
              />
            </>
          </NftProvider>
        </MarketplaceProvider>
      </WalletProvider>
    </Web3Provider>
  );
}

export default App;
