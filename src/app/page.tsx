import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Logo Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.4)] mb-8 transform hover:scale-105 transition-transform duration-300">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 mb-6 drop-shadow-sm tracking-tight">
          Welcome to QuickServe
        </h1>
        
        <p className="text-lg md:text-xl text-blue-200/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          The next generation of restaurant dining. Scan the QR code at your table to access the digital menu, place your order, and track its progress in real-time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link 
            href="/menu?table=1" 
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Demo Customer View (Table 1)
            </span>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
          <div className="glass p-6 rounded-2xl text-left border border-white/5 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-white font-bold mb-2">Instant Ordering</h3>
            <p className="text-slate-400 text-sm">No waiting for waiters. Browse the vast menu and order directly from your phone.</p>
          </div>
          
          <div className="glass p-6 rounded-2xl text-left border border-white/5 hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-white font-bold mb-2">Live Tracking</h3>
            <p className="text-slate-400 text-sm">Watch your order progress from the kitchen to your table with estimated ready times.</p>
          </div>
          
          <div className="glass p-6 rounded-2xl text-left border border-white/5 hover:border-green-500/30 transition-colors">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-white font-bold mb-2">Digital Billing</h3>
            <p className="text-slate-400 text-sm">Get an itemized receipt instantly and submit reviews securely.</p>
          </div>
        </div>
      </main>

      {/* Footer / Staff Login */}
      <footer className="absolute bottom-8 w-full text-center z-10">
        <Link 
          href="/login" 
          className="text-slate-500 hover:text-blue-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Staff Portal Login
        </Link>
      </footer>
    </div>
  );
}
