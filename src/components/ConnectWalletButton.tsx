interface Props {
  connectWallet: any;
}

export default function ConnectWalletButton(props: Props) {
  return (
    <button
      type="button"
      className="w-full inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-xs text-center justify-center leading-4 font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={() => props.connectWallet()}
    >
      Connect Wallet
    </button>
  );
}
