import {
  useLocation
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

// app/routes/($locale).carts.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).carts.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).carts.jsx"
  );
  import.meta.hot.lastModified = "1697459867193.299";
}
function AddCartFunc() {
  _s();
  const {
    state
  } = useLocation();
  const [cartData, setCartData] = (0, import_react2.useState)([]);
  const storedDataString = localStorage.getItem("mydata");
  if (storedDataString) {
    const storedDataArray = JSON.parse(storedDataString);
    setCartData(storedDataArray);
    console.log(cartData, "cartData");
  }
  console.log(cartData, "cartdta----");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full h-full gap-2 mt-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center font-bold text-4xl", children: "SHOPPING CART" }, void 0, false, {
    fileName: "app/routes/($locale).carts.jsx",
    lineNumber: 46,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).carts.jsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_s(AddCartFunc, "70XwwqwTleaF9tobTcUCX+hIqbo=", false, function() {
  return [useLocation];
});
_c = AddCartFunc;
var _c;
$RefreshReg$(_c, "AddCartFunc");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AddCartFunc as default
};
//# sourceMappingURL=/build/routes/($locale).carts-E7KT4ULT.js.map
