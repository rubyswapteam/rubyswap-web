import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Props {
  message: string;
  route: string;
}

export default function CollectionAnnouncementBanner(props: Props) {
  return (
    <Link href={props.route} passHref>
      <div className="max-w-8xl mx-auto pb-4 px-4 sm:px-6 md:px-8 flex w-full text-sm cursor-pointer">
        <div className="w-full bg-white drop-shadow border-l-4 border-gray-800">
          <div className=""></div>
          <div className="mx-auto md:flex items-center justify-between">
            <div className="px-4 md:pl-8 md:pr-2 py-4">
              <div className="text-gray-900 font-medium md:max-w-xl">
                {props.message}
              </div>
            </div>
            <div className="p-2 md:py-0 text-center">
              <a className="block md:inline-block px-4 py-2 rounded-md hover:bg-gray-100 font-medium text-gray-900">
                Read More &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
