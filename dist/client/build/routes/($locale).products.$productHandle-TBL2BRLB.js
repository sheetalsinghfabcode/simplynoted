import {
  MEDIA_FRAGMENT,
  PRODUCT_CARD_FRAGMENT
} from "/build/_shared/chunk-Y2Q63SEX.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  AddToCartButton,
  Button,
  C,
  D,
  Heading,
  I,
  I2,
  IconCaret,
  IconCheck,
  IconClose,
  Link,
  ProductGallery,
  ProductSwimlane,
  R,
  S,
  Section,
  Skeleton,
  T,
  Text,
  X,
  a,
  b,
  c,
  c2,
  clsx_m_default,
  d,
  e,
  h,
  h2,
  l,
  o,
  o2,
  o3,
  p,
  p2,
  r,
  s,
  s2,
  u,
  u2,
  ve,
  x,
  y
} from "/build/_shared/chunk-LUNXKCFQ.js";
import {
  Money,
  ShopPayButton,
  sr
} from "/build/_shared/chunk-AF6SR4PD.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-US7OM5MU.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Await,
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
import "/build/_shared/chunk-LSHG36UU.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).products.$productHandle.jsx
var import_react4 = __toESM(require_react());

// node_modules/@headlessui/react/dist/hooks/use-computed.js
var import_react = __toESM(require_react(), 1);
function i(e3, o6) {
  let [u3, t] = (0, import_react.useState)(e3), r2 = s(e3);
  return l(() => t(r2.current), [r2, t, ...o6]), u3;
}

// node_modules/@headlessui/react/dist/utils/form.js
function e2(i2 = {}, s4 = null, t = []) {
  for (let [r2, n] of Object.entries(i2))
    o4(t, f(s4, r2), n);
  return t;
}
function f(i2, s4) {
  return i2 ? i2 + "[" + s4 + "]" : s4;
}
function o4(i2, s4, t) {
  if (Array.isArray(t))
    for (let [r2, n] of t.entries())
      o4(i2, f(s4, r2.toString()), n);
  else
    t instanceof Date ? i2.push([s4, t.toISOString()]) : typeof t == "boolean" ? i2.push([s4, t ? "1" : "0"]) : typeof t == "string" ? i2.push([s4, t]) : typeof t == "number" ? i2.push([s4, `${t}`]) : t == null ? i2.push([s4, ""]) : e2(t, s4, i2);
}

