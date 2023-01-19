var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));

// node_modules/@turbo-boost/commands/app/assets/builds/@turbo-boost/commands.js
var Xr = Object.defineProperty;
var Jr = Object.defineProperties;
var Zr = Object.getOwnPropertyDescriptors;
var nn = Object.getOwnPropertySymbols;
var Yr = Object.prototype.hasOwnProperty;
var Gr = Object.prototype.propertyIsEnumerable;
var rn = (e, t, n) => t in e ? Xr(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var b = (e, t) => {
  for (var n in t || (t = {}))
    Yr.call(t, n) && rn(e, n, t[n]);
  if (nn)
    for (var n of nn(t))
      Gr.call(t, n) && rn(e, n, t[n]);
  return e;
};
var B = (e, t) => Jr(e, Zr(t));
var Qr = Object.defineProperty;
var eo = Object.defineProperties;
var to = Object.getOwnPropertyDescriptors;
var on = Object.getOwnPropertySymbols;
var no = Object.prototype.hasOwnProperty;
var ro = Object.prototype.propertyIsEnumerable;
var ft = (e, t, n) => t in e ? Qr(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var Be = (e, t) => {
  for (var n in t || (t = {}))
    no.call(t, n) && ft(e, n, t[n]);
  if (on)
    for (var n of on(t))
      ro.call(t, n) && ft(e, n, t[n]);
  return e;
};
var oo = (e, t) => eo(e, to(t));
var an = (e, t, n) => (ft(e, typeof t != "symbol" ? t + "" : t, n), n);
function io(e, t, n = {}) {
  let r = new CustomEvent(t, n);
  e.forEach((o) => o.dispatchEvent(r));
}
var ao = io;
var mt = false;
var pt = false;
var ne = [];
function so(e) {
  lo(e);
}
function lo(e) {
  ne.includes(e) || ne.push(e), uo();
}
function pn(e) {
  let t = ne.indexOf(e);
  t !== -1 && ne.splice(t, 1);
}
function uo() {
  !pt && !mt && (mt = true, queueMicrotask(co));
}
function co() {
  mt = false, pt = true;
  for (let e = 0; e < ne.length; e++)
    ne[e]();
  ne.length = 0, pt = false;
}
var pe;
var Se;
var ze;
var hn;
var ht = true;
function fo(e) {
  ht = false, e(), ht = true;
}
function mo(e) {
  pe = e.reactive, ze = e.release, Se = (t) => e.effect(t, { scheduler: (n) => {
    ht ? so(n) : n();
  } }), hn = e.raw;
}
function sn(e) {
  Se = e;
}
function po(e) {
  let t = () => {
  };
  return [(n) => {
    let r = Se(n);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((o) => o());
    }), e._x_effects.add(r), t = () => {
      r !== void 0 && (e._x_effects.delete(r), ze(r));
    }, r;
  }, () => {
    t();
  }];
}
var _n = [];
var vn = [];
var gn = [];
function ho(e) {
  gn.push(e);
}
function bn(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, vn.push(t));
}
function _o(e) {
  _n.push(e);
}
function vo(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function xn(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((o) => o()), delete e._x_attributeCleanups[n]);
  });
}
var Ot = new MutationObserver(Lt);
var Tt = false;
function yn() {
  Ot.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true }), Tt = true;
}
function go() {
  bo(), Ot.disconnect(), Tt = false;
}
var we = [];
var lt = false;
function bo() {
  we = we.concat(Ot.takeRecords()), we.length && !lt && (lt = true, queueMicrotask(() => {
    xo(), lt = false;
  }));
}
function xo() {
  Lt(we), we.length = 0;
}
function C(e) {
  if (!Tt)
    return e();
  go();
  let t = e();
  return yn(), t;
}
var $t = false;
var De = [];
function yo() {
  $t = true;
}
function wo() {
  $t = false, Lt(De), De = [];
}
function Lt(e) {
  if ($t) {
    De = De.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.length; i++)
    if (!e[i].target._x_ignoreMutationObserver && (e[i].type === "childList" && (e[i].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)), e[i].removedNodes.forEach((a) => a.nodeType === 1 && n.push(a))), e[i].type === "attributes")) {
      let a = e[i].target, s = e[i].attributeName, l = e[i].oldValue, u = () => {
        r.has(a) || r.set(a, []), r.get(a).push({ name: s, value: a.getAttribute(s) });
      }, d = () => {
        o.has(a) || o.set(a, []), o.get(a).push(s);
      };
      a.hasAttribute(s) && l === null ? u() : a.hasAttribute(s) ? (d(), u()) : d();
    }
  o.forEach((i, a) => {
    xn(a, i);
  }), r.forEach((i, a) => {
    _n.forEach((s) => s(a, i));
  });
  for (let i of n)
    if (!t.includes(i) && (vn.forEach((a) => a(i)), i._x_cleanups))
      for (; i._x_cleanups.length; )
        i._x_cleanups.pop()();
  t.forEach((i) => {
    i._x_ignoreSelf = true, i._x_ignore = true;
  });
  for (let i of t)
    n.includes(i) || i.isConnected && (delete i._x_ignoreSelf, delete i._x_ignore, gn.forEach((a) => a(i)), i._x_ignore = true, i._x_ignoreSelf = true);
  t.forEach((i) => {
    delete i._x_ignoreSelf, delete i._x_ignore;
  }), t = null, n = null, r = null, o = null;
}
function wn(e) {
  return Oe(de(e));
}
function Ce(e, t, n) {
  return e._x_dataStack = [t, ...de(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function ln(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, o]) => {
    n[r] = o;
  });
}
function de(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? de(e.host) : e.parentNode ? de(e.parentNode) : [];
}
function Oe(e) {
  let t = new Proxy({}, { ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))), has: (n, r) => e.some((o) => o.hasOwnProperty(r)), get: (n, r) => (e.find((o) => {
    if (o.hasOwnProperty(r)) {
      let i = Object.getOwnPropertyDescriptor(o, r);
      if (i.get && i.get._x_alreadyBound || i.set && i.set._x_alreadyBound)
        return true;
      if ((i.get || i.set) && i.enumerable) {
        let a = i.get, s = i.set, l = i;
        a = a && a.bind(t), s = s && s.bind(t), a && (a._x_alreadyBound = true), s && (s._x_alreadyBound = true), Object.defineProperty(o, r, oo(Be({}, l), { get: a, set: s }));
      }
      return true;
    }
    return false;
  }) || {})[r], set: (n, r, o) => {
    let i = e.find((a) => a.hasOwnProperty(r));
    return i ? i[r] = o : e[e.length - 1][r] = o, true;
  } });
  return t;
}
function En(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, o = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([i, { value: a, enumerable: s }]) => {
      if (s === false || a === void 0)
        return;
      let l = o === "" ? i : `${o}.${i}`;
      typeof a == "object" && a !== null && a._x_interceptor ? r[i] = a.initialize(e, l, i) : t(a) && a !== r && !(a instanceof Element) && n(a, l);
    });
  };
  return n(e);
}
function kn(e, t = () => {
}) {
  let n = { initialValue: void 0, _x_interceptor: true, initialize(r, o, i) {
    return e(this.initialValue, () => Eo(r, o), (a) => An(r, o, a), o, i);
  } };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let o = n.initialize.bind(n);
      n.initialize = (i, a, s) => {
        let l = r.initialize(i, a, s);
        return n.initialValue = l, o(i, a, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function Eo(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function An(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), An(e[t[0]], t.slice(1), n);
  }
}
var Sn = {};
function z(e, t) {
  Sn[e] = t;
}
function _t(e, t) {
  return Object.entries(Sn).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, { get() {
      let [o, i] = Nn(t);
      return o = Be({ interceptor: kn }, o), bn(t, i), r(t, o);
    }, enumerable: false });
  }), e;
}
function ko(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (o) {
    Ae(o, e, t);
  }
}
function Ae(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var Re = true;
function Ao(e) {
  let t = Re;
  Re = false, e(), Re = t;
}
function ce(e, t, n = {}) {
  let r;
  return $(e, t)((o) => r = o, n), r;
}
function $(...e) {
  return Cn(...e);
}
var Cn = On;
function So(e) {
  Cn = e;
}
function On(e, t) {
  let n = {};
  _t(n, e);
  let r = [n, ...de(e)];
  if (typeof t == "function")
    return Co(r, t);
  let o = To(r, t, e);
  return ko.bind(null, e, t, o);
}
function Co(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: o = [] } = {}) => {
    let i = t.apply(Oe([r, ...e]), o);
    Ie(n, i);
  };
}
var ut = {};
function Oo(e, t) {
  if (ut[e])
    return ut[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, o = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (i) {
      return Ae(i, t, e), Promise.resolve();
    }
  })();
  return ut[e] = o, o;
}
function To(e, t, n) {
  let r = Oo(t, n);
  return (o = () => {
  }, { scope: i = {}, params: a = [] } = {}) => {
    r.result = void 0, r.finished = false;
    let s = Oe([i, ...e]);
    if (typeof r == "function") {
      let l = r(r, s).catch((u) => Ae(u, n, t));
      r.finished ? (Ie(o, r.result, s, a, n), r.result = void 0) : l.then((u) => {
        Ie(o, u, s, a, n);
      }).catch((u) => Ae(u, n, t)).finally(() => r.result = void 0);
    }
  };
}
function Ie(e, t, n, r, o) {
  if (Re && typeof t == "function") {
    let i = t.apply(n, r);
    i instanceof Promise ? i.then((a) => Ie(e, a, n, r)).catch((a) => Ae(a, o, t)) : e(i);
  } else
    e(t);
}
var Nt = "x-";
function he(e = "") {
  return Nt + e;
}
function $o(e) {
  Nt = e;
}
var Tn = {};
function k(e, t) {
  Tn[e] = t;
}
function jt(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let o = Object.entries(e._x_virtualDirectives).map(([a, s]) => ({ name: a, value: s })), i = $n(o);
    o = o.map((a) => i.find((s) => s.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a), t = t.concat(o);
  }
  let r = {};
  return t.map(Mn((o, i) => r[o] = i)).filter(Bn).map(jo(r, n)).sort(Po).map((o) => No(e, o));
}
function $n(e) {
  return Array.from(e).map(Mn()).filter((t) => !Bn(t));
}
var vt = false;
var ye = /* @__PURE__ */ new Map();
var Ln = Symbol();
function Lo(e) {
  vt = true;
  let t = Symbol();
  Ln = t, ye.set(t, []);
  let n = () => {
    for (; ye.get(t).length; )
      ye.get(t).shift()();
    ye.delete(t);
  }, r = () => {
    vt = false, n();
  };
  e(n), r();
}
function Nn(e) {
  let t = [], n = (i) => t.push(i), [r, o] = po(e);
  return t.push(o), [{ Alpine: Te, effect: r, cleanup: n, evaluateLater: $.bind($, e), evaluate: ce.bind(ce, e) }, () => t.forEach((i) => i())];
}
function No(e, t) {
  let n = () => {
  }, r = Tn[t.type] || n, [o, i] = Nn(e);
  vo(e, t.original, i);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, o), r = r.bind(r, e, t, o), vt ? ye.get(Ln).push(r) : r());
  };
  return a.runCleanups = i, a;
}
var jn = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r });
var Pn = (e) => e;
function Mn(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: o } = Rn.reduce((i, a) => a(i), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: o };
  };
}
var Rn = [];
function Pt(e) {
  Rn.push(e);
}
function Bn({ name: e }) {
  return Dn().test(e);
}
var Dn = () => new RegExp(`^${Nt}([^:^.]+)\\b`);
function jo(e, t) {
  return ({ name: n, value: r }) => {
    let o = n.match(Dn()), i = n.match(/:([a-zA-Z0-9\-:]+)/), a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[n] || n;
    return { type: o ? o[1] : null, value: i ? i[1] : null, modifiers: a.map((l) => l.replace(".", "")), expression: r, original: s };
  };
}
var gt = "DEFAULT";
var Pe = ["ignore", "ref", "data", "id", "radio", "tabs", "switch", "disclosure", "menu", "listbox", "list", "item", "combobox", "bind", "init", "for", "mask", "model", "modelable", "transition", "show", "if", gt, "teleport"];
function Po(e, t) {
  let n = Pe.indexOf(e.type) === -1 ? gt : e.type, r = Pe.indexOf(t.type) === -1 ? gt : t.type;
  return Pe.indexOf(n) - Pe.indexOf(r);
}
function Ee(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: true, composed: true, cancelable: true }));
}
var bt = [];
var Mt = false;
function In(e = () => {
}) {
  return queueMicrotask(() => {
    Mt || setTimeout(() => {
      xt();
    });
  }), new Promise((t) => {
    bt.push(() => {
      e(), t();
    });
  });
}
function xt() {
  for (Mt = false; bt.length; )
    bt.shift()();
}
function Mo() {
  Mt = true;
}
function ie(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((o) => ie(o, t));
    return;
  }
  let n = false;
  if (t(e, () => n = true), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    ie(r, t, false), r = r.nextElementSibling;
}
function fe(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function Ro() {
  document.body || fe("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), Ee(document, "alpine:init"), Ee(document, "alpine:initializing"), yn(), ho((t) => Z(t, ie)), bn((t) => Do(t)), _o((t, n) => {
    jt(t, n).forEach((r) => r());
  });
  let e = (t) => !Fe(t.parentElement, true);
  Array.from(document.querySelectorAll(Fn())).filter(e).forEach((t) => {
    Z(t);
  }), Ee(document, "alpine:initialized");
}
var Rt = [];
var qn = [];
function zn() {
  return Rt.map((e) => e());
}
function Fn() {
  return Rt.concat(qn).map((e) => e());
}
function Hn(e) {
  Rt.push(e);
}
function Vn(e) {
  qn.push(e);
}
function Fe(e, t = false) {
  return He(e, (n) => {
    if ((t ? Fn() : zn()).some((r) => n.matches(r)))
      return true;
  });
}
function He(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return He(e.parentElement, t);
  }
}
function Bo(e) {
  return zn().some((t) => e.matches(t));
}
function Z(e, t = ie) {
  Lo(() => {
    t(e, (n, r) => {
      jt(n, n.attributes).forEach((o) => o()), n._x_ignore && r();
    });
  });
}
function Do(e) {
  ie(e, (t) => xn(t));
}
function Bt(e, t) {
  return Array.isArray(t) ? un(e, t.join(" ")) : typeof t == "object" && t !== null ? Io(e, t) : typeof t == "function" ? Bt(e, t()) : un(e, t);
}
function un(e, t) {
  let n = (i) => i.split(" ").filter(Boolean), r = (i) => i.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), o = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === true ? t = "" : t || "", o(r(t));
}
function Io(e, t) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([s, l]) => l ? n(s) : false).filter(Boolean), o = Object.entries(t).flatMap(([s, l]) => l ? false : n(s)).filter(Boolean), i = [], a = [];
  return o.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), a.push(s));
  }), r.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), i.push(s));
  }), () => {
    a.forEach((s) => e.classList.add(s)), i.forEach((s) => e.classList.remove(s));
  };
}
function Ve(e, t) {
  return typeof t == "object" && t !== null ? qo(e, t) : zo(e, t);
}
function qo(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, o]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = Fo(r)), e.style.setProperty(r, o);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    Ve(e, n);
  };
}
function zo(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function Fo(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function yt(e, t = () => {
}) {
  let n = false;
  return function() {
    n ? t.apply(this, arguments) : (n = true, e.apply(this, arguments));
  };
}
k("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: o }) => {
  typeof r == "function" && (r = o(r)), r ? Ho(e, r, t) : Vo(e, n, t);
});
function Ho(e, t, n) {
  Wn(e, Bt, ""), { enter: (r) => {
    e._x_transition.enter.during = r;
  }, "enter-start": (r) => {
    e._x_transition.enter.start = r;
  }, "enter-end": (r) => {
    e._x_transition.enter.end = r;
  }, leave: (r) => {
    e._x_transition.leave.during = r;
  }, "leave-start": (r) => {
    e._x_transition.leave.start = r;
  }, "leave-end": (r) => {
    e._x_transition.leave.end = r;
  } }[n](t);
}
function Vo(e, t, n) {
  Wn(e, Ve);
  let r = !t.includes("in") && !t.includes("out") && !n, o = r || t.includes("in") || ["enter"].includes(n), i = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((v, y) => y < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((v, y) => y > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), s = a || t.includes("opacity"), l = a || t.includes("scale"), u = s ? 0 : 1, d = l ? be(t, "scale", 95) / 100 : 1, p = be(t, "delay", 0), g = be(t, "origin", "center"), M = "opacity, transform", E = be(t, "duration", 150) / 1e3, le = be(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  o && (e._x_transition.enter.during = { transformOrigin: g, transitionDelay: p, transitionProperty: M, transitionDuration: `${E}s`, transitionTimingFunction: f }, e._x_transition.enter.start = { opacity: u, transform: `scale(${d})` }, e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" }), i && (e._x_transition.leave.during = { transformOrigin: g, transitionDelay: p, transitionProperty: M, transitionDuration: `${le}s`, transitionTimingFunction: f }, e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, e._x_transition.leave.end = { opacity: u, transform: `scale(${d})` });
}
function Wn(e, t, n = {}) {
  e._x_transition || (e._x_transition = { enter: { during: n, start: n, end: n }, leave: { during: n, start: n, end: n }, in(r = () => {
  }, o = () => {
  }) {
    wt(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, r, o);
  }, out(r = () => {
  }, o = () => {
  }) {
    wt(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, r, o);
  } });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  let o = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout, i = () => o(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : i() : e._x_transition ? e._x_transition.in(n) : i();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((a, s) => {
    e._x_transition.out(() => {
    }, () => a(r)), e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: true }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let a = Un(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : o(() => {
      let s = (l) => {
        let u = Promise.all([l._x_hidePromise, ...(l._x_hideChildren || []).map(s)]).then(([d]) => d());
        return delete l._x_hidePromise, delete l._x_hideChildren, u;
      };
      s(e).catch((l) => {
        if (!l.isFromCancelledTransition)
          throw l;
      });
    });
  });
};
function Un(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Un(t);
}
function wt(e, t, { during: n, start: r, end: o } = {}, i = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(o).length === 0) {
    i(), a();
    return;
  }
  let s, l, u;
  Wo(e, { start() {
    s = t(e, r);
  }, during() {
    l = t(e, n);
  }, before: i, end() {
    s(), u = t(e, o);
  }, after: a, cleanup() {
    l(), u();
  } });
}
function Wo(e, t) {
  let n, r, o, i = yt(() => {
    C(() => {
      n = true, r || t.before(), o || (t.end(), xt()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = { beforeCancels: [], beforeCancel(a) {
    this.beforeCancels.push(a);
  }, cancel: yt(function() {
    for (; this.beforeCancels.length; )
      this.beforeCancels.shift()();
    i();
  }), finish: i }, C(() => {
    t.start(), t.during();
  }), Mo(), requestAnimationFrame(() => {
    if (n)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), C(() => {
      t.before();
    }), r = true, requestAnimationFrame(() => {
      n || (C(() => {
        t.end();
      }), xt(), setTimeout(e._x_transitioning.finish, a + s), o = true);
    });
  });
}
function be(e, t, n) {
  if (e.indexOf(t) === -1)
    return n;
  let r = e[e.indexOf(t) + 1];
  if (!r || t === "scale" && isNaN(r))
    return n;
  if (t === "duration") {
    let o = r.match(/([0-9]+)ms/);
    if (o)
      return o[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var Et = false;
function We(e, t = () => {
}) {
  return (...n) => Et ? t(...n) : e(...n);
}
function Uo(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Et = true, Xo(() => {
    Ko(t);
  }), Et = false;
}
function Ko(e) {
  let t = false;
  Z(e, (n, r) => {
    ie(n, (o, i) => {
      if (t && Bo(o))
        return i();
      t = true, r(o, i);
    });
  });
}
function Xo(e) {
  let t = Se;
  sn((n, r) => {
    let o = t(n);
    return ze(o), () => {
    };
  }), e(), sn(t);
}
function Kn(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = pe({})), e._x_bindings[t] = n, t = r.includes("camel") ? ti(t) : t, t) {
    case "value":
      Jo(e, n);
      break;
    case "style":
      Yo(e, n);
      break;
    case "class":
      Zo(e, n);
      break;
    default:
      Go(e, t, n);
      break;
  }
}
function Jo(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = cn(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => cn(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    ei(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function Zo(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Bt(e, t);
}
function Yo(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = Ve(e, t);
}
function Go(e, t, n) {
  [null, void 0, false].includes(n) && ni(t) ? e.removeAttribute(t) : (Xn(t) && (n = t), Qo(e, t, n));
}
function Qo(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function ei(e, t) {
  let n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function ti(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function cn(e, t) {
  return e == t;
}
function Xn(e) {
  return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e);
}
function ni(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function ri(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? true : Xn(t) ? !![t, "true"].includes(r) : r;
}
function Jn(e, t) {
  var n;
  return function() {
    var r = this, o = arguments, i = function() {
      n = null, e.apply(r, o);
    };
    clearTimeout(n), n = setTimeout(i, t);
  };
}
function Zn(e, t) {
  let n;
  return function() {
    let r = this, o = arguments;
    n || (e.apply(r, o), n = true, setTimeout(() => n = false, t));
  };
}
function oi(e) {
  e(Te);
}
var te = {};
var dn = false;
function ii(e, t) {
  if (dn || (te = pe(te), dn = true), t === void 0)
    return te[e];
  te[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && te[e].init(), En(te[e]);
}
function ai() {
  return te;
}
var Yn = {};
function si(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? Gn(e, n()) : Yn[e] = n;
}
function li(e) {
  return Object.entries(Yn).forEach(([t, n]) => {
    Object.defineProperty(e, t, { get() {
      return (...r) => n(...r);
    } });
  }), e;
}
function Gn(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let o = Object.entries(t).map(([a, s]) => ({ name: a, value: s })), i = $n(o);
  o = o.map((a) => i.find((s) => s.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a), jt(e, o, n).map((a) => {
    r.push(a.runCleanups), a();
  });
}
var Qn = {};
function ui(e, t) {
  Qn[e] = t;
}
function ci(e, t) {
  return Object.entries(Qn).forEach(([n, r]) => {
    Object.defineProperty(e, n, { get() {
      return (...o) => r.bind(t)(...o);
    }, enumerable: false });
  }), e;
}
var di = { get reactive() {
  return pe;
}, get release() {
  return ze;
}, get effect() {
  return Se;
}, get raw() {
  return hn;
}, version: "3.10.5", flushAndStopDeferringMutations: wo, dontAutoEvaluateFunctions: Ao, disableEffectScheduling: fo, setReactivityEngine: mo, closestDataStack: de, skipDuringClone: We, addRootSelector: Hn, addInitSelector: Vn, addScopeToNode: Ce, deferMutations: yo, mapAttributes: Pt, evaluateLater: $, setEvaluator: So, mergeProxies: Oe, findClosest: He, closestRoot: Fe, interceptor: kn, transition: wt, setStyles: Ve, mutateDom: C, directive: k, throttle: Zn, debounce: Jn, evaluate: ce, initTree: Z, nextTick: In, prefixed: he, prefix: $o, plugin: oi, magic: z, store: ii, start: Ro, clone: Uo, bound: ri, $data: wn, data: ui, bind: si };
var Te = di;
function er(e, t) {
  let n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = true;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
var fi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
var Fa = er(fi + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
var mi = Object.freeze({});
var Ha = Object.freeze([]);
var tr = Object.assign;
var pi = Object.prototype.hasOwnProperty;
var Ue = (e, t) => pi.call(e, t);
var re = Array.isArray;
var ke = (e) => nr(e) === "[object Map]";
var hi = (e) => typeof e == "string";
var Dt = (e) => typeof e == "symbol";
var Ke = (e) => e !== null && typeof e == "object";
var _i = Object.prototype.toString;
var nr = (e) => _i.call(e);
var rr = (e) => nr(e).slice(8, -1);
var It = (e) => hi(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
var Xe = (e) => {
  let t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
};
var vi = /-(\w)/g;
var Va = Xe((e) => e.replace(vi, (t, n) => n ? n.toUpperCase() : ""));
var gi = /\B([A-Z])/g;
var Wa = Xe((e) => e.replace(gi, "-$1").toLowerCase());
var or = Xe((e) => e.charAt(0).toUpperCase() + e.slice(1));
var Ua = Xe((e) => e ? `on${or(e)}` : "");
var ir = (e, t) => e !== t && (e === e || t === t);
var kt = /* @__PURE__ */ new WeakMap();
var xe = [];
var V;
var oe = Symbol("iterate");
var At = Symbol("Map key iterate");
function bi(e) {
  return e && e._isEffect === true;
}
function xi(e, t = mi) {
  bi(e) && (e = e.raw);
  let n = Ei(e, t);
  return t.lazy || n(), n;
}
function yi(e) {
  e.active && (ar(e), e.options.onStop && e.options.onStop(), e.active = false);
}
var wi = 0;
function Ei(e, t) {
  let n = function() {
    if (!n.active)
      return e();
    if (!xe.includes(n)) {
      ar(n);
      try {
        return Ai(), xe.push(n), V = n, e();
      } finally {
        xe.pop(), sr(), V = xe[xe.length - 1];
      }
    }
  };
  return n.id = wi++, n.allowRecurse = !!t.allowRecurse, n._isEffect = true, n.active = true, n.raw = e, n.deps = [], n.options = t, n;
}
function ar(e) {
  let { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var me = true;
var qt = [];
function ki() {
  qt.push(me), me = false;
}
function Ai() {
  qt.push(me), me = true;
}
function sr() {
  let e = qt.pop();
  me = e === void 0 ? true : e;
}
function q(e, t, n) {
  if (!me || V === void 0)
    return;
  let r = kt.get(e);
  r || kt.set(e, r = /* @__PURE__ */ new Map());
  let o = r.get(n);
  o || r.set(n, o = /* @__PURE__ */ new Set()), o.has(V) || (o.add(V), V.deps.push(o), V.options.onTrack && V.options.onTrack({ effect: V, target: e, type: t, key: n }));
}
function Y(e, t, n, r, o, i) {
  let a = kt.get(e);
  if (!a)
    return;
  let s = /* @__PURE__ */ new Set(), l = (d) => {
    d && d.forEach((p) => {
      (p !== V || p.allowRecurse) && s.add(p);
    });
  };
  if (t === "clear")
    a.forEach(l);
  else if (n === "length" && re(e))
    a.forEach((d, p) => {
      (p === "length" || p >= r) && l(d);
    });
  else
    switch (n !== void 0 && l(a.get(n)), t) {
      case "add":
        re(e) ? It(n) && l(a.get("length")) : (l(a.get(oe)), ke(e) && l(a.get(At)));
        break;
      case "delete":
        re(e) || (l(a.get(oe)), ke(e) && l(a.get(At)));
        break;
      case "set":
        ke(e) && l(a.get(oe));
        break;
    }
  let u = (d) => {
    d.options.onTrigger && d.options.onTrigger({ effect: d, target: e, key: n, type: t, newValue: r, oldValue: o, oldTarget: i }), d.options.scheduler ? d.options.scheduler(d) : d();
  };
  s.forEach(u);
}
var Si = er("__proto__,__v_isRef,__isVue");
var lr = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Dt));
var Ci = Je();
var Oi = Je(false, true);
var Ti = Je(true);
var $i = Je(true, true);
var qe = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  let t = Array.prototype[e];
  qe[e] = function(...n) {
    let r = x(this);
    for (let i = 0, a = this.length; i < a; i++)
      q(r, "get", i + "");
    let o = t.apply(r, n);
    return o === -1 || o === false ? t.apply(r, n.map(x)) : o;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  let t = Array.prototype[e];
  qe[e] = function(...n) {
    ki();
    let r = t.apply(this, n);
    return sr(), r;
  };
});
function Je(e = false, t = false) {
  return function(n, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_raw" && o === (e ? t ? qi : wr : t ? Ii : yr).get(n))
      return n;
    let i = re(n);
    if (!e && i && Ue(qe, r))
      return Reflect.get(qe, r, o);
    let a = Reflect.get(n, r, o);
    return (Dt(r) ? lr.has(r) : Si(r)) || (e || q(n, "get", r), t) ? a : St(a) ? !i || !It(r) ? a.value : a : Ke(a) ? e ? Er(a) : Vt(a) : a;
  };
}
var Li = ur();
var Ni = ur(true);
function ur(e = false) {
  return function(t, n, r, o) {
    let i = t[n];
    if (!e && (r = x(r), i = x(i), !re(t) && St(i) && !St(r)))
      return i.value = r, true;
    let a = re(t) && It(n) ? Number(n) < t.length : Ue(t, n), s = Reflect.set(t, n, r, o);
    return t === x(o) && (a ? ir(r, i) && Y(t, "set", n, r, i) : Y(t, "add", n, r)), s;
  };
}
function ji(e, t) {
  let n = Ue(e, t), r = e[t], o = Reflect.deleteProperty(e, t);
  return o && n && Y(e, "delete", t, void 0, r), o;
}
function Pi(e, t) {
  let n = Reflect.has(e, t);
  return (!Dt(t) || !lr.has(t)) && q(e, "has", t), n;
}
function Mi(e) {
  return q(e, "iterate", re(e) ? "length" : oe), Reflect.ownKeys(e);
}
var cr = { get: Ci, set: Li, deleteProperty: ji, has: Pi, ownKeys: Mi };
var dr = { get: Ti, set(e, t) {
  return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), true;
}, deleteProperty(e, t) {
  return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), true;
} };
var Ka = tr({}, cr, { get: Oi, set: Ni });
var Xa = tr({}, dr, { get: $i });
var zt = (e) => Ke(e) ? Vt(e) : e;
var Ft = (e) => Ke(e) ? Er(e) : e;
var Ht = (e) => e;
var Ze = (e) => Reflect.getPrototypeOf(e);
function Ye(e, t, n = false, r = false) {
  e = e.__v_raw;
  let o = x(e), i = x(t);
  t !== i && !n && q(o, "get", t), !n && q(o, "get", i);
  let { has: a } = Ze(o), s = r ? Ht : n ? Ft : zt;
  if (a.call(o, t))
    return s(e.get(t));
  if (a.call(o, i))
    return s(e.get(i));
  e !== o && e.get(t);
}
function Ge(e, t = false) {
  let n = this.__v_raw, r = x(n), o = x(e);
  return e !== o && !t && q(r, "has", e), !t && q(r, "has", o), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function Qe(e, t = false) {
  return e = e.__v_raw, !t && q(x(e), "iterate", oe), Reflect.get(e, "size", e);
}
function fr(e) {
  e = x(e);
  let t = x(this);
  return Ze(t).has.call(t, e) || (t.add(e), Y(t, "add", e, e)), this;
}
function mr(e, t) {
  t = x(t);
  let n = x(this), { has: r, get: o } = Ze(n), i = r.call(n, e);
  i ? xr(n, r, e) : (e = x(e), i = r.call(n, e));
  let a = o.call(n, e);
  return n.set(e, t), i ? ir(t, a) && Y(n, "set", e, t, a) : Y(n, "add", e, t), this;
}
function pr(e) {
  let t = x(this), { has: n, get: r } = Ze(t), o = n.call(t, e);
  o ? xr(t, n, e) : (e = x(e), o = n.call(t, e));
  let i = r ? r.call(t, e) : void 0, a = t.delete(e);
  return o && Y(t, "delete", e, void 0, i), a;
}
function hr() {
  let e = x(this), t = e.size !== 0, n = ke(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && Y(e, "clear", void 0, void 0, n), r;
}
function et(e, t) {
  return function(n, r) {
    let o = this, i = o.__v_raw, a = x(i), s = t ? Ht : e ? Ft : zt;
    return !e && q(a, "iterate", oe), i.forEach((l, u) => n.call(r, s(l), s(u), o));
  };
}
function Me(e, t, n) {
  return function(...r) {
    let o = this.__v_raw, i = x(o), a = ke(i), s = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = o[e](...r), d = n ? Ht : t ? Ft : zt;
    return !t && q(i, "iterate", l ? At : oe), { next() {
      let { value: p, done: g } = u.next();
      return g ? { value: p, done: g } : { value: s ? [d(p[0]), d(p[1])] : d(p), done: g };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function J(e) {
  return function(...t) {
    {
      let n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${or(e)} operation ${n}failed: target is readonly.`, x(this));
    }
    return e === "delete" ? false : this;
  };
}
var _r = { get(e) {
  return Ye(this, e);
}, get size() {
  return Qe(this);
}, has: Ge, add: fr, set: mr, delete: pr, clear: hr, forEach: et(false, false) };
var vr = { get(e) {
  return Ye(this, e, false, true);
}, get size() {
  return Qe(this);
}, has: Ge, add: fr, set: mr, delete: pr, clear: hr, forEach: et(false, true) };
var gr = { get(e) {
  return Ye(this, e, true);
}, get size() {
  return Qe(this, true);
}, has(e) {
  return Ge.call(this, e, true);
}, add: J("add"), set: J("set"), delete: J("delete"), clear: J("clear"), forEach: et(true, false) };
var br = { get(e) {
  return Ye(this, e, true, true);
}, get size() {
  return Qe(this, true);
}, has(e) {
  return Ge.call(this, e, true);
}, add: J("add"), set: J("set"), delete: J("delete"), clear: J("clear"), forEach: et(true, true) };
var Ri = ["keys", "values", "entries", Symbol.iterator];
Ri.forEach((e) => {
  _r[e] = Me(e, false, false), gr[e] = Me(e, true, false), vr[e] = Me(e, false, true), br[e] = Me(e, true, true);
});
function tt(e, t) {
  let n = t ? e ? br : vr : e ? gr : _r;
  return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(Ue(n, o) && o in r ? n : r, o, i);
}
var Bi = { get: tt(false, false) };
var Ja = { get: tt(false, true) };
var Di = { get: tt(true, false) };
var Za = { get: tt(true, true) };
function xr(e, t, n) {
  let r = x(n);
  if (r !== n && t.call(e, r)) {
    let o = rr(e);
    console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var yr = /* @__PURE__ */ new WeakMap();
var Ii = /* @__PURE__ */ new WeakMap();
var wr = /* @__PURE__ */ new WeakMap();
var qi = /* @__PURE__ */ new WeakMap();
function zi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Fi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : zi(rr(e));
}
function Vt(e) {
  return e && e.__v_isReadonly ? e : kr(e, false, cr, Bi, yr);
}
function Er(e) {
  return kr(e, true, dr, Di, wr);
}
function kr(e, t, n, r, o) {
  if (!Ke(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  let i = o.get(e);
  if (i)
    return i;
  let a = Fi(e);
  if (a === 0)
    return e;
  let s = new Proxy(e, a === 2 ? r : n);
  return o.set(e, s), s;
}
function x(e) {
  return e && x(e.__v_raw) || e;
}
function St(e) {
  return Boolean(e && e.__v_isRef === true);
}
z("nextTick", () => In);
z("dispatch", (e) => Ee.bind(Ee, e));
z("watch", (e, { evaluateLater: t, effect: n }) => (r, o) => {
  let i = t(r), a = true, s, l = n(() => i((u) => {
    JSON.stringify(u), a ? s = u : queueMicrotask(() => {
      o(u, s), s = u;
    }), a = false;
  }));
  e._x_effects.delete(l);
});
z("store", ai);
z("data", (e) => wn(e));
z("root", (e) => Fe(e));
z("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Oe(Hi(e))), e._x_refs_proxy));
function Hi(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var ct = {};
function Ar(e) {
  return ct[e] || (ct[e] = 0), ++ct[e];
}
function Vi(e, t) {
  return He(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return true;
  });
}
function Wi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Ar(t));
}
z("id", (e) => (t, n = null) => {
  let r = Vi(e, t), o = r ? r._x_ids[t] : Ar(t);
  return n ? `${t}-${o}-${n}` : `${t}-${o}`;
});
z("el", (e) => e);
Sr("Focus", "focus", "focus");
Sr("Persist", "persist", "persist");
function Sr(e, t, n) {
  z(t, (r) => fe(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
k("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let o = r(t), i = () => {
    let u;
    return o((d) => u = d), u;
  }, a = r(`${t} = __placeholder`), s = (u) => a(() => {
  }, { scope: { __placeholder: u } }), l = i();
  s(l), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let u = e._x_model.get, d = e._x_model.set;
    n(() => s(u())), n(() => d(i()));
  });
});
k("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && fe("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || fe(`Cannot find x-teleport element for selector: "${t}"`);
  let o = e.content.cloneNode(true).firstElementChild;
  e._x_teleport = o, o._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((i) => {
    o.addEventListener(i, (a) => {
      a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
    });
  }), Ce(o, {}, e), C(() => {
    r.appendChild(o), Z(o), o._x_ignore = true;
  }), n(() => o.remove());
});
var Cr = () => {
};
Cr.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = true : e._x_ignore = true, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
k("ignore", Cr);
k("effect", (e, { expression: t }, { effect: n }) => n($(e, t)));
function Or(e, t, n, r) {
  let o = e, i = (l) => r(l), a = {}, s = (l, u) => (d) => u(l, d);
  if (n.includes("dot") && (t = Ui(t)), n.includes("camel") && (t = Ki(t)), n.includes("passive") && (a.passive = true), n.includes("capture") && (a.capture = true), n.includes("window") && (o = window), n.includes("document") && (o = document), n.includes("prevent") && (i = s(i, (l, u) => {
    u.preventDefault(), l(u);
  })), n.includes("stop") && (i = s(i, (l, u) => {
    u.stopPropagation(), l(u);
  })), n.includes("self") && (i = s(i, (l, u) => {
    u.target === e && l(u);
  })), (n.includes("away") || n.includes("outside")) && (o = document, i = s(i, (l, u) => {
    e.contains(u.target) || u.target.isConnected !== false && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== false && l(u));
  })), n.includes("once") && (i = s(i, (l, u) => {
    l(u), o.removeEventListener(t, i, a);
  })), i = s(i, (l, u) => {
    Ji(t) && Zi(u, n) || l(u);
  }), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", u = Ct(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    i = Jn(i, u);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", u = Ct(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    i = Zn(i, u);
  }
  return o.addEventListener(t, i, a), () => {
    o.removeEventListener(t, i, a);
  };
}
function Ui(e) {
  return e.replace(/-/g, ".");
}
function Ki(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Ct(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Xi(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Ji(e) {
  return ["keydown", "keyup"].includes(e);
}
function Zi(e, t) {
  let n = t.filter((o) => !["window", "document", "prevent", "stop", "once"].includes(o));
  if (n.includes("debounce")) {
    let o = n.indexOf("debounce");
    n.splice(o, Ct((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && fn(e.key).includes(n[0]))
    return false;
  let r = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => n.includes(o));
  return n = n.filter((o) => !r.includes(o)), !(r.length > 0 && r.filter((o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`])).length === r.length && fn(e.key).includes(n[0]));
}
function fn(e) {
  if (!e)
    return [];
  e = Xi(e);
  let t = { ctrl: "control", slash: "/", space: "-", spacebar: "-", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=" };
  return t[e] = e, Object.keys(t).map((n) => {
    if (t[n] === e)
      return n;
  }).filter((n) => n);
}
k("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: o }) => {
  let i = $(e, n), a = `${n} = rightSideOfExpression($event, ${n})`, s = $(e, a);
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let u = Yi(e, t, n), d = Or(e, l, t, (g) => {
    s(() => {
    }, { scope: { $event: g, rightSideOfExpression: u } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, o(() => e._x_removeModelListeners.default());
  let p = $(e, `${n} = __placeholder`);
  e._x_model = { get() {
    let g;
    return i((M) => g = M), g;
  }, set(g) {
    p(() => {
    }, { scope: { __placeholder: g } });
  } }, e._x_forceModelUpdate = () => {
    i((g) => {
      g === void 0 && n.match(/\./) && (g = ""), window.fromModel = true, C(() => Kn(e, "value", g)), delete window.fromModel;
    });
  }, r(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function Yi(e, t, n) {
  return e.type === "radio" && C(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  }), (r, o) => C(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail || r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(o)) {
        let i = t.includes("number") ? dt(r.target.value) : r.target.value;
        return r.target.checked ? o.concat([i]) : o.filter((a) => !Gi(a, i));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((i) => {
          let a = i.value || i.text;
          return dt(a);
        }) : Array.from(r.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i = r.target.value;
        return t.includes("number") ? dt(i) : t.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function dt(e) {
  let t = e ? parseFloat(e) : null;
  return Qi(t) ? t : e;
}
function Gi(e, t) {
  return e == t;
}
function Qi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
k("cloak", (e) => queueMicrotask(() => C(() => e.removeAttribute(he("cloak")))));
Vn(() => `[${he("init")}]`);
k("init", We((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, false) : n(t, {}, false)));
k("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let o = r(t);
  n(() => {
    o((i) => {
      C(() => {
        e.textContent = i;
      });
    });
  });
});
k("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let o = r(t);
  n(() => {
    o((i) => {
      C(() => {
        e.innerHTML = i, e._x_ignoreSelf = true, Z(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Pt(jn(":", Pn(he("bind:"))));
k("bind", (e, { value: t, modifiers: n, expression: r, original: o }, { effect: i }) => {
  if (!t) {
    let s = {};
    li(s), $(e, r)((l) => {
      Gn(e, l, o);
    }, { scope: s });
    return;
  }
  if (t === "key")
    return ea(e, r);
  let a = $(e, r);
  i(() => a((s) => {
    s === void 0 && typeof r == "string" && r.match(/\./) && (s = ""), C(() => Kn(e, t, s, n));
  }));
});
function ea(e, t) {
  e._x_keyExpression = t;
}
Hn(() => `[${he("data")}]`);
k("data", We((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  _t(r, e);
  let o = {};
  ci(o, r);
  let i = ce(e, t, { scope: o });
  i === void 0 && (i = {}), _t(i, e);
  let a = pe(i);
  En(a);
  let s = Ce(e, a);
  a.init && ce(e, a.init), n(() => {
    a.destroy && ce(e, a.destroy), s();
  });
}));
k("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let o = $(e, n);
  e._x_doHide || (e._x_doHide = () => {
    C(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    C(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let i = () => {
    e._x_doHide(), e._x_isShown = false;
  }, a = () => {
    e._x_doShow(), e._x_isShown = true;
  }, s = () => setTimeout(a), l = yt((p) => p ? a() : i(), (p) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, p, a, i) : p ? s() : i();
  }), u, d = true;
  r(() => o((p) => {
    !d && p === u || (t.includes("immediate") && (p ? s() : i()), l(p), u = p, d = false);
  }));
});
k("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let o = na(t), i = $(e, o.items), a = $(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => ta(e, o, i, a)), r(() => {
    Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function ta(e, t, n, r) {
  let o = (a) => typeof a == "object" && !Array.isArray(a), i = e;
  n((a) => {
    ra(a) && a >= 0 && (a = Array.from(Array(a).keys(), (f) => f + 1)), a === void 0 && (a = []);
    let s = e._x_lookup, l = e._x_prevKeys, u = [], d = [];
    if (o(a))
      a = Object.entries(a).map(([f, v]) => {
        let y = mn(t, v, f, a);
        r((O) => d.push(O), { scope: Be({ index: f }, y) }), u.push(y);
      });
    else
      for (let f = 0; f < a.length; f++) {
        let v = mn(t, a[f], f, a);
        r((y) => d.push(y), { scope: Be({ index: f }, v) }), u.push(v);
      }
    let p = [], g = [], M = [], E = [];
    for (let f = 0; f < l.length; f++) {
      let v = l[f];
      d.indexOf(v) === -1 && M.push(v);
    }
    l = l.filter((f) => !M.includes(f));
    let le = "template";
    for (let f = 0; f < d.length; f++) {
      let v = d[f], y = l.indexOf(v);
      if (y === -1)
        l.splice(f, 0, v), p.push([le, f]);
      else if (y !== f) {
        let O = l.splice(f, 1)[0], N = l.splice(y - 1, 1)[0];
        l.splice(f, 0, N), l.splice(y, 0, O), g.push([O, N]);
      } else
        E.push(v);
      le = v;
    }
    for (let f = 0; f < M.length; f++) {
      let v = M[f];
      s[v]._x_effects && s[v]._x_effects.forEach(pn), s[v].remove(), s[v] = null, delete s[v];
    }
    for (let f = 0; f < g.length; f++) {
      let [v, y] = g[f], O = s[v], N = s[y], X = document.createElement("div");
      C(() => {
        N.after(X), O.after(N), N._x_currentIfEl && N.after(N._x_currentIfEl), X.before(O), O._x_currentIfEl && O.after(O._x_currentIfEl), X.remove();
      }), ln(N, u[d.indexOf(y)]);
    }
    for (let f = 0; f < p.length; f++) {
      let [v, y] = p[f], O = v === "template" ? i : s[v];
      O._x_currentIfEl && (O = O._x_currentIfEl);
      let N = u[y], X = d[y], I = document.importNode(i.content, true).firstElementChild;
      Ce(I, pe(N), i), C(() => {
        O.after(I), Z(I);
      }), typeof X == "object" && fe("x-for key cannot be an object, it must be a string or an integer", i), s[X] = I;
    }
    for (let f = 0; f < E.length; f++)
      ln(s[E[f]], u[d.indexOf(E[f])]);
    i._x_prevKeys = d;
  });
}
function na(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, o = e.match(r);
  if (!o)
    return;
  let i = {};
  i.items = o[2].trim();
  let a = o[1].replace(n, "").trim(), s = a.match(t);
  return s ? (i.item = a.replace(t, "").trim(), i.index = s[1].trim(), s[2] && (i.collection = s[2].trim())) : i.item = a, i;
}
function mn(e, t, n, r) {
  let o = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim()).forEach((i, a) => {
    o[i] = t[a];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim()).forEach((i) => {
    o[i] = t[i];
  }) : o[e.item] = t, e.index && (o[e.index] = n), e.collection && (o[e.collection] = r), o;
}
function ra(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Tr() {
}
Tr.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = Fe(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
k("ref", Tr);
k("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let o = $(e, t), i = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(true).firstElementChild;
    return Ce(s, {}, e), C(() => {
      e.after(s), Z(s);
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      ie(s, (l) => {
        l._x_effects && l._x_effects.forEach(pn);
      }), s.remove(), delete e._x_currentIfEl;
    }, s;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => o((s) => {
    s ? i() : a();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
k("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((r) => Wi(e, r));
});
Pt(jn("@", Pn(he("on:"))));
k("on", We((e, { value: t, modifiers: n, expression: r }, { cleanup: o }) => {
  let i = r ? $(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = Or(e, t, n, (s) => {
    i(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  o(() => a());
}));
nt("Collapse", "collapse", "collapse");
nt("Intersect", "intersect", "intersect");
nt("Focus", "trap", "focus");
nt("Mask", "mask", "mask");
function nt(e, t, n) {
  k(t, (r) => fe(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
Te.setEvaluator(On);
Te.setReactivityEngine({ reactive: Vt, effect: xi, release: yi, raw: x });
var oa = Te;
var $r = oa;
var ia = class {
  constructor(e) {
    an(this, "el"), an(this, "traversals", { first: "firstElementChild", next: "nextElementSibling", parent: "parentElement" }), this.el = e;
  }
  nodes() {
    return this.traversals = { first: "firstChild", next: "nextSibling", parent: "parentNode" }, this;
  }
  first() {
    return this.teleportTo(this.el[this.traversals.first]);
  }
  next() {
    return this.teleportTo(this.teleportBack(this.el[this.traversals.next]));
  }
  before(e) {
    return this.el[this.traversals.parent].insertBefore(e, this.el), e;
  }
  replace(e) {
    return this.el[this.traversals.parent].replaceChild(e, this.el), e;
  }
  append(e) {
    return this.el.appendChild(e), e;
  }
  teleportTo(e) {
    return e && (e._x_teleport ? e._x_teleport : e);
  }
  teleportBack(e) {
    return e && (e._x_teleportBack ? e._x_teleportBack : e);
  }
};
function S(e) {
  return new ia(e);
}
function aa(e) {
  let t = document.createElement("template");
  return t.innerHTML = e, t.content.firstElementChild;
}
function sa(e) {
  return e.nodeType === 3 || e.nodeType === 8;
}
var Lr = () => {
};
var Nr = () => {
};
async function Wt(e, t, n) {
  let r, o, i, a, s, l, u, d, p, g, M;
  function E(c) {
    if (M)
      return Nr((c || "").replace(`
`, "\\n"), r, o), new Promise((m) => Lr = () => m());
  }
  function le(c = {}) {
    let m = (R) => R.getAttribute("key"), h = () => {
    };
    s = c.updating || h, l = c.updated || h, u = c.removing || h, d = c.removed || h, p = c.adding || h, g = c.added || h, i = c.key || m, a = c.lookahead || false, M = c.debug || false;
  }
  async function f(c, m) {
    if (v(c, m)) {
      let R = y(c, m);
      return await E("Swap elements"), R;
    }
    let h = false;
    if (!ue(s, c, m, () => h = true)) {
      if (window.Alpine && la(c, m, () => h = true), sa(m)) {
        await O(c, m), l(c, m);
        return;
      }
      h || await N(c, m), l(c, m), await X(c, m);
    }
  }
  function v(c, m) {
    return c.nodeType != m.nodeType || c.nodeName != m.nodeName || I(c) != I(m);
  }
  function y(c, m) {
    if (ue(u, c))
      return;
    let h = m.cloneNode(true);
    ue(p, h) || (S(c).replace(h), d(c), g(h));
  }
  async function O(c, m) {
    let h = m.nodeValue;
    c.nodeValue !== h && (c.nodeValue = h, await E("Change text node to: " + h));
  }
  async function N(c, m) {
    if (c._x_isShown && !m._x_isShown || !c._x_isShown && m._x_isShown)
      return;
    let h = Array.from(c.attributes), R = Array.from(m.attributes);
    for (let U = h.length - 1; U >= 0; U--) {
      let F = h[U].name;
      m.hasAttribute(F) || (c.removeAttribute(F), await E("Remove attribute"));
    }
    for (let U = R.length - 1; U >= 0; U--) {
      let F = R[U].name, w = R[U].value;
      c.getAttribute(F) !== w && (c.setAttribute(F, w), await E(`Set [${F}] attribute to: "${w}"`));
    }
  }
  async function X(c, m) {
    let h = c.childNodes, R = m.childNodes, U = en(R), F = en(h), w = S(m).nodes().first(), _ = S(c).nodes().first(), ee = {};
    for (; w; ) {
      let j = I(w), H = I(_);
      if (!_)
        if (j && ee[j]) {
          let P = ee[j];
          S(c).append(P), _ = P, await E("Add element (from key)");
        } else {
          let P = Ur(w, c) || {};
          await E("Add element: " + (P.outerHTML || P.nodeValue)), w = S(w).nodes().next();
          continue;
        }
      if (a) {
        let P = S(w).next(), tn = false;
        for (; !tn && P; )
          _.isEqualNode(P) && (tn = true, _ = at(w, _), H = I(_), await E("Move element (lookahead)")), P = S(P).next();
      }
      if (j !== H) {
        if (!j && H) {
          ee[H] = _, _ = at(w, _), ee[H].remove(), _ = S(_).nodes().next(), w = S(w).nodes().next(), await E('No "to" key');
          continue;
        }
        if (j && !H && F[j] && (_ = S(_).replace(F[j]), await E('No "from" key')), j && H) {
          ee[H] = _;
          let P = F[j];
          if (P)
            _ = S(_).replace(P), await E('Move "from" key');
          else {
            ee[H] = _, _ = at(w, _), ee[H].remove(), _ = S(_).next(), w = S(w).next(), await E("Swap elements with keys");
            continue;
          }
        }
      }
      let Kr = _ && S(_).nodes().next();
      await f(_, w), w = w && S(w).nodes().next(), _ = Kr;
    }
    let st = [];
    for (; _; )
      ue(u, _) || st.push(_), _ = S(_).nodes().next();
    for (; st.length; ) {
      let j = st.shift();
      j.remove(), await E("remove el"), d(j);
    }
  }
  function I(c) {
    return c && c.nodeType === 1 && i(c);
  }
  function en(c) {
    let m = {};
    return c.forEach((h) => {
      let R = I(h);
      R && (m[R] = h);
    }), m;
  }
  function Ur(c, m) {
    if (!ue(p, c)) {
      let h = c.cloneNode(true);
      return S(m).append(h), g(h), h;
    }
    return null;
  }
  function at(c, m) {
    if (!ue(p, c)) {
      let h = c.cloneNode(true);
      return S(m).before(h), g(h), h;
    }
    return m;
  }
  return le(n), r = e, o = aa(t), window.Alpine && window.Alpine.closestDataStack && !e._x_dataStack && (o._x_dataStack = window.Alpine.closestDataStack(e), o._x_dataStack && window.Alpine.clone(e, o)), await E(), await f(e, o), r = void 0, o = void 0, e;
}
Wt.step = () => Lr();
Wt.log = (e) => {
  Nr = e;
};
function ue(e, ...t) {
  let n = false;
  return e(...t, () => n = true), n;
}
function la(e, t, n) {
  e.nodeType === 1 && e._x_dataStack && window.Alpine.clone(e, t);
}
function ua(e) {
  e.morph = Wt;
}
var ca = ua;
$r.plugin(ca);
var da = /INPUT/i;
var fa = /date|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/i;
var ma = /TEXTAREA/i;
function pa(e, t, n, r) {
  if (!(e.nodeType !== Node.ELEMENT_NODE || e !== document.activeElement) && (e.tagName.match(ma) || e.tagName.match(da) && e.getAttribute("type").match(fa)))
    return r();
}
function ha(e, t) {
  e.forEach((n) => $r.morph(n, t, { updating: pa }));
}
var _a = ha;
function va(e, t, n) {
  if (e.match(/^dispatch(Event)?$/))
    return ao(n, t[0], t[1] || {});
  if (e.match(/^morph|mutate$/))
    return _a(n, t[0]);
  if (e.endsWith("="))
    return n.forEach((r) => r[e.slice(0, -1).trim()] = t[0]);
  n.forEach((r) => r[e].apply(r, t));
}
function ga() {
  let e = JSON.parse(this.templateContent.textContent), { id: t, selector: n, receiver: r, method: o, args: i } = e, a = [self];
  n && (a = Array.from(document.querySelectorAll(n))), r && (a = a.map((s) => {
    let l = s, u = r.split(".");
    for (; u.length > 0; )
      l = l[u.shift()];
    return l;
  })), va(o, i, a);
}
var jr = ga;
if (!self.Turbo)
  throw new Error("`Turbo` is not defined! Be sure to import `@turbo-boost/streams` after `@hotwired/turbo` or `@hotwired/turbo-rails`.");
if (!Turbo.StreamActions)
  throw new Error("`Turbo.StreamActions` is not defined! Verify that you are running >= `7.2.0` of `@hotwired/turbo`.");
Turbo.StreamActions.invoke = jr;
self.TurboBoost = self.TurboBoost || {};
self.TurboBoost.Streams = { invoke: jr };
console.info("@turbo-boost/streams has initialized and registered new stream actions with Turbo.");
var Ut = class {
  get element() {
    return document.querySelector('meta[name="turbo-boost"]');
  }
  get token() {
    return this.element.getAttribute("content");
  }
  get busy() {
    return this.element.dataset.busy === "true";
  }
  set busy(t) {
    return this.element.dataset.busy = !!t;
  }
};
var A = new Ut();
var L = { start: "turbo-boost:command:start", success: "turbo-boost:command:success", finish: "turbo-boost:command:finish", abort: "turbo-boost:command:abort", clientError: "turbo-boost:command:client-error", serverError: "turbo-boost:command:server-error" };
var W = { stateLoad: "turbo-boost:state:load", stateChange: "turbo-boost:state:change" };
var K = b(b({}, L), W);
function T(e, t, n = {}) {
  n = n || {}, n.detail = n.detail || {}, t = t || document;
  let r = new CustomEvent(e, B(b({}, n), { bubbles: true }));
  return t.dispatchEvent(r), r;
}
var Kt;
function rt(e, t = null) {
  if (!e || typeof e != "object")
    return e;
  let n = new Proxy(e, { deleteProperty(r, o) {
    return delete r[o], T(W.stateChange, A.element, { detail: { state: Kt } }), true;
  }, set(r, o, i, a) {
    return r[o] = rt(i, this), T(W.stateChange, A.element, { detail: { state: Kt } }), true;
  } });
  if (Array.isArray(e))
    e.forEach((r, o) => e[o] = rt(r, n));
  else if (typeof e == "object")
    for (let [r, o] of Object.entries(e))
      e[r] = rt(o, n);
  return t || (Kt = n), n;
}
var Pr = rt;
var Xt;
var _e;
var $e;
var Mr;
function Rr() {
  if (!A.element)
    return ve();
  let e = atob(A.element.dataset.state);
  $e = {}, _e = Pr(JSON.parse(e)), Xt = b({}, _e), delete A.element.dataset.clientStateChange, setTimeout(() => T(W.stateLoad, A.element, { detail: { state: _e } }));
}
function ve() {
  clearTimeout(Mr), Mr = setTimeout(Rr, 10);
}
Xt || Rr();
addEventListener("DOMContentLoaded", ve);
addEventListener("load", ve);
addEventListener("turbo:load", ve);
addEventListener("turbo:frame-load", ve);
addEventListener(L.success, ve);
addEventListener(W.stateChange, (e) => {
  $e = {};
  for (let [t, n] of Object.entries(_e))
    Xt[t] !== n && ($e[t] = n);
  A.element.dataset.clientStateChange = true, A.element.dataset.state = btoa(JSON.stringify(_e));
});
var ae = { events: W, get current() {
  return _e;
}, get delta() {
  return $e;
}, get payloadChunks() {
  return btoa(JSON.stringify($e)).match(/.{1,2000}/g);
} };
function ba(e) {
  let t = "<html", n = "</html", r = e.indexOf(t), o = e.lastIndexOf(n);
  if (r >= 0 && o >= 0) {
    let i = e.slice(e.indexOf(">", r) + 1, o);
    document.documentElement.innerHTML = i;
  }
}
function xa(e) {
  document.body.insertAdjacentHTML("beforeend", e);
}
var se = { append: xa, replaceDocument: ba };
var ot = {};
function ya(e) {
  ot[e.id] = e;
}
function wa(e) {
  delete ot[e];
}
var it = { add: ya, remove: wa, get commands() {
  return [...Object.values(ot)];
}, get length() {
  return Object.keys(ot).length;
} };
function Br(e) {
  e.detail.endedAt = new Date().getTime(), e.detail.milliseconds = e.detail.endedAt - e.detail.startedAt, setTimeout(() => T(L.finish, e.target, { detail: e.detail }), 25);
}
addEventListener(L.serverError, Br);
addEventListener(L.success, Br);
addEventListener(L.finish, (e) => it.remove(e.detail.id), true);
var Le = { events: L };
var Jt = {};
addEventListener("turbo:before-fetch-request", (e) => {
  let t = e.target.closest("turbo-frame"), { fetchOptions: n } = e.detail;
  if (A.busy) {
    let r = ["text/vnd.turbo-boost.html", n.headers.Accept];
    r = r.filter((o) => o && o.trim().length > 0).join(", "), n.headers.Accept = r, n.headers["TurboBoost-Token"] = A.token;
  }
  ae.payloadChunks.forEach((r, o) => {
    n.headers[`TurboBoost-State-${o.toString().padStart(4, "0")}`] = r;
  });
});
addEventListener("turbo:before-fetch-response", (e) => {
  let t = e.target.closest("turbo-frame"), { fetchResponse: n } = e.detail;
  if (t && (Jt[t.id] = t.src), n.header("TurboBoost")) {
    if (n.statusCode < 200 || n.statusCode > 399) {
      let r = `Server returned a ${n.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`;
      T(Le.events.clientError, document, { detail: B(b({}, e.detail), { error: r }) }, true);
    }
    n.header("TurboBoost") === "Append" && (e.preventDefault(), n.responseText.then((r) => se.append(r)));
  }
});
addEventListener("turbo:frame-load", (e) => {
  let t = e.target.closest("turbo-frame");
  t.dataset.turboBoostSrc = Jt[t.id] || t.src || t.dataset.turboBoostSrc, delete Jt[t.id];
});
var Ea = { frameAttribute: "data-turbo-frame", methodAttribute: "data-turbo-method", commandAttribute: "data-turbo-command" };
var D = b({}, Ea);
var G = [];
var Dr;
function ka(e, t) {
  let n = G.find((r) => r.name === e);
  return n && G.splice(G.indexOf(n), 1), G = [{ name: e, selectors: t }, ...G], document.addEventListener(e, Dr, true), b({}, G.find((r) => r.name === e));
}
function Aa(e) {
  return G.find((t) => t.selectors.find((n) => Array.from(document.querySelectorAll(n)).find((r) => r === e)));
}
function Sa(e, t) {
  let n = Aa(t);
  return n && n.name === e;
}
var Q = { register: ka, isRegisteredForElement: Sa, get events() {
  return [...G];
}, set handler(e) {
  Dr = e;
} };
function Ca(e) {
  return e.closest(`[${D.commandAttribute}]`);
}
function Oa(e) {
  return e.closest("turbo-frame");
}
function Ta(e, t = {}) {
  if (e.tagName.toLowerCase() !== "select")
    return t.value = e.value || null;
  if (!e.multiple)
    return t.value = e.options[e.selectedIndex].value;
  t.values = Array.from(e.options).reduce((n, r) => (r.selected && n.push(r.value), n), []);
}
function $a(e) {
  let t = Array.from(e.attributes).reduce((n, r) => {
    let o = r.value;
    return n[r.name] = o, n;
  }, {});
  return t.tag = e.tagName, t.checked = !!e.checked, t.disabled = !!e.disabled, Ta(e, t), delete t.class, delete t.action, delete t.href, delete t[D.commandAttribute], delete t[D.frameAttribute], t;
}
var Ne = { buildAttributePayload: $a, findClosestCommand: Ca, findClosestFrame: Oa };
function La(e, t = {}) {
  t.token = A.token;
  let n = document.createElement("input");
  n.type = "hidden", n.name = "turbo_boost_command", n.value = JSON.stringify(t), e.appendChild(n);
}
var Ir = { invokeCommand: La };
function Na(e, t = {}) {
  let n = document.createElement("a");
  n.href = e;
  let r = new URL(n);
  return r.searchParams.set("turbo_boost_command", JSON.stringify(t)), r;
}
var ge = { build: Na };
function ja(e, t) {
  let n = t.src;
  t = b({}, t), delete t.src, e.src = ge.build(n, t);
}
var Zt = { invokeCommand: ja };
function Pa(e, t = {}) {
  let n = t.src;
  t = b({}, t), delete t.src, delete t.href, e.setAttribute("href", ge.build(n, t));
}
var qr = { invokeCommand: Pa };
function Ma(e) {
  let t = e.target;
  T(Le.events.abort, document, { detail: B(b({}, e.detail), { xhr: t }) });
}
function Yt(e) {
  let t = e.target;
  t.getResponseHeader("TurboBoost") === "Append" ? se.append(t.responseText) : se.replaceDocument(t.responseText);
  let n = `Server returned a ${t.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;
  T(Le.events.clientError, document, { detail: B(b({}, e.detail), { error: n, xhr: t }) }, true);
}
function Ra(e) {
  let t = e.target;
  if (t.status < 200 || t.status > 399)
    return Yt(e);
  let n = t.responseText;
  t.getResponseHeader("TurboBoost") === "Append" ? se.append(t.responseText) : se.replaceDocument(t.responseText);
}
function Ba(e) {
  let t = e.src;
  e = b({}, e), delete e.src;
  try {
    let n = new XMLHttpRequest();
    n.open("GET", ge.build(t, e), true), n.setRequestHeader("Accept", "text/vnd.turbo-boost.html, text/html, application/xhtml+xml"), n.setRequestHeader("TurboBoost-Token", A.token), ae.payloadChunks.forEach((r, o) => n.setRequestHeader(`TurboBoost-State-${o.toString().padStart(4, "0")}`, r)), n.addEventListener("abort", Ma), n.addEventListener("error", Yt), n.addEventListener("load", Ra), n.send();
  } catch (n) {
    let r = `Unexpected error sending HTTP request! ${n.message}`;
    Yt(n, { detail: { message: r } });
  }
}
var zr = { invokeCommand: Ba };
function Gt(e, t) {
  return t = t || { dataset: {} }, e.href || t.src || t.dataset.turboBoostSrc || location.href;
}
function Da(e) {
  let t = Ne.findClosestFrame(e), { turboFrame: n, turboMethod: r } = e.dataset;
  return e.tagName.toLowerCase() === "form" ? { name: "form", reason: "Element is a form.", frame: t, src: e.action, invokeCommand: Ir.invokeCommand } : r && r.length > 0 ? { name: "method", reason: "Element defines data-turbo-method.", frame: t, src: e.href, invokeCommand: qr.invokeCommand } : n && n !== "_self" ? (t = document.getElementById(n), { name: "frame", reason: "element targets a frame that is not _self", frame: t, src: Gt(e, t), invokeCommand: Zt.invokeCommand }) : (!n || n === "_self") && t ? { name: "frame", reason: "element does NOT target a frame or targets _self and is contained by a frame", frame: t, src: Gt(e, t), invokeCommand: Zt.invokeCommand } : { name: "window", reason: "element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)", frame: null, src: Gt(e), invokeCommand: zr.invokeCommand };
}
var Qt = { find: Da };
var je = "unknown";
var Fr = { debug: Object.values(K), info: Object.values(K), warn: [K.abort, K.clientError, K.serverError], error: [K.clientError, K.serverError], unknown: [] };
Object.values(K).forEach((e) => {
  addEventListener(e, (t) => {
    Fr[je].includes(t.type) && console[je === "debug" ? "log" : je](t.type, { target: t.target, detail: t.detail });
  });
});
var Hr = { get level() {
  return je;
}, set level(e) {
  return Object.keys(Fr).includes(e) || (e = "unknown"), je = e;
} };
function Ia() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (e) => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16));
}
var Vr = { v4: Ia };
function Wr(e, t) {
  return { id: e, name: t.getAttribute(D.commandAttribute), elementId: t.id.length > 0 ? t.id : null, elementAttributes: Ne.buildAttributePayload(t), startedAt: new Date().getTime() };
}
function qa(e) {
  let t, n = {};
  try {
    if (t = Ne.findClosestCommand(e.target), !t || !Q.isRegisteredForElement(e.type, t))
      return;
    let r = `turbo-command-${Vr.v4()}`, o = Qt.find(t), i = B(b({}, Wr(r, t)), { driver: o.name, frameId: o.frame ? o.frame.id : null, src: o.src }), a = T(L.start, t, { cancelable: true, detail: i });
    if (a.defaultPrevented)
      return T(L.abort, t, { detail: { message: `An event handler for '${L.start}' prevented default behavior and blocked command invocation!`, source: a } });
    switch (o = Qt.find(t), i = B(b({}, Wr(r, t)), { driver: o.name, frameId: o.frame ? o.frame.id : null, src: o.src }), it.add(i), ["frame", "window"].includes(o.name) && e.preventDefault(), A.busy = true, setTimeout(() => A.busy = false, 10), o.name) {
      case "method":
        return o.invokeCommand(t, i);
      case "form":
        return o.invokeCommand(t, i);
      case "frame":
        return o.invokeCommand(o.frame, i);
      case "window":
        return o.invokeCommand(i);
    }
  } catch (r) {
    T(L.clientError, t, { detail: B(b({}, n), { error: r }) });
  }
}
Q.handler = qa;
Q.register("click", [`[${D.commandAttribute}]`]);
Q.register("submit", [`form[${D.commandAttribute}]`]);
Q.register("change", [`input[${D.commandAttribute}]`, `select[${D.commandAttribute}]`, `textarea[${D.commandAttribute}]`]);
self.TurboBoost = self.TurboBoost || {};
self.TurboBoost = B(b({}, self.TurboBoost), { stateEvents: W, get state() {
  return ae.current;
}, get stateDelta() {
  return ae.delta;
} });
self.TurboBoost.Commands = { logger: Hr, schema: D, events: L, registerEventDelegate: Q.register, get eventDelegates() {
  return Q.events;
} };
var _l = self.TurboBoost.Commands;

// app/javascript/elements/turbo_boost_element/index.js
var TurboBoostElement = class extends HTMLElement {
  constructor(html2) {
    super();
    this.devtool = "unknown";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html2 || "<slot></slot>";
  }
  connectedCallback() {
    this.ensureId();
  }
  ensureId() {
    if (this.id.trim().length)
      return;
    this.id = `${this.tagName}-${this.uuidv4()}`.toLowerCase();
  }
  // SEE: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  get viewStack() {
    const value = this.getAttribute("view-stack");
    if (!value)
      return [];
    return JSON.parse(value);
  }
  get partial() {
    return this.viewStack[0];
  }
};

// app/javascript/elements/toggle_elements/toggle_element.js
var stylesheet = ``;
var html = `
  <style>${stylesheet}</style>
  <turbo-boost>
    <slot name="busy"></slot>
    <slot></slot>
  </turbo-boost>
`;
var ToggleElement = class extends TurboBoostElement {
  constructor(html2) {
    super(html2);
  }
  // indicates if an rpc call is active/busy
  get busy() {
    return this.getAttribute("busy") === "true";
  }
  // indicates if an rpc call is active/busy
  set busy(value) {
    this.setAttribute("busy", !!value);
  }
};

// app/javascript/elements/toggle_elements/target_element/focus.js
function deactivateTrixAttributes(editor) {
  const attributes = [
    "bold",
    "bullet",
    "code",
    "heading1",
    "href",
    "italic",
    "number",
    "quote",
    "strike"
  ];
  attributes.forEach((name) => editor.deactivateAttribute(name));
}
function focusTrixEditorElement(element) {
  if (element.value.length === 0)
    return;
  const editor = element.editor;
  let lastRange = [];
  while (lastRange[0] !== editor.getSelectedRange()[0] && lastRange[1] !== editor.getSelectedRange()[1]) {
    lastRange = editor.getSelectedRange();
    editor.moveCursorInDirection("forward");
  }
  editor.insertString(" ");
  editor.moveCursorInDirection("forward");
  editor.setSelectedRange([lastRange[1], editor.getSelectedRange()[1]]);
  deactivateTrixAttributes(editor);
  editor.setSelectedRange([
    editor.getSelectedRange()[1],
    editor.getSelectedRange()[1]
  ]);
}
function shouldEnhanceFocus(element) {
  return element.closest("turbo-boost-toggle-target") && element.tagName.match(/^input|textarea|trix-editor$/i);
}
function enhanceFocus(element) {
  const trixEditorElement = element.closest("trix-editor");
  try {
    if (trixEditorElement) {
      focusTrixEditorElement(trixEditorElement);
    } else {
      element.selectionStart = element.selectionEnd = element.value.length;
    }
  } catch (_) {
  } finally {
    setTimeout(
      () => element.scrollIntoView({ block: "center", behavior: "smooth" }),
      100
    );
  }
}
addEventListener(
  "focus",
  (event) => {
    if (shouldEnhanceFocus(document.activeElement))
      enhanceFocus(document.activeElement);
  },
  true
);

// app/javascript/elements/toggle_elements/target_element/index.js
var ToggleTargetElement = class extends ToggleElement {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "mouseenter",
      () => clearTimeout(this.collapseTimeout)
    );
    this.collapseOn.forEach(
      (name) => this.addEventListener(name, () => this.collapse())
    );
  }
  // TODO: get cached content working properly
  //       perhaps use a mechanic other than morph
  cacheHTML() {
  }
  renderCachedHTML() {
  }
  collapse(delay = 250) {
    if (delay > 0) {
      clearTimeout(this.collapseTimeout);
      return this.collapseTimeout = setTimeout(() => this.collapse(0), delay);
    }
    this.innerHTML = "";
    try {
      this.currentTriggerElement.expanded = false;
      this.currentTriggerElement.hideDevtool();
    } catch (e) {
    }
  }
  collapseMatches() {
    document.querySelectorAll(this.collapseSelector).forEach((el) => {
      if (el === this)
        return;
      if (el.collapse)
        el.collapse(0);
    });
  }
  get collapseSelector() {
    if (this.currentTriggerElement && this.currentTriggerElement.collapseSelector)
      return this.currentTriggerElement.collapseSelector;
    return this.getAttribute("collapse-selector");
  }
  focus() {
    clearTimeout(this.focusTimeout);
    this.focusTimeout = setTimeout(() => {
      if (this.focusElement)
        this.focusElement.focus();
    }, 50);
  }
  get focusSelector() {
    if (this.currentTriggerElement && this.currentTriggerElement.focusSelector)
      return this.currentTriggerElement.focusSelector;
    return this.getAttribute("focus-selector");
  }
  get focusElement() {
    return this.querySelector(this.focusSelector);
  }
  get labeledBy() {
    return this.getAttribute("aria-labeledby");
  }
  get collapseOn() {
    const value = this.getAttribute("collapse-on");
    if (!value)
      return [];
    return JSON.parse(value);
  }
};

// app/javascript/utils/dom.js
function template(html2) {
  let template2 = document.createElement("template");
  template2.innerHTML = html2;
  return template2;
}
function appendHTML(html2, parent) {
  parent = parent || document.body;
  const clone = template(html2).content.cloneNode(true);
  const child = clone.querySelector("*");
  return parent.appendChild(child);
}
function addHighlight(element, options = {}) {
  if (!element)
    return;
  removeHighlight(element);
  let { outline, outlineOffset } = options;
  outline = outline || "dashed 3px red";
  outlineOffset = outlineOffset || "0px";
  element.originalStyles = element.originalStyles || {
    display: element.style.display,
    minHeight: element.style.minHeight,
    minWidth: element.style.minWidth,
    outline: element.style.outline,
    outlineOffset: element.style.outlineOffset
  };
  if (getComputedStyle(element).display.match(/^inline$/i) && element.offsetWidth === 0 && element.offsetHeight === 0) {
    element.style.display = "inline-block";
    element.style.minHeight = "2px";
    element.style.minWidth = "2px";
  }
  element.style.outline = outline;
  element.style.outlineOffset = outlineOffset;
  element.dataset.turboBoostHighlight = true;
}
function removeHighlight(element) {
  if (!element)
    return;
  if (element.originalStyles) {
    for (const [key, value] of Object.entries(element.originalStyles))
      value ? element.style[key] = value : element.style[key] = "";
    delete element.originalStyles;
  }
  delete element.dataset.turboBoostHighlight;
}
function coordinates(element) {
  if (!element)
    return {};
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

// app/javascript/devtools/elements/devtool_element.js
var DevtoolElement = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html;
    this.labelElement.addEventListener("click", (event) => {
      event.preventDefault();
      this.toggle();
    });
    this.checkboxElement.addEventListener(
      "change",
      (event) => this.dispatchEvent(new CustomEvent("change", { bubbles: true }))
    );
  }
  toggle() {
    this.checked ? this.uncheck() : this.check();
  }
  check() {
    this.checkboxElement.checked = true;
    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  }
  uncheck() {
    this.checkboxElement.checked = false;
    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  }
  get name() {
    return this.getAttribute("name");
  }
  get checked() {
    return this.checkboxElement.checked;
  }
  get checkboxElement() {
    return this.shadowRoot.querySelector("input");
  }
  get labelElement() {
    return this.shadowRoot.querySelector("label");
  }
  get html() {
    return `
      <style>${this.stylesheet}</style>
      <div>
        <input name="checkbox" type="checkbox">
        <label for="checkbox"><slot name="label"></slot></label>
      </div>
    `;
  }
  get stylesheet() {
    return `
      :host, :host * {
        cursor: pointer;
      }

      div {
        display: flex;
        margin-right: 10px;
      }

      input:checked + label{
        font-weight: bold;
      }

      label {
        color: black;
      }
    `;
  }
};

// app/javascript/devtools/elements/supervisor_element.js
var SupervisorElement = class extends HTMLElement {
  constructor() {
    super();
    this.enabledDevtools = {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html;
    this.shadowRoot.querySelector("button").addEventListener(
      "click",
      () => this.dispatchEvent(
        new CustomEvent("turbo-boost:devtools-close", {
          bubbles: true
        })
      )
    );
    this.addEventListener("change", (event) => {
      const devtoolElement = event.target;
      const { checked, name } = devtoolElement;
      checked ? this.enableDevtool(name) : this.disableDevtool(name);
    });
  }
  enableDevtool(name) {
    if (this.enabledDevtools[name])
      return;
    this.enabledDevtools[name] = true;
    this.dispatchEvent(
      new CustomEvent("turbo-boost:devtool-enable", {
        bubbles: true,
        detail: { name }
      })
    );
  }
  disableDevtool(name) {
    if (!this.enabledDevtools[name])
      return;
    delete this.enabledDevtools[name];
    this.dispatchEvent(
      new CustomEvent("turbo-boost:devtool-disable", {
        bubbles: true,
        detail: { name }
      })
    );
  }
  close() {
    this.devtoolElements.forEach((el) => {
      if (el.checked)
        el.uncheck();
    });
    this.remove();
  }
  get devtoolElements() {
    return this.querySelectorAll('[slot="devtool"]');
  }
  get closeElement() {
    return this.querySelector("button");
  }
  get html() {
    return `
      <style>${this.stylesheet}</style>
      <div>
        <img src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342">
        <slot name="devtool"></slot>
        <button>\u2715</button>
      </div>
    `;
  }
  get stylesheet() {
    return `
      :host {
        background-color: gainsboro;
        border-radius: 5px;
        bottom: 20px;
        display: block;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        left: 50%;
        outline-offset: 1px;
        outline: solid 2px black;
        padding: 5px 10px;
        position: fixed;
        transform: translateX(-50%);
        z-index: 8999;
      }

      * {
        -webkit-user-select: none;
        font-family: helvetica, sans-serif;
        font-size: 1rem;
        user-select: none;
      }

      img {
        align-self: center;
        cursor: grab;
        height: 25px;
        margin-left: -5px;
        vertical-align: middle;
      }

      div {
        display: flex;
        gap: 0 5px;
        position: relative;
      }

      [slot="devtool"] {
        align-self: center;
      }

      button {
        align-self: center;
        background-color: darkgray;
        border-radius: 50%;
        border: none;
        color: black;
        cursor: pointer;
        font-size: 10px;
        height: 18px;
        line-height: 18px;
        margin-right: -5px;
        opacity: 0.5;
        outline: solid 1px black;
        padding: 0 2px;
        width: 18px;
      }

      button:hover {
        opacity: 1;
      }
    `;
  }
};

// app/javascript/devtools/elements/tooltip_element.js
var TooltipElement = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html;
  }
  get color() {
    return this.getAttribute("color") || "darkslategray";
  }
  get backgroundColor() {
    return this.getAttribute("background-color") || "gainsboro";
  }
  get position() {
    return this.getAttribute("position") || "top";
  }
  get html() {
    return `
      <style>${this.stylesheet}</style>
      <div role="container">
        <div role="title">
          <slot name="title"></slot>
          <img src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342">
        </div>
        <slot name="subtitle"></slot>
        <slot name="content-top"></slot>
        <slot name="content"></slot>
        <slot name="content-bottom"></slot>
      </div>
    `;
  }
  get stylesheet() {
    return `
      :host {
        display: block;
        position: absolute;
        z-index: 8999;
      }

      * {
        color: ${this.color}
        font-size: 1rem;
      }

      [role="container"] {
        background-color: ${this.backgroundColor};
        border-radius: 15px;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        font-family: monospace;
        min-height: 30px;
        min-width: 100px;
        opacity: 0.9;
        outline-offset: 1px;
        outline: dashed 3px ${this.color};
        padding: 12px;
        position: relative;
        white-space: nowrap;
      }

      [role="title"] {
        display: flex;
      }

      [role="title"] slot[name="title"] {
        color: ${this.color};
        display: block;
        flex-grow: 1;
        font-weight: bold;
      }

      [role="title"] img {
        height: 25px;
        vertical-align: middle;
      }

      slot[name="subtitle"] {
        border-bottom: dotted 1px ${this.color};
        border-top: dotted 1px ${this.color};
        color: ${this.color};
        display: block;
        font-size: 0.8rem;
        font-weight: lighter;
        margin-bottom: 12px;
        margin-top: 8px;
        padding-bottom: 4px;
        padding-top: 4px;
        width: 100%;
      }

      slot[name="content-top"],
      slot[name="content"],
      slot[name="content-bottom"] {
        display: block;
        font-weight: normal;
      }

      slot[name="content-top"] {
        color: ${this.color};
        margin-bottom: 8px;
      }

      slot[name="content"],
      slot[name="content-bottom"] {
        opacity: 0.7;
        padding-left: 12px;
      }

      slot[name="content"] {
        color: ${this.color};
      }

      slot[name="content-bottom"] {
        color: red;
      }
    `;
  }
};

// app/javascript/devtools/dependencies.js
var added = [];
var dependencies = {
  LeaderLine: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js",
    integrity: "sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg==",
    global: "LeaderLine"
  },
  PlainDraggable: {
    src: "https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js",
    global: "PlainDraggable"
  }
};
function exists(dependency) {
  if (dependency.global && self[dependency.global])
    return true;
  if (document.querySelector(`[src='${dependency.src}']`))
    return true;
  return added.includes(dependency);
}
function add(dependency) {
  if (exists(dependency))
    return;
  added.push(dependency);
  const { src, integrity } = dependency;
  const script = document.createElement("script");
  script.setAttribute("src", src);
  script.setAttribute("crossorigin", "anonymous");
  script.setAttribute("referrerpolicy", "no-referrer");
  if (integrity)
    script.setAttribute("integrity", integrity);
  document.head.appendChild(script);
}
function remove(dependency) {
  if (!added.includes(dependency))
    return;
  added.splice(added.indexOf(dependency), 1);
  const { src } = dependency;
  const el = document.querySelector(`script[src='${src}']`);
  if (el)
    el.remove();
  if (dependency.global && self[dependency.global])
    self[dependency.global] = null;
}
function removeAll() {
  ;
  [...added].forEach((dependency) => remove(dependency));
}
var dependencies_default = __spreadProps(__spreadValues({}, dependencies), { add, remove, removeAll });

// app/javascript/devtools/supervisor.js
customElements.define("turbo-boost-devtool", DevtoolElement);
customElements.define("turbo-boost-devtool-supervisor", SupervisorElement);
customElements.define("turbo-boost-devtool-tooltip", TooltipElement);
var supervisorElement;
function makeDraggable() {
  if (!supervisorElement)
    return;
  try {
    new PlainDraggable(supervisorElement);
  } catch (e) {
    setTimeout(makeDraggable, 200);
  }
}
function stop() {
  if (stopped())
    return;
  supervisorElement.close();
  supervisorElement.dispatchEvent(
    new CustomEvent("turbo-boost:devtools-stop", {
      bubbles: true
    })
  );
  supervisorElement = null;
  dependencies_default.removeAll();
}
function start() {
  if (started())
    return;
  dependencies_default.add(dependencies_default.LeaderLine);
  dependencies_default.add(dependencies_default.PlainDraggable);
  supervisorElement = appendHTML(
    "<turbo-boost-devtool-supervisor></turbo-boost-devtool-supervisor>"
  );
  setTimeout(makeDraggable, 200);
  supervisorElement.dispatchEvent(
    new CustomEvent("turbo-boost:devtools-start", {
      bubbles: true
    })
  );
}
function restart() {
  const enabledList = supervisorElement ? Object.keys(supervisorElement.enabledDevtools) : [];
  stop();
  start();
  supervisorElement.devtoolElements.forEach((el) => {
    if (enabledList.includes(el.name))
      el.check();
  });
}
function started() {
  return !!supervisorElement;
}
function stopped() {
  return !started();
}
var restartTimeout;
function debouncedRestart() {
  clearTimeout(restartTimeout);
  restartTimeout = setTimeout(restart, 25);
}
function autoRestart() {
  if (started())
    debouncedRestart();
}
addEventListener("turbo:load", autoRestart);
addEventListener("turbo-frame:load", autoRestart);
addEventListener(TurboBoost.Commands.events.success, autoRestart);
addEventListener(TurboBoost.Commands.events.finish, autoRestart);
addEventListener("turbo-boost:devtools-connect", autoRestart);
addEventListener("turbo-boost:devtools-close", stop);
function register(name, label) {
  if (!supervisorElement)
    return;
  return appendHTML(
    `
      <turbo-boost-devtool name="${name}" slot="devtool">
        <span slot="label">${label}</span>
      </turbo-boost-devtool>
    `,
    supervisorElement
  );
}
function enabled(name) {
  if (!supervisorElement)
    return false;
  return supervisorElement.enabledDevtools[name];
}
var supervisor_default = {
  enabled,
  register,
  start,
  stop,
  restart: debouncedRestart,
  get started() {
    return started();
  },
  get stopped() {
    return stopped();
  }
};

// app/javascript/elements/toggle_elements/trigger_element/devtool.js
var activeToggle;
document.addEventListener(
  "turbo-boost:devtools-start",
  () => supervisor_default.register("toggle", "toggles")
);
function appendTooltip(title, subtitle, content, options = {}) {
  let { backgroundColor, color, position } = options;
  color = color || "white";
  position = position || "top";
  return appendHTML(`
    <turbo-boost-devtool-tooltip position="${position}" background-color="${backgroundColor}" color="${color}">
      <div slot='title'>${title}</div>
      <div slot='subtitle'>${subtitle}</div>
      ${content}
    </turbo-boost-devtool-tooltip>
  `);
}
var Devtool = class {
  constructor(triggerElement) {
    this.name = "toggle";
    this.command = triggerElement.dataset.turboCommand;
    this.triggerElement = triggerElement;
    this.targetElement = triggerElement.targetElement;
    this.morphElement = triggerElement.morphElement;
    document.addEventListener("turbo-boost:devtool-enable", (event) => {
      const { name } = event.detail;
      if (name === this.name) {
        addHighlight(this.triggerElement, {
          outline: "3px dashed blueviolet",
          outlineOffset: "2px"
        });
      }
    });
    document.addEventListener("turbo-boost:devtool-disable", (event) => {
      const { name } = event.detail;
      if (name === this.name)
        removeHighlight(this.triggerElement);
    });
    let hideTimeout;
    const debouncedHide = () => {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(this.hide(true), 25);
    };
    addEventListener("click", (event) => {
      if (event.target.closest("turbo-boost-devtool-tooltip"))
        return;
      debouncedHide();
    });
    addEventListener("turbo:load", debouncedHide);
    addEventListener("turbo-frame:load", debouncedHide);
    addEventListener(TurboBoost.Commands.events.success, debouncedHide);
    addEventListener(TurboBoost.Commands.events.finish, debouncedHide);
  }
  get enabled() {
    return supervisor_default.enabled(this.name);
  }
  show() {
    if (!this.enabled)
      return;
    if (activeToggle === this)
      return;
    activeToggle = this;
    this.hide();
    addHighlight(this.targetElement, {
      outline: "3px dashed darkcyan",
      outlineOffset: "-2px"
    });
    addHighlight(this.triggerElement.morphElement, {
      outline: "3px dashed chocolate",
      outlineOffset: "3px"
    });
    const morphTooltip = this.createMorphTooltip();
    const targetTooltip = this.createTargetTooltip();
    this.createTriggerTooltip(targetTooltip, morphTooltip);
    document.querySelectorAll(".leader-line").forEach((el) => el.style.zIndex = 1e5);
    const data = {
      morph: {
        partial: this.triggerElement.renders,
        id: this.triggerElement.morphs,
        status: this.morphElement ? "OK" : "Not Found"
      },
      trigger: { partial: null, id: null, status: "Not Found" },
      target: { partial: null, id: null, status: "Not Found" }
    };
    if (this.triggerElement) {
      data.trigger = {
        partial: this.triggerElement.partial,
        id: this.triggerElement.id,
        status: "OK"
      };
      data.target.id = this.triggerElement.controls;
    }
    if (this.targetElement)
      data.target = {
        partial: this.targetElement.partial,
        dom_id: this.targetElement.id,
        status: "OK"
      };
    console.table(data);
  }
  hide(clearActiveToggle) {
    document.querySelectorAll(".leader-line").forEach((el) => el.remove());
    document.querySelectorAll("turbo-boost-devtool-tooltip").forEach((el) => el.remove());
    document.querySelectorAll("[data-turbo-boost-highlight]").forEach((el) => {
      if (!el.tagName.match(/turbo-boost-toggle-trigger/i))
        removeHighlight(el);
    });
    if (clearActiveToggle)
      activeToggle = null;
  }
  createMorphTooltip() {
    if (!this.triggerElement.morphs)
      return console.debug(
        `Unable to create the morph tooltip! No element matches the DOM id: '${this.triggerElement.morphs}'`
      );
    const title = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      RENDERING
    `;
    const subtitle = `
      <b>partial</b>: ${this.triggerElement.renders || "unknown"}<br>
      <b>morphs</b>: ${this.triggerElement.morphs || "unknown"}<br>
    `;
    const content = `
      <div slot="content-top" style="font-size:85%; font-style:italic; font-weight:100;">
        The <b>TRIGGER</b> toggles the <b>TARGET</b> then renders the partial &amp; morphs the element.<br>
      </div>
    `;
    const tooltip = appendTooltip(title, subtitle, content, {
      backgroundColor: "lightyellow",
      color: "chocolate"
    });
    const coords = coordinates(this.morphElement);
    const top = Math.ceil(
      coords.top + coords.height / 2 - tooltip.offsetHeight / 2
    );
    const left = Math.ceil(coords.left + coords.width + 100);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.line = new LeaderLine(tooltip, this.morphElement, __spreadProps(__spreadValues({}, this.leaderLineOptions), {
      color: "chocolate"
    }));
    tooltip.drag = new PlainDraggable(tooltip);
    return tooltip;
  }
  createTargetTooltip() {
    if (!this.targetElement)
      return console.debug(
        `Unable to create the target tooltip! No element matches the DOM id: '${this.triggerElement.controls}'`
      );
    const title = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      TARGET
    `;
    const subtitle = `
      <b>id</b>: ${this.targetElement.id}<br>
      <b>aria-labeled-by</b>: ${this.targetElement.labeledBy}<br>
    `;
    let content = this.targetElement.viewStack.reverse().map((view, index) => {
      return this.triggerElement.sharedViews.includes(view) ? `<div slot="content">${index + 1}. ${view}</div>` : `<div slot="content-bottom">${index + 1}. ${view}</div>`;
    }, this).join("");
    content = `
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${content}
    `;
    const tooltip = appendTooltip(title, subtitle, content, {
      backgroundColor: "lightcyan",
      color: "darkcyan",
      position: "bottom"
    });
    const coords = coordinates(this.targetElement);
    const top = Math.ceil(coords.top + tooltip.offsetHeight);
    const left = Math.ceil(coords.left + coords.width + tooltip.offsetWidth / 3);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.line = new LeaderLine(tooltip, this.targetElement, __spreadProps(__spreadValues({}, this.leaderLineOptions), {
      color: "darkcyan"
    }));
    tooltip.drag = new PlainDraggable(tooltip);
    return tooltip;
  }
  createTriggerTooltip(targetTooltip, morphTooltip) {
    if (!this.triggerElement)
      return;
    const title = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      TRIGGER
    `;
    const subtitle = `
      <b>id</b>: ${this.triggerElement.id}<br>
      <b>aria-controls</b>: ${this.triggerElement.controls}<br>
      <b>aria-expanded</b>: ${this.triggerElement.expanded}<br>
      <b>remember</b>: ${this.triggerElement.remember}<br>
    `;
    let content = this.triggerElement.viewStack.reverse().map((view, index) => {
      return this.triggerElement.sharedViews.includes(view) ? `<div slot="content">${index + 1}. ${view}</div>` : `<div slot="content-bottom">${index + 1}. ${view}</div>`;
    }, this).join("");
    content = `
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${content}
    `;
    const tooltip = appendTooltip(title, subtitle, content, {
      backgroundColor: "lavender",
      color: "blueviolet"
    });
    const coords = coordinates(this.triggerElement);
    const top = Math.ceil(coords.top - tooltip.offsetHeight * 2);
    const left = Math.ceil(coords.left + coords.width + tooltip.offsetWidth / 3);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.line = new LeaderLine(this.triggerElement, tooltip, __spreadProps(__spreadValues({}, this.leaderLineOptions), {
      color: "blueviolet"
    }));
    if (targetTooltip) {
      tooltip.lineToTarget = new LeaderLine(tooltip, targetTooltip, __spreadProps(__spreadValues({}, this.leaderLineOptions), {
        color: "blueviolet",
        middleLabel: "toggles",
        size: 2.1
      }));
      targetTooltip.drag.onMove = () => {
        targetTooltip.line.position();
        tooltip.lineToTarget.position();
        tooltip.lineToRendering.position();
      };
    }
    if (morphTooltip) {
      tooltip.lineToRendering = new LeaderLine(tooltip, morphTooltip, __spreadProps(__spreadValues({}, this.leaderLineOptions), {
        color: "blueviolet",
        middleLabel: "renders & morphs",
        size: 2.1
      }));
      morphTooltip.drag.onMove = () => {
        morphTooltip.line.position();
        if (tooltip.lineToTarget)
          tooltip.lineToTarget.position();
        tooltip.lineToRendering.position();
      };
    }
    tooltip.drag = new PlainDraggable(tooltip);
    tooltip.drag.onMove = () => {
      tooltip.line.position();
      if (tooltip.lineToTarget)
        tooltip.lineToTarget.position();
      if (tooltip.lineToRendering)
        tooltip.lineToRendering.position();
    };
    return tooltip;
  }
  get leaderLineOptions() {
    return {
      dash: { animation: true },
      dropShadow: { opacity: 0.3 },
      endPlug: "arrow3",
      endPlugSize: 1.7,
      size: 3,
      startPlug: "disc",
      startPlugSize: 1
    };
  }
};

// app/javascript/elements/toggle_elements/trigger_element/index.js
var ToggleTriggerElement = class extends ToggleElement {
  connectedCallback() {
    super.connectedCallback();
    if (this.targetElement) {
      this.targetElement.setAttribute("aria-labeledby", this.id);
    }
    this.addEventListener(TurboBoost.Commands.events.start, () => {
      this.busy = true;
      this.targetElement.currentTriggerElement = this;
      this.targetElement.renderCachedHTML();
    });
    this.addEventListener(TurboBoost.Commands.events.success, () => {
      this.busy = false;
      this.targetElement.focus();
      this.targetElement.collapseMatches();
      this.targetElement.cacheHTML();
    });
    this.addEventListener(
      TurboBoost.Commands.events.finish,
      () => this.busy = false
    );
    this.initializeDevtool();
  }
  initializeDevtool() {
    const mouseenter = () => this.devtool.show();
    addEventListener("turbo-boost:devtools-start", () => {
      this.devtool = new Devtool(this);
      this.addEventListener("mouseenter", mouseenter);
    });
    addEventListener("turbo-boost:devtools-stop", () => {
      this.removeEventListener("mouseenter", mouseenter);
      delete this.devtool;
    });
    this.dispatchEvent(
      new CustomEvent("turbo-boost:devtools-connect", { bubbles: true })
    );
  }
  hideDevtool() {
    if (this.devtool)
      this.devtool.hide(true);
  }
  // a list of views shared between the trigger and target
  get sharedViews() {
    if (!this.targetElement)
      return [];
    if (!this.targetElement.viewStack)
      return [];
    const reducer = (memo, view) => {
      if (this.targetElement.viewStack.includes(view))
        memo.push(view);
      return memo;
    };
    return this.viewStack.reduce(reducer.bind(this), []);
  }
  // the partial to render
  get renders() {
    return this.getAttribute("renders");
  }
  // the renderered partial's top wrapping dom_id
  get morphs() {
    return this.getAttribute("morphs");
  }
  // the morph element
  get morphElement() {
    if (!this.morphs)
      return null;
    return document.getElementById(this.morphs);
  }
  // the target's dom_id
  get controls() {
    return this.getAttribute("aria-controls");
  }
  // the target element
  get targetElement() {
    if (!this.controls)
      return null;
    return document.getElementById(this.controls);
  }
  get collapseSelector() {
    return this.getAttribute("collapse-selector");
  }
  get focusSelector() {
    return this.getAttribute("focus-selector");
  }
  // indicates if the toggle state should be remembered across requests
  get remember() {
    return this.getAttribute("remember") === "true";
  }
  set remember(value) {
    return this.setAttribute("remember", !!value);
  }
  // indicates if the target is expanded
  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }
  set expanded(value) {
    this.setAttribute("aria-expanded", !!value);
  }
  // indicates if the target is expanded
  get collapsed() {
    return !this.expanded;
  }
};

// app/javascript/elements/index.js
customElements.define("turbo-boost", TurboBoostElement);
customElements.define("turbo-boost-toggle-target", ToggleTargetElement);
customElements.define("turbo-boost-toggle-trigger", ToggleTriggerElement);

// app/javascript/devtools/index.js
var { restart: restart2, start: start2, stop: stop2 } = supervisor_default;
var devtools_default = { restart: restart2, start: start2, stop: stop2 };

// app/javascript/index.js
self.TurboBoost = self.TurboBoost || {};
self.TurboBoost.devtools = devtools_default;
self.TurboBoost.Elements = {};
var javascript_default = self.TurboBoost.Elements;
export {
  javascript_default as default
};
//# sourceMappingURL=elements.js.map
