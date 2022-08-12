import moment from 'moment';
import fetch from 'node-fetch';

const headers = {
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
};

const postHeaders = {
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
  if (!event.queryStringParameters.slug)
    return { statusCode: 500, error: 'No slug provided' };

  const API_ENDPOINT = `https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails?select=*&slug=ilike.${event.queryStringParameters.slug}`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    });
    const data = await response.json();
    const refreshLimit = moment().unix() - 900;
    console.log('data');
    console.log(data.length);
    try {
      if (data.length == 0 || data[0].updatedAt < refreshLimit) {
        console.log('Refresh clause triggered');
        const API_ENDPOINT =
          'https://api.opensea.io/api/v1/collection/' +
          event.queryStringParameters.slug;
        const response = await fetch(API_ENDPOINT, {
          headers: { method: 'GET', redirect: 'follow' },
        });
        const newData = await response.json();
        console.log('newData');
        console.log(newData);
        if (newData && newData.collection) {
          const collection = {
            contractAddress:
              newData?.collection?.primary_asset_contracts[0]?.address,
            editors: newData?.collection?.editors,
            slug: newData?.collection?.slug,
            imageUrl: newData?.collection?.image_url,
            largeImageUrl: newData?.collection?.large_image_url,
            bannerImageUrl: newData?.collection?.banner_image_url,
            schemaName:
              newData?.collection?.primary_asset_contracts[0]?.schema_name,
            description: newData?.collection?.description,
            osVerificationState:
              newData?.collection?.safelist_request_status == 'verified',
            name: newData?.collection?.name,
            website: newData?.collection?.external_url,
            discordUrl: newData?.collection?.discord_url,
            twitterUsername: newData?.collection?.twitter_username,
            instagramUsername: newData?.collection?.instagram_username,
            chainId: 1,
            osOneDayVolume: newData?.collection?.stats.one_day_volume,
            osOneDaySales: newData?.collection?.stats.one_day_sales,
            osOneDayChange: newData?.collection?.stats.one_day_change,
            osSevenDayVolume: newData?.collection?.stats.seven_day_volume,
            osSevenDaySales: newData?.collection?.stats.seven_day_sales,
            osSevenDayChange: newData?.collection?.stats.seven_day_change,
            osThirtyDaySales: newData?.collection?.stats.thirty_day_sales,
            osThirtyDayVolume: newData?.collection?.stats.thirty_day_volume,
            osThirtyDayChange: newData?.collection?.stats.thirty_day_change,
            osTotalVolume: newData?.collection?.stats.total_volume,
            osTotalSales: newData?.collection?.stats.total_sales,
            osFloorPrice: newData?.collection?.stats.floor_price,
            numOwners: newData?.collection?.stats.num_owners,
            totalSupply: newData?.collection?.stats.total_supply,
            traits: JSON.stringify(newData?.collection?.traits),
            updatedAt: moment().unix(),
            osStatsUpdatedAt: moment().unix(),
          };
          var requestOptions = {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(collection),
            redirect: 'follow',
          };
          const POST_API_ENDPOINT =
            'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails';

          const response = await fetch(POST_API_ENDPOINT, requestOptions);
          console.log('post push');
          return { statusCode: 200, body: JSON.stringify([newData]) };
        }
      }
    } catch {
      console.log('Failed to Updated collection');
    }
    console.log('Pulled from DB');
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}
