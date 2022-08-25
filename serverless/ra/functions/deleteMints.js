'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

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
};
export async function handler() {
  try {
    const time = Math.floor(moment().unix()) - 180000;
    const SUPABASE_API_ENDPOINT = `https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/LiveMints?updatedAt=lte.${time}`;
    var supabaseRequestOptions = {
      method: 'DELETE',
      headers: supabaseHeaders,
      redirect: 'follow',
    };
    const responseSupabase = await fetch(
      SUPABASE_API_ENDPOINT,
      supabaseRequestOptions,
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
