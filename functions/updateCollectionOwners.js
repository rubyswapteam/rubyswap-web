import fetch from 'node-fetch';
import moment from 'moment';

const supabaseHeaders = {
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
  Prefer: 'resolution=merge-duplicates',
};

export async function handler(event) {
  const contract =
    event.queryStringParameters.contract != undefined
      ? event.queryStringParameters.contract
      : '';
  const ALCHEMY_API_ENDPOINT = `https://eth-mainnet.g.alchemy.com/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getOwnersForCollection?contractAddress=${contract}&withTokenBalances=true`;

  var alchemyRequestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const SUPABASE_API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Holders';

  try {
    const responseAlchemy = await fetch(
      ALCHEMY_API_ENDPOINT,
      alchemyRequestOptions,
    );
    const data = (await responseAlchemy.json()).ownerAddresses
      .map((x) => {
        return {
          ownerAddress: x.ownerAddress,
          tokenBalance: x.tokenBalances.length,
        };
      })
      .sort((a, b) => b.tokenBalance - a.tokenBalance);

    const body = JSON.stringify({
      contract: contract,
      chainId: 1,
      data: data,
      updatedAt: Math.floor(moment().unix()),
    });

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: body,
      redirect: 'follow',
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseSupabase = await fetch(
      SUPABASE_API_ENDPOINT,
      supabaseRequestOptions,
    );

    return { statusCode: 200, body: body };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
