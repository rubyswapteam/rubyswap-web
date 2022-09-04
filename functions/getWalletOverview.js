import fetch from 'node-fetch';

const headers = {
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiODljZWY3NWItNTNlMC00OTE5LWEwZGEtMjIzMzRiZTVlNDM2IiwibmFtZSI6IjB4MkVGMTYzMDk5M2JDNTY5YTE4RjhDNDA2YWI3MjBFMmQwNDBFMTU1QSIsInVzZXJuYW1lIjoiMHgyRUYxNjMwOTkzYkM1NjlhMThGOEM0MDZhYjcyMEUyZDA0MEUxNTVBIiwiZW1haWwiOm51bGwsImltYWdlIjpudWxsLCJ0aW1lem9uZSI6bnVsbCwibGFzdF9sb2dpbl9hdCI6IjIwMjItMDYtMDlUMjE6MjQ6MjguMTgwWiIsImNyZWF0ZWRfYXQiOiIyMDIyLTA2LTA5VDIxOjI0OjI4LjE4MFoiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNi0wOVQyMToyNDoyOC4xODBaIiwiZGVsZXRlZF9hdCI6bnVsbCwiZGlzY29yZF9pZCI6bnVsbCwicHJvX2V4cGlyZXNfYXQiOm51bGx9LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWluZSIsInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Ijg5Y2VmNzViLTUzZTAtNDkxOS1hMGRhLTIyMzM0YmU1ZTQzNiIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9LCJpYXQiOjE2NjE4NTg3NTksImV4cCI6MTY5MzM5NDc1OX0.SxA-WdESm3Ua1XnHa7gDSzl4H2sWuc0XOrkWRL5iHfk',
  origin: 'https://app.curio.tools',
  referer: 'https://app.curio.tools/',
  'Content-Type': 'application/json',
};

export async function handler(event) {
  const address = event.queryStringParameters.address;
  const API_ENDPOINT = 'https://splendid-asp-13.hasura.app/v1/graphql';

  if (!address) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No address supplied' }),
    };
  }

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      operationName: 'WalletAggregates',
      variables: {
        address: address,
      },
      query:
        'query WalletAggregates($address: citext!) {\n  wallet: virtual_wallet_aggregates(args: {address: $address}) {\n    collections\n    tokens\n    eth_value\n  }\n}\n',
    }),
    redirect: 'follow',
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
