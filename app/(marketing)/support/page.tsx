import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'Support',
  description: 'Get help and support for our platform. Contact us or browse our FAQ.',
  path: '/support',
});

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Support</h1>
        <p className="text-xl text-gray-600 mb-12">
          We&apos;re here to help. Choose the best way to get support for your needs.
        </p>

        {/* Support Options */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📧</div>
            <h2 className="text-xl font-semibold mb-3">Email Support</h2>
            <p className="text-gray-700 mb-4">
              Get help via email. We typically respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Us →
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-xl font-semibold mb-3">Documentation</h2>
            <p className="text-gray-700 mb-4">
              Browse our comprehensive guides and tutorials.
            </p>
            <Link
              href="/docs"
              className="text-blue-600 hover:underline font-medium"
            >
              Read Docs →
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-xl font-semibold mb-3">Community</h2>
            <p className="text-gray-700 mb-4">
              Join our community for peer support and discussions.
            </p>
            <a
              href="https://discord.gg/yourdiscord"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Join Discord →
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                How do I get started?
              </summary>
              <p className="mt-4 text-gray-700">
                Follow our <Link href="/docs" className="text-blue-600 hover:underline">Quick Start Guide</Link> in the documentation.
                Install dependencies, set up your environment variables, and run the development server.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                What authentication providers are supported?
              </summary>
              <p className="mt-4 text-gray-700">
                We support email/password authentication, Google OAuth, and GitHub OAuth out of the box.
                You can easily add more providers by configuring NextAuth.js.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                How do I deploy to production?
              </summary>
              <p className="mt-4 text-gray-700">
                The easiest way is to deploy to Vercel. Simply connect your GitHub repository and Vercel
                will handle the build and deployment automatically. See our{' '}
                <Link href="/docs/deployment" className="text-blue-600 hover:underline">Deployment Guide</Link> for details.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                Is the codebase production-ready?
              </summary>
              <p className="mt-4 text-gray-700">
                Yes! The infrastructure is production-ready with A+ security, type safety, testing, and best practices.
                You&apos;ll need to customize content and add your own business logic, but the foundation is solid.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                How do I customize the design?
              </summary>
              <p className="mt-4 text-gray-700">
                The project uses Tailwind CSS for styling. Update the theme in <code className="bg-gray-200 px-2 py-1 rounded">tailwind.config.ts</code>,
                modify components in <code className="bg-gray-200 px-2 py-1 rounded">src/components/</code>, and customize
                site configuration in <code className="bg-gray-200 px-2 py-1 rounded">src/config/site.ts</code>.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                What database does it use?
              </summary>
              <p className="mt-4 text-gray-700">
                We use Prisma ORM with PostgreSQL by default. You can use any Prisma-supported database
                including MySQL, SQLite, MongoDB, CockroachDB, and more. Just update your <code className="bg-gray-200 px-2 py-1 rounded">DATABASE_URL</code>.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                How do I set up email sending?
              </summary>
              <p className="mt-4 text-gray-700">
                Sign up for <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Resend</a>,
                verify your domain, and add your API key to <code className="bg-gray-200 px-2 py-1 rounded">RESEND_API_KEY</code>.
                Without an API key, emails are logged to console (development mode).
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                Is rate limiting included?
              </summary>
              <p className="mt-4 text-gray-700">
                Yes! Rate limiting is built-in using Upstash Redis for production, with an in-memory fallback
                for development. The contact form and newsletter endpoints are rate-limited by default.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                What testing tools are included?
              </summary>
              <p className="mt-4 text-gray-700">
                The project includes Vitest for unit testing, Playwright for E2E testing, and ESLint for code quality.
                TypeScript ensures type safety. Run tests with <code className="bg-gray-200 px-2 py-1 rounded">npm run test</code>
                and <code className="bg-gray-200 px-2 py-1 rounded">npm run test:e2e</code>.
              </p>
            </details>

            <details className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <summary className="text-xl font-semibold cursor-pointer">
                How is security handled?
              </summary>
              <p className="mt-4 text-gray-700">
                Security is built-in with Content Security Policy (CSP), rate limiting, CAPTCHA verification,
                input validation with Zod, HTTPS-only cookies, secure headers, and protection against common
                attacks (XSS, CSRF, SQL injection, timing attacks).
              </p>
            </details>
          </div>
        </section>

        {/* Status & Uptime */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">System Status</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-lg font-semibold text-green-800">All Systems Operational</span>
            </div>
            <p className="text-gray-700 mb-4">
              All services are running smoothly. No reported issues.
            </p>
            <a
              href="https://status.yourdomain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Status Page →
            </a>
          </div>
        </section>

        {/* Contact Form CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Our support team is ready to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Documentation
            </Link>
          </div>
        </section>

        {/* Support Hours */}
        <section className="mt-16 text-center text-gray-600">
          <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
          <p>Weekend: Limited support (24-48 hour response time)</p>
          <p className="mt-4 text-sm">
            For urgent issues outside business hours, please mark your inquiry as &quot;Urgent&quot;
          </p>
        </section>
      </div>
    </div>
  );
}
