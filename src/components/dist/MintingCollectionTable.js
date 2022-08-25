"use strict";
exports.__esModule = true;
var moment_1 = require("moment");
var link_1 = require("next/link");
var react_1 = require("react");
function MintingCollectionTable() {
    var _a = react_1.useState(undefined), data = _a[0], setData = _a[1];
    var _b = react_1.useState(0), lastFetch = _b[0], setLastFetch = _b[1];
    react_1.useEffect(function () {
        console.log('useEffect');
        fetchData();
        var interval = setInterval(function () {
            fetchData();
        }, 60000);
        return function () { return clearInterval(interval); };
    }, []);
    var fetchData = function () {
        var lastFetchSS = Number(sessionStorage.getItem('r-tnct-lf'));
        var refreshTime = moment_1["default"]().unix() - 30;
        if ((lastFetchSS && lastFetchSS < refreshTime) || lastFetch < refreshTime) {
            try {
                fetchDbData();
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            var collectionString = sessionStorage.getItem('r-tnct-ftc');
            var collections = collectionString
                ? JSON.parse(collectionString)
                : null;
            if (collections) {
                var time = Number(sessionStorage.getItem('r-tnct-lf'));
                applyUpdate(collections, time, false);
            }
            else {
                sessionStorage.removeItem('r-tnct-lf');
                sessionStorage.removeItem('r-tnct-ftc');
                fetchDbData();
            }
        }
    };
    function fetchDbData() {
        fetch('/.netlify/functions/getDbMints', {
            method: 'POST',
            body: JSON.stringify({ mins: 30 }),
            redirect: 'follow'
        }).then(function (res) {
            return res.json().then(function (result) {
                var time = moment_1["default"]().unix();
                applyUpdate(result, time);
            });
        });
    }
    function applyUpdate(dataIn, time, persist) {
        if (persist === void 0) { persist = true; }
        setData(dataIn.slice(0, 50));
        setLastFetch(time);
        if (persist) {
            sessionStorage.setItem('r-mct-di', JSON.stringify(data));
            sessionStorage.setItem('r-mct-lf', time.toString());
        }
    }
    return (React.createElement("div", { className: "flex flex-col" }, data && (React.createElement("div", null, data.map(function (row, i) { return (React.createElement(link_1["default"], { key: row.address, href: "/collection/" + row.slug, prefetch: false },
        React.createElement("div", { className: "flex hover:bg-gray-100 dark:hover:bg-white/5 p-3 gap-x-3" },
            React.createElement("img", { src: row.imageUrl, className: "h-5 w-5" }),
            React.createElement("div", null, row.name),
            React.createElement("div", null, row.address),
            React.createElement("div", null, "minted: " + row.total),
            React.createElement("div", null, "change: " + row.total / row.prev)))); })))));
}
exports["default"] = MintingCollectionTable;
