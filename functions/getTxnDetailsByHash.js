import fetch from 'node-fetch';

const headers = {
  origin: 'https://www.gem.xyz',
  'x-api-key': 'iMHRYlpIXs3zfcBY1r3iKLdqS2YUuOUs',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
};

export async function handler(event) {
  const txn = event.queryStringParameters.txn;
  const API_ENDPOINT = `https://sweeps.gemlabs.xyz/transaction/gem/${txn}`;
  const SUPABASE_API_ENDPOINT = `https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Sweeps?txn=ilike.${txn}`;
  if (!txn) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No txn hash supplied' }),
    };
  }

  try {
    let running = true;
    let i = 0;
    let response = undefined;
    do {
      response = await fetch(API_ENDPOINT, { headers: headers });
      console.log(i);
      if (response.status == 200 || i == 10) running = false;
      ++i;
    } while (running);
    const data = (await response.json()).data;
    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ assets: data }),
      redirect: 'follow',
    };
    const supabaseResponse = await fetch(SUPABASE_API_ENDPOINT, requestOptions);

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
