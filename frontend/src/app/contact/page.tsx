'use client';

import React, { useEffect, useState } from 'react';

export default function ContactPage() {
    const [entries, setEntries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `query Getform {
  nodes {
    Full Name
    Email Address
    Message
  }
}`;
                const companyId = '1772689794109';
                const pageId = 'contact';
                const url = `http://localhost:4000/api/${companyId}/${pageId}?query=${encodeURIComponent(query)}`;

                const res = await fetch(url);
                const json = await res.json();

                // The API seems to return data nested under the pageId or the first key in data
                const pageData = json.data?.[pageId] || (json.data ? Object.values(json.data)[0] : null);
                if (pageData?.nodes && Array.isArray(pageData.nodes)) {
                    setEntries(pageData.nodes);
                }
            } catch (error) {
                console.error('Error fetching contact form data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Header */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = '/'}>
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                            C
                        </div>
                        <span className="text-xl font-bold tracking-tighter">CONTACT <span className="text-indigo-400">INQUIRIES</span></span>
                    </div>
                    <div className="flex gap-4">
                        <a href="/" className="px-5 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">Home</a>
                    </div>
                </div>
            </nav>

            <main className="relative pt-40 pb-32">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section: Heading */}
                    <div className="mb-16 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Live Submissions
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                            Inquiries
                        </h1>
                    </div>

                    {/* Section: The Form Entries Grid */}
                    <div className="relative">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-sm animate-pulse">
                                        <div className="h-6 bg-white/5 rounded w-1/2 mb-4"></div>
                                        <div className="h-4 bg-white/5 rounded w-3/4 mb-6"></div>
                                        <div className="h-20 bg-white/5 rounded w-full"></div>
                                    </div>
                                ))}
                            </div>
                        ) : entries.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {entries.map((entry, index) => (
                                    <div key={index} className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-blue-500/0 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                        <div className="relative bg-slate-900/60 border border-white/10 p-8 rounded-3xl backdrop-blur-md h-full flex flex-col hover:border-indigo-500/30 transition-colors">
                                            <div className="mb-6 flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-1">
                                                    {entry['Full Name'] || entry['full_name'] || 'Anonymous'}
                                                </h3>
                                                <a href={`mailto:${entry['Email Address'] || entry['email_address']}`} className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors">
                                                    {entry['Email Address'] || entry['email_address'] || 'No Email Provided'}
                                                </a>
                                            </div>
                                            <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                                                <p className="text-slate-300 text-sm leading-relaxed italic">
                                                    &quot;{entry['Message'] || entry['message'] || 'No message content.'}&quot;
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md">
                                <div className="text-6xl mb-6 opacity-30">📭</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Inquiries Found</h3>
                                <p className="text-slate-500">We couldn't find any form submissions.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
