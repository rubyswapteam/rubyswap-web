'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

const alchemy = '63TUZT19v5atqFMTgBaWKdjvuIvaYud1';

const alchemyHeaders = {
  header: 'Content-Type: application/json',
};

export async function handler(event) {
  const ALCHEMY_API_ENDPOINT = `https://eth-mainnet.alchemyapi.io/v2/${alchemy}/`;

  const requestBody = {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromBlock: '0x0',
        toBlock: 'latest',
        category: ['erc721', 'erc1155'],
        withMetadata: true,
        excludeZeroValue: true,
        maxCount: '0x3e8',
        fromAddress: '0x0000000000000000000000000000000000000000',
        toAddress: event.queryStringParameters.address,
        order: 'desc',
      },
    ],
  };

  let alchemyRequestOptions = {
    method: 'POST',
    headers: alchemyHeaders,
    body: JSON.stringify(requestBody),
    redirect: 'follow',
  };

  try {
    const responseAlchemy = await fetch(
      ALCHEMY_API_ENDPOINT,
      alchemyRequestOptions,
    );

    const data = await responseAlchemy.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
