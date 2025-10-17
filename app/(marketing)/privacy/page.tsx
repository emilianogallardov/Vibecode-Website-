import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Information You Provide</h3>
          <p className="mb-4">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, password when you create an account</li>
            <li><strong>Contact Information:</strong> Name, email, subject, and message when you use our contact form</li>
            <li><strong>Newsletter:</strong> Email address if you subscribe to our newsletter</li>
            <li><strong>OAuth Data:</strong> If you sign in with Google or GitHub, we receive your name, email, and profile picture</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Automatically Collected Information</h3>
          <p className="mb-4">
            When you use our service, we automatically collect:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Usage Data:</strong> Pages visited, time spent, links clicked</li>
            <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
            <li><strong>Cookies:</strong> Session cookies, analytics cookies (see Cookie Policy)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Create and manage your account</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Send newsletters if you&apos;ve opted in</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 We Do NOT Sell Your Data</h3>
          <p className="mb-4">
            We do not sell, rent, or trade your personal information to third parties.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Service Providers</h3>
          <p className="mb-4">
            We share information with service providers who help us operate our service:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Hosting:</strong> Vercel (infrastructure hosting)</li>
            <li><strong>Database:</strong> Your database provider (e.g., Neon, PlanetScale)</li>
            <li><strong>Email:</strong> Resend (transactional emails)</li>
            <li><strong>Analytics:</strong> Google Analytics (anonymized usage data)</li>
            <li><strong>Authentication:</strong> Google, GitHub (OAuth providers)</li>
            <li><strong>Security:</strong> Cloudflare Turnstile (CAPTCHA), Upstash (rate limiting)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Legal Requirements</h3>
          <p className="mb-4">
            We may disclose your information if required by law or in response to valid legal requests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Encryption:</strong> All data transmitted over HTTPS (TLS 1.3)</li>
            <li><strong>Password Storage:</strong> Passwords hashed with bcrypt (cost factor 12)</li>
            <li><strong>Rate Limiting:</strong> Protection against brute force attacks</li>
            <li><strong>CAPTCHA:</strong> Protection against automated abuse</li>
            <li><strong>Security Headers:</strong> CSP, HSTS, X-Frame-Options, etc.</li>
          </ul>
          <p className="mb-4">
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p className="mb-4">
            We retain your information for as long as your account is active or as needed to provide services:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Data:</strong> Retained until you delete your account</li>
            <li><strong>Contact Form:</strong> Stored for 2 years for support purposes</li>
            <li><strong>Analytics:</strong> Anonymized data stored for 26 months (Google Analytics default)</li>
            <li><strong>Logs:</strong> Security and error logs retained for 90 days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights (GDPR/CCPA)</h2>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
            <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
            <li><strong>Restriction:</strong> Request restriction of processing</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact us at{' '}
            <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'privacy@example.com'}`} className="text-blue-600 hover:underline">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'privacy@example.com'}
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p className="mb-4">
            We use cookies for authentication, preferences, and analytics. See our{' '}
            <a href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</a> for details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
          <p className="mb-4">
            Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
            If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your country of residence.
            We ensure appropriate safeguards are in place to protect your data in compliance with applicable laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of material changes by:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Posting the new policy on this page</li>
            <li>Updating the &quot;Last Updated&quot; date</li>
            <li>Sending an email notification (for significant changes)</li>
          </ul>
          <p className="mb-4">
            Your continued use of our service after changes indicates acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy, please contact us:
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

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Data Protection Officer</h2>
          <p className="mb-4">
            For GDPR-related inquiries, you can contact our Data Protection Officer at{' '}
            <a href={`mailto:dpo@${process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'example.com'}`} className="text-blue-600 hover:underline">
              dpo@{process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'example.com'}
            </a>
          </p>
        </section>

        <div className="bg-gray-100 p-6 rounded-lg mt-12">
          <h3 className="text-lg font-semibold mb-2">Summary (TL;DR)</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>We collect only what&apos;s necessary to provide our service</li>
            <li>We do NOT sell your data</li>
            <li>Your data is encrypted and secured</li>
            <li>You can request deletion at any time</li>
            <li>We&apos;re GDPR and CCPA compliant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
