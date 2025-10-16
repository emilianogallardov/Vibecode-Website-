import { unified } from 'unified';
import { createHash } from 'crypto';
import { LRUCache } from 'lru-cache';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkSmartypants from 'remark-smartypants';
import remarkEmoji from 'remark-emoji';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { remarkContainerDirectives } from './remark-directives';
import rehypeCallouts from './rehype-callouts';
import rehypeYoutube from './rehype-youtube';

const rehypePrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: false,
  defaultLang: 'plaintext',
};

const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap' as const,
  properties: {
    className: ['heading-anchor'],
    'aria-label': 'Link to section',
  },
};

// External links configuration
const SITE = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
const isExternal = (href?: unknown) => {
  const raw = typeof href === 'string' ? href : '';
  try {
    // Resolve relative links against SITE, treat protocol-relative (//) correctly
    const u = new URL(raw, SITE);
    return u.hostname !== SITE.hostname;
  } catch {
    return false;
  }
};

const rehypeExternalLinksOptions = {
  target: (node: any) => (isExternal(node?.properties?.href) ? '_blank' : undefined),
  rel: (node: any) => (isExternal(node?.properties?.href) ? ['noopener', 'noreferrer'] : undefined),
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkEmoji, { emoticon: true })
  .use(remarkSmartypants)
  .use(remarkDirective)
  .use(remarkContainerDirectives)       // Convert directives to data attributes
  .use(remarkRehype, { allowDangerousHtml: false }) // Switch to HAST
  .use(rehypeSlug)
  .use(rehypeCallouts)                  // Process callout directives
  .use(rehypeYoutube)                   // Process YouTube directives
  .use(rehypeExternalLinks, rehypeExternalLinksOptions)
  .use(rehypePrettyCode, rehypePrettyCodeOptions as any)
  .use(rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions)
  .use(rehypeStringify);

// LRU cache for processed markdown with TTL
const cache = new LRUCache<string, string>({
  max: 100, // Maximum 100 items
  ttl: 1000 * 60 * 60, // 1 hour TTL
  updateAgeOnGet: true, // Reset TTL on access
  updateAgeOnHas: false,
});

export async function markdownToHtml(markdown: string): Promise<string> {
  // Create cache key from content hash
  const key = createHash('sha1').update(markdown).digest('hex');

  // Check cache first
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  try {
    const result = await processor.process(markdown);
    const html = result.toString();

    // Cache the result with automatic LRU eviction
    cache.set(key, html);

    return html;
  } catch (error) {
    console.error('Enhanced Markdown processing error:', error);
    throw new Error('Failed to process Enhanced Markdown content');
  }
}