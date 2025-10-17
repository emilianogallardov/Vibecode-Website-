import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Terms and conditions for using our service.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <p className="mb-6">
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using our service.
          By accessing or using the service, you agree to be bound by these Terms.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By creating an account, accessing, or using our service, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and our Privacy Policy.
          </p>
          <p className="mb-4">
            If you do not agree to these Terms, you may not access or use the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
          <p className="mb-4">
            You must be at least 13 years old to use this service. If you are between 13 and 18 years old,
            you must have permission from a parent or legal guardian.
          </p>
          <p className="mb-4">
            By using the service, you represent and warrant that you meet these eligibility requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Account Creation</h3>
          <p className="mb-4">
            To access certain features, you must create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your information to keep it accurate</li>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Account Security</h3>
          <p className="mb-4">
            You are responsible for safeguarding your account credentials. We implement security measures,
            but you must also take reasonable steps to protect your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Permitted Use</h3>
          <p className="mb-4">
            You may use the service only for lawful purposes and in accordance with these Terms.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Prohibited Activities</h3>
          <p className="mb-4">
            You agree NOT to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Upload viruses, malware, or malicious code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Engage in automated scraping or data collection without permission</li>
            <li>Impersonate any person or entity</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Transmit spam or unsolicited communications</li>
            <li>Use the service for illegal purposes</li>
            <li>Reverse engineer or decompile any part of the service</li>
            <li>Attempt to bypass security measures or rate limits</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Your Content</h3>
          <p className="mb-4">
            You retain ownership of any content you submit to the service (&quot;User Content&quot;).
            By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free license
            to use, reproduce, modify, and distribute your content solely to provide the service.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Content Standards</h3>
          <p className="mb-4">
            You are solely responsible for your User Content. You represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You own or have the necessary rights to the content</li>
            <li>The content does not violate any laws or third-party rights</li>
            <li>The content does not contain malware or malicious code</li>
            <li>The content complies with these Terms</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Content Moderation</h3>
          <p className="mb-4">
            We reserve the right (but have no obligation) to monitor, remove, or modify User Content
            that violates these Terms or is otherwise objectionable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Our Rights</h3>
          <p className="mb-4">
            The service, including its design, code, features, and content (excluding User Content),
            is owned by us and protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Limited License</h3>
          <p className="mb-4">
            We grant you a limited, non-exclusive, non-transferable license to access and use the service
            for personal or business purposes in accordance with these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Fees and Payment</h2>
          <p className="mb-4">
            Some features may require payment. If you choose to purchase paid features:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fees are as stated at the time of purchase</li>
            <li>All fees are non-refundable unless required by law</li>
            <li>We may change fees with 30 days notice</li>
            <li>You authorize us to charge your payment method</li>
            <li>Subscription fees are billed in advance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Termination by You</h3>
          <p className="mb-4">
            You may terminate your account at any time by contacting us or using the account deletion feature.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Termination by Us</h3>
          <p className="mb-4">
            We may suspend or terminate your account at any time, with or without notice, for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violation of these Terms</li>
            <li>Fraudulent or illegal activity</li>
            <li>Extended periods of inactivity</li>
            <li>Risk to security or integrity of the service</li>
            <li>Any reason at our discretion</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Effect of Termination</h3>
          <p className="mb-4">
            Upon termination:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your right to access the service immediately ceases</li>
            <li>We may delete your account and User Content</li>
            <li>Provisions that should survive termination will remain in effect</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
          <p className="mb-4 uppercase">
            <strong>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR
            A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</strong>
          </p>
          <p className="mb-4">
            We do not warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The service will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The service is free of viruses or harmful components</li>
            <li>Results from using the service will be accurate or reliable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
          <p className="mb-4 uppercase">
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
            WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
            INTANGIBLE LOSSES.</strong>
          </p>
          <p className="mb-4">
            Our total liability for any claims arising from these Terms or the service shall not exceed
            the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify, defend, and hold us harmless from any claims, liabilities, damages,
            losses, and expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your use of the service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any laws or third-party rights</li>
            <li>Your User Content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
          <p className="mb-4">
            We may modify these Terms at any time. Material changes will be communicated through:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Email notification to your registered email</li>
            <li>Prominent notice on the service</li>
            <li>Updated &quot;Last Updated&quot; date at the top of this page</li>
          </ul>
          <p className="mb-4">
            Your continued use of the service after changes indicates acceptance of the updated Terms.
            If you do not agree, you must stop using the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
          <p className="mb-4">
            These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
            Any disputes shall be resolved in the courts of [Your Jurisdiction].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">14.1 Informal Resolution</h3>
          <p className="mb-4">
            Before filing any legal claim, you agree to contact us to attempt to resolve the dispute informally.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">14.2 Arbitration</h3>
          <p className="mb-4">
            If informal resolution fails, disputes shall be resolved through binding arbitration, except for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Small claims court cases</li>
            <li>Intellectual property disputes</li>
            <li>Claims for injunctive relief</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Miscellaneous</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.1 Entire Agreement</h3>
          <p className="mb-4">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and us.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.2 Severability</h3>
          <p className="mb-4">
            If any provision is found to be unenforceable, the remaining provisions will remain in full effect.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.3 Waiver</h3>
          <p className="mb-4">
            Our failure to enforce any right or provision does not constitute a waiver of that right or provision.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.4 Assignment</h3>
          <p className="mb-4">
            You may not assign these Terms without our consent. We may assign these Terms without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
          <p className="mb-4">
            For questions about these Terms, please contact us:
          </p>
          <ul className="list-none mb-4 space-y-2">
            <li>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'legal@example.com'}`} className="text-blue-600 hover:underline">
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'legal@example.com'}
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
            <li>Use the service lawfully and responsibly</li>
            <li>Don&apos;t abuse, hack, or spam the service</li>
            <li>You own your content, we own the platform</li>
            <li>Service provided &quot;as is&quot; with no guarantees</li>
            <li>We can terminate accounts for violations</li>
            <li>Disputes resolved through arbitration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
