module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/context/AppContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function AppLayout({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { companies, currentCompanyId, getCompanyPages, getPageEntries, inquiries, user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const currentCompany = companies.find((c)=>c.id === currentCompanyId);
    const pages = getCompanyPages();
    const newInquiries = inquiries.filter((i)=>i.companyId === currentCompanyId && i.status === 'New').length;
    const isActive = (path)=>pathname === path;
    const isTabActive = (tab)=>searchParams.get('tab') === tab;
    const sidebarSections = [
        {
            label: 'SUPER ADMIN',
            items: pages.filter((page)=>page.superAdminEnabled !== false).map((page)=>{
                const count = getPageEntries(page.id).length;
                const lowerName = page.name.toLowerCase().trim();
                const isForm = lowerName === 'form';
                const isSettingsPage = page.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';
                let targetPath = `/entries/${page.id}`;
                if (isSettingsPage) {
                    const entries = getPageEntries(page.id);
                    if (entries.length > 0) {
                        targetPath = `/data-entry/${page.id}/${entries[0].id}`;
                    } else {
                        targetPath = `/data-entry/${page.id}/new`;
                    }
                } else if (isForm) {
                    targetPath = `/entries/${page.id}`;
                }
                return {
                    icon: isForm ? '📋' : '📦',
                    label: page.name,
                    sublabel: `${count} ${count === 1 ? 'entry' : 'entries'}`,
                    badge: isForm && newInquiries > 0 ? newInquiries : null,
                    path: targetPath
                };
            })
        },
        ...user?.role === 'System Admin' || user?.role === 'Super Admin' ? [
            {
                label: 'MAPPING ADMIN',
                hideLabel: true,
                items: [
                    {
                        icon: '🗺️',
                        label: 'Mapping',
                        path: '/pages?tab=mapping'
                    }
                ]
            }
        ] : [],
        ...user?.role === 'System Admin' ? [
            {
                label: 'SYSTEM ADMIN',
                hideLabel: false,
                items: [
                    {
                        icon: '+',
                        label: 'Add Page',
                        path: '/pages'
                    },
                    {
                        icon: '📄',
                        label: 'Pages',
                        path: '/pages'
                    },
                    {
                        icon: '🔗',
                        label: 'Linking',
                        path: '/pages?tab=linking'
                    },
                    {
                        icon: '📡',
                        label: 'API Report',
                        path: '/pages?tab=api'
                    },
                    {
                        icon: '🧪',
                        label: 'API IDE',
                        path: '/api-ide'
                    }
                ]
            }
        ] : []
    ];
    const handleNav = (path)=>{
        router.push(path);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--bg)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '240px',
                    minWidth: '240px',
                    background: '#0f172a',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px 18px 16px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            cursor: 'pointer'
                        },
                        onClick: ()=>router.push('/'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        color: 'white',
                                        flexShrink: 0
                                    },
                                    children: currentCompany?.initials || '?'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        overflow: 'hidden'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            color: 'white',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        },
                                        children: currentCompany?.name || 'Select Company'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                        lineNumber: 93,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    user?.role !== 'Super Admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '12px 14px 8px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/pages'),
                            style: {
                                width: '100%',
                                padding: '9px 14px',
                                background: '#1e293b',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'background 0.15s'
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.background = '#334155',
                            onMouseLeave: (e)=>e.currentTarget.style.background = '#1e293b',
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: '300'
                                    },
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                    lineNumber: 114,
                                    columnNumber: 29
                                }, this),
                                " Create"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                            lineNumber: 103,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                        lineNumber: 102,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '4px 0',
                            scrollbarWidth: 'none'
                        },
                        children: sidebarSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '4px'
                                },
                                children: [
                                    section.label && !section.hideLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: '10px 18px 4px',
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            color: 'rgba(255,255,255,0.35)',
                                            letterSpacing: '0.8px',
                                            textTransform: 'uppercase'
                                        },
                                        children: section.label
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                        lineNumber: 124,
                                        columnNumber: 33
                                    }, this),
                                    section.items.map((item)=>{
                                        const currentFull = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
                                        const exactActive = currentFull === item.path || pathname === item.path && !item.path.includes('?');
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleNav(item.path),
                                            style: {
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '8px 18px',
                                                background: exactActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'background 0.15s',
                                                borderRadius: 0,
                                                textAlign: 'left'
                                            },
                                            onMouseEnter: (e)=>{
                                                if (!exactActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                            },
                                            onMouseLeave: (e)=>{
                                                if (!exactActive) e.currentTarget.style.background = 'transparent';
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '15px',
                                                        flexShrink: 0,
                                                        opacity: 0.8
                                                    },
                                                    children: item.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                                    lineNumber: 148,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '13px',
                                                        fontWeight: exactActive ? '600' : '400',
                                                        color: exactActive ? 'white' : 'rgba(255,255,255,0.65)',
                                                        flex: 1,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        textTransform: 'capitalize'
                                                    },
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                                    lineNumber: 149,
                                                    columnNumber: 41
                                                }, this),
                                                item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        borderRadius: '10px',
                                                        padding: '1px 6px',
                                                        fontSize: '10px',
                                                        fontWeight: '700',
                                                        flexShrink: 0
                                                    },
                                                    children: item.badge
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                                    lineNumber: 159,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, item.label, true, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                            lineNumber: 136,
                                            columnNumber: 37
                                        }, this);
                                    }),
                                    section.footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleNav(section.footer.path),
                                        style: {
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '6px 18px',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s',
                                            textAlign: 'left'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = 'rgba(255,255,255,0.05)',
                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '14px',
                                                    opacity: 0.5,
                                                    flexShrink: 0
                                                },
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                                lineNumber: 180,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: 'rgba(255,255,255,0.4)'
                                                },
                                                children: section.footer.label
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                                lineNumber: 181,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                        lineNumber: 170,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, section.label, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            padding: '14px 16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        background: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        fontSize: '12px',
                                        color: 'white',
                                        flexShrink: 0
                                    },
                                    children: user?.username?.[0]?.toUpperCase() || 'U'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                    lineNumber: 191,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        overflow: 'hidden'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: 'white',
                                                textTransform: 'capitalize'
                                            },
                                            children: user?.username
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                            lineNumber: 199,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '10px',
                                                color: 'rgba(255,255,255,0.4)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            },
                                            children: user?.role?.toUpperCase() || 'COMPANY_ADMIN'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                            lineNumber: 202,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                    lineNumber: 198,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    title: "Logout",
                                    onClick: ()=>{
                                        logout();
                                        router.push('/login');
                                    },
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'rgba(255,255,255,0.4)',
                                        fontSize: '16px',
                                        padding: '4px',
                                        borderRadius: '6px',
                                        flexShrink: 0,
                                        transition: 'color 0.2s'
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.color = '#ef4444',
                                    onMouseLeave: (e)=>e.currentTarget.style.color = 'rgba(255,255,255,0.4)',
                                    children: "⏻"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                                    lineNumber: 206,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                            lineNumber: 190,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                        lineNumber: 189,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
                lineNumber: 224,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx",
        lineNumber: 73,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditMappingHierarchy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/context/AppContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function EditMappingHierarchy() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const mappingId = params.mappingId || params.id;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { fieldMappings, getPageEntries, getPage, updateFieldMapping, getLinkedEntryDisplayValue, getInboundLinks, currentCompanyId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const mapping = fieldMappings.find((m)=>m.id === Number(mappingId) && m.companyId === currentCompanyId);
    const [hierarchy, setHierarchy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [orderedEntries, setOrderedEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [isEditingLabel, setIsEditingLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tempLabel, setTempLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Drag state
    const dragItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null); // entry.id being dragged
    const [dragOverId, setDragOverId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // entry.id being hovered over
    const rawEntries = mapping ? getPageEntries(mapping.targetPageId) : [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mapping) {
            if (mapping.hierarchy) setHierarchy(mapping.hierarchy);
            if (mapping.selectedIds) setSelectedIds(new Set(mapping.selectedIds));
            setTempLabel(mapping.label || mapping.targetPageName);
        }
    }, [
        mapping
    ]);
    // Initialize orderedEntries once when entries are loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (rawEntries.length > 0 && orderedEntries.length === 0) {
            setOrderedEntries(rawEntries);
        }
    }, [
        rawEntries.length
    ]);
    if (!mapping) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Mapping not found"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                    lineNumber: 52,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn btn-primary",
                    onClick: ()=>router.push('/pages'),
                    children: "Back to Pages"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
            lineNumber: 51,
            columnNumber: 13
        }, this);
    }
    const targetPage = getPage(mapping.targetPageId);
    // Use orderedEntries for rendering (falls back to rawEntries while loading)
    const entries = orderedEntries.length > 0 ? orderedEntries : rawEntries;
    const handleUpdateEntry = (entryId, field, value)=>{
        setHierarchy((prev)=>({
                ...prev,
                [entryId]: {
                    ...prev[entryId] || {
                        parentId: null,
                        role: 'none'
                    },
                    [field]: value
                }
            }));
    };
    const handleSave = ()=>{
        updateFieldMapping(mapping.id, {
            hierarchy,
            selectedIds: Array.from(selectedIds)
        });
        alert('Hierarchy saved successfully!');
        router.push('/pages');
    };
    const handleLabelSave = ()=>{
        if (!tempLabel.trim()) return;
        updateFieldMapping(mapping.id, {
            label: tempLabel.trim()
        });
        setIsEditingLabel(false);
    };
    const handleBulkUpdate = (field, value)=>{
        if (selectedIds.size === 0) return;
        setHierarchy((prev)=>{
            const next = {
                ...prev
            };
            selectedIds.forEach((id)=>{
                next[id] = {
                    ...next[id] || {
                        parentId: null,
                        role: 'none'
                    },
                    [field]: value
                };
            });
            return next;
        });
    };
    const toggleSelectAll = ()=>{
        if (selectedIds.size === filteredEntries.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredEntries.map((e)=>e.id)));
        }
    };
    const toggleSelect = (id)=>{
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };
    const getEntryName = (entry)=>{
        return getLinkedEntryDisplayValue(mapping.targetPageId, entry.id, mapping.targetFieldName) || `Entry #${entry.id}`;
    };
    const filteredEntries = entries.filter((e)=>getEntryName(e).toLowerCase().includes(searchTerm.toLowerCase()));
    // ─── Drag-and-drop handlers ───────────────────────────────────────────
    const handleDragStart = (e, entryId)=>{
        dragItem.current = entryId;
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e, entryId)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (entryId !== dragItem.current) {
            setDragOverId(entryId);
        }
    };
    const handleDrop = (e, dropEntryId)=>{
        e.preventDefault();
        const fromId = dragItem.current;
        if (!fromId || fromId === dropEntryId) {
            dragItem.current = null;
            setDragOverId(null);
            return;
        }
        setOrderedEntries((prev)=>{
            const arr = [
                ...prev
            ];
            const fromIdx = arr.findIndex((en)=>en.id === fromId);
            const toIdx = arr.findIndex((en)=>en.id === dropEntryId);
            if (fromIdx === -1 || toIdx === -1) return prev;
            const [moved] = arr.splice(fromIdx, 1);
            arr.splice(toIdx, 0, moved);
            return arr;
        });
        dragItem.current = null;
        setDragOverId(null);
    };
    const handleDragEnd = ()=>{
        dragItem.current = null;
        setDragOverId(null);
    };
    // ─────────────────────────────────────────────────────────────────────
    // Recursive tree builder using orderedEntries, optionally filtered by selection
    const buildTree = (parentId = null)=>{
        const sourceEntries = selectedIds.size > 0 ? entries.filter((e)=>selectedIds.has(e.id)) : entries;
        return sourceEntries.filter((entry)=>{
            const h = hierarchy[entry.id];
            const pId = h?.parentId || null;
            const normalizeId = (id)=>id === '' || id === undefined ? null : Number(id);
            // If filtering by selection, and the parent is NOT in the selection, 
            // treat this entry as a root node for the preview.
            const effectiveParentId = selectedIds.size > 0 && pId && !selectedIds.has(Number(pId)) ? null : pId;
            return normalizeId(effectiveParentId) === normalizeId(parentId);
        }).map((entry)=>{
            const h = hierarchy[entry.id] || {};
            const isOver = dragOverId === entry.id;
            const productLinks = mapping.productPageId ? getInboundLinks(mapping.targetPageId, entry.id).filter((l)=>l.sourcePageId === mapping.productPageId) : [];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tree-node",
                onDragOver: (e)=>handleDragOver(e, entry.id),
                onDrop: (e)=>handleDrop(e, entry.id),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `tree-node-content ${isOver ? 'drag-over' : ''}`,
                        draggable: true,
                        onDragStart: (e)=>handleDragStart(e, entry.id),
                        onDragEnd: handleDragEnd,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "drag-handle",
                                title: "Drag to reorder",
                                children: "⠿"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 204,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "node-icon",
                                children: "📄"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 205,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `node-name ${h.role === 'primary' ? 'role-primary' : ''} ${h.role === 'leaf' ? 'role-leaf' : ''}`,
                                children: [
                                    getEntryName(entry),
                                    h.role && h.role !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "node-role",
                                        children: [
                                            "(",
                                            h.role,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                        lineNumber: 209,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 206,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                        lineNumber: 198,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tree-children",
                        children: [
                            buildTree(entry.id),
                            productLinks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tree-product-links",
                                children: productLinks.map((link, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tree-node tree-link-node",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tree-node-content link-preview-content",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "node-icon",
                                                    children: "🔗"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 220,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "node-name link-preview-name",
                                                    children: getLinkedEntryDisplayValue(mapping.productPageId, link.sourceEntryId, mapping.productDisplayFieldName) || link.sourceEntryLabel || 'Item'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 221,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 219,
                                            columnNumber: 45
                                        }, this)
                                    }, `link-${idx}`, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                        lineNumber: 218,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 216,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                        lineNumber: 213,
                        columnNumber: 25
                    }, this)
                ]
            }, entry.id, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                lineNumber: 192,
                columnNumber: 21
            }, this);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hierarchy-manager animate-fade-in-up",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "view-header",
                style: {
                    marginBottom: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            isEditingLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "form-input",
                                    style: {
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        height: '42px',
                                        padding: '0 12px'
                                    },
                                    value: tempLabel,
                                    onChange: (e)=>setTempLabel(e.target.value),
                                    onBlur: handleLabelSave,
                                    onKeyDown: (e)=>e.key === 'Enter' && handleLabelSave(),
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 241,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 240,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: 0,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                },
                                onClick: ()=>setIsEditingLabel(true),
                                title: "Click to rename",
                                children: [
                                    mapping.label || 'Hierarchy Management',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '14px',
                                            opacity: 0.5
                                        },
                                        children: "✏️"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                        lineNumber: 258,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 252,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'var(--text-secondary)',
                                    marginTop: '4px'
                                },
                                children: [
                                    "Page: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: mapping.targetPageName
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                        lineNumber: 262,
                                        columnNumber: 31
                                    }, this),
                                    " | Field: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: mapping.targetFieldName
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                        lineNumber: 262,
                                        columnNumber: 82
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 261,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                        lineNumber: 238,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '12px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline",
                                onClick: ()=>router.push('/pages'),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 266,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                onClick: handleSave,
                                children: "Save Hierarchy"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                lineNumber: 267,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                        lineNumber: 265,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                lineNumber: 237,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hierarchy-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hierarchy-form-section",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '16px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "Configure Entries"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 276,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '8px'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "form-input",
                                                placeholder: "Search entries...",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value),
                                                style: {
                                                    width: '200px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                lineNumber: 278,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 277,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 275,
                                    columnNumber: 25
                                }, this),
                                selectedIds.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bulk-actions-bar animate-fade-in-down",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bulk-info",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: selectedIds.size
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 37
                                                }, this),
                                                " selected"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 291,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bulk-controls",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "form-input form-input-sm",
                                                    onChange: (e)=>handleBulkUpdate('parentId', e.target.value),
                                                    value: "",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            disabled: true,
                                                            children: "Set Parent for all..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 300,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "None (Root)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 301,
                                                            columnNumber: 41
                                                        }, this),
                                                        entries.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: e.id,
                                                                children: getEntryName(e)
                                                            }, e.id, false, {
                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                lineNumber: 303,
                                                                columnNumber: 45
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 295,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "form-input form-input-sm",
                                                    onChange: (e)=>handleBulkUpdate('role', e.target.value),
                                                    value: "",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            disabled: true,
                                                            children: "Set Role for all..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 311,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "none",
                                                            children: "Standard"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 312,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "primary",
                                                            children: "Primary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 313,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "leaf",
                                                            children: "Leaf"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 314,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 306,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn btn-ghost btn-sm",
                                                    onClick: ()=>setSelectedIds(new Set()),
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 316,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 294,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 290,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "entries-config-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "checkbox-container",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: filteredEntries.length > 0 && selectedIds.size === filteredEntries.length,
                                                    onChange: toggleSelectAll
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 323,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "checkmark"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 328,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 322,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: 'var(--text-secondary)'
                                            },
                                            children: "SELECT ALL"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 330,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 321,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "entries-config-list",
                                    children: filteredEntries.map((entry)=>{
                                        const h = hierarchy[entry.id] || {
                                            parentId: '',
                                            role: 'none'
                                        };
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "entry-config-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "entry-identity",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "entry-main-info",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "checkbox-container",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            checked: selectedIds.has(entry.id),
                                                                            onChange: ()=>toggleSelect(entry.id)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                            lineNumber: 341,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "checkmark"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                            lineNumber: 346,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: getEntryName(entry)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 339,
                                                            columnNumber: 45
                                                        }, this),
                                                        mapping.productPageId && (()=>{
                                                            const links = getInboundLinks(mapping.targetPageId, entry.id).filter((l)=>l.sourcePageId === mapping.productPageId);
                                                            if (links.length === 0) return null;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "connected-tree-container",
                                                                children: links.map((link, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "linked-leaf-node",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "leaf-connector"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                                lineNumber: 360,
                                                                                columnNumber: 65
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "link-badge",
                                                                                children: [
                                                                                    "🔗 ",
                                                                                    getLinkedEntryDisplayValue(mapping.productPageId, link.sourceEntryId, mapping.productDisplayFieldName) || link.sourceEntryLabel || 'Item'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                                lineNumber: 361,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, idx, true, {
                                                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                        lineNumber: 359,
                                                                        columnNumber: 61
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                lineNumber: 357,
                                                                columnNumber: 53
                                                            }, this);
                                                        })()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 338,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "entry-controls",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "form-group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    children: "Parent"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                    lineNumber: 372,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "form-input",
                                                                    value: h.parentId || '',
                                                                    onChange: (e)=>handleUpdateEntry(entry.id, 'parentId', e.target.value),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "None (Root)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                            lineNumber: 378,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        entries.filter((e)=>e.id !== entry.id).map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: e.id,
                                                                                children: getEntryName(e)
                                                                            }, e.id, false, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                                lineNumber: 380,
                                                                                columnNumber: 57
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                    lineNumber: 373,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 371,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "form-group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    children: "Role"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                    lineNumber: 385,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "form-input",
                                                                    value: h.role || 'none',
                                                                    onChange: (e)=>handleUpdateEntry(entry.id, 'role', e.target.value),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "none",
                                                                            children: "Standard"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                            lineNumber: 391,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "primary",
                                                                            children: "Primary"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                            lineNumber: 392,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "leaf",
                                                                            children: "Leaf"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                            lineNumber: 393,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                            lineNumber: 384,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                                    lineNumber: 370,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, entry.id, true, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 337,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 333,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                            lineNumber: 274,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                        lineNumber: 273,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hierarchy-preview-section",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: [
                                        "Hierarchy Preview ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "drag-hint",
                                            children: "← Drag items to reorder"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                            lineNumber: 407,
                                            columnNumber: 47
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 407,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tree-viz",
                                    children: entries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            textAlign: 'center',
                                            color: 'var(--text-secondary)'
                                        },
                                        children: "No entries found."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                        lineNumber: 410,
                                        columnNumber: 33
                                    }, this) : buildTree(null)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                                    lineNumber: 408,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                            lineNumber: 406,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                        lineNumber: 405,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                lineNumber: 271,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .hierarchy-manager {
                    padding: 40px;
                    max-width: 100%;
                    margin: 0;
                }
                .hierarchy-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 32px;
                    margin-top: 32px;
                }
                .entry-config-row {
                    padding: 20px;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: background 0.2s;
                }
                .entry-config-row:last-child {
                    border-bottom: none;
                }
                .entry-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .tree-viz {
                    background: #f8fafc;
                    padding: 24px;
                    border-radius: 12px;
                    min-height: 400px;
                }
                .tree-node {
                    margin-left: 20px;
                    position: relative;
                }
                .tree-node::before {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 0;
                    bottom: 0;
                    width: 1.5px;
                    background: #cbd5e1;
                }
                .tree-node:last-child::before {
                    height: 12px;
                }
                .tree-link-node::before {
                    background: #94a3b8;
                    border-style: dashed;
                }
                .link-preview-content {
                    background: #f0fdf4;
                    border-color: #bbf7d0;
                    cursor: default;
                }
                .link-preview-content:hover {
                    box-shadow: none;
                    border-color: #bbf7d0;
                }
                .link-preview-name {
                    color: #166534;
                    font-size: 13px;
                }
                .tree-product-links {
                    margin-top: 4px;
                }
                .tree-node-content {
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: fit-content;
                    position: relative;
                    cursor: grab;
                    user-select: none;
                    transition: box-shadow 0.15s, border-color 0.15s, transform 0.15s;
                }
                .tree-node-content:active {
                    cursor: grabbing;
                }
                .tree-node-content:hover {
                    border-color: #6366f1;
                    box-shadow: 0 2px 8px rgba(99,102,241,0.15);
                }
                .tree-node-content.drag-over {
                    border-color: #6366f1;
                    border-style: dashed;
                    background: #eef2ff;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
                    transform: scale(1.02);
                }
                .tree-node-content::after {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 18px;
                    width: 10px;
                    height: 1.5px;
                    background: #cbd5e1;
                }
                .drag-handle {
                    font-size: 16px;
                    color: #94a3b8;
                    cursor: grab;
                    line-height: 1;
                    letter-spacing: -1px;
                }
                .drag-hint {
                    font-size: 12px;
                    font-weight: 400;
                    color: #94a3b8;
                    margin-left: 8px;
                }
                .node-name {
                    font-weight: 500;
                }
                .role-primary {
                    color: #7b1fa2;
                    font-weight: 700;
                }
                .role-leaf {
                    color: #059669;
                }
                .node-role {
                    font-size: 11px;
                    margin-left: 6px;
                    opacity: 0.7;
                    text-transform: uppercase;
                }

                /* New Bulk & Select Styles */
                .bulk-actions-bar {
                    background: #eef2ff;
                    padding: 12px 16px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    border: 1px solid #c7d2fe;
                }
                .bulk-controls {
                    display: flex;
                    gap: 8px;
                }
                .form-input-sm {
                    padding: 4px 8px;
                    font-size: 12px;
                    height: 32px;
                    width: auto !important;
                }
                .checkbox-container {
                    display: block;
                    position: relative;
                    padding-left: 24px;
                    cursor: pointer;
                    user-select: none;
                    height: 18px;
                }
                .checkbox-container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 18px;
                    width: 18px;
                    background-color: #eee;
                    border-radius: 4px;
                    border: 1px solid var(--border);
                }
                .checkbox-container:hover input ~ .checkmark {
                    background-color: #ccc;
                }
                .checkbox-container input:checked ~ .checkmark {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }
                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
                .checkbox-container input:checked ~ .checkmark:after {
                    display: block;
                }
                .checkbox-container .checkmark:after {
                    left: 6px;
                    top: 2px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                .entries-config-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    background: #f8fafc;
                    border-bottom: 1px solid var(--border);
                }
                .entry-identity {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    min-height: 40px;
                }
                .entry-main-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .bulk-info {
                    font-size: 13px;
                    color: var(--primary);
                }
                .entries-config-list {
                    max-height: 70vh;
                    overflow-y: auto;
                }
                .connected-tree-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0;
                    margin-left: auto;
                    min-width: 180px;
                }
                .linked-leaf-node {
                    display: flex;
                    align-items: center;
                    position: relative;
                    padding-left: 40px;
                    height: 38px;
                    width: 100%;
                }
                .leaf-connector {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 40px;
                }
                .leaf-connector::before {
                    content: '';
                    position: absolute;
                    left: 10px;
                    top: -19px; /* half of height */
                    bottom: 19px; 
                    width: 1.5px;
                    background: #cbd5e1;
                }
                .linked-leaf-node:first-child .leaf-connector::before {
                    top: 19px;
                }
                .linked-leaf-node:last-child .leaf-connector::before {
                    bottom: 19px;
                }
                .leaf-connector::after {
                    content: '';
                    position: absolute;
                    left: 10px;
                    top: 19px;
                    width: 25px;
                    height: 1.5px;
                    background: #cbd5e1;
                    border-radius: 0 4px 4px 0;
                }
                .link-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    background: #f0fdf4;
                    color: #166534;
                    border: 1px solid #bbf7d0;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 500;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    white-space: nowrap;
                }
                .connected-items {
                    display: none;
                }
            `
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
                lineNumber: 419,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx",
        lineNumber: 236,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/crm demo/backend/src/app/edit-hierarchy/[id]/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditHierarchyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$views$2f$EditMappingHierarchy$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/views/EditMappingHierarchy.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function EditHierarchyPage(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '2rem'
            },
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Desktop/crm demo/backend/src/app/edit-hierarchy/[id]/page.jsx",
            lineNumber: 8,
            columnNumber: 29
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$views$2f$EditMappingHierarchy$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/app/edit-hierarchy/[id]/page.jsx",
                lineNumber: 10,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/crm demo/backend/src/app/edit-hierarchy/[id]/page.jsx",
            lineNumber: 9,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/crm demo/backend/src/app/edit-hierarchy/[id]/page.jsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3e096162._.js.map