var Ji = Object.defineProperty;
var mr = (e) => {
  throw TypeError(e);
};
var Wi = (e, t, n) => t in e ? Ji(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ne = (e, t, n) => Wi(e, typeof t != "symbol" ? t + "" : t, n), Tn = (e, t, n) => t.has(e) || mr("Cannot " + n);
var a = (e, t, n) => (Tn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), S = (e, t, n) => t.has(e) ? mr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), y = (e, t, n, r) => (Tn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), I = (e, t, n) => (Tn(e, t, "access private method"), n);
var Kn = Array.isArray, Xi = Array.prototype.indexOf, dn = Array.prototype.includes, kn = Array.from, Zi = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, Qi = Object.getOwnPropertyDescriptors, es = Object.prototype, ts = Array.prototype, jr = Object.getPrototypeOf, yr = Object.isExtensible;
const ns = () => {
};
function rs(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Hr() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const U = 2, Mt = 4, Sn = 8, Gr = 1 << 24, be = 16, Ee = 32, Fe = 64, Pn = 128, ce = 512, H = 1024, G = 2048, Se = 4096, J = 8192, de = 16384, Dt = 32768, Dn = 1 << 25, Nt = 65536, hn = 1 << 17, is = 1 << 18, Rt = 1 << 19, ss = 1 << 20, Le = 1 << 25, ft = 65536, vn = 1 << 21, mt = 1 << 22, Ke = 1 << 23, yt = Symbol("$state"), ls = Symbol(""), on = Symbol("attributes"), Rn = Symbol("class"), os = Symbol("style"), jt = Symbol("text"), Qt = new class extends Error {
  constructor() {
    super(...arguments);
    ne(this, "name", "StaleReactionError");
    ne(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var qr;
const as = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((qr = globalThis.document) != null && qr.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function fs() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function us(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function cs() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ds() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function hs() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function vs() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ps() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const _s = 1, gs = 2, ws = 16, ms = 1, ys = 2, j = Symbol("uninitialized"), bs = "http://www.w3.org/1999/xhtml";
function ks() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Ss() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Es() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ur(e) {
  return e === this.v;
}
function xs(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function zr(e) {
  return !xs(e, this.v);
}
let he = null;
function It(e) {
  he = e;
}
function Br(e, t = !1, n) {
  he = {
    p: he,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      M
    ),
    l: null
  };
}
function Vr(e) {
  var t = (
    /** @type {ComponentContext} */
    he
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Xs(r);
  }
  return t.i = !0, he = t.p, /** @type {T} */
  {};
}
function Kr() {
  return !0;
}
let _t = [];
function Ts() {
  var e = _t;
  _t = [], rs(e);
}
function it(e) {
  if (_t.length === 0) {
    var t = _t;
    queueMicrotask(() => {
      t === _t && Ts();
    });
  }
  _t.push(e);
}
function $r(e) {
  var t = M;
  if (t === null)
    return A.f |= Ke, e;
  if ((t.f & Dt) === 0 && (t.f & Mt) === 0)
    throw e;
  Ve(e, t);
}
function Ve(e, t) {
  if (!(t !== null && (t.f & de) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & Pn) !== 0) {
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
const As = -7169;
function q(e, t) {
  e.f = e.f & As | t;
}
function $n(e) {
  (e.f & ce) !== 0 || e.deps === null ? q(e, H) : q(e, Se);
}
function Yr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & U) === 0 || (t.f & ft) === 0 || (t.f ^= ft, Yr(
        /** @type {Derived} */
        t.deps
      ));
}
function Jr(e, t, n) {
  (e.f & G) !== 0 ? t.add(e) : (e.f & Se) !== 0 && n.add(e), Yr(e.deps), q(e, H);
}
function en(e) {
  var t = A, n = M;
  ve(null), Oe(null);
  try {
    return e();
  } finally {
    ve(t), Oe(n);
  }
}
function Ms(e) {
  let t = 0, n = ct(0), r;
  return () => {
    Xn() && (m(n), ci(() => (t === 0 && (r = ki(() => e(() => Kt(n)))), t += 1, () => {
      it(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Kt(n));
      });
    })));
  };
}
var Ns = Nt | Rt;
function Is(e, t, n, r) {
  new Os(e, t, n, r);
}
var oe, Vn, ae, Qe, X, fe, Y, ie, De, et, ze, bt, Yt, Jt, Re, mn, C, Ps, Ds, Rs, Cn, an, fn, qn, Ln;
class Os {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    S(this, C);
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
    S(this, oe);
    /** @type {TemplateNode | null} */
    S(this, Vn, null);
    /** @type {BoundaryProps} */
    S(this, ae);
    /** @type {((anchor: Node) => void)} */
    S(this, Qe);
    /** @type {Effect} */
    S(this, X);
    /** @type {Effect | null} */
    S(this, fe, null);
    /** @type {Effect | null} */
    S(this, Y, null);
    /** @type {Effect | null} */
    S(this, ie, null);
    /** @type {DocumentFragment | null} */
    S(this, De, null);
    S(this, et, 0);
    S(this, ze, 0);
    S(this, bt, !1);
    /** @type {Set<Effect>} */
    S(this, Yt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    S(this, Jt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    S(this, Re, null);
    S(this, mn, Ms(() => (y(this, Re, ct(a(this, et))), () => {
      y(this, Re, null);
    })));
    var s;
    y(this, oe, t), y(this, ae, n), y(this, Qe, (o) => {
      var l = (
        /** @type {Effect} */
        M
      );
      l.b = this, l.f |= Pn, r(o);
    }), this.parent = /** @type {Effect} */
    M.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((o) => o), y(this, X, Qn(() => {
      I(this, C, Cn).call(this);
    }, Ns));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Jr(t, a(this, Yt), a(this, Jt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!a(this, ae).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    I(this, C, qn).call(this, t, n), y(this, et, a(this, et) + t), !(!a(this, Re) || a(this, bt)) && (y(this, bt, !0), it(() => {
      y(this, bt, !1), a(this, Re) && Ot(a(this, Re), a(this, et));
    }));
  }
  get_effect_pending() {
    return a(this, mn).call(this), m(
      /** @type {Source<number>} */
      a(this, Re)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!a(this, ae).onerror && !a(this, ae).failed)
      throw t;
    b != null && b.is_fork ? (a(this, fe) && b.skip_effect(a(this, fe)), a(this, Y) && b.skip_effect(a(this, Y)), a(this, ie) && b.skip_effect(a(this, ie)), b.oncommit(() => {
      I(this, C, Ln).call(this, t);
    })) : I(this, C, Ln).call(this, t);
  }
}
oe = new WeakMap(), Vn = new WeakMap(), ae = new WeakMap(), Qe = new WeakMap(), X = new WeakMap(), fe = new WeakMap(), Y = new WeakMap(), ie = new WeakMap(), De = new WeakMap(), et = new WeakMap(), ze = new WeakMap(), bt = new WeakMap(), Yt = new WeakMap(), Jt = new WeakMap(), Re = new WeakMap(), mn = new WeakMap(), C = new WeakSet(), Ps = function() {
  try {
    y(this, fe, ue(() => a(this, Qe).call(this, a(this, oe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Ds = function(t) {
  const n = a(this, ae).failed;
  n && y(this, ie, ue(() => {
    n(
      a(this, oe),
      () => t,
      () => () => {
      }
    );
  }));
}, Rs = function() {
  const t = a(this, ae).pending;
  t && (this.is_pending = !0, y(this, Y, ue(() => t(a(this, oe)))), it(() => {
    var n = y(this, De, document.createDocumentFragment()), r = lt();
    n.append(r), y(this, fe, I(this, C, fn).call(this, () => ue(() => a(this, Qe).call(this, r)))), a(this, ze) === 0 && (a(this, oe).before(n), y(this, De, null), ot(
      /** @type {Effect} */
      a(this, Y),
      () => {
        y(this, Y, null);
      }
    ), I(this, C, an).call(
      this,
      /** @type {Batch} */
      b
    ));
  }));
}, Cn = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), y(this, ze, 0), y(this, et, 0), y(this, fe, ue(() => {
      a(this, Qe).call(this, a(this, oe));
    })), a(this, ze) > 0) {
      var t = y(this, De, document.createDocumentFragment());
      tr(a(this, fe), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        a(this, ae).pending
      );
      y(this, Y, ue(() => n(a(this, oe))));
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
  this.is_pending = !1, t.transfer_effects(a(this, Yt), a(this, Jt));
}, /**
 * @template T
 * @param {() => T} fn
 */
fn = function(t) {
  var n = M, r = A, i = he;
  Oe(a(this, X)), ve(a(this, X)), It(a(this, X).ctx);
  try {
    return ut.ensure(), t();
  } catch (s) {
    return $r(s), null;
  } finally {
    Oe(n), ve(r), It(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
qn = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && I(r = this.parent, C, qn).call(r, t, n);
    return;
  }
  y(this, ze, a(this, ze) + t), a(this, ze) === 0 && (I(this, C, an).call(this, n), a(this, Y) && ot(a(this, Y), () => {
    y(this, Y, null);
  }), a(this, De) && (a(this, oe).before(a(this, De)), y(this, De, null)));
}, /**
 * @param {unknown} error
 */
Ln = function(t) {
  a(this, fe) && (ee(a(this, fe)), y(this, fe, null)), a(this, Y) && (ee(a(this, Y)), y(this, Y, null)), a(this, ie) && (ee(a(this, ie)), y(this, ie, null));
  var n = a(this, ae).onerror;
  let r = a(this, ae).failed;
  var i = !1, s = !1;
  const o = () => {
    if (i) {
      Es();
      return;
    }
    i = !0, s && ps(), a(this, ie) !== null && ot(a(this, ie), () => {
      y(this, ie, null);
    }), I(this, C, fn).call(this, () => {
      I(this, C, Cn).call(this);
    });
  }, l = (u) => {
    try {
      s = !0, n == null || n(u, o), s = !1;
    } catch (c) {
      Ve(c, a(this, X) && a(this, X).parent);
    }
    r && y(this, ie, I(this, C, fn).call(this, () => {
      try {
        return ue(() => {
          var c = (
            /** @type {Effect} */
            M
          );
          c.b = this, c.f |= Pn, r(
            a(this, oe),
            () => u,
            () => o
          );
        });
      } catch (c) {
        return Ve(
          c,
          /** @type {Effect} */
          a(this, X).parent
        ), null;
      }
    }));
  };
  it(() => {
    var u;
    try {
      u = this.transform_error(t);
    } catch (c) {
      Ve(c, a(this, X) && a(this, X).parent);
      return;
    }
    u !== null && typeof u == "object" && typeof /** @type {any} */
    u.then == "function" ? u.then(
      l,
      /** @param {unknown} e */
      (c) => Ve(c, a(this, X) && a(this, X).parent)
    ) : l(u);
  });
};
function Cs(e, t, n, r) {
  const i = Xr;
  var s = e.filter((p) => !p.settled), o = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(o);
    return;
  }
  var l = (
    /** @type {Effect} */
    M
  ), u = qs(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((p) => p.promise)) : null;
  function d(p) {
    if ((l.f & de) === 0) {
      u();
      try {
        r([...o, ...p]);
      } catch (h) {
        Ve(h, l);
      }
      pn();
    }
  }
  var v = Wr();
  if (n.length === 0) {
    c.then(() => d([])).finally(v);
    return;
  }
  function f() {
    Promise.all(n.map((p) => /* @__PURE__ */ Ls(p))).then(d).catch((p) => Ve(p, l)).finally(v);
  }
  c ? c.then(() => {
    u(), f(), pn();
  }) : f();
}
function qs() {
  var e = (
    /** @type {Effect} */
    M
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
function Wr() {
  var e = (
    /** @type {Effect} */
    M
  ), t = e.b, n = (
    /** @type {Batch} */
    b
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Xr(e) {
  var t = U | G;
  return M !== null && (M.f |= Rt), {
    ctx: he,
    deps: null,
    effects: null,
    equals: Ur,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      j
    ),
    wv: 0,
    parent: M,
    ac: null
  };
}
const Ht = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Ls(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    M
  );
  r === null && fs();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ct(
    /** @type {V} */
    j
  ), o = !A, l = /* @__PURE__ */ new Set();
  return el(() => {
    var p, h;
    var u = (
      /** @type {Effect} */
      M
    ), c = Hr();
    i = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (w) => {
        w !== Qt && c.reject(w);
      }).finally(pn);
    } catch (w) {
      c.reject(w), pn();
    }
    var d = (
      /** @type {Batch} */
      b
    );
    if (o) {
      if ((u.f & Dt) !== 0)
        var v = Wr();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (h = d.async_deriveds.get(u)) == null || h.reject(Ht);
      else
        for (const w of l.values())
          w.reject(Ht);
      l.add(c), d.async_deriveds.set(u, c);
    }
    const f = (w, x = void 0) => {
      v == null || v(), l.delete(c), x !== Ht && (d.activate(), x ? (s.f |= Ke, Ot(s, x)) : ((s.f & Ke) !== 0 && (s.f ^= Ke), Ot(s, w)), d.deactivate());
    };
    c.promise.then(f, (w) => f(null, w || "unknown"));
  }), Zn(() => {
    for (const u of l)
      u.reject(Ht);
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
function Fs(e) {
  const t = /* @__PURE__ */ Xr(e);
  return t.equals = zr, t;
}
function js(e) {
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
  var t, n = M, r = e.parent;
  if (!dt && r !== null && e.v !== j && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (de | J)) !== 0)
    return ks(), e.v;
  Oe(r);
  try {
    e.f &= ~ft, js(e), t = mi(e);
  } finally {
    Oe(n);
  }
  return t;
}
function Zr(e) {
  var t = Yn(e);
  if (!e.equals(t) && (e.wv = gi(), (!(b != null && b.is_fork) || e.deps === null) && (b !== null ? (b.capture(e, t, !0), Vt == null || Vt.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    q(e, H);
    return;
  }
  dt || (B !== null ? (Xn() || b != null && b.is_fork) && B.set(e, t) : $n(e));
}
function Hs(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && en(() => {
        n.ac.abort(Qt), n.ac = null;
      }), n.fn !== null && (n.teardown = ns), $t(n, 0), er(n));
}
function Qr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && Pt(t);
}
let An = null, vt = null, b = null, Vt = null, B = null, Fn = null, Mn = !1, gt = null, un = null;
var br = 0;
let Gs = 1;
var kt, Be, tt, St, Et, xt, Ce, Tt, Z, Wt, qe, me, Me, At, nt, P, jn, Gt, Hn, ei, ti, pt, Us, Ut;
const yn = class yn {
  constructor() {
    S(this, P);
    ne(this, "id", Gs++);
    /** True as soon as `#process` was called */
    S(this, kt, !1);
    ne(this, "linked", !0);
    /** @type {Batch | null} */
    S(this, Be, null);
    /** @type {Batch | null} */
    S(this, tt, null);
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
    S(this, St, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    S(this, Et, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    S(this, xt, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    S(this, Ce, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    S(this, Tt, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    S(this, Z, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    S(this, Wt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    S(this, qe, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    S(this, me, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    S(this, Me, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    S(this, At, /* @__PURE__ */ new Set());
    ne(this, "is_fork", !1);
    S(this, nt, !1);
    vt === null ? An = vt = this : (y(vt, tt, this), y(this, Be, vt)), vt = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    a(this, Me).has(t) || a(this, Me).set(t, { d: [], m: [] }), a(this, At).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = a(this, Me).get(t);
    if (r) {
      a(this, Me).delete(t);
      for (var i of r.d)
        q(i, G), n(i);
      for (i of r.m)
        q(i, Se), n(i);
    }
    a(this, At).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== j && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & Ke) === 0 && (this.current.set(t, [n, r]), B == null || B.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    b = this;
  }
  deactivate() {
    b = null, B = null;
  }
  flush() {
    try {
      Mn = !0, b = this, I(this, P, Gt).call(this);
    } finally {
      br = 0, Fn = null, gt = null, un = null, Mn = !1, b = null, B = null, st.clear();
    }
  }
  discard() {
    var t;
    for (const n of a(this, Et)) n(this);
    a(this, Et).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Ht);
    I(this, P, Ut).call(this), (t = a(this, Tt)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    a(this, Wt).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (y(this, xt, a(this, xt) + 1), t) {
      let r = a(this, Ce).get(n) ?? 0;
      a(this, Ce).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (y(this, xt, a(this, xt) - 1), t) {
      let r = a(this, Ce).get(n) ?? 0;
      r === 1 ? a(this, Ce).delete(n) : a(this, Ce).set(n, r - 1);
    }
    a(this, nt) || (y(this, nt, !0), it(() => {
      y(this, nt, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      a(this, qe).add(r);
    for (const r of n)
      a(this, me).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    a(this, St).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    a(this, Et).add(t);
  }
  settled() {
    return (a(this, Tt) ?? y(this, Tt, Hr())).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new yn();
      Mn || it(() => {
        a(t, kt) || t.flush();
      });
    }
    return b;
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
    if (Fn = t, (i = t.b) != null && i.is_pending && (t.f & (Mt | Sn | Gr)) !== 0 && (t.f & Dt) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (gt !== null && n === M && (A === null || (A.f & U) === 0))
        return;
      if ((r & (Fe | Ee)) !== 0) {
        if ((r & H) === 0)
          return;
        n.f ^= H;
      }
    }
    a(this, Z).push(n);
  }
};
kt = new WeakMap(), Be = new WeakMap(), tt = new WeakMap(), St = new WeakMap(), Et = new WeakMap(), xt = new WeakMap(), Ce = new WeakMap(), Tt = new WeakMap(), Z = new WeakMap(), Wt = new WeakMap(), qe = new WeakMap(), me = new WeakMap(), Me = new WeakMap(), At = new WeakMap(), nt = new WeakMap(), P = new WeakSet(), jn = function() {
  if (this.is_fork) return !0;
  for (const r of a(this, Ce).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (a(this, Me).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Gt = function() {
  var u, c, d, v;
  y(this, kt, !0), br++ > 1e3 && (I(this, P, Ut).call(this), zs());
  for (const f of a(this, qe))
    a(this, me).delete(f), q(f, G), this.schedule(f);
  for (const f of a(this, me))
    q(f, Se), this.schedule(f);
  const t = a(this, Z);
  y(this, Z, []), this.apply();
  var n = gt = [], r = [], i = un = [];
  for (const f of t)
    try {
      I(this, P, Hn).call(this, f, n, r);
    } catch (p) {
      throw ii(f), I(this, P, jn).call(this) || this.discard(), p;
    }
  if (b = null, i.length > 0) {
    var s = yn.ensure();
    for (const f of i)
      s.schedule(f);
  }
  if (gt = null, un = null, I(this, P, jn).call(this)) {
    I(this, P, pt).call(this, r), I(this, P, pt).call(this, n);
    for (const [f, p] of a(this, Me))
      ri(f, p);
    i.length > 0 && /** @type {unknown} */
    I(u = b, P, Gt).call(u);
    return;
  }
  const o = I(this, P, ei).call(this);
  if (o) {
    I(this, P, pt).call(this, r), I(this, P, pt).call(this, n), I(c = o, P, ti).call(c, this);
    return;
  }
  a(this, qe).clear(), a(this, me).clear();
  for (const f of a(this, St)) f(this);
  a(this, St).clear(), Vt = this, kr(r), kr(n), Vt = null, (d = a(this, Tt)) == null || d.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    b
  );
  if (a(this, xt) === 0 && (a(this, Z).length === 0 || l !== null) && I(this, P, Ut).call(this), a(this, Z).length > 0)
    if (l !== null) {
      const f = l;
      a(f, Z).push(...a(this, Z).filter((p) => !a(f, Z).includes(p)));
    } else
      l = this;
  l !== null && I(v = l, P, Gt).call(v);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Hn = function(t, n, r) {
  t.f ^= H;
  for (var i = t.first; i !== null; ) {
    var s = i.f, o = (s & (Ee | Fe)) !== 0, l = o && (s & H) !== 0, u = l || (s & J) !== 0 || a(this, Me).has(i);
    if (!u && i.fn !== null) {
      o ? i.f ^= H : (s & Mt) !== 0 ? n.push(i) : nn(i) && ((s & be) !== 0 && a(this, me).add(i), Pt(i));
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
}, ei = function() {
  for (var t = a(this, Be); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = a(t, Be);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
ti = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const o = this.async_deriveds.get(i);
    o && s.promise.then(o.resolve).catch(o.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(a(t, qe), a(t, me));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & U) !== 0 && (i.f & (G | Se)) === 0))
      for (const u of s) {
        var o = u.f;
        if ((o & U) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var l = (
            /** @type {Effect} */
            u
          );
          o & (mt | be) && !this.async_deriveds.has(l) && (a(this, me).delete(l), q(l, G), this.schedule(l));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), I(r = t, P, Ut).call(r), b = this, I(this, P, Gt).call(this);
}, /**
 * @param {Effect[]} effects
 */
pt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Jr(t[n], a(this, qe), a(this, me));
}, Us = function() {
  var v;
  for (let f = An; f !== null; f = a(f, tt)) {
    var t = f.id < this.id, n = [];
    for (const [p, [h, w]] of this.current) {
      if (f.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          f.current.get(p)[0]
        );
        if (t && h !== r)
          f.current.set(p, [h, w]);
        else
          continue;
      }
      n.push(p);
    }
    if (t)
      for (const [p, h] of this.async_deriveds) {
        const w = f.async_deriveds.get(p);
        w && h.promise.then(w.resolve).catch(w.reject);
      }
    var i = [...f.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      f.current.get(p)[1]
    );
    if (!(!a(f, kt) || i.length === 0)) {
      var s = i.filter((p) => !this.current.has(p));
      if (s.length === 0)
        t && f.discard();
      else if (n.length > 0) {
        if (t)
          for (const p of a(this, At))
            f.unskip_effect(p, (h) => {
              var w;
              (h.f & (be | mt)) !== 0 ? f.schedule(h) : I(w = f, P, pt).call(w, [h]);
            });
        f.activate();
        var o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
        for (var u of n)
          ni(u, s, o, l);
        l = /* @__PURE__ */ new Map();
        var c = [...f.current].filter(([p, h]) => {
          const w = this.current.get(p);
          return w ? w[0] !== h[0] || w[1] !== h[1] : !0;
        }).map(([p]) => p);
        if (c.length > 0)
          for (const p of a(this, Wt))
            (p.f & (de | J | hn)) === 0 && Jn(p, c, l) && ((p.f & (mt | be)) !== 0 ? (q(p, G), f.schedule(p)) : a(f, qe).add(p));
        if (a(f, Z).length > 0 && !a(f, nt)) {
          f.apply();
          for (var d of a(f, Z))
            I(v = f, P, Hn).call(v, d, [], []);
          y(f, Z, []);
        }
        f.deactivate();
      }
    }
  }
}, Ut = function() {
  if (this.linked) {
    var t = a(this, Be), n = a(this, tt);
    t === null ? An = n : y(t, tt, n), n === null ? vt = t : y(n, Be, t), this.linked = !1;
  }
};
let ut = yn;
function zs() {
  try {
    cs();
  } catch (e) {
    Ve(e, Fn);
  }
}
let we = null;
function kr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (de | J)) === 0 && nn(r) && (we = /* @__PURE__ */ new Set(), Pt(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && hi(r), (we == null ? void 0 : we.size) > 0)) {
        st.clear();
        for (const i of we) {
          if ((i.f & (de | J)) !== 0) continue;
          const s = [i];
          let o = i.parent;
          for (; o !== null; )
            we.has(o) && (we.delete(o), s.push(o)), o = o.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const u = s[l];
            (u.f & (de | J)) === 0 && Pt(u);
          }
        }
        we.clear();
      }
    }
    we = null;
  }
}
function ni(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & U) !== 0 ? ni(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (mt | be)) !== 0 && (s & G) === 0 && Jn(i, t, r) && (q(i, G), Wn(
        /** @type {Effect} */
        i
      ));
    }
}
function Jn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (dn.call(t, i))
        return !0;
      if ((i.f & U) !== 0 && Jn(
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
function Wn(e) {
  b.schedule(e);
}
function ri(e, t) {
  if (!((e.f & Ee) !== 0 && (e.f & H) !== 0)) {
    (e.f & G) !== 0 ? t.d.push(e) : (e.f & Se) !== 0 && t.m.push(e), q(e, H);
    for (var n = e.first; n !== null; )
      ri(n, t), n = n.next;
  }
}
function ii(e) {
  q(e, H);
  for (var t = e.first; t !== null; )
    ii(t), t = t.next;
}
let _n = /* @__PURE__ */ new Set();
const st = /* @__PURE__ */ new Map();
let si = !1;
function ct(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Ur,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function z(e, t) {
  const n = ct(e);
  return rl(n), n;
}
// @__NO_SIDE_EFFECTS__
function Bs(e, t = !1, n = !0) {
  const r = ct(e);
  return t || (r.equals = zr), r;
}
function O(e, t, n = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ke || (A.f & hn) !== 0) && Kr() && (A.f & (U | be | mt | hn)) !== 0 && (Ie === null || !Ie.has(e)) && vs();
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
      (e.f & G) !== 0 && Yn(i), B === null && $n(i);
    }
    e.wv = gi(), li(e, G, n), M !== null && (M.f & H) !== 0 && (M.f & (Ee | Fe)) === 0 && (le === null ? il([e]) : le.push(e)), !r.is_fork && _n.size > 0 && !si && Vs();
  }
  return t;
}
function Vs() {
  si = !1;
  for (const e of _n) {
    (e.f & H) !== 0 && q(e, Se);
    let t;
    try {
      t = nn(e);
    } catch {
      t = !0;
    }
    t && Pt(e);
  }
  _n.clear();
}
function Kt(e) {
  O(e, e.v + 1);
}
function li(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var o = r[s], l = o.f, u = (l & G) === 0;
      if (u && q(o, t), (l & hn) !== 0)
        _n.add(
          /** @type {Effect} */
          o
        );
      else if ((l & U) !== 0) {
        var c = (
          /** @type {Derived} */
          o
        );
        B == null || B.delete(c), (l & ft) === 0 && (l & ce && (M === null || (M.f & vn) === 0) && (o.f |= ft), li(c, Se, n));
      } else if (u) {
        var d = (
          /** @type {Effect} */
          o
        );
        (l & be) !== 0 && we !== null && we.add(d), n !== null ? n.push(d) : Wn(d);
      }
    }
}
function wt(e) {
  if (typeof e != "object" || e === null || yt in e)
    return e;
  const t = jr(e);
  if (t !== es && t !== ts)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Kn(e), i = /* @__PURE__ */ z(0), s = at, o = (l) => {
    if (at === s)
      return l();
    var u = A, c = at;
    ve(null), Tr(s);
    var d = l();
    return ve(u), Tr(c), d;
  };
  return r && n.set("length", /* @__PURE__ */ z(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && ds();
        var d = n.get(u);
        return d === void 0 ? o(() => {
          var v = /* @__PURE__ */ z(c.value);
          return n.set(u, v), v;
        }) : O(d, c.value, !0), !0;
      },
      deleteProperty(l, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in l) {
            const d = o(() => /* @__PURE__ */ z(j));
            n.set(u, d), Kt(i);
          }
        } else
          O(c, j), Kt(i);
        return !0;
      },
      get(l, u, c) {
        var p;
        if (u === yt)
          return e;
        var d = n.get(u), v = u in l;
        if (d === void 0 && (!v || (p = Bt(l, u)) != null && p.writable) && (d = o(() => {
          var h = wt(v ? l[u] : j), w = /* @__PURE__ */ z(h);
          return w;
        }), n.set(u, d)), d !== void 0) {
          var f = m(d);
          return f === j ? void 0 : f;
        }
        return Reflect.get(l, u, c);
      },
      getOwnPropertyDescriptor(l, u) {
        var c = Reflect.getOwnPropertyDescriptor(l, u);
        if (c && "value" in c) {
          var d = n.get(u);
          d && (c.value = m(d));
        } else if (c === void 0) {
          var v = n.get(u), f = v == null ? void 0 : v.v;
          if (v !== void 0 && f !== j)
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0
            };
        }
        return c;
      },
      has(l, u) {
        var f;
        if (u === yt)
          return !0;
        var c = n.get(u), d = c !== void 0 && c.v !== j || Reflect.has(l, u);
        if (c !== void 0 || M !== null && (!d || (f = Bt(l, u)) != null && f.writable)) {
          c === void 0 && (c = o(() => {
            var p = d ? wt(l[u]) : j, h = /* @__PURE__ */ z(p);
            return h;
          }), n.set(u, c));
          var v = m(c);
          if (v === j)
            return !1;
        }
        return d;
      },
      set(l, u, c, d) {
        var D;
        var v = n.get(u), f = u in l;
        if (r && u === "length")
          for (var p = c; p < /** @type {Source<number>} */
          v.v; p += 1) {
            var h = n.get(p + "");
            h !== void 0 ? O(h, j) : p in l && (h = o(() => /* @__PURE__ */ z(j)), n.set(p + "", h));
          }
        if (v === void 0)
          (!f || (D = Bt(l, u)) != null && D.writable) && (v = o(() => /* @__PURE__ */ z(void 0)), O(v, wt(c)), n.set(u, v));
        else {
          f = v.v !== j;
          var w = o(() => wt(c));
          O(v, w);
        }
        var x = Reflect.getOwnPropertyDescriptor(l, u);
        if (x != null && x.set && x.set.call(d, c), !f) {
          if (r && typeof u == "string") {
            var T = (
              /** @type {Source<number>} */
              n.get("length")
            ), N = Number(u);
            Number.isInteger(N) && N >= T.v && O(T, N + 1);
          }
          Kt(i);
        }
        return !0;
      },
      ownKeys(l) {
        m(i);
        var u = Reflect.ownKeys(l).filter((v) => {
          var f = n.get(v);
          return f === void 0 || f.v !== j;
        });
        for (var [c, d] of n)
          d.v !== j && !(c in l) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        hs();
      }
    }
  );
}
function Sr(e) {
  try {
    if (e !== null && typeof e == "object" && yt in e)
      return e[yt];
  } catch {
  }
  return e;
}
function Ks(e, t) {
  return Object.is(Sr(e), Sr(t));
}
var Gn, oi, ai, fi;
function $s() {
  if (Gn === void 0) {
    Gn = window, oi = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    ai = Bt(t, "firstChild").get, fi = Bt(t, "nextSibling").get, yr(e) && (e[Rn] = void 0, e[on] = null, e[os] = void 0, e.__e = void 0), yr(n) && (n[jt] = void 0);
  }
}
function lt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function gn(e) {
  return (
    /** @type {TemplateNode | null} */
    ai.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function tn(e) {
  return (
    /** @type {TemplateNode | null} */
    fi.call(e)
  );
}
function K(e, t) {
  return /* @__PURE__ */ gn(e);
}
function Er(e, t = !1) {
  {
    var n = /* @__PURE__ */ gn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ tn(n) : n;
  }
}
function R(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ tn(r);
  return r;
}
function Ys(e) {
  e.textContent = "";
}
function ui() {
  return !1;
}
function Js(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Ws(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function je(e, t) {
  var n = M;
  n !== null && (n.f & J) !== 0 && (e |= J);
  var r = {
    ctx: he,
    deps: null,
    nodes: null,
    f: e | G | ce,
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
  if ((e & Mt) !== 0)
    gt !== null ? gt.push(r) : ut.ensure().schedule(r);
  else if (t !== null) {
    try {
      Pt(r);
    } catch (o) {
      throw ee(r), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Rt) === 0 && (i = i.first, (e & be) !== 0 && (e & Nt) !== 0 && i !== null && (i.f |= Nt));
  }
  if (i !== null && (i.parent = n, n !== null && Ws(i, n), A !== null && (A.f & U) !== 0 && (e & Fe) === 0)) {
    var s = (
      /** @type {Derived} */
      A
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function Xn() {
  return A !== null && !ke;
}
function Zn(e) {
  const t = je(Sn, null);
  return q(t, H), t.teardown = e, t;
}
function Xs(e) {
  return je(Mt | ss, e);
}
function Zs(e) {
  ut.ensure();
  const t = je(Fe | Rt, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? ot(t, () => {
      ee(t), r(void 0);
    }) : (ee(t), r(void 0));
  });
}
function Qs(e) {
  return je(Mt, e);
}
function el(e) {
  return je(mt | Rt, e);
}
function ci(e, t = 0) {
  return je(Sn | t, e);
}
function Je(e, t = [], n = [], r = []) {
  Cs(r, t, n, (i) => {
    je(Sn, () => {
      e(...i.map(m));
    });
  });
}
function Qn(e, t = 0) {
  var n = je(be | t, e);
  return n;
}
function ue(e) {
  return je(Ee | Rt, e);
}
function di(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = dt, r = A;
    xr(!0), ve(null);
    try {
      t.call(null);
    } finally {
      xr(n), ve(r);
    }
  }
}
function er(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && en(() => {
      i.abort(Qt);
    });
    var r = n.next;
    (n.f & Fe) !== 0 ? n.parent = null : ee(n, t), n = r;
  }
}
function tl(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ee) === 0 && ee(t), t = n;
  }
}
function ee(e, t = !0) {
  var n = !1;
  (t || (e.f & is) !== 0) && e.nodes !== null && e.nodes.end !== null && (nl(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= Dn, er(e, t && !n), $t(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  di(e), e.f ^= Dn, e.f |= de;
  var i = e.parent;
  i !== null && i.first !== null && hi(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function nl(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ tn(e);
    e.remove(), e = n;
  }
}
function hi(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function ot(e, t, n = !0) {
  var r = [];
  vi(e, r, !0);
  var i = () => {
    n && ee(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var o = () => --s || i();
    for (var l of r)
      l.out(o);
  } else
    i();
}
function vi(e, t, n) {
  if ((e.f & J) === 0) {
    e.f ^= J;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & Fe) === 0) {
        var o = (i.f & Nt) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & Ee) !== 0 && (e.f & be) !== 0;
        vi(i, t, o ? n : !1);
      }
      i = s;
    }
  }
}
function wn(e) {
  pi(e, !0);
}
function pi(e, t) {
  if ((e.f & J) !== 0) {
    e.f ^= J, (e.f & H) === 0 && (q(e, G), ut.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Nt) !== 0 || (n.f & Ee) !== 0;
      pi(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const o of s)
        (o.is_global || t) && o.in();
  }
}
function tr(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ tn(n);
      t.append(n), n = i;
    }
}
let cn = !1, dt = !1;
function xr(e) {
  dt = e;
}
let A = null, ke = !1;
function ve(e) {
  A = e;
}
let M = null;
function Oe(e) {
  M = e;
}
let Ie = null;
function rl(e) {
  A !== null && (Ie ?? (Ie = /* @__PURE__ */ new Set())).add(e);
}
let Q = null, re = 0, le = null;
function il(e) {
  le = e;
}
let _i = 1, Xe = 0, at = Xe;
function Tr(e) {
  at = e;
}
function gi() {
  return ++_i;
}
function nn(e) {
  var t = e.f;
  if ((t & G) !== 0)
    return !0;
  if (t & U && (e.f &= ~ft), (t & Se) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (nn(
        /** @type {Derived} */
        s
      ) && Zr(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & ce) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    B === null && q(e, H);
  }
  return !1;
}
function wi(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(Ie !== null && Ie.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & U) !== 0 ? wi(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? q(s, G) : (s.f & H) !== 0 && q(s, Se), Wn(
        /** @type {Effect} */
        s
      ));
    }
}
function mi(e) {
  var w;
  var t = Q, n = re, r = le, i = A, s = Ie, o = he, l = ke, u = at, c = e.f;
  Q = /** @type {null | Value[]} */
  null, re = 0, le = null, A = (c & (Ee | Fe)) === 0 ? e : null, Ie = null, It(e.ctx), ke = !1, at = ++Xe, e.ac !== null && (en(() => {
    e.ac.abort(Qt);
  }), e.ac = null);
  try {
    e.f |= vn;
    var d = (
      /** @type {Function} */
      e.fn
    ), v = d();
    e.f |= Dt;
    var f = e.deps, p = b == null ? void 0 : b.is_fork;
    if (Q !== null) {
      var h;
      if (p || $t(e, re), f !== null && re > 0)
        for (f.length = re + Q.length, h = 0; h < Q.length; h++)
          f[re + h] = Q[h];
      else
        e.deps = f = Q;
      if (Xn() && (e.f & ce) !== 0)
        for (h = re; h < f.length; h++)
          ((w = f[h]).reactions ?? (w.reactions = [])).push(e);
    } else !p && f !== null && re < f.length && ($t(e, re), f.length = re);
    if (Kr() && le !== null && !ke && f !== null && (e.f & (U | Se | G)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      le.length; h++)
        wi(
          le[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Xe++, i.deps !== null)
        for (let x = 0; x < n; x += 1)
          i.deps[x].rv = Xe;
      if (t !== null)
        for (const x of t)
          x.rv = Xe;
      le !== null && (r === null ? r = le : r.push(.../** @type {Source[]} */
      le));
    }
    return (e.f & Ke) !== 0 && (e.f ^= Ke), v;
  } catch (x) {
    return $r(x);
  } finally {
    e.f ^= vn, Q = t, re = n, le = r, A = i, Ie = s, It(o), ke = l, at = u;
  }
}
function sl(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Xi.call(n, e);
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
    (s.f & ce) !== 0 && (s.f ^= ce, s.f &= ~ft), s.v !== j && $n(s), s.ac !== null && en(() => {
      s.ac.abort(Qt), s.ac = null;
    }), Hs(s), $t(s, 0);
  }
}
function $t(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      sl(e, n[r]);
}
function Pt(e) {
  var t = e.f;
  if ((t & de) === 0) {
    q(e, H);
    var n = M, r = cn;
    M = e, cn = (t & (Ee | Fe)) === 0;
    try {
      (t & (be | Gr)) !== 0 ? tl(e) : er(e), di(e);
      var i = mi(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = _i;
      var s;
    } finally {
      cn = r, M = n;
    }
  }
}
function m(e) {
  var t = e.f, n = (t & U) !== 0;
  if (A !== null && !ke) {
    var r = M !== null && (M.f & de) !== 0;
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
    var o = (
      /** @type {Derived} */
      e
    );
    if (dt) {
      var l = o.v;
      return ((o.f & H) === 0 && o.reactions !== null || bi(o)) && (l = Yn(o)), st.set(o, l), l;
    }
    var u = (o.f & ce) === 0 && !ke && A !== null && (cn || (A.f & ce) !== 0), c = (o.f & Dt) === 0;
    nn(o) && (u && (o.f |= ce), Zr(o)), u && !c && (Qr(o), yi(o));
  }
  if (B != null && B.has(e))
    return B.get(e);
  if ((e.f & Ke) !== 0)
    throw e.v;
  return e.v;
}
function yi(e) {
  if (e.f |= ce, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & U) !== 0 && (t.f & ce) === 0 && (Qr(
        /** @type {Derived} */
        t
      ), yi(
        /** @type {Derived} */
        t
      ));
}
function bi(e) {
  if (e.v === j) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (st.has(t) || (t.f & U) !== 0 && bi(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function ki(e) {
  var t = ke;
  try {
    return ke = !0, e();
  } finally {
    ke = t;
  }
}
const ll = ["touchstart", "touchmove"];
function ol(e) {
  return ll.includes(e);
}
const Ze = Symbol("events"), Si = /* @__PURE__ */ new Set(), Un = /* @__PURE__ */ new Set();
function al(e, t, n, r = {}) {
  function i(s) {
    if (r.capture || zn.call(t, s), !s.cancelBubble)
      return en(() => n == null ? void 0 : n.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? it(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function Nn(e, t, n, r, i) {
  var s = { capture: r, passive: i }, o = al(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Zn(() => {
    t.removeEventListener(e, o, s);
  });
}
function $(e, t, n) {
  (t[Ze] ?? (t[Ze] = {}))[e] = n;
}
function fl(e) {
  for (var t = 0; t < e.length; t++)
    Si.add(e[t]);
  for (var n of Un)
    n(e);
}
let Ar = null;
function zn(e) {
  var w, x;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((w = e.composedPath) == null ? void 0 : w.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Ar = e;
  var o = 0, l = Ar === e && e[Ze];
  if (l) {
    var u = i.indexOf(l);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ze] = t;
      return;
    }
    var c = i.indexOf(t);
    if (c === -1)
      return;
    u <= c && (o = u);
  }
  if (s = /** @type {Element} */
  i[o] || e.target, s !== t) {
    Zi(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var d = A, v = M;
    ve(null), Oe(null);
    try {
      for (var f, p = []; s !== null && s !== t; ) {
        try {
          var h = (x = s[Ze]) == null ? void 0 : x[r];
          h != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && h.call(s, e);
        } catch (T) {
          f ? p.push(T) : f = T;
        }
        if (e.cancelBubble) break;
        o++, s = o < i.length ? (
          /** @type {Element} */
          i[o]
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
      e[Ze] = t, delete e.currentTarget, ve(d), Oe(v);
    }
  }
}
var Lr;
const In = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Lr = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Lr.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function ul(e) {
  return (
    /** @type {string} */
    (In == null ? void 0 : In.createHTML(e)) ?? e
  );
}
function cl(e) {
  var t = Js("template");
  return t.innerHTML = ul(e.replaceAll("<!>", "<!---->")), t.content;
}
function Mr(e, t) {
  var n = (
    /** @type {Effect} */
    M
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function xe(e, t) {
  var n = (t & ms) !== 0, r = (t & ys) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = cl(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ gn(i)));
    var o = (
      /** @type {TemplateNode} */
      r || oi ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ gn(o)
      ), u = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Mr(l, u);
    } else
      Mr(o, o);
    return o;
  };
}
function ge(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Lt(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[jt] ?? (e[jt] = e.nodeValue)) && (e[jt] = n, e.nodeValue = `${n}`);
}
function dl(e, t) {
  return hl(e, t);
}
const sn = /* @__PURE__ */ new Map();
function hl(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: o = !0, transformError: l }) {
  $s();
  var u = void 0, c = Zs(() => {
    var d = n ?? t.appendChild(lt());
    Is(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (p) => {
        Br({});
        var h = (
          /** @type {ComponentContext} */
          he
        );
        s && (h.c = s), i && (r.$$events = i), u = e(p, r) || {}, Vr();
      },
      l
    );
    var v = /* @__PURE__ */ new Set(), f = (p) => {
      for (var h = 0; h < p.length; h++) {
        var w = p[h];
        if (!v.has(w)) {
          v.add(w);
          var x = ol(w);
          for (const D of [t, document]) {
            var T = sn.get(D);
            T === void 0 && (T = /* @__PURE__ */ new Map(), sn.set(D, T));
            var N = T.get(w);
            N === void 0 ? (D.addEventListener(w, zn, { passive: x }), T.set(w, 1)) : T.set(w, N + 1);
          }
        }
      }
    };
    return f(kn(Si)), Un.add(f), () => {
      var x;
      for (var p of v)
        for (const T of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            sn.get(T)
          ), w = (
            /** @type {number} */
            h.get(p)
          );
          --w == 0 ? (T.removeEventListener(p, zn), h.delete(p), h.size === 0 && sn.delete(T)) : h.set(p, w);
        }
      Un.delete(f), d !== n && ((x = d.parentNode) == null || x.removeChild(d));
    };
  });
  return vl.set(u, c), u;
}
let vl = /* @__PURE__ */ new WeakMap();
var ye, Ne, se, rt, Xt, Zt, bn;
class pl {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    ne(this, "anchor");
    /** @type {Map<Batch, Key>} */
    S(this, ye, /* @__PURE__ */ new Map());
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
    S(this, Ne, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    S(this, se, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    S(this, rt, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    S(this, Xt, !0);
    /**
     * @param {Batch} batch
     */
    S(this, Zt, (t) => {
      if (a(this, ye).has(t)) {
        var n = (
          /** @type {Key} */
          a(this, ye).get(t)
        ), r = a(this, Ne).get(n);
        if (r)
          wn(r), a(this, rt).delete(n);
        else {
          var i = a(this, se).get(n);
          i && (wn(i.effect), a(this, Ne).set(n, i.effect), a(this, se).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, o] of a(this, ye)) {
          if (a(this, ye).delete(s), s === t)
            break;
          const l = a(this, se).get(o);
          l && (ee(l.effect), a(this, se).delete(o));
        }
        for (const [s, o] of a(this, Ne)) {
          if (s === n || a(this, rt).has(s)) continue;
          const l = () => {
            if (Array.from(a(this, ye).values()).includes(s)) {
              var c = document.createDocumentFragment();
              tr(o, c), c.append(lt()), a(this, se).set(s, { effect: o, fragment: c });
            } else
              ee(o);
            a(this, rt).delete(s), a(this, Ne).delete(s);
          };
          a(this, Xt) || !r ? (a(this, rt).add(s), ot(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    S(this, bn, (t) => {
      a(this, ye).delete(t);
      const n = Array.from(a(this, ye).values());
      for (const [r, i] of a(this, se))
        n.includes(r) || (ee(i.effect), a(this, se).delete(r));
    });
    this.anchor = t, y(this, Xt, n);
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
    ), i = ui();
    if (n && !a(this, Ne).has(t) && !a(this, se).has(t))
      if (i) {
        var s = document.createDocumentFragment(), o = lt();
        s.append(o), a(this, se).set(t, {
          effect: ue(() => n(o)),
          fragment: s
        });
      } else
        a(this, Ne).set(
          t,
          ue(() => n(this.anchor))
        );
    if (a(this, ye).set(r, t), i) {
      for (const [l, u] of a(this, Ne))
        l === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [l, u] of a(this, se))
        l === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(a(this, Zt)), r.ondiscard(a(this, bn));
    } else
      a(this, Zt).call(this, r);
  }
}
ye = new WeakMap(), Ne = new WeakMap(), se = new WeakMap(), rt = new WeakMap(), Xt = new WeakMap(), Zt = new WeakMap(), bn = new WeakMap();
function We(e, t, n = !1) {
  var r = new pl(e), i = n ? Nt : 0;
  function s(o, l) {
    r.ensure(o, l);
  }
  Qn(() => {
    var o = !1;
    t((l, u = 0) => {
      o = !0, s(u, l);
    }), o || s(-1, null);
  }, i);
}
function _l(e, t) {
  return t;
}
function gl(e, t, n) {
  for (var r = [], i = t.length, s, o = t.length, l = 0; l < i; l++) {
    let v = t[l];
    ot(
      v,
      () => {
        if (s) {
          if (s.pending.delete(v), s.done.add(v), s.pending.size === 0) {
            var f = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Bn(e, kn(s.done)), f.delete(s), f.size === 0 && (e.outrogroups = null);
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
      var c = (
        /** @type {Element} */
        n
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      Ys(d), d.append(c), e.items.clear();
    }
    Bn(e, t, !u);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Bn(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const o of e.pending.values())
      for (const l of o)
        r.add(
          /** @type {EachItem} */
          e.items.get(l).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= Le;
      const o = document.createDocumentFragment();
      tr(s, o);
    } else
      ee(t[i], n);
  }
}
var Nr;
function wl(e, t, n, r, i, s = null) {
  var o = e, l = /* @__PURE__ */ new Map();
  {
    var u = (
      /** @type {Element} */
      e
    );
    o = u.appendChild(lt());
  }
  var c = null, d = /* @__PURE__ */ Fs(() => {
    var N = n();
    return (
      /** @type {V[]} */
      Kn(N) ? N : N == null ? [] : kn(N)
    );
  }), v, f = /* @__PURE__ */ new Map(), p = !0;
  function h(N) {
    (T.effect.f & de) === 0 && (T.pending.delete(N), T.fallback = c, ml(T, v, o, t, r), c !== null && (v.length === 0 ? (c.f & Le) === 0 ? wn(c) : (c.f ^= Le, zt(c, null, o)) : ot(c, () => {
      c = null;
    })));
  }
  function w(N) {
    T.pending.delete(N);
  }
  var x = Qn(() => {
    v = /** @type {V[]} */
    m(d);
    for (var N = v.length, D = /* @__PURE__ */ new Set(), te = (
      /** @type {Batch} */
      b
    ), Te = ui(), pe = 0; pe < N; pe += 1) {
      var $e = v[pe], Pe = r($e, pe), L = p ? null : l.get(Pe);
      L ? (L.v && Ot(L.v, $e), L.i && Ot(L.i, pe), Te && te.unskip_effect(L.e)) : (L = yl(
        l,
        p ? o : Nr ?? (Nr = lt()),
        $e,
        Pe,
        pe,
        i,
        t,
        n
      ), p || (L.e.f |= Le), l.set(Pe, L)), D.add(Pe);
    }
    if (N === 0 && s && !c && (p ? c = ue(() => s(o)) : (c = ue(() => s(Nr ?? (Nr = lt()))), c.f |= Le)), N > D.size && us(), !p)
      if (f.set(te, D), Te) {
        for (const [Ct, En] of l)
          D.has(Ct) || te.skip_effect(En.e);
        te.oncommit(h), te.ondiscard(w);
      } else
        h(te);
    m(d);
  }), T = { effect: x, items: l, pending: f, outrogroups: null, fallback: c };
  p = !1;
}
function Ft(e) {
  for (; e !== null && (e.f & Ee) === 0; )
    e = e.next;
  return e;
}
function ml(e, t, n, r, i) {
  var Pe;
  var s = t.length, o = e.items, l = Ft(e.effect.first), u, c = null, d = [], v = [], f, p, h, w;
  for (w = 0; w < s; w += 1) {
    if (f = t[w], p = i(f, w), h = /** @type {EachItem} */
    o.get(p).e, e.outrogroups !== null)
      for (const L of e.outrogroups)
        L.pending.delete(h), L.done.delete(h);
    if ((h.f & J) !== 0 && wn(h), (h.f & Le) !== 0)
      if (h.f ^= Le, h === l)
        zt(h, null, n);
      else {
        var x = c ? c.next : l;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), Ue(e, c, h), Ue(e, h, x), zt(h, x, n), c = h, d = [], v = [], l = Ft(c.next);
        continue;
      }
    if (h !== l) {
      if (u !== void 0 && u.has(h)) {
        if (d.length < v.length) {
          var T = v[0], N;
          c = T.prev;
          var D = d[0], te = d[d.length - 1];
          for (N = 0; N < d.length; N += 1)
            zt(d[N], T, n);
          for (N = 0; N < v.length; N += 1)
            u.delete(v[N]);
          Ue(e, D.prev, te.next), Ue(e, c, D), Ue(e, te, T), l = T, c = te, w -= 1, d = [], v = [];
        } else
          u.delete(h), zt(h, l, n), Ue(e, h.prev, h.next), Ue(e, h, c === null ? e.effect.first : c.next), Ue(e, c, h), c = h;
        continue;
      }
      for (d = [], v = []; l !== null && l !== h; )
        (u ?? (u = /* @__PURE__ */ new Set())).add(l), v.push(l), l = Ft(l.next);
      if (l === null)
        continue;
    }
    (h.f & Le) === 0 && d.push(h), c = h, l = Ft(h.next);
  }
  if (e.outrogroups !== null) {
    for (const L of e.outrogroups)
      L.pending.size === 0 && (Bn(e, kn(L.done)), (Pe = e.outrogroups) == null || Pe.delete(L));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || u !== void 0) {
    var Te = [];
    if (u !== void 0)
      for (h of u)
        (h.f & J) === 0 && Te.push(h);
    for (; l !== null; )
      (l.f & J) === 0 && l !== e.fallback && Te.push(l), l = Ft(l.next);
    var pe = Te.length;
    if (pe > 0) {
      var $e = s === 0 ? n : null;
      gl(e, Te, $e);
    }
  }
}
function yl(e, t, n, r, i, s, o, l) {
  var u = (o & _s) !== 0 ? (o & ws) === 0 ? /* @__PURE__ */ Bs(n, !1, !1) : ct(n) : null, c = (o & gs) !== 0 ? ct(i) : null;
  return {
    v: u,
    i: c,
    e: ue(() => (s(t, u ?? n, c ?? i, l), () => {
      e.delete(r);
    }))
  };
}
function zt(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & Le) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ tn(r)
      );
      if (s.before(r), r === i)
        return;
      r = o;
    }
}
function Ue(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Ir = [...` 	
\r\f \v\uFEFF`];
function bl(e, t, n) {
  var r = "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, o = 0; (o = r.indexOf(i, o)) >= 0; ) {
          var l = o + s;
          (o === 0 || Ir.includes(r[o - 1])) && (l === r.length || Ir.includes(r[l])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(l + 1) : o = l;
        }
  }
  return r === "" ? null : r;
}
function kl(e, t, n, r, i, s) {
  var o = (
    /** @type {any} */
    e[Rn]
  );
  if (o !== n || o === void 0) {
    var l = bl(n, r, s);
    l == null ? e.removeAttribute("class") : e.className = l, e[Rn] = n;
  } else if (s && i !== s)
    for (var u in s) {
      var c = !!s[u];
      (i == null || c !== !!i[u]) && e.classList.toggle(u, c);
    }
  return s;
}
function Ei(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Kn(t))
      return Ss();
    for (var r of e.options)
      r.selected = t.includes(Or(r));
    return;
  }
  for (r of e.options) {
    var i = Or(r);
    if (Ks(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function Sl(e) {
  var t = new MutationObserver(() => {
    Ei(e, e.__value);
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
  }), Zn(() => {
    t.disconnect();
  });
}
function Or(e) {
  return "__value" in e ? e.__value : e.value;
}
const El = Symbol("is custom element"), xl = Symbol("is html"), Tl = as ? "progress" : "PROGRESS";
function Pr(e, t) {
  var n = nr(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== Tl) || (e.value = t ?? "");
}
function Al(e, t) {
  var n = nr(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function ln(e, t, n, r) {
  var i = nr(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[ls] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ml(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function nr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[on] ?? (e[on] = {
      [El]: e.nodeName.includes("-"),
      [xl]: e.namespaceURI === bs
    })
  );
}
var Dr = /* @__PURE__ */ new Map();
function Ml(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Dr.get(t);
  if (n) return n;
  Dr.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = Qi(i);
    for (var o in r)
      r[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
    i = jr(i);
  }
  return n;
}
function On(e, t) {
  return e === t || (e == null ? void 0 : e[yt]) === t;
}
function Nl(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    he.r
  ), s = (
    /** @type {Effect} */
    M
  );
  return Qs(() => {
    var o, l;
    return ci(() => {
      o = l, l = [], ki(() => {
        On(n(...l), e) || (t(e, ...l), o && On(n(...o), e) && t(null, ...o));
      });
    }), () => {
      let u = s;
      for (; u !== i && u.parent !== null && u.parent.f & Dn; )
        u = u.parent;
      const c = () => {
        l && On(n(...l), e) && t(null, ...l);
      }, d = u.teardown;
      u.teardown = () => {
        c(), d == null || d();
      };
    };
  }), e;
}
const Il = "5";
var Fr;
typeof window < "u" && ((Fr = window.__svelte ?? (window.__svelte = {})).v ?? (Fr.v = /* @__PURE__ */ new Set())).add(Il);
function Rr(e, t) {
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
    /** Erstatt hele utkastet (brukes av angre/gjenta). Husk save() etterpå. */
    replace(o) {
      return i = o, i;
    },
    hasDraft() {
      return localStorage.getItem(e) !== null;
    }
  };
}
function Ol(e, t = {}) {
  const n = (i) => {
    var o, l, u, c, d, v, f, p;
    if (i.origin !== location.origin) return;
    const s = i.data;
    (s == null ? void 0 : s.type) === "urd-edit" && ((o = t.onEdit) == null || o.call(t, s)), (s == null ? void 0 : s.type) === "urd-move" && ((l = t.onMove) == null || l.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete" && ((u = t.onDelete) == null || u.call(t, s)), (s == null ? void 0 : s.type) === "urd-add-section" && ((c = t.onAddSection) == null || c.call(t, s)), (s == null ? void 0 : s.type) === "urd-move-section" && ((d = t.onMoveSection) == null || d.call(t, s)), (s == null ? void 0 : s.type) === "urd-delete-section" && ((v = t.onDeleteSection) == null || v.call(t, s)), (s == null ? void 0 : s.type) === "urd-section-size" && ((f = t.onSectionSize) == null || f.call(t, s)), (s == null ? void 0 : s.type) === "urd-undo" && ((p = t.onUndo) == null || p.call(t, s));
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
    sendShowGrid(i) {
      r({ type: "urd-show-grid", visible: i });
    },
    destroy() {
      window.removeEventListener("message", n);
    }
  };
}
const Pl = 2, Cr = (e) => Math.round(e * 100) / 100, Dl = {
  1: (e, t) => {
    var n;
    for (const r of e.sections ?? []) {
      const i = r.grid ?? (t == null ? void 0 : t.grid) ?? { columns: 24, rowHeight: 8 };
      for (const s of r.blocks ?? [])
        for (const o of ["desktop", "mobile"]) {
          const l = (n = s.frames) == null ? void 0 : n[o];
          l && (s.frames[o] = {
            ...l,
            x: Cr(l.x * 100 / i.columns),
            w: Cr(l.w * 100 / i.columns),
            y: l.y * i.rowHeight,
            h: l.h * i.rowHeight
          });
        }
    }
    return e;
  }
};
function Rl(e, t) {
  let n = structuredClone(e), r = n.schemaVersion ?? 1;
  for (; r < Pl; ) {
    const i = Dl[r];
    if (typeof i != "function") return e;
    n = i(n, t) ?? n, r++, n.schemaVersion = r;
  }
  return n;
}
var Cl = /* @__PURE__ */ xe('<button class="chrome-restore svelte-1n46o8q" title="Tilbake til redigering">✏ Rediger</button>'), ql = /* @__PURE__ */ xe("<option> </option>"), Ll = /* @__PURE__ */ xe('<select class="svelte-1n46o8q"></select>'), Fl = /* @__PURE__ */ xe('<span class="palette svelte-1n46o8q"><button class="ghost svelte-1n46o8q" title="Ny tekstblokk">+ Tekst</button> <button class="ghost svelte-1n46o8q" title="Ny knapp">+ Knapp</button> <details class="gridmenu svelte-1n46o8q"><summary title="Ny form" class="svelte-1n46o8q">+ Form</summary> <div class="gridmenu-body formmenu svelte-1n46o8q"><button class="ghost svelte-1n46o8q">─ Strek</button> <button class="ghost svelte-1n46o8q">→ Pil</button> <button class="ghost svelte-1n46o8q">○ Sirkel</button> <button class="ghost svelte-1n46o8q">▭ Rektangel</button> <button class="ghost svelte-1n46o8q">△ Trekant</button></div></details></span> <details class="gridmenu svelte-1n46o8q"><summary title="Grid-innstillinger (hjelpelinjer for plassering)" class="svelte-1n46o8q">⌗ Grid</summary> <div class="gridmenu-body svelte-1n46o8q"><label class="svelte-1n46o8q">Kolonner (bredden) <input type="number" min="4" max="100" class="svelte-1n46o8q"/></label> <label class="svelte-1n46o8q">Radhøyde i px (høyden) <input type="number" min="2" max="64" class="svelte-1n46o8q"/></label> <label class="gridmenu-snap svelte-1n46o8q"><input type="checkbox"/> Snap til grid</label> <p class="gridmenu-hint svelte-1n46o8q"> </p></div></details>', 1), jl = /* @__PURE__ */ xe('<span class="badge svelte-1n46o8q">Upubliserte endringer</span>'), Hl = /* @__PURE__ */ xe('<span class="who svelte-1n46o8q"> </span>'), Gl = /* @__PURE__ */ xe('<a class="ghost svelte-1n46o8q" href="/api/github/login">Logg inn med GitHub</a>'), Ul = /* @__PURE__ */ xe('<button class="ghost svelte-1n46o8q"> </button> <!> <a class="ghost svelte-1n46o8q" target="_blank" rel="noopener">Se siden ↗</a> <button class="ghost svelte-1n46o8q">Forkast utkast</button> <button class="primary svelte-1n46o8q">Publiser</button>', 1), zl = /* @__PURE__ */ xe('<iframe title="Forhåndsvisning" class="svelte-1n46o8q"></iframe>'), Bl = /* @__PURE__ */ xe('<p class="loading svelte-1n46o8q">Laster…</p>'), Vl = /* @__PURE__ */ xe('<div class="editor svelte-1n46o8q"><!> <header><strong class="brand svelte-1n46o8q">Urd</strong> <!> <!> <!> <span class="status svelte-1n46o8q"> </span> <span class="spacer svelte-1n46o8q"></span> <!></header> <!></div>');
function Kl(e, t) {
  Br(t, !0);
  let n = /* @__PURE__ */ z(null), r = /* @__PURE__ */ z(null), i = /* @__PURE__ */ z(!1), s = /* @__PURE__ */ z(""), o = /* @__PURE__ */ z(null), l = /* @__PURE__ */ z(null), u = /* @__PURE__ */ z(wt({ columns: 24, rowHeight: 8, snap: !0 })), c = /* @__PURE__ */ z(!0), d = null, v = null, f = null;
  const p = () => m(n).pages.find((_) => _.id === m(r));
  function h() {
    O(i, (d == null ? void 0 : d.hasDraft()) || (v == null ? void 0 : v.hasDraft()) || !1, !0);
  }
  const w = [], x = [];
  let T = null;
  function N() {
    return JSON.stringify({ page: d.data, site: v.data });
  }
  function D(_) {
    _ === T && (_.startsWith("edit:") || _ === "grid") || (w.push(N()), w.length > 50 && w.shift(), x.length = 0, T = _);
  }
  function te(_) {
    const { page: g, site: E } = JSON.parse(_);
    d.replace(g), v.replace(E), d.save(), v.save(), O(u, { snap: !0, ...v.data.grid }, !0), h(), f == null || f.sendSite(v.data), f == null || f.sendPage(m(r), d.data);
  }
  function Te() {
    w.length && (x.push(N()), te(w.pop()), T = null, O(s, "Angret"));
  }
  function pe() {
    x.length && (w.push(N()), te(x.pop()), T = null, O(s, "Gjentatt"));
  }
  function $e(_) {
    if (!(_.ctrlKey || _.metaKey) || _.key.toLowerCase() !== "z") return;
    const g = _.target;
    g instanceof HTMLElement && (g.isContentEditable || g.tagName === "TEXTAREA" || g.tagName === "INPUT" && !["number", "checkbox", "range"].includes(g.type)) || (_.preventDefault(), _.shiftKey ? pe() : Te());
  }
  async function Pe() {
    O(n, await (await fetch("/content/site.json")).json(), !0), v = Rr("urd-draft-site", () => m(n)), O(u, { snap: !0, ...v.data.grid }, !0), await ir(new URLSearchParams(location.search).get("page") ?? m(n).pages[0].id), await rr();
  }
  let L = /* @__PURE__ */ z(!1);
  function Ct(_, g) {
    D("grid"), O(u, { ...m(u), [_]: g }, !0), v.data.grid = { ...v.data.grid, [_]: g }, v.save(), h(), f == null || f.sendSite(v.data), m(L) && (f == null || f.sendShowGrid(!0));
  }
  function En(_) {
    O(L, _.target.open, !0), f == null || f.sendShowGrid(m(L));
  }
  async function rr() {
    try {
      const _ = await fetch("/api/github/me");
      O(l, _.ok ? await _.json() : null, !0);
    } catch {
      O(l, null);
    }
  }
  async function ir(_) {
    O(r, _, !0);
    const g = p(), E = await (await fetch(`/${g.file}`)).json(), k = Rl(E, v.data);
    d = Rr(`urd-draft-${_}`, () => k), w.length = 0, x.length = 0, T = null, h(), O(s, "");
  }
  function xi() {
    f == null || f.destroy(), f = Ol(m(o), {
      onEdit: Ti,
      onMove: Ai,
      onDelete: Pi,
      onAddSection: Mi,
      onMoveSection: Ni,
      onDeleteSection: Ii,
      onSectionSize: Oi,
      onUndo: (_) => _.redo ? pe() : Te()
    }), v.hasDraft() && f.sendSite(v.data), d.hasDraft() && f.sendPage(m(r), d.data), m(c) || f.sendChrome(!1);
  }
  function sr() {
    O(c, !m(c)), f == null || f.sendChrome(m(c));
  }
  function Ti(_) {
    const g = d.data.sections.find((k) => k.id === _.sectionId), E = g == null ? void 0 : g.blocks.find((k) => k.id === _.blockId);
    E && (D(`edit:${_.blockId}`), E.props = _.props, d.save(), h(), O(s, ""));
  }
  function Ai(_) {
    const g = d.data.sections.find((k) => k.id === _.sectionId), E = g == null ? void 0 : g.blocks.find((k) => k.id === _.blockId);
    E && (D("move-block"), E.frames.desktop = _.frame, d.save(), h());
  }
  function Mi(_) {
    D("add-section"), d.data.sections.splice(_.index, 0, _.section), d.save(), h(), f == null || f.sendPage(m(r), d.data);
  }
  function Ni(_) {
    const g = d.data.sections, E = g.findIndex((V) => V.id === _.sectionId), k = E + _.dir;
    E < 0 || k < 0 || k >= g.length || (D("move-section"), [g[E], g[k]] = [g[k], g[E]], d.save(), h(), f == null || f.sendPage(m(r), d.data));
  }
  function Ii(_) {
    D("delete-section"), d.data.sections = d.data.sections.filter((g) => g.id !== _.sectionId), d.save(), h(), f == null || f.sendPage(m(r), d.data);
  }
  function Oi(_) {
    const g = d.data.sections.find((E) => E.id === _.sectionId);
    g && (D("section-size"), g.size = { ...g.size, minHeight: _.minHeight }, d.save(), h());
  }
  function Pi(_) {
    const g = d.data.sections.find((E) => E.id === _.sectionId);
    g && (D("delete-block"), g.blocks = g.blocks.filter((E) => E.id !== _.blockId), d.save(), h(), f == null || f.sendSection(m(r), g));
  }
  const Di = {
    text: {
      type: "text",
      props: { html: "<p>Ny tekst</p>", align: "left" },
      w: 33,
      h: 28
    },
    button: {
      type: "button",
      props: { label: "Ny knapp", page: null, href: "#", style: "primary" },
      w: 20,
      h: 36
    },
    "shape-line": {
      type: "shape",
      props: { kind: "line", color: "accent", thickness: 2, fill: null },
      w: 25,
      h: 8
    },
    "shape-arrow": {
      type: "shape",
      props: { kind: "arrow", color: "accent", thickness: 2, fill: null },
      w: 25,
      h: 16
    },
    "shape-circle": {
      type: "shape",
      props: { kind: "circle", color: "accent", thickness: 2, fill: null },
      w: 10,
      h: 110
    },
    "shape-rect": {
      type: "shape",
      props: { kind: "rect", color: "accent", thickness: 2, fill: null },
      w: 20,
      h: 110
    },
    "shape-triangle": {
      type: "shape",
      props: { kind: "triangle", color: "accent", thickness: 2, fill: null },
      w: 10,
      h: 110
    }
  };
  function Ye(_, g) {
    var W;
    D("add-block");
    const E = d.data.sections[0], k = Di[_], V = Math.max(0, ...E.blocks.map((He) => He.frames.desktop.y + He.frames.desktop.h));
    E.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: k.type,
      version: 1,
      props: structuredClone(k.props),
      animation: null,
      frames: {
        desktop: { x: 4, y: V + 8, w: k.w, h: k.h, z: 1, rot: 0 },
        mobile: null
      }
    }), d.save(), h(), f == null || f.sendSection(m(r), E), (W = g == null ? void 0 : g.target.closest("details")) == null || W.removeAttribute("open");
  }
  function Ri() {
    D("discard");
    const _ = d.reset(), g = v.reset();
    O(u, { snap: !0, ...g.grid }, !0), h(), O(s, ""), f == null || f.sendSite(g), f == null || f.sendPage(m(r), _);
  }
  async function Ci() {
    var V, W;
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
    const E = { message: `Oppdater ${_.title} via Urd-admin`, files: g };
    let k = null;
    try {
      k = await fetch("/api/github/commit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(E)
      });
    } catch {
    }
    k != null && k.ok ? (localStorage.removeItem(`urd-draft-${m(r)}`), localStorage.removeItem("urd-draft-site"), O(s, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), O(i, !1)) : (k == null ? void 0 : k.status) === 401 ? (O(s, "Du må logge inn med GitHub for å publisere."), await rr()) : (k == null ? void 0 : k.status) === 403 ? O(s, ((V = await k.json().catch(() => null)) == null ? void 0 : V.error) ?? "Du har ikke publiseringstilgang.", !0) : k ? O(s, ((W = await k.json().catch(() => null)) == null ? void 0 : W.error) ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : O(s, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
  }
  Pe();
  var lr = Vl();
  Nn("keydown", Gn, $e);
  var or = K(lr);
  {
    var qi = (_) => {
      var g = Cl();
      $("click", g, sr), ge(_, g);
    };
    We(or, (_) => {
      m(c) || _(qi);
    });
  }
  var xn = R(or, 2);
  let ar;
  var fr = R(K(xn), 2);
  {
    var Li = (_) => {
      var g = Ll();
      wl(g, 21, () => m(n).pages, _l, (k, V) => {
        var W = ql(), He = K(W), Ge = {};
        Je(() => {
          Lt(He, m(V).title), Ge !== (Ge = m(V).id) && (W.value = (W.__value = m(V).id) ?? "");
        }), ge(k, W);
      });
      var E;
      Sl(g), Je(() => {
        E !== (E = m(r)) && (g.value = (g.__value = m(r)) ?? "", Ei(g, m(r)));
      }), $("change", g, (k) => ir(k.target.value)), ge(_, g);
    };
    We(fr, (_) => {
      m(n) && _(Li);
    });
  }
  var ur = R(fr, 2);
  {
    var Fi = (_) => {
      var g = Fl(), E = Er(g), k = K(E), V = R(k, 2), W = R(V, 2), He = R(K(W), 2), Ge = K(He), ht = R(Ge, 2), qt = R(ht, 2), _e = R(qt, 2), Ae = R(_e, 2), rn = R(E, 2), Ki = R(K(rn), 2), hr = K(Ki), vr = R(K(hr)), pr = R(hr, 2), _r = R(K(pr)), gr = R(pr, 2), wr = K(gr), $i = R(gr, 2), Yi = K($i);
      Je(
        (F) => {
          Pr(vr, m(u).columns), Pr(_r, m(u).rowHeight), Al(wr, m(u).snap !== !1), Lt(Yi, `Gridet er kun hjelpelinjer: det styrer hva blokker snapper til når du
            drar, og å endre det flytter ALDRI noe som allerede står på siden.
            Bredden deles i kolonner (flere = finere sideveis), høyden går i rader
            på et fast antall piksler (lavere = finere opp/ned). Én rute er nå ca.
            ${F ?? ""} × ${m(u).rowHeight ?? ""} px.`);
        },
        [
          () => {
            var F;
            return Math.round((((F = m(o)) == null ? void 0 : F.clientWidth) ?? 1280) / m(u).columns);
          }
        ]
      ), $("click", k, () => Ye("text")), $("click", V, () => Ye("button")), $("click", Ge, (F) => Ye("shape-line", F)), $("click", ht, (F) => Ye("shape-arrow", F)), $("click", qt, (F) => Ye("shape-circle", F)), $("click", _e, (F) => Ye("shape-rect", F)), $("click", Ae, (F) => Ye("shape-triangle", F)), Nn("toggle", rn, En), $("change", vr, (F) => Ct("columns", Math.max(4, Math.min(100, Number(F.target.value) || 24)))), $("change", _r, (F) => Ct("rowHeight", Math.max(2, Math.min(64, Number(F.target.value) || 8)))), $("change", wr, (F) => Ct("snap", F.target.checked)), ge(_, g);
    };
    We(ur, (_) => {
      m(n) && _(Fi);
    });
  }
  var cr = R(ur, 2);
  {
    var ji = (_) => {
      var g = jl();
      ge(_, g);
    };
    We(cr, (_) => {
      m(i) && _(ji);
    });
  }
  var dr = R(cr, 2), Hi = K(dr), Gi = R(dr, 4);
  {
    var Ui = (_) => {
      var g = Ul(), E = Er(g), k = K(E), V = R(E, 2);
      {
        var W = (_e) => {
          var Ae = Hl(), rn = K(Ae);
          Je(() => {
            ln(Ae, "title", m(l).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Lt(rn, `${m(l).allowed ? "" : "⚠ "}${m(l).login ?? ""}`);
          }), ge(_e, Ae);
        }, He = (_e) => {
          var Ae = Gl();
          ge(_e, Ae);
        };
        We(V, (_e) => {
          var Ae;
          (Ae = m(l)) != null && Ae.loggedIn ? _e(W) : m(l) && _e(He, 1);
        });
      }
      var Ge = R(V, 2), ht = R(Ge, 2), qt = R(ht, 2);
      Je(
        (_e) => {
          ln(E, "title", m(c) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), Lt(k, m(c) ? "👁 Ren visning" : "✏ Rediger"), ln(Ge, "href", _e), ht.disabled = !m(i), qt.disabled = !m(i);
        },
        [() => p().path]
      ), $("click", E, sr), $("click", ht, Ri), $("click", qt, Ci), ge(_, g);
    };
    We(Gi, (_) => {
      m(n) && _(Ui);
    });
  }
  var zi = R(xn, 2);
  {
    var Bi = (_) => {
      var g = zl();
      Nl(g, (E) => O(o, E), () => m(o)), Je(() => ln(g, "src", `/?page=${m(r)}&preview=1`)), Nn("load", g, xi), ge(_, g);
    }, Vi = (_) => {
      var g = Bl();
      ge(_, g);
    };
    We(zi, (_) => {
      m(n) ? _(Bi) : _(Vi, -1);
    });
  }
  Je(() => {
    ar = kl(xn, 1, "topbar svelte-1n46o8q", null, ar, { hidden: !m(c) }), Lt(Hi, m(s));
  }), ge(e, lr), Vr();
}
fl(["click", "change"]);
const Jl = dl(Kl, { target: document.getElementById("urd-admin") });
export {
  Jl as default
};
