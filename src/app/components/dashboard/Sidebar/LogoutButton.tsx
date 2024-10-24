'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';
import { IoLogInOutline, IoShieldOutline } from 'react-icons/io5';

export const LogoutButton = () => {
  const { status } = useSession();

  if (status === 'loading')
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    );

  if (status === 'unauthenticated')
    return (
      <div>
        <button
          onClick={() => signIn()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group"
        >
          <IoLogInOutline />
          <span className="group-hover:text-gray-700">Ingresar</span>
        </button>
      </div>
    );

  return (
    <div>
      <button
        onClick={() => signOut()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group"
      >
        <CiLogout />
        <span className="group-hover:text-gray-300">Logout</span>
      </button>
    </div>
  );
};
