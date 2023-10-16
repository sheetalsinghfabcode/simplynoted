import {
  Link
} from "/build/_shared/chunk-EZI2R5O2.js";
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

// app/routes/($locale).account.recover.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).account.recover.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).account.recover.jsx"
  );
  import.meta.hot.lastModified = "1696490276883.7463";
}
var meta = () => {
  return [{
    title: "Recover Password"
  }];
};
function Recover() {
  _s();
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = (0, import_react2.useState)(null);
  const isSubmitted = actionData?.resetRequested;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center my-24 px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-md w-full", children: isSubmitted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl", children: "Request Sent." }, void 0, false, {
      fileName: "app/routes/($locale).account.recover.jsx",
      lineNumber: 79,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4", children: "If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes." }, void 0, false, {
      fileName: "app/routes/($locale).account.recover.jsx",
      lineNumber: 80,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.recover.jsx",
    lineNumber: 78,
    columnNumber: 24
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl", children: "Forgot Password." }, void 0, false, {
      fileName: "app/routes/($locale).account.recover.jsx",
      lineNumber: 86,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4", children: "Enter the email address associated with your account to receive a link to reset your password." }, void 0, false, {
      fileName: "app/routes/($locale).account.recover.jsx",
      lineNumber: 87,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", noValidate: true, className: "pt-6 pb-8 mt-4 mb-4 space-y-3", children: [
      actionData?.formError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center mb-6 bg-zinc-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "m-4 text-s text-contrast", children: actionData.formError }, void 0, false, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 94,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 93,
        columnNumber: 41
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
            fileName: "app/routes/($locale).account.recover.jsx",
            lineNumber: 99,
            columnNumber: 17
          },
          this
        ),
        nativeEmailError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-xs", children: [
          nativeEmailError,
          " \xA0"
        ] }, void 0, true, {
          fileName: "app/routes/($locale).account.recover.jsx",
          lineNumber: 104,
          columnNumber: 38
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 98,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full", type: "submit", children: "Request Reset Link" }, void 0, false, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 109,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 108,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center mt-8 border-t border-gray-300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "align-baseline text-sm mt-6", children: [
        "Return to \xA0",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "inline underline", to: "/account/login", children: "Login" }, void 0, false, {
          fileName: "app/routes/($locale).account.recover.jsx",
          lineNumber: 116,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 114,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).account.recover.jsx",
        lineNumber: 113,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).account.recover.jsx",
      lineNumber: 92,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).account.recover.jsx",
    lineNumber: 85,
    columnNumber: 17
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.recover.jsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).account.recover.jsx",
    lineNumber: 76,
    columnNumber: 10
  }, this);
}
_s(Recover, "9REzYhp7lbVUyS2/Jhezff30qWw=", false, function() {
  return [useActionData];
});
_c = Recover;
var _c;
$RefreshReg$(_c, "Recover");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Recover as default,
  meta
};
//# sourceMappingURL=/build/routes/($locale).account.recover-QTKRWO63.js.map
