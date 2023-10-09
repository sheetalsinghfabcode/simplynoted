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
  Grid,
  PageHeader,
  ProductCard,
  Section
} from "/build/_shared/chunk-JEJQEZUJ.js";
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

// app/routes/($locale).products._index.jsx
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).products._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).products._index.jsx"
  );
  import.meta.hot.lastModified = "1696490276892.604";
}
function AllProducts() {
  _s();
  const {
    products
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: "All Products", variant: "allCollections" }, void 0, false, {
      fileName: "app/routes/($locale).products._index.jsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(vt, { connection: products, children: ({
      nodes,
      isLoading,
      NextLink,
      PreviousLink
    }) => {
      const itemsMarkup = nodes.map((product, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product, loading: getImageLoadingPriority(i) }, product.id, false, {
        fileName: "app/routes/($locale).products._index.jsx",
        lineNumber: 87,
        columnNumber: 57
      }, this));
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PreviousLink, { className: "inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full", children: isLoading ? "Loading..." : "Previous" }, void 0, false, {
          fileName: "app/routes/($locale).products._index.jsx",
          lineNumber: 90,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products._index.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { "data-test": "product-grid", children: itemsMarkup }, void 0, false, {
          fileName: "app/routes/($locale).products._index.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NextLink, { className: "inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full", children: isLoading ? "Loading..." : "Next" }, void 0, false, {
          fileName: "app/routes/($locale).products._index.jsx",
          lineNumber: 96,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products._index.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products._index.jsx",
        lineNumber: 88,
        columnNumber: 18
      }, this);
    } }, void 0, false, {
      fileName: "app/routes/($locale).products._index.jsx",
      lineNumber: 80,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products._index.jsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products._index.jsx",
    lineNumber: 77,
    columnNumber: 10
  }, this);
}
_s(AllProducts, "NBH4S2xltgMZ0FE8uVN1Jwr5VLs=", false, function() {
  return [useLoaderData];
});
_c = AllProducts;
var ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
var _c;
$RefreshReg$(_c, "AllProducts");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AllProducts as default
};
//# sourceMappingURL=/build/routes/($locale).products._index-62N4LQOV.js.map
