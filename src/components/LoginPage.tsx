import { useWeb3Provider } from '@/contexts/Web3ProviderContext';
import { trimHex } from '../utils/nftUtils';
import {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useState,
} from 'react';

export default function LoginPage({
  children,
}: {
  children: ReactElement<string | JSXElementConstructor<unknown>>;
}) {
  const { connectWallet, activeWallet } = useWeb3Provider();
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <>
      {isLoggedIn ? (
        <main>{children}</main>
      ) : (
        <div className="h-screen w-full justify-center self-center flex text-sm">
          <div className="m-auto border border-white/10 p-6 rounded-lg">
            <div className="bg-theme-gradient bg-cover w-min px-4 py-1 mb-2 rounded-md text-lg">
              Ruby
            </div>
            <div className="text-white/70 text-md py-3">
              Complete the steps below for early access:
            </div>
            <div className="flex w-full place-content-between gap-x-10 py-4">
              <div className="self-center font-medium">
                1. Connect your wallet
              </div>
              <button
                onClick={() => {
                  console.log('attempt');
                  connectWallet();
                }}
                disabled={activeWallet}
                className={
                  (activeWallet
                    ? ' border-white/10 bg-white/10 text-white'
                    : 'bg-white/90 hover:bg-white text-black') +
                  ' transition-all px-2 py-1 rounded-md w-24 '
                }
              >
                {activeWallet ? trimHex(activeWallet, 3) : 'Connect'}
              </button>
            </div>
            <div className="flex place-content-between gap-x-10 py-4">
              <div className="self-center font-medium">
                2. Verify your twitter account
              </div>
              <button className="transition-all bg-[white]/90 hover:bg-white px-2 py-1 rounded-md text-black w-24">
                Connect
              </button>
            </div>
            <div className="flex place-content-between gap-x-10 py-4">
              <div className="self-center font-medium">
                3. Follow @RubyAppXYZ on Twitter
              </div>
              <button className="transition-all bg-white/90 hover:bg-white px-2 py-1 rounded-md text-black w-24">
                Follow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
