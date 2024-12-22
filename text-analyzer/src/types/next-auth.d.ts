import 'next-auth';
import { DefaultSession } from 'next-auth';


// ELI5: "extends" the User and Session types from next-auth to include a role property 

declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}