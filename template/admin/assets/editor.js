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
function E() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function me() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function D() {
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
function A(e) {
	k = e;
}
var j;
function we(e) {
	if (e === null) throw xe(), ve;
	return j = e;
}
function Te() {
	return we(/* @__PURE__ */ nn(j));
}
function M(e) {
	if (k) {
		if (/* @__PURE__ */ nn(j) !== null) throw xe(), ve;
		j = e;
	}
}
function Ee(e = 1) {
	if (k) {
		for (var t = e, n = j; t--;) n = /* @__PURE__ */ nn(n);
		j = n;
	}
}
function De(e = !0) {
	for (var t = 0, n = j;;) {
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
var Fe = null;
function N(e) {
	Fe = e;
}
function Ie(e, t = !1, n) {
	Fe = {
		p: Fe,
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
	var t = Fe, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) fn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Fe = t.p, e ?? {};
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
	if (t === null) return H.f |= ie, e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, qe(t.deps));
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
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
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
	let i = e[ue];
	i ? e[ue] = () => {
		i(), r(!0);
	} : e[ue] = () => r(!0), Xe();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function $e(e) {
	let t = 0, n = Bt(0), r;
	return () => {
		un() && (W(n), gn(() => (t === 0 && (r = rr(() => e(() => Wt(n)))), t += 1, () => {
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
	#t = k ? j : null;
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
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = _n(() => {
			if (k) {
				let e = this.#t;
				Te();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, et), k && (this.#e = j);
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
		e && (this.is_pending = !0, this.#o = vn(() => e(this.#e)), Ve(() => {
			var e = this.#c = document.createDocumentFragment(), t = en();
			e.append(t), this.#a = this.#x(() => vn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Tn(this.#o, () => {
				this.#o = null;
			}), this.#b(F));
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
		var t = U, n = H, r = Fe;
		In(this.#i), Fn(this.#i), N(this.#i.ctx);
		try {
			return Dt.ensure(), e();
		} catch (e) {
			return Ue(e), null;
		} finally {
			In(t), Fn(n), N(r);
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
		return this.#h(), W(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork ? (this.#a && F.skip_effect(this.#a), this.#o && F.skip_effect(this.#o), this.#s && F.skip_effect(this.#s), F.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Sn(this.#a), null), this.#o &&= (Sn(this.#o), null), this.#s &&= (Sn(this.#s), null), k && (we(this.#t), Ee(), we(De()));
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
					return vn(() => {
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
	var e = U, t = H, n = Fe, r = F;
	return function(i = !0) {
		In(e), Fn(t), N(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function at(e = !0) {
	In(null), Fn(null), N(null), e && F?.deactivate();
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
		ctx: Fe,
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
	r === null && E();
	var i = void 0, a = Bt(O), o = !H, s = /* @__PURE__ */ new Set();
	return hn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
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
			l?.(), s.delete(n), t !== ct && (c.activate(), t ? (a.f |= ie, Ht(a, t)) : (a.f & 8388608 && (a.f ^= ie), Ht(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), dn(() => {
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
		for (var n = 0; n < t.length; n += 1) Sn(t[n]);
	}
}
function pt(e) {
	var t, n = U, r = e.parent;
	if (!Mn && r !== null && e.v !== O && r.f & 24576) return be(), e.v;
	In(r);
	try {
		e.f &= ~ne, ft(e), t = Xn(e);
	} finally {
		In(n);
	}
	return t;
}
function mt(e) {
	var t = pt(e);
	if (!e.equals(t) && (e.wv = qn(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : (F.capture(e, t, !0), vt?.capture(e, t, !0)), e.deps === null))) {
		P(e, h);
		return;
	}
	Mn || (yt === null ? Ke(e) : (un() || F?.is_fork) && yt.set(e, t));
}
function ht(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Ze(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Qn(t, 0), bn(t));
}
function gt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && $n(t);
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
		me();
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
		e.wv = qn(), Gt(e, g, n), Re() && U !== null && U.f & 1024 && !(U.f & 96) && (Vn === null ? Hn([e]) : Vn.push(e)), !r.is_fork && Lt.size > 0 && !zt && Ut();
	}
	return t;
}
function Ut() {
	zt = !1;
	for (let e of Lt) {
		e.f & 1024 && P(e, _);
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
	if (r !== null) for (var i = Re(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && P(s, t), c & 131072) Lt.add(s);
			else if (c & 2) {
				var u = s;
				yt?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= ne), Gt(u, _, n));
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
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && D();
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
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(Kt(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = W(o);
				return c === O ? void 0 : c;
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
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? Kt(e[t]) : O, u)), r.set(t, n)), W(n) === O) ? !1 : i;
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
			W(o);
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
	var n = /* @__PURE__ */ tn(j);
	if (n === null) n = j.appendChild(en());
	else if (t && n.nodeType !== 3) {
		var r = en();
		return n?.before(r), we(r), r;
	}
	return t && sn(n), we(n), n;
}
function z(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ tn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ nn(n) : n;
	}
	if (t) {
		if (j?.nodeType !== 3) {
			var r = en();
			return j?.before(r), we(r), r;
		}
		sn(j);
	}
	return j;
}
function B(e, t = 1, n = !1) {
	let r = k ? j : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ nn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = en();
			return r === null ? i?.after(a) : r.before(a), we(a), a;
		}
		sn(r);
	}
	return we(r), r;
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
		ctx: Fe,
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
	return P(t, h), t.teardown = e, t;
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
	rt(r, t, n, (t) => {
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
		e !== null && Ze(() => {
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
			if (Jn(a) && mt(a), a.wv > e.wv) return !0;
		}
		t & 512 && yt === null && P(e, h);
	}
	return !1;
}
function Yn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Ln !== null && Ln.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Yn(a, t, !1) : t === a && (n ? P(a, g) : a.f & 1024 && P(a, _), Pt(a));
	}
}
function Xn(e) {
	var t = zn, n = Bn, r = Vn, i = H, a = Ln, o = Fe, s = Pn, c = Gn, l = e.f;
	zn = null, Bn = 0, Vn = null, H = l & 96 ? null : e, Ln = null, N(e.ctx), Pn = !1, Gn = ++Wn, e.ac !== null && (Ze(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (zn !== null) {
			var m;
			if (p || Qn(e, Bn), f !== null && Bn > 0) for (f.length = Bn + zn.length, m = 0; m < zn.length; m++) f[Bn + m] = zn[m];
			else e.deps = f = zn;
			if (un() && e.f & 512) for (m = Bn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Bn < f.length && (Qn(e, Bn), f.length = Bn);
		if (Re() && Vn !== null && !Pn && f !== null && !(e.f & 6146)) for (m = 0; m < Vn.length; m++) Yn(Vn[m], e);
		if (i !== null && i !== e) {
			if (Wn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Wn;
			if (t !== null) for (let e of t) e.rv = Wn;
			Vn !== null && (r === null ? r = Vn : r.push(...Vn));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return Ue(e);
	} finally {
		e.f ^= re, zn = t, Bn = n, Vn = r, H = i, Ln = a, N(o), Pn = s, Gn = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== O && Ke(s), s.ac !== null && Ze(() => {
			s.ac.abort(de), s.ac = null;
		}), ht(s), Qn(s, 0);
	}
}
function Qn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Zn(e, n[r]);
}
function $n(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, h);
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
			return (!(a.f & 1024) && a.reactions !== null || nr(a)) && (o = pt(a)), Rt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Pn && H !== null && (jn || (H.f & 512) != 0), c = (a.f & b) === 0;
		Jn(a) && (s && (a.f |= 512), mt(a)), s && !c && (gt(a), tr(a));
	}
	if (yt?.has(e)) return yt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function tr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (gt(t), tr(t));
}
function nr(e) {
	if (e.v === O) return !0;
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
		if (r.capture || mr.call(t, e), !e.cancelBubble) return Ze(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ve(() => {
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
		if (k) return vr(j, null), j;
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
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = j), Te();
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
		tt(s, { pending: () => {} }, (t) => {
			Ie({});
			var n = Fe;
			if (o && (n.c = o), a && (i.$$events = a), k && vr(t, null), l = e(t, i) || {}, k && (U.nodes.end = j, j === null || j.nodeType !== 8 || j.data !== "]")) throw xe(), ve;
			Le();
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
		var n = F, r = an();
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
		} else k && (this.anchor = j), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	k && (r = j, Te());
	var i = new Cr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Oe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = De();
				we(a), i.anchor = a, A(!1), i.ensure(e, t), A(!0);
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
		c = k ? we(/* @__PURE__ */ tn(u)) : u.appendChild(en());
	}
	k && Te();
	var d = null, f = /* @__PURE__ */ dt(() => {
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
			k && Oe(c) === "[!" != (e === 0) && (c = De(), we(c), A(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = an(), y = 0; y < e; y += 1) {
				k && j.nodeType === 8 && j.data === "]" && (c = j, t = !0, A(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Ht(S.v, b), S.i && Ht(S.i, y), v && u.unskip_effect(S.e)) : (S = jr(l, h ? c : Dr ??= en(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = vn(() => s(c)) : (d = vn(() => s(Dr ??= en())), d.f |= te)), e > r.size && pe("", "", ""), k && e > 0 && we(De()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && A(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = j);
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
	o && Ve(() => {
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
	Qe(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Rr);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Rr(o);
		}
		n(a), e.__value = a, F !== null && r.add(F);
	}), mn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = F;
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
		e[ue] = n, Ve(n), Xe();
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
		[Br]: e.namespaceURI === ye
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
	Qe(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Yr(e) ? Xr(a) : a, n(a), F !== null && r.add(F), await er(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || rr(t) == null && e.value) && (n(Yr(e) ? Xr(e.value) : e.value), F !== null && r.add(F)), gn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = F;
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
	var i = Fe.r, a = U;
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
var Si = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), Ci = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\"> </option>"), wi = /* @__PURE__ */ K("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), Ti = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), Ei = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), Di = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"> </span>"), Oi = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), ki = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Ai = /* @__PURE__ */ K("<button> </button>"), ji = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Mi = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ni = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), Pi = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Fi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Ii = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Li = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span></span> <select title=\"Hvor lenken går\" class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Ri = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde (URL)</option></select></label> <input class=\"svelte-1n46o8q\"/> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), zi = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Bi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), Vi = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Hi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ui = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Wi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <p class=\"panel-hint svelte-1n46o8q\">Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Gi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Ki = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label>", 1), qi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ji = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Yi = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> 📵 Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Xi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Zi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Qi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fra <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Til <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), $i = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ea = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ta = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), na = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ra = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\">×</button></span></span> <!></div>"), ia = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), aa = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), oa = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), sa = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), ca = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), la = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), ua = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), da = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), fa = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), pa = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!></div>");
function ma(e, t) {
	Ie(t, !0);
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
		S?.sendSite(Ne(W(C)));
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
		}, !0), w(), v(), te(), W(C).pages.some((e) => e.id === W(a)) ? S?.sendPage(W(a), b.data) : et(W(C).pages[0].id);
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
		}, !0), await et(new URLSearchParams(location.search).get("page") ?? W(C).pages[0].id), await Ze();
	}
	let E = /* @__PURE__ */ I(null), pe = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Grid",
		"Historikk"
	];
	function me(e) {
		L(E, W(E) === e ? null : e, !0), S?.sendShowGrid(W(E) === "Grid");
	}
	let D = /* @__PURE__ */ I(null);
	function he(e, t) {
		let n = b?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function ge() {
		if (!W(D)) return;
		let { block: e } = he(W(D).sectionId, W(D).blockId);
		if (!e) {
			L(D, null);
			return;
		}
		L(D, {
			sectionId: W(D).sectionId,
			blockId: W(D).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function _e(e) {
		if (!e.blockId) {
			L(D, null);
			return;
		}
		L(D, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), ge();
	}
	function ve(e, t) {
		let { section: n, block: r } = he(W(D)?.sectionId, W(D)?.blockId);
		r && (T(e), t(r, n), y(n, "blokk-endret"), b.save(), w(), S?.sendSection(W(a), n), ge());
	}
	function O(e, t) {
		ve(`edit:${W(D).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function ye(e, t) {
		Number.isFinite(t) && ve(`edit:frame-${W(D).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function be(e) {
		ve("decor", (t) => {
			t.decor = e;
		});
	}
	async function xe(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await yi(t);
			ve(`edit:${W(D).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || bi(t.name).replaceAll("-", " ");
			});
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Se = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form"
	}, Ce = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], k = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], A = /* @__PURE__ */ I(null), j = /* @__PURE__ */ I(null), we = /* @__PURE__ */ I(""), Te = /* @__PURE__ */ I(Kt([])), De = /* @__PURE__ */ I(null);
	function Oe(e) {
		L(j, e?.grid ? { ...e.grid } : null, !0), L(we, e?.size?.minHeight ?? "", !0), L(Te, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(De, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function ke(e) {
		L(A, e.sectionId, !0), Oe(b?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Ae(e, t) {
		let n = b.data.sections.find((e) => e.id === W(A));
		n && (T(e), t(n), b.save(), w(), S?.sendSection(W(a), n), Oe(n));
	}
	let je = /* @__PURE__ */ I("color");
	function Me(e) {
		Ae("bg", (t) => {
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
	function Pe(e) {
		Ae("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Fe(e, t) {
		let n = e + t;
		Ae("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function N(e, t, n) {
		Ae(`edit:bg-${W(A)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Re(e, t, n) {
		Ae(`edit:bg-${W(A)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function ze(e, t) {
		Ae("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function Be(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			N(e, "src", (await yi(n)).dataUrl);
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Ve(e) {
		return typeof e == "string" ? e.startsWith("#") ? e : W(C)?.theme.tokens.color[e] ?? "#000000" : "#000000";
	}
	function He(e) {
		return {
			type: e,
			version: hi[e].version,
			props: hi[e].defaults()
		};
	}
	function Ue(e) {
		ve(`edit:anim-${W(D).blockId}`, (t) => {
			t.animation = e ? He(e) : null;
		}), W(D) && S?.sendDemoAnim(W(D).sectionId, W(D).blockId);
	}
	function We(e, t) {
		Number.isFinite(t) && (ve(`edit:anim-${W(D).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(D) && S?.sendDemoAnim(W(D).sectionId, W(D).blockId));
	}
	function Ge(e) {
		Ae("section-anim", (t) => {
			t.animation = e ? He(e) : null;
		}), S?.sendDemoAnim(W(A));
	}
	function P(e, t) {
		Number.isFinite(t) && (Ae("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), S?.sendDemoAnim(W(A)));
	}
	function Ke(e) {
		let t = b.data.sections.find((e) => e.id === W(A));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		T("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(we, r, !0), b.save(), w(), S?.sendSection(W(a), t);
	}
	function qe() {
		return b.data.sections.find((e) => e.id === W(A)) ?? b.data.sections[0];
	}
	function Je(e) {
		let t = b.data.sections.find((e) => e.id === W(A));
		t && (T("grid"), t.grid = e ? { ...x.data.grid } : null, L(j, t.grid ? { ...t.grid } : null, !0), b.save(), w(), S?.sendSection(W(a), t), W(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function Ye(e, t) {
		let n = b.data.sections.find((e) => e.id === W(A));
		n?.grid && (T("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, L(j, { ...n.grid }, !0), b.save(), w(), S?.sendSection(W(a), n), W(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function Xe(e, t) {
		T("grid"), L(p, {
			...W(p),
			[e]: t
		}, !0), x.data.grid = {
			...x.data.grid,
			[e]: t
		}, x.save(), w(), te(), W(E) === "Grid" && S?.sendShowGrid(!0);
	}
	async function Ze() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(f, await e.json(), !0) : e.status !== 503 && L(f, null);
		} catch {
			L(f, null);
		}
	}
	let Qe = null;
	function $e(e) {
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
	async function et(e) {
		L(a, e, !0), Qe = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = oi(await e.json(), x.data));
			} catch {}
			n ? ne.delete(e) : n = $e(t), b = $r(`urd-draft-${e}`, () => n), b.replace(oi(b.data, x.data)), b.save(), ie.length = 0, ae.length = 0, oe = null, L(A, null), L(j, null), w(), v(), L(s, "");
		})(), await Qe;
	}
	function tt() {
		S?.destroy(), S = ei(W(d), {
			onEdit: Tt,
			onMove: Et,
			onDelete: Ft,
			onAddSection: jt,
			onMoveSection: Mt,
			onDeleteSection: Nt,
			onSectionSize: Pt,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: ke,
			onSelectBlock: _e,
			onReady: nt,
			onNavigate: rt,
			onAddBlock: (e) => zt(e.sectionId, e.block),
			onMobileManual: Dt,
			onMobileAuto: Ot,
			onReviewDone: kt,
			onBlockFlag: At
		});
	}
	async function nt() {
		await Qe, x.hasDraft() && te();
		let e = !W(i).pages.some((e) => e.id === W(a));
		(b.hasDraft() || e) && S?.sendPage(W(a), b.data), W(h) || S?.sendChrome(!1), W(E) === "Grid" && S?.sendShowGrid(!0);
	}
	function rt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(C).pages.find((e) => e.path === t);
		n && n.id !== W(a) && et(n.id);
	}
	function it(e, t) {
		T(e), t(), x.save(), w(), te();
	}
	let at = /* @__PURE__ */ I(""), ot = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function st(e, t = null) {
		return e ? ot.includes(e) ? `«${e}» er et reservert navn` : W(C).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function ct() {
		let e = W(at).trim(), t = bi(e), n = st(t);
		if (n) {
			u(n, "error");
			return;
		}
		it("pages", () => {
			W(C).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(C).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify($e({
			id: t,
			title: e
		}))), w(), L(at, ""), et(t);
	}
	function lt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		it("pages", () => {
			e.title = n;
			for (let t of W(C).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(a) ? (b.data.meta.title = n, b.save(), w()) : dt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function dt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = oi(await t.json(), x.data));
		} catch {}
		r ||= $e(e), t(r), localStorage.setItem(n, JSON.stringify(r)), w();
	}
	function ft(e, t) {
		let n = bi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = st(n, e.id);
		if (r) {
			u(r, "error");
			return;
		}
		it("pages", () => {
			e.path = `/${n}`;
		});
	}
	function pt(e) {
		e.path !== "/" && (it("pages", () => {
			W(C).pages = W(C).pages.filter((t) => t.id !== e.id), W(C).nav.items = W(C).nav.items.filter((t) => t.page !== e.id);
		}), e.id === W(a) && et(W(C).pages[0].id), u("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function mt(e) {
		it("edit:nav-logo", () => {
			W(C).nav.logo = {
				type: "text",
				value: "",
				...W(C).nav.logo,
				...e
			};
		});
	}
	function ht(e, t) {
		it(`edit:nav-label-${e}`, () => {
			W(C).nav.items[e].label = t;
		});
	}
	function gt(e, t) {
		it("nav", () => {
			let n = W(C).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function _t(e, t) {
		it(`edit:nav-href-${e}`, () => {
			W(C).nav.items[e].href = t;
		});
	}
	function F(e, t) {
		let n = e + t, r = W(C).nav.items;
		n < 0 || n >= r.length || it("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function vt(e) {
		it("nav", () => {
			W(C).nav.items.splice(e, 1);
		});
	}
	function yt() {
		it("nav", () => {
			W(C).nav.items.push({
				label: "Lenke",
				page: W(C).pages[0].id
			});
		});
	}
	let bt = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function xt(e, t) {
		it(`edit:theme-color-${e}`, () => {
			W(C).theme.tokens.color[e] = t;
		});
	}
	function St(e, t) {
		it("theme", () => {
			W(C).theme.tokens.font[e] = t;
		});
	}
	function Ct(e, t) {
		it("theme", () => {
			W(C).theme.tokens.radius[e] = t;
		});
	}
	function wt() {
		L(h, !W(h)), S?.sendChrome(W(h));
	}
	function Tt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T(`edit:${e.blockId}`), t.props = e.props, b.save(), w(), W(D)?.blockId === e.blockId && ge(), L(s, ""));
	}
	function Et(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		T(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && y(t, "desktop-endret-etter-mobil"), b.save(), w(), W(D)?.blockId === e.blockId && ge();
	}
	function Dt(e) {
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
	function Ot(e) {
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
	function kt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (T("review-done"), t.responsive.mobile.attention = null, b.save(), w(), v());
	}
	function At(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T("decor"), t.decor = e.decor, b.save(), w(), W(D)?.blockId === e.blockId && ge());
	}
	function jt(e) {
		T("add-section"), b.data.sections.splice(e.index, 0, e.section), b.save(), w(), S?.sendPage(W(a), b.data);
	}
	function Mt(e) {
		let t = b.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (T("move-section"), [t[n], t[r]] = [t[r], t[n]], b.save(), w(), S?.sendPage(W(a), b.data));
	}
	function Nt(e) {
		T("delete-section"), e.sectionId === W(A) && (L(A, null), L(j, null)), b.data.sections = b.data.sections.filter((t) => t.id !== e.sectionId), b.save(), w(), S?.sendPage(W(a), b.data);
	}
	function Pt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === W(A) && L(we, e.minHeight, !0), b.save(), w());
	}
	function Ft(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), W(D)?.blockId === e.blockId && L(D, null), y(t, "blokk-slettet"), b.save(), w(), S?.sendSection(W(a), t));
	}
	let It = {
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
	function Lt(e) {
		let t = It[e];
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
	function Rt(e) {
		S ? S.sendPlaceBlock(e) : zt(qe()?.id, e);
	}
	function zt(e, t) {
		let n = b.data.sections.find((t) => t.id === e) ?? b.data.sections[0];
		n && (T("add-block"), n.blocks.push(t), y(n, "blokk-lagt-til"), b.save(), w(), S?.sendSection(W(a), n));
	}
	function Bt(e) {
		Rt(Lt(e));
	}
	async function Vt(e) {
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
		Rt({
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
	function Ht(e) {
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
	function Ut() {
		T("discard");
		let e = b.reset();
		x.reset(), ee(), L(p, {
			snap: !0,
			...W(C).grid
		}, !0), w(), L(s, ""), te(), W(C).pages.some((e) => e.id === W(a)) ? S?.sendPage(W(a), e) : et(W(C).pages[0].id);
	}
	async function Wt() {
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
			!l && c && (l = $e(o)), l && (e.push(...Ht(l)), e.push({
				path: o.file,
				content: JSON.stringify(l, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), c ? r.push(o.id) : n.push(s));
		}
		b.hasDraft() && b.save(), x.hasDraft() && (e.push({
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
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			L(i, JSON.parse(JSON.stringify(W(C))), !0), x = $r("urd-draft-site", () => W(i)), ee(), L(p, {
				snap: !0,
				...W(C).grid
			}, !0);
			let e = JSON.parse(JSON.stringify(b.data));
			b = $r(`urd-draft-${W(a)}`, () => e), ne.has(W(a)) && localStorage.setItem(`urd-draft-${W(a)}`, JSON.stringify(e)), w(), u("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (s?.status === 401) {
			let e = (await s.json().catch(() => null))?.error;
			u(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await Ze();
		} else s?.status === 403 ? u((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : u(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var Gt = pa();
	dr("keydown", Yt, de);
	var qt = R(Gt), Jt = (e) => {
		var t = Si();
		G("click", t, wt), q(e, t);
	};
	Y(qt, (e) => {
		W(h) || e(Jt);
	});
	var Xt = B(qt, 2);
	let Zt;
	var Qt = R(Xt), $t = B(R(Qt), 2), en = (e) => {
		var t = wi(), n = z(t);
		Or(n, 21, () => W(C).pages, (e) => e.id, (e, t) => {
			var n = Ci(), r = R(n, !0);
			M(n);
			var i = {};
			V(() => {
				J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
			}), q(e, n);
		}), M(n);
		var r;
		Z(n);
		var i = B(n, 2), o = R(i);
		let s;
		var c = B(o, 2);
		let l;
		M(i), V(() => {
			r !== (r = W(a)) && (n.value = (n.__value = W(a)) ?? "", X(n, W(a))), s = Ir(o, 1, "ghost svelte-1n46o8q", null, s, { active: W(g) === "desktop" }), l = Ir(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(g) === "mobile" });
		}), G("change", n, (e) => et(e.target.value)), G("click", o, () => L(g, "desktop")), G("click", c, () => L(g, "mobile")), q(e, t);
	};
	Y($t, (e) => {
		W(i) && e(en);
	});
	var tn = B($t, 2), nn = (e) => {
		var t = Ti(), n = R(t);
		M(t), V(() => J(n, `📱 ${W(_) ?? ""} ${W(_) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(g, "mobile")), q(e, t);
	};
	Y(tn, (e) => {
		W(_) > 0 && e(nn);
	});
	var rn = B(tn, 2), an = (e) => {
		q(e, Ei());
	};
	Y(rn, (e) => {
		W(o) && e(an);
	}), M(Qt);
	var on = B(Qt, 2), sn = R(on), cn = (e) => {
		var t = ki(), n = z(t), r = R(n, !0);
		M(n);
		var i = B(n, 2), a = (e) => {
			var t = Di(), n = R(t);
			M(t), V(() => {
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
		}, [() => re().path]), G("click", n, wt), G("click", l, Ut), G("click", u, Wt), q(e, t);
	};
	Y(sn, (e) => {
		W(i) && e(cn);
	}), M(on), M(Xt);
	var ln = B(Xt, 2), un = (e) => {
		var t = ua(), r = R(t), i = (e) => {
			var t = la(), r = z(t);
			Or(r, 21, () => pe, wr, (e, t) => {
				var n = Ai();
				let r;
				var i = R(n, !0);
				M(n), V(() => {
					r = Ir(n, 1, "svelte-1n46o8q", null, r, { active: W(E) === W(t) }), J(i, W(t));
				}), G("click", n, () => me(W(t))), q(e, n);
			}), M(r);
			var i = B(r, 2), o = (e) => {
				var t = ca(), r = R(t), i = R(r, !0);
				M(r);
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
							Q(n), V((e) => $(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => ft(W(t), e.target.value)), q(e, n);
						};
						Y(o, (e) => {
							W(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = B(o, 2), u = R(l), d = B(u, 2), f = (e) => {
							var n = Ni();
							G("click", n, () => pt(W(t))), q(e, n);
						};
						Y(d, (e) => {
							W(t).path !== "/" && e(f);
						}), M(l), M(n), V(() => {
							r = Ir(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(a) }), $(i, W(t).title), u.disabled = W(t).id === W(a);
						}), G("change", i, (e) => lt(W(t), e.target.value)), G("click", u, () => et(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					Q(r);
					var i = B(r, 2);
					Ee(2), M(t), V((e) => i.disabled = e, [() => !W(at).trim()]), G("keydown", r, (e) => e.key === "Enter" && ct()), Jr(r, () => W(at), (e) => L(at, e)), G("click", i, ct), q(e, t);
				}, c = (e) => {
					var t = Ri(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					i.value = i.__value = "text";
					var a = B(i);
					a.value = a.__value = "image", M(r);
					var o;
					Z(r), M(n);
					var s = B(n, 2);
					Q(s);
					var c = B(s, 4);
					Or(c, 17, () => W(C).nav.items, wr, (e, t, n) => {
						var r = Li(), i = R(r), a = R(i);
						Q(a);
						var o = B(a, 2), s = R(o);
						s.disabled = n === 0;
						var c = B(s, 2), l = B(c, 2);
						M(o), M(i);
						var u = B(i, 2), d = R(u);
						Or(d, 17, () => W(C).pages, (e) => e.id, (e, t) => {
							var n = Ci(), r = R(n, !0);
							M(n);
							var i = {};
							V(() => {
								J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
							}), q(e, n);
						});
						var f = B(d);
						f.value = f.__value = "__href", M(u);
						var p;
						Z(u);
						var m = B(u, 2), h = (e) => {
							var r = Ii();
							Q(r), V(() => $(r, W(t).href ?? "")), G("change", r, (e) => _t(n, e.target.value)), q(e, r);
						};
						Y(m, (e) => {
							W(t).page || e(h);
						}), M(r), V(() => {
							$(a, W(t).label), c.disabled = n === W(C).nav.items.length - 1, p !== (p = W(t).page ?? "__href") && (u.value = (u.__value = W(t).page ?? "__href") ?? "", X(u, W(t).page ?? "__href"));
						}), G("input", a, (e) => ht(n, e.target.value)), G("click", s, () => F(n, -1)), G("click", c, () => F(n, 1)), G("click", l, () => vt(n)), G("change", u, (e) => gt(n, e.target.value)), q(e, r);
					});
					var l = B(c, 2);
					M(t), V(() => {
						o !== (o = W(C).nav.logo?.type ?? "text") && (r.value = (r.__value = W(C).nav.logo?.type ?? "text") ?? "", X(r, W(C).nav.logo?.type ?? "text")), $(s, W(C).nav.logo?.value ?? ""), Wr(s, "placeholder", W(C).nav.logo?.type === "image" ? "/media/logo.webp" : "Navnet i menyen");
					}), G("change", r, (e) => mt({ type: e.target.value })), G("input", s, (e) => mt({ value: e.target.value })), G("click", l, yt), q(e, t);
				}, l = (e) => {
					var t = Bi(), n = B(R(t), 2), r = B(R(n));
					Q(r), M(n);
					var i = B(n, 2), a = B(R(i));
					Q(a), M(i);
					var o = B(i, 2), s = B(R(o));
					Q(s), M(o);
					var c = B(o, 2), l = B(R(c));
					Q(l), M(c);
					var u = B(c, 4), d = B(R(u)), f = R(d), p = (e) => {
						var t = zi(), n = {};
						V(() => {
							n !== (n = W(C).theme.tokens.font.heading) && (t.value = (t.__value = W(C).theme.tokens.font.heading) ?? "");
						}), q(e, t);
					}, h = /* @__PURE__ */ ut(() => !bt.some(([, e]) => e === W(C).theme.tokens.font.heading));
					Y(f, (e) => {
						W(h) && e(p);
					}), Or(B(f), 17, () => bt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ ut(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = Ci(), o = R(a, !0);
						M(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), M(d);
					var g;
					Z(d), M(u);
					var _ = B(u, 2), v = B(R(_)), y = R(v), b = (e) => {
						var t = zi(), n = {};
						V(() => {
							n !== (n = W(C).theme.tokens.font.body) && (t.value = (t.__value = W(C).theme.tokens.font.body) ?? "");
						}), q(e, t);
					}, x = /* @__PURE__ */ ut(() => !bt.some(([, e]) => e === W(C).theme.tokens.font.body));
					Y(y, (e) => {
						W(x) && e(b);
					}), Or(B(y), 17, () => bt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ ut(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = Ci(), o = R(a, !0);
						M(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), M(v);
					var S;
					Z(v), M(_);
					var ee = B(_, 4), te = B(R(ee));
					Q(te), M(ee);
					var ne = B(ee, 2), re = B(R(ne));
					Q(re), M(ne), M(t), V(() => {
						$(r, W(C).theme.tokens.color.bg), $(a, W(C).theme.tokens.color.surface), $(s, W(C).theme.tokens.color.text), $(l, W(C).theme.tokens.color.accent), g !== (g = W(C).theme.tokens.font.heading) && (d.value = (d.__value = W(C).theme.tokens.font.heading) ?? "", X(d, W(C).theme.tokens.font.heading)), S !== (S = W(C).theme.tokens.font.body) && (v.value = (v.__value = W(C).theme.tokens.font.body) ?? "", X(v, W(C).theme.tokens.font.body)), $(te, W(C).theme.tokens.radius.sm), $(re, W(C).theme.tokens.radius.md);
					}), G("input", r, (e) => xt("bg", e.target.value)), G("input", a, (e) => xt("surface", e.target.value)), G("input", s, (e) => xt("text", e.target.value)), G("input", l, (e) => xt("accent", e.target.value)), G("change", d, (e) => St("heading", e.target.value)), G("change", v, (e) => St("body", e.target.value)), G("change", te, (e) => Ct("sm", e.target.value)), G("change", re, (e) => Ct("md", e.target.value)), q(e, t);
				}, u = (e) => {
					var t = Vi();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					M(i), M(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					M(c);
					var u = B(c, 2), d = B(R(u), 2), f = R(d), p = B(f, 2), m = B(p, 2), h = B(m, 2), _ = B(h, 2);
					M(d), M(u), M(t), V(() => {
						n = Ir(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(g) === "mobile" }), Wr(t, "title", W(g) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => Bt("text")), G("click", o, () => Bt("text-box")), G("click", s, () => Bt("button")), G("change", l, Vt), G("click", f, () => Bt("shape-line")), G("click", p, () => Bt("shape-arrow")), G("click", m, () => Bt("shape-circle")), G("click", h, () => Bt("shape-rect")), G("click", _, () => Bt("shape-triangle")), q(e, t);
				}, d = (e) => {
					var t = Hi(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					M(r), M(n);
					var a = B(n, 2);
					Q(a);
					var o = B(a, 2), s = R(o);
					Q(s), Ee(), M(o), Ee(2), M(t), V(() => {
						J(i, `${W(p).size ?? ""} px`), $(a, W(p).size), Ur(s, W(p).snap !== !1);
					}), G("input", a, (e) => Xe("size", Number(e.target.value))), G("change", s, (e) => Xe("snap", e.target.checked)), q(e, t);
				}, f = (e) => {
					var t = oa(), r = R(t), i = (e) => {
						var t = Yi(), n = z(t), r = R(n);
						M(n);
						var i = B(n, 2), a = (e) => {
							var t = Ui(), n = R(t), r = B(R(n));
							Q(r), M(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), M(i);
							var o = B(i, 2), s = B(R(o));
							Q(s), M(o);
							var c = B(o, 2), l = B(R(c));
							Q(l), M(c);
							var u = B(c, 2), d = B(R(u));
							Q(d), M(u);
							var f = B(u, 2), p = B(R(f));
							Q(p), M(f), M(t), V(() => {
								$(r, W(D).frame.x), $(a, W(D).frame.y), $(s, W(D).frame.w), $(l, W(D).frame.h), $(d, W(D).frame.z ?? 1), $(p, W(D).frame.rot ?? 0);
							}), G("change", r, (e) => ye("x", Number(e.target.value))), G("change", a, (e) => ye("y", Number(e.target.value))), G("change", s, (e) => ye("w", Number(e.target.value))), G("change", l, (e) => ye("h", Number(e.target.value))), G("change", d, (e) => ye("z", Number(e.target.value))), G("change", p, (e) => ye("rot", Number(e.target.value))), q(e, t);
						};
						Y(i, (e) => {
							W(g) === "desktop" && e(a);
						});
						var o = B(i, 2), s = R(o);
						Q(s), Ee(), M(o);
						var c = B(o, 4), l = (e) => {
							var t = Wi(), n = z(t), r = B(R(n)), i = R(r);
							i.value = i.__value = "left";
							var a = B(i);
							a.value = a.__value = "center";
							var o = B(a);
							o.value = o.__value = "right", M(r);
							var s;
							Z(r), M(n);
							var c = B(n, 2), l = R(c);
							Q(l), Ee(), M(c), Ee(2), V((e) => {
								s !== (s = W(D).props.align ?? "left") && (r.value = (r.__value = W(D).props.align ?? "left") ?? "", X(r, W(D).props.align ?? "left")), Ur(l, e);
							}, [() => !!W(D).props.box]), G("change", r, (e) => O("align", e.target.value)), G("change", l, (e) => O("box", e.target.checked)), q(e, t);
						}, u = (e) => {
							var t = Gi(), n = z(t), r = B(R(n));
							Q(r), M(n);
							var i = B(n, 2), a = B(R(i)), o = R(a);
							Or(o, 17, () => W(C).pages, (e) => e.id, (e, t) => {
								var n = Ci(), r = R(n, !0);
								M(n);
								var i = {};
								V(() => {
									J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
								}), q(e, n);
							});
							var s = B(o);
							s.value = s.__value = "__href", M(a);
							var c;
							Z(a), M(i);
							var l = B(i, 2), u = (e) => {
								var t = Ii();
								Q(t), V(() => $(t, W(D).props.href === "#" ? "" : W(D).props.href ?? "")), G("change", t, (e) => O("href", e.target.value || null)), q(e, t);
							};
							Y(l, (e) => {
								W(D).props.page || e(u);
							});
							var d = B(l, 2), f = B(R(d)), p = R(f);
							p.value = p.__value = "primary";
							var m = B(p);
							m.value = m.__value = "secondary", M(f);
							var h;
							Z(f), M(d), V(() => {
								$(r, W(D).props.label), c !== (c = W(D).props.page ?? "__href") && (a.value = (a.__value = W(D).props.page ?? "__href") ?? "", X(a, W(D).props.page ?? "__href")), h !== (h = W(D).props.style) && (f.value = (f.__value = W(D).props.style) ?? "", X(f, W(D).props.style));
							}), G("change", r, (e) => O("label", e.target.value)), G("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								ve(`edit:${W(D).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), G("change", f, (e) => O("style", e.target.value)), q(e, t);
						}, d = (e) => {
							var t = Ki(), n = z(t), r = B(R(n));
							M(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), M(i);
							var o = B(i, 2), s = B(R(o)), c = R(s);
							c.value = c.__value = "cover";
							var l = B(c);
							l.value = l.__value = "contain", M(s);
							var u;
							Z(s), M(o);
							var d = B(o, 2), f = B(R(d)), p = R(f);
							p.value = p.__value = "";
							var m = B(p);
							m.value = m.__value = "sm";
							var h = B(m);
							h.value = h.__value = "md", M(f);
							var g;
							Z(f), M(d);
							var _ = B(d, 2), v = B(R(_));
							Q(v), M(_), V(() => {
								$(a, W(D).props.alt ?? ""), u !== (u = W(D).props.fit ?? "cover") && (s.value = (s.__value = W(D).props.fit ?? "cover") ?? "", X(s, W(D).props.fit ?? "cover")), g !== (g = W(D).props.radius ?? "") && (f.value = (f.__value = W(D).props.radius ?? "") ?? "", X(f, W(D).props.radius ?? "")), $(v, W(D).props.href ?? "");
							}), G("change", r, xe), G("change", a, (e) => O("alt", e.target.value)), G("change", s, (e) => O("fit", e.target.value)), G("change", f, (e) => O("radius", e.target.value || null)), G("change", v, (e) => O("href", e.target.value || null)), q(e, t);
						}, f = (e) => {
							var t = qi(), n = z(t), r = B(R(n));
							Or(r, 21, () => Ce, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ut(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ci(), o = R(a, !0);
								M(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), M(r);
							var i;
							Z(r), M(n);
							var a = B(n, 2), o = B(R(a));
							Or(o, 21, () => k, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ut(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ci(), o = R(a, !0);
								M(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), M(o);
							var s;
							Z(o), M(a);
							var c = B(a, 2), l = B(R(c));
							Q(l), M(c);
							var u = B(c, 2), d = R(u);
							Q(d), Ee(), M(u), V((e) => {
								i !== (i = W(D).props.kind) && (r.value = (r.__value = W(D).props.kind) ?? "", X(r, W(D).props.kind)), s !== (s = W(D).props.color) && (o.value = (o.__value = W(D).props.color) ?? "", X(o, W(D).props.color)), $(l, W(D).props.thickness), Ur(d, e);
							}, [() => !!W(D).props.fill]), G("change", r, (e) => O("kind", e.target.value)), G("change", o, (e) => O("color", e.target.value)), G("change", l, (e) => O("thickness", Number(e.target.value))), G("change", d, (e) => O("fill", e.target.checked ? W(D).props.color : null)), q(e, t);
						};
						Y(c, (e) => {
							W(D).type === "text" ? e(l) : W(D).type === "button" ? e(u, 1) : W(D).type === "image" ? e(d, 2) : W(D).type === "shape" && e(f, 3);
						});
						var p = B(c, 4), h = B(R(p)), _ = R(h);
						_.value = _.__value = "", Or(B(_), 17, () => Object.entries(hi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ ut(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Ci(), o = R(a, !0);
							M(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), M(h);
						var v;
						Z(h), M(p);
						var y = B(p, 2), b = (e) => {
							var t = Ji(), n = z(t), r = B(R(n));
							Q(r), M(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), M(i), Ee(2), V(() => {
								$(r, W(D).animation.props.duration), $(a, W(D).animation.props.delay);
							}), G("change", r, (e) => We("duration", Number(e.target.value))), G("change", a, (e) => We("delay", Number(e.target.value))), q(e, t);
						};
						Y(y, (e) => {
							W(D).animation && hi[W(D).animation.type]?.entrance && e(b);
						}), V(() => {
							J(r, `${Se[W(D).type] ?? W(D).type ?? ""}-blokk`), Ur(s, W(D).decor), v !== (v = W(D).animation?.type ?? "") && (h.value = (h.__value = W(D).animation?.type ?? "") ?? "", X(h, W(D).animation?.type ?? ""));
						}), G("change", s, (e) => be(e.target.checked)), G("change", h, (e) => Ue(e.target.value || null)), q(e, t);
					}, a = (e) => {
						var t = ia(), r = B(z(t), 2), i = B(R(r));
						Q(i), M(r);
						var a = B(r, 6), o = R(a);
						Q(o), Ee(), M(a);
						var s = B(a, 2), c = (e) => {
							var t = Xi(), n = z(t), r = B(R(n)), i = R(r);
							M(r), M(n);
							var a = B(n, 2);
							Q(a), V(() => {
								J(i, `${W(j).size ?? ""} px`), $(a, W(j).size);
							}), G("input", a, (e) => Ye("size", Number(e.target.value))), q(e, t);
						};
						Y(s, (e) => {
							W(j) && e(c);
						});
						var l = B(s, 8);
						Or(l, 17, () => W(Te), wr, (e, t, r) => {
							var i = ra(), a = R(i), o = R(a);
							Or(o, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ ut(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ci(), o = R(a, !0);
								M(a);
								var s = {};
								V(() => {
									J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), M(o);
							var s;
							Z(o);
							var c = B(o, 2), l = R(c);
							l.disabled = r === 0;
							var u = B(l, 2), d = B(u, 2);
							M(c), M(a);
							var f = B(a, 2), p = (e) => {
								var n = Zi(), i = z(n), a = B(R(i));
								Q(a), M(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								M(s), M(o);
								var l = B(o, 2);
								Q(l), V((e, n) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.opacity ?? 1);
								}, [() => Ve(W(t).props.value), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", a, (e) => N(r, "value", e.target.value)), G("input", l, (e) => N(r, "opacity", Number(e.target.value))), q(e, n);
							}, h = (e) => {
								var n = Qi(), i = z(n), a = B(R(i));
								Q(a), M(i);
								var o = B(i, 2), s = B(R(o));
								Q(s), M(o);
								var c = B(o, 2), l = B(R(c)), u = R(l);
								M(l), M(c);
								var d = B(c, 2);
								Q(d);
								var f = B(d, 2), p = B(R(f)), m = R(p);
								M(p), M(f);
								var h = B(f, 2);
								Q(h);
								var g = B(h, 2), _ = R(g);
								Q(_), Ee(), M(g), V((e, n, r, i) => {
									$(a, e), $(s, n), J(u, `${W(t).props.angle ?? ""}°`), $(d, W(t).props.angle), J(m, `${r ?? ""}%`), $(h, W(t).props.opacity ?? 1), Ur(_, i);
								}, [
									() => Ve(W(t).props.stops[0]),
									() => Ve(W(t).props.stops[W(t).props.stops.length - 1]),
									() => Math.round((W(t).props.opacity ?? 1) * 100),
									() => !!W(t).props.animate
								]), G("input", a, (e) => Re(r, 0, e.target.value)), G("input", s, (e) => Re(r, W(t).props.stops.length - 1, e.target.value)), G("input", d, (e) => N(r, "angle", Number(e.target.value))), G("input", h, (e) => N(r, "opacity", Number(e.target.value))), G("change", _, (e) => N(r, "animate", e.target.checked)), q(e, n);
							}, g = (e) => {
								var n = $i(), i = z(n), a = B(R(i));
								Q(a), M(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								M(s), M(o);
								var l = B(o, 2);
								Q(l);
								var u = B(l, 2), d = B(R(u)), f = R(d);
								M(d), M(u);
								var p = B(u, 2);
								Q(p);
								var m = B(p, 2), h = B(R(m)), g = R(h);
								M(h), M(m);
								var _ = B(m, 2);
								Q(_);
								var v = B(_, 2), y = B(R(v)), b = R(y);
								M(y), M(v);
								var x = B(v, 2);
								Q(x), V((e, n, r, i, o) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.x), J(f, `${r ?? ""}%`), $(p, W(t).props.y), J(g, `${i ?? ""}%`), $(_, W(t).props.radius), J(b, `${o ?? ""}%`), $(x, W(t).props.opacity);
								}, [
									() => Ve(W(t).props.color),
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", a, (e) => N(r, "color", e.target.value)), G("input", l, (e) => N(r, "x", Number(e.target.value))), G("input", p, (e) => N(r, "y", Number(e.target.value))), G("input", _, (e) => N(r, "radius", Number(e.target.value))), G("input", x, (e) => N(r, "opacity", Number(e.target.value))), q(e, n);
							}, _ = (e) => {
								var n = ea(), i = z(n), a = B(R(i)), o = R(a);
								M(a), M(i);
								var s = B(i, 2);
								Q(s), V((e) => {
									J(o, `${e ?? ""}%`), $(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => N(r, "opacity", Number(e.target.value))), q(e, n);
							}, v = (e) => {
								var n = na(), i = z(n), a = R(i), o = B(a);
								M(i);
								var s = B(i, 2), c = B(R(s)), l = R(c);
								l.value = l.__value = "cover";
								var u = B(l);
								u.value = u.__value = "contain";
								var d = B(u);
								d.value = d.__value = "repeat", M(c);
								var f;
								Z(c), M(s);
								var p = B(s, 2), m = (e) => {
									var n = ta(), i = z(n), a = B(R(i)), o = R(a);
									M(a), M(i);
									var s = B(i, 2);
									Q(s);
									var c = B(s, 2), l = B(R(c)), u = R(l);
									M(l), M(c);
									var d = B(c, 2);
									Q(d), V((e, n) => {
										J(o, `${e ?? ""}%`), $(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), $(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => N(r, "x", Number(e.target.value))), G("input", d, (e) => N(r, "y", Number(e.target.value))), q(e, n);
								};
								Y(p, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(m);
								});
								var h = B(p, 2), g = B(R(h)), _ = R(g);
								M(g), M(h);
								var v = B(h, 2);
								Q(v);
								var y = B(v, 2), b = B(R(y)), x = R(b);
								M(b), M(y);
								var S = B(y, 2);
								Q(S), V((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), f !== (f = W(t).props.fit ?? "cover") && (c.value = (c.__value = W(t).props.fit ?? "cover") ?? "", X(c, W(t).props.fit ?? "cover")), J(_, `${W(t).props.blur ?? 0 ?? ""} px`), $(v, W(t).props.blur ?? 0), J(x, `${e ?? ""}%`), $(S, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => Be(r, e)), G("change", c, (e) => N(r, "fit", e.target.value)), G("input", v, (e) => N(r, "blur", Number(e.target.value))), G("input", S, (e) => N(r, "opacity", Number(e.target.value))), q(e, n);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(h, 1) : W(t).type === "glow" ? e(g, 2) : W(t).type === "grain" ? e(_, 3) : W(t).type === "image" && e(v, 4);
							}), M(i), V(() => {
								s !== (s = W(t).type) && (o.value = (o.__value = W(t).type) ?? "", X(o, W(t).type)), u.disabled = r === W(Te).length - 1;
							}), G("change", o, (e) => ze(r, e.target.value)), G("click", l, () => Fe(r, -1)), G("click", u, () => Fe(r, 1)), G("click", d, () => Pe(r)), q(e, i);
						});
						var u = B(l, 2), d = B(R(u));
						Or(d, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ ut(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Ci(), o = R(a, !0);
							M(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), M(d), M(u);
						var f = B(u, 2), p = B(f, 4), h = B(R(p)), g = R(h);
						g.value = g.__value = "", Or(B(g), 17, () => Object.entries(hi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ ut(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Ci(), o = R(a, !0);
							M(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), M(h);
						var _;
						Z(h), M(p);
						var v = B(p, 2), y = (e) => {
							var t = Ji(), n = z(t), r = B(R(n));
							Q(r), M(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), M(i), Ee(2), V(() => {
								$(r, W(De).props.duration), $(a, W(De).props.delay);
							}), G("change", r, (e) => P("duration", Number(e.target.value))), G("change", a, (e) => P("delay", Number(e.target.value))), q(e, t);
						};
						Y(v, (e) => {
							W(De) && hi[W(De).type]?.entrance && e(y);
						}), V(() => {
							$(i, W(we)), Ur(o, W(j) !== null), _ !== (_ = W(De)?.type ?? "") && (h.value = (h.__value = W(De)?.type ?? "") ?? "", X(h, W(De)?.type ?? ""));
						}), G("change", i, (e) => Ke(e.target.value)), G("change", o, (e) => Je(e.target.checked)), Lr(d, () => W(je), (e) => L(je, e)), G("click", f, () => Me(W(je))), G("change", h, (e) => Ge(e.target.value || null)), q(e, t);
					}, o = (e) => {
						q(e, aa());
					};
					Y(r, (e) => {
						W(D) ? e(i) : W(A) ? e(a, 1) : e(o, -1);
					}), M(t), q(e, t);
				}, h = (e) => {
					var t = sa(), n = R(t), r = R(n);
					M(n), M(t), V(() => J(r, `${W(E) ?? ""}-panelet kommer i en senere del av v0.5.`)), q(e, t);
				};
				Y(o, (e) => {
					W(E) === "Sider" ? e(s) : W(E) === "Nav" ? e(c, 1) : W(E) === "Tema" ? e(l, 2) : W(E) === "Blokker" ? e(u, 3) : W(E) === "Grid" ? e(d, 4) : W(E) === "Egenskaper" ? e(f, 5) : e(h, -1);
				}), M(t), V(() => J(i, W(E))), q(e, t);
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
		Qr(c, (e) => L(d, e), () => W(d)), M(o), M(t), V(() => {
			s = Ir(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: W(g) === "mobile" }), Wr(c, "src", `/?page=${W(a)}&preview=1`);
		}), dr("load", c, tt), lr(c), q(e, t);
	}, dn = (e) => {
		q(e, da());
	};
	Y(ln, (e) => {
		W(i) ? e(un) : e(dn, -1);
	});
	var fn = B(ln, 2), pn = (e) => {
		var t = fa();
		let n;
		var r = R(t), i = R(r, !0);
		M(r);
		var a = B(r, 2);
		M(t), V(() => {
			n = Ir(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(c) === "ok",
				error: W(c) === "error"
			}), J(i, W(s));
		}), G("click", a, () => u("")), q(e, t);
	};
	Y(fn, (e) => {
		W(s) && e(pn);
	}), M(Gt), V(() => Zt = Ir(Xt, 1, "topbar svelte-1n46o8q", null, Zt, { hidden: !W(h) })), q(e, Gt), Le();
}
fr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var ha = yr(ma, { target: document.getElementById("urd-admin") });
//#endregion
export { ha as default };
