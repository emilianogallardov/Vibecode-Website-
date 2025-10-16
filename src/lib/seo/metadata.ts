import type { Metadata } from 'next';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    image = '/og-image.png',
    publishedTime,
    authors,
    keywords,
  } = options;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords,
    authors: authors?.map(name => ({ name })),
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: publishedTime ? 'article' : 'website',
      ...(publishedTime && {
        publishedTime,
        authors,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}