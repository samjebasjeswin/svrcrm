"use client";
import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function ApiIde() {
    const { getPageEntries, currentCompanyId, companies, getCompanyPages } = useApp();
    const currentCompany = companies.find(c => c.id === currentCompanyId);
    const pages = getCompanyPages();

    const [selectedPageId, setSelectedPageId] = useState('');
    const [query, setQuery] = useState('');
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
                    fields.push({
                        ...f,
                        headingId: h.id,
                        subHeadingId: sh.id
                    });
                });
            });
        });
        return fields;
    }, [selectedPage]);

    useEffect(() => {
        if (selectedPage) {
            // Default query showing first few fields
            const fieldNames = availableFields.slice(0, 3).map(f => f.label).join('\n  ');
            setQuery(`query Get${selectedPage.name.replace(/\s+/g, '')} {\n  nodes {\n    ${fieldNames || 'id'}\n  }\n}`);
        }
    }, [selectedPage, availableFields]);

    const handleRunQuery = async () => {
        if (!selectedPageId) return;
        setIsLoading(true);
        setResponse(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 600));

            const entries = getPageEntries(selectedPageId);

            // Extract field names from the query
            // Try to find blocks inside { } first
            const fieldMatches = query.match(/{\s*([\s\S]*?)\s*}/g);
            let requestedFields = [];

            if (fieldMatches && fieldMatches.length > 0) {
                // Get the innermost block if nested
                const innerBlock = fieldMatches[fieldMatches.length - 1];
                requestedFields = innerBlock.replace(/[{}]/g, '').split(/[,\n]/)
                    .map(f => f.trim())
                    .filter(f => f && f !== 'nodes' && f !== 'id' && !f.includes('{'));
            } else if (query.trim()) {
                // If no braces, just split by newlines/commas and treat as labels
                requestedFields = query.split(/[,\n]/)
                    .map(f => f.trim())
                    .filter(f => f && !f.startsWith('#'));
            }

            // If still no requested fields, default to all available fields
            if (requestedFields.length === 0) {
                requestedFields = availableFields.map(f => f.label);
            }

            const formattedNodes = entries.map(entry => {
                const node = { id: entry.id };
                requestedFields.forEach(requestedLabel => {
                    const lowerRequested = requestedLabel.toLowerCase().trim();

                    const field = availableFields.find(f => {
                        const lowerLabel = f.label.toLowerCase();
                        return lowerLabel === lowerRequested ||
                            lowerLabel.includes(`(${lowerRequested})`) ||
                            lowerLabel.includes(`<${lowerRequested}>`) ||
                            lowerLabel.includes(lowerRequested);
                    });

                    if (field) {
                        const compositeKey = `${field.headingId}_${field.subHeadingId}_${field.id}`;
                        const key = requestedLabel.trim().toLowerCase().replace(/\s+/g, '_');
                        node[key] = entry.data[compositeKey] !== undefined ? entry.data[compositeKey] : null;
                    }
                });
                return node;
            });

            setResponse({
                data: {
                    [selectedPage.name.toLowerCase().replace(/\s+/g, '_')]: {
                        nodes: formattedNodes
                    }
                }
            });
        } catch (err) {
            setResponse({ errors: [{ message: err.message }] });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleRunQuery();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleRunQuery]);

    return (
        <div className="api-ide-v2" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#f8fafc',
            overflow: 'hidden'
        }}>
            {/* Top Toolbar */}
            <div style={{
                height: '48px',
                borderBottom: '1px solid #e2e8f0',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#ec4899', fontSize: '20px' }}>⚡</span>
                        API IDE
                    </div>

                    {/* Run Button in Toolbar */}
                    <button
                        onClick={handleRunQuery}
                        disabled={isLoading || !selectedPageId}
                        style={{
                            background: '#ec4899',
                            color: 'white',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(236,72,153,0.2)',
                            transition: 'all 0.2s',
                            opacity: (isLoading || !selectedPageId) ? 0.6 : 1
                        }}
                    >
                        {isLoading ? '...' : (
                            <>
                                <span style={{ fontSize: '14px' }}>▶️</span> Execute
                            </>
                        )}
                    </button>

                    <div style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                        {currentCompany?.name}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="tool-btn" style={{ color: '#64748b' }}>Prettify</button>
                    <button className="tool-btn" style={{ color: '#64748b' }}>History</button>
                    <div style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #e2e8f0', fontSize: '11px', color: '#94a3b8' }}>
                        Ctrl+Enter to Run
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{
                    width: '60px',
                    background: '#1e293b',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px 0',
                    gap: '20px'
                }}>
                    <div className="sidebar-icon active">▶️</div>
                    <div className="sidebar-icon">👤</div>
                    <div className="sidebar-icon">🛠️</div>
                </div>

                {/* Explorer/Sidebar Content */}
                <div style={{
                    width: '260px',
                    background: 'white',
                    borderRight: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '16px', fontWeight: 600, fontSize: '13px', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
                        RESOURCES
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                        {pages.map(page => (
                            <div
                                key={page.id}
                                onClick={() => setSelectedPageId(String(page.id))}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    marginBottom: '4px',
                                    transition: 'all 0.2s',
                                    background: selectedPageId === String(page.id) ? '#fdf2f8' : 'transparent',
                                    color: selectedPageId === String(page.id) ? '#ec4899' : '#475569',
                                    fontWeight: selectedPageId === String(page.id) ? 600 : 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <span style={{ opacity: 0.6 }}>📄</span>
                                {page.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor & Response Area */}
                <div style={{ flex: 1, display: 'flex', position: 'relative' }}>

                    {/* Query Editor Pane */}
                    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 16px', background: '#f8fafc', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                            Query Editor
                        </div>
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            spellCheck="false"
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                padding: '20px',
                                fontFamily: '"Fira Code", monospace',
                                fontSize: '14px',
                                color: '#1e293b',
                                resize: 'none',
                                lineHeight: '1.6'
                            }}
                            placeholder="# Enter your query here..."
                        />
                    </div>

                    {/* Response Pane */}
                    <div style={{ flex: 1, background: '#fafafa', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 16px', background: '#f8fafc', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                            Response
                            <span style={{ color: '#10b981' }}>{response ? '200 OK' : ''}</span>
                        </div>
                        <div style={{
                            flex: 1,
                            padding: '20px',
                            overflowY: 'auto',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '13px',
                            color: '#475569'
                        }}>
                            {isLoading ? (
                                <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>Executing query...</div>
                            ) : response ? (
                                <pre style={{ margin: 0 }}>{JSON.stringify(response, null, 2)}</pre>
                            ) : (
                                <div style={{ color: '#cbd5e1', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    {selectedPageId ? 'Click the run button to see results' : 'Select a resource to begin'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .tool-btn {
                    background: transparent;
                    border: none;
                    font-size: 13px;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                .tool-btn:hover {
                    background: #f1f5f9;
                }
                .sidebar-icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    alignItems: center;
                    justify-content: center;
                    border-radius: 8px;
                    cursor: pointer;
                    color: rgba(255,255,255,0.4);
                    transition: all 0.2s;
                    font-size: 18px;
                }
                .sidebar-icon:hover {
                    background: rgba(255,255,255,0.1);
                    color: white;
                }
                .sidebar-icon.active {
                    background: rgba(236,72,153,0.1);
                    color: #ec4899;
                }
                @font-face {
                    font-family: 'Fira Code';
                    src: url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap');
                }
            `}</style>
        </div>
    );
}
