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
"[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/context/AppContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function CategoryDropdown({ label = 'Category', onChange }) {
    const { pages, currentCompanyId, getPage, getPageEntries, addEntry, ensureCategoryPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [categoryPageId, setCategoryPageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Find (or create) the Category page on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // ensureCategoryPage is already called in AppProvider, but we also need the id here
        const catPage = (pages[currentCompanyId] || []).find((p)=>p.name === 'Category');
        if (catPage) {
            setCategoryPageId(catPage.id);
        }
    }, [
        pages,
        currentCompanyId
    ]);
    // Load category entries whenever the page id changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!categoryPageId) return;
        const entries = getPageEntries(categoryPageId);
        setCategories(entries);
    }, [
        categoryPageId,
        getPageEntries
    ]);
    const handleAddCategory = ()=>{
        const name = window.prompt('Enter new category name');
        if (!name) return;
        // The Category page has a single field "Name" – we build entry data accordingly
        const entryData = {
            Name: name
        };
        const newEntry = addEntry(categoryPageId, entryData);
        // Refresh list
        setCategories((prev)=>[
                ...prev,
                newEntry
            ]);
        setSelectedId(newEntry.id);
        if (onChange) onChange(newEntry.id);
    };
    const handleSelect = (e)=>{
        const id = e.target.value;
        setSelectedId(id);
        if (onChange) onChange(id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "category-dropdown",
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "category-select",
                style: {
                    fontWeight: '600'
                },
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: "category-select",
                value: selectedId,
                onChange: handleSelect,
                style: {
                    padding: '0.4rem',
                    minWidth: '120px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: [
                            "-- Select ",
                            label,
                            " --"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: cat.id,
                            children: cat.data?.Name || `Category ${cat.id}`
                        }, cat.id, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleAddCategory,
                style: {
                    padding: '0.4rem 0.8rem',
                    background: '#4f46e5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                },
                children: "+ Add"
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx",
                lineNumber: 75,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RichTextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [
        value
    ]);
    const execCommand = (command)=>{
        document.execCommand(command, false, null);
        onChange(editorRef.current.innerHTML);
    };
    const handleInput = ()=>{
        onChange(editorRef.current.innerHTML);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rich-editor-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rich-editor-toolbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('bold'),
                        title: "Bold",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            children: "B"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                            lineNumber: 25,
                            columnNumber: 88
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('italic'),
                        title: "Italic",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            children: "I"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                            lineNumber: 26,
                            columnNumber: 92
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('underline'),
                        title: "Underline",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("u", {
                            children: "U"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                            lineNumber: 27,
                            columnNumber: 98
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divider"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('insertUnorderedList'),
                        title: "Bullet List",
                        children: "• list"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                        lineNumber: 29,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('insertOrderedList'),
                        title: "Numbered List",
                        children: "1. list"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: editorRef,
                contentEditable: true,
                className: "rich-editor-content",
                onInput: handleInput,
                "data-placeholder": placeholder || 'Enter text...'
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
                lineNumber: 32,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ImageUpload({ value, onChange }) {
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value || null);
    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const base64 = reader.result;
                setPreview(base64);
                onChange(base64);
            };
            reader.readAsDataURL(file);
        }
    };
    const clearImage = ()=>{
        setPreview(null);
        onChange('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "image-upload-container",
        children: preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "image-preview-wrapper animate-fade-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: preview,
                    alt: "Upload preview",
                    className: "image-preview"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
                    lineNumber: 29,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "image-clear-btn",
                    onClick: clearImage,
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
                    lineNumber: 30,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
            lineNumber: 28,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "image-upload-dropzone",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: handleFileChange,
                    style: {
                        display: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
                    lineNumber: 36,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "upload-icon",
                    children: "📸"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
                    lineNumber: 37,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Upload Image"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
                    lineNumber: 38,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
            lineNumber: 35,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/context/AppContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$CategoryDropdown$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/components/CategoryDropdown.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$RichTextEditor$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/components/RichTextEditor.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$ImageUpload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/components/ImageUpload.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function DataEntry() {
    const { pageId, entryId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { getPage, addEntry, updateEntry, deleteEntry, getPageEntries, getLinkedEntryDisplayValue, getInboundLinks, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const isNew = !entryId || entryId === 'new';
    const page = getPage(pageId);
    const lowerName = page?.name?.toLowerCase()?.trim() || '';
    const isSettingsPage = page?.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [refreshKey, setRefreshKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [repeaterRows, setRepeaterRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}); // { [fieldKey]: [rowId1, rowId2, ...] }
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [viewEntryData, setViewEntryData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load entry for editing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isNew && page) {
            const entries = getPageEntries(pageId);
            const entry = entries.find((e)=>e.id === Number(entryId));
            if (entry) {
                setFormData(entry.data);
                const initialRepeaters = {};
                Object.keys(entry.data).forEach((key)=>{
                    if (key.includes('_row')) {
                        const fieldKey = key.split('_row')[0];
                        const rowIdx = parseInt(key.split('_row')[1]);
                        if (!initialRepeaters[fieldKey]) initialRepeaters[fieldKey] = [];
                        if (!initialRepeaters[fieldKey].includes(rowIdx)) {
                            initialRepeaters[fieldKey].push(rowIdx);
                        }
                    }
                });
                // Also ensure fields with maxItems have at least that many rows initialized
                page.headings?.forEach((h)=>h.subHeadings?.forEach((sh)=>sh.fields?.forEach((f)=>{
                            if (f.maxItems > 0) {
                                const fieldKey = getFieldKey(h.id, sh.id, f.id);
                                if (!initialRepeaters[fieldKey] || initialRepeaters[fieldKey].length < f.maxItems) {
                                    const currentRows = initialRepeaters[fieldKey] || [];
                                    const needed = f.maxItems - currentRows.length;
                                    for(let i = 0; i < needed; i++){
                                        const nextId = currentRows.length > 0 ? Math.max(...currentRows) + 1 : i;
                                        currentRows.push(nextId);
                                    }
                                    initialRepeaters[fieldKey] = currentRows;
                                }
                            }
                        })));
                setRepeaterRows(initialRepeaters);
            }
        } else if (isNew && page) {
            // Pre-initialize rows for new entries if maxItems > 0
            const initialRepeaters = {};
            page.headings?.forEach((h)=>h.subHeadings?.forEach((sh)=>sh.fields?.forEach((f)=>{
                        if (f.maxItems > 0) {
                            const fieldKey = getFieldKey(h.id, sh.id, f.id);
                            initialRepeaters[fieldKey] = Array.from({
                                length: f.maxItems
                            }, (_, i)=>i);
                        }
                    })));
            setRepeaterRows(initialRepeaters);
        }
    }, [
        entryId,
        pageId,
        isNew,
        page
    ]);
    // Auto-redirect for single-entry pages if trying to create a new one but it already exists
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isSettingsPage && isNew && page) {
            const entries = getPageEntries(pageId);
            if (entries.length > 0) {
                router.replace(`/data-entry/${pageId}/${entries[0].id}`);
            }
        }
    }, [
        isSettingsPage,
        isNew,
        page,
        pageId,
        router,
        getPageEntries
    ]);
    if (!page) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Page not found"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 90,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-primary",
                        style: {
                            marginTop: 16
                        },
                        onClick: ()=>router.push('/pages'),
                        children: "Back to Pages"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 91,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                lineNumber: 89,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
            lineNumber: 88,
            columnNumber: 13
        }, this);
    }
    const headings = page.headings || [];
    const getFieldKey = (headingId, subId, fieldId)=>`${headingId}_${subId}_${fieldId}`;
    const handleChange = (headingId, subId, fieldId, value, maxChars, rowIdx = null)=>{
        if (maxChars > 0 && value.length > maxChars) return;
        const baseKey = getFieldKey(headingId, subId, fieldId);
        const finalKey = rowIdx !== null ? `${baseKey}_row${rowIdx}` : baseKey;
        setFormData((prev)=>{
            const newData = {
                ...prev,
                [finalKey]: value
            };
            const formatAsSlug = (val)=>String(val || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            // Helper to get all fields from all enabled sections
            const getAllAvailableHeadings = ()=>[
                    ...page.headings || [],
                    ...page.staticSeoEnabled ? page.staticSeoHeadings || [] : [],
                    ...page.dynamicSeoEnabled ? page.dynamicSeoHeadings || [] : []
                ];
            const allActiveHeadings = getAllAvailableHeadings();
            // Find current field to check if it's a Permalink or Slug
            let currentField = null;
            allActiveHeadings.forEach((h)=>h.subHeadings?.forEach((sh)=>sh.fields?.forEach((f)=>{
                        if (String(f.id).trim() === String(fieldId).trim()) currentField = f;
                    })));
            // Bi-directional logic: If Permalink is edited, update its Slug source
            if (currentField?.valueType === 'Permalink' && currentField.permalinkSourceFieldId) {
                const slugSourceFieldId = currentField.permalinkSourceFieldId;
                // We need to find the heading and subHeading of the slugSourceFieldId
                let sourceHeadingId = null;
                let sourceSubId = null;
                allActiveHeadings.forEach((h)=>h.subHeadings?.forEach((sh)=>sh.fields?.forEach((f)=>{
                            if (String(f.id).trim() === String(slugSourceFieldId).trim()) {
                                sourceHeadingId = h.id;
                                sourceSubId = sh.id;
                            }
                        })));
                if (sourceHeadingId && sourceSubId) {
                    const slugKey = rowIdx !== null ? `${getFieldKey(sourceHeadingId, sourceSubId, slugSourceFieldId)}_row${rowIdx}` : getFieldKey(sourceHeadingId, sourceSubId, slugSourceFieldId);
                    newData[slugKey] = formatAsSlug(value);
                }
            }
            // Forward logic: If Name/Any is edited, update Slugs/Permalinks that link to it
            allActiveHeadings.forEach((h)=>{
                h.subHeadings?.forEach((sh)=>{
                    sh.fields?.forEach((f)=>{
                        const isSlugSource = f.valueType === 'Slug' && f.slugSourceFieldId && String(f.slugSourceFieldId).trim() === String(fieldId).trim();
                        const isPermalinkSource = f.valueType === 'Permalink' && f.permalinkSourceFieldId && String(f.permalinkSourceFieldId).trim() === String(fieldId).trim();
                        if (isSlugSource || isPermalinkSource) {
                            const targetKey = rowIdx !== null ? `${getFieldKey(h.id, sh.id, f.id)}_row${rowIdx}` : getFieldKey(h.id, sh.id, f.id);
                            const formattedValue = formatAsSlug(value);
                            newData[targetKey] = formattedValue;
                            // Chaining: If Slug is updated, also update any Permalink that links to IT
                            if (f.valueType === 'Slug') {
                                allActiveHeadings.forEach((h2)=>{
                                    h2.subHeadings?.forEach((sh2)=>{
                                        sh2.fields?.forEach((f2)=>{
                                            if (f2.valueType === 'Permalink' && String(f2.permalinkSourceFieldId).trim() === String(f.id).trim()) {
                                                const subTargetKey = rowIdx !== null ? `${getFieldKey(h2.id, sh2.id, f2.id)}_row${rowIdx}` : getFieldKey(h2.id, sh2.id, f2.id);
                                                newData[subTargetKey] = formattedValue;
                                            }
                                        });
                                    });
                                });
                            }
                        }
                    });
                });
            });
            return newData;
        });
    };
    const getRowValue = (headingId, subId, fieldId, rowIdx = null)=>{
        const baseKey = getFieldKey(headingId, subId, fieldId);
        const finalKey = rowIdx !== null ? `${baseKey}_row${rowIdx}` : baseKey;
        return formData[finalKey] || '';
    };
    const addRepeaterRow = (fieldKey, maxItems = 0)=>{
        setRepeaterRows((prev)=>{
            const currentRows = prev[fieldKey] || [
                0
            ];
            if (maxItems > 0 && currentRows.length >= maxItems) return prev;
            const nextId = Math.max(...currentRows, -1) + 1;
            return {
                ...prev,
                [fieldKey]: [
                    ...currentRows,
                    nextId
                ]
            };
        });
    };
    const removeRepeaterRow = (fieldKey, rowId)=>{
        setRepeaterRows((prev)=>{
            const currentRows = prev[fieldKey] || [
                0
            ];
            if (currentRows.length <= 1) return prev; // Keep at least one row
            return {
                ...prev,
                [fieldKey]: currentRows.filter((id)=>id !== rowId)
            };
        });
    };
    const renderFieldInput = (heading, sub, field, rowIdx = null)=>{
        const key = getFieldKey(heading.id, sub.id, field.id);
        const value = getRowValue(heading.id, sub.id, field.id, rowIdx);
        // Handle Link type — show dropdown of entries from linked page
        if (field.valueType === 'Link' && field.linkedPageId) {
            const linkedEntries = getPageEntries(field.linkedPageId);
            const linkedPage = getPage(field.linkedPageId);
            const selectedEntry = linkedEntries.find((e)=>String(e.id) === String(value));
            const selectedDisplay = selectedEntry ? getLinkedEntryDisplayValue(field.linkedPageId, selectedEntry.id, field.displayFieldName) : '';
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "data-entry-field-input-wrapper",
                style: {
                    display: 'flex',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "data-entry-input data-entry-select",
                                style: {
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                },
                                onClick: (e)=>{
                                    const dropdown = e.currentTarget.nextElementSibling;
                                    if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: value ? 'var(--text-primary)' : 'var(--text-soft)'
                                        },
                                        children: value ? selectedDisplay : `-- Select ${linkedPage?.name || 'item'} --`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 238,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '10px'
                                        },
                                        children: "▼"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 241,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 230,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'none',
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    background: 'white',
                                    border: '1.5px solid var(--border)',
                                    borderRadius: '8px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    zIndex: 100,
                                    maxHeight: '250px',
                                    overflow: 'hidden',
                                    marginTop: '4px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: '8px',
                                            borderBottom: '1px solid var(--border)',
                                            position: 'sticky',
                                            top: 0,
                                            background: 'white',
                                            zIndex: 1
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "data-entry-input",
                                            style: {
                                                fontSize: '12px',
                                                padding: '6px 10px',
                                                height: '32px'
                                            },
                                            placeholder: `🔍 Search ${linkedPage?.name || 'entries'}...`,
                                            onClick: (e)=>e.stopPropagation(),
                                            onChange: (e)=>{
                                                const search = e.target.value.toLowerCase();
                                                const list = e.target.closest('div[style]').parentElement.querySelector('.link-search-list');
                                                if (list) {
                                                    Array.from(list.children).forEach((item)=>{
                                                        item.style.display = item.textContent.toLowerCase().includes(search) ? '' : 'none';
                                                    });
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                            lineNumber: 250,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 249,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "link-search-list",
                                        style: {
                                            overflowY: 'auto',
                                            maxHeight: '200px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    color: 'var(--text-soft)',
                                                    borderBottom: '1px solid var(--border-light)'
                                                },
                                                onClick: (e)=>{
                                                    handleChange(heading.id, sub.id, field.id, '', 0, rowIdx);
                                                    e.currentTarget.closest('div[style*="position: absolute"]').style.display = 'none';
                                                },
                                                children: "-- Clear Selection --"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                lineNumber: 268,
                                                columnNumber: 33
                                            }, this),
                                            linkedEntries.map((entry)=>{
                                                const displayVal = getLinkedEntryDisplayValue(field.linkedPageId, entry.id, field.displayFieldName);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        background: String(entry.id) === String(value) ? 'rgba(79,70,229,0.08)' : 'transparent',
                                                        fontWeight: String(entry.id) === String(value) ? '600' : '400',
                                                        borderBottom: '1px solid #f1f5f9'
                                                    },
                                                    onMouseEnter: (e)=>e.currentTarget.style.background = 'rgba(79,70,229,0.06)',
                                                    onMouseLeave: (e)=>e.currentTarget.style.background = String(entry.id) === String(value) ? 'rgba(79,70,229,0.08)' : 'transparent',
                                                    onClick: (e)=>{
                                                        handleChange(heading.id, sub.id, field.id, String(entry.id), 0, rowIdx);
                                                        e.currentTarget.closest('div[style*="position: absolute"]').style.display = 'none';
                                                    },
                                                    children: displayVal
                                                }, entry.id, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                    lineNumber: 280,
                                                    columnNumber: 41
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 267,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 243,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 229,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-ghost btn-sm",
                        style: {
                            padding: '0 12px',
                            fontSize: '18px',
                            height: '42px',
                            border: '1.5px dashed var(--accent)',
                            color: 'var(--accent)'
                        },
                        onClick: ()=>handleAddSimpleLinkEntry(field),
                        title: `Add new ${linkedPage?.name || 'entry'}`,
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 302,
                        columnNumber: 21
                    }, this),
                    linkedEntries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "link-empty-hint",
                        children: [
                            "No entries yet.",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-ghost btn-sm",
                                onClick: ()=>router.push(`/data-entry/${field.linkedPageId}`),
                                children: [
                                    "Add ",
                                    linkedPage?.name,
                                    " entries →"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 314,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 312,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                lineNumber: 228,
                columnNumber: 17
            }, this);
        }
        const inputProps = {
            value,
            onChange: (e)=>handleChange(heading.id, sub.id, field.id, e.target.value, field.maxChars, rowIdx),
            placeholder: `Enter ${field.label || 'value'}...`,
            className: 'data-entry-input'
        };
        switch(field.valueType){
            case 'Number':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "number"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 337,
                            columnNumber: 25
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 339,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 336,
                    columnNumber: 21
                }, this);
            case 'Text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        field.maxChars > 120 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ...inputProps,
                            rows: 3,
                            className: "data-entry-textarea"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 347,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 349,
                            columnNumber: 29
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 352,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 345,
                    columnNumber: 21
                }, this);
            case 'Symbol':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ...inputProps,
                        type: "text"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 359,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 358,
                    columnNumber: 21
                }, this);
            case 'Password':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ...inputProps,
                        type: "password"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 365,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 364,
                    columnNumber: 21
                }, this);
            case 'Number & Text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: `Enter number & text for ${field.label}`
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 371,
                            columnNumber: 25
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 373,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 370,
                    columnNumber: 21
                }, this);
            case 'Symbol & Text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: `Enter symbol & text for ${field.label}`
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 380,
                            columnNumber: 25
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 382,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 379,
                    columnNumber: 21
                }, this);
            case 'Rich Editor':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$RichTextEditor$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    value: value,
                    onChange: (val)=>handleChange(heading.id, sub.id, field.id, val, 0, rowIdx),
                    placeholder: field.label
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 388,
                    columnNumber: 21
                }, this);
            case '120 Char':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ...inputProps,
                            rows: 3,
                            className: "data-entry-textarea",
                            maxLength: 120,
                            placeholder: `Description (max 120 chars)...`
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 397,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/120"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 404,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 396,
                    columnNumber: 21
                }, this);
            case '160 Char':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ...inputProps,
                            rows: 4,
                            className: "data-entry-textarea",
                            maxLength: 160,
                            placeholder: `Description (max 160 chars)...`
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 410,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/160"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 417,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 409,
                    columnNumber: 21
                }, this);
            case 'Image':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$ImageUpload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    value: value,
                    onChange: (val)=>handleChange(heading.id, sub.id, field.id, val, 0, rowIdx)
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 422,
                    columnNumber: 21
                }, this);
            case 'Slug':
                const allAHeadings = [
                    ...page.headings || [],
                    ...page.staticSeoEnabled ? page.staticSeoHeadings || [] : [],
                    ...page.dynamicSeoEnabled ? page.dynamicSeoHeadings || [] : []
                ];
                const slugSourceField = allAHeadings.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields)).find((f)=>String(f?.id).trim() === String(field.slugSourceFieldId).trim());
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: slugSourceField ? `Auto-generated from ${slugSourceField.label}...` : `Slug for ${field.label}...`,
                            readOnly: true,
                            style: {
                                background: '#f8fafc',
                                cursor: 'not-allowed',
                                color: 'var(--text-secondary)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 437,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                color: 'var(--accent)',
                                marginTop: '4px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            },
                            children: slugSourceField ? `Linked to: ${slugSourceField.label}` : 'No source connected'
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 444,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 436,
                    columnNumber: 21
                }, this);
            case 'Permalink':
                const allAHeadingsPerm = [
                    ...page.headings || [],
                    ...page.staticSeoEnabled ? page.staticSeoHeadings || [] : [],
                    ...page.dynamicSeoEnabled ? page.dynamicSeoHeadings || [] : []
                ];
                const permSourceField = allAHeadingsPerm.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields)).find((f)=>String(f?.id).trim() === String(field.permalinkSourceFieldId).trim());
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: permSourceField ? `Auto-generated from ${permSourceField.label}...` : `Permalink for ${field.label}...`,
                            onChange: (e)=>{
                                const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                                handleChange(heading.id, sub.id, field.id, val, field.maxChars, rowIdx);
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 459,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                color: '#00695c',
                                marginTop: '4px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            },
                            children: permSourceField ? `Linked to: ${permSourceField.label} (Editable)` : 'No source connected'
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 468,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 458,
                    columnNumber: 21
                }, this);
            case 'Grid':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-grid-wrapper",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-grid-container",
                        style: {
                            display: 'grid',
                            gridTemplateColumns: `repeat(${field.gridCols?.length || 1}, 1fr)`,
                            gap: '12px'
                        },
                        children: (field.gridCols || []).map((col, cIdx)=>{
                            const baseKey = getFieldKey(heading.id, sub.id, field.id);
                            const colKey = rowIdx !== null ? `${baseKey}_row${rowIdx}_col${cIdx}` : `${baseKey}_col${cIdx}`;
                            const colValue = formData[colKey] || '';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid-col-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '11px',
                                            color: 'var(--text-secondary)',
                                            marginBottom: '4px',
                                            fontWeight: '600'
                                        },
                                        children: col.label
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 487,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "data-entry-input",
                                        value: colValue,
                                        onChange: (e)=>{
                                            setFormData((prev)=>({
                                                    ...prev,
                                                    [colKey]: e.target.value
                                                }));
                                        },
                                        placeholder: col.placeholder || `Enter ${col.label}...`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 490,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, cIdx, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 486,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 476,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 475,
                    columnNumber: 21
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ...inputProps,
                    type: "text"
                }, void 0, false, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 505,
                    columnNumber: 24
                }, this);
        }
    };
    const handleAddSimpleLinkEntry = (field)=>{
        const linkedPage = getPage(field.linkedPageId);
        if (!linkedPage) return;
        const labelField = field.displayFieldName || 'Name';
        const newVal = window.prompt(`Enter new ${labelField} for ${linkedPage.name}:`);
        if (!newVal || !newVal.trim()) return;
        // Map label field to its content key
        let targetFieldKey = null;
        for (const heading of linkedPage.headings || []){
            for (const sub of heading.subHeadings || []){
                for (const f of sub.fields || []){
                    if (f.label === labelField) {
                        targetFieldKey = getFieldKey(heading.id, sub.id, f.id);
                        break;
                    }
                }
            }
        }
        if (targetFieldKey) {
            addEntry(field.linkedPageId, {
                [targetFieldKey]: newVal.trim()
            });
            setRefreshKey((k)=>k + 1); // Refresh UI to show new entry in dropdown
        } else {
            // Fallback: if label field not found, try adding with a generic key if it's a simple page
            // But usually labelField should match one of the fields.
            alert(`Note: The field "${labelField}" was not found in ${linkedPage.name}. Adding as generic entry.`);
            addEntry(field.linkedPageId, {
                name: newVal.trim()
            });
            setRefreshKey((k)=>k + 1);
        }
    };
    const handleSave = ()=>{
        // Collect all headings from all enabled sections for validation
        const sectionsToValidate = [
            ...page.headings || [],
            ...page.staticSeoEnabled ? page.staticSeoHeadings || [] : [],
            ...page.dynamicSeoEnabled ? page.dynamicSeoHeadings || [] : []
        ];
        // Validate required fields
        for (const heading of sectionsToValidate){
            for (const sub of heading.subHeadings || []){
                for (const field of sub.fields || []){
                    const key = getFieldKey(heading.id, sub.id, field.id);
                    if (field.infinity) {
                        const rowIds = repeaterRows[key] || [
                            0
                        ];
                        for(let i = 0; i < rowIds.length; i++){
                            const rowKey = `${key}_row${i}`;
                            const val = formData[rowKey];
                            if (field.required && (!val || !val.toString().trim())) {
                                alert(`"${field.label}" (Row ${i + 1}) is required`);
                                return;
                            }
                        }
                    } else {
                        if (field.required && !formData[key]?.toString().trim()) {
                            alert(`"${field.label}" is required`);
                            return;
                        }
                    }
                }
            }
        }
        // Validate unique fields — prevent duplicate values
        const existingEntries = getPageEntries(pageId);
        for (const heading of sectionsToValidate){
            for (const sub of heading.subHeadings || []){
                for (const field of sub.fields || []){
                    if (!field.unique) continue;
                    const key = getFieldKey(heading.id, sub.id, field.id);
                    const newValue = (formData[key] || '').toString().trim().toLowerCase();
                    if (!newValue) continue; // skip empty
                    const isDuplicate = existingEntries.some((entry)=>{
                        // Skip the current entry when editing
                        if (!isNew && entry.id === Number(entryId)) return false;
                        const existingVal = (entry.data?.[key] || '').toString().trim().toLowerCase();
                        return existingVal === newValue;
                    });
                    if (isDuplicate) {
                        alert(`"${field.label}" must be unique. The value "${formData[key]}" already exists.`);
                        return;
                    }
                }
            }
        }
        if (!isNew) {
            updateEntry(Number(pageId), Number(entryId), {
                ...formData
            });
            alert('Entry updated successfully!');
            setRefreshKey((k)=>k + 1);
        } else {
            addEntry(Number(pageId), {
                ...formData
            });
            alert('Entry saved successfully!');
            if (isSettingsPage) {
                setRefreshKey((k)=>k + 1);
            } else {
                router.push(`/data-entry/${pageId}`);
            }
        }
    };
    const handleClear = ()=>{
        setFormData({});
    };
    // Merge shared entries with local
    const allEntries = getPageEntries(Number(pageId));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "data-entry-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-header-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "back-btn",
                                onClick: ()=>router.push(isSettingsPage ? '/pages' : `/data-entry/${pageId}`),
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 628,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 700
                                        },
                                        children: page.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 632,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "separator",
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 633,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--text-secondary)'
                                        },
                                        children: isSettingsPage ? 'Manage' : entryId === 'new' ? 'New Entry' : 'Edit Entry'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                        lineNumber: 634,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 631,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 627,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-header-right",
                        children: !isSettingsPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-outline btn-sm",
                            onClick: ()=>router.push(`/data-entry/${pageId}`),
                            children: "Back to List"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 641,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                        lineNumber: 639,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                lineNumber: 626,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "data-entry-body",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-body",
                    children: [
                        (()=>{
                            const renderSection = (heading, sectionLabel = '')=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "data-entry-section animate-fade-in-up",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "data-entry-main-heading",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: [
                                                    heading.title || 'Untitled Heading',
                                                    sectionLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            marginLeft: '12px',
                                                            fontSize: '12px',
                                                            verticalAlign: 'middle',
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                            background: 'rgba(79,70,229,0.1)',
                                                            color: 'var(--accent)',
                                                            fontWeight: 600
                                                        },
                                                        children: sectionLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                        lineNumber: 659,
                                                        columnNumber: 58
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                lineNumber: 657,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                            lineNumber: 656,
                                            columnNumber: 33
                                        }, this),
                                        (heading.subHeadings || []).map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "data-entry-sub-section",
                                                children: [
                                                    sub.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "data-entry-sub-heading",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: sub.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                            lineNumber: 667,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                        lineNumber: 666,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "data-entry-fields-grid",
                                                        children: (sub.fields || []).filter((field)=>{
                                                            const isProductField = [
                                                                'Product Name',
                                                                'Quantity',
                                                                'Type'
                                                            ].includes(field.label);
                                                            const isAdmin = user?.role === 'Super Admin' || user?.role === 'System Admin';
                                                            if (isAdmin && page.superAdminEnabled === false && isProductField) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }).map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `data-entry-field-group ${field.maxChars > 120 ? 'span-full' : ''}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "data-entry-label",
                                                                        children: [
                                                                            field.label || 'Untitled Field',
                                                                            field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "required",
                                                                                children: "*"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 80
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `data-entry-type-badge ${field.valueType === 'Link' ? 'badge-link' : ''}`,
                                                                                children: field.valueType === 'Link' ? `🔗 ${getPage(field.linkedPageId)?.name || 'Link'}` : field.valueType
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                lineNumber: 689,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            field.infinity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "badge-infinity",
                                                                                children: "∞ Infinity"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                lineNumber: 693,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                        lineNumber: 686,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    field.infinity || field.maxItems > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "repeater-container",
                                                                        children: [
                                                                            (repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [
                                                                                0
                                                                            ]).map((rowId, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "repeater-row animate-fade-in-up",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "repeater-row-content",
                                                                                            children: renderFieldInput(heading, sub, field, idx)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                            lineNumber: 701,
                                                                                            columnNumber: 73
                                                                                        }, this),
                                                                                        field.infinity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            className: "repeater-delete-btn",
                                                                                            onClick: ()=>removeRepeaterRow(getFieldKey(heading.id, sub.id, field.id), rowId),
                                                                                            children: "✕"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                            lineNumber: 705,
                                                                                            columnNumber: 77
                                                                                        }, this)
                                                                                    ]
                                                                                }, rowId, true, {
                                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                    lineNumber: 700,
                                                                                    columnNumber: 69
                                                                                }, this)),
                                                                            field.infinity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "repeater-add-btn",
                                                                                onClick: ()=>addRepeaterRow(getFieldKey(heading.id, sub.id, field.id), field.maxItems),
                                                                                disabled: field.maxItems > 0 && (repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [
                                                                                    0
                                                                                ]).length >= field.maxItems,
                                                                                style: {
                                                                                    marginTop: '8px'
                                                                                },
                                                                                children: [
                                                                                    "+ Add ",
                                                                                    field.label || 'Row'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                                lineNumber: 715,
                                                                                columnNumber: 69
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 61
                                                                    }, this) : renderFieldInput(heading, sub, field)
                                                                ]
                                                            }, field.id, true, {
                                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                lineNumber: 682,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                        lineNumber: 671,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, sub.id, true, {
                                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                lineNumber: 664,
                                                columnNumber: 37
                                            }, this))
                                    ]
                                }, heading.id, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 655,
                                    columnNumber: 29
                                }, this);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    (page.headings || []).map((h)=>renderSection(h)),
                                    page.staticSeoEnabled && (page.staticSeoHeadings || []).map((h)=>renderSection(h, 'Static SEO')),
                                    page.dynamicSeoEnabled && (page.dynamicSeoHeadings || []).map((h)=>renderSection(h, 'Dynamic SEO'))
                                ]
                            }, void 0, true);
                        })(),
                        headings.length === 0 && !page.staticSeoEnabled && !page.dynamicSeoEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "data-entry-empty-page",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "No structure configured"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 752,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Go to Edit Page to set up headings and fields first."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 753,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary",
                                    onClick: ()=>router.push(`/edit-page/${pageId}`),
                                    children: "Edit Page Structure"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 754,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 751,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "data-entry-footer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-outline",
                                    onClick: handleClear,
                                    children: "Clear"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 762,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary",
                                    onClick: handleSave,
                                    children: [
                                        "💾 ",
                                        isSettingsPage ? 'Save Changes' : !isNew ? 'Update Entry' : 'Save Entry'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 765,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 761,
                            columnNumber: 21
                        }, this)
                    ]
                }, refreshKey, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 651,
                    columnNumber: 17
                }, this)
            }, refreshKey, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                lineNumber: 649,
                columnNumber: 13
            }, this),
            viewEntryData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay animate-fade-in",
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(10px)'
                },
                onClick: ()=>setViewEntryData(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-content animate-scale-up",
                    style: {
                        background: 'white',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 24px',
                                borderBottom: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: '800'
                                    },
                                    children: "Entry Details"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 787,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "action-icon-btn",
                                    onClick: ()=>setViewEntryData(null),
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 788,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 786,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '24px',
                                overflowY: 'auto',
                                flex: 1
                            },
                            children: headings.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '24px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                color: 'var(--text-soft)',
                                                textTransform: 'uppercase',
                                                marginBottom: '12px'
                                            },
                                            children: h.title
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                            lineNumber: 793,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '12px'
                                            },
                                            children: h.subHeadings?.map((sh)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: sh.fields?.map((f)=>{
                                                        const key = getFieldKey(h.id, sh.id, f.id);
                                                        const val = viewEntryData.data?.[key];
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'grid',
                                                                gridTemplateColumns: '120px 1fr',
                                                                gap: '16px',
                                                                marginBottom: '8px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: '13px',
                                                                        color: 'var(--text-soft)',
                                                                        fontWeight: '600'
                                                                    },
                                                                    children: [
                                                                        f.label,
                                                                        ":"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                    lineNumber: 802,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: '13px',
                                                                        color: 'var(--text-primary)',
                                                                        fontWeight: '700'
                                                                    },
                                                                    children: val || '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                                    lineNumber: 803,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, f.id, true, {
                                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                            lineNumber: 801,
                                                            columnNumber: 57
                                                        }, this);
                                                    })
                                                }, sh.id, false, {
                                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                                    lineNumber: 796,
                                                    columnNumber: 45
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                            lineNumber: 794,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, h.id, true, {
                                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                    lineNumber: 792,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 790,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '16px 24px',
                                background: '#f8fafc',
                                borderTop: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '12px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary btn-sm",
                                onClick: ()=>setViewEntryData(null),
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                                lineNumber: 814,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                            lineNumber: 813,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                    lineNumber: 781,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx",
                lineNumber: 776,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/Desktop/crm demo/backend/src/app/data-entry/[pageId]/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataEntryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/components/AppLayout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$views$2f$DataEntry$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/crm demo/backend/src/views/DataEntry.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function DataEntryPage(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '2rem'
            },
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Desktop/crm demo/backend/src/app/data-entry/[pageId]/page.jsx",
            lineNumber: 8,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$crm__demo$2f$backend$2f$src$2f$views$2f$DataEntry$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/Desktop/crm demo/backend/src/app/data-entry/[pageId]/page.jsx",
                lineNumber: 10,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/crm demo/backend/src/app/data-entry/[pageId]/page.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/crm demo/backend/src/app/data-entry/[pageId]/page.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b62cd97._.js.map