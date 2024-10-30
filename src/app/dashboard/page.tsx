import { redirect } from 'next/navigation';
import { getUserServerSession } from '@/auth';
import { columns } from './columns';
import { DataTable } from '../components';

export default async function Dashboard() {
  const user = await getUserServerSession();
  if (!user) redirect('api/auth/signin');

  return (
    <>
      <DataTable columns={columns} requiredPagination={false} />
    </>
  );
}
