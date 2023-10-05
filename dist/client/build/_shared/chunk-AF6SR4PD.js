import {
  require_jsx_runtime
} from "/build/_shared/chunk-YOSDW4RD.js";
import {
  l,
  u
} from "/build/_shared/chunk-GZRC5YLW.js";
import {
  Link,
  useFetcher,
  useLocation,
  useMatches,
  useNavigate,
  useNavigation
} from "/build/_shared/chunk-M7ZELIPT.js";
import {
  require_react
} from "/build/_shared/chunk-BVWHYGSQ.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/content-security-policy-builder/dist/index.js
var require_dist = __commonJS({
  "node_modules/content-security-policy-builder/dist/index.js"(exports, module) {
    "use strict";
    module.exports = function(_a) {
      var directives = _a.directives;
      var namesSeen = /* @__PURE__ */ new Set();
      var result = [];
      Object.keys(directives).forEach(function(originalName) {
        var name = originalName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        if (namesSeen.has(name)) {
          throw new Error("".concat(originalName, " is specified more than once"));
        }
        namesSeen.add(name);
        var value = directives[originalName];
        if (Array.isArray(value)) {
          value = value.join(" ");
        } else if (value === true) {
          value = "";
        }
        if (value) {
          result.push("".concat(name, " ").concat(value));
        } else if (value !== false) {
          result.push(name);
        }
      });
      return result.join("; ");
    };
  }
});

