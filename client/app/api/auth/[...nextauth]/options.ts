import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import directus from '@/lib/directus';
import { readMe, withToken } from '@directus/sdk';
import { JWT } from 'next-auth/jwt';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch('http://localhost:8055/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (!res.ok && user) {
          throw new Error('Email address or password is invalid');
        }
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: 'Some Error',
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (account && user) {
        const userData = await directus.request(
          withToken(
            user.data.access_token as string,
            readMe({
              fields: ['id', 'first_name', 'last_name'],
            })
          )
        );
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          user: userData,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
};
