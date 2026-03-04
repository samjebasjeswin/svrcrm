"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function MappedDataView() {
    const { mappingId } = useParams();
    const router = useRouter();
    const { fieldMappings, getPageEntries, getPage, updateFieldMapping } = useApp();

    const mapping = fieldMappings.find(m => m.id === Number(mappingId));
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [tempLabel, setTempLabel] = useState('');

    useEffect(() => {
        if (mapping) {
            setTempLabel(mapping.label || mapping.targetPageName);
        }
    }, [mapping]);

    if (!mapping) {
        return (
            <div className="page-center">
                <div style={{ textAlign: 'center' }}>
                    <h2>Mapping not found</h2>
                    <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => router.push('/pages')}>
                        Back to Pages
                    </button>
                </div>
            </div>
        );
    }

    const targetPage = getPage(mapping.targetPageId);
    const rawEntries = getPageEntries(mapping.targetPageId);
    const selectedIds = mapping.selectedIds || [];

    // Filter entries based on selection
    const entries = rawEntries.filter(e => selectedIds.includes(e.id));

    // Find the field key based on the field ID
    const getFieldKeyForId = (page, fieldId) => {
        let fieldKey = null;
        if (!page) return null;
        (page.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    if (f.id === Number(fieldId)) {
                        fieldKey = `${h.id}_${sh.id}_${f.id}`;
                    }
                });
            });
        });
        return fieldKey;
    };

    const fieldKey = getFieldKeyForId(targetPage, mapping.targetFieldId);

    const renderTree = (parentId = null) => {
        const hierarchy = mapping.hierarchy || {};

        return entries
            .filter(entry => {
                const nodeHierarchy = hierarchy[entry.id];
                const pId = nodeHierarchy?.parentId || null;

                // If parent is not in visible selection, treat as root for this view
                const effectiveParentId = (pId && !selectedIds.includes(Number(pId))) ? null : pId;

                const normalizeId = (id) => (id === '' || id === undefined ? null : Number(id));
                return normalizeId(effectiveParentId) === normalizeId(parentId);
            })
            .map(entry => {
                const h = hierarchy[entry.id] || {};
                const displayValue = entry.data[fieldKey] || `Entry #${entry.id}`;

                return (
                    <div key={entry.id} className="tree-node">
                        <div className="tree-node-content">
                            <span className="node-icon">📄</span>
                            <span className={`node-name ${h.role === 'primary' ? 'role-primary' : ''} ${h.role === 'leaf' ? 'role-leaf' : ''}`}>
                                {displayValue}
                                {h.role && h.role !== 'none' && (
                                    <span className="node-role">({h.role})</span>
                                )}
                            </span>
                        </div>
                        <div className="tree-children" style={{ marginLeft: '24px', borderLeft: '1px solid #cbd5e1', paddingLeft: '12px' }}>
                            {renderTree(entry.id)}
                        </div>
                    </div>
                );
            });
    };

    const hasHierarchy = mapping.hierarchy && Object.keys(mapping.hierarchy).length > 0;

    const handleLabelSave = () => {
        if (!tempLabel.trim()) return;
        updateFieldMapping(mapping.id, { label: tempLabel.trim() });
        setIsEditingLabel(false);
    };

    return (
        <div className="mapped-view animate-fade-in-up" style={{ padding: '40px', maxWidth: '100%', margin: '0' }}>
            <div className="view-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    {isEditingLabel ? (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                className="form-input"
                                style={{ fontSize: '24px', fontWeight: 'bold', height: '42px', padding: '0 12px' }}
                                value={tempLabel}
                                onChange={(e) => setTempLabel(e.target.value)}
                                onBlur={handleLabelSave}
                                onKeyDown={(e) => e.key === 'Enter' && handleLabelSave()}
                                autoFocus
                            />
                        </div>
                    ) : (
                        <h1
                            style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                            onClick={() => setIsEditingLabel(true)}
                            title="Click to rename"
                        >
                            {mapping.label || `Mapped Data: ${mapping.targetPageName}`}
                            <span style={{ fontSize: '14px', opacity: 0.5 }}>✏️</span>
                        </h1>
                    )}
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Page: <strong>{mapping.targetPageName}</strong> | Field: <strong>{mapping.targetFieldName}</strong>
                    </p>
                </div>
                <button className="btn btn-ghost" onClick={() => router.push('/pages')}>
                    Back to Pages
                </button>
            </div>

            <div className="card" style={{ padding: '24px' }}>
                {entries.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '18px' }}>No entries selected for this mapping.</p>
                        <p style={{ fontSize: '14px', marginTop: '8px' }}>Go to the hierarchy editor to select and configure entries.</p>
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '16px' }}
                            onClick={() => router.push(`/edit-hierarchy/${mappingId}`)}
                        >
                            Edit Mapping
                        </button>
                    </div>
                ) : (
                    <>
                        {hasHierarchy ? (
                            <div className="tree-viz">
                                {renderTree(null)}
                            </div>
                        ) : (
                            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid var(--border)' }}>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600 }}>#</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600 }}>Entry Date</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600 }}>{mapping.targetFieldName}</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600 }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((entry, idx) => (
                                        <tr key={entry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 24px' }}>{idx + 1}</td>
                                            <td style={{ padding: '16px 24px' }}>
                                                {new Date(entry.id).toLocaleDateString()}
                                            </td>
                                            <td style={{ padding: '16px 24px', fontWeight: 500 }}>
                                                {entry.data[fieldKey] || (
                                                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                                        No data
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                <button
                                                    className="btn btn-accent btn-sm"
                                                    onClick={() => router.push(`/data-entry/${mapping.targetPageId}/${entry.id}`)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </div>

            <style>{`
                .tree-viz {
                    background: #f8fafc;
                    padding: 32px;
                    border-radius: 12px;
                    min-height: 200px;
                }
                .tree-node {
                    margin-left: 20px;
                    position: relative;
                }
                .tree-node::before {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 0;
                    bottom: 0;
                    width: 1.5px;
                    background: #cbd5e1;
                }
                .tree-node:last-child::before {
                    height: 12px;
                }
                .tree-node-content {
                    padding: 10px 16px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: fit-content;
                    position: relative;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .tree-node-content:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }
                .tree-node-content::after {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 20px;
                    width: 10px;
                    height: 1.5px;
                    background: #cbd5e1;
                }
                .node-name {
                    font-weight: 500;
                    color: var(--text-main);
                }
                .role-primary {
                    color: #7b1fa2;
                    font-weight: 700;
                }
                .role-leaf {
                    color: #059669;
                }
                .node-role {
                    font-size: 11px;
                    margin-left: 6px;
                    opacity: 0.7;
                    text-transform: uppercase;
                    background: #f1f5f9;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                }
                .data-table th {
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </div>
    );
}