// node_modules/@shopify/hydrogen-react/dist/browser-prod/flatten-connection.mjs
function flattenConnection(connection) {
  if (!connection) {
    const noConnectionErr = `flattenConnection(): needs a 'connection' to flatten, but received '${connection ?? ""}' instead.`;
    {
      console.error(noConnectionErr + ` Returning an empty array`);
      return [];
    }
  }
  if ("nodes" in connection) {
    return connection.nodes;
  }
  if ("edges" in connection && Array.isArray(connection.edges)) {
    return connection.edges.map((edge) => {
      if (!(edge == null ? void 0 : edge.node)) {
        throw new Error(
          "flattenConnection(): Connection edges must contain nodes"
        );
      }
      return edge.node;
    });
  }
  return [];
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/analytics-constants.mjs
var AnalyticsEventName = {
  PAGE_VIEW: "PAGE_VIEW",
  ADD_TO_CART: "ADD_TO_CART"
};
var AnalyticsPageType = {
  article: "article",
  blog: "blog",
  captcha: "captcha",
  cart: "cart",
  collection: "collection",
  customersAccount: "customers/account",
  customersActivateAccount: "customers/activate_account",
  customersAddresses: "customers/addresses",
  customersLogin: "customers/login",
  customersOrder: "customers/order",
  customersRegister: "customers/register",
  customersResetPassword: "customers/reset_password",
  giftCard: "gift_card",
  home: "index",
  listCollections: "list-collections",
  forbidden: "403",
  notFound: "404",
  page: "page",
  password: "password",
  product: "product",
  policy: "policy",
  search: "search"
};
var ShopifySalesChannel = {
  hydrogen: "hydrogen",
  headless: "headless"
};
var ShopifyAppId = {
  hydrogen: "6167201",
  headless: "12875497473"
};

// node_modules/@shopify/hydrogen-react/dist/browser-prod/Money.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

// node_modules/@shopify/hydrogen-react/dist/browser-prod/useMoney.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/@shopify/hydrogen-react/dist/browser-prod/ShopifyProvider.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);

// node_modules/@shopify/hydrogen-react/dist/browser-prod/storefront-api-constants.mjs
var SFAPI_VERSION = "2023-07";

// node_modules/@shopify/hydrogen-react/dist/browser-prod/ShopifyProvider.mjs
var defaultShopifyContext = {
  storeDomain: "test",
  storefrontToken: "abc123",
  storefrontApiVersion: SFAPI_VERSION,
  countryIsoCode: "US",
  languageIsoCode: "EN",
  getStorefrontApiUrl() {
    return "";
  },
  getPublicTokenHeaders() {
    return {};
  },
  getShopifyDomain() {
    return "";
  }
};
var ShopifyContext = (0, import_react.createContext)(
  defaultShopifyContext
);
function useShop() {
  const shopContext = (0, import_react.useContext)(ShopifyContext);
  if (!shopContext) {
    throw new Error(`'useShop()' must be a descendent of <ShopifyProvider/>`);
  }
  return shopContext;
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/useMoney.mjs
function useMoney(money) {
  const { countryIsoCode, languageIsoCode } = useShop();
  const locale = languageIsoCode.includes("_") ? languageIsoCode.replace("_", "-") : `${languageIsoCode}-${countryIsoCode}`;
  if (!locale) {
    throw new Error(
      `useMoney(): Unable to get 'locale' from 'useShop()', which means that 'locale' was not passed to '<ShopifyProvider/>'. 'locale' is required for 'useMoney()' to work`
    );
  }
  const amount = parseFloat(money.amount);
  const options = (0, import_react2.useMemo)(
    () => ({
      style: "currency",
      currency: money.currencyCode
    }),
    [money.currencyCode]
  );
  const defaultFormatter = useLazyFormatter(locale, options);
  const nameFormatter = useLazyFormatter(locale, {
    ...options,
    currencyDisplay: "name"
  });
  const narrowSymbolFormatter = useLazyFormatter(locale, {
    ...options,
    currencyDisplay: "narrowSymbol"
  });
  const withoutTrailingZerosFormatter = useLazyFormatter(locale, {
    ...options,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const withoutCurrencyFormatter = useLazyFormatter(locale);
  const withoutTrailingZerosOrCurrencyFormatter = useLazyFormatter(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const isPartCurrency = (part) => part.type === "currency";
  const lazyFormatters = (0, import_react2.useMemo)(
    () => ({
      original: () => money,
      currencyCode: () => money.currencyCode,
      localizedString: () => defaultFormatter().format(amount),
      parts: () => defaultFormatter().formatToParts(amount),
      withoutTrailingZeros: () => amount % 1 === 0 ? withoutTrailingZerosFormatter().format(amount) : defaultFormatter().format(amount),
      withoutTrailingZerosAndCurrency: () => amount % 1 === 0 ? withoutTrailingZerosOrCurrencyFormatter().format(amount) : withoutCurrencyFormatter().format(amount),
      currencyName: () => {
        var _a;
        return ((_a = nameFormatter().formatToParts(amount).find(isPartCurrency)) == null ? void 0 : _a.value) ?? money.currencyCode;
      },
      // e.g. "US dollars"
      currencySymbol: () => {
        var _a;
        return ((_a = defaultFormatter().formatToParts(amount).find(isPartCurrency)) == null ? void 0 : _a.value) ?? money.currencyCode;
      },
      // e.g. "USD"
      currencyNarrowSymbol: () => {
        var _a;
        return ((_a = narrowSymbolFormatter().formatToParts(amount).find(isPartCurrency)) == null ? void 0 : _a.value) ?? "";
      },
      // e.g. "$"
      amount: () => defaultFormatter().formatToParts(amount).filter(
        (part) => ["decimal", "fraction", "group", "integer", "literal"].includes(
          part.type
        )
      ).map((part) => part.value).join("")
    }),
    [
      money,
      amount,
      nameFormatter,
      defaultFormatter,
      narrowSymbolFormatter,
      withoutCurrencyFormatter,
      withoutTrailingZerosFormatter,
      withoutTrailingZerosOrCurrencyFormatter
    ]
  );
  return (0, import_react2.useMemo)(
    () => new Proxy(lazyFormatters, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      get: (target, key) => {
        var _a;
        return (_a = Reflect.get(target, key)) == null ? void 0 : _a.call(null);
      }
    }),
    [lazyFormatters]
  );
}
function useLazyFormatter(locale, options) {
  return (0, import_react2.useMemo)(() => {
    let memoized;
    return () => memoized ?? (memoized = new Intl.NumberFormat(locale, options));
  }, [locale, options]);
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/Money.mjs
function Money({
  data,
  as,
  withoutCurrency,
  withoutTrailingZeros,
  measurement,
  measurementSeparator = "/",
  ...passthroughProps
}) {
  if (!isMoney(data)) {
    throw new Error(
      `<Money/> needs a valid 'data' prop that has 'amount' and 'currencyCode'`
    );
  }
  const moneyObject = useMoney(data);
  const Wrapper = as ?? "div";
  let output = moneyObject.localizedString;
  if (withoutCurrency || withoutTrailingZeros) {
    if (withoutCurrency && !withoutTrailingZeros) {
      output = moneyObject.amount;
    } else if (!withoutCurrency && withoutTrailingZeros) {
      output = moneyObject.withoutTrailingZeros;
    } else {
      output = moneyObject.withoutTrailingZerosAndCurrency;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Wrapper, { ...passthroughProps, children: [
    output,
    measurement && measurement.referenceUnit && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      measurementSeparator,
      measurement.referenceUnit
    ] })
  ] });
}
function isMoney(maybeMoney) {
  return typeof maybeMoney.amount === "string" && !!maybeMoney.amount && typeof maybeMoney.currencyCode === "string" && !!maybeMoney.currencyCode;
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/Image.mjs
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var React = __toESM(require_react(), 1);
var Image = React.forwardRef(
  ({
    alt,
    aspectRatio,
    crop = "center",
    data,
    decoding = "async",
    height = "auto",
    loader = shopifyLoader,
    loaderOptions,
    loading = "lazy",
    sizes,
    src,
    srcSetOptions = {
      intervals: 15,
      startingWidth: 200,
      incrementSize: 200,
      placeholderWidth: 100
    },
    width = "100%",
    widths,
    ...passthroughProps
  }, ref) => {
    const normalizedData = React.useMemo(() => {
      const dataWidth = (data == null ? void 0 : data.width) && (data == null ? void 0 : data.height) ? data == null ? void 0 : data.width : void 0;
      const dataHeight = (data == null ? void 0 : data.width) && (data == null ? void 0 : data.height) ? data == null ? void 0 : data.height : void 0;
      return {
        width: dataWidth,
        height: dataHeight,
        unitsMatch: Boolean(unitsMatch(dataWidth, dataHeight))
      };
    }, [data]);
    const normalizedProps = React.useMemo(() => {
      const nWidthProp = width || "100%";
      const widthParts = getUnitValueParts(nWidthProp.toString());
      const nWidth = `${widthParts.number}${widthParts.unit}`;
      const autoHeight = height === void 0 || height === null;
      const heightParts = autoHeight ? null : getUnitValueParts(height.toString());
      const fixedHeight = heightParts ? `${heightParts.number}${heightParts.unit}` : "";
      const nHeight = autoHeight ? "auto" : fixedHeight;
      const nSrc = src || (data == null ? void 0 : data.url);
      const nAlt = (data == null ? void 0 : data.altText) && !alt ? data == null ? void 0 : data.altText : alt || "";
      const nAspectRatio = aspectRatio ? aspectRatio : normalizedData.unitsMatch ? [
        getNormalizedFixedUnit(normalizedData.width),
        getNormalizedFixedUnit(normalizedData.height)
      ].join("/") : void 0;
      return {
        width: nWidth,
        height: nHeight,
        src: nSrc,
        alt: nAlt,
        aspectRatio: nAspectRatio
      };
    }, [
      width,
      height,
      src,
      data,
      alt,
      aspectRatio,
      normalizedData,
      passthroughProps == null ? void 0 : passthroughProps.key
    ]);
    const { intervals, startingWidth, incrementSize, placeholderWidth } = srcSetOptions;
    const imageWidths = React.useMemo(() => {
      return generateImageWidths(
        width,
        intervals,
        startingWidth,
        incrementSize
      );
    }, [width, intervals, startingWidth, incrementSize]);
    const fixedWidth = isFixedWidth(normalizedProps.width);
    if (fixedWidth) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        FixedWidthImage,
        {
          aspectRatio,
          crop,
          decoding,
          height,
          imageWidths,
          loader,
          loading,
          normalizedProps,
          passthroughProps,
          ref,
          width
        }
      );
    } else {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        FluidImage,
        {
          aspectRatio,
          crop,
          decoding,
          imageWidths,
          loader,
          loading,
          normalizedProps,
          passthroughProps,
          placeholderWidth,
          ref,
          sizes
        }
      );
    }
  }
);
var FixedWidthImage = React.forwardRef(
  ({
    aspectRatio,
    crop,
    decoding,
    height,
    imageWidths,
    loader = shopifyLoader,
    loading,
    normalizedProps,
    passthroughProps,
    width
  }, ref) => {
    const fixed = React.useMemo(() => {
      const intWidth = getNormalizedFixedUnit(width);
      const intHeight = getNormalizedFixedUnit(height);
      const fixedAspectRatio = aspectRatio ? aspectRatio : unitsMatch(normalizedProps.width, normalizedProps.height) ? [intWidth, intHeight].join("/") : normalizedProps.aspectRatio ? normalizedProps.aspectRatio : void 0;
      const sizesArray = imageWidths === void 0 ? void 0 : generateSizes(imageWidths, fixedAspectRatio, crop);
      const fixedHeight = intHeight ? intHeight : fixedAspectRatio && intWidth ? intWidth * (parseAspectRatio(fixedAspectRatio) ?? 1) : void 0;
      const srcSet = generateSrcSet(normalizedProps.src, sizesArray, loader);
      const src = loader({
        src: normalizedProps.src,
        width: intWidth,
        height: fixedHeight,
        crop: normalizedProps.height === "auto" ? void 0 : crop
      });
      return {
        width: intWidth,
        aspectRatio: fixedAspectRatio,
        height: fixedHeight,
        srcSet,
        src
      };
    }, [
      aspectRatio,
      crop,
      height,
      imageWidths,
      loader,
      normalizedProps,
      width
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "img",
      {
        ref,
        alt: normalizedProps.alt,
        decoding,
        height: fixed.height,
        loading,
        src: fixed.src,
        srcSet: fixed.srcSet,
        width: fixed.width,
        style: {
          aspectRatio: fixed.aspectRatio,
          ...passthroughProps.style
        },
        ...passthroughProps
      }
    );
  }
);
var FluidImage = React.forwardRef(
  ({
    crop,
    decoding,
    imageWidths,
    loader = shopifyLoader,
    loading,
    normalizedProps,
    passthroughProps,
    placeholderWidth,
    sizes
  }, ref) => {
    const fluid = React.useMemo(() => {
      const sizesArray = imageWidths === void 0 ? void 0 : generateSizes(imageWidths, normalizedProps.aspectRatio, crop);
      const placeholderHeight = normalizedProps.aspectRatio && placeholderWidth ? placeholderWidth * (parseAspectRatio(normalizedProps.aspectRatio) ?? 1) : void 0;
      const srcSet = generateSrcSet(normalizedProps.src, sizesArray, loader);
      const src = loader({
        src: normalizedProps.src,
        width: placeholderWidth,
        height: placeholderHeight,
        crop
      });
      return {
        placeholderHeight,
        srcSet,
        src
      };
    }, [crop, imageWidths, loader, normalizedProps, placeholderWidth]);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "img",
      {
        ref,
        alt: normalizedProps.alt,
        decoding,
        height: fluid.placeholderHeight,
        loading,
        sizes,
        src: fluid.src,
        srcSet: fluid.srcSet,
        width: placeholderWidth,
        ...passthroughProps,
        style: {
          width: normalizedProps.width,
          aspectRatio: normalizedProps.aspectRatio,
          ...passthroughProps.style
        }
      }
    );
  }
);
function shopifyLoader({ src, width, height, crop }) {
  if (!src) {
    return "";
  }
  const url = new URL(src);
  if (width) {
    url.searchParams.append("width", Math.round(width).toString());
  }
  if (height) {
    url.searchParams.append("height", Math.round(height).toString());
  }
  if (crop) {
    url.searchParams.append("crop", crop);
  }
  return url.href;
}
function unitsMatch(width = "100%", height = "auto") {
  return getUnitValueParts(width.toString()).unit === getUnitValueParts(height.toString()).unit;
}
function getUnitValueParts(value) {
  const unit = value.replace(/[0-9.]/g, "");
  const number = parseFloat(value.replace(unit, ""));
  return {
    unit: unit === "" ? number === void 0 ? "auto" : "px" : unit,
    number
  };
}
function getNormalizedFixedUnit(value) {
  if (value === void 0) {
    return;
  }
  const { unit, number } = getUnitValueParts(value.toString());
  switch (unit) {
    case "em":
      return number * 16;
    case "rem":
      return number * 16;
    case "px":
      return number;
    case "":
      return number;
    default:
      return;
  }
}
function isFixedWidth(width) {
  const fixedEndings = /\d(px|em|rem)$/;
  return typeof width === "number" || typeof width === "string" && fixedEndings.test(width);
}
function generateSrcSet(src, sizesArray, loader = shopifyLoader) {
  if (!src) {
    return "";
  }
  if ((sizesArray == null ? void 0 : sizesArray.length) === 0 || !sizesArray) {
    return src;
  }
  return sizesArray.map(
    (size, i) => `${loader({
      src,
      width: size.width,
      height: size.height,
      crop: size.crop
    })} ${sizesArray.length === 3 ? `${i + 1}x` : `${size.width ?? 0}w`}`
  ).join(`, `);
}
function generateImageWidths(width = "100%", intervals, startingWidth, incrementSize) {
  const responsive = Array.from(
    { length: intervals },
    (_2, i) => i * incrementSize + startingWidth
  );
  const fixed = Array.from(
    { length: 3 },
    (_2, i) => (i + 1) * (getNormalizedFixedUnit(width) ?? 0)
  );
  return isFixedWidth(width) ? fixed : responsive;
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio)
    return;
  const [width, height] = aspectRatio.split("/");
  return 1 / (Number(width) / Number(height));
}
function generateSizes(imageWidths, aspectRatio, crop = "center") {
  if (!imageWidths)
    return;
  const sizes = imageWidths.map((width) => {
    return {
      width,
      height: aspectRatio ? width * (parseAspectRatio(aspectRatio) ?? 1) : void 0,
      crop
    };
  });
  return sizes;
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/ShopPayButton.mjs
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);

