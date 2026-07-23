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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, ee = 1 << 19, C = 1 << 20, w = 1 << 25, T = 65536, E = 1 << 21, te = 1 << 22, ne = 1 << 23, re = Symbol("$state"), ie = Symbol("legacy props"), D = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), de = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function me(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function he() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ge(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function _e() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ye() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function be() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function xe() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Se() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Ce = {}, O = Symbol("uninitialized"), we = "http://www.w3.org/1999/xhtml", Te = "http://www.w3.org/2000/svg", k = "http://www.w3.org/1998/Math/MathML";
function Ee() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function De(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Oe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var A = !1;
function ke(e) {
	A = e;
}
var j;
function M(e) {
	if (e === null) throw De(), Ce;
	return j = e;
}
function Ae() {
	return M(/* @__PURE__ */ sn(j));
}
function N(e) {
	if (A) {
		if (/* @__PURE__ */ sn(j) !== null) throw De(), Ce;
		j = e;
	}
}
function P(e = 1) {
	if (A) {
		for (var t = e, n = j; t--;) n = /* @__PURE__ */ sn(n);
		j = n;
	}
}
function je(e = !0) {
	for (var t = 0, n = j;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ sn(n);
		e && n.remove(), n = i;
	}
}
function Me(e) {
	if (!e || e.nodeType !== 8) throw De(), Ce;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ne(e) {
	return e === this.v;
}
function Pe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Fe(e) {
	return !Pe(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ie = [];
function Le(e, t = !1, n = !1) {
	return Re(e, /* @__PURE__ */ new Map(), "", Ie, null, n);
}
function Re(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Re(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Re(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Re(t.toJSON(), n, r, i, t);
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
var ze = null;
function Be(e) {
	ze = e;
}
function Ve(e, t = !1, n) {
	ze = {
		p: ze,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: null
	};
}
function He(e) {
	var t = ze, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) vn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, ze = t.p, e ?? {};
}
function Ue() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var We = [];
function Ge() {
	var e = We;
	We = [], f(e);
}
function Ke(e) {
	if (We.length === 0 && !Ot) {
		var t = We;
		queueMicrotask(() => {
			t === We && Ge();
		});
	}
	We.push(e);
}
function qe() {
	for (; We.length > 0;) Ge();
}
function Je(e) {
	var t = G;
	if (t === null) return Bn.f |= ne, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ye(e, t);
}
function Ye(e, t) {
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
var Xe = ~(g | _ | h);
function F(e, t) {
	e.f = e.f & Xe | t;
}
function Ze(e) {
	e.f & 512 || e.deps === null ? F(e, h) : F(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Qe(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= T, Qe(t.deps));
}
function $e(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Qe(e.deps), F(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var et = !1;
function tt(e) {
	var t = et;
	try {
		return et = !1, [e(), et];
	} finally {
		et = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function nt(e) {
	A && /* @__PURE__ */ on(e) !== null && cn(e);
}
var rt = !1;
function it() {
	rt || (rt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function at(e) {
	var t = Bn, n = G;
	Hn(null), Un(null);
	try {
		return e();
	} finally {
		Hn(t), Un(n);
	}
}
function ot(e, t, n, r = n) {
	e.addEventListener(t, () => at(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), it();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function st(e) {
	let t = 0, n = Kt(0), r;
	return () => {
		hn() && (K(n), Sn(() => (t === 0 && (r = ur(() => e(() => Xt(n)))), t += 1, () => {
			Ke(() => {
				--t, t === 0 && (r?.(), r = void 0, Xt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ct = S | ee;
function lt(e, t, n, r) {
	new ut(e, t, n, r);
}
var ut = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = A ? j : null;
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
	#h = st(() => (this.#m = Kt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Cn(() => {
			if (A) {
				let e = this.#t;
				Ae();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ct), A && (this.#e = j);
	}
	#g() {
		try {
			this.#a = wn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = wn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = wn(() => e(this.#e)), Ke(() => {
			var e = this.#c = document.createDocumentFragment(), t = an();
			e.append(t), this.#a = this.#x(() => wn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, jn(this.#o, () => {
				this.#o = null;
			}), this.#b(L));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = wn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Fn(this.#a, e);
				let t = this.#n.pending;
				this.#o = wn(() => t(this.#e));
			} else this.#b(L);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		$e(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = G, n = Bn, r = ze;
		Un(this.#i), Hn(this.#i), Be(this.#i.ctx);
		try {
			return Nt.ensure(), e();
		} catch (e) {
			return Je(e), null;
		} finally {
			Un(t), Hn(n), Be(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && jn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ke(() => {
			this.#d = !1, this.#m && Jt(this.#m, this.#l);
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
		this.#a &&= (On(this.#a), null), this.#o &&= (On(this.#o), null), this.#s &&= (On(this.#s), null), A && (M(this.#t), P(), M(je()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Oe();
				return;
			}
			r = !0, i && Se(), this.#s !== null && jn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ye(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return wn(() => {
						var t = G;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ye(e, this.#i.parent), null;
				}
			}));
		};
		Ke(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ye(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ye(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function dt(e, t, n, r) {
	let i = Ue() ? ht : vt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = ft(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ye(e, s);
			}
			pt();
		}
	}
	var d = mt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ _t(e))).then(u).catch((e) => Ye(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), pt();
	}) : f();
}
function ft() {
	var e = G, t = Bn, n = ze, r = L;
	return function(i = !0) {
		Un(e), Hn(t), Be(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function pt(e = !0) {
	Un(null), Hn(null), Be(null), e && L?.deactivate();
}
function mt() {
	var e = G, t = e.b, n = L, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ht(e) {
	var t = 2 | g;
	return G !== null && (G.f |= ee), {
		ctx: ze,
		deps: null,
		effects: null,
		equals: Ne,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: G,
		ac: null
	};
}
var gt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function _t(e, t, n) {
	let r = G;
	r === null && fe();
	var i = void 0, a = Kt(O), o = !Bn, s = /* @__PURE__ */ new Set();
	return xn(() => {
		var t = G, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(pt);
		} catch (e) {
			n.reject(e), pt();
		}
		var c = L;
		if (o) {
			if (t.f & 32768) var l = mt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(gt);
			else for (let e of s.values()) e.reject(gt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== gt && (c.activate(), t ? (a.f |= ne, Jt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Jt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), gn(() => {
		for (let e of s) e.reject(gt);
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
function I(e) {
	let t = /* @__PURE__ */ ht(e);
	return Gn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	let t = /* @__PURE__ */ ht(e);
	return t.equals = Fe, t;
}
function yt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) On(t[n]);
	}
}
function bt(e) {
	var t, n = G, r = e.parent;
	if (!Rn && r !== null && e.v !== O && r.f & 24576) return Ee(), e.v;
	Un(r);
	try {
		e.f &= ~T, yt(e), t = rr(e);
	} finally {
		Un(n);
	}
	return t;
}
function xt(e) {
	var t = bt(e);
	if (!e.equals(t) && (e.wv = er(), (!L?.is_fork || e.deps === null) && (L === null ? e.v = t : (L.capture(e, t, !0), Tt?.capture(e, t, !0)), e.deps === null))) {
		F(e, h);
		return;
	}
	Rn || (Et === null ? Ze(e) : (hn() || L?.is_fork) && Et.set(e, t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && at(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), ar(t, 0), En(t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && or(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var wt = null, L = null, Tt = null, Et = null, Dt = null, Ot = !1, kt = !1, At = null, jt = null, Mt = 0, R = 1, Nt = class e {
	id = R++;
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
		wt === null ? wt = this : (wt.#n = this, this.#t = wt), wt = this;
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
			for (var r of n.d) F(r, g), t(r);
			for (r of n.m) F(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Mt++ > 1e3 && (this.#x(), Ft());
		for (let e of this.#u) this.#d.delete(e), F(e, g), this.schedule(e);
		for (let e of this.#d) F(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = At = [], r = [], i = jt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Ht(e), this.#h() || this.discard(), t;
		}
		if (L = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (At = null, jt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Vt(e, t);
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
		this.#r.clear(), Tt = this, Lt(r), Lt(n), Tt = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : tr(r) && (i & 16 && this.#d.add(r), or(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), F(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), L = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) $e(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Et?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		L = this;
	}
	deactivate() {
		L = null, Et = null;
	}
	flush() {
		try {
			kt = !0, L = this, this.#g();
		} finally {
			Mt = 0, Dt = null, At = null, jt = null, kt = !1, L = null, Et = null, Wt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(gt);
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
		this.#m || (this.#m = !0, Ke(() => {
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
			!kt && !Ot && Ke(() => {
				t.#e || t.flush();
			});
		}
		return L;
	}
	apply() {
		Et = null;
	}
	schedule(e) {
		if (Dt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (At !== null && t === G && (Bn === null || !(Bn.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? wt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Pt(e) {
	var t = Ot;
	Ot = !0;
	try {
		var n;
		for (e && (L !== null && !L.is_fork && L.flush(), n = e());;) {
			if (qe(), L === null) return n;
			L.flush();
		}
	} finally {
		Ot = t;
	}
}
function Ft() {
	try {
		_e();
	} catch (e) {
		Ye(e, Dt);
	}
}
var It = null;
function Lt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && tr(r) && (It = /* @__PURE__ */ new Set(), or(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && An(r), It?.size > 0)) {
				Wt.clear();
				for (let e of It) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) It.has(n) && (It.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || or(n);
					}
				}
				It.clear();
			}
		}
		It = null;
	}
}
function Rt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Rt(i, t, n, r) : e & 4194320 && !(e & 2048) && zt(i, t, r) && (F(i, g), Bt(i));
	}
}
function zt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && zt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Bt(e) {
	L.schedule(e);
}
function Vt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), F(e, h);
		for (var n = e.first; n !== null;) Vt(n, t), n = n.next;
	}
}
function Ht(e) {
	F(e, h);
	for (var t = e.first; t !== null;) Ht(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Ut = /* @__PURE__ */ new Set(), Wt = /* @__PURE__ */ new Map(), Gt = !1;
function Kt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ne,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function z(e, t) {
	let n = Kt(e, t);
	return Gn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function qt(e, t = !1, n = !0) {
	let r = Kt(e);
	return t || (r.equals = Fe), r;
}
function B(e, t, n = !1) {
	return Bn !== null && (!Vn || Bn.f & 131072) && Ue() && Bn.f & 4325394 && (Wn === null || !Wn.has(e)) && xe(), Jt(e, n ? Qt(t) : t, jt);
}
function Jt(e, t, n = null) {
	if (!e.equals(t)) {
		Wt.set(e, Rn ? t : e.v);
		var r = Nt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && bt(t), Et === null && Ze(t);
		}
		e.wv = er(), Zt(e, g, n), Ue() && G !== null && G.f & 1024 && !(G.f & 96) && (Jn === null ? Yn([e]) : Jn.push(e)), !r.is_fork && Ut.size > 0 && !Gt && Yt();
	}
	return t;
}
function Yt() {
	Gt = !1;
	for (let e of Ut) {
		e.f & 1024 && F(e, _);
		let t;
		try {
			t = tr(e);
		} catch {
			t = !0;
		}
		t && or(e);
	}
	Ut.clear();
}
function Xt(e) {
	B(e, e.v + 1);
}
function Zt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ue(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === G)) {
			var l = (c & g) === 0;
			if (l && F(s, t), c & 131072) Ut.add(s);
			else if (c & 2) {
				var u = s;
				Et?.delete(u), c & 65536 || (c & 512 && (G === null || !(G.f & 2097152)) && (s.f |= T), Zt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && It !== null && It.add(d), n === null ? Bt(d) : n.push(d);
			}
		}
	}
}
function Qt(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ z(0), u = null, d = Qn, f = (e) => {
		if (Qn === d) return e();
		var t = Bn, n = Qn;
		Hn(null), $n(d);
		var r = e();
		return Hn(t), $n(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ z(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ye();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ z(n.value, u);
				return r.set(t, e), e;
			}) : B(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ z(O, u));
					r.set(t, e), Xt(o);
				}
			} else B(n, O), Xt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ z(Qt(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
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
			if (t === re) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || G !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ z(i ? Qt(e[t]) : O, u)), r.set(t, n)), K(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ z(O, u)), r.set(d + "", p)) : B(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ z(void 0, u)), B(c, Qt(n)), r.set(t, c));
			else {
				l = c.v !== O;
				var m = f(() => Qt(n));
				B(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && B(g, _ + 1);
				}
				Xt(o);
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
			be();
		}
	});
}
var $t, en, tn, nn;
function rn() {
	if ($t === void 0) {
		$t = window, en = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		tn = a(t, "firstChild").get, nn = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function an(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function on(e) {
	return tn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function sn(e) {
	return nn.call(e);
}
function V(e, t) {
	if (!A) return /* @__PURE__ */ on(e);
	var n = /* @__PURE__ */ on(j);
	if (n === null) n = j.appendChild(an());
	else if (t && n.nodeType !== 3) {
		var r = an();
		return n?.before(r), M(r), r;
	}
	return t && dn(n), M(n), n;
}
function H(e, t = !1) {
	if (!A) {
		var n = /* @__PURE__ */ on(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ sn(n) : n;
	}
	if (t) {
		if (j?.nodeType !== 3) {
			var r = an();
			return j?.before(r), M(r), r;
		}
		dn(j);
	}
	return j;
}
function U(e, t = 1, n = !1) {
	let r = A ? j : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ sn(r);
	if (!A) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = an();
			return r === null ? i?.after(a) : r.before(a), M(a), a;
		}
		dn(r);
	}
	return M(r), r;
}
function cn(e) {
	e.textContent = "";
}
function ln() {
	return !1;
}
function un(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function dn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function fn(e) {
	G === null && (Bn === null && ge(e), he()), Rn && me(e);
}
function pn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function mn(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: ze,
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
	if (e & 4) At === null ? Nt.ensure().schedule(r) : At.push(r);
	else if (t !== null) {
		try {
			or(r);
		} catch (e) {
			throw On(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && pn(i, n), Bn !== null && Bn.f & 2 && !(e & 64))) {
		var a = Bn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function hn() {
	return Bn !== null && !Vn;
}
function gn(e) {
	let t = mn(8, null);
	return F(t, h), t.teardown = e, t;
}
function _n(e) {
	fn("$effect");
	var t = G.f;
	if (!Bn && t & 32 && ze !== null && !ze.i) {
		var n = ze;
		(n.e ??= []).push(e);
	} else return vn(e);
}
function vn(e) {
	return mn(4 | C, e);
}
function yn(e) {
	Nt.ensure();
	let t = mn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? jn(t, () => {
			On(t), n(void 0);
		}) : (On(t), n(void 0));
	});
}
function bn(e) {
	return mn(4, e);
}
function xn(e) {
	return mn(te | ee, e);
}
function Sn(e, t = 0) {
	return mn(8 | t, e);
}
function W(e, t = [], n = [], r = []) {
	dt(r, t, n, (t) => {
		mn(8, () => {
			e(...t.map(K));
		});
	});
}
function Cn(e, t = 0) {
	return mn(16 | t, e);
}
function wn(e) {
	return mn(32 | ee, e);
}
function Tn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Rn, n = Bn;
		zn(!0), Hn(null);
		try {
			t.call(null);
		} finally {
			zn(e), Hn(n);
		}
	}
}
function En(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && at(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : On(n, t), n = r;
	}
}
function Dn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || On(t), t = n;
	}
}
function On(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (kn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, En(e, t && !n), ar(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Tn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && An(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function kn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ sn(e);
		e.remove(), e = n;
	}
}
function An(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function jn(e, t, n = !0) {
	var r = [];
	Mn(e, r, !0);
	var i = () => {
		n && On(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Mn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Mn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Nn(e) {
	Pn(e, !0);
}
function Pn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (F(e, g), Nt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Pn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Fn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ sn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var In = null, Ln = !1, Rn = !1;
function zn(e) {
	Rn = e;
}
var Bn = null, Vn = !1;
function Hn(e) {
	Bn = e;
}
var G = null;
function Un(e) {
	G = e;
}
var Wn = null;
function Gn(e) {
	Bn !== null && (Wn ??= /* @__PURE__ */ new Set()).add(e);
}
var Kn = null, qn = 0, Jn = null;
function Yn(e) {
	Jn = e;
}
var Xn = 1, Zn = 0, Qn = Zn;
function $n(e) {
	Qn = e;
}
function er() {
	return ++Xn;
}
function tr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~T), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (tr(a) && xt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Et === null && F(e, h);
	}
	return !1;
}
function nr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Wn !== null && Wn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? nr(a, t, !1) : t === a && (n ? F(a, g) : a.f & 1024 && F(a, _), Bt(a));
	}
}
function rr(e) {
	var t = Kn, n = qn, r = Jn, i = Bn, a = Wn, o = ze, s = Vn, c = Qn, l = e.f;
	Kn = null, qn = 0, Jn = null, Bn = l & 96 ? null : e, Wn = null, Be(e.ctx), Vn = !1, Qn = ++Zn, e.ac !== null && (at(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= E;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = L?.is_fork;
		if (Kn !== null) {
			var m;
			if (p || ar(e, qn), f !== null && qn > 0) for (f.length = qn + Kn.length, m = 0; m < Kn.length; m++) f[qn + m] = Kn[m];
			else e.deps = f = Kn;
			if (hn() && e.f & 512) for (m = qn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && qn < f.length && (ar(e, qn), f.length = qn);
		if (Ue() && Jn !== null && !Vn && f !== null && !(e.f & 6146)) for (m = 0; m < Jn.length; m++) nr(Jn[m], e);
		if (i !== null && i !== e) {
			if (Zn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Zn;
			if (t !== null) for (let e of t) e.rv = Zn;
			Jn !== null && (r === null ? r = Jn : r.push(...Jn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Je(e);
	} finally {
		e.f ^= E, Kn = t, qn = n, Jn = r, Bn = i, Wn = a, Be(o), Vn = s, Qn = c;
	}
}
function ir(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Kn === null || !n.call(Kn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== O && Ze(s), s.ac !== null && at(() => {
			s.ac.abort(ue), s.ac = null, F(s, g);
		}), St(s), ar(s, 0);
	}
}
function ar(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ir(e, n[r]);
}
function or(e) {
	var t = e.f;
	if (!(t & 16384)) {
		F(e, h);
		var n = G, r = Ln;
		G = e, Ln = (t & 96) == 0;
		try {
			t & 16777232 ? Dn(e) : En(e), Tn(e);
			var i = rr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Xn;
		} finally {
			Ln = r, G = n;
		}
	}
}
async function sr() {
	await Promise.resolve(), Pt();
}
function K(e) {
	var t = (e.f & 2) != 0;
	if (In?.add(e), Bn !== null && !Vn && !(G !== null && G.f & 16384) && (Wn === null || !Wn.has(e))) {
		var r = Bn.deps;
		if (Bn.f & 2097152) e.rv < Zn && (e.rv = Zn, Kn === null && r !== null && r[qn] === e ? qn++ : Kn === null ? Kn = [e] : Kn.push(e));
		else {
			Bn.deps ??= [], n.call(Bn.deps, e) || Bn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Bn] : n.call(i, Bn) || i.push(Bn);
		}
	}
	if (Rn && Wt.has(e)) return Wt.get(e);
	if (t) {
		var a = e;
		if (Rn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || lr(a)) && (o = bt(a)), Wt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Vn && Bn !== null && (Ln || (Bn.f & 512) != 0), c = (a.f & b) === 0;
		tr(a) && (s && (a.f |= 512), xt(a)), s && !c && (Ct(a), cr(a));
	}
	if (Et?.has(e)) return Et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function cr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Ct(t), cr(t));
}
function lr(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Wt.has(t) || t.f & 2 && lr(t)) return !0;
	return !1;
}
function ur(e) {
	var t = Vn;
	try {
		return Vn = !0, e();
	} finally {
		Vn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var dr = ["touchstart", "touchmove"];
function fr(e) {
	return dr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var pr = Symbol("events"), mr = /* @__PURE__ */ new Set(), hr = /* @__PURE__ */ new Set();
function gr(e) {
	if (!A) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function _r(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || xr.call(t, e), !e.cancelBubble) return at(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ke(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function vr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = _r(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && gn(() => {
		t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[pr] ??= {})[e] = n;
}
function yr(e) {
	for (var t = 0; t < e.length; t++) mr.add(e[t]);
	for (var n of hr) n(e);
}
var br = null;
function xr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	br = e;
	var s = 0, c = br === e && e[pr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[pr] = t;
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
		var d = Bn, f = G;
		Hn(null), Un(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[pr]?.[r];
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
			e[pr] = t, delete e.currentTarget, Hn(d), Un(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Sr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Cr(e) {
	return Sr?.createHTML(e) ?? e;
}
function wr(e) {
	var t = un("template");
	return t.innerHTML = Cr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Tr(e, t) {
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
		if (A) return Tr(j, null), j;
		i === void 0 && (i = wr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ on(i)));
		var t = r || en ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ on(t), s = t.lastChild;
			Tr(o, s);
		} else Tr(t, t);
		return t;
	};
}
function Er(e = "") {
	if (!A) {
		var t = an(e + "");
		return Tr(t, t), t;
	}
	var n = j;
	return n.nodeType === 3 ? dn(n) : (n.before(n = an()), M(n)), Tr(n, n), n;
}
function Dr() {
	if (A) return Tr(j, null), j;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = an();
	return e.append(t, n), Tr(t, n), e;
}
function Y(e, t) {
	if (A) {
		var n = G;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = j), Ae();
		return;
	}
	e !== null && e.before(t);
}
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function Or(e, t) {
	return Ar(e, t);
}
var kr = /* @__PURE__ */ new Map();
function Ar(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	rn();
	var l = void 0, u = yn(() => {
		var s = n ?? t.appendChild(an());
		lt(s, { pending: () => {} }, (t) => {
			Ve({});
			var n = ze;
			if (o && (n.c = o), a && (i.$$events = a), A && Tr(t, null), l = e(t, i) || {}, A && (G.nodes.end = j, j === null || j.nodeType !== 8 || j.data !== "]")) throw De(), Ce;
			He();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = fr(r);
					for (let e of [t, document]) {
						var a = kr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), kr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, xr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(mr)), hr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = kr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, xr), r.delete(e), r.size === 0 && kr.delete(n)) : r.set(e, i);
			}
			hr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return jr.set(l, u), l;
}
var jr = /* @__PURE__ */ new WeakMap(), Mr = class {
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
			if (n) Nn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Nn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (On(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Fn(r, t), t.append(an()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else On(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), jn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (On(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = L, r = ln();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = an();
			i.append(a), this.#n.set(e, {
				effect: wn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, wn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else A && (this.anchor = j), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Z(e, t, n = !1) {
	var r;
	A && (r = j, Ae());
	var i = new Mr(e), a = n ? S : 0;
	function o(e, t) {
		if (A) {
			var n = Me(r);
			if (e !== parseInt(n.substring(1))) {
				var a = je();
				M(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Cn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Nr(e, t) {
	return t;
}
function Pr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		jn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Fr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			cn(d), d.append(u), e.items.clear();
		}
		Fr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Fr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= w, Fn(a, document.createDocumentFragment())) : On(t[i], n);
	}
}
var Ir;
function Lr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? M(/* @__PURE__ */ on(u)) : u.appendChild(an());
	}
	A && Ae();
	var d = null, f = /* @__PURE__ */ vt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, zr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, Vr(d, null, c)) : Nn(d) : jn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Cn(() => {
			p = K(f);
			var e = p.length;
			let t = !1;
			A && Me(c) === "[!" != (e === 0) && (c = je(), M(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = L, v = ln(), y = 0; y < e; y += 1) {
				A && j.nodeType === 8 && j.data === "]" && (c = j, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Jt(S.v, b), S.i && Jt(S.i, y), v && u.unskip_effect(S.e)) : (S = Br(l, h ? c : Ir ??= an(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = wn(() => s(c)) : (d = wn(() => s(Ir ??= an())), d.f |= w)), e > r.size && pe("", "", ""), A && e > 0 && M(je()), !h) if (m.set(u, r), v) {
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
	h = !1, A && (c = j);
}
function Rr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function zr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Rr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Nn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= w, _ === l) Vr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Hr(e, d, _), Hr(e, _, y), Vr(_, y, n), d = _, p = [], m = [], l = Rr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Vr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Hr(e, S.prev, ee.next), Hr(e, d, S), Hr(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), Vr(_, l, n), Hr(e, _.prev, _.next), Hr(e, _, d === null ? e.effect.first : d.next), Hr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Rr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Rr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Fr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = Rr(l.next);
		var T = C.length;
		if (T > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) C[v].nodes?.a?.fix();
			}
			Pr(e, C, E);
		}
	}
	o && Ke(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Br(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Kt(n) : /* @__PURE__ */ qt(n, !1, !1) : null, l = o & 2 ? Kt(i) : null;
	return {
		v: c,
		i: l,
		e: wn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Vr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ sn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Hr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Ur(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		A && (o = M(/* @__PURE__ */ on(c)));
	}
	W(() => {
		var e = G;
		if (s === (s = t() ?? "")) {
			A && Ae();
			return;
		}
		if (n && !A) {
			e.nodes = null, c.innerHTML = s, s !== "" && Tr(/* @__PURE__ */ on(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (kn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (A) {
				for (var a = j.data, l = Ae(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ sn(l);
				if (l === null) throw De(), Ce;
				Tr(j, u), o = M(l);
				return;
			}
			var d = un(r ? "svg" : i ? "math" : "template", r ? Te : i ? k : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Tr(/* @__PURE__ */ on(f), f.lastChild), r || i) for (; /* @__PURE__ */ on(f);) o.before(/* @__PURE__ */ on(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Wr = [..." 	\n\r\f\xA0\v﻿"];
function Gr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Wr.includes(r[o - 1])) && (s === r.length || Wr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Kr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function qr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Jr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(qr)), i && c.push(...Object.keys(i).map(qr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = qr(e.substring(l, u).trim());
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
		return r && (n += Kr(r)), i && (n += Kr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Yr(e, t, n, r, i, a) {
	var o = e[oe];
	if (A || o !== n || o === void 0) {
		var s = Gr(n, r, a);
		(!A || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Xr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Zr(e, t, n, r) {
	var i = e[se];
	if (A || i !== t) {
		var a = Jr(t, r);
		(!A || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? (Xr(e, n?.[0], r[0]), Xr(e, n?.[1], r[1], "important")) : Xr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Qr = Symbol("is custom element"), $r = Symbol("is html"), ei = de ? "link" : "LINK", ti = de ? "progress" : "PROGRESS";
function Q(e) {
	if (A) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ri(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ri(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, Ke(n), it();
	}
}
function $(e, t) {
	var n = ii(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ti) || (e.value = t ?? "");
}
function ni(e, t) {
	var n = ii(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ri(e, t, n, r) {
	var i = ii(e);
	A && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ei) || i[t] !== (i[t] = n) && (t === "loading" && (e[D] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && oi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ii(e) {
	return e[ae] ??= {
		[Qr]: e.nodeName.includes("-"),
		[$r]: e.namespaceURI === we
	};
}
var ai = /* @__PURE__ */ new Map();
function oi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ai.get(t);
	if (n) return n;
	ai.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function si(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ot(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ci(e) ? li(a) : a, n(a), L !== null && r.add(L), await sr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (A && e.defaultValue !== e.value || ur(t) == null && e.value) && (n(ci(e) ? li(e.value) : e.value), L !== null && r.add(L)), Sn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = L;
			if (r.has(i)) return;
		}
		ci(e) && n === li(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function ci(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function li(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ui(e, t) {
	return e === t || e?.[re] === t;
}
function di(e = {}, t, n, r) {
	var i = ze.r, a = G;
	return bn(() => {
		var o, s;
		return Sn(() => {
			o = s, s = r?.() || [], ur(() => {
				ui(n(...s), e) || (t(e, ...s), o && ui(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ui(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function fi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ ht(r), K(u)) : (l && (l = !1, c = s ? ur(r) : r), c);
	let f;
	if (o) {
		var p = re in e || ie in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = tt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ve(t), f(m)));
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
	var v = !1, y = (n & 1 ? ht : vt)(() => (v = !1, g()));
	o && K(y);
	var b = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? K(y) : i && o ? Qt(e) : e;
			return B(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Rn && v || b.f & 16384 ? y.v : K(y);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function pi(e, t) {
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
var mi = /* @__PURE__ */ J("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), hi = /* @__PURE__ */ J("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), gi = /* @__PURE__ */ J("<button type=\"button\"></button>"), _i = /* @__PURE__ */ J("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), vi = /* @__PURE__ */ J("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), yi = /* @__PURE__ */ J("<span class=\"cp-tokens svelte-zxiloo\"></span>"), bi = /* @__PURE__ */ J("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), xi = /* @__PURE__ */ J("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Si = /* @__PURE__ */ J("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), Ci = /* @__PURE__ */ J("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function wi(e, t) {
	Ve(t, !0);
	let n = fi(t, "value", 3, "#000000"), r = fi(t, "tokens", 19, () => []), i = fi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ z(Qt([])), u = /* @__PURE__ */ z(Qt([])), d = "", f = "", p = /* @__PURE__ */ z(null), h = /* @__PURE__ */ z(!1), g = /* @__PURE__ */ z(Qt({
		top: 0,
		left: 0
	})), _ = /* @__PURE__ */ z(0), v = /* @__PURE__ */ z(0), y = /* @__PURE__ */ z(1), b = /* @__PURE__ */ z(1), x = /* @__PURE__ */ z("#000000");
	function S(e) {
		let t = /^#?([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(String(e).trim());
		if (!t) return null;
		let n = parseInt(t[1], 16), r = t[2] ? parseInt(t[2], 16) / 255 : 1;
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255,
			r
		];
	}
	let ee = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function C(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function w(e, t, n) {
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
	function T() {
		return ee(...w(K(_), K(v), K(y)));
	}
	function E() {
		let e = T();
		return K(b) >= .995 ? e : e + Math.round(K(b) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		B(x, E(), !0), f = K(x), t.onchange?.(K(x));
	}
	function ne(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			B(_, t[0], !0), B(v, t[1], !0), B(y, t[2], !0);
		})(C(t[0], t[1], t[2])), B(b, t[3], !0), B(x, E(), !0), !0) : !1;
	}
	function re() {
		ne(s()) || ne("#000000"), d = n(), f = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			B(l, Array.isArray(e) ? e : [], !0);
		} catch {
			B(l, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			B(u, Array.isArray(e) ? e : [], !0);
		} catch {
			B(u, [], !0);
		}
		let e = K(p).getBoundingClientRect(), t = K(p).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), c = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		B(g, {
			top: c,
			left: i
		}, !0), B(h, !0);
	}
	function ie() {
		if (B(h, !1), f && f !== d) {
			let e = [f, ...K(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function D(e, n) {
		ne(n), B(x, n, !0), t.onchange?.(e);
	}
	function ae(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			B(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), B(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function oe(e) {
		ne(e.target.value) ? te() : B(x, T(), !0);
	}
	function se(e) {
		return (S(T()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ce(e, t) {
		let n = S(T()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			B(_, t[0], !0), B(v, t[1], !0), B(y, t[2], !0);
		})(C(...n)), te();
	}
	let le = typeof window < "u" && "EyeDropper" in window;
	async function ue() {
		try {
			ne((await new window.EyeDropper().open()).sRGBHex) && te();
		} catch {}
	}
	function de(e) {
		ne(e) && te();
	}
	function fe() {
		let e = E();
		K(u).includes(e) || (B(u, [e, ...K(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(Le(K(u)))));
	}
	function pe(e) {
		B(u, K(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(Le(K(u))));
	}
	_n(() => {
		if (!K(h)) return;
		let e = (e) => {
			K(p) && !K(p).contains(e.target) && ie();
		}, t = (e) => {
			e.key === "Escape" && ie();
		}, n = () => ie();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var me = Ci(), he = V(me);
	let ge;
	var _e = U(he, 2), ve = (e) => {
		var t = Si(), i = V(t), a = V(i);
		N(i);
		var o = U(i, 2);
		Q(o);
		var s = U(o, 2);
		Q(s);
		var d = U(s, 2), f = V(d), p = U(f, 2);
		Q(p);
		var h = U(p, 2), S = (e) => {
			var t = mi();
			q("click", t, ue), Y(e, t);
		};
		Z(h, (e) => {
			le && e(S);
		}), N(d);
		var ee = U(d, 2);
		Lr(ee, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = hi();
			Q(r), W((e) => {
				ri(r, "title", t), $(r, e);
			}, [() => se(K(n))]), q("change", r, (e) => ce(K(n), e.target.value)), Y(e, r);
		}), N(ee);
		var C = U(ee, 2), w = (e) => {
			var t = _i(), i = H(t), a = U(V(i)), o = (e) => {
				var t = Er();
				W((e) => X(t, `- koblet til «${e ?? ""}»`), [() => c()]), Y(e, t);
			}, s = /* @__PURE__ */ I(() => c());
			Z(a, (e) => {
				K(s) && e(o);
			}), N(i);
			var l = U(i, 2);
			Lr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ I(() => m(K(t), 2));
				let i = () => K(r)[0], a = () => K(r)[1];
				var o = gi();
				let s;
				W(() => {
					s = Yr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Zr(o, `background: ${a() ?? ""}`), ri(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), q("click", o, () => D(i(), a())), Y(e, o);
			}), N(l), Y(e, t);
		};
		Z(C, (e) => {
			r().length && e(w);
		});
		var E = U(C, 2), ne = U(V(E));
		N(E);
		var re = U(E, 2), ie = (e) => {
			var t = yi();
			Lr(t, 20, () => K(u), (e) => e, (e, t) => {
				var n = vi(), r = V(n), i = U(r, 2);
				N(n), W(() => {
					Zr(r, `background: ${t ?? ""}`), ri(r, "title", t);
				}), q("click", r, () => de(t)), q("click", i, () => pe(t)), Y(e, n);
			}), N(t), Y(e, t);
		};
		Z(re, (e) => {
			K(u).length && e(ie);
		});
		var me = U(re, 2), he = (e) => {
			var t = xi(), n = U(H(t), 2);
			Lr(n, 20, () => K(l), (e) => e, (e, t) => {
				var n = bi();
				W(() => {
					Zr(n, `background: ${t ?? ""}`), ri(n, "title", t);
				}), q("click", n, () => de(t)), Y(e, n);
			}), N(n), Y(e, t);
		};
		Z(me, (e) => {
			K(l).length && e(he);
		}), N(t), W((e, n) => {
			Zr(t, `top: ${K(g).top ?? ""}px; left: ${K(g).left ?? ""}px`), Zr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${K(_) ?? ""}, 100%, 50%)`), Zr(a, `left: ${K(v) * 100}%; top: ${(1 - K(y)) * 100}%`), $(o, K(_)), $(s, e), Zr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Zr(f, `background: ${K(x) ?? ""}`), $(p, K(x));
		}, [() => Math.round(K(b) * 100), () => T()]), q("click", t, (e) => e.preventDefault()), q("pointerdown", i, ae), q("input", o, (e) => {
			B(_, Number(e.target.value), !0), te();
		}), q("input", s, (e) => {
			B(b, Number(e.target.value) / 100), te();
		}), q("change", p, oe), q("click", ne, fe), Y(e, t);
	};
	Z(_e, (e) => {
		K(h) && e(ve);
	}), N(me), di(me, (e) => B(p, e), () => K(p)), W((e, t, n) => {
		ge = Yr(he, 1, "cp-swatch svelte-zxiloo", null, ge, e), Zr(he, `background: ${t ?? ""}`), ri(he, "title", n), ri(he, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), q("click", he, () => K(h) ? ie() : re()), Y(e, me), He();
}
yr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Ti = 1600, Ei = .82, Di = .6;
async function Oi(e, t = Ti) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Ei);
	return c.size > 4e5 && (c = await s(Di)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function ki(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Ai(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/glyphs.js
var ji = "urd-recent-glyphs", Mi = [
	["Symboler", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
	["Piler", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
	["Smilefjes", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
	["Gester og folk", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
	["Natur", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
	["Mat og drikke", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
	["Aktivitet", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
	["Objekter", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
	["Hjerter", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
];
function Ni(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Pi() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Fi(e) {
	let t = Ni(Pi(), e);
	try {
		localStorage.setItem(ji, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/icons.js
var Ii = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Li = "fill=\"currentColor\" stroke=\"none\"", Ri = {
	facebook: {
		label: "Facebook",
		body: "<path d=\"M15.5 4H13a3.5 3.5 0 0 0-3.5 3.5V10H7v3.2h2.5V20h3.2v-6.8h2.5l.55-3.2h-3.05V7.8c0-.5.4-.8.9-.8h1.9z\"/>"
	},
	instagram: {
		label: "Instagram",
		body: "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"4.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.8\"/><circle cx=\"16.9\" cy=\"7.1\" r=\"1.1\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	x: {
		label: "X (Twitter)",
		body: "<path d=\"M5 4h3.8l4 5.4L17.4 4h2.4l-5.9 6.9L20.5 20h-3.8l-4.3-5.8L7.4 20H5l6.3-7.4z\"/>",
		fill: !0
	},
	linkedin: {
		label: "LinkedIn",
		body: "<circle cx=\"4.8\" cy=\"4.8\" r=\"1.7\"/><path d=\"M3.3 9.2h3v11h-3z\"/><path d=\"M9.7 20.2v-11h3v1.6a3.9 3.9 0 0 1 3.3-1.8c2.6 0 4.4 1.8 4.4 4.9v6.3h-3.1v-5.7c0-1.6-.7-2.6-2-2.6-1.4 0-2.5 1-2.5 2.7v5.6z\"/>"
	},
	youtube: {
		label: "YouTube",
		body: "<rect x=\"2.8\" y=\"5.7\" width=\"18.4\" height=\"12.6\" rx=\"3.6\"/><path d=\"M10.2 9.3l5 2.7-5 2.7z\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	tiktok: {
		label: "TikTok",
		body: "<path d=\"M13.8 5v9.3a3.9 3.9 0 1 1-3.9-3.9\"/><path d=\"M13.8 5c.5 2.9 2.6 4.8 5.6 5v3.1c-2.1-.1-4-.8-5.6-2\"/>"
	},
	whatsapp: {
		label: "WhatsApp",
		body: "<path d=\"M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z\"/><path d=\"M9.2 8.4l1 2-.8 1a7.3 7.3 0 0 0 3.2 3.2l1-.8 2 1c-.3 1.3-1.2 1.9-2.4 1.7-2.9-.5-5.2-2.8-5.7-5.7-.2-1.2.4-2.1 1.7-2.4z\"/>"
	},
	snapchat: {
		label: "Snapchat",
		body: "<path d=\"M12 3.2c-2.9 0-4.9 2.1-4.9 5v2.1c-.8.3-1.7.3-2.5.1.3 1 1.1 1.8 2.2 2-.4 1.4-1.5 2.5-3 2.8 1 1.2 2.6 1.9 4.3 1.8.9 1.2 2.3 1.9 3.9 1.9s3-.7 3.9-1.9c1.7.1 3.3-.6 4.3-1.8-1.5-.3-2.6-1.4-3-2.8 1.1-.2 1.9-1 2.2-2-.8.2-1.7.2-2.5-.1V8.2c0-2.9-2-5-4.9-5z\"/>"
	},
	pinterest: {
		label: "Pinterest",
		body: "<path d=\"M9.2 20.5c.4-1.6 1.4-5.6 1.9-7.6\"/><path d=\"M10.4 14.2c.4.9 1.4 1.5 2.6 1.5 2.6 0 4.4-2.2 4.4-5a5.4 5.4 0 1 0-10.4 2.1\"/>"
	},
	spotify: {
		label: "Spotify",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M7.6 9.6c3-.9 6.6-.6 9.1.9\"/><path d=\"M8 12.5c2.5-.7 5.4-.4 7.5.8\"/><path d=\"M8.5 15.2c2-.5 4.2-.3 5.9.7\"/>"
	},
	discord: {
		label: "Discord",
		body: "<path d=\"M8 3.9c-1.6.3-3.1.9-4.5 1.7-1.5 3.2-2.1 6.6-1.7 10a12.7 12.7 0 0 0 5 2.6l1-1.9a11 11 0 0 0 8.4 0l1 1.9a12.7 12.7 0 0 0 5-2.6c.4-3.4-.2-6.8-1.7-10A14 14 0 0 0 16 3.9l-.6 1.4a15 15 0 0 0-6.8 0z\"/><circle cx=\"9.3\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14.7\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	github: {
		label: "GitHub",
		body: "<path d=\"M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.6-.2.6-.4v-1.7c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.2-1-4.2-4.5 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.7 1 1.5 1 2.5 0 3.5-2.2 4.3-4.2 4.5.3.3.6.9.6 1.8v2.6c0 .2.1.5.6.4A9.2 9.2 0 0 0 12 2.8z\"/>",
		fill: !0
	},
	mail: {
		label: "E-post",
		body: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><path d=\"M3.5 7l8.5 6 8.5-6\"/>"
	},
	phone: {
		label: "Telefon",
		body: "<path d=\"M21.2 16.9v2.6a1.8 1.8 0 0 1-2 1.8 18 18 0 0 1-7.8-2.8 17.7 17.7 0 0 1-5.4-5.4A18 18 0 0 1 3.2 5.2a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8z\"/>"
	},
	smartphone: {
		label: "Mobil",
		body: "<rect x=\"7\" y=\"2.8\" width=\"10\" height=\"18.4\" rx=\"2.5\"/><line x1=\"10.8\" y1=\"18.2\" x2=\"13.2\" y2=\"18.2\"/>"
	},
	chat: {
		label: "Snakkeboble",
		body: "<path d=\"M20.8 12a8.5 8.5 0 0 1-12.4 7.5L4 20.6l1.1-4.2A8.5 8.5 0 1 1 20.8 12z\"/>"
	},
	send: {
		label: "Send",
		body: "<path d=\"M21 3.5L10.4 14.1\"/><path d=\"M21 3.5l-6.8 17-3.8-6.4L4 10.3z\"/>"
	},
	globe: {
		label: "Nettside",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M3.2 12h17.6\"/><path d=\"M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z\"/>"
	},
	rss: {
		label: "RSS-feed",
		body: "<path d=\"M4.5 11a8.5 8.5 0 0 1 8.5 8.5\"/><path d=\"M4.5 5.5a14 14 0 0 1 14 14\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	"map-pin": {
		label: "Kartnål",
		body: "<path d=\"M12 21.5s7-6.2 7-11.3A7 7 0 1 0 5 10.2c0 5.1 7 11.3 7 11.3z\"/><circle cx=\"12\" cy=\"10\" r=\"2.6\"/>"
	},
	map: {
		label: "Kart",
		body: "<path d=\"M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z\"/><path d=\"M9 4v14\"/><path d=\"M15 6v14\"/>"
	},
	home: {
		label: "Hjem",
		body: "<path d=\"M4 10.5l8-7 8 7V20a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20z\"/><path d=\"M9.5 21.5V14h5v7.5\"/>"
	},
	clock: {
		label: "Klokke",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 7v5l3.2 2\"/>"
	},
	calendar: {
		label: "Kalender",
		body: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2.5\"/><path d=\"M3.5 10h17\"/><path d=\"M8 2.8V7\"/><path d=\"M16 2.8V7\"/>"
	},
	heart: {
		label: "Hjerte",
		body: "<path d=\"M12 20.5S3.5 15.4 3.5 9.5A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.5c0 5.9-8.5 11-8.5 11z\"/>"
	},
	star: {
		label: "Stjerne",
		body: "<path d=\"M12 3.5l2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z\"/>"
	},
	check: {
		label: "Hake",
		body: "<path d=\"M4.5 12.8L9.5 18 19.5 6.5\"/>"
	},
	cross: {
		label: "Kryss",
		body: "<path d=\"M6 6l12 12\"/><path d=\"M18 6L6 18\"/>"
	},
	plus: {
		label: "Pluss",
		body: "<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>"
	},
	info: {
		label: "Info",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 11v5.5\"/><line x1=\"12\" y1=\"7.8\" x2=\"12\" y2=\"7.8\"/>"
	},
	question: {
		label: "Spørsmål",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M9.4 9.2A2.7 2.7 0 0 1 12 7.4c1.5 0 2.7 1 2.7 2.4 0 1.8-2.7 2-2.7 4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	warning: {
		label: "Advarsel",
		body: "<path d=\"M12 4L2.8 19.5h18.4z\"/><path d=\"M12 10v4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	zap: {
		label: "Lyn",
		body: "<path d=\"M13 2.8L4.5 13.5H11l-1 7.7 8.5-10.7H12z\"/>"
	},
	sun: {
		label: "Sol",
		body: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7\"/>"
	},
	moon: {
		label: "Måne",
		body: "<path d=\"M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z\"/>"
	},
	leaf: {
		label: "Blad",
		body: "<path d=\"M5 19C5 9 11 4.5 20 4.5c0 9-4.5 15-13 14.5z\"/><path d=\"M5 19c2-5.5 5.5-9 10-11\"/>"
	},
	music: {
		label: "Musikk",
		body: "<circle cx=\"7\" cy=\"17.5\" r=\"2.8\"/><circle cx=\"17\" cy=\"15.5\" r=\"2.8\"/><path d=\"M9.8 17.5V6.5l10-2v11\"/>"
	},
	camera: {
		label: "Kamera",
		body: "<path d=\"M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.7-2.3h5.6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/>"
	},
	image: {
		label: "Bilde",
		body: "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"2.5\"/><circle cx=\"8.8\" cy=\"9.3\" r=\"1.6\"/><path d=\"M20.5 15.5l-4.7-4.7-9.3 8.7\"/>"
	},
	document: {
		label: "Dokument",
		body: "<path d=\"M13.5 3H6.8A1.8 1.8 0 0 0 5 4.8v14.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V8.5z\"/><path d=\"M13.5 3v5.5H19\"/><path d=\"M8.5 13h7M8.5 16.5h7\"/>"
	},
	"shopping-bag": {
		label: "Handlepose",
		body: "<path d=\"M5.5 8h13l-1 12a1.8 1.8 0 0 1-1.8 1.5H8.3A1.8 1.8 0 0 1 6.5 20z\"/><path d=\"M8.8 10.5V7a3.2 3.2 0 0 1 6.4 0v3.5\"/>"
	},
	gift: {
		label: "Gave",
		body: "<rect x=\"3.5\" y=\"8\" width=\"17\" height=\"4\"/><path d=\"M5 12v8.5h14V12\"/><path d=\"M12 8v12.5\"/><path d=\"M12 8s-4.5.3-5.5-1.8C5.8 4.7 7.8 3.3 9.3 4.4 10.8 5.5 12 8 12 8z\"/><path d=\"M12 8s4.5.3 5.5-1.8c.7-1.5-1.3-2.9-2.8-1.8C13.2 5.5 12 8 12 8z\"/>"
	},
	wrench: {
		label: "Verktøy",
		body: "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z\"/>"
	},
	lock: {
		label: "Lås",
		body: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3\"/>"
	},
	search: {
		label: "Søk",
		body: "<circle cx=\"10.8\" cy=\"10.8\" r=\"6.8\"/><path d=\"M15.8 15.8L21 21\"/>"
	},
	user: {
		label: "Person",
		body: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20.5a7.5 7.5 0 0 1 15 0\"/>"
	},
	users: {
		label: "Personer",
		body: "<circle cx=\"9\" cy=\"8.5\" r=\"3.5\"/><path d=\"M2.8 20a6.2 6.2 0 0 1 12.4 0\"/><path d=\"M16 5.4a3.5 3.5 0 0 1 0 6.2\"/><path d=\"M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4\"/>"
	},
	"thumbs-up": {
		label: "Tommel opp",
		body: "<path d=\"M3.5 10.5H7v10H3.5z\"/><path d=\"M7 19.5V11l4.2-5.6a1.7 1.7 0 0 1 3 1.4l-.9 3.7h4.8a2 2 0 0 1 2 2.4l-1.2 5.5a2 2 0 0 1-2 1.6H8.6\"/>"
	},
	"arrow-right": {
		label: "Pil høyre",
		body: "<path d=\"M4 12h16\"/><path d=\"M13.5 5.5L20 12l-6.5 6.5\"/>"
	},
	"arrow-left": {
		label: "Pil venstre",
		body: "<path d=\"M20 12H4\"/><path d=\"M10.5 5.5L4 12l6.5 6.5\"/>"
	},
	"arrow-up": {
		label: "Pil opp",
		body: "<path d=\"M12 20V4\"/><path d=\"M5.5 10.5L12 4l6.5 6.5\"/>"
	},
	"arrow-down": {
		label: "Pil ned",
		body: "<path d=\"M12 4v16\"/><path d=\"M5.5 13.5L12 20l6.5-6.5\"/>"
	},
	"external-link": {
		label: "Ekstern lenke",
		body: "<path d=\"M9.5 5H5.8A1.8 1.8 0 0 0 4 6.8v11.4A1.8 1.8 0 0 0 5.8 20h11.4a1.8 1.8 0 0 0 1.8-1.8v-3.7\"/><path d=\"M13.5 4H20v6.5\"/><path d=\"M20 4l-9 9\"/>"
	},
	download: {
		label: "Nedlasting",
		body: "<path d=\"M12 3.5v11\"/><path d=\"M6.5 9l5.5 5.5L17.5 9\"/><path d=\"M4 20.5h16\"/>"
	},
	share: {
		label: "Deling",
		body: "<circle cx=\"6\" cy=\"12\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"5.5\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"18.5\" r=\"2.6\"/><path d=\"M8.4 10.8l6.8-4M8.4 13.2l6.8 4\"/>"
	}
}, zi = [
	["Sosiale medier", [
		"facebook",
		"instagram",
		"x",
		"linkedin",
		"youtube",
		"tiktok",
		"whatsapp",
		"snapchat",
		"pinterest",
		"spotify",
		"discord",
		"github"
	]],
	["Kommunikasjon", [
		"mail",
		"phone",
		"smartphone",
		"chat",
		"send",
		"globe",
		"rss"
	]],
	["Sted og tid", [
		"map-pin",
		"map",
		"home",
		"clock",
		"calendar"
	]],
	["Symboler", [
		"heart",
		"star",
		"check",
		"cross",
		"plus",
		"info",
		"question",
		"warning",
		"zap",
		"sun",
		"moon",
		"leaf",
		"music",
		"camera",
		"image",
		"document",
		"shopping-bag",
		"gift",
		"wrench",
		"lock",
		"search",
		"user",
		"users",
		"thumbs-up"
	]],
	["Piler", [
		"arrow-right",
		"arrow-left",
		"arrow-up",
		"arrow-down",
		"external-link",
		"download",
		"share"
	]]
];
function Bi(e) {
	let t = typeof e == "string" ? Ri[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Li : Ii} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Vi = /* @__PURE__ */ J("<img class=\"gp-own svelte-15ln1c3\" alt=\"Eget ikon\"/>"), Hi = /* @__PURE__ */ J("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Ui = /* @__PURE__ */ J("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Wi = /* @__PURE__ */ J("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Gi = /* @__PURE__ */ J("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ki = /* @__PURE__ */ J("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), qi = /* @__PURE__ */ J("<button type=\"button\"> </button>"), Ji = /* @__PURE__ */ J("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Yi = /* @__PURE__ */ J("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Xi = /* @__PURE__ */ J("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Zi(e, t) {
	Ve(t, !0);
	let n = fi(t, "value", 3, "★"), r = fi(t, "icon", 3, null), i = fi(t, "image", 3, null), a = fi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ z(Qt([])), s = /* @__PURE__ */ z(null), c = /* @__PURE__ */ z(null), l = /* @__PURE__ */ z(!1), u = /* @__PURE__ */ z(Qt({
		top: 0,
		left: 0
	}));
	function d() {
		B(o, Pi(), !0);
		let e = K(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		B(u, {
			top: n,
			left: t
		}, !0), B(l, !0);
	}
	function f(e) {
		Fi(e), t.onpick?.(e), B(l, !1);
	}
	function p(e) {
		t.onicon?.(e), B(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Oi(n, 256);
		t.onimage?.(r.dataUrl), B(l, !1);
	}
	_n(() => {
		if (!K(l)) return;
		let e = (e) => {
			K(s) && !K(s).contains(e.target) && B(l, !1);
		}, t = (e) => {
			e.key === "Escape" && B(l, !1);
		}, n = (e) => {
			K(s) && e.target instanceof Node && !K(s).contains(e.target) && B(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = Xi(), _ = V(g), v = V(_), y = (e) => {
		var t = Vi();
		W(() => ri(t, "src", i())), Y(e, t);
	}, b = (e) => {
		var t = Hi();
		Ur(t, () => Bi(r()), !0), N(t), Y(e, t);
	}, x = (e) => {
		var t = Er();
		W(() => X(t, n() || "★")), Y(e, t);
	};
	Z(v, (e) => {
		i() ? e(y) : r() && Ri[r()] ? e(b, 1) : e(x, -1);
	}), N(_);
	var S = U(_, 2), ee = (e) => {
		var i = Yi(), a = V(i), s = (e) => {
			var t = Wi(), n = U(H(t), 2);
			Lr(n, 20, () => K(o), (e) => e, (e, t) => {
				var n = Ui(), r = V(n, !0);
				N(n), W(() => X(r, t)), q("click", n, () => f(t)), Y(e, n);
			}), N(n), Y(e, t);
		};
		Z(a, (e) => {
			K(o).length && e(s);
		});
		var l = U(a, 2), d = (e) => {
			var t = Dr();
			Lr(H(t), 17, () => zi, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ I(() => m(K(t), 2));
				let i = () => K(n)[0], a = () => K(n)[1];
				var o = Ki(), s = H(o), c = V(s, !0);
				N(s);
				var l = U(s, 2);
				Lr(l, 20, a, (e) => e, (e, t) => {
					var n = Gi();
					let i;
					var a = V(n);
					Ur(a, () => Bi(t), !0), N(a), N(n), W(() => {
						i = Yr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ri(n, "title", Ri[t].label);
					}), q("click", n, () => p(t)), Y(e, n);
				}), N(l), W(() => X(c, i())), Y(e, o);
			}), Y(e, t);
		};
		Z(l, (e) => {
			t.onicon && e(d);
		});
		var g = U(l, 2);
		Lr(g, 17, () => Mi, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ I(() => m(K(t), 2));
			let i = () => K(r)[0], a = () => K(r)[1];
			var o = Ki(), s = H(o), c = V(s, !0);
			N(s);
			var l = U(s, 2);
			Lr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = qi();
				let i;
				var a = V(r, !0);
				N(r), W(() => {
					i = Yr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), X(a, t);
				}), q("click", r, () => f(t)), Y(e, r);
			}), N(l), W(() => X(c, i())), Y(e, o);
		});
		var _ = U(g, 2), v = (e) => {
			var t = Ji(), n = U(H(t), 2), r = U(n, 2);
			di(r, (e) => B(c, e), () => K(c)), P(2), q("click", n, () => K(c).click()), q("change", r, h), Y(e, t);
		};
		Z(_, (e) => {
			t.onimage && e(v);
		}), N(i), W(() => Zr(i, `top: ${K(u).top ?? ""}px; left: ${K(u).left ?? ""}px`)), Y(e, i);
	};
	Z(S, (e) => {
		K(l) && e(ee);
	}), N(g), di(g, (e) => B(s, e), () => K(s)), W(() => {
		ri(_, "title", a()), ri(_, "aria-label", a());
	}), q("click", _, () => K(l) ? B(l, !1) : d()), Y(e, g), He();
}
yr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Qi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n);
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
		sendPlugins(e) {
			r({
				type: "urd-plugins",
				enabled: e
			});
		},
		sendCollections(e) {
			r({
				type: "urd-collections",
				collections: e
			});
		},
		sendViewport(e) {
			r({
				type: "urd-viewport",
				mode: e
			});
		},
		sendCloseMenus() {
			r({ type: "urd-close-menus" });
		},
		sendDuplicate() {
			r({ type: "urd-duplicate" });
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
//#endregion
//#region src/lib/Dropdown.svelte
var $i = /* @__PURE__ */ J("<button type=\"button\"> </button>"), ea = /* @__PURE__ */ J("<div class=\"dd-pop svelte-vtocc6\"></div>"), ta = /* @__PURE__ */ J("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function na(e, t) {
	Ve(t, !0);
	let n = fi(t, "value", 3, null), r = fi(t, "options", 19, () => []), i = fi(t, "title", 3, null), a = fi(t, "disabled", 3, !1), o = /* @__PURE__ */ z(!1), s = /* @__PURE__ */ z(null), c = /* @__PURE__ */ z(Qt({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		if (a()) return;
		if (K(o)) {
			B(o, !1);
			return;
		}
		let e = K(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		B(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0), B(o, !0);
	}
	function d(e) {
		B(o, !1), t.onchange?.(e);
	}
	_n(() => {
		if (!K(o)) return;
		let e = (e) => {
			K(s) && !K(s).contains(e.target) && B(o, !1);
		}, t = (e) => {
			e.key === "Escape" && B(o, !1);
		}, n = (e) => {
			K(s) && e.target instanceof Node && !K(s).contains(e.target) && B(o, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var f = ta(), p = V(f), h = V(p), g = V(h, !0);
	N(h);
	var _ = U(h, 2), v = V(_, !0);
	N(_), N(p);
	var y = U(p, 2), b = (e) => {
		var t = ea();
		Lr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ I(() => m(K(t), 2));
			let i = () => K(r)[0], a = () => K(r)[1];
			var o = $i();
			let s;
			var c = V(o, !0);
			N(o), W(() => {
				s = Yr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), X(c, a());
			}), q("click", o, () => d(i())), Y(e, o);
		}), N(t), W(() => Zr(t, `top: ${K(c).top ?? ""}px; left: ${K(c).left ?? ""}px; min-width: ${K(c).width ?? ""}px`)), Y(e, t);
	};
	Z(y, (e) => {
		K(o) && e(b);
	}), N(f), di(f, (e) => B(s, e), () => K(s)), W((e) => {
		ri(p, "title", i()), p.disabled = a(), X(g, e), X(v, K(o) ? "▴" : "▾");
	}, [() => l()]), q("click", p, u), Y(e, f), He();
}
yr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ra = /* @__PURE__ */ J("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function ia(e, t) {
	Ve(t, !0);
	let n = fi(t, "image", 3, ""), r = /* @__PURE__ */ z(null), i = /* @__PURE__ */ z(null), a = /* @__PURE__ */ z(1), o = /* @__PURE__ */ z(.5), s = /* @__PURE__ */ z(.5), c = /* @__PURE__ */ z(1), l = /* @__PURE__ */ z(1), u = /* @__PURE__ */ z(1);
	_n(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			B(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !K(i)) return;
		e.filter = `brightness(${K(c)}) contrast(${K(l)}) saturate(${K(u)})`;
		let n = Math.max(t / K(i).width, t / K(i).height) * K(a), r = K(i).width * n, d = K(i).height * n, f = t / 2 - K(o) * r, p = t / 2 - K(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(K(i), f, p, r, d), e.filter = "none";
	}
	_n(() => {
		K(i), K(a), K(o), K(s), K(c), K(l), K(u), K(r) && d(K(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!K(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / K(i).width, 220 / K(i).height) * K(a), c = K(i).width * r, l = K(i).height * r, u = (e) => {
			B(o, Math.min(1, Math.max(0, K(o) - (e.clientX - t) / c)), !0), B(s, Math.min(1, Math.max(0, K(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		B(a, 1), B(o, .5), B(s, .5), B(c, 1), B(l, 1), B(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ra(), g = V(h), _ = U(V(g), 2), v = V(_);
	ri(v, "width", 220), ri(v, "height", 220), di(v, (e) => B(r, e), () => K(r)), P(2), N(_);
	var y = U(_, 2), b = U(V(y)), x = V(b);
	N(b), N(y);
	var S = U(y, 2);
	Q(S);
	var ee = U(S, 2), C = U(V(ee)), w = V(C);
	N(C), N(ee);
	var T = U(ee, 2);
	Q(T);
	var E = U(T, 2), te = U(V(E)), ne = V(te);
	N(te), N(E);
	var re = U(E, 2);
	Q(re);
	var ie = U(re, 2), D = U(V(ie)), ae = V(D);
	N(D), N(ie);
	var oe = U(ie, 2);
	Q(oe);
	var se = U(oe, 2), ce = V(se), le = U(ce, 2);
	N(se);
	var ue = U(se, 2), de = V(ue), fe = U(de, 2);
	N(ue), N(g), N(h), W((e, t, n, r) => {
		X(x, `${e ?? ""}x`), X(w, `${t ?? ""}%`), X(ne, `${n ?? ""}%`), X(ae, `${r ?? ""}%`);
	}, [
		() => K(a).toFixed(2),
		() => Math.round(K(c) * 100),
		() => Math.round(K(l) * 100),
		() => Math.round(K(u) * 100)
	]), q("pointerdown", v, f), si(S, () => K(a), (e) => B(a, e)), si(T, () => K(c), (e) => B(c, e)), si(re, () => K(l), (e) => B(l, e)), si(oe, () => K(u), (e) => B(u, e)), q("click", ce, () => B(u, 0)), q("click", le, p), q("click", de, () => t.oncancel?.()), q("click", fe, m), Y(e, h), He();
}
yr(["pointerdown", "click"]);
var aa = (e) => Math.round(e * 100) / 100;
function oa(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var sa = {
	1: (e, t) => {
		for (let n of e.sections ?? []) {
			let e = n.grid ?? t?.grid, r = typeof e?.columns == "number" ? e : {
				columns: 24,
				rowHeight: e?.size ?? e?.rowHeight ?? 8
			};
			for (let e of n.blocks ?? []) for (let t of ["desktop", "mobile"]) {
				let n = e.frames?.[t];
				n && (e.frames[t] = {
					...n,
					x: aa(n.x * 100 / r.columns),
					w: aa(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= oa(t.grid);
		return e;
	}
}, ca = { 1: (e) => (e.grid = oa(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function la(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ca[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function ua(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = sa[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function da(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var fa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function pa(e, t) {
	let n = da(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = da(t[2]), a = fa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ma = /^[a-z0-9][a-z0-9-]*$/;
function ha(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ma.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), da(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function ga(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function _a(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var va = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = _a(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, ya = {
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
		let n = t.stops.map(_a).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, ba = {
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
		let n = _a(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, xa = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Sa = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = xa, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ca = {
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
};
//#endregion
//#region ../template/assets/engine/galleri-model.js
function wa(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ta({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ea(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/backgrounds/bildegalleri.js
var Da = {
	version: 1,
	label: "Bildegalleri",
	defaults: () => ({
		images: [],
		fit: "cover",
		interval: 6,
		fade: 1.5,
		opacity: 1,
		blur: 0
	}),
	migrations: {},
	render(e, t) {
		let n = (t.images ?? []).filter((e) => e?.src);
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = `${(n.x ?? .5) * 100}% ${(n.y ?? .5) * 100}%`;
		}, a = new Image();
		if (a.src = n[0].src, !a.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			a.addEventListener("load", t, { once: !0 }), a.addEventListener("error", t, { once: !0 });
		}
		let o = document.createElement("div");
		o.className = "urd-bg-slide on", i(o, n[0]), e.appendChild(o);
		let s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!Ta({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Ea(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = wa(l, 1, n.length), r = new Image();
			r.src = n[t].src;
			let a = () => {
				if (!e.isConnected) return;
				let r = u === o ? c : o;
				i(r, n[t]), r.classList.add("on"), u.classList.remove("on"), u = r, l = t;
			};
			r.complete ? a() : (r.addEventListener("load", a, { once: !0 }), r.addEventListener("error", () => {
				l = t;
			}, { once: !0 }));
		}, d);
	}
}, Oa = () => ({
	duration: 600,
	delay: 0
}), ka = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Oa,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Oa,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Oa,
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
//#region ../template/assets/engine/fonts.js
var Aa = [
	["System", "system-ui, sans-serif"],
	["Arial", "Arial, Helvetica, sans-serif"],
	["Verdana", "Verdana, Geneva, sans-serif"],
	["Trebuchet", "'Trebuchet MS', sans-serif"],
	["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
	["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
	["Courier (skrivemaskin)", "'Courier New', monospace"]
], ja = [
	["S", 14],
	["M", 18],
	["L", 24],
	["XL", 36]
], Ma = /* @__PURE__ */ J("<button> </button>"), Na = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <label title=\"Avstanden mellom tekstlinjene, i forhold til skriftstørrelsen\" class=\"svelte-1n46o8q\">Linjeavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"1\" max=\"2.5\" step=\"0.05\"/></span> <label title=\"Avstanden mellom bokstavene; negativ er tettere enn normalt\" class=\"svelte-1n46o8q\">Bokstavavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"-1\" max=\"8\" step=\"0.1\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font, størrelse og avstandene gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Pa = /* @__PURE__ */ J("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Fa = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), Ia = /* @__PURE__ */ J("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), La = /* @__PURE__ */ J("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), Ra = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), za = /* @__PURE__ */ J("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), Ba = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), Va = /* @__PURE__ */ J("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), Ha = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Ua = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), Wa = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ga = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Ka = /* @__PURE__ */ J("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), qa = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), Ja = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ya = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Xa = /* @__PURE__ */ J("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Za = /* @__PURE__ */ J("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), Qa = /* @__PURE__ */ J("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), $a = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), eo = /* @__PURE__ */ J("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), to = /* @__PURE__ */ J("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), no = /* @__PURE__ */ J("<!> Ren visning", 1), ro = /* @__PURE__ */ J("<!> Rediger", 1), io = /* @__PURE__ */ J("<span class=\"who svelte-1n46o8q\"><!> </span>"), ao = /* @__PURE__ */ J("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), oo = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), so = /* @__PURE__ */ J("<hr class=\"rail-sep svelte-1n46o8q\"/>"), co = /* @__PURE__ */ J("<!> <!>", 1), lo = /* @__PURE__ */ J("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), uo = /* @__PURE__ */ J("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), fo = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), po = /* @__PURE__ */ J("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), mo = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), ho = /* @__PURE__ */ J("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), go = /* @__PURE__ */ J("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), _o = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), vo = /* @__PURE__ */ J("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), yo = /* @__PURE__ */ J("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), bo = /* @__PURE__ */ J("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label>"), xo = /* @__PURE__ */ J("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), So = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\"> <!></label>"), Co = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bakgrunnsbildet\"></button>"), wo = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Bildestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (høyde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i høyden: 0 = toppen, 100 = bunnen. Monner mest i topplinjen\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (bredde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i bredden: 0 = venstre, 100 = høyre. Monner mest i sidestilt kolonne\" class=\"svelte-1n46o8q\"/>", 1), To = /* @__PURE__ */ J("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), Eo = /* @__PURE__ */ J("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: undermenyen og mobilpanelet får kun bakgrunnsfargen, ikke bildet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Bakgrunnsbilde også i undermenyen</label>"), Do = /* @__PURE__ */ J("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Oo = /* @__PURE__ */ J("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), ko = /* @__PURE__ */ J("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Ao = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <label title=\"0 % = helt tett flate, 100 % = helt gjennomsiktig meny\" class=\"svelte-1n46o8q\">Gjennomsiktighet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når gjennomsiktigheten er høy)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Bakgrunnsfargen med gjennomsiktigheten legger seg som et slør over bildet; komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label> <!></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), jo = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), Mo = /* @__PURE__ */ J("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), No = /* @__PURE__ */ J("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), Po = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), Fo = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), Io = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\"> </button>"), Lo = /* @__PURE__ */ J("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ro = /* @__PURE__ */ J("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), zo = /* @__PURE__ */ J("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), Bo = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Vo = /* @__PURE__ */ J("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Ho = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Uo = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Wo = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), Go = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ko = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), qo = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Jo = /* @__PURE__ */ J("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Yo = /* @__PURE__ */ J("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Xo = /* @__PURE__ */ J("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), Zo = /* @__PURE__ */ J("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), Qo = /* @__PURE__ */ J("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), $o = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), es = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), ts = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), ns = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Samling <!></label>"), rs = /* @__PURE__ */ J("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), is = /* @__PURE__ */ J("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), as = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), os = /* @__PURE__ */ J("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ss = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), cs = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), ls = /* @__PURE__ */ J("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), us = /* @__PURE__ */ J("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), ds = /* @__PURE__ */ J("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), fs = /* @__PURE__ */ J("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), ps = /* @__PURE__ */ J("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), ms = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), hs = /* @__PURE__ */ J("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), gs = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), _s = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), vs = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), ys = /* @__PURE__ */ J("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), bs = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), xs = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Ss = /* @__PURE__ */ J("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Cs = /* @__PURE__ */ J("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), ws = /* @__PURE__ */ J("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Ts = /* @__PURE__ */ J("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Es = /* @__PURE__ */ J("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Ds = /* @__PURE__ */ J("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Os = /* @__PURE__ */ J("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), ks = /* @__PURE__ */ J("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), As = /* @__PURE__ */ J("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), js = /* @__PURE__ */ J("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>  <!>", 1);
function Ms(e, t) {
	Ve(t, !0);
	let n = (e) => {
		var t = Za(), n = H(t), r = (e) => {
			var t = Na(), n = H(t), r = U(V(n));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.align ?? "left");
				na(r, {
					get value() {
						return K(e);
					},
					options: [
						["left", "Venstre"],
						["center", "Midtstilt"],
						["right", "Høyre"]
					],
					onchange: (e) => M("align", e)
				});
			}
			N(n);
			var i = U(n, 2), a = V(i);
			Q(a), P(), N(i);
			var o = U(i, 2), s = U(V(o));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.font ?? ""), t = /* @__PURE__ */ I(() => [["", "Arv fra tema"], ...Aa.map(([e, t]) => [t, e])]);
				na(s, {
					get value() {
						return K(e);
					},
					get options() {
						return K(t);
					},
					onchange: (e) => M("font", e || null)
				});
			}
			N(o);
			var c = U(o, 4), l = V(c);
			let u;
			var d = U(l, 2);
			Lr(d, 17, () => ja, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ I(() => m(K(t), 2));
				let r = () => K(n)[0], i = () => K(n)[1];
				var a = Ma();
				let o;
				var s = V(a, !0);
				N(a), W(() => {
					o = Yr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: K(k).props.size === i() }), ri(a, "title", `${i() ?? ""} px`), X(s, r());
				}), q("click", a, () => M("size", i())), Y(e, a);
			});
			var f = U(d, 2);
			Q(f), N(c);
			var p = U(c, 2), h = U(V(p)), g = V(h, !0);
			N(h), N(p);
			var _ = U(p, 2), v = V(_);
			let y;
			var b = U(v, 2);
			Q(b), N(_);
			var x = U(_, 2), S = U(V(x)), ee = V(S, !0);
			N(S), N(x);
			var C = U(x, 2), w = V(C);
			let T;
			var E = U(w, 2);
			Q(E), N(C), P(2), W((e) => {
				ni(a, e), u = Yr(l, 1, "tbtn svelte-1n46o8q", null, u, { active: !K(k).props.size }), $(f, K(k).props.size ?? ""), X(g, K(k).props.lineHeight ? `${K(k).props.lineHeight}` : "Arv"), y = Yr(v, 1, "tbtn svelte-1n46o8q", null, y, { active: !K(k).props.lineHeight }), $(b, K(k).props.lineHeight ?? 1.6), X(ee, typeof K(k).props.letterSpacing == "number" && K(k).props.letterSpacing !== 0 ? `${K(k).props.letterSpacing} px` : "Arv"), T = Yr(w, 1, "tbtn svelte-1n46o8q", null, T, { active: !K(k).props.letterSpacing }), $(E, K(k).props.letterSpacing ?? 0);
			}, [() => !!K(k).props.box]), q("change", a, (e) => M("box", e.target.checked)), q("click", l, () => M("size", null)), q("change", f, (e) => M("size", e.target.value ? Number(e.target.value) : null)), q("click", v, () => M("lineHeight", null)), q("input", b, (e) => M("lineHeight", Number(e.target.value))), q("click", w, () => M("letterSpacing", null)), q("input", E, (e) => M("letterSpacing", Number(e.target.value) || null)), Y(e, t);
		}, i = (e) => {
			var t = Fa(), n = H(t), r = U(V(n));
			Q(r), N(n);
			var i = U(n, 2), a = U(V(i));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.page ?? "__href"), t = /* @__PURE__ */ I(() => [...K(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				na(a, {
					get value() {
						return K(e);
					},
					get options() {
						return K(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						j(`edit:${K(k).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			N(i);
			var o = U(i, 2), s = (e) => {
				var t = Pa();
				Q(t), W(() => $(t, K(k).props.href === "#" ? "" : K(k).props.href ?? "")), q("change", t, (e) => M("href", e.target.value || null)), Y(e, t);
			};
			Z(o, (e) => {
				K(k).props.page || e(s);
			});
			var c = U(o, 2);
			na(U(V(c)), {
				get value() {
					return K(k).props.style;
				},
				options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
				onchange: (e) => M("style", e)
			}), N(c), W(() => $(r, K(k).props.label)), q("change", r, (e) => M("label", e.target.value)), Y(e, t);
		}, o = (e) => {
			var t = La(), n = H(t), r = U(V(n));
			N(n);
			var i = U(n, 2), a = U(V(i));
			Q(a), N(i);
			var o = U(i, 2), s = U(V(o));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.fit ?? "cover");
				na(s, {
					get value() {
						return K(e);
					},
					options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
					onchange: (e) => M("fit", e)
				});
			}
			N(o);
			var c = U(o, 2), l = U(V(c));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.radius ?? "");
				na(l, {
					get value() {
						return K(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => M("radius", e || null)
				});
			}
			N(c);
			var u = U(c, 2), d = U(V(u));
			Q(d), N(u);
			var f = U(u, 2), p = (e) => {
				var t = Ia(), n = V(t);
				Q(n), P(), N(t), W((e) => ni(n, e), [() => !!K(k).props.lightbox]), q("change", n, (e) => M("lightbox", e.target.checked)), Y(e, t);
			};
			Z(f, (e) => {
				K(k).props.href || e(p);
			});
			var m = U(f, 2), h = U(V(m)), g = V(h);
			N(h), N(m);
			var _ = U(m, 2);
			Q(_);
			var v = U(_, 2), y = U(V(v)), b = V(y);
			N(y), N(v);
			var x = U(v, 2);
			Q(x);
			var S = U(x, 2), ee = U(V(S)), C = V(ee);
			N(ee), N(S);
			var w = U(S, 2);
			Q(w);
			var T = U(w, 2), E = U(V(T)), te = V(E);
			N(E), N(T);
			var ne = U(T, 2);
			Q(ne);
			var re = U(ne, 2), ie = U(V(re)), D = V(ie);
			N(ie), N(re);
			var ae = U(re, 2);
			Q(ae);
			var oe = U(ae, 2), se = U(V(oe)), ce = V(se);
			N(se), N(oe);
			var le = U(oe, 2);
			Q(le);
			var ue = U(le, 2);
			W((e, t, n, r, i, o) => {
				$(a, K(k).props.alt ?? ""), $(d, K(k).props.href ?? ""), X(g, `${e ?? ""}%`), $(_, K(k).props.x ?? .5), X(b, `${t ?? ""}%`), $(x, K(k).props.y ?? .5), X(C, `${n ?? ""}x`), $(w, K(k).props.zoom ?? 1), X(te, `${r ?? ""}%`), $(ne, K(k).props.brightness ?? 1), X(D, `${i ?? ""}%`), $(ae, K(k).props.contrast ?? 1), X(ce, `${o ?? ""}%`), $(le, K(k).props.saturate ?? 1);
			}, [
				() => Math.round((K(k).props.x ?? .5) * 100),
				() => Math.round((K(k).props.y ?? .5) * 100),
				() => (K(k).props.zoom ?? 1).toFixed(2),
				() => Math.round((K(k).props.brightness ?? 1) * 100),
				() => Math.round((K(k).props.contrast ?? 1) * 100),
				() => Math.round((K(k).props.saturate ?? 1) * 100)
			]), q("change", r, Me), q("change", a, (e) => M("alt", e.target.value)), q("change", d, (e) => M("href", e.target.value || null)), q("input", _, (e) => M("x", Number(e.target.value))), q("input", x, (e) => M("y", Number(e.target.value))), q("input", w, (e) => M("zoom", Number(e.target.value))), q("input", ne, (e) => M("brightness", Number(e.target.value))), q("input", ae, (e) => M("contrast", Number(e.target.value))), q("input", le, (e) => M("saturate", Number(e.target.value))), q("click", ue, () => j(`edit:${K(k).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), Y(e, t);
		}, s = (e) => {
			var t = Ra(), n = U(H(t), 2);
			Q(n);
			var r = U(n, 2), i = U(V(r));
			Q(i), N(r), P(2), W(() => {
				$(n, K(k).props.url ?? ""), $(i, K(k).props.title ?? "");
			}), q("change", n, (e) => M("url", e.target.value)), q("change", i, (e) => M("title", e.target.value)), Y(e, t);
		}, c = (e) => {
			var t = Ha(), n = H(t), r = U(V(n)), i = V(r);
			{
				let e = /* @__PURE__ */ I(() => K(k).props.glyph ?? "★"), t = /* @__PURE__ */ I(() => K(k).props.icon ?? null), n = /* @__PURE__ */ I(() => K(k).props.image ?? null);
				Zi(i, {
					get value() {
						return K(e);
					},
					get icon() {
						return K(t);
					},
					get image() {
						return K(n);
					},
					onpick: (e) => j(`edit:${K(k).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => j(`edit:${K(k).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => M("image", e)
				});
			}
			var a = U(i, 2), o = (e) => {
				var t = za();
				Q(t), W(() => $(t, K(k).props.glyph ?? "")), q("change", t, (e) => M("glyph", e.target.value || "★")), Y(e, t);
			}, s = (e) => {
				var t = Ba();
				q("click", t, () => M("icon", null)), Y(e, t);
			};
			Z(a, (e) => {
				K(k).props.icon ? e(s, -1) : e(o);
			}), N(r), N(n);
			var c = U(n, 2), l = (e) => {
				var t = Va(), n = H(t), r = V(n), i = U(r, 2);
				N(n), P(2), W(() => ri(r, "src", K(k).props.image)), q("click", i, () => M("image", null)), Y(e, t);
			};
			Z(c, (e) => {
				K(k).props.image && e(l);
			});
			var u = U(c, 2), d = U(V(u));
			Q(d), N(u);
			var f = U(u, 2), p = U(V(f));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.color ?? "accent"), t = /* @__PURE__ */ I(at);
				wi(p, {
					get value() {
						return K(e);
					},
					get tokens() {
						return K(t);
					},
					onchange: (e) => M("color", e)
				});
			}
			N(f), P(2), W(() => $(d, K(k).props.size ?? 48)), q("change", d, (e) => M("size", Number(e.target.value))), Y(e, t);
		}, l = (e) => {
			var t = Ua(), n = H(t), r = U(V(n));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.collection ?? ""), t = /* @__PURE__ */ I(() => [["", "Velg …"], ...K(fn).map((e) => [e, K(pn)[e]?.name ?? e])]);
				na(r, {
					get value() {
						return K(e);
					},
					get options() {
						return K(t);
					},
					onchange: (e) => M("collection", e || null)
				});
			}
			N(n);
			var i = U(n, 2), a = U(V(i));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.view ?? "cards");
				na(a, {
					get value() {
						return K(e);
					},
					options: [
						["cards", "Kort"],
						["list", "Liste"],
						["archive", "Arkiv (per år)"]
					],
					onchange: (e) => M("view", e)
				});
			}
			N(i);
			var o = U(i, 2), s = U(V(o));
			Q(s), N(o);
			var c = U(o, 2), l = V(c);
			Q(l), P(), N(c), P(2), W(() => {
				$(s, K(k).props.limit ?? 6), ni(l, K(k).props.newestFirst !== !1);
			}), q("change", s, (e) => M("limit", Number(e.target.value))), q("change", l, (e) => M("newestFirst", e.target.checked)), Y(e, t);
		}, u = (e) => {
			var t = qa(), n = H(t), r = U(V(n));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.view ?? "grid");
				na(r, {
					get value() {
						return K(e);
					},
					options: [
						["grid", "Rutenett"],
						["carousel", "Karusell"],
						["slides", "Lysbilde (bytter automatisk)"]
					],
					onchange: (e) => M("view", e)
				});
			}
			N(n);
			var i = U(n, 2), o = (e) => {
				var t = Wa(), n = H(t), r = U(V(n));
				Q(r), N(n);
				var i = U(n, 2), a = U(V(i)), o = V(a);
				N(a), N(i);
				var s = U(i, 2);
				Q(s), W(() => {
					$(r, K(k).props.columns ?? 3), X(o, `${K(k).props.gap ?? 12 ?? ""} px`), $(s, K(k).props.gap ?? 12);
				}), q("change", r, (e) => M("columns", Number(e.target.value))), q("input", s, (e) => M("gap", Number(e.target.value))), Y(e, t);
			};
			Z(i, (e) => {
				(K(k).props.view ?? "grid") === "grid" && e(o);
			});
			var s = U(i, 2), c = (e) => {
				var t = Ga(), n = U(V(t));
				Q(n), N(t), W(() => $(n, K(k).props.interval ?? 5)), q("change", n, (e) => M("interval", Number(e.target.value))), Y(e, t);
			};
			Z(s, (e) => {
				K(k).props.view === "slides" && e(c);
			});
			var l = U(s, 2), u = U(V(l));
			{
				let e = /* @__PURE__ */ I(() => K(k).props.radius ?? "");
				na(u, {
					get value() {
						return K(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => M("radius", e || null)
				});
			}
			N(l);
			var d = U(l, 2), f = V(d);
			Q(f), P(), N(d);
			var p = U(d, 4), m = U(V(p));
			N(p), Lr(U(p, 2), 17, () => K(k).props.images ?? [], Nr, (e, t, n) => {
				var r = Ka(), i = V(r), o = V(i), s = U(o, 2), c = V(s);
				c.disabled = n === 0, Ur(c, () => a.up, !0), N(c);
				var l = U(c, 2);
				Ur(l, () => a.down, !0), N(l);
				var u = U(l, 2);
				Ur(u, () => a.cross, !0), N(u), N(s), N(i);
				var d = U(i, 2), f = U(V(d));
				Q(f), N(d);
				var p = U(d, 2), m = U(V(p));
				Q(m), N(p), N(r), W(() => {
					ri(o, "src", K(t).src), l.disabled = n === K(k).props.images.length - 1, $(f, K(t).alt ?? ""), $(m, K(t).href ?? "");
				}), q("click", c, () => ti(n, -1)), q("click", l, () => ti(n, 1)), q("click", u, () => ii(n)), q("change", f, (e) => ai(n, "alt", e.target.value)), q("change", m, (e) => ai(n, "href", e.target.value || null)), Y(e, r);
			}), P(2), W(() => ni(f, K(k).props.lightbox !== !1)), q("change", f, (e) => M("lightbox", e.target.checked)), q("change", m, $r), Y(e, t);
		}, d = (e) => {
			var t = Ja(), n = H(t);
			na(U(V(n)), {
				get value() {
					return K(k).props.kind;
				},
				get options() {
					return Pe;
				},
				onchange: (e) => M("kind", e)
			}), N(n);
			var r = U(n, 2);
			na(U(V(r)), {
				get value() {
					return K(k).props.color;
				},
				get options() {
					return Fe;
				},
				onchange: (e) => M("color", e)
			}), N(r);
			var i = U(r, 2), a = U(V(i));
			Q(a), N(i);
			var o = U(i, 2), s = V(o);
			Q(s), P(), N(o), W((e) => {
				$(a, K(k).props.thickness), ni(s, e);
			}, [() => !!K(k).props.fill]), q("change", a, (e) => M("thickness", Number(e.target.value))), q("change", s, (e) => M("fill", e.target.checked ? K(k).props.color : null)), Y(e, t);
		};
		Z(n, (e) => {
			K(k).type === "text" ? e(r) : K(k).type === "button" ? e(i, 1) : K(k).type === "image" ? e(o, 2) : K(k).type === "video" ? e(s, 3) : K(k).type === "icon" ? e(c, 4) : K(k).type === "samling" ? e(l, 5) : K(k).type === "galleri" ? e(u, 6) : K(k).type === "shape" && e(d, 7);
		});
		var f = U(n, 4), p = U(V(f));
		{
			let e = /* @__PURE__ */ I(() => K(k).animation?.type ?? ""), t = /* @__PURE__ */ I(() => [["", "Ingen"], ...Object.entries(ka).map(([e, t]) => [e, t.label])]);
			na(p, {
				get value() {
					return K(e);
				},
				get options() {
					return K(t);
				},
				onchange: (e) => st(e || null)
			});
		}
		N(f);
		var h = U(f, 2), g = (e) => {
			var t = Ya(), n = H(t), r = U(V(n));
			Q(r), N(n);
			var i = U(n, 2), a = U(V(i));
			Q(a), N(i), P(2), W(() => {
				$(r, K(k).animation.props.duration), $(a, K(k).animation.props.delay);
			}), q("change", r, (e) => ct("duration", Number(e.target.value))), q("change", a, (e) => ct("delay", Number(e.target.value))), Y(e, t);
		};
		Z(h, (e) => {
			K(k).animation && ka[K(k).animation.type]?.entrance && e(g);
		});
		var _ = U(h, 4), v = U(V(_), 2), y = U(V(v), 2), x = (e) => {
			var t = Xa(), n = V(t), r = U(V(n));
			Q(r), N(n);
			var i = U(n, 2), a = U(V(i));
			Q(a), N(i);
			var o = U(i, 2), s = U(V(o));
			Q(s), N(o);
			var c = U(o, 2), l = U(V(c));
			Q(l), N(c);
			var u = U(c, 2), d = U(V(u));
			Q(d), N(u);
			var f = U(u, 2), p = U(V(f));
			Q(p), N(f), N(t), W(() => {
				$(r, K(k).frame.x), $(a, K(k).frame.y), $(s, K(k).frame.w), $(l, K(k).frame.h), $(d, K(k).frame.z ?? 1), $(p, K(k).frame.rot ?? 0);
			}), q("change", r, (e) => Ae("x", Number(e.target.value))), q("change", a, (e) => Ae("y", Number(e.target.value))), q("change", s, (e) => Ae("w", Number(e.target.value))), q("change", l, (e) => Ae("h", Number(e.target.value))), q("change", d, (e) => Ae("z", Number(e.target.value))), q("change", p, (e) => Ae("rot", Number(e.target.value))), Y(e, t);
		};
		Z(y, (e) => {
			K(b) === "desktop" && e(x);
		});
		var S = U(y, 2), ee = V(S);
		Q(ee), P(), N(S), N(v), N(_), W(() => ni(ee, K(k).decor)), q("change", ee, (e) => je(e.target.checked)), Y(e, t);
	}, r = [
		["color", va],
		["gradient", ya],
		["glow", ba],
		["image", Ca],
		["bildegalleri", Da],
		["grain", Sa]
	], i = Object.fromEntries(r), a = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>",
		plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>"
	}, o = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], s = /* @__PURE__ */ z(Qt(localStorage.getItem("urd-admin-theme") ?? "graa"));
	_n(() => {
		document.documentElement.dataset.adminTheme = K(s), localStorage.setItem("urd-admin-theme", K(s));
	});
	let c = /* @__PURE__ */ z(null), l = /* @__PURE__ */ z(null), u = /* @__PURE__ */ z(!1), d = /* @__PURE__ */ z(""), f = /* @__PURE__ */ z("info"), p = 0;
	function h(e, t = "info") {
		B(d, e, !0), B(f, t, !0);
		let n = ++p;
		t === "ok" && setTimeout(() => {
			p === n && (B(d, ""), B(f, "info"));
		}, 8e3);
	}
	let g = /* @__PURE__ */ z(null), _ = /* @__PURE__ */ z(null), v = /* @__PURE__ */ z(Qt({
		size: 16,
		snap: !0
	})), y = /* @__PURE__ */ z(!0), b = /* @__PURE__ */ z("desktop");
	_n(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), _n(() => {
		let e = K(b);
		T?.sendViewport(e);
	});
	let x = /* @__PURE__ */ z(0);
	function S() {
		B(x, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ee(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, S(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ z(null);
	function te() {
		B(E, w.data, !0), w.replace(K(E));
	}
	function ne() {
		T?.sendSite(Le(K(E)));
	}
	let re = /* @__PURE__ */ new Set(), ie = () => K(E).pages.find((e) => e.id === K(l));
	function D() {
		let e = K(E)?.pages?.some((e) => !re.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = un?.hasDraft() || Object.values(dn).some((e) => e.hasDraft());
		B(u, e || C?.hasDraft() && !re.has(K(l)) || w?.hasDraft() || jn?.hasDraft() || t || !1, !0);
	}
	let ae = [], oe = [], se = null;
	function ce() {
		return JSON.stringify({
			pageId: K(l),
			page: C.data,
			site: w.data
		});
	}
	function le(e) {
		e === se && (e.startsWith("edit:") || e.startsWith("grid:")) || (ae.push(ce()), ae.length > 50 && ae.shift(), oe.length = 0, se = e);
	}
	function ue(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), te(), w.save(), B(v, {
			snap: !0,
			...K(E).grid
		}, !0), ne(), t && t !== K(l) && K(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), kt(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), S(), De(), We(C.data.sections.find((e) => e.id === K(Ie))), K(E).pages.some((e) => e.id === K(l)) ? T?.sendPage(K(l), C.data) : kt(K(E).pages[0].id, { keepHistory: !0 });
	}
	function de() {
		ae.length && (oe.push(ce()), ue(ae.pop()), se = null, h("Angret"));
	}
	function fe() {
		oe.length && (ae.push(ce()), ue(oe.pop()), se = null, h("Gjentatt"));
	}
	function pe(e) {
		if (e.key === "Escape" && K(A)) {
			B(A, null);
			return;
		}
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
		if (t === "d") {
			let t = e.target;
			if (t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
				"number",
				"checkbox",
				"range",
				"color"
			].includes(t.type)) || !K(k) || K(b) === "mobile") return;
			e.preventDefault(), T?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? fe() : de());
	}
	async function me() {
		B(c, la(await (await fetch("/content/site.json")).json()), !0), w = pi("urd-draft-site", () => K(c)), w.replace(la(w.data)), w.save(), te(), B(v, {
			snap: !0,
			...K(E).grid
		}, !0), await kt(new URLSearchParams(location.search).get("page") ?? K(E).pages[0].id), await G(), await yn(), await gt(), vt(), (K(E).site.setup === !0 || K(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (B(ye, K(E).site.title, !0), B(be, K(E).theme.tokens.color.accent, !0), B(xe, K(E).theme.tokens.color.bg, !0), B(ve, !0));
	}
	let he = /* @__PURE__ */ z(null);
	function ge({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			B(he, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function _e(e) {
		K(he)?.resolve(e), B(he, null);
	}
	let ve = /* @__PURE__ */ z(!1), ye = /* @__PURE__ */ z(""), be = /* @__PURE__ */ z("#7c5cff"), xe = /* @__PURE__ */ z("#0b0e14");
	function Se() {
		localStorage.setItem("urd-setup-done", "1"), B(ve, !1);
	}
	function Ce() {
		let e = K(ye).trim();
		e && (R("setup", () => {
			K(E).site.title = e, K(E).nav.logo = {
				type: "text",
				value: e
			}, K(E).theme.tokens.color.accent = K(be), K(E).theme.tokens.color.bg = K(xe), delete K(E).site.setup;
		}), Se(), h("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let O = /* @__PURE__ */ z(null), we = [
		[
			"Sider",
			"Blokker",
			"Egenskaper",
			"Grid"
		],
		[
			"Tema",
			"Nav",
			"Footer",
			"Samlinger",
			"Plugins"
		],
		["Historikk"]
	];
	function Te(e) {
		B(O, K(O) === e ? null : e, !0), T?.sendShowGrid(K(O) === "Grid"), K(O) === "Historikk" && Ct();
	}
	let k = /* @__PURE__ */ z(null);
	function Ee(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function De() {
		if (!K(k)) return;
		let { block: e } = Ee(K(k).sectionId, K(k).blockId);
		if (!e) {
			B(k, null);
			return;
		}
		B(k, {
			sectionId: K(k).sectionId,
			blockId: K(k).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function Oe(e) {
		if (!e.blockId) {
			B(k, null), B(A, null);
			return;
		}
		B(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), De();
	}
	let A = /* @__PURE__ */ z(null);
	function ke(e) {
		if (Oe(e), !K(k)) return;
		let t = K(g)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + e.rect.top), Math.max(8, r));
		B(A, {
			left: n,
			top: i
		}, !0);
	}
	function j(e, t) {
		let { section: n, block: r } = Ee(K(k)?.sectionId, K(k)?.blockId);
		r && (le(e), t(r, n), ee(n, "blokk-endret"), C.save(), D(), T?.sendSection(K(l), n), De());
	}
	function M(e, t) {
		j(`edit:${K(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Ae(e, t) {
		Number.isFinite(t) && j(`edit:frame-${K(k).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function je(e) {
		j("decor", (t) => {
			t.decor = e;
		});
	}
	async function Me(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			j(`edit:${K(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ki(t.name).replaceAll("-", " ");
			});
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ne = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri"
	}, Pe = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Fe = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Ie = /* @__PURE__ */ z(null), Re = /* @__PURE__ */ z(null), ze = /* @__PURE__ */ z(""), Be = /* @__PURE__ */ z(Qt([])), Ue = /* @__PURE__ */ z(null);
	function We(e) {
		B(Re, e?.grid ? { ...e.grid } : null, !0), B(ze, e?.size?.minHeight ?? "", !0), B(Be, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), B(Ue, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Ge(e) {
		B(Ie, e.sectionId, !0), We(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Ke(e, t) {
		let n = C.data.sections.find((e) => e.id === K(Ie));
		n && (le(e), t(n), C.save(), D(), T?.sendSection(K(l), n), We(n));
	}
	let qe = /* @__PURE__ */ z("color");
	function Je(e) {
		Ke("bg", (t) => {
			t.background ??= {
				version: 1,
				layers: []
			}, t.background.layers.push({
				type: e,
				version: 1,
				props: i[e].defaults()
			});
		});
	}
	function Ye(e) {
		Ke("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Xe(e, t) {
		let n = e + t;
		Ke("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function F(e, t, n) {
		Ke(`edit:bg-${K(Ie)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Ze(e, t, n) {
		Ke(`edit:bg-${K(Ie)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function Qe(e, t) {
		Ke("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: i[t].defaults()
			});
		});
	}
	async function $e(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			F(e, "src", (await Oi(n)).dataUrl);
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function et(e, t) {
		let n = [...t.target.files ?? []];
		if (t.target.value = "", !n.length) return;
		h("Komprimerer bildene…");
		let { images: r, failed: i, big: a } = await Xr(n);
		r.length && Ke("bg", (t) => {
			let n = t.background.layers[e].props;
			n.images ??= [], n.images.push(...r.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Qr(r.length, i, a);
	}
	function tt(e, t, n) {
		Ke("bg", (r) => {
			let i = r.background.layers[e].props.images, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function rt(e, t) {
		Ke("bg", (n) => {
			n.background.layers[e].props.images.splice(t, 1);
		});
	}
	function it(e, t, n, r) {
		Ke(`edit:bgg-${K(Ie)}-${e}-${t}-${n}`, (i) => {
			i.background.layers[e].props.images[t][n] = r;
		});
	}
	let at = () => Object.entries(K(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function ot(e) {
		return {
			type: e,
			version: ka[e].version,
			props: ka[e].defaults()
		};
	}
	function st(e) {
		j(`edit:anim-${K(k).blockId}`, (t) => {
			t.animation = e ? ot(e) : null;
		}), K(k) && T?.sendDemoAnim(K(k).sectionId, K(k).blockId);
	}
	function ct(e, t) {
		Number.isFinite(t) && (j(`edit:anim-${K(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), K(k) && T?.sendDemoAnim(K(k).sectionId, K(k).blockId));
	}
	function lt(e) {
		Ke("section-anim", (t) => {
			t.animation = e ? ot(e) : null;
		}), T?.sendDemoAnim(K(Ie));
	}
	function ut(e, t) {
		Number.isFinite(t) && (Ke("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(K(Ie)));
	}
	function dt(e) {
		let t = C.data.sections.find((e) => e.id === K(Ie));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		le("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, B(ze, r, !0), C.save(), D(), T?.sendSection(K(l), t);
	}
	function ft() {
		return C.data.sections.find((e) => e.id === K(Ie)) ?? C.data.sections[0];
	}
	function pt(e) {
		let t = C.data.sections.find((e) => e.id === K(Ie));
		t && (le("grid:section"), t.grid = e ? { ...w.data.grid } : null, B(Re, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(K(l), t), K(O) === "Grid" && T?.sendShowGrid(!0));
	}
	function mt(e, t) {
		let n = C.data.sections.find((e) => e.id === K(Ie));
		n?.grid && (le("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, B(Re, { ...n.grid }, !0), C.save(), D(), T?.sendSection(K(l), n), K(O) === "Grid" && T?.sendShowGrid(!0));
	}
	function ht(e, t) {
		le("grid:site"), B(v, {
			...K(v),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), ne(), K(O) === "Grid" && T?.sendShowGrid(!0);
	}
	async function gt() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? B(_, await e.json(), !0) : e.status !== 503 && B(_, null);
		} catch {
			B(_, null);
		}
	}
	let _t = null;
	async function vt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (_t = (await e.json()).head ?? null);
		} catch {}
	}
	async function yt(e) {
		if (!_t) return await vt(), {
			ok: await ge({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: _t
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${_t}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === _t) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await ge({
				title: "Noen andre har publisert",
				lines: [
					"Siden du lastet siden har noen andre publisert endringer i filer du nå skriver over:",
					...i.map((e) => `• ${e}`),
					"Publiserer du likevel, vinner dine versjoner for disse filene. Avbryt for å laste siden på nytt og se de nye endringene først."
				],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: n
		};
	}
	let bt = /* @__PURE__ */ z(null), xt = /* @__PURE__ */ z(""), St = /* @__PURE__ */ z(!1);
	async function Ct() {
		B(xt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? B(bt, (await e.json()).commits, !0) : e.status === 401 ? (B(bt, [], !0), B(xt, "Logg inn med GitHub for å se historikken.")) : (B(bt, [], !0), B(xt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			B(bt, [], !0), B(xt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let wt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), L = !1;
	async function Tt() {
		let e = K(bt)?.[0];
		if (!(!e || K(St)) && await ge({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			B(St, !0), h("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? _t = e : vt(), L = !0, h("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), Et();
				} else t.status === 409 ? h("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : h((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				h("Kunne ikke nå publiseringslaget", "error");
			}
			B(St, !1), Ct();
		}
	}
	async function Et() {
		let e = ["/content/site.json", ...K(E).pages.map((e) => `/${e.file}`)], t = async () => {
			let t = {};
			for (let n of e) try {
				t[n] = await (await fetch(n, { cache: "no-store" })).text();
			} catch {
				t[n] = null;
			}
			return t;
		}, n = await t();
		for (let r = 0; r < 18; r++) {
			await new Promise((e) => setTimeout(e, 1e4));
			let r = await t();
			if (e.some((e) => r[e] !== null && n[e] !== null && r[e] !== n[e])) {
				h("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		h("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let Dt = null;
	function Ot(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: ga("sec"),
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
	async function kt(e, { keepHistory: t = !1 } = {}) {
		B(l, e, !0), Dt = (async () => {
			let n = ie(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = ua(await e.json(), w.data));
			} catch {}
			r ? re.delete(e) : r = Ot(n), C = pi(`urd-draft-${e}`, () => r), C.replace(ua(C.data, w.data)), C.save(), t || (se = null), B(Ie, null), B(Re, null), D(), S(), B(d, "");
		})(), await Dt;
	}
	function At() {
		T?.destroy(), T = Qi(K(g), {
			onEdit: Cr,
			onMove: wr,
			onGrow: Tr,
			onDelete: Ir,
			onAddSection: Ar,
			onMoveSection: jr,
			onDeleteSection: Mr,
			onSectionSize: Pr,
			onUndo: (e) => e.redo ? fe() : de(),
			onSelectSection: Ge,
			onSelectBlock: Oe,
			onBlockMenu: ke,
			onReady: jt,
			onNavigate: Mt,
			onAddBlock: (e) => Vr(e.sectionId, e.block),
			onAddBlocks: (e) => Hr(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: qr,
			onMoveBlockSection: Fr,
			onMobileManual: J,
			onMobileAuto: Er,
			onReviewDone: Or,
			onBlockFlag: kr,
			onCollectionEdit: Cn,
			onPluginBlocks: (e) => {
				B(Gr, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => R("edit:nav-width", () => {
				K(E).nav.style ??= {}, K(E).nav.style.width = e.width;
			})
		});
	}
	async function jt() {
		await Dt, await Nn, T?.sendPlugins(Le(K(Pn))?.enabled ?? []), T?.sendViewport(K(b)), xn(), w.hasDraft() && ne();
		let e = !K(c).pages.some((e) => e.id === K(l));
		(C.hasDraft() || e) && T?.sendPage(K(l), C.data), K(y) || T?.sendChrome(!1), K(O) === "Grid" && T?.sendShowGrid(!0);
	}
	function Mt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = K(E).pages.find((e) => e.path === t);
		n && n.id !== K(l) && kt(n.id);
	}
	function R(e, t) {
		le(e), t(), w.save(), D(), ne();
	}
	let Nt = /* @__PURE__ */ z(""), Pt = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Ft(e, t = null) {
		return e ? Pt.includes(e) ? `«${e}» er et reservert navn` : K(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function It() {
		let e = K(Nt).trim(), t = ki(e), n = Ft(t);
		if (n) {
			h(n, "error");
			return;
		}
		R("pages", () => {
			K(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), K(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(Ot({
			id: t,
			title: e
		}))), D(), B(Nt, ""), kt(t);
	}
	function Lt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		R("pages", () => {
			e.title = n;
			for (let t of K(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === K(l) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(K(l), C.data)) : Rt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Rt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = ua(await t.json(), w.data));
		} catch {}
		r ||= Ot(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function zt(e, t) {
		let n = ki(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ft(n, e.id);
		if (r) {
			h(r, "error");
			return;
		}
		R("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Bt(e) {
		e.path !== "/" && (R("pages", () => {
			K(E).pages = K(E).pages.filter((t) => t.id !== e.id), K(E).nav.items = K(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of K(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			K(E).nav.items = K(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === K(l) && kt(K(E).pages[0].id), h("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Vt(e) {
		R("edit:nav-logo", () => {
			K(E).nav.logo = {
				type: "text",
				value: "",
				...K(E).nav.logo,
				...e
			};
		});
	}
	function Ht(e) {
		R("nav", () => {
			K(E).nav.logo ??= {
				type: "text",
				value: K(E).site.title
			};
			let t = K(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = K(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = K(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Ut(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			R("nav", () => {
				let t = K(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Wt = /* @__PURE__ */ z(null);
	function Gt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			B(Wt, String(n.result), !0);
		}, n.onerror = () => h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function Kt(e) {
		R("edit:site-icon", () => {
			K(E).site.icon = e;
		}), B(Wt, null);
	}
	function qt() {
		R("edit:site-icon", () => {
			delete K(E).site.icon;
		});
	}
	let Jt = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	_n(() => {
		if (!K(E)?.site) return;
		let e = K(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			Jt.test(e) && (t.href = e);
		}
	});
	function Yt(e) {
		R("nav", () => {
			K(E).nav.layout = e;
		});
	}
	function Xt(e, t) {
		R(`edit:nav-style-${e}`, () => {
			K(E).nav.style ??= {}, t === void 0 ? delete K(E).nav.style[e] : K(E).nav.style[e] = t;
		});
	}
	let Zt = /* @__PURE__ */ I(() => K(E)?.nav?.variant === "side-left" || K(E)?.nav?.variant === "side-right"), en = /* @__PURE__ */ I(() => K(E)?.nav?.variant === "floating" || K(E)?.nav?.variant === "floating-square"), tn = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, nn = /* @__PURE__ */ I(() => tn[K(E)?.nav?.style?.hover] ?? null);
	function rn(e) {
		R("nav", () => {
			e === "bar" ? delete K(E).nav.variant : K(E).nav.variant = e;
		});
	}
	function an(e) {
		R("nav", () => {
			K(E).nav.style ??= {}, e ? K(E).nav.style.glow = !0 : delete K(E).nav.style.glow;
		});
	}
	function on(e) {
		R("nav", () => {
			K(E).nav.style ??= {}, e ? delete K(E).nav.style.topGap : K(E).nav.style.topGap = !1;
		});
	}
	function sn(e) {
		R("nav", () => {
			K(E).nav.style ??= {}, e === "standard" ? delete K(E).nav.style.hover : K(E).nav.style.hover = e;
		});
	}
	async function cn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			R("nav", () => {
				K(E).nav.style ??= {}, K(E).nav.style.image = e.dataUrl;
			});
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function ln() {
		R("nav", () => {
			K(E).nav.style && delete K(E).nav.style.image;
		});
	}
	let un = null, dn = {}, fn = /* @__PURE__ */ z(Qt([])), pn = /* @__PURE__ */ z(Qt({})), mn = /* @__PURE__ */ z(null), hn = /* @__PURE__ */ z(""), gn = /* @__PURE__ */ z("news"), vn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function yn() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		un = pi("urd-draft-samlinger", () => e), B(fn, [...un.data.samlinger ?? []], !0);
		for (let e of K(fn)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			t ??= {
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}, dn[e] = pi(`urd-draft-samling-${e}`, () => t);
		}
		bn();
	}
	function bn(e = !0) {
		let t = {};
		for (let e of K(fn)) dn[e] && (t[e] = JSON.parse(JSON.stringify(dn[e].data)));
		B(pn, t, !0), e && xn();
	}
	function xn() {
		T?.sendCollections(Le(K(pn)) ?? {});
	}
	function Sn(e, t, n = !0) {
		let r = dn[e];
		r && (t(r.data), r.save(), D(), bn(n));
	}
	function Cn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || Sn(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function wn() {
		let e = K(hn).trim();
		if (!e) return;
		let t = ki(e);
		if (!t || K(fn).includes(t)) {
			h(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: K(gn),
			entries: []
		};
		dn[t] = pi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), dn[t].replace(n), dn[t].save(), un.data.samlinger = [...K(fn), t], un.save(), B(fn, [...K(fn), t], !0), B(mn, t, !0), B(hn, ""), D(), bn();
	}
	function Tn(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete dn[e], un.data.samlinger = K(fn).filter((t) => t !== e), un.save(), B(fn, K(fn).filter((t) => t !== e), !0), K(mn) === e && B(mn, null), D(), bn();
	}
	function En(e) {
		Sn(e, (e) => {
			e.entries.unshift({
				id: ga("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Dn(e, t, n, r) {
		Sn(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function On(e, t, n) {
		Sn(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function kn(e, t) {
		Sn(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function An(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Dn(e, t, "image", (await Oi(r)).dataUrl);
	}
	let jn = null, Mn, Nn = new Promise((e) => {
		Mn = e;
	}), Pn = /* @__PURE__ */ z(null), Fn = Qt({}), In = /* @__PURE__ */ z("0.0.0"), Ln = /* @__PURE__ */ z(""), Rn = /* @__PURE__ */ z(""), zn = /* @__PURE__ */ z(Qt([])), Bn = /* @__PURE__ */ z("pending"), Vn = () => [.../* @__PURE__ */ new Set([...K(Pn)?.enabled ?? [], ...K(Pn)?.disabled ?? []])];
	function Hn() {
		B(Pn, JSON.parse(JSON.stringify(jn.data)), !0);
	}
	async function G() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		jn = pi("urd-draft-plugins", () => e), Hn();
		try {
			B(In, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Vn()) Gn(e);
		Un(), Mn(), T?.sendPlugins(Le(K(Pn))?.enabled ?? []);
	}
	async function Un() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Wn();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), B(zn, (t ?? []).filter((e) => !Vn().includes(e)), !0);
			for (let e of K(zn)) Gn(e);
			B(Bn, "ok");
		} catch {
			Wn();
		}
	}
	function Wn() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				B(zn, e.filter((e) => !Vn().includes(e)), !0);
				for (let e of K(zn)) Gn(e);
				B(Bn, "ok");
				return;
			}
		} catch {}
		B(Bn, "unavailable");
	}
	async function Gn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ha(t);
			Fn[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && pa(K(In), t.requiresEngine)
			};
		} catch {
			Fn[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Kn(e, t) {
		let n = jn.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), jn.save(), D(), Hn(), qn();
	}
	function qn() {
		K(g) && (K(g).src = K(g).src);
	}
	function Jn(e) {
		let t = jn.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), jn.save(), D(), Hn(), qn();
	}
	async function Yn() {
		B(Rn, "");
		let e = K(Ln).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			B(Rn, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Vn().includes(e)) {
			B(Rn, "Pluginen står allerede i listen");
			return;
		}
		if (await Gn(e), Fn[e].errors.length) {
			B(Rn, `Fant ingen gyldig plugin: ${Fn[e].errors.join("; ")}`);
			return;
		}
		Kn(e, !0), B(Ln, "");
	}
	function Xn(e) {
		B(zn, K(zn).filter((t) => t !== e), !0), Kn(e, !0);
	}
	function Zn(e, t) {
		R(e, () => {
			K(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(K(E).footer);
		});
	}
	function Qn(e, t) {
		R(`edit:nav-label-${e}`, () => {
			K(E).nav.items[e].label = t;
		});
	}
	function $n(e, t) {
		R("nav", () => {
			let n = K(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function er(e, t) {
		R(`edit:nav-href-${e}`, () => {
			K(E).nav.items[e].href = t;
		});
	}
	function tr(e, t) {
		let n = e + t, r = K(E).nav.items;
		n < 0 || n >= r.length || R("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function nr(e) {
		R("nav", () => {
			K(E).nav.items.splice(e, 1);
		});
	}
	function rr() {
		R("nav", () => {
			K(E).nav.items.push({
				label: "Lenke",
				page: K(E).pages[0].id
			});
		});
	}
	function ir(e) {
		R("nav", () => {
			let t = K(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: K(E).pages[0].id
			});
		});
	}
	function ar(e, t, n) {
		R(`edit:nav-child-label-${e}-${t}`, () => {
			K(E).nav.items[e].children[t].label = n;
		});
	}
	function or(e, t, n) {
		R("nav", () => {
			let r = K(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function sr(e, t, n) {
		R(`edit:nav-child-href-${e}-${t}`, () => {
			K(E).nav.items[e].children[t].href = n;
		});
	}
	function cr(e, t, n) {
		let r = t + n, i = K(E).nav.items[e].children;
		r < 0 || r >= i.length || R("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function lr(e, t) {
		R("nav", () => {
			let n = K(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = K(E).pages[0].id));
		});
	}
	function ur(e, t) {
		R(`edit:theme-color-${e}`, () => {
			K(E).theme.tokens.color[e] = t;
		});
	}
	function dr(e, t) {
		R("theme", () => {
			K(E).theme.tokens.font[e] = t;
		});
	}
	function fr(e, t) {
		R("theme", () => {
			K(E).theme.tokens.radius[e] = t;
		});
	}
	function pr(e) {
		let t = /^#([0-9a-f]{6})$/i.exec(e ?? "");
		if (!t) return e;
		let [n, r, i] = [
			0,
			2,
			4
		].map((e) => parseInt(t[1].slice(e, e + 2), 16) / 255), a = Math.max(n, r, i), o = Math.min(n, r, i), s = 0, c = (a + o) / 2, l = a - o, u = l === 0 ? 0 : l / (1 - Math.abs(2 * c - 1));
		l !== 0 && (s = a === n ? (r - i) / l % 6 : a === r ? (i - n) / l + 2 : (n - r) / l + 4, s = (s * 60 + 360) % 360);
		let d = 1 - c, f = (1 - Math.abs(2 * d - 1)) * u, p = f * (1 - Math.abs(s / 60 % 2 - 1)), m = d - f / 2, [h, g, _] = s < 60 ? [
			f,
			p,
			0
		] : s < 120 ? [
			p,
			f,
			0
		] : s < 180 ? [
			0,
			f,
			p
		] : s < 240 ? [
			0,
			p,
			f
		] : s < 300 ? [
			p,
			0,
			f
		] : [
			f,
			0,
			p
		], v = (e) => Math.round((e + m) * 255).toString(16).padStart(2, "0");
		return `#${v(h)}${v(g)}${v(_)}`;
	}
	function mr() {
		return Object.fromEntries(Object.entries(K(E).theme.tokens.color).map(([e, t]) => [e, pr(t)]));
	}
	function hr() {
		R("theme", () => {
			K(E).theme.alt = { tokens: { color: mr() } };
		});
	}
	function _r() {
		R("theme", () => {
			K(E).theme.alt.tokens.color = mr();
		});
	}
	function yr() {
		R("theme", () => {
			delete K(E).theme.alt;
		});
	}
	function br(e, t) {
		R(`edit:theme-alt-${e}`, () => {
			K(E).theme.alt.tokens.color[e] = t;
		});
	}
	function xr(e) {
		R("theme", () => {
			e === "light" ? delete K(E).theme.scheme : K(E).theme.scheme = e;
		});
	}
	function Sr() {
		B(y, !K(y)), T?.sendChrome(K(y));
	}
	function Cr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (le(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), K(k)?.blockId === e.blockId && De(), e.rerender && T?.sendSection(K(l), t), B(d, ""));
	}
	function wr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		le(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ee(t, "desktop-endret-etter-mobil"), C.save(), D(), K(k)?.blockId === e.blockId && De();
	}
	function Tr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (le(`edit:${e.blockId}`), t.frames.desktop.h = e.h, C.save(), D(), K(k)?.blockId === e.blockId && De());
	}
	function J(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			le("mobile-manual");
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
	function Er(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			le("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, C.save(), D(), S(), T?.sendSection(K(l), t);
		}
	}
	function Or(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (le("review-done"), t.responsive.mobile.attention = null, C.save(), D(), S());
	}
	function kr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (le("decor"), t.decor = e.decor, C.save(), D(), K(k)?.blockId === e.blockId && De());
	}
	function Ar(e) {
		le("add-section"), e.section.id || (e.section.id = ga("sec")), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(K(l), C.data), B(Ie, e.section.id, !0), We(e.section), K(O) !== "Egenskaper" && (B(O, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function jr(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (le("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(K(l), C.data));
	}
	function Mr(e) {
		le("delete-section"), e.sectionId === K(Ie) && (B(Ie, null), B(Re, null)), K(k)?.sectionId === e.sectionId && B(k, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(K(l), C.data);
	}
	function Pr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (le("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === K(Ie) && B(ze, e.minHeight, !0), C.save(), D());
	}
	function Fr(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (le("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ee(t, "blokk-flyttet"), ee(n, "blokk-flyttet"), C.save(), D(), S(), T?.sendPage(K(l), C.data), K(k)?.blockId === e.blockId && (B(k, {
			...K(k),
			sectionId: e.toSectionId
		}, !0), De()));
	}
	function Ir(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (le("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), K(k)?.blockId === e.blockId && B(k, null), ee(t, "blokk-slettet"), C.save(), D(), T?.sendSection(K(l), t));
	}
	let Rr = {
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
		},
		samling: {
			type: "samling",
			props: {
				collection: null,
				view: "cards",
				limit: 6,
				newestFirst: !0
			},
			w: 90,
			h: 200
		},
		galleri: {
			type: "galleri",
			props: {
				images: [],
				view: "grid",
				columns: 3,
				gap: 12,
				radius: "md",
				lightbox: !0,
				interval: 5
			},
			w: 90,
			h: 320
		}
	};
	function zr(e) {
		let t = Rr[e];
		return t ? {
			id: ga("blk"),
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
	function Br(e) {
		T ? T.sendPlaceBlock(e) : Vr(ft()?.id, e);
	}
	function Vr(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		le("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ee(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(K(l), n);
	}
	function Hr(e, t, n, r) {
		let i = C.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		le("add-blocks");
		for (let e of r ?? []) {
			let t = i.blocks.find((t) => t.id === e.blockId);
			t && typeof e.dy == "number" && (t.frames.desktop = {
				...t.frames.desktop,
				y: t.frames.desktop.y + e.dy
			});
		}
		i.blocks.push(...t);
		let a = String(i.size?.minHeight ?? "");
		n && a.endsWith("px") && Number.parseFloat(a) < n && (i.size = {
			...i.size,
			minHeight: `${n}px`
		}), ee(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(K(l), i);
	}
	function Wr(e) {
		Br(zr(e));
	}
	let Gr = /* @__PURE__ */ z(Qt([]));
	function Kr(e, t = {}) {
		Br({
			id: ga("blk"),
			type: e.type,
			version: e.version ?? 1,
			decor: !1,
			props: {
				...structuredClone(e.defaults ?? {}),
				...structuredClone(t)
			},
			animation: null,
			frames: {
				desktop: {
					x: 25,
					y: 40,
					w: 50,
					h: 260,
					z: 1,
					rot: 0
				},
				mobile: null
			}
		});
	}
	function qr(e) {
		let t = zr(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, Vr(e.sectionId, t), e.kind === "image" && h("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && h("Galleri lagt til - legg til bilder i Egenskaper"));
	}
	async function Jr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		h("Komprimerer bildet…");
		let n;
		try {
			n = await Oi(t);
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (K(g)?.clientWidth ?? 1280));
		Br({
			id: ga("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ki(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? h(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : h("");
	}
	async function Xr(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Oi(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ki(i.name).replaceAll("-", " "),
				href: null,
				style: {}
			});
		} catch {
			n += 1;
		}
		return {
			images: t,
			failed: n,
			big: r
		};
	}
	function Qr(e, t, n) {
		t ? h(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? h(`${n} av bildene er store - vurder mindre utsnitt`, "error") : h(e ? "" : "Ingen bilder lagt til");
	}
	async function $r(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		h("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Xr(t);
		n.length && j("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Qr(n.length, r, i);
	}
	async function ei(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		h("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Xr(t);
		if (!n.length) {
			Qr(0, r, i);
			return;
		}
		let a = zr("galleri");
		a.props.images = n, Br(a), Qr(n.length, r, i);
	}
	function ti(e, t) {
		j("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function ii(e) {
		j("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function ai(e, t, n) {
		j(`edit:${K(k).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function oi(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${ki(n || "bilde")}-${Ai(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function ci(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) if (e.type === "image" && oi(e.props, "src", "bakgrunn", t), e.type === "bildegalleri") for (let n of e.props.images ?? []) oi(n, "src", "bakgrunn", t);
			for (let e of n.blocks) if (e.type === "image" && oi(e.props, "src", e.props.alt, t), e.type === "icon" && oi(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) oi(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function li(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && oi(n, "value", "logo", t), n?.type === "both" && oi(n, "image", "logo", t), e.nav?.style && oi(e.nav.style, "image", "meny", t), oi(e.site, "icon", "ikon", t), t;
	}
	let ui = /* @__PURE__ */ z(!1);
	function fi() {
		if (!K(ui)) {
			B(ui, !0);
			return;
		}
		B(ui, !1), mi();
	}
	_n(() => {
		if (!K(ui)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || B(ui, !1);
		}, t = (e) => {
			e.key === "Escape" && B(ui, !1);
		}, n = () => B(ui, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function mi() {
		le("discard");
		for (let e of K(E).pages) e.id !== K(l) && !re.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), jn && (jn.reset(), Hn()), un) {
			un.reset(), B(fn, [...un.data.samlinger ?? []], !0);
			for (let e of Object.keys(dn)) K(fn).includes(e) ? dn[e].reset() : delete dn[e];
			bn();
		}
		te(), B(v, {
			snap: !0,
			...K(E).grid
		}, !0), D(), B(d, ""), ne(), K(E).pages.some((e) => e.id === K(l)) ? T?.sendPage(K(l), e) : kt(K(E).pages[0].id);
	}
	async function hi() {
		if (L) {
			h("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		h("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of K(E).pages) {
			let a = `urd-draft-${i.id}`, o = re.has(i.id) || !K(c).pages.some((e) => e.id === i.id), s = null;
			if (i.id === K(l) && (C.hasDraft() || o)) s = C.data;
			else if (i.id !== K(l)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = ua(JSON.parse(e), w.data);
				} catch {}
			}
			if (!s && o && (s = Ot(i)), !s) continue;
			let u = JSON.parse(JSON.stringify(s));
			e.push(...ci(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(K(E)));
			e.push(...li(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(K(c).theme, K(E).theme) || t.push("tema"), i(K(c).nav, K(E).nav) || t.push("menyen"), i(K(c).footer, K(E).footer) || t.push("footeren"), i(K(c).pages, K(E).pages) || t.push("sideregisteret"), i(K(c).grid, K(E).grid) || t.push("gridet"), (K(c).site.icon ?? null) !== (K(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = K(c).site, { icon: s, ...l } = K(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		let i = Object.entries(dn).filter(([, e]) => e.hasDraft());
		if (i.length || un?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) oi(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (un?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(un.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!K(fn).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		jn?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(jn.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of K(E).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		let a = new Set(e.map((e) => e.path)), o = (t) => {
			a.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of K(c).pages) {
			let t = K(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await yt(e);
		if (!s.ok) {
			h("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let u = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...s.head ? { expect: s.head } : {}
		}, d = null;
		try {
			d = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(u)
			});
		} catch {}
		if (d?.ok) {
			let { sha: e } = await d.json().catch(() => ({}));
			e ? _t = e : vt(), ci(C.data), li(K(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) re.add(e);
			if (B(c, JSON.parse(JSON.stringify(K(E))), !0), w = pi("urd-draft-site", () => K(c)), te(), jn) {
				let e = JSON.parse(JSON.stringify(jn.data));
				jn = pi("urd-draft-plugins", () => e), Hn();
			}
			if (un) {
				for (let e of Object.values(dn)) for (let t of e.data.entries) oi(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(un.data));
				un = pi("urd-draft-samlinger", () => e);
				for (let e of K(fn)) {
					if (!dn[e]) continue;
					let t = JSON.parse(JSON.stringify(dn[e].data));
					dn[e] = pi(`urd-draft-samling-${e}`, () => t);
				}
				bn();
			}
			B(v, {
				snap: !0,
				...K(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = pi(`urd-draft-${K(l)}`, () => t), re.has(K(l)) && localStorage.setItem(`urd-draft-${K(l)}`, JSON.stringify(t)), D(), h("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			h(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await gt();
		} else d?.status === 403 ? h((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? h("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : h(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	me();
	var gi = js();
	vr("keydown", $t, pe);
	var _i = H(gi), vi = V(_i), yi = (e) => {
		var t = Qa();
		Ur(V(t), () => a.pencil), P(), N(t), q("click", t, Sr), Y(e, t);
	};
	Z(vi, (e) => {
		K(y) || e(yi);
	});
	var bi = U(vi, 2);
	let xi;
	var Si = V(bi), Ci = U(V(Si), 2);
	na(Ci, {
		get value() {
			return K(s);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return o;
		},
		onchange: (e) => B(s, e, !0)
	});
	var Ti = U(Ci, 2), Ei = (e) => {
		var t = $a(), n = H(t), r = V(n, !0);
		N(n);
		var i = U(n, 2), o = V(i);
		let s;
		Ur(o, () => a.desktop, !0), N(o);
		var c = U(o, 2);
		let l;
		Ur(c, () => a.phone, !0), N(c), N(i), W((e) => {
			X(r, e), s = Yr(o, 1, "ghost svelte-1n46o8q", null, s, { active: K(b) === "desktop" }), l = Yr(c, 1, "ghost svelte-1n46o8q", null, l, { active: K(b) === "mobile" });
		}, [() => ie()?.title ?? ""]), q("click", n, () => Te("Sider")), q("click", o, () => B(b, "desktop")), q("click", c, () => B(b, "mobile")), Y(e, t);
	};
	Z(Ti, (e) => {
		K(c) && e(Ei);
	});
	var Di = U(Ti, 2), ji = (e) => {
		var t = eo(), n = V(t);
		Ur(n, () => a.phone);
		var r = U(n);
		N(t), W(() => X(r, ` ${K(x) ?? ""} ${K(x) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), q("click", t, () => B(b, "mobile")), Y(e, t);
	};
	Z(Di, (e) => {
		K(x) > 0 && e(ji);
	});
	var Mi = U(Di, 2), Ni = (e) => {
		Y(e, to());
	};
	Z(Mi, (e) => {
		K(u) && e(Ni);
	}), N(Si);
	var Pi = U(Si, 2), Fi = V(Pi), Ii = (e) => {
		var t = oo(), n = H(t), r = V(n), i = (e) => {
			var t = no();
			Ur(H(t), () => a.eye), P(), Y(e, t);
		}, o = (e) => {
			var t = ro();
			Ur(H(t), () => a.pencil), P(), Y(e, t);
		};
		Z(r, (e) => {
			K(y) ? e(i) : e(o, -1);
		}), N(n);
		var s = U(n, 2), c = (e) => {
			var t = io(), n = V(t), r = (e) => {
				var t = Dr();
				Ur(H(t), () => a.warn), Y(e, t);
			};
			Z(n, (e) => {
				K(_).allowed || e(r);
			});
			var i = U(n, 1, !0);
			N(t), W(() => {
				ri(t, "title", K(_).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), X(i, K(_).login);
			}), Y(e, t);
		}, l = (e) => {
			Y(e, ao());
		};
		Z(s, (e) => {
			K(_)?.loggedIn ? e(c) : K(_) && e(l, 1);
		});
		var d = U(s, 2), f = U(d, 2);
		let p;
		var m = V(f, !0);
		N(f);
		var h = U(f, 2);
		W((e) => {
			ri(n, "title", K(y) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ri(d, "href", e), p = Yr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: K(ui) }), f.disabled = !K(u), ri(f, "title", K(ui) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), X(m, K(ui) ? "Sikker?" : "Forkast utkast"), h.disabled = !K(u);
		}, [() => ie()?.path ?? "/"]), q("click", n, Sr), q("click", f, fi), q("click", h, hi), Y(e, t);
	};
	Z(Fi, (e) => {
		K(c) && e(Ii);
	}), N(Pi), N(bi);
	var Li = U(bi, 2), Ri = (e) => {
		var t = ws(), i = V(t), o = (e) => {
			var t = Cs(), i = H(t);
			Lr(i, 21, () => we, Nr, (e, t, n) => {
				var r = co(), i = H(r), a = (e) => {
					Y(e, so());
				};
				Z(i, (e) => {
					n > 0 && e(a);
				}), Lr(U(i, 2), 16, () => K(t), (e) => e, (e, t) => {
					var n = Ma();
					let r;
					var i = V(n, !0);
					N(n), W(() => {
						r = Yr(n, 1, "svelte-1n46o8q", null, r, { active: K(O) === t }), X(i, t);
					}), q("click", n, () => Te(t)), Y(e, n);
				}), Y(e, r);
			}), N(i);
			var o = U(i, 2), s = (e) => {
				var t = Ss(), i = V(t), o = V(i, !0);
				N(i);
				var s = U(i, 2), c = (e) => {
					var t = mo(), n = U(V(t), 2);
					Lr(n, 17, () => K(E).pages, (e) => e.id, (e, t) => {
						var n = po();
						let r;
						var i = V(n);
						Q(i);
						var o = U(i, 2), s = (e) => {
							Y(e, lo());
						}, c = (e) => {
							var n = uo();
							Q(n), W((e) => $(n, e), [() => K(t).path.slice(1)]), q("change", n, (e) => zt(K(t), e.target.value)), Y(e, n);
						};
						Z(o, (e) => {
							K(t).path === "/" ? e(s) : e(c, -1);
						});
						var u = U(o, 2), d = V(u);
						Ur(d, () => a.right, !0), N(d);
						var f = U(d, 2), p = (e) => {
							var n = fo();
							Ur(n, () => a.cross, !0), N(n), q("click", n, () => Bt(K(t))), Y(e, n);
						};
						Z(f, (e) => {
							K(t).path !== "/" && e(p);
						}), N(u), N(n), W(() => {
							r = Yr(n, 1, "page-row svelte-1n46o8q", null, r, { current: K(t).id === K(l) }), $(i, K(t).title), d.disabled = K(t).id === K(l);
						}), q("change", i, (e) => Lt(K(t), e.target.value)), q("click", d, () => kt(K(t).id)), Y(e, n);
					});
					var r = U(n, 4);
					Q(r);
					var i = U(r, 2);
					P(2), N(t), W((e) => i.disabled = e, [() => !K(Nt).trim()]), q("keydown", r, (e) => e.key === "Enter" && It()), si(r, () => K(Nt), (e) => B(Nt, e)), q("click", i, It), Y(e, t);
				}, u = (e) => {
					var t = Ao(), n = U(V(t), 2), r = U(V(n), 2), i = V(r), o = U(V(i));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.logo?.type ?? "text");
						na(o, {
							get value() {
								return K(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => Ht(e)
						});
					}
					N(i);
					var s = U(i, 2), c = (e) => {
						var t = ho(), n = H(t);
						Q(n);
						var r = U(n, 2), i = V(r);
						{
							let e = /* @__PURE__ */ I(() => K(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ I(() => [["", "Arv"], ...Aa.map(([e, t]) => [t, e])]);
							na(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return K(e);
								},
								get options() {
									return K(t);
								},
								onchange: (e) => Vt({ font: e || void 0 })
							});
						}
						var a = U(i, 2);
						Q(a);
						var o = U(a, 2);
						let s;
						var c = U(o, 2);
						let l;
						N(r), W((e) => {
							$(n, K(E).nav.logo?.value ?? ""), $(a, K(E).nav.logo?.textSize ?? ""), s = Yr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: K(E).nav.logo?.bold !== !1 }), l = Yr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!K(E).nav.logo?.italic })]), q("input", n, (e) => Vt({ value: e.target.value })), q("change", a, (e) => Vt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), q("click", o, () => Vt({ bold: K(E).nav.logo?.bold === !1 })), q("click", c, () => Vt({ italic: !K(E).nav.logo?.italic })), Y(e, t);
					};
					Z(s, (e) => {
						(K(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = U(s, 2), u = (e) => {
						var t = go(), n = H(t), r = V(n), i = V(r), a = U(i);
						N(r);
						var o = U(r, 2);
						Q(o);
						var s = U(o, 2);
						Q(s), N(n), P(2), W(() => {
							X(i, `${(K(E).nav.logo?.type === "image" ? K(E).nav.logo?.value : K(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), $(o, K(E).nav.logo?.size ?? 32), $(s, K(E).nav.logo?.radius ?? 0);
						}), q("change", a, Ut), q("change", o, (e) => Vt({ size: Number(e.target.value) })), q("change", s, (e) => Vt({ radius: Number(e.target.value) })), Y(e, t);
					};
					Z(l, (e) => {
						(K(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = U(l, 2), f = (e) => {
						var t = _o(), n = U(V(t));
						{
							let e = /* @__PURE__ */ I(() => K(E).nav.logo?.order ?? "image-first");
							na(n, {
								get value() {
									return K(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => Vt({ order: e })
							});
						}
						N(t), Y(e, t);
					};
					Z(d, (e) => {
						K(E).nav.logo?.type === "both" && e(f);
					}), P(2), N(r), N(n);
					var p = U(n, 2), m = U(V(p), 2), h = V(m), g = U(V(h));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.variant ?? "bar");
						na(g, {
							get value() {
								return K(e);
							},
							options: [
								["bar", "Stripe (standard)"],
								["floating", "Flytende (pille)"],
								["floating-square", "Flytende (firkant)"],
								["side-left", "Sidestilt venstre"],
								["side-right", "Sidestilt høyre"]
							],
							onchange: (e) => rn(e)
						});
					}
					N(h);
					var _ = U(h, 2), v = (e) => {
						var t = vo(), n = H(t), r = V(n);
						Q(r), P(), N(n);
						var i = U(n, 2), a = V(i);
						Q(a), P(), N(i), W(() => {
							ni(r, K(E).nav.style?.glow === !0), ni(a, K(E).nav.style?.topGap !== !1);
						}), q("change", r, (e) => an(e.target.checked)), q("change", a, (e) => on(e.target.checked)), Y(e, t);
					};
					Z(_, (e) => {
						K(en) && e(v);
					});
					var y = U(_, 2), b = (e) => {
						var t = yo(), n = U(V(t));
						{
							let e = /* @__PURE__ */ I(() => K(E).nav.style?.sideAlign ?? "left");
							na(n, {
								get value() {
									return K(e);
								},
								options: [
									["left", "Venstre"],
									["center", "Midtstilt"],
									["right", "Høyre"]
								],
								onchange: (e) => Xt("sideAlign", e === "left" ? void 0 : e)
							});
						}
						N(t), Y(e, t);
					};
					Z(y, (e) => {
						K(Zt) && e(b);
					});
					var x = U(y, 2), S = U(V(x)), ee = V(S);
					N(S), N(x);
					var C = U(x, 2);
					Q(C);
					var w = U(C, 2), T = V(w);
					Q(T), P(), N(w);
					var te = U(w, 2), ne = U(V(te));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.style?.size ?? "md");
						na(ne, {
							get value() {
								return K(e);
							},
							options: [
								["sm", "Liten"],
								["md", "Standard"],
								["lg", "Stor"],
								["xl", "Ekstra stor"]
							],
							onchange: (e) => Xt("size", e === "md" ? void 0 : e)
						});
					}
					N(te);
					var re = U(te, 2), ie = U(V(re)), D = (e) => {
						{
							let t = /* @__PURE__ */ I(() => K(E).nav.style?.sidePlacement ?? "top");
							na(e, {
								get value() {
									return K(t);
								},
								options: [
									["top", "Øverst (standard)"],
									["middle", "Midt på"],
									["bottom", "Nederst"]
								],
								onchange: (e) => Xt("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, ae = (e) => {
						{
							let t = /* @__PURE__ */ I(() => K(E).nav.layout ?? "right");
							na(e, {
								get value() {
									return K(t);
								},
								options: [
									["right", "Høyre"],
									["center", "Midtstilt"],
									["left", "Venstre (etter logoen)"]
								],
								onchange: (e) => Yt(e)
							});
						}
					};
					Z(ie, (e) => {
						K(Zt) ? e(D) : e(ae, -1);
					}), N(re);
					var oe = U(re, 2), se = (e) => {
						var t = bo(), n = V(t);
						Q(n), P(), N(t), W(() => ni(n, K(E).nav.sticky !== !1)), q("change", n, (e) => R("nav", () => {
							K(E).nav.sticky = e.target.checked;
						})), Y(e, t);
					};
					Z(oe, (e) => {
						K(Zt) || e(se);
					});
					var ce = U(oe, 2), le = U(V(ce));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.style?.hover ?? "standard");
						na(le, {
							get value() {
								return K(e);
							},
							options: [
								["standard", "Standard (aksentfarge)"],
								["underline", "Understrek"],
								["pill", "Pille"],
								["lift-plain", "Løft"],
								["lift", "Løft med glød"]
							],
							onchange: (e) => sn(e)
						});
					}
					N(ce);
					var ue = U(ce, 2), de = (e) => {
						var t = xo(), n = H(t), r = U(V(n)), i = V(r);
						N(r), N(n);
						var a = U(n, 2);
						Q(a), W((e) => {
							X(i, `${e ?? ""}%`), $(a, K(E).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((K(E).nav.style?.hoverGlow ?? .6) * 100)]), q("input", a, (e) => Xt("hoverGlow", Number(e.target.value))), Y(e, t);
					};
					Z(ue, (e) => {
						K(E).nav.style?.hover === "lift" && e(de);
					});
					var fe = U(ue, 2), pe = (e) => {
						var t = So(), n = V(t), r = U(n);
						{
							let e = /* @__PURE__ */ I(() => K(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ I(at);
							wi(r, {
								get value() {
									return K(e);
								},
								get tokens() {
									return K(t);
								},
								get label() {
									return K(nn)[1];
								},
								onchange: (e) => Xt("hoverColor", e)
							});
						}
						N(t), W(() => {
							ri(t, "title", K(nn)[1]), X(n, `${K(nn)[0] ?? ""} `);
						}), Y(e, t);
					};
					Z(fe, (e) => {
						K(nn) && e(pe);
					});
					var me = U(fe, 2), he = U(V(me));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ I(at);
						wi(he, {
							get value() {
								return K(e);
							},
							get tokens() {
								return K(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => Xt("hoverTextColor", e)
						});
					}
					N(me);
					var ge = U(me, 2), _e = U(V(ge));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ I(at);
						wi(_e, {
							get value() {
								return K(e);
							},
							get tokens() {
								return K(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Xt("bg", e)
						});
					}
					N(ge);
					var ve = U(ge, 2), ye = U(V(ve));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ I(at);
						wi(ye, {
							get value() {
								return K(e);
							},
							get tokens() {
								return K(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Xt("textColor", e)
						});
					}
					N(ve);
					var be = U(ve, 2), xe = V(be), Se = V(xe), Ce = U(Se);
					N(xe);
					var O = U(xe, 2), we = (e) => {
						var t = Co();
						Ur(t, () => a.cross, !0), N(t), q("click", t, ln), Y(e, t);
					};
					Z(O, (e) => {
						K(E).nav.style?.image && e(we);
					}), N(be);
					var Te = U(be, 2), k = (e) => {
						var t = wo(), n = H(t), r = U(V(n)), i = V(r);
						N(r), N(n);
						var a = U(n, 2);
						Q(a);
						var o = U(a, 2), s = U(V(o)), c = V(s);
						N(s), N(o);
						var l = U(o, 2);
						Q(l);
						var u = U(l, 2), d = U(V(u)), f = V(d);
						N(d), N(u);
						var p = U(u, 2);
						Q(p), W((e, t, n) => {
							X(i, `${e ?? ""}%`), $(a, K(E).nav.style?.imageOpacity ?? 1), X(c, `${t ?? ""}%`), $(l, K(E).nav.style?.imageY ?? 50), X(f, `${n ?? ""}%`), $(p, K(E).nav.style?.imageX ?? 50);
						}, [
							() => Math.round((K(E).nav.style?.imageOpacity ?? 1) * 100),
							() => Math.round(K(E).nav.style?.imageY ?? 50),
							() => Math.round(K(E).nav.style?.imageX ?? 50)
						]), q("input", a, (e) => Xt("imageOpacity", Number(e.target.value))), q("input", l, (e) => Xt("imageY", Number(e.target.value))), q("input", p, (e) => Xt("imageX", Number(e.target.value))), Y(e, t);
					};
					Z(Te, (e) => {
						K(E).nav.style?.image && e(k);
					}), N(m), N(p);
					var Ee = U(p, 2), De = U(V(Ee), 2), Oe = V(De), A = U(V(Oe));
					{
						let e = /* @__PURE__ */ I(() => K(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ I(() => K(Zt) ? [
							["card", "Standard"],
							["pills", "Pille-punkter"],
							["lines", "Understrek-liste"]
						] : [
							["card", "Kort (standard)"],
							["flat", "Ren flate"],
							["pills", "Pille-punkter"],
							["lines", "Understrek-liste"],
							["flyout", "Utfall (full bredde)"]
						]);
						na(A, {
							get value() {
								return K(e);
							},
							get options() {
								return K(t);
							},
							onchange: (e) => Xt("subStyle", e === "card" ? void 0 : e)
						});
					}
					N(Oe);
					var ke = U(Oe, 2), j = (e) => {
						var t = To(), n = U(V(t));
						{
							let e = /* @__PURE__ */ I(() => K(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ I(at);
							wi(n, {
								get value() {
									return K(e);
								},
								get tokens() {
									return K(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => Xt("subPillColor", e)
							});
						}
						N(t), Y(e, t);
					};
					Z(ke, (e) => {
						K(E).nav.style?.subStyle === "pills" && e(j);
					});
					var M = U(ke, 2), Ae = U(V(M));
					Q(Ae), N(M);
					var je = U(M, 2), Me = (e) => {
						var t = Eo(), n = V(t);
						Q(n), P(), N(t), W(() => ni(n, K(E).nav.style?.subImage === !0)), q("change", n, (e) => Xt("subImage", e.target.checked ? !0 : void 0)), Y(e, t);
					};
					Z(je, (e) => {
						K(E).nav.style?.image && e(Me);
					}), N(De), N(Ee);
					var Ne = U(Ee, 2), Pe = U(V(Ne), 2), Fe = V(Pe);
					Lr(Fe, 17, () => K(E).nav.items, Nr, (e, t, n) => {
						var r = ko(), i = H(r), o = V(i);
						Q(o);
						var s = U(o, 2), c = V(s);
						Ur(c, () => a.plus, !0), N(c);
						var l = U(c, 2);
						l.disabled = n === 0, Ur(l, () => a.up, !0), N(l);
						var u = U(l, 2);
						Ur(u, () => a.down, !0), N(u);
						var d = U(u, 2);
						Ur(d, () => a.cross, !0), N(d), N(s);
						var f = U(s, 2), p = V(f);
						{
							let e = /* @__PURE__ */ I(() => K(t).page ?? (K(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ I(() => [
								...K(E).pages.map((e) => [e.id, e.title]),
								["__href", "Ekstern lenke"],
								...K(t).children ? [["__none", "Ingen lenke (kun åpner undermenyen)"]] : []
							]);
							na(p, {
								get value() {
									return K(e);
								},
								title: "Hvor lenken går",
								get options() {
									return K(r);
								},
								onchange: (e) => $n(n, e)
							});
						}
						N(f);
						var m = U(f, 2), h = (e) => {
							var r = Do();
							Q(r), W(() => $(r, K(t).href)), q("change", r, (e) => er(n, e.target.value)), Y(e, r);
						};
						Z(m, (e) => {
							!K(t).page && K(t).href != null && e(h);
						}), N(i), Lr(U(i, 2), 17, () => K(t).children ?? [], Nr, (e, r, i) => {
							var o = Oo(), s = V(o);
							Q(s);
							var c = U(s, 2), l = V(c);
							l.disabled = i === 0, Ur(l, () => a.up, !0), N(l);
							var u = U(l, 2);
							Ur(u, () => a.down, !0), N(u);
							var d = U(u, 2);
							Ur(d, () => a.cross, !0), N(d), N(c);
							var f = U(c, 2), p = V(f);
							{
								let e = /* @__PURE__ */ I(() => K(r).page ?? "__href"), t = /* @__PURE__ */ I(() => [...K(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								na(p, {
									get value() {
										return K(e);
									},
									title: "Hvor lenken går",
									get options() {
										return K(t);
									},
									onchange: (e) => or(n, i, e)
								});
							}
							N(f);
							var m = U(f, 2), h = (e) => {
								var t = Do();
								Q(t), W(() => $(t, K(r).href ?? "")), q("change", t, (e) => sr(n, i, e.target.value)), Y(e, t);
							};
							Z(m, (e) => {
								K(r).page || e(h);
							}), N(o), W(() => {
								$(s, K(r).label), u.disabled = i === K(t).children.length - 1;
							}), q("input", s, (e) => ar(n, i, e.target.value)), q("click", l, () => cr(n, i, -1)), q("click", u, () => cr(n, i, 1)), q("click", d, () => lr(n, i)), Y(e, o);
						}), W(() => {
							$(o, K(t).label), u.disabled = n === K(E).nav.items.length - 1;
						}), q("input", o, (e) => Qn(n, e.target.value)), q("click", c, () => ir(n)), q("click", l, () => tr(n, -1)), q("click", u, () => tr(n, 1)), q("click", d, () => nr(n)), Y(e, r);
					});
					var Ie = U(Fe, 2);
					P(2), N(Pe), N(Ne), N(t), W((e) => {
						X(ee, `${e ?? ""}%`), $(C, 1 - (K(E).nav.style?.bgOpacity ?? .85)), ni(T, K(E).nav.style?.blur !== !1), X(Se, `${K(E).nav.style?.image ? "Bytt bakgrunnsbilde" : "Bakgrunnsbilde i menyen"} `), $(Ae, K(E).nav.style?.subColumns ?? 1);
					}, [() => Math.round((1 - (K(E).nav.style?.bgOpacity ?? .85)) * 100)]), q("input", C, (e) => Xt("bgOpacity", Math.round((1 - Number(e.target.value)) * 100) / 100)), q("change", T, (e) => Xt("blur", e.target.checked)), q("change", Ce, cn), q("change", Ae, (e) => Xt("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), q("click", Ie, rr), Y(e, t);
				}, d = (e) => {
					var t = Fo(), n = U(V(t), 2);
					wi(U(V(n)), {
						get value() {
							return K(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => ur("bg", e)
					}), N(n);
					var r = U(n, 2);
					wi(U(V(r)), {
						get value() {
							return K(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => ur("surface", e)
					}), N(r);
					var i = U(r, 2);
					wi(U(V(i)), {
						get value() {
							return K(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => ur("text", e)
					}), N(i);
					var o = U(i, 2);
					wi(U(V(o)), {
						get value() {
							return K(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => ur("accent", e)
					}), N(o);
					var s = U(o, 2), c = U(V(s));
					{
						let e = /* @__PURE__ */ I(() => K(E).theme.tokens.color["accent-text"] ?? K(E).theme.tokens.color.bg);
						wi(c, {
							get value() {
								return K(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => ur("accent-text", e)
						});
					}
					N(s);
					var l = U(s, 2), u = U(V(l), 2), d = V(u), f = (e) => {
						var t = jo(), n = H(t), r = U(V(n));
						{
							let e = /* @__PURE__ */ I(() => K(E).theme.scheme ?? "light");
							na(r, {
								get value() {
									return K(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => xr(e)
							});
						}
						N(n);
						var i = U(n, 4);
						Lr(i, 17, () => Object.entries(K(E).theme.alt.tokens.color), Nr, (e, t) => {
							var n = /* @__PURE__ */ I(() => m(K(t), 1));
							let r = () => K(n)[0];
							var i = So(), a = V(i), o = U(a);
							{
								let e = /* @__PURE__ */ I(() => `Alternativ ${r()}`);
								wi(o, {
									get value() {
										return K(E).theme.alt.tokens.color[r()];
									},
									get label() {
										return K(e);
									},
									onchange: (e) => br(r(), e)
								});
							}
							N(i), W(() => X(a, `${{
								bg: "Bakgrunn",
								surface: "Flater",
								text: "Tekst",
								accent: "Aksent",
								"accent-text": "Tekst på aksent"
							}[r()] ?? r() ?? ""} `)), Y(e, i);
						});
						var o = U(i, 2), s = V(o), c = U(s, 2);
						Ur(c, () => a.cross, !0), N(c), N(o), q("click", s, _r), q("click", c, yr), Y(e, t);
					}, p = (e) => {
						var t = Mo(), n = H(t);
						P(2), q("click", n, hr), Y(e, t);
					};
					Z(d, (e) => {
						K(E).theme.alt ? e(f) : e(p, -1);
					}), N(u), N(l);
					var h = U(l, 4), g = U(V(h));
					{
						let e = /* @__PURE__ */ I(() => [...Aa.some(([, e]) => e === K(E).theme.tokens.font.heading) ? [] : [[K(E).theme.tokens.font.heading, "Egendefinert"]], ...Aa.map(([e, t]) => [t, e])]);
						na(g, {
							get value() {
								return K(E).theme.tokens.font.heading;
							},
							get options() {
								return K(e);
							},
							onchange: (e) => dr("heading", e)
						});
					}
					N(h);
					var _ = U(h, 2), v = U(V(_));
					{
						let e = /* @__PURE__ */ I(() => [...Aa.some(([, e]) => e === K(E).theme.tokens.font.body) ? [] : [[K(E).theme.tokens.font.body, "Egendefinert"]], ...Aa.map(([e, t]) => [t, e])]);
						na(v, {
							get value() {
								return K(E).theme.tokens.font.body;
							},
							get options() {
								return K(e);
							},
							onchange: (e) => dr("body", e)
						});
					}
					N(_);
					var y = U(_, 4), b = U(V(y));
					Q(b), N(y);
					var x = U(y, 2), S = U(V(x));
					Q(S), N(x);
					var ee = U(x, 4), C = U(V(ee)), w = (e) => {
						var t = No();
						W(() => ri(t, "src", K(E).site.icon)), Y(e, t);
					};
					Z(C, (e) => {
						K(E).site.icon && e(w);
					}), N(ee);
					var T = U(ee, 2), te = V(T), ne = V(te), re = U(ne);
					N(te);
					var ie = U(te, 2), D = (e) => {
						var t = Po(), n = H(t);
						Ur(n, () => a.pencil ?? "✎", !0), N(n);
						var r = U(n, 2);
						Ur(r, () => a.cross, !0), N(r), q("click", n, () => B(Wt, K(E).site.icon, !0)), q("click", r, qt), Y(e, t);
					};
					Z(ie, (e) => {
						K(E).site.icon && e(D);
					}), N(T), P(2), N(t), W(() => {
						$(b, K(E).theme.tokens.radius.sm), $(S, K(E).theme.tokens.radius.md), X(ne, `${K(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), q("change", b, (e) => fr("sm", e.target.value)), q("change", S, (e) => fr("md", e.target.value)), q("change", re, Gt), Y(e, t);
				}, f = (e) => {
					var t = zo();
					let n;
					var r = U(V(t), 2), i = U(V(r), 2), a = V(i), o = U(a, 2);
					N(i), N(r);
					var s = U(r, 2), c = U(s, 2), l = U(V(c));
					N(c);
					var u = U(c, 2), d = U(u, 2), f = U(d, 2), p = U(f, 2), m = U(V(p), 2), h = V(m), g = U(h, 2), _ = U(V(g));
					N(g), N(m), N(p);
					var v = U(p, 2), y = U(V(v), 2), x = V(y), S = U(x, 2), ee = U(S, 2), C = U(ee, 2), w = U(C, 2);
					N(y), N(v);
					var T = U(v, 2), E = (e) => {
						var t = Ro(), n = U(V(t), 2);
						Lr(n, 21, () => K(Gr), (e) => e.type, (e, t) => {
							var n = Dr(), r = H(n), i = (e) => {
								var n = Lo(), r = V(n), i = V(r, !0);
								N(r);
								var a = U(r, 2);
								Lr(a, 21, () => K(t).variants, (e) => e.label, (e, n) => {
									var r = Io(), i = V(r, !0);
									N(r), W(() => {
										ri(r, "title", `Fra pluginen ${K(t).plugin ?? ""}`), X(i, K(n).label);
									}), q("click", r, () => Kr(K(t), K(n).props)), Y(e, r);
								}), N(a), N(n), W(() => X(i, K(t).label)), Y(e, n);
							}, a = (e) => {
								var n = Io(), r = V(n, !0);
								N(n), W(() => {
									ri(n, "title", `Fra pluginen ${K(t).plugin ?? ""}`), X(r, K(t).label);
								}), q("click", n, () => Kr(K(t))), Y(e, n);
							};
							Z(r, (e) => {
								K(t).variants?.length ? e(i) : e(a, -1);
							}), Y(e, n);
						}), N(n), N(t), Y(e, t);
					};
					Z(T, (e) => {
						K(Gr).length && e(E);
					}), N(t), W(() => {
						n = Yr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: K(b) === "mobile" }), ri(t, "title", K(b) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), q("click", a, () => Wr("text")), q("click", o, () => Wr("text-box")), q("click", s, () => Wr("button")), q("change", l, Jr), q("click", u, () => Wr("video")), q("click", d, () => Wr("icon")), q("click", f, () => Wr("samling")), q("click", h, () => Wr("galleri")), q("change", _, ei), q("click", x, () => Wr("shape-line")), q("click", S, () => Wr("shape-arrow")), q("click", ee, () => Wr("shape-circle")), q("click", C, () => Wr("shape-rect")), q("click", w, () => Wr("shape-triangle")), Y(e, t);
				}, p = (e) => {
					var t = Bo(), n = U(V(t), 2), r = U(V(n)), i = V(r);
					N(r), N(n);
					var a = U(n, 2);
					Q(a);
					var o = U(a, 2), s = V(o);
					Q(s), P(), N(o), P(2), N(t), W(() => {
						X(i, `${K(v).size ?? ""} px`), $(a, K(v).size), ni(s, K(v).snap !== !1);
					}), q("input", a, (e) => ht("size", Number(e.target.value))), q("change", s, (e) => ht("snap", e.target.checked)), Y(e, t);
				}, h = (e) => {
					var t = es(), i = V(t), o = (e) => {
						var t = Vo(), r = H(t), i = V(r);
						N(r);
						var a = U(r, 2);
						n(a), W(() => X(i, `${Ne[K(k).type] ?? K(k).type ?? ""}-blokk`)), Y(e, t);
					}, s = (e) => {
						var t = Qo(), n = U(H(t), 2), i = U(V(n));
						Q(i), N(n);
						var o = U(n, 6), s = V(o);
						Q(s), P(), N(o);
						var c = U(o, 2), l = (e) => {
							var t = Ho(), n = H(t), r = U(V(n)), i = V(r);
							N(r), N(n);
							var a = U(n, 2);
							Q(a), W(() => {
								X(i, `${K(Re).size ?? ""} px`), $(a, K(Re).size);
							}), q("input", a, (e) => mt("size", Number(e.target.value))), Y(e, t);
						};
						Z(c, (e) => {
							K(Re) && e(l);
						});
						var u = U(c, 8);
						Lr(u, 17, () => K(Be), Nr, (e, t, n) => {
							var i = Zo(), o = V(i), s = V(o);
							{
								let e = /* @__PURE__ */ I(() => r.map(([e, t]) => [e, t.label]));
								na(s, {
									get value() {
										return K(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return K(e);
									},
									onchange: (e) => Qe(n, e)
								});
							}
							var c = U(s, 2), l = V(c);
							l.disabled = n === 0, Ur(l, () => a.up, !0), N(l);
							var u = U(l, 2);
							Ur(u, () => a.down, !0), N(u);
							var d = U(u, 2);
							Ur(d, () => a.cross, !0), N(d), N(c), N(o);
							var f = U(o, 2), p = (e) => {
								var r = Uo(), i = H(r), a = U(V(i));
								{
									let e = /* @__PURE__ */ I(at);
									wi(a, {
										get value() {
											return K(t).props.value;
										},
										get tokens() {
											return K(e);
										},
										label: "Lagets farge",
										onchange: (e) => F(n, "value", e)
									});
								}
								N(i);
								var o = U(i, 2), s = U(V(o)), c = V(s);
								N(s), N(o);
								var l = U(o, 2);
								Q(l), W((e) => {
									X(c, `${e ?? ""}%`), $(l, K(t).props.opacity ?? 1);
								}, [() => Math.round((K(t).props.opacity ?? 1) * 100)]), q("input", l, (e) => F(n, "opacity", Number(e.target.value))), Y(e, r);
							}, m = (e) => {
								var r = Wo(), i = H(r), a = U(V(i));
								{
									let e = /* @__PURE__ */ I(at);
									wi(a, {
										get value() {
											return K(t).props.stops[0];
										},
										get tokens() {
											return K(e);
										},
										label: "Gradient fra",
										onchange: (e) => Ze(n, 0, e)
									});
								}
								N(i);
								var o = U(i, 2), s = U(V(o));
								{
									let e = /* @__PURE__ */ I(at);
									wi(s, {
										get value() {
											return K(t).props.stops[K(t).props.stops.length - 1];
										},
										get tokens() {
											return K(e);
										},
										label: "Gradient til",
										onchange: (e) => Ze(n, K(t).props.stops.length - 1, e)
									});
								}
								N(o);
								var c = U(o, 2), l = U(V(c)), u = V(l);
								N(l), N(c);
								var d = U(c, 2);
								Q(d);
								var f = U(d, 2), p = U(V(f)), m = V(p);
								N(p), N(f);
								var h = U(f, 2);
								Q(h);
								var g = U(h, 2), _ = V(g);
								Q(_), P(), N(g), W((e, n) => {
									X(u, `${K(t).props.angle ?? ""}°`), $(d, K(t).props.angle), X(m, `${e ?? ""}%`), $(h, K(t).props.opacity ?? 1), ni(_, n);
								}, [() => Math.round((K(t).props.opacity ?? 1) * 100), () => !!K(t).props.animate]), q("input", d, (e) => F(n, "angle", Number(e.target.value))), q("input", h, (e) => F(n, "opacity", Number(e.target.value))), q("change", _, (e) => F(n, "animate", e.target.checked)), Y(e, r);
							}, h = (e) => {
								var r = Go(), i = H(r), a = U(V(i));
								{
									let e = /* @__PURE__ */ I(at);
									wi(a, {
										get value() {
											return K(t).props.color;
										},
										get tokens() {
											return K(e);
										},
										label: "Glødens farge",
										onchange: (e) => F(n, "color", e)
									});
								}
								N(i);
								var o = U(i, 2), s = U(V(o)), c = V(s);
								N(s), N(o);
								var l = U(o, 2);
								Q(l);
								var u = U(l, 2), d = U(V(u)), f = V(d);
								N(d), N(u);
								var p = U(u, 2);
								Q(p);
								var m = U(p, 2), h = U(V(m)), g = V(h);
								N(h), N(m);
								var _ = U(m, 2);
								Q(_);
								var v = U(_, 2), y = U(V(v)), b = V(y);
								N(y), N(v);
								var x = U(v, 2);
								Q(x), W((e, n, r, i) => {
									X(c, `${e ?? ""}%`), $(l, K(t).props.x), X(f, `${n ?? ""}%`), $(p, K(t).props.y), X(g, `${r ?? ""}%`), $(_, K(t).props.radius), X(b, `${i ?? ""}%`), $(x, K(t).props.opacity);
								}, [
									() => Math.round(K(t).props.x * 100),
									() => Math.round(K(t).props.y * 100),
									() => Math.round(K(t).props.radius * 100),
									() => Math.round(K(t).props.opacity * 100)
								]), q("input", l, (e) => F(n, "x", Number(e.target.value))), q("input", p, (e) => F(n, "y", Number(e.target.value))), q("input", _, (e) => F(n, "radius", Number(e.target.value))), q("input", x, (e) => F(n, "opacity", Number(e.target.value))), Y(e, r);
							}, g = (e) => {
								var r = Ko(), i = H(r), a = U(V(i)), o = V(a);
								N(a), N(i);
								var s = U(i, 2);
								Q(s), W((e) => {
									X(o, `${e ?? ""}%`), $(s, K(t).props.opacity);
								}, [() => Math.round(K(t).props.opacity * 100)]), q("input", s, (e) => F(n, "opacity", Number(e.target.value))), Y(e, r);
							}, _ = (e) => {
								var r = Jo(), i = H(r), a = V(i), o = U(a);
								N(i);
								var s = U(i, 2), c = U(V(s));
								{
									let e = /* @__PURE__ */ I(() => K(t).props.fit ?? "cover");
									na(c, {
										get value() {
											return K(e);
										},
										options: [
											["cover", "Fyll (beskjæres)"],
											["contain", "Vis hele"],
											["repeat", "Gjenta (mønster)"]
										],
										onchange: (e) => F(n, "fit", e)
									});
								}
								N(s);
								var l = U(s, 2), u = (e) => {
									var r = qo(), i = H(r), a = U(V(i)), o = V(a);
									N(a), N(i);
									var s = U(i, 2);
									Q(s);
									var c = U(s, 2), l = U(V(c)), u = V(l);
									N(l), N(c);
									var d = U(c, 2);
									Q(d), W((e, n) => {
										X(o, `${e ?? ""}%`), $(s, K(t).props.x ?? .5), X(u, `${n ?? ""}%`), $(d, K(t).props.y ?? .5);
									}, [() => Math.round((K(t).props.x ?? .5) * 100), () => Math.round((K(t).props.y ?? .5) * 100)]), q("input", s, (e) => F(n, "x", Number(e.target.value))), q("input", d, (e) => F(n, "y", Number(e.target.value))), Y(e, r);
								};
								Z(l, (e) => {
									(K(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = U(l, 2), f = U(V(d)), p = V(f);
								N(f), N(d);
								var m = U(d, 2);
								Q(m);
								var h = U(m, 2), g = U(V(h)), _ = V(g);
								N(g), N(h);
								var v = U(h, 2);
								Q(v), W((e) => {
									X(a, `${K(t).props.src ? "Bytt bilde" : "Velg bilde"} `), X(p, `${K(t).props.blur ?? 0 ?? ""} px`), $(m, K(t).props.blur ?? 0), X(_, `${e ?? ""}%`), $(v, K(t).props.opacity ?? 1);
								}, [() => Math.round((K(t).props.opacity ?? 1) * 100)]), q("change", o, (e) => $e(n, e)), q("input", m, (e) => F(n, "blur", Number(e.target.value))), q("input", v, (e) => F(n, "opacity", Number(e.target.value))), Y(e, r);
							}, v = (e) => {
								var r = Xo(), i = H(r), o = U(V(i));
								N(i);
								var s = U(i, 2);
								Lr(s, 17, () => K(t).props.images ?? [], Nr, (e, r, i) => {
									var o = Yo(), s = H(o), c = V(s), l = U(c, 2), u = V(l);
									u.disabled = i === 0, Ur(u, () => a.up, !0), N(u);
									var d = U(u, 2);
									Ur(d, () => a.down, !0), N(d);
									var f = U(d, 2);
									Ur(f, () => a.cross, !0), N(f), N(l), N(s);
									var p = U(s, 2), m = U(V(p)), h = V(m);
									N(m), N(p);
									var g = U(p, 2);
									Q(g);
									var _ = U(g, 2), v = U(V(_)), y = V(v);
									N(v), N(_);
									var b = U(_, 2);
									Q(b), W((e, n) => {
										ri(c, "src", K(r).src), d.disabled = i === K(t).props.images.length - 1, X(h, `${e ?? ""}%`), $(g, K(r).x ?? .5), X(y, `${n ?? ""}%`), $(b, K(r).y ?? .5);
									}, [() => Math.round((K(r).x ?? .5) * 100), () => Math.round((K(r).y ?? .5) * 100)]), q("click", u, () => tt(n, i, -1)), q("click", d, () => tt(n, i, 1)), q("click", f, () => rt(n, i)), q("input", g, (e) => it(n, i, "x", Number(e.target.value))), q("input", b, (e) => it(n, i, "y", Number(e.target.value))), Y(e, o);
								});
								var c = U(s, 2), l = U(V(c));
								{
									let e = /* @__PURE__ */ I(() => K(t).props.fit ?? "cover");
									na(l, {
										get value() {
											return K(e);
										},
										options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
										onchange: (e) => F(n, "fit", e)
									});
								}
								N(c);
								var u = U(c, 2), d = U(V(u));
								Q(d), N(u);
								var f = U(u, 2), p = U(V(f)), m = V(p);
								N(p), N(f);
								var h = U(f, 2);
								Q(h);
								var g = U(h, 2), _ = U(V(g)), v = V(_);
								N(_), N(g);
								var y = U(g, 2);
								Q(y);
								var b = U(y, 2), x = U(V(b)), S = V(x);
								N(x), N(b);
								var ee = U(b, 2);
								Q(ee), P(2), W((e, n) => {
									$(d, K(t).props.interval ?? 6), X(m, `${e ?? ""} s`), $(h, K(t).props.fade ?? 1.5), X(v, `${K(t).props.blur ?? 0 ?? ""} px`), $(y, K(t).props.blur ?? 0), X(S, `${n ?? ""}%`), $(ee, K(t).props.opacity ?? 1);
								}, [() => (K(t).props.fade ?? 1.5).toFixed(1), () => Math.round((K(t).props.opacity ?? 1) * 100)]), q("change", o, (e) => et(n, e)), q("change", d, (e) => F(n, "interval", Number(e.target.value))), q("input", h, (e) => F(n, "fade", Number(e.target.value))), q("input", y, (e) => F(n, "blur", Number(e.target.value))), q("input", ee, (e) => F(n, "opacity", Number(e.target.value))), Y(e, r);
							};
							Z(f, (e) => {
								K(t).type === "color" ? e(p) : K(t).type === "gradient" ? e(m, 1) : K(t).type === "glow" ? e(h, 2) : K(t).type === "grain" ? e(g, 3) : K(t).type === "image" ? e(_, 4) : K(t).type === "bildegalleri" && e(v, 5);
							}), N(i), W(() => u.disabled = n === K(Be).length - 1), q("click", l, () => Xe(n, -1)), q("click", u, () => Xe(n, 1)), q("click", d, () => Ye(n)), Y(e, i);
						});
						var d = U(u, 2), f = U(V(d));
						{
							let e = /* @__PURE__ */ I(() => r.map(([e, t]) => [e, t.label]));
							na(f, {
								get value() {
									return K(qe);
								},
								get options() {
									return K(e);
								},
								onchange: (e) => B(qe, e, !0)
							});
						}
						N(d);
						var p = U(d, 2), m = U(p, 4), h = U(V(m));
						{
							let e = /* @__PURE__ */ I(() => K(Ue)?.type ?? ""), t = /* @__PURE__ */ I(() => [["", "Ingen"], ...Object.entries(ka).map(([e, t]) => [e, t.label])]);
							na(h, {
								get value() {
									return K(e);
								},
								get options() {
									return K(t);
								},
								onchange: (e) => lt(e || null)
							});
						}
						N(m);
						var g = U(m, 2), _ = (e) => {
							var t = Ya(), n = H(t), r = U(V(n));
							Q(r), N(n);
							var i = U(n, 2), a = U(V(i));
							Q(a), N(i), P(2), W(() => {
								$(r, K(Ue).props.duration), $(a, K(Ue).props.delay);
							}), q("change", r, (e) => ut("duration", Number(e.target.value))), q("change", a, (e) => ut("delay", Number(e.target.value))), Y(e, t);
						};
						Z(g, (e) => {
							K(Ue) && ka[K(Ue).type]?.entrance && e(_);
						}), W(() => {
							$(i, K(ze)), ni(s, K(Re) !== null);
						}), q("change", i, (e) => dt(e.target.value)), q("change", s, (e) => pt(e.target.checked)), q("click", p, () => Je(K(qe))), Y(e, t);
					}, c = (e) => {
						Y(e, $o());
					};
					Z(i, (e) => {
						K(k) ? e(o) : K(Ie) ? e(s, 1) : e(c, -1);
					}), N(t), Y(e, t);
				}, g = (e) => {
					var t = ts(), n = U(V(t), 2), r = V(n);
					Q(r), P(), N(n);
					var i = U(n, 4);
					nt(i), ri(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = U(i, 4), o = U(V(a));
					{
						let e = /* @__PURE__ */ I(() => K(E).footer?.align ?? "center");
						na(o, {
							get value() {
								return K(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => Zn("footer", (t) => {
								t.align = e;
							})
						});
					}
					N(a), P(2), N(t), W((e) => {
						ni(r, e), $(i, K(E).footer?.text ?? "");
					}, [() => !!K(E).footer?.show]), q("change", r, (e) => Zn("footer", (t) => {
						t.show = e.target.checked;
					})), q("input", i, (e) => Zn("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), Y(e, t);
				}, y = (e) => {
					var t = ss(), n = U(V(t), 2), r = (e) => {
						var t = ns(), n = U(V(t));
						{
							let e = /* @__PURE__ */ I(() => K(mn) ?? ""), t = /* @__PURE__ */ I(() => [["", "Velg …"], ...K(fn).map((e) => [e, K(pn)[e]?.name ?? e])]);
							na(n, {
								get value() {
									return K(e);
								},
								get options() {
									return K(t);
								},
								onchange: (e) => B(mn, e || null, !0)
							});
						}
						N(t), Y(e, t);
					};
					Z(n, (e) => {
						K(fn).length && e(r);
					});
					var i = U(n, 2), o = (e) => {
						let t = /* @__PURE__ */ I(() => K(pn)[K(mn)]);
						var n = os(), r = H(n), i = V(r), o = U(i, 2);
						Ur(o, () => a.cross, !0), N(o), N(r);
						var s = U(r, 2);
						Lr(s, 19, () => K(t).entries, (e) => e.id, (e, n, r) => {
							var i = is(), o = V(i), s = V(o);
							N(o);
							var c = U(o, 2), l = V(c), u = V(l);
							Q(u);
							var d = U(u, 2), f = V(d);
							Ur(f, () => a.up, !0), N(f);
							var p = U(f, 2);
							Ur(p, () => a.down, !0), N(p);
							var m = U(p, 2);
							Ur(m, () => a.cross, !0), N(m), N(d), N(l);
							var h = U(l, 2), g = U(V(h));
							Q(g), N(h);
							var _ = U(h, 2);
							nt(_);
							var v = U(_, 2), y = U(V(v));
							Q(y), N(v);
							var b = U(v, 2), x = V(b), S = V(x), ee = U(S);
							N(x);
							var C = U(x, 2), w = (e) => {
								var t = rs(), r = H(t), i = U(r, 2);
								Ur(i, () => a.cross, !0), N(i), W(() => ri(r, "src", K(n).image)), q("click", i, () => Dn(K(mn), K(n).id, "image", "")), Y(e, t);
							};
							Z(C, (e) => {
								K(n).image && e(w);
							}), N(b), N(c), N(i), W((e) => {
								X(s, `${e ?? ""}${K(n).date ? ` · ${K(n).date}` : ""}`), $(u, K(n).title), f.disabled = K(r) === 0, p.disabled = K(r) === K(t).entries.length - 1, $(g, K(n).date ?? ""), $(_, K(n).text ?? ""), $(y, K(n).href ?? ""), X(S, `${K(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => K(n).title.replace(/<[^>]*>/g, "")]), q("change", u, (e) => Dn(K(mn), K(n).id, "title", e.target.value || "Uten tittel")), q("click", f, () => On(K(mn), K(r), -1)), q("click", p, () => On(K(mn), K(r), 1)), q("click", m, () => kn(K(mn), K(n).id)), q("change", g, (e) => Dn(K(mn), K(n).id, "date", e.target.value)), q("change", _, (e) => Dn(K(mn), K(n).id, "text", e.target.value)), q("change", y, (e) => Dn(K(mn), K(n).id, "href", e.target.value)), q("change", ee, (e) => An(K(mn), K(n).id, e)), Y(e, i);
						});
						var c = U(s, 2), l = (e) => {
							Y(e, as());
						};
						Z(c, (e) => {
							K(t).entries.length || e(l);
						}), P(2), q("click", i, () => En(K(mn))), q("click", o, () => Tn(K(mn))), Y(e, n);
					};
					Z(i, (e) => {
						K(mn) && K(pn)[K(mn)] && e(o);
					});
					var s = U(i, 2), c = U(V(s));
					Q(c), N(s);
					var l = U(s, 2);
					na(U(V(l)), {
						get value() {
							return K(gn);
						},
						get options() {
							return vn;
						},
						onchange: (e) => B(gn, e, !0)
					}), N(l);
					var u = U(l, 2);
					N(t), W((e) => u.disabled = e, [() => !K(hn).trim()]), q("keydown", c, (e) => e.key === "Enter" && wn()), si(c, () => K(hn), (e) => B(hn, e)), q("click", u, wn), Y(e, t);
				}, x = (e) => {
					var t = gs(), n = U(V(t), 2), r = (e) => {
						Y(e, cs());
					}, i = /* @__PURE__ */ I(() => !Vn().length);
					Z(n, (e) => {
						K(i) && e(r);
					});
					var o = U(n, 2);
					Lr(o, 16, Vn, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ I(() => Fn[t]), r = /* @__PURE__ */ I(() => (K(Pn)?.enabled ?? []).includes(t));
						var i = ds();
						let o;
						var s = V(i), c = V(s), l = V(c, !0);
						N(c);
						var u = U(c, 2), d = (e) => {
							var t = ls(), r = V(t);
							N(t), W(() => X(r, `v${K(n).version ?? ""}`)), Y(e, t);
						};
						Z(u, (e) => {
							K(n)?.version && e(d);
						});
						var f = U(u, 2), p = V(f), m = V(p);
						Q(m);
						var h = U(m);
						N(p);
						var g = U(p, 2);
						Ur(g, () => a.cross, !0), N(g), N(f), N(s);
						var _ = U(s, 2), v = (e) => {
							var t = us(), r = V(t, !0);
							N(t), W((e) => X(r, e), [() => K(n).errors.join("; ")]), Y(e, t);
						}, y = (e) => {
							var t = us(), r = V(t);
							N(t), W(() => X(r, `Krever motorversjon ${K(n).requiresEngine ?? ""} (denne siden kjører ${K(In) ?? ""}); pluginen hoppes over ved lasting.`)), Y(e, t);
						}, b = (e) => {
							var t = us(), r = V(t);
							N(t), W((e) => X(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(K(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(K(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), Y(e, t);
						};
						Z(_, (e) => {
							K(n)?.errors?.length ? e(v) : K(n) && !K(n).satisfied ? e(y, 1) : K(n)?.csp && e(b, 2);
						}), N(i), W((e) => {
							o = Yr(i, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": K(n)?.errors?.length }), X(l, K(n)?.name ?? t), ri(p, "title", K(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ni(m, K(r)), m.disabled = e, X(h, ` ${K(r) ? "På" : "Av"}`);
						}, [() => !!K(n)?.errors?.length]), q("change", m, (e) => Kn(t, e.target.checked)), q("click", g, () => Jn(t)), Y(e, i);
					});
					var s = U(o, 2), c = (e) => {
						var t = ps();
						Lr(U(H(t), 4), 16, () => K(zn), (e) => e, (e, t) => {
							var n = fs(), r = V(n), i = V(r), o = V(i, !0);
							N(i);
							var s = U(i, 2), c = (e) => {
								var n = ls(), r = V(n);
								N(n), W(() => X(r, `v${Fn[t].version ?? ""}`)), Y(e, n);
							};
							Z(s, (e) => {
								Fn[t]?.version && e(c);
							});
							var l = U(s, 2), u = V(l);
							Ur(u, () => a.right, !0), N(u), N(l), N(r), N(n), W(() => X(o, Fn[t]?.name ?? t)), q("click", u, () => Xn(t)), Y(e, n);
						}), Y(e, t);
					};
					Z(s, (e) => {
						K(zn).length && e(c);
					});
					var l = U(s, 2), u = (e) => {
						var t = Dr(), n = H(t), r = (e) => {
							Y(e, ms());
						};
						Z(n, (e) => {
							K(zn).length || e(r);
						}), Y(e, t);
					}, d = (e) => {
						var t = hs(), n = U(H(t), 2);
						Q(n);
						var r = U(n, 2), i = U(r, 2), a = (e) => {
							var t = us(), n = V(t, !0);
							N(t), W(() => X(n, K(Rn))), Y(e, t);
						};
						Z(i, (e) => {
							K(Rn) && e(a);
						}), W((e) => r.disabled = e, [() => !K(Ln).trim()]), q("keydown", n, (e) => e.key === "Enter" && Yn()), si(n, () => K(Ln), (e) => B(Ln, e)), q("click", r, Yn), Y(e, t);
					};
					Z(l, (e) => {
						K(Bn) === "ok" ? e(u) : e(d, -1);
					}), N(t), Y(e, t);
				}, S = (e) => {
					var t = xs(), n = U(V(t), 2), r = (e) => {
						Y(e, _s());
					}, i = (e) => {
						var t = co(), n = H(t), r = (e) => {
							var t = vs(), n = V(t, !0);
							N(t), W(() => X(n, K(xt))), Y(e, t);
						};
						Z(n, (e) => {
							K(xt) && e(r);
						});
						var i = U(n, 2), a = (e) => {
							var t = bs(), n = H(t);
							Lr(U(n, 2), 19, () => K(bt), (e) => e.sha, (e, t, n) => {
								var r = ys();
								let i;
								var a = V(r), o = V(a, !0);
								N(a);
								var s = U(a, 2), c = V(s);
								N(s), N(r), W((e) => {
									i = Yr(r, 1, "history-row svelte-1n46o8q", null, i, { head: K(n) === 0 }), ri(a, "title", K(t).sha), X(o, K(t).message), X(c, `${K(t).author ?? ""}${e ?? ""}`);
								}, [() => K(t).date ? ` · ${wt.format(new Date(K(t).date))}` : ""]), Y(e, r);
							}), W(() => {
								n.disabled = K(St) || !K(_)?.allowed, ri(n, "title", K(_)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), q("click", n, Tt), Y(e, t);
						};
						Z(i, (e) => {
							K(bt).length > 0 && e(a);
						}), Y(e, t);
					};
					Z(n, (e) => {
						K(bt) === null ? e(r) : e(i, -1);
					}), N(t), Y(e, t);
				};
				Z(s, (e) => {
					K(O) === "Sider" ? e(c) : K(O) === "Nav" ? e(u, 1) : K(O) === "Tema" ? e(d, 2) : K(O) === "Blokker" ? e(f, 3) : K(O) === "Grid" ? e(p, 4) : K(O) === "Egenskaper" ? e(h, 5) : K(O) === "Footer" ? e(g, 6) : K(O) === "Samlinger" ? e(y, 7) : K(O) === "Plugins" ? e(x, 8) : K(O) === "Historikk" && e(S, 9);
				}), N(t), W(() => X(o, K(O))), Y(e, t);
			};
			Z(o, (e) => {
				K(O) && e(s);
			}), Y(e, t);
		};
		Z(i, (e) => {
			K(y) && e(o);
		});
		var s = U(i, 2);
		let c;
		var u = V(s);
		di(u, (e) => B(g, e), () => K(g)), N(s), N(t), W(() => {
			c = Yr(s, 1, "frame-wrap svelte-1n46o8q", null, c, { mobile: K(b) === "mobile" }), ri(u, "src", `/?page=${K(l)}&preview=1`);
		}), vr("load", u, At), gr(u), Y(e, t);
	}, zi = (e) => {
		Y(e, Ts());
	};
	Z(Li, (e) => {
		K(c) ? e(Ri) : e(zi, -1);
	});
	var Bi = U(Li, 2), Vi = (e) => {
		ia(e, {
			get image() {
				return K(Wt);
			},
			onapply: Kt,
			oncancel: () => B(Wt, null)
		});
	};
	Z(Bi, (e) => {
		K(Wt) && e(Vi);
	});
	var Hi = U(Bi, 2), Ui = (e) => {
		var t = Ds(), n = V(t), r = V(n), i = V(r, !0);
		N(r);
		var a = U(r, 2);
		Lr(a, 16, () => K(he).lines, (e) => e, (e, t) => {
			var n = Es(), r = V(n, !0);
			N(n), W(() => X(r, t)), Y(e, n);
		});
		var o = U(a, 2), s = V(o), c = V(s, !0);
		N(s);
		var l = U(s, 2), u = V(l, !0);
		N(l), N(o), N(n), N(t), W(() => {
			X(i, K(he).title), X(c, K(he).cancelLabel), X(u, K(he).okLabel);
		}), q("click", s, () => _e(!1)), q("click", l, () => _e(!0)), Y(e, t);
	};
	Z(Hi, (e) => {
		K(he) && e(Ui);
	});
	var Wi = U(Hi, 2), Gi = (e) => {
		var t = Os(), n = V(t), r = U(V(n), 4), i = U(V(r));
		Q(i), N(r);
		var a = U(r, 2);
		wi(U(V(a)), {
			get value() {
				return K(be);
			},
			label: "Aksentfarge",
			onchange: (e) => B(be, e, !0)
		}), N(a);
		var o = U(a, 2);
		wi(U(V(o)), {
			get value() {
				return K(xe);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => B(xe, e, !0)
		}), N(o);
		var s = U(o, 4), c = V(s), l = U(c, 2);
		N(s), N(n), N(t), W((e) => l.disabled = e, [() => !K(ye).trim()]), q("keydown", i, (e) => e.key === "Enter" && Ce()), si(i, () => K(ye), (e) => B(ye, e)), q("click", c, Se), q("click", l, Ce), Y(e, t);
	};
	Z(Wi, (e) => {
		K(ve) && e(Gi);
	});
	var Ki = U(Wi, 2), qi = (e) => {
		var t = ks();
		let n;
		var r = V(t), i = V(r, !0);
		N(r);
		var a = U(r, 2);
		N(t), W(() => {
			n = Yr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: K(f) === "ok",
				error: K(f) === "error"
			}), X(i, K(d));
		}), q("click", a, () => h("")), Y(e, t);
	};
	Z(Ki, (e) => {
		K(d) && e(qi);
	}), N(_i);
	var Ji = U(_i, 2), Yi = (e) => {
		var t = As(), r = V(t), i = V(r), o = V(i);
		N(i);
		var s = U(i, 2);
		Ur(s, () => a.cross, !0), N(s), N(r);
		var c = U(r, 2), l = V(c);
		n(l), N(c), N(t), W(() => {
			Zr(t, `left: ${K(A).left ?? ""}px; top: ${K(A).top ?? ""}px`), X(o, `${Ne[K(k).type] ?? K(k).type ?? ""}-blokk`);
		}), q("click", s, () => B(A, null)), Y(e, t);
	};
	Z(Ji, (e) => {
		K(A) && K(k) && e(Yi);
	}), W(() => xi = Yr(bi, 1, "topbar svelte-1n46o8q", null, xi, { hidden: !K(y) })), Y(e, gi), He();
}
yr([
	"change",
	"click",
	"input",
	"keydown"
]);
//#endregion
//#region src/main.js
var Ns = Or(Ms, { target: document.getElementById("urd-admin") });
//#endregion
export { Ns as default };
