import { generateStructuredData, generateJSONLD } from '@/lib/seo/structured-data';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'article' | 'breadcrumb';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData({ type, data });
  const jsonLD = generateJSONLD(structuredData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
    />
  );
}