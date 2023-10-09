import {
  MEDIA_FRAGMENT,
  PRODUCT_CARD_FRAGMENT
} from "/build/_shared/chunk-Y2Q63SEX.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Heading,
  IconClose,
  Link,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  clsx_m_default,
  ve
} from "/build/_shared/chunk-WSJ5T3Z5.js";
import "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-US7OM5MU.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Await,
  useLoaderData
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

// app/routes/($locale).products.$productHandle.jsx
var import_react3 = __toESM(require_react());
var import_seo = __toESM(require_seo());
var import_react6 = __toESM(require_react());

// node_modules/react-icons/lib/esm/iconBase.js
var import_react2 = __toESM(require_react());

// node_modules/react-icons/lib/esm/iconContext.js
var import_react = __toESM(require_react());
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = import_react.default.createContext && import_react.default.createContext(DefaultContext);

// node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return import_react2.default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return import_react2.default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return import_react2.default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && import_react2.default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? import_react2.default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// node_modules/react-icons/bi/index.esm.js
function BiSolidChevronLeft(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z" } }] })(props);
}

// app/routes/($locale).products.$productHandle.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).products.$productHandle.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).products.$productHandle.jsx"
  );
  import.meta.hot.lastModified = "1696589297281.1726";
}
var input;
var input2;
var output;
var output2;
var outputContainer;
var outputContainer2;
var customerid;
function Product() {
  _s();
  const {
    product,
    shop,
    recommended,
    variants
  } = useLoaderData();
  console.log(variants, "!1!!!!!!variants");
  console.log(product.variants.nodes[0].price, "productData-------------");
  const {
    media,
    title,
    vendor,
    descriptionHtml
  } = product;
  const {
    shippingPolicy,
    refundPolicy
  } = shop;
  const [name, setName] = (0, import_react6.useState)("Enter Your Text Here....");
  const [name2, setName2] = (0, import_react6.useState)("");
  const [show, setShow] = (0, import_react6.useState)(false);
  const [startDate, setStartDate] = (0, import_react6.useState)(/* @__PURE__ */ new Date());
  const [productshow, setProductShow] = (0, import_react6.useState)(true);
  input2 = document.querySelector(".inputText2");
  console.log(input, "PPPPPPPPPPPPPPPPPP");
  output2 = document.querySelector(".output2");
  outputContainer2 = document.querySelector(".secDiv");
  if (input) {
    input.addEventListener("input", processInput);
  }
  function resize_to_fit() {
    let fontSize = window.getComputedStyle(output).fontSize;
    output.style.fontSize = parseFloat(fontSize) - 1 + "px";
    console.log(output.clientHeight, "------------", outputContainer.clientHeight);
    if (output.clientHeight >= outputContainer.clientHeight) {
      resize_to_fit();
    }
  }
  async function processInput() {
    console.log(input.value, "PPPPPPPPPPPPPPPPPPPPPPPPPPP", this.value);
    output.innerHTML = await this.value;
    output.style.fontSize = "60px";
    resize_to_fit();
  }
  function resize_to_fit2() {
    let fontSize = window.getComputedStyle(output2).fontSize;
    output2.style.fontSize = parseFloat(fontSize) - 1 + "px";
    console.log(output2.clientHeight, "------------", outputContainer2.clientHeight);
    if (output2.clientHeight >= outputContainer2.clientHeight) {
      resize_to_fit2();
    }
  }
  async function processInput2() {
    output2.innerHTML = await this.value;
    output2.style.fontSize = "60px";
    resize_to_fit2();
  }
  if (input2) {
    input2.addEventListener("input", processInput2);
  }
  function setFont() {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
    var selectFont = document.getElementById("font");
    if (selectFont) {
      var selectFontValue = selectFont.options[selectFont.selectedIndex].value;
      console.log(selectFontValue, "==========");
      if (selectFontValue) {
        document.getElementById("abcd").style.fontFamily = selectFontValue;
        document.getElementById("abcd2").style.fontFamily = selectFontValue;
      }
    }
  }
  const ref = (0, import_react3.useRef)(null);
  const ref1 = (0, import_react3.useRef)(null);
  const ref2 = (0, import_react3.useRef)(null);
  (0, import_react6.useEffect)(() => {
    input = ref.current;
    output = ref1.current;
    outputContainer = ref2.current;
    console.log(input.className, output.className, outputContainer.className);
    customerid = localStorage.getItem("customerId");
    console.log(customerid, "customerId----------------");
  }, []);
  async function getRecipient() {
    try {
      const res = axios.get(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`);
      console.log(res, "getRecipient Response____________");
    } catch (error) {
      console.log(error, "Recipient error--------");
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: productshow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { className: "px-0 md:px-8 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid items-start md:gap-6 lg:gap-5 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductGallery, { media: media.nodes, className: "w-full lg:col-span-2" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 243,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll ml-[-300px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "h1", className: "whitespace-normal", children: title }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 247,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "opacity-50 font-medium", children: [
            "$ ",
            product.variants.nodes[0].price.amount
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 250,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonClass flex justify-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => setShow(false), children: "Single Card" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 256,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 255,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#ef6e6e] text-[#fff] p-2 rounded ", onClick: () => setShow(true), children: "Bulk Purchase" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 259,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 258,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 254,
            columnNumber: 21
          }, this),
          show && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { class: "price-breakdown desktop", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { class: "label", children: "Quantity" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "1-99" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 60
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "100-249" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 73
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "250-499" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 89
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "500-999" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 105
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "1000-2499" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 121
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "2500+" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 139
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 264,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { class: "label", children: "Price" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$3.25" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 57
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$3.15" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 71
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$3.00" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 85
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$2.85" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 99
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$2.70" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 113
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$2.55" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 267,
                columnNumber: 127
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 266,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 263,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 262,
            columnNumber: 30
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "selectOtion mb-5 flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[192px]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-sm w-[100px]", children: "Standard Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 272,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 273,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "font", onClick: () => setFont(), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "pinocchio", className: `font-pinocchio`, children: "Pinocchio" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 275,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "tarzan", className: `font-tarzan`, children: "Tarzan" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 276,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "stitch", className: `font-stitch`, children: "Stitch" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 277,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "simba", className: `font-simba`, children: "Simba" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 278,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "roo", className: `font-roo`, children: "Roo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 279,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "nimo", className: `font-nimo`, children: "Nimo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 280,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "lumiere", className: `font-lumiere`, children: "Lumiere" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 281,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "kaa", className: `font-kaa`, children: "Kaa" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 282,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "kaaNew", className: `font-kaaNew`, children: "KaaNew" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 283,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "dumbo", className: `font-dumbo`, children: "Dumbo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 284,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "donald", className: `font-donald`, children: "Donald" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 285,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "aladdin", className: `font-aladdin`, children: "Aladdin" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 286,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "belle", className: `font-belle`, children: "Belle" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 287,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "boo", className: `font-boo`, children: "Boo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 288,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "cinderella", className: `font-cinderella`, children: "Cinderella" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 289,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "copper", className: `font-copper`, children: "Copper" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 290,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "jasmine", className: `font-jasmine`, children: "Jasmine" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 291,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "merlin", className: `font-merlin`, children: "Merlin" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 292,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "goofy", className: `font-goofy`, children: "Goofy" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 293,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "hercules", className: `font-hercules`, children: "Hercules" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 294,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rafiki", className: `font-rafiki`, children: "Rafiki" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 295,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rapunzel", className: `font-rapunzel`, children: "Rapunzel" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 296,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "ratigan", className: `font-ratigan`, children: "Ratigan" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 297,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "sarabi", className: `font-sarabi`, children: "Sarabi" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 298,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "scar", className: `font-scar`, children: "Scar" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 299,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "triton", className: `font-triton`, children: "Triton" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 300,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "woody", className: `font-woody`, children: "Woody" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 301,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 274,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 271,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-sm", children: "Custom Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 306,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 307,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "Coustomfont text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-sm", children: "Custom Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 309,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 308,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 305,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 270,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Optional shipping date" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 314,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 314,
              columnNumber: 58
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 315,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 313,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 246,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 245,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 244,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {}, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 361,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 242,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mainDivForBox flex gap-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "outer", className: "outerr", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "outerSec", ref: ref2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd", ref: ref1, className: "output", children: name }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 379,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 378,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "secDiv", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd2", className: "output2", children: name2 }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 384,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 383,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 377,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "textAreaView w-[600px]", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input", ref, className: "inputText", maxlength: "450", onChange: (e) => setName(e.target.value), placeholder: "Enter your custom message text here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 391,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input2", className: "inputText2", maxlength: "24", onChange: (e) => setName2(e.target.value), placeholder: "Enter here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 392,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-[#1b5299] h-[50px] text-center mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-[#fff] items-center justify-center mt-3 w-full", onClick: () => setProductShow(false), children: "Next" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 394,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 393,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 390,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 376,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 241,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react3.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-32" }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 425,
      columnNumber: 31
    }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { errorElement: "There was a problem loading related products", resolve: recommended, children: (products) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductSwimlane, { title: "Related Products", products }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 427,
      columnNumber: 28
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 426,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 425,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 240,
    columnNumber: 22
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "  w-full h-full gap-2 mt-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "items-center font-bold flex text-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BiSolidChevronLeft, { size: "50px" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 431,
        columnNumber: 64
      }, this),
      "Back To Product Customization"
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 431,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row flex mr-2 ml-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-6 w-[50%] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-2xl font-bold mt-4 mb-4", children: "Your Info (return/sender address)" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 436,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-3", children: "New Address" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 438,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 437,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text ", className: "w-full rounded p-3 mt-4", placeholder: "Search Addresses..." }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 441,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 440,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 435,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 434,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 433,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-6 w-[50%]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-2xl font-bold mt-4 mb-4", children: "Recipient address" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 449,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-3", children: "New Address" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 451,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 450,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text ", className: "w-full rounded p-3 mt-4", placeholder: "Search Addresses..." }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 454,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 453,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 448,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 447,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 446,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 432,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row flex mr-2 ml-2 gap-4 mt-10 mb-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-6 w-[50%] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-grid left-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-data", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-2xl font-bold mt-6 mb-6", children: "Add a Gift Card" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 465,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row flex mr-2 ml-2 ", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Card:" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 467,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "gift_name", className: "w-full", id: "gift_name", onchange: "changeGiftPrice(this.value)", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", disabled: "", selected: "", children: "Select" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 470,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661818679401", id: "giftName", children: "Starbucks Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 471,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661817729129", id: "giftName", children: "Amazon Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 472,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661818941545", id: "giftName", children: "Visa Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 473,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661815795817", id: "giftName", children: "Home Depot Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 474,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661818253417", id: "giftName", children: "Lowe's Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 475,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 469,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 468,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 466,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row flex mr-2 ml-2 ", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Price:" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 480,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "gift_name", className: "w-full", id: "gift_name", onchange: "changeGiftPrice(this.value)", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", disabled: "", selected: "", children: "Select" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 483,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661818679401", id: "giftName", children: "Starbucks Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 484,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661817729129", id: "giftName", children: "Amazon Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 485,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661818941545", id: "giftName", children: "Visa Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 486,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661815795817", id: "giftName", children: "Home Depot Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 487,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6661818253417", id: "giftName", children: "Lowe's Gift Card" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 488,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 482,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 481,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 479,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: "", name: "", value: "" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 493,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: "ml-3", children: "Add Gift Card" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 494,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 492,
        columnNumber: 19
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 464,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 463,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 462,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 460,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-3", children: "Add To Cart" }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 501,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 500,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 430,
    columnNumber: 15
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 239,
    columnNumber: 10
  }, this);
}
_s(Product, "AotDqphRu8H6/LmKFpXFgpYQ7q4=", false, function() {
  return [useLoaderData];
});
_c = Product;
function ProductDetail({
  title,
  content,
  learnMore
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve, { as: "div", className: "grid w-full gap-2", children: ({
    open
  }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve.Button, { className: "text-left", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "lead", as: "h4", children: title }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 700,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconClose, { className: clsx_m_default("transition-transform transform-gpu duration-200", !open && "rotate-[45deg]") }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 703,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 699,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 698,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve.Panel, { className: "pb-4 pt-2 grid gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "prose dark:prose-invert", dangerouslySetInnerHTML: {
        __html: content
      } }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 708,
        columnNumber: 13
      }, this),
      learnMore && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "pb-px border-b border-primary/30 text-primary/50", to: learnMore, children: "Learn more" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 712,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 711,
        columnNumber: 27
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 707,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 697,
    columnNumber: 11
  }, this) }, title, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 694,
    columnNumber: 10
  }, this);
}
_c2 = ProductDetail;
var PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;
var PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;
var VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
var RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
var _c;
var _c2;
$RefreshReg$(_c, "Product");
$RefreshReg$(_c2, "ProductDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Product as default
};
//# sourceMappingURL=/build/routes/($locale).products.$productHandle-7HRFNW4I.js.map
