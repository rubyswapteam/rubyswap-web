import React from 'react';

export default function StarIcon(props: any) {
  return (
    <div className="w-4/5 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
      <div
        className={'bg-blue-600 h-1 rounded-full'}
        style={{
          width: `${Math.min(
            (props.value * 100) / props.maxValue,
            100,
          ).toString()}%`,
        }}
      ></div>
    </div>
  );
}
