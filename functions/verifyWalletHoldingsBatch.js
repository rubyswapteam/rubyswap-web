import fetch from 'node-fetch';

const alchemy = '63TUZT19v5atqFMTgBaWKdjvuIvaYud1';

const alchemyHeaders = {
  header: 'Content-Type: application/json',
};

// CHECK USER DOESNT EXIST IN SUPABASE DB AND IF NOT, ADD THEM PROVIDED THEY PASS

export async function handler(event) {
  const PARAM_ERROR_PARTNER = 'Incorrect or no partner project provided.',
    PARAM_ERROR_NO_WALLET_PROVIDED = 'No wallet provided.',
    ERROR_FETCHING = 'Failed to fetch the data.';

  const partners = {
    rubberDucks: '0xa5e25b44b01e09b7455851838c76cde68d13e29f',
    badInfluence: '0x54f9c72d128b4bbc7ff7564cbe0f193aba7bb146',
    wowPixies: '0xb67812ce508b9fc190740871032237c24b6896a0',
  };

  let response = undefined;
  const wallet = event.queryStringParameters.wallet;

  if (!wallet)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: PARAM_ERROR_NO_WALLET_PROVIDED }),
    };

  const partnerList = Object.keys(partners);
  const res = [];
  let mappedResult = undefined;
  try {
    for (let i = 0; i < partnerList.length; i++) {
      const API_ENDPOINT = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemy}/isHolderOfCollection?wallet=${wallet}&contractAddress=${
        partners[partnerList[i]]
      }`;
      console.log(API_ENDPOINT);

      const rawData = fetch(API_ENDPOINT, {
        method: 'GET',
        headers: alchemyHeaders,
        redirect: 'follow',
      });

      res.push(rawData);
    }
    const resolved = await Promise.all(res);
    const resolvedJson = await Promise.all(resolved.map((x) => x.json()));
    mappedResult = {
      wallet: wallet,
      result: resolvedJson
        .map((x) => x.isHolderOfCollection)
        .some((x) => x === true),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_FETCHING + ' ' + error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(mappedResult),
  };
}
