import { Session } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/utils/mongodb';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    // Google

    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),

    // Magic Email Links

    EmailProvider({
      server: String(process.env.EMAIL_SERVER),
      from: String(process.env.EMAIL_FROM),
      maxAge: 30 * 60, // How long email links are valid for in seconds
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      // Commenting this line makes user.image = Google profile image. For future changes...
      //session.user.image = sessionUser.image;

      // Overriding the name member provided by Google:
      session.user.name = sessionUser.username;
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
            image: profile?.image ? profile.image : 'placeholder',
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
