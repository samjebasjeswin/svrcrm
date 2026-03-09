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
"[project]/src/components/AppLayout.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function AppLayout({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { companies, currentCompanyId, getCompanyPages, getPageEntries, inquiries, user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const currentCompany = companies.find((c)=>c.id === currentCompanyId);
    const pages = getCompanyPages();
    const newInquiries = inquiries.filter((i)=>i.companyId === currentCompanyId && i.status === 'New').length;
    const isActive = (path)=>pathname === path;
    const isTabActive = (tab)=>searchParams.get('tab') === tab;
    const sidebarSections = [
        {
            label: 'HUB ADMIN',
            items: pages.map((page)=>{
                const count = getPageEntries(page.id).length;
                const lowerName = page.name.toLowerCase().trim();
                const isForm = lowerName === 'form';
                const isSettingsPage = page.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';
                let targetPath = `/data-entry/${page.id}`;
                if (isSettingsPage) {
                    const entries = getPageEntries(page.id);
                    if (entries.length > 0) {
                        targetPath = `/data-entry/${page.id}/${entries[0].id}`;
                    } else {
                        targetPath = `/data-entry/${page.id}/new`;
                    }
                }
                return {
                    icon: isForm ? '📋' : '📦',
                    label: page.name,
                    sublabel: `${count} ${count === 1 ? 'entry' : 'entries'}`,
                    badge: isForm && newInquiries > 0 ? newInquiries : null,
                    path: targetPath
                };
            }),
            footer: user?.role === 'System Admin' ? {
                icon: '+',
                label: 'Add Page',
                path: '/pages'
            } : null
        },
        ...user?.role === 'System Admin' || user?.role === 'Super Admin' ? [
            {
                label: 'SYSTEM ADMIN',
                hideLabel: true,
                items: [
                    {
                        icon: '🗺️',
                        label: 'Mapping',
                        path: '/pages?tab=mapping'
                    },
                    ...user?.role === 'System Admin' ? [
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
                    ] : []
                ]
            }
        ] : []
    ];
    const handleNav = (path)=>{
        router.push(path);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--bg)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px 18px 16px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            cursor: 'pointer'
                        },
                        onClick: ()=>router.push('/'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    fileName: "[project]/src/components/AppLayout.jsx",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        overflow: 'hidden'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        fileName: "[project]/src/components/AppLayout.jsx",
                                        lineNumber: 91,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AppLayout.jsx",
                                    lineNumber: 90,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AppLayout.jsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AppLayout.jsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '12px 14px 8px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: '300'
                                    },
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AppLayout.jsx",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, this),
                                " Create"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AppLayout.jsx",
                            lineNumber: 100,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AppLayout.jsx",
                        lineNumber: 99,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '4px 0',
                            scrollbarWidth: 'none'
                        },
                        children: sidebarSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '4px'
                                },
                                children: [
                                    section.label && !section.hideLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        fileName: "[project]/src/components/AppLayout.jsx",
                                        lineNumber: 120,
                                        columnNumber: 33
                                    }, this),
                                    section.items.map((item)=>{
                                        const currentFull = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
                                        const exactActive = currentFull === item.path || pathname === item.path && !item.path.includes('?');
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '15px',
                                                        flexShrink: 0,
                                                        opacity: 0.8
                                                    },
                                                    children: item.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AppLayout.jsx",
                                                    lineNumber: 144,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                    fileName: "[project]/src/components/AppLayout.jsx",
                                                    lineNumber: 145,
                                                    columnNumber: 41
                                                }, this),
                                                item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                    fileName: "[project]/src/components/AppLayout.jsx",
                                                    lineNumber: 155,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, item.label, true, {
                                            fileName: "[project]/src/components/AppLayout.jsx",
                                            lineNumber: 132,
                                            columnNumber: 37
                                        }, this);
                                    }),
                                    section.footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '14px',
                                                    opacity: 0.5,
                                                    flexShrink: 0
                                                },
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AppLayout.jsx",
                                                lineNumber: 176,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: 'rgba(255,255,255,0.4)'
                                                },
                                                children: section.footer.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AppLayout.jsx",
                                                lineNumber: 177,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AppLayout.jsx",
                                        lineNumber: 166,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, section.label, true, {
                                fileName: "[project]/src/components/AppLayout.jsx",
                                lineNumber: 118,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AppLayout.jsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            padding: '14px 16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    fileName: "[project]/src/components/AppLayout.jsx",
                                    lineNumber: 187,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        overflow: 'hidden'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: 'white',
                                                textTransform: 'capitalize'
                                            },
                                            children: user?.username
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AppLayout.jsx",
                                            lineNumber: 195,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '10px',
                                                color: 'rgba(255,255,255,0.4)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            },
                                            children: user?.role?.toUpperCase() || 'COMPANY_ADMIN'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AppLayout.jsx",
                                            lineNumber: 198,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AppLayout.jsx",
                                    lineNumber: 194,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    fileName: "[project]/src/components/AppLayout.jsx",
                                    lineNumber: 202,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AppLayout.jsx",
                            lineNumber: 186,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AppLayout.jsx",
                        lineNumber: 185,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AppLayout.jsx",
                lineNumber: 73,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/AppLayout.jsx",
                lineNumber: 220,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AppLayout.jsx",
        lineNumber: 71,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/views/EditPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const VALUE_TYPES = [
    'Number',
    'Text',
    'Symbol',
    'Number & Text',
    'Symbol & Text',
    'Link',
    'Rich Editor',
    '120 Char',
    '160 Char',
    'Image',
    'Grid',
    'Slug',
    'Permalink'
];
function FieldEditModal({ field, onSave, onClose, pages, currentPageId }) {
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.label || '');
    const [valueType, setValueType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.valueType || 'Text');
    const [required, setRequired] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.required ?? false);
    const [minChars, setMinChars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.minChars || '');
    const [maxChars, setMaxChars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.maxChars || '');
    const [linkedPageId, setLinkedPageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.linkedPageId || '');
    const [slugSourceFieldId, setSlugSourceFieldId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.slugSourceFieldId || '');
    const [permalinkSourceFieldId, setPermalinkSourceFieldId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(field?.permalinkSourceFieldId || '');
    const otherPages = pages.filter((p)=>p.id !== Number(currentPageId));
    const handleSave = ()=>{
        onSave({
            ...field,
            label,
            valueType,
            required,
            minChars: Number(minChars) || 0,
            maxChars: Number(maxChars) || 0,
            linkedPageId: valueType === 'Link' ? Number(linkedPageId) || null : null,
            slugSourceFieldId: valueType === 'Slug' ? slugSourceFieldId : null,
            permalinkSourceFieldId: valueType === 'Permalink' ? permalinkSourceFieldId : null
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal field-edit-modal",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Edit Field"
                }, void 0, false, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 37,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "form-label",
                            children: [
                                "Label (Title) ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "required",
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 39,
                                    columnNumber: 65
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "form-input",
                            value: label,
                            onChange: (e)=>setLabel(e.target.value),
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "form-label",
                            children: [
                                "Value Type ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "required",
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 43,
                                    columnNumber: 62
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pill-group",
                            children: VALUE_TYPES.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `pill ${valueType === type ? type === 'Link' ? 'active-link' : 'active' : ''}`,
                                    onClick: ()=>setValueType(type),
                                    children: type === 'Link' ? '🔗 Link' : type
                                }, type, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 46,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this),
                valueType === 'Link' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "form-label",
                            children: [
                                "Link to Page ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "required",
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 59,
                                    columnNumber: 68
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 59,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "form-input",
                            value: linkedPageId,
                            onChange: (e)=>setLinkedPageId(e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "-- Select a page --"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 65,
                                    columnNumber: 29
                                }, this),
                                otherPages.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: p.id,
                                        children: p.name
                                    }, p.id, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 67,
                                        columnNumber: 33
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 60,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 58,
                    columnNumber: 21
                }, this),
                valueType === 'Slug' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "form-label",
                            children: [
                                "Connect to Field (Slug Source) ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "required",
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 74,
                                    columnNumber: 86
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 74,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "form-input",
                            value: slugSourceFieldId,
                            onChange: (e)=>setSlugSourceFieldId(e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "-- Select source field --"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 80,
                                    columnNumber: 29
                                }, this),
                                pages.find((p)=>p.id === Number(currentPageId))?.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields?.filter((f)=>f.id !== field?.id && f.valueType !== 'Slug').map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: f.id,
                                                children: f.label || `Field ${f.id}`
                                            }, f.id, false, {
                                                fileName: "[project]/src/views/EditPage.jsx",
                                                lineNumber: 84,
                                                columnNumber: 41
                                            }, this)) || []) || []) || []
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 75,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 73,
                    columnNumber: 21
                }, this),
                valueType === 'Permalink' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "form-label",
                            children: [
                                "Connect to Field (Permalink Source) ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "required",
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 93,
                                    columnNumber: 91
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 93,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "form-input",
                            value: permalinkSourceFieldId,
                            onChange: (e)=>setPermalinkSourceFieldId(e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "-- Select source field --"
                                }, void 0, false, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 99,
                                    columnNumber: 29
                                }, this),
                                pages.find((p)=>p.id === Number(currentPageId))?.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields?.filter((f)=>f.id !== field?.id && f.valueType !== 'Permalink').map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: f.id,
                                                children: f.label || `Field ${f.id}`
                                            }, f.id, false, {
                                                fileName: "[project]/src/views/EditPage.jsx",
                                                lineNumber: 103,
                                                columnNumber: 41
                                            }, this)) || []) || []) || []
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 94,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 92,
                    columnNumber: 21
                }, this),
                valueType !== 'Link' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "form-label",
                            children: "Character Limits"
                        }, void 0, false, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 112,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "char-limit-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label",
                                            style: {
                                                fontSize: 12
                                            },
                                            children: "Min Characters"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 115,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "form-input",
                                            type: "number",
                                            value: minChars,
                                            onChange: (e)=>setMinChars(e.target.value),
                                            placeholder: "e.g. 0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 116,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 114,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label",
                                            style: {
                                                fontSize: 12
                                            },
                                            children: "Max Characters"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 119,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "form-input",
                                            type: "number",
                                            value: maxChars,
                                            onChange: (e)=>setMaxChars(e.target.value),
                                            placeholder: "e.g. 160"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 120,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 113,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 111,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "form-group",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "toggle",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            width: 'auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: required,
                                onChange: (e)=>setRequired(e.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 127,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "toggle-slider"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 128,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 500
                                },
                                children: "Required"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 129,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 126,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 125,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-actions",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-outline",
                            onClick: onClose,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 133,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-primary",
                            onClick: handleSave,
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 134,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/EditPage.jsx",
                    lineNumber: 132,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/views/EditPage.jsx",
            lineNumber: 36,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/views/EditPage.jsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
