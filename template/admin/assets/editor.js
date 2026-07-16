var gi = Object.defineProperty;
var nr = (e) => {
  throw TypeError(e);
};
var wi = (e, t, n) => t in e ? gi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => wi(e, typeof t != "symbol" ? t + "" : t, n), yn = (e, t, n) => t.has(e) || nr("Cannot " + n);
var l = (e, t, n) => (yn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), E = (e, t, n) => t.has(e) ? nr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), y = (e, t, n, r) => (yn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), A = (e, t, n) => (yn(e, t, "access private method"), n);
var jn = Array.isArray, mi = Array.prototype.indexOf, fn = Array.prototype.includes, wn = Array.from, yi = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, bi = Object.getOwnPropertyDescriptors, Ei = Object.prototype, ki = Array.prototype, br = Object.getPrototypeOf, rr = Object.isExtensible;
const Si = () => {
};
function xi(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Er() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const j = 2, xt = 4, mn = 8, kr = 1 << 24, we = 16, be = 32, qe = 64, Mn = 128, fe = 512, L = 1024, q = 2048, ye = 4096, V = 8192, oe = 16384, Nt = 32768, An = 1 << 25, Tt = 65536, on = 1 << 17, Ti = 1 << 18, Ot = 1 << 19, Mi = 1 << 20, Fe = 1 << 25, lt = 65536, un = 1 << 21, _t = 1 << 22, ze = 1 << 23, gt = Symbol("$state"), Ai = Symbol(""), nn = Symbol("attributes"), Ii = Symbol("class"), Ni = Symbol("style"), Rt = Symbol("text"), Kt = new class extends Error {
  constructor() {
    super(...arguments);
    X(this, "name", "StaleReactionError");
    X(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var wr;
const Oi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((wr = globalThis.document) != null && wr.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Di() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Pi(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Ri() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ci() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Li() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Fi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function qi() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const ji = 1, Hi = 2, Ui = 16, Gi = 1, Bi = 2, C = Symbol("uninitialized"), zi = "http://www.w3.org/1999/xhtml";
function Vi() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Yi() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function $i() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Sr(e) {
  return e === this.v;
}
function Ki(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function xr(e) {
  return !Ki(e, this.v);
}
let ue = null;
function Mt(e) {
  ue = e;
}
function Tr(e, t = !1, n) {
  ue = {
    p: ue,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      S
    ),
    l: null
  };
}
function Mr(e) {
  var t = (
    /** @type {ComponentContext} */
    ue
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      ys(r);
  }
  return t.i = !0, ue = t.p, /** @type {T} */
  {};
}
function Ar() {
  return !0;
}
let ht = [];
function Wi() {
  var e = ht;
  ht = [], xi(e);
}
function tt(e) {
  if (ht.length === 0) {
    var t = ht;
    queueMicrotask(() => {
      t === ht && Wi();
    });
  }
  ht.push(e);
}
function Ir(e) {
  var t = S;
  if (t === null)
    return k.f |= ze, e;
  if ((t.f & Nt) === 0 && (t.f & xt) === 0)
    throw e;
  Be(e, t);
}
function Be(e, t) {
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
const Ji = -7169;
function R(e, t) {
  e.f = e.f & Ji | t;
}
function Hn(e) {
  (e.f & fe) !== 0 || e.deps === null ? R(e, L) : R(e, ye);
}
function Nr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & j) === 0 || (t.f & lt) === 0 || (t.f ^= lt, Nr(
        /** @type {Derived} */
        t.deps
      ));
}
function Or(e, t, n) {
  (e.f & q) !== 0 ? t.add(e) : (e.f & ye) !== 0 && n.add(e), Nr(e.deps), R(e, L);
}
function Wt(e) {
  var t = k, n = S;
  ce(null), Me(null);
  try {
    return e();
  } finally {
    ce(t), Me(n);
  }
}
function Xi(e) {
  let t = 0, n = ft(0), r;
  return () => {
    zn() && (m(n), $r(() => (t === 0 && (r = ii(() => e(() => Ut(n)))), t += 1, () => {
      tt(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Ut(n));
      });
    })));
  };
}
var Zi = Tt | Ot;
function Qi(e, t, n, r) {
  new es(e, t, n, r);
}
var ie, qn, se, Je, $, le, B, Q, Pe, Xe, Ue, wt, Bt, zt, Re, pn, P, ts, ns, rs, In, rn, sn, Nn, On;
class es {
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
    E(this, Je);
    /** @type {Effect} */
    E(this, $);
    /** @type {Effect | null} */
    E(this, le, null);
    /** @type {Effect | null} */
    E(this, B, null);
    /** @type {Effect | null} */
    E(this, Q, null);
    /** @type {DocumentFragment | null} */
    E(this, Pe, null);
    E(this, Xe, 0);
    E(this, Ue, 0);
    E(this, wt, !1);
    /** @type {Set<Effect>} */
    E(this, Bt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    E(this, zt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    E(this, Re, null);
    E(this, pn, Xi(() => (y(this, Re, ft(l(this, Xe))), () => {
      y(this, Re, null);
    })));
    var s;
    y(this, ie, t), y(this, se, n), y(this, Je, (f) => {
      var a = (
        /** @type {Effect} */
        S
      );
      a.b = this, a.f |= Mn, r(f);
    }), this.parent = /** @type {Effect} */
    S.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((f) => f), y(this, $, Yn(() => {
      A(this, P, In).call(this);
    }, Zi));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Or(t, l(this, Bt), l(this, zt));
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
    A(this, P, Nn).call(this, t, n), y(this, Xe, l(this, Xe) + t), !(!l(this, Re) || l(this, wt)) && (y(this, wt, !0), tt(() => {
      y(this, wt, !1), l(this, Re) && At(l(this, Re), l(this, Xe));
    }));
  }
  get_effect_pending() {
    return l(this, pn).call(this), m(
      /** @type {Source<number>} */
      l(this, Re)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!l(this, se).onerror && !l(this, se).failed)
      throw t;
    b != null && b.is_fork ? (l(this, le) && b.skip_effect(l(this, le)), l(this, B) && b.skip_effect(l(this, B)), l(this, Q) && b.skip_effect(l(this, Q)), b.oncommit(() => {
      A(this, P, On).call(this, t);
    })) : A(this, P, On).call(this, t);
  }
}
ie = new WeakMap(), qn = new WeakMap(), se = new WeakMap(), Je = new WeakMap(), $ = new WeakMap(), le = new WeakMap(), B = new WeakMap(), Q = new WeakMap(), Pe = new WeakMap(), Xe = new WeakMap(), Ue = new WeakMap(), wt = new WeakMap(), Bt = new WeakMap(), zt = new WeakMap(), Re = new WeakMap(), pn = new WeakMap(), P = new WeakSet(), ts = function() {
  try {
    y(this, le, ae(() => l(this, Je).call(this, l(this, ie))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
ns = function(t) {
  const n = l(this, se).failed;
  n && y(this, Q, ae(() => {
    n(
      l(this, ie),
      () => t,
      () => () => {
      }
    );
  }));
}, rs = function() {
  const t = l(this, se).pending;
  t && (this.is_pending = !0, y(this, B, ae(() => t(l(this, ie)))), tt(() => {
    var n = y(this, Pe, document.createDocumentFragment()), r = rt();
    n.append(r), y(this, le, A(this, P, sn).call(this, () => ae(() => l(this, Je).call(this, r)))), l(this, Ue) === 0 && (l(this, ie).before(n), y(this, Pe, null), it(
      /** @type {Effect} */
      l(this, B),
      () => {
        y(this, B, null);
      }
    ), A(this, P, rn).call(
      this,
      /** @type {Batch} */
      b
    ));
  }));
}, In = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), y(this, Ue, 0), y(this, Xe, 0), y(this, le, ae(() => {
      l(this, Je).call(this, l(this, ie));
    })), l(this, Ue) > 0) {
      var t = y(this, Pe, document.createDocumentFragment());
      Kn(l(this, le), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        l(this, se).pending
      );
      y(this, B, ae(() => n(l(this, ie))));
    } else
      A(this, P, rn).call(
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
rn = function(t) {
  this.is_pending = !1, t.transfer_effects(l(this, Bt), l(this, zt));
}, /**
 * @template T
 * @param {() => T} fn
 */
sn = function(t) {
  var n = S, r = k, i = ue;
  Me(l(this, $)), ce(l(this, $)), Mt(l(this, $).ctx);
  try {
    return at.ensure(), t();
  } catch (s) {
    return Ir(s), null;
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
    this.parent && A(r = this.parent, P, Nn).call(r, t, n);
    return;
  }
  y(this, Ue, l(this, Ue) + t), l(this, Ue) === 0 && (A(this, P, rn).call(this, n), l(this, B) && it(l(this, B), () => {
    y(this, B, null);
  }), l(this, Pe) && (l(this, ie).before(l(this, Pe)), y(this, Pe, null)));
}, /**
 * @param {unknown} error
 */
On = function(t) {
  l(this, le) && (J(l(this, le)), y(this, le, null)), l(this, B) && (J(l(this, B)), y(this, B, null)), l(this, Q) && (J(l(this, Q)), y(this, Q, null));
  var n = l(this, se).onerror;
  let r = l(this, se).failed;
  var i = !1, s = !1;
  const f = () => {
    if (i) {
      $i();
      return;
    }
    i = !0, s && qi(), l(this, Q) !== null && it(l(this, Q), () => {
      y(this, Q, null);
    }), A(this, P, sn).call(this, () => {
      A(this, P, In).call(this);
    });
  }, a = (u) => {
    try {
      s = !0, n == null || n(u, f), s = !1;
    } catch (o) {
      Be(o, l(this, $) && l(this, $).parent);
    }
    r && y(this, Q, A(this, P, sn).call(this, () => {
      try {
        return ae(() => {
          var o = (
            /** @type {Effect} */
            S
          );
          o.b = this, o.f |= Mn, r(
            l(this, ie),
            () => u,
            () => f
          );
        });
      } catch (o) {
        return Be(
          o,
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
    } catch (o) {
      Be(o, l(this, $) && l(this, $).parent);
      return;
    }
    u !== null && typeof u == "object" && typeof /** @type {any} */
    u.then == "function" ? u.then(
      a,
      /** @param {unknown} e */
      (o) => Be(o, l(this, $) && l(this, $).parent)
    ) : a(u);
  });
};
function is(e, t, n, r) {
  const i = Pr;
  var s = e.filter((p) => !p.settled), f = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(f);
    return;
  }
  var a = (
    /** @type {Effect} */
    S
  ), u = ss(), o = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((p) => p.promise)) : null;
  function h(p) {
    if ((a.f & oe) === 0) {
      u();
      try {
        r([...f, ...p]);
      } catch (d) {
        Be(d, a);
      }
      cn();
    }
  }
  var v = Dr();
  if (n.length === 0) {
    o.then(() => h([])).finally(v);
    return;
  }
  function c() {
    Promise.all(n.map((p) => /* @__PURE__ */ ls(p))).then(h).catch((p) => Be(p, a)).finally(v);
  }
  o ? o.then(() => {
    u(), c(), cn();
  }) : c();
}
function ss() {
  var e = (
    /** @type {Effect} */
    S
  ), t = k, n = ue, r = (
    /** @type {Batch} */
    b
  );
  return function(s = !0) {
    Me(e), ce(t), Mt(n), s && (e.f & oe) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function cn(e = !0) {
  Me(null), ce(null), Mt(null), e && (b == null || b.deactivate());
}
function Dr() {
  var e = (
    /** @type {Effect} */
    S
  ), t = e.b, n = (
    /** @type {Batch} */
    b
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Pr(e) {
  var t = j | q;
  return S !== null && (S.f |= Ot), {
    ctx: ue,
    deps: null,
    effects: null,
    equals: Sr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      C
    ),
    wv: 0,
    parent: S,
    ac: null
  };
}
const Ct = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function ls(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    S
  );
  r === null && Di();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ft(
    /** @type {V} */
    C
  ), f = !k, a = /* @__PURE__ */ new Set();
  return ks(() => {
    var p, d;
    var u = (
      /** @type {Effect} */
      S
    ), o = Er();
    i = o.promise;
    try {
      Promise.resolve(e()).then(o.resolve, (_) => {
        _ !== Kt && o.reject(_);
      }).finally(cn);
    } catch (_) {
      o.reject(_), cn();
    }
    var h = (
      /** @type {Batch} */
      b
    );
    if (f) {
      if ((u.f & Nt) !== 0)
        var v = Dr();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (d = h.async_deriveds.get(u)) == null || d.reject(Ct);
      else
        for (const _ of a.values())
          _.reject(Ct);
      a.add(o), h.async_deriveds.set(u, o);
    }
    const c = (_, x = void 0) => {
      v == null || v(), a.delete(o), x !== Ct && (h.activate(), x ? (s.f |= ze, At(s, x)) : ((s.f & ze) !== 0 && (s.f ^= ze), At(s, _)), h.deactivate());
    };
    o.promise.then(c, (_) => c(null, _ || "unknown"));
  }), Vn(() => {
    for (const u of a)
      u.reject(Ct);
  }), new Promise((u) => {
    function o(h) {
      function v() {
        h === i ? u(s) : o(i);
      }
      h.then(v, v);
    }
    o(i);
  });
}
// @__NO_SIDE_EFFECTS__
function as(e) {
  const t = /* @__PURE__ */ Pr(e);
  return t.equals = xr, t;
}
function fs(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      J(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Un(e) {
  var t, n = S, r = e.parent;
  if (!ot && r !== null && e.v !== C && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (oe | V)) !== 0)
    return Vi(), e.v;
  Me(r);
  try {
    e.f &= ~lt, fs(e), t = ti(e);
  } finally {
    Me(n);
  }
  return t;
}
function Rr(e) {
  var t = Un(e);
  if (!e.equals(t) && (e.wv = Qr(), (!(b != null && b.is_fork) || e.deps === null) && (b !== null ? (b.capture(e, t, !0), Ht == null || Ht.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    R(e, L);
    return;
  }
  ot || (U !== null ? (zn() || b != null && b.is_fork) && U.set(e, t) : Hn(e));
}
function os(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && Wt(() => {
        n.ac.abort(Kt), n.ac = null;
      }), n.fn !== null && (n.teardown = Si), Gt(n, 0), $n(n));
}
function Cr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && It(t);
}
let bn = null, ut = null, b = null, Ht = null, U = null, Dn = null, En = !1, vt = null, ln = null;
var ir = 0;
let us = 1;
var mt, Ge, Ze, yt, bt, Et, Ce, kt, K, Vt, Le, _e, Se, St, Qe, N, Pn, Lt, Rn, Lr, Fr, dt, cs, Ft;
const _n = class _n {
  constructor() {
    E(this, N);
    X(this, "id", us++);
    /** True as soon as `#process` was called */
    E(this, mt, !1);
    X(this, "linked", !0);
    /** @type {Batch | null} */
    E(this, Ge, null);
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
    E(this, Ce, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    E(this, kt, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    E(this, K, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    E(this, Vt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    E(this, Le, /* @__PURE__ */ new Set());
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
    E(this, Se, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    E(this, St, /* @__PURE__ */ new Set());
    X(this, "is_fork", !1);
    E(this, Qe, !1);
    ut === null ? bn = ut = this : (y(ut, Ze, this), y(this, Ge, ut)), ut = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    l(this, Se).has(t) || l(this, Se).set(t, { d: [], m: [] }), l(this, St).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = l(this, Se).get(t);
    if (r) {
      l(this, Se).delete(t);
      for (var i of r.d)
        R(i, q), n(i);
      for (i of r.m)
        R(i, ye), n(i);
    }
    l(this, St).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== C && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & ze) === 0 && (this.current.set(t, [n, r]), U == null || U.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    b = this;
  }
  deactivate() {
    b = null, U = null;
  }
  flush() {
    try {
      En = !0, b = this, A(this, N, Lt).call(this);
    } finally {
      ir = 0, Dn = null, vt = null, ln = null, En = !1, b = null, U = null, nt.clear();
    }
  }
  discard() {
    var t;
    for (const n of l(this, bt)) n(this);
    l(this, bt).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Ct);
    A(this, N, Ft).call(this), (t = l(this, kt)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    l(this, Vt).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (y(this, Et, l(this, Et) + 1), t) {
      let r = l(this, Ce).get(n) ?? 0;
      l(this, Ce).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (y(this, Et, l(this, Et) - 1), t) {
      let r = l(this, Ce).get(n) ?? 0;
      r === 1 ? l(this, Ce).delete(n) : l(this, Ce).set(n, r - 1);
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
      l(this, Le).add(r);
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
    return (l(this, kt) ?? y(this, kt, Er())).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new _n();
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
    if (Dn = t, (i = t.b) != null && i.is_pending && (t.f & (xt | mn | kr)) !== 0 && (t.f & Nt) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (vt !== null && n === S && (k === null || (k.f & j) === 0))
        return;
      if ((r & (qe | be)) !== 0) {
        if ((r & L) === 0)
          return;
        n.f ^= L;
      }
    }
    l(this, K).push(n);
  }
};
mt = new WeakMap(), Ge = new WeakMap(), Ze = new WeakMap(), yt = new WeakMap(), bt = new WeakMap(), Et = new WeakMap(), Ce = new WeakMap(), kt = new WeakMap(), K = new WeakMap(), Vt = new WeakMap(), Le = new WeakMap(), _e = new WeakMap(), Se = new WeakMap(), St = new WeakMap(), Qe = new WeakMap(), N = new WeakSet(), Pn = function() {
  if (this.is_fork) return !0;
  for (const r of l(this, Ce).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (l(this, Se).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Lt = function() {
  var u, o, h, v;
  y(this, mt, !0), ir++ > 1e3 && (A(this, N, Ft).call(this), ds());
  for (const c of l(this, Le))
    l(this, _e).delete(c), R(c, q), this.schedule(c);
  for (const c of l(this, _e))
    R(c, ye), this.schedule(c);
  const t = l(this, K);
  y(this, K, []), this.apply();
  var n = vt = [], r = [], i = ln = [];
  for (const c of t)
    try {
      A(this, N, Rn).call(this, c, n, r);
    } catch (p) {
      throw Hr(c), A(this, N, Pn).call(this) || this.discard(), p;
    }
  if (b = null, i.length > 0) {
    var s = _n.ensure();
    for (const c of i)
      s.schedule(c);
  }
  if (vt = null, ln = null, A(this, N, Pn).call(this)) {
    A(this, N, dt).call(this, r), A(this, N, dt).call(this, n);
    for (const [c, p] of l(this, Se))
      jr(c, p);
    i.length > 0 && /** @type {unknown} */
    A(u = b, N, Lt).call(u);
    return;
  }
  const f = A(this, N, Lr).call(this);
  if (f) {
    A(this, N, dt).call(this, r), A(this, N, dt).call(this, n), A(o = f, N, Fr).call(o, this);
    return;
  }
  l(this, Le).clear(), l(this, _e).clear();
  for (const c of l(this, yt)) c(this);
  l(this, yt).clear(), Ht = this, sr(r), sr(n), Ht = null, (h = l(this, kt)) == null || h.resolve();
  var a = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    b
  );
  if (l(this, Et) === 0 && (l(this, K).length === 0 || a !== null) && A(this, N, Ft).call(this), l(this, K).length > 0)
    if (a !== null) {
      const c = a;
      l(c, K).push(...l(this, K).filter((p) => !l(c, K).includes(p)));
    } else
      a = this;
  a !== null && A(v = a, N, Lt).call(v);
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
    var s = i.f, f = (s & (be | qe)) !== 0, a = f && (s & L) !== 0, u = a || (s & V) !== 0 || l(this, Se).has(i);
    if (!u && i.fn !== null) {
      f ? i.f ^= L : (s & xt) !== 0 ? n.push(i) : Xt(i) && ((s & we) !== 0 && l(this, _e).add(i), It(i));
      var o = i.first;
      if (o !== null) {
        i = o;
        continue;
      }
    }
    for (; i !== null; ) {
      var h = i.next;
      if (h !== null) {
        i = h;
        break;
      }
      i = i.parent;
    }
  }
}, Lr = function() {
  for (var t = l(this, Ge); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = l(t, Ge);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Fr = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const f = this.async_deriveds.get(i);
    f && s.promise.then(f.resolve).catch(f.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(l(t, Le), l(t, _e));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & j) !== 0 && (i.f & (q | ye)) === 0))
      for (const u of s) {
        var f = u.f;
        if ((f & j) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var a = (
            /** @type {Effect} */
            u
          );
          f & (_t | we) && !this.async_deriveds.has(a) && (l(this, _e).delete(a), R(a, q), this.schedule(a));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), A(r = t, N, Ft).call(r), b = this, A(this, N, Lt).call(this);
}, /**
 * @param {Effect[]} effects
 */
dt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Or(t[n], l(this, Le), l(this, _e));
}, cs = function() {
  var v;
  for (let c = bn; c !== null; c = l(c, Ze)) {
    var t = c.id < this.id, n = [];
    for (const [p, [d, _]] of this.current) {
      if (c.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          c.current.get(p)[0]
        );
        if (t && d !== r)
          c.current.set(p, [d, _]);
        else
          continue;
      }
      n.push(p);
    }
    if (t)
      for (const [p, d] of this.async_deriveds) {
        const _ = c.async_deriveds.get(p);
        _ && d.promise.then(_.resolve).catch(_.reject);
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
          for (const p of l(this, St))
            c.unskip_effect(p, (d) => {
              var _;
              (d.f & (we | _t)) !== 0 ? c.schedule(d) : A(_ = c, N, dt).call(_, [d]);
            });
        c.activate();
        var f = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
        for (var u of n)
          qr(u, s, f, a);
        a = /* @__PURE__ */ new Map();
        var o = [...c.current].filter(([p, d]) => {
          const _ = this.current.get(p);
          return _ ? _[0] !== d[0] || _[1] !== d[1] : !0;
        }).map(([p]) => p);
        if (o.length > 0)
          for (const p of l(this, Vt))
            (p.f & (oe | V | on)) === 0 && Gn(p, o, a) && ((p.f & (_t | we)) !== 0 ? (R(p, q), c.schedule(p)) : l(c, Le).add(p));
        if (l(c, K).length > 0 && !l(c, Qe)) {
          c.apply();
          for (var h of l(c, K))
            A(v = c, N, Rn).call(v, h, [], []);
          y(c, K, []);
        }
        c.deactivate();
      }
    }
  }
}, Ft = function() {
  if (this.linked) {
    var t = l(this, Ge), n = l(this, Ze);
    t === null ? bn = n : y(t, Ze, n), n === null ? ut = t : y(n, Ge, t), this.linked = !1;
  }
};
let at = _n;
function ds() {
  try {
    Ri();
  } catch (e) {
    Be(e, Dn);
  }
}
let pe = null;
function sr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (oe | V)) === 0 && Xt(r) && (pe = /* @__PURE__ */ new Set(), It(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Wr(r), (pe == null ? void 0 : pe.size) > 0)) {
        nt.clear();
        for (const i of pe) {
          if ((i.f & (oe | V)) !== 0) continue;
          const s = [i];
          let f = i.parent;
          for (; f !== null; )
            pe.has(f) && (pe.delete(f), s.push(f)), f = f.parent;
          for (let a = s.length - 1; a >= 0; a--) {
            const u = s[a];
            (u.f & (oe | V)) === 0 && It(u);
          }
        }
        pe.clear();
      }
    }
    pe = null;
  }
}
function qr(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & j) !== 0 ? qr(
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
      if (fn.call(t, i))
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
function jr(e, t) {
  if (!((e.f & be) !== 0 && (e.f & L) !== 0)) {
    (e.f & q) !== 0 ? t.d.push(e) : (e.f & ye) !== 0 && t.m.push(e), R(e, L);
    for (var n = e.first; n !== null; )
      jr(n, t), n = n.next;
  }
}
function Hr(e) {
  R(e, L);
  for (var t = e.first; t !== null; )
    Hr(t), t = t.next;
}
let dn = /* @__PURE__ */ new Set();
const nt = /* @__PURE__ */ new Map();
let Ur = !1;
function ft(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Sr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function z(e, t) {
  const n = ft(e);
  return Ts(n), n;
}
// @__NO_SIDE_EFFECTS__
function hs(e, t = !1, n = !0) {
  const r = ft(e);
  return t || (r.equals = xr), r;
}
function D(e, t, n = !1) {
  k !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!me || (k.f & on) !== 0) && Ar() && (k.f & (j | we | _t | on)) !== 0 && (Te === null || !Te.has(e)) && Fi();
  let r = n ? pt(t) : t;
  return At(e, r, ln);
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
    e.wv = Qr(), Gr(e, q, n), S !== null && (S.f & L) !== 0 && (S.f & (be | qe)) === 0 && (re === null ? Ms([e]) : re.push(e)), !r.is_fork && dn.size > 0 && !Ur && vs();
  }
  return t;
}
function vs() {
  Ur = !1;
  for (const e of dn) {
    (e.f & L) !== 0 && R(e, ye);
    let t;
    try {
      t = Xt(e);
    } catch {
      t = !0;
    }
    t && It(e);
  }
  dn.clear();
}
function Ut(e) {
  D(e, e.v + 1);
}
function Gr(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var f = r[s], a = f.f, u = (a & q) === 0;
      if (u && R(f, t), (a & on) !== 0)
        dn.add(
          /** @type {Effect} */
          f
        );
      else if ((a & j) !== 0) {
        var o = (
          /** @type {Derived} */
          f
        );
        U == null || U.delete(o), (a & lt) === 0 && (a & fe && (S === null || (S.f & un) === 0) && (f.f |= lt), Gr(o, ye, n));
      } else if (u) {
        var h = (
          /** @type {Effect} */
          f
        );
        (a & we) !== 0 && pe !== null && pe.add(h), n !== null ? n.push(h) : Bn(h);
      }
    }
}
function pt(e) {
  if (typeof e != "object" || e === null || gt in e)
    return e;
  const t = br(e);
  if (t !== Ei && t !== ki)
    return e;
  var n = /* @__PURE__ */ new Map(), r = jn(e), i = /* @__PURE__ */ z(0), s = st, f = (a) => {
    if (st === s)
      return a();
    var u = k, o = st;
    ce(null), ur(s);
    var h = a();
    return ce(u), ur(o), h;
  };
  return r && n.set("length", /* @__PURE__ */ z(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && Ci();
        var h = n.get(u);
        return h === void 0 ? f(() => {
          var v = /* @__PURE__ */ z(o.value);
          return n.set(u, v), v;
        }) : D(h, o.value, !0), !0;
      },
      deleteProperty(a, u) {
        var o = n.get(u);
        if (o === void 0) {
          if (u in a) {
            const h = f(() => /* @__PURE__ */ z(C));
            n.set(u, h), Ut(i);
          }
        } else
          D(o, C), Ut(i);
        return !0;
      },
      get(a, u, o) {
        var p;
        if (u === gt)
          return e;
        var h = n.get(u), v = u in a;
        if (h === void 0 && (!v || (p = jt(a, u)) != null && p.writable) && (h = f(() => {
          var d = pt(v ? a[u] : C), _ = /* @__PURE__ */ z(d);
          return _;
        }), n.set(u, h)), h !== void 0) {
          var c = m(h);
          return c === C ? void 0 : c;
        }
        return Reflect.get(a, u, o);
      },
      getOwnPropertyDescriptor(a, u) {
        var o = Reflect.getOwnPropertyDescriptor(a, u);
        if (o && "value" in o) {
          var h = n.get(u);
          h && (o.value = m(h));
        } else if (o === void 0) {
          var v = n.get(u), c = v == null ? void 0 : v.v;
          if (v !== void 0 && c !== C)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return o;
      },
      has(a, u) {
        var c;
        if (u === gt)
          return !0;
        var o = n.get(u), h = o !== void 0 && o.v !== C || Reflect.has(a, u);
        if (o !== void 0 || S !== null && (!h || (c = jt(a, u)) != null && c.writable)) {
          o === void 0 && (o = f(() => {
            var p = h ? pt(a[u]) : C, d = /* @__PURE__ */ z(p);
            return d;
          }), n.set(u, o));
          var v = m(o);
          if (v === C)
            return !1;
        }
        return h;
      },
      set(a, u, o, h) {
        var G;
        var v = n.get(u), c = u in a;
        if (r && u === "length")
          for (var p = o; p < /** @type {Source<number>} */
          v.v; p += 1) {
            var d = n.get(p + "");
            d !== void 0 ? D(d, C) : p in a && (d = f(() => /* @__PURE__ */ z(C)), n.set(p + "", d));
          }
        if (v === void 0)
          (!c || (G = jt(a, u)) != null && G.writable) && (v = f(() => /* @__PURE__ */ z(void 0)), D(v, pt(o)), n.set(u, v));
        else {
          c = v.v !== C;
          var _ = f(() => pt(o));
          D(v, _);
        }
        var x = Reflect.getOwnPropertyDescriptor(a, u);
        if (x != null && x.set && x.set.call(h, o), !c) {
          if (r && typeof u == "string") {
            var T = (
              /** @type {Source<number>} */
              n.get("length")
            ), I = Number(u);
            Number.isInteger(I) && I >= T.v && D(T, I + 1);
          }
          Ut(i);
        }
        return !0;
      },
      ownKeys(a) {
        m(i);
        var u = Reflect.ownKeys(a).filter((v) => {
          var c = n.get(v);
          return c === void 0 || c.v !== C;
        });
        for (var [o, h] of n)
          h.v !== C && !(o in a) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        Li();
      }
    }
  );
}
function lr(e) {
  try {
    if (e !== null && typeof e == "object" && gt in e)
      return e[gt];
  } catch {
  }
  return e;
}
function ps(e, t) {
  return Object.is(lr(e), lr(t));
}
var ar, Br, zr, Vr;
function _s() {
  if (ar === void 0) {
    ar = window, Br = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    zr = jt(t, "firstChild").get, Vr = jt(t, "nextSibling").get, rr(e) && (e[Ii] = void 0, e[nn] = null, e[Ni] = void 0, e.__e = void 0), rr(n) && (n[Rt] = void 0);
  }
}
function rt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function hn(e) {
  return (
    /** @type {TemplateNode | null} */
    zr.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
  return (
    /** @type {TemplateNode | null} */
    Vr.call(e)
  );
}
function ve(e, t) {
  return /* @__PURE__ */ hn(e);
}
function fr(e, t = !1) {
  {
    var n = /* @__PURE__ */ hn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Jt(n) : n;
  }
}
function H(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Jt(r);
  return r;
}
function gs(e) {
  e.textContent = "";
}
function Yr() {
  return !1;
}
function ws(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function ms(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function je(e, t) {
  var n = S;
  n !== null && (n.f & V) !== 0 && (e |= V);
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
    } catch (f) {
      throw J(r), f;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Ot) === 0 && (i = i.first, (e & we) !== 0 && (e & Tt) !== 0 && i !== null && (i.f |= Tt));
  }
  if (i !== null && (i.parent = n, n !== null && ms(i, n), k !== null && (k.f & j) !== 0 && (e & qe) === 0)) {
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
  const t = je(mn, null);
  return R(t, L), t.teardown = e, t;
}
function ys(e) {
  return je(xt | Mi, e);
}
function bs(e) {
  at.ensure();
  const t = je(qe | Ot, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? it(t, () => {
      J(t), r(void 0);
    }) : (J(t), r(void 0));
  });
}
function Es(e) {
  return je(xt, e);
}
function ks(e) {
  return je(_t | Ot, e);
}
function $r(e, t = 0) {
  return je(mn | t, e);
}
function $e(e, t = [], n = [], r = []) {
  is(r, t, n, (i) => {
    je(mn, () => {
      e(...i.map(m));
    });
  });
}
function Yn(e, t = 0) {
  var n = je(we | t, e);
  return n;
}
function ae(e) {
  return je(be | Ot, e);
}
function Kr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ot, r = k;
    or(!0), ce(null);
    try {
      t.call(null);
    } finally {
      or(n), ce(r);
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
    (n.f & qe) !== 0 ? n.parent = null : J(n, t), n = r;
  }
}
function Ss(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & be) === 0 && J(t), t = n;
  }
}
function J(e, t = !0) {
  var n = !1;
  (t || (e.f & Ti) !== 0) && e.nodes !== null && e.nodes.end !== null && (xs(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= An, $n(e, t && !n), Gt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Kr(e), e.f ^= An, e.f |= oe;
  var i = e.parent;
  i !== null && i.first !== null && Wr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function xs(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Jt(e);
    e.remove(), e = n;
  }
}
function Wr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function it(e, t, n = !0) {
  var r = [];
  Jr(e, r, !0);
  var i = () => {
    n && J(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var f = () => --s || i();
    for (var a of r)
      a.out(f);
  } else
    i();
}
function Jr(e, t, n) {
  if ((e.f & V) === 0) {
    e.f ^= V;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & qe) === 0) {
        var f = (i.f & Tt) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & be) !== 0 && (e.f & we) !== 0;
        Jr(i, t, f ? n : !1);
      }
      i = s;
    }
  }
}
function vn(e) {
  Xr(e, !0);
}
function Xr(e, t) {
  if ((e.f & V) !== 0) {
    e.f ^= V, (e.f & L) === 0 && (R(e, q), at.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Tt) !== 0 || (n.f & be) !== 0;
      Xr(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const f of s)
        (f.is_global || t) && f.in();
  }
}
function Kn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Jt(n);
      t.append(n), n = i;
    }
}
let an = !1, ot = !1;
function or(e) {
  ot = e;
}
let k = null, me = !1;
function ce(e) {
  k = e;
}
let S = null;
function Me(e) {
  S = e;
}
let Te = null;
function Ts(e) {
  k !== null && (Te ?? (Te = /* @__PURE__ */ new Set())).add(e);
}
let W = null, Z = 0, re = null;
function Ms(e) {
  re = e;
}
let Zr = 1, Ke = 0, st = Ke;
function ur(e) {
  st = e;
}
function Qr() {
  return ++Zr;
}
function Xt(e) {
  var t = e.f;
  if ((t & q) !== 0)
    return !0;
  if (t & j && (e.f &= ~lt), (t & ye) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Xt(
        /** @type {Derived} */
        s
      ) && Rr(
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
function ei(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(Te !== null && Te.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & j) !== 0 ? ei(
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
function ti(e) {
  var _;
  var t = W, n = Z, r = re, i = k, s = Te, f = ue, a = me, u = st, o = e.f;
  W = /** @type {null | Value[]} */
  null, Z = 0, re = null, k = (o & (be | qe)) === 0 ? e : null, Te = null, Mt(e.ctx), me = !1, st = ++Ke, e.ac !== null && (Wt(() => {
    e.ac.abort(Kt);
  }), e.ac = null);
  try {
    e.f |= un;
    var h = (
      /** @type {Function} */
      e.fn
    ), v = h();
    e.f |= Nt;
    var c = e.deps, p = b == null ? void 0 : b.is_fork;
    if (W !== null) {
      var d;
      if (p || Gt(e, Z), c !== null && Z > 0)
        for (c.length = Z + W.length, d = 0; d < W.length; d++)
          c[Z + d] = W[d];
      else
        e.deps = c = W;
      if (zn() && (e.f & fe) !== 0)
        for (d = Z; d < c.length; d++)
          ((_ = c[d]).reactions ?? (_.reactions = [])).push(e);
    } else !p && c !== null && Z < c.length && (Gt(e, Z), c.length = Z);
    if (Ar() && re !== null && !me && c !== null && (e.f & (j | ye | q)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      re.length; d++)
        ei(
          re[d],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Ke++, i.deps !== null)
        for (let x = 0; x < n; x += 1)
          i.deps[x].rv = Ke;
      if (t !== null)
        for (const x of t)
          x.rv = Ke;
      re !== null && (r === null ? r = re : r.push(.../** @type {Source[]} */
      re));
    }
    return (e.f & ze) !== 0 && (e.f ^= ze), v;
  } catch (x) {
    return Ir(x);
  } finally {
    e.f ^= un, W = t, Z = n, re = r, k = i, Te = s, Mt(f), me = a, st = u;
  }
}
function As(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = mi.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & j) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (W === null || !fn.call(W, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & fe) !== 0 && (s.f ^= fe, s.f &= ~lt), s.v !== C && Hn(s), s.ac !== null && Wt(() => {
      s.ac.abort(Kt), s.ac = null;
    }), os(s), Gt(s, 0);
  }
}
function Gt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      As(e, n[r]);
}
function It(e) {
  var t = e.f;
  if ((t & oe) === 0) {
    R(e, L);
    var n = S, r = an;
    S = e, an = (t & (be | qe)) === 0;
    try {
      (t & (we | kr)) !== 0 ? Ss(e) : $n(e), Kr(e);
      var i = ti(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Zr;
      var s;
    } finally {
      an = r, S = n;
    }
  }
}
function m(e) {
  var t = e.f, n = (t & j) !== 0;
  if (k !== null && !me) {
    var r = S !== null && (S.f & oe) !== 0;
    if (!r && (Te === null || !Te.has(e))) {
      var i = k.deps;
      if ((k.f & un) !== 0)
        e.rv < Ke && (e.rv = Ke, W === null && i !== null && i[Z] === e ? Z++ : W === null ? W = [e] : W.push(e));
      else {
        k.deps ?? (k.deps = []), fn.call(k.deps, e) || k.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [k] : fn.call(s, k) || s.push(k);
      }
    }
  }
  if (ot && nt.has(e))
    return nt.get(e);
  if (n) {
    var f = (
      /** @type {Derived} */
      e
    );
    if (ot) {
      var a = f.v;
      return ((f.f & L) === 0 && f.reactions !== null || ri(f)) && (a = Un(f)), nt.set(f, a), a;
    }
    var u = (f.f & fe) === 0 && !me && k !== null && (an || (k.f & fe) !== 0), o = (f.f & Nt) === 0;
    Xt(f) && (u && (f.f |= fe), Rr(f)), u && !o && (Cr(f), ni(f));
  }
  if (U != null && U.has(e))
    return U.get(e);
  if ((e.f & ze) !== 0)
    throw e.v;
  return e.v;
}
function ni(e) {
  if (e.f |= fe, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & j) !== 0 && (t.f & fe) === 0 && (Cr(
        /** @type {Derived} */
        t
      ), ni(
        /** @type {Derived} */
        t
      ));
}
function ri(e) {
  if (e.v === C) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (nt.has(t) || (t.f & j) !== 0 && ri(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function ii(e) {
  var t = me;
  try {
    return me = !0, e();
  } finally {
    me = t;
  }
}
const Is = ["touchstart", "touchmove"];
function Ns(e) {
  return Is.includes(e);
}
const We = Symbol("events"), si = /* @__PURE__ */ new Set(), Cn = /* @__PURE__ */ new Set();
function Os(e, t, n, r = {}) {
  function i(s) {
    if (r.capture || Ln.call(t, s), !s.cancelBubble)
      return Wt(() => n == null ? void 0 : n.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? tt(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function Ds(e, t, n, r, i) {
  var s = { capture: r, passive: i }, f = Os(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Vn(() => {
    t.removeEventListener(e, f, s);
  });
}
function De(e, t, n) {
  (t[We] ?? (t[We] = {}))[e] = n;
}
function Ps(e) {
  for (var t = 0; t < e.length; t++)
    si.add(e[t]);
  for (var n of Cn)
    n(e);
}
let cr = null;
function Ln(e) {
  var _, x;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((_ = e.composedPath) == null ? void 0 : _.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  cr = e;
  var f = 0, a = cr === e && e[We];
  if (a) {
    var u = i.indexOf(a);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[We] = t;
      return;
    }
    var o = i.indexOf(t);
    if (o === -1)
      return;
    u <= o && (f = u);
  }
  if (s = /** @type {Element} */
  i[f] || e.target, s !== t) {
    yi(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var h = k, v = S;
    ce(null), Me(null);
    try {
      for (var c, p = []; s !== null && s !== t; ) {
        try {
          var d = (x = s[We]) == null ? void 0 : x[r];
          d != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && d.call(s, e);
        } catch (T) {
          c ? p.push(T) : c = T;
        }
        if (e.cancelBubble) break;
        f++, s = f < i.length ? (
          /** @type {Element} */
          i[f]
        ) : null;
      }
      if (c) {
        for (let T of p)
          queueMicrotask(() => {
            throw T;
          });
        throw c;
      }
    } finally {
      e[We] = t, delete e.currentTarget, ce(h), Me(v);
    }
  }
}
var mr;
const kn = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((mr = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : mr.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Rs(e) {
  return (
    /** @type {string} */
    (kn == null ? void 0 : kn.createHTML(e)) ?? e
  );
}
function Cs(e) {
  var t = ws("template");
  return t.innerHTML = Rs(e.replaceAll("<!>", "<!---->")), t.content;
}
function dr(e, t) {
  var n = (
    /** @type {Effect} */
    S
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Ae(e, t) {
  var n = (t & Gi) !== 0, r = (t & Bi) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Cs(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ hn(i)));
    var f = (
      /** @type {TemplateNode} */
      r || Br ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ hn(f)
      ), u = (
        /** @type {TemplateNode} */
        f.lastChild
      );
      dr(a, u);
    } else
      dr(f, f);
    return f;
  };
}
function ke(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Sn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Rt] ?? (e[Rt] = e.nodeValue)) && (e[Rt] = n, e.nodeValue = `${n}`);
}
function Ls(e, t) {
  return Fs(e, t);
}
const tn = /* @__PURE__ */ new Map();
function Fs(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: f = !0, transformError: a }) {
  _s();
  var u = void 0, o = bs(() => {
    var h = n ?? t.appendChild(rt());
    Qi(
      /** @type {TemplateNode} */
      h,
      {
        pending: () => {
        }
      },
      (p) => {
        Tr({});
        var d = (
          /** @type {ComponentContext} */
          ue
        );
        s && (d.c = s), i && (r.$$events = i), u = e(p, r) || {}, Mr();
      },
      a
    );
    var v = /* @__PURE__ */ new Set(), c = (p) => {
      for (var d = 0; d < p.length; d++) {
        var _ = p[d];
        if (!v.has(_)) {
          v.add(_);
          var x = Ns(_);
          for (const G of [t, document]) {
            var T = tn.get(G);
            T === void 0 && (T = /* @__PURE__ */ new Map(), tn.set(G, T));
            var I = T.get(_);
            I === void 0 ? (G.addEventListener(_, Ln, { passive: x }), T.set(_, 1)) : T.set(_, I + 1);
          }
        }
      }
    };
    return c(wn(si)), Cn.add(c), () => {
      var x;
      for (var p of v)
        for (const T of [t, document]) {
          var d = (
            /** @type {Map<string, number>} */
            tn.get(T)
          ), _ = (
            /** @type {number} */
            d.get(p)
          );
          --_ == 0 ? (T.removeEventListener(p, Ln), d.delete(p), d.size === 0 && tn.delete(T)) : d.set(p, _);
        }
      Cn.delete(c), h !== n && ((x = h.parentNode) == null || x.removeChild(h));
    };
  });
  return qs.set(u, o), u;
}
let qs = /* @__PURE__ */ new WeakMap();
var ge, xe, ee, et, Yt, $t, gn;
class js {
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
    E(this, Yt, !0);
    /**
     * @param {Batch} batch
     */
    E(this, $t, (t) => {
      if (l(this, ge).has(t)) {
        var n = (
          /** @type {Key} */
          l(this, ge).get(t)
        ), r = l(this, xe).get(n);
        if (r)
          vn(r), l(this, et).delete(n);
        else {
          var i = l(this, ee).get(n);
          i && (vn(i.effect), l(this, xe).set(n, i.effect), l(this, ee).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, f] of l(this, ge)) {
          if (l(this, ge).delete(s), s === t)
            break;
          const a = l(this, ee).get(f);
          a && (J(a.effect), l(this, ee).delete(f));
        }
        for (const [s, f] of l(this, xe)) {
          if (s === n || l(this, et).has(s)) continue;
          const a = () => {
            if (Array.from(l(this, ge).values()).includes(s)) {
              var o = document.createDocumentFragment();
              Kn(f, o), o.append(rt()), l(this, ee).set(s, { effect: f, fragment: o });
            } else
              J(f);
            l(this, et).delete(s), l(this, xe).delete(s);
          };
          l(this, Yt) || !r ? (l(this, et).add(s), it(f, a, !1)) : a();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    E(this, gn, (t) => {
      l(this, ge).delete(t);
      const n = Array.from(l(this, ge).values());
      for (const [r, i] of l(this, ee))
        n.includes(r) || (J(i.effect), l(this, ee).delete(r));
    });
    this.anchor = t, y(this, Yt, n);
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
    ), i = Yr();
    if (n && !l(this, xe).has(t) && !l(this, ee).has(t))
      if (i) {
        var s = document.createDocumentFragment(), f = rt();
        s.append(f), l(this, ee).set(t, {
          effect: ae(() => n(f)),
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
      r.oncommit(l(this, $t)), r.ondiscard(l(this, gn));
    } else
      l(this, $t).call(this, r);
  }
}
ge = new WeakMap(), xe = new WeakMap(), ee = new WeakMap(), et = new WeakMap(), Yt = new WeakMap(), $t = new WeakMap(), gn = new WeakMap();
function ct(e, t, n = !1) {
  var r = new js(e), i = n ? Tt : 0;
  function s(f, a) {
    r.ensure(f, a);
  }
  Yn(() => {
    var f = !1;
    t((a, u = 0) => {
      f = !0, s(u, a);
    }), f || s(-1, null);
  }, i);
}
function Hs(e, t) {
  return t;
}
function Us(e, t, n) {
  for (var r = [], i = t.length, s, f = t.length, a = 0; a < i; a++) {
    let v = t[a];
    it(
      v,
      () => {
        if (s) {
          if (s.pending.delete(v), s.done.add(v), s.pending.size === 0) {
            var c = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Fn(e, wn(s.done)), c.delete(s), c.size === 0 && (e.outrogroups = null);
          }
        } else
          f -= 1;
      },
      !1
    );
  }
  if (f === 0) {
    var u = r.length === 0 && n !== null;
    if (u) {
      var o = (
        /** @type {Element} */
        n
      ), h = (
        /** @type {Element} */
        o.parentNode
      );
      gs(h), h.append(o), e.items.clear();
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
    for (const f of e.pending.values())
      for (const a of f)
        r.add(
          /** @type {EachItem} */
          e.items.get(a).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= Fe;
      const f = document.createDocumentFragment();
      Kn(s, f);
    } else
      J(t[i], n);
  }
}
var hr;
function Gs(e, t, n, r, i, s = null) {
  var f = e, a = /* @__PURE__ */ new Map();
  {
    var u = (
      /** @type {Element} */
      e
    );
    f = u.appendChild(rt());
  }
  var o = null, h = /* @__PURE__ */ as(() => {
    var I = n();
    return (
      /** @type {V[]} */
      jn(I) ? I : I == null ? [] : wn(I)
    );
  }), v, c = /* @__PURE__ */ new Map(), p = !0;
  function d(I) {
    (T.effect.f & oe) === 0 && (T.pending.delete(I), T.fallback = o, Bs(T, v, f, t, r), o !== null && (v.length === 0 ? (o.f & Fe) === 0 ? vn(o) : (o.f ^= Fe, qt(o, null, f)) : it(o, () => {
      o = null;
    })));
  }
  function _(I) {
    T.pending.delete(I);
  }
  var x = Yn(() => {
    v = /** @type {V[]} */
    m(h);
    for (var I = v.length, G = /* @__PURE__ */ new Set(), te = (
      /** @type {Batch} */
      b
    ), Ie = Yr(), Ee = 0; Ee < I; Ee += 1) {
      var Ne = v[Ee], Oe = r(Ne, Ee), F = p ? null : a.get(Oe);
      F ? (F.v && At(F.v, Ne), F.i && At(F.i, Ee), Ie && te.unskip_effect(F.e)) : (F = zs(
        a,
        p ? f : hr ?? (hr = rt()),
        Ne,
        Oe,
        Ee,
        i,
        t,
        n
      ), p || (F.e.f |= Fe), a.set(Oe, F)), G.add(Oe);
    }
    if (I === 0 && s && !o && (p ? o = ae(() => s(f)) : (o = ae(() => s(hr ?? (hr = rt()))), o.f |= Fe)), I > G.size && Pi(), !p)
      if (c.set(te, G), Ie) {
        for (const [Zt, Qt] of a)
          G.has(Zt) || te.skip_effect(Qt.e);
        te.oncommit(d), te.ondiscard(_);
      } else
        d(te);
    m(h);
  }), T = { effect: x, items: a, pending: c, outrogroups: null, fallback: o };
  p = !1;
}
function Pt(e) {
  for (; e !== null && (e.f & be) === 0; )
    e = e.next;
  return e;
}
function Bs(e, t, n, r, i) {
  var Oe;
  var s = t.length, f = e.items, a = Pt(e.effect.first), u, o = null, h = [], v = [], c, p, d, _;
  for (_ = 0; _ < s; _ += 1) {
    if (c = t[_], p = i(c, _), d = /** @type {EachItem} */
    f.get(p).e, e.outrogroups !== null)
      for (const F of e.outrogroups)
        F.pending.delete(d), F.done.delete(d);
    if ((d.f & V) !== 0 && vn(d), (d.f & Fe) !== 0)
      if (d.f ^= Fe, d === a)
        qt(d, null, n);
      else {
        var x = o ? o.next : a;
        d === e.effect.last && (e.effect.last = d.prev), d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), He(e, o, d), He(e, d, x), qt(d, x, n), o = d, h = [], v = [], a = Pt(o.next);
        continue;
      }
    if (d !== a) {
      if (u !== void 0 && u.has(d)) {
        if (h.length < v.length) {
          var T = v[0], I;
          o = T.prev;
          var G = h[0], te = h[h.length - 1];
          for (I = 0; I < h.length; I += 1)
            qt(h[I], T, n);
          for (I = 0; I < v.length; I += 1)
            u.delete(v[I]);
          He(e, G.prev, te.next), He(e, o, G), He(e, te, T), a = T, o = te, _ -= 1, h = [], v = [];
        } else
          u.delete(d), qt(d, a, n), He(e, d.prev, d.next), He(e, d, o === null ? e.effect.first : o.next), He(e, o, d), o = d;
        continue;
      }
      for (h = [], v = []; a !== null && a !== d; )
        (u ?? (u = /* @__PURE__ */ new Set())).add(a), v.push(a), a = Pt(a.next);
      if (a === null)
        continue;
    }
    (d.f & Fe) === 0 && h.push(d), o = d, a = Pt(d.next);
  }
  if (e.outrogroups !== null) {
    for (const F of e.outrogroups)
      F.pending.size === 0 && (Fn(e, wn(F.done)), (Oe = e.outrogroups) == null || Oe.delete(F));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (a !== null || u !== void 0) {
    var Ie = [];
    if (u !== void 0)
      for (d of u)
        (d.f & V) === 0 && Ie.push(d);
    for (; a !== null; )
      (a.f & V) === 0 && a !== e.fallback && Ie.push(a), a = Pt(a.next);
    var Ee = Ie.length;
    if (Ee > 0) {
      var Ne = s === 0 ? n : null;
      Us(e, Ie, Ne);
    }
  }
}
function zs(e, t, n, r, i, s, f, a) {
  var u = (f & ji) !== 0 ? (f & Ui) === 0 ? /* @__PURE__ */ hs(n, !1, !1) : ft(n) : null, o = (f & Hi) !== 0 ? ft(i) : null;
  return {
    v: u,
    i: o,
    e: ae(() => (s(t, u ?? n, o ?? i, a), () => {
      e.delete(r);
    }))
  };
}
function qt(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & Fe) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Jt(r)
      );
      if (s.before(r), r === i)
        return;
      r = f;
    }
}
function He(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function li(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!jn(t))
      return Yi();
    for (var r of e.options)
      r.selected = t.includes(vr(r));
    return;
  }
  for (r of e.options) {
    var i = vr(r);
    if (ps(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function Vs(e) {
  var t = new MutationObserver(() => {
    li(e, e.__value);
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
function vr(e) {
  return "__value" in e ? e.__value : e.value;
}
const Ys = Symbol("is custom element"), $s = Symbol("is html"), Ks = Oi ? "progress" : "PROGRESS";
function pr(e, t) {
  var n = Wn(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== Ks) || (e.value = t ?? "");
}
function Ws(e, t) {
  var n = Wn(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function xn(e, t, n, r) {
  var i = Wn(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[Ai] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Js(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Wn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[nn] ?? (e[nn] = {
      [Ys]: e.nodeName.includes("-"),
      [$s]: e.namespaceURI === zi
    })
  );
}
var _r = /* @__PURE__ */ new Map();
function Js(e) {
  var t = e.getAttribute("is") || e.nodeName, n = _r.get(t);
  if (n) return n;
  _r.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = bi(i);
    for (var f in r)
      r[f].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      f !== "innerHTML" && f !== "textContent" && f !== "innerText" && n.push(f);
    i = br(i);
  }
  return n;
}
function Tn(e, t) {
  return e === t || (e == null ? void 0 : e[gt]) === t;
}
function Xs(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    ue.r
  ), s = (
    /** @type {Effect} */
    S
  );
  return Es(() => {
    var f, a;
    return $r(() => {
      f = a, a = [], ii(() => {
        Tn(n(...a), e) || (t(e, ...a), f && Tn(n(...f), e) && t(null, ...f));
      });
    }), () => {
      let u = s;
      for (; u !== i && u.parent !== null && u.parent.f & An; )
        u = u.parent;
      const o = () => {
        a && Tn(n(...a), e) && t(null, ...a);
      }, h = u.teardown;
      u.teardown = () => {
        o(), h == null || h();
      };
    };
  }), e;
}
const Zs = "5";
var yr;
typeof window < "u" && ((yr = window.__svelte ?? (window.__svelte = {})).v ?? (yr.v = /* @__PURE__ */ new Set())).add(Zs);
function gr(e, t) {
  const n = t(), r = JSON.stringify(n);
  let i = structuredClone(n);
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
      const f = JSON.stringify(i);
      f === r ? localStorage.removeItem(e) : localStorage.setItem(e, f);
    },
    /** Forkast utkastet og gå tilbake til publisert tilstand. */
    reset() {
      return localStorage.removeItem(e), i = structuredClone(n), i;
    },
    hasDraft() {
      return localStorage.getItem(e) !== null;
    }
  };
}
function Qs(e, t = {}) {
  const n = (i) => {
    var f, a, u;
    if (i.origin !== location.origin) return;
    const s = i.data;
    (s == null ? void 0 : s.type) === "urd-edit" && ((f = t.onEdit) == null || f.call(t, s)), (s == null ? void 0 : s.type) === "urd-move" && ((a = t.onMove) == null || a.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete" && ((u = t.onDelete) == null || u.call(t, s));
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
var el = /* @__PURE__ */ Ae("<option> </option>"), tl = /* @__PURE__ */ Ae('<select class="svelte-1n46o8q"></select>'), nl = /* @__PURE__ */ Ae('<span class="palette svelte-1n46o8q"><button class="ghost svelte-1n46o8q" title="Ny tekstblokk">+ Tekst</button> <button class="ghost svelte-1n46o8q" title="Ny knapp">+ Knapp</button> <button class="ghost svelte-1n46o8q" title="Ny strek/form">+ Form</button></span> <details class="gridmenu svelte-1n46o8q"><summary title="Grid-innstillinger (gjelder hele nettstedet, publiseres med site.json)" class="svelte-1n46o8q">⌗ Grid</summary> <div class="gridmenu-body svelte-1n46o8q"><label class="svelte-1n46o8q">Kolonner <input type="number" min="4" max="100" class="svelte-1n46o8q"/></label> <label class="svelte-1n46o8q">Radhøyde (px) <input type="number" min="2" max="64" class="svelte-1n46o8q"/></label> <label class="gridmenu-snap svelte-1n46o8q"><input type="checkbox"/> Snap til grid</label> <p class="gridmenu-hint svelte-1n46o8q">Gridet vises mens du drar. Flere kolonner og lavere radhøyde gir finere plassering.</p></div></details>', 1), rl = /* @__PURE__ */ Ae('<span class="badge svelte-1n46o8q">Upubliserte endringer</span>'), il = /* @__PURE__ */ Ae('<span class="who svelte-1n46o8q"> </span>'), sl = /* @__PURE__ */ Ae('<a class="ghost svelte-1n46o8q" href="/api/github/login">Logg inn med GitHub</a>'), ll = /* @__PURE__ */ Ae('<!> <a class="ghost svelte-1n46o8q" target="_blank" rel="noopener">Se siden ↗</a> <button class="ghost svelte-1n46o8q">Forkast utkast</button> <button class="primary svelte-1n46o8q">Publiser</button>', 1), al = /* @__PURE__ */ Ae('<iframe title="Forhåndsvisning" class="svelte-1n46o8q"></iframe>'), fl = /* @__PURE__ */ Ae('<p class="loading svelte-1n46o8q">Laster…</p>'), ol = /* @__PURE__ */ Ae('<div class="editor svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><strong class="brand svelte-1n46o8q">Urd</strong> <!> <!> <!> <span class="status svelte-1n46o8q"> </span> <span class="spacer svelte-1n46o8q"></span> <!></header> <!></div>');
function ul(e, t) {
  Tr(t, !0);
  let n = /* @__PURE__ */ z(null), r = /* @__PURE__ */ z(null), i = /* @__PURE__ */ z(!1), s = /* @__PURE__ */ z(""), f = /* @__PURE__ */ z(null), a = /* @__PURE__ */ z(null), u = /* @__PURE__ */ z(pt({ columns: 24, rowHeight: 8, snap: !0 })), o = null, h = null, v = null;
  const c = () => m(n).pages.find((g) => g.id === m(r));
  function p() {
    D(i, (o == null ? void 0 : o.hasDraft()) || (h == null ? void 0 : h.hasDraft()) || !1, !0);
  }
  async function d() {
    D(n, await (await fetch("/content/site.json")).json(), !0), h = gr("urd-draft-site", () => m(n)), D(u, { snap: !0, ...h.data.grid }, !0), await T(new URLSearchParams(location.search).get("page") ?? m(n).pages[0].id), await x();
  }
  function _(g, w) {
    D(u, { ...m(u), [g]: w }, !0), h.data.grid = { ...h.data.grid, [g]: w }, h.save(), p(), v == null || v.sendSite(h.data);
  }
  async function x() {
    try {
      const g = await fetch("/api/github/me");
      D(a, g.ok ? await g.json() : null, !0);
    } catch {
      D(a, null);
    }
  }
  async function T(g) {
    D(r, g, !0);
    const w = c(), O = await (await fetch(`/${w.file}`)).json();
    o = gr(`urd-draft-${g}`, () => O), p(), D(s, "");
  }
  function I() {
    v == null || v.destroy(), v = Qs(m(f), {
      onEdit: G,
      onMove: te,
      onDelete: Ie
    }), h.hasDraft() && v.sendSite(h.data), o.hasDraft() && v.sendPage(m(r), o.data);
  }
  function G(g) {
    const w = o.data.sections.find((M) => M.id === g.sectionId), O = w == null ? void 0 : w.blocks.find((M) => M.id === g.blockId);
    O && (O.props = g.props, o.save(), p(), D(s, ""));
  }
  function te(g) {
    const w = o.data.sections.find((M) => M.id === g.sectionId), O = w == null ? void 0 : w.blocks.find((M) => M.id === g.blockId);
    O && (O.frames.desktop = g.frame, o.save(), p());
  }
  function Ie(g) {
    const w = o.data.sections.find((O) => O.id === g.sectionId);
    w && (w.blocks = w.blocks.filter((O) => O.id !== g.blockId), o.save(), p(), v == null || v.sendSection(m(r), w));
  }
  const Ee = {
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
  function Ne(g) {
    const w = o.data.sections[0], O = Ee[g], M = Math.max(0, ...w.blocks.map((Y) => Y.frames.desktop.y + Y.frames.desktop.h));
    w.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: g,
      version: 1,
      props: structuredClone(O.props),
      animation: null,
      frames: {
        desktop: { x: 1, y: M + 1, w: O.w, h: O.h, z: 1, rot: 0 },
        mobile: null
      }
    }), o.save(), p(), v == null || v.sendSection(m(r), w);
  }
  function Oe() {
    const g = o.reset(), w = h.reset();
    D(u, { snap: !0, ...w.grid }, !0), p(), D(s, ""), v == null || v.sendSite(w), v == null || v.sendPage(m(r), g);
  }
  async function F() {
    var Y, ne;
    D(s, "Publiserer…");
    const g = c(), w = [];
    o.hasDraft() && w.push({
      path: g.file,
      content: JSON.stringify(o.data, null, 2) + `
`,
      encoding: "utf-8"
    }), h.hasDraft() && w.push({
      path: "content/site.json",
      content: JSON.stringify(h.data, null, 2) + `
`,
      encoding: "utf-8"
    });
    const O = { message: `Oppdater ${g.title} via Urd-admin`, files: w };
    let M = null;
    try {
      M = await fetch("/api/github/commit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(O)
      });
    } catch {
    }
    M != null && M.ok ? (localStorage.removeItem(`urd-draft-${m(r)}`), localStorage.removeItem("urd-draft-site"), D(s, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), D(i, !1)) : (M == null ? void 0 : M.status) === 401 ? (D(s, "Du må logge inn med GitHub for å publisere."), await x()) : (M == null ? void 0 : M.status) === 403 ? D(s, ((Y = await M.json().catch(() => null)) == null ? void 0 : Y.error) ?? "Du har ikke publiseringstilgang.", !0) : M ? D(s, ((ne = await M.json().catch(() => null)) == null ? void 0 : ne.error) ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : D(s, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
  }
  d();
  var Zt = ol(), Qt = ve(Zt), Jn = H(ve(Qt), 2);
  {
    var ai = (g) => {
      var w = tl();
      Gs(w, 21, () => m(n).pages, Hs, (M, Y) => {
        var ne = el(), Ve = ve(ne), Ye = {};
        $e(() => {
          Sn(Ve, m(Y).title), Ye !== (Ye = m(Y).id) && (ne.value = (ne.__value = m(Y).id) ?? "");
        }), ke(M, ne);
      });
      var O;
      Vs(w), $e(() => {
        O !== (O = m(r)) && (w.value = (w.__value = m(r)) ?? "", li(w, m(r)));
      }), De("change", w, (M) => T(M.target.value)), ke(g, w);
    };
    ct(Jn, (g) => {
      m(n) && g(ai);
    });
  }
  var Xn = H(Jn, 2);
  {
    var fi = (g) => {
      var w = nl(), O = fr(w), M = ve(O), Y = H(M, 2), ne = H(Y, 2), Ve = H(O, 2), Ye = H(ve(Ve), 2), de = ve(Ye), he = H(ve(de)), en = H(de, 2), er = H(ve(en)), _i = H(en, 2), tr = ve(_i);
      $e(() => {
        pr(he, m(u).columns), pr(er, m(u).rowHeight), Ws(tr, m(u).snap !== !1);
      }), De("click", M, () => Ne("text")), De("click", Y, () => Ne("button")), De("click", ne, () => Ne("shape")), De("change", he, (Dt) => _("columns", Math.max(4, Math.min(100, Number(Dt.target.value) || 24)))), De("change", er, (Dt) => _("rowHeight", Math.max(2, Math.min(64, Number(Dt.target.value) || 8)))), De("change", tr, (Dt) => _("snap", Dt.target.checked)), ke(g, w);
    };
    ct(Xn, (g) => {
      m(n) && g(fi);
    });
  }
  var Zn = H(Xn, 2);
  {
    var oi = (g) => {
      var w = rl();
      ke(g, w);
    };
    ct(Zn, (g) => {
      m(i) && g(oi);
    });
  }
  var Qn = H(Zn, 2), ui = ve(Qn), ci = H(Qn, 4);
  {
    var di = (g) => {
      var w = ll(), O = fr(w);
      {
        var M = (de) => {
          var he = il(), en = ve(he);
          $e(() => {
            xn(he, "title", m(a).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Sn(en, `${m(a).allowed ? "" : "⚠ "}${m(a).login ?? ""}`);
          }), ke(de, he);
        }, Y = (de) => {
          var he = sl();
          ke(de, he);
        };
        ct(O, (de) => {
          var he;
          (he = m(a)) != null && he.loggedIn ? de(M) : m(a) && de(Y, 1);
        });
      }
      var ne = H(O, 2), Ve = H(ne, 2), Ye = H(Ve, 2);
      $e(
        (de) => {
          xn(ne, "href", de), Ve.disabled = !m(i), Ye.disabled = !m(i);
        },
        [() => c().path]
      ), De("click", Ve, Oe), De("click", Ye, F), ke(g, w);
    };
    ct(ci, (g) => {
      m(n) && g(di);
    });
  }
  var hi = H(Qt, 2);
  {
    var vi = (g) => {
      var w = al();
      Xs(w, (O) => D(f, O), () => m(f)), $e(() => xn(w, "src", `/?page=${m(r)}&preview=1`)), Ds("load", w, I), ke(g, w);
    }, pi = (g) => {
      var w = fl();
      ke(g, w);
    };
    ct(hi, (g) => {
      m(n) ? g(vi) : g(pi, -1);
    });
  }
  $e(() => Sn(ui, m(s))), ke(e, Zt), Mr();
}
Ps(["change", "click"]);
const hl = Ls(ul, { target: document.getElementById("urd-admin") });
export {
  hl as default
};
