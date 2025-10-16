interface Organization {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

interface WebSite {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: Organization;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

interface Article {
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: Organization;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  mainEntityOfPage: string;
}

interface BreadcrumbList {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

type StructuredData = {
  '@context': 'https://schema.org';
} & (Organization | WebSite | Article | BreadcrumbList);

interface StructuredDataOptions {
  type: 'organization' | 'website' | 'article' | 'breadcrumb';
  data: any;
}

export function generateStructuredData(options: StructuredDataOptions): StructuredData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const baseContext = {
    '@context': 'https://schema.org' as const,
  };

  const organization: Organization = {
    '@type': 'Organization',
    name: 'Vibecode',
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description: 'Build modern, performant websites with Next.js and TypeScript',
    sameAs: [
      // Add your social media profiles here
      // 'https://twitter.com/vibecode',
      // 'https://github.com/vibecode',
    ],
  };

  switch (options.type) {
    case 'organization':
      return {
        ...baseContext,
        ...organization,
      };

    case 'website':
      return {
        ...baseContext,
        '@type': 'WebSite',
        name: 'Vibecode Website Template',
        url: baseUrl,
        description: 'Build modern, performant websites with Next.js and TypeScript',
        publisher: organization,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/blog?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'article':
      return {
        ...baseContext,
        '@type': 'Article',
        headline: options.data.title,
        description: options.data.description,
        author: {
          '@type': 'Person',
          name: options.data.author,
        },
        publisher: organization,
        datePublished: options.data.datePublished,
        dateModified: options.data.dateModified || options.data.datePublished,
        image: options.data.image ? `${baseUrl}${options.data.image}` : `${baseUrl}/og/home.jpg`,
        url: `${baseUrl}${options.data.url}`,
        mainEntityOfPage: `${baseUrl}${options.data.url}`,
      };

    case 'breadcrumb':
      return {
        ...baseContext,
        '@type': 'BreadcrumbList',
        itemListElement: options.data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      };

    default:
      throw new Error(`Unknown structured data type: ${options.type}`);
  }
}

export function generateJSONLD(structuredData: StructuredData): string {
  return JSON.stringify(structuredData, null, 2);
}