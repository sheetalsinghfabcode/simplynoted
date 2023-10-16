import {
  AnalyticsEventName,
  Image,
  MediaFile,
  Money,
  flattenConnection,
  getClientBrowserParameters,
  k,
  sendShopifyAnalytics,
  useMoney
} from "/build/_shared/chunk-UQLQSQUR.js";
import {
  require_react_dom
} from "/build/_shared/chunk-IEDAELJY.js";
import {
  DEFAULT_LOCALE,
  formatText,
  getInputStyleClasses,
  isDiscounted,
  isNewArrival,
  missingClass,
  statusMessage,
  useIsHomePath,
  usePrefixPathWithLocale
} from "/build/_shared/chunk-4BGUX6VE.js";
import {
  Await,
  Form,
  Link,
  NavLink,
  useFetcher,
  useFetchers,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
  useSearchParams
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

// node_modules/@headlessui/react/dist/components/disclosure/disclosure.js
var import_react10 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/match.js
function u(r9, n6, ...a12) {
  if (r9 in n6) {
    let e4 = n6[r9];
    return typeof e4 == "function" ? e4(...a12) : e4;
  }
  let t17 = new Error(`Tried to handle "${r9}" but there is no handler defined. Only defined handlers are: ${Object.keys(n6).map((e4) => `"${e4}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t17, u), t17;
}

// node_modules/@headlessui/react/dist/utils/render.js
var import_react = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/class-names.js
function t(...r9) {
  return Array.from(new Set(r9.flatMap((n6) => typeof n6 == "string" ? n6.split(" ") : []))).filter(Boolean).join(" ");
}

// node_modules/@headlessui/react/dist/utils/render.js
var S = ((a12) => (a12[a12.None = 0] = "None", a12[a12.RenderStrategy = 1] = "RenderStrategy", a12[a12.Static = 2] = "Static", a12))(S || {});
var j = ((e4) => (e4[e4.Unmount = 0] = "Unmount", e4[e4.Hidden = 1] = "Hidden", e4))(j || {});
function X({ ourProps: r9, theirProps: t17, slot: e4, defaultTag: a12, features: s14, visible: n6 = true, name: f10 }) {
  let o10 = N(t17, r9);
  if (n6)
    return c(o10, e4, a12, f10);
  let u9 = s14 != null ? s14 : 0;
  if (u9 & 2) {
    let { static: l11 = false, ...p6 } = o10;
    if (l11)
      return c(p6, e4, a12, f10);
  }
  if (u9 & 1) {
    let { unmount: l11 = true, ...p6 } = o10;
    return u(l11 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return c({ ...p6, hidden: true, style: { display: "none" } }, e4, a12, f10);
    } });
  }
  return c(o10, e4, a12, f10);
}
function c(r9, t17 = {}, e4, a12) {
  let { as: s14 = e4, children: n6, refName: f10 = "ref", ...o10 } = g(r9, ["unmount", "static"]), u9 = r9.ref !== void 0 ? { [f10]: r9.ref } : {}, l11 = typeof n6 == "function" ? n6(t17) : n6;
  "className" in o10 && o10.className && typeof o10.className == "function" && (o10.className = o10.className(t17));
  let p6 = {};
  if (t17) {
    let i6 = false, m10 = [];
    for (let [y6, d11] of Object.entries(t17))
      typeof d11 == "boolean" && (i6 = true), d11 === true && m10.push(y6);
    i6 && (p6["data-headlessui-state"] = m10.join(" "));
  }
  if (s14 === import_react.Fragment && Object.keys(R(o10)).length > 0) {
    if (!(0, import_react.isValidElement)(l11) || Array.isArray(l11) && l11.length > 1)
      throw new Error(['Passing props on "Fragment"!', "", `The current component <${a12} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(o10).map((d11) => `  - ${d11}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d11) => `  - ${d11}`).join(`
`)].join(`
`));
    let i6 = l11.props, m10 = typeof (i6 == null ? void 0 : i6.className) == "function" ? (...d11) => t(i6 == null ? void 0 : i6.className(...d11), o10.className) : t(i6 == null ? void 0 : i6.className, o10.className), y6 = m10 ? { className: m10 } : {};
    return (0, import_react.cloneElement)(l11, Object.assign({}, N(l11.props, R(g(o10, ["ref"]))), p6, u9, w(l11.ref, u9.ref), y6));
  }
  return (0, import_react.createElement)(s14, Object.assign({}, g(o10, ["ref"]), s14 !== import_react.Fragment && u9, s14 !== import_react.Fragment && p6), l11);
}
function w(...r9) {
  return { ref: r9.every((t17) => t17 == null) ? void 0 : (t17) => {
    for (let e4 of r9)
      e4 != null && (typeof e4 == "function" ? e4(t17) : e4.current = t17);
  } };
}
function N(...r9) {
  var a12;
  if (r9.length === 0)
    return {};
  if (r9.length === 1)
    return r9[0];
  let t17 = {}, e4 = {};
  for (let s14 of r9)
    for (let n6 in s14)
      n6.startsWith("on") && typeof s14[n6] == "function" ? ((a12 = e4[n6]) != null || (e4[n6] = []), e4[n6].push(s14[n6])) : t17[n6] = s14[n6];
  if (t17.disabled || t17["aria-disabled"])
    return Object.assign(t17, Object.fromEntries(Object.keys(e4).map((s14) => [s14, void 0])));
  for (let s14 in e4)
    Object.assign(t17, { [s14](n6, ...f10) {
      let o10 = e4[s14];
      for (let u9 of o10) {
        if ((n6 instanceof Event || (n6 == null ? void 0 : n6.nativeEvent) instanceof Event) && n6.defaultPrevented)
          return;
        u9(n6, ...f10);
      }
    } });
  return t17;
}
function D(r9) {
  var t17;
  return Object.assign((0, import_react.forwardRef)(r9), { displayName: (t17 = r9.displayName) != null ? t17 : r9.name });
}
function R(r9) {
  let t17 = Object.assign({}, r9);
  for (let e4 in t17)
    t17[e4] === void 0 && delete t17[e4];
  return t17;
}
function g(r9, t17 = []) {
  let e4 = Object.assign({}, r9);
  for (let a12 of t17)
    a12 in e4 && delete e4[a12];
  return e4;
}

