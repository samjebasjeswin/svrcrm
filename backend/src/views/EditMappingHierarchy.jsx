"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function EditMappingHierarchy() {
    const { mappingId } = useParams();
    const router = useRouter();
    const { fieldMappings, getPageEntries, getPage, updateFieldMapping, getLinkedEntryDisplayValue } = useApp();

    const mapping = fieldMappings.find(m => m.id === Number(mappingId));
    const [hierarchy, setHierarchy] = useState({});
    const [orderedEntries, setOrderedEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [tempLabel, setTempLabel] = useState('');

    // Drag state
    const dragItem = useRef(null);       // entry.id being dragged
    const [dragOverId, setDragOverId] = useState(null); // entry.id being hovered over

    const rawEntries = mapping ? getPageEntries(mapping.targetPageId) : [];

    useEffect(() => {
        if (mapping) {
            if (mapping.hierarchy) setHierarchy(mapping.hierarchy);
            if (mapping.selectedIds) setSelectedIds(new Set(mapping.selectedIds));
            setTempLabel(mapping.label || mapping.targetPageName);
        }
    }, [mapping]);

    // Initialize orderedEntries once when entries are loaded
    useEffect(() => {
        if (rawEntries.length > 0 && orderedEntries.length === 0) {
            setOrderedEntries(rawEntries);
        }
    }, [rawEntries.length]);

    if (!mapping) {
        return (
            <div className="page-center">
                <h2>Mapping not found</h2>
                <button className="btn btn-primary" onClick={() => router.push('/pages')}>Back to Pages</button>
            </div>
        );
    }

    const targetPage = getPage(mapping.targetPageId);
    // Use orderedEntries for rendering (falls back to rawEntries while loading)
    const entries = orderedEntries.length > 0 ? orderedEntries : rawEntries;

    const handleUpdateEntry = (entryId, field, value) => {
        setHierarchy(prev => ({
            ...prev,
            [entryId]: {
                ...(prev[entryId] || { parentId: null, role: 'none' }),
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        updateFieldMapping(mapping.id, {
            hierarchy,
            selectedIds: Array.from(selectedIds)
        });
        alert('Hierarchy saved successfully!');
        router.push('/pages');
    };

    const handleLabelSave = () => {
        if (!tempLabel.trim()) return;
        updateFieldMapping(mapping.id, { label: tempLabel.trim() });
        setIsEditingLabel(false);
    };

    const handleBulkUpdate = (field, value) => {
        if (selectedIds.size === 0) return;
        setHierarchy(prev => {
            const next = { ...prev };
            selectedIds.forEach(id => {
                next[id] = {
                    ...(next[id] || { parentId: null, role: 'none' }),
                    [field]: value
                };
            });
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredEntries.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredEntries.map(e => e.id)));
        }
    };

    const toggleSelect = (id) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const getEntryName = (entry) => {
        return getLinkedEntryDisplayValue(mapping.targetPageId, entry.id, mapping.targetFieldName) || `Entry #${entry.id}`;
    };

    const filteredEntries = entries.filter(e =>
        getEntryName(e).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ─── Drag-and-drop handlers ───────────────────────────────────────────
    const handleDragStart = (e, entryId) => {
        dragItem.current = entryId;
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, entryId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (entryId !== dragItem.current) {
            setDragOverId(entryId);
        }
    };

    const handleDrop = (e, dropEntryId) => {
        e.preventDefault();
        const fromId = dragItem.current;
        if (!fromId || fromId === dropEntryId) {
            dragItem.current = null;
            setDragOverId(null);
            return;
        }
        setOrderedEntries(prev => {
            const arr = [...prev];
            const fromIdx = arr.findIndex(en => en.id === fromId);
            const toIdx = arr.findIndex(en => en.id === dropEntryId);
            if (fromIdx === -1 || toIdx === -1) return prev;
            const [moved] = arr.splice(fromIdx, 1);
            arr.splice(toIdx, 0, moved);
            return arr;
        });
        dragItem.current = null;
        setDragOverId(null);
    };

    const handleDragEnd = () => {
        dragItem.current = null;
        setDragOverId(null);
    };
    // ─────────────────────────────────────────────────────────────────────

    // Recursive tree builder using orderedEntries, optionally filtered by selection
    const buildTree = (parentId = null) => {
        const sourceEntries = selectedIds.size > 0
            ? entries.filter(e => selectedIds.has(e.id))
            : entries;

        return sourceEntries
            .filter(entry => {
                const h = hierarchy[entry.id];
                const pId = h?.parentId || null;
                const normalizeId = (id) => (id === '' || id === undefined ? null : Number(id));

                // If filtering by selection, and the parent is NOT in the selection, 
                // treat this entry as a root node for the preview.
                const effectiveParentId = (selectedIds.size > 0 && pId && !selectedIds.has(Number(pId)))
                    ? null
                    : pId;

                return normalizeId(effectiveParentId) === normalizeId(parentId);
            })
            .map(entry => {
                const h = hierarchy[entry.id] || {};
                const isOver = dragOverId === entry.id;
                return (
                    <div
                        key={entry.id}
                        className="tree-node"
                        onDragOver={(e) => handleDragOver(e, entry.id)}
                        onDrop={(e) => handleDrop(e, entry.id)}
                    >
                        <div
                            className={`tree-node-content ${isOver ? 'drag-over' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, entry.id)}
                            onDragEnd={handleDragEnd}
                        >
                            <span className="drag-handle" title="Drag to reorder">⠿</span>
                            <span className="node-icon">📄</span>
                            <span className={`node-name ${h.role === 'primary' ? 'role-primary' : ''} ${h.role === 'leaf' ? 'role-leaf' : ''}`}>
                                {getEntryName(entry)}
                                {h.role && h.role !== 'none' && (
                                    <span className="node-role">({h.role})</span>
                                )}
                            </span>
                        </div>
                        <div className="tree-children">
                            {buildTree(entry.id)}
                        </div>
                    </div>
                );
            });
    };

    return (
        <div className="hierarchy-manager animate-fade-in-up">
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
                            {mapping.label || 'Hierarchy Management'}
                            <span style={{ fontSize: '14px', opacity: 0.5 }}>✏️</span>
                        </h1>
                    )}
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Page: <strong>{mapping.targetPageName}</strong> | Field: <strong>{mapping.targetFieldName}</strong>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-outline" onClick={() => router.push('/pages')}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save Hierarchy</button>
                </div>
            </div>

            <div className="hierarchy-grid">
                {/* ── LEFT: Configure Entries (follows orderedEntries order) ── */}
                <div className="hierarchy-form-section">
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3>Configure Entries</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Search entries..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '200px' }}
                                />
                            </div>
                        </div>

                        {selectedIds.size > 0 && (
                            <div className="bulk-actions-bar animate-fade-in-down">
                                <div className="bulk-info">
                                    <strong>{selectedIds.size}</strong> selected
                                </div>
                                <div className="bulk-controls">
                                    <select
                                        className="form-input form-input-sm"
                                        onChange={(e) => handleBulkUpdate('parentId', e.target.value)}
                                        value=""
                                    >
                                        <option value="" disabled>Set Parent for all...</option>
                                        <option value="">None (Root)</option>
                                        {entries.map(e => (
                                            <option key={e.id} value={e.id}>{getEntryName(e)}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="form-input form-input-sm"
                                        onChange={(e) => handleBulkUpdate('role', e.target.value)}
                                        value=""
                                    >
                                        <option value="" disabled>Set Role for all...</option>
                                        <option value="none">Standard</option>
                                        <option value="primary">Primary</option>
                                        <option value="leaf">Leaf</option>
                                    </select>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedIds(new Set())}>Clear</button>
                                </div>
                            </div>
                        )}

                        <div className="entries-config-header">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={filteredEntries.length > 0 && selectedIds.size === filteredEntries.length}
                                    onChange={toggleSelectAll}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>SELECT ALL</span>
                        </div>

                        <div className="entries-config-list">
                            {filteredEntries.map(entry => {
                                const h = hierarchy[entry.id] || { parentId: '', role: 'none' };
                                return (
                                    <div key={entry.id} className="entry-config-row">
                                        <div className="entry-identity">
                                            <label className="checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(entry.id)}
                                                    onChange={() => toggleSelect(entry.id)}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            <strong>{getEntryName(entry)}</strong>
                                        </div>
                                        <div className="entry-controls">
                                            <div className="form-group">
                                                <label>Parent</label>
                                                <select
                                                    className="form-input"
                                                    value={h.parentId || ''}
                                                    onChange={(e) => handleUpdateEntry(entry.id, 'parentId', e.target.value)}
                                                >
                                                    <option value="">None (Root)</option>
                                                    {entries.filter(e => e.id !== entry.id).map(e => (
                                                        <option key={e.id} value={e.id}>{getEntryName(e)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Role</label>
                                                <select
                                                    className="form-input"
                                                    value={h.role || 'none'}
                                                    onChange={(e) => handleUpdateEntry(entry.id, 'role', e.target.value)}
                                                >
                                                    <option value="none">Standard</option>
                                                    <option value="primary">Primary</option>
                                                    <option value="leaf">Leaf</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Hierarchy Preview (draggable) ── */}
                <div className="hierarchy-preview-section">
                    <div className="card">
                        <h3>Hierarchy Preview <span className="drag-hint">← Drag items to reorder</span></h3>
                        <div className="tree-viz">
                            {entries.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No entries found.</p>
                            ) : (
                                buildTree(null)
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hierarchy-manager {
                    padding: 40px;
                    max-width: 100%;
                    margin: 0;
                }
                .hierarchy-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 32px;
                    margin-top: 32px;
                }
                .entry-config-row {
                    padding: 20px;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: background 0.2s;
                }
                .entry-config-row:last-child {
                    border-bottom: none;
                }
                .entry-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .tree-viz {
                    background: #f8fafc;
                    padding: 24px;
                    border-radius: 12px;
                    min-height: 400px;
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
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: fit-content;
                    position: relative;
                    cursor: grab;
                    user-select: none;
                    transition: box-shadow 0.15s, border-color 0.15s, transform 0.15s;
                }
                .tree-node-content:active {
                    cursor: grabbing;
                }
                .tree-node-content:hover {
                    border-color: #6366f1;
                    box-shadow: 0 2px 8px rgba(99,102,241,0.15);
                }
                .tree-node-content.drag-over {
                    border-color: #6366f1;
                    border-style: dashed;
                    background: #eef2ff;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
                    transform: scale(1.02);
                }
                .tree-node-content::after {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 18px;
                    width: 10px;
                    height: 1.5px;
                    background: #cbd5e1;
                }
                .drag-handle {
                    font-size: 16px;
                    color: #94a3b8;
                    cursor: grab;
                    line-height: 1;
                    letter-spacing: -1px;
                }
                .drag-hint {
                    font-size: 12px;
                    font-weight: 400;
                    color: #94a3b8;
                    margin-left: 8px;
                }
                .node-name {
                    font-weight: 500;
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
                }

                /* New Bulk & Select Styles */
                .bulk-actions-bar {
                    background: #eef2ff;
                    padding: 12px 16px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    border: 1px solid #c7d2fe;
                }
                .bulk-controls {
                    display: flex;
                    gap: 8px;
                }
                .form-input-sm {
                    padding: 4px 8px;
                    font-size: 12px;
                    height: 32px;
                    width: auto !important;
                }
                .checkbox-container {
                    display: block;
                    position: relative;
                    padding-left: 24px;
                    cursor: pointer;
                    user-select: none;
                    height: 18px;
                }
                .checkbox-container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 18px;
                    width: 18px;
                    background-color: #eee;
                    border-radius: 4px;
                    border: 1px solid var(--border);
                }
                .checkbox-container:hover input ~ .checkmark {
                    background-color: #ccc;
                }
                .checkbox-container input:checked ~ .checkmark {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }
                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
                .checkbox-container input:checked ~ .checkmark:after {
                    display: block;
                }
                .checkbox-container .checkmark:after {
                    left: 6px;
                    top: 2px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                .entries-config-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    background: #f8fafc;
                    border-bottom: 1px solid var(--border);
                }
                .entry-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .bulk-info {
                    font-size: 13px;
                    color: var(--primary);
                }
                .entries-config-list {
                    max-height: 70vh;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}

