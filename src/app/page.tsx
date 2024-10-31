import { redirect } from 'next/navigation';
// import { getUserServerSession } from '@/auth/actions/auth-actions';

export default async function Home() {
  // const user = await getUserServerSession();
  // if (!user) redirect('api/auth/signin');

  redirect('dashboard');
}
