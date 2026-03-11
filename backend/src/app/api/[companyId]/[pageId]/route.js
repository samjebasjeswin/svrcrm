import { NextResponse } from 'next/server';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    const { companyId, pageId } = await params;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    try {
        const stateRes = await fetch('http://localhost:5001/api/crm/state', { cache: 'no-store' });
        if (!stateRes.ok) throw new Error('Failed to fetch state');
        const state = await stateRes.json();

        const pages = state.pages[companyId] || [];
        let selectedPage = pages.find(p => String(p.id) === String(pageId));

        if (!selectedPage) {
            selectedPage = pages.find(p => {
                const lowerName = p.name?.toLowerCase() || '';
                const queryStr = String(pageId).toLowerCase();
                return lowerName === queryStr ||
                    lowerName.replace(/\s+/g, '-') === queryStr ||
                    (lowerName === 'form' && queryStr === 'contact');
            });
        }

        if (!selectedPage) {
            console.error('Page not found:', companyId, pageId);
            return NextResponse.json({ error: 'Page not found', _debug: { companyId, pageId, cachedPagesKeys: Object.keys(state.pages) } }, { status: 404, headers: CORS_HEADERS });
        }

        const entriesMap = state.savedEntries || {};
        const entries = entriesMap[`${companyId}_${selectedPage.id}`] || [];

        // extract available fields
        const availableFields = [];
        (selectedPage.headings || selectedPage.schema_json || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    availableFields.push({
                        ...f,
                        headingId: h.id,
                        subHeadingId: sh.id
                    });
                });
            });
        });

        // Parse query string (GraphQL-lite parser)
        const fieldMatches = query.match(/{\s*([\s\S]*?)\s*}/g);
        let requestedFields = [];

        if (fieldMatches && fieldMatches.length > 0) {
            const innerBlock = fieldMatches[fieldMatches.length - 1];
            requestedFields = innerBlock.replace(/[{}]/g, '').split(/[,\n]/)
                .map(f => f.trim())
                .filter(f => f && f !== 'nodes' && f !== 'id' && !f.includes('{'));
        } else if (query.trim()) {
            requestedFields = query.split(/[,\n]/)
                .map(f => f.trim())
                .filter(f => f && !f.startsWith('#'));
        }

        if (requestedFields.length === 0) {
            requestedFields = availableFields.map(f => f.label);
        }

        const formattedNodes = entries.map(entry => {
            const node = { id: entry.id };
            requestedFields.forEach(requestedLabel => {
                const lowerRequested = requestedLabel.toLowerCase().trim();

                const field = availableFields.find(f => {
                    const lowerLabel = f.label?.toLowerCase() || '';
                    return lowerLabel === lowerRequested ||
                        lowerLabel.includes(`(${lowerRequested})`) ||
                        lowerLabel.includes(`<${lowerRequested}>`) ||
                        lowerLabel.includes(lowerRequested);
                });

                if (field) {
                    const compositeKey = `${field.headingId}_${field.subHeadingId}_${field.id}`;
                    const entryData = typeof entry.data === 'string' ? JSON.parse(entry.data) : entry.data;
                    const key = requestedLabel.trim().toLowerCase().replace(/\s+/g, '_');
                    node[key] = entryData?.[compositeKey] !== undefined ? entryData[compositeKey] : null;
                } else {
                    const entryData = typeof entry.data === 'string' ? JSON.parse(entry.data) : (entry.data || entry.data_json);
                    const parsedData = typeof entryData === 'string' ? JSON.parse(entryData) : entryData;
                    const key = requestedLabel.trim();
                    node[key] = parsedData?.[key] !== undefined ? parsedData[key] : null;
                }
            });
            return node;
        });

        return NextResponse.json({
            data: {
                [(selectedPage.name || 'page').toLowerCase().replace(/\s+/g, '_')]: {
                    nodes: formattedNodes
                }
            }
        }, { headers: CORS_HEADERS });
    } catch (err) {
        return NextResponse.json({ errors: [{ message: err.message }] }, { status: 500, headers: CORS_HEADERS });
    }
}

export async function POST(request, { params }) {
    const { companyId, pageId } = await params;

    try {
        const body = await request.json();

        // 1. Fetch current state
        const stateRes = await fetch('http://localhost:5001/api/crm/state', { cache: 'no-store' });
        if (!stateRes.ok) throw new Error('Failed to fetch state');
        const state = await stateRes.json();

        const pages = state.pages[companyId] || [];
        let selectedPage = pages.find(p => String(p.id) === String(pageId));

        if (!selectedPage) {
            selectedPage = pages.find(p => {
                const lowerName = p.name?.toLowerCase() || '';
                const queryStr = String(pageId).toLowerCase();
                return lowerName === queryStr ||
                    lowerName.replace(/\s+/g, '-') === queryStr ||
                    (lowerName === 'form' && queryStr === 'contact');
            });
        }

        if (!selectedPage) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404, headers: CORS_HEADERS });
        }

        const availableFields = [];
        (selectedPage.headings || selectedPage.schema_json || []).forEach(h => {
            (h.subHeadings || []).forEach(sh => {
                (sh.fields || []).forEach(f => {
                    availableFields.push({
                        ...f,
                        headingId: h.id,
                        subHeadingId: sh.id
                    });
                });
            });
        });

        const entryData = {};
        for (const [key, value] of Object.entries(body)) {
            const field = availableFields.find(f => f.label === key || String(f.id) === key);
            if (field) {
                const compositeKey = `${field.headingId}_${field.subHeadingId}_${field.id}`;
                entryData[compositeKey] = value;
            } else {
                entryData[key] = value;
            }
        }

        const entryId = Date.now();
        const newEntry = { id: entryId, data: entryData, savedAt: new Date().toISOString() };

        // Append to state.savedEntries
        const entriesKey = `${companyId}_${selectedPage.id}`;
        if (!state.savedEntries) state.savedEntries = {};
        if (!state.savedEntries[entriesKey]) state.savedEntries[entriesKey] = [];
        state.savedEntries[entriesKey].push(newEntry);

        // 2. Sync back to Express (sync endpoint expects the full payload)
        const syncRes = await fetch('http://localhost:5001/api/crm/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companies: state.companies || [],
                pages: state.pages || {},
                savedEntries: state.savedEntries || {},
                linkings: state.linkings || {}
            })
        });

        if (!syncRes.ok) throw new Error('Failed to sync state');

        return NextResponse.json({ success: true, id: entryId }, { headers: CORS_HEADERS });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
    }
}
