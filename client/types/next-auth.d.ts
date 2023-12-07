import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
   
    user: {
      accessToken: string,
      refreshToken?: string,
      id: string;
      first_name?: string;
      last_name?: string;
    } & DefaultSession['user'];
  }
}