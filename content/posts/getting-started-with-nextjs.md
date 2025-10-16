---
title: "Getting Started with Next.js 15: A Complete Guide"
excerpt: "Learn how to build modern web applications with Next.js 15, featuring the new App Router, Server Components, and improved performance"
date: "2025-01-15"
author: "Sarah Chen"
tags: ["Next.js", "React", "Web Development", "Tutorial"]
image: "/blog/nextjs-15.jpg"
---

Next.js 15 represents a major leap forward in the React ecosystem, bringing unprecedented performance improvements and developer experience enhancements. In this comprehensive guide, we'll explore everything you need to know to get started with Next.js 15.

## Why Next.js 15?

The latest version of Next.js introduces several groundbreaking features that make it the go-to framework for building production-ready React applications:

:::info
Next.js 15 includes built-in optimizations that can significantly improve Core Web Vitals compared to previous releases, with many applications seeing dramatic performance gains.
:::

### Key Features

- **App Router**: A new routing system built on React Server Components
- **Turbopack**: Rust-based bundler for lightning-fast development
- **Partial Prerendering**: Combine static and dynamic content seamlessly
- **Enhanced Image Optimization**: Automatic AVIF support and improved lazy loading

## Setting Up Your First Project

Getting started with Next.js 15 is straightforward. Let's create a new project from scratch:

```bash
npx create-next-app@latest my-app --typescript
cd my-app
npm run dev
```

:::tip
The `--typescript` flag scaffolds a TypeScript project, which is recommended for better type safety and developer experience.
:::

## Understanding the App Router

The App Router is the heart of Next.js 15, providing a more intuitive and powerful way to structure your applications:

```typescript
// app/page.tsx - Server Component by default
export const metadata = {
  title: 'Welcome to Next.js 15',
  description: 'Building the future of web applications',
};

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js 15</h1>
      <p>Building the future of web applications</p>
    </main>
  );
}
```

### Layout System

Next.js 15 introduces a nested layout system that makes it easy to share UI between routes:

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## Server Components Deep Dive

Server Components are a game-changer for performance and SEO. They run on the server and send only HTML to the client:

:::success
Server Components eliminate the need for client-side data fetching in many cases, resulting in faster initial page loads and better SEO. In the App Router, components are Server Components by default.
:::

```typescript
// app/blog/page.tsx - Server Component (no 'use client' needed)
type Post = { id: string; title: string; excerpt: string };

export default async function BlogPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts: Post[] = await res.json();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Client Components

:::warning
Important: Any component using React hooks (`useState`, `useEffect`, etc.) must be marked with `'use client'` at the top of the file.
:::

```typescript
// app/components/counter.tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## Performance Optimization Techniques

### 1. Image Optimization

Next.js 15 automatically optimizes images with the `next/image` component:

```tsx
import Image from 'next/image';

export default function Gallery() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

### 2. Font Optimization

Use `next/font` for automatic font optimization:

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Code Splitting

Next.js automatically splits your code, but you can optimize further with dynamic imports:

```typescript
'use client';

import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
```

## Data Fetching Patterns

Next.js 15 offers multiple data fetching strategies:

### Static Generation (SSG)

This function lives alongside a dynamic route (e.g., `app/blog/[slug]/page.tsx`) and provides the list of `slug` values to pre-render:

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();

  return <article>{/* Render post */}</article>;
}
```

### Server-Side Rendering (SSR)

```typescript
// app/dashboard/page.tsx - Fresh data on every request
export default async function Dashboard() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Ensures fresh data on every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render data */}
    </div>
  );
}
```

### Incremental Static Regeneration (ISR)

```typescript
// app/products/page.tsx - Revalidate every hour
export const revalidate = 3600; // seconds

export default async function Products() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  });

  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      {/* Render products */}
    </div>
  );
}
```

## Deployment Best Practices

When deploying your Next.js 15 application, consider these best practices:

:::warning
Always test your production build locally with `npm run build && npm run start` before deploying to avoid surprises in production.
:::

1. **Environment Variables**: Use `.env.local` for local development and configure production variables in your hosting platform
2. **Performance Monitoring**: Implement Core Web Vitals tracking
3. **Error Tracking**: Set up error monitoring with tools like Sentry
4. **CDN Configuration**: Leverage edge networks for global performance

## Common Pitfalls and Solutions

### Hydration Mismatches

Hydration mismatches occur when server and client render different content. Here's how to avoid them:

```typescript
// ❌ Bad: Date will differ between server and client
function BadComponent() {
  return <div>Current time: {new Date().toString()}</div>;
}

// ✅ Good: Use client component with useEffect
// app/components/client-time.tsx
'use client';

import { useEffect, useState } from 'react';

export function ClientTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <div>Current time: {time || 'Loading...'}</div>;
}
```

### Memory Leaks

Be careful with event listeners and subscriptions:

```typescript
'use client';

import { useEffect } from 'react';

export function EventComponent() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      console.log('Mouse moved:', e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handler);

    // ✅ Always cleanup
    return () => {
      window.removeEventListener('mousemove', handler);
    };
  }, []);

  return <div>Move your mouse!</div>;
}
```

## Testing Your Application

Next.js 15 works seamlessly with modern testing tools. For Server Components, use Playwright for end-to-end testing. For Client Components, use React Testing Library:

```typescript
// app/components/heading.tsx
'use client';

export function Heading({ text }: { text: string }) {
  return <h1>{text}</h1>;
}
```

```typescript
// __tests__/heading.test.tsx
import { render, screen } from '@testing-library/react';
import { Heading } from '@/app/components/heading';

describe('Heading Component', () => {
  it('renders the provided text', () => {
    render(<Heading text="Welcome to Next.js" />);
    const heading = screen.getByRole('heading', { name: /welcome to next.js/i });
    expect(heading).toBeInTheDocument();
  });
});
```

For end-to-end testing of Server Components:

```typescript
// e2e/app.spec.ts
import { test, expect } from '@playwright/test';

test('homepage renders correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Welcome to Next.js 15');
});
```

## Advanced Features

### Middleware

Use middleware for authentication, redirects, and more:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for auth token
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

### API Routes

Create backend endpoints with API routes in the App Router:

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}
```

## Metadata API for SEO

Next.js 15 provides a powerful Metadata API for SEO optimization:

```typescript
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | My Company',
  description: 'Learn more about our mission and team',
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our mission and team',
    images: ['/og/about.jpg'],
  },
};

export default function AboutPage() {
  return <div>{/* Page content */}</div>;
}
```

## Video Tutorial

Learn more about Next.js 15 features in this comprehensive video guide:

::youtube{id="dQw4w9WgXcQ" title="Next.js 15 Complete Tutorial"}

## Conclusion

Next.js 15 is a powerful framework that significantly improves both developer experience and application performance. By leveraging its features like Server Components, the App Router, and built-in optimizations, you can build fast, scalable, and SEO-friendly web applications.

:::success
Ready to start building? Check out our Enhanced Markdown features for rich content creation, or explore our [component library](/docs/components) to accelerate your development!
:::

## Resources and Further Reading

- [Official Next.js Documentation](https://nextjs.org/docs)
- [React Server Components RFC](https://github.com/reactjs/rfcs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js Discord Community](https://nextjs.org/discord)

Happy coding with Next.js 15!