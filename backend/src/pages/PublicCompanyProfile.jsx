import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import InquiryForm from './InquiryForm';

export default function PublicCompanyProfile() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const { companies, pages, getPageEntries } = useApp();

    const company = companies.find(c => c.id === Number(companyId));
    const companyPages = pages[companyId] || [];

    if (!company) {
        return (
            <div className="error-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>404</h1>
                <h2>Company Not Found</h2>
                <p style={{ color: 'var(--text-muted)' }}>The company profile you are looking for does not exist or has been removed.</p>
                <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => navigate('/')}>Return to Portal</button>
            </div>
        );
    }

    return (
        <div className="public-profile-wrapper animate-fade-in">
            {/* Header / Hero Section */}
            <header className="public-hero">
                <div className="container">
                    <div className="company-badge-large">{company.initials}</div>
                    <h1>{company.name}</h1>
                    <p className="company-tagline">Official Business Profile & Product Catalogs</p>
                </div>
            </header>

            <main className="container public-content">
                <div className="profile-grid">
                    {/* Catalog Section */}
                    <section className="catalog-section">
                        <div className="section-header">
                            <h2>Our Product Catalogs</h2>
                            <p>Explore our latest offerings and technical specifications</p>
                        </div>

                        <div className="public-catalog-grid">
                            {companyPages.map(page => {
                                const entryCount = getPageEntries ? getPageEntries(page.id, companyId).length : 0;
                                return (
                                    <div key={page.id} className="catalog-card card">
                                        <div className="catalog-icon">📦</div>
                                        <div className="catalog-info">
                                            <h3>{page.name}</h3>
                                            <p>{entryCount} {entryCount === 1 ? 'Product' : 'Products'} Available</p>
                                        </div>
                                        <button className="btn btn-outline btn-sm" disabled>View Details</button>
                                    </div>
                                );
                            })}

                            {companyPages.length === 0 && (
                                <div className="empty-catalog">
                                    <p>No catalogs are currently public.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Contact Sidebar / Inquiry Form Section */}
                    <aside className="contact-sidebar">
                        <div className="sticky-sidebar">
                            <InquiryForm isEmbedded={true} targetCompanyId={companyId} />
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="public-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} {company.name}. Powered by Antigravity CRM.</p>
                </div>
            </footer>

            <style>{`
                .public-profile-wrapper {
                    min-height: 100vh;
                    background: #f8fafc;
                }
                .public-hero {
                    background: linear-gradient(135deg, var(--primary) 0%, #312e81 100%);
                    color: white;
                    padding: 80px 0;
                    text-align: center;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .company-badge-large {
                    width: 100px;
                    height: 100px;
                    background: rgba(255,255,255,0.2);
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255,255,255,0.4);
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 36px;
                    font-weight: 800;
                    margin: 0 auto 24px;
                }
                .public-hero h1 {
                    font-size: 48px;
                    font-weight: 800;
                    margin: 0 0 12px;
                    letter-spacing: -0.02em;
                }
                .company-tagline {
                    font-size: 18px;
                    opacity: 0.8;
                }
                .public-content {
                    padding: 64px 24px;
                }
                .profile-grid {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 48px;
                }
                @media (max-width: 900px) {
                    .profile-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .section-header {
                    margin-bottom: 32px;
                }
                .section-header h2 {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .public-catalog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }
                .catalog-card {
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;
                    transition: transform 0.2s;
                }
                .catalog-card:hover {
                    transform: translateY(-4px);
                }
                .catalog-icon {
                    font-size: 32px;
                    background: rgba(79, 70, 229, 0.1);
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                }
                .catalog-info h3 {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }
                .catalog-info p {
                    color: var(--text-muted);
                    font-size: 14px;
                }
                .sticky-sidebar {
                    position: sticky;
                    top: 40px;
                }
                .public-footer {
                    padding: 40px 0;
                    border-top: 1px solid var(--border);
                    text-align: center;
                    color: var(--text-muted);
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
}
