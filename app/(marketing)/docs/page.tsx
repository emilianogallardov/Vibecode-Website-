import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'Documentation',
  description: 'Complete documentation for getting started and building with our platform.',
  path: '/docs',
});

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
        <p className="text-xl text-gray-600 mb-12">
          Everything you need to know to get started and build amazing applications.
        </p>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Installation</h3>
            <div className="bg-gray-900 text-gray-100 rounded p-4 mb-4 overflow-x-auto">
              <pre className="text-sm">
{`# Clone the repository
git clone https://github.com/yourusername/vibecode-website-template.git
cd vibecode-website-template

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
npm run db:push

# Start development server
npm run dev`}
              </pre>
            </div>
            <p className="text-gray-700">
              Open <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:3000</code> in your browser.
            </p>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Core Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">🔐 Authentication</h3>
              <p className="text-gray-700 mb-4">
                Built-in authentication with NextAuth v5. Supports email/password, Google, and GitHub OAuth.
              </p>
              <Link href="/docs/authentication" className="text-blue-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">🗄️ Database</h3>
              <p className="text-gray-700 mb-4">
                Prisma ORM with PostgreSQL. Type-safe queries and automatic migrations included.
              </p>
              <Link href="/docs/database" className="text-blue-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">🛡️ Security</h3>
              <p className="text-gray-700 mb-4">
                Production-grade security with CSP, rate limiting, CAPTCHA, and input validation.
              </p>
              <Link href="/docs/security" className="text-blue-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">📧 Email</h3>
              <p className="text-gray-700 mb-4">
                Email integration with Resend. Contact forms, transactional emails, and more.
              </p>
              <Link href="/docs/email" className="text-blue-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">📝 Blog System</h3>
              <p className="text-gray-700 mb-4">
                MDX-powered blog with syntax highlighting, embeds, and enhanced markdown features.
              </p>
              <Link href="/docs/blog" className="text-blue-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">🚀 Deployment</h3>
              <p className="text-gray-700 mb-4">
                Deploy to Vercel, Netlify, or any platform that supports Next.js applications.
              </p>
              <Link href="/docs/deployment" className="text-blue-600 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Configuration</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Environment Variables</h3>
            <p className="text-gray-700 mb-4">
              Required environment variables in your <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code> file:
            </p>
            <div className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto">
              <pre className="text-sm">
{`# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_xxxxx"
EMAIL_FROM="noreply@yourdomain.com"
CONTACT_EMAIL="hello@yourdomain.com"

# Rate Limiting (Optional - Upstash Redis)
UPSTASH_REDIS_REST_URL="https://xxxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxxxx"

# CAPTCHA (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAxxx"
TURNSTILE_SECRET_KEY="0x4AAAxxx"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"
GITHUB_CLIENT_ID="xxxxx"
GITHUB_CLIENT_SECRET="xxxxx"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"`}
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Site Configuration</h3>
            <p className="text-gray-700 mb-4">
              Update site settings in <code className="bg-gray-200 px-2 py-1 rounded">src/config/site.ts</code>:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Site name, description, and URL</li>
              <li>Navigation menu items</li>
              <li>Social media links</li>
              <li>Footer links and sections</li>
              <li>Contact information</li>
            </ul>
          </div>
        </section>

        {/* Available Scripts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Available Scripts</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run dev</code>
                <p className="text-gray-700 mt-2">Start development server on http://localhost:3000</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run build</code>
                <p className="text-gray-700 mt-2">Build for production</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run start</code>
                <p className="text-gray-700 mt-2">Start production server</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run typecheck</code>
                <p className="text-gray-700 mt-2">Run TypeScript type checking</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run lint</code>
                <p className="text-gray-700 mt-2">Run ESLint</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run test</code>
                <p className="text-gray-700 mt-2">Run unit tests (Vitest)</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run test:e2e</code>
                <p className="text-gray-700 mt-2">Run E2E tests (Playwright)</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run db:push</code>
                <p className="text-gray-700 mt-2">Push database schema changes</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run db:migrate</code>
                <p className="text-gray-700 mt-2">Create and apply database migration</p>
              </div>
              <div>
                <code className="bg-gray-900 text-gray-100 px-3 py-1 rounded">npm run db:studio</code>
                <p className="text-gray-700 mt-2">Open Prisma Studio (database GUI)</p>
              </div>
            </div>
          </div>
        </section>

        {/* API Routes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">API Routes</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Endpoint</th>
                  <th className="text-left py-3 px-4">Method</th>
                  <th className="text-left py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-3 px-4"><code>/api/auth/*</code></td>
                  <td className="py-3 px-4">Various</td>
                  <td className="py-3 px-4">NextAuth authentication endpoints</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>/api/contact</code></td>
                  <td className="py-3 px-4">POST</td>
                  <td className="py-3 px-4">Contact form submission</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>/api/newsletter</code></td>
                  <td className="py-3 px-4">POST</td>
                  <td className="py-3 px-4">Newsletter subscription</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>/api/rss</code></td>
                  <td className="py-3 px-4">GET</td>
                  <td className="py-3 px-4">RSS feed for blog posts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Troubleshooting</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Database connection errors</h3>
              <p className="text-gray-700">
                Ensure your <code className="bg-gray-200 px-2 py-1 rounded">DATABASE_URL</code> is correct and the database is running.
                Run <code className="bg-gray-200 px-2 py-1 rounded">npm run db:push</code> to sync schema.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Authentication not working</h3>
              <p className="text-gray-700">
                Check that <code className="bg-gray-200 px-2 py-1 rounded">AUTH_SECRET</code> and <code className="bg-gray-200 px-2 py-1 rounded">AUTH_URL</code> are set.
                For OAuth, verify your client IDs and secrets are correct.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Emails not sending</h3>
              <p className="text-gray-700">
                Verify <code className="bg-gray-200 px-2 py-1 rounded">RESEND_API_KEY</code> and <code className="bg-gray-200 px-2 py-1 rounded">EMAIL_FROM</code> are set.
                Without API key, emails will be logged to console (development mode).
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Rate limiting issues</h3>
              <p className="text-gray-700">
                If Upstash Redis is not configured, an in-memory fallback is used (restarts on server restart).
                For production, configure Upstash Redis.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">📚 Official Docs</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Next.js Documentation</a></li>
                <li>• <a href="https://authjs.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NextAuth.js Docs</a></li>
                <li>• <a href="https://www.prisma.io/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Prisma Documentation</a></li>
                <li>• <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tailwind CSS Docs</a></li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">🛠️ Tools & Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <a href="https://resend.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Resend Email API</a></li>
                <li>• <a href="https://docs.upstash.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Upstash Redis</a></li>
                <li>• <a href="https://developers.cloudflare.com/turnstile/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cloudflare Turnstile</a></li>
                <li>• <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vercel Deployment</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </div>
  );
}
