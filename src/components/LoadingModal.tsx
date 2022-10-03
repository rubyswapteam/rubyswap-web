/* This example requires Tailwind CSS v2.0+ */
import { useModalProvider } from '@/contexts/ModalContext';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

// interface Props {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<string | undefined>>;
// }

// export default function LoadingModal(props: Props) {
export default function LoadingModal() {
  const router = useRouter();
  const { loadingData, loadingRoute, setLoadingRoute } = useModalProvider();

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoadingRoute(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoadingRoute(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <>
      {(loadingRoute || loadingData) && (
        <Transition.Root show={loadingRoute || loadingData} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => {
              return;
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
                    <div className="page loader">
                      <div className="inner one animate-rotate-one"></div>
                      <div className="inner two animate-rotate-two"></div>
                      <div className="inner three animate-rotate-three"></div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
