import "/build/_shared/chunk-SGR3BVRJ.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Button,
  Text,
  clsx_m_default
} from "/build/_shared/chunk-JEJQEZUJ.js";
import "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import {
  getInputStyleClasses
} from "/build/_shared/chunk-4BGUX6VE.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext
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

// app/routes/($locale).account.edit.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.edit.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.edit.jsx"
  );
  import.meta.hot.lastModified = "1696490276879.2158";
}
var handle = {
  renderInModal: true
};
function AccountDetailsEdit() {
  _s();
  const actionData = useActionData();
  const {
    customer
  } = useOutletContext();
  const {
    state
  } = useNavigation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "mt-4 mb-6", as: "h3", size: "lead", children: "Update your profile" }, void 0, false, {
      fileName: "app/routes/($locale).account.edit.jsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
      actionData?.formError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6 bg-red-100 rounded", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "m-4 text-sm text-red-900", children: actionData.formError }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 113,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 112,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "firstName", name: "firstName", type: "text", autoComplete: "given-name", placeholder: "First name", "aria-label": "First name", defaultValue: customer.firstName ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 116,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 115,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "lastName", name: "lastName", type: "text", autoComplete: "family-name", placeholder: "Last name", "aria-label": "Last name", defaultValue: customer.lastName ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 119,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 118,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(), id: "phone", name: "phone", type: "tel", autoComplete: "tel", placeholder: "Mobile", "aria-label": "Mobile", defaultValue: customer.phone ?? "" }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 122,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 121,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(actionData?.fieldErrors?.email), id: "email", name: "email", type: "email", autoComplete: "email", required: true, placeholder: "Email address", "aria-label": "Email address", defaultValue: customer.email ?? "" }, void 0, false, {
          fileName: "app/routes/($locale).account.edit.jsx",
          lineNumber: 125,
          columnNumber: 11
        }, this),
        actionData?.fieldErrors?.email && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          actionData.fieldErrors.email,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.edit.jsx",
          lineNumber: 126,
          columnNumber: 46
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 124,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "mb-6 mt-6", as: "h3", size: "lead", children: "Change your password" }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 130,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Password, { name: "currentPassword", label: "Current password", passwordError: actionData?.fieldErrors?.currentPassword }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      actionData?.fieldErrors?.currentPassword && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", className: "mt-1 text-red-500", children: [
        actionData.fieldErrors.currentPassword,
        " \xA0"
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 134,
        columnNumber: 54
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Password, { name: "newPassword", label: "New password", passwordError: actionData?.fieldErrors?.newPassword }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Password, { name: "newPassword2", label: "Re-enter new password", passwordError: actionData?.fieldErrors?.newPassword2 }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", color: "subtle", className: clsx_m_default("mt-1", actionData?.fieldErrors?.newPassword && "text-red-500"), children: "Passwords must be at least 8 characters." }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 139,
        columnNumber: 9
      }, this),
      actionData?.fieldErrors?.newPassword2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 142,
        columnNumber: 50
      }, this) : null,
      actionData?.fieldErrors?.newPassword2 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "fine", className: "mt-1 text-red-500", children: [
        actionData.fieldErrors.newPassword2,
        " \xA0"
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 143,
        columnNumber: 51
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "text-sm mb-2", variant: "primary", width: "full", type: "submit", disabled: state !== "idle", children: state !== "idle" ? "Saving" : "Save" }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 147,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { to: "..", className: "text-sm", variant: "secondary", width: "full", children: "Cancel" }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 152,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.edit.jsx",
        lineNumber: 151,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.edit.jsx",
      lineNumber: 111,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.edit.jsx",
    lineNumber: 107,
    columnNumber: 10
  }, this);
}
_s(AccountDetailsEdit, "VDh1DfaE6930SFn1ar7dGIFv1jY=", false, function() {
  return [useActionData, useOutletContext, useNavigation];
});
_c = AccountDetailsEdit;
function Password({
  name,
  passwordError,
  label
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: getInputStyleClasses(passwordError), id: name, name, type: "password", autoComplete: name === "currentPassword" ? "current-password" : void 0, placeholder: label, "aria-label": label, minLength: 8 }, void 0, false, {
    fileName: "app/routes/($locale).account.edit.jsx",
    lineNumber: 169,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.edit.jsx",
    lineNumber: 168,
    columnNumber: 10
  }, this);
}
_c2 = Password;
var _c;
var _c2;
$RefreshReg$(_c, "AccountDetailsEdit");
$RefreshReg$(_c2, "Password");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AccountDetailsEdit as default,
  handle
};
//# sourceMappingURL=/build/routes/($locale).account.edit-CAP7JFKR.js.map
