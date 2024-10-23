import { notFound, redirect } from 'next/navigation';
import { ISeed } from '@/models';
import { getUserServerSession } from '@/auth/actions/auth-actions';

const getSeeds = async (): Promise<ISeed[]> => {
  try {
    const data = await fetch('http://localhost:3000/api/seed', {
      cache: 'force-cache',
    }).then((res) => res.json());

    return data?.data;
  } catch (error) {
    console.log(
      `🚀 ${new Date().toLocaleString('en-US', { timeZone: 'America/Tijuana', hour12: false })} ~ getSeeds ~ error:`,
      error,
    );
    notFound();
  }
};

export default async function Home() {
  const user = await getUserServerSession();
  if (!user) redirect('api/auth/signin');

  const data = await getSeeds();
  return (
    <div>
      <h1>Seed</h1>
      <ul>{data?.map((seed) => <li key={seed._id}>{seed.name}</li>)}</ul>
    </div>
  );
}
