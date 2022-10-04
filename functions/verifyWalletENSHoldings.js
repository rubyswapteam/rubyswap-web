import fetch from 'node-fetch';

const alchemy = '63TUZT19v5atqFMTgBaWKdjvuIvaYud1';
const supabase =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E';

const alchemyHeaders = {
  header: 'Content-Type: application/json',
};

const supabaseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: supabase,
  Authorization: `Bearer ${supabase}`,
  'Content-Type': 'application/json',
};

export async function handler(event) {
  const PARAM_ERROR_PARTNER = 'Incorrect or no partner project provided.',
    PARAM_ERROR_NO_WALLET_PROVIDED = 'No wallet provided.',
    ERROR_FETCHING = 'Failed to fetch the data.';

  let responseA = undefined;
  let responseSB = undefined;

  if (!event.queryStringParameters.wallet)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_NO_WALLET_PROVIDED }),
    };

  const ALCHEMY_API_ENDPOINT = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemy}/getNFTs?owner=${event.queryStringParameters.wallet}&contractAddresses[]=0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85&withMetadata=false`;
  const SUPABASE_API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/VerifiedEnsAddresses?select=*';

  console.log('try');
  try {
    responseA = fetch(ALCHEMY_API_ENDPOINT, {
      method: 'GET',
      headers: alchemyHeaders,
      redirect: 'follow',
    });
    responseSB = fetch(SUPABASE_API_ENDPOINT, {
      method: 'GET',
      headers: supabaseHeaders,
      redirect: 'follow',
    });
    console.log('fetch');
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + ' ' + error }),
    };
  }
  const results = await Promise.all([responseA, responseSB]);
  console.log(results);
  const resultsParsed = await Promise.all([
    results[0].json(),
    results[1].json(),
  ]);

  const owned = resultsParsed[0].ownedNfts.map((x) =>
    BigInt(x.id.tokenId).toString(),
  );

  const verifiedAddresses = resultsParsed[1].map((x) => x.id);

  const isVerified = verifiedAddresses.some((x) => owned.includes(x));

  return {
    statusCode: 200,
    body: JSON.stringify(isVerified),
  };
}
