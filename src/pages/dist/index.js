"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@headlessui/react");
function Index() {
    var baseUrl = 'https://rubyappxyz.s3.eu-west-2.amazonaws.com/';
    var images = ['collections', 'overview', 'listings'];
    var count = react_1.useRef(-2);
    var _a = react_1.useState(''), image = _a[0], setImage = _a[1];
    react_1.useEffect(function () {
        count.current = (count.current + 1) % 3;
        setImage(images[count.current]);
        var interval = setInterval(function () {
            count.current = (count.current + 1) % 3;
            setImage(images[count.current]);
        }, 4000);
        return function () { return clearInterval(interval); };
    }, []);
    return (React.createElement("div", { className: "text-center flex flex-col items-center justify-center h-screen" },
        count.current < 0 && (React.createElement("div", { className: "flex-row flex items-center justify-center mb-8 px-3 py-2 rounded-lg" },
            React.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                React.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                React.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })))),
        React.createElement(react_2.Transition, { show: count.current >= 0, enter: "transition-opacity duration-200", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "transition-opacity duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", className: "flex-col justify-center items-center" },
            React.createElement(React.Fragment, null,
                React.createElement("div", { className: "flex-row flex items-center justify-center mb-8 px-3 py-2 rounded-lg" },
                    React.createElement("div", { className: "text-base font-bold text-transparent bg-clip-text bg-cover bg-theme-gradient pt-1" }, "Ruby"),
                    React.createElement("img", { className: "h-5 w-5", src: "https://rubyappxyz.s3.eu-west-2.amazonaws.com/verifiedBadge.svg" }),
                    React.createElement("div", { className: "text-lg h-8 border-l border-gray-200 mx-3" }),
                    React.createElement("div", { className: "text-base pt-1" }, 'Coming Soon')),
                React.createElement("div", { className: "w-full mx-auto justify-center text-center items-center flex" },
                    React.createElement("img", { className: "w-4/5 md:w-2/3 lg:w-1/2 mx-5 drop-shadow-lg animate-float aspect-auto justify-center items-center", src: baseUrl + image + '.png' }))))));
}
exports["default"] = Index;
