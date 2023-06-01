import { Session } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      // Dumb thing doesn't automatically cast to string :|
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session }: { session: any }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        //check if user already exists
        const userExists = await User.findOne({ email: profile?.email });
        //if not, crete new user + save to database
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(/\s/g, '').toLowerCase(),
            image: profile?.image,
          });
        }
        //exit
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
