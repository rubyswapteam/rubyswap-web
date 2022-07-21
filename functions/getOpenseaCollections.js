import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
};

export async function handler(event) {
  const assetOwner =
    event.queryStringParameters.assetOwner != undefined
      ? '&asset_owner=' + event.queryStringParameters.assetOwner
      : '';
  const offset =
    event.queryStringParameters.offset != undefined
      ? '&offset=' + event.queryStringParameters.offset
      : '';
  const API_ENDPOINT =
    'https://api.opensea.io/api/v1/collections?limit=300' + assetOwner + offset;

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
