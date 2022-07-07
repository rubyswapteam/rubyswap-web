"use strict";
exports.__esModule = true;
var document_1 = require("next/document");
function Document() {
    return (React.createElement(document_1.Html, null,
        React.createElement(document_1.Head, null,
            React.createElement("link", { href: "/dist/output.css", rel: "stylesheet" })),
        React.createElement("body", null,
            React.createElement(document_1.Main, null),
            React.createElement(document_1.NextScript, null))));
}
exports["default"] = Document;
