import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json',
};

export async function handler(event) {
  const PARAM_ERROR_NO_WALLET_PROVIDED = 'No wallet provided.',
    ERROR_FETCHING = 'Failed to fetch the data with the error message:';

  if (!event.queryStringParameters.wallet)
    return { statusCode: 500, error: PARAM_ERROR_NO_WALLET_PROVIDED };

  const API_ENDPOINT = `https://api.opensea.io/api/v1/collections?asset_owner=${event.queryStringParameters.wallet}&offset=0&limit=300`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    });
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + '\n' + error }),
    };
  }
}
