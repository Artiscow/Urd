//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible, d = () => {};
function f(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function p() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function m(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, E = 65536, ee = 1 << 21, te = 1 << 22, ne = 1 << 23, re = Symbol("$state"), D = Symbol("legacy props"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), O = Symbol("text"), ce = Symbol("form reset"), le = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ue = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function de() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function fe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function pe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function me() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function he(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ge() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _e(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ve() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ye() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function be() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function xe() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var k = {}, Se = Symbol("uninitialized"), Ce = "http://www.w3.org/1999/xhtml", we = "http://www.w3.org/2000/svg", Te = "http://www.w3.org/1998/Math/MathML";
function A() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ee(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function De() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Oe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var j = !1;
function ke(e) {
	j = e;
}
var M;
function Ae(e) {
	if (e === null) throw Ee(), k;
	return M = e;
}
function je() {
	return Ae(/* @__PURE__ */ dn(M));
}
function N(e) {
	if (j) {
		if (/* @__PURE__ */ dn(M) !== null) throw Ee(), k;
		M = e;
	}
}
function P(e = 1) {
	if (j) {
		for (var t = e, n = M; t--;) n = /* @__PURE__ */ dn(n);
		M = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = M;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ dn(n);
		e && n.remove(), n = i;
	}
}
function Ne(e) {
	if (!e || e.nodeType !== 8) throw Ee(), k;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Pe(e) {
	return e === this.v;
}
function Fe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ie(e) {
	return !Fe(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Le = [];
function Re(e, t = !1, n = !1) {
	return ze(e, /* @__PURE__ */ new Map(), "", Le, null, n);
}
function ze(t, n, r, i, a = null, o = !1) {
	if (typeof t == "object" && t) {
		var c = n.get(t);
		if (c !== void 0) return c;
		if (t instanceof Map) return new Map(t);
		if (t instanceof Set) return new Set(t);
		if (e(t)) {
			var u = Array(t.length);
			n.set(t, u), a !== null && n.set(a, u);
			for (var d = 0; d < t.length; d += 1) {
				var f = t[d];
				d in t && (u[d] = ze(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = ze(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return ze(t.toJSON(), n, r, i, t);
	}
	if (t instanceof EventTarget) return t;
	try {
		return structuredClone(t);
	} catch {
		return t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var Be = null;
function Ve(e) {
	Be = e;
}
function He(e, t = !1, n) {
	Be = {
		p: Be,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: null
	};
}
function Ue(e) {
	var t = Be, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Be = t.p, e ?? {};
}
function We() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ge = [];
function Ke() {
	var e = Ge;
	Ge = [], f(e);
}
function qe(e) {
	if (Ge.length === 0 && !kt) {
		var t = Ge;
		queueMicrotask(() => {
			t === Ge && Ke();
		});
	}
	Ge.push(e);
}
function Je() {
	for (; Ge.length > 0;) Ke();
}
function Ye(e) {
	var t = G;
	if (t === null) return W.f |= ne, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Xe(e, t);
}
function Xe(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var Ze = ~(g | _ | h);
function Qe(e, t) {
	e.f = e.f & Ze | t;
}
function $e(e) {
	e.f & 512 || e.deps === null ? Qe(e, h) : Qe(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function et(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= E, et(t.deps));
}
function tt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), et(e.deps), Qe(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var nt = !1;
function rt(e) {
	var t = nt;
	try {
		return nt = !1, [e(), nt];
	} finally {
		nt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function it(e) {
	j && /* @__PURE__ */ un(e) !== null && fn(e);
}
var at = !1;
function ot() {
	at || (at = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ce]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function st(e) {
	var t = W, n = G;
	Gn(null), Kn(null);
	try {
		return e();
	} finally {
		Gn(t), Kn(n);
	}
}
function ct(e, t, n, r = n) {
	e.addEventListener(t, () => st(n));
	let i = e[ce];
	i ? e[ce] = () => {
		i(), r(!0);
	} : e[ce] = () => r(!0), ot();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function lt(e) {
	let t = 0, n = Jt(0), r;
	return () => {
		yn() && (K(n), En(() => (t === 0 && (r = pr(() => e(() => Qt(n)))), t += 1, () => {
			qe(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ut = S | C;
function dt(e, t, n, r) {
	new ft(e, t, n, r);
}
var ft = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = j ? M : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = lt(() => (this.#m = Jt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Dn(() => {
			if (j) {
				let e = this.#t;
				je();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ut), j && (this.#e = M);
	}
	#g() {
		try {
			this.#a = On(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = On(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = On(() => e(this.#e)), qe(() => {
			var e = this.#c = document.createDocumentFragment(), t = ln();
			e.append(t), this.#a = this.#x(() => On(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Fn(this.#o, () => {
				this.#o = null;
			}), this.#b(L));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = On(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = On(() => t(this.#e));
			} else this.#b(L);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		tt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = G, n = W, r = Be;
		Kn(this.#i), Gn(this.#i), Ve(this.#i.ctx);
		try {
			return Ft.ensure(), e();
		} catch (e) {
			return Ye(e), null;
		} finally {
			Kn(t), Gn(n), Ve(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Fn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, qe(() => {
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), K(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		L?.is_fork ? (this.#a && L.skip_effect(this.#a), this.#o && L.skip_effect(this.#o), this.#s && L.skip_effect(this.#s), L.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), j && (Ae(this.#t), P(), Ae(Me()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Oe();
				return;
			}
			r = !0, i && xe(), this.#s !== null && Fn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Xe(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return On(() => {
						var t = G;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Xe(e, this.#i.parent), null;
				}
			}));
		};
		qe(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Xe(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Xe(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function pt(e, t, n, r) {
	let i = We() ? _t : bt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = mt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Xe(e, s);
			}
			ht();
		}
	}
	var d = gt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ yt(e))).then(u).catch((e) => Xe(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), ht();
	}) : f();
}
function mt() {
	var e = G, t = W, n = Be, r = L;
	return function(i = !0) {
		Kn(e), Gn(t), Ve(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	Kn(null), Gn(null), Ve(null), e && L?.deactivate();
}
function gt() {
	var e = G, t = e.b, n = L, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | g;
	return G !== null && (G.f |= C), {
		ctx: Be,
		deps: null,
		effects: null,
		equals: Pe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Se,
		wv: 0,
		parent: G,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = G;
	r === null && de();
	var i = void 0, a = Jt(Se), o = !W, s = /* @__PURE__ */ new Set();
	return Tn(() => {
		var t = G, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== le && n.reject(e);
			}).finally(ht);
		} catch (e) {
			n.reject(e), ht();
		}
		var c = L;
		if (o) {
			if (t.f & 32768) var l = gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(vt);
			else for (let e of s.values()) e.reject(vt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= ne, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), bn(() => {
		for (let e of s) e.reject(vt);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function F(e) {
	let t = /* @__PURE__ */ _t(e);
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	let t = /* @__PURE__ */ _t(e);
	return t.equals = Ie, t;
}
function xt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Mn(t[n]);
	}
}
function St(e) {
	var t, n = G, r = e.parent;
	if (!Hn && r !== null && e.v !== Se && r.f & 24576) return A(), e.v;
	Kn(r);
	try {
		e.f &= ~E, xt(e), t = or(e);
	} finally {
		Kn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = rr(), (!L?.is_fork || e.deps === null) && (L === null ? e.v = t : (L.capture(e, t, !0), Et?.capture(e, t, !0)), e.deps === null))) {
		Qe(e, h);
		return;
	}
	Hn || (Dt === null ? $e(e) : (yn() || L?.is_fork) && Dt.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(le), t.ac = null;
	}), t.fn !== null && (t.teardown = d), cr(t, 0), An(t));
}
function I(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && lr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Tt = null, L = null, Et = null, Dt = null, Ot = null, kt = !1, At = !1, jt = null, Mt = null, Nt = 0, Pt = 1, Ft = class e {
	id = Pt++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		Tt === null ? Tt = this : (Tt.#n = this, this.#t = Tt), Tt = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) Qe(r, g), t(r);
			for (r of n.m) Qe(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Nt++ > 1e3 && (this.#x(), Lt());
		for (let e of this.#u) this.#d.delete(e), Qe(e, g), this.schedule(e);
		for (let e of this.#d) Qe(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = jt = [], r = [], i = Mt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (L = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (jt = null, Mt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
			i.length > 0 && L.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Et = this, zt(r), zt(n), Et = null, this.#s?.resolve();
		var s = L;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= h;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= h : i & 4 ? t.push(r) : ir(r) && (i & 16 && this.#d.add(r), lr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#v() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#y(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), Qe(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), L = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) tt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== Se && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Dt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		L = this;
	}
	deactivate() {
		L = null, Dt = null;
	}
	flush() {
		try {
			At = !0, L = this, this.#g();
		} finally {
			Nt = 0, Ot = null, jt = null, Mt = null, At = !1, L = null, Dt = null, Kt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(vt);
		this.#x(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, qe(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= p()).promise;
	}
	static ensure() {
		if (L === null) {
			let t = L = new e();
			!At && !kt && qe(() => {
				t.#e || t.flush();
			});
		}
		return L;
	}
	apply() {
		Dt = null;
	}
	schedule(e) {
		if (Ot = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (jt !== null && t === G && (W === null || !(W.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= h;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Tt = e : t.#t = e, this.linked = !1;
		}
	}
};
function It(e) {
	var t = kt;
	kt = !0;
	try {
		var n;
		for (e && (L !== null && !L.is_fork && L.flush(), n = e());;) {
			if (Je(), L === null) return n;
			L.flush();
		}
	} finally {
		kt = t;
	}
}
function Lt() {
	try {
		ge();
	} catch (e) {
		Xe(e, Ot);
	}
}
var Rt = null;
function zt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ir(r) && (Rt = /* @__PURE__ */ new Set(), lr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), Rt?.size > 0)) {
				Kt.clear();
				for (let e of Rt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Rt.has(n) && (Rt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || lr(n);
					}
				}
				Rt.clear();
			}
		}
		Rt = null;
	}
}
function Bt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Bt(i, t, n, r) : e & 4194320 && !(e & 2048) && Vt(i, t, r) && (Qe(i, g), Ht(i));
	}
}
function Vt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Vt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Ht(e) {
	L.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), Qe(e, h);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	Qe(e, h);
	for (var t = e.first; t !== null;) Wt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Gt = /* @__PURE__ */ new Set(), Kt = /* @__PURE__ */ new Map(), qt = !1;
function Jt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Pe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function R(e, t) {
	let n = Jt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Ie), r;
}
function z(e, t, n = !1) {
	return W !== null && (!Wn || W.f & 131072) && We() && W.f & 4325394 && (qn === null || !qn.has(e)) && be(), Xt(e, n ? en(t) : t, Mt);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Kt.set(e, Hn ? t : e.v);
		var r = Ft.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), Dt === null && $e(t);
		}
		e.wv = rr(), $t(e, g, n), We() && G !== null && G.f & 1024 && !(G.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && Gt.size > 0 && !qt && Zt();
	}
	return t;
}
function Zt() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && Qe(e, _);
		let t;
		try {
			t = ir(e);
		} catch {
			t = !0;
		}
		t && lr(e);
	}
	Gt.clear();
}
function Qt(e) {
	z(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = We(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === G)) {
			var l = (c & g) === 0;
			if (l && Qe(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				Dt?.delete(u), c & 65536 || (c & 512 && (G === null || !(G.f & 2097152)) && (s.f |= E), $t(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Rt !== null && Rt.add(d), n === null ? Ht(d) : n.push(d);
			}
		}
	}
}
function en(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ R(0), u = null, d = tr, f = (e) => {
		if (tr === d) return e();
		var t = W, n = tr;
		Gn(null), nr(d);
		var r = e();
		return Gn(t), nr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ R(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ve();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ R(n.value, u);
				return r.set(t, e), e;
			}) : z(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ R(Se, u));
					r.set(t, e), Qt(o);
				}
			} else z(n, Se), Qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ R(en(s ? e[n] : Se), u)), r.set(n, o)), o !== void 0) {
				var c = K(o);
				return c === Se ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = K(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== Se) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === re) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== Se || Reflect.has(e, t);
			return (n !== void 0 || G !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ R(i ? en(e[t]) : Se, u)), r.set(t, n)), K(n) === Se) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ R(Se, u)), r.set(d + "", p)) : z(p, Se);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ R(void 0, u)), z(c, en(n)), r.set(t, c));
			else {
				l = c.v !== Se;
				var m = f(() => en(n));
				z(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && z(g, _ + 1);
				}
				Qt(o);
			}
			return !0;
		},
		ownKeys(e) {
			K(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== Se;
			});
			for (var [n, i] of r) i.v !== Se && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			ye();
		}
	});
}
function tn(e) {
	try {
		if (typeof e == "object" && e && re in e) return e[re];
	} catch {}
	return e;
}
function nn(e, t) {
	return Object.is(tn(e), tn(t));
}
var rn, an, on, sn;
function cn() {
	if (rn === void 0) {
		rn = window, an = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		on = a(t, "firstChild").get, sn = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[O] = void 0);
	}
}
function ln(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
function B(e, t) {
	if (!j) return /* @__PURE__ */ un(e);
	var n = /* @__PURE__ */ un(M);
	if (n === null) n = M.appendChild(ln());
	else if (t && n.nodeType !== 3) {
		var r = ln();
		return n?.before(r), Ae(r), r;
	}
	return t && hn(n), Ae(n), n;
}
function V(e, t = !1) {
	if (!j) {
		var n = /* @__PURE__ */ un(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ dn(n) : n;
	}
	if (t) {
		if (M?.nodeType !== 3) {
			var r = ln();
			return M?.before(r), Ae(r), r;
		}
		hn(M);
	}
	return M;
}
function H(e, t = 1, n = !1) {
	let r = j ? M : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ dn(r);
	if (!j) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = ln();
			return r === null ? i?.after(a) : r.before(a), Ae(a), a;
		}
		hn(r);
	}
	return Ae(r), r;
}
function fn(e) {
	e.textContent = "";
}
function pn() {
	return !1;
}
function mn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function hn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function gn(e) {
	G === null && (W === null && he(e), me()), Hn && pe(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Be,
		deps: null,
		nodes: null,
		f: e | g | 512,
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
	L?.register_created_effect(r);
	var i = r;
	if (e & 4) jt === null ? Ft.ensure().schedule(r) : jt.push(r);
	else if (t !== null) {
		try {
			lr(r);
		} catch (e) {
			throw Mn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && _n(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return W !== null && !Wn;
}
function bn(e) {
	let t = vn(8, null);
	return Qe(t, h), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = G.f;
	if (!W && t & 32 && Be !== null && !Be.i) {
		var n = Be;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | w, e);
}
function Cn(e) {
	Ft.ensure();
	let t = vn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Fn(t, () => {
			Mn(t), n(void 0);
		}) : (Mn(t), n(void 0));
	});
}
function wn(e) {
	return vn(4, e);
}
function Tn(e) {
	return vn(te | C, e);
}
function En(e, t = 0) {
	return vn(8 | t, e);
}
function U(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(K));
		});
	});
}
function Dn(e, t = 0) {
	return vn(16 | t, e);
}
function On(e) {
	return vn(32 | C, e);
}
function kn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Hn, n = W;
		Un(!0), Gn(null);
		try {
			t.call(null);
		} finally {
			Un(e), Gn(n);
		}
	}
}
function An(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && st(() => {
			e.abort(le);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Mn(n, t), n = r;
	}
}
function jn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Mn(t), t = n;
	}
}
function Mn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Nn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, An(e, t && !n), cr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	kn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Nn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ dn(e);
		e.remove(), e = n;
	}
}
function Pn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Fn(e, t, n = !0) {
	var r = [];
	In(e, r, !0);
	var i = () => {
		n && Mn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function In(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				In(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Ln(e) {
	Rn(e, !0);
}
function Rn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (Qe(e, g), Ft.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Rn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function zn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ dn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Bn = null, Vn = !1, Hn = !1;
function Un(e) {
	Hn = e;
}
var W = null, Wn = !1;
function Gn(e) {
	W = e;
}
var G = null;
function Kn(e) {
	G = e;
}
var qn = null;
function Jn(e) {
	W !== null && (qn ??= /* @__PURE__ */ new Set()).add(e);
}
var Yn = null, Xn = 0, Zn = null;
function Qn(e) {
	Zn = e;
}
var $n = 1, er = 0, tr = er;
function nr(e) {
	tr = e;
}
function rr() {
	return ++$n;
}
function ir(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ir(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && Dt === null && Qe(e, h);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? Qe(a, g) : a.f & 1024 && Qe(a, _), Ht(a));
	}
}
function or(e) {
	var t = Yn, n = Xn, r = Zn, i = W, a = qn, o = Be, s = Wn, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, W = l & 96 ? null : e, qn = null, Ve(e.ctx), Wn = !1, tr = ++er, e.ac !== null && (st(() => {
		e.ac.abort(le);
	}), e.ac = null);
	try {
		e.f |= ee;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = L?.is_fork;
		if (Yn !== null) {
			var m;
			if (p || cr(e, Xn), f !== null && Xn > 0) for (f.length = Xn + Yn.length, m = 0; m < Yn.length; m++) f[Xn + m] = Yn[m];
			else e.deps = f = Yn;
			if (yn() && e.f & 512) for (m = Xn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Xn < f.length && (cr(e, Xn), f.length = Xn);
		if (We() && Zn !== null && !Wn && f !== null && !(e.f & 6146)) for (m = 0; m < Zn.length; m++) ar(Zn[m], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Ye(e);
	} finally {
		e.f ^= ee, Yn = t, Xn = n, Zn = r, W = i, qn = a, Ve(o), Wn = s, tr = c;
	}
}
function sr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Yn === null || !n.call(Yn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== Se && $e(s), s.ac !== null && st(() => {
			s.ac.abort(le), s.ac = null;
		}), wt(s), cr(s, 0);
	}
}
function cr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) sr(e, n[r]);
}
function lr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Qe(e, h);
		var n = G, r = Vn;
		G = e, Vn = (t & 96) == 0;
		try {
			t & 16777232 ? jn(e) : An(e), kn(e);
			var i = or(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = $n;
		} finally {
			Vn = r, G = n;
		}
	}
}
async function ur() {
	await Promise.resolve(), It();
}
function K(e) {
	var t = (e.f & 2) != 0;
	if (Bn?.add(e), W !== null && !Wn && !(G !== null && G.f & 16384) && (qn === null || !qn.has(e))) {
		var r = W.deps;
		if (W.f & 2097152) e.rv < er && (e.rv = er, Yn === null && r !== null && r[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			W.deps ??= [], n.call(W.deps, e) || W.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [W] : n.call(i, W) || i.push(W);
		}
	}
	if (Hn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Hn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || fr(a)) && (o = St(a)), Kt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Wn && W !== null && (Vn || (W.f & 512) != 0), c = (a.f & b) === 0;
		ir(a) && (s && (a.f |= 512), Ct(a)), s && !c && (I(a), dr(a));
	}
	if (Dt?.has(e)) return Dt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function dr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (I(t), dr(t));
}
function fr(e) {
	if (e.v === Se) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && fr(t)) return !0;
	return !1;
}
function pr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var mr = ["touchstart", "touchmove"];
function hr(e) {
	return mr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var gr = Symbol("events"), _r = /* @__PURE__ */ new Set(), vr = /* @__PURE__ */ new Set();
function yr(e) {
	if (!j) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function br(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || wr.call(t, e), !e.cancelBubble) return st(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? qe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function xr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = br(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && bn(() => {
		t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[gr] ??= {})[e] = n;
}
function Sr(e) {
	for (var t = 0; t < e.length; t++) _r.add(e[t]);
	for (var n of vr) n(e);
}
var Cr = null;
function wr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Cr = e;
	var s = 0, c = Cr === e && e[gr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[gr] = t;
			return;
		}
		var u = a.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== t) {
		i(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || n;
			}
		});
		var d = W, f = G;
		Gn(null), Kn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[gr]?.[r];
					h != null && (!o.disabled || e.target === o) && h.call(o, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				s++, o = s < a.length ? a[s] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[gr] = t, delete e.currentTarget, Gn(d), Kn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Tr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Er(e) {
	return Tr?.createHTML(e) ?? e;
}
function Dr(e) {
	var t = mn("template");
	return t.innerHTML = Er(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Or(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function J(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (j) return Or(M, null), M;
		i === void 0 && (i = Dr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ un(i)));
		var t = r || an ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ un(t), s = t.lastChild;
			Or(o, s);
		} else Or(t, t);
		return t;
	};
}
function kr(e = "") {
	if (!j) {
		var t = ln(e + "");
		return Or(t, t), t;
	}
	var n = M;
	return n.nodeType === 3 ? hn(n) : (n.before(n = ln()), Ae(n)), Or(n, n), n;
}
function Ar() {
	if (j) return Or(M, null), M;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = ln();
	return e.append(t, n), Or(t, n), e;
}
function Y(e, t) {
	if (j) {
		var n = G;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = M), je();
		return;
	}
	e !== null && e.before(t);
}
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[O] ??= e.nodeValue) && (e[O] = n, e.nodeValue = `${n}`);
}
function jr(e, t) {
	return Nr(e, t);
}
var Mr = /* @__PURE__ */ new Map();
function Nr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	cn();
	var l = void 0, u = Cn(() => {
		var s = n ?? t.appendChild(ln());
		dt(s, { pending: () => {} }, (t) => {
			He({});
			var n = Be;
			if (o && (n.c = o), a && (i.$$events = a), j && Or(t, null), l = e(t, i) || {}, j && (G.nodes.end = M, M === null || M.nodeType !== 8 || M.data !== "]")) throw Ee(), k;
			Ue();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = hr(r);
					for (let e of [t, document]) {
						var a = Mr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Mr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, wr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(_r)), vr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Mr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, wr), r.delete(e), r.size === 0 && Mr.delete(n)) : r.set(e, i);
			}
			vr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Pr.set(l, u), l;
}
var Pr = /* @__PURE__ */ new WeakMap(), Fr = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) Ln(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Ln(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Mn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						zn(r, t), t.append(ln()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Mn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Fn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Mn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = L, r = pn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = ln();
			i.append(a), this.#n.set(e, {
				effect: On(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, On(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else j && (this.anchor = M), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Z(e, t, n = !1) {
	var r;
	j && (r = M, je());
	var i = new Fr(e), a = n ? S : 0;
	function o(e, t) {
		if (j) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				Ae(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Dn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ir(e, t) {
	return t;
}
function Lr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Fn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Rr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			fn(d), d.append(u), e.items.clear();
		}
		Rr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Rr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, zn(a, document.createDocumentFragment())) : Mn(t[i], n);
	}
}
var zr;
function Br(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = j ? Ae(/* @__PURE__ */ un(u)) : u.appendChild(ln());
	}
	j && je();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Hr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Wr(d, null, c)) : Ln(d) : Fn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Dn(() => {
			p = K(f);
			var e = p.length;
			let t = !1;
			j && Ne(c) === "[!" != (e === 0) && (c = Me(), Ae(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = L, v = pn(), y = 0; y < e; y += 1) {
				j && M.nodeType === 8 && M.data === "]" && (c = M, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Ur(l, h ? c : zr ??= ln(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = On(() => s(c)) : (d = On(() => s(zr ??= ln())), d.f |= T)), e > r.size && fe("", "", ""), j && e > 0 && Ae(Me()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && ke(!0), K(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, j && (c = M);
}
function Vr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Hr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Vr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Ln(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Wr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Gr(e, d, _), Gr(e, _, y), Wr(_, y, n), d = _, p = [], m = [], l = Vr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Wr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Gr(e, S.prev, C.next), Gr(e, d, S), Gr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Wr(_, l, n), Gr(e, _.prev, _.next), Gr(e, _, d === null ? e.effect.first : d.next), Gr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Vr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Vr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Rr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Vr(l.next);
		var E = w.length;
		if (E > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.fix();
			}
			Lr(e, w, ee);
		}
	}
	o && qe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Ur(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
	return {
		v: c,
		i: l,
		e: On(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Wr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ dn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Gr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Kr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		j && (o = Ae(/* @__PURE__ */ un(c)));
	}
	U(() => {
		var e = G;
		if (s === (s = t() ?? "")) {
			j && je();
			return;
		}
		if (n && !j) {
			e.nodes = null, c.innerHTML = s, s !== "" && Or(/* @__PURE__ */ un(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Nn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (j) {
				for (var a = M.data, l = je(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ dn(l);
				if (l === null) throw Ee(), k;
				Or(M, u), o = Ae(l);
				return;
			}
			var d = mn(r ? "svg" : i ? "math" : "template", r ? we : i ? Te : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Or(/* @__PURE__ */ un(f), f.lastChild), r || i) for (; /* @__PURE__ */ un(f);) o.before(/* @__PURE__ */ un(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var qr = [..." 	\n\r\f\xA0\v﻿"];
function Jr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || qr.includes(r[o - 1])) && (s === r.length || qr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Yr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Xr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Zr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Xr)), i && c.push(...Object.keys(i).map(Xr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Xr(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Yr(r)), i && (n += Yr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Qr(e, t, n, r, i, a) {
	var o = e[oe];
	if (j || o !== n || o === void 0) {
		var s = Jr(n, r, a);
		(!j || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function $r(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ei(e, t, n, r) {
	var i = e[se];
	if (j || i !== t) {
		var a = Zr(t, r);
		(!j || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? ($r(e, n?.[0], r[0]), $r(e, n?.[1], r[1], "important")) : $r(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ti(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return De();
		for (var i of t.options) i.selected = n.includes(ii(i));
		return;
	}
	for (i of t.options) if (nn(ii(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function ni(e) {
	var t = new MutationObserver(() => {
		ti(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), bn(() => {
		t.disconnect();
	});
}
function ri(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	ct(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ii);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ii(o);
		}
		n(a), e.__value = a, L !== null && r.add(L);
	}), wn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = L;
			if (r.has(o)) return;
		}
		if (ti(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ii(s), n(a));
		}
		e.__value = a, i = !1;
	}), ni(e);
}
function ii(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ai = Symbol("is custom element"), oi = Symbol("is html"), si = ue ? "link" : "LINK", ci = ue ? "progress" : "PROGRESS";
function Q(e) {
	if (j) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ui(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ui(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ce] = n, qe(n), ot();
	}
}
function $(e, t) {
	var n = di(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ci) || (e.value = t ?? "");
}
function li(e, t) {
	var n = di(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ui(e, t, n, r) {
	var i = di(e);
	j && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === si) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && pi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function di(e) {
	return e[ae] ??= {
		[ai]: e.nodeName.includes("-"),
		[oi]: e.namespaceURI === Ce
	};
}
var fi = /* @__PURE__ */ new Map();
function pi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = fi.get(t);
	if (n) return n;
	fi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function mi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ct(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = hi(e) ? gi(a) : a, n(a), L !== null && r.add(L), await ur(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (j && e.defaultValue !== e.value || pr(t) == null && e.value) && (n(hi(e) ? gi(e.value) : e.value), L !== null && r.add(L)), En(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = L;
			if (r.has(i)) return;
		}
		hi(e) && n === gi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function hi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function gi(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function _i(e, t) {
	return e === t || e?.[re] === t;
}
function vi(e = {}, t, n, r) {
	var i = Be.r, a = G;
	return wn(() => {
		var o, s;
		return En(() => {
			o = s, s = r?.() || [], pr(() => {
				_i(n(...s), e) || (t(e, ...s), o && _i(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && _i(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function yi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), K(u)) : (l && (l = !1, c = s ? pr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || D in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = rt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && _e(t), f(m)));
	var g = i ? () => {
		var n = e[t];
		return n === void 0 ? d() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (i && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? _t : bt)(() => (v = !1, g()));
	o && K(y);
	var b = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? K(y) : i && o ? en(e) : e;
			return z(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : K(y);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function bi(e, t) {
	let n = t(), r = JSON.stringify(n), i = JSON.parse(r), a = localStorage.getItem(e);
	if (a) try {
		i = JSON.parse(a);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return i;
		},
		save() {
			let t = JSON.stringify(i);
			t === r ? localStorage.removeItem(e) : localStorage.setItem(e, t);
		},
		reset() {
			return localStorage.removeItem(e), i = JSON.parse(r), i;
		},
		replace(e) {
			return i = e, i;
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var xi = /* @__PURE__ */ J("<button type=\"button\"></button>"), Si = /* @__PURE__ */ J("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ J("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), wi = /* @__PURE__ */ J("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ti = /* @__PURE__ */ J("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/></span> <!> <!></div>"), Ei = /* @__PURE__ */ J("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Di(e, t) {
	He(t, !0);
	let n = yi(t, "value", 3, "#000000"), r = yi(t, "tokens", 19, () => []), i = yi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, s = () => r().find(([e]) => e === n())?.[0] ?? null, c = /* @__PURE__ */ R(en([])), l = "", u = "", d = /* @__PURE__ */ R(null), f = /* @__PURE__ */ R(!1), p = /* @__PURE__ */ R(en({
		top: 0,
		left: 0
	})), h = /* @__PURE__ */ R(0), g = /* @__PURE__ */ R(0), _ = /* @__PURE__ */ R(1), v = /* @__PURE__ */ R("#000000");
	function y(e) {
		let t = /^#?([0-9a-f]{6})$/i.exec(String(e).trim());
		if (!t) return null;
		let n = parseInt(t[1], 16);
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	}
	let b = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function x(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function S(e, t, n) {
		let r = n * t, i = r * (1 - Math.abs(e / 60 % 2 - 1)), a = n - r, [o, s, c] = e < 60 ? [
			r,
			i,
			0
		] : e < 120 ? [
			i,
			r,
			0
		] : e < 180 ? [
			0,
			r,
			i
		] : e < 240 ? [
			0,
			i,
			r
		] : e < 300 ? [
			i,
			0,
			r
		] : [
			r,
			0,
			i
		];
		return [
			Math.round((o + a) * 255),
			Math.round((s + a) * 255),
			Math.round((c + a) * 255)
		];
	}
	function C() {
		return b(...S(K(h), K(g), K(_)));
	}
	function w() {
		z(v, C(), !0), u = K(v), t.onchange?.(K(v));
	}
	function T(e) {
		let t = y(e);
		return t ? (((e) => {
			var t = m(e, 3);
			z(h, t[0], !0), z(g, t[1], !0), z(_, t[2], !0);
		})(x(...t)), z(v, b(...t), !0), !0) : !1;
	}
	function E() {
		T(o()) || T("#000000"), l = n(), u = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			z(c, Array.isArray(e) ? e : [], !0);
		} catch {
			z(c, [], !0);
		}
		let e = K(d).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 236, window.innerWidth - 236 - 8)), r = e.bottom + 300 + 8 > window.innerHeight ? Math.max(8, e.top - 300 - 8) : e.bottom + 6;
		z(p, {
			top: r,
			left: t
		}, !0), z(f, !0);
	}
	function ee() {
		if (z(f, !1), u && u !== l) {
			let e = [u, ...K(c).filter((e) => e !== u)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function te(e, n) {
		T(n), z(v, n, !0), t.onchange?.(e);
	}
	function ne(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			z(g, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), z(_, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), w();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function re(e) {
		T(e.target.value) ? w() : z(v, C(), !0);
	}
	function D(e) {
		T(e) && w();
	}
	xn(() => {
		if (!K(f)) return;
		let e = (e) => {
			K(d) && !K(d).contains(e.target) && ee();
		}, t = (e) => {
			e.key === "Escape" && ee();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0);
		};
	});
	var ie = Ei(), ae = B(ie);
	let oe;
	var se = H(ae, 2), O = (e) => {
		var t = Ti(), i = B(t), a = B(i);
		N(i);
		var o = H(i, 2);
		Q(o);
		var l = H(o, 2), u = B(l), d = H(u, 2);
		Q(d), N(l);
		var f = H(l, 2), y = (e) => {
			var t = Si(), i = V(t), a = H(B(i)), o = (e) => {
				var t = kr();
				U((e) => X(t, `- koblet til «${e ?? ""}»`), [() => s()]), Y(e, t);
			}, c = /* @__PURE__ */ F(() => s());
			Z(a, (e) => {
				K(c) && e(o);
			}), N(i);
			var l = H(i, 2);
			Br(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ F(() => m(K(t), 2));
				let i = () => K(r)[0], a = () => K(r)[1];
				var o = xi();
				let s;
				U(() => {
					s = Qr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ei(o, `background: ${a() ?? ""}`), ui(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), q("click", o, () => te(i(), a())), Y(e, o);
			}), N(l), Y(e, t);
		};
		Z(f, (e) => {
			r().length && e(y);
		});
		var b = H(f, 2), x = (e) => {
			var t = wi(), n = H(V(t), 2);
			Br(n, 20, () => K(c), (e) => e, (e, t) => {
				var n = Ci();
				U(() => {
					ei(n, `background: ${t ?? ""}`), ui(n, "title", t);
				}), q("click", n, () => D(t)), Y(e, n);
			}), N(n), Y(e, t);
		};
		Z(b, (e) => {
			K(c).length && e(x);
		}), N(t), U(() => {
			ei(t, `top: ${K(p).top ?? ""}px; left: ${K(p).left ?? ""}px`), ei(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${K(h) ?? ""}, 100%, 50%)`), ei(a, `left: ${K(g) * 100}%; top: ${(1 - K(_)) * 100}%`), $(o, K(h)), ei(u, `background: ${K(v) ?? ""}`), $(d, K(v));
		}), q("pointerdown", i, ne), q("input", o, (e) => {
			z(h, Number(e.target.value), !0), w();
		}), q("change", d, re), Y(e, t);
	};
	Z(se, (e) => {
		K(f) && e(O);
	}), N(ie), vi(ie, (e) => z(d, e), () => K(d)), U((e, t, n) => {
		oe = Qr(ae, 1, "cp-swatch svelte-zxiloo", null, oe, e), ei(ae, `background: ${t ?? ""}`), ui(ae, "title", n), ui(ae, "aria-label", i());
	}, [
		() => ({ linked: s() }),
		() => o(),
		() => s() ? `${i()} (koblet til temafargen «${s()}»)` : i()
	]), q("click", ae, () => K(f) ? ee() : E()), Y(e, ie), Ue();
}
Sr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region src/lib/previewBridge.js
function Oi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n);
	};
	window.addEventListener("message", n);
	let r = (t) => e.contentWindow?.postMessage(t, location.origin);
	return {
		sendSection(e, t) {
			r({
				type: "urd-preview",
				pageId: e,
				section: t
			});
		},
		sendPage(e, t) {
			r({
				type: "urd-preview-full",
				pageId: e,
				page: t
			});
		},
		sendSite(e) {
			r({
				type: "urd-site",
				site: e
			});
		},
		sendChrome(e) {
			r({
				type: "urd-chrome",
				visible: e
			});
		},
		sendShowGrid(e) {
			r({
				type: "urd-show-grid",
				visible: e
			});
		},
		sendPlaceBlock(e) {
			r({
				type: "urd-place-block",
				block: e
			});
		},
		sendAttention(e, t) {
			r({
				type: "urd-attention",
				sectionId: e,
				needed: t
			});
		},
		sendDemoAnim(e, t = null) {
			r({
				type: "urd-demo-anim",
				sectionId: e,
				blockId: t
			});
		},
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
var ki = (e) => Math.round(e * 100) / 100;
function Ai(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ji = {
	1: (e, t) => {
		for (let n of e.sections ?? []) {
			let e = n.grid ?? t?.grid ?? {
				columns: 24,
				rowHeight: 8
			};
			for (let t of n.blocks ?? []) for (let n of ["desktop", "mobile"]) {
				let r = t.frames?.[n];
				r && (t.frames[n] = {
					...r,
					x: ki(r.x * 100 / e.columns),
					w: ki(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Ai(t.grid);
		return e;
	}
}, Mi = { 1: (e) => (e.grid = Ai(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Ni(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Mi[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Pi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ji[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/theme.js
function Fi(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var Ii = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Fi(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Li = {
	version: 1,
	label: "Gradient",
	defaults: () => ({
		stops: ["#0b0e14", "#1a1030"],
		angle: 160,
		animate: !1,
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		let n = t.stops.map(Fi).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, Ri = {
	version: 1,
	label: "Glød",
	defaults: () => ({
		x: .5,
		y: .3,
		color: "accent",
		radius: .5,
		opacity: .35
	}),
	migrations: {},
	render(e, t) {
		let n = Fi(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity);
	}
}, zi = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Bi = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = zi, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity);
	}
}, Vi = {
	version: 1,
	label: "Bilde",
	defaults: () => ({
		src: "",
		fit: "cover",
		x: .5,
		y: .5,
		opacity: 1,
		blur: 0
	}),
	migrations: {},
	render(e, t) {
		if (!t.src) return;
		let n = new Image();
		if (n.src = t.src, !n.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			n.addEventListener("load", t, { once: !0 }), n.addEventListener("error", t, { once: !0 });
		}
		e.style.backgroundImage = `url("${t.src}")`, t.fit === "repeat" ? (e.style.backgroundSize = "auto", e.style.backgroundRepeat = "repeat") : (e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundRepeat = "no-repeat"), e.style.backgroundPosition = `${(t.x ?? .5) * 100}% ${(t.y ?? .5) * 100}%`, e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	}
}, Hi = () => ({
	duration: 600,
	delay: 0
}), Ui = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Hi,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Hi,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Hi,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
};
typeof window < "u" && window.addEventListener("scroll", () => {}, {
	once: !0,
	passive: !0
});
//#endregion
//#region src/lib/imageTools.js
var Wi = 1600, Gi = .82, Ki = .6;
async function qi(e, t = Wi) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Gi);
	return c.size > 4e5 && (c = await s(Ki)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function Ji(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Yi(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var Xi = /* @__PURE__ */ J("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), Zi = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\"> </option>"), Qi = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), $i = /* @__PURE__ */ J("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ea = /* @__PURE__ */ J("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), ta = /* @__PURE__ */ J("<!> Ren visning", 1), na = /* @__PURE__ */ J("<!> Rediger", 1), ra = /* @__PURE__ */ J("<span class=\"who svelte-1n46o8q\"><!> </span>"), ia = /* @__PURE__ */ J("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), aa = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), oa = /* @__PURE__ */ J("<hr class=\"rail-sep svelte-1n46o8q\"/>"), sa = /* @__PURE__ */ J("<button> </button>"), ca = /* @__PURE__ */ J("<!> <!>", 1), la = /* @__PURE__ */ J("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), ua = /* @__PURE__ */ J("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), da = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), fa = /* @__PURE__ */ J("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), pa = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), ma = /* @__PURE__ */ J("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><select title=\"Font (Arv = temaets overskriftsfont)\" class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv</option><!></select> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), ha = /* @__PURE__ */ J("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), ga = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rekkefølge <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Bilde først</option><option class=\"svelte-1n46o8q\">Tekst først</option></select></label>"), _a = /* @__PURE__ */ J("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), va = /* @__PURE__ */ J("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <select class=\"nav-target svelte-1n46o8q\" title=\"Hvor lenken går\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), ya = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde</option><option class=\"svelte-1n46o8q\">Bilde + tekst</option></select></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Høyre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Venstre (etter logoen)</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsbilde i menyen og menypunkt-design kommer i en senere runde.</p></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div></details></div>"), ba = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), xa = /* @__PURE__ */ J("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), Sa = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>"), Ca = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; skaleres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Firkantet bilde anbefales.</p></div>"), wa = /* @__PURE__ */ J("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Ta = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ea = /* @__PURE__ */ J("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Da = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv fra tema</option><!></select></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Oa = /* @__PURE__ */ J("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), ka = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Aa = /* @__PURE__ */ J("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), ja = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Ma = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Tegn/emoji <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/></label> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Na = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Pa = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Fa = /* @__PURE__ */ J("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Ia = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), La = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ra = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), za = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ba = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Va = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ha = /* @__PURE__ */ J("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ua = /* @__PURE__ */ J("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), Wa = /* @__PURE__ */ J("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Ga = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Ka = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), qa = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), Ja = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), Ya = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Xa = /* @__PURE__ */ J("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Za = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Qa = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), $a = /* @__PURE__ */ J("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), eo = /* @__PURE__ */ J("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), to = /* @__PURE__ */ J("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), no = /* @__PURE__ */ J("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), ro = /* @__PURE__ */ J("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), io = /* @__PURE__ */ J("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), ao = /* @__PURE__ */ J("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <select class=\"admin-theme svelte-1n46o8q\" title=\"Adminens fargetema (kun editoren, ikke nettsiden din)\"></select> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!></div>");
function oo(e, t) {
	He(t, !0);
	let n = [
		["color", Ii],
		["gradient", Li],
		["glow", Ri],
		["image", Vi],
		["grain", Bi]
	], r = Object.fromEntries(n), i = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>"
	}, a = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], o = /* @__PURE__ */ R(en(localStorage.getItem("urd-admin-theme") ?? "graa"));
	xn(() => {
		document.documentElement.dataset.adminTheme = K(o), localStorage.setItem("urd-admin-theme", K(o));
	});
	let s = /* @__PURE__ */ R(null), c = /* @__PURE__ */ R(null), l = /* @__PURE__ */ R(!1), u = /* @__PURE__ */ R(""), d = /* @__PURE__ */ R("info"), f = 0;
	function p(e, t = "info") {
		z(u, e, !0), z(d, t, !0);
		let n = ++f;
		t === "ok" && setTimeout(() => {
			f === n && (z(u, ""), z(d, "info"));
		}, 8e3);
	}
	let h = /* @__PURE__ */ R(null), g = /* @__PURE__ */ R(null), _ = /* @__PURE__ */ R(en({
		size: 16,
		snap: !0
	})), v = /* @__PURE__ */ R(!0), y = /* @__PURE__ */ R("desktop"), b = /* @__PURE__ */ R(0);
	function x() {
		z(b, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function S(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, x(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ R(null);
	function ee() {
		z(E, w.data, !0), w.replace(K(E));
	}
	function te() {
		T?.sendSite(Re(K(E)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => K(E).pages.find((e) => e.id === K(c));
	function D() {
		let e = K(E)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		z(l, e || C?.hasDraft() && !ne.has(K(c)) || w?.hasDraft() || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			page: C.data,
			site: w.data
		});
	}
	function O(e) {
		e === oe && (e.startsWith("edit:") || e === "grid") || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function ce(e) {
		let { page: t, site: n } = JSON.parse(e);
		C.replace(t), w.replace(n), ee(), C.save(), w.save(), z(_, {
			snap: !0,
			...K(E).grid
		}, !0), D(), x(), Ce(), Ie(C.data.sections.find((e) => e.id === K(je))), te(), K(E).pages.some((e) => e.id === K(c)) ? T?.sendPage(K(c), C.data) : xt(K(E).pages[0].id);
	}
	function le() {
		ie.length && (ae.push(se()), ce(ie.pop()), oe = null, p("Angret"));
	}
	function ue() {
		ae.length && (ie.push(se()), ce(ae.pop()), oe = null, p("Gjentatt"));
	}
	function de(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ue() : le());
	}
	async function fe() {
		z(s, Ni(await (await fetch("/content/site.json")).json()), !0), w = bi("urd-draft-site", () => K(s)), w.replace(Ni(w.data)), w.save(), ee(), z(_, {
			snap: !0,
			...K(E).grid
		}, !0), await xt(new URLSearchParams(location.search).get("page") ?? K(E).pages[0].id), await ct(), ut(), K(E).site.title === "Min forening" && !localStorage.getItem("urd-setup-done") && (z(me, K(E).site.title, !0), z(he, K(E).theme.tokens.color.accent, !0), z(ge, K(E).theme.tokens.color.bg, !0), z(pe, !0));
	}
	let pe = /* @__PURE__ */ R(!1), me = /* @__PURE__ */ R(""), he = /* @__PURE__ */ R("#7c5cff"), ge = /* @__PURE__ */ R("#0b0e14");
	function _e() {
		localStorage.setItem("urd-setup-done", "1"), z(pe, !1);
	}
	function ve() {
		let e = K(me).trim();
		e && (I("setup", () => {
			K(E).site.title = e, K(E).nav.logo = {
				type: "text",
				value: e
			}, K(E).theme.tokens.color.accent = K(he), K(E).theme.tokens.color.bg = K(ge);
		}), _e(), p("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let ye = /* @__PURE__ */ R(null), be = [
		[
			"Sider",
			"Blokker",
			"Egenskaper",
			"Grid"
		],
		[
			"Tema",
			"Nav",
			"Footer"
		],
		["Historikk"]
	];
	function xe(e) {
		z(ye, K(ye) === e ? null : e, !0), T?.sendShowGrid(K(ye) === "Grid"), K(ye) === "Historikk" && ht();
	}
	let k = /* @__PURE__ */ R(null);
	function Se(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ce() {
		if (!K(k)) return;
		let { block: e } = Se(K(k).sectionId, K(k).blockId);
		if (!e) {
			z(k, null);
			return;
		}
		z(k, {
			sectionId: K(k).sectionId,
			blockId: K(k).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function we(e) {
		if (!e.blockId) {
			z(k, null);
			return;
		}
		z(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Ce();
	}
	function Te(e, t) {
		let { section: n, block: r } = Se(K(k)?.sectionId, K(k)?.blockId);
		r && (O(e), t(r, n), S(n, "blokk-endret"), C.save(), D(), T?.sendSection(K(c), n), Ce());
	}
	function A(e, t) {
		Te(`edit:${K(k).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function Ee(e, t) {
		Number.isFinite(t) && Te(`edit:frame-${K(k).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function De(e) {
		Te("decor", (t) => {
			t.decor = e;
		});
	}
	async function Oe(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qi(t);
			Te(`edit:${K(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ji(t.name).replaceAll("-", " ");
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let j = [
		["S", 14],
		["M", 18],
		["L", 24],
		["XL", 36]
	], ke = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, M = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Ae = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], je = /* @__PURE__ */ R(null), Me = /* @__PURE__ */ R(null), Ne = /* @__PURE__ */ R(""), Pe = /* @__PURE__ */ R(en([])), Fe = /* @__PURE__ */ R(null);
	function Ie(e) {
		z(Me, e?.grid ? { ...e.grid } : null, !0), z(Ne, e?.size?.minHeight ?? "", !0), z(Pe, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), z(Fe, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Le(e) {
		z(je, e.sectionId, !0), Ie(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function ze(e, t) {
		let n = C.data.sections.find((e) => e.id === K(je));
		n && (O(e), t(n), C.save(), D(), T?.sendSection(K(c), n), Ie(n));
	}
	let Be = /* @__PURE__ */ R("color");
	function Ve(e) {
		ze("bg", (t) => {
			t.background ??= {
				version: 1,
				layers: []
			}, t.background.layers.push({
				type: e,
				version: 1,
				props: r[e].defaults()
			});
		});
	}
	function We(e) {
		ze("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Ge(e, t) {
		let n = e + t;
		ze("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Ke(e, t, n) {
		ze(`edit:bg-${K(je)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function qe(e, t, n) {
		ze(`edit:bg-${K(je)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function Je(e, t) {
		ze("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function Ye(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			Ke(e, "src", (await qi(n)).dataUrl);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Xe = () => Object.entries(K(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function Ze(e) {
		return {
			type: e,
			version: Ui[e].version,
			props: Ui[e].defaults()
		};
	}
	function Qe(e) {
		Te(`edit:anim-${K(k).blockId}`, (t) => {
			t.animation = e ? Ze(e) : null;
		}), K(k) && T?.sendDemoAnim(K(k).sectionId, K(k).blockId);
	}
	function $e(e, t) {
		Number.isFinite(t) && (Te(`edit:anim-${K(k).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), K(k) && T?.sendDemoAnim(K(k).sectionId, K(k).blockId));
	}
	function et(e) {
		ze("section-anim", (t) => {
			t.animation = e ? Ze(e) : null;
		}), T?.sendDemoAnim(K(je));
	}
	function tt(e, t) {
		Number.isFinite(t) && (ze("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(K(je)));
	}
	function nt(e) {
		let t = C.data.sections.find((e) => e.id === K(je));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		O("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, z(Ne, r, !0), C.save(), D(), T?.sendSection(K(c), t);
	}
	function rt() {
		return C.data.sections.find((e) => e.id === K(je)) ?? C.data.sections[0];
	}
	function at(e) {
		let t = C.data.sections.find((e) => e.id === K(je));
		t && (O("grid"), t.grid = e ? { ...w.data.grid } : null, z(Me, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(K(c), t), K(ye) === "Grid" && T?.sendShowGrid(!0));
	}
	function ot(e, t) {
		let n = C.data.sections.find((e) => e.id === K(je));
		n?.grid && (O("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, z(Me, { ...n.grid }, !0), C.save(), D(), T?.sendSection(K(c), n), K(ye) === "Grid" && T?.sendShowGrid(!0));
	}
	function st(e, t) {
		O("grid"), z(_, {
			...K(_),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), te(), K(ye) === "Grid" && T?.sendShowGrid(!0);
	}
	async function ct() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? z(g, await e.json(), !0) : e.status !== 503 && z(g, null);
		} catch {
			z(g, null);
		}
	}
	let lt = null;
	async function ut() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (lt = (await e.json()).head ?? null);
		} catch {}
	}
	async function dt(e) {
		if (!lt) return ut(), {
			ok: !0,
			head: null
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${lt}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === lt) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: confirm("Noen andre har publisert siden du lastet siden, og endret filer du nå skriver over:\n\n" + i.map((e) => `  • ${e}`).join("\n") + "\n\nOK = publiser likevel (dine versjoner vinner for disse filene).\nAvbryt = ikke publiser (last siden på nytt for å se de nye endringene først)."),
			head: n
		};
	}
	let ft = /* @__PURE__ */ R(null), pt = /* @__PURE__ */ R(""), mt = /* @__PURE__ */ R(!1);
	async function ht() {
		z(pt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? z(ft, (await e.json()).commits, !0) : e.status === 401 ? (z(ft, [], !0), z(pt, "Logg inn med GitHub for å se historikken.")) : (z(ft, [], !0), z(pt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			z(ft, [], !0), z(pt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let gt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), _t = !1;
	async function vt() {
		let e = K(ft)?.[0];
		if (!(!e || K(mt)) && confirm(`Angre siste publisering («${e.message}»)?\n\nEn ny commit gjenoppretter innholdet slik det var før den - ingenting slettes fra historikken.`)) {
			z(mt, !0), p("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? lt = e : ut(), _t = !0, p("✓ Angret! Last admin på nytt om ~1 min for å redigere videre på den gjenopprettede versjonen", "ok");
				} else t.status === 409 ? p("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : p((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				p("Kunne ikke nå publiseringslaget", "error");
			}
			z(mt, !1), ht();
		}
	}
	let yt = null;
	function bt(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: `sec-${crypto.randomUUID().slice(0, 8)}`,
				version: 1,
				preset: "tom",
				size: { minHeight: "40vh" },
				grid: null,
				background: {
					version: 1,
					layers: [{
						type: "color",
						version: 1,
						props: { value: "bg" }
					}]
				},
				blocks: []
			}]
		};
	}
	async function xt(e) {
		z(c, e, !0), yt = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = Pi(await e.json(), w.data));
			} catch {}
			n ? ne.delete(e) : n = bt(t), C = bi(`urd-draft-${e}`, () => n), C.replace(Pi(C.data, w.data)), C.save(), ie.length = 0, ae.length = 0, oe = null, z(je, null), z(Me, null), D(), x(), z(u, "");
		})(), await yt;
	}
	function St() {
		T?.destroy(), T = Oi(K(h), {
			onEdit: Zt,
			onMove: Qt,
			onDelete: dn,
			onAddSection: on,
			onMoveSection: sn,
			onDeleteSection: cn,
			onSectionSize: ln,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Le,
			onSelectBlock: we,
			onReady: Ct,
			onNavigate: wt,
			onAddBlock: (e) => hn(e.sectionId, e.block),
			onRequestBlock: _n,
			onMoveBlockSection: un,
			onMobileManual: $t,
			onMobileAuto: tn,
			onReviewDone: nn,
			onBlockFlag: an
		});
	}
	async function Ct() {
		await yt, w.hasDraft() && te();
		let e = !K(s).pages.some((e) => e.id === K(c));
		(C.hasDraft() || e) && T?.sendPage(K(c), C.data), K(v) || T?.sendChrome(!1), K(ye) === "Grid" && T?.sendShowGrid(!0);
	}
	function wt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = K(E).pages.find((e) => e.path === t);
		n && n.id !== K(c) && xt(n.id);
	}
	function I(e, t) {
		O(e), t(), w.save(), D(), te();
	}
	let Tt = /* @__PURE__ */ R(""), L = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Et(e, t = null) {
		return e ? L.includes(e) ? `«${e}» er et reservert navn` : K(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Dt() {
		let e = K(Tt).trim(), t = Ji(e), n = Et(t);
		if (n) {
			p(n, "error");
			return;
		}
		I("pages", () => {
			K(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), K(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(bt({
			id: t,
			title: e
		}))), D(), z(Tt, ""), xt(t);
	}
	function Ot(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		I("pages", () => {
			e.title = n;
			for (let t of K(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === K(c) ? (C.data.meta.title = n, C.save(), D()) : kt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function kt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Pi(await t.json(), w.data));
		} catch {}
		r ||= bt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function At(e, t) {
		let n = Ji(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Et(n, e.id);
		if (r) {
			p(r, "error");
			return;
		}
		I("pages", () => {
			e.path = `/${n}`;
		});
	}
	function jt(e) {
		e.path !== "/" && (I("pages", () => {
			K(E).pages = K(E).pages.filter((t) => t.id !== e.id), K(E).nav.items = K(E).nav.items.filter((t) => t.page !== e.id);
		}), e.id === K(c) && xt(K(E).pages[0].id), p("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Mt(e) {
		I("edit:nav-logo", () => {
			K(E).nav.logo = {
				type: "text",
				value: "",
				...K(E).nav.logo,
				...e
			};
		});
	}
	function Nt(e) {
		I("nav", () => {
			K(E).nav.logo ??= {
				type: "text",
				value: K(E).site.title
			};
			let t = K(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = K(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = K(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Pt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qi(t);
			I("nav", () => {
				let t = K(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function Ft(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qi(t, 128);
			I("edit:site-icon", () => {
				K(E).site.icon = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function It() {
		I("edit:site-icon", () => {
			delete K(E).site.icon;
		});
	}
	xn(() => {
		let e = K(E)?.site?.icon;
		if (!e) return;
		let t = document.querySelector("link[rel=\"icon\"]");
		t && (t.href = e);
	});
	function Lt(e) {
		I("nav", () => {
			K(E).nav.layout = e;
		});
	}
	function Rt(e, t) {
		I(`edit:nav-style-${e}`, () => {
			K(E).nav.style ??= {}, K(E).nav.style[e] = t;
		});
	}
	function zt(e, t) {
		I(e, () => {
			K(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(K(E).footer);
		});
	}
	function Bt(e, t) {
		I(`edit:nav-label-${e}`, () => {
			K(E).nav.items[e].label = t;
		});
	}
	function Vt(e, t) {
		I("nav", () => {
			let n = K(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Ht(e, t) {
		I(`edit:nav-href-${e}`, () => {
			K(E).nav.items[e].href = t;
		});
	}
	function Ut(e, t) {
		let n = e + t, r = K(E).nav.items;
		n < 0 || n >= r.length || I("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Wt(e) {
		I("nav", () => {
			K(E).nav.items.splice(e, 1);
		});
	}
	function Gt() {
		I("nav", () => {
			K(E).nav.items.push({
				label: "Lenke",
				page: K(E).pages[0].id
			});
		});
	}
	let Kt = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function qt(e, t) {
		I(`edit:theme-color-${e}`, () => {
			K(E).theme.tokens.color[e] = t;
		});
	}
	function Jt(e, t) {
		I("theme", () => {
			K(E).theme.tokens.font[e] = t;
		});
	}
	function Yt(e, t) {
		I("theme", () => {
			K(E).theme.tokens.radius[e] = t;
		});
	}
	function Xt() {
		z(v, !K(v)), T?.sendChrome(K(v));
	}
	function Zt(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (O(`edit:${e.blockId}`), t.props = e.props, C.save(), D(), K(k)?.blockId === e.blockId && Ce(), z(u, ""));
	}
	function Qt(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		O(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && S(t, "desktop-endret-etter-mobil"), C.save(), D(), K(k)?.blockId === e.blockId && Ce();
	}
	function $t(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			O("mobile-manual");
			for (let { blockId: n, frame: r } of e.frames) {
				let e = t.blocks.find((e) => e.id === n);
				e && (e.frames.mobile = r);
			}
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "manual",
					attention: t.responsive?.mobile?.attention ?? null
				}
			}, C.save(), D();
		}
	}
	function tn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			O("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, C.save(), D(), x(), T?.sendSection(K(c), t);
		}
	}
	function nn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (O("review-done"), t.responsive.mobile.attention = null, C.save(), D(), x());
	}
	function an(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (O("decor"), t.decor = e.decor, C.save(), D(), K(k)?.blockId === e.blockId && Ce());
	}
	function on(e) {
		O("add-section"), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(K(c), C.data), z(je, e.section.id, !0), Ie(e.section), K(ye) !== "Egenskaper" && (z(ye, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function sn(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (O("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(K(c), C.data));
	}
	function cn(e) {
		O("delete-section"), e.sectionId === K(je) && (z(je, null), z(Me, null)), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(K(c), C.data);
	}
	function ln(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === K(je) && z(Ne, e.minHeight, !0), C.save(), D());
	}
	function un(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (O("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), S(t, "blokk-flyttet"), S(n, "blokk-flyttet"), C.save(), D(), x(), T?.sendPage(K(c), C.data), K(k)?.blockId === e.blockId && (z(k, {
			...K(k),
			sectionId: e.toSectionId
		}, !0), Ce()));
	}
	function dn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), K(k)?.blockId === e.blockId && z(k, null), S(t, "blokk-slettet"), C.save(), D(), T?.sendSection(K(c), t));
	}
	let fn = {
		text: {
			type: "text",
			props: {
				html: "<p>Ny tekst</p>",
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: "<h3>Overskrift</h3><p>Skriv innholdet her.</p>",
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: "Ny knapp",
				page: null,
				href: null,
				style: "primary"
			},
			w: 20,
			h: 36
		},
		"shape-line": {
			type: "shape",
			decor: !0,
			props: {
				kind: "line",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 25,
			h: 8
		},
		"shape-arrow": {
			type: "shape",
			decor: !0,
			props: {
				kind: "arrow",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 25,
			h: 16
		},
		"shape-circle": {
			type: "shape",
			decor: !0,
			props: {
				kind: "circle",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 10,
			h: 110
		},
		"shape-rect": {
			type: "shape",
			decor: !0,
			props: {
				kind: "rect",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 20,
			h: 110
		},
		"shape-triangle": {
			type: "shape",
			decor: !0,
			props: {
				kind: "triangle",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 10,
			h: 110
		},
		image: {
			type: "image",
			props: {
				src: "",
				alt: "",
				fit: "cover",
				radius: "md",
				href: null
			},
			w: 30,
			h: 220
		},
		video: {
			type: "video",
			props: {
				url: "",
				title: "Video"
			},
			w: 45,
			h: 300
		},
		icon: {
			type: "icon",
			decor: !0,
			props: {
				glyph: "★",
				color: "accent",
				size: 48
			},
			w: 8,
			h: 64
		}
	};
	function pn(e) {
		let t = fn[e];
		return t ? {
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: t.type,
			version: 1,
			decor: !!t.decor,
			props: structuredClone(t.props),
			animation: null,
			frames: {
				desktop: {
					x: 4,
					y: 8,
					w: t.w,
					h: t.h,
					z: 1,
					rot: 0
				},
				mobile: null
			}
		} : null;
	}
	function mn(e) {
		T ? T.sendPlaceBlock(e) : hn(rt()?.id, e);
	}
	function hn(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		n && (O("add-block"), n.blocks.push(t), S(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(K(c), n));
	}
	function gn(e) {
		mn(pn(e));
	}
	function _n(e) {
		let t = pn(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, hn(e.sectionId, t), e.kind === "image" && p("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function vn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		p("Komprimerer bildet…");
		let n;
		try {
			n = await qi(t);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (K(h)?.clientWidth ?? 1280));
		mn({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ji(t.name).replaceAll("-", " "),
				fit: "cover",
				radius: "md",
				href: null
			},
			animation: null,
			frames: {
				desktop: {
					x: 4,
					y: 8,
					w: 30,
					h: Math.max(40, r),
					z: 1,
					rot: 0
				},
				mobile: null
			}
		}), n.bytes > 4e5 ? p(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : p("");
	}
	function yn(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ji(n || "bilde")}-${Yi(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function bn(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && yn(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && yn(e.props, "src", e.props.alt, t);
		}
		return t;
	}
	function Sn(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && yn(n, "value", "logo", t), n?.type === "both" && yn(n, "image", "logo", t), yn(e.site, "icon", "ikon", t), t;
	}
	function Cn() {
		O("discard");
		let e = C.reset();
		w.reset(), ee(), z(_, {
			snap: !0,
			...K(E).grid
		}, !0), D(), z(u, ""), te(), K(E).pages.some((e) => e.id === K(c)) ? T?.sendPage(K(c), e) : xt(K(E).pages[0].id);
	}
	async function wn() {
		if (_t) {
			p("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		p("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of K(E).pages) {
			let a = `urd-draft-${i.id}`, o = ne.has(i.id) || !K(s).pages.some((e) => e.id === i.id), l = null;
			if (i.id === K(c) && (C.hasDraft() || o)) l = C.data;
			else if (i.id !== K(c)) {
				let e = localStorage.getItem(a);
				if (e) try {
					l = Pi(JSON.parse(e), w.data);
				} catch {}
			}
			if (!l && o && (l = bt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...bn(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(K(E)));
			e.push(...Sn(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(K(s).theme, K(E).theme) || t.push("tema"), i(K(s).nav, K(E).nav) || t.push("menyen"), i(K(s).footer, K(E).footer) || t.push("footeren"), i(K(s).pages, K(E).pages) || t.push("sideregisteret"), i(K(s).grid, K(E).grid) || t.push("gridet"), (K(s).site.icon ?? null) !== (K(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = K(s).site, { icon: c, ...l } = K(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of K(E).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of K(s).pages) {
			let n = K(E).pages.find((e) => e.id === t.id);
			n ? n.path !== t.path && t.path !== "/" && e.push({
				path: `${t.path.slice(1)}/index.html`,
				delete: !0
			}) : (e.push({
				path: t.file,
				delete: !0
			}), t.path !== "/" && e.push({
				path: `${t.path.slice(1)}/index.html`,
				delete: !0
			}));
		}
		let i = await dt(e);
		if (!i.ok) {
			p("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let a = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...i.head ? { expect: i.head } : {}
		}, o = null;
		try {
			o = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(a)
			});
		} catch {}
		if (o?.ok) {
			let { sha: e } = await o.json().catch(() => ({}));
			e ? lt = e : ut(), bn(C.data), Sn(K(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			z(s, JSON.parse(JSON.stringify(K(E))), !0), w = bi("urd-draft-site", () => K(s)), ee(), z(_, {
				snap: !0,
				...K(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = bi(`urd-draft-${K(c)}`, () => t), ne.has(K(c)) && localStorage.setItem(`urd-draft-${K(c)}`, JSON.stringify(t)), D(), p("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (o?.status === 401) {
			let e = (await o.json().catch(() => null))?.error;
			p(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ct();
		} else o?.status === 403 ? p((await o.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : o?.status === 409 ? p("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : p(o ? (await o.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var Tn = ao();
	xr("keydown", rn, de);
	var En = B(Tn), Dn = (e) => {
		var t = Xi();
		Kr(B(t), () => i.pencil), P(), N(t), q("click", t, Xt), Y(e, t);
	};
	Z(En, (e) => {
		K(v) || e(Dn);
	});
	var On = H(En, 2);
	let kn;
	var An = B(On), jn = H(B(An), 2);
	Br(jn, 21, () => a, ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ F(() => m(K(t), 2));
		let r = () => K(n)[0], i = () => K(n)[1];
		var a = Zi(), o = B(a, !0);
		N(a);
		var s = {};
		U(() => {
			X(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
		}), Y(e, a);
	}), N(jn);
	var Mn;
	ni(jn);
	var Nn = H(jn, 2), Pn = (e) => {
		var t = Qi(), n = V(t), r = B(n, !0);
		N(n);
		var a = H(n, 2), o = B(a);
		let s;
		Kr(o, () => i.desktop, !0), N(o);
		var c = H(o, 2);
		let l;
		Kr(c, () => i.phone, !0), N(c), N(a), U((e) => {
			X(r, e), s = Qr(o, 1, "ghost svelte-1n46o8q", null, s, { active: K(y) === "desktop" }), l = Qr(c, 1, "ghost svelte-1n46o8q", null, l, { active: K(y) === "mobile" });
		}, [() => re()?.title ?? ""]), q("click", n, () => xe("Sider")), q("click", o, () => z(y, "desktop")), q("click", c, () => z(y, "mobile")), Y(e, t);
	};
	Z(Nn, (e) => {
		K(s) && e(Pn);
	});
	var Fn = H(Nn, 2), In = (e) => {
		var t = $i(), n = B(t);
		Kr(n, () => i.phone);
		var r = H(n);
		N(t), U(() => X(r, ` ${K(b) ?? ""} ${K(b) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), q("click", t, () => z(y, "mobile")), Y(e, t);
	};
	Z(Fn, (e) => {
		K(b) > 0 && e(In);
	});
	var Ln = H(Fn, 2), Rn = (e) => {
		Y(e, ea());
	};
	Z(Ln, (e) => {
		K(l) && e(Rn);
	}), N(An);
	var zn = H(An, 2), Bn = B(zn), Vn = (e) => {
		var t = aa(), n = V(t), r = B(n), a = (e) => {
			var t = ta();
			Kr(V(t), () => i.eye), P(), Y(e, t);
		}, o = (e) => {
			var t = na();
			Kr(V(t), () => i.pencil), P(), Y(e, t);
		};
		Z(r, (e) => {
			K(v) ? e(a) : e(o, -1);
		}), N(n);
		var s = H(n, 2), c = (e) => {
			var t = ra(), n = B(t), r = (e) => {
				var t = Ar();
				Kr(V(t), () => i.warn), Y(e, t);
			};
			Z(n, (e) => {
				K(g).allowed || e(r);
			});
			var a = H(n, 1, !0);
			N(t), U(() => {
				ui(t, "title", K(g).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), X(a, K(g).login);
			}), Y(e, t);
		}, u = (e) => {
			Y(e, ia());
		};
		Z(s, (e) => {
			K(g)?.loggedIn ? e(c) : K(g) && e(u, 1);
		});
		var d = H(s, 2), f = H(d, 2), p = H(f, 2);
		U((e) => {
			ui(n, "title", K(v) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ui(d, "href", e), f.disabled = !K(l), p.disabled = !K(l);
		}, [() => re().path]), q("click", n, Xt), q("click", f, Cn), q("click", p, wn), Y(e, t);
	};
	Z(Bn, (e) => {
		K(s) && e(Vn);
	}), N(zn), N(On);
	var Hn = H(On, 2), Un = (e) => {
		var t = to(), r = B(t), a = (e) => {
			var t = eo(), r = V(t);
			Br(r, 21, () => be, Ir, (e, t, n) => {
				var r = ca(), i = V(r), a = (e) => {
					Y(e, oa());
				};
				Z(i, (e) => {
					n > 0 && e(a);
				}), Br(H(i, 2), 16, () => K(t), (e) => e, (e, t) => {
					var n = sa();
					let r;
					var i = B(n, !0);
					N(n), U(() => {
						r = Qr(n, 1, "svelte-1n46o8q", null, r, { active: K(ye) === t }), X(i, t);
					}), q("click", n, () => xe(t)), Y(e, n);
				}), Y(e, r);
			}), N(r);
			var a = H(r, 2), o = (e) => {
				var t = $a(), r = B(t), a = B(r, !0);
				N(r);
				var o = H(r, 2), s = (e) => {
					var t = pa(), n = H(B(t), 2);
					Br(n, 17, () => K(E).pages, (e) => e.id, (e, t) => {
						var n = fa();
						let r;
						var a = B(n);
						Q(a);
						var o = H(a, 2), s = (e) => {
							Y(e, la());
						}, l = (e) => {
							var n = ua();
							Q(n), U((e) => $(n, e), [() => K(t).path.slice(1)]), q("change", n, (e) => At(K(t), e.target.value)), Y(e, n);
						};
						Z(o, (e) => {
							K(t).path === "/" ? e(s) : e(l, -1);
						});
						var u = H(o, 2), d = B(u);
						Kr(d, () => i.right, !0), N(d);
						var f = H(d, 2), p = (e) => {
							var n = da();
							Kr(n, () => i.cross, !0), N(n), q("click", n, () => jt(K(t))), Y(e, n);
						};
						Z(f, (e) => {
							K(t).path !== "/" && e(p);
						}), N(u), N(n), U(() => {
							r = Qr(n, 1, "page-row svelte-1n46o8q", null, r, { current: K(t).id === K(c) }), $(a, K(t).title), d.disabled = K(t).id === K(c);
						}), q("change", a, (e) => Ot(K(t), e.target.value)), q("click", d, () => xt(K(t).id)), Y(e, n);
					});
					var r = H(n, 4);
					Q(r);
					var a = H(r, 2);
					P(2), N(t), U((e) => a.disabled = e, [() => !K(Tt).trim()]), q("keydown", r, (e) => e.key === "Enter" && Dt()), mi(r, () => K(Tt), (e) => z(Tt, e)), q("click", a, Dt), Y(e, t);
				}, l = (e) => {
					var t = ya(), n = H(B(t), 2), r = H(B(n), 2), a = B(r), o = H(B(a)), s = B(o);
					s.value = s.__value = "text";
					var c = H(s);
					c.value = c.__value = "image";
					var l = H(c);
					l.value = l.__value = "both", N(o);
					var u;
					ni(o), N(a);
					var d = H(a, 2), f = (e) => {
						var t = ma(), n = V(t);
						Q(n);
						var r = H(n, 2), i = B(r), a = B(i);
						a.value = a.__value = "", Br(H(a), 17, () => Kt, ([e, t]) => t, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(K(t), 2));
							let r = () => K(n)[0], i = () => K(n)[1];
							var a = Zi(), o = B(a, !0);
							N(a);
							var s = {};
							U(() => {
								X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
							}), Y(e, a);
						}), N(i);
						var o;
						ni(i);
						var s = H(i, 2);
						Q(s);
						var c = H(s, 2);
						let l;
						var u = H(c, 2);
						let d;
						N(r), U((e) => {
							$(n, K(E).nav.logo?.value ?? ""), o !== (o = K(E).nav.logo?.font ?? "") && (i.value = (i.__value = K(E).nav.logo?.font ?? "") ?? "", ti(i, K(E).nav.logo?.font ?? "")), $(s, K(E).nav.logo?.textSize ?? ""), l = Qr(c, 1, "tbtn svelte-1n46o8q", null, l, { active: K(E).nav.logo?.bold !== !1 }), d = Qr(u, 1, "tbtn svelte-1n46o8q", null, d, e);
						}, [() => ({ active: !!K(E).nav.logo?.italic })]), q("input", n, (e) => Mt({ value: e.target.value })), q("change", i, (e) => Mt({ font: e.target.value || void 0 })), q("change", s, (e) => Mt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), q("click", c, () => Mt({ bold: K(E).nav.logo?.bold === !1 })), q("click", u, () => Mt({ italic: !K(E).nav.logo?.italic })), Y(e, t);
					};
					Z(d, (e) => {
						(K(E).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = H(d, 2), h = (e) => {
						var t = ha(), n = V(t), r = B(n), i = B(r), a = H(i);
						N(r);
						var o = H(r, 2);
						Q(o);
						var s = H(o, 2);
						Q(s), N(n), P(2), U(() => {
							X(i, `${(K(E).nav.logo?.type === "image" ? K(E).nav.logo?.value : K(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), $(o, K(E).nav.logo?.size ?? 32), $(s, K(E).nav.logo?.radius ?? 0);
						}), q("change", a, Pt), q("change", o, (e) => Mt({ size: Number(e.target.value) })), q("change", s, (e) => Mt({ radius: Number(e.target.value) })), Y(e, t);
					};
					Z(p, (e) => {
						(K(E).nav.logo?.type ?? "text") !== "text" && e(h);
					});
					var g = H(p, 2), _ = (e) => {
						var t = ga(), n = H(B(t)), r = B(n);
						r.value = r.__value = "image-first";
						var i = H(r);
						i.value = i.__value = "text-first", N(n);
						var a;
						ni(n), N(t), U(() => {
							a !== (a = K(E).nav.logo?.order ?? "image-first") && (n.value = (n.__value = K(E).nav.logo?.order ?? "image-first") ?? "", ti(n, K(E).nav.logo?.order ?? "image-first"));
						}), q("change", n, (e) => Mt({ order: e.target.value })), Y(e, t);
					};
					Z(g, (e) => {
						K(E).nav.logo?.type === "both" && e(_);
					}), P(2), N(r), N(n);
					var v = H(n, 2), y = H(B(v), 2), b = B(y), x = H(B(b));
					{
						let e = /* @__PURE__ */ F(() => K(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ F(Xe);
						Di(x, {
							get value() {
								return K(e);
							},
							get tokens() {
								return K(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Rt("bg", e)
						});
					}
					N(b);
					var S = H(b, 2), C = H(B(S)), w = B(C);
					N(C), N(S);
					var T = H(S, 2);
					Q(T);
					var ee = H(T, 2), te = B(ee);
					Q(te), P(), N(ee);
					var ne = H(ee, 2), re = H(B(ne));
					{
						let e = /* @__PURE__ */ F(() => K(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ F(Xe);
						Di(re, {
							get value() {
								return K(e);
							},
							get tokens() {
								return K(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Rt("textColor", e)
						});
					}
					N(ne);
					var D = H(ne, 2), ie = H(B(D)), ae = B(ie);
					ae.value = ae.__value = "right";
					var oe = H(ae);
					oe.value = oe.__value = "center";
					var se = H(oe);
					se.value = se.__value = "left", N(ie);
					var O;
					ni(ie), N(D);
					var ce = H(D, 2), le = B(ce);
					Q(le), P(), N(ce), P(2), N(y), N(v);
					var ue = H(v, 2), de = H(B(ue), 2), fe = B(de);
					Br(fe, 17, () => K(E).nav.items, Ir, (e, t, n) => {
						var r = va(), a = B(r);
						Q(a);
						var o = H(a, 2), s = B(o);
						s.disabled = n === 0, Kr(s, () => i.up, !0), N(s);
						var c = H(s, 2);
						Kr(c, () => i.down, !0), N(c);
						var l = H(c, 2);
						Kr(l, () => i.cross, !0), N(l), N(o);
						var u = H(o, 2), d = B(u);
						Br(d, 17, () => K(E).pages, (e) => e.id, (e, t) => {
							var n = Zi(), r = B(n, !0);
							N(n);
							var i = {};
							U(() => {
								X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
							}), Y(e, n);
						});
						var f = H(d);
						f.value = f.__value = "__href", N(u);
						var p;
						ni(u);
						var m = H(u, 2), h = (e) => {
							var r = _a();
							Q(r), U(() => $(r, K(t).href ?? "")), q("change", r, (e) => Ht(n, e.target.value)), Y(e, r);
						};
						Z(m, (e) => {
							K(t).page || e(h);
						}), N(r), U(() => {
							$(a, K(t).label), c.disabled = n === K(E).nav.items.length - 1, p !== (p = K(t).page ?? "__href") && (u.value = (u.__value = K(t).page ?? "__href") ?? "", ti(u, K(t).page ?? "__href"));
						}), q("input", a, (e) => Bt(n, e.target.value)), q("click", s, () => Ut(n, -1)), q("click", c, () => Ut(n, 1)), q("click", l, () => Wt(n)), q("change", u, (e) => Vt(n, e.target.value)), Y(e, r);
					});
					var pe = H(fe, 2);
					N(de), N(ue), N(t), U((e) => {
						u !== (u = K(E).nav.logo?.type ?? "text") && (o.value = (o.__value = K(E).nav.logo?.type ?? "text") ?? "", ti(o, K(E).nav.logo?.type ?? "text")), X(w, `${e ?? ""}%`), $(T, K(E).nav.style?.bgOpacity ?? .85), li(te, K(E).nav.style?.blur !== !1), O !== (O = K(E).nav.layout ?? "right") && (ie.value = (ie.__value = K(E).nav.layout ?? "right") ?? "", ti(ie, K(E).nav.layout ?? "right")), li(le, K(E).nav.sticky !== !1);
					}, [() => Math.round((K(E).nav.style?.bgOpacity ?? .85) * 100)]), q("change", o, (e) => Nt(e.target.value)), q("input", T, (e) => Rt("bgOpacity", Number(e.target.value))), q("change", te, (e) => Rt("blur", e.target.checked)), q("change", ie, (e) => Lt(e.target.value)), q("change", le, (e) => I("nav", () => {
						K(E).nav.sticky = e.target.checked;
					})), q("click", pe, Gt), Y(e, t);
				}, u = (e) => {
					var t = Ca(), n = H(B(t), 2);
					Di(H(B(n)), {
						get value() {
							return K(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => qt("bg", e)
					}), N(n);
					var r = H(n, 2);
					Di(H(B(r)), {
						get value() {
							return K(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => qt("surface", e)
					}), N(r);
					var a = H(r, 2);
					Di(H(B(a)), {
						get value() {
							return K(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => qt("text", e)
					}), N(a);
					var o = H(a, 2);
					Di(H(B(o)), {
						get value() {
							return K(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => qt("accent", e)
					}), N(o);
					var s = H(o, 4), c = H(B(s)), l = B(c), u = (e) => {
						var t = ba(), n = {};
						U(() => {
							n !== (n = K(E).theme.tokens.font.heading) && (t.value = (t.__value = K(E).theme.tokens.font.heading) ?? "");
						}), Y(e, t);
					}, d = /* @__PURE__ */ F(() => !Kt.some(([, e]) => e === K(E).theme.tokens.font.heading));
					Z(l, (e) => {
						K(d) && e(u);
					}), Br(H(l), 17, () => Kt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ F(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = Zi(), o = B(a, !0);
						N(a);
						var s = {};
						U(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), N(c);
					var f;
					ni(c), N(s);
					var p = H(s, 2), h = H(B(p)), g = B(h), _ = (e) => {
						var t = ba(), n = {};
						U(() => {
							n !== (n = K(E).theme.tokens.font.body) && (t.value = (t.__value = K(E).theme.tokens.font.body) ?? "");
						}), Y(e, t);
					}, v = /* @__PURE__ */ F(() => !Kt.some(([, e]) => e === K(E).theme.tokens.font.body));
					Z(g, (e) => {
						K(v) && e(_);
					}), Br(H(g), 17, () => Kt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ F(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = Zi(), o = B(a, !0);
						N(a);
						var s = {};
						U(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), N(h);
					var y;
					ni(h), N(p);
					var b = H(p, 4), x = H(B(b));
					Q(x), N(b);
					var S = H(b, 2), C = H(B(S));
					Q(C), N(S);
					var w = H(S, 4), T = H(B(w)), ee = (e) => {
						var t = xa();
						U(() => ui(t, "src", K(E).site.icon)), Y(e, t);
					};
					Z(T, (e) => {
						K(E).site.icon && e(ee);
					}), N(w);
					var te = H(w, 2), ne = B(te), re = B(ne), D = H(re);
					N(ne);
					var ie = H(ne, 2), ae = (e) => {
						var t = Sa();
						Kr(t, () => i.cross, !0), N(t), q("click", t, It), Y(e, t);
					};
					Z(ie, (e) => {
						K(E).site.icon && e(ae);
					}), N(te), P(2), N(t), U(() => {
						f !== (f = K(E).theme.tokens.font.heading) && (c.value = (c.__value = K(E).theme.tokens.font.heading) ?? "", ti(c, K(E).theme.tokens.font.heading)), y !== (y = K(E).theme.tokens.font.body) && (h.value = (h.__value = K(E).theme.tokens.font.body) ?? "", ti(h, K(E).theme.tokens.font.body)), $(x, K(E).theme.tokens.radius.sm), $(C, K(E).theme.tokens.radius.md), X(re, `${K(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), q("change", c, (e) => Jt("heading", e.target.value)), q("change", h, (e) => Jt("body", e.target.value)), q("change", x, (e) => Yt("sm", e.target.value)), q("change", C, (e) => Yt("md", e.target.value)), q("change", D, Ft), Y(e, t);
				}, d = (e) => {
					var t = wa();
					let n;
					var r = H(B(t), 2), i = H(B(r), 2), a = B(i), o = H(a, 2);
					N(i), N(r);
					var s = H(r, 2), c = H(s, 2), l = H(B(c));
					N(c);
					var u = H(c, 2), d = H(u, 2), f = H(d, 2), p = H(B(f), 2), m = B(p), h = H(m, 2), g = H(h, 2), _ = H(g, 2), v = H(_, 2);
					N(p), N(f), N(t), U(() => {
						n = Qr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: K(y) === "mobile" }), ui(t, "title", K(y) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), q("click", a, () => gn("text")), q("click", o, () => gn("text-box")), q("click", s, () => gn("button")), q("change", l, vn), q("click", u, () => gn("video")), q("click", d, () => gn("icon")), q("click", m, () => gn("shape-line")), q("click", h, () => gn("shape-arrow")), q("click", g, () => gn("shape-circle")), q("click", _, () => gn("shape-rect")), q("click", v, () => gn("shape-triangle")), Y(e, t);
				}, f = (e) => {
					var t = Ta(), n = H(B(t), 2), r = H(B(n)), i = B(r);
					N(r), N(n);
					var a = H(n, 2);
					Q(a);
					var o = H(a, 2), s = B(o);
					Q(s), P(), N(o), P(2), N(t), U(() => {
						X(i, `${K(_).size ?? ""} px`), $(a, K(_).size), li(s, K(_).snap !== !1);
					}), q("input", a, (e) => st("size", Number(e.target.value))), q("change", s, (e) => st("snap", e.target.checked)), Y(e, t);
				}, p = (e) => {
					var t = Ka(), r = B(t), a = (e) => {
						var t = Fa(), n = V(t), r = B(n);
						N(n);
						var i = H(n, 2), a = (e) => {
							var t = Ea(), n = B(t), r = H(B(n));
							Q(r), N(n);
							var i = H(n, 2), a = H(B(i));
							Q(a), N(i);
							var o = H(i, 2), s = H(B(o));
							Q(s), N(o);
							var c = H(o, 2), l = H(B(c));
							Q(l), N(c);
							var u = H(c, 2), d = H(B(u));
							Q(d), N(u);
							var f = H(u, 2), p = H(B(f));
							Q(p), N(f), N(t), U(() => {
								$(r, K(k).frame.x), $(a, K(k).frame.y), $(s, K(k).frame.w), $(l, K(k).frame.h), $(d, K(k).frame.z ?? 1), $(p, K(k).frame.rot ?? 0);
							}), q("change", r, (e) => Ee("x", Number(e.target.value))), q("change", a, (e) => Ee("y", Number(e.target.value))), q("change", s, (e) => Ee("w", Number(e.target.value))), q("change", l, (e) => Ee("h", Number(e.target.value))), q("change", d, (e) => Ee("z", Number(e.target.value))), q("change", p, (e) => Ee("rot", Number(e.target.value))), Y(e, t);
						};
						Z(i, (e) => {
							K(y) === "desktop" && e(a);
						});
						var o = H(i, 2), s = B(o);
						Q(s), P(), N(o);
						var c = H(o, 4), l = (e) => {
							var t = Da(), n = V(t), r = H(B(n)), i = B(r);
							i.value = i.__value = "left";
							var a = H(i);
							a.value = a.__value = "center";
							var o = H(a);
							o.value = o.__value = "right", N(r);
							var s;
							ni(r), N(n);
							var c = H(n, 2), l = B(c);
							Q(l), P(), N(c);
							var u = H(c, 2), d = H(B(u)), f = B(d);
							f.value = f.__value = "", Br(H(f), 17, () => Kt, ([e, t]) => t, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = Zi(), o = B(a, !0);
								N(a);
								var s = {};
								U(() => {
									X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
								}), Y(e, a);
							}), N(d);
							var p;
							ni(d), N(u);
							var h = H(u, 4), g = B(h);
							let _;
							var v = H(g, 2);
							Br(v, 17, () => j, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = sa();
								let o;
								var s = B(a, !0);
								N(a), U(() => {
									o = Qr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: K(k).props.size === i() }), ui(a, "title", `${i() ?? ""} px`), X(s, r());
								}), q("click", a, () => A("size", i())), Y(e, a);
							});
							var y = H(v, 2);
							Q(y), N(h), P(2), U((e) => {
								s !== (s = K(k).props.align ?? "left") && (r.value = (r.__value = K(k).props.align ?? "left") ?? "", ti(r, K(k).props.align ?? "left")), li(l, e), p !== (p = K(k).props.font ?? "") && (d.value = (d.__value = K(k).props.font ?? "") ?? "", ti(d, K(k).props.font ?? "")), _ = Qr(g, 1, "tbtn svelte-1n46o8q", null, _, { active: !K(k).props.size }), $(y, K(k).props.size ?? "");
							}, [() => !!K(k).props.box]), q("change", r, (e) => A("align", e.target.value)), q("change", l, (e) => A("box", e.target.checked)), q("change", d, (e) => A("font", e.target.value || null)), q("click", g, () => A("size", null)), q("change", y, (e) => A("size", e.target.value ? Number(e.target.value) : null)), Y(e, t);
						}, u = (e) => {
							var t = ka(), n = V(t), r = H(B(n));
							Q(r), N(n);
							var i = H(n, 2), a = H(B(i)), o = B(a);
							Br(o, 17, () => K(E).pages, (e) => e.id, (e, t) => {
								var n = Zi(), r = B(n, !0);
								N(n);
								var i = {};
								U(() => {
									X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
								}), Y(e, n);
							});
							var s = H(o);
							s.value = s.__value = "__href", N(a);
							var c;
							ni(a), N(i);
							var l = H(i, 2), u = (e) => {
								var t = Oa();
								Q(t), U(() => $(t, K(k).props.href === "#" ? "" : K(k).props.href ?? "")), q("change", t, (e) => A("href", e.target.value || null)), Y(e, t);
							};
							Z(l, (e) => {
								K(k).props.page || e(u);
							});
							var d = H(l, 2), f = H(B(d)), p = B(f);
							p.value = p.__value = "primary";
							var m = H(p);
							m.value = m.__value = "secondary", N(f);
							var h;
							ni(f), N(d), U(() => {
								$(r, K(k).props.label), c !== (c = K(k).props.page ?? "__href") && (a.value = (a.__value = K(k).props.page ?? "__href") ?? "", ti(a, K(k).props.page ?? "__href")), h !== (h = K(k).props.style) && (f.value = (f.__value = K(k).props.style) ?? "", ti(f, K(k).props.style));
							}), q("change", r, (e) => A("label", e.target.value)), q("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								Te(`edit:${K(k).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), q("change", f, (e) => A("style", e.target.value)), Y(e, t);
						}, d = (e) => {
							var t = Aa(), n = V(t), r = H(B(n));
							N(n);
							var i = H(n, 2), a = H(B(i));
							Q(a), N(i);
							var o = H(i, 2), s = H(B(o)), c = B(s);
							c.value = c.__value = "cover";
							var l = H(c);
							l.value = l.__value = "contain", N(s);
							var u;
							ni(s), N(o);
							var d = H(o, 2), f = H(B(d)), p = B(f);
							p.value = p.__value = "";
							var m = H(p);
							m.value = m.__value = "sm";
							var h = H(m);
							h.value = h.__value = "md", N(f);
							var g;
							ni(f), N(d);
							var _ = H(d, 2), v = H(B(_));
							Q(v), N(_);
							var y = H(_, 2), b = H(B(y)), x = B(b);
							N(b), N(y);
							var S = H(y, 2);
							Q(S);
							var C = H(S, 2), w = H(B(C)), T = B(w);
							N(w), N(C);
							var E = H(C, 2);
							Q(E);
							var ee = H(E, 2), te = H(B(ee)), ne = B(te);
							N(te), N(ee);
							var re = H(ee, 2);
							Q(re);
							var D = H(re, 2), ie = H(B(D)), ae = B(ie);
							N(ie), N(D);
							var oe = H(D, 2);
							Q(oe);
							var se = H(oe, 2), O = H(B(se)), ce = B(O);
							N(O), N(se);
							var le = H(se, 2);
							Q(le);
							var ue = H(le, 2);
							U((e, t, n, r, i) => {
								$(a, K(k).props.alt ?? ""), u !== (u = K(k).props.fit ?? "cover") && (s.value = (s.__value = K(k).props.fit ?? "cover") ?? "", ti(s, K(k).props.fit ?? "cover")), g !== (g = K(k).props.radius ?? "") && (f.value = (f.__value = K(k).props.radius ?? "") ?? "", ti(f, K(k).props.radius ?? "")), $(v, K(k).props.href ?? ""), X(x, `${e ?? ""}%`), $(S, K(k).props.x ?? .5), X(T, `${t ?? ""}%`), $(E, K(k).props.y ?? .5), X(ne, `${n ?? ""}%`), $(re, K(k).props.brightness ?? 1), X(ae, `${r ?? ""}%`), $(oe, K(k).props.contrast ?? 1), X(ce, `${i ?? ""}%`), $(le, K(k).props.saturate ?? 1);
							}, [
								() => Math.round((K(k).props.x ?? .5) * 100),
								() => Math.round((K(k).props.y ?? .5) * 100),
								() => Math.round((K(k).props.brightness ?? 1) * 100),
								() => Math.round((K(k).props.contrast ?? 1) * 100),
								() => Math.round((K(k).props.saturate ?? 1) * 100)
							]), q("change", r, Oe), q("change", a, (e) => A("alt", e.target.value)), q("change", s, (e) => A("fit", e.target.value)), q("change", f, (e) => A("radius", e.target.value || null)), q("change", v, (e) => A("href", e.target.value || null)), q("input", S, (e) => A("x", Number(e.target.value))), q("input", E, (e) => A("y", Number(e.target.value))), q("input", re, (e) => A("brightness", Number(e.target.value))), q("input", oe, (e) => A("contrast", Number(e.target.value))), q("input", le, (e) => A("saturate", Number(e.target.value))), q("click", ue, () => Te(`edit:${K(k).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), Y(e, t);
						}, f = (e) => {
							var t = ja(), n = H(V(t), 2);
							Q(n);
							var r = H(n, 2), i = H(B(r));
							Q(i), N(r), P(2), U(() => {
								$(n, K(k).props.url ?? ""), $(i, K(k).props.title ?? "");
							}), q("change", n, (e) => A("url", e.target.value)), q("change", i, (e) => A("title", e.target.value)), Y(e, t);
						}, p = (e) => {
							var t = Ma(), n = V(t), r = H(B(n));
							Q(r), N(n);
							var i = H(n, 2), a = H(B(i));
							Q(a), N(i);
							var o = H(i, 2), s = H(B(o));
							Br(s, 21, () => Ae, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = Zi(), o = B(a, !0);
								N(a);
								var s = {};
								U(() => {
									X(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), Y(e, a);
							}), N(s);
							var c;
							ni(s), N(o), P(2), U(() => {
								$(r, K(k).props.glyph ?? ""), $(a, K(k).props.size ?? 48), c !== (c = K(k).props.color) && (s.value = (s.__value = K(k).props.color) ?? "", ti(s, K(k).props.color));
							}), q("change", r, (e) => A("glyph", e.target.value || "★")), q("change", a, (e) => A("size", Number(e.target.value))), q("change", s, (e) => A("color", e.target.value)), Y(e, t);
						}, h = (e) => {
							var t = Na(), n = V(t), r = H(B(n));
							Br(r, 21, () => M, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = Zi(), o = B(a, !0);
								N(a);
								var s = {};
								U(() => {
									X(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), Y(e, a);
							}), N(r);
							var i;
							ni(r), N(n);
							var a = H(n, 2), o = H(B(a));
							Br(o, 21, () => Ae, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = Zi(), o = B(a, !0);
								N(a);
								var s = {};
								U(() => {
									X(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), Y(e, a);
							}), N(o);
							var s;
							ni(o), N(a);
							var c = H(a, 2), l = H(B(c));
							Q(l), N(c);
							var u = H(c, 2), d = B(u);
							Q(d), P(), N(u), U((e) => {
								i !== (i = K(k).props.kind) && (r.value = (r.__value = K(k).props.kind) ?? "", ti(r, K(k).props.kind)), s !== (s = K(k).props.color) && (o.value = (o.__value = K(k).props.color) ?? "", ti(o, K(k).props.color)), $(l, K(k).props.thickness), li(d, e);
							}, [() => !!K(k).props.fill]), q("change", r, (e) => A("kind", e.target.value)), q("change", o, (e) => A("color", e.target.value)), q("change", l, (e) => A("thickness", Number(e.target.value))), q("change", d, (e) => A("fill", e.target.checked ? K(k).props.color : null)), Y(e, t);
						};
						Z(c, (e) => {
							K(k).type === "text" ? e(l) : K(k).type === "button" ? e(u, 1) : K(k).type === "image" ? e(d, 2) : K(k).type === "video" ? e(f, 3) : K(k).type === "icon" ? e(p, 4) : K(k).type === "shape" && e(h, 5);
						});
						var g = H(c, 4), _ = H(B(g)), v = B(_);
						v.value = v.__value = "", Br(H(v), 17, () => Object.entries(Ui), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(K(t), 2));
							let r = () => K(n)[0], i = () => K(n)[1];
							var a = Zi(), o = B(a, !0);
							N(a);
							var s = {};
							U(() => {
								X(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), Y(e, a);
						}), N(_);
						var b;
						ni(_), N(g);
						var x = H(g, 2), S = (e) => {
							var t = Pa(), n = V(t), r = H(B(n));
							Q(r), N(n);
							var i = H(n, 2), a = H(B(i));
							Q(a), N(i), P(2), U(() => {
								$(r, K(k).animation.props.duration), $(a, K(k).animation.props.delay);
							}), q("change", r, (e) => $e("duration", Number(e.target.value))), q("change", a, (e) => $e("delay", Number(e.target.value))), Y(e, t);
						};
						Z(x, (e) => {
							K(k).animation && Ui[K(k).animation.type]?.entrance && e(S);
						}), U(() => {
							X(r, `${ke[K(k).type] ?? K(k).type ?? ""}-blokk`), li(s, K(k).decor), b !== (b = K(k).animation?.type ?? "") && (_.value = (_.__value = K(k).animation?.type ?? "") ?? "", ti(_, K(k).animation?.type ?? ""));
						}), q("change", s, (e) => De(e.target.checked)), q("change", _, (e) => Qe(e.target.value || null)), Y(e, t);
					}, o = (e) => {
						var t = Wa(), r = H(V(t), 2), a = H(B(r));
						Q(a), N(r);
						var o = H(r, 6), s = B(o);
						Q(s), P(), N(o);
						var c = H(o, 2), l = (e) => {
							var t = Ia(), n = V(t), r = H(B(n)), i = B(r);
							N(r), N(n);
							var a = H(n, 2);
							Q(a), U(() => {
								X(i, `${K(Me).size ?? ""} px`), $(a, K(Me).size);
							}), q("input", a, (e) => ot("size", Number(e.target.value))), Y(e, t);
						};
						Z(c, (e) => {
							K(Me) && e(l);
						});
						var u = H(c, 8);
						Br(u, 17, () => K(Pe), Ir, (e, t, r) => {
							var a = Ua(), o = B(a), s = B(o);
							Br(s, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = Zi(), o = B(a, !0);
								N(a);
								var s = {};
								U(() => {
									X(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), Y(e, a);
							}), N(s);
							var c;
							ni(s);
							var l = H(s, 2), u = B(l);
							u.disabled = r === 0, Kr(u, () => i.up, !0), N(u);
							var d = H(u, 2);
							Kr(d, () => i.down, !0), N(d);
							var f = H(d, 2);
							Kr(f, () => i.cross, !0), N(f), N(l), N(o);
							var p = H(o, 2), h = (e) => {
								var n = La(), i = V(n), a = H(B(i));
								{
									let e = /* @__PURE__ */ F(Xe);
									Di(a, {
										get value() {
											return K(t).props.value;
										},
										get tokens() {
											return K(e);
										},
										label: "Lagets farge",
										onchange: (e) => Ke(r, "value", e)
									});
								}
								N(i);
								var o = H(i, 2), s = H(B(o)), c = B(s);
								N(s), N(o);
								var l = H(o, 2);
								Q(l), U((e) => {
									X(c, `${e ?? ""}%`), $(l, K(t).props.opacity ?? 1);
								}, [() => Math.round((K(t).props.opacity ?? 1) * 100)]), q("input", l, (e) => Ke(r, "opacity", Number(e.target.value))), Y(e, n);
							}, g = (e) => {
								var n = Ra(), i = V(n), a = H(B(i));
								{
									let e = /* @__PURE__ */ F(Xe);
									Di(a, {
										get value() {
											return K(t).props.stops[0];
										},
										get tokens() {
											return K(e);
										},
										label: "Gradient fra",
										onchange: (e) => qe(r, 0, e)
									});
								}
								N(i);
								var o = H(i, 2), s = H(B(o));
								{
									let e = /* @__PURE__ */ F(Xe);
									Di(s, {
										get value() {
											return K(t).props.stops[K(t).props.stops.length - 1];
										},
										get tokens() {
											return K(e);
										},
										label: "Gradient til",
										onchange: (e) => qe(r, K(t).props.stops.length - 1, e)
									});
								}
								N(o);
								var c = H(o, 2), l = H(B(c)), u = B(l);
								N(l), N(c);
								var d = H(c, 2);
								Q(d);
								var f = H(d, 2), p = H(B(f)), m = B(p);
								N(p), N(f);
								var h = H(f, 2);
								Q(h);
								var g = H(h, 2), _ = B(g);
								Q(_), P(), N(g), U((e, n) => {
									X(u, `${K(t).props.angle ?? ""}°`), $(d, K(t).props.angle), X(m, `${e ?? ""}%`), $(h, K(t).props.opacity ?? 1), li(_, n);
								}, [() => Math.round((K(t).props.opacity ?? 1) * 100), () => !!K(t).props.animate]), q("input", d, (e) => Ke(r, "angle", Number(e.target.value))), q("input", h, (e) => Ke(r, "opacity", Number(e.target.value))), q("change", _, (e) => Ke(r, "animate", e.target.checked)), Y(e, n);
							}, _ = (e) => {
								var n = za(), i = V(n), a = H(B(i));
								{
									let e = /* @__PURE__ */ F(Xe);
									Di(a, {
										get value() {
											return K(t).props.color;
										},
										get tokens() {
											return K(e);
										},
										label: "Glødens farge",
										onchange: (e) => Ke(r, "color", e)
									});
								}
								N(i);
								var o = H(i, 2), s = H(B(o)), c = B(s);
								N(s), N(o);
								var l = H(o, 2);
								Q(l);
								var u = H(l, 2), d = H(B(u)), f = B(d);
								N(d), N(u);
								var p = H(u, 2);
								Q(p);
								var m = H(p, 2), h = H(B(m)), g = B(h);
								N(h), N(m);
								var _ = H(m, 2);
								Q(_);
								var v = H(_, 2), y = H(B(v)), b = B(y);
								N(y), N(v);
								var x = H(v, 2);
								Q(x), U((e, n, r, i) => {
									X(c, `${e ?? ""}%`), $(l, K(t).props.x), X(f, `${n ?? ""}%`), $(p, K(t).props.y), X(g, `${r ?? ""}%`), $(_, K(t).props.radius), X(b, `${i ?? ""}%`), $(x, K(t).props.opacity);
								}, [
									() => Math.round(K(t).props.x * 100),
									() => Math.round(K(t).props.y * 100),
									() => Math.round(K(t).props.radius * 100),
									() => Math.round(K(t).props.opacity * 100)
								]), q("input", l, (e) => Ke(r, "x", Number(e.target.value))), q("input", p, (e) => Ke(r, "y", Number(e.target.value))), q("input", _, (e) => Ke(r, "radius", Number(e.target.value))), q("input", x, (e) => Ke(r, "opacity", Number(e.target.value))), Y(e, n);
							}, v = (e) => {
								var n = Ba(), i = V(n), a = H(B(i)), o = B(a);
								N(a), N(i);
								var s = H(i, 2);
								Q(s), U((e) => {
									X(o, `${e ?? ""}%`), $(s, K(t).props.opacity);
								}, [() => Math.round(K(t).props.opacity * 100)]), q("input", s, (e) => Ke(r, "opacity", Number(e.target.value))), Y(e, n);
							}, y = (e) => {
								var n = Ha(), i = V(n), a = B(i), o = H(a);
								N(i);
								var s = H(i, 2), c = H(B(s)), l = B(c);
								l.value = l.__value = "cover";
								var u = H(l);
								u.value = u.__value = "contain";
								var d = H(u);
								d.value = d.__value = "repeat", N(c);
								var f;
								ni(c), N(s);
								var p = H(s, 2), m = (e) => {
									var n = Va(), i = V(n), a = H(B(i)), o = B(a);
									N(a), N(i);
									var s = H(i, 2);
									Q(s);
									var c = H(s, 2), l = H(B(c)), u = B(l);
									N(l), N(c);
									var d = H(c, 2);
									Q(d), U((e, n) => {
										X(o, `${e ?? ""}%`), $(s, K(t).props.x ?? .5), X(u, `${n ?? ""}%`), $(d, K(t).props.y ?? .5);
									}, [() => Math.round((K(t).props.x ?? .5) * 100), () => Math.round((K(t).props.y ?? .5) * 100)]), q("input", s, (e) => Ke(r, "x", Number(e.target.value))), q("input", d, (e) => Ke(r, "y", Number(e.target.value))), Y(e, n);
								};
								Z(p, (e) => {
									(K(t).props.fit ?? "cover") !== "repeat" && e(m);
								});
								var h = H(p, 2), g = H(B(h)), _ = B(g);
								N(g), N(h);
								var v = H(h, 2);
								Q(v);
								var y = H(v, 2), b = H(B(y)), x = B(b);
								N(b), N(y);
								var S = H(y, 2);
								Q(S), U((e) => {
									X(a, `${K(t).props.src ? "Bytt bilde" : "Velg bilde"} `), f !== (f = K(t).props.fit ?? "cover") && (c.value = (c.__value = K(t).props.fit ?? "cover") ?? "", ti(c, K(t).props.fit ?? "cover")), X(_, `${K(t).props.blur ?? 0 ?? ""} px`), $(v, K(t).props.blur ?? 0), X(x, `${e ?? ""}%`), $(S, K(t).props.opacity ?? 1);
								}, [() => Math.round((K(t).props.opacity ?? 1) * 100)]), q("change", o, (e) => Ye(r, e)), q("change", c, (e) => Ke(r, "fit", e.target.value)), q("input", v, (e) => Ke(r, "blur", Number(e.target.value))), q("input", S, (e) => Ke(r, "opacity", Number(e.target.value))), Y(e, n);
							};
							Z(p, (e) => {
								K(t).type === "color" ? e(h) : K(t).type === "gradient" ? e(g, 1) : K(t).type === "glow" ? e(_, 2) : K(t).type === "grain" ? e(v, 3) : K(t).type === "image" && e(y, 4);
							}), N(a), U(() => {
								c !== (c = K(t).type) && (s.value = (s.__value = K(t).type) ?? "", ti(s, K(t).type)), d.disabled = r === K(Pe).length - 1;
							}), q("change", s, (e) => Je(r, e.target.value)), q("click", u, () => Ge(r, -1)), q("click", d, () => Ge(r, 1)), q("click", f, () => We(r)), Y(e, a);
						});
						var d = H(u, 2), f = H(B(d));
						Br(f, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(K(t), 2));
							let r = () => K(n)[0], i = () => K(n)[1];
							var a = Zi(), o = B(a, !0);
							N(a);
							var s = {};
							U(() => {
								X(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), Y(e, a);
						}), N(f), N(d);
						var p = H(d, 2), h = H(p, 4), g = H(B(h)), _ = B(g);
						_.value = _.__value = "", Br(H(_), 17, () => Object.entries(Ui), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(K(t), 2));
							let r = () => K(n)[0], i = () => K(n)[1];
							var a = Zi(), o = B(a, !0);
							N(a);
							var s = {};
							U(() => {
								X(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), Y(e, a);
						}), N(g);
						var v;
						ni(g), N(h);
						var y = H(h, 2), b = (e) => {
							var t = Pa(), n = V(t), r = H(B(n));
							Q(r), N(n);
							var i = H(n, 2), a = H(B(i));
							Q(a), N(i), P(2), U(() => {
								$(r, K(Fe).props.duration), $(a, K(Fe).props.delay);
							}), q("change", r, (e) => tt("duration", Number(e.target.value))), q("change", a, (e) => tt("delay", Number(e.target.value))), Y(e, t);
						};
						Z(y, (e) => {
							K(Fe) && Ui[K(Fe).type]?.entrance && e(b);
						}), U(() => {
							$(a, K(Ne)), li(s, K(Me) !== null), v !== (v = K(Fe)?.type ?? "") && (g.value = (g.__value = K(Fe)?.type ?? "") ?? "", ti(g, K(Fe)?.type ?? ""));
						}), q("change", a, (e) => nt(e.target.value)), q("change", s, (e) => at(e.target.checked)), ri(f, () => K(Be), (e) => z(Be, e)), q("click", p, () => Ve(K(Be))), q("change", g, (e) => et(e.target.value || null)), Y(e, t);
					}, s = (e) => {
						Y(e, Ga());
					};
					Z(r, (e) => {
						K(k) ? e(a) : K(je) ? e(o, 1) : e(s, -1);
					}), N(t), Y(e, t);
				}, h = (e) => {
					var t = qa(), n = H(B(t), 2), r = B(n);
					Q(r), P(), N(n);
					var i = H(n, 4);
					it(i), ui(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = H(i, 4), o = H(B(a)), s = B(o);
					s.value = s.__value = "left";
					var c = H(s);
					c.value = c.__value = "center";
					var l = H(c);
					l.value = l.__value = "right", N(o);
					var u;
					ni(o), N(a), P(2), N(t), U((e) => {
						li(r, e), $(i, K(E).footer?.text ?? ""), u !== (u = K(E).footer?.align ?? "center") && (o.value = (o.__value = K(E).footer?.align ?? "center") ?? "", ti(o, K(E).footer?.align ?? "center"));
					}, [() => !!K(E).footer?.show]), q("change", r, (e) => zt("footer", (t) => {
						t.show = e.target.checked;
					})), q("input", i, (e) => zt("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), q("change", o, (e) => zt("footer", (t) => {
						t.align = e.target.value;
					})), Y(e, t);
				}, v = (e) => {
					var t = Qa(), n = H(B(t), 2), r = (e) => {
						Y(e, Ja());
					}, i = (e) => {
						var t = ca(), n = V(t), r = (e) => {
							var t = Ya(), n = B(t, !0);
							N(t), U(() => X(n, K(pt))), Y(e, t);
						};
						Z(n, (e) => {
							K(pt) && e(r);
						});
						var i = H(n, 2), a = (e) => {
							var t = Za(), n = V(t);
							Br(H(n, 2), 19, () => K(ft), (e) => e.sha, (e, t, n) => {
								var r = Xa();
								let i;
								var a = B(r), o = B(a, !0);
								N(a);
								var s = H(a, 2), c = B(s);
								N(s), N(r), U((e) => {
									i = Qr(r, 1, "history-row svelte-1n46o8q", null, i, { head: K(n) === 0 }), ui(a, "title", K(t).sha), X(o, K(t).message), X(c, `${K(t).author ?? ""}${e ?? ""}`);
								}, [() => K(t).date ? ` · ${gt.format(new Date(K(t).date))}` : ""]), Y(e, r);
							}), U(() => {
								n.disabled = K(mt) || !K(g)?.allowed, ui(n, "title", K(g)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), q("click", n, vt), Y(e, t);
						};
						Z(i, (e) => {
							K(ft).length > 0 && e(a);
						}), Y(e, t);
					};
					Z(n, (e) => {
						K(ft) === null ? e(r) : e(i, -1);
					}), N(t), Y(e, t);
				};
				Z(o, (e) => {
					K(ye) === "Sider" ? e(s) : K(ye) === "Nav" ? e(l, 1) : K(ye) === "Tema" ? e(u, 2) : K(ye) === "Blokker" ? e(d, 3) : K(ye) === "Grid" ? e(f, 4) : K(ye) === "Egenskaper" ? e(p, 5) : K(ye) === "Footer" ? e(h, 6) : K(ye) === "Historikk" && e(v, 7);
				}), N(t), U(() => X(a, K(ye))), Y(e, t);
			};
			Z(a, (e) => {
				K(ye) && e(o);
			}), Y(e, t);
		};
		Z(r, (e) => {
			K(v) && e(a);
		});
		var o = H(r, 2);
		let s;
		var l = B(o);
		vi(l, (e) => z(h, e), () => K(h)), N(o), N(t), U(() => {
			s = Qr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: K(y) === "mobile" }), ui(l, "src", `/?page=${K(c)}&preview=1`);
		}), xr("load", l, St), yr(l), Y(e, t);
	}, W = (e) => {
		Y(e, no());
	};
	Z(Hn, (e) => {
		K(s) ? e(Un) : e(W, -1);
	});
	var Wn = H(Hn, 2), Gn = (e) => {
		var t = ro(), n = B(t), r = H(B(n), 4), i = H(B(r));
		Q(i), N(r);
		var a = H(r, 2);
		Di(H(B(a)), {
			get value() {
				return K(he);
			},
			label: "Aksentfarge",
			onchange: (e) => z(he, e, !0)
		}), N(a);
		var o = H(a, 2);
		Di(H(B(o)), {
			get value() {
				return K(ge);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => z(ge, e, !0)
		}), N(o);
		var s = H(o, 4), c = B(s), l = H(c, 2);
		N(s), N(n), N(t), U((e) => l.disabled = e, [() => !K(me).trim()]), q("keydown", i, (e) => e.key === "Enter" && ve()), mi(i, () => K(me), (e) => z(me, e)), q("click", c, _e), q("click", l, ve), Y(e, t);
	};
	Z(Wn, (e) => {
		K(pe) && e(Gn);
	});
	var G = H(Wn, 2), Kn = (e) => {
		var t = io();
		let n;
		var r = B(t), i = B(r, !0);
		N(r);
		var a = H(r, 2);
		N(t), U(() => {
			n = Qr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: K(d) === "ok",
				error: K(d) === "error"
			}), X(i, K(u));
		}), q("click", a, () => p("")), Y(e, t);
	};
	Z(G, (e) => {
		K(u) && e(Kn);
	}), N(Tn), U(() => {
		kn = Qr(On, 1, "topbar svelte-1n46o8q", null, kn, { hidden: !K(v) }), Mn !== (Mn = K(o)) && (jn.value = (jn.__value = K(o)) ?? "", ti(jn, K(o)));
	}), q("change", jn, (e) => z(o, e.target.value, !0)), Y(e, Tn), Ue();
}
Sr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var so = jr(oo, { target: document.getElementById("urd-admin") });
//#endregion
export { so as default };
