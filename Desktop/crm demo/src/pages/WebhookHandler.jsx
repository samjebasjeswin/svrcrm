import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function WebhookHandler() {
    const { search } = useLocation();
    const pathParams = useParams();
    const { submitExternalForm } = useApp();
    const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
    const navigate = useNavigate();

    useEffect(() => {
        if (status !== 'processing') return;

        const params = new URLSearchParams(search);

        // Path params take priority (new /api/:companyId/:type route)
        // Fall back to query params (old /webhook/submit?companyId=X&type=Y route)
        const companyId = pathParams.companyId || params.get('companyId');
        const type = pathParams.type || params.get('type') || 'contact';

        if (!companyId) {
            setStatus('error');
            return;
        }

        // Collect all other parameters as form data
        const data = {};
        params.forEach((value, key) => {
            if (key !== 'companyId' && key !== 'type') {
                data[key] = value;
            }
        });

        submitExternalForm(companyId, type, data);
        setStatus('success');
    }, []);

    if (status === 'error') {
        return (
            <div className="page-center">
                <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '40px', maxWidth: '400px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
                    <h2 style={{ color: 'var(--danger)' }}>Configuration Error</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                        Missing <code>companyId</code> in the webhook request.
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => navigate('/')}>
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="page-center">
                <div className="card animate-fade-in-up" style={{ textAlign: 'center', padding: '50px', maxWidth: '500px', border: '2px solid var(--success)' }}>
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                    <h2 style={{ color: 'var(--success)', marginTop: '30px' }}>Submission Successful!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '16px' }}>
                        Your information has been securely transmitted to the CRM.
                    </p>
                    <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                            This form was submitted via the <b>CRM Webhook API</b>.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-center">
            <div style={{ textAlign: 'center' }}>
                <div className="loader"></div>
                <h3 style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Processing Submission...</h3>
            </div>
        </div>
    );
}

// Add these styles to your index.css later or a specific CSS file
