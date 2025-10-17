import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

// Force Node.js runtime for auth (bcrypt and Prisma require Node.js)
export const runtime = 'nodejs';

const CredentialsSchema = z.object({
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(128), // Prevent DoS with extremely long passwords
});

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validated = CredentialsSchema.safeParse(credentials);

        if (!validated.success) {
          return null;
        }

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          // Always hash a dummy password to prevent timing attacks
          await bcrypt.hash('dummy-password-to-prevent-timing-attack', 12);
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/dashboard',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnAuth) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'USER';
      }

      // Handle session updates
      if (trigger === 'update' && session) {
        token = { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // @ts-expect-error - role exists on token from JWT callback
        session.user.role = token.role;
      }
      // If using database sessions, get role from user object
      if (user && session.user && 'role' in user) {
        // @ts-expect-error - role exists on Prisma User model
        session.user.role = user.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
