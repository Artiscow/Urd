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
var Se = {}, Ce = Symbol("uninitialized"), we = "http://www.w3.org/1999/xhtml", k = "http://www.w3.org/2000/svg", Te = "http://www.w3.org/1998/Math/MathML";
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
	if (e === null) throw De(), Se;
	return j = e;
}
function je() {
	return Ae(/* @__PURE__ */ ln(j));
}
function M(e) {
	if (A) {
		if (/* @__PURE__ */ ln(j) !== null) throw De(), Se;
		j = e;
	}
}
function N(e = 1) {
	if (A) {
		for (var t = e, n = j; t--;) n = /* @__PURE__ */ ln(n);
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
	if (Ge.length === 0 && !kt) {
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
	let i = e[ce];
	i ? e[ce] = () => {
		i(), r(!0);
	} : e[ce] = () => r(!0), ot();
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
			return Ft.ensure(), e();
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
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), A && (Ae(this.#t), N(), Ae(Me()));
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
	return W !== null && (W.f |= C), {
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
		parent: W,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = W;
	r === null && de();
	var i = void 0, a = Jt(Ce), o = !U, s = /* @__PURE__ */ new Set();
	return Cn(() => {
		var t = W, n = p();
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
	if (!Bn && r !== null && e.v !== Ce && r.f & 24576) return Ee(), e.v;
	Wn(r);
	try {
		e.f &= ~E, xt(e), t = ir(e);
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
		t.ac.abort(le), t.ac = null;
	}), t.fn !== null && (t.teardown = d), or(t, 0), On(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && sr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, F = null, Dt = null, Ot = null, I = null, kt = !1, At = !1, jt = null, Mt = null, Nt = 0, Pt = 1, Ft = class e {
	id = Pt++;
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
		this.#e = !0, Nt++ > 1e3 && (this.#x(), Lt());
		for (let e of this.#u) this.#d.delete(e), Qe(e, g), this.schedule(e);
		for (let e of this.#d) Qe(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = jt = [], r = [], i = Mt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (F = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (jt = null, Mt = null, this.#h()) {
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
			At = !0, F = this, this.#g();
		} finally {
			Nt = 0, I = null, jt = null, Mt = null, At = !1, F = null, Ot = null, Kt.clear();
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
			!At && !kt && qe(() => {
				t.#e || t.flush();
			});
		}
		return F;
	}
	apply() {
		Ot = null;
	}
	schedule(e) {
		if (I = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (jt !== null && t === W && (U === null || !(U.f & 2))) return;
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
function It(e) {
	var t = kt;
	kt = !0;
	try {
		var n;
		for (e && (F !== null && !F.is_fork && F.flush(), n = e());;) {
			if (Je(), F === null) return n;
			F.flush();
		}
	} finally {
		kt = t;
	}
}
function Lt() {
	try {
		ge();
	} catch (e) {
		Xe(e, I);
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
	return U !== null && (!Hn || U.f & 131072) && We() && U.f & 4325394 && (Gn === null || !Gn.has(e)) && be(), Xt(e, n ? en(t) : t, Mt);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Kt.set(e, Bn ? t : e.v);
		var r = Ft.ensure();
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
				Ot?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= E), $t(u, _, n));
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
					let e = f(() => /* @__PURE__ */ L(Ce, u));
					r.set(t, e), Qt(o);
				}
			} else R(n, Ce), Qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(en(s ? e[n] : Ce), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === Ce ? void 0 : c;
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
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? en(e[t]) : Ce, u)), r.set(t, n)), G(n) === Ce) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(Ce, u)), r.set(d + "", p)) : R(p, Ce);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, en(n)), r.set(t, c));
			else {
				l = c.v !== Ce;
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
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[O] = void 0);
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
	var n = /* @__PURE__ */ cn(j);
	if (n === null) n = j.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), Ae(r), r;
	}
	return t && pn(n), Ae(n), n;
}
function B(e, t = !1) {
	if (!A) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (j?.nodeType !== 3) {
			var r = sn();
			return j?.before(r), Ae(r), r;
		}
		pn(j);
	}
	return j;
}
function V(e, t = 1, n = !1) {
	let r = A ? j : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!A) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), Ae(a), a;
		}
		pn(r);
	}
	return Ae(r), r;
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
	W === null && (U === null && he(e), me()), Bn && pe(e);
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
	if (e & 4) jt === null ? Ft.ensure().schedule(r) : jt.push(r);
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
	return gn(4 | w, e);
}
function xn(e) {
	Ft.ensure();
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
	return gn(te | C, e);
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
	return gn(32 | C, e);
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
		e.f ^= v, e.f & 1024 || (Qe(e, g), Ft.ensure().schedule(e));
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
	if (t & 2 && (e.f &= ~E), t & 4096) {
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
		e.ac.abort(le);
	}), e.ac = null);
	try {
		e.f |= ee;
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
		e.f ^= ee, qn = t, Jn = n, Yn = r, U = i, Gn = a, Ve(o), Hn = s, $n = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== Ce && $e(s), s.ac !== null && st(() => {
			s.ac.abort(le), s.ac = null, Qe(s, g);
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
	await Promise.resolve(), It();
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
	if (e.v === Ce) return !0;
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
		if (A) return Er(j, null), j;
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
	var n = j;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), Ae(n)), Er(n, n), n;
}
function Or() {
	if (A) return Er(j, null), j;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Er(t, n), e;
}
function J(e, t) {
	if (A) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = j), je();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[O] ??= e.nodeValue) && (e[O] = n, e.nodeValue = `${n}`);
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
			if (o && (n.c = o), a && (i.$$events = a), A && Er(t, null), l = e(t, i) || {}, A && (W.nodes.end = j, j === null || j.nodeType !== 8 || j.data !== "]")) throw De(), Se;
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
		} else A && (this.anchor = j), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	A && (r = j, je());
	var i = new Nr(e), a = n ? S : 0;
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
		r?.has(a) ? (a.f |= T, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var Lr;
function Rr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? Ae(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	A && je();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Br(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Hr(d, null, c)) : Fn(d) : Nn(d, () => {
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
			A && Ne(c) === "[!" != (e === 0) && (c = Me(), Ae(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = dn(), y = 0; y < e; y += 1) {
				A && j.nodeType === 8 && j.data === "]" && (c = j, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Vr(l, h ? c : Lr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(Lr ??= sn())), d.f |= T)), e > r.size && fe("", "", ""), A && e > 0 && Ae(Me()), !h) if (m.set(u, r), v) {
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
	h = !1, A && (c = j);
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
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Hr(_, null, n);
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
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Hr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Ur(e, S.prev, C.next), Ur(e, d, S), Ur(e, C, b), l = b, d = C, --v, p = [], m = [];
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
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = zr(l.next);
		var E = w.length;
		if (E > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.fix();
			}
			Fr(e, w, ee);
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
function Wr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		A && (o = Ae(/* @__PURE__ */ cn(c)));
	}
	H(() => {
		var e = W;
		if (s === (s = t() ?? "")) {
			A && je();
			return;
		}
		if (n && !A) {
			e.nodes = null, c.innerHTML = s, s !== "" && Er(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (A) {
				for (var a = j.data, l = je(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw De(), Se;
				Er(j, u), o = Ae(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? k : i ? Te : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Er(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
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
	var o = e[oe];
	if (A || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!A || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
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
	if (A || i !== t) {
		var a = Yr(t, r);
		(!A || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
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
	return e[ae] ??= {
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
		if (a = li(e) ? ui(a) : a, n(a), F !== null && r.add(F), await cr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (A && e.defaultValue !== e.value || dr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), F !== null && r.add(F)), wn(() => {
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
	var i = Be.r, a = W;
	return Sn(() => {
		var o, s;
		return wn(() => {
			o = s, s = r?.() || [], dr(() => {
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
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), G(u)) : (l && (l = !1, c = s ? dr(r) : r), c);
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
var hi = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), gi = /* @__PURE__ */ q("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), _i = /* @__PURE__ */ q("<button type=\"button\"></button>"), vi = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), yi = /* @__PURE__ */ q("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), bi = /* @__PURE__ */ q("<span class=\"cp-tokens svelte-zxiloo\"></span>"), xi = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Si = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ q("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), wi = /* @__PURE__ */ q("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Ti(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
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
		return C(...T(G(_), G(v), G(y)));
	}
	function ee() {
		let e = E();
		return G(b) >= .995 ? e : e + Math.round(G(b) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		R(x, ee(), !0), f = G(x), t.onchange?.(G(x));
	}
	function ne(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			R(_, t[0], !0), R(v, t[1], !0), R(y, t[2], !0);
		})(w(t[0], t[1], t[2])), R(b, t[3], !0), R(x, ee(), !0), !0) : !1;
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
		let e = G(p).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 236, window.innerWidth - 236 - 8)), r = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		R(g, {
			top: r,
			left: t
		}, !0), R(h, !0);
	}
	function D() {
		if (R(h, !1), f && f !== d) {
			let e = [f, ...G(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function ie(e, n) {
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
		ne(e.target.value) ? te() : R(x, E(), !0);
	}
	function se(e) {
		return (S(E()) ?? [
			0,
			0,
			0
		])[e];
	}
	function O(e, t) {
		let n = S(E()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			R(_, t[0], !0), R(v, t[1], !0), R(y, t[2], !0);
		})(w(...n)), te();
	}
	let ce = typeof window < "u" && "EyeDropper" in window;
	async function le() {
		try {
			ne((await new window.EyeDropper().open()).sRGBHex) && te();
		} catch {}
	}
	function ue(e) {
		ne(e) && te();
	}
	function de() {
		let e = ee();
		G(u).includes(e) || (R(u, [e, ...G(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(Re(G(u)))));
	}
	function fe(e) {
		R(u, G(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(Re(G(u))));
	}
	yn(() => {
		if (!G(h)) return;
		let e = (e) => {
			G(p) && !G(p).contains(e.target) && D();
		}, t = (e) => {
			e.key === "Escape" && D();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0);
		};
	});
	var pe = wi(), me = z(pe);
	let he;
	var ge = V(me, 2), _e = (e) => {
		var t = Ci(), i = z(t), a = z(i);
		M(i);
		var o = V(i, 2);
		Z(o);
		var s = V(o, 2);
		Z(s);
		var d = V(s, 2), f = z(d), p = V(f, 2);
		Z(p);
		var h = V(p, 2), S = (e) => {
			var t = hi();
			K("click", t, le), J(e, t);
		};
		X(h, (e) => {
			ce && e(S);
		}), M(d);
		var C = V(d, 2);
		Rr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = gi();
			Z(r), H((e) => {
				ii(r, "title", t), Q(r, e);
			}, [() => se(G(n))]), K("change", r, (e) => O(G(n), e.target.value)), J(e, r);
		}), M(C);
		var w = V(C, 2), T = (e) => {
			var t = vi(), i = B(t), a = V(z(i)), o = (e) => {
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
				var o = _i();
				let s;
				H(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), ii(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), K("click", o, () => ie(i(), a())), J(e, o);
			}), M(l), J(e, t);
		};
		X(w, (e) => {
			r().length && e(T);
		});
		var ee = V(w, 2), ne = V(z(ee));
		M(ee);
		var re = V(ee, 2), D = (e) => {
			var t = bi();
			Rr(t, 20, () => G(u), (e) => e, (e, t) => {
				var n = yi(), r = z(n), i = V(r, 2);
				M(n), H(() => {
					Qr(r, `background: ${t ?? ""}`), ii(r, "title", t);
				}), K("click", r, () => ue(t)), K("click", i, () => fe(t)), J(e, n);
			}), M(t), J(e, t);
		};
		X(re, (e) => {
			G(u).length && e(D);
		});
		var pe = V(re, 2), me = (e) => {
			var t = Si(), n = V(B(t), 2);
			Rr(n, 20, () => G(l), (e) => e, (e, t) => {
				var n = xi();
				H(() => {
					Qr(n, `background: ${t ?? ""}`), ii(n, "title", t);
				}), K("click", n, () => ue(t)), J(e, n);
			}), M(n), J(e, t);
		};
		X(pe, (e) => {
			G(l).length && e(me);
		}), M(t), H((e, n) => {
			Qr(t, `top: ${G(g).top ?? ""}px; left: ${G(g).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${G(_) ?? ""}, 100%, 50%)`), Qr(a, `left: ${G(v) * 100}%; top: ${(1 - G(y)) * 100}%`), Q(o, G(_)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${G(x) ?? ""}`), Q(p, G(x));
		}, [() => Math.round(G(b) * 100), () => E()]), K("pointerdown", i, ae), K("input", o, (e) => {
			R(_, Number(e.target.value), !0), te();
		}), K("input", s, (e) => {
			R(b, Number(e.target.value) / 100), te();
		}), K("change", p, oe), K("click", ne, de), J(e, t);
	};
	X(ge, (e) => {
		G(h) && e(_e);
	}), M(pe), fi(pe, (e) => R(p, e), () => G(p)), H((e, t, n) => {
		he = Xr(me, 1, "cp-swatch svelte-zxiloo", null, he, e), Qr(me, `background: ${t ?? ""}`), ii(me, "title", n), ii(me, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), K("click", me, () => G(h) ? D() : re()), J(e, pe), Ue();
}
br([
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
var Mi = /* @__PURE__ */ q("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Ni = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Pi = /* @__PURE__ */ q("<button type=\"button\"> </button>"), Fi = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ii = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Li = /* @__PURE__ */ q("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!></div>"), Ri = /* @__PURE__ */ q("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"> </button> <!></span>");
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
	], o = /* @__PURE__ */ L(en([])), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(en({
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
		let r = await ki(n, 256);
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
	var h = Ri(), g = z(h), _ = z(g, !0);
	M(g);
	var v = V(g, 2), y = (e) => {
		var r = Li(), i = z(r), s = (e) => {
			var t = Ni(), n = V(B(t), 2);
			Rr(n, 20, () => G(o), (e) => e, (e, t) => {
				var n = Mi(), r = z(n, !0);
				M(n), H(() => Y(r, t)), K("click", n, () => f(t)), J(e, n);
			}), M(n), J(e, t);
		};
		X(i, (e) => {
			G(o).length && e(s);
		});
		var l = V(i, 2);
		Rr(l, 17, () => a, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = Fi(), s = B(o), c = z(s, !0);
			M(s);
			var l = V(s, 2);
			Rr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Pi();
				let i;
				var a = z(r, !0);
				M(r), H(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), Y(a, t);
				}), K("click", r, () => f(t)), J(e, r);
			}), M(l), H(() => Y(c, i())), J(e, o);
		});
		var d = V(l, 2), h = (e) => {
			var t = Ii(), n = V(B(t), 2), r = V(n, 2);
			fi(r, (e) => R(c, e), () => G(c)), N(2), K("click", n, () => G(c).click()), K("change", r, p), J(e, t);
		};
		X(d, (e) => {
			t.onimage && e(h);
		}), M(r), H(() => Qr(r, `top: ${G(u).top ?? ""}px; left: ${G(u).left ?? ""}px`)), J(e, r);
	};
	X(v, (e) => {
		G(l) && e(y);
	}), M(h), fi(h, (e) => R(s, e), () => G(s)), H(() => {
		ii(g, "title", r()), ii(g, "aria-label", r()), Y(_, n() || "★");
	}), K("click", g, () => G(l) ? R(l, !1) : d()), J(e, h), Ue();
}
br(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Bi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n);
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
var Vi = /* @__PURE__ */ q("<button type=\"button\"> </button>"), Hi = /* @__PURE__ */ q("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ui = /* @__PURE__ */ q("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ L(!1), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(en({
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
	var f = Ui(), p = z(f), h = z(p), g = z(h, !0);
	M(h);
	var _ = V(h, 2), v = z(_, !0);
	M(_), M(p);
	var y = V(p, 2), b = (e) => {
		var t = Hi();
		Rr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = Vi();
			let s;
			var c = z(o, !0);
			M(o), H(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), Y(c, a());
			}), K("click", o, () => d(i())), J(e, o);
		}), M(t), H(() => Qr(t, `top: ${G(c).top ?? ""}px; left: ${G(c).left ?? ""}px; min-width: ${G(c).width ?? ""}px`)), J(e, t);
	};
	X(y, (e) => {
		G(o) && e(b);
	}), M(f), fi(f, (e) => R(s, e), () => G(s)), H((e) => {
		ii(p, "title", i()), p.disabled = a(), Y(g, e), Y(v, G(o) ? "▴" : "▾");
	}, [() => l()]), K("click", p, u), J(e, f), Ue();
}
br(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Wi = /* @__PURE__ */ q("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function Gi(e, t) {
	He(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(null), a = /* @__PURE__ */ L(1), o = /* @__PURE__ */ L(.5), s = /* @__PURE__ */ L(.5), c = /* @__PURE__ */ L(1), l = /* @__PURE__ */ L(1), u = /* @__PURE__ */ L(1);
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
	var h = Wi(), g = z(h), _ = V(z(g), 2), v = z(_);
	ii(v, "width", 220), ii(v, "height", 220), fi(v, (e) => R(r, e), () => G(r)), N(2), M(_);
	var y = V(_, 2), b = V(z(y)), x = z(b);
	M(b), M(y);
	var S = V(y, 2);
	Z(S);
	var C = V(S, 2), w = V(z(C)), T = z(w);
	M(w), M(C);
	var E = V(C, 2);
	Z(E);
	var ee = V(E, 2), te = V(z(ee)), ne = z(te);
	M(te), M(ee);
	var re = V(ee, 2);
	Z(re);
	var D = V(re, 2), ie = V(z(D)), ae = z(ie);
	M(ie), M(D);
	var oe = V(D, 2);
	Z(oe);
	var se = V(oe, 2), O = z(se), ce = V(O, 2);
	M(se);
	var le = V(se, 2), ue = z(le), de = V(ue, 2);
	M(le), M(g), M(h), H((e, t, n, r) => {
		Y(x, `${e ?? ""}x`), Y(T, `${t ?? ""}%`), Y(ne, `${n ?? ""}%`), Y(ae, `${r ?? ""}%`);
	}, [
		() => G(a).toFixed(2),
		() => Math.round(G(c) * 100),
		() => Math.round(G(l) * 100),
		() => Math.round(G(u) * 100)
	]), K("pointerdown", v, f), ci(S, () => G(a), (e) => R(a, e)), ci(E, () => G(c), (e) => R(c, e)), ci(re, () => G(l), (e) => R(l, e)), ci(oe, () => G(u), (e) => R(u, e)), K("click", O, () => R(u, 0)), K("click", ce, p), K("click", ue, () => t.oncancel?.()), K("click", de, m), J(e, h), Ue();
}
br(["pointerdown", "click"]);
var Ki = (e) => Math.round(e * 100) / 100;
function qi(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var Ji = {
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
					x: Ki(n.x * 100 / r.columns),
					w: Ki(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= qi(t.grid);
		return e;
	}
}, Yi = { 1: (e) => (e.grid = qi(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Xi(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Yi[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Zi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = Ji[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function Qi(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var $i = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ea(e, t) {
	let n = Qi(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Qi(t[2]), a = $i(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ta = /^[a-z0-9][a-z0-9-]*$/;
function na(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ta.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Qi(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function ra(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function ia(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var aa = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ia(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, oa = {
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
		let n = t.stops.map(ia).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, sa = {
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
		let n = ia(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ca = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", la = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ca, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ua = {
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
}, da = () => ({
	duration: 600,
	delay: 0
}), fa = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: da,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: da,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: da,
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
var pa = /* @__PURE__ */ q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), ma = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), ha = /* @__PURE__ */ q("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ga = /* @__PURE__ */ q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), _a = /* @__PURE__ */ q("<!> Ren visning", 1), va = /* @__PURE__ */ q("<!> Rediger", 1), ya = /* @__PURE__ */ q("<span class=\"who svelte-1n46o8q\"><!> </span>"), ba = /* @__PURE__ */ q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), xa = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Sa = /* @__PURE__ */ q("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Ca = /* @__PURE__ */ q("<button> </button>"), wa = /* @__PURE__ */ q("<!> <!>", 1), Ta = /* @__PURE__ */ q("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Ea = /* @__PURE__ */ q("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Da = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Oa = /* @__PURE__ */ q("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), ka = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Aa = /* @__PURE__ */ q("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), ja = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Ma = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), Na = /* @__PURE__ */ q("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt pillen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt pillen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: pillen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over pillen</label>", 1), Pa = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Sidestilt meny er en fast kolonne; på mobil vises den som topplinje med burger.</p>"), Fa = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bakgrunnsbildet\"></button>"), Ia = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Bildestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (høyde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i stripen: 0 = toppen, 100 = bunnen\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsfargen og dekkevnen over legger seg som et slør over bildet.</p>", 1), La = /* @__PURE__ */ q("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Ra = /* @__PURE__ */ q("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), za = /* @__PURE__ */ q("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Ba = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <label class=\"svelte-1n46o8q\">Variant <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), Va = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\"> <!></label>"), Ha = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), Ua = /* @__PURE__ */ q("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), Wa = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), Ga = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), Ka = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), qa = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"> </button>"), Ja = /* @__PURE__ */ q("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ya = /* @__PURE__ */ q("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Xa = /* @__PURE__ */ q("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), Za = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Qa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), $a = /* @__PURE__ */ q("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), eo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), to = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), no = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), ro = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), io = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tegn/emoji <span class=\"toolbar-row svelte-1n46o8q\"><!> <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), ao = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), oo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), so = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), co = /* @__PURE__ */ q("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), lo = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), uo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), fo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), po = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), mo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ho = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), go = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), _o = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), vo = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), yo = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), bo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), xo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), So = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), Co = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Samling <!></label>"), wo = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), To = /* @__PURE__ */ q("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Eo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), Do = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Oo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), ko = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), Ao = /* @__PURE__ */ q("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), jo = /* @__PURE__ */ q("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Mo = /* @__PURE__ */ q("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), No = /* @__PURE__ */ q("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), Po = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), Fo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), Io = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), Lo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), Ro = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), zo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Bo = /* @__PURE__ */ q("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Vo = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Ho = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Uo = /* @__PURE__ */ q("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Wo = /* @__PURE__ */ q("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Go = /* @__PURE__ */ q("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Ko = /* @__PURE__ */ q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), qo = /* @__PURE__ */ q("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Jo = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Yo = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Xo = /* @__PURE__ */ q("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Zo = /* @__PURE__ */ q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>");
function Qo(e, t) {
	He(t, !0);
	let n = [
		["color", aa],
		["gradient", oa],
		["glow", sa],
		["image", ua],
		["grain", la]
	], r = Object.fromEntries(n), i = {
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
	}, a = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], o = /* @__PURE__ */ L(en(localStorage.getItem("urd-admin-theme") ?? "graa"));
	yn(() => {
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
	let h = /* @__PURE__ */ L(null), g = /* @__PURE__ */ L(null), _ = /* @__PURE__ */ L(en({
		size: 16,
		snap: !0
	})), v = /* @__PURE__ */ L(!0), y = /* @__PURE__ */ L("desktop");
	yn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
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
		let e = G(E)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = $t?.hasDraft() || Object.values(nn).some((e) => e.hasDraft());
		R(l, e || C?.hasDraft() && !ne.has(G(c)) || w?.hasDraft() || Cn?.hasDraft() || t || !1, !0);
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
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), Et(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), x(), Ee(), Ve(C.data.sections.find((e) => e.id === G(Fe))), G(E).pages.some((e) => e.id === G(c)) ? T?.sendPage(G(c), C.data) : Et(G(E).pages[0].id, { keepHistory: !0 });
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
		if (t === "d") {
			if (e.target instanceof HTMLElement && (e.target.isContentEditable || [
				"INPUT",
				"TEXTAREA",
				"SELECT"
			].includes(e.target.tagName)) || !G(k) || G(y) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ue() : le());
	}
	async function fe() {
		R(s, Xi(await (await fetch("/content/site.json")).json()), !0), w = mi("urd-draft-site", () => G(s)), w.replace(Xi(w.data)), w.save(), ee(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), await Et(new URLSearchParams(location.search).get("page") ?? G(E).pages[0].id), await Fn(), await un(), await ft(), mt(), (G(E).site.setup === !0 || G(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (R(_e, G(E).site.title, !0), R(ve, G(E).theme.tokens.color.accent, !0), R(ye, G(E).theme.tokens.color.bg, !0), R(ge, !0));
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
		e && (I("setup", () => {
			G(E).site.title = e, G(E).nav.logo = {
				type: "text",
				value: e
			}, G(E).theme.tokens.color.accent = G(ve), G(E).theme.tokens.color.bg = G(ye), delete G(E).site.setup;
		}), be(), p("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let Se = /* @__PURE__ */ L(null), Ce = [
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
		R(Se, G(Se) === e ? null : e, !0), T?.sendShowGrid(G(Se) === "Grid"), G(Se) === "Historikk" && yt();
	}
	let k = /* @__PURE__ */ L(null);
	function Te(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ee() {
		if (!G(k)) return;
		let { block: e } = Te(G(k).sectionId, G(k).blockId);
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
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function De(e) {
		if (!e.blockId) {
			R(k, null);
			return;
		}
		R(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Ee();
	}
	function Oe(e, t) {
		let { section: n, block: r } = Te(G(k)?.sectionId, G(k)?.blockId);
		r && (O(e), t(r, n), S(n, "blokk-endret"), C.save(), D(), T?.sendSection(G(c), n), Ee());
	}
	function A(e, t) {
		Oe(`edit:${G(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function ke(e, t) {
		Number.isFinite(t) && Oe(`edit:frame-${G(k).blockId}:${e}`, (n) => {
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
			Oe(`edit:${G(k).blockId}`, (n) => {
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
	], Fe = /* @__PURE__ */ L(null), Ie = /* @__PURE__ */ L(null), Le = /* @__PURE__ */ L(""), ze = /* @__PURE__ */ L(en([])), Be = /* @__PURE__ */ L(null);
	function Ve(e) {
		R(Ie, e?.grid ? { ...e.grid } : null, !0), R(Le, e?.size?.minHeight ?? "", !0), R(ze, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), R(Be, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function We(e) {
		R(Fe, e.sectionId, !0), Ve(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Ge(e, t) {
		let n = C.data.sections.find((e) => e.id === G(Fe));
		n && (O(e), t(n), C.save(), D(), T?.sendSection(G(c), n), Ve(n));
	}
	let Ke = /* @__PURE__ */ L("color");
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
		Ge(`edit:bg-${G(Fe)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Ze(e, t, n) {
		Ge(`edit:bg-${G(Fe)}-${e}-stop${t}`, (r) => {
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
	let et = () => Object.entries(G(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function tt(e) {
		return {
			type: e,
			version: fa[e].version,
			props: fa[e].defaults()
		};
	}
	function nt(e) {
		Oe(`edit:anim-${G(k).blockId}`, (t) => {
			t.animation = e ? tt(e) : null;
		}), G(k) && T?.sendDemoAnim(G(k).sectionId, G(k).blockId);
	}
	function rt(e, t) {
		Number.isFinite(t) && (Oe(`edit:anim-${G(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), G(k) && T?.sendDemoAnim(G(k).sectionId, G(k).blockId));
	}
	function at(e) {
		Ge("section-anim", (t) => {
			t.animation = e ? tt(e) : null;
		}), T?.sendDemoAnim(G(Fe));
	}
	function ot(e, t) {
		Number.isFinite(t) && (Ge("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(G(Fe)));
	}
	function st(e) {
		let t = C.data.sections.find((e) => e.id === G(Fe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		O("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, R(Le, r, !0), C.save(), D(), T?.sendSection(G(c), t);
	}
	function ct() {
		return C.data.sections.find((e) => e.id === G(Fe)) ?? C.data.sections[0];
	}
	function lt(e) {
		let t = C.data.sections.find((e) => e.id === G(Fe));
		t && (O("grid:section"), t.grid = e ? { ...w.data.grid } : null, R(Ie, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(G(c), t), G(Se) === "Grid" && T?.sendShowGrid(!0));
	}
	function ut(e, t) {
		let n = C.data.sections.find((e) => e.id === G(Fe));
		n?.grid && (O("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, R(Ie, { ...n.grid }, !0), C.save(), D(), T?.sendSection(G(c), n), G(Se) === "Grid" && T?.sendShowGrid(!0));
	}
	function dt(e, t) {
		O("grid:site"), R(_, {
			...G(_),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), te(), G(Se) === "Grid" && T?.sendShowGrid(!0);
	}
	async function ft() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(g, await e.json(), !0) : e.status !== 503 && R(g, null);
		} catch {
			R(g, null);
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
			ok: await me({
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
	let gt = /* @__PURE__ */ L(null), _t = /* @__PURE__ */ L(""), vt = /* @__PURE__ */ L(!1);
	async function yt() {
		R(_t, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? R(gt, (await e.json()).commits, !0) : e.status === 401 ? (R(gt, [], !0), R(_t, "Logg inn med GitHub for å se historikken.")) : (R(gt, [], !0), R(_t, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			R(gt, [], !0), R(_t, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let bt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), xt = !1;
	async function St() {
		let e = G(gt)?.[0];
		if (!(!e || G(vt)) && await me({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			R(vt, !0), p("Angrer siste publisering…");
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
			R(vt, !1), yt();
		}
	}
	async function Ct() {
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
				id: ra("sec"),
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
		R(c, e, !0), wt = (async () => {
			let n = re(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Zi(await e.json(), w.data));
			} catch {}
			r ? ne.delete(e) : r = Tt(n), C = mi(`urd-draft-${e}`, () => r), C.replace(Zi(C.data, w.data)), C.save(), t || (oe = null), R(Fe, null), R(Ie, null), D(), x(), R(u, "");
		})(), await wt;
	}
	function F() {
		T?.destroy(), T = Bi(G(h), {
			onEdit: pr,
			onMove: mr,
			onGrow: hr,
			onDelete: q,
			onAddSection: Sr,
			onMoveSection: Cr,
			onDeleteSection: wr,
			onSectionSize: Tr,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: We,
			onSelectBlock: De,
			onReady: Dt,
			onNavigate: Ot,
			onAddBlock: (e) => jr(e.sectionId, e.block),
			onAddBlocks: (e) => Mr(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Lr,
			onMoveBlockSection: Er,
			onMobileManual: gr,
			onMobileAuto: vr,
			onReviewDone: br,
			onBlockFlag: xr,
			onCollectionEdit: mn,
			onPluginBlocks: (e) => {
				R(Fr, e.blocks ?? [], !0);
			}
		});
	}
	async function Dt() {
		await wt, await Tn, T?.sendPlugins(Re(G(En))?.enabled ?? []), T?.sendViewport(G(y)), fn(), w.hasDraft() && te();
		let e = !G(s).pages.some((e) => e.id === G(c));
		(C.hasDraft() || e) && T?.sendPage(G(c), C.data), G(v) || T?.sendChrome(!1), G(Se) === "Grid" && T?.sendShowGrid(!0);
	}
	function Ot(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = G(E).pages.find((e) => e.path === t);
		n && n.id !== G(c) && Et(n.id);
	}
	function I(e, t) {
		O(e), t(), w.save(), D(), te();
	}
	let kt = /* @__PURE__ */ L(""), At = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function jt(e, t = null) {
		return e ? At.includes(e) ? `«${e}» er et reservert navn` : G(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Mt() {
		let e = G(kt).trim(), t = Ai(e), n = jt(t);
		if (n) {
			p(n, "error");
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
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(Tt({
			id: t,
			title: e
		}))), D(), R(kt, ""), Et(t);
	}
	function Nt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		I("pages", () => {
			e.title = n;
			for (let t of G(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === G(c) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(G(c), C.data)) : Pt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Pt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Zi(await t.json(), w.data));
		} catch {}
		r ||= Tt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function Ft(e, t) {
		let n = Ai(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = jt(n, e.id);
		if (r) {
			p(r, "error");
			return;
		}
		I("pages", () => {
			e.path = `/${n}`;
		});
	}
	function It(e) {
		e.path !== "/" && (I("pages", () => {
			G(E).pages = G(E).pages.filter((t) => t.id !== e.id), G(E).nav.items = G(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of G(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			G(E).nav.items = G(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === G(c) && Et(G(E).pages[0].id), p("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Lt(e) {
		I("edit:nav-logo", () => {
			G(E).nav.logo = {
				type: "text",
				value: "",
				...G(E).nav.logo,
				...e
			};
		});
	}
	function Rt(e) {
		I("nav", () => {
			G(E).nav.logo ??= {
				type: "text",
				value: G(E).site.title
			};
			let t = G(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = G(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = G(E).site.title), delete t.image), t.type = e;
		});
	}
	async function zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			I("nav", () => {
				let t = G(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Bt = /* @__PURE__ */ L(null);
	function Vt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			R(Bt, String(n.result), !0);
		}, n.onerror = () => p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function Ht(e) {
		I("edit:site-icon", () => {
			G(E).site.icon = e;
		}), R(Bt, null);
	}
	function Ut() {
		I("edit:site-icon", () => {
			delete G(E).site.icon;
		});
	}
	let Wt = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!G(E)?.site) return;
		let e = G(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			Wt.test(e) && (t.href = e);
		}
	});
	function Gt(e) {
		I("nav", () => {
			G(E).nav.layout = e;
		});
	}
	function Kt(e, t) {
		I(`edit:nav-style-${e}`, () => {
			G(E).nav.style ??= {}, G(E).nav.style[e] = t;
		});
	}
	function qt(e) {
		I("nav", () => {
			e === "bar" ? delete G(E).nav.variant : G(E).nav.variant = e;
		});
	}
	function Jt(e) {
		I("nav", () => {
			G(E).nav.style ??= {}, e ? G(E).nav.style.glow = !0 : delete G(E).nav.style.glow;
		});
	}
	function Yt(e) {
		I("nav", () => {
			G(E).nav.style ??= {}, e ? delete G(E).nav.style.topGap : G(E).nav.style.topGap = !1;
		});
	}
	function Xt(e) {
		I("nav", () => {
			G(E).nav.style ??= {}, e === "standard" ? delete G(E).nav.style.hover : G(E).nav.style.hover = e;
		});
	}
	async function Zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			I("nav", () => {
				G(E).nav.style ??= {}, G(E).nav.style.image = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Qt() {
		I("nav", () => {
			G(E).nav.style && delete G(E).nav.style.image;
		});
	}
	let $t = null, nn = {}, rn = /* @__PURE__ */ L(en([])), an = /* @__PURE__ */ L(en({})), on = /* @__PURE__ */ L(null), sn = /* @__PURE__ */ L(""), cn = /* @__PURE__ */ L("news"), ln = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function un() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		$t = mi("urd-draft-samlinger", () => e), R(rn, [...$t.data.samlinger ?? []], !0);
		for (let e of G(rn)) {
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
			}, nn[e] = mi(`urd-draft-samling-${e}`, () => t);
		}
		dn();
	}
	function dn(e = !0) {
		let t = {};
		for (let e of G(rn)) nn[e] && (t[e] = JSON.parse(JSON.stringify(nn[e].data)));
		R(an, t, !0), e && fn();
	}
	function fn() {
		T?.sendCollections(Re(G(an)) ?? {});
	}
	function pn(e, t, n = !0) {
		let r = nn[e];
		r && (t(r.data), r.save(), D(), dn(n));
	}
	function mn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || pn(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function hn() {
		let e = G(sn).trim();
		if (!e) return;
		let t = Ai(e);
		if (!t || G(rn).includes(t)) {
			p(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: G(cn),
			entries: []
		};
		nn[t] = mi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), nn[t].replace(n), nn[t].save(), $t.data.samlinger = [...G(rn), t], $t.save(), R(rn, [...G(rn), t], !0), R(on, t, !0), R(sn, ""), D(), dn();
	}
	function gn(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete nn[e], $t.data.samlinger = G(rn).filter((t) => t !== e), $t.save(), R(rn, G(rn).filter((t) => t !== e), !0), G(on) === e && R(on, null), D(), dn();
	}
	function _n(e) {
		pn(e, (e) => {
			e.entries.unshift({
				id: ra("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function vn(e, t, n, r) {
		pn(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function bn(e, t, n) {
		pn(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function xn(e, t) {
		pn(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Sn(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && vn(e, t, "image", (await ki(r)).dataUrl);
	}
	let Cn = null, wn, Tn = new Promise((e) => {
		wn = e;
	}), En = /* @__PURE__ */ L(null), Dn = en({}), On = /* @__PURE__ */ L("0.0.0"), kn = /* @__PURE__ */ L(""), An = /* @__PURE__ */ L(""), jn = /* @__PURE__ */ L(en([])), Mn = /* @__PURE__ */ L("pending"), Nn = () => [.../* @__PURE__ */ new Set([...G(En)?.enabled ?? [], ...G(En)?.disabled ?? []])];
	function Pn() {
		R(En, JSON.parse(JSON.stringify(Cn.data)), !0);
	}
	async function Fn() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		Cn = mi("urd-draft-plugins", () => e), Pn();
		try {
			R(On, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Nn()) Rn(e);
		In(), wn(), T?.sendPlugins(Re(G(En))?.enabled ?? []);
	}
	async function In() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ln();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), R(jn, (t ?? []).filter((e) => !Nn().includes(e)), !0);
			for (let e of G(jn)) Rn(e);
			R(Mn, "ok");
		} catch {
			Ln();
		}
	}
	function Ln() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				R(jn, e.filter((e) => !Nn().includes(e)), !0);
				for (let e of G(jn)) Rn(e);
				R(Mn, "ok");
				return;
			}
		} catch {}
		R(Mn, "unavailable");
	}
	async function Rn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = na(t);
			Dn[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ea(G(On), t.requiresEngine)
			};
		} catch {
			Dn[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function zn(e, t) {
		let n = Cn.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Cn.save(), D(), Pn(), Bn();
	}
	function Bn() {
		G(h) && (G(h).src = G(h).src);
	}
	function Vn(e) {
		let t = Cn.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Cn.save(), D(), Pn(), Bn();
	}
	async function U() {
		R(An, "");
		let e = G(kn).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			R(An, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Nn().includes(e)) {
			R(An, "Pluginen står allerede i listen");
			return;
		}
		if (await Rn(e), Dn[e].errors.length) {
			R(An, `Fant ingen gyldig plugin: ${Dn[e].errors.join("; ")}`);
			return;
		}
		zn(e, !0), R(kn, "");
	}
	function Hn(e) {
		R(jn, G(jn).filter((t) => t !== e), !0), zn(e, !0);
	}
	function Un(e, t) {
		I(e, () => {
			G(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(G(E).footer);
		});
	}
	function W(e, t) {
		I(`edit:nav-label-${e}`, () => {
			G(E).nav.items[e].label = t;
		});
	}
	function Wn(e, t) {
		I("nav", () => {
			let n = G(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Gn(e, t) {
		I(`edit:nav-href-${e}`, () => {
			G(E).nav.items[e].href = t;
		});
	}
	function Kn(e, t) {
		let n = e + t, r = G(E).nav.items;
		n < 0 || n >= r.length || I("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function qn(e) {
		I("nav", () => {
			G(E).nav.items.splice(e, 1);
		});
	}
	function Jn() {
		I("nav", () => {
			G(E).nav.items.push({
				label: "Lenke",
				page: G(E).pages[0].id
			});
		});
	}
	function Yn(e) {
		I("nav", () => {
			let t = G(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: G(E).pages[0].id
			});
		});
	}
	function Xn(e, t, n) {
		I(`edit:nav-child-label-${e}-${t}`, () => {
			G(E).nav.items[e].children[t].label = n;
		});
	}
	function Zn(e, t, n) {
		I("nav", () => {
			let r = G(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Qn(e, t, n) {
		I(`edit:nav-child-href-${e}-${t}`, () => {
			G(E).nav.items[e].children[t].href = n;
		});
	}
	function $n(e, t, n) {
		let r = t + n, i = G(E).nav.items[e].children;
		r < 0 || r >= i.length || I("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function er(e, t) {
		I("nav", () => {
			let n = G(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = G(E).pages[0].id));
		});
	}
	let tr = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function nr(e, t) {
		I(`edit:theme-color-${e}`, () => {
			G(E).theme.tokens.color[e] = t;
		});
	}
	function rr(e, t) {
		I("theme", () => {
			G(E).theme.tokens.font[e] = t;
		});
	}
	function ir(e, t) {
		I("theme", () => {
			G(E).theme.tokens.radius[e] = t;
		});
	}
	function ar(e) {
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
	function or() {
		return Object.fromEntries(Object.entries(G(E).theme.tokens.color).map(([e, t]) => [e, ar(t)]));
	}
	function sr() {
		I("theme", () => {
			G(E).theme.alt = { tokens: { color: or() } };
		});
	}
	function cr() {
		I("theme", () => {
			G(E).theme.alt.tokens.color = or();
		});
	}
	function lr() {
		I("theme", () => {
			delete G(E).theme.alt;
		});
	}
	function ur(e, t) {
		I(`edit:theme-alt-${e}`, () => {
			G(E).theme.alt.tokens.color[e] = t;
		});
	}
	function dr(e) {
		I("theme", () => {
			e === "light" ? delete G(E).theme.scheme : G(E).theme.scheme = e;
		});
	}
	function fr() {
		R(v, !G(v)), T?.sendChrome(G(v));
	}
	function pr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (O(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), G(k)?.blockId === e.blockId && Ee(), e.rerender && T?.sendSection(G(c), t), R(u, ""));
	}
	function mr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		O(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && S(t, "desktop-endret-etter-mobil"), C.save(), D(), G(k)?.blockId === e.blockId && Ee();
	}
	function hr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O(`edit:${e.blockId}`), t.frames.desktop.h = e.h, C.save(), D(), G(k)?.blockId === e.blockId && Ee());
	}
	function gr(e) {
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
	function vr(e) {
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
	function br(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (O("review-done"), t.responsive.mobile.attention = null, C.save(), D(), x());
	}
	function xr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (O("decor"), t.decor = e.decor, C.save(), D(), G(k)?.blockId === e.blockId && Ee());
	}
	function Sr(e) {
		O("add-section"), e.section.id || (e.section.id = ra("sec")), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(G(c), C.data), R(Fe, e.section.id, !0), Ve(e.section), G(Se) !== "Egenskaper" && (R(Se, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function Cr(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (O("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(G(c), C.data));
	}
	function wr(e) {
		O("delete-section"), e.sectionId === G(Fe) && (R(Fe, null), R(Ie, null)), G(k)?.sectionId === e.sectionId && R(k, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(G(c), C.data);
	}
	function Tr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === G(Fe) && R(Le, e.minHeight, !0), C.save(), D());
	}
	function Er(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (O("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), S(t, "blokk-flyttet"), S(n, "blokk-flyttet"), C.save(), D(), x(), T?.sendPage(G(c), C.data), G(k)?.blockId === e.blockId && (R(k, {
			...G(k),
			sectionId: e.toSectionId
		}, !0), Ee()));
	}
	function q(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), G(k)?.blockId === e.blockId && R(k, null), S(t, "blokk-slettet"), C.save(), D(), T?.sendSection(G(c), t));
	}
	let Dr = {
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
	function kr(e) {
		let t = Dr[e];
		return t ? {
			id: ra("blk"),
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
	function Ar(e) {
		T ? T.sendPlaceBlock(e) : jr(ct()?.id, e);
	}
	function jr(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		O("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), S(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(c), n);
	}
	function Mr(e, t, n, r) {
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
	function Nr(e) {
		Ar(kr(e));
	}
	let Fr = /* @__PURE__ */ L(en([]));
	function Ir(e, t = {}) {
		Ar({
			id: ra("blk"),
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
	function Lr(e) {
		let t = kr(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, jr(e.sectionId, t), e.kind === "image" && p("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function zr(e) {
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
		let r = Math.round(n.height / n.width * .3 * (G(h)?.clientWidth ?? 1280));
		Ar({
			id: ra("blk"),
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
	function Br(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ai(n || "bilde")}-${ji(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Vr(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && Br(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && Br(e.props, "src", e.props.alt, t), e.type === "icon" && Br(e.props, "image", "ikon", t);
		}
		return t;
	}
	function Hr(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Br(n, "value", "logo", t), n?.type === "both" && Br(n, "image", "logo", t), e.nav?.style && Br(e.nav.style, "image", "meny", t), Br(e.site, "icon", "ikon", t), t;
	}
	let Ur = /* @__PURE__ */ L(!1);
	function Gr() {
		if (!G(Ur)) {
			R(Ur, !0);
			return;
		}
		R(Ur, !1), Kr();
	}
	yn(() => {
		if (!G(Ur)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || R(Ur, !1);
		}, t = (e) => {
			e.key === "Escape" && R(Ur, !1);
		}, n = () => R(Ur, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Kr() {
		O("discard");
		for (let e of G(E).pages) e.id !== G(c) && !ne.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), Cn && (Cn.reset(), Pn()), $t) {
			$t.reset(), R(rn, [...$t.data.samlinger ?? []], !0);
			for (let e of Object.keys(nn)) G(rn).includes(e) ? nn[e].reset() : delete nn[e];
			dn();
		}
		ee(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), D(), R(u, ""), te(), G(E).pages.some((e) => e.id === G(c)) ? T?.sendPage(G(c), e) : Et(G(E).pages[0].id);
	}
	async function qr() {
		if (xt) {
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
					l = Zi(JSON.parse(e), w.data);
				} catch {}
			}
			if (!l && o && (l = Tt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...Vr(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(G(E)));
			e.push(...Hr(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(G(s).theme, G(E).theme) || t.push("tema"), i(G(s).nav, G(E).nav) || t.push("menyen"), i(G(s).footer, G(E).footer) || t.push("footeren"), i(G(s).pages, G(E).pages) || t.push("sideregisteret"), i(G(s).grid, G(E).grid) || t.push("gridet"), (G(s).site.icon ?? null) !== (G(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = G(s).site, { icon: c, ...l } = G(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		let i = Object.entries(nn).filter(([, e]) => e.hasDraft());
		if (i.length || $t?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Br(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if ($t?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify($t.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!G(rn).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		Cn?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Cn.data, null, 2) + "\n",
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
		for (let e of G(s).pages) {
			let t = G(E).pages.find((t) => t.id === e.id);
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
			e ? pt = e : mt(), Vr(C.data), Hr(G(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			if (R(s, JSON.parse(JSON.stringify(G(E))), !0), w = mi("urd-draft-site", () => G(s)), ee(), Cn) {
				let e = JSON.parse(JSON.stringify(Cn.data));
				Cn = mi("urd-draft-plugins", () => e), Pn();
			}
			if ($t) {
				for (let e of Object.values(nn)) for (let t of e.data.entries) Br(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify($t.data));
				$t = mi("urd-draft-samlinger", () => e);
				for (let e of G(rn)) {
					if (!nn[e]) continue;
					let t = JSON.parse(JSON.stringify(nn[e].data));
					nn[e] = mi(`urd-draft-samling-${e}`, () => t);
				}
				dn();
			}
			R(_, {
				snap: !0,
				...G(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = mi(`urd-draft-${G(c)}`, () => t), ne.has(G(c)) && localStorage.setItem(`urd-draft-${G(c)}`, JSON.stringify(t)), D(), p("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			p(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ft();
		} else d?.status === 403 ? p((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? p("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : p(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var Jr = Zo();
	yr("keydown", tn, de);
	var Yr = z(Jr), Zr = (e) => {
		var t = pa();
		Wr(z(t), () => i.pencil), N(), M(t), K("click", t, fr), J(e, t);
	};
	X(Yr, (e) => {
		G(v) || e(Zr);
	});
	var Qr = V(Yr, 2);
	let $r;
	var ei = z(Qr), ti = V(z(ei), 2);
	$(ti, {
		get value() {
			return G(o);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return a;
		},
		onchange: (e) => R(o, e, !0)
	});
	var ni = V(ti, 2), ai = (e) => {
		var t = ma(), n = B(t), r = z(n, !0);
		M(n);
		var a = V(n, 2), o = z(a);
		let s;
		Wr(o, () => i.desktop, !0), M(o);
		var c = V(o, 2);
		let l;
		Wr(c, () => i.phone, !0), M(c), M(a), H((e) => {
			Y(r, e), s = Xr(o, 1, "ghost svelte-1n46o8q", null, s, { active: G(y) === "desktop" }), l = Xr(c, 1, "ghost svelte-1n46o8q", null, l, { active: G(y) === "mobile" });
		}, [() => re()?.title ?? ""]), K("click", n, () => we("Sider")), K("click", o, () => R(y, "desktop")), K("click", c, () => R(y, "mobile")), J(e, t);
	};
	X(ni, (e) => {
		G(s) && e(ai);
	});
	var oi = V(ni, 2), si = (e) => {
		var t = ha(), n = z(t);
		Wr(n, () => i.phone);
		var r = V(n);
		M(t), H(() => Y(r, ` ${G(b) ?? ""} ${G(b) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), K("click", t, () => R(y, "mobile")), J(e, t);
	};
	X(oi, (e) => {
		G(b) > 0 && e(si);
	});
	var li = V(oi, 2), ui = (e) => {
		J(e, ga());
	};
	X(li, (e) => {
		G(l) && e(ui);
	}), M(ei);
	var di = V(ei, 2), pi = z(di), hi = (e) => {
		var t = xa(), n = B(t), r = z(n), a = (e) => {
			var t = _a();
			Wr(B(t), () => i.eye), N(), J(e, t);
		}, o = (e) => {
			var t = va();
			Wr(B(t), () => i.pencil), N(), J(e, t);
		};
		X(r, (e) => {
			G(v) ? e(a) : e(o, -1);
		}), M(n);
		var s = V(n, 2), c = (e) => {
			var t = ya(), n = z(t), r = (e) => {
				var t = Or();
				Wr(B(t), () => i.warn), J(e, t);
			};
			X(n, (e) => {
				G(g).allowed || e(r);
			});
			var a = V(n, 1, !0);
			M(t), H(() => {
				ii(t, "title", G(g).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Y(a, G(g).login);
			}), J(e, t);
		}, u = (e) => {
			J(e, ba());
		};
		X(s, (e) => {
			G(g)?.loggedIn ? e(c) : G(g) && e(u, 1);
		});
		var d = V(s, 2), f = V(d, 2);
		let p;
		var m = z(f, !0);
		M(f);
		var h = V(f, 2);
		H((e) => {
			ii(n, "title", G(v) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ii(d, "href", e), p = Xr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: G(Ur) }), f.disabled = !G(l), ii(f, "title", G(Ur) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), Y(m, G(Ur) ? "Sikker?" : "Forkast utkast"), h.disabled = !G(l);
		}, [() => re()?.path ?? "/"]), K("click", n, fr), K("click", f, Gr), K("click", h, qr), J(e, t);
	};
	X(pi, (e) => {
		G(s) && e(hi);
	}), M(di), M(Qr);
	var gi = V(Qr, 2), _i = (e) => {
		var t = Go(), r = z(t), a = (e) => {
			var t = Wo(), r = B(t);
			Rr(r, 21, () => Ce, Pr, (e, t, n) => {
				var r = wa(), i = B(r), a = (e) => {
					J(e, Sa());
				};
				X(i, (e) => {
					n > 0 && e(a);
				}), Rr(V(i, 2), 16, () => G(t), (e) => e, (e, t) => {
					var n = Ca();
					let r;
					var i = z(n, !0);
					M(n), H(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: G(Se) === t }), Y(i, t);
					}), K("click", n, () => we(t)), J(e, n);
				}), J(e, r);
			}), M(r);
			var a = V(r, 2), o = (e) => {
				var t = Uo(), r = z(t), a = z(r, !0);
				M(r);
				var o = V(r, 2), s = (e) => {
					var t = ka(), n = V(z(t), 2);
					Rr(n, 17, () => G(E).pages, (e) => e.id, (e, t) => {
						var n = Oa();
						let r;
						var a = z(n);
						Z(a);
						var o = V(a, 2), s = (e) => {
							J(e, Ta());
						}, l = (e) => {
							var n = Ea();
							Z(n), H((e) => Q(n, e), [() => G(t).path.slice(1)]), K("change", n, (e) => Ft(G(t), e.target.value)), J(e, n);
						};
						X(o, (e) => {
							G(t).path === "/" ? e(s) : e(l, -1);
						});
						var u = V(o, 2), d = z(u);
						Wr(d, () => i.right, !0), M(d);
						var f = V(d, 2), p = (e) => {
							var n = Da();
							Wr(n, () => i.cross, !0), M(n), K("click", n, () => It(G(t))), J(e, n);
						};
						X(f, (e) => {
							G(t).path !== "/" && e(p);
						}), M(u), M(n), H(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: G(t).id === G(c) }), Q(a, G(t).title), d.disabled = G(t).id === G(c);
						}), K("change", a, (e) => Nt(G(t), e.target.value)), K("click", d, () => Et(G(t).id)), J(e, n);
					});
					var r = V(n, 4);
					Z(r);
					var a = V(r, 2);
					N(2), M(t), H((e) => a.disabled = e, [() => !G(kt).trim()]), K("keydown", r, (e) => e.key === "Enter" && Mt()), ci(r, () => G(kt), (e) => R(kt, e)), K("click", a, Mt), J(e, t);
				}, l = (e) => {
					var t = Ba(), n = V(z(t), 2), r = V(z(n), 2), a = z(r), o = V(z(a));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.logo?.type ?? "text");
						$(o, {
							get value() {
								return G(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => Rt(e)
						});
					}
					M(a);
					var s = V(a, 2), c = (e) => {
						var t = Aa(), n = B(t);
						Z(n);
						var r = V(n, 2), i = z(r);
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv"], ...tr.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => Lt({ font: e || void 0 })
							});
						}
						var a = V(i, 2);
						Z(a);
						var o = V(a, 2);
						let s;
						var c = V(o, 2);
						let l;
						M(r), H((e) => {
							Q(n, G(E).nav.logo?.value ?? ""), Q(a, G(E).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: G(E).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!G(E).nav.logo?.italic })]), K("input", n, (e) => Lt({ value: e.target.value })), K("change", a, (e) => Lt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), K("click", o, () => Lt({ bold: G(E).nav.logo?.bold === !1 })), K("click", c, () => Lt({ italic: !G(E).nav.logo?.italic })), J(e, t);
					};
					X(s, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = ja(), n = B(t), r = z(n), i = z(r), a = V(i);
						M(r);
						var o = V(r, 2);
						Z(o);
						var s = V(o, 2);
						Z(s), M(n), N(2), H(() => {
							Y(i, `${(G(E).nav.logo?.type === "image" ? G(E).nav.logo?.value : G(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, G(E).nav.logo?.size ?? 32), Q(s, G(E).nav.logo?.radius ?? 0);
						}), K("change", a, zt), K("change", o, (e) => Lt({ size: Number(e.target.value) })), K("change", s, (e) => Lt({ radius: Number(e.target.value) })), J(e, t);
					};
					X(l, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = V(l, 2), f = (e) => {
						var t = Ma(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => G(E).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return G(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => Lt({ order: e })
							});
						}
						M(t), J(e, t);
					};
					X(d, (e) => {
						G(E).nav.logo?.type === "both" && e(f);
					}), N(2), M(r), M(n);
					var p = V(n, 2), m = V(z(p), 2), h = z(m), g = V(z(h));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ P(et);
						Ti(g, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Kt("bg", e)
						});
					}
					M(h);
					var _ = V(h, 2), v = V(z(_)), y = z(v);
					M(v), M(_);
					var b = V(_, 2);
					Z(b);
					var x = V(b, 2), S = z(x);
					Z(S), N(), M(x);
					var C = V(x, 2), w = V(z(C));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(et);
						Ti(w, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Kt("textColor", e)
						});
					}
					M(C);
					var T = V(C, 2), ee = V(z(T));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.layout ?? "right");
						$(ee, {
							get value() {
								return G(e);
							},
							options: [
								["right", "Høyre"],
								["center", "Midtstilt"],
								["left", "Venstre (etter logoen)"]
							],
							onchange: (e) => Gt(e)
						});
					}
					M(T);
					var te = V(T, 2), ne = z(te);
					Z(ne), N(), M(te);
					var re = V(te, 2), D = V(z(re));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.variant ?? "bar");
						$(D, {
							get value() {
								return G(e);
							},
							options: [
								["bar", "Stripe (standard)"],
								["floating", "Flytende (pille)"],
								["side-left", "Sidestilt venstre"],
								["side-right", "Sidestilt høyre"]
							],
							onchange: (e) => qt(e)
						});
					}
					M(re);
					var ie = V(re, 2), ae = (e) => {
						var t = Na(), n = B(t), r = z(n);
						Z(r), N(), M(n);
						var i = V(n, 2), a = z(i);
						Z(a), N(), M(i), H(() => {
							ri(r, G(E).nav.style?.glow === !0), ri(a, G(E).nav.style?.topGap !== !1);
						}), K("change", r, (e) => Jt(e.target.checked)), K("change", a, (e) => Yt(e.target.checked)), J(e, t);
					};
					X(ie, (e) => {
						G(E).nav.variant === "floating" && e(ae);
					});
					var oe = V(ie, 2), se = (e) => {
						J(e, Pa());
					};
					X(oe, (e) => {
						(G(E).nav.variant === "side-left" || G(E).nav.variant === "side-right") && e(se);
					});
					var O = V(oe, 2), ce = V(z(O));
					{
						let e = /* @__PURE__ */ P(() => G(E).nav.style?.hover ?? "standard");
						$(ce, {
							get value() {
								return G(e);
							},
							options: [
								["standard", "Standard (aksentfarge)"],
								["underline", "Understrek"],
								["pill", "Pille"],
								["lift", "Løft med glød"]
							],
							onchange: (e) => Xt(e)
						});
					}
					M(O);
					var le = V(O, 2), ue = z(le), de = z(ue), fe = V(de);
					M(ue);
					var pe = V(ue, 2), me = (e) => {
						var t = Fa();
						Wr(t, () => i.cross, !0), M(t), K("click", t, Qt), J(e, t);
					};
					X(pe, (e) => {
						G(E).nav.style?.image && e(me);
					}), M(le);
					var he = V(le, 2), ge = (e) => {
						var t = Ia(), n = B(t), r = V(z(n)), i = z(r);
						M(r), M(n);
						var a = V(n, 2);
						Z(a);
						var o = V(a, 2), s = V(z(o)), c = z(s);
						M(s), M(o);
						var l = V(o, 2);
						Z(l), N(2), H((e, t) => {
							Y(i, `${e ?? ""}%`), Q(a, G(E).nav.style?.imageOpacity ?? 1), Y(c, `${t ?? ""}%`), Q(l, G(E).nav.style?.imageY ?? 50);
						}, [() => Math.round((G(E).nav.style?.imageOpacity ?? 1) * 100), () => Math.round(G(E).nav.style?.imageY ?? 50)]), K("input", a, (e) => Kt("imageOpacity", Number(e.target.value))), K("input", l, (e) => Kt("imageY", Number(e.target.value))), J(e, t);
					};
					X(he, (e) => {
						G(E).nav.style?.image && e(ge);
					}), M(m), M(p);
					var _e = V(p, 2), ve = V(z(_e), 2), ye = z(ve);
					Rr(ye, 17, () => G(E).nav.items, Pr, (e, t, n) => {
						var r = za(), a = B(r), o = z(a);
						Z(o);
						var s = V(o, 2), c = z(s);
						Wr(c, () => i.plus, !0), M(c);
						var l = V(c, 2);
						l.disabled = n === 0, Wr(l, () => i.up, !0), M(l);
						var u = V(l, 2);
						Wr(u, () => i.down, !0), M(u);
						var d = V(u, 2);
						Wr(d, () => i.cross, !0), M(d), M(s);
						var f = V(s, 2), p = z(f);
						{
							let e = /* @__PURE__ */ P(() => G(t).page ?? (G(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ P(() => [
								...G(E).pages.map((e) => [e.id, e.title]),
								["__href", "Ekstern lenke"],
								...G(t).children ? [["__none", "Ingen lenke (kun åpner undermenyen)"]] : []
							]);
							$(p, {
								get value() {
									return G(e);
								},
								title: "Hvor lenken går",
								get options() {
									return G(r);
								},
								onchange: (e) => Wn(n, e)
							});
						}
						M(f);
						var m = V(f, 2), h = (e) => {
							var r = La();
							Z(r), H(() => Q(r, G(t).href)), K("change", r, (e) => Gn(n, e.target.value)), J(e, r);
						};
						X(m, (e) => {
							!G(t).page && G(t).href != null && e(h);
						}), M(a), Rr(V(a, 2), 17, () => G(t).children ?? [], Pr, (e, r, a) => {
							var o = Ra(), s = z(o);
							Z(s);
							var c = V(s, 2), l = z(c);
							l.disabled = a === 0, Wr(l, () => i.up, !0), M(l);
							var u = V(l, 2);
							Wr(u, () => i.down, !0), M(u);
							var d = V(u, 2);
							Wr(d, () => i.cross, !0), M(d), M(c);
							var f = V(c, 2), p = z(f);
							{
								let e = /* @__PURE__ */ P(() => G(r).page ?? "__href"), t = /* @__PURE__ */ P(() => [...G(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(p, {
									get value() {
										return G(e);
									},
									title: "Hvor lenken går",
									get options() {
										return G(t);
									},
									onchange: (e) => Zn(n, a, e)
								});
							}
							M(f);
							var m = V(f, 2), h = (e) => {
								var t = La();
								Z(t), H(() => Q(t, G(r).href ?? "")), K("change", t, (e) => Qn(n, a, e.target.value)), J(e, t);
							};
							X(m, (e) => {
								G(r).page || e(h);
							}), M(o), H(() => {
								Q(s, G(r).label), u.disabled = a === G(t).children.length - 1;
							}), K("input", s, (e) => Xn(n, a, e.target.value)), K("click", l, () => $n(n, a, -1)), K("click", u, () => $n(n, a, 1)), K("click", d, () => er(n, a)), J(e, o);
						}), H(() => {
							Q(o, G(t).label), u.disabled = n === G(E).nav.items.length - 1;
						}), K("input", o, (e) => W(n, e.target.value)), K("click", c, () => Yn(n)), K("click", l, () => Kn(n, -1)), K("click", u, () => Kn(n, 1)), K("click", d, () => qn(n)), J(e, r);
					});
					var be = V(ye, 2);
					N(2), M(ve), M(_e), M(t), H((e) => {
						Y(y, `${e ?? ""}%`), Q(b, G(E).nav.style?.bgOpacity ?? .85), ri(S, G(E).nav.style?.blur !== !1), ri(ne, G(E).nav.sticky !== !1), Y(de, `${G(E).nav.style?.image ? "Bytt bakgrunnsbilde" : "Bakgrunnsbilde i menyen"} `);
					}, [() => Math.round((G(E).nav.style?.bgOpacity ?? .85) * 100)]), K("input", b, (e) => Kt("bgOpacity", Number(e.target.value))), K("change", S, (e) => Kt("blur", e.target.checked)), K("change", ne, (e) => I("nav", () => {
						G(E).nav.sticky = e.target.checked;
					})), K("change", fe, Zt), K("click", be, Jn), J(e, t);
				}, u = (e) => {
					var t = Ka(), n = V(z(t), 2);
					Ti(V(z(n)), {
						get value() {
							return G(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => nr("bg", e)
					}), M(n);
					var r = V(n, 2);
					Ti(V(z(r)), {
						get value() {
							return G(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => nr("surface", e)
					}), M(r);
					var a = V(r, 2);
					Ti(V(z(a)), {
						get value() {
							return G(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => nr("text", e)
					}), M(a);
					var o = V(a, 2);
					Ti(V(z(o)), {
						get value() {
							return G(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => nr("accent", e)
					}), M(o);
					var s = V(o, 2), c = V(z(s));
					{
						let e = /* @__PURE__ */ P(() => G(E).theme.tokens.color["accent-text"] ?? G(E).theme.tokens.color.bg);
						Ti(c, {
							get value() {
								return G(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => nr("accent-text", e)
						});
					}
					M(s);
					var l = V(s, 2), u = V(z(l), 2), d = z(u), f = (e) => {
						var t = Ha(), n = B(t), r = V(z(n));
						{
							let e = /* @__PURE__ */ P(() => G(E).theme.scheme ?? "light");
							$(r, {
								get value() {
									return G(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => dr(e)
							});
						}
						M(n);
						var a = V(n, 4);
						Rr(a, 17, () => Object.entries(G(E).theme.alt.tokens.color), Pr, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(G(t), 1));
							let r = () => G(n)[0];
							var i = Va(), a = z(i), o = V(a);
							{
								let e = /* @__PURE__ */ P(() => `Alternativ ${r()}`);
								Ti(o, {
									get value() {
										return G(E).theme.alt.tokens.color[r()];
									},
									get label() {
										return G(e);
									},
									onchange: (e) => ur(r(), e)
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
						var o = V(a, 2), s = z(o), c = V(s, 2);
						Wr(c, () => i.cross, !0), M(c), M(o), K("click", s, cr), K("click", c, lr), J(e, t);
					}, p = (e) => {
						var t = Ua(), n = B(t);
						N(2), K("click", n, sr), J(e, t);
					};
					X(d, (e) => {
						G(E).theme.alt ? e(f) : e(p, -1);
					}), M(u), M(l);
					var h = V(l, 4), g = V(z(h));
					{
						let e = /* @__PURE__ */ P(() => [...tr.some(([, e]) => e === G(E).theme.tokens.font.heading) ? [] : [[G(E).theme.tokens.font.heading, "Egendefinert"]], ...tr.map(([e, t]) => [t, e])]);
						$(g, {
							get value() {
								return G(E).theme.tokens.font.heading;
							},
							get options() {
								return G(e);
							},
							onchange: (e) => rr("heading", e)
						});
					}
					M(h);
					var _ = V(h, 2), v = V(z(_));
					{
						let e = /* @__PURE__ */ P(() => [...tr.some(([, e]) => e === G(E).theme.tokens.font.body) ? [] : [[G(E).theme.tokens.font.body, "Egendefinert"]], ...tr.map(([e, t]) => [t, e])]);
						$(v, {
							get value() {
								return G(E).theme.tokens.font.body;
							},
							get options() {
								return G(e);
							},
							onchange: (e) => rr("body", e)
						});
					}
					M(_);
					var y = V(_, 4), b = V(z(y));
					Z(b), M(y);
					var x = V(y, 2), S = V(z(x));
					Z(S), M(x);
					var C = V(x, 4), w = V(z(C)), T = (e) => {
						var t = Wa();
						H(() => ii(t, "src", G(E).site.icon)), J(e, t);
					};
					X(w, (e) => {
						G(E).site.icon && e(T);
					}), M(C);
					var ee = V(C, 2), te = z(ee), ne = z(te), re = V(ne);
					M(te);
					var D = V(te, 2), ie = (e) => {
						var t = Ga(), n = B(t);
						Wr(n, () => i.pencil ?? "✎", !0), M(n);
						var r = V(n, 2);
						Wr(r, () => i.cross, !0), M(r), K("click", n, () => R(Bt, G(E).site.icon, !0)), K("click", r, Ut), J(e, t);
					};
					X(D, (e) => {
						G(E).site.icon && e(ie);
					}), M(ee), N(2), M(t), H(() => {
						Q(b, G(E).theme.tokens.radius.sm), Q(S, G(E).theme.tokens.radius.md), Y(ne, `${G(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), K("change", b, (e) => ir("sm", e.target.value)), K("change", S, (e) => ir("md", e.target.value)), K("change", re, Vt), J(e, t);
				}, d = (e) => {
					var t = Xa();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					M(i), M(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					M(c);
					var u = V(c, 2), d = V(u, 2), f = V(d, 2), p = V(f, 2), m = V(z(p), 2), h = z(m), g = V(h, 2), _ = V(g, 2), v = V(_, 2), b = V(v, 2);
					M(m), M(p);
					var x = V(p, 2), S = (e) => {
						var t = Ya(), n = V(z(t), 2);
						Rr(n, 21, () => G(Fr), (e) => e.type, (e, t) => {
							var n = Or(), r = B(n), i = (e) => {
								var n = Ja(), r = z(n), i = z(r, !0);
								M(r);
								var a = V(r, 2);
								Rr(a, 21, () => G(t).variants, (e) => e.label, (e, n) => {
									var r = qa(), i = z(r, !0);
									M(r), H(() => {
										ii(r, "title", `Fra pluginen ${G(t).plugin ?? ""}`), Y(i, G(n).label);
									}), K("click", r, () => Ir(G(t), G(n).props)), J(e, r);
								}), M(a), M(n), H(() => Y(i, G(t).label)), J(e, n);
							}, a = (e) => {
								var n = qa(), r = z(n, !0);
								M(n), H(() => {
									ii(n, "title", `Fra pluginen ${G(t).plugin ?? ""}`), Y(r, G(t).label);
								}), K("click", n, () => Ir(G(t))), J(e, n);
							};
							X(r, (e) => {
								G(t).variants?.length ? e(i) : e(a, -1);
							}), J(e, n);
						}), M(n), M(t), J(e, t);
					};
					X(x, (e) => {
						G(Fr).length && e(S);
					}), M(t), H(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: G(y) === "mobile" }), ii(t, "title", G(y) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), K("click", a, () => Nr("text")), K("click", o, () => Nr("text-box")), K("click", s, () => Nr("button")), K("change", l, zr), K("click", u, () => Nr("video")), K("click", d, () => Nr("icon")), K("click", f, () => Nr("samling")), K("click", h, () => Nr("shape-line")), K("click", g, () => Nr("shape-arrow")), K("click", _, () => Nr("shape-circle")), K("click", v, () => Nr("shape-rect")), K("click", b, () => Nr("shape-triangle")), J(e, t);
				}, f = (e) => {
					var t = Za(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					M(r), M(n);
					var a = V(n, 2);
					Z(a);
					var o = V(a, 2), s = z(o);
					Z(s), N(), M(o), N(2), M(t), H(() => {
						Y(i, `${G(_).size ?? ""} px`), Q(a, G(_).size), ri(s, G(_).snap !== !1);
					}), K("input", a, (e) => dt("size", Number(e.target.value))), K("change", s, (e) => dt("snap", e.target.checked)), J(e, t);
				}, p = (e) => {
					var t = xo(), r = z(t), a = (e) => {
						var t = lo(), n = B(t), r = z(n);
						M(n);
						var i = V(n, 2), a = (e) => {
							var t = Qa(), n = B(t), r = V(z(n));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.align ?? "left");
								$(r, {
									get value() {
										return G(e);
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
							var i = V(n, 2), a = z(i);
							Z(a), N(), M(i);
							var o = V(i, 2), s = V(z(o));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv fra tema"], ...tr.map(([e, t]) => [t, e])]);
								$(s, {
									get value() {
										return G(e);
									},
									get options() {
										return G(t);
									},
									onchange: (e) => A("font", e || null)
								});
							}
							M(o);
							var c = V(o, 4), l = z(c);
							let u;
							var d = V(l, 2);
							Rr(d, 17, () => je, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Ca();
								let o;
								var s = z(a, !0);
								M(a), H(() => {
									o = Xr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: G(k).props.size === i() }), ii(a, "title", `${i() ?? ""} px`), Y(s, r());
								}), K("click", a, () => A("size", i())), J(e, a);
							});
							var f = V(d, 2);
							Z(f), M(c), N(2), H((e) => {
								ri(a, e), u = Xr(l, 1, "tbtn svelte-1n46o8q", null, u, { active: !G(k).props.size }), Q(f, G(k).props.size ?? "");
							}, [() => !!G(k).props.box]), K("change", a, (e) => A("box", e.target.checked)), K("click", l, () => A("size", null)), K("change", f, (e) => A("size", e.target.value ? Number(e.target.value) : null)), J(e, t);
						}, o = (e) => {
							var t = eo(), n = B(t), r = V(z(n));
							Z(r), M(n);
							var i = V(n, 2), a = V(z(i));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...G(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(a, {
									get value() {
										return G(e);
									},
									get options() {
										return G(t);
									},
									onchange: (e) => {
										let t = e === "__href" ? null : e;
										Oe(`edit:${G(k).blockId}`, (e) => {
											e.props.page = t, t && (e.props.href = null);
										});
									}
								});
							}
							M(i);
							var o = V(i, 2), s = (e) => {
								var t = $a();
								Z(t), H(() => Q(t, G(k).props.href === "#" ? "" : G(k).props.href ?? "")), K("change", t, (e) => A("href", e.target.value || null)), J(e, t);
							};
							X(o, (e) => {
								G(k).props.page || e(s);
							});
							var c = V(o, 2);
							$(V(z(c)), {
								get value() {
									return G(k).props.style;
								},
								options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
								onchange: (e) => A("style", e)
							}), M(c), H(() => Q(r, G(k).props.label)), K("change", r, (e) => A("label", e.target.value)), J(e, t);
						}, s = (e) => {
							var t = to(), n = B(t), r = V(z(n));
							M(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), M(i);
							var o = V(i, 2), s = V(z(o));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.fit ?? "cover");
								$(s, {
									get value() {
										return G(e);
									},
									options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
									onchange: (e) => A("fit", e)
								});
							}
							M(o);
							var c = V(o, 2), l = V(z(c));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.radius ?? "");
								$(l, {
									get value() {
										return G(e);
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
							var u = V(c, 2), d = V(z(u));
							Z(d), M(u);
							var f = V(u, 2), p = V(z(f)), m = z(p);
							M(p), M(f);
							var h = V(f, 2);
							Z(h);
							var g = V(h, 2), _ = V(z(g)), v = z(_);
							M(_), M(g);
							var y = V(g, 2);
							Z(y);
							var b = V(y, 2), x = V(z(b)), S = z(x);
							M(x), M(b);
							var C = V(b, 2);
							Z(C);
							var w = V(C, 2), T = V(z(w)), E = z(T);
							M(T), M(w);
							var ee = V(w, 2);
							Z(ee);
							var te = V(ee, 2), ne = V(z(te)), re = z(ne);
							M(ne), M(te);
							var D = V(te, 2);
							Z(D);
							var ie = V(D, 2), ae = V(z(ie)), oe = z(ae);
							M(ae), M(ie);
							var se = V(ie, 2);
							Z(se);
							var O = V(se, 2);
							H((e, t, n, r, i, o) => {
								Q(a, G(k).props.alt ?? ""), Q(d, G(k).props.href ?? ""), Y(m, `${e ?? ""}%`), Q(h, G(k).props.x ?? .5), Y(v, `${t ?? ""}%`), Q(y, G(k).props.y ?? .5), Y(S, `${n ?? ""}x`), Q(C, G(k).props.zoom ?? 1), Y(E, `${r ?? ""}%`), Q(ee, G(k).props.brightness ?? 1), Y(re, `${i ?? ""}%`), Q(D, G(k).props.contrast ?? 1), Y(oe, `${o ?? ""}%`), Q(se, G(k).props.saturate ?? 1);
							}, [
								() => Math.round((G(k).props.x ?? .5) * 100),
								() => Math.round((G(k).props.y ?? .5) * 100),
								() => (G(k).props.zoom ?? 1).toFixed(2),
								() => Math.round((G(k).props.brightness ?? 1) * 100),
								() => Math.round((G(k).props.contrast ?? 1) * 100),
								() => Math.round((G(k).props.saturate ?? 1) * 100)
							]), K("change", r, Ae), K("change", a, (e) => A("alt", e.target.value)), K("change", d, (e) => A("href", e.target.value || null)), K("input", h, (e) => A("x", Number(e.target.value))), K("input", y, (e) => A("y", Number(e.target.value))), K("input", C, (e) => A("zoom", Number(e.target.value))), K("input", ee, (e) => A("brightness", Number(e.target.value))), K("input", D, (e) => A("contrast", Number(e.target.value))), K("input", se, (e) => A("saturate", Number(e.target.value))), K("click", O, () => Oe(`edit:${G(k).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), J(e, t);
						}, c = (e) => {
							var t = no(), n = V(B(t), 2);
							Z(n);
							var r = V(n, 2), i = V(z(r));
							Z(i), M(r), N(2), H(() => {
								Q(n, G(k).props.url ?? ""), Q(i, G(k).props.title ?? "");
							}), K("change", n, (e) => A("url", e.target.value)), K("change", i, (e) => A("title", e.target.value)), J(e, t);
						}, l = (e) => {
							var t = io(), n = B(t), r = V(z(n)), i = z(r);
							{
								let e = /* @__PURE__ */ P(() => G(k).props.glyph ?? "★");
								zi(i, {
									get value() {
										return G(e);
									},
									onpick: (e) => A("glyph", e),
									onimage: (e) => A("image", e)
								});
							}
							var a = V(i, 2);
							Z(a), M(r), M(n);
							var o = V(n, 2), s = (e) => {
								var t = ro(), n = B(t), r = z(n), i = V(r, 2);
								M(n), N(2), H(() => ii(r, "src", G(k).props.image)), K("click", i, () => A("image", null)), J(e, t);
							};
							X(o, (e) => {
								G(k).props.image && e(s);
							});
							var c = V(o, 2), l = V(z(c));
							Z(l), M(c);
							var u = V(c, 2);
							$(V(z(u)), {
								get value() {
									return G(k).props.color;
								},
								get options() {
									return Pe;
								},
								onchange: (e) => A("color", e)
							}), M(u), N(2), H(() => {
								Q(a, G(k).props.glyph ?? ""), Q(l, G(k).props.size ?? 48);
							}), K("change", a, (e) => A("glyph", e.target.value || "★")), K("change", l, (e) => A("size", Number(e.target.value))), J(e, t);
						}, u = (e) => {
							var t = ao(), n = B(t), r = V(z(n));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...G(rn).map((e) => [e, G(an)[e]?.name ?? e])]);
								$(r, {
									get value() {
										return G(e);
									},
									get options() {
										return G(t);
									},
									onchange: (e) => A("collection", e || null)
								});
							}
							M(n);
							var i = V(n, 2), a = V(z(i));
							{
								let e = /* @__PURE__ */ P(() => G(k).props.view ?? "cards");
								$(a, {
									get value() {
										return G(e);
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
							var o = V(i, 2), s = V(z(o));
							Z(s), M(o);
							var c = V(o, 2), l = z(c);
							Z(l), N(), M(c), N(2), H(() => {
								Q(s, G(k).props.limit ?? 6), ri(l, G(k).props.newestFirst !== !1);
							}), K("change", s, (e) => A("limit", Number(e.target.value))), K("change", l, (e) => A("newestFirst", e.target.checked)), J(e, t);
						}, d = (e) => {
							var t = oo(), n = B(t);
							$(V(z(n)), {
								get value() {
									return G(k).props.kind;
								},
								get options() {
									return Ne;
								},
								onchange: (e) => A("kind", e)
							}), M(n);
							var r = V(n, 2);
							$(V(z(r)), {
								get value() {
									return G(k).props.color;
								},
								get options() {
									return Pe;
								},
								onchange: (e) => A("color", e)
							}), M(r);
							var i = V(r, 2), a = V(z(i));
							Z(a), M(i);
							var o = V(i, 2), s = z(o);
							Z(s), N(), M(o), H((e) => {
								Q(a, G(k).props.thickness), ri(s, e);
							}, [() => !!G(k).props.fill]), K("change", a, (e) => A("thickness", Number(e.target.value))), K("change", s, (e) => A("fill", e.target.checked ? G(k).props.color : null)), J(e, t);
						};
						X(i, (e) => {
							G(k).type === "text" ? e(a) : G(k).type === "button" ? e(o, 1) : G(k).type === "image" ? e(s, 2) : G(k).type === "video" ? e(c, 3) : G(k).type === "icon" ? e(l, 4) : G(k).type === "samling" ? e(u, 5) : G(k).type === "shape" && e(d, 6);
						});
						var f = V(i, 4), p = V(z(f));
						{
							let e = /* @__PURE__ */ P(() => G(k).animation?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(fa).map(([e, t]) => [e, t.label])]);
							$(p, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => nt(e || null)
							});
						}
						M(f);
						var h = V(f, 2), g = (e) => {
							var t = so(), n = B(t), r = V(z(n));
							Z(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), M(i), N(2), H(() => {
								Q(r, G(k).animation.props.duration), Q(a, G(k).animation.props.delay);
							}), K("change", r, (e) => rt("duration", Number(e.target.value))), K("change", a, (e) => rt("delay", Number(e.target.value))), J(e, t);
						};
						X(h, (e) => {
							G(k).animation && fa[G(k).animation.type]?.entrance && e(g);
						});
						var _ = V(h, 4), v = V(z(_), 2), b = V(z(v), 2), x = (e) => {
							var t = co(), n = z(t), r = V(z(n));
							Z(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), M(i);
							var o = V(i, 2), s = V(z(o));
							Z(s), M(o);
							var c = V(o, 2), l = V(z(c));
							Z(l), M(c);
							var u = V(c, 2), d = V(z(u));
							Z(d), M(u);
							var f = V(u, 2), p = V(z(f));
							Z(p), M(f), M(t), H(() => {
								Q(r, G(k).frame.x), Q(a, G(k).frame.y), Q(s, G(k).frame.w), Q(l, G(k).frame.h), Q(d, G(k).frame.z ?? 1), Q(p, G(k).frame.rot ?? 0);
							}), K("change", r, (e) => ke("x", Number(e.target.value))), K("change", a, (e) => ke("y", Number(e.target.value))), K("change", s, (e) => ke("w", Number(e.target.value))), K("change", l, (e) => ke("h", Number(e.target.value))), K("change", d, (e) => ke("z", Number(e.target.value))), K("change", p, (e) => ke("rot", Number(e.target.value))), J(e, t);
						};
						X(b, (e) => {
							G(y) === "desktop" && e(x);
						});
						var S = V(b, 2), C = z(S);
						Z(C), N(), M(S), M(v), M(_), H(() => {
							Y(r, `${Me[G(k).type] ?? G(k).type ?? ""}-blokk`), ri(C, G(k).decor);
						}), K("change", C, (e) => j(e.target.checked)), J(e, t);
					}, o = (e) => {
						var t = yo(), r = V(B(t), 2), a = V(z(r));
						Z(a), M(r);
						var o = V(r, 6), s = z(o);
						Z(s), N(), M(o);
						var c = V(o, 2), l = (e) => {
							var t = uo(), n = B(t), r = V(z(n)), i = z(r);
							M(r), M(n);
							var a = V(n, 2);
							Z(a), H(() => {
								Y(i, `${G(Ie).size ?? ""} px`), Q(a, G(Ie).size);
							}), K("input", a, (e) => ut("size", Number(e.target.value))), J(e, t);
						};
						X(c, (e) => {
							G(Ie) && e(l);
						});
						var u = V(c, 8);
						Rr(u, 17, () => G(ze), Pr, (e, t, r) => {
							var a = vo(), o = z(a), s = z(o);
							{
								let e = /* @__PURE__ */ P(() => n.map(([e, t]) => [e, t.label]));
								$(s, {
									get value() {
										return G(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return G(e);
									},
									onchange: (e) => Qe(r, e)
								});
							}
							var c = V(s, 2), l = z(c);
							l.disabled = r === 0, Wr(l, () => i.up, !0), M(l);
							var u = V(l, 2);
							Wr(u, () => i.down, !0), M(u);
							var d = V(u, 2);
							Wr(d, () => i.cross, !0), M(d), M(c), M(o);
							var f = V(o, 2), p = (e) => {
								var n = fo(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(a, {
										get value() {
											return G(t).props.value;
										},
										get tokens() {
											return G(e);
										},
										label: "Lagets farge",
										onchange: (e) => Xe(r, "value", e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								M(s), M(o);
								var l = V(o, 2);
								Z(l), H((e) => {
									Y(c, `${e ?? ""}%`), Q(l, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("input", l, (e) => Xe(r, "opacity", Number(e.target.value))), J(e, n);
							}, m = (e) => {
								var n = po(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(a, {
										get value() {
											return G(t).props.stops[0];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient fra",
										onchange: (e) => Ze(r, 0, e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(s, {
										get value() {
											return G(t).props.stops[G(t).props.stops.length - 1];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient til",
										onchange: (e) => Ze(r, G(t).props.stops.length - 1, e)
									});
								}
								M(o);
								var c = V(o, 2), l = V(z(c)), u = z(l);
								M(l), M(c);
								var d = V(c, 2);
								Z(d);
								var f = V(d, 2), p = V(z(f)), m = z(p);
								M(p), M(f);
								var h = V(f, 2);
								Z(h);
								var g = V(h, 2), _ = z(g);
								Z(_), N(), M(g), H((e, n) => {
									Y(u, `${G(t).props.angle ?? ""}°`), Q(d, G(t).props.angle), Y(m, `${e ?? ""}%`), Q(h, G(t).props.opacity ?? 1), ri(_, n);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100), () => !!G(t).props.animate]), K("input", d, (e) => Xe(r, "angle", Number(e.target.value))), K("input", h, (e) => Xe(r, "opacity", Number(e.target.value))), K("change", _, (e) => Xe(r, "animate", e.target.checked)), J(e, n);
							}, h = (e) => {
								var n = mo(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(et);
									Ti(a, {
										get value() {
											return G(t).props.color;
										},
										get tokens() {
											return G(e);
										},
										label: "Glødens farge",
										onchange: (e) => Xe(r, "color", e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								M(s), M(o);
								var l = V(o, 2);
								Z(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								M(d), M(u);
								var p = V(u, 2);
								Z(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								M(h), M(m);
								var _ = V(m, 2);
								Z(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								M(y), M(v);
								var x = V(v, 2);
								Z(x), H((e, n, r, i) => {
									Y(c, `${e ?? ""}%`), Q(l, G(t).props.x), Y(f, `${n ?? ""}%`), Q(p, G(t).props.y), Y(g, `${r ?? ""}%`), Q(_, G(t).props.radius), Y(b, `${i ?? ""}%`), Q(x, G(t).props.opacity);
								}, [
									() => Math.round(G(t).props.x * 100),
									() => Math.round(G(t).props.y * 100),
									() => Math.round(G(t).props.radius * 100),
									() => Math.round(G(t).props.opacity * 100)
								]), K("input", l, (e) => Xe(r, "x", Number(e.target.value))), K("input", p, (e) => Xe(r, "y", Number(e.target.value))), K("input", _, (e) => Xe(r, "radius", Number(e.target.value))), K("input", x, (e) => Xe(r, "opacity", Number(e.target.value))), J(e, n);
							}, g = (e) => {
								var n = ho(), i = B(n), a = V(z(i)), o = z(a);
								M(a), M(i);
								var s = V(i, 2);
								Z(s), H((e) => {
									Y(o, `${e ?? ""}%`), Q(s, G(t).props.opacity);
								}, [() => Math.round(G(t).props.opacity * 100)]), K("input", s, (e) => Xe(r, "opacity", Number(e.target.value))), J(e, n);
							}, _ = (e) => {
								var n = _o(), i = B(n), a = z(i), o = V(a);
								M(i);
								var s = V(i, 2), c = V(z(s));
								{
									let e = /* @__PURE__ */ P(() => G(t).props.fit ?? "cover");
									$(c, {
										get value() {
											return G(e);
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
								var l = V(s, 2), u = (e) => {
									var n = go(), i = B(n), a = V(z(i)), o = z(a);
									M(a), M(i);
									var s = V(i, 2);
									Z(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									M(l), M(c);
									var d = V(c, 2);
									Z(d), H((e, n) => {
										Y(o, `${e ?? ""}%`), Q(s, G(t).props.x ?? .5), Y(u, `${n ?? ""}%`), Q(d, G(t).props.y ?? .5);
									}, [() => Math.round((G(t).props.x ?? .5) * 100), () => Math.round((G(t).props.y ?? .5) * 100)]), K("input", s, (e) => Xe(r, "x", Number(e.target.value))), K("input", d, (e) => Xe(r, "y", Number(e.target.value))), J(e, n);
								};
								X(l, (e) => {
									(G(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = V(l, 2), f = V(z(d)), p = z(f);
								M(f), M(d);
								var m = V(d, 2);
								Z(m);
								var h = V(m, 2), g = V(z(h)), _ = z(g);
								M(g), M(h);
								var v = V(h, 2);
								Z(v), H((e) => {
									Y(a, `${G(t).props.src ? "Bytt bilde" : "Velg bilde"} `), Y(p, `${G(t).props.blur ?? 0 ?? ""} px`), Q(m, G(t).props.blur ?? 0), Y(_, `${e ?? ""}%`), Q(v, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => $e(r, e)), K("input", m, (e) => Xe(r, "blur", Number(e.target.value))), K("input", v, (e) => Xe(r, "opacity", Number(e.target.value))), J(e, n);
							};
							X(f, (e) => {
								G(t).type === "color" ? e(p) : G(t).type === "gradient" ? e(m, 1) : G(t).type === "glow" ? e(h, 2) : G(t).type === "grain" ? e(g, 3) : G(t).type === "image" && e(_, 4);
							}), M(a), H(() => u.disabled = r === G(ze).length - 1), K("click", l, () => Ye(r, -1)), K("click", u, () => Ye(r, 1)), K("click", d, () => Je(r)), J(e, a);
						});
						var d = V(u, 2), f = V(z(d));
						{
							let e = /* @__PURE__ */ P(() => n.map(([e, t]) => [e, t.label]));
							$(f, {
								get value() {
									return G(Ke);
								},
								get options() {
									return G(e);
								},
								onchange: (e) => R(Ke, e, !0)
							});
						}
						M(d);
						var p = V(d, 2), m = V(p, 4), h = V(z(m));
						{
							let e = /* @__PURE__ */ P(() => G(Be)?.type ?? ""), t = /* @__PURE__ */ P(() => [["", "Ingen"], ...Object.entries(fa).map(([e, t]) => [e, t.label])]);
							$(h, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => at(e || null)
							});
						}
						M(m);
						var g = V(m, 2), _ = (e) => {
							var t = so(), n = B(t), r = V(z(n));
							Z(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), M(i), N(2), H(() => {
								Q(r, G(Be).props.duration), Q(a, G(Be).props.delay);
							}), K("change", r, (e) => ot("duration", Number(e.target.value))), K("change", a, (e) => ot("delay", Number(e.target.value))), J(e, t);
						};
						X(g, (e) => {
							G(Be) && fa[G(Be).type]?.entrance && e(_);
						}), H(() => {
							Q(a, G(Le)), ri(s, G(Ie) !== null);
						}), K("change", a, (e) => st(e.target.value)), K("change", s, (e) => lt(e.target.checked)), K("click", p, () => qe(G(Ke))), J(e, t);
					}, s = (e) => {
						J(e, bo());
					};
					X(r, (e) => {
						G(k) ? e(a) : G(Fe) ? e(o, 1) : e(s, -1);
					}), M(t), J(e, t);
				}, h = (e) => {
					var t = So(), n = V(z(t), 2), r = z(n);
					Z(r), N(), M(n);
					var i = V(n, 4);
					it(i), ii(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = V(i, 4), o = V(z(a));
					{
						let e = /* @__PURE__ */ P(() => G(E).footer?.align ?? "center");
						$(o, {
							get value() {
								return G(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => Un("footer", (t) => {
								t.align = e;
							})
						});
					}
					M(a), N(2), M(t), H((e) => {
						ri(r, e), Q(i, G(E).footer?.text ?? "");
					}, [() => !!G(E).footer?.show]), K("change", r, (e) => Un("footer", (t) => {
						t.show = e.target.checked;
					})), K("input", i, (e) => Un("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), J(e, t);
				}, v = (e) => {
					var t = Oo(), n = V(z(t), 2), r = (e) => {
						var t = Co(), n = V(z(t));
						{
							let e = /* @__PURE__ */ P(() => G(on) ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...G(rn).map((e) => [e, G(an)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => R(on, e || null, !0)
							});
						}
						M(t), J(e, t);
					};
					X(n, (e) => {
						G(rn).length && e(r);
					});
					var a = V(n, 2), o = (e) => {
						let t = /* @__PURE__ */ P(() => G(an)[G(on)]);
						var n = Do(), r = B(n), a = z(r), o = V(a, 2);
						Wr(o, () => i.cross, !0), M(o), M(r);
						var s = V(r, 2);
						Rr(s, 19, () => G(t).entries, (e) => e.id, (e, n, r) => {
							var a = To(), o = z(a), s = z(o);
							M(o);
							var c = V(o, 2), l = z(c), u = z(l);
							Z(u);
							var d = V(u, 2), f = z(d);
							Wr(f, () => i.up, !0), M(f);
							var p = V(f, 2);
							Wr(p, () => i.down, !0), M(p);
							var m = V(p, 2);
							Wr(m, () => i.cross, !0), M(m), M(d), M(l);
							var h = V(l, 2), g = V(z(h));
							Z(g), M(h);
							var _ = V(h, 2);
							it(_);
							var v = V(_, 2), y = V(z(v));
							Z(y), M(v);
							var b = V(v, 2), x = z(b), S = z(x), C = V(S);
							M(x);
							var w = V(x, 2), T = (e) => {
								var t = wo(), r = B(t), a = V(r, 2);
								Wr(a, () => i.cross, !0), M(a), H(() => ii(r, "src", G(n).image)), K("click", a, () => vn(G(on), G(n).id, "image", "")), J(e, t);
							};
							X(w, (e) => {
								G(n).image && e(T);
							}), M(b), M(c), M(a), H((e) => {
								Y(s, `${e ?? ""}${G(n).date ? ` · ${G(n).date}` : ""}`), Q(u, G(n).title), f.disabled = G(r) === 0, p.disabled = G(r) === G(t).entries.length - 1, Q(g, G(n).date ?? ""), Q(_, G(n).text ?? ""), Q(y, G(n).href ?? ""), Y(S, `${G(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => G(n).title.replace(/<[^>]*>/g, "")]), K("change", u, (e) => vn(G(on), G(n).id, "title", e.target.value || "Uten tittel")), K("click", f, () => bn(G(on), G(r), -1)), K("click", p, () => bn(G(on), G(r), 1)), K("click", m, () => xn(G(on), G(n).id)), K("change", g, (e) => vn(G(on), G(n).id, "date", e.target.value)), K("change", _, (e) => vn(G(on), G(n).id, "text", e.target.value)), K("change", y, (e) => vn(G(on), G(n).id, "href", e.target.value)), K("change", C, (e) => Sn(G(on), G(n).id, e)), J(e, a);
						});
						var c = V(s, 2), l = (e) => {
							J(e, Eo());
						};
						X(c, (e) => {
							G(t).entries.length || e(l);
						}), N(2), K("click", a, () => _n(G(on))), K("click", o, () => gn(G(on))), J(e, n);
					};
					X(a, (e) => {
						G(on) && G(an)[G(on)] && e(o);
					});
					var s = V(a, 2), c = V(z(s));
					Z(c), M(s);
					var l = V(s, 2);
					$(V(z(l)), {
						get value() {
							return G(cn);
						},
						get options() {
							return ln;
						},
						onchange: (e) => R(cn, e, !0)
					}), M(l);
					var u = V(l, 2);
					M(t), H((e) => u.disabled = e, [() => !G(sn).trim()]), K("keydown", c, (e) => e.key === "Enter" && hn()), ci(c, () => G(sn), (e) => R(sn, e)), K("click", u, hn), J(e, t);
				}, b = (e) => {
					var t = Lo(), n = V(z(t), 2), r = (e) => {
						J(e, ko());
					}, a = /* @__PURE__ */ P(() => !Nn().length);
					X(n, (e) => {
						G(a) && e(r);
					});
					var o = V(n, 2);
					Rr(o, 16, Nn, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => Dn[t]), r = /* @__PURE__ */ P(() => (G(En)?.enabled ?? []).includes(t));
						var a = Mo();
						let o;
						var s = z(a), c = z(s), l = z(c, !0);
						M(c);
						var u = V(c, 2), d = (e) => {
							var t = Ao(), r = z(t);
							M(t), H(() => Y(r, `v${G(n).version ?? ""}`)), J(e, t);
						};
						X(u, (e) => {
							G(n)?.version && e(d);
						});
						var f = V(u, 2), p = z(f), m = z(p);
						Z(m);
						var h = V(m);
						M(p);
						var g = V(p, 2);
						Wr(g, () => i.cross, !0), M(g), M(f), M(s);
						var _ = V(s, 2), v = (e) => {
							var t = jo(), r = z(t, !0);
							M(t), H((e) => Y(r, e), [() => G(n).errors.join("; ")]), J(e, t);
						}, y = (e) => {
							var t = jo(), r = z(t);
							M(t), H(() => Y(r, `Krever motorversjon ${G(n).requiresEngine ?? ""} (denne siden kjører ${G(On) ?? ""}); pluginen hoppes over ved lasting.`)), J(e, t);
						}, b = (e) => {
							var t = jo(), r = z(t);
							M(t), H((e) => Y(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(G(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(G(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), J(e, t);
						};
						X(_, (e) => {
							G(n)?.errors?.length ? e(v) : G(n) && !G(n).satisfied ? e(y, 1) : G(n)?.csp && e(b, 2);
						}), M(a), H((e) => {
							o = Xr(a, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": G(n)?.errors?.length }), Y(l, G(n)?.name ?? t), ii(p, "title", G(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, G(r)), m.disabled = e, Y(h, ` ${G(r) ? "På" : "Av"}`);
						}, [() => !!G(n)?.errors?.length]), K("change", m, (e) => zn(t, e.target.checked)), K("click", g, () => Vn(t)), J(e, a);
					});
					var s = V(o, 2), c = (e) => {
						var t = Po();
						Rr(V(B(t), 4), 16, () => G(jn), (e) => e, (e, t) => {
							var n = No(), r = z(n), a = z(r), o = z(a, !0);
							M(a);
							var s = V(a, 2), c = (e) => {
								var n = Ao(), r = z(n);
								M(n), H(() => Y(r, `v${Dn[t].version ?? ""}`)), J(e, n);
							};
							X(s, (e) => {
								Dn[t]?.version && e(c);
							});
							var l = V(s, 2), u = z(l);
							Wr(u, () => i.right, !0), M(u), M(l), M(r), M(n), H(() => Y(o, Dn[t]?.name ?? t)), K("click", u, () => Hn(t)), J(e, n);
						}), J(e, t);
					};
					X(s, (e) => {
						G(jn).length && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = Or(), n = B(t), r = (e) => {
							J(e, Fo());
						};
						X(n, (e) => {
							G(jn).length || e(r);
						}), J(e, t);
					}, d = (e) => {
						var t = Io(), n = V(B(t), 2);
						Z(n);
						var r = V(n, 2), i = V(r, 2), a = (e) => {
							var t = jo(), n = z(t, !0);
							M(t), H(() => Y(n, G(An))), J(e, t);
						};
						X(i, (e) => {
							G(An) && e(a);
						}), H((e) => r.disabled = e, [() => !G(kn).trim()]), K("keydown", n, (e) => e.key === "Enter" && U()), ci(n, () => G(kn), (e) => R(kn, e)), K("click", r, U), J(e, t);
					};
					X(l, (e) => {
						G(Mn) === "ok" ? e(u) : e(d, -1);
					}), M(t), J(e, t);
				}, x = (e) => {
					var t = Ho(), n = V(z(t), 2), r = (e) => {
						J(e, Ro());
					}, i = (e) => {
						var t = wa(), n = B(t), r = (e) => {
							var t = zo(), n = z(t, !0);
							M(t), H(() => Y(n, G(_t))), J(e, t);
						};
						X(n, (e) => {
							G(_t) && e(r);
						});
						var i = V(n, 2), a = (e) => {
							var t = Vo(), n = B(t);
							Rr(V(n, 2), 19, () => G(gt), (e) => e.sha, (e, t, n) => {
								var r = Bo();
								let i;
								var a = z(r), o = z(a, !0);
								M(a);
								var s = V(a, 2), c = z(s);
								M(s), M(r), H((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: G(n) === 0 }), ii(a, "title", G(t).sha), Y(o, G(t).message), Y(c, `${G(t).author ?? ""}${e ?? ""}`);
								}, [() => G(t).date ? ` · ${bt.format(new Date(G(t).date))}` : ""]), J(e, r);
							}), H(() => {
								n.disabled = G(vt) || !G(g)?.allowed, ii(n, "title", G(g)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), K("click", n, St), J(e, t);
						};
						X(i, (e) => {
							G(gt).length > 0 && e(a);
						}), J(e, t);
					};
					X(n, (e) => {
						G(gt) === null ? e(r) : e(i, -1);
					}), M(t), J(e, t);
				};
				X(o, (e) => {
					G(Se) === "Sider" ? e(s) : G(Se) === "Nav" ? e(l, 1) : G(Se) === "Tema" ? e(u, 2) : G(Se) === "Blokker" ? e(d, 3) : G(Se) === "Grid" ? e(f, 4) : G(Se) === "Egenskaper" ? e(p, 5) : G(Se) === "Footer" ? e(h, 6) : G(Se) === "Samlinger" ? e(v, 7) : G(Se) === "Plugins" ? e(b, 8) : G(Se) === "Historikk" && e(x, 9);
				}), M(t), H(() => Y(a, G(Se))), J(e, t);
			};
			X(a, (e) => {
				G(Se) && e(o);
			}), J(e, t);
		};
		X(r, (e) => {
			G(v) && e(a);
		});
		var o = V(r, 2);
		let s;
		var l = z(o);
		fi(l, (e) => R(h, e), () => G(h)), M(o), M(t), H(() => {
			s = Xr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: G(y) === "mobile" }), ii(l, "src", `/?page=${G(c)}&preview=1`);
		}), yr("load", l, F), _r(l), J(e, t);
	}, vi = (e) => {
		J(e, Ko());
	};
	X(gi, (e) => {
		G(s) ? e(_i) : e(vi, -1);
	});
	var yi = V(gi, 2), bi = (e) => {
		Gi(e, {
			get image() {
				return G(Bt);
			},
			onapply: Ht,
			oncancel: () => R(Bt, null)
		});
	};
	X(yi, (e) => {
		G(Bt) && e(bi);
	});
	var xi = V(yi, 2), Si = (e) => {
		var t = Jo(), n = z(t), r = z(n), i = z(r, !0);
		M(r);
		var a = V(r, 2);
		Rr(a, 16, () => G(pe).lines, (e) => e, (e, t) => {
			var n = qo(), r = z(n, !0);
			M(n), H(() => Y(r, t)), J(e, n);
		});
		var o = V(a, 2), s = z(o), c = z(s, !0);
		M(s);
		var l = V(s, 2), u = z(l, !0);
		M(l), M(o), M(n), M(t), H(() => {
			Y(i, G(pe).title), Y(c, G(pe).cancelLabel), Y(u, G(pe).okLabel);
		}), K("click", s, () => he(!1)), K("click", l, () => he(!0)), J(e, t);
	};
	X(xi, (e) => {
		G(pe) && e(Si);
	});
	var Ci = V(xi, 2), wi = (e) => {
		var t = Yo(), n = z(t), r = V(z(n), 4), i = V(z(r));
		Z(i), M(r);
		var a = V(r, 2);
		Ti(V(z(a)), {
			get value() {
				return G(ve);
			},
			label: "Aksentfarge",
			onchange: (e) => R(ve, e, !0)
		}), M(a);
		var o = V(a, 2);
		Ti(V(z(o)), {
			get value() {
				return G(ye);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => R(ye, e, !0)
		}), M(o);
		var s = V(o, 4), c = z(s), l = V(c, 2);
		M(s), M(n), M(t), H((e) => l.disabled = e, [() => !G(_e).trim()]), K("keydown", i, (e) => e.key === "Enter" && xe()), ci(i, () => G(_e), (e) => R(_e, e)), K("click", c, be), K("click", l, xe), J(e, t);
	};
	X(Ci, (e) => {
		G(ge) && e(wi);
	});
	var Ei = V(Ci, 2), Di = (e) => {
		var t = Xo();
		let n;
		var r = z(t), i = z(r, !0);
		M(r);
		var a = V(r, 2);
		M(t), H(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: G(d) === "ok",
				error: G(d) === "error"
			}), Y(i, G(u));
		}), K("click", a, () => p("")), J(e, t);
	};
	X(Ei, (e) => {
		G(u) && e(Di);
	}), M(Jr), H(() => $r = Xr(Qr, 1, "topbar svelte-1n46o8q", null, $r, { hidden: !G(v) })), J(e, Jr), Ue();
}
br([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var $o = kr(Qo, { target: document.getElementById("urd-admin") });
//#endregion
export { $o as default };
