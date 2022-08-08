import fetch from 'node-fetch';
import moment from 'moment';

const gemHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN',
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
  const GEM_API_ENDPOINT = 'https://gem-public-api.herokuapp.com/collections';

  var gemRequestOptions = {
    method: 'POST',
    headers: gemHeaders,
    body: JSON.stringify({
      sort: { 'stats.thirty_day_volume': -1 },
      limit: 100,
      fields: {
        name: 1,
        contract: 1,
        slug: 1,
        symbol: 1,
        standard: 1,
        description: 1,
        address: 1,
        createdDate: 1,
        externalUrl: 1,
        imageUrl: 1,
        totalSupply: 1,
        owners: 1,
        sevenDayVolume: 1,
        oneDayVolume: 1,
        stats: 1,
        indexingStatus: 1,
        discordUrl: 1,
        instagramUsername: 1,
        isVerified: 1,
        lastNumberOfUpdates: 1,
        websiteUrl: 1,
        telegramUrl: 1,
        twitterUsername: 1,
        marketStats: 1,
        updatedAt: 1,
        wikiUrl: 1,
      },
    }),
    redirect: 'follow',
  };

  const SUPABASE_API_ENDPOINT =
    'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/TrendingTable';

  try {
    const ethPrice = await (
      await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      )
    ).json();

    const gasPrice = await (
      await fetch(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=SY2NX9JWTZMSJWDD68G3NXMJT7SAJBF34J',
      )
    ).json();

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({
        gas: gasPrice.result.SafeGasPrice,
        eth: ethPrice.ethereum.usd,
      }),
      redirect: 'follow',
    };

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
