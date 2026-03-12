"use client";
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function AppLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { companies, currentCompanyId, getCompanyPages, getPageEntries, inquiries, user, logout } = useApp();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const currentCompany = companies.find(c => c.id === currentCompanyId);
    const pages = getCompanyPages();
    const newInquiries = inquiries.filter(i => i.companyId === currentCompanyId && i.status === 'New').length;

    const isActive = (path) => pathname === path;
    const isTabActive = (tab) => searchParams.get('tab') === tab;

    const isProductHubRoute = pathname === '/pages' ||
        pathname.startsWith('/edit-page') ||
        pathname.startsWith('/entries') ||
        pathname.startsWith('/data-entry') ||
        pathname.startsWith('/edit-hierarchy') ||
        pathname.startsWith('/view-mapping') ||
        pathname.startsWith('/api-ide');

    const primarySections = [
        {
            label: 'OVERVIEW',
            items: [
                { icon: '📊', label: 'Dashboard', path: '/dashboard' },
                { icon: '👥', label: 'Clients', path: '/dashboard', badge: '26' },
                { icon: '👤', label: 'Contacts', path: '/dashboard' },
                { icon: '📄', label: 'Quotes', path: '/dashboard' },
                { icon: '💵', label: 'Invoices', path: '/dashboard', badge: '15' },
                { icon: '📦', label: 'Products', path: '/dashboard' },
                { icon: '🗺️', label: 'Product Hub', path: '/pages' },
                { icon: '📈', label: 'Reports', path: '/dashboard' },
            ]
        },
        {
            label: 'FINANCIAL',
            items: [
                { icon: '💳', label: 'Payments Log', path: '/dashboard' },
            ]
        },
        {
            label: 'ADMIN',
            items: []
        }
    ];

    const secondarySections = [
        {
            label: 'SUPER ADMIN',
            items: [
                ...pages.filter(page => page.superAdminEnabled !== false).map(page => {
                    const count = getPageEntries(page.id).length;
                    const lowerName = page.name.toLowerCase().trim();
                    const isForm = lowerName === 'form';
                    const isSettingsPage = page.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';

                    let targetPath = `/entries/${page.id}`;
                    if (isSettingsPage) {
                        const entries = getPageEntries(page.id);
                        if (entries.length > 0) {
                            targetPath = `/data-entry/${page.id}/${entries[0].id}`;
                        } else {
                            targetPath = `/data-entry/${page.id}/new`;
                        }
                    } else if (isForm) {
                        targetPath = `/entries/${page.id}`;
                    }

                    return {
                        icon: isForm ? '📋' : '📦',
                        label: page.name,
                        sublabel: `${count} ${count === 1 ? 'entry' : 'entries'}`,
                        badge: isForm && newInquiries > 0 ? newInquiries : null,
                        path: targetPath,
                    };
                }),
                { icon: '🗺️', label: 'Mapping', path: '/pages?tab=mapping' },
            ],
        },
        ...(user?.role === 'System Admin' ? [{
            label: 'SYSTEM ADMIN',
            hideLabel: false,
            items: [
                { icon: '+', label: 'Add Page', path: '/pages' },
                { icon: '📄', label: 'Pages', path: '/pages' },
                { icon: '🔗', label: 'Linking', path: '/pages?tab=linking' },
                { icon: '🗺️', label: 'Mapping', path: '/pages?tab=mapping' },
                { icon: '📡', label: 'API Report', path: '/pages?tab=api' },
                { icon: '🧪', label: 'API IDE', path: '/api-ide' },
            ]
        }] : []),
    ];

    const handleNav = (path) => {
        router.push(path);
    };

    const renderNavItems = (sections) => (
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0', scrollbarWidth: 'none' }}>
            {sections.map(section => (
                <div key={section.label} style={{ marginBottom: '4px' }}>
                    {section.label && !section.hideLabel && (
                        <div style={{
                            padding: '10px 18px 4px', fontSize: '10px', fontWeight: '700',
                            color: '#64748b', letterSpacing: '0.8px', textTransform: 'uppercase'
                        }}>
                            {section.label}
                        </div>
                    )}
                    {section.items.map(item => {
                        const currentFull = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
                        const exactActive = currentFull === item.path || (pathname === item.path && !item.path.includes('?'));

                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNav(item.path)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '8px 18px', background: exactActive ? '#f1f5f9' : 'transparent',
                                    border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                                    borderRadius: 0, textAlign: 'left'
                                }}
                                onMouseEnter={e => { if (!exactActive) e.currentTarget.style.background = '#f8fafc'; }}
                                onMouseLeave={e => { if (!exactActive) e.currentTarget.style.background = 'transparent'; }}
                            >
                                <span style={{ fontSize: '15px', flexShrink: 0, opacity: 0.8 }}>{item.icon}</span>
                                <span style={{
                                    fontSize: '13px', fontWeight: exactActive ? '600' : '400',
                                    color: exactActive ? '#1e293b' : '#64748b',
                                    flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    textTransform: 'capitalize'
                                }}>
                                    {item.label}
                                </span>

                                {item.badge && (
                                    <span style={{
                                        background: '#ef4444', color: 'white', borderRadius: '10px',
                                        padding: '1px 6px', fontSize: '10px', fontWeight: '700', flexShrink: 0
                                    }}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8fafc' }}>
            {/* Sidebar 1 (Primary) */}
            <div style={{
                width: isSidebarExpanded ? '240px' : '0px',
                minWidth: isSidebarExpanded ? '240px' : '0px',
                opacity: isSidebarExpanded ? 1 : 0,
                background: 'white', display: 'flex',
                flexDirection: 'column', height: '100vh', overflow: 'hidden',
                borderRight: isSidebarExpanded ? '1px solid #e2e8f0' : 'none',
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                zIndex: 20
            }}>
                {/* Company Header */}
                <div style={{
                    padding: '20px 18px 16px', borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer'
                }} onClick={() => router.push('/')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            background: 'var(--primary)', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontWeight: '800', fontSize: '14px', color: 'white', flexShrink: 0
                        }}>
                            {currentCompany?.initials || '?'}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {currentCompany?.name || 'Select Company'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create button */}
                {user?.role !== 'Super Admin' && (
                    <div style={{ padding: '12px 14px 8px' }}>
                        <button
                            onClick={() => router.push('/pages')}
                            style={{
                                width: '100%', padding: '9px 14px', background: 'white',
                                border: '1px solid #e2e8f0', borderRadius: '8px',
                                color: '#1e293b', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.borderColor = '#cbd5e1';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                            }}
                        >
                            <span style={{ fontSize: '16px', fontWeight: '300' }}>+</span> Create
                        </button>
                    </div>
                )}

                {renderNavItems(primarySections)}

                {/* Footer - User Info */}
                <div style={{ borderTop: '1px solid #f1f5f9', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '700', fontSize: '12px', color: 'white', flexShrink: 0
                        }}>
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', textTransform: 'capitalize' }}>
                                {user?.username}
                            </div>
                            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {user?.role?.toUpperCase() || 'COMPANY_ADMIN'}
                            </div>
                        </div>
                        <button
                            title="Logout"
                            onClick={() => { logout(); router.push('/login'); }}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: '#94a3b8', fontSize: '16px', padding: '4px',
                                borderRadius: '6px', flexShrink: 0, transition: 'color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                        >
                            ⏻
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar 2 (Secondary - Product Hub) */}
            {isProductHubRoute && (
                <div style={{
                    width: '240px', minWidth: '240px', background: '#f8fafc', display: 'flex',
                    flexDirection: 'column', height: '100vh', overflow: 'hidden',
                    borderRight: '1px solid #e2e8f0',
                    animation: 'slideRight 0.3s ease-out',
                    position: 'relative'
                }}>
                    <div style={{
                        padding: '24px 18px 12px', fontSize: '11px', fontWeight: '800',
                        color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase'
                    }}>
                        Product Hub
                    </div>
                    {renderNavItems(secondarySections)}
                </div>
            )}

            {/* Toggle Button - Outside to prevent clipping */}
            {isProductHubRoute && (
                <button
                    onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    style={{
                        position: 'fixed',
                        left: isSidebarExpanded ? '224px' : '-4px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        color: '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        zIndex: 10000,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease-in-out',
                        padding: 0
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#64748b';
                    }}
                >
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        transform: isSidebarExpanded ? 'translateX(-1px)' : 'translateX(1px)',
                        lineHeight: 1
                    }}>
                        {isSidebarExpanded ? '❮' : '❯'}
                    </span>
                </button>
            )}

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'white' }}>
                {children}
            </div>
        </div>
    );
}
