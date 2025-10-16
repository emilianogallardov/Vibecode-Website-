# Authentication System - NextAuth v5

## Overview

The Vibecode Website Template now includes a complete authentication system using **NextAuth v5** (Auth.js) with support for:

- **Email/Password** (Credentials) authentication
- **OAuth providers** (Google, GitHub)
- **Role-based access control** (USER, ADMIN, MODERATOR)
- **Protected routes** via middleware
- **Database sessions** with Prisma

---

## Features

✅ Multiple authentication providers
✅ Secure password hashing (bcrypt)
✅ JWT session strategy
✅ Protected dashboard page
✅ Role-based permissions
✅ Type-safe with TypeScript
✅ Auto-redirect logic
✅ Sign-up with auto-login

---

## Quick Start

### 1. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following required variables:

```env
# Required for NextAuth
AUTH_SECRET="generate-with: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/vibecode?schema=public"

# Optional: OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 2. Run Database Migrations

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or create a migration
npm run db:migrate
```

### 3. Test Authentication

```bash
npm run dev
```

Visit:
- **Sign Up**: http://localhost:3000/auth/signup
- **Sign In**: http://localhost:3000/auth/signin
- **Dashboard** (protected): http://localhost:3000/dashboard

---

## Authentication Flow

### Sign Up Flow

1. User fills out registration form at `/auth/signup`
2. Form validates input (password min 8 chars, valid email)
3. API route `/api/auth/register` creates user with hashed password
4. User auto-signs in with credentials provider
5. Redirects to `/dashboard`

### Sign In Flow

1. User enters credentials at `/auth/signin`
2. NextAuth validates credentials against database
3. Password compared using bcrypt
4. JWT token generated with user ID and role
5. Session created and user redirected to `/dashboard`

### OAuth Flow

1. User clicks "Sign in with Google/GitHub"
2. Redirected to OAuth provider
3. After authorization, account linked via Prisma adapter
4. User created/updated in database
5. Session created and redirected to `/dashboard`

---

## File Structure

```
auth.ts                          # NextAuth core config
auth.config.ts                   # Auth configuration & callbacks
middleware.ts                    # Auth middleware + CSP
types/next-auth.d.ts            # TypeScript type extensions

app/
├── api/auth/
│   ├── [...nextauth]/route.ts  # NextAuth API handler
│   └── register/route.ts       # Registration endpoint
│
├── (auth)/auth/
│   ├── signin/page.tsx         # Sign-in page
│   ├── signup/page.tsx         # Sign-up page
│   └── error/page.tsx          # Auth error page
│
└── (protected)/dashboard/
    └── page.tsx                # Protected dashboard

src/components/auth/
├── SignInForm.tsx              # Sign-in form component
├── SignUpForm.tsx              # Sign-up form component
└── SignOutButton.tsx           # Sign-out button

prisma/schema.prisma            # Database schema with User, Account, Session models
```

---

## Protected Routes

### Using Middleware (Recommended)

Routes starting with `/dashboard` are automatically protected by the middleware:

```typescript
// middleware.ts
export default auth((request) => {
  // Auth middleware automatically protects /dashboard/*
  // Unauthenticated users redirected to /auth/signin
});
```

### Manual Protection in Server Components

```typescript
import { auth } from '@/../../auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return <div>Welcome {session.user.name}!</div>;
}
```

### Client-Side Protection

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ClientProtected() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) redirect('/auth/signin');

  return <div>Protected content</div>;
}
```

---

## Role-Based Access Control

### Database Schema

```prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  role  Role   @default(USER)  // USER, ADMIN, MODERATOR
  // ...
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

### Checking Roles

```typescript
import { auth } from '@/../../auth';

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    return <div>Access denied</div>;
  }

  return <div>Admin panel</div>;
}
```

### Role Helper

```typescript
// src/lib/auth/permissions.ts
import { auth } from '@/../../auth';

export async function requireRole(role: 'ADMIN' | 'MODERATOR') {
  const session = await auth();
  if (!session || session.user.role !== role) {
    throw new Error('Unauthorized');
  }
  return session;
}
```

---

## API Usage

### Sign In Programmatically

```typescript
import { signIn } from 'next-auth/react';

// With credentials
await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false,
});

// With OAuth
await signIn('google', { callbackUrl: '/dashboard' });
```

### Sign Out

```typescript
import { signOut } from 'next-auth/react';

await signOut({ callbackUrl: '/' });
```

### Get Session

```typescript
// Server Component
import { auth } from '@/../../auth';
const session = await auth();

// Client Component
import { useSession } from 'next-auth/react';
const { data: session } = useSession();
```

