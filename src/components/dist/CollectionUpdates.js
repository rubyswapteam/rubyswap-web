"use strict";
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
    var newText = text.split('\n').join('<br />');
    newText = convertBolds(newText);
    newText = convertTags(newText);
    newText = convertUrls(newText);
    return newText;
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
    var _a;
    var _b = react_2.useState(false), enabled = _b[0], setEnabled = _b[1];
    return (React.createElement("div", { className: "px-4 sm:px-6 md:px-8 pb-80" },
        React.createElement(react_1.Switch.Group, { as: "div", className: "flex items-center" },
            React.createElement(react_1.Switch, { checked: enabled, onChange: setEnabled, className: classNames(enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200') },
                React.createElement("span", { "aria-hidden": "true", className: classNames(enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200') })),
            React.createElement(react_1.Switch.Label, { as: "span", className: "ml-3" },
                React.createElement("span", { className: "text-sm font-medium text-gray-900" }, "Holder Only"))),
        ".",
        ((_a = props.updates) === null || _a === void 0 ? void 0 : _a.length) > 1 &&
            props.updates.map(function (update) {
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
