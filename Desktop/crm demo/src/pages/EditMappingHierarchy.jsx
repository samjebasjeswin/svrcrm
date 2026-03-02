import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EditMappingHierarchy() {
    const { mappingId } = useParams();
    const navigate = useNavigate();
    const { fieldMappings, getPageEntries, getPage, updateFieldMapping, getLinkedEntryDisplayValue } = useApp();

    const mapping = fieldMappings.find(m => m.id === Number(mappingId));
    const [hierarchy, setHierarchy] = useState({}); // { [entryId]: { parentId, role } }

    useEffect(() => {
        if (mapping && mapping.hierarchy) {
            setHierarchy(mapping.hierarchy);
        }
    }, [mapping]);

    if (!mapping) {
        return (
            <div className="page-center">
                <h2>Mapping not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/pages')}>Back to Pages</button>
            </div>
        );
    }

    const targetPage = getPage(mapping.targetPageId);
    const entries = getPageEntries(mapping.targetPageId);

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
        updateFieldMapping(mapping.id, { hierarchy });
        alert('Hierarchy saved successfully!');
        navigate('/pages');
    };

    const getEntryName = (entry) => {
        // Use the display logic from AppContext
        return getLinkedEntryDisplayValue(mapping.targetPageId, entry.id, mapping.targetFieldName) || `Entry #${entry.id}`;
    };

    // Recursive function to build tree
    const buildTree = (parentId = null) => {
        return entries
            .filter(entry => {
                const h = hierarchy[entry.id];
                const pId = h?.parentId || null;
                // Treat undefined or empty string as null for comparison
                const normalizeId = (id) => (id === '' || id === undefined ? null : Number(id));
                return normalizeId(pId) === normalizeId(parentId);
            })
            .map(entry => {
                const h = hierarchy[entry.id] || {};
                return (
                    <div key={entry.id} className="tree-node">
                        <div className="tree-node-content">
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
            <div className="view-header">
                <div>
                    <h1>Hierarchy: {mapping.targetPageName}</h1>
                    <p>Map primary and leaf relationships for entries</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-outline" onClick={() => navigate('/pages')}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save Hierarchy</button>
                </div>
            </div>

            <div className="hierarchy-grid">
                <div className="hierarchy-form-section">
                    <div className="card">
                        <h3>Configure Entries</h3>
                        <div className="entries-config-list">
                            {entries.map(entry => {
                                const h = hierarchy[entry.id] || { parentId: '', role: 'none' };
                                return (
                                    <div key={entry.id} className="entry-config-row">
                                        <div className="entry-identity">
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

                <div className="hierarchy-preview-section">
                    <div className="card">
                        <h3>Hierarchy Preview</h3>
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
                    max-width: 1400px;
                    margin: 0 auto;
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
                .entries-config-list {
                    max-height: 70vh;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}
