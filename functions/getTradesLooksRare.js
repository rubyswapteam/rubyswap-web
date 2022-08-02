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
  const from =
    event.queryStringParameters.from != undefined
      ? '&from=' + event.queryStringParameters.from
      : '';
  const to =
    event.queryStringParameters.to != undefined
      ? '&to=' + event.queryStringParameters.to
      : '';
  const contract =
    event.queryStringParameters.contract != undefined
      ? '&collection=' + event.queryStringParameters.contract
      : '';
  const cursor =
    event.queryStringParameters.cursor != undefined
      ? '&pagination[cursor]=' + event.queryStringParameters.cursor
      : '';
  const API_ENDPOINT =
    'https://api.looksrare.org/api/v1/events?type=SALE&pagination%5Bfirst%5D=150' +
    from +
    to +
    contract +
    cursor;

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
