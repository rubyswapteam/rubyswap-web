import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN',
};

export async function handler(event) {
  const API_ENDPOINT = 'https://gem-public-api.herokuapp.com/assets';

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: event.body,
    redirect: 'follow',
  };

  console.log('requestOptions');
  console.log(requestOptions);

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    console.log(data);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
