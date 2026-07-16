var Li = Object.defineProperty;
var ur = (e) => {
  throw TypeError(e);
};
var Fi = (e, t, n) => t in e ? Li(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ee = (e, t, n) => Fi(e, typeof t != "symbol" ? t + "" : t, n), xn = (e, t, n) => t.has(e) || ur("Cannot " + n);
var l = (e, t, n) => (xn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), E = (e, t, n) => t.has(e) ? ur("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), y = (e, t, n, r) => (xn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), I = (e, t, n) => (xn(e, t, "access private method"), n);
var Gn = Array.isArray, ji = Array.prototype.indexOf, hn = Array.prototype.includes, Sn = Array.from, Hi = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, Ui = Object.getOwnPropertyDescriptors, zi = Object.prototype, Gi = Array.prototype, Mr = Object.getPrototypeOf, cr = Object.isExtensible;
const Bi = () => {
};
function Vi(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Ir() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const U = 2, At = 4, kn = 8, Or = 1 << 24, we = 16, Ee = 32, Fe = 64, In = 128, ue = 512, j = 1024, H = 2048, be = 4096, K = 8192, ce = 16384, Dt = 32768, On = 1 << 25, Nt = 65536, vn = 1 << 17, Ki = 1 << 18, Pt = 1 << 19, Yi = 1 << 20, Le = 1 << 25, ot = 65536, pn = 1 << 21, mt = 1 << 22, Ke = 1 << 23, wt = Symbol("$state"), $i = Symbol(""), an = Symbol("attributes"), Ji = Symbol("class"), Wi = Symbol("style"), qt = Symbol("text"), Wt = new class extends Error {
  constructor() {
    super(...arguments);
    ee(this, "name", "StaleReactionError");
    ee(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Tr;
const Xi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Tr = globalThis.document) != null && Tr.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Zi() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Qi(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function es() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ts() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ns() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function rs() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function is() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const ss = 1, ls = 2, os = 16, as = 1, fs = 2, F = Symbol("uninitialized"), us = "http://www.w3.org/1999/xhtml";
function cs() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ds() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function hs() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Dr(e) {
  return e === this.v;
}
function vs(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Pr(e) {
  return !vs(e, this.v);
}
let de = null;
function Mt(e) {
  de = e;
}
function Rr(e, t = !1, n) {
  de = {
    p: de,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      N
    ),
    l: null
  };
}
function Cr(e) {
  var t = (
    /** @type {ComponentContext} */
    de
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Hs(r);
  }
  return t.i = !0, de = t.p, /** @type {T} */
  {};
}
function qr() {
  return !0;
}
let pt = [];
function ps() {
  var e = pt;
  pt = [], Vi(e);
}
function nt(e) {
  if (pt.length === 0) {
    var t = pt;
    queueMicrotask(() => {
      t === pt && ps();
    });
  }
  pt.push(e);
}
function Lr(e) {
  var t = N;
  if (t === null)
    return A.f |= Ke, e;
  if ((t.f & Dt) === 0 && (t.f & At) === 0)
    throw e;
  Ve(e, t);
}
function Ve(e, t) {
  if (!(t !== null && (t.f & ce) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & In) !== 0) {
        if ((t.f & Dt) === 0)
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
const _s = -7169;
function q(e, t) {
  e.f = e.f & _s | t;
}
function Bn(e) {
  (e.f & ue) !== 0 || e.deps === null ? q(e, j) : q(e, be);
}
function Fr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & U) === 0 || (t.f & ot) === 0 || (t.f ^= ot, Fr(
        /** @type {Derived} */
        t.deps
      ));
}
function jr(e, t, n) {
  (e.f & H) !== 0 ? t.add(e) : (e.f & be) !== 0 && n.add(e), Fr(e.deps), q(e, j);
}
function Xt(e) {
  var t = A, n = N;
  he(null), Ie(null);
  try {
    return e();
  } finally {
    he(t), Ie(n);
  }
}
function gs(e) {
  let t = 0, n = ft(0), r;
  return () => {
    $n() && (w(n), ti(() => (t === 0 && (r = di(() => e(() => Gt(n)))), t += 1, () => {
      nt(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Gt(n));
      });
    })));
  };
}
var ms = Nt | Pt;
function ws(e, t, n, r) {
  new ys(e, t, n, r);
}
var le, zn, oe, Xe, J, ae, V, ne, Pe, Ze, Ge, yt, Vt, Kt, Re, yn, R, bs, Es, Ss, Dn, fn, un, Pn, Rn;
class ys {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    E(this, R);
    /** @type {Boundary | null} */
    ee(this, "parent");
    ee(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    ee(this, "transform_error");
    /** @type {TemplateNode} */
    E(this, le);
    /** @type {TemplateNode | null} */
    E(this, zn, null);
    /** @type {BoundaryProps} */
    E(this, oe);
    /** @type {((anchor: Node) => void)} */
    E(this, Xe);
    /** @type {Effect} */
    E(this, J);
    /** @type {Effect | null} */
    E(this, ae, null);
    /** @type {Effect | null} */
    E(this, V, null);
    /** @type {Effect | null} */
    E(this, ne, null);
    /** @type {DocumentFragment | null} */
    E(this, Pe, null);
    E(this, Ze, 0);
    E(this, Ge, 0);
    E(this, yt, !1);
    /** @type {Set<Effect>} */
    E(this, Vt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    E(this, Kt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    E(this, Re, null);
    E(this, yn, gs(() => (y(this, Re, ft(l(this, Ze))), () => {
      y(this, Re, null);
    })));
    var s;
    y(this, le, t), y(this, oe, n), y(this, Xe, (a) => {
      var o = (
        /** @type {Effect} */
        N
      );
      o.b = this, o.f |= In, r(a);
    }), this.parent = /** @type {Effect} */
    N.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((a) => a), y(this, J, Wn(() => {
      I(this, R, Dn).call(this);
    }, ms));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    jr(t, l(this, Vt), l(this, Kt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!l(this, oe).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    I(this, R, Pn).call(this, t, n), y(this, Ze, l(this, Ze) + t), !(!l(this, Re) || l(this, yt)) && (y(this, yt, !0), nt(() => {
      y(this, yt, !1), l(this, Re) && It(l(this, Re), l(this, Ze));
    }));
  }
  get_effect_pending() {
    return l(this, yn).call(this), w(
      /** @type {Source<number>} */
      l(this, Re)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!l(this, oe).onerror && !l(this, oe).failed)
      throw t;
    b != null && b.is_fork ? (l(this, ae) && b.skip_effect(l(this, ae)), l(this, V) && b.skip_effect(l(this, V)), l(this, ne) && b.skip_effect(l(this, ne)), b.oncommit(() => {
      I(this, R, Rn).call(this, t);
    })) : I(this, R, Rn).call(this, t);
  }
}
le = new WeakMap(), zn = new WeakMap(), oe = new WeakMap(), Xe = new WeakMap(), J = new WeakMap(), ae = new WeakMap(), V = new WeakMap(), ne = new WeakMap(), Pe = new WeakMap(), Ze = new WeakMap(), Ge = new WeakMap(), yt = new WeakMap(), Vt = new WeakMap(), Kt = new WeakMap(), Re = new WeakMap(), yn = new WeakMap(), R = new WeakSet(), bs = function() {
  try {
    y(this, ae, fe(() => l(this, Xe).call(this, l(this, le))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Es = function(t) {
  const n = l(this, oe).failed;
  n && y(this, ne, fe(() => {
    n(
      l(this, le),
      () => t,
      () => () => {
      }
    );
  }));
}, Ss = function() {
  const t = l(this, oe).pending;
  t && (this.is_pending = !0, y(this, V, fe(() => t(l(this, le)))), nt(() => {
    var n = y(this, Pe, document.createDocumentFragment()), r = it();
    n.append(r), y(this, ae, I(this, R, un).call(this, () => fe(() => l(this, Xe).call(this, r)))), l(this, Ge) === 0 && (l(this, le).before(n), y(this, Pe, null), st(
      /** @type {Effect} */
      l(this, V),
      () => {
        y(this, V, null);
      }
    ), I(this, R, fn).call(
      this,
      /** @type {Batch} */
      b
    ));
  }));
}, Dn = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), y(this, Ge, 0), y(this, Ze, 0), y(this, ae, fe(() => {
      l(this, Xe).call(this, l(this, le));
    })), l(this, Ge) > 0) {
      var t = y(this, Pe, document.createDocumentFragment());
      Zn(l(this, ae), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        l(this, oe).pending
      );
      y(this, V, fe(() => n(l(this, le))));
    } else
      I(this, R, fn).call(
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
fn = function(t) {
  this.is_pending = !1, t.transfer_effects(l(this, Vt), l(this, Kt));
}, /**
 * @template T
 * @param {() => T} fn
 */
un = function(t) {
  var n = N, r = A, i = de;
  Ie(l(this, J)), he(l(this, J)), Mt(l(this, J).ctx);
  try {
    return at.ensure(), t();
  } catch (s) {
    return Lr(s), null;
  } finally {
    Ie(n), he(r), Mt(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Pn = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && I(r = this.parent, R, Pn).call(r, t, n);
    return;
  }
  y(this, Ge, l(this, Ge) + t), l(this, Ge) === 0 && (I(this, R, fn).call(this, n), l(this, V) && st(l(this, V), () => {
    y(this, V, null);
  }), l(this, Pe) && (l(this, le).before(l(this, Pe)), y(this, Pe, null)));
}, /**
 * @param {unknown} error
 */
Rn = function(t) {
  l(this, ae) && (Z(l(this, ae)), y(this, ae, null)), l(this, V) && (Z(l(this, V)), y(this, V, null)), l(this, ne) && (Z(l(this, ne)), y(this, ne, null));
  var n = l(this, oe).onerror;
  let r = l(this, oe).failed;
  var i = !1, s = !1;
  const a = () => {
    if (i) {
      hs();
      return;
    }
    i = !0, s && is(), l(this, ne) !== null && st(l(this, ne), () => {
      y(this, ne, null);
    }), I(this, R, un).call(this, () => {
      I(this, R, Dn).call(this);
    });
  }, o = (u) => {
    try {
      s = !0, n == null || n(u, a), s = !1;
    } catch (c) {
      Ve(c, l(this, J) && l(this, J).parent);
    }
    r && y(this, ne, I(this, R, un).call(this, () => {
      try {
        return fe(() => {
          var c = (
            /** @type {Effect} */
            N
          );
          c.b = this, c.f |= In, r(
            l(this, le),
            () => u,
            () => a
          );
        });
      } catch (c) {
        return Ve(
          c,
          /** @type {Effect} */
          l(this, J).parent
        ), null;
      }
    }));
  };
  nt(() => {
    var u;
    try {
      u = this.transform_error(t);
    } catch (c) {
      Ve(c, l(this, J) && l(this, J).parent);
      return;
    }
    u !== null && typeof u == "object" && typeof /** @type {any} */
    u.then == "function" ? u.then(
      o,
      /** @param {unknown} e */
      (c) => Ve(c, l(this, J) && l(this, J).parent)
    ) : o(u);
  });
};
function ks(e, t, n, r) {
  const i = Ur;
  var s = e.filter((p) => !p.settled), a = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(a);
    return;
  }
  var o = (
    /** @type {Effect} */
    N
  ), u = xs(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((p) => p.promise)) : null;
  function d(p) {
    if ((o.f & ce) === 0) {
      u();
      try {
        r([...a, ...p]);
      } catch (h) {
        Ve(h, o);
      }
      _n();
    }
  }
  var v = Hr();
  if (n.length === 0) {
    c.then(() => d([])).finally(v);
    return;
  }
  function f() {
    Promise.all(n.map((p) => /* @__PURE__ */ Ts(p))).then(d).catch((p) => Ve(p, o)).finally(v);
  }
  c ? c.then(() => {
    u(), f(), _n();
  }) : f();
}
function xs() {
  var e = (
    /** @type {Effect} */
    N
  ), t = A, n = de, r = (
    /** @type {Batch} */
    b
  );
  return function(s = !0) {
    Ie(e), he(t), Mt(n), s && (e.f & ce) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function _n(e = !0) {
  Ie(null), he(null), Mt(null), e && (b == null || b.deactivate());
}
function Hr() {
  var e = (
    /** @type {Effect} */
    N
  ), t = e.b, n = (
    /** @type {Batch} */
    b
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Ur(e) {
  var t = U | H;
  return N !== null && (N.f |= Pt), {
    ctx: de,
    deps: null,
    effects: null,
    equals: Dr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      F
    ),
    wv: 0,
    parent: N,
    ac: null
  };
}
const Lt = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Ts(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    N
  );
  r === null && Zi();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ft(
    /** @type {V} */
    F
  ), a = !A, o = /* @__PURE__ */ new Set();
  return Gs(() => {
    var p, h;
    var u = (
      /** @type {Effect} */
      N
    ), c = Ir();
    i = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (m) => {
        m !== Wt && c.reject(m);
      }).finally(_n);
    } catch (m) {
      c.reject(m), _n();
    }
    var d = (
      /** @type {Batch} */
      b
    );
    if (a) {
      if ((u.f & Dt) !== 0)
        var v = Hr();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (h = d.async_deriveds.get(u)) == null || h.reject(Lt);
      else
        for (const m of o.values())
          m.reject(Lt);
      o.add(c), d.async_deriveds.set(u, c);
    }
    const f = (m, x = void 0) => {
      v == null || v(), o.delete(c), x !== Lt && (d.activate(), x ? (s.f |= Ke, It(s, x)) : ((s.f & Ke) !== 0 && (s.f ^= Ke), It(s, m)), d.deactivate());
    };
    c.promise.then(f, (m) => f(null, m || "unknown"));
  }), Jn(() => {
    for (const u of o)
      u.reject(Lt);
  }), new Promise((u) => {
    function c(d) {
      function v() {
        d === i ? u(s) : c(i);
      }
      d.then(v, v);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function As(e) {
  const t = /* @__PURE__ */ Ur(e);
  return t.equals = Pr, t;
}
function Ns(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Z(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Vn(e) {
  var t, n = N, r = e.parent;
  if (!ut && r !== null && e.v !== F && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (ce | K)) !== 0)
    return cs(), e.v;
  Ie(r);
  try {
    e.f &= ~ot, Ns(e), t = fi(e);
  } finally {
    Ie(n);
  }
  return t;
}
function zr(e) {
  var t = Vn(e);
  if (!e.equals(t) && (e.wv = oi(), (!(b != null && b.is_fork) || e.deps === null) && (b !== null ? (b.capture(e, t, !0), zt == null || zt.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    q(e, j);
    return;
  }
  ut || (z !== null ? ($n() || b != null && b.is_fork) && z.set(e, t) : Bn(e));
}
function Ms(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && Xt(() => {
        n.ac.abort(Wt), n.ac = null;
      }), n.fn !== null && (n.teardown = Bi), Bt(n, 0), Xn(n));
}
function Gr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && Ot(t);
}
let Tn = null, dt = null, b = null, zt = null, z = null, Cn = null, An = !1, _t = null, cn = null;
var dr = 0;
let Is = 1;
var bt, Be, Qe, Et, St, kt, Ce, xt, W, Yt, qe, ge, Ae, Tt, et, D, qn, Ft, Ln, Br, Vr, vt, Os, jt;
const bn = class bn {
  constructor() {
    E(this, D);
    ee(this, "id", Is++);
    /** True as soon as `#process` was called */
    E(this, bt, !1);
    ee(this, "linked", !0);
    /** @type {Batch | null} */
    E(this, Be, null);
    /** @type {Batch | null} */
    E(this, Qe, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    ee(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    ee(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    ee(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    E(this, Et, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    E(this, St, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    E(this, kt, 0);
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
    E(this, xt, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    E(this, W, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    E(this, Yt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    E(this, qe, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    E(this, ge, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    E(this, Ae, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    E(this, Tt, /* @__PURE__ */ new Set());
    ee(this, "is_fork", !1);
    E(this, et, !1);
    dt === null ? Tn = dt = this : (y(dt, Qe, this), y(this, Be, dt)), dt = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    l(this, Ae).has(t) || l(this, Ae).set(t, { d: [], m: [] }), l(this, Tt).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = l(this, Ae).get(t);
    if (r) {
      l(this, Ae).delete(t);
      for (var i of r.d)
        q(i, H), n(i);
      for (i of r.m)
        q(i, be), n(i);
    }
    l(this, Tt).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== F && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & Ke) === 0 && (this.current.set(t, [n, r]), z == null || z.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    b = this;
  }
  deactivate() {
    b = null, z = null;
  }
  flush() {
    try {
      An = !0, b = this, I(this, D, Ft).call(this);
    } finally {
      dr = 0, Cn = null, _t = null, cn = null, An = !1, b = null, z = null, rt.clear();
    }
  }
  discard() {
    var t;
    for (const n of l(this, St)) n(this);
    l(this, St).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Lt);
    I(this, D, jt).call(this), (t = l(this, xt)) == null || t.resolve();
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
    if (y(this, kt, l(this, kt) + 1), t) {
      let r = l(this, Ce).get(n) ?? 0;
      l(this, Ce).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (y(this, kt, l(this, kt) - 1), t) {
      let r = l(this, Ce).get(n) ?? 0;
      r === 1 ? l(this, Ce).delete(n) : l(this, Ce).set(n, r - 1);
    }
    l(this, et) || (y(this, et, !0), nt(() => {
      y(this, et, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      l(this, qe).add(r);
    for (const r of n)
      l(this, ge).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    l(this, Et).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    l(this, St).add(t);
  }
  settled() {
    return (l(this, xt) ?? y(this, xt, Ir())).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new bn();
      An || nt(() => {
        l(t, bt) || t.flush();
      });
    }
    return b;
  }
  apply() {
    {
      z = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (Cn = t, (i = t.b) != null && i.is_pending && (t.f & (At | kn | Or)) !== 0 && (t.f & Dt) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (_t !== null && n === N && (A === null || (A.f & U) === 0))
        return;
      if ((r & (Fe | Ee)) !== 0) {
        if ((r & j) === 0)
          return;
        n.f ^= j;
      }
    }
    l(this, W).push(n);
  }
};
bt = new WeakMap(), Be = new WeakMap(), Qe = new WeakMap(), Et = new WeakMap(), St = new WeakMap(), kt = new WeakMap(), Ce = new WeakMap(), xt = new WeakMap(), W = new WeakMap(), Yt = new WeakMap(), qe = new WeakMap(), ge = new WeakMap(), Ae = new WeakMap(), Tt = new WeakMap(), et = new WeakMap(), D = new WeakSet(), qn = function() {
  if (this.is_fork) return !0;
  for (const r of l(this, Ce).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (l(this, Ae).has(t)) {
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
  var u, c, d, v;
  y(this, bt, !0), dr++ > 1e3 && (I(this, D, jt).call(this), Ds());
  for (const f of l(this, qe))
    l(this, ge).delete(f), q(f, H), this.schedule(f);
  for (const f of l(this, ge))
    q(f, be), this.schedule(f);
  const t = l(this, W);
  y(this, W, []), this.apply();
  var n = _t = [], r = [], i = cn = [];
  for (const f of t)
    try {
      I(this, D, Ln).call(this, f, n, r);
    } catch (p) {
      throw $r(f), I(this, D, qn).call(this) || this.discard(), p;
    }
  if (b = null, i.length > 0) {
    var s = bn.ensure();
    for (const f of i)
      s.schedule(f);
  }
  if (_t = null, cn = null, I(this, D, qn).call(this)) {
    I(this, D, vt).call(this, r), I(this, D, vt).call(this, n);
    for (const [f, p] of l(this, Ae))
      Yr(f, p);
    i.length > 0 && /** @type {unknown} */
    I(u = b, D, Ft).call(u);
    return;
  }
  const a = I(this, D, Br).call(this);
  if (a) {
    I(this, D, vt).call(this, r), I(this, D, vt).call(this, n), I(c = a, D, Vr).call(c, this);
    return;
  }
  l(this, qe).clear(), l(this, ge).clear();
  for (const f of l(this, Et)) f(this);
  l(this, Et).clear(), zt = this, hr(r), hr(n), zt = null, (d = l(this, xt)) == null || d.resolve();
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    b
  );
  if (l(this, kt) === 0 && (l(this, W).length === 0 || o !== null) && I(this, D, jt).call(this), l(this, W).length > 0)
    if (o !== null) {
      const f = o;
      l(f, W).push(...l(this, W).filter((p) => !l(f, W).includes(p)));
    } else
      o = this;
  o !== null && I(v = o, D, Ft).call(v);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Ln = function(t, n, r) {
  t.f ^= j;
  for (var i = t.first; i !== null; ) {
    var s = i.f, a = (s & (Ee | Fe)) !== 0, o = a && (s & j) !== 0, u = o || (s & K) !== 0 || l(this, Ae).has(i);
    if (!u && i.fn !== null) {
      a ? i.f ^= j : (s & At) !== 0 ? n.push(i) : Qt(i) && ((s & we) !== 0 && l(this, ge).add(i), Ot(i));
      var c = i.first;
      if (c !== null) {
        i = c;
        continue;
      }
    }
    for (; i !== null; ) {
      var d = i.next;
      if (d !== null) {
        i = d;
        break;
      }
      i = i.parent;
    }
  }
}, Br = function() {
  for (var t = l(this, Be); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = l(t, Be);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Vr = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const a = this.async_deriveds.get(i);
    a && s.promise.then(a.resolve).catch(a.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(l(t, qe), l(t, ge));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & U) !== 0 && (i.f & (H | be)) === 0))
      for (const u of s) {
        var a = u.f;
        if ((a & U) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var o = (
            /** @type {Effect} */
            u
          );
          a & (mt | we) && !this.async_deriveds.has(o) && (l(this, ge).delete(o), q(o, H), this.schedule(o));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), I(r = t, D, jt).call(r), b = this, I(this, D, Ft).call(this);
}, /**
 * @param {Effect[]} effects
 */
vt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    jr(t[n], l(this, qe), l(this, ge));
}, Os = function() {
  var v;
  for (let f = Tn; f !== null; f = l(f, Qe)) {
    var t = f.id < this.id, n = [];
    for (const [p, [h, m]] of this.current) {
      if (f.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          f.current.get(p)[0]
        );
        if (t && h !== r)
          f.current.set(p, [h, m]);
        else
          continue;
      }
      n.push(p);
    }
    if (t)
      for (const [p, h] of this.async_deriveds) {
        const m = f.async_deriveds.get(p);
        m && h.promise.then(m.resolve).catch(m.reject);
      }
    var i = [...f.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      f.current.get(p)[1]
    );
    if (!(!l(f, bt) || i.length === 0)) {
      var s = i.filter((p) => !this.current.has(p));
      if (s.length === 0)
        t && f.discard();
      else if (n.length > 0) {
        if (t)
          for (const p of l(this, Tt))
            f.unskip_effect(p, (h) => {
              var m;
              (h.f & (we | mt)) !== 0 ? f.schedule(h) : I(m = f, D, vt).call(m, [h]);
            });
        f.activate();
        var a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var u of n)
          Kr(u, s, a, o);
        o = /* @__PURE__ */ new Map();
        var c = [...f.current].filter(([p, h]) => {
          const m = this.current.get(p);
          return m ? m[0] !== h[0] || m[1] !== h[1] : !0;
        }).map(([p]) => p);
        if (c.length > 0)
          for (const p of l(this, Yt))
            (p.f & (ce | K | vn)) === 0 && Kn(p, c, o) && ((p.f & (mt | we)) !== 0 ? (q(p, H), f.schedule(p)) : l(f, qe).add(p));
        if (l(f, W).length > 0 && !l(f, et)) {
          f.apply();
          for (var d of l(f, W))
            I(v = f, D, Ln).call(v, d, [], []);
          y(f, W, []);
        }
        f.deactivate();
      }
    }
  }
}, jt = function() {
  if (this.linked) {
    var t = l(this, Be), n = l(this, Qe);
    t === null ? Tn = n : y(t, Qe, n), n === null ? dt = t : y(n, Be, t), this.linked = !1;
  }
};
let at = bn;
function Ds() {
  try {
    es();
  } catch (e) {
    Ve(e, Cn);
  }
}
let _e = null;
function hr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (ce | K)) === 0 && Qt(r) && (_e = /* @__PURE__ */ new Set(), Ot(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ri(r), (_e == null ? void 0 : _e.size) > 0)) {
        rt.clear();
        for (const i of _e) {
          if ((i.f & (ce | K)) !== 0) continue;
          const s = [i];
          let a = i.parent;
          for (; a !== null; )
            _e.has(a) && (_e.delete(a), s.push(a)), a = a.parent;
          for (let o = s.length - 1; o >= 0; o--) {
            const u = s[o];
            (u.f & (ce | K)) === 0 && Ot(u);
          }
        }
        _e.clear();
      }
    }
    _e = null;
  }
}
function Kr(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & U) !== 0 ? Kr(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (mt | we)) !== 0 && (s & H) === 0 && Kn(i, t, r) && (q(i, H), Yn(
        /** @type {Effect} */
        i
      ));
    }
}
function Kn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (hn.call(t, i))
        return !0;
      if ((i.f & U) !== 0 && Kn(
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
function Yn(e) {
  b.schedule(e);
}
function Yr(e, t) {
  if (!((e.f & Ee) !== 0 && (e.f & j) !== 0)) {
    (e.f & H) !== 0 ? t.d.push(e) : (e.f & be) !== 0 && t.m.push(e), q(e, j);
    for (var n = e.first; n !== null; )
      Yr(n, t), n = n.next;
  }
}
function $r(e) {
  q(e, j);
  for (var t = e.first; t !== null; )
    $r(t), t = t.next;
}
let gn = /* @__PURE__ */ new Set();
const rt = /* @__PURE__ */ new Map();
let Jr = !1;
function ft(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Dr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
  const n = ft(e);
  return Ks(n), n;
}
// @__NO_SIDE_EFFECTS__
function Ps(e, t = !1, n = !0) {
  const r = ft(e);
  return t || (r.equals = Pr), r;
}
function O(e, t, n = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ye || (A.f & vn) !== 0) && qr() && (A.f & (U | we | mt | vn)) !== 0 && (Me === null || !Me.has(e)) && rs();
  let r = n ? gt(t) : t;
  return It(e, r, cn);
}
function It(e, t, n = null) {
  if (!e.equals(t)) {
    rt.set(e, ut ? t : e.v);
    var r = at.ensure();
    if (r.capture(e, t), (e.f & U) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & H) !== 0 && Vn(i), z === null && Bn(i);
    }
    e.wv = oi(), Wr(e, H, n), N !== null && (N.f & j) !== 0 && (N.f & (Ee | Fe)) === 0 && (se === null ? Ys([e]) : se.push(e)), !r.is_fork && gn.size > 0 && !Jr && Rs();
  }
  return t;
}
function Rs() {
  Jr = !1;
  for (const e of gn) {
    (e.f & j) !== 0 && q(e, be);
    let t;
    try {
      t = Qt(e);
    } catch {
      t = !0;
    }
    t && Ot(e);
  }
  gn.clear();
}
function Gt(e) {
  O(e, e.v + 1);
}
function Wr(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var a = r[s], o = a.f, u = (o & H) === 0;
      if (u && q(a, t), (o & vn) !== 0)
        gn.add(
          /** @type {Effect} */
          a
        );
      else if ((o & U) !== 0) {
        var c = (
          /** @type {Derived} */
          a
        );
        z == null || z.delete(c), (o & ot) === 0 && (o & ue && (N === null || (N.f & pn) === 0) && (a.f |= ot), Wr(c, be, n));
      } else if (u) {
        var d = (
          /** @type {Effect} */
          a
        );
        (o & we) !== 0 && _e !== null && _e.add(d), n !== null ? n.push(d) : Yn(d);
      }
    }
}
function gt(e) {
  if (typeof e != "object" || e === null || wt in e)
    return e;
  const t = Mr(e);
  if (t !== zi && t !== Gi)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Gn(e), i = /* @__PURE__ */ B(0), s = lt, a = (o) => {
    if (lt === s)
      return o();
    var u = A, c = lt;
    he(null), gr(s);
    var d = o();
    return he(u), gr(c), d;
  };
  return r && n.set("length", /* @__PURE__ */ B(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(o, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && ts();
        var d = n.get(u);
        return d === void 0 ? a(() => {
          var v = /* @__PURE__ */ B(c.value);
          return n.set(u, v), v;
        }) : O(d, c.value, !0), !0;
      },
      deleteProperty(o, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in o) {
            const d = a(() => /* @__PURE__ */ B(F));
            n.set(u, d), Gt(i);
          }
        } else
          O(c, F), Gt(i);
        return !0;
      },
      get(o, u, c) {
        var p;
        if (u === wt)
          return e;
        var d = n.get(u), v = u in o;
        if (d === void 0 && (!v || (p = Ut(o, u)) != null && p.writable) && (d = a(() => {
          var h = gt(v ? o[u] : F), m = /* @__PURE__ */ B(h);
          return m;
        }), n.set(u, d)), d !== void 0) {
          var f = w(d);
          return f === F ? void 0 : f;
        }
        return Reflect.get(o, u, c);
      },
      getOwnPropertyDescriptor(o, u) {
        var c = Reflect.getOwnPropertyDescriptor(o, u);
        if (c && "value" in c) {
          var d = n.get(u);
          d && (c.value = w(d));
        } else if (c === void 0) {
          var v = n.get(u), f = v == null ? void 0 : v.v;
          if (v !== void 0 && f !== F)
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0
            };
        }
        return c;
      },
      has(o, u) {
        var f;
        if (u === wt)
          return !0;
        var c = n.get(u), d = c !== void 0 && c.v !== F || Reflect.has(o, u);
        if (c !== void 0 || N !== null && (!d || (f = Ut(o, u)) != null && f.writable)) {
          c === void 0 && (c = a(() => {
            var p = d ? gt(o[u]) : F, h = /* @__PURE__ */ B(p);
            return h;
          }), n.set(u, c));
          var v = w(c);
          if (v === F)
            return !1;
        }
        return d;
      },
      set(o, u, c, d) {
        var P;
        var v = n.get(u), f = u in o;
        if (r && u === "length")
          for (var p = c; p < /** @type {Source<number>} */
          v.v; p += 1) {
            var h = n.get(p + "");
            h !== void 0 ? O(h, F) : p in o && (h = a(() => /* @__PURE__ */ B(F)), n.set(p + "", h));
          }
        if (v === void 0)
          (!f || (P = Ut(o, u)) != null && P.writable) && (v = a(() => /* @__PURE__ */ B(void 0)), O(v, gt(c)), n.set(u, v));
        else {
          f = v.v !== F;
          var m = a(() => gt(c));
          O(v, m);
        }
        var x = Reflect.getOwnPropertyDescriptor(o, u);
        if (x != null && x.set && x.set.call(d, c), !f) {
          if (r && typeof u == "string") {
            var T = (
              /** @type {Source<number>} */
              n.get("length")
            ), M = Number(u);
            Number.isInteger(M) && M >= T.v && O(T, M + 1);
          }
          Gt(i);
        }
        return !0;
      },
      ownKeys(o) {
        w(i);
        var u = Reflect.ownKeys(o).filter((v) => {
          var f = n.get(v);
          return f === void 0 || f.v !== F;
        });
        for (var [c, d] of n)
          d.v !== F && !(c in o) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        ns();
      }
    }
  );
}
function vr(e) {
  try {
    if (e !== null && typeof e == "object" && wt in e)
      return e[wt];
  } catch {
  }
  return e;
}
function Cs(e, t) {
  return Object.is(vr(e), vr(t));
}
var Fn, Xr, Zr, Qr;
function qs() {
  if (Fn === void 0) {
    Fn = window, Xr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Zr = Ut(t, "firstChild").get, Qr = Ut(t, "nextSibling").get, cr(e) && (e[Ji] = void 0, e[an] = null, e[Wi] = void 0, e.__e = void 0), cr(n) && (n[qt] = void 0);
  }
}
function it(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function mn(e) {
  return (
    /** @type {TemplateNode | null} */
    Zr.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
  return (
    /** @type {TemplateNode | null} */
    Qr.call(e)
  );
}
function $(e, t) {
  return /* @__PURE__ */ mn(e);
}
function pr(e, t = !1) {
  {
    var n = /* @__PURE__ */ mn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Zt(n) : n;
  }
}
function C(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Zt(r);
  return r;
}
function Ls(e) {
  e.textContent = "";
}
function ei() {
  return !1;
}
function Fs(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function js(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function je(e, t) {
  var n = N;
  n !== null && (n.f & K) !== 0 && (e |= K);
  var r = {
    ctx: de,
    deps: null,
    nodes: null,
    f: e | H | ue,
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
  if ((e & At) !== 0)
    _t !== null ? _t.push(r) : at.ensure().schedule(r);
  else if (t !== null) {
    try {
      Ot(r);
    } catch (a) {
      throw Z(r), a;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Pt) === 0 && (i = i.first, (e & we) !== 0 && (e & Nt) !== 0 && i !== null && (i.f |= Nt));
  }
  if (i !== null && (i.parent = n, n !== null && js(i, n), A !== null && (A.f & U) !== 0 && (e & Fe) === 0)) {
    var s = (
      /** @type {Derived} */
      A
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function $n() {
  return A !== null && !ye;
}
function Jn(e) {
  const t = je(kn, null);
  return q(t, j), t.teardown = e, t;
}
function Hs(e) {
  return je(At | Yi, e);
}
function Us(e) {
  at.ensure();
  const t = je(Fe | Pt, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? st(t, () => {
      Z(t), r(void 0);
    }) : (Z(t), r(void 0));
  });
}
function zs(e) {
  return je(At, e);
}
function Gs(e) {
  return je(mt | Pt, e);
}
function ti(e, t = 0) {
  return je(kn | t, e);
}
function $e(e, t = [], n = [], r = []) {
  ks(r, t, n, (i) => {
    je(kn, () => {
      e(...i.map(w));
    });
  });
}
function Wn(e, t = 0) {
  var n = je(we | t, e);
  return n;
}
function fe(e) {
  return je(Ee | Pt, e);
}
function ni(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ut, r = A;
    _r(!0), he(null);
    try {
      t.call(null);
    } finally {
      _r(n), he(r);
    }
  }
}
function Xn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Xt(() => {
      i.abort(Wt);
    });
    var r = n.next;
    (n.f & Fe) !== 0 ? n.parent = null : Z(n, t), n = r;
  }
}
function Bs(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ee) === 0 && Z(t), t = n;
  }
}
function Z(e, t = !0) {
  var n = !1;
  (t || (e.f & Ki) !== 0) && e.nodes !== null && e.nodes.end !== null && (Vs(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= On, Xn(e, t && !n), Bt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  ni(e), e.f ^= On, e.f |= ce;
  var i = e.parent;
  i !== null && i.first !== null && ri(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Vs(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Zt(e);
    e.remove(), e = n;
  }
}
function ri(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function st(e, t, n = !0) {
  var r = [];
  ii(e, r, !0);
  var i = () => {
    n && Z(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var a = () => --s || i();
    for (var o of r)
      o.out(a);
  } else
    i();
}
function ii(e, t, n) {
  if ((e.f & K) === 0) {
    e.f ^= K;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || n) && t.push(o);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & Fe) === 0) {
        var a = (i.f & Nt) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & Ee) !== 0 && (e.f & we) !== 0;
        ii(i, t, a ? n : !1);
      }
      i = s;
    }
  }
}
function wn(e) {
  si(e, !0);
}
function si(e, t) {
  if ((e.f & K) !== 0) {
    e.f ^= K, (e.f & j) === 0 && (q(e, H), at.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Nt) !== 0 || (n.f & Ee) !== 0;
      si(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const a of s)
        (a.is_global || t) && a.in();
  }
}
function Zn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Zt(n);
      t.append(n), n = i;
    }
}
let dn = !1, ut = !1;
function _r(e) {
  ut = e;
}
let A = null, ye = !1;
function he(e) {
  A = e;
}
let N = null;
function Ie(e) {
  N = e;
}
let Me = null;
function Ks(e) {
  A !== null && (Me ?? (Me = /* @__PURE__ */ new Set())).add(e);
}
let X = null, te = 0, se = null;
function Ys(e) {
  se = e;
}
let li = 1, Je = 0, lt = Je;
function gr(e) {
  lt = e;
}
function oi() {
  return ++li;
}
function Qt(e) {
  var t = e.f;
  if ((t & H) !== 0)
    return !0;
  if (t & U && (e.f &= ~ot), (t & be) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Qt(
        /** @type {Derived} */
        s
      ) && zr(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & ue) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    z === null && q(e, j);
  }
  return !1;
}
function ai(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(Me !== null && Me.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & U) !== 0 ? ai(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? q(s, H) : (s.f & j) !== 0 && q(s, be), Yn(
        /** @type {Effect} */
        s
      ));
    }
}
function fi(e) {
  var m;
  var t = X, n = te, r = se, i = A, s = Me, a = de, o = ye, u = lt, c = e.f;
  X = /** @type {null | Value[]} */
  null, te = 0, se = null, A = (c & (Ee | Fe)) === 0 ? e : null, Me = null, Mt(e.ctx), ye = !1, lt = ++Je, e.ac !== null && (Xt(() => {
    e.ac.abort(Wt);
  }), e.ac = null);
  try {
    e.f |= pn;
    var d = (
      /** @type {Function} */
      e.fn
    ), v = d();
    e.f |= Dt;
    var f = e.deps, p = b == null ? void 0 : b.is_fork;
    if (X !== null) {
      var h;
      if (p || Bt(e, te), f !== null && te > 0)
        for (f.length = te + X.length, h = 0; h < X.length; h++)
          f[te + h] = X[h];
      else
        e.deps = f = X;
      if ($n() && (e.f & ue) !== 0)
        for (h = te; h < f.length; h++)
          ((m = f[h]).reactions ?? (m.reactions = [])).push(e);
    } else !p && f !== null && te < f.length && (Bt(e, te), f.length = te);
    if (qr() && se !== null && !ye && f !== null && (e.f & (U | be | H)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      se.length; h++)
        ai(
          se[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Je++, i.deps !== null)
        for (let x = 0; x < n; x += 1)
          i.deps[x].rv = Je;
      if (t !== null)
        for (const x of t)
          x.rv = Je;
      se !== null && (r === null ? r = se : r.push(.../** @type {Source[]} */
      se));
    }
    return (e.f & Ke) !== 0 && (e.f ^= Ke), v;
  } catch (x) {
    return Lr(x);
  } finally {
    e.f ^= pn, X = t, te = n, se = r, A = i, Me = s, Mt(a), ye = o, lt = u;
  }
}
function $s(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = ji.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & U) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (X === null || !hn.call(X, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & ue) !== 0 && (s.f ^= ue, s.f &= ~ot), s.v !== F && Bn(s), s.ac !== null && Xt(() => {
      s.ac.abort(Wt), s.ac = null;
    }), Ms(s), Bt(s, 0);
  }
}
function Bt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      $s(e, n[r]);
}
function Ot(e) {
  var t = e.f;
  if ((t & ce) === 0) {
    q(e, j);
    var n = N, r = dn;
    N = e, dn = (t & (Ee | Fe)) === 0;
    try {
      (t & (we | Or)) !== 0 ? Bs(e) : Xn(e), ni(e);
      var i = fi(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = li;
      var s;
    } finally {
      dn = r, N = n;
    }
  }
}
function w(e) {
  var t = e.f, n = (t & U) !== 0;
  if (A !== null && !ye) {
    var r = N !== null && (N.f & ce) !== 0;
    if (!r && (Me === null || !Me.has(e))) {
      var i = A.deps;
      if ((A.f & pn) !== 0)
        e.rv < Je && (e.rv = Je, X === null && i !== null && i[te] === e ? te++ : X === null ? X = [e] : X.push(e));
      else {
        A.deps ?? (A.deps = []), hn.call(A.deps, e) || A.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [A] : hn.call(s, A) || s.push(A);
      }
    }
  }
  if (ut && rt.has(e))
    return rt.get(e);
  if (n) {
    var a = (
      /** @type {Derived} */
      e
    );
    if (ut) {
      var o = a.v;
      return ((a.f & j) === 0 && a.reactions !== null || ci(a)) && (o = Vn(a)), rt.set(a, o), o;
    }
    var u = (a.f & ue) === 0 && !ye && A !== null && (dn || (A.f & ue) !== 0), c = (a.f & Dt) === 0;
    Qt(a) && (u && (a.f |= ue), zr(a)), u && !c && (Gr(a), ui(a));
  }
  if (z != null && z.has(e))
    return z.get(e);
  if ((e.f & Ke) !== 0)
    throw e.v;
  return e.v;
}
function ui(e) {
  if (e.f |= ue, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & U) !== 0 && (t.f & ue) === 0 && (Gr(
        /** @type {Derived} */
        t
      ), ui(
        /** @type {Derived} */
        t
      ));
}
function ci(e) {
  if (e.v === F) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (rt.has(t) || (t.f & U) !== 0 && ci(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function di(e) {
  var t = ye;
  try {
    return ye = !0, e();
  } finally {
    ye = t;
  }
}
const Js = ["touchstart", "touchmove"];
function Ws(e) {
  return Js.includes(e);
}
const We = Symbol("events"), hi = /* @__PURE__ */ new Set(), jn = /* @__PURE__ */ new Set();
function Xs(e, t, n, r = {}) {
  function i(s) {
    if (r.capture || Hn.call(t, s), !s.cancelBubble)
      return Xt(() => n == null ? void 0 : n.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? nt(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function mr(e, t, n, r, i) {
  var s = { capture: r, passive: i }, a = Xs(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Jn(() => {
    t.removeEventListener(e, a, s);
  });
}
function ie(e, t, n) {
  (t[We] ?? (t[We] = {}))[e] = n;
}
function Zs(e) {
  for (var t = 0; t < e.length; t++)
    hi.add(e[t]);
  for (var n of jn)
    n(e);
}
let wr = null;
function Hn(e) {
  var m, x;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((m = e.composedPath) == null ? void 0 : m.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  wr = e;
  var a = 0, o = wr === e && e[We];
  if (o) {
    var u = i.indexOf(o);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[We] = t;
      return;
    }
    var c = i.indexOf(t);
    if (c === -1)
      return;
    u <= c && (a = u);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    Hi(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var d = A, v = N;
    he(null), Ie(null);
    try {
      for (var f, p = []; s !== null && s !== t; ) {
        try {
          var h = (x = s[We]) == null ? void 0 : x[r];
          h != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && h.call(s, e);
        } catch (T) {
          f ? p.push(T) : f = T;
        }
        if (e.cancelBubble) break;
        a++, s = a < i.length ? (
          /** @type {Element} */
          i[a]
        ) : null;
      }
      if (f) {
        for (let T of p)
          queueMicrotask(() => {
            throw T;
          });
        throw f;
      }
    } finally {
      e[We] = t, delete e.currentTarget, he(d), Ie(v);
    }
  }
}
var Ar;
const Nn = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Ar = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Ar.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Qs(e) {
  return (
    /** @type {string} */
    (Nn == null ? void 0 : Nn.createHTML(e)) ?? e
  );
}
function el(e) {
  var t = Fs("template");
  return t.innerHTML = Qs(e.replaceAll("<!>", "<!---->")), t.content;
}
function yr(e, t) {
  var n = (
    /** @type {Effect} */
    N
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Oe(e, t) {
  var n = (t & as) !== 0, r = (t & fs) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = el(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ mn(i)));
    var a = (
      /** @type {TemplateNode} */
      r || Xr ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ mn(a)
      ), u = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      yr(o, u);
    } else
      yr(a, a);
    return a;
  };
}
function Te(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function sn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[qt] ?? (e[qt] = e.nodeValue)) && (e[qt] = n, e.nodeValue = `${n}`);
}
function tl(e, t) {
  return nl(e, t);
}
const ln = /* @__PURE__ */ new Map();
function nl(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: a = !0, transformError: o }) {
  qs();
  var u = void 0, c = Us(() => {
    var d = n ?? t.appendChild(it());
    ws(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (p) => {
        Rr({});
        var h = (
          /** @type {ComponentContext} */
          de
        );
        s && (h.c = s), i && (r.$$events = i), u = e(p, r) || {}, Cr();
      },
      o
    );
    var v = /* @__PURE__ */ new Set(), f = (p) => {
      for (var h = 0; h < p.length; h++) {
        var m = p[h];
        if (!v.has(m)) {
          v.add(m);
          var x = Ws(m);
          for (const P of [t, document]) {
            var T = ln.get(P);
            T === void 0 && (T = /* @__PURE__ */ new Map(), ln.set(P, T));
            var M = T.get(m);
            M === void 0 ? (P.addEventListener(m, Hn, { passive: x }), T.set(m, 1)) : T.set(m, M + 1);
          }
        }
      }
    };
    return f(Sn(hi)), jn.add(f), () => {
      var x;
      for (var p of v)
        for (const T of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            ln.get(T)
          ), m = (
            /** @type {number} */
            h.get(p)
          );
          --m == 0 ? (T.removeEventListener(p, Hn), h.delete(p), h.size === 0 && ln.delete(T)) : h.set(p, m);
        }
      jn.delete(f), d !== n && ((x = d.parentNode) == null || x.removeChild(d));
    };
  });
  return rl.set(u, c), u;
}
let rl = /* @__PURE__ */ new WeakMap();
var me, Ne, re, tt, $t, Jt, En;
class il {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    ee(this, "anchor");
    /** @type {Map<Batch, Key>} */
    E(this, me, /* @__PURE__ */ new Map());
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
    E(this, Ne, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    E(this, re, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    E(this, tt, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    E(this, $t, !0);
    /**
     * @param {Batch} batch
     */
    E(this, Jt, (t) => {
      if (l(this, me).has(t)) {
        var n = (
          /** @type {Key} */
          l(this, me).get(t)
        ), r = l(this, Ne).get(n);
        if (r)
          wn(r), l(this, tt).delete(n);
        else {
          var i = l(this, re).get(n);
          i && (wn(i.effect), l(this, Ne).set(n, i.effect), l(this, re).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, a] of l(this, me)) {
          if (l(this, me).delete(s), s === t)
            break;
          const o = l(this, re).get(a);
          o && (Z(o.effect), l(this, re).delete(a));
        }
        for (const [s, a] of l(this, Ne)) {
          if (s === n || l(this, tt).has(s)) continue;
          const o = () => {
            if (Array.from(l(this, me).values()).includes(s)) {
              var c = document.createDocumentFragment();
              Zn(a, c), c.append(it()), l(this, re).set(s, { effect: a, fragment: c });
            } else
              Z(a);
            l(this, tt).delete(s), l(this, Ne).delete(s);
          };
          l(this, $t) || !r ? (l(this, tt).add(s), st(a, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    E(this, En, (t) => {
      l(this, me).delete(t);
      const n = Array.from(l(this, me).values());
      for (const [r, i] of l(this, re))
        n.includes(r) || (Z(i.effect), l(this, re).delete(r));
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
    ), i = ei();
    if (n && !l(this, Ne).has(t) && !l(this, re).has(t))
      if (i) {
        var s = document.createDocumentFragment(), a = it();
        s.append(a), l(this, re).set(t, {
          effect: fe(() => n(a)),
          fragment: s
        });
      } else
        l(this, Ne).set(
          t,
          fe(() => n(this.anchor))
        );
    if (l(this, me).set(r, t), i) {
      for (const [o, u] of l(this, Ne))
        o === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [o, u] of l(this, re))
        o === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(l(this, Jt)), r.ondiscard(l(this, En));
    } else
      l(this, Jt).call(this, r);
  }
}
me = new WeakMap(), Ne = new WeakMap(), re = new WeakMap(), tt = new WeakMap(), $t = new WeakMap(), Jt = new WeakMap(), En = new WeakMap();
function ht(e, t, n = !1) {
  var r = new il(e), i = n ? Nt : 0;
  function s(a, o) {
    r.ensure(a, o);
  }
  Wn(() => {
    var a = !1;
    t((o, u = 0) => {
      a = !0, s(u, o);
    }), a || s(-1, null);
  }, i);
}
function sl(e, t) {
  return t;
}
function ll(e, t, n) {
  for (var r = [], i = t.length, s, a = t.length, o = 0; o < i; o++) {
    let v = t[o];
    st(
      v,
      () => {
        if (s) {
          if (s.pending.delete(v), s.done.add(v), s.pending.size === 0) {
            var f = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Un(e, Sn(s.done)), f.delete(s), f.size === 0 && (e.outrogroups = null);
          }
        } else
          a -= 1;
      },
      !1
    );
  }
  if (a === 0) {
    var u = r.length === 0 && n !== null;
    if (u) {
      var c = (
        /** @type {Element} */
        n
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      Ls(d), d.append(c), e.items.clear();
    }
    Un(e, t, !u);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Un(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const a of e.pending.values())
      for (const o of a)
        r.add(
          /** @type {EachItem} */
          e.items.get(o).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= Le;
      const a = document.createDocumentFragment();
      Zn(s, a);
    } else
      Z(t[i], n);
  }
}
var br;
function ol(e, t, n, r, i, s = null) {
  var a = e, o = /* @__PURE__ */ new Map();
  {
    var u = (
      /** @type {Element} */
      e
    );
    a = u.appendChild(it());
  }
  var c = null, d = /* @__PURE__ */ As(() => {
    var M = n();
    return (
      /** @type {V[]} */
      Gn(M) ? M : M == null ? [] : Sn(M)
    );
  }), v, f = /* @__PURE__ */ new Map(), p = !0;
  function h(M) {
    (T.effect.f & ce) === 0 && (T.pending.delete(M), T.fallback = c, al(T, v, a, t, r), c !== null && (v.length === 0 ? (c.f & Le) === 0 ? wn(c) : (c.f ^= Le, Ht(c, null, a)) : st(c, () => {
      c = null;
    })));
  }
  function m(M) {
    T.pending.delete(M);
  }
  var x = Wn(() => {
    v = /** @type {V[]} */
    w(d);
    for (var M = v.length, P = /* @__PURE__ */ new Set(), Q = (
      /** @type {Batch} */
      b
    ), Se = ei(), ve = 0; ve < M; ve += 1) {
      var Ye = v[ve], De = r(Ye, ve), L = p ? null : o.get(De);
      L ? (L.v && It(L.v, Ye), L.i && It(L.i, ve), Se && Q.unskip_effect(L.e)) : (L = fl(
        o,
        p ? a : br ?? (br = it()),
        Ye,
        De,
        ve,
        i,
        t,
        n
      ), p || (L.e.f |= Le), o.set(De, L)), P.add(De);
    }
    if (M === 0 && s && !c && (p ? c = fe(() => s(a)) : (c = fe(() => s(br ?? (br = it()))), c.f |= Le)), M > P.size && Qi(), !p)
      if (f.set(Q, P), Se) {
        for (const [en, tn] of o)
          P.has(en) || Q.skip_effect(tn.e);
        Q.oncommit(h), Q.ondiscard(m);
      } else
        h(Q);
    w(d);
  }), T = { effect: x, items: o, pending: f, outrogroups: null, fallback: c };
  p = !1;
}
function Ct(e) {
  for (; e !== null && (e.f & Ee) === 0; )
    e = e.next;
  return e;
}
function al(e, t, n, r, i) {
  var De;
  var s = t.length, a = e.items, o = Ct(e.effect.first), u, c = null, d = [], v = [], f, p, h, m;
  for (m = 0; m < s; m += 1) {
    if (f = t[m], p = i(f, m), h = /** @type {EachItem} */
    a.get(p).e, e.outrogroups !== null)
      for (const L of e.outrogroups)
        L.pending.delete(h), L.done.delete(h);
    if ((h.f & K) !== 0 && wn(h), (h.f & Le) !== 0)
      if (h.f ^= Le, h === o)
        Ht(h, null, n);
      else {
        var x = c ? c.next : o;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), ze(e, c, h), ze(e, h, x), Ht(h, x, n), c = h, d = [], v = [], o = Ct(c.next);
        continue;
      }
    if (h !== o) {
      if (u !== void 0 && u.has(h)) {
        if (d.length < v.length) {
          var T = v[0], M;
          c = T.prev;
          var P = d[0], Q = d[d.length - 1];
          for (M = 0; M < d.length; M += 1)
            Ht(d[M], T, n);
          for (M = 0; M < v.length; M += 1)
            u.delete(v[M]);
          ze(e, P.prev, Q.next), ze(e, c, P), ze(e, Q, T), o = T, c = Q, m -= 1, d = [], v = [];
        } else
          u.delete(h), Ht(h, o, n), ze(e, h.prev, h.next), ze(e, h, c === null ? e.effect.first : c.next), ze(e, c, h), c = h;
        continue;
      }
      for (d = [], v = []; o !== null && o !== h; )
        (u ?? (u = /* @__PURE__ */ new Set())).add(o), v.push(o), o = Ct(o.next);
      if (o === null)
        continue;
    }
    (h.f & Le) === 0 && d.push(h), c = h, o = Ct(h.next);
  }
  if (e.outrogroups !== null) {
    for (const L of e.outrogroups)
      L.pending.size === 0 && (Un(e, Sn(L.done)), (De = e.outrogroups) == null || De.delete(L));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (o !== null || u !== void 0) {
    var Se = [];
    if (u !== void 0)
      for (h of u)
        (h.f & K) === 0 && Se.push(h);
    for (; o !== null; )
      (o.f & K) === 0 && o !== e.fallback && Se.push(o), o = Ct(o.next);
    var ve = Se.length;
    if (ve > 0) {
      var Ye = s === 0 ? n : null;
      ll(e, Se, Ye);
    }
  }
}
function fl(e, t, n, r, i, s, a, o) {
  var u = (a & ss) !== 0 ? (a & os) === 0 ? /* @__PURE__ */ Ps(n, !1, !1) : ft(n) : null, c = (a & ls) !== 0 ? ft(i) : null;
  return {
    v: u,
    i: c,
    e: fe(() => (s(t, u ?? n, c ?? i, o), () => {
      e.delete(r);
    }))
  };
}
function Ht(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & Le) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Zt(r)
      );
      if (s.before(r), r === i)
        return;
      r = a;
    }
}
function ze(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function vi(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Gn(t))
      return ds();
    for (var r of e.options)
      r.selected = t.includes(Er(r));
    return;
  }
  for (r of e.options) {
    var i = Er(r);
    if (Cs(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function ul(e) {
  var t = new MutationObserver(() => {
    vi(e, e.__value);
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
  }), Jn(() => {
    t.disconnect();
  });
}
function Er(e) {
  return "__value" in e ? e.__value : e.value;
}
const cl = Symbol("is custom element"), dl = Symbol("is html"), hl = Xi ? "progress" : "PROGRESS";
function Sr(e, t) {
  var n = Qn(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== hl) || (e.value = t ?? "");
}
function vl(e, t) {
  var n = Qn(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function on(e, t, n, r) {
  var i = Qn(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[$i] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && pl(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Qn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[an] ?? (e[an] = {
      [cl]: e.nodeName.includes("-"),
      [dl]: e.namespaceURI === us
    })
  );
}
var kr = /* @__PURE__ */ new Map();
function pl(e) {
  var t = e.getAttribute("is") || e.nodeName, n = kr.get(t);
  if (n) return n;
  kr.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = Ui(i);
    for (var a in r)
      r[a].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      a !== "innerHTML" && a !== "textContent" && a !== "innerText" && n.push(a);
    i = Mr(i);
  }
  return n;
}
function Mn(e, t) {
  return e === t || (e == null ? void 0 : e[wt]) === t;
}
function _l(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    de.r
  ), s = (
    /** @type {Effect} */
    N
  );
  return zs(() => {
    var a, o;
    return ti(() => {
      a = o, o = [], di(() => {
        Mn(n(...o), e) || (t(e, ...o), a && Mn(n(...a), e) && t(null, ...a));
      });
    }), () => {
      let u = s;
      for (; u !== i && u.parent !== null && u.parent.f & On; )
        u = u.parent;
      const c = () => {
        o && Mn(n(...o), e) && t(null, ...o);
      }, d = u.teardown;
      u.teardown = () => {
        c(), d == null || d();
      };
    };
  }), e;
}
const gl = "5";
var Nr;
typeof window < "u" && ((Nr = window.__svelte ?? (window.__svelte = {})).v ?? (Nr.v = /* @__PURE__ */ new Set())).add(gl);
function xr(e, t) {
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
      const a = JSON.stringify(i);
      a === r ? localStorage.removeItem(e) : localStorage.setItem(e, a);
    },
    /** Forkast utkastet og gå tilbake til publisert tilstand. */
    reset() {
      return localStorage.removeItem(e), i = JSON.parse(r), i;
    },
    /** Erstatt hele utkastet (brukes av angre/gjenta). Husk save() etterpå. */
    replace(a) {
      return i = a, i;
    },
    hasDraft() {
      return localStorage.getItem(e) !== null;
    }
  };
}
function ml(e, t = {}) {
  const n = (i) => {
    var a, o, u, c, d, v, f, p;
    if (i.origin !== location.origin) return;
    const s = i.data;
    (s == null ? void 0 : s.type) === "urd-edit" && ((a = t.onEdit) == null || a.call(t, s)), (s == null ? void 0 : s.type) === "urd-move" && ((o = t.onMove) == null || o.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete" && ((u = t.onDelete) == null || u.call(t, s)), (s == null ? void 0 : s.type) === "urd-add-section" && ((c = t.onAddSection) == null || c.call(t, s)), (s == null ? void 0 : s.type) === "urd-move-section" && ((d = t.onMoveSection) == null || d.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete-section" && ((v = t.onDeleteSection) == null || v.call(t, s)), (s == null ? void 0 : s.type) === "urd-section-size" && ((f = t.onSectionSize) == null || f.call(t, s)), (s == null ? void 0 : s.type) === "urd-undo" && ((p = t.onUndo) == null || p.call(t, s));
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
    sendChrome(i) {
      r({ type: "urd-chrome", visible: i });
    },
    destroy() {
      window.removeEventListener("message", n);
    }
  };
}
var wl = /* @__PURE__ */ Oe("<option> </option>"), yl = /* @__PURE__ */ Oe('<select class="svelte-1n46o8q"></select>'), bl = /* @__PURE__ */ Oe('<span class="palette svelte-1n46o8q"><button class="ghost svelte-1n46o8q" title="Ny tekstblokk">+ Tekst</button> <button class="ghost svelte-1n46o8q" title="Ny knapp">+ Knapp</button> <details class="gridmenu svelte-1n46o8q"><summary title="Ny form" class="svelte-1n46o8q">+ Form</summary> <div class="gridmenu-body formmenu svelte-1n46o8q"><button class="ghost svelte-1n46o8q">Strek</button> <button class="ghost svelte-1n46o8q">Sirkel</button> <button class="ghost svelte-1n46o8q">Rektangel</button></div></details></span> <details class="gridmenu svelte-1n46o8q"><summary title="Grid-innstillinger (gjelder hele nettstedet, publiseres med site.json)" class="svelte-1n46o8q">⌗ Grid</summary> <div class="gridmenu-body svelte-1n46o8q"><label class="svelte-1n46o8q">Kolonner <input type="number" min="4" max="100" class="svelte-1n46o8q"/></label> <label class="svelte-1n46o8q">Radhøyde (px) <input type="number" min="2" max="64" class="svelte-1n46o8q"/></label> <label class="gridmenu-snap svelte-1n46o8q"><input type="checkbox"/> Snap til grid</label> <p class="gridmenu-hint svelte-1n46o8q">Gridet vises mens du drar. Flere kolonner og lavere radhøyde gir finere plassering.</p></div></details>', 1), El = /* @__PURE__ */ Oe('<span class="badge svelte-1n46o8q">Upubliserte endringer</span>'), Sl = /* @__PURE__ */ Oe('<span class="who svelte-1n46o8q"> </span>'), kl = /* @__PURE__ */ Oe('<a class="ghost svelte-1n46o8q" href="/api/github/login">Logg inn med GitHub</a>'), xl = /* @__PURE__ */ Oe('<button class="ghost svelte-1n46o8q"> </button> <!> <a class="ghost svelte-1n46o8q" target="_blank" rel="noopener">Se siden ↗</a> <button class="ghost svelte-1n46o8q">Forkast utkast</button> <button class="primary svelte-1n46o8q">Publiser</button>', 1), Tl = /* @__PURE__ */ Oe('<iframe title="Forhåndsvisning" class="svelte-1n46o8q"></iframe>'), Al = /* @__PURE__ */ Oe('<p class="loading svelte-1n46o8q">Laster…</p>'), Nl = /* @__PURE__ */ Oe('<div class="editor svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><strong class="brand svelte-1n46o8q">Urd</strong> <!> <!> <!> <span class="status svelte-1n46o8q"> </span> <span class="spacer svelte-1n46o8q"></span> <!></header> <!></div>');
function Ml(e, t) {
  Rr(t, !0);
  let n = /* @__PURE__ */ B(null), r = /* @__PURE__ */ B(null), i = /* @__PURE__ */ B(!1), s = /* @__PURE__ */ B(""), a = /* @__PURE__ */ B(null), o = /* @__PURE__ */ B(null), u = /* @__PURE__ */ B(gt({ columns: 24, rowHeight: 8, snap: !0 })), c = /* @__PURE__ */ B(!0), d = null, v = null, f = null;
  const p = () => w(n).pages.find((_) => _.id === w(r));
  function h() {
    O(i, (d == null ? void 0 : d.hasDraft()) || (v == null ? void 0 : v.hasDraft()) || !1, !0);
  }
  const m = [], x = [];
  let T = null;
  function M() {
    return JSON.stringify({ page: d.data, site: v.data });
  }
  function P(_) {
    _ === T && (_.startsWith("edit:") || _ === "grid") || (m.push(M()), m.length > 50 && m.shift(), x.length = 0, T = _);
  }
  function Q(_) {
    const { page: g, site: k } = JSON.parse(_);
    d.replace(g), v.replace(k), d.save(), v.save(), O(u, { snap: !0, ...v.data.grid }, !0), h(), f == null || f.sendSite(v.data), f == null || f.sendPage(w(r), d.data);
  }
  function Se() {
    m.length && (x.push(M()), Q(m.pop()), T = null, O(s, "Angret"));
  }
  function ve() {
    x.length && (m.push(M()), Q(x.pop()), T = null, O(s, "Gjentatt"));
  }
  function Ye(_) {
    if (!(_.ctrlKey || _.metaKey) || _.key.toLowerCase() !== "z") return;
    const g = _.target;
    g instanceof HTMLElement && (g.isContentEditable || g.tagName === "INPUT" || g.tagName === "TEXTAREA" || g.tagName === "SELECT") || (_.preventDefault(), _.shiftKey ? ve() : Se());
  }
  async function De() {
    O(n, await (await fetch("/content/site.json")).json(), !0), v = xr("urd-draft-site", () => w(n)), O(u, { snap: !0, ...v.data.grid }, !0), await tn(new URLSearchParams(location.search).get("page") ?? w(n).pages[0].id), await en();
  }
  function L(_, g) {
    P("grid"), O(u, { ...w(u), [_]: g }, !0), v.data.grid = { ...v.data.grid, [_]: g }, v.save(), h(), f == null || f.sendSite(v.data);
  }
  async function en() {
    try {
      const _ = await fetch("/api/github/me");
      O(o, _.ok ? await _.json() : null, !0);
    } catch {
      O(o, null);
    }
  }
  async function tn(_) {
    O(r, _, !0);
    const g = p(), k = await (await fetch(`/${g.file}`)).json();
    d = xr(`urd-draft-${_}`, () => k), m.length = 0, x.length = 0, T = null, h(), O(s, "");
  }
  function pi() {
    f == null || f.destroy(), f = ml(w(a), {
      onEdit: gi,
      onMove: mi,
      onDelete: Si,
      onAddSection: wi,
      onMoveSection: yi,
      onDeleteSection: bi,
      onSectionSize: Ei,
      onUndo: (_) => _.redo ? ve() : Se()
    }), v.hasDraft() && f.sendSite(v.data), d.hasDraft() && f.sendPage(w(r), d.data), w(c) || f.sendChrome(!1);
  }
  function _i() {
    O(c, !w(c)), f == null || f.sendChrome(w(c));
  }
  function gi(_) {
    const g = d.data.sections.find((S) => S.id === _.sectionId), k = g == null ? void 0 : g.blocks.find((S) => S.id === _.blockId);
    k && (P(`edit:${_.blockId}`), k.props = _.props, d.save(), h(), O(s, ""));
  }
  function mi(_) {
    const g = d.data.sections.find((S) => S.id === _.sectionId), k = g == null ? void 0 : g.blocks.find((S) => S.id === _.blockId);
    k && (P("move-block"), k.frames.desktop = _.frame, d.save(), h());
  }
  function wi(_) {
    P("add-section"), d.data.sections.splice(_.index, 0, _.section), d.save(), h(), f == null || f.sendPage(w(r), d.data);
  }
  function yi(_) {
    const g = d.data.sections, k = g.findIndex((G) => G.id === _.sectionId), S = k + _.dir;
    k < 0 || S < 0 || S >= g.length || (P("move-section"), [g[k], g[S]] = [g[S], g[k]], d.save(), h(), f == null || f.sendPage(w(r), d.data));
  }
  function bi(_) {
    P("delete-section"), d.data.sections = d.data.sections.filter((g) => g.id !== _.sectionId), d.save(), h(), f == null || f.sendPage(w(r), d.data);
  }
  function Ei(_) {
    const g = d.data.sections.find((k) => k.id === _.sectionId);
    g && (P("section-size"), g.size = { ...g.size, minHeight: _.minHeight }, d.save(), h());
  }
  function Si(_) {
    const g = d.data.sections.find((k) => k.id === _.sectionId);
    g && (P("delete-block"), g.blocks = g.blocks.filter((k) => k.id !== _.blockId), d.save(), h(), f == null || f.sendSection(w(r), g));
  }
  const ki = {
    text: {
      type: "text",
      props: { html: "<p>Ny tekst</p>", align: "left" },
      w: 8,
      h: 3
    },
    button: {
      type: "button",
      props: { label: "Ny knapp", page: null, href: "#", style: "primary" },
      w: 5,
      h: 2
    },
    "shape-line": {
      type: "shape",
      props: { kind: "line", color: "accent", thickness: 2, fill: null },
      w: 6,
      h: 1
    },
    "shape-circle": {
      type: "shape",
      props: { kind: "circle", color: "accent", thickness: 2, fill: null },
      w: 4,
      h: 4
    },
    "shape-rect": {
      type: "shape",
      props: { kind: "rect", color: "accent", thickness: 2, fill: null },
      w: 6,
      h: 3
    }
  };
  function Rt(_, g) {
    var Y;
    P("add-block");
    const k = d.data.sections[0], S = ki[_], G = Math.max(0, ...k.blocks.map((He) => He.frames.desktop.y + He.frames.desktop.h));
    k.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: S.type,
      version: 1,
      props: structuredClone(S.props),
      animation: null,
      frames: {
        desktop: { x: 1, y: G + 1, w: S.w, h: S.h, z: 1, rot: 0 },
        mobile: null
      }
    }), d.save(), h(), f == null || f.sendSection(w(r), k), (Y = g == null ? void 0 : g.target.closest("details")) == null || Y.removeAttribute("open");
  }
  function xi() {
    P("discard");
    const _ = d.reset(), g = v.reset();
    O(u, { snap: !0, ...g.grid }, !0), h(), O(s, ""), f == null || f.sendSite(g), f == null || f.sendPage(w(r), _);
  }
  async function Ti() {
    var G, Y;
    O(s, "Publiserer…");
    const _ = p(), g = [];
    d.hasDraft() && g.push({
      path: _.file,
      content: JSON.stringify(d.data, null, 2) + `
`,
      encoding: "utf-8"
    }), v.hasDraft() && g.push({
      path: "content/site.json",
      content: JSON.stringify(v.data, null, 2) + `
`,
      encoding: "utf-8"
    });
    const k = { message: `Oppdater ${_.title} via Urd-admin`, files: g };
    let S = null;
    try {
      S = await fetch("/api/github/commit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(k)
      });
    } catch {
    }
    S != null && S.ok ? (localStorage.removeItem(`urd-draft-${w(r)}`), localStorage.removeItem("urd-draft-site"), O(s, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), O(i, !1)) : (S == null ? void 0 : S.status) === 401 ? (O(s, "Du må logge inn med GitHub for å publisere."), await en()) : (S == null ? void 0 : S.status) === 403 ? O(s, ((G = await S.json().catch(() => null)) == null ? void 0 : G.error) ?? "Du har ikke publiseringstilgang.", !0) : S ? O(s, ((Y = await S.json().catch(() => null)) == null ? void 0 : Y.error) ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : O(s, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
  }
  De();
  var er = Nl();
  mr("keydown", Fn, Ye);
  var tr = $(er), nr = C($(tr), 2);
  {
    var Ai = (_) => {
      var g = yl();
      ol(g, 21, () => w(n).pages, sl, (S, G) => {
        var Y = wl(), He = $(Y), Ue = {};
        $e(() => {
          sn(He, w(G).title), Ue !== (Ue = w(G).id) && (Y.value = (Y.__value = w(G).id) ?? "");
        }), Te(S, Y);
      });
      var k;
      ul(g), $e(() => {
        k !== (k = w(r)) && (g.value = (g.__value = w(r)) ?? "", vi(g, w(r)));
      }), ie("change", g, (S) => tn(S.target.value)), Te(_, g);
    };
    ht(nr, (_) => {
      w(n) && _(Ai);
    });
  }
  var rr = C(nr, 2);
  {
    var Ni = (_) => {
      var g = bl(), k = pr(g), S = $(k), G = C(S, 2), Y = C(G, 2), He = C($(Y), 2), Ue = $(He), ct = C(Ue, 2), nn = C(ct, 2), ke = C(k, 2), xe = C($(ke), 2), rn = $(xe), lr = C($(rn)), or = C(rn, 2), ar = C($(or)), qi = C(or, 2), fr = $(qi);
      $e(() => {
        Sr(lr, w(u).columns), Sr(ar, w(u).rowHeight), vl(fr, w(u).snap !== !1);
      }), ie("click", S, () => Rt("text")), ie("click", G, () => Rt("button")), ie("click", Ue, (pe) => Rt("shape-line", pe)), ie("click", ct, (pe) => Rt("shape-circle", pe)), ie("click", nn, (pe) => Rt("shape-rect", pe)), ie("change", lr, (pe) => L("columns", Math.max(4, Math.min(100, Number(pe.target.value) || 24)))), ie("change", ar, (pe) => L("rowHeight", Math.max(2, Math.min(64, Number(pe.target.value) || 8)))), ie("change", fr, (pe) => L("snap", pe.target.checked)), Te(_, g);
    };
    ht(rr, (_) => {
      w(n) && _(Ni);
    });
  }
  var ir = C(rr, 2);
  {
    var Mi = (_) => {
      var g = El();
      Te(_, g);
    };
    ht(ir, (_) => {
      w(i) && _(Mi);
    });
  }
  var sr = C(ir, 2), Ii = $(sr), Oi = C(sr, 4);
  {
    var Di = (_) => {
      var g = xl(), k = pr(g), S = $(k), G = C(k, 2);
      {
        var Y = (ke) => {
          var xe = Sl(), rn = $(xe);
          $e(() => {
            on(xe, "title", w(o).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), sn(rn, `${w(o).allowed ? "" : "⚠ "}${w(o).login ?? ""}`);
          }), Te(ke, xe);
        }, He = (ke) => {
          var xe = kl();
          Te(ke, xe);
        };
        ht(G, (ke) => {
          var xe;
          (xe = w(o)) != null && xe.loggedIn ? ke(Y) : w(o) && ke(He, 1);
        });
      }
      var Ue = C(G, 2), ct = C(Ue, 2), nn = C(ct, 2);
      $e(
        (ke) => {
          on(k, "title", w(c) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), sn(S, w(c) ? "👁 Ren visning" : "✏ Rediger"), on(Ue, "href", ke), ct.disabled = !w(i), nn.disabled = !w(i);
        },
        [() => p().path]
      ), ie("click", k, _i), ie("click", ct, xi), ie("click", nn, Ti), Te(_, g);
    };
    ht(Oi, (_) => {
      w(n) && _(Di);
    });
  }
  var Pi = C(tr, 2);
  {
    var Ri = (_) => {
      var g = Tl();
      _l(g, (k) => O(a, k), () => w(a)), $e(() => on(g, "src", `/?page=${w(r)}&preview=1`)), mr("load", g, pi), Te(_, g);
    }, Ci = (_) => {
      var g = Al();
      Te(_, g);
    };
    ht(Pi, (_) => {
      w(n) ? _(Ri) : _(Ci, -1);
    });
  }
  $e(() => sn(Ii, w(s))), Te(e, er), Cr();
}
Zs(["change", "click"]);
const Dl = tl(Ml, { target: document.getElementById("urd-admin") });
export {
  Dl as default
};
