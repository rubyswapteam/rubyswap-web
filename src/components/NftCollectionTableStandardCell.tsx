import EthereumIcon from './EthereumIcon';

export default function NftCollectionTableStandardCell(props: any) {
  return (
    <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center">
      <div className="flex items-center">
        <div className="pt-1">{props?.value}</div>
        {props?.includeIcon && (
          <div className="pl-1.5">
            <EthereumIcon width={16} height={16} />
          </div>
        )}
      </div>
    </td>
  );
}
