import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip';
const VALID: CalloutType[] = ['info', 'warning', 'success', 'error', 'tip'];

function getCalloutIcon(type: CalloutType): string {
  const icons: Record<CalloutType, string> = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
    tip: '💡',
  };
  return icons[type] ?? '';
}

export default function rehypeCallouts() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const props = (node.properties ||= {});

      // Accept both dashed and camelCase dataset keys
      const hasDirective =
        'data-directive' in props || 'dataDirective' in props;
      const name =
        (props['data-directive-name'] as string) ||
        (props['dataDirectiveName'] as string);

      if (node.tagName !== 'div' || !hasDirective || !name) return;
      if (!VALID.includes(name as CalloutType)) return;

      // Idempotency: bail if already processed
      if (props['data-callout-processed'] === true) return;

      const type = name as CalloutType;

      // Merge existing className with our classes, deduplicated
      const existing = (props.className ?? []) as string[] | string;
      const classList = Array.isArray(existing)
        ? existing
        : existing
        ? [existing]
        : [];
      const merged = Array.from(new Set([
        ...classList,
        'callout',
        `callout--${type}`,
        'not-prose',
      ]));

      // Build new properties (preserve prior properties where sensible)
      node.properties = {
        ...props,
        className: merged,
        role: props['role'] ?? 'note',
        'aria-label':
          (props['aria-label'] as string) ?? `${type} callout`,
        'data-callout-processed': true,
      };

      // Remove directive markers
      delete node.properties['data-directive'];
      delete node.properties['dataDirective'];
      delete node.properties['data-directive-name'];
      delete node.properties['dataDirectiveName'];

      // Optional icon injection (skip if explicitly disabled or already present)
      const iconDisabled =
        props['data-directive-icon'] === 'false' ||
        props['dataDirectiveIcon'] === 'false';

      if (!iconDisabled && !node.children?.some(c =>
          c.type === 'element' &&
          (c as any).properties?.className?.includes?.('callout__icon'))) {
        node.children.unshift({
          type: 'element',
          tagName: 'span',
          properties: { className: ['callout__icon'], 'aria-hidden': true },
          children: [{ type: 'text', value: getCalloutIcon(type) }],
        });
      }

      // Optional title: support data-directive-title (from remark label)
      const title =
        (props['data-directive-title'] as string) ||
        (props['dataDirectiveTitle'] as string);
      if (title && !node.children?.some(c =>
          c.type === 'element' &&
          (c as any).properties?.className?.includes?.('callout__title'))) {
        node.children.unshift({
          type: 'element',
          tagName: 'strong',
          properties: { className: ['callout__title'] },
          children: [{ type: 'text', value: title }],
        });
      }
    });
  };
}