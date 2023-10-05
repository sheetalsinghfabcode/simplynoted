import {
  PRODUCT_CARD_FRAGMENT
} from "/build/_shared/chunk-Y2Q63SEX.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import "/build/_shared/chunk-AF6SR4PD.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-M7ZELIPT.js";
import "/build/_shared/chunk-BVWHYGSQ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QLMTPHJM.js";
import "/build/_shared/chunk-LSHG36UU.js";
import "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).api.products.jsx
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).api.products.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).api.products.jsx"
  );
  import.meta.hot.lastModified = "1696490276886.984";
}
var API_ALL_PRODUCTS_QUERY = `#graphql
  query ApiAllProducts(
    $query: String
    $count: Int
    $reverse: Boolean
    $country: CountryCode
    $language: LanguageCode
    $sortKey: ProductSortKeys
  ) @inContext(country: $country, language: $language) {
    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
function ProductsApiRoute() {
  return null;
}
_c = ProductsApiRoute;
var _c;
$RefreshReg$(_c, "ProductsApiRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProductsApiRoute as default
};
//# sourceMappingURL=/build/routes/($locale).api.products-KRNSKJ3A.js.map