---

## Customization

### Add New OAuth Provider

1. **Install provider package** (if needed)
2. **Update `auth.config.ts`**:

```typescript
import Discord from 'next-auth/providers/discord';

export default {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    // ... other providers
  ],
};
```

3. **Add environment variables**
4. **Update sign-in form** to include Discord button

### Customize Session Data

Update callbacks in `auth.config.ts`:

```typescript
callbacks: {
  jwt({ token, user }) {
    if (user) {
      token.customField = user.customField;
    }
    return token;
  },
  session({ session, token }) {
    session.user.customField = token.customField;
    return session;
  },
}
```

### Change Session Strategy

```typescript
// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' }, // Change from 'jwt' to 'database'
  ...authConfig,
});
```

---

## Security Best Practices

✅ **Password hashing**: bcrypt with cost factor 12
✅ **HTTPS only**: Set `AUTH_URL` to HTTPS in production
✅ **Strong secret**: Use `openssl rand -base64 32`
✅ **CSRF protection**: Built into NextAuth
✅ **Rate limiting**: Already implemented on `/api/auth/register`
✅ **Input validation**: Zod schemas on all endpoints
✅ **SQL injection**: Prevented by Prisma parameterized queries

---

## Troubleshooting

### Issue: "Database connection failed"

**Solution:**
```bash
# Test Prisma connection
npx prisma db push

# Check DATABASE_URL format
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

### Issue: "OAuth callback error"

**Solution:**
- Verify callback URL in OAuth provider settings:
  - Development: `http://localhost:3000/api/auth/callback/[provider]`
  - Production: `https://yourdomain.com/api/auth/callback/[provider]`

### Issue: "Invalid session"

**Solution:**
```bash
# Clear browser cookies
# Regenerate AUTH_SECRET
openssl rand -base64 32

# Restart dev server
npm run dev
```

### Issue: "TypeScript errors with `user.role`"

**Solution:**
- Type definitions in `types/next-auth.d.ts` extend NextAuth types
- Using `@ts-expect-error` comments where TypeScript can't infer merged types
- Runtime safety ensured by Prisma schema

---

## Production Deployment

### 1. Set Production Environment Variables

```env
AUTH_SECRET="your-production-secret-32-chars"
AUTH_URL="https://yourdomain.com"
DATABASE_URL="your-production-database-url"
```

### 2. Run Migrations

```bash
npx prisma migrate deploy
```

### 3. Configure OAuth Redirects

Update OAuth provider settings with production callback URLs:
- Google: `https://yourdomain.com/api/auth/callback/google`
- GitHub: `https://yourdomain.com/api/auth/callback/github`

### 4. Test Authentication Flow

- Sign up with test account
- Verify email/password login
- Test OAuth providers
- Check protected routes

---

## Testing

### Manual Testing Checklist

- [ ] Sign up with new email
- [ ] Sign in with credentials
- [ ] Sign in with Google
- [ ] Sign in with GitHub
- [ ] Access protected `/dashboard`
- [ ] Sign out redirects to home
- [ ] Unauthorized access redirects to sign-in
- [ ] Form validation works
- [ ] Error messages display correctly

### Automated Tests

```bash
# Add authentication tests
# tests/integration/auth.test.ts

import { signIn } from 'next-auth/react';

describe('Authentication', () => {
  it('should sign in with valid credentials', async () => {
    // Test implementation
  });

  it('should reject invalid credentials', async () => {
    // Test implementation
  });
});
```

---

## Migration from Other Auth Systems

### From NextAuth v4

NextAuth v5 is backward compatible for most use cases. Key changes:
- `providers` → same
- `callbacks` → mostly same (check types)
- `session.strategy` → defaults to `'jwt'`

### From Other Libraries

1. Export users from old database
2. Hash passwords with bcrypt (cost: 12)
3. Import to Prisma database
4. Update user IDs if needed
5. Test authentication flow

---

## Further Reading

- [NextAuth v5 Documentation](https://next-auth.js.org/)
- [Prisma Adapter Documentation](https://authjs.dev/reference/adapter/prisma)
- [OAuth Provider Setup](https://next-auth.js.org/providers/oauth)
- [Session Strategies](https://next-auth.js.org/configuration/options#session)

---

## Support

For issues or questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review [NextAuth v5 docs](https://next-auth.js.org/)
3. Open an issue on GitHub

---

**Last Updated:** January 2025
**NextAuth Version:** 5.0.0-beta.29
**Prisma Version:** 6.16.3
