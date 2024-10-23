import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectDB, getDatabase } from '../../../../../lib/mongodb';
import { IUser, IUserNew } from '@/models/User';
import { Session, SessionStrategy, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export const authOptions = {
  adapter: MongoDBAdapter(connectDB) as Adapter,
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
      return token;
    },
    async session({ session }: { session: Session }) {
      session.user = session.user;

      return session;
    },
    async signIn({ user }: { user: User }) {
      try {
        const database = await getDatabase();

        const userDatabase = await database
          .collection<IUser>('users')
          .findOne({ email: user.email! });

        if (!userDatabase) {
          await database.collection<IUserNew>('users').insertOne({
            email: user.email!,
            name: user.name!,
            image: user.image!,
          });
        }
        return true;
      } catch (error) {
        console.log('error', error);
        return false;
      }
    },
  },
};
