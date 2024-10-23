import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

export const signInUser = async () =>
  // mail: string, password: string
  {
    // if (!email || !password) return null;
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) return await createUser(email, password);
    // const isPasswordValid = bcrypt.compareSync(password, user.password ?? '');
    // if (!isPasswordValid) return null;
    // return user;
  };

export const createUser = async () =>
  // email: string, password: string
  {
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     password: bcrypt.hashSync(password),
    //     name: email.split('@')[0],
    //   },
    // });
    // return user;
  };

export const getUserServerSession = async () => {
  const sesion = await getServerSession(authOptions);

  return sesion?.user;
};
