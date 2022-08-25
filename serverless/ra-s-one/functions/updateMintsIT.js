'use-strict';
import fetch from 'node-fetch';
import moment from 'moment';

const supabase =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E';

const itPostHeaders = {
  'apollographql-client-name': 'icy.tools Web Client',
  'apollographql-client-version': '303d16eb4d98834acde5adbc3dbd30829bb5063a',
  'x-security-token': '5dda2a8a-4bfa-44bf-931a-a5311f6e8dba',
  'Content-Type': 'application/json',
};

const itPostBody = {
  operationName: 'TrendingMints',
  variables: {
    filter: {
      period: 'ONE_MINUTE',
    },
  },
  query:
    'query TrendingMints($filter: TrendingMintsFilterInput) {\n  trendingMints(filter: $filter) {\n    ...TrendingMint\n    __typename\n  }\n}\n\nfragment TrendingMint on TrendingMint {\n  count\n  distinct\n  firstMintedAt\n  index\n  sum\n  distinctSum\n  estMintCost\n  avgTxFeeInEth\n  avgGasPriceInGwei\n  maxSupply\n  address\n  description\n  discordUrl\n  externalUrl\n  imageUrl\n  instagramUsername\n  name\n  slug\n  symbol\n  telegramUrl\n  twitterUsername\n  uuid\n  icySlug\n  deltaStats {\n    count\n    index\n    __typename\n  }\n  __typename\n}',
};

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
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates',
};

