import { Session, SessionStrategy, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import UserModel from '@/models/User';
import { JWT } from 'next-auth/jwt';
import { connectDB } from '@/lib/mongodb';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      const userDb = await UserModel.findOne({ email: token.email });
      if (!userDb) throw new Error('User not found');

      if (userDb.deletedAt) throw new Error('User is not active');

      return token;
    },
    async session({ session }: { session: Session }) {
      if (session?.user) {
        const user = await UserModel.findOne({
          email: session.user.email!,
        }).select('roles');
        session.user.roles = user?.roles || [];
      }

      return session;
    },
    async signIn({ user }: { user: User }) {
      try {
        await connectDB();

        const userDatabase = await UserModel.findOne({
          email: user.email,
        });

        if (!userDatabase)
          await UserModel.create({
            email: user.email,
            name: user.name,
            image: user.image,
            roles: ['root'],
          });

        return true;
      } catch (error) {
        console.log('error', error);
        return false;
      }
    },
  },
};
