var Bi = Object.defineProperty;
var pr = (e) => {
  throw TypeError(e);
};
var Vi = (e, t, n) => t in e ? Bi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ne = (e, t, n) => Vi(e, typeof t != "symbol" ? t + "" : t, n), xn = (e, t, n) => t.has(e) || pr("Cannot " + n);
var o = (e, t, n) => (xn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), k = (e, t, n) => t.has(e) ? pr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), y = (e, t, n, r) => (xn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), I = (e, t, n) => (xn(e, t, "access private method"), n);
var Vn = Array.isArray, Ki = Array.prototype.indexOf, dn = Array.prototype.includes, kn = Array.from, Yi = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, $i = Object.getOwnPropertyDescriptors, Ji = Object.prototype, Wi = Array.prototype, Cr = Object.getPrototypeOf, _r = Object.isExtensible;
const Xi = () => {
};
function Zi(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function qr() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const U = 2, Nt = 4, En = 8, Lr = 1 << 24, be = 16, Se = 32, Fe = 64, On = 128, ce = 512, j = 1024, H = 2048, Ee = 4096, $ = 8192, de = 16384, Pt = 32768, Dn = 1 << 25, Mt = 65536, hn = 1 << 17, Qi = 1 << 18, Rt = 1 << 19, es = 1 << 20, Le = 1 << 25, ft = 65536, vn = 1 << 21, mt = 1 << 22, Ke = 1 << 23, yt = Symbol("$state"), ts = Symbol(""), on = Symbol("attributes"), Pn = Symbol("class"), ns = Symbol("style"), Lt = Symbol("text"), Xt = new class extends Error {
  constructor() {
    super(...arguments);
    ne(this, "name", "StaleReactionError");
    ne(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Dr;
const rs = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Dr = globalThis.document) != null && Dr.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function is() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ss(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function ls() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function os() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function as() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function fs() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function us() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const cs = 1, ds = 2, hs = 16, vs = 1, ps = 2, F = Symbol("uninitialized"), _s = "http://www.w3.org/1999/xhtml";
function gs() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ws() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function ms() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Fr(e) {
  return e === this.v;
}
function ys(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function jr(e) {
  return !ys(e, this.v);
}
let he = null;
function It(e) {
  he = e;
}
function Hr(e, t = !1, n) {
  he = {
    p: he,
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
function Ur(e) {
  var t = (
    /** @type {ComponentContext} */
    he
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Ks(r);
  }
  return t.i = !0, he = t.p, /** @type {T} */
  {};
}
function zr() {
  return !0;
}
let _t = [];
function bs() {
  var e = _t;
  _t = [], Zi(e);
}
function it(e) {
  if (_t.length === 0) {
    var t = _t;
    queueMicrotask(() => {
      t === _t && bs();
    });
  }
  _t.push(e);
}
function Gr(e) {
  var t = N;
  if (t === null)
    return A.f |= Ke, e;
  if ((t.f & Pt) === 0 && (t.f & Nt) === 0)
    throw e;
  Ve(e, t);
}
function Ve(e, t) {
  if (!(t !== null && (t.f & de) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & On) !== 0) {
        if ((t.f & Pt) === 0)
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
const ks = -7169;
function q(e, t) {
  e.f = e.f & ks | t;
}
function Kn(e) {
  (e.f & ce) !== 0 || e.deps === null ? q(e, j) : q(e, Ee);
}
function Br(e) {
  if (e !== null)
    for (const t of e)
      (t.f & U) === 0 || (t.f & ft) === 0 || (t.f ^= ft, Br(
        /** @type {Derived} */
        t.deps
      ));
}
function Vr(e, t, n) {
  (e.f & H) !== 0 ? t.add(e) : (e.f & Ee) !== 0 && n.add(e), Br(e.deps), q(e, j);
}
function Zt(e) {
  var t = A, n = N;
  ve(null), Oe(null);
  try {
    return e();
  } finally {
    ve(t), Oe(n);
  }
}
function Es(e) {
  let t = 0, n = ct(0), r;
  return () => {
    Wn() && (m(n), oi(() => (t === 0 && (r = wi(() => e(() => Bt(n)))), t += 1, () => {
      it(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Bt(n));
      });
    })));
  };
}
var Ss = Mt | Rt;
function Ts(e, t, n, r) {
  new xs(e, t, n, r);
}
var oe, Bn, ae, Qe, X, fe, Y, ie, Pe, et, Ge, bt, Kt, Yt, Re, mn, C, As, Ns, Ms, Rn, an, fn, Cn, qn;
class xs {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    k(this, C);
    /** @type {Boundary | null} */
    ne(this, "parent");
    ne(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    ne(this, "transform_error");
    /** @type {TemplateNode} */
    k(this, oe);
    /** @type {TemplateNode | null} */
    k(this, Bn, null);
    /** @type {BoundaryProps} */
    k(this, ae);
    /** @type {((anchor: Node) => void)} */
    k(this, Qe);
    /** @type {Effect} */
    k(this, X);
    /** @type {Effect | null} */
    k(this, fe, null);
    /** @type {Effect | null} */
    k(this, Y, null);
    /** @type {Effect | null} */
    k(this, ie, null);
    /** @type {DocumentFragment | null} */
    k(this, Pe, null);
    k(this, et, 0);
    k(this, Ge, 0);
    k(this, bt, !1);
    /** @type {Set<Effect>} */
    k(this, Kt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    k(this, Yt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    k(this, Re, null);
    k(this, mn, Es(() => (y(this, Re, ct(o(this, et))), () => {
      y(this, Re, null);
    })));
    var s;
    y(this, oe, t), y(this, ae, n), y(this, Qe, (a) => {
      var l = (
        /** @type {Effect} */
        N
      );
      l.b = this, l.f |= On, r(a);
    }), this.parent = /** @type {Effect} */
    N.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((a) => a), y(this, X, Zn(() => {
      I(this, C, Rn).call(this);
    }, Ss));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Vr(t, o(this, Kt), o(this, Yt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!o(this, ae).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    I(this, C, Cn).call(this, t, n), y(this, et, o(this, et) + t), !(!o(this, Re) || o(this, bt)) && (y(this, bt, !0), it(() => {
      y(this, bt, !1), o(this, Re) && Ot(o(this, Re), o(this, et));
    }));
  }
  get_effect_pending() {
    return o(this, mn).call(this), m(
      /** @type {Source<number>} */
      o(this, Re)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!o(this, ae).onerror && !o(this, ae).failed)
      throw t;
    b != null && b.is_fork ? (o(this, fe) && b.skip_effect(o(this, fe)), o(this, Y) && b.skip_effect(o(this, Y)), o(this, ie) && b.skip_effect(o(this, ie)), b.oncommit(() => {
      I(this, C, qn).call(this, t);
    })) : I(this, C, qn).call(this, t);
  }
}
oe = new WeakMap(), Bn = new WeakMap(), ae = new WeakMap(), Qe = new WeakMap(), X = new WeakMap(), fe = new WeakMap(), Y = new WeakMap(), ie = new WeakMap(), Pe = new WeakMap(), et = new WeakMap(), Ge = new WeakMap(), bt = new WeakMap(), Kt = new WeakMap(), Yt = new WeakMap(), Re = new WeakMap(), mn = new WeakMap(), C = new WeakSet(), As = function() {
  try {
    y(this, fe, ue(() => o(this, Qe).call(this, o(this, oe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Ns = function(t) {
  const n = o(this, ae).failed;
  n && y(this, ie, ue(() => {
    n(
      o(this, oe),
      () => t,
      () => () => {
      }
    );
  }));
}, Ms = function() {
  const t = o(this, ae).pending;
  t && (this.is_pending = !0, y(this, Y, ue(() => t(o(this, oe)))), it(() => {
    var n = y(this, Pe, document.createDocumentFragment()), r = lt();
    n.append(r), y(this, fe, I(this, C, fn).call(this, () => ue(() => o(this, Qe).call(this, r)))), o(this, Ge) === 0 && (o(this, oe).before(n), y(this, Pe, null), ot(
      /** @type {Effect} */
      o(this, Y),
      () => {
        y(this, Y, null);
      }
    ), I(this, C, an).call(
      this,
      /** @type {Batch} */
      b
    ));
  }));
}, Rn = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), y(this, Ge, 0), y(this, et, 0), y(this, fe, ue(() => {
      o(this, Qe).call(this, o(this, oe));
    })), o(this, Ge) > 0) {
      var t = y(this, Pe, document.createDocumentFragment());
      er(o(this, fe), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        o(this, ae).pending
      );
      y(this, Y, ue(() => n(o(this, oe))));
    } else
      I(this, C, an).call(
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
an = function(t) {
  this.is_pending = !1, t.transfer_effects(o(this, Kt), o(this, Yt));
}, /**
 * @template T
 * @param {() => T} fn
 */
fn = function(t) {
  var n = N, r = A, i = he;
  Oe(o(this, X)), ve(o(this, X)), It(o(this, X).ctx);
  try {
    return ut.ensure(), t();
  } catch (s) {
    return Gr(s), null;
  } finally {
    Oe(n), ve(r), It(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Cn = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && I(r = this.parent, C, Cn).call(r, t, n);
    return;
  }
  y(this, Ge, o(this, Ge) + t), o(this, Ge) === 0 && (I(this, C, an).call(this, n), o(this, Y) && ot(o(this, Y), () => {
    y(this, Y, null);
  }), o(this, Pe) && (o(this, oe).before(o(this, Pe)), y(this, Pe, null)));
}, /**
 * @param {unknown} error
 */
qn = function(t) {
  o(this, fe) && (ee(o(this, fe)), y(this, fe, null)), o(this, Y) && (ee(o(this, Y)), y(this, Y, null)), o(this, ie) && (ee(o(this, ie)), y(this, ie, null));
  var n = o(this, ae).onerror;
  let r = o(this, ae).failed;
  var i = !1, s = !1;
  const a = () => {
    if (i) {
      ms();
      return;
    }
    i = !0, s && us(), o(this, ie) !== null && ot(o(this, ie), () => {
      y(this, ie, null);
    }), I(this, C, fn).call(this, () => {
      I(this, C, Rn).call(this);
    });
  }, l = (f) => {
    try {
      s = !0, n == null || n(f, a), s = !1;
    } catch (c) {
      Ve(c, o(this, X) && o(this, X).parent);
    }
    r && y(this, ie, I(this, C, fn).call(this, () => {
      try {
        return ue(() => {
          var c = (
            /** @type {Effect} */
            N
          );
          c.b = this, c.f |= On, r(
            o(this, oe),
            () => f,
            () => a
          );
        });
      } catch (c) {
        return Ve(
          c,
          /** @type {Effect} */
          o(this, X).parent
        ), null;
      }
    }));
  };
  it(() => {
    var f;
    try {
      f = this.transform_error(t);
    } catch (c) {
      Ve(c, o(this, X) && o(this, X).parent);
      return;
    }
    f !== null && typeof f == "object" && typeof /** @type {any} */
    f.then == "function" ? f.then(
      l,
      /** @param {unknown} e */
      (c) => Ve(c, o(this, X) && o(this, X).parent)
    ) : l(f);
  });
};
function Is(e, t, n, r) {
  const i = Yr;
  var s = e.filter((p) => !p.settled), a = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(a);
    return;
  }
  var l = (
    /** @type {Effect} */
    N
  ), f = Os(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((p) => p.promise)) : null;
  function d(p) {
    if ((l.f & de) === 0) {
      f();
      try {
        r([...a, ...p]);
      } catch (h) {
        Ve(h, l);
      }
      pn();
    }
  }
  var v = Kr();
  if (n.length === 0) {
    c.then(() => d([])).finally(v);
    return;
  }
  function u() {
    Promise.all(n.map((p) => /* @__PURE__ */ Ds(p))).then(d).catch((p) => Ve(p, l)).finally(v);
  }
  c ? c.then(() => {
    f(), u(), pn();
  }) : u();
}
function Os() {
  var e = (
    /** @type {Effect} */
    N
  ), t = A, n = he, r = (
    /** @type {Batch} */
    b
  );
  return function(s = !0) {
    Oe(e), ve(t), It(n), s && (e.f & de) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function pn(e = !0) {
  Oe(null), ve(null), It(null), e && (b == null || b.deactivate());
}
function Kr() {
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
function Yr(e) {
  var t = U | H;
  return N !== null && (N.f |= Rt), {
    ctx: he,
    deps: null,
    effects: null,
    equals: Fr,
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
const Ft = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Ds(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    N
  );
  r === null && is();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ct(
    /** @type {V} */
    F
  ), a = !A, l = /* @__PURE__ */ new Set();
  return Js(() => {
    var p, h;
    var f = (
      /** @type {Effect} */
      N
    ), c = qr();
    i = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (w) => {
        w !== Xt && c.reject(w);
      }).finally(pn);
    } catch (w) {
      c.reject(w), pn();
    }
    var d = (
      /** @type {Batch} */
      b
    );
    if (a) {
      if ((f.f & Pt) !== 0)
        var v = Kr();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (h = d.async_deriveds.get(f)) == null || h.reject(Ft);
      else
        for (const w of l.values())
          w.reject(Ft);
      l.add(c), d.async_deriveds.set(f, c);
    }
    const u = (w, T = void 0) => {
      v == null || v(), l.delete(c), T !== Ft && (d.activate(), T ? (s.f |= Ke, Ot(s, T)) : ((s.f & Ke) !== 0 && (s.f ^= Ke), Ot(s, w)), d.deactivate());
    };
    c.promise.then(u, (w) => u(null, w || "unknown"));
  }), Xn(() => {
    for (const f of l)
      f.reject(Ft);
  }), new Promise((f) => {
    function c(d) {
      function v() {
        d === i ? f(s) : c(i);
      }
      d.then(v, v);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Ps(e) {
  const t = /* @__PURE__ */ Yr(e);
  return t.equals = jr, t;
}
function Rs(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      ee(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Yn(e) {
  var t, n = N, r = e.parent;
  if (!dt && r !== null && e.v !== F && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (de | $)) !== 0)
    return gs(), e.v;
  Oe(r);
  try {
    e.f &= ~ft, Rs(e), t = pi(e);
  } finally {
    Oe(n);
  }
  return t;
}
function $r(e) {
  var t = Yn(e);
  if (!e.equals(t) && (e.wv = hi(), (!(b != null && b.is_fork) || e.deps === null) && (b !== null ? (b.capture(e, t, !0), Gt == null || Gt.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    q(e, j);
    return;
  }
  dt || (z !== null ? (Wn() || b != null && b.is_fork) && z.set(e, t) : Kn(e));
}
function Cs(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && Zt(() => {
        n.ac.abort(Xt), n.ac = null;
      }), n.fn !== null && (n.teardown = Xi), Vt(n, 0), Qn(n));
}
function Jr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && Dt(t);
}
let An = null, vt = null, b = null, Gt = null, z = null, Ln = null, Nn = !1, gt = null, un = null;
var gr = 0;
let qs = 1;
var kt, Be, tt, Et, St, Tt, Ce, xt, Z, $t, qe, me, Ne, At, nt, D, Fn, jt, jn, Wr, Xr, pt, Ls, Ht;
const yn = class yn {
  constructor() {
    k(this, D);
    ne(this, "id", qs++);
    /** True as soon as `#process` was called */
    k(this, kt, !1);
    ne(this, "linked", !0);
    /** @type {Batch | null} */
    k(this, Be, null);
    /** @type {Batch | null} */
    k(this, tt, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    ne(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    ne(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    ne(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, Et, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, St, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    k(this, Tt, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    k(this, Ce, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    k(this, xt, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    k(this, Z, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    k(this, $t, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    k(this, qe, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    k(this, me, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    k(this, Ne, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    k(this, At, /* @__PURE__ */ new Set());
    ne(this, "is_fork", !1);
    k(this, nt, !1);
    vt === null ? An = vt = this : (y(vt, tt, this), y(this, Be, vt)), vt = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    o(this, Ne).has(t) || o(this, Ne).set(t, { d: [], m: [] }), o(this, At).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = o(this, Ne).get(t);
    if (r) {
      o(this, Ne).delete(t);
      for (var i of r.d)
        q(i, H), n(i);
      for (i of r.m)
        q(i, Ee), n(i);
    }
    o(this, At).add(t);
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
      Nn = !0, b = this, I(this, D, jt).call(this);
    } finally {
      gr = 0, Ln = null, gt = null, un = null, Nn = !1, b = null, z = null, st.clear();
    }
  }
  discard() {
    var t;
    for (const n of o(this, St)) n(this);
    o(this, St).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Ft);
    I(this, D, Ht).call(this), (t = o(this, xt)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    o(this, $t).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (y(this, Tt, o(this, Tt) + 1), t) {
      let r = o(this, Ce).get(n) ?? 0;
      o(this, Ce).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (y(this, Tt, o(this, Tt) - 1), t) {
      let r = o(this, Ce).get(n) ?? 0;
      r === 1 ? o(this, Ce).delete(n) : o(this, Ce).set(n, r - 1);
    }
    o(this, nt) || (y(this, nt, !0), it(() => {
      y(this, nt, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      o(this, qe).add(r);
    for (const r of n)
      o(this, me).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    o(this, Et).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    o(this, St).add(t);
  }
  settled() {
    return (o(this, xt) ?? y(this, xt, qr())).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new yn();
      Nn || it(() => {
        o(t, kt) || t.flush();
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
    if (Ln = t, (i = t.b) != null && i.is_pending && (t.f & (Nt | En | Lr)) !== 0 && (t.f & Pt) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (gt !== null && n === N && (A === null || (A.f & U) === 0))
        return;
      if ((r & (Fe | Se)) !== 0) {
        if ((r & j) === 0)
          return;
        n.f ^= j;
      }
    }
    o(this, Z).push(n);
  }
};
kt = new WeakMap(), Be = new WeakMap(), tt = new WeakMap(), Et = new WeakMap(), St = new WeakMap(), Tt = new WeakMap(), Ce = new WeakMap(), xt = new WeakMap(), Z = new WeakMap(), $t = new WeakMap(), qe = new WeakMap(), me = new WeakMap(), Ne = new WeakMap(), At = new WeakMap(), nt = new WeakMap(), D = new WeakSet(), Fn = function() {
  if (this.is_fork) return !0;
  for (const r of o(this, Ce).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (o(this, Ne).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, jt = function() {
  var f, c, d, v;
  y(this, kt, !0), gr++ > 1e3 && (I(this, D, Ht).call(this), Fs());
  for (const u of o(this, qe))
    o(this, me).delete(u), q(u, H), this.schedule(u);
  for (const u of o(this, me))
    q(u, Ee), this.schedule(u);
  const t = o(this, Z);
  y(this, Z, []), this.apply();
  var n = gt = [], r = [], i = un = [];
  for (const u of t)
    try {
      I(this, D, jn).call(this, u, n, r);
    } catch (p) {
      throw ei(u), I(this, D, Fn).call(this) || this.discard(), p;
    }
  if (b = null, i.length > 0) {
    var s = yn.ensure();
    for (const u of i)
      s.schedule(u);
  }
  if (gt = null, un = null, I(this, D, Fn).call(this)) {
    I(this, D, pt).call(this, r), I(this, D, pt).call(this, n);
    for (const [u, p] of o(this, Ne))
      Qr(u, p);
    i.length > 0 && /** @type {unknown} */
    I(f = b, D, jt).call(f);
    return;
  }
  const a = I(this, D, Wr).call(this);
  if (a) {
    I(this, D, pt).call(this, r), I(this, D, pt).call(this, n), I(c = a, D, Xr).call(c, this);
    return;
  }
  o(this, qe).clear(), o(this, me).clear();
  for (const u of o(this, Et)) u(this);
  o(this, Et).clear(), Gt = this, wr(r), wr(n), Gt = null, (d = o(this, xt)) == null || d.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    b
  );
  if (o(this, Tt) === 0 && (o(this, Z).length === 0 || l !== null) && I(this, D, Ht).call(this), o(this, Z).length > 0)
    if (l !== null) {
      const u = l;
      o(u, Z).push(...o(this, Z).filter((p) => !o(u, Z).includes(p)));
    } else
      l = this;
  l !== null && I(v = l, D, jt).call(v);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
jn = function(t, n, r) {
  t.f ^= j;
  for (var i = t.first; i !== null; ) {
    var s = i.f, a = (s & (Se | Fe)) !== 0, l = a && (s & j) !== 0, f = l || (s & $) !== 0 || o(this, Ne).has(i);
    if (!f && i.fn !== null) {
      a ? i.f ^= j : (s & Nt) !== 0 ? n.push(i) : en(i) && ((s & be) !== 0 && o(this, me).add(i), Dt(i));
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
}, Wr = function() {
  for (var t = o(this, Be); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = o(t, Be);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Xr = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const a = this.async_deriveds.get(i);
    a && s.promise.then(a.resolve).catch(a.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(o(t, qe), o(t, me));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & U) !== 0 && (i.f & (H | Ee)) === 0))
      for (const f of s) {
        var a = f.f;
        if ((a & U) !== 0)
          n(
            /** @type {Derived} */
            f
          );
        else {
          var l = (
            /** @type {Effect} */
            f
          );
          a & (mt | be) && !this.async_deriveds.has(l) && (o(this, me).delete(l), q(l, H), this.schedule(l));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), I(r = t, D, Ht).call(r), b = this, I(this, D, jt).call(this);
}, /**
 * @param {Effect[]} effects
 */
pt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Vr(t[n], o(this, qe), o(this, me));
}, Ls = function() {
  var v;
  for (let u = An; u !== null; u = o(u, tt)) {
    var t = u.id < this.id, n = [];
    for (const [p, [h, w]] of this.current) {
      if (u.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          u.current.get(p)[0]
        );
        if (t && h !== r)
          u.current.set(p, [h, w]);
        else
          continue;
      }
      n.push(p);
    }
    if (t)
      for (const [p, h] of this.async_deriveds) {
        const w = u.async_deriveds.get(p);
        w && h.promise.then(w.resolve).catch(w.reject);
      }
    var i = [...u.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      u.current.get(p)[1]
    );
    if (!(!o(u, kt) || i.length === 0)) {
      var s = i.filter((p) => !this.current.has(p));
      if (s.length === 0)
        t && u.discard();
      else if (n.length > 0) {
        if (t)
          for (const p of o(this, At))
            u.unskip_effect(p, (h) => {
              var w;
              (h.f & (be | mt)) !== 0 ? u.schedule(h) : I(w = u, D, pt).call(w, [h]);
            });
        u.activate();
        var a = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
        for (var f of n)
          Zr(f, s, a, l);
        l = /* @__PURE__ */ new Map();
        var c = [...u.current].filter(([p, h]) => {
          const w = this.current.get(p);
          return w ? w[0] !== h[0] || w[1] !== h[1] : !0;
        }).map(([p]) => p);
        if (c.length > 0)
          for (const p of o(this, $t))
            (p.f & (de | $ | hn)) === 0 && $n(p, c, l) && ((p.f & (mt | be)) !== 0 ? (q(p, H), u.schedule(p)) : o(u, qe).add(p));
        if (o(u, Z).length > 0 && !o(u, nt)) {
          u.apply();
          for (var d of o(u, Z))
            I(v = u, D, jn).call(v, d, [], []);
          y(u, Z, []);
        }
        u.deactivate();
      }
    }
  }
}, Ht = function() {
  if (this.linked) {
    var t = o(this, Be), n = o(this, tt);
    t === null ? An = n : y(t, tt, n), n === null ? vt = t : y(n, Be, t), this.linked = !1;
  }
};
let ut = yn;
function Fs() {
  try {
    ls();
  } catch (e) {
    Ve(e, Ln);
  }
}
let we = null;
function wr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (de | $)) === 0 && en(r) && (we = /* @__PURE__ */ new Set(), Dt(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && fi(r), (we == null ? void 0 : we.size) > 0)) {
        st.clear();
        for (const i of we) {
          if ((i.f & (de | $)) !== 0) continue;
          const s = [i];
          let a = i.parent;
          for (; a !== null; )
            we.has(a) && (we.delete(a), s.push(a)), a = a.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const f = s[l];
            (f.f & (de | $)) === 0 && Dt(f);
          }
        }
        we.clear();
      }
    }
    we = null;
  }
}
function Zr(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & U) !== 0 ? Zr(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (mt | be)) !== 0 && (s & H) === 0 && $n(i, t, r) && (q(i, H), Jn(
        /** @type {Effect} */
        i
      ));
    }
}
function $n(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (dn.call(t, i))
        return !0;
      if ((i.f & U) !== 0 && $n(
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
function Jn(e) {
  b.schedule(e);
}
function Qr(e, t) {
  if (!((e.f & Se) !== 0 && (e.f & j) !== 0)) {
    (e.f & H) !== 0 ? t.d.push(e) : (e.f & Ee) !== 0 && t.m.push(e), q(e, j);
    for (var n = e.first; n !== null; )
      Qr(n, t), n = n.next;
  }
}
function ei(e) {
  q(e, j);
  for (var t = e.first; t !== null; )
    ei(t), t = t.next;
}
let _n = /* @__PURE__ */ new Set();
const st = /* @__PURE__ */ new Map();
let ti = !1;
function ct(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Fr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
  const n = ct(e);
  return Zs(n), n;
}
// @__NO_SIDE_EFFECTS__
function js(e, t = !1, n = !0) {
  const r = ct(e);
  return t || (r.equals = jr), r;
}
function O(e, t, n = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ke || (A.f & hn) !== 0) && zr() && (A.f & (U | be | mt | hn)) !== 0 && (Ie === null || !Ie.has(e)) && fs();
  let r = n ? wt(t) : t;
  return Ot(e, r, un);
}
function Ot(e, t, n = null) {
  if (!e.equals(t)) {
    st.set(e, dt ? t : e.v);
    var r = ut.ensure();
    if (r.capture(e, t), (e.f & U) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & H) !== 0 && Yn(i), z === null && Kn(i);
    }
    e.wv = hi(), ni(e, H, n), N !== null && (N.f & j) !== 0 && (N.f & (Se | Fe)) === 0 && (le === null ? Qs([e]) : le.push(e)), !r.is_fork && _n.size > 0 && !ti && Hs();
  }
  return t;
}
function Hs() {
  ti = !1;
  for (const e of _n) {
    (e.f & j) !== 0 && q(e, Ee);
    let t;
    try {
      t = en(e);
    } catch {
      t = !0;
    }
    t && Dt(e);
  }
  _n.clear();
}
function Bt(e) {
  O(e, e.v + 1);
}
function ni(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var a = r[s], l = a.f, f = (l & H) === 0;
      if (f && q(a, t), (l & hn) !== 0)
        _n.add(
          /** @type {Effect} */
          a
        );
      else if ((l & U) !== 0) {
        var c = (
          /** @type {Derived} */
          a
        );
        z == null || z.delete(c), (l & ft) === 0 && (l & ce && (N === null || (N.f & vn) === 0) && (a.f |= ft), ni(c, Ee, n));
      } else if (f) {
        var d = (
          /** @type {Effect} */
          a
        );
        (l & be) !== 0 && we !== null && we.add(d), n !== null ? n.push(d) : Jn(d);
      }
    }
}
function wt(e) {
  if (typeof e != "object" || e === null || yt in e)
    return e;
  const t = Cr(e);
  if (t !== Ji && t !== Wi)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Vn(e), i = /* @__PURE__ */ B(0), s = at, a = (l) => {
    if (at === s)
      return l();
    var f = A, c = at;
    ve(null), kr(s);
    var d = l();
    return ve(f), kr(c), d;
  };
  return r && n.set("length", /* @__PURE__ */ B(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, f, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && os();
        var d = n.get(f);
        return d === void 0 ? a(() => {
          var v = /* @__PURE__ */ B(c.value);
          return n.set(f, v), v;
        }) : O(d, c.value, !0), !0;
      },
      deleteProperty(l, f) {
        var c = n.get(f);
        if (c === void 0) {
          if (f in l) {
            const d = a(() => /* @__PURE__ */ B(F));
            n.set(f, d), Bt(i);
          }
        } else
          O(c, F), Bt(i);
        return !0;
      },
      get(l, f, c) {
        var p;
        if (f === yt)
          return e;
        var d = n.get(f), v = f in l;
        if (d === void 0 && (!v || (p = zt(l, f)) != null && p.writable) && (d = a(() => {
          var h = wt(v ? l[f] : F), w = /* @__PURE__ */ B(h);
          return w;
        }), n.set(f, d)), d !== void 0) {
          var u = m(d);
          return u === F ? void 0 : u;
        }
        return Reflect.get(l, f, c);
      },
      getOwnPropertyDescriptor(l, f) {
        var c = Reflect.getOwnPropertyDescriptor(l, f);
        if (c && "value" in c) {
          var d = n.get(f);
          d && (c.value = m(d));
        } else if (c === void 0) {
          var v = n.get(f), u = v == null ? void 0 : v.v;
          if (v !== void 0 && u !== F)
            return {
              enumerable: !0,
              configurable: !0,
              value: u,
              writable: !0
            };
        }
        return c;
      },
      has(l, f) {
        var u;
        if (f === yt)
          return !0;
        var c = n.get(f), d = c !== void 0 && c.v !== F || Reflect.has(l, f);
        if (c !== void 0 || N !== null && (!d || (u = zt(l, f)) != null && u.writable)) {
          c === void 0 && (c = a(() => {
            var p = d ? wt(l[f]) : F, h = /* @__PURE__ */ B(p);
            return h;
          }), n.set(f, c));
          var v = m(c);
          if (v === F)
            return !1;
        }
        return d;
      },
      set(l, f, c, d) {
        var P;
        var v = n.get(f), u = f in l;
        if (r && f === "length")
          for (var p = c; p < /** @type {Source<number>} */
          v.v; p += 1) {
            var h = n.get(p + "");
            h !== void 0 ? O(h, F) : p in l && (h = a(() => /* @__PURE__ */ B(F)), n.set(p + "", h));
          }
        if (v === void 0)
          (!u || (P = zt(l, f)) != null && P.writable) && (v = a(() => /* @__PURE__ */ B(void 0)), O(v, wt(c)), n.set(f, v));
        else {
          u = v.v !== F;
          var w = a(() => wt(c));
          O(v, w);
        }
        var T = Reflect.getOwnPropertyDescriptor(l, f);
        if (T != null && T.set && T.set.call(d, c), !u) {
          if (r && typeof f == "string") {
            var x = (
              /** @type {Source<number>} */
              n.get("length")
            ), M = Number(f);
            Number.isInteger(M) && M >= x.v && O(x, M + 1);
          }
          Bt(i);
        }
        return !0;
      },
      ownKeys(l) {
        m(i);
        var f = Reflect.ownKeys(l).filter((v) => {
          var u = n.get(v);
          return u === void 0 || u.v !== F;
        });
        for (var [c, d] of n)
          d.v !== F && !(c in l) && f.push(c);
        return f;
      },
      setPrototypeOf() {
        as();
      }
    }
  );
}
function mr(e) {
  try {
    if (e !== null && typeof e == "object" && yt in e)
      return e[yt];
  } catch {
  }
  return e;
}
function Us(e, t) {
  return Object.is(mr(e), mr(t));
}
var Hn, ri, ii, si;
function zs() {
  if (Hn === void 0) {
    Hn = window, ri = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    ii = zt(t, "firstChild").get, si = zt(t, "nextSibling").get, _r(e) && (e[Pn] = void 0, e[on] = null, e[ns] = void 0, e.__e = void 0), _r(n) && (n[Lt] = void 0);
  }
}
function lt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function gn(e) {
  return (
    /** @type {TemplateNode | null} */
    ii.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
  return (
    /** @type {TemplateNode | null} */
    si.call(e)
  );
}
function W(e, t) {
  return /* @__PURE__ */ gn(e);
}
function yr(e, t = !1) {
  {
    var n = /* @__PURE__ */ gn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qt(n) : n;
  }
}
function R(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Qt(r);
  return r;
}
function Gs(e) {
  e.textContent = "";
}
function li() {
  return !1;
}
function Bs(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Vs(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function je(e, t) {
  var n = N;
  n !== null && (n.f & $) !== 0 && (e |= $);
  var r = {
    ctx: he,
    deps: null,
    nodes: null,
    f: e | H | ce,
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
  if ((e & Nt) !== 0)
    gt !== null ? gt.push(r) : ut.ensure().schedule(r);
  else if (t !== null) {
    try {
      Dt(r);
    } catch (a) {
      throw ee(r), a;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Rt) === 0 && (i = i.first, (e & be) !== 0 && (e & Mt) !== 0 && i !== null && (i.f |= Mt));
  }
  if (i !== null && (i.parent = n, n !== null && Vs(i, n), A !== null && (A.f & U) !== 0 && (e & Fe) === 0)) {
    var s = (
      /** @type {Derived} */
      A
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function Wn() {
  return A !== null && !ke;
}
function Xn(e) {
  const t = je(En, null);
  return q(t, j), t.teardown = e, t;
}
function Ks(e) {
  return je(Nt | es, e);
}
function Ys(e) {
  ut.ensure();
  const t = je(Fe | Rt, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? ot(t, () => {
      ee(t), r(void 0);
    }) : (ee(t), r(void 0));
  });
}
function $s(e) {
  return je(Nt, e);
}
function Js(e) {
  return je(mt | Rt, e);
}
function oi(e, t = 0) {
  return je(En | t, e);
}
function Je(e, t = [], n = [], r = []) {
  Is(r, t, n, (i) => {
    je(En, () => {
      e(...i.map(m));
    });
  });
}
function Zn(e, t = 0) {
  var n = je(be | t, e);
  return n;
}
function ue(e) {
  return je(Se | Rt, e);
}
function ai(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = dt, r = A;
    br(!0), ve(null);
    try {
      t.call(null);
    } finally {
      br(n), ve(r);
    }
  }
}
function Qn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Zt(() => {
      i.abort(Xt);
    });
    var r = n.next;
    (n.f & Fe) !== 0 ? n.parent = null : ee(n, t), n = r;
  }
}
function Ws(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Se) === 0 && ee(t), t = n;
  }
}
function ee(e, t = !0) {
  var n = !1;
  (t || (e.f & Qi) !== 0) && e.nodes !== null && e.nodes.end !== null && (Xs(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= Dn, Qn(e, t && !n), Vt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  ai(e), e.f ^= Dn, e.f |= de;
  var i = e.parent;
  i !== null && i.first !== null && fi(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Xs(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Qt(e);
    e.remove(), e = n;
  }
}
function fi(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function ot(e, t, n = !0) {
  var r = [];
  ui(e, r, !0);
  var i = () => {
    n && ee(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var a = () => --s || i();
    for (var l of r)
      l.out(a);
  } else
    i();
}
function ui(e, t, n) {
  if ((e.f & $) === 0) {
    e.f ^= $;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & Fe) === 0) {
        var a = (i.f & Mt) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & Se) !== 0 && (e.f & be) !== 0;
        ui(i, t, a ? n : !1);
      }
      i = s;
    }
  }
}
function wn(e) {
  ci(e, !0);
}
function ci(e, t) {
  if ((e.f & $) !== 0) {
    e.f ^= $, (e.f & j) === 0 && (q(e, H), ut.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Mt) !== 0 || (n.f & Se) !== 0;
      ci(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const a of s)
        (a.is_global || t) && a.in();
  }
}
function er(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Qt(n);
      t.append(n), n = i;
    }
}
let cn = !1, dt = !1;
function br(e) {
  dt = e;
}
let A = null, ke = !1;
function ve(e) {
  A = e;
}
let N = null;
function Oe(e) {
  N = e;
}
let Ie = null;
function Zs(e) {
  A !== null && (Ie ?? (Ie = /* @__PURE__ */ new Set())).add(e);
}
let Q = null, re = 0, le = null;
function Qs(e) {
  le = e;
}
let di = 1, Xe = 0, at = Xe;
function kr(e) {
  at = e;
}
function hi() {
  return ++di;
}
function en(e) {
  var t = e.f;
  if ((t & H) !== 0)
    return !0;
  if (t & U && (e.f &= ~ft), (t & Ee) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (en(
        /** @type {Derived} */
        s
      ) && $r(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & ce) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    z === null && q(e, j);
  }
  return !1;
}
function vi(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(Ie !== null && Ie.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & U) !== 0 ? vi(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? q(s, H) : (s.f & j) !== 0 && q(s, Ee), Jn(
        /** @type {Effect} */
        s
      ));
    }
}
function pi(e) {
  var w;
  var t = Q, n = re, r = le, i = A, s = Ie, a = he, l = ke, f = at, c = e.f;
  Q = /** @type {null | Value[]} */
  null, re = 0, le = null, A = (c & (Se | Fe)) === 0 ? e : null, Ie = null, It(e.ctx), ke = !1, at = ++Xe, e.ac !== null && (Zt(() => {
    e.ac.abort(Xt);
  }), e.ac = null);
  try {
    e.f |= vn;
    var d = (
      /** @type {Function} */
      e.fn
    ), v = d();
    e.f |= Pt;
    var u = e.deps, p = b == null ? void 0 : b.is_fork;
    if (Q !== null) {
      var h;
      if (p || Vt(e, re), u !== null && re > 0)
        for (u.length = re + Q.length, h = 0; h < Q.length; h++)
          u[re + h] = Q[h];
      else
        e.deps = u = Q;
      if (Wn() && (e.f & ce) !== 0)
        for (h = re; h < u.length; h++)
          ((w = u[h]).reactions ?? (w.reactions = [])).push(e);
    } else !p && u !== null && re < u.length && (Vt(e, re), u.length = re);
    if (zr() && le !== null && !ke && u !== null && (e.f & (U | Ee | H)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      le.length; h++)
        vi(
          le[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Xe++, i.deps !== null)
        for (let T = 0; T < n; T += 1)
          i.deps[T].rv = Xe;
      if (t !== null)
        for (const T of t)
          T.rv = Xe;
      le !== null && (r === null ? r = le : r.push(.../** @type {Source[]} */
      le));
    }
    return (e.f & Ke) !== 0 && (e.f ^= Ke), v;
  } catch (T) {
    return Gr(T);
  } finally {
    e.f ^= vn, Q = t, re = n, le = r, A = i, Ie = s, It(a), ke = l, at = f;
  }
}
function el(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Ki.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & U) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Q === null || !dn.call(Q, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & ce) !== 0 && (s.f ^= ce, s.f &= ~ft), s.v !== F && Kn(s), s.ac !== null && Zt(() => {
      s.ac.abort(Xt), s.ac = null;
    }), Cs(s), Vt(s, 0);
  }
}
function Vt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      el(e, n[r]);
}
function Dt(e) {
  var t = e.f;
  if ((t & de) === 0) {
    q(e, j);
    var n = N, r = cn;
    N = e, cn = (t & (Se | Fe)) === 0;
    try {
      (t & (be | Lr)) !== 0 ? Ws(e) : Qn(e), ai(e);
      var i = pi(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = di;
      var s;
    } finally {
      cn = r, N = n;
    }
  }
}
function m(e) {
  var t = e.f, n = (t & U) !== 0;
  if (A !== null && !ke) {
    var r = N !== null && (N.f & de) !== 0;
    if (!r && (Ie === null || !Ie.has(e))) {
      var i = A.deps;
      if ((A.f & vn) !== 0)
        e.rv < Xe && (e.rv = Xe, Q === null && i !== null && i[re] === e ? re++ : Q === null ? Q = [e] : Q.push(e));
      else {
        A.deps ?? (A.deps = []), dn.call(A.deps, e) || A.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [A] : dn.call(s, A) || s.push(A);
      }
    }
  }
  if (dt && st.has(e))
    return st.get(e);
  if (n) {
    var a = (
      /** @type {Derived} */
      e
    );
    if (dt) {
      var l = a.v;
      return ((a.f & j) === 0 && a.reactions !== null || gi(a)) && (l = Yn(a)), st.set(a, l), l;
    }
    var f = (a.f & ce) === 0 && !ke && A !== null && (cn || (A.f & ce) !== 0), c = (a.f & Pt) === 0;
    en(a) && (f && (a.f |= ce), $r(a)), f && !c && (Jr(a), _i(a));
  }
  if (z != null && z.has(e))
    return z.get(e);
  if ((e.f & Ke) !== 0)
    throw e.v;
  return e.v;
}
function _i(e) {
  if (e.f |= ce, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & U) !== 0 && (t.f & ce) === 0 && (Jr(
        /** @type {Derived} */
        t
      ), _i(
        /** @type {Derived} */
        t
      ));
}
function gi(e) {
  if (e.v === F) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (st.has(t) || (t.f & U) !== 0 && gi(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function wi(e) {
  var t = ke;
  try {
    return ke = !0, e();
  } finally {
    ke = t;
  }
}
const tl = ["touchstart", "touchmove"];
function nl(e) {
  return tl.includes(e);
}
const Ze = Symbol("events"), mi = /* @__PURE__ */ new Set(), Un = /* @__PURE__ */ new Set();
function rl(e, t, n, r = {}) {
  function i(s) {
    if (r.capture || zn.call(t, s), !s.cancelBubble)
      return Zt(() => n == null ? void 0 : n.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? it(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function Er(e, t, n, r, i) {
  var s = { capture: r, passive: i }, a = rl(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Xn(() => {
    t.removeEventListener(e, a, s);
  });
}
function K(e, t, n) {
  (t[Ze] ?? (t[Ze] = {}))[e] = n;
}
function il(e) {
  for (var t = 0; t < e.length; t++)
    mi.add(e[t]);
  for (var n of Un)
    n(e);
}
let Sr = null;
function zn(e) {
  var w, T;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((w = e.composedPath) == null ? void 0 : w.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Sr = e;
  var a = 0, l = Sr === e && e[Ze];
  if (l) {
    var f = i.indexOf(l);
    if (f !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ze] = t;
      return;
    }
    var c = i.indexOf(t);
    if (c === -1)
      return;
    f <= c && (a = f);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    Yi(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var d = A, v = N;
    ve(null), Oe(null);
    try {
      for (var u, p = []; s !== null && s !== t; ) {
        try {
          var h = (T = s[Ze]) == null ? void 0 : T[r];
          h != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && h.call(s, e);
        } catch (x) {
          u ? p.push(x) : u = x;
        }
        if (e.cancelBubble) break;
        a++, s = a < i.length ? (
          /** @type {Element} */
          i[a]
        ) : null;
      }
      if (u) {
        for (let x of p)
          queueMicrotask(() => {
            throw x;
          });
        throw u;
      }
    } finally {
      e[Ze] = t, delete e.currentTarget, ve(d), Oe(v);
    }
  }
}
var Pr;
const Mn = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Pr = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Pr.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function sl(e) {
  return (
    /** @type {string} */
    (Mn == null ? void 0 : Mn.createHTML(e)) ?? e
  );
}
function ll(e) {
  var t = Bs("template");
  return t.innerHTML = sl(e.replaceAll("<!>", "<!---->")), t.content;
}
function Tr(e, t) {
  var n = (
    /** @type {Effect} */
    N
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Te(e, t) {
  var n = (t & vs) !== 0, r = (t & ps) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = ll(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ gn(i)));
    var a = (
      /** @type {TemplateNode} */
      r || ri ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ gn(a)
      ), f = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      Tr(l, f);
    } else
      Tr(a, a);
    return a;
  };
}
function ge(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function rn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Lt] ?? (e[Lt] = e.nodeValue)) && (e[Lt] = n, e.nodeValue = `${n}`);
}
function ol(e, t) {
  return al(e, t);
}
const sn = /* @__PURE__ */ new Map();
function al(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: a = !0, transformError: l }) {
  zs();
  var f = void 0, c = Ys(() => {
    var d = n ?? t.appendChild(lt());
    Ts(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (p) => {
        Hr({});
        var h = (
          /** @type {ComponentContext} */
          he
        );
        s && (h.c = s), i && (r.$$events = i), f = e(p, r) || {}, Ur();
      },
      l
    );
    var v = /* @__PURE__ */ new Set(), u = (p) => {
      for (var h = 0; h < p.length; h++) {
        var w = p[h];
        if (!v.has(w)) {
          v.add(w);
          var T = nl(w);
          for (const P of [t, document]) {
            var x = sn.get(P);
            x === void 0 && (x = /* @__PURE__ */ new Map(), sn.set(P, x));
            var M = x.get(w);
            M === void 0 ? (P.addEventListener(w, zn, { passive: T }), x.set(w, 1)) : x.set(w, M + 1);
          }
        }
      }
    };
    return u(kn(mi)), Un.add(u), () => {
      var T;
      for (var p of v)
        for (const x of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            sn.get(x)
          ), w = (
            /** @type {number} */
            h.get(p)
          );
          --w == 0 ? (x.removeEventListener(p, zn), h.delete(p), h.size === 0 && sn.delete(x)) : h.set(p, w);
        }
      Un.delete(u), d !== n && ((T = d.parentNode) == null || T.removeChild(d));
    };
  });
  return fl.set(f, c), f;
}
let fl = /* @__PURE__ */ new WeakMap();
var ye, Me, se, rt, Jt, Wt, bn;
class ul {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    ne(this, "anchor");
    /** @type {Map<Batch, Key>} */
    k(this, ye, /* @__PURE__ */ new Map());
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
    k(this, Me, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    k(this, se, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    k(this, rt, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    k(this, Jt, !0);
    /**
     * @param {Batch} batch
     */
    k(this, Wt, (t) => {
      if (o(this, ye).has(t)) {
        var n = (
          /** @type {Key} */
          o(this, ye).get(t)
        ), r = o(this, Me).get(n);
        if (r)
          wn(r), o(this, rt).delete(n);
        else {
          var i = o(this, se).get(n);
          i && (wn(i.effect), o(this, Me).set(n, i.effect), o(this, se).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, a] of o(this, ye)) {
          if (o(this, ye).delete(s), s === t)
            break;
          const l = o(this, se).get(a);
          l && (ee(l.effect), o(this, se).delete(a));
        }
        for (const [s, a] of o(this, Me)) {
          if (s === n || o(this, rt).has(s)) continue;
          const l = () => {
            if (Array.from(o(this, ye).values()).includes(s)) {
              var c = document.createDocumentFragment();
              er(a, c), c.append(lt()), o(this, se).set(s, { effect: a, fragment: c });
            } else
              ee(a);
            o(this, rt).delete(s), o(this, Me).delete(s);
          };
          o(this, Jt) || !r ? (o(this, rt).add(s), ot(a, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    k(this, bn, (t) => {
      o(this, ye).delete(t);
      const n = Array.from(o(this, ye).values());
      for (const [r, i] of o(this, se))
        n.includes(r) || (ee(i.effect), o(this, se).delete(r));
    });
    this.anchor = t, y(this, Jt, n);
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
    ), i = li();
    if (n && !o(this, Me).has(t) && !o(this, se).has(t))
      if (i) {
        var s = document.createDocumentFragment(), a = lt();
        s.append(a), o(this, se).set(t, {
          effect: ue(() => n(a)),
          fragment: s
        });
      } else
        o(this, Me).set(
          t,
          ue(() => n(this.anchor))
        );
    if (o(this, ye).set(r, t), i) {
      for (const [l, f] of o(this, Me))
        l === t ? r.unskip_effect(f) : r.skip_effect(f);
      for (const [l, f] of o(this, se))
        l === t ? r.unskip_effect(f.effect) : r.skip_effect(f.effect);
      r.oncommit(o(this, Wt)), r.ondiscard(o(this, bn));
    } else
      o(this, Wt).call(this, r);
  }
}
ye = new WeakMap(), Me = new WeakMap(), se = new WeakMap(), rt = new WeakMap(), Jt = new WeakMap(), Wt = new WeakMap(), bn = new WeakMap();
function We(e, t, n = !1) {
  var r = new ul(e), i = n ? Mt : 0;
  function s(a, l) {
    r.ensure(a, l);
  }
  Zn(() => {
    var a = !1;
    t((l, f = 0) => {
      a = !0, s(f, l);
    }), a || s(-1, null);
  }, i);
}
function cl(e, t) {
  return t;
}
function dl(e, t, n) {
  for (var r = [], i = t.length, s, a = t.length, l = 0; l < i; l++) {
    let v = t[l];
    ot(
      v,
      () => {
        if (s) {
          if (s.pending.delete(v), s.done.add(v), s.pending.size === 0) {
            var u = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Gn(e, kn(s.done)), u.delete(s), u.size === 0 && (e.outrogroups = null);
          }
        } else
          a -= 1;
      },
      !1
    );
  }
  if (a === 0) {
    var f = r.length === 0 && n !== null;
    if (f) {
      var c = (
        /** @type {Element} */
        n
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      Gs(d), d.append(c), e.items.clear();
    }
    Gn(e, t, !f);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Gn(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const a of e.pending.values())
      for (const l of a)
        r.add(
          /** @type {EachItem} */
          e.items.get(l).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= Le;
      const a = document.createDocumentFragment();
      er(s, a);
    } else
      ee(t[i], n);
  }
}
var xr;
function hl(e, t, n, r, i, s = null) {
  var a = e, l = /* @__PURE__ */ new Map();
  {
    var f = (
      /** @type {Element} */
      e
    );
    a = f.appendChild(lt());
  }
  var c = null, d = /* @__PURE__ */ Ps(() => {
    var M = n();
    return (
      /** @type {V[]} */
      Vn(M) ? M : M == null ? [] : kn(M)
    );
  }), v, u = /* @__PURE__ */ new Map(), p = !0;
  function h(M) {
    (x.effect.f & de) === 0 && (x.pending.delete(M), x.fallback = c, vl(x, v, a, t, r), c !== null && (v.length === 0 ? (c.f & Le) === 0 ? wn(c) : (c.f ^= Le, Ut(c, null, a)) : ot(c, () => {
      c = null;
    })));
  }
  function w(M) {
    x.pending.delete(M);
  }
  var T = Zn(() => {
    v = /** @type {V[]} */
    m(d);
    for (var M = v.length, P = /* @__PURE__ */ new Set(), te = (
      /** @type {Batch} */
      b
    ), xe = li(), pe = 0; pe < M; pe += 1) {
      var Ye = v[pe], De = r(Ye, pe), L = p ? null : l.get(De);
      L ? (L.v && Ot(L.v, Ye), L.i && Ot(L.i, pe), xe && te.unskip_effect(L.e)) : (L = pl(
        l,
        p ? a : xr ?? (xr = lt()),
        Ye,
        De,
        pe,
        i,
        t,
        n
      ), p || (L.e.f |= Le), l.set(De, L)), P.add(De);
    }
    if (M === 0 && s && !c && (p ? c = ue(() => s(a)) : (c = ue(() => s(xr ?? (xr = lt()))), c.f |= Le)), M > P.size && ss(), !p)
      if (u.set(te, P), xe) {
        for (const [tn, nn] of l)
          P.has(tn) || te.skip_effect(nn.e);
        te.oncommit(h), te.ondiscard(w);
      } else
        h(te);
    m(d);
  }), x = { effect: T, items: l, pending: u, outrogroups: null, fallback: c };
  p = !1;
}
function qt(e) {
  for (; e !== null && (e.f & Se) === 0; )
    e = e.next;
  return e;
}
function vl(e, t, n, r, i) {
  var De;
  var s = t.length, a = e.items, l = qt(e.effect.first), f, c = null, d = [], v = [], u, p, h, w;
  for (w = 0; w < s; w += 1) {
    if (u = t[w], p = i(u, w), h = /** @type {EachItem} */
    a.get(p).e, e.outrogroups !== null)
      for (const L of e.outrogroups)
        L.pending.delete(h), L.done.delete(h);
    if ((h.f & $) !== 0 && wn(h), (h.f & Le) !== 0)
      if (h.f ^= Le, h === l)
        Ut(h, null, n);
      else {
        var T = c ? c.next : l;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), ze(e, c, h), ze(e, h, T), Ut(h, T, n), c = h, d = [], v = [], l = qt(c.next);
        continue;
      }
    if (h !== l) {
      if (f !== void 0 && f.has(h)) {
        if (d.length < v.length) {
          var x = v[0], M;
          c = x.prev;
          var P = d[0], te = d[d.length - 1];
          for (M = 0; M < d.length; M += 1)
            Ut(d[M], x, n);
          for (M = 0; M < v.length; M += 1)
            f.delete(v[M]);
          ze(e, P.prev, te.next), ze(e, c, P), ze(e, te, x), l = x, c = te, w -= 1, d = [], v = [];
        } else
          f.delete(h), Ut(h, l, n), ze(e, h.prev, h.next), ze(e, h, c === null ? e.effect.first : c.next), ze(e, c, h), c = h;
        continue;
      }
      for (d = [], v = []; l !== null && l !== h; )
        (f ?? (f = /* @__PURE__ */ new Set())).add(l), v.push(l), l = qt(l.next);
      if (l === null)
        continue;
    }
    (h.f & Le) === 0 && d.push(h), c = h, l = qt(h.next);
  }
  if (e.outrogroups !== null) {
    for (const L of e.outrogroups)
      L.pending.size === 0 && (Gn(e, kn(L.done)), (De = e.outrogroups) == null || De.delete(L));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || f !== void 0) {
    var xe = [];
    if (f !== void 0)
      for (h of f)
        (h.f & $) === 0 && xe.push(h);
    for (; l !== null; )
      (l.f & $) === 0 && l !== e.fallback && xe.push(l), l = qt(l.next);
    var pe = xe.length;
    if (pe > 0) {
      var Ye = s === 0 ? n : null;
      dl(e, xe, Ye);
    }
  }
}
function pl(e, t, n, r, i, s, a, l) {
  var f = (a & cs) !== 0 ? (a & hs) === 0 ? /* @__PURE__ */ js(n, !1, !1) : ct(n) : null, c = (a & ds) !== 0 ? ct(i) : null;
  return {
    v: f,
    i: c,
    e: ue(() => (s(t, f ?? n, c ?? i, l), () => {
      e.delete(r);
    }))
  };
}
function Ut(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & Le) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Qt(r)
      );
      if (s.before(r), r === i)
        return;
      r = a;
    }
}
function ze(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Ar = [...` 	
\r\f \v\uFEFF`];
function _l(e, t, n) {
  var r = "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, a = 0; (a = r.indexOf(i, a)) >= 0; ) {
          var l = a + s;
          (a === 0 || Ar.includes(r[a - 1])) && (l === r.length || Ar.includes(r[l])) ? r = (a === 0 ? "" : r.substring(0, a)) + r.substring(l + 1) : a = l;
        }
  }
  return r === "" ? null : r;
}
function gl(e, t, n, r, i, s) {
  var a = (
    /** @type {any} */
    e[Pn]
  );
  if (a !== n || a === void 0) {
    var l = _l(n, r, s);
    l == null ? e.removeAttribute("class") : e.className = l, e[Pn] = n;
  } else if (s && i !== s)
    for (var f in s) {
      var c = !!s[f];
      (i == null || c !== !!i[f]) && e.classList.toggle(f, c);
    }
  return s;
}
function yi(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Vn(t))
      return ws();
    for (var r of e.options)
      r.selected = t.includes(Nr(r));
    return;
  }
  for (r of e.options) {
    var i = Nr(r);
    if (Us(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function wl(e) {
  var t = new MutationObserver(() => {
    yi(e, e.__value);
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
  }), Xn(() => {
    t.disconnect();
  });
}
function Nr(e) {
  return "__value" in e ? e.__value : e.value;
}
const ml = Symbol("is custom element"), yl = Symbol("is html"), bl = rs ? "progress" : "PROGRESS";
function Mr(e, t) {
  var n = tr(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== bl) || (e.value = t ?? "");
}
function kl(e, t) {
  var n = tr(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function ln(e, t, n, r) {
  var i = tr(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[ts] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && El(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function tr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[on] ?? (e[on] = {
      [ml]: e.nodeName.includes("-"),
      [yl]: e.namespaceURI === _s
    })
  );
}
var Ir = /* @__PURE__ */ new Map();
function El(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Ir.get(t);
  if (n) return n;
  Ir.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = $i(i);
    for (var a in r)
      r[a].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      a !== "innerHTML" && a !== "textContent" && a !== "innerText" && n.push(a);
    i = Cr(i);
  }
  return n;
}
function In(e, t) {
  return e === t || (e == null ? void 0 : e[yt]) === t;
}
function Sl(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    he.r
  ), s = (
    /** @type {Effect} */
    N
  );
  return $s(() => {
    var a, l;
    return oi(() => {
      a = l, l = [], wi(() => {
        In(n(...l), e) || (t(e, ...l), a && In(n(...a), e) && t(null, ...a));
      });
    }), () => {
      let f = s;
      for (; f !== i && f.parent !== null && f.parent.f & Dn; )
        f = f.parent;
      const c = () => {
        l && In(n(...l), e) && t(null, ...l);
      }, d = f.teardown;
      f.teardown = () => {
        c(), d == null || d();
      };
    };
  }), e;
}
const Tl = "5";
var Rr;
typeof window < "u" && ((Rr = window.__svelte ?? (window.__svelte = {})).v ?? (Rr.v = /* @__PURE__ */ new Set())).add(Tl);
function Or(e, t) {
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
function xl(e, t = {}) {
  const n = (i) => {
    var a, l, f, c, d, v, u, p;
    if (i.origin !== location.origin) return;
    const s = i.data;
    (s == null ? void 0 : s.type) === "urd-edit" && ((a = t.onEdit) == null || a.call(t, s)), (s == null ? void 0 : s.type) === "urd-move" && ((l = t.onMove) == null || l.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete" && ((f = t.onDelete) == null || f.call(t, s)), (s == null ? void 0 : s.type) === "urd-add-section" && ((c = t.onAddSection) == null || c.call(t, s)), (s == null ? void 0 : s.type) === "urd-move-section" && ((d = t.onMoveSection) == null || d.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete-section" && ((v = t.onDeleteSection) == null || v.call(t, s)), (s == null ? void 0 : s.type) === "urd-section-size" && ((u = t.onSectionSize) == null || u.call(t, s)), (s == null ? void 0 : s.type) === "urd-undo" && ((p = t.onUndo) == null || p.call(t, s));
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
var Al = /* @__PURE__ */ Te('<button class="chrome-restore svelte-1n46o8q" title="Tilbake til redigering">✏ Rediger</button>'), Nl = /* @__PURE__ */ Te("<option> </option>"), Ml = /* @__PURE__ */ Te('<select class="svelte-1n46o8q"></select>'), Il = /* @__PURE__ */ Te('<span class="palette svelte-1n46o8q"><button class="ghost svelte-1n46o8q" title="Ny tekstblokk">+ Tekst</button> <button class="ghost svelte-1n46o8q" title="Ny knapp">+ Knapp</button> <details class="gridmenu svelte-1n46o8q"><summary title="Ny form" class="svelte-1n46o8q">+ Form</summary> <div class="gridmenu-body formmenu svelte-1n46o8q"><button class="ghost svelte-1n46o8q">─ Strek</button> <button class="ghost svelte-1n46o8q">→ Pil</button> <button class="ghost svelte-1n46o8q">○ Sirkel</button> <button class="ghost svelte-1n46o8q">▭ Rektangel</button> <button class="ghost svelte-1n46o8q">△ Trekant</button></div></details></span> <details class="gridmenu svelte-1n46o8q"><summary title="Grid-innstillinger (gjelder hele nettstedet, publiseres med site.json)" class="svelte-1n46o8q">⌗ Grid</summary> <div class="gridmenu-body svelte-1n46o8q"><label class="svelte-1n46o8q">Kolonner <input type="number" min="4" max="100" class="svelte-1n46o8q"/></label> <label class="svelte-1n46o8q">Radhøyde (px) <input type="number" min="2" max="64" class="svelte-1n46o8q"/></label> <label class="gridmenu-snap svelte-1n46o8q"><input type="checkbox"/> Snap til grid</label> <p class="gridmenu-hint svelte-1n46o8q">Gridet vises mens du drar. Flere kolonner og lavere radhøyde gir finere plassering.</p></div></details>', 1), Ol = /* @__PURE__ */ Te('<span class="badge svelte-1n46o8q">Upubliserte endringer</span>'), Dl = /* @__PURE__ */ Te('<span class="who svelte-1n46o8q"> </span>'), Pl = /* @__PURE__ */ Te('<a class="ghost svelte-1n46o8q" href="/api/github/login">Logg inn med GitHub</a>'), Rl = /* @__PURE__ */ Te('<button class="ghost svelte-1n46o8q"> </button> <!> <a class="ghost svelte-1n46o8q" target="_blank" rel="noopener">Se siden ↗</a> <button class="ghost svelte-1n46o8q">Forkast utkast</button> <button class="primary svelte-1n46o8q">Publiser</button>', 1), Cl = /* @__PURE__ */ Te('<iframe title="Forhåndsvisning" class="svelte-1n46o8q"></iframe>'), ql = /* @__PURE__ */ Te('<p class="loading svelte-1n46o8q">Laster…</p>'), Ll = /* @__PURE__ */ Te('<div class="editor svelte-1n46o8q"><!> <header><strong class="brand svelte-1n46o8q">Urd</strong> <!> <!> <!> <span class="status svelte-1n46o8q"> </span> <span class="spacer svelte-1n46o8q"></span> <!></header> <!></div>');
function Fl(e, t) {
  Hr(t, !0);
  let n = /* @__PURE__ */ B(null), r = /* @__PURE__ */ B(null), i = /* @__PURE__ */ B(!1), s = /* @__PURE__ */ B(""), a = /* @__PURE__ */ B(null), l = /* @__PURE__ */ B(null), f = /* @__PURE__ */ B(wt({ columns: 24, rowHeight: 8, snap: !0 })), c = /* @__PURE__ */ B(!0), d = null, v = null, u = null;
  const p = () => m(n).pages.find((_) => _.id === m(r));
  function h() {
    O(i, (d == null ? void 0 : d.hasDraft()) || (v == null ? void 0 : v.hasDraft()) || !1, !0);
  }
  const w = [], T = [];
  let x = null;
  function M() {
    return JSON.stringify({ page: d.data, site: v.data });
  }
  function P(_) {
    _ === x && (_.startsWith("edit:") || _ === "grid") || (w.push(M()), w.length > 50 && w.shift(), T.length = 0, x = _);
  }
  function te(_) {
    const { page: g, site: S } = JSON.parse(_);
    d.replace(g), v.replace(S), d.save(), v.save(), O(f, { snap: !0, ...v.data.grid }, !0), h(), u == null || u.sendSite(v.data), u == null || u.sendPage(m(r), d.data);
  }
  function xe() {
    w.length && (T.push(M()), te(w.pop()), x = null, O(s, "Angret"));
  }
  function pe() {
    T.length && (w.push(M()), te(T.pop()), x = null, O(s, "Gjentatt"));
  }
  function Ye(_) {
    if (!(_.ctrlKey || _.metaKey) || _.key.toLowerCase() !== "z") return;
    const g = _.target;
    g instanceof HTMLElement && (g.isContentEditable || g.tagName === "INPUT" || g.tagName === "TEXTAREA" || g.tagName === "SELECT") || (_.preventDefault(), _.shiftKey ? pe() : xe());
  }
  async function De() {
    O(n, await (await fetch("/content/site.json")).json(), !0), v = Or("urd-draft-site", () => m(n)), O(f, { snap: !0, ...v.data.grid }, !0), await nn(new URLSearchParams(location.search).get("page") ?? m(n).pages[0].id), await tn();
  }
  function L(_, g) {
    P("grid"), O(f, { ...m(f), [_]: g }, !0), v.data.grid = { ...v.data.grid, [_]: g }, v.save(), h(), u == null || u.sendSite(v.data);
  }
  async function tn() {
    try {
      const _ = await fetch("/api/github/me");
      O(l, _.ok ? await _.json() : null, !0);
    } catch {
      O(l, null);
    }
  }
  async function nn(_) {
    O(r, _, !0);
    const g = p(), S = await (await fetch(`/${g.file}`)).json();
    d = Or(`urd-draft-${_}`, () => S), w.length = 0, T.length = 0, x = null, h(), O(s, "");
  }
  function bi() {
    u == null || u.destroy(), u = xl(m(a), {
      onEdit: ki,
      onMove: Ei,
      onDelete: Ni,
      onAddSection: Si,
      onMoveSection: Ti,
      onDeleteSection: xi,
      onSectionSize: Ai,
      onUndo: (_) => _.redo ? pe() : xe()
    }), v.hasDraft() && u.sendSite(v.data), d.hasDraft() && u.sendPage(m(r), d.data), m(c) || u.sendChrome(!1);
  }
  function nr() {
    O(c, !m(c)), u == null || u.sendChrome(m(c));
  }
  function ki(_) {
    const g = d.data.sections.find((E) => E.id === _.sectionId), S = g == null ? void 0 : g.blocks.find((E) => E.id === _.blockId);
    S && (P(`edit:${_.blockId}`), S.props = _.props, d.save(), h(), O(s, ""));
  }
  function Ei(_) {
    const g = d.data.sections.find((E) => E.id === _.sectionId), S = g == null ? void 0 : g.blocks.find((E) => E.id === _.blockId);
    S && (P("move-block"), S.frames.desktop = _.frame, d.save(), h());
  }
  function Si(_) {
    P("add-section"), d.data.sections.splice(_.index, 0, _.section), d.save(), h(), u == null || u.sendPage(m(r), d.data);
  }
  function Ti(_) {
    const g = d.data.sections, S = g.findIndex((G) => G.id === _.sectionId), E = S + _.dir;
    S < 0 || E < 0 || E >= g.length || (P("move-section"), [g[S], g[E]] = [g[E], g[S]], d.save(), h(), u == null || u.sendPage(m(r), d.data));
  }
  function xi(_) {
    P("delete-section"), d.data.sections = d.data.sections.filter((g) => g.id !== _.sectionId), d.save(), h(), u == null || u.sendPage(m(r), d.data);
  }
  function Ai(_) {
    const g = d.data.sections.find((S) => S.id === _.sectionId);
    g && (P("section-size"), g.size = { ...g.size, minHeight: _.minHeight }, d.save(), h());
  }
  function Ni(_) {
    const g = d.data.sections.find((S) => S.id === _.sectionId);
    g && (P("delete-block"), g.blocks = g.blocks.filter((S) => S.id !== _.blockId), d.save(), h(), u == null || u.sendSection(m(r), g));
  }
  const Mi = {
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
    "shape-arrow": {
      type: "shape",
      props: { kind: "arrow", color: "accent", thickness: 2, fill: null },
      w: 6,
      h: 2
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
    },
    "shape-triangle": {
      type: "shape",
      props: { kind: "triangle", color: "accent", thickness: 2, fill: null },
      w: 4,
      h: 4
    }
  };
  function $e(_, g) {
    var J;
    P("add-block");
    const S = d.data.sections[0], E = Mi[_], G = Math.max(0, ...S.blocks.map((He) => He.frames.desktop.y + He.frames.desktop.h));
    S.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: E.type,
      version: 1,
      props: structuredClone(E.props),
      animation: null,
      frames: {
        desktop: { x: 1, y: G + 1, w: E.w, h: E.h, z: 1, rot: 0 },
        mobile: null
      }
    }), d.save(), h(), u == null || u.sendSection(m(r), S), (J = g == null ? void 0 : g.target.closest("details")) == null || J.removeAttribute("open");
  }
  function Ii() {
    P("discard");
    const _ = d.reset(), g = v.reset();
    O(f, { snap: !0, ...g.grid }, !0), h(), O(s, ""), u == null || u.sendSite(g), u == null || u.sendPage(m(r), _);
  }
  async function Oi() {
    var G, J;
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
    const S = { message: `Oppdater ${_.title} via Urd-admin`, files: g };
    let E = null;
    try {
      E = await fetch("/api/github/commit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(S)
      });
    } catch {
    }
    E != null && E.ok ? (localStorage.removeItem(`urd-draft-${m(r)}`), localStorage.removeItem("urd-draft-site"), O(s, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), O(i, !1)) : (E == null ? void 0 : E.status) === 401 ? (O(s, "Du må logge inn med GitHub for å publisere."), await tn()) : (E == null ? void 0 : E.status) === 403 ? O(s, ((G = await E.json().catch(() => null)) == null ? void 0 : G.error) ?? "Du har ikke publiseringstilgang.", !0) : E ? O(s, ((J = await E.json().catch(() => null)) == null ? void 0 : J.error) ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : O(s, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
  }
  De();
  var rr = Ll();
  Er("keydown", Hn, Ye);
  var ir = W(rr);
  {
    var Di = (_) => {
      var g = Al();
      K("click", g, nr), ge(_, g);
    };
    We(ir, (_) => {
      m(c) || _(Di);
    });
  }
  var Sn = R(ir, 2);
  let sr;
  var lr = R(W(Sn), 2);
  {
    var Pi = (_) => {
      var g = Ml();
      hl(g, 21, () => m(n).pages, cl, (E, G) => {
        var J = Nl(), He = W(J), Ue = {};
        Je(() => {
          rn(He, m(G).title), Ue !== (Ue = m(G).id) && (J.value = (J.__value = m(G).id) ?? "");
        }), ge(E, J);
      });
      var S;
      wl(g), Je(() => {
        S !== (S = m(r)) && (g.value = (g.__value = m(r)) ?? "", yi(g, m(r)));
      }), K("change", g, (E) => nn(E.target.value)), ge(_, g);
    };
    We(lr, (_) => {
      m(n) && _(Pi);
    });
  }
  var or = R(lr, 2);
  {
    var Ri = (_) => {
      var g = Il(), S = yr(g), E = W(S), G = R(E, 2), J = R(G, 2), He = R(W(J), 2), Ue = W(He), ht = R(Ue, 2), Ct = R(ht, 2), _e = R(Ct, 2), Ae = R(_e, 2), Tn = R(S, 2), zi = R(W(Tn), 2), ur = W(zi), cr = R(W(ur)), dr = R(ur, 2), hr = R(W(dr)), Gi = R(dr, 2), vr = W(Gi);
      Je(() => {
        Mr(cr, m(f).columns), Mr(hr, m(f).rowHeight), kl(vr, m(f).snap !== !1);
      }), K("click", E, () => $e("text")), K("click", G, () => $e("button")), K("click", Ue, (V) => $e("shape-line", V)), K("click", ht, (V) => $e("shape-arrow", V)), K("click", Ct, (V) => $e("shape-circle", V)), K("click", _e, (V) => $e("shape-rect", V)), K("click", Ae, (V) => $e("shape-triangle", V)), K("change", cr, (V) => L("columns", Math.max(4, Math.min(100, Number(V.target.value) || 24)))), K("change", hr, (V) => L("rowHeight", Math.max(2, Math.min(64, Number(V.target.value) || 8)))), K("change", vr, (V) => L("snap", V.target.checked)), ge(_, g);
    };
    We(or, (_) => {
      m(n) && _(Ri);
    });
  }
  var ar = R(or, 2);
  {
    var Ci = (_) => {
      var g = Ol();
      ge(_, g);
    };
    We(ar, (_) => {
      m(i) && _(Ci);
    });
  }
  var fr = R(ar, 2), qi = W(fr), Li = R(fr, 4);
  {
    var Fi = (_) => {
      var g = Rl(), S = yr(g), E = W(S), G = R(S, 2);
      {
        var J = (_e) => {
          var Ae = Dl(), Tn = W(Ae);
          Je(() => {
            ln(Ae, "title", m(l).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), rn(Tn, `${m(l).allowed ? "" : "⚠ "}${m(l).login ?? ""}`);
          }), ge(_e, Ae);
        }, He = (_e) => {
          var Ae = Pl();
          ge(_e, Ae);
        };
        We(G, (_e) => {
          var Ae;
          (Ae = m(l)) != null && Ae.loggedIn ? _e(J) : m(l) && _e(He, 1);
        });
      }
      var Ue = R(G, 2), ht = R(Ue, 2), Ct = R(ht, 2);
      Je(
        (_e) => {
          ln(S, "title", m(c) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), rn(E, m(c) ? "👁 Ren visning" : "✏ Rediger"), ln(Ue, "href", _e), ht.disabled = !m(i), Ct.disabled = !m(i);
        },
        [() => p().path]
      ), K("click", S, nr), K("click", ht, Ii), K("click", Ct, Oi), ge(_, g);
    };
    We(Li, (_) => {
      m(n) && _(Fi);
    });
  }
  var ji = R(Sn, 2);
  {
    var Hi = (_) => {
      var g = Cl();
      Sl(g, (S) => O(a, S), () => m(a)), Je(() => ln(g, "src", `/?page=${m(r)}&preview=1`)), Er("load", g, bi), ge(_, g);
    }, Ui = (_) => {
      var g = ql();
      ge(_, g);
    };
    We(ji, (_) => {
      m(n) ? _(Hi) : _(Ui, -1);
    });
  }
  Je(() => {
    sr = gl(Sn, 1, "topbar svelte-1n46o8q", null, sr, { hidden: !m(c) }), rn(qi, m(s));
  }), ge(e, rr), Ur();
}
il(["click", "change"]);
const Ul = ol(Fl, { target: document.getElementById("urd-admin") });
export {
  Ul as default
};
