import fetch from 'node-fetch';

// const fetch = require('node-fetch');

const headers = {
  'content-type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  'X-API-KEY': '38d74028-ca13-48df-ab81-bdfa4f3ab834',
};

const API_ENDPOINT =
  'https://api.x2y2.org/v1/events?type=sale&from_address&to_address=0x2ef1630993bc569a18f8c406ab720e2d040e155a&contract';

export async function handler() {
  try {
    const response = await fetch(API_ENDPOINT, headers);
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
