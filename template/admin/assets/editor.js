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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, ee = 1 << 19, te = 1 << 20, ne = 1 << 25, C = 65536, w = 1 << 21, T = 1 << 22, E = 1 << 23, re = Symbol("$state"), ie = Symbol("legacy props"), ae = Symbol(""), oe = Symbol("attributes"), D = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
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
var Ce = {}, we = Symbol("uninitialized"), Te = "http://www.w3.org/1999/xhtml", Ee = "http://www.w3.org/2000/svg", De = "http://www.w3.org/1998/Math/MathML";
function Oe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function O(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function ke() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function Ae(e) {
	k = e;
}
var A;
function je(e) {
	if (e === null) throw O(), Ce;
	return A = e;
}
function Me() {
	return je(/* @__PURE__ */ dn(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ dn(A) !== null) throw O(), Ce;
		A = e;
	}
}
function Ne(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ dn(n);
		A = n;
	}
}
function Pe(e = !0) {
	for (var t = 0, n = A;;) {
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
function M(e) {
	if (!e || e.nodeType !== 8) throw O(), Ce;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Fe(e) {
	return e === this.v;
}
function Ie(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Le(e) {
	return !Ie(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Re = [];
function ze(e, t = !1, n = !1) {
	return Be(e, /* @__PURE__ */ new Map(), "", Re, null, n);
}
function Be(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Be(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Be(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Be(t.toJSON(), n, r, i, t);
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
var Ve = null;
function He(e) {
	Ve = e;
}
function Ue(e, t = !1, n) {
	Ve = {
		p: Ve,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: null
	};
}
function We(e) {
	var t = Ve, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ve = t.p, e ?? {};
}
function Ge() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ke = [];
function qe() {
	var e = Ke;
	Ke = [], f(e);
}
function Je(e) {
	if (Ke.length === 0 && !jt) {
		var t = Ke;
		queueMicrotask(() => {
			t === Ke && qe();
		});
	}
	Ke.push(e);
}
function Ye() {
	for (; Ke.length > 0;) qe();
}
function Xe(e) {
	var t = U;
	if (t === null) return H.f |= E, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ze(e, t);
}
function Ze(e, t) {
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
var Qe = ~(g | _ | h);
function $e(e, t) {
	e.f = e.f & Qe | t;
}
function et(e) {
	e.f & 512 || e.deps === null ? $e(e, h) : $e(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function tt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= C, tt(t.deps));
}
function nt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), tt(e.deps), $e(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var rt = !1;
function it(e) {
	var t = rt;
	try {
		return rt = !1, [e(), rt];
	} finally {
		rt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function at(e) {
	k && /* @__PURE__ */ un(e) !== null && B(e);
}
var ot = !1;
function st() {
	ot || (ot = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = H, n = U;
	Wn(null), Gn(null);
	try {
		return e();
	} finally {
		Wn(t), Gn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), st();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ut(e) {
	let t = 0, n = Xt(0), r;
	return () => {
		vn() && (W(n), Tn(() => (t === 0 && (r = fr(() => e(() => en(n)))), t += 1, () => {
			Je(() => {
				--t, t === 0 && (r?.(), r = void 0, en(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var dt = S | ee;
function ft(e, t, n, r) {
	new pt(e, t, n, r);
}
var pt = class {
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
	#h = ut(() => (this.#m = Xt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (k) {
				let e = this.#t;
				Me();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, dt), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = Dn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Dn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), Je(() => {
			var e = this.#c = document.createDocumentFragment(), t = ln();
			e.append(t), this.#a = this.#x(() => Dn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Dn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Rn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Dn(() => t(this.#e));
			} else this.#b(P);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		nt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = U, n = H, r = Ve;
		Gn(this.#i), Wn(this.#i), He(this.#i.ctx);
		try {
			return Lt.ensure(), e();
		} catch (e) {
			return Xe(e), null;
		} finally {
			Gn(t), Wn(n), He(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Pn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Je(() => {
			this.#d = !1, this.#m && Qt(this.#m, this.#l);
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
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), k && (je(this.#t), Ne(), je(Pe()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				ke();
				return;
			}
			r = !0, i && Se(), this.#s !== null && Pn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ze(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Dn(() => {
						var t = U;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ze(e, this.#i.parent), null;
				}
			}));
		};
		Je(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ze(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ze(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function mt(e, t, n, r) {
	let i = Ge() ? vt : xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = U, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ze(e, s);
			}
			gt();
		}
	}
	var d = _t();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => Ze(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), gt();
	}) : f();
}
function ht() {
	var e = U, t = H, n = Ve, r = P;
	return function(i = !0) {
		Gn(e), Wn(t), He(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	Gn(null), Wn(null), He(null), e && P?.deactivate();
}
function _t() {
	var e = U, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | g;
	return U !== null && (U.f |= ee), {
		ctx: Ve,
		deps: null,
		effects: null,
		equals: Fe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: we,
		wv: 0,
		parent: U,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = U;
	r === null && fe();
	var i = void 0, a = Xt(we), o = !H, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(gt);
		} catch (e) {
			n.reject(e), gt();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = _t();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(yt);
			else for (let e of s.values()) e.reject(yt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= E, Qt(a, t)) : (a.f & 8388608 && (a.f ^= E), Qt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(yt);
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
function N(e) {
	let t = /* @__PURE__ */ vt(e);
	return qn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = Le, t;
}
function St(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function Ct(e) {
	var t, n = U, r = e.parent;
	if (!Vn && r !== null && e.v !== we && r.f & 24576) return Oe(), e.v;
	Gn(r);
	try {
		e.f &= ~C, St(e), t = ar(e);
	} finally {
		Gn(n);
	}
	return t;
}
function wt(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = nr(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), Ot?.capture(e, t, !0)), e.deps === null))) {
		$e(e, h);
		return;
	}
	Vn || (kt === null ? et(e) : (vn() || P?.is_fork) && kt.set(e, t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), sr(t, 0), kn(t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && cr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Dt = null, P = null, Ot = null, kt = null, At = null, jt = !1, Mt = !1, Nt = null, Pt = null, Ft = 0, It = 1, Lt = class e {
	id = It++;
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
		Dt === null ? Dt = this : (Dt.#n = this, this.#t = Dt), Dt = this;
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
			for (var r of n.d) $e(r, g), t(r);
			for (r of n.m) $e(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Ft++ > 1e3 && (this.#x(), zt());
		for (let e of this.#u) this.#d.delete(e), $e(e, g), this.schedule(e);
		for (let e of this.#d) $e(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Nt = [], r = [], i = Pt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Kt(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Nt = null, Pt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Gt(e, t);
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
		this.#r.clear(), Ot = this, Vt(r), Vt(n), Ot = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : rr(r) && (i & 16 && this.#d.add(r), cr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), $e(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), P = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) nt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== we && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), kt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, kt = null;
	}
	flush() {
		try {
			Mt = !0, P = this, this.#g();
		} finally {
			Ft = 0, At = null, Nt = null, Pt = null, Mt = !1, P = null, kt = null, Jt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(yt);
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
		this.#m || (this.#m = !0, Je(() => {
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
			!Mt && !jt && Je(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		kt = null;
	}
	schedule(e) {
		if (At = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Nt !== null && t === U && (H === null || !(H.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Dt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Rt(e) {
	var t = jt;
	jt = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (Ye(), P === null) return n;
			P.flush();
		}
	} finally {
		jt = t;
	}
}
function zt() {
	try {
		_e();
	} catch (e) {
		Ze(e, At);
	}
}
var Bt = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && rr(r) && (Bt = /* @__PURE__ */ new Set(), cr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), Bt?.size > 0)) {
				Jt.clear();
				for (let e of Bt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Bt.has(n) && (Bt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || cr(n);
					}
				}
				Bt.clear();
			}
		}
		Bt = null;
	}
}
function Ht(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Ht(i, t, n, r) : e & 4194320 && !(e & 2048) && Ut(i, t, r) && ($e(i, g), Wt(i));
	}
}
function Ut(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Ut(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Wt(e) {
	P.schedule(e);
}
function Gt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), $e(e, h);
		for (var n = e.first; n !== null;) Gt(n, t), n = n.next;
	}
}
function Kt(e) {
	$e(e, h);
	for (var t = e.first; t !== null;) Kt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var qt = /* @__PURE__ */ new Set(), Jt = /* @__PURE__ */ new Map(), Yt = !1;
function Xt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Fe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Xt(e, t);
	return qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Zt(e, t = !1, n = !0) {
	let r = Xt(e);
	return t || (r.equals = Le), r;
}
function I(e, t, n = !1) {
	return H !== null && (!Un || H.f & 131072) && Ge() && H.f & 4325394 && (Kn === null || !Kn.has(e)) && xe(), Qt(e, n ? nn(t) : t, Pt);
}
function Qt(e, t, n = null) {
	if (!e.equals(t)) {
		Jt.set(e, Vn ? t : e.v);
		var r = Lt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), kt === null && et(t);
		}
		e.wv = nr(), tn(e, g, n), Ge() && U !== null && U.f & 1024 && !(U.f & 96) && (Xn === null ? Zn([e]) : Xn.push(e)), !r.is_fork && qt.size > 0 && !Yt && $t();
	}
	return t;
}
function $t() {
	Yt = !1;
	for (let e of qt) {
		e.f & 1024 && $e(e, _);
		let t;
		try {
			t = rr(e);
		} catch {
			t = !0;
		}
		t && cr(e);
	}
	qt.clear();
}
function en(e) {
	I(e, e.v + 1);
}
function tn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ge(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && $e(s, t), c & 131072) qt.add(s);
			else if (c & 2) {
				var u = s;
				kt?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= C), tn(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Bt !== null && Bt.add(d), n === null ? Wt(d) : n.push(d);
			}
		}
	}
}
function nn(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = er, f = (e) => {
		if (er === d) return e();
		var t = H, n = er;
		Wn(null), tr(d);
		var r = e();
		return Wn(t), tr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ye();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ F(n.value, u);
				return r.set(t, e), e;
			}) : I(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ F(we, u));
					r.set(t, e), en(o);
				}
			} else I(n, we), en(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(nn(s ? e[n] : we), u)), r.set(n, o)), o !== void 0) {
				var c = W(o);
				return c === we ? void 0 : c;
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
				if (a !== void 0 && o !== we) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== we || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? nn(e[t]) : we, u)), r.set(t, n)), W(n) === we) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(we, u)), r.set(d + "", p)) : I(p, we);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, nn(n)), r.set(t, c));
			else {
				l = c.v !== we;
				var m = f(() => nn(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				en(o);
			}
			return !0;
		},
		ownKeys(e) {
			W(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== we;
			});
			for (var [n, i] of r) i.v !== we && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			be();
		}
	});
}
var rn, an, on, sn;
function cn() {
	if (rn === void 0) {
		rn = window, an = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		on = a(t, "firstChild").get, sn = a(t, "nextSibling").get, u(e) && (e[D] = void 0, e[oe] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
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
function L(e, t) {
	if (!k) return /* @__PURE__ */ un(e);
	var n = /* @__PURE__ */ un(A);
	if (n === null) n = A.appendChild(ln());
	else if (t && n.nodeType !== 3) {
		var r = ln();
		return n?.before(r), je(r), r;
	}
	return t && mn(n), je(n), n;
}
function R(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ un(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ dn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = ln();
			return A?.before(r), je(r), r;
		}
		mn(A);
	}
	return A;
}
function z(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ dn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = ln();
			return r === null ? i?.after(a) : r.before(a), je(a), a;
		}
		mn(r);
	}
	return je(r), r;
}
function B(e) {
	e.textContent = "";
}
function fn() {
	return !1;
}
function pn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function mn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function hn(e) {
	U === null && (H === null && ge(e), he()), Vn && me(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = U;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Ve,
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
	if (e & 4) Nt === null ? Lt.ensure().schedule(r) : Nt.push(r);
	else if (t !== null) {
		try {
			cr(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && gn(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function vn() {
	return H !== null && !Un;
}
function yn(e) {
	let t = _n(8, null);
	return $e(t, h), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = U.f;
	if (!H && t & 32 && Ve !== null && !Ve.i) {
		var n = Ve;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | te, e);
}
function Sn(e) {
	Lt.ensure();
	let t = _n(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Pn(t, () => {
			jn(t), n(void 0);
		}) : (jn(t), n(void 0));
	});
}
function Cn(e) {
	return _n(4, e);
}
function wn(e) {
	return _n(T | ee, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(W));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | ee, e);
}
function On(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Vn, n = H;
		Hn(!0), Wn(null);
		try {
			t.call(null);
		} finally {
			Hn(e), Wn(n);
		}
	}
}
function kn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : jn(n, t), n = r;
	}
}
function An(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || jn(t), t = n;
	}
}
function jn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Mn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, kn(e, t && !n), sr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	On(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Nn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Mn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ dn(e);
		e.remove(), e = n;
	}
}
function Nn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Pn(e, t, n = !0) {
	var r = [];
	Fn(e, r, !0);
	var i = () => {
		n && jn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Fn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Fn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function In(e) {
	Ln(e, !0);
}
function Ln(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || ($e(e, g), Lt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Ln(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Rn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ dn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var zn = null, Bn = !1, Vn = !1;
function Hn(e) {
	Vn = e;
}
var H = null, Un = !1;
function Wn(e) {
	H = e;
}
var U = null;
function Gn(e) {
	U = e;
}
var Kn = null;
function qn(e) {
	H !== null && (Kn ??= /* @__PURE__ */ new Set()).add(e);
}
var Jn = null, Yn = 0, Xn = null;
function Zn(e) {
	Xn = e;
}
var Qn = 1, $n = 0, er = $n;
function tr(e) {
	er = e;
}
function nr() {
	return ++Qn;
}
function rr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~C), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (rr(a) && wt(a), a.wv > e.wv) return !0;
		}
		t & 512 && kt === null && $e(e, h);
	}
	return !1;
}
function ir(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Kn !== null && Kn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ir(a, t, !1) : t === a && (n ? $e(a, g) : a.f & 1024 && $e(a, _), Wt(a));
	}
}
function ar(e) {
	var t = Jn, n = Yn, r = Xn, i = H, a = Kn, o = Ve, s = Un, c = er, l = e.f;
	Jn = null, Yn = 0, Xn = null, H = l & 96 ? null : e, Kn = null, He(e.ctx), Un = !1, er = ++$n, e.ac !== null && (ct(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= w;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (Jn !== null) {
			var m;
			if (p || sr(e, Yn), f !== null && Yn > 0) for (f.length = Yn + Jn.length, m = 0; m < Jn.length; m++) f[Yn + m] = Jn[m];
			else e.deps = f = Jn;
			if (vn() && e.f & 512) for (m = Yn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Yn < f.length && (sr(e, Yn), f.length = Yn);
		if (Ge() && Xn !== null && !Un && f !== null && !(e.f & 6146)) for (m = 0; m < Xn.length; m++) ir(Xn[m], e);
		if (i !== null && i !== e) {
			if ($n++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = $n;
			if (t !== null) for (let e of t) e.rv = $n;
			Xn !== null && (r === null ? r = Xn : r.push(...Xn));
		}
		return e.f & 8388608 && (e.f ^= E), d;
	} catch (e) {
		return Xe(e);
	} finally {
		e.f ^= w, Jn = t, Yn = n, Xn = r, H = i, Kn = a, He(o), Un = s, er = c;
	}
}
function or(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Jn === null || !n.call(Jn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~C), s.v !== we && et(s), s.ac !== null && ct(() => {
			s.ac.abort(ue), s.ac = null, $e(s, g);
		}), Tt(s), sr(s, 0);
	}
}
function sr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) or(e, n[r]);
}
function cr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		$e(e, h);
		var n = U, r = Bn;
		U = e, Bn = (t & 96) == 0;
		try {
			t & 16777232 ? An(e) : kn(e), On(e);
			var i = ar(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Qn;
		} finally {
			Bn = r, U = n;
		}
	}
}
async function lr() {
	await Promise.resolve(), Rt();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (zn?.add(e), H !== null && !Un && !(U !== null && U.f & 16384) && (Kn === null || !Kn.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < $n && (e.rv = $n, Jn === null && r !== null && r[Yn] === e ? Yn++ : Jn === null ? Jn = [e] : Jn.push(e));
		else {
			H.deps ??= [], n.call(H.deps, e) || H.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [H] : n.call(i, H) || i.push(H);
		}
	}
	if (Vn && Jt.has(e)) return Jt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || dr(a)) && (o = Ct(a)), Jt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Un && H !== null && (Bn || (H.f & 512) != 0), c = (a.f & b) === 0;
		rr(a) && (s && (a.f |= 512), wt(a)), s && !c && (Et(a), ur(a));
	}
	if (kt?.has(e)) return kt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ur(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Et(t), ur(t));
}
function dr(e) {
	if (e.v === we) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Jt.has(t) || t.f & 2 && dr(t)) return !0;
	return !1;
}
function fr(e) {
	var t = Un;
	try {
		return Un = !0, e();
	} finally {
		Un = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var pr = ["touchstart", "touchmove"];
function mr(e) {
	return pr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var hr = Symbol("events"), gr = /* @__PURE__ */ new Set(), _r = /* @__PURE__ */ new Set();
function vr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function yr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Cr.call(t, e), !e.cancelBubble) return ct(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Je(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function br(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = yr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[hr] ??= {})[e] = n;
}
function xr(e) {
	for (var t = 0; t < e.length; t++) gr.add(e[t]);
	for (var n of _r) n(e);
}
var Sr = null;
function Cr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Sr = e;
	var s = 0, c = Sr === e && e[hr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[hr] = t;
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
		Wn(null), Gn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[hr]?.[r];
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
			e[hr] = t, delete e.currentTarget, Wn(d), Gn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var wr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Tr(e) {
	return wr?.createHTML(e) ?? e;
}
function Er(e) {
	var t = pn("template");
	return t.innerHTML = Tr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Dr(e, t) {
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
		if (k) return Dr(A, null), A;
		i === void 0 && (i = Er(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ un(i)));
		var t = r || an ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ un(t), s = t.lastChild;
			Dr(o, s);
		} else Dr(t, t);
		return t;
	};
}
function Or(e = "") {
	if (!k) {
		var t = ln(e + "");
		return Dr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? mn(n) : (n.before(n = ln()), je(n)), Dr(n, n), n;
}
function kr() {
	if (k) return Dr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = ln();
	return e.append(t, n), Dr(t, n), e;
}
function q(e, t) {
	if (k) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Me();
		return;
	}
	e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function Ar(e, t) {
	return Mr(e, t);
}
var jr = /* @__PURE__ */ new Map();
function Mr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	cn();
	var l = void 0, u = Sn(() => {
		var s = n ?? t.appendChild(ln());
		ft(s, { pending: () => {} }, (t) => {
			Ue({});
			var n = Ve;
			if (o && (n.c = o), a && (i.$$events = a), k && Dr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw O(), Ce;
			We();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = mr(r);
					for (let e of [t, document]) {
						var a = jr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), jr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Cr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(gr)), _r.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = jr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Cr), r.delete(e), r.size === 0 && jr.delete(n)) : r.set(e, i);
			}
			_r.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Nr.set(l, u), l;
}
var Nr = /* @__PURE__ */ new WeakMap(), Pr = class {
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
			if (n) In(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (In(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (jn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Rn(r, t), t.append(ln()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else jn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Pn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (jn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = ln();
			i.append(a), this.#n.set(e, {
				effect: Dn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, Dn(() => t(this.anchor)));
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
	k && (r = A, Me());
	var i = new Pr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = M(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Pe();
				je(a), i.anchor = a, Ae(!1), i.ensure(e, t), Ae(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	En(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Fr(e, t) {
	return t;
}
function Ir(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Pn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Lr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			B(d), d.append(u), e.items.clear();
		}
		Lr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Lr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var Rr;
function zr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? je(/* @__PURE__ */ un(u)) : u.appendChild(ln());
	}
	k && Me();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Vr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ne, Ur(d, null, c)) : In(d) : Pn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: En(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			k && M(c) === "[!" != (e === 0) && (c = Pe(), je(c), Ae(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = fn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Ae(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Qt(S.v, b), S.i && Qt(S.i, y), v && u.unskip_effect(S.e)) : (S = Hr(l, h ? c : Rr ??= ln(), b, x, y, o, n, i), h || (S.e.f |= ne), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(Rr ??= ln())), d.f |= ne)), e > r.size && pe("", "", ""), k && e > 0 && je(Pe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Ae(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Br(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Vr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Br(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ne, _ === l) Ur(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Wr(e, d, _), Wr(e, _, y), Ur(_, y, n), d = _, p = [], m = [], l = Br(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ur(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Wr(e, S.prev, ee.next), Wr(e, d, S), Wr(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), Ur(_, l, n), Wr(e, _.prev, _.next), Wr(e, _, d === null ? e.effect.first : d.next), Wr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Br(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Br(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Lr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = Br(l.next);
		var C = te.length;
		if (C > 0) {
			var w = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < C; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < C; v += 1) te[v].nodes?.a?.fix();
			}
			Ir(e, te, w);
		}
	}
	o && Je(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Hr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Xt(n) : /* @__PURE__ */ Zt(n, !1, !1) : null, l = o & 2 ? Xt(i) : null;
	return {
		v: c,
		i: l,
		e: Dn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ur(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ dn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Wr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function X(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		k && (o = je(/* @__PURE__ */ un(c)));
	}
	V(() => {
		var e = U;
		if (s === (s = t() ?? "")) {
			k && Me();
			return;
		}
		if (n && !k) {
			e.nodes = null, c.innerHTML = s, s !== "" && Dr(/* @__PURE__ */ un(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (k) {
				for (var a = A.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ dn(l);
				if (l === null) throw O(), Ce;
				Dr(A, u), o = je(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? Ee : i ? De : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Dr(/* @__PURE__ */ un(f), f.lastChild), r || i) for (; /* @__PURE__ */ un(f);) o.before(/* @__PURE__ */ un(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Gr = [..." 	\n\r\f\xA0\v﻿"];
function Kr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Gr.includes(r[o - 1])) && (s === r.length || Gr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function qr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Jr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Yr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Jr)), i && c.push(...Object.keys(i).map(Jr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Jr(e.substring(l, u).trim());
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
		return r && (n += qr(r)), i && (n += qr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Xr(e, t, n, r, i, a) {
	var o = e[D];
	if (k || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[D] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Zr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Qr(e, t, n, r) {
	var i = e[se];
	if (k || i !== t) {
		var a = Yr(t, r);
		(!k || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? (Zr(e, n?.[0], r[0]), Zr(e, n?.[1], r[1], "important")) : Zr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var $r = Symbol("is custom element"), ei = Symbol("is html"), ti = de ? "link" : "LINK", ni = de ? "progress" : "PROGRESS";
function Z(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ii(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ii(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, Je(n), st();
	}
}
function Q(e, t) {
	var n = ai(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ni) || (e.value = t ?? "");
}
function ri(e, t) {
	var n = ai(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ii(e, t, n, r) {
	var i = ai(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ti) || i[t] !== (i[t] = n) && (t === "loading" && (e[ae] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[oe] ??= {
		[$r]: e.nodeName.includes("-"),
		[ei]: e.namespaceURI === Te
	};
}
var oi = /* @__PURE__ */ new Map();
function si(e) {
	var t = e.getAttribute("is") || e.nodeName, n = oi.get(t);
	if (n) return n;
	oi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ci(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = li(e) ? ui(a) : a, n(a), P !== null && r.add(P), await lr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || fr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), P !== null && r.add(P)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		li(e) && n === ui(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function li(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ui(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function di(e, t) {
	return e === t || e?.[re] === t;
}
function fi(e = {}, t, n, r) {
	var i = Ve.r, a = U;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], fr(() => {
				di(n(...s), e) || (t(e, ...s), o && di(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && di(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function pi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ vt(r), W(u)) : (l && (l = !1, c = s ? fr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || ie in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = it(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ve(t), f(m)));
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
	var v = !1, y = (n & 1 ? vt : xt)(() => (v = !1, g()));
	o && W(y);
	var b = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : i && o ? nn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : W(y);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function mi(e, t) {
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
		amendBaseline(e) {
			let t = JSON.parse(r);
			e(t), r = JSON.stringify(t);
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var hi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), gi = /* @__PURE__ */ K("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), _i = /* @__PURE__ */ K("<button type=\"button\"></button>"), vi = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), yi = /* @__PURE__ */ K("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), bi = /* @__PURE__ */ K("<span class=\"cp-tokens svelte-zxiloo\"></span>"), xi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Si = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ K("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), wi = /* @__PURE__ */ K("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Ti(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ F(nn([])), u = /* @__PURE__ */ F(nn([])), d = "", f = "", p = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F(!1), g = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0
	})), _ = /* @__PURE__ */ F(0), v = /* @__PURE__ */ F(0), y = /* @__PURE__ */ F(1), b = /* @__PURE__ */ F(1), x = /* @__PURE__ */ F("#000000");
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
	function te(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function ne(e, t, n) {
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
		return ee(...ne(W(_), W(v), W(y)));
	}
	function w() {
		let e = C();
		return W(b) >= .995 ? e : e + Math.round(W(b) * 255).toString(16).padStart(2, "0");
	}
	function T() {
		I(x, w(), !0), f = W(x), t.onchange?.(W(x));
	}
	function E(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			I(_, t[0], !0), I(v, t[1], !0), I(y, t[2], !0);
		})(te(t[0], t[1], t[2])), I(b, t[3], !0), I(x, w(), !0), !0) : !1;
	}
	function re() {
		E(s()) || E("#000000"), d = n(), f = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			I(l, Array.isArray(e) ? e : [], !0);
		} catch {
			I(l, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			I(u, Array.isArray(e) ? e : [], !0);
		} catch {
			I(u, [], !0);
		}
		let e = W(p).getBoundingClientRect(), t = W(p).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), c = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(g, {
			top: c,
			left: i
		}, !0), I(h, !0);
	}
	function ie() {
		if (I(h, !1), f && f !== d) {
			let e = [f, ...W(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function ae(e, n) {
		E(n), I(x, n, !0), t.onchange?.(e);
	}
	function oe(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			I(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), I(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), T();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function D(e) {
		E(e.target.value) ? T() : I(x, C(), !0);
	}
	function se(e) {
		return (S(C()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ce(e, t) {
		let n = S(C()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			I(_, t[0], !0), I(v, t[1], !0), I(y, t[2], !0);
		})(te(...n)), T();
	}
	let le = typeof window < "u" && "EyeDropper" in window;
	async function ue() {
		try {
			E((await new window.EyeDropper().open()).sRGBHex) && T();
		} catch {}
	}
	function de(e) {
		E(e) && T();
	}
	function fe() {
		let e = w();
		W(u).includes(e) || (I(u, [e, ...W(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(ze(W(u)))));
	}
	function pe(e) {
		I(u, W(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(ze(W(u))));
	}
	bn(() => {
		if (!W(h)) return;
		let e = (e) => {
			W(p) && !W(p).contains(e.target) && ie();
		}, t = (e) => {
			e.key === "Escape" && ie();
		}, n = () => ie();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var me = wi(), he = L(me);
	let ge;
	var _e = z(he, 2), ve = (e) => {
		var t = Ci(), i = L(t), a = L(i);
		j(i);
		var o = z(i, 2);
		Z(o);
		var s = z(o, 2);
		Z(s);
		var d = z(s, 2), f = L(d), p = z(f, 2);
		Z(p);
		var h = z(p, 2), S = (e) => {
			var t = hi();
			G("click", t, ue), q(e, t);
		};
		Y(h, (e) => {
			le && e(S);
		}), j(d);
		var ee = z(d, 2);
		zr(ee, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = gi();
			Z(r), V((e) => {
				ii(r, "title", t), Q(r, e);
			}, [() => se(W(n))]), G("change", r, (e) => ce(W(n), e.target.value)), q(e, r);
		}), j(ee);
		var te = z(ee, 2), ne = (e) => {
			var t = vi(), i = R(t), a = z(L(i)), o = (e) => {
				var t = Or();
				V((e) => J(t, `- koblet til «${e ?? ""}»`), [() => c()]), q(e, t);
			}, s = /* @__PURE__ */ N(() => c());
			Y(a, (e) => {
				W(s) && e(o);
			}), j(i);
			var l = z(i, 2);
			zr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ N(() => m(W(t), 2));
				let i = () => W(r)[0], a = () => W(r)[1];
				var o = _i();
				let s;
				V(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), ii(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), G("click", o, () => ae(i(), a())), q(e, o);
			}), j(l), q(e, t);
		};
		Y(te, (e) => {
			r().length && e(ne);
		});
		var w = z(te, 2), E = z(L(w));
		j(w);
		var re = z(w, 2), ie = (e) => {
			var t = bi();
			zr(t, 20, () => W(u), (e) => e, (e, t) => {
				var n = yi(), r = L(n), i = z(r, 2);
				j(n), V(() => {
					Qr(r, `background: ${t ?? ""}`), ii(r, "title", t);
				}), G("click", r, () => de(t)), G("click", i, () => pe(t)), q(e, n);
			}), j(t), q(e, t);
		};
		Y(re, (e) => {
			W(u).length && e(ie);
		});
		var me = z(re, 2), he = (e) => {
			var t = Si(), n = z(R(t), 2);
			zr(n, 20, () => W(l), (e) => e, (e, t) => {
				var n = xi();
				V(() => {
					Qr(n, `background: ${t ?? ""}`), ii(n, "title", t);
				}), G("click", n, () => de(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(me, (e) => {
			W(l).length && e(he);
		}), j(t), V((e, n) => {
			Qr(t, `top: ${W(g).top ?? ""}px; left: ${W(g).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${W(_) ?? ""}, 100%, 50%)`), Qr(a, `left: ${W(v) * 100}%; top: ${(1 - W(y)) * 100}%`), Q(o, W(_)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${W(x) ?? ""}`), Q(p, W(x));
		}, [() => Math.round(W(b) * 100), () => C()]), G("click", t, (e) => e.preventDefault()), G("pointerdown", i, oe), G("input", o, (e) => {
			I(_, Number(e.target.value), !0), T();
		}), G("input", s, (e) => {
			I(b, Number(e.target.value) / 100), T();
		}), G("change", p, D), G("click", E, fe), q(e, t);
	};
	Y(_e, (e) => {
		W(h) && e(ve);
	}), j(me), fi(me, (e) => I(p, e), () => W(p)), V((e, t, n) => {
		ge = Xr(he, 1, "cp-swatch svelte-zxiloo", null, ge, e), Qr(he, `background: ${t ?? ""}`), ii(he, "title", n), ii(he, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), G("click", he, () => W(h) ? ie() : re()), q(e, me), We();
}
xr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Ei = 1600, Di = .82, Oi = .6;
async function ki(e, t = Ei) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Di);
	return c.size > 4e5 && (c = await s(Oi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function Ai(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function ji(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/glyphs.js
var Mi = "urd-recent-glyphs", Ni = [
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
function Pi(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Fi() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Ii(e) {
	let t = Pi(Fi(), e);
	try {
		localStorage.setItem(Mi, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/icons.js
var Li = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Ri = "fill=\"currentColor\" stroke=\"none\"", zi = {
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
}, Bi = [
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
function Vi(e) {
	let t = typeof e == "string" ? zi[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Ri : Li} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Hi = /* @__PURE__ */ K("<img class=\"gp-own svelte-15ln1c3\" alt=\"Eget ikon\"/>"), Ui = /* @__PURE__ */ K("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Wi = /* @__PURE__ */ K("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Gi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ki = /* @__PURE__ */ K("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), qi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ji = /* @__PURE__ */ K("<button type=\"button\"> </button>"), Yi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Xi = /* @__PURE__ */ K("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Zi = /* @__PURE__ */ K("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Qi(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ F(nn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, Fi(), !0);
		let e = W(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		Ii(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ki(n, 256);
		t.onimage?.(r.dataUrl), I(l, !1);
	}
	bn(() => {
		if (!W(l)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && I(l, !1);
		}, t = (e) => {
			e.key === "Escape" && I(l, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && I(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = Zi(), _ = L(g), v = L(_), y = (e) => {
		var t = Hi();
		V(() => ii(t, "src", i())), q(e, t);
	}, b = (e) => {
		var t = Ui();
		X(t, () => Vi(r()), !0), j(t), q(e, t);
	}, x = (e) => {
		var t = Or();
		V(() => J(t, n() || "★")), q(e, t);
	};
	Y(v, (e) => {
		i() ? e(y) : r() && zi[r()] ? e(b, 1) : e(x, -1);
	}), j(_);
	var S = z(_, 2), ee = (e) => {
		var i = Xi(), a = L(i), s = (e) => {
			var t = Gi(), n = z(R(t), 2);
			zr(n, 20, () => W(o), (e) => e, (e, t) => {
				var n = Wi(), r = L(n, !0);
				j(n), V(() => J(r, t)), G("click", n, () => f(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(a, (e) => {
			W(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = kr();
			zr(R(t), 17, () => Bi, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => m(W(t), 2));
				let i = () => W(n)[0], a = () => W(n)[1];
				var o = qi(), s = R(o), c = L(s, !0);
				j(s);
				var l = z(s, 2);
				zr(l, 20, a, (e) => e, (e, t) => {
					var n = Ki();
					let i;
					var a = L(n);
					X(a, () => Vi(t), !0), j(a), j(n), V(() => {
						i = Xr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ii(n, "title", zi[t].label);
					}), G("click", n, () => p(t)), q(e, n);
				}), j(l), V(() => J(c, i())), q(e, o);
			}), q(e, t);
		};
		Y(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		zr(g, 17, () => Ni, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = qi(), s = R(o), c = L(s, !0);
			j(s);
			var l = z(s, 2);
			zr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Ji();
				let i;
				var a = L(r, !0);
				j(r), V(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), J(a, t);
				}), G("click", r, () => f(t)), q(e, r);
			}), j(l), V(() => J(c, i())), q(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = Yi(), n = z(R(t), 2), r = z(n, 2);
			fi(r, (e) => I(c, e), () => W(c)), Ne(2), G("click", n, () => W(c).click()), G("change", r, h), q(e, t);
		};
		Y(_, (e) => {
			t.onimage && e(v);
		}), j(i), V(() => Qr(i, `top: ${W(u).top ?? ""}px; left: ${W(u).left ?? ""}px`)), q(e, i);
	};
	Y(S, (e) => {
		W(l) && e(ee);
	}), j(g), fi(g, (e) => I(s, e), () => W(s)), V(() => {
		ii(_, "title", a()), ii(_, "aria-label", a());
	}), G("click", _, () => W(l) ? I(l, !1) : d()), q(e, g), We();
}
xr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function $i(e, t = {}) {
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
		sendShowGuides(e) {
			r({
				type: "urd-show-guides",
				visible: e
			});
		},
		sendAdminTheme(e) {
			r({
				type: "urd-admin-theme",
				colors: e
			});
		},
		sendSelect(e) {
			r({
				type: "urd-select",
				blockId: e
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
var ea = /* @__PURE__ */ K("<button type=\"button\"> </button>"), ta = /* @__PURE__ */ K("<div class=\"dd-pop svelte-vtocc6\"></div>"), na = /* @__PURE__ */ K("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = W(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		I(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (W(o)) {
				I(o, !1);
				return;
			}
			u(), I(o, !0);
		}
	}
	function f(e) {
		I(o, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!W(o)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && I(o, !1);
		}, t = (e) => {
			e.key === "Escape" && I(o, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = na(), h = L(p), g = L(h), _ = L(g, !0);
	j(g);
	var v = z(g, 2), y = L(v, !0);
	j(v), j(h);
	var b = z(h, 2), x = (e) => {
		var t = ta();
		zr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = ea();
			let s;
			var c = L(o, !0);
			j(o), V(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), J(c, a());
			}), G("click", o, () => f(i())), q(e, o);
		}), j(t), V(() => Qr(t, `top: ${W(c).top ?? ""}px; left: ${W(c).left ?? ""}px; min-width: ${W(c).width ?? ""}px`)), q(e, t);
	};
	Y(b, (e) => {
		W(o) && e(x);
	}), j(p), fi(p, (e) => I(s, e), () => W(s)), V((e) => {
		ii(h, "title", i()), h.disabled = a(), J(_, e), J(y, W(o) ? "▴" : "▾");
	}, [() => l()]), G("click", h, d), q(e, p), We();
}
xr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ra = /* @__PURE__ */ K("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function ia(e, t) {
	Ue(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			I(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !W(i)) return;
		e.filter = `brightness(${W(c)}) contrast(${W(l)}) saturate(${W(u)})`;
		let n = Math.max(t / W(i).width, t / W(i).height) * W(a), r = W(i).width * n, d = W(i).height * n, f = t / 2 - W(o) * r, p = t / 2 - W(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(W(i), f, p, r, d), e.filter = "none";
	}
	bn(() => {
		W(i), W(a), W(o), W(s), W(c), W(l), W(u), W(r) && d(W(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!W(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / W(i).width, 220 / W(i).height) * W(a), c = W(i).width * r, l = W(i).height * r, u = (e) => {
			I(o, Math.min(1, Math.max(0, W(o) - (e.clientX - t) / c)), !0), I(s, Math.min(1, Math.max(0, W(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		I(a, 1), I(o, .5), I(s, .5), I(c, 1), I(l, 1), I(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ra(), g = L(h), _ = z(L(g), 2), v = L(_);
	ii(v, "width", 220), ii(v, "height", 220), fi(v, (e) => I(r, e), () => W(r)), Ne(2), j(_);
	var y = z(_, 2), b = z(L(y)), x = L(b);
	j(b), j(y);
	var S = z(y, 2);
	Z(S);
	var ee = z(S, 2), te = z(L(ee)), ne = L(te);
	j(te), j(ee);
	var C = z(ee, 2);
	Z(C);
	var w = z(C, 2), T = z(L(w)), E = L(T);
	j(T), j(w);
	var re = z(w, 2);
	Z(re);
	var ie = z(re, 2), ae = z(L(ie)), oe = L(ae);
	j(ae), j(ie);
	var D = z(ie, 2);
	Z(D);
	var se = z(D, 2), ce = L(se), le = z(ce, 2);
	j(se);
	var ue = z(se, 2), de = L(ue), fe = z(de, 2);
	j(ue), j(g), j(h), V((e, t, n, r) => {
		J(x, `${e ?? ""}x`), J(ne, `${t ?? ""}%`), J(E, `${n ?? ""}%`), J(oe, `${r ?? ""}%`);
	}, [
		() => W(a).toFixed(2),
		() => Math.round(W(c) * 100),
		() => Math.round(W(l) * 100),
		() => Math.round(W(u) * 100)
	]), G("pointerdown", v, f), ci(S, () => W(a), (e) => I(a, e)), ci(C, () => W(c), (e) => I(c, e)), ci(re, () => W(l), (e) => I(l, e)), ci(D, () => W(u), (e) => I(u, e)), G("click", ce, () => I(u, 0)), G("click", le, p), G("click", de, () => t.oncancel?.()), G("click", fe, m), q(e, h), We();
}
xr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/migrate.js
function aa(e, t) {
	if (!t) return {
		ok: !1,
		version: e.version,
		props: e.props,
		placeholder: "unknown-type"
	};
	if (e.version > t.version) return {
		ok: !1,
		version: e.version,
		props: e.props,
		placeholder: "newer-than-engine"
	};
	let n = e.version, r = e.props;
	for (; n < t.version;) {
		let i = t.migrations && t.migrations[n];
		if (typeof i != "function") return {
			ok: !1,
			version: e.version,
			props: e.props,
			placeholder: "missing-migration"
		};
		r = i(structuredClone(r)), n++;
	}
	return {
		ok: !0,
		version: n,
		props: r
	};
}
var oa = (e) => Math.round(e * 100) / 100;
function sa(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ca = {
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
					x: oa(n.x * 100 / r.columns),
					w: oa(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= sa(t.grid);
		return e;
	}
}, la = { 1: (e) => (e.grid = sa(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ua(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = la[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function da(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ca[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function fa(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var pa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ma(e, t) {
	let n = fa(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = fa(t[2]), a = pa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ha = /^[a-z0-9][a-z0-9-]*$/;
function ga(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ha.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), fa(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function _a(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function va(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var ya = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = va(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, ba = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function xa(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Sa(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Ca(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function wa(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${va(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Ta(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (ba[t] ?? []).includes(e.animation) ? e.animation : null, r = xa(e.stops), i = r.map((e) => `${va(e.color)} ${e.at}%`).join(", "), a = {}, o;
	if (t === "radial") {
		let t = Math.round((e.x ?? .5) * 100), r = Math.round((e.y ?? .5) * 100);
		o = `radial-gradient(circle at ${t}% ${r}%, ${i})`, n === "orbit" && (a["background-size"] = "200% 200%", a["background-repeat"] = "no-repeat", a["--urd-bg-px"] = `${t}%`, a["--urd-bg-py"] = `${r}%`), n === "pulse" && (a["--urd-bg-op"] = String(e.opacity ?? 1));
	} else {
		let t = e.angle ?? 160;
		if (n === "pan-loop") {
			let n = (e.stops ?? []).map((e) => Math.max(0, Number(e?.share) || 0)), i = n.reduce((e, t) => e + t, 0), o = i > 0 ? Math.max(...n) / i : 1 / r.length;
			return {
				background: null,
				className: null,
				styles: a,
				loop: {
					angle: t,
					stops: Sa(r),
					maxShare: o
				}
			};
		}
		o = n === "rotate" ? `linear-gradient(calc(var(--urd-grad-spin, 0deg) + ${t}deg), ${i})` : `linear-gradient(${t}deg, ${i})`, n === "pan" && (a["background-size"] = "200% 200%");
	}
	return {
		background: o,
		className: n ? {
			pan: "urd-bg-animate",
			rotate: "urd-bg-rotate",
			pulse: "urd-bg-pulse",
			orbit: "urd-bg-orbit"
		}[n] : null,
		styles: a
	};
}
function Ea(e) {
	let t = Array.isArray(e) && e.length ? e : ["#0b0e14", "#1a1030"], n = (e) => t.length === 1 ? 0 : Math.round(e * 100 / (t.length - 1));
	return t.map((e, t) => e && typeof e == "object" ? {
		color: e.color ?? "#0b0e14",
		at: typeof e.at == "number" ? e.at : n(t)
	} : {
		color: e,
		at: n(t)
	});
}
function Da(e) {
	let t = [...Ea(e)].sort((e, t) => e.at - t.at), n = [
		0,
		...t.slice(0, -1).map((e, n) => (e.at + t[n + 1].at) / 2),
		100
	];
	return t.map((e, t) => ({
		color: e.color,
		share: Math.round((n[t + 1] - n[t]) * 10) / 10
	}));
}
var Oa = /* @__PURE__ */ new Set(), ka = !1;
function Aa(e) {
	Oa.add(e), !(ka || typeof window > "u") && (ka = !0, window.addEventListener("resize", () => {
		for (let e of [...Oa]) e() || Oa.delete(e);
	}));
}
var ja = !1;
function Ma() {
	if (!ja) {
		ja = !0;
		try {
			CSS.registerProperty({
				name: "--urd-grad-spin",
				syntax: "<angle>",
				inherits: !1,
				initialValue: "0deg"
			});
		} catch {}
	}
}
var Na = {
	version: 3,
	label: "Gradient",
	defaults: () => ({
		kind: "linear",
		stops: [{
			color: "#0b0e14",
			share: 50
		}, {
			color: "#1a1030",
			share: 50
		}],
		angle: 160,
		x: .5,
		y: .5,
		animation: "none",
		opacity: 1
	}),
	migrations: {
		1: (e) => ({
			...e,
			kind: "linear",
			x: .5,
			y: .5,
			stops: Ea(e.stops)
		}),
		2: (e) => ({
			kind: e.kind === "radial" ? "radial" : "linear",
			stops: Da(e.stops),
			angle: e.angle ?? 160,
			x: e.x ?? .5,
			y: e.y ?? .5,
			animation: e.animate ? e.kind === "radial" ? "orbit" : "pan" : "none",
			opacity: e.opacity ?? 1
		})
	},
	render(e, t) {
		let n = Ta(t);
		e.style.opacity = String(t.opacity ?? 1);
		for (let [t, r] of Object.entries(n.styles)) e.style.setProperty(t, r);
		if (n.loop) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = "urd-bg-loop-runner", e.appendChild(t);
			let r = () => {
				if (!e.isConnected) return !1;
				let r = e.clientWidth, i = e.clientHeight;
				if (r && i) {
					let e = Ca(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = wa(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Aa(r);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Ma());
	}
}, Pa = {
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
		let n = va(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Fa = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Ia = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Fa, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, La = {
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
function Ra(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function za({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ba(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/backgrounds/bildegalleri.js
var Va = {
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
		if (!za({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Ba(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Ra(l, 1, n.length), r = new Image();
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
}, Ha = () => ({
	duration: 600,
	delay: 0
}), Ua = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Ha,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Ha,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Ha,
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
var Wa = [
	["System", "system-ui, sans-serif"],
	["Arial", "Arial, Helvetica, sans-serif"],
	["Verdana", "Verdana, Geneva, sans-serif"],
	["Trebuchet", "'Trebuchet MS', sans-serif"],
	["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
	["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
	["Courier (skrivemaskin)", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/place.js
function Ga(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Ka = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kantfarge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"4\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), qa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Skygge <!></label> <label class=\"svelte-1n46o8q\">Kantlinje <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Frostet glass: gjennomskinnelig kort med uskarp bakgrunn - best over bilder og gradienter\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glass-effekt (frostet)</label>", 1), Ja = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <!> <label class=\"svelte-1n46o8q\">Font <!></label> <label title=\"Skriftstørrelse i px for hele feltet; tomt = arv fra tema\" class=\"svelte-1n46o8q\">Størrelse (px) <input type=\"number\" min=\"8\" max=\"120\" step=\"1\" placeholder=\"Arv\" class=\"svelte-1n46o8q\"/></label> <label title=\"Avstanden mellom tekstlinjene, i forhold til skriftstørrelsen; tomt = arv\" class=\"svelte-1n46o8q\">Linjeavstand <input type=\"number\" min=\"0.8\" max=\"3\" step=\"0.1\" placeholder=\"Arv\" class=\"svelte-1n46o8q\"/></label> <label title=\"Avstanden mellom bokstavene i px, negativ er tettere; tomt = arv\" class=\"svelte-1n46o8q\">Bokstavavstand (px) <input type=\"number\" min=\"-2\" max=\"10\" step=\"0.1\" placeholder=\"Arv\" class=\"svelte-1n46o8q\"/></label>", 1), Ya = /* @__PURE__ */ K("<span class=\"nav-line svelte-1n46o8q\"><input title=\"Spørsmålsteksten (svaret skrives rett i blokken)\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern spørsmålet\"></button></span></span>"), Xa = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Ellers lukkes forrige svar når et nytt åpnes\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Flere svar åpne samtidig</label> <p class=\"panel-strong svelte-1n46o8q\">Spørsmål</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt spørsmål</button> <p class=\"panel-strong svelte-1n46o8q\">Kortstil</p> <!>", 1), Za = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Qa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), $a = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), eo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), to = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), no = /* @__PURE__ */ K("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), ro = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), io = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), ao = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), oo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), so = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), co = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), lo = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), uo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), fo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), po = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), mo = /* @__PURE__ */ K("<label title=\"Avstanden fra vinduets topp mens blokken er festet; en klistret meny kan kreve større avstand\" class=\"svelte-1n46o8q\">Avstand fra toppen <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label title=\"Hvor festingen slutter: ved egen seksjon, eller først når en senere seksjon er passert\" class=\"svelte-1n46o8q\">Slipp taket <!></label>", 1), ho = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Blokken blir stående ved vindustoppen mens besøkende scroller. Prøv i Ren visning; gjelder ikke mobil.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fest ved scrolling</label> <!>", 1), go = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), _o = /* @__PURE__ */ K("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når blokken scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over blokken; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), vo = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), yo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span> <button title=\"Hjelpelinjer: senter og innholdsbredde i alle seksjoner\"></button>", 1), bo = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), xo = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span> <button> </button>", 1), So = /* @__PURE__ */ K("<!> Ren visning", 1), Co = /* @__PURE__ */ K("<!> Rediger", 1), wo = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), To = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), Eo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Do = /* @__PURE__ */ K("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Oo = /* @__PURE__ */ K("<button> </button>"), ko = /* @__PURE__ */ K("<!> <!>", 1), Ao = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), jo = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Mo = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), No = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), Po = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Fo = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), Io = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Lo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), Ro = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), zo = /* @__PURE__ */ K("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), Bo = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label>"), Vo = /* @__PURE__ */ K("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ho = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\"> <!></label>"), Uo = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bakgrunnsbildet\"></button>"), Wo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Bildestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (høyde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i høyden: 0 = toppen, 100 = bunnen. Monner mest i topplinjen\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (bredde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i bredden: 0 = venstre, 100 = høyre. Monner mest i sidestilt kolonne\" class=\"svelte-1n46o8q\"/>", 1), Go = /* @__PURE__ */ K("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), Ko = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: undermenyen og mobilpanelet får kun bakgrunnsfargen, ikke bildet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Bakgrunnsbilde også i undermenyen</label>"), qo = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Jo = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Yo = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Xo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <label title=\"0 % = helt tett flate, 100 % = helt gjennomsiktig meny\" class=\"svelte-1n46o8q\">Gjennomsiktighet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når gjennomsiktigheten er høy)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Bakgrunnsfargen med gjennomsiktigheten legger seg som et slør over bildet; komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label> <!></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), Zo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), Qo = /* @__PURE__ */ K("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), $o = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), es = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), ts = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), ns = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button>"), rs = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), is = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), as = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <button class=\"ghost svelte-1n46o8q\" title=\"Spørsmål og svar der svaret foldes ut ved klikk\">FAQ</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), os = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), ss = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), cs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ls = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), us = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fargen\"></button>"), ds = /* @__PURE__ */ K("<span><span class=\"grad-grip svelte-1n46o8q\" title=\"Dra for å endre fargenes rekkefølge\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvor mye plass fargen tar; 0 gir en hard kant mot nabofargen\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), fs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sentrum X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Sentrum Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ps = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), ms = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <!> <button class=\"ghost action svelte-1n46o8q\" title=\"Ny farge nederst i listen; dra i håndtaket for rekkefølgen\">+ Legg til farge</button> <!> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Gjelder selve gradienten - uavhengig av Animasjon-valget nederst, som gjelder innholdet\" class=\"svelte-1n46o8q\">Bevegelse <!></label>", 1), hs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), gs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), _s = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), vs = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ys = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), bs = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), xs = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), Ss = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når seksjonen scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over seksjonen; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label>", 1), Cs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), ws = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Ts = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), Es = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label>"), Ds = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), Os = /* @__PURE__ */ K("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), ks = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), As = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), js = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), Ms = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), Ns = /* @__PURE__ */ K("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Ps = /* @__PURE__ */ K("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Fs = /* @__PURE__ */ K("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), Is = /* @__PURE__ */ K("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), Ls = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), Rs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), zs = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), Bs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), Vs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), Hs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Us = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Ws = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Gs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Ks = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), qs = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Js = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Ys = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Xs = /* @__PURE__ */ K("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Zs = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Qs = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), $s = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), ec = /* @__PURE__ */ K("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), tc = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>  <!>", 1);
function nc(e, t) {
	Ue(t, !0);
	let n = (e) => {
		let t = /* @__PURE__ */ N(() => W(O).props.boxStyle ?? {});
		var n = qa(), r = R(n), i = z(L(r));
		{
			let e = /* @__PURE__ */ N(() => W(t).shadow ?? "");
			$(i, {
				get value() {
					return W(e);
				},
				options: [
					["", "Ingen"],
					["soft", "Myk"],
					["strong", "Tydelig"]
				],
				onchange: (e) => Ie({ shadow: e || null })
			});
		}
		j(r);
		var a = z(r, 2), o = z(L(a));
		{
			let e = /* @__PURE__ */ N(() => W(t).border === "none" ? "none" : W(t).border ? "custom" : "");
			$(o, {
				get value() {
					return W(e);
				},
				options: [
					["", "Temaets (tynn)"],
					["none", "Ingen"],
					["custom", "Egen farge"]
				],
				onchange: (e) => Ie({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		j(a);
		var s = z(a, 2), c = (e) => {
			var n = Ka(), r = R(n), i = z(L(r));
			{
				let e = /* @__PURE__ */ N(() => W(t).border.color ?? "accent"), n = /* @__PURE__ */ N(Dt);
				Ti(i, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(n);
					},
					label: "Kantlinjens farge",
					onchange: (e) => Ie({ border: {
						...W(t).border,
						color: e
					} })
				});
			}
			j(r);
			var a = z(r, 2), o = z(L(a)), s = L(o);
			j(o), j(a);
			var c = z(a, 2);
			Z(c), V(() => {
				J(s, `${W(t).border.width ?? 1 ?? ""} px`), Q(c, W(t).border.width ?? 1);
			}), G("input", c, (e) => Ie({ border: {
				...W(t).border,
				width: Number(e.target.value)
			} })), q(e, n);
		};
		Y(s, (e) => {
			W(t).border && W(t).border !== "none" && e(c);
		});
		var l = z(s, 2), u = L(l);
		Z(u), Ne(), j(l), V((e) => ri(u, e), [() => !!W(t).glass]), G("change", u, (e) => Ie({ glass: e.target.checked || null })), q(e, n);
	}, r = (e) => {
		var t = _o(), r = R(t), i = (e) => {
			var t = Ja(), r = R(t), i = z(L(r));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.align ?? "left");
				$(i, {
					get value() {
						return W(e);
					},
					options: [
						["left", "Venstre"],
						["center", "Midtstilt"],
						["right", "Høyre"]
					],
					onchange: (e) => M("align", e)
				});
			}
			j(r);
			var a = z(r, 2), o = L(a);
			Z(o), Ne(), j(a);
			var s = z(a, 2), c = (e) => {
				n(e);
			};
			Y(s, (e) => {
				W(O).props.box && e(c);
			});
			var l = z(s, 2), u = z(L(l));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.font ?? ""), t = /* @__PURE__ */ N(() => [["", "Arv fra tema"], ...Wa.map(([e, t]) => [t, e])]);
				$(u, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => M("font", e || null)
				});
			}
			j(l);
			var d = z(l, 2), f = z(L(d));
			Z(f), j(d);
			var p = z(d, 2), m = z(L(p));
			Z(m), j(p);
			var h = z(p, 2), g = z(L(h));
			Z(g), j(h), V((e) => {
				ri(o, e), Q(f, W(O).props.size ?? ""), Q(m, W(O).props.lineHeight ?? ""), Q(g, W(O).props.letterSpacing ?? "");
			}, [() => !!W(O).props.box]), G("change", o, (e) => M("box", e.target.checked)), G("change", f, (e) => M("size", e.target.value === "" ? null : Number(e.target.value))), G("change", m, (e) => M("lineHeight", e.target.value === "" ? null : Number(e.target.value))), G("change", g, (e) => M("letterSpacing", e.target.value === "" ? null : Number(e.target.value) || null)), q(e, t);
		}, a = (e) => {
			var t = Xa(), r = R(t), i = L(r);
			Z(i), Ne(), j(r);
			var a = z(r, 4);
			zr(a, 17, () => W(O).props.items ?? [], Fr, (e, t, n) => {
				var r = Ya(), i = L(r);
				Z(i);
				var a = z(i, 2), s = L(a);
				s.disabled = n === 0, X(s, () => o.up, !0), j(s);
				var c = z(s, 2);
				X(c, () => o.down, !0), j(c);
				var l = z(c, 2);
				X(l, () => o.cross, !0), j(l), j(a), j(r), V(() => {
					Q(i, W(t).q), c.disabled = n === (W(O).props.items?.length ?? 0) - 1;
				}), G("change", i, (e) => Le(n, { q: e.target.value })), G("click", s, () => Ve(n, -1)), G("click", c, () => Ve(n, 1)), G("click", l, () => Be(n)), q(e, r);
			});
			var s = z(a, 2), c = z(s, 4);
			n(c), V((e) => ri(i, e), [() => !!W(O).props.multi]), G("change", i, (e) => M("multi", e.target.checked)), G("click", s, Re), q(e, t);
		}, s = (e) => {
			var t = Qa(), n = R(t), r = z(L(n));
			Z(r), j(n);
			var i = z(n, 2), a = z(L(i));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				$(a, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						Pe(`edit:${W(O).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			j(i);
			var o = z(i, 2), s = (e) => {
				var t = Za();
				Z(t), V(() => Q(t, W(O).props.href === "#" ? "" : W(O).props.href ?? "")), G("change", t, (e) => M("href", e.target.value || null)), q(e, t);
			};
			Y(o, (e) => {
				W(O).props.page || e(s);
			});
			var c = z(o, 2);
			$(z(L(c)), {
				get value() {
					return W(O).props.style;
				},
				options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
				onchange: (e) => M("style", e)
			}), j(c), V(() => Q(r, W(O).props.label)), G("change", r, (e) => M("label", e.target.value)), q(e, t);
		}, c = (e) => {
			var t = eo(), n = R(t), r = z(L(n));
			j(n);
			var i = z(n, 2), a = z(L(i));
			Z(a), j(i);
			var o = z(i, 2), s = z(L(o));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.fit ?? "cover");
				$(s, {
					get value() {
						return W(e);
					},
					options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
					onchange: (e) => M("fit", e)
				});
			}
			j(o);
			var c = z(o, 2), l = z(L(c));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.radius ?? "");
				$(l, {
					get value() {
						return W(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => M("radius", e || null)
				});
			}
			j(c);
			var u = z(c, 2), d = z(L(u));
			Z(d), j(u);
			var f = z(u, 2), p = (e) => {
				var t = $a(), n = L(t);
				Z(n), Ne(), j(t), V((e) => ri(n, e), [() => !!W(O).props.lightbox]), G("change", n, (e) => M("lightbox", e.target.checked)), q(e, t);
			};
			Y(f, (e) => {
				W(O).props.href || e(p);
			});
			var m = z(f, 2), h = z(L(m)), g = L(h);
			j(h), j(m);
			var _ = z(m, 2);
			Z(_);
			var v = z(_, 2), y = z(L(v)), b = L(y);
			j(y), j(v);
			var x = z(v, 2);
			Z(x);
			var S = z(x, 2), ee = z(L(S)), te = L(ee);
			j(ee), j(S);
			var ne = z(S, 2);
			Z(ne);
			var C = z(ne, 2), w = z(L(C)), T = L(w);
			j(w), j(C);
			var E = z(C, 2);
			Z(E);
			var re = z(E, 2), ie = z(L(re)), ae = L(ie);
			j(ie), j(re);
			var oe = z(re, 2);
			Z(oe);
			var D = z(oe, 2), se = z(L(D)), ce = L(se);
			j(se), j(D);
			var le = z(D, 2);
			Z(le);
			var ue = z(le, 2);
			V((e, t, n, r, i, o) => {
				Q(a, W(O).props.alt ?? ""), Q(d, W(O).props.href ?? ""), J(g, `${e ?? ""}%`), Q(_, W(O).props.x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(O).props.y ?? .5), J(te, `${n ?? ""}x`), Q(ne, W(O).props.zoom ?? 1), J(T, `${r ?? ""}%`), Q(E, W(O).props.brightness ?? 1), J(ae, `${i ?? ""}%`), Q(oe, W(O).props.contrast ?? 1), J(ce, `${o ?? ""}%`), Q(le, W(O).props.saturate ?? 1);
			}, [
				() => Math.round((W(O).props.x ?? .5) * 100),
				() => Math.round((W(O).props.y ?? .5) * 100),
				() => (W(O).props.zoom ?? 1).toFixed(2),
				() => Math.round((W(O).props.brightness ?? 1) * 100),
				() => Math.round((W(O).props.contrast ?? 1) * 100),
				() => Math.round((W(O).props.saturate ?? 1) * 100)
			]), G("change", r, Ge), G("change", a, (e) => M("alt", e.target.value)), G("change", d, (e) => M("href", e.target.value || null)), G("input", _, (e) => M("x", Number(e.target.value))), G("input", x, (e) => M("y", Number(e.target.value))), G("input", ne, (e) => M("zoom", Number(e.target.value))), G("input", E, (e) => M("brightness", Number(e.target.value))), G("input", oe, (e) => M("contrast", Number(e.target.value))), G("input", le, (e) => M("saturate", Number(e.target.value))), G("click", ue, () => Pe(`edit:${W(O).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), q(e, t);
		}, l = (e) => {
			var t = to(), n = z(R(t), 2);
			Z(n);
			var r = z(n, 2), i = z(L(r));
			Z(i), j(r), Ne(2), V(() => {
				Q(n, W(O).props.url ?? ""), Q(i, W(O).props.title ?? "");
			}), G("change", n, (e) => M("url", e.target.value)), G("change", i, (e) => M("title", e.target.value)), q(e, t);
		}, u = (e) => {
			var t = ao(), n = R(t), r = z(L(n)), i = L(r);
			{
				let e = /* @__PURE__ */ N(() => W(O).props.glyph ?? "★"), t = /* @__PURE__ */ N(() => W(O).props.icon ?? null), n = /* @__PURE__ */ N(() => W(O).props.image ?? null);
				Qi(i, {
					get value() {
						return W(e);
					},
					get icon() {
						return W(t);
					},
					get image() {
						return W(n);
					},
					onpick: (e) => Pe(`edit:${W(O).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => Pe(`edit:${W(O).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => M("image", e)
				});
			}
			var a = z(i, 2), o = (e) => {
				var t = no();
				Z(t), V(() => Q(t, W(O).props.glyph ?? "")), G("change", t, (e) => M("glyph", e.target.value || "★")), q(e, t);
			}, s = (e) => {
				var t = ro();
				G("click", t, () => M("icon", null)), q(e, t);
			};
			Y(a, (e) => {
				W(O).props.icon ? e(s, -1) : e(o);
			}), j(r), j(n);
			var c = z(n, 2), l = (e) => {
				var t = io(), n = R(t), r = L(n), i = z(r, 2);
				j(n), Ne(2), V(() => ii(r, "src", W(O).props.image)), G("click", i, () => M("image", null)), q(e, t);
			};
			Y(c, (e) => {
				W(O).props.image && e(l);
			});
			var u = z(c, 2), d = z(L(u));
			Z(d), j(u);
			var f = z(u, 2), p = z(L(f));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.color ?? "accent"), t = /* @__PURE__ */ N(Dt);
				Ti(p, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(t);
					},
					onchange: (e) => M("color", e)
				});
			}
			j(f), Ne(2), V(() => Q(d, W(O).props.size ?? 48)), G("change", d, (e) => M("size", Number(e.target.value))), q(e, t);
		}, d = (e) => {
			var t = oo(), n = R(t), r = z(L(n));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.collection ?? ""), t = /* @__PURE__ */ N(() => [["", "Velg …"], ...W(H).map((e) => [e, W(Un)[e]?.name ?? e])]);
				$(r, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => M("collection", e || null)
				});
			}
			j(n);
			var i = z(n, 2), a = z(L(i));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.view ?? "cards");
				$(a, {
					get value() {
						return W(e);
					},
					options: [
						["cards", "Kort"],
						["list", "Liste"],
						["archive", "Arkiv (per år)"]
					],
					onchange: (e) => M("view", e)
				});
			}
			j(i);
			var o = z(i, 2), s = z(L(o));
			Z(s), j(o);
			var c = z(o, 2), l = L(c);
			Z(l), Ne(), j(c), Ne(2), V(() => {
				Q(s, W(O).props.limit ?? 6), ri(l, W(O).props.newestFirst !== !1);
			}), G("change", s, (e) => M("limit", Number(e.target.value))), G("change", l, (e) => M("newestFirst", e.target.checked)), q(e, t);
		}, f = (e) => {
			var t = uo(), n = R(t), r = z(L(n));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.view ?? "grid");
				$(r, {
					get value() {
						return W(e);
					},
					options: [
						["grid", "Rutenett"],
						["carousel", "Karusell"],
						["slides", "Lysbilde (bytter automatisk)"]
					],
					onchange: (e) => M("view", e)
				});
			}
			j(n);
			var i = z(n, 2), a = (e) => {
				var t = so(), n = R(t), r = z(L(n));
				Z(r), j(n);
				var i = z(n, 2), a = z(L(i)), o = L(a);
				j(a), j(i);
				var s = z(i, 2);
				Z(s), V(() => {
					Q(r, W(O).props.columns ?? 3), J(o, `${W(O).props.gap ?? 12 ?? ""} px`), Q(s, W(O).props.gap ?? 12);
				}), G("change", r, (e) => M("columns", Number(e.target.value))), G("input", s, (e) => M("gap", Number(e.target.value))), q(e, t);
			};
			Y(i, (e) => {
				(W(O).props.view ?? "grid") === "grid" && e(a);
			});
			var s = z(i, 2), c = (e) => {
				var t = co(), n = z(L(t));
				Z(n), j(t), V(() => Q(n, W(O).props.interval ?? 5)), G("change", n, (e) => M("interval", Number(e.target.value))), q(e, t);
			};
			Y(s, (e) => {
				W(O).props.view === "slides" && e(c);
			});
			var l = z(s, 2), u = z(L(l));
			{
				let e = /* @__PURE__ */ N(() => W(O).props.radius ?? "");
				$(u, {
					get value() {
						return W(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => M("radius", e || null)
				});
			}
			j(l);
			var d = z(l, 2), f = L(d);
			Z(f), Ne(), j(d);
			var p = z(d, 4), m = z(L(p));
			j(p), zr(z(p, 2), 17, () => W(O).props.images ?? [], Fr, (e, t, n) => {
				var r = lo(), i = L(r), a = L(i), s = z(a, 2), c = L(s);
				c.disabled = n === 0, X(c, () => o.up, !0), j(c);
				var l = z(c, 2);
				X(l, () => o.down, !0), j(l);
				var u = z(l, 2);
				X(u, () => o.cross, !0), j(u), j(s), j(i);
				var d = z(i, 2), f = z(L(d));
				Z(f), j(d);
				var p = z(d, 2), m = z(L(p));
				Z(m), j(p), j(r), V(() => {
					ii(a, "src", W(t).src), l.disabled = n === W(O).props.images.length - 1, Q(f, W(t).alt ?? ""), Q(m, W(t).href ?? "");
				}), G("click", c, () => Ri(n, -1)), G("click", l, () => Ri(n, 1)), G("click", u, () => zi(n)), G("change", f, (e) => Bi(n, "alt", e.target.value)), G("change", m, (e) => Bi(n, "href", e.target.value || null)), q(e, r);
			}), Ne(2), V(() => ri(f, W(O).props.lightbox !== !1)), G("change", f, (e) => M("lightbox", e.target.checked)), G("change", m, Ii), q(e, t);
		}, p = (e) => {
			var t = fo(), n = R(t);
			$(z(L(n)), {
				get value() {
					return W(O).props.kind;
				},
				get options() {
					return qe;
				},
				onchange: (e) => M("kind", e)
			}), j(n);
			var r = z(n, 2);
			$(z(L(r)), {
				get value() {
					return W(O).props.color;
				},
				get options() {
					return Je;
				},
				onchange: (e) => M("color", e)
			}), j(r);
			var i = z(r, 2), a = z(L(i));
			Z(a), j(i);
			var o = z(i, 2), s = L(o);
			Z(s), Ne(), j(o), V((e) => {
				Q(a, W(O).props.thickness), ri(s, e);
			}, [() => !!W(O).props.fill]), G("change", a, (e) => M("thickness", Number(e.target.value))), G("change", s, (e) => M("fill", e.target.checked ? W(O).props.color : null)), q(e, t);
		};
		Y(r, (e) => {
			W(O).type === "text" ? e(i) : W(O).type === "faq" ? e(a, 1) : W(O).type === "button" ? e(s, 2) : W(O).type === "image" ? e(c, 3) : W(O).type === "video" ? e(l, 4) : W(O).type === "icon" ? e(u, 5) : W(O).type === "samling" ? e(d, 6) : W(O).type === "galleri" ? e(f, 7) : W(O).type === "shape" && e(p, 8);
		});
		var m = z(r, 4), h = z(L(m));
		{
			let e = /* @__PURE__ */ N(() => Ot(W(O).animation) ? W(O).animation.type : "");
			$(h, {
				get value() {
					return W(e);
				},
				get options() {
					return kt;
				},
				onchange: (e) => Mt(e || null)
			});
		}
		j(m);
		var g = z(m, 2), _ = (e) => {
			var t = po(), n = R(t), r = z(L(n));
			Z(r), j(n);
			var i = z(n, 2), a = z(L(i));
			Z(a), j(i), V(() => {
				Q(r, W(O).animation.props.duration), Q(a, W(O).animation.props.delay);
			}), G("change", r, (e) => Pt("duration", Number(e.target.value))), G("change", a, (e) => Pt("delay", Number(e.target.value))), q(e, t);
		}, v = /* @__PURE__ */ N(() => Ot(W(O).animation));
		Y(g, (e) => {
			W(v) && e(_);
		});
		var y = z(g, 2), b = z(L(y));
		{
			let e = /* @__PURE__ */ N(() => W(O).hover?.type ?? (W(O).animation && !Ot(W(O).animation) ? W(O).animation.type : ""));
			$(b, {
				get value() {
					return W(e);
				},
				get options() {
					return At;
				},
				onchange: (e) => Nt(e || null)
			});
		}
		j(y);
		var x = z(y, 2), ee = (e) => {
			var t = ho(), n = z(R(t), 2), r = L(n);
			Z(r), Ne(), j(n);
			var i = z(n, 2), a = (e) => {
				var t = mo(), n = R(t), r = z(L(n));
				Z(r), j(n);
				var i = z(n, 2), a = z(L(i));
				{
					let e = /* @__PURE__ */ N(() => W(O).sticky.until ?? ""), t = /* @__PURE__ */ N(je);
					$(a, {
						get value() {
							return W(e);
						},
						get options() {
							return W(t);
						},
						onchange: (e) => Pe(`edit:${W(O).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				j(i), V(() => Q(r, W(O).sticky.offset ?? 16)), G("change", r, (e) => Pe(`edit:${W(O).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), q(e, t);
			};
			Y(i, (e) => {
				W(O).sticky && e(a);
			}), V((e) => ri(r, e), [() => !!W(O).sticky]), G("change", r, (e) => Pe(`edit:${W(O).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), q(e, t);
		};
		Y(x, (e) => {
			W(S) === "desktop" && e(ee);
		});
		var te = z(x, 4), ne = z(L(te), 2), C = z(L(ne), 2), w = (e) => {
			var t = go(), n = L(t), r = z(L(n));
			Z(r), j(n);
			var i = z(n, 2), a = z(L(i));
			Z(a), j(i);
			var o = z(i, 2), s = z(L(o));
			Z(s), j(o);
			var c = z(o, 2), l = z(L(c));
			Z(l), j(c);
			var u = z(c, 2), d = z(L(u));
			Z(d), j(u);
			var f = z(u, 2), p = z(L(f));
			Z(p), j(f), j(t), V(() => {
				Q(r, W(O).frame.x), Q(a, W(O).frame.y), Q(s, W(O).frame.w), Q(l, W(O).frame.h), Q(d, W(O).frame.z ?? 1), Q(p, W(O).frame.rot ?? 0);
			}), G("change", r, (e) => Fe("x", Number(e.target.value))), G("change", a, (e) => Fe("y", Number(e.target.value))), G("change", s, (e) => Fe("w", Number(e.target.value))), G("change", l, (e) => Fe("h", Number(e.target.value))), G("change", d, (e) => Fe("z", Number(e.target.value))), G("change", p, (e) => Fe("rot", Number(e.target.value))), q(e, t);
		};
		Y(C, (e) => {
			W(S) === "desktop" && e(w);
		});
		var T = z(C, 2), re = L(T);
		Z(re), Ne(), j(T), j(ne), j(te), V(() => ri(re, W(O).decor)), G("change", re, (e) => He(e.target.checked)), q(e, t);
	}, i = [
		["color", ya],
		["gradient", Na],
		["glow", Pa],
		["image", La],
		["bildegalleri", Va],
		["grain", Ia]
	], a = Object.fromEntries(i), o = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>",
		plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>",
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 3v4M12 17v4M3 12h4M17 12h4\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\" stroke-dasharray=\"2.5 2.5\"/></svg>"
	}, s = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], c = /* @__PURE__ */ F(nn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	bn(() => {
		document.documentElement.dataset.adminTheme = W(c), localStorage.setItem("urd-admin-theme", W(c)), l();
	});
	function l() {
		let e = getComputedStyle(document.documentElement);
		T?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: e.getPropertyValue("--urd-color-accent").trim(),
			text: e.getPropertyValue("--urd-color-text").trim()
		});
	}
	let u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(!1), p = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F("info"), g = 0;
	function _(e, t = "info") {
		I(p, e, !0), I(h, t, !0);
		let n = ++g;
		t === "ok" && setTimeout(() => {
			g === n && (I(p, ""), I(h, "info"));
		}, 8e3);
	}
	let v = /* @__PURE__ */ F(null), y = /* @__PURE__ */ F(null), b = /* @__PURE__ */ F(nn({
		size: 16,
		snap: !0
	})), x = /* @__PURE__ */ F(!0), S = /* @__PURE__ */ F("desktop");
	bn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = W(S);
		T?.sendViewport(e);
	});
	let ee = /* @__PURE__ */ F(0);
	function te() {
		I(ee, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ne(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, te(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ F(null);
	function re() {
		I(E, w.data, !0), w.replace(W(E));
	}
	function ie() {
		T?.sendSite(ze(W(E)));
	}
	let ae = /* @__PURE__ */ new Set(), oe = () => W(E).pages.find((e) => e.id === W(d));
	function D() {
		let e = W(E)?.pages?.some((e) => !ae.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Vn?.hasDraft() || Object.values(Hn).some((e) => e.hasDraft());
		I(f, e || C?.hasDraft() && !ae.has(W(d)) || w?.hasDraft() || ar?.hasDraft() || t || !1, !0);
	}
	let se = [], ce = [], le = null;
	function ue() {
		return JSON.stringify({
			pageId: W(d),
			page: C.data,
			site: w.data
		});
	}
	function de(e) {
		e === le && (e.startsWith("edit:") || e.startsWith("grid:")) || (se.push(ue()), se.length > 50 && se.shift(), ce.length = 0, le = e);
	}
	function fe(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), re(), w.save(), I(b, {
			snap: !0,
			...W(E).grid
		}, !0), ie(), t && t !== W(d) && W(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), on(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), te(), k(), tt(C.data.sections.find((e) => e.id === W(Ye))), W(E).pages.some((e) => e.id === W(d)) ? T?.sendPage(W(d), C.data) : on(W(E).pages[0].id, { keepHistory: !0 });
	}
	function pe() {
		se.length && (ce.push(ue()), fe(se.pop()), le = null, _("Angret"));
	}
	function me() {
		ce.length && (se.push(ue()), fe(ce.pop()), le = null, _("Gjentatt"));
	}
	function he(e) {
		if (e.key === "Escape" && W(A)) {
			I(A, null);
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
			].includes(t.type)) || !W(O) || W(S) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? me() : pe());
	}
	async function ge() {
		I(u, ua(await (await fetch("/content/site.json")).json()), !0), w = mi("urd-draft-site", () => W(u)), w.replace(ua(w.data)), w.save(), re(), I(b, {
			snap: !0,
			...W(E).grid
		}, !0), await on(new URLSearchParams(location.search).get("page") ?? W(E).pages[0].id), await _r(), await qn(), await Ut(), W(y) && Gt(), (W(E).site.setup === !0 || W(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (I(xe, W(E).site.title, !0), I(Se, W(E).theme.tokens.color.accent, !0), I(Ce, W(E).theme.tokens.color.bg, !0), I(be, !0));
	}
	let _e = /* @__PURE__ */ F(null);
	function ve({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			I(_e, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function ye(e) {
		W(_e)?.resolve(e), I(_e, null);
	}
	let be = /* @__PURE__ */ F(!1), xe = /* @__PURE__ */ F(""), Se = /* @__PURE__ */ F("#7c5cff"), Ce = /* @__PURE__ */ F("#0b0e14");
	function we() {
		localStorage.setItem("urd-setup-done", "1"), I(be, !1);
	}
	function Te() {
		let e = W(xe).trim();
		e && (B("setup", () => {
			W(E).site.title = e, W(E).nav.logo = {
				type: "text",
				value: e
			}, W(E).theme.tokens.color.accent = W(Se), W(E).theme.tokens.color.bg = W(Ce), delete W(E).site.setup;
		}), we(), _("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let Ee = /* @__PURE__ */ F(null), De = [
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
	function Oe(e) {
		I(Ee, W(Ee) === e ? null : e, !0), T?.sendShowGrid(W(Ee) === "Grid"), W(Ee) === "Historikk" && Xt();
	}
	let O = /* @__PURE__ */ F(null);
	function ke(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function k() {
		if (!W(O)) return;
		let { block: e } = ke(W(O).sectionId, W(O).blockId);
		if (!e) {
			I(O, null);
			return;
		}
		I(O, {
			sectionId: W(O).sectionId,
			blockId: W(O).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function Ae(e) {
		if (!e.blockId) {
			I(O, null), I(A, null);
			return;
		}
		I(O, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), k();
	}
	let A = /* @__PURE__ */ F(null);
	function je() {
		let e = C?.data.sections ?? [], t = e.findIndex((e) => e.id === W(O)?.sectionId);
		return [["", "Når egen seksjon er forbi"], ...e.slice(t + 1).map((e, n) => [e.id, `Ved seksjon ${t + 2 + n}`])];
	}
	function Me(e) {
		if (Ae(e), !W(O)) return;
		let t = W(v)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + e.rect.top), Math.max(8, r));
		I(A, {
			left: n,
			top: i
		}, !0);
	}
	function Pe(e, t) {
		let { section: n, block: r } = ke(W(O)?.sectionId, W(O)?.blockId);
		r && (de(e), t(r, n), ne(n, "blokk-endret"), C.save(), D(), T?.sendSection(W(d), n), k());
	}
	function M(e, t) {
		Pe(`edit:${W(O).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Fe(e, t) {
		Number.isFinite(t) && Pe(`edit:frame-${W(O).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Ie(e) {
		Pe(`edit:${W(O).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Le(e, t) {
		Pe(`edit:${W(O).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Re() {
		Pe("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: "Nytt spørsmål?",
				a: "<p>Skriv svaret her.</p>"
			});
		});
	}
	function Be(e) {
		Pe("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Ve(e, t) {
		let n = e + t;
		Pe("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function He(e) {
		Pe("decor", (t) => {
			t.decor = e;
		});
	}
	async function Ge(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			Pe(`edit:${W(O).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ai(t.name).replaceAll("-", " ");
			});
		} catch {
			_("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ke = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri",
		faq: "FAQ"
	}, qe = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Je = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Ye = /* @__PURE__ */ F(null), Xe = /* @__PURE__ */ F(null), Ze = /* @__PURE__ */ F(""), Qe = /* @__PURE__ */ F(nn([])), $e = /* @__PURE__ */ F(null), et = /* @__PURE__ */ F(null);
	function tt(e) {
		I(Xe, e?.grid ? { ...e.grid } : null, !0), I(Ze, e?.size?.minHeight ?? "", !0), I(Qe, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I($e, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(et, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0);
	}
	function nt(e) {
		I(Ye, e.sectionId, !0), tt(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function rt(e, t) {
		let n = C.data.sections.find((e) => e.id === W(Ye));
		n && (de(e), t(n), C.save(), D(), T?.sendSection(W(d), n), tt(n));
	}
	let it = /* @__PURE__ */ F("color");
	function ot(e) {
		rt("bg", (t) => {
			t.background ??= {
				version: 1,
				layers: []
			}, t.background.layers.push({
				type: e,
				version: a[e].version ?? 1,
				props: a[e].defaults()
			});
		});
	}
	function st(e) {
		rt("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function ct(e, t) {
		let n = e + t;
		rt("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function lt(e, t, n) {
		rt(`edit:bg-${W(Ye)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function ut(e) {
		if ((e.version ?? 1) >= Na.version) return e.props;
		let t = ze(e);
		return aa({
			type: "gradient",
			version: t.version ?? 1,
			props: t.props
		}, Na).props;
	}
	function dt(e, t, n) {
		rt(t, (t) => {
			let r = t.background.layers[e];
			if ((r.version ?? 1) < Na.version) {
				let e = aa({
					type: "gradient",
					version: r.version ?? 1,
					props: ze(r.props)
				}, Na);
				if (!e.ok) return;
				r.props = e.props, r.version = e.version;
			}
			n(r.props);
		});
	}
	function ft(e, t, n) {
		dt(e, `edit:bg-${W(Ye)}-${e}-${t}`, (e) => {
			e[t] = n;
		});
	}
	let pt = {
		linear: [
			["none", "Ingen"],
			["pan", "Panorer frem og tilbake"],
			["pan-loop", "Panorer én vei (loop)"],
			["rotate", "Roter sakte"]
		],
		radial: [
			["none", "Ingen"],
			["pulse", "Pulser"],
			["orbit", "Sving sakte i bane"]
		]
	};
	function mt(e, t) {
		dt(e, "bg", (e) => {
			e.kind = t, pt[t].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ht(e, t, n) {
		dt(e, `edit:bg-${W(Ye)}-${e}-stop${t}`, (e) => {
			e.stops[t] = {
				...e.stops[t],
				...n
			};
		});
	}
	function gt(e) {
		dt(e, "bg", (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function _t(e, t) {
		dt(e, "bg", (e) => {
			e.stops.length > 2 && e.stops.splice(t, 1);
		});
	}
	function vt(e, t, n) {
		dt(e, "bg", (e) => {
			let [r] = e.stops.splice(t, 1);
			e.stops.splice(n, 0, r);
		});
	}
	let yt = /* @__PURE__ */ F(null);
	function bt(e, t, n) {
		if (e.button !== 0) return;
		e.preventDefault();
		let r = e.currentTarget.closest(".bg-layer"), i = e.currentTarget.closest(".grad-stop");
		I(yt, {
			layer: t,
			from: n,
			insert: n
		}, !0);
		let a = i.getBoundingClientRect(), o = e.clientY - a.top, s = i.cloneNode(!0);
		s.style.cssText = `position:fixed;left:${a.left}px;top:${a.top}px;width:${a.width}px;display:flex;align-items:center;gap:0.4rem;pointer-events:none;z-index:1000;opacity:0.92;padding:2px 4px;background:var(--urd-color-surface);border:1px solid var(--urd-color-accent);border-radius:6px;`, document.body.appendChild(s);
		let c = (e) => {
			s.style.top = `${e.clientY - o}px`;
			let t = [...r.querySelectorAll(".grad-stop")].map((e) => e.getBoundingClientRect()), n = t.length;
			for (let r = 0; r < t.length; r++) if (e.clientY < t[r].top + t[r].height / 2) {
				n = r;
				break;
			}
			I(yt, {
				...W(yt),
				insert: n
			}, !0);
		}, l = () => {
			window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", l), s.remove();
			let e = W(yt);
			if (I(yt, null), !e) return;
			let t = e.insert > e.from ? e.insert - 1 : e.insert;
			t !== e.from && vt(e.layer, e.from, t);
		};
		window.addEventListener("pointermove", c), window.addEventListener("pointerup", l);
	}
	function xt(e, t) {
		rt("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: a[t].version ?? 1,
				props: a[t].defaults()
			});
		});
	}
	async function St(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			lt(e, "src", (await ki(n)).dataUrl);
		} catch {
			_("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function Ct(e, t) {
		let n = [...t.target.files ?? []];
		if (t.target.value = "", !n.length) return;
		_("Komprimerer bildene…");
		let { images: r, failed: i, big: a } = await Pi(n);
		r.length && rt("bg", (t) => {
			let n = t.background.layers[e].props;
			n.images ??= [], n.images.push(...r.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Fi(r.length, i, a);
	}
	function wt(e, t, n) {
		rt("bg", (r) => {
			let i = r.background.layers[e].props.images, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Tt(e, t) {
		rt("bg", (n) => {
			n.background.layers[e].props.images.splice(t, 1);
		});
	}
	function Et(e, t, n, r) {
		rt(`edit:bgg-${W(Ye)}-${e}-${t}-${n}`, (i) => {
			i.background.layers[e].props.images[t][n] = r;
		});
	}
	let Dt = () => Object.entries(W(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function P(e) {
		return {
			type: e,
			version: Ua[e].version,
			props: Ua[e].defaults()
		};
	}
	let Ot = (e) => !!(e && Ua[e.type]?.entrance), kt = [["", "Ingen"], ...Object.entries(Ua).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.label])], At = [["", "Ingen"], ...Object.entries(Ua).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.label])];
	function jt(e) {
		e.animation && !Ot(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Mt(e) {
		Pe(`edit:anim-${W(O).blockId}`, (t) => {
			jt(t), t.animation = e ? P(e) : null;
		}), W(O) && T?.sendDemoAnim(W(O).sectionId, W(O).blockId);
	}
	function Nt(e) {
		Pe(`edit:hover-${W(O).blockId}`, (t) => {
			jt(t), t.hover = e ? P(e) : null;
		});
	}
	function Pt(e, t) {
		Number.isFinite(t) && (Pe(`edit:anim-${W(O).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(O) && T?.sendDemoAnim(W(O).sectionId, W(O).blockId));
	}
	function Ft(e) {
		rt("section-anim", (t) => {
			jt(t), t.animation = e ? P(e) : null;
		}), T?.sendDemoAnim(W(Ye));
	}
	function It(e) {
		rt("section-hover", (t) => {
			jt(t), t.hover = e ? P(e) : null;
		});
	}
	function Lt(e, t) {
		Number.isFinite(t) && (rt("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(W(Ye)));
	}
	function Rt(e) {
		let t = C.data.sections.find((e) => e.id === W(Ye));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		de("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(Ze, r, !0), C.save(), D(), T?.sendSection(W(d), t);
	}
	function zt() {
		return C.data.sections.find((e) => e.id === W(Ye)) ?? C.data.sections[0];
	}
	function Bt(e) {
		let t = C.data.sections.find((e) => e.id === W(Ye));
		t && (de("grid:section"), t.grid = e ? { ...w.data.grid } : null, I(Xe, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(W(d), t), W(Ee) === "Grid" && T?.sendShowGrid(!0));
	}
	function Vt(e, t) {
		let n = C.data.sections.find((e) => e.id === W(Ye));
		n?.grid && (de("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(Xe, { ...n.grid }, !0), C.save(), D(), T?.sendSection(W(d), n), W(Ee) === "Grid" && T?.sendShowGrid(!0));
	}
	function Ht(e, t) {
		de("grid:site"), I(b, {
			...W(b),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), ie(), W(Ee) === "Grid" && T?.sendShowGrid(!0);
	}
	async function Ut() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(y, await e.json(), !0) : e.status !== 503 && I(y, null);
		} catch {
			I(y, null);
		}
	}
	let Wt = null;
	async function Gt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Wt = (await e.json()).head ?? null);
		} catch {}
	}
	async function Kt(e) {
		if (!Wt) return await Gt(), {
			ok: await ve({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: Wt
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Wt}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Wt) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await ve({
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
	let qt = /* @__PURE__ */ F(null), Jt = /* @__PURE__ */ F(""), Yt = /* @__PURE__ */ F(!1);
	async function Xt() {
		I(Jt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(qt, (await e.json()).commits, !0) : e.status === 401 ? (I(qt, [], !0), I(Jt, "Logg inn med GitHub for å se historikken.")) : (I(qt, [], !0), I(Jt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			I(qt, [], !0), I(Jt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let Zt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), Qt = !1;
	async function $t() {
		let e = W(qt)?.[0];
		if (!(!e || W(Yt)) && await ve({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			I(Yt, !0), _("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Wt = e : Gt(), Qt = !0, _("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), en();
				} else t.status === 409 ? _("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : _((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				_("Kunne ikke nå publiseringslaget", "error");
			}
			I(Yt, !1), Xt();
		}
	}
	async function en() {
		let e = ["/content/site.json", ...W(E).pages.map((e) => `/${e.file}`)], t = async () => {
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
				_("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		_("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let tn = null;
	function an(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: _a("sec"),
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
	async function on(e, { keepHistory: t = !1 } = {}) {
		I(d, e, !0), tn = (async () => {
			let n = oe(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = da(await e.json(), w.data));
			} catch {}
			r ? ae.delete(e) : r = an(n), C = mi(`urd-draft-${e}`, () => r), C.replace(da(C.data, w.data)), C.save(), t || (le = null), I(Ye, null), I(Xe, null), D(), te(), I(p, "");
		})(), await tn;
	}
	function sn() {
		T?.destroy(), T = $i(W(v), {
			onEdit: ni,
			onMove: ai,
			onGrow: oi,
			onDelete: yi,
			onAddSection: pi,
			onMoveSection: hi,
			onDeleteSection: gi,
			onSectionSize: _i,
			onUndo: (e) => e.redo ? me() : pe(),
			onSelectSection: nt,
			onSelectBlock: Ae,
			onBlockMenu: Me,
			onReady: cn,
			onNavigate: dn,
			onAddBlock: (e) => Ci(e.sectionId, e.block),
			onAddBlocks: (e) => wi(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Mi,
			onMoveBlockSection: vi,
			onMobileManual: si,
			onMobileAuto: li,
			onReviewDone: ui,
			onBlockFlag: di,
			onCollectionEdit: Zn,
			onPluginBlocks: (e) => {
				I(Di, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => B("edit:nav-width", () => {
				W(E).nav.style ??= {}, W(E).nav.style.width = e.width;
			})
		});
	}
	async function cn() {
		await tn, await sr, T?.sendPlugins(ze(W(cr))?.enabled ?? []), T?.sendViewport(W(S)), Yn(), w.hasDraft() && ie();
		let e = !W(u).pages.some((e) => e.id === W(d));
		(C.hasDraft() || e) && T?.sendPage(W(d), C.data), W(x) || T?.sendChrome(!1), W(Ee) === "Grid" && T?.sendShowGrid(!0), W(ln) && T?.sendShowGuides(!0), l();
	}
	let ln = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1");
	function un() {
		I(ln, !W(ln)), localStorage.setItem("urd-guides", W(ln) ? "1" : "0"), T?.sendShowGuides(W(ln));
	}
	function dn(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(E).pages.find((e) => e.path === t);
		n && n.id !== W(d) && on(n.id);
	}
	function B(e, t) {
		de(e), t(), w.save(), D(), ie();
	}
	let fn = /* @__PURE__ */ F(""), pn = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function mn(e, t = null) {
		return e ? pn.includes(e) ? `«${e}» er et reservert navn` : W(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function hn() {
		let e = W(fn).trim(), t = Ai(e), n = mn(t);
		if (n) {
			_(n, "error");
			return;
		}
		B("pages", () => {
			W(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(an({
			id: t,
			title: e
		}))), D(), I(fn, ""), on(t);
	}
	function gn(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		B("pages", () => {
			e.title = n;
			for (let t of W(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(d) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(W(d), C.data)) : _n(e, (e) => {
			e.meta.title = n;
		});
	}
	async function _n(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = da(await t.json(), w.data));
		} catch {}
		r ||= an(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function vn(e, t) {
		let n = Ai(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = mn(n, e.id);
		if (r) {
			_(r, "error");
			return;
		}
		B("pages", () => {
			e.path = `/${n}`;
		});
	}
	function yn(e) {
		e.path !== "/" && (B("pages", () => {
			W(E).pages = W(E).pages.filter((t) => t.id !== e.id), W(E).nav.items = W(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of W(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			W(E).nav.items = W(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === W(d) && on(W(E).pages[0].id), _("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function xn(e) {
		B("edit:nav-logo", () => {
			W(E).nav.logo = {
				type: "text",
				value: "",
				...W(E).nav.logo,
				...e
			};
		});
	}
	function Sn(e) {
		B("nav", () => {
			W(E).nav.logo ??= {
				type: "text",
				value: W(E).site.title
			};
			let t = W(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Cn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			B("nav", () => {
				let t = W(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			_("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let wn = /* @__PURE__ */ F(null);
	function Tn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			I(wn, String(n.result), !0);
		}, n.onerror = () => _("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function En(e) {
		B("edit:site-icon", () => {
			W(E).site.icon = e;
		}), I(wn, null);
	}
	function Dn() {
		B("edit:site-icon", () => {
			delete W(E).site.icon;
		});
	}
	let On = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!W(E)?.site) return;
		let e = W(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			On.test(e) && (t.href = e);
		}
	});
	function kn(e) {
		B("nav", () => {
			W(E).nav.layout = e;
		});
	}
	function An(e, t) {
		B(`edit:nav-style-${e}`, () => {
			W(E).nav.style ??= {}, t === void 0 ? delete W(E).nav.style[e] : W(E).nav.style[e] = t;
		});
	}
	let jn = /* @__PURE__ */ N(() => W(E)?.nav?.variant === "side-left" || W(E)?.nav?.variant === "side-right"), Mn = /* @__PURE__ */ N(() => W(E)?.nav?.variant === "floating" || W(E)?.nav?.variant === "floating-square"), Nn = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, Pn = /* @__PURE__ */ N(() => Nn[W(E)?.nav?.style?.hover] ?? null);
	function Fn(e) {
		B("nav", () => {
			e === "bar" ? delete W(E).nav.variant : W(E).nav.variant = e;
		});
	}
	function In(e) {
		B("nav", () => {
			W(E).nav.style ??= {}, e ? W(E).nav.style.glow = !0 : delete W(E).nav.style.glow;
		});
	}
	function Ln(e) {
		B("nav", () => {
			W(E).nav.style ??= {}, e ? delete W(E).nav.style.topGap : W(E).nav.style.topGap = !1;
		});
	}
	function Rn(e) {
		B("nav", () => {
			W(E).nav.style ??= {}, e === "standard" ? delete W(E).nav.style.hover : W(E).nav.style.hover = e;
		});
	}
	async function zn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			B("nav", () => {
				W(E).nav.style ??= {}, W(E).nav.style.image = e.dataUrl;
			});
		} catch {
			_("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Bn() {
		B("nav", () => {
			W(E).nav.style && delete W(E).nav.style.image;
		});
	}
	let Vn = null, Hn = {}, H = /* @__PURE__ */ F(nn([])), Un = /* @__PURE__ */ F(nn({})), Wn = /* @__PURE__ */ F(null), U = /* @__PURE__ */ F(""), Gn = /* @__PURE__ */ F("news"), Kn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function qn() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Vn = mi("urd-draft-samlinger", () => e), I(H, [...Vn.data.samlinger ?? []], !0);
		for (let e of W(H)) {
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
			}, Hn[e] = mi(`urd-draft-samling-${e}`, () => t);
		}
		Jn();
	}
	function Jn(e = !0) {
		let t = {};
		for (let e of W(H)) Hn[e] && (t[e] = JSON.parse(JSON.stringify(Hn[e].data)));
		I(Un, t, !0), e && Yn();
	}
	function Yn() {
		T?.sendCollections(ze(W(Un)) ?? {});
	}
	function Xn(e, t, n = !0) {
		let r = Hn[e];
		r && (t(r.data), r.save(), D(), Jn(n));
	}
	function Zn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || Xn(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Qn() {
		let e = W(U).trim();
		if (!e) return;
		let t = Ai(e);
		if (!t || W(H).includes(t)) {
			_(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: W(Gn),
			entries: []
		};
		Hn[t] = mi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), Hn[t].replace(n), Hn[t].save(), Vn.data.samlinger = [...W(H), t], Vn.save(), I(H, [...W(H), t], !0), I(Wn, t, !0), I(U, ""), D(), Jn();
	}
	function $n(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete Hn[e], Vn.data.samlinger = W(H).filter((t) => t !== e), Vn.save(), I(H, W(H).filter((t) => t !== e), !0), W(Wn) === e && I(Wn, null), D(), Jn();
	}
	function er(e) {
		Xn(e, (e) => {
			e.entries.unshift({
				id: _a("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function tr(e, t, n, r) {
		Xn(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function nr(e, t, n) {
		Xn(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function rr(e, t) {
		Xn(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function ir(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && tr(e, t, "image", (await ki(r)).dataUrl);
	}
	let ar = null, or, sr = new Promise((e) => {
		or = e;
	}), cr = /* @__PURE__ */ F(null), lr = nn({}), ur = /* @__PURE__ */ F("0.0.0"), dr = /* @__PURE__ */ F(""), fr = /* @__PURE__ */ F(""), pr = /* @__PURE__ */ F(nn([])), mr = /* @__PURE__ */ F("pending"), hr = () => [.../* @__PURE__ */ new Set([...W(cr)?.enabled ?? [], ...W(cr)?.disabled ?? []])];
	function gr() {
		I(cr, JSON.parse(JSON.stringify(ar.data)), !0);
	}
	async function _r() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		ar = mi("urd-draft-plugins", () => e), gr();
		try {
			I(ur, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of hr()) Sr(e);
		yr(), or(), T?.sendPlugins(ze(W(cr))?.enabled ?? []);
	}
	async function yr() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				xr();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(pr, (t ?? []).filter((e) => !hr().includes(e)), !0);
			for (let e of W(pr)) Sr(e);
			I(mr, "ok");
		} catch {
			xr();
		}
	}
	function xr() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(pr, e.filter((e) => !hr().includes(e)), !0);
				for (let e of W(pr)) Sr(e);
				I(mr, "ok");
				return;
			}
		} catch {}
		I(mr, "unavailable");
	}
	async function Sr(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ga(t);
			lr[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ma(W(ur), t.requiresEngine)
			};
		} catch {
			lr[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Cr(e, t) {
		let n = ar.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), ar.save(), D(), gr(), wr();
	}
	function wr() {
		W(v) && (W(v).src = W(v).src);
	}
	function Tr(e) {
		let t = ar.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), ar.save(), D(), gr(), wr();
	}
	async function Er() {
		I(fr, "");
		let e = W(dr).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(fr, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (hr().includes(e)) {
			I(fr, "Pluginen står allerede i listen");
			return;
		}
		if (await Sr(e), lr[e].errors.length) {
			I(fr, `Fant ingen gyldig plugin: ${lr[e].errors.join("; ")}`);
			return;
		}
		Cr(e, !0), I(dr, "");
	}
	function Dr(e) {
		I(pr, W(pr).filter((t) => t !== e), !0), Cr(e, !0);
	}
	function K(e, t) {
		B(e, () => {
			W(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(E).footer);
		});
	}
	function Or(e, t) {
		B(`edit:nav-label-${e}`, () => {
			W(E).nav.items[e].label = t;
		});
	}
	function Ar(e, t) {
		B("nav", () => {
			let n = W(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function jr(e, t) {
		B(`edit:nav-href-${e}`, () => {
			W(E).nav.items[e].href = t;
		});
	}
	function Mr(e, t) {
		let n = e + t, r = W(E).nav.items;
		n < 0 || n >= r.length || B("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Nr(e) {
		B("nav", () => {
			W(E).nav.items.splice(e, 1);
		});
	}
	function Pr() {
		B("nav", () => {
			W(E).nav.items.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function Ir(e) {
		B("nav", () => {
			let t = W(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function Lr(e, t, n) {
		B(`edit:nav-child-label-${e}-${t}`, () => {
			W(E).nav.items[e].children[t].label = n;
		});
	}
	function Rr(e, t, n) {
		B("nav", () => {
			let r = W(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Br(e, t, n) {
		B(`edit:nav-child-href-${e}-${t}`, () => {
			W(E).nav.items[e].children[t].href = n;
		});
	}
	function Vr(e, t, n) {
		let r = t + n, i = W(E).nav.items[e].children;
		r < 0 || r >= i.length || B("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Hr(e, t) {
		B("nav", () => {
			let n = W(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = W(E).pages[0].id));
		});
	}
	function Ur(e, t) {
		B(`edit:theme-color-${e}`, () => {
			W(E).theme.tokens.color[e] = t;
		});
	}
	function Wr(e, t) {
		B("theme", () => {
			W(E).theme.tokens.font[e] = t;
		});
	}
	function Gr(e, t) {
		B("theme", () => {
			W(E).theme.tokens.radius[e] = t;
		});
	}
	function Kr(e) {
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
	function qr() {
		return Object.fromEntries(Object.entries(W(E).theme.tokens.color).map(([e, t]) => [e, Kr(t)]));
	}
	function Jr() {
		B("theme", () => {
			W(E).theme.alt = { tokens: { color: qr() } };
		});
	}
	function Yr() {
		B("theme", () => {
			W(E).theme.alt.tokens.color = qr();
		});
	}
	function Zr() {
		B("theme", () => {
			delete W(E).theme.alt;
		});
	}
	function $r(e, t) {
		B(`edit:theme-alt-${e}`, () => {
			W(E).theme.alt.tokens.color[e] = t;
		});
	}
	function ei(e) {
		B("theme", () => {
			e === "light" ? delete W(E).theme.scheme : W(E).theme.scheme = e;
		});
	}
	function ti() {
		I(x, !W(x)), T?.sendChrome(W(x));
	}
	function ni(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (de(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), W(O)?.blockId === e.blockId && k(), e.rerender && T?.sendSection(W(d), t), I(p, ""));
	}
	function ai(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		de(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ne(t, "desktop-endret-etter-mobil"), C.save(), D(), W(O)?.blockId === e.blockId && k();
	}
	function oi(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (C.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), C.hasDraft() && de(`edit:${e.blockId}`), t.frames.desktop.h = e.h, C.save(), D(), W(O)?.blockId === e.blockId && k());
	}
	function si(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			de("mobile-manual");
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
	function li(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			de("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, C.save(), D(), te(), T?.sendSection(W(d), t);
		}
	}
	function ui(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (de("review-done"), t.responsive.mobile.attention = null, C.save(), D(), te());
	}
	function di(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (de("decor"), t.decor = e.decor, C.save(), D(), W(O)?.blockId === e.blockId && k());
	}
	function pi(e) {
		de("add-section"), e.section.id || (e.section.id = _a("sec")), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(W(d), C.data), I(Ye, e.section.id, !0), tt(e.section), W(Ee) !== "Egenskaper" && (I(Ee, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function hi(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (de("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(W(d), C.data));
	}
	function gi(e) {
		de("delete-section"), e.sectionId === W(Ye) && (I(Ye, null), I(Xe, null)), W(O)?.sectionId === e.sectionId && I(O, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(W(d), C.data);
	}
	function _i(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			de("section-size"), t.size = {
				...t.size,
				minHeight: e.minHeight
			};
			for (let n of e.moves ?? []) {
				let e = t.blocks.find((e) => e.id === n.blockId);
				e && (e.frames.desktop = {
					...e.frames.desktop,
					y: e.frames.desktop.y + n.dy
				});
			}
			e.moves?.length && (ne(t, "seksjonshøyde"), W(O)?.sectionId === e.sectionId && k()), e.sectionId === W(Ye) && I(Ze, e.minHeight, !0), C.save(), D();
		}
	}
	function vi(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (de("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ne(t, "blokk-flyttet"), ne(n, "blokk-flyttet"), C.save(), D(), te(), T?.sendPage(W(d), C.data), W(O)?.blockId === e.blockId && (I(O, {
			...W(O),
			sectionId: e.toSectionId
		}, !0), k()));
	}
	function yi(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		de("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(W(O)?.blockId) && I(O, null), ne(t, "blokk-slettet"), C.save(), D(), T?.sendSection(W(d), t);
	}
	let bi = {
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
		},
		faq: {
			type: "faq",
			props: {
				items: [
					{
						q: "Hvordan blir jeg medlem?",
						a: "<p>Skriv svaret her.</p>"
					},
					{
						q: "Når er dere åpne?",
						a: "<p>Skriv svaret her.</p>"
					},
					{
						q: "Hvordan kontakter jeg dere?",
						a: "<p>Skriv svaret her.</p>"
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		}
	};
	function xi(e) {
		let t = bi[e];
		return t ? {
			id: _a("blk"),
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
	function Si(e) {
		T ? T.sendPlaceBlock(e) : Ci(zt()?.id, e);
	}
	function Ci(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		de("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ne(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(W(d), n);
	}
	function wi(e, t, n, r) {
		let i = C.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		de("add-blocks");
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
		}), ne(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(W(d), i);
	}
	function Ei(e) {
		Si(xi(e));
	}
	let Di = /* @__PURE__ */ F(nn([]));
	function Oi(e, t = {}) {
		Si({
			id: _a("blk"),
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
	function Mi(e) {
		let t = xi(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = C.data.sections.find((t) => t.id === e.sectionId)?.grid ?? W(E).grid, r = Ga({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Ci(e.sectionId, t), T?.sendSelect(t.id), e.kind === "image" && _("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && _("Galleri lagt til - legg til bilder i Egenskaper");
		}
	}
	async function Ni(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		_("Komprimerer bildet…");
		let n;
		try {
			n = await ki(t);
		} catch {
			_("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(v)?.clientWidth ?? 1280));
		Si({
			id: _a("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ai(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? _(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : _("");
	}
	async function Pi(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await ki(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Ai(i.name).replaceAll("-", " "),
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
	function Fi(e, t, n) {
		t ? _(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? _(`${n} av bildene er store - vurder mindre utsnitt`, "error") : _(e ? "" : "Ingen bilder lagt til");
	}
	async function Ii(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		_("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Pi(t);
		n.length && Pe("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Fi(n.length, r, i);
	}
	async function Li(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		_("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Pi(t);
		if (!n.length) {
			Fi(0, r, i);
			return;
		}
		let a = xi("galleri");
		a.props.images = n, Si(a), Fi(n.length, r, i);
	}
	function Ri(e, t) {
		Pe("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function zi(e) {
		Pe("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Bi(e, t, n) {
		Pe(`edit:${W(O).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Vi(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ai(n || "bilde")}-${ji(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Hi(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) if (e.type === "image" && Vi(e.props, "src", "bakgrunn", t), e.type === "bildegalleri") for (let n of e.props.images ?? []) Vi(n, "src", "bakgrunn", t);
			for (let e of n.blocks) if (e.type === "image" && Vi(e.props, "src", e.props.alt, t), e.type === "icon" && Vi(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Vi(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function Ui(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Vi(n, "value", "logo", t), n?.type === "both" && Vi(n, "image", "logo", t), e.nav?.style && Vi(e.nav.style, "image", "meny", t), Vi(e.site, "icon", "ikon", t), t;
	}
	let Wi = /* @__PURE__ */ F(!1);
	function Gi() {
		if (!W(Wi)) {
			I(Wi, !0);
			return;
		}
		I(Wi, !1), Ki();
	}
	bn(() => {
		if (!W(Wi)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || I(Wi, !1);
		}, t = (e) => {
			e.key === "Escape" && I(Wi, !1);
		}, n = () => I(Wi, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Ki() {
		de("discard");
		for (let e of W(E).pages) e.id !== W(d) && !ae.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), ar && (ar.reset(), gr()), Vn) {
			Vn.reset(), I(H, [...Vn.data.samlinger ?? []], !0);
			for (let e of Object.keys(Hn)) W(H).includes(e) ? Hn[e].reset() : delete Hn[e];
			Jn();
		}
		re(), I(b, {
			snap: !0,
			...W(E).grid
		}, !0), D(), I(p, ""), ie(), W(E).pages.some((e) => e.id === W(d)) ? T?.sendPage(W(d), e) : on(W(E).pages[0].id);
	}
	async function qi() {
		if (Qt) {
			_("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		_("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(E).pages) {
			let a = `urd-draft-${i.id}`, o = ae.has(i.id) || !W(u).pages.some((e) => e.id === i.id), s = null;
			if (i.id === W(d) && (C.hasDraft() || o)) s = C.data;
			else if (i.id !== W(d)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = da(JSON.parse(e), w.data);
				} catch {}
			}
			if (!s && o && (s = an(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Hi(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(W(E)));
			e.push(...Ui(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(W(u).theme, W(E).theme) || t.push("tema"), i(W(u).nav, W(E).nav) || t.push("menyen"), i(W(u).footer, W(E).footer) || t.push("footeren"), i(W(u).pages, W(E).pages) || t.push("sideregisteret"), i(W(u).grid, W(E).grid) || t.push("gridet"), (W(u).site.icon ?? null) !== (W(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = W(u).site, { icon: s, ...c } = W(E).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Hn).filter(([, e]) => e.hasDraft());
		if (i.length || Vn?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Vi(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Vn?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Vn.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!W(H).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		ar?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(ar.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of W(E).pages) n.path !== "/" && e.push({
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
		for (let e of W(u).pages) {
			let t = W(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await Kt(e);
		if (!s.ok) {
			_("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let c = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...s.head ? { expect: s.head } : {}
		}, l = null;
		try {
			l = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(c)
			});
		} catch {}
		if (l?.ok) {
			let { sha: e } = await l.json().catch(() => ({}));
			e ? Wt = e : Gt(), Hi(C.data), Ui(W(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ae.add(e);
			if (I(u, JSON.parse(JSON.stringify(W(E))), !0), w = mi("urd-draft-site", () => W(u)), re(), ar) {
				let e = JSON.parse(JSON.stringify(ar.data));
				ar = mi("urd-draft-plugins", () => e), gr();
			}
			if (Vn) {
				for (let e of Object.values(Hn)) for (let t of e.data.entries) Vi(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Vn.data));
				Vn = mi("urd-draft-samlinger", () => e);
				for (let e of W(H)) {
					if (!Hn[e]) continue;
					let t = JSON.parse(JSON.stringify(Hn[e].data));
					Hn[e] = mi(`urd-draft-samling-${e}`, () => t);
				}
				Jn();
			}
			I(b, {
				snap: !0,
				...W(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = mi(`urd-draft-${W(d)}`, () => t), ae.has(W(d)) && localStorage.setItem(`urd-draft-${W(d)}`, JSON.stringify(t)), D(), _("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (l?.status === 401) {
			let e = (await l.json().catch(() => null))?.error;
			_(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await Ut();
		} else l?.status === 403 ? _((await l.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : l?.status === 409 ? _("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : _(l ? (await l.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	ge();
	var Ji = tc();
	br("keydown", rn, he);
	var Yi = R(Ji), Xi = L(Yi), Zi = (e) => {
		var t = vo();
		X(L(t), () => o.pencil), Ne(), j(t), G("click", t, ti), q(e, t);
	};
	Y(Xi, (e) => {
		W(x) || e(Zi);
	});
	var ea = z(Xi, 2);
	let ta;
	var na = L(ea), ra = z(L(na), 2);
	$(ra, {
		get value() {
			return W(c);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return s;
		},
		onchange: (e) => I(c, e, !0)
	});
	var oa = z(ra, 2), sa = (e) => {
		var t = yo(), n = R(t), r = L(n, !0);
		j(n);
		var i = z(n, 2), a = L(i);
		let s;
		X(a, () => o.desktop, !0), j(a);
		var c = z(a, 2);
		let l;
		X(c, () => o.phone, !0), j(c), j(i);
		var u = z(i, 2);
		let d;
		X(u, () => o.guides, !0), j(u), V((e) => {
			J(r, e), s = Xr(a, 1, "ghost svelte-1n46o8q", null, s, { active: W(S) === "desktop" }), l = Xr(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(S) === "mobile" }), d = Xr(u, 1, "ghost svelte-1n46o8q", null, d, { active: W(ln) });
		}, [() => oe()?.title ?? ""]), G("click", n, () => Oe("Sider")), G("click", a, () => I(S, "desktop")), G("click", c, () => I(S, "mobile")), G("click", u, un), q(e, t);
	};
	Y(oa, (e) => {
		W(u) && e(sa);
	});
	var ca = z(oa, 2), la = (e) => {
		var t = bo(), n = L(t);
		X(n, () => o.phone);
		var r = z(n);
		j(t), V(() => J(r, ` ${W(ee) ?? ""} ${W(ee) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => I(S, "mobile")), q(e, t);
	};
	Y(ca, (e) => {
		W(ee) > 0 && e(la);
	});
	var fa = z(ca, 2), pa = (e) => {
		var t = xo(), n = z(R(t), 2);
		let r;
		var i = L(n, !0);
		j(n), V(() => {
			r = Xr(n, 1, "ghost discard-btn svelte-1n46o8q", null, r, { armed: W(Wi) }), ii(n, "title", W(Wi) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), J(i, W(Wi) ? "Sikker?" : "Forkast utkast");
		}), G("click", n, Gi), q(e, t);
	};
	Y(fa, (e) => {
		W(f) && e(pa);
	}), j(na);
	var ha = z(na, 2), va = L(ha), ba = (e) => {
		var t = Eo(), n = R(t), r = L(n), i = (e) => {
			var t = So();
			X(R(t), () => o.eye), Ne(), q(e, t);
		}, a = (e) => {
			var t = Co();
			X(R(t), () => o.pencil), Ne(), q(e, t);
		};
		Y(r, (e) => {
			W(x) ? e(i) : e(a, -1);
		}), j(n);
		var s = z(n, 2), c = (e) => {
			var t = wo(), n = L(t), r = (e) => {
				var t = kr();
				X(R(t), () => o.warn), q(e, t);
			};
			Y(n, (e) => {
				W(y).allowed || e(r);
			});
			var i = z(n, 1, !0);
			j(t), V(() => {
				ii(t, "title", W(y).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(i, W(y).login);
			}), q(e, t);
		}, l = (e) => {
			q(e, To());
		};
		Y(s, (e) => {
			W(y)?.loggedIn ? e(c) : W(y) && e(l, 1);
		});
		var u = z(s, 2), d = z(u, 2);
		V((e) => {
			ii(n, "title", W(x) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ii(u, "href", e), d.disabled = !W(f);
		}, [() => oe()?.path ?? "/"]), G("click", n, ti), G("click", d, qi), q(e, t);
	};
	Y(va, (e) => {
		W(u) && e(ba);
	}), j(ha), j(ea);
	var xa = z(ea, 2), Sa = (e) => {
		var t = Js(), n = L(t), a = (e) => {
			var t = qs(), n = R(t);
			zr(n, 21, () => De, Fr, (e, t, n) => {
				var r = ko(), i = R(r), a = (e) => {
					q(e, Do());
				};
				Y(i, (e) => {
					n > 0 && e(a);
				}), zr(z(i, 2), 16, () => W(t), (e) => e, (e, t) => {
					var n = Oo();
					let r;
					var i = L(n, !0);
					j(n), V(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: W(Ee) === t }), J(i, t);
					}), G("click", n, () => Oe(t)), q(e, n);
				}), q(e, r);
			}), j(n);
			var a = z(n, 2), s = (e) => {
				var t = Ks(), n = L(t), a = L(n, !0);
				j(n);
				var s = z(n, 2), c = (e) => {
					var t = Po(), n = z(L(t), 2);
					zr(n, 17, () => W(E).pages, (e) => e.id, (e, t) => {
						var n = No();
						let r;
						var i = L(n);
						Z(i);
						var a = z(i, 2), s = (e) => {
							q(e, Ao());
						}, c = (e) => {
							var n = jo();
							Z(n), V((e) => Q(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => vn(W(t), e.target.value)), q(e, n);
						};
						Y(a, (e) => {
							W(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = z(a, 2), u = L(l);
						X(u, () => o.right, !0), j(u);
						var f = z(u, 2), p = (e) => {
							var n = Mo();
							X(n, () => o.cross, !0), j(n), G("click", n, () => yn(W(t))), q(e, n);
						};
						Y(f, (e) => {
							W(t).path !== "/" && e(p);
						}), j(l), j(n), V(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(d) }), Q(i, W(t).title), u.disabled = W(t).id === W(d);
						}), G("change", i, (e) => gn(W(t), e.target.value)), G("click", u, () => on(W(t).id)), q(e, n);
					});
					var r = z(n, 4);
					Z(r);
					var i = z(r, 2);
					Ne(2), j(t), V((e) => i.disabled = e, [() => !W(fn).trim()]), G("keydown", r, (e) => e.key === "Enter" && hn()), ci(r, () => W(fn), (e) => I(fn, e)), G("click", i, hn), q(e, t);
				}, l = (e) => {
					var t = Xo(), n = z(L(t), 2), r = z(L(n), 2), i = L(r), a = z(L(i));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.logo?.type ?? "text");
						$(a, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => Sn(e)
						});
					}
					j(i);
					var s = z(i, 2), c = (e) => {
						var t = Fo(), n = R(t);
						Z(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ N(() => [["", "Arv"], ...Wa.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => xn({ font: e || void 0 })
							});
						}
						var a = z(i, 2);
						Z(a);
						var o = z(a, 2);
						let s;
						var c = z(o, 2);
						let l;
						j(r), V((e) => {
							Q(n, W(E).nav.logo?.value ?? ""), Q(a, W(E).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: W(E).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!W(E).nav.logo?.italic })]), G("input", n, (e) => xn({ value: e.target.value })), G("change", a, (e) => xn({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", o, () => xn({ bold: W(E).nav.logo?.bold === !1 })), G("click", c, () => xn({ italic: !W(E).nav.logo?.italic })), q(e, t);
					};
					Y(s, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = z(s, 2), u = (e) => {
						var t = Io(), n = R(t), r = L(n), i = L(r), a = z(i);
						j(r);
						var o = z(r, 2);
						Z(o);
						var s = z(o, 2);
						Z(s), j(n), Ne(2), V(() => {
							J(i, `${(W(E).nav.logo?.type === "image" ? W(E).nav.logo?.value : W(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, W(E).nav.logo?.size ?? 32), Q(s, W(E).nav.logo?.radius ?? 0);
						}), G("change", a, Cn), G("change", o, (e) => xn({ size: Number(e.target.value) })), G("change", s, (e) => xn({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(l, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = z(l, 2), f = (e) => {
						var t = Lo(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return W(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => xn({ order: e })
							});
						}
						j(t), q(e, t);
					};
					Y(d, (e) => {
						W(E).nav.logo?.type === "both" && e(f);
					}), Ne(2), j(r), j(n);
					var p = z(n, 2), m = z(L(p), 2), h = L(m), g = z(L(h));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.variant ?? "bar");
						$(g, {
							get value() {
								return W(e);
							},
							options: [
								["bar", "Stripe (standard)"],
								["floating", "Flytende (pille)"],
								["floating-square", "Flytende (firkant)"],
								["side-left", "Sidestilt venstre"],
								["side-right", "Sidestilt høyre"]
							],
							onchange: (e) => Fn(e)
						});
					}
					j(h);
					var _ = z(h, 2), v = (e) => {
						var t = Ro(), n = R(t), r = L(n);
						Z(r), Ne(), j(n);
						var i = z(n, 2), a = L(i);
						Z(a), Ne(), j(i), V(() => {
							ri(r, W(E).nav.style?.glow === !0), ri(a, W(E).nav.style?.topGap !== !1);
						}), G("change", r, (e) => In(e.target.checked)), G("change", a, (e) => Ln(e.target.checked)), q(e, t);
					};
					Y(_, (e) => {
						W(Mn) && e(v);
					});
					var y = z(_, 2), b = (e) => {
						var t = zo(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.sideAlign ?? "left");
							$(n, {
								get value() {
									return W(e);
								},
								options: [
									["left", "Venstre"],
									["center", "Midtstilt"],
									["right", "Høyre"]
								],
								onchange: (e) => An("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), q(e, t);
					};
					Y(y, (e) => {
						W(jn) && e(b);
					});
					var x = z(y, 2), S = z(L(x)), ee = L(S);
					j(S), j(x);
					var te = z(x, 2);
					Z(te);
					var ne = z(te, 2), C = L(ne);
					Z(C), Ne(), j(ne);
					var w = z(ne, 2), T = z(L(w));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.size ?? "md");
						$(T, {
							get value() {
								return W(e);
							},
							options: [
								["sm", "Liten"],
								["md", "Standard"],
								["lg", "Stor"],
								["xl", "Ekstra stor"]
							],
							onchange: (e) => An("size", e === "md" ? void 0 : e)
						});
					}
					j(w);
					var re = z(w, 2), ie = z(L(re)), ae = (e) => {
						{
							let t = /* @__PURE__ */ N(() => W(E).nav.style?.sidePlacement ?? "top");
							$(e, {
								get value() {
									return W(t);
								},
								options: [
									["top", "Øverst (standard)"],
									["middle", "Midt på"],
									["bottom", "Nederst"]
								],
								onchange: (e) => An("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, oe = (e) => {
						{
							let t = /* @__PURE__ */ N(() => W(E).nav.layout ?? "right");
							$(e, {
								get value() {
									return W(t);
								},
								options: [
									["right", "Høyre"],
									["center", "Midtstilt"],
									["left", "Venstre (etter logoen)"]
								],
								onchange: (e) => kn(e)
							});
						}
					};
					Y(ie, (e) => {
						W(jn) ? e(ae) : e(oe, -1);
					}), j(re);
					var D = z(re, 2), se = (e) => {
						var t = Bo(), n = L(t);
						Z(n), Ne(), j(t), V(() => ri(n, W(E).nav.sticky !== !1)), G("change", n, (e) => B("nav", () => {
							W(E).nav.sticky = e.target.checked;
						})), q(e, t);
					};
					Y(D, (e) => {
						W(jn) || e(se);
					});
					var ce = z(D, 2), le = z(L(ce));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.hover ?? "standard");
						$(le, {
							get value() {
								return W(e);
							},
							options: [
								["standard", "Standard (aksentfarge)"],
								["underline", "Understrek"],
								["pill", "Pille"],
								["lift-plain", "Løft"],
								["lift", "Løft med glød"]
							],
							onchange: (e) => Rn(e)
						});
					}
					j(ce);
					var ue = z(ce, 2), de = (e) => {
						var t = Vo(), n = R(t), r = z(L(n)), i = L(r);
						j(r), j(n);
						var a = z(n, 2);
						Z(a), V((e) => {
							J(i, `${e ?? ""}%`), Q(a, W(E).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((W(E).nav.style?.hoverGlow ?? .6) * 100)]), G("input", a, (e) => An("hoverGlow", Number(e.target.value))), q(e, t);
					};
					Y(ue, (e) => {
						W(E).nav.style?.hover === "lift" && e(de);
					});
					var fe = z(ue, 2), pe = (e) => {
						var t = Ho(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ N(Dt);
							Ti(r, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								get label() {
									return W(Pn)[1];
								},
								onchange: (e) => An("hoverColor", e)
							});
						}
						j(t), V(() => {
							ii(t, "title", W(Pn)[1]), J(n, `${W(Pn)[0] ?? ""} `);
						}), q(e, t);
					};
					Y(fe, (e) => {
						W(Pn) && e(pe);
					});
					var me = z(fe, 2), he = z(L(me));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ N(Dt);
						Ti(he, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => An("hoverTextColor", e)
						});
					}
					j(me);
					var ge = z(me, 2), _e = z(L(ge));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ N(Dt);
						Ti(_e, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => An("bg", e)
						});
					}
					j(ge);
					var ve = z(ge, 2), ye = z(L(ve));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ N(Dt);
						Ti(ye, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => An("textColor", e)
						});
					}
					j(ve);
					var be = z(ve, 2), xe = L(be), Se = L(xe), Ce = z(Se);
					j(xe);
					var we = z(xe, 2), Te = (e) => {
						var t = Uo();
						X(t, () => o.cross, !0), j(t), G("click", t, Bn), q(e, t);
					};
					Y(we, (e) => {
						W(E).nav.style?.image && e(Te);
					}), j(be);
					var Ee = z(be, 2), De = (e) => {
						var t = Wo(), n = R(t), r = z(L(n)), i = L(r);
						j(r), j(n);
						var a = z(n, 2);
						Z(a);
						var o = z(a, 2), s = z(L(o)), c = L(s);
						j(s), j(o);
						var l = z(o, 2);
						Z(l);
						var u = z(l, 2), d = z(L(u)), f = L(d);
						j(d), j(u);
						var p = z(u, 2);
						Z(p), V((e, t, n) => {
							J(i, `${e ?? ""}%`), Q(a, W(E).nav.style?.imageOpacity ?? 1), J(c, `${t ?? ""}%`), Q(l, W(E).nav.style?.imageY ?? 50), J(f, `${n ?? ""}%`), Q(p, W(E).nav.style?.imageX ?? 50);
						}, [
							() => Math.round((W(E).nav.style?.imageOpacity ?? 1) * 100),
							() => Math.round(W(E).nav.style?.imageY ?? 50),
							() => Math.round(W(E).nav.style?.imageX ?? 50)
						]), G("input", a, (e) => An("imageOpacity", Number(e.target.value))), G("input", l, (e) => An("imageY", Number(e.target.value))), G("input", p, (e) => An("imageX", Number(e.target.value))), q(e, t);
					};
					Y(Ee, (e) => {
						W(E).nav.style?.image && e(De);
					}), j(m), j(p);
					var Oe = z(p, 2), O = z(L(Oe), 2), ke = L(O), k = z(L(ke));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ N(() => W(jn) ? [
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
						$(k, {
							get value() {
								return W(e);
							},
							get options() {
								return W(t);
							},
							onchange: (e) => An("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(ke);
					var Ae = z(ke, 2), A = (e) => {
						var t = Go(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ N(Dt);
							Ti(n, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => An("subPillColor", e)
							});
						}
						j(t), q(e, t);
					};
					Y(Ae, (e) => {
						W(E).nav.style?.subStyle === "pills" && e(A);
					});
					var je = z(Ae, 2), Me = z(L(je));
					Z(Me), j(je);
					var Pe = z(je, 2), M = (e) => {
						var t = Ko(), n = L(t);
						Z(n), Ne(), j(t), V(() => ri(n, W(E).nav.style?.subImage === !0)), G("change", n, (e) => An("subImage", e.target.checked ? !0 : void 0)), q(e, t);
					};
					Y(Pe, (e) => {
						W(E).nav.style?.image && e(M);
					}), j(O), j(Oe);
					var Fe = z(Oe, 2), Ie = z(L(Fe), 2), Le = L(Ie);
					zr(Le, 17, () => W(E).nav.items, Fr, (e, t, n) => {
						var r = Yo(), i = R(r), a = L(i);
						Z(a);
						var s = z(a, 2), c = L(s);
						X(c, () => o.plus, !0), j(c);
						var l = z(c, 2);
						l.disabled = n === 0, X(l, () => o.up, !0), j(l);
						var u = z(l, 2);
						X(u, () => o.down, !0), j(u);
						var d = z(u, 2);
						X(d, () => o.cross, !0), j(d), j(s);
						var f = z(s, 2), p = L(f);
						{
							let e = /* @__PURE__ */ N(() => W(t).page ?? (W(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ N(() => [
								...W(E).pages.map((e) => [e.id, e.title]),
								["__href", "Ekstern lenke"],
								...W(t).children ? [["__none", "Ingen lenke (kun åpner undermenyen)"]] : []
							]);
							$(p, {
								get value() {
									return W(e);
								},
								title: "Hvor lenken går",
								get options() {
									return W(r);
								},
								onchange: (e) => Ar(n, e)
							});
						}
						j(f);
						var m = z(f, 2), h = (e) => {
							var r = qo();
							Z(r), V(() => Q(r, W(t).href)), G("change", r, (e) => jr(n, e.target.value)), q(e, r);
						};
						Y(m, (e) => {
							!W(t).page && W(t).href != null && e(h);
						}), j(i), zr(z(i, 2), 17, () => W(t).children ?? [], Fr, (e, r, i) => {
							var a = Jo(), s = L(a);
							Z(s);
							var c = z(s, 2), l = L(c);
							l.disabled = i === 0, X(l, () => o.up, !0), j(l);
							var u = z(l, 2);
							X(u, () => o.down, !0), j(u);
							var d = z(u, 2);
							X(d, () => o.cross, !0), j(d), j(c);
							var f = z(c, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => W(r).page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(p, {
									get value() {
										return W(e);
									},
									title: "Hvor lenken går",
									get options() {
										return W(t);
									},
									onchange: (e) => Rr(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = qo();
								Z(t), V(() => Q(t, W(r).href ?? "")), G("change", t, (e) => Br(n, i, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), j(a), V(() => {
								Q(s, W(r).label), u.disabled = i === W(t).children.length - 1;
							}), G("input", s, (e) => Lr(n, i, e.target.value)), G("click", l, () => Vr(n, i, -1)), G("click", u, () => Vr(n, i, 1)), G("click", d, () => Hr(n, i)), q(e, a);
						}), V(() => {
							Q(a, W(t).label), u.disabled = n === W(E).nav.items.length - 1;
						}), G("input", a, (e) => Or(n, e.target.value)), G("click", c, () => Ir(n)), G("click", l, () => Mr(n, -1)), G("click", u, () => Mr(n, 1)), G("click", d, () => Nr(n)), q(e, r);
					});
					var Re = z(Le, 2);
					Ne(2), j(Ie), j(Fe), j(t), V((e) => {
						J(ee, `${e ?? ""}%`), Q(te, 1 - (W(E).nav.style?.bgOpacity ?? .85)), ri(C, W(E).nav.style?.blur !== !1), J(Se, `${W(E).nav.style?.image ? "Bytt bakgrunnsbilde" : "Bakgrunnsbilde i menyen"} `), Q(Me, W(E).nav.style?.subColumns ?? 1);
					}, [() => Math.round((1 - (W(E).nav.style?.bgOpacity ?? .85)) * 100)]), G("input", te, (e) => An("bgOpacity", Math.round((1 - Number(e.target.value)) * 100) / 100)), G("change", C, (e) => An("blur", e.target.checked)), G("change", Ce, zn), G("change", Me, (e) => An("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), G("click", Re, Pr), q(e, t);
				}, u = (e) => {
					var t = ts(), n = z(L(t), 2);
					Ti(z(L(n)), {
						get value() {
							return W(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Ur("bg", e)
					}), j(n);
					var r = z(n, 2);
					Ti(z(L(r)), {
						get value() {
							return W(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Ur("surface", e)
					}), j(r);
					var i = z(r, 2);
					Ti(z(L(i)), {
						get value() {
							return W(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Ur("text", e)
					}), j(i);
					var a = z(i, 2);
					Ti(z(L(a)), {
						get value() {
							return W(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Ur("accent", e)
					}), j(a);
					var s = z(a, 2), c = z(L(s));
					{
						let e = /* @__PURE__ */ N(() => W(E).theme.tokens.color["accent-text"] ?? W(E).theme.tokens.color.bg);
						Ti(c, {
							get value() {
								return W(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => Ur("accent-text", e)
						});
					}
					j(s);
					var l = z(s, 2), u = z(L(l), 2), d = L(u), f = (e) => {
						var t = Zo(), n = R(t), r = z(L(n));
						{
							let e = /* @__PURE__ */ N(() => W(E).theme.scheme ?? "light");
							$(r, {
								get value() {
									return W(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => ei(e)
							});
						}
						j(n);
						var i = z(n, 4);
						zr(i, 17, () => Object.entries(W(E).theme.alt.tokens.color), Fr, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(W(t), 1));
							let r = () => W(n)[0];
							var i = Ho(), a = L(i), o = z(a);
							{
								let e = /* @__PURE__ */ N(() => `Alternativ ${r()}`);
								Ti(o, {
									get value() {
										return W(E).theme.alt.tokens.color[r()];
									},
									get label() {
										return W(e);
									},
									onchange: (e) => $r(r(), e)
								});
							}
							j(i), V(() => J(a, `${{
								bg: "Bakgrunn",
								surface: "Flater",
								text: "Tekst",
								accent: "Aksent",
								"accent-text": "Tekst på aksent"
							}[r()] ?? r() ?? ""} `)), q(e, i);
						});
						var a = z(i, 2), s = L(a), c = z(s, 2);
						X(c, () => o.cross, !0), j(c), j(a), G("click", s, Yr), G("click", c, Zr), q(e, t);
					}, p = (e) => {
						var t = Qo(), n = R(t);
						Ne(2), G("click", n, Jr), q(e, t);
					};
					Y(d, (e) => {
						W(E).theme.alt ? e(f) : e(p, -1);
					}), j(u), j(l);
					var h = z(l, 4), g = z(L(h));
					{
						let e = /* @__PURE__ */ N(() => [...Wa.some(([, e]) => e === W(E).theme.tokens.font.heading) ? [] : [[W(E).theme.tokens.font.heading, "Egendefinert"]], ...Wa.map(([e, t]) => [t, e])]);
						$(g, {
							get value() {
								return W(E).theme.tokens.font.heading;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => Wr("heading", e)
						});
					}
					j(h);
					var _ = z(h, 2), v = z(L(_));
					{
						let e = /* @__PURE__ */ N(() => [...Wa.some(([, e]) => e === W(E).theme.tokens.font.body) ? [] : [[W(E).theme.tokens.font.body, "Egendefinert"]], ...Wa.map(([e, t]) => [t, e])]);
						$(v, {
							get value() {
								return W(E).theme.tokens.font.body;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => Wr("body", e)
						});
					}
					j(_);
					var y = z(_, 4), b = z(L(y));
					Z(b), j(y);
					var x = z(y, 2), S = z(L(x));
					Z(S), j(x);
					var ee = z(x, 4), te = z(L(ee)), ne = (e) => {
						var t = $o();
						V(() => ii(t, "src", W(E).site.icon)), q(e, t);
					};
					Y(te, (e) => {
						W(E).site.icon && e(ne);
					}), j(ee);
					var C = z(ee, 2), w = L(C), T = L(w), re = z(T);
					j(w);
					var ie = z(w, 2), ae = (e) => {
						var t = es(), n = R(t);
						X(n, () => o.pencil ?? "✎", !0), j(n);
						var r = z(n, 2);
						X(r, () => o.cross, !0), j(r), G("click", n, () => I(wn, W(E).site.icon, !0)), G("click", r, Dn), q(e, t);
					};
					Y(ie, (e) => {
						W(E).site.icon && e(ae);
					}), j(C), Ne(2), j(t), V(() => {
						Q(b, W(E).theme.tokens.radius.sm), Q(S, W(E).theme.tokens.radius.md), J(T, `${W(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), G("change", b, (e) => Gr("sm", e.target.value)), G("change", S, (e) => Gr("md", e.target.value)), G("change", re, Tn), q(e, t);
				}, f = (e) => {
					var t = as();
					let n;
					var r = z(L(t), 2), i = z(L(r), 2), a = L(i), o = z(a, 2);
					j(i), j(r);
					var s = z(r, 2), c = z(s, 2), l = z(L(c));
					j(c);
					var u = z(c, 2), d = z(u, 2), f = z(d, 2), p = z(f, 2), m = z(p, 2), h = z(L(m), 2), g = L(h), _ = z(g, 2), v = z(L(_));
					j(_), j(h), j(m);
					var y = z(m, 2), b = z(L(y), 2), x = L(b), ee = z(x, 2), te = z(ee, 2), ne = z(te, 2), C = z(ne, 2);
					j(b), j(y);
					var w = z(y, 2), T = (e) => {
						var t = is(), n = z(L(t), 2);
						zr(n, 21, () => W(Di), (e) => e.type, (e, t) => {
							var n = kr(), r = R(n), i = (e) => {
								var n = rs(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2);
								zr(a, 21, () => W(t).variants, (e) => e.label, (e, n) => {
									var r = ns(), i = L(r, !0);
									j(r), V(() => {
										ii(r, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(i, W(n).label);
									}), G("click", r, () => Oi(W(t), W(n).props)), q(e, r);
								}), j(a), j(n), V(() => J(i, W(t).label)), q(e, n);
							}, a = (e) => {
								var n = ns(), r = L(n, !0);
								j(n), V(() => {
									ii(n, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(r, W(t).label);
								}), G("click", n, () => Oi(W(t))), q(e, n);
							};
							Y(r, (e) => {
								W(t).variants?.length ? e(i) : e(a, -1);
							}), q(e, n);
						}), j(n), j(t), q(e, t);
					};
					Y(w, (e) => {
						W(Di).length && e(T);
					}), j(t), V(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(S) === "mobile" }), ii(t, "title", W(S) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => Ei("text")), G("click", o, () => Ei("text-box")), G("click", s, () => Ei("button")), G("change", l, Ni), G("click", u, () => Ei("video")), G("click", d, () => Ei("icon")), G("click", f, () => Ei("samling")), G("click", p, () => Ei("faq")), G("click", g, () => Ei("galleri")), G("change", v, Li), G("click", x, () => Ei("shape-line")), G("click", ee, () => Ei("shape-arrow")), G("click", te, () => Ei("shape-circle")), G("click", ne, () => Ei("shape-rect")), G("click", C, () => Ei("shape-triangle")), q(e, t);
				}, p = (e) => {
					var t = os(), n = z(L(t), 2), r = z(L(n)), i = L(r);
					j(r), j(n);
					var a = z(n, 2);
					Z(a);
					var o = z(a, 2), s = L(o);
					Z(s), Ne(), j(o), Ne(2), j(t), V(() => {
						J(i, `${W(b).size ?? ""} px`), Q(a, W(b).size), ri(s, W(b).snap !== !1);
					}), G("input", a, (e) => Ht("size", Number(e.target.value))), G("change", s, (e) => Ht("snap", e.target.checked)), q(e, t);
				}, h = (e) => {
					var t = ws(), n = L(t), a = (e) => {
						var t = ss(), n = R(t), i = L(n);
						j(n);
						var a = z(n, 2);
						r(a), V(() => J(i, `${Ke[W(O).type] ?? W(O).type ?? ""}-blokk`)), q(e, t);
					}, s = (e) => {
						var t = Ss(), n = z(R(t), 2), r = z(L(n));
						Z(r), j(n);
						var a = z(n, 6), s = L(a);
						Z(s), Ne(), j(a);
						var c = z(a, 2), l = (e) => {
							var t = cs(), n = R(t), r = z(L(n)), i = L(r);
							j(r), j(n);
							var a = z(n, 2);
							Z(a), V(() => {
								J(i, `${W(Xe).size ?? ""} px`), Q(a, W(Xe).size);
							}), G("input", a, (e) => Vt("size", Number(e.target.value))), q(e, t);
						};
						Y(c, (e) => {
							W(Xe) && e(l);
						});
						var u = z(c, 8);
						zr(u, 17, () => W(Qe), Fr, (e, t, n) => {
							var r = xs(), a = L(r), s = L(a);
							{
								let e = /* @__PURE__ */ N(() => i.map(([e, t]) => [e, t.label]));
								$(s, {
									get value() {
										return W(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return W(e);
									},
									onchange: (e) => xt(n, e)
								});
							}
							var c = z(s, 2), l = L(c);
							l.disabled = n === 0, X(l, () => o.up, !0), j(l);
							var u = z(l, 2);
							X(u, () => o.down, !0), j(u);
							var d = z(u, 2);
							X(d, () => o.cross, !0), j(d), j(c), j(a);
							var f = z(a, 2), p = (e) => {
								var r = ls(), i = R(r), a = z(L(i));
								{
									let e = /* @__PURE__ */ N(Dt);
									Ti(a, {
										get value() {
											return W(t).props.value;
										},
										get tokens() {
											return W(e);
										},
										label: "Lagets farge",
										onchange: (e) => lt(n, "value", e)
									});
								}
								j(i);
								var o = z(i, 2), s = z(L(o)), c = L(s);
								j(s), j(o);
								var l = z(o, 2);
								Z(l), V((e) => {
									J(c, `${e ?? ""}%`), Q(l, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", l, (e) => lt(n, "opacity", Number(e.target.value))), q(e, r);
							}, m = (e) => {
								let r = /* @__PURE__ */ N(() => ut(W(t))), i = /* @__PURE__ */ N(() => W(r).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
								var a = ms(), s = R(a), c = z(L(s));
								{
									let e = /* @__PURE__ */ N(() => W(r).kind ?? "linear");
									$(c, {
										get value() {
											return W(e);
										},
										options: [["linear", "Lineær"], ["radial", "Radiell (fra et punkt)"]],
										onchange: (e) => mt(n, e)
									});
								}
								j(s);
								var l = z(s, 2);
								zr(l, 17, () => W(r).stops, Fr, (e, t, a) => {
									var s = ds();
									let c;
									var l = L(s), u = z(l, 2);
									{
										let e = /* @__PURE__ */ N(Dt);
										Ti(u, {
											get value() {
												return W(t).color;
											},
											get tokens() {
												return W(e);
											},
											label: "Fargen",
											onchange: (e) => ht(n, a, { color: e })
										});
									}
									var d = z(u, 2);
									Z(d);
									var f = z(d, 2), p = L(f);
									j(f);
									var m = z(f, 2), h = (e) => {
										var t = us();
										X(t, () => o.cross, !0), j(t), G("click", t, () => _t(n, a)), q(e, t);
									};
									Y(m, (e) => {
										W(r).stops.length > 2 && e(h);
									}), j(s), V((e) => {
										c = Xr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
											dragging: W(yt)?.layer === n && W(yt).from === a,
											"drop-above": W(yt)?.layer === n && W(yt).insert === a,
											"drop-below": W(yt)?.layer === n && W(yt).insert === W(r).stops.length && a === W(r).stops.length - 1
										}), Q(d, W(t).share ?? 50), J(p, `${e ?? ""}%`);
									}, [() => W(i) > 0 ? Math.round(Math.max(0, Number(W(t).share) || 0) / W(i) * 100) : Math.round(100 / W(r).stops.length)]), G("pointerdown", l, (e) => bt(e, n, a)), G("input", d, (e) => ht(n, a, { share: Number(e.target.value) })), q(e, s);
								});
								var u = z(l, 2), d = z(u, 2), f = (e) => {
									var t = fs(), i = R(t), a = z(L(i)), o = L(a);
									j(a), j(i);
									var s = z(i, 2);
									Z(s);
									var c = z(s, 2), l = z(L(c)), u = L(l);
									j(l), j(c);
									var d = z(c, 2);
									Z(d), V((e, t) => {
										J(o, `${e ?? ""}%`), Q(s, W(r).x ?? .5), J(u, `${t ?? ""}%`), Q(d, W(r).y ?? .5);
									}, [() => Math.round((W(r).x ?? .5) * 100), () => Math.round((W(r).y ?? .5) * 100)]), G("input", s, (e) => ft(n, "x", Number(e.target.value))), G("input", d, (e) => ft(n, "y", Number(e.target.value))), q(e, t);
								}, p = (e) => {
									var t = ps(), i = R(t), a = z(L(i)), o = L(a);
									j(a), j(i);
									var s = z(i, 2);
									Z(s), V(() => {
										J(o, `${W(r).angle ?? ""}°`), Q(s, W(r).angle);
									}), G("input", s, (e) => ft(n, "angle", Number(e.target.value))), q(e, t);
								};
								Y(d, (e) => {
									(W(r).kind ?? "linear") === "radial" ? e(f) : e(p, -1);
								});
								var m = z(d, 2), h = z(L(m)), g = L(h);
								j(h), j(m);
								var _ = z(m, 2);
								Z(_);
								var v = z(_, 2), y = z(L(v));
								{
									let e = /* @__PURE__ */ N(() => W(r).animation ?? "none");
									$(y, {
										get value() {
											return W(e);
										},
										get options() {
											return pt[(W(r).kind ?? "linear") === "radial" ? "radial" : "linear"];
										},
										onchange: (e) => ft(n, "animation", e)
									});
								}
								j(v), V((e) => {
									J(g, `${e ?? ""}%`), Q(_, W(r).opacity ?? 1);
								}, [() => Math.round((W(r).opacity ?? 1) * 100)]), G("click", u, () => gt(n)), G("input", _, (e) => ft(n, "opacity", Number(e.target.value))), q(e, a);
							}, h = (e) => {
								var r = hs(), i = R(r), a = z(L(i));
								{
									let e = /* @__PURE__ */ N(Dt);
									Ti(a, {
										get value() {
											return W(t).props.color;
										},
										get tokens() {
											return W(e);
										},
										label: "Glødens farge",
										onchange: (e) => lt(n, "color", e)
									});
								}
								j(i);
								var o = z(i, 2), s = z(L(o)), c = L(s);
								j(s), j(o);
								var l = z(o, 2);
								Z(l);
								var u = z(l, 2), d = z(L(u)), f = L(d);
								j(d), j(u);
								var p = z(u, 2);
								Z(p);
								var m = z(p, 2), h = z(L(m)), g = L(h);
								j(h), j(m);
								var _ = z(m, 2);
								Z(_);
								var v = z(_, 2), y = z(L(v)), b = L(y);
								j(y), j(v);
								var x = z(v, 2);
								Z(x), V((e, n, r, i) => {
									J(c, `${e ?? ""}%`), Q(l, W(t).props.x), J(f, `${n ?? ""}%`), Q(p, W(t).props.y), J(g, `${r ?? ""}%`), Q(_, W(t).props.radius), J(b, `${i ?? ""}%`), Q(x, W(t).props.opacity);
								}, [
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", l, (e) => lt(n, "x", Number(e.target.value))), G("input", p, (e) => lt(n, "y", Number(e.target.value))), G("input", _, (e) => lt(n, "radius", Number(e.target.value))), G("input", x, (e) => lt(n, "opacity", Number(e.target.value))), q(e, r);
							}, g = (e) => {
								var r = gs(), i = R(r), a = z(L(i)), o = L(a);
								j(a), j(i);
								var s = z(i, 2);
								Z(s), V((e) => {
									J(o, `${e ?? ""}%`), Q(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => lt(n, "opacity", Number(e.target.value))), q(e, r);
							}, _ = (e) => {
								var r = vs(), i = R(r), a = L(i), o = z(a);
								j(i);
								var s = z(i, 2), c = z(L(s));
								{
									let e = /* @__PURE__ */ N(() => W(t).props.fit ?? "cover");
									$(c, {
										get value() {
											return W(e);
										},
										options: [
											["cover", "Fyll (beskjæres)"],
											["contain", "Vis hele"],
											["repeat", "Gjenta (mønster)"]
										],
										onchange: (e) => lt(n, "fit", e)
									});
								}
								j(s);
								var l = z(s, 2), u = (e) => {
									var r = _s(), i = R(r), a = z(L(i)), o = L(a);
									j(a), j(i);
									var s = z(i, 2);
									Z(s);
									var c = z(s, 2), l = z(L(c)), u = L(l);
									j(l), j(c);
									var d = z(c, 2);
									Z(d), V((e, n) => {
										J(o, `${e ?? ""}%`), Q(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), Q(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => lt(n, "x", Number(e.target.value))), G("input", d, (e) => lt(n, "y", Number(e.target.value))), q(e, r);
								};
								Y(l, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = z(l, 2), f = z(L(d)), p = L(f);
								j(f), j(d);
								var m = z(d, 2);
								Z(m);
								var h = z(m, 2), g = z(L(h)), _ = L(g);
								j(g), j(h);
								var v = z(h, 2);
								Z(v), V((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), J(p, `${W(t).props.blur ?? 0 ?? ""} px`), Q(m, W(t).props.blur ?? 0), J(_, `${e ?? ""}%`), Q(v, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => St(n, e)), G("input", m, (e) => lt(n, "blur", Number(e.target.value))), G("input", v, (e) => lt(n, "opacity", Number(e.target.value))), q(e, r);
							}, v = (e) => {
								var r = bs(), i = R(r), a = z(L(i));
								j(i);
								var s = z(i, 2);
								zr(s, 17, () => W(t).props.images ?? [], Fr, (e, r, i) => {
									var a = ys(), s = R(a), c = L(s), l = z(c, 2), u = L(l);
									u.disabled = i === 0, X(u, () => o.up, !0), j(u);
									var d = z(u, 2);
									X(d, () => o.down, !0), j(d);
									var f = z(d, 2);
									X(f, () => o.cross, !0), j(f), j(l), j(s);
									var p = z(s, 2), m = z(L(p)), h = L(m);
									j(m), j(p);
									var g = z(p, 2);
									Z(g);
									var _ = z(g, 2), v = z(L(_)), y = L(v);
									j(v), j(_);
									var b = z(_, 2);
									Z(b), V((e, n) => {
										ii(c, "src", W(r).src), d.disabled = i === W(t).props.images.length - 1, J(h, `${e ?? ""}%`), Q(g, W(r).x ?? .5), J(y, `${n ?? ""}%`), Q(b, W(r).y ?? .5);
									}, [() => Math.round((W(r).x ?? .5) * 100), () => Math.round((W(r).y ?? .5) * 100)]), G("click", u, () => wt(n, i, -1)), G("click", d, () => wt(n, i, 1)), G("click", f, () => Tt(n, i)), G("input", g, (e) => Et(n, i, "x", Number(e.target.value))), G("input", b, (e) => Et(n, i, "y", Number(e.target.value))), q(e, a);
								});
								var c = z(s, 2), l = z(L(c));
								{
									let e = /* @__PURE__ */ N(() => W(t).props.fit ?? "cover");
									$(l, {
										get value() {
											return W(e);
										},
										options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
										onchange: (e) => lt(n, "fit", e)
									});
								}
								j(c);
								var u = z(c, 2), d = z(L(u));
								Z(d), j(u);
								var f = z(u, 2), p = z(L(f)), m = L(p);
								j(p), j(f);
								var h = z(f, 2);
								Z(h);
								var g = z(h, 2), _ = z(L(g)), v = L(_);
								j(_), j(g);
								var y = z(g, 2);
								Z(y);
								var b = z(y, 2), x = z(L(b)), S = L(x);
								j(x), j(b);
								var ee = z(b, 2);
								Z(ee), Ne(2), V((e, n) => {
									Q(d, W(t).props.interval ?? 6), J(m, `${e ?? ""} s`), Q(h, W(t).props.fade ?? 1.5), J(v, `${W(t).props.blur ?? 0 ?? ""} px`), Q(y, W(t).props.blur ?? 0), J(S, `${n ?? ""}%`), Q(ee, W(t).props.opacity ?? 1);
								}, [() => (W(t).props.fade ?? 1.5).toFixed(1), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", a, (e) => Ct(n, e)), G("change", d, (e) => lt(n, "interval", Number(e.target.value))), G("input", h, (e) => lt(n, "fade", Number(e.target.value))), G("input", y, (e) => lt(n, "blur", Number(e.target.value))), G("input", ee, (e) => lt(n, "opacity", Number(e.target.value))), q(e, r);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(m, 1) : W(t).type === "glow" ? e(h, 2) : W(t).type === "grain" ? e(g, 3) : W(t).type === "image" ? e(_, 4) : W(t).type === "bildegalleri" && e(v, 5);
							}), j(r), V(() => u.disabled = n === W(Qe).length - 1), G("click", l, () => ct(n, -1)), G("click", u, () => ct(n, 1)), G("click", d, () => st(n)), q(e, r);
						});
						var d = z(u, 2), f = z(L(d));
						{
							let e = /* @__PURE__ */ N(() => i.map(([e, t]) => [e, t.label]));
							$(f, {
								get value() {
									return W(it);
								},
								get options() {
									return W(e);
								},
								onchange: (e) => I(it, e, !0)
							});
						}
						j(d);
						var p = z(d, 2), m = z(p, 4), h = z(L(m));
						{
							let e = /* @__PURE__ */ N(() => Ot(W($e)) ? W($e).type : "");
							$(h, {
								get value() {
									return W(e);
								},
								get options() {
									return kt;
								},
								onchange: (e) => Ft(e || null)
							});
						}
						j(m);
						var g = z(m, 2), _ = (e) => {
							var t = po(), n = R(t), r = z(L(n));
							Z(r), j(n);
							var i = z(n, 2), a = z(L(i));
							Z(a), j(i), V(() => {
								Q(r, W($e).props.duration), Q(a, W($e).props.delay);
							}), G("change", r, (e) => Lt("duration", Number(e.target.value))), G("change", a, (e) => Lt("delay", Number(e.target.value))), q(e, t);
						}, v = /* @__PURE__ */ N(() => Ot(W($e)));
						Y(g, (e) => {
							W(v) && e(_);
						});
						var y = z(g, 2), b = z(L(y));
						{
							let e = /* @__PURE__ */ N(() => W(et)?.type ?? (W($e) && !Ot(W($e)) ? W($e).type : ""));
							$(b, {
								get value() {
									return W(e);
								},
								get options() {
									return At;
								},
								onchange: (e) => It(e || null)
							});
						}
						j(y), V(() => {
							Q(r, W(Ze)), ri(s, W(Xe) !== null);
						}), G("change", r, (e) => Rt(e.target.value)), G("change", s, (e) => Bt(e.target.checked)), G("click", p, () => ot(W(it))), q(e, t);
					}, c = (e) => {
						q(e, Cs());
					};
					Y(n, (e) => {
						W(O) ? e(a) : W(Ye) ? e(s, 1) : e(c, -1);
					}), j(t), q(e, t);
				}, g = (e) => {
					var t = Ts(), n = z(L(t), 2), r = L(n);
					Z(r), Ne(), j(n);
					var i = z(n, 4);
					at(i), ii(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = z(i, 4), o = z(L(a));
					{
						let e = /* @__PURE__ */ N(() => W(E).footer?.align ?? "center");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => K("footer", (t) => {
								t.align = e;
							})
						});
					}
					j(a), Ne(2), j(t), V((e) => {
						ri(r, e), Q(i, W(E).footer?.text ?? "");
					}, [() => !!W(E).footer?.show]), G("change", r, (e) => K("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", i, (e) => K("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), q(e, t);
				}, _ = (e) => {
					var t = js(), n = z(L(t), 2), r = (e) => {
						var t = Es(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(Wn) ?? ""), t = /* @__PURE__ */ N(() => [["", "Velg …"], ...W(H).map((e) => [e, W(Un)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => I(Wn, e || null, !0)
							});
						}
						j(t), q(e, t);
					};
					Y(n, (e) => {
						W(H).length && e(r);
					});
					var i = z(n, 2), a = (e) => {
						let t = /* @__PURE__ */ N(() => W(Un)[W(Wn)]);
						var n = As(), r = R(n), i = L(r), a = z(i, 2);
						X(a, () => o.cross, !0), j(a), j(r);
						var s = z(r, 2);
						zr(s, 19, () => W(t).entries, (e) => e.id, (e, n, r) => {
							var i = Os(), a = L(i), s = L(a);
							j(a);
							var c = z(a, 2), l = L(c), u = L(l);
							Z(u);
							var d = z(u, 2), f = L(d);
							X(f, () => o.up, !0), j(f);
							var p = z(f, 2);
							X(p, () => o.down, !0), j(p);
							var m = z(p, 2);
							X(m, () => o.cross, !0), j(m), j(d), j(l);
							var h = z(l, 2), g = z(L(h));
							Z(g), j(h);
							var _ = z(h, 2);
							at(_);
							var v = z(_, 2), y = z(L(v));
							Z(y), j(v);
							var b = z(v, 2), x = L(b), S = L(x), ee = z(S);
							j(x);
							var te = z(x, 2), ne = (e) => {
								var t = Ds(), r = R(t), i = z(r, 2);
								X(i, () => o.cross, !0), j(i), V(() => ii(r, "src", W(n).image)), G("click", i, () => tr(W(Wn), W(n).id, "image", "")), q(e, t);
							};
							Y(te, (e) => {
								W(n).image && e(ne);
							}), j(b), j(c), j(i), V((e) => {
								J(s, `${e ?? ""}${W(n).date ? ` · ${W(n).date}` : ""}`), Q(u, W(n).title), f.disabled = W(r) === 0, p.disabled = W(r) === W(t).entries.length - 1, Q(g, W(n).date ?? ""), Q(_, W(n).text ?? ""), Q(y, W(n).href ?? ""), J(S, `${W(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => W(n).title.replace(/<[^>]*>/g, "")]), G("change", u, (e) => tr(W(Wn), W(n).id, "title", e.target.value || "Uten tittel")), G("click", f, () => nr(W(Wn), W(r), -1)), G("click", p, () => nr(W(Wn), W(r), 1)), G("click", m, () => rr(W(Wn), W(n).id)), G("change", g, (e) => tr(W(Wn), W(n).id, "date", e.target.value)), G("change", _, (e) => tr(W(Wn), W(n).id, "text", e.target.value)), G("change", y, (e) => tr(W(Wn), W(n).id, "href", e.target.value)), G("change", ee, (e) => ir(W(Wn), W(n).id, e)), q(e, i);
						});
						var c = z(s, 2), l = (e) => {
							q(e, ks());
						};
						Y(c, (e) => {
							W(t).entries.length || e(l);
						}), Ne(2), G("click", i, () => er(W(Wn))), G("click", a, () => $n(W(Wn))), q(e, n);
					};
					Y(i, (e) => {
						W(Wn) && W(Un)[W(Wn)] && e(a);
					});
					var s = z(i, 2), c = z(L(s));
					Z(c), j(s);
					var l = z(s, 2);
					$(z(L(l)), {
						get value() {
							return W(Gn);
						},
						get options() {
							return Kn;
						},
						onchange: (e) => I(Gn, e, !0)
					}), j(l);
					var u = z(l, 2);
					j(t), V((e) => u.disabled = e, [() => !W(U).trim()]), G("keydown", c, (e) => e.key === "Enter" && Qn()), ci(c, () => W(U), (e) => I(U, e)), G("click", u, Qn), q(e, t);
				}, v = (e) => {
					var t = Bs(), n = z(L(t), 2), r = (e) => {
						q(e, Ms());
					}, i = /* @__PURE__ */ N(() => !hr().length);
					Y(n, (e) => {
						W(i) && e(r);
					});
					var a = z(n, 2);
					zr(a, 16, hr, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ N(() => lr[t]), r = /* @__PURE__ */ N(() => (W(cr)?.enabled ?? []).includes(t));
						var i = Fs();
						let a;
						var s = L(i), c = L(s), l = L(c, !0);
						j(c);
						var u = z(c, 2), d = (e) => {
							var t = Ns(), r = L(t);
							j(t), V(() => J(r, `v${W(n).version ?? ""}`)), q(e, t);
						};
						Y(u, (e) => {
							W(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						Z(m);
						var h = z(m);
						j(p);
						var g = z(p, 2);
						X(g, () => o.cross, !0), j(g), j(f), j(s);
						var _ = z(s, 2), v = (e) => {
							var t = Ps(), r = L(t, !0);
							j(t), V((e) => J(r, e), [() => W(n).errors.join("; ")]), q(e, t);
						}, y = (e) => {
							var t = Ps(), r = L(t);
							j(t), V(() => J(r, `Krever motorversjon ${W(n).requiresEngine ?? ""} (denne siden kjører ${W(ur) ?? ""}); pluginen hoppes over ved lasting.`)), q(e, t);
						}, b = (e) => {
							var t = Ps(), r = L(t);
							j(t), V((e) => J(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(W(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(W(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), q(e, t);
						};
						Y(_, (e) => {
							W(n)?.errors?.length ? e(v) : W(n) && !W(n).satisfied ? e(y, 1) : W(n)?.csp && e(b, 2);
						}), j(i), V((e) => {
							a = Xr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": W(n)?.errors?.length }), J(l, W(n)?.name ?? t), ii(p, "title", W(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, W(r)), m.disabled = e, J(h, ` ${W(r) ? "På" : "Av"}`);
						}, [() => !!W(n)?.errors?.length]), G("change", m, (e) => Cr(t, e.target.checked)), G("click", g, () => Tr(t)), q(e, i);
					});
					var s = z(a, 2), c = (e) => {
						var t = Ls();
						zr(z(R(t), 4), 16, () => W(pr), (e) => e, (e, t) => {
							var n = Is(), r = L(n), i = L(r), a = L(i, !0);
							j(i);
							var s = z(i, 2), c = (e) => {
								var n = Ns(), r = L(n);
								j(n), V(() => J(r, `v${lr[t].version ?? ""}`)), q(e, n);
							};
							Y(s, (e) => {
								lr[t]?.version && e(c);
							});
							var l = z(s, 2), u = L(l);
							X(u, () => o.right, !0), j(u), j(l), j(r), j(n), V(() => J(a, lr[t]?.name ?? t)), G("click", u, () => Dr(t)), q(e, n);
						}), q(e, t);
					};
					Y(s, (e) => {
						W(pr).length && e(c);
					});
					var l = z(s, 2), u = (e) => {
						var t = kr(), n = R(t), r = (e) => {
							q(e, Rs());
						};
						Y(n, (e) => {
							W(pr).length || e(r);
						}), q(e, t);
					}, d = (e) => {
						var t = zs(), n = z(R(t), 2);
						Z(n);
						var r = z(n, 2), i = z(r, 2), a = (e) => {
							var t = Ps(), n = L(t, !0);
							j(t), V(() => J(n, W(fr))), q(e, t);
						};
						Y(i, (e) => {
							W(fr) && e(a);
						}), V((e) => r.disabled = e, [() => !W(dr).trim()]), G("keydown", n, (e) => e.key === "Enter" && Er()), ci(n, () => W(dr), (e) => I(dr, e)), G("click", r, Er), q(e, t);
					};
					Y(l, (e) => {
						W(mr) === "ok" ? e(u) : e(d, -1);
					}), j(t), q(e, t);
				}, x = (e) => {
					var t = Gs(), n = z(L(t), 2), r = (e) => {
						q(e, Vs());
					}, i = (e) => {
						var t = ko(), n = R(t), r = (e) => {
							var t = Hs(), n = L(t, !0);
							j(t), V(() => J(n, W(Jt))), q(e, t);
						};
						Y(n, (e) => {
							W(Jt) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = Ws(), n = R(t);
							zr(z(n, 2), 19, () => W(qt), (e) => e.sha, (e, t, n) => {
								var r = Us();
								let i;
								var a = L(r), o = L(a, !0);
								j(a);
								var s = z(a, 2), c = L(s);
								j(s), j(r), V((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), ii(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${Zt.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), V(() => {
								n.disabled = W(Yt) || !W(y)?.allowed, ii(n, "title", W(y)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, $t), q(e, t);
						};
						Y(i, (e) => {
							W(qt).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(qt) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(s, (e) => {
					W(Ee) === "Sider" ? e(c) : W(Ee) === "Nav" ? e(l, 1) : W(Ee) === "Tema" ? e(u, 2) : W(Ee) === "Blokker" ? e(f, 3) : W(Ee) === "Grid" ? e(p, 4) : W(Ee) === "Egenskaper" ? e(h, 5) : W(Ee) === "Footer" ? e(g, 6) : W(Ee) === "Samlinger" ? e(_, 7) : W(Ee) === "Plugins" ? e(v, 8) : W(Ee) === "Historikk" && e(x, 9);
				}), j(t), V(() => J(a, W(Ee))), q(e, t);
			};
			Y(a, (e) => {
				W(Ee) && e(s);
			}), q(e, t);
		};
		Y(n, (e) => {
			W(x) && e(a);
		});
		var s = z(n, 2);
		let c;
		var l = L(s);
		fi(l, (e) => I(v, e), () => W(v)), j(s), j(t), V(() => {
			c = Xr(s, 1, "frame-wrap svelte-1n46o8q", null, c, { mobile: W(S) === "mobile" }), ii(l, "src", `/?page=${W(d)}&preview=1`);
		}), br("load", l, sn), vr(l), q(e, t);
	}, Ca = (e) => {
		q(e, Ys());
	};
	Y(xa, (e) => {
		W(u) ? e(Sa) : e(Ca, -1);
	});
	var wa = z(xa, 2), Ta = (e) => {
		ia(e, {
			get image() {
				return W(wn);
			},
			onapply: En,
			oncancel: () => I(wn, null)
		});
	};
	Y(wa, (e) => {
		W(wn) && e(Ta);
	});
	var Ea = z(wa, 2), Da = (e) => {
		var t = Zs(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		zr(a, 16, () => W(_e).lines, (e) => e, (e, t) => {
			var n = Xs(), r = L(n, !0);
			j(n), V(() => J(r, t)), q(e, n);
		});
		var o = z(a, 2), s = L(o), c = L(s, !0);
		j(s);
		var l = z(s, 2), u = L(l, !0);
		j(l), j(o), j(n), j(t), V(() => {
			J(i, W(_e).title), J(c, W(_e).cancelLabel), J(u, W(_e).okLabel);
		}), G("click", s, () => ye(!1)), G("click", l, () => ye(!0)), q(e, t);
	};
	Y(Ea, (e) => {
		W(_e) && e(Da);
	});
	var Oa = z(Ea, 2), ka = (e) => {
		var t = Qs(), n = L(t), r = z(L(n), 4), i = z(L(r));
		Z(i), j(r);
		var a = z(r, 2);
		Ti(z(L(a)), {
			get value() {
				return W(Se);
			},
			label: "Aksentfarge",
			onchange: (e) => I(Se, e, !0)
		}), j(a);
		var o = z(a, 2);
		Ti(z(L(o)), {
			get value() {
				return W(Ce);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => I(Ce, e, !0)
		}), j(o);
		var s = z(o, 4), c = L(s), l = z(c, 2);
		j(s), j(n), j(t), V((e) => l.disabled = e, [() => !W(xe).trim()]), G("keydown", i, (e) => e.key === "Enter" && Te()), ci(i, () => W(xe), (e) => I(xe, e)), G("click", c, we), G("click", l, Te), q(e, t);
	};
	Y(Oa, (e) => {
		W(be) && e(ka);
	});
	var Aa = z(Oa, 2), ja = (e) => {
		var t = $s();
		let n;
		var r = L(t), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		j(t), V(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(h) === "ok",
				error: W(h) === "error"
			}), J(i, W(p));
		}), G("click", a, () => _("")), q(e, t);
	};
	Y(Aa, (e) => {
		W(p) && e(ja);
	}), j(Yi);
	var Ma = z(Yi, 2), Fa = (e) => {
		var t = ec(), n = L(t), i = L(n), a = L(i);
		j(i);
		var s = z(i, 2);
		X(s, () => o.cross, !0), j(s), j(n);
		var c = z(n, 2), l = L(c);
		r(l), j(c), j(t), V(() => {
			Qr(t, `left: ${W(A).left ?? ""}px; top: ${W(A).top ?? ""}px`), J(a, `${Ke[W(O).type] ?? W(O).type ?? ""}-blokk`);
		}), G("click", s, () => I(A, null)), q(e, t);
	};
	Y(Ma, (e) => {
		W(A) && W(O) && e(Fa);
	}), V(() => ta = Xr(ea, 1, "topbar svelte-1n46o8q", null, ta, { hidden: !W(x) })), q(e, Ji), We();
}
xr([
	"input",
	"change",
	"click",
	"keydown",
	"pointerdown"
]);
//#endregion
//#region src/main.js
var rc = Ar(nc, { target: document.getElementById("urd-admin") });
//#endregion
export { rc as default };
