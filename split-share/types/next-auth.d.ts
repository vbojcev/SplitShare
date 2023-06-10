//Following this page: https://next-auth.js.org/getting-started/typescript
//^^ To extend the session user object to include an id.

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
    // & DefaultSession['user'] means that id extends the default type
  }
}
