import fetch from 'node-fetch';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN',
};

export async function handler(event) {
  const API_ENDPOINT = 'https://gem-public-api.herokuapp.com/assets';

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
  });

  console.log(postBody);

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
