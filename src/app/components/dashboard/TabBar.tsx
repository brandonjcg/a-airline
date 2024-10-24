'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ currentTab, tabOptions = [1, 2, 3] }: Props) => {
  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();

  const onClickTab = (tab: number) => {
    setSelected(tab);
    router.refresh();
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${
        'grid-cols-' + tabOptions.length
      }`}
    >
      {tabOptions.map((item) => (
        <div key={item}>
          <input
            type="radio"
            id="1"
            className="peer hidden"
            checked={selected === item}
            onChange={() => {}}
          />
          <label
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => onClickTab(item)}
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};
