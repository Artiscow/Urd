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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, ee = 1 << 25, T = 65536, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), E = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), D = new class extends Error {
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
function pe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function me() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function he() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ge() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function _e() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var ve = {}, O = Symbol("uninitialized"), ye = "http://www.w3.org/1999/xhtml";
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
function j(e) {
	if (e === null) throw xe(), ve;
	return A = e;
}
function Te() {
	return j(/* @__PURE__ */ nn(A));
}
function M(e) {
	if (k) {
		if (/* @__PURE__ */ nn(A) !== null) throw xe(), ve;
		A = e;
	}
}
function Ee(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ nn(n);
		A = n;
	}
}
function De(e = !0) {
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
function Oe(e) {
	if (!e || e.nodeType !== 8) throw xe(), ve;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function ke(e) {
	return e === this.v;
}
function Ae(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function je(e) {
	return !Ae(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Me = [];
function Ne(e, t = !1, n = !1) {
	return Pe(e, /* @__PURE__ */ new Map(), "", Me, null, n);
}
function Pe(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Pe(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Pe(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Pe(t.toJSON(), n, r, i, t);
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
var N = null;
function Fe(e) {
	N = e;
}
function Ie(e, t = !1, n) {
	N = {
		p: N,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: null
	};
}
function Le(e) {
	var t = N, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) pn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, N = t.p, e ?? {};
}
function Re() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var ze = [];
function Be() {
	var e = ze;
	ze = [], f(e);
}
function Ve(e) {
	if (ze.length === 0 && !xt) {
		var t = ze;
		queueMicrotask(() => {
			t === ze && Be();
		});
	}
	ze.push(e);
}
function He() {
	for (; ze.length > 0;) Be();
}
function Ue(e) {
	var t = U;
	if (t === null) return H.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	We(e, t);
}
function We(e, t) {
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
var Ge = ~(g | _ | h);
function P(e, t) {
	e.f = e.f & Ge | t;
}
function Ke(e) {
	e.f & 512 || e.deps === null ? P(e, h) : P(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function qe(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= T, qe(t.deps));
}
function Je(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), qe(e.deps), P(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ye = !1;
function Xe() {
	Ye || (Ye = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Ze(e) {
	var t = H, n = U;
	Fn(null), In(null);
	try {
		return e();
	} finally {
		Fn(t), In(n);
	}
}
function Qe(e, t, n, r = n) {
	e.addEventListener(t, () => Ze(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), Xe();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function $e(e) {
	let t = 0, n = Bt(0), r;
	return () => {
		dn() && (K(n), _n(() => (t === 0 && (r = tr(() => e(() => Wt(n)))), t += 1, () => {
			Ve(() => {
				--t, t === 0 && (r?.(), r = void 0, Wt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var et = S | C;
function tt(e, t, n, r) {
	new nt(e, t, n, r);
}
var nt = class {
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
	#h = $e(() => (this.#m = Bt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = vn(() => {
			if (k) {
				let e = this.#t;
				Te();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, et), k && (this.#e = A);
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
		e && (this.is_pending = !0, this.#o = yn(() => e(this.#e)), Ve(() => {
			var e = this.#c = document.createDocumentFragment(), t = en();
			e.append(t), this.#a = this.#x(() => yn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Tn(this.#o, () => {
				this.#o = null;
			}), this.#b(F));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = yn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				kn(this.#a, e);
				let t = this.#n.pending;
				this.#o = yn(() => t(this.#e));
			} else this.#b(F);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Je(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = U, n = H, r = N;
		In(this.#i), Fn(this.#i), Fe(this.#i.ctx);
		try {
			return Dt.ensure(), e();
		} catch (e) {
			return Ue(e), null;
		} finally {
			In(t), Fn(n), Fe(r);
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
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ve(() => {
			this.#d = !1, this.#m && Ht(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), K(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork ? (this.#a && F.skip_effect(this.#a), this.#o && F.skip_effect(this.#o), this.#s && F.skip_effect(this.#s), F.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (V(this.#a), null), this.#o &&= (V(this.#o), null), this.#s &&= (V(this.#s), null), k && (j(this.#t), Ee(), j(De()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ce();
				return;
			}
			r = !0, i && _e(), this.#s !== null && Tn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				We(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return yn(() => {
						var t = U;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return We(e, this.#i.parent), null;
				}
			}));
		};
		Ve(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				We(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => We(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function rt(e, t, n, r) {
	let i = Re() ? st : dt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = U, c = it(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				We(e, s);
			}
			at();
		}
	}
	var d = ot();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ lt(e))).then(u).catch((e) => We(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), at();
	}) : f();
}
function it() {
	var e = U, t = H, n = N, r = F;
	return function(i = !0) {
		In(e), Fn(t), Fe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function at(e = !0) {
	In(null), Fn(null), Fe(null), e && F?.deactivate();
}
function ot() {
	var e = U, t = e.b, n = F, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function st(e) {
	var t = 2 | g;
	return U !== null && (U.f |= C), {
		ctx: N,
		deps: null,
		effects: null,
		equals: ke,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: U,
		ac: null
	};
}
var ct = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function lt(e, t, n) {
	let r = U;
	r === null && de();
	var i = void 0, a = Bt(O), o = !H, s = /* @__PURE__ */ new Set();
	return gn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== D && n.reject(e);
			}).finally(at);
		} catch (e) {
			n.reject(e), at();
		}
		var c = F;
		if (o) {
			if (t.f & 32768) var l = ot();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ct);
			else for (let e of s.values()) e.reject(ct);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ct && (c.activate(), t ? (a.f |= re, Ht(a, t)) : (a.f & 8388608 && (a.f ^= re), Ht(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), fn(() => {
		for (let e of s) e.reject(ct);
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
function ut(e) {
	let t = /* @__PURE__ */ st(e);
	return Rn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function dt(e) {
	let t = /* @__PURE__ */ st(e);
	return t.equals = je, t;
}
function ft(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) V(t[n]);
	}
}
function pt(e) {
	var t, n = U, r = e.parent;
	if (!Mn && r !== null && e.v !== O && r.f & 24576) return be(), e.v;
	In(r);
	try {
		e.f &= ~T, ft(e), t = Jn(e);
	} finally {
		In(n);
	}
	return t;
}
function mt(e) {
	var t = pt(e);
	if (!e.equals(t) && (e.wv = Gn(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : (F.capture(e, t, !0), vt?.capture(e, t, !0)), e.deps === null))) {
		P(e, h);
		return;
	}
	Mn || (yt === null ? Ke(e) : (dn() || F?.is_fork) && yt.set(e, t));
}
function ht(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Ze(() => {
		t.ac.abort(D), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Xn(t, 0), xn(t));
}
function gt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Zn(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var _t = null, F = null, vt = null, yt = null, bt = null, xt = !1, St = !1, Ct = null, wt = null, Tt = 0, Et = 1, Dt = class e {
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
		_t === null ? _t = this : (_t.#n = this, this.#t = _t), _t = this;
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
			for (var r of n.d) P(r, g), t(r);
			for (r of n.m) P(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Tt++ > 1e3 && (this.#x(), kt());
		for (let e of this.#u) this.#d.delete(e), P(e, g), this.schedule(e);
		for (let e of this.#d) P(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Ct = [], r = [], i = wt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw It(e), this.#h() || this.discard(), t;
		}
		if (F = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Ct = null, wt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ft(e, t);
			i.length > 0 && F.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), vt = this, jt(r), jt(n), vt = null, this.#s?.resolve();
		var s = F;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : Kn(r) && (i & 16 && this.#d.add(r), Zn(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), P(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), F = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) Je(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), yt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		F = this;
	}
	deactivate() {
		F = null, yt = null;
	}
	flush() {
		try {
			St = !0, F = this, this.#g();
		} finally {
			Tt = 0, bt = null, Ct = null, wt = null, St = !1, F = null, yt = null, Rt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(ct);
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
		this.#m || (this.#m = !0, Ve(() => {
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
		if (F === null) {
			let t = F = new e();
			!St && !xt && Ve(() => {
				t.#e || t.flush();
			});
		}
		return F;
	}
	apply() {
		yt = null;
	}
	schedule(e) {
		if (bt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
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
			e === null || (e.#n = t), t === null ? _t = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ot(e) {
	var t = xt;
	xt = !0;
	try {
		var n;
		for (e && (F !== null && !F.is_fork && F.flush(), n = e());;) {
			if (He(), F === null) return n;
			F.flush();
		}
	} finally {
		xt = t;
	}
}
function kt() {
	try {
		pe();
	} catch (e) {
		We(e, bt);
	}
}
var At = null;
function jt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Kn(r) && (At = /* @__PURE__ */ new Set(), Zn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && wn(r), At?.size > 0)) {
				Rt.clear();
				for (let e of At) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) At.has(n) && (At.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Zn(n);
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
		e & 2 ? Mt(i, t, n, r) : e & 4194320 && !(e & 2048) && Nt(i, t, r) && (P(i, g), Pt(i));
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
	F.schedule(e);
}
function Ft(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, h);
		for (var n = e.first; n !== null;) Ft(n, t), n = n.next;
	}
}
function It(e) {
	P(e, h);
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
		equals: ke,
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
	return t || (r.equals = je), r;
}
function L(e, t, n = !1) {
	return H !== null && (!Pn || H.f & 131072) && Re() && H.f & 4325394 && (Ln === null || !Ln.has(e)) && ge(), Ht(e, n ? Kt(t) : t, wt);
}
function Ht(e, t, n = null) {
	if (!e.equals(t)) {
		Rt.set(e, Mn ? t : e.v);
		var r = Dt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && pt(t), yt === null && Ke(t);
		}
		e.wv = Gn(), Gt(e, g, n), Re() && U !== null && U.f & 1024 && !(U.f & 96) && (zn === null ? Bn([e]) : zn.push(e)), !r.is_fork && Lt.size > 0 && !zt && Ut();
	}
	return t;
}
function Ut() {
	zt = !1;
	for (let e of Lt) {
		e.f & 1024 && P(e, _);
		let t;
		try {
			t = Kn(e);
		} catch {
			t = !0;
		}
		t && Zn(e);
	}
	Lt.clear();
}
function Wt(e) {
	L(e, e.v + 1);
}
function Gt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Re(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && P(s, t), c & 131072) Lt.add(s);
			else if (c & 2) {
				var u = s;
				yt?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= T), Gt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && At !== null && At.add(d), n === null ? Pt(d) : n.push(d);
			}
		}
	}
}
function Kt(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = Un, f = (e) => {
		if (Un === d) return e();
		var t = H, n = Un;
		Fn(null), Wn(d);
		var r = e();
		return Fn(t), Wn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && me();
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
					let e = f(() => /* @__PURE__ */ I(O, u));
					r.set(t, e), Wt(o);
				}
			} else L(n, O), Wt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(Kt(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = K(o);
				return c === O ? void 0 : c;
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
				if (a !== void 0 && o !== O) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ie) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? Kt(e[t]) : O, u)), r.set(t, n)), K(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(O, u)), r.set(d + "", p)) : L(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, Kt(n)), r.set(t, c));
			else {
				l = c.v !== O;
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
			K(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== O;
			});
			for (var [n, i] of r) i.v !== O && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			he();
		}
	});
}
function qt(e) {
	try {
		if (typeof e == "object" && e && ie in e) return e[ie];
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
		Zt = a(t, "firstChild").get, Qt = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
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
		return n?.before(r), j(r), r;
	}
	return t && cn(n), j(n), n;
}
function rn(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ tn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ nn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = en();
			return A?.before(r), j(r), r;
		}
		cn(A);
	}
	return A;
}
function z(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ nn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = en();
			return r === null ? i?.after(a) : r.before(a), j(a), a;
		}
		cn(r);
	}
	return j(r), r;
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
		ctx: N,
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
	F?.register_created_effect(r);
	var i = r;
	if (e & 4) Ct === null ? Dt.ensure().schedule(r) : Ct.push(r);
	else if (t !== null) {
		try {
			Zn(r);
		} catch (e) {
			throw V(r), e;
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
	return H !== null && !Pn;
}
function fn(e) {
	let t = un(8, null);
	return P(t, h), t.teardown = e, t;
}
function pn(e) {
	return un(4 | w, e);
}
function mn(e) {
	Dt.ensure();
	let t = un(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Tn(t, () => {
			V(t), n(void 0);
		}) : (V(t), n(void 0));
	});
}
function hn(e) {
	return un(4, e);
}
function gn(e) {
	return un(ne | C, e);
}
function _n(e, t = 0) {
	return un(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	rt(r, t, n, (t) => {
		un(8, () => {
			e(...t.map(K));
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
		let e = Mn, n = H;
		Nn(!0), Fn(null);
		try {
			t.call(null);
		} finally {
			Nn(e), Fn(n);
		}
	}
}
function xn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Ze(() => {
			e.abort(D);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : V(n, t), n = r;
	}
}
function Sn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || V(t), t = n;
	}
}
function V(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Cn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, xn(e, t && !n), Xn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	bn(e), e.f ^= x, e.f |= y;
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
		n && V(e), t && t();
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
		e.f ^= v, e.f & 1024 || (P(e, g), Dt.ensure().schedule(e));
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
var W = null, G = 0, zn = null;
function Bn(e) {
	zn = e;
}
var Vn = 1, Hn = 0, Un = Hn;
function Wn(e) {
	Un = e;
}
function Gn() {
	return ++Vn;
}
function Kn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~T), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Kn(a) && mt(a), a.wv > e.wv) return !0;
		}
		t & 512 && yt === null && P(e, h);
	}
	return !1;
}
function qn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Ln !== null && Ln.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? qn(a, t, !1) : t === a && (n ? P(a, g) : a.f & 1024 && P(a, _), Pt(a));
	}
}
function Jn(e) {
	var t = W, n = G, r = zn, i = H, a = Ln, o = N, s = Pn, c = Un, l = e.f;
	W = null, G = 0, zn = null, H = l & 96 ? null : e, Ln = null, Fe(e.ctx), Pn = !1, Un = ++Hn, e.ac !== null && (Ze(() => {
		e.ac.abort(D);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (W !== null) {
			var m;
			if (p || Xn(e, G), f !== null && G > 0) for (f.length = G + W.length, m = 0; m < W.length; m++) f[G + m] = W[m];
			else e.deps = f = W;
			if (dn() && e.f & 512) for (m = G; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && G < f.length && (Xn(e, G), f.length = G);
		if (Re() && zn !== null && !Pn && f !== null && !(e.f & 6146)) for (m = 0; m < zn.length; m++) qn(zn[m], e);
		if (i !== null && i !== e) {
			if (Hn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Hn;
			if (t !== null) for (let e of t) e.rv = Hn;
			zn !== null && (r === null ? r = zn : r.push(...zn));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return Ue(e);
	} finally {
		e.f ^= te, W = t, G = n, zn = r, H = i, Ln = a, Fe(o), Pn = s, Un = c;
	}
}
function Yn(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (W === null || !n.call(W, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== O && Ke(s), s.ac !== null && Ze(() => {
			s.ac.abort(D), s.ac = null;
		}), ht(s), Xn(s, 0);
	}
}
function Xn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Yn(e, n[r]);
}
function Zn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, h);
		var n = U, r = jn;
		U = e, jn = (t & 96) == 0;
		try {
			t & 16777232 ? Sn(e) : xn(e), bn(e);
			var i = Jn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Vn;
		} finally {
			jn = r, U = n;
		}
	}
}
async function Qn() {
	await Promise.resolve(), Ot();
}
function K(e) {
	var t = (e.f & 2) != 0;
	if (An?.add(e), H !== null && !Pn && !(U !== null && U.f & 16384) && (Ln === null || !Ln.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < Hn && (e.rv = Hn, W === null && r !== null && r[G] === e ? G++ : W === null ? W = [e] : W.push(e));
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
			return (!(a.f & 1024) && a.reactions !== null || er(a)) && (o = pt(a)), Rt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Pn && H !== null && (jn || (H.f & 512) != 0), c = (a.f & b) === 0;
		Kn(a) && (s && (a.f |= 512), mt(a)), s && !c && (gt(a), $n(a));
	}
	if (yt?.has(e)) return yt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function $n(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (gt(t), $n(t));
}
function er(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Rt.has(t) || t.f & 2 && er(t)) return !0;
	return !1;
}
function tr(e) {
	var t = Pn;
	try {
		return Pn = !0, e();
	} finally {
		Pn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var nr = ["touchstart", "touchmove"];
function rr(e) {
	return nr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var ir = Symbol("events"), ar = /* @__PURE__ */ new Set(), or = /* @__PURE__ */ new Set();
function sr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || fr.call(t, e), !e.cancelBubble) return Ze(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ve(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function lr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && fn(() => {
		t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[ir] ??= {})[e] = n;
}
function ur(e) {
	for (var t = 0; t < e.length; t++) ar.add(e[t]);
	for (var n of or) n(e);
}
var dr = null;
function fr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	dr = e;
	var s = 0, c = dr === e && e[ir];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[ir] = t;
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
					var h = o[ir]?.[r];
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
			e[ir] = t, delete e.currentTarget, Fn(d), In(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var pr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function mr(e) {
	return pr?.createHTML(e) ?? e;
}
function hr(e) {
	var t = sn("template");
	return t.innerHTML = mr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function gr(e, t) {
	var n = U;
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
		if (k) return gr(A, null), A;
		i === void 0 && (i = hr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ tn(i)));
		var t = r || Xt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ tn(t), s = t.lastChild;
			gr(o, s);
		} else gr(t, t);
		return t;
	};
}
function Y(e, t) {
	if (k) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Te();
		return;
	}
	e !== null && e.before(t);
}
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function _r(e, t) {
	return yr(e, t);
}
var vr = /* @__PURE__ */ new Map();
function yr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	$t();
	var l = void 0, u = mn(() => {
		var s = n ?? t.appendChild(en());
		tt(s, { pending: () => {} }, (t) => {
			Ie({});
			var n = N;
			if (o && (n.c = o), a && (i.$$events = a), k && gr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw xe(), ve;
			Le();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = rr(r);
					for (let e of [t, document]) {
						var a = vr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), vr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, fr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(ar)), or.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = vr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, fr), r.delete(e), r.size === 0 && vr.delete(n)) : r.set(e, i);
			}
			or.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return br.set(l, u), l;
}
var br = /* @__PURE__ */ new WeakMap(), xr = class {
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
				r && (V(r.effect), this.#n.delete(n));
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
					} else V(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Tn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (V(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = F, r = on();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = en();
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
function Z(e, t, n = !1) {
	var r;
	k && (r = A, Te());
	var i = new xr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Oe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = De();
				j(a), i.anchor = a, we(!1), i.ensure(e, t), we(!0);
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
function Sr(e, t) {
	return t;
}
function Cr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Tn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					wr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
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
		wr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function wr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, kn(a, document.createDocumentFragment())) : V(t[i], n);
	}
}
var Tr;
function Er(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? j(/* @__PURE__ */ tn(u)) : u.appendChild(en());
	}
	k && Te();
	var d = null, f = /* @__PURE__ */ dt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Or(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Ar(d, null, c)) : Dn(d) : Tn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: vn(() => {
			p = K(f);
			var e = p.length;
			let t = !1;
			k && Oe(c) === "[!" != (e === 0) && (c = De(), j(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = on(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Ht(S.v, b), S.i && Ht(S.i, y), v && u.unskip_effect(S.e)) : (S = kr(l, h ? c : Tr ??= en(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = yn(() => s(c)) : (d = yn(() => s(Tr ??= en())), d.f |= ee)), e > r.size && fe("", "", ""), k && e > 0 && j(De()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && we(!0), K(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Dr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Or(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Dr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Dn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ee, _ === l) Ar(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), jr(e, d, _), jr(e, _, y), Ar(_, y, n), d = _, p = [], m = [], l = Dr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ar(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					jr(e, S.prev, C.next), jr(e, d, S), jr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Ar(_, l, n), jr(e, _.prev, _.next), jr(e, _, d === null ? e.effect.first : d.next), jr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Dr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Dr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (wr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Dr(l.next);
		var T = w.length;
		if (T > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Cr(e, w, te);
		}
	}
	o && Ve(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function kr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Bt(n) : /* @__PURE__ */ Vt(n, !1, !1) : null, l = o & 2 ? Bt(i) : null;
	return {
		v: c,
		i: l,
		e: yn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ar(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ nn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function jr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Mr = [..." 	\n\r\f\xA0\v﻿"];
function Nr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Mr.includes(r[o - 1])) && (s === r.length || Mr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Pr(e, t, n, r, i, a) {
	var o = e[oe];
	if (k || o !== n || o === void 0) {
		var s = Nr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Fr(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return Se();
		for (var i of t.options) i.selected = n.includes(Lr(i));
		return;
	}
	for (i of t.options) if (Jt(Lr(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Ir(e) {
	var t = new MutationObserver(() => {
		Fr(e, e.__value);
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
function Lr(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Rr = Symbol("is custom element"), zr = Symbol("is html"), Br = ue ? "link" : "LINK", Vr = ue ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Ur(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Ur(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, Ve(n), Xe();
	}
}
function $(e, t) {
	var n = Wr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Vr) || (e.value = t ?? "");
}
function Hr(e, t) {
	var n = Wr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Ur(e, t, n, r) {
	var i = Wr(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Br) || i[t] !== (i[t] = n) && (t === "loading" && (e[E] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Kr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Wr(e) {
	return e[ae] ??= {
		[Rr]: e.nodeName.includes("-"),
		[zr]: e.namespaceURI === ye
	};
}
var Gr = /* @__PURE__ */ new Map();
function Kr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Gr.get(t);
	if (n) return n;
	Gr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function qr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Qe(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Jr(e) ? Yr(a) : a, n(a), F !== null && r.add(F), await Qn(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || tr(t) == null && e.value) && (n(Jr(e) ? Yr(e.value) : e.value), F !== null && r.add(F)), _n(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = F;
			if (r.has(i)) return;
		}
		Jr(e) && n === Yr(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Jr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Yr(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Xr(e, t) {
	return e === t || e?.[ie] === t;
}
function Zr(e = {}, t, n, r) {
	var i = N.r, a = U;
	return hn(() => {
		var o, s;
		return _n(() => {
			o = s, s = r?.() || [], tr(() => {
				Xr(n(...s), e) || (t(e, ...s), o && Xr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Xr(n(...s), e) && t(null, ...s);
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
function Qr(e, t) {
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
function $r(e, t = {}) {
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
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
var ei = (e) => Math.round(e * 100) / 100;
function ti(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ni = {
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
					x: ei(r.x * 100 / e.columns),
					w: ei(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= ti(t.grid);
		return e;
	}
}, ri = { 1: (e) => (e.grid = ti(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ii(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ri[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function ai(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ni[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region src/lib/imageTools.js
var oi = 1600, si = .82, ci = .6;
async function li(e) {
	let t = await createImageBitmap(e), n = Math.min(1, oi / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(si);
	return s.size > 4e5 && (s = await o(ci)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function ui(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function di(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var fi = /* @__PURE__ */ J("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), pi = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\"> </option>"), mi = /* @__PURE__ */ J("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), hi = /* @__PURE__ */ J("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), gi = /* @__PURE__ */ J("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), _i = /* @__PURE__ */ J("<span class=\"who svelte-1n46o8q\"> </span>"), vi = /* @__PURE__ */ J("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), yi = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), bi = /* @__PURE__ */ J("<button> </button>"), xi = /* @__PURE__ */ J("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Si = /* @__PURE__ */ J("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ci = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), wi = /* @__PURE__ */ J("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Ti = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Ei = /* @__PURE__ */ J("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Di = /* @__PURE__ */ J("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span></span> <select title=\"Hvor lenken går\" class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Oi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde (URL)</option></select></label> <input class=\"svelte-1n46o8q\"/> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), ki = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Ai = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), ji = /* @__PURE__ */ J("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Mi = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ni = /* @__PURE__ */ J("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i valgt seksjon</label> <!>", 1), Pi = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk i en seksjon for å kunne gi den sitt eget grid.</p>"), Fi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <!></div>"), Ii = /* @__PURE__ */ J("<p> </p> <p class=\"panel-hint svelte-1n46o8q\">Den detaljerte blokkeditoren kommer i neste steg av v0.5.</p>", 1), Li = /* @__PURE__ */ J("<p>Valgt: seksjon</p> <p class=\"panel-hint svelte-1n46o8q\">Seksjonseditoren (høyde, bakgrunn, animasjoner) kommer i v0.5.</p>", 1), Ri = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), zi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Bi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), Vi = /* @__PURE__ */ J("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Hi = /* @__PURE__ */ J("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Ui = /* @__PURE__ */ J("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Wi = /* @__PURE__ */ J("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Gi = /* @__PURE__ */ J("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Ki = /* @__PURE__ */ J("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!></div>");
function qi(e, t) {
	Ie(t, !0);
	let n = /* @__PURE__ */ I(null), r = /* @__PURE__ */ I(null), i = /* @__PURE__ */ I(!1), a = /* @__PURE__ */ I(""), o = /* @__PURE__ */ I("info"), s = 0;
	function c(e, t = "info") {
		L(a, e, !0), L(o, t, !0);
		let n = ++s;
		t === "ok" && setTimeout(() => {
			s === n && (L(a, ""), L(o, "info"));
		}, 8e3);
	}
	let l = /* @__PURE__ */ I(null), u = /* @__PURE__ */ I(null), d = /* @__PURE__ */ I(Kt({
		size: 16,
		snap: !0
	})), f = /* @__PURE__ */ I(!0), p = /* @__PURE__ */ I("desktop"), h = /* @__PURE__ */ I(0);
	function g() {
		L(h, v?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function _(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, g(), b?.sendAttention(e.id, !0));
	}
	let v = null, y = null, b = null, x = /* @__PURE__ */ I(null);
	function S() {
		L(x, y.data, !0), y.replace(K(x));
	}
	function C() {
		b?.sendSite(Ne(K(x)));
	}
	let w = /* @__PURE__ */ new Set(), ee = () => K(x).pages.find((e) => e.id === K(r));
	function T() {
		let e = K(x)?.pages?.some((e) => !w.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		L(i, e || v?.hasDraft() && !w.has(K(r)) || y?.hasDraft() || !1, !0);
	}
	let te = [], ne = [], re = null;
	function ie() {
		return JSON.stringify({
			page: v.data,
			site: y.data
		});
	}
	function E(e) {
		e === re && (e.startsWith("edit:") || e === "grid") || (te.push(ie()), te.length > 50 && te.shift(), ne.length = 0, re = e);
	}
	function ae(e) {
		let { page: t, site: n } = JSON.parse(e);
		v.replace(t), y.replace(n), S(), v.save(), y.save(), L(d, {
			snap: !0,
			...K(x).grid
		}, !0), T(), g(), C(), K(x).pages.some((e) => e.id === K(r)) ? b?.sendPage(K(r), v.data) : Ce(K(x).pages[0].id);
	}
	function oe() {
		te.length && (ne.push(ie()), ae(te.pop()), re = null, c("Angret"));
	}
	function se() {
		ne.length && (te.push(ie()), ae(ne.pop()), re = null, c("Gjentatt"));
	}
	function ce(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? se() : oe());
	}
	async function le() {
		L(n, ii(await (await fetch("/content/site.json")).json()), !0), y = Qr("urd-draft-site", () => K(n)), y.replace(ii(y.data)), y.save(), S(), L(d, {
			snap: !0,
			...K(x).grid
		}, !0), await Ce(new URLSearchParams(location.search).get("page") ?? K(x).pages[0].id), await be();
	}
	let D = /* @__PURE__ */ I(null), ue = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Grid",
		"Historikk"
	];
	function de(e) {
		L(D, K(D) === e ? null : e, !0), b?.sendShowGrid(K(D) === "Grid");
	}
	let fe = /* @__PURE__ */ I(null);
	function pe(e) {
		if (!e.blockId) {
			L(fe, null);
			return;
		}
		let t = (v?.data.sections.find((t) => t.id === e.sectionId))?.blocks.find((t) => t.id === e.blockId);
		L(fe, t ? {
			sectionId: e.sectionId,
			blockId: e.blockId,
			type: t.type
		} : null, !0);
	}
	let me = /* @__PURE__ */ I(null), he = /* @__PURE__ */ I(null);
	function ge(e) {
		L(me, e.sectionId, !0);
		let t = v?.data.sections.find((t) => t.id === e.sectionId);
		L(he, t?.grid ? { ...t.grid } : null, !0);
	}
	function _e() {
		return v.data.sections.find((e) => e.id === K(me)) ?? v.data.sections[0];
	}
	function ve(e) {
		let t = v.data.sections.find((e) => e.id === K(me));
		t && (E("grid"), t.grid = e ? { ...y.data.grid } : null, L(he, t.grid ? { ...t.grid } : null, !0), v.save(), T(), b?.sendSection(K(r), t), K(D) === "Grid" && b?.sendShowGrid(!0));
	}
	function O(e, t) {
		let n = v.data.sections.find((e) => e.id === K(me));
		n?.grid && (E("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, L(he, { ...n.grid }, !0), v.save(), T(), b?.sendSection(K(r), n), K(D) === "Grid" && b?.sendShowGrid(!0));
	}
	function ye(e, t) {
		E("grid"), L(d, {
			...K(d),
			[e]: t
		}, !0), y.data.grid = {
			...y.data.grid,
			[e]: t
		}, y.save(), T(), C(), K(D) === "Grid" && b?.sendShowGrid(!0);
	}
	async function be() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(u, await e.json(), !0) : e.status !== 503 && L(u, null);
		} catch {
			L(u, null);
		}
	}
	let xe = null;
	function Se(e) {
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
	async function Ce(e) {
		L(r, e, !0), xe = (async () => {
			let t = ee(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = ai(await e.json(), y.data));
			} catch {}
			n ? w.delete(e) : n = Se(t), v = Qr(`urd-draft-${e}`, () => n), v.replace(ai(v.data, y.data)), v.save(), te.length = 0, ne.length = 0, re = null, L(me, null), L(he, null), T(), g(), L(a, "");
		})(), await xe;
	}
	function k() {
		b?.destroy(), b = $r(K(l), {
			onEdit: qe,
			onMove: Je,
			onDelete: rt,
			onAddSection: $e,
			onMoveSection: et,
			onDeleteSection: tt,
			onSectionSize: nt,
			onUndo: (e) => e.redo ? se() : oe(),
			onSelectSection: ge,
			onSelectBlock: pe,
			onReady: we,
			onNavigate: A,
			onAddBlock: (e) => st(e.sectionId, e.block),
			onMobileManual: Ye,
			onMobileAuto: Xe,
			onReviewDone: Ze,
			onBlockFlag: Qe
		});
	}
	async function we() {
		await xe, y.hasDraft() && C();
		let e = !K(n).pages.some((e) => e.id === K(r));
		(v.hasDraft() || e) && b?.sendPage(K(r), v.data), K(f) || b?.sendChrome(!1), K(D) === "Grid" && b?.sendShowGrid(!0);
	}
	function A(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = K(x).pages.find((e) => e.path === t);
		n && n.id !== K(r) && Ce(n.id);
	}
	function j(e, t) {
		E(e), t(), y.save(), T(), C();
	}
	let Te = /* @__PURE__ */ I(""), De = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Oe(e, t = null) {
		return e ? De.includes(e) ? `«${e}» er et reservert navn` : K(x).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function ke() {
		let e = K(Te).trim(), t = ui(e), n = Oe(t);
		if (n) {
			c(n, "error");
			return;
		}
		j("pages", () => {
			K(x).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), K(x).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(Se({
			id: t,
			title: e
		}))), T(), L(Te, ""), Ce(t);
	}
	function Ae(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let i = e.title;
		j("pages", () => {
			e.title = n;
			for (let t of K(x).nav.items) t.page === e.id && t.label === i && (t.label = n);
		}), e.id === K(r) ? (v.data.meta.title = n, v.save(), T()) : je(e, (e) => {
			e.meta.title = n;
		});
	}
	async function je(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = ai(await t.json(), y.data));
		} catch {}
		r ||= Se(e), t(r), localStorage.setItem(n, JSON.stringify(r)), T();
	}
	function Me(e, t) {
		let n = ui(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Oe(n, e.id);
		if (r) {
			c(r, "error");
			return;
		}
		j("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Pe(e) {
		e.path !== "/" && (j("pages", () => {
			K(x).pages = K(x).pages.filter((t) => t.id !== e.id), K(x).nav.items = K(x).nav.items.filter((t) => t.page !== e.id);
		}), e.id === K(r) && Ce(K(x).pages[0].id), c("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function N(e) {
		j("edit:nav-logo", () => {
			K(x).nav.logo = {
				type: "text",
				value: "",
				...K(x).nav.logo,
				...e
			};
		});
	}
	function Fe(e, t) {
		j(`edit:nav-label-${e}`, () => {
			K(x).nav.items[e].label = t;
		});
	}
	function Re(e, t) {
		j("nav", () => {
			let n = K(x).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function ze(e, t) {
		j(`edit:nav-href-${e}`, () => {
			K(x).nav.items[e].href = t;
		});
	}
	function Be(e, t) {
		let n = e + t, r = K(x).nav.items;
		n < 0 || n >= r.length || j("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Ve(e) {
		j("nav", () => {
			K(x).nav.items.splice(e, 1);
		});
	}
	function He() {
		j("nav", () => {
			K(x).nav.items.push({
				label: "Lenke",
				page: K(x).pages[0].id
			});
		});
	}
	let Ue = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function We(e, t) {
		j(`edit:theme-color-${e}`, () => {
			K(x).theme.tokens.color[e] = t;
		});
	}
	function Ge(e, t) {
		j("theme", () => {
			K(x).theme.tokens.font[e] = t;
		});
	}
	function P(e, t) {
		j("theme", () => {
			K(x).theme.tokens.radius[e] = t;
		});
	}
	function Ke() {
		L(f, !K(f)), b?.sendChrome(K(f));
	}
	function qe(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E(`edit:${e.blockId}`), t.props = e.props, v.save(), T(), L(a, ""));
	}
	function Je(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		E(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && _(t, "desktop-endret-etter-mobil"), v.save(), T();
	}
	function Ye(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			E("mobile-manual");
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
			}, v.save(), T();
		}
	}
	function Xe(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			E("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, v.save(), T(), g(), b?.sendSection(K(r), t);
		}
	}
	function Ze(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (E("review-done"), t.responsive.mobile.attention = null, v.save(), T(), g());
	}
	function Qe(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E("decor"), t.decor = e.decor, v.save(), T());
	}
	function $e(e) {
		E("add-section"), v.data.sections.splice(e.index, 0, e.section), v.save(), T(), b?.sendPage(K(r), v.data);
	}
	function et(e) {
		let t = v.data.sections, n = t.findIndex((t) => t.id === e.sectionId), i = n + e.dir;
		n < 0 || i < 0 || i >= t.length || (E("move-section"), [t[n], t[i]] = [t[i], t[n]], v.save(), T(), b?.sendPage(K(r), v.data));
	}
	function tt(e) {
		E("delete-section"), e.sectionId === K(me) && (L(me, null), L(he, null)), v.data.sections = v.data.sections.filter((t) => t.id !== e.sectionId), v.save(), T(), b?.sendPage(K(r), v.data);
	}
	function nt(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t && (E("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, v.save(), T());
	}
	function rt(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t && (E("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), _(t, "blokk-slettet"), v.save(), T(), b?.sendSection(K(r), t));
	}
	let it = {
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
				href: "#",
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
	function at(e) {
		let t = it[e];
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
	function ot(e) {
		b ? b.sendPlaceBlock(e) : st(_e()?.id, e);
	}
	function st(e, t) {
		let n = v.data.sections.find((t) => t.id === e) ?? v.data.sections[0];
		n && (E("add-block"), n.blocks.push(t), _(n, "blokk-lagt-til"), v.save(), T(), b?.sendSection(K(r), n));
	}
	function ct(e) {
		ot(at(e));
	}
	async function lt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		c("Komprimerer bildet…");
		let n;
		try {
			n = await li(t);
		} catch {
			c("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (K(l)?.clientWidth ?? 1280));
		ot({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ui(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? c(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : c("");
	}
	function dt(e) {
		let t = [];
		for (let n of e.sections) for (let e of n.blocks) {
			if (e.type !== "image" || !e.props.src?.startsWith("data:image/")) continue;
			let n = e.props.src.split(",", 2)[1], r = `media/${ui(e.props.alt || "bilde")}-${di(n)}.webp`;
			t.push({
				path: r,
				content: n,
				encoding: "base64"
			}), e.props.src = `/${r}`;
		}
		return t;
	}
	function ft() {
		E("discard");
		let e = v.reset();
		y.reset(), S(), L(d, {
			snap: !0,
			...K(x).grid
		}, !0), T(), L(a, ""), C(), K(x).pages.some((e) => e.id === K(r)) ? b?.sendPage(K(r), e) : Ce(K(x).pages[0].id);
	}
	async function pt() {
		c("Publiserer…");
		let e = [], t = [], i = [], a = [];
		for (let o of K(x).pages) {
			let s = `urd-draft-${o.id}`, c = w.has(o.id) || !K(n).pages.some((e) => e.id === o.id), l = null;
			if (o.id === K(r) && (v.hasDraft() || c)) l = v.data;
			else if (o.id !== K(r)) {
				let e = localStorage.getItem(s);
				if (e) try {
					l = ai(JSON.parse(e), y.data);
				} catch {}
			}
			!l && c && (l = Se(o)), l && (e.push(...dt(l)), e.push({
				path: o.file,
				content: JSON.stringify(l, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), c ? a.push(o.id) : i.push(s));
		}
		v.hasDraft() && v.save(), y.hasDraft() && (e.push({
			path: "content/site.json",
			content: JSON.stringify(K(x), null, 2) + "\n",
			encoding: "utf-8"
		}), i.push("urd-draft-site"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of K(x).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of K(n).pages) {
			let n = K(x).pages.find((e) => e.id === t.id);
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
		let o = {
			message: `Oppdater ${t.join(", ") || "innstillinger"} via Urd-admin`,
			files: e
		}, s = null;
		try {
			s = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(o)
			});
		} catch {}
		if (s?.ok) {
			for (let e of i) localStorage.removeItem(e);
			for (let e of a) w.add(e);
			L(n, JSON.parse(JSON.stringify(K(x))), !0), y = Qr("urd-draft-site", () => K(n)), S(), L(d, {
				snap: !0,
				...K(x).grid
			}, !0);
			let e = JSON.parse(JSON.stringify(v.data));
			v = Qr(`urd-draft-${K(r)}`, () => e), w.has(K(r)) && localStorage.setItem(`urd-draft-${K(r)}`, JSON.stringify(e)), T(), c("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (s?.status === 401) {
			let e = (await s.json().catch(() => null))?.error;
			c(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await be();
		} else s?.status === 403 ? c((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	le();
	var mt = Ki();
	lr("keydown", Yt, ce);
	var ht = R(mt), gt = (e) => {
		var t = fi();
		q("click", t, Ke), Y(e, t);
	};
	Z(ht, (e) => {
		K(f) || e(gt);
	});
	var _t = z(ht, 2);
	let F;
	var vt = R(_t), yt = z(R(vt), 2), bt = (e) => {
		var t = mi(), n = rn(t);
		Er(n, 21, () => K(x).pages, (e) => e.id, (e, t) => {
			var n = pi(), r = R(n, !0);
			M(n);
			var i = {};
			B(() => {
				X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
			}), Y(e, n);
		}), M(n);
		var i;
		Ir(n);
		var a = z(n, 2), o = R(a);
		let s;
		var c = z(o, 2);
		let l;
		M(a), B(() => {
			i !== (i = K(r)) && (n.value = (n.__value = K(r)) ?? "", Fr(n, K(r))), s = Pr(o, 1, "ghost svelte-1n46o8q", null, s, { active: K(p) === "desktop" }), l = Pr(c, 1, "ghost svelte-1n46o8q", null, l, { active: K(p) === "mobile" });
		}), q("change", n, (e) => Ce(e.target.value)), q("click", o, () => L(p, "desktop")), q("click", c, () => L(p, "mobile")), Y(e, t);
	};
	Z(yt, (e) => {
		K(n) && e(bt);
	});
	var xt = z(yt, 2), St = (e) => {
		var t = hi(), n = R(t);
		M(t), B(() => X(n, `📱 ${K(h) ?? ""} ${K(h) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), q("click", t, () => L(p, "mobile")), Y(e, t);
	};
	Z(xt, (e) => {
		K(h) > 0 && e(St);
	});
	var Ct = z(xt, 2), wt = (e) => {
		Y(e, gi());
	};
	Z(Ct, (e) => {
		K(i) && e(wt);
	}), M(vt);
	var Tt = z(vt, 2), Et = R(Tt), Dt = (e) => {
		var t = yi(), n = rn(t), r = R(n, !0);
		M(n);
		var a = z(n, 2), o = (e) => {
			var t = _i(), n = R(t);
			M(t), B(() => {
				Ur(t, "title", K(u).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), X(n, `${K(u).allowed ? "" : "⚠ "}${K(u).login ?? ""}`);
			}), Y(e, t);
		}, s = (e) => {
			Y(e, vi());
		};
		Z(a, (e) => {
			K(u)?.loggedIn ? e(o) : K(u) && e(s, 1);
		});
		var c = z(a, 2), l = z(c, 2), d = z(l, 2);
		B((e) => {
			Ur(n, "title", K(f) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), X(r, K(f) ? "👁 Ren visning" : "✏ Rediger"), Ur(c, "href", e), l.disabled = !K(i), d.disabled = !K(i);
		}, [() => ee().path]), q("click", n, Ke), q("click", l, ft), q("click", d, pt), Y(e, t);
	};
	Z(Et, (e) => {
		K(n) && e(Dt);
	}), M(Tt), M(_t);
	var Ot = z(_t, 2), kt = (e) => {
		var t = Ui(), n = R(t), i = (e) => {
			var t = Hi(), n = rn(t);
			Er(n, 21, () => ue, Sr, (e, t) => {
				var n = bi();
				let r;
				var i = R(n, !0);
				M(n), B(() => {
					r = Pr(n, 1, "svelte-1n46o8q", null, r, { active: K(D) === K(t) }), X(i, K(t));
				}), q("click", n, () => de(K(t))), Y(e, n);
			}), M(n);
			var i = z(n, 2), a = (e) => {
				var t = Vi(), n = R(t), i = R(n, !0);
				M(n);
				var a = z(n, 2), o = (e) => {
					var t = Ti(), n = z(R(t), 2);
					Er(n, 17, () => K(x).pages, (e) => e.id, (e, t) => {
						var n = wi();
						let i;
						var a = R(n);
						Q(a);
						var o = z(a, 2), s = (e) => {
							Y(e, xi());
						}, c = (e) => {
							var n = Si();
							Q(n), B((e) => $(n, e), [() => K(t).path.slice(1)]), q("change", n, (e) => Me(K(t), e.target.value)), Y(e, n);
						};
						Z(o, (e) => {
							K(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = z(o, 2), u = R(l), d = z(u, 2), f = (e) => {
							var n = Ci();
							q("click", n, () => Pe(K(t))), Y(e, n);
						};
						Z(d, (e) => {
							K(t).path !== "/" && e(f);
						}), M(l), M(n), B(() => {
							i = Pr(n, 1, "page-row svelte-1n46o8q", null, i, { current: K(t).id === K(r) }), $(a, K(t).title), u.disabled = K(t).id === K(r);
						}), q("change", a, (e) => Ae(K(t), e.target.value)), q("click", u, () => Ce(K(t).id)), Y(e, n);
					});
					var i = z(n, 4);
					Q(i);
					var a = z(i, 2);
					Ee(2), M(t), B((e) => a.disabled = e, [() => !K(Te).trim()]), q("keydown", i, (e) => e.key === "Enter" && ke()), qr(i, () => K(Te), (e) => L(Te, e)), q("click", a, ke), Y(e, t);
				}, s = (e) => {
					var t = Oi(), n = z(R(t), 2), r = z(R(n)), i = R(r);
					i.value = i.__value = "text";
					var a = z(i);
					a.value = a.__value = "image", M(r);
					var o;
					Ir(r), M(n);
					var s = z(n, 2);
					Q(s);
					var c = z(s, 4);
					Er(c, 17, () => K(x).nav.items, Sr, (e, t, n) => {
						var r = Di(), i = R(r), a = R(i);
						Q(a);
						var o = z(a, 2), s = R(o);
						s.disabled = n === 0;
						var c = z(s, 2), l = z(c, 2);
						M(o), M(i);
						var u = z(i, 2), d = R(u);
						Er(d, 17, () => K(x).pages, (e) => e.id, (e, t) => {
							var n = pi(), r = R(n, !0);
							M(n);
							var i = {};
							B(() => {
								X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
							}), Y(e, n);
						});
						var f = z(d);
						f.value = f.__value = "__href", M(u);
						var p;
						Ir(u);
						var m = z(u, 2), h = (e) => {
							var r = Ei();
							Q(r), B(() => $(r, K(t).href ?? "")), q("change", r, (e) => ze(n, e.target.value)), Y(e, r);
						};
						Z(m, (e) => {
							K(t).page || e(h);
						}), M(r), B(() => {
							$(a, K(t).label), c.disabled = n === K(x).nav.items.length - 1, p !== (p = K(t).page ?? "__href") && (u.value = (u.__value = K(t).page ?? "__href") ?? "", Fr(u, K(t).page ?? "__href"));
						}), q("input", a, (e) => Fe(n, e.target.value)), q("click", s, () => Be(n, -1)), q("click", c, () => Be(n, 1)), q("click", l, () => Ve(n)), q("change", u, (e) => Re(n, e.target.value)), Y(e, r);
					});
					var l = z(c, 2);
					M(t), B(() => {
						o !== (o = K(x).nav.logo?.type ?? "text") && (r.value = (r.__value = K(x).nav.logo?.type ?? "text") ?? "", Fr(r, K(x).nav.logo?.type ?? "text")), $(s, K(x).nav.logo?.value ?? ""), Ur(s, "placeholder", K(x).nav.logo?.type === "image" ? "/media/logo.webp" : "Navnet i menyen");
					}), q("change", r, (e) => N({ type: e.target.value })), q("input", s, (e) => N({ value: e.target.value })), q("click", l, He), Y(e, t);
				}, c = (e) => {
					var t = Ai(), n = z(R(t), 2), r = z(R(n));
					Q(r), M(n);
					var i = z(n, 2), a = z(R(i));
					Q(a), M(i);
					var o = z(i, 2), s = z(R(o));
					Q(s), M(o);
					var c = z(o, 2), l = z(R(c));
					Q(l), M(c);
					var u = z(c, 4), d = z(R(u)), f = R(d), p = (e) => {
						var t = ki(), n = {};
						B(() => {
							n !== (n = K(x).theme.tokens.font.heading) && (t.value = (t.__value = K(x).theme.tokens.font.heading) ?? "");
						}), Y(e, t);
					}, h = /* @__PURE__ */ ut(() => !Ue.some(([, e]) => e === K(x).theme.tokens.font.heading));
					Z(f, (e) => {
						K(h) && e(p);
					}), Er(z(f), 17, () => Ue, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ ut(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = pi(), o = R(a, !0);
						M(a);
						var s = {};
						B(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), M(d);
					var g;
					Ir(d), M(u);
					var _ = z(u, 2), v = z(R(_)), y = R(v), b = (e) => {
						var t = ki(), n = {};
						B(() => {
							n !== (n = K(x).theme.tokens.font.body) && (t.value = (t.__value = K(x).theme.tokens.font.body) ?? "");
						}), Y(e, t);
					}, S = /* @__PURE__ */ ut(() => !Ue.some(([, e]) => e === K(x).theme.tokens.font.body));
					Z(y, (e) => {
						K(S) && e(b);
					}), Er(z(y), 17, () => Ue, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ ut(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = pi(), o = R(a, !0);
						M(a);
						var s = {};
						B(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), M(v);
					var C;
					Ir(v), M(_);
					var w = z(_, 4), ee = z(R(w));
					Q(ee), M(w);
					var T = z(w, 2), te = z(R(T));
					Q(te), M(T), M(t), B(() => {
						$(r, K(x).theme.tokens.color.bg), $(a, K(x).theme.tokens.color.surface), $(s, K(x).theme.tokens.color.text), $(l, K(x).theme.tokens.color.accent), g !== (g = K(x).theme.tokens.font.heading) && (d.value = (d.__value = K(x).theme.tokens.font.heading) ?? "", Fr(d, K(x).theme.tokens.font.heading)), C !== (C = K(x).theme.tokens.font.body) && (v.value = (v.__value = K(x).theme.tokens.font.body) ?? "", Fr(v, K(x).theme.tokens.font.body)), $(ee, K(x).theme.tokens.radius.sm), $(te, K(x).theme.tokens.radius.md);
					}), q("input", r, (e) => We("bg", e.target.value)), q("input", a, (e) => We("surface", e.target.value)), q("input", s, (e) => We("text", e.target.value)), q("input", l, (e) => We("accent", e.target.value)), q("change", d, (e) => Ge("heading", e.target.value)), q("change", v, (e) => Ge("body", e.target.value)), q("change", ee, (e) => P("sm", e.target.value)), q("change", te, (e) => P("md", e.target.value)), Y(e, t);
				}, l = (e) => {
					var t = ji();
					let n;
					var r = z(R(t), 2), i = z(R(r), 2), a = R(i), o = z(a, 2);
					M(i), M(r);
					var s = z(r, 2), c = z(s, 2), l = z(R(c));
					M(c);
					var u = z(c, 2), d = z(R(u), 2), f = R(d), m = z(f, 2), h = z(m, 2), g = z(h, 2), _ = z(g, 2);
					M(d), M(u), M(t), B(() => {
						n = Pr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: K(p) === "mobile" }), Ur(t, "title", K(p) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), q("click", a, () => ct("text")), q("click", o, () => ct("text-box")), q("click", s, () => ct("button")), q("change", l, lt), q("click", f, () => ct("shape-line")), q("click", m, () => ct("shape-arrow")), q("click", h, () => ct("shape-circle")), q("click", g, () => ct("shape-rect")), q("click", _, () => ct("shape-triangle")), Y(e, t);
				}, u = (e) => {
					var t = Fi(), n = z(R(t), 2), r = z(R(n)), i = R(r);
					M(r), M(n);
					var a = z(n, 2);
					Q(a);
					var o = z(a, 2), s = R(o);
					Q(s), Ee(), M(o);
					var c = z(o, 2), l = (e) => {
						var t = Ni(), n = z(rn(t), 2), r = R(n);
						Q(r), Ee(), M(n);
						var i = z(n, 2), a = (e) => {
							var t = Mi(), n = rn(t), r = z(R(n)), i = R(r);
							M(r), M(n);
							var a = z(n, 2);
							Q(a), B(() => {
								X(i, `${K(he).size ?? ""} px`), $(a, K(he).size);
							}), q("input", a, (e) => O("size", Number(e.target.value))), Y(e, t);
						};
						Z(i, (e) => {
							K(he) && e(a);
						}), B(() => Hr(r, K(he) !== null)), q("change", r, (e) => ve(e.target.checked)), Y(e, t);
					}, u = (e) => {
						Y(e, Pi());
					};
					Z(c, (e) => {
						K(me) ? e(l) : e(u, -1);
					}), M(t), B(() => {
						X(i, `${K(d).size ?? ""} px`), $(a, K(d).size), Hr(s, K(d).snap !== !1);
					}), q("input", a, (e) => ye("size", Number(e.target.value))), q("change", s, (e) => ye("snap", e.target.checked)), Y(e, t);
				}, f = (e) => {
					var t = zi(), n = R(t), r = (e) => {
						var t = Ii(), n = rn(t), r = R(n);
						M(n), Ee(2), B(() => X(r, `Valgt: ${K(fe).type ?? ""}-blokk`)), Y(e, t);
					}, i = (e) => {
						var t = Li();
						Ee(2), Y(e, t);
					}, a = (e) => {
						Y(e, Ri());
					};
					Z(n, (e) => {
						K(fe) ? e(r) : K(me) ? e(i, 1) : e(a, -1);
					}), M(t), Y(e, t);
				}, h = (e) => {
					var t = Bi(), n = R(t), r = R(n);
					M(n), M(t), B(() => X(r, `${K(D) ?? ""}-panelet kommer i en senere del av v0.5.`)), Y(e, t);
				};
				Z(a, (e) => {
					K(D) === "Sider" ? e(o) : K(D) === "Nav" ? e(s, 1) : K(D) === "Tema" ? e(c, 2) : K(D) === "Blokker" ? e(l, 3) : K(D) === "Grid" ? e(u, 4) : K(D) === "Egenskaper" ? e(f, 5) : e(h, -1);
				}), M(t), B(() => X(i, K(D))), Y(e, t);
			};
			Z(i, (e) => {
				K(D) && e(a);
			}), Y(e, t);
		};
		Z(n, (e) => {
			K(f) && e(i);
		});
		var a = z(n, 2);
		let o;
		var s = R(a);
		Zr(s, (e) => L(l, e), () => K(l)), M(a), M(t), B(() => {
			o = Pr(a, 1, "frame-wrap svelte-1n46o8q", null, o, { mobile: K(p) === "mobile" }), Ur(s, "src", `/?page=${K(r)}&preview=1`);
		}), lr("load", s, k), sr(s), Y(e, t);
	}, At = (e) => {
		Y(e, Wi());
	};
	Z(Ot, (e) => {
		K(n) ? e(kt) : e(At, -1);
	});
	var jt = z(Ot, 2), Mt = (e) => {
		var t = Gi();
		let n;
		var r = R(t), i = R(r, !0);
		M(r);
		var s = z(r, 2);
		M(t), B(() => {
			n = Pr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: K(o) === "ok",
				error: K(o) === "error"
			}), X(i, K(a));
		}), q("click", s, () => c("")), Y(e, t);
	};
	Z(jt, (e) => {
		K(a) && e(Mt);
	}), M(mt), B(() => F = Pr(_t, 1, "topbar svelte-1n46o8q", null, F, { hidden: !K(f) })), Y(e, mt), Le();
}
ur([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Ji = _r(qi, { target: document.getElementById("urd-admin") });
//#endregion
export { Ji as default };
