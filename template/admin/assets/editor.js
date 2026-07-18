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
	return Te(/* @__PURE__ */ nn(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ nn(A) !== null) throw xe(), ye;
		A = e;
	}
}
function De(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ nn(n);
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
		var i = /* @__PURE__ */ nn(n);
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
		for (var r of n) fn(r);
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
	if (Ve.length === 0 && !xt) {
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
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Xe = !1;
function Ze() {
	Xe || (Xe = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Qe(e) {
	var t = H, n = U;
	Fn(null), In(null);
	try {
		return e();
	} finally {
		Fn(t), In(n);
	}
}
function $e(e, t, n, r = n) {
	e.addEventListener(t, () => Qe(n));
	let i = e[ue];
	i ? e[ue] = () => {
		i(), r(!0);
	} : e[ue] = () => r(!0), Ze();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function et(e) {
	let t = 0, n = Bt(0), r;
	return () => {
		un() && (W(n), gn(() => (t === 0 && (r = rr(() => e(() => Wt(n)))), t += 1, () => {
			Ue(() => {
				--t, t === 0 && (r?.(), r = void 0, Wt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var tt = S | C;
function nt(e, t, n, r) {
	new rt(e, t, n, r);
}
var rt = class {
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
	#h = et(() => (this.#m = Bt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = _n(() => {
			if (k) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, tt), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = vn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = vn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = vn(() => e(this.#e)), Ue(() => {
			var e = this.#c = document.createDocumentFragment(), t = en();
			e.append(t), this.#a = this.#x(() => vn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Tn(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = vn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				kn(this.#a, e);
				let t = this.#n.pending;
				this.#o = vn(() => t(this.#e));
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
		In(this.#i), Fn(this.#i), Le(this.#i.ctx);
		try {
			return Dt.ensure(), e();
		} catch (e) {
			return M(e), null;
		} finally {
			In(t), Fn(n), Le(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Tn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ue(() => {
			this.#d = !1, this.#m && Ht(this.#m, this.#l);
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
		this.#a &&= (Sn(this.#a), null), this.#o &&= (Sn(this.#o), null), this.#s &&= (Sn(this.#s), null), k && (Te(this.#t), De(), Te(Oe()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ce();
				return;
			}
			r = !0, i && E(), this.#s !== null && Tn(this.#s, () => {
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
					return vn(() => {
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
function it(e, t, n, r) {
	let i = Be() ? ct : ft;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = U, c = at(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ge(e, s);
			}
			ot();
		}
	}
	var d = st();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ut(e))).then(u).catch((e) => Ge(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), ot();
	}) : f();
}
function at() {
	var e = U, t = H, n = Ie, r = P;
	return function(i = !0) {
		In(e), Fn(t), Le(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ot(e = !0) {
	In(null), Fn(null), Le(null), e && P?.deactivate();
}
function st() {
	var e = U, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ct(e) {
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
var lt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ut(e, t, n) {
	let r = U;
	r === null && pe();
	var i = void 0, a = Bt(D), o = !H, s = /* @__PURE__ */ new Set();
	return hn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(ot);
		} catch (e) {
			n.reject(e), ot();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = st();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(lt);
			else for (let e of s.values()) e.reject(lt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== lt && (c.activate(), t ? (a.f |= ie, Ht(a, t)) : (a.f & 8388608 && (a.f ^= ie), Ht(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), dn(() => {
		for (let e of s) e.reject(lt);
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
function dt(e) {
	let t = /* @__PURE__ */ ct(e);
	return Rn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ft(e) {
	let t = /* @__PURE__ */ ct(e);
	return t.equals = Me, t;
}
function pt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Sn(t[n]);
	}
}
function mt(e) {
	var t, n = U, r = e.parent;
	if (!Mn && r !== null && e.v !== D && r.f & 24576) return be(), e.v;
	In(r);
	try {
		e.f &= ~ne, pt(e), t = Xn(e);
	} finally {
		In(n);
	}
	return t;
}
function ht(e) {
	var t = mt(e);
	if (!e.equals(t) && (e.wv = qn(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), yt?.capture(e, t, !0)), e.deps === null))) {
		N(e, h);
		return;
	}
	Mn || (bt === null ? qe(e) : (un() || P?.is_fork) && bt.set(e, t));
}
function gt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Qe(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Qn(t, 0), bn(t));
}
function _t(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && $n(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var vt = null, P = null, yt = null, bt = null, F = null, xt = !1, St = !1, Ct = null, wt = null, Tt = 0, Et = 1, Dt = class e {
	id = Et++;
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
		vt === null ? vt = this : (vt.#n = this, this.#t = vt), vt = this;
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
		this.#e = !0, Tt++ > 1e3 && (this.#x(), kt());
		for (let e of this.#u) this.#d.delete(e), N(e, g), this.schedule(e);
		for (let e of this.#d) N(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Ct = [], r = [], i = wt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw It(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Ct = null, wt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ft(e, t);
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
		this.#r.clear(), yt = this, jt(r), jt(n), yt = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : Jn(r) && (i & 16 && this.#d.add(r), $n(r));
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
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), bt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, bt = null;
	}
	flush() {
		try {
			St = !0, P = this, this.#g();
		} finally {
			Tt = 0, F = null, Ct = null, wt = null, St = !1, P = null, bt = null, Rt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(lt);
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
			!St && !xt && Ue(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		bt = null;
	}
	schedule(e) {
		if (F = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Ct !== null && t === U && (H === null || !(H.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? vt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ot(e) {
	var t = xt;
	xt = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (We(), P === null) return n;
			P.flush();
		}
	} finally {
		xt = t;
	}
}
function kt() {
	try {
		he();
	} catch (e) {
		Ge(e, F);
	}
}
var At = null;
function jt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Jn(r) && (At = /* @__PURE__ */ new Set(), $n(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && wn(r), At?.size > 0)) {
				Rt.clear();
				for (let e of At) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) At.has(n) && (At.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || $n(n);
					}
				}
				At.clear();
			}
		}
		At = null;
	}
}
function Mt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Mt(i, t, n, r) : e & 4194320 && !(e & 2048) && Nt(i, t, r) && (N(i, g), Pt(i));
	}
}
function Nt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Nt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Pt(e) {
	P.schedule(e);
}
function Ft(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), N(e, h);
		for (var n = e.first; n !== null;) Ft(n, t), n = n.next;
	}
}
function It(e) {
	N(e, h);
	for (var t = e.first; t !== null;) It(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Lt = /* @__PURE__ */ new Set(), Rt = /* @__PURE__ */ new Map(), zt = !1;
function Bt(e, t) {
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
	let n = Bt(e, t);
	return Rn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Vt(e, t = !1, n = !0) {
	let r = Bt(e);
	return t || (r.equals = Me), r;
}
function L(e, t, n = !1) {
	return H !== null && (!Pn || H.f & 131072) && Be() && H.f & 4325394 && (Ln === null || !Ln.has(e)) && ve(), Ht(e, n ? Kt(t) : t, wt);
}
function Ht(e, t, n = null) {
	if (!e.equals(t)) {
		Rt.set(e, Mn ? t : e.v);
		var r = Dt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && mt(t), bt === null && qe(t);
		}
		e.wv = qn(), Gt(e, g, n), Be() && U !== null && U.f & 1024 && !(U.f & 96) && (Vn === null ? Hn([e]) : Vn.push(e)), !r.is_fork && Lt.size > 0 && !zt && Ut();
	}
	return t;
}
function Ut() {
	zt = !1;
	for (let e of Lt) {
		e.f & 1024 && N(e, _);
		let t;
		try {
			t = Jn(e);
		} catch {
			t = !0;
		}
		t && $n(e);
	}
	Lt.clear();
}
function Wt(e) {
	L(e, e.v + 1);
}
function Gt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Be(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && N(s, t), c & 131072) Lt.add(s);
			else if (c & 2) {
				var u = s;
				bt?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= ne), Gt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && At !== null && At.add(d), n === null ? Pt(d) : n.push(d);
			}
		}
	}
}
function Kt(t) {
	if (typeof t != "object" || !t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = Gn, f = (e) => {
		if (Gn === d) return e();
		var t = H, n = Gn;
		Fn(null), Kn(d);
		var r = e();
		return Fn(t), Kn(n), r;
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
					r.set(t, e), Wt(o);
				}
			} else L(n, D), Wt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(Kt(s ? e[n] : D), u)), r.set(n, o)), o !== void 0) {
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
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? Kt(e[t]) : D, u)), r.set(t, n)), W(n) === D) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(D, u)), r.set(d + "", p)) : L(p, D);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, Kt(n)), r.set(t, c));
			else {
				l = c.v !== D;
				var m = f(() => Kt(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				Wt(o);
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
function qt(e) {
	try {
		if (typeof e == "object" && e && ae in e) return e[ae];
	} catch {}
	return e;
}
function Jt(e, t) {
	return Object.is(qt(e), qt(t));
}
var Yt, Xt, Zt, Qt;
function $t() {
	if (Yt === void 0) {
		Yt = window, Xt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Zt = a(t, "firstChild").get, Qt = a(t, "nextSibling").get, u(e) && (e[T] = void 0, e[se] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
	}
}
function en(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function tn(e) {
	return Zt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function nn(e) {
	return Qt.call(e);
}
function R(e, t) {
	if (!k) return /* @__PURE__ */ tn(e);
	var n = /* @__PURE__ */ tn(A);
	if (n === null) n = A.appendChild(en());
	else if (t && n.nodeType !== 3) {
		var r = en();
		return n?.before(r), Te(r), r;
	}
	return t && sn(n), Te(n), n;
}
function z(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ tn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ nn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = en();
			return A?.before(r), Te(r), r;
		}
		sn(A);
	}
	return A;
}
function B(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ nn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = en();
			return r === null ? i?.after(a) : r.before(a), Te(a), a;
		}
		sn(r);
	}
	return Te(r), r;
}
function rn(e) {
	e.textContent = "";
}
function an() {
	return !1;
}
function on(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function sn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ln(e, t) {
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
	if (e & 4) Ct === null ? Dt.ensure().schedule(r) : Ct.push(r);
	else if (t !== null) {
		try {
			$n(r);
		} catch (e) {
			throw Sn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && cn(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function un() {
	return H !== null && !Pn;
}
function dn(e) {
	let t = ln(8, null);
	return N(t, h), t.teardown = e, t;
}
function fn(e) {
	return ln(4 | ee, e);
}
function pn(e) {
	Dt.ensure();
	let t = ln(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Tn(t, () => {
			Sn(t), n(void 0);
		}) : (Sn(t), n(void 0));
	});
}
function mn(e) {
	return ln(4, e);
}
function hn(e) {
	return ln(w | C, e);
}
function gn(e, t = 0) {
	return ln(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	it(r, t, n, (t) => {
		ln(8, () => {
			e(...t.map(W));
		});
	});
}
function _n(e, t = 0) {
	return ln(16 | t, e);
}
function vn(e) {
	return ln(32 | C, e);
}
function yn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Mn, n = H;
		Nn(!0), Fn(null);
		try {
			t.call(null);
		} finally {
			Nn(e), Fn(n);
		}
	}
}
function bn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Qe(() => {
			e.abort(de);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Sn(n, t), n = r;
	}
}
function xn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Sn(t), t = n;
	}
}
function Sn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Cn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, bn(e, t && !n), Qn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	yn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && wn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Cn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ nn(e);
		e.remove(), e = n;
	}
}
function wn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Tn(e, t, n = !0) {
	var r = [];
	En(e, r, !0);
	var i = () => {
		n && Sn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function En(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				En(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Dn(e) {
	On(e, !0);
}
function On(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (N(e, g), Dt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			On(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function kn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ nn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var An = null, jn = !1, Mn = !1;
function Nn(e) {
	Mn = e;
}
var H = null, Pn = !1;
function Fn(e) {
	H = e;
}
var U = null;
function In(e) {
	U = e;
}
var Ln = null;
function Rn(e) {
	H !== null && (Ln ??= /* @__PURE__ */ new Set()).add(e);
}
var zn = null, Bn = 0, Vn = null;
function Hn(e) {
	Vn = e;
}
var Un = 1, Wn = 0, Gn = Wn;
function Kn(e) {
	Gn = e;
}
function qn() {
	return ++Un;
}
function Jn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Jn(a) && ht(a), a.wv > e.wv) return !0;
		}
		t & 512 && bt === null && N(e, h);
	}
	return !1;
}
function Yn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Ln !== null && Ln.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Yn(a, t, !1) : t === a && (n ? N(a, g) : a.f & 1024 && N(a, _), Pt(a));
	}
}
function Xn(e) {
	var t = zn, n = Bn, r = Vn, i = H, a = Ln, o = Ie, s = Pn, c = Gn, l = e.f;
	zn = null, Bn = 0, Vn = null, H = l & 96 ? null : e, Ln = null, Le(e.ctx), Pn = !1, Gn = ++Wn, e.ac !== null && (Qe(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (zn !== null) {
			var m;
			if (p || Qn(e, Bn), f !== null && Bn > 0) for (f.length = Bn + zn.length, m = 0; m < zn.length; m++) f[Bn + m] = zn[m];
			else e.deps = f = zn;
			if (un() && e.f & 512) for (m = Bn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Bn < f.length && (Qn(e, Bn), f.length = Bn);
		if (Be() && Vn !== null && !Pn && f !== null && !(e.f & 6146)) for (m = 0; m < Vn.length; m++) Yn(Vn[m], e);
		if (i !== null && i !== e) {
			if (Wn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Wn;
			if (t !== null) for (let e of t) e.rv = Wn;
			Vn !== null && (r === null ? r = Vn : r.push(...Vn));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return M(e);
	} finally {
		e.f ^= re, zn = t, Bn = n, Vn = r, H = i, Ln = a, Le(o), Pn = s, Gn = c;
	}
}
function Zn(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (zn === null || !n.call(zn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== D && qe(s), s.ac !== null && Qe(() => {
			s.ac.abort(de), s.ac = null;
		}), gt(s), Qn(s, 0);
	}
}
function Qn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Zn(e, n[r]);
}
function $n(e) {
	var t = e.f;
	if (!(t & 16384)) {
		N(e, h);
		var n = U, r = jn;
		U = e, jn = (t & 96) == 0;
		try {
			t & 16777232 ? xn(e) : bn(e), yn(e);
			var i = Xn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Un;
		} finally {
			jn = r, U = n;
		}
	}
}
async function er() {
	await Promise.resolve(), Ot();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (An?.add(e), H !== null && !Pn && !(U !== null && U.f & 16384) && (Ln === null || !Ln.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < Wn && (e.rv = Wn, zn === null && r !== null && r[Bn] === e ? Bn++ : zn === null ? zn = [e] : zn.push(e));
		else {
			H.deps ??= [], n.call(H.deps, e) || H.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [H] : n.call(i, H) || i.push(H);
		}
	}
	if (Mn && Rt.has(e)) return Rt.get(e);
	if (t) {
		var a = e;
		if (Mn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || nr(a)) && (o = mt(a)), Rt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Pn && H !== null && (jn || (H.f & 512) != 0), c = (a.f & b) === 0;
		Jn(a) && (s && (a.f |= 512), ht(a)), s && !c && (_t(a), tr(a));
	}
	if (bt?.has(e)) return bt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function tr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (_t(t), tr(t));
}
function nr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Rt.has(t) || t.f & 2 && nr(t)) return !0;
	return !1;
}
function rr(e) {
	var t = Pn;
	try {
		return Pn = !0, e();
	} finally {
		Pn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var ir = ["touchstart", "touchmove"];
function ar(e) {
	return ir.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var or = Symbol("events"), sr = /* @__PURE__ */ new Set(), cr = /* @__PURE__ */ new Set();
function lr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function ur(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || mr.call(t, e), !e.cancelBubble) return Qe(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ue(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function dr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = ur(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && dn(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[or] ??= {})[e] = n;
}
function fr(e) {
	for (var t = 0; t < e.length; t++) sr.add(e[t]);
	for (var n of cr) n(e);
}
var pr = null;
function mr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	pr = e;
	var s = 0, c = pr === e && e[or];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[or] = t;
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
		Fn(null), In(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[or]?.[r];
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
			e[or] = t, delete e.currentTarget, Fn(d), In(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var hr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function gr(e) {
	return hr?.createHTML(e) ?? e;
}
function _r(e) {
	var t = on("template");
	return t.innerHTML = gr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function vr(e, t) {
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
		if (k) return vr(A, null), A;
		i === void 0 && (i = _r(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ tn(i)));
		var t = r || Xt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ tn(t), s = t.lastChild;
			vr(o, s);
		} else vr(t, t);
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
function yr(e, t) {
	return xr(e, t);
}
var br = /* @__PURE__ */ new Map();
function xr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	$t();
	var l = void 0, u = pn(() => {
		var s = n ?? t.appendChild(en());
		nt(s, { pending: () => {} }, (t) => {
			Re({});
			var n = Ie;
			if (o && (n.c = o), a && (i.$$events = a), k && vr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw xe(), ye;
			ze();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = ar(r);
					for (let e of [t, document]) {
						var a = br.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), br.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, mr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(sr)), cr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = br.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, mr), r.delete(e), r.size === 0 && br.delete(n)) : r.set(e, i);
			}
			cr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Sr.set(l, u), l;
}
var Sr = /* @__PURE__ */ new WeakMap(), Cr = class {
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
			if (n) Dn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Dn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Sn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						kn(r, t), t.append(en()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Sn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Tn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Sn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = an();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = en();
			i.append(a), this.#n.set(e, {
				effect: vn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, vn(() => t(this.anchor)));
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
	var i = new Cr(e), a = n ? S : 0;
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
	_n(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function wr(e, t) {
	return t;
}
function Tr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Tn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Er(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			rn(d), d.append(u), e.items.clear();
		}
		Er(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Er(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, kn(a, document.createDocumentFragment())) : Sn(t[i], n);
	}
}
var Dr;
function Or(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? Te(/* @__PURE__ */ tn(u)) : u.appendChild(en());
	}
	k && Ee();
	var d = null, f = /* @__PURE__ */ ft(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Ar(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Mr(d, null, c)) : Dn(d) : Tn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: _n(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			k && ke(c) === "[!" != (e === 0) && (c = Oe(), Te(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = an(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Ht(S.v, b), S.i && Ht(S.i, y), v && u.unskip_effect(S.e)) : (S = jr(l, h ? c : Dr ??= en(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = vn(() => s(c)) : (d = vn(() => s(Dr ??= en())), d.f |= te)), e > r.size && me("", "", ""), k && e > 0 && Te(Oe()), !h) if (m.set(u, r), v) {
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
function kr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Ar(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = kr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Dn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) Mr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Nr(e, d, _), Nr(e, _, y), Mr(_, y, n), d = _, p = [], m = [], l = kr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Mr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Nr(e, S.prev, C.next), Nr(e, d, S), Nr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Mr(_, l, n), Nr(e, _.prev, _.next), Nr(e, _, d === null ? e.effect.first : d.next), Nr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = kr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = kr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Er(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = kr(l.next);
		var ne = ee.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.fix();
			}
			Tr(e, ee, re);
		}
	}
	o && Ue(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function jr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Bt(n) : /* @__PURE__ */ Vt(n, !1, !1) : null, l = o & 2 ? Bt(i) : null;
	return {
		v: c,
		i: l,
		e: vn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Mr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ nn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Nr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Pr = [..." 	\n\r\f\xA0\v﻿"];
function Fr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Pr.includes(r[o - 1])) && (s === r.length || Pr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Ir(e, t, n, r, i, a) {
	var o = e[T];
	if (k || o !== n || o === void 0) {
		var s = Fr(n, r, a);
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
		for (var i of t.options) i.selected = n.includes(Rr(i));
		return;
	}
	for (i of t.options) if (Jt(Rr(i), n)) {
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
	}), dn(() => {
		t.disconnect();
	});
}
function Lr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	$e(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Rr);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Rr(o);
		}
		n(a), e.__value = a, P !== null && r.add(P);
	}), mn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = P;
			if (r.has(o)) return;
		}
		if (X(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Rr(s), n(a));
		}
		e.__value = a, i = !1;
	}), Z(e);
}
function Rr(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var zr = Symbol("is custom element"), Br = Symbol("is html"), Vr = fe ? "link" : "LINK", Hr = fe ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Wr(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Wr(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ue] = n, Ue(n), Ze();
	}
}
function $(e, t) {
	var n = Gr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Hr) || (e.value = t ?? "");
}
function Ur(e, t) {
	var n = Gr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Wr(e, t, n, r) {
	var i = Gr(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Vr) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && qr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Gr(e) {
	return e[se] ??= {
		[zr]: e.nodeName.includes("-"),
		[Br]: e.namespaceURI === O
	};
}
var Kr = /* @__PURE__ */ new Map();
function qr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Kr.get(t);
	if (n) return n;
	Kr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Jr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	$e(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Yr(e) ? Xr(a) : a, n(a), P !== null && r.add(P), await er(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || rr(t) == null && e.value) && (n(Yr(e) ? Xr(e.value) : e.value), P !== null && r.add(P)), gn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		Yr(e) && n === Xr(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Yr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Xr(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Zr(e, t) {
	return e === t || e?.[ae] === t;
}
function Qr(e = {}, t, n, r) {
	var i = Ie.r, a = U;
	return mn(() => {
		var o, s;
		return gn(() => {
			o = s, s = r?.() || [], rr(() => {
				Zr(n(...s), e) || (t(e, ...s), o && Zr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Zr(n(...s), e) && t(null, ...s);
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
function $r(e, t) {
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
function ei(e, t = {}) {
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
var ti = (e) => Math.round(e * 100) / 100;
function ni(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ri = {
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
					x: ti(r.x * 100 / e.columns),
					w: ti(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= ni(t.grid);
		return e;
	}
}, ii = { 1: (e) => (e.grid = ni(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ai(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ii[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function oi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ri[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/theme.js
function si(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var ci = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = si(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, li = {
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
		let n = t.stops.map(si).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, ui = {
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
		let n = si(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity);
	}
}, di = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", fi = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = di, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity);
	}
}, pi = {
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
}, mi = () => ({
	duration: 600,
	delay: 0
}), hi = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: mi,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: mi,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: mi,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
}, gi = 1600, _i = .82, vi = .6;
async function yi(e) {
	let t = await createImageBitmap(e), n = Math.min(1, gi / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(_i);
	return s.size > 4e5 && (s = await o(vi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function bi(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function xi(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var Si = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), Ci = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\"> </option>"), wi = /* @__PURE__ */ K("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), Ti = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), Ei = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), Di = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"> </span>"), Oi = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), ki = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Ai = /* @__PURE__ */ K("<button> </button>"), ji = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Mi = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ni = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), Pi = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Fi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Ii = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Li = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span> <select class=\"nav-target svelte-1n46o8q\" title=\"Hvor lenken går\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Ri = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde (URL)</option></select></label> <input class=\"svelte-1n46o8q\"/> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), zi = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Bi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), Vi = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Hi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ui = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Wi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <p class=\"panel-hint svelte-1n46o8q\">Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Gi = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ki = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), qi = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label>", 1), Ji = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Yi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Xi = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> 📵 Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Zi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Qi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), $i = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fra <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Til <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), ea = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ta = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), na = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ra = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ia = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\">×</button></span></span> <!></div>"), aa = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), oa = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), sa = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), ca = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), la = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), ua = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), da = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), fa = /* @__PURE__ */ K("<!> <!>", 1), pa = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), ma = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), ha = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), ga = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), _a = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), va = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), ya = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), ba = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!></div>");
function xa(e, t) {
	Re(t, !0);
	let n = [
		["color", ci],
		["gradient", li],
		["glow", ui],
		["image", pi],
		["grain", fi]
	], r = Object.fromEntries(n), i = /* @__PURE__ */ I(null), a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(""), c = /* @__PURE__ */ I("info"), l = 0;
	function u(e, t = "info") {
		L(s, e, !0), L(c, t, !0);
		let n = ++l;
		t === "ok" && setTimeout(() => {
			l === n && (L(s, ""), L(c, "info"));
		}, 8e3);
	}
	let d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(Kt({
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
		}, !0), w(), v(), te(), W(C).pages.some((e) => e.id === W(a)) ? S?.sendPage(W(a), b.data) : vt(W(C).pages[0].id);
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
		L(i, ai(await (await fetch("/content/site.json")).json()), !0), x = $r("urd-draft-site", () => W(i)), x.replace(ai(x.data)), x.save(), ee(), L(p, {
			snap: !0,
			...W(C).grid
		}, !0), await vt(new URLSearchParams(location.search).get("page") ?? W(C).pages[0].id), await it(), ot(), W(C).site.title === "Min forening" && !localStorage.getItem("urd-setup-done") && (L(me, W(C).site.title, !0), L(he, W(C).theme.tokens.color.accent, !0), L(ge, W(C).theme.tokens.color.bg, !0), L(pe, !0));
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
		"Grid",
		"Historikk"
	];
	function D(e) {
		L(E, W(E) === e ? null : e, !0), S?.sendShowGrid(W(E) === "Grid"), W(E) === "Historikk" && ft();
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
		}, !0), xe();
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
			let e = await yi(t);
			Ce(`edit:${W(O).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || bi(t.name).replaceAll("-", " ");
			});
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ee = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form"
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
	], Ae = /* @__PURE__ */ I(null), je = /* @__PURE__ */ I(null), Me = /* @__PURE__ */ I(""), Ne = /* @__PURE__ */ I(Kt([])), Fe = /* @__PURE__ */ I(null);
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
			M(e, "src", (await yi(n)).dataUrl);
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
			version: hi[e].version,
			props: hi[e].defaults()
		};
	}
	function Ye(e) {
		Ce(`edit:anim-${W(O).blockId}`, (t) => {
			t.animation = e ? Je(e) : null;
		}), W(O) && S?.sendDemoAnim(W(O).sectionId, W(O).blockId);
	}
	function Xe(e, t) {
		Number.isFinite(t) && (Ce(`edit:anim-${W(O).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(O) && S?.sendDemoAnim(W(O).sectionId, W(O).blockId));
	}
	function Ze(e) {
		Be("section-anim", (t) => {
			t.animation = e ? Je(e) : null;
		}), S?.sendDemoAnim(W(Ae));
	}
	function Qe(e, t) {
		Number.isFinite(t) && (Be("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), S?.sendDemoAnim(W(Ae)));
	}
	function $e(e) {
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
	function et() {
		return b.data.sections.find((e) => e.id === W(Ae)) ?? b.data.sections[0];
	}
	function tt(e) {
		let t = b.data.sections.find((e) => e.id === W(Ae));
		t && (T("grid"), t.grid = e ? { ...x.data.grid } : null, L(je, t.grid ? { ...t.grid } : null, !0), b.save(), w(), S?.sendSection(W(a), t), W(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function nt(e, t) {
		let n = b.data.sections.find((e) => e.id === W(Ae));
		n?.grid && (T("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, L(je, { ...n.grid }, !0), b.save(), w(), S?.sendSection(W(a), n), W(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function rt(e, t) {
		T("grid"), L(p, {
			...W(p),
			[e]: t
		}, !0), x.data.grid = {
			...x.data.grid,
			[e]: t
		}, x.save(), w(), te(), W(E) === "Grid" && S?.sendShowGrid(!0);
	}
	async function it() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(f, await e.json(), !0) : e.status !== 503 && L(f, null);
		} catch {
			L(f, null);
		}
	}
	let at = null;
	async function ot() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (at = (await e.json()).head ?? null);
		} catch {}
	}
	async function st(e) {
		if (!at) return ot(), {
			ok: !0,
			head: null
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${at}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === at) return {
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
	let ct = /* @__PURE__ */ I(null), lt = /* @__PURE__ */ I(""), ut = /* @__PURE__ */ I(!1);
	async function ft() {
		L(lt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(ct, (await e.json()).commits, !0) : e.status === 401 ? (L(ct, [], !0), L(lt, "Logg inn med GitHub for å se historikken.")) : (L(ct, [], !0), L(lt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(ct, [], !0), L(lt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let pt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), mt = !1;
	async function ht() {
		let e = W(ct)?.[0];
		if (!(!e || W(ut)) && confirm(`Angre siste publisering («${e.message}»)?\n\nEn ny commit gjenoppretter innholdet slik det var før den - ingenting slettes fra historikken.`)) {
			L(ut, !0), u("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? at = e : ot(), mt = !0, u("✓ Angret! Last admin på nytt om ~1 min for å redigere videre på den gjenopprettede versjonen", "ok");
				} else t.status === 409 ? u("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : u((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				u("Kunne ikke nå publiseringslaget", "error");
			}
			L(ut, !1), ft();
		}
	}
	let gt = null;
	function _t(e) {
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
	async function vt(e) {
		L(a, e, !0), gt = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = oi(await e.json(), x.data));
			} catch {}
			n ? ne.delete(e) : n = _t(t), b = $r(`urd-draft-${e}`, () => n), b.replace(oi(b.data, x.data)), b.save(), ie.length = 0, ae.length = 0, oe = null, L(Ae, null), L(je, null), w(), v(), L(s, "");
		})(), await gt;
	}
	function P() {
		S?.destroy(), S = ei(W(d), {
			onEdit: Vt,
			onMove: Ht,
			onDelete: $t,
			onAddSection: Jt,
			onMoveSection: Xt,
			onDeleteSection: Zt,
			onSectionSize: Qt,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Le,
			onSelectBlock: Se,
			onReady: yt,
			onNavigate: bt,
			onAddBlock: (e) => rn(e.sectionId, e.block),
			onMobileManual: Ut,
			onMobileAuto: Wt,
			onReviewDone: Gt,
			onBlockFlag: qt
		});
	}
	async function yt() {
		await gt, x.hasDraft() && te();
		let e = !W(i).pages.some((e) => e.id === W(a));
		(b.hasDraft() || e) && S?.sendPage(W(a), b.data), W(h) || S?.sendChrome(!1), W(E) === "Grid" && S?.sendShowGrid(!0);
	}
	function bt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(C).pages.find((e) => e.path === t);
		n && n.id !== W(a) && vt(n.id);
	}
	function F(e, t) {
		T(e), t(), x.save(), w(), te();
	}
	let xt = /* @__PURE__ */ I(""), St = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Ct(e, t = null) {
		return e ? St.includes(e) ? `«${e}» er et reservert navn` : W(C).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function wt() {
		let e = W(xt).trim(), t = bi(e), n = Ct(t);
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
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(_t({
			id: t,
			title: e
		}))), w(), L(xt, ""), vt(t);
	}
	function Tt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		F("pages", () => {
			e.title = n;
			for (let t of W(C).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(a) ? (b.data.meta.title = n, b.save(), w()) : Et(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Et(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = oi(await t.json(), x.data));
		} catch {}
		r ||= _t(e), t(r), localStorage.setItem(n, JSON.stringify(r)), w();
	}
	function Dt(e, t) {
		let n = bi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ct(n, e.id);
		if (r) {
			u(r, "error");
			return;
		}
		F("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ot(e) {
		e.path !== "/" && (F("pages", () => {
			W(C).pages = W(C).pages.filter((t) => t.id !== e.id), W(C).nav.items = W(C).nav.items.filter((t) => t.page !== e.id);
		}), e.id === W(a) && vt(W(C).pages[0].id), u("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function kt(e) {
		F("edit:nav-logo", () => {
			W(C).nav.logo = {
				type: "text",
				value: "",
				...W(C).nav.logo,
				...e
			};
		});
	}
	function At(e, t) {
		F(`edit:nav-label-${e}`, () => {
			W(C).nav.items[e].label = t;
		});
	}
	function jt(e, t) {
		F("nav", () => {
			let n = W(C).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Mt(e, t) {
		F(`edit:nav-href-${e}`, () => {
			W(C).nav.items[e].href = t;
		});
	}
	function Nt(e, t) {
		let n = e + t, r = W(C).nav.items;
		n < 0 || n >= r.length || F("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Pt(e) {
		F("nav", () => {
			W(C).nav.items.splice(e, 1);
		});
	}
	function Ft() {
		F("nav", () => {
			W(C).nav.items.push({
				label: "Lenke",
				page: W(C).pages[0].id
			});
		});
	}
	let It = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function Lt(e, t) {
		F(`edit:theme-color-${e}`, () => {
			W(C).theme.tokens.color[e] = t;
		});
	}
	function Rt(e, t) {
		F("theme", () => {
			W(C).theme.tokens.font[e] = t;
		});
	}
	function zt(e, t) {
		F("theme", () => {
			W(C).theme.tokens.radius[e] = t;
		});
	}
	function Bt() {
		L(h, !W(h)), S?.sendChrome(W(h));
	}
	function Vt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T(`edit:${e.blockId}`), t.props = e.props, b.save(), w(), W(O)?.blockId === e.blockId && xe(), L(s, ""));
	}
	function Ht(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		T(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && y(t, "desktop-endret-etter-mobil"), b.save(), w(), W(O)?.blockId === e.blockId && xe();
	}
	function Ut(e) {
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
	function Wt(e) {
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
	function Gt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (T("review-done"), t.responsive.mobile.attention = null, b.save(), w(), v());
	}
	function qt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T("decor"), t.decor = e.decor, b.save(), w(), W(O)?.blockId === e.blockId && xe());
	}
	function Jt(e) {
		T("add-section"), b.data.sections.splice(e.index, 0, e.section), b.save(), w(), S?.sendPage(W(a), b.data);
	}
	function Xt(e) {
		let t = b.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (T("move-section"), [t[n], t[r]] = [t[r], t[n]], b.save(), w(), S?.sendPage(W(a), b.data));
	}
	function Zt(e) {
		T("delete-section"), e.sectionId === W(Ae) && (L(Ae, null), L(je, null)), b.data.sections = b.data.sections.filter((t) => t.id !== e.sectionId), b.save(), w(), S?.sendPage(W(a), b.data);
	}
	function Qt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === W(Ae) && L(Me, e.minHeight, !0), b.save(), w());
	}
	function $t(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), W(O)?.blockId === e.blockId && L(O, null), y(t, "blokk-slettet"), b.save(), w(), S?.sendSection(W(a), t));
	}
	let en = {
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
		}
	};
	function tn(e) {
		let t = en[e];
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
	function nn(e) {
		S ? S.sendPlaceBlock(e) : rn(et()?.id, e);
	}
	function rn(e, t) {
		let n = b.data.sections.find((t) => t.id === e) ?? b.data.sections[0];
		n && (T("add-block"), n.blocks.push(t), y(n, "blokk-lagt-til"), b.save(), w(), S?.sendSection(W(a), n));
	}
	function an(e) {
		nn(tn(e));
	}
	async function on(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		u("Komprimerer bildet…");
		let n;
		try {
			n = await yi(t);
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(d)?.clientWidth ?? 1280));
		nn({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: bi(t.name).replaceAll("-", " "),
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
	function sn(e) {
		let t = [], n = (e, n) => {
			if (!e.src?.startsWith("data:image/")) return;
			let r = e.src.split(",", 2)[1], i = `media/${bi(n || "bilde")}-${xi(r)}.webp`;
			t.push({
				path: i,
				content: r,
				encoding: "base64"
			}), e.src = `/${i}`;
		};
		for (let t of e.sections) {
			for (let e of t.background?.layers ?? []) e.type === "image" && n(e.props, "bakgrunn");
			for (let e of t.blocks) e.type === "image" && n(e.props, e.props.alt);
		}
		return t;
	}
	function cn() {
		T("discard");
		let e = b.reset();
		x.reset(), ee(), L(p, {
			snap: !0,
			...W(C).grid
		}, !0), w(), L(s, ""), te(), W(C).pages.some((e) => e.id === W(a)) ? S?.sendPage(W(a), e) : vt(W(C).pages[0].id);
	}
	async function ln() {
		if (mt) {
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
					l = oi(JSON.parse(e), x.data);
				} catch {}
			}
			if (!l && c && (l = _t(o)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...sn(u)), e.push({
				path: o.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), c ? r.push(o.id) : n.push(s);
		}
		x.hasDraft() && (e.push({
			path: "content/site.json",
			content: JSON.stringify(W(C), null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-site"));
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
		let o = await st(e);
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
			e ? at = e : ot(), sn(b.data);
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			L(i, JSON.parse(JSON.stringify(W(C))), !0), x = $r("urd-draft-site", () => W(i)), ee(), L(p, {
				snap: !0,
				...W(C).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(b.data));
			b = $r(`urd-draft-${W(a)}`, () => t), ne.has(W(a)) && localStorage.setItem(`urd-draft-${W(a)}`, JSON.stringify(t)), w(), u("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (c?.status === 401) {
			let e = (await c.json().catch(() => null))?.error;
			u(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await it();
		} else c?.status === 403 ? u((await c.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c?.status === 409 ? u("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : u(c ? (await c.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var un = ba();
	dr("keydown", Yt, de);
	var dn = R(un), fn = (e) => {
		var t = Si();
		G("click", t, Bt), q(e, t);
	};
	Y(dn, (e) => {
		W(h) || e(fn);
	});
	var pn = B(dn, 2);
	let mn;
	var hn = R(pn), gn = B(R(hn), 2), _n = (e) => {
		var t = wi(), n = z(t);
		Or(n, 21, () => W(C).pages, (e) => e.id, (e, t) => {
			var n = Ci(), r = R(n, !0);
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
			r !== (r = W(a)) && (n.value = (n.__value = W(a)) ?? "", X(n, W(a))), s = Ir(o, 1, "ghost svelte-1n46o8q", null, s, { active: W(g) === "desktop" }), l = Ir(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(g) === "mobile" });
		}), G("change", n, (e) => vt(e.target.value)), G("click", o, () => L(g, "desktop")), G("click", c, () => L(g, "mobile")), q(e, t);
	};
	Y(gn, (e) => {
		W(i) && e(_n);
	});
	var vn = B(gn, 2), yn = (e) => {
		var t = Ti(), n = R(t);
		j(t), V(() => J(n, `📱 ${W(_) ?? ""} ${W(_) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(g, "mobile")), q(e, t);
	};
	Y(vn, (e) => {
		W(_) > 0 && e(yn);
	});
	var bn = B(vn, 2), xn = (e) => {
		q(e, Ei());
	};
	Y(bn, (e) => {
		W(o) && e(xn);
	}), j(hn);
	var Sn = B(hn, 2), Cn = R(Sn), wn = (e) => {
		var t = ki(), n = z(t), r = R(n, !0);
		j(n);
		var i = B(n, 2), a = (e) => {
			var t = Di(), n = R(t);
			j(t), V(() => {
				Wr(t, "title", W(f).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(n, `${W(f).allowed ? "" : "⚠ "}${W(f).login ?? ""}`);
			}), q(e, t);
		}, s = (e) => {
			q(e, Oi());
		};
		Y(i, (e) => {
			W(f)?.loggedIn ? e(a) : W(f) && e(s, 1);
		});
		var c = B(i, 2), l = B(c, 2), u = B(l, 2);
		V((e) => {
			Wr(n, "title", W(h) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), J(r, W(h) ? "👁 Ren visning" : "✏ Rediger"), Wr(c, "href", e), l.disabled = !W(o), u.disabled = !W(o);
		}, [() => re().path]), G("click", n, Bt), G("click", l, cn), G("click", u, ln), q(e, t);
	};
	Y(Cn, (e) => {
		W(i) && e(wn);
	}), j(Sn), j(pn);
	var Tn = B(pn, 2), En = (e) => {
		var t = ga(), r = R(t), i = (e) => {
			var t = ha(), r = z(t);
			Or(r, 21, () => ye, wr, (e, t) => {
				var n = Ai();
				let r;
				var i = R(n, !0);
				j(n), V(() => {
					r = Ir(n, 1, "svelte-1n46o8q", null, r, { active: W(E) === W(t) }), J(i, W(t));
				}), G("click", n, () => D(W(t))), q(e, n);
			}), j(r);
			var i = B(r, 2), o = (e) => {
				var t = ma(), r = R(t), i = R(r, !0);
				j(r);
				var o = B(r, 2), s = (e) => {
					var t = Fi(), n = B(R(t), 2);
					Or(n, 17, () => W(C).pages, (e) => e.id, (e, t) => {
						var n = Pi();
						let r;
						var i = R(n);
						Q(i);
						var o = B(i, 2), s = (e) => {
							q(e, ji());
						}, c = (e) => {
							var n = Mi();
							Q(n), V((e) => $(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => Dt(W(t), e.target.value)), q(e, n);
						};
						Y(o, (e) => {
							W(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = B(o, 2), u = R(l), d = B(u, 2), f = (e) => {
							var n = Ni();
							G("click", n, () => Ot(W(t))), q(e, n);
						};
						Y(d, (e) => {
							W(t).path !== "/" && e(f);
						}), j(l), j(n), V(() => {
							r = Ir(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(a) }), $(i, W(t).title), u.disabled = W(t).id === W(a);
						}), G("change", i, (e) => Tt(W(t), e.target.value)), G("click", u, () => vt(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					Q(r);
					var i = B(r, 2);
					De(2), j(t), V((e) => i.disabled = e, [() => !W(xt).trim()]), G("keydown", r, (e) => e.key === "Enter" && wt()), Jr(r, () => W(xt), (e) => L(xt, e)), G("click", i, wt), q(e, t);
				}, c = (e) => {
					var t = Ri(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					i.value = i.__value = "text";
					var a = B(i);
					a.value = a.__value = "image", j(r);
					var o;
					Z(r), j(n);
					var s = B(n, 2);
					Q(s);
					var c = B(s, 4);
					Or(c, 17, () => W(C).nav.items, wr, (e, t, n) => {
						var r = Li(), i = R(r);
						Q(i);
						var a = B(i, 2), o = R(a);
						o.disabled = n === 0;
						var s = B(o, 2), c = B(s, 2);
						j(a);
						var l = B(a, 2), u = R(l);
						Or(u, 17, () => W(C).pages, (e) => e.id, (e, t) => {
							var n = Ci(), r = R(n, !0);
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
							var r = Ii();
							Q(r), V(() => $(r, W(t).href ?? "")), G("change", r, (e) => Mt(n, e.target.value)), q(e, r);
						};
						Y(p, (e) => {
							W(t).page || e(m);
						}), j(r), V(() => {
							$(i, W(t).label), s.disabled = n === W(C).nav.items.length - 1, f !== (f = W(t).page ?? "__href") && (l.value = (l.__value = W(t).page ?? "__href") ?? "", X(l, W(t).page ?? "__href"));
						}), G("input", i, (e) => At(n, e.target.value)), G("click", o, () => Nt(n, -1)), G("click", s, () => Nt(n, 1)), G("click", c, () => Pt(n)), G("change", l, (e) => jt(n, e.target.value)), q(e, r);
					});
					var l = B(c, 2);
					j(t), V(() => {
						o !== (o = W(C).nav.logo?.type ?? "text") && (r.value = (r.__value = W(C).nav.logo?.type ?? "text") ?? "", X(r, W(C).nav.logo?.type ?? "text")), $(s, W(C).nav.logo?.value ?? ""), Wr(s, "placeholder", W(C).nav.logo?.type === "image" ? "/media/logo.webp" : "Navnet i menyen");
					}), G("change", r, (e) => kt({ type: e.target.value })), G("input", s, (e) => kt({ value: e.target.value })), G("click", l, Ft), q(e, t);
				}, l = (e) => {
					var t = Bi(), n = B(R(t), 2), r = B(R(n));
					Q(r), j(n);
					var i = B(n, 2), a = B(R(i));
					Q(a), j(i);
					var o = B(i, 2), s = B(R(o));
					Q(s), j(o);
					var c = B(o, 2), l = B(R(c));
					Q(l), j(c);
					var u = B(c, 4), d = B(R(u)), f = R(d), p = (e) => {
						var t = zi(), n = {};
						V(() => {
							n !== (n = W(C).theme.tokens.font.heading) && (t.value = (t.__value = W(C).theme.tokens.font.heading) ?? "");
						}), q(e, t);
					}, h = /* @__PURE__ */ dt(() => !It.some(([, e]) => e === W(C).theme.tokens.font.heading));
					Y(f, (e) => {
						W(h) && e(p);
					}), Or(B(f), 17, () => It, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ dt(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = Ci(), o = R(a, !0);
						j(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), j(d);
					var g;
					Z(d), j(u);
					var _ = B(u, 2), v = B(R(_)), y = R(v), b = (e) => {
						var t = zi(), n = {};
						V(() => {
							n !== (n = W(C).theme.tokens.font.body) && (t.value = (t.__value = W(C).theme.tokens.font.body) ?? "");
						}), q(e, t);
					}, x = /* @__PURE__ */ dt(() => !It.some(([, e]) => e === W(C).theme.tokens.font.body));
					Y(y, (e) => {
						W(x) && e(b);
					}), Or(B(y), 17, () => It, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ dt(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = Ci(), o = R(a, !0);
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
					}), G("input", r, (e) => Lt("bg", e.target.value)), G("input", a, (e) => Lt("surface", e.target.value)), G("input", s, (e) => Lt("text", e.target.value)), G("input", l, (e) => Lt("accent", e.target.value)), G("change", d, (e) => Rt("heading", e.target.value)), G("change", v, (e) => Rt("body", e.target.value)), G("change", te, (e) => zt("sm", e.target.value)), G("change", re, (e) => zt("md", e.target.value)), q(e, t);
				}, u = (e) => {
					var t = Vi();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					j(i), j(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					j(c);
					var u = B(c, 2), d = B(R(u), 2), f = R(d), p = B(f, 2), m = B(p, 2), h = B(m, 2), _ = B(h, 2);
					j(d), j(u), j(t), V(() => {
						n = Ir(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(g) === "mobile" }), Wr(t, "title", W(g) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => an("text")), G("click", o, () => an("text-box")), G("click", s, () => an("button")), G("change", l, on), G("click", f, () => an("shape-line")), G("click", p, () => an("shape-arrow")), G("click", m, () => an("shape-circle")), G("click", h, () => an("shape-rect")), G("click", _, () => an("shape-triangle")), q(e, t);
				}, d = (e) => {
					var t = Hi(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					j(r), j(n);
					var a = B(n, 2);
					Q(a);
					var o = B(a, 2), s = R(o);
					Q(s), De(), j(o), De(2), j(t), V(() => {
						J(i, `${W(p).size ?? ""} px`), $(a, W(p).size), Ur(s, W(p).snap !== !1);
					}), G("input", a, (e) => rt("size", Number(e.target.value))), G("change", s, (e) => rt("snap", e.target.checked)), q(e, t);
				}, h = (e) => {
					var t = sa(), r = R(t), i = (e) => {
						var t = Xi(), n = z(t), r = R(n);
						j(n);
						var i = B(n, 2), a = (e) => {
							var t = Ui(), n = R(t), r = B(R(n));
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
							var t = Wi(), n = z(t), r = B(R(n)), i = R(r);
							i.value = i.__value = "left";
							var a = B(i);
							a.value = a.__value = "center";
							var o = B(a);
							o.value = o.__value = "right", j(r);
							var s;
							Z(r), j(n);
							var c = B(n, 2), l = R(c);
							Q(l), De(), j(c), De(2), V((e) => {
								s !== (s = W(O).props.align ?? "left") && (r.value = (r.__value = W(O).props.align ?? "left") ?? "", X(r, W(O).props.align ?? "left")), Ur(l, e);
							}, [() => !!W(O).props.box]), G("change", r, (e) => k("align", e.target.value)), G("change", l, (e) => k("box", e.target.checked)), q(e, t);
						}, u = (e) => {
							var t = Ki(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i)), o = R(a);
							Or(o, 17, () => W(C).pages, (e) => e.id, (e, t) => {
								var n = Ci(), r = R(n, !0);
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
								var t = Gi();
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
							var t = qi(), n = z(t), r = B(R(n));
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
							var t = Ji(), n = z(t), r = B(R(n));
							Or(r, 21, () => Oe, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ dt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ci(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(r);
							var i;
							Z(r), j(n);
							var a = B(n, 2), o = B(R(a));
							Or(o, 21, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ dt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ci(), o = R(a, !0);
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
								i !== (i = W(O).props.kind) && (r.value = (r.__value = W(O).props.kind) ?? "", X(r, W(O).props.kind)), s !== (s = W(O).props.color) && (o.value = (o.__value = W(O).props.color) ?? "", X(o, W(O).props.color)), $(l, W(O).props.thickness), Ur(d, e);
							}, [() => !!W(O).props.fill]), G("change", r, (e) => k("kind", e.target.value)), G("change", o, (e) => k("color", e.target.value)), G("change", l, (e) => k("thickness", Number(e.target.value))), G("change", d, (e) => k("fill", e.target.checked ? W(O).props.color : null)), q(e, t);
						};
						Y(c, (e) => {
							W(O).type === "text" ? e(l) : W(O).type === "button" ? e(u, 1) : W(O).type === "image" ? e(d, 2) : W(O).type === "shape" && e(f, 3);
						});
						var p = B(c, 4), h = B(R(p)), _ = R(h);
						_.value = _.__value = "", Or(B(_), 17, () => Object.entries(hi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ dt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Ci(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(h);
						var v;
						Z(h), j(p);
						var y = B(p, 2), b = (e) => {
							var t = Yi(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i), De(2), V(() => {
								$(r, W(O).animation.props.duration), $(a, W(O).animation.props.delay);
							}), G("change", r, (e) => Xe("duration", Number(e.target.value))), G("change", a, (e) => Xe("delay", Number(e.target.value))), q(e, t);
						};
						Y(y, (e) => {
							W(O).animation && hi[W(O).animation.type]?.entrance && e(b);
						}), V(() => {
							J(r, `${Ee[W(O).type] ?? W(O).type ?? ""}-blokk`), Ur(s, W(O).decor), v !== (v = W(O).animation?.type ?? "") && (h.value = (h.__value = W(O).animation?.type ?? "") ?? "", X(h, W(O).animation?.type ?? ""));
						}), G("change", s, (e) => A(e.target.checked)), G("change", h, (e) => Ye(e.target.value || null)), q(e, t);
					}, a = (e) => {
						var t = aa(), r = B(z(t), 2), i = B(R(r));
						Q(i), j(r);
						var a = B(r, 6), o = R(a);
						Q(o), De(), j(a);
						var s = B(a, 2), c = (e) => {
							var t = Zi(), n = z(t), r = B(R(n)), i = R(r);
							j(r), j(n);
							var a = B(n, 2);
							Q(a), V(() => {
								J(i, `${W(je).size ?? ""} px`), $(a, W(je).size);
							}), G("input", a, (e) => nt("size", Number(e.target.value))), q(e, t);
						};
						Y(s, (e) => {
							W(je) && e(c);
						});
						var l = B(s, 8);
						Or(l, 17, () => W(Ne), wr, (e, t, r) => {
							var i = ia(), a = R(i), o = R(a);
							Or(o, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ dt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ci(), o = R(a, !0);
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
								var n = Qi(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Q(l), V((e, n) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.opacity ?? 1);
								}, [() => qe(W(t).props.value), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", a, (e) => M(r, "value", e.target.value)), G("input", l, (e) => M(r, "opacity", Number(e.target.value))), q(e, n);
							}, h = (e) => {
								var n = $i(), i = z(n), a = B(R(i));
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
									$(a, e), $(s, n), J(u, `${W(t).props.angle ?? ""}°`), $(d, W(t).props.angle), J(m, `${r ?? ""}%`), $(h, W(t).props.opacity ?? 1), Ur(_, i);
								}, [
									() => qe(W(t).props.stops[0]),
									() => qe(W(t).props.stops[W(t).props.stops.length - 1]),
									() => Math.round((W(t).props.opacity ?? 1) * 100),
									() => !!W(t).props.animate
								]), G("input", a, (e) => Ge(r, 0, e.target.value)), G("input", s, (e) => Ge(r, W(t).props.stops.length - 1, e.target.value)), G("input", d, (e) => M(r, "angle", Number(e.target.value))), G("input", h, (e) => M(r, "opacity", Number(e.target.value))), G("change", _, (e) => M(r, "animate", e.target.checked)), q(e, n);
							}, g = (e) => {
								var n = ea(), i = z(n), a = B(R(i));
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
								var n = ta(), i = z(n), a = B(R(i)), o = R(a);
								j(a), j(i);
								var s = B(i, 2);
								Q(s), V((e) => {
									J(o, `${e ?? ""}%`), $(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => M(r, "opacity", Number(e.target.value))), q(e, n);
							}, v = (e) => {
								var n = ra(), i = z(n), a = R(i), o = B(a);
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
									var n = na(), i = z(n), a = B(R(i)), o = R(a);
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
						Or(d, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ dt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Ci(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(d), j(u);
						var f = B(u, 2), p = B(f, 4), h = B(R(p)), g = R(h);
						g.value = g.__value = "", Or(B(g), 17, () => Object.entries(hi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ dt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Ci(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(h);
						var _;
						Z(h), j(p);
						var v = B(p, 2), y = (e) => {
							var t = Yi(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i), De(2), V(() => {
								$(r, W(Fe).props.duration), $(a, W(Fe).props.delay);
							}), G("change", r, (e) => Qe("duration", Number(e.target.value))), G("change", a, (e) => Qe("delay", Number(e.target.value))), q(e, t);
						};
						Y(v, (e) => {
							W(Fe) && hi[W(Fe).type]?.entrance && e(y);
						}), V(() => {
							$(i, W(Me)), Ur(o, W(je) !== null), _ !== (_ = W(Fe)?.type ?? "") && (h.value = (h.__value = W(Fe)?.type ?? "") ?? "", X(h, W(Fe)?.type ?? ""));
						}), G("change", i, (e) => $e(e.target.value)), G("change", o, (e) => tt(e.target.checked)), Lr(d, () => W(Ve), (e) => L(Ve, e)), G("click", f, () => He(W(Ve))), G("change", h, (e) => Ze(e.target.value || null)), q(e, t);
					}, o = (e) => {
						q(e, oa());
					};
					Y(r, (e) => {
						W(O) ? e(i) : W(Ae) ? e(a, 1) : e(o, -1);
					}), j(t), q(e, t);
				}, _ = (e) => {
					var t = pa(), n = B(R(t), 2), r = (e) => {
						q(e, ca());
					}, i = (e) => {
						var t = fa(), n = z(t), r = (e) => {
							var t = la(), n = R(t, !0);
							j(t), V(() => J(n, W(lt))), q(e, t);
						};
						Y(n, (e) => {
							W(lt) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = da(), n = z(t);
							Or(B(n, 2), 19, () => W(ct), (e) => e.sha, (e, t, n) => {
								var r = ua();
								let i;
								var a = R(r), o = R(a, !0);
								j(a);
								var s = B(a, 2), c = R(s);
								j(s), j(r), V((e) => {
									i = Ir(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), Wr(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${pt.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), V(() => {
								n.disabled = W(ut) || !W(f)?.allowed, Wr(n, "title", W(f)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, ht), q(e, t);
						};
						Y(i, (e) => {
							W(ct).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(ct) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(o, (e) => {
					W(E) === "Sider" ? e(s) : W(E) === "Nav" ? e(c, 1) : W(E) === "Tema" ? e(l, 2) : W(E) === "Blokker" ? e(u, 3) : W(E) === "Grid" ? e(d, 4) : W(E) === "Egenskaper" ? e(h, 5) : W(E) === "Historikk" && e(_, 6);
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
		Qr(c, (e) => L(d, e), () => W(d)), j(o), j(t), V(() => {
			s = Ir(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: W(g) === "mobile" }), Wr(c, "src", `/?page=${W(a)}&preview=1`);
		}), dr("load", c, P), lr(c), q(e, t);
	}, Dn = (e) => {
		q(e, _a());
	};
	Y(Tn, (e) => {
		W(i) ? e(En) : e(Dn, -1);
	});
	var On = B(Tn, 2), kn = (e) => {
		var t = va(), n = R(t), r = B(R(n), 4), i = B(R(r));
		Q(i), j(r);
		var a = B(r, 2), o = B(R(a));
		Q(o), j(a);
		var s = B(a, 2), c = B(R(s));
		Q(c), j(s);
		var l = B(s, 4), u = R(l), d = B(u, 2);
		j(l), j(n), j(t), V((e) => d.disabled = e, [() => !W(me).trim()]), G("keydown", i, (e) => e.key === "Enter" && ve()), Jr(i, () => W(me), (e) => L(me, e)), Jr(o, () => W(he), (e) => L(he, e)), Jr(c, () => W(ge), (e) => L(ge, e)), G("click", u, _e), G("click", d, ve), q(e, t);
	};
	Y(On, (e) => {
		W(pe) && e(kn);
	});
	var An = B(On, 2), jn = (e) => {
		var t = ya();
		let n;
		var r = R(t), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		j(t), V(() => {
			n = Ir(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(c) === "ok",
				error: W(c) === "error"
			}), J(i, W(s));
		}), G("click", a, () => u("")), q(e, t);
	};
	Y(An, (e) => {
		W(s) && e(jn);
	}), j(un), V(() => mn = Ir(pn, 1, "topbar svelte-1n46o8q", null, mn, { hidden: !W(h) })), q(e, un), ze();
}
fr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Sa = yr(xa, { target: document.getElementById("urd-admin") });
//#endregion
export { Sa as default };
