import { useWeb3Provider } from '@/contexts/Web3ProviderContext';
import {
  JSXElementConstructor,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { trimHex } from '../utils/nftUtils';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export default function LoginPage({
  children,
}: {
  children: ReactElement<string | JSXElementConstructor<unknown>>;
}) {
  const { connectWallet, activeWallet } = useWeb3Provider();
  const [isLoading, setIsLoading] = useState(true);
  const provider = new TwitterAuthProvider();
  const [user, setUser] = useState<any>(undefined);
  const [isLinkClicked, setIsLinkClicked] = useState<any>(false);
  const [isVerified, setIsVerified] = useState<any>(false);
  const [creds, setCreds] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const firebaseConfig = {
    apiKey: 'AIzaSyA-uK2SkAp_sUjN0GQtImg6X93KU1o2xt8',
    authDomain: 'ruby-201bb.firebaseapp.com',
    projectId: 'ruby-201bb',
    storageBucket: 'ruby-201bb.appspot.com',
    messagingSenderId: '249432970633',
    appId: '1:249432970633:web:34245f7246b37f90bcfd58',
    measurementId: 'G-XZ1SSL5HHM',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  const auth = getAuth();
  function signInWithTwitter() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setCreds(TwitterAuthProvider.credentialFromResult(result));
      })
      .catch((error) => {
        console.table({
          errorCode: error?.code,
          errorMessage: error?.message,
          email: error.customData?.email,
          credential: TwitterAuthProvider.credentialFromError(error),
        });
      });
  }

  async function handleFollow(e: any, isClick = false) {
    e.preventDefault();
    if (!isLinkClicked || isClick) {
      setIsLinkClicked(true);
      window.open('https://twitter.com/RubyAppXYZ', '_blank')?.focus();
    } else {
      if (user?.reloadUserInfo?.screenName) {
        const res = await fetch(
          `/.netlify/functions/verifyTwitterFollow?name=${user?.reloadUserInfo?.screenName}&wallet=${activeWallet}`,
          {
            method: 'GET',
            redirect: 'follow',
          },
        );
        const resJson = await res.json();
        setIsVerified(resJson);
        if (resJson) {
          localStorage.setItem('rnftli', 'true');
        } else {
          setErrorMsg('Please follow the twitter page to continue.');
        }
      } else {
      }
    }
  }

  useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem('rnftli') == 'true') setIsVerified(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full justify-center self-center flex text-sm">
          <div className="m-auto">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : isVerified ? (
        <main>{children}</main>
      ) : (
        <div className="h-screen w-full justify-center self-center flex text-sm">
          <div className="m-auto border border-white/10 p-6 rounded-lg relative z-10">
            <div>
              <div className="bg-theme-gradient bg-cover w-min px-4 py-1 mb-2 rounded-md text-lg z-10">
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
                      ? 'border-white/10 bg-white/10 text-white'
                      : 'bg-white/90 hover:bg-white text-black') +
                    ' transition-all px-2 py-1 rounded-md w-24 '
                  }
                >
                  {activeWallet ? trimHex(activeWallet, 3) : 'Connect'}
                </button>
              </div>
              <div className="flex place-content-between gap-x-10 py-4">
                <div className="self-center font-medium">
                  2. Verify your Twitter
                </div>
                <button
                  disabled={!activeWallet}
                  onClick={signInWithTwitter}
                  className={
                    (!activeWallet
                      ? 'bg-white/40 text-black'
                      : user?.reloadUserInfo?.screenName
                      ? 'border-white/10 bg-white/10 text-white'
                      : 'bg-white/90 hover:bg-white text-black') +
                    ' transition-all px-2 py-1 rounded-md w-24 '
                  }
                >
                  {user?.reloadUserInfo?.screenName?.length > 8
                    ? user?.reloadUserInfo?.screenName?.substring(0, 8) + '...'
                    : user?.reloadUserInfo?.screenName || 'Connect'}
                </button>
              </div>
              <div className="flex place-content-between gap-x-10 py-4">
                <div className="self-center font-medium flex">
                  3. Follow
                  {
                    <a
                      onClick={(event) => handleFollow(event, true)}
                      className={
                        (errorMsg
                          ? 'animate-[pulse_2s_ease-in-out_infinite]'
                          : '') +
                        ' mx-1 px-1 bg-white/10 rounded-md cursor-pointer'
                      }
                    >
                      {'@RubyAppXYZ'}
                    </a>
                  }
                </div>
                {!activeWallet || !user?.reloadUserInfo?.screenName ? (
                  <button
                    disabled={true}
                    className="bg-white/40 text-black cursor-default transition-all text-center px-2 py-1 rounded-md w-24 "
                  >
                    Follow
                  </button>
                ) : isVerified ? (
                  <button
                    disabled={true}
                    className="border-white/10 bg-white/10 text-white transition-all text-center px-2 py-1 rounded-md w-24 "
                  >
                    Done
                  </button>
                ) : isLinkClicked ? (
                  <a
                    onClick={handleFollow}
                    className={
                      'bg-white/90 hover:bg-white text-black cursor-pointer transition-all text-center px-2 py-1 rounded-md w-24 '
                    }
                  >
                    Verify
                  </a>
                ) : (
                  <a
                    onClick={handleFollow}
                    className={
                      'bg-white/90 hover:bg-white text-black cursor-pointer transition-all text-center px-2 py-1 rounded-md w-24'
                    }
                  >
                    Follow
                  </a>
                )}
              </div>
              {errorMsg && (
                <p className="text-center my-3 text-green-300">{errorMsg}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
