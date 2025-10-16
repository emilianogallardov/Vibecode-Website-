import type { Metadata } from 'next';
import { PricingTable } from '@/components/website-examples/PricingTable/PricingTable';
import { FAQSection } from '@/components/website-examples/FAQSection/FAQSection';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing',
  description: 'Simple, transparent pricing for teams of all sizes',
  path: '/pricing',
});

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small projects',
      features: [
        'Up to 3 team members',
        '10 projects',
        'Basic analytics',
        'Email support',
        '1GB storage',
      ],
      cta: { text: 'Start Free Trial', href: '/contact' },
      featured: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing teams',
      features: [
        'Up to 20 team members',
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '100GB storage',
        'Custom domains',
        'API access',
      ],
      cta: { text: 'Start Free Trial', href: '/contact' },
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited team members',
        'Unlimited projects',
        'Custom analytics',
        'Dedicated support',
        'Unlimited storage',
        'Custom domains',
        'API access',
        'SSO/SAML',
        'SLA guarantee',
      ],
      cta: { text: 'Contact Sales', href: '/contact' },
      featured: false,
    },
  ];

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all plans come with a 14-day free trial. No credit card required.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
    },
    {
      question: 'Do you offer discounts for nonprofits?',
      answer: 'Yes, we offer 50% off all plans for registered nonprofit organizations.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-gray-600">
          Choose the perfect plan for your needs. Always flexible to scale.
        </p>
      </div>

      <PricingTable plans={plans} />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our pricing"
        faqs={faqs}
      />
    </div>
  );
}