// node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
var import_react5 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-event.js
var import_react4 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
var import_react3 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/env.js
var i = Object.defineProperty;
var d = (t17, e4, n6) => e4 in t17 ? i(t17, e4, { enumerable: true, configurable: true, writable: true, value: n6 }) : t17[e4] = n6;
var r = (t17, e4, n6) => (d(t17, typeof e4 != "symbol" ? e4 + "" : e4, n6), n6);
var o = class {
  constructor() {
    r(this, "current", this.detect());
    r(this, "handoffState", "pending");
    r(this, "currentId", 0);
  }
  set(e4) {
    this.current !== e4 && (this.handoffState = "pending", this.currentId = 0, this.current = e4);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
var s = new o();

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var l = (e4, f10) => {
  s.isServer ? (0, import_react2.useEffect)(e4, f10) : (0, import_react2.useLayoutEffect)(e4, f10);
};

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
function s2(e4) {
  let r9 = (0, import_react3.useRef)(e4);
  return l(() => {
    r9.current = e4;
  }, [e4]), r9;
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var o2 = function(t17) {
  let e4 = s2(t17);
  return import_react4.default.useCallback((...r9) => e4.current(...r9), [e4]);
};

// node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
var u2 = Symbol();
function T2(t17, n6 = true) {
  return Object.assign(t17, { [u2]: n6 });
}
function y(...t17) {
  let n6 = (0, import_react5.useRef)(t17);
  (0, import_react5.useEffect)(() => {
    n6.current = t17;
  }, [t17]);
  let c12 = o2((e4) => {
    for (let o10 of n6.current)
      o10 != null && (typeof o10 == "function" ? o10(e4) : o10.current = e4);
  });
  return t17.every((e4) => e4 == null || (e4 == null ? void 0 : e4[u2])) ? void 0 : c12;
}

// node_modules/@headlessui/react/dist/hooks/use-id.js
var import_react6 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
var t4 = __toESM(require_react(), 1);
function s3() {
  let r9 = typeof document == "undefined";
  return "useSyncExternalStore" in t4 ? ((o10) => o10.useSyncExternalStore)(t4)(() => () => {
  }, () => false, () => !r9) : false;
}
function l3() {
  let r9 = s3(), [e4, n6] = t4.useState(s.isHandoffComplete);
  return e4 && s.isHandoffComplete === false && n6(false), t4.useEffect(() => {
    e4 !== true && n6(true);
  }, [e4]), t4.useEffect(() => s.handoff(), []), r9 ? false : e4;
}

// node_modules/@headlessui/react/dist/hooks/use-id.js
var o3;
var I = (o3 = import_react6.default.useId) != null ? o3 : function() {
  let n6 = l3(), [e4, u9] = import_react6.default.useState(n6 ? () => s.nextId() : null);
  return l(() => {
    e4 === null && u9(s.nextId());
  }, [e4]), e4 != null ? "" + e4 : void 0;
};

// node_modules/@headlessui/react/dist/components/keyboard.js
var o4 = ((r9) => (r9.Space = " ", r9.Enter = "Enter", r9.Escape = "Escape", r9.Backspace = "Backspace", r9.Delete = "Delete", r9.ArrowLeft = "ArrowLeft", r9.ArrowUp = "ArrowUp", r9.ArrowRight = "ArrowRight", r9.ArrowDown = "ArrowDown", r9.Home = "Home", r9.End = "End", r9.PageUp = "PageUp", r9.PageDown = "PageDown", r9.Tab = "Tab", r9))(o4 || {});

// node_modules/@headlessui/react/dist/utils/bugs.js
function r2(n6) {
  let e4 = n6.parentElement, l11 = null;
  for (; e4 && !(e4 instanceof HTMLFieldSetElement); )
    e4 instanceof HTMLLegendElement && (l11 = e4), e4 = e4.parentElement;
  let t17 = (e4 == null ? void 0 : e4.getAttribute("disabled")) === "";
  return t17 && i3(l11) ? false : t17;
}
function i3(n6) {
  if (!n6)
    return false;
  let e4 = n6.previousElementSibling;
  for (; e4 !== null; ) {
    if (e4 instanceof HTMLLegendElement)
      return false;
    e4 = e4.previousElementSibling;
  }
  return true;
}

// node_modules/@headlessui/react/dist/internal/open-closed.js
var import_react7 = __toESM(require_react(), 1);
var n = (0, import_react7.createContext)(null);
n.displayName = "OpenClosedContext";
var d2 = ((e4) => (e4[e4.Open = 1] = "Open", e4[e4.Closed = 2] = "Closed", e4[e4.Closing = 4] = "Closing", e4[e4.Opening = 8] = "Opening", e4))(d2 || {});
function C() {
  return (0, import_react7.useContext)(n);
}
function c3({ value: o10, children: r9 }) {
  return import_react7.default.createElement(n.Provider, { value: o10 }, r9);
}

// node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
var import_react8 = __toESM(require_react(), 1);
function i4(t17) {
  var n6;
  if (t17.type)
    return t17.type;
  let e4 = (n6 = t17.as) != null ? n6 : "button";
  if (typeof e4 == "string" && e4.toLowerCase() === "button")
    return "button";
}
function s4(t17, e4) {
  let [n6, u9] = (0, import_react8.useState)(() => i4(t17));
  return l(() => {
    u9(i4(t17));
  }, [t17.type, t17.as]), l(() => {
    n6 || e4.current && e4.current instanceof HTMLButtonElement && !e4.current.hasAttribute("type") && u9("button");
  }, [n6, e4]), n6;
}

// node_modules/@headlessui/react/dist/utils/owner.js
function e(r9) {
  return s.isServer ? null : r9 instanceof Node ? r9.ownerDocument : r9 != null && r9.hasOwnProperty("current") && r9.current instanceof Node ? r9.current.ownerDocument : document;
}

// node_modules/@headlessui/react/dist/utils/start-transition.js
var import_react9 = __toESM(require_react(), 1);
var t7;
var a2 = (t7 = import_react9.default.startTransition) != null ? t7 : function(i6) {
  i6();
};

// node_modules/@headlessui/react/dist/components/disclosure/disclosure.js
var q = ((o10) => (o10[o10.Open = 0] = "Open", o10[o10.Closed = 1] = "Closed", o10))(q || {});
var z = ((t17) => (t17[t17.ToggleDisclosure = 0] = "ToggleDisclosure", t17[t17.CloseDisclosure = 1] = "CloseDisclosure", t17[t17.SetButtonId = 2] = "SetButtonId", t17[t17.SetPanelId = 3] = "SetPanelId", t17[t17.LinkPanel = 4] = "LinkPanel", t17[t17.UnlinkPanel = 5] = "UnlinkPanel", t17))(z || {});
var Q = { [0]: (e4) => ({ ...e4, disclosureState: u(e4.disclosureState, { [0]: 1, [1]: 0 }) }), [1]: (e4) => e4.disclosureState === 1 ? e4 : { ...e4, disclosureState: 1 }, [4](e4) {
  return e4.linkedPanel === true ? e4 : { ...e4, linkedPanel: true };
}, [5](e4) {
  return e4.linkedPanel === false ? e4 : { ...e4, linkedPanel: false };
}, [2](e4, n6) {
  return e4.buttonId === n6.buttonId ? e4 : { ...e4, buttonId: n6.buttonId };
}, [3](e4, n6) {
  return e4.panelId === n6.panelId ? e4 : { ...e4, panelId: n6.panelId };
} };
var k2 = (0, import_react10.createContext)(null);
k2.displayName = "DisclosureContext";
function M(e4) {
  let n6 = (0, import_react10.useContext)(k2);
  if (n6 === null) {
    let o10 = new Error(`<${e4} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o10, M), o10;
  }
  return n6;
}
var v = (0, import_react10.createContext)(null);
v.displayName = "DisclosureAPIContext";
function w2(e4) {
  let n6 = (0, import_react10.useContext)(v);
  if (n6 === null) {
    let o10 = new Error(`<${e4} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o10, w2), o10;
  }
  return n6;
}
var H = (0, import_react10.createContext)(null);
H.displayName = "DisclosurePanelContext";
function V() {
  return (0, import_react10.useContext)(H);
}
function Y(e4, n6) {
  return u(n6.type, Q, e4, n6);
}
var Z = import_react10.Fragment;
function ee(e4, n6) {
  let { defaultOpen: o10 = false, ...u9 } = e4, T7 = (0, import_react10.useRef)(null), l11 = y(n6, T2((a12) => {
    T7.current = a12;
  }, e4.as === void 0 || e4.as === import_react10.Fragment)), t17 = (0, import_react10.useRef)(null), f10 = (0, import_react10.useRef)(null), s14 = (0, import_react10.useReducer)(Y, { disclosureState: o10 ? 0 : 1, linkedPanel: false, buttonRef: f10, panelRef: t17, buttonId: null, panelId: null }), [{ disclosureState: i6, buttonId: c12 }, D5] = s14, d11 = o2((a12) => {
    D5({ type: 1 });
    let r9 = e(T7);
    if (!r9 || !c12)
      return;
    let p6 = (() => a12 ? a12 instanceof HTMLElement ? a12 : a12.current instanceof HTMLElement ? a12.current : r9.getElementById(c12) : r9.getElementById(c12))();
    p6 == null || p6.focus();
  }), P4 = (0, import_react10.useMemo)(() => ({ close: d11 }), [d11]), b6 = (0, import_react10.useMemo)(() => ({ open: i6 === 0, close: d11 }), [i6, d11]), y6 = { ref: l11 };
  return import_react10.default.createElement(k2.Provider, { value: s14 }, import_react10.default.createElement(v.Provider, { value: P4 }, import_react10.default.createElement(c3, { value: u(i6, { [0]: d2.Open, [1]: d2.Closed }) }, X({ ourProps: y6, theirProps: u9, slot: b6, defaultTag: Z, name: "Disclosure" }))));
}
var te = "button";
function ne(e4, n6) {
  let o10 = I(), { id: u9 = `headlessui-disclosure-button-${o10}`, ...T7 } = e4, [l11, t17] = M("Disclosure.Button"), f10 = V(), s14 = f10 === null ? false : f10 === l11.panelId, i6 = (0, import_react10.useRef)(null), c12 = y(i6, n6, s14 ? null : l11.buttonRef);
  (0, import_react10.useEffect)(() => {
    if (!s14)
      return t17({ type: 2, buttonId: u9 }), () => {
        t17({ type: 2, buttonId: null });
      };
  }, [u9, t17, s14]);
  let D5 = o2((r9) => {
    var p6;
    if (s14) {
      if (l11.disclosureState === 1)
        return;
      switch (r9.key) {
        case o4.Space:
        case o4.Enter:
          r9.preventDefault(), r9.stopPropagation(), t17({ type: 0 }), (p6 = l11.buttonRef.current) == null || p6.focus();
          break;
      }
    } else
      switch (r9.key) {
        case o4.Space:
        case o4.Enter:
          r9.preventDefault(), r9.stopPropagation(), t17({ type: 0 });
          break;
      }
  }), d11 = o2((r9) => {
    switch (r9.key) {
      case o4.Space:
        r9.preventDefault();
        break;
    }
  }), P4 = o2((r9) => {
    var p6;
    r2(r9.currentTarget) || e4.disabled || (s14 ? (t17({ type: 0 }), (p6 = l11.buttonRef.current) == null || p6.focus()) : t17({ type: 0 }));
  }), b6 = (0, import_react10.useMemo)(() => ({ open: l11.disclosureState === 0 }), [l11]), y6 = s4(e4, i6), a12 = s14 ? { ref: c12, type: y6, onKeyDown: D5, onClick: P4 } : { ref: c12, id: u9, type: y6, "aria-expanded": l11.disclosureState === 0, "aria-controls": l11.linkedPanel ? l11.panelId : void 0, onKeyDown: D5, onKeyUp: d11, onClick: P4 };
  return X({ ourProps: a12, theirProps: T7, slot: b6, defaultTag: te, name: "Disclosure.Button" });
}
var le = "div";
var oe = S.RenderStrategy | S.Static;
function re(e4, n6) {
  let o10 = I(), { id: u9 = `headlessui-disclosure-panel-${o10}`, ...T7 } = e4, [l11, t17] = M("Disclosure.Panel"), { close: f10 } = w2("Disclosure.Panel"), s14 = y(n6, l11.panelRef, (P4) => {
    a2(() => t17({ type: P4 ? 4 : 5 }));
  });
  (0, import_react10.useEffect)(() => (t17({ type: 3, panelId: u9 }), () => {
    t17({ type: 3, panelId: null });
  }), [u9, t17]);
  let i6 = C(), c12 = (() => i6 !== null ? (i6 & d2.Open) === d2.Open : l11.disclosureState === 0)(), D5 = (0, import_react10.useMemo)(() => ({ open: l11.disclosureState === 0, close: f10 }), [l11, f10]), d11 = { ref: s14, id: u9 };
  return import_react10.default.createElement(H.Provider, { value: l11.panelId }, X({ ourProps: d11, theirProps: T7, slot: D5, defaultTag: le, features: oe, visible: c12, name: "Disclosure.Panel" }));
}
var se = D(ee);
var ue = D(ne);
var ie = D(re);
var ve = Object.assign(se, { Button: ue, Panel: ie });

// node_modules/react-use/esm/misc/util.js
function on(obj) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (obj && obj.addEventListener) {
    obj.addEventListener.apply(obj, args);
  }
}
function off(obj) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (obj && obj.removeEventListener) {
    obj.removeEventListener.apply(obj, args);
  }
}
var isBrowser = typeof window !== "undefined";

// node_modules/react-use/esm/useDebounce.js
var import_react12 = __toESM(require_react());

// node_modules/react-use/esm/useTimeoutFn.js
var import_react11 = __toESM(require_react());
function useTimeoutFn(fn, ms) {
  if (ms === void 0) {
    ms = 0;
  }
  var ready = (0, import_react11.useRef)(false);
  var timeout = (0, import_react11.useRef)();
  var callback = (0, import_react11.useRef)(fn);
  var isReady = (0, import_react11.useCallback)(function() {
    return ready.current;
  }, []);
  var set = (0, import_react11.useCallback)(function() {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(function() {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);
  var clear = (0, import_react11.useCallback)(function() {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);
  (0, import_react11.useEffect)(function() {
    callback.current = fn;
  }, [fn]);
  (0, import_react11.useEffect)(function() {
    set();
    return clear;
  }, [ms]);
  return [isReady, clear, set];
}

// node_modules/react-use/esm/useDebounce.js
function useDebounce(fn, ms, deps) {
  if (ms === void 0) {
    ms = 0;
  }
  if (deps === void 0) {
    deps = [];
  }
  var _a = useTimeoutFn(fn, ms), isReady = _a[0], cancel = _a[1], reset = _a[2];
  (0, import_react12.useEffect)(reset, deps);
  return [isReady, cancel];
}

// node_modules/react-use/esm/useEffectOnce.js
var import_react13 = __toESM(require_react());
var useEffectOnce = function(effect) {
  (0, import_react13.useEffect)(effect, []);
};
var useEffectOnce_default = useEffectOnce;

// node_modules/react-use/esm/useRafState.js
var import_react15 = __toESM(require_react());

// node_modules/react-use/esm/useUnmount.js
var import_react14 = __toESM(require_react());
var useUnmount = function(fn) {
  var fnRef = (0, import_react14.useRef)(fn);
  fnRef.current = fn;
  useEffectOnce_default(function() {
    return function() {
      return fnRef.current();
    };
  });
};
var useUnmount_default = useUnmount;

// node_modules/react-use/esm/useRafState.js
var useRafState = function(initialState) {
  var frame = (0, import_react15.useRef)(0);
  var _a = (0, import_react15.useState)(initialState), state = _a[0], setState = _a[1];
  var setRafState = (0, import_react15.useCallback)(function(value) {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(function() {
      setState(value);
    });
  }, []);
  useUnmount_default(function() {
    cancelAnimationFrame(frame.current);
  });
  return [state, setRafState];
};
var useRafState_default = useRafState;

// node_modules/react-use/esm/useScroll.js
var import_react16 = __toESM(require_react());
var useScroll = function(ref) {
  if (true) {
    if (typeof ref !== "object" || typeof ref.current === "undefined") {
      console.error("`useScroll` expects a single ref argument.");
    }
  }
  var _a = useRafState_default({
    x: 0,
    y: 0
  }), state = _a[0], setState = _a[1];
  (0, import_react16.useEffect)(function() {
    var handler = function() {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop
        });
      }
    };
    if (ref.current) {
      on(ref.current, "scroll", handler, {
        capture: false,
        passive: true
      });
    }
    return function() {
      if (ref.current) {
        off(ref.current, "scroll", handler);
      }
    };
  }, [ref]);
  return state;
};
var useScroll_default = useScroll;

// node_modules/react-use/esm/useWindowScroll.js
var import_react17 = __toESM(require_react());
var useWindowScroll = function() {
  var _a = useRafState_default(function() {
    return {
      x: isBrowser ? window.pageXOffset : 0,
      y: isBrowser ? window.pageYOffset : 0
    };
  }), state = _a[0], setState = _a[1];
  (0, import_react17.useEffect)(function() {
    var handler = function() {
      setState(function(state2) {
        var pageXOffset = window.pageXOffset, pageYOffset = window.pageYOffset;
        return state2.x !== pageXOffset || state2.y !== pageYOffset ? {
          x: pageXOffset,
          y: pageYOffset
        } : state2;
      });
    };
    handler();
    on(window, "scroll", handler, {
      capture: false,
      passive: true
    });
    return function() {
      off(window, "scroll", handler);
    };
  }, []);
  return state;
};
var useWindowScroll_default = useWindowScroll;

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
var import_react18 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/micro-task.js
function t8(e4) {
  typeof queueMicrotask == "function" ? queueMicrotask(e4) : Promise.resolve().then(e4).catch((o10) => setTimeout(() => {
    throw o10;
  }));
}

// node_modules/@headlessui/react/dist/utils/disposables.js
function o6() {
  let n6 = [], r9 = { addEventListener(e4, t17, s14, a12) {
    return e4.addEventListener(t17, s14, a12), r9.add(() => e4.removeEventListener(t17, s14, a12));
  }, requestAnimationFrame(...e4) {
    let t17 = requestAnimationFrame(...e4);
    return r9.add(() => cancelAnimationFrame(t17));
  }, nextFrame(...e4) {
    return r9.requestAnimationFrame(() => r9.requestAnimationFrame(...e4));
  }, setTimeout(...e4) {
    let t17 = setTimeout(...e4);
    return r9.add(() => clearTimeout(t17));
  }, microTask(...e4) {
    let t17 = { current: true };
    return t8(() => {
      t17.current && e4[0]();
    }), r9.add(() => {
      t17.current = false;
    });
  }, style(e4, t17, s14) {
    let a12 = e4.style.getPropertyValue(t17);
    return Object.assign(e4.style, { [t17]: s14 }), this.add(() => {
      Object.assign(e4.style, { [t17]: a12 });
    });
  }, group(e4) {
    let t17 = o6();
    return e4(t17), this.add(() => t17.dispose());
  }, add(e4) {
    return n6.push(e4), () => {
      let t17 = n6.indexOf(e4);
      if (t17 >= 0)
        for (let s14 of n6.splice(t17, 1))
          s14();
    };
  }, dispose() {
    for (let e4 of n6.splice(0))
      e4();
  } };
  return r9;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
function p2() {
  let [e4] = (0, import_react18.useState)(o6);
  return (0, import_react18.useEffect)(() => () => e4.dispose(), [e4]), e4;
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var import_react21 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/focus-management.js
var c4 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e4) => `${e4}:not([tabindex='-1'])`).join(",");
var M2 = ((n6) => (n6[n6.First = 1] = "First", n6[n6.Previous = 2] = "Previous", n6[n6.Next = 4] = "Next", n6[n6.Last = 8] = "Last", n6[n6.WrapAround = 16] = "WrapAround", n6[n6.NoScroll = 32] = "NoScroll", n6))(M2 || {});
var N3 = ((o10) => (o10[o10.Error = 0] = "Error", o10[o10.Overflow = 1] = "Overflow", o10[o10.Success = 2] = "Success", o10[o10.Underflow = 3] = "Underflow", o10))(N3 || {});
var F2 = ((t17) => (t17[t17.Previous = -1] = "Previous", t17[t17.Next = 1] = "Next", t17))(F2 || {});
function f(e4 = document.body) {
  return e4 == null ? [] : Array.from(e4.querySelectorAll(c4)).sort((r9, t17) => Math.sign((r9.tabIndex || Number.MAX_SAFE_INTEGER) - (t17.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var T3 = ((t17) => (t17[t17.Strict = 0] = "Strict", t17[t17.Loose = 1] = "Loose", t17))(T3 || {});
function h3(e4, r9 = 0) {
  var t17;
  return e4 === ((t17 = e(e4)) == null ? void 0 : t17.body) ? false : u(r9, { [0]() {
    return e4.matches(c4);
  }, [1]() {
    let l11 = e4;
    for (; l11 !== null; ) {
      if (l11.matches(c4))
        return true;
      l11 = l11.parentElement;
    }
    return false;
  } });
}
function D2(e4) {
  let r9 = e(e4);
  o6().nextFrame(() => {
    r9 && !h3(r9.activeElement, 0) && y2(e4);
  });
}
var w3 = ((t17) => (t17[t17.Keyboard = 0] = "Keyboard", t17[t17.Mouse = 1] = "Mouse", t17))(w3 || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e4) => {
  e4.metaKey || e4.altKey || e4.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true), document.addEventListener("click", (e4) => {
  e4.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e4.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true));
function y2(e4) {
  e4 == null || e4.focus({ preventScroll: true });
}
var S3 = ["textarea", "input"].join(",");
function H2(e4) {
  var r9, t17;
  return (t17 = (r9 = e4 == null ? void 0 : e4.matches) == null ? void 0 : r9.call(e4, S3)) != null ? t17 : false;
}
function I3(e4, r9 = (t17) => t17) {
  return e4.slice().sort((t17, l11) => {
    let o10 = r9(t17), i6 = r9(l11);
    if (o10 === null || i6 === null)
      return 0;
    let n6 = o10.compareDocumentPosition(i6);
    return n6 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n6 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function _(e4, r9) {
  return O(f(), r9, { relativeTo: e4 });
}
function O(e4, r9, { sorted: t17 = true, relativeTo: l11 = null, skipElements: o10 = [] } = {}) {
  let i6 = Array.isArray(e4) ? e4.length > 0 ? e4[0].ownerDocument : document : e4.ownerDocument, n6 = Array.isArray(e4) ? t17 ? I3(e4) : e4 : f(e4);
  o10.length > 0 && n6.length > 1 && (n6 = n6.filter((s14) => !o10.includes(s14))), l11 = l11 != null ? l11 : i6.activeElement;
  let E8 = (() => {
    if (r9 & 5)
      return 1;
    if (r9 & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x5 = (() => {
    if (r9 & 1)
      return 0;
    if (r9 & 2)
      return Math.max(0, n6.indexOf(l11)) - 1;
    if (r9 & 4)
      return Math.max(0, n6.indexOf(l11)) + 1;
    if (r9 & 8)
      return n6.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p6 = r9 & 32 ? { preventScroll: true } : {}, d11 = 0, a12 = n6.length, u9;
  do {
    if (d11 >= a12 || d11 + a12 <= 0)
      return 0;
    let s14 = x5 + d11;
    if (r9 & 16)
      s14 = (s14 + a12) % a12;
    else {
      if (s14 < 0)
        return 3;
      if (s14 >= a12)
        return 1;
    }
    u9 = n6[s14], u9 == null || u9.focus(p6), d11 += E8;
  } while (u9 !== i6.activeElement);
  return r9 & 6 && H2(u9) && u9.select(), 2;
}

// node_modules/@headlessui/react/dist/hooks/use-document-event.js
var import_react19 = __toESM(require_react(), 1);
function d3(e4, r9, n6) {
  let o10 = s2(r9);
  (0, import_react19.useEffect)(() => {
    function t17(u9) {
      o10.current(u9);
    }
    return document.addEventListener(e4, t17, n6), () => document.removeEventListener(e4, t17, n6);
  }, [e4, n6]);
}

// node_modules/@headlessui/react/dist/hooks/use-window-event.js
var import_react20 = __toESM(require_react(), 1);
function s6(e4, r9, n6) {
  let o10 = s2(r9);
  (0, import_react20.useEffect)(() => {
    function t17(i6) {
      o10.current(i6);
    }
    return window.addEventListener(e4, t17, n6), () => window.removeEventListener(e4, t17, n6);
  }, [e4, n6]);
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
function h4(s14, m10, a12 = true) {
  let i6 = (0, import_react21.useRef)(false);
  (0, import_react21.useEffect)(() => {
    requestAnimationFrame(() => {
      i6.current = a12;
    });
  }, [a12]);
  function c12(e4, r9) {
    if (!i6.current || e4.defaultPrevented)
      return;
    let t17 = r9(e4);
    if (t17 === null || !t17.getRootNode().contains(t17) || !t17.isConnected)
      return;
    let E8 = function u9(n6) {
      return typeof n6 == "function" ? u9(n6()) : Array.isArray(n6) || n6 instanceof Set ? n6 : [n6];
    }(s14);
    for (let u9 of E8) {
      if (u9 === null)
        continue;
      let n6 = u9 instanceof HTMLElement ? u9 : u9.current;
      if (n6 != null && n6.contains(t17) || e4.composed && e4.composedPath().includes(n6))
        return;
    }
    return !h3(t17, T3.Loose) && t17.tabIndex !== -1 && e4.preventDefault(), m10(e4, t17);
  }
  let o10 = (0, import_react21.useRef)(null);
  d3("pointerdown", (e4) => {
    var r9, t17;
    i6.current && (o10.current = ((t17 = (r9 = e4.composedPath) == null ? void 0 : r9.call(e4)) == null ? void 0 : t17[0]) || e4.target);
  }, true), d3("mousedown", (e4) => {
    var r9, t17;
    i6.current && (o10.current = ((t17 = (r9 = e4.composedPath) == null ? void 0 : r9.call(e4)) == null ? void 0 : t17[0]) || e4.target);
  }, true), d3("click", (e4) => {
    o10.current && (c12(e4, () => o10.current), o10.current = null);
  }, true), d3("touchend", (e4) => c12(e4, () => e4.target instanceof HTMLElement ? e4.target : null), true), s6("blur", (e4) => c12(e4, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}

// node_modules/@headlessui/react/dist/hooks/use-tree-walker.js
var import_react22 = __toESM(require_react(), 1);
function F3({ container: e4, accept: t17, walk: r9, enabled: c12 = true }) {
  let o10 = (0, import_react22.useRef)(t17), l11 = (0, import_react22.useRef)(r9);
  (0, import_react22.useEffect)(() => {
    o10.current = t17, l11.current = r9;
  }, [t17, r9]), l(() => {
    if (!e4 || !c12)
      return;
    let n6 = e(e4);
    if (!n6)
      return;
    let f10 = o10.current, p6 = l11.current, d11 = Object.assign((i6) => f10(i6), { acceptNode: f10 }), u9 = n6.createTreeWalker(e4, NodeFilter.SHOW_ELEMENT, d11, false);
    for (; u9.nextNode(); )
      p6(u9.currentNode);
  }, [e4, c12, o10, l11]);
}

// node_modules/@headlessui/react/dist/utils/calculate-active-index.js
function f3(r9) {
  throw new Error("Unexpected object: " + r9);
}
var a3 = ((e4) => (e4[e4.First = 0] = "First", e4[e4.Previous = 1] = "Previous", e4[e4.Next = 2] = "Next", e4[e4.Last = 3] = "Last", e4[e4.Specific = 4] = "Specific", e4[e4.Nothing = 5] = "Nothing", e4))(a3 || {});
function x2(r9, n6) {
  let t17 = n6.resolveItems();
  if (t17.length <= 0)
    return null;
  let l11 = n6.resolveActiveIndex(), s14 = l11 != null ? l11 : -1, d11 = (() => {
    switch (r9.focus) {
      case 0:
        return t17.findIndex((e4) => !n6.resolveDisabled(e4));
      case 1: {
        let e4 = t17.slice().reverse().findIndex((i6, c12, u9) => s14 !== -1 && u9.length - c12 - 1 >= s14 ? false : !n6.resolveDisabled(i6));
        return e4 === -1 ? e4 : t17.length - 1 - e4;
      }
      case 2:
        return t17.findIndex((e4, i6) => i6 <= s14 ? false : !n6.resolveDisabled(e4));
      case 3: {
        let e4 = t17.slice().reverse().findIndex((i6) => !n6.resolveDisabled(i6));
        return e4 === -1 ? e4 : t17.length - 1 - e4;
      }
      case 4:
        return t17.findIndex((e4) => n6.resolveId(e4) === r9.id);
      case 5:
        return null;
      default:
        f3(r9);
    }
  })();
  return d11 === -1 ? l11 : d11;
}

// node_modules/@headlessui/react/dist/internal/hidden.js
var a4 = "div";
var p3 = ((e4) => (e4[e4.None = 1] = "None", e4[e4.Focusable = 2] = "Focusable", e4[e4.Hidden = 4] = "Hidden", e4))(p3 || {});
function s7(t17, o10) {
  let { features: n6 = 1, ...e4 } = t17, d11 = { ref: o10, "aria-hidden": (n6 & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n6 & 4) === 4 && (n6 & 2) !== 2 && { display: "none" } } };
  return X({ ourProps: d11, theirProps: e4, slot: {}, defaultTag: a4, name: "Hidden" });
}
var c5 = D(s7);

// node_modules/@headlessui/react/dist/hooks/use-watch.js
var import_react23 = __toESM(require_react(), 1);
function m3(u9, t17) {
  let e4 = (0, import_react23.useRef)([]), r9 = o2(u9);
  (0, import_react23.useEffect)(() => {
    let o10 = [...e4.current];
    for (let [n6, a12] of t17.entries())
      if (e4.current[n6] !== a12) {
        let l11 = r9(t17, o10);
        return e4.current = t17, l11;
      }
  }, [r9, ...t17]);
}

// node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js
var import_react24 = __toESM(require_react(), 1);
function t9(e4) {
  return [e4.screenX, e4.screenY];
}
function u3() {
  let e4 = (0, import_react24.useRef)([-1, -1]);
  return { wasMoved(r9) {
    let n6 = t9(r9);
    return e4.current[0] === n6[0] && e4.current[1] === n6[1] ? false : (e4.current = n6, true);
  }, update(r9) {
    e4.current = t9(r9);
  } };
}

// node_modules/@headlessui/react/dist/utils/platform.js
function t10() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}

// node_modules/@headlessui/react/dist/hooks/use-owner.js
var import_react25 = __toESM(require_react(), 1);
function n2(...e4) {
  return (0, import_react25.useMemo)(() => e(...e4), [...e4]);
}

// node_modules/@headlessui/react/dist/components/dialog/dialog.js
var import_react36 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
var import_react30 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-tab-direction.js
var import_react26 = __toESM(require_react(), 1);
var s9 = ((r9) => (r9[r9.Forwards = 0] = "Forwards", r9[r9.Backwards = 1] = "Backwards", r9))(s9 || {});
function n3() {
  let e4 = (0, import_react26.useRef)(0);
  return s6("keydown", (o10) => {
    o10.key === "Tab" && (e4.current = o10.shiftKey ? 1 : 0);
  }, true), e4;
}

// node_modules/@headlessui/react/dist/hooks/use-is-mounted.js
var import_react27 = __toESM(require_react(), 1);
function f5() {
  let e4 = (0, import_react27.useRef)(false);
  return l(() => (e4.current = true, () => {
    e4.current = false;
  }), []), e4;
}

// node_modules/@headlessui/react/dist/hooks/use-event-listener.js
var import_react28 = __toESM(require_react(), 1);
function E4(n6, e4, a12, t17) {
  let i6 = s2(a12);
  (0, import_react28.useEffect)(() => {
    n6 = n6 != null ? n6 : window;
    function r9(o10) {
      i6.current(o10);
    }
    return n6.addEventListener(e4, r9, t17), () => n6.removeEventListener(e4, r9, t17);
  }, [n6, e4, t17]);
}

// node_modules/@headlessui/react/dist/utils/document-ready.js
function t13(n6) {
  function e4() {
    document.readyState !== "loading" && (n6(), document.removeEventListener("DOMContentLoaded", e4));
  }
  typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e4), e4());
}

// node_modules/@headlessui/react/dist/hooks/use-on-unmount.js
var import_react29 = __toESM(require_react(), 1);
function c6(t17) {
  let r9 = o2(t17), e4 = (0, import_react29.useRef)(false);
  (0, import_react29.useEffect)(() => (e4.current = false, () => {
    e4.current = true, t8(() => {
      e4.current && r9();
    });
  }), [r9]);
}

// node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
function P(t17) {
  if (!t17)
    return /* @__PURE__ */ new Set();
  if (typeof t17 == "function")
    return new Set(t17());
  let r9 = /* @__PURE__ */ new Set();
  for (let e4 of t17.current)
    e4.current instanceof HTMLElement && r9.add(e4.current);
  return r9;
}
var J = "div";
var h5 = ((n6) => (n6[n6.None = 1] = "None", n6[n6.InitialFocus = 2] = "InitialFocus", n6[n6.TabLock = 4] = "TabLock", n6[n6.FocusLock = 8] = "FocusLock", n6[n6.RestoreFocus = 16] = "RestoreFocus", n6[n6.All = 30] = "All", n6))(h5 || {});
function X2(t17, r9) {
  let e4 = (0, import_react30.useRef)(null), o10 = y(e4, r9), { initialFocus: u9, containers: i6, features: n6 = 30, ...l11 } = t17;
  l3() || (n6 = 1);
  let m10 = n2(e4);
  Y2({ ownerDocument: m10 }, Boolean(n6 & 16));
  let c12 = Z2({ ownerDocument: m10, container: e4, initialFocus: u9 }, Boolean(n6 & 2));
  $({ ownerDocument: m10, container: e4, containers: i6, previousActiveElement: c12 }, Boolean(n6 & 8));
  let v4 = n3(), y6 = o2((s14) => {
    let T7 = e4.current;
    if (!T7)
      return;
    ((B2) => B2())(() => {
      u(v4.current, { [s9.Forwards]: () => {
        O(T7, M2.First, { skipElements: [s14.relatedTarget] });
      }, [s9.Backwards]: () => {
        O(T7, M2.Last, { skipElements: [s14.relatedTarget] });
      } });
    });
  }), _3 = p2(), b6 = (0, import_react30.useRef)(false), j5 = { ref: o10, onKeyDown(s14) {
    s14.key == "Tab" && (b6.current = true, _3.requestAnimationFrame(() => {
      b6.current = false;
    }));
  }, onBlur(s14) {
    let T7 = P(i6);
    e4.current instanceof HTMLElement && T7.add(e4.current);
    let d11 = s14.relatedTarget;
    d11 instanceof HTMLElement && d11.dataset.headlessuiFocusGuard !== "true" && (S4(T7, d11) || (b6.current ? O(e4.current, u(v4.current, { [s9.Forwards]: () => M2.Next, [s9.Backwards]: () => M2.Previous }) | M2.WrapAround, { relativeTo: s14.target }) : s14.target instanceof HTMLElement && y2(s14.target)));
  } };
  return import_react30.default.createElement(import_react30.default.Fragment, null, Boolean(n6 & 4) && import_react30.default.createElement(c5, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: y6, features: p3.Focusable }), X({ ourProps: j5, theirProps: l11, defaultTag: J, name: "FocusTrap" }), Boolean(n6 & 4) && import_react30.default.createElement(c5, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: y6, features: p3.Focusable }));
}
var z2 = D(X2);
var ge = Object.assign(z2, { features: h5 });
var a5 = [];
t13(() => {
  function t17(r9) {
    r9.target instanceof HTMLElement && r9.target !== document.body && a5[0] !== r9.target && (a5.unshift(r9.target), a5 = a5.filter((e4) => e4 != null && e4.isConnected), a5.splice(10));
  }
  window.addEventListener("click", t17, { capture: true }), window.addEventListener("mousedown", t17, { capture: true }), window.addEventListener("focus", t17, { capture: true }), document.body.addEventListener("click", t17, { capture: true }), document.body.addEventListener("mousedown", t17, { capture: true }), document.body.addEventListener("focus", t17, { capture: true });
});
function Q2(t17 = true) {
  let r9 = (0, import_react30.useRef)(a5.slice());
  return m3(([e4], [o10]) => {
    o10 === true && e4 === false && t8(() => {
      r9.current.splice(0);
    }), o10 === false && e4 === true && (r9.current = a5.slice());
  }, [t17, a5, r9]), o2(() => {
    var e4;
    return (e4 = r9.current.find((o10) => o10 != null && o10.isConnected)) != null ? e4 : null;
  });
}
function Y2({ ownerDocument: t17 }, r9) {
  let e4 = Q2(r9);
  m3(() => {
    r9 || (t17 == null ? void 0 : t17.activeElement) === (t17 == null ? void 0 : t17.body) && y2(e4());
  }, [r9]), c6(() => {
    r9 && y2(e4());
  });
}
function Z2({ ownerDocument: t17, container: r9, initialFocus: e4 }, o10) {
  let u9 = (0, import_react30.useRef)(null), i6 = f5();
  return m3(() => {
    if (!o10)
      return;
    let n6 = r9.current;
    n6 && t8(() => {
      if (!i6.current)
        return;
      let l11 = t17 == null ? void 0 : t17.activeElement;
      if (e4 != null && e4.current) {
        if ((e4 == null ? void 0 : e4.current) === l11) {
          u9.current = l11;
          return;
        }
      } else if (n6.contains(l11)) {
        u9.current = l11;
        return;
      }
      e4 != null && e4.current ? y2(e4.current) : O(n6, M2.First) === N3.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), u9.current = t17 == null ? void 0 : t17.activeElement;
    });
  }, [o10]), u9;
}
function $({ ownerDocument: t17, container: r9, containers: e4, previousActiveElement: o10 }, u9) {
  let i6 = f5();
  E4(t17 == null ? void 0 : t17.defaultView, "focus", (n6) => {
    if (!u9 || !i6.current)
      return;
    let l11 = P(e4);
    r9.current instanceof HTMLElement && l11.add(r9.current);
    let m10 = o10.current;
    if (!m10)
      return;
    let c12 = n6.target;
    c12 && c12 instanceof HTMLElement ? S4(l11, c12) ? (o10.current = c12, y2(c12)) : (n6.preventDefault(), n6.stopPropagation(), y2(m10)) : y2(o10.current);
  }, true);
}
function S4(t17, r9) {
  for (let e4 of t17)
    if (e4.contains(r9))
      return true;
  return false;
}

// node_modules/@headlessui/react/dist/components/portal/portal.js
var import_react32 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/internal/portal-force-root.js
var import_react31 = __toESM(require_react(), 1);
var e2 = (0, import_react31.createContext)(false);
function l5() {
  return (0, import_react31.useContext)(e2);
}
function P2(o10) {
  return import_react31.default.createElement(e2.Provider, { value: o10.force }, o10.children);
}

// node_modules/@headlessui/react/dist/components/portal/portal.js
function F4(p6) {
  let l11 = l5(), n6 = (0, import_react32.useContext)(v2), e4 = n2(p6), [a12, o10] = (0, import_react32.useState)(() => {
    if (!l11 && n6 !== null || s.isServer)
      return null;
    let t17 = e4 == null ? void 0 : e4.getElementById("headlessui-portal-root");
    if (t17)
      return t17;
    if (e4 === null)
      return null;
    let r9 = e4.createElement("div");
    return r9.setAttribute("id", "headlessui-portal-root"), e4.body.appendChild(r9);
  });
  return (0, import_react32.useEffect)(() => {
    a12 !== null && (e4 != null && e4.body.contains(a12) || e4 == null || e4.body.appendChild(a12));
  }, [a12, e4]), (0, import_react32.useEffect)(() => {
    l11 || n6 !== null && o10(n6.current);
  }, [n6, o10, l11]), a12;
}
var U = import_react32.Fragment;
function N4(p6, l11) {
  let n6 = p6, e4 = (0, import_react32.useRef)(null), a12 = y(T2((u9) => {
    e4.current = u9;
  }), l11), o10 = n2(e4), t17 = F4(e4), [r9] = (0, import_react32.useState)(() => {
    var u9;
    return s.isServer ? null : (u9 = o10 == null ? void 0 : o10.createElement("div")) != null ? u9 : null;
  }), i6 = (0, import_react32.useContext)(f6), C4 = l3();
  return l(() => {
    !t17 || !r9 || t17.contains(r9) || (r9.setAttribute("data-headlessui-portal", ""), t17.appendChild(r9));
  }, [t17, r9]), l(() => {
    if (r9 && i6)
      return i6.register(r9);
  }, [i6, r9]), c6(() => {
    var u9;
    !t17 || !r9 || (r9 instanceof Node && t17.contains(r9) && t17.removeChild(r9), t17.childNodes.length <= 0 && ((u9 = t17.parentElement) == null || u9.removeChild(t17)));
  }), C4 ? !t17 || !r9 ? null : (0, import_react_dom.createPortal)(X({ ourProps: { ref: a12 }, theirProps: n6, defaultTag: U, name: "Portal" }), r9) : null;
}
var S5 = import_react32.Fragment;
var v2 = (0, import_react32.createContext)(null);
function j2(p6, l11) {
  let { target: n6, ...e4 } = p6, o10 = { ref: y(l11) };
  return import_react32.default.createElement(v2.Provider, { value: n6 }, X({ ourProps: o10, theirProps: e4, defaultTag: S5, name: "Popover.Group" }));
}
var f6 = (0, import_react32.createContext)(null);
function ae() {
  let p6 = (0, import_react32.useContext)(f6), l11 = (0, import_react32.useRef)([]), n6 = o2((o10) => (l11.current.push(o10), p6 && p6.register(o10), () => e4(o10))), e4 = o2((o10) => {
    let t17 = l11.current.indexOf(o10);
    t17 !== -1 && l11.current.splice(t17, 1), p6 && p6.unregister(o10);
  }), a12 = (0, import_react32.useMemo)(() => ({ register: n6, unregister: e4, portals: l11 }), [n6, e4, l11]);
  return [l11, (0, import_react32.useMemo)(() => function({ children: t17 }) {
    return import_react32.default.createElement(f6.Provider, { value: a12 }, t17);
  }, [a12])];
}
var D3 = D(N4);
var I4 = D(j2);
var pe = Object.assign(D3, { Group: I4 });

// node_modules/@headlessui/react/dist/components/description/description.js
var import_react33 = __toESM(require_react(), 1);
var d8 = (0, import_react33.createContext)(null);
function f7() {
  let r9 = (0, import_react33.useContext)(d8);
  if (r9 === null) {
    let t17 = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t17, f7), t17;
  }
  return r9;
}
function M3() {
  let [r9, t17] = (0, import_react33.useState)([]);
  return [r9.length > 0 ? r9.join(" ") : void 0, (0, import_react33.useMemo)(() => function(e4) {
    let i6 = o2((s14) => (t17((o10) => [...o10, s14]), () => t17((o10) => {
      let p6 = o10.slice(), c12 = p6.indexOf(s14);
      return c12 !== -1 && p6.splice(c12, 1), p6;
    }))), n6 = (0, import_react33.useMemo)(() => ({ register: i6, slot: e4.slot, name: e4.name, props: e4.props }), [i6, e4.slot, e4.name, e4.props]);
    return import_react33.default.createElement(d8.Provider, { value: n6 }, e4.children);
  }, [t17])];
}
var S6 = "p";
function h6(r9, t17) {
  let a12 = I(), { id: e4 = `headlessui-description-${a12}`, ...i6 } = r9, n6 = f7(), s14 = y(t17);
  l(() => n6.register(e4), [e4, n6.register]);
  let o10 = { ref: s14, ...n6.props, id: e4 };
  return X({ ourProps: o10, theirProps: i6, slot: n6.slot || {}, defaultTag: S6, name: n6.name || "Description" });
}
var y3 = D(h6);
var b2 = Object.assign(y3, {});

// node_modules/@headlessui/react/dist/internal/stack-context.js
var import_react34 = __toESM(require_react(), 1);
var a6 = (0, import_react34.createContext)(() => {
});
a6.displayName = "StackContext";
var s11 = ((e4) => (e4[e4.Add = 0] = "Add", e4[e4.Remove = 1] = "Remove", e4))(s11 || {});
function x3() {
  return (0, import_react34.useContext)(a6);
}
function M4({ children: i6, onUpdate: r9, type: e4, element: n6, enabled: u9 }) {
  let l11 = x3(), o10 = o2((...t17) => {
    r9 == null || r9(...t17), l11(...t17);
  });
  return l(() => {
    let t17 = u9 === void 0 || u9 === true;
    return t17 && o10(0, e4, n6), () => {
      t17 && o10(1, e4, n6);
    };
  }, [o10, e4, n6, u9]), import_react34.default.createElement(a6.Provider, { value: o10 }, i6);
}

// node_modules/@headlessui/react/dist/use-sync-external-store-shim/index.js
var e3 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimClient.js
var l7 = __toESM(require_react(), 1);
function i5(e4, t17) {
  return e4 === t17 && (e4 !== 0 || 1 / e4 === 1 / t17) || e4 !== e4 && t17 !== t17;
}
var d10 = typeof Object.is == "function" ? Object.is : i5;
var { useState: u6, useEffect: h7, useLayoutEffect: f8, useDebugValue: p4 } = l7;
function y4(e4, t17, c12) {
  const a12 = t17(), [{ inst: n6 }, o10] = u6({ inst: { value: a12, getSnapshot: t17 } });
  return f8(() => {
    n6.value = a12, n6.getSnapshot = t17, r6(n6) && o10({ inst: n6 });
  }, [e4, a12, t17]), h7(() => (r6(n6) && o10({ inst: n6 }), e4(() => {
    r6(n6) && o10({ inst: n6 });
  })), [e4]), p4(a12), a12;
}
function r6(e4) {
  const t17 = e4.getSnapshot, c12 = e4.value;
  try {
    const a12 = t17();
    return !d10(c12, a12);
  } catch {
    return true;
  }
}

// node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimServer.js
function t15(r9, e4, n6) {
  return e4();
}

// node_modules/@headlessui/react/dist/use-sync-external-store-shim/index.js
var r7 = typeof window != "undefined" && typeof window.document != "undefined" && typeof window.document.createElement != "undefined";
var s12 = !r7;
var c9 = s12 ? t15 : y4;
var a7 = "useSyncExternalStore" in e3 ? ((n6) => n6.useSyncExternalStore)(e3) : c9;

// node_modules/@headlessui/react/dist/hooks/use-store.js
function S7(t17) {
  return a7(t17.subscribe, t17.getSnapshot, t17.getSnapshot);
}

// node_modules/@headlessui/react/dist/utils/store.js
function a8(o10, r9) {
  let t17 = o10(), n6 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t17;
  }, subscribe(e4) {
    return n6.add(e4), () => n6.delete(e4);
  }, dispatch(e4, ...s14) {
    let i6 = r9[e4].call(t17, ...s14);
    i6 && (t17 = i6, n6.forEach((c12) => c12()));
  } };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js
function c10() {
  let o10;
  return { before({ doc: e4 }) {
    var l11;
    let n6 = e4.documentElement;
    o10 = ((l11 = e4.defaultView) != null ? l11 : window).innerWidth - n6.clientWidth;
  }, after({ doc: e4, d: n6 }) {
    let t17 = e4.documentElement, l11 = t17.clientWidth - t17.offsetWidth, r9 = o10 - l11;
    n6.style(t17, "paddingRight", `${r9}px`);
  } };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js
function T6() {
  if (!t10())
    return {};
  let l11;
  return { before() {
    l11 = window.pageYOffset;
  }, after({ doc: o10, d: t17, meta: s14 }) {
    function i6(n6) {
      return s14.containers.flatMap((e4) => e4()).some((e4) => e4.contains(n6));
    }
    t17.microTask(() => {
      if (window.getComputedStyle(o10.documentElement).scrollBehavior !== "auto") {
        let e4 = o6();
        e4.style(o10.documentElement, "scroll-behavior", "auto"), t17.add(() => t17.microTask(() => e4.dispose()));
      }
      t17.style(o10.body, "marginTop", `-${l11}px`), window.scrollTo(0, 0);
      let n6 = null;
      t17.addEventListener(o10, "click", (e4) => {
        if (e4.target instanceof HTMLElement)
          try {
            let r9 = e4.target.closest("a");
            if (!r9)
              return;
            let { hash: c12 } = new URL(r9.href), a12 = o10.querySelector(c12);
            a12 && !i6(a12) && (n6 = a12);
          } catch {
          }
      }, true), t17.addEventListener(o10, "touchmove", (e4) => {
        e4.target instanceof HTMLElement && !i6(e4.target) && e4.preventDefault();
      }, { passive: false }), t17.add(() => {
        window.scrollTo(0, window.pageYOffset + l11), n6 && n6.isConnected && (n6.scrollIntoView({ block: "nearest" }), n6 = null);
      });
    });
  } };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js
function l8() {
  return { before({ doc: e4, d: o10 }) {
    o10.style(e4.documentElement, "overflow", "hidden");
  } };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js
function m7(e4) {
  let n6 = {};
  for (let t17 of e4)
    Object.assign(n6, t17(n6));
  return n6;
}
var a9 = a8(() => /* @__PURE__ */ new Map(), { PUSH(e4, n6) {
  var o10;
  let t17 = (o10 = this.get(e4)) != null ? o10 : { doc: e4, count: 0, d: o6(), meta: /* @__PURE__ */ new Set() };
  return t17.count++, t17.meta.add(n6), this.set(e4, t17), this;
}, POP(e4, n6) {
  let t17 = this.get(e4);
  return t17 && (t17.count--, t17.meta.delete(n6)), this;
}, SCROLL_PREVENT({ doc: e4, d: n6, meta: t17 }) {
  let o10 = { doc: e4, d: n6, meta: m7(t17) }, c12 = [T6(), c10(), l8()];
  c12.forEach(({ before: r9 }) => r9 == null ? void 0 : r9(o10)), c12.forEach(({ after: r9 }) => r9 == null ? void 0 : r9(o10));
}, SCROLL_ALLOW({ d: e4 }) {
  e4.dispose();
}, TEARDOWN({ doc: e4 }) {
  this.delete(e4);
} });
a9.subscribe(() => {
  let e4 = a9.getSnapshot(), n6 = /* @__PURE__ */ new Map();
  for (let [t17] of e4)
    n6.set(t17, t17.documentElement.style.overflow);
  for (let t17 of e4.values()) {
    let o10 = n6.get(t17.doc) === "hidden", c12 = t17.count !== 0;
    (c12 && !o10 || !c12 && o10) && a9.dispatch(t17.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t17), t17.count === 0 && a9.dispatch("TEARDOWN", t17);
  }
});

// node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js
function p5(e4, r9, n6) {
  let f10 = S7(a9), o10 = e4 ? f10.get(e4) : void 0, i6 = o10 ? o10.count > 0 : false;
  return l(() => {
    if (!(!e4 || !r9))
      return a9.dispatch("PUSH", e4, n6), () => a9.dispatch("POP", e4, n6);
  }, [r9, e4]), i6;
}

// node_modules/@headlessui/react/dist/hooks/use-inert.js
var u7 = /* @__PURE__ */ new Map();
var t16 = /* @__PURE__ */ new Map();
function h8(r9, l11 = true) {
  l(() => {
    var o10;
    if (!l11)
      return;
    let e4 = typeof r9 == "function" ? r9() : r9.current;
    if (!e4)
      return;
    function a12() {
      var d11;
      if (!e4)
        return;
      let i6 = (d11 = t16.get(e4)) != null ? d11 : 1;
      if (i6 === 1 ? t16.delete(e4) : t16.set(e4, i6 - 1), i6 !== 1)
        return;
      let n6 = u7.get(e4);
      n6 && (n6["aria-hidden"] === null ? e4.removeAttribute("aria-hidden") : e4.setAttribute("aria-hidden", n6["aria-hidden"]), e4.inert = n6.inert, u7.delete(e4));
    }
    let f10 = (o10 = t16.get(e4)) != null ? o10 : 0;
    return t16.set(e4, f10 + 1), f10 !== 0 || (u7.set(e4, { "aria-hidden": e4.getAttribute("aria-hidden"), inert: e4.inert }), e4.setAttribute("aria-hidden", "true"), e4.inert = true), a12;
  }, [r9, l11]);
}

// node_modules/@headlessui/react/dist/hooks/use-root-containers.js
var import_react35 = __toESM(require_react(), 1);
function j3({ defaultContainers: t17 = [], portals: r9, mainTreeNodeRef: u9 } = {}) {
  var c12;
  let o10 = (0, import_react35.useRef)((c12 = u9 == null ? void 0 : u9.current) != null ? c12 : null), l11 = n2(o10), f10 = o2(() => {
    var i6;
    let n6 = [];
    for (let e4 of t17)
      e4 !== null && (e4 instanceof HTMLElement ? n6.push(e4) : "current" in e4 && e4.current instanceof HTMLElement && n6.push(e4.current));
    if (r9 != null && r9.current)
      for (let e4 of r9.current)
        n6.push(e4);
    for (let e4 of (i6 = l11 == null ? void 0 : l11.querySelectorAll("html > *, body > *")) != null ? i6 : [])
      e4 !== document.body && e4 !== document.head && e4 instanceof HTMLElement && e4.id !== "headlessui-portal-root" && (e4.contains(o10.current) || n6.some((T7) => e4.contains(T7)) || n6.push(e4));
    return n6;
  });
  return { resolveContainers: f10, contains: o2((n6) => f10().some((i6) => i6.contains(n6))), mainTreeNodeRef: o10, MainTreeNode: (0, import_react35.useMemo)(() => function() {
    return u9 != null ? null : import_react35.default.createElement(c5, { features: p3.Hidden, ref: o10 });
  }, [o10, u9]) };
}

// node_modules/@headlessui/react/dist/components/dialog/dialog.js
var _e = ((o10) => (o10[o10.Open = 0] = "Open", o10[o10.Closed = 1] = "Closed", o10))(_e || {});
var Ie = ((e4) => (e4[e4.SetTitleId = 0] = "SetTitleId", e4))(Ie || {});
var Me = { [0](t17, e4) {
  return t17.titleId === e4.id ? t17 : { ...t17, titleId: e4.id };
} };
var I5 = (0, import_react36.createContext)(null);
I5.displayName = "DialogContext";
function b3(t17) {
  let e4 = (0, import_react36.useContext)(I5);
  if (e4 === null) {
    let o10 = new Error(`<${t17} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o10, b3), o10;
  }
  return e4;
}
function we(t17, e4, o10 = () => [document.body]) {
  p5(t17, e4, (i6) => {
    var n6;
    return { containers: [...(n6 = i6.containers) != null ? n6 : [], o10] };
  });
}
function Be(t17, e4) {
  return u(e4.type, Me, t17, e4);
}
var He = "div";
var Ge = S.RenderStrategy | S.Static;
function Ne(t17, e4) {
  var X4;
  let o10 = I(), { id: i6 = `headlessui-dialog-${o10}`, open: n6, onClose: l11, initialFocus: s14, __demoMode: g6 = false, ...T7 } = t17, [m10, h9] = (0, import_react36.useState)(0), a12 = C();
  n6 === void 0 && a12 !== null && (n6 = (a12 & d2.Open) === d2.Open);
  let D5 = (0, import_react36.useRef)(null), Q3 = y(D5, e4), f10 = n2(D5), N6 = t17.hasOwnProperty("open") || a12 !== null, U4 = t17.hasOwnProperty("onClose");
  if (!N6 && !U4)
    throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!N6)
    throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!U4)
    throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (typeof n6 != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${n6}`);
  if (typeof l11 != "function")
    throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${l11}`);
  let p6 = n6 ? 0 : 1, [S9, Z4] = (0, import_react36.useReducer)(Be, { titleId: null, descriptionId: null, panelRef: (0, import_react36.createRef)() }), P4 = o2(() => l11(false)), W2 = o2((r9) => Z4({ type: 0, id: r9 })), L2 = l3() ? g6 ? false : p6 === 0 : false, F6 = m10 > 1, Y4 = (0, import_react36.useContext)(I5) !== null, [ee2, te2] = ae(), { resolveContainers: M7, mainTreeNodeRef: k3, MainTreeNode: oe3 } = j3({ portals: ee2, defaultContainers: [(X4 = S9.panelRef.current) != null ? X4 : D5.current] }), re2 = F6 ? "parent" : "leaf", $4 = a12 !== null ? (a12 & d2.Closing) === d2.Closing : false, ne2 = (() => Y4 || $4 ? false : L2)(), le3 = (0, import_react36.useCallback)(() => {
    var r9, c12;
    return (c12 = Array.from((r9 = f10 == null ? void 0 : f10.querySelectorAll("body > *")) != null ? r9 : []).find((d11) => d11.id === "headlessui-portal-root" ? false : d11.contains(k3.current) && d11 instanceof HTMLElement)) != null ? c12 : null;
  }, [k3]);
  h8(le3, ne2);
  let ae3 = (() => F6 ? true : L2)(), ie2 = (0, import_react36.useCallback)(() => {
    var r9, c12;
    return (c12 = Array.from((r9 = f10 == null ? void 0 : f10.querySelectorAll("[data-headlessui-portal]")) != null ? r9 : []).find((d11) => d11.contains(k3.current) && d11 instanceof HTMLElement)) != null ? c12 : null;
  }, [k3]);
  h8(ie2, ae3);
  let se3 = (() => !(!L2 || F6))();
  h4(M7, P4, se3);
  let pe2 = (() => !(F6 || p6 !== 0))();
  E4(f10 == null ? void 0 : f10.defaultView, "keydown", (r9) => {
    pe2 && (r9.defaultPrevented || r9.key === o4.Escape && (r9.preventDefault(), r9.stopPropagation(), P4()));
  });
  let de2 = (() => !($4 || p6 !== 0 || Y4))();
  we(f10, de2, M7), (0, import_react36.useEffect)(() => {
    if (p6 !== 0 || !D5.current)
      return;
    let r9 = new ResizeObserver((c12) => {
      for (let d11 of c12) {
        let x5 = d11.target.getBoundingClientRect();
        x5.x === 0 && x5.y === 0 && x5.width === 0 && x5.height === 0 && P4();
      }
    });
    return r9.observe(D5.current), () => r9.disconnect();
  }, [p6, D5, P4]);
  let [ue2, fe2] = M3(), ge3 = (0, import_react36.useMemo)(() => [{ dialogState: p6, close: P4, setTitleId: W2 }, S9], [p6, S9, P4, W2]), J3 = (0, import_react36.useMemo)(() => ({ open: p6 === 0 }), [p6]), Te2 = { ref: Q3, id: i6, role: "dialog", "aria-modal": p6 === 0 ? true : void 0, "aria-labelledby": S9.titleId, "aria-describedby": ue2 };
  return import_react36.default.createElement(M4, { type: "Dialog", enabled: p6 === 0, element: D5, onUpdate: o2((r9, c12) => {
    c12 === "Dialog" && u(r9, { [s11.Add]: () => h9((d11) => d11 + 1), [s11.Remove]: () => h9((d11) => d11 - 1) });
  }) }, import_react36.default.createElement(P2, { force: true }, import_react36.default.createElement(pe, null, import_react36.default.createElement(I5.Provider, { value: ge3 }, import_react36.default.createElement(pe.Group, { target: D5 }, import_react36.default.createElement(P2, { force: false }, import_react36.default.createElement(fe2, { slot: J3, name: "Dialog.Description" }, import_react36.default.createElement(ge, { initialFocus: s14, containers: M7, features: L2 ? u(re2, { parent: ge.features.RestoreFocus, leaf: ge.features.All & ~ge.features.FocusLock }) : ge.features.None }, import_react36.default.createElement(te2, null, X({ ourProps: Te2, theirProps: T7, slot: J3, defaultTag: He, features: Ge, visible: p6 === 0, name: "Dialog" }))))))))), import_react36.default.createElement(oe3, null));
}
var Ue = "div";
function We(t17, e4) {
  let o10 = I(), { id: i6 = `headlessui-dialog-overlay-${o10}`, ...n6 } = t17, [{ dialogState: l11, close: s14 }] = b3("Dialog.Overlay"), g6 = y(e4), T7 = o2((a12) => {
    if (a12.target === a12.currentTarget) {
      if (r2(a12.currentTarget))
        return a12.preventDefault();
      a12.preventDefault(), a12.stopPropagation(), s14();
    }
  }), m10 = (0, import_react36.useMemo)(() => ({ open: l11 === 0 }), [l11]);
  return X({ ourProps: { ref: g6, id: i6, "aria-hidden": true, onClick: T7 }, theirProps: n6, slot: m10, defaultTag: Ue, name: "Dialog.Overlay" });
}
var Ye = "div";
function $e(t17, e4) {
  let o10 = I(), { id: i6 = `headlessui-dialog-backdrop-${o10}`, ...n6 } = t17, [{ dialogState: l11 }, s14] = b3("Dialog.Backdrop"), g6 = y(e4);
  (0, import_react36.useEffect)(() => {
    if (s14.panelRef.current === null)
      throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.");
  }, [s14.panelRef]);
  let T7 = (0, import_react36.useMemo)(() => ({ open: l11 === 0 }), [l11]);
  return import_react36.default.createElement(P2, { force: true }, import_react36.default.createElement(pe, null, X({ ourProps: { ref: g6, id: i6, "aria-hidden": true }, theirProps: n6, slot: T7, defaultTag: Ye, name: "Dialog.Backdrop" })));
}
var Je = "div";
function Xe(t17, e4) {
  let o10 = I(), { id: i6 = `headlessui-dialog-panel-${o10}`, ...n6 } = t17, [{ dialogState: l11 }, s14] = b3("Dialog.Panel"), g6 = y(e4, s14.panelRef), T7 = (0, import_react36.useMemo)(() => ({ open: l11 === 0 }), [l11]), m10 = o2((a12) => {
    a12.stopPropagation();
  });
  return X({ ourProps: { ref: g6, id: i6, onClick: m10 }, theirProps: n6, slot: T7, defaultTag: Je, name: "Dialog.Panel" });
}
var je = "h2";
function Ke(t17, e4) {
  let o10 = I(), { id: i6 = `headlessui-dialog-title-${o10}`, ...n6 } = t17, [{ dialogState: l11, setTitleId: s14 }] = b3("Dialog.Title"), g6 = y(e4);
  (0, import_react36.useEffect)(() => (s14(i6), () => s14(null)), [i6, s14]);
  let T7 = (0, import_react36.useMemo)(() => ({ open: l11 === 0 }), [l11]);
  return X({ ourProps: { ref: g6, id: i6 }, theirProps: n6, slot: T7, defaultTag: je, name: "Dialog.Title" });
}
var Ve = D(Ne);
var qe = D($e);
var ze = D(Xe);
var Qe = D(We);
var Ze = D(Ke);
var _t = Object.assign(Ve, { Backdrop: qe, Panel: ze, Overlay: Qe, Title: Ze, Description: b2 });

// node_modules/@headlessui/react/dist/hooks/use-text-value.js
var import_react37 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/get-text-value.js
var a11 = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o9(e4) {
  var r9, i6;
  let n6 = (r9 = e4.innerText) != null ? r9 : "", t17 = e4.cloneNode(true);
  if (!(t17 instanceof HTMLElement))
    return n6;
  let u9 = false;
  for (let f10 of t17.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))
    f10.remove(), u9 = true;
  let l11 = u9 ? (i6 = t17.innerText) != null ? i6 : "" : n6;
  return a11.test(l11) && (l11 = l11.replace(a11, "")), l11;
}
function g4(e4) {
  let n6 = e4.getAttribute("aria-label");
  if (typeof n6 == "string")
    return n6.trim();
  let t17 = e4.getAttribute("aria-labelledby");
  if (t17) {
    let u9 = t17.split(" ").map((l11) => {
      let r9 = document.getElementById(l11);
      if (r9) {
        let i6 = r9.getAttribute("aria-label");
        return typeof i6 == "string" ? i6.trim() : o9(r9).trim();
      }
      return null;
    }).filter(Boolean);
    if (u9.length > 0)
      return u9.join(", ");
  }
  return o9(e4).trim();
}

// node_modules/@headlessui/react/dist/hooks/use-text-value.js
function b4(c12) {
  let t17 = (0, import_react37.useRef)(""), r9 = (0, import_react37.useRef)("");
  return o2(() => {
    let e4 = c12.current;
    if (!e4)
      return "";
    let u9 = e4.innerText;
    if (t17.current === u9)
      return r9.current;
    let n6 = g4(e4).trim().toLowerCase();
    return t17.current = u9, r9.current = n6, n6;
  });
}

// node_modules/@headlessui/react/dist/components/menu/menu.js
var import_react38 = __toESM(require_react(), 1);
var me2 = ((r9) => (r9[r9.Open = 0] = "Open", r9[r9.Closed = 1] = "Closed", r9))(me2 || {});
var de = ((r9) => (r9[r9.Pointer = 0] = "Pointer", r9[r9.Other = 1] = "Other", r9))(de || {});
var fe = ((a12) => (a12[a12.OpenMenu = 0] = "OpenMenu", a12[a12.CloseMenu = 1] = "CloseMenu", a12[a12.GoToItem = 2] = "GoToItem", a12[a12.Search = 3] = "Search", a12[a12.ClearSearch = 4] = "ClearSearch", a12[a12.RegisterItem = 5] = "RegisterItem", a12[a12.UnregisterItem = 6] = "UnregisterItem", a12))(fe || {});
function w5(e4, u9 = (r9) => r9) {
  let r9 = e4.activeItemIndex !== null ? e4.items[e4.activeItemIndex] : null, i6 = I3(u9(e4.items.slice()), (t17) => t17.dataRef.current.domRef.current), s14 = r9 ? i6.indexOf(r9) : null;
  return s14 === -1 && (s14 = null), { items: i6, activeItemIndex: s14 };
}
var Te = { [1](e4) {
  return e4.menuState === 1 ? e4 : { ...e4, activeItemIndex: null, menuState: 1 };
}, [0](e4) {
  return e4.menuState === 0 ? e4 : { ...e4, __demoMode: false, menuState: 0 };
}, [2]: (e4, u9) => {
  var s14;
  let r9 = w5(e4), i6 = x2(u9, { resolveItems: () => r9.items, resolveActiveIndex: () => r9.activeItemIndex, resolveId: (t17) => t17.id, resolveDisabled: (t17) => t17.dataRef.current.disabled });
  return { ...e4, ...r9, searchQuery: "", activeItemIndex: i6, activationTrigger: (s14 = u9.trigger) != null ? s14 : 1 };
}, [3]: (e4, u9) => {
  let i6 = e4.searchQuery !== "" ? 0 : 1, s14 = e4.searchQuery + u9.value.toLowerCase(), o10 = (e4.activeItemIndex !== null ? e4.items.slice(e4.activeItemIndex + i6).concat(e4.items.slice(0, e4.activeItemIndex + i6)) : e4.items).find((l11) => {
    var m10;
    return ((m10 = l11.dataRef.current.textValue) == null ? void 0 : m10.startsWith(s14)) && !l11.dataRef.current.disabled;
  }), a12 = o10 ? e4.items.indexOf(o10) : -1;
  return a12 === -1 || a12 === e4.activeItemIndex ? { ...e4, searchQuery: s14 } : { ...e4, searchQuery: s14, activeItemIndex: a12, activationTrigger: 1 };
}, [4](e4) {
  return e4.searchQuery === "" ? e4 : { ...e4, searchQuery: "", searchActiveItemIndex: null };
}, [5]: (e4, u9) => {
  let r9 = w5(e4, (i6) => [...i6, { id: u9.id, dataRef: u9.dataRef }]);
  return { ...e4, ...r9 };
}, [6]: (e4, u9) => {
  let r9 = w5(e4, (i6) => {
    let s14 = i6.findIndex((t17) => t17.id === u9.id);
    return s14 !== -1 && i6.splice(s14, 1), i6;
  });
  return { ...e4, ...r9, activationTrigger: 1 };
} };
var U2 = (0, import_react38.createContext)(null);
U2.displayName = "MenuContext";
function O2(e4) {
  let u9 = (0, import_react38.useContext)(U2);
  if (u9 === null) {
    let r9 = new Error(`<${e4} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r9, O2), r9;
  }
  return u9;
}
function ye2(e4, u9) {
  return u(u9.type, Te, e4, u9);
}
var Ie2 = import_react38.Fragment;
function Me2(e4, u9) {
  let { __demoMode: r9 = false, ...i6 } = e4, s14 = (0, import_react38.useReducer)(ye2, { __demoMode: r9, menuState: r9 ? 0 : 1, buttonRef: (0, import_react38.createRef)(), itemsRef: (0, import_react38.createRef)(), items: [], searchQuery: "", activeItemIndex: null, activationTrigger: 1 }), [{ menuState: t17, itemsRef: o10, buttonRef: a12 }, l11] = s14, m10 = y(u9);
  h4([a12, o10], (g6, R3) => {
    var p6;
    l11({ type: 1 }), h3(R3, T3.Loose) || (g6.preventDefault(), (p6 = a12.current) == null || p6.focus());
  }, t17 === 0);
  let I6 = o2(() => {
    l11({ type: 1 });
  }), A = (0, import_react38.useMemo)(() => ({ open: t17 === 0, close: I6 }), [t17, I6]), f10 = { ref: m10 };
  return import_react38.default.createElement(U2.Provider, { value: s14 }, import_react38.default.createElement(c3, { value: u(t17, { [0]: d2.Open, [1]: d2.Closed }) }, X({ ourProps: f10, theirProps: i6, slot: A, defaultTag: Ie2, name: "Menu" })));
}
var ge2 = "button";
function Re(e4, u9) {
  var R3;
  let r9 = I(), { id: i6 = `headlessui-menu-button-${r9}`, ...s14 } = e4, [t17, o10] = O2("Menu.Button"), a12 = y(t17.buttonRef, u9), l11 = p2(), m10 = o2((p6) => {
    switch (p6.key) {
      case o4.Space:
      case o4.Enter:
      case o4.ArrowDown:
        p6.preventDefault(), p6.stopPropagation(), o10({ type: 0 }), l11.nextFrame(() => o10({ type: 2, focus: a3.First }));
        break;
      case o4.ArrowUp:
        p6.preventDefault(), p6.stopPropagation(), o10({ type: 0 }), l11.nextFrame(() => o10({ type: 2, focus: a3.Last }));
        break;
    }
  }), I6 = o2((p6) => {
    switch (p6.key) {
      case o4.Space:
        p6.preventDefault();
        break;
    }
  }), A = o2((p6) => {
    if (r2(p6.currentTarget))
      return p6.preventDefault();
    e4.disabled || (t17.menuState === 0 ? (o10({ type: 1 }), l11.nextFrame(() => {
      var M7;
      return (M7 = t17.buttonRef.current) == null ? void 0 : M7.focus({ preventScroll: true });
    })) : (p6.preventDefault(), o10({ type: 0 })));
  }), f10 = (0, import_react38.useMemo)(() => ({ open: t17.menuState === 0 }), [t17]), g6 = { ref: a12, id: i6, type: s4(e4, t17.buttonRef), "aria-haspopup": "menu", "aria-controls": (R3 = t17.itemsRef.current) == null ? void 0 : R3.id, "aria-expanded": t17.menuState === 0, onKeyDown: m10, onKeyUp: I6, onClick: A };
  return X({ ourProps: g6, theirProps: s14, slot: f10, defaultTag: ge2, name: "Menu.Button" });
}
var Ae = "div";
var be = S.RenderStrategy | S.Static;
function Ee(e4, u9) {
  var M7, b6;
  let r9 = I(), { id: i6 = `headlessui-menu-items-${r9}`, ...s14 } = e4, [t17, o10] = O2("Menu.Items"), a12 = y(t17.itemsRef, u9), l11 = n2(t17.itemsRef), m10 = p2(), I6 = C(), A = (() => I6 !== null ? (I6 & d2.Open) === d2.Open : t17.menuState === 0)();
  (0, import_react38.useEffect)(() => {
    let n6 = t17.itemsRef.current;
    n6 && t17.menuState === 0 && n6 !== (l11 == null ? void 0 : l11.activeElement) && n6.focus({ preventScroll: true });
  }, [t17.menuState, t17.itemsRef, l11]), F3({ container: t17.itemsRef.current, enabled: t17.menuState === 0, accept(n6) {
    return n6.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : n6.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(n6) {
    n6.setAttribute("role", "none");
  } });
  let f10 = o2((n6) => {
    var E8, P4;
    switch (m10.dispose(), n6.key) {
      case o4.Space:
        if (t17.searchQuery !== "")
          return n6.preventDefault(), n6.stopPropagation(), o10({ type: 3, value: n6.key });
      case o4.Enter:
        if (n6.preventDefault(), n6.stopPropagation(), o10({ type: 1 }), t17.activeItemIndex !== null) {
          let { dataRef: S9 } = t17.items[t17.activeItemIndex];
          (P4 = (E8 = S9.current) == null ? void 0 : E8.domRef.current) == null || P4.click();
        }
        D2(t17.buttonRef.current);
        break;
      case o4.ArrowDown:
        return n6.preventDefault(), n6.stopPropagation(), o10({ type: 2, focus: a3.Next });
      case o4.ArrowUp:
        return n6.preventDefault(), n6.stopPropagation(), o10({ type: 2, focus: a3.Previous });
      case o4.Home:
      case o4.PageUp:
        return n6.preventDefault(), n6.stopPropagation(), o10({ type: 2, focus: a3.First });
      case o4.End:
      case o4.PageDown:
        return n6.preventDefault(), n6.stopPropagation(), o10({ type: 2, focus: a3.Last });
      case o4.Escape:
        n6.preventDefault(), n6.stopPropagation(), o10({ type: 1 }), o6().nextFrame(() => {
          var S9;
          return (S9 = t17.buttonRef.current) == null ? void 0 : S9.focus({ preventScroll: true });
        });
        break;
      case o4.Tab:
        n6.preventDefault(), n6.stopPropagation(), o10({ type: 1 }), o6().nextFrame(() => {
          _(t17.buttonRef.current, n6.shiftKey ? M2.Previous : M2.Next);
        });
        break;
      default:
        n6.key.length === 1 && (o10({ type: 3, value: n6.key }), m10.setTimeout(() => o10({ type: 4 }), 350));
        break;
    }
  }), g6 = o2((n6) => {
    switch (n6.key) {
      case o4.Space:
        n6.preventDefault();
        break;
    }
  }), R3 = (0, import_react38.useMemo)(() => ({ open: t17.menuState === 0 }), [t17]), p6 = { "aria-activedescendant": t17.activeItemIndex === null || (M7 = t17.items[t17.activeItemIndex]) == null ? void 0 : M7.id, "aria-labelledby": (b6 = t17.buttonRef.current) == null ? void 0 : b6.id, id: i6, onKeyDown: f10, onKeyUp: g6, role: "menu", tabIndex: 0, ref: a12 };
  return X({ ourProps: p6, theirProps: s14, slot: R3, defaultTag: Ae, features: be, visible: A, name: "Menu.Items" });
}
var Se = import_react38.Fragment;
function Pe2(e4, u9) {
  let r9 = I(), { id: i6 = `headlessui-menu-item-${r9}`, disabled: s14 = false, ...t17 } = e4, [o10, a12] = O2("Menu.Item"), l11 = o10.activeItemIndex !== null ? o10.items[o10.activeItemIndex].id === i6 : false, m10 = (0, import_react38.useRef)(null), I6 = y(u9, m10);
  l(() => {
    if (o10.__demoMode || o10.menuState !== 0 || !l11 || o10.activationTrigger === 0)
      return;
    let T7 = o6();
    return T7.requestAnimationFrame(() => {
      var v4, B2;
      (B2 = (v4 = m10.current) == null ? void 0 : v4.scrollIntoView) == null || B2.call(v4, { block: "nearest" });
    }), T7.dispose;
  }, [o10.__demoMode, m10, l11, o10.menuState, o10.activationTrigger, o10.activeItemIndex]);
  let A = b4(m10), f10 = (0, import_react38.useRef)({ disabled: s14, domRef: m10, get textValue() {
    return A();
  } });
  l(() => {
    f10.current.disabled = s14;
  }, [f10, s14]), l(() => (a12({ type: 5, id: i6, dataRef: f10 }), () => a12({ type: 6, id: i6 })), [f10, i6]);
  let g6 = o2(() => {
    a12({ type: 1 });
  }), R3 = o2((T7) => {
    if (s14)
      return T7.preventDefault();
    a12({ type: 1 }), D2(o10.buttonRef.current);
  }), p6 = o2(() => {
    if (s14)
      return a12({ type: 2, focus: a3.Nothing });
    a12({ type: 2, focus: a3.Specific, id: i6 });
  }), M7 = u3(), b6 = o2((T7) => M7.update(T7)), n6 = o2((T7) => {
    M7.wasMoved(T7) && (s14 || l11 || a12({ type: 2, focus: a3.Specific, id: i6, trigger: 0 }));
  }), E8 = o2((T7) => {
    M7.wasMoved(T7) && (s14 || l11 && a12({ type: 2, focus: a3.Nothing }));
  }), P4 = (0, import_react38.useMemo)(() => ({ active: l11, disabled: s14, close: g6 }), [l11, s14, g6]);
  return X({ ourProps: { id: i6, ref: I6, role: "menuitem", tabIndex: s14 === true ? void 0 : -1, "aria-disabled": s14 === true ? true : void 0, disabled: void 0, onClick: R3, onFocus: p6, onPointerEnter: b6, onMouseEnter: b6, onPointerMove: n6, onMouseMove: n6, onPointerLeave: E8, onMouseLeave: E8 }, theirProps: t17, slot: P4, defaultTag: Se, name: "Menu.Item" });
}
var ve2 = D(Me2);
var xe = D(Re);
var he = D(Ee);
var De2 = D(Pe2);
var it = Object.assign(ve2, { Button: xe, Items: he, Item: De2 });

// node_modules/@headlessui/react/dist/hooks/use-flags.js
var import_react39 = __toESM(require_react(), 1);
function c11(a12 = 0) {
  let [l11, r9] = (0, import_react39.useState)(a12), t17 = f5(), o10 = (0, import_react39.useCallback)((e4) => {
    t17.current && r9((u9) => u9 | e4);
  }, [l11, t17]), m10 = (0, import_react39.useCallback)((e4) => Boolean(l11 & e4), [l11]), s14 = (0, import_react39.useCallback)((e4) => {
    t17.current && r9((u9) => u9 & ~e4);
  }, [r9, t17]), g6 = (0, import_react39.useCallback)((e4) => {
    t17.current && r9((u9) => u9 ^ e4);
  }, [r9]);
  return { flags: l11, addFlag: o10, hasFlag: m10, removeFlag: s14, toggleFlag: g6 };
}

// node_modules/@headlessui/react/dist/components/transitions/transition.js
var import_react40 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/once.js
function l10(r9) {
  let e4 = { called: false };
  return (...t17) => {
    if (!e4.called)
      return e4.called = true, r9(...t17);
  };
}

// node_modules/@headlessui/react/dist/components/transitions/utils/transition.js
function g5(t17, ...e4) {
  t17 && e4.length > 0 && t17.classList.add(...e4);
}
function v3(t17, ...e4) {
  t17 && e4.length > 0 && t17.classList.remove(...e4);
}
function b5(t17, e4) {
  let n6 = o6();
  if (!t17)
    return n6.dispose;
  let { transitionDuration: m10, transitionDelay: a12 } = getComputedStyle(t17), [u9, p6] = [m10, a12].map((l11) => {
    let [r9 = 0] = l11.split(",").filter(Boolean).map((i6) => i6.includes("ms") ? parseFloat(i6) : parseFloat(i6) * 1e3).sort((i6, T7) => T7 - i6);
    return r9;
  }), o10 = u9 + p6;
  if (o10 !== 0) {
    n6.group((r9) => {
      r9.setTimeout(() => {
        e4(), r9.dispose();
      }, o10), r9.addEventListener(t17, "transitionrun", (i6) => {
        i6.target === i6.currentTarget && r9.dispose();
      });
    });
    let l11 = n6.addEventListener(t17, "transitionend", (r9) => {
      r9.target === r9.currentTarget && (e4(), l11());
    });
  } else
    e4();
  return n6.add(() => e4()), n6.dispose;
}
function M5(t17, e4, n6, m10) {
  let a12 = n6 ? "enter" : "leave", u9 = o6(), p6 = m10 !== void 0 ? l10(m10) : () => {
  };
  a12 === "enter" && (t17.removeAttribute("hidden"), t17.style.display = "");
  let o10 = u(a12, { enter: () => e4.enter, leave: () => e4.leave }), l11 = u(a12, { enter: () => e4.enterTo, leave: () => e4.leaveTo }), r9 = u(a12, { enter: () => e4.enterFrom, leave: () => e4.leaveFrom });
  return v3(t17, ...e4.base, ...e4.enter, ...e4.enterTo, ...e4.enterFrom, ...e4.leave, ...e4.leaveFrom, ...e4.leaveTo, ...e4.entered), g5(t17, ...e4.base, ...o10, ...r9), u9.nextFrame(() => {
    v3(t17, ...e4.base, ...o10, ...r9), g5(t17, ...e4.base, ...o10, ...l11), b5(t17, () => (v3(t17, ...e4.base, ...o10), g5(t17, ...e4.base, ...e4.entered), p6()));
  }), u9.dispose;
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
function E7({ immediate: t17, container: s14, direction: n6, classes: u9, onStart: a12, onStop: c12 }) {
  let l11 = f5(), d11 = p2(), e4 = s2(n6);
  l(() => {
    t17 && (e4.current = "enter");
  }, [t17]), l(() => {
    let r9 = o6();
    d11.add(r9.dispose);
    let i6 = s14.current;
    if (i6 && e4.current !== "idle" && l11.current)
      return r9.dispose(), a12.current(e4.current), r9.add(M5(i6, u9.current, e4.current === "enter", () => {
        r9.dispose(), c12.current(e4.current);
      })), r9.dispose;
  }, [n6]);
}

// node_modules/@headlessui/react/dist/components/transitions/transition.js
function S8(t17 = "") {
  return t17.split(" ").filter((n6) => n6.trim().length > 1);
}
var _2 = (0, import_react40.createContext)(null);
_2.displayName = "TransitionContext";
var be2 = ((r9) => (r9.Visible = "visible", r9.Hidden = "hidden", r9))(be2 || {});
function Se2() {
  let t17 = (0, import_react40.useContext)(_2);
  if (t17 === null)
    throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t17;
}
function Ne2() {
  let t17 = (0, import_react40.useContext)(M6);
  if (t17 === null)
    throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t17;
}
var M6 = (0, import_react40.createContext)(null);
M6.displayName = "NestingContext";
function U3(t17) {
  return "children" in t17 ? U3(t17.children) : t17.current.filter(({ el: n6 }) => n6.current !== null).filter(({ state: n6 }) => n6 === "visible").length > 0;
}
function oe2(t17, n6) {
  let r9 = s2(t17), s14 = (0, import_react40.useRef)([]), y6 = f5(), D5 = p2(), c12 = o2((i6, e4 = j.Hidden) => {
    let a12 = s14.current.findIndex(({ el: o10 }) => o10 === i6);
    a12 !== -1 && (u(e4, { [j.Unmount]() {
      s14.current.splice(a12, 1);
    }, [j.Hidden]() {
      s14.current[a12].state = "hidden";
    } }), D5.microTask(() => {
      var o10;
      !U3(s14) && y6.current && ((o10 = r9.current) == null || o10.call(r9));
    }));
  }), x5 = o2((i6) => {
    let e4 = s14.current.find(({ el: a12 }) => a12 === i6);
    return e4 ? e4.state !== "visible" && (e4.state = "visible") : s14.current.push({ el: i6, state: "visible" }), () => c12(i6, j.Unmount);
  }), p6 = (0, import_react40.useRef)([]), h9 = (0, import_react40.useRef)(Promise.resolve()), u9 = (0, import_react40.useRef)({ enter: [], leave: [], idle: [] }), v4 = o2((i6, e4, a12) => {
    p6.current.splice(0), n6 && (n6.chains.current[e4] = n6.chains.current[e4].filter(([o10]) => o10 !== i6)), n6 == null || n6.chains.current[e4].push([i6, new Promise((o10) => {
      p6.current.push(o10);
    })]), n6 == null || n6.chains.current[e4].push([i6, new Promise((o10) => {
      Promise.all(u9.current[e4].map(([f10, P4]) => P4)).then(() => o10());
    })]), e4 === "enter" ? h9.current = h9.current.then(() => n6 == null ? void 0 : n6.wait.current).then(() => a12(e4)) : a12(e4);
  }), d11 = o2((i6, e4, a12) => {
    Promise.all(u9.current[e4].splice(0).map(([o10, f10]) => f10)).then(() => {
      var o10;
      (o10 = p6.current.shift()) == null || o10();
    }).then(() => a12(e4));
  });
  return (0, import_react40.useMemo)(() => ({ children: s14, register: x5, unregister: c12, onStart: v4, onStop: d11, wait: h9, chains: u9 }), [x5, c12, s14, v4, d11, u9, h9]);
}
function xe2() {
}
var Pe3 = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function se2(t17) {
  var r9;
  let n6 = {};
  for (let s14 of Pe3)
    n6[s14] = (r9 = t17[s14]) != null ? r9 : xe2;
  return n6;
}
function Re2(t17) {
  let n6 = (0, import_react40.useRef)(se2(t17));
  return (0, import_react40.useEffect)(() => {
    n6.current = se2(t17);
  }, [t17]), n6;
}
var ye3 = "div";
var ae2 = S.RenderStrategy;
function De3(t17, n6) {
  var K3, Q3;
  let { beforeEnter: r9, afterEnter: s14, beforeLeave: y6, afterLeave: D5, enter: c12, enterFrom: x5, enterTo: p6, entered: h9, leave: u9, leaveFrom: v4, leaveTo: d11, ...i6 } = t17, e4 = (0, import_react40.useRef)(null), a12 = y(e4, n6), o10 = (K3 = i6.unmount) == null || K3 ? j.Unmount : j.Hidden, { show: f10, appear: P4, initial: T7 } = Se2(), [l11, j5] = (0, import_react40.useState)(f10 ? "visible" : "hidden"), q3 = Ne2(), { register: O3, unregister: V2 } = q3;
  (0, import_react40.useEffect)(() => O3(e4), [O3, e4]), (0, import_react40.useEffect)(() => {
    if (o10 === j.Hidden && e4.current) {
      if (f10 && l11 !== "visible") {
        j5("visible");
        return;
      }
      return u(l11, { ["hidden"]: () => V2(e4), ["visible"]: () => O3(e4) });
    }
  }, [l11, e4, O3, V2, f10, o10]);
  let k3 = s2({ base: S8(i6.className), enter: S8(c12), enterFrom: S8(x5), enterTo: S8(p6), entered: S8(h9), leave: S8(u9), leaveFrom: S8(v4), leaveTo: S8(d11) }), w6 = Re2({ beforeEnter: r9, afterEnter: s14, beforeLeave: y6, afterLeave: D5 }), G2 = l3();
  (0, import_react40.useEffect)(() => {
    if (G2 && l11 === "visible" && e4.current === null)
      throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [e4, l11, G2]);
  let ue2 = T7 && !P4, z4 = P4 && f10 && T7, Te2 = (() => !G2 || ue2 ? "idle" : f10 ? "enter" : "leave")(), H5 = c11(0), de2 = o2((g6) => u(g6, { enter: () => {
    H5.addFlag(d2.Opening), w6.current.beforeEnter();
  }, leave: () => {
    H5.addFlag(d2.Closing), w6.current.beforeLeave();
  }, idle: () => {
  } })), fe2 = o2((g6) => u(g6, { enter: () => {
    H5.removeFlag(d2.Opening), w6.current.afterEnter();
  }, leave: () => {
    H5.removeFlag(d2.Closing), w6.current.afterLeave();
  }, idle: () => {
  } })), A = oe2(() => {
    j5("hidden"), V2(e4);
  }, q3);
  E7({ immediate: z4, container: e4, classes: k3, direction: Te2, onStart: s2((g6) => {
    A.onStart(e4, g6, de2);
  }), onStop: s2((g6) => {
    A.onStop(e4, g6, fe2), g6 === "leave" && !U3(A) && (j5("hidden"), V2(e4));
  }) });
  let R3 = i6, me3 = { ref: a12 };
  return z4 ? R3 = { ...R3, className: t(i6.className, ...k3.current.enter, ...k3.current.enterFrom) } : (R3.className = t(i6.className, (Q3 = e4.current) == null ? void 0 : Q3.className), R3.className === "" && delete R3.className), import_react40.default.createElement(M6.Provider, { value: A }, import_react40.default.createElement(c3, { value: u(l11, { ["visible"]: d2.Open, ["hidden"]: d2.Closed }) | H5.flags }, X({ ourProps: me3, theirProps: R3, defaultTag: ye3, features: ae2, visible: l11 === "visible", name: "Transition.Child" })));
}
function He2(t17, n6) {
  let { show: r9, appear: s14 = false, unmount: y6 = true, ...D5 } = t17, c12 = (0, import_react40.useRef)(null), x5 = y(c12, n6);
  l3();
  let p6 = C();
  if (r9 === void 0 && p6 !== null && (r9 = (p6 & d2.Open) === d2.Open), ![true, false].includes(r9))
    throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [h9, u9] = (0, import_react40.useState)(r9 ? "visible" : "hidden"), v4 = oe2(() => {
    u9("hidden");
  }), [d11, i6] = (0, import_react40.useState)(true), e4 = (0, import_react40.useRef)([r9]);
  l(() => {
    d11 !== false && e4.current[e4.current.length - 1] !== r9 && (e4.current.push(r9), i6(false));
  }, [e4, r9]);
  let a12 = (0, import_react40.useMemo)(() => ({ show: r9, appear: s14, initial: d11 }), [r9, s14, d11]);
  (0, import_react40.useEffect)(() => {
    if (r9)
      u9("visible");
    else if (!U3(v4))
      u9("hidden");
    else {
      let T7 = c12.current;
      if (!T7)
        return;
      let l11 = T7.getBoundingClientRect();
      l11.x === 0 && l11.y === 0 && l11.width === 0 && l11.height === 0 && u9("hidden");
    }
  }, [r9, v4]);
  let o10 = { unmount: y6 }, f10 = o2(() => {
    var T7;
    d11 && i6(false), (T7 = t17.beforeEnter) == null || T7.call(t17);
  }), P4 = o2(() => {
    var T7;
    d11 && i6(false), (T7 = t17.beforeLeave) == null || T7.call(t17);
  });
  return import_react40.default.createElement(M6.Provider, { value: v4 }, import_react40.default.createElement(_2.Provider, { value: a12 }, X({ ourProps: { ...o10, as: import_react40.Fragment, children: import_react40.default.createElement(le2, { ref: x5, ...o10, ...D5, beforeEnter: f10, beforeLeave: P4 }) }, theirProps: {}, defaultTag: import_react40.Fragment, features: ae2, visible: h9 === "visible", name: "Transition" })));
}
function Fe(t17, n6) {
  let r9 = (0, import_react40.useContext)(_2) !== null, s14 = C() !== null;
  return import_react40.default.createElement(import_react40.default.Fragment, null, !r9 && s14 ? import_react40.default.createElement(W, { ref: n6, ...t17 }) : import_react40.default.createElement(le2, { ref: n6, ...t17 }));
}
var W = D(He2);
var le2 = D(De3);
var Le = D(Fe);
var tt = Object.assign(W, { Child: Le, Root: W });

// app/components/Layout.jsx
var import_react62 = __toESM(require_react());

// assets/Image/simply-noted-logo.avif
var simply_noted_logo_default = "/build/_assets/simply-noted-logo-SVKACL4I.avif";

// assets/Image/cart-icon.png
var cart_icon_default = "/build/_assets/cart-icon-YEQPTFRQ.png";

// app/components/Drawer.jsx
var import_react41 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Drawer.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Drawer.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function Drawer({
  heading,
  open,
  onClose,
  openFrom = "right",
  children
}) {
  const offScreen = {
    right: "translate-x-full",
    left: "-translate-x-full"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(tt, { appear: true, show: open, as: import_react41.Fragment, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(_t, { as: "div", className: "relative z-50", onClose, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(tt.Child, { as: import_react41.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 left-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-25" }, void 0, false, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 48,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `fixed inset-y-0 flex max-w-full ${openFrom === "right" ? "right-0" : ""}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(tt.Child, { as: import_react41.Fragment, enter: "transform transition ease-in-out duration-300", enterFrom: offScreen[openFrom], enterTo: "translate-x-0", leave: "transform transition ease-in-out duration-300", leaveFrom: "translate-x-0", leaveTo: offScreen[openFrom], children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(_t.Panel, { className: "w-screen max-w-lg text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-contrast", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: `sticky top-0 flex items-center px-6 h-nav sm:px-8 md:px-12 ${heading ? "justify-between" : "justify-end"}`, children: [
        heading !== null && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(_t.Title, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "span", size: "lead", id: "cart-contents", children: heading }, void 0, false, {
          fileName: "app/components/Drawer.jsx",
          lineNumber: 58,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/components/Drawer.jsx",
          lineNumber: 57,
          columnNumber: 42
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "p-4 -m-4 transition text-primary hover:text-primary/50", onClick: onClose, "data-test": "close-cart", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconClose, { "aria-label": "Close panel" }, void 0, false, {
          fileName: "app/components/Drawer.jsx",
          lineNumber: 63,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/components/Drawer.jsx",
          lineNumber: 62,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Drawer.jsx",
        lineNumber: 56,
        columnNumber: 19
      }, this),
      children
    ] }, void 0, true, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 55,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 54,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 53,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 52,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Drawer.jsx",
      lineNumber: 51,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Drawer.jsx",
    lineNumber: 46,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Drawer.jsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_c = Drawer;
Drawer.Title = _t.Title;
function useDrawer(openDefault = false) {
  _s();
  const [isOpen, setIsOpen] = (0, import_react41.useState)(openDefault);
  function openDrawer() {
    setIsOpen(true);
  }
  function closeDrawer() {
    setIsOpen(false);
  }
  return {
    isOpen,
    openDrawer,
    closeDrawer
  };
}
_s(useDrawer, "LjsPZNB9hmJYO3b9fvQnVwWs7Xo=");
var _c;
$RefreshReg$(_c, "Drawer");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/clsx/dist/clsx.m.js
function r8(e4) {
  var t17, f10, n6 = "";
  if ("string" == typeof e4 || "number" == typeof e4)
    n6 += e4;
  else if ("object" == typeof e4)
    if (Array.isArray(e4))
      for (t17 = 0; t17 < e4.length; t17++)
        e4[t17] && (f10 = r8(e4[t17])) && (n6 && (n6 += " "), n6 += f10);
    else
      for (t17 in e4)
        e4[t17] && (n6 && (n6 += " "), n6 += t17);
  return n6;
}
function clsx() {
  for (var e4, t17, f10 = 0, n6 = ""; f10 < arguments.length; )
    (e4 = arguments[f10++]) && (t17 = r8(e4)) && (n6 && (n6 += " "), n6 += t17);
  return n6;
}
var clsx_m_default = clsx;

// app/components/Text.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Text.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Text.jsx"
  );
  import.meta.hot.lastModified = "1696490276858.3848";
}
function Text({
  as: Component2 = "span",
  className,
  color = "default",
  format,
  size = "copy",
  width = "default",
  children,
  ...props
}) {
  const colors = {
    default: "inherit",
    primary: "text-primary/90",
    subtle: "text-primary/50",
    notice: "text-notice",
    contrast: "text-contrast/90"
  };
  const sizes = {
    lead: "text-lead font-medium",
    copy: "text-copy",
    fine: "text-fine subpixel-antialiased"
  };
  const widths = {
    default: "max-w-prose",
    narrow: "max-w-prose-narrow",
    wide: "max-w-prose-wide"
  };
  const styles = clsx_m_default(missingClass(className, "max-w-") && widths[width], missingClass(className, "whitespace-") && "whitespace-pre-wrap", missingClass(className, "text-") && colors[color], sizes[size], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Component2, { ...props, className: styles, children: format ? formatText(children) : children }, void 0, false, {
    fileName: "app/components/Text.jsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}
_c2 = Text;
function Heading({
  as: Component2 = "h2",
  children,
  className = "",
  format,
  size = "heading",
  width = "default",
  ...props
}) {
  const sizes = {
    display: "font-bold text-display",
    heading: "font-bold text-heading",
    lead: "font-bold text-lead",
    copy: "font-medium text-copy"
  };
  const widths = {
    default: "max-w-prose",
    narrow: "max-w-prose-narrow",
    wide: "max-w-prose-wide"
  };
  const styles = clsx_m_default(missingClass(className, "whitespace-") && "whitespace-pre-wrap", missingClass(className, "max-w-") && widths[width], missingClass(className, "font-") && sizes[size], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Component2, { ...props, className: styles, children: format ? formatText(children) : children }, void 0, false, {
    fileName: "app/components/Text.jsx",
    lineNumber: 77,
    columnNumber: 10
  }, this);
}
_c22 = Heading;
function Section({
  as: Component2 = "section",
  children,
  className,
  divider = "none",
  display = "grid",
  heading,
  padding = "all",
  ...props
}) {
  const paddings = {
    x: "px-6 md:px-8 lg:px-12",
    y: "py-6 md:py-8 lg:py-12",
    swimlane: "pt-4 md:pt-8 lg:pt-12 md:pb-4 lg:pb-8",
    all: "p-6 md:p-8 lg:p-12"
  };
  const dividers = {
    none: "border-none",
    top: "border-t border-primary/05",
    bottom: "border-b border-primary/05",
    both: "border-y border-primary/05"
  };
  const displays = {
    flex: "flex",
    grid: "grid"
  };
  const styles = clsx_m_default("w-full gap-4 md:gap-8", displays[display], missingClass(className, "\\mp[xy]?-") && paddings[padding], dividers[divider], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Component2, { ...props, className: styles, children: [
    heading && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Heading, { size: "lead", className: padding === "y" ? paddings["x"] : "", children: heading }, void 0, false, {
      fileName: "app/components/Text.jsx",
      lineNumber: 110,
      columnNumber: 19
    }, this),
    children
  ] }, void 0, true, {
    fileName: "app/components/Text.jsx",
    lineNumber: 109,
    columnNumber: 10
  }, this);
}
_c3 = Section;
function PageHeader({
  children,
  className,
  heading,
  variant = "default",
  ...props
}) {
  const variants = {
    default: "grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start",
    blogPost: "grid md:text-center w-full gap-4 p-6 py-8 md:p-8 lg:p-12 md:justify-items-center",
    allCollections: "flex justify-between items-baseline gap-8 p-6 md:p-8 lg:p-12"
  };
  const styles = clsx_m_default(variants[variant], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("header", { ...props, className: styles, children: [
    heading && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Heading, { as: "h1", width: "narrow", size: "heading", className: "inline-block", children: heading }, void 0, false, {
      fileName: "app/components/Text.jsx",
      lineNumber: 131,
      columnNumber: 19
    }, this),
    children
  ] }, void 0, true, {
    fileName: "app/components/Text.jsx",
    lineNumber: 130,
    columnNumber: 10
  }, this);
}
_c4 = PageHeader;
var _c2;
var _c22;
var _c3;
var _c4;
$RefreshReg$(_c2, "Text");
$RefreshReg$(_c22, "Heading");
$RefreshReg$(_c3, "Section");
$RefreshReg$(_c4, "PageHeader");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Input.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Input.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Input.jsx"
  );
  import.meta.hot.lastModified = "1696490276850.4988";
}
function Input({
  className = "",
  type,
  variant,
  ...props
}) {
  const variants = {
    search: "bg-transparent px-0 py-2 text-heading w-full focus:ring-0 border-x-0 border-t-0 transition border-b-2 border-primary/10 focus:border-primary/90",
    minisearch: "bg-transparent hidden md:inline-block text-left lg:text-right border-b transition border-transparent -mb-px border-x-0 border-t-0 appearance-none px-0 py-1 focus:ring-transparent placeholder:opacity-20 placeholder:text-inherit"
  };
  const styles = clsx_m_default(variants[variant], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type, ...props, className: styles }, void 0, false, {
    fileName: "app/components/Input.jsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_c5 = Input;
var _c5;
$RefreshReg$(_c5, "Input");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/ProductGallery.jsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\ProductGallery.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\ProductGallery.jsx"
  );
  import.meta.hot.lastModified = "1696502925679.8872";
}
function ProductGallery({
  media,
  className
}) {
  if (!media.length) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: `swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`, children: media.map((med, i6) => {
    const isFirst = i6 === 0;
    const isFourth = i6 === 3;
    const isFullWidth = i6 % 3 === 0;
    const image = med.__typename === "MediaImage" ? {
      ...med.image,
      altText: med.alt || "Product image"
    } : null;
    const style = [isFullWidth ? "md:col-span-2" : "md:col-span-1", isFirst || isFourth ? "" : "md:aspect-[4/5]", "aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-[550px] md:h-[400px]"].join(" ");
    return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: style, children: image && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Image, { loading: i6 === 0 ? "eager" : "lazy", data: image, aspectRatio: !isFirst && !isFourth ? "4/5" : void 0, sizes: isFirst || isFourth ? "(min-width: 48em) 60vw, 90vw" : "(min-width: 48em) 30vw, 90vw", className: "object-cover w-[550px] h-[400px] aspect-square fadeIn" }, void 0, false, {
      fileName: "app/components/ProductGallery.jsx",
      lineNumber: 44,
      columnNumber: 23
    }, this) }, med.id || image?.id, false, {
      fileName: "app/components/ProductGallery.jsx",
      lineNumber: 43,
      columnNumber: 14
    }, this);
  }) }, void 0, false, {
    fileName: "app/components/ProductGallery.jsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_c6 = ProductGallery;
var _c6;
$RefreshReg$(_c6, "ProductGallery");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/lib/placeholders.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\placeholders.js"
  );
  import.meta.hot.lastModified = "1696490276869.27";
}
var PLACEHOLDERS = {
  HEROS: [
    // primaryHero
    {
      heading: { value: "All Mountain All Season" },
      byline: {
        value: "The All New Hydrogen Snowboard Exclusively From Shopify"
      },
      cta: { value: "Shop Now \u2192" },
      handle: "freestyle",
      spread: {
        reference: {
          mediaContentType: "IMAGE",
          alt: "Tracks in the snow leading to a person on a mountain top with a red jacket contrasting to an epic blue horizon with a mountain range in the distance.",
          previewImage: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Hydrogen_Hero_Feature_1.jpg?v=1654902468"
          },
          id: "gid://shopify/MediaImage/29259478466616",
          image: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Hydrogen_Hero_Feature_1.jpg?v=1654902468",
            width: 2500,
            height: 3155
          }
        }
      },
      spreadSecondary: {
        reference: {
          __typename: "MediaImage",
          mediaContentType: "IMAGE",
          alt: "A snowboarder standing on a mountain top in choppy snow, shows off the back of his snowboard which reads Hydrogen in a cursive script.",
          previewImage: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Hydrogen_Hero_Feature_2.jpg?v=1654902468"
          },
          id: "gid://shopify/MediaImage/29259478499384",
          image: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Hydrogen_Hero_Feature_2.jpg?v=1654902468",
            width: 2500,
            height: 3155
          }
        }
      },
      height: "full",
      top: true,
      decoding: "sync",
      loading: "eager"
    },
    // secondaryHero
    {
      heading: { value: "From the Slopes to the Chalet" },
      byline: null,
      cta: { value: "Shop Now \u2192" },
      handle: "backcountry",
      spread: {
        reference: {
          __typename: "MediaImage",
          mediaContentType: "IMAGE",
          alt: "A skier hikes up a mountain through the snow with skis over their shoulder.",
          previewImage: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_1.jpg?v=1654902306"
          },
          id: "gid://shopify/MediaImage/29259478368312",
          image: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_1.jpg?v=1654902306",
            width: 2500,
            height: 2500
          }
        }
      },
      spreadSecondary: {
        reference: {
          __typename: "MediaImage",
          mediaContentType: "IMAGE",
          alt: "A snow covered lodge is illuminated by lights at night with a dark starry sky and mountain backdrop.",
          previewImage: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306"
          },
          id: "gid://shopify/MediaImage/29259478401080",
          image: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Chalet_Collection_Feature_2.jpg?v=1654902306",
            width: 2500,
            height: 2500
          }
        }
      }
    },
    // tertiaryHero
    {
      heading: { value: "The Winter 2022 Collection" },
      byline: { value: "Just Dropped" },
      cta: { value: "Shop Now \u2192" },
      handle: "winter-2022",
      spread: {
        reference: {
          __typename: "MediaImage",
          mediaContentType: "IMAGE",
          alt: "Three young women in snowboarding attire embracing and laughing while snow falls around them",
          previewImage: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Collection_Feature_Wide.jpg?v=1654902160"
          },
          id: "gid://shopify/MediaImage/29259478302776",
          image: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/files/Collection_Feature_Wide.jpg?v=1654902160",
            width: 5e3,
            height: 2500
          }
        }
      },
      spreadSecondary: null
    }
  ],
  PRODUCT_INFO: [
    {
      title: "Description",
      content: "We threw snow tires on our core classics... Good for all year round! Named after my favorite football match of the year. Just like any of our joints, dress them up or down..."
    },
    {
      title: "Size and Fit",
      content: "We threw snow tires on our core classics... Good for all year round! Named after my favorite football match of the year. Just like any of our joints, dress them up or down..."
    },
    {
      title: "Delivery and Returns",
      content: `The towels had been hanging from the rod for years. They were stained and worn, and quite frankly, just plain ugly. Debra didn't want to touch them but she really didn't have a choice. It was important for her to see what was living within them. Patrick didn't want to go. The fact that she was insisting they must go made him want to go even less. He had no desire to make small talk with strangers he would never again see just to be polite. But she insisted that Patrick go, and she would soon find out that this would be the biggest mistake she could make in their relationship.`
    }
  ],
  PRODUCT: {
    label: "Limited Edition",
    id: "gid://shopify/Product/6730850828344",
    title: "The Hydrogen",
    publishedAt: "2021-06-17T18:33:17Z",
    handle: "snowboard",
    description: "Description Our flagship board, ideal for technical terrain and those who dare to go where the chairlift can't take you. The Hydrogen excels in the backcountry making riding out of bounds as easy as resort groomers. New for 2021, the Hydrogen Snowboard has Oxygen Pack inserts giving you more float on the deepest days. Care Guide Clean well after use Wax regularly Specs Weight: 5 lb Length: 4 ft Width: 1 ft Manufactured on: 8/2/2021, 3:30:00 PM Manufactured by: Shopify",
    priceRange: {
      minVariantPrice: {
        amount: "775.0",
        currencyCode: "CAD"
      },
      maxVariantPrice: {
        amount: "775.0",
        currencyCode: "CAD"
      }
    },
    options: [
      {
        name: "Color",
        values: ["Morning", "Evening", "Night"]
      },
      {
        name: "Size",
        values: ["154", "158", "160"]
      }
    ],
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/41007289630776",
          image: {
            url: "https://cdn.shopify.com/s/files/1/0551/4566/0472/products/hydrogen-morning.jpg?v=1636146509",
            altText: "The Hydrogen snowboard, color Morning",
            width: 1200,
            height: 1504
          },
          price: {
            amount: "775.0",
            currencyCode: "CAD"
          },
          compareAtPrice: {
            amount: "840.0",
            currencyCode: "CAD"
          }
        }
      ]
    }
  }
};
function getHeroPlaceholder(heros) {
  if (!heros?.length)
    return [];
  return heros.map((hero, index) => {
    if (hero?.heading?.value) {
      return hero;
    }
    const placeholder = PLACEHOLDERS.HEROS[index];
    const byLine = hero?.byLine || hero?.descriptionHtml ? { value: hero.descriptionHtml } : placeholder.byline;
    const heading = hero?.heading || hero?.title ? { value: hero.title } : placeholder.heading;
    return {
      heading,
      byLine,
      cta: hero?.cta || placeholder.cta,
      handle: hero?.handle || placeholder.handle,
      id: hero?.id || index,
      spread: hero?.spread || placeholder.spread,
      spreadSecondary: hero?.spreadSecondary || placeholder.spreadSecondary,
      height: placeholder?.height || void 0,
      top: placeholder?.top || void 0
    };
  });
}
function getProductPlaceholder() {
  return PLACEHOLDERS.PRODUCT;
}

