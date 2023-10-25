import {
  getImageLoadingPriority
} from "/build/_shared/chunk-4MYYP63X.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import {
  Grid,
  Link,
  PageHeader,
  Section
} from "/build/_shared/chunk-Z5LFC6FH.js";
import {
  Image
} from "/build/_shared/chunk-ZGUXAR4N.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-OMGXAGHL.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VFPJDGJ3.js";
import {
  useLoaderData
} from "/build/_shared/chunk-7LX4FZKM.js";
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

// app/routes/($locale).journal._index.jsx
var import_seo = __toESM(require_seo());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).journal._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).journal._index.jsx"
  );
  import.meta.hot.lastModified = "1696849699249.4316";
}
var BLOG_HANDLE = "Journal";
function Journals() {
  _s();
  const {
    articles
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading: BLOG_HANDLE }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { as: "ol", layout: "blog", children: articles.map((article, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArticleCard, { blogHandle: BLOG_HANDLE.toLowerCase(), article, loading: getImageLoadingPriority(i, 2) }, article.id, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 86,
      columnNumber: 41
    }, this)) }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 85,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).journal._index.jsx",
    lineNumber: 82,
    columnNumber: 10
  }, this);
}
_s(Journals, "zk/JH2CQu/i0cqbqoGfJS/SR8u4=", false, function() {
  return [useLoaderData];
});
_c = Journals;
function ArticleCard({
  blogHandle,
  article,
  loading
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/${blogHandle}/${article.handle}`, children: [
    article.image && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-image aspect-[3/2]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { alt: article.image.altText || article.title, className: "object-cover w-full", data: article.image, aspectRatio: "3/2", loading, sizes: "(min-width: 768px) 50vw, 100vw" }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 103,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 102,
      columnNumber: 27
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mt-4 font-medium", children: article.title }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 105,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "block mt-1", children: article.publishedAt }, void 0, false, {
      fileName: "app/routes/($locale).journal._index.jsx",
      lineNumber: 106,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).journal._index.jsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, article.id, false, {
    fileName: "app/routes/($locale).journal._index.jsx",
    lineNumber: 100,
    columnNumber: 10
  }, this);
}
_c2 = ArticleCard;
var _c;
var _c2;
$RefreshReg$(_c, "Journals");
$RefreshReg$(_c2, "ArticleCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Journals as default
};
//# sourceMappingURL=/build/routes/($locale).journal._index-NY6PKZKJ.js.map
