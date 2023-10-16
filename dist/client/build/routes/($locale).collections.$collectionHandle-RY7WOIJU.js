import {
  getImageLoadingPriority
} from "/build/_shared/chunk-YJ4LR4QJ.js";
import {
  PRODUCT_CARD_FRAGMENT
} from "/build/_shared/chunk-Y2Q63SEX.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Button,
  Grid,
  PageHeader,
  ProductCard,
  Section,
  SortFilter,
  Text
} from "/build/_shared/chunk-EZI2R5O2.js";
import {
  vt
} from "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-4BGUX6VE.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  useLoaderData
} from "/build/_shared/chunk-M7ZELIPT.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UHAUI7PR.js";
import "/build/_shared/chunk-BVWHYGSQ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QLMTPHJM.js";
import "/build/_shared/chunk-LSHG36UU.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).collections.$collectionHandle.jsx
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).collections.$collectionHandle.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).collections.$collectionHandle.jsx"
  );
  import.meta.hot.lastModified = "1697115204060.6638";
}
function Collection() {
  _s();
  const {
    collection,
    collections,
    appliedFilters
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: collection.title, children: collection?.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline justify-between w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { format: true, width: "narrow", as: "p", className: "inline-block", children: collection.description }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 172,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 171,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 170,
      columnNumber: 37
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 169,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SortFilter, { filters: collection.products.filters, appliedFilters, collections, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(vt, { connection: collection.products, children: ({
      nodes,
      isLoading,
      PreviousLink,
      NextLink
    }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { as: PreviousLink, variant: "secondary", width: "full", children: isLoading ? "Loading..." : "Load previous" }, void 0, false, {
        fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
        lineNumber: 188,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
        lineNumber: 187,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { layout: "products", children: nodes.map((product, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product, loading: getImageLoadingPriority(i) }, product.id, false, {
        fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
        lineNumber: 193,
        columnNumber: 46
      }, this)) }, void 0, false, {
        fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
        lineNumber: 192,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { as: NextLink, variant: "secondary", width: "full", children: isLoading ? "Loading..." : "Load more products" }, void 0, false, {
        fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
        lineNumber: 196,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
        lineNumber: 195,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 186,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 180,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 179,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).collections.$collectionHandle.jsx",
    lineNumber: 168,
    columnNumber: 10
  }, this);
}
_s(Collection, "6UP0h0wb8XlcyDXP/DCzW2JtDuk=", false, function() {
  return [useLoaderData];
});
_c = Collection;
var COLLECTION_QUERY = `#graphql
  query 
  
  CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
var _c;
$RefreshReg$(_c, "Collection");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Collection as default
};
//# sourceMappingURL=/build/routes/($locale).collections.$collectionHandle-RY7WOIJU.js.map
