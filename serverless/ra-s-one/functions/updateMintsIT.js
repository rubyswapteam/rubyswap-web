'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

const it = process.env.IT;
const itacv = process.env.ITACV;
const supabase = process.env.SUPABASE;

const itPostHeaders = {
  'apollographql-client-name': 'icy.tools Web Client',
  'apollographql-client-version': itacv,
  'x-security-token': it,
  'Content-Type': 'application/json',
};

const itPostBody = {
  operationName: 'TrendingMints',
  variables: {
    filter: {
      period: 'ONE_MINUTE',
    },
  },
  query:
    'query TrendingMints($filter: TrendingMintsFilterInput) {\n  trendingMints(filter: $filter) {\n    ...TrendingMint\n    __typename\n  }\n}\n\nfragment TrendingMint on TrendingMint {\n  count\n  distinct\n  firstMintedAt\n  index\n  sum\n  distinctSum\n  estMintCost\n  avgTxFeeInEth\n  avgGasPriceInGwei\n  maxSupply\n  address\n  description\n  discordUrl\n  externalUrl\n  imageUrl\n  instagramUsername\n  name\n  slug\n  symbol\n  telegramUrl\n  twitterUsername\n  uuid\n  icySlug\n  deltaStats {\n    count\n    index\n    __typename\n  }\n  __typename\n}',
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
  Prefer: 'resolution=merge-duplicates',
};

export async function handler() {
  const timestamp = Math.floor(moment().unix());

  try {
    const rawData = await fetch('https://api.icy.tools/graphql', {
      method: 'POST',
      headers: itPostHeaders,
      body: JSON.stringify(itPostBody),
      redirect: 'follow',
    });
    const data = (await rawData.json()).data.trendingMints;
    const collections = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const collection = {
        addy: row.address.toLowerCase(),
        slug: row.slug || '',
        description: row.description || null,
        discord: row?.discordUrl || null,
        img: row?.imageUrl || null,
        insta: row?.instagramUsername || null,
        name: row?.name || null,
        twitter: row?.twitterUsername || null,
        uniqueminters: Math.floor(row?.distinctSum),
        totalsupply: Math.floor(row?.sum) || null,
        maxsupply: Math.floor(row?.maxSupply) || null,
        updatedat: Math.floor(timestamp),
        website: row?.externalUrl || null,
        chain: 1,
        holders: null,
        floor: null,
        firstmint: null,
        mintprice: null,
        verified: null,
      };
      collections.push(collection);
    }

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({ payload: collections }),
      redirect: 'follow',
    };

    console.log(supabaseRequestOptions);

    const responseSupabase = await fetch(
      'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/rpc/persistmints',
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
