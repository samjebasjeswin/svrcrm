"use client";
import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function ProductForm({ isEmbedded = false, targetCompanyId = null }) {
    const { companyId: routeCompanyId } = useParams();
    const router = useRouter();
    const { companies, addInquiry } = useApp();

    const companyId = targetCompanyId || routeCompanyId;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        productName: '',
        quantity: '',
        message: '',
        specifications: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const targetCompany = useMemo(() => {
        return companies.find(c => String(c.id) === String(companyId));
    }, [companies, companyId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('Please agree to the terms.');
            return;
        }

        addInquiry({
            ...formData,
            subject: `Product Inquiry: ${formData.productName || 'General'}`
        }, companyId, 'product');

        setSubmitted(true);
        if (!isEmbedded) {
            setTimeout(() => router.push(`/c/${companyId}`), 3000);
        }
    };

    if (submitted) {
        return (
            <div className="inquiry-success animate-fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
                <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>Inquiry Sent!</h2>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px' }}>
                    Thank you for your interest in our products. {targetCompany?.name} will contact you shortly.
                </p>
                {!isEmbedded && (
                    <button className="btn btn-primary" onClick={() => router.push(`/c/${companyId}`)}>
                        Back to Profile
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="inquiry-form-wrapper animate-fade-in" style={{ padding: isEmbedded ? '0' : '40px 20px', background: isEmbedded ? 'transparent' : 'var(--bg-app)', minHeight: isEmbedded ? 'auto' : '100vh' }}>
            <div className="inquiry-form-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
                <div className="inquiry-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px' }}>
                        {targetCompany ? `Product Inquiry for ${targetCompany.name}` : 'Product Inquiry Form'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Tell us about the products you are interested in</p>
                </div>

                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@company.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Organization"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Which product are you interested in?"
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity Needed</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Approx. quantity"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '24px' }}>
                        <label>Additional Message</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Tell us more about your requirements..."
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="form-group" style={{ marginBottom: '32px' }}>
                        <label>Technical Specifications (Optional)</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Material grade, dimensions, standards, etc."
                            value={formData.specifications}
                            onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <input
                            type="checkbox"
                            id="agree"
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label htmlFor="agree" style={{ cursor: 'pointer', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            I agree to the privacy policy and terms of service.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: '700' }}>
                        Send Product Inquiry
                    </button>
                </form>
            </div>
        </div>
    );
}
