"use strict";
exports.__esModule = true;
exports.EthPriceTracker = void 0;
var react_1 = require("react");
var EthereumIcon_1 = require("./EthereumIcon");
function EthPriceTracker() {
    var _a = react_1.useState(''), error = _a[0], setError = _a[1];
    var _b = react_1.useState(false), isLoaded = _b[0], setIsLoaded = _b[1];
    var _c = react_1.useState([]), item = _c[0], setItem = _c[1];
    var fetchData = function () {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
            .then(function (res) { return res.json(); })
            .then(function (result) {
            setIsLoaded(true);
            setItem(result.ethereum.usd);
            setError('');
        }, function (error) {
            setIsLoaded(true);
            setError(error.message);
        });
    };
    react_1.useEffect(function () {
        fetchData();
        var interval = setInterval(function () {
            fetchData();
        }, 10000);
        return function () { return clearInterval(interval); };
    }, []);
    return (React.createElement("div", { className: "my-4 p-2 text-xs font-medium text-gray-600 dark:text-gray-300" },
        error && React.createElement("div", null,
            "Error: ",
            error),
        !error && !isLoaded && React.createElement("div", null, "Loading..."),
        !error && isLoaded && (React.createElement("div", { className: "flex items-center" },
            React.createElement(EthereumIcon_1["default"], { height: 15, width: 15 }),
            React.createElement("div", { className: "pt-1" }, item)))));
}
exports.EthPriceTracker = EthPriceTracker;
