import GasIcon from './GasIcon';

export function GasTracker(props: any) {
  return (
    <div className="my-4 p-2 text-xs font-medium text-gray-600 dark:text-gray-300">
      <div className="flex items-center">
        <GasIcon height={15} width={15} />
        <div className="pt-1">{props.item}</div>
      </div>
    </div>
  );
}
