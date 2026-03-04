"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function InquiryForm({ isEmbedded = false, targetCompanyId = null }) {
    const router = useRouter();
    const { companyId: urlCompanyId } = useParams();
    const effectiveCompanyId = targetCompanyId || urlCompanyId;
    const { addInquiry, companies } = useApp();

    const targetCompany = companies.find(c => c.id === Number(effectiveCompanyId));
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        specifications: '',
        agreeToPolicy: false
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addInquiry(formData, effectiveCompanyId);
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="inquiry-form-container animate-fade-in">
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h2>Thank You!</h2>
                    <p>Your inquiry has been sent successfully. We typically respond within 24 hours.</p>
                    {!isEmbedded ? (
                        <button className="btn btn-primary" onClick={() => router.push('/')}>Back to Home</button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="inquiry-form-wrapper animate-fade-in">
            <div className="inquiry-form-container">
                <div className="inquiry-header">
                    <h1>{targetCompany ? `contactus form of ${targetCompany.name}` : 'Send Us a Message'}</h1>
                    <p>Fill out the form below and we'll get back to you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Full Name <span className="required">*</span></label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group flex-1">
                            <label>Email Address <span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@domain.com"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Phone Number (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group flex-1">
                            <label>Company Name (Optional)</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Your Company Ltd"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Subject (Optional)</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Product inquiry, quote request, technical support..."
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Message <span className="required">*</span></label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your requirements, specifications, or questions..."
                            required
                            className="form-textarea"
                            rows="5"
                        ></textarea>
                        <div className="char-count">{formData.message.length} characters</div>
                    </div>

                    <div className="form-group technical-specs">
                        <label>Technical Specifications (Optional)</label>
                        <p className="field-hint">Help us serve you better by providing technical details (size, material, temperature, etc.)</p>
                        <textarea
                            name="specifications"
                            value={formData.specifications}
                            onChange={handleChange}
                            placeholder="Size, pressure rating, material, temperature range, connection type, etc."
                            className="form-textarea"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="agreeToPolicy"
                            name="agreeToPolicy"
                            checked={formData.agreeToPolicy}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="agreeToPolicy">
                            I agree to the privacy policy and consent to the processing of my personal data. <span className="required">*</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary btn-large">Send Inquiry</button>
                        <p className="form-note">* Required fields. We typically respond within 24 hours.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
