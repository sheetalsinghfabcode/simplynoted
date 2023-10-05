import {
  Link
} from "/build/_shared/chunk-LUNXKCFQ.js";
import {
  getInputStyleClasses
} from "/build/_shared/chunk-US7OM5MU.js";
import {
  Form,
  useActionData,
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
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).account.login.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.login.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.login.jsx"
  );
  import.meta.hot.lastModified = "1696490276880.7898";
}
var handle = {
  isPublic: true
};
var meta = () => {
  return [{
    title: "Login"
  }];
};
function Login() {
  _s();
  const {
    shopName
  } = useLoaderData();
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = (0, import_react2.useState)(null);
  const [nativePasswordError, setNativePasswordError] = (0, import_react2.useState)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center my-24 px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl", children: "Sign in." }, void 0, false, {
      fileName: "app/routes/($locale).account.login.jsx",
      lineNumber: 114,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", noValidate: true, className: "pt-6 pb-8 mt-4 mb-4 space-y-3", children: [
      actionData?.formError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6 bg-zinc-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "m-4 text-s text-contrast", children: actionData.formError }, void 0, false, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 118,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 117,
        columnNumber: 37
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "input",
          {
            className: `mb-1 ${getInputStyleClasses(nativeEmailError)}`,
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            placeholder: "Email address",
            "aria-label": "Email address",
            autoFocus: true,
            onBlur: (event) => {
              setNativeEmailError(event.currentTarget.value.length && !event.currentTarget.validity.valid ? "Invalid email address" : null);
            }
          },
          void 0,
          false,
          {
            fileName: "app/routes/($locale).account.login.jsx",
            lineNumber: 121,
            columnNumber: 13
          },
          this
        ),
        nativeEmailError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          nativeEmailError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.login.jsx",
          lineNumber: 126,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 120,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "input",
          {
            className: `mb-1 ${getInputStyleClasses(nativePasswordError)}`,
            id: "password",
            name: "password",
            type: "password",
            autoComplete: "current-password",
            placeholder: "Password",
            "aria-label": "Password",
            minLength: 8,
            required: true,
            autoFocus: true,
            onBlur: (event) => {
              if (event.currentTarget.validity.valid || !event.currentTarget.value.length) {
                setNativePasswordError(null);
              } else {
                setNativePasswordError(event.currentTarget.validity.valueMissing ? "Please enter a password" : "Passwords must be at least 8 characters");
              }
            }
          },
          void 0,
          false,
          {
            fileName: "app/routes/($locale).account.login.jsx",
            lineNumber: 130,
            columnNumber: 13
          },
          this
        ),
        nativePasswordError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          " ",
          nativePasswordError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.login.jsx",
          lineNumber: 139,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full", type: "submit", disabled: !!(nativePasswordError || nativeEmailError), children: "Sign in" }, void 0, false, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 145,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 144,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mt-8 border-t border-gray-300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "align-baseline text-sm mt-6", children: [
          "New to ",
          shopName,
          "? \xA0",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "inline underline", to: "/account/register", children: "Create an account" }, void 0, false, {
            fileName: "app/routes/($locale).account.login.jsx",
            lineNumber: 152,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.login.jsx",
          lineNumber: 150,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "mt-6 inline-block align-baseline text-sm text-primary/50", to: "/account/recover", children: "Forgot password" }, void 0, false, {
          fileName: "app/routes/($locale).account.login.jsx",
          lineNumber: 156,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.login.jsx",
        lineNumber: 149,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.login.jsx",
      lineNumber: 116,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.login.jsx",
    lineNumber: 113,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.login.jsx",
    lineNumber: 112,
    columnNumber: 10
  }, this);
}
_s(Login, "JLOChZIFTmQtxoUzstEmZlha9U4=", false, function() {
  return [useLoaderData, useActionData];
});
_c = Login;
var _c;
$RefreshReg$(_c, "Login");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  handle,
  meta,
  Login
};
//# sourceMappingURL=/build/_shared/chunk-LEQJ74EU.js.map
