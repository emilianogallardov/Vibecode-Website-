/**
 * Sanitize HTML content to prevent XSS attacks
 * NOTE: Currently uses escapeHtml for server-side safety
 * For client-side, consider using DOMPurify directly
 */
export function sanitizeHtml(dirty: string): string {
  // For server-side (email templates), escape HTML
  // This is safer than importing DOM libraries on the server
  return escapeHtml(dirty);
}

/**
 * Escape HTML special characters for safe text insertion
 * Use this when you want to display user input as plain text
 */
export function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Convert plain text to HTML with safe line breaks
 * Escapes HTML and converts newlines to <br> tags
 */
export function textToHtml(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br>');
}
