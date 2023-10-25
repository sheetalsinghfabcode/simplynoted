import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Button,
  Text
} from "/build/_shared/chunk-DVYBD3JV.js";
import {
  flattenConnection
} from "/build/_shared/chunk-UWQ2IBCJ.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import {
  getInputStyleClasses
} from "/build/_shared/chunk-2YGEN3B2.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VFPJDGJ3.js";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  useParams
} from "/build/_shared/chunk-GLSAWP4P.js";
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

// app/routes/($locale).account.address.$id.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.address.$id.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.address.$id.jsx"
  );
  import.meta.hot.lastModified = "1696849699244.4453";
}
var handle = {
  renderInModal: true
};
function EditAddress() {
  _s();
  const {
    id: addressId
  } = useParams();
  const isNewAddress = addressId === "add";
  const actionData = useActionData();
  const {
    state
  } = useNavigation();
  const {
    customer
  } = useOutletContext();
  const addresses = flattenConnection(customer.addresses);
  const defaultAddress = customer.defaultAddress;
  const normalizedAddress = decodeURIComponent(addressId ?? "").split("?")[0];
  const address = addresses.find((address2) => address2.id.startsWith(normalizedAddress));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "mt-4 mb-6", as: "h3", size: "lead", children: isNewAddress ? "Add address" : "Edit address" }, void 0, false, {
      fileName: "app/routes/($locale).account.address.$id.jsx",
      lineNumber: 151,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "addressId", value: address?.id ?? addressId }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      actionData?.formError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6 bg-red-100 rounded", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "m-4 text-sm text-red-900", children: actionData.formError }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 158,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 157,
        columnNumber: 37
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "firstName", name: "firstName", required: true, type: "text", autoComplete: "given-name", placeholder: "First name", "aria-label": "First name", defaultValue: address?.firstName ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 161,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 160,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "lastName", name: "lastName", required: true, type: "text", autoComplete: "family-name", placeholder: "Last name", "aria-label": "Last name", defaultValue: address?.lastName ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 164,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 163,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "company", name: "company", type: "text", autoComplete: "organization", placeholder: "Company", "aria-label": "Company", defaultValue: address?.company ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 167,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 166,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "address1", name: "address1", type: "text", autoComplete: "address-line1", placeholder: "Address line 1*", required: true, "aria-label": "Address line 1", defaultValue: address?.address1 ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 170,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "address2", name: "address2", type: "text", autoComplete: "address-line2", placeholder: "Address line 2", "aria-label": "Address line 2", defaultValue: address?.address2 ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 173,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 172,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "city", name: "city", type: "text", required: true, autoComplete: "address-level2", placeholder: "City", "aria-label": "City", defaultValue: address?.city ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 176,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 175,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "province", name: "province", type: "text", autoComplete: "address-level1", placeholder: "State / Province", required: true, "aria-label": "State", defaultValue: address?.province ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 179,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 178,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "zip", name: "zip", type: "text", autoComplete: "postal-code", placeholder: "Zip / Postal Code", required: true, "aria-label": "Zip", defaultValue: address?.zip ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 182,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 181,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "country", name: "country", type: "text", autoComplete: "country-name", placeholder: "Country", required: true, "aria-label": "Country", defaultValue: address?.country ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 185,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 184,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "phone", name: "phone", type: "tel", autoComplete: "tel", placeholder: "Phone", "aria-label": "Phone", defaultValue: address?.phone ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 188,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "defaultAddress", id: "defaultAddress", defaultChecked: defaultAddress?.id === address?.id, className: "border-gray-500 rounded-sm cursor-pointer border-1" }, void 0, false, {
          fileName: "app/routes/($locale).account.address.$id.jsx",
          lineNumber: 191,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-block ml-2 text-sm cursor-pointer", htmlFor: "defaultAddress", children: "Set as default address" }, void 0, false, {
          fileName: "app/routes/($locale).account.address.$id.jsx",
          lineNumber: 192,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 190,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "w-full rounded focus:shadow-outline", type: "submit", variant: "primary", disabled: state !== "idle", children: state !== "idle" ? "Saving" : "Save" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 197,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 196,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { to: "..", className: "w-full mt-2 rounded focus:shadow-outline", variant: "secondary", children: "Cancel" }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 202,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.address.$id.jsx",
        lineNumber: 201,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.address.$id.jsx",
      lineNumber: 155,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).account.address.$id.jsx",
      lineNumber: 154,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.address.$id.jsx",
    lineNumber: 150,
    columnNumber: 10
  }, this);
}
_s(EditAddress, "tvhd2TRxa2lQwNnREW5amCMmNHU=", false, function() {
  return [useParams, useActionData, useNavigation, useOutletContext];
});
_c = EditAddress;
var _c;
$RefreshReg$(_c, "EditAddress");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  EditAddress as default,
  handle
};
//# sourceMappingURL=/build/routes/($locale).account.address.$id-XOXXTEO3.js.map
