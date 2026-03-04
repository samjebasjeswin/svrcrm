'use client';

import React, { useEffect, useState } from 'react';

export default function AboutUs() {
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `query Getstory {
          nodes {
            description
          }
        }`;
        const companyId = '1772623668865';
        const pageId = '1772625801537';
        const url = `http://localhost:4000/api/${companyId}/${pageId}?query=${encodeURIComponent(query)}`;

        const res = await fetch(url);
        const json = await res.json();

        // Data might be keyed by ID or 'about_us'
        const pageData = json.data[pageId] || Object.values(json.data)[0];
        if (pageData?.nodes?.length > 0) {
          setDescription(pageData.nodes[0].description || '');
        }
      } catch (error) {
        console.error('Error fetching about us data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-pink-500/30 overflow-hidden">
      {/* ... (rest of the component structure) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-pink-500/20">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">Antigravity <span className="text-pink-500">CRM</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="/" className="text-white hover:text-pink-500 transition-colors">About Us</a>
            <a href="/data" className="hover:text-pink-500 transition-colors">Data View</a>
          </div>
          <button className="px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-pink-500 hover:text-white transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      <main className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 relative">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-sm font-bold tracking-wide uppercase animate-float">
              Our Story
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              We define the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 animate-gradient-x">Future of Data</span>
            </h1>

            <div className="max-w-3xl mx-auto">
              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6 mx-auto"></div>
                  <div className="h-4 bg-white/10 rounded w-4/6 mx-auto"></div>
                </div>
              ) : (
                <p className="text-slate-400 text-xl md:text-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          {/* ... (rest of the component) */}

          {/* Stats / Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {[
              { label: 'Users Worldwide', value: '50K+' },
              { label: 'Data Points Mapped', value: '1.2B' },
              { label: 'Uptime Reliability', value: '99.9%' },
              { label: 'Support Rating', value: '5/5' },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center group">
                <div className="text-9xl group-hover:scale-110 transition-transform duration-500">🚀</div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Innovation first, <br />always.</h2>
              <div className="space-y-6">
                {[
                  { title: 'Dynamic Architecture', text: 'Our system adapts to your data structure in real-time.' },
                  { title: 'Aesthetic Focus', text: 'We believe software should be as beautiful as it is functional.' },
                  { title: 'Global Connectivity', text: 'Linking companies and data across the globe with one click.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.title}</h4>
                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-sm">© 2026 Antigravity CRM Demo. Built with Next.js 16 and Passion.</p>
        </div>
      </footer>
    </div>
  );
}