// node_modules/@shopify/hydrogen-react/dist/browser-prod/load-script.mjs
var import_react3 = __toESM(require_react(), 1);
var SCRIPTS_LOADED = {};
function loadScript(src, options) {
  const isScriptLoaded = SCRIPTS_LOADED[src];
  if (isScriptLoaded) {
    return isScriptLoaded;
  }
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    if (options == null ? void 0 : options.module) {
      script.type = "module";
    } else {
      script.type = "text/javascript";
    }
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(false);
    };
    if ((options == null ? void 0 : options.in) === "head") {
      document.head.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  });
  SCRIPTS_LOADED[src] = promise;
  return promise;
}
function useLoadScript(url, options) {
  const [status, setStatus] = (0, import_react3.useState)("loading");
  const stringifiedOptions = JSON.stringify(options);
  (0, import_react3.useEffect)(() => {
    async function loadScriptWrapper() {
      try {
        setStatus("loading");
        await loadScript(url, options);
        setStatus("done");
      } catch (error) {
        setStatus("error");
      }
    }
    loadScriptWrapper().catch(() => {
      setStatus("error");
    });
  }, [url, stringifiedOptions, options]);
  return status;
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/analytics-utils.mjs
function schemaWrapper(schemaId, payload) {
  return {
    schema_id: schemaId,
    payload,
    metadata: {
      event_created_at_ms: Date.now()
    }
  };
}
function parseGid(gid) {
  const defaultReturn = {
    id: "",
    resource: null,
    resourceId: null,
    search: "",
    searchParams: new URLSearchParams(),
    hash: ""
  };
  if (typeof gid !== "string") {
    return defaultReturn;
  }
  try {
    const { search, searchParams, pathname, hash } = new URL(gid);
    const pathnameParts = pathname.split("/");
    const lastPathnamePart = pathnameParts[pathnameParts.length - 1];
    const resourcePart = pathnameParts[pathnameParts.length - 2];
    if (!lastPathnamePart || !resourcePart) {
      return defaultReturn;
    }
    const id = `${lastPathnamePart}${search}${hash}` || "";
    const resourceId = lastPathnamePart || null;
    const resource = resourcePart ?? null;
    return { id, resource, resourceId, search, searchParams, hash };
  } catch {
    return defaultReturn;
  }
}
function addDataIf(keyValuePairs, formattedData) {
  if (typeof keyValuePairs !== "object") {
    return {};
  }
  Object.entries(keyValuePairs).forEach(([key, value]) => {
    if (value) {
      formattedData[key] = value;
    }
  });
  return formattedData;
}
function errorIfServer(fnName) {
  if (typeof document === "undefined") {
    console.error(
      `${fnName} should only be used within the useEffect callback or event handlers`
    );
    return true;
  }
  return false;
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/ShopPayButton.mjs
var SHOPJS_URL = "https://cdn.shopify.com/shopifycloud/shop-js/v1.0/client.js";
function ShopPayButton({
  variantIds,
  className,
  variantIdsAndQuantities,
  width,
  storeDomain: _storeDomain
}) {
  const shop = useShop();
  const storeDomain = _storeDomain || (shop == null ? void 0 : shop.storeDomain);
  const shopPayLoadedStatus = useLoadScript(SHOPJS_URL);
  let ids = [];
  if (!storeDomain || storeDomain === defaultShopifyContext.storeDomain) {
    throw new Error(MissingStoreDomainErrorMessage);
  }
  if (variantIds && variantIdsAndQuantities) {
    throw new Error(DoublePropsErrorMessage);
  }
  if (!variantIds && !variantIdsAndQuantities) {
    throw new Error(MissingPropsErrorMessage);
  }
  if (variantIds) {
    ids = variantIds.reduce((prev, curr) => {
      const bareId = parseGid(curr).id;
      if (bareId) {
        prev.push(bareId);
      }
      return prev;
    }, []);
  } else if (variantIdsAndQuantities) {
    ids = variantIdsAndQuantities.reduce((prev, curr) => {
      const bareId = parseGid(curr == null ? void 0 : curr.id).id;
      if (bareId) {
        prev.push(`${bareId}:${(curr == null ? void 0 : curr.quantity) ?? 1}`);
      }
      return prev;
    }, []);
  } else {
    throw new Error(MissingPropsErrorMessage);
  }
  if (ids.length === 0) {
    throw new Error(InvalidPropsErrorMessage);
  }
  const style = width ? {
    "--shop-pay-button-width": width
  } : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className, style, children: shopPayLoadedStatus === "done" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("shop-pay-button", { "store-url": storeDomain, variants: ids.join(",") }) });
}
var MissingStoreDomainErrorMessage = 'You must pass a "storeDomain" prop to the "ShopPayButton" component, or wrap it in a "ShopifyProvider" component.';
var InvalidPropsErrorMessage = `You must pass in "variantIds" in the form of ["gid://shopify/ProductVariant/1"]`;
var MissingPropsErrorMessage = `You must pass in either "variantIds" or "variantIdsAndQuantities" to ShopPayButton`;
var DoublePropsErrorMessage = `You must provide either a variantIds or variantIdsAndQuantities prop, but not both in the ShopPayButton component`;

// node_modules/@shopify/hydrogen-react/dist/browser-prod/cart-constants.mjs
var SHOPIFY_Y = "_shopify_y";
var SHOPIFY_S = "_shopify_s";

