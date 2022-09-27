import { useWeb3Provider } from '@/contexts/Web3ProviderContext';
import { useState } from 'react';
import { trimHex } from '../utils/nftUtils';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export default function LoginPhaseOneModal(props: any) {
  const { connectWallet, activeWallet } = useWeb3Provider();
  const provider = new TwitterAuthProvider();
  const [isLinkClicked, setIsLinkClicked] = useState<any>(false);
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
    if (!creds)
      signInWithPopup(auth, provider)
        .then((result) => {
          props.setTwtr(result.user);
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

  async function handleLinkClick(e: any, isClick = false) {
    e.preventDefault();
    setIsLinkClicked(true);
    window
      .open('https://twitter.com/intent/user?screen_name=RubyAppXYZ', '_blank')
      ?.focus();
  }

  async function handleFollow(e: any, isClick = false) {
    e.preventDefault();
    if (!isLinkClicked || isClick) {
      setIsLinkClicked(true);
      window
        .open(
          'https://twitter.com/intent/user?screen_name=RubyAppXYZ',
          '_blank',
        )
        ?.focus();
    } else {
      if (props?.twtr?.reloadUserInfo?.screenName) {
        const res = await fetch(
          `/.netlify/functions/verifyTwitterFollow?name=${props?.twtr?.reloadUserInfo?.screenName}&wallet=${activeWallet}`,
          {
            method: 'GET',
            redirect: 'follow',
          },
        );
        const resJson = await res.json();
        props.setIsVerified(resJson ? 'complete' : '');
        if (resJson) {
          localStorage.setItem('rnftli', 'true');
        } else {
          setErrorMsg('Please follow the twitter page to continue.');
        }
      } else {
      }
    }
  }

  return (
    <>
      <div className="text-white/70 text-md py-3">
        Complete the steps below for early access:
      </div>
      <div className="flex w-full place-content-between gap-x-10 py-4">
        <div className="self-center font-medium">1. Connect your wallet</div>
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
        <div className="self-center font-medium">2. Verify your Twitter</div>
        <button
          disabled={!activeWallet}
          onClick={signInWithTwitter}
          className={
            (!activeWallet
              ? 'bg-white/40 text-black'
              : props?.twtr?.reloadUserInfo?.screenName
              ? 'border-white/10 bg-white/10 text-white'
              : 'bg-white/90 hover:bg-white text-black') +
            ' transition-all px-2 py-1 rounded-md w-24 '
          }
        >
          {props?.twtr?.reloadUserInfo?.screenName?.length > 8
            ? props?.twtr?.reloadUserInfo?.screenName?.substring(0, 8) + '...'
            : props?.twtr?.reloadUserInfo?.screenName || 'Connect'}
        </button>
      </div>
      <div className="flex place-content-between gap-x-10 py-4">
        <div className="self-center font-medium flex">
          3. Follow
          {
            <a
              onClick={(event) => handleFollow(event, true)}
              className={
                (errorMsg ? 'animate-[pulse_2s_ease-in-out_infinite]' : '') +
                ' mx-1 px-1 bg-white/10 rounded-md cursor-pointer'
              }
            >
              {'@RubyAppXYZ'}
            </a>
          }
        </div>
        {!activeWallet || !props?.twtr?.reloadUserInfo?.screenName ? (
          <button
            disabled={true}
            className="bg-white/40 text-black cursor-default transition-all text-center px-2 py-1 rounded-md w-24 "
          >
            Follow
          </button>
        ) : (
          <a
            onClick={handleLinkClick}
            className={`${
              isLinkClicked
                ? 'border-white/10 bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/90 hover:bg-white text-black'
            } cursor-pointer transition-all text-center px-2 py-1 rounded-md w-24`}
          >
            Follow
          </a>
        )}
      </div>
      {isLinkClicked && (
        <div className="w-full flex">
          <a
            onClick={handleFollow}
            className={
              'mx-auto bg-white/90 hover:bg-white text-black cursor-pointer transition-all text-center px-8 py-1 rounded-md w-24 '
            }
          >
            Next
          </a>
        </div>
      )}
      {errorMsg && (
        <p className="text-center my-3 text-green-300">{errorMsg}</p>
      )}
    </>
  );
}
