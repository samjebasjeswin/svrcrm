import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EntriesList() {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const { getPage, getPageEntries, currentCompanyId, deleteEntry, inquiries, deleteInquiry, companies } = useApp();
    const [expandedInquiryId, setExpandedInquiryId] = useState(null);

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

            {/* Inquiries Section - Redesigned as Table */}
            {isFormPage && (
                <div style={{ marginTop: '0' }}>
                    <div className="linking-header" style={{ borderLeftColor: 'var(--primary)', marginBottom: '32px' }}>
                        <h2>Inquiries & Messages</h2>
                        <p>Manage contact form submissions and product inquiries for {currentCompany?.name}</p>
                    </div>

                    {filteredInquiries && filteredInquiries.length > 0 ? (
                        <div className="table-container animate-fade-in-up">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '60px' }}>SL NO</th>
                                        <th>SENDER</th>
                                        <th>SUBJECT / TYPE</th>
                                        <th>SUBMITTED AT</th>
                                        <th>STATUS</th>
                                        <th style={{ textAlign: 'right', width: '120px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInquiries.map((inquiry, idx) => {
                                        const status = inquiry.status || 'New';
                                        return (
                                            <tr key={inquiry.id}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                                                        {inquiry.type === 'product' ? (inquiry.product || '—') : (inquiry.name || inquiry.fullName || '—')}
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                                        {inquiry.email || inquiry.contact_email || '—'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '10px',
                                                            fontWeight: '700',
                                                            textTransform: 'uppercase',
                                                            background: inquiry.type === 'product' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                                                            color: inquiry.type === 'product' ? '#ec4899' : 'var(--primary)'
                                                        }}>
                                                            {inquiry.type === 'product' ? 'Product' : 'Contact'}
                                                        </span>
                                                        <span style={{ fontWeight: '600', fontSize: '13px' }}>
                                                            {inquiry.type === 'product'
                                                                ? `Qty: ${inquiry.quantity || '—'}`
                                                                : (inquiry.message || 'No Message')}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{inquiry.submittedAt}</td>
                                                <td>
                                                    <select
                                                        style={{
                                                            padding: '4px 8px',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            fontWeight: '700',
                                                            border: '1px solid var(--border)',
                                                            background: status === 'New' ? 'rgba(239, 68, 68, 0.05)' : status === 'Seen' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                                                            color: status === 'New' ? '#ef4444' : status === 'Seen' ? '#f59e0b' : '#10b981'
                                                        }}
                                                        value={status}
                                                        onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                                                    >
                                                        <option value="New">New</option>
                                                        <option value="Seen">Seen</option>
                                                        <option value="Closed">Closed</option>
                                                    </select>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div className="table-actions" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                                                        <button
                                                            className="action-icon-btn"
                                                            title="View Details"
                                                            onClick={() => navigate(`/inquiry/${inquiry.id}`)}
                                                            style={{ fontSize: '14px' }}
                                                        >
                                                            👁️ View
                                                        </button>
                                                        <button
                                                            className="action-icon-btn delete"
                                                            title="Delete"
                                                            onClick={() => { if (confirm('Delete inquiry?')) deleteInquiry(inquiry.id); }}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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