// node_modules/@shopify/hydrogen-react/dist/browser-prod/cookies-utils.mjs
var tokenHash = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
function buildUUID() {
  let hash = "";
  try {
    const crypto2 = window.crypto;
    const randomValuesArray = new Uint16Array(31);
    crypto2.getRandomValues(randomValuesArray);
    let i = 0;
    hash = tokenHash.replace(/[x]/g, (c) => {
      const r = randomValuesArray[i] % 16;
      const v = c === "x" ? r : r & 3 | 8;
      i++;
      return v.toString(16);
    }).toUpperCase();
  } catch (err) {
    hash = tokenHash.replace(/[x]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    }).toUpperCase();
  }
  return `${hexTime()}-${hash}`;
}
function hexTime() {
  let dateNumber = 0;
  let perfNumber = 0;
  dateNumber = (/* @__PURE__ */ new Date()).getTime() >>> 0;
  try {
    perfNumber = performance.now() >>> 0;
  } catch (err) {
    perfNumber = 0;
  }
  const output = Math.abs(dateNumber + perfNumber).toString(16).toLowerCase();
  return output.padStart(8, "0");
}
function getShopifyCookies(cookies) {
  const cookieData = u(cookies);
  return {
    [SHOPIFY_Y]: cookieData[SHOPIFY_Y] || "",
    [SHOPIFY_S]: cookieData[SHOPIFY_S] || ""
  };
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/analytics-schema-trekkie-storefront-page-view.mjs
var SCHEMA_ID = "trekkie_storefront_page_view/1.4";
var OXYGEN_DOMAIN = "myshopify.dev";
function pageView(payload) {
  const pageViewPayload = payload;
  const { id, resource } = parseGid(pageViewPayload.resourceId);
  const resourceType = resource ? resource.toLowerCase() : void 0;
  return [
    schemaWrapper(
      SCHEMA_ID,
      addDataIf(
        {
          pageType: pageViewPayload.pageType,
          customerId: pageViewPayload.customerId,
          resourceType,
          resourceId: parseInt(id)
        },
        formatPayload(pageViewPayload)
      )
    )
  ];
}
function formatPayload(payload) {
  return {
    appClientId: payload.shopifySalesChannel ? ShopifyAppId[payload.shopifySalesChannel] : ShopifyAppId.headless,
    isMerchantRequest: isMerchantRequest(payload.url),
    hydrogenSubchannelId: payload.storefrontId || "0",
    isPersistentCookie: payload.hasUserConsent,
    uniqToken: payload.uniqueToken,
    visitToken: payload.visitToken,
    microSessionId: buildUUID(),
    microSessionCount: 1,
    url: payload.url,
    path: payload.path,
    search: payload.search,
    referrer: payload.referrer,
    title: payload.title,
    shopId: parseInt(parseGid(payload.shopId).id),
    currency: payload.currency,
    contentLanguage: payload.acceptedLanguage || "en"
  };
}
function isMerchantRequest(url) {
  if (typeof url !== "string") {
    return false;
  }
  const hostname = new URL(url).hostname;
  if (hostname.indexOf(OXYGEN_DOMAIN) !== -1 || hostname === "localhost") {
    return true;
  }
  return false;
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/analytics-schema-custom-storefront-customer-tracking.mjs
var SCHEMA_ID2 = "custom_storefront_customer_tracking/1.0";
var PAGE_RENDERED_EVENT_NAME = "page_rendered";
var COLLECTION_PAGE_RENDERED_EVENT_NAME = "collection_page_rendered";
var PRODUCT_PAGE_RENDERED_EVENT_NAME = "product_page_rendered";
var PRODUCT_ADDED_TO_CART_EVENT_NAME = "product_added_to_cart";
var SEARCH_SUBMITTED_EVENT_NAME = "search_submitted";
function pageView2(payload) {
  const pageViewPayload = payload;
  const additionalPayload = {
    canonical_url: pageViewPayload.canonicalUrl || pageViewPayload.url,
    customer_id: pageViewPayload.customerId
  };
  const pageType = pageViewPayload.pageType;
  const pageViewEvents = [];
  pageViewEvents.push(
    schemaWrapper(
      SCHEMA_ID2,
      addDataIf(
        {
          event_name: PAGE_RENDERED_EVENT_NAME,
          ...additionalPayload
        },
        formatPayload2(pageViewPayload)
      )
    )
  );
  switch (pageType) {
    case AnalyticsPageType.collection:
      pageViewEvents.push(
        schemaWrapper(
          SCHEMA_ID2,
          addDataIf(
            {
              event_name: COLLECTION_PAGE_RENDERED_EVENT_NAME,
              ...additionalPayload,
              collection_name: pageViewPayload.collectionHandle
            },
            formatPayload2(pageViewPayload)
          )
        )
      );
      break;
    case AnalyticsPageType.product:
      pageViewEvents.push(
        schemaWrapper(
          SCHEMA_ID2,
          addDataIf(
            {
              event_name: PRODUCT_PAGE_RENDERED_EVENT_NAME,
              ...additionalPayload,
              products: formatProductPayload(pageViewPayload.products),
              total_value: pageViewPayload.totalValue
            },
            formatPayload2(pageViewPayload)
          )
        )
      );
      break;
    case AnalyticsPageType.search:
      pageViewEvents.push(
        schemaWrapper(
          SCHEMA_ID2,
          addDataIf(
            {
              event_name: SEARCH_SUBMITTED_EVENT_NAME,
              ...additionalPayload,
              search_string: pageViewPayload.searchString
            },
            formatPayload2(pageViewPayload)
          )
        )
      );
      break;
  }
  return pageViewEvents;
}
function addToCart(payload) {
  const addToCartPayload = payload;
  const cartToken = parseGid(addToCartPayload.cartId);
  const cart_token = (cartToken == null ? void 0 : cartToken.id) ? `${cartToken.id}` : null;
  return [
    schemaWrapper(
      SCHEMA_ID2,
      addDataIf(
        {
          event_name: PRODUCT_ADDED_TO_CART_EVENT_NAME,
          customerId: addToCartPayload.customerId,
          cart_token,
          total_value: addToCartPayload.totalValue,
          products: formatProductPayload(addToCartPayload.products)
        },
        formatPayload2(addToCartPayload)
      )
    )
  ];
}
function formatPayload2(payload) {
  return {
    source: payload.shopifySalesChannel || ShopifySalesChannel.headless,
    hydrogenSubchannelId: payload.storefrontId || "0",
    is_persistent_cookie: payload.hasUserConsent,
    ccpa_enforced: false,
    gdpr_enforced: false,
    unique_token: payload.uniqueToken,
    event_time: Date.now(),
    event_id: buildUUID(),
    event_source_url: payload.url,
    referrer: payload.referrer,
    user_agent: payload.userAgent,
    navigation_type: payload.navigationType,
    navigation_api: payload.navigationApi,
    shop_id: parseInt(parseGid(payload.shopId).id),
    currency: payload.currency
  };
}
function formatProductPayload(products) {
  return products ? products.map((p) => {
    const product = addDataIf(
      {
        variant_gid: p.variantGid,
        category: p.category,
        sku: p.sku,
        product_id: parseInt(parseGid(p.productGid).id),
        variant_id: parseInt(parseGid(p.variantGid).id)
      },
      {
        product_gid: p.productGid,
        name: p.name,
        variant: p.variantName || "",
        brand: p.brand,
        price: parseFloat(p.price),
        quantity: Number(p.quantity || 0)
      }
    );
    return JSON.stringify(product);
  }) : [];
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/analytics.mjs
function sendShopifyAnalytics(event, shopDomain) {
  const { eventName, payload } = event;
  if (!payload.hasUserConsent)
    return Promise.resolve();
  let events = [];
  if (eventName === AnalyticsEventName.PAGE_VIEW) {
    const pageViewPayload = payload;
    events = events.concat(
      pageView(pageViewPayload),
      pageView2(pageViewPayload)
    );
  } else if (eventName === AnalyticsEventName.ADD_TO_CART) {
    events = events.concat(
      addToCart(payload)
    );
  }
  if (events.length) {
    return sendToShopify(events, shopDomain);
  } else {
    return Promise.resolve();
  }
}
var ERROR_MESSAGE = "sendShopifyAnalytics request is unsuccessful";
function sendToShopify(events, shopDomain) {
  const eventsToBeSent = {
    events,
    metadata: {
      event_sent_at_ms: Date.now()
    }
  };
  try {
    return fetch(
      shopDomain ? `https://${shopDomain}/.well-known/shopify/monorail/unstable/produce_batch` : "https://monorail-edge.shopifysvc.com/unstable/produce_batch",
      {
        method: "post",
        headers: {
          "content-type": "text/plain"
        },
        body: JSON.stringify(eventsToBeSent)
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Response failed");
      }
      return response.text();
    }).then((data) => {
      if (data) {
        const jsonResponse = JSON.parse(data);
        jsonResponse.result.forEach((eventResponse) => {
          if (eventResponse.status !== 200) {
            console.error(ERROR_MESSAGE, "\n\n", eventResponse.message);
          }
        });
      }
    }).catch((err) => {
      console.error(ERROR_MESSAGE, err);
      if (false)
        ;
    });
  } catch (error) {
    return Promise.resolve();
  }
}
function getClientBrowserParameters() {
  if (errorIfServer("getClientBrowserParameters")) {
    return {
      uniqueToken: "",
      visitToken: "",
      url: "",
      path: "",
      search: "",
      referrer: "",
      title: "",
      userAgent: "",
      navigationType: "",
      navigationApi: ""
    };
  }
  const [navigationType, navigationApi] = getNavigationType();
  const cookies = getShopifyCookies(document.cookie);
  return {
    uniqueToken: cookies[SHOPIFY_Y],
    visitToken: cookies[SHOPIFY_S],
    url: location.href,
    path: location.pathname,
    search: location.search,
    referrer: document.referrer,
    title: document.title,
    userAgent: navigator.userAgent,
    navigationType,
    navigationApi
  };
}
function getNavigationTypeExperimental() {
  try {
    const navigationEntries = (performance == null ? void 0 : performance.getEntriesByType) && (performance == null ? void 0 : performance.getEntriesByType("navigation"));
    if (navigationEntries && navigationEntries[0]) {
      const rawType = window.performance.getEntriesByType(
        "navigation"
      )[0]["type"];
      const navType = rawType && rawType.toString();
      return navType;
    }
  } catch (err) {
  }
  return void 0;
}
function getNavigationTypeLegacy() {
  var _a, _b;
  try {
    if (PerformanceNavigation && ((_a = performance == null ? void 0 : performance.navigation) == null ? void 0 : _a.type) !== null && ((_b = performance == null ? void 0 : performance.navigation) == null ? void 0 : _b.type) !== void 0) {
      const rawType = performance.navigation.type;
      switch (rawType) {
        case PerformanceNavigation.TYPE_NAVIGATE:
          return "navigate";
          break;
        case PerformanceNavigation.TYPE_RELOAD:
          return "reload";
          break;
        case PerformanceNavigation.TYPE_BACK_FORWARD:
          return "back_forward";
          break;
        default:
          return `unknown: ${rawType}`;
      }
    }
  } catch (err) {
  }
  return void 0;
}
function getNavigationType() {
  try {
    let navApi = "PerformanceNavigationTiming";
    let navType = getNavigationTypeExperimental();
    if (!navType) {
      navType = getNavigationTypeLegacy();
      navApi = "performance.navigation";
    }
    if (navType) {
      return [navType, navApi];
    } else {
      return ["unknown", "unknown"];
    }
  } catch (err) {
  }
  return ["error", "error"];
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/ExternalVideo.mjs
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function ExternalVideo(props) {
  const {
    data,
    options,
    id = data.id,
    frameBorder = "0",
    allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen = true,
    loading = "lazy",
    ...passthroughProps
  } = props;
  if (!data.embedUrl) {
    throw new Error(`<ExternalVideo/> requires the 'embedUrl' property`);
  }
  let finalUrl = data.embedUrl;
  if (options) {
    const urlObject = new URL(data.embedUrl);
    for (const key of Object.keys(options)) {
      urlObject.searchParams.set(key, options[key]);
    }
    finalUrl = urlObject.toString();
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "iframe",
    {
      ...passthroughProps,
      id: id ?? data.embedUrl,
      title: data.alt ?? data.id ?? "external video",
      frameBorder,
      allow,
      allowFullScreen,
      src: finalUrl,
      loading
    }
  );
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/MediaFile.mjs
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);

// node_modules/@shopify/hydrogen-react/dist/browser-prod/Video.mjs
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var import_react4 = __toESM(require_react(), 1);
function Video(props) {
  var _a;
  const {
    data,
    previewImageOptions,
    id = data.id,
    playsInline = true,
    controls = true,
    sourceProps = {},
    ...passthroughProps
  } = props;
  const posterUrl = shopifyLoader({
    src: ((_a = data.previewImage) == null ? void 0 : _a.url) ?? "",
    ...previewImageOptions
  });
  if (!data.sources) {
    throw new Error(`<Video/> requires a 'data.sources' array`);
  }
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "video",
      {
        ...passthroughProps,
        id,
        playsInline,
        controls,
        poster: posterUrl,
        children: data.sources.map((source) => {
          if (!((source == null ? void 0 : source.url) && (source == null ? void 0 : source.mimeType))) {
            throw new Error(`<Video/> needs 'source.url' and 'source.mimeType'`);
          }
          return /* @__PURE__ */ (0, import_react4.createElement)(
            "source",
            {
              ...sourceProps,
              key: source.url,
              src: source.url,
              type: source.mimeType
            }
          );
        })
      }
    )
  );
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/ModelViewer.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var import_react5 = __toESM(require_react(), 1);
function ModelViewer(props) {
  var _a, _b, _c;
  const [modelViewer, setModelViewer] = (0, import_react5.useState)(
    void 0
  );
  const callbackRef = (0, import_react5.useCallback)((node) => {
    setModelViewer(node);
  }, []);
  const { data, children, className, ...passthroughProps } = props;
  const modelViewerLoadedStatus = useLoadScript(
    "https://unpkg.com/@google/model-viewer@v1.12.1/dist/model-viewer.min.js",
    {
      module: true
    }
  );
  (0, import_react5.useEffect)(() => {
    if (!modelViewer) {
      return;
    }
    if (passthroughProps.onError)
      modelViewer.addEventListener("error", passthroughProps.onError);
    if (passthroughProps.onLoad)
      modelViewer.addEventListener("load", passthroughProps.onLoad);
    if (passthroughProps.onPreload)
      modelViewer.addEventListener("preload", passthroughProps.onPreload);
    if (passthroughProps.onModelVisibility)
      modelViewer.addEventListener(
        "model-visibility",
        passthroughProps.onModelVisibility
      );
    if (passthroughProps.onProgress)
      modelViewer.addEventListener("progress", passthroughProps.onProgress);
    if (passthroughProps.onArStatus)
      modelViewer.addEventListener("ar-status", passthroughProps.onArStatus);
    if (passthroughProps.onArTracking)
      modelViewer.addEventListener(
        "ar-tracking",
        passthroughProps.onArTracking
      );
    if (passthroughProps.onQuickLookButtonTapped)
      modelViewer.addEventListener(
        "quick-look-button-tapped",
        passthroughProps.onQuickLookButtonTapped
      );
    if (passthroughProps.onCameraChange)
      modelViewer.addEventListener(
        "camera-change",
        passthroughProps.onCameraChange
      );
    if (passthroughProps.onEnvironmentChange)
      modelViewer.addEventListener(
        "environment-change",
        passthroughProps.onEnvironmentChange
      );
    if (passthroughProps.onPlay)
      modelViewer.addEventListener("play", passthroughProps.onPlay);
    if (passthroughProps.onPause)
      modelViewer.addEventListener("ar-status", passthroughProps.onPause);
    if (passthroughProps.onSceneGraphReady)
      modelViewer.addEventListener(
        "scene-graph-ready",
        passthroughProps.onSceneGraphReady
      );
    return () => {
      if (modelViewer == null) {
        return;
      }
      if (passthroughProps.onError)
        modelViewer.removeEventListener("error", passthroughProps.onError);
      if (passthroughProps.onLoad)
        modelViewer.removeEventListener("load", passthroughProps.onLoad);
      if (passthroughProps.onPreload)
        modelViewer.removeEventListener("preload", passthroughProps.onPreload);
      if (passthroughProps.onModelVisibility)
        modelViewer.removeEventListener(
          "model-visibility",
          passthroughProps.onModelVisibility
        );
      if (passthroughProps.onProgress)
        modelViewer.removeEventListener(
          "progress",
          passthroughProps.onProgress
        );
      if (passthroughProps.onArStatus)
        modelViewer.removeEventListener(
          "ar-status",
          passthroughProps.onArStatus
        );
      if (passthroughProps.onArTracking)
        modelViewer.removeEventListener(
          "ar-tracking",
          passthroughProps.onArTracking
        );
      if (passthroughProps.onQuickLookButtonTapped)
        modelViewer.removeEventListener(
          "quick-look-button-tapped",
          passthroughProps.onQuickLookButtonTapped
        );
      if (passthroughProps.onCameraChange)
        modelViewer.removeEventListener(
          "camera-change",
          passthroughProps.onCameraChange
        );
      if (passthroughProps.onEnvironmentChange)
        modelViewer.removeEventListener(
          "environment-change",
          passthroughProps.onEnvironmentChange
        );
      if (passthroughProps.onPlay)
        modelViewer.removeEventListener("play", passthroughProps.onPlay);
      if (passthroughProps.onPause)
        modelViewer.removeEventListener("ar-status", passthroughProps.onPause);
      if (passthroughProps.onSceneGraphReady)
        modelViewer.removeEventListener(
          "scene-graph-ready",
          passthroughProps.onSceneGraphReady
        );
    };
  }, [
    modelViewer,
    passthroughProps.onArStatus,
    passthroughProps.onArTracking,
    passthroughProps.onCameraChange,
    passthroughProps.onEnvironmentChange,
    passthroughProps.onError,
    passthroughProps.onLoad,
    passthroughProps.onModelVisibility,
    passthroughProps.onPause,
    passthroughProps.onPlay,
    passthroughProps.onPreload,
    passthroughProps.onProgress,
    passthroughProps.onQuickLookButtonTapped,
    passthroughProps.onSceneGraphReady
  ]);
  if (modelViewerLoadedStatus !== "done") {
    return null;
  }
  if (!((_b = (_a = data.sources) == null ? void 0 : _a[0]) == null ? void 0 : _b.url)) {
    const sourcesUrlError = `<ModelViewer/> requires 'data.sources' prop to be an array, with an object that has a property 'url' on it. Rendering 'null'`;
    {
      console.error(sourcesUrlError);
      return null;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "model-viewer",
    {
      ref: callbackRef,
      ...passthroughProps,
      class: className,
      id: passthroughProps.id ?? data.id,
      src: data.sources[0].url,
      alt: data.alt ?? null,
      "camera-controls": passthroughProps.cameraControls ?? true,
      poster: (passthroughProps.poster || ((_c = data.previewImage) == null ? void 0 : _c.url)) ?? null,
      autoplay: passthroughProps.autoplay ?? true,
      loading: passthroughProps.loading,
      reveal: passthroughProps.reveal,
      ar: passthroughProps.ar,
      "ar-modes": passthroughProps.arModes,
      "ar-scale": passthroughProps.arScale,
      "ar-placement": passthroughProps.arPlacement,
      "ios-src": passthroughProps.iosSrc,
      "touch-action": passthroughProps.touchAction,
      "disable-zoom": passthroughProps.disableZoom,
      "orbit-sensitivity": passthroughProps.orbitSensitivity,
      "auto-rotate": passthroughProps.autoRotate,
      "auto-rotate-delay": passthroughProps.autoRotateDelay,
      "rotation-per-second": passthroughProps.rotationPerSecond,
      "interaction-policy": passthroughProps.interactionPolicy,
      "interaction-prompt": passthroughProps.interactionPrompt,
      "interaction-prompt-style": passthroughProps.interactionPromptStyle,
      "interaction-prompt-threshold": passthroughProps.interactionPromptThreshold,
      "camera-orbit": passthroughProps.cameraOrbit,
      "camera-target": passthroughProps.cameraTarget,
      "field-of-view": passthroughProps.fieldOfView,
      "max-camera-orbit": passthroughProps.maxCameraOrbit,
      "min-camera-orbit": passthroughProps.minCameraOrbit,
      "max-field-of-view": passthroughProps.maxFieldOfView,
      "min-field-of-view": passthroughProps.minFieldOfView,
      bounds: passthroughProps.bounds,
      "interpolation-decay": passthroughProps.interpolationDecay ?? 100,
      "skybox-image": passthroughProps.skyboxImage,
      "environment-image": passthroughProps.environmentImage,
      exposure: passthroughProps.exposure,
      "shadow-intensity": passthroughProps.shadowIntensity ?? 0,
      "shadow-softness": passthroughProps.shadowSoftness ?? 0,
      "animation-name": passthroughProps.animationName,
      "animation-crossfade-duration": passthroughProps.animationCrossfadeDuration,
      "variant-name": passthroughProps.variantName,
      orientation: passthroughProps.orientation,
      scale: passthroughProps.scale,
      children
    }
  );
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/MediaFile.mjs
function MediaFile({
  data,
  mediaOptions,
  ...passthroughProps
}) {
  switch (data.__typename) {
    case "MediaImage": {
      if (!data.image) {
        const noDataImage = `<MediaFile/>: 'data.image' does not exist for __typename of 'MediaImage'; rendering 'null' by default.`;
        {
          console.warn(noDataImage);
          return null;
        }
      }
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        Image,
        {
          ...passthroughProps,
          ...mediaOptions == null ? void 0 : mediaOptions.image,
          data: data.image
        }
      );
    }
    case "Video": {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Video, { ...passthroughProps, ...mediaOptions == null ? void 0 : mediaOptions.video, data });
    }
    case "ExternalVideo": {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        ExternalVideo,
        {
          ...passthroughProps,
          ...mediaOptions == null ? void 0 : mediaOptions.externalVideo,
          data
        }
      );
    }
    case "Model3d": {
      return (
        // @ts-expect-error There are issues with the inferred HTML attribute types here for ModelViewer (and contentEditable), but I think that's a little bit beyond me at the moment
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          ModelViewer,
          {
            ...passthroughProps,
            ...mediaOptions == null ? void 0 : mediaOptions.modelViewer,
            data
          }
        )
      );
    }
    default: {
      const typenameMissingMessage = `<MediaFile /> requires the '__typename' property to exist on the 'data' prop in order to render the matching sub-component for this type of media.`;
      {
        console.error(`${typenameMissingMessage}  Rendering 'null' by default`);
        return null;
      }
    }
  }
}