const x = [
  {
    addy: '0x690626a28676301c3254ce909d4eb0437ebfade3',
    slug: 'pettfam',
    description:
      'welcome to Petty✨\n7,777 Petty✨ Treasure hunt🏹 Updating utilities🚀\n',
    discord: 'https://discord.gg/XCPuwQ2WQ3',
    img: 'https://openseauserdata.com/files/c1a3db4445251abc0dccab5e62d4dc02.jpg',
    insta: null,
    name: 'Pettyfam',
    twitter: 'petty_fam_',
    uniqueminters: 1823,
    totalsupply: 7776,
    maxsupply: 7777,
    updatedat: 1661363637,
    website: 'https://pettyfam.ngrok.io/',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xc60136888d270a74c78c347438c1ef11507087ee',
    slug: 'toshimeta-genesis',
    description:
      'The Toshimeta NFT collection consists of 2,500 unique Urban ninjas, inspired by street culture and anime from the 90’s. The collection contains a mixture of male and female characters and each individual hand drawn piece has a randomly selected allocation of unique traits.',
    discord: 'https://discord.gg/toshimeta',
    img: 'https://openseauserdata.com/files/eb6e9ac9a96995245ee1916aab3c2388.gif',
    insta: null,
    name: 'Toshimeta Genesis',
    twitter: null,
    uniqueminters: 1322,
    totalsupply: 1725,
    maxsupply: 2500,
    updatedat: 1661363637,
    website: 'http://toshimeta.io',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x872a7537861e74b892b52246f017703872c46602',
    slug: 'balatroon',
    description:
      '[WOB website](https://balatroon.world) | [GOB Website](https://goonsofbalatroon.com) | [GOB Avatars](https://opensea.io/collection/goonsofbalatroon) | [Goon Bods](https://opensea.io/collection/goonbods) | [Buy Card Packs](https://goonsofbalatroon.com/store) | [Join us on Discord](https://discord.gg/goonsnft) \n\nA 2D/3D hybrid metaverse featuring Free 2 Play 2 Earn card strategy gaming and land ownership. Ridiculous. Chaotic. Fun. Play for free and earn!\n\nA STRANGE WORLD\n\nTwo crazy Bull and Bear scientists travel 9,696 years back in time to find themselves in a strange but beautiful world. \nJoin them on an epic blockchain-powered gaming adventure across diverse lands, riddled with absurd creatures, exotic relics and bountiful resources.\n\n\n[Balatroon](https://balatroon.world) is yours to discover, what are you waiting for?',
    discord: 'https://discord.gg/goonsNFT',
    img: 'https://lh3.googleusercontent.com/1P_9-ChyyQ1fny4O0gbJ_N6jdtlpYXmOE64J5hA7UdSRy3MLfNPs-SaWAIC5Fw2rfGvnw2_YR60C_qkMzGyXkt7kZFiwzJ8CZvgT6g=s120',
    insta: null,
    name: 'World of Balatroon',
    twitter: 'balatroon',
    uniqueminters: 132,
    totalsupply: 1911,
    maxsupply: 9696,
    updatedat: 1661363637,
    website: 'https://balatroon.world',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x261a85e3b41e06c32f2c8704fb275bc541fef576',
    slug: 'freepizza',
    description: 'Feeding the underprivileged through the power of NFTS',
    discord: null,
    img: 'https://openseauserdata.com/files/5f861df37aa526a99da9921ea342123c.png',
    insta: null,
    name: 'FREEPIZZA',
    twitter: 'freepizzanft',
    uniqueminters: 69,
    totalsupply: 2260,
    maxsupply: 5000,
    updatedat: 1661363637,
    website: null,
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x4cdee5bb342bf336b092f42b40ee23f6ba2bbc7a',
    slug: 'trippy-trunkz-ivory-club-ethereum-edition',
    description:
      'Trippy Trunkz Ivory Club Ethereum edition is a collection of 5,000 elephant cuties stomping the Ethereum Blockchain. They are very cute, but extremely dangerous and badass. We advise all hunters and poachers to watch out!',
    discord: 'https://discord.gg/u8hhxs9Hg3',
    img: 'https://openseauserdata.com/files/39f84ca359bec2e74f151ec05d0002bc.gif',
    insta: 'trippy_trunkz_ivory_club/',
    name: 'Trippy Trunkz Ivory Club Ethereum Edition',
    twitter: 'TrippyTrunkz',
    uniqueminters: 23,
    totalsupply: 725,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'https://trippytrunkz.io/',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x5f86a5a2b9ac170b0f5c41ed98150e5a4099ba7e',
    slug: 'real-mutant-apes-v2',
    description:
      'You will have a unfamiliar feeling when you see real mutant apes. We focus on reflecting the apes formed in our imagination into the design. There is only 100 piece of women real mutant apes and 350 piece of man real mutant apes.',
    discord: null,
    img: 'https://openseauserdata.com/files/57c0a6697b0147797f542119b2ae94ea.png',
    insta: null,
    name: 'Real Mutant Apes V2',
    twitter: 'RealMutantApes',
    uniqueminters: 25,
    totalsupply: 450,
    maxsupply: 450,
    updatedat: 1661363637,
    website:
      'https://etherscan.io/address/0x5f86a5a2b9ac170b0f5c41ed98150e5a4099ba7e',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x799cccb6d0c57345c4dab303c81a5cdffbcdea76',
    slug: 'walter-ego',
    description:
      "Walter Ego is a human of many faces. Walter Ego likes to dress up. Walter Ego has many different alter egos. Walter Ego doesn't understand tags, he simply is. We are all Walter Ego. We are WE.",
    discord: null,
    img: 'https://lh3.googleusercontent.com/yXanp5xUiAO5M1yYxMOba6doLo2PTaTieYtpQnbcjeT1H2T7w8xj08zPpG9ph9l25fCW1N_rfDZUen4LT9-LGb9r9fZDuh4K7VVm4o0=s120',
    insta: null,
    name: 'Walter Ego',
    twitter: null,
    uniqueminters: 125,
    totalsupply: 1225,
    maxsupply: 10000,
    updatedat: 1661363637,
    website: 'https://www.open3.com/projects/walter-ego',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xa99db5a90ca34dfd81554aff67270f5b1c1a5147',
    slug: 'thegoldencircle',
    description: 'The Last Remnants of our Golden Order.',
    discord: null,
    img: 'https://openseauserdata.com/files/455df9ea9e4bb113eda674fbe3ca73e6.gif',
    insta: null,
    name: 'Golden Circle.',
    twitter: 'Goldencircleart',
    uniqueminters: 148,
    totalsupply: 334,
    maxsupply: 334,
    updatedat: 1661363637,
    website: null,
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xbe3eedda303d28e1a763106e27605247ab8e302a',
    slug: 'apemo-army',
    description:
      'After the successful release of its avatar collection “Satoshi’s Legions - The Legionnaires” in November of 2021, Apollo Entertainment and Delbo are at it again with the release of a new high fidelity animated 3D avatar collection called “the Apemo Army” which introduces to the Satoshiverse Delbo’s beloved character Captain Apemo and the part human part animal heroes that form his army. Set to be released on August 22, 2022, the collection will give collectors exclusive early access to Apollo Entertainment’s much anticipated Satoshi’s Legions play and earn video game, which the Apollo Entertainment team is developing in Unreal Engine 5 and is set to be released in Alpha in December 2022. \n\nTo learn more about Apollo Entertainment’s new collection visit: \n\nWebsite:https://www.satoshiverse.io/apemo-army\nTwitter: https://twitter.com/Satoshiverse_io\nDiscord: discord.gg/satoshiverse\n',
    discord: null,
    img: 'https://openseauserdata.com/files/3d3be6467925375054b340ab93fe8dd7.png',
    insta: null,
    name: 'Satoshiverse - The Apemo Army',
    twitter: 'Satoshiverse_io',
    uniqueminters: 613,
    totalsupply: 1784,
    maxsupply: 0,
    updatedat: 1661363637,
    website: null,
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xd8c3ab06bf9981c15c77e3c3882c1fed731aa1df',
    slug: 'bb-powergems',
    description:
      'Hey BB, we think you’re super. But like really. This collection is a celebration of the superhero in every woman. Women are strong, courageous, loyal. They have heart. They have soul. And each one has a destiny. Each Power Gem in this collection embodies one of the (many) qualities that make women powerful forces to be reckoned with. Hello world, have no fear. Super BBs are *hella* here.\r\n\r\nAll Boss Beauties holders are able to claim a Power Gem for each BB that they own. Then, combining that Gem with the BB of their choice (using a special process coming soon) create a separate, unique Super BB NFT.\r\n\r\nAnd find out more at www.superbb.club',
    discord: 'https://discord.gg/bossbeauties',
    img: 'https://lh3.googleusercontent.com/zlm565a33ZKu8xEF_u0gAWxDzA07UH_oyA6imMHM0p_VdpbxbfIxQeOCqIuK7viRu48-UrdshCKlBz1cQzy2cy_-0ow77gqIZt_b4zk=s120',
    insta: 'bossbeauties',
    name: 'Super BB Power Gems',
    twitter: 'BossBeautiesNFT',
    uniqueminters: 274,
    totalsupply: 684,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'https://www.superbb.club',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x42ddadde6e3c72bb3220e303744594217ee65822',
    slug: 'pudgydoodles-official',
    description:
      'Pudgy Doodles is a collection of 8,888 NFTs, waddling through Web3. Spreading good vibes across the rainbow and galaxy 🐧',
    discord: null,
    img: 'https://openseauserdata.com/files/cb1c165ee3316627d1ec703363441002.png',
    insta: null,
    name: 'PudgyDoodles Official',
    twitter: null,
    uniqueminters: 131,
    totalsupply: 479,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'http://www.pudgydoodles.xyz/',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xdbbd75f474f1349508c0d6c72cd0823ef05b993d',
    slug: 'def3cts',
    description:
      'The first curated AI collection on Ethereum 🤖\n\nAI Generated + Human Curated + Sudoswap + 0% Royalties + IP Rights\n\nCreated by the [Swarms](https://theswarms.ai) team\n\n🌎 Website:  https://def3cts.ai\n\n💬 Discord: https://discord.gg/def3cts',
    discord: 'https://discord.gg/def3cts',
    img: 'https://openseauserdata.com/files/09b0449c684a17b6d00243ae4a95e16f.png',
    insta: null,
    name: 'DEF3CTS',
    twitter: 'def3cts',
    uniqueminters: 114,
    totalsupply: 834,
    maxsupply: 8888,
    updatedat: 1661363637,
    website: 'https://def3cts.ai',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x7d4f52ddbf5ec05061f02a92825ba99eccb01afd',
    slug: 'lil-dragons-official',
    description: 'A Collection of 555 cute lil dragons',
    discord: null,
    img: 'https://lh3.googleusercontent.com/9or9elShYvKEnpDb7VgNKLBQk8t34SgOrGbwE3bqRjL7BvzmGLozyS1zFW-slyMPqM-mBMkILI-j7VEtfCo1XozaDAtL_KDZVL_wZDc=s120',
    insta: null,
    name: 'Lil Dragons Official',
    twitter: null,
    uniqueminters: 149,
    totalsupply: 277,
    maxsupply: 0,
    updatedat: 1661363637,
    website: null,
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x4de96f232241426718dbc8ad3175cadf09e7d5d4',
    slug: 'space-x-ships',
    description: null,
    discord: null,
    img: 'https://openseauserdata.com/files/3c71a78d713202a09142e2c6241f62ca.png',
    insta: null,
    name: 'Space X - Ships',
    twitter: null,
    uniqueminters: 27,
    totalsupply: 177,
    maxsupply: 0,
    updatedat: 1661363637,
    website: null,
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xf45353bb28b200922dce499ed12f6e52b09e3109',
    slug: 'kosherpunks',
    description:
      'WE SHALL NOT BEAR FALSE WITNESS AGAINST OUR NEIGHBOURS, our roadmap is REAL.',
    discord: null,
    img: 'https://openseauserdata.com/files/ffbddbbb3667c4212d555042d8feaace.jpg',
    insta: null,
    name: 'KosherPunks',
    twitter: 'kosherpunksnft',
    uniqueminters: 55,
    totalsupply: 157,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'http://kosherpunks.com',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x86599b800e23036d761f43d7516092447295659f',
    slug: 'asm-gen-ii-brains',
    description: null,
    discord: null,
    img: 'https://openseauserdata.com/files/94bdcabedba8cb1ed3a5f949ad1a92ee.gif',
    insta: null,
    name: 'ASM Gen II Brains',
    twitter: null,
    uniqueminters: 980,
    totalsupply: 12971,
    maxsupply: 0,
    updatedat: 1661363637,
    website: null,
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xa5349c4097607e54fe9c5426f5e882f70d0bce68',
    slug: 'pudgy-penguins-girls',
    description:
      'Pudgy Penguins Girls is a collection of 8,888 NFTs, waddling through Web3 and a beacon of positivity in the NFT Space\n\nhttps://pudgypenguinsgirls.xyz/',
    discord: null,
    img: 'https://openseauserdata.com/files/ff0a60f22373c4530215d0370238212f.gif',
    insta: null,
    name: 'Pudgy Penguins Girls',
    twitter: 'GirlsPudgy',
    uniqueminters: 1,
    totalsupply: 101,
    maxsupply: 8888,
    updatedat: 1661363637,
    website: 'https://pudgypenguinsgirls.xyz/',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270',
    slug: 'qxj0iejsb2nrcybqdxjnyxrvcnk',
    description:
      'Art Blocks are split out into three categories: Curated, Factory, and Playground. Curated is the most strictly curated offering, Factory allows artists who do not wish to wait for approval by the Curation Board a place to launch their generative art, and Playground is the place where artists who have previously been approved for curated drops are encouraged to play and innovative. More breakouts on individual projects coming soon!',
    discord: 'https://discord.gg/artblocks',
    img: 'https://lh3.googleusercontent.com/GwnosrkaneKGEkWySxvTSzZ5bEUjWkRuQzLSNfrpgy2-gxYjoR3m5PohLT9Fzy0p1tohajZ1g-LFfF_ZLnS1GqlPNHPUaKUbDhbf=s120',
    insta: 'artblocks_io',
    name: 'Art Blocks',
    twitter: 'artblocks_io',
    uniqueminters: 37493,
    totalsupply: 186344,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'https://artblocks.io',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    slug: 'ens',
    description:
      'Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.',
    discord: null,
    img: 'https://lh3.googleusercontent.com/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ=s60',
    insta: null,
    name: 'ENS: Ethereum Name Service',
    twitter: 'ensdomains',
    uniqueminters: 5560,
    totalsupply: 1937681,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'https://ens.domains',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
  {
    addy: '0x4ba0625052a8604e9d4fedb1728316a31e5506fd',
    slug: 'otterverse-genesis',
    description:
      'Otterverse is a collection of 999 with a team dedicated to providing value to the holders.',
    discord: 'https://discord.gg/otterverse',
    img: 'https://lh3.googleusercontent.com/nZ1jdGk4y-liENGucBNKd08z9t3WvlRO9Ly9lSX1wo2tF7e4tB4kHe4AtyZ9jH__HgKucd7n0V2U55aor6HeskWJ4_toYqKq3C_20A=s120',
    insta: null,
    name: 'Otterverse Genesis',
    twitter: 'Otterverse_NFT',
    uniqueminters: 199,
    totalsupply: 228,
    maxsupply: 0,
    updatedat: 1661363637,
    website: 'https://www.otterverse.io/',
    chain: 1,
    holders: null,
    floor: null,
    firstmint: null,
    mintprice: null,
    verified: null,
  },
];

export async function handler() {
  const timestamp = Math.floor(moment().unix());

  try {
    const rawData = await fetch('https://api.icy.tools/graphql', {
      method: 'POST',
      headers: itPostHeaders,
      body: JSON.stringify(itPostBody),
      redirect: 'follow',
    });
    const data = (await rawData.json()).data.trendingMints;
    const collections = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const collection = {
        addy: row.address.toLowerCase(),
        slug: row.slug || '',
        description: row.description || null,
        discord: row?.discordUrl || null,
        img: row?.imageUrl || null,
        insta: row?.instagramUsername || null,
        name: row?.name || null,
        twitter: row?.twitterUsername || null,
        uniqueminters: Math.floor(row?.distinctSum),
        totalsupply: Math.floor(row?.sum),
        maxsupply: Math.floor(row?.maxSupply),
        updatedat: Math.floor(timestamp),
        website: row?.externalUrl || null,
        chain: 1,
        holders: null,
        floor: null,
        firstmint: null,
        mintprice: null,
        verified: null,
      };
      collections.push(collection);
    }

    var supabaseRequestOptions = {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({ payload: collections }),
      redirect: 'follow',
    };

    console.log(supabaseRequestOptions);

    const responseSupabase = await fetch(
      'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/rpc/persistmints',
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