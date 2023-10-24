import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Button,
  PageHeader,
  Section
} from "/build/_shared/chunk-KYD7K3HF.js";
import "/build/_shared/chunk-OBKVR3FN.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-2ZGOGLLT.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VFPJDGJ3.js";
import {
  useLoaderData
} from "/build/_shared/chunk-M2E26CAP.js";
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

// app/routes/($locale).policies.$policyHandle.jsx
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).policies.$policyHandle.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).policies.$policyHandle.jsx"
  );
  import.meta.hot.lastModified = "1696849699250.429";
}
function Policies() {
  _s();
  const {
    policy
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { padding: "all", display: "flex", className: "flex-col items-baseline w-full gap-8 md:flex-row", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: policy.title, className: "grid items-start flex-grow gap-4 md:sticky top-36 md:w-5/12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "justify-self-start", variant: "inline", to: "/policies", children: "\u2190 Back to Policies" }, void 0, false, {
      fileName: "app/routes/($locale).policies.$policyHandle.jsx",
      lineNumber: 70,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).policies.$policyHandle.jsx",
      lineNumber: 69,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-grow w-full md:w-7/12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { dangerouslySetInnerHTML: {
      __html: policy.body
    }, className: "prose dark:prose-invert" }, void 0, false, {
      fileName: "app/routes/($locale).policies.$policyHandle.jsx",
      lineNumber: 75,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).policies.$policyHandle.jsx",
      lineNumber: 74,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).policies.$policyHandle.jsx",
    lineNumber: 68,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).policies.$policyHandle.jsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
}
_s(Policies, "cBk4z3QJRcmP45uz+9oi7Or3TOc=", false, function() {
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
//# sourceMappingURL=/build/routes/($locale).policies.$policyHandle-YLR6Z6JN.js.map
