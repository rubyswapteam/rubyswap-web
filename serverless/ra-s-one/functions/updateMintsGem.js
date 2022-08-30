'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

const gem = process.env.GEM;
const supabase = process.env.SUPABASE;

const postHeaders = {
  origin: 'https://www.gem.xyz',
  'x-api-key': gem,
  'Content-Type': 'application/json',
};

const postBody = {
  filters: {
    price: {},
    duration: '5_mins',
    holders: {},
    onlyMintable: false,
  },
  offset: 0,
  limit: 30,
  sort: {
    mintCount: -1,
  },
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
    const rawData = await fetch('https://api-5.gemlabs.xyz/analytics/minting', {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify(postBody),
      redirect: 'follow',
    });
    const data = (await rawData.json()).data;
    const collections = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const collection = {
        addy: row.collectionAddress.toLowerCase(),
        slug: null,
        description: null,
        discord: null,
        img: row?.collectionImageUrl || null,
        insta: null,
        name: row?.collectionName || null,
        twitter: null,
        uniqueminters: Math.floor(row?.uniqueMinters) || null,
        totalsupply: Math.floor(row?.totalSupply) || null,
        maxsupply: Math.floor(row?.mintData?.maxSupply) || null,
        updatedat: Math.floor(timestamp) || null,
        website: null,
        chain: 1,
        holders: row?.uniqueHolders,
        floor: row?.floorPrice ? row.floorPrice * 10 ** -18 : null,
        firstmint: row.firstMintAt,
        mintprice: row?.mintPrice ? row.mintPrice * 10 ** -18 : null,
        verified: row.isVerified ? 'true' : 'false',
      };
      collections.push(collection);
    }

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({ payload: collections }),
      redirect: 'follow',
    };

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
