import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function PagesManager() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');

    const [activeTab, setActiveTab] = useState('pages'); // 'pages', 'linking', 'mapping'

    // Linking local state
    const [linkTargetPageId, setLinkTargetPageId] = useState('');
    const [linkSourcePageId, setLinkSourcePageId] = useState('');
    const [linkFieldName, setLinkFieldName] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedSources, setSelectedSources] = useState([]);

    // Mapping local state
    const [mappingTargetPageId, setMappingTargetPageId] = useState('');
    const [mappingTargetFieldId, setMappingTargetFieldId] = useState('');
    const {
        getCompanyPages, addPage, deletePage,
        pageLinks, addPageLinks, deletePageLink,
        getPage, fieldMappings, addFieldMapping, deleteFieldMapping,
        updatePage, user, logout,
        companies, currentCompanyId, updateCompany, getPageEntries,
        inquiries, deleteInquiry
    } = useApp();

    const currentCompany = companies.find(c => c.id === currentCompanyId);

    const filteredInquiries = useMemo(() => {
        return inquiries.filter(i => i.companyId === currentCompanyId);
    }, [inquiries, currentCompanyId]);

    const pages = getCompanyPages();

    const getAvailableFields = (pid) => {
        const page = getPage(pid);
        if (!page) return [];
        const fields = [];
        (page.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    fields.push(f);
                });
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
                targetPageId: Number(mappingTargetPageId),
                targetPageName: targetPage.name,
                targetFieldId: Number(mappingTargetFieldId),
                targetFieldName: targetField.label
            });
            setMappingTargetPageId('');
            setMappingTargetFieldId('');
            alert('Mapping added successfully!');
        }
    };

    const handleAddSource = () => {
        if (!linkSourcePageId) return;
        const sourcePage = pages.find(p => p.id === Number(linkSourcePageId));
        if (!sourcePage) return;

        const fieldName = linkFieldName || 'name';
        const finalLabel = customLabel.trim() || fieldName;

        // Allow same page if field is different OR label is different
        if (selectedSources.find(s => s.pageId === sourcePage.id && s.fieldName === fieldName && s.customLabel === finalLabel)) {
            alert('This source page with this field and label is already added to the queue.');
            return;
        }

        setSelectedSources([...selectedSources, {
            id: Date.now(), // unique ID for the queue item
            pageId: sourcePage.id,
            name: sourcePage.name,
            fieldName: fieldName,
            customLabel: finalLabel
        }]);
        setLinkSourcePageId('');
        setLinkFieldName('');
        setCustomLabel('');
    };

    const removeSource = (queueId) => {
        setSelectedSources(selectedSources.filter(s => s.id !== queueId));
    };

    const handleCreateLinks = () => {
        if (!linkTargetPageId || selectedSources.length === 0) return;

        const linksToCreate = selectedSources.map(source => ({
            sourcePageId: source.pageId,
            targetPageId: Number(linkTargetPageId),
            linkName: source.customLabel,
            groupName: groupName.trim(),
            sourceFieldName: source.fieldName
        }));

        addPageLinks(linksToCreate);

        // Reset all
        setLinkTargetPageId('');
        setSelectedSources([]);
        setGroupName('');
        alert('Links created successfully!');
    };

    const handleAddPage = () => {
        if (newPageName.trim()) {
            const pageId = addPage(newPageName.trim());
            setNewPageName('');
            setShowModal(false);
        }
    };

    const handleDelete = (pageId) => {
        if (confirm('Are you sure you want to delete this page?')) {
            deletePage(pageId);
        }
    };

    return (
        <div className="pages-manager-layout">
            {/* Sidebar */}
            <div className="pages-sidebar">
                <div className="sidebar-header">
                    <h2>CRM Admin</h2>
                    <p>Management Console</p>
                </div>
                <div className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'pages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pages')}
                    >
                        <span className="nav-icon">📄</span>
                        <span className="nav-label">Pages</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'linking' ? 'active' : ''}`}
                        onClick={() => setActiveTab('linking')}
                    >
                        <span className="nav-icon">🔗</span>
                        <span className="nav-label">Linking</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'mapping' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mapping')}
                    >
                        <span className="nav-icon">🗺️</span>
                        <span className="nav-label">Mapping</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'company' ? 'active' : ''}`}
                        onClick={() => setActiveTab('company')}
                    >
                        <span className="nav-icon">🏢</span>
                        <span className="nav-label">{currentCompany?.name || 'Company'} Admin</span>
                        {filteredInquiries && filteredInquiries.length > 0 && (
                            <span style={{ background: 'var(--danger)', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '10px', marginLeft: 'auto', fontWeight: 700 }}>
                                {filteredInquiries.length}
                            </span>
                        )}
                    </button>
                </div>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">{user?.username?.[0].toUpperCase() || 'U'}</div>
                        <div className="user-details">
                            <span className="user-role">{user?.role || 'User'}</span>
                            <span className="user-name">{user?.username}</span>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{currentCompany?.name}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={() => { logout(); navigate('/login'); }} title="Logout from console">
                        <span className="icon">Power</span>
                    </button>
                </div>

                <div className="sidebar-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
                    <button className="btn btn-primary btn-full" onClick={() => navigate('/')}>
                        Save & Finish
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="pages-main-content">
                {activeTab === 'pages' && (
                    <div className="tab-content animate-fade-in">
                        <div className="pages-manager-header">
                            <h1>Pages</h1>
                            <p>Create and manage your data collection pages</p>
                        </div>

                        <div className="pages-list">
                            {pages.map((page, index) => (
                                <div key={page.id} className={`card page-item stagger-${index + 1} animate-fade-in-up`}>
                                    <h3>Page {index + 1}: {page.name}</h3>
                                    <div className="page-item-actions">
                                        <button
                                            className="btn btn-accent btn-sm"
                                            onClick={() => navigate(`/data-entry/${page.id}`)}
                                        >
                                            View
                                        </button>
                                        <div className="divider"></div>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => navigate(`/edit-page/${page.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <div className="divider"></div>
                                        <button
                                            className="btn btn-danger-text btn-sm"
                                            onClick={() => handleDelete(page.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div
                                className="card card-dashed add-page-card animate-fade-in-up"
                                onClick={() => setShowModal(true)}
                            >
                                <span>+</span> Add Page
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'linking' && (
                    <div className="tab-content animate-fade-in">
                        <div className="linking-section">
                            <div className="linking-header">
                                <h2>Linking</h2>
                                <p>Connect your pages together by creating relational fields</p>
                            </div>

                            <div className="linking-controls card">
                                <div className="form-group">
                                    <label className="form-label">Target Page <span className="required">*</span></label>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                                        The page that will receive the linked fields.
                                    </p>
                                    <select
                                        className="form-input"
                                        value={linkTargetPageId}
                                        onChange={(e) => {
                                            setLinkTargetPageId(e.target.value);
                                            setSelectedSources([]); // Reset sources if target changes
                                        }}
                                    >
                                        <option value="">Select target page...</option>
                                        {pages.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {linkTargetPageId && (
                                    <div className="linking-step animate-fade-in-up" style={{ marginTop: 24, padding: 20, background: 'var(--bg)', borderRadius: 12 }}>
                                        <div className="linking-grid">
                                            <div className="form-group">
                                                <label className="form-label">Source Page to Link</label>
                                                <select
                                                    className="form-input"
                                                    value={linkSourcePageId}
                                                    onChange={(e) => setLinkSourcePageId(e.target.value)}
                                                >
                                                    <option value="">Select source page...</option>
                                                    {pages.filter(p => p.id !== Number(linkTargetPageId)).map(p => (
                                                        <option key={p.id} value={p.id}>{p.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Label Field (Display Name)</label>
                                                <select
                                                    className="form-input"
                                                    value={linkFieldName}
                                                    onChange={(e) => setLinkFieldName(e.target.value)}
                                                    disabled={!linkSourcePageId}
                                                >
                                                    <option value="">Select display field...</option>
                                                    {getAvailableFields(linkSourcePageId).map(f => (
                                                        <option key={f.id} value={f.label}>{f.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Display Name (Custom Label)</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={customLabel}
                                                    onChange={(e) => setCustomLabel(e.target.value)}
                                                    placeholder="e.g. Category Name"
                                                    disabled={!linkSourcePageId}
                                                />
                                            </div>

                                            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <button
                                                    className="btn btn-accent btn-full"
                                                    onClick={handleAddSource}
                                                    disabled={!linkSourcePageId}
                                                >
                                                    + Add Source
                                                </button>
                                            </div>
                                        </div>

                                        {/* Queue of selected sources */}
                                        {selectedSources.length > 0 && (
                                            <div className="selected-sources-list" style={{ marginTop: 24 }}>
                                                <label className="form-label" style={{ marginBottom: 12, display: 'block' }}>Sources to be linked:</label>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                                    {selectedSources.map(s => (
                                                        <div key={s.id} className="source-tag card" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid var(--accent)', background: 'white' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <span style={{ fontWeight: 600, fontSize: 13 }}>🏷️ {s.customLabel}</span>
                                                                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>📄 {s.name} ({s.fieldName})</span>
                                                            </div>
                                                            <button
                                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontWeight: 700, fontSize: 16 }}
                                                                onClick={() => removeSource(s.id)}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ marginTop: 32, padding: 20, background: 'var(--border)', borderRadius: 12 }}>
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontWeight: 700 }}>Common Name (Group Label) <span style={{ fontWeight: 400, fontSize: 12, opacity: 0.7 }}>Optional - Groups fields in same row</span></label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    style={{ background: 'white' }}
                                                    value={groupName}
                                                    onChange={(e) => setGroupName(e.target.value)}
                                                    placeholder="e.g. Pricing, Technical Specs, Logistic Details..."
                                                />
                                            </div>
                                            <button
                                                className="btn btn-primary btn-full"
                                                style={{ marginTop: 12 }}
                                                onClick={handleCreateLinks}
                                                disabled={selectedSources.length === 0}
                                            >
                                                🔗 Apply Links
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Existing Links List */}
                            {pageLinks.length > 0 && (
                                <div className="linking-relationship-map animate-fade-in-up">
                                    <div className="section-divider">
                                        <span>Relationship Map</span>
                                    </div>

                                    {Object.entries(
                                        pageLinks.reduce((acc, link) => {
                                            const targetId = link.targetPageId;
                                            if (!acc[targetId]) acc[targetId] = [];
                                            acc[targetId].push(link);
                                            return acc;
                                        }, {})
                                    ).map(([targetId, links]) => {
                                        const targetPage = pages.find(p => p.id === Number(targetId));
                                        if (!targetPage) return null;

                                        return (
                                            <div key={targetId} className="relationship-card card animate-fade-in-up">
                                                <div className="relationship-header">
                                                    <div className="relationship-target-info">
                                                        <span className="target-label">Target Page</span>
                                                        <h3 className="target-name">{targetPage.name}</h3>
                                                    </div>
                                                </div>

                                                <div className="relationship-sources">
                                                    {links.map(link => {
                                                        const sourcePage = pages.find(p => p.id === Number(link.sourcePageId));
                                                        return (
                                                            <div key={link.id} className="relationship-row">
                                                                <div className="source-info">
                                                                    <span className="source-icon">📄</span>
                                                                    <span className="source-name">{sourcePage?.name || 'Deleted Page'}</span>
                                                                </div>
                                                                <button
                                                                    className="btn btn-ghost btn-sm"
                                                                    onClick={() => deletePageLink(link.id)}
                                                                >
                                                                    ✕
                                                                </button>
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
                    </div>
                )}

                {activeTab === 'mapping' && (
                    <div className="tab-content animate-fade-in">
                        <div className="linking-section">
                            <div className="linking-header" style={{ borderLeftColor: '#7b1fa2' }}>
                                <h2>Mapping</h2>
                                <p>Configure specialized data mappings for hierarchy and visualization</p>
                            </div>

                            <div className="linking-controls card">
                                <div className="linking-grid" style={{ gridTemplateColumns: '1fr 1fr auto' }}>
                                    <div className="form-group">
                                        <label className="form-label">Target Page <span className="required">*</span></label>
                                        <select
                                            className="form-input"
                                            value={mappingTargetPageId}
                                            onChange={(e) => {
                                                setMappingTargetPageId(e.target.value);
                                                setMappingTargetFieldId('');
                                            }}
                                        >
                                            <option value="">Select target page...</option>
                                            {pages.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Target Field <span className="required">*</span></label>
                                        <select
                                            className="form-input"
                                            value={mappingTargetFieldId}
                                            onChange={(e) => setMappingTargetFieldId(e.target.value)}
                                            disabled={!mappingTargetPageId}
                                        >
                                            <option value="">{mappingTargetPageId ? 'Select field...' : 'Select page first'}</option>
                                            {getAvailableFields(mappingTargetPageId).map(f => (
                                                <option key={f.id} value={f.id}>{f.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ background: '#7b1fa2', height: '42px' }}
                                            onClick={handleAddMapping}
                                            disabled={!mappingTargetPageId || !mappingTargetFieldId}
                                        >
                                            Add Mapping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {fieldMappings.length > 0 && (
                            <div className="linking-relationship-map animate-fade-in-up" style={{ marginTop: 24 }}>
                                <div className="relationship-card card">
                                    <div className="relationship-sources">
                                        {fieldMappings.map(mapping => (
                                            <div key={mapping.id} className="relationship-row">
                                                <div className="source-info">
                                                    <span className="source-icon">🗺️</span>
                                                    <span className="source-name">{mapping.targetPageName}</span>
                                                </div>
                                                <div className="field-name-badge" style={{ background: '#f3e5f5', color: '#7b1fa2' }}>
                                                    {mapping.targetFieldName}
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/edit-hierarchy/${mapping.id}`)}>Edit</button>
                                                    <button className="btn btn-accent btn-sm" onClick={() => navigate(`/view-mapping/${mapping.id}`)}>View</button>
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

                {activeTab === 'company' && (
                    <div className="tab-content animate-fade-in dashboard-tab-content">
                        <div>
                            <div className="linking-header" style={{ borderLeftColor: 'var(--success)', marginBottom: '32px' }}>
                                <h2>{currentCompany?.name} Admin Console</h2>
                                <p>Central hub for managing your company catalogs and data entries</p>
                            </div>

                            {/* Dashboard Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                                <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: 'none' }}>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px' }}>Total Modules</div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>{pages.length}</div>
                                </div>
                                <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: 'none' }}>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px' }}>Total Entries</div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--success)' }}>
                                        {pages.reduce((acc, p) => acc + getPageEntries(p.id).length, 0)}
                                    </div>
                                </div>
                                <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: 'none' }}>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                        Customer Inquiries
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--danger)' }}>{filteredInquiries.length}</div>
                                </div>
                            </div>

                            {/* Public Profile & Inquiry Links */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                                <div className="card" style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed var(--success)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ margin: 0, color: 'var(--success)', fontSize: '16px', fontWeight: '700' }}>Your Public Profile</h4>
                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Showcases your company and all catalogs</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                style={{ background: 'var(--success)', borderColor: 'var(--success)' }}
                                                onClick={() => window.open(`${window.location.origin}/c/${currentCompanyId}`, '_blank')}
                                            >
                                                Open Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card" style={{ padding: '24px', background: 'rgba(79, 70, 229, 0.05)', border: '1px dashed var(--primary)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '16px', fontWeight: '700' }}>Standalone Contact Form</h4>
                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Direct link to your contact form</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => window.open(`${window.location.origin}/form/${currentCompanyId}`, '_blank')}
                                            >
                                                Open Form
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card" style={{ padding: '24px', background: 'rgba(236, 72, 153, 0.05)', border: '1px dashed #ec4899' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ margin: 0, color: '#ec4899', fontSize: '16px', fontWeight: '700' }}>Product Inquiry Form</h4>
                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Direct link to your product inquiry form</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                style={{ color: '#ec4899', borderColor: '#ec4899' }}
                                                onClick={() => window.open(`${window.location.origin}/p-form/${currentCompanyId}`, '_blank')}
                                            >
                                                Open Form
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pages Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                                {pages.map((page, index) => {
                                    const entryCount = getPageEntries(page.id).length;
                                    return (
                                        <div key={page.id} className="card page-item animate-fade-in-up" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ width: '40px', height: '40px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>
                                                        📦
                                                    </div>
                                                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>{page.name}</h3>
                                                    <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                                                        Catalog Management
                                                    </p>
                                                </div>
                                                <div style={{ background: 'var(--bg)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                                                    {entryCount} {entryCount === 1 ? 'Entry' : 'Entries'}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    style={{ flex: 1 }}
                                                    onClick={() => navigate(`/data-entry/${page.id}`)}
                                                >
                                                    Manage Catalog
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {pages.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '80px', background: '#f8fafc', borderRadius: '24px', border: '2px dashed var(--border)' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📁</div>
                                    <h3>No Pages Created Yet</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Start by creating your first company page in the "Pages" tab.</p>
                                    <button className="btn btn-primary" onClick={() => setActiveTab('pages')}>Go to Pages</button>
                                </div>
                            )}
                            {/* Inquiries Section Moved Inline */}
                            <div className="linking-header" style={{ borderLeftColor: 'var(--primary)', marginTop: '64px', marginBottom: '32px' }}>
                                <h2>Customer Inquiries</h2>
                                <p>Manage messages submitted through the contact form for {currentCompany?.name}</p>
                            </div>

                            {filteredInquiries && filteredInquiries.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {filteredInquiries.map(inquiry => (
                                        <div key={inquiry.id} style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{inquiry.subject || 'No Subject'}</h3>
                                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                        <strong>{inquiry.fullName}</strong> ({inquiry.email}) • {inquiry.submittedAt}
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn btn-outline"
                                                    style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '6px 12px' }}
                                                    onClick={() => deleteInquiry(inquiry.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px', fontSize: '14px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                                                {inquiry.phone && <div><span style={{ color: 'var(--text-muted)' }}>Phone:</span> {inquiry.phone}</div>}
                                                {inquiry.company && <div><span style={{ color: 'var(--text-muted)' }}>Company:</span> {inquiry.company}</div>}
                                            </div>

                                            <div style={{ marginBottom: '20px' }}>
                                                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>Message</h4>
                                                <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{inquiry.message}</p>
                                            </div>

                                            {inquiry.specifications && (
                                                <div>
                                                    <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>Technical Specifications</h4>
                                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, background: '#f1f5f9', padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>{inquiry.specifications}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '24px', border: '2px dashed var(--border)' }}>
                                    <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
                                    <h3>No Inquiries for {currentCompany?.name}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>Customer messages submitted via the public form will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Page Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Add New Page</h2>
                        <div className="form-group">
                            <label className="form-label">Page Name <span className="required">*</span></label>
                            <input
                                className="form-input"
                                value={newPageName}
                                onChange={(e) => setNewPageName(e.target.value)}
                                placeholder="e.g. Products..."
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && handleAddPage()}
                            />
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
