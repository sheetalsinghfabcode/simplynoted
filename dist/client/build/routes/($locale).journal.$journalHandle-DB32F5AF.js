import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  PageHeader,
  Section
} from "/build/_shared/chunk-OZ53DUYH.js";
import {
  Image
} from "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-4BGUX6VE.js";
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

// app/routes/($locale).journal.$journalHandle.jsx
var import_seo = __toESM(require_seo());

// app/styles/custom-font.css
var custom_font_default = "/build/_assets/custom-font-JLJV7AHS.css";

// app/routes/($locale).journal.$journalHandle.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).journal.$journalHandle.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).journal.$journalHandle.jsx"
  );
}
var links = () => {
  return [{
    rel: "stylesheet",
    href: custom_font_default
  }];
};
function Article() {
  _s();
  const {
    article,
    formattedDate
  } = useLoaderData();
  const {
    title,
    image,
    contentHtml,
    author
  } = article;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: title, variant: "blogPost", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
      formattedDate,
      " \xB7 ",
      author?.name
    ] }, void 0, true, {
      fileName: "app/routes/($locale).journal.$journalHandle.jsx",
      lineNumber: 91,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).journal.$journalHandle.jsx",
      lineNumber: 90,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { as: "article", padding: "x", children: [
      image && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { data: image, className: "w-full mx-auto mt-8 md:mt-16 max-w-7xl", sizes: "90vw", loading: "eager" }, void 0, false, {
        fileName: "app/routes/($locale).journal.$journalHandle.jsx",
        lineNumber: 96,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { dangerouslySetInnerHTML: {
        __html: contentHtml
      }, className: "article" }, void 0, false, {
        fileName: "app/routes/($locale).journal.$journalHandle.jsx",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).journal.$journalHandle.jsx",
      lineNumber: 95,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).journal.$journalHandle.jsx",
    lineNumber: 89,
    columnNumber: 10
  }, this);
}
_s(Article, "qBnSPUH1GWNj2cAftD7EOkSCKqU=", false, function() {
  return [useLoaderData];
});
_c = Article;
var _c;
$RefreshReg$(_c, "Article");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Article as default,
  links
};
//# sourceMappingURL=/build/routes/($locale).journal.$journalHandle-DB32F5AF.js.map
