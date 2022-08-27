import React, { useState } from 'react';
import { useEffect } from 'react';

export default function StarIcon(props: any) {
  const [pc, setPc] = useState<number>(
    Math.min((props.value * 100) / props.maxValue, 100),
  );
  const [colour, setColour] = useState<string>(getColour());

  function getColour(val = pc): string {
    if (val) {
      return val < 20
        ? 'bg-red-600'
        : val < 40
        ? 'bg-orange-600'
        : 'bg-green-600';
    } else {
      return '';
    }
  }

  useEffect(() => {
    const newPc = Math.min((props.value * 100) / props.maxValue, 100);
    setPc(newPc);
    setColour(getColour(newPc));
  }, [props, props.value, props.maxvalue]);

  return (
    <div className="w-4/5 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
      <div
        className={colour + ' h-1 rounded-full'}
        style={{
          width: `${pc.toString()}%`,
        }}
      ></div>
    </div>
  );
}