// app/components/ProductCard.jsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\ProductCard.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\ProductCard.jsx"
  );
  import.meta.hot.lastModified = "1696490276854.6611";
}
function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd
}) {
  let cardLabel;
  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length)
    return null;
  const firstVariant = flattenConnection(cardProduct.variants)[0];
  if (!firstVariant)
    return null;
  const {
    image,
    price,
    compareAtPrice
  } = firstVariant;
  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = "Sale";
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = "New";
  }
  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link2, { onClick, to: `/products/${product.handle}`, prefetch: "intent", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: clsx_m_default("grid gap-4", className), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "card-image aspect-[4/5] bg-primary/5", children: [
        image && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Image, { className: "object-cover w-full fadeIn", sizes: "(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw", aspectRatio: "4/5", data: image, alt: image.altText || `Picture of ${product.title}`, loading }, void 0, false, {
          fileName: "app/components/ProductCard.jsx",
          lineNumber: 65,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Text, { as: "label", size: "fine", className: "absolute top-0 right-0 m-4 text-right text-notice", children: cardLabel }, void 0, false, {
          fileName: "app/components/ProductCard.jsx",
          lineNumber: 66,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ProductCard.jsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Text, { className: "w-full overflow-hidden whitespace-nowrap text-ellipsis ", as: "h3", children: product.title }, void 0, false, {
          fileName: "app/components/ProductCard.jsx",
          lineNumber: 71,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex gap-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Text, { className: "flex gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Money, { withoutTrailingZeros: true, data: price }, void 0, false, {
            fileName: "app/components/ProductCard.jsx",
            lineNumber: 76,
            columnNumber: 17
          }, this),
          isDiscounted(price, compareAtPrice) && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CompareAtPrice, { className: "opacity-50", data: compareAtPrice }, void 0, false, {
            fileName: "app/components/ProductCard.jsx",
            lineNumber: 77,
            columnNumber: 57
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ProductCard.jsx",
          lineNumber: 75,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/ProductCard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ProductCard.jsx",
        lineNumber: 70,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ProductCard.jsx",
      lineNumber: 63,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/ProductCard.jsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    quickAdd && firstVariant.availableForSale && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(AddToCartButton, { lines: [{
      quantity: 1,
      merchandiseId: firstVariant.id
    }], variant: "secondary", className: "mt-2", analytics: {
      products: [productAnalytics],
      totalValue: parseFloat(productAnalytics.price)
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Text, { as: "span", className: "flex items-center justify-center gap-2", children: "Add to Cart" }, void 0, false, {
      fileName: "app/components/ProductCard.jsx",
      lineNumber: 90,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/ProductCard.jsx",
      lineNumber: 83,
      columnNumber: 53
    }, this),
    quickAdd && !firstVariant.availableForSale && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { variant: "secondary", className: "mt-2", disabled: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Text, { as: "span", className: "flex items-center justify-center gap-2", children: "Sold out" }, void 0, false, {
      fileName: "app/components/ProductCard.jsx",
      lineNumber: 95,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/ProductCard.jsx",
      lineNumber: 94,
      columnNumber: 54
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ProductCard.jsx",
    lineNumber: 61,
    columnNumber: 10
  }, this);
}
_c7 = ProductCard;
function CompareAtPrice({
  data,
  className
}) {
  _s2();
  const {
    currencyNarrowSymbol,
    withoutTrailingZerosAndCurrency
  } = useMoney(data);
  const styles = clsx_m_default("strike", className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: styles, children: [
    currencyNarrowSymbol,
    withoutTrailingZerosAndCurrency
  ] }, void 0, true, {
    fileName: "app/components/ProductCard.jsx",
    lineNumber: 112,
    columnNumber: 10
  }, this);
}
_s2(CompareAtPrice, "L00nO13kACWN/qk/ffFGWQvopCY=", false, function() {
  return [useMoney];
});
_c23 = CompareAtPrice;
var _c7;
var _c23;
$RefreshReg$(_c7, "ProductCard");
$RefreshReg$(_c23, "CompareAtPrice");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/ProductSwimlane.jsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\ProductSwimlane.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\ProductSwimlane.jsx"
  );
  import.meta.hot.lastModified = "1696490276856.2317";
}
var mockProducts = {
  nodes: new Array(12).fill("")
};
function ProductSwimlane({
  title = "Featured Products",
  products = mockProducts,
  count = 12,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Section, { heading: title, padding: "y", ...props, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12", children: products.nodes.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ProductCard, { product, className: "snap-start w-80" }, product.id, false, {
    fileName: "app/components/ProductSwimlane.jsx",
    lineNumber: 33,
    columnNumber: 40
  }, this)) }, void 0, false, {
    fileName: "app/components/ProductSwimlane.jsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/ProductSwimlane.jsx",
    lineNumber: 31,
    columnNumber: 10
  }, this);
}
_c8 = ProductSwimlane;
var _c8;
$RefreshReg$(_c8, "ProductSwimlane");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Skeleton.jsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Skeleton.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Skeleton.jsx"
  );
  import.meta.hot.lastModified = "1696490276857.4827";
}
function Skeleton({
  as: Component2 = "div",
  width,
  height,
  className,
  ...props
}) {
  const styles = clsx_m_default("rounded bg-primary/10", className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Component2, { ...props, width, height, className: styles }, void 0, false, {
    fileName: "app/components/Skeleton.jsx",
    lineNumber: 34,
    columnNumber: 10
  }, this);
}
_c9 = Skeleton;
var _c9;
$RefreshReg$(_c9, "Skeleton");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Button.jsx
var import_react43 = __toESM(require_react());
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Button.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Button.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
var Button = (0, import_react43.forwardRef)(_c10 = ({
  as = "button",
  className = "",
  variant = "primary",
  width = "auto",
  ...props
}, ref) => {
  const Component2 = props?.to ? Link : as;
  const baseButtonClasses = "inline-block rounded font-medium text-center py-3 px-6";
  const variants = {
    primary: `${baseButtonClasses} bg-primary text-contrast`,
    secondary: `${baseButtonClasses} border border-primary/10 bg-contrast text-primary`,
    inline: "border-b border-primary/10 leading-none pb-1"
  };
  const widths = {
    auto: "w-auto",
    full: "w-full"
  };
  const styles = clsx_m_default(missingClass(className, "bg-") && variants[variant], missingClass(className, "w-") && widths[width], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
    Component2,
    {
      className: styles,
      ...props,
      ref
    },
    void 0,
    false,
    {
      fileName: "app/components/Button.jsx",
      lineNumber: 44,
      columnNumber: 10
    },
    this
  );
});
_c24 = Button;
var _c10;
var _c24;
$RefreshReg$(_c10, "Button$forwardRef");
$RefreshReg$(_c24, "Button");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/CountrySelector.jsx
var import_react46 = __toESM(require_react());

