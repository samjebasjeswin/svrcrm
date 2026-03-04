import React from 'react';

export default function EmptyDataPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-pink-500/30">
            {/* Top Navigation / Header */}
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span className="font-bold tracking-tight text-xl">CRM <span className="text-pink-500">Data</span></span>
                    </div>
                    <div className="flex gap-6 text-sm font-medium text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Documentation</a>
                        <a href="#" className="hover:text-white transition-colors">API Keys</a>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Empty Page
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        This is your clean slate. You can now start fetching and displaying your dynamic CRM data here using the GraphQL-style endpoints.
                    </p>
                </div>

                {/* Data Card Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl leading-none flex items-start space-x-6">
                                <div className="flex-1 space-y-4">
                                    <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 w-full bg-slate-800/50 rounded animate-pulse"></div>
                                        <div className="h-3 w-5/6 bg-slate-800/50 rounded animate-pulse"></div>
                                    </div>
                                    <div className="pt-4 flex items-center justify-between">
                                        <div className="h-6 w-16 bg-pink-500/10 border border-pink-500/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instructions Alert */}
                <div className="mt-16 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex gap-4 items-start">
                    <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-indigo-100 mb-1">Getting Started</h3>
                        <p className="text-indigo-200/60 text-sm leading-relaxed">
                            To fetch data, use a <code>useEffect</code> hook or Server Components to call your dynamic endpoint:<br />
                            <code className="text-pink-400 mt-2 block bg-black/30 p-2 rounded">fetch('http://localhost:5173/api/REPORT_ID/PAGE_ID')</code>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
