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

export async function handler(event) {
  const PARAM_ERROR_NO_CODE_PROVIDED = 'No code provided.',
    ERROR_FETCHING = 'Failed to fetch the data.';

  let response = undefined;

  if (!event.queryStringParameters.code)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_NO_CODE_PROVIDED }),
    };

  const API_ENDPOINT = `https://discord.com/api/invites/${event.queryStringParameters.code}?with_counts=true`;

  try {
    response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: headers,
      redirect: 'follow',
    });
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + ' ' + error }),
    };
  }

  console.log(response);
  const data = await response.json();
  return { statusCode: 200, body: JSON.stringify(data) };
}
