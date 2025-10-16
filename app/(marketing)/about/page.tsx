import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about our mission, values, and the team behind our platform.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're building modern, production-ready web infrastructure that developers love to use.
          Our mission is to provide the best foundation for your next project.
        </p>
      </div>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              We believe developers should spend time building unique features, not reinventing authentication,
              security, and infrastructure.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our platform provides production-grade infrastructure out of the box, so you can focus on what
              makes your product special.
            </p>
            <p className="text-lg text-gray-700">
              We're committed to open-source, best practices, and helping developers ship faster without
              compromising on quality or security.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">🚀 Fast</h3>
                <p className="text-gray-700">Ship production-ready apps in hours, not weeks</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">🔒 Secure</h3>
                <p className="text-gray-700">A+ security grade with OWASP best practices</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">⚡ Modern</h3>
                <p className="text-gray-700">Next.js 15, TypeScript, Prisma - latest tech</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-3">Developer First</h3>
            <p className="text-gray-600">
              Everything we build is designed with developers in mind. Great DX is not optional.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Production Ready</h3>
            <p className="text-gray-600">
              No toy examples or demos. Real code that you can deploy to production today.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-3">Open Source</h3>
            <p className="text-gray-600">
              We believe in transparency and giving back to the community that supports us.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-3">Security First</h3>
            <p className="text-gray-600">
              Security is built-in from day one, not bolted on as an afterthought.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-3">Well Documented</h3>
            <p className="text-gray-600">
              Comprehensive guides, examples, and documentation for everything we build.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
            <p className="text-gray-600">
              Following industry standards and patterns that scale with your application.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Technology</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Next.js 15 with App Router</li>
                <li>✓ React 18 with TypeScript</li>
                <li>✓ Tailwind CSS for styling</li>
                <li>✓ Server Components & Streaming</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ NextAuth v5 for authentication</li>
                <li>✓ Prisma ORM with PostgreSQL</li>
                <li>✓ Edge-ready API routes</li>
                <li>✓ Server Actions & tRPC ready</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ CSP with nonce generation</li>
                <li>✓ Rate limiting (Upstash Redis)</li>
                <li>✓ CAPTCHA (Cloudflare Turnstile)</li>
                <li>✓ Input validation (Zod)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">DevOps</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Vercel deployment ready</li>
                <li>✓ CI/CD with GitHub Actions</li>
                <li>✓ E2E tests (Playwright)</li>
                <li>✓ Performance monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Customize with your actual stats) */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">TypeScript</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">A+</div>
              <div className="text-blue-100">Security Grade</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95+</div>
              <div className="text-blue-100">Lighthouse Score</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">63/63</div>
              <div className="text-blue-100">Tests Passing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Customize with your team) */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We're a team of passionate developers, designers, and security experts committed to building
          the best developer tools and infrastructure.
        </p>
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers using our platform to ship faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