function EditPage() {
    const { pageId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { getPage, updatePage, deletePage, getCompanyPages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const page = getPage(pageId);
    const allPages = getCompanyPages();
    const [headings, setHeadings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingField, setEditingField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [singleEntry, setSingleEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchEnabled, setSearchEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchFieldId, setSearchFieldId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (page) {
            const migrated = (page.headings || []).map((h)=>({
                    ...h,
                    subHeadings: h.subHeadings || [
                        {
                            id: Date.now() + Math.random(),
                            title: '',
                            fields: h.fields || []
                        }
                    ]
                }));
            setHeadings(migrated);
            setSingleEntry(page.singleEntry || false);
            setSearchEnabled(page.searchEnabled || false);
            setSearchFieldId(page.searchFieldId || '');
        }
    }, [
        page?.id
    ]);
    if (!page) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Page not found"
                    }, void 0, false, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 174,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-primary",
                        style: {
                            marginTop: 16
                        },
                        onClick: ()=>router.push('/pages'),
                        children: "Back to Pages"
                    }, void 0, false, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 175,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/EditPage.jsx",
                lineNumber: 173,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/views/EditPage.jsx",
            lineNumber: 172,
            columnNumber: 13
        }, this);
    }
    const otherPages = allPages.filter((p)=>p.id !== Number(pageId));
    const getValueTypeClass = (type)=>{
        switch(type){
            case 'Number':
                return 'active-number';
            case 'Text':
                return 'active';
            case 'Symbol':
                return 'active-symbol';
            case 'Number & Text':
                return 'active-numtext';
            case 'Symbol & Text':
                return 'active-symtext';
            case 'Link':
                return 'active-link';
            case 'Rich Editor':
                return 'active-rich';
            case '120 Char':
                return 'active-120';
            case '160 Char':
                return 'active-160';
            case 'Image':
                return 'active-image';
            case 'Grid':
                return 'active-grid';
            case 'Slug':
                return 'active-slug';
            case 'Permalink':
                return 'active-permalink';
            default:
                return 'active';
        }
    };
    // ---- Sub-heading operations ----
    const addSubHeading = (headingId)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: [
                        ...h.subHeadings,
                        {
                            id: Date.now() + Math.random(),
                            title: '',
                            fields: []
                        }
                    ]
                } : h));
    };
    const updateSubHeadingTitle = (headingId, subId, title)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>sh.id === subId ? {
                            ...sh,
                            title
                        } : sh)
                } : h));
    };
    const deleteSubHeading = (headingId, subId)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.filter((sh)=>sh.id !== subId)
                } : h));
    };
    // ---- Field operations ----
    const addGrid = (headingId, subId)=>{
        const colCount = window.prompt('How many grid columns do you need?', '2');
        const num = parseInt(colCount);
        if (isNaN(num) || num <= 0) return;
        const gridCols = Array.from({
            length: num
        }, (_, i)=>({
                id: i,
                label: `Column ${i + 1}`,
                placeholder: 'Enter details...'
            }));
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>sh.id === subId ? {
                            ...sh,
                            fields: [
                                ...sh.fields,
                                {
                                    id: Date.now() + Math.random(),
                                    label: 'Grid Field',
                                    valueType: 'Grid',
                                    required: false,
                                    gridCols
                                }
                            ]
                        } : sh)
                } : h));
    };
    const addField = (headingId, subId)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>sh.id === subId ? {
                            ...sh,
                            fields: [
                                ...sh.fields,
                                {
                                    id: Date.now() + Math.random(),
                                    label: '',
                                    valueType: 'Text',
                                    required: false
                                }
                            ]
                        } : sh)
                } : h));
    };
    const updateFieldInline = (headingId, subId, fieldId, key, value)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>sh.id === subId ? {
                            ...sh,
                            fields: sh.fields.map((f)=>f.id === fieldId ? {
                                    ...f,
                                    [key]: value
                                } : f)
                        } : sh)
                } : h));
    };
    const updateFieldLink = (headingId, subId, fieldId, linkedPageId)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>sh.id === subId ? {
                            ...sh,
                            fields: sh.fields.map((f)=>f.id === fieldId ? {
                                    ...f,
                                    valueType: 'Link',
                                    linkedPageId: Number(linkedPageId) || null
                                } : f)
                        } : sh)
                } : h));
    };
    const deleteField = (headingId, subId, fieldId)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>sh.id === subId ? {
                            ...sh,
                            fields: sh.fields.filter((f)=>f.id !== fieldId)
                        } : sh)
                } : h));
    };
    // ---- Heading operations ----
    const addHeading = ()=>{
        setHeadings((prev)=>[
                ...prev,
                {
                    id: Date.now(),
                    title: '',
                    subHeadings: [
                        {
                            id: Date.now() + 1,
                            title: '',
                            fields: []
                        }
                    ]
                }
            ]);
    };
    const updateHeadingTitle = (headingId, title)=>{
        setHeadings((prev)=>prev.map((h)=>h.id === headingId ? {
                    ...h,
                    title
                } : h));
    };
    const deleteHeading = (headingId)=>{
        if (headings.length <= 1) return;
        setHeadings((prev)=>prev.filter((h)=>h.id !== headingId));
    };
    const handleUpdate = ()=>{
        updatePage(Number(pageId), {
            headings,
            singleEntry,
            searchEnabled,
            searchFieldId
        });
        router.push('/pages');
    };
    const handleDeletePage = ()=>{
        if (confirm('Are you sure you want to delete this page?')) {
            deletePage(Number(pageId));
            router.push('/pages');
        }
    };
    const handleEditFieldSave = (updatedField)=>{
        setHeadings((prev)=>prev.map((h)=>({
                    ...h,
                    subHeadings: h.subHeadings.map((sh)=>({
                            ...sh,
                            fields: sh.fields.map((f)=>f.id === updatedField.id ? updatedField : f)
                        }))
                })));
        setEditingField(null);
    };
    const getLinkedPageName = (linkedPageId)=>{
        const p = allPages.find((pg)=>pg.id === linkedPageId);
        return p ? p.name : '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "edit-page-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "edit-page-header-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "back-btn",
                                onClick: ()=>router.push('/pages'),
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 435,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 700
                                        },
                                        children: "Edit Page"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 439,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "separator",
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 440,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--text-secondary)'
                                        },
                                        children: page.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 441,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 438,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 434,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "edit-page-header-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-danger-text btn-sm",
                                onClick: handleDeletePage,
                                children: "🗑 Delete Page"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 445,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline btn-sm",
                                onClick: ()=>router.push('/pages'),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 448,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary btn-sm",
                                onClick: handleUpdate,
                                children: "Update"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 451,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 444,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/EditPage.jsx",
                lineNumber: 433,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 24px',
                    background: singleEntry ? 'rgba(79,70,229,0.06)' : '#f8fafc',
                    border: `1.5px solid ${singleEntry ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px',
                    marginBottom: '24px',
                    transition: 'all 0.2s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    color: 'var(--text-primary)'
                                },
                                children: "Single Entry Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 465,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)',
                                    marginTop: '2px'
                                },
                                children: singleEntry ? 'ON — This page works like a settings page (one form, no catalog list)' : 'OFF — This page shows a catalog with multiple entries'
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 466,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 464,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "toggle",
                        style: {
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: singleEntry,
                                onChange: (e)=>setSingleEntry(e.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 473,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "toggle-slider"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 474,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 472,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/EditPage.jsx",
                lineNumber: 458,
                columnNumber: 13
            }, this),
            !singleEntry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '16px 24px',
                    background: searchEnabled ? 'rgba(16,185,129,0.06)' : '#f8fafc',
                    border: `1.5px solid ${searchEnabled ? '#10b981' : 'var(--border)'}`,
                    borderRadius: '12px',
                    marginBottom: '24px',
                    transition: 'all 0.2s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            color: 'var(--text-primary)'
                                        },
                                        children: "Enable Search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 488,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '12px',
                                            color: 'var(--text-secondary)',
                                            marginTop: '2px'
                                        },
                                        children: "Show a search bar in the catalog list to filter entries"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 489,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 487,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "toggle",
                                style: {
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: searchEnabled,
                                        onChange: (e)=>setSearchEnabled(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 494,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "toggle-slider",
                                        style: {
                                            backgroundColor: searchEnabled ? '#10b981' : '#ccc'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 495,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 493,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 486,
                        columnNumber: 21
                    }, this),
                    searchEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-field-selector",
                        style: {
                            borderTop: '1px solid rgba(0,0,0,0.05)',
                            paddingTop: '12px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    marginBottom: '8px',
                                    display: 'block'
                                },
                                children: "Searchable Field"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 500,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "form-input",
                                style: {
                                    height: '38px',
                                    fontSize: '13px'
                                },
                                value: searchFieldId,
                                onChange: (e)=>setSearchFieldId(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "-- All fields (Text search) --"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/EditPage.jsx",
                                        lineNumber: 507,
                                        columnNumber: 33
                                    }, this),
                                    headings.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields?.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: f.id,
                                                    children: [
                                                        "🔍 ",
                                                        f.label || `Field ${f.id}`
                                                    ]
                                                }, f.id, true, {
                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                    lineNumber: 509,
                                                    columnNumber: 37
                                                }, this)) || []) || []).map((opt)=>opt)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 501,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '11px',
                                    color: 'var(--text-secondary)',
                                    marginTop: '6px'
                                },
                                children: "Select which field users can search through (e.g. Name, SKU, Email)"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 512,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 499,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/EditPage.jsx",
                lineNumber: 480,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "edit-page-body",
                children: [
                    headings.map((heading, hIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "heading-block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "heading-input-wrapper",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "heading-top-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "heading-label",
                                                    children: [
                                                        "Heading ",
                                                        hIndex + 1,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "required",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                            lineNumber: 528,
                                                            columnNumber: 58
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                    lineNumber: 527,
                                                    columnNumber: 33
                                                }, this),
                                                headings.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn btn-danger-text btn-sm",
                                                    onClick: ()=>deleteHeading(heading.id),
                                                    style: {
                                                        fontSize: 12,
                                                        padding: '4px 8px'
                                                    },
                                                    children: "✕ Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                    lineNumber: 531,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 526,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "heading-input",
                                            value: heading.title,
                                            onChange: (e)=>updateHeadingTitle(heading.id, e.target.value),
                                            placeholder: "Main heading for this page section"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 540,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "heading-placeholder",
                                            children: "Main heading for this page section"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 546,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 525,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "subheadings-container",
                                    children: [
                                        heading.subHeadings.map((sub, sIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "subheading-block animate-slide-down",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "subheading-header",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "subheading-input-wrapper",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "subheading-label",
                                                                    children: [
                                                                        "Sub Heading ",
                                                                        sIndex + 1,
                                                                        heading.subHeadings.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "btn btn-danger-text btn-sm",
                                                                            onClick: ()=>deleteSubHeading(heading.id, sub.id),
                                                                            style: {
                                                                                fontSize: 11,
                                                                                padding: '2px 6px',
                                                                                marginLeft: 8
                                                                            },
                                                                            children: "✕"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                            lineNumber: 558,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                    lineNumber: 555,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    className: "subheading-input",
                                                                    value: sub.title,
                                                                    onChange: (e)=>updateSubHeadingTitle(heading.id, sub.id, e.target.value),
                                                                    placeholder: "Sub heading title"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                    lineNumber: 567,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                            lineNumber: 554,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                        lineNumber: 553,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "fields-section",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "fields-header",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                children: "Page Fields"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 580,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: "Add labels and select value types"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 581,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                                        lineNumber: 579,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "fields-header-actions",
                                                                        style: {
                                                                            display: 'flex',
                                                                            gap: '10px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "btn btn-ghost btn-sm",
                                                                                style: {
                                                                                    border: '1.5px dashed var(--accent)',
                                                                                    color: 'var(--accent)'
                                                                                },
                                                                                onClick: ()=>addGrid(heading.id, sub.id),
                                                                                children: "+ Grid"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 584,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "btn btn-accent btn-sm",
                                                                                onClick: ()=>addField(heading.id, sub.id),
                                                                                children: "+ Add New Field"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 587,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                lineNumber: 578,
                                                                columnNumber: 41
                                                            }, this),
                                                            sub.fields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "fields-table-header",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Label / Grid Config"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 596,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Value Type *"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 597,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Required"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 598,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Infinity / Max"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 599,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Actions"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                lineNumber: 600,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                                        lineNumber: 595,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    sub.fields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "field-row",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    className: "field-label-input",
                                                                                    value: field.label,
                                                                                    onChange: (e)=>updateFieldInline(heading.id, sub.id, field.id, 'label', e.target.value),
                                                                                    placeholder: "Field name"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                    lineNumber: 605,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "pill-group-wrapper",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "pill-group",
                                                                                            children: VALUE_TYPES.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    type: "button",
                                                                                                    className: `pill ${field.valueType === type ? getValueTypeClass(type) : ''}`,
                                                                                                    onClick: ()=>{
                                                                                                        if (type === 'Link') {
                                                                                                            updateFieldInline(heading.id, sub.id, field.id, 'valueType', 'Link');
                                                                                                        } else {
                                                                                                            updateFieldInline(heading.id, sub.id, field.id, 'valueType', type);
                                                                                                            updateFieldInline(heading.id, sub.id, field.id, 'linkedPageId', null);
                                                                                                        }
                                                                                                    },
                                                                                                    children: type === 'Link' ? '🔗 Link' : type
                                                                                                }, type, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 616,
                                                                                                    columnNumber: 69
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 614,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        field.valueType === 'Link' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "link-page-selector",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                                    className: "link-page-select",
                                                                                                    value: field.linkedPageId || '',
                                                                                                    onChange: (e)=>updateFieldLink(heading.id, sub.id, field.id, e.target.value),
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                            value: "",
                                                                                                            children: "Select page to link..."
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                                            lineNumber: 642,
                                                                                                            columnNumber: 73
                                                                                                        }, this),
                                                                                                        otherPages.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                                value: p.id,
                                                                                                                children: [
                                                                                                                    "📄 ",
                                                                                                                    p.name
                                                                                                                ]
                                                                                                            }, p.id, true, {
                                                                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                                                                lineNumber: 644,
                                                                                                                columnNumber: 77
                                                                                                            }, this))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 635,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                field.linkedPageId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "linked-page-badge",
                                                                                                    children: [
                                                                                                        "🔗 ",
                                                                                                        getLinkedPageName(field.linkedPageId)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 650,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 634,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        field.valueType === 'Slug' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "link-page-selector",
                                                                                            style: {
                                                                                                position: 'relative'
                                                                                            },
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                                    className: "link-page-select",
                                                                                                    style: {
                                                                                                        paddingLeft: '32px'
                                                                                                    },
                                                                                                    value: field.slugSourceFieldId || '',
                                                                                                    onChange: (e)=>updateFieldInline(heading.id, sub.id, field.id, 'slugSourceFieldId', e.target.value),
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                            value: "",
                                                                                                            children: "Select source field..."
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                                            lineNumber: 667,
                                                                                                            columnNumber: 73
                                                                                                        }, this),
                                                                                                        page.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields?.filter((f)=>f.id !== field.id && f.valueType !== 'Slug').map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                                        value: f.id,
                                                                                                                        children: f.label || `Field ${f.id}`
                                                                                                                    }, f.id, false, {
                                                                                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                                                                                        lineNumber: 671,
                                                                                                                        columnNumber: 85
                                                                                                                    }, this)) || []) || []) || []
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 659,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    style: {
                                                                                                        position: 'absolute',
                                                                                                        left: '10px',
                                                                                                        top: '50%',
                                                                                                        transform: 'translateY(-50%)',
                                                                                                        opacity: 0.5,
                                                                                                        pointerEvents: 'none'
                                                                                                    },
                                                                                                    children: "🔗"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 676,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                field.slugSourceFieldId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "linked-page-badge",
                                                                                                    style: {
                                                                                                        background: '#fff3e0',
                                                                                                        color: '#e65100',
                                                                                                        borderColor: '#e65100'
                                                                                                    },
                                                                                                    children: [
                                                                                                        "Slug Source: ",
                                                                                                        page.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields)).find((f)=>String(f?.id) === String(field.slugSourceFieldId))?.label || field.slugSourceFieldId
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 678,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 658,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        field.valueType === 'Permalink' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "link-page-selector",
                                                                                            style: {
                                                                                                position: 'relative'
                                                                                            },
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                                    className: "link-page-select",
                                                                                                    style: {
                                                                                                        paddingLeft: '32px'
                                                                                                    },
                                                                                                    value: field.permalinkSourceFieldId || '',
                                                                                                    onChange: (e)=>updateFieldInline(heading.id, sub.id, field.id, 'permalinkSourceFieldId', e.target.value),
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                            value: "",
                                                                                                            children: "Select source field..."
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                                            lineNumber: 697,
                                                                                                            columnNumber: 73
                                                                                                        }, this),
                                                                                                        page.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields?.filter((f)=>f.id !== field.id && f.valueType !== 'Permalink').map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                                        value: f.id,
                                                                                                                        children: f.label || `Field ${f.id}`
                                                                                                                    }, f.id, false, {
                                                                                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                                                                                        lineNumber: 701,
                                                                                                                        columnNumber: 85
                                                                                                                    }, this)) || []) || []) || []
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 689,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    style: {
                                                                                                        position: 'absolute',
                                                                                                        left: '10px',
                                                                                                        top: '50%',
                                                                                                        transform: 'translateY(-50%)',
                                                                                                        opacity: 0.5,
                                                                                                        pointerEvents: 'none'
                                                                                                    },
                                                                                                    children: "🔗"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 706,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                field.permalinkSourceFieldId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "linked-page-badge",
                                                                                                    style: {
                                                                                                        background: '#e0f2f1',
                                                                                                        color: '#00695c',
                                                                                                        borderColor: '#00695c'
                                                                                                    },
                                                                                                    children: [
                                                                                                        "Permalink Source: ",
                                                                                                        page.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields)).find((f)=>String(f?.id) === String(field.permalinkSourceFieldId))?.label || field.permalinkSourceFieldId
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 708,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 688,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                    lineNumber: 613,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                field.valueType === 'Grid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "grid-config-container animate-fade-in",
                                                                                    style: {
                                                                                        gridColumn: '1 / -1',
                                                                                        padding: '16px',
                                                                                        background: '#f8fafc',
                                                                                        borderRadius: 12,
                                                                                        marginTop: 12,
                                                                                        border: '1px solid var(--border)'
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            style: {
                                                                                                display: 'flex',
                                                                                                justifyContent: 'space-between',
                                                                                                alignItems: 'center',
                                                                                                marginBottom: 12
                                                                                            },
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                                    style: {
                                                                                                        fontSize: 13,
                                                                                                        fontWeight: 700
                                                                                                    },
                                                                                                    children: [
                                                                                                        "Grid Configuration (",
                                                                                                        field.gridCols?.length || 0,
                                                                                                        " Columns)"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 721,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    className: "btn btn-ghost btn-sm",
                                                                                                    style: {
                                                                                                        color: 'var(--danger)'
                                                                                                    },
                                                                                                    onClick: ()=>{
                                                                                                        const newCols = [
                                                                                                            ...field.gridCols || []
                                                                                                        ];
                                                                                                        newCols.pop();
                                                                                                        updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                                                    },
                                                                                                    children: "- Col"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 722,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    className: "btn btn-ghost btn-sm",
                                                                                                    style: {
                                                                                                        color: 'var(--accent)'
                                                                                                    },
                                                                                                    onClick: ()=>{
                                                                                                        const newCols = [
                                                                                                            ...field.gridCols || []
                                                                                                        ];
                                                                                                        newCols.push({
                                                                                                            id: Date.now(),
                                                                                                            label: '',
                                                                                                            placeholder: ''
                                                                                                        });
                                                                                                        updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                                                    },
                                                                                                    children: "+ Col"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 733,
                                                                                                    columnNumber: 69
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 720,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            style: {
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                gap: 12
                                                                                            },
                                                                                            children: (field.gridCols || []).map((col, cIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    style: {
                                                                                                        display: 'flex',
                                                                                                        gap: 12,
                                                                                                        alignItems: 'center'
                                                                                                    },
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            style: {
                                                                                                                fontSize: 12,
                                                                                                                color: 'var(--text-secondary)',
                                                                                                                minWidth: 20
                                                                                                            },
                                                                                                            children: [
                                                                                                                cIdx + 1,
                                                                                                                "."
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                                            lineNumber: 748,
                                                                                                            columnNumber: 77
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                            className: "field-label-input",
                                                                                                            value: col.label,
                                                                                                            onChange: (e)=>{
                                                                                                                const newCols = [
                                                                                                                    ...field.gridCols
                                                                                                                ];
                                                                                                                newCols[cIdx].label = e.target.value;
                                                                                                                updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                                                            },
                                                                                                            placeholder: "Column Label",
                                                                                                            style: {
                                                                                                                flex: 1
                                                                                                            }
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                                            lineNumber: 749,
                                                                                                            columnNumber: 77
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                            className: "field-label-input",
                                                                                                            value: col.placeholder,
                                                                                                            onChange: (e)=>{
                                                                                                                const newCols = [
                                                                                                                    ...field.gridCols
                                                                                                                ];
                                                                                                                newCols[cIdx].placeholder = e.target.value;
                                                                                                                updateFieldInline(heading.id, sub.id, field.id, 'gridCols', newCols);
                                                                                                            },
                                                                                                            placeholder: "Placeholder",
                                                                                                            style: {
                                                                                                                flex: 1.5
                                                                                                            }
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                                            lineNumber: 760,
                                                                                                            columnNumber: 77
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, col.id || cIdx, true, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 747,
                                                                                                    columnNumber: 73
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 745,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                    lineNumber: 719,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "toggle",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "checkbox",
                                                                                            checked: field.required,
                                                                                            onChange: (e)=>updateFieldInline(heading.id, sub.id, field.id, 'required', e.target.checked)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 778,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "toggle-slider"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 785,
                                                                                            columnNumber: 61
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                    lineNumber: 777,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        gap: '8px'
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            className: "toggle",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                    type: "checkbox",
                                                                                                    checked: field.infinity,
                                                                                                    onChange: (e)=>updateFieldInline(heading.id, sub.id, field.id, 'infinity', e.target.checked)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 790,
                                                                                                    columnNumber: 65
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "toggle-slider infinity-slider"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                                    lineNumber: 797,
                                                                                                    columnNumber: 65
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 789,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        field.infinity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "number",
                                                                                            className: "form-input",
                                                                                            style: {
                                                                                                width: '50px',
                                                                                                padding: '4px 6px',
                                                                                                fontSize: '11px',
                                                                                                height: 'auto',
                                                                                                textAlign: 'center'
                                                                                            },
                                                                                            value: field.maxItems || '',
                                                                                            onChange: (e)=>updateFieldInline(heading.id, sub.id, field.id, 'maxItems', e.target.value),
                                                                                            placeholder: "Max",
                                                                                            title: "Max repeating rows (blank = infinity)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 800,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                    lineNumber: 788,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "field-actions",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            className: "field-action-btn edit",
                                                                                            onClick: ()=>setEditingField(field),
                                                                                            children: "✏️ Edit"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 812,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            className: "field-action-btn delete",
                                                                                            onClick: ()=>deleteField(heading.id, sub.id, field.id),
                                                                                            children: "🗑 Delete"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                                            lineNumber: 818,
                                                                                            columnNumber: 61
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/views/EditPage.jsx",
                                                                                    lineNumber: 811,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            ]
                                                                        }, field.id, true, {
                                                                            fileName: "[project]/src/views/EditPage.jsx",
                                                                            lineNumber: 604,
                                                                            columnNumber: 53
                                                                        }, this))
                                                                ]
                                                            }, void 0, true),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "add-field-btn",
                                                                onClick: ()=>addField(heading.id, sub.id),
                                                                children: "+ Add New Field"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/views/EditPage.jsx",
                                                                lineNumber: 830,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/views/EditPage.jsx",
                                                        lineNumber: 577,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, sub.id, true, {
                                                fileName: "[project]/src/views/EditPage.jsx",
                                                lineNumber: 552,
                                                columnNumber: 33
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "add-subheading-btn",
                                            onClick: ()=>addSubHeading(heading.id),
                                            children: "+ Add Sub Heading"
                                        }, void 0, false, {
                                            fileName: "[project]/src/views/EditPage.jsx",
                                            lineNumber: 837,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/views/EditPage.jsx",
                                    lineNumber: 550,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, heading.id, true, {
                            fileName: "[project]/src/views/EditPage.jsx",
                            lineNumber: 523,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "add-heading-btn",
                        onClick: addHeading,
                        children: "+ Add Heading"
                    }, void 0, false, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 844,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "edit-page-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline",
                                onClick: ()=>router.push('/pages'),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 849,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                onClick: handleUpdate,
                                children: "Save Changes"
                            }, void 0, false, {
                                fileName: "[project]/src/views/EditPage.jsx",
                                lineNumber: 852,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/EditPage.jsx",
                        lineNumber: 848,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/EditPage.jsx",
                lineNumber: 521,
                columnNumber: 13
            }, this),
            editingField && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldEditModal, {
                field: editingField,
                onSave: handleEditFieldSave,
                onClose: ()=>setEditingField(null),
                pages: allPages,
                currentPageId: pageId
            }, void 0, false, {
                fileName: "[project]/src/views/EditPage.jsx",
                lineNumber: 860,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/edit-page/[pageId]/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditPagePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AppLayout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$EditPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/views/EditPage.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function EditPagePage(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '2rem'
            },
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/edit-page/[pageId]/page.jsx",
            lineNumber: 8,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$EditPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/app/edit-page/[pageId]/page.jsx",
                lineNumber: 10,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/edit-page/[pageId]/page.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/edit-page/[pageId]/page.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__34aabf34._.js.map