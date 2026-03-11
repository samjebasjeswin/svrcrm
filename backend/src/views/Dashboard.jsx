"use client";
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { getCompanyPages, getPageEntries, currentCompanyId, companies, user } = useApp();
    const router = useRouter();
    const currentCompany = companies.find(c => c.id === currentCompanyId);
    const pages = getCompanyPages();

    const getCount = (name) => {
        const page = pages.find(p => p.name.toLowerCase() === name.toLowerCase());
        return page ? getPageEntries(page.id).length : 0;
    };

    const stats = [
        { label: 'Active Clients', value: getCount('clients') || '26', icon: '👥', color: '#f0f9ff', iconBg: '#e0f2fe', iconColor: '#0369a1' },
        { label: 'Total Quotes', value: getCount('quotes') || '48', icon: '📄', color: '#f8fafc', iconBg: '#f1f5f9', iconColor: '#475569' },
        { label: 'Invoices', value: getCount('invoices') || '27', icon: '💵', color: '#f8fafc', iconBg: '#f1f5f9', iconColor: '#475569' },
        { label: 'Revenue (MTD)', value: '₹0.0', icon: '📈', color: '#f8fafc', iconBg: '#22c55e', iconColor: 'white', isTrend: true },
    ];

    const actions = [
        { type: 'Invoice', id: 'INV/25-26/017', client: 'Beoccupied ORG', amount: '₹19,500', status: '39 days overdue', color: '#ef4444' },
        { type: 'Invoice', id: 'INV-DEMO-0001', client: 'Acme Industries', amount: '₹47,200', status: '38 days overdue', color: '#ef4444' },

        { type: 'Invoice', id: 'INV/25-26/026', client: 'Voda', amount: '₹5,900', status: '14 days overdue', color: '#f59e0b' },
        { type: 'Invoice', id: 'INV/25-26/027', client: 'Voda', amount: '₹7,375', status: '14 days overdue', color: '#f59e0b' },
        { type: 'Draft', id: 'QT-DEMO-0001', client: 'Acme Industries', amount: '₹5,90,000', status: 'Created 68 days ago', color: 'var(--primary)' },
    ];

    const quickActions = [
        { label: 'Client Hub', sub: 'Manage documents', icon: '📁', color: '#3b82f6' },

        { label: 'New Client', sub: 'Add a customer', icon: '👥', color: '#10b981' },
        { label: 'New Product', sub: 'Add to catalog', icon: '📦', color: '#8b5cf6' },
        { label: 'Approvals', sub: 'Review pending', icon: '⏳', color: '#f59e0b' },
        { label: 'Payments', sub: 'Payment records', icon: '💳', color: '#6366f1' },
        { label: 'Settings', sub: 'Company config', icon: '⚙️', color: '#64748b' },
    ];

    return (
        <div className="dashboard-content animate-fade-in" style={{ padding: '40px', background: '#f8fafc', minHeight: '100%' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    Good morning, {user?.username || 'Super'}
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>

                    Here's what's happening with {currentCompany?.name} today
                </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{
                        padding: '24px', background: 'white',
                        borderRadius: '16px', border: '1px solid #e2e8f0',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                                {stat.label}
                            </p>
                            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>

>>>>>>> fba02d5433fa6eb0ae88588defbb8e19b2efbefd
                                {stat.value}
                            </h2>
                        </div>
                        <div style={{
                            width: '42px', height: '42px', borderRadius: '10px',
                            background: stat.iconBg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                            color: stat.iconColor
                        }}>
                            {stat.icon}

                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '32px' }}>
                {/* Action Required */}
                <div className="card" style={{ padding: '24px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>Action Required</h3>
                        <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', color: '#64748b' }}>

                            {actions.length} items
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                        {actions.map((action, i) => (
                            <div key={i} style={{
                                padding: '16px 20px', borderRadius: '12px', border: '1px solid #f1f5f9',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                borderLeft: `4px solid ${action.color}`,
                                background: 'white', transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '8px',
                                        background: `${action.color}10`, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', color: action.color, fontSize: '16px'

                                    }}>
                                        {action.type === 'Invoice' ? '⚠️' : '📝'}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{action.type} {action.id}</h4>
                                        <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{action.client}</p>

                                        <p style={{ fontSize: '11px', fontWeight: '600', color: action.color, marginTop: '4px' }}>{action.status}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{action.amount}</div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card" style={{ padding: '24px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {quickActions.map((qa, i) => (
                            <button key={i} className="btn-quick-action" style={{
                                padding: '16px', borderRadius: '14px', border: '1px solid #f1f5f9',
                                background: 'white', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: `${qa.color}10`, display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: '18px', color: qa.color

                                }}>
                                    {qa.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>{qa.label}</div>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{qa.sub}</div>

                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .btn-quick-action:hover {
                    transform: translateY(-2px);
                    boxShadow: 0 4px 12px rgba(0,0,0,0.05);
                    border-color: #cbd5e1;
                    background: #f8fafc;

                }
            `}</style>
        </div>
    );
}
