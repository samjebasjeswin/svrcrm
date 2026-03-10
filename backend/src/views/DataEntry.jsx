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
    const { getPage, addEntry, updateEntry, deleteEntry, getPageEntries, getLinkedEntryDisplayValue, getInboundLinks, user } = useApp();
    const isNew = !entryId || entryId === 'new';

    const page = getPage(pageId);
    const lowerName = page?.name?.toLowerCase()?.trim() || '';
    const isSettingsPage = page?.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';

    const [formData, setFormData] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);
    const [repeaterRows, setRepeaterRows] = useState({}); // { [fieldKey]: [rowId1, rowId2, ...] }
    const [searchQuery, setSearchQuery] = useState('');
    const [viewEntryData, setViewEntryData] = useState(null);

    // Load entry for editing
    useEffect(() => {
        if (!isNew && page) {
            const entries = getPageEntries(pageId);
            const entry = entries.find(e => e.id === Number(entryId));
            if (entry) {
                setFormData(entry.data);

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

                // Also ensure fields with maxItems have at least that many rows initialized
                page.headings?.forEach(h => h.subHeadings?.forEach(sh => sh.fields?.forEach(f => {
                    if (f.maxItems > 0) {
                        const fieldKey = getFieldKey(h.id, sh.id, f.id);
                        if (!initialRepeaters[fieldKey] || initialRepeaters[fieldKey].length < f.maxItems) {
                            const currentRows = initialRepeaters[fieldKey] || [];
                            const needed = f.maxItems - currentRows.length;
                            for (let i = 0; i < needed; i++) {
                                const nextId = currentRows.length > 0 ? Math.max(...currentRows) + 1 : i;
                                currentRows.push(nextId);
                            }
                            initialRepeaters[fieldKey] = currentRows;
                        }
                    }
                })));

                setRepeaterRows(initialRepeaters);
            }
        } else if (isNew && page) {
            // Pre-initialize rows for new entries if maxItems > 0
            const initialRepeaters = {};
            page.headings?.forEach(h => h.subHeadings?.forEach(sh => sh.fields?.forEach(f => {
                if (f.maxItems > 0) {
                    const fieldKey = getFieldKey(h.id, sh.id, f.id);
                    initialRepeaters[fieldKey] = Array.from({ length: f.maxItems }, (_, i) => i);
                }
            })));
            setRepeaterRows(initialRepeaters);
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

            // Helper to get all fields from all enabled sections
            const getAllAvailableHeadings = () => [
                ...(page.headings || []),
                ...(page.staticSeoEnabled ? (page.staticSeoHeadings || []) : []),
                ...(page.dynamicSeoEnabled ? (page.dynamicSeoHeadings || []) : [])
            ];

            const allActiveHeadings = getAllAvailableHeadings();

            // Find current field to check if it's a Permalink or Slug
            let currentField = null;
            allActiveHeadings.forEach(h => h.subHeadings?.forEach(sh => sh.fields?.forEach(f => {
                if (String(f.id).trim() === String(fieldId).trim()) currentField = f;
            })));

            // Bi-directional logic: If Permalink is edited, update its Slug source
            if (currentField?.valueType === 'Permalink' && currentField.permalinkSourceFieldId) {
                const slugSourceFieldId = currentField.permalinkSourceFieldId;
                // We need to find the heading and subHeading of the slugSourceFieldId
                let sourceHeadingId = null;
                let sourceSubId = null;
                allActiveHeadings.forEach(h => h.subHeadings?.forEach(sh => sh.fields?.forEach(f => {
                    if (String(f.id).trim() === String(slugSourceFieldId).trim()) {
                        sourceHeadingId = h.id;
                        sourceSubId = sh.id;
                    }
                })));

                if (sourceHeadingId && sourceSubId) {
                    const slugKey = rowIdx !== null
                        ? `${getFieldKey(sourceHeadingId, sourceSubId, slugSourceFieldId)}_row${rowIdx}`
                        : getFieldKey(sourceHeadingId, sourceSubId, slugSourceFieldId);
                    newData[slugKey] = formatAsSlug(value);
                }
            }

            // Forward logic: If Name/Any is edited, update Slugs/Permalinks that link to it
            allActiveHeadings.forEach(h => {
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
                                allActiveHeadings.forEach(h2 => {
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

    const addRepeaterRow = (fieldKey, maxItems = 0) => {
        setRepeaterRows(prev => {
            const currentRows = prev[fieldKey] || [0];
            if (maxItems > 0 && currentRows.length >= maxItems) return prev;
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

            const selectedEntry = linkedEntries.find(e => String(e.id) === String(value));
            const selectedDisplay = selectedEntry ? getLinkedEntryDisplayValue(field.linkedPageId, selectedEntry.id, field.displayFieldName) : '';

            return (
                <div className="data-entry-field-input-wrapper" style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                    <div style={{ flex: 1, position: 'relative', zIndex: value ? 1 : 0 }}>
                        <div
                            className="data-entry-input data-entry-select"
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            onClick={(e) => {
                                const dropdown = e.currentTarget.nextElementSibling;
                                const parentWrapper = e.currentTarget.closest('.data-entry-field-input-wrapper');
                                const section = e.currentTarget.closest('.data-entry-section');
                                if (dropdown) {
                                    const isOpening = dropdown.style.display === 'none';
                                    dropdown.style.display = isOpening ? 'block' : 'none';
                                    if (parentWrapper) parentWrapper.style.zIndex = isOpening ? '1000' : '1';
                                    if (section) section.style.zIndex = isOpening ? '1000' : '1';
                                }
                            }}
                        >
                            <span style={{ color: value ? 'var(--text-primary)' : 'var(--text-soft)' }}>
                                {value ? selectedDisplay : `-- Select ${linkedPage?.name || 'item'} --`}
                            </span>
                            <span style={{ fontSize: '10px' }}>▼</span>
                        </div>
                        <div style={{
                            display: 'none', position: 'absolute', top: '100%', left: 0, right: 0,
                            background: 'white', border: '1.5px solid var(--border)', borderRadius: '8px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 1001, maxHeight: '250px',
                            overflow: 'hidden', marginTop: '4px'
                        }}>
                            <div style={{ padding: '8px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                                <input
                                    type="text"
                                    className="data-entry-input"
                                    style={{ fontSize: '12px', padding: '6px 10px', height: '32px' }}
                                    placeholder={`🔍 Search ${linkedPage?.name || 'entries'}...`}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const search = e.target.value.toLowerCase();
                                        const list = e.target.closest('div[style]').parentElement.querySelector('.link-search-list');
                                        if (list) {
                                            Array.from(list.children).forEach(item => {
                                                item.style.display = item.textContent.toLowerCase().includes(search) ? '' : 'none';
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="link-search-list" style={{ overflowY: 'auto', maxHeight: '200px' }}>
                                <div
                                    style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-soft)', borderBottom: '1px solid var(--border-light)' }}
                                    onClick={(e) => {
                                        handleChange(heading.id, sub.id, field.id, '', 0, rowIdx);
                                        const panel = e.currentTarget.closest('div[style*="position: absolute"]');
                                        if (panel) panel.style.display = 'none';
                                        const parentWrapper = e.currentTarget.closest('.data-entry-field-input-wrapper');
                                        if (parentWrapper) parentWrapper.style.zIndex = '1';
                                        const section = e.currentTarget.closest('.data-entry-section');
                                        if (section) section.style.zIndex = '1';
                                    }}
                                >
                                    -- Clear Selection --
                                </div>
                                {linkedEntries.map((entry) => {
                                    const displayVal = getLinkedEntryDisplayValue(field.linkedPageId, entry.id, field.displayFieldName);
                                    return (
                                        <div
                                            key={entry.id}
                                            style={{
                                                padding: '8px 12px', cursor: 'pointer', fontSize: '13px',
                                                background: String(entry.id) === String(value) ? 'rgba(79,70,229,0.08)' : 'transparent',
                                                fontWeight: String(entry.id) === String(value) ? '600' : '400',
                                                borderBottom: '1px solid #f1f5f9'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(79,70,229,0.06)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = String(entry.id) === String(value) ? 'rgba(79,70,229,0.08)' : 'transparent'}
                                            onClick={(e) => {
                                                handleChange(heading.id, sub.id, field.id, String(entry.id), 0, rowIdx);
                                                const panel = e.currentTarget.closest('div[style*="position: absolute"]');
                                                if (panel) panel.style.display = 'none';
                                                const parentWrapper = e.currentTarget.closest('.data-entry-field-input-wrapper');
                                                if (parentWrapper) parentWrapper.style.zIndex = '1';
                                                const section = e.currentTarget.closest('.data-entry-section');
                                                if (section) section.style.zIndex = '1';
                                            }}
                                        >
                                            {displayVal}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
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
                        onChange={(val) => handleChange(heading.id, sub.id, field.id, val, 0, rowIdx)}
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
                const allAHeadings = [
                    ...(page.headings || []),
                    ...(page.staticSeoEnabled ? (page.staticSeoHeadings || []) : []),
                    ...(page.dynamicSeoEnabled ? (page.dynamicSeoHeadings || []) : [])
                ];
                const slugSourceField = allAHeadings.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields))
                    .find(f => String(f?.id).trim() === String(field.slugSourceFieldId).trim());
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
                const allAHeadingsPerm = [
                    ...(page.headings || []),
                    ...(page.staticSeoEnabled ? (page.staticSeoHeadings || []) : []),
                    ...(page.dynamicSeoEnabled ? (page.dynamicSeoHeadings || []) : [])
                ];
                const permSourceField = allAHeadingsPerm.flatMap(h => h.subHeadings?.flatMap(sh => sh.fields))
                    .find(f => String(f?.id).trim() === String(field.permalinkSourceFieldId).trim());
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
        // Collect all headings from all enabled sections for validation
        const sectionsToValidate = [
            ...(page.headings || []),
            ...(page.staticSeoEnabled ? (page.staticSeoHeadings || []) : []),
            ...(page.dynamicSeoEnabled ? (page.dynamicSeoHeadings || []) : [])
        ];

        // Validate required fields
        for (const heading of sectionsToValidate) {
            for (const sub of heading.subHeadings || []) {
                for (const field of sub.fields || []) {
                    const key = getFieldKey(heading.id, sub.id, field.id);

                    if (field.infinity) {
                        const rowIds = repeaterRows[key] || [0];
                        for (let i = 0; i < rowIds.length; i++) {
                            const rowKey = `${key}_row${i}`;
                            const val = formData[rowKey];
                            if (field.required && (!val || !val.toString().trim())) {
                                alert(`"${field.label}" (Row ${i + 1}) is required`);
                                return;
                            }
                        }
                    } else {
                        if (field.required && !formData[key]?.toString().trim()) {
                            alert(`"${field.label}" is required`);
                            return;
                        }
                    }
                }
            }
        }

        // Validate unique fields — prevent duplicate values
        const existingEntries = getPageEntries(pageId);
        for (const heading of sectionsToValidate) {
            for (const sub of heading.subHeadings || []) {
                for (const field of sub.fields || []) {
                    if (!field.unique) continue;
                    const key = getFieldKey(heading.id, sub.id, field.id);
                    const newValue = (formData[key] || '').toString().trim().toLowerCase();
                    if (!newValue) continue; // skip empty

                    const isDuplicate = existingEntries.some(entry => {
                        // Skip the current entry when editing
                        if (!isNew && entry.id === Number(entryId)) return false;
                        const existingVal = (entry.data?.[key] || '').toString().trim().toLowerCase();
                        return existingVal === newValue;
                    });

                    if (isDuplicate) {
                        alert(`"${field.label}" must be unique. The value "${formData[key]}" already exists.`);
                        return;
                    }
                }
            }
        }

        if (!isNew) {
            updateEntry(Number(pageId), Number(entryId), { ...formData });
            alert('Entry updated successfully!');
            setRefreshKey(k => k + 1);
        } else {
            addEntry(Number(pageId), { ...formData });
            alert('Entry saved successfully!');
            if (isSettingsPage) {
                setRefreshKey((k) => k + 1);
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
                {/* Body */}
                <div className="data-entry-body" key={refreshKey}>
                    {/* Render Dynamic Sections */}
                    {(() => {
                        const renderSection = (heading, sectionLabel = '') => (
                            <div key={heading.id} className="data-entry-section animate-fade-in-up" style={{ position: 'relative' }}>
                                <div className="data-entry-main-heading">
                                    <h2>
                                        {heading.title || 'Untitled Heading'}
                                        {sectionLabel && <span style={{ marginLeft: '12px', fontSize: '12px', verticalAlign: 'middle', padding: '2px 8px', borderRadius: '4px', background: 'rgba(79,70,229,0.1)', color: 'var(--accent)', fontWeight: 600 }}>{sectionLabel}</span>}
                                    </h2>
                                </div>

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

                                                        {(field.infinity || field.maxItems > 0) ? (
                                                            <div className="repeater-container">
                                                                {(repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [0]).map((rowId, idx) => (
                                                                    <div key={rowId} className="repeater-row animate-fade-in-up">
                                                                        <div className="repeater-row-content">
                                                                            {renderFieldInput(heading, sub, field, idx)}
                                                                        </div>
                                                                        {field.infinity && (
                                                                            <button
                                                                                className="repeater-delete-btn"
                                                                                onClick={() => removeRepeaterRow(getFieldKey(heading.id, sub.id, field.id), rowId)}
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                                {field.infinity && (
                                                                    <button
                                                                        className="repeater-add-btn"
                                                                        onClick={() => addRepeaterRow(getFieldKey(heading.id, sub.id, field.id), field.maxItems)}
                                                                        disabled={field.maxItems > 0 && (repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [0]).length >= field.maxItems}
                                                                        style={{ marginTop: '8px' }}
                                                                    >
                                                                        + Add {field.label || 'Row'}
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
                        );

                        return (
                            <>
                                {/* Main Content Sections */}
                                {(page.headings || []).map(h => renderSection(h))}

                                {/* Static SEO Sections */}
                                {page.staticSeoEnabled && (page.staticSeoHeadings || []).map(h => renderSection(h, 'Static SEO'))}

                                {/* Dynamic SEO Sections */}
                                {page.dynamicSeoEnabled && (page.dynamicSeoHeadings || []).map(h => renderSection(h, 'Dynamic SEO'))}
                            </>
                        );
                    })()}

                    {headings.length === 0 && !page.staticSeoEnabled && !page.dynamicSeoEnabled && (
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


            </div>

            {/* View Details Modal */}
            {viewEntryData && (
                <div className="modal-overlay animate-fade-in" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, backdropFilter: 'blur(10px)'
                }} onClick={() => setViewEntryData(null)}>
                    <div className="modal-content animate-scale-up" style={{
                        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px',
                        maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Entry Details</h3>
                            <button className="action-icon-btn" onClick={() => setViewEntryData(null)}>✕</button>
                        </div>
                        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                            {headings.map(h => (
                                <div key={h.id} style={{ marginBottom: '24px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '12px' }}>{h.title}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {h.subHeadings?.map(sh => (
                                            <div key={sh.id}>
                                                {sh.fields?.map(f => {
                                                    const key = getFieldKey(h.id, sh.id, f.id);
                                                    const val = viewEntryData.data?.[key];
                                                    return (
                                                        <div key={f.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '8px' }}>
                                                            <div style={{ fontSize: '13px', color: 'var(--text-soft)', fontWeight: '600' }}>{f.label}:</div>
                                                            <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '700' }}>{val || '—'}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button className="btn btn-primary btn-sm" onClick={() => setViewEntryData(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
