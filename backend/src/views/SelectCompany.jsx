"use client";
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function SelectCompany() {
    const { companies, selectCompany, user, pages } = useApp();
    const router = useRouter();

    const handleSelectCompany = (id) => {
        selectCompany(id);
        router.push('/dashboard');
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
