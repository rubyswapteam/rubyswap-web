"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var moment_1 = require("moment");
var react_2 = require("react");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
function formatText(text) {
    if (!text)
        return '';
    var newText = addEmojis(text);
    newText = newText.split('\n').join('<br />');
    newText = convertBolds(newText);
    newText = convertTags(newText);
    newText = convertUrls(newText);
    return newText;
}
function addEmojis(text) {
    return text.replace(/\\u([0-9A-F]{4})/gi, function (_, g) {
        return String.fromCharCode("0x" + g);
    });
}
function convertTags(text) {
    return text.replace(/(\@everyone.*?)/gm, "<a class='font-semibold bg-[#DEE0FC] p-1 rounded-md'>@everyone</a>");
}
function convertBolds(text) {
    var bold = /\*\*(.*?)\*\*/gm;
    var newText = text.replace(bold, "<a class='font-semibold'>$1</a>");
    return newText;
}
function convertUrls(text) {
    var alteredString = function (str) {
        return "<a class='font-semibold text-[#3366ff]' target='_blank' rel='noopener noreferrer' href=" + str + ">" + str + "</a>";
    };
    return text.replaceAll(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm, alteredString);
}
function CollectionUpdates(props) {
    var _this = this;
    var _a = react_2.useState(false), enabled = _a[0], setEnabled = _a[1];
    var _b = react_2.useState({}), updates = _b[0], setUpdates = _b[1];
    var _c = react_2.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    react_2.useEffect(function () {
        var isSubscribed = true;
        console.log('useEffect');
        console.log(props === null || props === void 0 ? void 0 : props.contractAddress);
        var fetchData = function (contractAddress) { return __awaiter(_this, void 0, void 0, function () {
            var collection, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('fetchData');
                        console.log(contractAddress);
                        collection = {};
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("/.netlify/functions/getDbCollectionUpdatesByContract?contract=" + contractAddress, {
                                method: 'GET',
                                redirect: 'follow'
                            })];
                    case 2: return [4 /*yield*/, (_b.sent())
                            .json()
                            .then(function (res) {
                            console.log(res);
                            res = res.map(function (item) {
                                return __assign(__assign({}, item), { data: JSON.parse(item.data) });
                            });
                            setUpdates(res);
                        })];
                    case 3:
                        collection = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        collection = [];
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, collection];
                }
            });
        }); };
        setIsLoading(true);
        var delayDebounceFn = setTimeout(function () {
            console.log(props.contractAddress);
            fetchData(props.contractAddress)["catch"](console.error);
            setIsLoading(false);
        }, 500);
        return function () {
            clearTimeout(delayDebounceFn);
            isSubscribed = false;
        };
    }, [props.contractAddress]);
    return (React.createElement("div", { className: "px-4 sm:px-6 md:px-8 pb-80" },
        React.createElement(react_1.Switch.Group, { as: "div", className: "flex items-center" },
            React.createElement(react_1.Switch, { checked: enabled, onChange: setEnabled, className: classNames(enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200') },
                React.createElement("span", { "aria-hidden": "true", className: classNames(enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200') })),
            React.createElement(react_1.Switch.Label, { as: "span", className: "ml-3" },
                React.createElement("span", { className: "text-sm font-medium text-gray-900" }, "Holder Only"))),
        ".",
        (updates === null || updates === void 0 ? void 0 : updates.length) > 1 &&
            updates.map(function (update) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                return (React.createElement(react_1.Transition, { key: update.data.id, show: !enabled || update.data.holdersOnly, enter: "transition-opacity duration-200", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "transition-opacity duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                    React.createElement("div", { className: "bg-white drop-shadow-md p-4 my-8 rounded-lg text-sm overflow-hidden" },
                        React.createElement("div", { className: "justify-between w-full flex mb-5" },
                            React.createElement("div", { className: "flex items-center" },
                                React.createElement("img", { className: "h-10 w-10 rounded-full my-auto", src: "https://cdn.discordapp.com/avatars/" + ((_b = (_a = update.data) === null || _a === void 0 ? void 0 : _a.author) === null || _b === void 0 ? void 0 : _b.id) + "/" + ((_d = (_c = update.data) === null || _c === void 0 ? void 0 : _c.author) === null || _d === void 0 ? void 0 : _d.avatar) + ".webp?size=160" }),
                                React.createElement("a", { className: "text-sm font-medium text-transparent bg-clip-text bg-cover bg-theme-gradient mx-3" }, (_f = (_e = update.data) === null || _e === void 0 ? void 0 : _e.author) === null || _f === void 0 ? void 0 : _f.username),
                                React.createElement("a", { className: "text-sm font-medium text-gray-400" }, moment_1["default"]((_g = update.data) === null || _g === void 0 ? void 0 : _g.timestamp)
                                    .local()
                                    .startOf('seconds')
                                    .fromNow())),
                            React.createElement("div", { className: "py-0.5 px-2 rounded-md bg-gray-100 self-center" }, (_h = update.data) === null || _h === void 0 ? void 0 : _h.updateType)),
                        React.createElement("div", { className: "font-bold mb-3" }, (_j = update.data) === null || _j === void 0 ? void 0 : _j.title),
                        React.createElement("div", { className: "leading-[175%]", dangerouslySetInnerHTML: {
                                __html: formatText((_k = update.data) === null || _k === void 0 ? void 0 : _k.content)
                            } }),
                        ((_l = update.data) === null || _l === void 0 ? void 0 : _l.embeds) &&
                            update.data.embeds.map(function (embed, i) {
                                if ((embed === null || embed === void 0 ? void 0 : embed.type) == 'rich')
                                    return (React.createElement("div", { className: "flex my-4" },
                                        React.createElement("div", { className: "w-1 bg-cover bg-theme-gradient bg-gray-900 flex" }),
                                        React.createElement("a", { className: "bl-2 w-full max-w-md p-4 bg-gray-100 rounded-r-md", href: embed.url, rel: "noopener noreferrer", target: "_blank" },
                                            embed.author && (React.createElement("div", { className: "flex my-2" },
                                                React.createElement("img", { className: "rounded-full h-10 w-10", src: embed.author.proxy_icon_url }),
                                                React.createElement("div", { className: "ml-2 bl-2 pt-3 w-full bg-gray-100 rounded-md font-medium" }, embed.author.name))),
                                            embed.description && (React.createElement("div", { className: "bl-2 w-full my-2 bg-gray-100 rounded-md" }, embed.description)),
                                            embed.image && (React.createElement("img", { className: "rounded-md", src: embed.image.proxy_url })),
                                            embed.thumbnail && (React.createElement("img", { className: "rounded-md", src: embed.thumbnail.proxy_url })),
                                            embed.footer && (React.createElement("div", { className: "flex my-2" },
                                                React.createElement("img", { className: "rounded-full h-5 w-5", src: embed.footer.proxy_icon_url }),
                                                React.createElement("div", { className: "ml-2 bl-2 pt-1 w-full bg-gray-100 rounded-md font-medium text-sm" }, embed.footer.text))))));
                            }),
                        React.createElement("div", { className: "mt-5" },
                            React.createElement("div", { className: "py-2 px-2 rounded-md bg-gray-100 self-center inline cursor-pointer hover:bg-gray-200" },
                                '👍',
                                " ",
                                update.data.likes)))));
            })));
}
exports["default"] = CollectionUpdates;
