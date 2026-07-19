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
var k = {}, Se = Symbol("uninitialized"), Ce = "http://www.w3.org/1999/xhtml", A = "http://www.w3.org/2000/svg", we = "http://www.w3.org/1998/Math/MathML";
function Te() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ee(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function De() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function j() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var M = !1;
function Oe(e) {
	M = e;
}
var N;
function ke(e) {
	if (e === null) throw Ee(), k;
	return N = e;
}
function Ae() {
	return ke(/* @__PURE__ */ fn(N));
}
function P(e) {
	if (M) {
		if (/* @__PURE__ */ fn(N) !== null) throw Ee(), k;
		N = e;
	}
}
function je(e = 1) {
	if (M) {
		for (var t = e, n = N; t--;) n = /* @__PURE__ */ fn(n);
		N = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = N;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ fn(n);
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
		r: W,
		l: null
	};
}
function Ue(e) {
	var t = Be, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
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
	var t = W;
	if (t === null) return U.f |= ne, e;
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
	M && /* @__PURE__ */ dn(e) !== null && pn(e);
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
	var t = U, n = W;
	Kn(null), qn(null);
	try {
		return e();
	} finally {
		Kn(t), qn(n);
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
	let t = 0, n = Yt(0), r;
	return () => {
		bn() && (G(n), Dn(() => (t === 0 && (r = mr(() => e(() => $t(n)))), t += 1, () => {
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
	#t = M ? N : null;
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
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (M) {
				let e = this.#t;
				Ae();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ut), M && (this.#e = N);
	}
	#g() {
		try {
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = kn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), qe(() => {
			var e = this.#c = document.createDocumentFragment(), t = un();
			e.append(t), this.#a = this.#x(() => kn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#b(I);
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
		var t = W, n = U, r = Be;
		qn(this.#i), Kn(this.#i), Ve(this.#i.ctx);
		try {
			return It.ensure(), e();
		} catch (e) {
			return Ye(e), null;
		} finally {
			qn(t), Kn(n), Ve(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && In(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, qe(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), M && (ke(this.#t), je(), ke(Me()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				j();
				return;
			}
			r = !0, i && xe(), this.#s !== null && In(this.#s, () => {
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
					return kn(() => {
						var t = W;
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
	var s = W, c = mt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
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
	var e = W, t = U, n = Be, r = I;
	return function(i = !0) {
		qn(e), Kn(t), Ve(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	qn(null), Kn(null), Ve(null), e && I?.deactivate();
}
function gt() {
	var e = W, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | g;
	return W !== null && (W.f |= C), {
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
		parent: W,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = W;
	r === null && de();
	var i = void 0, a = Yt(Se), o = !U, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== le && n.reject(e);
			}).finally(ht);
		} catch (e) {
			n.reject(e), ht();
		}
		var c = I;
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
	}), xn(() => {
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
	return Yn(t), t;
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
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function St(e) {
	var t, n = W, r = e.parent;
	if (!Un && r !== null && e.v !== Se && r.f & 24576) return Te(), e.v;
	qn(r);
	try {
		e.f &= ~E, xt(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = ir(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), Dt?.capture(e, t, !0)), e.deps === null))) {
		Qe(e, h);
		return;
	}
	Un || (Ot === null ? $e(e) : (bn() || I?.is_fork) && Ot.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(le), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), jn(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, I = null, Dt = null, Ot = null, kt = null, At = !1, jt = !1, Mt = null, Nt = null, Pt = 0, Ft = 1, It = class e {
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
		if (I = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Mt = null, Nt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
			i.length > 0 && I.#g();
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
		var s = I;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : ar(r) && (i & 16 && this.#d.add(r), ur(r));
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
		this.oncommit(() => e.discard()), e.#x(), I = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) tt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== Se && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Ot?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, Ot = null;
	}
	flush() {
		try {
			jt = !0, I = this, this.#g();
		} finally {
			Pt = 0, kt = null, Mt = null, Nt = null, jt = !1, I = null, Ot = null, qt.clear();
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
		if (I === null) {
			let t = I = new e();
			!jt && !At && qe(() => {
				t.#e || t.flush();
			});
		}
		return I;
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
			if (Mt !== null && t === W && (U === null || !(U.f & 2))) return;
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
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if (Je(), I === null) return n;
			I.flush();
		}
	} finally {
		At = t;
	}
}
function Rt() {
	try {
		ge();
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
			if (!(r.f & 24576) && ar(r) && (zt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), zt?.size > 0)) {
				qt.clear();
				for (let e of zt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) zt.has(n) && (zt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
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
	I.schedule(e);
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
function L(e, t) {
	let n = Yt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Ie), r;
}
function R(e, t, n = !1) {
	return U !== null && (!Gn || U.f & 131072) && We() && U.f & 4325394 && (Jn === null || !Jn.has(e)) && be(), Zt(e, n ? tn(t) : t, Nt);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Un ? t : e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), Ot === null && $e(t);
		}
		e.wv = ir(), en(e, g, n), We() && W !== null && W.f & 1024 && !(W.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && Qe(e, _);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	Kt.clear();
}
function $t(e) {
	R(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = We(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && Qe(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				Ot?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= E), en(u, _, n));
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
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = U, n = nr;
		Kn(null), rr(d);
		var r = e();
		return Kn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ve();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ L(n.value, u);
				return r.set(t, e), e;
			}) : R(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ L(Se, u));
					r.set(t, e), $t(o);
				}
			} else R(n, Se), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(tn(s ? e[n] : Se), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === Se ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = G(i));
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
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? tn(e[t]) : Se, u)), r.set(t, n)), G(n) === Se) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(Se, u)), r.set(d + "", p)) : R(p, Se);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== Se;
				var m = f(() => tn(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			G(o);
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
function nn(e) {
	try {
		if (typeof e == "object" && e && re in e) return e[re];
	} catch {}
	return e;
}
function rn(e, t) {
	return Object.is(nn(e), nn(t));
}
var an, on, sn, cn;
function ln() {
	if (an === void 0) {
		an = window, on = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = a(t, "firstChild").get, cn = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[O] = void 0);
	}
}
function un(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
function z(e, t) {
	if (!M) return /* @__PURE__ */ dn(e);
	var n = /* @__PURE__ */ dn(N);
	if (n === null) n = N.appendChild(un());
	else if (t && n.nodeType !== 3) {
		var r = un();
		return n?.before(r), ke(r), r;
	}
	return t && gn(n), ke(n), n;
}
function B(e, t = !1) {
	if (!M) {
		var n = /* @__PURE__ */ dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (N?.nodeType !== 3) {
			var r = un();
			return N?.before(r), ke(r), r;
		}
		gn(N);
	}
	return N;
}
function V(e, t = 1, n = !1) {
	let r = M ? N : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!M) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = un();
			return r === null ? i?.after(a) : r.before(a), ke(a), a;
		}
		gn(r);
	}
	return ke(r), r;
}
function pn(e) {
	e.textContent = "";
}
function mn() {
	return !1;
}
function hn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function gn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function _n(e) {
	W === null && (U === null && he(e), me()), Un && pe(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = W;
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
	I?.register_created_effect(r);
	var i = r;
	if (e & 4) Mt === null ? It.ensure().schedule(r) : Mt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return U !== null && !Gn;
}
function xn(e) {
	let t = yn(8, null);
	return Qe(t, h), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = W.f;
	if (!U && t & 32 && Be !== null && !Be.i) {
		var n = Be;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | w, e);
}
function wn(e) {
	It.ensure();
	let t = yn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? In(t, () => {
			Nn(t), n(void 0);
		}) : (Nn(t), n(void 0));
	});
}
function Tn(e) {
	return yn(4, e);
}
function En(e) {
	return yn(te | C, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(G));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | C, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Un, n = U;
		Wn(!0), Kn(null);
		try {
			t.call(null);
		} finally {
			Wn(e), Kn(n);
		}
	}
}
function jn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && st(() => {
			e.abort(le);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Nn(n, t), n = r;
	}
}
function Mn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Nn(t), t = n;
	}
}
function Nn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, jn(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	An(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Pn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ fn(e);
		e.remove(), e = n;
	}
}
function Fn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function In(e, t, n = !0) {
	var r = [];
	Ln(e, r, !0);
	var i = () => {
		n && Nn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Ln(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Ln(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Rn(e) {
	zn(e, !0);
}
function zn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (Qe(e, g), It.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			zn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Bn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ fn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Vn = null, Hn = !1, Un = !1;
function Wn(e) {
	Un = e;
}
var U = null, Gn = !1;
function Kn(e) {
	U = e;
}
var W = null;
function qn(e) {
	W = e;
}
var Jn = null;
function Yn(e) {
	U !== null && (Jn ??= /* @__PURE__ */ new Set()).add(e);
}
var Xn = null, Zn = 0, Qn = null;
function $n(e) {
	Qn = e;
}
var er = 1, tr = 0, nr = tr;
function rr(e) {
	nr = e;
}
function ir() {
	return ++er;
}
function ar(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && Ot === null && Qe(e, h);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? Qe(a, g) : a.f & 1024 && Qe(a, _), Ut(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = U, a = Jn, o = Be, s = Gn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, U = l & 96 ? null : e, Jn = null, Ve(e.ctx), Gn = !1, nr = ++tr, e.ac !== null && (st(() => {
		e.ac.abort(le);
	}), e.ac = null);
	try {
		e.f |= ee;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = I?.is_fork;
		if (Xn !== null) {
			var m;
			if (p || lr(e, Zn), f !== null && Zn > 0) for (f.length = Zn + Xn.length, m = 0; m < Xn.length; m++) f[Zn + m] = Xn[m];
			else e.deps = f = Xn;
			if (bn() && e.f & 512) for (m = Zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Zn < f.length && (lr(e, Zn), f.length = Zn);
		if (We() && Qn !== null && !Gn && f !== null && !(e.f & 6146)) for (m = 0; m < Qn.length; m++) or(Qn[m], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Ye(e);
	} finally {
		e.f ^= ee, Xn = t, Zn = n, Qn = r, U = i, Jn = a, Ve(o), Gn = s, nr = c;
	}
}
function cr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Xn === null || !n.call(Xn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== Se && $e(s), s.ac !== null && st(() => {
			s.ac.abort(le), s.ac = null;
		}), wt(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Qe(e, h);
		var n = W, r = Hn;
		W = e, Hn = (t & 96) == 0;
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var i = sr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = er;
		} finally {
			Hn = r, W = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), Lt();
}
function G(e) {
	var t = (e.f & 2) != 0;
	if (Vn?.add(e), U !== null && !Gn && !(W !== null && W.f & 16384) && (Jn === null || !Jn.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && r !== null && r[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Un && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Un) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = St(a)), qt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Gn && U !== null && (Hn || (U.f & 512) != 0), c = (a.f & b) === 0;
		ar(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), fr(a));
	}
	if (Ot?.has(e)) return Ot.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), fr(t));
}
function pr(e) {
	if (e.v === Se) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var hr = ["touchstart", "touchmove"];
function gr(e) {
	return hr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var _r = Symbol("events"), vr = /* @__PURE__ */ new Set(), yr = /* @__PURE__ */ new Set();
function br(e) {
	if (!M) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return st(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? qe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[_r] ??= {})[e] = n;
}
function Cr(e) {
	for (var t = 0; t < e.length; t++) vr.add(e[t]);
	for (var n of yr) n(e);
}
var wr = null;
function Tr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	wr = e;
	var s = 0, c = wr === e && e[_r];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[_r] = t;
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
		var d = U, f = W;
		Kn(null), qn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[_r]?.[r];
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
			e[_r] = t, delete e.currentTarget, Kn(d), qn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Er = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Dr(e) {
	return Er?.createHTML(e) ?? e;
}
function Or(e) {
	var t = hn("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
	var n = W;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function q(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (M) return kr(N, null), N;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ dn(i)));
		var t = r || on ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ dn(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!M) {
		var t = un(e + "");
		return kr(t, t), t;
	}
	var n = N;
	return n.nodeType === 3 ? gn(n) : (n.before(n = un()), ke(n)), kr(n, n), n;
}
function jr() {
	if (M) return kr(N, null), N;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = un();
	return e.append(t, n), kr(t, n), e;
}
function J(e, t) {
	if (M) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = N), Ae();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[O] ??= e.nodeValue) && (e[O] = n, e.nodeValue = `${n}`);
}
function Mr(e, t) {
	return Pr(e, t);
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	ln();
	var l = void 0, u = wn(() => {
		var s = n ?? t.appendChild(un());
		dt(s, { pending: () => {} }, (t) => {
			He({});
			var n = Be;
			if (o && (n.c = o), a && (i.$$events = a), M && kr(t, null), l = e(t, i) || {}, M && (W.nodes.end = N, N === null || N.nodeType !== 8 || N.data !== "]")) throw Ee(), k;
			Ue();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = gr(r);
					for (let e of [t, document]) {
						var a = Nr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Nr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Tr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(vr)), yr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Nr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Tr), r.delete(e), r.size === 0 && Nr.delete(n)) : r.set(e, i);
			}
			yr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Fr.set(l, u), l;
}
var Fr = /* @__PURE__ */ new WeakMap(), Ir = class {
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
			if (n) Rn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Rn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Nn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Bn(r, t), t.append(un()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Nn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), In(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Nn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = mn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = un();
			i.append(a), this.#n.set(e, {
				effect: kn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, kn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else M && (this.anchor = N), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	M && (r = N, Ae());
	var i = new Ir(e), a = n ? S : 0;
	function o(e, t) {
		if (M) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				ke(a), i.anchor = a, Oe(!1), i.ensure(e, t), Oe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	On(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Lr(e, t) {
	return t;
}
function Rr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		In(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					zr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			pn(d), d.append(u), e.items.clear();
		}
		zr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function zr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Br;
function Z(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = M ? ke(/* @__PURE__ */ dn(u)) : u.appendChild(un());
	}
	M && Ae();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Hr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Wr(d, null, c)) : Rn(d) : In(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: On(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			M && Ne(c) === "[!" != (e === 0) && (c = Me(), ke(c), Oe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = mn(), y = 0; y < e; y += 1) {
				M && N.nodeType === 8 && N.data === "]" && (c = N, t = !0, Oe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Ur(l, h ? c : Br ??= un(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = kn(() => s(c)) : (d = kn(() => s(Br ??= un())), d.f |= T)), e > r.size && fe("", "", ""), M && e > 0 && ke(Me()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Oe(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, M && (c = N);
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
		if (_.f & 8192 && (Rn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Wr(_, null, n);
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
		for (let t of e.outrogroups) t.pending.size === 0 && (zr(e, r(t.done)), e.outrogroups?.delete(t));
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
			Rr(e, w, ee);
		}
	}
	o && qe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Ur(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Wr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
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
		M && (o = ke(/* @__PURE__ */ dn(c)));
	}
	H(() => {
		var e = W;
		if (s === (s = t() ?? "")) {
			M && Ae();
			return;
		}
		if (n && !M) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ dn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Pn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (M) {
				for (var a = N.data, l = Ae(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ fn(l);
				if (l === null) throw Ee(), k;
				kr(N, u), o = ke(l);
				return;
			}
			var d = hn(r ? "svg" : i ? "math" : "template", r ? A : i ? we : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ dn(f), f.lastChild), r || i) for (; /* @__PURE__ */ dn(f);) o.before(/* @__PURE__ */ dn(f));
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
	if (M || o !== n || o === void 0) {
		var s = Jr(n, r, a);
		(!M || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
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
	if (M || i !== t) {
		var a = Zr(t, r);
		(!M || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
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
	for (i of t.options) if (rn(ii(i), n)) {
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
	}), xn(() => {
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
		n(a), e.__value = a, I !== null && r.add(I);
	}), Tn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = I;
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
	if (M) {
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
	M && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === si) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && pi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
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
		if (a = hi(e) ? gi(a) : a, n(a), I !== null && r.add(I), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (M && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(hi(e) ? gi(e.value) : e.value), I !== null && r.add(I)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
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
	var i = Be.r, a = W;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], mr(() => {
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
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), G(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
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
	o && G(y);
	var b = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(y) : i && o ? tn(e) : e;
			return R(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : G(y);
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
var xi = /* @__PURE__ */ q("<button type=\"button\"></button>"), Si = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), wi = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ti = /* @__PURE__ */ q("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/></span> <!> <!></div>"), Ei = /* @__PURE__ */ q("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Di(e, t) {
	He(t, !0);
	let n = yi(t, "value", 3, "#000000"), r = yi(t, "tokens", 19, () => []), i = yi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, s = () => r().find(([e]) => e === n())?.[0] ?? null, c = /* @__PURE__ */ L(tn([])), l = "", u = "", d = /* @__PURE__ */ L(null), f = /* @__PURE__ */ L(!1), p = /* @__PURE__ */ L(tn({
		top: 0,
		left: 0
	})), h = /* @__PURE__ */ L(0), g = /* @__PURE__ */ L(0), _ = /* @__PURE__ */ L(1), v = /* @__PURE__ */ L("#000000");
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
		return b(...S(G(h), G(g), G(_)));
	}
	function w() {
		R(v, C(), !0), u = G(v), t.onchange?.(G(v));
	}
	function T(e) {
		let t = y(e);
		return t ? (((e) => {
			var t = m(e, 3);
			R(h, t[0], !0), R(g, t[1], !0), R(_, t[2], !0);
		})(x(...t)), R(v, b(...t), !0), !0) : !1;
	}
	function E() {
		T(o()) || T("#000000"), l = n(), u = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			R(c, Array.isArray(e) ? e : [], !0);
		} catch {
			R(c, [], !0);
		}
		let e = G(d).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 236, window.innerWidth - 236 - 8)), r = e.bottom + 320 + 8 > window.innerHeight ? Math.max(8, e.top - 320 - 8) : e.bottom + 6;
		R(p, {
			top: r,
			left: t
		}, !0), R(f, !0);
	}
	function ee() {
		if (R(f, !1), u && u !== l) {
			let e = [u, ...G(c).filter((e) => e !== u)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function te(e, n) {
		T(n), R(v, n, !0), t.onchange?.(e);
	}
	function ne(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			R(g, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), R(_, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), w();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function re(e) {
		T(e.target.value) ? w() : R(v, C(), !0);
	}
	function D(e) {
		T(e) && w();
	}
	Sn(() => {
		if (!G(f)) return;
		let e = (e) => {
			G(d) && !G(d).contains(e.target) && ee();
		}, t = (e) => {
			e.key === "Escape" && ee();
		}, n = (e) => {
			G(d) && e.target instanceof Node && !G(d).contains(e.target) && ee();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var ie = Ei(), ae = z(ie);
	let oe;
	var se = V(ae, 2), O = (e) => {
		var t = Ti(), i = z(t), a = z(i);
		P(i);
		var o = V(i, 2);
		Q(o);
		var l = V(o, 2), u = z(l), d = V(u, 2);
		Q(d), P(l);
		var f = V(l, 2), y = (e) => {
			var t = Si(), i = B(t), a = V(z(i)), o = (e) => {
				var t = Ar();
				H((e) => Y(t, `- koblet til «${e ?? ""}»`), [() => s()]), J(e, t);
			}, c = /* @__PURE__ */ F(() => s());
			X(a, (e) => {
				G(c) && e(o);
			}), P(i);
			var l = V(i, 2);
			Z(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ F(() => m(G(t), 2));
				let i = () => G(r)[0], a = () => G(r)[1];
				var o = xi();
				let s;
				H(() => {
					s = Qr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ei(o, `background: ${a() ?? ""}`), ui(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), K("click", o, () => te(i(), a())), J(e, o);
			}), P(l), J(e, t);
		};
		X(f, (e) => {
			r().length && e(y);
		});
		var b = V(f, 2), x = (e) => {
			var t = wi(), n = V(B(t), 2);
			Z(n, 20, () => G(c), (e) => e, (e, t) => {
				var n = Ci();
				H(() => {
					ei(n, `background: ${t ?? ""}`), ui(n, "title", t);
				}), K("click", n, () => D(t)), J(e, n);
			}), P(n), J(e, t);
		};
		X(b, (e) => {
			G(c).length && e(x);
		}), P(t), H(() => {
			ei(t, `top: ${G(p).top ?? ""}px; left: ${G(p).left ?? ""}px`), ei(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${G(h) ?? ""}, 100%, 50%)`), ei(a, `left: ${G(g) * 100}%; top: ${(1 - G(_)) * 100}%`), $(o, G(h)), ei(u, `background: ${G(v) ?? ""}`), $(d, G(v));
		}), K("pointerdown", i, ne), K("input", o, (e) => {
			R(h, Number(e.target.value), !0), w();
		}), K("change", d, re), J(e, t);
	};
	X(se, (e) => {
		G(f) && e(O);
	}), P(ie), vi(ie, (e) => R(d, e), () => G(d)), H((e, t, n) => {
		oe = Qr(ae, 1, "cp-swatch svelte-zxiloo", null, oe, e), ei(ae, `background: ${t ?? ""}`), ui(ae, "title", n), ui(ae, "aria-label", i());
	}, [
		() => ({ linked: s() }),
		() => o(),
		() => s() ? `${i()} (koblet til temafargen «${s()}»)` : i()
	]), K("click", ae, () => G(f) ? ee() : E()), J(e, ie), Ue();
}
Cr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region src/lib/imageTools.js
var Oi = 1600, ki = .82, Ai = .6;
async function ji(e, t = Oi) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(ki);
	return c.size > 4e5 && (c = await s(Ai)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function Mi(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Ni(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Pi = /* @__PURE__ */ q("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Fi = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ii = /* @__PURE__ */ q("<button type=\"button\"> </button>"), Li = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ri = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), zi = /* @__PURE__ */ q("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!></div>"), Bi = /* @__PURE__ */ q("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"> </button> <!></span>");
function Vi(e, t) {
	He(t, !0);
	let n = yi(t, "value", 3, "★"), r = yi(t, "label", 3, "Velg tegn"), i = "urd-recent-glyphs", a = [
		["Symboler", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
		["Piler", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
		["Smilefjes", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
		["Gester og folk", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
		["Natur", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
		["Mat og drikke", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
		["Aktivitet", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
		["Objekter", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
		["Hjerter", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
	], o = /* @__PURE__ */ L(tn([])), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(tn({
		top: 0,
		left: 0
	}));
	function d() {
		try {
			let e = JSON.parse(localStorage.getItem(i) ?? "[]");
			R(o, Array.isArray(e) ? e : [], !0);
		} catch {
			R(o, [], !0);
		}
		let e = G(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		R(u, {
			top: n,
			left: t
		}, !0), R(l, !0);
	}
	function f(e) {
		let n = [e, ...G(o).filter((t) => t !== e)].slice(0, 16);
		localStorage.setItem(i, JSON.stringify(n)), t.onpick?.(e), R(l, !1);
	}
	async function p(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ji(n, 256);
		t.onimage?.(r.dataUrl), R(l, !1);
	}
	Sn(() => {
		if (!G(l)) return;
		let e = (e) => {
			G(s) && !G(s).contains(e.target) && R(l, !1);
		}, t = (e) => {
			e.key === "Escape" && R(l, !1);
		}, n = (e) => {
			G(s) && e.target instanceof Node && !G(s).contains(e.target) && R(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var h = Bi(), g = z(h), _ = z(g, !0);
	P(g);
	var v = V(g, 2), y = (e) => {
		var r = zi(), i = z(r), s = (e) => {
			var t = Fi(), n = V(B(t), 2);
			Z(n, 20, () => G(o), (e) => e, (e, t) => {
				var n = Pi(), r = z(n, !0);
				P(n), H(() => Y(r, t)), K("click", n, () => f(t)), J(e, n);
			}), P(n), J(e, t);
		};
		X(i, (e) => {
			G(o).length && e(s);
		});
		var l = V(i, 2);
		Z(l, 17, () => a, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ F(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = Li(), s = B(o), c = z(s, !0);
			P(s);
			var l = V(s, 2);
			Z(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Ii();
				let i;
				var a = z(r, !0);
				P(r), H(() => {
					i = Qr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), Y(a, t);
				}), K("click", r, () => f(t)), J(e, r);
			}), P(l), H(() => Y(c, i())), J(e, o);
		});
		var d = V(l, 2), h = (e) => {
			var t = Ri(), n = V(B(t), 2), r = V(n, 2);
			vi(r, (e) => R(c, e), () => G(c)), je(2), K("click", n, () => G(c).click()), K("change", r, p), J(e, t);
		};
		X(d, (e) => {
			t.onimage && e(h);
		}), P(r), H(() => ei(r, `top: ${G(u).top ?? ""}px; left: ${G(u).left ?? ""}px`)), J(e, r);
	};
	X(v, (e) => {
		G(l) && e(y);
	}), P(h), vi(h, (e) => R(s, e), () => G(s)), H(() => {
		ui(g, "title", r()), ui(g, "aria-label", r()), Y(_, n() || "★");
	}), K("click", g, () => G(l) ? R(l, !1) : d()), J(e, h), Ue();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Hi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n);
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
		sendViewport(e) {
			r({
				type: "urd-viewport",
				mode: e
			});
		},
		sendCloseMenus() {
			r({ type: "urd-close-menus" });
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
var Ui = (e) => Math.round(e * 100) / 100;
function Wi(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var Gi = {
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
					x: Ui(n.x * 100 / r.columns),
					w: Ui(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Wi(t.grid);
		return e;
	}
}, Ki = { 1: (e) => (e.grid = Wi(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function qi(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Ki[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Ji(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = Gi[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function Yi(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Xi = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Zi(e, t) {
	let n = Yi(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Yi(t[2]), a = Xi(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Qi = /^[a-z0-9][a-z0-9-]*$/;
function $i(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (Qi.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Yi(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function ea(e) {
	return `${e}-${(typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 8)}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function ta(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var na = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ta(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, ra = {
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
		let n = t.stops.map(ta).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, ia = {
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
		let n = ta(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, aa = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", oa = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = aa, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, sa = {
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
}, ca = () => ({
	duration: 600,
	delay: 0
}), la = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: ca,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: ca,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: ca,
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
var ua = /* @__PURE__ */ q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), da = /* @__PURE__ */ q("<option class=\"svelte-1n46o8q\"> </option>"), fa = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), pa = /* @__PURE__ */ q("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ma = /* @__PURE__ */ q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), ha = /* @__PURE__ */ q("<!> Ren visning", 1), ga = /* @__PURE__ */ q("<!> Rediger", 1), _a = /* @__PURE__ */ q("<span class=\"who svelte-1n46o8q\"><!> </span>"), va = /* @__PURE__ */ q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), ya = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), ba = /* @__PURE__ */ q("<hr class=\"rail-sep svelte-1n46o8q\"/>"), xa = /* @__PURE__ */ q("<button> </button>"), Sa = /* @__PURE__ */ q("<!> <!>", 1), Ca = /* @__PURE__ */ q("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), wa = /* @__PURE__ */ q("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ta = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Ea = /* @__PURE__ */ q("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), Da = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Oa = /* @__PURE__ */ q("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><select title=\"Font (Arv = temaets overskriftsfont)\" class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv</option><!></select> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), ka = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Aa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rekkefølge <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Bilde først</option><option class=\"svelte-1n46o8q\">Tekst først</option></select></label>"), ja = /* @__PURE__ */ q("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Ma = /* @__PURE__ */ q("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <select class=\"nav-target svelte-1n46o8q\" title=\"Hvor lenken går\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Na = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde</option><option class=\"svelte-1n46o8q\">Bilde + tekst</option></select></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Høyre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Venstre (etter logoen)</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsbilde i menyen og menypunkt-design kommer i en senere runde.</p></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button></div></details></div>"), Pa = /* @__PURE__ */ q("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Fa = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), Ia = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>"), La = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; skaleres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Firkantet bilde anbefales.</p></div>"), Ra = /* @__PURE__ */ q("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), za = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ba = /* @__PURE__ */ q("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Va = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv fra tema</option><!></select></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Ha = /* @__PURE__ */ q("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ua = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Wa = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), Ga = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Ka = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), qa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tegn/emoji <span class=\"toolbar-row svelte-1n46o8q\"><!> <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Ja = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ya = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Xa = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Za = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Qa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), $a = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), eo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), to = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), no = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ro = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), io = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), ao = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), oo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), so = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), co = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), lo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), uo = /* @__PURE__ */ q("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), fo = /* @__PURE__ */ q("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), po = /* @__PURE__ */ q("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), mo = /* @__PURE__ */ q("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), ho = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), go = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), _o = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. eksempel-kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), vo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), yo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), bo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), xo = /* @__PURE__ */ q("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), So = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Co = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), wo = /* @__PURE__ */ q("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), To = /* @__PURE__ */ q("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Eo = /* @__PURE__ */ q("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Do = /* @__PURE__ */ q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Oo = /* @__PURE__ */ q("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), ko = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Ao = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), jo = /* @__PURE__ */ q("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Mo = /* @__PURE__ */ q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <select class=\"admin-theme svelte-1n46o8q\" title=\"Adminens fargetema (kun editoren, ikke nettsiden din)\"></select> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!></div>");
function No(e, t) {
	He(t, !0);
	let n = [
		["color", na],
		["gradient", ra],
		["glow", ia],
		["image", sa],
		["grain", oa]
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
	], o = /* @__PURE__ */ L(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	Sn(() => {
		document.documentElement.dataset.adminTheme = G(o), localStorage.setItem("urd-admin-theme", G(o));
	});
	let s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(""), d = /* @__PURE__ */ L("info"), f = 0;
	function p(e, t = "info") {
		R(u, e, !0), R(d, t, !0);
		let n = ++f;
		t === "ok" && setTimeout(() => {
			f === n && (R(u, ""), R(d, "info"));
		}, 8e3);
	}
	let h = /* @__PURE__ */ L(null), g = /* @__PURE__ */ L(null), _ = /* @__PURE__ */ L(tn({
		size: 16,
		snap: !0
	})), v = /* @__PURE__ */ L(!0), y = /* @__PURE__ */ L("desktop");
	Sn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Sn(() => {
		let e = G(y);
		T?.sendViewport(e);
	});
	let b = /* @__PURE__ */ L(0);
	function x() {
		R(b, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function S(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, x(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ L(null);
	function ee() {
		R(E, w.data, !0), w.replace(G(E));
	}
	function te() {
		T?.sendSite(Re(G(E)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => G(E).pages.find((e) => e.id === G(c));
	function D() {
		let e = G(E)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		R(l, e || C?.hasDraft() && !ne.has(G(c)) || w?.hasDraft() || Wt?.hasDraft() || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			pageId: G(c),
			page: C.data,
			site: w.data
		});
	}
	function O(e) {
		e === oe && (e.startsWith("edit:") || e.startsWith("grid:")) || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function ce(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), ee(), w.save(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), te(), t && t !== G(c) && G(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), wt(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), x(), Te(), Be(C.data.sections.find((e) => e.id === G(Pe))), G(E).pages.some((e) => e.id === G(c)) ? T?.sendPage(G(c), C.data) : wt(G(E).pages[0].id, { keepHistory: !0 });
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
		R(s, qi(await (await fetch("/content/site.json")).json()), !0), w = bi("urd-draft-site", () => G(s)), w.replace(qi(w.data)), w.save(), ee(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), await wt(new URLSearchParams(location.search).get("page") ?? G(E).pages[0].id), await rn(), await dt(), pt(), (G(E).site.setup === !0 || G(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (R(_e, G(E).site.title, !0), R(ve, G(E).theme.tokens.color.accent, !0), R(ye, G(E).theme.tokens.color.bg, !0), R(ge, !0));
	}
	let pe = /* @__PURE__ */ L(null);
	function me({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			R(pe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function he(e) {
		G(pe)?.resolve(e), R(pe, null);
	}
	let ge = /* @__PURE__ */ L(!1), _e = /* @__PURE__ */ L(""), ve = /* @__PURE__ */ L("#7c5cff"), ye = /* @__PURE__ */ L("#0b0e14");
	function be() {
		localStorage.setItem("urd-setup-done", "1"), R(ge, !1);
	}
	function xe() {
		let e = G(_e).trim();
		e && (Dt("setup", () => {
			G(E).site.title = e, G(E).nav.logo = {
				type: "text",
				value: e
			}, G(E).theme.tokens.color.accent = G(ve), G(E).theme.tokens.color.bg = G(ye), delete G(E).site.setup;
		}), be(), p("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let k = /* @__PURE__ */ L(null), Se = [
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
			"Plugins"
		],
		["Historikk"]
	];
	function Ce(e) {
		R(k, G(k) === e ? null : e, !0), T?.sendShowGrid(G(k) === "Grid"), G(k) === "Historikk" && vt();
	}
	let A = /* @__PURE__ */ L(null);
	function we(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Te() {
		if (!G(A)) return;
		let { block: e } = we(G(A).sectionId, G(A).blockId);
		if (!e) {
			R(A, null);
			return;
		}
		R(A, {
			sectionId: G(A).sectionId,
			blockId: G(A).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function Ee(e) {
		if (!e.blockId) {
			R(A, null);
			return;
		}
		R(A, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Te();
	}
	function De(e, t) {
		let { section: n, block: r } = we(G(A)?.sectionId, G(A)?.blockId);
		r && (O(e), t(r, n), S(n, "blokk-endret"), C.save(), D(), T?.sendSection(G(c), n), Te());
	}
	function j(e, t) {
		De(`edit:${G(A).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function M(e, t) {
		Number.isFinite(t) && De(`edit:frame-${G(A).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Oe(e) {
		De("decor", (t) => {
			t.decor = e;
		});
	}
	async function N(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ji(t);
			De(`edit:${G(A).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Mi(t.name).replaceAll("-", " ");
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let ke = [
		["S", 14],
		["M", 18],
		["L", 24],
		["XL", 36]
	], Ae = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, Me = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Ne = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Pe = /* @__PURE__ */ L(null), Fe = /* @__PURE__ */ L(null), Ie = /* @__PURE__ */ L(""), Le = /* @__PURE__ */ L(tn([])), ze = /* @__PURE__ */ L(null);
	function Be(e) {
		R(Fe, e?.grid ? { ...e.grid } : null, !0), R(Ie, e?.size?.minHeight ?? "", !0), R(Le, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), R(ze, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Ve(e) {
		R(Pe, e.sectionId, !0), Be(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function We(e, t) {
		let n = C.data.sections.find((e) => e.id === G(Pe));
		n && (O(e), t(n), C.save(), D(), T?.sendSection(G(c), n), Be(n));
	}
	let Ge = /* @__PURE__ */ L("color");
	function Ke(e) {
		We("bg", (t) => {
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
	function qe(e) {
		We("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Je(e, t) {
		let n = e + t;
		We("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Ye(e, t, n) {
		We(`edit:bg-${G(Pe)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Xe(e, t, n) {
		We(`edit:bg-${G(Pe)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function Ze(e, t) {
		We("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function Qe(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			Ye(e, "src", (await ji(n)).dataUrl);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let $e = () => Object.entries(G(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function et(e) {
		return {
			type: e,
			version: la[e].version,
			props: la[e].defaults()
		};
	}
	function tt(e) {
		De(`edit:anim-${G(A).blockId}`, (t) => {
			t.animation = e ? et(e) : null;
		}), G(A) && T?.sendDemoAnim(G(A).sectionId, G(A).blockId);
	}
	function nt(e, t) {
		Number.isFinite(t) && (De(`edit:anim-${G(A).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), G(A) && T?.sendDemoAnim(G(A).sectionId, G(A).blockId));
	}
	function rt(e) {
		We("section-anim", (t) => {
			t.animation = e ? et(e) : null;
		}), T?.sendDemoAnim(G(Pe));
	}
	function at(e, t) {
		Number.isFinite(t) && (We("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(G(Pe)));
	}
	function ot(e) {
		let t = C.data.sections.find((e) => e.id === G(Pe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		O("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, R(Ie, r, !0), C.save(), D(), T?.sendSection(G(c), t);
	}
	function st() {
		return C.data.sections.find((e) => e.id === G(Pe)) ?? C.data.sections[0];
	}
	function ct(e) {
		let t = C.data.sections.find((e) => e.id === G(Pe));
		t && (O("grid:section"), t.grid = e ? { ...w.data.grid } : null, R(Fe, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(G(c), t), G(k) === "Grid" && T?.sendShowGrid(!0));
	}
	function lt(e, t) {
		let n = C.data.sections.find((e) => e.id === G(Pe));
		n?.grid && (O("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, R(Fe, { ...n.grid }, !0), C.save(), D(), T?.sendSection(G(c), n), G(k) === "Grid" && T?.sendShowGrid(!0));
	}
	function ut(e, t) {
		O("grid:site"), R(_, {
			...G(_),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), te(), G(k) === "Grid" && T?.sendShowGrid(!0);
	}
	async function dt() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(g, await e.json(), !0) : e.status !== 503 && R(g, null);
		} catch {
			R(g, null);
		}
	}
	let ft = null;
	async function pt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ft = (await e.json()).head ?? null);
		} catch {}
	}
	async function mt(e) {
		if (!ft) return await pt(), {
			ok: await me({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: ft
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ft}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ft) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await me({
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
	let ht = /* @__PURE__ */ L(null), gt = /* @__PURE__ */ L(""), _t = /* @__PURE__ */ L(!1);
	async function vt() {
		R(gt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? R(ht, (await e.json()).commits, !0) : e.status === 401 ? (R(ht, [], !0), R(gt, "Logg inn med GitHub for å se historikken.")) : (R(ht, [], !0), R(gt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			R(ht, [], !0), R(gt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let yt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), bt = !1;
	async function xt() {
		let e = G(ht)?.[0];
		if (!(!e || G(_t)) && await me({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			R(_t, !0), p("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ft = e : pt(), bt = !0, p("✓ Angret! Last admin på nytt om ~1 min for å redigere videre på den gjenopprettede versjonen", "ok");
				} else t.status === 409 ? p("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : p((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				p("Kunne ikke nå publiseringslaget", "error");
			}
			R(_t, !1), vt();
		}
	}
	let St = null;
	function Ct(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: ea("sec"),
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
	async function wt(e, { keepHistory: t = !1 } = {}) {
		R(c, e, !0), St = (async () => {
			let n = re(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Ji(await e.json(), w.data));
			} catch {}
			r ? ne.delete(e) : r = Ct(n), C = bi(`urd-draft-${e}`, () => r), C.replace(Ji(C.data, w.data)), C.save(), t || (oe = null), R(Pe, null), R(Fe, null), D(), x(), R(u, "");
		})(), await St;
	}
	function Tt() {
		T?.destroy(), T = Hi(G(h), {
			onEdit: Dn,
			onMove: On,
			onDelete: Rn,
			onAddSection: Nn,
			onMoveSection: Pn,
			onDeleteSection: Fn,
			onSectionSize: In,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Ve,
			onSelectBlock: Ee,
			onReady: Et,
			onNavigate: I,
			onAddBlock: (e) => Hn(e.sectionId, e.block),
			onAddBlocks: (e) => Un(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: U,
			onMoveBlockSection: Ln,
			onMobileManual: kn,
			onMobileAuto: An,
			onReviewDone: jn,
			onBlockFlag: Mn
		});
	}
	async function Et() {
		await St, await Kt, T?.sendPlugins(Re(G(qt))?.enabled ?? []), T?.sendViewport(G(y)), w.hasDraft() && te();
		let e = !G(s).pages.some((e) => e.id === G(c));
		(C.hasDraft() || e) && T?.sendPage(G(c), C.data), G(v) || T?.sendChrome(!1), G(k) === "Grid" && T?.sendShowGrid(!0);
	}
	function I(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = G(E).pages.find((e) => e.path === t);
		n && n.id !== G(c) && wt(n.id);
	}
	function Dt(e, t) {
		O(e), t(), w.save(), D(), te();
	}
	let Ot = /* @__PURE__ */ L(""), kt = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function At(e, t = null) {
		return e ? kt.includes(e) ? `«${e}» er et reservert navn` : G(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function jt() {
		let e = G(Ot).trim(), t = Mi(e), n = At(t);
		if (n) {
			p(n, "error");
			return;
		}
		Dt("pages", () => {
			G(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), G(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(Ct({
			id: t,
			title: e
		}))), D(), R(Ot, ""), wt(t);
	}
	function Mt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Dt("pages", () => {
			e.title = n;
			for (let t of G(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === G(c) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(G(c), C.data)) : Nt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Nt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Ji(await t.json(), w.data));
		} catch {}
		r ||= Ct(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function Pt(e, t) {
		let n = Mi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = At(n, e.id);
		if (r) {
			p(r, "error");
			return;
		}
		Dt("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ft(e) {
		e.path !== "/" && (Dt("pages", () => {
			G(E).pages = G(E).pages.filter((t) => t.id !== e.id), G(E).nav.items = G(E).nav.items.filter((t) => t.page !== e.id);
		}), e.id === G(c) && wt(G(E).pages[0].id), p("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function It(e) {
		Dt("edit:nav-logo", () => {
			G(E).nav.logo = {
				type: "text",
				value: "",
				...G(E).nav.logo,
				...e
			};
		});
	}
	function Lt(e) {
		Dt("nav", () => {
			G(E).nav.logo ??= {
				type: "text",
				value: G(E).site.title
			};
			let t = G(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = G(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = G(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Rt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ji(t);
			Dt("nav", () => {
				let t = G(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ji(t, 128);
			Dt("edit:site-icon", () => {
				G(E).site.icon = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Bt() {
		Dt("edit:site-icon", () => {
			delete G(E).site.icon;
		});
	}
	let Vt = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Sn(() => {
		if (!G(E)?.site) return;
		let e = G(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			Vt.test(e) && (t.href = e);
		}
	});
	function Ht(e) {
		Dt("nav", () => {
			G(E).nav.layout = e;
		});
	}
	function Ut(e, t) {
		Dt(`edit:nav-style-${e}`, () => {
			G(E).nav.style ??= {}, G(E).nav.style[e] = t;
		});
	}
	let Wt = null, Gt, Kt = new Promise((e) => {
		Gt = e;
	}), qt = /* @__PURE__ */ L(null), Jt = tn({}), Yt = /* @__PURE__ */ L("0.0.0"), Xt = /* @__PURE__ */ L(""), Zt = /* @__PURE__ */ L(""), Qt = /* @__PURE__ */ L(tn([])), $t = /* @__PURE__ */ L("pending"), en = () => [.../* @__PURE__ */ new Set([...G(qt)?.enabled ?? [], ...G(qt)?.disabled ?? []])];
	function nn() {
		R(qt, JSON.parse(JSON.stringify(Wt.data)), !0);
	}
	async function rn() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		Wt = bi("urd-draft-plugins", () => e), nn();
		try {
			R(Yt, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of en()) cn(e);
		on(), Gt(), T?.sendPlugins(Re(G(qt))?.enabled ?? []);
	}
	async function on() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				sn();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), R(Qt, (t ?? []).filter((e) => !en().includes(e)), !0);
			for (let e of G(Qt)) cn(e);
			R($t, "ok");
		} catch {
			sn();
		}
	}
	function sn() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				R(Qt, e.filter((e) => !en().includes(e)), !0);
				for (let e of G(Qt)) cn(e);
				R($t, "ok");
				return;
			}
		} catch {}
		R($t, "unavailable");
	}
	async function cn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = $i(t);
			Jt[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Zi(G(Yt), t.requiresEngine)
			};
		} catch {
			Jt[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function ln(e, t) {
		let n = Wt.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Wt.save(), D(), nn(), un();
	}
	function un() {
		G(h) && (G(h).src = G(h).src);
	}
	function dn(e) {
		let t = Wt.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Wt.save(), D(), nn(), un();
	}
	async function fn() {
		R(Zt, "");
		let e = G(Xt).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			R(Zt, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (en().includes(e)) {
			R(Zt, "Pluginen står allerede i listen");
			return;
		}
		if (await cn(e), Jt[e].errors.length) {
			R(Zt, `Fant ingen gyldig plugin: ${Jt[e].errors.join("; ")}`);
			return;
		}
		ln(e, !0), R(Xt, "");
	}
	function pn(e) {
		R(Qt, G(Qt).filter((t) => t !== e), !0), ln(e, !0);
	}
	function mn(e, t) {
		Dt(e, () => {
			G(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(G(E).footer);
		});
	}
	function hn(e, t) {
		Dt(`edit:nav-label-${e}`, () => {
			G(E).nav.items[e].label = t;
		});
	}
	function gn(e, t) {
		Dt("nav", () => {
			let n = G(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function _n(e, t) {
		Dt(`edit:nav-href-${e}`, () => {
			G(E).nav.items[e].href = t;
		});
	}
	function vn(e, t) {
		let n = e + t, r = G(E).nav.items;
		n < 0 || n >= r.length || Dt("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function yn(e) {
		Dt("nav", () => {
			G(E).nav.items.splice(e, 1);
		});
	}
	function bn() {
		Dt("nav", () => {
			G(E).nav.items.push({
				label: "Lenke",
				page: G(E).pages[0].id
			});
		});
	}
	let xn = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function Cn(e, t) {
		Dt(`edit:theme-color-${e}`, () => {
			G(E).theme.tokens.color[e] = t;
		});
	}
	function wn(e, t) {
		Dt("theme", () => {
			G(E).theme.tokens.font[e] = t;
		});
	}
	function Tn(e, t) {
		Dt("theme", () => {
			G(E).theme.tokens.radius[e] = t;
		});
	}
	function En() {
		R(v, !G(v)), T?.sendChrome(G(v));
	}
	function Dn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (O(`edit:${e.blockId}`), t.props = e.props, C.save(), D(), G(A)?.blockId === e.blockId && Te(), R(u, ""));
	}
	function On(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		O(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && S(t, "desktop-endret-etter-mobil"), C.save(), D(), G(A)?.blockId === e.blockId && Te();
	}
	function kn(e) {
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
	function An(e) {
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
			}, C.save(), D(), x(), T?.sendSection(G(c), t);
		}
	}
	function jn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (O("review-done"), t.responsive.mobile.attention = null, C.save(), D(), x());
	}
	function Mn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (O("decor"), t.decor = e.decor, C.save(), D(), G(A)?.blockId === e.blockId && Te());
	}
	function Nn(e) {
		O("add-section"), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(G(c), C.data), R(Pe, e.section.id, !0), Be(e.section), G(k) !== "Egenskaper" && (R(k, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function Pn(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (O("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(G(c), C.data));
	}
	function Fn(e) {
		O("delete-section"), e.sectionId === G(Pe) && (R(Pe, null), R(Fe, null)), G(A)?.sectionId === e.sectionId && R(A, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(G(c), C.data);
	}
	function In(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === G(Pe) && R(Ie, e.minHeight, !0), C.save(), D());
	}
	function Ln(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (O("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), S(t, "blokk-flyttet"), S(n, "blokk-flyttet"), C.save(), D(), x(), T?.sendPage(G(c), C.data), G(A)?.blockId === e.blockId && (R(A, {
			...G(A),
			sectionId: e.toSectionId
		}, !0), Te()));
	}
	function Rn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), G(A)?.blockId === e.blockId && R(A, null), S(t, "blokk-slettet"), C.save(), D(), T?.sendSection(G(c), t));
	}
	let zn = {
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
	function Bn(e) {
		let t = zn[e];
		return t ? {
			id: ea("blk"),
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
	function Vn(e) {
		T ? T.sendPlaceBlock(e) : Hn(st()?.id, e);
	}
	function Hn(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		n && (O("add-block"), n.blocks.push(t), S(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(c), n));
	}
	function Un(e, t, n, r) {
		let i = C.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		O("add-blocks");
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
		}), S(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(c), i);
	}
	function Wn(e) {
		Vn(Bn(e));
	}
	function U(e) {
		let t = Bn(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, Hn(e.sectionId, t), e.kind === "image" && p("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function Gn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		p("Komprimerer bildet…");
		let n;
		try {
			n = await ji(t);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (G(h)?.clientWidth ?? 1280));
		Vn({
			id: ea("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Mi(t.name).replaceAll("-", " "),
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
	function Kn(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Mi(n || "bilde")}-${Ni(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function W(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && Kn(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && Kn(e.props, "src", e.props.alt, t), e.type === "icon" && Kn(e.props, "image", "ikon", t);
		}
		return t;
	}
	function qn(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Kn(n, "value", "logo", t), n?.type === "both" && Kn(n, "image", "logo", t), Kn(e.site, "icon", "ikon", t), t;
	}
	let Jn = /* @__PURE__ */ L(!1);
	function Yn() {
		if (!G(Jn)) {
			R(Jn, !0);
			return;
		}
		R(Jn, !1), Xn();
	}
	Sn(() => {
		if (!G(Jn)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || R(Jn, !1);
		}, t = (e) => {
			e.key === "Escape" && R(Jn, !1);
		}, n = () => R(Jn, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Xn() {
		O("discard");
		for (let e of G(E).pages) e.id !== G(c) && !ne.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		w.reset(), Wt && (Wt.reset(), nn()), ee(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), D(), R(u, ""), te(), G(E).pages.some((e) => e.id === G(c)) ? T?.sendPage(G(c), e) : wt(G(E).pages[0].id);
	}
	async function Zn() {
		if (bt) {
			p("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		p("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of G(E).pages) {
			let a = `urd-draft-${i.id}`, o = ne.has(i.id) || !G(s).pages.some((e) => e.id === i.id), l = null;
			if (i.id === G(c) && (C.hasDraft() || o)) l = C.data;
			else if (i.id !== G(c)) {
				let e = localStorage.getItem(a);
				if (e) try {
					l = Ji(JSON.parse(e), w.data);
				} catch {}
			}
			if (!l && o && (l = Ct(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...W(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(G(E)));
			e.push(...qn(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(G(s).theme, G(E).theme) || t.push("tema"), i(G(s).nav, G(E).nav) || t.push("menyen"), i(G(s).footer, G(E).footer) || t.push("footeren"), i(G(s).pages, G(E).pages) || t.push("sideregisteret"), i(G(s).grid, G(E).grid) || t.push("gridet"), (G(s).site.icon ?? null) !== (G(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = G(s).site, { icon: c, ...l } = G(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		Wt?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Wt.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of G(E).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		let i = new Set(e.map((e) => e.path)), a = (t) => {
			i.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of G(s).pages) {
			let t = G(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && a(`${e.path.slice(1)}/index.html`) : (a(e.file), e.path !== "/" && a(`${e.path.slice(1)}/index.html`));
		}
		let o = await mt(e);
		if (!o.ok) {
			p("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let l = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...o.head ? { expect: o.head } : {}
		}, u = null;
		try {
			u = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(l)
			});
		} catch {}
		if (u?.ok) {
			let { sha: e } = await u.json().catch(() => ({}));
			e ? ft = e : pt(), W(C.data), qn(G(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			if (R(s, JSON.parse(JSON.stringify(G(E))), !0), w = bi("urd-draft-site", () => G(s)), ee(), Wt) {
				let e = JSON.parse(JSON.stringify(Wt.data));
				Wt = bi("urd-draft-plugins", () => e), nn();
			}
			R(_, {
				snap: !0,
				...G(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = bi(`urd-draft-${G(c)}`, () => t), ne.has(G(c)) && localStorage.setItem(`urd-draft-${G(c)}`, JSON.stringify(t)), D(), p("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (u?.status === 401) {
			let e = (await u.json().catch(() => null))?.error;
			p(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await dt();
		} else u?.status === 403 ? p((await u.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : u?.status === 409 ? p("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : p(u ? (await u.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var Qn = Mo();
	Sr("keydown", an, de);
	var $n = z(Qn), er = (e) => {
		var t = ua();
		Kr(z(t), () => i.pencil), je(), P(t), K("click", t, En), J(e, t);
	};
	X($n, (e) => {
		G(v) || e(er);
	});
	var tr = V($n, 2);
	let nr;
	var rr = z(tr), ir = V(z(rr), 2);
	Z(ir, 21, () => a, ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ F(() => m(G(t), 2));
		let r = () => G(n)[0], i = () => G(n)[1];
		var a = da(), o = z(a, !0);
		P(a);
		var s = {};
		H(() => {
			Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
		}), J(e, a);
	}), P(ir);
	var ar;
	ni(ir);
	var or = V(ir, 2), sr = (e) => {
		var t = fa(), n = B(t), r = z(n, !0);
		P(n);
		var a = V(n, 2), o = z(a);
		let s;
		Kr(o, () => i.desktop, !0), P(o);
		var c = V(o, 2);
		let l;
		Kr(c, () => i.phone, !0), P(c), P(a), H((e) => {
			Y(r, e), s = Qr(o, 1, "ghost svelte-1n46o8q", null, s, { active: G(y) === "desktop" }), l = Qr(c, 1, "ghost svelte-1n46o8q", null, l, { active: G(y) === "mobile" });
		}, [() => re()?.title ?? ""]), K("click", n, () => Ce("Sider")), K("click", o, () => R(y, "desktop")), K("click", c, () => R(y, "mobile")), J(e, t);
	};
	X(or, (e) => {
		G(s) && e(sr);
	});
	var cr = V(or, 2), lr = (e) => {
		var t = pa(), n = z(t);
		Kr(n, () => i.phone);
		var r = V(n);
		P(t), H(() => Y(r, ` ${G(b) ?? ""} ${G(b) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), K("click", t, () => R(y, "mobile")), J(e, t);
	};
	X(cr, (e) => {
		G(b) > 0 && e(lr);
	});
	var ur = V(cr, 2), dr = (e) => {
		J(e, ma());
	};
	X(ur, (e) => {
		G(l) && e(dr);
	}), P(rr);
	var fr = V(rr, 2), pr = z(fr), mr = (e) => {
		var t = ya(), n = B(t), r = z(n), a = (e) => {
			var t = ha();
			Kr(B(t), () => i.eye), je(), J(e, t);
		}, o = (e) => {
			var t = ga();
			Kr(B(t), () => i.pencil), je(), J(e, t);
		};
		X(r, (e) => {
			G(v) ? e(a) : e(o, -1);
		}), P(n);
		var s = V(n, 2), c = (e) => {
			var t = _a(), n = z(t), r = (e) => {
				var t = jr();
				Kr(B(t), () => i.warn), J(e, t);
			};
			X(n, (e) => {
				G(g).allowed || e(r);
			});
			var a = V(n, 1, !0);
			P(t), H(() => {
				ui(t, "title", G(g).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Y(a, G(g).login);
			}), J(e, t);
		}, u = (e) => {
			J(e, va());
		};
		X(s, (e) => {
			G(g)?.loggedIn ? e(c) : G(g) && e(u, 1);
		});
		var d = V(s, 2), f = V(d, 2);
		let p;
		var m = z(f, !0);
		P(f);
		var h = V(f, 2);
		H((e) => {
			ui(n, "title", G(v) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ui(d, "href", e), p = Qr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: G(Jn) }), f.disabled = !G(l), ui(f, "title", G(Jn) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), Y(m, G(Jn) ? "Sikker?" : "Forkast utkast"), h.disabled = !G(l);
		}, [() => re()?.path ?? "/"]), K("click", n, En), K("click", f, Yn), K("click", h, Zn), J(e, t);
	};
	X(pr, (e) => {
		G(s) && e(mr);
	}), P(fr), P(tr);
	var hr = V(tr, 2), gr = (e) => {
		var t = Eo(), r = z(t), a = (e) => {
			var t = To(), r = B(t);
			Z(r, 21, () => Se, Lr, (e, t, n) => {
				var r = Sa(), i = B(r), a = (e) => {
					J(e, ba());
				};
				X(i, (e) => {
					n > 0 && e(a);
				}), Z(V(i, 2), 16, () => G(t), (e) => e, (e, t) => {
					var n = xa();
					let r;
					var i = z(n, !0);
					P(n), H(() => {
						r = Qr(n, 1, "svelte-1n46o8q", null, r, { active: G(k) === t }), Y(i, t);
					}), K("click", n, () => Ce(t)), J(e, n);
				}), J(e, r);
			}), P(r);
			var a = V(r, 2), o = (e) => {
				var t = wo(), r = z(t), a = z(r, !0);
				P(r);
				var o = V(r, 2), s = (e) => {
					var t = Da(), n = V(z(t), 2);
					Z(n, 17, () => G(E).pages, (e) => e.id, (e, t) => {
						var n = Ea();
						let r;
						var a = z(n);
						Q(a);
						var o = V(a, 2), s = (e) => {
							J(e, Ca());
						}, l = (e) => {
							var n = wa();
							Q(n), H((e) => $(n, e), [() => G(t).path.slice(1)]), K("change", n, (e) => Pt(G(t), e.target.value)), J(e, n);
						};
						X(o, (e) => {
							G(t).path === "/" ? e(s) : e(l, -1);
						});
						var u = V(o, 2), d = z(u);
						Kr(d, () => i.right, !0), P(d);
						var f = V(d, 2), p = (e) => {
							var n = Ta();
							Kr(n, () => i.cross, !0), P(n), K("click", n, () => Ft(G(t))), J(e, n);
						};
						X(f, (e) => {
							G(t).path !== "/" && e(p);
						}), P(u), P(n), H(() => {
							r = Qr(n, 1, "page-row svelte-1n46o8q", null, r, { current: G(t).id === G(c) }), $(a, G(t).title), d.disabled = G(t).id === G(c);
						}), K("change", a, (e) => Mt(G(t), e.target.value)), K("click", d, () => wt(G(t).id)), J(e, n);
					});
					var r = V(n, 4);
					Q(r);
					var a = V(r, 2);
					je(2), P(t), H((e) => a.disabled = e, [() => !G(Ot).trim()]), K("keydown", r, (e) => e.key === "Enter" && jt()), mi(r, () => G(Ot), (e) => R(Ot, e)), K("click", a, jt), J(e, t);
				}, l = (e) => {
					var t = Na(), n = V(z(t), 2), r = V(z(n), 2), a = z(r), o = V(z(a)), s = z(o);
					s.value = s.__value = "text";
					var c = V(s);
					c.value = c.__value = "image";
					var l = V(c);
					l.value = l.__value = "both", P(o);
					var u;
					ni(o), P(a);
					var d = V(a, 2), f = (e) => {
						var t = Oa(), n = B(t);
						Q(n);
						var r = V(n, 2), i = z(r), a = z(i);
						a.value = a.__value = "", Z(V(a), 17, () => xn, ([e, t]) => t, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = da(), o = z(a, !0);
							P(a);
							var s = {};
							H(() => {
								Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
							}), J(e, a);
						}), P(i);
						var o;
						ni(i);
						var s = V(i, 2);
						Q(s);
						var c = V(s, 2);
						let l;
						var u = V(c, 2);
						let d;
						P(r), H((e) => {
							$(n, G(E).nav.logo?.value ?? ""), o !== (o = G(E).nav.logo?.font ?? "") && (i.value = (i.__value = G(E).nav.logo?.font ?? "") ?? "", ti(i, G(E).nav.logo?.font ?? "")), $(s, G(E).nav.logo?.textSize ?? ""), l = Qr(c, 1, "tbtn svelte-1n46o8q", null, l, { active: G(E).nav.logo?.bold !== !1 }), d = Qr(u, 1, "tbtn svelte-1n46o8q", null, d, e);
						}, [() => ({ active: !!G(E).nav.logo?.italic })]), K("input", n, (e) => It({ value: e.target.value })), K("change", i, (e) => It({ font: e.target.value || void 0 })), K("change", s, (e) => It({ textSize: e.target.value ? Number(e.target.value) : void 0 })), K("click", c, () => It({ bold: G(E).nav.logo?.bold === !1 })), K("click", u, () => It({ italic: !G(E).nav.logo?.italic })), J(e, t);
					};
					X(d, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = V(d, 2), h = (e) => {
						var t = ka(), n = B(t), r = z(n), i = z(r), a = V(i);
						P(r);
						var o = V(r, 2);
						Q(o);
						var s = V(o, 2);
						Q(s), P(n), je(2), H(() => {
							Y(i, `${(G(E).nav.logo?.type === "image" ? G(E).nav.logo?.value : G(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), $(o, G(E).nav.logo?.size ?? 32), $(s, G(E).nav.logo?.radius ?? 0);
						}), K("change", a, Rt), K("change", o, (e) => It({ size: Number(e.target.value) })), K("change", s, (e) => It({ radius: Number(e.target.value) })), J(e, t);
					};
					X(p, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "text" && e(h);
					});
					var g = V(p, 2), _ = (e) => {
						var t = Aa(), n = V(z(t)), r = z(n);
						r.value = r.__value = "image-first";
						var i = V(r);
						i.value = i.__value = "text-first", P(n);
						var a;
						ni(n), P(t), H(() => {
							a !== (a = G(E).nav.logo?.order ?? "image-first") && (n.value = (n.__value = G(E).nav.logo?.order ?? "image-first") ?? "", ti(n, G(E).nav.logo?.order ?? "image-first"));
						}), K("change", n, (e) => It({ order: e.target.value })), J(e, t);
					};
					X(g, (e) => {
						G(E).nav.logo?.type === "both" && e(_);
					}), je(2), P(r), P(n);
					var v = V(n, 2), y = V(z(v), 2), b = z(y), x = V(z(b));
					{
						let e = /* @__PURE__ */ F(() => G(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ F($e);
						Di(x, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Ut("bg", e)
						});
					}
					P(b);
					var S = V(b, 2), C = V(z(S)), w = z(C);
					P(C), P(S);
					var T = V(S, 2);
					Q(T);
					var ee = V(T, 2), te = z(ee);
					Q(te), je(), P(ee);
					var ne = V(ee, 2), re = V(z(ne));
					{
						let e = /* @__PURE__ */ F(() => G(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ F($e);
						Di(re, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Ut("textColor", e)
						});
					}
					P(ne);
					var D = V(ne, 2), ie = V(z(D)), ae = z(ie);
					ae.value = ae.__value = "right";
					var oe = V(ae);
					oe.value = oe.__value = "center";
					var se = V(oe);
					se.value = se.__value = "left", P(ie);
					var O;
					ni(ie), P(D);
					var ce = V(D, 2), le = z(ce);
					Q(le), je(), P(ce), je(2), P(y), P(v);
					var ue = V(v, 2), de = V(z(ue), 2), fe = z(de);
					Z(fe, 17, () => G(E).nav.items, Lr, (e, t, n) => {
						var r = Ma(), a = z(r);
						Q(a);
						var o = V(a, 2), s = z(o);
						s.disabled = n === 0, Kr(s, () => i.up, !0), P(s);
						var c = V(s, 2);
						Kr(c, () => i.down, !0), P(c);
						var l = V(c, 2);
						Kr(l, () => i.cross, !0), P(l), P(o);
						var u = V(o, 2), d = z(u);
						Z(d, 17, () => G(E).pages, (e) => e.id, (e, t) => {
							var n = da(), r = z(n, !0);
							P(n);
							var i = {};
							H(() => {
								Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
							}), J(e, n);
						});
						var f = V(d);
						f.value = f.__value = "__href", P(u);
						var p;
						ni(u);
						var m = V(u, 2), h = (e) => {
							var r = ja();
							Q(r), H(() => $(r, G(t).href ?? "")), K("change", r, (e) => _n(n, e.target.value)), J(e, r);
						};
						X(m, (e) => {
							G(t).page || e(h);
						}), P(r), H(() => {
							$(a, G(t).label), c.disabled = n === G(E).nav.items.length - 1, p !== (p = G(t).page ?? "__href") && (u.value = (u.__value = G(t).page ?? "__href") ?? "", ti(u, G(t).page ?? "__href"));
						}), K("input", a, (e) => hn(n, e.target.value)), K("click", s, () => vn(n, -1)), K("click", c, () => vn(n, 1)), K("click", l, () => yn(n)), K("change", u, (e) => gn(n, e.target.value)), J(e, r);
					});
					var pe = V(fe, 2);
					P(de), P(ue), P(t), H((e) => {
						u !== (u = G(E).nav.logo?.type ?? "text") && (o.value = (o.__value = G(E).nav.logo?.type ?? "text") ?? "", ti(o, G(E).nav.logo?.type ?? "text")), Y(w, `${e ?? ""}%`), $(T, G(E).nav.style?.bgOpacity ?? .85), li(te, G(E).nav.style?.blur !== !1), O !== (O = G(E).nav.layout ?? "right") && (ie.value = (ie.__value = G(E).nav.layout ?? "right") ?? "", ti(ie, G(E).nav.layout ?? "right")), li(le, G(E).nav.sticky !== !1);
					}, [() => Math.round((G(E).nav.style?.bgOpacity ?? .85) * 100)]), K("change", o, (e) => Lt(e.target.value)), K("input", T, (e) => Ut("bgOpacity", Number(e.target.value))), K("change", te, (e) => Ut("blur", e.target.checked)), K("change", ie, (e) => Ht(e.target.value)), K("change", le, (e) => Dt("nav", () => {
						G(E).nav.sticky = e.target.checked;
					})), K("click", pe, bn), J(e, t);
				}, u = (e) => {
					var t = La(), n = V(z(t), 2);
					Di(V(z(n)), {
						get value() {
							return G(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Cn("bg", e)
					}), P(n);
					var r = V(n, 2);
					Di(V(z(r)), {
						get value() {
							return G(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Cn("surface", e)
					}), P(r);
					var a = V(r, 2);
					Di(V(z(a)), {
						get value() {
							return G(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Cn("text", e)
					}), P(a);
					var o = V(a, 2);
					Di(V(z(o)), {
						get value() {
							return G(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Cn("accent", e)
					}), P(o);
					var s = V(o, 4), c = V(z(s)), l = z(c), u = (e) => {
						var t = Pa(), n = {};
						H(() => {
							n !== (n = G(E).theme.tokens.font.heading) && (t.value = (t.__value = G(E).theme.tokens.font.heading) ?? "");
						}), J(e, t);
					}, d = /* @__PURE__ */ F(() => !xn.some(([, e]) => e === G(E).theme.tokens.font.heading));
					X(l, (e) => {
						G(d) && e(u);
					}), Z(V(l), 17, () => xn, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ F(() => m(G(t), 2));
						let r = () => G(n)[0], i = () => G(n)[1];
						var a = da(), o = z(a, !0);
						P(a);
						var s = {};
						H(() => {
							Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), J(e, a);
					}), P(c);
					var f;
					ni(c), P(s);
					var p = V(s, 2), h = V(z(p)), g = z(h), _ = (e) => {
						var t = Pa(), n = {};
						H(() => {
							n !== (n = G(E).theme.tokens.font.body) && (t.value = (t.__value = G(E).theme.tokens.font.body) ?? "");
						}), J(e, t);
					}, v = /* @__PURE__ */ F(() => !xn.some(([, e]) => e === G(E).theme.tokens.font.body));
					X(g, (e) => {
						G(v) && e(_);
					}), Z(V(g), 17, () => xn, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ F(() => m(G(t), 2));
						let r = () => G(n)[0], i = () => G(n)[1];
						var a = da(), o = z(a, !0);
						P(a);
						var s = {};
						H(() => {
							Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), J(e, a);
					}), P(h);
					var y;
					ni(h), P(p);
					var b = V(p, 4), x = V(z(b));
					Q(x), P(b);
					var S = V(b, 2), C = V(z(S));
					Q(C), P(S);
					var w = V(S, 4), T = V(z(w)), ee = (e) => {
						var t = Fa();
						H(() => ui(t, "src", G(E).site.icon)), J(e, t);
					};
					X(T, (e) => {
						G(E).site.icon && e(ee);
					}), P(w);
					var te = V(w, 2), ne = z(te), re = z(ne), D = V(re);
					P(ne);
					var ie = V(ne, 2), ae = (e) => {
						var t = Ia();
						Kr(t, () => i.cross, !0), P(t), K("click", t, Bt), J(e, t);
					};
					X(ie, (e) => {
						G(E).site.icon && e(ae);
					}), P(te), je(2), P(t), H(() => {
						f !== (f = G(E).theme.tokens.font.heading) && (c.value = (c.__value = G(E).theme.tokens.font.heading) ?? "", ti(c, G(E).theme.tokens.font.heading)), y !== (y = G(E).theme.tokens.font.body) && (h.value = (h.__value = G(E).theme.tokens.font.body) ?? "", ti(h, G(E).theme.tokens.font.body)), $(x, G(E).theme.tokens.radius.sm), $(C, G(E).theme.tokens.radius.md), Y(re, `${G(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), K("change", c, (e) => wn("heading", e.target.value)), K("change", h, (e) => wn("body", e.target.value)), K("change", x, (e) => Tn("sm", e.target.value)), K("change", C, (e) => Tn("md", e.target.value)), K("change", D, zt), J(e, t);
				}, d = (e) => {
					var t = Ra();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					P(i), P(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					P(c);
					var u = V(c, 2), d = V(u, 2), f = V(d, 2), p = V(z(f), 2), m = z(p), h = V(m, 2), g = V(h, 2), _ = V(g, 2), v = V(_, 2);
					P(p), P(f), P(t), H(() => {
						n = Qr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: G(y) === "mobile" }), ui(t, "title", G(y) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), K("click", a, () => Wn("text")), K("click", o, () => Wn("text-box")), K("click", s, () => Wn("button")), K("change", l, Gn), K("click", u, () => Wn("video")), K("click", d, () => Wn("icon")), K("click", m, () => Wn("shape-line")), K("click", h, () => Wn("shape-arrow")), K("click", g, () => Wn("shape-circle")), K("click", _, () => Wn("shape-rect")), K("click", v, () => Wn("shape-triangle")), J(e, t);
				}, f = (e) => {
					var t = za(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					P(r), P(n);
					var a = V(n, 2);
					Q(a);
					var o = V(a, 2), s = z(o);
					Q(s), je(), P(o), je(2), P(t), H(() => {
						Y(i, `${G(_).size ?? ""} px`), $(a, G(_).size), li(s, G(_).snap !== !1);
					}), K("input", a, (e) => ut("size", Number(e.target.value))), K("change", s, (e) => ut("snap", e.target.checked)), J(e, t);
				}, p = (e) => {
					var t = so(), r = z(t), a = (e) => {
						var t = Xa(), n = B(t), r = z(n);
						P(n);
						var i = V(n, 2), a = (e) => {
							var t = Ba(), n = z(t), r = V(z(n));
							Q(r), P(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), P(i);
							var o = V(i, 2), s = V(z(o));
							Q(s), P(o);
							var c = V(o, 2), l = V(z(c));
							Q(l), P(c);
							var u = V(c, 2), d = V(z(u));
							Q(d), P(u);
							var f = V(u, 2), p = V(z(f));
							Q(p), P(f), P(t), H(() => {
								$(r, G(A).frame.x), $(a, G(A).frame.y), $(s, G(A).frame.w), $(l, G(A).frame.h), $(d, G(A).frame.z ?? 1), $(p, G(A).frame.rot ?? 0);
							}), K("change", r, (e) => M("x", Number(e.target.value))), K("change", a, (e) => M("y", Number(e.target.value))), K("change", s, (e) => M("w", Number(e.target.value))), K("change", l, (e) => M("h", Number(e.target.value))), K("change", d, (e) => M("z", Number(e.target.value))), K("change", p, (e) => M("rot", Number(e.target.value))), J(e, t);
						};
						X(i, (e) => {
							G(y) === "desktop" && e(a);
						});
						var o = V(i, 2), s = z(o);
						Q(s), je(), P(o);
						var c = V(o, 4), l = (e) => {
							var t = Va(), n = B(t), r = V(z(n)), i = z(r);
							i.value = i.__value = "left";
							var a = V(i);
							a.value = a.__value = "center";
							var o = V(a);
							o.value = o.__value = "right", P(r);
							var s;
							ni(r), P(n);
							var c = V(n, 2), l = z(c);
							Q(l), je(), P(c);
							var u = V(c, 2), d = V(z(u)), f = z(d);
							f.value = f.__value = "", Z(V(f), 17, () => xn, ([e, t]) => t, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = da(), o = z(a, !0);
								P(a);
								var s = {};
								H(() => {
									Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
								}), J(e, a);
							}), P(d);
							var p;
							ni(d), P(u);
							var h = V(u, 4), g = z(h);
							let _;
							var v = V(g, 2);
							Z(v, 17, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = xa();
								let o;
								var s = z(a, !0);
								P(a), H(() => {
									o = Qr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: G(A).props.size === i() }), ui(a, "title", `${i() ?? ""} px`), Y(s, r());
								}), K("click", a, () => j("size", i())), J(e, a);
							});
							var y = V(v, 2);
							Q(y), P(h), je(2), H((e) => {
								s !== (s = G(A).props.align ?? "left") && (r.value = (r.__value = G(A).props.align ?? "left") ?? "", ti(r, G(A).props.align ?? "left")), li(l, e), p !== (p = G(A).props.font ?? "") && (d.value = (d.__value = G(A).props.font ?? "") ?? "", ti(d, G(A).props.font ?? "")), _ = Qr(g, 1, "tbtn svelte-1n46o8q", null, _, { active: !G(A).props.size }), $(y, G(A).props.size ?? "");
							}, [() => !!G(A).props.box]), K("change", r, (e) => j("align", e.target.value)), K("change", l, (e) => j("box", e.target.checked)), K("change", d, (e) => j("font", e.target.value || null)), K("click", g, () => j("size", null)), K("change", y, (e) => j("size", e.target.value ? Number(e.target.value) : null)), J(e, t);
						}, u = (e) => {
							var t = Ua(), n = B(t), r = V(z(n));
							Q(r), P(n);
							var i = V(n, 2), a = V(z(i)), o = z(a);
							Z(o, 17, () => G(E).pages, (e) => e.id, (e, t) => {
								var n = da(), r = z(n, !0);
								P(n);
								var i = {};
								H(() => {
									Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
								}), J(e, n);
							});
							var s = V(o);
							s.value = s.__value = "__href", P(a);
							var c;
							ni(a), P(i);
							var l = V(i, 2), u = (e) => {
								var t = Ha();
								Q(t), H(() => $(t, G(A).props.href === "#" ? "" : G(A).props.href ?? "")), K("change", t, (e) => j("href", e.target.value || null)), J(e, t);
							};
							X(l, (e) => {
								G(A).props.page || e(u);
							});
							var d = V(l, 2), f = V(z(d)), p = z(f);
							p.value = p.__value = "primary";
							var m = V(p);
							m.value = m.__value = "secondary", P(f);
							var h;
							ni(f), P(d), H(() => {
								$(r, G(A).props.label), c !== (c = G(A).props.page ?? "__href") && (a.value = (a.__value = G(A).props.page ?? "__href") ?? "", ti(a, G(A).props.page ?? "__href")), h !== (h = G(A).props.style) && (f.value = (f.__value = G(A).props.style) ?? "", ti(f, G(A).props.style));
							}), K("change", r, (e) => j("label", e.target.value)), K("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								De(`edit:${G(A).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), K("change", f, (e) => j("style", e.target.value)), J(e, t);
						}, d = (e) => {
							var t = Wa(), n = B(t), r = V(z(n));
							P(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), P(i);
							var o = V(i, 2), s = V(z(o)), c = z(s);
							c.value = c.__value = "cover";
							var l = V(c);
							l.value = l.__value = "contain", P(s);
							var u;
							ni(s), P(o);
							var d = V(o, 2), f = V(z(d)), p = z(f);
							p.value = p.__value = "";
							var m = V(p);
							m.value = m.__value = "sm";
							var h = V(m);
							h.value = h.__value = "md", P(f);
							var g;
							ni(f), P(d);
							var _ = V(d, 2), v = V(z(_));
							Q(v), P(_);
							var y = V(_, 2), b = V(z(y)), x = z(b);
							P(b), P(y);
							var S = V(y, 2);
							Q(S);
							var C = V(S, 2), w = V(z(C)), T = z(w);
							P(w), P(C);
							var E = V(C, 2);
							Q(E);
							var ee = V(E, 2), te = V(z(ee)), ne = z(te);
							P(te), P(ee);
							var re = V(ee, 2);
							Q(re);
							var D = V(re, 2), ie = V(z(D)), ae = z(ie);
							P(ie), P(D);
							var oe = V(D, 2);
							Q(oe);
							var se = V(oe, 2), O = V(z(se)), ce = z(O);
							P(O), P(se);
							var le = V(se, 2);
							Q(le);
							var ue = V(le, 2);
							H((e, t, n, r, i) => {
								$(a, G(A).props.alt ?? ""), u !== (u = G(A).props.fit ?? "cover") && (s.value = (s.__value = G(A).props.fit ?? "cover") ?? "", ti(s, G(A).props.fit ?? "cover")), g !== (g = G(A).props.radius ?? "") && (f.value = (f.__value = G(A).props.radius ?? "") ?? "", ti(f, G(A).props.radius ?? "")), $(v, G(A).props.href ?? ""), Y(x, `${e ?? ""}%`), $(S, G(A).props.x ?? .5), Y(T, `${t ?? ""}%`), $(E, G(A).props.y ?? .5), Y(ne, `${n ?? ""}%`), $(re, G(A).props.brightness ?? 1), Y(ae, `${r ?? ""}%`), $(oe, G(A).props.contrast ?? 1), Y(ce, `${i ?? ""}%`), $(le, G(A).props.saturate ?? 1);
							}, [
								() => Math.round((G(A).props.x ?? .5) * 100),
								() => Math.round((G(A).props.y ?? .5) * 100),
								() => Math.round((G(A).props.brightness ?? 1) * 100),
								() => Math.round((G(A).props.contrast ?? 1) * 100),
								() => Math.round((G(A).props.saturate ?? 1) * 100)
							]), K("change", r, N), K("change", a, (e) => j("alt", e.target.value)), K("change", s, (e) => j("fit", e.target.value)), K("change", f, (e) => j("radius", e.target.value || null)), K("change", v, (e) => j("href", e.target.value || null)), K("input", S, (e) => j("x", Number(e.target.value))), K("input", E, (e) => j("y", Number(e.target.value))), K("input", re, (e) => j("brightness", Number(e.target.value))), K("input", oe, (e) => j("contrast", Number(e.target.value))), K("input", le, (e) => j("saturate", Number(e.target.value))), K("click", ue, () => De(`edit:${G(A).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), J(e, t);
						}, f = (e) => {
							var t = Ga(), n = V(B(t), 2);
							Q(n);
							var r = V(n, 2), i = V(z(r));
							Q(i), P(r), je(2), H(() => {
								$(n, G(A).props.url ?? ""), $(i, G(A).props.title ?? "");
							}), K("change", n, (e) => j("url", e.target.value)), K("change", i, (e) => j("title", e.target.value)), J(e, t);
						}, p = (e) => {
							var t = qa(), n = B(t), r = V(z(n)), i = z(r);
							{
								let e = /* @__PURE__ */ F(() => G(A).props.glyph ?? "★");
								Vi(i, {
									get value() {
										return G(e);
									},
									onpick: (e) => j("glyph", e),
									onimage: (e) => j("image", e)
								});
							}
							var a = V(i, 2);
							Q(a), P(r), P(n);
							var o = V(n, 2), s = (e) => {
								var t = Ka(), n = B(t), r = z(n), i = V(r, 2);
								P(n), je(2), H(() => ui(r, "src", G(A).props.image)), K("click", i, () => j("image", null)), J(e, t);
							};
							X(o, (e) => {
								G(A).props.image && e(s);
							});
							var c = V(o, 2), l = V(z(c));
							Q(l), P(c);
							var u = V(c, 2), d = V(z(u));
							Z(d, 21, () => Ne, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = da(), o = z(a, !0);
								P(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), P(d);
							var f;
							ni(d), P(u), je(2), H(() => {
								$(a, G(A).props.glyph ?? ""), $(l, G(A).props.size ?? 48), f !== (f = G(A).props.color) && (d.value = (d.__value = G(A).props.color) ?? "", ti(d, G(A).props.color));
							}), K("change", a, (e) => j("glyph", e.target.value || "★")), K("change", l, (e) => j("size", Number(e.target.value))), K("change", d, (e) => j("color", e.target.value)), J(e, t);
						}, h = (e) => {
							var t = Ja(), n = B(t), r = V(z(n));
							Z(r, 21, () => Me, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = da(), o = z(a, !0);
								P(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), P(r);
							var i;
							ni(r), P(n);
							var a = V(n, 2), o = V(z(a));
							Z(o, 21, () => Ne, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = da(), o = z(a, !0);
								P(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), P(o);
							var s;
							ni(o), P(a);
							var c = V(a, 2), l = V(z(c));
							Q(l), P(c);
							var u = V(c, 2), d = z(u);
							Q(d), je(), P(u), H((e) => {
								i !== (i = G(A).props.kind) && (r.value = (r.__value = G(A).props.kind) ?? "", ti(r, G(A).props.kind)), s !== (s = G(A).props.color) && (o.value = (o.__value = G(A).props.color) ?? "", ti(o, G(A).props.color)), $(l, G(A).props.thickness), li(d, e);
							}, [() => !!G(A).props.fill]), K("change", r, (e) => j("kind", e.target.value)), K("change", o, (e) => j("color", e.target.value)), K("change", l, (e) => j("thickness", Number(e.target.value))), K("change", d, (e) => j("fill", e.target.checked ? G(A).props.color : null)), J(e, t);
						};
						X(c, (e) => {
							G(A).type === "text" ? e(l) : G(A).type === "button" ? e(u, 1) : G(A).type === "image" ? e(d, 2) : G(A).type === "video" ? e(f, 3) : G(A).type === "icon" ? e(p, 4) : G(A).type === "shape" && e(h, 5);
						});
						var g = V(c, 4), _ = V(z(g)), v = z(_);
						v.value = v.__value = "", Z(V(v), 17, () => Object.entries(la), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = da(), o = z(a, !0);
							P(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), P(_);
						var b;
						ni(_), P(g);
						var x = V(g, 2), S = (e) => {
							var t = Ya(), n = B(t), r = V(z(n));
							Q(r), P(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), P(i), je(2), H(() => {
								$(r, G(A).animation.props.duration), $(a, G(A).animation.props.delay);
							}), K("change", r, (e) => nt("duration", Number(e.target.value))), K("change", a, (e) => nt("delay", Number(e.target.value))), J(e, t);
						};
						X(x, (e) => {
							G(A).animation && la[G(A).animation.type]?.entrance && e(S);
						}), H(() => {
							Y(r, `${Ae[G(A).type] ?? G(A).type ?? ""}-blokk`), li(s, G(A).decor), b !== (b = G(A).animation?.type ?? "") && (_.value = (_.__value = G(A).animation?.type ?? "") ?? "", ti(_, G(A).animation?.type ?? ""));
						}), K("change", s, (e) => Oe(e.target.checked)), K("change", _, (e) => tt(e.target.value || null)), J(e, t);
					}, o = (e) => {
						var t = ao(), r = V(B(t), 2), a = V(z(r));
						Q(a), P(r);
						var o = V(r, 6), s = z(o);
						Q(s), je(), P(o);
						var c = V(o, 2), l = (e) => {
							var t = Za(), n = B(t), r = V(z(n)), i = z(r);
							P(r), P(n);
							var a = V(n, 2);
							Q(a), H(() => {
								Y(i, `${G(Fe).size ?? ""} px`), $(a, G(Fe).size);
							}), K("input", a, (e) => lt("size", Number(e.target.value))), J(e, t);
						};
						X(c, (e) => {
							G(Fe) && e(l);
						});
						var u = V(c, 8);
						Z(u, 17, () => G(Le), Lr, (e, t, r) => {
							var a = io(), o = z(a), s = z(o);
							Z(s, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = da(), o = z(a, !0);
								P(a);
								var s = {};
								H(() => {
									Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), P(s);
							var c;
							ni(s);
							var l = V(s, 2), u = z(l);
							u.disabled = r === 0, Kr(u, () => i.up, !0), P(u);
							var d = V(u, 2);
							Kr(d, () => i.down, !0), P(d);
							var f = V(d, 2);
							Kr(f, () => i.cross, !0), P(f), P(l), P(o);
							var p = V(o, 2), h = (e) => {
								var n = Qa(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ F($e);
									Di(a, {
										get value() {
											return G(t).props.value;
										},
										get tokens() {
											return G(e);
										},
										label: "Lagets farge",
										onchange: (e) => Ye(r, "value", e)
									});
								}
								P(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								P(s), P(o);
								var l = V(o, 2);
								Q(l), H((e) => {
									Y(c, `${e ?? ""}%`), $(l, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("input", l, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							}, g = (e) => {
								var n = $a(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ F($e);
									Di(a, {
										get value() {
											return G(t).props.stops[0];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient fra",
										onchange: (e) => Xe(r, 0, e)
									});
								}
								P(i);
								var o = V(i, 2), s = V(z(o));
								{
									let e = /* @__PURE__ */ F($e);
									Di(s, {
										get value() {
											return G(t).props.stops[G(t).props.stops.length - 1];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient til",
										onchange: (e) => Xe(r, G(t).props.stops.length - 1, e)
									});
								}
								P(o);
								var c = V(o, 2), l = V(z(c)), u = z(l);
								P(l), P(c);
								var d = V(c, 2);
								Q(d);
								var f = V(d, 2), p = V(z(f)), m = z(p);
								P(p), P(f);
								var h = V(f, 2);
								Q(h);
								var g = V(h, 2), _ = z(g);
								Q(_), je(), P(g), H((e, n) => {
									Y(u, `${G(t).props.angle ?? ""}°`), $(d, G(t).props.angle), Y(m, `${e ?? ""}%`), $(h, G(t).props.opacity ?? 1), li(_, n);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100), () => !!G(t).props.animate]), K("input", d, (e) => Ye(r, "angle", Number(e.target.value))), K("input", h, (e) => Ye(r, "opacity", Number(e.target.value))), K("change", _, (e) => Ye(r, "animate", e.target.checked)), J(e, n);
							}, _ = (e) => {
								var n = eo(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ F($e);
									Di(a, {
										get value() {
											return G(t).props.color;
										},
										get tokens() {
											return G(e);
										},
										label: "Glødens farge",
										onchange: (e) => Ye(r, "color", e)
									});
								}
								P(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								P(s), P(o);
								var l = V(o, 2);
								Q(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								P(d), P(u);
								var p = V(u, 2);
								Q(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								P(h), P(m);
								var _ = V(m, 2);
								Q(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								P(y), P(v);
								var x = V(v, 2);
								Q(x), H((e, n, r, i) => {
									Y(c, `${e ?? ""}%`), $(l, G(t).props.x), Y(f, `${n ?? ""}%`), $(p, G(t).props.y), Y(g, `${r ?? ""}%`), $(_, G(t).props.radius), Y(b, `${i ?? ""}%`), $(x, G(t).props.opacity);
								}, [
									() => Math.round(G(t).props.x * 100),
									() => Math.round(G(t).props.y * 100),
									() => Math.round(G(t).props.radius * 100),
									() => Math.round(G(t).props.opacity * 100)
								]), K("input", l, (e) => Ye(r, "x", Number(e.target.value))), K("input", p, (e) => Ye(r, "y", Number(e.target.value))), K("input", _, (e) => Ye(r, "radius", Number(e.target.value))), K("input", x, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							}, v = (e) => {
								var n = to(), i = B(n), a = V(z(i)), o = z(a);
								P(a), P(i);
								var s = V(i, 2);
								Q(s), H((e) => {
									Y(o, `${e ?? ""}%`), $(s, G(t).props.opacity);
								}, [() => Math.round(G(t).props.opacity * 100)]), K("input", s, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							}, y = (e) => {
								var n = ro(), i = B(n), a = z(i), o = V(a);
								P(i);
								var s = V(i, 2), c = V(z(s)), l = z(c);
								l.value = l.__value = "cover";
								var u = V(l);
								u.value = u.__value = "contain";
								var d = V(u);
								d.value = d.__value = "repeat", P(c);
								var f;
								ni(c), P(s);
								var p = V(s, 2), m = (e) => {
									var n = no(), i = B(n), a = V(z(i)), o = z(a);
									P(a), P(i);
									var s = V(i, 2);
									Q(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									P(l), P(c);
									var d = V(c, 2);
									Q(d), H((e, n) => {
										Y(o, `${e ?? ""}%`), $(s, G(t).props.x ?? .5), Y(u, `${n ?? ""}%`), $(d, G(t).props.y ?? .5);
									}, [() => Math.round((G(t).props.x ?? .5) * 100), () => Math.round((G(t).props.y ?? .5) * 100)]), K("input", s, (e) => Ye(r, "x", Number(e.target.value))), K("input", d, (e) => Ye(r, "y", Number(e.target.value))), J(e, n);
								};
								X(p, (e) => {
									(G(t).props.fit ?? "cover") !== "repeat" && e(m);
								});
								var h = V(p, 2), g = V(z(h)), _ = z(g);
								P(g), P(h);
								var v = V(h, 2);
								Q(v);
								var y = V(v, 2), b = V(z(y)), x = z(b);
								P(b), P(y);
								var S = V(y, 2);
								Q(S), H((e) => {
									Y(a, `${G(t).props.src ? "Bytt bilde" : "Velg bilde"} `), f !== (f = G(t).props.fit ?? "cover") && (c.value = (c.__value = G(t).props.fit ?? "cover") ?? "", ti(c, G(t).props.fit ?? "cover")), Y(_, `${G(t).props.blur ?? 0 ?? ""} px`), $(v, G(t).props.blur ?? 0), Y(x, `${e ?? ""}%`), $(S, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => Qe(r, e)), K("change", c, (e) => Ye(r, "fit", e.target.value)), K("input", v, (e) => Ye(r, "blur", Number(e.target.value))), K("input", S, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							};
							X(p, (e) => {
								G(t).type === "color" ? e(h) : G(t).type === "gradient" ? e(g, 1) : G(t).type === "glow" ? e(_, 2) : G(t).type === "grain" ? e(v, 3) : G(t).type === "image" && e(y, 4);
							}), P(a), H(() => {
								c !== (c = G(t).type) && (s.value = (s.__value = G(t).type) ?? "", ti(s, G(t).type)), d.disabled = r === G(Le).length - 1;
							}), K("change", s, (e) => Ze(r, e.target.value)), K("click", u, () => Je(r, -1)), K("click", d, () => Je(r, 1)), K("click", f, () => qe(r)), J(e, a);
						});
						var d = V(u, 2), f = V(z(d));
						Z(f, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = da(), o = z(a, !0);
							P(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), P(f), P(d);
						var p = V(d, 2), h = V(p, 4), g = V(z(h)), _ = z(g);
						_.value = _.__value = "", Z(V(_), 17, () => Object.entries(la), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = da(), o = z(a, !0);
							P(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), P(g);
						var v;
						ni(g), P(h);
						var y = V(h, 2), b = (e) => {
							var t = Ya(), n = B(t), r = V(z(n));
							Q(r), P(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), P(i), je(2), H(() => {
								$(r, G(ze).props.duration), $(a, G(ze).props.delay);
							}), K("change", r, (e) => at("duration", Number(e.target.value))), K("change", a, (e) => at("delay", Number(e.target.value))), J(e, t);
						};
						X(y, (e) => {
							G(ze) && la[G(ze).type]?.entrance && e(b);
						}), H(() => {
							$(a, G(Ie)), li(s, G(Fe) !== null), v !== (v = G(ze)?.type ?? "") && (g.value = (g.__value = G(ze)?.type ?? "") ?? "", ti(g, G(ze)?.type ?? ""));
						}), K("change", a, (e) => ot(e.target.value)), K("change", s, (e) => ct(e.target.checked)), ri(f, () => G(Ge), (e) => R(Ge, e)), K("click", p, () => Ke(G(Ge))), K("change", g, (e) => rt(e.target.value || null)), J(e, t);
					}, s = (e) => {
						J(e, oo());
					};
					X(r, (e) => {
						G(A) ? e(a) : G(Pe) ? e(o, 1) : e(s, -1);
					}), P(t), J(e, t);
				}, h = (e) => {
					var t = co(), n = V(z(t), 2), r = z(n);
					Q(r), je(), P(n);
					var i = V(n, 4);
					it(i), ui(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = V(i, 4), o = V(z(a)), s = z(o);
					s.value = s.__value = "left";
					var c = V(s);
					c.value = c.__value = "center";
					var l = V(c);
					l.value = l.__value = "right", P(o);
					var u;
					ni(o), P(a), je(2), P(t), H((e) => {
						li(r, e), $(i, G(E).footer?.text ?? ""), u !== (u = G(E).footer?.align ?? "center") && (o.value = (o.__value = G(E).footer?.align ?? "center") ?? "", ti(o, G(E).footer?.align ?? "center"));
					}, [() => !!G(E).footer?.show]), K("change", r, (e) => mn("footer", (t) => {
						t.show = e.target.checked;
					})), K("input", i, (e) => mn("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), K("change", o, (e) => mn("footer", (t) => {
						t.align = e.target.value;
					})), J(e, t);
				}, v = (e) => {
					var t = vo(), n = V(z(t), 2), r = (e) => {
						J(e, lo());
					}, a = /* @__PURE__ */ F(() => !en().length);
					X(n, (e) => {
						G(a) && e(r);
					});
					var o = V(n, 2);
					Z(o, 16, en, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ F(() => Jt[t]), r = /* @__PURE__ */ F(() => (G(qt)?.enabled ?? []).includes(t));
						var a = po();
						let o;
						var s = z(a), c = z(s), l = z(c, !0);
						P(c);
						var u = V(c, 2), d = (e) => {
							var t = uo(), r = z(t);
							P(t), H(() => Y(r, `v${G(n).version ?? ""}`)), J(e, t);
						};
						X(u, (e) => {
							G(n)?.version && e(d);
						});
						var f = V(u, 2), p = z(f), m = z(p);
						Q(m);
						var h = V(m);
						P(p);
						var g = V(p, 2);
						Kr(g, () => i.cross, !0), P(g), P(f), P(s);
						var _ = V(s, 2), v = (e) => {
							var t = fo(), r = z(t, !0);
							P(t), H((e) => Y(r, e), [() => G(n).errors.join("; ")]), J(e, t);
						}, y = (e) => {
							var t = fo(), r = z(t);
							P(t), H(() => Y(r, `Krever motorversjon ${G(n).requiresEngine ?? ""} (denne siden kjører ${G(Yt) ?? ""}); pluginen hoppes over ved lasting.`)), J(e, t);
						}, b = (e) => {
							var t = fo(), r = z(t);
							P(t), H((e) => Y(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(G(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(G(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), J(e, t);
						};
						X(_, (e) => {
							G(n)?.errors?.length ? e(v) : G(n) && !G(n).satisfied ? e(y, 1) : G(n)?.csp && e(b, 2);
						}), P(a), H((e) => {
							o = Qr(a, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": G(n)?.errors?.length }), Y(l, G(n)?.name ?? t), ui(p, "title", G(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), li(m, G(r)), m.disabled = e, Y(h, ` ${G(r) ? "På" : "Av"}`);
						}, [() => !!G(n)?.errors?.length]), K("change", m, (e) => ln(t, e.target.checked)), K("click", g, () => dn(t)), J(e, a);
					});
					var s = V(o, 2), c = (e) => {
						var t = ho();
						Z(V(B(t), 4), 16, () => G(Qt), (e) => e, (e, t) => {
							var n = mo(), r = z(n), a = z(r), o = z(a, !0);
							P(a);
							var s = V(a, 2), c = (e) => {
								var n = uo(), r = z(n);
								P(n), H(() => Y(r, `v${Jt[t].version ?? ""}`)), J(e, n);
							};
							X(s, (e) => {
								Jt[t]?.version && e(c);
							});
							var l = V(s, 2), u = z(l);
							Kr(u, () => i.right, !0), P(u), P(l), P(r), P(n), H(() => Y(o, Jt[t]?.name ?? t)), K("click", u, () => pn(t)), J(e, n);
						}), J(e, t);
					};
					X(s, (e) => {
						G(Qt).length && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = jr(), n = B(t), r = (e) => {
							J(e, go());
						};
						X(n, (e) => {
							G(Qt).length || e(r);
						}), J(e, t);
					}, d = (e) => {
						var t = _o(), n = V(B(t), 2);
						Q(n);
						var r = V(n, 2), i = V(r, 2), a = (e) => {
							var t = fo(), n = z(t, !0);
							P(t), H(() => Y(n, G(Zt))), J(e, t);
						};
						X(i, (e) => {
							G(Zt) && e(a);
						}), H((e) => r.disabled = e, [() => !G(Xt).trim()]), K("keydown", n, (e) => e.key === "Enter" && fn()), mi(n, () => G(Xt), (e) => R(Xt, e)), K("click", r, fn), J(e, t);
					};
					X(l, (e) => {
						G($t) === "ok" ? e(u) : e(d, -1);
					}), P(t), J(e, t);
				}, b = (e) => {
					var t = Co(), n = V(z(t), 2), r = (e) => {
						J(e, yo());
					}, i = (e) => {
						var t = Sa(), n = B(t), r = (e) => {
							var t = bo(), n = z(t, !0);
							P(t), H(() => Y(n, G(gt))), J(e, t);
						};
						X(n, (e) => {
							G(gt) && e(r);
						});
						var i = V(n, 2), a = (e) => {
							var t = So(), n = B(t);
							Z(V(n, 2), 19, () => G(ht), (e) => e.sha, (e, t, n) => {
								var r = xo();
								let i;
								var a = z(r), o = z(a, !0);
								P(a);
								var s = V(a, 2), c = z(s);
								P(s), P(r), H((e) => {
									i = Qr(r, 1, "history-row svelte-1n46o8q", null, i, { head: G(n) === 0 }), ui(a, "title", G(t).sha), Y(o, G(t).message), Y(c, `${G(t).author ?? ""}${e ?? ""}`);
								}, [() => G(t).date ? ` · ${yt.format(new Date(G(t).date))}` : ""]), J(e, r);
							}), H(() => {
								n.disabled = G(_t) || !G(g)?.allowed, ui(n, "title", G(g)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), K("click", n, xt), J(e, t);
						};
						X(i, (e) => {
							G(ht).length > 0 && e(a);
						}), J(e, t);
					};
					X(n, (e) => {
						G(ht) === null ? e(r) : e(i, -1);
					}), P(t), J(e, t);
				};
				X(o, (e) => {
					G(k) === "Sider" ? e(s) : G(k) === "Nav" ? e(l, 1) : G(k) === "Tema" ? e(u, 2) : G(k) === "Blokker" ? e(d, 3) : G(k) === "Grid" ? e(f, 4) : G(k) === "Egenskaper" ? e(p, 5) : G(k) === "Footer" ? e(h, 6) : G(k) === "Plugins" ? e(v, 7) : G(k) === "Historikk" && e(b, 8);
				}), P(t), H(() => Y(a, G(k))), J(e, t);
			};
			X(a, (e) => {
				G(k) && e(o);
			}), J(e, t);
		};
		X(r, (e) => {
			G(v) && e(a);
		});
		var o = V(r, 2);
		let s;
		var l = z(o);
		vi(l, (e) => R(h, e), () => G(h)), P(o), P(t), H(() => {
			s = Qr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: G(y) === "mobile" }), ui(l, "src", `/?page=${G(c)}&preview=1`);
		}), Sr("load", l, Tt), br(l), J(e, t);
	}, _r = (e) => {
		J(e, Do());
	};
	X(hr, (e) => {
		G(s) ? e(gr) : e(_r, -1);
	});
	var vr = V(hr, 2), yr = (e) => {
		var t = ko(), n = z(t), r = z(n), i = z(r, !0);
		P(r);
		var a = V(r, 2);
		Z(a, 16, () => G(pe).lines, (e) => e, (e, t) => {
			var n = Oo(), r = z(n, !0);
			P(n), H(() => Y(r, t)), J(e, n);
		});
		var o = V(a, 2), s = z(o), c = z(s, !0);
		P(s);
		var l = V(s, 2), u = z(l, !0);
		P(l), P(o), P(n), P(t), H(() => {
			Y(i, G(pe).title), Y(c, G(pe).cancelLabel), Y(u, G(pe).okLabel);
		}), K("click", s, () => he(!1)), K("click", l, () => he(!0)), J(e, t);
	};
	X(vr, (e) => {
		G(pe) && e(yr);
	});
	var xr = V(vr, 2), Cr = (e) => {
		var t = Ao(), n = z(t), r = V(z(n), 4), i = V(z(r));
		Q(i), P(r);
		var a = V(r, 2);
		Di(V(z(a)), {
			get value() {
				return G(ve);
			},
			label: "Aksentfarge",
			onchange: (e) => R(ve, e, !0)
		}), P(a);
		var o = V(a, 2);
		Di(V(z(o)), {
			get value() {
				return G(ye);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => R(ye, e, !0)
		}), P(o);
		var s = V(o, 4), c = z(s), l = V(c, 2);
		P(s), P(n), P(t), H((e) => l.disabled = e, [() => !G(_e).trim()]), K("keydown", i, (e) => e.key === "Enter" && xe()), mi(i, () => G(_e), (e) => R(_e, e)), K("click", c, be), K("click", l, xe), J(e, t);
	};
	X(xr, (e) => {
		G(ge) && e(Cr);
	});
	var wr = V(xr, 2), Tr = (e) => {
		var t = jo();
		let n;
		var r = z(t), i = z(r, !0);
		P(r);
		var a = V(r, 2);
		P(t), H(() => {
			n = Qr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: G(d) === "ok",
				error: G(d) === "error"
			}), Y(i, G(u));
		}), K("click", a, () => p("")), J(e, t);
	};
	X(wr, (e) => {
		G(u) && e(Tr);
	}), P(Qn), H(() => {
		nr = Qr(tr, 1, "topbar svelte-1n46o8q", null, nr, { hidden: !G(v) }), ar !== (ar = G(o)) && (ir.value = (ir.__value = G(o)) ?? "", ti(ir, G(o)));
	}), K("change", ir, (e) => R(o, e.target.value, !0)), J(e, Qn), Ue();
}
Cr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Po = Mr(No, { target: document.getElementById("urd-admin") });
//#endregion
export { Po as default };
