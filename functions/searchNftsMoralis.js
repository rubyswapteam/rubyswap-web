import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  'X-API-Key':
    'VgDfyvmSN1SppgTXg9Zj1Vge8Pf4cyz4Xs1V4s67cv5cT1VsLSs9OGoIiF4sZx0m',
};

export async function handler(event) {
  const chain =
    event.queryStringParameters.chain != undefined
      ? event.queryStringParameters.chain
      : '';
  const q =
    event.queryStringParameters.q != undefined
      ? event.queryStringParameters.q
      : '';

  const API_ENDPOINT = `https://deep-index.moralis.io/api/v2/nft/search?chain=${chain}&format=decimal&q=${q}&filter=name`;

  console.log(API_ENDPOINT);
  try {
    const response = await fetch(API_ENDPOINT, { headers: headers });
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
