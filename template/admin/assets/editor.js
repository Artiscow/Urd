var yi = Object.defineProperty;
var ir = (e) => {
  throw TypeError(e);
};
var bi = (e, t, n) => t in e ? yi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => bi(e, typeof t != "symbol" ? t + "" : t, n), yn = (e, t, n) => t.has(e) || ir("Cannot " + n);
var l = (e, t, n) => (yn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), E = (e, t, n) => t.has(e) ? ir("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), y = (e, t, n, r) => (yn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), I = (e, t, n) => (yn(e, t, "access private method"), n);
var jn = Array.isArray, Ei = Array.prototype.indexOf, an = Array.prototype.includes, gn = Array.from, Si = Object.defineProperty, Ht = Object.getOwnPropertyDescriptor, ki = Object.getOwnPropertyDescriptors, xi = Object.prototype, Ti = Array.prototype, Sr = Object.getPrototypeOf, sr = Object.isExtensible;
const Mi = () => {
};
function Ai(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function kr() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const j = 2, xt = 4, wn = 8, xr = 1 << 24, we = 16, be = 32, Fe = 64, Mn = 128, fe = 512, L = 1024, q = 2048, ye = 4096, Y = 8192, oe = 16384, Nt = 32768, An = 1 << 25, Tt = 65536, fn = 1 << 17, Ii = 1 << 18, Ot = 1 << 19, Ni = 1 << 20, Le = 1 << 25, lt = 65536, on = 1 << 21, _t = 1 << 22, Be = 1 << 23, gt = Symbol("$state"), Oi = Symbol(""), tn = Symbol("attributes"), Di = Symbol("class"), Pi = Symbol("style"), Ct = Symbol("text"), Kt = new class extends Error {
  constructor() {
    super(...arguments);
    X(this, "name", "StaleReactionError");
    X(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var yr;
const Ri = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((yr = globalThis.document) != null && yr.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Ci() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Li(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Fi() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function qi() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ji() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Hi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ui() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Gi = 1, Bi = 2, zi = 16, Vi = 1, Yi = 2, C = Symbol("uninitialized"), $i = "http://www.w3.org/1999/xhtml";
function Ji() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Ki() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Wi() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Tr(e) {
  return e === this.v;
}
function Xi(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Mr(e) {
  return !Xi(e, this.v);
}
let ue = null;
function Mt(e) {
  ue = e;
}
function Ar(e, t = !1, n) {
  ue = {
    p: ue,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      T
    ),
    l: null
  };
}
function Ir(e) {
  var t = (
    /** @type {ComponentContext} */
    ue
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Ss(r);
  }
  return t.i = !0, ue = t.p, /** @type {T} */
  {};
}
function Nr() {
  return !0;
}
let ht = [];
function Zi() {
  var e = ht;
  ht = [], Ai(e);
}
function tt(e) {
  if (ht.length === 0) {
    var t = ht;
    queueMicrotask(() => {
      t === ht && Zi();
    });
  }
  ht.push(e);
}
function Or(e) {
  var t = T;
  if (t === null)
    return k.f |= Be, e;
  if ((t.f & Nt) === 0 && (t.f & xt) === 0)
    throw e;
  Ge(e, t);
}
function Ge(e, t) {
  if (!(t !== null && (t.f & oe) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & Mn) !== 0) {
        if ((t.f & Nt) === 0)
          throw e;
        try {
          t.b.error(e);
          return;
        } catch (n) {
          e = n;
        }
      }
      t = t.parent;
    }
    throw e;
  }
}
const Qi = -7169;
function R(e, t) {
  e.f = e.f & Qi | t;
}
function Hn(e) {
  (e.f & fe) !== 0 || e.deps === null ? R(e, L) : R(e, ye);
}
function Dr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & j) === 0 || (t.f & lt) === 0 || (t.f ^= lt, Dr(
        /** @type {Derived} */
        t.deps
      ));
}
function Pr(e, t, n) {
  (e.f & q) !== 0 ? t.add(e) : (e.f & ye) !== 0 && n.add(e), Dr(e.deps), R(e, L);
}
function Wt(e) {
  var t = k, n = T;
  ce(null), Me(null);
  try {
    return e();
  } finally {
    ce(t), Me(n);
  }
}
function es(e) {
  let t = 0, n = ft(0), r;
  return () => {
    zn() && (m(n), Kr(() => (t === 0 && (r = li(() => e(() => Gt(n)))), t += 1, () => {
      tt(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Gt(n));
      });
    })));
  };
}
var ts = Tt | Ot;
function ns(e, t, n, r) {
  new rs(e, t, n, r);
}
var ie, qn, se, We, $, le, z, Q, De, Xe, He, wt, zt, Vt, Pe, vn, P, is, ss, ls, In, nn, rn, Nn, On;
class rs {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    E(this, P);
    /** @type {Boundary | null} */
    X(this, "parent");
    X(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    X(this, "transform_error");
    /** @type {TemplateNode} */
    E(this, ie);
    /** @type {TemplateNode | null} */
    E(this, qn, null);
    /** @type {BoundaryProps} */
    E(this, se);
    /** @type {((anchor: Node) => void)} */
    E(this, We);
    /** @type {Effect} */
    E(this, $);
    /** @type {Effect | null} */
    E(this, le, null);
    /** @type {Effect | null} */
    E(this, z, null);
    /** @type {Effect | null} */
    E(this, Q, null);
    /** @type {DocumentFragment | null} */
    E(this, De, null);
    E(this, Xe, 0);
    E(this, He, 0);
    E(this, wt, !1);
    /** @type {Set<Effect>} */
    E(this, zt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    E(this, Vt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    E(this, Pe, null);
    E(this, vn, es(() => (y(this, Pe, ft(l(this, Xe))), () => {
      y(this, Pe, null);
    })));
    var s;
    y(this, ie, t), y(this, se, n), y(this, We, (o) => {
      var a = (
        /** @type {Effect} */
        T
      );
      a.b = this, a.f |= Mn, r(o);
    }), this.parent = /** @type {Effect} */
    T.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((o) => o), y(this, $, Yn(() => {
      I(this, P, In).call(this);
    }, ts));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Pr(t, l(this, zt), l(this, Vt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!l(this, se).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    I(this, P, Nn).call(this, t, n), y(this, Xe, l(this, Xe) + t), !(!l(this, Pe) || l(this, wt)) && (y(this, wt, !0), tt(() => {
      y(this, wt, !1), l(this, Pe) && At(l(this, Pe), l(this, Xe));
    }));
  }
  get_effect_pending() {
    return l(this, vn).call(this), m(
      /** @type {Source<number>} */
      l(this, Pe)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!l(this, se).onerror && !l(this, se).failed)
      throw t;
    b != null && b.is_fork ? (l(this, le) && b.skip_effect(l(this, le)), l(this, z) && b.skip_effect(l(this, z)), l(this, Q) && b.skip_effect(l(this, Q)), b.oncommit(() => {
      I(this, P, On).call(this, t);
    })) : I(this, P, On).call(this, t);
  }
}
ie = new WeakMap(), qn = new WeakMap(), se = new WeakMap(), We = new WeakMap(), $ = new WeakMap(), le = new WeakMap(), z = new WeakMap(), Q = new WeakMap(), De = new WeakMap(), Xe = new WeakMap(), He = new WeakMap(), wt = new WeakMap(), zt = new WeakMap(), Vt = new WeakMap(), Pe = new WeakMap(), vn = new WeakMap(), P = new WeakSet(), is = function() {
  try {
    y(this, le, ae(() => l(this, We).call(this, l(this, ie))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
ss = function(t) {
  const n = l(this, se).failed;
  n && y(this, Q, ae(() => {
    n(
      l(this, ie),
      () => t,
      () => () => {
      }
    );
  }));
}, ls = function() {
  const t = l(this, se).pending;
  t && (this.is_pending = !0, y(this, z, ae(() => t(l(this, ie)))), tt(() => {
    var n = y(this, De, document.createDocumentFragment()), r = rt();
    n.append(r), y(this, le, I(this, P, rn).call(this, () => ae(() => l(this, We).call(this, r)))), l(this, He) === 0 && (l(this, ie).before(n), y(this, De, null), it(
      /** @type {Effect} */
      l(this, z),
      () => {
        y(this, z, null);
      }
    ), I(this, P, nn).call(
      this,
      /** @type {Batch} */
      b
    ));
  }));
}, In = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), y(this, He, 0), y(this, Xe, 0), y(this, le, ae(() => {
      l(this, We).call(this, l(this, ie));
    })), l(this, He) > 0) {
      var t = y(this, De, document.createDocumentFragment());
      Jn(l(this, le), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        l(this, se).pending
      );
      y(this, z, ae(() => n(l(this, ie))));
    } else
      I(this, P, nn).call(
        this,
        /** @type {Batch} */
        b
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
nn = function(t) {
  this.is_pending = !1, t.transfer_effects(l(this, zt), l(this, Vt));
}, /**
 * @template T
 * @param {() => T} fn
 */
rn = function(t) {
  var n = T, r = k, i = ue;
  Me(l(this, $)), ce(l(this, $)), Mt(l(this, $).ctx);
  try {
    return at.ensure(), t();
  } catch (s) {
    return Or(s), null;
  } finally {
    Me(n), ce(r), Mt(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Nn = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && I(r = this.parent, P, Nn).call(r, t, n);
    return;
  }
  y(this, He, l(this, He) + t), l(this, He) === 0 && (I(this, P, nn).call(this, n), l(this, z) && it(l(this, z), () => {
    y(this, z, null);
  }), l(this, De) && (l(this, ie).before(l(this, De)), y(this, De, null)));
}, /**
 * @param {unknown} error
 */
On = function(t) {
  l(this, le) && (W(l(this, le)), y(this, le, null)), l(this, z) && (W(l(this, z)), y(this, z, null)), l(this, Q) && (W(l(this, Q)), y(this, Q, null));
  var n = l(this, se).onerror;
  let r = l(this, se).failed;
  var i = !1, s = !1;
  const o = () => {
    if (i) {
      Wi();
      return;
    }
    i = !0, s && Ui(), l(this, Q) !== null && it(l(this, Q), () => {
      y(this, Q, null);
    }), I(this, P, rn).call(this, () => {
      I(this, P, In).call(this);
    });
  }, a = (u) => {
    try {
      s = !0, n == null || n(u, o), s = !1;
    } catch (f) {
      Ge(f, l(this, $) && l(this, $).parent);
    }
    r && y(this, Q, I(this, P, rn).call(this, () => {
      try {
        return ae(() => {
          var f = (
            /** @type {Effect} */
            T
          );
          f.b = this, f.f |= Mn, r(
            l(this, ie),
            () => u,
            () => o
          );
        });
      } catch (f) {
        return Ge(
          f,
          /** @type {Effect} */
          l(this, $).parent
        ), null;
      }
    }));
  };
  tt(() => {
    var u;
    try {
      u = this.transform_error(t);
    } catch (f) {
      Ge(f, l(this, $) && l(this, $).parent);
      return;
    }
    u !== null && typeof u == "object" && typeof /** @type {any} */
    u.then == "function" ? u.then(
      a,
      /** @param {unknown} e */
      (f) => Ge(f, l(this, $) && l(this, $).parent)
    ) : a(u);
  });
};
function as(e, t, n, r) {
  const i = Cr;
  var s = e.filter((p) => !p.settled), o = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(o);
    return;
  }
  var a = (
    /** @type {Effect} */
    T
  ), u = fs(), f = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((p) => p.promise)) : null;
  function v(p) {
    if ((a.f & oe) === 0) {
      u();
      try {
        r([...o, ...p]);
      } catch (h) {
        Ge(h, a);
      }
      un();
    }
  }
  var d = Rr();
  if (n.length === 0) {
    f.then(() => v([])).finally(d);
    return;
  }
  function c() {
    Promise.all(n.map((p) => /* @__PURE__ */ os(p))).then(v).catch((p) => Ge(p, a)).finally(d);
  }
  f ? f.then(() => {
    u(), c(), un();
  }) : c();
}
function fs() {
  var e = (
    /** @type {Effect} */
    T
  ), t = k, n = ue, r = (
    /** @type {Batch} */
    b
  );
  return function(s = !0) {
    Me(e), ce(t), Mt(n), s && (e.f & oe) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function un(e = !0) {
  Me(null), ce(null), Mt(null), e && (b == null || b.deactivate());
}
function Rr() {
  var e = (
    /** @type {Effect} */
    T
  ), t = e.b, n = (
    /** @type {Batch} */
    b
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Cr(e) {
  var t = j | q;
  return T !== null && (T.f |= Ot), {
    ctx: ue,
    deps: null,
    effects: null,
    equals: Tr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      C
    ),
    wv: 0,
    parent: T,
    ac: null
  };
}
const Lt = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function os(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    T
  );
  r === null && Ci();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ft(
    /** @type {V} */
    C
  ), o = !k, a = /* @__PURE__ */ new Set();
  return Ts(() => {
    var p, h;
    var u = (
      /** @type {Effect} */
      T
    ), f = kr();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, (w) => {
        w !== Kt && f.reject(w);
      }).finally(un);
    } catch (w) {
      f.reject(w), un();
    }
    var v = (
      /** @type {Batch} */
      b
    );
    if (o) {
      if ((u.f & Nt) !== 0)
        var d = Rr();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (h = v.async_deriveds.get(u)) == null || h.reject(Lt);
      else
        for (const w of a.values())
          w.reject(Lt);
      a.add(f), v.async_deriveds.set(u, f);
    }
    const c = (w, M = void 0) => {
      d == null || d(), a.delete(f), M !== Lt && (v.activate(), M ? (s.f |= Be, At(s, M)) : ((s.f & Be) !== 0 && (s.f ^= Be), At(s, w)), v.deactivate());
    };
    f.promise.then(c, (w) => c(null, w || "unknown"));
  }), Vn(() => {
    for (const u of a)
      u.reject(Lt);
  }), new Promise((u) => {
    function f(v) {
      function d() {
        v === i ? u(s) : f(i);
      }
      v.then(d, d);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function us(e) {
  const t = /* @__PURE__ */ Cr(e);
  return t.equals = Mr, t;
}
function cs(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      W(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Un(e) {
  var t, n = T, r = e.parent;
  if (!ot && r !== null && e.v !== C && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (oe | Y)) !== 0)
    return Ji(), e.v;
  Me(r);
  try {
    e.f &= ~lt, cs(e), t = ri(e);
  } finally {
    Me(n);
  }
  return t;
}
function Lr(e) {
  var t = Un(e);
  if (!e.equals(t) && (e.wv = ti(), (!(b != null && b.is_fork) || e.deps === null) && (b !== null ? (b.capture(e, t, !0), Ut == null || Ut.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    R(e, L);
    return;
  }
  ot || (U !== null ? (zn() || b != null && b.is_fork) && U.set(e, t) : Hn(e));
}
function ds(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && Wt(() => {
        n.ac.abort(Kt), n.ac = null;
      }), n.fn !== null && (n.teardown = Mi), Bt(n, 0), $n(n));
}
function Fr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && It(t);
}
let bn = null, ut = null, b = null, Ut = null, U = null, Dn = null, En = !1, vt = null, sn = null;
var lr = 0;
let hs = 1;
var mt, Ue, Ze, yt, bt, Et, Re, St, J, Yt, Ce, _e, ke, kt, Qe, O, Pn, Ft, Rn, qr, jr, dt, vs, qt;
const pn = class pn {
  constructor() {
    E(this, O);
    X(this, "id", hs++);
    /** True as soon as `#process` was called */
    E(this, mt, !1);
    X(this, "linked", !0);
    /** @type {Batch | null} */
    E(this, Ue, null);
    /** @type {Batch | null} */
    E(this, Ze, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    X(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    X(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    X(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    E(this, yt, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    E(this, bt, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    E(this, Et, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    E(this, Re, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    E(this, St, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    E(this, J, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    E(this, Yt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    E(this, Ce, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    E(this, _e, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    E(this, ke, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    E(this, kt, /* @__PURE__ */ new Set());
    X(this, "is_fork", !1);
    E(this, Qe, !1);
    ut === null ? bn = ut = this : (y(ut, Ze, this), y(this, Ue, ut)), ut = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    l(this, ke).has(t) || l(this, ke).set(t, { d: [], m: [] }), l(this, kt).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = l(this, ke).get(t);
    if (r) {
      l(this, ke).delete(t);
      for (var i of r.d)
        R(i, q), n(i);
      for (i of r.m)
        R(i, ye), n(i);
    }
    l(this, kt).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== C && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & Be) === 0 && (this.current.set(t, [n, r]), U == null || U.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    b = this;
  }
  deactivate() {
    b = null, U = null;
  }
  flush() {
    try {
      En = !0, b = this, I(this, O, Ft).call(this);
    } finally {
      lr = 0, Dn = null, vt = null, sn = null, En = !1, b = null, U = null, nt.clear();
    }
  }
  discard() {
    var t;
    for (const n of l(this, bt)) n(this);
    l(this, bt).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Lt);
    I(this, O, qt).call(this), (t = l(this, St)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    l(this, Yt).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (y(this, Et, l(this, Et) + 1), t) {
      let r = l(this, Re).get(n) ?? 0;
      l(this, Re).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (y(this, Et, l(this, Et) - 1), t) {
      let r = l(this, Re).get(n) ?? 0;
      r === 1 ? l(this, Re).delete(n) : l(this, Re).set(n, r - 1);
    }
    l(this, Qe) || (y(this, Qe, !0), tt(() => {
      y(this, Qe, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      l(this, Ce).add(r);
    for (const r of n)
      l(this, _e).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    l(this, yt).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    l(this, bt).add(t);
  }
  settled() {
    return (l(this, St) ?? y(this, St, kr())).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new pn();
      En || tt(() => {
        l(t, mt) || t.flush();
      });
    }
    return b;
  }
  apply() {
    {
      U = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (Dn = t, (i = t.b) != null && i.is_pending && (t.f & (xt | wn | xr)) !== 0 && (t.f & Nt) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (vt !== null && n === T && (k === null || (k.f & j) === 0))
        return;
      if ((r & (Fe | be)) !== 0) {
        if ((r & L) === 0)
          return;
        n.f ^= L;
      }
    }
    l(this, J).push(n);
  }
};
mt = new WeakMap(), Ue = new WeakMap(), Ze = new WeakMap(), yt = new WeakMap(), bt = new WeakMap(), Et = new WeakMap(), Re = new WeakMap(), St = new WeakMap(), J = new WeakMap(), Yt = new WeakMap(), Ce = new WeakMap(), _e = new WeakMap(), ke = new WeakMap(), kt = new WeakMap(), Qe = new WeakMap(), O = new WeakSet(), Pn = function() {
  if (this.is_fork) return !0;
  for (const r of l(this, Re).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (l(this, ke).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Ft = function() {
  var u, f, v, d;
  y(this, mt, !0), lr++ > 1e3 && (I(this, O, qt).call(this), ps());
  for (const c of l(this, Ce))
    l(this, _e).delete(c), R(c, q), this.schedule(c);
  for (const c of l(this, _e))
    R(c, ye), this.schedule(c);
  const t = l(this, J);
  y(this, J, []), this.apply();
  var n = vt = [], r = [], i = sn = [];
  for (const c of t)
    try {
      I(this, O, Rn).call(this, c, n, r);
    } catch (p) {
      throw Gr(c), I(this, O, Pn).call(this) || this.discard(), p;
    }
  if (b = null, i.length > 0) {
    var s = pn.ensure();
    for (const c of i)
      s.schedule(c);
  }
  if (vt = null, sn = null, I(this, O, Pn).call(this)) {
    I(this, O, dt).call(this, r), I(this, O, dt).call(this, n);
    for (const [c, p] of l(this, ke))
      Ur(c, p);
    i.length > 0 && /** @type {unknown} */
    I(u = b, O, Ft).call(u);
    return;
  }
  const o = I(this, O, qr).call(this);
  if (o) {
    I(this, O, dt).call(this, r), I(this, O, dt).call(this, n), I(f = o, O, jr).call(f, this);
    return;
  }
  l(this, Ce).clear(), l(this, _e).clear();
  for (const c of l(this, yt)) c(this);
  l(this, yt).clear(), Ut = this, ar(r), ar(n), Ut = null, (v = l(this, St)) == null || v.resolve();
  var a = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    b
  );
  if (l(this, Et) === 0 && (l(this, J).length === 0 || a !== null) && I(this, O, qt).call(this), l(this, J).length > 0)
    if (a !== null) {
      const c = a;
      l(c, J).push(...l(this, J).filter((p) => !l(c, J).includes(p)));
    } else
      a = this;
  a !== null && I(d = a, O, Ft).call(d);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Rn = function(t, n, r) {
  t.f ^= L;
  for (var i = t.first; i !== null; ) {
    var s = i.f, o = (s & (be | Fe)) !== 0, a = o && (s & L) !== 0, u = a || (s & Y) !== 0 || l(this, ke).has(i);
    if (!u && i.fn !== null) {
      o ? i.f ^= L : (s & xt) !== 0 ? n.push(i) : Zt(i) && ((s & we) !== 0 && l(this, _e).add(i), It(i));
      var f = i.first;
      if (f !== null) {
        i = f;
        continue;
      }
    }
    for (; i !== null; ) {
      var v = i.next;
      if (v !== null) {
        i = v;
        break;
      }
      i = i.parent;
    }
  }
}, qr = function() {
  for (var t = l(this, Ue); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = l(t, Ue);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
jr = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const o = this.async_deriveds.get(i);
    o && s.promise.then(o.resolve).catch(o.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(l(t, Ce), l(t, _e));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & j) !== 0 && (i.f & (q | ye)) === 0))
      for (const u of s) {
        var o = u.f;
        if ((o & j) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var a = (
            /** @type {Effect} */
            u
          );
          o & (_t | we) && !this.async_deriveds.has(a) && (l(this, _e).delete(a), R(a, q), this.schedule(a));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), I(r = t, O, qt).call(r), b = this, I(this, O, Ft).call(this);
}, /**
 * @param {Effect[]} effects
 */
dt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Pr(t[n], l(this, Ce), l(this, _e));
}, vs = function() {
  var d;
  for (let c = bn; c !== null; c = l(c, Ze)) {
    var t = c.id < this.id, n = [];
    for (const [p, [h, w]] of this.current) {
      if (c.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          c.current.get(p)[0]
        );
        if (t && h !== r)
          c.current.set(p, [h, w]);
        else
          continue;
      }
      n.push(p);
    }
    if (t)
      for (const [p, h] of this.async_deriveds) {
        const w = c.async_deriveds.get(p);
        w && h.promise.then(w.resolve).catch(w.reject);
      }
    var i = [...c.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      c.current.get(p)[1]
    );
    if (!(!l(c, mt) || i.length === 0)) {
      var s = i.filter((p) => !this.current.has(p));
      if (s.length === 0)
        t && c.discard();
      else if (n.length > 0) {
        if (t)
          for (const p of l(this, kt))
            c.unskip_effect(p, (h) => {
              var w;
              (h.f & (we | _t)) !== 0 ? c.schedule(h) : I(w = c, O, dt).call(w, [h]);
            });
        c.activate();
        var o = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
        for (var u of n)
          Hr(u, s, o, a);
        a = /* @__PURE__ */ new Map();
        var f = [...c.current].filter(([p, h]) => {
          const w = this.current.get(p);
          return w ? w[0] !== h[0] || w[1] !== h[1] : !0;
        }).map(([p]) => p);
        if (f.length > 0)
          for (const p of l(this, Yt))
            (p.f & (oe | Y | fn)) === 0 && Gn(p, f, a) && ((p.f & (_t | we)) !== 0 ? (R(p, q), c.schedule(p)) : l(c, Ce).add(p));
        if (l(c, J).length > 0 && !l(c, Qe)) {
          c.apply();
          for (var v of l(c, J))
            I(d = c, O, Rn).call(d, v, [], []);
          y(c, J, []);
        }
        c.deactivate();
      }
    }
  }
}, qt = function() {
  if (this.linked) {
    var t = l(this, Ue), n = l(this, Ze);
    t === null ? bn = n : y(t, Ze, n), n === null ? ut = t : y(n, Ue, t), this.linked = !1;
  }
};
let at = pn;
function ps() {
  try {
    Fi();
  } catch (e) {
    Ge(e, Dn);
  }
}
let pe = null;
function ar(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (oe | Y)) === 0 && Zt(r) && (pe = /* @__PURE__ */ new Set(), It(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Xr(r), (pe == null ? void 0 : pe.size) > 0)) {
        nt.clear();
        for (const i of pe) {
          if ((i.f & (oe | Y)) !== 0) continue;
          const s = [i];
          let o = i.parent;
          for (; o !== null; )
            pe.has(o) && (pe.delete(o), s.push(o)), o = o.parent;
          for (let a = s.length - 1; a >= 0; a--) {
            const u = s[a];
            (u.f & (oe | Y)) === 0 && It(u);
          }
        }
        pe.clear();
      }
    }
    pe = null;
  }
}
function Hr(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & j) !== 0 ? Hr(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (_t | we)) !== 0 && (s & q) === 0 && Gn(i, t, r) && (R(i, q), Bn(
        /** @type {Effect} */
        i
      ));
    }
}
function Gn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (an.call(t, i))
        return !0;
      if ((i.f & j) !== 0 && Gn(
        /** @type {Derived} */
        i,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Bn(e) {
  b.schedule(e);
}
function Ur(e, t) {
  if (!((e.f & be) !== 0 && (e.f & L) !== 0)) {
    (e.f & q) !== 0 ? t.d.push(e) : (e.f & ye) !== 0 && t.m.push(e), R(e, L);
    for (var n = e.first; n !== null; )
      Ur(n, t), n = n.next;
  }
}
function Gr(e) {
  R(e, L);
  for (var t = e.first; t !== null; )
    Gr(t), t = t.next;
}
let cn = /* @__PURE__ */ new Set();
const nt = /* @__PURE__ */ new Map();
let Br = !1;
function ft(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Tr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function V(e, t) {
  const n = ft(e);
  return Is(n), n;
}
// @__NO_SIDE_EFFECTS__
function _s(e, t = !1, n = !0) {
  const r = ft(e);
  return t || (r.equals = Mr), r;
}
function D(e, t, n = !1) {
  k !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!me || (k.f & fn) !== 0) && Nr() && (k.f & (j | we | _t | fn)) !== 0 && (Te === null || !Te.has(e)) && Hi();
  let r = n ? pt(t) : t;
  return At(e, r, sn);
}
function At(e, t, n = null) {
  if (!e.equals(t)) {
    nt.set(e, ot ? t : e.v);
    var r = at.ensure();
    if (r.capture(e, t), (e.f & j) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & q) !== 0 && Un(i), U === null && Hn(i);
    }
    e.wv = ti(), zr(e, q, n), T !== null && (T.f & L) !== 0 && (T.f & (be | Fe)) === 0 && (re === null ? Ns([e]) : re.push(e)), !r.is_fork && cn.size > 0 && !Br && gs();
  }
  return t;
}
function gs() {
  Br = !1;
  for (const e of cn) {
    (e.f & L) !== 0 && R(e, ye);
    let t;
    try {
      t = Zt(e);
    } catch {
      t = !0;
    }
    t && It(e);
  }
  cn.clear();
}
function Gt(e) {
  D(e, e.v + 1);
}
function zr(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var o = r[s], a = o.f, u = (a & q) === 0;
      if (u && R(o, t), (a & fn) !== 0)
        cn.add(
          /** @type {Effect} */
          o
        );
      else if ((a & j) !== 0) {
        var f = (
          /** @type {Derived} */
          o
        );
        U == null || U.delete(f), (a & lt) === 0 && (a & fe && (T === null || (T.f & on) === 0) && (o.f |= lt), zr(f, ye, n));
      } else if (u) {
        var v = (
          /** @type {Effect} */
          o
        );
        (a & we) !== 0 && pe !== null && pe.add(v), n !== null ? n.push(v) : Bn(v);
      }
    }
}
function pt(e) {
  if (typeof e != "object" || e === null || gt in e)
    return e;
  const t = Sr(e);
  if (t !== xi && t !== Ti)
    return e;
  var n = /* @__PURE__ */ new Map(), r = jn(e), i = /* @__PURE__ */ V(0), s = st, o = (a) => {
    if (st === s)
      return a();
    var u = k, f = st;
    ce(null), dr(s);
    var v = a();
    return ce(u), dr(f), v;
  };
  return r && n.set("length", /* @__PURE__ */ V(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, u, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && qi();
        var v = n.get(u);
        return v === void 0 ? o(() => {
          var d = /* @__PURE__ */ V(f.value);
          return n.set(u, d), d;
        }) : D(v, f.value, !0), !0;
      },
      deleteProperty(a, u) {
        var f = n.get(u);
        if (f === void 0) {
          if (u in a) {
            const v = o(() => /* @__PURE__ */ V(C));
            n.set(u, v), Gt(i);
          }
        } else
          D(f, C), Gt(i);
        return !0;
      },
      get(a, u, f) {
        var p;
        if (u === gt)
          return e;
        var v = n.get(u), d = u in a;
        if (v === void 0 && (!d || (p = Ht(a, u)) != null && p.writable) && (v = o(() => {
          var h = pt(d ? a[u] : C), w = /* @__PURE__ */ V(h);
          return w;
        }), n.set(u, v)), v !== void 0) {
          var c = m(v);
          return c === C ? void 0 : c;
        }
        return Reflect.get(a, u, f);
      },
      getOwnPropertyDescriptor(a, u) {
        var f = Reflect.getOwnPropertyDescriptor(a, u);
        if (f && "value" in f) {
          var v = n.get(u);
          v && (f.value = m(v));
        } else if (f === void 0) {
          var d = n.get(u), c = d == null ? void 0 : d.v;
          if (d !== void 0 && c !== C)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return f;
      },
      has(a, u) {
        var c;
        if (u === gt)
          return !0;
        var f = n.get(u), v = f !== void 0 && f.v !== C || Reflect.has(a, u);
        if (f !== void 0 || T !== null && (!v || (c = Ht(a, u)) != null && c.writable)) {
          f === void 0 && (f = o(() => {
            var p = v ? pt(a[u]) : C, h = /* @__PURE__ */ V(p);
            return h;
          }), n.set(u, f));
          var d = m(f);
          if (d === C)
            return !1;
        }
        return v;
      },
      set(a, u, f, v) {
        var G;
        var d = n.get(u), c = u in a;
        if (r && u === "length")
          for (var p = f; p < /** @type {Source<number>} */
          d.v; p += 1) {
            var h = n.get(p + "");
            h !== void 0 ? D(h, C) : p in a && (h = o(() => /* @__PURE__ */ V(C)), n.set(p + "", h));
          }
        if (d === void 0)
          (!c || (G = Ht(a, u)) != null && G.writable) && (d = o(() => /* @__PURE__ */ V(void 0)), D(d, pt(f)), n.set(u, d));
        else {
          c = d.v !== C;
          var w = o(() => pt(f));
          D(d, w);
        }
        var M = Reflect.getOwnPropertyDescriptor(a, u);
        if (M != null && M.set && M.set.call(v, f), !c) {
          if (r && typeof u == "string") {
            var A = (
              /** @type {Source<number>} */
              n.get("length")
            ), N = Number(u);
            Number.isInteger(N) && N >= A.v && D(A, N + 1);
          }
          Gt(i);
        }
        return !0;
      },
      ownKeys(a) {
        m(i);
        var u = Reflect.ownKeys(a).filter((d) => {
          var c = n.get(d);
          return c === void 0 || c.v !== C;
        });
        for (var [f, v] of n)
          v.v !== C && !(f in a) && u.push(f);
        return u;
      },
      setPrototypeOf() {
        ji();
      }
    }
  );
}
function fr(e) {
  try {
    if (e !== null && typeof e == "object" && gt in e)
      return e[gt];
  } catch {
  }
  return e;
}
function ws(e, t) {
  return Object.is(fr(e), fr(t));
}
var or, Vr, Yr, $r;
function ms() {
  if (or === void 0) {
    or = window, Vr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Yr = Ht(t, "firstChild").get, $r = Ht(t, "nextSibling").get, sr(e) && (e[Di] = void 0, e[tn] = null, e[Pi] = void 0, e.__e = void 0), sr(n) && (n[Ct] = void 0);
  }
}
function rt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function dn(e) {
  return (
    /** @type {TemplateNode | null} */
    Yr.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
  return (
    /** @type {TemplateNode | null} */
    $r.call(e)
  );
}
function ve(e, t) {
  return /* @__PURE__ */ dn(e);
}
function ur(e, t = !1) {
  {
    var n = /* @__PURE__ */ dn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Xt(n) : n;
  }
}
function H(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Xt(r);
  return r;
}
function ys(e) {
  e.textContent = "";
}
function Jr() {
  return !1;
}
function bs(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Es(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function qe(e, t) {
  var n = T;
  n !== null && (n.f & Y) !== 0 && (e |= Y);
  var r = {
    ctx: ue,
    deps: null,
    nodes: null,
    f: e | q | fe,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  b == null || b.register_created_effect(r);
  var i = r;
  if ((e & xt) !== 0)
    vt !== null ? vt.push(r) : at.ensure().schedule(r);
  else if (t !== null) {
    try {
      It(r);
    } catch (o) {
      throw W(r), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Ot) === 0 && (i = i.first, (e & we) !== 0 && (e & Tt) !== 0 && i !== null && (i.f |= Tt));
  }
  if (i !== null && (i.parent = n, n !== null && Es(i, n), k !== null && (k.f & j) !== 0 && (e & Fe) === 0)) {
    var s = (
      /** @type {Derived} */
      k
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function zn() {
  return k !== null && !me;
}
function Vn(e) {
  const t = qe(wn, null);
  return R(t, L), t.teardown = e, t;
}
function Ss(e) {
  return qe(xt | Ni, e);
}
function ks(e) {
  at.ensure();
  const t = qe(Fe | Ot, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? it(t, () => {
      W(t), r(void 0);
    }) : (W(t), r(void 0));
  });
}
function xs(e) {
  return qe(xt, e);
}
function Ts(e) {
  return qe(_t | Ot, e);
}
function Kr(e, t = 0) {
  return qe(wn | t, e);
}
function $e(e, t = [], n = [], r = []) {
  as(r, t, n, (i) => {
    qe(wn, () => {
      e(...i.map(m));
    });
  });
}
function Yn(e, t = 0) {
  var n = qe(we | t, e);
  return n;
}
function ae(e) {
  return qe(be | Ot, e);
}
function Wr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ot, r = k;
    cr(!0), ce(null);
    try {
      t.call(null);
    } finally {
      cr(n), ce(r);
    }
  }
}
function $n(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Wt(() => {
      i.abort(Kt);
    });
    var r = n.next;
    (n.f & Fe) !== 0 ? n.parent = null : W(n, t), n = r;
  }
}
function Ms(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & be) === 0 && W(t), t = n;
  }
}
function W(e, t = !0) {
  var n = !1;
  (t || (e.f & Ii) !== 0) && e.nodes !== null && e.nodes.end !== null && (As(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= An, $n(e, t && !n), Bt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Wr(e), e.f ^= An, e.f |= oe;
  var i = e.parent;
  i !== null && i.first !== null && Xr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function As(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Xt(e);
    e.remove(), e = n;
  }
}
function Xr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function it(e, t, n = !0) {
  var r = [];
  Zr(e, r, !0);
  var i = () => {
    n && W(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var o = () => --s || i();
    for (var a of r)
      a.out(o);
  } else
    i();
}
function Zr(e, t, n) {
  if ((e.f & Y) === 0) {
    e.f ^= Y;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & Fe) === 0) {
        var o = (i.f & Tt) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & be) !== 0 && (e.f & we) !== 0;
        Zr(i, t, o ? n : !1);
      }
      i = s;
    }
  }
}
function hn(e) {
  Qr(e, !0);
}
function Qr(e, t) {
  if ((e.f & Y) !== 0) {
    e.f ^= Y, (e.f & L) === 0 && (R(e, q), at.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Tt) !== 0 || (n.f & be) !== 0;
      Qr(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const o of s)
        (o.is_global || t) && o.in();
  }
}
function Jn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Xt(n);
      t.append(n), n = i;
    }
}
let ln = !1, ot = !1;
function cr(e) {
  ot = e;
}
let k = null, me = !1;
function ce(e) {
  k = e;
}
let T = null;
function Me(e) {
  T = e;
}
let Te = null;
function Is(e) {
  k !== null && (Te ?? (Te = /* @__PURE__ */ new Set())).add(e);
}
let K = null, Z = 0, re = null;
function Ns(e) {
  re = e;
}
let ei = 1, Je = 0, st = Je;
function dr(e) {
  st = e;
}
function ti() {
  return ++ei;
}
function Zt(e) {
  var t = e.f;
  if ((t & q) !== 0)
    return !0;
  if (t & j && (e.f &= ~lt), (t & ye) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Zt(
        /** @type {Derived} */
        s
      ) && Lr(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & fe) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    U === null && R(e, L);
  }
  return !1;
}
function ni(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(Te !== null && Te.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & j) !== 0 ? ni(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? R(s, q) : (s.f & L) !== 0 && R(s, ye), Bn(
        /** @type {Effect} */
        s
      ));
    }
}
function ri(e) {
  var w;
  var t = K, n = Z, r = re, i = k, s = Te, o = ue, a = me, u = st, f = e.f;
  K = /** @type {null | Value[]} */
  null, Z = 0, re = null, k = (f & (be | Fe)) === 0 ? e : null, Te = null, Mt(e.ctx), me = !1, st = ++Je, e.ac !== null && (Wt(() => {
    e.ac.abort(Kt);
  }), e.ac = null);
  try {
    e.f |= on;
    var v = (
      /** @type {Function} */
      e.fn
    ), d = v();
    e.f |= Nt;
    var c = e.deps, p = b == null ? void 0 : b.is_fork;
    if (K !== null) {
      var h;
      if (p || Bt(e, Z), c !== null && Z > 0)
        for (c.length = Z + K.length, h = 0; h < K.length; h++)
          c[Z + h] = K[h];
      else
        e.deps = c = K;
      if (zn() && (e.f & fe) !== 0)
        for (h = Z; h < c.length; h++)
          ((w = c[h]).reactions ?? (w.reactions = [])).push(e);
    } else !p && c !== null && Z < c.length && (Bt(e, Z), c.length = Z);
    if (Nr() && re !== null && !me && c !== null && (e.f & (j | ye | q)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      re.length; h++)
        ni(
          re[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Je++, i.deps !== null)
        for (let M = 0; M < n; M += 1)
          i.deps[M].rv = Je;
      if (t !== null)
        for (const M of t)
          M.rv = Je;
      re !== null && (r === null ? r = re : r.push(.../** @type {Source[]} */
      re));
    }
    return (e.f & Be) !== 0 && (e.f ^= Be), d;
  } catch (M) {
    return Or(M);
  } finally {
    e.f ^= on, K = t, Z = n, re = r, k = i, Te = s, Mt(o), me = a, st = u;
  }
}
function Os(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Ei.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & j) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (K === null || !an.call(K, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & fe) !== 0 && (s.f ^= fe, s.f &= ~lt), s.v !== C && Hn(s), s.ac !== null && Wt(() => {
      s.ac.abort(Kt), s.ac = null;
    }), ds(s), Bt(s, 0);
  }
}
function Bt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Os(e, n[r]);
}
function It(e) {
  var t = e.f;
  if ((t & oe) === 0) {
    R(e, L);
    var n = T, r = ln;
    T = e, ln = (t & (be | Fe)) === 0;
    try {
      (t & (we | xr)) !== 0 ? Ms(e) : $n(e), Wr(e);
      var i = ri(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = ei;
      var s;
    } finally {
      ln = r, T = n;
    }
  }
}
function m(e) {
  var t = e.f, n = (t & j) !== 0;
  if (k !== null && !me) {
    var r = T !== null && (T.f & oe) !== 0;
    if (!r && (Te === null || !Te.has(e))) {
      var i = k.deps;
      if ((k.f & on) !== 0)
        e.rv < Je && (e.rv = Je, K === null && i !== null && i[Z] === e ? Z++ : K === null ? K = [e] : K.push(e));
      else {
        k.deps ?? (k.deps = []), an.call(k.deps, e) || k.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [k] : an.call(s, k) || s.push(k);
      }
    }
  }
  if (ot && nt.has(e))
    return nt.get(e);
  if (n) {
    var o = (
      /** @type {Derived} */
      e
    );
    if (ot) {
      var a = o.v;
      return ((o.f & L) === 0 && o.reactions !== null || si(o)) && (a = Un(o)), nt.set(o, a), a;
    }
    var u = (o.f & fe) === 0 && !me && k !== null && (ln || (k.f & fe) !== 0), f = (o.f & Nt) === 0;
    Zt(o) && (u && (o.f |= fe), Lr(o)), u && !f && (Fr(o), ii(o));
  }
  if (U != null && U.has(e))
    return U.get(e);
  if ((e.f & Be) !== 0)
    throw e.v;
  return e.v;
}
function ii(e) {
  if (e.f |= fe, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & j) !== 0 && (t.f & fe) === 0 && (Fr(
        /** @type {Derived} */
        t
      ), ii(
        /** @type {Derived} */
        t
      ));
}
function si(e) {
  if (e.v === C) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (nt.has(t) || (t.f & j) !== 0 && si(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function li(e) {
  var t = me;
  try {
    return me = !0, e();
  } finally {
    me = t;
  }
}
const Ds = ["touchstart", "touchmove"];
function Ps(e) {
  return Ds.includes(e);
}
const Ke = Symbol("events"), ai = /* @__PURE__ */ new Set(), Cn = /* @__PURE__ */ new Set();
function Rs(e, t, n, r = {}) {
  function i(s) {
    if (r.capture || Ln.call(t, s), !s.cancelBubble)
      return Wt(() => n == null ? void 0 : n.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? tt(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function Cs(e, t, n, r, i) {
  var s = { capture: r, passive: i }, o = Rs(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Vn(() => {
    t.removeEventListener(e, o, s);
  });
}
function Oe(e, t, n) {
  (t[Ke] ?? (t[Ke] = {}))[e] = n;
}
function Ls(e) {
  for (var t = 0; t < e.length; t++)
    ai.add(e[t]);
  for (var n of Cn)
    n(e);
}
let hr = null;
function Ln(e) {
  var w, M;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((w = e.composedPath) == null ? void 0 : w.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  hr = e;
  var o = 0, a = hr === e && e[Ke];
  if (a) {
    var u = i.indexOf(a);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ke] = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    u <= f && (o = u);
  }
  if (s = /** @type {Element} */
  i[o] || e.target, s !== t) {
    Si(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var v = k, d = T;
    ce(null), Me(null);
    try {
      for (var c, p = []; s !== null && s !== t; ) {
        try {
          var h = (M = s[Ke]) == null ? void 0 : M[r];
          h != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && h.call(s, e);
        } catch (A) {
          c ? p.push(A) : c = A;
        }
        if (e.cancelBubble) break;
        o++, s = o < i.length ? (
          /** @type {Element} */
          i[o]
        ) : null;
      }
      if (c) {
        for (let A of p)
          queueMicrotask(() => {
            throw A;
          });
        throw c;
      }
    } finally {
      e[Ke] = t, delete e.currentTarget, ce(v), Me(d);
    }
  }
}
var br;
const Sn = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((br = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : br.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Fs(e) {
  return (
    /** @type {string} */
    (Sn == null ? void 0 : Sn.createHTML(e)) ?? e
  );
}
function qs(e) {
  var t = bs("template");
  return t.innerHTML = Fs(e.replaceAll("<!>", "<!---->")), t.content;
}
function vr(e, t) {
  var n = (
    /** @type {Effect} */
    T
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Ae(e, t) {
  var n = (t & Vi) !== 0, r = (t & Yi) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = qs(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ dn(i)));
    var o = (
      /** @type {TemplateNode} */
      r || Vr ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ dn(o)
      ), u = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      vr(a, u);
    } else
      vr(o, o);
    return o;
  };
}
function Se(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function kn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Ct] ?? (e[Ct] = e.nodeValue)) && (e[Ct] = n, e.nodeValue = `${n}`);
}
function js(e, t) {
  return Hs(e, t);
}
const en = /* @__PURE__ */ new Map();
function Hs(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: o = !0, transformError: a }) {
  ms();
  var u = void 0, f = ks(() => {
    var v = n ?? t.appendChild(rt());
    ns(
      /** @type {TemplateNode} */
      v,
      {
        pending: () => {
        }
      },
      (p) => {
        Ar({});
        var h = (
          /** @type {ComponentContext} */
          ue
        );
        s && (h.c = s), i && (r.$$events = i), u = e(p, r) || {}, Ir();
      },
      a
    );
    var d = /* @__PURE__ */ new Set(), c = (p) => {
      for (var h = 0; h < p.length; h++) {
        var w = p[h];
        if (!d.has(w)) {
          d.add(w);
          var M = Ps(w);
          for (const G of [t, document]) {
            var A = en.get(G);
            A === void 0 && (A = /* @__PURE__ */ new Map(), en.set(G, A));
            var N = A.get(w);
            N === void 0 ? (G.addEventListener(w, Ln, { passive: M }), A.set(w, 1)) : A.set(w, N + 1);
          }
        }
      }
    };
    return c(gn(ai)), Cn.add(c), () => {
      var M;
      for (var p of d)
        for (const A of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            en.get(A)
          ), w = (
            /** @type {number} */
            h.get(p)
          );
          --w == 0 ? (A.removeEventListener(p, Ln), h.delete(p), h.size === 0 && en.delete(A)) : h.set(p, w);
        }
      Cn.delete(c), v !== n && ((M = v.parentNode) == null || M.removeChild(v));
    };
  });
  return Us.set(u, f), u;
}
let Us = /* @__PURE__ */ new WeakMap();
var ge, xe, ee, et, $t, Jt, _n;
class Gs {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    X(this, "anchor");
    /** @type {Map<Batch, Key>} */
    E(this, ge, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    E(this, xe, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    E(this, ee, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    E(this, et, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    E(this, $t, !0);
    /**
     * @param {Batch} batch
     */
    E(this, Jt, (t) => {
      if (l(this, ge).has(t)) {
        var n = (
          /** @type {Key} */
          l(this, ge).get(t)
        ), r = l(this, xe).get(n);
        if (r)
          hn(r), l(this, et).delete(n);
        else {
          var i = l(this, ee).get(n);
          i && (hn(i.effect), l(this, xe).set(n, i.effect), l(this, ee).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, o] of l(this, ge)) {
          if (l(this, ge).delete(s), s === t)
            break;
          const a = l(this, ee).get(o);
          a && (W(a.effect), l(this, ee).delete(o));
        }
        for (const [s, o] of l(this, xe)) {
          if (s === n || l(this, et).has(s)) continue;
          const a = () => {
            if (Array.from(l(this, ge).values()).includes(s)) {
              var f = document.createDocumentFragment();
              Jn(o, f), f.append(rt()), l(this, ee).set(s, { effect: o, fragment: f });
            } else
              W(o);
            l(this, et).delete(s), l(this, xe).delete(s);
          };
          l(this, $t) || !r ? (l(this, et).add(s), it(o, a, !1)) : a();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    E(this, _n, (t) => {
      l(this, ge).delete(t);
      const n = Array.from(l(this, ge).values());
      for (const [r, i] of l(this, ee))
        n.includes(r) || (W(i.effect), l(this, ee).delete(r));
    });
    this.anchor = t, y(this, $t, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      b
    ), i = Jr();
    if (n && !l(this, xe).has(t) && !l(this, ee).has(t))
      if (i) {
        var s = document.createDocumentFragment(), o = rt();
        s.append(o), l(this, ee).set(t, {
          effect: ae(() => n(o)),
          fragment: s
        });
      } else
        l(this, xe).set(
          t,
          ae(() => n(this.anchor))
        );
    if (l(this, ge).set(r, t), i) {
      for (const [a, u] of l(this, xe))
        a === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [a, u] of l(this, ee))
        a === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(l(this, Jt)), r.ondiscard(l(this, _n));
    } else
      l(this, Jt).call(this, r);
  }
}
ge = new WeakMap(), xe = new WeakMap(), ee = new WeakMap(), et = new WeakMap(), $t = new WeakMap(), Jt = new WeakMap(), _n = new WeakMap();
function ct(e, t, n = !1) {
  var r = new Gs(e), i = n ? Tt : 0;
  function s(o, a) {
    r.ensure(o, a);
  }
  Yn(() => {
    var o = !1;
    t((a, u = 0) => {
      o = !0, s(u, a);
    }), o || s(-1, null);
  }, i);
}
function Bs(e, t) {
  return t;
}
function zs(e, t, n) {
  for (var r = [], i = t.length, s, o = t.length, a = 0; a < i; a++) {
    let d = t[a];
    it(
      d,
      () => {
        if (s) {
          if (s.pending.delete(d), s.done.add(d), s.pending.size === 0) {
            var c = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Fn(e, gn(s.done)), c.delete(s), c.size === 0 && (e.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var u = r.length === 0 && n !== null;
    if (u) {
      var f = (
        /** @type {Element} */
        n
      ), v = (
        /** @type {Element} */
        f.parentNode
      );
      ys(v), v.append(f), e.items.clear();
    }
    Fn(e, t, !u);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Fn(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const o of e.pending.values())
      for (const a of o)
        r.add(
          /** @type {EachItem} */
          e.items.get(a).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= Le;
      const o = document.createDocumentFragment();
      Jn(s, o);
    } else
      W(t[i], n);
  }
}
var pr;
function Vs(e, t, n, r, i, s = null) {
  var o = e, a = /* @__PURE__ */ new Map();
  {
    var u = (
      /** @type {Element} */
      e
    );
    o = u.appendChild(rt());
  }
  var f = null, v = /* @__PURE__ */ us(() => {
    var N = n();
    return (
      /** @type {V[]} */
      jn(N) ? N : N == null ? [] : gn(N)
    );
  }), d, c = /* @__PURE__ */ new Map(), p = !0;
  function h(N) {
    (A.effect.f & oe) === 0 && (A.pending.delete(N), A.fallback = f, Ys(A, d, o, t, r), f !== null && (d.length === 0 ? (f.f & Le) === 0 ? hn(f) : (f.f ^= Le, jt(f, null, o)) : it(f, () => {
      f = null;
    })));
  }
  function w(N) {
    A.pending.delete(N);
  }
  var M = Yn(() => {
    d = /** @type {V[]} */
    m(v);
    for (var N = d.length, G = /* @__PURE__ */ new Set(), te = (
      /** @type {Batch} */
      b
    ), Ie = Jr(), Ee = 0; Ee < N; Ee += 1) {
      var ze = d[Ee], Ne = r(ze, Ee), F = p ? null : a.get(Ne);
      F ? (F.v && At(F.v, ze), F.i && At(F.i, Ee), Ie && te.unskip_effect(F.e)) : (F = $s(
        a,
        p ? o : pr ?? (pr = rt()),
        ze,
        Ne,
        Ee,
        i,
        t,
        n
      ), p || (F.e.f |= Le), a.set(Ne, F)), G.add(Ne);
    }
    if (N === 0 && s && !f && (p ? f = ae(() => s(o)) : (f = ae(() => s(pr ?? (pr = rt()))), f.f |= Le)), N > G.size && Li(), !p)
      if (c.set(te, G), Ie) {
        for (const [Dt, mn] of a)
          G.has(Dt) || te.skip_effect(mn.e);
        te.oncommit(h), te.ondiscard(w);
      } else
        h(te);
    m(v);
  }), A = { effect: M, items: a, pending: c, outrogroups: null, fallback: f };
  p = !1;
}
function Rt(e) {
  for (; e !== null && (e.f & be) === 0; )
    e = e.next;
  return e;
}
function Ys(e, t, n, r, i) {
  var Ne;
  var s = t.length, o = e.items, a = Rt(e.effect.first), u, f = null, v = [], d = [], c, p, h, w;
  for (w = 0; w < s; w += 1) {
    if (c = t[w], p = i(c, w), h = /** @type {EachItem} */
    o.get(p).e, e.outrogroups !== null)
      for (const F of e.outrogroups)
        F.pending.delete(h), F.done.delete(h);
    if ((h.f & Y) !== 0 && hn(h), (h.f & Le) !== 0)
      if (h.f ^= Le, h === a)
        jt(h, null, n);
      else {
        var M = f ? f.next : a;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), je(e, f, h), je(e, h, M), jt(h, M, n), f = h, v = [], d = [], a = Rt(f.next);
        continue;
      }
    if (h !== a) {
      if (u !== void 0 && u.has(h)) {
        if (v.length < d.length) {
          var A = d[0], N;
          f = A.prev;
          var G = v[0], te = v[v.length - 1];
          for (N = 0; N < v.length; N += 1)
            jt(v[N], A, n);
          for (N = 0; N < d.length; N += 1)
            u.delete(d[N]);
          je(e, G.prev, te.next), je(e, f, G), je(e, te, A), a = A, f = te, w -= 1, v = [], d = [];
        } else
          u.delete(h), jt(h, a, n), je(e, h.prev, h.next), je(e, h, f === null ? e.effect.first : f.next), je(e, f, h), f = h;
        continue;
      }
      for (v = [], d = []; a !== null && a !== h; )
        (u ?? (u = /* @__PURE__ */ new Set())).add(a), d.push(a), a = Rt(a.next);
      if (a === null)
        continue;
    }
    (h.f & Le) === 0 && v.push(h), f = h, a = Rt(h.next);
  }
  if (e.outrogroups !== null) {
    for (const F of e.outrogroups)
      F.pending.size === 0 && (Fn(e, gn(F.done)), (Ne = e.outrogroups) == null || Ne.delete(F));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (a !== null || u !== void 0) {
    var Ie = [];
    if (u !== void 0)
      for (h of u)
        (h.f & Y) === 0 && Ie.push(h);
    for (; a !== null; )
      (a.f & Y) === 0 && a !== e.fallback && Ie.push(a), a = Rt(a.next);
    var Ee = Ie.length;
    if (Ee > 0) {
      var ze = s === 0 ? n : null;
      zs(e, Ie, ze);
    }
  }
}
function $s(e, t, n, r, i, s, o, a) {
  var u = (o & Gi) !== 0 ? (o & zi) === 0 ? /* @__PURE__ */ _s(n, !1, !1) : ft(n) : null, f = (o & Bi) !== 0 ? ft(i) : null;
  return {
    v: u,
    i: f,
    e: ae(() => (s(t, u ?? n, f ?? i, a), () => {
      e.delete(r);
    }))
  };
}
function jt(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & Le) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Xt(r)
      );
      if (s.before(r), r === i)
        return;
      r = o;
    }
}
function je(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function fi(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!jn(t))
      return Ki();
    for (var r of e.options)
      r.selected = t.includes(_r(r));
    return;
  }
  for (r of e.options) {
    var i = _r(r);
    if (ws(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function Js(e) {
  var t = new MutationObserver(() => {
    fi(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Vn(() => {
    t.disconnect();
  });
}
function _r(e) {
  return "__value" in e ? e.__value : e.value;
}
const Ks = Symbol("is custom element"), Ws = Symbol("is html"), Xs = Ri ? "progress" : "PROGRESS";
function gr(e, t) {
  var n = Kn(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== Xs) || (e.value = t ?? "");
}
function Zs(e, t) {
  var n = Kn(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function xn(e, t, n, r) {
  var i = Kn(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[Oi] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Qs(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Kn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[tn] ?? (e[tn] = {
      [Ks]: e.nodeName.includes("-"),
      [Ws]: e.namespaceURI === $i
    })
  );
}
var wr = /* @__PURE__ */ new Map();
function Qs(e) {
  var t = e.getAttribute("is") || e.nodeName, n = wr.get(t);
  if (n) return n;
  wr.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = ki(i);
    for (var o in r)
      r[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
    i = Sr(i);
  }
  return n;
}
function Tn(e, t) {
  return e === t || (e == null ? void 0 : e[gt]) === t;
}
function el(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    ue.r
  ), s = (
    /** @type {Effect} */
    T
  );
  return xs(() => {
    var o, a;
    return Kr(() => {
      o = a, a = [], li(() => {
        Tn(n(...a), e) || (t(e, ...a), o && Tn(n(...o), e) && t(null, ...o));
      });
    }), () => {
      let u = s;
      for (; u !== i && u.parent !== null && u.parent.f & An; )
        u = u.parent;
      const f = () => {
        a && Tn(n(...a), e) && t(null, ...a);
      }, v = u.teardown;
      u.teardown = () => {
        f(), v == null || v();
      };
    };
  }), e;
}
const tl = "5";
var Er;
typeof window < "u" && ((Er = window.__svelte ?? (window.__svelte = {})).v ?? (Er.v = /* @__PURE__ */ new Set())).add(tl);
function mr(e, t) {
  const n = t(), r = JSON.stringify(n);
  let i = JSON.parse(r);
  const s = localStorage.getItem(e);
  if (s)
    try {
      i = JSON.parse(s);
    } catch {
      localStorage.removeItem(e);
    }
  return {
    get data() {
      return i;
    },
    /** Persister utkastet; sletter nøkkelen hvis det er likt publisert. */
    save() {
      const o = JSON.stringify(i);
      o === r ? localStorage.removeItem(e) : localStorage.setItem(e, o);
    },
    /** Forkast utkastet og gå tilbake til publisert tilstand. */
    reset() {
      return localStorage.removeItem(e), i = JSON.parse(r), i;
    },
    hasDraft() {
      return localStorage.getItem(e) !== null;
    }
  };
}
function nl(e, t = {}) {
  const n = (i) => {
    var o, a, u, f, v, d;
    if (i.origin !== location.origin) return;
    const s = i.data;
    (s == null ? void 0 : s.type) === "urd-edit" && ((o = t.onEdit) == null || o.call(t, s)), (s == null ? void 0 : s.type) === "urd-move" && ((a = t.onMove) == null || a.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete" && ((u = t.onDelete) == null || u.call(t, s)), (s == null ? void 0 : s.type) === "urd-add-section" && ((f = t.onAddSection) == null || f.call(t, s)), (s == null ? void 0 : s.type) === "urd-move-section" && ((v = t.onMoveSection) == null || v.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete-section" && ((d = t.onDeleteSection) == null || d.call(t, s));
  };
  window.addEventListener("message", n);
  const r = (i) => {
    var s;
    return (s = e.contentWindow) == null ? void 0 : s.postMessage(i, location.origin);
  };
  return {
    sendSection(i, s) {
      r({ type: "urd-preview", pageId: i, section: s });
    },
    sendPage(i, s) {
      r({ type: "urd-preview-full", pageId: i, page: s });
    },
    sendSite(i) {
      r({ type: "urd-site", site: i });
    },
    destroy() {
      window.removeEventListener("message", n);
    }
  };
}
var rl = /* @__PURE__ */ Ae("<option> </option>"), il = /* @__PURE__ */ Ae('<select class="svelte-1n46o8q"></select>'), sl = /* @__PURE__ */ Ae('<span class="palette svelte-1n46o8q"><button class="ghost svelte-1n46o8q" title="Ny tekstblokk">+ Tekst</button> <button class="ghost svelte-1n46o8q" title="Ny knapp">+ Knapp</button> <button class="ghost svelte-1n46o8q" title="Ny strek/form">+ Form</button></span> <details class="gridmenu svelte-1n46o8q"><summary title="Grid-innstillinger (gjelder hele nettstedet, publiseres med site.json)" class="svelte-1n46o8q">⌗ Grid</summary> <div class="gridmenu-body svelte-1n46o8q"><label class="svelte-1n46o8q">Kolonner <input type="number" min="4" max="100" class="svelte-1n46o8q"/></label> <label class="svelte-1n46o8q">Radhøyde (px) <input type="number" min="2" max="64" class="svelte-1n46o8q"/></label> <label class="gridmenu-snap svelte-1n46o8q"><input type="checkbox"/> Snap til grid</label> <p class="gridmenu-hint svelte-1n46o8q">Gridet vises mens du drar. Flere kolonner og lavere radhøyde gir finere plassering.</p></div></details>', 1), ll = /* @__PURE__ */ Ae('<span class="badge svelte-1n46o8q">Upubliserte endringer</span>'), al = /* @__PURE__ */ Ae('<span class="who svelte-1n46o8q"> </span>'), fl = /* @__PURE__ */ Ae('<a class="ghost svelte-1n46o8q" href="/api/github/login">Logg inn med GitHub</a>'), ol = /* @__PURE__ */ Ae('<!> <a class="ghost svelte-1n46o8q" target="_blank" rel="noopener">Se siden ↗</a> <button class="ghost svelte-1n46o8q">Forkast utkast</button> <button class="primary svelte-1n46o8q">Publiser</button>', 1), ul = /* @__PURE__ */ Ae('<iframe title="Forhåndsvisning" class="svelte-1n46o8q"></iframe>'), cl = /* @__PURE__ */ Ae('<p class="loading svelte-1n46o8q">Laster…</p>'), dl = /* @__PURE__ */ Ae('<div class="editor svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><strong class="brand svelte-1n46o8q">Urd</strong> <!> <!> <!> <span class="status svelte-1n46o8q"> </span> <span class="spacer svelte-1n46o8q"></span> <!></header> <!></div>');
function hl(e, t) {
  Ar(t, !0);
  let n = /* @__PURE__ */ V(null), r = /* @__PURE__ */ V(null), i = /* @__PURE__ */ V(!1), s = /* @__PURE__ */ V(""), o = /* @__PURE__ */ V(null), a = /* @__PURE__ */ V(null), u = /* @__PURE__ */ V(pt({ columns: 24, rowHeight: 8, snap: !0 })), f = null, v = null, d = null;
  const c = () => m(n).pages.find((_) => _.id === m(r));
  function p() {
    D(i, (f == null ? void 0 : f.hasDraft()) || (v == null ? void 0 : v.hasDraft()) || !1, !0);
  }
  async function h() {
    D(n, await (await fetch("/content/site.json")).json(), !0), v = mr("urd-draft-site", () => m(n)), D(u, { snap: !0, ...v.data.grid }, !0), await A(new URLSearchParams(location.search).get("page") ?? m(n).pages[0].id), await M();
  }
  function w(_, g) {
    D(u, { ...m(u), [_]: g }, !0), v.data.grid = { ...v.data.grid, [_]: g }, v.save(), p(), d == null || d.sendSite(v.data);
  }
  async function M() {
    try {
      const _ = await fetch("/api/github/me");
      D(a, _.ok ? await _.json() : null, !0);
    } catch {
      D(a, null);
    }
  }
  async function A(_) {
    D(r, _, !0);
    const g = c(), x = await (await fetch(`/${g.file}`)).json();
    f = mr(`urd-draft-${_}`, () => x), p(), D(s, "");
  }
  function N() {
    d == null || d.destroy(), d = nl(m(o), {
      onEdit: G,
      onMove: te,
      onDelete: Ne,
      onAddSection: Ie,
      onMoveSection: Ee,
      onDeleteSection: ze
    }), v.hasDraft() && d.sendSite(v.data), f.hasDraft() && d.sendPage(m(r), f.data);
  }
  function G(_) {
    const g = f.data.sections.find((S) => S.id === _.sectionId), x = g == null ? void 0 : g.blocks.find((S) => S.id === _.blockId);
    x && (x.props = _.props, f.save(), p(), D(s, ""));
  }
  function te(_) {
    const g = f.data.sections.find((S) => S.id === _.sectionId), x = g == null ? void 0 : g.blocks.find((S) => S.id === _.blockId);
    x && (x.frames.desktop = _.frame, f.save(), p());
  }
  function Ie(_) {
    f.data.sections.splice(_.index, 0, _.section), f.save(), p(), d == null || d.sendPage(m(r), f.data);
  }
  function Ee(_) {
    const g = f.data.sections, x = g.findIndex((B) => B.id === _.sectionId), S = x + _.dir;
    x < 0 || S < 0 || S >= g.length || ([g[x], g[S]] = [g[S], g[x]], f.save(), p(), d == null || d.sendPage(m(r), f.data));
  }
  function ze(_) {
    f.data.sections = f.data.sections.filter((g) => g.id !== _.sectionId), f.save(), p(), d == null || d.sendPage(m(r), f.data);
  }
  function Ne(_) {
    const g = f.data.sections.find((x) => x.id === _.sectionId);
    g && (g.blocks = g.blocks.filter((x) => x.id !== _.blockId), f.save(), p(), d == null || d.sendSection(m(r), g));
  }
  const F = {
    text: {
      props: { html: "<p>Ny tekst</p>", align: "left" },
      w: 8,
      h: 3
    },
    button: {
      props: { label: "Ny knapp", page: null, href: "#", style: "primary" },
      w: 5,
      h: 2
    },
    shape: {
      props: { kind: "line", color: "accent", thickness: 2, fill: null },
      w: 6,
      h: 1
    }
  };
  function Dt(_) {
    const g = f.data.sections[0], x = F[_], S = Math.max(0, ...g.blocks.map((B) => B.frames.desktop.y + B.frames.desktop.h));
    g.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: _,
      version: 1,
      props: structuredClone(x.props),
      animation: null,
      frames: {
        desktop: { x: 1, y: S + 1, w: x.w, h: x.h, z: 1, rot: 0 },
        mobile: null
      }
    }), f.save(), p(), d == null || d.sendSection(m(r), g);
  }
  function mn() {
    const _ = f.reset(), g = v.reset();
    D(u, { snap: !0, ...g.grid }, !0), p(), D(s, ""), d == null || d.sendSite(g), d == null || d.sendPage(m(r), _);
  }
  async function oi() {
    var B, ne;
    D(s, "Publiserer…");
    const _ = c(), g = [];
    f.hasDraft() && g.push({
      path: _.file,
      content: JSON.stringify(f.data, null, 2) + `
`,
      encoding: "utf-8"
    }), v.hasDraft() && g.push({
      path: "content/site.json",
      content: JSON.stringify(v.data, null, 2) + `
`,
      encoding: "utf-8"
    });
    const x = { message: `Oppdater ${_.title} via Urd-admin`, files: g };
    let S = null;
    try {
      S = await fetch("/api/github/commit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(x)
      });
    } catch {
    }
    S != null && S.ok ? (localStorage.removeItem(`urd-draft-${m(r)}`), localStorage.removeItem("urd-draft-site"), D(s, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), D(i, !1)) : (S == null ? void 0 : S.status) === 401 ? (D(s, "Du må logge inn med GitHub for å publisere."), await M()) : (S == null ? void 0 : S.status) === 403 ? D(s, ((B = await S.json().catch(() => null)) == null ? void 0 : B.error) ?? "Du har ikke publiseringstilgang.", !0) : S ? D(s, ((ne = await S.json().catch(() => null)) == null ? void 0 : ne.error) ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : D(s, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
  }
  h();
  var Wn = dl(), Xn = ve(Wn), Zn = H(ve(Xn), 2);
  {
    var ui = (_) => {
      var g = il();
      Vs(g, 21, () => m(n).pages, Bs, (S, B) => {
        var ne = rl(), Ve = ve(ne), Ye = {};
        $e(() => {
          kn(Ve, m(B).title), Ye !== (Ye = m(B).id) && (ne.value = (ne.__value = m(B).id) ?? "");
        }), Se(S, ne);
      });
      var x;
      Js(g), $e(() => {
        x !== (x = m(r)) && (g.value = (g.__value = m(r)) ?? "", fi(g, m(r)));
      }), Oe("change", g, (S) => A(S.target.value)), Se(_, g);
    };
    ct(Zn, (_) => {
      m(n) && _(ui);
    });
  }
  var Qn = H(Zn, 2);
  {
    var ci = (_) => {
      var g = sl(), x = ur(g), S = ve(x), B = H(S, 2), ne = H(B, 2), Ve = H(x, 2), Ye = H(ve(Ve), 2), de = ve(Ye), he = H(ve(de)), Qt = H(de, 2), nr = H(ve(Qt)), mi = H(Qt, 2), rr = ve(mi);
      $e(() => {
        gr(he, m(u).columns), gr(nr, m(u).rowHeight), Zs(rr, m(u).snap !== !1);
      }), Oe("click", S, () => Dt("text")), Oe("click", B, () => Dt("button")), Oe("click", ne, () => Dt("shape")), Oe("change", he, (Pt) => w("columns", Math.max(4, Math.min(100, Number(Pt.target.value) || 24)))), Oe("change", nr, (Pt) => w("rowHeight", Math.max(2, Math.min(64, Number(Pt.target.value) || 8)))), Oe("change", rr, (Pt) => w("snap", Pt.target.checked)), Se(_, g);
    };
    ct(Qn, (_) => {
      m(n) && _(ci);
    });
  }
  var er = H(Qn, 2);
  {
    var di = (_) => {
      var g = ll();
      Se(_, g);
    };
    ct(er, (_) => {
      m(i) && _(di);
    });
  }
  var tr = H(er, 2), hi = ve(tr), vi = H(tr, 4);
  {
    var pi = (_) => {
      var g = ol(), x = ur(g);
      {
        var S = (de) => {
          var he = al(), Qt = ve(he);
          $e(() => {
            xn(he, "title", m(a).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), kn(Qt, `${m(a).allowed ? "" : "⚠ "}${m(a).login ?? ""}`);
          }), Se(de, he);
        }, B = (de) => {
          var he = fl();
          Se(de, he);
        };
        ct(x, (de) => {
          var he;
          (he = m(a)) != null && he.loggedIn ? de(S) : m(a) && de(B, 1);
        });
      }
      var ne = H(x, 2), Ve = H(ne, 2), Ye = H(Ve, 2);
      $e(
        (de) => {
          xn(ne, "href", de), Ve.disabled = !m(i), Ye.disabled = !m(i);
        },
        [() => c().path]
      ), Oe("click", Ve, mn), Oe("click", Ye, oi), Se(_, g);
    };
    ct(vi, (_) => {
      m(n) && _(pi);
    });
  }
  var _i = H(Xn, 2);
  {
    var gi = (_) => {
      var g = ul();
      el(g, (x) => D(o, x), () => m(o)), $e(() => xn(g, "src", `/?page=${m(r)}&preview=1`)), Cs("load", g, N), Se(_, g);
    }, wi = (_) => {
      var g = cl();
      Se(_, g);
    };
    ct(_i, (_) => {
      m(n) ? _(gi) : _(wi, -1);
    });
  }
  $e(() => kn(hi, m(s))), Se(e, Wn), Ir();
}
Ls(["change", "click"]);
const _l = js(hl, { target: document.getElementById("urd-admin") });
export {
  _l as default
};
