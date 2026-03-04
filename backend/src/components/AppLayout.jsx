"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function AppLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { companies, currentCompanyId, getCompanyPages, getPageEntries, inquiries, user, logout } = useApp();

    const currentCompany = companies.find(c => c.id === currentCompanyId);
    const pages = getCompanyPages();
    const newInquiries = inquiries.filter(i => i.companyId === currentCompanyId && i.status === 'New').length;

    const isActive = (path) => pathname === path;
    const isTabActive = (tab) => searchParams.get('tab') === tab;

    const sidebarSections = [
        {
            label: 'HUB ADMIN',
            items: pages.map(page => {
                const count = getPageEntries(page.id).length;
                const lowerName = page.name.toLowerCase().trim();
                const isForm = lowerName === 'form';
                const isSettingsPage = page.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';

                let targetPath = `/data-entry/${page.id}`;
                if (isSettingsPage) {
                    const entries = getPageEntries(page.id);
                    if (entries.length > 0) {
                        targetPath = `/data-entry/${page.id}/${entries[0].id}`;
                    } else {
                        targetPath = `/data-entry/${page.id}/new`;
                    }
                }

                return {
                    icon: isForm ? '📋' : '📦',
                    label: page.name,
                    sublabel: `${count} ${count === 1 ? 'entry' : 'entries'}`,
                    badge: isForm && newInquiries > 0 ? newInquiries : null,
                    path: targetPath,
                };
            }),
            footer: user?.role === 'System Admin' ? {
                icon: '+',
                label: 'Add Page',
                path: '/pages',
            } : null
        },
        ...((user?.role === 'System Admin' || user?.role === 'Super Admin') ? [{
            label: 'SYSTEM ADMIN',
            hideLabel: true,
            items: [
                { icon: '🗺️', label: 'Mapping', path: '/pages?tab=mapping' },
                ...(user?.role === 'System Admin' ? [
                    { icon: '📄', label: 'Pages', path: '/pages' },
                    { icon: '🔗', label: 'Linking', path: '/pages?tab=linking' },
                    { icon: '📡', label: 'API Report', path: '/pages?tab=api' },
                    { icon: '🧪', label: 'API IDE', path: '/api-ide' },
                ] : []),
            ]
        }] : []),
    ];

    const handleNav = (path) => {
        router.push(path);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
            {/* Sidebar */}
            <div style={{
                width: '240px', minWidth: '240px', background: '#0f172a', display: 'flex',
                flexDirection: 'column', height: '100vh', overflow: 'hidden'
            }}>
                {/* Company Header */}
                <div style={{
                    padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
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
                            <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {currentCompany?.name || 'Select Company'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create button */}
                <div style={{ padding: '12px 14px 8px' }}>
                    <button
                        onClick={() => router.push('/pages')}
                        style={{
                            width: '100%', padding: '9px 14px', background: '#1e293b',
                            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
                            color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#334155'}
                        onMouseLeave={e => e.currentTarget.style.background = '#1e293b'}
                    >
                        <span style={{ fontSize: '16px', fontWeight: '300' }}>+</span> Create
                    </button>
                </div>

                {/* Nav Sections */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0', scrollbarWidth: 'none' }}>
                    {sidebarSections.map(section => (
                        <div key={section.label} style={{ marginBottom: '4px' }}>
                            {section.label && !section.hideLabel && (
                                <div style={{
                                    padding: '10px 18px 4px', fontSize: '10px', fontWeight: '700',
                                    color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', textTransform: 'uppercase'
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
                                            padding: '8px 18px', background: exactActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                                            borderRadius: 0, textAlign: 'left'
                                        }}
                                        onMouseEnter={e => { if (!exactActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                        onMouseLeave={e => { if (!exactActive) e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        <span style={{ fontSize: '15px', flexShrink: 0, opacity: 0.8 }}>{item.icon}</span>
                                        <span style={{
                                            fontSize: '13px', fontWeight: exactActive ? '600' : '400',
                                            color: exactActive ? 'white' : 'rgba(255,255,255,0.65)',
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
                            {section.footer && (
                                <button
                                    onClick={() => handleNav(section.footer.path)}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                        padding: '6px 18px', background: 'transparent', border: 'none',
                                        cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <span style={{ fontSize: '14px', opacity: 0.5, flexShrink: 0 }}>+</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{section.footer.label}</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer - User Info */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '700', fontSize: '12px', color: 'white', flexShrink: 0
                        }}>
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: 'white', textTransform: 'capitalize' }}>
                                {user?.username}
                            </div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {user?.role?.toUpperCase() || 'COMPANY_ADMIN'}
                            </div>
                        </div>
                        <button
                            title="Logout"
                            onClick={() => { logout(); router.push('/login'); }}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: 'rgba(255,255,255,0.4)', fontSize: '16px', padding: '4px',
                                borderRadius: '6px', flexShrink: 0, transition: 'color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                        >
                            ⏻
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                {children}
            </div>
        </div>
    );
}
