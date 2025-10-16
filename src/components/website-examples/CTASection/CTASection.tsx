import Link from 'next/link';

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTASection({ title, subtitle, primaryCTA, secondaryCTA }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block"
            >
              {primaryCTA.text}
            </Link>
          )}

          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors inline-block"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}