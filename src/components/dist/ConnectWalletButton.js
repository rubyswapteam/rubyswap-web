"use strict";
exports.__esModule = true;
function ConnectWalletButton(props) {
    return (React.createElement("button", { type: "button", className: "w-full inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-xs text-center justify-center leading-4 font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500", onClick: function () { return props.connectWallet(); } }, "Connect Wallet"));
}
exports["default"] = ConnectWalletButton;
