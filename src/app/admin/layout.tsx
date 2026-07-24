'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const navLinks = [
  { href: '/admin', label: 'Overview', icon: '📊' },
  { href: '/admin/menu', label: 'Menu Management', icon: '🍔' },
  { href: '/admin/orders', label: 'Live Orders', icon: '📋' },
  { href: '/admin/reviews', label: 'Reviews & Complaints', icon: '⭐' },
  { href: '/admin/qr', label: 'QR Generator', icon: '📱' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/10 flex flex-col z-10">
        <div className="p-6">
          <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent neon-text">QuickServe</h2>
          <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border-l-4 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                    : 'text-slate-300 hover:bg-white/10 hover:text-blue-400'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="glass border-b border-white/10 h-16 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-bold text-slate-100">
            {navLinks.find((l) => l.href === pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-slate-400">
              System Admin
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
