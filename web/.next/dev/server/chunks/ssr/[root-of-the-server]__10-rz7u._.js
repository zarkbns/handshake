module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/dashboard/docs/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-rsc] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/code-block.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/page-header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/primitives.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/status-badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/types.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
const ENV_EXAMPLE = `# Public, read-only values. Safe to expose — they are inlined into the browser
# bundle. Never put a signer key behind a NEXT_PUBLIC_ prefix.
NEXT_PUBLIC_CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
NEXT_PUBLIC_ETHEREUM_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS=0x905E0f141D8B5333F49755B08395d1beAdEd74Ab
NEXT_PUBLIC_CREDITCOIN_LOCK_ADDRESS=0xb3e9cB40A52EF777A29b6198f4c2D8d19893a01D
NEXT_PUBLIC_ETHEREUM_LOCK_ADDRESS=0x999326d027316C6CD0156a39ac8d3792f2EFC802`;
const DOC_LINKS = [
    {
        label: 'Chains & environments',
        href: 'https://docs.creditcoin.org/creditcoin-usc/usc-chains-environments'
    },
    {
        label: 'Guided tutorials',
        href: 'https://docs.creditcoin.org/creditcoin-usc/guided-tutorials'
    },
    {
        label: 'Attestcoin Protocol SDK',
        href: 'https://docs.creditcoin.org/creditcoin-usc/dapp-builder-infrastructure/usc-sdk'
    }
];
function DocsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageHeader"], {
                eyebrow: "Docs",
                title: "Settlement model",
                lede: "How Handshake settles across chains without a bridge, and what each state actually guarantees."
            }, void 0, false, {
                fileName: "[project]/app/dashboard/docs/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "What the dashboard reads",
                        note: "This is a read-only operator surface. It never drives settlement — no write path exists in the UI."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Panel"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "ds-section-note",
                            style: {
                                margin: 0,
                                lineHeight: 1.75
                            },
                            children: "Settlement lookups by id read HandshakeASC.getHandshake on Creditcoin plus the two lock contracts directly. Nothing is inferred: a proof is reported verified only when the coordinator holds a non-zero commitment for it, because the contract writes those commitments strictly after verification succeeds. Aggregate views — the index, metrics, and activity feed — are sample-backed and labelled as such, because the coordinator exposes no enumeration and the public testnet RPC rejects the log ranges an index would require."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/docs/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/docs/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "State machine"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ds-table-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "ds-table",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                scope: "col",
                                                children: "State"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/docs/page.tsx",
                                                lineNumber: 67,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                scope: "col",
                                                children: "Guarantee"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/docs/page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/docs/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].filter((state)=>state !== 'NONE').map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                        state: state
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/docs/page.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        whiteSpace: 'normal',
                                                        maxWidth: 560
                                                    },
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_DESCRIPTIONS"][state]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, state, true, {
                                            fileName: "[project]/app/dashboard/docs/page.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/docs/page.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/docs/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "Settlement parameters"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Panel"], {
                        padded: false,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefinitionGrid"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: "Coordinator chain",
                                    value: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CREDITCOIN"].name} (${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CREDITCOIN"].id})`
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: "Attested source chain",
                                    value: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].name} (${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].id})`
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: "Finality buffer",
                                    value: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FINALITY_CONFIRMATIONS"][__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key]} confirmations on Ethereum Sepolia`
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: "Timeout window",
                                    value: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COORDINATOR_TIMEOUT_SECONDS"] / 60} minutes from PREPARE, and again from READY`
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: "COMMIT location",
                                    value: "Creditcoin only. No source chain has an independent commit transaction."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: "Recovery",
                                    value: "Timeout-driven and unilateral. Requires no attestor signature and no counterparty cooperation."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/docs/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/docs/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "Connecting the dashboard to chain",
                        note: "Without these the settlement index still renders from sample data, but live lookups by id are disabled."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CodeBlock"], {
                        code: ENV_EXAMPLE,
                        filename: "web/.env.local"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/docs/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "Protocol references"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Panel"], {
                        padded: false,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefinitionGrid"], {
                            children: DOC_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Definition"], {
                                    label: link.label,
                                    value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: link.href,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: [
                                            "docs.creditcoin.org ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                size: 9
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/docs/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/docs/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 19
                                    }, this)
                                }, link.href, false, {
                                    fileName: "[project]/app/dashboard/docs/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/docs/page.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/docs/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/docs/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/docs/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/dashboard/docs/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/docs/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/dashboard/code-block.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock,
    "CopyButton",
    ()=>CopyButton
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CodeBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CodeBlock() from the server but CodeBlock is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/dashboard/code-block.tsx", "CodeBlock");
const CopyButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CopyButton() from the server but CopyButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/dashboard/code-block.tsx", "CopyButton");
}),
"[project]/components/dashboard/code-block.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock,
    "CopyButton",
    ()=>CopyButton
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CodeBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CodeBlock() from the server but CodeBlock is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/dashboard/code-block.tsx <module evaluation>", "CodeBlock");
const CopyButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CopyButton() from the server but CopyButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/dashboard/code-block.tsx <module evaluation>", "CopyButton");
}),
"[project]/components/dashboard/code-block.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/dashboard/code-block.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/dashboard/code-block.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/dashboard/page-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function PageHeader({ eyebrow, title, lede, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-page-head",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    eyebrow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ds-eyebrow",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 17,
                        columnNumber: 20
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "ds-page-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    lede ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ds-page-lede",
                        children: lede
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 19,
                        columnNumber: 17
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/page-header.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/page-header.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/dashboard/primitives.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Definition",
    ()=>Definition,
    "DefinitionGrid",
    ()=>DefinitionGrid,
    "OriginBadge",
    ()=>OriginBadge,
    "Panel",
    ()=>Panel,
    "SectionHeading",
    ()=>SectionHeading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function OriginBadge({ origin }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-origin",
        "data-origin": origin,
        children: origin === 'chain' ? 'On-chain read' : 'Sample data'
    }, void 0, false, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function SectionHeading({ title, note, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-section-head",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "ds-section-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ds-section-note",
                        style: {
                            margin: '6px 0 0'
                        },
                        children: note
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 32,
                        columnNumber: 17
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
function Panel({ title, action, children, padded = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ds-panel",
        children: [
            title || action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "ds-panel-head",
                children: [
                    title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "ds-section-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 54,
                        columnNumber: 20
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 54,
                        columnNumber: 68
                    }, this),
                    action
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this) : null,
            padded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ds-panel-body",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 58,
                columnNumber: 17
            }, this) : children
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
function DefinitionGrid({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
        className: "ds-defs",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, this);
}
function Definition({ label, value, muted = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-def",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                className: "ds-def-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                className: "ds-def-value",
                "data-muted": muted || undefined,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/dashboard/status-badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProofCount",
    ()=>ProofCount,
    "StatusBadge",
    ()=>StatusBadge,
    "ToneBadge",
    ()=>ToneBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-rsc] (ecmascript)");
;
;
function StatusBadge({ state }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-badge",
        "data-state": state,
        title: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_DESCRIPTIONS"][state],
        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_LABELS"][state]
    }, void 0, false, {
        fileName: "[project]/components/dashboard/status-badge.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function ToneBadge({ tone, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-badge",
        "data-tone": tone,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/status-badge.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function ProofCount({ verified, required, tone = 'settled' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-proof-count",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-proof-bar",
                "aria-hidden": "true",
                children: Array.from({
                    length: required
                }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ds-proof-tick",
                        "data-filled": index < verified || undefined,
                        "data-tone": tone === 'held' ? 'held' : undefined
                    }, index, false, {
                        fileName: "[project]/components/dashboard/status-badge.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/dashboard/status-badge.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    verified,
                    "/",
                    required
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/status-badge.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/status-badge.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/handshake/chains.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHAINS",
    ()=>CHAINS,
    "CHAINS_BY_KEY",
    ()=>CHAINS_BY_KEY,
    "COORDINATOR_TIMEOUT_SECONDS",
    ()=>COORDINATOR_TIMEOUT_SECONDS,
    "CREDITCOIN",
    ()=>CREDITCOIN,
    "ETHEREUM_SEPOLIA",
    ()=>ETHEREUM_SEPOLIA,
    "FINALITY_CONFIRMATIONS",
    ()=>FINALITY_CONFIRMATIONS,
    "canReadChain",
    ()=>canReadChain,
    "explorerAddressUrl",
    ()=>explorerAddressUrl,
    "explorerTxUrl",
    ()=>explorerTxUrl,
    "readPublicChainConfig",
    ()=>readPublicChainConfig
]);
const CREDITCOIN = {
    id: 102031,
    key: 'creditcoin',
    name: 'Creditcoin Testnet',
    shortName: 'Creditcoin'
};
const ETHEREUM_SEPOLIA = {
    id: 11155111,
    key: 'ethereum-sepolia',
    name: 'Ethereum Sepolia',
    shortName: 'ETH Sepolia'
};
const CHAINS = [
    ETHEREUM_SEPOLIA,
    CREDITCOIN
];
const CHAINS_BY_KEY = Object.fromEntries(CHAINS.map((chain)=>[
        chain.key,
        chain
    ]));
/** Block explorers for read-only deep links. */ const EXPLORERS = {
    [CREDITCOIN.id]: 'https://creditcoin-testnet.blockscout.com',
    [ETHEREUM_SEPOLIA.id]: 'https://sepolia.etherscan.io'
};
function explorerTxUrl(chainId, hash) {
    const base = EXPLORERS[chainId];
    return base ? `${base}/tx/${hash}` : null;
}
function explorerAddressUrl(chainId, address) {
    const base = EXPLORERS[chainId];
    return base ? `${base}/address/${address}` : null;
}
const FINALITY_CONFIRMATIONS = {
    [ETHEREUM_SEPOLIA.key]: 12
};
const COORDINATOR_TIMEOUT_SECONDS = 3600;
function readPublicChainConfig() {
    const value = (raw)=>{
        const trimmed = raw?.trim();
        return trimmed ? trimmed : null;
    };
    return {
        creditcoinRpcUrl: value(("TURBOPACK compile-time value", "https://rpc.cc3-testnet.creditcoin.network")),
        ethereumSepoliaRpcUrl: value(("TURBOPACK compile-time value", "https://ethereum-sepolia-rpc.publicnode.com")),
        coordinatorAddress: value(("TURBOPACK compile-time value", "0x905E0f141D8B5333F49755B08395d1beAdEd74Ab")),
        creditcoinLockAddress: value(("TURBOPACK compile-time value", "0xb3e9cB40A52EF777A29b6198f4c2D8d19893a01D")),
        ethereumLockAddress: value(("TURBOPACK compile-time value", "0x999326d027316C6CD0156a39ac8d3792f2EFC802"))
    };
}
function canReadChain(config) {
    return Boolean(config.creditcoinRpcUrl && config.coordinatorAddress);
}
}),
"[project]/lib/handshake/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DISPLAY_NOW",
    ()=>DISPLAY_NOW,
    "STATE_DESCRIPTIONS",
    ()=>STATE_DESCRIPTIONS,
    "STATE_LABELS",
    ()=>STATE_LABELS,
    "formatCount",
    ()=>formatCount,
    "formatDateTime",
    ()=>formatDateTime,
    "formatDuration",
    ()=>formatDuration,
    "formatPercent",
    ()=>formatPercent,
    "formatRelative",
    ()=>formatRelative,
    "formatTime",
    ()=>formatTime,
    "truncateAddress",
    ()=>truncateAddress,
    "truncateHash",
    ()=>truncateHash
]);
const DISPLAY_NOW = Date.UTC(2026, 7, 30, 14, 32, 0) / 1000;
function formatRelative(timestamp, now = DISPLAY_NOW) {
    const seconds = Math.max(0, now - timestamp);
    if (seconds < 60) return `${Math.floor(seconds)}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}
const DATE_TIME = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
});
const TIME_ONLY = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
});
function formatDateTime(timestamp) {
    if (!timestamp) return '—';
    return DATE_TIME.format(new Date(timestamp * 1000));
}
function formatTime(timestamp) {
    if (!timestamp) return '—';
    return TIME_ONLY.format(new Date(timestamp * 1000));
}
function formatDuration(seconds) {
    if (seconds === null) return '—';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        const remainder = Math.round(seconds % 60);
        return remainder > 0 ? `${minutes}m ${remainder}s` : `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;
    return remainderMinutes > 0 ? `${hours}h ${remainderMinutes}m` : `${hours}h`;
}
function formatPercent(ratio, digits = 1) {
    return `${(ratio * 100).toFixed(digits)}%`;
}
function formatCount(value) {
    return new Intl.NumberFormat('en-GB').format(value);
}
function truncateHash(value, lead = 10, tail = 8) {
    if (!value) return '—';
    if (value.length <= lead + tail + 1) return value;
    return `${value.slice(0, lead)}…${value.slice(-tail)}`;
}
function truncateAddress(value) {
    return truncateHash(value, 6, 4);
}
const STATE_LABELS = {
    NONE: 'NONE',
    PREPARE: 'PREPARE',
    READY: 'READY',
    COMMITTED: 'COMMIT',
    SETTLED: 'SETTLED',
    HELD: 'HELD'
};
const STATE_DESCRIPTIONS = {
    NONE: 'Not registered on the coordinator.',
    PREPARE: 'Awaiting both legs. Locks remain fully reversible.',
    READY: 'Both legs verified. The bounded commit window is open.',
    COMMITTED: 'Irreversible COMMIT executed on Creditcoin.',
    SETTLED: 'Both native legs finalized and attested.',
    HELD: 'Pre-commit timeout expired. Unilateral refund is available.'
};
}),
"[project]/lib/handshake/types.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Canonical frontend view models for Handshake settlement data.
 *
 * These mirror the on-chain coordinator (`src/HandshakeASC.sol`) and native lock
 * (`src/NativeSettlementLock.sol`) records. They are deliberately decoupled from
 * any single data source so the UI can be powered by a live chain reader, a
 * future indexer/REST API, or the clearly-labelled sample source without any
 * component changes.
 */ /** Coordinator lifecycle state. Ordinals match `IHandshake.State` exactly. */ __turbopack_context__.s([
    "LOCK_STATES",
    ()=>LOCK_STATES,
    "SETTLEMENT_STATES",
    ()=>SETTLEMENT_STATES
]);
const SETTLEMENT_STATES = [
    'NONE',
    'PREPARE',
    'READY',
    'COMMITTED',
    'SETTLED',
    'HELD'
];
const LOCK_STATES = [
    'NONE',
    'LOCKED',
    'RELEASED',
    'REFUNDED'
];
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__10-rz7u._.js.map