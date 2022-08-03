import Link from 'next/link';

interface Props {
  message: string;
  route: string;
}

function formatText(text: string) {
  if (!text) return '';
  let newText = text.split('\n').join('<br />');
  newText = convertBolds(newText);
  newText = convertTags(newText);
  console.log(newText);
  newText = convertUrl(newText);
  return newText;
}

function convertTags(text: string): string {
  return text.replace(
    /(\@everyone.*?)/gm,
    "<a class='font-semibold bg-[#DEE0FC] p-1 rounded-md'>@everyone</a>",
  );
}

function convertBolds(text: string) {
  const bold = /\*\*(.*?)\*\*/gm;
  const newText = text.replace(bold, "<a class='font-semibold'>$1</a>");
  return newText;
}

function convertUrl(text: string) {
  const alteredString = (str: string) => {
    return `<a class='font-semibold text-[#3366ff]' target='_blank' rel='noopener noreferrer'>${str}</a>`;
  };
  return text.replace(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm,
    alteredString,
  );
}

export default function CollectionAnnouncementBanner(props: Props) {
  return (
    <Link href={props.route} passHref>
      <div className="max-w-8xl mx-auto pb-4 px-4 sm:px-6 md:px-8 flex w-full text-sm cursor-pointer">
        <div className="w-full bg-white drop-shadow border-l-4 border-gray-800">
          <div className=""></div>
          <div className="mx-auto md:flex items-center justify-between">
            <div className="px-4 md:pl-8 md:pr-2 py-4">
              <div className="text-gray-900 mb-3 font-semibold md:max-w-xl">
                Latest Annoucement:
              </div>
              <div
                className="text-gray-900 font-medium md:max-w-xl"
                dangerouslySetInnerHTML={{ __html: formatText(props?.message) }}
              />
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
