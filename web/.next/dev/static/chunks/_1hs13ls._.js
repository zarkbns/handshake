(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/settlements/settlements-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettlementsView",
    ()=>SettlementsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$filter$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/filter-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/page-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$settlement$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/settlement-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/states.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/handshake/services.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$use$2d$async$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/use-async.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const PAGE_SIZE = 15;
const DEFAULT_FILTERS = {
    search: '',
    state: 'ALL',
    sourceChainKey: '',
    destinationChainKey: '',
    dateRange: 'all',
    sort: 'newest'
};
const DATE_OFFSETS = {
    all: undefined,
    '24h': 86400,
    '7d': 7 * 86400,
    '30d': 30 * 86400
};
/** In-flight states, for the `?status=pending` deep link from the header dropdown. */ const PENDING_STATES = [
    'PREPARE',
    'READY',
    'COMMITTED'
];
function filtersFromParams(status) {
    if (!status) return DEFAULT_FILTERS;
    const normalized = status.toUpperCase();
    if (normalized === 'SETTLED' || normalized === 'HELD') {
        return {
            ...DEFAULT_FILTERS,
            state: normalized
        };
    }
    // `pending` is a group rather than a single coordinator state, handled below.
    return DEFAULT_FILTERS;
}
function SettlementsView() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const statusParam = params?.get('status') ?? null;
    const pendingGroup = statusParam?.toLowerCase() === 'pending';
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SettlementsView.useState": ()=>filtersFromParams(statusParam)
    }["SettlementsView.useState"]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lookupId, setLookupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SettlementsView.useMemo[query]": ()=>({
                search: filters.search,
                state: filters.state,
                sourceChainKey: filters.sourceChainKey || undefined,
                destinationChainKey: filters.destinationChainKey || undefined,
                since: DATE_OFFSETS[filters.dateRange] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISPLAY_NOW"] - DATE_OFFSETS[filters.dateRange] : undefined,
                sort: filters.sort,
                page,
                pageSize: PAGE_SIZE
            })
    }["SettlementsView.useMemo[query]"], [
        filters,
        page
    ]);
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$use$2d$async$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAsync"])({
        "SettlementsView.useAsync[result]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["settlementService"].list(query)
    }["SettlementsView.useAsync[result]"], [
        query
    ]);
    const patch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettlementsView.useCallback[patch]": (next)=>{
            setFilters({
                "SettlementsView.useCallback[patch]": (current)=>({
                        ...current,
                        ...next
                    })
            }["SettlementsView.useCallback[patch]"]);
            setPage(1);
        }
    }["SettlementsView.useCallback[patch]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettlementsView.useCallback[reset]": ()=>{
            setFilters(DEFAULT_FILTERS);
            setPage(1);
            if (statusParam) router.replace('/dashboard/settlements');
        }
    }["SettlementsView.useCallback[reset]"], [
        router,
        statusParam
    ]);
    const payload = result.data?.data;
    // The `pending` deep link spans three coordinator states, so it is applied
    // after fetch rather than pushed into the single-state query filter.
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SettlementsView.useMemo[rows]": ()=>{
            if (!payload) return [];
            return pendingGroup && filters.state === 'ALL' ? payload.items.filter({
                "SettlementsView.useMemo[rows]": (row)=>PENDING_STATES.includes(row.state)
            }["SettlementsView.useMemo[rows]"]) : payload.items;
        }
    }["SettlementsView.useMemo[rows]"], [
        payload,
        pendingGroup,
        filters.state
    ]);
    const submitLookup = (event)=>{
        event.preventDefault();
        const trimmed = lookupId.trim();
        if (trimmed) router.push(`/dashboard/settlements/${encodeURIComponent(trimmed)}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$page$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                eyebrow: pendingGroup ? 'Settlements / In flight' : 'Settlements',
                title: "All settlements",
                lede: "Every settlement the coordinator has registered, with proof coverage and recovery state. Statuses map one-to-one onto the on-chain state machine."
            }, void 0, false, {
                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "Live coordinator lookup",
                        note: "Reads HandshakeASC.getHandshake directly on Creditcoin. Requires the canonical bytes32 settlement id from SettlementId.derive."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "ds-filter-bar",
                        onSubmit: submitLookup,
                        style: {
                            borderBottom: '1px solid var(--ds-border)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "ds-field ds-search",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Settlement id"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            position: 'relative',
                                            display: 'block'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 11
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "ds-input",
                                                value: lookupId,
                                                placeholder: "0x…  (32-byte settlement id)",
                                                onChange: (event)=>setLookupId(event.target.value),
                                                spellCheck: false
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                                lineNumber: 121,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "ds-button",
                                "data-size": "sm",
                                disabled: !lookupId.trim(),
                                children: "Look up"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "ds-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionHeading"], {
                        title: "Settlement index",
                        action: payload ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OriginBadge"], {
                            origin: "sample"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                            lineNumber: 139,
                            columnNumber: 29
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    result.data?.notice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 14
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Notice"], {
                            title: "Index is not live",
                            children: result.data.notice
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$filter$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterBar"], {
                        values: filters,
                        onChange: patch,
                        onReset: reset
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    result.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableSkeleton"], {
                        rows: 8
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this) : result.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorState"], {
                        description: "Unable to load settlements.",
                        onRetry: result.reload
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this) : rows.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$settlement$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettlementTable"], {
                                rows: rows
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            payload ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ds-pagination",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCount"])(rows.length),
                                            " of ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCount"])(payload.total),
                                            " settlements",
                                            payload.pageCount > 1 ? ` · page ${payload.page} of ${payload.pageCount}` : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ds-pagination-controls",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "ds-button",
                                                "data-variant": "outline",
                                                "data-size": "sm",
                                                disabled: payload.page <= 1,
                                                onClick: ()=>setPage((value)=>Math.max(1, value - 1)),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                        size: 11
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Prev"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "ds-button",
                                                "data-variant": "outline",
                                                "data-size": "sm",
                                                disabled: payload.page >= payload.pageCount,
                                                onClick: ()=>setPage((value)=>Math.min(payload.pageCount, value + 1)),
                                                children: [
                                                    "Next ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        size: 11
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$states$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                        title: "No settlements match these filters.",
                        description: "Widen the status, route, or date range. Clearing the filters restores the full index.",
                        action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "ds-button",
                            "data-variant": "outline",
                            onClick: reset,
                            children: "Clear filters"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                            lineNumber: 193,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/settlements/settlements-view.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(SettlementsView, "mLwxpiAM4DYeOXk09rLRl8iDl8s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$use$2d$async$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAsync"]
    ];
});
_c = SettlementsView;
var _c;
__turbopack_context__.k.register(_c, "SettlementsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/filter-bar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterBar",
    ()=>FilterBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/types.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const SELECTABLE_STATES = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].filter(_c = (state)=>state !== 'NONE');
_c1 = SELECTABLE_STATES;
const DATE_LABELS = {
    all: 'All time',
    '24h': 'Last 24h',
    '7d': 'Last 7 days',
    '30d': 'Last 30 days'
};
const SORT_LABELS = {
    newest: 'Newest first',
    oldest: 'Oldest first',
    longest: 'Longest duration',
    shortest: 'Shortest duration'
};
function FilterBar({ values, onChange, onReset }) {
    const dirty = values.search !== '' || values.state !== 'ALL' || values.sourceChainKey !== '' || values.destinationChainKey !== '' || values.dateRange !== 'all' || values.sort !== 'newest';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-filter-bar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "ds-field ds-search",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Search"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            position: 'relative',
                            display: 'block'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "ds-input",
                                type: "search",
                                value: values.search,
                                placeholder: "Settlement ref, id, chain, or status",
                                onChange: (event)=>onChange({
                                        search: event.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "ds-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Status"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "ds-select",
                        value: values.state,
                        onChange: (event)=>onChange({
                                state: event.target.value
                            }),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "ALL",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            SELECTABLE_STATES.map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: state,
                                    children: state === 'COMMITTED' ? 'COMMIT' : state
                                }, state, false, {
                                    fileName: "[project]/components/dashboard/filter-bar.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "ds-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Source"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "ds-select",
                        value: values.sourceChainKey,
                        onChange: (event)=>onChange({
                                sourceChainKey: event.target.value
                            }),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Any"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAINS"].map((chain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: chain.key,
                                    children: chain.shortName
                                }, chain.key, false, {
                                    fileName: "[project]/components/dashboard/filter-bar.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "ds-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Destination"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "ds-select",
                        value: values.destinationChainKey,
                        onChange: (event)=>onChange({
                                destinationChainKey: event.target.value
                            }),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Any"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAINS"].map((chain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: chain.key,
                                    children: chain.shortName
                                }, chain.key, false, {
                                    fileName: "[project]/components/dashboard/filter-bar.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "ds-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Created"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "ds-select",
                        value: values.dateRange,
                        onChange: (event)=>onChange({
                                dateRange: event.target.value
                            }),
                        children: Object.entries(DATE_LABELS).map(([value, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: value,
                                children: label
                            }, value, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "ds-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Sort"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "ds-select",
                        value: values.sort,
                        onChange: (event)=>onChange({
                                sort: event.target.value
                            }),
                        children: Object.entries(SORT_LABELS).map(([value, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: value,
                                children: label
                            }, value, false, {
                                fileName: "[project]/components/dashboard/filter-bar.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/filter-bar.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            dirty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "ds-button",
                "data-variant": "outline",
                "data-size": "sm",
                onClick: onReset,
                children: "Reset"
            }, void 0, false, {
                fileName: "[project]/components/dashboard/filter-bar.tsx",
                lineNumber: 149,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/filter-bar.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = FilterBar;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SELECTABLE_STATES$SETTLEMENT_STATES.filter");
__turbopack_context__.k.register(_c1, "SELECTABLE_STATES");
__turbopack_context__.k.register(_c2, "FilterBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/page-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PageHeader({ eyebrow, title, lede, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-page-head",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    eyebrow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ds-eyebrow",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 17,
                        columnNumber: 20
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "ds-page-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/page-header.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    lede ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/primitives.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function OriginBadge({ origin }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-origin",
        "data-origin": origin,
        children: origin === 'chain' ? 'On-chain read' : 'Sample data'
    }, void 0, false, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = OriginBadge;
function SectionHeading({ title, note, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-section-head",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "ds-section-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c1 = SectionHeading;
function Panel({ title, action, children, padded = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ds-panel",
        children: [
            title || action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "ds-panel-head",
                children: [
                    title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "ds-section-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/primitives.tsx",
                        lineNumber: 54,
                        columnNumber: 20
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
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
            padded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c2 = Panel;
function DefinitionGrid({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
        className: "ds-defs",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/primitives.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, this);
}
_c3 = DefinitionGrid;
function Definition({ label, value, muted = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-def",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                className: "ds-def-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/dashboard/primitives.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
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
_c4 = Definition;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "OriginBadge");
__turbopack_context__.k.register(_c1, "SectionHeading");
__turbopack_context__.k.register(_c2, "Panel");
__turbopack_context__.k.register(_c3, "DefinitionGrid");
__turbopack_context__.k.register(_c4, "Definition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/settlement-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouteCell",
    ()=>RouteCell,
    "SettlementTable",
    ()=>SettlementTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/status-badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function RouteCell({ source, destination }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-route",
        children: [
            source.shortName,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                size: 10,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/dashboard/settlement-table.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            destination.shortName
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/settlement-table.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = RouteCell;
function SettlementTable({ rows, timestampFormat = 'absolute' }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    /**
   * Sample rows have no bytes32 id, so they route by display reference. A chain
   * row routes by its real settlement id. The detail page resolves both.
   */ const hrefFor = (row)=>`/dashboard/settlements/${encodeURIComponent(row.settlementId ?? row.reference)}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-table-wrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "ds-table",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Settlement"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-table.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Route"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-table.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-table.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Proofs"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-table.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Created"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-table.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Duration"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/settlement-table.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/settlement-table.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            "data-clickable": "true",
                            tabIndex: 0,
                            role: "link",
                            onClick: ()=>router.push(hrefFor(row)),
                            onKeyDown: (event)=>{
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    router.push(hrefFor(row));
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "ds-cell-strong",
                                    children: row.reference
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RouteCell, {
                                        source: row.sourceChain,
                                        destination: row.destinationChain
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/settlement-table.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                        state: row.state
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/settlement-table.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProofCount"], {
                                        verified: row.proofsVerified,
                                        required: row.proofsRequired,
                                        tone: row.state === 'HELD' ? 'held' : 'settled'
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/settlement-table.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "ds-cell-numeric",
                                    children: timestampFormat === 'relative' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelative"])(row.createdAt) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(row.createdAt)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "ds-cell-numeric",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(row.durationSeconds)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, row.reference, true, {
                            fileName: "[project]/components/dashboard/settlement-table.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/settlement-table.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/settlement-table.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/settlement-table.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(SettlementTable, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = SettlementTable;
var _c, _c1;
__turbopack_context__.k.register(_c, "RouteCell");
__turbopack_context__.k.register(_c1, "SettlementTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/states.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/inbox.mjs [app-client] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.mjs [app-client] (ecmascript) <export default as RotateCw>");
'use client';
;
;
function Skeleton({ width = '100%', height = 10, style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c = Skeleton;
function TableSkeleton({ rows = 6, columns = 6 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-table-wrap",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "ds-table",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: Array.from({
                            length: columns
                        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: Array.from({
                        length: rows
                    }, (_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: Array.from({
                                length: columns
                            }, (_, columnIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
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
_c1 = TableSkeleton;
function PanelSkeleton({ lines = 5, height = 9 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-stack",
        "aria-hidden": "true",
        children: Array.from({
            length: lines
        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
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
_c2 = PanelSkeleton;
function EmptyState({ title, description, action, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-empty",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-empty-mark",
                children: icon ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: title
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c3 = EmptyState;
function ErrorState({ title = 'Unable to load data.', description, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-error",
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-empty-mark",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: title
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: description
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            onRetry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "ds-button",
                "data-variant": "outline",
                onClick: onRetry,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
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
_c4 = ErrorState;
function Notice({ tone = 'sample', title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ds-notice",
        "data-tone": tone === 'sample' ? undefined : tone,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                size: 12
            }, void 0, false, {
                fileName: "[project]/components/dashboard/states.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
_c5 = Notice;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Skeleton");
__turbopack_context__.k.register(_c1, "TableSkeleton");
__turbopack_context__.k.register(_c2, "PanelSkeleton");
__turbopack_context__.k.register(_c3, "EmptyState");
__turbopack_context__.k.register(_c4, "ErrorState");
__turbopack_context__.k.register(_c5, "Notice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/status-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProofCount",
    ()=>ProofCount,
    "StatusBadge",
    ()=>StatusBadge,
    "ToneBadge",
    ()=>ToneBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/format.ts [app-client] (ecmascript)");
;
;
function StatusBadge({ state }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-badge",
        "data-state": state,
        title: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_DESCRIPTIONS"][state],
        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_LABELS"][state]
    }, void 0, false, {
        fileName: "[project]/components/dashboard/status-badge.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
function ToneBadge({ tone, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-badge",
        "data-tone": tone,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/status-badge.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c1 = ToneBadge;
function ProofCount({ verified, required, tone = 'settled' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ds-proof-count",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ds-proof-bar",
                "aria-hidden": "true",
                children: Array.from({
                    length: required
                }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c2 = ProofCount;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "ToneBadge");
__turbopack_context__.k.register(_c2, "ProofCount");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/abi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/chain-reader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/utils/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/abi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/types.ts [app-client] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHexString"])(value, 32);
}
function providerFor(rpcUrl) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl, undefined, {
        staticNetwork: true
    });
}
function nonZeroAddress(value) {
    return value && value !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZeroAddress"] ? value : null;
}
function nonZeroHash(value) {
    return value && value !== ZERO_BYTES32 ? value : null;
}
function toState(ordinal) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"][ordinal] ?? 'NONE';
}
function toLockState(ordinal) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCK_STATES"][ordinal] ?? 'NONE';
}
async function readLock(rpcUrl, address, settlementId) {
    if (!rpcUrl || !address) return null;
    try {
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](address, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCK_READ_ABI"], providerFor(rpcUrl));
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
    const reached = (target)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(state) >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(target);
    const proofs = [
        {
            id: 'attested-leg',
            label: 'Ethereum Sepolia asset lock',
            method: 'prepareAttestedLeg',
            status: attestedCommit ? 'VERIFIED' : 'NOT_SUBMITTED',
            verifiedVia: 'attestcoin',
            sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
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
            sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"],
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
    const index = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf(state);
    const events = [];
    const push = (name, target, timestamp)=>{
        events.push({
            id: `${name}-${timestamp ?? 'unknown'}`,
            name,
            state: target,
            timestamp,
            blockNumber: null,
            transactionHash: null,
            description: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COORDINATOR_EVENT_DESCRIPTIONS"][name] ?? ''
        });
    };
    if (index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf('PREPARE')) {
        push('Prepared', 'PREPARE', prepareTime > 0 ? prepareTime : null);
        if (bothPrepared) push('CounterpartyPrepared', 'PREPARE', null);
    }
    if (index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf('READY') && state !== 'HELD') {
        push('Ready', 'READY', readyTime > 0 ? readyTime : null);
    }
    if (index >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLEMENT_STATES"].indexOf('COMMITTED') && state !== 'HELD') {
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
async function readSettlementFromChain(settlementId, config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readPublicChainConfig"])()) {
    if (!isSettlementId(settlementId)) {
        throw new TypeError('A settlement id must be a 32-byte hex value.');
    }
    if (!config.creditcoinRpcUrl || !config.coordinatorAddress) {
        throw new ChainReadUnavailableError('Live coordinator reads need NEXT_PUBLIC_CREDITCOIN_RPC_URL and NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS.');
    }
    const provider = providerFor(config.creditcoinRpcUrl);
    const coordinator = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](config.coordinatorAddress, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COORDINATOR_READ_ABI"], provider);
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
    const timeoutSeconds = await coordinator.TIMEOUT().then((value)=>Number(value)).catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COORDINATOR_TIMEOUT_SECONDS"]);
    const settlement = {
        reference: `${settlementId.slice(0, 10)}…${settlementId.slice(-6)}`,
        settlementId,
        state,
        origin: 'chain',
        attestedLeg: {
            kind: 'attested',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
            party: attestedParty,
            prepared: attestedPrepared,
            commitment: attestedCommit,
            lock: attestedLock
        },
        nativeLeg: {
            kind: 'native',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"],
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
            ...buildTransactions(attestedLock, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key),
            ...buildTransactions(nativeLock, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"].key)
        ],
        events: buildEvents(state, prepareTime, readyTime, attestedPrepared && nativePrepared),
        heldReason: state === 'HELD' ? heldExplanation(attestedCommit, nativeCommit, manifest) : null
    };
    return {
        settlement,
        blockNumber
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/chains.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
const CHAINS_BY_KEY = Object.fromEntries(_c1 = CHAINS.map(_c = (chain)=>[
        chain.key,
        chain
    ]));
_c2 = CHAINS_BY_KEY;
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
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "CHAINS_BY_KEY$Object.fromEntries$CHAINS.map");
__turbopack_context__.k.register(_c1, "CHAINS_BY_KEY$Object.fromEntries");
__turbopack_context__.k.register(_c2, "CHAINS_BY_KEY");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/format.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/sample/sample-source.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-client] (ecmascript)");
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
        const sourceChain = eastbound ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"];
        const destinationChain = eastbound ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"];
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
    const attestedIsSource = record.sourceChain.key === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key;
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
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
            party: null,
            prepared: bothPrepared || record.proofsVerified === 1 && attestedIsSource,
            commitment: null,
            lock: null
        },
        nativeLeg: {
            kind: 'native',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"],
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
                sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"],
                note: 'Sample record. Proof commitments are not available from this source.'
            }),
            sampleProof({
                id: 'native-leg',
                label: 'Creditcoin payment lock',
                method: 'prepareNativeLeg',
                status: record.proofsVerified >= 2 ? 'VERIFIED' : 'NOT_SUBMITTED',
                verifiedVia: 'native-state',
                sourceChain: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDITCOIN"],
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
                detail: record.sourceChain.key === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHEREUM_SEPOLIA"].key ? 'Ethereum Sepolia asset lock' : 'Creditcoin payment lock',
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/services.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chain-reader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/chains.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/handshake/sample/sample-source.ts [app-client] (ecmascript)");
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
        notice: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAMPLE_SOURCE_NOTICE"]
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canReadChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readPublicChainConfig"])());
    }
    async list(query = {}) {
        const page = Math.max(1, query.page ?? 1);
        const pageSize = Math.max(1, query.pageSize ?? 15);
        const filtered = sortRows(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAMPLE_SETTLEMENTS"].filter((row)=>matchesQuery(row, query)), query.sort);
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
        return delay(sampled(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAMPLE_SETTLEMENTS"].slice(0, limit)));
    }
    async getBySettlementId(settlementId) {
        const { settlement } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$chain$2d$reader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readSettlementFromChain"])(settlementId);
        return {
            data: settlement,
            origin: 'chain'
        };
    }
    async getByReference(reference) {
        const settlement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandSampleSettlement"])(reference);
        if (!settlement) return null;
        return delay(sampled(settlement));
    }
}
class DefaultMetricsService {
    async snapshot() {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sampleMetrics"])()));
    }
    async activitySeries(window) {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sampleActivitySeries"])(window)));
    }
    async routes() {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sampleRouteBreakdown"])()));
    }
    async feed(limit = 12) {
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sampleActivityFeed"])(limit)));
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
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sampleApiKeys"])()));
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
        return delay(sampled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$handshake$2f$sample$2f$sample$2d$source$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sampleWebhooks"])()));
    }
}
const settlementService = new DefaultSettlementService();
const metricsService = new DefaultMetricsService();
const apiKeyService = new DefaultApiKeyService();
const webhookService = new DefaultWebhookService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/handshake/use-async.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAsync",
    ()=>useAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useAsync(loader, deps) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [nonce, setNonce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // The loader identity is intentionally keyed on the caller's deps rather than
    // the function itself, so inline closures do not cause refetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(loader, deps);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAsync.useEffect": ()=>{
            let active = true;
            setLoading(true);
            setError(null);
            run().then({
                "useAsync.useEffect": (result)=>{
                    if (!active) return;
                    setData(result);
                    setLoading(false);
                }
            }["useAsync.useEffect"]).catch({
                "useAsync.useEffect": (cause)=>{
                    if (!active) return;
                    setError(cause instanceof Error ? cause : new Error(String(cause)));
                    setLoading(false);
                }
            }["useAsync.useEffect"]);
            return ({
                "useAsync.useEffect": ()=>{
                    active = false;
                }
            })["useAsync.useEffect"];
        }
    }["useAsync.useEffect"], [
        run,
        nonce
    ]);
    const reload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAsync.useCallback[reload]": ()=>setNonce({
                "useAsync.useCallback[reload]": (value)=>value + 1
            }["useAsync.useCallback[reload]"])
    }["useAsync.useCallback[reload]"], []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useAsync.useMemo": ()=>({
                data,
                error,
                loading,
                reload
            })
    }["useAsync.useMemo"], [
        data,
        error,
        loading,
        reload
    ]);
}
_s(useAsync, "Y7//pPhPmebI9JH42HSGBMeyQX4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1hs13ls._.js.map