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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, E = 65536, ee = 1 << 21, te = 1 << 22, ne = 1 << 23, re = Symbol("$state"), D = Symbol("legacy props"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
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
var O = {}, Ce = Symbol("uninitialized"), we = "http://www.w3.org/1999/xhtml", k = "http://www.w3.org/2000/svg", Te = "http://www.w3.org/1998/Math/MathML";
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
function Ae(e) {
	if (e === null) throw De(), O;
	return j = e;
}
function je() {
	return Ae(/* @__PURE__ */ un(j));
}
function M(e) {
	if (A) {
		if (/* @__PURE__ */ un(j) !== null) throw De(), O;
		j = e;
	}
}
function N(e = 1) {
	if (A) {
		for (var t = e, n = j; t--;) n = /* @__PURE__ */ un(n);
		j = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = j;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ un(n);
		e && n.remove(), n = i;
	}
}
function Ne(e) {
	if (!e || e.nodeType !== 8) throw De(), O;
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
		r: U,
		l: null
	};
}
function Ue(e) {
	var t = Be, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
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
	if (Ge.length === 0 && !At) {
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
	var t = U;
	if (t === null) return H.f |= ne, e;
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
	A && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var at = !1;
function ot() {
	at || (at = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function st(e) {
	var t = H, n = U;
	Wn(null), Gn(null);
	try {
		return e();
	} finally {
		Wn(t), Gn(n);
	}
}
function ct(e, t, n, r = n) {
	e.addEventListener(t, () => st(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), ot();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function lt(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		vn() && (W(n), Tn(() => (t === 0 && (r = fr(() => e(() => $t(n)))), t += 1, () => {
			qe(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
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
	#h = lt(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (A) {
				let e = this.#t;
				je();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ut), A && (this.#e = j);
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
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), qe(() => {
			var e = this.#c = document.createDocumentFragment(), t = cn();
			e.append(t), this.#a = this.#x(() => Dn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#b(F));
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
			} else this.#b(F);
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
		var t = U, n = H, r = Be;
		Gn(this.#i), Wn(this.#i), Ve(this.#i.ctx);
		try {
			return It.ensure(), e();
		} catch (e) {
			return Ye(e), null;
		} finally {
			Gn(t), Wn(n), Ve(r);
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
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, qe(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
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
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), A && (Ae(this.#t), N(), Ae(Me()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Oe();
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
				Xe(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Dn(() => {
						var t = U;
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
	var s = U, c = mt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
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
	var e = U, t = H, n = Be, r = F;
	return function(i = !0) {
		Gn(e), Wn(t), Ve(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	Gn(null), Wn(null), Ve(null), e && F?.deactivate();
}
function gt() {
	var e = U, t = e.b, n = F, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | g;
	return U !== null && (U.f |= C), {
		ctx: Be,
		deps: null,
		effects: null,
		equals: Pe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Ce,
		wv: 0,
		parent: U,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = U;
	r === null && fe();
	var i = void 0, a = Yt(Ce), o = !H, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(ht);
		} catch (e) {
			n.reject(e), ht();
		}
		var c = F;
		if (o) {
			if (t.f & 32768) var l = gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(vt);
			else for (let e of s.values()) e.reject(vt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= ne, Zt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
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
function P(e) {
	let t = /* @__PURE__ */ _t(e);
	return qn(t), t;
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
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function St(e) {
	var t, n = U, r = e.parent;
	if (!Vn && r !== null && e.v !== Ce && r.f & 24576) return Ee(), e.v;
	Gn(r);
	try {
		e.f &= ~E, xt(e), t = ar(e);
	} finally {
		Gn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = nr(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : (F.capture(e, t, !0), Dt?.capture(e, t, !0)), e.deps === null))) {
		Qe(e, h);
		return;
	}
	Vn || (Ot === null ? $e(e) : (vn() || F?.is_fork) && Ot.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), sr(t, 0), kn(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && cr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, F = null, Dt = null, Ot = null, kt = null, At = !1, jt = !1, Mt = null, Nt = null, Pt = 0, Ft = 1, It = class e {
	id = Ft++;
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
		Et === null ? Et = this : (Et.#n = this, this.#t = Et), Et = this;
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
		this.#e = !0, Pt++ > 1e3 && (this.#x(), Rt());
		for (let e of this.#u) this.#d.delete(e), Qe(e, g), this.schedule(e);
		for (let e of this.#d) Qe(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Mt = [], r = [], i = Nt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Gt(e), this.#h() || this.discard(), t;
		}
		if (F = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Mt = null, Nt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
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
		this.#r.clear(), Dt = this, Bt(r), Bt(n), Dt = null, this.#s?.resolve();
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), Qe(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), F = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) tt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== Ce && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Ot?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		F = this;
	}
	deactivate() {
		F = null, Ot = null;
	}
	flush() {
		try {
			jt = !0, F = this, this.#g();
		} finally {
			Pt = 0, kt = null, Mt = null, Nt = null, jt = !1, F = null, Ot = null, qt.clear();
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
		if (F === null) {
			let t = F = new e();
			!jt && !At && qe(() => {
				t.#e || t.flush();
			});
		}
		return F;
	}
	apply() {
		Ot = null;
	}
	schedule(e) {
		if (kt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Mt !== null && t === U && (H === null || !(H.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Et = e : t.#t = e, this.linked = !1;
		}
	}
};
function Lt(e) {
	var t = At;
	At = !0;
	try {
		var n;
		for (e && (F !== null && !F.is_fork && F.flush(), n = e());;) {
			if (Je(), F === null) return n;
			F.flush();
		}
	} finally {
		At = t;
	}
}
function Rt() {
	try {
		_e();
	} catch (e) {
		Xe(e, kt);
	}
}
var zt = null;
function Bt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && rr(r) && (zt = /* @__PURE__ */ new Set(), cr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), zt?.size > 0)) {
				qt.clear();
				for (let e of zt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) zt.has(n) && (zt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || cr(n);
					}
				}
				zt.clear();
			}
		}
		zt = null;
	}
}
function Vt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Vt(i, t, n, r) : e & 4194320 && !(e & 2048) && Ht(i, t, r) && (Qe(i, g), Ut(i));
	}
}
function Ht(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Ht(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Ut(e) {
	F.schedule(e);
}
function Wt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), Qe(e, h);
		for (var n = e.first; n !== null;) Wt(n, t), n = n.next;
	}
}
function Gt(e) {
	Qe(e, h);
	for (var t = e.first; t !== null;) Gt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Kt = /* @__PURE__ */ new Set(), qt = /* @__PURE__ */ new Map(), Jt = !1;
function Yt(e, t) {
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
function I(e, t) {
	let n = Yt(e, t);
	return qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Ie), r;
}
function L(e, t, n = !1) {
	return H !== null && (!Un || H.f & 131072) && We() && H.f & 4325394 && (Kn === null || !Kn.has(e)) && xe(), Zt(e, n ? tn(t) : t, Nt);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Vn ? t : e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), Ot === null && $e(t);
		}
		e.wv = nr(), en(e, g, n), We() && U !== null && U.f & 1024 && !(U.f & 96) && (Xn === null ? Zn([e]) : Xn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && Qe(e, _);
		let t;
		try {
			t = rr(e);
		} catch {
			t = !0;
		}
		t && cr(e);
	}
	Kt.clear();
}
function $t(e) {
	L(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = We(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && Qe(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				Ot?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= E), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && zt !== null && zt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = er, f = (e) => {
		if (er === d) return e();
		var t = H, n = er;
		Wn(null), tr(d);
		var r = e();
		return Wn(t), tr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ye();
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
					let e = f(() => /* @__PURE__ */ I(Ce, u));
					r.set(t, e), $t(o);
				}
			} else L(n, Ce), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(tn(s ? e[n] : Ce), u)), r.set(n, o)), o !== void 0) {
				var c = W(o);
				return c === Ce ? void 0 : c;
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
				if (a !== void 0 && o !== Ce) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== Ce || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? tn(e[t]) : Ce, u)), r.set(t, n)), W(n) === Ce) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(Ce, u)), r.set(d + "", p)) : L(p, Ce);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== Ce;
				var m = f(() => tn(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			W(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== Ce;
			});
			for (var [n, i] of r) i.v !== Ce && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			be();
		}
	});
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, on = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function cn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
function R(e, t) {
	if (!A) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(j);
	if (n === null) n = j.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), Ae(r), r;
	}
	return t && mn(n), Ae(n), n;
}
function z(e, t = !1) {
	if (!A) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (j?.nodeType !== 3) {
			var r = cn();
			return j?.before(r), Ae(r), r;
		}
		mn(j);
	}
	return j;
}
function B(e, t = 1, n = !1) {
	let r = A ? j : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!A) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), Ae(a), a;
		}
		mn(r);
	}
	return Ae(r), r;
}
function dn(e) {
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
	F?.register_created_effect(r);
	var i = r;
	if (e & 4) Mt === null ? It.ensure().schedule(r) : Mt.push(r);
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
	return Qe(t, h), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = U.f;
	if (!H && t & 32 && Be !== null && !Be.i) {
		var n = Be;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | w, e);
}
function Sn(e) {
	It.ensure();
	let t = _n(64 | C, e);
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
	return _n(te | C, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(W));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | C, e);
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
		e !== null && st(() => {
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
		var n = e === t ? null : /* @__PURE__ */ un(e);
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
		e.f ^= v, e.f & 1024 || (Qe(e, g), It.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ un(n);
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
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (rr(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && Ot === null && Qe(e, h);
	}
	return !1;
}
function ir(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Kn !== null && Kn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ir(a, t, !1) : t === a && (n ? Qe(a, g) : a.f & 1024 && Qe(a, _), Ut(a));
	}
}
function ar(e) {
	var t = Jn, n = Yn, r = Xn, i = H, a = Kn, o = Be, s = Un, c = er, l = e.f;
	Jn = null, Yn = 0, Xn = null, H = l & 96 ? null : e, Kn = null, Ve(e.ctx), Un = !1, er = ++$n, e.ac !== null && (st(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= ee;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (Jn !== null) {
			var m;
			if (p || sr(e, Yn), f !== null && Yn > 0) for (f.length = Yn + Jn.length, m = 0; m < Jn.length; m++) f[Yn + m] = Jn[m];
			else e.deps = f = Jn;
			if (vn() && e.f & 512) for (m = Yn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Yn < f.length && (sr(e, Yn), f.length = Yn);
		if (We() && Xn !== null && !Un && f !== null && !(e.f & 6146)) for (m = 0; m < Xn.length; m++) ir(Xn[m], e);
		if (i !== null && i !== e) {
			if ($n++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = $n;
			if (t !== null) for (let e of t) e.rv = $n;
			Xn !== null && (r === null ? r = Xn : r.push(...Xn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Ye(e);
	} finally {
		e.f ^= ee, Jn = t, Yn = n, Xn = r, H = i, Kn = a, Ve(o), Un = s, er = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== Ce && $e(s), s.ac !== null && st(() => {
			s.ac.abort(ue), s.ac = null;
		}), wt(s), sr(s, 0);
	}
}
function sr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) or(e, n[r]);
}
function cr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Qe(e, h);
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
	await Promise.resolve(), Lt();
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
	if (Vn && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || dr(a)) && (o = St(a)), qt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Un && H !== null && (Bn || (H.f & 512) != 0), c = (a.f & b) === 0;
		rr(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), ur(a));
	}
	if (Ot?.has(e)) return Ot.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ur(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), ur(t));
}
function dr(e) {
	if (e.v === Ce) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && dr(t)) return !0;
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
	if (!A) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function yr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Cr.call(t, e), !e.cancelBubble) return st(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? qe(() => {
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
		if (A) return Dr(j, null), j;
		i === void 0 && (i = Er(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			Dr(o, s);
		} else Dr(t, t);
		return t;
	};
}
function Or(e = "") {
	if (!A) {
		var t = cn(e + "");
		return Dr(t, t), t;
	}
	var n = j;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), Ae(n)), Dr(n, n), n;
}
function kr() {
	if (A) return Dr(j, null), j;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), Dr(t, n), e;
}
function q(e, t) {
	if (A) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = j), je();
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
	sn();
	var l = void 0, u = Sn(() => {
		var s = n ?? t.appendChild(cn());
		dt(s, { pending: () => {} }, (t) => {
			He({});
			var n = Be;
			if (o && (n.c = o), a && (i.$$events = a), A && Dr(t, null), l = e(t, i) || {}, A && (U.nodes.end = j, j === null || j.nodeType !== 8 || j.data !== "]")) throw De(), O;
			Ue();
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
						Rn(r, t), t.append(cn()), this.#n.set(e, {
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
		var n = F, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = cn();
			i.append(a), this.#n.set(e, {
				effect: Dn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, Dn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else A && (this.anchor = j), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	A && (r = j, je());
	var i = new Pr(e), a = n ? S : 0;
	function o(e, t) {
		if (A) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				Ae(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
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
			dn(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= T, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var Rr;
function zr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? Ae(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	A && je();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Vr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Ur(d, null, c)) : In(d) : Pn(d, () => {
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
			A && Ne(c) === "[!" != (e === 0) && (c = Me(), Ae(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = fn(), y = 0; y < e; y += 1) {
				A && j.nodeType === 8 && j.data === "]" && (c = j, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Hr(l, h ? c : Rr ??= cn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(Rr ??= cn())), d.f |= T)), e > r.size && pe("", "", ""), A && e > 0 && Ae(Me()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && ke(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, A && (c = j);
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
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Ur(_, null, n);
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
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ur(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Wr(e, S.prev, C.next), Wr(e, d, S), Wr(e, C, b), l = b, d = C, --v, p = [], m = [];
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
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Br(l.next);
		var E = w.length;
		if (E > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.fix();
			}
			Ir(e, w, ee);
		}
	}
	o && qe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Hr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
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
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Wr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Gr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		A && (o = Ae(/* @__PURE__ */ ln(c)));
	}
	V(() => {
		var e = U;
		if (s === (s = t() ?? "")) {
			A && je();
			return;
		}
		if (n && !A) {
			e.nodes = null, c.innerHTML = s, s !== "" && Dr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (A) {
				for (var a = j.data, l = je(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw De(), O;
				Dr(j, u), o = Ae(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? k : i ? Te : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Dr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Kr = [..." 	\n\r\f\xA0\v﻿"];
function qr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Kr.includes(r[o - 1])) && (s === r.length || Kr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Jr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Yr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Xr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Yr)), i && c.push(...Object.keys(i).map(Yr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Yr(e.substring(l, u).trim());
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
		return r && (n += Jr(r)), i && (n += Jr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Zr(e, t, n, r, i, a) {
	var o = e[oe];
	if (A || o !== n || o === void 0) {
		var s = qr(n, r, a);
		(!A || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Qr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function $r(e, t, n, r) {
	var i = e[se];
	if (A || i !== t) {
		var a = Xr(t, r);
		(!A || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? (Qr(e, n?.[0], r[0]), Qr(e, n?.[1], r[1], "important")) : Qr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ei = Symbol("is custom element"), ti = Symbol("is html"), ni = de ? "link" : "LINK", ri = de ? "progress" : "PROGRESS";
function X(e) {
	if (A) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, qe(n), ot();
	}
}
function Z(e, t) {
	var n = ai(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ri) || (e.value = t ?? "");
}
function ii(e, t) {
	var n = ai(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Q(e, t, n, r) {
	var i = ai(e);
	A && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ni) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[ae] ??= {
		[ei]: e.nodeName.includes("-"),
		[ti]: e.namespaceURI === we
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
	ct(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = li(e) ? ui(a) : a, n(a), F !== null && r.add(F), await lr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (A && e.defaultValue !== e.value || fr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), F !== null && r.add(F)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = F;
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
	var i = Be.r, a = U;
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
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), W(u)) : (l && (l = !1, c = s ? fr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || D in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = rt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ve(t), f(m)));
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
	o && W(y);
	var b = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : i && o ? tn(e) : e;
			return L(y, n), v = !0, c !== void 0 && (c = n), e;
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
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var hi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), gi = /* @__PURE__ */ K("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), _i = /* @__PURE__ */ K("<button type=\"button\"></button>"), vi = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), yi = /* @__PURE__ */ K("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), bi = /* @__PURE__ */ K("<span class=\"cp-tokens svelte-zxiloo\"></span>"), xi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Si = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ K("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), wi = /* @__PURE__ */ K("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Ti(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ I(tn([])), u = /* @__PURE__ */ I(tn([])), d = "", f = "", p = /* @__PURE__ */ I(null), h = /* @__PURE__ */ I(!1), g = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0
	})), _ = /* @__PURE__ */ I(0), v = /* @__PURE__ */ I(0), y = /* @__PURE__ */ I(1), b = /* @__PURE__ */ I(1), x = /* @__PURE__ */ I("#000000");
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
	let C = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function w(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function T(e, t, n) {
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
	function E() {
		return C(...T(W(_), W(v), W(y)));
	}
	function ee() {
		let e = E();
		return W(b) >= .995 ? e : e + Math.round(W(b) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		L(x, ee(), !0), f = W(x), t.onchange?.(W(x));
	}
	function ne(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			L(_, t[0], !0), L(v, t[1], !0), L(y, t[2], !0);
		})(w(t[0], t[1], t[2])), L(b, t[3], !0), L(x, ee(), !0), !0) : !1;
	}
	function re() {
		ne(s()) || ne("#000000"), d = n(), f = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			L(l, Array.isArray(e) ? e : [], !0);
		} catch {
			L(l, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			L(u, Array.isArray(e) ? e : [], !0);
		} catch {
			L(u, [], !0);
		}
		let e = W(p).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 236, window.innerWidth - 236 - 8)), r = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(g, {
			top: r,
			left: t
		}, !0), L(h, !0);
	}
	function D() {
		if (L(h, !1), f && f !== d) {
			let e = [f, ...W(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function ie(e, n) {
		ne(n), L(x, n, !0), t.onchange?.(e);
	}
	function ae(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			L(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), L(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function oe(e) {
		ne(e.target.value) ? te() : L(x, E(), !0);
	}
	function se(e) {
		return (S(E()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ce(e, t) {
		let n = S(E()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			L(_, t[0], !0), L(v, t[1], !0), L(y, t[2], !0);
		})(w(...n)), te();
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
		let e = ee();
		W(u).includes(e) || (L(u, [e, ...W(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(Re(W(u)))));
	}
	function pe(e) {
		L(u, W(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(Re(W(u))));
	}
	bn(() => {
		if (!W(h)) return;
		let e = (e) => {
			W(p) && !W(p).contains(e.target) && D();
		}, t = (e) => {
			e.key === "Escape" && D();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0);
		};
	});
	var me = wi(), he = R(me);
	let ge;
	var _e = B(he, 2), ve = (e) => {
		var t = Ci(), i = R(t), a = R(i);
		M(i);
		var o = B(i, 2);
		X(o);
		var s = B(o, 2);
		X(s);
		var d = B(s, 2), f = R(d), p = B(f, 2);
		X(p);
		var h = B(p, 2), S = (e) => {
			var t = hi();
			G("click", t, ue), q(e, t);
		};
		Y(h, (e) => {
			le && e(S);
		}), M(d);
		var C = B(d, 2);
		zr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = gi();
			X(r), V((e) => {
				Q(r, "title", t), Z(r, e);
			}, [() => se(W(n))]), G("change", r, (e) => ce(W(n), e.target.value)), q(e, r);
		}), M(C);
		var w = B(C, 2), T = (e) => {
			var t = vi(), i = z(t), a = B(R(i)), o = (e) => {
				var t = Or();
				V((e) => J(t, `- koblet til «${e ?? ""}»`), [() => c()]), q(e, t);
			}, s = /* @__PURE__ */ P(() => c());
			Y(a, (e) => {
				W(s) && e(o);
			}), M(i);
			var l = B(i, 2);
			zr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(W(t), 2));
				let i = () => W(r)[0], a = () => W(r)[1];
				var o = _i();
				let s;
				V(() => {
					s = Zr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), $r(o, `background: ${a() ?? ""}`), Q(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), G("click", o, () => ie(i(), a())), q(e, o);
			}), M(l), q(e, t);
		};
		Y(w, (e) => {
			r().length && e(T);
		});
		var ee = B(w, 2), ne = B(R(ee));
		M(ee);
		var re = B(ee, 2), D = (e) => {
			var t = bi();
			zr(t, 20, () => W(u), (e) => e, (e, t) => {
				var n = yi(), r = R(n), i = B(r, 2);
				M(n), V(() => {
					$r(r, `background: ${t ?? ""}`), Q(r, "title", t);
				}), G("click", r, () => de(t)), G("click", i, () => pe(t)), q(e, n);
			}), M(t), q(e, t);
		};
		Y(re, (e) => {
			W(u).length && e(D);
		});
		var me = B(re, 2), he = (e) => {
			var t = Si(), n = B(z(t), 2);
			zr(n, 20, () => W(l), (e) => e, (e, t) => {
				var n = xi();
				V(() => {
					$r(n, `background: ${t ?? ""}`), Q(n, "title", t);
				}), G("click", n, () => de(t)), q(e, n);
			}), M(n), q(e, t);
		};
		Y(me, (e) => {
			W(l).length && e(he);
		}), M(t), V((e, n) => {
			$r(t, `top: ${W(g).top ?? ""}px; left: ${W(g).left ?? ""}px`), $r(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${W(_) ?? ""}, 100%, 50%)`), $r(a, `left: ${W(v) * 100}%; top: ${(1 - W(y)) * 100}%`), Z(o, W(_)), Z(s, e), $r(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), $r(f, `background: ${W(x) ?? ""}`), Z(p, W(x));
		}, [() => Math.round(W(b) * 100), () => E()]), G("pointerdown", i, ae), G("input", o, (e) => {
			L(_, Number(e.target.value), !0), te();
		}), G("input", s, (e) => {
			L(b, Number(e.target.value) / 100), te();
		}), G("change", p, oe), G("click", ne, fe), q(e, t);
	};
	Y(_e, (e) => {
		W(h) && e(ve);
	}), M(me), fi(me, (e) => L(p, e), () => W(p)), V((e, t, n) => {
		ge = Zr(he, 1, "cp-swatch svelte-zxiloo", null, ge, e), $r(he, `background: ${t ?? ""}`), Q(he, "title", n), Q(he, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), G("click", he, () => W(h) ? D() : re()), q(e, me), Ue();
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
//#region src/lib/GlyphPicker.svelte
var Mi = /* @__PURE__ */ K("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Ni = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Pi = /* @__PURE__ */ K("<button type=\"button\"> </button>"), Fi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ii = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Li = /* @__PURE__ */ K("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!></div>"), Ri = /* @__PURE__ */ K("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"> </button> <!></span>");
function zi(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "label", 3, "Velg tegn"), i = "urd-recent-glyphs", a = [
		["Symboler", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
		["Piler", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
		["Smilefjes", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
		["Gester og folk", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
		["Natur", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
		["Mat og drikke", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
		["Aktivitet", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
		["Objekter", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
		["Hjerter", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
	], o = /* @__PURE__ */ I(tn([])), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0
	}));
	function d() {
		try {
			let e = JSON.parse(localStorage.getItem(i) ?? "[]");
			L(o, Array.isArray(e) ? e : [], !0);
		} catch {
			L(o, [], !0);
		}
		let e = W(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(u, {
			top: n,
			left: t
		}, !0), L(l, !0);
	}
	function f(e) {
		let n = [e, ...W(o).filter((t) => t !== e)].slice(0, 16);
		localStorage.setItem(i, JSON.stringify(n)), t.onpick?.(e), L(l, !1);
	}
	async function p(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ki(n, 256);
		t.onimage?.(r.dataUrl), L(l, !1);
	}
	bn(() => {
		if (!W(l)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && L(l, !1);
		}, t = (e) => {
			e.key === "Escape" && L(l, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && L(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var h = Ri(), g = R(h), _ = R(g, !0);
	M(g);
	var v = B(g, 2), y = (e) => {
		var r = Li(), i = R(r), s = (e) => {
			var t = Ni(), n = B(z(t), 2);
			zr(n, 20, () => W(o), (e) => e, (e, t) => {
				var n = Mi(), r = R(n, !0);
				M(n), V(() => J(r, t)), G("click", n, () => f(t)), q(e, n);
			}), M(n), q(e, t);
		};
		Y(i, (e) => {
			W(o).length && e(s);
		});
		var l = B(i, 2);
		zr(l, 17, () => a, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = Fi(), s = z(o), c = R(s, !0);
			M(s);
			var l = B(s, 2);
			zr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Pi();
				let i;
				var a = R(r, !0);
				M(r), V(() => {
					i = Zr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), J(a, t);
				}), G("click", r, () => f(t)), q(e, r);
			}), M(l), V(() => J(c, i())), q(e, o);
		});
		var d = B(l, 2), h = (e) => {
			var t = Ii(), n = B(z(t), 2), r = B(n, 2);
			fi(r, (e) => L(c, e), () => W(c)), N(2), G("click", n, () => W(c).click()), G("change", r, p), q(e, t);
		};
		Y(d, (e) => {
			t.onimage && e(h);
		}), M(r), V(() => $r(r, `top: ${W(u).top ?? ""}px; left: ${W(u).left ?? ""}px`)), q(e, r);
	};
	Y(v, (e) => {
		W(l) && e(y);
	}), M(h), fi(h, (e) => L(s, e), () => W(s)), V(() => {
		Q(g, "title", r()), Q(g, "aria-label", r()), J(_, n() || "★");
	}), G("click", g, () => W(l) ? L(l, !1) : d()), q(e, h), Ue();
}
xr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Bi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n);
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
var Vi = /* @__PURE__ */ K("<button type=\"button\"> </button>"), Hi = /* @__PURE__ */ K("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ui = /* @__PURE__ */ K("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		if (a()) return;
		if (W(o)) {
			L(o, !1);
			return;
		}
		let e = W(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		L(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0), L(o, !0);
	}
	function d(e) {
		L(o, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!W(o)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && L(o, !1);
		}, t = (e) => {
			e.key === "Escape" && L(o, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && L(o, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var f = Ui(), p = R(f), h = R(p), g = R(h, !0);
	M(h);
	var _ = B(h, 2), v = R(_, !0);
	M(_), M(p);
	var y = B(p, 2), b = (e) => {
		var t = Hi();
		zr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = Vi();
			let s;
			var c = R(o, !0);
			M(o), V(() => {
				s = Zr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), J(c, a());
			}), G("click", o, () => d(i())), q(e, o);
		}), M(t), V(() => $r(t, `top: ${W(c).top ?? ""}px; left: ${W(c).left ?? ""}px; min-width: ${W(c).width ?? ""}px`)), q(e, t);
	};
	Y(y, (e) => {
		W(o) && e(b);
	}), M(f), fi(f, (e) => L(s, e), () => W(s)), V((e) => {
		Q(p, "title", i()), p.disabled = a(), J(g, e), J(v, W(o) ? "▴" : "▾");
	}, [() => l()]), G("click", p, u), q(e, f), Ue();
}
xr(["click"]);
var Wi = (e) => Math.round(e * 100) / 100;
function Gi(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var Ki = {
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
					x: Wi(n.x * 100 / r.columns),
					w: Wi(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Gi(t.grid);
		return e;
	}
}, qi = { 1: (e) => (e.grid = Gi(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Ji(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = qi[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Yi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = Ki[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function Xi(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Zi = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Qi(e, t) {
	let n = Xi(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Xi(t[2]), a = Zi(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var $i = /^[a-z0-9][a-z0-9-]*$/;
function ea(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : ($i.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Xi(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function ta(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function na(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var ra = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = na(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, ia = {
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
		let n = t.stops.map(na).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, aa = {
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
		let n = na(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, oa = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", sa = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = oa, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ca = {
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
}, la = () => ({
	duration: 600,
	delay: 0
}), ua = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: la,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: la,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: la,
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
//#region src/App.svelte
var da = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), fa = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), pa = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ma = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), ha = /* @__PURE__ */ K("<!> Ren visning", 1), ga = /* @__PURE__ */ K("<!> Rediger", 1), _a = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), va = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), ya = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), ba = /* @__PURE__ */ K("<hr class=\"rail-sep svelte-1n46o8q\"/>"), xa = /* @__PURE__ */ K("<button> </button>"), Sa = /* @__PURE__ */ K("<!> <!>", 1), Ca = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), wa = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ta = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Ea = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), Da = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Oa = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), ka = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Aa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), ja = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Ma = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Na = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsbilde i menyen og menypunkt-design kommer i en senere runde.</p></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button></div></details></div>"), Pa = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), Fa = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>"), Ia = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; skaleres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Firkantet bilde anbefales.</p></div>"), La = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button>"), Ra = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), za = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ba = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), Va = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ha = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Ua = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Wa = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ga = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), Ka = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), qa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Ja = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), Ya = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tegn/emoji <span class=\"toolbar-row svelte-1n46o8q\"><!> <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Xa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), Za = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Qa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), $a = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), eo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), to = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), no = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), ro = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), io = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ao = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), oo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), so = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), co = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), lo = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), uo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), fo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), po = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label>"), mo = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), ho = /* @__PURE__ */ K("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), go = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), _o = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), vo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), yo = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), bo = /* @__PURE__ */ K("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), xo = /* @__PURE__ */ K("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), So = /* @__PURE__ */ K("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), Co = /* @__PURE__ */ K("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), wo = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), To = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), Eo = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), Do = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), Oo = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), ko = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ao = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), jo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Mo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), No = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Po = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Fo = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Io = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Lo = /* @__PURE__ */ K("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Ro = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), zo = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Bo = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Vo = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!></div>");
function Ho(e, t) {
	He(t, !0);
	let n = [
		["color", ra],
		["gradient", ia],
		["glow", aa],
		["image", ca],
		["grain", sa]
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
	], o = /* @__PURE__ */ I(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	bn(() => {
		document.documentElement.dataset.adminTheme = W(o), localStorage.setItem("urd-admin-theme", W(o));
	});
	let s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(""), d = /* @__PURE__ */ I("info"), f = 0;
	function p(e, t = "info") {
		L(u, e, !0), L(d, t, !0);
		let n = ++f;
		t === "ok" && setTimeout(() => {
			f === n && (L(u, ""), L(d, "info"));
		}, 8e3);
	}
	let h = /* @__PURE__ */ I(null), g = /* @__PURE__ */ I(null), _ = /* @__PURE__ */ I(tn({
		size: 16,
		snap: !0
	})), v = /* @__PURE__ */ I(!0), y = /* @__PURE__ */ I("desktop");
	bn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = W(y);
		T?.sendViewport(e);
	});
	let b = /* @__PURE__ */ I(0);
	function x() {
		L(b, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function S(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, x(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ I(null);
	function ee() {
		L(E, w.data, !0), w.replace(W(E));
	}
	function te() {
		T?.sendSite(Re(W(E)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => W(E).pages.find((e) => e.id === W(c));
	function D() {
		let e = W(E)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Kt?.hasDraft() || Object.values(qt).some((e) => e.hasDraft());
		L(l, e || C?.hasDraft() && !ne.has(W(c)) || w?.hasDraft() || hn?.hasDraft() || t || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			pageId: W(c),
			page: C.data,
			site: w.data
		});
	}
	function ce(e) {
		e === oe && (e.startsWith("edit:") || e.startsWith("grid:")) || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function le(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), ee(), w.save(), L(_, {
			snap: !0,
			...W(E).grid
		}, !0), te(), t && t !== W(c) && W(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), Et(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), x(), Ee(), Ve(C.data.sections.find((e) => e.id === W(Fe))), W(E).pages.some((e) => e.id === W(c)) ? T?.sendPage(W(c), C.data) : Et(W(E).pages[0].id, { keepHistory: !0 });
	}
	function ue() {
		ie.length && (ae.push(se()), le(ie.pop()), oe = null, p("Angret"));
	}
	function de() {
		ae.length && (ie.push(se()), le(ae.pop()), oe = null, p("Gjentatt"));
	}
	function fe(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
		if (t === "d") {
			if (e.target instanceof HTMLElement && (e.target.isContentEditable || [
				"INPUT",
				"TEXTAREA",
				"SELECT"
			].includes(e.target.tagName)) || !W(k) || W(y) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? de() : ue());
	}
	async function pe() {
		L(s, Ji(await (await fetch("/content/site.json")).json()), !0), w = mi("urd-draft-site", () => W(s)), w.replace(Ji(w.data)), w.save(), ee(), L(_, {
			snap: !0,
			...W(E).grid
		}, !0), await Et(new URLSearchParams(location.search).get("page") ?? W(E).pages[0].id), await On(), await en(), await ft(), mt(), (W(E).site.setup === !0 || W(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (L(ve, W(E).site.title, !0), L(ye, W(E).theme.tokens.color.accent, !0), L(be, W(E).theme.tokens.color.bg, !0), L(_e, !0));
	}
	let me = /* @__PURE__ */ I(null);
	function he({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			L(me, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function ge(e) {
		W(me)?.resolve(e), L(me, null);
	}
	let _e = /* @__PURE__ */ I(!1), ve = /* @__PURE__ */ I(""), ye = /* @__PURE__ */ I("#7c5cff"), be = /* @__PURE__ */ I("#0b0e14");
	function xe() {
		localStorage.setItem("urd-setup-done", "1"), L(_e, !1);
	}
	function Se() {
		let e = W(ve).trim();
		e && (kt("setup", () => {
			W(E).site.title = e, W(E).nav.logo = {
				type: "text",
				value: e
			}, W(E).theme.tokens.color.accent = W(ye), W(E).theme.tokens.color.bg = W(be), delete W(E).site.setup;
		}), xe(), p("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let O = /* @__PURE__ */ I(null), Ce = [
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
	function we(e) {
		L(O, W(O) === e ? null : e, !0), T?.sendShowGrid(W(O) === "Grid"), W(O) === "Historikk" && yt();
	}
	let k = /* @__PURE__ */ I(null);
	function Te(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ee() {
		if (!W(k)) return;
		let { block: e } = Te(W(k).sectionId, W(k).blockId);
		if (!e) {
			L(k, null);
			return;
		}
		L(k, {
			sectionId: W(k).sectionId,
			blockId: W(k).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function De(e) {
		if (!e.blockId) {
			L(k, null);
			return;
		}
		L(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Ee();
	}
	function Oe(e, t) {
		let { section: n, block: r } = Te(W(k)?.sectionId, W(k)?.blockId);
		r && (ce(e), t(r, n), S(n, "blokk-endret"), C.save(), D(), T?.sendSection(W(c), n), Ee());
	}
	function A(e, t) {
		Oe(`edit:${W(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function ke(e, t) {
		Number.isFinite(t) && Oe(`edit:frame-${W(k).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function j(e) {
		Oe("decor", (t) => {
			t.decor = e;
		});
	}
	async function Ae(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			Oe(`edit:${W(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ai(t.name).replaceAll("-", " ");
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let je = [
		["S", 14],
		["M", 18],
		["L", 24],
		["XL", 36]
	], Me = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, Ne = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Pe = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Fe = /* @__PURE__ */ I(null), Ie = /* @__PURE__ */ I(null), Le = /* @__PURE__ */ I(""), ze = /* @__PURE__ */ I(tn([])), Be = /* @__PURE__ */ I(null);
	function Ve(e) {
		L(Ie, e?.grid ? { ...e.grid } : null, !0), L(Le, e?.size?.minHeight ?? "", !0), L(ze, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(Be, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function We(e) {
		L(Fe, e.sectionId, !0), Ve(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Ge(e, t) {
		let n = C.data.sections.find((e) => e.id === W(Fe));
		n && (ce(e), t(n), C.save(), D(), T?.sendSection(W(c), n), Ve(n));
	}
	let Ke = /* @__PURE__ */ I("color");
	function qe(e) {
		Ge("bg", (t) => {
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
	function Je(e) {
		Ge("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Ye(e, t) {
		let n = e + t;
		Ge("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Xe(e, t, n) {
		Ge(`edit:bg-${W(Fe)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Ze(e, t, n) {
		Ge(`edit:bg-${W(Fe)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function Qe(e, t) {
		Ge("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function $e(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			Xe(e, "src", (await ki(n)).dataUrl);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let et = () => Object.entries(W(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function tt(e) {
		return {
			type: e,
			version: ua[e].version,
			props: ua[e].defaults()
		};
	}
	function nt(e) {
		Oe(`edit:anim-${W(k).blockId}`, (t) => {
			t.animation = e ? tt(e) : null;
		}), W(k) && T?.sendDemoAnim(W(k).sectionId, W(k).blockId);
	}
	function rt(e, t) {
		Number.isFinite(t) && (Oe(`edit:anim-${W(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(k) && T?.sendDemoAnim(W(k).sectionId, W(k).blockId));
	}
	function at(e) {
		Ge("section-anim", (t) => {
			t.animation = e ? tt(e) : null;
		}), T?.sendDemoAnim(W(Fe));
	}
	function ot(e, t) {
		Number.isFinite(t) && (Ge("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(W(Fe)));
	}
	function st(e) {
		let t = C.data.sections.find((e) => e.id === W(Fe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ce("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(Le, r, !0), C.save(), D(), T?.sendSection(W(c), t);
	}
	function ct() {
		return C.data.sections.find((e) => e.id === W(Fe)) ?? C.data.sections[0];
	}
	function lt(e) {
		let t = C.data.sections.find((e) => e.id === W(Fe));
		t && (ce("grid:section"), t.grid = e ? { ...w.data.grid } : null, L(Ie, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(W(c), t), W(O) === "Grid" && T?.sendShowGrid(!0));
	}
	function ut(e, t) {
		let n = C.data.sections.find((e) => e.id === W(Fe));
		n?.grid && (ce("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, L(Ie, { ...n.grid }, !0), C.save(), D(), T?.sendSection(W(c), n), W(O) === "Grid" && T?.sendShowGrid(!0));
	}
	function dt(e, t) {
		ce("grid:site"), L(_, {
			...W(_),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), te(), W(O) === "Grid" && T?.sendShowGrid(!0);
	}
	async function ft() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(g, await e.json(), !0) : e.status !== 503 && L(g, null);
		} catch {
			L(g, null);
		}
	}
	let pt = null;
	async function mt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (pt = (await e.json()).head ?? null);
		} catch {}
	}
	async function ht(e) {
		if (!pt) return await mt(), {
			ok: await he({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: pt
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${pt}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === pt) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await he({
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
	let gt = /* @__PURE__ */ I(null), _t = /* @__PURE__ */ I(""), vt = /* @__PURE__ */ I(!1);
	async function yt() {
		L(_t, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(gt, (await e.json()).commits, !0) : e.status === 401 ? (L(gt, [], !0), L(_t, "Logg inn med GitHub for å se historikken.")) : (L(gt, [], !0), L(_t, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(gt, [], !0), L(_t, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let bt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), xt = !1;
	async function St() {
		let e = W(gt)?.[0];
		if (!(!e || W(vt)) && await he({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			L(vt, !0), p("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? pt = e : mt(), xt = !0, p("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), Ct();
				} else t.status === 409 ? p("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : p((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				p("Kunne ikke nå publiseringslaget", "error");
			}
			L(vt, !1), yt();
		}
	}
	async function Ct() {
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
				p("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		p("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let wt = null;
	function Tt(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: ta("sec"),
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
	async function Et(e, { keepHistory: t = !1 } = {}) {
		L(c, e, !0), wt = (async () => {
			let n = re(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Yi(await e.json(), w.data));
			} catch {}
			r ? ne.delete(e) : r = Tt(n), C = mi(`urd-draft-${e}`, () => r), C.replace(Yi(C.data, w.data)), C.save(), t || (oe = null), L(Fe, null), L(Ie, null), D(), x(), L(u, "");
		})(), await wt;
	}
	function F() {
		T?.destroy(), T = Bi(W(h), {
			onEdit: qn,
			onMove: Jn,
			onDelete: ir,
			onAddSection: $n,
			onMoveSection: er,
			onDeleteSection: tr,
			onSectionSize: nr,
			onUndo: (e) => e.redo ? de() : ue(),
			onSelectSection: We,
			onSelectBlock: De,
			onReady: Dt,
			onNavigate: Ot,
			onAddBlock: (e) => cr(e.sectionId, e.block),
			onAddBlocks: (e) => lr(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: pr,
			onMoveBlockSection: rr,
			onMobileManual: Yn,
			onMobileAuto: Xn,
			onReviewDone: Zn,
			onBlockFlag: Qn,
			onCollectionEdit: sn,
			onPluginBlocks: (e) => {
				L(dr, e.blocks ?? [], !0);
			}
		});
	}
	async function Dt() {
		await wt, await _n, T?.sendPlugins(Re(W(vn))?.enabled ?? []), T?.sendViewport(W(y)), an(), w.hasDraft() && te();
		let e = !W(s).pages.some((e) => e.id === W(c));
		(C.hasDraft() || e) && T?.sendPage(W(c), C.data), W(v) || T?.sendChrome(!1), W(O) === "Grid" && T?.sendShowGrid(!0);
	}
	function Ot(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(E).pages.find((e) => e.path === t);
		n && n.id !== W(c) && Et(n.id);
	}
	function kt(e, t) {
		ce(e), t(), w.save(), D(), te();
	}
	let At = /* @__PURE__ */ I(""), jt = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Mt(e, t = null) {
		return e ? jt.includes(e) ? `«${e}» er et reservert navn` : W(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Nt() {
		let e = W(At).trim(), t = Ai(e), n = Mt(t);
		if (n) {
			p(n, "error");
			return;
		}
		kt("pages", () => {
			W(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(Tt({
			id: t,
			title: e
		}))), D(), L(At, ""), Et(t);
	}
	function Pt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		kt("pages", () => {
			e.title = n;
			for (let t of W(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(c) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(W(c), C.data)) : Ft(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Ft(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Yi(await t.json(), w.data));
		} catch {}
		r ||= Tt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function It(e, t) {
		let n = Ai(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Mt(n, e.id);
		if (r) {
			p(r, "error");
			return;
		}
		kt("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Lt(e) {
		e.path !== "/" && (kt("pages", () => {
			W(E).pages = W(E).pages.filter((t) => t.id !== e.id), W(E).nav.items = W(E).nav.items.filter((t) => t.page !== e.id);
		}), e.id === W(c) && Et(W(E).pages[0].id), p("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Rt(e) {
		kt("edit:nav-logo", () => {
			W(E).nav.logo = {
				type: "text",
				value: "",
				...W(E).nav.logo,
				...e
			};
		});
	}
	function zt(e) {
		kt("nav", () => {
			W(E).nav.logo ??= {
				type: "text",
				value: W(E).site.title
			};
			let t = W(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Bt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			kt("nav", () => {
				let t = W(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function Vt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t, 128);
			kt("edit:site-icon", () => {
				W(E).site.icon = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Ht() {
		kt("edit:site-icon", () => {
			delete W(E).site.icon;
		});
	}
	let Ut = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!W(E)?.site) return;
		let e = W(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			Ut.test(e) && (t.href = e);
		}
	});
	function Wt(e) {
		kt("nav", () => {
			W(E).nav.layout = e;
		});
	}
	function Gt(e, t) {
		kt(`edit:nav-style-${e}`, () => {
			W(E).nav.style ??= {}, W(E).nav.style[e] = t;
		});
	}
	let Kt = null, qt = {}, Jt = /* @__PURE__ */ I(tn([])), Yt = /* @__PURE__ */ I(tn({})), Xt = /* @__PURE__ */ I(null), Zt = /* @__PURE__ */ I(""), Qt = /* @__PURE__ */ I("news"), $t = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function en() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Kt = mi("urd-draft-samlinger", () => e), L(Jt, [...Kt.data.samlinger ?? []], !0);
		for (let e of W(Jt)) {
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
			}, qt[e] = mi(`urd-draft-samling-${e}`, () => t);
		}
		rn();
	}
	function rn(e = !0) {
		let t = {};
		for (let e of W(Jt)) qt[e] && (t[e] = JSON.parse(JSON.stringify(qt[e].data)));
		L(Yt, t, !0), e && an();
	}
	function an() {
		T?.sendCollections(Re(W(Yt)) ?? {});
	}
	function on(e, t, n = !0) {
		let r = qt[e];
		r && (t(r.data), r.save(), D(), rn(n));
	}
	function sn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || on(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function cn() {
		let e = W(Zt).trim();
		if (!e) return;
		let t = Ai(e);
		if (!t || W(Jt).includes(t)) {
			p(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: W(Qt),
			entries: []
		};
		qt[t] = mi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), qt[t].replace(n), qt[t].save(), Kt.data.samlinger = [...W(Jt), t], Kt.save(), L(Jt, [...W(Jt), t], !0), L(Xt, t, !0), L(Zt, ""), D(), rn();
	}
	function ln(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete qt[e], Kt.data.samlinger = W(Jt).filter((t) => t !== e), Kt.save(), L(Jt, W(Jt).filter((t) => t !== e), !0), W(Xt) === e && L(Xt, null), D(), rn();
	}
	function un(e) {
		on(e, (e) => {
			e.entries.unshift({
				id: ta("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function dn(e, t, n, r) {
		on(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function fn(e, t, n) {
		on(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function pn(e, t) {
		on(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function mn(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && dn(e, t, "image", (await ki(r)).dataUrl);
	}
	let hn = null, gn, _n = new Promise((e) => {
		gn = e;
	}), vn = /* @__PURE__ */ I(null), yn = tn({}), xn = /* @__PURE__ */ I("0.0.0"), Sn = /* @__PURE__ */ I(""), Cn = /* @__PURE__ */ I(""), wn = /* @__PURE__ */ I(tn([])), Tn = /* @__PURE__ */ I("pending"), En = () => [.../* @__PURE__ */ new Set([...W(vn)?.enabled ?? [], ...W(vn)?.disabled ?? []])];
	function Dn() {
		L(vn, JSON.parse(JSON.stringify(hn.data)), !0);
	}
	async function On() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		hn = mi("urd-draft-plugins", () => e), Dn();
		try {
			L(xn, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of En()) jn(e);
		kn(), gn(), T?.sendPlugins(Re(W(vn))?.enabled ?? []);
	}
	async function kn() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				An();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), L(wn, (t ?? []).filter((e) => !En().includes(e)), !0);
			for (let e of W(wn)) jn(e);
			L(Tn, "ok");
		} catch {
			An();
		}
	}
	function An() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				L(wn, e.filter((e) => !En().includes(e)), !0);
				for (let e of W(wn)) jn(e);
				L(Tn, "ok");
				return;
			}
		} catch {}
		L(Tn, "unavailable");
	}
	async function jn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ea(t);
			yn[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Qi(W(xn), t.requiresEngine)
			};
		} catch {
			yn[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Mn(e, t) {
		let n = hn.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), hn.save(), D(), Dn(), Nn();
	}
	function Nn() {
		W(h) && (W(h).src = W(h).src);
	}
	function Pn(e) {
		let t = hn.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), hn.save(), D(), Dn(), Nn();
	}
	async function Fn() {
		L(Cn, "");
		let e = W(Sn).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			L(Cn, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (En().includes(e)) {
			L(Cn, "Pluginen står allerede i listen");
			return;
		}
		if (await jn(e), yn[e].errors.length) {
			L(Cn, `Fant ingen gyldig plugin: ${yn[e].errors.join("; ")}`);
			return;
		}
		Mn(e, !0), L(Sn, "");
	}
	function In(e) {
		L(wn, W(wn).filter((t) => t !== e), !0), Mn(e, !0);
	}
	function Ln(e, t) {
		kt(e, () => {
			W(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(E).footer);
		});
	}
	function Rn(e, t) {
		kt(`edit:nav-label-${e}`, () => {
			W(E).nav.items[e].label = t;
		});
	}
	function zn(e, t) {
		kt("nav", () => {
			let n = W(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Bn(e, t) {
		kt(`edit:nav-href-${e}`, () => {
			W(E).nav.items[e].href = t;
		});
	}
	function Vn(e, t) {
		let n = e + t, r = W(E).nav.items;
		n < 0 || n >= r.length || kt("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Hn(e) {
		kt("nav", () => {
			W(E).nav.items.splice(e, 1);
		});
	}
	function H() {
		kt("nav", () => {
			W(E).nav.items.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	let Un = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function Wn(e, t) {
		kt(`edit:theme-color-${e}`, () => {
			W(E).theme.tokens.color[e] = t;
		});
	}
	function U(e, t) {
		kt("theme", () => {
			W(E).theme.tokens.font[e] = t;
		});
	}
	function Gn(e, t) {
		kt("theme", () => {
			W(E).theme.tokens.radius[e] = t;
		});
	}
	function Kn() {
		L(v, !W(v)), T?.sendChrome(W(v));
	}
	function qn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ce(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), W(k)?.blockId === e.blockId && Ee(), e.rerender && T?.sendSection(W(c), t), L(u, ""));
	}
	function Jn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ce(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && S(t, "desktop-endret-etter-mobil"), C.save(), D(), W(k)?.blockId === e.blockId && Ee();
	}
	function Yn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ce("mobile-manual");
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
	function Xn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ce("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, C.save(), D(), x(), T?.sendSection(W(c), t);
		}
	}
	function Zn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ce("review-done"), t.responsive.mobile.attention = null, C.save(), D(), x());
	}
	function Qn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (ce("decor"), t.decor = e.decor, C.save(), D(), W(k)?.blockId === e.blockId && Ee());
	}
	function $n(e) {
		ce("add-section"), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(W(c), C.data), L(Fe, e.section.id, !0), Ve(e.section), W(O) !== "Egenskaper" && (L(O, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function er(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ce("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(W(c), C.data));
	}
	function tr(e) {
		ce("delete-section"), e.sectionId === W(Fe) && (L(Fe, null), L(Ie, null)), W(k)?.sectionId === e.sectionId && L(k, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(W(c), C.data);
	}
	function nr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (ce("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === W(Fe) && L(Le, e.minHeight, !0), C.save(), D());
	}
	function rr(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (ce("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), S(t, "blokk-flyttet"), S(n, "blokk-flyttet"), C.save(), D(), x(), T?.sendPage(W(c), C.data), W(k)?.blockId === e.blockId && (L(k, {
			...W(k),
			sectionId: e.toSectionId
		}, !0), Ee()));
	}
	function ir(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (ce("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), W(k)?.blockId === e.blockId && L(k, null), S(t, "blokk-slettet"), C.save(), D(), T?.sendSection(W(c), t));
	}
	let ar = {
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
		}
	};
	function or(e) {
		let t = ar[e];
		return t ? {
			id: ta("blk"),
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
	function sr(e) {
		T ? T.sendPlaceBlock(e) : cr(ct()?.id, e);
	}
	function cr(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		ce("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), S(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(W(c), n);
	}
	function lr(e, t, n, r) {
		let i = C.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ce("add-blocks");
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
		}), S(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(W(c), i);
	}
	function ur(e) {
		sr(or(e));
	}
	let dr = /* @__PURE__ */ I(tn([]));
	function fr(e, t = {}) {
		sr({
			id: ta("blk"),
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
	function pr(e) {
		let t = or(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, cr(e.sectionId, t), e.kind === "image" && p("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function mr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		p("Komprimerer bildet…");
		let n;
		try {
			n = await ki(t);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(h)?.clientWidth ?? 1280));
		sr({
			id: ta("blk"),
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
		}), n.bytes > 4e5 ? p(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : p("");
	}
	function hr(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ai(n || "bilde")}-${ji(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function gr(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && hr(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && hr(e.props, "src", e.props.alt, t), e.type === "icon" && hr(e.props, "image", "ikon", t);
		}
		return t;
	}
	function _r(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && hr(n, "value", "logo", t), n?.type === "both" && hr(n, "image", "logo", t), hr(e.site, "icon", "ikon", t), t;
	}
	let yr = /* @__PURE__ */ I(!1);
	function xr() {
		if (!W(yr)) {
			L(yr, !0);
			return;
		}
		L(yr, !1), Sr();
	}
	bn(() => {
		if (!W(yr)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || L(yr, !1);
		}, t = (e) => {
			e.key === "Escape" && L(yr, !1);
		}, n = () => L(yr, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Sr() {
		ce("discard");
		for (let e of W(E).pages) e.id !== W(c) && !ne.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), hn && (hn.reset(), Dn()), Kt) {
			Kt.reset(), L(Jt, [...Kt.data.samlinger ?? []], !0);
			for (let e of Object.keys(qt)) W(Jt).includes(e) ? qt[e].reset() : delete qt[e];
			rn();
		}
		ee(), L(_, {
			snap: !0,
			...W(E).grid
		}, !0), D(), L(u, ""), te(), W(E).pages.some((e) => e.id === W(c)) ? T?.sendPage(W(c), e) : Et(W(E).pages[0].id);
	}
	async function Cr() {
		if (xt) {
			p("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		p("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(E).pages) {
			let a = `urd-draft-${i.id}`, o = ne.has(i.id) || !W(s).pages.some((e) => e.id === i.id), l = null;
			if (i.id === W(c) && (C.hasDraft() || o)) l = C.data;
			else if (i.id !== W(c)) {
				let e = localStorage.getItem(a);
				if (e) try {
					l = Yi(JSON.parse(e), w.data);
				} catch {}
			}
			if (!l && o && (l = Tt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...gr(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(W(E)));
			e.push(..._r(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(W(s).theme, W(E).theme) || t.push("tema"), i(W(s).nav, W(E).nav) || t.push("menyen"), i(W(s).footer, W(E).footer) || t.push("footeren"), i(W(s).pages, W(E).pages) || t.push("sideregisteret"), i(W(s).grid, W(E).grid) || t.push("gridet"), (W(s).site.icon ?? null) !== (W(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = W(s).site, { icon: c, ...l } = W(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		let i = Object.entries(qt).filter(([, e]) => e.hasDraft());
		if (i.length || Kt?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) hr(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Kt?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Kt.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!W(Jt).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		hn?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(hn.data, null, 2) + "\n",
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
		for (let e of W(s).pages) {
			let t = W(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let l = await ht(e);
		if (!l.ok) {
			p("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let u = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...l.head ? { expect: l.head } : {}
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
			e ? pt = e : mt(), gr(C.data), _r(W(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			if (L(s, JSON.parse(JSON.stringify(W(E))), !0), w = mi("urd-draft-site", () => W(s)), ee(), hn) {
				let e = JSON.parse(JSON.stringify(hn.data));
				hn = mi("urd-draft-plugins", () => e), Dn();
			}
			if (Kt) {
				for (let e of Object.values(qt)) for (let t of e.data.entries) hr(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Kt.data));
				Kt = mi("urd-draft-samlinger", () => e);
				for (let e of W(Jt)) {
					if (!qt[e]) continue;
					let t = JSON.parse(JSON.stringify(qt[e].data));
					qt[e] = mi(`urd-draft-samling-${e}`, () => t);
				}
				rn();
			}
			L(_, {
				snap: !0,
				...W(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = mi(`urd-draft-${W(c)}`, () => t), ne.has(W(c)) && localStorage.setItem(`urd-draft-${W(c)}`, JSON.stringify(t)), D(), p("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			p(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ft();
		} else d?.status === 403 ? p((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? p("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : p(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	pe();
	var wr = Vo();
	br("keydown", nn, fe);
	var Tr = R(wr), Er = (e) => {
		var t = da();
		Gr(R(t), () => i.pencil), N(), M(t), G("click", t, Kn), q(e, t);
	};
	Y(Tr, (e) => {
		W(v) || e(Er);
	});
	var Dr = B(Tr, 2);
	let K;
	var Or = R(Dr), Ar = B(R(Or), 2);
	$(Ar, {
		get value() {
			return W(o);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return a;
		},
		onchange: (e) => L(o, e, !0)
	});
	var jr = B(Ar, 2), Mr = (e) => {
		var t = fa(), n = z(t), r = R(n, !0);
		M(n);
		var a = B(n, 2), o = R(a);
		let s;
		Gr(o, () => i.desktop, !0), M(o);
		var c = B(o, 2);
		let l;
		Gr(c, () => i.phone, !0), M(c), M(a), V((e) => {
			J(r, e), s = Zr(o, 1, "ghost svelte-1n46o8q", null, s, { active: W(y) === "desktop" }), l = Zr(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(y) === "mobile" });
		}, [() => re()?.title ?? ""]), G("click", n, () => we("Sider")), G("click", o, () => L(y, "desktop")), G("click", c, () => L(y, "mobile")), q(e, t);
	};
	Y(jr, (e) => {
		W(s) && e(Mr);
	});
	var Nr = B(jr, 2), Pr = (e) => {
		var t = pa(), n = R(t);
		Gr(n, () => i.phone);
		var r = B(n);
		M(t), V(() => J(r, ` ${W(b) ?? ""} ${W(b) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(y, "mobile")), q(e, t);
	};
	Y(Nr, (e) => {
		W(b) > 0 && e(Pr);
	});
	var Ir = B(Nr, 2), Lr = (e) => {
		q(e, ma());
	};
	Y(Ir, (e) => {
		W(l) && e(Lr);
	}), M(Or);
	var Rr = B(Or, 2), Br = R(Rr), Vr = (e) => {
		var t = ya(), n = z(t), r = R(n), a = (e) => {
			var t = ha();
			Gr(z(t), () => i.eye), N(), q(e, t);
		}, o = (e) => {
			var t = ga();
			Gr(z(t), () => i.pencil), N(), q(e, t);
		};
		Y(r, (e) => {
			W(v) ? e(a) : e(o, -1);
		}), M(n);
		var s = B(n, 2), c = (e) => {
			var t = _a(), n = R(t), r = (e) => {
				var t = kr();
				Gr(z(t), () => i.warn), q(e, t);
			};
			Y(n, (e) => {
				W(g).allowed || e(r);
			});
			var a = B(n, 1, !0);
			M(t), V(() => {
				Q(t, "title", W(g).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(a, W(g).login);
			}), q(e, t);
		}, u = (e) => {
			q(e, va());
		};
		Y(s, (e) => {
			W(g)?.loggedIn ? e(c) : W(g) && e(u, 1);
		});
		var d = B(s, 2), f = B(d, 2);
		let p;
		var m = R(f, !0);
		M(f);
		var h = B(f, 2);
		V((e) => {
			Q(n, "title", W(v) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), Q(d, "href", e), p = Zr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: W(yr) }), f.disabled = !W(l), Q(f, "title", W(yr) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), J(m, W(yr) ? "Sikker?" : "Forkast utkast"), h.disabled = !W(l);
		}, [() => re()?.path ?? "/"]), G("click", n, Kn), G("click", f, xr), G("click", h, Cr), q(e, t);
	};
	Y(Br, (e) => {
		W(s) && e(Vr);
	}), M(Rr), M(Dr);
	var Hr = B(Dr, 2), Ur = (e) => {
		var t = Fo(), r = R(t), a = (e) => {
			var t = Po(), r = z(t);
			zr(r, 21, () => Ce, Fr, (e, t, n) => {
				var r = Sa(), i = z(r), a = (e) => {
					q(e, ba());
				};
				Y(i, (e) => {
					n > 0 && e(a);
				}), zr(B(i, 2), 16, () => W(t), (e) => e, (e, t) => {
					var n = xa();
					let r;
					var i = R(n, !0);
					M(n), V(() => {
						r = Zr(n, 1, "svelte-1n46o8q", null, r, { active: W(O) === t }), J(i, t);
					}), G("click", n, () => we(t)), q(e, n);
				}), q(e, r);
			}), M(r);
			var a = B(r, 2), o = (e) => {
				var t = No(), r = R(t), a = R(r, !0);
				M(r);
				var o = B(r, 2), s = (e) => {
					var t = Da(), n = B(R(t), 2);
					zr(n, 17, () => W(E).pages, (e) => e.id, (e, t) => {
						var n = Ea();
						let r;
						var a = R(n);
						X(a);
						var o = B(a, 2), s = (e) => {
							q(e, Ca());
						}, l = (e) => {
							var n = wa();
							X(n), V((e) => Z(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => It(W(t), e.target.value)), q(e, n);
						};
						Y(o, (e) => {
							W(t).path === "/" ? e(s) : e(l, -1);
						});
						var u = B(o, 2), d = R(u);
						Gr(d, () => i.right, !0), M(d);
						var f = B(d, 2), p = (e) => {
							var n = Ta();
							Gr(n, () => i.cross, !0), M(n), G("click", n, () => Lt(W(t))), q(e, n);
						};
						Y(f, (e) => {
							W(t).path !== "/" && e(p);
						}), M(u), M(n), V(() => {
							r = Zr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(c) }), Z(a, W(t).title), d.disabled = W(t).id === W(c);
						}), G("change", a, (e) => Pt(W(t), e.target.value)), G("click", d, () => Et(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					X(r);
					var a = B(r, 2);
					N(2), M(t), V((e) => a.disabled = e, [() => !W(At).trim()]), G("keydown", r, (e) => e.key === "Enter" && Nt()), ci(r, () => W(At), (e) => L(At, e)), G("click", a, Nt), q(e, t);
				}, l = (e) => {
					var t = Na(), n = B(R(t), 2), r = B(R(n), 2), a = R(r), o = B(R(a));
					{
						let e = /* @__PURE__ */ P(() => W(E).nav.logo?.type ?? "text");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => zt(e)
						});
					}
					M(a);
					var s = B(a, 2), c = (e) => {
						var t = Oa(), n = z(t);
						X(n);
						var r = B(n, 2), i = R(r);
						{
							let e = /* @__PURE__ */ P(() => W(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv"], ...Un.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => Rt({ font: e || void 0 })
							});
						}
						var a = B(i, 2);
						X(a);
						var o = B(a, 2);
						let s;
						var c = B(o, 2);
						let l;
						M(r), V((e) => {
							Z(n, W(E).nav.logo?.value ?? ""), Z(a, W(E).nav.logo?.textSize ?? ""), s = Zr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: W(E).nav.logo?.bold !== !1 }), l = Zr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!W(E).nav.logo?.italic })]), G("input", n, (e) => Rt({ value: e.target.value })), G("change", a, (e) => Rt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", o, () => Rt({ bold: W(E).nav.logo?.bold === !1 })), G("click", c, () => Rt({ italic: !W(E).nav.logo?.italic })), q(e, t);
					};
					Y(s, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = B(s, 2), u = (e) => {
						var t = ka(), n = z(t), r = R(n), i = R(r), a = B(i);
						M(r);
						var o = B(r, 2);
						X(o);
						var s = B(o, 2);
						X(s), M(n), N(2), V(() => {
							J(i, `${(W(E).nav.logo?.type === "image" ? W(E).nav.logo?.value : W(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Z(o, W(E).nav.logo?.size ?? 32), Z(s, W(E).nav.logo?.radius ?? 0);
						}), G("change", a, Bt), G("change", o, (e) => Rt({ size: Number(e.target.value) })), G("change", s, (e) => Rt({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(l, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = B(l, 2), f = (e) => {
						var t = Aa(), n = B(R(t));
						{
							let e = /* @__PURE__ */ P(() => W(E).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return W(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => Rt({ order: e })
							});
						}
						M(t), q(e, t);
					};
					Y(d, (e) => {
						W(E).nav.logo?.type === "both" && e(f);
					}), N(2), M(r), M(n);
					var p = B(n, 2), m = B(R(p), 2), h = R(m), g = B(R(h));
					{
						let e = /* @__PURE__ */ P(() => W(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ P(et);
						Ti(g, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Gt("bg", e)
						});
					}
					M(h);
					var _ = B(h, 2), v = B(R(_)), y = R(v);
					M(v), M(_);
					var b = B(_, 2);
					X(b);
					var x = B(b, 2), S = R(x);
					X(S), N(), M(x);
					var C = B(x, 2), w = B(R(C));
					{
						let e = /* @__PURE__ */ P(() => W(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(et);
						Ti(w, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Gt("textColor", e)
						});
					}
					M(C);
					var T = B(C, 2), ee = B(R(T));
					{
						let e = /* @__PURE__ */ P(() => W(E).nav.layout ?? "right");
						$(ee, {
							get value() {
								return W(e);
							},
							options: [
								["right", "Høyre"],
								["center", "Midtstilt"],
								["left", "Venstre (etter logoen)"]
							],
							onchange: (e) => Wt(e)
						});
					}
					M(T);
					var te = B(T, 2), ne = R(te);
					X(ne), N(), M(te), N(2), M(m), M(p);
					var re = B(p, 2), D = B(R(re), 2), ie = R(D);
					zr(ie, 17, () => W(E).nav.items, Fr, (e, t, n) => {
						var r = Ma(), a = R(r);
						X(a);
						var o = B(a, 2), s = R(o);
						s.disabled = n === 0, Gr(s, () => i.up, !0), M(s);
						var c = B(s, 2);
						Gr(c, () => i.down, !0), M(c);
						var l = B(c, 2);
						Gr(l, () => i.cross, !0), M(l), M(o);
						var u = B(o, 2), d = R(u);
						{
							let e = /* @__PURE__ */ P(() => W(t).page ?? "__href"), r = /* @__PURE__ */ P(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
							$(d, {
								get value() {
									return W(e);
								},
								title: "Hvor lenken går",
								get options() {
									return W(r);
								},
								onchange: (e) => zn(n, e)
							});
						}
						M(u);
						var f = B(u, 2), p = (e) => {
							var r = ja();
							X(r), V(() => Z(r, W(t).href ?? "")), G("change", r, (e) => Bn(n, e.target.value)), q(e, r);
						};
						Y(f, (e) => {
							W(t).page || e(p);
						}), M(r), V(() => {
							Z(a, W(t).label), c.disabled = n === W(E).nav.items.length - 1;
						}), G("input", a, (e) => Rn(n, e.target.value)), G("click", s, () => Vn(n, -1)), G("click", c, () => Vn(n, 1)), G("click", l, () => Hn(n)), q(e, r);
					});
					var ae = B(ie, 2);
					M(D), M(re), M(t), V((e) => {
						J(y, `${e ?? ""}%`), Z(b, W(E).nav.style?.bgOpacity ?? .85), ii(S, W(E).nav.style?.blur !== !1), ii(ne, W(E).nav.sticky !== !1);
					}, [() => Math.round((W(E).nav.style?.bgOpacity ?? .85) * 100)]), G("input", b, (e) => Gt("bgOpacity", Number(e.target.value))), G("change", S, (e) => Gt("blur", e.target.checked)), G("change", ne, (e) => kt("nav", () => {
						W(E).nav.sticky = e.target.checked;
					})), G("click", ae, H), q(e, t);
				}, u = (e) => {
					var t = Ia(), n = B(R(t), 2);
					Ti(B(R(n)), {
						get value() {
							return W(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Wn("bg", e)
					}), M(n);
					var r = B(n, 2);
					Ti(B(R(r)), {
						get value() {
							return W(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Wn("surface", e)
					}), M(r);
					var a = B(r, 2);
					Ti(B(R(a)), {
						get value() {
							return W(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Wn("text", e)
					}), M(a);
					var o = B(a, 2);
					Ti(B(R(o)), {
						get value() {
							return W(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Wn("accent", e)
					}), M(o);
					var s = B(o, 4), c = B(R(s));
					{
						let e = /* @__PURE__ */ P(() => [...Un.some(([, e]) => e === W(E).theme.tokens.font.heading) ? [] : [[W(E).theme.tokens.font.heading, "Egendefinert"]], ...Un.map(([e, t]) => [t, e])]);
						$(c, {
							get value() {
								return W(E).theme.tokens.font.heading;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => U("heading", e)
						});
					}
					M(s);
					var l = B(s, 2), u = B(R(l));
					{
						let e = /* @__PURE__ */ P(() => [...Un.some(([, e]) => e === W(E).theme.tokens.font.body) ? [] : [[W(E).theme.tokens.font.body, "Egendefinert"]], ...Un.map(([e, t]) => [t, e])]);
						$(u, {
							get value() {
								return W(E).theme.tokens.font.body;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => U("body", e)
						});
					}
					M(l);
					var d = B(l, 4), f = B(R(d));
					X(f), M(d);
					var p = B(d, 2), m = B(R(p));
					X(m), M(p);
					var h = B(p, 4), g = B(R(h)), _ = (e) => {
						var t = Pa();
						V(() => Q(t, "src", W(E).site.icon)), q(e, t);
					};
					Y(g, (e) => {
						W(E).site.icon && e(_);
					}), M(h);
					var v = B(h, 2), y = R(v), b = R(y), x = B(b);
					M(y);
					var S = B(y, 2), C = (e) => {
						var t = Fa();
						Gr(t, () => i.cross, !0), M(t), G("click", t, Ht), q(e, t);
					};
					Y(S, (e) => {
						W(E).site.icon && e(C);
					}), M(v), N(2), M(t), V(() => {
						Z(f, W(E).theme.tokens.radius.sm), Z(m, W(E).theme.tokens.radius.md), J(b, `${W(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), G("change", f, (e) => Gn("sm", e.target.value)), G("change", m, (e) => Gn("md", e.target.value)), G("change", x, Vt), q(e, t);
				}, d = (e) => {
					var t = Ba();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					M(i), M(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					M(c);
					var u = B(c, 2), d = B(u, 2), f = B(d, 2), p = B(f, 2), m = B(R(p), 2), h = R(m), g = B(h, 2), _ = B(g, 2), v = B(_, 2), b = B(v, 2);
					M(m), M(p);
					var x = B(p, 2), S = (e) => {
						var t = za(), n = B(R(t), 2);
						zr(n, 21, () => W(dr), (e) => e.type, (e, t) => {
							var n = kr(), r = z(n), i = (e) => {
								var n = Ra(), r = R(n), i = R(r, !0);
								M(r);
								var a = B(r, 2);
								zr(a, 21, () => W(t).variants, (e) => e.label, (e, n) => {
									var r = La(), i = R(r, !0);
									M(r), V(() => {
										Q(r, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(i, W(n).label);
									}), G("click", r, () => fr(W(t), W(n).props)), q(e, r);
								}), M(a), M(n), V(() => J(i, W(t).label)), q(e, n);
							}, a = (e) => {
								var n = La(), r = R(n, !0);
								M(n), V(() => {
									Q(n, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(r, W(t).label);
								}), G("click", n, () => fr(W(t))), q(e, n);
							};
							Y(r, (e) => {
								W(t).variants?.length ? e(i) : e(a, -1);
							}), q(e, n);
						}), M(n), M(t), q(e, t);
					};
					Y(x, (e) => {
						W(dr).length && e(S);
					}), M(t), V(() => {
						n = Zr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(y) === "mobile" }), Q(t, "title", W(y) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => ur("text")), G("click", o, () => ur("text-box")), G("click", s, () => ur("button")), G("change", l, mr), G("click", u, () => ur("video")), G("click", d, () => ur("icon")), G("click", f, () => ur("samling")), G("click", h, () => ur("shape-line")), G("click", g, () => ur("shape-arrow")), G("click", _, () => ur("shape-circle")), G("click", v, () => ur("shape-rect")), G("click", b, () => ur("shape-triangle")), q(e, t);
				}, f = (e) => {
					var t = Va(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					M(r), M(n);
					var a = B(n, 2);
					X(a);
					var o = B(a, 2), s = R(o);
					X(s), N(), M(o), N(2), M(t), V(() => {
						J(i, `${W(_).size ?? ""} px`), Z(a, W(_).size), ii(s, W(_).snap !== !1);
					}), G("input", a, (e) => dt("size", Number(e.target.value))), G("change", s, (e) => dt("snap", e.target.checked)), q(e, t);
				}, p = (e) => {
					var t = uo(), r = R(t), a = (e) => {
						var t = $a(), n = z(t), r = R(n);
						M(n);
						var i = B(n, 2), a = (e) => {
							var t = Ha(), n = R(t), r = B(R(n));
							X(r), M(n);
							var i = B(n, 2), a = B(R(i));
							X(a), M(i);
							var o = B(i, 2), s = B(R(o));
							X(s), M(o);
							var c = B(o, 2), l = B(R(c));
							X(l), M(c);
							var u = B(c, 2), d = B(R(u));
							X(d), M(u);
							var f = B(u, 2), p = B(R(f));
							X(p), M(f), M(t), V(() => {
								Z(r, W(k).frame.x), Z(a, W(k).frame.y), Z(s, W(k).frame.w), Z(l, W(k).frame.h), Z(d, W(k).frame.z ?? 1), Z(p, W(k).frame.rot ?? 0);
							}), G("change", r, (e) => ke("x", Number(e.target.value))), G("change", a, (e) => ke("y", Number(e.target.value))), G("change", s, (e) => ke("w", Number(e.target.value))), G("change", l, (e) => ke("h", Number(e.target.value))), G("change", d, (e) => ke("z", Number(e.target.value))), G("change", p, (e) => ke("rot", Number(e.target.value))), q(e, t);
						};
						Y(i, (e) => {
							W(y) === "desktop" && e(a);
						});
						var o = B(i, 2), s = R(o);
						X(s), N(), M(o);
						var c = B(o, 4), l = (e) => {
							var t = Ua(), n = z(t), r = B(R(n));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.align ?? "left");
								$(r, {
									get value() {
										return W(e);
									},
									options: [
										["left", "Venstre"],
										["center", "Midtstilt"],
										["right", "Høyre"]
									],
									onchange: (e) => A("align", e)
								});
							}
							M(n);
							var i = B(n, 2), a = R(i);
							X(a), N(), M(i);
							var o = B(i, 2), s = B(R(o));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv fra tema"], ...Un.map(([e, t]) => [t, e])]);
								$(s, {
									get value() {
										return W(e);
									},
									get options() {
										return W(t);
									},
									onchange: (e) => A("font", e || null)
								});
							}
							M(o);
							var c = B(o, 4), l = R(c);
							let u;
							var d = B(l, 2);
							zr(d, 17, () => je, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = xa();
								let o;
								var s = R(a, !0);
								M(a), V(() => {
									o = Zr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: W(k).props.size === i() }), Q(a, "title", `${i() ?? ""} px`), J(s, r());
								}), G("click", a, () => A("size", i())), q(e, a);
							});
							var f = B(d, 2);
							X(f), M(c), N(2), V((e) => {
								ii(a, e), u = Zr(l, 1, "tbtn svelte-1n46o8q", null, u, { active: !W(k).props.size }), Z(f, W(k).props.size ?? "");
							}, [() => !!W(k).props.box]), G("change", a, (e) => A("box", e.target.checked)), G("click", l, () => A("size", null)), G("change", f, (e) => A("size", e.target.value ? Number(e.target.value) : null)), q(e, t);
						}, u = (e) => {
							var t = Ga(), n = z(t), r = B(R(n));
							X(r), M(n);
							var i = B(n, 2), a = B(R(i));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(a, {
									get value() {
										return W(e);
									},
									get options() {
										return W(t);
									},
									onchange: (e) => {
										let t = e === "__href" ? null : e;
										Oe(`edit:${W(k).blockId}`, (e) => {
											e.props.page = t, t && (e.props.href = null);
										});
									}
								});
							}
							M(i);
							var o = B(i, 2), s = (e) => {
								var t = Wa();
								X(t), V(() => Z(t, W(k).props.href === "#" ? "" : W(k).props.href ?? "")), G("change", t, (e) => A("href", e.target.value || null)), q(e, t);
							};
							Y(o, (e) => {
								W(k).props.page || e(s);
							});
							var c = B(o, 2);
							$(B(R(c)), {
								get value() {
									return W(k).props.style;
								},
								options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
								onchange: (e) => A("style", e)
							}), M(c), V(() => Z(r, W(k).props.label)), G("change", r, (e) => A("label", e.target.value)), q(e, t);
						}, d = (e) => {
							var t = Ka(), n = z(t), r = B(R(n));
							M(n);
							var i = B(n, 2), a = B(R(i));
							X(a), M(i);
							var o = B(i, 2), s = B(R(o));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.fit ?? "cover");
								$(s, {
									get value() {
										return W(e);
									},
									options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
									onchange: (e) => A("fit", e)
								});
							}
							M(o);
							var c = B(o, 2), l = B(R(c));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.radius ?? "");
								$(l, {
									get value() {
										return W(e);
									},
									options: [
										["", "Ingen"],
										["sm", "Liten"],
										["md", "Stor"]
									],
									onchange: (e) => A("radius", e || null)
								});
							}
							M(c);
							var u = B(c, 2), d = B(R(u));
							X(d), M(u);
							var f = B(u, 2), p = B(R(f)), m = R(p);
							M(p), M(f);
							var h = B(f, 2);
							X(h);
							var g = B(h, 2), _ = B(R(g)), v = R(_);
							M(_), M(g);
							var y = B(g, 2);
							X(y);
							var b = B(y, 2), x = B(R(b)), S = R(x);
							M(x), M(b);
							var C = B(b, 2);
							X(C);
							var w = B(C, 2), T = B(R(w)), E = R(T);
							M(T), M(w);
							var ee = B(w, 2);
							X(ee);
							var te = B(ee, 2), ne = B(R(te)), re = R(ne);
							M(ne), M(te);
							var D = B(te, 2);
							X(D);
							var ie = B(D, 2);
							V((e, t, n, r, i) => {
								Z(a, W(k).props.alt ?? ""), Z(d, W(k).props.href ?? ""), J(m, `${e ?? ""}%`), Z(h, W(k).props.x ?? .5), J(v, `${t ?? ""}%`), Z(y, W(k).props.y ?? .5), J(S, `${n ?? ""}%`), Z(C, W(k).props.brightness ?? 1), J(E, `${r ?? ""}%`), Z(ee, W(k).props.contrast ?? 1), J(re, `${i ?? ""}%`), Z(D, W(k).props.saturate ?? 1);
							}, [
								() => Math.round((W(k).props.x ?? .5) * 100),
								() => Math.round((W(k).props.y ?? .5) * 100),
								() => Math.round((W(k).props.brightness ?? 1) * 100),
								() => Math.round((W(k).props.contrast ?? 1) * 100),
								() => Math.round((W(k).props.saturate ?? 1) * 100)
							]), G("change", r, Ae), G("change", a, (e) => A("alt", e.target.value)), G("change", d, (e) => A("href", e.target.value || null)), G("input", h, (e) => A("x", Number(e.target.value))), G("input", y, (e) => A("y", Number(e.target.value))), G("input", C, (e) => A("brightness", Number(e.target.value))), G("input", ee, (e) => A("contrast", Number(e.target.value))), G("input", D, (e) => A("saturate", Number(e.target.value))), G("click", ie, () => Oe(`edit:${W(k).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), q(e, t);
						}, f = (e) => {
							var t = qa(), n = B(z(t), 2);
							X(n);
							var r = B(n, 2), i = B(R(r));
							X(i), M(r), N(2), V(() => {
								Z(n, W(k).props.url ?? ""), Z(i, W(k).props.title ?? "");
							}), G("change", n, (e) => A("url", e.target.value)), G("change", i, (e) => A("title", e.target.value)), q(e, t);
						}, p = (e) => {
							var t = Ya(), n = z(t), r = B(R(n)), i = R(r);
							{
								let e = /* @__PURE__ */ P(() => W(k).props.glyph ?? "★");
								zi(i, {
									get value() {
										return W(e);
									},
									onpick: (e) => A("glyph", e),
									onimage: (e) => A("image", e)
								});
							}
							var a = B(i, 2);
							X(a), M(r), M(n);
							var o = B(n, 2), s = (e) => {
								var t = Ja(), n = z(t), r = R(n), i = B(r, 2);
								M(n), N(2), V(() => Q(r, "src", W(k).props.image)), G("click", i, () => A("image", null)), q(e, t);
							};
							Y(o, (e) => {
								W(k).props.image && e(s);
							});
							var c = B(o, 2), l = B(R(c));
							X(l), M(c);
							var u = B(c, 2);
							$(B(R(u)), {
								get value() {
									return W(k).props.color;
								},
								get options() {
									return Pe;
								},
								onchange: (e) => A("color", e)
							}), M(u), N(2), V(() => {
								Z(a, W(k).props.glyph ?? ""), Z(l, W(k).props.size ?? 48);
							}), G("change", a, (e) => A("glyph", e.target.value || "★")), G("change", l, (e) => A("size", Number(e.target.value))), q(e, t);
						}, h = (e) => {
							var t = Xa(), n = z(t), r = B(R(n));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...W(Jt).map((e) => [e, W(Yt)[e]?.name ?? e])]);
								$(r, {
									get value() {
										return W(e);
									},
									get options() {
										return W(t);
									},
									onchange: (e) => A("collection", e || null)
								});
							}
							M(n);
							var i = B(n, 2), a = B(R(i));
							{
								let e = /* @__PURE__ */ P(() => W(k).props.view ?? "cards");
								$(a, {
									get value() {
										return W(e);
									},
									options: [
										["cards", "Kort"],
										["list", "Liste"],
										["archive", "Arkiv (per år)"]
									],
									onchange: (e) => A("view", e)
								});
							}
							M(i);
							var o = B(i, 2), s = B(R(o));
							X(s), M(o);
							var c = B(o, 2), l = R(c);
							X(l), N(), M(c), N(2), V(() => {
								Z(s, W(k).props.limit ?? 6), ii(l, W(k).props.newestFirst !== !1);
							}), G("change", s, (e) => A("limit", Number(e.target.value))), G("change", l, (e) => A("newestFirst", e.target.checked)), q(e, t);
						}, g = (e) => {
							var t = Za(), n = z(t);
							$(B(R(n)), {
								get value() {
									return W(k).props.kind;
								},
								get options() {
									return Ne;
								},
								onchange: (e) => A("kind", e)
							}), M(n);
							var r = B(n, 2);
							$(B(R(r)), {
								get value() {
									return W(k).props.color;
								},
								get options() {
									return Pe;
								},
								onchange: (e) => A("color", e)
							}), M(r);
							var i = B(r, 2), a = B(R(i));
							X(a), M(i);
							var o = B(i, 2), s = R(o);
							X(s), N(), M(o), V((e) => {
								Z(a, W(k).props.thickness), ii(s, e);
							}, [() => !!W(k).props.fill]), G("change", a, (e) => A("thickness", Number(e.target.value))), G("change", s, (e) => A("fill", e.target.checked ? W(k).props.color : null)), q(e, t);
						};
						Y(c, (e) => {
							W(k).type === "text" ? e(l) : W(k).type === "button" ? e(u, 1) : W(k).type === "image" ? e(d, 2) : W(k).type === "video" ? e(f, 3) : W(k).type === "icon" ? e(p, 4) : W(k).type === "samling" ? e(h, 5) : W(k).type === "shape" && e(g, 6);
						});
						var _ = B(c, 4), v = B(R(_));
						{
							let e = /* @__PURE__ */ P(() => W(k).animation?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(ua).map(([e, t]) => [e, t.label])]);
							$(v, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => nt(e || null)
							});
						}
						M(_);
						var b = B(_, 2), x = (e) => {
							var t = Qa(), n = z(t), r = B(R(n));
							X(r), M(n);
							var i = B(n, 2), a = B(R(i));
							X(a), M(i), N(2), V(() => {
								Z(r, W(k).animation.props.duration), Z(a, W(k).animation.props.delay);
							}), G("change", r, (e) => rt("duration", Number(e.target.value))), G("change", a, (e) => rt("delay", Number(e.target.value))), q(e, t);
						};
						Y(b, (e) => {
							W(k).animation && ua[W(k).animation.type]?.entrance && e(x);
						}), V(() => {
							J(r, `${Me[W(k).type] ?? W(k).type ?? ""}-blokk`), ii(s, W(k).decor);
						}), G("change", s, (e) => j(e.target.checked)), q(e, t);
					}, o = (e) => {
						var t = co(), r = B(z(t), 2), a = B(R(r));
						X(a), M(r);
						var o = B(r, 6), s = R(o);
						X(s), N(), M(o);
						var c = B(o, 2), l = (e) => {
							var t = eo(), n = z(t), r = B(R(n)), i = R(r);
							M(r), M(n);
							var a = B(n, 2);
							X(a), V(() => {
								J(i, `${W(Ie).size ?? ""} px`), Z(a, W(Ie).size);
							}), G("input", a, (e) => ut("size", Number(e.target.value))), q(e, t);
						};
						Y(c, (e) => {
							W(Ie) && e(l);
						});
						var u = B(c, 8);
						zr(u, 17, () => W(ze), Fr, (e, t, r) => {
							var a = so(), o = R(a), s = R(o);
							{
								let e = /* @__PURE__ */ P(() => n.map(([e, t]) => [e, t.label]));
								$(s, {
									get value() {
										return W(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return W(e);
									},
									onchange: (e) => Qe(r, e)
								});
							}
							var c = B(s, 2), l = R(c);
							l.disabled = r === 0, Gr(l, () => i.up, !0), M(l);
							var u = B(l, 2);
							Gr(u, () => i.down, !0), M(u);
							var d = B(u, 2);
							Gr(d, () => i.cross, !0), M(d), M(c), M(o);
							var f = B(o, 2), p = (e) => {
								var n = to(), i = z(n), a = B(R(i));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(a, {
										get value() {
											return W(t).props.value;
										},
										get tokens() {
											return W(e);
										},
										label: "Lagets farge",
										onchange: (e) => Xe(r, "value", e)
									});
								}
								M(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								M(s), M(o);
								var l = B(o, 2);
								X(l), V((e) => {
									J(c, `${e ?? ""}%`), Z(l, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", l, (e) => Xe(r, "opacity", Number(e.target.value))), q(e, n);
							}, m = (e) => {
								var n = no(), i = z(n), a = B(R(i));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(a, {
										get value() {
											return W(t).props.stops[0];
										},
										get tokens() {
											return W(e);
										},
										label: "Gradient fra",
										onchange: (e) => Ze(r, 0, e)
									});
								}
								M(i);
								var o = B(i, 2), s = B(R(o));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(s, {
										get value() {
											return W(t).props.stops[W(t).props.stops.length - 1];
										},
										get tokens() {
											return W(e);
										},
										label: "Gradient til",
										onchange: (e) => Ze(r, W(t).props.stops.length - 1, e)
									});
								}
								M(o);
								var c = B(o, 2), l = B(R(c)), u = R(l);
								M(l), M(c);
								var d = B(c, 2);
								X(d);
								var f = B(d, 2), p = B(R(f)), m = R(p);
								M(p), M(f);
								var h = B(f, 2);
								X(h);
								var g = B(h, 2), _ = R(g);
								X(_), N(), M(g), V((e, n) => {
									J(u, `${W(t).props.angle ?? ""}°`), Z(d, W(t).props.angle), J(m, `${e ?? ""}%`), Z(h, W(t).props.opacity ?? 1), ii(_, n);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100), () => !!W(t).props.animate]), G("input", d, (e) => Xe(r, "angle", Number(e.target.value))), G("input", h, (e) => Xe(r, "opacity", Number(e.target.value))), G("change", _, (e) => Xe(r, "animate", e.target.checked)), q(e, n);
							}, h = (e) => {
								var n = ro(), i = z(n), a = B(R(i));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(a, {
										get value() {
											return W(t).props.color;
										},
										get tokens() {
											return W(e);
										},
										label: "Glødens farge",
										onchange: (e) => Xe(r, "color", e)
									});
								}
								M(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								M(s), M(o);
								var l = B(o, 2);
								X(l);
								var u = B(l, 2), d = B(R(u)), f = R(d);
								M(d), M(u);
								var p = B(u, 2);
								X(p);
								var m = B(p, 2), h = B(R(m)), g = R(h);
								M(h), M(m);
								var _ = B(m, 2);
								X(_);
								var v = B(_, 2), y = B(R(v)), b = R(y);
								M(y), M(v);
								var x = B(v, 2);
								X(x), V((e, n, r, i) => {
									J(c, `${e ?? ""}%`), Z(l, W(t).props.x), J(f, `${n ?? ""}%`), Z(p, W(t).props.y), J(g, `${r ?? ""}%`), Z(_, W(t).props.radius), J(b, `${i ?? ""}%`), Z(x, W(t).props.opacity);
								}, [
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", l, (e) => Xe(r, "x", Number(e.target.value))), G("input", p, (e) => Xe(r, "y", Number(e.target.value))), G("input", _, (e) => Xe(r, "radius", Number(e.target.value))), G("input", x, (e) => Xe(r, "opacity", Number(e.target.value))), q(e, n);
							}, g = (e) => {
								var n = io(), i = z(n), a = B(R(i)), o = R(a);
								M(a), M(i);
								var s = B(i, 2);
								X(s), V((e) => {
									J(o, `${e ?? ""}%`), Z(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => Xe(r, "opacity", Number(e.target.value))), q(e, n);
							}, _ = (e) => {
								var n = oo(), i = z(n), a = R(i), o = B(a);
								M(i);
								var s = B(i, 2), c = B(R(s));
								{
									let e = /* @__PURE__ */ P(() => W(t).props.fit ?? "cover");
									$(c, {
										get value() {
											return W(e);
										},
										options: [
											["cover", "Fyll (beskjæres)"],
											["contain", "Vis hele"],
											["repeat", "Gjenta (mønster)"]
										],
										onchange: (e) => Xe(r, "fit", e)
									});
								}
								M(s);
								var l = B(s, 2), u = (e) => {
									var n = ao(), i = z(n), a = B(R(i)), o = R(a);
									M(a), M(i);
									var s = B(i, 2);
									X(s);
									var c = B(s, 2), l = B(R(c)), u = R(l);
									M(l), M(c);
									var d = B(c, 2);
									X(d), V((e, n) => {
										J(o, `${e ?? ""}%`), Z(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), Z(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => Xe(r, "x", Number(e.target.value))), G("input", d, (e) => Xe(r, "y", Number(e.target.value))), q(e, n);
								};
								Y(l, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = B(l, 2), f = B(R(d)), p = R(f);
								M(f), M(d);
								var m = B(d, 2);
								X(m);
								var h = B(m, 2), g = B(R(h)), _ = R(g);
								M(g), M(h);
								var v = B(h, 2);
								X(v), V((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), J(p, `${W(t).props.blur ?? 0 ?? ""} px`), Z(m, W(t).props.blur ?? 0), J(_, `${e ?? ""}%`), Z(v, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => $e(r, e)), G("input", m, (e) => Xe(r, "blur", Number(e.target.value))), G("input", v, (e) => Xe(r, "opacity", Number(e.target.value))), q(e, n);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(m, 1) : W(t).type === "glow" ? e(h, 2) : W(t).type === "grain" ? e(g, 3) : W(t).type === "image" && e(_, 4);
							}), M(a), V(() => u.disabled = r === W(ze).length - 1), G("click", l, () => Ye(r, -1)), G("click", u, () => Ye(r, 1)), G("click", d, () => Je(r)), q(e, a);
						});
						var d = B(u, 2), f = B(R(d));
						{
							let e = /* @__PURE__ */ P(() => n.map(([e, t]) => [e, t.label]));
							$(f, {
								get value() {
									return W(Ke);
								},
								get options() {
									return W(e);
								},
								onchange: (e) => L(Ke, e, !0)
							});
						}
						M(d);
						var p = B(d, 2), m = B(p, 4), h = B(R(m));
						{
							let e = /* @__PURE__ */ P(() => W(Be)?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(ua).map(([e, t]) => [e, t.label])]);
							$(h, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => at(e || null)
							});
						}
						M(m);
						var g = B(m, 2), _ = (e) => {
							var t = Qa(), n = z(t), r = B(R(n));
							X(r), M(n);
							var i = B(n, 2), a = B(R(i));
							X(a), M(i), N(2), V(() => {
								Z(r, W(Be).props.duration), Z(a, W(Be).props.delay);
							}), G("change", r, (e) => ot("duration", Number(e.target.value))), G("change", a, (e) => ot("delay", Number(e.target.value))), q(e, t);
						};
						Y(g, (e) => {
							W(Be) && ua[W(Be).type]?.entrance && e(_);
						}), V(() => {
							Z(a, W(Le)), ii(s, W(Ie) !== null);
						}), G("change", a, (e) => st(e.target.value)), G("change", s, (e) => lt(e.target.checked)), G("click", p, () => qe(W(Ke))), q(e, t);
					}, s = (e) => {
						q(e, lo());
					};
					Y(r, (e) => {
						W(k) ? e(a) : W(Fe) ? e(o, 1) : e(s, -1);
					}), M(t), q(e, t);
				}, h = (e) => {
					var t = fo(), n = B(R(t), 2), r = R(n);
					X(r), N(), M(n);
					var i = B(n, 4);
					it(i), Q(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = B(i, 4), o = B(R(a));
					{
						let e = /* @__PURE__ */ P(() => W(E).footer?.align ?? "center");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => Ln("footer", (t) => {
								t.align = e;
							})
						});
					}
					M(a), N(2), M(t), V((e) => {
						ii(r, e), Z(i, W(E).footer?.text ?? "");
					}, [() => !!W(E).footer?.show]), G("change", r, (e) => Ln("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", i, (e) => Ln("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), q(e, t);
				}, v = (e) => {
					var t = vo(), n = B(R(t), 2), r = (e) => {
						var t = po(), n = B(R(t));
						{
							let e = /* @__PURE__ */ P(() => W(Xt) ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...W(Jt).map((e) => [e, W(Yt)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => L(Xt, e || null, !0)
							});
						}
						M(t), q(e, t);
					};
					Y(n, (e) => {
						W(Jt).length && e(r);
					});
					var a = B(n, 2), o = (e) => {
						let t = /* @__PURE__ */ P(() => W(Yt)[W(Xt)]);
						var n = _o(), r = z(n), a = R(r), o = B(a, 2);
						Gr(o, () => i.cross, !0), M(o), M(r);
						var s = B(r, 2);
						zr(s, 19, () => W(t).entries, (e) => e.id, (e, n, r) => {
							var a = ho(), o = R(a), s = R(o);
							M(o);
							var c = B(o, 2), l = R(c), u = R(l);
							X(u);
							var d = B(u, 2), f = R(d);
							Gr(f, () => i.up, !0), M(f);
							var p = B(f, 2);
							Gr(p, () => i.down, !0), M(p);
							var m = B(p, 2);
							Gr(m, () => i.cross, !0), M(m), M(d), M(l);
							var h = B(l, 2), g = B(R(h));
							X(g), M(h);
							var _ = B(h, 2);
							it(_);
							var v = B(_, 2), y = B(R(v));
							X(y), M(v);
							var b = B(v, 2), x = R(b), S = R(x), C = B(S);
							M(x);
							var w = B(x, 2), T = (e) => {
								var t = mo(), r = z(t), a = B(r, 2);
								Gr(a, () => i.cross, !0), M(a), V(() => Q(r, "src", W(n).image)), G("click", a, () => dn(W(Xt), W(n).id, "image", "")), q(e, t);
							};
							Y(w, (e) => {
								W(n).image && e(T);
							}), M(b), M(c), M(a), V((e) => {
								J(s, `${e ?? ""}${W(n).date ? ` · ${W(n).date}` : ""}`), Z(u, W(n).title), f.disabled = W(r) === 0, p.disabled = W(r) === W(t).entries.length - 1, Z(g, W(n).date ?? ""), Z(_, W(n).text ?? ""), Z(y, W(n).href ?? ""), J(S, `${W(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => W(n).title.replace(/<[^>]*>/g, "")]), G("change", u, (e) => dn(W(Xt), W(n).id, "title", e.target.value || "Uten tittel")), G("click", f, () => fn(W(Xt), W(r), -1)), G("click", p, () => fn(W(Xt), W(r), 1)), G("click", m, () => pn(W(Xt), W(n).id)), G("change", g, (e) => dn(W(Xt), W(n).id, "date", e.target.value)), G("change", _, (e) => dn(W(Xt), W(n).id, "text", e.target.value)), G("change", y, (e) => dn(W(Xt), W(n).id, "href", e.target.value)), G("change", C, (e) => mn(W(Xt), W(n).id, e)), q(e, a);
						});
						var c = B(s, 2), l = (e) => {
							q(e, go());
						};
						Y(c, (e) => {
							W(t).entries.length || e(l);
						}), N(2), G("click", a, () => un(W(Xt))), G("click", o, () => ln(W(Xt))), q(e, n);
					};
					Y(a, (e) => {
						W(Xt) && W(Yt)[W(Xt)] && e(o);
					});
					var s = B(a, 2), c = B(R(s));
					X(c), M(s);
					var l = B(s, 2);
					$(B(R(l)), {
						get value() {
							return W(Qt);
						},
						get options() {
							return $t;
						},
						onchange: (e) => L(Qt, e, !0)
					}), M(l);
					var u = B(l, 2);
					M(t), V((e) => u.disabled = e, [() => !W(Zt).trim()]), G("keydown", c, (e) => e.key === "Enter" && cn()), ci(c, () => W(Zt), (e) => L(Zt, e)), G("click", u, cn), q(e, t);
				}, b = (e) => {
					var t = Do(), n = B(R(t), 2), r = (e) => {
						q(e, yo());
					}, a = /* @__PURE__ */ P(() => !En().length);
					Y(n, (e) => {
						W(a) && e(r);
					});
					var o = B(n, 2);
					zr(o, 16, En, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => yn[t]), r = /* @__PURE__ */ P(() => (W(vn)?.enabled ?? []).includes(t));
						var a = So();
						let o;
						var s = R(a), c = R(s), l = R(c, !0);
						M(c);
						var u = B(c, 2), d = (e) => {
							var t = bo(), r = R(t);
							M(t), V(() => J(r, `v${W(n).version ?? ""}`)), q(e, t);
						};
						Y(u, (e) => {
							W(n)?.version && e(d);
						});
						var f = B(u, 2), p = R(f), m = R(p);
						X(m);
						var h = B(m);
						M(p);
						var g = B(p, 2);
						Gr(g, () => i.cross, !0), M(g), M(f), M(s);
						var _ = B(s, 2), v = (e) => {
							var t = xo(), r = R(t, !0);
							M(t), V((e) => J(r, e), [() => W(n).errors.join("; ")]), q(e, t);
						}, y = (e) => {
							var t = xo(), r = R(t);
							M(t), V(() => J(r, `Krever motorversjon ${W(n).requiresEngine ?? ""} (denne siden kjører ${W(xn) ?? ""}); pluginen hoppes over ved lasting.`)), q(e, t);
						}, b = (e) => {
							var t = xo(), r = R(t);
							M(t), V((e) => J(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(W(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(W(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), q(e, t);
						};
						Y(_, (e) => {
							W(n)?.errors?.length ? e(v) : W(n) && !W(n).satisfied ? e(y, 1) : W(n)?.csp && e(b, 2);
						}), M(a), V((e) => {
							o = Zr(a, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": W(n)?.errors?.length }), J(l, W(n)?.name ?? t), Q(p, "title", W(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ii(m, W(r)), m.disabled = e, J(h, ` ${W(r) ? "På" : "Av"}`);
						}, [() => !!W(n)?.errors?.length]), G("change", m, (e) => Mn(t, e.target.checked)), G("click", g, () => Pn(t)), q(e, a);
					});
					var s = B(o, 2), c = (e) => {
						var t = wo();
						zr(B(z(t), 4), 16, () => W(wn), (e) => e, (e, t) => {
							var n = Co(), r = R(n), a = R(r), o = R(a, !0);
							M(a);
							var s = B(a, 2), c = (e) => {
								var n = bo(), r = R(n);
								M(n), V(() => J(r, `v${yn[t].version ?? ""}`)), q(e, n);
							};
							Y(s, (e) => {
								yn[t]?.version && e(c);
							});
							var l = B(s, 2), u = R(l);
							Gr(u, () => i.right, !0), M(u), M(l), M(r), M(n), V(() => J(o, yn[t]?.name ?? t)), G("click", u, () => In(t)), q(e, n);
						}), q(e, t);
					};
					Y(s, (e) => {
						W(wn).length && e(c);
					});
					var l = B(s, 2), u = (e) => {
						var t = kr(), n = z(t), r = (e) => {
							q(e, To());
						};
						Y(n, (e) => {
							W(wn).length || e(r);
						}), q(e, t);
					}, d = (e) => {
						var t = Eo(), n = B(z(t), 2);
						X(n);
						var r = B(n, 2), i = B(r, 2), a = (e) => {
							var t = xo(), n = R(t, !0);
							M(t), V(() => J(n, W(Cn))), q(e, t);
						};
						Y(i, (e) => {
							W(Cn) && e(a);
						}), V((e) => r.disabled = e, [() => !W(Sn).trim()]), G("keydown", n, (e) => e.key === "Enter" && Fn()), ci(n, () => W(Sn), (e) => L(Sn, e)), G("click", r, Fn), q(e, t);
					};
					Y(l, (e) => {
						W(Tn) === "ok" ? e(u) : e(d, -1);
					}), M(t), q(e, t);
				}, x = (e) => {
					var t = Mo(), n = B(R(t), 2), r = (e) => {
						q(e, Oo());
					}, i = (e) => {
						var t = Sa(), n = z(t), r = (e) => {
							var t = ko(), n = R(t, !0);
							M(t), V(() => J(n, W(_t))), q(e, t);
						};
						Y(n, (e) => {
							W(_t) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = jo(), n = z(t);
							zr(B(n, 2), 19, () => W(gt), (e) => e.sha, (e, t, n) => {
								var r = Ao();
								let i;
								var a = R(r), o = R(a, !0);
								M(a);
								var s = B(a, 2), c = R(s);
								M(s), M(r), V((e) => {
									i = Zr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), Q(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${bt.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), V(() => {
								n.disabled = W(vt) || !W(g)?.allowed, Q(n, "title", W(g)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, St), q(e, t);
						};
						Y(i, (e) => {
							W(gt).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(gt) === null ? e(r) : e(i, -1);
					}), M(t), q(e, t);
				};
				Y(o, (e) => {
					W(O) === "Sider" ? e(s) : W(O) === "Nav" ? e(l, 1) : W(O) === "Tema" ? e(u, 2) : W(O) === "Blokker" ? e(d, 3) : W(O) === "Grid" ? e(f, 4) : W(O) === "Egenskaper" ? e(p, 5) : W(O) === "Footer" ? e(h, 6) : W(O) === "Samlinger" ? e(v, 7) : W(O) === "Plugins" ? e(b, 8) : W(O) === "Historikk" && e(x, 9);
				}), M(t), V(() => J(a, W(O))), q(e, t);
			};
			Y(a, (e) => {
				W(O) && e(o);
			}), q(e, t);
		};
		Y(r, (e) => {
			W(v) && e(a);
		});
		var o = B(r, 2);
		let s;
		var l = R(o);
		fi(l, (e) => L(h, e), () => W(h)), M(o), M(t), V(() => {
			s = Zr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: W(y) === "mobile" }), Q(l, "src", `/?page=${W(c)}&preview=1`);
		}), br("load", l, F), vr(l), q(e, t);
	}, Wr = (e) => {
		q(e, Io());
	};
	Y(Hr, (e) => {
		W(s) ? e(Ur) : e(Wr, -1);
	});
	var Kr = B(Hr, 2), qr = (e) => {
		var t = Ro(), n = R(t), r = R(n), i = R(r, !0);
		M(r);
		var a = B(r, 2);
		zr(a, 16, () => W(me).lines, (e) => e, (e, t) => {
			var n = Lo(), r = R(n, !0);
			M(n), V(() => J(r, t)), q(e, n);
		});
		var o = B(a, 2), s = R(o), c = R(s, !0);
		M(s);
		var l = B(s, 2), u = R(l, !0);
		M(l), M(o), M(n), M(t), V(() => {
			J(i, W(me).title), J(c, W(me).cancelLabel), J(u, W(me).okLabel);
		}), G("click", s, () => ge(!1)), G("click", l, () => ge(!0)), q(e, t);
	};
	Y(Kr, (e) => {
		W(me) && e(qr);
	});
	var Jr = B(Kr, 2), Yr = (e) => {
		var t = zo(), n = R(t), r = B(R(n), 4), i = B(R(r));
		X(i), M(r);
		var a = B(r, 2);
		Ti(B(R(a)), {
			get value() {
				return W(ye);
			},
			label: "Aksentfarge",
			onchange: (e) => L(ye, e, !0)
		}), M(a);
		var o = B(a, 2);
		Ti(B(R(o)), {
			get value() {
				return W(be);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => L(be, e, !0)
		}), M(o);
		var s = B(o, 4), c = R(s), l = B(c, 2);
		M(s), M(n), M(t), V((e) => l.disabled = e, [() => !W(ve).trim()]), G("keydown", i, (e) => e.key === "Enter" && Se()), ci(i, () => W(ve), (e) => L(ve, e)), G("click", c, xe), G("click", l, Se), q(e, t);
	};
	Y(Jr, (e) => {
		W(_e) && e(Yr);
	});
	var Xr = B(Jr, 2), Qr = (e) => {
		var t = Bo();
		let n;
		var r = R(t), i = R(r, !0);
		M(r);
		var a = B(r, 2);
		M(t), V(() => {
			n = Zr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(d) === "ok",
				error: W(d) === "error"
			}), J(i, W(u));
		}), G("click", a, () => p("")), q(e, t);
	};
	Y(Xr, (e) => {
		W(u) && e(Qr);
	}), M(wr), V(() => K = Zr(Dr, 1, "topbar svelte-1n46o8q", null, K, { hidden: !W(v) })), q(e, wr), Ue();
}
xr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Uo = Ar(Ho, { target: document.getElementById("urd-admin") });
//#endregion
export { Uo as default };
