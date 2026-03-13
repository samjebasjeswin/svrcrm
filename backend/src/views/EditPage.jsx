"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import ImageUpload from '../components/ImageUpload';

const VALUE_TYPES = ['Number', 'Text', 'Link', 'Rich Editor', '120 Char', '160 Char', 'Image', 'Grid', 'Slug', 'Permalink', 'limit'];

function FieldEditModal({ field, onSave, onClose, pages, currentPageId }) {
    const [label, setLabel] = useState(field?.label || '');
    const [valueType, setValueType] = useState(field?.valueType || 'Text');
    const [required, setRequired] = useState(field?.required ?? false);
    const [minChars, setMinChars] = useState(field?.minChars || '');
    const [maxChars, setMaxChars] = useState(field?.maxChars || '');
    const [linkedPageId, setLinkedPageId] = useState(field?.linkedPageId || '');
    const [slugSourceFieldId, setSlugSourceFieldId] = useState(field?.slugSourceFieldId || '');
    const [permalinkSourceFieldId, setPermalinkSourceFieldId] = useState(field?.permalinkSourceFieldId || '');
    const [infinity, setInfinity] = useState(field?.infinity || false);
    const [maxItems, setMaxItems] = useState(field?.maxItems || '');
    const [gridCols, setGridCols] = useState(field?.gridCols || [{ label: '', placeholder: '' }]);

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
            infinity: (valueType !== 'Grid' && valueType !== 'Slug' && valueType !== 'Permalink') ? infinity : false,
            maxItems: (valueType !== 'Grid' && valueType !== 'Slug' && valueType !== 'Permalink') ? Number(maxItems) || 0 : 0,
            gridCols: valueType === 'Grid' ? gridCols : null,
        });
    };

    const addGridCol = () => setGridCols([...gridCols, { label: '', placeholder: '' }]);
    const removeGridCol = (idx) => setGridCols(gridCols.filter((_, i) => i !== idx));
    const updateGridCol = (idx, key, val) => {
        const newCols = [...gridCols];
        newCols[idx] = { ...newCols[idx], [key]: val };
        setGridCols(newCols);
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
                        {(() => {
                            const textRelatedTypes = ['Text', 'Number', 'limit', 'Slug', 'Permalink'];
                            const isTextRelated = textRelatedTypes.includes(valueType);
                            const otherTypes = ['Link', 'Rich Editor', 'Image', 'Grid'];

                            return (
                                <>
                                    <button
                                        type="button"
                                        className={`pill ${isTextRelated ? 'active' : ''}`}
                                        onClick={() => {
                                            if (!isTextRelated) setValueType('Text');
                                        }}
                                    >
                                        Text Fields
                                    </button>
                                    {otherTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={`pill ${valueType === type ? (type === 'Link' ? 'active-link' : 'active') : ''}`}
                                            onClick={() => setValueType(type)}
                                        >
                                            {type === 'Link' ? '🔗 Link' : type}
                                        </button>
                                    ))}
                                </>
                            );
                        })()}
                    </div>
                    {/* Sub-options for Text Related Types in Modal */}
                    {['Text', 'Number', 'limit', 'Slug', 'Permalink'].includes(valueType) && (
                        <div className="sub-pill-group" style={{ marginTop: '12px', display: 'flex', gap: '6px', padding: '6px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                            {['Text', 'Number', 'limit', 'Slug', 'Permalink'].map((subType) => (
                                <button
                                    key={subType}
                                    type="button"
                                    className={`pill pill-sm ${valueType === subType ? getValueTypeClass(subType) : ''}`}
                                    style={{ fontSize: '11px', padding: '4px 10px' }}
                                    onClick={() => setValueType(subType)}
                                >
                                    {subType}
                                </button>
                            ))}
                        </div>
                    )}
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
                {(valueType !== 'Grid' && valueType !== 'Slug' && valueType !== 'Permalink') && (
                    <div className="form-group">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: 10, width: 'auto' }}>
                                <input type="checkbox" checked={infinity || false} onChange={(e) => setInfinity(e.target.checked)} />
                                <span className="toggle-slider"></span>
                                <span style={{ fontSize: 13, fontWeight: 500 }}>Infinity (Multi-row)</span>
                            </label>
                            {infinity && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Max Items:</span>
                                    <input
                                        type="number"
                                        className="form-input"
                                        style={{ width: '60px', height: '32px', padding: '4px 8px' }}
                                        value={maxItems}
                                        onChange={(e) => setMaxItems(e.target.value)}
                                        placeholder="∞"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {valueType === 'Grid' && (
                    <div className="form-group">
                        <label className="form-label">Grid Columns <span className="required">*</span></label>
                        <div className="grid-cols-config">
                            {gridCols.map((col, idx) => (
                                <div key={idx} className="grid-col-setup-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input
                                        className="form-input"
                                        style={{ flex: 1 }}
                                        placeholder="Col Label"
                                        value={col.label}
                                        onChange={(e) => updateGridCol(idx, 'label', e.target.value)}
                                    />
                                    <input
                                        className="form-input"
                                        style={{ flex: 1 }}
                                        placeholder="Placeholder"
                                        value={col.placeholder}
                                        onChange={(e) => updateGridCol(idx, 'placeholder', e.target.value)}
                                    />
                                    {gridCols.length > 1 && (
                                        <button className="btn btn-ghost btn-danger-text" onClick={() => removeGridCol(idx)}>✕</button>
                                    )}
                                </div>
                            ))}
                            <button className="btn btn-outline btn-sm" onClick={addGridCol}>+ Add Column</button>
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: 10, width: 'auto' }}>
                        <input type="checkbox" checked={required || false} onChange={(e) => setRequired(e.target.checked)} />
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
    const { getPage, updatePage, deletePage, getCompanyPages, pageLinks, addPageLinks, deletePageLink } = useApp();

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
    const [staticSeoHeadings, setStaticSeoHeadings] = useState([]);
    const [dynamicSeoHeadings, setDynamicSeoHeadings] = useState([]);
    const [staticSeoTimestamp, setStaticSeoTimestamp] = useState('');
    const [superAdminEnabled, setSuperAdminEnabled] = useState(true);
    const [activeSetter, setActiveSetter] = useState(null);
    const [linkingEnabled, setLinkingEnabled] = useState(false);
    const [linkSourcePageId, setLinkSourcePageId] = useState('');
    const [linkFieldName, setLinkFieldName] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [groupName, setGroupName] = useState('');
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

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
            setStaticSeoHeadings(page.staticSeoHeadings || []);

            // Migrate legacy Dynamic SEO structure (3 headings -> 1 heading with 3 subheadings)
            let loadedDynamicHeadings = page.dynamicSeoHeadings || [];
            if (loadedDynamicHeadings.length > 1 && loadedDynamicHeadings[0]?.id === 'dyn-og') {
                const ogHeading = loadedDynamicHeadings.find(h => h.id === 'dyn-og');
                const fbHeading = loadedDynamicHeadings.find(h => h.id === 'dyn-fb');
                const twHeading = loadedDynamicHeadings.find(h => h.id === 'dyn-tw');

                loadedDynamicHeadings = [{
                    id: 'dyn-seo',
                    title: 'Dynamic SEO',
                    subHeadings: [
                        {
                            id: 'dyn-og-sub',
                            title: 'Open Graph Data',
                            fields: ogHeading?.subHeadings?.[0]?.fields || [
                                { id: 'og-img', label: 'OG Image', valueType: 'Image', required: false },
                                { id: 'og-title', label: 'OG Title', valueType: 'Text', required: false },
                                { id: 'og-desc', label: 'OG Description', valueType: '160 Char', required: false },
                                { id: 'og-alt', label: 'OG Alt Text', valueType: 'Text', required: false },
                            ]
                        },
                        {
                            id: 'dyn-fb-sub',
                            title: 'Facebook Data',
                            fields: fbHeading?.subHeadings?.[0]?.fields || [
                                { id: 'fb-img', label: 'Facebook Image', valueType: 'Image', required: false },
                                { id: 'fb-title', label: 'Facebook Title', valueType: 'Text', required: false },
                                { id: 'fb-desc', label: 'Facebook Description', valueType: '160 Char', required: false },
                            ]
                        },
                        {
                            id: 'dyn-tw-sub',
                            title: 'Twitter Card Data',
                            fields: twHeading?.subHeadings?.[0]?.fields || [
                                { id: 'tw-img', label: 'Twitter Image', valueType: 'Image', required: false },
                                { id: 'tw-title', label: 'Twitter Title', valueType: 'Text', required: false },
                                { id: 'tw-desc', label: 'Twitter Description', valueType: '160 Char', required: false },
                            ]
                        }
                    ]
                }];
            }
            setDynamicSeoHeadings(loadedDynamicHeadings);

            setStaticSeoTimestamp(page.staticSeoTimestamp || '');
            setSuperAdminEnabled(page.superAdminEnabled ?? true);
            setLinkingEnabled(page.linkingEnabled || false);
        }
    }, [page?.id]);

    // Initialize Default SEO Structures if empty
    useEffect(() => {
        if (staticSeoEnabled && staticSeoHeadings.length === 0) {
            setStaticSeoHeadings([
                {
                    id: 'static-standard',
                    title: 'Standard Meta Tags',
                    subHeadings: [{
                        id: 'static-standard-sub',
                        title: '',
                        fields: [
                            { id: 'st-title', label: 'Web Page Title (<title>)', valueType: 'Text', required: false },
                            { id: 'st-desc', label: 'Meta Description', valueType: '160 Char', required: false },
                            { id: 'st-key', label: 'Meta Keywords', valueType: 'Text', required: false },
                            { id: 'st-rob', label: 'Robots', valueType: 'Text', required: false },
                            { id: 'st-auth', label: 'Website Name / Author', valueType: 'Text', required: false },
                            { id: 'st-ref', label: 'Refresh', valueType: 'Text', required: false },
                            { id: 'st-can', label: 'Canonical URL', valueType: 'Text', required: false },
                        ]
                    }]
                }
            ]);
        }
        if (dynamicSeoEnabled && dynamicSeoHeadings.length === 0) {
            setDynamicSeoHeadings([
                {
                    id: 'dyn-seo',
                    title: 'Dynamic SEO',
                    subHeadings: [
                        {
                            id: 'dyn-og-sub',
                            title: 'Open Graph Data',
                            fields: [
                                { id: 'og-img', label: 'OG Image', valueType: 'Image', required: false },
                                { id: 'og-title', label: 'OG Title', valueType: 'Text', required: false },
                                { id: 'og-desc', label: 'OG Description', valueType: '160 Char', required: false },
                                { id: 'og-alt', label: 'OG Alt Text', valueType: 'Text', required: false },
                            ]
                        },
                        {
                            id: 'dyn-fb-sub',
                            title: 'Facebook Data',
                            fields: [
                                { id: 'fb-img', label: 'Facebook Image', valueType: 'Image', required: false },
                                { id: 'fb-title', label: 'Facebook Title', valueType: 'Text', required: false },
                                { id: 'fb-desc', label: 'Facebook Description', valueType: '160 Char', required: false },
                            ]
                        },
                        {
                            id: 'dyn-tw-sub',
                            title: 'Twitter Card Data',
                            fields: [
                                { id: 'tw-img', label: 'Twitter Image', valueType: 'Image', required: false },
                                { id: 'tw-title', label: 'Twitter Title', valueType: 'Text', required: false },
                                { id: 'tw-desc', label: 'Twitter Description', valueType: '160 Char', required: false },
                            ]
                        }
                    ]
                }
            ]);
        }
    }, [staticSeoEnabled, dynamicSeoEnabled]);

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
            case 'limit': return 'active-limit';
            default: return 'active';
        }
    };

    // ---- Sub-heading operations ----
    const addSubHeading = (headingId, setter = setHeadings) => {
        setter((prev) =>
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

    const updateSubHeadingTitle = (headingId, subId, title, setter = setHeadings) => {
        setter((prev) =>
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

    const deleteSubHeading = (headingId, subId, setter = setHeadings) => {
        setter((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? { ...h, subHeadings: h.subHeadings.filter((sh) => sh.id !== subId) }
                    : h
            )
        );
    };

    // ---- Field operations ----
    const addGrid = (headingId, subId, setter = setHeadings) => {
        const colCount = window.prompt('How many grid columns do you need?', '2');
        const num = parseInt(colCount);
        if (isNaN(num) || num <= 0) return;

        const gridCols = Array.from({ length: num }, (_, i) => ({
            id: i,
            label: `Column ${i + 1}`,
            placeholder: 'Enter details...'
        }));

        setter((prev) =>
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
                                            infinity: false,
                                            maxItems: 0,
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

    const addFieldToBatch = (headingId, subId, batchId, batchLabel, setter = setHeadings) => {
        setter((prev) =>
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
                                            infinity: false,
                                            maxItems: 0,
                                            unique: false,
                                            batchId: batchId,
                                            batchLabel: batchLabel
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

    const toggleBatchInfinity = (headingId, subId, batchId, currentState, setter = setHeadings) => {
        setter((prev) =>
            prev.map((h) =>
                h.id === headingId
                    ? {
                        ...h,
                        subHeadings: h.subHeadings.map((sh) =>
                            sh.id === subId
                                ? {
                                    ...sh,
                                    fields: sh.fields.map((f) =>
                                        f.batchId === batchId
                                            ? { ...f, batchInfinity: !currentState }
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

    const addField = (headingId, subId, setter = setHeadings) => {
        setter((prev) =>
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
                                            infinity: false,
                                            maxItems: 0,
                                            unique: false,
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

    const updateFieldInline = (headingId, subId, fieldId, key, value, setter = setHeadings) => {
        setter((prev) =>
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

    const updateFieldLink = (headingId, subId, fieldId, linkedPageId, setter = setHeadings) => {
        setter((prev) =>
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

    const deleteField = (headingId, subId, fieldId, setter = setHeadings) => {
        setter((prev) =>
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
    const addHeading = (setter = setHeadings) => {
        setter((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: '',
                subHeadings: [{ id: Date.now() + 1, title: '', fields: [] }],
            },
        ]);
    };

    const updateHeadingTitle = (headingId, title, setter = setHeadings) => {
        setter((prev) =>
            prev.map((h) => (h.id === headingId ? { ...h, title } : h))
        );
    };

    const deleteHeading = (headingId, setter = setHeadings) => {
        setter((prev) => {
            if (prev.length <= 1 && setter === setHeadings) return prev; // Keep at least one for main structure
            return prev.filter((h) => h.id !== headingId);
        });
    };

    const getAvailableFields = (pid) => {
        const p = allPages.find(page => page.id === Number(pid));
        if (!p) return [];
        const fields = [];
        (p.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => { fields.push(f); });
            });
        });
        return fields;
    };

    const handleAddLink = () => {
        if (!linkSourcePageId) return;
        const sourcePage = allPages.find(p => p.id === Number(linkSourcePageId));
        if (!sourcePage) return;
        const fieldName = linkFieldName || 'name';
        const finalLabel = customLabel.trim() || fieldName;

        // Add link history via Context
        addPageLinks([{
            sourcePageId: sourcePage.id,
            targetPageId: Number(pageId),
            linkName: finalLabel,
            groupName: groupName.trim(),
            sourceFieldName: fieldName
        }]);

        // Manually add field to local headings so it shows up immediately
        setHeadings(prev => {
            const next = JSON.parse(JSON.stringify(prev));
            if (next.length === 0) {
                next.push({ id: Date.now(), title: 'Linked Data', subHeadings: [] });
            }
            const mainHeading = next[0];
            let targetSubHeading;
            if (groupName.trim()) {
                targetSubHeading = mainHeading.subHeadings.find(sh => sh.title === groupName.trim());
                if (!targetSubHeading) {
                    targetSubHeading = { id: Date.now() + Math.random(), title: groupName.trim(), fields: [] };
                    mainHeading.subHeadings.push(targetSubHeading);
                }
            } else {
                if (mainHeading.subHeadings.length === 0) {
                    mainHeading.subHeadings.push({ id: Date.now() + Math.random(), title: '', fields: [] });
                }
                targetSubHeading = mainHeading.subHeadings[0];
            }

            targetSubHeading.fields.push({
                id: Date.now() + Math.random(),
                label: finalLabel,
                valueType: 'Link',
                linkedPageId: Number(linkSourcePageId),
                displayFieldName: fieldName,
                required: false,
                infinity: false
            });
            return next;
        });

        // Reset form
        setLinkSourcePageId('');
        setLinkFieldName('');
        setCustomLabel('');
        setGroupName('');
        alert('Link added and field created!');
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
            staticSeoHeadings,
            dynamicSeoHeadings,
            staticSeoTimestamp,
            superAdminEnabled,
            linkingEnabled
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
        const targetSetter = activeSetter || setHeadings;
        targetSetter((prev) =>
            prev.map((h) => ({
                ...h,
                subHeadings: h.subHeadings.map((sh) => ({
                    ...sh,
                    fields: sh.fields.map((f) => (f.id === updatedField.id ? updatedField : f)),
                })),
            }))
        );
        setEditingField(null);
        setActiveSetter(null);
    };

    const getLinkedPageName = (linkedPageId) => {
        const p = allPages.find((pg) => pg.id === linkedPageId);
        return p ? p.name : '';
    };

    const renderDynamicStructure = (structureHeadings, setter, sectionLabel, startIndex = 0, showAddSection = false) => {
        return (
            <div className="dynamic-structure-editor">
                {structureHeadings.map((heading, hIndex) => (
                    <div key={heading.id} className="heading-block">
                        <div className="heading-input-wrapper">
                            <div className="heading-top-row">
                                <div className="heading-label">
                                    {sectionLabel} - Heading {startIndex + hIndex + 1} <span className="required">*</span>
                                </div>
                                <button
                                    className="btn btn-danger-text btn-sm"
                                    onClick={() => deleteHeading(heading.id, setter)}
                                    style={{ fontSize: 12, padding: '4px 8px' }}
                                >
                                    ✕ Remove
                                </button>
                            </div>
                            <input
                                className="heading-input"
                                value={heading.title}
                                onChange={(e) => updateHeadingTitle(heading.id, e.target.value, setter)}
                                placeholder="Section heading title"
                            />
                        </div>

                        <div className="subheadings-container">
                            {heading.subHeadings.map((sub, sIndex) => (
                                <div key={sub.id} className="subheading-block animate-slide-down">
                                    <div className="subheading-header">
                                        <div className="subheading-input-wrapper">
                                            <div className="subheading-label">
                                                Sub Heading {sIndex + 1}
                                                <button
                                                    className="btn btn-danger-text btn-sm"
                                                    onClick={() => deleteSubHeading(heading.id, sub.id, setter)}
                                                    style={{ fontSize: 11, padding: '2px 6px', marginLeft: 8 }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <input
                                                className="subheading-input"
                                                value={sub.title}
                                                onChange={(e) => updateSubHeadingTitle(heading.id, sub.id, e.target.value, setter)}
                                                placeholder="Sub heading title"
                                            />
                                        </div>
                                    </div>

                                    <div className="fields-section">
                                        <div className="fields-header">
                                            <div>
                                                <h3>Fields</h3>
                                                <p>Configure fields for this subsection</p>
                                            </div>
                                            <div className="fields-header-actions" style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    style={{ border: '1.5px solid var(--border)', color: 'var(--text-secondary)' }}
                                                    onClick={() => setIsRulesModalOpen(true)}
                                                >
                                                    Rule
                                                </button>
                                                <button className="btn btn-accent btn-sm" onClick={() => addField(heading.id, sub.id, setter)}>
                                                    + Add New Field
                                                </button>
                                            </div>
                                        </div>

                                        {sub.fields.length > 0 && (
                                            <div className="edit-fields-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                <div className="fields-table-header" style={{ gridTemplateColumns: 'minmax(140px, 1.2fr) minmax(250px, 2.5fr) 50px 60px 50px 55px 50px', marginBottom: '-8px' }}>
                                                    <span>Label</span>
                                                    <span>Value Type *</span>
                                                    <span style={{ textAlign: 'center' }}>Required</span>
                                                    <span style={{ textAlign: 'center' }}>  Infinite</span>
                                                    <span style={{ textAlign: 'center' }}>Max</span>
                                                    <span style={{ textAlign: 'center' }}>Unique</span>
                                                    <span style={{ textAlign: 'center' }}>Delete</span>
                                                </div>
                                                {(() => {
                                                    const groupedFields = [];
                                                    let currentGroup = null;

                                                    sub.fields.forEach((field) => {
                                                        const fieldElement = (
                                                            <div key={field.id} className="field-row" style={{ gridTemplateColumns: 'minmax(140px, 1.2fr) minmax(250px, 2.5fr) 50px 60px 50px 55px 50px' }}>
                                                                <div className="field-label-cell">
                                                                    <input
                                                                        className="field-label-input"
                                                                        value={field.label}
                                                                        onChange={(e) =>
                                                                            updateFieldInline(heading.id, sub.id, field.id, 'label', e.target.value, setter)
                                                                        }
                                                                        placeholder="Field name"
                                                                    />
                                                                </div>
                                                                <div className="pill-group-wrapper">
                                                                    <div className="pill-group">
                                                                        {(() => {
                                                                            const textRelatedTypes = ['Text', 'Number', 'limit', 'Slug', 'Permalink'];
                                                                            const isTextRelated = textRelatedTypes.includes(field.valueType);
                                                                            const otherTypes = ['Link', 'Rich Editor', 'Image', 'Grid'];

                                                                            return (
                                                                                <>
                                                                                    <button
                                                                                        type="button"
                                                                                        className={`pill ${isTextRelated ? 'active' : ''}`}
                                                                                        onClick={() => {
                                                                                            if (!isTextRelated) {
                                                                                                updateFieldInline(heading.id, sub.id, field.id, 'valueType', 'Text', setter);
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        Text Fields
                                                                                    </button>
                                                                                    {otherTypes.map((type) => (
                                                                                        <button
                                                                                            key={type}
                                                                                            type="button"
                                                                                            className={`pill ${field.valueType === type ? getValueTypeClass(type) : ''}`}
                                                                                            onClick={() => {
                                                                                                if (type === 'Link') {
                                                                                                    updateFieldLink(heading.id, sub.id, field.id, null, setter);
                                                                                                } else {
                                                                                                    updateFieldInline(heading.id, sub.id, field.id, 'valueType', type, setter);
                                                                                                    updateFieldInline(heading.id, sub.id, field.id, 'linkedPageId', null, setter);
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            {type === 'Link' ? '🔗 Link' : type}
                                                                                        </button>
                                                                                    ))}
                                                                                </>
                                                                            );
                                                                        })()}
                                                                    </div>

                                                                    {['Text', 'Number', 'limit', 'Slug', 'Permalink'].includes(field.valueType) && (
                                                                        <div className="sub-pill-group" style={{ marginTop: '8px', display: 'flex', gap: '4px', padding: '4px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                                                                            {['Text', 'Number', 'limit', 'Slug', 'Permalink'].map((subType) => (
                                                                                <button
                                                                                    key={subType}
                                                                                    type="button"
                                                                                    className={`pill pill-sm ${field.valueType === subType ? getValueTypeClass(subType) : ''}`}
                                                                                    style={{ fontSize: '11px', padding: '2px 8px' }}
                                                                                    onClick={() => updateFieldInline(heading.id, sub.id, field.id, 'valueType', subType, setter)}
                                                                                >
                                                                                    {subType}
                                                                                </button>
                                                                            ))}

                                                                            {field.valueType === 'limit' && (
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
                                                                                    <span style={{ fontSize: '10px', fontWeight: '600' }}>Limit:</span>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="field-label-input"
                                                                                        style={{ width: '45px', height: '22px', fontSize: '11px', padding: '2px 4px' }}
                                                                                        placeholder="Chars"
                                                                                        value={field.maxChars || ''}
                                                                                        onChange={(e) => updateFieldInline(heading.id, sub.id, field.id, 'maxChars', Number(e.target.value) || 0, setter)}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {field.valueType === 'Link' && (
                                                                        <div className="link-page-selector">
                                                                            <select
                                                                                className="link-page-select"
                                                                                value={field.linkedPageId || ''}
                                                                                onChange={(e) =>
                                                                                    updateFieldLink(heading.id, sub.id, field.id, e.target.value, setter)
                                                                                }
                                                                            >
                                                                                <option value="">Select page...</option>
                                                                                {otherPages.map((p) => (
                                                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    )}
                                                                    {field.valueType === 'Slug' && (
                                                                        <div className="link-page-selector" title="Slug Source">
                                                                            <select
                                                                                className="link-page-select"
                                                                                value={field.slugSourceFieldId || ''}
                                                                                onChange={(e) =>
                                                                                    updateFieldInline(heading.id, sub.id, field.id, 'slugSourceFieldId', e.target.value, setter)
                                                                                }
                                                                            >
                                                                                <option value="">Select source...</option>
                                                                                {[...headings, ...staticSeoHeadings, ...dynamicSeoHeadings].flatMap(h => h.subHeadings?.flatMap(sh => sh.fields?.filter(f => f.id !== field.id).map(f => (
                                                                                    <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                                                                )) || []) || [])}
                                                                            </select>
                                                                        </div>
                                                                    )}
                                                                    {field.valueType === 'Permalink' && (
                                                                        <div className="link-page-selector" title="Permalink Source">
                                                                            <select
                                                                                className="link-page-select"
                                                                                style={{ borderColor: '#00695c', color: '#00695c' }}
                                                                                value={field.permalinkSourceFieldId || ''}
                                                                                onChange={(e) =>
                                                                                    updateFieldInline(heading.id, sub.id, field.id, 'permalinkSourceFieldId', e.target.value, setter)
                                                                                }
                                                                            >
                                                                                <option value="">Select source...</option>
                                                                                {[...headings, ...staticSeoHeadings, ...dynamicSeoHeadings].flatMap(h => h.subHeadings?.flatMap(sh => sh.fields?.filter(f => f.id !== field.id).map(f => (
                                                                                    <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                                                                )) || []) || [])}
                                                                            </select>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="field-checkbox-cell" style={{ display: 'flex', justifyContent: 'center' }}>
                                                                    <button
                                                                        className={`pill pill-sm ${field.required ? 'active' : ''}`}
                                                                        style={{ fontSize: '10px', padding: '2px 8px', minWidth: '40px' }}
                                                                        onClick={() => updateFieldInline(heading.id, sub.id, field.id, 'required', !field.required, setter)}
                                                                    >
                                                                        {field.required ? 'ON' : 'OFF'}
                                                                    </button>
                                                                </div>
                                                                <div className="field-checkbox-cell" style={{ display: 'flex', justifyContent: 'center' }}>
                                                                    <button
                                                                        className={`pill pill-sm ${field.infinity ? 'active' : ''}`}
                                                                        style={{ fontSize: '10px', padding: '2px 8px', minWidth: '40px' }}
                                                                        onClick={() => updateFieldInline(heading.id, sub.id, field.id, 'infinity', !field.infinity, setter)}
                                                                    >
                                                                        {field.infinity ? 'ON' : 'OFF'}
                                                                    </button>
                                                                </div>
                                                                <div className="field-value-cell" style={{ textAlign: 'center' }}>
                                                                    <input
                                                                        type="number"
                                                                        className="field-label-input"
                                                                        style={{ width: '50px', textAlign: 'center', height: '30px' }}
                                                                        value={field.maxItems ?? 0}
                                                                        onChange={(e) => updateFieldInline(heading.id, sub.id, field.id, 'maxItems', Number(e.target.value) || 0, setter)}
                                                                    />
                                                                </div>
                                                                <div className="field-checkbox-cell" style={{ display: 'flex', justifyContent: 'center' }}>
                                                                    <button
                                                                        className={`pill pill-sm ${field.unique ? 'active' : ''}`}
                                                                        style={{ fontSize: '10px', padding: '2px 8px', minWidth: '40px' }}
                                                                        title="Unique - prevent duplicate values"
                                                                        onClick={() => updateFieldInline(heading.id, sub.id, field.id, 'unique', !field.unique, setter)}
                                                                    >
                                                                        {field.unique ? 'ON' : 'OFF'}
                                                                    </button>
                                                                </div>
                                                                <div className="field-actions" style={{ display: 'flex', justifyContent: 'center' }}>
                                                                    <button className="btn btn-ghost btn-danger-text" style={{ padding: '4px 6px', fontSize: '14px' }} onClick={() => deleteField(heading.id, sub.id, field.id, setter)}>🗑</button>
                                                                </div>

                                                                {field.valueType === 'Grid' && (
                                                                    <div className="grid-config-container animate-fade-in" style={{ gridColumn: '1 / -1', padding: '16px', background: '#f8fafc', borderRadius: 12, marginTop: 12, border: '1px solid var(--border)' }}>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                                                            <h4 style={{ fontSize: 13, fontWeight: 700 }}>Grid Configuration ({field.gridCols?.length || 0} Columns)</h4>
                                                                            <div>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-ghost btn-sm"
                                                                                    style={{ color: 'var(--danger)', marginRight: 8 }}
                                                                                    onClick={() => {
                                                                                        const newCols = [...(field.gridCols || [])];
                                                                                        if (newCols.length > 0) {
                                                                                            newCols.pop();
                                                                                            updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols, setter);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    - Col
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-ghost btn-sm"
                                                                                    style={{ color: 'var(--accent)' }}
                                                                                    onClick={() => {
                                                                                        const newCols = [...(field.gridCols || [])];
                                                                                        newCols.push({ id: Date.now(), label: '', placeholder: '' });
                                                                                        updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols, setter);
                                                                                    }}
                                                                                >
                                                                                    + Col
                                                                                </button>
                                                                            </div>
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
                                                                                            newCols[cIdx] = { ...newCols[cIdx], label: e.target.value };
                                                                                            updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols, setter);
                                                                                        }}
                                                                                        placeholder="Column Label"
                                                                                        style={{ flex: 1 }}
                                                                                    />
                                                                                    <input
                                                                                        className="field-label-input"
                                                                                        value={col.placeholder}
                                                                                        onChange={(e) => {
                                                                                            const newCols = [...field.gridCols];
                                                                                            newCols[cIdx] = { ...newCols[cIdx], placeholder: e.target.value };
                                                                                            updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols, setter);
                                                                                        }}
                                                                                        placeholder="Placeholder"
                                                                                        style={{ flex: 1.5 }}
                                                                                    />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );

                                                        if (field.batchId) {
                                                            if (currentGroup && currentGroup.batchId === field.batchId) {
                                                                currentGroup.fields.push(fieldElement);
                                                                currentGroup.fieldObjs.push(field);
                                                            } else {
                                                                currentGroup = { batchId: field.batchId, label: field.batchLabel, fields: [fieldElement], fieldObjs: [field] };
                                                                groupedFields.push(currentGroup);
                                                            }
                                                        } else {
                                                            currentGroup = null;
                                                            groupedFields.push({ type: 'single', content: fieldElement });
                                                        }
                                                    });

                                                    return groupedFields.map((group, idx) => {
                                                        if (group.type === 'single') return group.content;
                                                        return (
                                                            <div key={`edit-group-${group.batchId}-${idx}`} className="edit-field-batch-group" style={{
                                                                background: '#f8fafc',
                                                                border: '1.5px solid var(--border)',
                                                                borderRadius: '12px',
                                                                padding: '16px',
                                                                marginBottom: '8px'
                                                            }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                            <span style={{ fontSize: '16px' }}>📦</span>
                                                                            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>{group.label || 'Linked Set'}</span>
                                                                        </div>
                                                                        
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px', padding: '2px 8px', background: '#f1f5f9', borderRadius: '20px' }}>
                                                                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)' }}>INFINITE</span>
                                                                            <button
                                                                                className={`pill pill-sm ${group.fieldObjs[0]?.batchInfinity ? 'active' : ''}`}
                                                                                style={{ fontSize: '9px', padding: '1px 6px', minWidth: '35px', height: '18px' }}
                                                                                onClick={() => toggleBatchInfinity(heading.id, sub.id, group.batchId, group.fieldObjs[0]?.batchInfinity, setter)}
                                                                            >
                                                                                {group.fieldObjs[0]?.batchInfinity ? 'ON' : 'OFF'}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        className="btn btn-ghost btn-sm"
                                                                        style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: '700' }}
                                                                        onClick={() => addFieldToBatch(heading.id, sub.id, group.batchId, group.label, setter)}
                                                                    >
                                                                        + Add Field to Group
                                                                    </button>
                                                                </div>
                                                                <div className="grid-rows-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                    {group.fields}
                                                                </div>
                                                            </div>
                                                        );
                                                    });
                                                })()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-outline btn-sm" style={{ marginTop: 16 }} onClick={() => addSubHeading(heading.id, setter)}>
                                + Add Sub Heading
                            </button>
                        </div>
                    </div>
                ))}
                {showAddSection && (
                    <button className="btn btn-primary" style={{ marginTop: 24, width: '100%' }} onClick={() => addHeading(setter)}>
                        + Add New section
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Header */}
            <div className="edit-page-header">
                <div className="edit-page-nav-left">
                    <button className="back-btn" onClick={() => router.push('/pages')}>
                        ←
                    </button>
                    <div className="breadcrumb">
                        <span style={{ fontWeight: 700 }}>Edit Page</span>
                        <span className="separator"> &gt; </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{page.name}</span>
                    </div>
                </div>
                <div className="edit-page-nav-right">
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


            {/* ── 5-toggle row ── */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>

                {/* Single Entry */}
                <div style={{
                    flex: '1 1 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '14px 16px', background: singleEntry ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                    border: `1.5px solid ${singleEntry ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px', transition: 'all 0.2s', gap: '10px'
                }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>Single Entry</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                            {singleEntry ? 'Settings page mode' : 'View Page Show Single Form'}
                        </div>
                    </div>
                    <label className="toggle" style={{ alignSelf: 'flex-start' }}>
                        <input type="checkbox" checked={singleEntry} onChange={(e) => setSingleEntry(e.target.checked)} />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                {/* Enable Search */}
                {!singleEntry && (
                    <div style={{
                        flex: '1 1 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        padding: '14px 16px', background: searchEnabled ? 'rgba(16,185,129,0.06)' : '#f8fafc',
                        border: `1.5px solid ${searchEnabled ? '#10b981' : 'var(--border)'}`,
                        borderRadius: '12px', transition: 'all 0.2s', gap: '10px'
                    }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>Enable Search</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                                Search bar in catalog list
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                            <label className="toggle" style={{ alignSelf: 'flex-start' }}>
                                <input type="checkbox" checked={searchEnabled} onChange={(e) => setSearchEnabled(e.target.checked)} />
                                <span className="toggle-slider" style={{ backgroundColor: searchEnabled ? '#10b981' : undefined }}></span>
                            </label>

                            {searchEnabled && (
                                <div style={{ flex: 1, animation: 'slideInRight 0.3s ease-out' }}>
                                    <select
                                        className="form-input"
                                        style={{ height: '32px', fontSize: '11px', padding: '0 8px', border: '1.2px solid #10b981' }}
                                        value={searchFieldId}
                                        onChange={(e) => setSearchFieldId(e.target.value)}
                                    >
                                        <option value="">-- All fields --</option>
                                        {[
                                            ...headings,
                                            ...(staticSeoEnabled ? staticSeoHeadings : []),
                                            ...(dynamicSeoEnabled ? dynamicSeoHeadings : [])
                                        ].flatMap(h => h.subHeadings?.flatMap(sh => sh.fields?.map(f => (
                                            <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                                        )) || []) || [])}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Super Admin */}
                <div style={{
                    flex: '1 1 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '14px 16px', background: superAdminEnabled ? 'rgba(59,130,246,0.06)' : '#f8fafc',
                    border: `1.5px solid ${superAdminEnabled ? '#3b82f6' : 'var(--border)'}`,
                    borderRadius: '12px', transition: 'all 0.2s', gap: '10px'
                }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>Super Admin</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                            Sidebar & product fields
                        </div>
                    </div>
                    <label className="toggle" style={{ alignSelf: 'flex-start' }}>
                        <input type="checkbox" checked={superAdminEnabled} onChange={(e) => setSuperAdminEnabled(e.target.checked)} />
                        <span className="toggle-slider" style={{ backgroundColor: superAdminEnabled ? '#3b82f6' : undefined }}></span>
                    </label>
                </div>

                {/* Static SEO */}
                <div style={{
                    flex: '1 1 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '14px 16px', background: staticSeoEnabled ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                    border: `1.5px solid ${staticSeoEnabled ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px', transition: 'all 0.2s', gap: '10px'
                }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>Static Page SEO Field</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                            Standard meta tags
                        </div>
                    </div>
                    <label className="toggle" style={{ alignSelf: 'flex-start' }}>
                        <input type="checkbox" checked={staticSeoEnabled} onChange={(e) => setStaticSeoEnabled(e.target.checked)} />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                {/* Dynamic SEO */}
                <div style={{
                    flex: '1 1 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '14px 16px', background: dynamicSeoEnabled ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                    border: `1.5px solid ${dynamicSeoEnabled ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px', transition: 'all 0.2s', gap: '10px'
                }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>Dynamic Page SEO Field</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                            Social media meta tags
                        </div>
                    </div>
                    <label className="toggle" style={{ alignSelf: 'flex-start' }}>
                        <input type="checkbox" checked={dynamicSeoEnabled} onChange={(e) => setDynamicSeoEnabled(e.target.checked)} />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                {/* Additional Linking */}
                <div style={{
                    flex: '1 1 160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '14px 16px', background: linkingEnabled ? 'rgba(59,130,246,0.06)' : '#f8fafc',
                    border: `1.5px solid ${linkingEnabled ? '#3b82f6' : 'var(--border)'}`,
                    borderRadius: '12px', transition: 'all 0.2s', gap: '10px'
                }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>Additional Linking</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                            Link from other pages
                        </div>
                    </div>
                    <label className="toggle" style={{ alignSelf: 'flex-start' }}>
                        <input type="checkbox" checked={linkingEnabled} onChange={(e) => setLinkingEnabled(e.target.checked)} />
                        <span className="toggle-slider" style={{ backgroundColor: linkingEnabled ? '#3b82f6' : undefined }}></span>
                    </label>
                </div>

            </div>

            {/* Body */}
            <div className="edit-page-body">
                {/* First Heading only */}
                {headings.length > 0 && renderDynamicStructure([headings[0]], setHeadings, 'Content', 0, false)}


                {/* Static SEO expanded panel */}
                {staticSeoEnabled && (
                    <div style={{
                        padding: '20px 24px', background: 'rgba(79,70,229,0.04)',
                        border: '1.5px solid var(--accent)', borderRadius: '12px', marginBottom: '24px'
                    }}>
                        <div className="seo-fields-container animate-slide-down">
                            {renderDynamicStructure(staticSeoHeadings, setStaticSeoHeadings, 'Static SEO')}
                        </div>
                        {staticSeoTimestamp && (
                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px', marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                                🕒 Last updated: <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{staticSeoTimestamp}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Dynamic SEO expanded panel */}
                {dynamicSeoEnabled && (
                    <div style={{
                        padding: '20px 24px', background: 'rgba(79,70,229,0.04)',
                        border: '1.5px solid var(--accent)', borderRadius: '12px', marginBottom: '24px'
                    }}>
                        <div className="seo-fields-container animate-slide-down">
                            {renderDynamicStructure(dynamicSeoHeadings, setDynamicSeoHeadings, 'Dynamic SEO')}
                        </div>
                    </div>
                )}

                {/* Additional Linking Panel */}
                {linkingEnabled && (
                    <div style={{
                        padding: '24px', background: 'rgba(59,130,246,0.04)',
                        border: '1.5px solid #3b82f6', borderRadius: '12px', marginBottom: '24px'
                    }}>
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>🔗 Additional Linking</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                Create fields that link to other pages. These will appear in your dynamic structure.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '12px' }}>Source Page</label>
                                <select className="form-input" value={linkSourcePageId} onChange={(e) => setLinkSourcePageId(e.target.value)}>
                                    <option value="">Select source page...</option>
                                    {otherPages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '12px' }}>Display Field</label>
                                <select className="form-input" value={linkFieldName} onChange={(e) => setLinkFieldName(e.target.value)} disabled={!linkSourcePageId}>
                                    <option value="">Select display field...</option>
                                    {getAvailableFields(linkSourcePageId).map(f => <option key={f.label} value={f.label}>{f.label}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '12px' }}>Custom Label</label>
                                <input type="text" className="form-input" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} placeholder="e.g. Related Product" disabled={!linkSourcePageId} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontSize: '12px' }}>Group Name (Optional)</label>
                                <input type="text" className="form-input" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="e.g. Specifications" disabled={!linkSourcePageId} />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-sm" onClick={handleAddLink} disabled={!linkSourcePageId}>
                            + Add Linking Field
                        </button>

                        {/* Existing Links List */}
                        {pageLinks.filter(l => l.targetPageId === Number(pageId)).length > 0 && (
                            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(59,130,246,0.1)', paddingTop: '16px' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Existing Relationships</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {pageLinks.filter(l => l.targetPageId === Number(pageId)).map(link => (
                                        <div key={link.id} style={{
                                            background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                                            padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                        }}>
                                            <div style={{ fontSize: '12px' }}>
                                                <span style={{ fontWeight: 600 }}>{link.linkName}</span>
                                                <span style={{ color: 'var(--text-secondary)', marginLeft: '6px' }}>
                                                    ({allPages.find(p => p.id === link.sourcePageId)?.name || 'Deleted'})
                                                </span>
                                            </div>
                                            <button
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: '14px', padding: '0 4px' }}
                                                onClick={() => {
                                                    if (confirm('Delete this relationship? This will remove the field from your page structure.')) {
                                                        deletePageLink(link.id);
                                                        // Also remove from local headings
                                                        setHeadings(prev => {
                                                            const next = JSON.parse(JSON.stringify(prev));
                                                            return next.map(h => ({
                                                                ...h,
                                                                subHeadings: h.subHeadings.map(sh => ({
                                                                    ...sh,
                                                                    fields: sh.fields.filter(f => f.label !== link.linkName)
                                                                }))
                                                            }));
                                                        });
                                                    }
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Rest of Headings (or just the button if empty) */}
                {renderDynamicStructure(headings.slice(1), setHeadings, 'Content', 1, true)}

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
            {/* Rules Modal */}
            {isRulesModalOpen && (
                <div className="modal-overlay animate-fade-in" style={{ zIndex: 9999 }}>
                    <div className="modal-content" style={{ maxWidth: '800px', width: '90%', padding: '0', overflow: 'hidden', borderRadius: '16px' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--accent)' }}>System Features & Rules</h2>
                            <button className="btn btn-ghost" onClick={() => setIsRulesModalOpen(false)} style={{ fontSize: '20px' }}>✕</button>
                        </div>

                        <div style={{ padding: '32px', maxHeight: '70vh', overflowY: 'auto' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

                                <section>
                                    <h3 style={{ fontSize: '16px', marginBottom: '16px', borderLeft: '4px solid var(--accent)', paddingLeft: '12px' }}>Field Types</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>Text Fields</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Standard inputs. Includes <strong>Slug</strong> (URL handle) and <strong>Permalink</strong> (Full SEO path).</p>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>Link</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Connects to another page. Allows searching and selecting entries from other collections.</p>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>Rich Editor</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>A full WYSIWYG editor for formatted content (Bold, Italic, Lists, etc.).</p>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>Grid</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Multi-column input. Perfect for tables or grouped data (e.g., Specs: Label + Value).</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: '16px', marginBottom: '16px', borderLeft: '4px solid #10b981', paddingLeft: '12px' }}>Field Toggles</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                                            <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>REQUIRED</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Forces the user to provide a value before saving the entry.</p>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                                            <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>INFINITE (Repeater)</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Allows the user to add multiple values for this field (e.g., list of features).</p>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                                            <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>UNIQUE</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Prevents duplicate values across different entries in this page.</p>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                                            <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>MAX</strong>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Sets a character limit. UI will show a counter for these fields.</p>
                                        </div>
                                    </div>
                                </section>

                            </div>

                            <div style={{ marginTop: '32px', padding: '20px', background: 'var(--accent)', borderRadius: '12px', color: 'white' }}>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px' }}>Pro Tip: SEO Configuration</h4>
                                <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                                    Use the <strong>Static SEO</strong> and <strong>Dynamic SEO</strong> toggles at the top of the page to automatically add Meta Tag fields to your sections.
                                    Link your Slugs and Permalinks for automated URL management.
                                </p>
                            </div>
                        </div>

                        <div style={{ padding: '20px 32px', background: '#f8fafc', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
                            <button className="btn btn-accent" onClick={() => setIsRulesModalOpen(false)}>Got it!</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
