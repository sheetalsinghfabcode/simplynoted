import "/build/_shared/chunk-UUCLRDZW.js";
import {
  Link
} from "/build/_shared/chunk-OZ53DUYH.js";
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

// app/routes/($locale).account.register.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.register.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.register.jsx"
  );
  import.meta.hot.lastModified = "1696490276884.746";
}
var meta = () => {
  return [{
    title: "Register"
  }];
};
function Register() {
  _s();
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = (0, import_react2.useState)(null);
  const [nativePasswordError, setNativePasswordError] = (0, import_react2.useState)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center my-24 px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl", children: "Create an Account." }, void 0, false, {
      fileName: "app/routes/($locale).account.register.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", noValidate: true, className: "pt-6 pb-8 mt-4 mb-4 space-y-3", children: [
      actionData?.formError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6 bg-zinc-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "m-4 text-s text-contrast", children: actionData.formError }, void 0, false, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 115,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 114,
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
            fileName: "app/routes/($locale).account.register.jsx",
            lineNumber: 118,
            columnNumber: 13
          },
          this
        ),
        nativeEmailError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          nativeEmailError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.register.jsx",
          lineNumber: 123,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 117,
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
            fileName: "app/routes/($locale).account.register.jsx",
            lineNumber: 126,
            columnNumber: 13
          },
          this
        ),
        nativePasswordError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          " ",
          nativePasswordError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.register.jsx",
          lineNumber: 135,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 125,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full", type: "submit", disabled: !!(nativePasswordError || nativeEmailError), children: "Create Account" }, void 0, false, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 141,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 140,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center mt-8 border-t border-gray-300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "align-baseline text-sm mt-6", children: [
        "Already have an account? \xA0",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "inline underline", to: "/account/login", children: "Sign in" }, void 0, false, {
          fileName: "app/routes/($locale).account.register.jsx",
          lineNumber: 148,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 146,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.register.jsx",
        lineNumber: 145,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.register.jsx",
      lineNumber: 113,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.register.jsx",
    lineNumber: 110,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.register.jsx",
    lineNumber: 109,
    columnNumber: 10
  }, this);
}
_s(Register, "xgndQA5Rf4j1ettJLUMmAE/Sm0Y=", false, function() {
  return [useActionData];
});
_c = Register;
var _c;
$RefreshReg$(_c, "Register");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Register as default,
  meta
};
//# sourceMappingURL=/build/routes/($locale).account.register-73VJP2IM.js.map
