import fetch from 'node-fetch';
import moment from 'moment';

const gem = process.env.GEM;
const supabase = process.env.SUPABASE;

const gemHeaders = {
  'Content-Type': 'application/json',
  origin: ' https://www.gem.xyz',
  'x-api-key': gem,
};

const supabaseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: `${supabase}`,
  Authorization: `Bearer ${supabase}`,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates',
};

console.log('start');

export async function handler() {
  const GEM_API_ENDPOINT =
    'https://sweeps.gemlabs.xyz/analytics/transactions/gem';
  const SUPABASE_API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/rpc/persistsweeps';
  const ALCHEMY_API_ENDPOINT =
    'https://eth-mainnet.alchemyapi.io/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1';
  var gemRequestOptions = {
    method: 'POST',
    headers: gemHeaders,
    body: JSON.stringify({
      filters: {
        duration: '24_hours',
        numberOfItemsBought: {
          min: '',
          max: '',
        },
        price: {
          min: '',
          max: '',
        },
      },
      offset: 0,
      limit: 50,
      sort: {
        timestamp: -1,
      },
    }),
    redirect: 'follow',
  };

  try {
    console.log('gem');

    let running = true;
    let i = 0;
    let responseGem = undefined;
    do {
      responseGem = await fetch(GEM_API_ENDPOINT, gemRequestOptions);
      console.log(i);
      if (responseGem.status == 200 || i == 5) running = false;
      ++i;
    } while (running);

    const gemJson = await responseGem.json();
    const data = gemJson.data;

    const alchemyRequestBody = [];

    console.log('alchemy');
    for (let i = 0; i < data.length; i++) {
      alchemyRequestBody.push({
        id: i,
        jsonrpc: '2.0',
        params: [data[i]?.transactionHash],
        method: 'eth_getTransactionByHash',
      });
    }
    console.log('alchemy done');

    const responseAlchemy = await fetch(ALCHEMY_API_ENDPOINT, {
      method: 'POST',
      headers: gemHeaders,
      body: JSON.stringify(alchemyRequestBody),
      redirect: 'follow',
    });
    const alchemyData = await responseAlchemy.json();

    const sweeps = [];

    for (let i = 0; i < data.length; i++) {
      console.log('i');
      const sweep = {
        index: i,
        txn: data[i]?.transactionHash || '',
        txnTime: parseInt(data[i]?.timestamp),
        buyer: data[i]?.buyer || '',
        collections: data[i]?.collectionsBought,
        collectionName: data[i]?.collections[0].name,
        collectionImageUrl: data[i]?.collections[0].imageUrl,
        collectionVerification: data[i]?.collections[0].isVerified,
        numItems: data[i]?.numItemsBought,
        assets: null,
        cost: parseInt(alchemyData[i].result.value) * 10 ** -18, // insert alchemy
        chainId: 1,
      };
      sweeps.push(sweep);
    }

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({ payload: sweeps }),
      // body: JSON.stringify(sweeps),
      redirect: 'follow',
    };
    console.log(JSON.stringify({ payload: sweeps }));

    const responseSupabase = await fetch(
      SUPABASE_API_ENDPOINT,
      supabaseRequestOptions,
    );
    return { statusCode: 200, body: JSON.stringify(responseSupabase) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
