import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

export const getUserServerSession = async () => {
  const sesion = await getServerSession(authOptions);

  return sesion?.user;
};
