import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function InquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { inquiries, updateInquiryStatus, companies } = useApp();

    const inquiry = useMemo(() => {
        return inquiries.find(i => String(i.id) === String(id));
    }, [inquiries, id]);

    const company = useMemo(() => {
        if (!inquiry) return null;
        return companies.find(c => c.id === inquiry.companyId);
    }, [companies, inquiry]);

    if (!inquiry) {
        return (
            <div className="dashboard-page" style={{ textAlign: 'center', padding: '100px' }}>
                <h2>Inquiry not found</h2>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const detailFields = [
        { label: 'Full Name', value: inquiry.fullName },
        { label: 'Email', value: inquiry.email },
        { label: 'Phone', value: inquiry.phone },
        { label: 'Company', value: inquiry.company },
        { label: 'Submitted At', value: inquiry.submittedAt },
        { label: 'Form Type', value: inquiry.type === 'product' ? 'Product Inquiry' : 'Contact Form' },
        { label: 'Subject', value: inquiry.subject },
    ];

    if (inquiry.type === 'product') {
        detailFields.push(
            { label: 'Product Name', value: inquiry.productName },
            { label: 'Quantity', value: inquiry.quantity }
        );
    }

    return (
        <div className="dashboard-page animate-fade-in" style={{ background: 'var(--bg-app)', minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ paddingLeft: 0, marginBottom: '8px' }}>
                            ← Back to List
                        </button>
                        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Inquiry Details</h1>
                        <p style={{ color: 'var(--text-muted)', margin: '4px 0 0' }}>Reference ID: #{inquiry.id}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Status</div>
                            <select
                                className="form-control"
                                style={{ width: '120px', height: '40px', fontWeight: '700' }}
                                value={inquiry.status || 'New'}
                                onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                            >
                                <option value="New">New</option>
                                <option value="Seen">Seen</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Info Grid */}
                        <div className="card" style={{ padding: '32px', borderRadius: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Configuration & Contact</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                {detailFields.map((field, i) => (
                                    <div key={i}>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{field.label}</div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>{field.value || '—'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="card" style={{ padding: '32px', borderRadius: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Message</h3>
                            <div style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '24px',
                                fontSize: '16px',
                                lineHeight: '1.8',
                                color: 'var(--text-primary)',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {inquiry.message}
                            </div>
                        </div>

                        {/* Technical Specs */}
                        {inquiry.specifications && (
                            <div className="card" style={{ padding: '32px', borderRadius: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Technical Specifications</h3>
                                <div style={{
                                    background: 'var(--bg-app)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    color: 'var(--text-secondary)',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {inquiry.specifications}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div className="card" style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)', border: 'none', color: 'white' }}>
                            <h4 style={{ margin: '0 0 16px', fontSize: '14px', opacity: 0.8 }}>Target Company</h4>
                            <div style={{ fontSize: '24px', fontWeight: '800' }}>{company?.name || 'Unknown'}</div>
                            <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>ID: {company?.id}</div>
                        </div>

                        <div className="card" style={{ padding: '24px', borderRadius: '20px' }}>
                            <h4 style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--text-muted)' }}>Quick Actions</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => window.location.href = `mailto:${inquiry.email}`}>
                                    Reply via Email
                                </button>
                                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => window.print()}>
                                    Print Inquiry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
