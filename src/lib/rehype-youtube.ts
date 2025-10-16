import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

function sanitizeVideoId(raw?: string): string | null {
  if (!raw) return null;
  const id = raw.trim();
  // YouTube IDs are typically 11 chars of letters, numbers, _ or -
  if (!/^[A-Za-z0-9_-]{6,20}$/.test(id)) return null; // be slightly permissive
  return id;
}

function buildQuery(props: Record<string, any>): string {
  const ALLOW = ['start', 'controls', 'mute', 'modestbranding', 'rel', 'playsinline', 'autoplay'];
  const q = new URLSearchParams();
  for (const key of ALLOW) {
    const v = props[`data-youtube-${key}`] ?? props[`dataYoutube${key[0].toUpperCase()}${key.slice(1)}`];
    if (v !== undefined && v !== null && String(v) !== '') q.set(key, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : '';
}

export default function rehypeYoutube() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const props = (node.properties ||= {} as any);

      const hasDirective = 'data-directive' in props || 'dataDirective' in props;
      const name = (props['data-directive-name'] as string) || (props['dataDirectiveName'] as string);
      const videoId = (props['data-youtube-id'] as string) || (props['dataYoutubeId'] as string);
      const title =
        (props['data-youtube-title'] as string) ||
        (props['dataYoutubeTitle'] as string) ||
        'YouTube video';

      if (node.tagName !== 'div' || !hasDirective || name !== 'youtube') return;

      // Idempotency
      if (props['data-youtube-processed'] === true) return;

      // Sanitize ID
      const cleanId = sanitizeVideoId(videoId);
      if (!cleanId) return;

      // Build safe query string from whitelisted params
      const query = buildQuery(props);

      // Transform into responsive embed with no-cookie domain
      node.tagName = 'div';
      node.properties = {
        className: ['video-embed', 'video-embed--youtube'],
        'data-youtube-processed': true,
      } as any;

      node.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['video-embed__wrapper', 'relative', 'aspect-video', 'overflow-hidden'],
          },
          children: [
            {
              type: 'element',
              tagName: 'iframe',
              properties: {
                src: `https://www.youtube-nocookie.com/embed/${cleanId}${query}`,
                title,
                frameBorder: '0',
                allow:
                  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                allowFullScreen: true,
                referrerPolicy: 'strict-origin-when-cross-origin',
                loading: 'lazy',
                className: ['absolute', 'inset-0', 'w-full', 'h-full'],
              },
              children: [],
            },
          ],
        },
      ];

      // Cleanup directive markers so they don't leak to DOM
      delete (props as any)['data-directive'];
      delete (props as any)['dataDirective'];
      delete (props as any)['data-directive-name'];
      delete (props as any)['dataDirectiveName'];
      delete (props as any)['data-youtube-id'];
      delete (props as any)['dataYoutubeId'];
      delete (props as any)['data-youtube-title'];
      delete (props as any)['dataYoutubeTitle'];
      for (const k of Object.keys(props)) {
        if (k.startsWith('data-youtube-') || k.startsWith('dataYoutube')) {
          delete (props as any)[k];
        }
      }
    });
  };
}