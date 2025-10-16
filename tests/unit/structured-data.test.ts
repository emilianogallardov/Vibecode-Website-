import { describe, it, expect, beforeEach } from 'vitest';
import { generateStructuredData, generateJSONLD } from '@/lib/seo/structured-data';

describe('Structured Data', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  it('generates organization structured data', () => {
    const result = generateStructuredData({ type: 'organization', data: {} });

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Organization');
    expect((result as any).name).toBe('Vibecode');
    expect((result as any).url).toBe('https://example.com');
  });

  it('generates website structured data', () => {
    const result = generateStructuredData({ type: 'website', data: {} });

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('WebSite');
    expect((result as any).name).toBe('Vibecode Website Template');
    expect((result as any).publisher).toBeDefined();
    expect((result as any).potentialAction).toBeDefined();
  });

  it('generates article structured data', () => {
    const articleData = {
      title: 'Test Article',
      description: 'Test description',
      author: 'John Doe',
      datePublished: '2025-01-15',
      image: '/test-image.jpg',
      url: '/blog/test-article',
    };

    const result = generateStructuredData({ type: 'article', data: articleData });

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Article');
    expect((result as any).headline).toBe('Test Article');
    expect((result as any).author).toEqual({ '@type': 'Person', name: 'John Doe' });
    expect((result as any).datePublished).toBe('2025-01-15');
    expect((result as any).url).toBe('https://example.com/blog/test-article');
  });

  it('generates breadcrumb structured data', () => {
    const breadcrumbData = {
      items: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: 'Article', url: '/blog/article' },
      ]
    };

    const result = generateStructuredData({ type: 'breadcrumb', data: breadcrumbData });

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('BreadcrumbList');
    expect((result as any).itemListElement).toHaveLength(3);
    expect((result as any).itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com/',
    });
  });

  it('generates valid JSON-LD', () => {
    const structuredData = generateStructuredData({ type: 'organization', data: {} });
    const jsonLD = generateJSONLD(structuredData);

    expect(() => JSON.parse(jsonLD)).not.toThrow();

    const parsed = JSON.parse(jsonLD);
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('Organization');
  });

  it('throws error for unknown type', () => {
    expect(() => {
      generateStructuredData({ type: 'unknown' as any, data: {} });
    }).toThrow('Unknown structured data type: unknown');
  });
});