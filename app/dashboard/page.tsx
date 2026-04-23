'use client';

import { AuthGuard } from '@/modules/auth/components/AuthGuard';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { AppButton } from '@/components/primitives/AppButton';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back to AMS Enterprise
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">User Profile</h3>
            <div className="mt-4 space-y-1">
              <p className="text-lg font-semibold">{user?.nama_lengkap}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{user?.email}</p>
              <p className="text-xs inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 font-medium">
                {user?.roles?.[0]?.nama_role || 'User'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <AppButton variant="danger" onClick={logout}>
            Sign Out
          </AppButton>
        </div>
      </div>
    </AuthGuard>
  );
}
