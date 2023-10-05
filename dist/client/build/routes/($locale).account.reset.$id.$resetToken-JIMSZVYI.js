import {
  getInputStyleClasses
} from "/build/_shared/chunk-US7OM5MU.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Form,
  useActionData
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

// app/routes/($locale).account.reset.$id.$resetToken.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.reset.$id.$resetToken.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.reset.$id.$resetToken.jsx"
  );
  import.meta.hot.lastModified = "1696490276885.7463";
}
var meta = () => {
  return [{
    title: "Reset Password"
  }];
};
function Reset() {
  _s();
  const actionData = useActionData();
  const [nativePasswordError, setNativePasswordError] = (0, import_react2.useState)(null);
  const [nativePasswordConfirmError, setNativePasswordConfirmError] = (0, import_react2.useState)(null);
  const passwordInput = (0, import_react2.useRef)(null);
  const passwordConfirmInput = (0, import_react2.useRef)(null);
  const validatePasswordConfirm = () => {
    if (!passwordConfirmInput.current)
      return;
    if (passwordConfirmInput.current.value.length && passwordConfirmInput.current.value !== passwordInput.current?.value) {
      setNativePasswordConfirmError("The two passwords entered did not match.");
    } else if (passwordConfirmInput.current.validity.valid || !passwordConfirmInput.current.value.length) {
      setNativePasswordConfirmError(null);
    } else {
      setNativePasswordConfirmError(passwordConfirmInput.current.validity.valueMissing ? "Please re-enter the password" : "Passwords must be at least 8 characters");
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center my-24 px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl", children: "Reset Password." }, void 0, false, {
      fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
      lineNumber: 120,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4", children: "Enter a new password for your account." }, void 0, false, {
      fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
      lineNumber: 121,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", noValidate: true, className: "pt-6 pb-8 mt-4 mb-4 space-y-3", children: [
      actionData?.formError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6 bg-zinc-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "m-4 text-s text-contrast", children: actionData.formError }, void 0, false, {
        fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
        lineNumber: 125,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
        lineNumber: 124,
        columnNumber: 37
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "input",
          {
            ref: passwordInput,
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
                validatePasswordConfirm();
              } else {
                setNativePasswordError(event.currentTarget.validity.valueMissing ? "Please enter a password" : "Passwords must be at least 8 characters");
              }
            }
          },
          void 0,
          false,
          {
            fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        nativePasswordError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          " ",
          nativePasswordError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
          lineNumber: 138,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
        lineNumber: 127,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "input",
          {
            ref: passwordConfirmInput,
            className: `mb-1 ${getInputStyleClasses(nativePasswordConfirmError)}`,
            id: "passwordConfirm",
            name: "passwordConfirm",
            type: "password",
            autoComplete: "current-password",
            placeholder: "Re-enter password",
            "aria-label": "Re-enter password",
            minLength: 8,
            required: true,
            autoFocus: true,
            onBlur: validatePasswordConfirm
          },
          void 0,
          false,
          {
            fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
            lineNumber: 144,
            columnNumber: 13
          },
          this
        ),
        nativePasswordConfirmError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          " ",
          nativePasswordConfirmError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
          lineNumber: 147,
          columnNumber: 44
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
        lineNumber: 143,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full", type: "submit", children: "Save" }, void 0, false, {
        fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
        lineNumber: 153,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
        lineNumber: 152,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
      lineNumber: 123,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
    lineNumber: 119,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.reset.$id.$resetToken.jsx",
    lineNumber: 118,
    columnNumber: 10
  }, this);
}
_s(Reset, "sd9Q/tIV5yqkG2kR3QpyUz0phuE=", false, function() {
  return [useActionData];
});
_c = Reset;
var _c;
$RefreshReg$(_c, "Reset");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Reset as default,
  meta
};
//# sourceMappingURL=/build/routes/($locale).account.reset.$id.$resetToken-JIMSZVYI.js.map
