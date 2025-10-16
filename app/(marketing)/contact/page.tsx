import type { Metadata } from 'next';
import { ContactForm } from '@/components/website-examples/ContactForm/ContactForm';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description: 'Get in touch with our team. We\'d love to hear from you.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600">
          Have a question or want to work together? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">hello@example.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9am - 5pm PST</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Response Time</h3>
            <p className="text-gray-600">
              We typically respond within 24 business hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}