import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export default function ApiIde() {
    const { getCompanyPages, currentCompanyId, submitExternalForm, companies } = useApp();
    const currentCompany = companies.find(c => c.id === currentCompanyId);
    const pages = getCompanyPages();

    const [selectedPageId, setSelectedPageId] = useState('');
    const [testData, setTestData] = useState({});
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const selectedPage = useMemo(() => {
        return pages.find(p => String(p.id) === selectedPageId);
    }, [pages, selectedPageId]);

    const availableFields = useMemo(() => {
        if (!selectedPage) return [];
        const fields = [];
        (selectedPage.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    fields.push(f);
                });
            });
        });
        return fields;
    }, [selectedPage]);

    const handlePageChange = (id) => {
        setSelectedPageId(id);
        const initialData = {};
        // Find fields for the selected page
        const page = pages.find(p => String(p.id) === id);
        if (page) {
            (page.headings || []).forEach(h => {
                (h.subHeadings || []).forEach(sh => {
                    (sh.fields || []).forEach(f => {
                        initialData[f.label] = '';
                    });
                });
            });
        }
        setTestData(initialData);
        setResponse(null);
    };

    const handleInputChange = (fieldLabel, value) => {
        setTestData(prev => ({
            ...prev,
            [fieldLabel]: value
        }));
    };

    const handleSendRequest = async () => {
        if (!selectedPageId) return;
        setIsLoading(true);
        setResponse(null);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Actually call the context method to store the data
            submitExternalForm(currentCompanyId, selectedPageId, testData);

            setResponse({
                status: 200,
                statusText: 'OK',
                body: {
                    success: true,
                    message: `Data successfully submitted to ${selectedPage.name}`,
                    receivedData: testData,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (err) {
            setResponse({
                status: 500,
                statusText: 'Internal Server Error',
                body: {
                    success: false,
                    error: err.message
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const generateJsonSchema = () => {
        const schema = {
            endpoint: `${window.location.origin}/api/${currentCompanyId}/${selectedPageId}`,
            method: 'POST',
            payload: testData
        };
        return JSON.stringify(schema, null, 2);
    };

    return (
        <div className="api-ide animate-fade-in" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
            <div className="view-header">
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ background: '#ec4899', color: 'white', padding: '6px', borderRadius: '8px', fontSize: '20px' }}>🧪</span>
                        API IDE Playground
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Test and debug your dynamic API endpoints for <strong>{currentCompany?.name}</strong>
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', flex: 1, minHeight: 0 }}>
                {/* Sidebar: Page Selection */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Select API Endpoint</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {pages.map(page => (
                            <button
                                key={page.id}
                                onClick={() => handlePageChange(String(page.id))}
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1.5px solid',
                                    borderColor: selectedPageId === String(page.id) ? '#ec4899' : 'var(--border)',
                                    background: selectedPageId === String(page.id) ? 'rgba(236,72,153,0.05)' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <span style={{ opacity: selectedPageId === String(page.id) ? 1 : 0.5 }}>📄</span>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 600, fontSize: '13px', color: selectedPageId === String(page.id) ? '#ec4899' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {page.name}
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {page.id}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content: Form and Response */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0, overflowY: 'auto' }}>
                    {!selectedPageId ? (
                        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', borderStyle: 'dashed' }}>
                            <div style={{ fontSize: '48px' }}>📡</div>
                            <div style={{ textAlign: 'center' }}>
                                <h3>No Endpoint Selected</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Select a page from the left to start testing its API endpoint.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Editor Area */}
                            <div className="card animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        Request Body
                                        <span className="badge" style={{ background: '#eef2ff', color: 'var(--accent)', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>JSON</span>
                                    </h3>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        style={{ background: '#ec4899' }}
                                        onClick={handleSendRequest}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Sending...' : '⚡ Send Request'}
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    {/* Interactive Form */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Interactive Form</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                                            {availableFields.length === 0 ? (
                                                <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-muted)' }}>No fields defined for this page.</p>
                                            ) : (
                                                availableFields.map(field => (
                                                    <div key={field.id} className="form-group">
                                                        <label className="form-label">
                                                            {field.label}
                                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '6px' }}>({field.valueType})</span>
                                                        </label>
                                                        <input
                                                            className="form-input"
                                                            placeholder={field.placeholder || 'Enter value...'}
                                                            value={testData[field.label] || ''}
                                                            onChange={(e) => handleInputChange(field.label, e.target.value)}
                                                        />
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Raw JSON Preview */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Raw Payload</div>
                                        <div style={{
                                            background: '#1e293b',
                                            color: '#e2e8f0',
                                            padding: '16px',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            fontFamily: 'monospace',
                                            height: '400px',
                                            overflow: 'auto'
                                        }}>
                                            <pre style={{ margin: 0 }}>{generateJsonSchema()}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Response Area */}
                            <div className="card animate-fade-in-up stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        Response
                                        {response && (
                                            <span style={{
                                                fontSize: '11px',
                                                background: response.status === 200 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                                                color: response.status === 200 ? 'var(--success)' : 'var(--danger)',
                                                padding: '2px 8px',
                                                borderRadius: '4px'
                                            }}>
                                                {response.status} {response.statusText}
                                            </span>
                                        )}
                                    </h3>
                                    {response && (
                                        <button className="btn btn-ghost btn-sm" onClick={() => setResponse(null)}>Clear</button>
                                    )}
                                </div>

                                <div style={{
                                    minHeight: '200px',
                                    background: '#0f172a',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    color: '#94a3b8',
                                    fontSize: '13px',
                                    fontFamily: 'monospace',
                                    position: 'relative',
                                    border: '1.5px solid #1e293b'
                                }}>
                                    {isLoading ? (
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.8)', borderRadius: '12px' }}>
                                            <div className="loader"></div>
                                        </div>
                                    ) : !response ? (
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                            No request sent yet. Enter data above and click Send Request.
                                        </div>
                                    ) : (
                                        <div className="response-table-wrapper">
                                            <table className="response-table">
                                                <thead>
                                                    <tr>
                                                        <th>Key</th>
                                                        <th>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(response.body).map(([key, value]) => (
                                                        <tr key={key}>
                                                            <td>{key}</td>
                                                            <td>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                 .loader {
                     width: 24px;
                     height: 24px;
                     border: 3px solid rgba(236,72,153,0.1);
                     border-left-color: #ec4899;
                     border-radius: 50%;
                     animation: spin 1s linear infinite;
                 }
                 @keyframes spin {
                     to { transform: rotate(360deg); }
                 }
                 .response-table {
                     width: 100%;
                     border-collapse: collapse;
                     margin-top: 8px;
                 }
                 .response-table th, .response-table td {
                     border: 1px solid var(--border);
                     padding: 6px 10px;
                     text-align: left;
                     color: #e2e8f0;
                 }
                 .response-table th {
                     background: var(--bg-card);
                     color: var(--text-primary);
                 }
            `}</style>
        </div>
    );
}
