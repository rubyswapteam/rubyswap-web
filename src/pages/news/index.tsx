import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function News(props: any) {
  const router = useRouter();
  const { tab } = router.query;
  const [dailyRalphas, setDailyRalphas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let collection: any = {};
      try {
        collection = await (
          await fetch(
            '/.netlify/functions/getDbCollectionUpdatesByContract?contract=dailyRalpha',
            {
              method: 'GET',
              redirect: 'follow',
            },
          )
        )
          .json()
          .then((res) => {
            res = res.map((item: any) => {
              console.table({ item: item });
              const data = JSON.parse(item.data);
              data.formatted = JSON.parse(data.formatted);
              const newRes = { ...item, ...{ data: data } };
              console.table({ item: item, newRes: newRes });
              return newRes;
            });
            setDailyRalphas(res);
          });
      } catch {
        collection = [];
      }

      return collection;
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData().catch(console.error);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  });

  function formatText(text: string[]) {
    if (!text) return '';
    const newTextArr = text;
    newTextArr[0] = encloseHeader(camelize(newTextArr[0]));
    let newText = newTextArr.join('<br />');
    newText = removeExcessLines(newText);
    newText = convertBolds(newText);
    newText = convertTags(newText);
    newText = convertUrls(newText);
    return newText;
  }

  function encloseHeader(str: string) {
    return (
      '<div class="bg-white/10 py-1 px-2 rounded-md flex flex-grow">' +
      str +
      '</div>'
    );
  }

  function camelize(str: string) {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase(),
    );
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

  function setBody() {
    if (!tab) {
      return (
        <div className="h-inherit overflow-scroll pb-60 px-4 sm:px-6 md:px-8 gap-y-2">
          {dailyRalphas.map((update: any) => (
            <div
              key={update.data.id}
              className="mb-16 pb-16 border-b border-white/5"
            >
              <div className="flex gap-x-4">
                <a className="text-xs font-medium text-white">
                  The Daily Ralpha
                </a>
                <div className="border-l border-white/10" />
                <a className="text-xs font-medium text-white/75">
                  {moment(update.data?.timestamp)
                    .local()
                    .startOf('seconds')
                    .fromNow()}
                </a>
              </div>
              <div className="text-xs font-medium bg-white/5 hover:bg-white/[.08] transition-colors rounded-md p-5 mt-2 mb-4">
                <div
                  className="leading-[175%] grow"
                  dangerouslySetInnerHTML={{
                    __html: formatText(update.data.formatted.summary),
                  }}
                ></div>
              </div>
              <div className="flex flex-wrap gap-4">
                {update.data.formatted.sections.map(
                  (section: any, i: number) => (
                    <div
                      key={update.data.id + '-' + i}
                      className="text-xs flex bg-blue-400/10 hover:bg-blue-400/[.13] transition-colors rounded-md p-5 flex-grow"
                    >
                      <div
                        className="leading-[175%] grow"
                        dangerouslySetInnerHTML={{
                          __html: formatText(section),
                        }}
                      ></div>
                    </div>
                  ),
                )}
              </div>
              <div className="text-xs bg-white/5 hover:bg-white/[.08] rounded-md p-3 mt-2 mb-4">
                <div
                  className="leading-[175%] grow"
                  dangerouslySetInnerHTML={{
                    __html: formatText(update.data.formatted.ending),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      <Layout>
        <Dashboard
          setModal={props.setModal}
          title={'News'}
          subtitle={"What's happening?"}
          body={setBody()}
        />
      </Layout>
    </div>
  );
}
