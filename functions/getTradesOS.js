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
  const createdAfter =
    event.queryStringParameters.createdAfter != undefined &&
    event.queryStringParameters.createdAfter.length > 1
      ? `timestamp_gte: \"${event.queryStringParameters.createdAfter}\"`
      : '';
  const order =
    event.queryStringParameters.order != undefined
      ? `orderDirection: \"${event.queryStringParameters.order}\\n"`
      : 'orderDirection: "asc"\n';
  const blockNumber =
    event.queryStringParameters.cursor != undefined
      ? `blockNumber_gte: \"${event.queryStringParameters.cursor}\"`
      : '';

  const filter = [from, to, contract, createdAfter, blockNumber].join(', ');

  const API_ENDPOINT =
    'https://api.thegraph.com/subgraphs/id/QmYHND473qbLFExVSchMU3Vk3bjBZJ4uYnakusnfN4hRRQ';

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: `query MyQuery {\n  trades(\n    first: 1000\n    orderBy: timestamp\n    ${order}    where: {${filter}}\n  ) {\n    id\n   collection {\n      id\n     name\n    }\n    tokenId\n    seller\n    strategy\n    timestamp\n    priceETH\n    transactionHash\n    buyer\n    blockNumber\n    amount\n  }\n}`,
        variables: null,
        operationName: 'MyQuery',
        extensions: {
          headers: null,
        },
      }),
      redirect: 'follow',
    });
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
