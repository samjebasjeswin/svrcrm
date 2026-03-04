"use client";
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function SelectCompany() {
    const { companies, selectCompany, user, pages } = useApp();
    const router = useRouter();

    const handleSelectCompany = (id) => {
        selectCompany(id);
        if (user?.role === 'System Admin') {
            router.push('/pages');
        } else {
            // For Super Admin or others, land on first hub page if available
            const companyPages = pages[id] || [];
            if (companyPages.length > 0) {
                router.push(`/data-entry/${companyPages[0].id}`);
            } else {
                // If no pages, go to pages manager anyway to create one
                router.push('/pages');
            }
        }
    };

    return (
        <div className="page-center">
            <div className="select-company-wrapper animate-fade-in-up">
                <div className="select-company-header">
                    <h1>Select Company</h1>
                    <p>Choose a company to continue working with</p>
                </div>
                <div className="company-list">
                    <div
                        className="card card-hover card-dashed create-company-card stagger-1 animate-fade-in-up"
                        onClick={() => router.push('/create-company')}
                    >
                        <div className="plus-icon">+</div>
                        <span>Create New Company</span>
                    </div>

                    {companies.map((company, index) => (
                        <div
                            key={company.id}
                            className={`card card-hover company-card stagger-${index + 2} animate-fade-in-up`}
                            onClick={() => handleSelectCompany(company.id)}
                        >
                            <div className="avatar">{company.initials}</div>
                            <div className="company-info">
                                <h3>{company.name}</h3>
                                <span>{company.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
