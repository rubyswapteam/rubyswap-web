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
        <div className="w-full mx-auto bg-gray-900 rounded-lg md:rounded-md px-4 md:pl-8 md:pr-2 py-2 md:flex items-center justify-between">
          <div className="text-white md:max-w-xl">{props.message}</div>

          <div className="py-2 md:py-0 text-center">
            <a className="block md:inline-block px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 text-white">
              Read More &rarr;
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}
