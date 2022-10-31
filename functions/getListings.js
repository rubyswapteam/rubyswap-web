import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN',
};

export async function handler(event) {
  const API_ENDPOINT = 'https://gem-public-api-v2.herokuapp.com/assets';

  const parsedBody = JSON.parse(event.body);
  const postBody = JSON.stringify({
    filters: {
      address: parsedBody.contractAddress,
    },
    limit: parsedBody.limit,
    offset: parsedBody.offset,
    fields: {
      name: 1,
      address: 1,
      isVerified: 1,
      updatedAt: 1,
      currentEthPrice: 1,
      marketplace: 1,
      market: 1,
      imageUrl: 1,
      tokenId: 1,
      id: 1,
      owner: 1,
      traits: 1,
      rarityScore: 1,
    },
    sort: {
      currentEthPrice: 'asc',
    },
    status: ['buy_now'],
  });

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: postBody,
    redirect: 'follow',
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    const API_ENDPOINT = 'https://gem-api-v2-1.herokuapp.com/assets';
    const postBody = JSON.stringify({
      filters: {
        traits: {},
        traitsRange: {},
        address: parsedBody.contractAddress,
        rankRange: {},
        price: {},
      },
      sort: {
        currentEthPrice: 'asc',
      },
      fields: {
        id: 1,
        name: 1,
        address: 1,
        collectionName: 1,
        collectionSymbol: 1,
        externalLink: 1,
        imageUrl: 1,
        smallImageUrl: 1,
        animationUrl: 1,
        standard: 1,
        market: 1,
        pendingTrxs: 1,
        currentBasePrice: 1,
        paymentToken: 1,
        marketUrl: 1,
        marketplace: 1,
        tokenId: 1,
        priceInfo: 1,
        tokenReserves: 1,
        ethReserves: 1,
        sudoPoolAddress: 1,
        sellOrders: 1,
        startingPrice: 1,
        rarityScore: 1,
      },
      limit: parsedBody.limit,
      offset: parsedBody.offset,
      markets: [],
      status: ['buy_now'],
    });
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      'x-api-key': 'iMHRYlpIXs3zfcBY1r3iKLdqS2YUuOUs',
      origin: ' https://www.gem.xyz',
    };
    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: postBody,
      redirect: 'follow',
    };
    try {
      const response = await fetch(API_ENDPOINT, requestOptions);
      const data = await response.json();
      return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error }),
      };
    }
  }
}
