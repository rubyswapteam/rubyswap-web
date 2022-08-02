"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
/* This example requires Tailwind CSS v2.0+ */

var react_1 = require("react");

var react_2 = require("@headlessui/react");

var react_3 = require("react");

var MarketplaceProviderContext_1 = require("@/contexts/MarketplaceProviderContext");

var react_jazzicon_1 = require("react-jazzicon");

function SearchModal(props) {
  var _this = this;

  var _a = react_1.useState(''),
      searchTerm = _a[0],
      setSearchTerm = _a[1];

  var _b = react_1.useState(false),
      isLoading = _b[0],
      setIsLoading = _b[1];

  var _c = react_1.useState([]),
      searchResults = _c[0],
      setSearchResults = _c[1];

  var getCollectionBySlug = MarketplaceProviderContext_1.useMarketplaceProvider().getCollectionBySlug;

  function reset() {
    setSearchResults([]);
    setSearchTerm('');
  }

  function handleClick(e) {
    e.stopPropagation();
  }

  react_1.useEffect(function () {
    var isSubscribed = true;

    var fetchData = function fetchData(q) {
      return __awaiter(_this, void 0, void 0, function () {
        var json, osMetadataArr, API_URL, response, osMetadataPromise, i, contract, metadata;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              json = {};
              osMetadataArr = [];
              if (!isSubscribed) return [3
              /*break*/
              , 3];
              API_URL = "/.netlify/functions/searchNftsMoralis?chain=eth&q=" + q;
              return [4
              /*yield*/
              , fetch(API_URL, {
                method: 'GET',
                redirect: 'follow'
              })];

            case 1:
              response = _a.sent();
              return [4
              /*yield*/
              , response.json()];

            case 2:
              // convert the data to json
              json = _a.sent();
              json.result = json.result.reduce(function (prevVal, currVal) {
                if (prevVal.length == 0 || !prevVal.find(function (val) {
                  return val.token_address == currVal.token_address;
                })) {
                  prevVal.push(currVal);
                }

                return prevVal;
              }, []);
              osMetadataPromise = [];

              for (i = 0; i < json.result.length; i++) {
                contract = json.result[i].token_address;
                metadata = fetch("/.netlify/functions/getSlugX2Y2?contract=" + contract, {
                  method: 'GET',
                  redirect: 'follow'
                }).then(function (metadata) {
                  return metadata === null || metadata === void 0 ? void 0 : metadata.json().then(function (metadataJson) {
                    var _a;

                    return getCollectionBySlug((_a = metadataJson === null || metadataJson === void 0 ? void 0 : metadataJson.data) === null || _a === void 0 ? void 0 : _a.slug, false, false, true);
                  }).then(function (osMetadata) {
                    osMetadataArr.push(osMetadata), setSearchResults(osMetadataArr.filter(function (data) {
                      return data;
                    }));
                  });
                });
              }

              console.log(osMetadataArr); // set state with the result

              if (isSubscribed) {
                setSearchResults(osMetadataArr);
              }

              _a.label = 3;

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    setIsLoading(true);
    var delayDebounceFn = setTimeout(function () {
      if (searchTerm.length > 2) {
        console.log(searchTerm);
        fetchData(searchTerm)["catch"](console.error);
        setIsLoading(false);
      }
    }, 500);
    return function () {
      clearTimeout(delayDebounceFn);
      isSubscribed = false;
    };
  }, [searchTerm]);
  return react_3["default"].createElement(react_2.Transition.Root, {
    show: props.open,
    as: react_1.Fragment
  }, react_3["default"].createElement(react_2.Dialog, {
    as: "div",
    className: "relative z-50",
    onClose: function onClose() {
      props.setOpen(false);
      reset();
    }
  }, react_3["default"].createElement(react_2.Transition.Child, {
    as: react_1.Fragment,
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }, react_3["default"].createElement("div", {
    className: "fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100",
    onClick: function onClick() {
      props.setOpen(false);
      reset();
    }
  })), react_3["default"].createElement("div", {
    onClick: function onClick() {
      props.setOpen(false);
      reset();
    },
    className: "fixed z-10 inset-0 overflow-y-auto"
  }, react_3["default"].createElement("div", {
    className: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
  }, react_3["default"].createElement(react_2.Transition.Child, {
    as: react_1.Fragment,
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
    enterTo: "opacity-100 translate-y-0 sm:scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
    leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  }, react_3["default"].createElement("div", {
    className: "relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100"
  }, react_3["default"].createElement("div", {
    className: "overflow-hidden rounded-lg bg-white shadow-md",
    id: "headlessui-dialog-panel-26",
    onClick: function onClick(e) {
      return handleClick(e);
    }
  }, react_3["default"].createElement("div", {
    className: "relative"
  }, react_3["default"].createElement("input", {
    className: "block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6",
    placeholder: "Search collections...",
    "aria-label": "Search components",
    id: "headlessui-combobox-input-27",
    role: "combobox",
    type: "text",
    "aria-expanded": "false",
    autoComplete: "off",
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    }
  }), react_3["default"].createElement("svg", {
    className: "pointer-events-none absolute top-4 right-4 h-6 w-6 fill-slate-400",
    xmlns: "http://www.w3.org/2000/svg"
  }, react_3["default"].createElement("path", {
    d: "M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"
  })))), react_3["default"].createElement(react_2.Transition.Child, {
    as: react_1.Fragment,
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
    enterTo: "opacity-100 translate-y-0 sm:scale-100",
    leave: "ease-in duration-500",
    leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
    leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  }, react_3["default"].createElement("div", {
    className: "h-64 bg-white rounded-lg w-full mt-5 shadow-md overflow-scroll",
    onClick: function onClick(e) {
      return handleClick(e);
    }
  }, searchResults.map(function (res) {
    return react_3["default"].createElement("div", {
      className: "hover:bg-gray-50",
      key: res === null || res === void 0 ? void 0 : res.contractAddress
    }, res && react_3["default"].createElement("div", {
      className: "px-4 py-2 flex"
    }, (res === null || res === void 0 ? void 0 : res.image) && react_3["default"].createElement("img", {
      className: "h-12 w-12 rounded-full",
      src: res === null || res === void 0 ? void 0 : res.image
    }), !(res === null || res === void 0 ? void 0 : res.image) && react_3["default"].createElement(react_jazzicon_1["default"], {
      diameter: 45,
      seed: react_jazzicon_1.jsNumberForAddress(res.contractAddress)
    }), react_3["default"].createElement("div", {
      className: "text-left text-sm ml-3"
    }, react_3["default"].createElement("div", null, res.name), react_3["default"].createElement("div", {
      className: "text-gray-600"
    }, res.contractAddress))));
  })))))))));
}

exports["default"] = SearchModal;