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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, w = 1 << 25, T = 65536, E = 1 << 21, D = 1 << 22, te = 1 << 23, ne = Symbol("$state"), re = Symbol("legacy props"), ie = Symbol(""), O = Symbol("attributes"), ae = Symbol("class"), oe = Symbol("style"), se = Symbol("text"), ce = Symbol("form reset"), le = new class extends Error {
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
var Se = {}, Ce = Symbol("uninitialized"), we = "http://www.w3.org/1999/xhtml", Te = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1998/Math/MathML";
function k() {
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
	if (e === null) throw De(), Se;
	return Ae = e;
}
function Me() {
	return je(/* @__PURE__ */ ln(Ae));
}
function j(e) {
	if (A) {
		if (/* @__PURE__ */ ln(Ae) !== null) throw De(), Se;
		Ae = e;
	}
}
function M(e = 1) {
	if (A) {
		for (var t = e, n = Ae; t--;) n = /* @__PURE__ */ ln(n);
		Ae = n;
	}
}
function N(e = !0) {
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
	if (!e || e.nodeType !== 8) throw De(), Se;
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
	var t = U;
	if (t === null) return Hn.f |= te, e;
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
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ce]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function st(e) {
	var t = Hn, n = U;
	Wn(null), Gn(null);
	try {
		return e();
	} finally {
		Wn(t), Gn(n);
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
		_n() && (W(n), wn(() => (t === 0 && (r = fr(() => e(() => $t(n)))), t += 1, () => {
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
	#h = lt(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Tn(() => {
			if (A) {
				let e = this.#t;
				Me();
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
		var t = U, n = Hn, r = Be;
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
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Nn(this.#o, () => {
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
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), A && (je(this.#t), M(), je(N()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Oe();
				return;
			}
			r = !0, i && xe(), this.#s !== null && Nn(this.#s, () => {
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
	var e = U, t = Hn, n = Be, r = F;
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
	r === null && de();
	var i = void 0, a = Yt(Ce), o = !Hn, s = /* @__PURE__ */ new Set();
	return Cn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== le && n.reject(e);
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
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= te, Zt(a, t)) : (a.f & 8388608 && (a.f ^= te), Zt(a, e)), c.deactivate());
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
		for (var n = 0; n < t.length; n += 1) An(t[n]);
	}
}
function St(e) {
	var t, n = U, r = e.parent;
	if (!Bn && r !== null && e.v !== Ce && r.f & 24576) return k(), e.v;
	Gn(r);
	try {
		e.f &= ~T, xt(e), t = ar(e);
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
	Bn || (Ot === null ? $e(e) : (_n() || F?.is_fork) && Ot.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(le), t.ac = null;
	}), t.fn !== null && (t.teardown = d), sr(t, 0), On(t));
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
			if (Mt !== null && t === U && (Hn === null || !(Hn.f & 2))) return;
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
			if (!(r.f & 24576) && rr(r) && (zt = /* @__PURE__ */ new Set(), cr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Mn(r), zt?.size > 0)) {
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
	return Hn !== null && (!Un || Hn.f & 131072) && We() && Hn.f & 4325394 && (Kn === null || !Kn.has(e)) && be(), Zt(e, n ? en(t) : t, Nt);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Bn ? t : e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), Ot === null && $e(t);
		}
		e.wv = nr(), R(e, g, n), We() && U !== null && U.f & 1024 && !(U.f & 96) && (Xn === null ? Zn([e]) : Xn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
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
function R(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = We(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && Qe(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				Ot?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= T), R(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && zt !== null && zt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function en(t) {
	if (typeof t != "object" || !t || ne in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = er, f = (e) => {
		if (er === d) return e();
		var t = Hn, n = er;
		Wn(null), tr(d);
		var r = e();
		return Wn(t), tr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ve();
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
			if (n === ne) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(en(s ? e[n] : Ce), u)), r.set(n, o)), o !== void 0) {
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
			if (t === ne) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== Ce || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? en(e[t]) : Ce, u)), r.set(t, n)), W(n) === Ce) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(Ce, u)), r.set(d + "", p)) : L(p, Ce);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, en(n)), r.set(t, c));
			else {
				l = c.v !== Ce;
				var m = f(() => en(n));
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
			ye();
		}
	});
}
var tn, nn, rn, an;
function on() {
	if (tn === void 0) {
		tn = window, nn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[ae] = void 0, e[O] = null, e[oe] = void 0, e.__e = void 0), u(n) && (n[se] = void 0);
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
	U === null && (Hn === null && he(e), me()), Bn && pe(e);
}
function hn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function gn(e, t) {
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
			throw An(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && hn(i, n), Hn !== null && Hn.f & 2 && !(e & 64))) {
		var a = Hn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function _n() {
	return Hn !== null && !Un;
}
function vn(e) {
	let t = gn(8, null);
	return Qe(t, h), t.teardown = e, t;
}
function yn(e) {
	mn("$effect");
	var t = U.f;
	if (!Hn && t & 32 && Be !== null && !Be.i) {
		var n = Be;
		(n.e ??= []).push(e);
	} else return bn(e);
}
function bn(e) {
	return gn(4 | ee, e);
}
function xn(e) {
	It.ensure();
	let t = gn(64 | C, e);
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
	return gn(D | C, e);
}
function wn(e, t = 0) {
	return gn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		gn(8, () => {
			e(...t.map(W));
		});
	});
}
function Tn(e, t = 0) {
	return gn(16 | t, e);
}
function En(e) {
	return gn(32 | C, e);
}
function Dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Bn, n = Hn;
		Vn(!0), Wn(null);
		try {
			t.call(null);
		} finally {
			Vn(e), Wn(n);
		}
	}
}
function On(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && st(() => {
			e.abort(le);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (jn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, On(e, t && !n), sr(e, 0);
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
var Hn = null, Un = !1;
function Wn(e) {
	Hn = e;
}
var U = null;
function Gn(e) {
	U = e;
}
var Kn = null;
function qn(e) {
	Hn !== null && (Kn ??= /* @__PURE__ */ new Set()).add(e);
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
	if (t & 2 && (e.f &= ~T), t & 4096) {
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
	var t = Jn, n = Yn, r = Xn, i = Hn, a = Kn, o = Be, s = Un, c = er, l = e.f;
	Jn = null, Yn = 0, Xn = null, Hn = l & 96 ? null : e, Kn = null, Ve(e.ctx), Un = !1, er = ++$n, e.ac !== null && (st(() => {
		e.ac.abort(le);
	}), e.ac = null);
	try {
		e.f |= E;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (Jn !== null) {
			var m;
			if (p || sr(e, Yn), f !== null && Yn > 0) for (f.length = Yn + Jn.length, m = 0; m < Jn.length; m++) f[Yn + m] = Jn[m];
			else e.deps = f = Jn;
			if (_n() && e.f & 512) for (m = Yn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Yn < f.length && (sr(e, Yn), f.length = Yn);
		if (We() && Xn !== null && !Un && f !== null && !(e.f & 6146)) for (m = 0; m < Xn.length; m++) ir(Xn[m], e);
		if (i !== null && i !== e) {
			if ($n++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = $n;
			if (t !== null) for (let e of t) e.rv = $n;
			Xn !== null && (r === null ? r = Xn : r.push(...Xn));
		}
		return e.f & 8388608 && (e.f ^= te), d;
	} catch (e) {
		return Ye(e);
	} finally {
		e.f ^= E, Jn = t, Yn = n, Xn = r, Hn = i, Kn = a, Ve(o), Un = s, er = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== Ce && $e(s), s.ac !== null && st(() => {
			s.ac.abort(le), s.ac = null, Qe(s, g);
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
		var n = U, r = zn;
		U = e, zn = (t & 96) == 0;
		try {
			t & 16777232 ? kn(e) : On(e), Dn(e);
			var i = ar(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Qn;
		} finally {
			zn = r, U = n;
		}
	}
}
async function lr() {
	await Promise.resolve(), Lt();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (Rn?.add(e), Hn !== null && !Un && !(U !== null && U.f & 16384) && (Kn === null || !Kn.has(e))) {
		var r = Hn.deps;
		if (Hn.f & 2097152) e.rv < $n && (e.rv = $n, Jn === null && r !== null && r[Yn] === e ? Yn++ : Jn === null ? Jn = [e] : Jn.push(e));
		else {
			Hn.deps ??= [], n.call(Hn.deps, e) || Hn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Hn] : n.call(i, Hn) || i.push(Hn);
		}
	}
	if (Bn && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Bn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || dr(a)) && (o = St(a)), qt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Un && Hn !== null && (zn || (Hn.f & 512) != 0), c = (a.f & b) === 0;
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
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && vn(() => {
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
		var d = Hn, f = U;
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
	var t = fn("template");
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
		if (A) return Dr(Ae, null), Ae;
		i === void 0 && (i = Er(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			Dr(o, s);
		} else Dr(t, t);
		return t;
	};
}
function Or(e = "") {
	if (!A) {
		var t = sn(e + "");
		return Dr(t, t), t;
	}
	var n = Ae;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), je(n)), Dr(n, n), n;
}
function kr() {
	if (A) return Dr(Ae, null), Ae;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Dr(t, n), e;
}
function q(e, t) {
	if (A) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ae), Me();
		return;
	}
	e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[se] ??= e.nodeValue) && (e[se] = n, e.nodeValue = `${n}`);
}
function Ar(e, t) {
	return Mr(e, t);
}
var jr = /* @__PURE__ */ new Map();
function Mr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	on();
	var l = void 0, u = xn(() => {
		var s = n ?? t.appendChild(sn());
		dt(s, { pending: () => {} }, (t) => {
			He({});
			var n = Be;
			if (o && (n.c = o), a && (i.$$events = a), A && Dr(t, null), l = e(t, i) || {}, A && (U.nodes.end = Ae, Ae === null || Ae.nodeType !== 8 || Ae.data !== "]")) throw De(), Se;
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
function Y(e, t, n = !1) {
	var r;
	A && (r = Ae, Me());
	var i = new Pr(e), a = n ? S : 0;
	function o(e, t) {
		if (A) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = N();
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
function Fr(e, t) {
	return t;
}
function Ir(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Nn(n, () => {
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
			un(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= w, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var Rr;
function zr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? je(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	A && Me();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Vr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, Ur(d, null, c)) : Fn(d) : Nn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Tn(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			A && Ne(c) === "[!" != (e === 0) && (c = N(), je(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = dn(), y = 0; y < e; y += 1) {
				A && Ae.nodeType === 8 && Ae.data === "]" && (c = Ae, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Hr(l, h ? c : Rr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(Rr ??= sn())), d.f |= w)), e > r.size && fe("", "", ""), A && e > 0 && je(N()), !h) if (m.set(u, r), v) {
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
	h = !1, A && (c = Ae);
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
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= w, _ === l) Ur(_, null, n);
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
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Br(l.next);
		var T = ee.length;
		if (T > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) ee[v].nodes?.a?.fix();
			}
			Ir(e, ee, E);
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
		e: En(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ur(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
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
		A && (o = je(/* @__PURE__ */ cn(c)));
	}
	H(() => {
		var e = U;
		if (s === (s = t() ?? "")) {
			A && Me();
			return;
		}
		if (n && !A) {
			e.nodes = null, c.innerHTML = s, s !== "" && Dr(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (A) {
				for (var a = Ae.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw De(), Se;
				Dr(Ae, u), o = je(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? Te : i ? Ee : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Dr(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
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
	var o = e[ae];
	if (A || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!A || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ae] = n;
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
	var i = e[oe];
	if (A || i !== t) {
		var a = Yr(t, r);
		(!A || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[oe] = t;
	} else r && (Array.isArray(r) ? (Zr(e, n?.[0], r[0]), Zr(e, n?.[1], r[1], "important")) : Zr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var $r = Symbol("is custom element"), ei = Symbol("is html"), ti = ue ? "link" : "LINK", ni = ue ? "progress" : "PROGRESS";
function Z(e) {
	if (A) {
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
		e[ce] = n, qe(n), ot();
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
	A && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ti) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[O] ??= {
		[$r]: e.nodeName.includes("-"),
		[ei]: e.namespaceURI === we
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
	}), (A && e.defaultValue !== e.value || fr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), F !== null && r.add(F)), wn(() => {
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
	return e === t || e?.[ne] === t;
}
function fi(e = {}, t, n, r) {
	var i = Be.r, a = U;
	return Sn(() => {
		var o, s;
		return wn(() => {
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
		var p = ne in e || re in e;
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
	o && W(y);
	var b = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : i && o ? en(e) : e;
			return L(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Bn && v || b.f & 16384 ? y.v : W(y);
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
	He(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ I(en([])), u = /* @__PURE__ */ I(en([])), d = "", f = "", p = /* @__PURE__ */ I(null), h = /* @__PURE__ */ I(!1), g = /* @__PURE__ */ I(en({
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
	function ee(e, t, n) {
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
		return C(...w(W(_), W(v), W(y)));
	}
	function E() {
		let e = T();
		return W(b) >= .995 ? e : e + Math.round(W(b) * 255).toString(16).padStart(2, "0");
	}
	function D() {
		L(x, E(), !0), f = W(x), t.onchange?.(W(x));
	}
	function te(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			L(_, t[0], !0), L(v, t[1], !0), L(y, t[2], !0);
		})(ee(t[0], t[1], t[2])), L(b, t[3], !0), L(x, E(), !0), !0) : !1;
	}
	function ne() {
		te(s()) || te("#000000"), d = n(), f = "";
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
		let e = W(p).getBoundingClientRect(), t = W(p).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), c = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(g, {
			top: c,
			left: i
		}, !0), L(h, !0);
	}
	function re() {
		if (L(h, !1), f && f !== d) {
			let e = [f, ...W(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function ie(e, n) {
		te(n), L(x, n, !0), t.onchange?.(e);
	}
	function O(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			L(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), L(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), D();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ae(e) {
		te(e.target.value) ? D() : L(x, T(), !0);
	}
	function oe(e) {
		return (S(T()) ?? [
			0,
			0,
			0
		])[e];
	}
	function se(e, t) {
		let n = S(T()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			L(_, t[0], !0), L(v, t[1], !0), L(y, t[2], !0);
		})(ee(...n)), D();
	}
	let ce = typeof window < "u" && "EyeDropper" in window;
	async function le() {
		try {
			te((await new window.EyeDropper().open()).sRGBHex) && D();
		} catch {}
	}
	function ue(e) {
		te(e) && D();
	}
	function de() {
		let e = E();
		W(u).includes(e) || (L(u, [e, ...W(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(Re(W(u)))));
	}
	function fe(e) {
		L(u, W(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(Re(W(u))));
	}
	yn(() => {
		if (!W(h)) return;
		let e = (e) => {
			W(p) && !W(p).contains(e.target) && re();
		}, t = (e) => {
			e.key === "Escape" && re();
		}, n = () => re();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var pe = wi(), me = z(pe);
	let he;
	var ge = V(me, 2), _e = (e) => {
		var t = Ci(), i = z(t), a = z(i);
		j(i);
		var o = V(i, 2);
		Z(o);
		var s = V(o, 2);
		Z(s);
		var d = V(s, 2), f = z(d), p = V(f, 2);
		Z(p);
		var h = V(p, 2), S = (e) => {
			var t = hi();
			G("click", t, le), q(e, t);
		};
		Y(h, (e) => {
			ce && e(S);
		}), j(d);
		var C = V(d, 2);
		zr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = gi();
			Z(r), H((e) => {
				ii(r, "title", t), Q(r, e);
			}, [() => oe(W(n))]), G("change", r, (e) => se(W(n), e.target.value)), q(e, r);
		}), j(C);
		var ee = V(C, 2), w = (e) => {
			var t = vi(), i = B(t), a = V(z(i)), o = (e) => {
				var t = Or();
				H((e) => J(t, `- koblet til «${e ?? ""}»`), [() => c()]), q(e, t);
			}, s = /* @__PURE__ */ P(() => c());
			Y(a, (e) => {
				W(s) && e(o);
			}), j(i);
			var l = V(i, 2);
			zr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(W(t), 2));
				let i = () => W(r)[0], a = () => W(r)[1];
				var o = _i();
				let s;
				H(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), ii(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), G("click", o, () => ie(i(), a())), q(e, o);
			}), j(l), q(e, t);
		};
		Y(ee, (e) => {
			r().length && e(w);
		});
		var E = V(ee, 2), te = V(z(E));
		j(E);
		var ne = V(E, 2), re = (e) => {
			var t = bi();
			zr(t, 20, () => W(u), (e) => e, (e, t) => {
				var n = yi(), r = z(n), i = V(r, 2);
				j(n), H(() => {
					Qr(r, `background: ${t ?? ""}`), ii(r, "title", t);
				}), G("click", r, () => ue(t)), G("click", i, () => fe(t)), q(e, n);
			}), j(t), q(e, t);
		};
		Y(ne, (e) => {
			W(u).length && e(re);
		});
		var pe = V(ne, 2), me = (e) => {
			var t = Si(), n = V(B(t), 2);
			zr(n, 20, () => W(l), (e) => e, (e, t) => {
				var n = xi();
				H(() => {
					Qr(n, `background: ${t ?? ""}`), ii(n, "title", t);
				}), G("click", n, () => ue(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(pe, (e) => {
			W(l).length && e(me);
		}), j(t), H((e, n) => {
			Qr(t, `top: ${W(g).top ?? ""}px; left: ${W(g).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${W(_) ?? ""}, 100%, 50%)`), Qr(a, `left: ${W(v) * 100}%; top: ${(1 - W(y)) * 100}%`), Q(o, W(_)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${W(x) ?? ""}`), Q(p, W(x));
		}, [() => Math.round(W(b) * 100), () => T()]), G("click", t, (e) => e.preventDefault()), G("pointerdown", i, O), G("input", o, (e) => {
			L(_, Number(e.target.value), !0), D();
		}), G("input", s, (e) => {
			L(b, Number(e.target.value) / 100), D();
		}), G("change", p, ae), G("click", te, de), q(e, t);
	};
	Y(ge, (e) => {
		W(h) && e(_e);
	}), j(pe), fi(pe, (e) => L(p, e), () => W(p)), H((e, t, n) => {
		he = Xr(me, 1, "cp-swatch svelte-zxiloo", null, he, e), Qr(me, `background: ${t ?? ""}`), ii(me, "title", n), ii(me, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), G("click", me, () => W(h) ? re() : ne()), q(e, pe), Ue();
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
	He(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ I(en([])), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(en({
		top: 0,
		left: 0
	}));
	function d() {
		L(o, Fi(), !0);
		let e = W(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(u, {
			top: n,
			left: t
		}, !0), L(l, !0);
	}
	function f(e) {
		Ii(e), t.onpick?.(e), L(l, !1);
	}
	function p(e) {
		t.onicon?.(e), L(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ki(n, 256);
		t.onimage?.(r.dataUrl), L(l, !1);
	}
	yn(() => {
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
	var g = Zi(), _ = z(g), v = z(_), y = (e) => {
		var t = Hi();
		H(() => ii(t, "src", i())), q(e, t);
	}, b = (e) => {
		var t = Ui();
		X(t, () => Vi(r()), !0), j(t), q(e, t);
	}, x = (e) => {
		var t = Or();
		H(() => J(t, n() || "★")), q(e, t);
	};
	Y(v, (e) => {
		i() ? e(y) : r() && zi[r()] ? e(b, 1) : e(x, -1);
	}), j(_);
	var S = V(_, 2), C = (e) => {
		var i = Xi(), a = z(i), s = (e) => {
			var t = Gi(), n = V(B(t), 2);
			zr(n, 20, () => W(o), (e) => e, (e, t) => {
				var n = Wi(), r = z(n, !0);
				j(n), H(() => J(r, t)), G("click", n, () => f(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(a, (e) => {
			W(o).length && e(s);
		});
		var l = V(a, 2), d = (e) => {
			var t = kr();
			zr(B(t), 17, () => Bi, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(W(t), 2));
				let i = () => W(n)[0], a = () => W(n)[1];
				var o = qi(), s = B(o), c = z(s, !0);
				j(s);
				var l = V(s, 2);
				zr(l, 20, a, (e) => e, (e, t) => {
					var n = Ki();
					let i;
					var a = z(n);
					X(a, () => Vi(t), !0), j(a), j(n), H(() => {
						i = Xr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ii(n, "title", zi[t].label);
					}), G("click", n, () => p(t)), q(e, n);
				}), j(l), H(() => J(c, i())), q(e, o);
			}), q(e, t);
		};
		Y(l, (e) => {
			t.onicon && e(d);
		});
		var g = V(l, 2);
		zr(g, 17, () => Ni, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = qi(), s = B(o), c = z(s, !0);
			j(s);
			var l = V(s, 2);
			zr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Ji();
				let i;
				var a = z(r, !0);
				j(r), H(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), J(a, t);
				}), G("click", r, () => f(t)), q(e, r);
			}), j(l), H(() => J(c, i())), q(e, o);
		});
		var _ = V(g, 2), v = (e) => {
			var t = Yi(), n = V(B(t), 2), r = V(n, 2);
			fi(r, (e) => L(c, e), () => W(c)), M(2), G("click", n, () => W(c).click()), G("change", r, h), q(e, t);
		};
		Y(_, (e) => {
			t.onimage && e(v);
		}), j(i), H(() => Qr(i, `top: ${W(u).top ?? ""}px; left: ${W(u).left ?? ""}px`)), q(e, i);
	};
	Y(S, (e) => {
		W(l) && e(C);
	}), j(g), fi(g, (e) => L(s, e), () => W(s)), H(() => {
		ii(_, "title", a()), ii(_, "aria-label", a());
	}), G("click", _, () => W(l) ? L(l, !1) : d()), q(e, g), Ue();
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
	He(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(en({
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
	yn(() => {
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
	var f = na(), p = z(f), h = z(p), g = z(h, !0);
	j(h);
	var _ = V(h, 2), v = z(_, !0);
	j(_), j(p);
	var y = V(p, 2), b = (e) => {
		var t = ta();
		zr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = ea();
			let s;
			var c = z(o, !0);
			j(o), H(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), J(c, a());
			}), G("click", o, () => d(i())), q(e, o);
		}), j(t), H(() => Qr(t, `top: ${W(c).top ?? ""}px; left: ${W(c).left ?? ""}px; min-width: ${W(c).width ?? ""}px`)), q(e, t);
	};
	Y(y, (e) => {
		W(o) && e(b);
	}), j(f), fi(f, (e) => L(s, e), () => W(s)), H((e) => {
		ii(p, "title", i()), p.disabled = a(), J(g, e), J(v, W(o) ? "▴" : "▾");
	}, [() => l()]), G("click", p, u), q(e, f), Ue();
}
xr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ra = /* @__PURE__ */ K("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function ia(e, t) {
	He(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ I(null), i = /* @__PURE__ */ I(null), a = /* @__PURE__ */ I(1), o = /* @__PURE__ */ I(.5), s = /* @__PURE__ */ I(.5), c = /* @__PURE__ */ I(1), l = /* @__PURE__ */ I(1), u = /* @__PURE__ */ I(1);
	yn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			L(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !W(i)) return;
		e.filter = `brightness(${W(c)}) contrast(${W(l)}) saturate(${W(u)})`;
		let n = Math.max(t / W(i).width, t / W(i).height) * W(a), r = W(i).width * n, d = W(i).height * n, f = t / 2 - W(o) * r, p = t / 2 - W(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(W(i), f, p, r, d), e.filter = "none";
	}
	yn(() => {
		W(i), W(a), W(o), W(s), W(c), W(l), W(u), W(r) && d(W(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!W(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / W(i).width, 220 / W(i).height) * W(a), c = W(i).width * r, l = W(i).height * r, u = (e) => {
			L(o, Math.min(1, Math.max(0, W(o) - (e.clientX - t) / c)), !0), L(s, Math.min(1, Math.max(0, W(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		L(a, 1), L(o, .5), L(s, .5), L(c, 1), L(l, 1), L(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ra(), g = z(h), _ = V(z(g), 2), v = z(_);
	ii(v, "width", 220), ii(v, "height", 220), fi(v, (e) => L(r, e), () => W(r)), M(2), j(_);
	var y = V(_, 2), b = V(z(y)), x = z(b);
	j(b), j(y);
	var S = V(y, 2);
	Z(S);
	var C = V(S, 2), ee = V(z(C)), w = z(ee);
	j(ee), j(C);
	var T = V(C, 2);
	Z(T);
	var E = V(T, 2), D = V(z(E)), te = z(D);
	j(D), j(E);
	var ne = V(E, 2);
	Z(ne);
	var re = V(ne, 2), ie = V(z(re)), O = z(ie);
	j(ie), j(re);
	var ae = V(re, 2);
	Z(ae);
	var oe = V(ae, 2), se = z(oe), ce = V(se, 2);
	j(oe);
	var le = V(oe, 2), ue = z(le), de = V(ue, 2);
	j(le), j(g), j(h), H((e, t, n, r) => {
		J(x, `${e ?? ""}x`), J(w, `${t ?? ""}%`), J(te, `${n ?? ""}%`), J(O, `${r ?? ""}%`);
	}, [
		() => W(a).toFixed(2),
		() => Math.round(W(c) * 100),
		() => Math.round(W(l) * 100),
		() => Math.round(W(u) * 100)
	]), G("pointerdown", v, f), ci(S, () => W(a), (e) => L(a, e)), ci(T, () => W(c), (e) => L(c, e)), ci(ne, () => W(l), (e) => L(l, e)), ci(ae, () => W(u), (e) => L(u, e)), G("click", se, () => L(u, 0)), G("click", ce, p), G("click", ue, () => t.oncancel?.()), G("click", de, m), q(e, h), Ue();
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
], Ga = [
	["S", 14],
	["M", 18],
	["L", 24],
	["XL", 36]
];
//#endregion
//#region ../template/assets/engine/place.js
function Ka(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var qa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kantfarge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"4\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Ja = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Skygge <!></label> <label class=\"svelte-1n46o8q\">Kantlinje <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Frostet glass: gjennomskinnelig kort med uskarp bakgrunn - best over bilder og gradienter\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glass-effekt (frostet)</label>", 1), Ya = /* @__PURE__ */ K("<button> </button>"), Xa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <!> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <label title=\"Avstanden mellom tekstlinjene, i forhold til skriftstørrelsen\" class=\"svelte-1n46o8q\">Linjeavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"1\" max=\"2.5\" step=\"0.05\"/></span> <label title=\"Avstanden mellom bokstavene; negativ er tettere enn normalt\" class=\"svelte-1n46o8q\">Bokstavavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"-1\" max=\"8\" step=\"0.1\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font, størrelse og avstandene gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Za = /* @__PURE__ */ K("<span class=\"nav-line svelte-1n46o8q\"><input title=\"Spørsmålsteksten (svaret skrives rett i blokken)\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern spørsmålet\"></button></span></span>"), Qa = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Ellers lukkes forrige svar når et nytt åpnes\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Flere svar åpne samtidig</label> <p class=\"panel-strong svelte-1n46o8q\">Spørsmål</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt spørsmål</button> <p class=\"panel-strong svelte-1n46o8q\">Kortstil</p> <!>", 1), $a = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), eo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), to = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), no = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), ro = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), io = /* @__PURE__ */ K("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), ao = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), oo = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), so = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), co = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), lo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), uo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), fo = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), po = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), mo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), ho = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), go = /* @__PURE__ */ K("<label title=\"Avstanden fra vinduets topp mens blokken er festet; en klistret meny kan kreve større avstand\" class=\"svelte-1n46o8q\">Avstand fra toppen <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label title=\"Hvor festingen slutter: ved egen seksjon, eller først når en senere seksjon er passert\" class=\"svelte-1n46o8q\">Slipp taket <!></label>", 1), _o = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Blokken blir stående ved vindustoppen mens besøkende scroller. Prøv i Ren visning; gjelder ikke mobil.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fest ved scrolling</label> <!>", 1), vo = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), yo = /* @__PURE__ */ K("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), bo = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), xo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span> <button title=\"Hjelpelinjer: senter og innholdsbredde i alle seksjoner\"></button>", 1), So = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), Co = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span> <button> </button>", 1), wo = /* @__PURE__ */ K("<!> Ren visning", 1), To = /* @__PURE__ */ K("<!> Rediger", 1), Eo = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), Do = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), Oo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), ko = /* @__PURE__ */ K("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Ao = /* @__PURE__ */ K("<!> <!>", 1), jo = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Mo = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), No = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Po = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), Fo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Io = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), Lo = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Ro = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), zo = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), Bo = /* @__PURE__ */ K("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), Vo = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label>"), Ho = /* @__PURE__ */ K("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Uo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\"> <!></label>"), Wo = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bakgrunnsbildet\"></button>"), Go = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Bildestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (høyde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i høyden: 0 = toppen, 100 = bunnen. Monner mest i topplinjen\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (bredde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i bredden: 0 = venstre, 100 = høyre. Monner mest i sidestilt kolonne\" class=\"svelte-1n46o8q\"/>", 1), Ko = /* @__PURE__ */ K("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), qo = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: undermenyen og mobilpanelet får kun bakgrunnsfargen, ikke bildet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Bakgrunnsbilde også i undermenyen</label>"), Jo = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Yo = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Xo = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Zo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <label title=\"0 % = helt tett flate, 100 % = helt gjennomsiktig meny\" class=\"svelte-1n46o8q\">Gjennomsiktighet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når gjennomsiktigheten er høy)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Bakgrunnsfargen med gjennomsiktigheten legger seg som et slør over bildet; komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label> <!></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), Qo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), $o = /* @__PURE__ */ K("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), es = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), ts = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), ns = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), rs = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button>"), is = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), as = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), os = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <button class=\"ghost svelte-1n46o8q\" title=\"Spørsmål og svar der svaret foldes ut ved klikk\">FAQ</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), ss = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), cs = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), ls = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), us = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ds = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fargen\"></button>"), fs = /* @__PURE__ */ K("<span><span class=\"grad-grip svelte-1n46o8q\" title=\"Dra for å endre fargenes rekkefølge\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvor mye plass fargen tar; 0 gir en hard kant mot nabofargen\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), ps = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sentrum X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Sentrum Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ms = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), hs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <!> <button class=\"ghost action svelte-1n46o8q\" title=\"Ny farge nederst i listen; dra i håndtaket for rekkefølgen\">+ Legg til farge</button> <!> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Gjelder selve gradienten - uavhengig av Animasjon-valget nederst, som gjelder innholdet\" class=\"svelte-1n46o8q\">Bevegelse <!></label>", 1), gs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), _s = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), vs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ys = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), bs = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), xs = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), Ss = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), Cs = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), ws = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Ts = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Es = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), Ds = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label>"), Os = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), ks = /* @__PURE__ */ K("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), As = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), js = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ms = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), Ns = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), Ps = /* @__PURE__ */ K("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Fs = /* @__PURE__ */ K("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Is = /* @__PURE__ */ K("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), Ls = /* @__PURE__ */ K("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), Rs = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), zs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), Bs = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), Vs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), Hs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), Us = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ws = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Gs = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Ks = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), qs = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Js = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Ys = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Xs = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Zs = /* @__PURE__ */ K("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Qs = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), $s = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), ec = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), tc = /* @__PURE__ */ K("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), nc = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>  <!>", 1);
function rc(e, t) {
	He(t, !0);
	let n = (e) => {
		let t = /* @__PURE__ */ P(() => W(k).props.boxStyle ?? {});
		var n = Ja(), r = B(n), i = V(z(r));
		{
			let e = /* @__PURE__ */ P(() => W(t).shadow ?? "");
			$(i, {
				get value() {
					return W(e);
				},
				options: [
					["", "Ingen"],
					["soft", "Myk"],
					["strong", "Tydelig"]
				],
				onchange: (e) => Pe({ shadow: e || null })
			});
		}
		j(r);
		var a = V(r, 2), o = V(z(a));
		{
			let e = /* @__PURE__ */ P(() => W(t).border === "none" ? "none" : W(t).border ? "custom" : "");
			$(o, {
				get value() {
					return W(e);
				},
				options: [
					["", "Temaets (tynn)"],
					["none", "Ingen"],
					["custom", "Egen farge"]
				],
				onchange: (e) => Pe({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		j(a);
		var s = V(a, 2), c = (e) => {
			var n = qa(), r = B(n), i = V(z(r));
			{
				let e = /* @__PURE__ */ P(() => W(t).border.color ?? "accent"), n = /* @__PURE__ */ P(wt);
				Ti(i, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(n);
					},
					label: "Kantlinjens farge",
					onchange: (e) => Pe({ border: {
						...W(t).border,
						color: e
					} })
				});
			}
			j(r);
			var a = V(r, 2), o = V(z(a)), s = z(o);
			j(o), j(a);
			var c = V(a, 2);
			Z(c), H(() => {
				J(s, `${W(t).border.width ?? 1 ?? ""} px`), Q(c, W(t).border.width ?? 1);
			}), G("input", c, (e) => Pe({ border: {
				...W(t).border,
				width: Number(e.target.value)
			} })), q(e, n);
		};
		Y(s, (e) => {
			W(t).border && W(t).border !== "none" && e(c);
		});
		var l = V(s, 2), u = z(l);
		Z(u), M(), j(l), H((e) => ri(u, e), [() => !!W(t).glass]), G("change", u, (e) => Pe({ glass: e.target.checked || null })), q(e, n);
	}, r = (e) => {
		var t = yo(), r = B(t), i = (e) => {
			var t = Xa(), r = B(t), i = V(z(r));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.align ?? "left");
				$(i, {
					get value() {
						return W(e);
					},
					options: [
						["left", "Venstre"],
						["center", "Midtstilt"],
						["right", "Høyre"]
					],
					onchange: (e) => N("align", e)
				});
			}
			j(r);
			var a = V(r, 2), o = z(a);
			Z(o), M(), j(a);
			var s = V(a, 2), c = (e) => {
				n(e);
			};
			Y(s, (e) => {
				W(k).props.box && e(c);
			});
			var l = V(s, 2), u = V(z(l));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv fra tema"], ...Wa.map(([e, t]) => [t, e])]);
				$(u, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => N("font", e || null)
				});
			}
			j(l);
			var d = V(l, 4), f = z(d);
			let p;
			var h = V(f, 2);
			zr(h, 17, () => Ga, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(W(t), 2));
				let r = () => W(n)[0], i = () => W(n)[1];
				var a = Ya();
				let o;
				var s = z(a, !0);
				j(a), H(() => {
					o = Xr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: W(k).props.size === i() }), ii(a, "title", `${i() ?? ""} px`), J(s, r());
				}), G("click", a, () => N("size", i())), q(e, a);
			});
			var g = V(h, 2);
			Z(g), j(d);
			var _ = V(d, 2), v = V(z(_)), y = z(v, !0);
			j(v), j(_);
			var b = V(_, 2), x = z(b);
			let S;
			var C = V(x, 2);
			Z(C), j(b);
			var ee = V(b, 2), w = V(z(ee)), T = z(w, !0);
			j(w), j(ee);
			var E = V(ee, 2), D = z(E);
			let te;
			var ne = V(D, 2);
			Z(ne), j(E), M(2), H((e) => {
				ri(o, e), p = Xr(f, 1, "tbtn svelte-1n46o8q", null, p, { active: !W(k).props.size }), Q(g, W(k).props.size ?? ""), J(y, W(k).props.lineHeight ? `${W(k).props.lineHeight}` : "Arv"), S = Xr(x, 1, "tbtn svelte-1n46o8q", null, S, { active: !W(k).props.lineHeight }), Q(C, W(k).props.lineHeight ?? 1.6), J(T, typeof W(k).props.letterSpacing == "number" && W(k).props.letterSpacing !== 0 ? `${W(k).props.letterSpacing} px` : "Arv"), te = Xr(D, 1, "tbtn svelte-1n46o8q", null, te, { active: !W(k).props.letterSpacing }), Q(ne, W(k).props.letterSpacing ?? 0);
			}, [() => !!W(k).props.box]), G("change", o, (e) => N("box", e.target.checked)), G("click", f, () => N("size", null)), G("change", g, (e) => N("size", e.target.value ? Number(e.target.value) : null)), G("click", x, () => N("lineHeight", null)), G("input", C, (e) => N("lineHeight", Number(e.target.value))), G("click", D, () => N("letterSpacing", null)), G("input", ne, (e) => N("letterSpacing", Number(e.target.value) || null)), q(e, t);
		}, a = (e) => {
			var t = Qa(), r = B(t), i = z(r);
			Z(i), M(), j(r);
			var a = V(r, 4);
			zr(a, 17, () => W(k).props.items ?? [], Fr, (e, t, n) => {
				var r = Za(), i = z(r);
				Z(i);
				var a = V(i, 2), s = z(a);
				s.disabled = n === 0, X(s, () => o.up, !0), j(s);
				var c = V(s, 2);
				X(c, () => o.down, !0), j(c);
				var l = V(c, 2);
				X(l, () => o.cross, !0), j(l), j(a), j(r), H(() => {
					Q(i, W(t).q), c.disabled = n === (W(k).props.items?.length ?? 0) - 1;
				}), G("change", i, (e) => Fe(n, { q: e.target.value })), G("click", s, () => ze(n, -1)), G("click", c, () => ze(n, 1)), G("click", l, () => Le(n)), q(e, r);
			});
			var s = V(a, 2), c = V(s, 4);
			n(c), H((e) => ri(i, e), [() => !!W(k).props.multi]), G("change", i, (e) => N("multi", e.target.checked)), G("click", s, Ie), q(e, t);
		}, s = (e) => {
			var t = eo(), n = B(t), r = V(z(n));
			Z(r), j(n);
			var i = V(n, 2), a = V(z(i));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...W(D).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				$(a, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						Me(`edit:${W(k).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			j(i);
			var o = V(i, 2), s = (e) => {
				var t = $a();
				Z(t), H(() => Q(t, W(k).props.href === "#" ? "" : W(k).props.href ?? "")), G("change", t, (e) => N("href", e.target.value || null)), q(e, t);
			};
			Y(o, (e) => {
				W(k).props.page || e(s);
			});
			var c = V(o, 2);
			$(V(z(c)), {
				get value() {
					return W(k).props.style;
				},
				options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
				onchange: (e) => N("style", e)
			}), j(c), H(() => Q(r, W(k).props.label)), G("change", r, (e) => N("label", e.target.value)), q(e, t);
		}, c = (e) => {
			var t = no(), n = B(t), r = V(z(n));
			j(n);
			var i = V(n, 2), a = V(z(i));
			Z(a), j(i);
			var o = V(i, 2), s = V(z(o));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.fit ?? "cover");
				$(s, {
					get value() {
						return W(e);
					},
					options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
					onchange: (e) => N("fit", e)
				});
			}
			j(o);
			var c = V(o, 2), l = V(z(c));
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
					onchange: (e) => N("radius", e || null)
				});
			}
			j(c);
			var u = V(c, 2), d = V(z(u));
			Z(d), j(u);
			var f = V(u, 2), p = (e) => {
				var t = to(), n = z(t);
				Z(n), M(), j(t), H((e) => ri(n, e), [() => !!W(k).props.lightbox]), G("change", n, (e) => N("lightbox", e.target.checked)), q(e, t);
			};
			Y(f, (e) => {
				W(k).props.href || e(p);
			});
			var m = V(f, 2), h = V(z(m)), g = z(h);
			j(h), j(m);
			var _ = V(m, 2);
			Z(_);
			var v = V(_, 2), y = V(z(v)), b = z(y);
			j(y), j(v);
			var x = V(v, 2);
			Z(x);
			var S = V(x, 2), C = V(z(S)), ee = z(C);
			j(C), j(S);
			var w = V(S, 2);
			Z(w);
			var T = V(w, 2), E = V(z(T)), D = z(E);
			j(E), j(T);
			var te = V(T, 2);
			Z(te);
			var ne = V(te, 2), re = V(z(ne)), ie = z(re);
			j(re), j(ne);
			var O = V(ne, 2);
			Z(O);
			var ae = V(O, 2), oe = V(z(ae)), se = z(oe);
			j(oe), j(ae);
			var ce = V(ae, 2);
			Z(ce);
			var le = V(ce, 2);
			H((e, t, n, r, i, o) => {
				Q(a, W(k).props.alt ?? ""), Q(d, W(k).props.href ?? ""), J(g, `${e ?? ""}%`), Q(_, W(k).props.x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(k).props.y ?? .5), J(ee, `${n ?? ""}x`), Q(w, W(k).props.zoom ?? 1), J(D, `${r ?? ""}%`), Q(te, W(k).props.brightness ?? 1), J(ie, `${i ?? ""}%`), Q(O, W(k).props.contrast ?? 1), J(se, `${o ?? ""}%`), Q(ce, W(k).props.saturate ?? 1);
			}, [
				() => Math.round((W(k).props.x ?? .5) * 100),
				() => Math.round((W(k).props.y ?? .5) * 100),
				() => (W(k).props.zoom ?? 1).toFixed(2),
				() => Math.round((W(k).props.brightness ?? 1) * 100),
				() => Math.round((W(k).props.contrast ?? 1) * 100),
				() => Math.round((W(k).props.saturate ?? 1) * 100)
			]), G("change", r, Ve), G("change", a, (e) => N("alt", e.target.value)), G("change", d, (e) => N("href", e.target.value || null)), G("input", _, (e) => N("x", Number(e.target.value))), G("input", x, (e) => N("y", Number(e.target.value))), G("input", w, (e) => N("zoom", Number(e.target.value))), G("input", te, (e) => N("brightness", Number(e.target.value))), G("input", O, (e) => N("contrast", Number(e.target.value))), G("input", ce, (e) => N("saturate", Number(e.target.value))), G("click", le, () => Me(`edit:${W(k).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), q(e, t);
		}, l = (e) => {
			var t = ro(), n = V(B(t), 2);
			Z(n);
			var r = V(n, 2), i = V(z(r));
			Z(i), j(r), M(2), H(() => {
				Q(n, W(k).props.url ?? ""), Q(i, W(k).props.title ?? "");
			}), G("change", n, (e) => N("url", e.target.value)), G("change", i, (e) => N("title", e.target.value)), q(e, t);
		}, u = (e) => {
			var t = so(), n = B(t), r = V(z(n)), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => W(k).props.glyph ?? "★"), t = /* @__PURE__ */ P(() => W(k).props.icon ?? null), n = /* @__PURE__ */ P(() => W(k).props.image ?? null);
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
					onpick: (e) => Me(`edit:${W(k).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => Me(`edit:${W(k).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => N("image", e)
				});
			}
			var a = V(i, 2), o = (e) => {
				var t = io();
				Z(t), H(() => Q(t, W(k).props.glyph ?? "")), G("change", t, (e) => N("glyph", e.target.value || "★")), q(e, t);
			}, s = (e) => {
				var t = ao();
				G("click", t, () => N("icon", null)), q(e, t);
			};
			Y(a, (e) => {
				W(k).props.icon ? e(s, -1) : e(o);
			}), j(r), j(n);
			var c = V(n, 2), l = (e) => {
				var t = oo(), n = B(t), r = z(n), i = V(r, 2);
				j(n), M(2), H(() => ii(r, "src", W(k).props.image)), G("click", i, () => N("image", null)), q(e, t);
			};
			Y(c, (e) => {
				W(k).props.image && e(l);
			});
			var u = V(c, 2), d = V(z(u));
			Z(d), j(u);
			var f = V(u, 2), p = V(z(f));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.color ?? "accent"), t = /* @__PURE__ */ P(wt);
				Ti(p, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(t);
					},
					onchange: (e) => N("color", e)
				});
			}
			j(f), M(2), H(() => Q(d, W(k).props.size ?? 48)), G("change", d, (e) => N("size", Number(e.target.value))), q(e, t);
		}, d = (e) => {
			var t = co(), n = B(t), r = V(z(n));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...W(Pn).map((e) => [e, W(Fn)[e]?.name ?? e])]);
				$(r, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => N("collection", e || null)
				});
			}
			j(n);
			var i = V(n, 2), a = V(z(i));
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
					onchange: (e) => N("view", e)
				});
			}
			j(i);
			var o = V(i, 2), s = V(z(o));
			Z(s), j(o);
			var c = V(o, 2), l = z(c);
			Z(l), M(), j(c), M(2), H(() => {
				Q(s, W(k).props.limit ?? 6), ri(l, W(k).props.newestFirst !== !1);
			}), G("change", s, (e) => N("limit", Number(e.target.value))), G("change", l, (e) => N("newestFirst", e.target.checked)), q(e, t);
		}, f = (e) => {
			var t = po(), n = B(t), r = V(z(n));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.view ?? "grid");
				$(r, {
					get value() {
						return W(e);
					},
					options: [
						["grid", "Rutenett"],
						["carousel", "Karusell"],
						["slides", "Lysbilde (bytter automatisk)"]
					],
					onchange: (e) => N("view", e)
				});
			}
			j(n);
			var i = V(n, 2), a = (e) => {
				var t = lo(), n = B(t), r = V(z(n));
				Z(r), j(n);
				var i = V(n, 2), a = V(z(i)), o = z(a);
				j(a), j(i);
				var s = V(i, 2);
				Z(s), H(() => {
					Q(r, W(k).props.columns ?? 3), J(o, `${W(k).props.gap ?? 12 ?? ""} px`), Q(s, W(k).props.gap ?? 12);
				}), G("change", r, (e) => N("columns", Number(e.target.value))), G("input", s, (e) => N("gap", Number(e.target.value))), q(e, t);
			};
			Y(i, (e) => {
				(W(k).props.view ?? "grid") === "grid" && e(a);
			});
			var s = V(i, 2), c = (e) => {
				var t = uo(), n = V(z(t));
				Z(n), j(t), H(() => Q(n, W(k).props.interval ?? 5)), G("change", n, (e) => N("interval", Number(e.target.value))), q(e, t);
			};
			Y(s, (e) => {
				W(k).props.view === "slides" && e(c);
			});
			var l = V(s, 2), u = V(z(l));
			{
				let e = /* @__PURE__ */ P(() => W(k).props.radius ?? "");
				$(u, {
					get value() {
						return W(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => N("radius", e || null)
				});
			}
			j(l);
			var d = V(l, 2), f = z(d);
			Z(f), M(), j(d);
			var p = V(d, 4), m = V(z(p));
			j(p), zr(V(p, 2), 17, () => W(k).props.images ?? [], Fr, (e, t, n) => {
				var r = fo(), i = z(r), a = z(i), s = V(a, 2), c = z(s);
				c.disabled = n === 0, X(c, () => o.up, !0), j(c);
				var l = V(c, 2);
				X(l, () => o.down, !0), j(l);
				var u = V(l, 2);
				X(u, () => o.cross, !0), j(u), j(s), j(i);
				var d = V(i, 2), f = V(z(d));
				Z(f), j(d);
				var p = V(d, 2), m = V(z(p));
				Z(m), j(p), j(r), H(() => {
					ii(a, "src", W(t).src), l.disabled = n === W(k).props.images.length - 1, Q(f, W(t).alt ?? ""), Q(m, W(t).href ?? "");
				}), G("click", c, () => Di(n, -1)), G("click", l, () => Di(n, 1)), G("click", u, () => Oi(n)), G("change", f, (e) => Mi(n, "alt", e.target.value)), G("change", m, (e) => Mi(n, "href", e.target.value || null)), q(e, r);
			}), M(2), H(() => ri(f, W(k).props.lightbox !== !1)), G("change", f, (e) => N("lightbox", e.target.checked)), G("change", m, wi), q(e, t);
		}, p = (e) => {
			var t = mo(), n = B(t);
			$(V(z(n)), {
				get value() {
					return W(k).props.kind;
				},
				get options() {
					return Ge;
				},
				onchange: (e) => N("kind", e)
			}), j(n);
			var r = V(n, 2);
			$(V(z(r)), {
				get value() {
					return W(k).props.color;
				},
				get options() {
					return Ke;
				},
				onchange: (e) => N("color", e)
			}), j(r);
			var i = V(r, 2), a = V(z(i));
			Z(a), j(i);
			var o = V(i, 2), s = z(o);
			Z(s), M(), j(o), H((e) => {
				Q(a, W(k).props.thickness), ri(s, e);
			}, [() => !!W(k).props.fill]), G("change", a, (e) => N("thickness", Number(e.target.value))), G("change", s, (e) => N("fill", e.target.checked ? W(k).props.color : null)), q(e, t);
		};
		Y(r, (e) => {
			W(k).type === "text" ? e(i) : W(k).type === "faq" ? e(a, 1) : W(k).type === "button" ? e(s, 2) : W(k).type === "image" ? e(c, 3) : W(k).type === "video" ? e(l, 4) : W(k).type === "icon" ? e(u, 5) : W(k).type === "samling" ? e(d, 6) : W(k).type === "galleri" ? e(f, 7) : W(k).type === "shape" && e(p, 8);
		});
		var h = V(r, 4), g = V(z(h));
		{
			let e = /* @__PURE__ */ P(() => W(k).animation?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(Ua).map(([e, t]) => [e, t.label])]);
			$(g, {
				get value() {
					return W(e);
				},
				get options() {
					return W(t);
				},
				onchange: (e) => Et(e || null)
			});
		}
		j(h);
		var _ = V(h, 2), v = (e) => {
			var t = ho(), n = B(t), r = V(z(n));
			Z(r), j(n);
			var i = V(n, 2), a = V(z(i));
			Z(a), j(i), M(2), H(() => {
				Q(r, W(k).animation.props.duration), Q(a, W(k).animation.props.delay);
			}), G("change", r, (e) => F("duration", Number(e.target.value))), G("change", a, (e) => F("delay", Number(e.target.value))), q(e, t);
		};
		Y(_, (e) => {
			W(k).animation && Ua[W(k).animation.type]?.entrance && e(v);
		});
		var y = V(_, 2), b = (e) => {
			var t = _o(), n = V(B(t), 2), r = z(n);
			Z(r), M(), j(n);
			var i = V(n, 2), a = (e) => {
				var t = go(), n = B(t), r = V(z(n));
				Z(r), j(n);
				var i = V(n, 2), a = V(z(i));
				{
					let e = /* @__PURE__ */ P(() => W(k).sticky.until ?? ""), t = /* @__PURE__ */ P(Ae);
					$(a, {
						get value() {
							return W(e);
						},
						get options() {
							return W(t);
						},
						onchange: (e) => Me(`edit:${W(k).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				j(i), H(() => Q(r, W(k).sticky.offset ?? 16)), G("change", r, (e) => Me(`edit:${W(k).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), q(e, t);
			};
			Y(i, (e) => {
				W(k).sticky && e(a);
			}), H((e) => ri(r, e), [() => !!W(k).sticky]), G("change", r, (e) => Me(`edit:${W(k).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), q(e, t);
		};
		Y(y, (e) => {
			W(x) === "desktop" && e(b);
		});
		var S = V(y, 4), C = V(z(S), 2), ee = V(z(C), 2), w = (e) => {
			var t = vo(), n = z(t), r = V(z(n));
			Z(r), j(n);
			var i = V(n, 2), a = V(z(i));
			Z(a), j(i);
			var o = V(i, 2), s = V(z(o));
			Z(s), j(o);
			var c = V(o, 2), l = V(z(c));
			Z(l), j(c);
			var u = V(c, 2), d = V(z(u));
			Z(d), j(u);
			var f = V(u, 2), p = V(z(f));
			Z(p), j(f), j(t), H(() => {
				Q(r, W(k).frame.x), Q(a, W(k).frame.y), Q(s, W(k).frame.w), Q(l, W(k).frame.h), Q(d, W(k).frame.z ?? 1), Q(p, W(k).frame.rot ?? 0);
			}), G("change", r, (e) => Ne("x", Number(e.target.value))), G("change", a, (e) => Ne("y", Number(e.target.value))), G("change", s, (e) => Ne("w", Number(e.target.value))), G("change", l, (e) => Ne("h", Number(e.target.value))), G("change", d, (e) => Ne("z", Number(e.target.value))), G("change", p, (e) => Ne("rot", Number(e.target.value))), q(e, t);
		};
		Y(ee, (e) => {
			W(x) === "desktop" && e(w);
		});
		var T = V(ee, 2), E = z(T);
		Z(E), M(), j(T), j(C), j(S), H(() => ri(E, W(k).decor)), G("change", E, (e) => Be(e.target.checked)), q(e, t);
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
	], c = /* @__PURE__ */ I(en(localStorage.getItem("urd-admin-theme") ?? "graa"));
	yn(() => {
		document.documentElement.dataset.adminTheme = W(c), localStorage.setItem("urd-admin-theme", W(c));
	});
	let l = /* @__PURE__ */ I(null), u = /* @__PURE__ */ I(null), d = /* @__PURE__ */ I(!1), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I("info"), h = 0;
	function g(e, t = "info") {
		L(f, e, !0), L(p, t, !0);
		let n = ++h;
		t === "ok" && setTimeout(() => {
			h === n && (L(f, ""), L(p, "info"));
		}, 8e3);
	}
	let _ = /* @__PURE__ */ I(null), v = /* @__PURE__ */ I(null), y = /* @__PURE__ */ I(en({
		size: 16,
		snap: !0
	})), b = /* @__PURE__ */ I(!0), x = /* @__PURE__ */ I("desktop");
	yn(() => {
		let e = () => E?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
		let e = W(x);
		E?.sendViewport(e);
	});
	let S = /* @__PURE__ */ I(0);
	function C() {
		L(S, w?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ee(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, C(), E?.sendAttention(e.id, !0));
	}
	let w = null, T = null, E = null, D = /* @__PURE__ */ I(null);
	function te() {
		L(D, T.data, !0), T.replace(W(D));
	}
	function ne() {
		E?.sendSite(Re(W(D)));
	}
	let re = /* @__PURE__ */ new Set(), ie = () => W(D).pages.find((e) => e.id === W(u));
	function O() {
		let e = W(D)?.pages?.some((e) => !re.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Mn?.hasDraft() || Object.values(Nn).some((e) => e.hasDraft());
		L(d, e || w?.hasDraft() && !re.has(W(u)) || T?.hasDraft() || Zn?.hasDraft() || t || !1, !0);
	}
	let ae = [], oe = [], se = null;
	function ce() {
		return JSON.stringify({
			pageId: W(u),
			page: w.data,
			site: T.data
		});
	}
	function le(e) {
		e === se && (e.startsWith("edit:") || e.startsWith("grid:")) || (ae.push(ce()), ae.length > 50 && ae.shift(), oe.length = 0, se = e);
	}
	function ue(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (T.replace(r), te(), T.save(), L(y, {
			snap: !0,
			...W(D).grid
		}, !0), ne(), t && t !== W(u) && W(D).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), Jt(t, { keepHistory: !0 }), O();
			return;
		}
		w.replace(n), w.save(), O(), C(), Oe(), Qe(w.data.sections.find((e) => e.id === W(qe))), W(D).pages.some((e) => e.id === W(u)) ? E?.sendPage(W(u), w.data) : Jt(W(D).pages[0].id, { keepHistory: !0 });
	}
	function de() {
		ae.length && (oe.push(ce()), ue(ae.pop()), se = null, g("Angret"));
	}
	function fe() {
		oe.length && (ae.push(ce()), ue(oe.pop()), se = null, g("Gjentatt"));
	}
	function pe(e) {
		if (e.key === "Escape" && W(ke)) {
			L(ke, null);
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
			].includes(t.type)) || !W(k) || W(x) === "mobile") return;
			e.preventDefault(), E?.sendDuplicate();
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
		L(l, ua(await (await fetch("/content/site.json")).json()), !0), T = mi("urd-draft-site", () => W(l)), T.replace(ua(T.data)), T.save(), te(), L(y, {
			snap: !0,
			...W(D).grid
		}, !0), await Jt(new URLSearchParams(location.search).get("page") ?? W(D).pages[0].id), await lr(), await Bn(), await Pt(), W(v) && It(), (W(D).site.setup === !0 || W(D).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (L(ye, W(D).site.title, !0), L(be, W(D).theme.tokens.color.accent, !0), L(xe, W(D).theme.tokens.color.bg, !0), L(ve, !0));
	}
	let he = /* @__PURE__ */ I(null);
	function ge({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			L(he, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function _e(e) {
		W(he)?.resolve(e), L(he, null);
	}
	let ve = /* @__PURE__ */ I(!1), ye = /* @__PURE__ */ I(""), be = /* @__PURE__ */ I("#7c5cff"), xe = /* @__PURE__ */ I("#0b0e14");
	function Se() {
		localStorage.setItem("urd-setup-done", "1"), L(ve, !1);
	}
	function Ce() {
		let e = W(ye).trim();
		e && (R("setup", () => {
			W(D).site.title = e, W(D).nav.logo = {
				type: "text",
				value: e
			}, W(D).theme.tokens.color.accent = W(be), W(D).theme.tokens.color.bg = W(xe), delete W(D).site.setup;
		}), Se(), g("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let we = /* @__PURE__ */ I(null), Te = [
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
	function Ee(e) {
		L(we, W(we) === e ? null : e, !0), E?.sendShowGrid(W(we) === "Grid"), W(we) === "Historikk" && Vt();
	}
	let k = /* @__PURE__ */ I(null);
	function De(e, t) {
		let n = w?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Oe() {
		if (!W(k)) return;
		let { block: e } = De(W(k).sectionId, W(k).blockId);
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
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function A(e) {
		if (!e.blockId) {
			L(k, null), L(ke, null);
			return;
		}
		L(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Oe();
	}
	let ke = /* @__PURE__ */ I(null);
	function Ae() {
		let e = w?.data.sections ?? [], t = e.findIndex((e) => e.id === W(k)?.sectionId);
		return [["", "Når egen seksjon er forbi"], ...e.slice(t + 1).map((e, n) => [e.id, `Ved seksjon ${t + 2 + n}`])];
	}
	function je(e) {
		if (A(e), !W(k)) return;
		let t = W(_)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + e.rect.top), Math.max(8, r));
		L(ke, {
			left: n,
			top: i
		}, !0);
	}
	function Me(e, t) {
		let { section: n, block: r } = De(W(k)?.sectionId, W(k)?.blockId);
		r && (le(e), t(r, n), ee(n, "blokk-endret"), w.save(), O(), E?.sendSection(W(u), n), Oe());
	}
	function N(e, t) {
		Me(`edit:${W(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Ne(e, t) {
		Number.isFinite(t) && Me(`edit:frame-${W(k).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Pe(e) {
		Me(`edit:${W(k).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Fe(e, t) {
		Me(`edit:${W(k).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ie() {
		Me("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: "Nytt spørsmål?",
				a: "<p>Skriv svaret her.</p>"
			});
		});
	}
	function Le(e) {
		Me("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function ze(e, t) {
		let n = e + t;
		Me("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Be(e) {
		Me("decor", (t) => {
			t.decor = e;
		});
	}
	async function Ve(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			Me(`edit:${W(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ai(t.name).replaceAll("-", " ");
			});
		} catch {
			g("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let We = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri",
		faq: "FAQ"
	}, Ge = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Ke = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], qe = /* @__PURE__ */ I(null), Je = /* @__PURE__ */ I(null), Ye = /* @__PURE__ */ I(""), Xe = /* @__PURE__ */ I(en([])), Ze = /* @__PURE__ */ I(null);
	function Qe(e) {
		L(Je, e?.grid ? { ...e.grid } : null, !0), L(Ye, e?.size?.minHeight ?? "", !0), L(Xe, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(Ze, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function $e(e) {
		L(qe, e.sectionId, !0), Qe(w?.data.sections.find((t) => t.id === e.sectionId));
	}
	function et(e, t) {
		let n = w.data.sections.find((e) => e.id === W(qe));
		n && (le(e), t(n), w.save(), O(), E?.sendSection(W(u), n), Qe(n));
	}
	let tt = /* @__PURE__ */ I("color");
	function nt(e) {
		et("bg", (t) => {
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
	function rt(e) {
		et("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function at(e, t) {
		let n = e + t;
		et("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function ot(e, t, n) {
		et(`edit:bg-${W(qe)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function st(e) {
		if ((e.version ?? 1) >= Na.version) return e.props;
		let t = Re(e);
		return aa({
			type: "gradient",
			version: t.version ?? 1,
			props: t.props
		}, Na).props;
	}
	function ct(e, t, n) {
		et(t, (t) => {
			let r = t.background.layers[e];
			if ((r.version ?? 1) < Na.version) {
				let e = aa({
					type: "gradient",
					version: r.version ?? 1,
					props: Re(r.props)
				}, Na);
				if (!e.ok) return;
				r.props = e.props, r.version = e.version;
			}
			n(r.props);
		});
	}
	function lt(e, t, n) {
		ct(e, `edit:bg-${W(qe)}-${e}-${t}`, (e) => {
			e[t] = n;
		});
	}
	let ut = {
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
	function dt(e, t) {
		ct(e, "bg", (e) => {
			e.kind = t, ut[t].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ft(e, t, n) {
		ct(e, `edit:bg-${W(qe)}-${e}-stop${t}`, (e) => {
			e.stops[t] = {
				...e.stops[t],
				...n
			};
		});
	}
	function pt(e) {
		ct(e, "bg", (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function mt(e, t) {
		ct(e, "bg", (e) => {
			e.stops.length > 2 && e.stops.splice(t, 1);
		});
	}
	function ht(e, t, n) {
		ct(e, "bg", (e) => {
			let [r] = e.stops.splice(t, 1);
			e.stops.splice(n, 0, r);
		});
	}
	let gt = /* @__PURE__ */ I(null);
	function _t(e, t, n) {
		if (e.button !== 0) return;
		e.preventDefault();
		let r = e.currentTarget.closest(".bg-layer"), i = e.currentTarget.closest(".grad-stop");
		L(gt, {
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
			L(gt, {
				...W(gt),
				insert: n
			}, !0);
		}, l = () => {
			window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", l), s.remove();
			let e = W(gt);
			if (L(gt, null), !e) return;
			let t = e.insert > e.from ? e.insert - 1 : e.insert;
			t !== e.from && ht(e.layer, e.from, t);
		};
		window.addEventListener("pointermove", c), window.addEventListener("pointerup", l);
	}
	function vt(e, t) {
		et("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: a[t].version ?? 1,
				props: a[t].defaults()
			});
		});
	}
	async function yt(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			ot(e, "src", (await ki(n)).dataUrl);
		} catch {
			g("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function bt(e, t) {
		let n = [...t.target.files ?? []];
		if (t.target.value = "", !n.length) return;
		g("Komprimerer bildene…");
		let { images: r, failed: i, big: a } = await Si(n);
		r.length && et("bg", (t) => {
			let n = t.background.layers[e].props;
			n.images ??= [], n.images.push(...r.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Ci(r.length, i, a);
	}
	function xt(e, t, n) {
		et("bg", (r) => {
			let i = r.background.layers[e].props.images, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function St(e, t) {
		et("bg", (n) => {
			n.background.layers[e].props.images.splice(t, 1);
		});
	}
	function Ct(e, t, n, r) {
		et(`edit:bgg-${W(qe)}-${e}-${t}-${n}`, (i) => {
			i.background.layers[e].props.images[t][n] = r;
		});
	}
	let wt = () => Object.entries(W(D)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function Tt(e) {
		return {
			type: e,
			version: Ua[e].version,
			props: Ua[e].defaults()
		};
	}
	function Et(e) {
		Me(`edit:anim-${W(k).blockId}`, (t) => {
			t.animation = e ? Tt(e) : null;
		}), W(k) && E?.sendDemoAnim(W(k).sectionId, W(k).blockId);
	}
	function F(e, t) {
		Number.isFinite(t) && (Me(`edit:anim-${W(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(k) && E?.sendDemoAnim(W(k).sectionId, W(k).blockId));
	}
	function Dt(e) {
		et("section-anim", (t) => {
			t.animation = e ? Tt(e) : null;
		}), E?.sendDemoAnim(W(qe));
	}
	function Ot(e, t) {
		Number.isFinite(t) && (et("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), E?.sendDemoAnim(W(qe)));
	}
	function kt(e) {
		let t = w.data.sections.find((e) => e.id === W(qe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		le("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(Ye, r, !0), w.save(), O(), E?.sendSection(W(u), t);
	}
	function At() {
		return w.data.sections.find((e) => e.id === W(qe)) ?? w.data.sections[0];
	}
	function jt(e) {
		let t = w.data.sections.find((e) => e.id === W(qe));
		t && (le("grid:section"), t.grid = e ? { ...T.data.grid } : null, L(Je, t.grid ? { ...t.grid } : null, !0), w.save(), O(), E?.sendSection(W(u), t), W(we) === "Grid" && E?.sendShowGrid(!0));
	}
	function Mt(e, t) {
		let n = w.data.sections.find((e) => e.id === W(qe));
		n?.grid && (le("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, L(Je, { ...n.grid }, !0), w.save(), O(), E?.sendSection(W(u), n), W(we) === "Grid" && E?.sendShowGrid(!0));
	}
	function Nt(e, t) {
		le("grid:site"), L(y, {
			...W(y),
			[e]: t
		}, !0), T.data.grid = {
			...T.data.grid,
			[e]: t
		}, T.save(), O(), ne(), W(we) === "Grid" && E?.sendShowGrid(!0);
	}
	async function Pt() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(v, await e.json(), !0) : e.status !== 503 && L(v, null);
		} catch {
			L(v, null);
		}
	}
	let Ft = null;
	async function It() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Ft = (await e.json()).head ?? null);
		} catch {}
	}
	async function Lt(e) {
		if (!Ft) return await It(), {
			ok: await ge({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: Ft
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Ft}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Ft) return {
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
	let Rt = /* @__PURE__ */ I(null), zt = /* @__PURE__ */ I(""), Bt = /* @__PURE__ */ I(!1);
	async function Vt() {
		L(zt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(Rt, (await e.json()).commits, !0) : e.status === 401 ? (L(Rt, [], !0), L(zt, "Logg inn med GitHub for å se historikken.")) : (L(Rt, [], !0), L(zt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(Rt, [], !0), L(zt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let Ht = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), Ut = !1;
	async function Wt() {
		let e = W(Rt)?.[0];
		if (!(!e || W(Bt)) && await ge({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			L(Bt, !0), g("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Ft = e : It(), Ut = !0, g("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), Gt();
				} else t.status === 409 ? g("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : g((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				g("Kunne ikke nå publiseringslaget", "error");
			}
			L(Bt, !1), Vt();
		}
	}
	async function Gt() {
		let e = ["/content/site.json", ...W(D).pages.map((e) => `/${e.file}`)], t = async () => {
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
				g("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		g("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let Kt = null;
	function qt(e) {
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
	async function Jt(e, { keepHistory: t = !1 } = {}) {
		L(u, e, !0), Kt = (async () => {
			let n = ie(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = da(await e.json(), T.data));
			} catch {}
			r ? re.delete(e) : r = qt(n), w = mi(`urd-draft-${e}`, () => r), w.replace(da(w.data, T.data)), w.save(), t || (se = null), L(qe, null), L(Je, null), O(), C(), L(f, "");
		})(), await Kt;
	}
	function Yt() {
		E?.destroy(), E = $i(W(_), {
			onEdit: Kr,
			onMove: qr,
			onGrow: Jr,
			onDelete: li,
			onAddSection: ti,
			onMoveSection: ni,
			onDeleteSection: ai,
			onSectionSize: oi,
			onUndo: (e) => e.redo ? fe() : de(),
			onSelectSection: $e,
			onSelectBlock: A,
			onBlockMenu: je,
			onReady: Xt,
			onNavigate: $t,
			onAddBlock: (e) => hi(e.sectionId, e.block),
			onAddBlocks: (e) => gi(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: bi,
			onMoveBlockSection: si,
			onMobileManual: Yr,
			onMobileAuto: Zr,
			onReviewDone: $r,
			onBlockFlag: ei,
			onCollectionEdit: Wn,
			onPluginBlocks: (e) => {
				L(vi, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => R("edit:nav-width", () => {
				W(D).nav.style ??= {}, W(D).nav.style.width = e.width;
			})
		});
	}
	async function Xt() {
		await Kt, await $n, E?.sendPlugins(Re(W(er))?.enabled ?? []), E?.sendViewport(W(x)), Hn(), T.hasDraft() && ne();
		let e = !W(l).pages.some((e) => e.id === W(u));
		(w.hasDraft() || e) && E?.sendPage(W(u), w.data), W(b) || E?.sendChrome(!1), W(we) === "Grid" && E?.sendShowGrid(!0), W(Zt) && E?.sendShowGuides(!0);
	}
	let Zt = /* @__PURE__ */ I(localStorage.getItem("urd-guides") === "1");
	function Qt() {
		L(Zt, !W(Zt)), localStorage.setItem("urd-guides", W(Zt) ? "1" : "0"), E?.sendShowGuides(W(Zt));
	}
	function $t(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(D).pages.find((e) => e.path === t);
		n && n.id !== W(u) && Jt(n.id);
	}
	function R(e, t) {
		le(e), t(), T.save(), O(), ne();
	}
	let nn = /* @__PURE__ */ I(""), rn = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function an(e, t = null) {
		return e ? rn.includes(e) ? `«${e}» er et reservert navn` : W(D).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function on() {
		let e = W(nn).trim(), t = Ai(e), n = an(t);
		if (n) {
			g(n, "error");
			return;
		}
		R("pages", () => {
			W(D).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(D).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(qt({
			id: t,
			title: e
		}))), O(), L(nn, ""), Jt(t);
	}
	function sn(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		R("pages", () => {
			e.title = n;
			for (let t of W(D).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(u) ? (w.data.meta.title = n, w.save(), O(), E?.sendPage(W(u), w.data)) : cn(e, (e) => {
			e.meta.title = n;
		});
	}
	async function cn(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = da(await t.json(), T.data));
		} catch {}
		r ||= qt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), O();
	}
	function ln(e, t) {
		let n = Ai(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = an(n, e.id);
		if (r) {
			g(r, "error");
			return;
		}
		R("pages", () => {
			e.path = `/${n}`;
		});
	}
	function un(e) {
		e.path !== "/" && (R("pages", () => {
			W(D).pages = W(D).pages.filter((t) => t.id !== e.id), W(D).nav.items = W(D).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of W(D).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			W(D).nav.items = W(D).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === W(u) && Jt(W(D).pages[0].id), g("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function dn(e) {
		R("edit:nav-logo", () => {
			W(D).nav.logo = {
				type: "text",
				value: "",
				...W(D).nav.logo,
				...e
			};
		});
	}
	function fn(e) {
		R("nav", () => {
			W(D).nav.logo ??= {
				type: "text",
				value: W(D).site.title
			};
			let t = W(D).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(D).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(D).site.title), delete t.image), t.type = e;
		});
	}
	async function pn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			R("nav", () => {
				let t = W(D).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			g("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let mn = /* @__PURE__ */ I(null);
	function hn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			L(mn, String(n.result), !0);
		}, n.onerror = () => g("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function gn(e) {
		R("edit:site-icon", () => {
			W(D).site.icon = e;
		}), L(mn, null);
	}
	function _n() {
		R("edit:site-icon", () => {
			delete W(D).site.icon;
		});
	}
	let vn = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!W(D)?.site) return;
		let e = W(D).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			vn.test(e) && (t.href = e);
		}
	});
	function bn(e) {
		R("nav", () => {
			W(D).nav.layout = e;
		});
	}
	function xn(e, t) {
		R(`edit:nav-style-${e}`, () => {
			W(D).nav.style ??= {}, t === void 0 ? delete W(D).nav.style[e] : W(D).nav.style[e] = t;
		});
	}
	let Sn = /* @__PURE__ */ P(() => W(D)?.nav?.variant === "side-left" || W(D)?.nav?.variant === "side-right"), Cn = /* @__PURE__ */ P(() => W(D)?.nav?.variant === "floating" || W(D)?.nav?.variant === "floating-square"), wn = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, Tn = /* @__PURE__ */ P(() => wn[W(D)?.nav?.style?.hover] ?? null);
	function En(e) {
		R("nav", () => {
			e === "bar" ? delete W(D).nav.variant : W(D).nav.variant = e;
		});
	}
	function Dn(e) {
		R("nav", () => {
			W(D).nav.style ??= {}, e ? W(D).nav.style.glow = !0 : delete W(D).nav.style.glow;
		});
	}
	function On(e) {
		R("nav", () => {
			W(D).nav.style ??= {}, e ? delete W(D).nav.style.topGap : W(D).nav.style.topGap = !1;
		});
	}
	function kn(e) {
		R("nav", () => {
			W(D).nav.style ??= {}, e === "standard" ? delete W(D).nav.style.hover : W(D).nav.style.hover = e;
		});
	}
	async function An(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			R("nav", () => {
				W(D).nav.style ??= {}, W(D).nav.style.image = e.dataUrl;
			});
		} catch {
			g("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function jn() {
		R("nav", () => {
			W(D).nav.style && delete W(D).nav.style.image;
		});
	}
	let Mn = null, Nn = {}, Pn = /* @__PURE__ */ I(en([])), Fn = /* @__PURE__ */ I(en({})), In = /* @__PURE__ */ I(null), Ln = /* @__PURE__ */ I(""), Rn = /* @__PURE__ */ I("news"), zn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function Bn() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Mn = mi("urd-draft-samlinger", () => e), L(Pn, [...Mn.data.samlinger ?? []], !0);
		for (let e of W(Pn)) {
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
			}, Nn[e] = mi(`urd-draft-samling-${e}`, () => t);
		}
		Vn();
	}
	function Vn(e = !0) {
		let t = {};
		for (let e of W(Pn)) Nn[e] && (t[e] = JSON.parse(JSON.stringify(Nn[e].data)));
		L(Fn, t, !0), e && Hn();
	}
	function Hn() {
		E?.sendCollections(Re(W(Fn)) ?? {});
	}
	function Un(e, t, n = !0) {
		let r = Nn[e];
		r && (t(r.data), r.save(), O(), Vn(n));
	}
	function Wn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || Un(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function U() {
		let e = W(Ln).trim();
		if (!e) return;
		let t = Ai(e);
		if (!t || W(Pn).includes(t)) {
			g(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: W(Rn),
			entries: []
		};
		Nn[t] = mi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), Nn[t].replace(n), Nn[t].save(), Mn.data.samlinger = [...W(Pn), t], Mn.save(), L(Pn, [...W(Pn), t], !0), L(In, t, !0), L(Ln, ""), O(), Vn();
	}
	function Gn(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete Nn[e], Mn.data.samlinger = W(Pn).filter((t) => t !== e), Mn.save(), L(Pn, W(Pn).filter((t) => t !== e), !0), W(In) === e && L(In, null), O(), Vn();
	}
	function Kn(e) {
		Un(e, (e) => {
			e.entries.unshift({
				id: _a("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function qn(e, t, n, r) {
		Un(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Jn(e, t, n) {
		Un(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Yn(e, t) {
		Un(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Xn(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && qn(e, t, "image", (await ki(r)).dataUrl);
	}
	let Zn = null, Qn, $n = new Promise((e) => {
		Qn = e;
	}), er = /* @__PURE__ */ I(null), tr = en({}), nr = /* @__PURE__ */ I("0.0.0"), rr = /* @__PURE__ */ I(""), ir = /* @__PURE__ */ I(""), ar = /* @__PURE__ */ I(en([])), or = /* @__PURE__ */ I("pending"), sr = () => [.../* @__PURE__ */ new Set([...W(er)?.enabled ?? [], ...W(er)?.disabled ?? []])];
	function cr() {
		L(er, JSON.parse(JSON.stringify(Zn.data)), !0);
	}
	async function lr() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		Zn = mi("urd-draft-plugins", () => e), cr();
		try {
			L(nr, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of sr()) fr(e);
		ur(), Qn(), E?.sendPlugins(Re(W(er))?.enabled ?? []);
	}
	async function ur() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				dr();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), L(ar, (t ?? []).filter((e) => !sr().includes(e)), !0);
			for (let e of W(ar)) fr(e);
			L(or, "ok");
		} catch {
			dr();
		}
	}
	function dr() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				L(ar, e.filter((e) => !sr().includes(e)), !0);
				for (let e of W(ar)) fr(e);
				L(or, "ok");
				return;
			}
		} catch {}
		L(or, "unavailable");
	}
	async function fr(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ga(t);
			tr[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ma(W(nr), t.requiresEngine)
			};
		} catch {
			tr[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function pr(e, t) {
		let n = Zn.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Zn.save(), O(), cr(), mr();
	}
	function mr() {
		W(_) && (W(_).src = W(_).src);
	}
	function hr(e) {
		let t = Zn.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Zn.save(), O(), cr(), mr();
	}
	async function gr() {
		L(ir, "");
		let e = W(rr).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			L(ir, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (sr().includes(e)) {
			L(ir, "Pluginen står allerede i listen");
			return;
		}
		if (await fr(e), tr[e].errors.length) {
			L(ir, `Fant ingen gyldig plugin: ${tr[e].errors.join("; ")}`);
			return;
		}
		pr(e, !0), L(rr, "");
	}
	function _r(e) {
		L(ar, W(ar).filter((t) => t !== e), !0), pr(e, !0);
	}
	function yr(e, t) {
		R(e, () => {
			W(D).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(D).footer);
		});
	}
	function xr(e, t) {
		R(`edit:nav-label-${e}`, () => {
			W(D).nav.items[e].label = t;
		});
	}
	function Sr(e, t) {
		R("nav", () => {
			let n = W(D).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Cr(e, t) {
		R(`edit:nav-href-${e}`, () => {
			W(D).nav.items[e].href = t;
		});
	}
	function wr(e, t) {
		let n = e + t, r = W(D).nav.items;
		n < 0 || n >= r.length || R("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Tr(e) {
		R("nav", () => {
			W(D).nav.items.splice(e, 1);
		});
	}
	function Er() {
		R("nav", () => {
			W(D).nav.items.push({
				label: "Lenke",
				page: W(D).pages[0].id
			});
		});
	}
	function Dr(e) {
		R("nav", () => {
			let t = W(D).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: W(D).pages[0].id
			});
		});
	}
	function K(e, t, n) {
		R(`edit:nav-child-label-${e}-${t}`, () => {
			W(D).nav.items[e].children[t].label = n;
		});
	}
	function Or(e, t, n) {
		R("nav", () => {
			let r = W(D).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Ar(e, t, n) {
		R(`edit:nav-child-href-${e}-${t}`, () => {
			W(D).nav.items[e].children[t].href = n;
		});
	}
	function jr(e, t, n) {
		let r = t + n, i = W(D).nav.items[e].children;
		r < 0 || r >= i.length || R("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Mr(e, t) {
		R("nav", () => {
			let n = W(D).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = W(D).pages[0].id));
		});
	}
	function Nr(e, t) {
		R(`edit:theme-color-${e}`, () => {
			W(D).theme.tokens.color[e] = t;
		});
	}
	function Pr(e, t) {
		R("theme", () => {
			W(D).theme.tokens.font[e] = t;
		});
	}
	function Ir(e, t) {
		R("theme", () => {
			W(D).theme.tokens.radius[e] = t;
		});
	}
	function Lr(e) {
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
	function Rr() {
		return Object.fromEntries(Object.entries(W(D).theme.tokens.color).map(([e, t]) => [e, Lr(t)]));
	}
	function Br() {
		R("theme", () => {
			W(D).theme.alt = { tokens: { color: Rr() } };
		});
	}
	function Vr() {
		R("theme", () => {
			W(D).theme.alt.tokens.color = Rr();
		});
	}
	function Hr() {
		R("theme", () => {
			delete W(D).theme.alt;
		});
	}
	function Ur(e, t) {
		R(`edit:theme-alt-${e}`, () => {
			W(D).theme.alt.tokens.color[e] = t;
		});
	}
	function Wr(e) {
		R("theme", () => {
			e === "light" ? delete W(D).theme.scheme : W(D).theme.scheme = e;
		});
	}
	function Gr() {
		L(b, !W(b)), E?.sendChrome(W(b));
	}
	function Kr(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (le(`edit:${e.blockId}`), n.props = e.props, w.save(), O(), W(k)?.blockId === e.blockId && Oe(), e.rerender && E?.sendSection(W(u), t), L(f, ""));
	}
	function qr(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		le(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ee(t, "desktop-endret-etter-mobil"), w.save(), O(), W(k)?.blockId === e.blockId && Oe();
	}
	function Jr(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (w.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), w.hasDraft() && le(`edit:${e.blockId}`), t.frames.desktop.h = e.h, w.save(), O(), W(k)?.blockId === e.blockId && Oe());
	}
	function Yr(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
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
			}, w.save(), O();
		}
	}
	function Zr(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			le("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, w.save(), O(), C(), E?.sendSection(W(u), t);
		}
	}
	function $r(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (le("review-done"), t.responsive.mobile.attention = null, w.save(), O(), C());
	}
	function ei(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (le("decor"), t.decor = e.decor, w.save(), O(), W(k)?.blockId === e.blockId && Oe());
	}
	function ti(e) {
		le("add-section"), e.section.id || (e.section.id = _a("sec")), w.data.sections.splice(e.index, 0, e.section), w.save(), O(), E?.sendPage(W(u), w.data), L(qe, e.section.id, !0), Qe(e.section), W(we) !== "Egenskaper" && (L(we, "Egenskaper"), E?.sendShowGrid(!1));
	}
	function ni(e) {
		let t = w.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (le("move-section"), [t[n], t[r]] = [t[r], t[n]], w.save(), O(), E?.sendPage(W(u), w.data));
	}
	function ai(e) {
		le("delete-section"), e.sectionId === W(qe) && (L(qe, null), L(Je, null)), W(k)?.sectionId === e.sectionId && L(k, null), w.data.sections = w.data.sections.filter((t) => t.id !== e.sectionId), w.save(), O(), E?.sendPage(W(u), w.data);
	}
	function oi(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
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
			e.moves?.length && (ee(t, "seksjonshøyde"), W(k)?.sectionId === e.sectionId && Oe()), e.sectionId === W(qe) && L(Ye, e.minHeight, !0), w.save(), O();
		}
	}
	function si(e) {
		let t = w.data.sections.find((t) => t.id === e.fromSectionId), n = w.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (le("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ee(t, "blokk-flyttet"), ee(n, "blokk-flyttet"), w.save(), O(), C(), E?.sendPage(W(u), w.data), W(k)?.blockId === e.blockId && (L(k, {
			...W(k),
			sectionId: e.toSectionId
		}, !0), Oe()));
	}
	function li(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		le("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(W(k)?.blockId) && L(k, null), ee(t, "blokk-slettet"), w.save(), O(), E?.sendSection(W(u), t);
	}
	let ui = {
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
	function di(e) {
		let t = ui[e];
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
	function pi(e) {
		E ? E.sendPlaceBlock(e) : hi(At()?.id, e);
	}
	function hi(e, t) {
		let n = w.data.sections.find((t) => t.id === e) ?? w.data.sections[0];
		if (!n) return;
		le("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ee(n, "blokk-lagt-til"), w.save(), O(), E?.sendSection(W(u), n);
	}
	function gi(e, t, n, r) {
		let i = w.data.sections.find((t) => t.id === e);
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
		}), ee(i, "blokk-lagt-til"), w.save(), O(), E?.sendSection(W(u), i);
	}
	function _i(e) {
		pi(di(e));
	}
	let vi = /* @__PURE__ */ I(en([]));
	function yi(e, t = {}) {
		pi({
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
	function bi(e) {
		let t = di(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = w.data.sections.find((t) => t.id === e.sectionId)?.grid ?? W(D).grid, r = Ka({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			hi(e.sectionId, t), E?.sendSelect(t.id), e.kind === "image" && g("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && g("Galleri lagt til - legg til bilder i Egenskaper");
		}
	}
	async function xi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		g("Komprimerer bildet…");
		let n;
		try {
			n = await ki(t);
		} catch {
			g("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(_)?.clientWidth ?? 1280));
		pi({
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
		}), n.bytes > 4e5 ? g(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : g("");
	}
	async function Si(e) {
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
	function Ci(e, t, n) {
		t ? g(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? g(`${n} av bildene er store - vurder mindre utsnitt`, "error") : g(e ? "" : "Ingen bilder lagt til");
	}
	async function wi(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		g("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Si(t);
		n.length && Me("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Ci(n.length, r, i);
	}
	async function Ei(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		g("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Si(t);
		if (!n.length) {
			Ci(0, r, i);
			return;
		}
		let a = di("galleri");
		a.props.images = n, pi(a), Ci(n.length, r, i);
	}
	function Di(e, t) {
		Me("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Oi(e) {
		Me("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Mi(e, t, n) {
		Me(`edit:${W(k).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Ni(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ai(n || "bilde")}-${ji(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Pi(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) if (e.type === "image" && Ni(e.props, "src", "bakgrunn", t), e.type === "bildegalleri") for (let n of e.props.images ?? []) Ni(n, "src", "bakgrunn", t);
			for (let e of n.blocks) if (e.type === "image" && Ni(e.props, "src", e.props.alt, t), e.type === "icon" && Ni(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Ni(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function Fi(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Ni(n, "value", "logo", t), n?.type === "both" && Ni(n, "image", "logo", t), e.nav?.style && Ni(e.nav.style, "image", "meny", t), Ni(e.site, "icon", "ikon", t), t;
	}
	let Ii = /* @__PURE__ */ I(!1);
	function Li() {
		if (!W(Ii)) {
			L(Ii, !0);
			return;
		}
		L(Ii, !1), Ri();
	}
	yn(() => {
		if (!W(Ii)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || L(Ii, !1);
		}, t = (e) => {
			e.key === "Escape" && L(Ii, !1);
		}, n = () => L(Ii, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Ri() {
		le("discard");
		for (let e of W(D).pages) e.id !== W(u) && !re.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = w.reset();
		if (T.reset(), Zn && (Zn.reset(), cr()), Mn) {
			Mn.reset(), L(Pn, [...Mn.data.samlinger ?? []], !0);
			for (let e of Object.keys(Nn)) W(Pn).includes(e) ? Nn[e].reset() : delete Nn[e];
			Vn();
		}
		te(), L(y, {
			snap: !0,
			...W(D).grid
		}, !0), O(), L(f, ""), ne(), W(D).pages.some((e) => e.id === W(u)) ? E?.sendPage(W(u), e) : Jt(W(D).pages[0].id);
	}
	async function zi() {
		if (Ut) {
			g("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		g("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(D).pages) {
			let a = `urd-draft-${i.id}`, o = re.has(i.id) || !W(l).pages.some((e) => e.id === i.id), s = null;
			if (i.id === W(u) && (w.hasDraft() || o)) s = w.data;
			else if (i.id !== W(u)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = da(JSON.parse(e), T.data);
				} catch {}
			}
			if (!s && o && (s = qt(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Pi(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (T.hasDraft()) {
			let r = JSON.parse(JSON.stringify(W(D)));
			e.push(...Fi(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(W(l).theme, W(D).theme) || t.push("tema"), i(W(l).nav, W(D).nav) || t.push("menyen"), i(W(l).footer, W(D).footer) || t.push("footeren"), i(W(l).pages, W(D).pages) || t.push("sideregisteret"), i(W(l).grid, W(D).grid) || t.push("gridet"), (W(l).site.icon ?? null) !== (W(D).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = W(l).site, { icon: s, ...c } = W(D).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Nn).filter(([, e]) => e.hasDraft());
		if (i.length || Mn?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Ni(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Mn?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Mn.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!W(Pn).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		Zn?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Zn.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of W(D).pages) n.path !== "/" && e.push({
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
		for (let e of W(l).pages) {
			let t = W(D).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await Lt(e);
		if (!s.ok) {
			g("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let c = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...s.head ? { expect: s.head } : {}
		}, d = null;
		try {
			d = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(c)
			});
		} catch {}
		if (d?.ok) {
			let { sha: e } = await d.json().catch(() => ({}));
			e ? Ft = e : It(), Pi(w.data), Fi(W(D));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) re.add(e);
			if (L(l, JSON.parse(JSON.stringify(W(D))), !0), T = mi("urd-draft-site", () => W(l)), te(), Zn) {
				let e = JSON.parse(JSON.stringify(Zn.data));
				Zn = mi("urd-draft-plugins", () => e), cr();
			}
			if (Mn) {
				for (let e of Object.values(Nn)) for (let t of e.data.entries) Ni(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Mn.data));
				Mn = mi("urd-draft-samlinger", () => e);
				for (let e of W(Pn)) {
					if (!Nn[e]) continue;
					let t = JSON.parse(JSON.stringify(Nn[e].data));
					Nn[e] = mi(`urd-draft-samling-${e}`, () => t);
				}
				Vn();
			}
			L(y, {
				snap: !0,
				...W(D).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(w.data));
			w = mi(`urd-draft-${W(u)}`, () => t), re.has(W(u)) && localStorage.setItem(`urd-draft-${W(u)}`, JSON.stringify(t)), O(), g("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			g(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await Pt();
		} else d?.status === 403 ? g((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? g("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : g(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	me();
	var Bi = nc();
	br("keydown", tn, pe);
	var Vi = B(Bi), Hi = z(Vi), Ui = (e) => {
		var t = bo();
		X(z(t), () => o.pencil), M(), j(t), G("click", t, Gr), q(e, t);
	};
	Y(Hi, (e) => {
		W(b) || e(Ui);
	});
	var Wi = V(Hi, 2);
	let Gi;
	var Ki = z(Wi), qi = V(z(Ki), 2);
	$(qi, {
		get value() {
			return W(c);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return s;
		},
		onchange: (e) => L(c, e, !0)
	});
	var Ji = V(qi, 2), Yi = (e) => {
		var t = xo(), n = B(t), r = z(n, !0);
		j(n);
		var i = V(n, 2), a = z(i);
		let s;
		X(a, () => o.desktop, !0), j(a);
		var c = V(a, 2);
		let l;
		X(c, () => o.phone, !0), j(c), j(i);
		var u = V(i, 2);
		let d;
		X(u, () => o.guides, !0), j(u), H((e) => {
			J(r, e), s = Xr(a, 1, "ghost svelte-1n46o8q", null, s, { active: W(x) === "desktop" }), l = Xr(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(x) === "mobile" }), d = Xr(u, 1, "ghost svelte-1n46o8q", null, d, { active: W(Zt) });
		}, [() => ie()?.title ?? ""]), G("click", n, () => Ee("Sider")), G("click", a, () => L(x, "desktop")), G("click", c, () => L(x, "mobile")), G("click", u, Qt), q(e, t);
	};
	Y(Ji, (e) => {
		W(l) && e(Yi);
	});
	var Xi = V(Ji, 2), Zi = (e) => {
		var t = So(), n = z(t);
		X(n, () => o.phone);
		var r = V(n);
		j(t), H(() => J(r, ` ${W(S) ?? ""} ${W(S) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(x, "mobile")), q(e, t);
	};
	Y(Xi, (e) => {
		W(S) > 0 && e(Zi);
	});
	var ea = V(Xi, 2), ta = (e) => {
		var t = Co(), n = V(B(t), 2);
		let r;
		var i = z(n, !0);
		j(n), H(() => {
			r = Xr(n, 1, "ghost discard-btn svelte-1n46o8q", null, r, { armed: W(Ii) }), ii(n, "title", W(Ii) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), J(i, W(Ii) ? "Sikker?" : "Forkast utkast");
		}), G("click", n, Li), q(e, t);
	};
	Y(ea, (e) => {
		W(d) && e(ta);
	}), j(Ki);
	var na = V(Ki, 2), ra = z(na), oa = (e) => {
		var t = Oo(), n = B(t), r = z(n), i = (e) => {
			var t = wo();
			X(B(t), () => o.eye), M(), q(e, t);
		}, a = (e) => {
			var t = To();
			X(B(t), () => o.pencil), M(), q(e, t);
		};
		Y(r, (e) => {
			W(b) ? e(i) : e(a, -1);
		}), j(n);
		var s = V(n, 2), c = (e) => {
			var t = Eo(), n = z(t), r = (e) => {
				var t = kr();
				X(B(t), () => o.warn), q(e, t);
			};
			Y(n, (e) => {
				W(v).allowed || e(r);
			});
			var i = V(n, 1, !0);
			j(t), H(() => {
				ii(t, "title", W(v).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(i, W(v).login);
			}), q(e, t);
		}, l = (e) => {
			q(e, Do());
		};
		Y(s, (e) => {
			W(v)?.loggedIn ? e(c) : W(v) && e(l, 1);
		});
		var u = V(s, 2), f = V(u, 2);
		H((e) => {
			ii(n, "title", W(b) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ii(u, "href", e), f.disabled = !W(d);
		}, [() => ie()?.path ?? "/"]), G("click", n, Gr), G("click", f, zi), q(e, t);
	};
	Y(ra, (e) => {
		W(l) && e(oa);
	}), j(na), j(Wi);
	var sa = V(Wi, 2), ca = (e) => {
		var t = Ys(), n = z(t), a = (e) => {
			var t = Js(), n = B(t);
			zr(n, 21, () => Te, Fr, (e, t, n) => {
				var r = Ao(), i = B(r), a = (e) => {
					q(e, ko());
				};
				Y(i, (e) => {
					n > 0 && e(a);
				}), zr(V(i, 2), 16, () => W(t), (e) => e, (e, t) => {
					var n = Ya();
					let r;
					var i = z(n, !0);
					j(n), H(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: W(we) === t }), J(i, t);
					}), G("click", n, () => Ee(t)), q(e, n);
				}), q(e, r);
			}), j(n);
			var a = V(n, 2), s = (e) => {
				var t = qs(), n = z(t), a = z(n, !0);
				j(n);
				var s = V(n, 2), c = (e) => {
					var t = Fo(), n = V(z(t), 2);
					zr(n, 17, () => W(D).pages, (e) => e.id, (e, t) => {
						var n = Po();
						let r;
						var i = z(n);
						Z(i);
						var a = V(i, 2), s = (e) => {
							q(e, jo());
						}, c = (e) => {
							var n = Mo();
							Z(n), H((e) => Q(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => ln(W(t), e.target.value)), q(e, n);
						};
						Y(a, (e) => {
							W(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = V(a, 2), d = z(l);
						X(d, () => o.right, !0), j(d);
						var f = V(d, 2), p = (e) => {
							var n = No();
							X(n, () => o.cross, !0), j(n), G("click", n, () => un(W(t))), q(e, n);
						};
						Y(f, (e) => {
							W(t).path !== "/" && e(p);
						}), j(l), j(n), H(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(u) }), Q(i, W(t).title), d.disabled = W(t).id === W(u);
						}), G("change", i, (e) => sn(W(t), e.target.value)), G("click", d, () => Jt(W(t).id)), q(e, n);
					});
					var r = V(n, 4);
					Z(r);
					var i = V(r, 2);
					M(2), j(t), H((e) => i.disabled = e, [() => !W(nn).trim()]), G("keydown", r, (e) => e.key === "Enter" && on()), ci(r, () => W(nn), (e) => L(nn, e)), G("click", i, on), q(e, t);
				}, l = (e) => {
					var t = Zo(), n = V(z(t), 2), r = V(z(n), 2), i = z(r), a = V(z(i));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.logo?.type ?? "text");
						$(a, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => fn(e)
						});
					}
					j(i);
					var s = V(i, 2), c = (e) => {
						var t = Io(), n = B(t);
						Z(n);
						var r = V(n, 2), i = z(r);
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.logo?.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv"], ...Wa.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => dn({ font: e || void 0 })
							});
						}
						var a = V(i, 2);
						Z(a);
						var o = V(a, 2);
						let s;
						var c = V(o, 2);
						let l;
						j(r), H((e) => {
							Q(n, W(D).nav.logo?.value ?? ""), Q(a, W(D).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: W(D).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!W(D).nav.logo?.italic })]), G("input", n, (e) => dn({ value: e.target.value })), G("change", a, (e) => dn({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", o, () => dn({ bold: W(D).nav.logo?.bold === !1 })), G("click", c, () => dn({ italic: !W(D).nav.logo?.italic })), q(e, t);
					};
					Y(s, (e) => {
						(W(D).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = Lo(), n = B(t), r = z(n), i = z(r), a = V(i);
						j(r);
						var o = V(r, 2);
						Z(o);
						var s = V(o, 2);
						Z(s), j(n), M(2), H(() => {
							J(i, `${(W(D).nav.logo?.type === "image" ? W(D).nav.logo?.value : W(D).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, W(D).nav.logo?.size ?? 32), Q(s, W(D).nav.logo?.radius ?? 0);
						}), G("change", a, pn), G("change", o, (e) => dn({ size: Number(e.target.value) })), G("change", s, (e) => dn({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(l, (e) => {
						(W(D).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = V(l, 2), f = (e) => {
						var t = Ro(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return W(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => dn({ order: e })
							});
						}
						j(t), q(e, t);
					};
					Y(d, (e) => {
						W(D).nav.logo?.type === "both" && e(f);
					}), M(2), j(r), j(n);
					var p = V(n, 2), m = V(z(p), 2), h = z(m), g = V(z(h));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.variant ?? "bar");
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
							onchange: (e) => En(e)
						});
					}
					j(h);
					var _ = V(h, 2), v = (e) => {
						var t = zo(), n = B(t), r = z(n);
						Z(r), M(), j(n);
						var i = V(n, 2), a = z(i);
						Z(a), M(), j(i), H(() => {
							ri(r, W(D).nav.style?.glow === !0), ri(a, W(D).nav.style?.topGap !== !1);
						}), G("change", r, (e) => Dn(e.target.checked)), G("change", a, (e) => On(e.target.checked)), q(e, t);
					};
					Y(_, (e) => {
						W(Cn) && e(v);
					});
					var y = V(_, 2), b = (e) => {
						var t = Bo(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.style?.sideAlign ?? "left");
							$(n, {
								get value() {
									return W(e);
								},
								options: [
									["left", "Venstre"],
									["center", "Midtstilt"],
									["right", "Høyre"]
								],
								onchange: (e) => xn("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), q(e, t);
					};
					Y(y, (e) => {
						W(Sn) && e(b);
					});
					var x = V(y, 2), S = V(z(x)), C = z(S);
					j(S), j(x);
					var ee = V(x, 2);
					Z(ee);
					var w = V(ee, 2), T = z(w);
					Z(T), M(), j(w);
					var E = V(w, 2), te = V(z(E));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.size ?? "md");
						$(te, {
							get value() {
								return W(e);
							},
							options: [
								["sm", "Liten"],
								["md", "Standard"],
								["lg", "Stor"],
								["xl", "Ekstra stor"]
							],
							onchange: (e) => xn("size", e === "md" ? void 0 : e)
						});
					}
					j(E);
					var ne = V(E, 2), re = V(z(ne)), ie = (e) => {
						{
							let t = /* @__PURE__ */ P(() => W(D).nav.style?.sidePlacement ?? "top");
							$(e, {
								get value() {
									return W(t);
								},
								options: [
									["top", "Øverst (standard)"],
									["middle", "Midt på"],
									["bottom", "Nederst"]
								],
								onchange: (e) => xn("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, O = (e) => {
						{
							let t = /* @__PURE__ */ P(() => W(D).nav.layout ?? "right");
							$(e, {
								get value() {
									return W(t);
								},
								options: [
									["right", "Høyre"],
									["center", "Midtstilt"],
									["left", "Venstre (etter logoen)"]
								],
								onchange: (e) => bn(e)
							});
						}
					};
					Y(re, (e) => {
						W(Sn) ? e(ie) : e(O, -1);
					}), j(ne);
					var ae = V(ne, 2), oe = (e) => {
						var t = Vo(), n = z(t);
						Z(n), M(), j(t), H(() => ri(n, W(D).nav.sticky !== !1)), G("change", n, (e) => R("nav", () => {
							W(D).nav.sticky = e.target.checked;
						})), q(e, t);
					};
					Y(ae, (e) => {
						W(Sn) || e(oe);
					});
					var se = V(ae, 2), ce = V(z(se));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.hover ?? "standard");
						$(ce, {
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
							onchange: (e) => kn(e)
						});
					}
					j(se);
					var le = V(se, 2), ue = (e) => {
						var t = Ho(), n = B(t), r = V(z(n)), i = z(r);
						j(r), j(n);
						var a = V(n, 2);
						Z(a), H((e) => {
							J(i, `${e ?? ""}%`), Q(a, W(D).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((W(D).nav.style?.hoverGlow ?? .6) * 100)]), G("input", a, (e) => xn("hoverGlow", Number(e.target.value))), q(e, t);
					};
					Y(le, (e) => {
						W(D).nav.style?.hover === "lift" && e(ue);
					});
					var de = V(le, 2), fe = (e) => {
						var t = Uo(), n = z(t), r = V(n);
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ P(wt);
							Ti(r, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								get label() {
									return W(Tn)[1];
								},
								onchange: (e) => xn("hoverColor", e)
							});
						}
						j(t), H(() => {
							ii(t, "title", W(Tn)[1]), J(n, `${W(Tn)[0] ?? ""} `);
						}), q(e, t);
					};
					Y(de, (e) => {
						W(Tn) && e(fe);
					});
					var pe = V(de, 2), me = V(z(pe));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ P(wt);
						Ti(me, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => xn("hoverTextColor", e)
						});
					}
					j(pe);
					var he = V(pe, 2), ge = V(z(he));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ P(wt);
						Ti(ge, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => xn("bg", e)
						});
					}
					j(he);
					var _e = V(he, 2), ve = V(z(_e));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(wt);
						Ti(ve, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => xn("textColor", e)
						});
					}
					j(_e);
					var ye = V(_e, 2), be = z(ye), xe = z(be), Se = V(xe);
					j(be);
					var Ce = V(be, 2), we = (e) => {
						var t = Wo();
						X(t, () => o.cross, !0), j(t), G("click", t, jn), q(e, t);
					};
					Y(Ce, (e) => {
						W(D).nav.style?.image && e(we);
					}), j(ye);
					var Te = V(ye, 2), Ee = (e) => {
						var t = Go(), n = B(t), r = V(z(n)), i = z(r);
						j(r), j(n);
						var a = V(n, 2);
						Z(a);
						var o = V(a, 2), s = V(z(o)), c = z(s);
						j(s), j(o);
						var l = V(o, 2);
						Z(l);
						var u = V(l, 2), d = V(z(u)), f = z(d);
						j(d), j(u);
						var p = V(u, 2);
						Z(p), H((e, t, n) => {
							J(i, `${e ?? ""}%`), Q(a, W(D).nav.style?.imageOpacity ?? 1), J(c, `${t ?? ""}%`), Q(l, W(D).nav.style?.imageY ?? 50), J(f, `${n ?? ""}%`), Q(p, W(D).nav.style?.imageX ?? 50);
						}, [
							() => Math.round((W(D).nav.style?.imageOpacity ?? 1) * 100),
							() => Math.round(W(D).nav.style?.imageY ?? 50),
							() => Math.round(W(D).nav.style?.imageX ?? 50)
						]), G("input", a, (e) => xn("imageOpacity", Number(e.target.value))), G("input", l, (e) => xn("imageY", Number(e.target.value))), G("input", p, (e) => xn("imageX", Number(e.target.value))), q(e, t);
					};
					Y(Te, (e) => {
						W(D).nav.style?.image && e(Ee);
					}), j(m), j(p);
					var k = V(p, 2), De = V(z(k), 2), Oe = z(De), A = V(z(Oe));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ P(() => W(Sn) ? [
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
						$(A, {
							get value() {
								return W(e);
							},
							get options() {
								return W(t);
							},
							onchange: (e) => xn("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(Oe);
					var ke = V(Oe, 2), Ae = (e) => {
						var t = Ko(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ P(wt);
							Ti(n, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => xn("subPillColor", e)
							});
						}
						j(t), q(e, t);
					};
					Y(ke, (e) => {
						W(D).nav.style?.subStyle === "pills" && e(Ae);
					});
					var je = V(ke, 2), Me = V(z(je));
					Z(Me), j(je);
					var N = V(je, 2), Ne = (e) => {
						var t = qo(), n = z(t);
						Z(n), M(), j(t), H(() => ri(n, W(D).nav.style?.subImage === !0)), G("change", n, (e) => xn("subImage", e.target.checked ? !0 : void 0)), q(e, t);
					};
					Y(N, (e) => {
						W(D).nav.style?.image && e(Ne);
					}), j(De), j(k);
					var Pe = V(k, 2), Fe = V(z(Pe), 2), Ie = z(Fe);
					zr(Ie, 17, () => W(D).nav.items, Fr, (e, t, n) => {
						var r = Xo(), i = B(r), a = z(i);
						Z(a);
						var s = V(a, 2), c = z(s);
						X(c, () => o.plus, !0), j(c);
						var l = V(c, 2);
						l.disabled = n === 0, X(l, () => o.up, !0), j(l);
						var u = V(l, 2);
						X(u, () => o.down, !0), j(u);
						var d = V(u, 2);
						X(d, () => o.cross, !0), j(d), j(s);
						var f = V(s, 2), p = z(f);
						{
							let e = /* @__PURE__ */ P(() => W(t).page ?? (W(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ P(() => [
								...W(D).pages.map((e) => [e.id, e.title]),
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
								onchange: (e) => Sr(n, e)
							});
						}
						j(f);
						var m = V(f, 2), h = (e) => {
							var r = Jo();
							Z(r), H(() => Q(r, W(t).href)), G("change", r, (e) => Cr(n, e.target.value)), q(e, r);
						};
						Y(m, (e) => {
							!W(t).page && W(t).href != null && e(h);
						}), j(i), zr(V(i, 2), 17, () => W(t).children ?? [], Fr, (e, r, i) => {
							var a = Yo(), s = z(a);
							Z(s);
							var c = V(s, 2), l = z(c);
							l.disabled = i === 0, X(l, () => o.up, !0), j(l);
							var u = V(l, 2);
							X(u, () => o.down, !0), j(u);
							var d = V(u, 2);
							X(d, () => o.cross, !0), j(d), j(c);
							var f = V(c, 2), p = z(f);
							{
								let e = /* @__PURE__ */ P(() => W(r).page ?? "__href"), t = /* @__PURE__ */ P(() => [...W(D).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(p, {
									get value() {
										return W(e);
									},
									title: "Hvor lenken går",
									get options() {
										return W(t);
									},
									onchange: (e) => Or(n, i, e)
								});
							}
							j(f);
							var m = V(f, 2), h = (e) => {
								var t = Jo();
								Z(t), H(() => Q(t, W(r).href ?? "")), G("change", t, (e) => Ar(n, i, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), j(a), H(() => {
								Q(s, W(r).label), u.disabled = i === W(t).children.length - 1;
							}), G("input", s, (e) => K(n, i, e.target.value)), G("click", l, () => jr(n, i, -1)), G("click", u, () => jr(n, i, 1)), G("click", d, () => Mr(n, i)), q(e, a);
						}), H(() => {
							Q(a, W(t).label), u.disabled = n === W(D).nav.items.length - 1;
						}), G("input", a, (e) => xr(n, e.target.value)), G("click", c, () => Dr(n)), G("click", l, () => wr(n, -1)), G("click", u, () => wr(n, 1)), G("click", d, () => Tr(n)), q(e, r);
					});
					var Le = V(Ie, 2);
					M(2), j(Fe), j(Pe), j(t), H((e) => {
						J(C, `${e ?? ""}%`), Q(ee, 1 - (W(D).nav.style?.bgOpacity ?? .85)), ri(T, W(D).nav.style?.blur !== !1), J(xe, `${W(D).nav.style?.image ? "Bytt bakgrunnsbilde" : "Bakgrunnsbilde i menyen"} `), Q(Me, W(D).nav.style?.subColumns ?? 1);
					}, [() => Math.round((1 - (W(D).nav.style?.bgOpacity ?? .85)) * 100)]), G("input", ee, (e) => xn("bgOpacity", Math.round((1 - Number(e.target.value)) * 100) / 100)), G("change", T, (e) => xn("blur", e.target.checked)), G("change", Se, An), G("change", Me, (e) => xn("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), G("click", Le, Er), q(e, t);
				}, d = (e) => {
					var t = ns(), n = V(z(t), 2);
					Ti(V(z(n)), {
						get value() {
							return W(D).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Nr("bg", e)
					}), j(n);
					var r = V(n, 2);
					Ti(V(z(r)), {
						get value() {
							return W(D).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Nr("surface", e)
					}), j(r);
					var i = V(r, 2);
					Ti(V(z(i)), {
						get value() {
							return W(D).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Nr("text", e)
					}), j(i);
					var a = V(i, 2);
					Ti(V(z(a)), {
						get value() {
							return W(D).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Nr("accent", e)
					}), j(a);
					var s = V(a, 2), c = V(z(s));
					{
						let e = /* @__PURE__ */ P(() => W(D).theme.tokens.color["accent-text"] ?? W(D).theme.tokens.color.bg);
						Ti(c, {
							get value() {
								return W(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => Nr("accent-text", e)
						});
					}
					j(s);
					var l = V(s, 2), u = V(z(l), 2), d = z(u), f = (e) => {
						var t = Qo(), n = B(t), r = V(z(n));
						{
							let e = /* @__PURE__ */ P(() => W(D).theme.scheme ?? "light");
							$(r, {
								get value() {
									return W(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => Wr(e)
							});
						}
						j(n);
						var i = V(n, 4);
						zr(i, 17, () => Object.entries(W(D).theme.alt.tokens.color), Fr, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(W(t), 1));
							let r = () => W(n)[0];
							var i = Uo(), a = z(i), o = V(a);
							{
								let e = /* @__PURE__ */ P(() => `Alternativ ${r()}`);
								Ti(o, {
									get value() {
										return W(D).theme.alt.tokens.color[r()];
									},
									get label() {
										return W(e);
									},
									onchange: (e) => Ur(r(), e)
								});
							}
							j(i), H(() => J(a, `${{
								bg: "Bakgrunn",
								surface: "Flater",
								text: "Tekst",
								accent: "Aksent",
								"accent-text": "Tekst på aksent"
							}[r()] ?? r() ?? ""} `)), q(e, i);
						});
						var a = V(i, 2), s = z(a), c = V(s, 2);
						X(c, () => o.cross, !0), j(c), j(a), G("click", s, Vr), G("click", c, Hr), q(e, t);
					}, p = (e) => {
						var t = $o(), n = B(t);
						M(2), G("click", n, Br), q(e, t);
					};
					Y(d, (e) => {
						W(D).theme.alt ? e(f) : e(p, -1);
					}), j(u), j(l);
					var h = V(l, 4), g = V(z(h));
					{
						let e = /* @__PURE__ */ P(() => [...Wa.some(([, e]) => e === W(D).theme.tokens.font.heading) ? [] : [[W(D).theme.tokens.font.heading, "Egendefinert"]], ...Wa.map(([e, t]) => [t, e])]);
						$(g, {
							get value() {
								return W(D).theme.tokens.font.heading;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => Pr("heading", e)
						});
					}
					j(h);
					var _ = V(h, 2), v = V(z(_));
					{
						let e = /* @__PURE__ */ P(() => [...Wa.some(([, e]) => e === W(D).theme.tokens.font.body) ? [] : [[W(D).theme.tokens.font.body, "Egendefinert"]], ...Wa.map(([e, t]) => [t, e])]);
						$(v, {
							get value() {
								return W(D).theme.tokens.font.body;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => Pr("body", e)
						});
					}
					j(_);
					var y = V(_, 4), b = V(z(y));
					Z(b), j(y);
					var x = V(y, 2), S = V(z(x));
					Z(S), j(x);
					var C = V(x, 4), ee = V(z(C)), w = (e) => {
						var t = es();
						H(() => ii(t, "src", W(D).site.icon)), q(e, t);
					};
					Y(ee, (e) => {
						W(D).site.icon && e(w);
					}), j(C);
					var T = V(C, 2), E = z(T), te = z(E), ne = V(te);
					j(E);
					var re = V(E, 2), ie = (e) => {
						var t = ts(), n = B(t);
						X(n, () => o.pencil ?? "✎", !0), j(n);
						var r = V(n, 2);
						X(r, () => o.cross, !0), j(r), G("click", n, () => L(mn, W(D).site.icon, !0)), G("click", r, _n), q(e, t);
					};
					Y(re, (e) => {
						W(D).site.icon && e(ie);
					}), j(T), M(2), j(t), H(() => {
						Q(b, W(D).theme.tokens.radius.sm), Q(S, W(D).theme.tokens.radius.md), J(te, `${W(D).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), G("change", b, (e) => Ir("sm", e.target.value)), G("change", S, (e) => Ir("md", e.target.value)), G("change", ne, hn), q(e, t);
				}, f = (e) => {
					var t = os();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					j(i), j(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					j(c);
					var u = V(c, 2), d = V(u, 2), f = V(d, 2), p = V(f, 2), m = V(p, 2), h = V(z(m), 2), g = z(h), _ = V(g, 2), v = V(z(_));
					j(_), j(h), j(m);
					var y = V(m, 2), b = V(z(y), 2), S = z(b), C = V(S, 2), ee = V(C, 2), w = V(ee, 2), T = V(w, 2);
					j(b), j(y);
					var E = V(y, 2), D = (e) => {
						var t = as(), n = V(z(t), 2);
						zr(n, 21, () => W(vi), (e) => e.type, (e, t) => {
							var n = kr(), r = B(n), i = (e) => {
								var n = is(), r = z(n), i = z(r, !0);
								j(r);
								var a = V(r, 2);
								zr(a, 21, () => W(t).variants, (e) => e.label, (e, n) => {
									var r = rs(), i = z(r, !0);
									j(r), H(() => {
										ii(r, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(i, W(n).label);
									}), G("click", r, () => yi(W(t), W(n).props)), q(e, r);
								}), j(a), j(n), H(() => J(i, W(t).label)), q(e, n);
							}, a = (e) => {
								var n = rs(), r = z(n, !0);
								j(n), H(() => {
									ii(n, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(r, W(t).label);
								}), G("click", n, () => yi(W(t))), q(e, n);
							};
							Y(r, (e) => {
								W(t).variants?.length ? e(i) : e(a, -1);
							}), q(e, n);
						}), j(n), j(t), q(e, t);
					};
					Y(E, (e) => {
						W(vi).length && e(D);
					}), j(t), H(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(x) === "mobile" }), ii(t, "title", W(x) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => _i("text")), G("click", o, () => _i("text-box")), G("click", s, () => _i("button")), G("change", l, xi), G("click", u, () => _i("video")), G("click", d, () => _i("icon")), G("click", f, () => _i("samling")), G("click", p, () => _i("faq")), G("click", g, () => _i("galleri")), G("change", v, Ei), G("click", S, () => _i("shape-line")), G("click", C, () => _i("shape-arrow")), G("click", ee, () => _i("shape-circle")), G("click", w, () => _i("shape-rect")), G("click", T, () => _i("shape-triangle")), q(e, t);
				}, p = (e) => {
					var t = ss(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					j(r), j(n);
					var a = V(n, 2);
					Z(a);
					var o = V(a, 2), s = z(o);
					Z(s), M(), j(o), M(2), j(t), H(() => {
						J(i, `${W(y).size ?? ""} px`), Q(a, W(y).size), ri(s, W(y).snap !== !1);
					}), G("input", a, (e) => Nt("size", Number(e.target.value))), G("change", s, (e) => Nt("snap", e.target.checked)), q(e, t);
				}, h = (e) => {
					var t = Ts(), n = z(t), a = (e) => {
						var t = cs(), n = B(t), i = z(n);
						j(n);
						var a = V(n, 2);
						r(a), H(() => J(i, `${We[W(k).type] ?? W(k).type ?? ""}-blokk`)), q(e, t);
					}, s = (e) => {
						var t = Cs(), n = V(B(t), 2), r = V(z(n));
						Z(r), j(n);
						var a = V(n, 6), s = z(a);
						Z(s), M(), j(a);
						var c = V(a, 2), l = (e) => {
							var t = ls(), n = B(t), r = V(z(n)), i = z(r);
							j(r), j(n);
							var a = V(n, 2);
							Z(a), H(() => {
								J(i, `${W(Je).size ?? ""} px`), Q(a, W(Je).size);
							}), G("input", a, (e) => Mt("size", Number(e.target.value))), q(e, t);
						};
						Y(c, (e) => {
							W(Je) && e(l);
						});
						var u = V(c, 8);
						zr(u, 17, () => W(Xe), Fr, (e, t, n) => {
							var r = Ss(), a = z(r), s = z(a);
							{
								let e = /* @__PURE__ */ P(() => i.map(([e, t]) => [e, t.label]));
								$(s, {
									get value() {
										return W(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return W(e);
									},
									onchange: (e) => vt(n, e)
								});
							}
							var c = V(s, 2), l = z(c);
							l.disabled = n === 0, X(l, () => o.up, !0), j(l);
							var u = V(l, 2);
							X(u, () => o.down, !0), j(u);
							var d = V(u, 2);
							X(d, () => o.cross, !0), j(d), j(c), j(a);
							var f = V(a, 2), p = (e) => {
								var r = us(), i = B(r), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(wt);
									Ti(a, {
										get value() {
											return W(t).props.value;
										},
										get tokens() {
											return W(e);
										},
										label: "Lagets farge",
										onchange: (e) => ot(n, "value", e)
									});
								}
								j(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								j(s), j(o);
								var l = V(o, 2);
								Z(l), H((e) => {
									J(c, `${e ?? ""}%`), Q(l, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", l, (e) => ot(n, "opacity", Number(e.target.value))), q(e, r);
							}, m = (e) => {
								let r = /* @__PURE__ */ P(() => st(W(t))), i = /* @__PURE__ */ P(() => W(r).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
								var a = hs(), s = B(a), c = V(z(s));
								{
									let e = /* @__PURE__ */ P(() => W(r).kind ?? "linear");
									$(c, {
										get value() {
											return W(e);
										},
										options: [["linear", "Lineær"], ["radial", "Radiell (fra et punkt)"]],
										onchange: (e) => dt(n, e)
									});
								}
								j(s);
								var l = V(s, 2);
								zr(l, 17, () => W(r).stops, Fr, (e, t, a) => {
									var s = fs();
									let c;
									var l = z(s), u = V(l, 2);
									{
										let e = /* @__PURE__ */ P(wt);
										Ti(u, {
											get value() {
												return W(t).color;
											},
											get tokens() {
												return W(e);
											},
											label: "Fargen",
											onchange: (e) => ft(n, a, { color: e })
										});
									}
									var d = V(u, 2);
									Z(d);
									var f = V(d, 2), p = z(f);
									j(f);
									var m = V(f, 2), h = (e) => {
										var t = ds();
										X(t, () => o.cross, !0), j(t), G("click", t, () => mt(n, a)), q(e, t);
									};
									Y(m, (e) => {
										W(r).stops.length > 2 && e(h);
									}), j(s), H((e) => {
										c = Xr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
											dragging: W(gt)?.layer === n && W(gt).from === a,
											"drop-above": W(gt)?.layer === n && W(gt).insert === a,
											"drop-below": W(gt)?.layer === n && W(gt).insert === W(r).stops.length && a === W(r).stops.length - 1
										}), Q(d, W(t).share ?? 50), J(p, `${e ?? ""}%`);
									}, [() => W(i) > 0 ? Math.round(Math.max(0, Number(W(t).share) || 0) / W(i) * 100) : Math.round(100 / W(r).stops.length)]), G("pointerdown", l, (e) => _t(e, n, a)), G("input", d, (e) => ft(n, a, { share: Number(e.target.value) })), q(e, s);
								});
								var u = V(l, 2), d = V(u, 2), f = (e) => {
									var t = ps(), i = B(t), a = V(z(i)), o = z(a);
									j(a), j(i);
									var s = V(i, 2);
									Z(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									j(l), j(c);
									var d = V(c, 2);
									Z(d), H((e, t) => {
										J(o, `${e ?? ""}%`), Q(s, W(r).x ?? .5), J(u, `${t ?? ""}%`), Q(d, W(r).y ?? .5);
									}, [() => Math.round((W(r).x ?? .5) * 100), () => Math.round((W(r).y ?? .5) * 100)]), G("input", s, (e) => lt(n, "x", Number(e.target.value))), G("input", d, (e) => lt(n, "y", Number(e.target.value))), q(e, t);
								}, p = (e) => {
									var t = ms(), i = B(t), a = V(z(i)), o = z(a);
									j(a), j(i);
									var s = V(i, 2);
									Z(s), H(() => {
										J(o, `${W(r).angle ?? ""}°`), Q(s, W(r).angle);
									}), G("input", s, (e) => lt(n, "angle", Number(e.target.value))), q(e, t);
								};
								Y(d, (e) => {
									(W(r).kind ?? "linear") === "radial" ? e(f) : e(p, -1);
								});
								var m = V(d, 2), h = V(z(m)), g = z(h);
								j(h), j(m);
								var _ = V(m, 2);
								Z(_);
								var v = V(_, 2), y = V(z(v));
								{
									let e = /* @__PURE__ */ P(() => W(r).animation ?? "none");
									$(y, {
										get value() {
											return W(e);
										},
										get options() {
											return ut[(W(r).kind ?? "linear") === "radial" ? "radial" : "linear"];
										},
										onchange: (e) => lt(n, "animation", e)
									});
								}
								j(v), H((e) => {
									J(g, `${e ?? ""}%`), Q(_, W(r).opacity ?? 1);
								}, [() => Math.round((W(r).opacity ?? 1) * 100)]), G("click", u, () => pt(n)), G("input", _, (e) => lt(n, "opacity", Number(e.target.value))), q(e, a);
							}, h = (e) => {
								var r = gs(), i = B(r), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(wt);
									Ti(a, {
										get value() {
											return W(t).props.color;
										},
										get tokens() {
											return W(e);
										},
										label: "Glødens farge",
										onchange: (e) => ot(n, "color", e)
									});
								}
								j(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								j(s), j(o);
								var l = V(o, 2);
								Z(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								j(d), j(u);
								var p = V(u, 2);
								Z(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								j(h), j(m);
								var _ = V(m, 2);
								Z(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								j(y), j(v);
								var x = V(v, 2);
								Z(x), H((e, n, r, i) => {
									J(c, `${e ?? ""}%`), Q(l, W(t).props.x), J(f, `${n ?? ""}%`), Q(p, W(t).props.y), J(g, `${r ?? ""}%`), Q(_, W(t).props.radius), J(b, `${i ?? ""}%`), Q(x, W(t).props.opacity);
								}, [
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", l, (e) => ot(n, "x", Number(e.target.value))), G("input", p, (e) => ot(n, "y", Number(e.target.value))), G("input", _, (e) => ot(n, "radius", Number(e.target.value))), G("input", x, (e) => ot(n, "opacity", Number(e.target.value))), q(e, r);
							}, g = (e) => {
								var r = _s(), i = B(r), a = V(z(i)), o = z(a);
								j(a), j(i);
								var s = V(i, 2);
								Z(s), H((e) => {
									J(o, `${e ?? ""}%`), Q(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => ot(n, "opacity", Number(e.target.value))), q(e, r);
							}, _ = (e) => {
								var r = ys(), i = B(r), a = z(i), o = V(a);
								j(i);
								var s = V(i, 2), c = V(z(s));
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
										onchange: (e) => ot(n, "fit", e)
									});
								}
								j(s);
								var l = V(s, 2), u = (e) => {
									var r = vs(), i = B(r), a = V(z(i)), o = z(a);
									j(a), j(i);
									var s = V(i, 2);
									Z(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									j(l), j(c);
									var d = V(c, 2);
									Z(d), H((e, n) => {
										J(o, `${e ?? ""}%`), Q(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), Q(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => ot(n, "x", Number(e.target.value))), G("input", d, (e) => ot(n, "y", Number(e.target.value))), q(e, r);
								};
								Y(l, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = V(l, 2), f = V(z(d)), p = z(f);
								j(f), j(d);
								var m = V(d, 2);
								Z(m);
								var h = V(m, 2), g = V(z(h)), _ = z(g);
								j(g), j(h);
								var v = V(h, 2);
								Z(v), H((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), J(p, `${W(t).props.blur ?? 0 ?? ""} px`), Q(m, W(t).props.blur ?? 0), J(_, `${e ?? ""}%`), Q(v, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => yt(n, e)), G("input", m, (e) => ot(n, "blur", Number(e.target.value))), G("input", v, (e) => ot(n, "opacity", Number(e.target.value))), q(e, r);
							}, v = (e) => {
								var r = xs(), i = B(r), a = V(z(i));
								j(i);
								var s = V(i, 2);
								zr(s, 17, () => W(t).props.images ?? [], Fr, (e, r, i) => {
									var a = bs(), s = B(a), c = z(s), l = V(c, 2), u = z(l);
									u.disabled = i === 0, X(u, () => o.up, !0), j(u);
									var d = V(u, 2);
									X(d, () => o.down, !0), j(d);
									var f = V(d, 2);
									X(f, () => o.cross, !0), j(f), j(l), j(s);
									var p = V(s, 2), m = V(z(p)), h = z(m);
									j(m), j(p);
									var g = V(p, 2);
									Z(g);
									var _ = V(g, 2), v = V(z(_)), y = z(v);
									j(v), j(_);
									var b = V(_, 2);
									Z(b), H((e, n) => {
										ii(c, "src", W(r).src), d.disabled = i === W(t).props.images.length - 1, J(h, `${e ?? ""}%`), Q(g, W(r).x ?? .5), J(y, `${n ?? ""}%`), Q(b, W(r).y ?? .5);
									}, [() => Math.round((W(r).x ?? .5) * 100), () => Math.round((W(r).y ?? .5) * 100)]), G("click", u, () => xt(n, i, -1)), G("click", d, () => xt(n, i, 1)), G("click", f, () => St(n, i)), G("input", g, (e) => Ct(n, i, "x", Number(e.target.value))), G("input", b, (e) => Ct(n, i, "y", Number(e.target.value))), q(e, a);
								});
								var c = V(s, 2), l = V(z(c));
								{
									let e = /* @__PURE__ */ P(() => W(t).props.fit ?? "cover");
									$(l, {
										get value() {
											return W(e);
										},
										options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
										onchange: (e) => ot(n, "fit", e)
									});
								}
								j(c);
								var u = V(c, 2), d = V(z(u));
								Z(d), j(u);
								var f = V(u, 2), p = V(z(f)), m = z(p);
								j(p), j(f);
								var h = V(f, 2);
								Z(h);
								var g = V(h, 2), _ = V(z(g)), v = z(_);
								j(_), j(g);
								var y = V(g, 2);
								Z(y);
								var b = V(y, 2), x = V(z(b)), S = z(x);
								j(x), j(b);
								var C = V(b, 2);
								Z(C), M(2), H((e, n) => {
									Q(d, W(t).props.interval ?? 6), J(m, `${e ?? ""} s`), Q(h, W(t).props.fade ?? 1.5), J(v, `${W(t).props.blur ?? 0 ?? ""} px`), Q(y, W(t).props.blur ?? 0), J(S, `${n ?? ""}%`), Q(C, W(t).props.opacity ?? 1);
								}, [() => (W(t).props.fade ?? 1.5).toFixed(1), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", a, (e) => bt(n, e)), G("change", d, (e) => ot(n, "interval", Number(e.target.value))), G("input", h, (e) => ot(n, "fade", Number(e.target.value))), G("input", y, (e) => ot(n, "blur", Number(e.target.value))), G("input", C, (e) => ot(n, "opacity", Number(e.target.value))), q(e, r);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(m, 1) : W(t).type === "glow" ? e(h, 2) : W(t).type === "grain" ? e(g, 3) : W(t).type === "image" ? e(_, 4) : W(t).type === "bildegalleri" && e(v, 5);
							}), j(r), H(() => u.disabled = n === W(Xe).length - 1), G("click", l, () => at(n, -1)), G("click", u, () => at(n, 1)), G("click", d, () => rt(n)), q(e, r);
						});
						var d = V(u, 2), f = V(z(d));
						{
							let e = /* @__PURE__ */ P(() => i.map(([e, t]) => [e, t.label]));
							$(f, {
								get value() {
									return W(tt);
								},
								get options() {
									return W(e);
								},
								onchange: (e) => L(tt, e, !0)
							});
						}
						j(d);
						var p = V(d, 2), m = V(p, 4), h = V(z(m));
						{
							let e = /* @__PURE__ */ P(() => W(Ze)?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(Ua).map(([e, t]) => [e, t.label])]);
							$(h, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => Dt(e || null)
							});
						}
						j(m);
						var g = V(m, 2), _ = (e) => {
							var t = ho(), n = B(t), r = V(z(n));
							Z(r), j(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), j(i), M(2), H(() => {
								Q(r, W(Ze).props.duration), Q(a, W(Ze).props.delay);
							}), G("change", r, (e) => Ot("duration", Number(e.target.value))), G("change", a, (e) => Ot("delay", Number(e.target.value))), q(e, t);
						};
						Y(g, (e) => {
							W(Ze) && Ua[W(Ze).type]?.entrance && e(_);
						}), H(() => {
							Q(r, W(Ye)), ri(s, W(Je) !== null);
						}), G("change", r, (e) => kt(e.target.value)), G("change", s, (e) => jt(e.target.checked)), G("click", p, () => nt(W(tt))), q(e, t);
					}, c = (e) => {
						q(e, ws());
					};
					Y(n, (e) => {
						W(k) ? e(a) : W(qe) ? e(s, 1) : e(c, -1);
					}), j(t), q(e, t);
				}, g = (e) => {
					var t = Es(), n = V(z(t), 2), r = z(n);
					Z(r), M(), j(n);
					var i = V(n, 4);
					it(i), ii(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = V(i, 4), o = V(z(a));
					{
						let e = /* @__PURE__ */ P(() => W(D).footer?.align ?? "center");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => yr("footer", (t) => {
								t.align = e;
							})
						});
					}
					j(a), M(2), j(t), H((e) => {
						ri(r, e), Q(i, W(D).footer?.text ?? "");
					}, [() => !!W(D).footer?.show]), G("change", r, (e) => yr("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", i, (e) => yr("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), q(e, t);
				}, _ = (e) => {
					var t = Ms(), n = V(z(t), 2), r = (e) => {
						var t = Ds(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => W(In) ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...W(Pn).map((e) => [e, W(Fn)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => L(In, e || null, !0)
							});
						}
						j(t), q(e, t);
					};
					Y(n, (e) => {
						W(Pn).length && e(r);
					});
					var i = V(n, 2), a = (e) => {
						let t = /* @__PURE__ */ P(() => W(Fn)[W(In)]);
						var n = js(), r = B(n), i = z(r), a = V(i, 2);
						X(a, () => o.cross, !0), j(a), j(r);
						var s = V(r, 2);
						zr(s, 19, () => W(t).entries, (e) => e.id, (e, n, r) => {
							var i = ks(), a = z(i), s = z(a);
							j(a);
							var c = V(a, 2), l = z(c), u = z(l);
							Z(u);
							var d = V(u, 2), f = z(d);
							X(f, () => o.up, !0), j(f);
							var p = V(f, 2);
							X(p, () => o.down, !0), j(p);
							var m = V(p, 2);
							X(m, () => o.cross, !0), j(m), j(d), j(l);
							var h = V(l, 2), g = V(z(h));
							Z(g), j(h);
							var _ = V(h, 2);
							it(_);
							var v = V(_, 2), y = V(z(v));
							Z(y), j(v);
							var b = V(v, 2), x = z(b), S = z(x), C = V(S);
							j(x);
							var ee = V(x, 2), w = (e) => {
								var t = Os(), r = B(t), i = V(r, 2);
								X(i, () => o.cross, !0), j(i), H(() => ii(r, "src", W(n).image)), G("click", i, () => qn(W(In), W(n).id, "image", "")), q(e, t);
							};
							Y(ee, (e) => {
								W(n).image && e(w);
							}), j(b), j(c), j(i), H((e) => {
								J(s, `${e ?? ""}${W(n).date ? ` · ${W(n).date}` : ""}`), Q(u, W(n).title), f.disabled = W(r) === 0, p.disabled = W(r) === W(t).entries.length - 1, Q(g, W(n).date ?? ""), Q(_, W(n).text ?? ""), Q(y, W(n).href ?? ""), J(S, `${W(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => W(n).title.replace(/<[^>]*>/g, "")]), G("change", u, (e) => qn(W(In), W(n).id, "title", e.target.value || "Uten tittel")), G("click", f, () => Jn(W(In), W(r), -1)), G("click", p, () => Jn(W(In), W(r), 1)), G("click", m, () => Yn(W(In), W(n).id)), G("change", g, (e) => qn(W(In), W(n).id, "date", e.target.value)), G("change", _, (e) => qn(W(In), W(n).id, "text", e.target.value)), G("change", y, (e) => qn(W(In), W(n).id, "href", e.target.value)), G("change", C, (e) => Xn(W(In), W(n).id, e)), q(e, i);
						});
						var c = V(s, 2), l = (e) => {
							q(e, As());
						};
						Y(c, (e) => {
							W(t).entries.length || e(l);
						}), M(2), G("click", i, () => Kn(W(In))), G("click", a, () => Gn(W(In))), q(e, n);
					};
					Y(i, (e) => {
						W(In) && W(Fn)[W(In)] && e(a);
					});
					var s = V(i, 2), c = V(z(s));
					Z(c), j(s);
					var l = V(s, 2);
					$(V(z(l)), {
						get value() {
							return W(Rn);
						},
						get options() {
							return zn;
						},
						onchange: (e) => L(Rn, e, !0)
					}), j(l);
					var u = V(l, 2);
					j(t), H((e) => u.disabled = e, [() => !W(Ln).trim()]), G("keydown", c, (e) => e.key === "Enter" && U()), ci(c, () => W(Ln), (e) => L(Ln, e)), G("click", u, U), q(e, t);
				}, b = (e) => {
					var t = Vs(), n = V(z(t), 2), r = (e) => {
						q(e, Ns());
					}, i = /* @__PURE__ */ P(() => !sr().length);
					Y(n, (e) => {
						W(i) && e(r);
					});
					var a = V(n, 2);
					zr(a, 16, sr, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => tr[t]), r = /* @__PURE__ */ P(() => (W(er)?.enabled ?? []).includes(t));
						var i = Is();
						let a;
						var s = z(i), c = z(s), l = z(c, !0);
						j(c);
						var u = V(c, 2), d = (e) => {
							var t = Ps(), r = z(t);
							j(t), H(() => J(r, `v${W(n).version ?? ""}`)), q(e, t);
						};
						Y(u, (e) => {
							W(n)?.version && e(d);
						});
						var f = V(u, 2), p = z(f), m = z(p);
						Z(m);
						var h = V(m);
						j(p);
						var g = V(p, 2);
						X(g, () => o.cross, !0), j(g), j(f), j(s);
						var _ = V(s, 2), v = (e) => {
							var t = Fs(), r = z(t, !0);
							j(t), H((e) => J(r, e), [() => W(n).errors.join("; ")]), q(e, t);
						}, y = (e) => {
							var t = Fs(), r = z(t);
							j(t), H(() => J(r, `Krever motorversjon ${W(n).requiresEngine ?? ""} (denne siden kjører ${W(nr) ?? ""}); pluginen hoppes over ved lasting.`)), q(e, t);
						}, b = (e) => {
							var t = Fs(), r = z(t);
							j(t), H((e) => J(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(W(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(W(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), q(e, t);
						};
						Y(_, (e) => {
							W(n)?.errors?.length ? e(v) : W(n) && !W(n).satisfied ? e(y, 1) : W(n)?.csp && e(b, 2);
						}), j(i), H((e) => {
							a = Xr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": W(n)?.errors?.length }), J(l, W(n)?.name ?? t), ii(p, "title", W(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, W(r)), m.disabled = e, J(h, ` ${W(r) ? "På" : "Av"}`);
						}, [() => !!W(n)?.errors?.length]), G("change", m, (e) => pr(t, e.target.checked)), G("click", g, () => hr(t)), q(e, i);
					});
					var s = V(a, 2), c = (e) => {
						var t = Rs();
						zr(V(B(t), 4), 16, () => W(ar), (e) => e, (e, t) => {
							var n = Ls(), r = z(n), i = z(r), a = z(i, !0);
							j(i);
							var s = V(i, 2), c = (e) => {
								var n = Ps(), r = z(n);
								j(n), H(() => J(r, `v${tr[t].version ?? ""}`)), q(e, n);
							};
							Y(s, (e) => {
								tr[t]?.version && e(c);
							});
							var l = V(s, 2), u = z(l);
							X(u, () => o.right, !0), j(u), j(l), j(r), j(n), H(() => J(a, tr[t]?.name ?? t)), G("click", u, () => _r(t)), q(e, n);
						}), q(e, t);
					};
					Y(s, (e) => {
						W(ar).length && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = kr(), n = B(t), r = (e) => {
							q(e, zs());
						};
						Y(n, (e) => {
							W(ar).length || e(r);
						}), q(e, t);
					}, d = (e) => {
						var t = Bs(), n = V(B(t), 2);
						Z(n);
						var r = V(n, 2), i = V(r, 2), a = (e) => {
							var t = Fs(), n = z(t, !0);
							j(t), H(() => J(n, W(ir))), q(e, t);
						};
						Y(i, (e) => {
							W(ir) && e(a);
						}), H((e) => r.disabled = e, [() => !W(rr).trim()]), G("keydown", n, (e) => e.key === "Enter" && gr()), ci(n, () => W(rr), (e) => L(rr, e)), G("click", r, gr), q(e, t);
					};
					Y(l, (e) => {
						W(or) === "ok" ? e(u) : e(d, -1);
					}), j(t), q(e, t);
				}, S = (e) => {
					var t = Ks(), n = V(z(t), 2), r = (e) => {
						q(e, Hs());
					}, i = (e) => {
						var t = Ao(), n = B(t), r = (e) => {
							var t = Us(), n = z(t, !0);
							j(t), H(() => J(n, W(zt))), q(e, t);
						};
						Y(n, (e) => {
							W(zt) && e(r);
						});
						var i = V(n, 2), a = (e) => {
							var t = Gs(), n = B(t);
							zr(V(n, 2), 19, () => W(Rt), (e) => e.sha, (e, t, n) => {
								var r = Ws();
								let i;
								var a = z(r), o = z(a, !0);
								j(a);
								var s = V(a, 2), c = z(s);
								j(s), j(r), H((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), ii(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${Ht.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), H(() => {
								n.disabled = W(Bt) || !W(v)?.allowed, ii(n, "title", W(v)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, Wt), q(e, t);
						};
						Y(i, (e) => {
							W(Rt).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(Rt) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(s, (e) => {
					W(we) === "Sider" ? e(c) : W(we) === "Nav" ? e(l, 1) : W(we) === "Tema" ? e(d, 2) : W(we) === "Blokker" ? e(f, 3) : W(we) === "Grid" ? e(p, 4) : W(we) === "Egenskaper" ? e(h, 5) : W(we) === "Footer" ? e(g, 6) : W(we) === "Samlinger" ? e(_, 7) : W(we) === "Plugins" ? e(b, 8) : W(we) === "Historikk" && e(S, 9);
				}), j(t), H(() => J(a, W(we))), q(e, t);
			};
			Y(a, (e) => {
				W(we) && e(s);
			}), q(e, t);
		};
		Y(n, (e) => {
			W(b) && e(a);
		});
		var s = V(n, 2);
		let c;
		var l = z(s);
		fi(l, (e) => L(_, e), () => W(_)), j(s), j(t), H(() => {
			c = Xr(s, 1, "frame-wrap svelte-1n46o8q", null, c, { mobile: W(x) === "mobile" }), ii(l, "src", `/?page=${W(u)}&preview=1`);
		}), br("load", l, Yt), vr(l), q(e, t);
	}, la = (e) => {
		q(e, Xs());
	};
	Y(sa, (e) => {
		W(l) ? e(ca) : e(la, -1);
	});
	var fa = V(sa, 2), pa = (e) => {
		ia(e, {
			get image() {
				return W(mn);
			},
			onapply: gn,
			oncancel: () => L(mn, null)
		});
	};
	Y(fa, (e) => {
		W(mn) && e(pa);
	});
	var ha = V(fa, 2), va = (e) => {
		var t = Qs(), n = z(t), r = z(n), i = z(r, !0);
		j(r);
		var a = V(r, 2);
		zr(a, 16, () => W(he).lines, (e) => e, (e, t) => {
			var n = Zs(), r = z(n, !0);
			j(n), H(() => J(r, t)), q(e, n);
		});
		var o = V(a, 2), s = z(o), c = z(s, !0);
		j(s);
		var l = V(s, 2), u = z(l, !0);
		j(l), j(o), j(n), j(t), H(() => {
			J(i, W(he).title), J(c, W(he).cancelLabel), J(u, W(he).okLabel);
		}), G("click", s, () => _e(!1)), G("click", l, () => _e(!0)), q(e, t);
	};
	Y(ha, (e) => {
		W(he) && e(va);
	});
	var ba = V(ha, 2), xa = (e) => {
		var t = $s(), n = z(t), r = V(z(n), 4), i = V(z(r));
		Z(i), j(r);
		var a = V(r, 2);
		Ti(V(z(a)), {
			get value() {
				return W(be);
			},
			label: "Aksentfarge",
			onchange: (e) => L(be, e, !0)
		}), j(a);
		var o = V(a, 2);
		Ti(V(z(o)), {
			get value() {
				return W(xe);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => L(xe, e, !0)
		}), j(o);
		var s = V(o, 4), c = z(s), l = V(c, 2);
		j(s), j(n), j(t), H((e) => l.disabled = e, [() => !W(ye).trim()]), G("keydown", i, (e) => e.key === "Enter" && Ce()), ci(i, () => W(ye), (e) => L(ye, e)), G("click", c, Se), G("click", l, Ce), q(e, t);
	};
	Y(ba, (e) => {
		W(ve) && e(xa);
	});
	var Sa = V(ba, 2), Ca = (e) => {
		var t = ec();
		let n;
		var r = z(t), i = z(r, !0);
		j(r);
		var a = V(r, 2);
		j(t), H(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(p) === "ok",
				error: W(p) === "error"
			}), J(i, W(f));
		}), G("click", a, () => g("")), q(e, t);
	};
	Y(Sa, (e) => {
		W(f) && e(Ca);
	}), j(Vi);
	var wa = V(Vi, 2), Ta = (e) => {
		var t = tc(), n = z(t), i = z(n), a = z(i);
		j(i);
		var s = V(i, 2);
		X(s, () => o.cross, !0), j(s), j(n);
		var c = V(n, 2), l = z(c);
		r(l), j(c), j(t), H(() => {
			Qr(t, `left: ${W(ke).left ?? ""}px; top: ${W(ke).top ?? ""}px`), J(a, `${We[W(k).type] ?? W(k).type ?? ""}-blokk`);
		}), G("click", s, () => L(ke, null)), q(e, t);
	};
	Y(wa, (e) => {
		W(ke) && W(k) && e(Ta);
	}), H(() => Gi = Xr(Wi, 1, "topbar svelte-1n46o8q", null, Gi, { hidden: !W(b) })), q(e, Bi), Ue();
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
var ic = Ar(rc, { target: document.getElementById("urd-admin") });
//#endregion
export { ic as default };
