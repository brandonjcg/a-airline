'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Profile</h1>
      <hr />

      <div className="flex flex-col">
        <h2>User server side</h2>
        <span>{session?.user?.email || 'No data'}</span>
        <span>{session?.user?.name || 'No data'}</span>
        <span>{session?.user?.image || 'No data'}</span>
      </div>
    </div>
  );
}
