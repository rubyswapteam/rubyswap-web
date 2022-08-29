import fetch from 'node-fetch';
import moment from 'moment';

const gem = process.env.GEM;
const supabase = process.env.SUPABASE;

const gemHeaders = {
  'Content-Type': 'application/json',
  'origin': ' https://www.gem.xyz',
  'x-api-key': 'iMHRYlpIXs3zfcBY1r3iKLdqS2YUuOUs',
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

console.log('start')

export async function handler() {
  const GEM_API_ENDPOINT =
    'https://sweeps.gemlabs.xyz/analytics/transactions/gem';
  const SUPABASE_API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Sweeps';
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
      limit: 100,
      sort: {
        timestamp: -1,
      },
    }),
    redirect: 'follow',
  };

  try {

console.log('gem')

    const responseGem = await fetch(GEM_API_ENDPOINT, gemRequestOptions);
    const data = (await responseGem.json()).data;

    const alchemyRequestBody = [];

    for (let i = 0; i < data.length; i++) {
      alchemyRequestBody.push({
        id: i,
        jsonrpc: '2.0',
        params: [data[i]?.transactionHash],
        method: 'eth_getTransactionByHash',
      });
    }
    console.log('alchemy');

    const responseAlchemy = await fetch(ALCHEMY_API_ENDPOINT, {
      method: 'POST',
      headers: gemHeaders,
      body: JSON.stringify(alchemyRequestBody),
      redirect: 'follow',
    });
    const alchemyData = await responseAlchemy.json();

    const collections = [];

    for (let i = 0; i < data.length; i++) {
      console.log('i')
      console.log(alchemyData[i])
      const collection = {
        index: i,
        txn: data[i]?.transactionHash || '',
        timestamp: data[i]?.timestamp,
        buyer: data[i]?.buyer || '',
        collections: data[i]?.collectionsBought,
        assets: [],
        cost: parseInt(alchemyData[i].result.value), // insert alchemy
      };
      collections.push(collection);
    }

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify(collections),
      redirect: 'follow',
    };
    console.log(collections);

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
