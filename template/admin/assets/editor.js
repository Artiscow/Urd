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
var Ae;
function je(e) {
	if (e === null) throw De(), Ce;
	return Ae = e;
}
function j() {
	return je(/* @__PURE__ */ ln(Ae));
}
function M(e) {
	if (A) {
		if (/* @__PURE__ */ ln(Ae) !== null) throw De(), Ce;
		Ae = e;
	}
}
function N(e = 1) {
	if (A) {
		for (var t = e, n = Ae; t--;) n = /* @__PURE__ */ ln(n);
		Ae = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = Ae;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ ln(n);
		e && n.remove(), n = i;
	}
}
function Ne(e) {
	if (!e || e.nodeType !== 8) throw De(), Ce;
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
		for (var r of n) bn(r);
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= T, et(t.deps));
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
	A && /* @__PURE__ */ cn(e) !== null && un(e);
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
	var t = U, n = W;
	Un(null), Wn(null);
	try {
		return e();
	} finally {
		Un(t), Wn(n);
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
	let t = 0, n = Jt(0), r;
	return () => {
		_n() && (G(n), wn(() => (t === 0 && (r = dr(() => e(() => Qt(n)))), t += 1, () => {
			qe(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ut = S | ee;
function dt(e, t, n, r) {
	new ft(e, t, n, r);
}
var ft = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = A ? Ae : null;
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
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Tn(() => {
			if (A) {
				let e = this.#t;
				j();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ut), A && (this.#e = Ae);
	}
	#g() {
		try {
			this.#a = En(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = En(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = En(() => e(this.#e)), qe(() => {
			var e = this.#c = document.createDocumentFragment(), t = sn();
			e.append(t), this.#a = this.#x(() => En(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Nn(this.#o, () => {
				this.#o = null;
			}), this.#b(F));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = En(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Ln(this.#a, e);
				let t = this.#n.pending;
				this.#o = En(() => t(this.#e));
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
		var t = W, n = U, r = Be;
		Wn(this.#i), Un(this.#i), Ve(this.#i.ctx);
		try {
			return It.ensure(), e();
		} catch (e) {
			return Ye(e), null;
		} finally {
			Wn(t), Un(n), Ve(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Nn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, qe(() => {
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork ? (this.#a && F.skip_effect(this.#a), this.#o && F.skip_effect(this.#o), this.#s && F.skip_effect(this.#s), F.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), A && (je(this.#t), N(), je(Me()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Oe();
				return;
			}
			r = !0, i && Se(), this.#s !== null && Nn(this.#s, () => {
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
					return En(() => {
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
	var e = W, t = U, n = Be, r = F;
	return function(i = !0) {
		Wn(e), Un(t), Ve(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	Wn(null), Un(null), Ve(null), e && F?.deactivate();
}
function gt() {
	var e = W, t = e.b, n = F, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | g;
	return W !== null && (W.f |= ee), {
		ctx: Be,
		deps: null,
		effects: null,
		equals: Pe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: W,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = W;
	r === null && fe();
	var i = void 0, a = Jt(O), o = !U, s = /* @__PURE__ */ new Set();
	return Cn(() => {
		var t = W, n = p();
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
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= ne, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), vn(() => {
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
	return Kn(t), t;
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
		for (var n = 0; n < t.length; n += 1) An(t[n]);
	}
}
function St(e) {
	var t, n = W, r = e.parent;
	if (!Bn && r !== null && e.v !== O && r.f & 24576) return Ee(), e.v;
	Wn(r);
	try {
		e.f &= ~T, xt(e), t = ir(e);
	} finally {
		Wn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = tr(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : (F.capture(e, t, !0), Dt?.capture(e, t, !0)), e.deps === null))) {
		Qe(e, h);
		return;
	}
	Bn || (Ot === null ? $e(e) : (_n() || F?.is_fork) && Ot.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), or(t, 0), On(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && sr(t);
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
		this.#e = !0, Pt++ > 1e3 && (this.#x(), I());
		for (let e of this.#u) this.#d.delete(e), Qe(e, g), this.schedule(e);
		for (let e of this.#d) Qe(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Mt = [], r = [], i = Nt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (F = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Mt = null, Nt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
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
		this.#r.clear(), Dt = this, zt(r), zt(n), Dt = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : nr(r) && (i & 16 && this.#d.add(r), sr(r));
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
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Ot?.set(e, t)), this.is_fork || (e.v = t);
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
			Pt = 0, kt = null, Mt = null, Nt = null, jt = !1, F = null, Ot = null, Kt.clear();
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
		for (e && (F !== null && !F.is_fork && F.flush(), n = e());;) {
			if (Je(), F === null) return n;
			F.flush();
		}
	} finally {
		At = t;
	}
}
function I() {
	try {
		_e();
	} catch (e) {
		Xe(e, kt);
	}
}
var Rt = null;
function zt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && nr(r) && (Rt = /* @__PURE__ */ new Set(), sr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Mn(r), Rt?.size > 0)) {
				Kt.clear();
				for (let e of Rt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Rt.has(n) && (Rt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || sr(n);
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
	F.schedule(e);
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
function L(e, t) {
	let n = Jt(e, t);
	return Kn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Ie), r;
}
function R(e, t, n = !1) {
	return U !== null && (!Hn || U.f & 131072) && We() && U.f & 4325394 && (Gn === null || !Gn.has(e)) && xe(), Xt(e, n ? en(t) : t, Nt);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Kt.set(e, Bn ? t : e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), Ot === null && $e(t);
		}
		e.wv = tr(), $t(e, g, n), We() && W !== null && W.f & 1024 && !(W.f & 96) && (Yn === null ? Xn([e]) : Yn.push(e)), !r.is_fork && Gt.size > 0 && !qt && Zt();
	}
	return t;
}
function Zt() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && Qe(e, _);
		let t;
		try {
			t = nr(e);
		} catch {
			t = !0;
		}
		t && sr(e);
	}
	Gt.clear();
}
function Qt(e) {
	R(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = We(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && Qe(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				Ot?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= T), $t(u, _, n));
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
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = $n, f = (e) => {
		if ($n === d) return e();
		var t = U, n = $n;
		Un(null), er(d);
		var r = e();
		return Un(t), er(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ye();
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
					let e = f(() => /* @__PURE__ */ L(O, u));
					r.set(t, e), Qt(o);
				}
			} else R(n, O), Qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(en(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === O ? void 0 : c;
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
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? en(e[t]) : O, u)), r.set(t, n)), G(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(O, u)), r.set(d + "", p)) : R(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, en(n)), r.set(t, c));
			else {
				l = c.v !== O;
				var m = f(() => en(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Qt(o);
			}
			return !0;
		},
		ownKeys(e) {
			G(o);
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
var tn, nn, rn, an;
function on() {
	if (tn === void 0) {
		tn = window, nn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function sn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return rn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
function z(e, t) {
	if (!A) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(Ae);
	if (n === null) n = Ae.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), je(r), r;
	}
	return t && pn(n), je(n), n;
}
function B(e, t = !1) {
	if (!A) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (Ae?.nodeType !== 3) {
			var r = sn();
			return Ae?.before(r), je(r), r;
		}
		pn(Ae);
	}
	return Ae;
}
function V(e, t = 1, n = !1) {
	let r = A ? Ae : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!A) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), je(a), a;
		}
		pn(r);
	}
	return je(r), r;
}
function un(e) {
	e.textContent = "";
}
function dn() {
	return !1;
}
function fn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function pn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function mn(e) {
	W === null && (U === null && ge(e), he()), Bn && me(e);
}
function hn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function gn(e, t) {
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
	F?.register_created_effect(r);
	var i = r;
	if (e & 4) Mt === null ? It.ensure().schedule(r) : Mt.push(r);
	else if (t !== null) {
		try {
			sr(r);
		} catch (e) {
			throw An(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && hn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function _n() {
	return U !== null && !Hn;
}
function vn(e) {
	let t = gn(8, null);
	return Qe(t, h), t.teardown = e, t;
}
function yn(e) {
	mn("$effect");
	var t = W.f;
	if (!U && t & 32 && Be !== null && !Be.i) {
		var n = Be;
		(n.e ??= []).push(e);
	} else return bn(e);
}
function bn(e) {
	return gn(4 | C, e);
}
function xn(e) {
	It.ensure();
	let t = gn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Nn(t, () => {
			An(t), n(void 0);
		}) : (An(t), n(void 0));
	});
}
function Sn(e) {
	return gn(4, e);
}
function Cn(e) {
	return gn(te | ee, e);
}
function wn(e, t = 0) {
	return gn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		gn(8, () => {
			e(...t.map(G));
		});
	});
}
function Tn(e, t = 0) {
	return gn(16 | t, e);
}
function En(e) {
	return gn(32 | ee, e);
}
function Dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Bn, n = U;
		Vn(!0), Un(null);
		try {
			t.call(null);
		} finally {
			Vn(e), Un(n);
		}
	}
}
function On(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && st(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : An(n, t), n = r;
	}
}
function kn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || An(t), t = n;
	}
}
function An(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (jn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, On(e, t && !n), or(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Dn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function jn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ ln(e);
		e.remove(), e = n;
	}
}
function Mn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Nn(e, t, n = !0) {
	var r = [];
	Pn(e, r, !0);
	var i = () => {
		n && An(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Pn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Pn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Fn(e) {
	In(e, !0);
}
function In(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (Qe(e, g), It.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			In(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Ln(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ ln(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Rn = null, zn = !1, Bn = !1;
function Vn(e) {
	Bn = e;
}
var U = null, Hn = !1;
function Un(e) {
	U = e;
}
var W = null;
function Wn(e) {
	W = e;
}
var Gn = null;
function Kn(e) {
	U !== null && (Gn ??= /* @__PURE__ */ new Set()).add(e);
}
var qn = null, Jn = 0, Yn = null;
function Xn(e) {
	Yn = e;
}
var Zn = 1, Qn = 0, $n = Qn;
function er(e) {
	$n = e;
}
function tr() {
	return ++Zn;
}
function nr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~T), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (nr(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && Ot === null && Qe(e, h);
	}
	return !1;
}
function rr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Gn !== null && Gn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? rr(a, t, !1) : t === a && (n ? Qe(a, g) : a.f & 1024 && Qe(a, _), Ht(a));
	}
}
function ir(e) {
	var t = qn, n = Jn, r = Yn, i = U, a = Gn, o = Be, s = Hn, c = $n, l = e.f;
	qn = null, Jn = 0, Yn = null, U = l & 96 ? null : e, Gn = null, Ve(e.ctx), Hn = !1, $n = ++Qn, e.ac !== null && (st(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= E;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (qn !== null) {
			var m;
			if (p || or(e, Jn), f !== null && Jn > 0) for (f.length = Jn + qn.length, m = 0; m < qn.length; m++) f[Jn + m] = qn[m];
			else e.deps = f = qn;
			if (_n() && e.f & 512) for (m = Jn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Jn < f.length && (or(e, Jn), f.length = Jn);
		if (We() && Yn !== null && !Hn && f !== null && !(e.f & 6146)) for (m = 0; m < Yn.length; m++) rr(Yn[m], e);
		if (i !== null && i !== e) {
			if (Qn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Qn;
			if (t !== null) for (let e of t) e.rv = Qn;
			Yn !== null && (r === null ? r = Yn : r.push(...Yn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Ye(e);
	} finally {
		e.f ^= E, qn = t, Jn = n, Yn = r, U = i, Gn = a, Ve(o), Hn = s, $n = c;
	}
}
function ar(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (qn === null || !n.call(qn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== O && $e(s), s.ac !== null && st(() => {
			s.ac.abort(ue), s.ac = null, Qe(s, g);
		}), wt(s), or(s, 0);
	}
}
function or(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ar(e, n[r]);
}
function sr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Qe(e, h);
		var n = W, r = zn;
		W = e, zn = (t & 96) == 0;
		try {
			t & 16777232 ? kn(e) : On(e), Dn(e);
			var i = ir(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Zn;
		} finally {
			zn = r, W = n;
		}
	}
}
async function cr() {
	await Promise.resolve(), Lt();
}
function G(e) {
	var t = (e.f & 2) != 0;
	if (Rn?.add(e), U !== null && !Hn && !(W !== null && W.f & 16384) && (Gn === null || !Gn.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < Qn && (e.rv = Qn, qn === null && r !== null && r[Jn] === e ? Jn++ : qn === null ? qn = [e] : qn.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Bn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Bn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || ur(a)) && (o = St(a)), Kt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Hn && U !== null && (zn || (U.f & 512) != 0), c = (a.f & b) === 0;
		nr(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), lr(a));
	}
	if (Ot?.has(e)) return Ot.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function lr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), lr(t));
}
function ur(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && ur(t)) return !0;
	return !1;
}
function dr(e) {
	var t = Hn;
	try {
		return Hn = !0, e();
	} finally {
		Hn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var fr = ["touchstart", "touchmove"];
function pr(e) {
	return fr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var mr = Symbol("events"), hr = /* @__PURE__ */ new Set(), gr = /* @__PURE__ */ new Set();
function _r(e) {
	if (!A) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function vr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Sr.call(t, e), !e.cancelBubble) return st(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? qe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function yr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = vr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && vn(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[mr] ??= {})[e] = n;
}
function br(e) {
	for (var t = 0; t < e.length; t++) hr.add(e[t]);
	for (var n of gr) n(e);
}
var xr = null;
function Sr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	xr = e;
	var s = 0, c = xr === e && e[mr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[mr] = t;
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
		Un(null), Wn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[mr]?.[r];
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
			e[mr] = t, delete e.currentTarget, Un(d), Wn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Cr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function wr(e) {
	return Cr?.createHTML(e) ?? e;
}
function Tr(e) {
	var t = fn("template");
	return t.innerHTML = wr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Er(e, t) {
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
		if (A) return Er(Ae, null), Ae;
		i === void 0 && (i = Tr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			Er(o, s);
		} else Er(t, t);
		return t;
	};
}
function Dr(e = "") {
	if (!A) {
		var t = sn(e + "");
		return Er(t, t), t;
	}
	var n = Ae;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), je(n)), Er(n, n), n;
}
function Or() {
	if (A) return Er(Ae, null), Ae;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Er(t, n), e;
}
function J(e, t) {
	if (A) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ae), j();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function kr(e, t) {
	return jr(e, t);
}
var Ar = /* @__PURE__ */ new Map();
function jr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	on();
	var l = void 0, u = xn(() => {
		var s = n ?? t.appendChild(sn());
		dt(s, { pending: () => {} }, (t) => {
			He({});
			var n = Be;
			if (o && (n.c = o), a && (i.$$events = a), A && Er(t, null), l = e(t, i) || {}, A && (W.nodes.end = Ae, Ae === null || Ae.nodeType !== 8 || Ae.data !== "]")) throw De(), Ce;
			Ue();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = pr(r);
					for (let e of [t, document]) {
						var a = Ar.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ar.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Sr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(hr)), gr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Ar.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Sr), r.delete(e), r.size === 0 && Ar.delete(n)) : r.set(e, i);
			}
			gr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Mr.set(l, u), l;
}
var Mr = /* @__PURE__ */ new WeakMap(), Nr = class {
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
			if (n) Fn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Fn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (An(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Ln(r, t), t.append(sn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else An(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Nn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (An(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = F, r = dn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = sn();
			i.append(a), this.#n.set(e, {
				effect: En(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, En(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else A && (this.anchor = Ae), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	A && (r = Ae, j());
	var i = new Nr(e), a = n ? S : 0;
	function o(e, t) {
		if (A) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				je(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Tn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Pr(e, t) {
	return t;
}
function Fr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Nn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Ir(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			un(d), d.append(u), e.items.clear();
		}
		Ir(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Ir(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= w, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var Lr;
function Rr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? je(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	A && j();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Br(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, Hr(d, null, c)) : Fn(d) : Nn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Tn(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			A && Ne(c) === "[!" != (e === 0) && (c = Me(), je(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = dn(), y = 0; y < e; y += 1) {
				A && Ae.nodeType === 8 && Ae.data === "]" && (c = Ae, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Vr(l, h ? c : Lr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(Lr ??= sn())), d.f |= w)), e > r.size && pe("", "", ""), A && e > 0 && je(Me()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && ke(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, A && (c = Ae);
}
function zr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Br(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = zr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= w, _ === l) Hr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Ur(e, d, _), Ur(e, _, y), Hr(_, y, n), d = _, p = [], m = [], l = zr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Hr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Ur(e, S.prev, ee.next), Ur(e, d, S), Ur(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), Hr(_, l, n), Ur(e, _.prev, _.next), Ur(e, _, d === null ? e.effect.first : d.next), Ur(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = zr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = zr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Ir(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = zr(l.next);
		var T = C.length;
		if (T > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) C[v].nodes?.a?.fix();
			}
			Fr(e, C, E);
		}
	}
	o && qe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Vr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
	return {
		v: c,
		i: l,
		e: En(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Hr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ur(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Z(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		A && (o = je(/* @__PURE__ */ cn(c)));
	}
	H(() => {
		var e = W;
		if (s === (s = t() ?? "")) {
			A && j();
			return;
		}
		if (n && !A) {
			e.nodes = null, c.innerHTML = s, s !== "" && Er(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (A) {
				for (var a = Ae.data, l = j(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw De(), Ce;
				Er(Ae, u), o = je(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? Te : i ? k : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Er(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
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
		e[le] = n, qe(n), ot();
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
	ct(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ci(e) ? li(a) : a, n(a), F !== null && r.add(F), await cr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (A && e.defaultValue !== e.value || dr(t) == null && e.value) && (n(ci(e) ? li(e.value) : e.value), F !== null && r.add(F)), wn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = F;
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
	var i = Be.r, a = W;
	return Sn(() => {
		var o, s;
		return wn(() => {
			o = s, s = r?.() || [], dr(() => {
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
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), G(u)) : (l && (l = !1, c = s ? dr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || ie in e;
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
	o && G(y);
	var b = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(y) : i && o ? en(e) : e;
			return R(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Bn && v || b.f & 16384 ? y.v : G(y);
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
var mi = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), hi = /* @__PURE__ */ q("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), gi = /* @__PURE__ */ q("<button type=\"button\"></button>"), _i = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), vi = /* @__PURE__ */ q("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), yi = /* @__PURE__ */ q("<span class=\"cp-tokens svelte-zxiloo\"></span>"), bi = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), xi = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Si = /* @__PURE__ */ q("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), Ci = /* @__PURE__ */ q("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function wi(e, t) {
	He(t, !0);
	let n = fi(t, "value", 3, "#000000"), r = fi(t, "tokens", 19, () => []), i = fi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ L(en([])), u = /* @__PURE__ */ L(en([])), d = "", f = "", p = /* @__PURE__ */ L(null), h = /* @__PURE__ */ L(!1), g = /* @__PURE__ */ L(en({
		top: 0,
		left: 0
	})), _ = /* @__PURE__ */ L(0), v = /* @__PURE__ */ L(0), y = /* @__PURE__ */ L(1), b = /* @__PURE__ */ L(1), x = /* @__PURE__ */ L("#000000");
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
		return ee(...w(G(_), G(v), G(y)));
	}
	function E() {
		let e = T();
		return G(b) >= .995 ? e : e + Math.round(G(b) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		R(x, E(), !0), f = G(x), t.onchange?.(G(x));
	}
	function ne(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			R(_, t[0], !0), R(v, t[1], !0), R(y, t[2], !0);
		})(C(t[0], t[1], t[2])), R(b, t[3], !0), R(x, E(), !0), !0) : !1;
	}
	function re() {
		ne(s()) || ne("#000000"), d = n(), f = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			R(l, Array.isArray(e) ? e : [], !0);
		} catch {
			R(l, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			R(u, Array.isArray(e) ? e : [], !0);
		} catch {
			R(u, [], !0);
		}
		let e = G(p).getBoundingClientRect(), t = G(p).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), c = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		R(g, {
			top: c,
			left: i
		}, !0), R(h, !0);
	}
	function ie() {
		if (R(h, !1), f && f !== d) {
			let e = [f, ...G(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function D(e, n) {
		ne(n), R(x, n, !0), t.onchange?.(e);
	}
	function ae(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			R(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), R(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function oe(e) {
		ne(e.target.value) ? te() : R(x, T(), !0);
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
			R(_, t[0], !0), R(v, t[1], !0), R(y, t[2], !0);
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
		G(u).includes(e) || (R(u, [e, ...G(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(Re(G(u)))));
	}
	function pe(e) {
		R(u, G(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(Re(G(u))));
	}
	yn(() => {
		if (!G(h)) return;
		let e = (e) => {
			G(p) && !G(p).contains(e.target) && ie();
		}, t = (e) => {
			e.key === "Escape" && ie();
		}, n = () => ie();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var me = Ci(), he = z(me);
	let ge;
	var _e = V(he, 2), ve = (e) => {
		var t = Si(), i = z(t), a = z(i);
		M(i);
		var o = V(i, 2);
		Q(o);
		var s = V(o, 2);
		Q(s);
		var d = V(s, 2), f = z(d), p = V(f, 2);
		Q(p);
		var h = V(p, 2), S = (e) => {
			var t = mi();
			K("click", t, ue), J(e, t);
		};
		X(h, (e) => {
			le && e(S);
		}), M(d);
		var ee = V(d, 2);
		Rr(ee, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = hi();
			Q(r), H((e) => {
				ri(r, "title", t), $(r, e);
			}, [() => se(G(n))]), K("change", r, (e) => ce(G(n), e.target.value)), J(e, r);
		}), M(ee);
		var C = V(ee, 2), w = (e) => {
			var t = _i(), i = B(t), a = V(z(i)), o = (e) => {
				var t = Dr();
				H((e) => Y(t, `- koblet til «${e ?? ""}»`), [() => c()]), J(e, t);
			}, s = /* @__PURE__ */ P(() => c());
			X(a, (e) => {
				G(s) && e(o);
			}), M(i);
			var l = V(i, 2);
			Rr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(G(t), 2));
				let i = () => G(r)[0], a = () => G(r)[1];
				var o = gi();
				let s;
				H(() => {
					s = Yr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Zr(o, `background: ${a() ?? ""}`), ri(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), K("click", o, () => D(i(), a())), J(e, o);
			}), M(l), J(e, t);
		};
		X(C, (e) => {
			r().length && e(w);
		});
		var E = V(C, 2), ne = V(z(E));
		M(E);
		var re = V(E, 2), ie = (e) => {
			var t = yi();
			Rr(t, 20, () => G(u), (e) => e, (e, t) => {
				var n = vi(), r = z(n), i = V(r, 2);
				M(n), H(() => {
					Zr(r, `background: ${t ?? ""}`), ri(r, "title", t);
				}), K("click", r, () => de(t)), K("click", i, () => pe(t)), J(e, n);
			}), M(t), J(e, t);
		};
		X(re, (e) => {
			G(u).length && e(ie);
		});
		var me = V(re, 2), he = (e) => {
			var t = xi(), n = V(B(t), 2);
			Rr(n, 20, () => G(l), (e) => e, (e, t) => {
				var n = bi();
				H(() => {
					Zr(n, `background: ${t ?? ""}`), ri(n, "title", t);
				}), K("click", n, () => de(t)), J(e, n);
			}), M(n), J(e, t);
		};
		X(me, (e) => {
			G(l).length && e(he);
		}), M(t), H((e, n) => {
			Zr(t, `top: ${G(g).top ?? ""}px; left: ${G(g).left ?? ""}px`), Zr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${G(_) ?? ""}, 100%, 50%)`), Zr(a, `left: ${G(v) * 100}%; top: ${(1 - G(y)) * 100}%`), $(o, G(_)), $(s, e), Zr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Zr(f, `background: ${G(x) ?? ""}`), $(p, G(x));
		}, [() => Math.round(G(b) * 100), () => T()]), K("click", t, (e) => e.preventDefault()), K("pointerdown", i, ae), K("input", o, (e) => {
			R(_, Number(e.target.value), !0), te();
		}), K("input", s, (e) => {
			R(b, Number(e.target.value) / 100), te();
		}), K("change", p, oe), K("click", ne, fe), J(e, t);
	};
	X(_e, (e) => {
		G(h) && e(ve);
	}), M(me), di(me, (e) => R(p, e), () => G(p)), H((e, t, n) => {
		ge = Yr(he, 1, "cp-swatch svelte-zxiloo", null, ge, e), Zr(he, `background: ${t ?? ""}`), ri(he, "title", n), ri(he, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), K("click", he, () => G(h) ? ie() : re()), J(e, me), Ue();
}
br([
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
var Vi = /* @__PURE__ */ q("<img class=\"gp-own svelte-15ln1c3\" alt=\"Eget ikon\"/>"), Hi = /* @__PURE__ */ q("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Ui = /* @__PURE__ */ q("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Wi = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Gi = /* @__PURE__ */ q("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ki = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), qi = /* @__PURE__ */ q("<button type=\"button\"> </button>"), Ji = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Yi = /* @__PURE__ */ q("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Xi = /* @__PURE__ */ q("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Zi(e, t) {
	He(t, !0);
	let n = fi(t, "value", 3, "★"), r = fi(t, "icon", 3, null), i = fi(t, "image", 3, null), a = fi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ L(en([])), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(en({
		top: 0,
		left: 0
	}));
	function d() {
		R(o, Pi(), !0);
		let e = G(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		R(u, {
			top: n,
			left: t
		}, !0), R(l, !0);
	}
	function f(e) {
		Fi(e), t.onpick?.(e), R(l, !1);
	}
	function p(e) {
		t.onicon?.(e), R(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Oi(n, 256);
		t.onimage?.(r.dataUrl), R(l, !1);
	}
	yn(() => {
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
	var g = Xi(), _ = z(g), v = z(_), y = (e) => {
		var t = Vi();
		H(() => ri(t, "src", i())), J(e, t);
	}, b = (e) => {
		var t = Hi();
		Z(t, () => Bi(r()), !0), M(t), J(e, t);
	}, x = (e) => {
		var t = Dr();
		H(() => Y(t, n() || "★")), J(e, t);
	};
	X(v, (e) => {
		i() ? e(y) : r() && Ri[r()] ? e(b, 1) : e(x, -1);
	}), M(_);
	var S = V(_, 2), ee = (e) => {
		var i = Yi(), a = z(i), s = (e) => {
			var t = Wi(), n = V(B(t), 2);
			Rr(n, 20, () => G(o), (e) => e, (e, t) => {
				var n = Ui(), r = z(n, !0);
				M(n), H(() => Y(r, t)), K("click", n, () => f(t)), J(e, n);
			}), M(n), J(e, t);
		};
		X(a, (e) => {
			G(o).length && e(s);
		});
		var l = V(a, 2), d = (e) => {
			var t = Or();
			Rr(B(t), 17, () => zi, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(G(t), 2));
				let i = () => G(n)[0], a = () => G(n)[1];
				var o = Ki(), s = B(o), c = z(s, !0);
				M(s);
				var l = V(s, 2);
				Rr(l, 20, a, (e) => e, (e, t) => {
					var n = Gi();
					let i;
					var a = z(n);
					Z(a, () => Bi(t), !0), M(a), M(n), H(() => {
						i = Yr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ri(n, "title", Ri[t].label);
					}), K("click", n, () => p(t)), J(e, n);
				}), M(l), H(() => Y(c, i())), J(e, o);
			}), J(e, t);
		};
		X(l, (e) => {
			t.onicon && e(d);
		});
		var g = V(l, 2);
		Rr(g, 17, () => Mi, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = Ki(), s = B(o), c = z(s, !0);
			M(s);
			var l = V(s, 2);
			Rr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = qi();
				let i;
				var a = z(r, !0);
				M(r), H(() => {
					i = Yr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), Y(a, t);
				}), K("click", r, () => f(t)), J(e, r);
			}), M(l), H(() => Y(c, i())), J(e, o);
		});
		var _ = V(g, 2), v = (e) => {
			var t = Ji(), n = V(B(t), 2), r = V(n, 2);
			di(r, (e) => R(c, e), () => G(c)), N(2), K("click", n, () => G(c).click()), K("change", r, h), J(e, t);
		};
		X(_, (e) => {
			t.onimage && e(v);
		}), M(i), H(() => Zr(i, `top: ${G(u).top ?? ""}px; left: ${G(u).left ?? ""}px`)), J(e, i);
	};
	X(S, (e) => {
		G(l) && e(ee);
	}), M(g), di(g, (e) => R(s, e), () => G(s)), H(() => {
		ri(_, "title", a()), ri(_, "aria-label", a());
	}), K("click", _, () => G(l) ? R(l, !1) : d()), J(e, g), Ue();
}
br(["click", "change"]);
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
		sendShowGuides(e) {
			r({
				type: "urd-show-guides",
				visible: e
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
var $i = /* @__PURE__ */ q("<button type=\"button\"> </button>"), ea = /* @__PURE__ */ q("<div class=\"dd-pop svelte-vtocc6\"></div>"), ta = /* @__PURE__ */ q("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function na(e, t) {
	He(t, !0);
	let n = fi(t, "value", 3, null), r = fi(t, "options", 19, () => []), i = fi(t, "title", 3, null), a = fi(t, "disabled", 3, !1), o = /* @__PURE__ */ L(!1), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(en({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		if (a()) return;
		if (G(o)) {
			R(o, !1);
			return;
		}
		let e = G(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		R(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0), R(o, !0);
	}
	function d(e) {
		R(o, !1), t.onchange?.(e);
	}
	yn(() => {
		if (!G(o)) return;
		let e = (e) => {
			G(s) && !G(s).contains(e.target) && R(o, !1);
		}, t = (e) => {
			e.key === "Escape" && R(o, !1);
		}, n = (e) => {
			G(s) && e.target instanceof Node && !G(s).contains(e.target) && R(o, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var f = ta(), p = z(f), h = z(p), g = z(h, !0);
	M(h);
	var _ = V(h, 2), v = z(_, !0);
	M(_), M(p);
	var y = V(p, 2), b = (e) => {
		var t = ea();
		Rr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = $i();
			let s;
			var c = z(o, !0);
			M(o), H(() => {
				s = Yr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), Y(c, a());
			}), K("click", o, () => d(i())), J(e, o);
		}), M(t), H(() => Zr(t, `top: ${G(c).top ?? ""}px; left: ${G(c).left ?? ""}px; min-width: ${G(c).width ?? ""}px`)), J(e, t);
	};
	X(y, (e) => {
		G(o) && e(b);
	}), M(f), di(f, (e) => R(s, e), () => G(s)), H((e) => {
		ri(p, "title", i()), p.disabled = a(), Y(g, e), Y(v, G(o) ? "▴" : "▾");
	}, [() => l()]), K("click", p, u), J(e, f), Ue();
}
br(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ra = /* @__PURE__ */ q("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function ia(e, t) {
	He(t, !0);
	let n = fi(t, "image", 3, ""), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(null), a = /* @__PURE__ */ L(1), o = /* @__PURE__ */ L(.5), s = /* @__PURE__ */ L(.5), c = /* @__PURE__ */ L(1), l = /* @__PURE__ */ L(1), u = /* @__PURE__ */ L(1);
	yn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			R(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !G(i)) return;
		e.filter = `brightness(${G(c)}) contrast(${G(l)}) saturate(${G(u)})`;
		let n = Math.max(t / G(i).width, t / G(i).height) * G(a), r = G(i).width * n, d = G(i).height * n, f = t / 2 - G(o) * r, p = t / 2 - G(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(G(i), f, p, r, d), e.filter = "none";
	}
	yn(() => {
		G(i), G(a), G(o), G(s), G(c), G(l), G(u), G(r) && d(G(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!G(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / G(i).width, 220 / G(i).height) * G(a), c = G(i).width * r, l = G(i).height * r, u = (e) => {
			R(o, Math.min(1, Math.max(0, G(o) - (e.clientX - t) / c)), !0), R(s, Math.min(1, Math.max(0, G(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		R(a, 1), R(o, .5), R(s, .5), R(c, 1), R(l, 1), R(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ra(), g = z(h), _ = V(z(g), 2), v = z(_);
	ri(v, "width", 220), ri(v, "height", 220), di(v, (e) => R(r, e), () => G(r)), N(2), M(_);
	var y = V(_, 2), b = V(z(y)), x = z(b);
	M(b), M(y);
	var S = V(y, 2);
	Q(S);
	var ee = V(S, 2), C = V(z(ee)), w = z(C);
	M(C), M(ee);
	var T = V(ee, 2);
	Q(T);
	var E = V(T, 2), te = V(z(E)), ne = z(te);
	M(te), M(E);
	var re = V(E, 2);
	Q(re);
	var ie = V(re, 2), D = V(z(ie)), ae = z(D);
	M(D), M(ie);
	var oe = V(ie, 2);
	Q(oe);
	var se = V(oe, 2), ce = z(se), le = V(ce, 2);
	M(se);
	var ue = V(se, 2), de = z(ue), fe = V(de, 2);
	M(ue), M(g), M(h), H((e, t, n, r) => {
		Y(x, `${e ?? ""}x`), Y(w, `${t ?? ""}%`), Y(ne, `${n ?? ""}%`), Y(ae, `${r ?? ""}%`);
	}, [
		() => G(a).toFixed(2),
		() => Math.round(G(c) * 100),
		() => Math.round(G(l) * 100),
		() => Math.round(G(u) * 100)
	]), K("pointerdown", v, f), si(S, () => G(a), (e) => R(a, e)), si(T, () => G(c), (e) => R(c, e)), si(re, () => G(l), (e) => R(l, e)), si(oe, () => G(u), (e) => R(u, e)), K("click", ce, () => R(u, 0)), K("click", le, p), K("click", de, () => t.oncancel?.()), K("click", fe, m), J(e, h), Ue();
}
br(["pointerdown", "click"]);
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
];
//#endregion
//#region ../template/assets/engine/place.js
function Ma(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Na = /* @__PURE__ */ q("<button> </button>"), Pa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <label title=\"Avstanden mellom tekstlinjene, i forhold til skriftstørrelsen\" class=\"svelte-1n46o8q\">Linjeavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"1\" max=\"2.5\" step=\"0.05\"/></span> <label title=\"Avstanden mellom bokstavene; negativ er tettere enn normalt\" class=\"svelte-1n46o8q\">Bokstavavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"-1\" max=\"8\" step=\"0.1\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font, størrelse og avstandene gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Fa = /* @__PURE__ */ q("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ia = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), La = /* @__PURE__ */ q("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), Ra = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), za = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Ba = /* @__PURE__ */ q("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), Va = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), Ha = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), Ua = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Wa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), Ga = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ka = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), qa = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), Ja = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), Ya = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Xa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Za = /* @__PURE__ */ q("<label title=\"Avstanden fra vinduets topp mens blokken er festet; en klistret meny kan kreve større avstand\" class=\"svelte-1n46o8q\">Avstand fra toppen <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label title=\"Hvor festingen slutter: ved egen seksjon, eller først når en senere seksjon er passert\" class=\"svelte-1n46o8q\">Slipp taket <!></label>", 1), Qa = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Blokken blir stående ved vindustoppen mens besøkende scroller. Prøv i Ren visning; gjelder ikke mobil.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fest ved scrolling</label> <!>", 1), $a = /* @__PURE__ */ q("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), eo = /* @__PURE__ */ q("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), to = /* @__PURE__ */ q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), no = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span> <button title=\"Hjelpelinjer: senter og innholdsbredde i alle seksjoner\"></button>", 1), ro = /* @__PURE__ */ q("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), io = /* @__PURE__ */ q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), ao = /* @__PURE__ */ q("<!> Ren visning", 1), oo = /* @__PURE__ */ q("<!> Rediger", 1), so = /* @__PURE__ */ q("<span class=\"who svelte-1n46o8q\"><!> </span>"), co = /* @__PURE__ */ q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), lo = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), uo = /* @__PURE__ */ q("<hr class=\"rail-sep svelte-1n46o8q\"/>"), fo = /* @__PURE__ */ q("<!> <!>", 1), po = /* @__PURE__ */ q("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), mo = /* @__PURE__ */ q("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), ho = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), go = /* @__PURE__ */ q("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), _o = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), vo = /* @__PURE__ */ q("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), yo = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), bo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), xo = /* @__PURE__ */ q("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), So = /* @__PURE__ */ q("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), Co = /* @__PURE__ */ q("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label>"), wo = /* @__PURE__ */ q("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), To = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\"> <!></label>"), Eo = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bakgrunnsbildet\"></button>"), Do = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Bildestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (høyde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i høyden: 0 = toppen, 100 = bunnen. Monner mest i topplinjen\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (bredde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i bredden: 0 = venstre, 100 = høyre. Monner mest i sidestilt kolonne\" class=\"svelte-1n46o8q\"/>", 1), Oo = /* @__PURE__ */ q("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), ko = /* @__PURE__ */ q("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: undermenyen og mobilpanelet får kun bakgrunnsfargen, ikke bildet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Bakgrunnsbilde også i undermenyen</label>"), Ao = /* @__PURE__ */ q("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), jo = /* @__PURE__ */ q("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Mo = /* @__PURE__ */ q("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), No = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <label title=\"0 % = helt tett flate, 100 % = helt gjennomsiktig meny\" class=\"svelte-1n46o8q\">Gjennomsiktighet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når gjennomsiktigheten er høy)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Bakgrunnsfargen med gjennomsiktigheten legger seg som et slør over bildet; komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label> <!></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), Po = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), Fo = /* @__PURE__ */ q("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), Io = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), Lo = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), Ro = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), zo = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"> </button>"), Bo = /* @__PURE__ */ q("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Vo = /* @__PURE__ */ q("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ho = /* @__PURE__ */ q("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), Uo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Wo = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Go = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ko = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), qo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), Jo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Yo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Zo = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Qo = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), $o = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), es = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), ts = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), ns = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), rs = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), is = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), as = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Samling <!></label>"), os = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), ss = /* @__PURE__ */ q("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), cs = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), ls = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), us = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), ds = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), fs = /* @__PURE__ */ q("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), ps = /* @__PURE__ */ q("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), ms = /* @__PURE__ */ q("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), hs = /* @__PURE__ */ q("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), gs = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), _s = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), vs = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), ys = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), bs = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), xs = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ss = /* @__PURE__ */ q("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Cs = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), ws = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Ts = /* @__PURE__ */ q("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Es = /* @__PURE__ */ q("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Ds = /* @__PURE__ */ q("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Os = /* @__PURE__ */ q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), ks = /* @__PURE__ */ q("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), As = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), js = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Ms = /* @__PURE__ */ q("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Ns = /* @__PURE__ */ q("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Ps = /* @__PURE__ */ q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>  <!>", 1);
function Fs(e, t) {
	He(t, !0);
	let n = (e) => {
		var t = eo(), n = B(t), r = (e) => {
			var t = Pa(), n = B(t), r = V(z(n));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.align ?? "left");
				na(r, {
					get value() {
						return G(e);
					},
					options: [
						["left", "Venstre"],
						["center", "Midtstilt"],
						["right", "Høyre"]
					],
					onchange: (e) => j("align", e)
				});
			}
			M(n);
			var i = V(n, 2), a = z(i);
			Q(a), N(), M(i);
			var o = V(i, 2), s = V(z(o));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv fra tema"], ...Aa.map(([e, t]) => [t, e])]);
				na(s, {
					get value() {
						return G(e);
					},
					get options() {
						return G(t);
					},
					onchange: (e) => j("font", e || null)
				});
			}
			M(o);
			var c = V(o, 4), l = z(c);
			let u;
			var d = V(l, 2);
			Rr(d, 17, () => ja, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(G(t), 2));
				let r = () => G(n)[0], i = () => G(n)[1];
				var a = Na();
				let o;
				var s = z(a, !0);
				M(a), H(() => {
					o = Yr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: G(k).props.size === i() }), ri(a, "title", `${i() ?? ""} px`), Y(s, r());
				}), K("click", a, () => j("size", i())), J(e, a);
			});
			var f = V(d, 2);
			Q(f), M(c);
			var p = V(c, 2), h = V(z(p)), g = z(h, !0);
			M(h), M(p);
			var _ = V(p, 2), v = z(_);
			let y;
			var b = V(v, 2);
			Q(b), M(_);
			var x = V(_, 2), S = V(z(x)), ee = z(S, !0);
			M(S), M(x);
			var C = V(x, 2), w = z(C);
			let T;
			var E = V(w, 2);
			Q(E), M(C), N(2), H((e) => {
				ni(a, e), u = Yr(l, 1, "tbtn svelte-1n46o8q", null, u, { active: !G(k).props.size }), $(f, G(k).props.size ?? ""), Y(g, G(k).props.lineHeight ? `${G(k).props.lineHeight}` : "Arv"), y = Yr(v, 1, "tbtn svelte-1n46o8q", null, y, { active: !G(k).props.lineHeight }), $(b, G(k).props.lineHeight ?? 1.6), Y(ee, typeof G(k).props.letterSpacing == "number" && G(k).props.letterSpacing !== 0 ? `${G(k).props.letterSpacing} px` : "Arv"), T = Yr(w, 1, "tbtn svelte-1n46o8q", null, T, { active: !G(k).props.letterSpacing }), $(E, G(k).props.letterSpacing ?? 0);
			}, [() => !!G(k).props.box]), K("change", a, (e) => j("box", e.target.checked)), K("click", l, () => j("size", null)), K("change", f, (e) => j("size", e.target.value ? Number(e.target.value) : null)), K("click", v, () => j("lineHeight", null)), K("input", b, (e) => j("lineHeight", Number(e.target.value))), K("click", w, () => j("letterSpacing", null)), K("input", E, (e) => j("letterSpacing", Number(e.target.value) || null)), J(e, t);
		}, i = (e) => {
			var t = Ia(), n = B(t), r = V(z(n));
			Q(r), M(n);
			var i = V(n, 2), a = V(z(i));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...G(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				na(a, {
					get value() {
						return G(e);
					},
					get options() {
						return G(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						je(`edit:${G(k).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			M(i);
			var o = V(i, 2), s = (e) => {
				var t = Fa();
				Q(t), H(() => $(t, G(k).props.href === "#" ? "" : G(k).props.href ?? "")), K("change", t, (e) => j("href", e.target.value || null)), J(e, t);
			};
			X(o, (e) => {
				G(k).props.page || e(s);
			});
			var c = V(o, 2);
			na(V(z(c)), {
				get value() {
					return G(k).props.style;
				},
				options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
				onchange: (e) => j("style", e)
			}), M(c), H(() => $(r, G(k).props.label)), K("change", r, (e) => j("label", e.target.value)), J(e, t);
		}, o = (e) => {
			var t = Ra(), n = B(t), r = V(z(n));
			M(n);
			var i = V(n, 2), a = V(z(i));
			Q(a), M(i);
			var o = V(i, 2), s = V(z(o));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.fit ?? "cover");
				na(s, {
					get value() {
						return G(e);
					},
					options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
					onchange: (e) => j("fit", e)
				});
			}
			M(o);
			var c = V(o, 2), l = V(z(c));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.radius ?? "");
				na(l, {
					get value() {
						return G(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => j("radius", e || null)
				});
			}
			M(c);
			var u = V(c, 2), d = V(z(u));
			Q(d), M(u);
			var f = V(u, 2), p = (e) => {
				var t = La(), n = z(t);
				Q(n), N(), M(t), H((e) => ni(n, e), [() => !!G(k).props.lightbox]), K("change", n, (e) => j("lightbox", e.target.checked)), J(e, t);
			};
			X(f, (e) => {
				G(k).props.href || e(p);
			});
			var m = V(f, 2), h = V(z(m)), g = z(h);
			M(h), M(m);
			var _ = V(m, 2);
			Q(_);
			var v = V(_, 2), y = V(z(v)), b = z(y);
			M(y), M(v);
			var x = V(v, 2);
			Q(x);
			var S = V(x, 2), ee = V(z(S)), C = z(ee);
			M(ee), M(S);
			var w = V(S, 2);
			Q(w);
			var T = V(w, 2), E = V(z(T)), te = z(E);
			M(E), M(T);
			var ne = V(T, 2);
			Q(ne);
			var re = V(ne, 2), ie = V(z(re)), D = z(ie);
			M(ie), M(re);
			var ae = V(re, 2);
			Q(ae);
			var oe = V(ae, 2), se = V(z(oe)), ce = z(se);
			M(se), M(oe);
			var le = V(oe, 2);
			Q(le);
			var ue = V(le, 2);
			H((e, t, n, r, i, o) => {
				$(a, G(k).props.alt ?? ""), $(d, G(k).props.href ?? ""), Y(g, `${e ?? ""}%`), $(_, G(k).props.x ?? .5), Y(b, `${t ?? ""}%`), $(x, G(k).props.y ?? .5), Y(C, `${n ?? ""}x`), $(w, G(k).props.zoom ?? 1), Y(te, `${r ?? ""}%`), $(ne, G(k).props.brightness ?? 1), Y(D, `${i ?? ""}%`), $(ae, G(k).props.contrast ?? 1), Y(ce, `${o ?? ""}%`), $(le, G(k).props.saturate ?? 1);
			}, [
				() => Math.round((G(k).props.x ?? .5) * 100),
				() => Math.round((G(k).props.y ?? .5) * 100),
				() => (G(k).props.zoom ?? 1).toFixed(2),
				() => Math.round((G(k).props.brightness ?? 1) * 100),
				() => Math.round((G(k).props.contrast ?? 1) * 100),
				() => Math.round((G(k).props.saturate ?? 1) * 100)
			]), K("change", r, Pe), K("change", a, (e) => j("alt", e.target.value)), K("change", d, (e) => j("href", e.target.value || null)), K("input", _, (e) => j("x", Number(e.target.value))), K("input", x, (e) => j("y", Number(e.target.value))), K("input", w, (e) => j("zoom", Number(e.target.value))), K("input", ne, (e) => j("brightness", Number(e.target.value))), K("input", ae, (e) => j("contrast", Number(e.target.value))), K("input", le, (e) => j("saturate", Number(e.target.value))), K("click", ue, () => je(`edit:${G(k).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), J(e, t);
		}, s = (e) => {
			var t = za(), n = V(B(t), 2);
			Q(n);
			var r = V(n, 2), i = V(z(r));
			Q(i), M(r), N(2), H(() => {
				$(n, G(k).props.url ?? ""), $(i, G(k).props.title ?? "");
			}), K("change", n, (e) => j("url", e.target.value)), K("change", i, (e) => j("title", e.target.value)), J(e, t);
		}, c = (e) => {
			var t = Ua(), n = B(t), r = V(z(n)), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => G(k).props.glyph ?? "★"), t = /* @__PURE__ */ P(() => G(k).props.icon ?? null), n = /* @__PURE__ */ P(() => G(k).props.image ?? null);
				Zi(i, {
					get value() {
						return G(e);
					},
					get icon() {
						return G(t);
					},
					get image() {
						return G(n);
					},
					onpick: (e) => je(`edit:${G(k).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => je(`edit:${G(k).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => j("image", e)
				});
			}
			var a = V(i, 2), o = (e) => {
				var t = Ba();
				Q(t), H(() => $(t, G(k).props.glyph ?? "")), K("change", t, (e) => j("glyph", e.target.value || "★")), J(e, t);
			}, s = (e) => {
				var t = Va();
				K("click", t, () => j("icon", null)), J(e, t);
			};
			X(a, (e) => {
				G(k).props.icon ? e(s, -1) : e(o);
			}), M(r), M(n);
			var c = V(n, 2), l = (e) => {
				var t = Ha(), n = B(t), r = z(n), i = V(r, 2);
				M(n), N(2), H(() => ri(r, "src", G(k).props.image)), K("click", i, () => j("image", null)), J(e, t);
			};
			X(c, (e) => {
				G(k).props.image && e(l);
			});
			var u = V(c, 2), d = V(z(u));
			Q(d), M(u);
			var f = V(u, 2), p = V(z(f));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.color ?? "accent"), t = /* @__PURE__ */ P(ct);
				wi(p, {
					get value() {
						return G(e);
					},
					get tokens() {
						return G(t);
					},
					onchange: (e) => j("color", e)
				});
			}
			M(f), N(2), H(() => $(d, G(k).props.size ?? 48)), K("change", d, (e) => j("size", Number(e.target.value))), J(e, t);
		}, l = (e) => {
			var t = Wa(), n = B(t), r = V(z(n));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...G(_n).map((e) => [e, G(vn)[e]?.name ?? e])]);
				na(r, {
					get value() {
						return G(e);
					},
					get options() {
						return G(t);
					},
					onchange: (e) => j("collection", e || null)
				});
			}
			M(n);
			var i = V(n, 2), a = V(z(i));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.view ?? "cards");
				na(a, {
					get value() {
						return G(e);
					},
					options: [
						["cards", "Kort"],
						["list", "Liste"],
						["archive", "Arkiv (per år)"]
					],
					onchange: (e) => j("view", e)
				});
			}
			M(i);
			var o = V(i, 2), s = V(z(o));
			Q(s), M(o);
			var c = V(o, 2), l = z(c);
			Q(l), N(), M(c), N(2), H(() => {
				$(s, G(k).props.limit ?? 6), ni(l, G(k).props.newestFirst !== !1);
			}), K("change", s, (e) => j("limit", Number(e.target.value))), K("change", l, (e) => j("newestFirst", e.target.checked)), J(e, t);
		}, u = (e) => {
			var t = Ja(), n = B(t), r = V(z(n));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.view ?? "grid");
				na(r, {
					get value() {
						return G(e);
					},
					options: [
						["grid", "Rutenett"],
						["carousel", "Karusell"],
						["slides", "Lysbilde (bytter automatisk)"]
					],
					onchange: (e) => j("view", e)
				});
			}
			M(n);
			var i = V(n, 2), o = (e) => {
				var t = Ga(), n = B(t), r = V(z(n));
				Q(r), M(n);
				var i = V(n, 2), a = V(z(i)), o = z(a);
				M(a), M(i);
				var s = V(i, 2);
				Q(s), H(() => {
					$(r, G(k).props.columns ?? 3), Y(o, `${G(k).props.gap ?? 12 ?? ""} px`), $(s, G(k).props.gap ?? 12);
				}), K("change", r, (e) => j("columns", Number(e.target.value))), K("input", s, (e) => j("gap", Number(e.target.value))), J(e, t);
			};
			X(i, (e) => {
				(G(k).props.view ?? "grid") === "grid" && e(o);
			});
			var s = V(i, 2), c = (e) => {
				var t = Ka(), n = V(z(t));
				Q(n), M(t), H(() => $(n, G(k).props.interval ?? 5)), K("change", n, (e) => j("interval", Number(e.target.value))), J(e, t);
			};
			X(s, (e) => {
				G(k).props.view === "slides" && e(c);
			});
			var l = V(s, 2), u = V(z(l));
			{
				let e = /* @__PURE__ */ P(() => G(k).props.radius ?? "");
				na(u, {
					get value() {
						return G(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => j("radius", e || null)
				});
			}
			M(l);
			var d = V(l, 2), f = z(d);
			Q(f), N(), M(d);
			var p = V(d, 4), m = V(z(p));
			M(p), Rr(V(p, 2), 17, () => G(k).props.images ?? [], Pr, (e, t, n) => {
				var r = qa(), i = z(r), o = z(i), s = V(o, 2), c = z(s);
				c.disabled = n === 0, Z(c, () => a.up, !0), M(c);
				var l = V(c, 2);
				Z(l, () => a.down, !0), M(l);
				var u = V(l, 2);
				Z(u, () => a.cross, !0), M(u), M(s), M(i);
				var d = V(i, 2), f = V(z(d));
				Q(f), M(d);
				var p = V(d, 2), m = V(z(p));
				Q(m), M(p), M(r), H(() => {
					ri(o, "src", G(t).src), l.disabled = n === G(k).props.images.length - 1, $(f, G(t).alt ?? ""), $(m, G(t).href ?? "");
				}), K("click", c, () => oi(n, -1)), K("click", l, () => oi(n, 1)), K("click", u, () => ci(n)), K("change", f, (e) => li(n, "alt", e.target.value)), K("change", m, (e) => li(n, "href", e.target.value || null)), J(e, r);
			}), N(2), H(() => ni(f, G(k).props.lightbox !== !1)), K("change", f, (e) => j("lightbox", e.target.checked)), K("change", m, ii), J(e, t);
		}, d = (e) => {
			var t = Ya(), n = B(t);
			na(V(z(n)), {
				get value() {
					return G(k).props.kind;
				},
				get options() {
					return Ie;
				},
				onchange: (e) => j("kind", e)
			}), M(n);
			var r = V(n, 2);
			na(V(z(r)), {
				get value() {
					return G(k).props.color;
				},
				get options() {
					return Le;
				},
				onchange: (e) => j("color", e)
			}), M(r);
			var i = V(r, 2), a = V(z(i));
			Q(a), M(i);
			var o = V(i, 2), s = z(o);
			Q(s), N(), M(o), H((e) => {
				$(a, G(k).props.thickness), ni(s, e);
			}, [() => !!G(k).props.fill]), K("change", a, (e) => j("thickness", Number(e.target.value))), K("change", s, (e) => j("fill", e.target.checked ? G(k).props.color : null)), J(e, t);
		};
		X(n, (e) => {
			G(k).type === "text" ? e(r) : G(k).type === "button" ? e(i, 1) : G(k).type === "image" ? e(o, 2) : G(k).type === "video" ? e(s, 3) : G(k).type === "icon" ? e(c, 4) : G(k).type === "samling" ? e(l, 5) : G(k).type === "galleri" ? e(u, 6) : G(k).type === "shape" && e(d, 7);
		});
		var f = V(n, 4), p = V(z(f));
		{
			let e = /* @__PURE__ */ P(() => G(k).animation?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(ka).map(([e, t]) => [e, t.label])]);
			na(p, {
				get value() {
					return G(e);
				},
				get options() {
					return G(t);
				},
				onchange: (e) => ut(e || null)
			});
		}
		M(f);
		var h = V(f, 2), g = (e) => {
			var t = Xa(), n = B(t), r = V(z(n));
			Q(r), M(n);
			var i = V(n, 2), a = V(z(i));
			Q(a), M(i), N(2), H(() => {
				$(r, G(k).animation.props.duration), $(a, G(k).animation.props.delay);
			}), K("change", r, (e) => dt("duration", Number(e.target.value))), K("change", a, (e) => dt("delay", Number(e.target.value))), J(e, t);
		};
		X(h, (e) => {
			G(k).animation && ka[G(k).animation.type]?.entrance && e(g);
		});
		var _ = V(h, 2), v = (e) => {
			var t = Qa(), n = V(B(t), 2), r = z(n);
			Q(r), N(), M(n);
			var i = V(n, 2), a = (e) => {
				var t = Za(), n = B(t), r = V(z(n));
				Q(r), M(n);
				var i = V(n, 2), a = V(z(i));
				{
					let e = /* @__PURE__ */ P(() => G(k).sticky.until ?? ""), t = /* @__PURE__ */ P(ke);
					na(a, {
						get value() {
							return G(e);
						},
						get options() {
							return G(t);
						},
						onchange: (e) => je(`edit:${G(k).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				M(i), H(() => $(r, G(k).sticky.offset ?? 16)), K("change", r, (e) => je(`edit:${G(k).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), J(e, t);
			};
			X(i, (e) => {
				G(k).sticky && e(a);
			}), H((e) => ni(r, e), [() => !!G(k).sticky]), K("change", r, (e) => je(`edit:${G(k).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), J(e, t);
		};
		X(_, (e) => {
			G(b) === "desktop" && e(v);
		});
		var y = V(_, 4), x = V(z(y), 2), S = V(z(x), 2), ee = (e) => {
			var t = $a(), n = z(t), r = V(z(n));
			Q(r), M(n);
			var i = V(n, 2), a = V(z(i));
			Q(a), M(i);
			var o = V(i, 2), s = V(z(o));
			Q(s), M(o);
			var c = V(o, 2), l = V(z(c));
			Q(l), M(c);
			var u = V(c, 2), d = V(z(u));
			Q(d), M(u);
			var f = V(u, 2), p = V(z(f));
			Q(p), M(f), M(t), H(() => {
				$(r, G(k).frame.x), $(a, G(k).frame.y), $(s, G(k).frame.w), $(l, G(k).frame.h), $(d, G(k).frame.z ?? 1), $(p, G(k).frame.rot ?? 0);
			}), K("change", r, (e) => Me("x", Number(e.target.value))), K("change", a, (e) => Me("y", Number(e.target.value))), K("change", s, (e) => Me("w", Number(e.target.value))), K("change", l, (e) => Me("h", Number(e.target.value))), K("change", d, (e) => Me("z", Number(e.target.value))), K("change", p, (e) => Me("rot", Number(e.target.value))), J(e, t);
		};
		X(S, (e) => {
			G(b) === "desktop" && e(ee);
		});
		var C = V(S, 2), w = z(C);
		Q(w), N(), M(C), M(x), M(y), H(() => ni(w, G(k).decor)), K("change", w, (e) => Ne(e.target.checked)), J(e, t);
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
		plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>",
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 3v4M12 17v4M3 12h4M17 12h4\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\" stroke-dasharray=\"2.5 2.5\"/></svg>"
	}, o = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], s = /* @__PURE__ */ L(en(localStorage.getItem("urd-admin-theme") ?? "graa"));
	yn(() => {
		document.documentElement.dataset.adminTheme = G(s), localStorage.setItem("urd-admin-theme", G(s));
	});
	let c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(null), u = /* @__PURE__ */ L(!1), d = /* @__PURE__ */ L(""), f = /* @__PURE__ */ L("info"), p = 0;
	function h(e, t = "info") {
		R(d, e, !0), R(f, t, !0);
		let n = ++p;
		t === "ok" && setTimeout(() => {
			p === n && (R(d, ""), R(f, "info"));
		}, 8e3);
	}
	let g = /* @__PURE__ */ L(null), _ = /* @__PURE__ */ L(null), v = /* @__PURE__ */ L(en({
		size: 16,
		snap: !0
	})), y = /* @__PURE__ */ L(!0), b = /* @__PURE__ */ L("desktop");
	yn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
		let e = G(b);
		T?.sendViewport(e);
	});
	let x = /* @__PURE__ */ L(0);
	function S() {
		R(x, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ee(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, S(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ L(null);
	function te() {
		R(E, w.data, !0), w.replace(G(E));
	}
	function ne() {
		T?.sendSite(Re(G(E)));
	}
	let re = /* @__PURE__ */ new Set(), ie = () => G(E).pages.find((e) => e.id === G(l));
	function D() {
		let e = G(E)?.pages?.some((e) => !re.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = hn?.hasDraft() || Object.values(gn).some((e) => e.hasDraft());
		R(u, e || C?.hasDraft() && !re.has(G(l)) || w?.hasDraft() || In?.hasDraft() || t || !1, !0);
	}
	let ae = [], oe = [], se = null;
	function ce() {
		return JSON.stringify({
			pageId: G(l),
			page: C.data,
			site: w.data
		});
	}
	function le(e) {
		e === se && (e.startsWith("edit:") || e.startsWith("grid:")) || (ae.push(ce()), ae.length > 50 && ae.shift(), oe.length = 0, se = e);
	}
	function ue(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), te(), w.save(), R(v, {
			snap: !0,
			...G(E).grid
		}, !0), ne(), t && t !== G(l) && G(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), Mt(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), S(), De(), Ke(C.data.sections.find((e) => e.id === G(ze))), G(E).pages.some((e) => e.id === G(l)) ? T?.sendPage(G(l), C.data) : Mt(G(E).pages[0].id, { keepHistory: !0 });
	}
	function de() {
		ae.length && (oe.push(ce()), ue(ae.pop()), se = null, h("Angret"));
	}
	function fe() {
		oe.length && (ae.push(ce()), ue(oe.pop()), se = null, h("Gjentatt"));
	}
	function pe(e) {
		if (e.key === "Escape" && G(A)) {
			R(A, null);
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
			].includes(t.type)) || !G(k) || G(b) === "mobile") return;
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
		R(c, la(await (await fetch("/content/site.json")).json()), !0), w = pi("urd-draft-site", () => G(c)), w.replace(la(w.data)), w.save(), te(), R(v, {
			snap: !0,
			...G(E).grid
		}, !0), await Mt(new URLSearchParams(location.search).get("page") ?? G(E).pages[0].id), await Kn(), await wn(), await yt(), xt(), (G(E).site.setup === !0 || G(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (R(ye, G(E).site.title, !0), R(be, G(E).theme.tokens.color.accent, !0), R(xe, G(E).theme.tokens.color.bg, !0), R(ve, !0));
	}
	let he = /* @__PURE__ */ L(null);
	function ge({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			R(he, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function _e(e) {
		G(he)?.resolve(e), R(he, null);
	}
	let ve = /* @__PURE__ */ L(!1), ye = /* @__PURE__ */ L(""), be = /* @__PURE__ */ L("#7c5cff"), xe = /* @__PURE__ */ L("#0b0e14");
	function Se() {
		localStorage.setItem("urd-setup-done", "1"), R(ve, !1);
	}
	function Ce() {
		let e = G(ye).trim();
		e && (I("setup", () => {
			G(E).site.title = e, G(E).nav.logo = {
				type: "text",
				value: e
			}, G(E).theme.tokens.color.accent = G(be), G(E).theme.tokens.color.bg = G(xe), delete G(E).site.setup;
		}), Se(), h("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let O = /* @__PURE__ */ L(null), we = [
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
		R(O, G(O) === e ? null : e, !0), T?.sendShowGrid(G(O) === "Grid"), G(O) === "Historikk" && Et();
	}
	let k = /* @__PURE__ */ L(null);
	function Ee(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function De() {
		if (!G(k)) return;
		let { block: e } = Ee(G(k).sectionId, G(k).blockId);
		if (!e) {
			R(k, null);
			return;
		}
		R(k, {
			sectionId: G(k).sectionId,
			blockId: G(k).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function Oe(e) {
		if (!e.blockId) {
			R(k, null), R(A, null);
			return;
		}
		R(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), De();
	}
	let A = /* @__PURE__ */ L(null);
	function ke() {
		let e = C?.data.sections ?? [], t = e.findIndex((e) => e.id === G(k)?.sectionId);
		return [["", "Når egen seksjon er forbi"], ...e.slice(t + 1).map((e, n) => [e.id, `Ved seksjon ${t + 2 + n}`])];
	}
	function Ae(e) {
		if (Oe(e), !G(k)) return;
		let t = G(g)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + e.rect.top), Math.max(8, r));
		R(A, {
			left: n,
			top: i
		}, !0);
	}
	function je(e, t) {
		let { section: n, block: r } = Ee(G(k)?.sectionId, G(k)?.blockId);
		r && (le(e), t(r, n), ee(n, "blokk-endret"), C.save(), D(), T?.sendSection(G(l), n), De());
	}
	function j(e, t) {
		je(`edit:${G(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Me(e, t) {
		Number.isFinite(t) && je(`edit:frame-${G(k).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Ne(e) {
		je("decor", (t) => {
			t.decor = e;
		});
	}
	async function Pe(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			je(`edit:${G(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ki(t.name).replaceAll("-", " ");
			});
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Fe = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri"
	}, Ie = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Le = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], ze = /* @__PURE__ */ L(null), Be = /* @__PURE__ */ L(null), Ve = /* @__PURE__ */ L(""), We = /* @__PURE__ */ L(en([])), Ge = /* @__PURE__ */ L(null);
	function Ke(e) {
		R(Be, e?.grid ? { ...e.grid } : null, !0), R(Ve, e?.size?.minHeight ?? "", !0), R(We, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), R(Ge, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function qe(e) {
		R(ze, e.sectionId, !0), Ke(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Je(e, t) {
		let n = C.data.sections.find((e) => e.id === G(ze));
		n && (le(e), t(n), C.save(), D(), T?.sendSection(G(l), n), Ke(n));
	}
	let Ye = /* @__PURE__ */ L("color");
	function Xe(e) {
		Je("bg", (t) => {
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
	function Ze(e) {
		Je("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Qe(e, t) {
		let n = e + t;
		Je("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function $e(e, t, n) {
		Je(`edit:bg-${G(ze)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function et(e, t, n) {
		Je(`edit:bg-${G(ze)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function tt(e, t) {
		Je("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: i[t].defaults()
			});
		});
	}
	async function nt(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			$e(e, "src", (await Oi(n)).dataUrl);
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function rt(e, t) {
		let n = [...t.target.files ?? []];
		if (t.target.value = "", !n.length) return;
		h("Komprimerer bildene…");
		let { images: r, failed: i, big: a } = await ei(n);
		r.length && Je("bg", (t) => {
			let n = t.background.layers[e].props;
			n.images ??= [], n.images.push(...r.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), ti(r.length, i, a);
	}
	function at(e, t, n) {
		Je("bg", (r) => {
			let i = r.background.layers[e].props.images, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ot(e, t) {
		Je("bg", (n) => {
			n.background.layers[e].props.images.splice(t, 1);
		});
	}
	function st(e, t, n, r) {
		Je(`edit:bgg-${G(ze)}-${e}-${t}-${n}`, (i) => {
			i.background.layers[e].props.images[t][n] = r;
		});
	}
	let ct = () => Object.entries(G(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function lt(e) {
		return {
			type: e,
			version: ka[e].version,
			props: ka[e].defaults()
		};
	}
	function ut(e) {
		je(`edit:anim-${G(k).blockId}`, (t) => {
			t.animation = e ? lt(e) : null;
		}), G(k) && T?.sendDemoAnim(G(k).sectionId, G(k).blockId);
	}
	function dt(e, t) {
		Number.isFinite(t) && (je(`edit:anim-${G(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), G(k) && T?.sendDemoAnim(G(k).sectionId, G(k).blockId));
	}
	function ft(e) {
		Je("section-anim", (t) => {
			t.animation = e ? lt(e) : null;
		}), T?.sendDemoAnim(G(ze));
	}
	function pt(e, t) {
		Number.isFinite(t) && (Je("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(G(ze)));
	}
	function mt(e) {
		let t = C.data.sections.find((e) => e.id === G(ze));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		le("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, R(Ve, r, !0), C.save(), D(), T?.sendSection(G(l), t);
	}
	function ht() {
		return C.data.sections.find((e) => e.id === G(ze)) ?? C.data.sections[0];
	}
	function gt(e) {
		let t = C.data.sections.find((e) => e.id === G(ze));
		t && (le("grid:section"), t.grid = e ? { ...w.data.grid } : null, R(Be, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(G(l), t), G(O) === "Grid" && T?.sendShowGrid(!0));
	}
	function _t(e, t) {
		let n = C.data.sections.find((e) => e.id === G(ze));
		n?.grid && (le("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, R(Be, { ...n.grid }, !0), C.save(), D(), T?.sendSection(G(l), n), G(O) === "Grid" && T?.sendShowGrid(!0));
	}
	function vt(e, t) {
		le("grid:site"), R(v, {
			...G(v),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), ne(), G(O) === "Grid" && T?.sendShowGrid(!0);
	}
	async function yt() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(_, await e.json(), !0) : e.status !== 503 && R(_, null);
		} catch {
			R(_, null);
		}
	}
	let bt = null;
	async function xt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (bt = (await e.json()).head ?? null);
		} catch {}
	}
	async function St(e) {
		if (!bt) return await xt(), {
			ok: await ge({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: bt
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${bt}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === bt) return {
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
	let Ct = /* @__PURE__ */ L(null), wt = /* @__PURE__ */ L(""), Tt = /* @__PURE__ */ L(!1);
	async function Et() {
		R(wt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? R(Ct, (await e.json()).commits, !0) : e.status === 401 ? (R(Ct, [], !0), R(wt, "Logg inn med GitHub for å se historikken.")) : (R(Ct, [], !0), R(wt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			R(Ct, [], !0), R(wt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let F = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), Dt = !1;
	async function Ot() {
		let e = G(Ct)?.[0];
		if (!(!e || G(Tt)) && await ge({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			R(Tt, !0), h("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? bt = e : xt(), Dt = !0, h("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), kt();
				} else t.status === 409 ? h("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : h((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				h("Kunne ikke nå publiseringslaget", "error");
			}
			R(Tt, !1), Et();
		}
	}
	async function kt() {
		let e = ["/content/site.json", ...G(E).pages.map((e) => `/${e.file}`)], t = async () => {
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
	let At = null;
	function jt(e) {
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
	async function Mt(e, { keepHistory: t = !1 } = {}) {
		R(l, e, !0), At = (async () => {
			let n = ie(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = ua(await e.json(), w.data));
			} catch {}
			r ? re.delete(e) : r = jt(n), C = pi(`urd-draft-${e}`, () => r), C.replace(ua(C.data, w.data)), C.save(), t || (se = null), R(ze, null), R(Be, null), D(), S(), R(d, "");
		})(), await At;
	}
	function Nt() {
		T?.destroy(), T = Qi(G(g), {
			onEdit: q,
			onMove: Dr,
			onGrow: kr,
			onDelete: Vr,
			onAddSection: Fr,
			onMoveSection: Ir,
			onDeleteSection: Lr,
			onSectionSize: zr,
			onUndo: (e) => e.redo ? fe() : de(),
			onSelectSection: qe,
			onSelectBlock: Oe,
			onBlockMenu: Ae,
			onReady: Pt,
			onNavigate: Lt,
			onAddBlock: (e) => Gr(e.sectionId, e.block),
			onAddBlocks: (e) => Kr(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Qr,
			onMoveBlockSection: Br,
			onMobileManual: Ar,
			onMobileAuto: jr,
			onReviewDone: Mr,
			onBlockFlag: Nr,
			onCollectionEdit: On,
			onPluginBlocks: (e) => {
				R(Jr, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => I("edit:nav-width", () => {
				G(E).nav.style ??= {}, G(E).nav.style.width = e.width;
			})
		});
	}
	async function Pt() {
		await At, await Rn, T?.sendPlugins(Re(G(zn))?.enabled ?? []), T?.sendViewport(G(b)), En(), w.hasDraft() && ne();
		let e = !G(c).pages.some((e) => e.id === G(l));
		(C.hasDraft() || e) && T?.sendPage(G(l), C.data), G(y) || T?.sendChrome(!1), G(O) === "Grid" && T?.sendShowGrid(!0), G(Ft) && T?.sendShowGuides(!0);
	}
	let Ft = /* @__PURE__ */ L(localStorage.getItem("urd-guides") === "1");
	function It() {
		R(Ft, !G(Ft)), localStorage.setItem("urd-guides", G(Ft) ? "1" : "0"), T?.sendShowGuides(G(Ft));
	}
	function Lt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = G(E).pages.find((e) => e.path === t);
		n && n.id !== G(l) && Mt(n.id);
	}
	function I(e, t) {
		le(e), t(), w.save(), D(), ne();
	}
	let Rt = /* @__PURE__ */ L(""), zt = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Bt(e, t = null) {
		return e ? zt.includes(e) ? `«${e}» er et reservert navn` : G(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Vt() {
		let e = G(Rt).trim(), t = ki(e), n = Bt(t);
		if (n) {
			h(n, "error");
			return;
		}
		I("pages", () => {
			G(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), G(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(jt({
			id: t,
			title: e
		}))), D(), R(Rt, ""), Mt(t);
	}
	function Ht(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		I("pages", () => {
			e.title = n;
			for (let t of G(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === G(l) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(G(l), C.data)) : Ut(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Ut(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = ua(await t.json(), w.data));
		} catch {}
		r ||= jt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function Wt(e, t) {
		let n = ki(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Bt(n, e.id);
		if (r) {
			h(r, "error");
			return;
		}
		I("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Gt(e) {
		e.path !== "/" && (I("pages", () => {
			G(E).pages = G(E).pages.filter((t) => t.id !== e.id), G(E).nav.items = G(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of G(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			G(E).nav.items = G(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === G(l) && Mt(G(E).pages[0].id), h("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Kt(e) {
		I("edit:nav-logo", () => {
			G(E).nav.logo = {
				type: "text",
				value: "",
				...G(E).nav.logo,
				...e
			};
		});
	}
	function qt(e) {
		I("nav", () => {
			G(E).nav.logo ??= {
				type: "text",
				value: G(E).site.title
			};
			let t = G(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = G(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = G(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Jt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			I("nav", () => {
				let t = G(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Yt = /* @__PURE__ */ L(null);
	function Xt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			R(Yt, String(n.result), !0);
		}, n.onerror = () => h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function Zt(e) {
		I("edit:site-icon", () => {
			G(E).site.icon = e;
		}), R(Yt, null);
	}
	function Qt() {
		I("edit:site-icon", () => {
			delete G(E).site.icon;
		});
	}
	let $t = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!G(E)?.site) return;
		let e = G(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			$t.test(e) && (t.href = e);
		}
	});
	function nn(e) {
		I("nav", () => {
			G(E).nav.layout = e;
		});
	}
	function rn(e, t) {
		I(`edit:nav-style-${e}`, () => {
			G(E).nav.style ??= {}, t === void 0 ? delete G(E).nav.style[e] : G(E).nav.style[e] = t;
		});
	}
	let an = /* @__PURE__ */ P(() => G(E)?.nav?.variant === "side-left" || G(E)?.nav?.variant === "side-right"), on = /* @__PURE__ */ P(() => G(E)?.nav?.variant === "floating" || G(E)?.nav?.variant === "floating-square"), sn = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, cn = /* @__PURE__ */ P(() => sn[G(E)?.nav?.style?.hover] ?? null);
	function ln(e) {
		I("nav", () => {
			e === "bar" ? delete G(E).nav.variant : G(E).nav.variant = e;
		});
	}
	function un(e) {
		I("nav", () => {
			G(E).nav.style ??= {}, e ? G(E).nav.style.glow = !0 : delete G(E).nav.style.glow;
		});
	}
	function dn(e) {
		I("nav", () => {
			G(E).nav.style ??= {}, e ? delete G(E).nav.style.topGap : G(E).nav.style.topGap = !1;
		});
	}
	function fn(e) {
		I("nav", () => {
			G(E).nav.style ??= {}, e === "standard" ? delete G(E).nav.style.hover : G(E).nav.style.hover = e;
		});
	}
	async function pn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			I("nav", () => {
				G(E).nav.style ??= {}, G(E).nav.style.image = e.dataUrl;
			});
		} catch {
			h("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function mn() {
		I("nav", () => {
			G(E).nav.style && delete G(E).nav.style.image;
		});
	}
	let hn = null, gn = {}, _n = /* @__PURE__ */ L(en([])), vn = /* @__PURE__ */ L(en({})), bn = /* @__PURE__ */ L(null), xn = /* @__PURE__ */ L(""), Sn = /* @__PURE__ */ L("news"), Cn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function wn() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		hn = pi("urd-draft-samlinger", () => e), R(_n, [...hn.data.samlinger ?? []], !0);
		for (let e of G(_n)) {
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
			}, gn[e] = pi(`urd-draft-samling-${e}`, () => t);
		}
		Tn();
	}
	function Tn(e = !0) {
		let t = {};
		for (let e of G(_n)) gn[e] && (t[e] = JSON.parse(JSON.stringify(gn[e].data)));
		R(vn, t, !0), e && En();
	}
	function En() {
		T?.sendCollections(Re(G(vn)) ?? {});
	}
	function Dn(e, t, n = !0) {
		let r = gn[e];
		r && (t(r.data), r.save(), D(), Tn(n));
	}
	function On(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || Dn(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function kn() {
		let e = G(xn).trim();
		if (!e) return;
		let t = ki(e);
		if (!t || G(_n).includes(t)) {
			h(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: G(Sn),
			entries: []
		};
		gn[t] = pi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), gn[t].replace(n), gn[t].save(), hn.data.samlinger = [...G(_n), t], hn.save(), R(_n, [...G(_n), t], !0), R(bn, t, !0), R(xn, ""), D(), Tn();
	}
	function An(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete gn[e], hn.data.samlinger = G(_n).filter((t) => t !== e), hn.save(), R(_n, G(_n).filter((t) => t !== e), !0), G(bn) === e && R(bn, null), D(), Tn();
	}
	function jn(e) {
		Dn(e, (e) => {
			e.entries.unshift({
				id: ga("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Mn(e, t, n, r) {
		Dn(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Nn(e, t, n) {
		Dn(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Pn(e, t) {
		Dn(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Fn(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Mn(e, t, "image", (await Oi(r)).dataUrl);
	}
	let In = null, Ln, Rn = new Promise((e) => {
		Ln = e;
	}), zn = /* @__PURE__ */ L(null), Bn = en({}), Vn = /* @__PURE__ */ L("0.0.0"), U = /* @__PURE__ */ L(""), Hn = /* @__PURE__ */ L(""), Un = /* @__PURE__ */ L(en([])), W = /* @__PURE__ */ L("pending"), Wn = () => [.../* @__PURE__ */ new Set([...G(zn)?.enabled ?? [], ...G(zn)?.disabled ?? []])];
	function Gn() {
		R(zn, JSON.parse(JSON.stringify(In.data)), !0);
	}
	async function Kn() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		In = pi("urd-draft-plugins", () => e), Gn();
		try {
			R(Vn, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Wn()) Yn(e);
		qn(), Ln(), T?.sendPlugins(Re(G(zn))?.enabled ?? []);
	}
	async function qn() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Jn();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), R(Un, (t ?? []).filter((e) => !Wn().includes(e)), !0);
			for (let e of G(Un)) Yn(e);
			R(W, "ok");
		} catch {
			Jn();
		}
	}
	function Jn() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				R(Un, e.filter((e) => !Wn().includes(e)), !0);
				for (let e of G(Un)) Yn(e);
				R(W, "ok");
				return;
			}
		} catch {}
		R(W, "unavailable");
	}
	async function Yn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ha(t);
			Bn[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && pa(G(Vn), t.requiresEngine)
			};
		} catch {
			Bn[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Xn(e, t) {
		let n = In.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), In.save(), D(), Gn(), Zn();
	}
	function Zn() {
		G(g) && (G(g).src = G(g).src);
	}
	function Qn(e) {
		let t = In.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), In.save(), D(), Gn(), Zn();
	}
	async function $n() {
		R(Hn, "");
		let e = G(U).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			R(Hn, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Wn().includes(e)) {
			R(Hn, "Pluginen står allerede i listen");
			return;
		}
		if (await Yn(e), Bn[e].errors.length) {
			R(Hn, `Fant ingen gyldig plugin: ${Bn[e].errors.join("; ")}`);
			return;
		}
		Xn(e, !0), R(U, "");
	}
	function er(e) {
		R(Un, G(Un).filter((t) => t !== e), !0), Xn(e, !0);
	}
	function tr(e, t) {
		I(e, () => {
			G(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(G(E).footer);
		});
	}
	function nr(e, t) {
		I(`edit:nav-label-${e}`, () => {
			G(E).nav.items[e].label = t;
		});
	}
	function rr(e, t) {
		I("nav", () => {
			let n = G(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function ir(e, t) {
		I(`edit:nav-href-${e}`, () => {
			G(E).nav.items[e].href = t;
		});
	}
	function ar(e, t) {
		let n = e + t, r = G(E).nav.items;
		n < 0 || n >= r.length || I("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function or(e) {
		I("nav", () => {
			G(E).nav.items.splice(e, 1);
		});
	}
	function sr() {
		I("nav", () => {
			G(E).nav.items.push({
				label: "Lenke",
				page: G(E).pages[0].id
			});
		});
	}
	function cr(e) {
		I("nav", () => {
			let t = G(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: G(E).pages[0].id
			});
		});
	}
	function lr(e, t, n) {
		I(`edit:nav-child-label-${e}-${t}`, () => {
			G(E).nav.items[e].children[t].label = n;
		});
	}
	function ur(e, t, n) {
		I("nav", () => {
			let r = G(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function dr(e, t, n) {
		I(`edit:nav-child-href-${e}-${t}`, () => {
			G(E).nav.items[e].children[t].href = n;
		});
	}
	function fr(e, t, n) {
		let r = t + n, i = G(E).nav.items[e].children;
		r < 0 || r >= i.length || I("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function pr(e, t) {
		I("nav", () => {
			let n = G(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = G(E).pages[0].id));
		});
	}
	function mr(e, t) {
		I(`edit:theme-color-${e}`, () => {
			G(E).theme.tokens.color[e] = t;
		});
	}
	function hr(e, t) {
		I("theme", () => {
			G(E).theme.tokens.font[e] = t;
		});
	}
	function gr(e, t) {
		I("theme", () => {
			G(E).theme.tokens.radius[e] = t;
		});
	}
	function vr(e) {
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
	function br() {
		return Object.fromEntries(Object.entries(G(E).theme.tokens.color).map(([e, t]) => [e, vr(t)]));
	}
	function xr() {
		I("theme", () => {
			G(E).theme.alt = { tokens: { color: br() } };
		});
	}
	function Sr() {
		I("theme", () => {
			G(E).theme.alt.tokens.color = br();
		});
	}
	function Cr() {
		I("theme", () => {
			delete G(E).theme.alt;
		});
	}
	function wr(e, t) {
		I(`edit:theme-alt-${e}`, () => {
			G(E).theme.alt.tokens.color[e] = t;
		});
	}
	function Tr(e) {
		I("theme", () => {
			e === "light" ? delete G(E).theme.scheme : G(E).theme.scheme = e;
		});
	}
	function Er() {
		R(y, !G(y)), T?.sendChrome(G(y));
	}
	function q(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (le(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), G(k)?.blockId === e.blockId && De(), e.rerender && T?.sendSection(G(l), t), R(d, ""));
	}
	function Dr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		le(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ee(t, "desktop-endret-etter-mobil"), C.save(), D(), G(k)?.blockId === e.blockId && De();
	}
	function kr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (le(`edit:${e.blockId}`), t.frames.desktop.h = e.h, C.save(), D(), G(k)?.blockId === e.blockId && De());
	}
	function Ar(e) {
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
	function jr(e) {
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
			}, C.save(), D(), S(), T?.sendSection(G(l), t);
		}
	}
	function Mr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (le("review-done"), t.responsive.mobile.attention = null, C.save(), D(), S());
	}
	function Nr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (le("decor"), t.decor = e.decor, C.save(), D(), G(k)?.blockId === e.blockId && De());
	}
	function Fr(e) {
		le("add-section"), e.section.id || (e.section.id = ga("sec")), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(G(l), C.data), R(ze, e.section.id, !0), Ke(e.section), G(O) !== "Egenskaper" && (R(O, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function Ir(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (le("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(G(l), C.data));
	}
	function Lr(e) {
		le("delete-section"), e.sectionId === G(ze) && (R(ze, null), R(Be, null)), G(k)?.sectionId === e.sectionId && R(k, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(G(l), C.data);
	}
	function zr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			le("section-size"), t.size = {
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
			e.moves?.length && (ee(t, "seksjonshøyde"), G(k)?.sectionId === e.sectionId && De()), e.sectionId === G(ze) && R(Ve, e.minHeight, !0), C.save(), D();
		}
	}
	function Br(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (le("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ee(t, "blokk-flyttet"), ee(n, "blokk-flyttet"), C.save(), D(), S(), T?.sendPage(G(l), C.data), G(k)?.blockId === e.blockId && (R(k, {
			...G(k),
			sectionId: e.toSectionId
		}, !0), De()));
	}
	function Vr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		le("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(G(k)?.blockId) && R(k, null), ee(t, "blokk-slettet"), C.save(), D(), T?.sendSection(G(l), t);
	}
	let Hr = {
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
	function Ur(e) {
		let t = Hr[e];
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
	function Wr(e) {
		T ? T.sendPlaceBlock(e) : Gr(ht()?.id, e);
	}
	function Gr(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		le("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ee(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(l), n);
	}
	function Kr(e, t, n, r) {
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
		}), ee(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(l), i);
	}
	function qr(e) {
		Wr(Ur(e));
	}
	let Jr = /* @__PURE__ */ L(en([]));
	function Xr(e, t = {}) {
		Wr({
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
	function Qr(e) {
		let t = Ur(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = C.data.sections.find((t) => t.id === e.sectionId)?.grid ?? G(E).grid, r = Ma({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Gr(e.sectionId, t), T?.sendSelect(t.id), e.kind === "image" && h("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && h("Galleri lagt til - legg til bilder i Egenskaper");
		}
	}
	async function $r(e) {
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
		let r = Math.round(n.height / n.width * .3 * (G(g)?.clientWidth ?? 1280));
		Wr({
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
	async function ei(e) {
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
	function ti(e, t, n) {
		t ? h(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? h(`${n} av bildene er store - vurder mindre utsnitt`, "error") : h(e ? "" : "Ingen bilder lagt til");
	}
	async function ii(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		h("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await ei(t);
		n.length && je("galleri-add", (e) => {
			e.props.images.push(...n);
		}), ti(n.length, r, i);
	}
	async function ai(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		h("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await ei(t);
		if (!n.length) {
			ti(0, r, i);
			return;
		}
		let a = Ur("galleri");
		a.props.images = n, Wr(a), ti(n.length, r, i);
	}
	function oi(e, t) {
		je("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function ci(e) {
		je("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function li(e, t, n) {
		je(`edit:${G(k).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function ui(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${ki(n || "bilde")}-${Ai(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function fi(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) if (e.type === "image" && ui(e.props, "src", "bakgrunn", t), e.type === "bildegalleri") for (let n of e.props.images ?? []) ui(n, "src", "bakgrunn", t);
			for (let e of n.blocks) if (e.type === "image" && ui(e.props, "src", e.props.alt, t), e.type === "icon" && ui(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) ui(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function mi(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && ui(n, "value", "logo", t), n?.type === "both" && ui(n, "image", "logo", t), e.nav?.style && ui(e.nav.style, "image", "meny", t), ui(e.site, "icon", "ikon", t), t;
	}
	let hi = /* @__PURE__ */ L(!1);
	function gi() {
		if (!G(hi)) {
			R(hi, !0);
			return;
		}
		R(hi, !1), _i();
	}
	yn(() => {
		if (!G(hi)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || R(hi, !1);
		}, t = (e) => {
			e.key === "Escape" && R(hi, !1);
		}, n = () => R(hi, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function _i() {
		le("discard");
		for (let e of G(E).pages) e.id !== G(l) && !re.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), In && (In.reset(), Gn()), hn) {
			hn.reset(), R(_n, [...hn.data.samlinger ?? []], !0);
			for (let e of Object.keys(gn)) G(_n).includes(e) ? gn[e].reset() : delete gn[e];
			Tn();
		}
		te(), R(v, {
			snap: !0,
			...G(E).grid
		}, !0), D(), R(d, ""), ne(), G(E).pages.some((e) => e.id === G(l)) ? T?.sendPage(G(l), e) : Mt(G(E).pages[0].id);
	}
	async function vi() {
		if (Dt) {
			h("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		h("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of G(E).pages) {
			let a = `urd-draft-${i.id}`, o = re.has(i.id) || !G(c).pages.some((e) => e.id === i.id), s = null;
			if (i.id === G(l) && (C.hasDraft() || o)) s = C.data;
			else if (i.id !== G(l)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = ua(JSON.parse(e), w.data);
				} catch {}
			}
			if (!s && o && (s = jt(i)), !s) continue;
			let u = JSON.parse(JSON.stringify(s));
			e.push(...fi(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(G(E)));
			e.push(...mi(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(G(c).theme, G(E).theme) || t.push("tema"), i(G(c).nav, G(E).nav) || t.push("menyen"), i(G(c).footer, G(E).footer) || t.push("footeren"), i(G(c).pages, G(E).pages) || t.push("sideregisteret"), i(G(c).grid, G(E).grid) || t.push("gridet"), (G(c).site.icon ?? null) !== (G(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = G(c).site, { icon: s, ...l } = G(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		let i = Object.entries(gn).filter(([, e]) => e.hasDraft());
		if (i.length || hn?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) ui(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (hn?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(hn.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!G(_n).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		In?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(In.data, null, 2) + "\n",
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
		let a = new Set(e.map((e) => e.path)), o = (t) => {
			a.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of G(c).pages) {
			let t = G(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await St(e);
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
			e ? bt = e : xt(), fi(C.data), mi(G(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) re.add(e);
			if (R(c, JSON.parse(JSON.stringify(G(E))), !0), w = pi("urd-draft-site", () => G(c)), te(), In) {
				let e = JSON.parse(JSON.stringify(In.data));
				In = pi("urd-draft-plugins", () => e), Gn();
			}
			if (hn) {
				for (let e of Object.values(gn)) for (let t of e.data.entries) ui(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(hn.data));
				hn = pi("urd-draft-samlinger", () => e);
				for (let e of G(_n)) {
					if (!gn[e]) continue;
					let t = JSON.parse(JSON.stringify(gn[e].data));
					gn[e] = pi(`urd-draft-samling-${e}`, () => t);
				}
				Tn();
			}
			R(v, {
				snap: !0,
				...G(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = pi(`urd-draft-${G(l)}`, () => t), re.has(G(l)) && localStorage.setItem(`urd-draft-${G(l)}`, JSON.stringify(t)), D(), h("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			h(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await yt();
		} else d?.status === 403 ? h((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? h("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : h(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	me();
	var yi = Ps();
	yr("keydown", tn, pe);
	var bi = B(yi), xi = z(bi), Si = (e) => {
		var t = to();
		Z(z(t), () => a.pencil), N(), M(t), K("click", t, Er), J(e, t);
	};
	X(xi, (e) => {
		G(y) || e(Si);
	});
	var Ci = V(xi, 2);
	let Ti;
	var Ei = z(Ci), Di = V(z(Ei), 2);
	na(Di, {
		get value() {
			return G(s);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return o;
		},
		onchange: (e) => R(s, e, !0)
	});
	var ji = V(Di, 2), Mi = (e) => {
		var t = no(), n = B(t), r = z(n, !0);
		M(n);
		var i = V(n, 2), o = z(i);
		let s;
		Z(o, () => a.desktop, !0), M(o);
		var c = V(o, 2);
		let l;
		Z(c, () => a.phone, !0), M(c), M(i);
		var u = V(i, 2);
		let d;
		Z(u, () => a.guides, !0), M(u), H((e) => {
			Y(r, e), s = Yr(o, 1, "ghost svelte-1n46o8q", null, s, { active: G(b) === "desktop" }), l = Yr(c, 1, "ghost svelte-1n46o8q", null, l, { active: G(b) === "mobile" }), d = Yr(u, 1, "ghost svelte-1n46o8q", null, d, { active: G(Ft) });
		}, [() => ie()?.title ?? ""]), K("click", n, () => Te("Sider")), K("click", o, () => R(b, "desktop")), K("click", c, () => R(b, "mobile")), K("click", u, It), J(e, t);
	};
	X(ji, (e) => {
		G(c) && e(Mi);
	});
	var Ni = V(ji, 2), Pi = (e) => {
		var t = ro(), n = z(t);
		Z(n, () => a.phone);
		var r = V(n);
		M(t), H(() => Y(r, ` ${G(x) ?? ""} ${G(x) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), K("click", t, () => R(b, "mobile")), J(e, t);
	};
	X(Ni, (e) => {
		G(x) > 0 && e(Pi);
	});
	var Fi = V(Ni, 2), Ii = (e) => {
		J(e, io());
	};
	X(Fi, (e) => {
		G(u) && e(Ii);
	}), M(Ei);
	var Li = V(Ei, 2), Ri = z(Li), zi = (e) => {
		var t = lo(), n = B(t), r = z(n), i = (e) => {
			var t = ao();
			Z(B(t), () => a.eye), N(), J(e, t);
		}, o = (e) => {
			var t = oo();
			Z(B(t), () => a.pencil), N(), J(e, t);
		};
		X(r, (e) => {
			G(y) ? e(i) : e(o, -1);
		}), M(n);
		var s = V(n, 2), c = (e) => {
			var t = so(), n = z(t), r = (e) => {
				var t = Or();
				Z(B(t), () => a.warn), J(e, t);
			};
			X(n, (e) => {
				G(_).allowed || e(r);
			});
			var i = V(n, 1, !0);
			M(t), H(() => {
				ri(t, "title", G(_).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Y(i, G(_).login);
			}), J(e, t);
		}, l = (e) => {
			J(e, co());
		};
		X(s, (e) => {
			G(_)?.loggedIn ? e(c) : G(_) && e(l, 1);
		});
		var d = V(s, 2), f = V(d, 2);
		let p;
		var m = z(f, !0);
		M(f);
		var h = V(f, 2);
		H((e) => {
			ri(n, "title", G(y) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ri(d, "href", e), p = Yr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: G(hi) }), f.disabled = !G(u), ri(f, "title", G(hi) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), Y(m, G(hi) ? "Sikker?" : "Forkast utkast"), h.disabled = !G(u);
		}, [() => ie()?.path ?? "/"]), K("click", n, Er), K("click", f, gi), K("click", h, vi), J(e, t);
	};
	X(Ri, (e) => {
		G(c) && e(zi);
	}), M(Li), M(Ci);
	var Bi = V(Ci, 2), Vi = (e) => {
		var t = Ds(), i = z(t), o = (e) => {
			var t = Es(), i = B(t);
			Rr(i, 21, () => we, Pr, (e, t, n) => {
				var r = fo(), i = B(r), a = (e) => {
					J(e, uo());
				};
				X(i, (e) => {
					n > 0 && e(a);
				}), Rr(V(i, 2), 16, () => G(t), (e) => e, (e, t) => {
					var n = Na();
					let r;
					var i = z(n, !0);
					M(n), H(() => {
						r = Yr(n, 1, "svelte-1n46o8q", null, r, { active: G(O) === t }), Y(i, t);
					}), K("click", n, () => Te(t)), J(e, n);
				}), J(e, r);
			}), M(i);
			var o = V(i, 2), s = (e) => {
				var t = Ts(), i = z(t), o = z(i, !0);
				M(i);
				var s = V(i, 2), c = (e) => {
					var t = _o(), n = V(z(t), 2);
					Rr(n, 17, () => G(E).pages, (e) => e.id, (e, t) => {
						var n = go();
						let r;
						var i = z(n);
						Q(i);
						var o = V(i, 2), s = (e) => {
							J(e, po());
						}, c = (e) => {
							var n = mo();
							Q(n), H((e) => $(n, e), [() => G(t).path.slice(1)]), K("change", n, (e) => Wt(G(t), e.target.value)), J(e, n);
						};
						X(o, (e) => {
							G(t).path === "/" ? e(s) : e(c, -1);
						});
						var u = V(o, 2), d = z(u);
						Z(d, () => a.right, !0), M(d);
						var f = V(d, 2), p = (e) => {
							var n = ho();
							Z(n, () => a.cross, !0), M(n), K("click", n, () => Gt(G(t))), J(e, n);
						};
						X(f, (e) => {
							G(t).path !== "/" && e(p);
						}), M(u), M(n), H(() => {
							r = Yr(n, 1, "page-row svelte-1n46o8q", null, r, { current: G(t).id === G(l) }), $(i, G(t).title), d.disabled = G(t).id === G(l);
						}), K("change", i, (e) => Ht(G(t), e.target.value)), K("click", d, () => Mt(G(t).id)), J(e, n);
					});
					var r = V(n, 4);
					Q(r);
					var i = V(r, 2);
					N(2), M(t), H((e) => i.disabled = e, [() => !G(Rt).trim()]), K("keydown", r, (e) => e.key === "Enter" && Vt()), si(r, () => G(Rt), (e) => R(Rt, e)), K("click", i, Vt), J(e, t);
				}, u = (e) => {
					var t = No(), n = V(z(t), 2), r = V(z(n), 2), i = z(r), o = V(z(i));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.logo?.type ?? "text");
						na(o, {
							get value() {
								return G(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => qt(e)
						});
					}
					M(i);
					var s = V(i, 2), c = (e) => {
						var t = vo(), n = B(t);
						Q(n);
						var r = V(n, 2), i = z(r);
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv"], ...Aa.map(([e, t]) => [t, e])]);
							na(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => Kt({ font: e || void 0 })
							});
						}
						var a = V(i, 2);
						Q(a);
						var o = V(a, 2);
						let s;
						var c = V(o, 2);
						let l;
						M(r), H((e) => {
							$(n, G(E).nav.logo?.value ?? ""), $(a, G(E).nav.logo?.textSize ?? ""), s = Yr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: G(E).nav.logo?.bold !== !1 }), l = Yr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!G(E).nav.logo?.italic })]), K("input", n, (e) => Kt({ value: e.target.value })), K("change", a, (e) => Kt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), K("click", o, () => Kt({ bold: G(E).nav.logo?.bold === !1 })), K("click", c, () => Kt({ italic: !G(E).nav.logo?.italic })), J(e, t);
					};
					X(s, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = yo(), n = B(t), r = z(n), i = z(r), a = V(i);
						M(r);
						var o = V(r, 2);
						Q(o);
						var s = V(o, 2);
						Q(s), M(n), N(2), H(() => {
							Y(i, `${(G(E).nav.logo?.type === "image" ? G(E).nav.logo?.value : G(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), $(o, G(E).nav.logo?.size ?? 32), $(s, G(E).nav.logo?.radius ?? 0);
						}), K("change", a, Jt), K("change", o, (e) => Kt({ size: Number(e.target.value) })), K("change", s, (e) => Kt({ radius: Number(e.target.value) })), J(e, t);
					};
					X(l, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = V(l, 2), f = (e) => {
						var t = bo(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.logo?.order ?? "image-first");
							na(n, {
								get value() {
									return G(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => Kt({ order: e })
							});
						}
						M(t), J(e, t);
					};
					X(d, (e) => {
						G(E).nav.logo?.type === "both" && e(f);
					}), N(2), M(r), M(n);
					var p = V(n, 2), m = V(z(p), 2), h = z(m), g = V(z(h));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.variant ?? "bar");
						na(g, {
							get value() {
								return G(e);
							},
							options: [
								["bar", "Stripe (standard)"],
								["floating", "Flytende (pille)"],
								["floating-square", "Flytende (firkant)"],
								["side-left", "Sidestilt venstre"],
								["side-right", "Sidestilt høyre"]
							],
							onchange: (e) => ln(e)
						});
					}
					M(h);
					var _ = V(h, 2), v = (e) => {
						var t = xo(), n = B(t), r = z(n);
						Q(r), N(), M(n);
						var i = V(n, 2), a = z(i);
						Q(a), N(), M(i), H(() => {
							ni(r, G(E).nav.style?.glow === !0), ni(a, G(E).nav.style?.topGap !== !1);
						}), K("change", r, (e) => un(e.target.checked)), K("change", a, (e) => dn(e.target.checked)), J(e, t);
					};
					X(_, (e) => {
						G(on) && e(v);
					});
					var y = V(_, 2), b = (e) => {
						var t = So(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.style?.sideAlign ?? "left");
							na(n, {
								get value() {
									return G(e);
								},
								options: [
									["left", "Venstre"],
									["center", "Midtstilt"],
									["right", "Høyre"]
								],
								onchange: (e) => rn("sideAlign", e === "left" ? void 0 : e)
							});
						}
						M(t), J(e, t);
					};
					X(y, (e) => {
						G(an) && e(b);
					});
					var x = V(y, 2), S = V(z(x)), ee = z(S);
					M(S), M(x);
					var C = V(x, 2);
					Q(C);
					var w = V(C, 2), T = z(w);
					Q(T), N(), M(w);
					var te = V(w, 2), ne = V(z(te));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.size ?? "md");
						na(ne, {
							get value() {
								return G(e);
							},
							options: [
								["sm", "Liten"],
								["md", "Standard"],
								["lg", "Stor"],
								["xl", "Ekstra stor"]
							],
							onchange: (e) => rn("size", e === "md" ? void 0 : e)
						});
					}
					M(te);
					var re = V(te, 2), ie = V(z(re)), D = (e) => {
						{
							let t = /* @__PURE__ */ P(() => G(E).nav.style?.sidePlacement ?? "top");
							na(e, {
								get value() {
									return G(t);
								},
								options: [
									["top", "Øverst (standard)"],
									["middle", "Midt på"],
									["bottom", "Nederst"]
								],
								onchange: (e) => rn("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, ae = (e) => {
						{
							let t = /* @__PURE__ */ P(() => G(E).nav.layout ?? "right");
							na(e, {
								get value() {
									return G(t);
								},
								options: [
									["right", "Høyre"],
									["center", "Midtstilt"],
									["left", "Venstre (etter logoen)"]
								],
								onchange: (e) => nn(e)
							});
						}
					};
					X(ie, (e) => {
						G(an) ? e(D) : e(ae, -1);
					}), M(re);
					var oe = V(re, 2), se = (e) => {
						var t = Co(), n = z(t);
						Q(n), N(), M(t), H(() => ni(n, G(E).nav.sticky !== !1)), K("change", n, (e) => I("nav", () => {
							G(E).nav.sticky = e.target.checked;
						})), J(e, t);
					};
					X(oe, (e) => {
						G(an) || e(se);
					});
					var ce = V(oe, 2), le = V(z(ce));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.hover ?? "standard");
						na(le, {
							get value() {
								return G(e);
							},
							options: [
								["standard", "Standard (aksentfarge)"],
								["underline", "Understrek"],
								["pill", "Pille"],
								["lift-plain", "Løft"],
								["lift", "Løft med glød"]
							],
							onchange: (e) => fn(e)
						});
					}
					M(ce);
					var ue = V(ce, 2), de = (e) => {
						var t = wo(), n = B(t), r = V(z(n)), i = z(r);
						M(r), M(n);
						var a = V(n, 2);
						Q(a), H((e) => {
							Y(i, `${e ?? ""}%`), $(a, G(E).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((G(E).nav.style?.hoverGlow ?? .6) * 100)]), K("input", a, (e) => rn("hoverGlow", Number(e.target.value))), J(e, t);
					};
					X(ue, (e) => {
						G(E).nav.style?.hover === "lift" && e(de);
					});
					var fe = V(ue, 2), pe = (e) => {
						var t = To(), n = z(t), r = V(n);
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ P(ct);
							wi(r, {
								get value() {
									return G(e);
								},
								get tokens() {
									return G(t);
								},
								get label() {
									return G(cn)[1];
								},
								onchange: (e) => rn("hoverColor", e)
							});
						}
						M(t), H(() => {
							ri(t, "title", G(cn)[1]), Y(n, `${G(cn)[0] ?? ""} `);
						}), J(e, t);
					};
					X(fe, (e) => {
						G(cn) && e(pe);
					});
					var me = V(fe, 2), he = V(z(me));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ P(ct);
						wi(he, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => rn("hoverTextColor", e)
						});
					}
					M(me);
					var ge = V(me, 2), _e = V(z(ge));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ P(ct);
						wi(_e, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => rn("bg", e)
						});
					}
					M(ge);
					var ve = V(ge, 2), ye = V(z(ve));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(ct);
						wi(ye, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => rn("textColor", e)
						});
					}
					M(ve);
					var be = V(ve, 2), xe = z(be), Se = z(xe), Ce = V(Se);
					M(xe);
					var O = V(xe, 2), we = (e) => {
						var t = Eo();
						Z(t, () => a.cross, !0), M(t), K("click", t, mn), J(e, t);
					};
					X(O, (e) => {
						G(E).nav.style?.image && e(we);
					}), M(be);
					var Te = V(be, 2), k = (e) => {
						var t = Do(), n = B(t), r = V(z(n)), i = z(r);
						M(r), M(n);
						var a = V(n, 2);
						Q(a);
						var o = V(a, 2), s = V(z(o)), c = z(s);
						M(s), M(o);
						var l = V(o, 2);
						Q(l);
						var u = V(l, 2), d = V(z(u)), f = z(d);
						M(d), M(u);
						var p = V(u, 2);
						Q(p), H((e, t, n) => {
							Y(i, `${e ?? ""}%`), $(a, G(E).nav.style?.imageOpacity ?? 1), Y(c, `${t ?? ""}%`), $(l, G(E).nav.style?.imageY ?? 50), Y(f, `${n ?? ""}%`), $(p, G(E).nav.style?.imageX ?? 50);
						}, [
							() => Math.round((G(E).nav.style?.imageOpacity ?? 1) * 100),
							() => Math.round(G(E).nav.style?.imageY ?? 50),
							() => Math.round(G(E).nav.style?.imageX ?? 50)
						]), K("input", a, (e) => rn("imageOpacity", Number(e.target.value))), K("input", l, (e) => rn("imageY", Number(e.target.value))), K("input", p, (e) => rn("imageX", Number(e.target.value))), J(e, t);
					};
					X(Te, (e) => {
						G(E).nav.style?.image && e(k);
					}), M(m), M(p);
					var Ee = V(p, 2), De = V(z(Ee), 2), Oe = z(De), A = V(z(Oe));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ P(() => G(an) ? [
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
								return G(e);
							},
							get options() {
								return G(t);
							},
							onchange: (e) => rn("subStyle", e === "card" ? void 0 : e)
						});
					}
					M(Oe);
					var ke = V(Oe, 2), Ae = (e) => {
						var t = Oo(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ P(ct);
							wi(n, {
								get value() {
									return G(e);
								},
								get tokens() {
									return G(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => rn("subPillColor", e)
							});
						}
						M(t), J(e, t);
					};
					X(ke, (e) => {
						G(E).nav.style?.subStyle === "pills" && e(Ae);
					});
					var je = V(ke, 2), j = V(z(je));
					Q(j), M(je);
					var Me = V(je, 2), Ne = (e) => {
						var t = ko(), n = z(t);
						Q(n), N(), M(t), H(() => ni(n, G(E).nav.style?.subImage === !0)), K("change", n, (e) => rn("subImage", e.target.checked ? !0 : void 0)), J(e, t);
					};
					X(Me, (e) => {
						G(E).nav.style?.image && e(Ne);
					}), M(De), M(Ee);
					var Pe = V(Ee, 2), Fe = V(z(Pe), 2), Ie = z(Fe);
					Rr(Ie, 17, () => G(E).nav.items, Pr, (e, t, n) => {
						var r = Mo(), i = B(r), o = z(i);
						Q(o);
						var s = V(o, 2), c = z(s);
						Z(c, () => a.plus, !0), M(c);
						var l = V(c, 2);
						l.disabled = n === 0, Z(l, () => a.up, !0), M(l);
						var u = V(l, 2);
						Z(u, () => a.down, !0), M(u);
						var d = V(u, 2);
						Z(d, () => a.cross, !0), M(d), M(s);
						var f = V(s, 2), p = z(f);
						{
							let e = /* @__PURE__ */ P(() => G(t).page ?? (G(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ P(() => [
								...G(E).pages.map((e) => [e.id, e.title]),
								["__href", "Ekstern lenke"],
								...G(t).children ? [["__none", "Ingen lenke (kun åpner undermenyen)"]] : []
							]);
							na(p, {
								get value() {
									return G(e);
								},
								title: "Hvor lenken går",
								get options() {
									return G(r);
								},
								onchange: (e) => rr(n, e)
							});
						}
						M(f);
						var m = V(f, 2), h = (e) => {
							var r = Ao();
							Q(r), H(() => $(r, G(t).href)), K("change", r, (e) => ir(n, e.target.value)), J(e, r);
						};
						X(m, (e) => {
							!G(t).page && G(t).href != null && e(h);
						}), M(i), Rr(V(i, 2), 17, () => G(t).children ?? [], Pr, (e, r, i) => {
							var o = jo(), s = z(o);
							Q(s);
							var c = V(s, 2), l = z(c);
							l.disabled = i === 0, Z(l, () => a.up, !0), M(l);
							var u = V(l, 2);
							Z(u, () => a.down, !0), M(u);
							var d = V(u, 2);
							Z(d, () => a.cross, !0), M(d), M(c);
							var f = V(c, 2), p = z(f);
							{
								let e = /* @__PURE__ */ P(() => G(r).page ?? "__href"), t = /* @__PURE__ */ P(() => [...G(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								na(p, {
									get value() {
										return G(e);
									},
									title: "Hvor lenken går",
									get options() {
										return G(t);
									},
									onchange: (e) => ur(n, i, e)
								});
							}
							M(f);
							var m = V(f, 2), h = (e) => {
								var t = Ao();
								Q(t), H(() => $(t, G(r).href ?? "")), K("change", t, (e) => dr(n, i, e.target.value)), J(e, t);
							};
							X(m, (e) => {
								G(r).page || e(h);
							}), M(o), H(() => {
								$(s, G(r).label), u.disabled = i === G(t).children.length - 1;
							}), K("input", s, (e) => lr(n, i, e.target.value)), K("click", l, () => fr(n, i, -1)), K("click", u, () => fr(n, i, 1)), K("click", d, () => pr(n, i)), J(e, o);
						}), H(() => {
							$(o, G(t).label), u.disabled = n === G(E).nav.items.length - 1;
						}), K("input", o, (e) => nr(n, e.target.value)), K("click", c, () => cr(n)), K("click", l, () => ar(n, -1)), K("click", u, () => ar(n, 1)), K("click", d, () => or(n)), J(e, r);
					});
					var Le = V(Ie, 2);
					N(2), M(Fe), M(Pe), M(t), H((e) => {
						Y(ee, `${e ?? ""}%`), $(C, 1 - (G(E).nav.style?.bgOpacity ?? .85)), ni(T, G(E).nav.style?.blur !== !1), Y(Se, `${G(E).nav.style?.image ? "Bytt bakgrunnsbilde" : "Bakgrunnsbilde i menyen"} `), $(j, G(E).nav.style?.subColumns ?? 1);
					}, [() => Math.round((1 - (G(E).nav.style?.bgOpacity ?? .85)) * 100)]), K("input", C, (e) => rn("bgOpacity", Math.round((1 - Number(e.target.value)) * 100) / 100)), K("change", T, (e) => rn("blur", e.target.checked)), K("change", Ce, pn), K("change", j, (e) => rn("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), K("click", Le, sr), J(e, t);
				}, d = (e) => {
					var t = Ro(), n = V(z(t), 2);
					wi(V(z(n)), {
						get value() {
							return G(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => mr("bg", e)
					}), M(n);
					var r = V(n, 2);
					wi(V(z(r)), {
						get value() {
							return G(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => mr("surface", e)
					}), M(r);
					var i = V(r, 2);
					wi(V(z(i)), {
						get value() {
							return G(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => mr("text", e)
					}), M(i);
					var o = V(i, 2);
					wi(V(z(o)), {
						get value() {
							return G(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => mr("accent", e)
					}), M(o);
					var s = V(o, 2), c = V(z(s));
					{
						let e = /* @__PURE__ */ P(() => G(E).theme.tokens.color["accent-text"] ?? G(E).theme.tokens.color.bg);
						wi(c, {
							get value() {
								return G(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => mr("accent-text", e)
						});
					}
					M(s);
					var l = V(s, 2), u = V(z(l), 2), d = z(u), f = (e) => {
						var t = Po(), n = B(t), r = V(z(n));
						{
							let e = /* @__PURE__ */ P(() => G(E).theme.scheme ?? "light");
							na(r, {
								get value() {
									return G(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => Tr(e)
							});
						}
						M(n);
						var i = V(n, 4);
						Rr(i, 17, () => Object.entries(G(E).theme.alt.tokens.color), Pr, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(G(t), 1));
							let r = () => G(n)[0];
							var i = To(), a = z(i), o = V(a);
							{
								let e = /* @__PURE__ */ P(() => `Alternativ ${r()}`);
								wi(o, {
									get value() {
										return G(E).theme.alt.tokens.color[r()];
									},
									get label() {
										return G(e);
									},
									onchange: (e) => wr(r(), e)
								});
							}
							M(i), H(() => Y(a, `${{
								bg: "Bakgrunn",
								surface: "Flater",
								text: "Tekst",
								accent: "Aksent",
								"accent-text": "Tekst på aksent"
							}[r()] ?? r() ?? ""} `)), J(e, i);
						});
						var o = V(i, 2), s = z(o), c = V(s, 2);
						Z(c, () => a.cross, !0), M(c), M(o), K("click", s, Sr), K("click", c, Cr), J(e, t);
					}, p = (e) => {
						var t = Fo(), n = B(t);
						N(2), K("click", n, xr), J(e, t);
					};
					X(d, (e) => {
						G(E).theme.alt ? e(f) : e(p, -1);
					}), M(u), M(l);
					var h = V(l, 4), g = V(z(h));
					{
						let e = /* @__PURE__ */ P(() => [...Aa.some(([, e]) => e === G(E).theme.tokens.font.heading) ? [] : [[G(E).theme.tokens.font.heading, "Egendefinert"]], ...Aa.map(([e, t]) => [t, e])]);
						na(g, {
							get value() {
								return G(E).theme.tokens.font.heading;
							},
							get options() {
								return G(e);
							},
							onchange: (e) => hr("heading", e)
						});
					}
					M(h);
					var _ = V(h, 2), v = V(z(_));
					{
						let e = /* @__PURE__ */ P(() => [...Aa.some(([, e]) => e === G(E).theme.tokens.font.body) ? [] : [[G(E).theme.tokens.font.body, "Egendefinert"]], ...Aa.map(([e, t]) => [t, e])]);
						na(v, {
							get value() {
								return G(E).theme.tokens.font.body;
							},
							get options() {
								return G(e);
							},
							onchange: (e) => hr("body", e)
						});
					}
					M(_);
					var y = V(_, 4), b = V(z(y));
					Q(b), M(y);
					var x = V(y, 2), S = V(z(x));
					Q(S), M(x);
					var ee = V(x, 4), C = V(z(ee)), w = (e) => {
						var t = Io();
						H(() => ri(t, "src", G(E).site.icon)), J(e, t);
					};
					X(C, (e) => {
						G(E).site.icon && e(w);
					}), M(ee);
					var T = V(ee, 2), te = z(T), ne = z(te), re = V(ne);
					M(te);
					var ie = V(te, 2), D = (e) => {
						var t = Lo(), n = B(t);
						Z(n, () => a.pencil ?? "✎", !0), M(n);
						var r = V(n, 2);
						Z(r, () => a.cross, !0), M(r), K("click", n, () => R(Yt, G(E).site.icon, !0)), K("click", r, Qt), J(e, t);
					};
					X(ie, (e) => {
						G(E).site.icon && e(D);
					}), M(T), N(2), M(t), H(() => {
						$(b, G(E).theme.tokens.radius.sm), $(S, G(E).theme.tokens.radius.md), Y(ne, `${G(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), K("change", b, (e) => gr("sm", e.target.value)), K("change", S, (e) => gr("md", e.target.value)), K("change", re, Xt), J(e, t);
				}, f = (e) => {
					var t = Ho();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					M(i), M(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					M(c);
					var u = V(c, 2), d = V(u, 2), f = V(d, 2), p = V(f, 2), m = V(z(p), 2), h = z(m), g = V(h, 2), _ = V(z(g));
					M(g), M(m), M(p);
					var v = V(p, 2), y = V(z(v), 2), x = z(y), S = V(x, 2), ee = V(S, 2), C = V(ee, 2), w = V(C, 2);
					M(y), M(v);
					var T = V(v, 2), E = (e) => {
						var t = Vo(), n = V(z(t), 2);
						Rr(n, 21, () => G(Jr), (e) => e.type, (e, t) => {
							var n = Or(), r = B(n), i = (e) => {
								var n = Bo(), r = z(n), i = z(r, !0);
								M(r);
								var a = V(r, 2);
								Rr(a, 21, () => G(t).variants, (e) => e.label, (e, n) => {
									var r = zo(), i = z(r, !0);
									M(r), H(() => {
										ri(r, "title", `Fra pluginen ${G(t).plugin ?? ""}`), Y(i, G(n).label);
									}), K("click", r, () => Xr(G(t), G(n).props)), J(e, r);
								}), M(a), M(n), H(() => Y(i, G(t).label)), J(e, n);
							}, a = (e) => {
								var n = zo(), r = z(n, !0);
								M(n), H(() => {
									ri(n, "title", `Fra pluginen ${G(t).plugin ?? ""}`), Y(r, G(t).label);
								}), K("click", n, () => Xr(G(t))), J(e, n);
							};
							X(r, (e) => {
								G(t).variants?.length ? e(i) : e(a, -1);
							}), J(e, n);
						}), M(n), M(t), J(e, t);
					};
					X(T, (e) => {
						G(Jr).length && e(E);
					}), M(t), H(() => {
						n = Yr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: G(b) === "mobile" }), ri(t, "title", G(b) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), K("click", a, () => qr("text")), K("click", o, () => qr("text-box")), K("click", s, () => qr("button")), K("change", l, $r), K("click", u, () => qr("video")), K("click", d, () => qr("icon")), K("click", f, () => qr("samling")), K("click", h, () => qr("galleri")), K("change", _, ai), K("click", x, () => qr("shape-line")), K("click", S, () => qr("shape-arrow")), K("click", ee, () => qr("shape-circle")), K("click", C, () => qr("shape-rect")), K("click", w, () => qr("shape-triangle")), J(e, t);
				}, p = (e) => {
					var t = Uo(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					M(r), M(n);
					var a = V(n, 2);
					Q(a);
					var o = V(a, 2), s = z(o);
					Q(s), N(), M(o), N(2), M(t), H(() => {
						Y(i, `${G(v).size ?? ""} px`), $(a, G(v).size), ni(s, G(v).snap !== !1);
					}), K("input", a, (e) => vt("size", Number(e.target.value))), K("change", s, (e) => vt("snap", e.target.checked)), J(e, t);
				}, h = (e) => {
					var t = rs(), i = z(t), o = (e) => {
						var t = Wo(), r = B(t), i = z(r);
						M(r);
						var a = V(r, 2);
						n(a), H(() => Y(i, `${Fe[G(k).type] ?? G(k).type ?? ""}-blokk`)), J(e, t);
					}, s = (e) => {
						var t = ts(), n = V(B(t), 2), i = V(z(n));
						Q(i), M(n);
						var o = V(n, 6), s = z(o);
						Q(s), N(), M(o);
						var c = V(o, 2), l = (e) => {
							var t = Go(), n = B(t), r = V(z(n)), i = z(r);
							M(r), M(n);
							var a = V(n, 2);
							Q(a), H(() => {
								Y(i, `${G(Be).size ?? ""} px`), $(a, G(Be).size);
							}), K("input", a, (e) => _t("size", Number(e.target.value))), J(e, t);
						};
						X(c, (e) => {
							G(Be) && e(l);
						});
						var u = V(c, 8);
						Rr(u, 17, () => G(We), Pr, (e, t, n) => {
							var i = es(), o = z(i), s = z(o);
							{
								let e = /* @__PURE__ */ P(() => r.map(([e, t]) => [e, t.label]));
								na(s, {
									get value() {
										return G(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return G(e);
									},
									onchange: (e) => tt(n, e)
								});
							}
							var c = V(s, 2), l = z(c);
							l.disabled = n === 0, Z(l, () => a.up, !0), M(l);
							var u = V(l, 2);
							Z(u, () => a.down, !0), M(u);
							var d = V(u, 2);
							Z(d, () => a.cross, !0), M(d), M(c), M(o);
							var f = V(o, 2), p = (e) => {
								var r = Ko(), i = B(r), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(ct);
									wi(a, {
										get value() {
											return G(t).props.value;
										},
										get tokens() {
											return G(e);
										},
										label: "Lagets farge",
										onchange: (e) => $e(n, "value", e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								M(s), M(o);
								var l = V(o, 2);
								Q(l), H((e) => {
									Y(c, `${e ?? ""}%`), $(l, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("input", l, (e) => $e(n, "opacity", Number(e.target.value))), J(e, r);
							}, m = (e) => {
								var r = qo(), i = B(r), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(ct);
									wi(a, {
										get value() {
											return G(t).props.stops[0];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient fra",
										onchange: (e) => et(n, 0, e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o));
								{
									let e = /* @__PURE__ */ P(ct);
									wi(s, {
										get value() {
											return G(t).props.stops[G(t).props.stops.length - 1];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient til",
										onchange: (e) => et(n, G(t).props.stops.length - 1, e)
									});
								}
								M(o);
								var c = V(o, 2), l = V(z(c)), u = z(l);
								M(l), M(c);
								var d = V(c, 2);
								Q(d);
								var f = V(d, 2), p = V(z(f)), m = z(p);
								M(p), M(f);
								var h = V(f, 2);
								Q(h);
								var g = V(h, 2), _ = z(g);
								Q(_), N(), M(g), H((e, n) => {
									Y(u, `${G(t).props.angle ?? ""}°`), $(d, G(t).props.angle), Y(m, `${e ?? ""}%`), $(h, G(t).props.opacity ?? 1), ni(_, n);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100), () => !!G(t).props.animate]), K("input", d, (e) => $e(n, "angle", Number(e.target.value))), K("input", h, (e) => $e(n, "opacity", Number(e.target.value))), K("change", _, (e) => $e(n, "animate", e.target.checked)), J(e, r);
							}, h = (e) => {
								var r = Jo(), i = B(r), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(ct);
									wi(a, {
										get value() {
											return G(t).props.color;
										},
										get tokens() {
											return G(e);
										},
										label: "Glødens farge",
										onchange: (e) => $e(n, "color", e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								M(s), M(o);
								var l = V(o, 2);
								Q(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								M(d), M(u);
								var p = V(u, 2);
								Q(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								M(h), M(m);
								var _ = V(m, 2);
								Q(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								M(y), M(v);
								var x = V(v, 2);
								Q(x), H((e, n, r, i) => {
									Y(c, `${e ?? ""}%`), $(l, G(t).props.x), Y(f, `${n ?? ""}%`), $(p, G(t).props.y), Y(g, `${r ?? ""}%`), $(_, G(t).props.radius), Y(b, `${i ?? ""}%`), $(x, G(t).props.opacity);
								}, [
									() => Math.round(G(t).props.x * 100),
									() => Math.round(G(t).props.y * 100),
									() => Math.round(G(t).props.radius * 100),
									() => Math.round(G(t).props.opacity * 100)
								]), K("input", l, (e) => $e(n, "x", Number(e.target.value))), K("input", p, (e) => $e(n, "y", Number(e.target.value))), K("input", _, (e) => $e(n, "radius", Number(e.target.value))), K("input", x, (e) => $e(n, "opacity", Number(e.target.value))), J(e, r);
							}, g = (e) => {
								var r = Yo(), i = B(r), a = V(z(i)), o = z(a);
								M(a), M(i);
								var s = V(i, 2);
								Q(s), H((e) => {
									Y(o, `${e ?? ""}%`), $(s, G(t).props.opacity);
								}, [() => Math.round(G(t).props.opacity * 100)]), K("input", s, (e) => $e(n, "opacity", Number(e.target.value))), J(e, r);
							}, _ = (e) => {
								var r = Zo(), i = B(r), a = z(i), o = V(a);
								M(i);
								var s = V(i, 2), c = V(z(s));
								{
									let e = /* @__PURE__ */ P(() => G(t).props.fit ?? "cover");
									na(c, {
										get value() {
											return G(e);
										},
										options: [
											["cover", "Fyll (beskjæres)"],
											["contain", "Vis hele"],
											["repeat", "Gjenta (mønster)"]
										],
										onchange: (e) => $e(n, "fit", e)
									});
								}
								M(s);
								var l = V(s, 2), u = (e) => {
									var r = Xo(), i = B(r), a = V(z(i)), o = z(a);
									M(a), M(i);
									var s = V(i, 2);
									Q(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									M(l), M(c);
									var d = V(c, 2);
									Q(d), H((e, n) => {
										Y(o, `${e ?? ""}%`), $(s, G(t).props.x ?? .5), Y(u, `${n ?? ""}%`), $(d, G(t).props.y ?? .5);
									}, [() => Math.round((G(t).props.x ?? .5) * 100), () => Math.round((G(t).props.y ?? .5) * 100)]), K("input", s, (e) => $e(n, "x", Number(e.target.value))), K("input", d, (e) => $e(n, "y", Number(e.target.value))), J(e, r);
								};
								X(l, (e) => {
									(G(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = V(l, 2), f = V(z(d)), p = z(f);
								M(f), M(d);
								var m = V(d, 2);
								Q(m);
								var h = V(m, 2), g = V(z(h)), _ = z(g);
								M(g), M(h);
								var v = V(h, 2);
								Q(v), H((e) => {
									Y(a, `${G(t).props.src ? "Bytt bilde" : "Velg bilde"} `), Y(p, `${G(t).props.blur ?? 0 ?? ""} px`), $(m, G(t).props.blur ?? 0), Y(_, `${e ?? ""}%`), $(v, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => nt(n, e)), K("input", m, (e) => $e(n, "blur", Number(e.target.value))), K("input", v, (e) => $e(n, "opacity", Number(e.target.value))), J(e, r);
							}, v = (e) => {
								var r = $o(), i = B(r), o = V(z(i));
								M(i);
								var s = V(i, 2);
								Rr(s, 17, () => G(t).props.images ?? [], Pr, (e, r, i) => {
									var o = Qo(), s = B(o), c = z(s), l = V(c, 2), u = z(l);
									u.disabled = i === 0, Z(u, () => a.up, !0), M(u);
									var d = V(u, 2);
									Z(d, () => a.down, !0), M(d);
									var f = V(d, 2);
									Z(f, () => a.cross, !0), M(f), M(l), M(s);
									var p = V(s, 2), m = V(z(p)), h = z(m);
									M(m), M(p);
									var g = V(p, 2);
									Q(g);
									var _ = V(g, 2), v = V(z(_)), y = z(v);
									M(v), M(_);
									var b = V(_, 2);
									Q(b), H((e, n) => {
										ri(c, "src", G(r).src), d.disabled = i === G(t).props.images.length - 1, Y(h, `${e ?? ""}%`), $(g, G(r).x ?? .5), Y(y, `${n ?? ""}%`), $(b, G(r).y ?? .5);
									}, [() => Math.round((G(r).x ?? .5) * 100), () => Math.round((G(r).y ?? .5) * 100)]), K("click", u, () => at(n, i, -1)), K("click", d, () => at(n, i, 1)), K("click", f, () => ot(n, i)), K("input", g, (e) => st(n, i, "x", Number(e.target.value))), K("input", b, (e) => st(n, i, "y", Number(e.target.value))), J(e, o);
								});
								var c = V(s, 2), l = V(z(c));
								{
									let e = /* @__PURE__ */ P(() => G(t).props.fit ?? "cover");
									na(l, {
										get value() {
											return G(e);
										},
										options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
										onchange: (e) => $e(n, "fit", e)
									});
								}
								M(c);
								var u = V(c, 2), d = V(z(u));
								Q(d), M(u);
								var f = V(u, 2), p = V(z(f)), m = z(p);
								M(p), M(f);
								var h = V(f, 2);
								Q(h);
								var g = V(h, 2), _ = V(z(g)), v = z(_);
								M(_), M(g);
								var y = V(g, 2);
								Q(y);
								var b = V(y, 2), x = V(z(b)), S = z(x);
								M(x), M(b);
								var ee = V(b, 2);
								Q(ee), N(2), H((e, n) => {
									$(d, G(t).props.interval ?? 6), Y(m, `${e ?? ""} s`), $(h, G(t).props.fade ?? 1.5), Y(v, `${G(t).props.blur ?? 0 ?? ""} px`), $(y, G(t).props.blur ?? 0), Y(S, `${n ?? ""}%`), $(ee, G(t).props.opacity ?? 1);
								}, [() => (G(t).props.fade ?? 1.5).toFixed(1), () => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => rt(n, e)), K("change", d, (e) => $e(n, "interval", Number(e.target.value))), K("input", h, (e) => $e(n, "fade", Number(e.target.value))), K("input", y, (e) => $e(n, "blur", Number(e.target.value))), K("input", ee, (e) => $e(n, "opacity", Number(e.target.value))), J(e, r);
							};
							X(f, (e) => {
								G(t).type === "color" ? e(p) : G(t).type === "gradient" ? e(m, 1) : G(t).type === "glow" ? e(h, 2) : G(t).type === "grain" ? e(g, 3) : G(t).type === "image" ? e(_, 4) : G(t).type === "bildegalleri" && e(v, 5);
							}), M(i), H(() => u.disabled = n === G(We).length - 1), K("click", l, () => Qe(n, -1)), K("click", u, () => Qe(n, 1)), K("click", d, () => Ze(n)), J(e, i);
						});
						var d = V(u, 2), f = V(z(d));
						{
							let e = /* @__PURE__ */ P(() => r.map(([e, t]) => [e, t.label]));
							na(f, {
								get value() {
									return G(Ye);
								},
								get options() {
									return G(e);
								},
								onchange: (e) => R(Ye, e, !0)
							});
						}
						M(d);
						var p = V(d, 2), m = V(p, 4), h = V(z(m));
						{
							let e = /* @__PURE__ */ P(() => G(Ge)?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(ka).map(([e, t]) => [e, t.label])]);
							na(h, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => ft(e || null)
							});
						}
						M(m);
						var g = V(m, 2), _ = (e) => {
							var t = Xa(), n = B(t), r = V(z(n));
							Q(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), M(i), N(2), H(() => {
								$(r, G(Ge).props.duration), $(a, G(Ge).props.delay);
							}), K("change", r, (e) => pt("duration", Number(e.target.value))), K("change", a, (e) => pt("delay", Number(e.target.value))), J(e, t);
						};
						X(g, (e) => {
							G(Ge) && ka[G(Ge).type]?.entrance && e(_);
						}), H(() => {
							$(i, G(Ve)), ni(s, G(Be) !== null);
						}), K("change", i, (e) => mt(e.target.value)), K("change", s, (e) => gt(e.target.checked)), K("click", p, () => Xe(G(Ye))), J(e, t);
					}, c = (e) => {
						J(e, ns());
					};
					X(i, (e) => {
						G(k) ? e(o) : G(ze) ? e(s, 1) : e(c, -1);
					}), M(t), J(e, t);
				}, g = (e) => {
					var t = is(), n = V(z(t), 2), r = z(n);
					Q(r), N(), M(n);
					var i = V(n, 4);
					it(i), ri(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = V(i, 4), o = V(z(a));
					{
						let e = /* @__PURE__ */ P(() => G(E).footer?.align ?? "center");
						na(o, {
							get value() {
								return G(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => tr("footer", (t) => {
								t.align = e;
							})
						});
					}
					M(a), N(2), M(t), H((e) => {
						ni(r, e), $(i, G(E).footer?.text ?? "");
					}, [() => !!G(E).footer?.show]), K("change", r, (e) => tr("footer", (t) => {
						t.show = e.target.checked;
					})), K("input", i, (e) => tr("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), J(e, t);
				}, y = (e) => {
					var t = us(), n = V(z(t), 2), r = (e) => {
						var t = as(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => G(bn) ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...G(_n).map((e) => [e, G(vn)[e]?.name ?? e])]);
							na(n, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => R(bn, e || null, !0)
							});
						}
						M(t), J(e, t);
					};
					X(n, (e) => {
						G(_n).length && e(r);
					});
					var i = V(n, 2), o = (e) => {
						let t = /* @__PURE__ */ P(() => G(vn)[G(bn)]);
						var n = ls(), r = B(n), i = z(r), o = V(i, 2);
						Z(o, () => a.cross, !0), M(o), M(r);
						var s = V(r, 2);
						Rr(s, 19, () => G(t).entries, (e) => e.id, (e, n, r) => {
							var i = ss(), o = z(i), s = z(o);
							M(o);
							var c = V(o, 2), l = z(c), u = z(l);
							Q(u);
							var d = V(u, 2), f = z(d);
							Z(f, () => a.up, !0), M(f);
							var p = V(f, 2);
							Z(p, () => a.down, !0), M(p);
							var m = V(p, 2);
							Z(m, () => a.cross, !0), M(m), M(d), M(l);
							var h = V(l, 2), g = V(z(h));
							Q(g), M(h);
							var _ = V(h, 2);
							it(_);
							var v = V(_, 2), y = V(z(v));
							Q(y), M(v);
							var b = V(v, 2), x = z(b), S = z(x), ee = V(S);
							M(x);
							var C = V(x, 2), w = (e) => {
								var t = os(), r = B(t), i = V(r, 2);
								Z(i, () => a.cross, !0), M(i), H(() => ri(r, "src", G(n).image)), K("click", i, () => Mn(G(bn), G(n).id, "image", "")), J(e, t);
							};
							X(C, (e) => {
								G(n).image && e(w);
							}), M(b), M(c), M(i), H((e) => {
								Y(s, `${e ?? ""}${G(n).date ? ` · ${G(n).date}` : ""}`), $(u, G(n).title), f.disabled = G(r) === 0, p.disabled = G(r) === G(t).entries.length - 1, $(g, G(n).date ?? ""), $(_, G(n).text ?? ""), $(y, G(n).href ?? ""), Y(S, `${G(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => G(n).title.replace(/<[^>]*>/g, "")]), K("change", u, (e) => Mn(G(bn), G(n).id, "title", e.target.value || "Uten tittel")), K("click", f, () => Nn(G(bn), G(r), -1)), K("click", p, () => Nn(G(bn), G(r), 1)), K("click", m, () => Pn(G(bn), G(n).id)), K("change", g, (e) => Mn(G(bn), G(n).id, "date", e.target.value)), K("change", _, (e) => Mn(G(bn), G(n).id, "text", e.target.value)), K("change", y, (e) => Mn(G(bn), G(n).id, "href", e.target.value)), K("change", ee, (e) => Fn(G(bn), G(n).id, e)), J(e, i);
						});
						var c = V(s, 2), l = (e) => {
							J(e, cs());
						};
						X(c, (e) => {
							G(t).entries.length || e(l);
						}), N(2), K("click", i, () => jn(G(bn))), K("click", o, () => An(G(bn))), J(e, n);
					};
					X(i, (e) => {
						G(bn) && G(vn)[G(bn)] && e(o);
					});
					var s = V(i, 2), c = V(z(s));
					Q(c), M(s);
					var l = V(s, 2);
					na(V(z(l)), {
						get value() {
							return G(Sn);
						},
						get options() {
							return Cn;
						},
						onchange: (e) => R(Sn, e, !0)
					}), M(l);
					var u = V(l, 2);
					M(t), H((e) => u.disabled = e, [() => !G(xn).trim()]), K("keydown", c, (e) => e.key === "Enter" && kn()), si(c, () => G(xn), (e) => R(xn, e)), K("click", u, kn), J(e, t);
				}, x = (e) => {
					var t = ys(), n = V(z(t), 2), r = (e) => {
						J(e, ds());
					}, i = /* @__PURE__ */ P(() => !Wn().length);
					X(n, (e) => {
						G(i) && e(r);
					});
					var o = V(n, 2);
					Rr(o, 16, Wn, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => Bn[t]), r = /* @__PURE__ */ P(() => (G(zn)?.enabled ?? []).includes(t));
						var i = ms();
						let o;
						var s = z(i), c = z(s), l = z(c, !0);
						M(c);
						var u = V(c, 2), d = (e) => {
							var t = fs(), r = z(t);
							M(t), H(() => Y(r, `v${G(n).version ?? ""}`)), J(e, t);
						};
						X(u, (e) => {
							G(n)?.version && e(d);
						});
						var f = V(u, 2), p = z(f), m = z(p);
						Q(m);
						var h = V(m);
						M(p);
						var g = V(p, 2);
						Z(g, () => a.cross, !0), M(g), M(f), M(s);
						var _ = V(s, 2), v = (e) => {
							var t = ps(), r = z(t, !0);
							M(t), H((e) => Y(r, e), [() => G(n).errors.join("; ")]), J(e, t);
						}, y = (e) => {
							var t = ps(), r = z(t);
							M(t), H(() => Y(r, `Krever motorversjon ${G(n).requiresEngine ?? ""} (denne siden kjører ${G(Vn) ?? ""}); pluginen hoppes over ved lasting.`)), J(e, t);
						}, b = (e) => {
							var t = ps(), r = z(t);
							M(t), H((e) => Y(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(G(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(G(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), J(e, t);
						};
						X(_, (e) => {
							G(n)?.errors?.length ? e(v) : G(n) && !G(n).satisfied ? e(y, 1) : G(n)?.csp && e(b, 2);
						}), M(i), H((e) => {
							o = Yr(i, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": G(n)?.errors?.length }), Y(l, G(n)?.name ?? t), ri(p, "title", G(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ni(m, G(r)), m.disabled = e, Y(h, ` ${G(r) ? "På" : "Av"}`);
						}, [() => !!G(n)?.errors?.length]), K("change", m, (e) => Xn(t, e.target.checked)), K("click", g, () => Qn(t)), J(e, i);
					});
					var s = V(o, 2), c = (e) => {
						var t = gs();
						Rr(V(B(t), 4), 16, () => G(Un), (e) => e, (e, t) => {
							var n = hs(), r = z(n), i = z(r), o = z(i, !0);
							M(i);
							var s = V(i, 2), c = (e) => {
								var n = fs(), r = z(n);
								M(n), H(() => Y(r, `v${Bn[t].version ?? ""}`)), J(e, n);
							};
							X(s, (e) => {
								Bn[t]?.version && e(c);
							});
							var l = V(s, 2), u = z(l);
							Z(u, () => a.right, !0), M(u), M(l), M(r), M(n), H(() => Y(o, Bn[t]?.name ?? t)), K("click", u, () => er(t)), J(e, n);
						}), J(e, t);
					};
					X(s, (e) => {
						G(Un).length && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = Or(), n = B(t), r = (e) => {
							J(e, _s());
						};
						X(n, (e) => {
							G(Un).length || e(r);
						}), J(e, t);
					}, d = (e) => {
						var t = vs(), n = V(B(t), 2);
						Q(n);
						var r = V(n, 2), i = V(r, 2), a = (e) => {
							var t = ps(), n = z(t, !0);
							M(t), H(() => Y(n, G(Hn))), J(e, t);
						};
						X(i, (e) => {
							G(Hn) && e(a);
						}), H((e) => r.disabled = e, [() => !G(U).trim()]), K("keydown", n, (e) => e.key === "Enter" && $n()), si(n, () => G(U), (e) => R(U, e)), K("click", r, $n), J(e, t);
					};
					X(l, (e) => {
						G(W) === "ok" ? e(u) : e(d, -1);
					}), M(t), J(e, t);
				}, S = (e) => {
					var t = ws(), n = V(z(t), 2), r = (e) => {
						J(e, bs());
					}, i = (e) => {
						var t = fo(), n = B(t), r = (e) => {
							var t = xs(), n = z(t, !0);
							M(t), H(() => Y(n, G(wt))), J(e, t);
						};
						X(n, (e) => {
							G(wt) && e(r);
						});
						var i = V(n, 2), a = (e) => {
							var t = Cs(), n = B(t);
							Rr(V(n, 2), 19, () => G(Ct), (e) => e.sha, (e, t, n) => {
								var r = Ss();
								let i;
								var a = z(r), o = z(a, !0);
								M(a);
								var s = V(a, 2), c = z(s);
								M(s), M(r), H((e) => {
									i = Yr(r, 1, "history-row svelte-1n46o8q", null, i, { head: G(n) === 0 }), ri(a, "title", G(t).sha), Y(o, G(t).message), Y(c, `${G(t).author ?? ""}${e ?? ""}`);
								}, [() => G(t).date ? ` · ${F.format(new Date(G(t).date))}` : ""]), J(e, r);
							}), H(() => {
								n.disabled = G(Tt) || !G(_)?.allowed, ri(n, "title", G(_)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), K("click", n, Ot), J(e, t);
						};
						X(i, (e) => {
							G(Ct).length > 0 && e(a);
						}), J(e, t);
					};
					X(n, (e) => {
						G(Ct) === null ? e(r) : e(i, -1);
					}), M(t), J(e, t);
				};
				X(s, (e) => {
					G(O) === "Sider" ? e(c) : G(O) === "Nav" ? e(u, 1) : G(O) === "Tema" ? e(d, 2) : G(O) === "Blokker" ? e(f, 3) : G(O) === "Grid" ? e(p, 4) : G(O) === "Egenskaper" ? e(h, 5) : G(O) === "Footer" ? e(g, 6) : G(O) === "Samlinger" ? e(y, 7) : G(O) === "Plugins" ? e(x, 8) : G(O) === "Historikk" && e(S, 9);
				}), M(t), H(() => Y(o, G(O))), J(e, t);
			};
			X(o, (e) => {
				G(O) && e(s);
			}), J(e, t);
		};
		X(i, (e) => {
			G(y) && e(o);
		});
		var s = V(i, 2);
		let c;
		var u = z(s);
		di(u, (e) => R(g, e), () => G(g)), M(s), M(t), H(() => {
			c = Yr(s, 1, "frame-wrap svelte-1n46o8q", null, c, { mobile: G(b) === "mobile" }), ri(u, "src", `/?page=${G(l)}&preview=1`);
		}), yr("load", u, Nt), _r(u), J(e, t);
	}, Hi = (e) => {
		J(e, Os());
	};
	X(Bi, (e) => {
		G(c) ? e(Vi) : e(Hi, -1);
	});
	var Ui = V(Bi, 2), Wi = (e) => {
		ia(e, {
			get image() {
				return G(Yt);
			},
			onapply: Zt,
			oncancel: () => R(Yt, null)
		});
	};
	X(Ui, (e) => {
		G(Yt) && e(Wi);
	});
	var Gi = V(Ui, 2), Ki = (e) => {
		var t = As(), n = z(t), r = z(n), i = z(r, !0);
		M(r);
		var a = V(r, 2);
		Rr(a, 16, () => G(he).lines, (e) => e, (e, t) => {
			var n = ks(), r = z(n, !0);
			M(n), H(() => Y(r, t)), J(e, n);
		});
		var o = V(a, 2), s = z(o), c = z(s, !0);
		M(s);
		var l = V(s, 2), u = z(l, !0);
		M(l), M(o), M(n), M(t), H(() => {
			Y(i, G(he).title), Y(c, G(he).cancelLabel), Y(u, G(he).okLabel);
		}), K("click", s, () => _e(!1)), K("click", l, () => _e(!0)), J(e, t);
	};
	X(Gi, (e) => {
		G(he) && e(Ki);
	});
	var qi = V(Gi, 2), Ji = (e) => {
		var t = js(), n = z(t), r = V(z(n), 4), i = V(z(r));
		Q(i), M(r);
		var a = V(r, 2);
		wi(V(z(a)), {
			get value() {
				return G(be);
			},
			label: "Aksentfarge",
			onchange: (e) => R(be, e, !0)
		}), M(a);
		var o = V(a, 2);
		wi(V(z(o)), {
			get value() {
				return G(xe);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => R(xe, e, !0)
		}), M(o);
		var s = V(o, 4), c = z(s), l = V(c, 2);
		M(s), M(n), M(t), H((e) => l.disabled = e, [() => !G(ye).trim()]), K("keydown", i, (e) => e.key === "Enter" && Ce()), si(i, () => G(ye), (e) => R(ye, e)), K("click", c, Se), K("click", l, Ce), J(e, t);
	};
	X(qi, (e) => {
		G(ve) && e(Ji);
	});
	var Yi = V(qi, 2), Xi = (e) => {
		var t = Ms();
		let n;
		var r = z(t), i = z(r, !0);
		M(r);
		var a = V(r, 2);
		M(t), H(() => {
			n = Yr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: G(f) === "ok",
				error: G(f) === "error"
			}), Y(i, G(d));
		}), K("click", a, () => h("")), J(e, t);
	};
	X(Yi, (e) => {
		G(d) && e(Xi);
	}), M(bi);
	var $i = V(bi, 2), ea = (e) => {
		var t = Ns(), r = z(t), i = z(r), o = z(i);
		M(i);
		var s = V(i, 2);
		Z(s, () => a.cross, !0), M(s), M(r);
		var c = V(r, 2), l = z(c);
		n(l), M(c), M(t), H(() => {
			Zr(t, `left: ${G(A).left ?? ""}px; top: ${G(A).top ?? ""}px`), Y(o, `${Fe[G(k).type] ?? G(k).type ?? ""}-blokk`);
		}), K("click", s, () => R(A, null)), J(e, t);
	};
	X($i, (e) => {
		G(A) && G(k) && e(ea);
	}), H(() => Ti = Yr(Ci, 1, "topbar svelte-1n46o8q", null, Ti, { hidden: !G(y) })), J(e, yi), Ue();
}
br([
	"change",
	"click",
	"input",
	"keydown"
]);
//#endregion
//#region src/main.js
var Is = kr(Fs, { target: document.getElementById("urd-admin") });
//#endregion
export { Is as default };