// node_modules/@shopify/hydrogen-react/dist/browser-prod/useShopifyCookies.mjs
var import_react6 = __toESM(require_react(), 1);
var longTermLength = 60 * 60 * 24 * 360 * 1;
var shortTermLength = 60 * 30;
function useShopifyCookies(options) {
  const { hasUserConsent = false, domain = "" } = options || {};
  (0, import_react6.useEffect)(() => {
    const cookies = getShopifyCookies(document.cookie);
    if (hasUserConsent) {
      setCookie(
        SHOPIFY_Y,
        cookies[SHOPIFY_Y] || buildUUID(),
        longTermLength,
        domain
      );
      setCookie(
        SHOPIFY_S,
        cookies[SHOPIFY_S] || buildUUID(),
        shortTermLength,
        domain
      );
    } else {
      setCookie(SHOPIFY_Y, "", 0, domain);
      setCookie(SHOPIFY_S, "", 0, domain);
    }
  });
}
function setCookie(name, value, maxage, domain) {
  document.cookie = l(name, value, {
    maxage,
    domain,
    samesite: "Lax",
    path: "/"
  });
}

// node_modules/@shopify/hydrogen/dist/production/index.js
var import_react7 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var import_content_security_policy_builder = __toESM(require_dist(), 1);
var A = "Error in SEO input: ";
var N = { title: { validate: (e) => {
  if (typeof e != "string")
    throw new Error(A.concat("`title` should be a string"));
  if (typeof e == "string" && e.length > 120)
    throw new Error(A.concat("`title` should not be longer than 120 characters"));
  return e;
} }, description: { validate: (e) => {
  if (typeof e != "string")
    throw new Error(A.concat("`description` should be a string"));
  if (typeof e == "string" && e.length > 155)
    throw new Error(A.concat("`description` should not be longer than 155 characters"));
  return e;
} }, url: { validate: (e) => {
  if (typeof e != "string")
    throw new Error(A.concat("`url` should be a string"));
  if (typeof e == "string" && !e.startsWith("http"))
    throw new Error(A.concat("`url` should be a valid URL"));
  return e;
} }, handle: { validate: (e) => {
  if (typeof e != "string")
    throw new Error(A.concat("`handle` should be a string"));
  if (typeof e == "string" && !e.startsWith("@"))
    throw new Error(A.concat("`handle` should start with `@`"));
  return e;
} } };
function Ne(e) {
  let t = [];
  for (let r of Object.keys(e))
    switch (r) {
      case "title": {
        let a = F(N.title, e.title), n = St(e?.titleTemplate, a);
        if (!n)
          break;
        t.push(S("title", { title: n }), S("meta", { property: "og:title", content: n }), S("meta", { name: "twitter:title", content: n }));
        break;
      }
      case "description": {
        let a = F(N.description, e.description);
        if (!a)
          break;
        t.push(S("meta", { name: "description", content: a }), S("meta", { property: "og:description", content: a }), S("meta", { name: "twitter:description", content: a }));
        break;
      }
      case "url": {
        let a = F(N.url, e.url);
        if (!a)
          break;
        t.push(S("link", { rel: "canonical", href: a }), S("meta", { property: "og:url", content: a }));
        break;
      }
      case "handle": {
        let a = F(N.handle, e.handle);
        if (!a)
          break;
        t.push(S("meta", { name: "twitter:site", content: a }), S("meta", { name: "twitter:creator", content: a }));
        break;
      }
      case "media": {
        let a, n = re(e.media);
        for (let o of n)
          if (typeof o == "string" && t.push(S("meta", { name: "og:image", content: o })), o && typeof o == "object") {
            let i = o.type || "image", s = o ? { url: o?.url, secure_url: o?.url, type: It(o.url), width: o?.width, height: o?.height, alt: o?.altText } : {};
            for (let u2 of Object.keys(s))
              s[u2] && (a = s[u2], t.push(S("meta", { property: `og:${i}:${u2}`, content: a }, s.url)));
          }
        break;
      }
      case "jsonLd": {
        let a = re(e.jsonLd), n = 0;
        for (let o of a) {
          if (typeof o != "object")
            continue;
          let i = S("script", { type: "application/ld+json", children: JSON.stringify(o) }, `json-ld-${o?.["@type"] || o?.name || n++}`);
          t.push(i);
        }
        break;
      }
      case "alternates": {
        let a = re(e.alternates);
        for (let n of a) {
          if (!n)
            continue;
          let { language: o, url: i, default: s } = n, u2 = o ? `${o}${s ? "-default" : ""}` : void 0;
          t.push(S("link", { rel: "alternate", hrefLang: u2, href: i }));
        }
        break;
      }
      case "robots": {
        if (!e.robots)
          break;
        let { maxImagePreview: a, maxSnippet: n, maxVideoPreview: o, noArchive: i, noFollow: s, noImageIndex: u2, noIndex: d, noSnippet: c, noTranslate: p, unavailableAfter: y } = e.robots, h = [i && "noarchive", u2 && "noimageindex", c && "nosnippet", p && "notranslate", a && `max-image-preview:${a}`, n && `max-snippet:${n}`, o && `max-video-preview:${o}`, y && `unavailable_after:${y}`], I = (d ? "noindex" : "index") + "," + (s ? "nofollow" : "follow");
        for (let l2 of h)
          l2 && (I += `,${l2}`);
        t.push(S("meta", { name: "robots", content: I }));
        break;
      }
    }
  return t.flat().sort((r, a) => r.key.localeCompare(a.key));
}
function S(e, t, r) {
  let a = { tag: e, props: {}, key: "" };
  return e === "title" ? (a.children = t.title, a.key = te(a), a) : e === "script" ? (a.children = typeof t.children == "string" ? t.children : "", a.key = te(a, r), delete t.children, a.props = t, a) : (a.props = t, Object.keys(a.props).forEach((n) => !a.props[n] && delete a.props[n]), a.key = te(a, r), a);
}
function te(e, t) {
  let { tag: r, props: a } = e;
  if (r === "title")
    return "0-title";
  if (r === "meta") {
    let n = a.content === t && typeof a.property == "string" && !a.property.endsWith("secure_url") && "0";
    return [r, ...[t, n], a.property || a.name].filter((i) => i).join("-");
  }
  return r === "link" ? [r, a.rel, a.hrefLang || a.media].filter((o) => o).join("-").replace(/\s+/g, "-") : r === "script" ? `${r}-${t}` : `${r}-${a.type}`;
}
function St(e, t) {
  if (t)
    return e ? typeof e == "function" ? e(t) : e.replace("%s", t ?? "") : t;
}
function It(e) {
  switch (e && e.split(".").pop()) {
    case "svg":
      return "image/svg+xml";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "swf":
      return "application/x-shockwave-flash";
    case "mp3":
      return "audio/mpeg";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}
function re(e) {
  return Array.isArray(e) ? e : [e];
}
function F(e, t) {
  try {
    return e.validate(t);
  } catch (r) {
    return console.warn(r.message), t;
  }
}
var Ot = (0, import_react7.lazy)(() => import("/build/_shared/log-seo-tags-TY72EQWZ-G6FBB7A6.js"));
function bt({ debug: e }) {
  let t = useMatches(), r = useLocation(), a = (0, import_react7.useMemo)(() => t.flatMap((i) => {
    let { handle: s, ...u2 } = i, d = { ...u2, ...r }, c = s?.seo, p = u2?.data?.seo;
    return !c && !p ? [] : c ? $(s.seo, d) : [p];
  }).reduce((i, s) => {
    Object.keys(s).forEach((d) => !s[d] && delete s[d]);
    let { jsonLd: u2 } = s;
    return u2 ? i?.jsonLd ? Array.isArray(u2) ? { ...i, ...s, jsonLd: [...i.jsonLd, ...u2] } : { ...i, ...s, jsonLd: [...i.jsonLd, u2] } : { ...i, ...s, jsonLd: [u2] } : { ...i, ...s };
  }, {}), [t, r]), { html: n, loggerMarkup: o } = (0, import_react7.useMemo)(() => {
    let i = Ne(a), s = i.map((d) => d.tag === "script" ? (0, import_react7.createElement)(d.tag, { ...d.props, key: d.key, dangerouslySetInnerHTML: { __html: d.children } }) : (0, import_react7.createElement)(d.tag, { ...d.props, key: d.key }, d.children)), u2 = (0, import_react7.createElement)(import_react7.Suspense, { fallback: null }, (0, import_react7.createElement)(Ot, { headTags: i }));
    return { html: s, loggerMarkup: u2 };
  }, [a]);
  return (0, import_react7.createElement)(import_react7.Fragment, null, n, e && o);
}
function $(e, ...t) {
  if (e instanceof Function)
    return $(e(...t), ...t);
  let r = {};
  return Array.isArray(e) ? (r = e.reduce((a, n) => [...a, $(n)], []), r) : e instanceof Object ? (Object.entries(e).forEach(([n, o]) => {
    r[n] = $(o, ...t);
  }), r) : e;
}
function vt({ connection: e, children: t = () => (console.warn("<Pagination> requires children to work properly"), null) }) {
  let a = useNavigation().state === "loading", { endCursor: n, hasNextPage: o, hasPreviousPage: i, nextPageUrl: s, nodes: u2, previousPageUrl: d, startCursor: c } = Lt(e), p = (0, import_react7.useMemo)(() => ({ pageInfo: { endCursor: n, hasPreviousPage: i, startCursor: c }, nodes: u2 }), [n, i, c, u2]), y = (0, import_react7.useMemo)(() => function(l2) {
    return o ? (0, import_react7.createElement)(Link, { preventScrollReset: true, ...l2, to: s, state: p, replace: true }) : null;
  }, [o, s, p]), h = (0, import_react7.useMemo)(() => function(l2) {
    return i ? (0, import_react7.createElement)(Link, { preventScrollReset: true, ...l2, to: d, state: p, replace: true }) : null;
  }, [i, d, p]);
  return t({ state: p, hasNextPage: o, hasPreviousPage: i, isLoading: a, nextPageUrl: s, nodes: u2, previousPageUrl: d, NextLink: y, PreviousLink: h });
}
function _(e) {
  let t = new URLSearchParams(e);
  return t.delete("cursor"), t.delete("direction"), t.toString();
}
function D(e) {
  throw new Error(`The Pagination component requires ${"`" + e + "`"} to be a part of your query. See the guide on how to setup your query to include ${"`" + e + "`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`);
}
function Lt(e) {
  e.pageInfo || D("pageInfo"), typeof e.pageInfo.startCursor > "u" && D("pageInfo.startCursor"), typeof e.pageInfo.endCursor > "u" && D("pageInfo.endCursor"), typeof e.pageInfo.hasNextPage > "u" && D("pageInfo.hasNextPage"), typeof e.pageInfo.hasPreviousPage > "u" && D("pageInfo.hasPreviousPage");
  let t = useNavigate(), { state: r, search: a, pathname: n } = useLocation(), s = new URLSearchParams(a).get("direction") === "previous", [u2, d] = (0, import_react7.useState)(flattenConnection(e)), [c, p] = (0, import_react7.useState)({ startCursor: e.pageInfo.startCursor, endCursor: e.pageInfo.endCursor, hasPreviousPage: e.pageInfo.hasPreviousPage, hasNextPage: e.pageInfo.hasNextPage }), y = (0, import_react7.useRef)({ params: _(a), pathname: n });
  (0, import_react7.useEffect)(() => {
    if (_(a) !== y.current.params || n !== y.current.pathname)
      y.current = { pathname: n, params: _(a) }, t(`${n}?${_(a)}`, { replace: true, preventScrollReset: true, state: { nodes: void 0, pageInfo: void 0 } });
    else if (r?.nodes) {
      if (d(s ? [...flattenConnection(e), ...r.nodes] : [...r.nodes, ...flattenConnection(e)]), r?.pageInfo) {
        let l2 = r?.pageInfo?.startCursor === void 0 ? e.pageInfo.startCursor : r.pageInfo.startCursor, C = r?.pageInfo?.endCursor === void 0 ? e.pageInfo.endCursor : r.pageInfo.endCursor, f = r?.pageInfo?.hasPreviousPage === void 0 ? e.pageInfo.hasPreviousPage : r.pageInfo.hasPreviousPage, R = r?.pageInfo?.hasNextPage === void 0 ? e.pageInfo.hasNextPage : r.pageInfo.hasNextPage;
        s ? (l2 = e.pageInfo.startCursor, f = e.pageInfo.hasPreviousPage) : (C = e.pageInfo.endCursor, R = e.pageInfo.hasNextPage), p({ startCursor: l2, endCursor: C, hasPreviousPage: f, hasNextPage: R });
      }
    } else
      d(flattenConnection(e)), p({ startCursor: e.pageInfo.startCursor, endCursor: e.pageInfo.endCursor, hasPreviousPage: e.pageInfo.hasPreviousPage, hasNextPage: e.pageInfo.hasNextPage });
  }, [r, e, s, a, t, n]);
  let h = (0, import_react7.useMemo)(() => {
    let l2 = new URLSearchParams(a);
    return l2.set("direction", "previous"), c.startCursor && l2.set("cursor", c.startCursor), `?${l2.toString()}`;
  }, [a, c.startCursor]), I = (0, import_react7.useMemo)(() => {
    let l2 = new URLSearchParams(a);
    return l2.set("direction", "next"), c.endCursor && l2.set("cursor", c.endCursor), `?${l2.toString()}`;
  }, [a, c.endCursor]);
  return { ...c, previousPageUrl: h, nextPageUrl: I, nodes: u2 };
}
var ke = "cartFormInput";
function k({ children: e, action: t, inputs: r, route: a }) {
  let n = useFetcher();
  return (0, import_jsx_runtime9.jsxs)(n.Form, { action: a || "", method: "post", children: [(t || r) && (0, import_jsx_runtime9.jsx)("input", { type: "hidden", name: ke, value: JSON.stringify({ action: t, inputs: r }) }), typeof e == "function" ? e(n) : e] });
}
k.INPUT_NAME = ke;
k.ACTIONS = { AttributesUpdateInput: "AttributesUpdateInput", BuyerIdentityUpdate: "BuyerIdentityUpdate", Create: "Create", DiscountCodesUpdate: "DiscountCodesUpdate", LinesAdd: "LinesAdd", LinesRemove: "LinesRemove", LinesUpdate: "LinesUpdate", NoteUpdate: "NoteUpdate", SelectedDeliveryOptionsUpdate: "SelectedDeliveryOptionsUpdate", MetafieldsSet: "MetafieldsSet", MetafieldDelete: "MetafieldDelete" };
function $t(e) {
  let t = {};
  for (let i of e.entries()) {
    let s = i[0], u2 = e.getAll(s);
    t[s] = u2.length > 1 ? u2 : i[1];
  }
  let { cartFormInput: r, ...a } = t, { action: n, inputs: o } = r ? JSON.parse(String(r)) : {};
  return { action: n, inputs: { ...o, ...a } };
}
k.getFormInput = $t;
function sr({ handle: e, options: t = [], variants: r = [], productPath: a = "products", children: n }) {
  let o = r instanceof Array ? r : flattenConnection(r), { searchParams: i, path: s, alreadyOnProductPage: u2 } = pr(e, a), d = t.filter((c) => c?.values?.length === 1);
  return (0, import_react7.createElement)(import_react7.Fragment, null, ...(0, import_react7.useMemo)(() => t.filter((c) => c?.values?.length > 1).map((c) => {
    let p, y = [];
    for (let h of c.values) {
      let I = new URLSearchParams(u2 ? i : void 0);
      I.set(c.name, h), d.forEach((x) => {
        I.set(x.name, x.values[0]);
      });
      let l2 = o.find((x) => x?.selectedOptions?.every((w) => I.get(w?.name) === w?.value)), C = i.get(c.name), f = C ? C === h : false;
      f && (p = h);
      let R = "?" + I.toString();
      y.push({ value: h, isAvailable: l2 ? l2.availableForSale : true, to: s + R, search: R, isActive: f });
    }
    return n({ option: { name: c.name, value: p, values: y } });
  }), [t, o, n]));
}
function pr(e, t) {
  let { pathname: r, search: a } = useLocation();
  return (0, import_react7.useMemo)(() => {
    let n = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(r), o = n && n.length > 0;
    t = t.startsWith("/") ? t.substring(1) : t;
    let i = o ? `${n[0]}${t}/${e}` : `/${t}/${e}`;
    return { searchParams: new URLSearchParams(a), alreadyOnProductPage: i === r, path: i };
  }, [r, a, e, t]);
}
var Be = (0, import_react7.createContext)(void 0);
var mr = Be.Provider;
var ge = () => (0, import_react7.useContext)(Be);
var Ir = (0, import_react7.forwardRef)((e, t) => {
  let r = ge();
  return (0, import_jsx_runtime9.jsx)("script", { suppressHydrationWarning: true, ...e, nonce: r, ref: t });
});

export {
  flattenConnection,
  AnalyticsEventName,
  sendShopifyAnalytics,
  getClientBrowserParameters,
  useMoney,
  Money,
  Image,
  MediaFile,
  ShopPayButton,
  useShopifyCookies,
  bt,
  vt,
  k,
  sr,
  ge,
  Ir
};
/*! Bundled license information:

@shopify/hydrogen/dist/production/index.js:
  (*! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate *)
  (*! @see https://shopify.dev/docs/api/storefront/latest/queries/cart *)
  (*! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesAdd *)
  (*! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesUpdate *)
  (*! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesRemove *)
  (*! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartDiscountCodesUpdate *)
  (*! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartBuyerIdentityUpdate *)
  (*! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartNoteUpdate *)
  (*! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartSelectedDeliveryOptionsUpdate *)
  (*! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartMetafieldsSet *)
  (*! @see https://shopify.dev/docs/api/storefront/2023-07/mutations/cartMetafieldDelete *)
*/
//# sourceMappingURL=/build/_shared/chunk-AF6SR4PD.js.map
