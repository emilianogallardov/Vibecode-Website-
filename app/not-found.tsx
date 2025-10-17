import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">Helpful Links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Blog
            </Link>
            <Link href="/docs" className="text-blue-600 hover:underline">
              Documentation
            </Link>
            <Link href="/pricing" className="text-blue-600 hover:underline">
              Pricing
            </Link>
            <Link href="/about" className="text-blue-600 hover:underline">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}