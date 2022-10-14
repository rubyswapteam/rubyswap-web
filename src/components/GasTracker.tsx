import GasIcon from './GasIcon';

export function GasTracker(props: any) {
  return (
    <div className="my-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer">
      <div className="flex items-center border border-white/10 bg-white/10 hover:bg-white/20 transition-colors rounded-md py-1 px-2">
        <GasIcon height={15} width={15} />
        <div className="pt-1">{props.item}</div>
      </div>
    </div>
  );
}
