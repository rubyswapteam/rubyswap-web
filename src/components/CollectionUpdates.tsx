import { Transition } from '@headlessui/react';
import moment from 'moment';
import { useState } from 'react';

interface Props {
  updates: any;
  isLoading: boolean;
}

function formatText(text: string) {
  if (!text) return '';
  let newText = text.split('\n').join('<br />');
  newText = removeExcessLines(newText);
  newText = convertBolds(newText);
  newText = convertTags(newText);
  newText = convertUrls(newText);
  return newText;
}

function removeExcessLines(text: string) {
  return text
    .replace('<br /><br /><br />', '<br />')
    .replace('<br /><br /><br />', '<br />');
}

function convertTags(text: string) {
  return text.replace(
    /(\@everyone.*?)/gm,
    "<a class='font-semibold bg-[#DEE0FC] dark:bg-[#194add] p-1 rounded-md'>@everyone</a>",
  );
}

function convertBolds(text: string) {
  const bold = /\*\*(.*?)\*\*/gm;
  const newText = text.replace(bold, "<a class='font-semibold'>$1</a>");
  return newText;
}

function convertUrls(text: string) {
  const alteredString = (str: string) => {
    return `<a class='font-semibold text-[#3366ff]' target='_blank' rel='noopener noreferrer' href=${str}>${str}</a>`;
  };
  return text.replaceAll(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm,
    alteredString,
  );
}

export default function CollectionUpdates(props: Props) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-80">
      {/* <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
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
      </Switch.Group> */}
      {props.updates?.length > 1 &&
        props.updates.map((update: any) => (
          <Transition
            key={update.data.id}
            show={!enabled || update.data.holdersOnly}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-white dark:bg-white/5 dark:text-white drop-shadow-md rounded-lg text-sm overflow-hidden my-8">
              <div className="bg-white/[0.05] p-4">
                <div className="justify-between w-full flex mb-5">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full my-auto"
                      src={`https://cdn.discordapp.com/avatars/${update.data?.author?.id}/${update.data?.author?.avatar}.webp?size=160`}
                    />
                    <a className="text-sm font-medium text-transparent bg-clip-text bg-cover bg-theme-gradient mx-3">
                      {update.data?.author?.username}
                    </a>
                    <a className="text-sm font-medium text-gray-400">
                      {moment(update.data?.timestamp)
                        .local()
                        .startOf('seconds')
                        .fromNow()}
                    </a>
                  </div>
                </div>
                <div className="font-bold mb-3">{update.data?.title}</div>
                <div
                  className="leading-[175%]"
                  dangerouslySetInnerHTML={{
                    __html: formatText(update.data?.content),
                  }}
                ></div>
                {update.data?.embeds &&
                  update.data.embeds.map((embed: any, i: number) => {
                    if (embed?.type == 'rich')
                      return (
                        <div className="flex my-4">
                          <div className="w-1 bg-cover bg-theme-gradient bg-gray-900 flex"></div>
                          <a
                            className="bl-2 w-full max-w-md p-4 bg-gray-100 dark:bg-black rounded-r-md"
                            href={embed.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {embed.author && (
                              <div className="flex my-2">
                                <img
                                  className="rounded-full h-10 w-10"
                                  src={embed.author.proxy_icon_url}
                                />
                                <div className="ml-2 bl-2 pt-3 w-full rounded-md font-medium">
                                  {embed.author.name}
                                </div>
                              </div>
                            )}
                            {embed.description && (
                              <div className="bl-2 w-full my-2 rounded-md">
                                {embed.description}
                              </div>
                            )}
                            {embed.image && (
                              <img
                                className="rounded-md"
                                src={embed.image.proxy_url}
                              />
                            )}
                            {embed.thumbnail && (
                              <img
                                className="rounded-md"
                                src={embed.thumbnail.proxy_url}
                              />
                            )}
                            {embed.footer && (
                              <div className="flex my-2">
                                <img
                                  className="rounded-full h-5 w-5"
                                  src={embed.footer.proxy_icon_url}
                                />
                                <div className="ml-2 bl-2 pt-1 w-full bg-gray-100 dark:bg-black rounded-md font-medium text-sm">
                                  {embed.footer.text}
                                </div>
                              </div>
                            )}
                          </a>
                        </div>
                      );
                  })}
                <div className="mt-5">
                  <div className="py-2 px-2 rounded-md bg-gray-100 dark:bg-blackish self-center inline cursor-pointer hover:bg-gray-200">
                    {'👍'} {update.data.likes}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        ))}
    </div>
  );
}
