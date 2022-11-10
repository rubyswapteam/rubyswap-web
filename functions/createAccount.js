import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  'Content-Type': 'application/json',
};

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function handler(event) {
  const PARAM_ERROR_NO_WALLET_PROVIDED = 'No wallet provided.',
    PARAM_ERROR_NO_TWITTER_PROVIDED = 'No twitter provided.',
    ERROR_FETCHING = 'Failed to fetch the data.';

  const wallet = event.queryStringParameters.wallet;
  const twitter = event.queryStringParameters.twitter;
  let referral = event.queryStringParameters.ref || '';
  if (referral == 'bypasstokengate') referral = '';

  if (!event.queryStringParameters.wallet)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_NO_WALLET_PROVIDED }),
    };

  if (!event.queryStringParameters.twitter)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_NO_TWITTER_PROVIDED }),
    };

  const API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/rpc/createuser';

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      payload: [
        {
          uid: makeid(12),
          wallet: wallet,
          twitter: twitter,
          referral: referral,
        },
      ],
    }),
    redirect: 'follow',
  };

  console.log(requestOptions);

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + '\n' + error }),
    };
  }
}
