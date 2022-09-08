"use strict";
exports.__esModule = true;
function SocialsWrapper(_a) {
    var children = _a.children, link = _a.link;
    return (React.createElement(React.Fragment, null, link && (React.createElement("a", { target: "_blank", href: link, rel: "noopener noreferrer", onClick: function (event) { return event.stopPropagation(); }, className: "self-center" },
        React.createElement("main", null, children)))));
}
exports["default"] = SocialsWrapper;
