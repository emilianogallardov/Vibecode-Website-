import { describe, it, expect } from 'vitest';
import { sanitizeHtml, escapeHtml, textToHtml } from '@/lib/sanitize';

describe('HTML Sanitization', () => {
  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      const input = '<script>alert("XSS")</script>';
      const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('should escape ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should escape quotes', () => {
      expect(escapeHtml('Say "hello"')).toBe('Say &quot;hello&quot;');
      expect(escapeHtml("It's nice")).toBe('It&#x27;s nice');
    });

    it('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle safe text', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('textToHtml', () => {
    it('should convert newlines to <br> tags', () => {
      const input = 'Line 1\nLine 2\nLine 3';
      const expected = 'Line 1<br>Line 2<br>Line 3';
      expect(textToHtml(input)).toBe(expected);
    });

    it('should escape HTML and convert newlines', () => {
      const input = '<script>alert("XSS")</script>\nNext line';
      const result = textToHtml(input);
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('<br>');
      expect(result).not.toContain('<script>');
    });

    it('should handle text without newlines', () => {
      expect(textToHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('sanitizeHtml', () => {
    it('should escape HTML for server-side safety', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      const result = sanitizeHtml(input);
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
      expect(result).not.toContain('<p>');
    });

    it('should escape script tags', () => {
      const input = '<p>Hello</p><script>alert("XSS")</script>';
      const result = sanitizeHtml(input);
      expect(result).toContain('&lt;script&gt;');
      expect(result).not.toContain('<script>');
    });

    it('should escape all HTML attributes', () => {
      const input = '<p onclick="alert(1)">Click me</p>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<p onclick');
      expect(result).toContain('&lt;');
    });

    it('should escape links', () => {
      const input = '<a href="https://example.com">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('&lt;a');
      expect(result).not.toContain('<a href');
    });

    it('should escape javascript URLs', () => {
      const input = '<a href="javascript:alert(1)">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('&lt;');
      expect(result).not.toContain('<a href');
    });

    it('should handle empty input', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('should escape all HTML tags', () => {
      const input = '<h2>Title</h2><p>Text with <em>emphasis</em> and <strong>strong</strong></p>';
      const result = sanitizeHtml(input);
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
      expect(result).not.toContain('<h2>');
    });
  });

  describe('XSS Protection', () => {
    it('should protect against common XSS attacks by escaping', () => {
      const attacks = [
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        '<iframe src="javascript:alert(1)">',
        '<body onload=alert(1)>',
        '<input onfocus=alert(1) autofocus>',
      ];

      attacks.forEach(attack => {
        const result = sanitizeHtml(attack);
        // Should escape all HTML tags
        expect(result).toContain('&lt;');
        expect(result).toContain('&gt;');
        // Should not contain actual HTML tags
        expect(result).not.toMatch(/<img/);
        expect(result).not.toMatch(/<svg/);
        expect(result).not.toMatch(/<iframe/);
      });
    });

    it('should protect against data URI attacks by escaping', () => {
      const input = '<a href="data:text/html,<script>alert(1)</script>">Click</a>';
      const result = sanitizeHtml(input);
      // Should escape the entire string
      expect(result).toContain('&lt;');
      expect(result).not.toContain('<a href');
    });
  });
});
