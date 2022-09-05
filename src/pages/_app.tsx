import SearchModal from '@/components/SearchModal';
import { MarketplaceProvider } from '@/contexts/MarketplaceProviderContext';
import { NftProvider } from '@/contexts/NftProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';
import { Web3Provider } from '@/contexts/Web3ProviderContext';
import { AppProps } from 'next/app';
import { useState } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import mixpanel from 'mixpanel-browser';

function App({ Component, pageProps }: AppProps) {
  const [searchModalState, setSearchModalState] = useState(false);
  // Enabling the debug mode flag is useful during implementation,
  // but it's recommended you remove it for production
  mixpanel.init('015dee14470ae0f2af01b2fa9bb8391d', { debug: true });
  mixpanel.track('Website visit');
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
                <AnimatePresence mode="wait">
                  <Component
                    setSearchModalState={setSearchModalState}
                    {...pageProps}
                  />
                </AnimatePresence>
              </>
            </NftProvider>
          </MarketplaceProvider>
        </WalletProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
