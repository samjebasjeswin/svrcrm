"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function EntriesList() {
    const { pageId } = useParams();
    const router = useRouter();
    const { getPage, getPageEntries, currentCompanyId, deleteEntry, inquiries, deleteInquiry, companies, getInboundLinks, getLinkedEntryDisplayValue } = useApp();
    const [expandedInquiryId, setExpandedInquiryId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewEntryData, setViewEntryData] = useState(null);

    const page = getPage(pageId);
    const entries = getPageEntries(pageId);

    // Auto-redirect for single-entry pages
    const lowerName = page?.name?.toLowerCase()?.trim() || '';
    const isSingleEntry = page?.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';

    useEffect(() => {
        if (isSingleEntry && page) {
            if (entries.length > 0) {
                router.replace(`/data-entry/${pageId}/${entries[0].id}`);
            } else {
                router.replace(`/data-entry/${pageId}/new`);
            }
        }
    }, [isSingleEntry, page, pageId]);

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
        if (!searchQuery.trim()) return entries;

        const query = searchQuery.toLowerCase().trim();
        return entries.filter(entry => {
            if (page?.searchEnabled && page?.searchFieldId) {
                // Search in specific field
                const fieldId = String(page.searchFieldId);
                // Look for the field in the flat data list
                const field = fields.find(f => String(f.id) === fieldId);
                if (field && entry?.data) {
                    const val = String(entry.data[field.compositeKey] || '').toLowerCase();
                    return val.includes(query);
                }
            }
            // Fallback: search in ALL table columns visible
            return tableColumns.some(col => {
                const val = String(entry?.data?.[col.compositeKey] || '').toLowerCase();
                return val.includes(query);
            });
        });
    }, [entries, searchQuery, page?.searchFieldId, tableColumns, fields]);

    const currentCompany = companies.find(c => c.id === currentCompanyId);

    // Pre-calculate inbound links for all entries to avoid redundant expensive calls during render
    const entryLinksMap = useMemo(() => {
        const map = {};
        filteredEntries.forEach(entry => {
            const links = getInboundLinks(pageId, entry.id);
            map[entry.id] = links;
        });
        return map;
    }, [filteredEntries, pageId, getInboundLinks]);

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
                        <button className="btn btn-ghost" onClick={() => router.push('/pages')} style={{ marginBottom: '10px', paddingLeft: 0 }}>
                            ← Back to Admin
                        </button>
                        <h1>{(page?.name || 'Page')} Catalog</h1>
                        <p>Manage and browse your {(page?.name || '').toLowerCase()} entries</p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push(`/data-entry/${pageId}/new`)}
                    >
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>+</span> Add New {page?.name || 'Entry'}
                    </button>
                </div>
            )}

            {!isFormPage && page.searchEnabled && (
                <div className="search-bar-container animate-fade-in-up" style={{ marginBottom: '24px' }}>
                    <div className="search-input-wrapper" style={{ position: 'relative', flex: 1 }}>
                        <span className="search-icon" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 48px',
                                borderRadius: '12px',
                                border: '1.5px solid var(--border)',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                background: 'white'
                            }}
                            placeholder={page.searchFieldId
                                ? `Search by ${fields.find(f => String(f.id) === String(page.searchFieldId))?.label || 'field'}...`
                                : "Search entries..."
                            }
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="search-clear-btn"
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <div className="search-results-count" style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', fontWeight: '500' }}>
                        {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
                    </div>
                </div>
            )}

            {isFormPage && (
                <button className="btn btn-ghost" onClick={() => router.push('/pages')} style={{ marginBottom: '20px', paddingLeft: 0 }}>
                    ← Back to Admin
                </button>
            )}


            {!isFormPage && (
                <div className="table-container animate-fade-in-up">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}>SL NO.</th>
                                {tableColumns.map(col => (
                                    <th key={col.id}>{col.label}</th>
                                ))}
                                <th style={{ textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.length > 0 ? filteredEntries.map((entry, idx) => (
                                <tr key={entry.id || idx}>
                                    <td style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{idx + 1}</td>
                                    {tableColumns.map(col => {
                                        const val = entry.data ? entry.data[col.compositeKey] : null;
                                        return <td key={col.id}>{val || '—'}</td>
                                    })}
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                            <button
                                                className="action-icon-btn"
                                                title="View Details"
                                                onClick={() => setViewEntryData(entry)}
                                            >
                                                👁️
                                            </button>
                                            <button
                                                className="action-icon-btn"
                                                title="View Linked Items"
                                                onClick={() => router.push(`/inbound-links/${pageId}/${entry.id}`)}
                                                style={{ position: 'relative' }}
                                            >
                                                🔗
                                                {(entryLinksMap[entry.id]?.length || 0) > 0 && (
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '-5px',
                                                        right: '-5px',
                                                        background: 'var(--accent)',
                                                        color: 'white',
                                                        fontSize: '10px',
                                                        padding: '2px 5px',
                                                        borderRadius: '10px',
                                                        fontWeight: '700',
                                                        minWidth: '16px',
                                                        textAlign: 'center'
                                                    }}>
                                                        {entryLinksMap[entry.id].length}
                                                    </span>
                                                )}
                                            </button>
                                            <button
                                                className="action-icon-btn"
                                                title="Edit"
                                                onClick={() => router.push(`/data-entry/${pageId}/${entry.id}`)}
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
                                    <td colSpan={tableColumns.length + 2} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
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
                                                            onClick={() => router.push(`/inquiry/${inquiry.id}`)}
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

            {/* View Entry Details Modal */}
            {viewEntryData && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, padding: '20px', backdropFilter: 'blur(8px)'
                }} onClick={() => setViewEntryData(null)}>
                    <div style={{
                        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '600px',
                        maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-primary)' }}>{page?.name || 'Entry'} Details</h2>
                            </div>
                            <button className="action-icon-btn" onClick={() => setViewEntryData(null)} style={{ fontSize: '20px' }}>✕</button>
                        </div>

                        <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
                            <div style={{ marginBottom: '32px' }}>
                                <h4 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                                    General Information
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '14px' }}>ID</div>
                                    <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '14px' }}>#{viewEntryData.id}</div>

                                    <div style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '14px' }}>Name</div>
                                    <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '15px' }}>{getLinkedEntryDisplayValue(pageId, viewEntryData.id)}</div>
                                </div>
                            </div>

                            {page?.headings?.map(heading => (
                                <div key={heading.id} style={{ marginBottom: '32px' }}>
                                    <h4 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                                        {heading.title || 'Data Fields'}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {heading.subHeadings?.map(sub => (
                                            <React.Fragment key={sub.id}>
                                                {sub.fields?.map(field => {
                                                    const key = `${heading.id}_${sub.id}_${field.id}`;
                                                    const val = viewEntryData.data?.[key];

                                                    if (field.valueType === 'Grid') {
                                                        return (
                                                            <div key={field.id} style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '12px' }}>
                                                                <div style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '13px', marginBottom: '8px' }}>{field.label}</div>
                                                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                                    {field.gridCols?.map((col, cIdx) => (
                                                                        <div key={cIdx} style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', fontSize: '13px' }}>
                                                                            <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>{col}:</span>
                                                                            <span style={{ fontWeight: '600' }}>{viewEntryData.data?.[`${key}_col${cIdx}`] || '—'}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div key={field.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                                                            <div style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '14px' }}>{field.label}</div>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '14px' }}>
                                                                {field.valueType === 'Link' ? (
                                                                    <span style={{ color: 'var(--accent)', fontWeight: '700' }}>
                                                                        {getLinkedEntryDisplayValue(field.linkedPageId, val) || '—'}
                                                                    </span>
                                                                ) : (val || '—')}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '24px 32px', background: '#f8fafc', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button className="btn btn-ghost" onClick={() => setViewEntryData(null)}>Close</button>
                            <button className="btn btn-primary" onClick={() => {
                                router.push(`/data-entry/${pageId}/${viewEntryData.id}`);
                                setViewEntryData(null);
                            }}>Edit Entry</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
