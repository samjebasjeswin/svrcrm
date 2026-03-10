"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import ImageUpload from '../components/ImageUpload';

const VALUE_TYPES = ['Number', 'Text', 'Symbol', 'Number & Text', 'Symbol & Text', 'Link', 'Rich Editor', '120 Char', '160 Char', 'Image', 'Grid', 'Slug', 'Permalink'];

function FieldEditModal({ field, onSave, onClose, pages, currentPageId }) {
    const [label, setLabel] = useState(field?.label || '');
    const [valueType, setValueType] = useState(field?.valueType || 'Text');
    const [required, setRequired] = useState(field?.required ?? false);
    const [minChars, setMinChars] = useState(field?.minChars || '');
    const [maxChars, setMaxChars] = useState(field?.maxChars || '');
    const [linkedPageId, setLinkedPageId] = useState(field?.linkedPageId || '');
    const [slugSourceFieldId, setSlugSourceFieldId] = useState(field?.slugSourceFieldId || '');
    const [permalinkSourceFieldId, setPermalinkSourceFieldId] = useState(field?.permalinkSourceFieldId || '');

    const otherPages = pages.filter((p) => p.id !== Number(currentPageId));

    const handleSave = () => {
        onSave({
            ...field,
            label,
            valueType,
            required,
            minChars: Number(minChars) || 0,
            maxChars: Number(maxChars) || 0,
            linkedPageId: valueType === 'Link' ? Number(linkedPageId) || null : null,
            slugSourceFieldId: valueType === 'Slug' ? slugSourceFieldId : null,
            permalinkSourceFieldId: valueType === 'Permalink' ? permalinkSourceFieldId : null,
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal field-edit-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Field</h2>
                <div className="form-group">
                    <label className="form-label">Label (Title) <span className="required">*</span></label>
                    <input className="form-input" value={label} onChange={(e) => setLabel(e.target.value)} autoFocus />
                </div>
                <div className="form-group">
                    <label className="form-label">Value Type <span className="required">*</span></label>
                    <div className="pill-group">
                        {VALUE_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={`pill ${valueType === type ? (type === 'Link' ? 'active-link' : 'active') : ''}`}
                                onClick={() => setValueType(type)}
                            >
                                {type === 'Link' ? '🔗 Link' : type}
                            </button>
                        ))}
                    </div>
                </div>
                {valueType === 'Link' && (
                    <div className="form-group">
                        <label className="form-label">Link to Page <span className="required">*</span></label>
                        <select
                            className="form-input"
                            value={linkedPageId}
                            onChange={(e) => setLinkedPageId(e.target.value)}
                        >
                            <option value="">-- Select a page --</option>
                            {otherPages.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                {valueType === 'Slug' && (
                    <div className="form-group">
                        <label className="form-label">Connect to Field (Slug Source) <span className="required">*</span></label>
                        <select
                            className="form-input"
                            value={slugSourceFieldId}
                            onChange={(e) => setSlugSourceFieldId(e.target.value)}
                        >
                            <option value="">-- Select source field --</option>
                            {pages.find(p => p.id === Number(currentPageId))?.headings?.flatMap(h =>
                                h.subHeadings?.flatMap(sh =>
                                    sh.fields?.filter(f => f.id !== field?.id && f.valueType !== 'Slug').map(f => (
                                        <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                    )) || []
                                ) || []
                            ) || []}
                        </select>
                    </div>
                )}
                {valueType === 'Permalink' && (
                    <div className="form-group">
                        <label className="form-label">Connect to Field (Permalink Source) <span className="required">*</span></label>
                        <select
                            className="form-input"
                            value={permalinkSourceFieldId}
                            onChange={(e) => setPermalinkSourceFieldId(e.target.value)}
                        >
                            <option value="">-- Select source field --</option>
                            {pages.find(p => p.id === Number(currentPageId))?.headings?.flatMap(h =>
                                h.subHeadings?.flatMap(sh =>
                                    sh.fields?.filter(f => f.id !== field?.id && f.valueType !== 'Permalink').map(f => (
                                        <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                    )) || []
                                ) || []
                            ) || []}
                        </select>
                    </div>
                )}
                {valueType !== 'Link' && (
                    <div className="form-group">
                        <label className="form-label">Character Limits</label>
                        <div className="char-limit-group">
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: 12 }}>Min Characters</label>
                                <input className="form-input" type="number" value={minChars} onChange={(e) => setMinChars(e.target.value)} placeholder="e.g. 0" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: 12 }}>Max Characters</label>
                                <input className="form-input" type="number" value={maxChars} onChange={(e) => setMaxChars(e.target.value)} placeholder="e.g. 160" />
                            </div>
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: 10, width: 'auto' }}>
                        <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} />
                        <span className="toggle-slider"></span>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>Required</span>
                    </label>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default function EditPage() {
    const { pageId } = useParams();
    const router = useRouter();
    const { getPage, updatePage, deletePage, getCompanyPages } = useApp();

    const page = getPage(pageId);
    const allPages = getCompanyPages();

    const [headings, setHeadings] = useState([]);
    const [editingField, setEditingField] = useState(null);
    const [singleEntry, setSingleEntry] = useState(false);
    const [searchEnabled, setSearchEnabled] = useState(false);
    const [searchFieldId, setSearchFieldId] = useState('');
    const [staticSeoEnabled, setStaticSeoEnabled] = useState(false);
    const [dynamicSeoEnabled, setDynamicSeoEnabled] = useState(false);
    const [staticSeoData, setStaticSeoData] = useState({});
    const [dynamicSeoData, setDynamicSeoData] = useState({});
    const [staticSeoTimestamp, setStaticSeoTimestamp] = useState('');

    useEffect(() => {
        if (page) {
            const migrated = (page.headings || []).map((h) => ({
                ...h,
                subHeadings: h.subHeadings || [
                    { id: Date.now() + Math.random(), title: '', fields: h.fields || [] }
                ],
            }));
            setHeadings(migrated);
            setSingleEntry(page.singleEntry || false);
            setSearchEnabled(page.searchEnabled || false);
            setSearchFieldId(page.searchFieldId || '');
            setStaticSeoEnabled(page.staticSeoEnabled || false);
            setDynamicSeoEnabled(page.dynamicSeoEnabled || false);
            setStaticSeoData(page.staticSeoData || {});
            setDynamicSeoData(page.dynamicSeoData || {});
            setStaticSeoTimestamp(page.staticSeoTimestamp || '');
        }
    }, [page?.id]);

    if (!page) {
        return (
            <div className="page-center">
                <div style={{ textAlign: 'center' }}>
                    <h2>Page not found</h2>
                    <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => router.push('/pages')}>
                        Back to Pages
                    </button>
                </div>
            </div>
        );
    }

    const otherPages = allPages.filter((p) => p.id !== Number(pageId));

    const getValueTypeClass = (type) => {
        switch (type) {
            case 'Number': return 'active-number';
            case 'Text': return 'active';
            case 'Symbol': return 'active-symbol';
            case 'Number & Text': return 'active-numtext';
            case 'Symbol & Text': return 'active-symtext';
            case 'Link': return 'active-link';
            case 'Rich Editor': return 'active-rich';
            case '120 Char': return 'active-120';
            case '160 Char': return 'active-160';
            case 'Image': return 'active-image';
            case 'Grid': return 'active-grid';
            case 'Slug': return 'active-slug';
            case 'Permalink': return 'active-permalink';
            default: return 'active';
        }
    };

    // ---- Sub-heading operations ----
    const addSubHeading = (headingId) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: [
                            ...h.subHeadings,
                            { id: Date.now() + Math.random(), title: '', fields: [] },
                        ],
                    }
                    : h
            )
        );
    };

    const updateSubHeadingTitle = (headingId, subId, title) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId ? { ...sh, title } : sh
                        ),
                    }
                    : h
            )
        );
    };

    const deleteSubHeading = (headingId, subId) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? { ...h, subHeadings: h.subHeadings.filter((sh) => sh.id !== subId) }
                    : h
            )
        );
    };

    // ---- Field operations ----
    const addGrid = (headingId, subId) => {
        const colCount = window.prompt('How many grid columns do you need?', '2');
        const num = parseInt(colCount);
        if (isNaN(num) || num <= 0) return;

        const gridCols = Array.from({ length: num }, (_, i) => ({
            id: i,
            label: `Column ${i + 1}`,
            placeholder: 'Enter details...'
        }));

        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId
                                ? {
                                    ...sh,
                                    fields: [
                                        ...sh.fields,
                                        {
                                            id: Date.now() + Math.random(),
                                            label: 'Grid Field',
                                            valueType: 'Grid',
                                            required: false,
                                            gridCols
                                        },
                                    ],
                                }
                                : sh
                        ),
                    }
                    : h
            )
        );
    };

    const addField = (headingId, subId) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId
                                ? {
                                    ...sh,
                                    fields: [
                                        ...sh.fields,
                                        {
                                            id: Date.now() + Math.random(),
                                            label: '',
                                            valueType: 'Text',
                                            required: false,
                                        },
                                    ],
                                }
                                : sh
                        ),
                    }
                    : h
            )
        );
    };

    const updateFieldInline = (headingId, subId, fieldId, key, value) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId
                                ? {
                                    ...sh,
                                    fields: sh.fields.map((f) =>
                                        f.id === fieldId ? { ...f, [key]: value } : f
                                    ),
                                }
                                : sh
                        ),
                    }
                    : h
            )
        );
    };

    const updateFieldLink = (headingId, subId, fieldId, linkedPageId) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId
                                ? {
                                    ...sh,
                                    fields: sh.fields.map((f) =>
                                        f.id === fieldId
                                            ? { ...f, valueType: 'Link', linkedPageId: Number(linkedPageId) || null }
                                            : f
                                    ),
                                }
                                : sh
                        ),
                    }
                    : h
            )
        );
    };

    const deleteField = (headingId, subId, fieldId) => {
        setHeadings((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId
                                ? { ...sh, fields: sh.fields.filter((f) => f.id !== fieldId) }
                                : sh
                        ),
                    }
                    : h
            )
        );
    };

    // ---- Heading operations ----
    const addHeading = () => {
        setHeadings((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: '',
                subHeadings: [{ id: Date.now() + 1, title: '', fields: [] }],
            },
        ]);
    };

    const updateHeadingTitle = (headingId, title) => {
        setHeadings((prev) =>
            prev.map((h) => (h.id === headingId ? { ...h, title } : h))
        );
    };

    const deleteHeading = (headingId) => {
        if (headings.length <= 1) return;
        setHeadings((prev) => prev.filter((h) => h.id !== headingId));
    };

    const handleUpdate = () => {
        updatePage(Number(pageId), {
            headings,
            singleEntry,
            searchEnabled,
            searchFieldId,
            staticSeoEnabled,
            dynamicSeoEnabled,
            staticSeoData,
            dynamicSeoData,
            staticSeoTimestamp
        });
        router.push('/pages');
    };

    const handleDeletePage = () => {
        if (confirm('Are you sure you want to delete this page?')) {
            deletePage(Number(pageId));
            router.push('/pages');
        }
    };

    const handleEditFieldSave = (updatedField) => {
        setHeadings((prev) =>
            prev.map((h) => ({
                ...h,
                subHeadings: h.subHeadings.map((sh) => ({
                    ...sh,
                    fields: sh.fields.map((f) => (f.id === updatedField.id ? updatedField : f)),
                })),
            }))
        );
        setEditingField(null);
    };

    const getLinkedPageName = (linkedPageId) => {
        const p = allPages.find((pg) => pg.id === linkedPageId);
        return p ? p.name : '';
    };

    return (
        <>
            {/* Header */}
            <div className="edit-page-header">
                <div className="edit-page-header-left">
                    <button className="back-btn" onClick={() => router.push('/pages')}>
                        ←
                    </button>
                    <div className="breadcrumb">
                        <span style={{ fontWeight: 700 }}>Edit Page</span>
                        <span className="separator">›</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{page.name}</span>
                    </div>
                </div>
                <div className="edit-page-header-right">
                    <button className="btn btn-danger-text btn-sm" onClick={handleDeletePage}>
                        🗑 Delete Page
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => router.push('/pages')}>
                        Cancel
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>

            {/* Single Entry Toggle */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: singleEntry ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                border: `1.5px solid ${singleEntry ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '12px', marginBottom: '24px', transition: 'all 0.2s'
            }}>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>Single Entry Mode</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {singleEntry
                            ? 'ON — This page works like a settings page (one form, no catalog list)'
                            : 'OFF — This page shows a catalog with multiple entries'}
                    </div>
                </div>
                <label className="toggle" style={{ flexShrink: 0 }}>
                    <input type="checkbox" checked={singleEntry} onChange={(e) => setSingleEntry(e.target.checked)} />
                    <span className="toggle-slider"></span>
                </label>
            </div>

            {/* Search Configuration */}
            {!singleEntry && (
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '12px',
                    padding: '16px 24px', background: searchEnabled ? 'rgba(16,185,129,0.06)' : '#f8fafc',
                    border: `1.5px solid ${searchEnabled ? '#10b981' : 'var(--border)'}`,
                    borderRadius: '12px', marginBottom: '24px', transition: 'all 0.2s'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>Enable Search</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                Show a search bar in the catalog list to filter entries
                            </div>
                        </div>
                        <label className="toggle" style={{ flexShrink: 0 }}>
                            <input type="checkbox" checked={searchEnabled} onChange={(e) => setSearchEnabled(e.target.checked)} />
                            <span className="toggle-slider" style={{ backgroundColor: searchEnabled ? '#10b981' : '#ccc' }}></span>
                        </label>
                    </div>
                    {searchEnabled && (
                        <div className="search-field-selector" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>Searchable Field</label>
                            <select
                                className="form-input"
                                style={{ height: '38px', fontSize: '13px' }}
                                value={searchFieldId}
                                onChange={(e) => setSearchFieldId(e.target.value)}
                            >
                                <option value="">-- All fields (Text search) --</option>
                                {headings.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields?.map(f => (
                                    <option key={f.id} value={f.id}>🔍 {f.label || `Field ${f.id}`}</option>
                                )) || []) || []).map(opt => opt)}
                            </select>
                            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                                Select which field users can search through (e.g. Name, SKU, Email)
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Static SEO Configuration */}
            <div style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                padding: '16px 24px', background: staticSeoEnabled ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                border: `1.5px solid ${staticSeoEnabled ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '12px', marginBottom: '24px', transition: 'all 0.2s'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>Static SEO</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Configure standard meta tags for search engine optimization
                        </div>
                    </div>
                    <label className="toggle" style={{ flexShrink: 0 }}>
                        <input type="checkbox" checked={staticSeoEnabled} onChange={(e) => setStaticSeoEnabled(e.target.checked)} />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                {staticSeoEnabled && (
                    <div className="seo-fields-container animate-slide-down" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Standard Meta Tags */}
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', marginBottom: '12px' }}>Standard Meta Tags</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {[
                                    { label: 'Web Page Title (<title>)', key: 'title' },
                                    { label: 'Meta Description', key: 'description' },
                                    { label: 'Meta Keywords', key: 'keywords' },
                                    { label: 'Robots', key: 'robots' },
                                    { label: 'Website Name / Author', key: 'author' },
                                    { label: 'Refresh', key: 'refresh' },
                                    { label: 'Canonical URL', key: 'canonical' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={staticSeoData[field.key] || ''}
                                            onChange={(e) => {
                                                setStaticSeoData(prev => ({ ...prev, [field.key]: e.target.value }));
                                                setStaticSeoTimestamp(new Date().toLocaleString());
                                            }}
                                            placeholder={`Enter ${field.key}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Open Graph Data */}
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', marginBottom: '12px' }}>Open Graph Data</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group" style={{ gridColumn: '1 / 2' }}>
                                    <label className="form-label" style={{ fontSize: '11px' }}>OG Image</label>
                                    <ImageUpload
                                        value={staticSeoData.ogImage}
                                        onChange={(val) => {
                                            setStaticSeoData(prev => ({ ...prev, ogImage: val }));
                                            setStaticSeoTimestamp(new Date().toLocaleString());
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                    {[
                                        { label: 'OG Title', key: 'ogTitle' },
                                        { label: 'OG Type', key: 'ogType' },
                                        { label: 'OG URL', key: 'ogUrl' }
                                    ].map((field) => (
                                        <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                            <input
                                                className="form-input"
                                                style={{ height: '36px', fontSize: '12px' }}
                                                value={staticSeoData[field.key] || ''}
                                                onChange={(e) => {
                                                    setStaticSeoData(prev => ({ ...prev, [field.key]: e.target.value }));
                                                    setStaticSeoTimestamp(new Date().toLocaleString());
                                                }}
                                                placeholder={`Enter ${field.label}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {[
                                    { label: 'OG Description', key: 'ogDescription' },
                                    { label: 'OG Locale', key: 'ogLocale' },
                                    { label: 'OG Site Name', key: 'ogSiteName' },
                                    { label: 'Article Published Time', key: 'articlePublishedTime' },
                                    { label: 'Article Modified Time', key: 'articleModifiedTime' },
                                    { label: 'Article Author', key: 'articleAuthor' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={staticSeoData[field.key] || ''}
                                            onChange={(e) => {
                                                setStaticSeoData(prev => ({ ...prev, [field.key]: e.target.value }));
                                                setStaticSeoTimestamp(new Date().toLocaleString());
                                            }}
                                            placeholder={`Enter ${field.label}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Twitter Card Data */}
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', marginBottom: '12px' }}>Twitter Card Data</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group" style={{ gridColumn: '1 / 2' }}>
                                    <label className="form-label" style={{ fontSize: '11px' }}>Twitter Image</label>
                                    <ImageUpload
                                        value={staticSeoData.twImage}
                                        onChange={(val) => {
                                            setStaticSeoData(prev => ({ ...prev, twImage: val }));
                                            setStaticSeoTimestamp(new Date().toLocaleString());
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                    {[
                                        { label: 'Twitter Card', key: 'twCard' },
                                        { label: 'Twitter Site', key: 'twSite' },
                                        { label: 'Twitter Title', key: 'twTitle' }
                                    ].map((field) => (
                                        <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                            <input
                                                className="form-input"
                                                style={{ height: '36px', fontSize: '12px' }}
                                                value={staticSeoData[field.key] || ''}
                                                onChange={(e) => {
                                                    setStaticSeoData(prev => ({ ...prev, [field.key]: e.target.value }));
                                                    setStaticSeoTimestamp(new Date().toLocaleString());
                                                }}
                                                placeholder={`Enter ${field.label}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {[
                                    { label: 'Twitter Description', key: 'twDescription' },
                                    { label: 'Twitter Creator', key: 'twCreator' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={staticSeoData[field.key] || ''}
                                            onChange={(e) => {
                                                setStaticSeoData(prev => ({ ...prev, [field.key]: e.target.value }));
                                                setStaticSeoTimestamp(new Date().toLocaleString());
                                            }}
                                            placeholder={`Enter ${field.label}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dublin Core Metadata */}
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', marginBottom: '12px' }}>Dublin Core Metadata</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {[
                                    { label: 'DC Title', key: 'dcTitle' },
                                    { label: 'DC Description', key: 'dcDescription' },
                                    { label: 'DC Subject', key: 'dcSubject' },
                                    { label: 'DC Created', key: 'dcCreated' },
                                    { label: 'DC Modified', key: 'dcModified' },
                                    { label: 'DC Language', key: 'dcLanguage' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={staticSeoData[field.key] || ''}
                                            onChange={(e) => {
                                                setStaticSeoData(prev => ({ ...prev, [field.key]: e.target.value }));
                                                setStaticSeoTimestamp(new Date().toLocaleString());
                                            }}
                                            placeholder={`Enter ${field.label}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {staticSeoTimestamp && (
                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px', fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                                🕒 Last updated: <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{staticSeoTimestamp}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Dynamic SEO Configuration */}
            <div style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                padding: '16px 24px', background: dynamicSeoEnabled ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                border: `1.5px solid ${dynamicSeoEnabled ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '12px', marginBottom: '24px', transition: 'all 0.2s'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>Dynamic SEO</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Configure social media meta tags for better link sharing
                        </div>
                    </div>
                    <label className="toggle" style={{ flexShrink: 0 }}>
                        <input type="checkbox" checked={dynamicSeoEnabled} onChange={(e) => setDynamicSeoEnabled(e.target.checked)} />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                {dynamicSeoEnabled && (
                    <div className="seo-fields-container animate-slide-down" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* OG Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '11px' }}>OG Image</label>
                                <ImageUpload
                                    value={dynamicSeoData.ogImage}
                                    onChange={(val) => setDynamicSeoData(prev => ({ ...prev, ogImage: val }))}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                {[
                                    { label: 'OG Title', key: 'ogTitle' },
                                    { label: 'OG Description', key: 'ogDescription' },
                                    { label: 'OG Alt Text', key: 'ogAlt' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={dynamicSeoData[field.key] || ''}
                                            onChange={(e) => setDynamicSeoData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            placeholder={`Enter ${field.label}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Facebook Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '11px' }}>Facebook Image</label>
                                <ImageUpload
                                    value={dynamicSeoData.fbImage}
                                    onChange={(val) => setDynamicSeoData(prev => ({ ...prev, fbImage: val }))}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                {[
                                    { label: 'Facebook Title', key: 'fbTitle' },
                                    { label: 'Facebook Description', key: 'fbDescription' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={dynamicSeoData[field.key] || ''}
                                            onChange={(e) => setDynamicSeoData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            placeholder={`Enter ${field.label}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Twitter Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '11px' }}>Twitter Image</label>
                                <ImageUpload
                                    value={dynamicSeoData.twImage}
                                    onChange={(val) => setDynamicSeoData(prev => ({ ...prev, twImage: val }))}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                {[
                                    { label: 'Twitter Title', key: 'twTitle' },
                                    { label: 'Twitter Description', key: 'twDescription' }
                                ].map((field) => (
                                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label" style={{ fontSize: '11px' }}>{field.label}</label>
                                        <input
                                            className="form-input"
                                            style={{ height: '36px', fontSize: '12px' }}
                                            value={dynamicSeoData[field.key] || ''}
                                            onChange={(e) => setDynamicSeoData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            placeholder={`Enter ${field.label}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="edit-page-body">
                {headings.map((heading, hIndex) => (
                    <div key={heading.id} className="heading-block">
                        {/* Main Heading */}
                        <div className="heading-input-wrapper">
                            <div className="heading-top-row">
                                <div className="heading-label">
                                    Heading {hIndex + 1} <span className="required">*</span>
                                </div>
                                {headings.length > 1 && (
                                    <button
                                        className="btn btn-danger-text btn-sm"
                                        onClick={() => deleteHeading(heading.id)}
                                        style={{ fontSize: 12, padding: '4px 8px' }}
                                    >
                                        ✕ Remove
                                    </button>
                                )}
                            </div>
                            <input
                                className="heading-input"
                                value={heading.title}
                                onChange={(e) => updateHeadingTitle(heading.id, e.target.value)}
                                placeholder="Main heading for this page section"
                            />
                            <div className="heading-placeholder">Main heading for this page section</div>
                        </div>

                        {/* Sub-headings inside this heading */}
                        <div className="subheadings-container">
                            {heading.subHeadings.map((sub, sIndex) => (
                                <div key={sub.id} className="subheading-block animate-slide-down">
                                    <div className="subheading-header">
                                        <div className="subheading-input-wrapper">
                                            <div className="subheading-label">
                                                Sub Heading {sIndex + 1}
                                                {heading.subHeadings.length > 1 && (
                                                    <button
                                                        className="btn btn-danger-text btn-sm"
                                                        onClick={() => deleteSubHeading(heading.id, sub.id)}
                                                        style={{ fontSize: 11, padding: '2px 6px', marginLeft: 8 }}
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                className="subheading-input"
                                                value={sub.title}
                                                onChange={(e) => updateSubHeadingTitle(heading.id, sub.id, e.target.value)}
                                                placeholder="Sub heading title"
                                            />
                                        </div>
                                    </div>

                                    {/* Fields for this sub-heading */}
                                    <div className="fields-section">
                                        <div className="fields-header">
                                            <div>
                                                <h3>Page Fields</h3>
                                                <p>Add labels and select value types</p>
                                            </div>
                                            <div className="fields-header-actions" style={{ display: 'flex', gap: '10px' }}>
                                                <button className="btn btn-ghost btn-sm" style={{ border: '1.5px dashed var(--accent)', color: 'var(--accent)' }} onClick={() => addGrid(heading.id, sub.id)}>
                                                    + Grid
                                                </button>
                                                <button className="btn btn-accent btn-sm" onClick={() => addField(heading.id, sub.id)}>
                                                    + Add New Field
                                                </button>
                                            </div>
                                        </div>

                                        {sub.fields.length > 0 && (
                                            <>
                                                <div className="fields-table-header">
                                                    <span>Label / Grid Config</span>
                                                    <span>Value Type *</span>
                                                    <span>Required</span>
                                                    <span>Infinity / Max</span>
                                                    <span>Actions</span>
                                                </div>

                                                {sub.fields.map((field) => (
                                                    <div key={field.id} className="field-row">
                                                        <input
                                                            className="field-label-input"
                                                            value={field.label}
                                                            onChange={(e) =>
                                                                updateFieldInline(heading.id, sub.id, field.id, 'label', e.target.value)
                                                            }
                                                            placeholder="Field name"
                                                        />
                                                        <div className="pill-group-wrapper">
                                                            <div className="pill-group">
                                                                {VALUE_TYPES.map((type) => (
                                                                    <button
                                                                        key={type}
                                                                        type="button"
                                                                        className={`pill ${field.valueType === type ? getValueTypeClass(type) : ''}`}
                                                                        onClick={() => {
                                                                            if (type === 'Link') {
                                                                                updateFieldInline(heading.id, sub.id, field.id, 'valueType', 'Link');
                                                                            } else {
                                                                                updateFieldInline(heading.id, sub.id, field.id, 'valueType', type);
                                                                                updateFieldInline(heading.id, sub.id, field.id, 'linkedPageId', null);
                                                                            }
                                                                        }}
                                                                    >
                                                                        {type === 'Link' ? '🔗 Link' : type}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            {field.valueType === 'Link' && (
                                                                <div className="link-page-selector">
                                                                    <select
                                                                        className="link-page-select"
                                                                        value={field.linkedPageId || ''}
                                                                        onChange={(e) =>
                                                                            updateFieldLink(heading.id, sub.id, field.id, e.target.value)
                                                                        }
                                                                    >
                                                                        <option value="">Select page to link...</option>
                                                                        {otherPages.map((p) => (
                                                                            <option key={p.id} value={p.id}>
                                                                                📄 {p.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {field.linkedPageId && (
                                                                        <span className="linked-page-badge">
                                                                            🔗 {getLinkedPageName(field.linkedPageId)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {field.valueType === 'Slug' && (
                                                                <div className="link-page-selector" style={{ position: 'relative' }}>
                                                                    <select
                                                                        className="link-page-select"
                                                                        style={{ paddingLeft: '32px' }}
                                                                        value={field.slugSourceFieldId || ''}
                                                                        onChange={(e) =>
                                                                            updateFieldInline(heading.id, sub.id, field.id, 'slugSourceFieldId', e.target.value)
                                                                        }
                                                                    >
                                                                        <option value="">Select source field...</option>
                                                                        {page.headings?.flatMap(h =>
                                                                            h.subHeadings?.flatMap(sh =>
                                                                                sh.fields?.filter(f => f.id !== field.id && f.valueType !== 'Slug').map(f => (
                                                                                    <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                                                                )) || []
                                                                            ) || []
                                                                        ) || []}
                                                                    </select>
                                                                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>🔗</span>
                                                                    {field.slugSourceFieldId && (
                                                                        <span className="linked-page-badge" style={{ background: '#fff3e0', color: '#e65100', borderColor: '#e65100' }}>
                                                                            Slug Source: {
                                                                                page.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields)).find(f => String(f?.id) === String(field.slugSourceFieldId))?.label || field.slugSourceFieldId
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {field.valueType === 'Permalink' && (
                                                                <div className="link-page-selector" style={{ position: 'relative' }}>
                                                                    <select
                                                                        className="link-page-select"
                                                                        style={{ paddingLeft: '32px' }}
                                                                        value={field.permalinkSourceFieldId || ''}
                                                                        onChange={(e) =>
                                                                            updateFieldInline(heading.id, sub.id, field.id, 'permalinkSourceFieldId', e.target.value)
                                                                        }
                                                                    >
                                                                        <option value="">Select source field...</option>
                                                                        {page.headings?.flatMap(h =>
                                                                            h.subHeadings?.flatMap(sh =>
                                                                                sh.fields?.filter(f => f.id !== field.id && f.valueType !== 'Permalink').map(f => (
                                                                                    <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                                                                )) || []
                                                                            ) || []
                                                                        ) || []}
                                                                    </select>
                                                                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>🔗</span>
                                                                    {field.permalinkSourceFieldId && (
                                                                        <span className="linked-page-badge" style={{ background: '#e0f2f1', color: '#00695c', borderColor: '#00695c' }}>
                                                                            Permalink Source: {
                                                                                page.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields)).find(f => String(f?.id) === String(field.permalinkSourceFieldId))?.label || field.permalinkSourceFieldId
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {field.valueType === 'Grid' && (
                                                            <div className="grid-config-container animate-fade-in" style={{ gridColumn: '1 / -1', padding: '16px', background: '#f8fafc', borderRadius: 12, marginTop: 12, border: '1px solid var(--border)' }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                                                    <h4 style={{ fontSize: 13, fontWeight: 700 }}>Grid Configuration ({field.gridCols?.length || 0} Columns)</h4>
                                                                    <button
                                                                        className="btn btn-ghost btn-sm"
                                                                        style={{ color: 'var(--danger)' }}
                                                                        onClick={() => {
                                                                            const newCols = [...(field.gridCols || [])];
                                                                            newCols.pop();
                                                                            updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                        }}
                                                                    >
                                                                        - Col
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-ghost btn-sm"
                                                                        style={{ color: 'var(--accent)' }}
                                                                        onClick={() => {
                                                                            const newCols = [...(field.gridCols || [])];
                                                                            newCols.push({ id: Date.now(), label: '', placeholder: '' });
                                                                            updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                        }}
                                                                    >
                                                                        + Col
                                                                    </button>
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                                    {(field.gridCols || []).map((col, cIdx) => (
                                                                        <div key={col.id || cIdx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                                                            <span style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 20 }}>{cIdx + 1}.</span>
                                                                            <input
                                                                                className="field-label-input"
                                                                                value={col.label}
                                                                                onChange={(e) => {
                                                                                    const newCols = [...field.gridCols];
                                                                                    newCols[cIdx].label = e.target.value;
                                                                                    updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                                }}
                                                                                placeholder="Column Label"
                                                                                style={{ flex: 1 }}
                                                                            />
                                                                            <input
                                                                                className="field-label-input"
                                                                                value={col.placeholder}
                                                                                onChange={(e) => {
                                                                                    const newCols = [...field.gridCols];
                                                                                    newCols[cIdx].placeholder = e.target.value;
                                                                                    updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                                }}
                                                                                placeholder="Placeholder"
                                                                                style={{ flex: 1.5 }}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <label className="toggle">
                                                            <input
                                                                type="checkbox"
                                                                checked={field.required}
                                                                onChange={(e) =>
                                                                    updateFieldInline(heading.id, sub.id, field.id, 'required', e.target.checked)
                                                                }
                                                            />
                                                            <span className="toggle-slider"></span>
                                                        </label>

                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <label className="toggle">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={field.infinity}
                                                                    onChange={(e) =>
                                                                        updateFieldInline(heading.id, sub.id, field.id, 'infinity', e.target.checked)
                                                                    }
                                                                />
                                                                <span className="toggle-slider infinity-slider"></span>
                                                            </label>
                                                            {field.infinity && (
                                                                <input
                                                                    type="number"
                                                                    className="form-input"
                                                                    style={{ width: '50px', padding: '4px 6px', fontSize: '11px', height: 'auto', textAlign: 'center' }}
                                                                    value={field.maxItems || ''}
                                                                    onChange={(e) => updateFieldInline(heading.id, sub.id, field.id, 'maxItems', e.target.value)}
                                                                    placeholder="Max"
                                                                    title="Max repeating rows (blank = infinity)"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="field-actions">
                                                            <button
                                                                className="field-action-btn edit"
                                                                onClick={() => setEditingField(field)}
                                                            >
                                                                ✏️ Edit
                                                            </button>
                                                            <button
                                                                className="field-action-btn delete"
                                                                onClick={() => deleteField(heading.id, sub.id, field.id)}
                                                            >
                                                                🗑 Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        <button className="add-field-btn" onClick={() => addField(heading.id, sub.id)}>
                                            + Add New Field
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button className="add-subheading-btn" onClick={() => addSubHeading(heading.id)}>
                                + Add Sub Heading
                            </button>
                        </div>
                    </div>
                ))}

                <button className="add-heading-btn" onClick={addHeading}>
                    + Add Heading
                </button>

                <div className="edit-page-footer">
                    <button className="btn btn-outline" onClick={() => router.push('/pages')}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Edit Field Modal */}
            {editingField && (
                <FieldEditModal
                    field={editingField}
                    onSave={handleEditFieldSave}
                    onClose={() => setEditingField(null)}
                    pages={allPages}
                    currentPageId={pageId}
                />
            )}
        </>
    );
}
