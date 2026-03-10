'use client';

import React, { useEffect, useState } from 'react';

export default function StoryPage() {
    const [story, setStory] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `query Getstory {
          nodes {
            description
          }
        }`;
                // Using the exact companyId and pageId provided by the user
                const companyId = '1772689794109';
                const pageId = '1773113847811';
                const url = `http://localhost:4000/api/${companyId}/${pageId}?query=${encodeURIComponent(query)}`;

                const res = await fetch(url);
                const json = await res.json();

                const pageData = json.data[pageId] || (json.data ? Object.values(json.data)[0] : null);
                if (pageData?.nodes?.length > 0) {
                    // Extracting the description as per the query
                    setStory(pageData.nodes[0].description || '');
                }
            } catch (error) {
                console.error('Error fetching story data:', error);
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
                            S
                        </div>
                        <span className="text-xl font-bold tracking-tighter">OUR <span className="text-indigo-400">STORY</span></span>
                    </div>
                    <div className="flex gap-4">
                        <a href="/" className="px-5 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">Home</a>
                    </div>
                </div>
            </nav>

            <main className="relative pt-40 pb-32">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Section: Story Heading */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Company Origins
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                            Story
                        </h1>
                    </div>

                    {/* Section: The Story Content */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-slate-900/40 border border-white/5 p-10 md:p-16 rounded-3xl backdrop-blur-sm">
                            {isLoading ? (
                                <div className="space-y-6 animate-pulse">
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-lg max-w-none">
                                    {story ? (
                                        <div
                                            className="text-slate-300 text-xl md:text-2xl leading-relaxed font-light italic border-l-4 border-indigo-500 pl-8 py-2 whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{ __html: story }}
                                        />
                                    ) : (
                                        <div className="text-slate-500 italic">No story data found.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="group relative px-8 py-4 bg-white text-black rounded-2xl font-bold overflow-hidden transition-all active:scale-95"
                        >
                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative group-hover:text-white transition-colors duration-300">Back to Home</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="relative py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm">© 2026 Antigravity Story Archive</div>
                    <div className="flex gap-8 text-slate-500 text-xs font-bold tracking-widest uppercase">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
