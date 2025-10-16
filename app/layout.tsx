import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import 'highlight.js/styles/github.css';
import { StructuredData } from '@/components/patterns/seo/StructuredData';
import { AnalyticsLoader } from '@/components/patterns/analytics/AnalyticsLoader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: 'Vibecode Website Template',
    template: '%s | Vibecode',
  },
  description: 'Build modern, performant websites with Next.js and TypeScript',
  keywords: ['Next.js', 'React', 'TypeScript', 'Website Template', 'SEO', 'Performance'],
  authors: [{ name: 'Vibecode Team' }],
  creator: 'Vibecode',
  publisher: 'Vibecode',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Vibecode Website Template',
    description: 'Build modern, performant websites with Next.js and TypeScript',
    siteName: 'Vibecode',
    images: [
      {
        url: '/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Vibecode Website Template',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibecode Website Template',
    description: 'Build modern, performant websites with Next.js and TypeScript',
    images: ['/og/home.jpg'],
    creator: '@vibecode',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <AnalyticsLoader />
      </body>
    </html>
  );
}