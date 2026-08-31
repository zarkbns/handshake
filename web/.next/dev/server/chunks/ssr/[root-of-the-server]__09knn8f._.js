module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/app/dashboard/settlements/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettlementDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/code-block.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/primitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$settlement$2d$timeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/settlement-timeline.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/status-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/states.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/handshake/services.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chain-reader.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$use$2d$async$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/use-async.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function LegPanel({ leg, title }) {
    const explorer = leg.lock ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["explorerAddressUrl"])(leg.chain.id, leg.lock.token) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Panel"], {
        title: title,
        padded: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefinitionGrid"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Chain",
                    value: leg.chain.name
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Verification",
                    value: leg.kind === 'attested' ? 'Attestcoin quorum + inclusion + continuity proof' : 'Direct state read on the coordinator’s own chain'
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Prepared",
                    value: leg.prepared ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToneBadge"], {
                        tone: "verified",
                        children: "Yes"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 59,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToneBadge"], {
                        tone: "absent",
                        children: "No"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 61,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Party",
                    value: leg.party ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateAddress"])(leg.party) : 'Not available from this source',
                    muted: !leg.party
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Prepare commitment",
                    value: leg.commitment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ds-inline",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ds-hash",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(leg.commitment, 14, 10)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 75,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyButton"], {
                                value: leg.commitment
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 76,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 74,
                        columnNumber: 15
                    }, this) : 'Not recorded',
                    muted: !leg.commitment
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                leg.kind === 'attested' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Finality buffer",
                    value: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FINALITY_CONFIRMATIONS"][leg.chain.key] ?? '—'} confirmations`
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this) : null,
                leg.lock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                            label: "Lock state",
                            value: leg.lock.state
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                            label: "Token",
                            value: explorer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: explorer,
                                target: "_blank",
                                rel: "noreferrer",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateAddress"])(leg.lock.token),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        size: 9
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 55
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 97,
                                columnNumber: 19
                            }, this) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateAddress"])(leg.lock.token)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                            label: "Amount",
                            value: leg.lock.amount
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                            label: "Depositor",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateAddress"])(leg.lock.depositor)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                            label: "Recipient",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateAddress"])(leg.lock.recipient)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                            label: "Lock expiry",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(leg.lock.expiry)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 91,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                    label: "Lock record",
                    value: "Not readable. Set the lock contract address to resolve custody detail.",
                    muted: true
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
function ProofCard({ proof }) {
    const tone = proof.status === 'VERIFIED' ? 'verified' : proof.status === 'PENDING' ? 'pending' : 'absent';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Panel"], {
        padded: false,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "ds-panel-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "ds-section-title",
                        children: proof.label
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToneBadge"], {
                        tone: tone,
                        children: proof.status.replace('_', ' ')
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefinitionGrid"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Coordinator call",
                        value: proof.method
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Verified via",
                        value: proof.verifiedVia === 'attestcoin' ? 'Attestcoin attestor quorum' : 'Native state read'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Source chain",
                        value: proof.sourceChain?.name ?? 'Coordinator'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Inclusion proof",
                        value: proof.inclusionProof ? 'Present' : 'Not applicable',
                        muted: !proof.inclusionProof
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Continuity proof",
                        value: proof.continuityProof ? 'Present' : 'Not applicable',
                        muted: !proof.continuityProof
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Commitment hash",
                        value: proof.commitment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ds-inline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ds-hash",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(proof.commitment, 14, 10)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyButton"], {
                                    value: proof.commitment
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 153,
                            columnNumber: 15
                        }, this) : 'Not recorded',
                        muted: !proof.commitment
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                        label: "Verified at",
                        value: proof.verifiedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(proof.verifiedAt) : 'Not timestamped on chain',
                        muted: !proof.verifiedAt
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            proof.note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ds-panel-body",
                style: {
                    borderTop: '1px solid var(--ds-border-subtle)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ds-section-note",
                    style: {
                        margin: 0
                    },
                    children: proof.note
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 171,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
function DetailBody({ settlement }) {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('overview');
    const verifiedProofs = settlement.proofs.filter((proof)=>proof.status === 'VERIFIED').length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 18
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "ds-back",
                    href: "/dashboard/settlements",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 11
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        " All settlements"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                eyebrow: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].name} → ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"].name}`,
                title: `Settlement ${settlement.reference}`,
                lede: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATE_DESCRIPTIONS"][settlement.state],
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ds-inline",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OriginBadge"], {
                            origin: settlement.origin
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                            state: settlement.state
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            settlement.origin === 'sample' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 20
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Notice"], {
                    title: "Sample record",
                    children: "This settlement is not a coordinator record. It has no settlement id, and no proof commitments, transaction hashes, or block numbers are shown, because none exist. Enter a real bytes32 settlement id on the settlements page for a verified on-chain read."
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this) : null,
            settlement.state === 'HELD' && settlement.heldReason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 20
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Notice"], {
                    tone: "danger",
                    title: "Why this settlement is held",
                    children: [
                        settlement.heldReason,
                        " Custody never left either source chain, and the refund path is unilateral — it needs no attestor cooperation and no counterparty signature."
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "Lifecycle",
                        note: "Stages reflect the coordinator state machine in HandshakeASC. COMMIT is the single irreversible boundary and executes only on Creditcoin."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Panel"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$settlement$2d$timeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettlementTimeline"], {
                            settlement: settlement
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                        tabs: [
                            {
                                id: 'overview',
                                label: 'Overview'
                            },
                            {
                                id: 'proofs',
                                label: 'Proofs',
                                count: settlement.proofs.length
                            },
                            {
                                id: 'transactions',
                                label: 'Transactions',
                                count: settlement.transactions.length
                            },
                            {
                                id: 'events',
                                label: 'Events',
                                count: settlement.events.length
                            }
                        ],
                        active: tab,
                        onChange: setTab
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    tab === 'overview' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabPanel"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ds-stack",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Panel"], {
                                    title: "Coordinator record",
                                    padded: false,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefinitionGrid"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Settlement id",
                                                value: settlement.settlementId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ds-inline",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ds-hash",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(settlement.settlementId, 14, 10)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 256,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyButton"], {
                                                            value: settlement.settlementId
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 25
                                                }, this) : 'None. Sample records carry no canonical id.',
                                                muted: !settlement.settlementId
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "State",
                                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                    state: settlement.state
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 52
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Route",
                                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ds-route",
                                                    children: [
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].shortName,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            size: 10
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 25
                                                        }, this),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"].shortName
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Proofs verified",
                                                value: `${verifiedProofs}/${settlement.proofs.length}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Entered PREPARE",
                                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(settlement.prepareTime)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Entered READY",
                                                value: settlement.readyTime ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(settlement.readyTime) : 'Not reached',
                                                muted: !settlement.readyTime
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Timeout window",
                                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDuration"])(settlement.timeoutSeconds)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Evidence manifest",
                                                value: settlement.evidenceManifest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ds-inline",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ds-hash",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(settlement.evidenceManifest, 14, 10)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyButton"], {
                                                            value: settlement.evidenceManifest
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 25
                                                }, this) : 'Not recorded',
                                                muted: !settlement.evidenceManifest
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Definition"], {
                                                label: "Settlement evidence",
                                                value: settlement.settlementEvidence ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ds-inline",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ds-hash",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(settlement.settlementEvidence, 14, 10)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyButton"], {
                                                            value: settlement.settlementEvidence
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 25
                                                }, this) : 'Not recorded',
                                                muted: !settlement.settlementEvidence
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ds-grid-halves",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegPanel, {
                                            leg: settlement.attestedLeg,
                                            title: "Asset leg (attested)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                            lineNumber: 323,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegPanel, {
                                            leg: settlement.nativeLeg,
                                            title: "Payment leg (native)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                            lineNumber: 324,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 322,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this) : null,
                    tab === 'proofs' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabPanel"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ds-stack",
                            children: settlement.proofs.map((proof)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProofCard, {
                                    proof: proof
                                }, proof.id, false, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 334,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this) : null,
                    tab === 'transactions' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabPanel"], {
                        children: settlement.transactions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ds-table-wrap",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "ds-table",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    children: "Action"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    children: "Chain"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    children: "Transaction"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    children: "Block"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    children: "Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                            lineNumber: 346,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: settlement.transactions.map((transaction)=>{
                                            const href = transaction.hash ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["explorerTxUrl"])(transaction.chain.id, transaction.hash) : null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "ds-cell-strong",
                                                        children: transaction.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: transaction.chain.shortName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: href && transaction.hash ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: href,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            style: {
                                                                color: 'inherit'
                                                            },
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(transaction.hash),
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                    size: 9
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                                    lineNumber: 366,
                                                                    columnNumber: 66
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 31
                                                        }, this) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(transaction.hash)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "ds-cell-numeric",
                                                        children: transaction.blockNumber ?? '—'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "ds-cell-numeric",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(transaction.timestamp)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, transaction.id, true, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 344,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 343,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                            title: "No transactions resolved.",
                            description: "Transaction hashes require an event-log scan. The public Creditcoin testnet RPC rejects log ranges wide enough to recover them from a single-id lookup, so none are shown rather than guessed. An indexer would populate this tab."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 381,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this) : null,
                    tab === 'events' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabPanel"], {
                        children: [
                            settlement.events.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ds-table-wrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "ds-table",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        children: "Event"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        children: "State"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        children: "Meaning"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        children: "Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: settlement.events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "ds-cell-strong",
                                                            children: event.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: event.state ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                                state: event.state
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                                lineNumber: 406,
                                                                columnNumber: 44
                                                            }, this) : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 406,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                whiteSpace: 'normal',
                                                                maxWidth: 420
                                                            },
                                                            children: event.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 407,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "ds-cell-numeric",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(event.timestamp)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, event.id, true, {
                                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 392,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                                title: "No events recorded.",
                                description: "The coordinator emits an event for every state transition. None have been observed for this settlement."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 415,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ds-section-note",
                                style: {
                                    marginTop: 12
                                },
                                children: "Timestamps come from the two the coordinator stores on chain (prepareTime, readyTime). Transitions it does not timestamp show a dash instead of an inferred time."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 420,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 390,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
function SettlementDetailPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const raw = decodeURIComponent(Array.isArray(params?.id) ? params.id[0] : params?.id ?? '');
    const chainLookup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSettlementId"])(raw);
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$use$2d$async$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAsync"])(async ()=>{
        if (chainLookup) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["settlementService"].getBySettlementId(raw);
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["settlementService"].getByReference(raw);
    }, [
        raw,
        chainLookup
    ]);
    if (result.loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 18
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        className: "ds-back",
                        href: "/dashboard/settlements",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, this),
                            " All settlements"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 447,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingTop: 26
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PanelSkeleton"], {
                            lines: 3,
                            height: 22
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 30
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PanelSkeleton"], {
                                lines: 7
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 455,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 454,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 452,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
            lineNumber: 446,
            columnNumber: 7
        }, this);
    }
    if (result.error) {
        const error = result.error;
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettlementNotFoundError"]) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 18
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: "ds-back",
                            href: "/dashboard/settlements",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 11
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                    lineNumber: 469,
                                    columnNumber: 15
                                }, this),
                                " All settlements"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 468,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 467,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            paddingTop: 26
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                            title: "No settlement under this id.",
                            description: `The coordinator holds no record for ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateHash"])(raw, 12, 8)}. Settlement ids are derived from both chains, both parties, both tokens, amounts, lock references, and expiry — a mismatch in any field yields a different id.`
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                            lineNumber: 473,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 472,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                lineNumber: 466,
                columnNumber: 9
            }, this);
        }
        const unavailable = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainReadUnavailableError"];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 18
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        className: "ds-back",
                        href: "/dashboard/settlements",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 487,
                                columnNumber: 13
                            }, this),
                            " All settlements"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 485,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingTop: 26
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorState"], {
                        title: unavailable ? 'Chain reads are not configured.' : 'Unable to load this settlement.',
                        description: unavailable ? 'Set NEXT_PUBLIC_CREDITCOIN_RPC_URL and NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS to read the coordinator directly. See web/.env.example.' : error.message,
                        onRetry: result.reload
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
            lineNumber: 484,
            columnNumber: 7
        }, this);
    }
    if (!result.data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 18
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        className: "ds-back",
                        href: "/dashboard/settlements",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                                lineNumber: 510,
                                columnNumber: 13
                            }, this),
                            " All settlements"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 509,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 508,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingTop: 26
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                        title: "Settlement not found.",
                        description: "No record matches this reference. Use a bytes32 settlement id to query the coordinator directly."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
                    lineNumber: 513,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
            lineNumber: 507,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailBody, {
        settlement: result.data.data
    }, void 0, false, {
        fileName: "[project]/app/dashboard/settlements/[id]/page.tsx",
        lineNumber: 523,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/dashboard/code-block.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock,
    "CopyButton",
    ()=>CopyButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function CopyButton({ value, label = 'Copy' }) {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = async ()=>{
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(()=>setCopied(false), 1600);
        } catch  {
        // Clipboard access can be denied (insecure context, permissions). Fail
        // silently rather than surfacing a browser-level error to an operator.
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: "ds-copy",
        onClick: copy,
        "aria-live": "polite",
        children: [
            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                size: 10
            }, void 0, false, {
                fileName: "[project]/components/dashboard/code-block.tsx",
                lineNumber: 23,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                size: 10
            }, void 0, false, {
                fileName: "[project]/components/dashboard/code-block.tsx",
                lineNumber: 23,
                columnNumber: 39
            }, this),
            copied ? 'Copied' : label
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/code-block.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function CodeBlock({ code, language, filename }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-code",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ds-code-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: filename ?? language ?? 'shell'
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/code-block.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyButton, {
                        value: code
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/code-block.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/code-block.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    children: code
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/code-block.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/code-block.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/code-block.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/dashboard/page-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function PageHeader({ eyebrow, title, lede, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-page-head",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    eyebrow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ds-eyebrow",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 17,
                        columnNumber: 20
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "ds-page-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    lede ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
"[project]/components/dashboard/primitives.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function OriginBadge({ origin }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-section-head",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "ds-section-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ds-panel",
        children: [
            title || action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "ds-panel-head",
                children: [
                    title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "ds-section-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 54,
                        columnNumber: 20
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
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
            padded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
        className: "ds-defs",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, this);
}
function Definition({ label, value, muted = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-def",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                className: "ds-def-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
"[project]/components/dashboard/settlement-timeline.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettlementTimeline",
    ()=>SettlementTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.mjs [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/types.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function stageIcon(status) {
    if (status === 'done') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
        size: 11
    }, void 0, false, {
        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
        lineNumber: 36,
        columnNumber: 33
    }, this);
    if (status === 'failed') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
        size: 11
    }, void 0, false, {
        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
        lineNumber: 37,
        columnNumber: 35
    }, this);
    if (status === 'current') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
        size: 9
    }, void 0, false, {
        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
        lineNumber: 38,
        columnNumber: 36
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
        size: 7
    }, void 0, false, {
        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, this);
}
function buildStages(settlement) {
    const { state } = settlement;
    const index = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(state);
    const reached = (target)=>index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(target);
    if (state === 'HELD') {
        // Locate the failure point. `evidenceManifest` is written only by
        // `submitProofs`, so its presence means READY was reached and COMMIT
        // timed out instead.
        const reachedReady = Boolean(settlement.evidenceManifest);
        const bothPrepared = settlement.attestedLeg.prepared && settlement.nativeLeg.prepared;
        return [
            {
                key: 'prepare',
                name: 'Prepare',
                note: bothPrepared ? 'Both legs registered locks under this settlement id.' : 'Only one leg was registered. The dual-PREPARE gate was never satisfied.',
                status: 'done',
                timestamp: settlement.prepareTime || null
            },
            {
                key: 'ready',
                name: 'Ready',
                note: reachedReady ? 'Both leg commitments were bound in a single attestation quorum.' : 'Not reached. READY requires both legs verified in one attestation quorum.',
                status: reachedReady ? 'done' : 'pending',
                timestamp: reachedReady ? settlement.readyTime || null : null
            },
            {
                key: 'verification-failed',
                name: reachedReady ? 'Commit window expired' : 'Verification failed',
                note: reachedReady ? 'The bounded commit window closed before COMMIT was called.' : 'The required proofs were not accepted inside the PREPARE window.',
                status: 'failed',
                timestamp: null
            },
            {
                key: 'held',
                name: 'Held',
                note: settlement.heldReason ?? 'Timeout reached without COMMIT. The unilateral refund path is open and needs no attestor cooperation.',
                status: 'failed',
                timestamp: null
            }
        ];
    }
    const stages = [
        {
            key: 'prepare',
            name: 'Prepare',
            note: settlement.attestedLeg.prepared && settlement.nativeLeg.prepared ? 'Both legs locked under this settlement id. Locks remain fully reversible.' : 'Awaiting the counterparty leg. The dual-PREPARE gate is not yet satisfied.',
            status: reached('READY') ? 'done' : 'current',
            timestamp: settlement.prepareTime || null
        },
        {
            key: 'ready',
            name: 'Ready',
            note: 'Both leg commitments verified in a single attestation quorum.',
            status: reached('COMMITTED') ? 'done' : reached('READY') ? 'current' : 'pending',
            timestamp: settlement.readyTime || null
        },
        {
            key: 'fresh-verification',
            name: 'Fresh verification',
            note: `Bounded window of ${Math.round(settlement.timeoutSeconds / 60)} minutes in which COMMIT stays callable. Source-chain finality buffers must clear first.`,
            status: reached('COMMITTED') ? 'done' : reached('READY') ? 'current' : 'pending',
            timestamp: null
        },
        {
            key: 'commit',
            name: 'Commit',
            note: 'Irreversible settlement authorization on Creditcoin. Nothing on a source chain becomes final before this point.',
            status: reached('SETTLED') ? 'done' : reached('COMMITTED') ? 'current' : 'pending',
            timestamp: null
        },
        {
            key: 'settled',
            name: 'Settled',
            note: 'Both native legs delivered and the finalization attestation recorded.',
            status: state === 'SETTLED' ? 'done' : 'pending',
            timestamp: null
        }
    ];
    return stages;
}
function SettlementTimeline({ settlement }) {
    const stages = buildStages(settlement);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-timeline",
        children: stages.map((stage, index)=>{
            const isLast = index === stages.length - 1;
            const connectorStatus = stage.status === 'done' ? 'done' : stage.status === 'failed' ? 'failed' : undefined;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ds-stage",
                "data-status": stage.status,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ds-stage-rail",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ds-stage-node",
                                "data-status": stage.status,
                                children: stage.key === 'commit' && stage.status === 'done' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 10
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                                    lineNumber: 153,
                                    columnNumber: 19
                                }, this) : stageIcon(stage.status)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this),
                            isLast ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ds-stage-connector",
                                "data-status": connectorStatus
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                                lineNumber: 158,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ds-stage-body",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ds-stage-name",
                                children: [
                                    stage.name,
                                    stage.timestamp ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ds-stage-time",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(stage.timestamp)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                                        lineNumber: 164,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                                lineNumber: 161,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ds-stage-note",
                                children: stage.note
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                        lineNumber: 160,
                        columnNumber: 13
                    }, this)
                ]
            }, stage.key, true, {
                fileName: "[project]/components/dashboard/settlement-timeline.tsx",
                lineNumber: 149,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/dashboard/settlement-timeline.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/dashboard/states.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState,
    "ErrorState",
    ()=>ErrorState,
    "Notice",
    ()=>Notice,
    "PanelSkeleton",
    ()=>PanelSkeleton,
    "Skeleton",
    ()=>Skeleton,
    "TableSkeleton",
    ()=>TableSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/inbox.mjs [app-ssr] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.mjs [app-ssr] (ecmascript) <export default as RotateCw>");
'use client';
;
;
function Skeleton({ width = '100%', height = 10, style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-skeleton",
        style: {
            width,
            height,
            ...style
        },
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/states.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
function TableSkeleton({ rows = 6, columns = 6 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-table-wrap",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "ds-table",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: Array.from({
                            length: columns
                        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                    width: index === 0 ? 72 : 54,
                                    height: 7
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/states.tsx",
                                    lineNumber: 28,
                                    columnNumber: 17
                                }, this)
                            }, index, false, {
                                fileName: "[project]/components/dashboard/states.tsx",
                                lineNumber: 27,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/states.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/states.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: Array.from({
                        length: rows
                    }, (_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: Array.from({
                                length: columns
                            }, (_, columnIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                        width: columnIndex === 1 ? 168 : columnIndex === 0 ? 76 : 48,
                                        height: 9
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/states.tsx",
                                        lineNumber: 38,
                                        columnNumber: 19
                                    }, this)
                                }, columnIndex, false, {
                                    fileName: "[project]/components/dashboard/states.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, this))
                        }, rowIndex, false, {
                            fileName: "[project]/components/dashboard/states.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/states.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/states.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/states.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function PanelSkeleton({ lines = 5, height = 9 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-stack",
        "aria-hidden": "true",
        children: Array.from({
            length: lines
        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                width: index % 3 === 0 ? '86%' : index % 3 === 1 ? '64%' : '73%',
                height: height
            }, index, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/dashboard/states.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
function EmptyState({ title, description, action, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-empty",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-empty-mark",
                children: icon ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/states.tsx",
                    lineNumber: 72,
                    columnNumber: 48
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: title
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: description
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/states.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
function ErrorState({ title = 'Unable to load data.', description, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-error",
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-empty-mark",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/states.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: title
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: description
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            onRetry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "ds-button",
                "data-variant": "outline",
                onClick: onRetry,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                        size: 11
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/states.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    " Try again"
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/states.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
function Notice({ tone = 'sample', title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-notice",
        "data-tone": tone === 'sample' ? undefined : tone,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                size: 12
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/states.tsx",
                        lineNumber: 124,
                        columnNumber: 18
                    }, this) : null,
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/states.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/dashboard/status-badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProofCount",
    ()=>ProofCount,
    "StatusBadge",
    ()=>StatusBadge,
    "ToneBadge",
    ()=>ToneBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-ssr] (ecmascript)");
;
;
function StatusBadge({ state }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-badge",
        "data-state": state,
        title: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATE_DESCRIPTIONS"][state],
        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATE_LABELS"][state]
    }, void 0, false, {
        fileName: "[project]/components/dashboard/status-badge.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function ToneBadge({ tone, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-proof-count",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-proof-bar",
                "aria-hidden": "true",
                children: Array.from({
                    length: required
                }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
"[project]/components/dashboard/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LinkTabs",
    ()=>LinkTabs,
    "Segmented",
    ()=>Segmented,
    "TabPanel",
    ()=>TabPanel,
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
function LinkTabs({ tabs, activeHref }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "ds-tabs",
        "aria-label": "Section",
        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: tab.href,
                className: "ds-tab",
                "data-active": tab.href === activeHref || undefined,
                children: tab.label
            }, tab.href, false, {
                fileName: "[project]/components/dashboard/tabs.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/dashboard/tabs.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
function Tabs({ tabs, active, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-tabs",
        role: "tablist",
        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "tab",
                className: "ds-tab",
                "aria-selected": tab.id === active,
                "data-active": tab.id === active || undefined,
                onClick: ()=>onChange(tab.id),
                children: [
                    tab.label,
                    tab.count !== undefined ? ` (${tab.count})` : ''
                ]
            }, tab.id, true, {
                fileName: "[project]/components/dashboard/tabs.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/dashboard/tabs.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function TabPanel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "tabpanel",
        style: {
            paddingTop: 18
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function Segmented({ options, active, onChange, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-segmented",
        role: "group",
        "aria-label": label,
        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "data-active": option === active || undefined,
                "aria-pressed": option === active,
                onClick: ()=>onChange(option),
                children: option
            }, option, false, {
                fileName: "[project]/components/dashboard/tabs.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/dashboard/tabs.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/handshake/abi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Read-only ABI fragments for the deployed Handshake contracts.
 *
 * Copied verbatim from the backend's canonical definitions so the frontend
 * cannot drift from them:
 *   - coordinator: `scripts/coordinator-client.js` (COORDINATOR_ABI)
 *   - lock:        `scripts/demo-lock.js` (LOCK_ABI) / `src/NativeSettlementLock.sol`
 *
 * Only view functions and events are included. The dashboard is a read-only
 * operator surface: it never drives settlement, per the frontend note in
 * README.md. Write fragments are intentionally omitted so no UI path can
 * accidentally submit a state transition.
 */ __turbopack_context__.s([
    "COORDINATOR_EVENT_DESCRIPTIONS",
    ()=>COORDINATOR_EVENT_DESCRIPTIONS,
    "COORDINATOR_READ_ABI",
    ()=>COORDINATOR_READ_ABI,
    "LOCK_READ_ABI",
    ()=>LOCK_READ_ABI
]);
const COORDINATOR_READ_ABI = [
    'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
    'function isCommitted(bytes32 id) view returns (bool)',
    'function evidenceManifest(bytes32 id) view returns (bytes32)',
    'function handshakes(bytes32) view returns (uint8 state, address attestedParty, address nativeParty, uint256 prepareTime, uint256 readyTime, bytes32 attestedCommit, bytes32 nativeCommit, bytes32 evidenceManifest, bytes32 settlementEvidence, bool attestedPrepared, bool nativePrepared)',
    'function TIMEOUT() view returns (uint256)',
    'event Prepared(bytes32 indexed id)',
    'event CounterpartyPrepared(bytes32 indexed id)',
    'event Ready(bytes32 indexed id)',
    'event Committed(bytes32 indexed id)',
    'event Settled(bytes32 indexed id)',
    'event Held(bytes32 indexed id)'
];
const LOCK_READ_ABI = [
    'function locks(bytes32) view returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)',
    'event Locked(bytes32 indexed settlementId, address indexed token, address indexed depositor, address recipient, uint256 amount, uint256 expiry)',
    'event Released(bytes32 indexed settlementId, address indexed recipient, uint256 amount)',
    'event Refunded(bytes32 indexed settlementId, address indexed depositor, uint256 amount)'
];
const COORDINATOR_EVENT_DESCRIPTIONS = {
    Prepared: 'First leg registered. Awaiting the counterparty leg.',
    CounterpartyPrepared: 'Dual-PREPARE gate satisfied. Both legs are locked.',
    Ready: 'Both legs verified. The bounded commit window is open.',
    Committed: 'Irreversible COMMIT executed on Creditcoin. Point of no return.',
    Settled: 'Native-chain finalization attested for both legs.',
    Held: 'Pre-commit timeout expired. Unilateral refund path is available.'
};
}),
"[project]/lib/handshake/chain-reader.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChainReadUnavailableError",
    ()=>ChainReadUnavailableError,
    "SettlementNotFoundError",
    ()=>SettlementNotFoundError,
    "isSettlementId",
    ()=>isSettlementId,
    "readSettlementFromChain",
    ()=>readSettlementFromChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/constants/addresses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/abi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/types.ts [app-ssr] (ecmascript)");
;
;
;
;
const ZERO_BYTES32 = `0x${'0'.repeat(64)}`;
class ChainReadUnavailableError extends Error {
    constructor(message){
        super(message);
        this.name = 'ChainReadUnavailableError';
    }
}
class SettlementNotFoundError extends Error {
    settlementId;
    constructor(settlementId){
        super(`No settlement is registered on the coordinator under ${settlementId}.`);
        this.name = 'SettlementNotFoundError';
        this.settlementId = settlementId;
    }
}
function isSettlementId(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHexString"])(value, 32);
}
function providerFor(rpcUrl) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl, undefined, {
        staticNetwork: true
    });
}
function nonZeroAddress(value) {
    return value && value !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZeroAddress"] ? value : null;
}
function nonZeroHash(value) {
    return value && value !== ZERO_BYTES32 ? value : null;
}
function toState(ordinal) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"][ordinal] ?? 'NONE';
}
function toLockState(ordinal) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCK_STATES"][ordinal] ?? 'NONE';
}
async function readLock(rpcUrl, address, settlementId) {
    if (!rpcUrl || !address) return null;
    try {
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Contract"](address, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCK_READ_ABI"], providerFor(rpcUrl));
        const record = await contract.locks(settlementId);
        const state = toLockState(Number(record[0]));
        if (state === 'NONE') return null;
        return {
            state,
            token: record[1],
            depositor: record[2],
            recipient: record[3],
            amount: record[4].toString(),
            expiry: Number(record[5])
        };
    } catch  {
        // A lock read failure must never mask the coordinator record, which is the
        // authoritative source for settlement state.
        return null;
    }
}
/**
 * Builds the proof list from what the coordinator actually recorded.
 *
 * Nothing here is invented: a proof is only reported VERIFIED when the
 * coordinator holds a non-zero commitment for it, because `HandshakeASC` writes
 * those commitments strictly after `verifier.verifyPrepareLeg` /
 * `verifyPrepare` / `verifySettlement` return true.
 */ function buildProofs(state, attestedCommit, nativeCommit, manifest, settlementEvidence, readyTime) {
    const reached = (target)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(state) >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(target);
    const proofs = [
        {
            id: 'attested-leg',
            label: 'Ethereum Sepolia asset lock',
            method: 'prepareAttestedLeg',
            status: attestedCommit ? 'VERIFIED' : 'NOT_SUBMITTED',
            verifiedVia: 'attestcoin',
            sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
            commitment: attestedCommit,
            inclusionProof: Boolean(attestedCommit),
            continuityProof: Boolean(attestedCommit),
            verifiedAt: null,
            note: attestedCommit ? undefined : 'The Attestcoin inclusion and continuity proof for the Ethereum leg has not been accepted by the coordinator.'
        },
        {
            id: 'native-leg',
            label: 'Creditcoin payment lock',
            method: 'prepareNativeLeg',
            status: nativeCommit ? 'VERIFIED' : 'NOT_SUBMITTED',
            verifiedVia: 'native-state',
            sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"],
            commitment: nativeCommit,
            // The native leg lives on the coordinator's own chain and is checked by
            // reading lock state directly, so no Attestcoin proof is involved.
            inclusionProof: false,
            continuityProof: false,
            verifiedAt: null,
            note: nativeCommit ? 'Verified by reading the Creditcoin lock directly. No Attestcoin proof is required on the coordinator’s own chain.' : 'The coordinator has not confirmed a LOCKED position for this leg on the Creditcoin lock.'
        },
        {
            id: 'dual-prepare',
            label: 'Dual-PREPARE quorum attestation',
            method: 'submitProofs',
            status: manifest ? 'VERIFIED' : reached('READY') ? 'PENDING' : 'NOT_SUBMITTED',
            verifiedVia: 'attestcoin',
            sourceChain: null,
            commitment: manifest,
            inclusionProof: Boolean(manifest),
            continuityProof: Boolean(manifest),
            verifiedAt: manifest && readyTime > 0 ? readyTime : null,
            note: manifest ? undefined : 'Both leg commitments must be bound in a single attestation quorum before the settlement can reach READY.'
        },
        {
            id: 'settlement-attestation',
            label: 'Post-COMMIT settlement attestation',
            method: 'settle',
            status: settlementEvidence ? 'VERIFIED' : state === 'COMMITTED' ? 'PENDING' : 'NOT_SUBMITTED',
            verifiedVia: 'attestcoin',
            sourceChain: null,
            commitment: settlementEvidence,
            inclusionProof: Boolean(settlementEvidence),
            continuityProof: Boolean(settlementEvidence),
            verifiedAt: null,
            note: settlementEvidence ? undefined : 'Recorded only after both native legs finalize following the irreversible Creditcoin COMMIT.'
        }
    ];
    return proofs;
}
/**
 * Derives the lifecycle event trail from coordinator state.
 *
 * Timestamps come from the two timestamps the coordinator actually stores
 * (`prepareTime`, `readyTime`). Transitions with no stored timestamp report
 * `null` rather than a guess.
 */ function buildEvents(state, prepareTime, readyTime, bothPrepared) {
    const index = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(state);
    const events = [];
    const push = (name, target, timestamp)=>{
        events.push({
            id: `${name}-${timestamp ?? 'unknown'}`,
            name,
            state: target,
            timestamp,
            blockNumber: null,
            transactionHash: null,
            description: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COORDINATOR_EVENT_DESCRIPTIONS"][name] ?? ''
        });
    };
    if (index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf('PREPARE')) {
        push('Prepared', 'PREPARE', prepareTime > 0 ? prepareTime : null);
        if (bothPrepared) push('CounterpartyPrepared', 'PREPARE', null);
    }
    if (index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf('READY') && state !== 'HELD') {
        push('Ready', 'READY', readyTime > 0 ? readyTime : null);
    }
    if (index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf('COMMITTED') && state !== 'HELD') {
        push('Committed', 'COMMITTED', null);
    }
    if (state === 'SETTLED') push('Settled', 'SETTLED', null);
    if (state === 'HELD') push('Held', 'HELD', null);
    return events;
}
function buildTransactions(lock, chainKey) {
    // Transaction hashes require either an event-log scan or an indexer. The
    // public Creditcoin RPC times out on wide `eth_getLogs` ranges, so a
    // single-id lookup cannot recover them. We surface the lock record without
    // fabricating a hash.
    void lock;
    void chainKey;
    return [];
}
function heldExplanation(attestedCommit, nativeCommit, manifest) {
    if (!attestedCommit && !nativeCommit) {
        return 'Neither leg was verified before the PREPARE window expired. No irreversible commit was executed.';
    }
    if (!attestedCommit) {
        return 'The Ethereum Sepolia asset lock could not be verified through Attestcoin before the PREPARE window expired. No irreversible commit was executed.';
    }
    if (!nativeCommit) {
        return 'The Creditcoin payment lock was not confirmed before the PREPARE window expired. No irreversible commit was executed.';
    }
    if (!manifest) {
        return 'Both legs were prepared but the dual-PREPARE quorum attestation was not accepted before the window expired. No irreversible commit was executed.';
    }
    return 'The settlement reached READY but COMMIT was not executed within the bounded commit window. No irreversible commit was executed.';
}
async function readSettlementFromChain(settlementId, config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readPublicChainConfig"])()) {
    if (!isSettlementId(settlementId)) {
        throw new TypeError('A settlement id must be a 32-byte hex value.');
    }
    if (!config.creditcoinRpcUrl || !config.coordinatorAddress) {
        throw new ChainReadUnavailableError('Live coordinator reads need NEXT_PUBLIC_CREDITCOIN_RPC_URL and NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS.');
    }
    const provider = providerFor(config.creditcoinRpcUrl);
    const coordinator = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Contract"](config.coordinatorAddress, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COORDINATOR_READ_ABI"], provider);
    const [record, blockNumber] = await Promise.all([
        coordinator.handshakes(settlementId),
        provider.getBlockNumber()
    ]);
    const state = toState(Number(record[0]));
    if (state === 'NONE') throw new SettlementNotFoundError(settlementId);
    const attestedParty = nonZeroAddress(record[1]);
    const nativeParty = nonZeroAddress(record[2]);
    const prepareTime = Number(record[3]);
    const readyTime = Number(record[4]);
    const attestedCommit = nonZeroHash(record[5]);
    const nativeCommit = nonZeroHash(record[6]);
    const manifest = nonZeroHash(record[7]);
    const settlementEvidence = nonZeroHash(record[8]);
    const attestedPrepared = Boolean(record[9]);
    const nativePrepared = Boolean(record[10]);
    const [attestedLock, nativeLock] = await Promise.all([
        readLock(config.ethereumSepoliaRpcUrl, config.ethereumLockAddress, settlementId),
        readLock(config.creditcoinRpcUrl, config.creditcoinLockAddress, settlementId)
    ]);
    const timeoutSeconds = await coordinator.TIMEOUT().then((value)=>Number(value)).catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COORDINATOR_TIMEOUT_SECONDS"]);
    const settlement = {
        reference: `${settlementId.slice(0, 10)}…${settlementId.slice(-6)}`,
        settlementId,
        state,
        origin: 'chain',
        attestedLeg: {
            kind: 'attested',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
            party: attestedParty,
            prepared: attestedPrepared,
            commitment: attestedCommit,
            lock: attestedLock
        },
        nativeLeg: {
            kind: 'native',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"],
            party: nativeParty,
            prepared: nativePrepared,
            commitment: nativeCommit,
            lock: nativeLock
        },
        prepareTime,
        readyTime,
        timeoutSeconds,
        evidenceManifest: manifest,
        settlementEvidence,
        proofs: buildProofs(state, attestedCommit, nativeCommit, manifest, settlementEvidence, readyTime),
        transactions: [
            ...buildTransactions(attestedLock, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key),
            ...buildTransactions(nativeLock, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"].key)
        ],
        events: buildEvents(state, prepareTime, readyTime, attestedPrepared && nativePrepared),
        heldReason: state === 'HELD' ? heldExplanation(attestedCommit, nativeCommit, manifest) : null
    };
    return {
        settlement,
        blockNumber
    };
}
}),
"[project]/lib/handshake/chains.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/handshake/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/handshake/sample/sample-source.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SAMPLE_SETTLEMENTS",
    ()=>SAMPLE_SETTLEMENTS,
    "SAMPLE_SOURCE_NOTICE",
    ()=>SAMPLE_SOURCE_NOTICE,
    "expandSampleSettlement",
    ()=>expandSampleSettlement,
    "sampleActivityFeed",
    ()=>sampleActivityFeed,
    "sampleActivitySeries",
    ()=>sampleActivitySeries,
    "sampleApiKeys",
    ()=>sampleApiKeys,
    "sampleMetrics",
    ()=>sampleMetrics,
    "sampleRouteBreakdown",
    ()=>sampleRouteBreakdown,
    "sampleWebhooks",
    ()=>sampleWebhooks
]);
/**
 * SAMPLE SETTLEMENT SOURCE — NOT CHAIN DATA.
 *
 * ## Why this exists
 *
 * The deployed coordinator (`HandshakeASC`) is keyed by `bytes32` settlement id
 * and exposes no enumeration. Building a list, a metrics roll-up, or an activity
 * feed requires scanning `Prepared`/`Ready`/`Committed`/`Settled`/`Held` logs,
 * and the public Creditcoin testnet RPC rejects any `eth_getLogs` range wider
 * than roughly a thousand blocks with `query timeout of 10 seconds exceeded`.
 * There is no indexer, REST API, or subgraph in the repository. So list-shaped
 * views cannot be served from chain today.
 *
 * ## Safety properties
 *
 * Per AGENTS.md, a mock must be impossible to mistake for a proof-verified
 * state. This module guarantees that:
 *
 *  1. Every record it emits carries `origin: 'sample'`. The real reader in
 *     `chain-reader.ts` only ever emits `origin: 'chain'`.
 *  2. `settlementId` is always `null` here. A sample row therefore has no
 *     bytes32 id and cannot be looked up, linked to, or confused with a real
 *     coordinator record.
 *  3. No transaction hashes, block numbers, or proof commitments are invented.
 *     Those fields are empty or `null` throughout, so the detail view renders
 *     "not available from this source" rather than a plausible-looking hash.
 *  4. `SAMPLE_SOURCE_NOTICE` is rendered by every view backed by this module.
 *
 * This file is imported only by `services.ts` and is unreachable from
 * `chain-reader.ts`. Replacing it means implementing the same service interface
 * against an indexer; no component changes.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-ssr] (ecmascript)");
;
const SAMPLE_SOURCE_NOTICE = 'Sample data. The coordinator exposes no settlement enumeration and the public testnet RPC cannot serve the log range a list view needs. Look up a settlement by its bytes32 id for a live, verified coordinator read.';
/** Deterministic pseudo-random source so the sample set is stable across renders. */ function seeded(seed) {
    let state = seed >>> 0;
    return ()=>{
        state = state * 1664525 + 1013904223 >>> 0;
        return state / 0x100000000;
    };
}
/**
 * Fixed clock for the sample set.
 *
 * A real timestamp would drift and make sample rows look like a live feed.
 * Anchoring to a constant keeps the data visibly static.
 */ const SAMPLE_EPOCH = Date.UTC(2026, 7, 30, 14, 32, 0) / 1000;
const STATE_WEIGHTS = [
    [
        'SETTLED',
        0.78
    ],
    [
        'HELD',
        0.07
    ],
    [
        'COMMITTED',
        0.05
    ],
    [
        'READY',
        0.05
    ],
    [
        'PREPARE',
        0.05
    ]
];
function pickState(random) {
    const roll = random();
    let cumulative = 0;
    for (const [state, weight] of STATE_WEIGHTS){
        cumulative += weight;
        if (roll < cumulative) return state;
    }
    return 'SETTLED';
}
const HELD_REASONS = [
    'Payment escrow proof could not be verified before the PREPARE window expired. No irreversible commit was executed.',
    'The Ethereum Sepolia asset lock did not clear the 12-confirmation finality buffer within the commit window. No irreversible commit was executed.',
    'The counterparty leg was never prepared, so the dual-PREPARE gate was not satisfied. No irreversible commit was executed.'
];
function buildSampleSet() {
    const random = seeded(1028);
    const records = [];
    const count = 96;
    for(let index = 0; index < count; index += 1){
        const state = pickState(random);
        const eastbound = random() > 0.42;
        const sourceChain = eastbound ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"];
        const destinationChain = eastbound ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"];
        // Spread across ~90 days, newest first.
        const ageSeconds = Math.floor(random() * 90 * 86400 * (index / count + 0.02));
        const createdAt = SAMPLE_EPOCH - ageSeconds;
        const proofsVerified = state === 'SETTLED' || state === 'COMMITTED' ? 2 : state === 'READY' ? 2 : state === 'HELD' ? random() > 0.5 ? 1 : 0 : 1;
        const durationSeconds = state === 'SETTLED' ? 28 + Math.floor(random() * 180) : state === 'HELD' ? 3600 + Math.floor(random() * 600) : null;
        records.push({
            reference: `STL-${1028 - index}`,
            settlementId: null,
            state,
            origin: 'sample',
            sourceChain,
            destinationChain,
            proofsVerified,
            proofsRequired: 2,
            createdAt,
            durationSeconds,
            heldReason: state === 'HELD' ? HELD_REASONS[index % HELD_REASONS.length] : null
        });
    }
    return records.sort((a, b)=>b.createdAt - a.createdAt);
}
const SAMPLE_SETTLEMENTS = buildSampleSet();
function expandSampleSettlement(reference) {
    const record = SAMPLE_SETTLEMENTS.find((item)=>item.reference === reference);
    if (!record) return null;
    const attestedIsSource = record.sourceChain.key === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key;
    const stateIndex = [
        'NONE',
        'PREPARE',
        'READY',
        'COMMITTED',
        'SETTLED',
        'HELD'
    ].indexOf(record.state);
    const reachedReady = record.state !== 'PREPARE' && record.state !== 'HELD';
    const bothPrepared = record.proofsVerified >= 2;
    const sampleProof = (base)=>({
            ...base,
            // Never fabricate a commitment hash.
            commitment: null,
            inclusionProof: false,
            continuityProof: false,
            verifiedAt: null
        });
    return {
        reference: record.reference,
        settlementId: null,
        state: record.state,
        origin: 'sample',
        attestedLeg: {
            kind: 'attested',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
            party: null,
            prepared: bothPrepared || record.proofsVerified === 1 && attestedIsSource,
            commitment: null,
            lock: null
        },
        nativeLeg: {
            kind: 'native',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"],
            party: null,
            prepared: bothPrepared || record.proofsVerified === 1 && !attestedIsSource,
            commitment: null,
            lock: null
        },
        prepareTime: record.createdAt,
        readyTime: reachedReady ? record.createdAt + 12 : 0,
        timeoutSeconds: 3600,
        evidenceManifest: null,
        settlementEvidence: null,
        proofs: [
            sampleProof({
                id: 'attested-leg',
                label: 'Ethereum Sepolia asset lock',
                method: 'prepareAttestedLeg',
                status: record.proofsVerified >= 1 ? 'VERIFIED' : 'NOT_SUBMITTED',
                verifiedVia: 'attestcoin',
                sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
                note: 'Sample record. Proof commitments are not available from this source.'
            }),
            sampleProof({
                id: 'native-leg',
                label: 'Creditcoin payment lock',
                method: 'prepareNativeLeg',
                status: record.proofsVerified >= 2 ? 'VERIFIED' : 'NOT_SUBMITTED',
                verifiedVia: 'native-state',
                sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDITCOIN"],
                note: 'Sample record. Proof commitments are not available from this source.'
            }),
            sampleProof({
                id: 'dual-prepare',
                label: 'Dual-PREPARE quorum attestation',
                method: 'submitProofs',
                status: reachedReady ? 'VERIFIED' : 'NOT_SUBMITTED',
                verifiedVia: 'attestcoin',
                sourceChain: null,
                note: 'Sample record. Proof commitments are not available from this source.'
            }),
            sampleProof({
                id: 'settlement-attestation',
                label: 'Post-COMMIT settlement attestation',
                method: 'settle',
                status: record.state === 'SETTLED' ? 'VERIFIED' : 'NOT_SUBMITTED',
                verifiedVia: 'attestcoin',
                sourceChain: null,
                note: 'Sample record. Proof commitments are not available from this source.'
            })
        ],
        // No hashes are invented, so this source contributes no transactions.
        transactions: [],
        events: buildSampleEvents(record.state, record.createdAt, stateIndex, bothPrepared),
        heldReason: record.heldReason
    };
}
function buildSampleEvents(state, createdAt, stateIndex, bothPrepared) {
    const events = [];
    const push = (name, target, offset, description)=>events.push({
            id: `${name}-${offset}`,
            name,
            state: target,
            timestamp: createdAt + offset,
            blockNumber: null,
            transactionHash: null,
            description
        });
    push('Prepared', 'PREPARE', 0, 'First leg registered. Awaiting the counterparty leg.');
    if (bothPrepared) {
        push('CounterpartyPrepared', 'PREPARE', 6, 'Dual-PREPARE gate satisfied. Both legs are locked.');
    }
    if (stateIndex >= 2 && state !== 'HELD') {
        push('Ready', 'READY', 12, 'Both legs verified. The bounded commit window is open.');
    }
    if (stateIndex >= 3 && state !== 'HELD') {
        push('Committed', 'COMMITTED', 24, 'Irreversible COMMIT executed on Creditcoin. Point of no return.');
    }
    if (state === 'SETTLED') {
        push('Settled', 'SETTLED', 42, 'Native-chain finalization attested for both legs.');
    }
    if (state === 'HELD') {
        push('Held', 'HELD', 3600, 'Pre-commit timeout expired. Unilateral refund path is available.');
    }
    return events.reverse();
}
function sampleMetrics() {
    const total = SAMPLE_SETTLEMENTS.length;
    const settled = SAMPLE_SETTLEMENTS.filter((item)=>item.state === 'SETTLED').length;
    const held = SAMPLE_SETTLEMENTS.filter((item)=>item.state === 'HELD').length;
    const inFlight = total - settled - held;
    const proofsVerified = SAMPLE_SETTLEMENTS.reduce((sum, item)=>sum + item.proofsVerified, 0);
    const failures = SAMPLE_SETTLEMENTS.reduce((sum, item)=>sum + (item.state === 'HELD' ? item.proofsRequired - item.proofsVerified : 0), 0);
    const settledDurations = SAMPLE_SETTLEMENTS.filter((item)=>item.state === 'SETTLED' && item.durationSeconds !== null).map((item)=>item.durationSeconds);
    return {
        origin: 'sample',
        totalSettlements: total,
        settled,
        held,
        inFlight,
        proofsVerified,
        proofVerificationFailures: failures,
        successRate: total > 0 ? settled / total : 0,
        heldRate: total > 0 ? held / total : 0,
        averageSettlementSeconds: settledDurations.length > 0 ? Math.round(settledDurations.reduce((a, b)=>a + b, 0) / settledDurations.length) : 0
    };
}
const WINDOW_DAYS = {
    '7D': 7,
    '30D': 30,
    '90D': 90
};
function sampleActivitySeries(window) {
    const days = WINDOW_DAYS[window];
    const buckets = new Map();
    for(let offset = days - 1; offset >= 0; offset -= 1){
        const date = new Date((SAMPLE_EPOCH - offset * 86400) * 1000);
        const key = date.toISOString().slice(0, 10);
        buckets.set(key, {
            date: key,
            settled: 0,
            held: 0,
            proofsVerified: 0
        });
    }
    for (const record of SAMPLE_SETTLEMENTS){
        const key = new Date(record.createdAt * 1000).toISOString().slice(0, 10);
        const bucket = buckets.get(key);
        if (!bucket) continue;
        if (record.state === 'SETTLED') bucket.settled += 1;
        if (record.state === 'HELD') bucket.held += 1;
        bucket.proofsVerified += record.proofsVerified;
    }
    return [
        ...buckets.values()
    ];
}
function sampleRouteBreakdown() {
    const routes = new Map();
    for (const record of SAMPLE_SETTLEMENTS){
        const key = `${record.sourceChain.key}->${record.destinationChain.key}`;
        const existing = routes.get(key) ?? {
            sourceChain: record.sourceChain,
            destinationChain: record.destinationChain,
            total: 0,
            settled: 0,
            held: 0,
            averageSettlementSeconds: 0
        };
        existing.total += 1;
        if (record.state === 'SETTLED') {
            existing.settled += 1;
            if (record.durationSeconds !== null) {
                // Running mean over settled rows only.
                existing.averageSettlementSeconds = existing.averageSettlementSeconds + (record.durationSeconds - existing.averageSettlementSeconds) / existing.settled;
            }
        }
        if (record.state === 'HELD') existing.held += 1;
        routes.set(key, existing);
    }
    return [
        ...routes.values()
    ].map((route)=>({
            ...route,
            averageSettlementSeconds: Math.round(route.averageSettlementSeconds)
        })).sort((a, b)=>b.total - a.total);
}
function sampleActivityFeed(limit = 12) {
    const entries = [];
    for (const record of SAMPLE_SETTLEMENTS.slice(0, limit)){
        entries.push({
            id: `${record.reference}-state`,
            origin: 'sample',
            timestamp: record.createdAt + (record.durationSeconds ?? 0),
            kind: 'settlement',
            title: `Settlement ${record.reference}`,
            detail: `${record.sourceChain.shortName} → ${record.destinationChain.shortName}`,
            status: record.state,
            settlementReference: record.reference
        });
        if (record.proofsVerified > 0) {
            entries.push({
                id: `${record.reference}-proof`,
                origin: 'sample',
                timestamp: record.createdAt + 8,
                kind: 'proof',
                title: 'Proof verified',
                detail: record.sourceChain.key === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key ? 'Ethereum Sepolia asset lock' : 'Creditcoin payment lock',
                status: 'VERIFIED',
                settlementReference: record.reference
            });
        }
    }
    return entries.sort((a, b)=>b.timestamp - a.timestamp).slice(0, limit);
}
function sampleApiKeys() {
    return [
        {
            id: 'key_local_1',
            name: 'Settlement monitor (read-only)',
            maskedKey: 'hs_test_••••••••••••••••••••••••',
            environment: 'testnet',
            createdAt: SAMPLE_EPOCH - 21 * 86400,
            lastUsedAt: SAMPLE_EPOCH - 2 * 3600,
            status: 'ACTIVE'
        },
        {
            id: 'key_local_2',
            name: 'Relay worker',
            maskedKey: 'hs_test_••••••••••••••••••••••••',
            environment: 'testnet',
            createdAt: SAMPLE_EPOCH - 44 * 86400,
            lastUsedAt: SAMPLE_EPOCH - 6 * 86400,
            status: 'ACTIVE'
        },
        {
            id: 'key_local_3',
            name: 'Retired CI key',
            maskedKey: 'hs_test_••••••••••••••••••••••••',
            environment: 'testnet',
            createdAt: SAMPLE_EPOCH - 90 * 86400,
            lastUsedAt: null,
            status: 'REVOKED'
        }
    ];
}
function sampleWebhooks() {
    return [
        {
            id: 'wh_local_1',
            url: 'https://ops.example.com/hooks/handshake',
            events: [
                'Ready',
                'Committed',
                'Settled',
                'Held'
            ],
            status: 'ACTIVE',
            createdAt: SAMPLE_EPOCH - 30 * 86400,
            lastDeliveryAt: SAMPLE_EPOCH - 3600
        }
    ];
}
}),
"[project]/lib/handshake/services.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiKeyIssuingUnavailableError",
    ()=>ApiKeyIssuingUnavailableError,
    "apiKeyService",
    ()=>apiKeyService,
    "metricsService",
    ()=>metricsService,
    "settlementService",
    ()=>settlementService,
    "webhookService",
    ()=>webhookService
]);
/**
 * Data service layer.
 *
 * Components depend only on these interfaces, never on a concrete source. Today
 * two sources are wired in:
 *
 *   - `chain-reader.ts` — live coordinator reads, keyed by bytes32 settlement id.
 *     Used by `SettlementService.getBySettlementId`. Everything it returns is a
 *     storage read from the deployed contracts.
 *   - `sample/sample-source.ts` — clearly labelled sample records for the
 *     list/metrics/activity shapes the public RPC cannot serve. Every record
 *     carries `origin: 'sample'` and a `null` settlement id.
 *
 * Swapping in an indexer means implementing these same interfaces. No component
 * changes are required.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chain-reader.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/sample/sample-source.ts [app-ssr] (ecmascript)");
;
;
;
;
;
/** Simulated latency so skeleton states are exercised in development. */ const SAMPLE_LATENCY_MS = 260;
function delay(value, ms = SAMPLE_LATENCY_MS) {
    return new Promise((resolve)=>setTimeout(()=>resolve(value), ms));
}
function sampled(data) {
    return {
        data,
        origin: 'sample',
        notice: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SAMPLE_SOURCE_NOTICE"]
    };
}
function matchesQuery(row, query) {
    if (query.state && query.state !== 'ALL' && row.state !== query.state) return false;
    if (query.sourceChainKey && row.sourceChain.key !== query.sourceChainKey) return false;
    if (query.destinationChainKey && row.destinationChain.key !== query.destinationChainKey) {
        return false;
    }
    if (query.since && row.createdAt < query.since) return false;
    if (query.search) {
        const needle = query.search.trim().toLowerCase();
        if (needle) {
            const haystack = [
                row.reference,
                row.settlementId ?? '',
                row.sourceChain.name,
                row.destinationChain.name,
                row.state
            ].join(' ').toLowerCase();
            if (!haystack.includes(needle)) return false;
        }
    }
    return true;
}
function sortRows(rows, sort) {
    const sorted = [
        ...rows
    ];
    switch(sort){
        case 'oldest':
            return sorted.sort((a, b)=>a.createdAt - b.createdAt);
        case 'longest':
            return sorted.sort((a, b)=>(b.durationSeconds ?? 0) - (a.durationSeconds ?? 0));
        case 'shortest':
            return sorted.sort((a, b)=>(a.durationSeconds ?? Infinity) - (b.durationSeconds ?? Infinity));
        default:
            return sorted.sort((a, b)=>b.createdAt - a.createdAt);
    }
}
class DefaultSettlementService {
    chainLookupAvailable() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canReadChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readPublicChainConfig"])());
    }
    async list(query = {}) {
        const page = Math.max(1, query.page ?? 1);
        const pageSize = Math.max(1, query.pageSize ?? 15);
        const filtered = sortRows(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SAMPLE_SETTLEMENTS"].filter((row)=>matchesQuery(row, query)), query.sort);
        const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
        const safePage = Math.min(page, pageCount);
        const start = (safePage - 1) * pageSize;
        return delay(sampled({
            items: filtered.slice(start, start + pageSize),
            total: filtered.length,
            page: safePage,
            pageSize,
            pageCount
        }));
    }
    async recent(limit = 6) {
        return delay(sampled(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SAMPLE_SETTLEMENTS"].slice(0, limit)));
    }
    async getBySettlementId(settlementId) {
        const { settlement } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readSettlementFromChain"])(settlementId);
        return {
            data: settlement,
            origin: 'chain'
        };
    }
    async getByReference(reference) {
        const settlement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandSampleSettlement"])(reference);
        if (!settlement) return null;
        return delay(sampled(settlement));
    }
}
class DefaultMetricsService {
    async snapshot() {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleMetrics"])()));
    }
    async activitySeries(window) {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleActivitySeries"])(window)));
    }
    async routes() {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleRouteBreakdown"])()));
    }
    async feed(limit = 12) {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleActivityFeed"])(limit)));
    }
}
class ApiKeyIssuingUnavailableError extends Error {
    constructor(){
        super('No credential service is configured. Issuing a key requires a server-side store that can return the secret exactly once; the dashboard will not generate one locally.');
        this.name = 'ApiKeyIssuingUnavailableError';
    }
}
class DefaultApiKeyService {
    issuingAvailable() {
        // No key-issuing endpoint exists in the repository.
        return false;
    }
    async list() {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleApiKeys"])()));
    }
    async create(_name) {
        // Refusing here is deliberate: inventing a secret would imply a security
        // mechanism that does not exist.
        throw new ApiKeyIssuingUnavailableError();
    }
    async revoke(_id) {
        throw new ApiKeyIssuingUnavailableError();
    }
}
class DefaultWebhookService {
    deliveryAvailable() {
        // No webhook dispatcher exists in the repository.
        return false;
    }
    async list() {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleWebhooks"])()));
    }
}
const settlementService = new DefaultSettlementService();
const metricsService = new DefaultMetricsService();
const apiKeyService = new DefaultApiKeyService();
const webhookService = new DefaultWebhookService();
}),
"[project]/lib/handshake/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/handshake/use-async.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAsync",
    ()=>useAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useAsync(loader, deps) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [nonce, setNonce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // The loader identity is intentionally keyed on the caller's deps rather than
    // the function itself, so inline closures do not cause refetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(loader, deps);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let active = true;
        setLoading(true);
        setError(null);
        run().then((result)=>{
            if (!active) return;
            setData(result);
            setLoading(false);
        }).catch((cause)=>{
            if (!active) return;
            setError(cause instanceof Error ? cause : new Error(String(cause)));
            setLoading(false);
        });
        return ()=>{
            active = false;
        };
    }, [
        run,
        nonce
    ]);
    const reload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setNonce((value)=>value + 1), []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            data,
            error,
            loading,
            reload
        }), [
        data,
        error,
        loading,
        reload
    ]);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09knn8f._.js.map