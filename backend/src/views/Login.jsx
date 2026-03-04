"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useApp();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate a small delay for feel
        setTimeout(() => {
            const result = login(username, password);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.message);
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="login-page">
            <div className="login-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="login-card animate-fade-in-up">
                <div className="login-header">
                    <div className="login-logo">
                        <span className="logo-icon">🔒</span>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to access the console</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error animate-shake">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div className="form-group-modern">
                        <label>Username</label>
                        <div className="input-wrapper-modern">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group-modern">
                        <label>Password</label>
                        <div className="input-wrapper-modern">
                            <span className="input-icon">🔑</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>© 2026 CRM Console. All rights reserved.</p>
                </div>
            </div>

            <div className="login-hints">
                <div className="hint-card">
                    <strong>Super Admin</strong>
                    <span>superadmin / pass</span>
                </div>
                <div className="hint-card">
                    <strong>System Admin</strong>
                    <span>systemadmin / password</span>
                </div>
            </div>
        </div>
    );
}
