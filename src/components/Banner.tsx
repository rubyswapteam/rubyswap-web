import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#BD0B00] to-[#92124F]">
      <div className="max-w-8xl mx-auto py-3 px-3 sm:px-6">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <p className="font-medium text-white truncate">
              <span>
                Check if you're eligible for the airdrop. Terms and conditions
                apply.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link href={'/airdrop'} passHref>
              <a
                className="flex items-center justify-center px-4 py-2
              text-sm font-medium text-white hover:bg-white hover:rounded-md hover:text-[#BD0B00]"
              >
                Learn more
              </a>
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-white focus:outline-none focus:ring-2
              focus:ring-white sm:-mr-2 text-white hover:text-[#BD0B00]"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
