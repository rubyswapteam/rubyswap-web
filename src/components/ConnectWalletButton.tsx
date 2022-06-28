export default function ConnectWalletButton() {
  return (
    <div className="flex items-center hidden lg:flex">
      <div className="flex-shrink-0">
        <div
          className="border-2 p-0.5 h-10 border-gray-300 dark:border-gray-600 cursor-pointer rounded-xl flex
        justify-center items-center hover:border-gray-500 hover:shadow text-sm font-bold text-gray-700
        dark:text-gray-100 px-3"
        >
          Connect Wallet
        </div>
      </div>
    </div>
  );
}
