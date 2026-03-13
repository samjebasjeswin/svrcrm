"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function EntriesList() {
    const { pageId } = useParams();
    const router = useRouter();
    const { getPage, getPageEntries, currentCompanyId, deleteEntry, inquiries, deleteInquiry, updateInquiryStatus, companies, getInboundLinks, getLinkedEntryDisplayValue, user, updatePage } = useApp();
    const [expandedInquiryId, setExpandedInquiryId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewEntryData, setViewEntryData] = useState(null);

    const [statusFilter, setStatusFilter] = useState('All');
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [configField, setConfigField] = useState(null); // 'title' or 'price'

    const page = getPage(pageId);
    const isLinkedOfferPage = page?.isLinkedOfferPage;
    const entries = getPageEntries(isLinkedOfferPage ? page.basePageId : pageId);
    const basePage = isLinkedOfferPage ? getPage(page.basePageId) : null;

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

    // Use first few fields for table columns
    let tableColumns = [];
    if (page?.name?.toLowerCase().trim() === 'offer' || isLinkedOfferPage) {
        tableColumns = [
            { id: 'offer_item', label: 'Offer Title', compositeKey: 'offer_item_key' },
            { id: 'status', label: 'Status', compositeKey: 'status_key' },
            { id: 'percentage', label: 'Percentage', compositeKey: 'percentage_key' },
            { id: 'base_price', label: 'Base Price Field', compositeKey: 'base_price_key' },
            { id: 'offer_price', label: 'Offer Price', compositeKey: 'offer_price_key' }
        ];

        // Map abstract columns to actual field keys
        const targetFields = isLinkedOfferPage 
            ? basePage?.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields || [])) || []
            : fields;

        // For linked page, find where the Offer data is stored 
        const offerField = targetFields.find(f => f.valueType === 'Offer');
        
        // Find Title field: configured first, then fallback
        let titleField = page.offerTitleFieldId ? targetFields.find(f => f.id === Number(page.offerTitleFieldId)) : null;
        if (!titleField) titleField = targetFields.find(f => f.label.toLowerCase() === 'name' || f.id === page.searchFieldId);
        
        // Find Price field: configured first, then fallback
        let priceField = page.basePriceFieldId ? targetFields.find(f => f.id === Number(page.basePriceFieldId)) : null;
        if (!priceField) priceField = targetFields.find(f => f.label.toLowerCase().includes('price') && f.valueType !== 'Offer');

        if (isLinkedOfferPage && offerField) {
            const getCompKey = (fld) => {
                if (!fld) return null;
                const h = basePage.headings.find(h => h.subHeadings.some(sh => sh.fields.some(f => f.id === fld.id)));
                if (!h) return null;
                const sh = h.subHeadings.find(sh => sh.fields.some(f => f.id === fld.id));
                return `${h.id}_${sh.id}_${fld.id}`;
            };

            const offerKey = getCompKey(offerField);
            tableColumns[0].compositeKey = offerKey;
            tableColumns[1].compositeKey = offerKey;
            tableColumns[2].compositeKey = offerKey;
            tableColumns[4].compositeKey = offerKey; // Offer price calculation uses percentage from offerKey
            
            if (titleField) {
                tableColumns[0].id = 'offer_item';
                tableColumns[0].compositeKey = getCompKey(titleField);
                tableColumns[0].titleFieldId = titleField.id;
            }

            if (priceField) {
                tableColumns[3].compositeKey = getCompKey(priceField);
                tableColumns[4].basePriceKey = tableColumns[3].compositeKey;
            }
        } else {
            fields.forEach(f => {
                if (f.label === 'Offer Title') tableColumns[0].compositeKey = f.compositeKey;
                if (f.label === 'Status') tableColumns[1].compositeKey = f.compositeKey;
                if (f.label === 'Percentage') tableColumns[2].compositeKey = f.compositeKey;
                if (f.label === 'Base Price Field') tableColumns[3].compositeKey = f.compositeKey;
            });
        }
    } else {
        const baseCols = fields.filter(f => f.valueType !== 'Grid' && f.valueType !== 'Rich Editor' && f.valueType !== 'Image').slice(0, 5);
        const offerFld = baseCols.find(f => f.valueType === 'Offer');
        if (offerFld) {
            const idx = baseCols.indexOf(offerFld);
            baseCols.splice(idx + 1, 0, { 
                id: 'virtual_offer_price', 
                label: 'Offer Price', 
                isVirtualOfferPrice: true,
                offerFieldKey: offerFld.compositeKey,
                targetFieldId: offerFld.offerTargetFieldId
            });
        }
        tableColumns = baseCols;
    }

    const filteredEntries = useMemo(() => {
        let results = entries;

        // Apply Status Filter for Offer-type pages
        if ((page?.name?.toLowerCase().trim() === 'offer' || isLinkedOfferPage) && statusFilter !== 'All') {
            results = results.filter(entry => {
                const offerField = isLinkedOfferPage 
                    ? basePage?.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields))?.find(f => f.valueType === 'Offer')
                    : fields.find(f => f.label === 'Status'); // This is for the generic 'Offer' page

                if (!offerField) return true;
                const compositeKey = isLinkedOfferPage 
                    ? `${basePage.headings.find(h => h.subHeadings.some(sh => sh.fields.some(f => f.id === offerField.id))).id}_${basePage.headings.flatMap(h => h.subHeadings).find(sh => sh.fields.some(f => f.id === offerField.id)).id}_${offerField.id}`
                    : fields.find(f => f.label === 'Status')?.compositeKey;

                const val = entry.data?.[compositeKey];
                try {
                    const parsed = typeof val === 'string' && val.startsWith('{') ? JSON.parse(val) : { status: val };
                    return parsed.status === statusFilter;
                } catch(e) {
                    return val === statusFilter;
                }
            });
        }

        if (!searchQuery.trim()) return results;

        const query = searchQuery.toLowerCase().trim();
        return results.filter(entry => {
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
    }, [entries, searchQuery, page, fields, tableColumns, statusFilter, isLinkedOfferPage, basePage]);

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

    // For form page, also grab entries from savedEntries (submitted via API) and normalize them
    const formPageEntries = useMemo(() => {
        if (!isFormPage) return [];
        return entries.map(entry => {
            // Try to extract values using field composite keys first, then fall back to plain keys
            let name = null, email = null, message = null;
            for (const h of (page?.headings || [])) {
                for (const sh of (h.subHeadings || [])) {
                    for (const f of (sh.fields || [])) {
                        const compositeKey = `${h.id}_${sh.id}_${f.id}`;
                        const val = entry.data?.[compositeKey];
                        const label = f.label?.toLowerCase() || '';
                        if (!name && (label.includes('full name') || label.includes('name'))) name = val;
                        if (!email && (label.includes('email'))) email = val;
                        if (!message && (label.includes('message'))) message = val;
                    }
                }
            }
            // Also check for plain keys (from direct API submissions)
            if (!name) name = entry.data?.['Full Name'] || entry.data?.['full_name'] || entry.data?.name;
            if (!email) email = entry.data?.['Email Address'] || entry.data?.['email_address'] || entry.data?.email;
            if (!message) message = entry.data?.['Message'] || entry.data?.['message'];

            return { id: entry.id, name, email, message, submittedAt: entry.savedAt, status: 'New', type: 'contact', _isEntry: true };
        });
    }, [isFormPage, entries, page]);

    if (!page) return <div className="dashboard-page">Page not found</div>;

    const handleDelete = (entryId) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            const deleteFromId = isLinkedOfferPage ? (page.basePageId || pageId) : pageId;
            deleteEntry(deleteFromId, entryId);
        }
    };

    return (
        <div className="dashboard-page animate-fade-in">
            {!isFormPage && (
                <div className="dashboard-header" style={{ alignItems: 'flex-start' }}>
                    <div className="dashboard-title">
                        <button className="btn btn-ghost" onClick={() => router.push('/pages')} style={{ marginBottom: '10px', paddingLeft: 0 }}>
                            ← Back to Admin
                        </button>
                        <h1>{(page?.name || 'Page')} Catalog</h1>
                        <p>Manage and browse your {(page?.name || '').toLowerCase()} entries</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {(page?.name?.toLowerCase().trim() === 'offer' || isLinkedOfferPage) && (
                            <div className="filter-group">
                                <select 
                                    className="data-entry-input" 
                                    style={{ height: '42px', minWidth: '150px' }}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Active">Active Only</option>
                                    <option value="Disabled">Disabled Only</option>
                                </select>
                            </div>
                        )}
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push(`/data-entry/${isLinkedOfferPage ? page.basePageId : pageId}/new`)}
                        >
                            <span style={{ fontSize: '18px', marginRight: '8px' }}>+</span> Add New {page?.name || 'Entry'}
                        </button>
                    </div>
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
                                    <th key={col.id}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {col.valueType === 'Offer' ? 'OFFER STATUS' : col.label.toUpperCase()}
                                            {user?.role === 'System Admin' && isLinkedOfferPage && (col.id === 'offer_item' || col.id === 'base_price') && (
                                                <button 
                                                    onClick={() => { setConfigField(col.id === 'offer_item' ? 'title' : 'price'); setShowConfigModal(true); }}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', opacity: 0.6, padding: '2px' }}
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                        </div>
                                    </th>
                                ))}
                                <th style={{ textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.length > 0 ? filteredEntries.map((entry, idx) => (
                                <tr key={entry.id || idx}>
                                    <td style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{idx + 1}</td>
                                    {(() => {
                                        // For offer pages, we need to extract the offer data once per row
                                        const isOfferPage = page?.name?.toLowerCase().trim() === 'offer' || isLinkedOfferPage;
                                        let offerData = { title: '', status: '', percentage: '', mode: 'Percentage' };
                                        
                                        if (isOfferPage) {
                                            const statusCol = tableColumns.find(c => c.id === 'status');
                                            const offerRaw = statusCol ? entry.data[statusCol.compositeKey] : null;
                                            try {
                                                if (offerRaw && typeof offerRaw === 'string' && offerRaw.startsWith('{')) {
                                                    offerData = { ...offerData, ...JSON.parse(offerRaw) };
                                                } else if (offerRaw) {
                                                    offerData.percentage = offerRaw;
                                                }
                                            } catch(e) {}
                                        }

                                        return tableColumns.map(col => {
                                            let rawVal = entry.data ? entry.data[col.compositeKey] : null;
                                            let val = rawVal;
                                            
                                            let cellStyle = {};
                                            if (isOfferPage) {
                                                if (col.id === 'offer_item') {
                                                    // Explicitly use configured field if available, regardless of content (to show it's working)
                                                    if (page.offerTitleFieldId) {
                                                        const mappingKey = col.compositeKey;
                                                        val = entry.data[mappingKey] || '— (Empty Field)';
                                                    } else {
                                                        val = offerData.title || (isLinkedOfferPage ? getLinkedEntryDisplayValue(page.basePageId, entry.id) : '—');
                                                    }
                                                }
                                                if (col.id === 'status') {
                                                    const statusStr = offerData.status || 'Active';
                                                    val = statusStr;
                                                    cellStyle = { color: statusStr === 'Active' ? '#10b981' : '#ef4444', fontWeight: '700' };
                                                }
                                                if (col.id === 'percentage') val = offerData.percentage || '—';
                                                if (col.id === 'base_price') val = rawVal || '—';
                                                
                                                if (col.id === 'offer_price') {
                                                    const pctStr = offerData.percentage || '';
                                                    const bpCol = tableColumns.find(c => c.id === 'base_price');
                                                    const basePriceRaw = bpCol ? entry.data[bpCol.compositeKey] : null;
                                                    const amt = basePriceRaw ? parseFloat(basePriceRaw.toString().replace(/[^0-9.-]+/g, "")) : 0;
                                                    
                                                    if (!isNaN(amt) && pctStr) {
                                                        const pStr = pctStr.toString();
                                                        if (pStr.includes('%')) {
                                                            const pct = parseFloat(pStr.replace('%', ''));
                                                            val = !isNaN(pct) ? (amt - (amt * (pct / 100))).toFixed(2) : '—';
                                                        } else {
                                                            const flat = parseFloat(pStr);
                                                            val = !isNaN(flat) ? (amt - flat).toFixed(2) : '—';
                                                        }
                                                    } else {
                                                        val = '—';
                                                    }
                                                }
                                            } else if (col.valueType === 'Link') {
                                                val = getLinkedEntryDisplayValue(col.linkedPageId, val) || val;
                                            } else if (col.valueType === 'Offer') {
                                                try {
                                                    const parsed = (typeof rawVal === 'string' && rawVal.startsWith('{')) ? JSON.parse(rawVal) : { status: rawVal };
                                                    const status = (parsed.status || parsed);
                                                    val = status === 'Active' ? 'active' : 'inactive';
                                                    cellStyle = { color: status === 'Active' ? '#10b981' : '#ef4444', fontWeight: '700' };
                                                } catch(e) {
                                                    const status = (rawVal === 'Active') ? 'active' : 'inactive';
                                                    val = status;
                                                    cellStyle = { color: rawVal === 'Active' ? '#10b981' : '#ef4444', fontWeight: '700' };
                                                }
                                            } else if (col.isVirtualOfferPrice) {
                                                const offerRaw = entry.data[col.offerFieldKey];
                                                try {
                                                    const offerData = (typeof offerRaw === 'string' && offerRaw.startsWith('{')) ? JSON.parse(offerRaw) : { status: offerRaw };
                                                    if (offerData.status === 'Active') {
                                                        const targetField = fields.find(f => String(f.id) === String(col.targetFieldId));
                                                        const targetVal = targetField ? entry.data[targetField.compositeKey] : null;
                                                        const amt = targetVal ? parseFloat(targetVal.toString().replace(/[^0-9.-]+/g, "")) : 0;
                                                        const pctStr = offerData.percentage || '';

                                                        if (!isNaN(amt) && pctStr) {
                                                            const pStr = pctStr.toString();
                                                            if (pStr.includes('%')) {
                                                                const pct = parseFloat(pStr.replace('%', ''));
                                                                val = !isNaN(pct) ? (amt - (amt * (pct / 100))).toFixed(2) : '—';
                                                            } else {
                                                                const flat = parseFloat(pStr);
                                                                val = !isNaN(flat) ? flat.toFixed(2) : '—';
                                                            }
                                                        } else {
                                                            val = '—';
                                                        }
                                                    } else {
                                                        val = '—';
                                                    }
                                                } catch(e) {
                                                    val = '—';
                                                }
                                            }

                                            return <td key={col.id} style={cellStyle}>{val || '—'}</td>
                                        });
                                    })()}
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
                                                onClick={() => router.push(`/inbound-links/${isLinkedOfferPage ? page.basePageId : pageId}/${entry.id}`)}
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
                                                onClick={() => router.push(`/data-entry/${isLinkedOfferPage ? page.basePageId : pageId}/${entry.id}`)}
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
            {isFormPage && (() => {
                const allFormData = [
                    ...filteredInquiries,
                    ...formPageEntries.filter(fe => !filteredInquiries.some(fi => fi.id === fe.id))
                ];

                return (
                    <div style={{ marginTop: '0' }}>
                        <div className="linking-header" style={{ borderLeftColor: 'var(--primary)', marginBottom: '32px' }}>
                            <h2>Inquiries &amp; Messages</h2>
                            <p>Manage contact form submissions and product inquiries for {currentCompany?.name}</p>
                        </div>

                        {allFormData && allFormData.length > 0 ? (
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
                                        {allFormData.map((inquiry, idx) => {
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
                                                            onChange={(e) => {
                                                                if (!inquiry._isEntry) updateInquiryStatus(inquiry.id, e.target.value);
                                                            }}
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
                                                                onClick={() => inquiry._isEntry
                                                                    ? setViewEntryData(entries.find(e => e.id === inquiry.id))
                                                                    : router.push(`/inquiry/${inquiry.id}`)
                                                                }
                                                                style={{ fontSize: '14px' }}
                                                            >
                                                                👁️ View
                                                            </button>
                                                            <button
                                                                className="action-icon-btn delete"
                                                                title="Delete"
                                                                onClick={() => {
                                                                    if (confirm('Delete inquiry?')) {
                                                                        if (inquiry._isEntry) deleteEntry(pageId, inquiry.id);
                                                                        else deleteInquiry(inquiry.id);
                                                                    }
                                                                }}
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
                );
            })()}

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
                                <h2 style={{ margin: 0, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-primary)' }}>{(isLinkedOfferPage ? basePage?.name : page?.name) || 'Entry'} Details</h2>
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
                                    <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '15px' }}>{getLinkedEntryDisplayValue(isLinkedOfferPage ? (page.basePageId || pageId) : pageId, viewEntryData.id)}</div>
                                </div>
                            </div>

                            {(isLinkedOfferPage ? basePage?.headings : page?.headings)?.map(heading => (
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
                                                                ) : field.valueType === 'Offer' ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <span style={{ fontWeight: '700' }}>{val || '—'}</span>
                                                                        {field.offerTargetFieldId && val && (
                                                                            <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '700', padding: '2px 8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px' }}>
                                                                                {(() => {
                                                                                    let targetVal = null;
                                                                                    let targetLabel = '';
                                                                                    page?.headings?.forEach(h => h.subHeadings?.forEach(sh => sh.fields?.forEach(f => {
                                                                                        if (String(f.id) === String(field.offerTargetFieldId)) {
                                                                                            targetVal = viewEntryData.data?.[`${h.id}_${sh.id}_${f.id}`];
                                                                                            targetLabel = f.label || 'Target Field';
                                                                                        }
                                                                                    })));
                                                                                    if (targetVal) {
                                                                                        const strVal = val.toString().trim();
                                                                                        if (strVal.includes('%')) {
                                                                                            const pct = parseFloat(strVal.replace('%', ''));
                                                                                            const amt = parseFloat(targetVal.toString().replace(/[^0-9.-]+/g,""));
                                                                                            if (!isNaN(pct) && !isNaN(amt)) {
                                                                                                return `${targetLabel} - ${pct}% : ${Number((amt - (amt * (pct / 100))).toFixed(2))}`;
                                                                                            }
                                                                                        } else {
                                                                                            const flat = parseFloat(strVal);
                                                                                            const amt = parseFloat(targetVal.toString().replace(/[^0-9.-]+/g,""));
                                                                                            if (!isNaN(flat) && !isNaN(amt)) {
                                                                                                return `Fixed Offer Price: ${flat}`;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    return val.toString().includes('%') ? 'Invalid Target Value' : `Fixed Offer Price: ${val}`;
                                                                                })()}
                                                                            </span>
                                                                        )}
                                                                    </div>
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
                                router.push(`/data-entry/${isLinkedOfferPage ? (page.basePageId || pageId) : pageId}/${viewEntryData.id}`);
                                setViewEntryData(null);
                            }}>Edit Entry</button>
                        </div>
                    </div>
                </div>
            )}
            {showConfigModal && (
                <div className="modal-overlay" onClick={() => setShowConfigModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0 }}>Configure {configField === 'title' ? 'Offer Title' : 'Base Price'}</h2>
                            <button className="close-btn" onClick={() => setShowConfigModal(false)}>✕</button>
                        </div>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Select the field from <b>{basePage?.name}</b> that contains the {configField === 'title' ? 'item name/title' : 'base price'}.
                        </p>
                        <div className="form-group">
                            <label className="form-label">Available Fields</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', padding: '4px' }}>
                                {basePage?.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields || [])).map(f => (
                                    <button
                                        key={f.id}
                                        className="btn btn-ghost"
                                        style={{ 
                                            justifyContent: 'flex-start', 
                                            textAlign: 'left',
                                            padding: '12px',
                                            border: (configField === 'title' ? page.offerTitleFieldId : page.basePriceFieldId) === f.id ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                                            background: (configField === 'title' ? page.offerTitleFieldId : page.basePriceFieldId) === f.id ? 'rgba(79, 70, 229, 0.05)' : 'white'
                                        }}
                                        onClick={() => {
                                            const updates = configField === 'title' 
                                                ? { offerTitleFieldId: f.id }
                                                : { basePriceFieldId: f.id };
                                            updatePage(pageId, { ...page, ...updates });
                                            setShowConfigModal(false);
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '600' }}>{f.label}</span>
                                            <span style={{ fontSize: '11px', opacity: 0.6 }}>Type: {f.valueType}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="modal-actions" style={{ marginTop: '24px' }}>
                            <button className="btn btn-outline" onClick={() => setShowConfigModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => {
                                const updates = configField === 'title' 
                                    ? { offerTitleFieldId: null }
                                    : { basePriceFieldId: null };
                                updatePage(pageId, { ...page, ...updates });
                                setShowConfigModal(false);
                            }}>Reset to Default</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
