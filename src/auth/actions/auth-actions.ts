import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

export const signInUser = async (email: string, password: string) => {
  if (!email || !password) return null;

  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return await createUser({ email, password });

  const isPasswordValid = bcrypt.compareSync(password, user.password ?? '');
  if (!isPasswordValid) return null;
  return user;
};

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.create({ email, password });
  return user;
};

export const getUserServerSession = async () => {
  const sesion = await getServerSession(authOptions);

  return sesion?.user;
};
