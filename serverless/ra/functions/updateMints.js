'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

const supabase = process.env.SUPABASE;
const alchemy = process.env.ALCHEMY;

const alchemyHeaders = {
  header: 'Content-Type: application/json',
};

const postDbHeaders = {
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

const getDbHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: `${supabase}`,
  Authorization: `Bearer ${supabase}`,
  'Content-Type': 'application/json',
};

export async function handler() {
  const timestamp = Math.floor(moment().unix());
  let pageKey = '';
  let latestMintInfo = undefined;
  let newLatestBlock = undefined;
  let index = 0;
  const tblRow = [];

  const addToTable = (obj, type, tblIndex) => {
    const objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
      const key = objKeys[i];
      tblRow.push({
        address: key,
        count: obj[key],
        type: type,
        updatedAt: timestamp,
        index: tblIndex,
      });
    }
  };
  async function fetchDbData(urlSuffix, headers, method, body = undefined) {
    const req = {
      method: method,
      headers: headers,
      redirect: 'follow',
    };
    if (body) req.body = JSON.stringify(body);
    const url = 'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/' + urlSuffix;
    const response = await fetch(url, req);
    if (method == 'GET') {
      const data = await response.json();
      return data;
    }
  }
  const ALCHEMY_API_ENDPOINT = `https://eth-mainnet.alchemyapi.io/v2/${alchemy}/`;
  try {
    latestMintInfo = await fetchDbData('LatestMintInfo', getDbHeaders, 'GET');
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }

  const newTableIndex = latestMintInfo[0].lastIndex + 1;

  let requestBody = {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromBlock: '0x' + (latestMintInfo[0].block + 1).toString(16),
        toBlock: 'latest',
        category: ['erc721', 'erc1155'],
        withMetadata: true,
        excludeZeroValue: true,
        maxCount: '0x3e8',
        fromAddress: '0x0000000000000000000000000000000000000000',
        order: 'desc',
      },
    ],
  };

  do {
    try {
      if (pageKey) {
        requestBody.params[0].pageKey = pageKey;
      }

      let alchemyRequestOptions = {
        method: 'POST',
        headers: alchemyHeaders,
        body: JSON.stringify(requestBody),
        redirect: 'follow',
      };

      const responseAlchemy = await fetch(
        ALCHEMY_API_ENDPOINT,
        alchemyRequestOptions,
      );

      const data = await responseAlchemy.json();

      if (!newLatestBlock)
        newLatestBlock = parseInt(data.result.transfers[0].blockNum);

      const contractsObj = {};
      const mintersObj = {};
      for (let i = 0; i < data.result.transfers.length; i++) {
        const transfer = data.result.transfers[i];
        contractsObj[transfer.rawContract.address] =
          (contractsObj[transfer.rawContract.address] || 0) + 1;
        mintersObj[transfer.to] = (mintersObj[transfer.to] || 0) + 1;
      }

      addToTable(contractsObj, 'contract', newTableIndex);
      addToTable(mintersObj, 'minter', newTableIndex);

      if (data.result?.pageKey) {
        pageKey = data.result?.pageKey;
      } else {
        pageKey = '';
      }
      if (pageKey !== '' && data.result.transfers[0]?.blockNum) {
        index = index + 1;
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error }),
      };
    }
  } while (pageKey !== '');

  try {
    console.log('Persist start');
    await fetchDbData('LatestMintInfo', postDbHeaders, 'POST', {
      id: 0,
      block: newLatestBlock,
      lastIndex: latestMintInfo[0].lastIndex + 1,
    });
    await fetchDbData('LiveMints', postDbHeaders, 'POST', tblRow);
    console.log('Persist end');
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify([index, newLatestBlock, tblRow.length]),
  };
}
