import { auth } from '@/../../auth';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/auth/SignOutButton';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {session.user.name || session.user.email}!
              </h2>
              <p className="text-gray-600 mb-6">
                You have successfully signed in to your dashboard.
              </p>

              <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h3>
                <dl className="space-y-2 text-left">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{session.user.name || 'Not set'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{session.user.email}</dd>
                  </div>
                  {session.user.image && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Avatar</dt>
                      <dd className="mt-1">
                        <img
                          src={session.user.image}
                          alt="Profile"
                          className="h-12 w-12 rounded-full"
                        />
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
