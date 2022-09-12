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
  Authorization:
    'Bearer AAAAAAAAAAAAAAAAAAAAACW7gwEAAAAAGFyti33jNW3%2FTc%2BXAvTlEoGjos8%3DFHw42JNiPqbKpyUHcR4sbh3VbDgPojDIJFAfMoAPDdPUHoPwY5',
};

export async function handler(event) {
  const API_ENDPOINT = `https://api.twitter.com/1.1/friendships/show.json?source_screen_name=RubyAppXYZ&target_screen_name=${event.queryStringParameters.name}`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.relationship.source.followed_by),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
