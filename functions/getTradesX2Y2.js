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
      ? '&from_address=' + event.queryStringParameters.from
      : '';
  const to =
    event.queryStringParameters.to != undefined
      ? '&to_address=' + event.queryStringParameters.to
      : '';
  const contract =
    event.queryStringParameters.contract != undefined
      ? '&contract=' + event.queryStringParameters.contract
      : '';
  const cursor =
    event.queryStringParameters.cursor != undefined &&
    event.queryStringParameters.cursor.length > 1
      ? '&cursor=' + event.queryStringParameters.cursor
      : '';
  const API_ENDPOINT =
    'https://api.x2y2.org/v1/events?type=sale&limit=200' +
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
