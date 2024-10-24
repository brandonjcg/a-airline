'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ icon, path, title }: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
          isActive
            ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : 'text-gray-800 bg-gray-300'
        }`}
      >
        <div>{icon}</div>
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
