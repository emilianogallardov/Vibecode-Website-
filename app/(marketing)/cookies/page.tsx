import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description: 'Learn about how we use cookies and similar technologies.',
  path: '/cookies',
});

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <p className="mb-6">
          This Cookie Policy explains how we use cookies and similar technologies on our website.
          By using our service, you consent to our use of cookies as described in this policy.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile)
            when you visit a website. They help websites remember your preferences and improve your experience.
          </p>
          <p className="mb-4">
            Cookies typically contain:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>A unique identifier</li>
            <li>The website domain</li>
            <li>Expiration date</li>
            <li>Some data relevant to the website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Essential Cookies (Required)</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function and cannot be disabled.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>next-auth.session-token</code></td>
                  <td className="border border-gray-300 px-4 py-2">Authentication - keeps you logged in</td>
                  <td className="border border-gray-300 px-4 py-2">30 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>next-auth.csrf-token</code></td>
                  <td className="border border-gray-300 px-4 py-2">Security - prevents CSRF attacks</td>
                  <td className="border border-gray-300 px-4 py-2">Session</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>__Host-next-auth.csrf-token</code></td>
                  <td className="border border-gray-300 px-4 py-2">Enhanced CSRF protection</td>
                  <td className="border border-gray-300 px-4 py-2">Session</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Functional Cookies (Optional)</h3>
          <p className="mb-4">
            These cookies enhance functionality and personalization but are not essential.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>cookie-consent</code></td>
                  <td className="border border-gray-300 px-4 py-2">Stores your cookie preferences</td>
                  <td className="border border-gray-300 px-4 py-2">1 year</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>theme</code></td>
                  <td className="border border-gray-300 px-4 py-2">Remembers dark/light mode preference</td>
                  <td className="border border-gray-300 px-4 py-2">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Analytics Cookies (Optional)</h3>
          <p className="mb-4">
            These cookies help us understand how visitors use our website so we can improve it.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>_ga</code></td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics - distinguishes users</td>
                  <td className="border border-gray-300 px-4 py-2">2 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>_ga_*</code></td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics - stores session state</td>
                  <td className="border border-gray-300 px-4 py-2">2 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code>_gid</code></td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics - distinguishes users</td>
                  <td className="border border-gray-300 px-4 py-2">24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-sm text-gray-600">
            <strong>Note:</strong> Analytics cookies are only set if you accept them via our cookie consent banner.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
          <p className="mb-4">
            Some cookies are set by third-party services we use:
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Google Analytics</h3>
          <p className="mb-4">
            We use Google Analytics to understand how visitors use our site. Google may use this data
            for its own purposes. Learn more about{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Google&apos;s privacy policy
            </a>.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 OAuth Providers (Google, GitHub)</h3>
          <p className="mb-4">
            When you sign in with Google or GitHub, they may set their own cookies. Refer to their privacy policies:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub Privacy Statement
              </a>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Cloudflare Turnstile</h3>
          <p className="mb-4">
            We use Cloudflare Turnstile for CAPTCHA verification. Cloudflare may set cookies for bot detection.
            See{' '}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Cloudflare&apos;s privacy policy
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookie Duration</h2>
          <p className="mb-4">
            We use two types of cookies based on duration:
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Session Cookies</h3>
          <p className="mb-4">
            Temporary cookies that are deleted when you close your browser. Used for essential functions like authentication.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Persistent Cookies</h3>
          <p className="mb-4">
            Remain on your device for a set period (specified in the tables above). Used to remember your preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Cookie Consent Banner</h3>
          <p className="mb-4">
            When you first visit our site, you&apos;ll see a cookie consent banner. You can choose to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Accept All:</strong> Allows all cookies including analytics</li>
            <li><strong>Essential Only:</strong> Only necessary cookies for site function</li>
            <li><strong>Customize:</strong> Choose which categories to allow</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Browser Settings</h3>
          <p className="mb-4">
            You can control cookies through your browser settings:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Chrome:</strong>{' '}
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Manage cookies in Chrome
              </a>
            </li>
            <li>
              <strong>Firefox:</strong>{' '}
              <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Manage cookies in Firefox
              </a>
            </li>
            <li>
              <strong>Safari:</strong>{' '}
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Manage cookies in Safari
              </a>
            </li>
            <li>
              <strong>Edge:</strong>{' '}
              <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Manage cookies in Edge
              </a>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Opt-Out Links</h3>
          <p className="mb-4">
            You can opt out of analytics cookies:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Analytics Opt-out Browser Add-on
              </a>
            </li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
            <p className="text-sm">
              <strong>Warning:</strong> Blocking all cookies may prevent you from using certain features of the website,
              such as staying logged in or saving preferences.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Do Not Track (DNT)</h2>
          <p className="mb-4">
            Some browsers have a &quot;Do Not Track&quot; (DNT) feature that signals websites not to track you.
            We respect DNT signals and will not load analytics cookies if DNT is enabled.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy to reflect changes in our practices or for legal reasons.
            We will notify you of significant changes by:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Updating the &quot;Last Updated&quot; date</li>
            <li>Displaying a notice on the website</li>
            <li>Requesting new consent if required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="mb-4">
            If you have questions about our use of cookies, please contact us:
          </p>
          <ul className="list-none mb-4 space-y-2">
            <li>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'privacy@example.com'}`} className="text-blue-600 hover:underline">
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'privacy@example.com'}
              </a>
            </li>
            <li>
              <strong>Contact Form:</strong>{' '}
              <a href="/contact" className="text-blue-600 hover:underline">
                /contact
              </a>
            </li>
          </ul>
        </section>

        <div className="bg-gray-100 p-6 rounded-lg mt-12">
          <h3 className="text-lg font-semibold mb-2">Summary (TL;DR)</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Essential cookies required for login and security (can&apos;t be disabled)</li>
            <li>Analytics cookies optional (can be disabled)</li>
            <li>We respect &quot;Do Not Track&quot; browser settings</li>
            <li>You can manage cookies via our banner or browser settings</li>
            <li>Third-party cookies from Google Analytics, OAuth providers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
