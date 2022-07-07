import { Transition } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';

export default function Index() {
  const baseUrl = 'https://rubyappxyz.s3.eu-west-2.amazonaws.com/';
  const images = ['collections', 'overview', 'listings'];
  const count = useRef(-2);
  const [image, setImage] = useState('');

  useEffect(() => {
    count.current = (count.current + 1) % 3;
    setImage(images[count.current]);
    const interval = setInterval(() => {
      count.current = (count.current + 1) % 3;
      setImage(images[count.current]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center flex flex-col items-center justify-center h-screen">
      {/* <div className="text-lg font-bold text-transparent bg-clip-text bg-cover bg-theme-gradient mb-5"> */}
      {count.current < 0 && (
        <div className="flex-row flex items-center justify-center mb-8 px-3 py-2 rounded-lg">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <Transition
        show={count.current >= 0}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="flex-col justify-center items-center"
      >
        <>
          <div className="flex-row flex items-center justify-center mb-8 px-3 py-2 rounded-lg">
            <div className="text-base font-bold text-transparent bg-clip-text bg-cover bg-theme-gradient pt-1">
              Ruby
            </div>
            <img
              className="h-5 w-5"
              src="https://rubyappxyz.s3.eu-west-2.amazonaws.com/verifiedBadge.svg"
            />
            <div className="text-lg h-8 border-l border-gray-200 mx-3"></div>
            <div className="text-base pt-1">{'Coming Soon'}</div>
          </div>
          <div className="w-full mx-auto justify-center text-center items-center flex">
            <img
              className="w-4/5 md:w-2/3 lg:w-1/2 mx-5 drop-shadow-lg animate-float aspect-auto justify-center items-center"
              src={baseUrl + image + '.png'}
            />
          </div>
        </>
      </Transition>
    </div>
  );
}
