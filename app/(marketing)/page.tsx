import type { Metadata } from 'next';
import { HeroSection } from '@/components/website-examples/HeroSection/HeroSection';
import { FeaturesSection } from '@/components/website-examples/FeaturesSection/FeaturesSection';
import { TestimonialsSection } from '@/components/website-examples/TestimonialsSection/TestimonialsSection';
import { CTASection } from '@/components/website-examples/CTASection/CTASection';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Home',
  description: 'Build modern, performant websites with our production-ready Next.js template',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Build Websites That Convert"
        subtitle="Production-ready Next.js template with SEO, analytics, and performance built-in"
        primaryCTA={{ text: 'Get Started', href: '/contact' }}
        secondaryCTA={{ text: 'View Examples', href: '/blog' }}
      />

      <FeaturesSection
        title="Everything You Need"
        subtitle="Built with modern best practices"
        features={[
          {
            title: 'SEO Optimized',
            description: 'Automatic sitemap, metadata API, and JSON-LD structured data',
            icon: 'search',
          },
          {
            title: 'Performance First',
            description: 'Core Web Vitals optimized with Next.js Image and font optimization',
            icon: 'lightning',
          },
          {
            title: 'Analytics Ready',
            description: 'GA4 with Consent Mode v2 and custom event tracking',
            icon: 'chart',
          },
          {
            title: 'Type Safe',
            description: 'Full TypeScript with strict mode and Zod validation',
            icon: 'shield',
          },
          {
            title: 'Component Library',
            description: 'Pre-built website components with accessibility built-in',
            icon: 'component',
          },
          {
            title: 'Developer Experience',
            description: 'Hot reload, ESLint, Prettier, and testing configured',
            icon: 'code',
          },
        ]}
      />

      <TestimonialsSection
        title="Trusted by Developers"
        subtitle="See what others are saying"
        testimonials={[
          {
            quote: 'This template saved us weeks of setup time. Everything just works.',
            author: 'Sarah Chen',
            role: 'Frontend Lead',
            company: 'TechCorp',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=fff&size=128',
          },
          {
            quote: 'The SEO and performance optimizations are exactly what we needed.',
            author: 'Mike Johnson',
            role: 'Founder',
            company: 'StartupXYZ',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff&size=128',
          },
          {
            quote: 'Best Next.js template I\'ve used. Clean code and great documentation.',
            author: 'Emily Rodriguez',
            role: 'Full Stack Developer',
            company: 'WebAgency',
            avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=8b5cf6&color=fff&size=128',
          },
        ]}
      />

      <CTASection
        title="Ready to Build Your Website?"
        subtitle="Get started in minutes with our production-ready template"
        primaryCTA={{ text: 'Start Building', href: '/contact' }}
        secondaryCTA={{ text: 'View Documentation', href: '/blog' }}
      />
    </>
  );
}