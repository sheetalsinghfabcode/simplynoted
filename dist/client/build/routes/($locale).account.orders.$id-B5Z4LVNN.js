import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Heading,
  Link,
  PageHeader,
  Text,
  clsx_m_default
} from "/build/_shared/chunk-GOQTW4BK.js";
import {
  Image,
  Money
} from "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import {
  statusMessage
} from "/build/_shared/chunk-4BGUX6VE.js";
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

// app/routes/($locale).account.orders.$id.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.orders.$id.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.orders.$id.jsx"
  );
  import.meta.hot.lastModified = "1696490276882.7463";
}
var meta = ({
  data
}) => {
  return [{
    title: `Order ${data?.order?.name}`
  }];
};
function OrderRoute() {
  _s();
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: "Order detail", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/account", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { color: "subtle", children: "Return to Account Overview" }, void 0, false, {
      fileName: "app/routes/($locale).account.orders.$id.jsx",
      lineNumber: 87,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.orders.$id.jsx",
      lineNumber: 86,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.orders.$id.jsx",
      lineNumber: 85,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full p-6 sm:grid-cols-1 md:p-8 lg:p-12 lg:py-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", size: "lead", children: [
        "Order No. ",
        order.name
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.orders.$id.jsx",
        lineNumber: 92,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "mt-2", as: "p", children: [
        "Placed on ",
        new Date(order.processedAt).toDateString()
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.orders.$id.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid items-start gap-12 sm:grid-cols-1 md:grid-cols-4 md:gap-16 sm:divide-y sm:divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full my-8 divide-y divide-gray-300 md:col-span-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "align-baseline ", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "pb-4 pl-0 pr-3 font-semibold text-left", children: "Product" }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 102,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell", children: "Price" }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 105,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell", children: "Quantity" }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 108,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-4 pb-4 font-semibold text-right", children: "Total" }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 111,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 101,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 100,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: lineItems.map((lineItem) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "w-full py-4 pl-0 pr-3 align-top sm:align-middle max-w-0 sm:w-auto sm:max-w-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/products/${lineItem.variant.product.handle}`, children: lineItem?.variant?.image && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-24 card-image aspect-square", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { data: lineItem.variant.image, width: 96, height: 96 }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 122,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 121,
                columnNumber: 56
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 120,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-col justify-center hidden lg:flex", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "p", children: lineItem.title }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 126,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", className: "mt-1", as: "p", children: lineItem.variant.title }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 127,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 125,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { className: "grid", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "sr-only", children: "Product" }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 132,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "truncate lg:hidden", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { size: "copy", format: true, as: "h3", children: lineItem.title }, void 0, false, {
                    fileName: "app/routes/($locale).account.orders.$id.jsx",
                    lineNumber: 134,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", className: "mt-1", children: lineItem.variant.title }, void 0, false, {
                    fileName: "app/routes/($locale).account.orders.$id.jsx",
                    lineNumber: 137,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 133,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "sr-only", children: "Price" }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 141,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "truncate sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: lineItem.variant.price }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 144,
                  columnNumber: 31
                }, this) }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 143,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 142,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "sr-only", children: "Quantity" }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 147,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "truncate sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "mt-1", size: "fine", children: [
                  "Qty: ",
                  lineItem.quantity
                ] }, void 0, true, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 149,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "app/routes/($locale).account.orders.$id.jsx",
                  lineNumber: 148,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 131,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 119,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: lineItem.variant.price }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 157,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 156,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell", children: lineItem.quantity }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 159,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-4 text-right align-top sm:align-middle sm:table-cell", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: lineItem.discountedTotalPrice }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 164,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 163,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 162,
              columnNumber: 21
            }, this)
          ] }, lineItem.variant.id, true, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 117,
            columnNumber: 44
          }, this)) }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 116,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tfoot", { children: [
            (discountValue && discountValue.amount || discountPercentage) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", colSpan: 3, className: "hidden pt-6 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Discounts" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 172,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 171,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", className: "pt-6 pr-3 font-normal text-left sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Discounts" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 175,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 174,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "pt-6 pl-3 pr-4 font-medium text-right text-green-700 md:pr-3", children: discountPercentage ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: [
                "-",
                discountPercentage,
                "% OFF"
              ] }, void 0, true, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 178,
                columnNumber: 45
              }, this) : discountValue && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: discountValue }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 180,
                columnNumber: 52
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 177,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 170,
              columnNumber: 83
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", colSpan: 3, className: "hidden pt-6 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Subtotal" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 185,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 184,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", className: "pt-6 pr-3 font-normal text-left sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Subtotal" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 188,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 187,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "pt-6 pl-3 pr-4 text-right md:pr-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: order.subtotalPriceV2 }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 191,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 190,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 183,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", colSpan: 3, className: "hidden pt-4 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0", children: "Tax" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 195,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", className: "pt-4 pr-3 font-normal text-left sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Tax" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 199,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 198,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "pt-4 pl-3 pr-4 text-right md:pr-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: order.totalTaxV2 }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 202,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 201,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 194,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", colSpan: 3, className: "hidden pt-4 pl-6 pr-3 font-semibold text-right sm:table-cell md:pl-0", children: "Total" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 206,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "row", className: "pt-4 pr-3 font-semibold text-left sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Total" }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 210,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 209,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "pt-4 pl-3 pr-4 font-semibold text-right md:pr-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { data: order.totalPriceV2 }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 213,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).account.orders.$id.jsx",
                lineNumber: 212,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 205,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 169,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.orders.$id.jsx",
          lineNumber: 99,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "sticky border-none top-nav md:my-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { size: "copy", className: "font-semibold", as: "h3", children: "Shipping Address" }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 219,
            columnNumber: 15
          }, this),
          order?.shippingAddress ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "mt-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
              order.shippingAddress.firstName && order.shippingAddress.firstName + " ",
              order.shippingAddress.lastName
            ] }, void 0, true, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 224,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 223,
              columnNumber: 19
            }, this),
            order?.shippingAddress?.formatted ? order.shippingAddress.formatted.map((line) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: line }, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 230,
              columnNumber: 25
            }, this) }, line, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 229,
              columnNumber: 100
            }, this)) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, {}, void 0, false, {
              fileName: "app/routes/($locale).account.orders.$id.jsx",
              lineNumber: 231,
              columnNumber: 32
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 222,
            columnNumber: 41
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-3", children: "No shipping address defined" }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 232,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { size: "copy", className: "mt-8 font-semibold", as: "h3", children: "Status" }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 233,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: clsx_m_default(`mt-3 px-3 py-1 text-xs font-medium rounded-full inline-block w-auto`, order.fulfillmentStatus === "FULFILLED" ? "bg-green-100 text-green-800" : "bg-primary/20 text-primary/50"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", children: statusMessage(order.fulfillmentStatus) }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 237,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).account.orders.$id.jsx",
            lineNumber: 236,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.orders.$id.jsx",
          lineNumber: 218,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.orders.$id.jsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.orders.$id.jsx",
      lineNumber: 91,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.orders.$id.jsx",
      lineNumber: 90,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.orders.$id.jsx",
    lineNumber: 84,
    columnNumber: 10
  }, this);
}
_s(OrderRoute, "VWNsq0d8NkbTP5ronHng6o3+YvQ=", false, function() {
  return [useLoaderData];
});
_c = OrderRoute;
var _c;
$RefreshReg$(_c, "OrderRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  OrderRoute as default,
  meta
};
//# sourceMappingURL=/build/routes/($locale).account.orders.$id-B5Z4LVNN.js.map
