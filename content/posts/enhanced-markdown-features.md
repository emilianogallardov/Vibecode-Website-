---
title: 'Enhanced Markdown: Powerful Content Without MDX'
excerpt: 'Discover how Enhanced Markdown with directives provides rich content features while maintaining Next.js 15 compatibility'
date: '2025-01-16'
author: 'Development Team'
tags: ['markdown', 'documentation', 'features']
image: '/blog/enhanced-markdown.jpg'
---

# Enhanced Markdown Features

Welcome to Enhanced Markdown! This powerful content system uses directives to provide rich, interactive content without the complexity or compatibility issues of MDX in our Next.js 15 stack.

## Why Enhanced Markdown?

:::info
**Next.js 15 + React 18.3.1 Compatibility**: MDX has known issues with Next.js 15 in our stack (runtime MDX via `next-mdx-remote`), while Enhanced Markdown works perfectly out of the box.
:::

Enhanced Markdown leverages the unified ecosystem with remark and rehype plugins to transform directives into rich HTML components. This approach provides:

- Full Next.js 15 compatibility
- Server-side rendering with no hydration issues
- Rich content features through directives
- Excellent performance with content caching
- Clean, readable markdown syntax

## Callout Examples

:::tip
**Pro tip**: Callouts support full markdown formatting including **bold**, *italic*, and even `inline code`.
:::

:::warning
Be careful when using external links - they automatically get `noopener` and `noreferrer` attributes for security.
:::

:::success
Your Enhanced Markdown setup is complete! All directives are working properly with dark mode support.
:::

:::error
This is an error callout. Use it to highlight critical issues or warnings that need immediate attention.
:::

## Video Embeds

Embedding YouTube videos is simple and privacy-focused (uses youtube-nocookie.com):

::youtube{id="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up"}

You can also add parameters like start time:

::youtube{id="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" start="43"}

## Figure with Caption

:::figure
![Enhanced Markdown Architecture](/blog/enhanced-markdown.jpg)
Figure: Enhanced Markdown processing pipeline with directives
:::

## Code Blocks with Syntax Highlighting

Our Enhanced Markdown includes rehype-pretty-code with shiki for beautiful syntax highlighting:

```typescript
// Enhanced Markdown processor configuration
const SITE = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

const isExternal = (href?: unknown) => {
  const raw = typeof href === 'string' ? href : '';
  try {
    const u = new URL(raw, SITE);
    return u.hostname !== SITE.hostname;
  } catch {
    return false;
  }
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkEmoji, { emoticon: true })
  .use(remarkSmartypants)
  .use(remarkDirective)
  .use(remarkContainerDirectives)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypeCallouts)
  .use(rehypeYoutube)
  .use(rehypeExternalLinks, {
    target: (node: any) => (isExternal(node?.properties?.href) ? '_blank' : undefined),
    rel: (node: any) => (isExternal(node?.properties?.href) ? ['noopener', 'noreferrer'] : undefined),
  })
  .use(rehypePrettyCode, {
    theme: { dark: 'github-dark', light: 'github-light' },
    keepBackground: false,
    defaultLang: 'plaintext',
  })
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
    properties: { className: ['heading-anchor'], 'aria-label': 'Link to section' },
  })
  .use(rehypeStringify);
```

```jsx
// Rendering Enhanced Markdown content with proper accessibility
function BlogPost({ content }) {
  return (
    <article className="prose prose-custom" aria-label="Blog post content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
```

## Directive Cheat Sheet

Quick reference for all available directives:

- **Callout**: `:::info[Optional Title]` ... `:::`
  - Types: `info`, `warning`, `success`, `error`, `tip`
- **YouTube**: `::youtube{id="VIDEO_ID" title="Video Title" start="30" controls="1"}`
- **Figure**: `:::figure` ![image](/path.jpg) caption text `:::`
- **Inline highlight**: `:highlight[important text]`

## GitHub Flavored Markdown

All GFM features work seamlessly:

### Task Lists

- [x] Implement Enhanced Markdown
- [x] Add callout directives
- [x] Add YouTube embeds
- [x] Configure syntax highlighting
- [ ] Add more directive types

### Tables

| Feature | MDX (runtime) | Enhanced Markdown |
|---------|---------------|-------------------|
| Next.js 15 Support | ❌ Known issues | ✅ Perfect |
| React 18.3.1 | ❌ Conflicts | ✅ Compatible |
| Server Rendering | ⚠️ Complex | ✅ Simple |
| Performance | ⚠️ Variable | ✅ Cached |
| Learning Curve | 📈 Steep | 📊 Gentle |

### Strikethrough

~~Runtime MDX is incompatible with our Next.js 15 stack~~ Enhanced Markdown works perfectly!

## Smart Typography

Enhanced Markdown automatically converts:
- Straight quotes to "smart quotes"
- Double dashes -- to em dashes—like this
- Triple dots... to ellipsis…
- (c) to © and (tm) to ™

## Emojis

You can use emoji shortcuts :smile: :rocket: :tada: or emoticons :) :D ^_^

## External Links

External links like [Google](https://google.com) automatically get security attributes, while internal links like [Home](/) remain standard.

## Auto-linked Headings

All headings automatically get anchor links for easy navigation and sharing. Hover over any heading to see the link appear!

## Performance Benefits

:::info
**Caching System**: Enhanced Markdown uses SHA1 content hashing for intelligent in-memory caching. Once processed, content is served from memory until it changes. Note: This cache is per-process and resets on deployment. For persistent caching, consider Next.js `unstable_cache` or a KV store.
:::

The processing pipeline is optimized for performance:
1. Content hash generated from markdown
2. Cache lookup for instant serving
3. Processing only when content changes
4. Automatic cache management (100 entry limit)

## Extending Enhanced Markdown

Adding new directives is straightforward:

1. Create a remark plugin for AST transformation
2. Create a rehype plugin for HTML processing
3. Add to the processor pipeline
4. Style with CSS (dark mode aware)

Example structure for a new directive:
```typescript
// src/lib/remark-custom.ts
export function remarkCustomDirective() {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name === 'custom') {
        // Transform AST node
        node.data = { ...node.data, directive: true };
      }
    });
  };
}
```

## Conclusion

Enhanced Markdown provides a robust, performant, and compatible content system for Next.js 15 applications. It combines the simplicity of markdown with the power of directives to create rich, interactive content without the complexity of runtime MDX.

:::success
**Ready to use**: Your Enhanced Markdown system is fully configured and production-ready!
:::