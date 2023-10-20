import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Cart
} from "/build/_shared/chunk-OZ53DUYH.js";
import "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-4BGUX6VE.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Await,
  useMatches
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

// app/routes/($locale).cart.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).cart.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).cart.jsx"
  );
  import.meta.hot.lastModified = "1696490276887.9136";
}
function CartRoute() {
  _s();
  const [root] = useMatches();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { resolve: root.data?.cart, children: (cart) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cart, { layout: "page", cart }, void 0, false, {
    fileName: "app/routes/($locale).cart.jsx",
    lineNumber: 113,
    columnNumber: 18
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).cart.jsx",
    lineNumber: 112,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).cart.jsx",
    lineNumber: 111,
    columnNumber: 10
  }, this);
}
_s(CartRoute, "qWoibZqbzlhGDRlxEMM9P1NS8i8=", false, function() {
  return [useMatches];
});
_c = CartRoute;
var _c;
$RefreshReg$(_c, "CartRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CartRoute as default
};
//# sourceMappingURL=/build/routes/($locale).cart-R7M5R536.js.map
