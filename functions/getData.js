const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async () => {
  return {
    body: 'test',
    statusCode: 200,
    headers: headers,
  };
};
