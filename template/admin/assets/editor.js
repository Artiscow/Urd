var ii = Object.defineProperty;
var Wn = (e) => {
  throw TypeError(e);
};
var si = (e, t, n) => t in e ? ii(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var J = (e, t, n) => si(e, typeof t != "symbol" ? t + "" : t, n), wn = (e, t, n) => t.has(e) || Wn("Cannot " + n);
var l = (e, t, n) => (wn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), b = (e, t, n) => t.has(e) ? Wn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), m = (e, t, n, r) => (wn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), T = (e, t, n) => (wn(e, t, "access private method"), n);
var Fn = Array.isArray, li = Array.prototype.indexOf, sn = Array.prototype.includes, pn = Array.from, fi = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, oi = Object.getOwnPropertyDescriptors, ai = Object.prototype, ui = Array.prototype, ur = Object.getPrototypeOf, Jn = Object.isExtensible;
const ci = () => {
};
function hi(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function cr() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const U = 2, Et = 4, _n = 8, hr = 1 << 24, pe = 16, we = 32, De = 64, xn = 128, le = 512, L = 1024, j = 2048, ge = 4096, z = 8192, fe = 16384, At = 32768, Tn = 1 << 25, kt = 65536, ln = 1 << 17, di = 1 << 18, It = 1 << 19, vi = 1 << 20, Oe = 1 << 25, tt = 65536, fn = 1 << 21, dt = 1 << 22, Be = 1 << 23, vt = Symbol("$state"), pi = Symbol(""), Xt = Symbol("attributes"), _i = Symbol("class"), gi = Symbol("style"), Dt = Symbol("text"), $t = new class extends Error {
  constructor() {
    super(...arguments);
    J(this, "name", "StaleReactionError");
    J(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function wi() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function mi(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function yi() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function bi() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ei() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function ki() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Si() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const xi = 1, Ti = 2, Ai = 16, Ii = 1, Mi = 2, R = Symbol("uninitialized"), Ni = "http://www.w3.org/1999/xhtml";
function Oi() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Di() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Pi() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function dr(e) {
  return e === this.v;
}
function Ci(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function vr(e) {
  return !Ci(e, this.v);
}
let oe = null;
function St(e) {
  oe = e;
}
function pr(e, t = !1, n) {
  oe = {
    p: oe,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      x
    ),
    l: null
  };
}
function _r(e) {
  var t = (
    /** @type {ComponentContext} */
    oe
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      fs(r);
  }
  return t.i = !0, oe = t.p, /** @type {T} */
  {};
}
function gr() {
  return !0;
}
let ct = [];
function Ri() {
  var e = ct;
  ct = [], hi(e);
}
function Je(e) {
  if (ct.length === 0) {
    var t = ct;
    queueMicrotask(() => {
      t === ct && Ri();
    });
  }
  ct.push(e);
}
function wr(e) {
  var t = x;
  if (t === null)
    return S.f |= Be, e;
  if ((t.f & At) === 0 && (t.f & Et) === 0)
    throw e;
  Ue(e, t);
}
function Ue(e, t) {
  if (!(t !== null && (t.f & fe) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & xn) !== 0) {
        if ((t.f & At) === 0)
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
const Li = -7169;
function C(e, t) {
  e.f = e.f & Li | t;
}
function qn(e) {
  (e.f & le) !== 0 || e.deps === null ? C(e, L) : C(e, ge);
}
function mr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & U) === 0 || (t.f & tt) === 0 || (t.f ^= tt, mr(
        /** @type {Derived} */
        t.deps
      ));
}
function yr(e, t, n) {
  (e.f & j) !== 0 ? t.add(e) : (e.f & ge) !== 0 && n.add(e), mr(e.deps), C(e, L);
}
function Kt(e) {
  var t = S, n = x;
  ae(null), Se(null);
  try {
    return e();
  } finally {
    ae(t), Se(n);
  }
}
function Fi(e) {
  let t = 0, n = rt(0), r;
  return () => {
    Hn() && (E(n), Lr(() => (t === 0 && (r = $r(() => e(() => Ut(n)))), t += 1, () => {
      Je(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Ut(n));
      });
    })));
  };
}
var qi = kt | It;
function ji(e, t, n, r) {
  new Ui(e, t, n, r);
}
var ne, Ln, re, Ge, V, ie, H, Q, Ae, Ye, qe, pt, Ht, zt, Ie, hn, D, Bi, Hi, zi, An, en, tn, In, Mn;
class Ui {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    b(this, D);
    /** @type {Boundary | null} */
    J(this, "parent");
    J(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    J(this, "transform_error");
    /** @type {TemplateNode} */
    b(this, ne);
    /** @type {TemplateNode | null} */
    b(this, Ln, null);
    /** @type {BoundaryProps} */
    b(this, re);
    /** @type {((anchor: Node) => void)} */
    b(this, Ge);
    /** @type {Effect} */
    b(this, V);
    /** @type {Effect | null} */
    b(this, ie, null);
    /** @type {Effect | null} */
    b(this, H, null);
    /** @type {Effect | null} */
    b(this, Q, null);
    /** @type {DocumentFragment | null} */
    b(this, Ae, null);
    b(this, Ye, 0);
    b(this, qe, 0);
    b(this, pt, !1);
    /** @type {Set<Effect>} */
    b(this, Ht, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    b(this, zt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    b(this, Ie, null);
    b(this, hn, Fi(() => (m(this, Ie, rt(l(this, Ye))), () => {
      m(this, Ie, null);
    })));
    var s;
    m(this, ne, t), m(this, re, n), m(this, Ge, (a) => {
      var f = (
        /** @type {Effect} */
        x
      );
      f.b = this, f.f |= xn, r(a);
    }), this.parent = /** @type {Effect} */
    x.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((a) => a), m(this, V, Vn(() => {
      T(this, D, An).call(this);
    }, qi));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    yr(t, l(this, Ht), l(this, zt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!l(this, re).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    T(this, D, In).call(this, t, n), m(this, Ye, l(this, Ye) + t), !(!l(this, Ie) || l(this, pt)) && (m(this, pt, !0), Je(() => {
      m(this, pt, !1), l(this, Ie) && xt(l(this, Ie), l(this, Ye));
    }));
  }
  get_effect_pending() {
    return l(this, hn).call(this), E(
      /** @type {Source<number>} */
      l(this, Ie)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!l(this, re).onerror && !l(this, re).failed)
      throw t;
    y != null && y.is_fork ? (l(this, ie) && y.skip_effect(l(this, ie)), l(this, H) && y.skip_effect(l(this, H)), l(this, Q) && y.skip_effect(l(this, Q)), y.oncommit(() => {
      T(this, D, Mn).call(this, t);
    })) : T(this, D, Mn).call(this, t);
  }
}
ne = new WeakMap(), Ln = new WeakMap(), re = new WeakMap(), Ge = new WeakMap(), V = new WeakMap(), ie = new WeakMap(), H = new WeakMap(), Q = new WeakMap(), Ae = new WeakMap(), Ye = new WeakMap(), qe = new WeakMap(), pt = new WeakMap(), Ht = new WeakMap(), zt = new WeakMap(), Ie = new WeakMap(), hn = new WeakMap(), D = new WeakSet(), Bi = function() {
  try {
    m(this, ie, se(() => l(this, Ge).call(this, l(this, ne))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Hi = function(t) {
  const n = l(this, re).failed;
  n && m(this, Q, se(() => {
    n(
      l(this, ne),
      () => t,
      () => () => {
      }
    );
  }));
}, zi = function() {
  const t = l(this, re).pending;
  t && (this.is_pending = !0, m(this, H, se(() => t(l(this, ne)))), Je(() => {
    var n = m(this, Ae, document.createDocumentFragment()), r = Qe();
    n.append(r), m(this, ie, T(this, D, tn).call(this, () => se(() => l(this, Ge).call(this, r)))), l(this, qe) === 0 && (l(this, ne).before(n), m(this, Ae, null), Xe(
      /** @type {Effect} */
      l(this, H),
      () => {
        m(this, H, null);
      }
    ), T(this, D, en).call(
      this,
      /** @type {Batch} */
      y
    ));
  }));
}, An = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), m(this, qe, 0), m(this, Ye, 0), m(this, ie, se(() => {
      l(this, Ge).call(this, l(this, ne));
    })), l(this, qe) > 0) {
      var t = m(this, Ae, document.createDocumentFragment());
      Yn(l(this, ie), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        l(this, re).pending
      );
      m(this, H, se(() => n(l(this, ne))));
    } else
      T(this, D, en).call(
        this,
        /** @type {Batch} */
        y
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
en = function(t) {
  this.is_pending = !1, t.transfer_effects(l(this, Ht), l(this, zt));
}, /**
 * @template T
 * @param {() => T} fn
 */
tn = function(t) {
  var n = x, r = S, i = oe;
  Se(l(this, V)), ae(l(this, V)), St(l(this, V).ctx);
  try {
    return nt.ensure(), t();
  } catch (s) {
    return wr(s), null;
  } finally {
    Se(n), ae(r), St(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
In = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && T(r = this.parent, D, In).call(r, t, n);
    return;
  }
  m(this, qe, l(this, qe) + t), l(this, qe) === 0 && (T(this, D, en).call(this, n), l(this, H) && Xe(l(this, H), () => {
    m(this, H, null);
  }), l(this, Ae) && (l(this, ne).before(l(this, Ae)), m(this, Ae, null)));
}, /**
 * @param {unknown} error
 */
Mn = function(t) {
  l(this, ie) && (K(l(this, ie)), m(this, ie, null)), l(this, H) && (K(l(this, H)), m(this, H, null)), l(this, Q) && (K(l(this, Q)), m(this, Q, null));
  var n = l(this, re).onerror;
  let r = l(this, re).failed;
  var i = !1, s = !1;
  const a = () => {
    if (i) {
      Pi();
      return;
    }
    i = !0, s && Si(), l(this, Q) !== null && Xe(l(this, Q), () => {
      m(this, Q, null);
    }), T(this, D, tn).call(this, () => {
      T(this, D, An).call(this);
    });
  }, f = (o) => {
    try {
      s = !0, n == null || n(o, a), s = !1;
    } catch (u) {
      Ue(u, l(this, V) && l(this, V).parent);
    }
    r && m(this, Q, T(this, D, tn).call(this, () => {
      try {
        return se(() => {
          var u = (
            /** @type {Effect} */
            x
          );
          u.b = this, u.f |= xn, r(
            l(this, ne),
            () => o,
            () => a
          );
        });
      } catch (u) {
        return Ue(
          u,
          /** @type {Effect} */
          l(this, V).parent
        ), null;
      }
    }));
  };
  Je(() => {
    var o;
    try {
      o = this.transform_error(t);
    } catch (u) {
      Ue(u, l(this, V) && l(this, V).parent);
      return;
    }
    o !== null && typeof o == "object" && typeof /** @type {any} */
    o.then == "function" ? o.then(
      f,
      /** @param {unknown} e */
      (u) => Ue(u, l(this, V) && l(this, V).parent)
    ) : f(o);
  });
};
function Vi(e, t, n, r) {
  const i = Er;
  var s = e.filter((d) => !d.settled), a = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(a);
    return;
  }
  var f = (
    /** @type {Effect} */
    x
  ), o = Gi(), u = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((d) => d.promise)) : null;
  function v(d) {
    if ((f.f & fe) === 0) {
      o();
      try {
        r([...a, ...d]);
      } catch (h) {
        Ue(h, f);
      }
      on();
    }
  }
  var p = br();
  if (n.length === 0) {
    u.then(() => v([])).finally(p);
    return;
  }
  function c() {
    Promise.all(n.map((d) => /* @__PURE__ */ Yi(d))).then(v).catch((d) => Ue(d, f)).finally(p);
  }
  u ? u.then(() => {
    o(), c(), on();
  }) : c();
}
function Gi() {
  var e = (
    /** @type {Effect} */
    x
  ), t = S, n = oe, r = (
    /** @type {Batch} */
    y
  );
  return function(s = !0) {
    Se(e), ae(t), St(n), s && (e.f & fe) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function on(e = !0) {
  Se(null), ae(null), St(null), e && (y == null || y.deactivate());
}
function br() {
  var e = (
    /** @type {Effect} */
    x
  ), t = e.b, n = (
    /** @type {Batch} */
    y
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Er(e) {
  var t = U | j;
  return x !== null && (x.f |= It), {
    ctx: oe,
    deps: null,
    effects: null,
    equals: dr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      R
    ),
    wv: 0,
    parent: x,
    ac: null
  };
}
const Pt = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Yi(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    x
  );
  r === null && wi();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = rt(
    /** @type {V} */
    R
  ), a = !S, f = /* @__PURE__ */ new Set();
  return us(() => {
    var d, h;
    var o = (
      /** @type {Effect} */
      x
    ), u = cr();
    i = u.promise;
    try {
      Promise.resolve(e()).then(u.resolve, (_) => {
        _ !== $t && u.reject(_);
      }).finally(on);
    } catch (_) {
      u.reject(_), on();
    }
    var v = (
      /** @type {Batch} */
      y
    );
    if (a) {
      if ((o.f & At) !== 0)
        var p = br();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (d = r.b) != null && d.is_rendered()
      )
        (h = v.async_deriveds.get(o)) == null || h.reject(Pt);
      else
        for (const _ of f.values())
          _.reject(Pt);
      f.add(u), v.async_deriveds.set(o, u);
    }
    const c = (_, A = void 0) => {
      p == null || p(), f.delete(u), A !== Pt && (v.activate(), A ? (s.f |= Be, xt(s, A)) : ((s.f & Be) !== 0 && (s.f ^= Be), xt(s, _)), v.deactivate());
    };
    u.promise.then(c, (_) => c(null, _ || "unknown"));
  }), zn(() => {
    for (const o of f)
      o.reject(Pt);
  }), new Promise((o) => {
    function u(v) {
      function p() {
        v === i ? o(s) : u(i);
      }
      v.then(p, p);
    }
    u(i);
  });
}
// @__NO_SIDE_EFFECTS__
function $i(e) {
  const t = /* @__PURE__ */ Er(e);
  return t.equals = vr, t;
}
function Ki(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      K(
        /** @type {Effect} */
        t[n]
      );
  }
}
function jn(e) {
  var t, n = x, r = e.parent;
  if (!it && r !== null && e.v !== R && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (fe | z)) !== 0)
    return Oi(), e.v;
  Se(r);
  try {
    e.f &= ~tt, Ki(e), t = Vr(e);
  } finally {
    Se(n);
  }
  return t;
}
function kr(e) {
  var t = jn(e);
  if (!e.equals(t) && (e.wv = Hr(), (!(y != null && y.is_fork) || e.deps === null) && (y !== null ? (y.capture(e, t, !0), jt == null || jt.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    C(e, L);
    return;
  }
  it || (B !== null ? (Hn() || y != null && y.is_fork) && B.set(e, t) : qn(e));
}
function Wi(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && Kt(() => {
        n.ac.abort($t), n.ac = null;
      }), n.fn !== null && (n.teardown = ci), Bt(n, 0), Gn(n));
}
function Sr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && Tt(t);
}
let mn = null, st = null, y = null, jt = null, B = null, Nn = null, yn = !1, ht = null, nn = null;
var Zn = 0;
let Ji = 1;
var _t, je, $e, gt, wt, mt, Me, yt, G, Vt, Ne, de, be, bt, Ke, N, On, Ct, Dn, xr, Tr, ut, Zi, Rt;
const dn = class dn {
  constructor() {
    b(this, N);
    J(this, "id", Ji++);
    /** True as soon as `#process` was called */
    b(this, _t, !1);
    J(this, "linked", !0);
    /** @type {Batch | null} */
    b(this, je, null);
    /** @type {Batch | null} */
    b(this, $e, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    J(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    J(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    J(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    b(this, gt, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    b(this, wt, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    b(this, mt, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    b(this, Me, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    b(this, yt, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    b(this, G, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    b(this, Vt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    b(this, Ne, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    b(this, de, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    b(this, be, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    b(this, bt, /* @__PURE__ */ new Set());
    J(this, "is_fork", !1);
    b(this, Ke, !1);
    st === null ? mn = st = this : (m(st, $e, this), m(this, je, st)), st = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    l(this, be).has(t) || l(this, be).set(t, { d: [], m: [] }), l(this, bt).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = l(this, be).get(t);
    if (r) {
      l(this, be).delete(t);
      for (var i of r.d)
        C(i, j), n(i);
      for (i of r.m)
        C(i, ge), n(i);
    }
    l(this, bt).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== R && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & Be) === 0 && (this.current.set(t, [n, r]), B == null || B.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    y = this;
  }
  deactivate() {
    y = null, B = null;
  }
  flush() {
    try {
      yn = !0, y = this, T(this, N, Ct).call(this);
    } finally {
      Zn = 0, Nn = null, ht = null, nn = null, yn = !1, y = null, B = null, Ze.clear();
    }
  }
  discard() {
    var t;
    for (const n of l(this, wt)) n(this);
    l(this, wt).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Pt);
    T(this, N, Rt).call(this), (t = l(this, yt)) == null || t.resolve();
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
    if (m(this, mt, l(this, mt) + 1), t) {
      let r = l(this, Me).get(n) ?? 0;
      l(this, Me).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (m(this, mt, l(this, mt) - 1), t) {
      let r = l(this, Me).get(n) ?? 0;
      r === 1 ? l(this, Me).delete(n) : l(this, Me).set(n, r - 1);
    }
    l(this, Ke) || (m(this, Ke, !0), Je(() => {
      m(this, Ke, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      l(this, Ne).add(r);
    for (const r of n)
      l(this, de).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    l(this, gt).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    l(this, wt).add(t);
  }
  settled() {
    return (l(this, yt) ?? m(this, yt, cr())).promise;
  }
  static ensure() {
    if (y === null) {
      const t = y = new dn();
      yn || Je(() => {
        l(t, _t) || t.flush();
      });
    }
    return y;
  }
  apply() {
    {
      B = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (Nn = t, (i = t.b) != null && i.is_pending && (t.f & (Et | _n | hr)) !== 0 && (t.f & At) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ht !== null && n === x && (S === null || (S.f & U) === 0))
        return;
      if ((r & (De | we)) !== 0) {
        if ((r & L) === 0)
          return;
        n.f ^= L;
      }
    }
    l(this, G).push(n);
  }
};
_t = new WeakMap(), je = new WeakMap(), $e = new WeakMap(), gt = new WeakMap(), wt = new WeakMap(), mt = new WeakMap(), Me = new WeakMap(), yt = new WeakMap(), G = new WeakMap(), Vt = new WeakMap(), Ne = new WeakMap(), de = new WeakMap(), be = new WeakMap(), bt = new WeakMap(), Ke = new WeakMap(), N = new WeakSet(), On = function() {
  if (this.is_fork) return !0;
  for (const r of l(this, Me).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (l(this, be).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Ct = function() {
  var o, u, v, p;
  m(this, _t, !0), Zn++ > 1e3 && (T(this, N, Rt).call(this), Qi());
  for (const c of l(this, Ne))
    l(this, de).delete(c), C(c, j), this.schedule(c);
  for (const c of l(this, de))
    C(c, ge), this.schedule(c);
  const t = l(this, G);
  m(this, G, []), this.apply();
  var n = ht = [], r = [], i = nn = [];
  for (const c of t)
    try {
      T(this, N, Dn).call(this, c, n, r);
    } catch (d) {
      throw Mr(c), T(this, N, On).call(this) || this.discard(), d;
    }
  if (y = null, i.length > 0) {
    var s = dn.ensure();
    for (const c of i)
      s.schedule(c);
  }
  if (ht = null, nn = null, T(this, N, On).call(this)) {
    T(this, N, ut).call(this, r), T(this, N, ut).call(this, n);
    for (const [c, d] of l(this, be))
      Ir(c, d);
    i.length > 0 && /** @type {unknown} */
    T(o = y, N, Ct).call(o);
    return;
  }
  const a = T(this, N, xr).call(this);
  if (a) {
    T(this, N, ut).call(this, r), T(this, N, ut).call(this, n), T(u = a, N, Tr).call(u, this);
    return;
  }
  l(this, Ne).clear(), l(this, de).clear();
  for (const c of l(this, gt)) c(this);
  l(this, gt).clear(), jt = this, Qn(r), Qn(n), jt = null, (v = l(this, yt)) == null || v.resolve();
  var f = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    y
  );
  if (l(this, mt) === 0 && (l(this, G).length === 0 || f !== null) && T(this, N, Rt).call(this), l(this, G).length > 0)
    if (f !== null) {
      const c = f;
      l(c, G).push(...l(this, G).filter((d) => !l(c, G).includes(d)));
    } else
      f = this;
  f !== null && T(p = f, N, Ct).call(p);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Dn = function(t, n, r) {
  t.f ^= L;
  for (var i = t.first; i !== null; ) {
    var s = i.f, a = (s & (we | De)) !== 0, f = a && (s & L) !== 0, o = f || (s & z) !== 0 || l(this, be).has(i);
    if (!o && i.fn !== null) {
      a ? i.f ^= L : (s & Et) !== 0 ? n.push(i) : Jt(i) && ((s & pe) !== 0 && l(this, de).add(i), Tt(i));
      var u = i.first;
      if (u !== null) {
        i = u;
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
}, xr = function() {
  for (var t = l(this, je); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = l(t, je);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Tr = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const a = this.async_deriveds.get(i);
    a && s.promise.then(a.resolve).catch(a.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(l(t, Ne), l(t, de));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & U) !== 0 && (i.f & (j | ge)) === 0))
      for (const o of s) {
        var a = o.f;
        if ((a & U) !== 0)
          n(
            /** @type {Derived} */
            o
          );
        else {
          var f = (
            /** @type {Effect} */
            o
          );
          a & (dt | pe) && !this.async_deriveds.has(f) && (l(this, de).delete(f), C(f, j), this.schedule(f));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), T(r = t, N, Rt).call(r), y = this, T(this, N, Ct).call(this);
}, /**
 * @param {Effect[]} effects
 */
ut = function(t) {
  for (var n = 0; n < t.length; n += 1)
    yr(t[n], l(this, Ne), l(this, de));
}, Zi = function() {
  var p;
  for (let c = mn; c !== null; c = l(c, $e)) {
    var t = c.id < this.id, n = [];
    for (const [d, [h, _]] of this.current) {
      if (c.current.has(d)) {
        var r = (
          /** @type {[any, boolean]} */
          c.current.get(d)[0]
        );
        if (t && h !== r)
          c.current.set(d, [h, _]);
        else
          continue;
      }
      n.push(d);
    }
    if (t)
      for (const [d, h] of this.async_deriveds) {
        const _ = c.async_deriveds.get(d);
        _ && h.promise.then(_.resolve).catch(_.reject);
      }
    var i = [...c.current.keys()].filter(
      (d) => !/** @type {[any, boolean]} */
      c.current.get(d)[1]
    );
    if (!(!l(c, _t) || i.length === 0)) {
      var s = i.filter((d) => !this.current.has(d));
      if (s.length === 0)
        t && c.discard();
      else if (n.length > 0) {
        if (t)
          for (const d of l(this, bt))
            c.unskip_effect(d, (h) => {
              var _;
              (h.f & (pe | dt)) !== 0 ? c.schedule(h) : T(_ = c, N, ut).call(_, [h]);
            });
        c.activate();
        var a = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var o of n)
          Ar(o, s, a, f);
        f = /* @__PURE__ */ new Map();
        var u = [...c.current].filter(([d, h]) => {
          const _ = this.current.get(d);
          return _ ? _[0] !== h[0] || _[1] !== h[1] : !0;
        }).map(([d]) => d);
        if (u.length > 0)
          for (const d of l(this, Vt))
            (d.f & (fe | z | ln)) === 0 && Un(d, u, f) && ((d.f & (dt | pe)) !== 0 ? (C(d, j), c.schedule(d)) : l(c, Ne).add(d));
        if (l(c, G).length > 0 && !l(c, Ke)) {
          c.apply();
          for (var v of l(c, G))
            T(p = c, N, Dn).call(p, v, [], []);
          m(c, G, []);
        }
        c.deactivate();
      }
    }
  }
}, Rt = function() {
  if (this.linked) {
    var t = l(this, je), n = l(this, $e);
    t === null ? mn = n : m(t, $e, n), n === null ? st = t : m(n, je, t), this.linked = !1;
  }
};
let nt = dn;
function Qi() {
  try {
    yi();
  } catch (e) {
    Ue(e, Nn);
  }
}
let he = null;
function Qn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (fe | z)) === 0 && Jt(r) && (he = /* @__PURE__ */ new Set(), Tt(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && qr(r), (he == null ? void 0 : he.size) > 0)) {
        Ze.clear();
        for (const i of he) {
          if ((i.f & (fe | z)) !== 0) continue;
          const s = [i];
          let a = i.parent;
          for (; a !== null; )
            he.has(a) && (he.delete(a), s.push(a)), a = a.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const o = s[f];
            (o.f & (fe | z)) === 0 && Tt(o);
          }
        }
        he.clear();
      }
    }
    he = null;
  }
}
function Ar(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & U) !== 0 ? Ar(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (dt | pe)) !== 0 && (s & j) === 0 && Un(i, t, r) && (C(i, j), Bn(
        /** @type {Effect} */
        i
      ));
    }
}
function Un(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (sn.call(t, i))
        return !0;
      if ((i.f & U) !== 0 && Un(
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
  y.schedule(e);
}
function Ir(e, t) {
  if (!((e.f & we) !== 0 && (e.f & L) !== 0)) {
    (e.f & j) !== 0 ? t.d.push(e) : (e.f & ge) !== 0 && t.m.push(e), C(e, L);
    for (var n = e.first; n !== null; )
      Ir(n, t), n = n.next;
  }
}
function Mr(e) {
  C(e, L);
  for (var t = e.first; t !== null; )
    Mr(t), t = t.next;
}
let an = /* @__PURE__ */ new Set();
const Ze = /* @__PURE__ */ new Map();
let Nr = !1;
function rt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: dr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function Y(e, t) {
  const n = rt(e);
  return ds(n), n;
}
// @__NO_SIDE_EFFECTS__
function Xi(e, t = !1, n = !0) {
  const r = rt(e);
  return t || (r.equals = vr), r;
}
function O(e, t, n = !1) {
  S !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!_e || (S.f & ln) !== 0) && gr() && (S.f & (U | pe | dt | ln)) !== 0 && (ke === null || !ke.has(e)) && ki();
  let r = n ? Lt(t) : t;
  return xt(e, r, nn);
}
function xt(e, t, n = null) {
  if (!e.equals(t)) {
    Ze.set(e, it ? t : e.v);
    var r = nt.ensure();
    if (r.capture(e, t), (e.f & U) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & j) !== 0 && jn(i), B === null && qn(i);
    }
    e.wv = Hr(), Or(e, j, n), x !== null && (x.f & L) !== 0 && (x.f & (we | De)) === 0 && (te === null ? vs([e]) : te.push(e)), !r.is_fork && an.size > 0 && !Nr && es();
  }
  return t;
}
function es() {
  Nr = !1;
  for (const e of an) {
    (e.f & L) !== 0 && C(e, ge);
    let t;
    try {
      t = Jt(e);
    } catch {
      t = !0;
    }
    t && Tt(e);
  }
  an.clear();
}
function Ut(e) {
  O(e, e.v + 1);
}
function Or(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var a = r[s], f = a.f, o = (f & j) === 0;
      if (o && C(a, t), (f & ln) !== 0)
        an.add(
          /** @type {Effect} */
          a
        );
      else if ((f & U) !== 0) {
        var u = (
          /** @type {Derived} */
          a
        );
        B == null || B.delete(u), (f & tt) === 0 && (f & le && (x === null || (x.f & fn) === 0) && (a.f |= tt), Or(u, ge, n));
      } else if (o) {
        var v = (
          /** @type {Effect} */
          a
        );
        (f & pe) !== 0 && he !== null && he.add(v), n !== null ? n.push(v) : Bn(v);
      }
    }
}
function Lt(e) {
  if (typeof e != "object" || e === null || vt in e)
    return e;
  const t = ur(e);
  if (t !== ai && t !== ui)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Fn(e), i = /* @__PURE__ */ Y(0), s = et, a = (f) => {
    if (et === s)
      return f();
    var o = S, u = et;
    ae(null), nr(s);
    var v = f();
    return ae(o), nr(u), v;
  };
  return r && n.set("length", /* @__PURE__ */ Y(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, o, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && bi();
        var v = n.get(o);
        return v === void 0 ? a(() => {
          var p = /* @__PURE__ */ Y(u.value);
          return n.set(o, p), p;
        }) : O(v, u.value, !0), !0;
      },
      deleteProperty(f, o) {
        var u = n.get(o);
        if (u === void 0) {
          if (o in f) {
            const v = a(() => /* @__PURE__ */ Y(R));
            n.set(o, v), Ut(i);
          }
        } else
          O(u, R), Ut(i);
        return !0;
      },
      get(f, o, u) {
        var d;
        if (o === vt)
          return e;
        var v = n.get(o), p = o in f;
        if (v === void 0 && (!p || (d = qt(f, o)) != null && d.writable) && (v = a(() => {
          var h = Lt(p ? f[o] : R), _ = /* @__PURE__ */ Y(h);
          return _;
        }), n.set(o, v)), v !== void 0) {
          var c = E(v);
          return c === R ? void 0 : c;
        }
        return Reflect.get(f, o, u);
      },
      getOwnPropertyDescriptor(f, o) {
        var u = Reflect.getOwnPropertyDescriptor(f, o);
        if (u && "value" in u) {
          var v = n.get(o);
          v && (u.value = E(v));
        } else if (u === void 0) {
          var p = n.get(o), c = p == null ? void 0 : p.v;
          if (p !== void 0 && c !== R)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return u;
      },
      has(f, o) {
        var c;
        if (o === vt)
          return !0;
        var u = n.get(o), v = u !== void 0 && u.v !== R || Reflect.has(f, o);
        if (u !== void 0 || x !== null && (!v || (c = qt(f, o)) != null && c.writable)) {
          u === void 0 && (u = a(() => {
            var d = v ? Lt(f[o]) : R, h = /* @__PURE__ */ Y(d);
            return h;
          }), n.set(o, u));
          var p = E(u);
          if (p === R)
            return !1;
        }
        return v;
      },
      set(f, o, u, v) {
        var F;
        var p = n.get(o), c = o in f;
        if (r && o === "length")
          for (var d = u; d < /** @type {Source<number>} */
          p.v; d += 1) {
            var h = n.get(d + "");
            h !== void 0 ? O(h, R) : d in f && (h = a(() => /* @__PURE__ */ Y(R)), n.set(d + "", h));
          }
        if (p === void 0)
          (!c || (F = qt(f, o)) != null && F.writable) && (p = a(() => /* @__PURE__ */ Y(void 0)), O(p, Lt(u)), n.set(o, p));
        else {
          c = p.v !== R;
          var _ = a(() => Lt(u));
          O(p, _);
        }
        var A = Reflect.getOwnPropertyDescriptor(f, o);
        if (A != null && A.set && A.set.call(v, u), !c) {
          if (r && typeof o == "string") {
            var I = (
              /** @type {Source<number>} */
              n.get("length")
            ), M = Number(o);
            Number.isInteger(M) && M >= I.v && O(I, M + 1);
          }
          Ut(i);
        }
        return !0;
      },
      ownKeys(f) {
        E(i);
        var o = Reflect.ownKeys(f).filter((p) => {
          var c = n.get(p);
          return c === void 0 || c.v !== R;
        });
        for (var [u, v] of n)
          v.v !== R && !(u in f) && o.push(u);
        return o;
      },
      setPrototypeOf() {
        Ei();
      }
    }
  );
}
function Xn(e) {
  try {
    if (e !== null && typeof e == "object" && vt in e)
      return e[vt];
  } catch {
  }
  return e;
}
function ts(e, t) {
  return Object.is(Xn(e), Xn(t));
}
var er, Dr, Pr, Cr;
function ns() {
  if (er === void 0) {
    er = window, Dr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Pr = qt(t, "firstChild").get, Cr = qt(t, "nextSibling").get, Jn(e) && (e[_i] = void 0, e[Xt] = null, e[gi] = void 0, e.__e = void 0), Jn(n) && (n[Dt] = void 0);
  }
}
function Qe(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function un(e) {
  return (
    /** @type {TemplateNode | null} */
    Pr.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Wt(e) {
  return (
    /** @type {TemplateNode | null} */
    Cr.call(e)
  );
}
function lt(e, t) {
  return /* @__PURE__ */ un(e);
}
function rs(e, t = !1) {
  {
    var n = /* @__PURE__ */ un(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Wt(n) : n;
  }
}
function ce(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Wt(r);
  return r;
}
function is(e) {
  e.textContent = "";
}
function Rr() {
  return !1;
}
function ss(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function ls(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Pe(e, t) {
  var n = x;
  n !== null && (n.f & z) !== 0 && (e |= z);
  var r = {
    ctx: oe,
    deps: null,
    nodes: null,
    f: e | j | le,
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
  y == null || y.register_created_effect(r);
  var i = r;
  if ((e & Et) !== 0)
    ht !== null ? ht.push(r) : nt.ensure().schedule(r);
  else if (t !== null) {
    try {
      Tt(r);
    } catch (a) {
      throw K(r), a;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & It) === 0 && (i = i.first, (e & pe) !== 0 && (e & kt) !== 0 && i !== null && (i.f |= kt));
  }
  if (i !== null && (i.parent = n, n !== null && ls(i, n), S !== null && (S.f & U) !== 0 && (e & De) === 0)) {
    var s = (
      /** @type {Derived} */
      S
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function Hn() {
  return S !== null && !_e;
}
function zn(e) {
  const t = Pe(_n, null);
  return C(t, L), t.teardown = e, t;
}
function fs(e) {
  return Pe(Et | vi, e);
}
function os(e) {
  nt.ensure();
  const t = Pe(De | It, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Xe(t, () => {
      K(t), r(void 0);
    }) : (K(t), r(void 0));
  });
}
function as(e) {
  return Pe(Et, e);
}
function us(e) {
  return Pe(dt | It, e);
}
function Lr(e, t = 0) {
  return Pe(_n | t, e);
}
function ft(e, t = [], n = [], r = []) {
  Vi(r, t, n, (i) => {
    Pe(_n, () => {
      e(...i.map(E));
    });
  });
}
function Vn(e, t = 0) {
  var n = Pe(pe | t, e);
  return n;
}
function se(e) {
  return Pe(we | It, e);
}
function Fr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = it, r = S;
    tr(!0), ae(null);
    try {
      t.call(null);
    } finally {
      tr(n), ae(r);
    }
  }
}
function Gn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Kt(() => {
      i.abort($t);
    });
    var r = n.next;
    (n.f & De) !== 0 ? n.parent = null : K(n, t), n = r;
  }
}
function cs(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & we) === 0 && K(t), t = n;
  }
}
function K(e, t = !0) {
  var n = !1;
  (t || (e.f & di) !== 0) && e.nodes !== null && e.nodes.end !== null && (hs(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= Tn, Gn(e, t && !n), Bt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Fr(e), e.f ^= Tn, e.f |= fe;
  var i = e.parent;
  i !== null && i.first !== null && qr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function hs(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Wt(e);
    e.remove(), e = n;
  }
}
function qr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Xe(e, t, n = !0) {
  var r = [];
  jr(e, r, !0);
  var i = () => {
    n && K(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var a = () => --s || i();
    for (var f of r)
      f.out(a);
  } else
    i();
}
function jr(e, t, n) {
  if ((e.f & z) === 0) {
    e.f ^= z;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const f of r)
        (f.is_global || n) && t.push(f);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & De) === 0) {
        var a = (i.f & kt) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & we) !== 0 && (e.f & pe) !== 0;
        jr(i, t, a ? n : !1);
      }
      i = s;
    }
  }
}
function cn(e) {
  Ur(e, !0);
}
function Ur(e, t) {
  if ((e.f & z) !== 0) {
    e.f ^= z, (e.f & L) === 0 && (C(e, j), nt.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & kt) !== 0 || (n.f & we) !== 0;
      Ur(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const a of s)
        (a.is_global || t) && a.in();
  }
}
function Yn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Wt(n);
      t.append(n), n = i;
    }
}
let rn = !1, it = !1;
function tr(e) {
  it = e;
}
let S = null, _e = !1;
function ae(e) {
  S = e;
}
let x = null;
function Se(e) {
  x = e;
}
let ke = null;
function ds(e) {
  S !== null && (ke ?? (ke = /* @__PURE__ */ new Set())).add(e);
}
let $ = null, Z = 0, te = null;
function vs(e) {
  te = e;
}
let Br = 1, ze = 0, et = ze;
function nr(e) {
  et = e;
}
function Hr() {
  return ++Br;
}
function Jt(e) {
  var t = e.f;
  if ((t & j) !== 0)
    return !0;
  if (t & U && (e.f &= ~tt), (t & ge) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Jt(
        /** @type {Derived} */
        s
      ) && kr(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & le) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    B === null && C(e, L);
  }
  return !1;
}
function zr(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(ke !== null && ke.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & U) !== 0 ? zr(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? C(s, j) : (s.f & L) !== 0 && C(s, ge), Bn(
        /** @type {Effect} */
        s
      ));
    }
}
function Vr(e) {
  var _;
  var t = $, n = Z, r = te, i = S, s = ke, a = oe, f = _e, o = et, u = e.f;
  $ = /** @type {null | Value[]} */
  null, Z = 0, te = null, S = (u & (we | De)) === 0 ? e : null, ke = null, St(e.ctx), _e = !1, et = ++ze, e.ac !== null && (Kt(() => {
    e.ac.abort($t);
  }), e.ac = null);
  try {
    e.f |= fn;
    var v = (
      /** @type {Function} */
      e.fn
    ), p = v();
    e.f |= At;
    var c = e.deps, d = y == null ? void 0 : y.is_fork;
    if ($ !== null) {
      var h;
      if (d || Bt(e, Z), c !== null && Z > 0)
        for (c.length = Z + $.length, h = 0; h < $.length; h++)
          c[Z + h] = $[h];
      else
        e.deps = c = $;
      if (Hn() && (e.f & le) !== 0)
        for (h = Z; h < c.length; h++)
          ((_ = c[h]).reactions ?? (_.reactions = [])).push(e);
    } else !d && c !== null && Z < c.length && (Bt(e, Z), c.length = Z);
    if (gr() && te !== null && !_e && c !== null && (e.f & (U | ge | j)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      te.length; h++)
        zr(
          te[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (ze++, i.deps !== null)
        for (let A = 0; A < n; A += 1)
          i.deps[A].rv = ze;
      if (t !== null)
        for (const A of t)
          A.rv = ze;
      te !== null && (r === null ? r = te : r.push(.../** @type {Source[]} */
      te));
    }
    return (e.f & Be) !== 0 && (e.f ^= Be), p;
  } catch (A) {
    return wr(A);
  } finally {
    e.f ^= fn, $ = t, Z = n, te = r, S = i, ke = s, St(a), _e = f, et = o;
  }
}
function ps(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = li.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & U) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  ($ === null || !sn.call($, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & le) !== 0 && (s.f ^= le, s.f &= ~tt), s.v !== R && qn(s), s.ac !== null && Kt(() => {
      s.ac.abort($t), s.ac = null;
    }), Wi(s), Bt(s, 0);
  }
}
function Bt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      ps(e, n[r]);
}
function Tt(e) {
  var t = e.f;
  if ((t & fe) === 0) {
    C(e, L);
    var n = x, r = rn;
    x = e, rn = (t & (we | De)) === 0;
    try {
      (t & (pe | hr)) !== 0 ? cs(e) : Gn(e), Fr(e);
      var i = Vr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Br;
      var s;
    } finally {
      rn = r, x = n;
    }
  }
}
function E(e) {
  var t = e.f, n = (t & U) !== 0;
  if (S !== null && !_e) {
    var r = x !== null && (x.f & fe) !== 0;
    if (!r && (ke === null || !ke.has(e))) {
      var i = S.deps;
      if ((S.f & fn) !== 0)
        e.rv < ze && (e.rv = ze, $ === null && i !== null && i[Z] === e ? Z++ : $ === null ? $ = [e] : $.push(e));
      else {
        S.deps ?? (S.deps = []), sn.call(S.deps, e) || S.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [S] : sn.call(s, S) || s.push(S);
      }
    }
  }
  if (it && Ze.has(e))
    return Ze.get(e);
  if (n) {
    var a = (
      /** @type {Derived} */
      e
    );
    if (it) {
      var f = a.v;
      return ((a.f & L) === 0 && a.reactions !== null || Yr(a)) && (f = jn(a)), Ze.set(a, f), f;
    }
    var o = (a.f & le) === 0 && !_e && S !== null && (rn || (S.f & le) !== 0), u = (a.f & At) === 0;
    Jt(a) && (o && (a.f |= le), kr(a)), o && !u && (Sr(a), Gr(a));
  }
  if (B != null && B.has(e))
    return B.get(e);
  if ((e.f & Be) !== 0)
    throw e.v;
  return e.v;
}
function Gr(e) {
  if (e.f |= le, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & U) !== 0 && (t.f & le) === 0 && (Sr(
        /** @type {Derived} */
        t
      ), Gr(
        /** @type {Derived} */
        t
      ));
}
function Yr(e) {
  if (e.v === R) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ze.has(t) || (t.f & U) !== 0 && Yr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function $r(e) {
  var t = _e;
  try {
    return _e = !0, e();
  } finally {
    _e = t;
  }
}
const _s = ["touchstart", "touchmove"];
function gs(e) {
  return _s.includes(e);
}
const Ve = Symbol("events"), Kr = /* @__PURE__ */ new Set(), Pn = /* @__PURE__ */ new Set();
function ws(e, t, n, r = {}) {
  function i(s) {
    if (r.capture || Cn.call(t, s), !s.cancelBubble)
      return Kt(() => n == null ? void 0 : n.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Je(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function ms(e, t, n, r, i) {
  var s = { capture: r, passive: i }, a = ws(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && zn(() => {
    t.removeEventListener(e, a, s);
  });
}
function ot(e, t, n) {
  (t[Ve] ?? (t[Ve] = {}))[e] = n;
}
function ys(e) {
  for (var t = 0; t < e.length; t++)
    Kr.add(e[t]);
  for (var n of Pn)
    n(e);
}
let rr = null;
function Cn(e) {
  var _, A;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((_ = e.composedPath) == null ? void 0 : _.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  rr = e;
  var a = 0, f = rr === e && e[Ve];
  if (f) {
    var o = i.indexOf(f);
    if (o !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ve] = t;
      return;
    }
    var u = i.indexOf(t);
    if (u === -1)
      return;
    o <= u && (a = o);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    fi(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var v = S, p = x;
    ae(null), Se(null);
    try {
      for (var c, d = []; s !== null && s !== t; ) {
        try {
          var h = (A = s[Ve]) == null ? void 0 : A[r];
          h != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && h.call(s, e);
        } catch (I) {
          c ? d.push(I) : c = I;
        }
        if (e.cancelBubble) break;
        a++, s = a < i.length ? (
          /** @type {Element} */
          i[a]
        ) : null;
      }
      if (c) {
        for (let I of d)
          queueMicrotask(() => {
            throw I;
          });
        throw c;
      }
    } finally {
      e[Ve] = t, delete e.currentTarget, ae(v), Se(p);
    }
  }
}
var or;
const bn = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((or = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : or.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function bs(e) {
  return (
    /** @type {string} */
    (bn == null ? void 0 : bn.createHTML(e)) ?? e
  );
}
function Es(e) {
  var t = ss("template");
  return t.innerHTML = bs(e.replaceAll("<!>", "<!---->")), t.content;
}
function ir(e, t) {
  var n = (
    /** @type {Effect} */
    x
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function xe(e, t) {
  var n = (t & Ii) !== 0, r = (t & Mi) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Es(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ un(i)));
    var a = (
      /** @type {TemplateNode} */
      r || Dr ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ un(a)
      ), o = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      ir(f, o);
    } else
      ir(a, a);
    return a;
  };
}
function ye(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function En(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Dt] ?? (e[Dt] = e.nodeValue)) && (e[Dt] = n, e.nodeValue = `${n}`);
}
function ks(e, t) {
  return Ss(e, t);
}
const Qt = /* @__PURE__ */ new Map();
function Ss(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: a = !0, transformError: f }) {
  ns();
  var o = void 0, u = os(() => {
    var v = n ?? t.appendChild(Qe());
    ji(
      /** @type {TemplateNode} */
      v,
      {
        pending: () => {
        }
      },
      (d) => {
        pr({});
        var h = (
          /** @type {ComponentContext} */
          oe
        );
        s && (h.c = s), i && (r.$$events = i), o = e(d, r) || {}, _r();
      },
      f
    );
    var p = /* @__PURE__ */ new Set(), c = (d) => {
      for (var h = 0; h < d.length; h++) {
        var _ = d[h];
        if (!p.has(_)) {
          p.add(_);
          var A = gs(_);
          for (const F of [t, document]) {
            var I = Qt.get(F);
            I === void 0 && (I = /* @__PURE__ */ new Map(), Qt.set(F, I));
            var M = I.get(_);
            M === void 0 ? (F.addEventListener(_, Cn, { passive: A }), I.set(_, 1)) : I.set(_, M + 1);
          }
        }
      }
    };
    return c(pn(Kr)), Pn.add(c), () => {
      var A;
      for (var d of p)
        for (const I of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            Qt.get(I)
          ), _ = (
            /** @type {number} */
            h.get(d)
          );
          --_ == 0 ? (I.removeEventListener(d, Cn), h.delete(d), h.size === 0 && Qt.delete(I)) : h.set(d, _);
        }
      Pn.delete(c), v !== n && ((A = v.parentNode) == null || A.removeChild(v));
    };
  });
  return xs.set(o, u), o;
}
let xs = /* @__PURE__ */ new WeakMap();
var ve, Ee, X, We, Gt, Yt, vn;
class Ts {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    J(this, "anchor");
    /** @type {Map<Batch, Key>} */
    b(this, ve, /* @__PURE__ */ new Map());
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
    b(this, Ee, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    b(this, X, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    b(this, We, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    b(this, Gt, !0);
    /**
     * @param {Batch} batch
     */
    b(this, Yt, (t) => {
      if (l(this, ve).has(t)) {
        var n = (
          /** @type {Key} */
          l(this, ve).get(t)
        ), r = l(this, Ee).get(n);
        if (r)
          cn(r), l(this, We).delete(n);
        else {
          var i = l(this, X).get(n);
          i && (cn(i.effect), l(this, Ee).set(n, i.effect), l(this, X).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, a] of l(this, ve)) {
          if (l(this, ve).delete(s), s === t)
            break;
          const f = l(this, X).get(a);
          f && (K(f.effect), l(this, X).delete(a));
        }
        for (const [s, a] of l(this, Ee)) {
          if (s === n || l(this, We).has(s)) continue;
          const f = () => {
            if (Array.from(l(this, ve).values()).includes(s)) {
              var u = document.createDocumentFragment();
              Yn(a, u), u.append(Qe()), l(this, X).set(s, { effect: a, fragment: u });
            } else
              K(a);
            l(this, We).delete(s), l(this, Ee).delete(s);
          };
          l(this, Gt) || !r ? (l(this, We).add(s), Xe(a, f, !1)) : f();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    b(this, vn, (t) => {
      l(this, ve).delete(t);
      const n = Array.from(l(this, ve).values());
      for (const [r, i] of l(this, X))
        n.includes(r) || (K(i.effect), l(this, X).delete(r));
    });
    this.anchor = t, m(this, Gt, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      y
    ), i = Rr();
    if (n && !l(this, Ee).has(t) && !l(this, X).has(t))
      if (i) {
        var s = document.createDocumentFragment(), a = Qe();
        s.append(a), l(this, X).set(t, {
          effect: se(() => n(a)),
          fragment: s
        });
      } else
        l(this, Ee).set(
          t,
          se(() => n(this.anchor))
        );
    if (l(this, ve).set(r, t), i) {
      for (const [f, o] of l(this, Ee))
        f === t ? r.unskip_effect(o) : r.skip_effect(o);
      for (const [f, o] of l(this, X))
        f === t ? r.unskip_effect(o.effect) : r.skip_effect(o.effect);
      r.oncommit(l(this, Yt)), r.ondiscard(l(this, vn));
    } else
      l(this, Yt).call(this, r);
  }
}
ve = new WeakMap(), Ee = new WeakMap(), X = new WeakMap(), We = new WeakMap(), Gt = new WeakMap(), Yt = new WeakMap(), vn = new WeakMap();
function at(e, t, n = !1) {
  var r = new Ts(e), i = n ? kt : 0;
  function s(a, f) {
    r.ensure(a, f);
  }
  Vn(() => {
    var a = !1;
    t((f, o = 0) => {
      a = !0, s(o, f);
    }), a || s(-1, null);
  }, i);
}
function As(e, t) {
  return t;
}
function Is(e, t, n) {
  for (var r = [], i = t.length, s, a = t.length, f = 0; f < i; f++) {
    let p = t[f];
    Xe(
      p,
      () => {
        if (s) {
          if (s.pending.delete(p), s.done.add(p), s.pending.size === 0) {
            var c = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Rn(e, pn(s.done)), c.delete(s), c.size === 0 && (e.outrogroups = null);
          }
        } else
          a -= 1;
      },
      !1
    );
  }
  if (a === 0) {
    var o = r.length === 0 && n !== null;
    if (o) {
      var u = (
        /** @type {Element} */
        n
      ), v = (
        /** @type {Element} */
        u.parentNode
      );
      is(v), v.append(u), e.items.clear();
    }
    Rn(e, t, !o);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Rn(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const a of e.pending.values())
      for (const f of a)
        r.add(
          /** @type {EachItem} */
          e.items.get(f).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= Oe;
      const a = document.createDocumentFragment();
      Yn(s, a);
    } else
      K(t[i], n);
  }
}
var sr;
function Ms(e, t, n, r, i, s = null) {
  var a = e, f = /* @__PURE__ */ new Map();
  {
    var o = (
      /** @type {Element} */
      e
    );
    a = o.appendChild(Qe());
  }
  var u = null, v = /* @__PURE__ */ $i(() => {
    var M = n();
    return (
      /** @type {V[]} */
      Fn(M) ? M : M == null ? [] : pn(M)
    );
  }), p, c = /* @__PURE__ */ new Map(), d = !0;
  function h(M) {
    (I.effect.f & fe) === 0 && (I.pending.delete(M), I.fallback = u, Ns(I, p, a, t, r), u !== null && (p.length === 0 ? (u.f & Oe) === 0 ? cn(u) : (u.f ^= Oe, Ft(u, null, a)) : Xe(u, () => {
      u = null;
    })));
  }
  function _(M) {
    I.pending.delete(M);
  }
  var A = Vn(() => {
    p = /** @type {V[]} */
    E(v);
    for (var M = p.length, F = /* @__PURE__ */ new Set(), ee = (
      /** @type {Batch} */
      y
    ), Te = Rr(), ue = 0; ue < M; ue += 1) {
      var Ce = p[ue], me = r(Ce, ue), q = d ? null : f.get(me);
      q ? (q.v && xt(q.v, Ce), q.i && xt(q.i, ue), Te && ee.unskip_effect(q.e)) : (q = Os(
        f,
        d ? a : sr ?? (sr = Qe()),
        Ce,
        me,
        ue,
        i,
        t,
        n
      ), d || (q.e.f |= Oe), f.set(me, q)), F.add(me);
    }
    if (M === 0 && s && !u && (d ? u = se(() => s(a)) : (u = se(() => s(sr ?? (sr = Qe()))), u.f |= Oe)), M > F.size && mi(), !d)
      if (c.set(ee, F), Te) {
        for (const [Zt, gn] of f)
          F.has(Zt) || ee.skip_effect(gn.e);
        ee.oncommit(h), ee.ondiscard(_);
      } else
        h(ee);
    E(v);
  }), I = { effect: A, items: f, pending: c, outrogroups: null, fallback: u };
  d = !1;
}
function Ot(e) {
  for (; e !== null && (e.f & we) === 0; )
    e = e.next;
  return e;
}
function Ns(e, t, n, r, i) {
  var me;
  var s = t.length, a = e.items, f = Ot(e.effect.first), o, u = null, v = [], p = [], c, d, h, _;
  for (_ = 0; _ < s; _ += 1) {
    if (c = t[_], d = i(c, _), h = /** @type {EachItem} */
    a.get(d).e, e.outrogroups !== null)
      for (const q of e.outrogroups)
        q.pending.delete(h), q.done.delete(h);
    if ((h.f & z) !== 0 && cn(h), (h.f & Oe) !== 0)
      if (h.f ^= Oe, h === f)
        Ft(h, null, n);
      else {
        var A = u ? u.next : f;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), Fe(e, u, h), Fe(e, h, A), Ft(h, A, n), u = h, v = [], p = [], f = Ot(u.next);
        continue;
      }
    if (h !== f) {
      if (o !== void 0 && o.has(h)) {
        if (v.length < p.length) {
          var I = p[0], M;
          u = I.prev;
          var F = v[0], ee = v[v.length - 1];
          for (M = 0; M < v.length; M += 1)
            Ft(v[M], I, n);
          for (M = 0; M < p.length; M += 1)
            o.delete(p[M]);
          Fe(e, F.prev, ee.next), Fe(e, u, F), Fe(e, ee, I), f = I, u = ee, _ -= 1, v = [], p = [];
        } else
          o.delete(h), Ft(h, f, n), Fe(e, h.prev, h.next), Fe(e, h, u === null ? e.effect.first : u.next), Fe(e, u, h), u = h;
        continue;
      }
      for (v = [], p = []; f !== null && f !== h; )
        (o ?? (o = /* @__PURE__ */ new Set())).add(f), p.push(f), f = Ot(f.next);
      if (f === null)
        continue;
    }
    (h.f & Oe) === 0 && v.push(h), u = h, f = Ot(h.next);
  }
  if (e.outrogroups !== null) {
    for (const q of e.outrogroups)
      q.pending.size === 0 && (Rn(e, pn(q.done)), (me = e.outrogroups) == null || me.delete(q));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (f !== null || o !== void 0) {
    var Te = [];
    if (o !== void 0)
      for (h of o)
        (h.f & z) === 0 && Te.push(h);
    for (; f !== null; )
      (f.f & z) === 0 && f !== e.fallback && Te.push(f), f = Ot(f.next);
    var ue = Te.length;
    if (ue > 0) {
      var Ce = s === 0 ? n : null;
      Is(e, Te, Ce);
    }
  }
}
function Os(e, t, n, r, i, s, a, f) {
  var o = (a & xi) !== 0 ? (a & Ai) === 0 ? /* @__PURE__ */ Xi(n, !1, !1) : rt(n) : null, u = (a & Ti) !== 0 ? rt(i) : null;
  return {
    v: o,
    i: u,
    e: se(() => (s(t, o ?? n, u ?? i, f), () => {
      e.delete(r);
    }))
  };
}
function Ft(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & Oe) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Wt(r)
      );
      if (s.before(r), r === i)
        return;
      r = a;
    }
}
function Fe(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Wr(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Fn(t))
      return Di();
    for (var r of e.options)
      r.selected = t.includes(lr(r));
    return;
  }
  for (r of e.options) {
    var i = lr(r);
    if (ts(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function Ds(e) {
  var t = new MutationObserver(() => {
    Wr(e, e.__value);
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
  }), zn(() => {
    t.disconnect();
  });
}
function lr(e) {
  return "__value" in e ? e.__value : e.value;
}
const Ps = Symbol("is custom element"), Cs = Symbol("is html");
function kn(e, t, n, r) {
  var i = Rs(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[pi] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ls(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Rs(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[Xt] ?? (e[Xt] = {
      [Ps]: e.nodeName.includes("-"),
      [Cs]: e.namespaceURI === Ni
    })
  );
}
var fr = /* @__PURE__ */ new Map();
function Ls(e) {
  var t = e.getAttribute("is") || e.nodeName, n = fr.get(t);
  if (n) return n;
  fr.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = oi(i);
    for (var a in r)
      r[a].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      a !== "innerHTML" && a !== "textContent" && a !== "innerText" && n.push(a);
    i = ur(i);
  }
  return n;
}
function Sn(e, t) {
  return e === t || (e == null ? void 0 : e[vt]) === t;
}
function Fs(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    oe.r
  ), s = (
    /** @type {Effect} */
    x
  );
  return as(() => {
    var a, f;
    return Lr(() => {
      a = f, f = [], $r(() => {
        Sn(n(...f), e) || (t(e, ...f), a && Sn(n(...a), e) && t(null, ...a));
      });
    }), () => {
      let o = s;
      for (; o !== i && o.parent !== null && o.parent.f & Tn; )
        o = o.parent;
      const u = () => {
        f && Sn(n(...f), e) && t(null, ...f);
      }, v = o.teardown;
      o.teardown = () => {
        u(), v == null || v();
      };
    };
  }), e;
}
const qs = "5";
var ar;
typeof window < "u" && ((ar = window.__svelte ?? (window.__svelte = {})).v ?? (ar.v = /* @__PURE__ */ new Set())).add(qs);
function js(e, t) {
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
      const a = JSON.stringify(i);
      a === r ? localStorage.removeItem(e) : localStorage.setItem(e, a);
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
function Us(e, t = {}) {
  const n = (i) => {
    var a, f, o;
    if (i.origin !== location.origin) return;
    const s = i.data;
    (s == null ? void 0 : s.type) === "urd-edit" && ((a = t.onEdit) == null || a.call(t, s)), (s == null ? void 0 : s.type) === "urd-move" && ((f = t.onMove) == null || f.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete" && ((o = t.onDelete) == null || o.call(t, s));
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
    destroy() {
      window.removeEventListener("message", n);
    }
  };
}
var Bs = /* @__PURE__ */ xe("<option> </option>"), Hs = /* @__PURE__ */ xe('<select class="svelte-1n46o8q"></select>'), zs = /* @__PURE__ */ xe('<span class="palette svelte-1n46o8q"><button class="ghost svelte-1n46o8q" title="Ny tekstblokk">+ Tekst</button> <button class="ghost svelte-1n46o8q" title="Ny knapp">+ Knapp</button> <button class="ghost svelte-1n46o8q" title="Ny strek/form">+ Form</button></span>'), Vs = /* @__PURE__ */ xe('<span class="badge svelte-1n46o8q">Upubliserte endringer</span>'), Gs = /* @__PURE__ */ xe('<span class="who svelte-1n46o8q"> </span>'), Ys = /* @__PURE__ */ xe('<a class="ghost svelte-1n46o8q" href="/api/github/login">Logg inn med GitHub</a>'), $s = /* @__PURE__ */ xe('<!> <a class="ghost svelte-1n46o8q" target="_blank" rel="noopener">Se siden ↗</a> <button class="ghost svelte-1n46o8q">Forkast utkast</button> <button class="primary svelte-1n46o8q">Publiser</button>', 1), Ks = /* @__PURE__ */ xe('<iframe title="Forhåndsvisning" class="svelte-1n46o8q"></iframe>'), Ws = /* @__PURE__ */ xe('<p class="loading svelte-1n46o8q">Laster…</p>'), Js = /* @__PURE__ */ xe('<div class="editor svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><strong class="brand svelte-1n46o8q">Urd</strong> <!> <!> <!> <span class="status svelte-1n46o8q"> </span> <span class="spacer svelte-1n46o8q"></span> <!></header> <!></div>');
function Zs(e, t) {
  pr(t, !0);
  let n = /* @__PURE__ */ Y(null), r = /* @__PURE__ */ Y(null), i = /* @__PURE__ */ Y(!1), s = /* @__PURE__ */ Y(""), a = /* @__PURE__ */ Y(null), f = /* @__PURE__ */ Y(null), o = null, u = null;
  const v = () => E(n).pages.find((g) => g.id === E(r));
  async function p() {
    O(n, await (await fetch("/content/site.json")).json(), !0), await d(new URLSearchParams(location.search).get("page") ?? E(n).pages[0].id), await c();
  }
  async function c() {
    try {
      const g = await fetch("/api/github/me");
      O(f, g.ok ? await g.json() : null, !0);
    } catch {
      O(f, null);
    }
  }
  async function d(g) {
    O(r, g, !0);
    const w = v(), k = await (await fetch(`/${w.file}`)).json();
    o = js(`urd-draft-${g}`, () => k), O(i, o.hasDraft(), !0), O(s, "");
  }
  function h() {
    u == null || u.destroy(), u = Us(E(a), {
      onEdit: _,
      onMove: A,
      onDelete: I
    }), E(i) && u.sendPage(E(r), o.data);
  }
  function _(g) {
    const w = o.data.sections.find((P) => P.id === g.sectionId), k = w == null ? void 0 : w.blocks.find((P) => P.id === g.blockId);
    k && (k.props = g.props, o.save(), O(i, o.hasDraft(), !0), O(s, ""));
  }
  function A(g) {
    const w = o.data.sections.find((P) => P.id === g.sectionId), k = w == null ? void 0 : w.blocks.find((P) => P.id === g.blockId);
    k && (k.frames.desktop = g.frame, o.save(), O(i, o.hasDraft(), !0));
  }
  function I(g) {
    const w = o.data.sections.find((k) => k.id === g.sectionId);
    w && (w.blocks = w.blocks.filter((k) => k.id !== g.blockId), o.save(), O(i, o.hasDraft(), !0), u == null || u.sendSection(E(r), w));
  }
  const M = {
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
  function F(g) {
    const w = o.data.sections[0], k = M[g], P = Math.max(0, ...w.blocks.map((W) => W.frames.desktop.y + W.frames.desktop.h));
    w.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: g,
      version: 1,
      props: structuredClone(k.props),
      animation: null,
      frames: {
        desktop: { x: 1, y: P + 1, w: k.w, h: k.h, z: 1, rot: 0 },
        mobile: null
      }
    }), o.save(), O(i, o.hasDraft(), !0), u == null || u.sendSection(E(r), w);
  }
  function ee() {
    const g = o.reset();
    O(i, !1), O(s, ""), u == null || u.sendPage(E(r), g);
  }
  async function Te() {
    var P, W;
    O(s, "Publiserer…");
    const g = v(), w = {
      message: `Oppdater ${g.title}`,
      files: [
        {
          path: g.file,
          content: JSON.stringify(o.data, null, 2) + `
`,
          encoding: "utf-8"
        }
      ]
    };
    let k = null;
    try {
      k = await fetch("/api/github/commit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(w)
      });
    } catch {
    }
    k != null && k.ok ? (localStorage.removeItem(`urd-draft-${E(r)}`), O(s, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), O(i, !1)) : (k == null ? void 0 : k.status) === 401 ? (O(s, "Du må logge inn med GitHub for å publisere."), await c()) : (k == null ? void 0 : k.status) === 403 ? O(s, ((P = await k.json().catch(() => null)) == null ? void 0 : P.error) ?? "Du har ikke publiseringstilgang.", !0) : k ? O(s, ((W = await k.json().catch(() => null)) == null ? void 0 : W.error) ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : O(s, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
  }
  p();
  var ue = Js(), Ce = lt(ue), me = ce(lt(Ce), 2);
  {
    var q = (g) => {
      var w = Hs();
      Ms(w, 21, () => E(n).pages, As, (P, W) => {
        var He = Bs(), Mt = lt(He), Nt = {};
        ft(() => {
          En(Mt, E(W).title), Nt !== (Nt = E(W).id) && (He.value = (He.__value = E(W).id) ?? "");
        }), ye(P, He);
      });
      var k;
      Ds(w), ft(() => {
        k !== (k = E(r)) && (w.value = (w.__value = E(r)) ?? "", Wr(w, E(r)));
      }), ot("change", w, (P) => d(P.target.value)), ye(g, w);
    };
    at(me, (g) => {
      E(n) && g(q);
    });
  }
  var Zt = ce(me, 2);
  {
    var gn = (g) => {
      var w = zs(), k = lt(w), P = ce(k, 2), W = ce(P, 2);
      ot("click", k, () => F("text")), ot("click", P, () => F("button")), ot("click", W, () => F("shape")), ye(g, w);
    };
    at(Zt, (g) => {
      E(n) && g(gn);
    });
  }
  var $n = ce(Zt, 2);
  {
    var Jr = (g) => {
      var w = Vs();
      ye(g, w);
    };
    at($n, (g) => {
      E(i) && g(Jr);
    });
  }
  var Kn = ce($n, 2), Zr = lt(Kn), Qr = ce(Kn, 4);
  {
    var Xr = (g) => {
      var w = $s(), k = rs(w);
      {
        var P = (Re) => {
          var Le = Gs(), ri = lt(Le);
          ft(() => {
            kn(Le, "title", E(f).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), En(ri, `${E(f).allowed ? "" : "⚠ "}${E(f).login ?? ""}`);
          }), ye(Re, Le);
        }, W = (Re) => {
          var Le = Ys();
          ye(Re, Le);
        };
        at(k, (Re) => {
          var Le;
          (Le = E(f)) != null && Le.loggedIn ? Re(P) : E(f) && Re(W, 1);
        });
      }
      var He = ce(k, 2), Mt = ce(He, 2), Nt = ce(Mt, 2);
      ft(
        (Re) => {
          kn(He, "href", Re), Mt.disabled = !E(i), Nt.disabled = !E(i);
        },
        [() => v().path]
      ), ot("click", Mt, ee), ot("click", Nt, Te), ye(g, w);
    };
    at(Qr, (g) => {
      E(n) && g(Xr);
    });
  }
  var ei = ce(Ce, 2);
  {
    var ti = (g) => {
      var w = Ks();
      Fs(w, (k) => O(a, k), () => E(a)), ft(() => kn(w, "src", `/?page=${E(r)}&preview=1`)), ms("load", w, h), ye(g, w);
    }, ni = (g) => {
      var w = Ws();
      ye(g, w);
    };
    at(ei, (g) => {
      E(n) ? g(ti) : g(ni, -1);
    });
  }
  ft(() => En(Zr, E(s))), ye(e, ue), _r();
}
ys(["change", "click"]);
const el = ks(Zs, { target: document.getElementById("urd-admin") });
export {
  el as default
};
