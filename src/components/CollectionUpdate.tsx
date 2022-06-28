import React, { useState } from 'react';
import { INftCollectionUpdate } from '../utils/nftUtils';
import { Switch } from '@headlessui/react';

interface Props {
  collectionUpdates: INftCollectionUpdate[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CollectionUpdate(props: Props) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <Switch.Group as="div" className="flex items-center m-5">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">Holder Only</span>
        </Switch.Label>
      </Switch.Group>
      {props.collectionUpdates.map((update: INftCollectionUpdate) => (
        <div
          className="border border-gray-200 p-4 m-5 rounded-lg"
          key={update.id}
        >
          <div className="justify-between w-full flex mb-5">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full my-auto"
                src={update.smallImageUrl}
              />
              <a className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-800 mx-3">
                {update.username || update.userAddress}
              </a>
              <a className="text-sm font-medium text-gray-400">
                {update.posted}
              </a>
            </div>
            <div className="py-0.5 px-2 rounded-md bg-gray-100 self-center">
              {update.updateType}
            </div>
          </div>
          <div className="font-bold mb-3">{update.title}</div>
          <div dangerouslySetInnerHTML={{ __html: update.message }}></div>
          <div className="mt-5">
            <div className="py-2 px-2 rounded-md bg-gray-100 self-center inline cursor-pointer hover:bg-gray-200">
              {'👍'} {update.likes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
