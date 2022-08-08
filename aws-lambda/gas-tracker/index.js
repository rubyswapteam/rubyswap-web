import fetch from 'node-fetch';

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
