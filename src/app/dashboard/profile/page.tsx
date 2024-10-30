import { getUserServerSession } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const user = await getUserServerSession();
  if (!user) redirect('../api/auth/signin');

  return (
    <div>
      <h1>Profile</h1>
      <hr />

      <div className="flex flex-col">
        <h2>User server side</h2>
        <span>{user?.email || 'No data'}</span>
        <span>{user?.name || 'No data'}</span>
        <span>{user?.image || 'No data'}</span>
      </div>
    </div>
  );
}
