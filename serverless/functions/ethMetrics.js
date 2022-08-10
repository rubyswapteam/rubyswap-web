'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

export async function handler() {
  const etherscan = process.env.ETHERSCAN;
  const supabase = process.env.SUPABASE;

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
    Prefer: 'resolution=merge-duplicates',
  };

  try {
    const gasPrice = (
      await (
        await fetch(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscan}`,
        )
      ).json()
    ).result.SafeGasPrice;
    const ethPrice = (
      await (
        await fetch(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscan}`,
        )
      ).json()
    ).result.ethusd;

    console.log(JSON.stringify({ ethPrice: ethPrice, gasPrice: gasPrice }));
    const SUPABASE_API_ENDPOINT =
      'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/EthMetrics';
    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({
        ethPrice: ethPrice,
        gasPrice: gasPrice,
        timestamp: Math.floor(moment().unix()),
      }),
      redirect: 'follow',
    };
    const responseSupabase = await fetch(
      SUPABASE_API_ENDPOINT,
      supabaseRequestOptions,
    );
    console.log(
      JSON.stringify({
        ethPrice: ethPrice,
        gasPrice: gasPrice,
        timestamp: Math.floor(moment().unix()),
      }),
    );
    return { statusCode: 200, body: JSON.stringify(responseSupabase) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
