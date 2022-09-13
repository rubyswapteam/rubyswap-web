import fetch from 'node-fetch';

const headers = {
  'X-API-Key': '38d74028-ca13-48df-ab81-bdfa4f3ab834',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
};

export async function handler(event) {
  async function fetchData(id, time) {
    const timeoutID = setTimeout(() => Promise.resolve([]), 8000);
    const timeAdj = time || event.queryStringParameters.createdAfter;
    const baseTimestamp = timeAdj > 1 ? `timestamp_gte: \"${timeAdj}\"` : '';
    const filter = [from, to, contract, baseTimestamp, blockNumber].join(', ');
    let res = [];
    let last = undefined;
    const limit = 1000;
    // const endpoint = `https://api.thegraph.com/subgraphs/id/${id}`;
    const endpoint = `https://api.studio.thegraph.com/query/28247/messari-${id}/v0.0.1`;

    let x = await Promise.all(
      [0, 1, 2, 3, 4, 5].map((x) =>
        fetch(endpoint, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            query: `query MyQuery {\n  trades(\n    first: 1000\n    ${`skip:${
              limit * x
            }\n`}    orderBy: timestamp\n    ${order}    where: {${filter}  }\n   ) {\n    id\n   collection {\n      id\n     name\n    }\n    tokenId\n    seller\n    strategy\n    timestamp\n    priceETH\n    transactionHash\n    buyer\n    blockNumber\n    amount\n  }\n}`,
            variables: null,
            operationName: 'MyQuery',
            extensions: {
              headers: null,
            },
          }),
          redirect: 'follow',
        }),
      ),
    );

    if (x) {
      clearTimeout(timeoutID);
    }

    x = await Promise.all([
      x[0].json(),
      x[1].json(),
      x[2].json(),
      x[3].json(),
      x[4].json(),
      x[5].json(),
    ]);

    console.log(x);

    for (let i = 0; i < x.length; i++) {
      res = [...res, ...x[i].data?.trades];
    }

    if (x[5]?.data?.trades && x[5]?.data?.trades?.length == 1000) {
      last = x[5]?.data?.trades[x[5].data.trades.length - 1];
    }

    return { trades: res, last: last };
  }

  const from =
    event.queryStringParameters.from != undefined
      ? `seller: \"${event.queryStringParameters.from}\"`
      : '';
  const to =
    event.queryStringParameters.to != undefined
      ? `buyer: \"${event.queryStringParameters.to}\"`
      : '';
  const contract =
    event.queryStringParameters.contract != undefined
      ? `collection: \"${event.queryStringParameters.contract}\"`
      : '';
  const order =
    event.queryStringParameters.order != undefined
      ? `orderDirection: \"${event.queryStringParameters.order}\"\n`
      : 'orderDirection: "asc"\n';
  const blockNumber =
    event.queryStringParameters.cursor != undefined
      ? `blockNumber_gte: \"${event.queryStringParameters.cursor}\"`
      : '';

  // const osId = 'QmcWQPQMdiAkMCZw85R8FE6XXLe6kRrTYfcYHBFCM4GW5q';
  const osId = 'opensea';
  // const seaportId = 'Qmex4g7mgwCKrWvTXw3KyuKi9nLUswWqYHjoRPJ4i8hTRk';
  const seaportId = 'seaport';
  // const x2y2Id = 'Qmaj3MHPQ5AecbPuzUyLo9rFvuQwcAYpkXrf3dTUPV8rRu';
  const x2y2Id = 'x2y2';
  // const looksRareId = 'QmWag73NCHKY423XPZVT9WpHUg4cKqcidHUB5GSchcBpmT';
  const looksRareId = 'looksrare';
  const skipOs = event.queryStringParameters.Opensea == 0;
  const skipSeaport = event.queryStringParameters.Seaport == 0;
  const skipX2Y2 = event.queryStringParameters.X2Y2 == 0;
  const skipLooksRare = event.queryStringParameters.LooksRare == 0;

  try {
    console.log(x2y2Id);
    const [os, seaport, x2y2, looksRare] = await Promise.all([
      skipOs
        ? Promise.resolve()
        : fetchData(osId, event.queryStringParameters.Opensea),
      skipSeaport
        ? Promise.resolve()
        : fetchData(seaportId, event.queryStringParameters.Seaport),
      skipX2Y2
        ? Promise.resolve()
        : fetchData(x2y2Id, event.queryStringParameters.X2Y2),
      skipLooksRare
        ? Promise.resolve()
        : fetchData(looksRareId, event.queryStringParameters.LooksRare),
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify({
        Opensea: os || { trades: [] },
        Seaport: seaport || { trades: [] },
        X2Y2: x2y2 || { trades: [] },
        LooksRare: looksRare || { trades: [] },
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
