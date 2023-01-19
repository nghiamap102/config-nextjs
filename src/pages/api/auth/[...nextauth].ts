import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import db from '@utils/mongo/db';
import User from 'models/User';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        await db.connect();
        const user = await User.findOne({ email: profile.email })
        if (!user) {
          try {
            const res = await User.insertMany([
              {
                name: profile.name,
                phone: null,
                email: profile.email,
                password: null,
                picture: profile.picture,
                role: 'user',
              },
            ])
            console.log(res, 'res')
            return true
          } catch (error) {
            console.log(error, 'error')
            return false
          }
        }
      }
      await db.disconnect();
      return false
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '299190570307-5tvf8egekv02fpdnfnoavjthecqdkk8e.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    })
  ],
  secret: 'condimemay'
});
