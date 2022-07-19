'use strict';
exports.__esModule = true;
var Dashboard_1 = require('@/components/Dashboard');
var Layout_1 = require('@/components/Layout');
var OwnedNftCollectionTable_1 = require('@/components/OwnedNftCollectionTable');
var RefreshButton_1 = require('@/components/RefreshButton');
var SweepsNftCollectionTable_1 = require('@/components/SweepsNftCollectionTable');
var Tab_1 = require('@/components/Tab');
var TrendingNftCollectionTable_1 = require('@/components/TrendingNftCollectionTable');
var WatchlistNftCollectionTable_1 = require('@/components/WatchlistNftCollectionTable');
var nftUtils_1 = require('@/utils/nftUtils');
var router_1 = require('next/router');
function Index() {
  var router = router_1.useRouter();
  var _a = router.query,
    tab = _a.tab,
    range = _a.range;
  var primaryTabs = [
    { name: 'Trending', href: '/', current: !tab, border: true },
    {
      name: 'Sweeps',
      href: '?tab=sweeps',
      current: tab == 'sweeps',
      border: true,
    },
    {
      name: 'Watchlist',
      href: '?tab=watchlist',
      current: tab == 'watchlist',
      border: true,
    },
    {
      name: 'Owned',
      href: '?tab=owned',
      current: tab == 'owned',
      border: true,
    },
  ];
  function setBody() {
    if (!tab) {
      return React.createElement(
        'div',
        { className: 'h-inherit overflow-scroll pb-60' },
        React.createElement(TrendingNftCollectionTable_1['default'], null),
        ';',
      );
    }
    if (tab === 'sweeps') {
      return React.createElement(SweepsNftCollectionTable_1['default'], null);
    }
    if (tab === 'watchlist') {
      return React.createElement(
        WatchlistNftCollectionTable_1['default'],
        null,
      );
    }
    if (tab === 'owned') {
      return React.createElement(OwnedNftCollectionTable_1['default'], null);
    }
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Layout_1['default'],
      null,
      React.createElement(Dashboard_1['default'], {
        title: 'Browse',
        primaryTabs: React.createElement(Tab_1['default'], {
          tabs: primaryTabs,
        }),
        secondaryTabs: React.createElement(Tab_1['default'], {
          tabs: nftUtils_1.rangeTabs(tab, range),
          condense: true,
        }),
        body: setBody(),
        refresh: React.createElement(RefreshButton_1['default'], null),
      }),
    ),
  );
}
exports['default'] = Index;
