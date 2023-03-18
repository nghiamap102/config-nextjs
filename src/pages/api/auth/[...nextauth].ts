import authService from '@redux/auth/authService';
import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 60
  },
  pages: {
    error: '/login'
  },
  callbacks: {
    /// base on return user creadential   
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      if (user?.role) token.role = user.role;
      if (user?.phone) token.phone = user.phone;
      if (user?.date_of_birth) token.date_of_birth = user.date_of_birth;
      if (user?.sex) token.sex = user.sex;
      if (user?.access_token) token.access_token = user.access_token;
      if (user?.refresh_token) token.refresh_token = user.refresh_token;
      if (user?.createdAt) token.createdAt = user.createdAt;
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      if (token?.role) session.user.role = token.role;
      if (token?.phone) session.user.phone = token.phone;
      if (token?.date_of_birth) session.user.date_of_birth = token.date_of_birth;
      if (token?.sex) session.user.sex = token.sex;
      if (token?.access_token) session.user.access_token = token.access_token;
      if (token?.refresh_token) session.user.refresh_token = token.refresh_token;
      if (token?.createdAt) session.user.createdAt = token.createdAt;
      // if (token?._id) {
      //   const res = await authService.getUserById(token?._id)
      //   session.user = { ...session.user, ...res.data.data };
      // }
      return session;
    },
    async signIn({ account, profile }: any) {
      // console.log(account, profile, 'signin')
      if (account.provider === "google") {
        // await db.connect();
        // const user = await User.findOne({ email: profile.email })
        // if (!user) {
        //   try {
        //     const res = await User.insertMany([
        //       {
        //         name: profile.name,
        //         phone: null,
        //         email: profile.email,
        //         password: null,
        //         picture: profile.picture,
        //         role: 'user',
        //       },
        //     ])
        //     console.log(res, 'res')
        //     return true
        //   } catch (error) {
        //     console.log(error, 'error')
        //     return false
        //   }
        // }
      }
      if (account.provider === 'credentials') { return true }
      return false
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any, req) {
        const res = await authService.login({
          email: credentials.email,
          password: credentials.password
        })
        const user = res.data.user
        if (res && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role.name,
            phone: user.phone,
            sex: user.sex,
            date_of_birth: user.date_of_birth,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            createdAt: user.createdAt,
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
  secret: 'condimemay',
});