// node_modules/react-intersection-observer/index.mjs
var React = __toESM(require_react(), 1);
var React2 = __toESM(require_react(), 1);
"use client";
var observerMap = /* @__PURE__ */ new Map();
var RootIds = /* @__PURE__ */ new WeakMap();
var rootId = 0;
var unsupportedValue = void 0;
function getRootId(root) {
  if (!root)
    return "0";
  if (RootIds.has(root))
    return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}
function optionsToId(options) {
  return Object.keys(options).sort().filter(
    (key) => options[key] !== void 0
  ).map((key) => {
    return `${key}_${key === "root" ? getRootId(options.root) : options[key]}`;
  }).toString();
}
function createObserver(options) {
  let id = optionsToId(options);
  let instance = observerMap.get(id);
  if (!instance) {
    const elements = /* @__PURE__ */ new Map();
    let thresholds;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        var _a;
        const inView = entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);
        if (options.trackVisibility && typeof entry.isVisible === "undefined") {
          entry.isVisible = inView;
        }
        (_a = elements.get(entry.target)) == null ? void 0 : _a.forEach((callback) => {
          callback(inView, entry);
        });
      });
    }, options);
    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
    instance = {
      id,
      observer,
      elements
    };
    observerMap.set(id, instance);
  }
  return instance;
}
function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
  if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
    const bounds = element.getBoundingClientRect();
    callback(fallbackInView, {
      isIntersecting: fallbackInView,
      target: element,
      intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
      time: 0,
      boundingClientRect: bounds,
      intersectionRect: bounds,
      rootBounds: bounds
    });
    return () => {
    };
  }
  const { id, observer, elements } = createObserver(options);
  let callbacks = elements.get(element) || [];
  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }
  callbacks.push(callback);
  observer.observe(element);
  return function unobserve() {
    callbacks.splice(callbacks.indexOf(callback), 1);
    if (callbacks.length === 0) {
      elements.delete(element);
      observer.unobserve(element);
    }
    if (elements.size === 0) {
      observer.disconnect();
      observerMap.delete(id);
    }
  };
}
function useInView({
  threshold,
  delay,
  trackVisibility,
  rootMargin,
  root,
  triggerOnce,
  skip,
  initialInView,
  fallbackInView,
  onChange
} = {}) {
  var _a;
  const [ref, setRef] = React2.useState(null);
  const callback = React2.useRef();
  const [state, setState] = React2.useState({
    inView: !!initialInView,
    entry: void 0
  });
  callback.current = onChange;
  React2.useEffect(
    () => {
      if (skip || !ref)
        return;
      let unobserve;
      unobserve = observe(
        ref,
        (inView, entry) => {
          setState({
            inView,
            entry
          });
          if (callback.current)
            callback.current(inView, entry);
          if (entry.isIntersecting && triggerOnce && unobserve) {
            unobserve();
            unobserve = void 0;
          }
        },
        {
          root,
          rootMargin,
          threshold,
          // @ts-ignore
          trackVisibility,
          // @ts-ignore
          delay
        },
        fallbackInView
      );
      return () => {
        if (unobserve) {
          unobserve();
        }
      };
    },
    // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // If the threshold is an array, convert it to a string, so it won't change between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Array.isArray(threshold) ? threshold.toString() : threshold,
      ref,
      root,
      rootMargin,
      triggerOnce,
      skip,
      trackVisibility,
      fallbackInView,
      delay
    ]
  );
  const entryTarget = (_a = state.entry) == null ? void 0 : _a.target;
  const previousEntryTarget = React2.useRef();
  if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {
    previousEntryTarget.current = entryTarget;
    setState({
      inView: !!initialInView,
      entry: void 0
    });
  }
  const result = [setRef, state.inView, state.entry];
  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];
  return result;
}

