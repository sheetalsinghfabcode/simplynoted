import {
  AccountAddressBook,
  AccountDetails,
  Button,
  FeaturedCollections,
  Modal,
  ORDER_CARD_FRAGMENT,
  OrderCard,
  PageHeader,
  ProductSwimlane,
  Text
} from "/build/_shared/chunk-EZI2R5O2.js";
import {
  flattenConnection
} from "/build/_shared/chunk-UQLQSQUR.js";
import {
  usePrefixPathWithLocale
} from "/build/_shared/chunk-4BGUX6VE.js";
import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useMatches,
  useOutlet
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
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).account.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.jsx"
  );
  import.meta.hot.lastModified = "1696597646282.2517";
}
function Authenticated() {
  _s();
  const data = useLoaderData();
  const outlet = useOutlet();
  const matches = useMatches();
  const renderOutletInModal = matches.some((match) => {
    return match?.handle?.renderInModal;
  });
  if (!data.isAuthenticated) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 84,
      columnNumber: 12
    }, this);
  }
  if (outlet) {
    if (renderOutletInModal) {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { cancelLink: "/account", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, { context: {
          customer: data.customer
        } }, void 0, false, {
          fileName: "app/routes/($locale).account.jsx",
          lineNumber: 92,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).account.jsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Account, { ...data }, void 0, false, {
          fileName: "app/routes/($locale).account.jsx",
          lineNumber: 96,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.jsx",
        lineNumber: 90,
        columnNumber: 14
      }, this);
    } else {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, { context: {
        customer: data.customer
      } }, void 0, false, {
        fileName: "app/routes/($locale).account.jsx",
        lineNumber: 99,
        columnNumber: 14
      }, this);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Account, { ...data }, void 0, false, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 104,
    columnNumber: 10
  }, this);
}
_s(Authenticated, "CLxbH7kNLhQFJHruRoO9MhPPySo=", false, function() {
  return [useLoaderData, useOutlet, useMatches];
});
_c = Authenticated;
function Account({
  customer,
  heading,
  featuredData
}) {
  _s2();
  const orders = flattenConnection(customer.orders);
  const addresses = flattenConnection(customer.addresses);
  const [data, setData] = (0, import_react2.useState)(false);
  console.log("!!!!!!!!!", customer, "customerData--------------");
  let result = customer.id.replace(/[^0-9]/g, "");
  const remove = () => {
    console.log("aaaaaaaaaaaaa");
    if (typeof window !== "undefined" && customer) {
      console.log("bbbbbbbbbbbbbbb");
      localStorage.removeItem("customerId");
      console.log("ccccccccccccc");
    }
  };
  if (data == true) {
    remove();
  } else if (data == false) {
    if (typeof window !== "undefined" && customer) {
      console.log("########");
      localStorage.setItem("customerId", result);
      console.log("@@@@@@@@@@");
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, { heading, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", action: usePrefixPathWithLocale("/account/logout"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "text-primary/50", onClick: () => setData(true), children: "Sign out" }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 141,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 140,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    orders && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountOrderHistory, { orders }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 146,
      columnNumber: 18
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountDetails, { customer }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 147,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountAddressBook, { addresses, customer }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 148,
      columnNumber: 7
    }, this),
    !orders.length && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Suspense, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { resolve: featuredData, errorElement: "There was a problem loading featured products.", children: (data2) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeaturedCollections, { title: "Popular Collections", collections: data2.featuredCollections }, void 0, false, {
        fileName: "app/routes/($locale).account.jsx",
        lineNumber: 152,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductSwimlane, { products: data2.featuredProducts }, void 0, false, {
        fileName: "app/routes/($locale).account.jsx",
        lineNumber: 153,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 151,
      columnNumber: 22
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 150,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 149,
      columnNumber: 26
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 138,
    columnNumber: 10
  }, this);
}
_s2(Account, "YZFR3asOCIfF7m0n75WlFpL9fJg=", false, function() {
  return [usePrefixPathWithLocale];
});
_c2 = Account;
function AccountOrderHistory({
  orders
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-lead", children: "Order History" }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 168,
      columnNumber: 9
    }, this),
    orders?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Orders, { orders }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 169,
      columnNumber: 27
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyOrders, {}, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 169,
      columnNumber: 56
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 167,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 166,
    columnNumber: 10
  }, this);
}
_c3 = AccountOrderHistory;
function EmptyOrders() {
  _s3();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "mb-1", size: "fine", width: "narrow", as: "p", children: "You haven't placed any orders yet." }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 177,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-48", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "w-full mt-2 text-sm", variant: "secondary", to: usePrefixPathWithLocale("/"), children: "Start Shopping" }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 181,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.jsx",
      lineNumber: 180,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 176,
    columnNumber: 10
  }, this);
}
_s3(EmptyOrders, "I6Yiq9RW1BACN7PtivA6Wi6Ggkk=", false, function() {
  return [usePrefixPathWithLocale];
});
_c4 = EmptyOrders;
function Orders({
  orders
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-3", children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OrderCard, { order }, order.id, false, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 195,
    columnNumber: 28
  }, this)) }, void 0, false, {
    fileName: "app/routes/($locale).account.jsx",
    lineNumber: 194,
    columnNumber: 10
  }, this);
}
_c5 = Orders;
var CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      ...CustomerDetails
    }
  }

  fragment AddressPartial on MailingAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    country
    province
    city
    zip
    phone
  }

  fragment CustomerDetails on Customer {
    firstName
    lastName
    phone
    email
    id
    defaultAddress {
      ...AddressPartial
    }
    addresses(first: 6) {
      edges {
        node {
          ...AddressPartial
        }
      }
    }
    orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          ...OrderCard
        }
      }
    }
  }

  ${ORDER_CARD_FRAGMENT}
`;
var _c;
var _c2;
var _c3;
var _c4;
var _c5;
$RefreshReg$(_c, "Authenticated");
$RefreshReg$(_c2, "Account");
$RefreshReg$(_c3, "AccountOrderHistory");
$RefreshReg$(_c4, "EmptyOrders");
$RefreshReg$(_c5, "Orders");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Authenticated
};
//# sourceMappingURL=/build/_shared/chunk-BARTTPVN.js.map
