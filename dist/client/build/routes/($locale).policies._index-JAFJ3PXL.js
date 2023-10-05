import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Heading,
  Link,
  PageHeader,
  Section
} from "/build/_shared/chunk-LUNXKCFQ.js";
import "/build/_shared/chunk-AF6SR4PD.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-US7OM5MU.js";
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

// app/routes/($locale).policies._index.jsx
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).policies._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).policies._index.jsx"
  );
  import.meta.hot.lastModified = "1696490276892.604";
}
function Policies() {
  _s();
  const {
    policies
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: "Policies" }, void 0, false, {
      fileName: "app/routes/($locale).policies._index.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { padding: "x", className: "mb-24", children: policies.map((policy) => {
      return policy && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { className: "font-normal text-heading", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/policies/${policy.handle}`, children: policy.title }, void 0, false, {
        fileName: "app/routes/($locale).policies._index.jsx",
        lineNumber: 62,
        columnNumber: 17
      }, this) }, policy.id, false, {
        fileName: "app/routes/($locale).policies._index.jsx",
        lineNumber: 61,
        columnNumber: 26
      }, this);
    }) }, void 0, false, {
      fileName: "app/routes/($locale).policies._index.jsx",
      lineNumber: 59,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).policies._index.jsx",
    lineNumber: 57,
    columnNumber: 10
  }, this);
}
_s(Policies, "qILlRnlKUbKnmDp/2bx3pTxZVH4=", false, function() {
  return [useLoaderData];
});
_c = Policies;
var _c;
$RefreshReg$(_c, "Policies");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Policies as default
};
//# sourceMappingURL=/build/routes/($locale).policies._index-JAFJ3PXL.js.map