// app/components/CountrySelector.jsx
var import_jsx_dev_runtime9 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\CountrySelector.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\CountrySelector.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function CountrySelector() {
  _s3();
  const [root] = useMatches();
  const fetcher = useFetcher();
  const closeRef = (0, import_react46.useRef)(null);
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE;
  const {
    pathname,
    search
  } = useLocation();
  const pathWithoutLocale = `${pathname.replace(selectedLocale.pathPrefix, "")}${search}`;
  const countries = fetcher.data ?? {};
  const defaultLocale = countries?.["default"];
  const defaultLocalePrefix = defaultLocale ? `${defaultLocale?.language}-${defaultLocale?.country}` : "";
  const {
    ref,
    inView
  } = useInView({
    threshold: 0,
    triggerOnce: true
  });
  const observerRef = (0, import_react46.useRef)(null);
  (0, import_react46.useEffect)(() => {
    ref(observerRef.current);
  }, [ref, observerRef]);
  (0, import_react46.useEffect)(() => {
    if (!inView || fetcher.data || fetcher.state === "loading")
      return;
    fetcher.load("/api/countries");
  }, [inView, fetcher]);
  const closeDropdown = (0, import_react46.useCallback)(() => {
    closeRef.current?.removeAttribute("open");
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("section", { ref: observerRef, className: "grid w-full gap-4", onMouseLeave: closeDropdown, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Heading, { size: "lead", className: "cursor-default", as: "h3", children: "Country" }, void 0, false, {
      fileName: "app/components/CountrySelector.jsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("details", { className: "absolute w-full border rounded border-contrast/30 dark:border-white open:round-b-none overflow-clip", ref: closeRef, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("summary", { className: "flex items-center justify-between w-full px-4 py-3 cursor-pointer", children: selectedLocale.label }, void 0, false, {
        fileName: "app/components/CountrySelector.jsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "w-full overflow-auto border-t border-contrast/30 dark:border-white bg-contrast/30 max-h-36", children: countries && Object.keys(countries).map((countryPath) => {
        const countryLocale = countries[countryPath];
        const isSelected = countryLocale.language === selectedLocale.language && countryLocale.country === selectedLocale.country;
        const countryUrlPath = getCountryUrlPath({
          countryLocale,
          defaultLocalePrefix,
          pathWithoutLocale
        });
        return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Country, { closeDropdown, countryUrlPath, isSelected, countryLocale }, countryPath, false, {
          fileName: "app/components/CountrySelector.jsx",
          lineNumber: 81,
          columnNumber: 20
        }, this);
      }) }, void 0, false, {
        fileName: "app/components/CountrySelector.jsx",
        lineNumber: 72,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CountrySelector.jsx",
      lineNumber: 68,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/CountrySelector.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/CountrySelector.jsx",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}
_s3(CountrySelector, "LnbtdzCYmYL83ZmgeQEEe9/Ca4Y=", false, function() {
  return [useMatches, useFetcher, useLocation, useInView];
});
_c11 = CountrySelector;
function Country({
  closeDropdown,
  countryLocale,
  countryUrlPath,
  isSelected
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(ChangeLocaleForm, { redirectTo: countryUrlPath, buyerIdentity: {
    countryCode: countryLocale.country
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Button, { className: clsx_m_default(["text-contrast dark:text-primary", "bg-primary dark:bg-contrast w-full p-2 transition rounded flex justify-start", "items-center text-left cursor-pointer py-2 px-4"]), type: "submit", variant: "primary", onClick: closeDropdown, children: [
    countryLocale.label,
    isSelected ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "ml-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(IconCheck, {}, void 0, false, {
      fileName: "app/components/CountrySelector.jsx",
      lineNumber: 104,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/CountrySelector.jsx",
      lineNumber: 103,
      columnNumber: 23
    }, this) : null
  ] }, void 0, true, {
    fileName: "app/components/CountrySelector.jsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, countryLocale.country, false, {
    fileName: "app/components/CountrySelector.jsx",
    lineNumber: 98,
    columnNumber: 10
  }, this);
}
_c25 = Country;
function ChangeLocaleForm({
  children,
  buyerIdentity,
  redirectTo
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(k, { route: "/cart", action: k.ACTIONS.BuyerIdentityUpdate, inputs: {
    buyerIdentity
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, false, {
      fileName: "app/components/CountrySelector.jsx",
      lineNumber: 119,
      columnNumber: 9
    }, this),
    children
  ] }, void 0, true, {
    fileName: "app/components/CountrySelector.jsx",
    lineNumber: 118,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/CountrySelector.jsx",
    lineNumber: 115,
    columnNumber: 10
  }, this);
}
_c32 = ChangeLocaleForm;
function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale
}) {
  let countryPrefixPath = "";
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;
  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}
var _c11;
var _c25;
var _c32;
$RefreshReg$(_c11, "CountrySelector");
$RefreshReg$(_c25, "Country");
$RefreshReg$(_c32, "ChangeLocaleForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Cart.jsx
var import_react47 = __toESM(require_react());
var import_jsx_dev_runtime10 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Cart.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s4 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Cart.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function Cart({
  layout,
  onClose,
  cart
}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartEmpty, { hidden: linesCount, onClose, layout }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartDetails, { cart, layout }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_c12 = Cart;
function CartDetails({
  layout,
  cart
}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const container = {
    drawer: "grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]",
    page: "w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: container[layout], children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartLines, { lines: cart?.lines, layout }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    cartHasItems && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartSummary, { cost: cart.cost, layout, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartDiscounts, { discountCodes: cart.discountCodes }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartCheckoutActions, { checkoutUrl: cart.checkoutUrl }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 55,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 53,
      columnNumber: 24
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}
_c26 = CartDetails;
function CartDiscounts({
  discountCodes
}) {
  const codes = discountCodes?.filter((discount) => discount.applicable)?.map(({
    code
  }) => code) || [];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dl", { className: codes && codes.length !== 0 ? "grid" : "hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center justify-between font-medium", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { as: "dt", children: "Discount(s)" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(UpdateDiscountForm, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(IconRemove, { "aria-hidden": "true", style: {
          height: 18,
          marginRight: 4
        } }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 80,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 79,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { as: "dd", children: codes?.join(", ") }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 77,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 75,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(UpdateDiscountForm, { discountCodes: codes, children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: clsx_m_default("flex", "items-center gap-4 justify-between text-copy"), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("input", { className: getInputStyleClasses(), type: "text", name: "discountCode", placeholder: "Discount code" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { className: "flex justify-end font-medium whitespace-nowrap", children: "Apply Discount" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 93,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 72,
    columnNumber: 10
  }, this);
}
_c33 = CartDiscounts;
function UpdateDiscountForm({
  discountCodes,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(k, { route: "/cart", action: k.ACTIONS.DiscountCodesUpdate, inputs: {
    discountCodes: discountCodes || []
  }, children }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 107,
    columnNumber: 10
  }, this);
}
_c42 = UpdateDiscountForm;
function CartLines({
  layout = "drawer",
  lines: cartLines
}) {
  _s4();
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = (0, import_react47.useRef)(null);
  const {
    y: y6
  } = useScroll_default(scrollRef);
  const className = clsx_m_default([y6 > 0 ? "border-t" : "", layout === "page" ? "flex-grow md:translate-y-4" : "px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12"]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("section", { ref: scrollRef, "aria-labelledby": "cart-contents", className, children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("ul", { className: "grid gap-6 md:gap-10", children: currentLines.map((line) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartLineItem, { line }, line.id, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 127,
    columnNumber: 35
  }, this)) }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 126,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 125,
    columnNumber: 10
  }, this);
}
_s4(CartLines, "vtEhG7A/3/dTXxS7GGixxjHorXE=", false, function() {
  return [useScroll_default];
});
_c52 = CartLines;
function CartCheckoutActions({
  checkoutUrl
}) {
  if (!checkoutUrl)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("a", { href: checkoutUrl, target: "_self", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Button, { as: "span", width: "full", children: "Continue to Checkout" }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 141,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 140,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 139,
    columnNumber: 10
  }, this);
}
_c62 = CartCheckoutActions;
function CartSummary({
  cost,
  layout,
  children = null
}) {
  const summary = {
    drawer: "grid gap-4 p-6 border-t md:px-12",
    page: "sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("section", { "aria-labelledby": "summary-heading", className: summary[layout], children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h2", { id: "summary-heading", className: "sr-only", children: "Order summary" }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 159,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dl", { className: "grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center justify-between font-medium", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { as: "dt", children: "Subtotal" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 164,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { as: "dd", "data-test": "subtotal", children: cost?.subtotalAmount?.amount ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Money, { data: cost?.subtotalAmount }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 166,
        columnNumber: 45
      }, this) : "-" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 165,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 163,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 162,
      columnNumber: 7
    }, this),
    children
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 158,
    columnNumber: 10
  }, this);
}
_c72 = CartSummary;
function CartLineItem({
  line
}) {
  if (!line?.id)
    return null;
  const {
    id,
    quantity,
    merchandise
  } = line;
  if (typeof quantity === "undefined" || !merchandise?.product)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("li", { className: "flex gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex-shrink", children: merchandise.image && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Image, { width: 110, height: 110, data: merchandise.image, className: "object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28", alt: merchandise.title }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 186,
      columnNumber: 31
    }, this) }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 185,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex justify-between flex-grow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Heading, { as: "h3", size: "copy", children: merchandise?.product?.handle ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Link2, { to: `/products/${merchandise.product.handle}`, children: merchandise?.product?.title || "" }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 192,
          columnNumber: 45
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { children: merchandise?.product?.title || "" }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 194,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 191,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "grid pb-2", children: (merchandise?.selectedOptions || []).map((option) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { color: "subtle", children: [
          option.name,
          ": ",
          option.value
        ] }, option.name, true, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 198,
          columnNumber: 65
        }, this)) }, void 0, false, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 197,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex justify-start text-copy", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartLineQuantityAdjust, { line }, void 0, false, {
            fileName: "app/components/Cart.jsx",
            lineNumber: 205,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/components/Cart.jsx",
            lineNumber: 204,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(ItemRemoveButton, { lineIds: [id] }, void 0, false, {
            fileName: "app/components/Cart.jsx",
            lineNumber: 207,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Cart.jsx",
          lineNumber: 203,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 190,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CartLinePrice, { line, as: "span" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 211,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 210,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 189,
      columnNumber: 7
    }, this)
  ] }, id, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 184,
    columnNumber: 10
  }, this);
}
_c82 = CartLineItem;
function ItemRemoveButton({
  lineIds
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(k, { route: "/cart", action: k.ACTIONS.LinesRemove, inputs: {
    lineIds
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { className: "flex items-center justify-center w-10 h-10 border rounded", type: "submit", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "sr-only", children: "Remove" }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 224,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(IconRemove, { "aria-hidden": "true" }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 225,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 223,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 220,
    columnNumber: 10
  }, this);
}
_c92 = ItemRemoveButton;
function CartLineQuantityAdjust({
  line
}) {
  if (!line || typeof line?.quantity === "undefined")
    return null;
  const {
    id: lineId,
    quantity
  } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { htmlFor: `quantity-${lineId}`, className: "sr-only", children: [
      "Quantity, ",
      quantity
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 241,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center border rounded", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(UpdateCartButton, { lines: [{
        id: lineId,
        quantity: prevQuantity
      }], children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { name: "decrease-quantity", "aria-label": "Decrease quantity", className: "w-10 h-10 transition text-primary/50 hover:text-primary disabled:text-primary/10", value: prevQuantity, disabled: quantity <= 1, children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { children: "\u2212" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 250,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 249,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 245,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "px-2 text-center", "data-test": "item-quantity", children: quantity }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 254,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(UpdateCartButton, { lines: [{
        id: lineId,
        quantity: nextQuantity
      }], children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { className: "w-10 h-10 transition text-primary/50 hover:text-primary", name: "increase-quantity", value: nextQuantity, "aria-label": "Increase quantity", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { children: "+" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 263,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 262,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 258,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 244,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 240,
    columnNumber: 10
  }, this);
}
_c102 = CartLineQuantityAdjust;
function UpdateCartButton({
  children,
  lines
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(k, { route: "/cart", action: k.ACTIONS.LinesUpdate, inputs: {
    lines
  }, children }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 274,
    columnNumber: 10
  }, this);
}
_c112 = UpdateCartButton;
function CartLinePrice({
  line,
  priceType = "regular",
  ...passthroughProps
}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount)
    return null;
  const moneyV2 = priceType === "regular" ? line.cost.totalAmount : line.cost.compareAtAmountPerQuantity;
  if (moneyV2 == null) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Money, { withoutTrailingZeros: true, ...passthroughProps, data: moneyV2 }, void 0, false, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 291,
    columnNumber: 10
  }, this);
}
_c122 = CartLinePrice;
function CartEmpty({
  hidden = false,
  layout = "drawer",
  onClose
}) {
  _s22();
  const scrollRef = (0, import_react47.useRef)(null);
  const {
    y: y6
  } = useScroll_default(scrollRef);
  const container = {
    drawer: clsx_m_default(["content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12", y6 > 0 ? "border-t" : ""]),
    page: clsx_m_default([hidden ? "" : "grid", `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`])
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { ref: scrollRef, className: container[layout], hidden, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("section", { className: "grid gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Text, { format: true, children: "Looks like you haven\u2019t added anything yet, let\u2019s get you started!" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 310,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Button, { onClick: onClose, children: "Continue shopping" }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 315,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Cart.jsx",
        lineNumber: 314,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 309,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("section", { className: "grid gap-8 pt-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(FeaturedProducts, { count: 4, heading: "Shop Best Sellers", layout, onClose, sortKey: "BEST_SELLING" }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 319,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Cart.jsx",
      lineNumber: 318,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Cart.jsx",
    lineNumber: 308,
    columnNumber: 10
  }, this);
}
_s22(CartEmpty, "vtEhG7A/3/dTXxS7GGixxjHorXE=", false, function() {
  return [useScroll_default];
});
_c13 = CartEmpty;
var _c12;
var _c26;
var _c33;
var _c42;
var _c52;
var _c62;
var _c72;
var _c82;
var _c92;
var _c102;
var _c112;
var _c122;
var _c13;
$RefreshReg$(_c12, "Cart");
$RefreshReg$(_c26, "CartDetails");
$RefreshReg$(_c33, "CartDiscounts");
$RefreshReg$(_c42, "UpdateDiscountForm");
$RefreshReg$(_c52, "CartLines");
$RefreshReg$(_c62, "CartCheckoutActions");
$RefreshReg$(_c72, "CartSummary");
$RefreshReg$(_c82, "CartLineItem");
$RefreshReg$(_c92, "ItemRemoveButton");
$RefreshReg$(_c102, "CartLineQuantityAdjust");
$RefreshReg$(_c112, "UpdateCartButton");
$RefreshReg$(_c122, "CartLinePrice");
$RefreshReg$(_c13, "CartEmpty");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/CartLoading.jsx
var import_jsx_dev_runtime11 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\CartLoading.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\CartLoading.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function CartLoading() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex w-full h-screen-no-nav justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: 38, height: 38, viewBox: "0 0 38 38", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("linearGradient", { x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%", id: "a", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("stop", { stopColor: "#fff", stopOpacity: 0, offset: "0%" }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 27,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("stop", { stopColor: "#fff", stopOpacity: ".631", offset: "63.146%" }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 28,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("stop", { stopColor: "#fff", offset: "100%" }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 29,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CartLoading.jsx",
      lineNumber: 26,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/CartLoading.jsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("g", { transform: "translate(1 1)", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("path", { d: "M36 18c0-9.94-8.06-18-18-18", id: "Oval-2", stroke: "url(#a)", strokeWidth: 2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "0.9s", repeatCount: "indefinite" }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 35,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 34,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("circle", { fill: "#fff", cx: 36, cy: 18, r: 1, children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "0.9s", repeatCount: "indefinite" }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 38,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/CartLoading.jsx",
        lineNumber: 37,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CartLoading.jsx",
      lineNumber: 33,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/CartLoading.jsx",
      lineNumber: 32,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/CartLoading.jsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/CartLoading.jsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c14 = CartLoading;
var _c14;
$RefreshReg$(_c14, "CartLoading");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/OrderCard.jsx
var import_jsx_dev_runtime12 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\OrderCard.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\OrderCard.jsx"
  );
  import.meta.hot.lastModified = "1696490276854.439";
}
function OrderCard({
  order
}) {
  if (!order?.id)
    return null;
  const [legacyOrderId, key] = order.id.split("/").pop().split("?");
  const lineItems = flattenConnection(order?.lineItems);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("li", { className: "grid text-center border rounded", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Link2, { className: "grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-2", to: `/account/orders/${legacyOrderId}?${key}`, prefetch: "intent", children: [
      lineItems[0].variant?.image && /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "card-image aspect-square bg-primary/5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Image, { width: 168, height: 168, className: "w-full fadeIn cover", alt: lineItems[0].variant?.image?.altText ?? "Order image", src: lineItems[0].variant?.image.url }, void 0, false, {
        fileName: "app/components/OrderCard.jsx",
        lineNumber: 33,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/OrderCard.jsx",
        lineNumber: 32,
        columnNumber: 41
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: `flex-col justify-center text-left ${!lineItems[0].variant?.image && "md:col-span-2"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Heading, { as: "h3", format: true, size: "copy", children: lineItems.length > 1 ? `${lineItems[0].title} +${lineItems.length - 1} more` : lineItems[0].title }, void 0, false, {
          fileName: "app/components/OrderCard.jsx",
          lineNumber: 36,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dl", { className: "grid grid-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dt", { className: "sr-only", children: "Order ID" }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 40,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dd", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Text, { size: "fine", color: "subtle", children: [
            "Order No. ",
            order.orderNumber
          ] }, void 0, true, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 42,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 41,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dt", { className: "sr-only", children: "Order Date" }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 46,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dd", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Text, { size: "fine", color: "subtle", children: new Date(order.processedAt).toDateString() }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 48,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 47,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dt", { className: "sr-only", children: "Fulfillment Status" }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 52,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("dd", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", { className: `px-3 py-1 text-xs font-medium rounded-full ${order.fulfillmentStatus === "FULFILLED" ? "bg-green-100 text-green-800" : "bg-primary/5 text-primary/50"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Text, { size: "fine", children: statusMessage(order.fulfillmentStatus) }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 55,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 54,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/components/OrderCard.jsx",
            lineNumber: 53,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/OrderCard.jsx",
          lineNumber: 39,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/OrderCard.jsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/OrderCard.jsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "self-end border-t", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Link2, { className: "block w-full p-2 text-center", to: `/account/orders/${legacyOrderId}?${key}`, prefetch: "intent", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Text, { color: "subtle", className: "ml-3", children: "View Details" }, void 0, false, {
      fileName: "app/components/OrderCard.jsx",
      lineNumber: 65,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/OrderCard.jsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/OrderCard.jsx",
      lineNumber: 63,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/OrderCard.jsx",
    lineNumber: 30,
    columnNumber: 10
  }, this);
}
_c15 = OrderCard;
var ORDER_CARD_FRAGMENT = `#graphql
  fragment OrderCard on Order {
    id
    orderNumber
    processedAt
    financialStatus
    fulfillmentStatus
    currentTotalPrice {
      amount
      currencyCode
    }
    lineItems(first: 2) {
      edges {
        node {
          variant {
            image {
              url
              altText
              height
              width
            }
          }
          title
        }
      }
    }
  }
`;
var _c15;
$RefreshReg$(_c15, "OrderCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/AccountDetails.jsx
var import_jsx_dev_runtime13 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\AccountDetails.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\AccountDetails.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.5361";
}
function AccountDetails({
  customer
}) {
  const {
    firstName,
    lastName,
    email,
    phone
  } = customer;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { className: "font-bold text-lead", children: "Account Details" }, void 0, false, {
      fileName: "app/components/AccountDetails.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "lg:p-8 p-6 border border-gray-200 rounded", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { className: "font-bold text-base flex-1", children: "Profile & Security" }, void 0, false, {
          fileName: "app/components/AccountDetails.jsx",
          lineNumber: 36,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Link2, { prefetch: "intent", className: "underline text-sm font-normal", to: "/account/edit", children: "Edit" }, void 0, false, {
          fileName: "app/components/AccountDetails.jsx",
          lineNumber: 37,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mt-4 text-sm text-primary/50", children: "Name" }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "mt-1", children: [
        firstName || lastName ? (firstName ? firstName + " " : "") + lastName : "Add name",
        " "
      ] }, void 0, true, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mt-4 text-sm text-primary/50", children: "Contact" }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 46,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "mt-1", children: phone ?? "Add mobile" }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mt-4 text-sm text-primary/50", children: "Email address" }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 49,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "mt-1", children: email }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 50,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mt-4 text-sm text-primary/50", children: "Password" }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 52,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "mt-1", children: "**************" }, void 0, false, {
        fileName: "app/components/AccountDetails.jsx",
        lineNumber: 53,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AccountDetails.jsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AccountDetails.jsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/AccountDetails.jsx",
    lineNumber: 31,
    columnNumber: 10
  }, this);
}
_c16 = AccountDetails;
var _c16;
$RefreshReg$(_c16, "AccountDetails");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/AccountAddressBook.jsx
var import_jsx_dev_runtime14 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\AccountAddressBook.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\AccountAddressBook.jsx"
  );
  import.meta.hot.lastModified = "1696490276837.8787";
}
function AccountAddressBook({
  customer,
  addresses
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h3", { className: "font-bold text-lead", children: "Address Book" }, void 0, false, {
      fileName: "app/components/AccountAddressBook.jsx",
      lineNumber: 29,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      !addresses?.length && /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Text, { className: "mb-1", width: "narrow", as: "p", size: "copy", children: "You haven't saved any addresses yet." }, void 0, false, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 31,
        columnNumber: 34
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "w-48", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Button, { to: "address/add", className: "mt-2 text-sm w-full mb-6", variant: "secondary", children: "Add an Address" }, void 0, false, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 35,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      Boolean(addresses?.length) && /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: [
        customer.defaultAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Address, { address: customer.defaultAddress, defaultAddress: true }, void 0, false, {
          fileName: "app/components/AccountAddressBook.jsx",
          lineNumber: 40,
          columnNumber: 43
        }, this),
        addresses.filter((address) => address.id !== customer.defaultAddress?.id).map((address) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Address, { address }, address.id, false, {
          fileName: "app/components/AccountAddressBook.jsx",
          lineNumber: 41,
          columnNumber: 103
        }, this))
      ] }, void 0, true, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 39,
        columnNumber: 42
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AccountAddressBook.jsx",
      lineNumber: 30,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AccountAddressBook.jsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/AccountAddressBook.jsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}
_c17 = AccountAddressBook;
function Address({
  address,
  defaultAddress
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "lg:p-8 p-6 border border-gray-200 rounded flex flex-col", children: [
    defaultAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mb-3 flex flex-row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", { className: "px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary/50", children: "Default" }, void 0, false, {
      fileName: "app/components/AccountAddressBook.jsx",
      lineNumber: 54,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/AccountAddressBook.jsx",
      lineNumber: 53,
      columnNumber: 26
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("ul", { className: "flex-1 flex-row", children: [
      (address.firstName || address.lastName) && /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { children: "" + (address.firstName && address.firstName + " ") + address?.lastName }, void 0, false, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 59,
        columnNumber: 53
      }, this),
      address.formatted && address.formatted.map((line) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { children: line }, line, false, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 62,
        columnNumber: 61
      }, this))
    ] }, void 0, true, {
      fileName: "app/components/AccountAddressBook.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex flex-row font-medium mt-6 items-baseline", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Link2, { to: `/account/address/${encodeURIComponent(address.id)}`, className: "text-left underline text-sm", prefetch: "intent", children: "Edit" }, void 0, false, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Form, { action: "address/delete", method: "delete", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("input", { type: "hidden", name: "addressId", value: address.id }, void 0, false, {
          fileName: "app/components/AccountAddressBook.jsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("button", { className: "text-left text-primary/50 ml-6 text-sm", children: "Remove" }, void 0, false, {
          fileName: "app/components/AccountAddressBook.jsx",
          lineNumber: 71,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AccountAddressBook.jsx",
        lineNumber: 69,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AccountAddressBook.jsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AccountAddressBook.jsx",
    lineNumber: 52,
    columnNumber: 10
  }, this);
}
_c27 = Address;
var _c17;
var _c27;
$RefreshReg$(_c17, "AccountAddressBook");
$RefreshReg$(_c27, "Address");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Modal.jsx
var import_jsx_dev_runtime15 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Modal.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Modal.jsx"
  );
  import.meta.hot.lastModified = "1697008445754.2717";
}
function Modal({
  children,
  cancelLink
}) {
  console.log(children, "children");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "relative z-50", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", id: "modal-bg", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40" }, void 0, false, {
      fileName: "app/components/Modal.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex items-center justify-center min-h-full p-4 text-center sm:p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:my-12 sm:flex-none sm:w-full sm:max-w-sm sm:p-6", role: "button", onClick: (e4) => {
      e4.stopPropagation();
    }, onKeyPress: (e4) => {
      e4.stopPropagation();
    }, tabIndex: 0, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "absolute top-0 right-0 hidden pt-4 pr-4 sm:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Link2, { to: cancelLink, className: "p-4 -m-4 transition text-primary hover:text-primary/50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(IconClose, { "aria-label": "Close panel" }, void 0, false, {
        fileName: "app/components/Modal.jsx",
        lineNumber: 38,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/Modal.jsx",
        lineNumber: 37,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/Modal.jsx",
        lineNumber: 36,
        columnNumber: 13
      }, this),
      children
    ] }, void 0, true, {
      fileName: "app/components/Modal.jsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Modal.jsx",
      lineNumber: 30,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Modal.jsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Modal.jsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}
_c18 = Modal;
var _c18;
$RefreshReg$(_c18, "Modal");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Link.jsx
var import_jsx_dev_runtime16 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Link.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s5 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Link.jsx"
  );
  import.meta.hot.lastModified = "1696490276852.49";
}
function Link2(props) {
  _s5();
  const {
    to,
    className,
    ...resOfProps
  } = props;
  const [root] = useMatches();
  const selectedLocale = root.data?.selectedLocale;
  let toWithLocale = to;
  if (typeof to === "string") {
    toWithLocale = selectedLocale ? `${selectedLocale.pathPrefix}${to}` : to;
  }
  if (typeof className === "function") {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(NavLink, { to: toWithLocale, className, ...resOfProps }, void 0, false, {
      fileName: "app/components/Link.jsx",
      lineNumber: 53,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(Link, { to: toWithLocale, className, ...resOfProps }, void 0, false, {
    fileName: "app/components/Link.jsx",
    lineNumber: 55,
    columnNumber: 10
  }, this);
}
_s5(Link2, "qWoibZqbzlhGDRlxEMM9P1NS8i8=", false, function() {
  return [useMatches];
});
_c19 = Link2;
var _c19;
$RefreshReg$(_c19, "Link");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/FeaturedCollections.jsx
var import_jsx_dev_runtime17 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\FeaturedCollections.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\FeaturedCollections.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function FeaturedCollections({
  collections,
  title = "Collections",
  ...props
}) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections)
    return null;
  const collectionsWithImage = collections.nodes.filter((item) => item.image);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Section, { ...props, heading: title, children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Grid, { items: collectionsWithImage.length, children: collectionsWithImage.map((collection) => {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Link2, { to: `/collections/${collection.handle}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "card-image bg-primary/5 aspect-[3/2]", children: collection?.image && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Image, { alt: `Image of ${collection.title}`, data: collection.image, sizes: "(max-width: 32em) 100vw, 33vw", aspectRatio: "3/2" }, void 0, false, {
        fileName: "app/components/FeaturedCollections.jsx",
        lineNumber: 37,
        columnNumber: 41
      }, this) }, void 0, false, {
        fileName: "app/components/FeaturedCollections.jsx",
        lineNumber: 36,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Heading, { size: "copy", children: collection.title }, void 0, false, {
        fileName: "app/components/FeaturedCollections.jsx",
        lineNumber: 39,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/FeaturedCollections.jsx",
      lineNumber: 35,
      columnNumber: 15
    }, this) }, collection.id, false, {
      fileName: "app/components/FeaturedCollections.jsx",
      lineNumber: 34,
      columnNumber: 16
    }, this);
  }) }, void 0, false, {
    fileName: "app/components/FeaturedCollections.jsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/FeaturedCollections.jsx",
    lineNumber: 31,
    columnNumber: 10
  }, this);
}
_c20 = FeaturedCollections;
var _c20;
$RefreshReg$(_c20, "FeaturedCollections");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Hero.jsx
var import_jsx_dev_runtime18 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Hero.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Hero.jsx"
  );
  import.meta.hot.lastModified = "1696500619915.977";
}
function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Link2, { to: `/collections/${handle}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("section", { className: clsx_m_default("relative justify-end flex flex-col w-full", top && "-mt-nav", height === "full" ? "h-screen" : "aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]"), children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip", children: [
      spread?.reference && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(SpreadMedia, { sizes: spreadSecondary?.reference ? "(min-width: 48em) 50vw, 100vw" : "100vw", data: spread.reference, loading }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 43,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 42,
        columnNumber: 33
      }, this),
      spreadSecondary?.reference && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "hidden md:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(SpreadMedia, { sizes: "50vw", data: spreadSecondary.reference, loading }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 46,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 45,
        columnNumber: 42
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Hero.jsx",
      lineNumber: 41,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast", children: [
      heading?.value && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("heading", { format: true, as: "h2", size: "display", className: "max-w-md", children: heading.value }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 50,
        columnNumber: 30
      }, this),
      byline?.value && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Text, { format: true, width: "narrow", as: "p", size: "lead", children: byline.value }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 53,
        columnNumber: 29
      }, this),
      cta?.value && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Text, { size: "lead", children: cta.value }, void 0, false, {
        fileName: "app/components/Hero.jsx",
        lineNumber: 56,
        columnNumber: 26
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Hero.jsx",
      lineNumber: 49,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Hero.jsx",
    lineNumber: 40,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Hero.jsx",
    lineNumber: 39,
    columnNumber: 10
  }, this);
}
_c21 = Hero;
function SpreadMedia({
  data,
  loading,
  sizes
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(MediaFile, { data, className: "block object-cover w-full h-full", mediaOptions: {
    video: {
      controls: false,
      muted: true,
      loop: true,
      playsInline: true,
      autoPlay: true,
      previewImageOptions: {
        src: data.previewImage?.url ?? ""
      }
    },
    image: {
      loading,
      crop: "center",
      sizes,
      alt: data.alt || ""
    }
  } }, void 0, false, {
    fileName: "app/components/Hero.jsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
}
_c28 = SpreadMedia;
var _c21;
var _c28;
$RefreshReg$(_c21, "Hero");
$RefreshReg$(_c28, "SpreadMedia");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/SortFilter.jsx
var import_react50 = __toESM(require_react());
var import_jsx_dev_runtime19 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\SortFilter.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s6 = $RefreshSig$();
var _s23 = $RefreshSig$();
var _s32 = $RefreshSig$();
var _s42 = $RefreshSig$();
var _s52 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\SortFilter.jsx"
  );
  import.meta.hot.lastModified = "1696490276857.6536";
}
function SortFilter({
  filters,
  appliedFilters = [],
  children,
  collections = []
}) {
  _s6();
  const [isOpen, setIsOpen] = (0, import_react50.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("button", { onClick: () => setIsOpen(!isOpen), className: "relative flex items-center justify-center w-8 h-8 focus:ring-primary/5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(IconFilters, {}, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 42,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(SortMenu, {}, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 44,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex flex-col flex-wrap md:flex-row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: `transition-all duration-200 ${isOpen ? "opacity-100 min-w-full md:min-w-[240px] md:w-[240px] md:pr-8 max-h-full" : "opacity-0 md:min-w-[0px] md:w-[0px] pr-0 max-h-0 md:max-h-full"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(FiltersDrawer, { collections, filters, appliedFilters }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 48,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex-1", children }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 46,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SortFilter.jsx",
    lineNumber: 39,
    columnNumber: 10
  }, this);
}
_s6(SortFilter, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c29 = SortFilter;
function FiltersDrawer({
  filters = [],
  appliedFilters = []
}) {
  _s23();
  const [params] = useSearchParams();
  const location = useLocation();
  const filterMarkup = (filter, option) => {
    switch (filter.type) {
      case "PRICE_RANGE":
        const min = params.has("minPrice") && !isNaN(Number(params.get("minPrice"))) ? Number(params.get("minPrice")) : void 0;
        const max = params.has("maxPrice") && !isNaN(Number(params.get("maxPrice"))) ? Number(params.get("maxPrice")) : void 0;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(PriceRangeFilter, { min, max }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 68,
          columnNumber: 16
        }, this);
      default:
        const to = getFilterLink(filter, option.input, params, location);
        return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Link, { className: "focus:underline hover:underline", prefetch: "intent", to, children: option.label }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 71,
          columnNumber: 16
        }, this);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("nav", { className: "py-8", children: [
    appliedFilters.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "pb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(AppliedFilters, { filters: appliedFilters }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 79,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 78,
      columnNumber: 38
    }, this) : null,
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Heading, { as: "h4", size: "lead", className: "pb-4", children: "Filter By" }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 82,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "divide-y", children: filters.map((filter) => filter.values.length > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(ve, { as: "div", className: "w-full", children: ({
      open
    }) => /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(ve.Button, { className: "flex justify-between w-full py-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Text, { size: "lead", children: filter.label }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 91,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(IconCaret, { direction: open ? "up" : "down" }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 92,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 90,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(ve.Panel, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("ul", { className: "py-2", children: filter.values?.map((option) => {
        return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("li", { className: "pb-4", children: filterMarkup(filter, option) }, option.id, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 97,
          columnNumber: 26
        }, this);
      }) }, filter.id, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 95,
        columnNumber: 25
      }, this) }, filter.id, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 94,
        columnNumber: 23
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 89,
      columnNumber: 17
    }, this) }, filter.id, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 86,
      columnNumber: 62
    }, this)) }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 85,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SortFilter.jsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/SortFilter.jsx",
    lineNumber: 76,
    columnNumber: 10
  }, this);
}
_s23(FiltersDrawer, "FSIYq/mEya1qyVMbOCppTsgSrWc=", false, function() {
  return [useSearchParams, useLocation];
});
_c210 = FiltersDrawer;
function AppliedFilters({
  filters = []
}) {
  _s32();
  const [params] = useSearchParams();
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Heading, { as: "h4", size: "lead", className: "pb-4", children: "Applied filters" }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: filters.map((filter) => {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Link, { to: getAppliedFilterLink(filter, params, location), className: "flex px-2 border rounded-full gap", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "flex-grow", children: filter.label }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 126,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(IconXMark, {}, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 128,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 127,
          columnNumber: 15
        }, this)
      ] }, `${filter.label}-${filter.urlParam}`, true, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 125,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 123,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SortFilter.jsx",
    lineNumber: 119,
    columnNumber: 10
  }, this);
}
_s32(AppliedFilters, "FSIYq/mEya1qyVMbOCppTsgSrWc=", false, function() {
  return [useSearchParams, useLocation];
});
_c34 = AppliedFilters;
function getAppliedFilterLink(filter, params, location) {
  const paramsClone = new URLSearchParams(params);
  if (filter.urlParam.key === "variantOption") {
    const variantOptions = paramsClone.getAll("variantOption");
    const filteredVariantOptions = variantOptions.filter((options) => !options.includes(filter.urlParam.value));
    paramsClone.delete(filter.urlParam.key);
    for (const filteredVariantOption of filteredVariantOptions) {
      paramsClone.append(filter.urlParam.key, filteredVariantOption);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}
function getSortLink(sort, params, location) {
  params.set("sort", sort);
  return `${location.pathname}?${params.toString()}`;
}
function getFilterLink(filter, rawInput, params, location) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}
var PRICE_RANGE_FILTER_DEBOUNCE = 500;
function PriceRangeFilter({
  max,
  min
}) {
  _s42();
  const location = useLocation();
  const params = (0, import_react50.useMemo)(() => new URLSearchParams(location.search), [location.search]);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = (0, import_react50.useState)(min ? String(min) : "");
  const [maxPrice, setMaxPrice] = (0, import_react50.useState)(max ? String(max) : "");
  useDebounce(() => {
    if ((minPrice === "" || minPrice === String(min)) && (maxPrice === "" || maxPrice === String(max)))
      return;
    const price = {};
    if (minPrice !== "")
      price.min = minPrice;
    if (maxPrice !== "")
      price.max = maxPrice;
    const newParams = filterInputToParams("PRICE_RANGE", {
      price
    }, params);
    navigate(`${location.pathname}?${newParams.toString()}`);
  }, PRICE_RANGE_FILTER_DEBOUNCE, [minPrice, maxPrice]);
  const onChangeMax = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
  };
  const onChangeMin = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("label", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { children: "from" }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 193,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("input", { name: "maxPrice", className: "text-black", type: "text", defaultValue: min, placeholder: "$", onChange: onChangeMin }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 194,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 192,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { children: "to" }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 197,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("input", { name: "minPrice", className: "text-black", type: "number", defaultValue: max, placeholder: "$", onChange: onChangeMax }, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 198,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 196,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SortFilter.jsx",
    lineNumber: 191,
    columnNumber: 10
  }, this);
}
_s42(PriceRangeFilter, "8HDW6OoS7YQ+/FbsGa+KOAztv2g=", false, function() {
  return [useLocation, useNavigate, useDebounce];
});
_c43 = PriceRangeFilter;
function filterInputToParams(type, rawInput, params) {
  const input = typeof rawInput === "string" ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case "PRICE_RANGE":
      if (input.price.min)
        params.set("minPrice", input.price.min);
      if (input.price.max)
        params.set("maxPrice", input.price.max);
      break;
    case "LIST":
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === "string") {
          params.set(key, value);
        } else if (typeof value === "boolean") {
          params.set(key, value.toString());
        } else {
          const {
            name,
            value: val
          } = value;
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;
          if (!allVariants.includes(newVariant)) {
            params.append("variantOption", newVariant);
          }
        }
      });
      break;
  }
  return params;
}
function SortMenu() {
  _s52();
  const items = [{
    label: "Featured",
    key: "featured"
  }, {
    label: "Price: Low - High",
    key: "price-low-high"
  }, {
    label: "Price: High - Low",
    key: "price-high-low"
  }, {
    label: "Best Selling",
    key: "best-selling"
  }, {
    label: "Newest",
    key: "newest"
  }];
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = items.find((item) => item.key === params.get("sort"));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(it, { as: "div", className: "relative z-40", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(it.Button, { className: "flex items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "px-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "px-2 font-medium", children: "Sort by:" }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 259,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { children: (activeItem || items[0]).label }, void 0, false, {
          fileName: "app/components/SortFilter.jsx",
          lineNumber: 260,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 258,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(IconCaret, {}, void 0, false, {
        fileName: "app/components/SortFilter.jsx",
        lineNumber: 262,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 257,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(it.Items, { as: "nav", className: "absolute right-0 flex flex-col p-4 text-right rounded-sm bg-contrast", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(it.Item, { children: () => /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Link, { className: `block text-sm pb-2 px-3 ${activeItem?.key === item.key ? "font-bold" : "font-normal"}`, to: getSortLink(item.key, params, location), children: item.label }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 267,
      columnNumber: 20
    }, this) }, item.label, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 266,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/components/SortFilter.jsx",
      lineNumber: 265,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SortFilter.jsx",
    lineNumber: 256,
    columnNumber: 10
  }, this);
}
_s52(SortMenu, "FSIYq/mEya1qyVMbOCppTsgSrWc=", false, function() {
  return [useSearchParams, useLocation];
});
_c53 = SortMenu;
var _c29;
var _c210;
var _c34;
var _c43;
var _c53;
$RefreshReg$(_c29, "SortFilter");
$RefreshReg$(_c210, "FiltersDrawer");
$RefreshReg$(_c34, "AppliedFilters");
$RefreshReg$(_c43, "PriceRangeFilter");
$RefreshReg$(_c53, "SortMenu");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Grid.jsx
var import_jsx_dev_runtime20 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Grid.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Grid.jsx"
  );
  import.meta.hot.lastModified = "1696490276848.0342";
}
function Grid({
  as: Component2 = "div",
  className,
  flow = "row",
  gap = "default",
  items = 4,
  layout = "default",
  ...props
}) {
  const layouts = {
    default: `grid-cols-1 ${items === 2 && "md:grid-cols-2"}  ${items === 3 && "sm:grid-cols-3"} ${items > 3 && "md:grid-cols-3"} ${items >= 4 && "lg:grid-cols-4"}`,
    products: `grid-cols-2 ${items >= 3 && "md:grid-cols-3"} ${items >= 4 && "lg:grid-cols-4"}`,
    auto: "auto-cols-auto",
    blog: "grid-cols-1 md:grid-cols-2"
  };
  const gaps = {
    default: "grid gap-2 gap-y-6 md:gap-4 lg:gap-6",
    blog: "grid gap-6"
  };
  const flows = {
    row: "grid-flow-row",
    col: "grid-flow-col"
  };
  const styles = clsx_m_default(flows[flow], gaps[gap], layouts[layout], className);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Component2, { ...props, className: styles }, void 0, false, {
    fileName: "app/components/Grid.jsx",
    lineNumber: 46,
    columnNumber: 10
  }, this);
}
_c30 = Grid;
var _c30;
$RefreshReg$(_c30, "Grid");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/FeaturedProducts.jsx
var import_react53 = __toESM(require_react());
var import_jsx_dev_runtime21 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\FeaturedProducts.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s7 = $RefreshSig$();
var _s24 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\FeaturedProducts.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function FeaturedProducts({
  count = 4,
  heading = "Shop Best Sellers",
  layout = "drawer",
  onClose,
  query,
  reverse,
  sortKey = "BEST_SELLING"
}) {
  _s7();
  const {
    load,
    data
  } = useFetcher();
  const queryString = (0, import_react53.useMemo)(() => Object.entries({
    count,
    sortKey,
    query,
    reverse
  }).map(([key, val]) => val ? `${key}=${val}` : null).filter(Boolean).join("&"), [count, sortKey, query, reverse]);
  const productsApiPath = usePrefixPathWithLocale(`/api/products?${queryString}`);
  (0, import_react53.useEffect)(() => {
    load(productsApiPath);
  }, [load, productsApiPath]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(Heading, { format: true, size: "copy", className: "t-4" }, void 0, false, {
      fileName: "app/components/FeaturedProducts.jsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: clsx_m_default([`grid grid-cols-2 gap-x-6 gap-y-8`, layout === "page" ? "md:grid-cols-4 sm:grid-col-4" : ""]), children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(FeatureProductsContent, { count, onClick: onClose, products: data?.products }, void 0, false, {
      fileName: "app/components/FeaturedProducts.jsx",
      lineNumber: 68,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/FeaturedProducts.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/FeaturedProducts.jsx",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}
_s7(FeaturedProducts, "l5RBYgW3hOhrO9Rac/GD2mYq5vM=", false, function() {
  return [useFetcher, usePrefixPathWithLocale];
});
_c31 = FeaturedProducts;
function FeatureProductsContent({
  count = 4,
  onClick,
  products
}) {
  _s24();
  const id = (0, import_react53.useId)();
  if (!products) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, { children: [...new Array(count)].map((_3, i6) => /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "grid gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(Skeleton, { className: "aspect-[3/4]" }, void 0, false, {
        fileName: "app/components/FeaturedProducts.jsx",
        lineNumber: 90,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(Skeleton, { className: "w-32 h-4" }, void 0, false, {
        fileName: "app/components/FeaturedProducts.jsx",
        lineNumber: 91,
        columnNumber: 13
      }, this)
    ] }, `${id + i6}`, true, {
      fileName: "app/components/FeaturedProducts.jsx",
      lineNumber: 89,
      columnNumber: 46
    }, this)) }, void 0, false, {
      fileName: "app/components/FeaturedProducts.jsx",
      lineNumber: 88,
      columnNumber: 12
    }, this);
  }
  if (products?.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(Text, { format: true, children: "No products found." }, void 0, false, {
      fileName: "app/components/FeaturedProducts.jsx",
      lineNumber: 96,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, { children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(ProductCard, { product, onClick, quickAdd: true }, product.id, false, {
    fileName: "app/components/FeaturedProducts.jsx",
    lineNumber: 99,
    columnNumber: 32
  }, this)) }, void 0, false, {
    fileName: "app/components/FeaturedProducts.jsx",
    lineNumber: 98,
    columnNumber: 10
  }, this);
}
_s24(FeatureProductsContent, "WhsuKpSQZEWeFcB7gWlfDRQktoQ=", false, function() {
  return [import_react53.useId];
});
_c211 = FeatureProductsContent;
var _c31;
var _c211;
$RefreshReg$(_c31, "FeaturedProducts");
$RefreshReg$(_c211, "FeatureProductsContent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/AddToCartButton.jsx
var import_react57 = __toESM(require_react());

// app/hooks/usePageAnalytics.jsx
var import_react56 = __toESM(require_react());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\usePageAnalytics.jsx"
  );
  import.meta.hot.lastModified = "1696490276868.5408";
}
function usePageAnalytics({ hasUserConsent }) {
  const matches = useMatches();
  return (0, import_react56.useMemo)(() => {
    const data = {};
    matches.forEach((event) => {
      const eventData = event?.data;
      if (eventData) {
        eventData["analytics"] && Object.assign(data, eventData["analytics"]);
        const selectedLocale = eventData["selectedLocale"] || DEFAULT_LOCALE;
        Object.assign(data, {
          currency: selectedLocale.currency,
          acceptedLanguage: selectedLocale.language
        });
      }
    });
    return {
      ...data,
      hasUserConsent
    };
  }, [matches, hasUserConsent]);
}

// app/components/AddToCartButton.jsx
var import_jsx_dev_runtime22 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\AddToCartButton.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s8 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\AddToCartButton.jsx"
  );
  import.meta.hot.lastModified = "1696490276839.9326";
}
function AddToCartButton({
  children,
  lines,
  className = "",
  variant = "primary",
  width = "full",
  disabled,
  analytics,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(k, { route: "/cart", inputs: {
    lines
  }, action: k.ACTIONS.LinesAdd, children: (fetcher) => {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(AddToCartAnalytics, { fetcher, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("input", { type: "hidden", name: "analytics", value: JSON.stringify(analytics) }, void 0, false, {
        fileName: "app/components/AddToCartButton.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(Button, { as: "button", type: "submit", width, variant, className, disabled: disabled ?? fetcher.state !== "idle", ...props, children }, void 0, false, {
        fileName: "app/components/AddToCartButton.jsx",
        lineNumber: 42,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddToCartButton.jsx",
      lineNumber: 40,
      columnNumber: 14
    }, this);
  } }, void 0, false, {
    fileName: "app/components/AddToCartButton.jsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
}
_c35 = AddToCartButton;
function AddToCartAnalytics({
  fetcher,
  children
}) {
  _s8();
  const fetcherData = fetcher.data;
  const formData = fetcher.formData;
  const pageAnalytics = usePageAnalytics({
    hasUserConsent: true
  });
  (0, import_react57.useEffect)(() => {
    if (formData) {
      const cartData = {};
      const cartInputs = k.getFormInput(formData);
      try {
        if (cartInputs.inputs.analytics) {
          const dataInForm = JSON.parse(String(cartInputs.inputs.analytics));
          Object.assign(cartData, dataInForm);
        }
      } catch {
      }
      if (Object.keys(cartData).length && fetcherData) {
        const addToCartPayload = {
          ...getClientBrowserParameters(),
          ...pageAnalytics,
          ...cartData,
          cartId: fetcherData.cart.id
        };
        sendShopifyAnalytics({
          eventName: AnalyticsEventName.ADD_TO_CART,
          payload: addToCartPayload
        });
      }
    }
  }, [fetcherData, formData, pageAnalytics]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_jsx_dev_runtime22.Fragment, { children }, void 0, false, {
    fileName: "app/components/AddToCartButton.jsx",
    lineNumber: 86,
    columnNumber: 10
  }, this);
}
_s8(AddToCartAnalytics, "4xoS2OkBW3GQGqAa8c2ntMnQig8=", false, function() {
  return [usePageAnalytics];
});
_c212 = AddToCartAnalytics;
var _c35;
var _c212;
$RefreshReg$(_c35, "AddToCartButton");
$RefreshReg$(_c212, "AddToCartAnalytics");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Icon.jsx
var import_jsx_dev_runtime23 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Icon.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Icon.jsx"
  );
  import.meta.hot.lastModified = "1696490276849.0974";
}
function Icon({
  children,
  className,
  fill = "currentColor",
  stroke,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", ...props, fill, stroke, className: clsx_m_default("w-5 h-5", className), children }, void 0, false, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
_c36 = Icon;
function IconMenu(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, stroke: props.stroke || "currentColor", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Menu" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "3", y1: "6.375", x2: "17", y2: "6.375", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "3", y1: "10.375", x2: "17", y2: "10.375", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "3", y1: "14.375", x2: "17", y2: "14.375", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 39,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_c213 = IconMenu;
function IconClose(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, stroke: props.stroke || "currentColor", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Close" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "4.44194", y1: "4.30806", x2: "15.7556", y2: "15.6218", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { y1: "-0.625", x2: "16", y2: "-0.625", transform: "matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 44,
    columnNumber: 10
  }, this);
}
_c37 = IconClose;
function IconArrow({
  direction = "right"
}) {
  let rotate;
  switch (direction) {
    case "right":
      rotate = "rotate-0";
      break;
    case "left":
      rotate = "rotate-180";
      break;
    case "up":
      rotate = "-rotate-90";
      break;
    case "down":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { className: `w-5 h-5 ${rotate}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Arrow" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M7 3L14 10L7 17", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 73,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
}
_c44 = IconArrow;
function IconCaret({
  direction = "down",
  stroke = "currentColor",
  ...props
}) {
  let rotate;
  switch (direction) {
    case "down":
      rotate = "rotate-0";
      break;
    case "up":
      rotate = "rotate-180";
      break;
    case "left":
      rotate = "-rotate-90";
      break;
    case "right":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, className: `w-5 h-5 transition ${rotate}`, fill: "transparent", stroke, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Caret" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M14 8L10 12L6 8", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 101,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 99,
    columnNumber: 10
  }, this);
}
_c54 = IconCaret;
function IconSelect(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Select" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 107,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M7 8.5L10 6.5L13 8.5", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M13 11.5L10 13.5L7 11.5", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 109,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 106,
    columnNumber: 10
  }, this);
}
_c63 = IconSelect;
function IconBag(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Bag" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { fillRule: "evenodd", d: "M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 116,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 114,
    columnNumber: 10
  }, this);
}
_c73 = IconBag;
function IconLogin(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Login" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M8,10.6928545 C10.362615,10.6928545 12.4860225,11.7170237 13.9504747,13.3456144 C12.4860225,14.9758308 10.362615,16 8,16 C5.63738499,16 3.51397752,14.9758308 2.04952533,13.3472401 C3.51397752,11.7170237 5.63738499,10.6928545 8,10.6928545 Z", fill: "currentColor" }, void 0, false, {
        fileName: "app/components/Icon.jsx",
        lineNumber: 124,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M8,3.5 C6.433,3.5 5.25,4.894 5.25,6.5 C5.25,8.106 6.433,9.5 8,9.5 C9.567,9.5 10.75,8.106 10.75,6.5 C10.75,4.894 9.567,3.5 8,3.5 Z", fill: "currentColor", fillRule: "nonzero" }, void 0, false, {
        fileName: "app/components/Icon.jsx",
        lineNumber: 125,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 123,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 121,
    columnNumber: 10
  }, this);
}
_c83 = IconLogin;
function IconAccount(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Account" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { fillRule: "evenodd", d: "M9.9998 12.625c-1.9141 0-3.6628.698-5.0435 1.8611C3.895 13.2935 3.25 11.7221 3.25 10c0-3.728 3.022-6.75 6.75-6.75 3.7279 0 6.75 3.022 6.75 6.75 0 1.7222-.645 3.2937-1.7065 4.4863-1.3807-1.1632-3.1295-1.8613-5.0437-1.8613ZM10 18c-2.3556 0-4.4734-1.0181-5.9374-2.6382C2.7806 13.9431 2 12.0627 2 10c0-4.4183 3.5817-8 8-8s8 3.5817 8 8-3.5817 8-8 8Zm0-12.5c-1.567 0-2.75 1.394-2.75 3s1.183 3 2.75 3 2.75-1.394 2.75-3-1.183-3-2.75-3Z" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 133,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 131,
    columnNumber: 10
  }, this);
}
_c93 = IconAccount;
function IconHelp(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Help" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M3.375 10a6.625 6.625 0 1 1 13.25 0 6.625 6.625 0 0 1-13.25 0ZM10 2.125a7.875 7.875 0 1 0 0 15.75 7.875 7.875 0 0 0 0-15.75Zm.699 10.507H9.236V14h1.463v-1.368ZM7.675 7.576A3.256 3.256 0 0 0 7.5 8.67h1.245c0-.496.105-.89.316-1.182.218-.299.553-.448 1.005-.448a1 1 0 0 1 .327.065c.124.044.24.113.35.208.108.095.2.223.272.383.08.154.12.34.12.558a1.3 1.3 0 0 1-.076.471c-.044.131-.11.252-.197.361-.08.102-.174.197-.283.285-.102.087-.212.182-.328.284a3.157 3.157 0 0 0-.382.383c-.102.124-.19.27-.262.438a2.476 2.476 0 0 0-.164.591 6.333 6.333 0 0 0-.043.81h1.179c0-.263.021-.485.065-.668a1.65 1.65 0 0 1 .207-.47c.088-.139.19-.263.306-.372.117-.11.244-.223.382-.34l.35-.306c.116-.11.218-.23.305-.361.095-.139.168-.3.219-.482.058-.19.087-.412.087-.667 0-.35-.062-.664-.186-.942a1.881 1.881 0 0 0-.513-.689 2.07 2.07 0 0 0-.753-.427A2.721 2.721 0 0 0 10.12 6c-.4 0-.764.066-1.092.197a2.36 2.36 0 0 0-.83.536c-.225.234-.4.515-.523.843Z" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 140,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 138,
    columnNumber: 10
  }, this);
}
_c103 = IconHelp;
function IconSearch(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Search" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 146,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { fillRule: "evenodd", d: "M13.3 8.52a4.77 4.77 0 1 1-9.55 0 4.77 4.77 0 0 1 9.55 0Zm-.98 4.68a6.02 6.02 0 1 1 .88-.88l4.3 4.3-.89.88-4.3-4.3Z" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 147,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 145,
    columnNumber: 10
  }, this);
}
_c113 = IconSearch;
function IconCheck({
  stroke = "currentColor",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, fill: "transparent", stroke, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Check" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 156,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("circle", { cx: "10", cy: "10", r: "7.25", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 157,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "m7.04 10.37 2.42 2.41 3.5-5.56" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 158,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 155,
    columnNumber: 10
  }, this);
}
_c123 = IconCheck;
function IconXMark({
  stroke = "currentColor",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, fill: "transparent", stroke, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Delete" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 167,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 168,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 166,
    columnNumber: 10
  }, this);
}
_c132 = IconXMark;
function IconRemove(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, fill: "transparent", stroke: props.stroke || "currentColor", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Remove" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 174,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M4 6H16", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 175,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M8.5 9V14", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 176,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M11.5 9V14", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 177,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M5.5 6L6 17H14L14.5 6", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 178,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6", strokeWidth: "1.25" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 179,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 173,
    columnNumber: 10
  }, this);
}
_c142 = IconRemove;
function IconFilters(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Icon, { ...props, fill: "transparent", stroke: props.stroke || "currentColor", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("title", { children: "Filters" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 185,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("circle", { cx: "4.5", cy: "6.5", r: "2" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 186,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "6", y1: "6.5", x2: "14", y2: "6.5" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 187,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "4.37114e-08", y1: "6.5", x2: "3", y2: "6.5" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 188,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "4.37114e-08", y1: "13.5", x2: "8", y2: "13.5" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 189,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("line", { x1: "11", y1: "13.5", x2: "14", y2: "13.5" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 190,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("circle", { cx: "9.5", cy: "13.5", r: "2" }, void 0, false, {
      fileName: "app/components/Icon.jsx",
      lineNumber: 191,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Icon.jsx",
    lineNumber: 184,
    columnNumber: 10
  }, this);
}
_c152 = IconFilters;
var _c36;
var _c213;
var _c37;
var _c44;
var _c54;
var _c63;
var _c73;
var _c83;
var _c93;
var _c103;
var _c113;
var _c123;
var _c132;
var _c142;
var _c152;
$RefreshReg$(_c36, "Icon");
$RefreshReg$(_c213, "IconMenu");
$RefreshReg$(_c37, "IconClose");
$RefreshReg$(_c44, "IconArrow");
$RefreshReg$(_c54, "IconCaret");
$RefreshReg$(_c63, "IconSelect");
$RefreshReg$(_c73, "IconBag");
$RefreshReg$(_c83, "IconLogin");
$RefreshReg$(_c93, "IconAccount");
$RefreshReg$(_c103, "IconHelp");
$RefreshReg$(_c113, "IconSearch");
$RefreshReg$(_c123, "IconCheck");
$RefreshReg$(_c132, "IconXMark");
$RefreshReg$(_c142, "IconRemove");
$RefreshReg$(_c152, "IconFilters");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/index.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\index.js"
  );
  import.meta.hot.lastModified = "1696490276860.8655";
}

// app/hooks/useIsHydrated.jsx
var import_react58 = __toESM(require_react());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\useIsHydrated.jsx"
  );
  import.meta.hot.lastModified = "1696490276867.553";
}
function useIsHydrated() {
  const [isHydrated, setHydrated] = (0, import_react58.useState)(false);
  (0, import_react58.useEffect)(() => {
    setHydrated(true);
  }, []);
  return isHydrated;
}

// app/hooks/useCartFetchers.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\useCartFetchers.jsx"
  );
  import.meta.hot.lastModified = "1696490276866.691";
}
function useCartFetchers(actionName) {
  const fetchers = useFetchers();
  const cartFetchers = [];
  for (const fetcher of fetchers) {
    const formData = fetcher.submission?.formData;
    if (formData) {
      const formInputs = k.getFormInput(formData);
      if (formInputs.action === actionName) {
        cartFetchers.push(fetcher);
      }
    }
  }
  return cartFetchers;
}

// app/components/Layout.jsx
var import_jsx_dev_runtime24 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Layout.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s9 = $RefreshSig$();
var _s25 = $RefreshSig$();
var _s33 = $RefreshSig$();
var _s43 = $RefreshSig$();
var _s53 = $RefreshSig$();
var _s62 = $RefreshSig$();
var _s72 = $RefreshSig$();
var _s82 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Layout.jsx"
  );
  import.meta.hot.lastModified = "1697185175465.145";
}
var customerid;
function Layout({
  children,
  layout
}) {
  const {
    headerMenu,
    footerMenu
  } = layout;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_jsx_dev_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col min-h-screen ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("a", { href: "#mainContent", className: "sr-only", children: "Skip to content" }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 52,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      headerMenu && /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Header, { title: layout.shop.name, menu: headerMenu }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 56,
        columnNumber: 24
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("main", { role: "main", id: "mainContent", className: "flex-grow", children }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 57,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    footerMenu && /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Footer, { menu: footerMenu }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 61,
      columnNumber: 22
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 49,
    columnNumber: 10
  }, this);
}
_c38 = Layout;
function Header({
  title,
  menu
}) {
  _s9();
  const isHome = useIsHomePath();
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart
  } = useDrawer();
  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu
  } = useDrawer();
  const addToCartFetchers = useCartFetchers(k.ACTIONS.LinesAdd);
  (0, import_react62.useEffect)(() => {
    if (isCartOpen || !addToCartFetchers.length)
      return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_jsx_dev_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(CartDrawer, { isOpen: isCartOpen, onClose: closeCart }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 89,
      columnNumber: 7
    }, this),
    menu && /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(MenuDrawer, { isOpen: isMenuOpen, onClose: closeMenu, menu }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 90,
      columnNumber: 16
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(DesktopHeader, { isHome, title, menu, openCart }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(MobileHeader, { isHome, title, openCart, openMenu }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 88,
    columnNumber: 10
  }, this);
}
_s9(Header, "LnuYRrawr4KCAb0HEz4uyijG/mw=", false, function() {
  return [useIsHomePath, useDrawer, useDrawer, useCartFetchers];
});
_c214 = Header;
function CartDrawer({
  isOpen,
  onClose
}) {
  _s25();
  const [root] = useMatches();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Drawer, { open: isOpen, onClose, heading: "Cart", openFrom: "right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react62.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(CartLoading, {}, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 107,
    columnNumber: 29
  }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Await, { resolve: root.data?.cart, children: (cart) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Cart, { layout: "drawer", onClose, cart }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 109,
    columnNumber: 22
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 108,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 107,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 106,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 105,
    columnNumber: 10
  }, this);
}
_s25(CartDrawer, "qWoibZqbzlhGDRlxEMM9P1NS8i8=", false, function() {
  return [useMatches];
});
_c39 = CartDrawer;
function MenuDrawer({
  isOpen,
  onClose,
  menu
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Drawer, { open: isOpen, onClose, openFrom: "left", heading: "Menu", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(MenuMobileNav, { menu, onClose }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 126,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 125,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 124,
    columnNumber: 10
  }, this);
}
_c45 = MenuDrawer;
function MenuMobileNav({
  menu,
  onClose
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("nav", { className: "grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8", children: (menu?.items || []).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("span", { className: "block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { to: item.to, target: item.target, onClick: onClose, className: ({
    isActive
  }) => isActive ? "pb-1 border-b -mb-px" : "pb-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Text, { as: "span", size: "copy", children: item.title }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 141,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 138,
    columnNumber: 11
  }, this) }, item.id, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 137,
    columnNumber: 40
  }, this)) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 135,
    columnNumber: 10
  }, this);
}
_c55 = MenuMobileNav;
function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu
}) {
  _s33();
  const params = useParams();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("header", { role: "banner", className: `${isHome ? "bg-primary" : "bg-contrast/80 text-primary"} flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex items-center justify-start w-full gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("button", { onClick: openMenu, className: "relative flex items-center justify-center w-8 h-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(IconMenu, {}, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 162,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 161,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Form, { method: "get", action: params.locale ? `/${params.locale}/search` : "/search", className: "items-center gap-2 sm:flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("button", { type: "submit", className: "relative flex items-center justify-center w-8 h-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(IconSearch, {}, void 0, false, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 166,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 165,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Input, { className: isHome ? "focus:border-contrast/20 dark:focus:border-primary/20" : "focus:border-primary/20", type: "search", variant: "minisearch", placeholder: "Search", name: "q" }, void 0, false, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 168,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 164,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 160,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { className: "flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full", to: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Heading, { className: "font-bold text-center leading-none", as: isHome ? "h1" : "h2", children: title }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 173,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 172,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex items-center justify-end w-full gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(AccountLink, { className: "relative flex items-center justify-center w-8 h-8" }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 179,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(CartCount, { isHome, openCart }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 180,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 159,
    columnNumber: 10
  }, this);
}
_s33(MobileHeader, "+jVsTcECDRo3yq2d7EQxlN9Ixog=", false, function() {
  return [useParams];
});
_c64 = MobileHeader;
function DesktopHeader({
  isHome,
  menu,
  openCart,
  title
}) {
  _s43();
  (0, import_react62.useEffect)(() => {
    customerid = localStorage.getItem("customerId");
    console.log(customerid, "LoginScreen000000000000");
  }, []);
  const params = useParams();
  const {
    y: y6
  } = useWindowScroll_default();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("header", { role: "banner", className: `${isHome ? " dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader" : "bg-contrast/80 text-primary"} ${!isHome && y6 > 50 && " shadow-lightHeader"} hidden h-nav lg:flex items-center  sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex gap-12  items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { className: "font-bold", to: "/", prefetch: "intent", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("img", { src: simply_noted_logo_default, style: {
        position: "relative",
        height: "auto",
        marginleft: "-10px"
      } }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 210,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 208,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("nav", { className: "flex gap-8 text-black flex gap-8 text-black font-karla text-17 leading-1.1  text-black-800 font-bold tracking-tight", children: (menu?.items || []).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { to: item.to, target: item.target, prefetch: "intent", className: ({
        isActive
      }) => isActive ? "pb-1 border-b -mb-px" : "pb-1", children: [
        item.title === "Send a Card" ? /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { class: "dropdown", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { children: "Send a Card" }, void 0, false, {
            fileName: "app/components/Layout.jsx",
            lineNumber: 222,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { class: "dropdown-content", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { className: "card", onClick: () => window.open("/card", "_self"), children: "Card" }, void 0, false, {
              fileName: "app/components/Layout.jsx",
              lineNumber: 227,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { children: "Item 2" }, void 0, false, {
              fileName: "app/components/Layout.jsx",
              lineNumber: 229,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { children: "Item 3" }, void 0, false, {
              fileName: "app/components/Layout.jsx",
              lineNumber: 230,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Layout.jsx",
            lineNumber: 225,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 221,
          columnNumber: 47
        }, this) : null,
        item.title === "Pricing" ? /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { class: "dropdown", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { children: "Pricing" }, void 0, false, {
            fileName: "app/components/Layout.jsx",
            lineNumber: 235,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { class: "dropdown-content", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { children: "Item 1" }, void 0, false, {
              fileName: "app/components/Layout.jsx",
              lineNumber: 239,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { children: " Item 2" }, void 0, false, {
              fileName: "app/components/Layout.jsx",
              lineNumber: 240,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { children: "Item 3" }, void 0, false, {
              fileName: "app/components/Layout.jsx",
              lineNumber: 241,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Layout.jsx",
            lineNumber: 238,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 234,
          columnNumber: 43
        }, this) : null,
        ["Send a Card", "Pricing"].includes(item.title) ? null : item.title
      ] }, item.id, true, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 218,
        columnNumber: 44
      }, this)) }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 216,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 207,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "tooltip", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("img", { src: cart_icon_default, alt: "cart-icon", style: {
          width: "40px",
          height: "38px"
        } }, void 0, false, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 253,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("span", { class: "tooltiptext", children: "Cart  " }, void 0, false, {
          fileName: "app/components/Layout.jsx",
          lineNumber: 257,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 252,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("button", { className: "request-button", type: "button", onClick: () => window.location.href = "https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb", children: "Request a Sample" }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 261,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("button", { className: "login-button", type: "button", onClick: () => window.open("/account", "_self"), children: "Login \u2192" }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 264,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 251,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 206,
    columnNumber: 10
  }, this);
}
_s43(DesktopHeader, "NYqWwJoLSSppxVVvV2Vd84h5Xd0=", false, function() {
  return [useParams, useWindowScroll_default];
});
_c74 = DesktopHeader;
function AccountLink({
  className
}) {
  _s53();
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { to: "/account", className, children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(IconAccount, {}, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 306,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 305,
    columnNumber: 23
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { to: "/account/login", className, children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(IconLogin, {}, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 308,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 307,
    columnNumber: 15
  }, this);
}
_s53(AccountLink, "qWoibZqbzlhGDRlxEMM9P1NS8i8=", false, function() {
  return [useMatches];
});
_c84 = AccountLink;
function CartCount({
  isHome,
  openCart
}) {
  _s62();
  const [root] = useMatches();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react62.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Badge, { count: 0, dark: isHome, openCart }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 321,
    columnNumber: 30
  }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Await, { resolve: root.data?.cart, children: (cart) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Badge, { dark: isHome, openCart, count: cart?.totalQuantity || 0 }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 323,
    columnNumber: 18
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 322,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 321,
    columnNumber: 10
  }, this);
}
_s62(CartCount, "qWoibZqbzlhGDRlxEMM9P1NS8i8=", false, function() {
  return [useMatches];
});
_c94 = CartCount;
function Badge({
  openCart,
  dark,
  count
}) {
  _s72();
  const isHydrated = useIsHydrated();
  const BadgeCounter = (0, import_react62.useMemo)(() => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_jsx_dev_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(IconBag, {}, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 339,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: `${dark ? "text-primary bg-contrast dark:text-contrast dark:bg-primary" : "text-contrast bg-primary"} absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("span", { children: count || 0 }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 341,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 340,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 338,
    columnNumber: 38
  }, this), [count, dark]);
  return isHydrated ? /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("button", { onClick: openCart, className: "relative flex items-center justify-center w-8 h-8 focus:ring-primary/5", children: BadgeCounter }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 344,
    columnNumber: 23
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { to: "/cart", className: "relative flex items-center justify-center w-8 h-8 focus:ring-primary/5", children: BadgeCounter }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 346,
    columnNumber: 17
  }, this);
}
_s72(Badge, "lUwpyCIoYu+6I0ekIBdhGNz3iKE=", false, function() {
  return [useIsHydrated];
});
_c104 = Badge;
function Footer({
  menu
}) {
  _s82();
  const isHome = useIsHomePath();
  const itemsCount = menu ? menu?.items?.length + 1 > 4 ? 4 : menu?.items?.length + 1 : [];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Section, { divider: isHome ? "none" : "top", as: "footer", role: "contentinfo", className: `grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(FooterMenu, { menu }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 362,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(CountrySelector, {}, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 363,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: `self-end pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`, children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " / Shopify, Inc. Hydrogen is an MIT Licensed Open Source project."
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 364,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 360,
    columnNumber: 10
  }, this);
}
_s82(Footer, "+OQD8W3zIlcI9SAdZJ2v5dssYDs=", false, function() {
  return [useIsHomePath];
});
_c114 = Footer;
function FooterLink({
  item
}) {
  if (item.to.startsWith("http")) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("a", { href: item.to, target: item.target, rel: "noopener noreferrer", children: item.title }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 378,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Link2, { to: item.to, target: item.target, prefetch: "intent", children: item.title }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 382,
    columnNumber: 10
  }, this);
}
_c124 = FooterLink;
function FooterMenu({
  menu
}) {
  const styles = {
    section: "grid gap-4",
    nav: "grid gap-2 pb-6"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_jsx_dev_runtime24.Fragment, { children: (menu?.items || []).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("section", { className: styles.section, children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(ve, { children: ({
    open
  }) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_jsx_dev_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(ve.Button, { className: "text-left md:cursor-default", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Heading, { className: "flex justify-between", size: "lead", as: "h3", children: [
      item.title,
      item?.items?.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("span", { className: "md:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(IconCaret, { direction: open ? "up" : "down" }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 404,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/Layout.jsx",
        lineNumber: 403,
        columnNumber: 49
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 401,
      columnNumber: 19
    }, this) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 400,
      columnNumber: 17
    }, this),
    item?.items?.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: `${open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`} overflow-hidden transition-all duration-300`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react62.Suspense, { "data-comment": "This suspense fixes a hydration bug in Disclosure.Panel with static prop", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(ve.Panel, { static: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("nav", { className: styles.nav, children: item.items.map((subItem) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(FooterLink, { item: subItem }, subItem.id, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 412,
      columnNumber: 54
    }, this)) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 411,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 410,
      columnNumber: 23
    }, this) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 409,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/components/Layout.jsx",
      lineNumber: 408,
      columnNumber: 44
    }, this) : null
  ] }, void 0, true, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 399,
    columnNumber: 15
  }, this) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 396,
    columnNumber: 11
  }, this) }, item.id, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 395,
    columnNumber: 40
  }, this)) }, void 0, false, {
    fileName: "app/components/Layout.jsx",
    lineNumber: 394,
    columnNumber: 10
  }, this);
}
_c133 = FooterMenu;
var _c38;
var _c214;
var _c39;
var _c45;
var _c55;
var _c64;
var _c74;
var _c84;
var _c94;
var _c104;
var _c114;
var _c124;
var _c133;
$RefreshReg$(_c38, "Layout");
$RefreshReg$(_c214, "Header");
$RefreshReg$(_c39, "CartDrawer");
$RefreshReg$(_c45, "MenuDrawer");
$RefreshReg$(_c55, "MenuMobileNav");
$RefreshReg$(_c64, "MobileHeader");
$RefreshReg$(_c74, "DesktopHeader");
$RefreshReg$(_c84, "AccountLink");
$RefreshReg$(_c94, "CartCount");
$RefreshReg$(_c104, "Badge");
$RefreshReg$(_c114, "Footer");
$RefreshReg$(_c124, "FooterLink");
$RefreshReg$(_c133, "FooterMenu");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  ve,
  Layout,
  clsx_m_default,
  Text,
  Heading,
  Section,
  PageHeader,
  Input,
  ProductGallery,
  getHeroPlaceholder,
  ProductCard,
  ProductSwimlane,
  Skeleton,
  Button,
  Cart,
  OrderCard,
  ORDER_CARD_FRAGMENT,
  AccountDetails,
  AccountAddressBook,
  Modal,
  Link2 as Link,
  FeaturedCollections,
  Hero,
  SortFilter,
  Grid,
  usePageAnalytics,
  IconClose
};
//# sourceMappingURL=/build/_shared/chunk-RXZ5BMP2.js.map
