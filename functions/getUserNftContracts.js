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
  const PARAM_ERROR_NO_USER_PROVIDED = 'No user provided.',
    ERROR_FETCHING = 'Failed to fetch the data with the error message:';

  if (!event.queryStringParameters.user)
    return { statusCode: 500, error: PARAM_ERROR_NO_USER_PROVIDED };

  const pageKey = event.queryStringParameters.pageKey
    ? '&pageKey=' + event.queryStringParameters.pageKey
    : '';

  const API_ENDPOINT = `https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getContractsForOwner?owner=${event.queryStringParameters.user}${pageKey}`;
  console.log(API_ENDPOINT);
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    });
    console.log(response);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + '\n' + error }),
    };
  }
}
