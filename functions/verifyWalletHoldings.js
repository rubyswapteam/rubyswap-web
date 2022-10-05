import fetch from 'node-fetch';

const alchemy = '63TUZT19v5atqFMTgBaWKdjvuIvaYud1';

const alchemyHeaders = {
  header: 'Content-Type: application/json',
};

const partners = {
  rubberDucks: '0xa5e25b44b01e09b7455851838c76cde68d13e29f',
  badInfluence: '0x54f9c72d128b4bbc7ff7564cbe0f193aba7bb146',
  wowPixies: '0xb67812ce508b9fc190740871032237c24b6896a0',
  colonist: '0x9f4df153d95a8460f6e82c21cab92719781fab84',
  spiritGates: '0x19b436638d31bf38ba33924e6e25f8ce2a764a52',
};

export async function handler(event) {
  const PARAM_ERROR_PARTNER = 'Incorrect or no partner project provided.',
    PARAM_ERROR_NO_WALLET_PROVIDED = 'No wallet provided.',
    ERROR_FETCHING = 'Failed to fetch the data.';

  let response = undefined;

  if (!event.queryStringParameters.wallet)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_NO_WALLET_PROVIDED }),
    };
  if (
    !event.queryStringParameters.partner ||
    !Object.keys(partners).includes(event.queryStringParameters.partner)
  )
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_PARTNER }),
    };

  const API_ENDPOINT = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemy}/isHolderOfCollection?wallet=${
    event.queryStringParameters.wallet
  }&contractAddress=${partners[event.queryStringParameters.partner]}`;

  try {
    response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: alchemyHeaders,
      redirect: 'follow',
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + ' ' + error }),
    };
  }

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
