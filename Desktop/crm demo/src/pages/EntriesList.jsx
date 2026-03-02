import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EntriesList() {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const { getPage, getPageEntries, currentCompanyId, deleteEntry } = useApp();

    const page = getPage(pageId);
    const entries = getPageEntries(pageId);

    const fields = useMemo(() => {
        const allFields = [];
        (page?.headings || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    allFields.push({
                        ...f,
                        compositeKey: `${h.id}_${sh.id}_${f.id}`
                    });
                });
            });
        });
        return allFields;
    }, [page]);

    // Use first field for table columns
    const tableColumns = fields.slice(0, 1);

    const filteredEntries = useMemo(() => {
        return entries;
    }, [entries]);

    if (!page) return <div className="dashboard-page">Page not found</div>;

    const handleDelete = (entryId) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            deleteEntry(pageId, entryId);
        }
    };

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <button className="btn btn-ghost" onClick={() => navigate('/pages')} style={{ marginBottom: '10px', paddingLeft: 0 }}>
                        ← Back to Admin
                    </button>
                    <h1>{page.name} Catalog</h1>
                    <p>Manage and browse your {page.name.toLowerCase()} entries</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/data-entry/${pageId}/new`)}
                >
                    <span style={{ fontSize: '18px', marginRight: '8px' }}>+</span> Add New {page.name}
                </button>
            </div>


            <div className="table-container animate-fade-in-up">
                <table className="premium-table">
                    <thead>
                        <tr>
                            {tableColumns.map(col => (
                                <th key={col.id}>{col.label}</th>
                            ))}
                            <th style={{ textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEntries.length > 0 ? filteredEntries.map((entry, idx) => (
                            <tr key={entry.id || idx}>
                                {tableColumns.map(col => {
                                    const val = entry.data[col.compositeKey];
                                    return <td key={col.id}>{val || '—'}</td>
                                })}
                                <td style={{ textAlign: 'right' }}>
                                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                        <button
                                            className="action-icon-btn"
                                            title="Edit"
                                            onClick={() => navigate(`/data-entry/${pageId}/${entry.id}`)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="action-icon-btn delete"
                                            title="Delete"
                                            onClick={() => handleDelete(entry.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={tableColumns.length + 1} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                    No entries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
