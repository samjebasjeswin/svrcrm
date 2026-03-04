"use client";
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function MySQLAdmin() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMySQLData = async () => {
        setLoading(true);
        try {
            // In a real app, we'd have a 'list all' endpoint. 
            // For this demo, we'll fetch the specific entries we know about.
            const companyId = '1772607207907';
            const pagesToFetch = ['1772608393100', '1772607220426']; // About Us and Products

            const allResults = [];
            for (const pageId of pagesToFetch) {
                const res = await fetch(`http://localhost:5000/api/data/${companyId}/${pageId}`);
                if (res.ok) {
                    const data = await res.json();
                    allResults.push({
                        companyId,
                        pageId,
                        name: pageId === '1772608393100' ? 'About Us' : 'Products',
                        content: data.values
                    });
                }
            }
            setEntries(allResults);
            if (allResults.length === 0) setError('No data found in MySQL yet. Save an entry in the CRM first!');
        } catch (err) {
            setError('Could not connect to MySQL Backend. Is it running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMySQLData();
    }, []);

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 800 }}>MySQL Database Explorer</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Viewing live data stored in `antigravity_crm` database.</p>
                </div>
                <button className="btn btn-outline" onClick={fetchMySQLData}>Reload Data</button>
            </div>

            {loading && <div style={{ textAlign: 'center', padding: '100px' }}>Loading database entries...</div>}
            {error && !loading && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            {!loading && !error && entries.map((entry, idx) => (
                <div key={idx} className="card" style={{ marginBottom: '24px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h3 style={{ fontWeight: 700, color: 'var(--primary)' }}>{entry.name}</h3>
                        <code style={{ fontSize: '12px', background: 'var(--border)', padding: '4px 8px', borderRadius: '4px' }}>
                            page_id: {entry.pageId}
                        </code>
                    </div>
                    <pre style={{
                        background: '#1e1e1e',
                        color: '#a9b7c6',
                        padding: '16px',
                        borderRadius: '8px',
                        overflowX: 'auto',
                        fontSize: '13px'
                    }}>
                        {JSON.stringify(entry.content, null, 2)}
                    </pre>
                </div>
            ))}
        </div>
    );
}
