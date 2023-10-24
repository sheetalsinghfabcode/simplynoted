import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Cart
} from "/build/_shared/chunk-DVYBD3JV.js";
import "/build/_shared/chunk-UWQ2IBCJ.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-2YGEN3B2.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VFPJDGJ3.js";
import {
  Await,
  useMatches
} from "/build/_shared/chunk-GLSAWP4P.js";
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
  import.meta.hot.lastModified = "1696849699247.437";
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
//# sourceMappingURL=/build/routes/($locale).cart-DHQN7G2X.js.map
