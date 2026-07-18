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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, w = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol(""), se = Symbol("attributes"), T = Symbol("class"), ce = Symbol("style"), le = Symbol("text"), ue = Symbol("form reset"), de = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), fe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function pe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function me(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function he() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ge() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function _e() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ve() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function E() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var ye = {}, D = Symbol("uninitialized"), O = "http://www.w3.org/1999/xhtml";
function be() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function xe(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Se() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ce() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function we(e) {
	k = e;
}
var A;
function Te(e) {
	if (e === null) throw xe(), ye;
	return A = e;
}
function Ee() {
	return Te(/* @__PURE__ */ rn(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ rn(A) !== null) throw xe(), ye;
		A = e;
	}
}
function De(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ rn(n);
		A = n;
	}
}
function Oe(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ rn(n);
		e && n.remove(), n = i;
	}
}
function ke(e) {
	if (!e || e.nodeType !== 8) throw xe(), ye;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ae(e) {
	return e === this.v;
}
function je(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Me(e) {
	return !je(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ne = [];
function Pe(e, t = !1, n = !1) {
	return Fe(e, /* @__PURE__ */ new Map(), "", Ne, null, n);
}
function Fe(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Fe(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Fe(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Fe(t.toJSON(), n, r, i, t);
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
var Ie = null;
function Le(e) {
	Ie = e;
}
function Re(e, t = !1, n) {
	Ie = {
		p: Ie,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: null
	};
}
function ze(e) {
	var t = Ie, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) pn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ie = t.p, e ?? {};
}
function Be() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ve = [];
function He() {
	var e = Ve;
	Ve = [], f(e);
}
function Ue(e) {
	if (Ve.length === 0 && !St) {
		var t = Ve;
		queueMicrotask(() => {
			t === Ve && He();
		});
	}
	Ve.push(e);
}
function We() {
	for (; Ve.length > 0;) He();
}
function M(e) {
	var t = U;
	if (t === null) return H.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ge(e, t);
}
function Ge(e, t) {
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
var Ke = ~(g | _ | h);
function N(e, t) {
	e.f = e.f & Ke | t;
}
function qe(e) {
	e.f & 512 || e.deps === null ? N(e, h) : N(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Je(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, Je(t.deps));
}
function Ye(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Je(e.deps), N(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function Xe(e) {
	k && /* @__PURE__ */ nn(e) !== null && an(e);
}
var Ze = !1;
function Qe() {
	Ze || (Ze = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function $e(e) {
	var t = H, n = U;
	In(null), Ln(null);
	try {
		return e();
	} finally {
		In(t), Ln(n);
	}
}
function et(e, t, n, r = n) {
	e.addEventListener(t, () => $e(n));
	let i = e[ue];
	i ? e[ue] = () => {
		i(), r(!0);
	} : e[ue] = () => r(!0), Qe();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function tt(e) {
	let t = 0, n = Vt(0), r;
	return () => {
		dn() && (W(n), _n(() => (t === 0 && (r = ir(() => e(() => Gt(n)))), t += 1, () => {
			Ue(() => {
				--t, t === 0 && (r?.(), r = void 0, Gt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var nt = S | C;
function rt(e, t, n, r) {
	new it(e, t, n, r);
}
var it = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = k ? A : null;
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
	#h = tt(() => (this.#m = Vt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = vn(() => {
			if (k) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, nt), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = yn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = yn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = yn(() => e(this.#e)), Ue(() => {
			var e = this.#c = document.createDocumentFragment(), t = tn();
			e.append(t), this.#a = this.#x(() => yn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, En(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = yn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				An(this.#a, e);
				let t = this.#n.pending;
				this.#o = yn(() => t(this.#e));
			} else this.#b(P);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Ye(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = U, n = H, r = Ie;
		Ln(this.#i), In(this.#i), Le(this.#i.ctx);
		try {
			return Ot.ensure(), e();
		} catch (e) {
			return M(e), null;
		} finally {
			Ln(t), In(n), Le(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && En(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ue(() => {
			this.#d = !1, this.#m && Ut(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), W(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Cn(this.#a), null), this.#o &&= (Cn(this.#o), null), this.#s &&= (Cn(this.#s), null), k && (Te(this.#t), De(), Te(Oe()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ce();
				return;
			}
			r = !0, i && E(), this.#s !== null && En(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ge(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return yn(() => {
						var t = U;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ge(e, this.#i.parent), null;
				}
			}));
		};
		Ue(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ge(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ge(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function at(e, t, n, r) {
	let i = Be() ? lt : pt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = U, c = ot(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ge(e, s);
			}
			st();
		}
	}
	var d = ct();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ dt(e))).then(u).catch((e) => Ge(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), st();
	}) : f();
}
function ot() {
	var e = U, t = H, n = Ie, r = P;
	return function(i = !0) {
		Ln(e), In(t), Le(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function st(e = !0) {
	Ln(null), In(null), Le(null), e && P?.deactivate();
}
function ct() {
	var e = U, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function lt(e) {
	var t = 2 | g;
	return U !== null && (U.f |= C), {
		ctx: Ie,
		deps: null,
		effects: null,
		equals: Ae,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: U,
		ac: null
	};
}
var ut = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function dt(e, t, n) {
	let r = U;
	r === null && pe();
	var i = void 0, a = Vt(D), o = !H, s = /* @__PURE__ */ new Set();
	return gn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(st);
		} catch (e) {
			n.reject(e), st();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = ct();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ut);
			else for (let e of s.values()) e.reject(ut);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ut && (c.activate(), t ? (a.f |= ie, Ut(a, t)) : (a.f & 8388608 && (a.f ^= ie), Ut(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), fn(() => {
		for (let e of s) e.reject(ut);
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
function ft(e) {
	let t = /* @__PURE__ */ lt(e);
	return zn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function pt(e) {
	let t = /* @__PURE__ */ lt(e);
	return t.equals = Me, t;
}
function mt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Cn(t[n]);
	}
}
function ht(e) {
	var t, n = U, r = e.parent;
	if (!Nn && r !== null && e.v !== D && r.f & 24576) return be(), e.v;
	Ln(r);
	try {
		e.f &= ~ne, mt(e), t = Zn(e);
	} finally {
		Ln(n);
	}
	return t;
}
function gt(e) {
	var t = ht(e);
	if (!e.equals(t) && (e.wv = Jn(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), bt?.capture(e, t, !0)), e.deps === null))) {
		N(e, h);
		return;
	}
	Nn || (xt === null ? qe(e) : (dn() || P?.is_fork) && xt.set(e, t));
}
function _t(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && $e(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), $n(t, 0), xn(t));
}
function vt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && er(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var yt = null, P = null, bt = null, xt = null, F = null, St = !1, Ct = !1, wt = null, Tt = null, Et = 0, Dt = 1, Ot = class e {
	id = Dt++;
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
		yt === null ? yt = this : (yt.#n = this, this.#t = yt), yt = this;
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
			for (var r of n.d) N(r, g), t(r);
			for (r of n.m) N(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Et++ > 1e3 && (this.#x(), At());
		for (let e of this.#u) this.#d.delete(e), N(e, g), this.schedule(e);
		for (let e of this.#d) N(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = wt = [], r = [], i = Tt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Lt(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (wt = null, Tt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) It(e, t);
			i.length > 0 && P.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), bt = this, Mt(r), Mt(n), bt = null, this.#s?.resolve();
		var s = P;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : Yn(r) && (i & 16 && this.#d.add(r), er(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), N(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), P = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) Ye(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), xt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, xt = null;
	}
	flush() {
		try {
			Ct = !0, P = this, this.#g();
		} finally {
			Et = 0, F = null, wt = null, Tt = null, Ct = !1, P = null, xt = null, zt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(ut);
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
		this.#m || (this.#m = !0, Ue(() => {
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
		if (P === null) {
			let t = P = new e();
			!Ct && !St && Ue(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		xt = null;
	}
	schedule(e) {
		if (F = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (wt !== null && t === U && (H === null || !(H.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? yt = e : t.#t = e, this.linked = !1;
		}
	}
};
function kt(e) {
	var t = St;
	St = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (We(), P === null) return n;
			P.flush();
		}
	} finally {
		St = t;
	}
}
function At() {
	try {
		he();
	} catch (e) {
		Ge(e, F);
	}
}
var jt = null;
function Mt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Yn(r) && (jt = /* @__PURE__ */ new Set(), er(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Tn(r), jt?.size > 0)) {
				zt.clear();
				for (let e of jt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) jt.has(n) && (jt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || er(n);
					}
				}
				jt.clear();
			}
		}
		jt = null;
	}
}
function Nt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Nt(i, t, n, r) : e & 4194320 && !(e & 2048) && Pt(i, t, r) && (N(i, g), Ft(i));
	}
}
function Pt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Pt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Ft(e) {
	P.schedule(e);
}
function It(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), N(e, h);
		for (var n = e.first; n !== null;) It(n, t), n = n.next;
	}
}
function Lt(e) {
	N(e, h);
	for (var t = e.first; t !== null;) Lt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Rt = /* @__PURE__ */ new Set(), zt = /* @__PURE__ */ new Map(), Bt = !1;
function Vt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ae,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t) {
	let n = Vt(e, t);
	return zn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Ht(e, t = !1, n = !0) {
	let r = Vt(e);
	return t || (r.equals = Me), r;
}
function L(e, t, n = !1) {
	return H !== null && (!Fn || H.f & 131072) && Be() && H.f & 4325394 && (Rn === null || !Rn.has(e)) && ve(), Ut(e, n ? qt(t) : t, Tt);
}
function Ut(e, t, n = null) {
	if (!e.equals(t)) {
		zt.set(e, Nn ? t : e.v);
		var r = Ot.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ht(t), xt === null && qe(t);
		}
		e.wv = Jn(), Kt(e, g, n), Be() && U !== null && U.f & 1024 && !(U.f & 96) && (Hn === null ? Un([e]) : Hn.push(e)), !r.is_fork && Rt.size > 0 && !Bt && Wt();
	}
	return t;
}
function Wt() {
	Bt = !1;
	for (let e of Rt) {
		e.f & 1024 && N(e, _);
		let t;
		try {
			t = Yn(e);
		} catch {
			t = !0;
		}
		t && er(e);
	}
	Rt.clear();
}
function Gt(e) {
	L(e, e.v + 1);
}
function Kt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Be(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && N(s, t), c & 131072) Rt.add(s);
			else if (c & 2) {
				var u = s;
				xt?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= ne), Kt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && jt !== null && jt.add(d), n === null ? Ft(d) : n.push(d);
			}
		}
	}
}
function qt(t) {
	if (typeof t != "object" || !t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = Kn, f = (e) => {
		if (Kn === d) return e();
		var t = H, n = Kn;
		In(null), qn(d);
		var r = e();
		return In(t), qn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ge();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ I(n.value, u);
				return r.set(t, e), e;
			}) : L(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ I(D, u));
					r.set(t, e), Gt(o);
				}
			} else L(n, D), Gt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(qt(s ? e[n] : D), u)), r.set(n, o)), o !== void 0) {
				var c = W(o);
				return c === D ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = W(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== D) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== D || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? qt(e[t]) : D, u)), r.set(t, n)), W(n) === D) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(D, u)), r.set(d + "", p)) : L(p, D);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, qt(n)), r.set(t, c));
			else {
				l = c.v !== D;
				var m = f(() => qt(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				Gt(o);
			}
			return !0;
		},
		ownKeys(e) {
			W(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [n, i] of r) i.v !== D && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			_e();
		}
	});
}
function Jt(e) {
	try {
		if (typeof e == "object" && e && ae in e) return e[ae];
	} catch {}
	return e;
}
function Yt(e, t) {
	return Object.is(Jt(e), Jt(t));
}
var Xt, Zt, Qt, $t;
function en() {
	if (Xt === void 0) {
		Xt = window, Zt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Qt = a(t, "firstChild").get, $t = a(t, "nextSibling").get, u(e) && (e[T] = void 0, e[se] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
	}
}
function tn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function nn(e) {
	return Qt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function rn(e) {
	return $t.call(e);
}
function R(e, t) {
	if (!k) return /* @__PURE__ */ nn(e);
	var n = /* @__PURE__ */ nn(A);
	if (n === null) n = A.appendChild(tn());
	else if (t && n.nodeType !== 3) {
		var r = tn();
		return n?.before(r), Te(r), r;
	}
	return t && cn(n), Te(n), n;
}
function z(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ nn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ rn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = tn();
			return A?.before(r), Te(r), r;
		}
		cn(A);
	}
	return A;
}
function B(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ rn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = tn();
			return r === null ? i?.after(a) : r.before(a), Te(a), a;
		}
		cn(r);
	}
	return Te(r), r;
}
function an(e) {
	e.textContent = "";
}
function on() {
	return !1;
}
function sn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function cn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function ln(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function un(e, t) {
	var n = U;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Ie,
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
	P?.register_created_effect(r);
	var i = r;
	if (e & 4) wt === null ? Ot.ensure().schedule(r) : wt.push(r);
	else if (t !== null) {
		try {
			er(r);
		} catch (e) {
			throw Cn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && ln(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function dn() {
	return H !== null && !Fn;
}
function fn(e) {
	let t = un(8, null);
	return N(t, h), t.teardown = e, t;
}
function pn(e) {
	return un(4 | ee, e);
}
function mn(e) {
	Ot.ensure();
	let t = un(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? En(t, () => {
			Cn(t), n(void 0);
		}) : (Cn(t), n(void 0));
	});
}
function hn(e) {
	return un(4, e);
}
function gn(e) {
	return un(w | C, e);
}
function _n(e, t = 0) {
	return un(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	at(r, t, n, (t) => {
		un(8, () => {
			e(...t.map(W));
		});
	});
}
function vn(e, t = 0) {
	return un(16 | t, e);
}
function yn(e) {
	return un(32 | C, e);
}
function bn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Nn, n = H;
		Pn(!0), In(null);
		try {
			t.call(null);
		} finally {
			Pn(e), In(n);
		}
	}
}
function xn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && $e(() => {
			e.abort(de);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Cn(n, t), n = r;
	}
}
function Sn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Cn(t), t = n;
	}
}
function Cn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (wn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, xn(e, t && !n), $n(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	bn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Tn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function wn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ rn(e);
		e.remove(), e = n;
	}
}
function Tn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function En(e, t, n = !0) {
	var r = [];
	Dn(e, r, !0);
	var i = () => {
		n && Cn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Dn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Dn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function On(e) {
	kn(e, !0);
}
function kn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (N(e, g), Ot.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			kn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function An(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ rn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var jn = null, Mn = !1, Nn = !1;
function Pn(e) {
	Nn = e;
}
var H = null, Fn = !1;
function In(e) {
	H = e;
}
var U = null;
function Ln(e) {
	U = e;
}
var Rn = null;
function zn(e) {
	H !== null && (Rn ??= /* @__PURE__ */ new Set()).add(e);
}
var Bn = null, Vn = 0, Hn = null;
function Un(e) {
	Hn = e;
}
var Wn = 1, Gn = 0, Kn = Gn;
function qn(e) {
	Kn = e;
}
function Jn() {
	return ++Wn;
}
function Yn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Yn(a) && gt(a), a.wv > e.wv) return !0;
		}
		t & 512 && xt === null && N(e, h);
	}
	return !1;
}
function Xn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Rn !== null && Rn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Xn(a, t, !1) : t === a && (n ? N(a, g) : a.f & 1024 && N(a, _), Ft(a));
	}
}
function Zn(e) {
	var t = Bn, n = Vn, r = Hn, i = H, a = Rn, o = Ie, s = Fn, c = Kn, l = e.f;
	Bn = null, Vn = 0, Hn = null, H = l & 96 ? null : e, Rn = null, Le(e.ctx), Fn = !1, Kn = ++Gn, e.ac !== null && ($e(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (Bn !== null) {
			var m;
			if (p || $n(e, Vn), f !== null && Vn > 0) for (f.length = Vn + Bn.length, m = 0; m < Bn.length; m++) f[Vn + m] = Bn[m];
			else e.deps = f = Bn;
			if (dn() && e.f & 512) for (m = Vn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Vn < f.length && ($n(e, Vn), f.length = Vn);
		if (Be() && Hn !== null && !Fn && f !== null && !(e.f & 6146)) for (m = 0; m < Hn.length; m++) Xn(Hn[m], e);
		if (i !== null && i !== e) {
			if (Gn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Gn;
			if (t !== null) for (let e of t) e.rv = Gn;
			Hn !== null && (r === null ? r = Hn : r.push(...Hn));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return M(e);
	} finally {
		e.f ^= re, Bn = t, Vn = n, Hn = r, H = i, Rn = a, Le(o), Fn = s, Kn = c;
	}
}
function Qn(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Bn === null || !n.call(Bn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== D && qe(s), s.ac !== null && $e(() => {
			s.ac.abort(de), s.ac = null;
		}), _t(s), $n(s, 0);
	}
}
function $n(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Qn(e, n[r]);
}
function er(e) {
	var t = e.f;
	if (!(t & 16384)) {
		N(e, h);
		var n = U, r = Mn;
		U = e, Mn = (t & 96) == 0;
		try {
			t & 16777232 ? Sn(e) : xn(e), bn(e);
			var i = Zn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Wn;
		} finally {
			Mn = r, U = n;
		}
	}
}
async function tr() {
	await Promise.resolve(), kt();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (jn?.add(e), H !== null && !Fn && !(U !== null && U.f & 16384) && (Rn === null || !Rn.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < Gn && (e.rv = Gn, Bn === null && r !== null && r[Vn] === e ? Vn++ : Bn === null ? Bn = [e] : Bn.push(e));
		else {
			H.deps ??= [], n.call(H.deps, e) || H.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [H] : n.call(i, H) || i.push(H);
		}
	}
	if (Nn && zt.has(e)) return zt.get(e);
	if (t) {
		var a = e;
		if (Nn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || rr(a)) && (o = ht(a)), zt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Fn && H !== null && (Mn || (H.f & 512) != 0), c = (a.f & b) === 0;
		Yn(a) && (s && (a.f |= 512), gt(a)), s && !c && (vt(a), nr(a));
	}
	if (xt?.has(e)) return xt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function nr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (vt(t), nr(t));
}
function rr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (zt.has(t) || t.f & 2 && rr(t)) return !0;
	return !1;
}
function ir(e) {
	var t = Fn;
	try {
		return Fn = !0, e();
	} finally {
		Fn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var ar = ["touchstart", "touchmove"];
function or(e) {
	return ar.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var sr = Symbol("events"), cr = /* @__PURE__ */ new Set(), lr = /* @__PURE__ */ new Set();
function ur(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function dr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || hr.call(t, e), !e.cancelBubble) return $e(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ue(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function fr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = dr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && fn(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[sr] ??= {})[e] = n;
}
function pr(e) {
	for (var t = 0; t < e.length; t++) cr.add(e[t]);
	for (var n of lr) n(e);
}
var mr = null;
function hr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	mr = e;
	var s = 0, c = mr === e && e[sr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[sr] = t;
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
		var d = H, f = U;
		In(null), Ln(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[sr]?.[r];
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
			e[sr] = t, delete e.currentTarget, In(d), Ln(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var gr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function _r(e) {
	return gr?.createHTML(e) ?? e;
}
function vr(e) {
	var t = sn("template");
	return t.innerHTML = _r(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function yr(e, t) {
	var n = U;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function K(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (k) return yr(A, null), A;
		i === void 0 && (i = vr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ nn(i)));
		var t = r || Zt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ nn(t), s = t.lastChild;
			yr(o, s);
		} else yr(t, t);
		return t;
	};
}
function q(e, t) {
	if (k) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Ee();
		return;
	}
	e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[le] ??= e.nodeValue) && (e[le] = n, e.nodeValue = `${n}`);
}
function br(e, t) {
	return Sr(e, t);
}
var xr = /* @__PURE__ */ new Map();
function Sr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	en();
	var l = void 0, u = mn(() => {
		var s = n ?? t.appendChild(tn());
		rt(s, { pending: () => {} }, (t) => {
			Re({});
			var n = Ie;
			if (o && (n.c = o), a && (i.$$events = a), k && yr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw xe(), ye;
			ze();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = or(r);
					for (let e of [t, document]) {
						var a = xr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), xr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, hr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(cr)), lr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = xr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, hr), r.delete(e), r.size === 0 && xr.delete(n)) : r.set(e, i);
			}
			lr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Cr.set(l, u), l;
}
var Cr = /* @__PURE__ */ new WeakMap(), wr = class {
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
			if (n) On(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (On(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Cn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						An(r, t), t.append(tn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Cn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), En(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Cn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = on();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = tn();
			i.append(a), this.#n.set(e, {
				effect: yn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, yn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	k && (r = A, Ee());
	var i = new wr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = ke(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Oe();
				Te(a), i.anchor = a, we(!1), i.ensure(e, t), we(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	vn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Tr(e, t) {
	return t;
}
function Er(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		En(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Dr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			an(d), d.append(u), e.items.clear();
		}
		Dr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Dr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, An(a, document.createDocumentFragment())) : Cn(t[i], n);
	}
}
var Or;
function kr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? Te(/* @__PURE__ */ nn(u)) : u.appendChild(tn());
	}
	k && Ee();
	var d = null, f = /* @__PURE__ */ pt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, jr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Nr(d, null, c)) : On(d) : En(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: vn(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			k && ke(c) === "[!" != (e === 0) && (c = Oe(), Te(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = on(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Ut(S.v, b), S.i && Ut(S.i, y), v && u.unskip_effect(S.e)) : (S = Mr(l, h ? c : Or ??= tn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = yn(() => s(c)) : (d = yn(() => s(Or ??= tn())), d.f |= te)), e > r.size && me("", "", ""), k && e > 0 && Te(Oe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && we(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Ar(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function jr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Ar(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (On(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) Nr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Pr(e, d, _), Pr(e, _, y), Nr(_, y, n), d = _, p = [], m = [], l = Ar(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Nr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Pr(e, S.prev, C.next), Pr(e, d, S), Pr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Nr(_, l, n), Pr(e, _.prev, _.next), Pr(e, _, d === null ? e.effect.first : d.next), Pr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Ar(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Ar(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Dr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Ar(l.next);
		var ne = ee.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.fix();
			}
			Er(e, ee, re);
		}
	}
	o && Ue(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Mr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Vt(n) : /* @__PURE__ */ Ht(n, !1, !1) : null, l = o & 2 ? Vt(i) : null;
	return {
		v: c,
		i: l,
		e: yn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Nr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ rn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Pr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Fr = [..." 	\n\r\f\xA0\v﻿"];
function Ir(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Fr.includes(r[o - 1])) && (s === r.length || Fr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Lr(e, t, n, r, i, a) {
	var o = e[T];
	if (k || o !== n || o === void 0) {
		var s = Ir(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[T] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function X(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return Se();
		for (var i of t.options) i.selected = n.includes(zr(i));
		return;
	}
	for (i of t.options) if (Yt(zr(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Z(e) {
	var t = new MutationObserver(() => {
		X(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), fn(() => {
		t.disconnect();
	});
}
function Rr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	et(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), zr);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && zr(o);
		}
		n(a), e.__value = a, P !== null && r.add(P);
	}), hn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = P;
			if (r.has(o)) return;
		}
		if (X(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = zr(s), n(a));
		}
		e.__value = a, i = !1;
	}), Z(e);
}
function zr(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Br = Symbol("is custom element"), Vr = Symbol("is html"), Hr = fe ? "link" : "LINK", Ur = fe ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Gr(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Gr(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ue] = n, Ue(n), Qe();
	}
}
function $(e, t) {
	var n = Kr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Ur) || (e.value = t ?? "");
}
function Wr(e, t) {
	var n = Kr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Gr(e, t, n, r) {
	var i = Kr(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Hr) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Jr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Kr(e) {
	return e[se] ??= {
		[Br]: e.nodeName.includes("-"),
		[Vr]: e.namespaceURI === O
	};
}
var qr = /* @__PURE__ */ new Map();
function Jr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = qr.get(t);
	if (n) return n;
	qr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Yr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	et(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Xr(e) ? Zr(a) : a, n(a), P !== null && r.add(P), await tr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || ir(t) == null && e.value) && (n(Xr(e) ? Zr(e.value) : e.value), P !== null && r.add(P)), _n(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		Xr(e) && n === Zr(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Xr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Zr(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Qr(e, t) {
	return e === t || e?.[ae] === t;
}
function $r(e = {}, t, n, r) {
	var i = Ie.r, a = U;
	return hn(() => {
		var o, s;
		return _n(() => {
			o = s, s = r?.() || [], ir(() => {
				Qr(n(...s), e) || (t(e, ...s), o && Qr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Qr(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function ei(e, t) {
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
//#region src/lib/previewBridge.js
function ti(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n);
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
var ni = (e) => Math.round(e * 100) / 100;
function ri(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ii = {
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
					x: ni(r.x * 100 / e.columns),
					w: ni(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= ri(t.grid);
		return e;
	}
}, ai = { 1: (e) => (e.grid = ri(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function oi(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ai[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function si(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ii[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/theme.js
function ci(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var li = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ci(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, ui = {
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
		let n = t.stops.map(ci).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, di = {
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
		let n = ci(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity);
	}
}, fi = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", pi = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = fi, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity);
	}
}, mi = {
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
		t.src && (e.style.backgroundImage = `url("${t.src}")`, t.fit === "repeat" ? (e.style.backgroundSize = "auto", e.style.backgroundRepeat = "repeat") : (e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundRepeat = "no-repeat"), e.style.backgroundPosition = `${(t.x ?? .5) * 100}% ${(t.y ?? .5) * 100}%`, e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`));
	}
}, hi = () => ({
	duration: 600,
	delay: 0
}), gi = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: hi,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: hi,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: hi,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
}, _i = 1600, vi = .82, yi = .6;
async function bi(e) {
	let t = await createImageBitmap(e), n = Math.min(1, _i / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(vi);
	return s.size > 4e5 && (s = await o(yi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function xi(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Si(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var Ci = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), wi = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\"> </option>"), Ti = /* @__PURE__ */ K("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), Ei = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), Di = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), Oi = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"> </span>"), ki = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), Ai = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), ji = /* @__PURE__ */ K("<button> </button>"), Mi = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Ni = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Pi = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), Fi = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Ii = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Li = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/>"), Ri = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bildehøyde px <input type=\"number\" min=\"12\" max=\"128\" class=\"svelte-1n46o8q\"/></label>", 1), zi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Bilde først</option><option class=\"svelte-1n46o8q\">Tekst først</option></select></label>"), Bi = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Vi = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span> <select class=\"nav-target svelte-1n46o8q\" title=\"Hvor lenken går\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Hi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde</option><option class=\"svelte-1n46o8q\">Bilde + tekst</option></select></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p> <label class=\"svelte-1n46o8q\">Menyplassering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Høyre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Venstre (etter logoen)</option></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), Ui = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Wi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), Gi = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Ki = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), qi = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Ji = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <p class=\"panel-hint svelte-1n46o8q\">Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Yi = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Xi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Zi = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label>", 1), Qi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), $i = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tegn/emoji <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/></label> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), ea = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), ta = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), na = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> 📵 Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), ra = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ia = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), aa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fra <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Til <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), oa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), sa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ca = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), la = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ua = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\">×</button></span></span> <!></div>"), da = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), fa = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), pa = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), ma = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), ha = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), ga = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), _a = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), va = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), ya = /* @__PURE__ */ K("<!> <!>", 1), ba = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), xa = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Sa = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Ca = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), wa = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Ta = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Ea = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Da = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!></div>");
function Oa(e, t) {
	Re(t, !0);
	let n = [
		["color", li],
		["gradient", ui],
		["glow", di],
		["image", mi],
		["grain", pi]
	], r = Object.fromEntries(n), i = /* @__PURE__ */ I(null), a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(""), c = /* @__PURE__ */ I("info"), l = 0;
	function u(e, t = "info") {
		L(s, e, !0), L(c, t, !0);
		let n = ++l;
		t === "ok" && setTimeout(() => {
			l === n && (L(s, ""), L(c, "info"));
		}, 8e3);
	}
	let d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(qt({
		size: 16,
		snap: !0
	})), h = /* @__PURE__ */ I(!0), g = /* @__PURE__ */ I("desktop"), _ = /* @__PURE__ */ I(0);
	function v() {
		L(_, b?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function y(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, v(), S?.sendAttention(e.id, !0));
	}
	let b = null, x = null, S = null, C = /* @__PURE__ */ I(null);
	function ee() {
		L(C, x.data, !0), x.replace(W(C));
	}
	function te() {
		S?.sendSite(Pe(W(C)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => W(C).pages.find((e) => e.id === W(a));
	function w() {
		let e = W(C)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		L(o, e || b?.hasDraft() && !ne.has(W(a)) || x?.hasDraft() || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			page: b.data,
			site: x.data
		});
	}
	function T(e) {
		e === oe && (e.startsWith("edit:") || e === "grid") || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function ce(e) {
		let { page: t, site: n } = JSON.parse(e);
		b.replace(t), x.replace(n), ee(), b.save(), x.save(), L(p, {
			snap: !0,
			...W(C).grid
		}, !0), w(), v(), te(), W(C).pages.some((e) => e.id === W(a)) ? S?.sendPage(W(a), b.data) : yt(W(C).pages[0].id);
	}
	function le() {
		ie.length && (ae.push(se()), ce(ie.pop()), oe = null, u("Angret"));
	}
	function ue() {
		ae.length && (ie.push(se()), ce(ae.pop()), oe = null, u("Gjentatt"));
	}
	function de(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? ue() : le());
	}
	async function fe() {
		L(i, oi(await (await fetch("/content/site.json")).json()), !0), x = ei("urd-draft-site", () => W(i)), x.replace(oi(x.data)), x.save(), ee(), L(p, {
			snap: !0,
			...W(C).grid
		}, !0), await yt(new URLSearchParams(location.search).get("page") ?? W(C).pages[0].id), await at(), st(), W(C).site.title === "Min forening" && !localStorage.getItem("urd-setup-done") && (L(me, W(C).site.title, !0), L(he, W(C).theme.tokens.color.accent, !0), L(ge, W(C).theme.tokens.color.bg, !0), L(pe, !0));
	}
	let pe = /* @__PURE__ */ I(!1), me = /* @__PURE__ */ I(""), he = /* @__PURE__ */ I("#7c5cff"), ge = /* @__PURE__ */ I("#0b0e14");
	function _e() {
		localStorage.setItem("urd-setup-done", "1"), L(pe, !1);
	}
	function ve() {
		let e = W(me).trim();
		e && (F("setup", () => {
			W(C).site.title = e, W(C).nav.logo = {
				type: "text",
				value: e
			}, W(C).theme.tokens.color.accent = W(he), W(C).theme.tokens.color.bg = W(ge);
		}), _e(), u("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let E = /* @__PURE__ */ I(null), ye = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Footer",
		"Grid",
		"Historikk"
	];
	function D(e) {
		L(E, W(E) === e ? null : e, !0), S?.sendShowGrid(W(E) === "Grid"), W(E) === "Historikk" && pt();
	}
	let O = /* @__PURE__ */ I(null);
	function be(e, t) {
		let n = b?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function xe() {
		if (!W(O)) return;
		let { block: e } = be(W(O).sectionId, W(O).blockId);
		if (!e) {
			L(O, null);
			return;
		}
		L(O, {
			sectionId: W(O).sectionId,
			blockId: W(O).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function Se(e) {
		if (!e.blockId) {
			L(O, null);
			return;
		}
		L(O, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), xe(), W(O) && W(E) !== "Egenskaper" && (L(E, "Egenskaper"), S?.sendShowGrid(!1));
	}
	function Ce(e, t) {
		let { section: n, block: r } = be(W(O)?.sectionId, W(O)?.blockId);
		r && (T(e), t(r, n), y(n, "blokk-endret"), b.save(), w(), S?.sendSection(W(a), n), xe());
	}
	function k(e, t) {
		Ce(`edit:${W(O).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function we(e, t) {
		Number.isFinite(t) && Ce(`edit:frame-${W(O).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function A(e) {
		Ce("decor", (t) => {
			t.decor = e;
		});
	}
	async function Te(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await bi(t);
			Ce(`edit:${W(O).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || xi(t.name).replaceAll("-", " ");
			});
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ee = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, Oe = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], ke = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Ae = /* @__PURE__ */ I(null), je = /* @__PURE__ */ I(null), Me = /* @__PURE__ */ I(""), Ne = /* @__PURE__ */ I(qt([])), Fe = /* @__PURE__ */ I(null);
	function Ie(e) {
		L(je, e?.grid ? { ...e.grid } : null, !0), L(Me, e?.size?.minHeight ?? "", !0), L(Ne, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(Fe, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Le(e) {
		L(Ae, e.sectionId, !0), Ie(b?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Be(e, t) {
		let n = b.data.sections.find((e) => e.id === W(Ae));
		n && (T(e), t(n), b.save(), w(), S?.sendSection(W(a), n), Ie(n));
	}
	let Ve = /* @__PURE__ */ I("color");
	function He(e) {
		Be("bg", (t) => {
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
	function Ue(e) {
		Be("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function We(e, t) {
		let n = e + t;
		Be("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function M(e, t, n) {
		Be(`edit:bg-${W(Ae)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Ge(e, t, n) {
		Be(`edit:bg-${W(Ae)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function Ke(e, t) {
		Be("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function N(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			M(e, "src", (await bi(n)).dataUrl);
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function qe(e) {
		return typeof e == "string" ? e.startsWith("#") ? e : W(C)?.theme.tokens.color[e] ?? "#000000" : "#000000";
	}
	function Je(e) {
		return {
			type: e,
			version: gi[e].version,
			props: gi[e].defaults()
		};
	}
	function Ye(e) {
		Ce(`edit:anim-${W(O).blockId}`, (t) => {
			t.animation = e ? Je(e) : null;
		}), W(O) && S?.sendDemoAnim(W(O).sectionId, W(O).blockId);
	}
	function Ze(e, t) {
		Number.isFinite(t) && (Ce(`edit:anim-${W(O).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(O) && S?.sendDemoAnim(W(O).sectionId, W(O).blockId));
	}
	function Qe(e) {
		Be("section-anim", (t) => {
			t.animation = e ? Je(e) : null;
		}), S?.sendDemoAnim(W(Ae));
	}
	function $e(e, t) {
		Number.isFinite(t) && (Be("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), S?.sendDemoAnim(W(Ae)));
	}
	function et(e) {
		let t = b.data.sections.find((e) => e.id === W(Ae));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		T("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(Me, r, !0), b.save(), w(), S?.sendSection(W(a), t);
	}
	function tt() {
		return b.data.sections.find((e) => e.id === W(Ae)) ?? b.data.sections[0];
	}
	function nt(e) {
		let t = b.data.sections.find((e) => e.id === W(Ae));
		t && (T("grid"), t.grid = e ? { ...x.data.grid } : null, L(je, t.grid ? { ...t.grid } : null, !0), b.save(), w(), S?.sendSection(W(a), t), W(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function rt(e, t) {
		let n = b.data.sections.find((e) => e.id === W(Ae));
		n?.grid && (T("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, L(je, { ...n.grid }, !0), b.save(), w(), S?.sendSection(W(a), n), W(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function it(e, t) {
		T("grid"), L(p, {
			...W(p),
			[e]: t
		}, !0), x.data.grid = {
			...x.data.grid,
			[e]: t
		}, x.save(), w(), te(), W(E) === "Grid" && S?.sendShowGrid(!0);
	}
	async function at() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(f, await e.json(), !0) : e.status !== 503 && L(f, null);
		} catch {
			L(f, null);
		}
	}
	let ot = null;
	async function st() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ot = (await e.json()).head ?? null);
		} catch {}
	}
	async function ct(e) {
		if (!ot) return st(), {
			ok: !0,
			head: null
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ot}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ot) return {
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
	let lt = /* @__PURE__ */ I(null), ut = /* @__PURE__ */ I(""), dt = /* @__PURE__ */ I(!1);
	async function pt() {
		L(ut, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(lt, (await e.json()).commits, !0) : e.status === 401 ? (L(lt, [], !0), L(ut, "Logg inn med GitHub for å se historikken.")) : (L(lt, [], !0), L(ut, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(lt, [], !0), L(ut, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let mt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), ht = !1;
	async function gt() {
		let e = W(lt)?.[0];
		if (!(!e || W(dt)) && confirm(`Angre siste publisering («${e.message}»)?\n\nEn ny commit gjenoppretter innholdet slik det var før den - ingenting slettes fra historikken.`)) {
			L(dt, !0), u("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ot = e : st(), ht = !0, u("✓ Angret! Last admin på nytt om ~1 min for å redigere videre på den gjenopprettede versjonen", "ok");
				} else t.status === 409 ? u("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : u((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				u("Kunne ikke nå publiseringslaget", "error");
			}
			L(dt, !1), pt();
		}
	}
	let _t = null;
	function vt(e) {
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
	async function yt(e) {
		L(a, e, !0), _t = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = si(await e.json(), x.data));
			} catch {}
			n ? ne.delete(e) : n = vt(t), b = ei(`urd-draft-${e}`, () => n), b.replace(si(b.data, x.data)), b.save(), ie.length = 0, ae.length = 0, oe = null, L(Ae, null), L(je, null), w(), v(), L(s, "");
		})(), await _t;
	}
	function P() {
		S?.destroy(), S = ti(W(d), {
			onEdit: Kt,
			onMove: Jt,
			onDelete: an,
			onAddSection: en,
			onMoveSection: tn,
			onDeleteSection: nn,
			onSectionSize: rn,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Le,
			onSelectBlock: Se,
			onReady: bt,
			onNavigate: xt,
			onAddBlock: (e) => ln(e.sectionId, e.block),
			onMobileManual: Yt,
			onMobileAuto: Zt,
			onReviewDone: Qt,
			onBlockFlag: $t
		});
	}
	async function bt() {
		await _t, x.hasDraft() && te();
		let e = !W(i).pages.some((e) => e.id === W(a));
		(b.hasDraft() || e) && S?.sendPage(W(a), b.data), W(h) || S?.sendChrome(!1), W(E) === "Grid" && S?.sendShowGrid(!0);
	}
	function xt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(C).pages.find((e) => e.path === t);
		n && n.id !== W(a) && yt(n.id);
	}
	function F(e, t) {
		T(e), t(), x.save(), w(), te();
	}
	let St = /* @__PURE__ */ I(""), Ct = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function wt(e, t = null) {
		return e ? Ct.includes(e) ? `«${e}» er et reservert navn` : W(C).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Tt() {
		let e = W(St).trim(), t = xi(e), n = wt(t);
		if (n) {
			u(n, "error");
			return;
		}
		F("pages", () => {
			W(C).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(C).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(vt({
			id: t,
			title: e
		}))), w(), L(St, ""), yt(t);
	}
	function Et(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		F("pages", () => {
			e.title = n;
			for (let t of W(C).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(a) ? (b.data.meta.title = n, b.save(), w()) : Dt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Dt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = si(await t.json(), x.data));
		} catch {}
		r ||= vt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), w();
	}
	function Ot(e, t) {
		let n = xi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = wt(n, e.id);
		if (r) {
			u(r, "error");
			return;
		}
		F("pages", () => {
			e.path = `/${n}`;
		});
	}
	function kt(e) {
		e.path !== "/" && (F("pages", () => {
			W(C).pages = W(C).pages.filter((t) => t.id !== e.id), W(C).nav.items = W(C).nav.items.filter((t) => t.page !== e.id);
		}), e.id === W(a) && yt(W(C).pages[0].id), u("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function At(e) {
		F("edit:nav-logo", () => {
			W(C).nav.logo = {
				type: "text",
				value: "",
				...W(C).nav.logo,
				...e
			};
		});
	}
	function jt(e) {
		F("nav", () => {
			W(C).nav.logo ??= {
				type: "text",
				value: W(C).site.title
			};
			let t = W(C).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(C).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(C).site.title), delete t.image), t.type = e;
		});
	}
	async function Mt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await bi(t);
			F("nav", () => {
				let t = W(C).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Nt(e) {
		F("nav", () => {
			W(C).nav.layout = e;
		});
	}
	function Pt(e, t) {
		F(e, () => {
			W(C).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(C).footer);
		});
	}
	function Ft(e, t) {
		F(`edit:nav-label-${e}`, () => {
			W(C).nav.items[e].label = t;
		});
	}
	function It(e, t) {
		F("nav", () => {
			let n = W(C).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Lt(e, t) {
		F(`edit:nav-href-${e}`, () => {
			W(C).nav.items[e].href = t;
		});
	}
	function Rt(e, t) {
		let n = e + t, r = W(C).nav.items;
		n < 0 || n >= r.length || F("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function zt(e) {
		F("nav", () => {
			W(C).nav.items.splice(e, 1);
		});
	}
	function Bt() {
		F("nav", () => {
			W(C).nav.items.push({
				label: "Lenke",
				page: W(C).pages[0].id
			});
		});
	}
	let Vt = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function Ht(e, t) {
		F(`edit:theme-color-${e}`, () => {
			W(C).theme.tokens.color[e] = t;
		});
	}
	function Ut(e, t) {
		F("theme", () => {
			W(C).theme.tokens.font[e] = t;
		});
	}
	function Wt(e, t) {
		F("theme", () => {
			W(C).theme.tokens.radius[e] = t;
		});
	}
	function Gt() {
		L(h, !W(h)), S?.sendChrome(W(h));
	}
	function Kt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T(`edit:${e.blockId}`), t.props = e.props, b.save(), w(), W(O)?.blockId === e.blockId && xe(), L(s, ""));
	}
	function Jt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		T(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && y(t, "desktop-endret-etter-mobil"), b.save(), w(), W(O)?.blockId === e.blockId && xe();
	}
	function Yt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			T("mobile-manual");
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
			}, b.save(), w();
		}
	}
	function Zt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			T("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, b.save(), w(), v(), S?.sendSection(W(a), t);
		}
	}
	function Qt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (T("review-done"), t.responsive.mobile.attention = null, b.save(), w(), v());
	}
	function $t(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T("decor"), t.decor = e.decor, b.save(), w(), W(O)?.blockId === e.blockId && xe());
	}
	function en(e) {
		T("add-section"), b.data.sections.splice(e.index, 0, e.section), b.save(), w(), S?.sendPage(W(a), b.data), L(Ae, e.section.id, !0), Ie(e.section), W(E) !== "Egenskaper" && (L(E, "Egenskaper"), S?.sendShowGrid(!1));
	}
	function tn(e) {
		let t = b.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (T("move-section"), [t[n], t[r]] = [t[r], t[n]], b.save(), w(), S?.sendPage(W(a), b.data));
	}
	function nn(e) {
		T("delete-section"), e.sectionId === W(Ae) && (L(Ae, null), L(je, null)), b.data.sections = b.data.sections.filter((t) => t.id !== e.sectionId), b.save(), w(), S?.sendPage(W(a), b.data);
	}
	function rn(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === W(Ae) && L(Me, e.minHeight, !0), b.save(), w());
	}
	function an(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), W(O)?.blockId === e.blockId && L(O, null), y(t, "blokk-slettet"), b.save(), w(), S?.sendSection(W(a), t));
	}
	let on = {
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
	function sn(e) {
		let t = on[e];
		return {
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
		};
	}
	function cn(e) {
		S ? S.sendPlaceBlock(e) : ln(tt()?.id, e);
	}
	function ln(e, t) {
		let n = b.data.sections.find((t) => t.id === e) ?? b.data.sections[0];
		n && (T("add-block"), n.blocks.push(t), y(n, "blokk-lagt-til"), b.save(), w(), S?.sendSection(W(a), n));
	}
	function un(e) {
		cn(sn(e));
	}
	async function dn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		u("Komprimerer bildet…");
		let n;
		try {
			n = await bi(t);
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(d)?.clientWidth ?? 1280));
		cn({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: xi(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? u(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : u("");
	}
	function fn(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${xi(n || "bilde")}-${Si(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function pn(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && fn(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && fn(e.props, "src", e.props.alt, t);
		}
		return t;
	}
	function mn(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && fn(n, "value", "logo", t), n?.type === "both" && fn(n, "image", "logo", t), t;
	}
	function hn() {
		T("discard");
		let e = b.reset();
		x.reset(), ee(), L(p, {
			snap: !0,
			...W(C).grid
		}, !0), w(), L(s, ""), te(), W(C).pages.some((e) => e.id === W(a)) ? S?.sendPage(W(a), e) : yt(W(C).pages[0].id);
	}
	async function gn() {
		if (ht) {
			u("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		u("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let o of W(C).pages) {
			let s = `urd-draft-${o.id}`, c = ne.has(o.id) || !W(i).pages.some((e) => e.id === o.id), l = null;
			if (o.id === W(a) && (b.hasDraft() || c)) l = b.data;
			else if (o.id !== W(a)) {
				let e = localStorage.getItem(s);
				if (e) try {
					l = si(JSON.parse(e), x.data);
				} catch {}
			}
			if (!l && c && (l = vt(o)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...pn(u)), e.push({
				path: o.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), c ? r.push(o.id) : n.push(s);
		}
		if (x.hasDraft()) {
			let t = JSON.parse(JSON.stringify(W(C)));
			e.push(...mn(t)), e.push({
				path: "content/site.json",
				content: JSON.stringify(t, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
		}
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of W(C).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of W(i).pages) {
			let n = W(C).pages.find((e) => e.id === t.id);
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
		let o = await ct(e);
		if (!o.ok) {
			u("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let s = {
			message: `Oppdater ${t.join(", ") || "innstillinger"} via Urd-admin`,
			files: e,
			...o.head ? { expect: o.head } : {}
		}, c = null;
		try {
			c = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(s)
			});
		} catch {}
		if (c?.ok) {
			let { sha: e } = await c.json().catch(() => ({}));
			e ? ot = e : st(), pn(b.data), mn(W(C));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			L(i, JSON.parse(JSON.stringify(W(C))), !0), x = ei("urd-draft-site", () => W(i)), ee(), L(p, {
				snap: !0,
				...W(C).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(b.data));
			b = ei(`urd-draft-${W(a)}`, () => t), ne.has(W(a)) && localStorage.setItem(`urd-draft-${W(a)}`, JSON.stringify(t)), w(), u("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (c?.status === 401) {
			let e = (await c.json().catch(() => null))?.error;
			u(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await at();
		} else c?.status === 403 ? u((await c.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c?.status === 409 ? u("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : u(c ? (await c.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var _n = Da();
	fr("keydown", Xt, de);
	var vn = R(_n), yn = (e) => {
		var t = Ci();
		G("click", t, Gt), q(e, t);
	};
	Y(vn, (e) => {
		W(h) || e(yn);
	});
	var bn = B(vn, 2);
	let xn;
	var Sn = R(bn), Cn = B(R(Sn), 2), wn = (e) => {
		var t = Ti(), n = z(t);
		kr(n, 21, () => W(C).pages, (e) => e.id, (e, t) => {
			var n = wi(), r = R(n, !0);
			j(n);
			var i = {};
			V(() => {
				J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
			}), q(e, n);
		}), j(n);
		var r;
		Z(n);
		var i = B(n, 2), o = R(i);
		let s;
		var c = B(o, 2);
		let l;
		j(i), V(() => {
			r !== (r = W(a)) && (n.value = (n.__value = W(a)) ?? "", X(n, W(a))), s = Lr(o, 1, "ghost svelte-1n46o8q", null, s, { active: W(g) === "desktop" }), l = Lr(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(g) === "mobile" });
		}), G("change", n, (e) => yt(e.target.value)), G("click", o, () => L(g, "desktop")), G("click", c, () => L(g, "mobile")), q(e, t);
	};
	Y(Cn, (e) => {
		W(i) && e(wn);
	});
	var Tn = B(Cn, 2), En = (e) => {
		var t = Ei(), n = R(t);
		j(t), V(() => J(n, `📱 ${W(_) ?? ""} ${W(_) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(g, "mobile")), q(e, t);
	};
	Y(Tn, (e) => {
		W(_) > 0 && e(En);
	});
	var Dn = B(Tn, 2), On = (e) => {
		q(e, Di());
	};
	Y(Dn, (e) => {
		W(o) && e(On);
	}), j(Sn);
	var kn = B(Sn, 2), An = R(kn), jn = (e) => {
		var t = Ai(), n = z(t), r = R(n, !0);
		j(n);
		var i = B(n, 2), a = (e) => {
			var t = Oi(), n = R(t);
			j(t), V(() => {
				Gr(t, "title", W(f).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(n, `${W(f).allowed ? "" : "⚠ "}${W(f).login ?? ""}`);
			}), q(e, t);
		}, s = (e) => {
			q(e, ki());
		};
		Y(i, (e) => {
			W(f)?.loggedIn ? e(a) : W(f) && e(s, 1);
		});
		var c = B(i, 2), l = B(c, 2), u = B(l, 2);
		V((e) => {
			Gr(n, "title", W(h) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), J(r, W(h) ? "👁 Ren visning" : "✏ Rediger"), Gr(c, "href", e), l.disabled = !W(o), u.disabled = !W(o);
		}, [() => re().path]), G("click", n, Gt), G("click", l, hn), G("click", u, gn), q(e, t);
	};
	Y(An, (e) => {
		W(i) && e(jn);
	}), j(kn), j(bn);
	var Mn = B(bn, 2), Nn = (e) => {
		var t = Ca(), r = R(t), i = (e) => {
			var t = Sa(), r = z(t);
			kr(r, 21, () => ye, Tr, (e, t) => {
				var n = ji();
				let r;
				var i = R(n, !0);
				j(n), V(() => {
					r = Lr(n, 1, "svelte-1n46o8q", null, r, { active: W(E) === W(t) }), J(i, W(t));
				}), G("click", n, () => D(W(t))), q(e, n);
			}), j(r);
			var i = B(r, 2), o = (e) => {
				var t = xa(), r = R(t), i = R(r, !0);
				j(r);
				var o = B(r, 2), s = (e) => {
					var t = Ii(), n = B(R(t), 2);
					kr(n, 17, () => W(C).pages, (e) => e.id, (e, t) => {
						var n = Fi();
						let r;
						var i = R(n);
						Q(i);
						var o = B(i, 2), s = (e) => {
							q(e, Mi());
						}, c = (e) => {
							var n = Ni();
							Q(n), V((e) => $(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => Ot(W(t), e.target.value)), q(e, n);
						};
						Y(o, (e) => {
							W(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = B(o, 2), u = R(l), d = B(u, 2), f = (e) => {
							var n = Pi();
							G("click", n, () => kt(W(t))), q(e, n);
						};
						Y(d, (e) => {
							W(t).path !== "/" && e(f);
						}), j(l), j(n), V(() => {
							r = Lr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(a) }), $(i, W(t).title), u.disabled = W(t).id === W(a);
						}), G("change", i, (e) => Et(W(t), e.target.value)), G("click", u, () => yt(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					Q(r);
					var i = B(r, 2);
					De(2), j(t), V((e) => i.disabled = e, [() => !W(St).trim()]), G("keydown", r, (e) => e.key === "Enter" && Tt()), Yr(r, () => W(St), (e) => L(St, e)), G("click", i, Tt), q(e, t);
				}, c = (e) => {
					var t = Hi(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					i.value = i.__value = "text";
					var a = B(i);
					a.value = a.__value = "image";
					var o = B(a);
					o.value = o.__value = "both", j(r);
					var s;
					Z(r), j(n);
					var c = B(n, 2), l = (e) => {
						var t = Li();
						Q(t), V(() => $(t, W(C).nav.logo?.value ?? "")), G("input", t, (e) => At({ value: e.target.value })), q(e, t);
					};
					Y(c, (e) => {
						(W(C).nav.logo?.type ?? "text") !== "image" && e(l);
					});
					var u = B(c, 2), d = (e) => {
						var t = Ri(), n = z(t), r = R(n), i = B(r);
						j(n);
						var a = B(n, 2), o = B(R(a));
						Q(o), j(a), V(() => {
							J(r, `${(W(C).nav.logo?.type === "image" ? W(C).nav.logo?.value : W(C).nav.logo?.image) ? "Bytt logobilde" : "Velg logobilde"} `), $(o, W(C).nav.logo?.size ?? 32);
						}), G("change", i, Mt), G("change", o, (e) => At({ size: Number(e.target.value) })), q(e, t);
					};
					Y(u, (e) => {
						(W(C).nav.logo?.type ?? "text") !== "text" && e(d);
					});
					var f = B(u, 2), p = (e) => {
						var t = zi(), n = B(R(t)), r = R(n);
						r.value = r.__value = "image-first";
						var i = B(r);
						i.value = i.__value = "text-first", j(n);
						var a;
						Z(n), j(t), V(() => {
							a !== (a = W(C).nav.logo?.order ?? "image-first") && (n.value = (n.__value = W(C).nav.logo?.order ?? "image-first") ?? "", X(n, W(C).nav.logo?.order ?? "image-first"));
						}), G("change", n, (e) => At({ order: e.target.value })), q(e, t);
					};
					Y(f, (e) => {
						W(C).nav.logo?.type === "both" && e(p);
					});
					var m = B(f, 4), h = B(R(m)), g = R(h);
					g.value = g.__value = "right";
					var _ = B(g);
					_.value = _.__value = "center";
					var v = B(_);
					v.value = v.__value = "left", j(h);
					var y;
					Z(h), j(m);
					var b = B(m, 4);
					kr(b, 17, () => W(C).nav.items, Tr, (e, t, n) => {
						var r = Vi(), i = R(r);
						Q(i);
						var a = B(i, 2), o = R(a);
						o.disabled = n === 0;
						var s = B(o, 2), c = B(s, 2);
						j(a);
						var l = B(a, 2), u = R(l);
						kr(u, 17, () => W(C).pages, (e) => e.id, (e, t) => {
							var n = wi(), r = R(n, !0);
							j(n);
							var i = {};
							V(() => {
								J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
							}), q(e, n);
						});
						var d = B(u);
						d.value = d.__value = "__href", j(l);
						var f;
						Z(l);
						var p = B(l, 2), m = (e) => {
							var r = Bi();
							Q(r), V(() => $(r, W(t).href ?? "")), G("change", r, (e) => Lt(n, e.target.value)), q(e, r);
						};
						Y(p, (e) => {
							W(t).page || e(m);
						}), j(r), V(() => {
							$(i, W(t).label), s.disabled = n === W(C).nav.items.length - 1, f !== (f = W(t).page ?? "__href") && (l.value = (l.__value = W(t).page ?? "__href") ?? "", X(l, W(t).page ?? "__href"));
						}), G("input", i, (e) => Ft(n, e.target.value)), G("click", o, () => Rt(n, -1)), G("click", s, () => Rt(n, 1)), G("click", c, () => zt(n)), G("change", l, (e) => It(n, e.target.value)), q(e, r);
					});
					var x = B(b, 2);
					j(t), V(() => {
						s !== (s = W(C).nav.logo?.type ?? "text") && (r.value = (r.__value = W(C).nav.logo?.type ?? "text") ?? "", X(r, W(C).nav.logo?.type ?? "text")), y !== (y = W(C).nav.layout ?? "right") && (h.value = (h.__value = W(C).nav.layout ?? "right") ?? "", X(h, W(C).nav.layout ?? "right"));
					}), G("change", r, (e) => jt(e.target.value)), G("change", h, (e) => Nt(e.target.value)), G("click", x, Bt), q(e, t);
				}, l = (e) => {
					var t = Wi(), n = B(R(t), 2), r = B(R(n));
					Q(r), j(n);
					var i = B(n, 2), a = B(R(i));
					Q(a), j(i);
					var o = B(i, 2), s = B(R(o));
					Q(s), j(o);
					var c = B(o, 2), l = B(R(c));
					Q(l), j(c);
					var u = B(c, 4), d = B(R(u)), f = R(d), p = (e) => {
						var t = Ui(), n = {};
						V(() => {
							n !== (n = W(C).theme.tokens.font.heading) && (t.value = (t.__value = W(C).theme.tokens.font.heading) ?? "");
						}), q(e, t);
					}, h = /* @__PURE__ */ ft(() => !Vt.some(([, e]) => e === W(C).theme.tokens.font.heading));
					Y(f, (e) => {
						W(h) && e(p);
					}), kr(B(f), 17, () => Vt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ ft(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = wi(), o = R(a, !0);
						j(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), j(d);
					var g;
					Z(d), j(u);
					var _ = B(u, 2), v = B(R(_)), y = R(v), b = (e) => {
						var t = Ui(), n = {};
						V(() => {
							n !== (n = W(C).theme.tokens.font.body) && (t.value = (t.__value = W(C).theme.tokens.font.body) ?? "");
						}), q(e, t);
					}, x = /* @__PURE__ */ ft(() => !Vt.some(([, e]) => e === W(C).theme.tokens.font.body));
					Y(y, (e) => {
						W(x) && e(b);
					}), kr(B(y), 17, () => Vt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ ft(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = wi(), o = R(a, !0);
						j(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), j(v);
					var S;
					Z(v), j(_);
					var ee = B(_, 4), te = B(R(ee));
					Q(te), j(ee);
					var ne = B(ee, 2), re = B(R(ne));
					Q(re), j(ne), j(t), V(() => {
						$(r, W(C).theme.tokens.color.bg), $(a, W(C).theme.tokens.color.surface), $(s, W(C).theme.tokens.color.text), $(l, W(C).theme.tokens.color.accent), g !== (g = W(C).theme.tokens.font.heading) && (d.value = (d.__value = W(C).theme.tokens.font.heading) ?? "", X(d, W(C).theme.tokens.font.heading)), S !== (S = W(C).theme.tokens.font.body) && (v.value = (v.__value = W(C).theme.tokens.font.body) ?? "", X(v, W(C).theme.tokens.font.body)), $(te, W(C).theme.tokens.radius.sm), $(re, W(C).theme.tokens.radius.md);
					}), G("input", r, (e) => Ht("bg", e.target.value)), G("input", a, (e) => Ht("surface", e.target.value)), G("input", s, (e) => Ht("text", e.target.value)), G("input", l, (e) => Ht("accent", e.target.value)), G("change", d, (e) => Ut("heading", e.target.value)), G("change", v, (e) => Ut("body", e.target.value)), G("change", te, (e) => Wt("sm", e.target.value)), G("change", re, (e) => Wt("md", e.target.value)), q(e, t);
				}, u = (e) => {
					var t = Gi();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					j(i), j(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					j(c);
					var u = B(c, 2), d = B(u, 2), f = B(d, 2), p = B(R(f), 2), m = R(p), h = B(m, 2), _ = B(h, 2), v = B(_, 2), y = B(v, 2);
					j(p), j(f), j(t), V(() => {
						n = Lr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(g) === "mobile" }), Gr(t, "title", W(g) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => un("text")), G("click", o, () => un("text-box")), G("click", s, () => un("button")), G("change", l, dn), G("click", u, () => un("video")), G("click", d, () => un("icon")), G("click", m, () => un("shape-line")), G("click", h, () => un("shape-arrow")), G("click", _, () => un("shape-circle")), G("click", v, () => un("shape-rect")), G("click", y, () => un("shape-triangle")), q(e, t);
				}, d = (e) => {
					var t = Ki(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					j(r), j(n);
					var a = B(n, 2);
					Q(a);
					var o = B(a, 2), s = R(o);
					Q(s), De(), j(o), De(2), j(t), V(() => {
						J(i, `${W(p).size ?? ""} px`), $(a, W(p).size), Wr(s, W(p).snap !== !1);
					}), G("input", a, (e) => it("size", Number(e.target.value))), G("change", s, (e) => it("snap", e.target.checked)), q(e, t);
				}, h = (e) => {
					var t = pa(), r = R(t), i = (e) => {
						var t = na(), n = z(t), r = R(n);
						j(n);
						var i = B(n, 2), a = (e) => {
							var t = qi(), n = R(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i);
							var o = B(i, 2), s = B(R(o));
							Q(s), j(o);
							var c = B(o, 2), l = B(R(c));
							Q(l), j(c);
							var u = B(c, 2), d = B(R(u));
							Q(d), j(u);
							var f = B(u, 2), p = B(R(f));
							Q(p), j(f), j(t), V(() => {
								$(r, W(O).frame.x), $(a, W(O).frame.y), $(s, W(O).frame.w), $(l, W(O).frame.h), $(d, W(O).frame.z ?? 1), $(p, W(O).frame.rot ?? 0);
							}), G("change", r, (e) => we("x", Number(e.target.value))), G("change", a, (e) => we("y", Number(e.target.value))), G("change", s, (e) => we("w", Number(e.target.value))), G("change", l, (e) => we("h", Number(e.target.value))), G("change", d, (e) => we("z", Number(e.target.value))), G("change", p, (e) => we("rot", Number(e.target.value))), q(e, t);
						};
						Y(i, (e) => {
							W(g) === "desktop" && e(a);
						});
						var o = B(i, 2), s = R(o);
						Q(s), De(), j(o);
						var c = B(o, 4), l = (e) => {
							var t = Ji(), n = z(t), r = B(R(n)), i = R(r);
							i.value = i.__value = "left";
							var a = B(i);
							a.value = a.__value = "center";
							var o = B(a);
							o.value = o.__value = "right", j(r);
							var s;
							Z(r), j(n);
							var c = B(n, 2), l = R(c);
							Q(l), De(), j(c), De(2), V((e) => {
								s !== (s = W(O).props.align ?? "left") && (r.value = (r.__value = W(O).props.align ?? "left") ?? "", X(r, W(O).props.align ?? "left")), Wr(l, e);
							}, [() => !!W(O).props.box]), G("change", r, (e) => k("align", e.target.value)), G("change", l, (e) => k("box", e.target.checked)), q(e, t);
						}, u = (e) => {
							var t = Xi(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i)), o = R(a);
							kr(o, 17, () => W(C).pages, (e) => e.id, (e, t) => {
								var n = wi(), r = R(n, !0);
								j(n);
								var i = {};
								V(() => {
									J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
								}), q(e, n);
							});
							var s = B(o);
							s.value = s.__value = "__href", j(a);
							var c;
							Z(a), j(i);
							var l = B(i, 2), u = (e) => {
								var t = Yi();
								Q(t), V(() => $(t, W(O).props.href === "#" ? "" : W(O).props.href ?? "")), G("change", t, (e) => k("href", e.target.value || null)), q(e, t);
							};
							Y(l, (e) => {
								W(O).props.page || e(u);
							});
							var d = B(l, 2), f = B(R(d)), p = R(f);
							p.value = p.__value = "primary";
							var m = B(p);
							m.value = m.__value = "secondary", j(f);
							var h;
							Z(f), j(d), V(() => {
								$(r, W(O).props.label), c !== (c = W(O).props.page ?? "__href") && (a.value = (a.__value = W(O).props.page ?? "__href") ?? "", X(a, W(O).props.page ?? "__href")), h !== (h = W(O).props.style) && (f.value = (f.__value = W(O).props.style) ?? "", X(f, W(O).props.style));
							}), G("change", r, (e) => k("label", e.target.value)), G("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								Ce(`edit:${W(O).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), G("change", f, (e) => k("style", e.target.value)), q(e, t);
						}, d = (e) => {
							var t = Zi(), n = z(t), r = B(R(n));
							j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i);
							var o = B(i, 2), s = B(R(o)), c = R(s);
							c.value = c.__value = "cover";
							var l = B(c);
							l.value = l.__value = "contain", j(s);
							var u;
							Z(s), j(o);
							var d = B(o, 2), f = B(R(d)), p = R(f);
							p.value = p.__value = "";
							var m = B(p);
							m.value = m.__value = "sm";
							var h = B(m);
							h.value = h.__value = "md", j(f);
							var g;
							Z(f), j(d);
							var _ = B(d, 2), v = B(R(_));
							Q(v), j(_), V(() => {
								$(a, W(O).props.alt ?? ""), u !== (u = W(O).props.fit ?? "cover") && (s.value = (s.__value = W(O).props.fit ?? "cover") ?? "", X(s, W(O).props.fit ?? "cover")), g !== (g = W(O).props.radius ?? "") && (f.value = (f.__value = W(O).props.radius ?? "") ?? "", X(f, W(O).props.radius ?? "")), $(v, W(O).props.href ?? "");
							}), G("change", r, Te), G("change", a, (e) => k("alt", e.target.value)), G("change", s, (e) => k("fit", e.target.value)), G("change", f, (e) => k("radius", e.target.value || null)), G("change", v, (e) => k("href", e.target.value || null)), q(e, t);
						}, f = (e) => {
							var t = Qi(), n = B(z(t), 2);
							Q(n);
							var r = B(n, 2), i = B(R(r));
							Q(i), j(r), De(2), V(() => {
								$(n, W(O).props.url ?? ""), $(i, W(O).props.title ?? "");
							}), G("change", n, (e) => k("url", e.target.value)), G("change", i, (e) => k("title", e.target.value)), q(e, t);
						}, p = (e) => {
							var t = $i(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i);
							var o = B(i, 2), s = B(R(o));
							kr(s, 21, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ft(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = wi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(s);
							var c;
							Z(s), j(o), De(2), V(() => {
								$(r, W(O).props.glyph ?? ""), $(a, W(O).props.size ?? 48), c !== (c = W(O).props.color) && (s.value = (s.__value = W(O).props.color) ?? "", X(s, W(O).props.color));
							}), G("change", r, (e) => k("glyph", e.target.value || "★")), G("change", a, (e) => k("size", Number(e.target.value))), G("change", s, (e) => k("color", e.target.value)), q(e, t);
						}, h = (e) => {
							var t = ea(), n = z(t), r = B(R(n));
							kr(r, 21, () => Oe, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ft(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = wi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(r);
							var i;
							Z(r), j(n);
							var a = B(n, 2), o = B(R(a));
							kr(o, 21, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ft(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = wi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(o);
							var s;
							Z(o), j(a);
							var c = B(a, 2), l = B(R(c));
							Q(l), j(c);
							var u = B(c, 2), d = R(u);
							Q(d), De(), j(u), V((e) => {
								i !== (i = W(O).props.kind) && (r.value = (r.__value = W(O).props.kind) ?? "", X(r, W(O).props.kind)), s !== (s = W(O).props.color) && (o.value = (o.__value = W(O).props.color) ?? "", X(o, W(O).props.color)), $(l, W(O).props.thickness), Wr(d, e);
							}, [() => !!W(O).props.fill]), G("change", r, (e) => k("kind", e.target.value)), G("change", o, (e) => k("color", e.target.value)), G("change", l, (e) => k("thickness", Number(e.target.value))), G("change", d, (e) => k("fill", e.target.checked ? W(O).props.color : null)), q(e, t);
						};
						Y(c, (e) => {
							W(O).type === "text" ? e(l) : W(O).type === "button" ? e(u, 1) : W(O).type === "image" ? e(d, 2) : W(O).type === "video" ? e(f, 3) : W(O).type === "icon" ? e(p, 4) : W(O).type === "shape" && e(h, 5);
						});
						var _ = B(c, 4), v = B(R(_)), y = R(v);
						y.value = y.__value = "", kr(B(y), 17, () => Object.entries(gi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ ft(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = wi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(v);
						var b;
						Z(v), j(_);
						var x = B(_, 2), S = (e) => {
							var t = ta(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i), De(2), V(() => {
								$(r, W(O).animation.props.duration), $(a, W(O).animation.props.delay);
							}), G("change", r, (e) => Ze("duration", Number(e.target.value))), G("change", a, (e) => Ze("delay", Number(e.target.value))), q(e, t);
						};
						Y(x, (e) => {
							W(O).animation && gi[W(O).animation.type]?.entrance && e(S);
						}), V(() => {
							J(r, `${Ee[W(O).type] ?? W(O).type ?? ""}-blokk`), Wr(s, W(O).decor), b !== (b = W(O).animation?.type ?? "") && (v.value = (v.__value = W(O).animation?.type ?? "") ?? "", X(v, W(O).animation?.type ?? ""));
						}), G("change", s, (e) => A(e.target.checked)), G("change", v, (e) => Ye(e.target.value || null)), q(e, t);
					}, a = (e) => {
						var t = da(), r = B(z(t), 2), i = B(R(r));
						Q(i), j(r);
						var a = B(r, 6), o = R(a);
						Q(o), De(), j(a);
						var s = B(a, 2), c = (e) => {
							var t = ra(), n = z(t), r = B(R(n)), i = R(r);
							j(r), j(n);
							var a = B(n, 2);
							Q(a), V(() => {
								J(i, `${W(je).size ?? ""} px`), $(a, W(je).size);
							}), G("input", a, (e) => rt("size", Number(e.target.value))), q(e, t);
						};
						Y(s, (e) => {
							W(je) && e(c);
						});
						var l = B(s, 8);
						kr(l, 17, () => W(Ne), Tr, (e, t, r) => {
							var i = ua(), a = R(i), o = R(a);
							kr(o, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ft(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = wi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(o);
							var s;
							Z(o);
							var c = B(o, 2), l = R(c);
							l.disabled = r === 0;
							var u = B(l, 2), d = B(u, 2);
							j(c), j(a);
							var f = B(a, 2), p = (e) => {
								var n = ia(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Q(l), V((e, n) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.opacity ?? 1);
								}, [() => qe(W(t).props.value), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", a, (e) => M(r, "value", e.target.value)), G("input", l, (e) => M(r, "opacity", Number(e.target.value))), q(e, n);
							}, h = (e) => {
								var n = aa(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o));
								Q(s), j(o);
								var c = B(o, 2), l = B(R(c)), u = R(l);
								j(l), j(c);
								var d = B(c, 2);
								Q(d);
								var f = B(d, 2), p = B(R(f)), m = R(p);
								j(p), j(f);
								var h = B(f, 2);
								Q(h);
								var g = B(h, 2), _ = R(g);
								Q(_), De(), j(g), V((e, n, r, i) => {
									$(a, e), $(s, n), J(u, `${W(t).props.angle ?? ""}°`), $(d, W(t).props.angle), J(m, `${r ?? ""}%`), $(h, W(t).props.opacity ?? 1), Wr(_, i);
								}, [
									() => qe(W(t).props.stops[0]),
									() => qe(W(t).props.stops[W(t).props.stops.length - 1]),
									() => Math.round((W(t).props.opacity ?? 1) * 100),
									() => !!W(t).props.animate
								]), G("input", a, (e) => Ge(r, 0, e.target.value)), G("input", s, (e) => Ge(r, W(t).props.stops.length - 1, e.target.value)), G("input", d, (e) => M(r, "angle", Number(e.target.value))), G("input", h, (e) => M(r, "opacity", Number(e.target.value))), G("change", _, (e) => M(r, "animate", e.target.checked)), q(e, n);
							}, g = (e) => {
								var n = oa(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Q(l);
								var u = B(l, 2), d = B(R(u)), f = R(d);
								j(d), j(u);
								var p = B(u, 2);
								Q(p);
								var m = B(p, 2), h = B(R(m)), g = R(h);
								j(h), j(m);
								var _ = B(m, 2);
								Q(_);
								var v = B(_, 2), y = B(R(v)), b = R(y);
								j(y), j(v);
								var x = B(v, 2);
								Q(x), V((e, n, r, i, o) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.x), J(f, `${r ?? ""}%`), $(p, W(t).props.y), J(g, `${i ?? ""}%`), $(_, W(t).props.radius), J(b, `${o ?? ""}%`), $(x, W(t).props.opacity);
								}, [
									() => qe(W(t).props.color),
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", a, (e) => M(r, "color", e.target.value)), G("input", l, (e) => M(r, "x", Number(e.target.value))), G("input", p, (e) => M(r, "y", Number(e.target.value))), G("input", _, (e) => M(r, "radius", Number(e.target.value))), G("input", x, (e) => M(r, "opacity", Number(e.target.value))), q(e, n);
							}, _ = (e) => {
								var n = sa(), i = z(n), a = B(R(i)), o = R(a);
								j(a), j(i);
								var s = B(i, 2);
								Q(s), V((e) => {
									J(o, `${e ?? ""}%`), $(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => M(r, "opacity", Number(e.target.value))), q(e, n);
							}, v = (e) => {
								var n = la(), i = z(n), a = R(i), o = B(a);
								j(i);
								var s = B(i, 2), c = B(R(s)), l = R(c);
								l.value = l.__value = "cover";
								var u = B(l);
								u.value = u.__value = "contain";
								var d = B(u);
								d.value = d.__value = "repeat", j(c);
								var f;
								Z(c), j(s);
								var p = B(s, 2), m = (e) => {
									var n = ca(), i = z(n), a = B(R(i)), o = R(a);
									j(a), j(i);
									var s = B(i, 2);
									Q(s);
									var c = B(s, 2), l = B(R(c)), u = R(l);
									j(l), j(c);
									var d = B(c, 2);
									Q(d), V((e, n) => {
										J(o, `${e ?? ""}%`), $(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), $(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => M(r, "x", Number(e.target.value))), G("input", d, (e) => M(r, "y", Number(e.target.value))), q(e, n);
								};
								Y(p, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(m);
								});
								var h = B(p, 2), g = B(R(h)), _ = R(g);
								j(g), j(h);
								var v = B(h, 2);
								Q(v);
								var y = B(v, 2), b = B(R(y)), x = R(b);
								j(b), j(y);
								var S = B(y, 2);
								Q(S), V((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), f !== (f = W(t).props.fit ?? "cover") && (c.value = (c.__value = W(t).props.fit ?? "cover") ?? "", X(c, W(t).props.fit ?? "cover")), J(_, `${W(t).props.blur ?? 0 ?? ""} px`), $(v, W(t).props.blur ?? 0), J(x, `${e ?? ""}%`), $(S, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => N(r, e)), G("change", c, (e) => M(r, "fit", e.target.value)), G("input", v, (e) => M(r, "blur", Number(e.target.value))), G("input", S, (e) => M(r, "opacity", Number(e.target.value))), q(e, n);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(h, 1) : W(t).type === "glow" ? e(g, 2) : W(t).type === "grain" ? e(_, 3) : W(t).type === "image" && e(v, 4);
							}), j(i), V(() => {
								s !== (s = W(t).type) && (o.value = (o.__value = W(t).type) ?? "", X(o, W(t).type)), u.disabled = r === W(Ne).length - 1;
							}), G("change", o, (e) => Ke(r, e.target.value)), G("click", l, () => We(r, -1)), G("click", u, () => We(r, 1)), G("click", d, () => Ue(r)), q(e, i);
						});
						var u = B(l, 2), d = B(R(u));
						kr(d, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ ft(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = wi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(d), j(u);
						var f = B(u, 2), p = B(f, 4), h = B(R(p)), g = R(h);
						g.value = g.__value = "", kr(B(g), 17, () => Object.entries(gi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ ft(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = wi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(h);
						var _;
						Z(h), j(p);
						var v = B(p, 2), y = (e) => {
							var t = ta(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i), De(2), V(() => {
								$(r, W(Fe).props.duration), $(a, W(Fe).props.delay);
							}), G("change", r, (e) => $e("duration", Number(e.target.value))), G("change", a, (e) => $e("delay", Number(e.target.value))), q(e, t);
						};
						Y(v, (e) => {
							W(Fe) && gi[W(Fe).type]?.entrance && e(y);
						}), V(() => {
							$(i, W(Me)), Wr(o, W(je) !== null), _ !== (_ = W(Fe)?.type ?? "") && (h.value = (h.__value = W(Fe)?.type ?? "") ?? "", X(h, W(Fe)?.type ?? ""));
						}), G("change", i, (e) => et(e.target.value)), G("change", o, (e) => nt(e.target.checked)), Rr(d, () => W(Ve), (e) => L(Ve, e)), G("click", f, () => He(W(Ve))), G("change", h, (e) => Qe(e.target.value || null)), q(e, t);
					}, o = (e) => {
						q(e, fa());
					};
					Y(r, (e) => {
						W(O) ? e(i) : W(Ae) ? e(a, 1) : e(o, -1);
					}), j(t), q(e, t);
				}, _ = (e) => {
					var t = ma(), n = B(R(t), 2), r = R(n);
					Q(r), De(), j(n);
					var i = B(n, 4);
					Xe(i), Gr(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = B(i, 4), o = B(R(a)), s = R(o);
					s.value = s.__value = "left";
					var c = B(s);
					c.value = c.__value = "center";
					var l = B(c);
					l.value = l.__value = "right", j(o);
					var u;
					Z(o), j(a), De(2), j(t), V((e) => {
						Wr(r, e), $(i, W(C).footer?.text ?? ""), u !== (u = W(C).footer?.align ?? "center") && (o.value = (o.__value = W(C).footer?.align ?? "center") ?? "", X(o, W(C).footer?.align ?? "center"));
					}, [() => !!W(C).footer?.show]), G("change", r, (e) => Pt("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", i, (e) => Pt("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), G("change", o, (e) => Pt("footer", (t) => {
						t.align = e.target.value;
					})), q(e, t);
				}, v = (e) => {
					var t = ba(), n = B(R(t), 2), r = (e) => {
						q(e, ha());
					}, i = (e) => {
						var t = ya(), n = z(t), r = (e) => {
							var t = ga(), n = R(t, !0);
							j(t), V(() => J(n, W(ut))), q(e, t);
						};
						Y(n, (e) => {
							W(ut) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = va(), n = z(t);
							kr(B(n, 2), 19, () => W(lt), (e) => e.sha, (e, t, n) => {
								var r = _a();
								let i;
								var a = R(r), o = R(a, !0);
								j(a);
								var s = B(a, 2), c = R(s);
								j(s), j(r), V((e) => {
									i = Lr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), Gr(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${mt.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), V(() => {
								n.disabled = W(dt) || !W(f)?.allowed, Gr(n, "title", W(f)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, gt), q(e, t);
						};
						Y(i, (e) => {
							W(lt).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(lt) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(o, (e) => {
					W(E) === "Sider" ? e(s) : W(E) === "Nav" ? e(c, 1) : W(E) === "Tema" ? e(l, 2) : W(E) === "Blokker" ? e(u, 3) : W(E) === "Grid" ? e(d, 4) : W(E) === "Egenskaper" ? e(h, 5) : W(E) === "Footer" ? e(_, 6) : W(E) === "Historikk" && e(v, 7);
				}), j(t), V(() => J(i, W(E))), q(e, t);
			};
			Y(i, (e) => {
				W(E) && e(o);
			}), q(e, t);
		};
		Y(r, (e) => {
			W(h) && e(i);
		});
		var o = B(r, 2);
		let s;
		var c = R(o);
		$r(c, (e) => L(d, e), () => W(d)), j(o), j(t), V(() => {
			s = Lr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: W(g) === "mobile" }), Gr(c, "src", `/?page=${W(a)}&preview=1`);
		}), fr("load", c, P), ur(c), q(e, t);
	}, Pn = (e) => {
		q(e, wa());
	};
	Y(Mn, (e) => {
		W(i) ? e(Nn) : e(Pn, -1);
	});
	var H = B(Mn, 2), Fn = (e) => {
		var t = Ta(), n = R(t), r = B(R(n), 4), i = B(R(r));
		Q(i), j(r);
		var a = B(r, 2), o = B(R(a));
		Q(o), j(a);
		var s = B(a, 2), c = B(R(s));
		Q(c), j(s);
		var l = B(s, 4), u = R(l), d = B(u, 2);
		j(l), j(n), j(t), V((e) => d.disabled = e, [() => !W(me).trim()]), G("keydown", i, (e) => e.key === "Enter" && ve()), Yr(i, () => W(me), (e) => L(me, e)), Yr(o, () => W(he), (e) => L(he, e)), Yr(c, () => W(ge), (e) => L(ge, e)), G("click", u, _e), G("click", d, ve), q(e, t);
	};
	Y(H, (e) => {
		W(pe) && e(Fn);
	});
	var In = B(H, 2), U = (e) => {
		var t = Ea();
		let n;
		var r = R(t), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		j(t), V(() => {
			n = Lr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(c) === "ok",
				error: W(c) === "error"
			}), J(i, W(s));
		}), G("click", a, () => u("")), q(e, t);
	};
	Y(In, (e) => {
		W(s) && e(U);
	}), j(_n), V(() => xn = Lr(bn, 1, "topbar svelte-1n46o8q", null, xn, { hidden: !W(h) })), q(e, _n), ze();
}
pr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var ka = br(Oa, { target: document.getElementById("urd-admin") });
//#endregion
export { ka as default };
