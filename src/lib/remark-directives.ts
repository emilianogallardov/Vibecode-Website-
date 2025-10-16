import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

// Type definitions for directive nodes
interface DirectiveNode {
  type: 'containerDirective' | 'leafDirective' | 'textDirective';
  name: string;
  label?: string;
  attributes?: Record<string, any>;
  children?: any[];
  data?: any;
}

// Merge class names into an array (mdast->hast expects className as string|string[])
function mergeClassNames(existing: unknown, next: string | string[] | undefined): string[] {
  const out = new Set<string>();
  const push = (v?: string | string[]) => {
    if (!v) return;
    (Array.isArray(v) ? v : String(v).split(/\s+/)).forEach((c) => c && out.add(c));
  };
  push(existing as any);
  push(next);
  return Array.from(out);
}

const FIGURE_ATTR_WHITELIST = new Set(['src', 'alt', 'width', 'height', 'caption', 'title', 'class', 'id']);

export function remarkContainerDirectives() {
  return (tree: Root) => {
    visit(tree, ['containerDirective', 'leafDirective', 'textDirective'], (node: any) => {
      const dirNode = node as DirectiveNode;

      // --- Container directives (e.g., :::info[Title])
      if (dirNode.type === 'containerDirective') {
        const data = (dirNode.data ??= {});
        const attrs = dirNode.attributes ?? {};
        const className = mergeClassNames(attrs.class, undefined);

        data.hName = 'div';
        data.hProperties = {
          'data-directive': true,
          'data-directive-name': dirNode.name,
          ...(dirNode.label ? { 'data-directive-title': dirNode.label } : {}),
          ...(attrs.id ? { id: attrs.id } : {}),
          ...(className.length ? { className } : {}),
        };
        return;
      }

      // --- Leaf directives (single node) e.g., ::youtube[id]{attr=...}
      if (dirNode.type === 'leafDirective') {
        const data = (dirNode.data ??= {});
        const attrs = dirNode.attributes ?? {};
        const className = mergeClassNames(attrs.class, undefined);

        // YouTube embed directive
        if (dirNode.name === 'youtube') {
          // Prefer named attribute; fall back to label for convenience
          const videoId = (attrs.videoId || attrs.id || dirNode.label || '').trim();
          data.hName = 'div';
          data.hProperties = {
            'data-directive': true,
            'data-directive-name': 'youtube',
            ...(videoId ? { 'data-youtube-id': videoId } : {}),
            ...(attrs.title ? { 'data-youtube-title': attrs.title } : {}),
            className: mergeClassNames(className, ['video-embed', 'not-prose']),
          };

          // Note: Actual iframe rendering happens in rehype-youtube plugin
          return;
        }

        // Figure with image and optional caption
        if (dirNode.name === 'figure') {
          // Whitelist and extract safe attributes
          const safe: Record<string, any> = {};
          for (const [k, v] of Object.entries(attrs)) {
            if (FIGURE_ATTR_WHITELIST.has(k)) safe[k] = v;
          }

          const { caption, class: klass, id, src, alt, width, height, title } = safe;

          data.hName = 'figure';
          data.hProperties = {
            'data-directive': true,
            'data-directive-name': 'figure',
            ...(id ? { id } : {}),
            className: mergeClassNames(klass, ['figure', 'not-prose']),
            ...(title ? { title } : {}),
          };

          // Build proper figure children: <img> + optional <figcaption>
          (dirNode.children ??= []);

          // Add the img element as first child
          dirNode.children.unshift({
            type: 'element',
            tagName: 'img',
            properties: {
              ...(src ? { src } : {}),
              ...(alt ? { alt } : { alt: '' }),
              ...(width ? { width: Number(width) || width } : {}),
              ...(height ? { height: Number(height) || height } : {}),
              loading: 'lazy',
              decoding: 'async',
            },
            children: [],
          });

          // Add figcaption if caption provided
          if (caption) {
            dirNode.children.push({
              type: 'element',
              tagName: 'figcaption',
              properties: { className: ['figure__caption'] },
              children: [{ type: 'text', value: caption }],
            });
          }

          return;
        }

        // Generic leaf directive fallback
        data.hName = 'div';
        data.hProperties = {
          'data-directive': true,
          'data-directive-name': dirNode.name,
          ...(attrs.id ? { id: attrs.id } : {}),
          ...(className.length ? { className } : {}),
        };
        return;
      }

      // --- Text directives (inline) e.g., :highlight[text]{.class}
      if (dirNode.type === 'textDirective') {
        const data = (dirNode.data ??= {});
        const attrs = dirNode.attributes ?? {};
        const className = mergeClassNames(attrs.class, dirNode.name === 'highlight' ? ['highlight'] : []);

        if (dirNode.name === 'highlight') {
          data.hName = 'mark';
          data.hProperties = { className };
          return;
        }

        // Default inline wrapper for unknown text directives
        data.hName = 'span';
        data.hProperties = {
          'data-directive': true,
          'data-directive-name': dirNode.name,
          ...(attrs.id ? { id: attrs.id } : {}),
          ...(className.length ? { className } : {}),
        };
      }
    });
  };
}