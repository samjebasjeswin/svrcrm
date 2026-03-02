import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const INITIAL_FORM = {
    companyName: '',
    legalName: '',
    country: 'India',
    defaultCurrency: 'INR - Indian Rupee',
    defaultCurrency2: 'INR - Indian Rupee',
    gstin: '',
    pan: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    website: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
};

export default function CreateCompany() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [step, setStep] = useState(1);
    const [includeDefaultPages, setIncludeDefaultPages] = useState(true);
    const { addCompany } = useApp();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (!form.companyName.trim()) {
                alert('Company Name is required');
                return;
            }
            setStep(2);
        } else {
            addCompany(form, includeDefaultPages);
            navigate('/pages');
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div className="create-company-page animate-fade-in-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h1>{step === 1 ? 'Create New Company' : 'Module Configuration'}</h1>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                    Step {step} of 2
                </div>
            </div>
            <p className="subtitle">
                {step === 1
                    ? 'Enter the basic information and contact details'
                    : 'Select which default modules you would like to enable'}
            </p>

            <hr className="section-divider" style={{ marginTop: 0 }} />

            <form onSubmit={handleNext}>
                {step === 2 && (
                    <div className="form-section animate-fade-in-up">
                        <h2>Default Modules</h2>
                        <p className="section-desc">These modules will be automatically created and linked to your company profile.</p>
                        <div className="form-group" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            background: 'rgba(79, 70, 229, 0.05)',
                            padding: '24px',
                            borderRadius: '16px',
                            border: '1.5px solid var(--primary)',
                            marginTop: '20px',
                            cursor: 'pointer'
                        }}
                            onClick={() => setIncludeDefaultPages(!includeDefaultPages)}
                        >
                            <input
                                type="checkbox"
                                id="defaultPages"
                                checked={includeDefaultPages}
                                onChange={(e) => setIncludeDefaultPages(e.target.checked)}
                                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                            />
                            <div>
                                <label htmlFor="defaultPages" style={{ cursor: 'pointer', fontWeight: '700', color: 'var(--primary)', fontSize: '18px', display: 'block', marginBottom: '4px' }}>
                                    Enable Default Forms & SEO
                                </label>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                    Adds "Contact Us", "Product Inquiry", and "Static SEO" modules
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <>
                        {/* Basic Information */}
                        <div className="form-section animate-fade-in-up stagger-1">
                            <h2>Basic Information</h2>
                            <p className="section-desc">Company identification details</p>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        Company Name <span className="required">*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={handleChange}
                                        placeholder="Company Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        Legal Name <span className="required">*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        name="legalName"
                                        value={form.legalName}
                                        onChange={handleChange}
                                        placeholder="Legal Name"
                                    />
                                </div>
                            </div>
                            <div className="form-grid-3" style={{ marginTop: 18 }}>
                                <div className="form-group">
                                    <label className="form-label">
                                        Country <span className="required">*</span>
                                    </label>
                                    <select className="form-select" name="country" value={form.country} onChange={handleChange}>
                                        <option>India</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        Default Currency <span className="required">*</span>
                                    </label>
                                    <select className="form-select" name="defaultCurrency" value={form.defaultCurrency} onChange={handleChange}>
                                        <option>INR - Indian Rupee</option>
                                        <option>USD - US Dollar</option>
                                        <option>GBP - British Pound</option>
                                        <option>EUR - Euro</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        Default Currency <span className="required">*</span>
                                    </label>
                                    <select className="form-select" name="defaultCurrency2" value={form.defaultCurrency2} onChange={handleChange}>
                                        <option>INR - Indian Rupee</option>
                                        <option>USD - US Dollar</option>
                                        <option>GBP - British Pound</option>
                                        <option>EUR - Euro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr className="section-divider" />

                        {/* Tax Information */}
                        <div className="form-section animate-fade-in-up stagger-2">
                            <h2>Tax Information</h2>
                            <p className="section-desc">GSTIN/registration numbers</p>
                            <div className="form-grid">
                                <div className="form-group">
                                    <input
                                        className="form-input"
                                        name="gstin"
                                        value={form.gstin}
                                        onChange={handleChange}
                                        placeholder="GSTIN"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">PAN</label>
                                    <input
                                        className="form-input"
                                        name="pan"
                                        value={form.pan}
                                        onChange={handleChange}
                                        placeholder="PAN"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="section-divider" />

                        {/* Contact & Address */}
                        <div className="form-section animate-fade-in-up stagger-3">
                            <h2>Contact & Address</h2>
                            <p className="section-desc">Company contact information</p>
                            <div className="form-grid-3">
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-input"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="phone-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Phone</label>
                                    <div className="phone-group" style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                                        <span className="phone-code" style={{ padding: '0 12px', background: '#f8fafc', borderRight: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', fontSize: '14px' }}>+91</span>
                                        <input
                                            className="form-input"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="9987543210"
                                            style={{ flex: 1, border: 'none' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Website</label>
                                    <input
                                        className="form-input"
                                        name="website"
                                        value={form.website}
                                        onChange={handleChange}
                                        placeholder="https:///"
                                    />
                                </div>
                            </div>
                            <div className="form-grid" style={{ marginTop: 18 }}>
                                <div className="form-group">
                                    <label className="form-label">
                                        Address Line 1 <span className="required">*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        name="addressLine1"
                                        value={form.addressLine1}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Address Line 2</label>
                                    <input
                                        className="form-input"
                                        name="addressLine2"
                                        value={form.addressLine2}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-grid-3" style={{ marginTop: 18 }}>
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <select className="form-select" name="city" value={form.city} onChange={handleChange}>
                                        <option value="">Select City</option>
                                        <option>Mumbai</option>
                                        <option>Delhi</option>
                                        <option>Bangalore</option>
                                        <option>Chennai</option>
                                        <option>Hyderabad</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">State</label>
                                    <select className="form-select" name="state" value={form.state} onChange={handleChange}>
                                        <option value="">State</option>
                                        <option>Maharashtra</option>
                                        <option>Karnataka</option>
                                        <option>Tamil Nadu</option>
                                        <option>Telangana</option>
                                        <option>Delhi</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Postal Code</label>
                                    <input
                                        className="form-input"
                                        name="postalCode"
                                        value={form.postalCode}
                                        onChange={handleChange}
                                        placeholder="560001"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="form-footer" style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
                    {step === 1 ? (
                        <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
                            Cancel
                        </button>
                    ) : (
                        <button type="button" className="btn btn-outline" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        {step === 1 ? 'Next' : 'Create Company'}
                    </button>
                </div>
            </form>
        </div>
    );
}
