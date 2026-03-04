import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*', // Allow all for this demo, or specifically 'http://localhost:5174'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '50mb' }));

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Assuming default empty password
    database: 'crm_db'
};

let pool;

async function initDb() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        await connection.end();

        pool = mysql.createPool(dbConfig);

        // Create tables
        await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id BIGINT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        initials VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id BIGINT PRIMARY KEY,
        company_id BIGINT,
        name VARCHAR(255),
        schema_json JSON,
        single_entry BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
      )
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS entries (
        id BIGINT PRIMARY KEY,
        company_id BIGINT,
        page_id BIGINT,
        data_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
        FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
      )
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS linkings (
        id VARCHAR(255) PRIMARY KEY,
        company_id BIGINT,
        source_page_id BIGINT,
        target_page_id BIGINT,
        mappings_json JSON,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
      )
    `);

        console.log('✅ CRM MySQL Database & Tables Initialized');
    } catch (err) {
        console.error('❌ Database Initialization Error:', err.message);
    }
}

// --- API Endpoints ---

// Get all CRM state (initial load)
app.get('/api/crm/state', async (req, res) => {
    try {
        const [companies] = await pool.query('SELECT * FROM companies');
        const [pages] = await pool.query('SELECT * FROM pages');
        const [entries] = await pool.query('SELECT * FROM entries');
        const [linkings] = await pool.query('SELECT * FROM linkings');

        // Format for AppContext
        const pagesMap = {};
        pages.forEach(p => {
            if (!pagesMap[p.company_id]) pagesMap[p.company_id] = [];
            pagesMap[p.company_id].push({ ...p, headings: p.schema_json });
        });

        const entriesMap = {};
        entries.forEach(e => {
            const key = `${e.company_id}_${e.page_id}`;
            if (!entriesMap[key]) entriesMap[key] = [];
            entriesMap[key].push({ id: e.id, data: e.data_json, savedAt: e.created_at });
        });

        const linksMap = {};
        linkings.forEach(l => {
            if (!linksMap[l.company_id]) linksMap[l.company_id] = [];
            linksMap[l.company_id].push({
                id: l.id,
                sourcePageId: l.source_page_id,
                targetPageId: l.target_page_id,
                mappings: l.mappings_json
            });
        });

        res.json({ companies, pages: pagesMap, savedEntries: entriesMap, linkings: linksMap });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update/Sync full state (Save All)
app.post('/api/crm/sync', async (req, res) => {
    const { companies, pages, savedEntries, linkings } = req.body;
    try {
        // This is a naive implementation that replaces/upserts data
        // Companies
        for (const c of companies) {
            await pool.query('INSERT INTO companies (id, name, initials) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), initials=VALUES(initials)', [c.id, c.name, c.initials]);
        }

        // Pages
        for (const companyId in pages) {
            for (const p of pages[companyId]) {
                await pool.query('INSERT INTO pages (id, company_id, name, schema_json, single_entry) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), schema_json=VALUES(schema_json)', [p.id, companyId, p.name, JSON.stringify(p.headings), p.singleEntry]);
            }
        }

        // Entries
        for (const key in savedEntries) {
            const [companyId, pageId] = key.split('_');
            for (const e of savedEntries[key]) {
                await pool.query('INSERT INTO entries (id, company_id, page_id, data_json) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE data_json=VALUES(data_json)', [e.id, companyId, pageId, JSON.stringify(e.data)]);
            }
        }

        // Linkings
        for (const companyId in linkings) {
            for (const l of linkings[companyId]) {
                await pool.query('INSERT INTO linkings (id, company_id, source_page_id, target_page_id, mappings_json) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE mappings_json=VALUES(mappings_json)', [l.id, companyId, l.sourcePageId, l.targetPageId, JSON.stringify(l.mappings)]);
            }
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, async () => {
    await initDb();
    console.log(`🚀 CRM Backend running on http://localhost:${PORT}`);
});
