import {
  getImageLoadingPriority
} from "/build/_shared/chunk-4MYYP63X.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import {
  Button,
  Grid,
  Heading,
  Link,
  PageHeader,
  Section
} from "/build/_shared/chunk-Z5LFC6FH.js";
import {
  Image,
  vt
} from "/build/_shared/chunk-ZGUXAR4N.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-OMGXAGHL.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VFPJDGJ3.js";
import {
  useLoaderData
} from "/build/_shared/chunk-7LX4FZKM.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UHAUI7PR.js";
import "/build/_shared/chunk-BVWHYGSQ.js";
import {
  createHotContext
} from "/build/_shared/chunk-M5RZR2GW.js";
import "/build/_shared/chunk-LSHG36UU.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).collections._index.jsx
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).collections._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).collections._index.jsx"
  );
  import.meta.hot.lastModified = "1696849699248.4343";
}
function Collections() {
  _s();
  const {
    collections
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: "Collections" }, void 0, false, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(vt, { connection: collections, children: ({
      nodes,
      isLoading,
      PreviousLink,
      NextLink
    }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { as: PreviousLink, variant: "secondary", width: "full", children: isLoading ? "Loading..." : "Previous collections" }, void 0, false, {
        fileName: "app/routes/($locale).collections._index.jsx",
        lineNumber: 74,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).collections._index.jsx",
        lineNumber: 73,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { items: nodes.length === 3 ? 3 : 2, "data-test": "collection-grid", children: nodes.map((collection, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CollectionCard, { collection, loading: getImageLoadingPriority(i, 2) }, collection.id, false, {
        fileName: "app/routes/($locale).collections._index.jsx",
        lineNumber: 79,
        columnNumber: 47
      }, this)) }, void 0, false, {
        fileName: "app/routes/($locale).collections._index.jsx",
        lineNumber: 78,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { as: NextLink, variant: "secondary", width: "full", children: isLoading ? "Loading..." : "Next collections" }, void 0, false, {
        fileName: "app/routes/($locale).collections._index.jsx",
        lineNumber: 82,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).collections._index.jsx",
        lineNumber: 81,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 72,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).collections._index.jsx",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}
_s(Collections, "6brbiW8AhZwVjyj0UPHG6QMQMU4=", false, function() {
  return [useLoaderData];
});
_c = Collections;
function CollectionCard({
  collection,
  loading
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/collections/${collection.handle}`, className: "grid gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-image bg-primary/5 aspect-[3/2]", children: collection?.image && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { data: collection.image, aspectRatio: "6/4", sizes: "(max-width: 32em) 100vw, 45vw", loading }, void 0, false, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 101,
      columnNumber: 31
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "h3", size: "copy", children: collection.title }, void 0, false, {
      fileName: "app/routes/($locale).collections._index.jsx",
      lineNumber: 103,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).collections._index.jsx",
    lineNumber: 99,
    columnNumber: 10
  }, this);
}
_c2 = CollectionCard;
var _c;
var _c2;
$RefreshReg$(_c, "Collections");
$RefreshReg$(_c2, "CollectionCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Collections as default
};
//# sourceMappingURL=/build/routes/($locale).collections._index-CQKGGEZB.js.map
