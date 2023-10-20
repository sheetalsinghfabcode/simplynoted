import {
  getImageLoadingPriority
} from "/build/_shared/chunk-YJ4LR4QJ.js";
import {
  PRODUCT_CARD_FRAGMENT
} from "/build/_shared/chunk-JTBFBDB3.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import {
  FeaturedCollections,
  Grid,
  Heading,
  Input,
  PageHeader,
  ProductCard,
  ProductSwimlane,
  Section,
  Text
} from "/build/_shared/chunk-OZ53DUYH.js";
import {
  vt
} from "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-4BGUX6VE.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Await,
  Form,
  useLoaderData
} from "/build/_shared/chunk-M7ZELIPT.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UHAUI7PR.js";
import {
  require_react
} from "/build/_shared/chunk-BVWHYGSQ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QLMTPHJM.js";
import "/build/_shared/chunk-LSHG36UU.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).search.jsx
var import_react2 = __toESM(require_react());
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).search.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).search.jsx"
  );
  import.meta.hot.lastModified = "1696490276892.604";
}
function Search() {
  _s();
  const {
    searchTerm,
    products,
    noResultRecommendations
  } = useLoaderData();
  const noResults = products?.nodes?.length === 0;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "h1", size: "copy", children: "Search" }, void 0, false, {
        fileName: "app/routes/($locale).search.jsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "get", className: "relative flex w-full text-heading", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { defaultValue: searchTerm, name: "q", placeholder: "Search\u2026", type: "search", variant: "search" }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "absolute right-0 py-2", type: "submit", children: "Go" }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).search.jsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 86,
      columnNumber: 7
    }, this),
    !searchTerm || noResults ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NoResults, { noResults, recommendations: noResultRecommendations }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 97,
      columnNumber: 35
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(vt, { connection: products, children: ({
      nodes,
      isLoading,
      NextLink,
      PreviousLink
    }) => {
      const itemsMarkup = nodes.map((product, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product, loading: getImageLoadingPriority(i) }, product.id, false, {
        fileName: "app/routes/($locale).search.jsx",
        lineNumber: 105,
        columnNumber: 57
      }, this));
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PreviousLink, { className: "inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full", children: isLoading ? "Loading..." : "Previous" }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 108,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 107,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { "data-test": "product-grid", children: itemsMarkup }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 112,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NextLink, { className: "inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full", children: isLoading ? "Loading..." : "Next" }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 114,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 113,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).search.jsx",
        lineNumber: 106,
        columnNumber: 18
      }, this);
    } }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 98,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 97,
      columnNumber: 115
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).search.jsx",
    lineNumber: 85,
    columnNumber: 10
  }, this);
}
_s(Search, "FVtPDI3TTUuNt0oi42A2sqkWXlU=", false, function() {
  return [useLoaderData];
});
_c = Search;
function NoResults({
  noResults,
  recommendations
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    noResults && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { padding: "x", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "opacity-50", children: "No results, try a different search." }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 134,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 133,
      columnNumber: 21
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Suspense, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { errorElement: "There was a problem loading related products", resolve: recommendations, children: (result) => {
      if (!result)
        return null;
      const {
        featuredCollections,
        featuredProducts
      } = result;
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeaturedCollections, { title: "Trending Collections", collections: featuredCollections }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 147,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductSwimlane, { title: "Trending Products", products: featuredProducts }, void 0, false, {
          fileName: "app/routes/($locale).search.jsx",
          lineNumber: 148,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).search.jsx",
        lineNumber: 146,
        columnNumber: 18
      }, this);
    } }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 139,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).search.jsx",
      lineNumber: 138,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).search.jsx",
    lineNumber: 132,
    columnNumber: 10
  }, this);
}
_c2 = NoResults;
var SEARCH_QUERY = `#graphql
  query PaginatedProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: RELEVANCE,
      query: $searchTerm
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }

  ${PRODUCT_CARD_FRAGMENT}
`;
var _c;
var _c2;
$RefreshReg$(_c, "Search");
$RefreshReg$(_c2, "NoResults");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Search as default
};
//# sourceMappingURL=/build/routes/($locale).search-REFYVRVF.js.map
