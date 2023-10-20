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
var import_react = __toESM(require_react());
var import_seo = __toESM(require_seo());
var import_react4 = __toESM(require_react());
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
  import.meta.hot.lastModified = "1696573888190.1953";
}
var input;
var input2;
var output;
var output2;
var outputContainer;
var outputContainer2;
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
  const [name, setName] = (0, import_react4.useState)("Enter Your Text Here....");
  const [name2, setName2] = (0, import_react4.useState)("");
  const [show, setShow] = (0, import_react4.useState)(false);
  const [startDate, setStartDate] = (0, import_react4.useState)(/* @__PURE__ */ new Date());
  const [productshow, setProductShow] = (0, import_react4.useState)(true);
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
  const ref = (0, import_react.useRef)(null);
  const ref1 = (0, import_react.useRef)(null);
  const ref2 = (0, import_react.useRef)(null);
  (0, import_react4.useEffect)(() => {
    input = ref.current;
    output = ref1.current;
    outputContainer = ref2.current;
    console.log(input.className, output.className, outputContainer.className);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: productshow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { className: "px-0 md:px-8 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid items-start md:gap-6 lg:gap-5 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductGallery, { media: media.nodes, className: "w-full lg:col-span-2" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 230,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll ml-[-300px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "h1", className: "whitespace-normal", children: title }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 234,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "opacity-50 font-medium", children: [
            "$ ",
            product.variants.nodes[0].price.amount
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 237,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonClass flex justify-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => setShow(false), children: "Single Card" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 243,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 242,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#ef6e6e] text-[#fff] p-2 rounded ", onClick: () => setShow(true), children: "Bulk Purchase" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 246,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 245,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 241,
            columnNumber: 13
          }, this),
          show && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { class: "price-breakdown desktop", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { class: "label", children: "Quantity" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "1-99" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 52
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "100-249" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 65
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "250-499" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 81
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "500-999" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 97
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "1000-2499" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 113
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "2500+" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 252,
                columnNumber: 131
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 251,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { class: "label", children: "Price" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$3.25" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 49
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$3.15" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 63
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$3.00" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 77
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$2.85" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 91
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$2.70" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 105
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: "$2.55" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 254,
                columnNumber: 119
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 253,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 250,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 249,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "selectOtion mb-5 flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[192px]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-sm w-[100px]", children: "Standard Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 260,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "font", onClick: () => setFont(), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "pinocchio", className: `font-pinocchio`, children: "Pinocchio" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 262,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "tarzan", className: `font-tarzan`, children: "Tarzan" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 263,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "stitch", className: `font-stitch`, children: "Stitch" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 264,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "simba", className: `font-simba`, children: "Simba" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 265,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "roo", className: `font-roo`, children: "Roo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 266,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "nimo", className: `font-nimo`, children: "Nimo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 267,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "lumiere", className: `font-lumiere`, children: "Lumiere" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 268,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "kaa", className: `font-kaa`, children: "Kaa" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 269,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "kaaNew", className: `font-kaaNew`, children: "KaaNew" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 270,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "dumbo", className: `font-dumbo`, children: "Dumbo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 271,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "donald", className: `font-donald`, children: "Donald" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 272,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "aladdin", className: `font-aladdin`, children: "Aladdin" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 273,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "belle", className: `font-belle`, children: "Belle" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 274,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "boo", className: `font-boo`, children: "Boo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 275,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "cinderella", className: `font-cinderella`, children: "Cinderella" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 276,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "copper", className: `font-copper`, children: "Copper" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 277,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "jasmine", className: `font-jasmine`, children: "Jasmine" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 278,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "merlin", className: `font-merlin`, children: "Merlin" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 279,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "goofy", className: `font-goofy`, children: "Goofy" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 280,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "hercules", className: `font-hercules`, children: "Hercules" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 281,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rafiki", className: `font-rafiki`, children: "Rafiki" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 282,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rapunzel", className: `font-rapunzel`, children: "Rapunzel" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 283,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "ratigan", className: `font-ratigan`, children: "Ratigan" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 284,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "sarabi", className: `font-sarabi`, children: "Sarabi" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 285,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "scar", className: `font-scar`, children: "Scar" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 286,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "triton", className: `font-triton`, children: "Triton" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 287,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "woody", className: `font-woody`, children: "Woody" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 288,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 261,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 258,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "text-sm", children: "Custom Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 293,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 294,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "Coustomfont text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-sm", children: "Custom Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 296,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 295,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 292,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 257,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Optional shipping date" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 301,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 301,
              columnNumber: 50
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 302,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 300,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 233,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 232,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 231,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {}, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 348,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 229,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mainDivForBox flex gap-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "outer", className: "outerr", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "outerSec", ref: ref2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd", ref: ref1, className: "output", children: name }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 366,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 365,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "secDiv", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd2", className: "output2", children: name2 }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 371,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 370,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 364,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "textAreaView w-[600px]", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input", ref, className: "inputText", maxlength: "450", onChange: (e) => setName(e.target.value), placeholder: "Enter your custom message text here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 378,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input2", className: "inputText2", maxlength: "24", onChange: (e) => setName2(e.target.value), placeholder: "Enter here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 379,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-[#1b5299] h-[50px] text-center mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-[#fff] items-center justify-center mt-3 w-full", onClick: () => setProductShow(false), children: "Next" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 381,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 380,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 377,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 363,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 228,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-32" }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 412,
      columnNumber: 23
    }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { errorElement: "There was a problem loading related products", resolve: recommended, children: (products) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductSwimlane, { title: "Related Products", products }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 414,
      columnNumber: 20
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 413,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 412,
      columnNumber: 3
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 227,
    columnNumber: 20
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " flex w-full h-full gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { class: "icon-g-02" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 419,
        columnNumber: 24
      }, this),
      "Back To Product Customization"
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 419,
      columnNumber: 7
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 418,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-[#fff]" }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 421,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 417,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 226,
    columnNumber: 10
  }, this);
}
_s(Product, "xsFRhwqK5wCfF1W98g4l3Q0BlRo=", false, function() {
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
        lineNumber: 621,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconClose, { className: clsx_m_default("transition-transform transform-gpu duration-200", !open && "rotate-[45deg]") }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 624,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 620,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 619,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve.Panel, { className: "pb-4 pt-2 grid gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "prose dark:prose-invert", dangerouslySetInnerHTML: {
        __html: content
      } }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 629,
        columnNumber: 13
      }, this),
      learnMore && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "pb-px border-b border-primary/30 text-primary/50", to: learnMore, children: "Learn more" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 633,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 632,
        columnNumber: 27
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 628,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 618,
    columnNumber: 11
  }, this) }, title, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 615,
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
//# sourceMappingURL=/build/routes/($locale).products.$productHandle-XQKEVKQJ.js.map
