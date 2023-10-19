import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Button,
  FeaturedCollections,
  Layout,
  PageHeader,
  ProductSwimlane,
  Text,
  usePageAnalytics
} from "/build/_shared/chunk-OZ53DUYH.js";
import {
  AnalyticsEventName,
  bt,
  ge,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  useShopifyCookies
} from "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import {
  DEFAULT_LOCALE,
  usePrefixPathWithLocale
} from "/build/_shared/chunk-4BGUX6VE.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useLocation,
  useMatches,
  useRouteError
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

// app/root.jsx
var import_seo = __toESM(require_seo());

// public/favicon.svg
var favicon_default = "/build/_assets/favicon-5XMENB4X.svg";

// app/components/FeaturedSection.jsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\FeaturedSection.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\FeaturedSection.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function FeaturedSection() {
  _s();
  const {
    load,
    data
  } = useFetcher();
  const path = usePrefixPathWithLocale("/featured-products");
  (0, import_react.useEffect)(() => {
    load(path);
  }, [load, path]);
  if (!data)
    return null;
  const {
    featuredCollections,
    featuredProducts
  } = data;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    featuredCollections.nodes.length < 2 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeaturedCollections, { title: "Popular Collections", collections: featuredCollections }, void 0, false, {
      fileName: "app/components/FeaturedSection.jsx",
      lineNumber: 43,
      columnNumber: 48
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductSwimlane, { products: featuredProducts }, void 0, false, {
      fileName: "app/components/FeaturedSection.jsx",
      lineNumber: 44,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/FeaturedSection.jsx",
    lineNumber: 42,
    columnNumber: 10
  }, this);
}
_s(FeaturedSection, "Uq/AUQPwojgUB+7GWZixmHAQfXI=", false, function() {
  return [useFetcher, usePrefixPathWithLocale];
});
_c = FeaturedSection;
var _c;
$RefreshReg$(_c, "FeaturedSection");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/GenericError.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\GenericError.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\GenericError.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function GenericError({
  error
}) {
  const heading = `Something\u2019s wrong here.`;
  let description = `We found an error while loading this page.`;
  if (error) {
    description += `
${error.message}`;
    console.error(error);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(PageHeader, { heading, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { width: "narrow", as: "p", children: description }, void 0, false, {
        fileName: "app/components/GenericError.jsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      error?.stack && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("pre", { style: {
        padding: "2rem",
        background: "hsla(10, 50%, 50%, 0.1)",
        color: "red",
        overflow: "auto",
        maxWidth: "100%"
      }, dangerouslySetInnerHTML: {
        __html: addLinksToStackTrace(error.stack)
      } }, void 0, false, {
        fileName: "app/components/GenericError.jsx",
        lineNumber: 41,
        columnNumber: 26
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { width: "auto", variant: "secondary", to: "/", children: "Take me to the home page" }, void 0, false, {
        fileName: "app/components/GenericError.jsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/GenericError.jsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FeaturedSection, {}, void 0, false, {
      fileName: "app/components/GenericError.jsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/GenericError.jsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
}
_c2 = GenericError;
function addLinksToStackTrace(stackTrace) {
  return stackTrace?.replace(/^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim, (all, m1) => all.replace(m1, `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`));
}
var _c2;
$RefreshReg$(_c2, "GenericError");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/NotFound.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\NotFound.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\NotFound.jsx"
  );
  import.meta.hot.lastModified = "1696490276853.8694";
}
function NotFound({
  type = "page"
}) {
  const heading = `We\u2019ve lost this ${type}`;
  const description = `We couldn\u2019t find the ${type} you\u2019re looking for. Try checking the URL or heading back to the home page.`;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(PageHeader, { heading, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Text, { width: "narrow", as: "p", children: description }, void 0, false, {
        fileName: "app/components/NotFound.jsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { width: "auto", variant: "secondary", to: "/", children: "Take me to the home page" }, void 0, false, {
        fileName: "app/components/NotFound.jsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/NotFound.jsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(FeaturedSection, {}, void 0, false, {
      fileName: "app/components/NotFound.jsx",
      lineNumber: 38,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/NotFound.jsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
_c3 = NotFound;
var _c3;
$RefreshReg$(_c3, "NotFound");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/styles/app.css
var app_default = "/build/_assets/app-ZAAY5SY5.css";

// app/hooks/useAnalytics.jsx
var import_react4 = __toESM(require_react());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\useAnalytics.jsx"
  );
  import.meta.hot.lastModified = "1696490276866.0898";
}
function useAnalytics(hasUserConsent) {
  useShopifyCookies({ hasUserConsent });
  const location = useLocation();
  const lastLocationKey = (0, import_react4.useRef)("");
  const pageAnalytics = usePageAnalytics({ hasUserConsent });
  (0, import_react4.useEffect)(() => {
    if (lastLocationKey.current === location.key)
      return;
    lastLocationKey.current = location.key;
    const payload = {
      ...getClientBrowserParameters(),
      ...pageAnalytics
    };
    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload
    });
  }, [location, pageAnalytics]);
}

// app/root.jsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.jsx"
  );
}
var shouldRevalidate = ({
  formMethod,
  currentUrl,
  nextUrl
}) => {
  if (formMethod && formMethod !== "GET") {
    return true;
  }
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }
  return false;
};
var links = () => {
  return [{
    rel: "stylesheet",
    href: app_default
  }, {
    rel: "preconnect",
    href: "https://cdn.shopify.com"
  }, {
    rel: "preconnect",
    href: "https://shop.app"
  }, {
    rel: "icon",
    type: "image/svg+xml",
    href: favicon_default
  }];
};
function App() {
  _s2();
  const nonce = ge();
  const data = useLoaderData();
  const locale = data.selectedLocale ?? DEFAULT_LOCALE;
  const hasUserConsent = true;
  useAnalytics(hasUserConsent);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("html", { lang: locale.language, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 103,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(bt, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 106,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.jsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Layout, { layout: data.layout, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 112,
        columnNumber: 11
      }, this) }, `${locale.language}-${locale.country}`, false, {
        fileName: "app/root.jsx",
        lineNumber: 110,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(ScrollRestoration, { nonce }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 114,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Scripts, { nonce }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 115,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(LiveReload, { nonce }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 116,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.jsx",
      lineNumber: 109,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.jsx",
    lineNumber: 101,
    columnNumber: 10
  }, this);
}
_s2(App, "wS1IxwTQNgLnN1UNzhV0XTDQjOc=", false, function() {
  return [ge, useLoaderData, useAnalytics];
});
_c4 = App;
function ErrorBoundary({
  error
}) {
  _s22();
  const nonce = ge();
  const [root] = useMatches();
  const locale = root?.data?.selectedLocale ?? DEFAULT_LOCALE;
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);
  let title = "Error";
  let pageType = "page";
  if (isRouteError) {
    title = "Not found";
    if (routeError.status === 404)
      pageType = routeError.data || pageType;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("html", { lang: locale.language, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 142,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("title", { children: title }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 145,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.jsx",
      lineNumber: 140,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Layout, { layout: root?.data?.layout, children: isRouteError ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, { children: routeError.status === 404 ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(NotFound, { type: pageType }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 151,
        columnNumber: 44
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(GenericError, { error: {
        message: `${routeError.status} ${routeError.data}`
      } }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 151,
        columnNumber: 75
      }, this) }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 150,
        columnNumber: 27
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(GenericError, { error: error instanceof Error ? error : void 0 }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 156,
        columnNumber: 19
      }, this) }, `${locale.language}-${locale.country}`, false, {
        fileName: "app/root.jsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(ScrollRestoration, { nonce }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 159,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Scripts, { nonce }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(LiveReload, { nonce }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 161,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.jsx",
      lineNumber: 147,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.jsx",
    lineNumber: 139,
    columnNumber: 10
  }, this);
}
_s22(ErrorBoundary, "xrEn7bLATczkYrVOIbZIyYDMLG4=", false, function() {
  return [ge, useMatches, useRouteError];
});
_c22 = ErrorBoundary;
var _c4;
var _c22;
$RefreshReg$(_c4, "App");
$RefreshReg$(_c22, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  App as default,
  links,
  shouldRevalidate
};
//# sourceMappingURL=/build/root-YMD54HQM.js.map
