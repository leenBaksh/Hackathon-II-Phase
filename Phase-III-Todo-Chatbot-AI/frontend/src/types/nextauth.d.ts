import { User } from 'better-auth/types';

declare module 'better-auth/types' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}