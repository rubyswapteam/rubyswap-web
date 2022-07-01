import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  buttonText?: string;
  route?: string;
}

const CollectionTitleHeader: React.FC<Props> = ({
  title,
  buttonText,
  route,
}): JSX.Element => {
  return (
    <div className="mt-2 bg-white py-5 px-4 sm:px-6 md:px-8">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          {buttonText && route && (
            <Link href={route} passHref>
              <a
                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm
              font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500"
              >
                {buttonText}
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionTitleHeader;
