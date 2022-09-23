'use-strict';
import fetch from 'node-fetch';

const alchemy = '63TUZT19v5atqFMTgBaWKdjvuIvaYud1';

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
  apikey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates',
};

export async function handler(event) {
  const ERROR_UNDEFINED_TIMESTAMP = 'Timestamp not found.',
    ERROR_NO_CONTRACT_PROVIDED = 'No contract provided.',
    ERROR_NO_CHAIN_ID_PROVIDED = 'No chainId provided.',
    ERROR_FETCHING_TIMESTAMP = 'Failed fetching timestamp.',
    WARNING_PERSIST_FAILED = 'Failed to persist the results in the DB.';

  if (!event.queryStringParameters.contract)
    return { statusCode: 500, error: ERROR_NO_CONTRACT_PROVIDED };

  if (!event.queryStringParameters.chainId)
    return { statusCode: 500, error: ERROR_NO_CHAIN_ID_PROVIDED };

  let timestamp = undefined;
  const ALCHEMY_API_ENDPOINT = `https://eth-mainnet.alchemyapi.io/v2/${alchemy}/`;

  const requestBody = {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromBlock: '0x0',
        toBlock: 'latest',
        contractAddresses: [event.queryStringParameters.contract],
        category: ['erc721', 'erc1155'],
        withMetadata: true,
        excludeZeroValue: true,
        maxCount: '0x1',
        fromAddress: '0x0000000000000000000000000000000000000000',
        order: 'asc',
      },
    ],
  };

  let alchemyRequestOptions = {
    method: 'POST',
    headers: alchemyHeaders,
    body: JSON.stringify(requestBody),
    redirect: 'follow',
  };

  const SUPABASE_API_ENDPOINT = `https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails?contract=ilike.${event.queryStringParameters.contract}`;

  try {
    const responseAlchemy = await fetch(
      ALCHEMY_API_ENDPOINT,
      alchemyRequestOptions,
    );

    const data = await responseAlchemy.json();
    timestamp =
      Date.parse(data.result.transfers[0].metadata.blockTimestamp) / 1000;

    console.log(timestamp);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING_TIMESTAMP + ' ' + error }),
    };
  }

  const body = JSON.stringify({
    contractAddress: event.queryStringParameters.contract,
    chainId: event.queryStringParameters.chainId,
    firstMint: Math.floor(timestamp),
  });

  const supabaseRequestOptions = {
    method: 'POST',
    headers: supabaseHeaders,
    body: body,
    redirect: 'follow',
  };

  try {
    fetch(SUPABASE_API_ENDPOINT, supabaseRequestOptions);
  } catch (error) {
    console.log(WARNING_PERSIST_FAILED + ' ' + error);
  }

  if (timestamp) {
    return {
      statusCode: 200,
      body: JSON.stringify(timestamp),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(ERROR_UNDEFINED_TIMESTAMP),
    };
  }
}
