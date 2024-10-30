import { redirect } from 'next/navigation';
import { getUserServerSession } from '@/auth';
import { DataTable } from '../components';
import { columns } from './columns';

export default async function Dashboard() {
  const user = await getUserServerSession();
  if (!user) redirect('api/auth/signin');

  return (
    <>
      <DataTable columns={columns} requiredPagination={false} />
    </>
  );
}
