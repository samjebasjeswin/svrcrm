"use client";
import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function InboundLinksView() {
    const { pageId, entryId } = useParams();
    const router = useRouter();
    const { getPage, getInboundLinks, getLinkedEntryDisplayValue } = useApp();

    const page = getPage(pageId);
    const links = useMemo(() => getInboundLinks(pageId, entryId), [pageId, entryId, getInboundLinks]);
    const displayValue = useMemo(() => getLinkedEntryDisplayValue(pageId, entryId), [pageId, entryId, getLinkedEntryDisplayValue]);

    if (!page) return <div className="dashboard-page">Page not found</div>;

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <button className="btn btn-ghost" onClick={() => router.push(`/data-entry/${pageId}`)} style={{ marginBottom: '10px', paddingLeft: 0 }}>
                        ← Back to {page.name} Catalog
                    </button>
                    <h1>Inbound Links</h1>
                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                        Items linking to "{displayValue}"
                    </p>
                </div>
            </div>

            <div className="table-container animate-fade-in-up" style={{ marginTop: '20px' }}>
                {links.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {links.map((link, idx) => (
                            <div key={idx} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '20px', background: 'white', borderRadius: '16px', border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s hover'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '48px', height: '48px', background: 'rgba(79,70,229,0.1)',
                                        color: 'var(--accent)', borderRadius: '12px', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                                    }}>
                                        📦
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
                                            {link.sourcePageName}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                            {link.sourceEntryLabel}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => router.push(`/data-entry/${link.sourcePageId}/${link.sourceEntryId}`)}
                                    style={{ padding: '8px 20px', fontWeight: '700' }}
                                >
                                    Edit Entry →
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center', padding: '80px 20px', background: 'white',
                        borderRadius: '24px', border: '2px dashed var(--border)'
                    }}>
                        <div style={{ fontSize: '60px', marginBottom: '24px' }}>🔗</div>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>No Inbound Links Found</h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                            Currently, no other entries in the system are linked to this {page.name.toLowerCase()} item.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
