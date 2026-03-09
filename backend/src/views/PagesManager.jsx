"use client";
import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function PagesManager() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams?.get('tab') || 'pages';

    const [showModal, setShowModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');

    // Linking local state
    const [linkTargetPageId, setLinkTargetPageId] = useState('');
    const [linkSourcePageId, setLinkSourcePageId] = useState('');
    const [linkFieldName, setLinkFieldName] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedSources, setSelectedSources] = useState([]);
    const [editingLinkId, setEditingLinkId] = useState(null);
    const [editingGroupLinks, setEditingGroupLinks] = useState(null); // Array of link IDs being group-edited

    const handleEditLink = (link) => {
        setLinkTargetPageId(String(link.targetPageId));
        setLinkSourcePageId(String(link.sourcePageId));
        setLinkFieldName(link.sourceFieldName);
        setCustomLabel(link.linkName);
        setGroupName(link.groupName || '');
        setEditingLinkId(link.id);
        setEditingGroupLinks(null);
        setSelectedSources([]);
    };

    const handleEditGroup = (group) => {
        // Load all links in the group into the source queue
        const firstLink = group.links[0];
        setLinkTargetPageId(String(firstLink.targetPageId));
        setGroupName(group.label || '');
        setEditingLinkId(null);
        setEditingGroupLinks(group.links.map(l => l.id));
        setSelectedSources(group.links.map(link => {
            const sourcePage = pages.find(p => p.id === Number(link.sourcePageId));
            return {
                id: link.id,
                pageId: link.sourcePageId,
                name: sourcePage?.name || 'Deleted',
                fieldName: link.sourceFieldName,
                customLabel: link.linkName
            };
        }));
        setLinkSourcePageId('');
        setLinkFieldName('');
        setCustomLabel('');
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateGroup = () => {
        if (!editingGroupLinks || !linkTargetPageId || selectedSources.length === 0) return;
        // Delete old links
        editingGroupLinks.forEach(linkId => deletePageLink(linkId));
        // Create new batch with updated data
        const linksToCreate = selectedSources.map(source => ({
            sourcePageId: source.pageId,
            targetPageId: Number(linkTargetPageId),
            linkName: source.customLabel,
            groupName: groupName.trim(),
            sourceFieldName: source.fieldName
        }));
        addPageLinks(linksToCreate);
        // Reset
        setEditingGroupLinks(null);
        setLinkTargetPageId('');
        setSelectedSources([]);
        setGroupName('');
        alert('Group updated successfully!');
    };

    const handleUpdateLink = () => {
        if (!editingLinkId) return;
        updatePageLink(editingLinkId, {
            linkName: customLabel.trim(),
            sourcePageId: Number(linkSourcePageId),
            sourceFieldName: linkFieldName,
            groupName: groupName.trim()
        });
        setEditingLinkId(null);
        setLinkSourcePageId('');
        setLinkFieldName('');
        setCustomLabel('');
        setGroupName('');
        alert('Link updated successfully!');
    };

    // Mapping local state
    const [mappingTargetPageId, setMappingTargetPageId] = useState('');
    const [mappingTargetFieldId, setMappingTargetFieldId] = useState('');
    const [mappingLabel, setMappingLabel] = useState('');
    const [editingMappingId, setEditingMappingId] = useState(null);
    const [editMappingLabel, setEditMappingLabel] = useState('');

    const {
        getCompanyPages, addPage, deletePage,
        pageLinks, addPageLinks, updatePageLink, deletePageLink,
        getPage, fieldMappings, addFieldMapping, deleteFieldMapping, updateFieldMapping,
        updatePage, companies, currentCompanyId, getPageEntries,
    } = useApp();

    const currentCompany = companies.find(c => c.id === currentCompanyId);
    const pages = getCompanyPages();

    const setTab = (tab) => router.push(tab === 'pages' ? '/pages' : `/pages?tab=${tab}`);

    const getAvailableFields = (pid) => {
        const page = getPage(pid);
        if (!page) return [];
        const fields = [];
        (page.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => { fields.push(f); });
            });
        });
        return fields;
    };

    const handleAddMapping = () => {
        if (!mappingTargetPageId || !mappingTargetFieldId) return;
        const targetPage = getPage(mappingTargetPageId);
        const allFields = getAvailableFields(mappingTargetPageId);
        const targetField = allFields.find(f => f.id === Number(mappingTargetFieldId));
        if (targetPage && targetField) {
            addFieldMapping({
                label: mappingLabel.trim() || targetPage.name,
                targetPageId: Number(mappingTargetPageId),
                targetPageName: targetPage.name,
                targetFieldId: Number(mappingTargetFieldId),
                targetFieldName: targetField.label
            });
            setMappingTargetPageId('');
            setMappingTargetFieldId('');
            setMappingLabel('');
            alert('Mapping added successfully!');
        }
    };

    const handleUpdateMappingLabel = (id) => {
        if (!editMappingLabel.trim()) return;
        updateFieldMapping(id, { label: editMappingLabel.trim() });
        setEditingMappingId(null);
        setEditMappingLabel('');
    };

    const handleAddSource = () => {
        if (!linkSourcePageId) return;
        const sourcePage = pages.find(p => p.id === Number(linkSourcePageId));
        if (!sourcePage) return;
        const fieldName = linkFieldName || 'name';
        const finalLabel = customLabel.trim() || fieldName;
        if (selectedSources.find(s => s.pageId === sourcePage.id && s.fieldName === fieldName && s.customLabel === finalLabel)) {
            alert('This source page with this field and label is already added to the queue.');
            return;
        }
        setSelectedSources([...selectedSources, { id: Date.now(), pageId: sourcePage.id, name: sourcePage.name, fieldName, customLabel: finalLabel }]);
        setLinkSourcePageId('');
        setLinkFieldName('');
        setCustomLabel('');
    };

    const removeSource = (queueId) => setSelectedSources(selectedSources.filter(s => s.id !== queueId));

    const handleCreateLinks = () => {
        if (!linkTargetPageId || selectedSources.length === 0) return;
        // If editing a group, use group update instead
        if (editingGroupLinks) {
            handleUpdateGroup();
            return;
        }
        const linksToCreate = selectedSources.map(source => ({
            sourcePageId: source.pageId,
            targetPageId: Number(linkTargetPageId),
            linkName: source.customLabel,
            groupName: groupName.trim(),
            sourceFieldName: source.fieldName
        }));
        addPageLinks(linksToCreate);
        setLinkTargetPageId('');
        setSelectedSources([]);
        setGroupName('');
        alert('Links created successfully!');
    };

    const handleAddPage = () => {
        if (newPageName.trim()) {
            addPage(newPageName.trim());
            setNewPageName('');
            setShowModal(false);
        }
    };

    const handleDelete = (pageId) => {
        if (confirm('Are you sure you want to delete this page?')) deletePage(pageId);
    };

    const tabs = [
        { key: 'pages', label: '📄 Pages' },
        { key: 'linking', label: '🔗 Linking' },
        { key: 'mapping', label: '🗺️ Mapping' },
        { key: 'api', label: ' API Report' },
    ];

    return (
        <div className="dashboard-page animate-fade-in">
            {/* Page Header */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h1>System Admin</h1>
                    <p>Manage pages, linking, mapping and API endpoints for {currentCompany?.name}</p>
                </div>
                {activeTab === 'pages' && (
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Page
                    </button>
                )}
            </div>

            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: '#f1f5f9', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setTab(tab.key)}
                        style={{
                            padding: '8px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                            fontSize: '13px', fontWeight: activeTab === tab.key ? '700' : '500',
                            background: activeTab === tab.key ? 'white' : 'transparent',
                            color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)',
                            boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Pages Tab */}
            {activeTab === 'pages' && (
                <div className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {pages.map((page, index) => {
                            const entryCount = getPageEntries(page.id).length;
                            return (
                                <div key={page.id} className="card animate-fade-in-up" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ width: '40px', height: '40px', background: 'rgba(79,70,229,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontSize: '20px' }}>📄</div>
                                            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', textTransform: 'capitalize' }}>{page.name}</h3>
                                            <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                                                {entryCount} {entryCount === 1 ? 'entry' : 'entries'}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                        <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => router.push(`/entries/${page.id}`)}>View</button>
                                        <button className="btn btn-ghost btn-sm" onClick={() => router.push(`/edit-page/${page.id}`)}>Edit</button>
                                        <button className="btn btn-danger-text btn-sm" onClick={() => handleDelete(page.id)}>Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="card card-dashed add-page-card animate-fade-in-up" onClick={() => setShowModal(true)} style={{ minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}>
                            <span style={{ fontSize: '28px', color: 'var(--text-muted)' }}>+</span>
                            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Add Page</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Linking Tab */}
            {activeTab === 'linking' && (
                <div className="animate-fade-in linking-section">
                    <div className="linking-header">
                        <h2>Linking</h2>
                        <p>Connect your pages together by creating relational fields</p>
                    </div>
                    <div className="linking-controls card">
                        <div className="form-group">
                            <label className="form-label">Target Page <span className="required">*</span></label>
                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>The page that will receive the linked fields.</p>
                            <select className="form-input" value={linkTargetPageId} onChange={(e) => { setLinkTargetPageId(e.target.value); setSelectedSources([]); setEditingGroupLinks(null); }} disabled={!!editingGroupLinks || !!editingLinkId}>
                                <option value="">Select target page...</option>
                                {pages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        {linkTargetPageId && (
                            <div className="linking-step animate-fade-in-up" style={{ marginTop: 24, padding: 20, background: 'var(--bg)', borderRadius: 12 }}>
                                <div className="linking-grid">
                                    <div className="form-group">
                                        <label className="form-label">Source Page to Link</label>
                                        <select className="form-input" value={linkSourcePageId} onChange={(e) => setLinkSourcePageId(e.target.value)}>
                                            <option value="">Select source page...</option>
                                            {pages.filter(p => p.id !== Number(linkTargetPageId)).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Label Field (Display Name)</label>
                                        <select className="form-input" value={linkFieldName} onChange={(e) => setLinkFieldName(e.target.value)} disabled={!linkSourcePageId}>
                                            <option value="">Select display field...</option>
                                            {getAvailableFields(linkSourcePageId).map(f => <option key={f.id} value={f.label}>{f.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Display Name (Custom Label)</label>
                                        <input type="text" className="form-input" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} placeholder="e.g. Category Name" disabled={!linkSourcePageId} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                        <button
                                            className={`btn ${editingLinkId ? 'btn-primary' : 'btn-accent'} btn-full`}
                                            onClick={editingLinkId ? handleUpdateLink : handleAddSource}
                                            disabled={!linkSourcePageId}
                                        >
                                            {editingLinkId ? 'Update Link' : '+ Add Source'}
                                        </button>
                                        {editingLinkId && (
                                            <button
                                                className="btn btn-ghost"
                                                onClick={() => {
                                                    setEditingLinkId(null);
                                                    setLinkSourcePageId('');
                                                    setLinkFieldName('');
                                                    setCustomLabel('');
                                                    setGroupName('');
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {!editingLinkId && selectedSources.length > 0 && (
                                    <div style={{ marginTop: 24 }}>
                                        <label className="form-label" style={{ marginBottom: 12, display: 'block' }}>Sources to be linked:</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                            {selectedSources.map(s => (
                                                <div key={s.id} className="card" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid var(--accent)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontWeight: 600, fontSize: 13 }}>🏷️ {s.customLabel}</span>
                                                        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>📄 {s.name} ({s.fieldName})</span>
                                                    </div>
                                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontWeight: 700, fontSize: 16 }} onClick={() => removeSource(s.id)}>✕</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {!editingLinkId && (
                                    <div style={{ marginTop: 32, padding: 20, background: 'var(--border)', borderRadius: 12 }}>
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontWeight: 700 }}>Common Name (Group Label) <span style={{ fontWeight: 400, fontSize: 12, opacity: 0.7 }}>Optional</span></label>
                                            <input type="text" className="form-input" style={{ background: 'white' }} value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="e.g. Pricing, Technical Specs..." />
                                        </div>
                                        <button className="btn btn-primary btn-full" style={{ marginTop: 12 }} onClick={handleCreateLinks} disabled={selectedSources.length === 0}>
                                            {editingGroupLinks ? '✏️ Update Group' : '🔗 Apply Links'}
                                        </button>
                                        {editingGroupLinks && (
                                            <button
                                                className="btn btn-ghost btn-full"
                                                style={{ marginTop: 8 }}
                                                onClick={() => {
                                                    setEditingGroupLinks(null);
                                                    setLinkTargetPageId('');
                                                    setSelectedSources([]);
                                                    setGroupName('');
                                                    setLinkSourcePageId('');
                                                    setLinkFieldName('');
                                                    setCustomLabel('');
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {pageLinks.length > 0 && (
                        <div className="linking-relationship-map animate-fade-in-up">
                            <div className="section-divider"><span>Relationship Map</span></div>
                            {Object.entries(pageLinks.reduce((acc, link) => {
                                const targetId = link.targetPageId;
                                if (!acc[targetId]) acc[targetId] = [];
                                acc[targetId].push(link);
                                return acc;
                            }, {})).map(([targetId, links]) => {
                                const targetPage = pages.find(p => p.id === Number(targetId));
                                if (!targetPage) return null;

                                // Sub-group links: by groupName first, then by batchId, ungrouped as individual
                                const groups = [];
                                const groupedByName = {};
                                const groupedByBatch = {};
                                const ungrouped = [];

                                links.forEach(link => {
                                    if (link.groupName) {
                                        const key = `group_${link.groupName}`;
                                        if (!groupedByName[key]) groupedByName[key] = { label: link.groupName, links: [] };
                                        groupedByName[key].links.push(link);
                                    } else if (link.batchId) {
                                        const key = `batch_${link.batchId}`;
                                        if (!groupedByBatch[key]) groupedByBatch[key] = { label: null, links: [] };
                                        groupedByBatch[key].links.push(link);
                                    } else {
                                        ungrouped.push(link);
                                    }
                                });

                                // Collect all groups
                                Object.values(groupedByName).forEach(g => groups.push(g));
                                Object.values(groupedByBatch).forEach(g => {
                                    // Only group batches with 2+ links; single-link batches are ungrouped
                                    if (g.links.length > 1) groups.push(g);
                                    else ungrouped.push(...g.links);
                                });

                                return (
                                    <div key={targetId} className="relationship-card card animate-fade-in-up">
                                        <div className="relationship-header">
                                            <div className="relationship-target-info">
                                                <span className="target-label">Target Page</span>
                                                <h3 className="target-name">{targetPage.name}</h3>
                                            </div>
                                        </div>
                                        <div className="relationship-sources">
                                            {/* Grouped family cards */}
                                            {groups.map((group, gIdx) => {
                                                const firstSource = pages.find(p => p.id === Number(group.links[0].sourcePageId));
                                                return (
                                                    <div key={`grp-${gIdx}`} className="relationship-group">
                                                        <div className="relationship-group-header">
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <span className="relationship-group-icon">📦</span>
                                                                <div>
                                                                    <span className="relationship-group-title">
                                                                        {group.label || `Linked Set`}
                                                                    </span>
                                                                    <span className="relationship-group-meta">
                                                                        {group.links.length} linked fields
                                                                        {!group.label && firstSource && ` • from ${firstSource.name}`}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <span className="relationship-group-badge">{group.links.length}</span>
                                                            <button
                                                                className="btn btn-ghost btn-sm"
                                                                style={{ fontSize: '11px', padding: '2px 8px', height: '24px', marginLeft: '4px' }}
                                                                onClick={() => handleEditGroup(group)}
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div className="relationship-group-items">
                                                            {group.links.map((link) => {
                                                                const sourcePage = pages.find(p => p.id === Number(link.sourcePageId));
                                                                return (
                                                                    <div key={link.id} className="relationship-group-item">
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                                            <span style={{ fontSize: '14px' }}>📄</span>
                                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                <span style={{ fontWeight: 600, fontSize: '13px' }}>{link.linkName}</span>
                                                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                                                    {sourcePage?.name || 'Deleted'} ({link.sourceFieldName})
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                                            <button
                                                                                className="btn btn-ghost btn-sm"
                                                                                style={{ fontSize: '11px', padding: '2px 6px', height: '24px' }}
                                                                                onClick={() => handleEditLink(link)}
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-ghost btn-sm"
                                                                                style={{ color: 'var(--danger)', padding: '2px 6px', height: '24px', fontSize: '11px' }}
                                                                                onClick={() => {
                                                                                    if (confirm('Delete this relationship?')) deletePageLink(link.id);
                                                                                }}
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Ungrouped individual links */}
                                            {ungrouped.map((link, idx) => {
                                                const sourcePage = pages.find(p => p.id === Number(link.sourcePageId));
                                                return (
                                                    <div key={link.id} className="relationship-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid var(--border)' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                            <div className="source-info" style={{ flex: 1 }}>
                                                                <span className="source-icon">📄</span>
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span className="source-name" style={{ fontWeight: 700 }}>{link.linkName}</span>
                                                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                                        Source: {sourcePage?.name || 'Deleted'} ({link.sourceFieldName})
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                                <button
                                                                    className="btn btn-ghost btn-sm"
                                                                    style={{ fontSize: '12px', padding: '4px 8px', height: '28px' }}
                                                                    onClick={() => handleEditLink(link)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-ghost btn-sm"
                                                                    style={{ color: 'var(--danger)', padding: '4px 8px', height: '28px' }}
                                                                    onClick={() => {
                                                                        if (confirm('Delete this relationship?')) deletePageLink(link.id);
                                                                    }}
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Mapping Tab */}
            {activeTab === 'mapping' && (
                <div className="animate-fade-in linking-section">
                    <div className="linking-header" style={{ borderLeftColor: '#7b1fa2' }}>
                        <h2>Mapping</h2>
                        <p>Configure specialized data mappings for hierarchy and visualization</p>
                    </div>
                    <div className="linking-controls card">
                        <div className="linking-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr auto' }}>
                            <div className="form-group">
                                <label className="form-label">Mapping Label</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={mappingLabel}
                                    onChange={(e) => setMappingLabel(e.target.value)}
                                    placeholder="e.g. Material Catalog Hierarchy"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Target Page <span className="required">*</span></label>
                                <select className="form-input" value={mappingTargetPageId} onChange={(e) => { setMappingTargetPageId(e.target.value); setMappingTargetFieldId(''); }}>
                                    <option value="">Select target page...</option>
                                    {pages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Target Field <span className="required">*</span></label>
                                <select className="form-input" value={mappingTargetFieldId} onChange={(e) => setMappingTargetFieldId(e.target.value)} disabled={!mappingTargetPageId}>
                                    <option value="">{mappingTargetPageId ? 'Select field...' : 'Select page first'}</option>
                                    {getAvailableFields(mappingTargetPageId).map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                                </select>
                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <button className="btn btn-primary" style={{ background: '#7b1fa2', height: '42px' }} onClick={handleAddMapping} disabled={!mappingTargetPageId || !mappingTargetFieldId}>Add Mapping</button>
                            </div>
                        </div>
                    </div>
                    {fieldMappings.length > 0 && (
                        <div className="linking-relationship-map animate-fade-in-up" style={{ marginTop: 24 }}>
                            <div className="relationship-card card">
                                <div className="relationship-sources">
                                    {fieldMappings.filter(m => m.companyId === currentCompanyId).map(mapping => (
                                        <div key={mapping.id} className="relationship-row">
                                            <div className="source-info" style={{ flex: 1 }}>
                                                <span className="source-icon">🗺️</span>
                                                {editingMappingId === mapping.id ? (
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            style={{ height: '32px' }}
                                                            value={editMappingLabel}
                                                            onChange={(e) => setEditMappingLabel(e.target.value)}
                                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateMappingLabel(mapping.id)}
                                                            autoFocus
                                                        />
                                                        <button className="btn btn-primary btn-sm" onClick={() => handleUpdateMappingLabel(mapping.id)}>Save</button>
                                                        <button className="btn btn-ghost btn-sm" onClick={() => setEditingMappingId(null)}>✕</button>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span className="source-name" style={{ fontWeight: 700 }}>{mapping.label || mapping.targetPageName}</span>
                                                            <button
                                                                className="btn btn-ghost btn-sm"
                                                                style={{ padding: '0 4px', height: '20px', minWidth: 'unset' }}
                                                                onClick={() => {
                                                                    setEditingMappingId(mapping.id);
                                                                    setEditMappingLabel(mapping.label || mapping.targetPageName);
                                                                }}
                                                            >
                                                                ✏️
                                                            </button>
                                                        </div>
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                            Target: {mapping.targetPageName}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="field-name-badge" style={{ background: '#f3e5f5', color: '#7b1fa2' }}>{mapping.targetFieldName}</div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="btn btn-ghost btn-sm" onClick={() => router.push(`/edit-hierarchy/${mapping.id}`)}>Edit</button>
                                                <button className="btn btn-accent btn-sm" onClick={() => router.push(`/view-mapping/${mapping.id}`)}>View</button>
                                                <button className="btn btn-ghost btn-sm" onClick={() => deleteFieldMapping(mapping.id)}>✕</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* API Report Tab */}
            {activeTab === 'api' && (
                <div className="animate-fade-in">
                    <div className="linking-header" style={{ borderLeftColor: '#ec4899', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h2>API Report</h2>
                            <p>Dynamic API endpoints and documentation for {currentCompany?.name}</p>
                        </div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                const fullReport = pages.map(page => ({
                                    pageName: page.name,
                                    pageId: page.id,
                                    endpoint: `${window.location.origin}/api/${currentCompanyId}/${page.id}`,
                                    fields: getAvailableFields(page.id).map(f => ({
                                        label: f.label,
                                        type: f.valueType,
                                        key: f.id
                                    }))
                                }));
                                navigator.clipboard.writeText(JSON.stringify(fullReport, null, 2));
                                alert('Full API Report (JSON) copied to clipboard!');
                            }}
                        >
                            📋 Copy Full JSON Report
                        </button>
                    </div>

                    {/* Standard Legacy Forms */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                        <div className="card" style={{ padding: '24px', background: 'rgba(79,70,229,0.05)', border: '1px dashed var(--primary)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '16px', fontWeight: '700' }}>Standard Contact Form</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Legacy endpoint for general inquiries</p>
                                </div>
                                <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Endpoint</div>
                                    <code style={{ fontSize: '12px', color: 'var(--primary)', wordBreak: 'break-all' }}>
                                        {window.location.origin}/api/{currentCompanyId}/contact
                                    </code>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ padding: '24px', background: 'rgba(236,72,153,0.05)', border: '1px dashed #ec4899' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: '#ec4899', fontSize: '16px', fontWeight: '700' }}>Product Inquiry Form</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Legacy endpoint for product interests</p>
                                </div>
                                <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Endpoint</div>
                                    <code style={{ fontSize: '12px', color: '#ec4899', wordBreak: 'break-all' }}>
                                        {window.location.origin}/api/{currentCompanyId}/product
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Dynamic Page Endpoints</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {pages.map(page => (
                            <div key={page.id} className="card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#ec4899' }}></div>
                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', textTransform: 'capitalize' }}>{page.name}</h3>
                                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Endpoint identification for Next.js frontend</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
                                    {/* POST Section */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>POST: SUBMIT DATA</div>
                                            <code style={{ fontSize: '11px', color: '#ec4899', display: 'block', wordBreak: 'break-all', fontWeight: '600', marginBottom: '8px' }}>
                                                {window.location.origin}/api/{currentCompanyId}/{page.id}
                                            </code>
                                            <div style={{ fontSize: '10px', color: '#64748b' }}>Use this endpoint to send form submissions.</div>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>REQUIRED FIELDS</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {getAvailableFields(page.id).map(f => (
                                                    <span key={f.id} style={{ fontSize: '11px', background: 'white', padding: '3px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', color: 'var(--text-secondary)' }}>
                                                        {f.label}
                                                    </span>
                                                ))}
                                                {getAvailableFields(page.id).length === 0 && <span style={{ fontSize: '11px', fontStyle: 'italic', color: 'var(--text-muted)' }}>No fields defined</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* GET Section (The new query documentation) */}
                                    <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', color: '#e2e8f0', position: 'relative' }}>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>GET: RETRIEVE DATA (QUERY)</span>
                                            <span style={{ color: '#ec4899' }}>GraphQL Style</span>
                                        </div>

                                        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '12px' }}>
                                            <pre style={{ margin: 0, fontSize: '12px', fontFamily: '"Fira Code", monospace', color: '#ec4899', lineHeight: '1.5' }}>
                                                {`query Get${page.name.replace(/\s+/g, '')} {
  nodes {
    id
${getAvailableFields(page.id).slice(0, 3).map(f => `    ${f.label.toLowerCase().replace(/\s+/g, '_')}`).join('\n')}
  }
}`}
                                            </pre>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                                                Use this query in the <b>API IDE</b> to fetch entries.
                                            </div>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                style={{ height: '30px', padding: '0 12px', fontSize: '11px' }}
                                                onClick={() => router.push('/api-ide')}
                                            >
                                                Open in IDE →
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                            Internal Page ID: <code>{page.id}</code> | Dynamic Retrieval Supported
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => {
                                                    const fields = getAvailableFields(page.id);
                                                    const queryStr = `query Get${page.name.replace(/\s+/g, '')} {\n  nodes {\n    id\n${fields.map(f => `    ${f.label.toLowerCase().replace(/\s+/g, '_')}`).join('\n')}\n  }\n}`;
                                                    navigator.clipboard.writeText(queryStr);
                                                    alert('GraphQL Query copied!');
                                                }}
                                            >
                                                Copy Query
                                            </button>
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => {
                                                    const pageReport = {
                                                        pageName: page.name,
                                                        endpoint: `${window.location.origin}/api/${currentCompanyId}/${page.id}`,
                                                        schema: getAvailableFields(page.id).map(f => ({
                                                            field: f.label,
                                                            type: f.valueType,
                                                            placeholder: f.placeholder || ''
                                                        }))
                                                    };
                                                    navigator.clipboard.writeText(JSON.stringify(pageReport, null, 2));
                                                    alert(`${page.name} API Schema copied!`);
                                                }}
                                            >
                                                Copy Schema
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Page Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Add New Page</h2>
                        <div className="form-group">
                            <label className="form-label">Page Name <span className="required">*</span></label>
                            <input className="form-input" value={newPageName} onChange={(e) => setNewPageName(e.target.value)} placeholder="e.g. Products..." autoFocus onKeyDown={(e) => e.key === 'Enter' && handleAddPage()} />
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddPage}>Add Page</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
