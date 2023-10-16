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
var import_react = __toESM(require_react());
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
  import.meta.hot.lastModified = "1697462869717.4326";
}
var storedDataString;
function AddCartFunc() {
  _s();
  const [cartData, setCartData] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    storedDataString = localStorage.getItem("mydata");
    console.log(storedDataString);
    setCartData(JSON.parse(storedDataString));
  }, []);
  console.log(cartData[0]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full h-full gap-2 mt-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center font-bold text-4xl", children: "SHOPPING CART" }, void 0, false, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 47,
      columnNumber: 13
    }, this),
    cartData && cartData.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[800px]  bg-[white] m-auto mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: item.productImg, alt: "" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 53,
          columnNumber: 37
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 52,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[30%]", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: item.productTitle }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 57,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 57,
            columnNumber: 69
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 57,
            columnNumber: 75
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
            " Sender: ",
            item.senderAddress.address1,
            ",",
            item.senderAddress.city,
            ",",
            item.senderAddress.state,
            ",",
            item.senderAddress.country
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 58,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 56,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 51,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 50,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
          " Price:",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.price }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 66,
            columnNumber: 50
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 66,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
          " Quantity:",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.price }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 67,
            columnNumber: 53
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 67,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 65,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 64,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 63,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "www" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 71,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 49,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 48,
      columnNumber: 47
    }, this))
  ] }, void 0, true, {
    fileName: "app/routes/($locale).carts.jsx",
    lineNumber: 46,
    columnNumber: 10
  }, this);
}
_s(AddCartFunc, "Cs5f4zzzHmUYE8M7LcTA8IzbtDY=");
_c = AddCartFunc;
var _c;
$RefreshReg$(_c, "AddCartFunc");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AddCartFunc as default
};
//# sourceMappingURL=/build/routes/($locale).carts-CJRP2LIC.js.map
