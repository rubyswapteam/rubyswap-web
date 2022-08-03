const { createClient } = require('@supabase/supabase-js');

// Connect to our database
const supabase = createClient(
  'https://mqxsyzoydluqyuigceuy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
);

// Our standard serverless handler function
export async function handler(event) {
  // Insert a row
  const { data, error } = await supabase
    .from('CollectionUpdates')
    .select('*')
    .ilike('contractAddress', event.queryStringParameters.contract)
    .order('timestamp', { ascending: false });

  return { statusCode: 200, body: JSON.stringify(data) };
}

// export async function handler(event) {
//   const API_ENDPOINT =
//     'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/ContractSlugMapping';

//   var requestOptions = {
//     method: 'GET',
//     headers: headers,
//     body: event.body,
//     redirect: 'follow',
//   };

//   try {
//     const response = await fetch(API_ENDPOINT, requestOptions);
//     // const data = await response.json();
//     return { statusCode: 200, body: JSON.stringify(data) };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error }),
//     };
//   }
// }
