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

const gemHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN',
};

export async function handler(event) {
  if (!event.queryStringParameters.contract)
    return { statusCode: 500, error: 'No contract provided' };

  const API_ENDPOINT = `https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails?select=*&contractAddress=ilike.${event.queryStringParameters.contract}`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    });
    const data = await response.json();
    const refreshLimit = moment().unix() - 900;
    console.log('data');
    console.log(data);
    try {
      console.log(1);
      if (data.length == 0 || data[0].updatedAt < refreshLimit) {
        console.log(2);
        const API_ENDPOINT =
          'https://gem-public-api-v2.herokuapp.com/collections';
        const postBody = JSON.stringify({
          filters: {
            address: event.queryStringParameters.contract,
          },
          sort: {
            sevenDayVolume: 1,
          },
          limit: 1,
          fields: {
            name: 1,
            symbol: 1,
            slug: 1,
            standard: 1,
            description: 1,
            address: 1,
            createdDate: 1,
            externalUrl: 1,
            imageUrl: 1,
            totalSupply: 1,
            sevenDayVolume: 1,
            oneDayVolume: 1,
            stats: 1,
            traits: 1,
            indexingStatus: 1,
            discordUrl: 1,
            instagramUsername: 1,
            isVerified: 1,
            lastNumberOfUpdates: 1,
            lastOpenSeaCancelledId: 1,
            lastOpenSeaSaleCreatedId: 1,
            lastOpenSeaTransferId: 1,
            lastRaribleAssetUpdateId: 1,
            mediumUsername: 1,
            telegramUrl: 1,
            twitterUsername: 1,
            updatedAt: 1,
            wikiUrl: 1,
          },
        });
        var requestOptions = {
          method: 'POST',
          headers: gemHeaders,
          body: postBody,
          redirect: 'follow',
        };
        console.log(3);
        const response = await fetch(API_ENDPOINT, requestOptions);
        console.log('response');
        console.log(response);
        const newData = await response.json();
        console.log('newData');
        console.log(newData);
        if (newData && newData.data) {
          const collection = {
            contractAddress:
              newData?.data[0]?.primary_asset_contracts[0]?.address?.toLowerCase(),
            editors: newData?.data[0]?.editors,
            slug: newData?.data[0]?.slug,
            imageUrl: newData?.data[0]?.image_url,
            largeImageUrl: newData?.data[0]?.large_image_url,
            bannerImageUrl: newData?.data[0]?.banner_image_url,
            schemaName:
              newData?.data[0]?.primary_asset_contracts[0]?.schema_name,
            description: newData?.data[0]?.description,
            osVerificationState:
              newData?.data[0]?.safelist_request_status == 'verified',
            name: newData?.data[0]?.name,
            website: newData?.data[0]?.external_url,
            discordUrl: newData?.data[0]?.discord_url,
            twitterUsername: newData?.data[0]?.twitter_username,
            instagramUsername: newData?.data[0]?.instagram_username,
            chainId: 1,
            osOneDayVolume: newData?.data[0]?.stats.one_day_volume,
            osOneDaySales: newData?.data[0]?.stats.one_day_sales,
            osOneDayChange: newData?.data[0]?.stats.one_day_change,
            osSevenDayVolume: newData?.data[0]?.stats.seven_day_volume,
            osSevenDaySales: newData?.data[0]?.stats.seven_day_sales,
            osSevenDayChange: newData?.data[0]?.stats.seven_day_change,
            osThirtyDaySales: newData?.data[0]?.stats.thirty_day_sales,
            osThirtyDayVolume: newData?.data[0]?.stats.thirty_day_volume,
            osThirtyDayChange: newData?.data[0]?.stats.thirty_day_change,
            osTotalVolume: newData?.data[0]?.stats.total_volume,
            osTotalSales: newData?.data[0]?.stats.total_sales,
            osFloorPrice: newData?.data[0]?.stats.floor_price,
            numOwners: newData?.data[0]?.stats.num_owners,
            totalSupply: newData?.data[0]?.stats.total_supply,
            traits: JSON.stringify(newData?.data[0]?.traits),
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
          return { statusCode: 200, body: JSON.stringify([collection]) };
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
