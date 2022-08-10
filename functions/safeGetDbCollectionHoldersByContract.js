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

export async function handler(event) {
  const contract =
    event.queryStringParameters.contract != undefined
      ? event.queryStringParameters.contract
      : '';
  if (!contract) return { statusCode: 500, error: 'No contract provided' };
  const API_ENDPOINT = `https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Holders?select=*&contract=ilike.${contract}`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    });
    const data = await response.json();

    if (
      data &&
      data[0] &&
      data[0].data &&
      data[0].updatedAt > Math.floor(moment().unix() - 86400)
    ) {
      return { statusCode: 200, body: JSON.stringify(data) };
    } else {
      const ALCHEMY_API_ENDPOINT = `https://eth-mainnet.g.alchemy.com/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getOwnersForCollection?contractAddress=${contract}&withTokenBalances=true`;
      const SUPABASE_API_ENDPOINT =
        'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Holders';

      try {
        const responseAlchemy = await fetch(ALCHEMY_API_ENDPOINT, {
          method: 'GET',
          redirect: 'follow',
        });
        const data = (await responseAlchemy.json()).ownerAddresses
          .map((x) => {
            return {
              ownerAddress: x.ownerAddress,
              tokenBalance: x.tokenBalances.length,
            };
          })
          .sort((a, b) => b.tokenBalance - a.tokenBalance);

        const body = {
          contract: contract,
          chainId: 1,
          data: data,
          updatedAt: Math.floor(moment().unix()),
        };

        const supabaseRequestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
          redirect: 'follow',
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetch(SUPABASE_API_ENDPOINT, supabaseRequestOptions);

        return {
          statusCode: 200,
          body: JSON.stringify([body]),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error }),
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
