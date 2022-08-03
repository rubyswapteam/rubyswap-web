"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function formatText(text) {
    if (!text)
        return '';
    var newText = text.split('\n').join('<br />');
    newText = convertBolds(newText);
    newText = convertTags(newText);
    console.log(newText);
    newText = convertUrl(newText);
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
function convertUrl(text) {
    var alteredString = function (str) {
        return "<a class='font-semibold text-[#3366ff]' target='_blank' rel='noopener noreferrer'>" + str + "</a>";
    };
    return text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm, alteredString);
}
function CollectionAnnouncementBanner(props) {
    return (React.createElement(link_1["default"], { href: props.route, passHref: true },
        React.createElement("div", { className: "max-w-8xl mx-auto pb-4 px-4 sm:px-6 md:px-8 flex w-full text-sm cursor-pointer" },
            React.createElement("div", { className: "w-full bg-white drop-shadow border-l-4 border-gray-800" },
                React.createElement("div", { className: "" }),
                React.createElement("div", { className: "mx-auto md:flex items-center justify-between" },
                    React.createElement("div", { className: "px-4 md:pl-8 md:pr-2 py-4" },
                        React.createElement("div", { className: "text-gray-900 mb-3 font-semibold md:max-w-xl" }, "Latest Annoucement:"),
                        React.createElement("div", { className: "text-gray-900 font-medium md:max-w-xl", dangerouslySetInnerHTML: { __html: formatText(props === null || props === void 0 ? void 0 : props.message) } })),
                    React.createElement("div", { className: "p-2 md:py-0 text-center" },
                        React.createElement("a", { className: "block md:inline-block px-4 py-2 rounded-md hover:bg-gray-100 font-medium text-gray-900" }, "Read More \u2192")))))));
}
exports["default"] = CollectionAnnouncementBanner;
