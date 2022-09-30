import fetch from 'node-fetch';
import moment from 'moment';

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

const bluechips = {
  CryptoPunks: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
  'Bored Ape Yacht Club': '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  'Mutant Ape Yacht Club': '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
  'PROOF Collective': '0x08d7c0242953446436f34b4c78fe9da38c73668d',
  Azuki: '0xed5af388653567af2f388e6224dc7c4b3241c544',
  'CLONE X - X TAKASHI MURAKAMI': '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
  Moonbirds: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
  Doodles: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
  'Cool Cats NFT': '0x1a92f7381b9f03921564a437210bb9396471050c',
  mfers: '0x79fcdef22feed20eddacbb2587640e45491b757f',
};

export async function handler(event) {
  const contract =
    event.queryStringParameters.contract != undefined
      ? event.queryStringParameters.contract
      : '';

  const API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/rpc/getholdersplusdetails';

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        contracts: contract ? [contract] : Object.values(bluechips),
      }),
      redirect: 'follow',
    });
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
