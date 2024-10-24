import { redirect } from 'next/navigation';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { Table } from '../components';

export const metadata = {
  title: 'Dashboard',
  layout: 'dashboard',
};

export default async function Dashboard() {
  const user = await getUserServerSession();
  if (!user) redirect('api/auth/signin');

  return (
    <>
      <Table />
    </>
  );
}