// node_modules/@headlessui/react/dist/hooks/use-controllable.js
var import_react2 = __toESM(require_react(), 1);
function T2(l2, r2, c3) {
  let [i2, s4] = (0, import_react2.useState)(c3), e3 = l2 !== void 0, t = (0, import_react2.useRef)(e3), u3 = (0, import_react2.useRef)(false), d2 = (0, import_react2.useRef)(false);
  return e3 && !t.current && !u3.current ? (u3.current = true, t.current = e3, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !e3 && t.current && !d2.current && (d2.current = true, t.current = e3, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [e3 ? l2 : i2, o2((n) => (e3 || s4(n), r2 == null ? void 0 : r2(n)))];
}

// node_modules/@headlessui/react/dist/components/listbox/listbox.js
var import_react3 = __toESM(require_react(), 1);
var Be = ((n) => (n[n.Open = 0] = "Open", n[n.Closed = 1] = "Closed", n))(Be || {});
var He = ((n) => (n[n.Single = 0] = "Single", n[n.Multi = 1] = "Multi", n))(He || {});
var Ge = ((n) => (n[n.Pointer = 0] = "Pointer", n[n.Other = 1] = "Other", n))(Ge || {});
var Ne = ((i2) => (i2[i2.OpenListbox = 0] = "OpenListbox", i2[i2.CloseListbox = 1] = "CloseListbox", i2[i2.GoToOption = 2] = "GoToOption", i2[i2.Search = 3] = "Search", i2[i2.ClearSearch = 4] = "ClearSearch", i2[i2.RegisterOption = 5] = "RegisterOption", i2[i2.UnregisterOption = 6] = "UnregisterOption", i2[i2.RegisterLabel = 7] = "RegisterLabel", i2))(Ne || {});
function z(e3, a2 = (n) => n) {
  let n = e3.activeOptionIndex !== null ? e3.options[e3.activeOptionIndex] : null, r2 = I2(a2(e3.options.slice()), (t) => t.dataRef.current.domRef.current), l2 = n ? r2.indexOf(n) : null;
  return l2 === -1 && (l2 = null), { options: r2, activeOptionIndex: l2 };
}
var je = { [1](e3) {
  return e3.dataRef.current.disabled || e3.listboxState === 1 ? e3 : { ...e3, activeOptionIndex: null, listboxState: 1 };
}, [0](e3) {
  if (e3.dataRef.current.disabled || e3.listboxState === 0)
    return e3;
  let a2 = e3.activeOptionIndex, { isSelected: n } = e3.dataRef.current, r2 = e3.options.findIndex((l2) => n(l2.dataRef.current.value));
  return r2 !== -1 && (a2 = r2), { ...e3, listboxState: 0, activeOptionIndex: a2 };
}, [2](e3, a2) {
  var l2;
  if (e3.dataRef.current.disabled || e3.listboxState === 1)
    return e3;
  let n = z(e3), r2 = x(a2, { resolveItems: () => n.options, resolveActiveIndex: () => n.activeOptionIndex, resolveId: (t) => t.id, resolveDisabled: (t) => t.dataRef.current.disabled });
  return { ...e3, ...n, searchQuery: "", activeOptionIndex: r2, activationTrigger: (l2 = a2.trigger) != null ? l2 : 1 };
}, [3]: (e3, a2) => {
  if (e3.dataRef.current.disabled || e3.listboxState === 1)
    return e3;
  let r2 = e3.searchQuery !== "" ? 0 : 1, l2 = e3.searchQuery + a2.value.toLowerCase(), p3 = (e3.activeOptionIndex !== null ? e3.options.slice(e3.activeOptionIndex + r2).concat(e3.options.slice(0, e3.activeOptionIndex + r2)) : e3.options).find((i2) => {
    var b2;
    return !i2.dataRef.current.disabled && ((b2 = i2.dataRef.current.textValue) == null ? void 0 : b2.startsWith(l2));
  }), u3 = p3 ? e3.options.indexOf(p3) : -1;
  return u3 === -1 || u3 === e3.activeOptionIndex ? { ...e3, searchQuery: l2 } : { ...e3, searchQuery: l2, activeOptionIndex: u3, activationTrigger: 1 };
}, [4](e3) {
  return e3.dataRef.current.disabled || e3.listboxState === 1 || e3.searchQuery === "" ? e3 : { ...e3, searchQuery: "" };
}, [5]: (e3, a2) => {
  let n = { id: a2.id, dataRef: a2.dataRef }, r2 = z(e3, (l2) => [...l2, n]);
  return e3.activeOptionIndex === null && e3.dataRef.current.isSelected(a2.dataRef.current.value) && (r2.activeOptionIndex = r2.options.indexOf(n)), { ...e3, ...r2 };
}, [6]: (e3, a2) => {
  let n = z(e3, (r2) => {
    let l2 = r2.findIndex((t) => t.id === a2.id);
    return l2 !== -1 && r2.splice(l2, 1), r2;
  });
  return { ...e3, ...n, activationTrigger: 1 };
}, [7]: (e3, a2) => ({ ...e3, labelId: a2.id }) };
var J = (0, import_react3.createContext)(null);
J.displayName = "ListboxActionsContext";
function _(e3) {
  let a2 = (0, import_react3.useContext)(J);
  if (a2 === null) {
    let n = new Error(`<${e3} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, _), n;
  }
  return a2;
}
var q = (0, import_react3.createContext)(null);
q.displayName = "ListboxDataContext";
function U(e3) {
  let a2 = (0, import_react3.useContext)(q);
  if (a2 === null) {
    let n = new Error(`<${e3} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, U), n;
  }
  return a2;
}
function Ve(e3, a2) {
  return u(a2.type, je, e3, a2);
}
var Ke = import_react3.Fragment;
function Qe(e3, a2) {
  let { value: n, defaultValue: r2, form: l2, name: t, onChange: p3, by: u3 = (s4, c3) => s4 === c3, disabled: i2 = false, horizontal: b2 = false, multiple: R2 = false, ...m } = e3;
  const P = b2 ? "horizontal" : "vertical";
  let S2 = y(a2), [L = R2 ? [] : void 0, y2] = T2(n, p3, r2), [T3, o6] = (0, import_react3.useReducer)(Ve, { dataRef: (0, import_react3.createRef)(), listboxState: 1, options: [], searchQuery: "", labelId: null, activeOptionIndex: null, activationTrigger: 1 }), x2 = (0, import_react3.useRef)({ static: false, hold: false }), E = (0, import_react3.useRef)(null), B = (0, import_react3.useRef)(null), W = (0, import_react3.useRef)(null), C2 = o2(typeof u3 == "string" ? (s4, c3) => {
    let O = u3;
    return (s4 == null ? void 0 : s4[O]) === (c3 == null ? void 0 : c3[O]);
  } : u3), A = (0, import_react3.useCallback)((s4) => u(d2.mode, { [1]: () => L.some((c3) => C2(c3, s4)), [0]: () => C2(L, s4) }), [L]), d2 = (0, import_react3.useMemo)(() => ({ ...T3, value: L, disabled: i2, mode: R2 ? 1 : 0, orientation: P, compare: C2, isSelected: A, optionsPropsRef: x2, labelRef: E, buttonRef: B, optionsRef: W }), [L, i2, R2, T3]);
  l(() => {
    T3.dataRef.current = d2;
  }, [d2]), h2([d2.buttonRef, d2.optionsRef], (s4, c3) => {
    var O;
    o6({ type: 1 }), h(c3, T.Loose) || (s4.preventDefault(), (O = d2.buttonRef.current) == null || O.focus());
  }, d2.listboxState === 0);
  let H = (0, import_react3.useMemo)(() => ({ open: d2.listboxState === 0, disabled: i2, value: L }), [d2, i2, L]), ie = o2((s4) => {
    let c3 = d2.options.find((O) => O.id === s4);
    c3 && X2(c3.dataRef.current.value);
  }), re = o2(() => {
    if (d2.activeOptionIndex !== null) {
      let { dataRef: s4, id: c3 } = d2.options[d2.activeOptionIndex];
      X2(s4.current.value), o6({ type: 2, focus: a.Specific, id: c3 });
    }
  }), ae = o2(() => o6({ type: 0 })), le = o2(() => o6({ type: 1 })), se = o2((s4, c3, O) => s4 === a.Specific ? o6({ type: 2, focus: a.Specific, id: c3, trigger: O }) : o6({ type: 2, focus: s4, trigger: O })), pe = o2((s4, c3) => (o6({ type: 5, id: s4, dataRef: c3 }), () => o6({ type: 6, id: s4 }))), ue = o2((s4) => (o6({ type: 7, id: s4 }), () => o6({ type: 7, id: null }))), X2 = o2((s4) => u(d2.mode, { [0]() {
    return y2 == null ? void 0 : y2(s4);
  }, [1]() {
    let c3 = d2.value.slice(), O = c3.findIndex((F) => C2(F, s4));
    return O === -1 ? c3.push(s4) : c3.splice(O, 1), y2 == null ? void 0 : y2(c3);
  } })), de = o2((s4) => o6({ type: 3, value: s4 })), ce = o2(() => o6({ type: 4 })), fe = (0, import_react3.useMemo)(() => ({ onChange: X2, registerOption: pe, registerLabel: ue, goToOption: se, closeListbox: le, openListbox: ae, selectActiveOption: re, selectOption: ie, search: de, clearSearch: ce }), []), Te = { ref: S2 }, G = (0, import_react3.useRef)(null), be = p();
  return (0, import_react3.useEffect)(() => {
    G.current && r2 !== void 0 && be.addEventListener(G.current, "reset", () => {
      y2 == null || y2(r2);
    });
  }, [G, y2]), import_react3.default.createElement(J.Provider, { value: fe }, import_react3.default.createElement(q.Provider, { value: d2 }, import_react3.default.createElement(c2, { value: u(d2.listboxState, { [0]: d.Open, [1]: d.Closed }) }, t != null && L != null && e2({ [t]: L }).map(([s4, c3], O) => import_react3.default.createElement(c, { features: p2.Hidden, ref: O === 0 ? (F) => {
    var Y;
    G.current = (Y = F == null ? void 0 : F.closest("form")) != null ? Y : null;
  } : void 0, ...R({ key: s4, as: "input", type: "hidden", hidden: true, readOnly: true, form: l2, name: s4, value: c3 }) })), X({ ourProps: Te, theirProps: m, slot: H, defaultTag: Ke, name: "Listbox" }))));
}
var We = "button";
function Xe(e3, a2) {
  var y2;
  let n = I(), { id: r2 = `headlessui-listbox-button-${n}`, ...l2 } = e3, t = U("Listbox.Button"), p3 = _("Listbox.Button"), u3 = y(t.buttonRef, a2), i2 = p(), b2 = o2((T3) => {
    switch (T3.key) {
      case o3.Space:
      case o3.Enter:
      case o3.ArrowDown:
        T3.preventDefault(), p3.openListbox(), i2.nextFrame(() => {
          t.value || p3.goToOption(a.First);
        });
        break;
      case o3.ArrowUp:
        T3.preventDefault(), p3.openListbox(), i2.nextFrame(() => {
          t.value || p3.goToOption(a.Last);
        });
        break;
    }
  }), R2 = o2((T3) => {
    switch (T3.key) {
      case o3.Space:
        T3.preventDefault();
        break;
    }
  }), m = o2((T3) => {
    if (r(T3.currentTarget))
      return T3.preventDefault();
    t.listboxState === 0 ? (p3.closeListbox(), i2.nextFrame(() => {
      var o6;
      return (o6 = t.buttonRef.current) == null ? void 0 : o6.focus({ preventScroll: true });
    })) : (T3.preventDefault(), p3.openListbox());
  }), P = i(() => {
    if (t.labelId)
      return [t.labelId, r2].join(" ");
  }, [t.labelId, r2]), S2 = (0, import_react3.useMemo)(() => ({ open: t.listboxState === 0, disabled: t.disabled, value: t.value }), [t]), L = { ref: u3, id: r2, type: s2(e3, t.buttonRef), "aria-haspopup": "listbox", "aria-controls": (y2 = t.optionsRef.current) == null ? void 0 : y2.id, "aria-expanded": t.listboxState === 0, "aria-labelledby": P, disabled: t.disabled, onKeyDown: b2, onKeyUp: R2, onClick: m };
  return X({ ourProps: L, theirProps: l2, slot: S2, defaultTag: We, name: "Listbox.Button" });
}
var $e = "label";
function ze(e3, a2) {
  let n = I(), { id: r2 = `headlessui-listbox-label-${n}`, ...l2 } = e3, t = U("Listbox.Label"), p3 = _("Listbox.Label"), u3 = y(t.labelRef, a2);
  l(() => p3.registerLabel(r2), [r2]);
  let i2 = o2(() => {
    var m;
    return (m = t.buttonRef.current) == null ? void 0 : m.focus({ preventScroll: true });
  }), b2 = (0, import_react3.useMemo)(() => ({ open: t.listboxState === 0, disabled: t.disabled }), [t]);
  return X({ ourProps: { ref: u3, id: r2, onClick: i2 }, theirProps: l2, slot: b2, defaultTag: $e, name: "Listbox.Label" });
}
var Je = "ul";
var qe = S.RenderStrategy | S.Static;
function Ye(e3, a2) {
  var T3;
  let n = I(), { id: r2 = `headlessui-listbox-options-${n}`, ...l2 } = e3, t = U("Listbox.Options"), p3 = _("Listbox.Options"), u3 = y(t.optionsRef, a2), i2 = p(), b2 = p(), R2 = C(), m = (() => R2 !== null ? (R2 & d.Open) === d.Open : t.listboxState === 0)();
  (0, import_react3.useEffect)(() => {
    var x2;
    let o6 = t.optionsRef.current;
    o6 && t.listboxState === 0 && o6 !== ((x2 = e(o6)) == null ? void 0 : x2.activeElement) && o6.focus({ preventScroll: true });
  }, [t.listboxState, t.optionsRef]);
  let P = o2((o6) => {
    switch (b2.dispose(), o6.key) {
      case o3.Space:
        if (t.searchQuery !== "")
          return o6.preventDefault(), o6.stopPropagation(), p3.search(o6.key);
      case o3.Enter:
        if (o6.preventDefault(), o6.stopPropagation(), t.activeOptionIndex !== null) {
          let { dataRef: x2 } = t.options[t.activeOptionIndex];
          p3.onChange(x2.current.value);
        }
        t.mode === 0 && (p3.closeListbox(), o().nextFrame(() => {
          var x2;
          return (x2 = t.buttonRef.current) == null ? void 0 : x2.focus({ preventScroll: true });
        }));
        break;
      case u(t.orientation, { vertical: o3.ArrowDown, horizontal: o3.ArrowRight }):
        return o6.preventDefault(), o6.stopPropagation(), p3.goToOption(a.Next);
      case u(t.orientation, { vertical: o3.ArrowUp, horizontal: o3.ArrowLeft }):
        return o6.preventDefault(), o6.stopPropagation(), p3.goToOption(a.Previous);
      case o3.Home:
      case o3.PageUp:
        return o6.preventDefault(), o6.stopPropagation(), p3.goToOption(a.First);
      case o3.End:
      case o3.PageDown:
        return o6.preventDefault(), o6.stopPropagation(), p3.goToOption(a.Last);
      case o3.Escape:
        return o6.preventDefault(), o6.stopPropagation(), p3.closeListbox(), i2.nextFrame(() => {
          var x2;
          return (x2 = t.buttonRef.current) == null ? void 0 : x2.focus({ preventScroll: true });
        });
      case o3.Tab:
        o6.preventDefault(), o6.stopPropagation();
        break;
      default:
        o6.key.length === 1 && (p3.search(o6.key), b2.setTimeout(() => p3.clearSearch(), 350));
        break;
    }
  }), S2 = i(() => {
    var o6, x2, E;
    return (E = (o6 = t.labelRef.current) == null ? void 0 : o6.id) != null ? E : (x2 = t.buttonRef.current) == null ? void 0 : x2.id;
  }, [t.labelRef.current, t.buttonRef.current]), L = (0, import_react3.useMemo)(() => ({ open: t.listboxState === 0 }), [t]), y2 = { "aria-activedescendant": t.activeOptionIndex === null || (T3 = t.options[t.activeOptionIndex]) == null ? void 0 : T3.id, "aria-multiselectable": t.mode === 1 ? true : void 0, "aria-labelledby": S2, "aria-orientation": t.orientation, id: r2, onKeyDown: P, role: "listbox", tabIndex: 0, ref: u3 };
  return X({ ourProps: y2, theirProps: l2, slot: L, defaultTag: Je, features: qe, visible: m, name: "Listbox.Options" });
}
var Ze = "li";
function et(e3, a2) {
  let n = I(), { id: r2 = `headlessui-listbox-option-${n}`, disabled: l2 = false, value: t, ...p3 } = e3, u3 = U("Listbox.Option"), i2 = _("Listbox.Option"), b2 = u3.activeOptionIndex !== null ? u3.options[u3.activeOptionIndex].id === r2 : false, R2 = u3.isSelected(t), m = (0, import_react3.useRef)(null), P = b(m), S2 = s({ disabled: l2, value: t, domRef: m, get textValue() {
    return P();
  } }), L = y(a2, m);
  l(() => {
    if (u3.listboxState !== 0 || !b2 || u3.activationTrigger === 0)
      return;
    let A = o();
    return A.requestAnimationFrame(() => {
      var d2, H;
      (H = (d2 = m.current) == null ? void 0 : d2.scrollIntoView) == null || H.call(d2, { block: "nearest" });
    }), A.dispose;
  }, [m, b2, u3.listboxState, u3.activationTrigger, u3.activeOptionIndex]), l(() => i2.registerOption(r2, S2), [S2, r2]);
  let y2 = o2((A) => {
    if (l2)
      return A.preventDefault();
    i2.onChange(t), u3.mode === 0 && (i2.closeListbox(), o().nextFrame(() => {
      var d2;
      return (d2 = u3.buttonRef.current) == null ? void 0 : d2.focus({ preventScroll: true });
    }));
  }), T3 = o2(() => {
    if (l2)
      return i2.goToOption(a.Nothing);
    i2.goToOption(a.Specific, r2);
  }), o6 = u2(), x2 = o2((A) => o6.update(A)), E = o2((A) => {
    o6.wasMoved(A) && (l2 || b2 || i2.goToOption(a.Specific, r2, 0));
  }), B = o2((A) => {
    o6.wasMoved(A) && (l2 || b2 && i2.goToOption(a.Nothing));
  }), W = (0, import_react3.useMemo)(() => ({ active: b2, selected: R2, disabled: l2 }), [b2, R2, l2]);
  return X({ ourProps: { id: r2, ref: L, role: "option", tabIndex: l2 === true ? void 0 : -1, "aria-disabled": l2 === true ? true : void 0, "aria-selected": R2, disabled: void 0, onClick: y2, onFocus: T3, onPointerEnter: x2, onMouseEnter: x2, onPointerMove: E, onMouseMove: E, onPointerLeave: B, onMouseLeave: B }, theirProps: p3, slot: W, defaultTag: Ze, name: "Listbox.Option" });
}
var tt = D(Qe);
var ot = D(Xe);
var nt = D(ze);
var it = D(Ye);
var rt = D(et);
var Nt = Object.assign(tt, { Button: ot, Label: nt, Options: it, Option: rt });

// app/routes/($locale).products.$productHandle.jsx
var import_seo = __toESM(require_seo());
var import_react7 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).products.$productHandle.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).products.$productHandle.jsx"
  );
  import.meta.hot.lastModified = "1696492156349.5525";
}
function Product() {
  _s();
  const {
    product,
    shop,
    recommended,
    variants
  } = useLoaderData();
  const {
    media,
    title,
    vendor,
    descriptionHtml
  } = product;
  const {
    shippingPolicy,
    refundPolicy
  } = shop;
  const [name, setName] = (0, import_react7.useState)("");
  const onChange = (event) => {
    setName(event.target.value);
  };
  const input = document.querySelector(".inputText");
  const input2 = document.querySelector(".inputText2");
  console.log(input, "PPPPPPPPPPPPPPPPPP");
  let output = document.querySelector(".output");
  if (output) {
    output.innerHTML = "Enter your data";
  }
  const output2 = document.querySelector(".output2");
  const outputContainer = document.querySelector(".outerSec");
  const outputContainer2 = document.querySelector(".secDiv");
  function resize_to_fit() {
    let fontSize = window.getComputedStyle(output).fontSize;
    output.style.fontSize = parseFloat(fontSize) - 1 + "px";
    console.log(output.clientHeight, "------------", outputContainer.clientHeight);
    if (output.clientHeight >= outputContainer.clientHeight) {
      resize_to_fit();
    }
  }
  async function processInput() {
    console.log(input, "PPPPPPPPPPPPPPPPPPPPPPPPPPP");
    output.innerHTML = await this.value ? this.value : "Enter Your data";
    output.style.fontSize = "70px";
    resize_to_fit();
  }
  if (input) {
    input.addEventListener("input", processInput);
  }
  function resize_to_fit2() {
    let fontSize = window.getComputedStyle(output2).fontSize;
    output2.style.fontSize = parseFloat(fontSize) - 1 + "px";
    console.log(output2.clientHeight, "------------", outputContainer2.clientHeight);
    if (output2.clientHeight >= outputContainer2.clientHeight) {
      resize_to_fit2();
    }
  }
  async function processInput2() {
    output2.innerHTML = await this.value;
    output2.style.fontSize = "70px";
    resize_to_fit2();
  }
  if (input2) {
    input2.addEventListener("input", processInput2);
  }
  function setFont() {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
    var selectFont = document.getElementById("font");
    if (selectFont) {
      var selectFontValue = selectFont.options[selectFont.selectedIndex].value;
      console.log(selectFontValue, "==========");
      if (selectFontValue) {
        document.getElementById("abcd").style.fontFamily = selectFontValue;
        document.getElementById("abcd2").style.fontFamily = selectFontValue;
      }
    }
  }
  const ref = (0, import_react4.useRef)(null);
  (0, import_react7.useEffect)(() => {
    const element = ref.current;
    console.log(element, "refElement");
    console.log(element.id);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { className: "px-0 md:px-8 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductGallery, { media: media.nodes, className: "w-full lg:col-span-2" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 227,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "h1", className: "whitespace-normal", children: title }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 231,
              columnNumber: 17
            }, this),
            vendor && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { className: "opacity-50 font-medium", children: vendor }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 234,
              columnNumber: 28
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 230,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react4.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductForm, { variants: [] }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 236,
            columnNumber: 35
          }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { errorElement: "There was a problem loading related products", resolve: variants, children: (resp) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductForm, { variants: resp.product?.variants.nodes || [] }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 238,
            columnNumber: 28
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 237,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 236,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 229,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 228,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {}, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 271,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 226,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mainDivForBox flex gap-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "outer", className: "outerr", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "outerSec", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd", className: "output" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 289,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 288,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "secDiv", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd2", className: "output2" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 293,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 292,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 287,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "textAreaView w-[600px]", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "selectOtion mb-5 ", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Standard Handwriting Style" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 300,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "font", onClick: () => setFont(), children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "pinocchio", className: `font-pinocchio`, children: "Pinocchio" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 302,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "tarzan", className: `font-tarzan`, children: "Tarzan" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 303,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "stitch", className: `font-stitch`, children: "Stitch" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 304,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "simba", className: `font-simba`, children: "Simba" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 305,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "roo", className: `font-roo`, children: "Roo" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 306,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "nimo", className: `font-nimo`, children: "Nimo" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 307,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "lumiere", className: `font-lumiere`, children: "Lumiere" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 308,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "kaa", className: `font-kaa`, children: "Kaa" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 309,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "kaaNew", className: `font-kaaNew`, children: "KaaNew" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 310,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "dumbo", className: `font-dumbo`, children: "Dumbo" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 311,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "donald", className: `font-donald`, children: "Donald" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 312,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "aladdin", className: `font-aladdin`, children: "Aladdin" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 313,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "belle", className: `font-belle`, children: "Belle" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 314,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "boo", className: `font-boo`, children: "Boo" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 315,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "cinderella", className: `font-cinderella`, children: "Cinderella" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 316,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "copper", className: `font-copper`, children: "Copper" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 317,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "jasmine", className: `font-jasmine`, children: "Jasmine" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 318,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "merlin", className: `font-merlin`, children: "Merlin" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 319,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "goofy", className: `font-goofy`, children: "Goofy" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 320,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "hercules", className: `font-hercules`, children: "Hercules" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 321,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rafiki", className: `font-rafiki`, children: "Rafiki" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 322,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rapunzel", className: `font-rapunzel`, children: "Rapunzel" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 323,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "ratigan", className: `font-ratigan`, children: "Ratigan" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 324,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "sarabi", className: `font-sarabi`, children: "Sarabi" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 325,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "scar", className: `font-scar`, children: "Scar" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 326,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "triton", className: `font-triton`, children: "Triton" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 327,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "woody", className: `font-woody`, children: "Woody" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 328,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 301,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 299,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input", ref, className: "inputText", maxlength: "450", placeholder: "Enter your custom message text here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 332,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input2", className: "inputText2", maxlength: "24", placeholder: "Enter here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 333,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 298,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 286,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 225,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react4.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-32" }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 364,
      columnNumber: 27
    }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Await, { errorElement: "There was a problem loading related products", resolve: recommended, children: (products) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductSwimlane, { title: "Related Products", products }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 366,
      columnNumber: 24
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 365,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 364,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 224,
    columnNumber: 10
  }, this);
}
_s(Product, "YV/Wtc+R/MNqaSC7RpdnPChcM3o=", false, function() {
  return [useLoaderData];
});
_c = Product;
function ProductForm({
  variants
}) {
  _s2();
  const {
    product,
    analytics,
    storeDomain
  } = useLoaderData();
  const closeRef = (0, import_react4.useRef)(null);
  const selectedVariant = product.selectedVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;
  const isOnSale = selectedVariant?.price?.amount && selectedVariant?.compareAtPrice?.amount && selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;
  const productAnalytics = {
    ...analytics.products[0],
    quantity: 1
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(sr, { handle: product.handle, options: product.options, variants, children: ({
      option
    }) => {
      console.log(option, "+++++++++++++++++++=");
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heading, { as: "legend", size: "lead", className: "min-w-[4rem]", children: option.name }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 406,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap items-baseline gap-4", children: option.values.length > 7 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nt, { children: ({
          open
        }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nt.Button, { ref: closeRef, className: clsx_m_default("flex items-center justify-between w-full py-3 px-4 border border-primary", open ? "rounded-b md:rounded-t md:rounded-b-none" : "rounded"), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: option.value }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 416,
              columnNumber: 31
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCaret, { direction: open ? "up" : "down" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 417,
              columnNumber: 31
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 415,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nt.Options, { className: clsx_m_default("border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b", open ? "max-h-48" : "max-h-0"), children: option.values.filter((value) => value.isAvailable).map(({
            value,
            to,
            isActive
          }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nt.Option, { value, children: ({
            active
          }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to, className: clsx_m_default("text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer", active && "bg-primary/10"), onClick: () => {
            if (!closeRef?.current)
              return;
            closeRef.current.click();
          }, children: [
            value,
            isActive && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, {}, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 433,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 432,
              columnNumber: 54
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 427,
            columnNumber: 31
          }, this) }, `option-${option.name}-${value}`, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 424,
            columnNumber: 29
          }, this)) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 419,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 414,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 411,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 410,
          columnNumber: 47
        }, this) : option.values.map(({
          value,
          isAvailable,
          isActive,
          to
        }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to, preventScrollReset: true, prefetch: "intent", replace: true, className: clsx_m_default("leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200", isActive ? "border-primary/50" : "border-primary/0", isAvailable ? "opacity-100" : "opacity-50"), children: value }, option.name + value, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 445,
          columnNumber: 21
        }, this)) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 409,
          columnNumber: 17
        }, this)
      ] }, option.name, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 405,
        columnNumber: 18
      }, this);
    } }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 400,
      columnNumber: 9
    }, this),
    selectedVariant && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid items-stretch gap-4", children: [
      isOutOfStock ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "secondary", disabled: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Sold out" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 454,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 453,
        columnNumber: 29
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AddToCartButton, { lines: [{
        merchandiseId: selectedVariant.id,
        quantity: 1
      }], variant: "primary", "data-test": "add-to-cart", analytics: {
        products: [productAnalytics],
        totalValue: parseFloat(productAnalytics.price)
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "span", className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Add to Cart" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 463,
          columnNumber: 19
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xB7" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 463,
          columnNumber: 44
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { withoutTrailingZeros: true, data: selectedVariant?.price, as: "span" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 464,
          columnNumber: 19
        }, this),
        isOnSale && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Money, { withoutTrailingZeros: true, data: selectedVariant?.compareAtPrice, as: "span", className: "opacity-50 strike" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 465,
          columnNumber: 32
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 462,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 455,
        columnNumber: 27
      }, this),
      !isOutOfStock && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShopPayButton, { width: "100%", variantIds: [selectedVariant?.id], storeDomain }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 468,
        columnNumber: 31
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 452,
      columnNumber: 29
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 399,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 398,
    columnNumber: 10
  }, this);
}
_s2(ProductForm, "3cj5+dbbRovHTdu/bTp/vT14Nt8=", false, function() {
  return [useLoaderData];
});
_c2 = ProductForm;
function ProductDetail({
  title,
  content,
  learnMore
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve, { as: "div", className: "grid w-full gap-2", children: ({
    open
  }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve.Button, { className: "text-left", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "lead", as: "h4", children: title }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 488,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconClose, { className: clsx_m_default("transition-transform transform-gpu duration-200", !open && "rotate-[45deg]") }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 491,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 487,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 486,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ve.Panel, { className: "pb-4 pt-2 grid gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "prose dark:prose-invert", dangerouslySetInnerHTML: {
        __html: content
      } }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 496,
        columnNumber: 13
      }, this),
      learnMore && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "pb-px border-b border-primary/30 text-primary/50", to: learnMore, children: "Learn more" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 500,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 499,
        columnNumber: 27
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 495,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 485,
    columnNumber: 11
  }, this) }, title, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 482,
    columnNumber: 10
  }, this);
}
_c3 = ProductDetail;
var PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;
var PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;
var VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
var RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "Product");
$RefreshReg$(_c2, "ProductForm");
$RefreshReg$(_c3, "ProductDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Product as default
};
//# sourceMappingURL=/build/routes/($locale).products.$productHandle-TBL2BRLB.js.map
