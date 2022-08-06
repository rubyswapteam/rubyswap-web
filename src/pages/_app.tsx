import SearchModal from '@/components/SearchModal';
import { MarketplaceProvider } from '@/contexts/MarketplaceProviderContext';
import { NftProvider } from '@/contexts/NftProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';
import { Web3Provider } from '@/contexts/Web3ProviderContext';
import { AppProps } from 'next/app';
import { useState } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

function App({ Component, pageProps }: AppProps) {
  const [searchModalState, setSearchModalState] = useState(false);

  return (
    <ThemeProvider attribute="class">
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
    </ThemeProvider>
  );
}

export default App;
