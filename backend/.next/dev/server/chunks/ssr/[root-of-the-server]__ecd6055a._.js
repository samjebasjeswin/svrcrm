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
"[project]/src/components/CategoryDropdown.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function CategoryDropdown({ label = 'Category', onChange }) {
    const { pages, currentCompanyId, getPage, getPageEntries, addEntry, ensureCategoryPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [categoryPageId, setCategoryPageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Find (or create) the Category page on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "category-dropdown",
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "category-select",
                style: {
                    fontWeight: '600'
                },
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategoryDropdown.jsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: "category-select",
                value: selectedId,
                onChange: handleSelect,
                style: {
                    padding: '0.4rem',
                    minWidth: '120px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: [
                            "-- Select ",
                            label,
                            " --"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CategoryDropdown.jsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: cat.id,
                            children: cat.data?.Name || `Category ${cat.id}`
                        }, cat.id, false, {
                            fileName: "[project]/src/components/CategoryDropdown.jsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategoryDropdown.jsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                fileName: "[project]/src/components/CategoryDropdown.jsx",
                lineNumber: 75,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategoryDropdown.jsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/RichTextEditor.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RichTextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rich-editor-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rich-editor-toolbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('bold'),
                        title: "Bold",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            children: "B"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RichTextEditor.jsx",
                            lineNumber: 25,
                            columnNumber: 88
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RichTextEditor.jsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('italic'),
                        title: "Italic",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            children: "I"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RichTextEditor.jsx",
                            lineNumber: 26,
                            columnNumber: 92
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RichTextEditor.jsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('underline'),
                        title: "Underline",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("u", {
                            children: "U"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RichTextEditor.jsx",
                            lineNumber: 27,
                            columnNumber: 98
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RichTextEditor.jsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divider"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RichTextEditor.jsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('insertUnorderedList'),
                        title: "Bullet List",
                        children: "• list"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RichTextEditor.jsx",
                        lineNumber: 29,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>execCommand('insertOrderedList'),
                        title: "Numbered List",
                        children: "1. list"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RichTextEditor.jsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RichTextEditor.jsx",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: editorRef,
                contentEditable: true,
                className: "rich-editor-content",
                onInput: handleInput,
                "data-placeholder": placeholder || 'Enter text...'
            }, void 0, false, {
                fileName: "[project]/src/components/RichTextEditor.jsx",
                lineNumber: 32,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RichTextEditor.jsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ImageUpload.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ImageUpload({ value, onChange }) {
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value || null);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "image-upload-container",
        children: preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "image-preview-wrapper animate-fade-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: preview,
                    alt: "Upload preview",
                    className: "image-preview"
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageUpload.jsx",
                    lineNumber: 29,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "image-clear-btn",
                    onClick: clearImage,
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageUpload.jsx",
                    lineNumber: 30,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ImageUpload.jsx",
            lineNumber: 28,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "image-upload-dropzone",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: handleFileChange,
                    style: {
                        display: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageUpload.jsx",
                    lineNumber: 36,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "upload-icon",
                    children: "📸"
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageUpload.jsx",
                    lineNumber: 37,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Upload Image"
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageUpload.jsx",
                    lineNumber: 38,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ImageUpload.jsx",
            lineNumber: 35,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ImageUpload.jsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/views/DataEntry.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategoryDropdown$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategoryDropdown.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RichTextEditor$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RichTextEditor.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageUpload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ImageUpload.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function DataEntry() {
    const { pageId, entryId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { getPage, addEntry, updateEntry, getPageEntries, getLinkedEntryDisplayValue, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const isNew = !entryId || entryId === 'new';
    const page = getPage(pageId);
    const lowerName = page?.name?.toLowerCase()?.trim() || '';
    const isSettingsPage = page?.singleEntry || lowerName === 'static seo' || lowerName === 'mailer settings';
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [refreshKey, setRefreshKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [repeaterRows, setRepeaterRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}); // { [fieldKey]: [rowId1, rowId2, ...] }
    // Load entry for editing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isNew && page) {
            const entries = getPageEntries(pageId);
            const entry = entries.find((e)=>e.id === Number(entryId));
            if (entry) {
                setFormData(entry.data);
                // Initialize repeaterRows if entry has repeating data
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
                setRepeaterRows(initialRepeaters);
            }
        }
    }, [
        entryId,
        pageId,
        isNew,
        page
    ]);
    // Auto-redirect for single-entry pages if trying to create a new one but it already exists
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 62,
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
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/DataEntry.jsx",
                lineNumber: 61,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/views/DataEntry.jsx",
            lineNumber: 60,
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
            // Find current field to check if it's a Permalink or Slug
            let currentField = null;
            page?.headings?.forEach((h)=>h.subHeadings?.forEach((sh)=>sh.fields?.forEach((f)=>{
                        if (String(f.id).trim() === String(fieldId).trim()) currentField = f;
                    })));
            // Bi-directional logic: If Permalink is edited, update its Slug source
            if (currentField?.valueType === 'Permalink' && currentField.permalinkSourceFieldId) {
                const slugSourceFieldId = currentField.permalinkSourceFieldId;
                const slugKey = rowIdx !== null ? `${getFieldKey(headingId, subId, slugSourceFieldId)}_row${rowIdx}` : getFieldKey(headingId, subId, slugSourceFieldId);
                newData[slugKey] = formatAsSlug(value);
            }
            // Forward logic: If Name/Any is edited, update Slugs/Permalinks that link to it
            page?.headings?.forEach((h)=>{
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
                                page?.headings?.forEach((h2)=>{
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
    const addRepeaterRow = (fieldKey)=>{
        setRepeaterRows((prev)=>{
            const currentRows = prev[fieldKey] || [
                0
            ]; // Start with row 0 if none
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "data-entry-field-input-wrapper",
                style: {
                    display: 'flex',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "data-entry-input data-entry-select",
                        style: {
                            flex: 1
                        },
                        value: value,
                        onChange: (e)=>handleChange(heading.id, sub.id, field.id, e.target.value, 0, rowIdx),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: [
                                    "-- Select ",
                                    linkedPage?.name || 'item',
                                    " --"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 182,
                                columnNumber: 25
                            }, this),
                            linkedEntries.map((entry)=>{
                                const displayVal = getLinkedEntryDisplayValue(field.linkedPageId, entry.id, field.displayFieldName);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: entry.id,
                                    children: displayVal
                                }, entry.id, false, {
                                    fileName: "[project]/src/views/DataEntry.jsx",
                                    lineNumber: 186,
                                    columnNumber: 33
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 176,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 192,
                        columnNumber: 21
                    }, this),
                    linkedEntries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "link-empty-hint",
                        children: [
                            "No entries yet.",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-ghost btn-sm",
                                onClick: ()=>router.push(`/data-entry/${field.linkedPageId}`),
                                children: [
                                    "Add ",
                                    linkedPage?.name,
                                    " entries →"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 204,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 202,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/DataEntry.jsx",
                lineNumber: 175,
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "number"
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 227,
                            columnNumber: 25
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 229,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 226,
                    columnNumber: 21
                }, this);
            case 'Text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        field.maxChars > 120 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ...inputProps,
                            rows: 3,
                            className: "data-entry-textarea"
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 237,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text"
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 239,
                            columnNumber: 29
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 242,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 235,
                    columnNumber: 21
                }, this);
            case 'Symbol':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ...inputProps,
                        type: "text"
                    }, void 0, false, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 249,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 248,
                    columnNumber: 21
                }, this);
            case 'Password':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ...inputProps,
                        type: "password"
                    }, void 0, false, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 255,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 254,
                    columnNumber: 21
                }, this);
            case 'Number & Text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: `Enter number & text for ${field.label}`
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 261,
                            columnNumber: 25
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 263,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 260,
                    columnNumber: 21
                }, this);
            case 'Symbol & Text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: `Enter symbol & text for ${field.label}`
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 270,
                            columnNumber: 25
                        }, this),
                        field.maxChars > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/",
                                field.maxChars
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 272,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 269,
                    columnNumber: 21
                }, this);
            case 'Rich Editor':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RichTextEditor$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    value: value,
                    onChange: (val)=>handleChange(heading.id, sub.id, field.id, val, field.maxChars, rowIdx),
                    placeholder: field.label
                }, void 0, false, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 278,
                    columnNumber: 21
                }, this);
            case '120 Char':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ...inputProps,
                            rows: 3,
                            className: "data-entry-textarea",
                            maxLength: 120,
                            placeholder: `Description (max 120 chars)...`
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 287,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/120"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 294,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 286,
                    columnNumber: 21
                }, this);
            case '160 Char':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ...inputProps,
                            rows: 4,
                            className: "data-entry-textarea",
                            maxLength: 160,
                            placeholder: `Description (max 160 chars)...`
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 300,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "char-counter",
                            children: [
                                value.length,
                                "/160"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 307,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 299,
                    columnNumber: 21
                }, this);
            case 'Image':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageUpload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    value: value,
                    onChange: (val)=>handleChange(heading.id, sub.id, field.id, val, 0, rowIdx)
                }, void 0, false, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 312,
                    columnNumber: 21
                }, this);
            case 'Slug':
                const slugSourceField = page.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields)).find((f)=>String(f?.id) === String(field.slugSourceFieldId));
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 322,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 329,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 321,
                    columnNumber: 21
                }, this);
            case 'Permalink':
                const permSourceField = page.headings?.flatMap((h)=>h.subHeadings?.flatMap((sh)=>sh.fields)).find((f)=>String(f?.id) === String(field.permalinkSourceFieldId));
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-field-input-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...inputProps,
                            type: "text",
                            placeholder: permSourceField ? `Auto-generated from ${permSourceField.label}...` : `Permalink for ${field.label}...`,
                            onChange: (e)=>{
                                const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                                handleChange(heading.id, sub.id, field.id, val, field.maxChars, rowIdx);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 339,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 348,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 338,
                    columnNumber: 21
                }, this);
            case 'Grid':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "data-entry-grid-wrapper",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid-col-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '11px',
                                            color: 'var(--text-secondary)',
                                            marginBottom: '4px',
                                            fontWeight: '600'
                                        },
                                        children: col.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 367,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 370,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, cIdx, true, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 366,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 356,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 355,
                    columnNumber: 21
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ...inputProps,
                    type: "text"
                }, void 0, false, {
                    fileName: "[project]/src/views/DataEntry.jsx",
                    lineNumber: 385,
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
        // Validate required fields
        for (const heading of headings){
            for (const sub of heading.subHeadings || []){
                for (const field of sub.fields || []){
                    const key = getFieldKey(heading.id, sub.id, field.id);
                    if (field.required && !formData[key]?.toString().trim()) {
                        alert(`"${field.label}" is required`);
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
            if (!isSettingsPage) router.push(`/data-entry/${pageId}`);
        } else {
            // Save to shared context
            const newEntry = addEntry(Number(pageId), {
                ...formData
            });
            setFormData({});
            setRefreshKey((k)=>k + 1);
            alert('Entry saved successfully!');
            if (isSettingsPage) {
                router.push(`/data-entry/${pageId}/${newEntry.id}`);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "data-entry-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-header-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "back-btn",
                                onClick: ()=>router.push(isSettingsPage ? '/pages' : `/data-entry/${pageId}`),
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 466,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 700
                                        },
                                        children: page.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 470,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "separator",
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 471,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--text-secondary)'
                                        },
                                        children: isSettingsPage ? 'Manage' : entryId === 'new' ? 'New Entry' : 'Edit Entry'
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 472,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 469,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 465,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-header-right",
                        children: !isSettingsPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-outline btn-sm",
                            onClick: ()=>router.push(`/data-entry/${pageId}`),
                            children: "Back to List"
                        }, void 0, false, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 479,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 477,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/views/DataEntry.jsx",
                lineNumber: 464,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "data-entry-body",
                children: [
                    headings.map((heading)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "data-entry-section animate-fade-in-up",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "data-entry-main-heading",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: heading.title || 'Untitled Heading'
                                    }, void 0, false, {
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 492,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/views/DataEntry.jsx",
                                    lineNumber: 491,
                                    columnNumber: 25
                                }, this),
                                (heading.subHeadings || []).map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "data-entry-sub-section",
                                        children: [
                                            sub.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "data-entry-sub-heading",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: sub.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/views/DataEntry.jsx",
                                                    lineNumber: 500,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/views/DataEntry.jsx",
                                                lineNumber: 499,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "data-entry-fields-grid",
                                                children: (sub.fields || []).map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `data-entry-field-group ${field.maxChars > 120 ? 'span-full' : ''}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "data-entry-label",
                                                                children: [
                                                                    field.label || 'Untitled Field',
                                                                    field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "required",
                                                                        children: "*"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/views/DataEntry.jsx",
                                                                        lineNumber: 512,
                                                                        columnNumber: 68
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `data-entry-type-badge ${field.valueType === 'Link' ? 'badge-link' : ''}`,
                                                                        children: field.valueType === 'Link' ? `🔗 ${getPage(field.linkedPageId)?.name || 'Link'}` : field.valueType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/views/DataEntry.jsx",
                                                                        lineNumber: 513,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    field.infinity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "badge-infinity",
                                                                        children: "∞ Infinity"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/views/DataEntry.jsx",
                                                                        lineNumber: 517,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/views/DataEntry.jsx",
                                                                lineNumber: 510,
                                                                columnNumber: 45
                                                            }, this),
                                                            field.infinity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "repeater-container",
                                                                children: [
                                                                    (repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [
                                                                        0
                                                                    ]).map((rowId, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "repeater-row animate-fade-in-up",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "repeater-row-content",
                                                                                    children: renderFieldInput(heading, sub, field, idx)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/views/DataEntry.jsx",
                                                                                    lineNumber: 525,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    className: "repeater-delete-btn",
                                                                                    onClick: ()=>removeRepeaterRow(getFieldKey(heading.id, sub.id, field.id), rowId),
                                                                                    children: "✕"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/views/DataEntry.jsx",
                                                                                    lineNumber: 528,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, rowId, true, {
                                                                            fileName: "[project]/src/views/DataEntry.jsx",
                                                                            lineNumber: 524,
                                                                            columnNumber: 57
                                                                        }, this)),
                                                                    (!field.maxItems || (repeaterRows[getFieldKey(heading.id, sub.id, field.id)] || [
                                                                        0
                                                                    ]).length < Number(field.maxItems)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "btn btn-primary btn-sm repeater-add-btn",
                                                                        onClick: ()=>addRepeaterRow(getFieldKey(heading.id, sub.id, field.id)),
                                                                        children: "+ Add"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/views/DataEntry.jsx",
                                                                        lineNumber: 537,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/views/DataEntry.jsx",
                                                                lineNumber: 522,
                                                                columnNumber: 49
                                                            }, this) : renderFieldInput(heading, sub, field)
                                                        ]
                                                    }, field.id, true, {
                                                        fileName: "[project]/src/views/DataEntry.jsx",
                                                        lineNumber: 506,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/views/DataEntry.jsx",
                                                lineNumber: 504,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, sub.id, true, {
                                        fileName: "[project]/src/views/DataEntry.jsx",
                                        lineNumber: 497,
                                        columnNumber: 29
                                    }, this))
                            ]
                        }, heading.id, true, {
                            fileName: "[project]/src/views/DataEntry.jsx",
                            lineNumber: 489,
                            columnNumber: 21
                        }, this)),
                    headings.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-empty-page",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "No structure configured"
                            }, void 0, false, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 560,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Go to Edit Page to set up headings and fields first."
                            }, void 0, false, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 561,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                onClick: ()=>router.push(`/edit-page/${pageId}`),
                                children: "Edit Page Structure"
                            }, void 0, false, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 562,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 559,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "data-entry-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline",
                                onClick: handleClear,
                                children: "Clear"
                            }, void 0, false, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 570,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                onClick: handleSave,
                                children: [
                                    "💾 ",
                                    isSettingsPage ? 'Save Changes' : !isNew ? 'Update Entry' : 'Save Entry'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/views/DataEntry.jsx",
                                lineNumber: 573,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/views/DataEntry.jsx",
                        lineNumber: 569,
                        columnNumber: 17
                    }, this)
                ]
            }, refreshKey, true, {
                fileName: "[project]/src/views/DataEntry.jsx",
                lineNumber: 487,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/data-entry/[pageId]/[entryId]/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataEntryWithEntryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AppLayout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$DataEntry$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/views/DataEntry.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function DataEntryWithEntryPage(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '2rem'
            },
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/data-entry/[pageId]/[entryId]/page.jsx",
            lineNumber: 8,
            columnNumber: 29
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppLayout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$views$2f$DataEntry$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/app/data-entry/[pageId]/[entryId]/page.jsx",
                lineNumber: 10,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/data-entry/[pageId]/[entryId]/page.jsx",
            lineNumber: 9,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/data-entry/[pageId]/[entryId]/page.jsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ecd6055a._.js.map