import SearchModal from '@/components/SearchModal';
import { MarketplaceProvider } from '@/contexts/MarketplaceProviderContext';
import { WalletProvider } from '@/contexts/WalletProviderContext';
import { Web3Provider } from '@/contexts/Web3ProviderContext';
import { AppProps } from 'next/app';
import { useState } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import mixpanel from 'mixpanel-browser';
import LoginPage from '@/components/LoginPage';
import ModalSelector from '@/components/ModalSelector';
import LoadingModal from '../components/LoadingModal';
import { ModalProvider } from '../contexts/ModalContext';

function App({ Component, pageProps }: AppProps) {
  // Enabling the debug mode flag is useful during implementation,
  // but it's recommended you remove it for production
  mixpanel.init('015dee14470ae0f2af01b2fa9bb8391d', { debug: true });
  mixpanel.track('Website visit');

  return (
    <>
      <div className="hidden lg:block">
        <ThemeProvider attribute="class">
          <Web3Provider>
            <MarketplaceProvider>
              <WalletProvider>
                <ModalProvider>
                  <LoginPage>
                    <>
                      <LoadingModal />
                      <ModalSelector />
                      <AnimatePresence mode="wait">
                        <Component />
                      </AnimatePresence>
                    </>
                  </LoginPage>
                </ModalProvider>
              </WalletProvider>
            </MarketplaceProvider>
          </Web3Provider>
        </ThemeProvider>
      </div>
      <div className="flex lg:hidden w-screen h-screen bg-black">
        <div className="justify-center self-center mx-auto">
          <div className="m-auto text-white text-center px-5 bg-theme-gradient bg-cover rounded-md w-min mb-2">
            Ruby
          </div>
          <div className="m-auto text-white text-center px-5">
            Please open on desktop for an optimal experience.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
