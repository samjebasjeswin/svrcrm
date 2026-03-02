import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EntriesList() {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const { getPage, getPageEntries, currentCompanyId, deleteEntry, inquiries, deleteInquiry, companies } = useApp();

    const page = getPage(pageId);
    const entries = getPageEntries(pageId);

    const fields = useMemo(() => {
        const allFields = [];
        (page?.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    allFields.push({
                        ...f,
                        compositeKey: `${h.id}_${sh.id}_${f.id}`
                    });
                });
            });
        });
        return allFields;
    }, [page]);

    // Use first field for table columns
    const tableColumns = fields.slice(0, 1);

    const filteredEntries = useMemo(() => {
        return entries;
    }, [entries]);

    const currentCompany = companies.find(c => c.id === currentCompanyId);

    const filteredInquiries = useMemo(() => {
        return inquiries.filter(i => i.companyId === currentCompanyId);
    }, [inquiries, currentCompanyId]);

    const isFormPage = page?.name?.toLowerCase() === 'form';

    if (!page) return <div className="dashboard-page">Page not found</div>;

    const handleDelete = (entryId) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            deleteEntry(pageId, entryId);
        }
    };

    return (
        <div className="dashboard-page animate-fade-in">
            {!isFormPage && (
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <button className="btn btn-ghost" onClick={() => navigate('/pages')} style={{ marginBottom: '10px', paddingLeft: 0 }}>
                            ← Back to Admin
                        </button>
                        <h1>{page.name} Catalog</h1>
                        <p>Manage and browse your {page.name.toLowerCase()} entries</p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/data-entry/${pageId}/new`)}
                    >
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>+</span> Add New {page.name}
                    </button>
                </div>
            )}

            {isFormPage && (
                <button className="btn btn-ghost" onClick={() => navigate('/pages')} style={{ marginBottom: '20px', paddingLeft: 0 }}>
                    ← Back to Admin
                </button>
            )}


            {!isFormPage && (
                <div className="table-container animate-fade-in-up">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                {tableColumns.map(col => (
                                    <th key={col.id}>{col.label}</th>
                                ))}
                                <th style={{ textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.length > 0 ? filteredEntries.map((entry, idx) => (
                                <tr key={entry.id || idx}>
                                    {tableColumns.map(col => {
                                        const val = entry.data[col.compositeKey];
                                        return <td key={col.id}>{val || '—'}</td>
                                    })}
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                            <button
                                                className="action-icon-btn"
                                                title="Edit"
                                                onClick={() => navigate(`/data-entry/${pageId}/${entry.id}`)}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="action-icon-btn delete"
                                                title="Delete"
                                                onClick={() => handleDelete(entry.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={tableColumns.length + 1} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                        No entries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Inquiries Section Added Below Table - Only shown for "form" page */}
            {isFormPage && (
                <div style={{ marginTop: '0' }}>
                    <div className="linking-header" style={{ borderLeftColor: 'var(--primary)', marginBottom: '32px' }}>
                        <h2>Inquiries & Messages</h2>
                        <p>Manage contact form submissions and product inquiries for {currentCompany?.name}</p>
                    </div>

                    {filteredInquiries && filteredInquiries.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {filteredInquiries.map(inquiry => (
                                <div key={inquiry.id} style={{ background: 'var(--bg-card)', border: '1.5:// var(--border)', borderRadius: '12px', padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{inquiry.subject || 'No Subject'}</h3>
                                                <span style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    textTransform: 'uppercase',
                                                    background: inquiry.type === 'product' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                                                    color: inquiry.type === 'product' ? '#ec4899' : 'var(--primary)'
                                                }}>
                                                    {inquiry.type === 'product' ? 'Product Inquiry' : 'Contact Us'}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                <strong>{inquiry.fullName}</strong> ({inquiry.email}) • {inquiry.submittedAt}
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-outline"
                                            style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '6px 12px' }}
                                            onClick={() => deleteInquiry(inquiry.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px', fontSize: '14px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                                        {inquiry.phone && <div><span style={{ color: 'var(--text-muted)' }}>Phone:</span> {inquiry.phone}</div>}
                                        {inquiry.company && <div><span style={{ color: 'var(--text-muted)' }}>Company:</span> {inquiry.company}</div>}
                                        {inquiry.productName && <div><span style={{ color: 'var(--text-muted)' }}>Product:</span> {inquiry.productName}</div>}
                                        {inquiry.quantity && <div><span style={{ color: 'var(--text-muted)' }}>Quantity:</span> {inquiry.quantity}</div>}
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>Message</h4>
                                        <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{inquiry.message}</p>
                                    </div>

                                    {inquiry.specifications && (
                                        <div>
                                            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>Technical Specifications</h4>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, background: '#f1f5f9', padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>{inquiry.specifications}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '24px', border: '2px dashed var(--border)' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
                            <h3>No Inquiries & Messages for {currentCompany?.name}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Messages submitted via your public forms will appear here.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
