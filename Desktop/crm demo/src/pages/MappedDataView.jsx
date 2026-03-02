import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MappedDataView() {
    const { mappingId } = useParams();
    const navigate = useNavigate();
    const { fieldMappings, getPageEntries, getPage } = useApp();

    const mapping = fieldMappings.find(m => m.id === Number(mappingId));

    if (!mapping) {
        return (
            <div className="page-center">
                <div style={{ textAlign: 'center' }}>
                    <h2>Mapping not found</h2>
                    <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/pages')}>
                        Back to Pages
                    </button>
                </div>
            </div>
        );
    }

    const targetPage = getPage(mapping.targetPageId);
    const entries = getPageEntries(mapping.targetPageId);

    // Find the field key based on the field ID
    const getFieldKeyForId = (page, fieldId) => {
        let fieldKey = null;
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

    return (
        <div className="mapped-view animate-fade-in-up" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="view-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ margin: 0 }}>Mapped Data: {mapping.targetPageName}</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Showing entries for field: <strong>{mapping.targetFieldName}</strong>
                    </p>
                </div>
                <button className="btn btn-ghost" onClick={() => navigate('/pages')}>
                    Back to Pages
                </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
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
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No entries found for this page.
                                </td>
                            </tr>
                        ) : (
                            entries.map((entry, idx) => (
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
                                            onClick={() => navigate(`/data-entry/${mapping.targetPageId}/${entry.id}`)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
