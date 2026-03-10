"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import CategoryDropdown from '../components/CategoryDropdown';
import RichTextEditor from '../components/RichTextEditor';
import ImageUpload from '../components/ImageUpload';

export default function DataEntry() {
    const { pageId, entryId } = useParams();
    const router = useRouter();
    const { getPage, addEntry, updateEntry, getPageEntries, getLinkedEntryDisplayValue, user } = useApp();
    const isNew = !entryId || entryId === 'new';

    const page = getPage(pageId);
    const lowerName = page?.name?.toLowerCase()?.trim() || '';
    const isSettingsPage = page?.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';

    const [formData, setFormData] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);
    const [repeaterRows, setRepeaterRows] = useState({}); // { [fieldKey]: [rowId1, rowId2, ...] }

    // Load entry for editing
    useEffect(() => {
        if (!isNew && page) {
            const entries = getPageEntries(pageId);
            const entry = entries.find(e => e.id === Number(entryId));
            if (entry) {
                setFormData(entry.data);

                // Initialize repeaterRows if entry has repeating data
                const initialRepeaters = {};
                Object.keys(entry.data).forEach(key => {
                    if (key.includes('_row')) {
                        const fieldKey = key.split('_row')[0];
                        const rowIdx = parseInt(key.split('_row')[1]);
                        if (!initialRepeaters[fieldKey]) initialRepeaters[fieldKey] = [];
                        if (!initialRepeaters[fieldKey].includes(rowIdx)) {
                            initialRepeaters[fieldKey].push(rowIdx);
                        }
                    }
                });
                setRepeaterRows(initialRepeaters);
            }
        }
    }, [entryId, pageId, isNew, page]);

    // Auto-redirect for single-entry pages if trying to create a new one but it already exists
    useEffect(() => {
        if (isSettingsPage && isNew && page) {
            const entries = getPageEntries(pageId);
            if (entries.length > 0) {
                router.replace(`/data-entry/${pageId}/${entries[0].id}`);
            }
        }
    }, [isSettingsPage, isNew, page, pageId, router, getPageEntries]);

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

    const headings = page.headings || [];

    const getFieldKey = (headingId, subId, fieldId) => `${headingId}_${subId}_${fieldId}`;

    const handleChange = (headingId, subId, fieldId, value, maxChars, rowIdx = null) => {
        if (maxChars > 0 && value.length > maxChars) return;
        const baseKey = getFieldKey(headingId, subId, fieldId);
        const finalKey = rowIdx !== null ? `${baseKey}_row${rowIdx}` : baseKey;

        setFormData((prev) => {
            const newData = { ...prev, [finalKey]: value };

            const formatAsSlug = (val) => String(val || '')
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');

            // Find current field to check if it's a Permalink or Slug
            let currentField = null;
            page?.headings?.forEach(h => h.subHeadings?.forEach(sh => sh.fields?.forEach(f => {
                if (String(f.id).trim() === String(fieldId).trim()) currentField = f;
            })));

            // Bi-directional logic: If Permalink is edited, update its Slug source
            if (currentField?.valueType === 'Permalink' && currentField.permalinkSourceFieldId) {
                const slugSourceFieldId = currentField.permalinkSourceFieldId;
                const slugKey = rowIdx !== null
                    ? `${getFieldKey(headingId, subId, slugSourceFieldId)}_row${rowIdx}`
                    : getFieldKey(headingId, subId, slugSourceFieldId);
                newData[slugKey] = formatAsSlug(value);
            }

            // Forward logic: If Name/Any is edited, update Slugs/Permalinks that link to it
            page?.headings?.forEach(h => {
                h.subHeadings?.forEach(sh => {
                    sh.fields?.forEach(f => {
                        const isSlugSource = f.valueType === 'Slug' && f.slugSourceFieldId && String(f.slugSourceFieldId).trim() === String(fieldId).trim();
                        const isPermalinkSource = f.valueType === 'Permalink' && f.permalinkSourceFieldId && String(f.permalinkSourceFieldId).trim() === String(fieldId).trim();

                        if (isSlugSource || isPermalinkSource) {
                            const targetKey = rowIdx !== null
                                ? `${getFieldKey(h.id, sh.id, f.id)}_row${rowIdx}`
                                : getFieldKey(h.id, sh.id, f.id);

                            const formattedValue = formatAsSlug(value);
                            newData[targetKey] = formattedValue;

                            // Chaining: If Slug is updated, also update any Permalink that links to IT
                            if (f.valueType === 'Slug') {
                                page?.headings?.forEach(h2 => {
                                    h2.subHeadings?.forEach(sh2 => {
                                        sh2.fields?.forEach(f2 => {
                                            if (f2.valueType === 'Permalink' && String(f2.permalinkSourceFieldId).trim() === String(f.id).trim()) {
                                                const subTargetKey = rowIdx !== null
                                                    ? `${getFieldKey(h2.id, sh2.id, f2.id)}_row${rowIdx}`
                                                    : getFieldKey(h2.id, sh2.id, f2.id);
                                                newData[subTargetKey] = formattedValue;
                                            }
                                        });
                                    });
                                });
                            }
                        }
                    });
                });
            });

            return newData;
        });
    };

    const getRowValue = (headingId, subId, fieldId, rowIdx = null) => {
        const baseKey = getFieldKey(headingId, subId, fieldId);
        const finalKey = rowIdx !== null ? `${baseKey}_row${rowIdx}` : baseKey;
        return formData[finalKey] || '';
    };

    const addRepeaterRow = (fieldKey) => {
        setRepeaterRows(prev => {
            const currentRows = prev[fieldKey] || [0]; // Start with row 0 if none
            const nextId = Math.max(...currentRows, -1) + 1;
            return { ...prev, [fieldKey]: [...currentRows, nextId] };
        });
    };

    const removeRepeaterRow = (fieldKey, rowId) => {
        setRepeaterRows(prev => {
            const currentRows = prev[fieldKey] || [0];
            if (currentRows.length <= 1) return prev; // Keep at least one row
            return { ...prev, [fieldKey]: currentRows.filter(id => id !== rowId) };
        });
    };

    const renderFieldInput = (heading, sub, field, rowIdx = null) => {
        const key = getFieldKey(heading.id, sub.id, field.id);
        const value = getRowValue(heading.id, sub.id, field.id, rowIdx);

        // Handle Link type — show dropdown of entries from linked page
        if (field.valueType === 'Link' && field.linkedPageId) {
            const linkedEntries = getPageEntries(field.linkedPageId);
            const linkedPage = getPage(field.linkedPageId);

            return (
                <div className="data-entry-field-input-wrapper" style={{ display: 'flex', gap: '8px' }}>
                    <select
                        className="data-entry-input data-entry-select"
                        style={{ flex: 1 }}
                        value={value}
                        onChange={(e) => handleChange(heading.id, sub.id, field.id, e.target.value, 0, rowIdx)}
                    >
                        <option value="">-- Select {linkedPage?.name || 'item'} --</option>
                        {linkedEntries.map((entry) => {
                            const displayVal = getLinkedEntryDisplayValue(field.linkedPageId, entry.id, field.displayFieldName);
                            return (
                                <option key={entry.id} value={entry.id}>
                                    {displayVal}
                                </option>
                            );
                        })}
                    </select>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '0 12px', fontSize: '18px', height: '42px', border: '1.5px dashed var(--accent)', color: 'var(--accent)' }}
                        onClick={() => handleAddSimpleLinkEntry(field)}
                        title={`Add new ${linkedPage?.name || 'entry'}`}
                    >
                        +
                    </button>
                    {linkedEntries.length === 0 && (
                        <div className="link-empty-hint">
                            No entries yet.{' '}
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => router.push(`/data-entry/${field.linkedPageId}`)}
                            >
                                Add {linkedPage?.name} entries →
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        const inputProps = {
            value,
            onChange: (e) => handleChange(heading.id, sub.id, field.id, e.target.value, field.maxChars, rowIdx),
            placeholder: `Enter ${field.label || 'value'}...`,
            className: 'data-entry-input',
        };

        switch (field.valueType) {
            case 'Number':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input {...inputProps} type="number" />
                        {field.maxChars > 0 && (
                            <span className="char-counter">{value.length}/{field.maxChars}</span>
                        )}
                    </div>
                );
            case 'Text':
                return (
                    <div className="data-entry-field-input-wrapper">
                        {field.maxChars > 120 ? (
                            <textarea {...inputProps} rows={3} className="data-entry-textarea" />
                        ) : (
                            <input {...inputProps} type="text" />
                        )}
                        {field.maxChars > 0 && (
                            <span className="char-counter">{value.length}/{field.maxChars}</span>
                        )}
                    </div>
                );
            case 'Symbol':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input {...inputProps} type="text" />
                    </div>
                );
            case 'Password':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input {...inputProps} type="password" />
                    </div>
                );
            case 'Number & Text':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input {...inputProps} type="text" placeholder={`Enter number & text for ${field.label}`} />
                        {field.maxChars > 0 && (
                            <span className="char-counter">{value.length}/{field.maxChars}</span>
                        )}
                    </div>
                );
            case 'Symbol & Text':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input {...inputProps} type="text" placeholder={`Enter symbol & text for ${field.label}`} />
                        {field.maxChars > 0 && (
                            <span className="char-counter">{value.length}/{field.maxChars}</span>
                        )}
                    </div>
                );
            case 'Rich Editor':
                return (
                    <RichTextEditor
                        value={value}
                        onChange={(val) => handleChange(heading.id, sub.id, field.id, val, field.maxChars, rowIdx)}
                        placeholder={field.label}
                    />
                );
            case '120 Char':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <textarea
                            {...inputProps}
                            rows={3}
                            className="data-entry-textarea"
                            maxLength={120}
                            placeholder={`Description (max 120 chars)...`}
                        />
                        <span className="char-counter">{value.length}/120</span>
                    </div>
                );
            case '160 Char':
                return (
                    <div className="data-entry-field-input-wrapper">
                        <textarea
                            {...inputProps}
                            rows={4}
                            className="data-entry-textarea"
                            maxLength={160}
                            placeholder={`Description (max 160 chars)...`}
                        />
                        <span className="char-counter">{value.length}/160</span>
                    </div>
                );
            case 'Image':
                return (
                    <ImageUpload
                        value={value}
                        onChange={(val) => handleChange(heading.id, sub.id, field.id, val, 0, rowIdx)}
                    />
                );
            case 'Slug':
                const slugSourceField = page.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields))
                    .find(f => String(f?.id) === String(field.slugSourceFieldId));
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input
                            {...inputProps}
                            type="text"
                            placeholder={slugSourceField ? `Auto-generated from ${slugSourceField.label}...` : `Slug for ${field.label}...`}
                            readOnly
                            style={{ background: '#f8fafc', cursor: 'not-allowed', color: 'var(--text-secondary)' }}
                        />
                        <div style={{ fontSize: '10px', color: 'var(--accent)', marginTop: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {slugSourceField ? `Linked to: ${slugSourceField.label}` : 'No source connected'}
                        </div>
                    </div>
                );
            case 'Permalink':
                const permSourceField = page.headings?.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields))
                    .find(f => String(f?.id) === String(field.permalinkSourceFieldId));
                return (
                    <div className="data-entry-field-input-wrapper">
                        <input
                            {...inputProps}
                            type="text"
                            placeholder={permSourceField ? `Auto-generated from ${permSourceField.label}...` : `Permalink for ${field.label}...`}
                            onChange={(e) => {
                                const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                                handleChange(heading.id, sub.id, field.id, val, field.maxChars, rowIdx);
                            }}
                        />
                        <div style={{ fontSize: '10px', color: '#00695c', marginTop: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {permSourceField ? `Linked to: ${permSourceField.label} (Editable)` : 'No source connected'}
                        </div>
                    </div>
                );
            case 'Grid':
                return (
                    <div className="data-entry-grid-wrapper">
                        <div className="data-entry-grid-container" style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${field.gridCols?.length || 1}, 1fr)`,
                            gap: '12px'
                        }}>
                            {(field.gridCols || []).map((col, cIdx) => {
                                const baseKey = getFieldKey(heading.id, sub.id, field.id);
                                const colKey = rowIdx !== null ? `${baseKey}_row${rowIdx}_col${cIdx}` : `${baseKey}_col${cIdx}`;
                                const colValue = formData[colKey] || '';
                                return (
                                    <div key={cIdx} className="grid-col-item">
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                                            {col.label}
                                        </div>
                                        <input
                                            className="data-entry-input"
                                            value={colValue}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, [colKey]: e.target.value }));
                                            }}
                                            placeholder={col.placeholder || `Enter ${col.label}...`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            default:
                return <input {...inputProps} type="text" />;
        }
    };

    const handleAddSimpleLinkEntry = (field) => {
        const linkedPage = getPage(field.linkedPageId);
        if (!linkedPage) return;

        const labelField = field.displayFieldName || 'Name';
        const newVal = window.prompt(`Enter new ${labelField} for ${linkedPage.name}:`);
        if (!newVal || !newVal.trim()) return;

        // Map label field to its content key
        let targetFieldKey = null;
        for (const heading of linkedPage.headings || []) {
            for (const sub of heading.subHeadings || []) {
                for (const f of sub.fields || []) {
                    if (f.label === labelField) {
                        targetFieldKey = getFieldKey(heading.id, sub.id, f.id);
                        break;
                    }
                }
            }
        }

        if (targetFieldKey) {
            addEntry(field.linkedPageId, { [targetFieldKey]: newVal.trim() });
            setRefreshKey(k => k + 1); // Refresh UI to show new entry in dropdown
        } else {
            // Fallback: if label field not found, try adding with a generic key if it's a simple page
            // But usually labelField should match one of the fields.
            alert(`Note: The field "${labelField}" was not found in ${linkedPage.name}. Adding as generic entry.`);
            addEntry(field.linkedPageId, { name: newVal.trim() });
            setRefreshKey(k => k + 1);
        }
    };

    const handleSave = () => {
        // Validate required fields
        for (const heading of headings) {
            for (const sub of heading.subHeadings || []) {
                for (const field of sub.fields || []) {
                    const key = getFieldKey(heading.id, sub.id, field.id);
                    if (field.required && !formData[key]?.toString().trim()) {
                        alert(`"${field.label}" is required`);
                        return;
                    }
                }
            }
        }

        if (!isNew) {
            updateEntry(Number(pageId), Number(entryId), { ...formData });
            alert('Entry updated successfully!');
            if (!isSettingsPage) router.push(`/data-entry/${pageId}`);
        } else {
            // Save to shared context
            const newEntry = addEntry(Number(pageId), { ...formData });
            setFormData({});
            setRefreshKey((k) => k + 1);
            alert('Entry saved successfully!');
            if (isSettingsPage) {
                router.push(`/data-entry/${pageId}/${newEntry.id}`);
            } else {
                router.push(`/data-entry/${pageId}`);
            }
        }
    };

    const handleClear = () => {
        setFormData({});
    };

    // Merge shared entries with local
    const allEntries = getPageEntries(Number(pageId));

    return (
        <>
            {/* Header */}
            <div className="data-entry-header">
                <div className="data-entry-header-left">
                    <button className="back-btn" onClick={() => router.push(isSettingsPage ? '/pages' : `/data-entry/${pageId}`)}>
                        ←
                    </button>
                    <div className="breadcrumb">
                        <span style={{ fontWeight: 700 }}>{page.name}</span>
                        <span className="separator">›</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            {isSettingsPage ? 'Manage' : (entryId === 'new' ? 'New Entry' : 'Edit Entry')}
                        </span>
                    </div>
                </div>
                <div className="data-entry-header-right">
                    {!isSettingsPage && (
                        <button className="btn btn-outline btn-sm" onClick={() => router.push(`/data-entry/${pageId}`)}>
                            Back to List
                        </button>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="data-entry-body" key={refreshKey}>
                {headings.map((heading) => (
                    <div key={heading.id} className="data-entry-section animate-fade-in-up">
                        {/* Main Heading */}
                        <div className="data-entry-main-heading">
                            <h2>{heading.title || 'Untitled Heading'}</h2>
                        </div>

                        {/* Sub-headings with their fields */}
                        {(heading.subHeadings || []).map((sub) => (
                            <div key={sub.id} className="data-entry-sub-section">
                                {sub.title && (
                                    <div className="data-entry-sub-heading">
                                        <h3>{sub.title}</h3>
                                    </div>
                                )}

                                <div className="data-entry-fields-grid">
                                    {(sub.fields || [])
                                        .filter(field => {
                                            const isProductField = ['Product Name', 'Quantity', 'Type'].includes(field.label);
                                            const isAdmin = user?.role === 'Super Admin' || user?.role === 'System Admin';
                                            if (isAdmin && page.superAdminEnabled === false && isProductField) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .map((field) => (
                                            <div
                                                key={field.id}
                                                className={`data-entry-field-group ${field.maxChars > 120 ? 'span-full' : ''}`}
                                            >
                                                <label className="data-entry-label">
                                                    {field.label || 'Untitled Field'}
                                                    {field.required && <span className="required">*</span>}
                                                    <span className={`data-entry-type-badge ${field.valueType === 'Link' ? 'badge-link' : ''}`}>
                                                        {field.valueType === 'Link' ? `🔗 ${getPage(field.linkedPageId)?.name || 'Link'}` : field.valueType}
                                                    </span>
                                                    {field.infinity && (
                                                        <span className="badge-infinity">∞ Infinity</span>
                                                    )}
                                                </label>

                                                {field.infinity ? (
                                                    <div className="repeater-container">
                                                        {(repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [0]).map((rowId, idx) => (
                                                            <div key={rowId} className="repeater-row animate-fade-in-up">
                                                                <div className="repeater-row-content">
                                                                    {renderFieldInput(heading, sub, field, idx)}
                                                                </div>
                                                                <button
                                                                    className="repeater-delete-btn"
                                                                    onClick={() => removeRepeaterRow(getFieldKey(heading.id, sub.id, field.id), rowId)}
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {(!field.maxItems || (repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [0]).length < Number(field.maxItems)) && (
                                                            <button
                                                                className="btn btn-primary btn-sm repeater-add-btn"
                                                                onClick={() => addRepeaterRow(getFieldKey(heading.id, sub.id, field.id))}
                                                            >
                                                                + Add
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    renderFieldInput(heading, sub, field)
                                                )}
                                            </div>
                                        ))}
                                </div>


                            </div>
                        ))}
                    </div>
                ))}

                {headings.length === 0 && (
                    <div className="data-entry-empty-page">
                        <h3>No structure configured</h3>
                        <p>Go to Edit Page to set up headings and fields first.</p>
                        <button className="btn btn-primary" onClick={() => router.push(`/edit-page/${pageId}`)}>
                            Edit Page Structure
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="data-entry-footer">
                    <button className="btn btn-outline" onClick={handleClear}>
                        Clear
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        💾 {isSettingsPage ? 'Save Changes' : (!isNew ? 'Update Entry' : 'Save Entry')}
                    </button>
                </div>
            </div>
        </>
    );
}
