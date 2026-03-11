'use client';

import React, { useState } from 'react';

export default function ContactSubmissionForm() {
    const [formData, setFormData] = useState({
        'Full Name': '',
        'Email Address': '',
        'Message': ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const companyId = '1772689794109';
            const pageId = 'contact';
            const url = `http://localhost:4000/api/${companyId}/${pageId}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setSubmitStatus('success');
            setFormData({
                'Full Name': '',
                'Email Address': '',
                'Message': ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative flex flex-col items-center justify-center p-6">
            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Header / Nav */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = '/'}>
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                            G
                        </div>
                        <span className="text-xl font-bold tracking-tighter">GET IN <span className="text-indigo-400">TOUCH</span></span>
                    </div>
                    <div className="flex gap-4">
                        <a href="/contact" className="px-5 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">View Submissions</a>
                    </div>
                </div>
            </nav>

            {/* Form Container */}
            <div className="w-full max-w-2xl mt-32 mb-20 relative z-10">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                        Let's Talk
                    </h1>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                        Have a question or want to work together? Leave your details below and we'll get back to you shortly.
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                    <form
                        onSubmit={handleSubmit}
                        className="relative bg-slate-900/60 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl shadow-2xl flex flex-col gap-8"
                    >
                        {submitStatus === 'success' && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-2xl flex items-center gap-4 animate-fade-in">
                                <span className="text-2xl">✨</span>
                                <div>
                                    <h4 className="font-bold text-emerald-300">Message Sent!</h4>
                                    <p className="text-sm opacity-80">We've received your inquiry and will be in touch soon.</p>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl flex items-center gap-4 animate-fade-in">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <h4 className="font-bold text-red-300">Submission Failed</h4>
                                    <p className="text-sm opacity-80">Something went wrong. Please try again later.</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-2">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Full Name" className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    id="Full Name"
                                    name="Full Name"
                                    required
                                    value={formData['Full Name']}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium text-lg"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="Email Address" className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="Email Address"
                                    name="Email Address"
                                    required
                                    value={formData['Email Address']}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="Message" className="text-sm font-semibold text-slate-300 ml-1">Your Message</label>
                            <textarea
                                id="Message"
                                name="Message"
                                required
                                rows={5}
                                value={formData['Message']}
                                onChange={handleChange}
                                placeholder="Tell us about your project..."
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none font-medium text-lg"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full relative group overflow-hidden rounded-2xl font-bold text-lg transition-all
                                    ${isSubmitting ? 'bg-indigo-600/50 cursor-not-allowed text-white/50' : 'bg-white text-black hover:text-white active:scale-[0.98]'}`}
                            >
                                {!isSubmitting && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                )}
                                <div className="relative px-8 py-5 flex items-center justify-center gap-3">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
