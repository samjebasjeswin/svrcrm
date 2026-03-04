module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/crm demo/backend/src/context/AppContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
const INITIAL_COMPANIES = [
    {
        id: 1,
        name: 'SVR Global Solutions India',
        role: 'Company Admin',
        initials: 'SG'
    },
    {
        id: 2,
        name: 'Demo Testing Company',
        role: 'Company Admin',
        initials: 'DT'
    }
];
const STORAGE_KEY = 'crm_demo_data';
function AppProvider({ children }) {
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_COMPANIES);
    const [currentCompanyId, setCurrentCompanyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [savedEntries, setSavedEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [pageLinks, setPageLinks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fieldMappings, setFieldMappings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inquiries, setInquiries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isInitialLoad, setIsInitialLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Hydrate from localStorage on mount (client only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const c = localStorage.getItem(`${STORAGE_KEY}_companies`);
            if (c) setCompanies(JSON.parse(c));
            const cc = localStorage.getItem(`${STORAGE_KEY}_currentCompanyId`);
            if (cc) setCurrentCompanyId(JSON.parse(cc));
            const p = localStorage.getItem(`${STORAGE_KEY}_pages`);
            if (p) setPages(JSON.parse(p));
            const e = localStorage.getItem(`${STORAGE_KEY}_entries`);
            if (e) setSavedEntries(JSON.parse(e));
            const l = localStorage.getItem(`${STORAGE_KEY}_links`);
            if (l) setPageLinks(JSON.parse(l));
            const m = localStorage.getItem(`${STORAGE_KEY}_mappings`);
            if (m) setFieldMappings(JSON.parse(m));
            const u = localStorage.getItem(`${STORAGE_KEY}_user`);
            if (u) setUser(JSON.parse(u));
            const i = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
            if (i) setInquiries(JSON.parse(i));
        } catch (err) {
            console.warn('Failed to hydrate from localStorage:', err);
        }
        setHasMounted(true);
    }, []);
    // Initial Fetch from MySQL
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchInitialData = async ()=>{
            try {
                const res = await fetch('http://localhost:5000/api/crm/state');
                if (res.ok) {
                    const data = await res.json();
                    if (data.companies && data.companies.length > 0) {
                        setCompanies(data.companies || []);
                        setPages(data.pages || {});
                        setSavedEntries(data.savedEntries || {});
                        // Linkings might be links/mappings in this file
                        // setPageLinks(data.linkings?.[currentCompanyId] || []); 
                        console.log('📦 Loaded state from MySQL');
                    } else {
                        console.log('🚚 No data in MySQL, using LocalStorage...');
                    }
                }
            } catch (err) {
                console.warn('MySQL Fetch failed, using LocalStorage:', err.message);
            } finally{
                setIsInitialLoad(false);
            }
        };
        fetchInitialData();
    }, []);
    // Sync with LocalStorage & MySQL (only after hydration)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasMounted) return;
        localStorage.setItem(`${STORAGE_KEY}_companies`, JSON.stringify(companies));
        localStorage.setItem(`${STORAGE_KEY}_currentCompanyId`, JSON.stringify(currentCompanyId));
        localStorage.setItem(`${STORAGE_KEY}_pages`, JSON.stringify(pages));
        localStorage.setItem(`${STORAGE_KEY}_entries`, JSON.stringify(savedEntries));
        localStorage.setItem(`${STORAGE_KEY}_links`, JSON.stringify(pageLinks));
        localStorage.setItem(`${STORAGE_KEY}_mappings`, JSON.stringify(fieldMappings));
        localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
        localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
        const syncToMySQL = async ()=>{
            if (isInitialLoad) return;
            try {
                await fetch('http://localhost:5000/api/crm/sync', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        companies,
                        pages,
                        savedEntries,
                        linkings: {
                            [currentCompanyId]: pageLinks
                        },
                        inquiries
                    })
                });
                console.log('✅ Synced with MySQL');
            } catch (err) {
                console.warn('MySQL Sync failed:', err.message);
            }
        };
        syncToMySQL();
    }, [
        hasMounted,
        companies,
        currentCompanyId,
        pages,
        savedEntries,
        pageLinks,
        fieldMappings,
        user,
        inquiries,
        isInitialLoad
    ]);
    const addCompany = (company, includeDefaultPages = false)=>{
        const newId = Date.now();
        const initials = company.companyName.split(' ').map((w)=>w[0]).join('').toUpperCase().slice(0, 2);
        const newCompany = {
            id: newId,
            name: company.companyName,
            role: 'Company Admin',
            initials,
            details: company
        };
        setCompanies((prev)=>[
                ...prev,
                newCompany
            ]);
        setCurrentCompanyId(newId);
        // Create default pages if requested
        let initialPages = [];
        if (includeDefaultPages) {
            initialPages = [
                {
                    id: Date.now() + 10,
                    name: 'home page',
                    headings: [
                        {
                            id: Date.now() + 11,
                            title: 'Welcome Section',
                            subHeadings: [
                                {
                                    id: Date.now() + 12,
                                    title: '',
                                    fields: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: Date.now() + 20,
                    name: 'Contact Us',
                    headings: [
                        {
                            id: Date.now() + 21,
                            title: 'Contact Details',
                            subHeadings: [
                                {
                                    id: Date.now() + 22,
                                    title: '',
                                    fields: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: Date.now() + 30,
                    name: 'Product Inquiry',
                    headings: [
                        {
                            id: Date.now() + 31,
                            title: 'Product Info',
                            subHeadings: [
                                {
                                    id: Date.now() + 32,
                                    title: '',
                                    fields: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: Date.now() + 40,
                    name: 'Static SEO',
                    headings: [
                        {
                            id: Date.now() + 41,
                            title: 'SEO Meta Data',
                            subHeadings: [
                                {
                                    id: Date.now() + 42,
                                    title: 'Standard Meta Tags',
                                    fields: [
                                        {
                                            id: Date.now() + 43,
                                            label: 'Web Page Title (<title>)',
                                            valueType: 'Text',
                                            placeholder: 'Title of the web page'
                                        },
                                        {
                                            id: Date.now() + 44,
                                            label: 'Meta Description (<meta name="description">)',
                                            valueType: 'Text',
                                            placeholder: 'Enter a concise description of the page (150-160 chars)'
                                        },
                                        {
                                            id: Date.now() + 45,
                                            label: 'Meta Keywords (<meta name="keywords">)',
                                            valueType: 'Text',
                                            placeholder: 'keyword1, keyword2, keyword3'
                                        },
                                        {
                                            id: Date.now() + 46,
                                            label: 'Robots (<meta name="robots">)',
                                            valueType: 'Text',
                                            placeholder: 'index, follow'
                                        },
                                        {
                                            id: Date.now() + 47,
                                            label: 'Website Name (<meta name="author">)',
                                            valueType: 'Text',
                                            placeholder: 'e.g. Valves Only - USA'
                                        },
                                        {
                                            id: Date.now() + 48,
                                            label: 'Refresh (<meta name="refresh">)',
                                            valueType: 'Text',
                                            placeholder: '30'
                                        },
                                        {
                                            id: Date.now() + 49,
                                            label: 'Canonical URL (<link rel="canonical">)',
                                            valueType: 'Text',
                                            placeholder: 'https://www.yourwebsite.com/'
                                        }
                                    ]
                                },
                                {
                                    id: Date.now() + 50,
                                    title: 'Open Graph Data',
                                    fields: [
                                        {
                                            id: Date.now() + 51,
                                            label: 'OG Title (<meta property="og:title">)',
                                            valueType: 'Text',
                                            placeholder: 'Social media title'
                                        },
                                        {
                                            id: Date.now() + 52,
                                            label: 'OG Type (<meta property="og:type">)',
                                            valueType: 'Text',
                                            placeholder: 'website, article'
                                        },
                                        {
                                            id: Date.now() + 53,
                                            label: 'OG URL (<meta property="og:url">)',
                                            valueType: 'Text',
                                            placeholder: 'https://www.yourwebsite.com/page-url'
                                        },
                                        {
                                            id: Date.now() + 54,
                                            label: 'OG Image (<meta property="og:image">)',
                                            valueType: 'Image',
                                            placeholder: ''
                                        },
                                        {
                                            id: Date.now() + 55,
                                            label: 'OG Description (<meta property="og:description">)',
                                            valueType: 'Text',
                                            placeholder: 'Social media description'
                                        },
                                        {
                                            id: Date.now() + 56,
                                            label: 'OG Locale (<meta property="og:locale">)',
                                            valueType: 'Text',
                                            placeholder: 'en_US'
                                        },
                                        {
                                            id: Date.now() + 57,
                                            label: 'OG Site Name (<meta property="og:site_name">)',
                                            valueType: 'Text',
                                            placeholder: 'Your Website Name'
                                        },
                                        {
                                            id: Date.now() + 58,
                                            label: 'Article Published Time (<meta property="article:published_time">)',
                                            valueType: 'Text',
                                            placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00'
                                        },
                                        {
                                            id: Date.now() + 59,
                                            label: 'Article Modified Time (<meta property="article:modified_time">)',
                                            valueType: 'Text',
                                            placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00'
                                        },
                                        {
                                            id: Date.now() + 60,
                                            label: 'Article Author (<meta property="article:author">)',
                                            valueType: 'Text',
                                            placeholder: 'Author URL'
                                        }
                                    ]
                                },
                                {
                                    id: Date.now() + 61,
                                    title: 'Twitter Card Data',
                                    fields: [
                                        {
                                            id: Date.now() + 62,
                                            label: 'Twitter Card (<meta name="twitter:card">)',
                                            valueType: 'Text',
                                            placeholder: 'summary_large_image'
                                        },
                                        {
                                            id: Date.now() + 63,
                                            label: 'Twitter Site (<meta name="twitter:site">)',
                                            valueType: 'Text',
                                            placeholder: '@yourwebsite'
                                        },
                                        {
                                            id: Date.now() + 64,
                                            label: 'Twitter Title (<meta name="twitter:title">)',
                                            valueType: 'Text',
                                            placeholder: 'Social Title'
                                        },
                                        {
                                            id: Date.now() + 65,
                                            label: 'Twitter Description (<meta name="twitter:description">)',
                                            valueType: 'Text',
                                            placeholder: 'Social Description'
                                        },
                                        {
                                            id: Date.now() + 66,
                                            label: 'Twitter Creator (<meta name="twitter:creator">)',
                                            valueType: 'Text',
                                            placeholder: '@yourtwitter'
                                        },
                                        {
                                            id: Date.now() + 67,
                                            label: 'Twitter Image (<meta name="twitter:image">)',
                                            valueType: 'Image',
                                            placeholder: ''
                                        }
                                    ]
                                },
                                {
                                    id: Date.now() + 68,
                                    title: 'Dublin Core Metadata',
                                    fields: [
                                        {
                                            id: Date.now() + 69,
                                            label: 'DC Title (<meta name="dc.title">)',
                                            valueType: 'Text',
                                            placeholder: 'Dublin Core Title'
                                        },
                                        {
                                            id: Date.now() + 70,
                                            label: 'DC Description (<meta name="dc.description">)',
                                            valueType: 'Text',
                                            placeholder: 'Dublin Core Description'
                                        },
                                        {
                                            id: Date.now() + 71,
                                            label: 'DC Subject (<meta name="dc.subject">)',
                                            valueType: 'Text',
                                            placeholder: 'Keywords, Subject'
                                        },
                                        {
                                            id: Date.now() + 72,
                                            label: 'DC Created (<meta name="dc.created">)',
                                            valueType: 'Text',
                                            placeholder: 'YYYY-MM-DD'
                                        },
                                        {
                                            id: Date.now() + 73,
                                            label: 'DC Modified (<meta name="dc.modified">)',
                                            valueType: 'Text',
                                            placeholder: 'YYYY-MM-DD'
                                        },
                                        {
                                            id: Date.now() + 74,
                                            label: 'DC Language (<meta name="dc.language">)',
                                            valueType: 'Text',
                                            placeholder: 'en'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: Date.now() + 80,
                    name: 'Mailer Settings',
                    headings: [
                        {
                            id: Date.now() + 81,
                            title: 'MAILER SETTINGS',
                            subHeadings: [
                                {
                                    id: Date.now() + 82,
                                    title: 'Configure SMTP settings for sending OTP and notification emails.',
                                    fields: [
                                        {
                                            id: Date.now() + 83,
                                            label: 'SMTP HOST',
                                            valueType: 'Text',
                                            placeholder: 'smtp.gmail.com'
                                        },
                                        {
                                            id: Date.now() + 84,
                                            label: 'SMTP PORT',
                                            valueType: 'Number',
                                            placeholder: '465'
                                        },
                                        {
                                            id: Date.now() + 85,
                                            label: 'SMTP USER',
                                            valueType: 'Text',
                                            placeholder: 'user@gmail.com'
                                        },
                                        {
                                            id: Date.now() + 86,
                                            label: 'SMTP PASSWORD',
                                            valueType: 'Password',
                                            placeholder: '••••••••'
                                        },
                                        {
                                            id: Date.now() + 87,
                                            label: 'FROM EMAIL ADDRESS',
                                            valueType: 'Text',
                                            placeholder: 'noreply@company.com'
                                        }
                                    ]
                                },
                                {
                                    id: Date.now() + 88,
                                    title: 'ADMIN NOTIFICATION EMAILS',
                                    fields: [
                                        {
                                            id: Date.now() + 89,
                                            label: 'Email Recipients',
                                            valueType: 'Grid',
                                            infinity: true,
                                            gridCols: [
                                                {
                                                    label: 'Email Address',
                                                    type: 'Text'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
        }
        setPages((prev)=>({
                ...prev,
                [newId]: initialPages
            }));
        return newId;
    };
    const updateCompany = (id, updatedCompany)=>{
        setCompanies((prev)=>prev.map((c)=>c.id === id ? {
                    ...c,
                    ...updatedCompany
                } : c));
    };
    const selectCompany = (id)=>{
        setCurrentCompanyId(id);
        if (!pages[id]) {
            setPages((prev)=>({
                    ...prev,
                    [id]: []
                }));
        }
    };
    const getCompanyPages = ()=>pages[currentCompanyId] || [];
    const addPage = (pageName)=>{
        const newPage = {
            id: Date.now(),
            name: pageName,
            headings: [
                {
                    id: Date.now() + 1,
                    title: 'Basic Information',
                    subHeadings: [
                        {
                            id: Date.now() + 2,
                            title: '',
                            fields: []
                        }
                    ]
                }
            ]
        };
        setPages((prev)=>({
                ...prev,
                [currentCompanyId]: [
                    ...prev[currentCompanyId] || [],
                    newPage
                ]
            }));
        return newPage.id;
    };
    const deletePage = (pageId)=>{
        setPages((prev)=>({
                ...prev,
                [currentCompanyId]: (prev[currentCompanyId] || []).filter((p)=>p.id !== pageId)
            }));
        // Clean up links where this page was source or target
        setPageLinks((prev)=>prev.filter((l)=>l.sourcePageId !== pageId && l.targetPageId !== pageId));
        // Clean up entries
        setSavedEntries((prev)=>{
            const newEntries = {
                ...prev
            };
            delete newEntries[`${currentCompanyId}_${pageId}`];
            return newEntries;
        });
    };
    const updatePage = (pageId, updatedPage)=>{
        setPages((prev)=>({
                ...prev,
                [currentCompanyId]: (prev[currentCompanyId] || []).map((p)=>p.id === pageId ? {
                        ...p,
                        ...updatedPage
                    } : p)
            }));
    };
    const getPage = (pageId)=>{
        return (pages[currentCompanyId] || []).find((p)=>p.id === Number(pageId));
    };
    // Ensure a "form" page exists with submission fields; create/repair if needed
    const ensureFormPage = ()=>{
        if (!currentCompanyId) return;
        const currentPages = pages[currentCompanyId] || [];
        const existing = currentPages.find((p)=>p.name.toLowerCase().trim() === 'form');
        const formFields = [
            {
                id: Date.now() + 3,
                label: 'Full Name',
                valueType: 'Text',
                placeholder: 'Submitted name'
            },
            {
                id: Date.now() + 4,
                label: 'Email Address',
                valueType: 'Text',
                placeholder: 'Submitted email'
            },
            {
                id: Date.now() + 5,
                label: 'Message',
                valueType: 'Text',
                placeholder: 'Submitted message'
            },
            {
                id: Date.now() + 6,
                label: 'Product Name',
                valueType: 'Text',
                placeholder: 'Product name (for product inquiries)'
            },
            {
                id: Date.now() + 7,
                label: 'Quantity',
                valueType: 'Text',
                placeholder: 'Quantity'
            },
            {
                id: Date.now() + 8,
                label: 'Type',
                valueType: 'Text',
                placeholder: 'contact / product'
            },
            {
                id: Date.now() + 9,
                label: 'Submitted At',
                valueType: 'Text',
                placeholder: 'Submission timestamp'
            }
        ];
        if (!existing) {
            const formPage = {
                id: Date.now(),
                name: 'form',
                headings: [
                    {
                        id: Date.now() + 1,
                        title: 'Form Submissions',
                        subHeadings: [
                            {
                                id: Date.now() + 2,
                                title: '',
                                fields: formFields
                            }
                        ]
                    }
                ]
            };
            setPages((prev)=>({
                    ...prev,
                    [currentCompanyId]: [
                        ...prev[currentCompanyId] || [],
                        formPage
                    ]
                }));
        } else {
            // Repair: if form page exists but has no fields, add them
            const hasFields = existing.headings?.some((h)=>h.subHeadings?.some((sh)=>sh.fields?.length > 0));
            if (!hasFields) {
                const updatedPage = {
                    ...existing,
                    headings: [
                        {
                            id: existing.headings[0]?.id || Date.now() + 1,
                            title: 'Form Submissions',
                            subHeadings: [
                                {
                                    id: existing.headings[0]?.subHeadings?.[0]?.id || Date.now() + 2,
                                    title: '',
                                    fields: formFields
                                }
                            ]
                        }
                    ]
                };
                setPages((prev)=>({
                        ...prev,
                        [currentCompanyId]: (prev[currentCompanyId] || []).map((p)=>p.id === existing.id ? updatedPage : p)
                    }));
            }
        }
    };
    const ensureSeoPage = ()=>{
        if (!currentCompanyId) return;
        const currentPages = pages[currentCompanyId] || [];
        const existingIndex = currentPages.findIndex((p)=>p.name.toLowerCase().trim() === 'static seo');
        // Schema definition for comparison/creation
        const seoSchema = {
            name: 'Static SEO',
            headings: [
                {
                    id: Date.now() + 41,
                    title: 'SEO Meta Data',
                    subHeadings: [
                        {
                            id: Date.now() + 42,
                            title: 'Standard Meta Tags',
                            fields: [
                                {
                                    id: Date.now() + 43,
                                    label: 'Web Page Title (<title>)',
                                    valueType: 'Text',
                                    placeholder: 'Title of the web page'
                                },
                                {
                                    id: Date.now() + 44,
                                    label: 'Meta Description (<meta name="description">)',
                                    valueType: 'Text',
                                    placeholder: 'Enter a concise description of the page (150-160 chars)'
                                },
                                {
                                    id: Date.now() + 45,
                                    label: 'Meta Keywords (<meta name="keywords">)',
                                    valueType: 'Text',
                                    placeholder: 'keyword1, keyword2, keyword3'
                                },
                                {
                                    id: Date.now() + 46,
                                    label: 'Robots (<meta name="robots">)',
                                    valueType: 'Text',
                                    placeholder: 'index, follow'
                                },
                                {
                                    id: Date.now() + 47,
                                    label: 'Website Name (<meta name="author">)',
                                    valueType: 'Text',
                                    placeholder: 'e.g. Valves Only - USA'
                                },
                                {
                                    id: Date.now() + 48,
                                    label: 'Refresh (<meta name="refresh">)',
                                    valueType: 'Text',
                                    placeholder: '30'
                                },
                                {
                                    id: Date.now() + 49,
                                    label: 'Canonical URL (<link rel="canonical">)',
                                    valueType: 'Text',
                                    placeholder: 'https://www.yourwebsite.com/'
                                }
                            ]
                        },
                        {
                            id: Date.now() + 50,
                            title: 'Open Graph Data',
                            fields: [
                                {
                                    id: Date.now() + 51,
                                    label: 'OG Title (<meta property="og:title">)',
                                    valueType: 'Text',
                                    placeholder: 'Social media title'
                                },
                                {
                                    id: Date.now() + 52,
                                    label: 'OG Type (<meta property="og:type">)',
                                    valueType: 'Text',
                                    placeholder: 'website, article'
                                },
                                {
                                    id: Date.now() + 53,
                                    label: 'OG URL (<meta property="og:url">)',
                                    valueType: 'Text',
                                    placeholder: 'https://www.yourwebsite.com/page-url'
                                },
                                {
                                    id: Date.now() + 54,
                                    label: 'OG Image (<meta property="og:image">)',
                                    valueType: 'Image',
                                    placeholder: ''
                                },
                                {
                                    id: Date.now() + 55,
                                    label: 'OG Description (<meta property="og:description">)',
                                    valueType: 'Text',
                                    placeholder: 'Social media description'
                                },
                                {
                                    id: Date.now() + 56,
                                    label: 'OG Locale (<meta property="og:locale">)',
                                    valueType: 'Text',
                                    placeholder: 'en_US'
                                },
                                {
                                    id: Date.now() + 57,
                                    label: 'OG Site Name (<meta property="og:site_name">)',
                                    valueType: 'Text',
                                    placeholder: 'Your Website Name'
                                },
                                {
                                    id: Date.now() + 58,
                                    label: 'Article Published Time (<meta property="article:published_time">)',
                                    valueType: 'Text',
                                    placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00'
                                },
                                {
                                    id: Date.now() + 59,
                                    label: 'Article Modified Time (<meta property="article:modified_time">)',
                                    valueType: 'Text',
                                    placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00'
                                },
                                {
                                    id: Date.now() + 60,
                                    label: 'Article Author (<meta property="article:author">)',
                                    valueType: 'Text',
                                    placeholder: 'Author URL'
                                }
                            ]
                        },
                        {
                            id: Date.now() + 61,
                            title: 'Twitter Card Data',
                            fields: [
                                {
                                    id: Date.now() + 62,
                                    label: 'Twitter Card (<meta name="twitter:card">)',
                                    valueType: 'Text',
                                    placeholder: 'summary_large_image'
                                },
                                {
                                    id: Date.now() + 63,
                                    label: 'Twitter Site (<meta name="twitter:site">)',
                                    valueType: 'Text',
                                    placeholder: '@yourwebsite'
                                },
                                {
                                    id: Date.now() + 64,
                                    label: 'Twitter Title (<meta name="twitter:title">)',
                                    valueType: 'Text',
                                    placeholder: 'Social Title'
                                },
                                {
                                    id: Date.now() + 65,
                                    label: 'Twitter Description (<meta name="twitter:description">)',
                                    valueType: 'Text',
                                    placeholder: 'Social Description'
                                },
                                {
                                    id: Date.now() + 66,
                                    label: 'Twitter Creator (<meta name="twitter:creator">)',
                                    valueType: 'Text',
                                    placeholder: '@yourtwitter'
                                },
                                {
                                    id: Date.now() + 67,
                                    label: 'Twitter Image (<meta name="twitter:image">)',
                                    valueType: 'Image',
                                    placeholder: ''
                                }
                            ]
                        },
                        {
                            id: Date.now() + 68,
                            title: 'Dublin Core Metadata',
                            fields: [
                                {
                                    id: Date.now() + 69,
                                    label: 'DC Title (<meta name="dc.title">)',
                                    valueType: 'Text',
                                    placeholder: 'Dublin Core Title'
                                },
                                {
                                    id: Date.now() + 70,
                                    label: 'DC Description (<meta name="dc.description">)',
                                    valueType: 'Text',
                                    placeholder: 'Dublin Core Description'
                                },
                                {
                                    id: Date.now() + 71,
                                    label: 'DC Subject (<meta name="dc.subject">)',
                                    valueType: 'Text',
                                    placeholder: 'Keywords, Subject'
                                },
                                {
                                    id: Date.now() + 72,
                                    label: 'DC Created (<meta name="dc.created">)',
                                    valueType: 'Text',
                                    placeholder: 'YYYY-MM-DD'
                                },
                                {
                                    id: Date.now() + 73,
                                    label: 'DC Modified (<meta name="dc.modified">)',
                                    valueType: 'Text',
                                    placeholder: 'YYYY-MM-DD'
                                },
                                {
                                    id: Date.now() + 74,
                                    label: 'DC Language (<meta name="dc.language">)',
                                    valueType: 'Text',
                                    placeholder: 'en'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        if (existingIndex === -1) {
            setPages((prev)=>({
                    ...prev,
                    [currentCompanyId]: [
                        ...prev[currentCompanyId] || [],
                        {
                            ...seoSchema,
                            id: Date.now() + 400
                        }
                    ]
                }));
        } else {
            // Repair logic: check if labels match. If they are the old ones (don't contain '<'), update the page structure.
            const existingPage = currentPages[existingIndex];
            const needsUpdate = !existingPage.headings?.[0]?.subHeadings?.[0]?.fields?.[0]?.label?.includes('<');
            if (needsUpdate) {
                setPages((prev)=>{
                    const updatedPages = [
                        ...prev[currentCompanyId] || []
                    ];
                    updatedPages[existingIndex] = {
                        ...existingPage,
                        headings: seoSchema.headings
                    };
                    return {
                        ...prev,
                        [currentCompanyId]: updatedPages
                    };
                });
            }
        }
    };
    const ensureMailerSettingsPage = ()=>{
        if (!currentCompanyId) return;
        const currentPages = pages[currentCompanyId] || [];
        const existing = currentPages.find((p)=>p.name.toLowerCase().trim() === 'mailer settings');
        if (!existing) {
            const newPage = {
                id: Date.now() + 80,
                name: 'Mailer Settings',
                headings: [
                    {
                        id: Date.now() + 81,
                        title: 'MAILER SETTINGS',
                        subHeadings: [
                            {
                                id: Date.now() + 82,
                                title: 'Configure SMTP settings for sending OTP and notification emails.',
                                fields: [
                                    {
                                        id: Date.now() + 83,
                                        label: 'SMTP HOST',
                                        valueType: 'Text',
                                        placeholder: 'smtp.gmail.com'
                                    },
                                    {
                                        id: Date.now() + 84,
                                        label: 'SMTP PORT',
                                        valueType: 'Number',
                                        placeholder: '465'
                                    },
                                    {
                                        id: Date.now() + 85,
                                        label: 'SMTP USER',
                                        valueType: 'Text',
                                        placeholder: 'user@gmail.com'
                                    },
                                    {
                                        id: Date.now() + 86,
                                        label: 'SMTP PASSWORD',
                                        valueType: 'Password',
                                        placeholder: '••••••••'
                                    },
                                    {
                                        id: Date.now() + 87,
                                        label: 'FROM EMAIL ADDRESS',
                                        valueType: 'Text',
                                        placeholder: 'noreply@company.com'
                                    }
                                ]
                            },
                            {
                                id: Date.now() + 88,
                                title: 'ADMIN NOTIFICATION EMAILS',
                                fields: [
                                    {
                                        id: Date.now() + 89,
                                        label: 'Email Recipients',
                                        valueType: 'Grid',
                                        infinity: true,
                                        gridCols: [
                                            {
                                                label: 'Email Address',
                                                type: 'Text'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            setPages((prev)=>({
                    ...prev,
                    [currentCompanyId]: [
                        ...prev[currentCompanyId] || [],
                        newPage
                    ]
                }));
        }
    };
    // Call once on mount or when currentCompanyId changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ensureFormPage();
        ensureSeoPage();
        ensureMailerSettingsPage();
    }, [
        currentCompanyId
    ]);
    // ---- Saved Entries (shared across pages for linking) ----
    const addEntry = (pageId, entryData)=>{
        const key = `${currentCompanyId}_${pageId}`;
        const entry = {
            id: Date.now(),
            data: entryData,
            savedAt: new Date().toLocaleString()
        };
        setSavedEntries((prev)=>({
                ...prev,
                [key]: [
                    ...prev[key] || [],
                    entry
                ]
            }));
        return entry;
    };
    const updateEntry = (pageId, entryId, entryData)=>{
        const key = `${currentCompanyId}_${pageId}`;
        setSavedEntries((prev)=>({
                ...prev,
                [key]: (prev[key] || []).map((e)=>e.id === Number(entryId) ? {
                        ...e,
                        data: entryData,
                        updatedAt: new Date().toLocaleString()
                    } : e)
            }));
    };
    const deleteEntry = (pageId, entryId)=>{
        const key = `${currentCompanyId}_${pageId}`;
        setSavedEntries((prev)=>({
                ...prev,
                [key]: (prev[key] || []).filter((e)=>e.id !== Number(entryId))
            }));
    };
    const getPageEntries = (pageId, companyId)=>{
        const key = `${companyId || currentCompanyId}_${pageId}`;
        return savedEntries[key] || [];
    };
    // Get display value for a linked entry: use specific field if provided, else fallback to first field
    const getLinkedEntryDisplayValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pageId, entryId, displayFieldName)=>{
        const entries = getPageEntries(pageId);
        const entry = entries.find((e)=>e.id === Number(entryId));
        if (!entry || !entry.data) return '';
        const pageArr = pages[currentCompanyId] || [];
        const page = pageArr.find((p)=>p.id === Number(pageId));
        if (!page) return '';
        // If a specific field name is requested, find its value
        if (displayFieldName) {
            for (const heading of page.headings || []){
                for (const sub of heading.subHeadings || []){
                    for (const field of sub.fields || []){
                        if (field.label === displayFieldName) {
                            const key = `${heading.id}_${sub.id}_${field.id}`;
                            const val = entry.data[key];
                            if (val !== undefined && val !== null && val !== '') return val.toString();
                        }
                    }
                }
            }
        }
        // Fallback: Find the first populated field's value
        for (const heading of page.headings || []){
            for (const sub of heading.subHeadings || []){
                for (const field of sub.fields || []){
                    const key = `${heading.id}_${sub.id}_${field.id}`;
                    const val = entry.data[key];
                    if (val !== undefined && val !== null && val !== '') return val.toString();
                    // Check for grid fields
                    if (field.valueType === 'Grid') {
                        for(let i = 0; i < (field.gridCols?.length || 0); i++){
                            const gVal = entry.data[`${key}_col${i}`];
                            if (gVal !== undefined && gVal !== null && gVal !== '') return gVal.toString();
                        }
                    }
                }
            }
        }
        return `Entry #${entryId}`;
    }, [
        getPageEntries,
        pages,
        currentCompanyId
    ]);
    const getInboundLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((targetPageId, targetEntryId)=>{
        const inboundLinks = [];
        const targetIdStr = String(targetEntryId);
        // Only iterate over pages in the current company to maximize performance
        const companyPages = pages[currentCompanyId] || [];
        companyPages.forEach((page)=>{
            // Find all Link fields in this page that point to targetPageId
            const linkFields = [];
            page.headings?.forEach((h)=>{
                h.subHeadings?.forEach((sh)=>{
                    sh.fields?.forEach((f)=>{
                        if (f && f.valueType === 'Link' && String(f.linkedPageId) === String(targetPageId)) {
                            linkFields.push({
                                pageId: page.id,
                                pageName: page.name,
                                fieldId: f.id,
                                compositeKey: `${h.id}_${sh.id}_${f.id}`
                            });
                        }
                    });
                });
            });
            if (linkFields.length > 0) {
                // Find entries for this page that have these link fields populated with targetEntryId
                const entries = getPageEntries(page.id);
                entries.forEach((entry)=>{
                    if (!entry || !entry.data) return;
                    linkFields.forEach((lf)=>{
                        if (String(entry.data[lf.compositeKey] || "") === targetIdStr) {
                            inboundLinks.push({
                                sourcePageId: page.id,
                                sourcePageName: page.name,
                                sourceEntryId: entry.id,
                                sourceEntryLabel: getLinkedEntryDisplayValue(page.id, entry.id)
                            });
                        }
                    });
                });
            }
        });
        return inboundLinks;
    }, [
        currentCompanyId,
        pages,
        getPageEntries,
        getLinkedEntryDisplayValue
    ]);
    const addPageLinks = (links)=>{
        if (!links || links.length === 0) return;
        // Add to link history with shared batchId for grouping
        const batchId = Date.now();
        const newLinksBatch = links.map((l)=>({
                ...l,
                id: Date.now() + Math.random(),
                batchId
            }));
        setPageLinks((prev)=>[
                ...prev,
                ...newLinksBatch
            ]);
        const targetPageId = links[0].targetPageId;
        const targetPage = getPage(targetPageId);
        if (targetPage) {
            // Create a deep copy of headings to avoid mutation issues
            const updatedHeadings = JSON.parse(JSON.stringify(targetPage.headings));
            if (updatedHeadings.length === 0) {
                updatedHeadings.push({
                    id: Date.now(),
                    title: 'Linked Data',
                    subHeadings: []
                });
            }
            const mainHeading = updatedHeadings[0];
            newLinksBatch.forEach((link, idx)=>{
                let targetSubHeading;
                if (link.groupName) {
                    // Find or create a named sub-heading
                    targetSubHeading = mainHeading.subHeadings.find((sh)=>sh.title === link.groupName);
                    if (!targetSubHeading) {
                        targetSubHeading = {
                            id: Date.now() + Math.random() + idx,
                            title: link.groupName,
                            fields: []
                        };
                        mainHeading.subHeadings.push(targetSubHeading);
                    }
                } else {
                    // Default to the first sub-heading or create one
                    if (mainHeading.subHeadings.length === 0) {
                        mainHeading.subHeadings.push({
                            id: Date.now() + Math.random() + idx,
                            title: '',
                            fields: []
                        });
                    }
                    targetSubHeading = mainHeading.subHeadings[0];
                }
                // Add the field with precise metadata
                targetSubHeading.fields.push({
                    id: Date.now() + Math.random() + idx,
                    label: link.linkName || `Link to ${getPage(link.sourcePageId)?.name}`,
                    valueType: 'Link',
                    linkedPageId: link.sourcePageId,
                    displayFieldName: link.sourceFieldName,
                    linkId: link.id,
                    required: false
                });
            });
            updatePage(targetPageId, {
                headings: updatedHeadings
            });
        }
    };
    const updatePageLink = (id, linkData)=>{
        setPageLinks((prev)=>{
            const link = prev.find((l)=>l.id === id);
            if (!link) return prev;
            const updatedLink = {
                ...link,
                ...linkData
            };
            // Update the page field too
            const targetPage = getPage(link.targetPageId);
            if (targetPage) {
                const updatedHeadings = JSON.parse(JSON.stringify(targetPage.headings));
                updatedHeadings.forEach((h)=>{
                    h.subHeadings.forEach((sh)=>{
                        sh.fields.forEach((f)=>{
                            if (f.linkId === id) {
                                f.label = updatedLink.linkName || f.label;
                                f.linkedPageId = updatedLink.sourcePageId || f.linkedPageId;
                                f.displayFieldName = updatedLink.sourceFieldName || f.displayFieldName;
                            }
                        });
                    });
                });
                updatePage(link.targetPageId, {
                    headings: updatedHeadings
                });
            }
            return prev.map((l)=>l.id === id ? updatedLink : l);
        });
    };
    const deletePageLink = (linkId)=>{
        setPageLinks((prev)=>{
            const link = prev.find((l)=>l.id === linkId);
            if (link) {
                // Also remove the field from the target page
                const targetPage = getPage(link.targetPageId);
                if (targetPage) {
                    const updatedHeadings = JSON.parse(JSON.stringify(targetPage.headings));
                    updatedHeadings.forEach((h)=>{
                        h.subHeadings.forEach((sh)=>{
                            sh.fields = sh.fields.filter((f)=>f.linkId !== linkId);
                        });
                    });
                    updatePage(link.targetPageId, {
                        headings: updatedHeadings
                    });
                }
            }
            return prev.filter((l)=>l.id !== linkId);
        });
    };
    if (!hasMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: 'var(--bg, #0f172a)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loader",
                        style: {
                            margin: '0 auto 16px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/context/AppContext.jsx",
                        lineNumber: 782,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            opacity: 0.6
                        },
                        children: "Loading CRM..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/context/AppContext.jsx",
                        lineNumber: 783,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/context/AppContext.jsx",
                lineNumber: 781,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/crm demo/backend/src/context/AppContext.jsx",
            lineNumber: 780,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            companies,
            currentCompanyId,
            addCompany,
            updateCompany,
            selectCompany,
            getCompanyPages,
            addPage,
            deletePage,
            updatePage,
            getPage,
            addEntry,
            updateEntry,
            deleteEntry,
            getPageEntries,
            getLinkedEntryDisplayValue,
            getInboundLinks,
            pageLinks,
            addPageLinks,
            updatePageLink,
            deletePageLink,
            ensureFormPage,
            fieldMappings,
            addFieldMapping: (m)=>setFieldMappings((prev)=>[
                        ...prev,
                        {
                            ...m,
                            id: Date.now()
                        }
                    ]),
            updateFieldMapping: (id, m)=>setFieldMappings((prev)=>prev.map((item)=>item.id === id ? {
                            ...item,
                            ...m
                        } : item)),
            deleteFieldMapping: (id)=>setFieldMappings((prev)=>prev.filter((m)=>m.id !== id)),
            // ---- Inquiries ----
            addInquiry: (inquiryData, companyId, type = 'contact')=>{
                const newInquiry = {
                    id: Date.now(),
                    ...inquiryData,
                    type,
                    status: 'New',
                    companyId: companyId ? Number(companyId) : null,
                    submittedAt: new Date().toLocaleString()
                };
                setInquiries((prev)=>[
                        newInquiry,
                        ...prev
                    ]);
            },
            updateInquiryStatus: (id, status)=>{
                setInquiries((prev)=>prev.map((i)=>i.id === id ? {
                            ...i,
                            status
                        } : i));
            },
            deleteInquiry: (id)=>setInquiries((prev)=>prev.filter((i)=>i.id !== id)),
            submitExternalForm: (companyId, type, data)=>{
                const cid = Number(companyId);
                const cleanData = {
                    ...data
                };
                const typeStr = String(type || '').toLowerCase().trim();
                // --- Store in inquiries (General List) ---
                const newInquiry = {
                    id: Date.now(),
                    ...cleanData,
                    type: typeStr,
                    status: 'New',
                    seen: false,
                    companyId: cid,
                    submittedAt: new Date().toLocaleString()
                };
                setInquiries((prev)=>[
                        newInquiry,
                        ...prev
                    ]);
                // --- Dynamic Routing logic ---
                let companyPages = pages[cid] || [];
                // 1. Try to find page by ID or Name
                let targetPage = companyPages.find((p)=>String(p.id) === typeStr || p.name.toLowerCase().trim() === typeStr);
                // 2. Fallback to 'form' page if not found
                if (!targetPage) {
                    targetPage = companyPages.find((p)=>p.name.toLowerCase().trim() === 'form');
                }
                // 3. Auto-create 'form' page if still missing
                if (!targetPage && typeStr === 'contact') {
                    const standardFormFields = [
                        {
                            id: Date.now() + 103,
                            label: 'Full Name',
                            valueType: 'Text',
                            placeholder: 'Submitted name'
                        },
                        {
                            id: Date.now() + 104,
                            label: 'Email Address',
                            valueType: 'Text',
                            placeholder: 'Submitted email'
                        },
                        {
                            id: Date.now() + 105,
                            label: 'Message',
                            valueType: 'Text',
                            placeholder: 'Submitted message'
                        }
                    ];
                    targetPage = {
                        id: Date.now() + 100,
                        name: 'form',
                        headings: [
                            {
                                id: Date.now() + 101,
                                title: 'Form Submissions',
                                subHeadings: [
                                    {
                                        id: Date.now() + 102,
                                        title: '',
                                        fields: standardFormFields
                                    }
                                ]
                            }
                        ]
                    };
                    setPages((prev)=>({
                            ...prev,
                            [cid]: [
                                ...prev[cid] || [],
                                targetPage
                            ]
                        }));
                }
                if (targetPage) {
                    const entryData = {};
                    const fieldLabelMap = {
                        'name': 'Full Name',
                        'email': 'Email Address',
                        'message': 'Message',
                        'product': 'Product Name',
                        'quantity': 'Quantity'
                    };
                    for (const heading of targetPage.headings || []){
                        for (const sub of heading.subHeadings || []){
                            for (const field of sub.fields || []){
                                const fieldKey = `${heading.id}_${sub.id}_${field.id}`;
                                // Check direct matches first (ID or Label)
                                if (cleanData[field.id]) {
                                    entryData[fieldKey] = cleanData[field.id];
                                } else if (cleanData[field.label]) {
                                    entryData[fieldKey] = cleanData[field.label];
                                } else {
                                    // Check logic-based mapping (name -> Full Name)
                                    for (const [dataKey, labelName] of Object.entries(fieldLabelMap)){
                                        if (field.label.toLowerCase() === labelName.toLowerCase() && cleanData[dataKey]) {
                                            entryData[fieldKey] = cleanData[dataKey];
                                        }
                                    }
                                }
                                // Auto-fill some fields
                                if (field.label === 'Submitted At' || field.label === 'Date') {
                                    entryData[fieldKey] = entryData[fieldKey] || new Date().toLocaleString();
                                }
                            }
                        }
                    }
                    const entryKey = `${cid}_${targetPage.id}`;
                    const entry = {
                        id: Date.now() + 1,
                        data: entryData,
                        savedAt: new Date().toLocaleString()
                    };
                    setSavedEntries((prev)=>({
                            ...prev,
                            [entryKey]: [
                                ...prev[entryKey] || [],
                                entry
                            ]
                        }));
                }
            },
            inquiries,
            pages,
            user,
            login: (username, password)=>{
                if (username === 'superadmin' && password === 'pass') {
                    const newUser = {
                        username,
                        role: 'Super Admin'
                    };
                    setUser(newUser);
                    return {
                        success: true,
                        user: newUser
                    };
                }
                if (username === 'systemadmin' && password === 'pass') {
                    const newUser = {
                        username,
                        role: 'System Admin'
                    };
                    setUser(newUser);
                    return {
                        success: true,
                        user: newUser
                    };
                }
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            },
            logout: ()=>setUser(null)
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/crm demo/backend/src/context/AppContext.jsx",
        lineNumber: 790,
        columnNumber: 5
    }, this);
}
function useApp() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2678adcb._.js.map