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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, ie = 1 << 22, w = 1 << 23, T = Symbol("$state"), E = Symbol("legacy props"), D = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), O = Symbol("form reset"), le = new class extends Error {
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
function De() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Oe(e) {
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
	if (e === null) throw Oe(), Se;
	return A = e;
}
function Me() {
	return je(/* @__PURE__ */ un(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ un(A) !== null) throw Oe(), Se;
		A = e;
	}
}
function M(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ un(n);
		A = n;
	}
}
function Ne(e = !0) {
	for (var t = 0, n = A;;) {
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
function Pe(e) {
	if (!e || e.nodeType !== 8) throw Oe(), Se;
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
var N = [];
function Re(e, t = !1, n = !1) {
	return ze(e, /* @__PURE__ */ new Map(), "", N, null, n);
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
	if (t === null) return Hn.f |= w, e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, et(t.deps));
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
	k && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var at = !1;
function ot() {
	at || (at = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[O]?.();
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
	let i = e[O];
	i ? e[O] = () => {
		i(), r(!0);
	} : e[O] = () => r(!0), ot();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function lt(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		vn() && (W(n), wn(() => (t === 0 && (r = fr(() => e(() => $t(n)))), t += 1, () => {
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
	#h = lt(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Tn(() => {
			if (k) {
				let e = this.#t;
				Me();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, ut), k && (this.#e = A);
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
			var e = this.#c = document.createDocumentFragment(), t = cn();
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
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), k && (je(this.#t), M(), je(Ne()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				ke();
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
		equals: Fe,
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
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= w, Zt(a, t)) : (a.f & 8388608 && (a.f ^= w), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), V(() => {
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
	return t.equals = Le, t;
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
	if (!Bn && r !== null && e.v !== Ce && r.f & 24576) return De(), e.v;
	Gn(r);
	try {
		e.f &= ~ne, xt(e), t = ar(e);
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
	Bn || (Ot === null ? $e(e) : (vn() || F?.is_fork) && Ot.set(e, t));
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
		equals: Fe,
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
	return t || (r.equals = Le), r;
}
function L(e, t, n = !1) {
	return Hn !== null && (!Un || Hn.f & 131072) && We() && Hn.f & 4325394 && (Kn === null || !Kn.has(e)) && be(), Zt(e, n ? tn(t) : t, Nt);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Bn ? t : e.v);
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
				Ot?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= ne), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && zt !== null && zt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || T in t) return t;
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
			if (n === T) return t;
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
			if (t === T) return !0;
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
			ye();
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
	if (!k) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(A);
	if (n === null) n = A.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), je(r), r;
	}
	return t && mn(n), je(n), n;
}
function z(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = cn();
			return A?.before(r), je(r), r;
		}
		mn(A);
	}
	return A;
}
function B(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), je(a), a;
		}
		mn(r);
	}
	return je(r), r;
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
	U === null && (Hn === null && he(e), me()), Bn && pe(e);
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
			throw An(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && gn(i, n), Hn !== null && Hn.f & 2 && !(e & 64))) {
		var a = Hn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function vn() {
	return Hn !== null && !Un;
}
function V(e) {
	let t = _n(8, null);
	return Qe(t, h), t.teardown = e, t;
}
function yn(e) {
	hn("$effect");
	var t = U.f;
	if (!Hn && t & 32 && Be !== null && !Be.i) {
		var n = Be;
		(n.e ??= []).push(e);
	} else return bn(e);
}
function bn(e) {
	return _n(4 | ee, e);
}
function xn(e) {
	It.ensure();
	let t = _n(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Nn(t, () => {
			An(t), n(void 0);
		}) : (An(t), n(void 0));
	});
}
function Sn(e) {
	return _n(4, e);
}
function Cn(e) {
	return _n(ie | C, e);
}
function wn(e, t = 0) {
	return _n(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(W));
		});
	});
}
function Tn(e, t = 0) {
	return _n(16 | t, e);
}
function En(e) {
	return _n(32 | C, e);
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
		var n = e === t ? null : /* @__PURE__ */ un(e);
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
		var i = n === r ? null : /* @__PURE__ */ un(n);
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
	if (t & 2 && (e.f &= ~ne), t & 4096) {
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
		e.f |= re;
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
		return e.f & 8388608 && (e.f ^= w), d;
	} catch (e) {
		return Ye(e);
	} finally {
		e.f ^= re, Jn = t, Yn = n, Xn = r, Hn = i, Kn = a, Ve(o), Un = s, er = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== Ce && $e(s), s.ac !== null && st(() => {
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
	if (!k) return;
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
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && V(() => {
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
	if (!k) {
		var t = cn(e + "");
		return Dr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), je(n)), Dr(n, n), n;
}
function kr() {
	if (k) return Dr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
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
	sn();
	var l = void 0, u = xn(() => {
		var s = n ?? t.appendChild(cn());
		dt(s, { pending: () => {} }, (t) => {
			He({});
			var n = Be;
			if (o && (n.c = o), a && (i.$$events = a), k && Dr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw Oe(), Se;
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
						Ln(r, t), t.append(cn()), this.#n.set(e, {
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
		var n = F, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = cn();
			i.append(a), this.#n.set(e, {
				effect: En(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, En(() => t(this.anchor)));
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
			var n = Pe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ne();
				je(a), i.anchor = a, Ae(!1), i.ensure(e, t), Ae(!0);
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
		r?.has(a) ? (a.f |= te, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var Rr;
function zr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? je(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	k && Me();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Vr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Ur(d, null, c)) : Fn(d) : Nn(d, () => {
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
			k && Pe(c) === "[!" != (e === 0) && (c = Ne(), je(c), Ae(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = fn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Ae(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Hr(l, h ? c : Rr ??= cn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(Rr ??= cn())), d.f |= te)), e > r.size && fe("", "", ""), k && e > 0 && je(Ne()), !h) if (m.set(u, r), v) {
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
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) Ur(_, null, n);
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
		var ne = ee.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.fix();
			}
			Ir(e, ee, re);
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
		var o = /* @__PURE__ */ un(r);
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
		k && (o = je(/* @__PURE__ */ ln(c)));
	}
	H(() => {
		var e = U;
		if (s === (s = t() ?? "")) {
			k && Me();
			return;
		}
		if (n && !k) {
			e.nodes = null, c.innerHTML = s, s !== "" && Dr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (k) {
				for (var a = A.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw Oe(), Se;
				Dr(A, u), o = je(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? Te : i ? Ee : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Dr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
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
	if (k || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
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
var $r = Symbol("is custom element"), ei = Symbol("is html"), ti = ue ? "link" : "LINK", ni = ue ? "progress" : "PROGRESS";
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
		e[O] = n, qe(n), ot();
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
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ti) || i[t] !== (i[t] = n) && (t === "loading" && (e[D] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
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
		if (a = li(e) ? ui(a) : a, n(a), F !== null && r.add(F), await lr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || fr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), F !== null && r.add(F)), wn(() => {
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
	return e === t || e?.[T] === t;
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
		var p = T in e || E in e;
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
			let n = t ? W(y) : i && o ? tn(e) : e;
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
var hi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-clear svelte-zxiloo\" title=\"Fjern fargen (bruk temaets standard)\" aria-label=\"Fjern fargen\">×</button>"), gi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), _i = /* @__PURE__ */ K("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), vi = /* @__PURE__ */ K("<button type=\"button\"></button>"), yi = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), bi = /* @__PURE__ */ K("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), xi = /* @__PURE__ */ K("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Si = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Ci = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), wi = /* @__PURE__ */ K("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), Ti = /* @__PURE__ */ K("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Ei(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = pi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ I(tn([])), d = /* @__PURE__ */ I(tn([])), f = "", p = "", h = /* @__PURE__ */ I(null), g = /* @__PURE__ */ I(!1), _ = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ I(0), y = /* @__PURE__ */ I(0), b = /* @__PURE__ */ I(1), x = /* @__PURE__ */ I(1), S = /* @__PURE__ */ I("#000000");
	function C(e) {
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
	function re() {
		return ee(...ne(W(v), W(y), W(b)));
	}
	function ie() {
		let e = re();
		return W(x) >= .995 ? e : e + Math.round(W(x) * 255).toString(16).padStart(2, "0");
	}
	function w() {
		L(S, ie(), !0), p = W(S), t.onchange?.(W(S));
	}
	function T(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = m(e, 3);
			L(v, t[0], !0), L(y, t[1], !0), L(b, t[2], !0);
		})(te(t[0], t[1], t[2])), L(x, t[3], !0), L(S, ie(), !0), !0) : !1;
	}
	function E() {
		T(c()) || T("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			L(u, Array.isArray(e) ? e : [], !0);
		} catch {
			L(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			L(d, Array.isArray(e) ? e : [], !0);
		} catch {
			L(d, [], !0);
		}
		let e = W(h).getBoundingClientRect(), t = W(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(_, {
			top: a,
			left: i
		}, !0), L(g, !0);
	}
	function D() {
		if (L(g, !1), p && p !== f) {
			let e = [p, ...W(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function ae(e, n) {
		T(n), L(S, n, !0), t.onchange?.(e);
	}
	function oe(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			L(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), L(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), w();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function se(e) {
		T(e.target.value) ? w() : L(S, re(), !0);
	}
	function ce(e) {
		return (C(re()) ?? [
			0,
			0,
			0
		])[e];
	}
	function O(e, t) {
		let n = C(re()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			L(v, t[0], !0), L(y, t[1], !0), L(b, t[2], !0);
		})(te(...n)), w();
	}
	let le = typeof window < "u" && "EyeDropper" in window;
	async function ue() {
		try {
			T((await new window.EyeDropper().open()).sRGBHex) && w();
		} catch {}
	}
	function de(e) {
		T(e) && w();
	}
	function fe() {
		let e = ie();
		W(d).includes(e) || (L(d, [e, ...W(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(Re(W(d)))));
	}
	function pe(e) {
		L(d, W(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(Re(W(d))));
	}
	yn(() => {
		if (!W(g)) return;
		let e = (e) => {
			W(h) && !W(h).contains(e.target) && D();
		}, t = (e) => {
			e.key === "Escape" && D();
		}, n = () => D();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var me = Ti(), he = R(me);
	let ge;
	var _e = B(he, 2), ve = (e) => {
		var n = hi();
		G("click", n, () => t.onchange?.("")), q(e, n);
	};
	Y(_e, (e) => {
		a() && n() && e(ve);
	});
	var ye = B(_e, 2), be = (e) => {
		var t = wi(), i = R(t), a = R(i);
		j(i);
		var o = B(i, 2);
		Z(o);
		var s = B(o, 2);
		Z(s);
		var c = B(s, 2), f = R(c), p = B(f, 2);
		Z(p);
		var h = B(p, 2), g = (e) => {
			var t = gi();
			G("click", t, ue), q(e, t);
		};
		Y(h, (e) => {
			le && e(g);
		}), j(c);
		var C = B(c, 2);
		zr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = _i();
			Z(r), H((e) => {
				ii(r, "title", t), Q(r, e);
			}, [() => ce(W(n))]), G("change", r, (e) => O(W(n), e.target.value)), q(e, r);
		}), j(C);
		var ee = B(C, 2), te = (e) => {
			var t = yi(), i = z(t), a = B(R(i)), o = (e) => {
				var t = Or();
				H((e) => J(t, `- koblet til «${e ?? ""}»`), [() => l()]), q(e, t);
			}, s = /* @__PURE__ */ P(() => l());
			Y(a, (e) => {
				W(s) && e(o);
			}), j(i);
			var c = B(i, 2);
			zr(c, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(W(t), 2));
				let i = () => W(r)[0], a = () => W(r)[1];
				var o = vi();
				let s;
				H(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), ii(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), G("click", o, () => ae(i(), a())), q(e, o);
			}), j(c), q(e, t);
		};
		Y(ee, (e) => {
			r().length && e(te);
		});
		var ne = B(ee, 2), ie = B(R(ne));
		j(ne);
		var T = B(ne, 2), E = (e) => {
			var t = xi();
			zr(t, 20, () => W(d), (e) => e, (e, t) => {
				var n = bi(), r = R(n), i = B(r, 2);
				j(n), H(() => {
					Qr(r, `background: ${t ?? ""}`), ii(r, "title", t);
				}), G("click", r, () => de(t)), G("click", i, () => pe(t)), q(e, n);
			}), j(t), q(e, t);
		};
		Y(T, (e) => {
			W(d).length && e(E);
		});
		var D = B(T, 2), me = (e) => {
			var t = Ci(), n = B(z(t), 2);
			zr(n, 20, () => W(u), (e) => e, (e, t) => {
				var n = Si();
				H(() => {
					Qr(n, `background: ${t ?? ""}`), ii(n, "title", t);
				}), G("click", n, () => de(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(D, (e) => {
			W(u).length && e(me);
		}), j(t), H((e, n) => {
			Qr(t, `top: ${W(_).top ?? ""}px; left: ${W(_).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${W(v) ?? ""}, 100%, 50%)`), Qr(a, `left: ${W(y) * 100}%; top: ${(1 - W(b)) * 100}%`), Q(o, W(v)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${W(S) ?? ""}`), Q(p, W(S));
		}, [() => Math.round(W(x) * 100), () => re()]), G("click", t, (e) => e.preventDefault()), G("pointerdown", i, oe), G("input", o, (e) => {
			L(v, Number(e.target.value), !0), w();
		}), G("input", s, (e) => {
			L(x, Number(e.target.value) / 100), w();
		}), G("change", p, se), G("click", ie, fe), q(e, t);
	};
	Y(ye, (e) => {
		W(g) && e(be);
	}), j(me), fi(me, (e) => L(h, e), () => W(h)), H((e, t, n) => {
		ge = Xr(he, 1, "cp-swatch svelte-zxiloo", null, ge, e), Qr(he, `background: ${t ?? ""}`), ii(he, "title", n), ii(he, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? `${i()} (koblet til temafargen «${l()}»)` : i()
	]), G("click", he, () => W(g) ? D() : E()), q(e, me), Ue();
}
xr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Di = 1600, Oi = .82, ki = .6;
async function Ai(e, t = Di) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Oi);
	return c.size > 4e5 && (c = await s(ki)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function ji(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Mi(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/glyphs.js
var Ni = "urd-recent-glyphs", Pi = [
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
function Fi(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Ii() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Li(e) {
	let t = Fi(Ii(), e);
	try {
		localStorage.setItem(Ni, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/icons.js
var Ri = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", zi = "fill=\"currentColor\" stroke=\"none\"", Bi = {
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
}, Vi = [
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
function Hi(e) {
	let t = typeof e == "string" ? Bi[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? zi : Ri} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Ui = /* @__PURE__ */ K("<img class=\"gp-own svelte-15ln1c3\" alt=\"Eget ikon\"/>"), Wi = /* @__PURE__ */ K("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Gi = /* @__PURE__ */ K("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Ki = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), qi = /* @__PURE__ */ K("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ji = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Yi = /* @__PURE__ */ K("<button type=\"button\"> </button>"), Xi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Zi = /* @__PURE__ */ K("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Qi = /* @__PURE__ */ K("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function $i(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ I(tn([])), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0
	}));
	function d() {
		L(o, Ii(), !0);
		let e = W(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(u, {
			top: n,
			left: t
		}, !0), L(l, !0);
	}
	function f(e) {
		Li(e), t.onpick?.(e), L(l, !1);
	}
	function p(e) {
		t.onicon?.(e), L(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ai(n, 256);
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
	var g = Qi(), _ = R(g), v = R(_), y = (e) => {
		var t = Ui();
		H(() => ii(t, "src", i())), q(e, t);
	}, b = (e) => {
		var t = Wi();
		X(t, () => Hi(r()), !0), j(t), q(e, t);
	}, x = (e) => {
		var t = Or();
		H(() => J(t, n() || "★")), q(e, t);
	};
	Y(v, (e) => {
		i() ? e(y) : r() && Bi[r()] ? e(b, 1) : e(x, -1);
	}), j(_);
	var S = B(_, 2), C = (e) => {
		var i = Zi(), a = R(i), s = (e) => {
			var t = Ki(), n = B(z(t), 2);
			zr(n, 20, () => W(o), (e) => e, (e, t) => {
				var n = Gi(), r = R(n, !0);
				j(n), H(() => J(r, t)), G("click", n, () => f(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(a, (e) => {
			W(o).length && e(s);
		});
		var l = B(a, 2), d = (e) => {
			var t = kr();
			zr(z(t), 17, () => Vi, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(W(t), 2));
				let i = () => W(n)[0], a = () => W(n)[1];
				var o = Ji(), s = z(o), c = R(s, !0);
				j(s);
				var l = B(s, 2);
				zr(l, 20, a, (e) => e, (e, t) => {
					var n = qi();
					let i;
					var a = R(n);
					X(a, () => Hi(t), !0), j(a), j(n), H(() => {
						i = Xr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ii(n, "title", Bi[t].label);
					}), G("click", n, () => p(t)), q(e, n);
				}), j(l), H(() => J(c, i())), q(e, o);
			}), q(e, t);
		};
		Y(l, (e) => {
			t.onicon && e(d);
		});
		var g = B(l, 2);
		zr(g, 17, () => Pi, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = Ji(), s = z(o), c = R(s, !0);
			j(s);
			var l = B(s, 2);
			zr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Yi();
				let i;
				var a = R(r, !0);
				j(r), H(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), J(a, t);
				}), G("click", r, () => f(t)), q(e, r);
			}), j(l), H(() => J(c, i())), q(e, o);
		});
		var _ = B(g, 2), v = (e) => {
			var t = Xi(), n = B(z(t), 2), r = B(n, 2);
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
function ea(e, t = {}) {
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
		sendOpenConfig(e) {
			r({
				type: "urd-open-block-config",
				blockId: e
			});
		},
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
//#endregion
//#region src/lib/Dropdown.svelte
var ta = /* @__PURE__ */ K("<button type=\"button\"> </button>"), na = /* @__PURE__ */ K("<div class=\"dd-pop svelte-vtocc6\"></div>"), ra = /* @__PURE__ */ K("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	He(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = W(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		L(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (W(o)) {
				L(o, !1);
				return;
			}
			u(), L(o, !0);
		}
	}
	function f(e) {
		L(o, !1), t.onchange?.(e);
	}
	yn(() => {
		if (!W(o)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && L(o, !1);
		}, t = (e) => {
			e.key === "Escape" && L(o, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = ra(), h = R(p), g = R(h), _ = R(g, !0);
	j(g);
	var v = B(g, 2), y = R(v, !0);
	j(v), j(h);
	var b = B(h, 2), x = (e) => {
		var t = na();
		zr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = ta();
			let s;
			var c = R(o, !0);
			j(o), H(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), J(c, a());
			}), G("click", o, () => f(i())), q(e, o);
		}), j(t), H(() => Qr(t, `top: ${W(c).top ?? ""}px; left: ${W(c).left ?? ""}px; min-width: ${W(c).width ?? ""}px`)), q(e, t);
	};
	Y(b, (e) => {
		W(o) && e(x);
	}), j(p), fi(p, (e) => L(s, e), () => W(s)), H((e) => {
		ii(h, "title", i()), h.disabled = a(), J(_, e), J(y, W(o) ? "▴" : "▾");
	}, [() => l()]), G("click", h, d), q(e, p), Ue();
}
xr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ia = /* @__PURE__ */ K("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function aa(e, t) {
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
	var h = ia(), g = R(h), _ = B(R(g), 2), v = R(_);
	ii(v, "width", 220), ii(v, "height", 220), fi(v, (e) => L(r, e), () => W(r)), M(2), j(_);
	var y = B(_, 2), b = B(R(y)), x = R(b);
	j(b), j(y);
	var S = B(y, 2);
	Z(S);
	var C = B(S, 2), ee = B(R(C)), te = R(ee);
	j(ee), j(C);
	var ne = B(C, 2);
	Z(ne);
	var re = B(ne, 2), ie = B(R(re)), w = R(ie);
	j(ie), j(re);
	var T = B(re, 2);
	Z(T);
	var E = B(T, 2), D = B(R(E)), ae = R(D);
	j(D), j(E);
	var oe = B(E, 2);
	Z(oe);
	var se = B(oe, 2), ce = R(se), O = B(ce, 2);
	j(se);
	var le = B(se, 2), ue = R(le), de = B(ue, 2);
	j(le), j(g), j(h), H((e, t, n, r) => {
		J(x, `${e ?? ""}x`), J(te, `${t ?? ""}%`), J(w, `${n ?? ""}%`), J(ae, `${r ?? ""}%`);
	}, [
		() => W(a).toFixed(2),
		() => Math.round(W(c) * 100),
		() => Math.round(W(l) * 100),
		() => Math.round(W(u) * 100)
	]), G("pointerdown", v, f), ci(S, () => W(a), (e) => L(a, e)), ci(ne, () => W(c), (e) => L(c, e)), ci(T, () => W(l), (e) => L(l, e)), ci(oe, () => W(u), (e) => L(u, e)), G("click", ce, () => L(u, 0)), G("click", O, p), G("click", ue, () => t.oncancel?.()), G("click", de, m), q(e, h), Ue();
}
xr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/migrate.js
function oa(e, t) {
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
var sa = (e) => Math.round(e * 100) / 100;
function ca(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var la = {
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
					x: sa(n.x * 100 / r.columns),
					w: sa(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= ca(t.grid);
		return e;
	}
}, ua = { 1: (e) => (e.grid = ca(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function da(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ua[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function fa(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = la[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function pa(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var ma = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ha(e, t) {
	let n = pa(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = pa(t[2]), a = ma(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ga = /^[a-z0-9][a-z0-9-]*$/;
function _a(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ga.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), pa(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function va(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function ya(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var ba = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ya(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, xa = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Sa(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Ca(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function wa(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ta(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${ya(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Ea(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (xa[t] ?? []).includes(e.animation) ? e.animation : null, r = Sa(e.stops), i = r.map((e) => `${ya(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Ca(r),
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
function Da(e) {
	let t = Array.isArray(e) && e.length ? e : ["#0b0e14", "#1a1030"], n = (e) => t.length === 1 ? 0 : Math.round(e * 100 / (t.length - 1));
	return t.map((e, t) => e && typeof e == "object" ? {
		color: e.color ?? "#0b0e14",
		at: typeof e.at == "number" ? e.at : n(t)
	} : {
		color: e,
		at: n(t)
	});
}
function Oa(e) {
	let t = [...Da(e)].sort((e, t) => e.at - t.at), n = [
		0,
		...t.slice(0, -1).map((e, n) => (e.at + t[n + 1].at) / 2),
		100
	];
	return t.map((e, t) => ({
		color: e.color,
		share: Math.round((n[t + 1] - n[t]) * 10) / 10
	}));
}
var ka = /* @__PURE__ */ new Set(), Aa = !1;
function ja(e) {
	ka.add(e), !(Aa || typeof window > "u") && (Aa = !0, window.addEventListener("resize", () => {
		for (let e of [...ka]) e() || ka.delete(e);
	}));
}
var Ma = !1;
function Na() {
	if (!Ma) {
		Ma = !0;
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
var Pa = {
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
			stops: Da(e.stops)
		}),
		2: (e) => ({
			kind: e.kind === "radial" ? "radial" : "linear",
			stops: Oa(e.stops),
			angle: e.angle ?? 160,
			x: e.x ?? .5,
			y: e.y ?? .5,
			animation: e.animate ? e.kind === "radial" ? "orbit" : "pan" : "none",
			opacity: e.opacity ?? 1
		})
	},
	render(e, t) {
		let n = Ea(t);
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
					let e = wa(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ta(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), ja(r);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Na());
	}
}, Fa = {
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
		let n = ya(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Ia = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", La = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Ia, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ra = {
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
function za(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ba({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Va(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/backgrounds/bildegalleri.js
var Ha = {
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
		if (!Ba({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Va(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = za(l, 1, n.length), r = new Image();
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
};
//#endregion
//#region ../template/assets/engine/footer-thumb.js
function Ua(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Wa(n, e.baselineLinks), o + "</svg>";
	let s = e.center ? 80 : 16;
	if (o += `<rect x="${s - (e.center ? 9 : 0)}" y="14" width="18" height="6" rx="2" fill="${t}"/>`, e.tag && (o += `<rect x="${e.center ? s - 22 : 16}" y="24" width="44" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`), e.cta && (o += `<rect x="16" y="31" width="40" height="8" rx="2" fill="none" stroke="${n}" stroke-width="1" opacity="0.7"/>`, o += `<rect x="58" y="31" width="16" height="8" rx="2" fill="${t}"/>`), e.row) o += `<g fill="${n}" opacity="0.7">` + [
		0,
		1,
		2,
		3
	].map((e) => `<rect x="${44 + e * 20}" y="40" width="14" height="4" rx="2"/>`).join("") + "</g>";
	else if (i) {
		let e = 160 - i * 30 - 6;
		for (let r = 0; r < i; r++) {
			let i = e + r * 30;
			o += `<rect x="${i}" y="16" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${i}" y="${24 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
	}
	let c = e.center ? 80 - a * 9 / 2 : 16;
	for (let e = 0; e < a; e++) o += `<rect x="${c + e * 9}" y="52" width="6.5" height="6.5" rx="2" fill="none" stroke="${n}" stroke-width="1"/>`;
	return o += Wa(n, e.baselineLinks), o + "</svg>";
}
function Wa(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/animations/core.js
var Ga = () => ({
	duration: 600,
	delay: 0
}), Ka = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Ga,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Ga,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Ga,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
}, qa = [
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
function Ja(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Ya = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Xa = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fargen\"></button>"), Za = /* @__PURE__ */ K("<span><span class=\"grad-grip svelte-1n46o8q\" title=\"Dra for å endre fargenes rekkefølge\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvor mye plass fargen tar; 0 gir en hard kant mot nabofargen\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Qa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sentrum X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Sentrum Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), $a = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), eo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <!> <button class=\"ghost action svelte-1n46o8q\" title=\"Ny farge nederst i listen; dra i håndtaket for rekkefølgen\">+ Legg til farge</button> <!> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Gjelder selve gradienten - uavhengig av Animasjon-valget nederst, som gjelder innholdet\" class=\"svelte-1n46o8q\">Bevegelse <!></label>", 1), to = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), no = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ro = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), io = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ao = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), oo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), so = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), co = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button>", 1), lo = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), uo = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Lenketeksten\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern lenken\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), fo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Skyggefarge <!></label>"), po = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kantfarge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse (px) <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" title=\"Tynnere\" aria-label=\"Tynnere\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" title=\"Tykkere\" aria-label=\"Tykkere\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), mo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Blokkfarge <!></label> <label class=\"svelte-1n46o8q\">Skygge <!></label> <!> <label class=\"svelte-1n46o8q\">Kantlinje <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Frostet glass: gjennomskinnelig kort med uskarp bakgrunn - best over bilder og gradienter\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glass-effekt (frostet)</label>", 1), ho = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <!>", 1), go = /* @__PURE__ */ K("<span class=\"nav-line svelte-1n46o8q\"><input title=\"Spørsmålsteksten (svaret skrives rett i blokken)\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern spørsmålet\"></button></span></span>"), _o = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Ellers lukkes forrige svar når et nytt åpnes\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Flere svar åpne samtidig</label> <p class=\"panel-strong svelte-1n46o8q\">Spørsmål</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt spørsmål</button> <p class=\"panel-strong svelte-1n46o8q\">Kortstil</p> <!>", 1), vo = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), yo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), bo = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), xo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), So = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Co = /* @__PURE__ */ K("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), wo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), To = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), Eo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Do = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), Oo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ko = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Ao = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), jo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), Mo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), No = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">Innstillinger …</button> <p class=\"panel-hint svelte-1n46o8q\">Åpner blokkens innstillinger i forhåndsvisningen.</p>", 1), Po = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Fo = /* @__PURE__ */ K("<label title=\"Avstanden fra vinduets topp mens blokken er festet; en klistret meny kan kreve større avstand\" class=\"svelte-1n46o8q\">Avstand fra toppen <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label title=\"Hvor festingen slutter: ved egen seksjon, eller først når en senere seksjon er passert\" class=\"svelte-1n46o8q\">Slipp taket <!></label>", 1), Io = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Blokken blir stående ved vindustoppen mens besøkende scroller. Prøv i Ren visning; gjelder ikke mobil.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fest ved scrolling</label> <!>", 1), Lo = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Ro = /* @__PURE__ */ K("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når blokken scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over blokken; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), zo = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), Bo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span> <button title=\"Hjelpelinjer: senter og innholdsbredde i alle seksjoner\"></button>", 1), Vo = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), Ho = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span> <button> </button>", 1), Uo = /* @__PURE__ */ K("<!> Ren visning", 1), Wo = /* @__PURE__ */ K("<!> Rediger", 1), Go = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), Ko = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), qo = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Jo = /* @__PURE__ */ K("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Yo = /* @__PURE__ */ K("<button> </button>"), Xo = /* @__PURE__ */ K("<!> <!>", 1), Zo = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Qo = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), $o = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), es = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), ts = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), ns = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), rs = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), is = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), as = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), os = /* @__PURE__ */ K("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), ss = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label>"), cs = /* @__PURE__ */ K("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ls = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\"> <!></label>"), us = /* @__PURE__ */ K("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), ds = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), fs = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), ps = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når bakgrunnen er gjennomsiktig)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), ms = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), hs = /* @__PURE__ */ K("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), gs = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), _s = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), vs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), ys = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button>"), bs = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), xs = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ss = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <button class=\"ghost svelte-1n46o8q\" title=\"Spørsmål og svar der svaret foldes ut ved klikk\">FAQ</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), Cs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), ws = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Ts = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Es = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når seksjonen scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over seksjonen; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label>", 1), Ds = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Os = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), ks = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fjern haken for å skjule footeren på denne siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), As = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Vis på sider</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), js = /* @__PURE__ */ K("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Ms = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern logoen\"></button>"), Ns = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Logohøyde <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ps = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp; materialiseres til media/ ved publisering\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Fs = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Kolonnens overskrift\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til lenke i kolonnen\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern kolonnen\"></button></span></div> <!>", 1), Is = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern lenken\"></button></span> <input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://… / mailto:…\"/></div>"), Ls = /* @__PURE__ */ K("<input placeholder=\"https://… / mailto:…\" class=\"svelte-1n46o8q\"/>"), Rs = /* @__PURE__ */ K("<label title=\"Hvor knappen går\" class=\"svelte-1n46o8q\">Knappen går til <!></label> <!>", 1), zs = /* @__PURE__ */ K("<label title=\"Skjema-adresse fra en tjeneste (Formspree/Mailchimp/Buttondown) eller egen Cloudflare-function; sendes med fetch. Ekstern vert krever at du legger connect-src for verten i _headers.\" class=\"svelte-1n46o8q\">Nyhetsbrev-endepunkt <input placeholder=\"https://formspree.io/f/…\" class=\"svelte-1n46o8q\"/></label> <label title=\"Fallback når endepunkt mangler: åpner e-post til denne adressen\" class=\"svelte-1n46o8q\">Mottaker (fallback) <input placeholder=\"post@dinforening.no\" class=\"svelte-1n46o8q\"/></label> <label title=\"Bekreftelsen som vises etter påmelding\" class=\"svelte-1n46o8q\">Bekreftelse <input placeholder=\"Takk, du er påmeldt!\" class=\"svelte-1n46o8q\"/></label>", 1), Bs = /* @__PURE__ */ K("<label title=\"Knapp går til en side/lenke; nyhetsbrev tar imot e-post\" class=\"svelte-1n46o8q\">Type <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Stor, sentrert variant (Stor CTA-stilen)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Stor sentrert</label> <label title=\"Overskrift over knappen/feltet\" class=\"svelte-1n46o8q\">Overskrift <input placeholder=\"Klar til å bli med?\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort undertekst\" class=\"svelte-1n46o8q\">Undertekst <input class=\"svelte-1n46o8q\"/></label> <label title=\"Teksten på knappen\" class=\"svelte-1n46o8q\">Knappetekst <input placeholder=\"Bli medlem\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Vs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Footeren redigeres ett sted og vises nederst på alle sider (unntatt sider du skrur av under «Vis på sider»)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer</label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Startpunkt</summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Merkevare</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Navnet øverst i footeren. Tomt = ingen merkevare\" class=\"svelte-1n46o8q\">Tittel <input placeholder=\"Min forening\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort undertekst under navnet\" class=\"svelte-1n46o8q\">Tagline <input class=\"svelte-1n46o8q\"/></label> <label title=\"Vis merket som tekst, opplastet logo (bilde) eller begge\" class=\"svelte-1n46o8q\">Vis merke som <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Kolonner</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny kolonne</button> <label title=\"Når en kolonne har mange lenker deles den i to underkolonner - her velger du om overskriften står til venstre eller midtstilt over paret\" class=\"svelte-1n46o8q\">Justering av delt kolonne <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Sosiale lenker</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny sosial lenke</button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Handlingsoppfordring</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\" title=\"En knapp eller nyhetsbrev-påmelding i footeren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis handlingsoppfordring</label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lenkerad (sentrert)</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny lenke i raden</button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Justering av innholdet (mest merkbart uten kolonner)\" class=\"svelte-1n46o8q\">Justering <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Bunnlinje</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Copyright/tekst til venstre i bunnlinja\" class=\"svelte-1n46o8q\">Copyright <input placeholder=\"© 2026 Min forening\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\">Lenker til høyre</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Ny bunnlinje-lenke</button></div></details></div>"), Hs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label>"), Us = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), Ws = /* @__PURE__ */ K("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Gs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), Ks = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), qs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), Js = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), Ys = /* @__PURE__ */ K("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Xs = /* @__PURE__ */ K("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Zs = /* @__PURE__ */ K("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), Qs = /* @__PURE__ */ K("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), $s = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), ec = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), tc = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), nc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), rc = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), ic = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), ac = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), oc = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), sc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), cc = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), lc = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), uc = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), dc = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), fc = /* @__PURE__ */ K("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), pc = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), mc = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), hc = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), gc = /* @__PURE__ */ K("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), _c = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function vc(e, t) {
	He(t, !0);
	let n = (e, t = d, n = d) => {
		var r = co(), i = B(z(r), 2);
		zr(i, 17, n, Fr, (e, r, i) => {
			var a = so(), s = R(a), l = R(s);
			{
				let e = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.label]));
				$(l, {
					get value() {
						return W(r).type;
					},
					title: "Bytt lagtype (innstillingene nullstilles)",
					get options() {
						return W(e);
					},
					onchange: (e) => wt(t(), i, e)
				});
			}
			var u = B(l, 2), d = R(u);
			d.disabled = i === 0, X(d, () => c.up, !0), j(d);
			var f = B(d, 2);
			X(f, () => c.down, !0), j(f);
			var p = B(f, 2);
			X(p, () => c.cross, !0), j(p), j(u), j(s);
			var m = B(s, 2), h = (e) => {
				var n = Ya(), a = z(n), o = B(R(a));
				{
					let e = /* @__PURE__ */ P(Nt);
					Ei(o, {
						get value() {
							return W(r).props.value;
						},
						get tokens() {
							return W(e);
						},
						label: "Lagets farge",
						onchange: (e) => ft(t(), i, "value", e)
					});
				}
				j(a);
				var s = B(a, 2), c = B(R(s)), l = R(c);
				j(c), j(s);
				var u = B(s, 2);
				Z(u), H((e) => {
					J(l, `${e ?? ""}%`), Q(u, W(r).props.opacity ?? 1);
				}, [() => Math.round((W(r).props.opacity ?? 1) * 100)]), G("input", u, (e) => ft(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ P(() => pt(W(r))), a = /* @__PURE__ */ P(() => W(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = eo(), s = z(o), l = B(R(s));
				{
					let e = /* @__PURE__ */ P(() => W(n).kind ?? "linear");
					$(l, {
						get value() {
							return W(e);
						},
						options: [["linear", "Lineær"], ["radial", "Radiell (fra et punkt)"]],
						onchange: (e) => _t(t(), i, e)
					});
				}
				j(s);
				var u = B(s, 2);
				zr(u, 17, () => W(n).stops, Fr, (e, r, o) => {
					var s = Za();
					let l;
					var u = R(s), d = B(u, 2);
					{
						let e = /* @__PURE__ */ P(Nt);
						Ei(d, {
							get value() {
								return W(r).color;
							},
							get tokens() {
								return W(e);
							},
							label: "Fargen",
							onchange: (e) => vt(t(), i, o, { color: e })
						});
					}
					var f = B(d, 2);
					Z(f);
					var p = B(f, 2), m = R(p);
					j(p);
					var h = B(p, 2), g = (e) => {
						var n = Xa();
						X(n, () => c.cross, !0), j(n), G("click", n, () => bt(t(), i, o)), q(e, n);
					};
					Y(h, (e) => {
						W(n).stops.length > 2 && e(g);
					}), j(s), H((e) => {
						l = Xr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: W(St)?.layer === i && W(St).from === o,
							"drop-above": W(St)?.layer === i && W(St).insert === o,
							"drop-below": W(St)?.layer === i && W(St).insert === W(n).stops.length && o === W(n).stops.length - 1
						}), Q(f, W(r).share ?? 50), J(m, `${e ?? ""}%`);
					}, [() => W(a) > 0 ? Math.round(Math.max(0, Number(W(r).share) || 0) / W(a) * 100) : Math.round(100 / W(n).stops.length)]), G("pointerdown", u, (e) => Ct(t(), e, i, o)), G("input", f, (e) => vt(t(), i, o, { share: Number(e.target.value) })), q(e, s);
				});
				var d = B(u, 2), f = B(d, 2), p = (e) => {
					var r = Qa(), a = z(r), o = B(R(a)), s = R(o);
					j(o), j(a);
					var c = B(a, 2);
					Z(c);
					var l = B(c, 2), u = B(R(l)), d = R(u);
					j(u), j(l);
					var f = B(l, 2);
					Z(f), H((e, t) => {
						J(s, `${e ?? ""}%`), Q(c, W(n).x ?? .5), J(d, `${t ?? ""}%`), Q(f, W(n).y ?? .5);
					}, [() => Math.round((W(n).x ?? .5) * 100), () => Math.round((W(n).y ?? .5) * 100)]), G("input", c, (e) => ht(t(), i, "x", Number(e.target.value))), G("input", f, (e) => ht(t(), i, "y", Number(e.target.value))), q(e, r);
				}, m = (e) => {
					var r = $a(), a = z(r), o = B(R(a)), s = R(o);
					j(o), j(a);
					var c = B(a, 2);
					Z(c), H(() => {
						J(s, `${W(n).angle ?? ""}°`), Q(c, W(n).angle);
					}), G("input", c, (e) => ht(t(), i, "angle", Number(e.target.value))), q(e, r);
				};
				Y(f, (e) => {
					(W(n).kind ?? "linear") === "radial" ? e(p) : e(m, -1);
				});
				var h = B(f, 2), g = B(R(h)), _ = R(g);
				j(g), j(h);
				var v = B(h, 2);
				Z(v);
				var y = B(v, 2), b = B(R(y));
				{
					let e = /* @__PURE__ */ P(() => W(n).animation ?? "none");
					$(b, {
						get value() {
							return W(e);
						},
						get options() {
							return gt[(W(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => ht(t(), i, "animation", e)
					});
				}
				j(y), H((e) => {
					J(_, `${e ?? ""}%`), Q(v, W(n).opacity ?? 1);
				}, [() => Math.round((W(n).opacity ?? 1) * 100)]), G("click", d, () => yt(t(), i)), G("input", v, (e) => ht(t(), i, "opacity", Number(e.target.value))), q(e, o);
			}, _ = (e) => {
				var n = to(), a = z(n), o = B(R(a));
				{
					let e = /* @__PURE__ */ P(Nt);
					Ei(o, {
						get value() {
							return W(r).props.color;
						},
						get tokens() {
							return W(e);
						},
						label: "Glødens farge",
						onchange: (e) => ft(t(), i, "color", e)
					});
				}
				j(a);
				var s = B(a, 2), c = B(R(s)), l = R(c);
				j(c), j(s);
				var u = B(s, 2);
				Z(u);
				var d = B(u, 2), f = B(R(d)), p = R(f);
				j(f), j(d);
				var m = B(d, 2);
				Z(m);
				var h = B(m, 2), g = B(R(h)), _ = R(g);
				j(g), j(h);
				var v = B(h, 2);
				Z(v);
				var y = B(v, 2), b = B(R(y)), x = R(b);
				j(b), j(y);
				var S = B(y, 2);
				Z(S), H((e, t, n, i) => {
					J(l, `${e ?? ""}%`), Q(u, W(r).props.x), J(p, `${t ?? ""}%`), Q(m, W(r).props.y), J(_, `${n ?? ""}%`), Q(v, W(r).props.radius), J(x, `${i ?? ""}%`), Q(S, W(r).props.opacity);
				}, [
					() => Math.round(W(r).props.x * 100),
					() => Math.round(W(r).props.y * 100),
					() => Math.round(W(r).props.radius * 100),
					() => Math.round(W(r).props.opacity * 100)
				]), G("input", u, (e) => ft(t(), i, "x", Number(e.target.value))), G("input", m, (e) => ft(t(), i, "y", Number(e.target.value))), G("input", v, (e) => ft(t(), i, "radius", Number(e.target.value))), G("input", S, (e) => ft(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, v = (e) => {
				var n = no(), a = z(n), o = B(R(a)), s = R(o);
				j(o), j(a);
				var c = B(a, 2);
				Z(c), H((e) => {
					J(s, `${e ?? ""}%`), Q(c, W(r).props.opacity);
				}, [() => Math.round(W(r).props.opacity * 100)]), G("input", c, (e) => ft(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, y = (e) => {
				var n = io(), a = z(n), o = R(a), s = B(o);
				j(a);
				var c = B(a, 2), l = B(R(c));
				{
					let e = /* @__PURE__ */ P(() => W(r).props.fit ?? "cover");
					$(l, {
						get value() {
							return W(e);
						},
						options: [
							["cover", "Fyll (beskjæres)"],
							["contain", "Vis hele"],
							["repeat", "Gjenta (mønster)"]
						],
						onchange: (e) => ft(t(), i, "fit", e)
					});
				}
				j(c);
				var u = B(c, 2), d = (e) => {
					var n = ro(), a = z(n), o = B(R(a)), s = R(o);
					j(o), j(a);
					var c = B(a, 2);
					Z(c);
					var l = B(c, 2), u = B(R(l)), d = R(u);
					j(u), j(l);
					var f = B(l, 2);
					Z(f), H((e, t) => {
						J(s, `${e ?? ""}%`), Q(c, W(r).props.x ?? .5), J(d, `${t ?? ""}%`), Q(f, W(r).props.y ?? .5);
					}, [() => Math.round((W(r).props.x ?? .5) * 100), () => Math.round((W(r).props.y ?? .5) * 100)]), G("input", c, (e) => ft(t(), i, "x", Number(e.target.value))), G("input", f, (e) => ft(t(), i, "y", Number(e.target.value))), q(e, n);
				};
				Y(u, (e) => {
					(W(r).props.fit ?? "cover") !== "repeat" && e(d);
				});
				var f = B(u, 2), p = B(R(f)), m = R(p);
				j(p), j(f);
				var h = B(f, 2);
				Z(h);
				var g = B(h, 2), _ = B(R(g)), v = R(_);
				j(_), j(g);
				var y = B(g, 2);
				Z(y), H((e) => {
					J(o, `${W(r).props.src ? "Bytt bilde" : "Velg bilde"} `), J(m, `${W(r).props.blur ?? 0 ?? ""} px`), Q(h, W(r).props.blur ?? 0), J(v, `${e ?? ""}%`), Q(y, W(r).props.opacity ?? 1);
				}, [() => Math.round((W(r).props.opacity ?? 1) * 100)]), G("change", s, (e) => Tt(t(), i, e)), G("input", h, (e) => ft(t(), i, "blur", Number(e.target.value))), G("input", y, (e) => ft(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, b = (e) => {
				var n = oo(), a = z(n), o = B(R(a));
				j(a);
				var s = B(a, 2);
				zr(s, 17, () => W(r).props.images ?? [], Fr, (e, n, a) => {
					var o = ao(), s = z(o), l = R(s), u = B(l, 2), d = R(u);
					d.disabled = a === 0, X(d, () => c.up, !0), j(d);
					var f = B(d, 2);
					X(f, () => c.down, !0), j(f);
					var p = B(f, 2);
					X(p, () => c.cross, !0), j(p), j(u), j(s);
					var m = B(s, 2), h = B(R(m)), g = R(h);
					j(h), j(m);
					var _ = B(m, 2);
					Z(_);
					var v = B(_, 2), y = B(R(v)), b = R(y);
					j(y), j(v);
					var x = B(v, 2);
					Z(x), H((e, t) => {
						ii(l, "src", W(n).src), f.disabled = a === W(r).props.images.length - 1, J(g, `${e ?? ""}%`), Q(_, W(n).x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(n).y ?? .5);
					}, [() => Math.round((W(n).x ?? .5) * 100), () => Math.round((W(n).y ?? .5) * 100)]), G("click", d, () => F(t(), i, a, -1)), G("click", f, () => F(t(), i, a, 1)), G("click", p, () => Dt(t(), i, a)), G("input", _, (e) => Ot(t(), i, a, "x", Number(e.target.value))), G("input", x, (e) => Ot(t(), i, a, "y", Number(e.target.value))), q(e, o);
				});
				var l = B(s, 2), u = B(R(l));
				{
					let e = /* @__PURE__ */ P(() => W(r).props.fit ?? "cover");
					$(u, {
						get value() {
							return W(e);
						},
						options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
						onchange: (e) => ft(t(), i, "fit", e)
					});
				}
				j(l);
				var d = B(l, 2), f = B(R(d));
				Z(f), j(d);
				var p = B(d, 2), m = B(R(p)), h = R(m);
				j(m), j(p);
				var g = B(p, 2);
				Z(g);
				var _ = B(g, 2), v = B(R(_)), y = R(v);
				j(v), j(_);
				var b = B(_, 2);
				Z(b);
				var x = B(b, 2), S = B(R(x)), C = R(S);
				j(S), j(x);
				var ee = B(x, 2);
				Z(ee), M(2), H((e, t) => {
					Q(f, W(r).props.interval ?? 6), J(h, `${e ?? ""} s`), Q(g, W(r).props.fade ?? 1.5), J(y, `${W(r).props.blur ?? 0 ?? ""} px`), Q(b, W(r).props.blur ?? 0), J(C, `${t ?? ""}%`), Q(ee, W(r).props.opacity ?? 1);
				}, [() => (W(r).props.fade ?? 1.5).toFixed(1), () => Math.round((W(r).props.opacity ?? 1) * 100)]), G("change", o, (e) => Et(t(), i, e)), G("change", f, (e) => ft(t(), i, "interval", Number(e.target.value))), G("input", g, (e) => ft(t(), i, "fade", Number(e.target.value))), G("input", b, (e) => ft(t(), i, "blur", Number(e.target.value))), G("input", ee, (e) => ft(t(), i, "opacity", Number(e.target.value))), q(e, n);
			};
			Y(m, (e) => {
				W(r).type === "color" ? e(h) : W(r).type === "gradient" ? e(g, 1) : W(r).type === "glow" ? e(_, 2) : W(r).type === "grain" ? e(v, 3) : W(r).type === "image" ? e(y, 4) : W(r).type === "bildegalleri" && e(b, 5);
			}), j(a), H(() => f.disabled = i === n().length - 1), G("click", d, () => dt(t(), i, -1)), G("click", f, () => dt(t(), i, 1)), G("click", p, () => ut(t(), i)), q(e, a);
		});
		var a = B(i, 2), s = B(R(a));
		{
			let e = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.label]));
			$(s, {
				get value() {
					return W(ct);
				},
				get options() {
					return W(e);
				},
				onchange: (e) => L(ct, e, !0)
			});
		}
		j(a), G("click", B(a, 2), () => lt(t(), W(ct))), q(e, r);
	}, r = (e, t = d, n = d) => {
		var r = kr();
		zr(z(r), 17, n, Fr, (e, r, i) => {
			var a = uo(), o = R(a);
			Z(o);
			var s = B(o, 2), l = R(s);
			l.disabled = i === 0, X(l, () => c.up, !0), j(l);
			var u = B(l, 2);
			X(u, () => c.down, !0), j(u);
			var d = B(u, 2);
			X(d, () => c.cross, !0), j(d), j(s);
			var f = B(s, 2), p = R(f);
			{
				let e = /* @__PURE__ */ P(() => W(r).page ?? "__href"), n = /* @__PURE__ */ P(() => [...W(D).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				$(p, {
					get value() {
						return W(e);
					},
					title: "Hvor lenken går",
					get options() {
						return W(n);
					},
					onchange: (e) => Zr(t(), i, e)
				});
			}
			j(f);
			var m = B(f, 2), h = (e) => {
				var n = lo();
				Z(n), H(() => Q(n, W(r).href ?? "")), G("change", n, (e) => $r(t(), i, e.target.value)), q(e, n);
			};
			Y(m, (e) => {
				W(r).page || e(h);
			}), j(a), H(() => {
				Q(o, W(r).label), u.disabled = i === n().length - 1;
			}), G("input", o, (e) => Yr(t(), i, e.target.value)), G("click", l, () => Jr(t(), i, -1)), G("click", u, () => Jr(t(), i, 1)), G("click", d, () => qr(t(), i)), q(e, a);
		}), q(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ P(() => W(A).props.boxStyle ?? {});
		var n = mo(), r = z(n), i = B(R(r));
		{
			let e = /* @__PURE__ */ P(() => W(t).bg ?? ""), n = /* @__PURE__ */ P(Nt);
			Ei(i, {
				get value() {
					return W(e);
				},
				get tokens() {
					return W(n);
				},
				allowClear: !0,
				label: "Bakgrunnsfarge for boksen (tom = temaets flate)",
				onchange: (e) => Be({ bg: e || null })
			});
		}
		j(r);
		var a = B(r, 2), o = B(R(a));
		{
			let e = /* @__PURE__ */ P(() => W(t).shadow ?? "");
			$(o, {
				get value() {
					return W(e);
				},
				options: [
					["", "Ingen"],
					["soft", "Myk"],
					["strong", "Tydelig"]
				],
				onchange: (e) => Be({ shadow: e || null })
			});
		}
		j(a);
		var s = B(a, 2), c = (e) => {
			var n = fo(), r = B(R(n));
			{
				let e = /* @__PURE__ */ P(() => W(t).shadowColor ?? ""), n = /* @__PURE__ */ P(Nt);
				Ei(r, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(n);
					},
					allowClear: !0,
					label: "Skyggens farge (tom = svart)",
					onchange: (e) => Be({ shadowColor: e || null })
				});
			}
			j(n), q(e, n);
		};
		Y(s, (e) => {
			W(t).shadow && e(c);
		});
		var l = B(s, 2), u = B(R(l));
		{
			let e = /* @__PURE__ */ P(() => W(t).border === "none" ? "none" : W(t).border ? "custom" : "");
			$(u, {
				get value() {
					return W(e);
				},
				options: [
					["", "Temaets (tynn)"],
					["none", "Ingen"],
					["custom", "Egen farge"]
				],
				onchange: (e) => Be({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		j(l);
		var d = B(l, 2), f = (e) => {
			let n = /* @__PURE__ */ P(() => typeof W(t).border == "object" ? W(t).border : {
				color: "text",
				width: 1
			});
			var r = po(), i = z(r), a = B(R(i));
			{
				let e = /* @__PURE__ */ P(Nt);
				Ei(a, {
					get value() {
						return W(n).color;
					},
					get tokens() {
						return W(e);
					},
					label: "Kantlinjens farge",
					onchange: (e) => Be({ border: {
						...W(n),
						color: e
					} })
				});
			}
			j(i);
			var o = B(i, 2), s = B(R(o)), c = R(s), l = B(c, 2);
			Z(l);
			var u = B(l, 2);
			j(s), j(o), H(() => Q(l, W(n).width)), G("click", c, () => Be({ border: {
				...W(n),
				width: Math.max(1, W(n).width - 1)
			} })), G("change", l, (e) => Be({ border: {
				...W(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), G("click", u, () => Be({ border: {
				...W(n),
				width: Math.min(12, W(n).width + 1)
			} })), q(e, r);
		};
		Y(d, (e) => {
			W(t).border !== "none" && e(f);
		});
		var p = B(d, 2), m = R(p);
		Z(m), M(), j(p), H((e) => ri(m, e), [() => !!W(t).glass]), G("change", m, (e) => Be({ glass: e.target.checked || null })), q(e, n);
	}, a = (e) => {
		var t = Ro(), n = z(t), r = (e) => {
			var t = ho(), n = z(t), r = B(R(n));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.align ?? "left");
				$(r, {
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
			j(n);
			var a = B(n, 2), o = R(a);
			Z(o), M(), j(a);
			var s = B(a, 2), c = (e) => {
				i(e);
			};
			Y(s, (e) => {
				W(A).props.box && e(c);
			}), H((e) => ri(o, e), [() => !!W(A).props.box]), G("change", o, (e) => N("box", e.target.checked)), q(e, t);
		}, a = (e) => {
			var t = _o(), n = z(t), r = R(n);
			Z(r), M(), j(n);
			var a = B(n, 4);
			zr(a, 17, () => W(A).props.items ?? [], Fr, (e, t, n) => {
				var r = go(), i = R(r);
				Z(i);
				var a = B(i, 2), o = R(a);
				o.disabled = n === 0, X(o, () => c.up, !0), j(o);
				var s = B(o, 2);
				X(s, () => c.down, !0), j(s);
				var l = B(s, 2);
				X(l, () => c.cross, !0), j(l), j(a), j(r), H(() => {
					Q(i, W(t).q), s.disabled = n === (W(A).props.items?.length ?? 0) - 1;
				}), G("change", i, (e) => Ve(n, { q: e.target.value })), G("click", o, () => Ke(n, -1)), G("click", s, () => Ke(n, 1)), G("click", l, () => Ge(n)), q(e, r);
			});
			var o = B(a, 2), s = B(o, 4);
			i(s), H((e) => ri(r, e), [() => !!W(A).props.multi]), G("change", r, (e) => N("multi", e.target.checked)), G("click", o, We), q(e, t);
		}, o = (e) => {
			var t = yo(), n = z(t), r = B(R(n));
			Z(r), j(n);
			var i = B(n, 2), a = B(R(i));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...W(D).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				$(a, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						Le(`edit:${W(A).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			j(i);
			var o = B(i, 2), s = (e) => {
				var t = vo();
				Z(t), H(() => Q(t, W(A).props.href === "#" ? "" : W(A).props.href ?? "")), G("change", t, (e) => N("href", e.target.value || null)), q(e, t);
			};
			Y(o, (e) => {
				W(A).props.page || e(s);
			});
			var c = B(o, 2);
			$(B(R(c)), {
				get value() {
					return W(A).props.style;
				},
				options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
				onchange: (e) => N("style", e)
			}), j(c), H(() => Q(r, W(A).props.label)), G("change", r, (e) => N("label", e.target.value)), q(e, t);
		}, s = (e) => {
			var t = xo(), n = z(t), r = B(R(n));
			j(n);
			var i = B(n, 2), a = B(R(i));
			Z(a), j(i);
			var o = B(i, 2), s = B(R(o));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.fit ?? "cover");
				$(s, {
					get value() {
						return W(e);
					},
					options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
					onchange: (e) => N("fit", e)
				});
			}
			j(o);
			var c = B(o, 2), l = B(R(c));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.radius ?? "");
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
			var u = B(c, 2), d = B(R(u));
			Z(d), j(u);
			var f = B(u, 2), p = (e) => {
				var t = bo(), n = R(t);
				Z(n), M(), j(t), H((e) => ri(n, e), [() => !!W(A).props.lightbox]), G("change", n, (e) => N("lightbox", e.target.checked)), q(e, t);
			};
			Y(f, (e) => {
				W(A).props.href || e(p);
			});
			var m = B(f, 2), h = B(R(m)), g = R(h);
			j(h), j(m);
			var _ = B(m, 2);
			Z(_);
			var v = B(_, 2), y = B(R(v)), b = R(y);
			j(y), j(v);
			var x = B(v, 2);
			Z(x);
			var S = B(x, 2), C = B(R(S)), ee = R(C);
			j(C), j(S);
			var te = B(S, 2);
			Z(te);
			var ne = B(te, 2), re = B(R(ne)), ie = R(re);
			j(re), j(ne);
			var w = B(ne, 2);
			Z(w);
			var T = B(w, 2), E = B(R(T)), D = R(E);
			j(E), j(T);
			var ae = B(T, 2);
			Z(ae);
			var oe = B(ae, 2), se = B(R(oe)), ce = R(se);
			j(se), j(oe);
			var O = B(oe, 2);
			Z(O);
			var le = B(O, 2);
			H((e, t, n, r, i, o) => {
				Q(a, W(A).props.alt ?? ""), Q(d, W(A).props.href ?? ""), J(g, `${e ?? ""}%`), Q(_, W(A).props.x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(A).props.y ?? .5), J(ee, `${n ?? ""}x`), Q(te, W(A).props.zoom ?? 1), J(ie, `${r ?? ""}%`), Q(w, W(A).props.brightness ?? 1), J(D, `${i ?? ""}%`), Q(ae, W(A).props.contrast ?? 1), J(ce, `${o ?? ""}%`), Q(O, W(A).props.saturate ?? 1);
			}, [
				() => Math.round((W(A).props.x ?? .5) * 100),
				() => Math.round((W(A).props.y ?? .5) * 100),
				() => (W(A).props.zoom ?? 1).toFixed(2),
				() => Math.round((W(A).props.brightness ?? 1) * 100),
				() => Math.round((W(A).props.contrast ?? 1) * 100),
				() => Math.round((W(A).props.saturate ?? 1) * 100)
			]), G("change", r, Je), G("change", a, (e) => N("alt", e.target.value)), G("change", d, (e) => N("href", e.target.value || null)), G("input", _, (e) => N("x", Number(e.target.value))), G("input", x, (e) => N("y", Number(e.target.value))), G("input", te, (e) => N("zoom", Number(e.target.value))), G("input", w, (e) => N("brightness", Number(e.target.value))), G("input", ae, (e) => N("contrast", Number(e.target.value))), G("input", O, (e) => N("saturate", Number(e.target.value))), G("click", le, () => Le(`edit:${W(A).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), q(e, t);
		}, l = (e) => {
			var t = So(), n = B(z(t), 2);
			Z(n);
			var r = B(n, 2), i = B(R(r));
			Z(i), j(r), M(2), H(() => {
				Q(n, W(A).props.url ?? ""), Q(i, W(A).props.title ?? "");
			}), G("change", n, (e) => N("url", e.target.value)), G("change", i, (e) => N("title", e.target.value)), q(e, t);
		}, u = (e) => {
			var t = Eo(), n = z(t), r = B(R(n)), i = R(r);
			{
				let e = /* @__PURE__ */ P(() => W(A).props.glyph ?? "★"), t = /* @__PURE__ */ P(() => W(A).props.icon ?? null), n = /* @__PURE__ */ P(() => W(A).props.image ?? null);
				$i(i, {
					get value() {
						return W(e);
					},
					get icon() {
						return W(t);
					},
					get image() {
						return W(n);
					},
					onpick: (e) => Le(`edit:${W(A).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => Le(`edit:${W(A).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => N("image", e)
				});
			}
			var a = B(i, 2), o = (e) => {
				var t = Co();
				Z(t), H(() => Q(t, W(A).props.glyph ?? "")), G("change", t, (e) => N("glyph", e.target.value || "★")), q(e, t);
			}, s = (e) => {
				var t = wo();
				G("click", t, () => N("icon", null)), q(e, t);
			};
			Y(a, (e) => {
				W(A).props.icon ? e(s, -1) : e(o);
			}), j(r), j(n);
			var c = B(n, 2), l = (e) => {
				var t = To(), n = z(t), r = R(n), i = B(r, 2);
				j(n), M(2), H(() => ii(r, "src", W(A).props.image)), G("click", i, () => N("image", null)), q(e, t);
			};
			Y(c, (e) => {
				W(A).props.image && e(l);
			});
			var u = B(c, 2), d = B(R(u));
			Z(d), j(u);
			var f = B(u, 2), p = B(R(f));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.color ?? "accent"), t = /* @__PURE__ */ P(Nt);
				Ei(p, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(t);
					},
					onchange: (e) => N("color", e)
				});
			}
			j(f), M(2), H(() => Q(d, W(A).props.size ?? 48)), G("change", d, (e) => N("size", Number(e.target.value))), q(e, t);
		}, d = (e) => {
			var t = Do(), n = z(t), r = B(R(n));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...W(qn).map((e) => [e, W(Jn)[e]?.name ?? e])]);
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
			var i = B(n, 2), a = B(R(i));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.view ?? "cards");
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
			var o = B(i, 2), s = B(R(o));
			Z(s), j(o);
			var c = B(o, 2), l = R(c);
			Z(l), M(), j(c), M(2), H(() => {
				Q(s, W(A).props.limit ?? 6), ri(l, W(A).props.newestFirst !== !1);
			}), G("change", s, (e) => N("limit", Number(e.target.value))), G("change", l, (e) => N("newestFirst", e.target.checked)), q(e, t);
		}, f = (e) => {
			var t = jo(), n = z(t), r = B(R(n));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.view ?? "grid");
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
			var i = B(n, 2), a = (e) => {
				var t = Oo(), n = z(t), r = B(R(n));
				Z(r), j(n);
				var i = B(n, 2), a = B(R(i)), o = R(a);
				j(a), j(i);
				var s = B(i, 2);
				Z(s), H(() => {
					Q(r, W(A).props.columns ?? 3), J(o, `${W(A).props.gap ?? 12 ?? ""} px`), Q(s, W(A).props.gap ?? 12);
				}), G("change", r, (e) => N("columns", Number(e.target.value))), G("input", s, (e) => N("gap", Number(e.target.value))), q(e, t);
			};
			Y(i, (e) => {
				(W(A).props.view ?? "grid") === "grid" && e(a);
			});
			var o = B(i, 2), s = (e) => {
				var t = ko(), n = B(R(t));
				Z(n), j(t), H(() => Q(n, W(A).props.interval ?? 5)), G("change", n, (e) => N("interval", Number(e.target.value))), q(e, t);
			};
			Y(o, (e) => {
				W(A).props.view === "slides" && e(s);
			});
			var l = B(o, 2), u = B(R(l));
			{
				let e = /* @__PURE__ */ P(() => W(A).props.radius ?? "");
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
			var d = B(l, 2), f = R(d);
			Z(f), M(), j(d);
			var p = B(d, 4), m = B(R(p));
			j(p), zr(B(p, 2), 17, () => W(A).props.images ?? [], Fr, (e, t, n) => {
				var r = Ao(), i = R(r), a = R(i), o = B(a, 2), s = R(o);
				s.disabled = n === 0, X(s, () => c.up, !0), j(s);
				var l = B(s, 2);
				X(l, () => c.down, !0), j(l);
				var u = B(l, 2);
				X(u, () => c.cross, !0), j(u), j(o), j(i);
				var d = B(i, 2), f = B(R(d));
				Z(f), j(d);
				var p = B(d, 2), m = B(R(p));
				Z(m), j(p), j(r), H(() => {
					ii(a, "src", W(t).src), l.disabled = n === W(A).props.images.length - 1, Q(f, W(t).alt ?? ""), Q(m, W(t).href ?? "");
				}), G("click", s, () => Ga(n, -1)), G("click", l, () => Ga(n, 1)), G("click", u, () => vc(n)), G("change", f, (e) => yc(n, "alt", e.target.value)), G("change", m, (e) => yc(n, "href", e.target.value || null)), q(e, r);
			}), M(2), H(() => ri(f, W(A).props.lightbox !== !1)), G("change", f, (e) => N("lightbox", e.target.checked)), G("change", m, Va), q(e, t);
		}, p = (e) => {
			var t = Mo(), n = z(t);
			$(B(R(n)), {
				get value() {
					return W(A).props.kind;
				},
				get options() {
					return Xe;
				},
				onchange: (e) => N("kind", e)
			}), j(n);
			var r = B(n, 2);
			$(B(R(r)), {
				get value() {
					return W(A).props.color;
				},
				get options() {
					return Ze;
				},
				onchange: (e) => N("color", e)
			}), j(r);
			var i = B(r, 2), a = B(R(i));
			Z(a), j(i);
			var o = B(i, 2), s = R(o);
			Z(s), M(), j(o), H((e) => {
				Q(a, W(A).props.thickness), ri(s, e);
			}, [() => !!W(A).props.fill]), G("change", a, (e) => N("thickness", Number(e.target.value))), G("change", s, (e) => N("fill", e.target.checked ? W(A).props.color : null)), q(e, t);
		}, m = (e) => {
			var t = No(), n = z(t);
			M(2), G("click", n, () => E?.sendOpenConfig(W(A).blockId)), q(e, t);
		};
		Y(n, (e) => {
			W(A).type === "text" ? e(r) : W(A).type === "faq" ? e(a, 1) : W(A).type === "button" ? e(o, 2) : W(A).type === "image" ? e(s, 3) : W(A).type === "video" ? e(l, 4) : W(A).type === "icon" ? e(u, 5) : W(A).type === "samling" ? e(d, 6) : W(A).type === "galleri" ? e(f, 7) : W(A).type === "shape" ? e(p, 8) : e(m, -1);
		});
		var h = B(n, 4), g = B(R(h));
		{
			let e = /* @__PURE__ */ P(() => Ft(W(A).animation) ? W(A).animation.type : "");
			$(g, {
				get value() {
					return W(e);
				},
				get options() {
					return It;
				},
				onchange: (e) => zt(e || null)
			});
		}
		j(h);
		var _ = B(h, 2), v = (e) => {
			var t = Po(), n = z(t), r = B(R(n));
			Z(r), j(n);
			var i = B(n, 2), a = B(R(i));
			Z(a), j(i), H(() => {
				Q(r, W(A).animation.props.duration), Q(a, W(A).animation.props.delay);
			}), G("change", r, (e) => Vt("duration", Number(e.target.value))), G("change", a, (e) => Vt("delay", Number(e.target.value))), q(e, t);
		}, y = /* @__PURE__ */ P(() => Ft(W(A).animation));
		Y(_, (e) => {
			W(y) && e(v);
		});
		var b = B(_, 2), x = B(R(b));
		{
			let e = /* @__PURE__ */ P(() => W(A).hover?.type ?? (W(A).animation && !Ft(W(A).animation) ? W(A).animation.type : ""));
			$(x, {
				get value() {
					return W(e);
				},
				get options() {
					return Lt;
				},
				onchange: (e) => Bt(e || null)
			});
		}
		j(b);
		var S = B(b, 2), C = (e) => {
			var t = Io(), n = B(z(t), 2), r = R(n);
			Z(r), M(), j(n);
			var i = B(n, 2), a = (e) => {
				var t = Fo(), n = z(t), r = B(R(n));
				Z(r), j(n);
				var i = B(n, 2), a = B(R(i));
				{
					let e = /* @__PURE__ */ P(() => W(A).sticky.until ?? ""), t = /* @__PURE__ */ P(Fe);
					$(a, {
						get value() {
							return W(e);
						},
						get options() {
							return W(t);
						},
						onchange: (e) => Le(`edit:${W(A).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				j(i), H(() => Q(r, W(A).sticky.offset ?? 16)), G("change", r, (e) => Le(`edit:${W(A).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), q(e, t);
			};
			Y(i, (e) => {
				W(A).sticky && e(a);
			}), H((e) => ri(r, e), [() => !!W(A).sticky]), G("change", r, (e) => Le(`edit:${W(A).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), q(e, t);
		};
		Y(S, (e) => {
			W(te) === "desktop" && e(C);
		});
		var ee = B(S, 4), ne = B(R(ee), 2), re = B(R(ne), 2), ie = (e) => {
			var t = Lo(), n = R(t), r = B(R(n));
			Z(r), j(n);
			var i = B(n, 2), a = B(R(i));
			Z(a), j(i);
			var o = B(i, 2), s = B(R(o));
			Z(s), j(o);
			var c = B(o, 2), l = B(R(c));
			Z(l), j(c);
			var u = B(c, 2), d = B(R(u));
			Z(d), j(u);
			var f = B(u, 2), p = B(R(f));
			Z(p), j(f), j(t), H(() => {
				Q(r, W(A).frame.x), Q(a, W(A).frame.y), Q(s, W(A).frame.w), Q(l, W(A).frame.h), Q(d, W(A).frame.z ?? 1), Q(p, W(A).frame.rot ?? 0);
			}), G("change", r, (e) => ze("x", Number(e.target.value))), G("change", a, (e) => ze("y", Number(e.target.value))), G("change", s, (e) => ze("w", Number(e.target.value))), G("change", l, (e) => ze("h", Number(e.target.value))), G("change", d, (e) => ze("z", Number(e.target.value))), G("change", p, (e) => ze("rot", Number(e.target.value))), q(e, t);
		};
		Y(re, (e) => {
			W(te) === "desktop" && e(ie);
		});
		var w = B(re, 2), T = R(w);
		Z(T), M(), j(w), j(ne), j(ee), H(() => ri(T, W(A).decor)), G("change", T, (e) => qe(e.target.checked)), q(e, t);
	}, o = [
		["color", ba],
		["gradient", Pa],
		["glow", Fa],
		["image", Ra],
		["bildegalleri", Ha],
		["grain", La]
	], s = Object.fromEntries(o), c = {
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
	}, l = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], u = /* @__PURE__ */ I(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	yn(() => {
		document.documentElement.dataset.adminTheme = W(u), localStorage.setItem("urd-admin-theme", W(u)), f();
	});
	function f() {
		let e = getComputedStyle(document.documentElement);
		E?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: e.getPropertyValue("--urd-color-accent").trim(),
			text: e.getPropertyValue("--urd-color-text").trim()
		});
	}
	let p = /* @__PURE__ */ I(null), h = /* @__PURE__ */ I(null), g = /* @__PURE__ */ I(!1), _ = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I("info"), y = 0;
	function b(e, t = "info") {
		L(_, e, !0), L(v, t, !0);
		let n = ++y;
		t === "ok" && setTimeout(() => {
			y === n && (L(_, ""), L(v, "info"));
		}, 8e3);
	}
	let x = /* @__PURE__ */ I(null), S = /* @__PURE__ */ I(null), C = /* @__PURE__ */ I(tn({
		size: 16,
		snap: !0
	})), ee = /* @__PURE__ */ I(!0), te = /* @__PURE__ */ I("desktop");
	yn(() => {
		let e = () => E?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
		let e = W(te);
		E?.sendViewport(e);
	});
	let ne = /* @__PURE__ */ I(0);
	function re() {
		L(ne, w?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ie(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, re(), E?.sendAttention(e.id, !0));
	}
	let w = null, T = null, E = null, D = /* @__PURE__ */ I(null);
	function ae() {
		L(D, T.data, !0), T.replace(W(D));
	}
	function oe() {
		E?.sendSite(Re(W(D)));
	}
	let se = /* @__PURE__ */ new Set(), ce = () => W(D).pages.find((e) => e.id === W(h));
	function O() {
		let e = W(D)?.pages?.some((e) => !se.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Gn?.hasDraft() || Object.values(Kn).some((e) => e.hasDraft());
		L(g, e || w?.hasDraft() && !se.has(W(h)) || T?.hasDraft() || dr?.hasDraft() || t || !1, !0);
	}
	let le = [], ue = [], de = null;
	function fe() {
		return JSON.stringify({
			pageId: W(h),
			page: w.data,
			site: T.data
		});
	}
	function pe(e) {
		e === de && (e.startsWith("edit:") || e.startsWith("grid:")) || (le.push(fe()), le.length > 50 && le.shift(), ue.length = 0, de = e);
	}
	function me(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (T.replace(r), ae(), T.save(), L(C, {
			snap: !0,
			...W(D).grid
		}, !0), oe(), t && t !== W(h) && W(D).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), pn(t, { keepHistory: !0 }), O();
			return;
		}
		w.replace(n), w.save(), O(), re(), Me(), at(w.data.sections.find((e) => e.id === W(Qe))), W(D).pages.some((e) => e.id === W(h)) ? E?.sendPage(W(h), w.data) : pn(W(D).pages[0].id, { keepHistory: !0 });
	}
	function he() {
		le.length && (ue.push(fe()), me(le.pop()), de = null, b("Angret"));
	}
	function ge() {
		ue.length && (le.push(fe()), me(ue.pop()), de = null, b("Gjentatt"));
	}
	function _e(e) {
		W(Pe) && (e.target instanceof Element && e.target.closest(".block-menu") || L(Pe, null));
	}
	function ve(e) {
		if (e.key === "Escape" && W(Pe)) {
			L(Pe, null);
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
			].includes(t.type)) || !W(A) || W(te) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ge() : he());
	}
	async function ye() {
		L(p, da(await (await fetch("/content/site.json")).json()), !0), T = mi("urd-draft-site", () => W(p)), T.replace(da(T.data)), T.save(), ae(), L(C, {
			snap: !0,
			...W(D).grid
		}, !0), await pn(new URLSearchParams(location.search).get("page") ?? W(D).pages[0].id), await Tr(), await $n(), await Xt(), W(S) && Qt(), (W(D).site.setup === !0 || W(D).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (L(we, W(D).site.title, !0), L(Te, W(D).theme.tokens.color.accent, !0), L(Ee, W(D).theme.tokens.color.bg, !0), L(Ce, !0));
	}
	let be = /* @__PURE__ */ I(null);
	function xe({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			L(be, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Se(e) {
		W(be)?.resolve(e), L(be, null);
	}
	let Ce = /* @__PURE__ */ I(!1), we = /* @__PURE__ */ I(""), Te = /* @__PURE__ */ I("#7c5cff"), Ee = /* @__PURE__ */ I("#0b0e14");
	function De() {
		localStorage.setItem("urd-setup-done", "1"), L(Ce, !1);
	}
	function Oe() {
		let e = W(we).trim();
		e && (V("setup", () => {
			W(D).site.title = e, W(D).nav.logo = {
				type: "text",
				value: e
			}, W(D).theme.tokens.color.accent = W(Te), W(D).theme.tokens.color.bg = W(Ee), delete W(D).site.setup;
		}), De(), b("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let ke = /* @__PURE__ */ I(null), k = [
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
	function Ae(e) {
		L(ke, W(ke) === e ? null : e, !0), E?.sendShowGrid(W(ke) === "Grid"), W(ke) === "Historikk" && on();
	}
	let A = /* @__PURE__ */ I(null);
	function je(e, t) {
		let n = w?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Me() {
		if (!W(A)) return;
		let { block: e } = je(W(A).sectionId, W(A).blockId);
		if (!e) {
			L(A, null);
			return;
		}
		L(A, {
			sectionId: W(A).sectionId,
			blockId: W(A).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function Ne(e) {
		if (L(Pe, null), !e.blockId) {
			L(A, null);
			return;
		}
		L(A, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && L(Qe, e.sectionId, !0), Me();
	}
	let Pe = /* @__PURE__ */ I(null);
	function Fe() {
		let e = w?.data.sections ?? [], t = e.findIndex((e) => e.id === W(A)?.sectionId);
		return [["", "Når egen seksjon er forbi"], ...e.slice(t + 1).map((e, n) => [e.id, `Ved seksjon ${t + 2 + n}`])];
	}
	function Ie(e) {
		if (Ne(e), !W(A)) return;
		let t = W(x)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + e.rect.top), Math.max(8, r));
		L(Pe, {
			left: n,
			top: i
		}, !0);
	}
	function Le(e, t) {
		let { section: n, block: r } = je(W(A)?.sectionId, W(A)?.blockId);
		r && (pe(e), t(r, n), ie(n, "blokk-endret"), w.save(), O(), E?.sendSection(W(h), n), Me());
	}
	function N(e, t) {
		Le(`edit:${W(A).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function ze(e, t) {
		Number.isFinite(t) && Le(`edit:frame-${W(A).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Be(e) {
		Le(`edit:${W(A).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Ve(e, t) {
		Le(`edit:${W(A).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function We() {
		Le("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: "Nytt spørsmål?",
				a: "<p>Skriv svaret her.</p>"
			});
		});
	}
	function Ge(e) {
		Le("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Ke(e, t) {
		let n = e + t;
		Le("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function qe(e) {
		Le("decor", (t) => {
			t.decor = e;
		});
	}
	async function Je(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Ai(t);
			Le(`edit:${W(A).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ji(t.name).replaceAll("-", " ");
			});
		} catch {
			b("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ye = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri",
		faq: "FAQ"
	}, Xe = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Ze = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Qe = /* @__PURE__ */ I(null), $e = /* @__PURE__ */ I(null), et = /* @__PURE__ */ I(""), tt = /* @__PURE__ */ I(tn([])), nt = /* @__PURE__ */ I(null), rt = /* @__PURE__ */ I(null);
	function at(e) {
		L($e, e?.grid ? { ...e.grid } : null, !0), L(et, e?.size?.minHeight ?? "", !0), L(tt, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(nt, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), L(rt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0);
	}
	function ot(e) {
		L(Qe, e.sectionId, !0), at(w?.data.sections.find((t) => t.id === e.sectionId));
	}
	function st(e, t) {
		let n = w.data.sections.find((e) => e.id === W(Qe));
		n && (pe(e), t(n), w.save(), O(), E?.sendSection(W(h), n), at(n));
	}
	let ct = /* @__PURE__ */ I("color");
	function lt(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: s[t].version ?? 1,
				props: s[t].defaults()
			});
		});
	}
	function ut(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function dt(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function ft(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function pt(e) {
		if ((e.version ?? 1) >= Pa.version) return e.props;
		let t = Re(e);
		return oa({
			type: "gradient",
			version: t.version ?? 1,
			props: t.props
		}, Pa).props;
	}
	function mt(e, t, n, r) {
		e.mutate(n, (e) => {
			let n = e.background.layers[t];
			if ((n.version ?? 1) < Pa.version) {
				let e = oa({
					type: "gradient",
					version: n.version ?? 1,
					props: Re(n.props)
				}, Pa);
				if (!e.ok) return;
				n.props = e.props, n.version = e.version;
			}
			r(n.props);
		});
	}
	function ht(e, t, n, r) {
		mt(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let gt = {
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
	function _t(e, t, n) {
		mt(e, t, e.keyPrefix, (e) => {
			e.kind = n, gt[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function vt(e, t, n, r) {
		mt(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function yt(e, t) {
		mt(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function bt(e, t, n) {
		mt(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function xt(e, t, n, r) {
		mt(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let St = /* @__PURE__ */ I(null);
	function Ct(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		L(St, {
			layer: n,
			from: r,
			insert: r
		}, !0);
		let o = a.getBoundingClientRect(), s = t.clientY - o.top, c = a.cloneNode(!0);
		c.style.cssText = `position:fixed;left:${o.left}px;top:${o.top}px;width:${o.width}px;display:flex;align-items:center;gap:0.4rem;pointer-events:none;z-index:1000;opacity:0.92;padding:2px 4px;background:var(--urd-color-surface);border:1px solid var(--urd-color-accent);border-radius:6px;`, document.body.appendChild(c);
		let l = (e) => {
			c.style.top = `${e.clientY - s}px`;
			let t = [...i.querySelectorAll(".grad-stop")].map((e) => e.getBoundingClientRect()), n = t.length;
			for (let r = 0; r < t.length; r++) if (e.clientY < t[r].top + t[r].height / 2) {
				n = r;
				break;
			}
			L(St, {
				...W(St),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = W(St);
			if (L(St, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && xt(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function wt(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Tt(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ft(e, t, "src", (await Ai(r)).dataUrl);
		} catch {
			b("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function Et(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		b("Komprimerer bildene…");
		let { images: i, failed: a, big: o } = await za(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Ba(i.length, a, o);
	}
	function F(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Dt(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Ot(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function kt(e, t) {
		V(e, () => {
			W(D).nav.style ??= {}, t(W(D).nav.style);
		});
	}
	let At = /* @__PURE__ */ P(() => ({
		mutate: st,
		keyPrefix: "bg",
		keyId: W(Qe)
	})), jt = {
		mutate: kt,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Mt = {
		mutate: Pr,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Nt = () => Object.entries(W(D)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function Pt(e) {
		return {
			type: e,
			version: Ka[e].version,
			props: Ka[e].defaults()
		};
	}
	let Ft = (e) => !!(e && Ka[e.type]?.entrance), It = [["", "Ingen"], ...Object.entries(Ka).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.label])], Lt = [["", "Ingen"], ...Object.entries(Ka).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.label])];
	function Rt(e) {
		e.animation && !Ft(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function zt(e) {
		Le(`edit:anim-${W(A).blockId}`, (t) => {
			Rt(t), t.animation = e ? Pt(e) : null;
		}), W(A) && E?.sendDemoAnim(W(A).sectionId, W(A).blockId);
	}
	function Bt(e) {
		Le(`edit:hover-${W(A).blockId}`, (t) => {
			Rt(t), t.hover = e ? Pt(e) : null;
		});
	}
	function Vt(e, t) {
		Number.isFinite(t) && (Le(`edit:anim-${W(A).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(A) && E?.sendDemoAnim(W(A).sectionId, W(A).blockId));
	}
	function Ht(e) {
		st("section-anim", (t) => {
			Rt(t), t.animation = e ? Pt(e) : null;
		}), E?.sendDemoAnim(W(Qe));
	}
	function Ut(e) {
		st("section-hover", (t) => {
			Rt(t), t.hover = e ? Pt(e) : null;
		});
	}
	function Wt(e, t) {
		Number.isFinite(t) && (st("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), E?.sendDemoAnim(W(Qe)));
	}
	function Gt(e) {
		let t = w.data.sections.find((e) => e.id === W(Qe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		pe("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(et, r, !0), w.save(), O(), E?.sendSection(W(h), t);
	}
	function Kt() {
		return w.data.sections.find((e) => e.id === W(Qe)) ?? w.data.sections[0];
	}
	function qt(e) {
		let t = w.data.sections.find((e) => e.id === W(Qe));
		t && (pe("grid:section"), t.grid = e ? { ...T.data.grid } : null, L($e, t.grid ? { ...t.grid } : null, !0), w.save(), O(), E?.sendSection(W(h), t), W(ke) === "Grid" && E?.sendShowGrid(!0));
	}
	function Jt(e, t) {
		let n = w.data.sections.find((e) => e.id === W(Qe));
		n?.grid && (pe("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, L($e, { ...n.grid }, !0), w.save(), O(), E?.sendSection(W(h), n), W(ke) === "Grid" && E?.sendShowGrid(!0));
	}
	function Yt(e, t) {
		pe("grid:site"), L(C, {
			...W(C),
			[e]: t
		}, !0), T.data.grid = {
			...T.data.grid,
			[e]: t
		}, T.save(), O(), oe(), W(ke) === "Grid" && E?.sendShowGrid(!0);
	}
	async function Xt() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(S, await e.json(), !0) : e.status !== 503 && L(S, null);
		} catch {
			L(S, null);
		}
	}
	let Zt = null;
	async function Qt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Zt = (await e.json()).head ?? null);
		} catch {}
	}
	async function $t(e) {
		if (!Zt) return await Qt(), {
			ok: await xe({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: Zt
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Zt}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Zt) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await xe({
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
	let en = /* @__PURE__ */ I(null), rn = /* @__PURE__ */ I(""), an = /* @__PURE__ */ I(!1);
	async function on() {
		L(rn, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(en, (await e.json()).commits, !0) : e.status === 401 ? (L(en, [], !0), L(rn, "Logg inn med GitHub for å se historikken.")) : (L(en, [], !0), L(rn, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(en, [], !0), L(rn, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let sn = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), cn = !1;
	async function ln() {
		let e = W(en)?.[0];
		if (!(!e || W(an)) && await xe({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			L(an, !0), b("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Zt = e : Qt(), cn = !0, b("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), un();
				} else t.status === 409 ? b("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : b((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				b("Kunne ikke nå publiseringslaget", "error");
			}
			L(an, !1), on();
		}
	}
	async function un() {
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
				b("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		b("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let dn = null;
	function fn(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: va("sec"),
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
	async function pn(e, { keepHistory: t = !1 } = {}) {
		L(h, e, !0), dn = (async () => {
			let n = ce(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = fa(await e.json(), T.data));
			} catch {}
			r ? se.delete(e) : r = fn(n), w = mi(`urd-draft-${e}`, () => r), w.replace(fa(w.data, T.data)), w.save(), t || (de = null), L(Qe, null), L($e, null), O(), re(), L(_, "");
		})(), await dn;
	}
	function mn() {
		E?.destroy(), W(x)?.contentDocument?.addEventListener("pointerdown", () => {
			W(Pe) && L(Pe, null);
		}, !0), E = ea(W(x), {
			onEdit: ia,
			onMove: sa,
			onGrow: ca,
			onDelete: wa,
			onAddSection: ga,
			onMoveSection: ya,
			onDeleteSection: xa,
			onSectionSize: Sa,
			onUndo: (e) => e.redo ? ge() : he(),
			onSelectSection: ot,
			onSelectBlock: Ne,
			onBlockMenu: Ie,
			onReady: hn,
			onNavigate: vn,
			onAddBlock: (e) => Oa(e.sectionId, e.block),
			onAddBlocks: (e) => ka(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Na,
			onMoveBlockSection: Ca,
			onMobileManual: la,
			onMobileAuto: ua,
			onReviewDone: pa,
			onBlockFlag: ma,
			onCollectionEdit: rr,
			onPluginBlocks: (e) => {
				L(ja, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => V("edit:nav-width", () => {
				W(D).nav.style ??= {}, W(D).nav.style.width = e.width;
			})
		});
	}
	async function hn() {
		await dn, await pr, E?.sendPlugins(Re(W(mr))?.enabled ?? []), E?.sendViewport(W(te)), tr(), T.hasDraft() && oe();
		let e = !W(p).pages.some((e) => e.id === W(h));
		(w.hasDraft() || e) && E?.sendPage(W(h), w.data), W(ee) || E?.sendChrome(!1), W(ke) === "Grid" && E?.sendShowGrid(!0), W(gn) && E?.sendShowGuides(!0), f();
	}
	let gn = /* @__PURE__ */ I(localStorage.getItem("urd-guides") === "1");
	function _n() {
		L(gn, !W(gn)), localStorage.setItem("urd-guides", W(gn) ? "1" : "0"), E?.sendShowGuides(W(gn));
	}
	function vn(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(D).pages.find((e) => e.path === t);
		n && n.id !== W(h) && pn(n.id);
	}
	function V(e, t) {
		pe(e), t(), T.save(), O(), oe();
	}
	let bn = /* @__PURE__ */ I(""), xn = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Sn(e, t = null) {
		return e ? xn.includes(e) ? `«${e}» er et reservert navn` : W(D).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Cn() {
		let e = W(bn).trim(), t = ji(e), n = Sn(t);
		if (n) {
			b(n, "error");
			return;
		}
		V("pages", () => {
			W(D).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(D).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(fn({
			id: t,
			title: e
		}))), O(), L(bn, ""), pn(t);
	}
	function wn(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		V("pages", () => {
			e.title = n;
			for (let t of W(D).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(h) ? (w.data.meta.title = n, w.save(), O(), E?.sendPage(W(h), w.data)) : Tn(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Tn(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = fa(await t.json(), T.data));
		} catch {}
		r ||= fn(e), t(r), localStorage.setItem(n, JSON.stringify(r)), O();
	}
	function En(e, t) {
		let n = ji(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Sn(n, e.id);
		if (r) {
			b(r, "error");
			return;
		}
		V("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Dn(e) {
		e.path !== "/" && (V("pages", () => {
			W(D).pages = W(D).pages.filter((t) => t.id !== e.id), W(D).nav.items = W(D).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of W(D).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			W(D).nav.items = W(D).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === W(h) && pn(W(D).pages[0].id), b("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function On(e) {
		V("edit:nav-logo", () => {
			W(D).nav.logo = {
				type: "text",
				value: "",
				...W(D).nav.logo,
				...e
			};
		});
	}
	function kn(e) {
		V("nav", () => {
			W(D).nav.logo ??= {
				type: "text",
				value: W(D).site.title
			};
			let t = W(D).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(D).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(D).site.title), delete t.image), t.type = e;
		});
	}
	async function An(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Ai(t);
			V("nav", () => {
				let t = W(D).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			b("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let jn = /* @__PURE__ */ I(null);
	function Mn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			L(jn, String(n.result), !0);
		}, n.onerror = () => b("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function Nn(e) {
		V("edit:site-icon", () => {
			W(D).site.icon = e;
		}), L(jn, null);
	}
	function Pn() {
		V("edit:site-icon", () => {
			delete W(D).site.icon;
		});
	}
	let Fn = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!W(D)?.site) return;
		let e = W(D).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Fn.test(e) && (t.href = e);
		}
	});
	function In(e) {
		V("nav", () => {
			W(D).nav.layout = e;
		});
	}
	function Ln(e, t) {
		V(`edit:nav-style-${e}`, () => {
			W(D).nav.style ??= {}, t === void 0 ? delete W(D).nav.style[e] : W(D).nav.style[e] = t;
		});
	}
	let Rn = /* @__PURE__ */ P(() => W(D)?.nav?.variant === "side-left" || W(D)?.nav?.variant === "side-right"), zn = /* @__PURE__ */ P(() => W(D)?.nav?.variant === "floating" || W(D)?.nav?.variant === "floating-square"), Bn = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, Vn = /* @__PURE__ */ P(() => Bn[W(D)?.nav?.style?.hover] ?? null);
	function Hn(e) {
		V("nav", () => {
			e === "bar" ? delete W(D).nav.variant : W(D).nav.variant = e;
		});
	}
	function Un(e) {
		V("nav", () => {
			W(D).nav.style ??= {}, e ? W(D).nav.style.glow = !0 : delete W(D).nav.style.glow;
		});
	}
	function Wn(e) {
		V("nav", () => {
			W(D).nav.style ??= {}, e ? delete W(D).nav.style.topGap : W(D).nav.style.topGap = !1;
		});
	}
	function U(e) {
		V("nav", () => {
			W(D).nav.style ??= {}, e === "standard" ? delete W(D).nav.style.hover : W(D).nav.style.hover = e;
		});
	}
	let Gn = null, Kn = {}, qn = /* @__PURE__ */ I(tn([])), Jn = /* @__PURE__ */ I(tn({})), Yn = /* @__PURE__ */ I(null), Xn = /* @__PURE__ */ I(""), Zn = /* @__PURE__ */ I("news"), Qn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function $n() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Gn = mi("urd-draft-samlinger", () => e), L(qn, [...Gn.data.samlinger ?? []], !0);
		for (let e of W(qn)) {
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
			}, Kn[e] = mi(`urd-draft-samling-${e}`, () => t);
		}
		er();
	}
	function er(e = !0) {
		let t = {};
		for (let e of W(qn)) Kn[e] && (t[e] = JSON.parse(JSON.stringify(Kn[e].data)));
		L(Jn, t, !0), e && tr();
	}
	function tr() {
		E?.sendCollections(Re(W(Jn)) ?? {});
	}
	function nr(e, t, n = !0) {
		let r = Kn[e];
		r && (t(r.data), r.save(), O(), er(n));
	}
	function rr(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || nr(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ir() {
		let e = W(Xn).trim();
		if (!e) return;
		let t = ji(e);
		if (!t || W(qn).includes(t)) {
			b(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: W(Zn),
			entries: []
		};
		Kn[t] = mi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), Kn[t].replace(n), Kn[t].save(), Gn.data.samlinger = [...W(qn), t], Gn.save(), L(qn, [...W(qn), t], !0), L(Yn, t, !0), L(Xn, ""), O(), er();
	}
	function ar(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete Kn[e], Gn.data.samlinger = W(qn).filter((t) => t !== e), Gn.save(), L(qn, W(qn).filter((t) => t !== e), !0), W(Yn) === e && L(Yn, null), O(), er();
	}
	function or(e) {
		nr(e, (e) => {
			e.entries.unshift({
				id: va("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function sr(e, t, n, r) {
		nr(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function cr(e, t, n) {
		nr(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function lr(e, t) {
		nr(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function ur(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && sr(e, t, "image", (await Ai(r)).dataUrl);
	}
	let dr = null, fr, pr = new Promise((e) => {
		fr = e;
	}), mr = /* @__PURE__ */ I(null), hr = tn({}), gr = /* @__PURE__ */ I("0.0.0"), _r = /* @__PURE__ */ I(""), yr = /* @__PURE__ */ I(""), xr = /* @__PURE__ */ I(tn([])), Sr = /* @__PURE__ */ I("pending"), Cr = () => [.../* @__PURE__ */ new Set([...W(mr)?.enabled ?? [], ...W(mr)?.disabled ?? []])];
	function wr() {
		L(mr, JSON.parse(JSON.stringify(dr.data)), !0);
	}
	async function Tr() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		dr = mi("urd-draft-plugins", () => e), wr();
		try {
			L(gr, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Cr()) K(e);
		Er(), fr(), E?.sendPlugins(Re(W(mr))?.enabled ?? []);
	}
	async function Er() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Dr();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), L(xr, (t ?? []).filter((e) => !Cr().includes(e)), !0);
			for (let e of W(xr)) K(e);
			L(Sr, "ok");
		} catch {
			Dr();
		}
	}
	function Dr() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				L(xr, e.filter((e) => !Cr().includes(e)), !0);
				for (let e of W(xr)) K(e);
				L(Sr, "ok");
				return;
			}
		} catch {}
		L(Sr, "unavailable");
	}
	async function K(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = _a(t);
			hr[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ha(W(gr), t.requiresEngine)
			};
		} catch {
			hr[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Or(e, t) {
		let n = dr.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), dr.save(), O(), wr(), Ar();
	}
	function Ar() {
		W(x) && (W(x).src = W(x).src);
	}
	function jr(e) {
		let t = dr.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), dr.save(), O(), wr(), Ar();
	}
	async function Mr() {
		L(yr, "");
		let e = W(_r).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			L(yr, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Cr().includes(e)) {
			L(yr, "Pluginen står allerede i listen");
			return;
		}
		if (await K(e), hr[e].errors.length) {
			L(yr, `Fant ingen gyldig plugin: ${hr[e].errors.join("; ")}`);
			return;
		}
		Or(e, !0), L(_r, "");
	}
	function Nr(e) {
		L(xr, W(xr).filter((t) => t !== e), !0), Or(e, !0);
	}
	function Pr(e, t) {
		V(e, () => {
			W(D).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(D).footer);
		});
	}
	function Ir(e, t) {
		Pr(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Lr(e) {
		Pr("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Rr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Ai(t);
			Pr("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			b("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Br() {
		Pr("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Vr(e) {
		Pr("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Hr(e) {
		Pr("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Ur = [
		{
			id: "minimal",
			label: "Minimal",
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: "Sentrert",
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: "Kolonner",
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: "Sitemap",
			thumb: {
				tag: !0,
				fat: !0,
				cols: 4,
				social: 4,
				baselineLinks: 3
			}
		},
		{
			id: "nyhetsbrev",
			label: "Nyhetsbrev",
			thumb: {
				tag: !0,
				cta: !0,
				cols: 2,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "storcta",
			label: "Stor CTA",
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: "Kontakt",
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: "Mega",
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function Wr(e) {
		let t = "Min forening", n = W(D).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
			label: e.title || e.id,
			page: e.id
		})), i = (e) => e.map((e) => ({
			icon: e,
			url: `https://${e}.com`
		})), a = (e, t) => ({
			label: e,
			href: t
		}), o = `© ${t}`;
		return e === "minimal" ? {
			align: "center",
			brand: { title: t },
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · Laget med Urd`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Et lite fellesskap for store spørsmål. Møtes annenhver torsdag."
			},
			columns: [
				{
					title: "Sider",
					links: r(4)
				},
				{
					title: "Selskap",
					links: [
						a("Om oss", "#"),
						a("Bli medlem", "#"),
						a("Presse", "#")
					]
				},
				{
					title: "Ressurser",
					links: [
						a("Vedtekter", "#"),
						a("Personvern", "#"),
						a("Kontakt", "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Vilkår", "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Alt på ett sted."
			},
			columns: [
				{
					title: "Utforsk",
					links: [
						a("Hjem", "#"),
						a("Arrangementer", "#"),
						a("Galleri", "#"),
						a("Blogg", "#")
					]
				},
				{
					title: "Selskap",
					links: [
						a("Om oss", "#"),
						a("Historie", "#"),
						a("Presse", "#"),
						a("Kontakt", "#")
					]
				},
				{
					title: "Støtte",
					links: [
						a("Bli medlem", "#"),
						a("FAQ", "#"),
						a("Hjelp", "#")
					]
				},
				{
					title: "Juridisk",
					links: [
						a("Personvern", "#"),
						a("Vilkår", "#"),
						a("Vedtekter", "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [
				a("Personvern", "#"),
				a("Vilkår", "#"),
				a("Cookies", "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Få siste nytt om arrangementer og medlemsfordeler."
			},
			cta: {
				kind: "newsletter",
				heading: "Meld deg på nyhetsbrevet",
				label: "Meld på",
				recipient: "post@dinforening.no",
				success: "Takk, du er påmeldt!"
			},
			columns: [{
				title: "Sider",
				links: r(4)
			}, {
				title: "Mer",
				links: [
					a("Om oss", "#"),
					a("Kontakt", "#"),
					a("Personvern", "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: "Klar til å bli med i fellesskapet?",
				sub: "Vi tar imot nye medlemmer hele året - kom innom en torsdag.",
				label: "Bli medlem",
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Vilkår", "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Kom innom eller ta kontakt - vi svarer gjerne."
			},
			columns: [
				{
					title: "Besøk oss",
					links: [
						a("Storgata 1, 0155 Oslo", "#"),
						a("post@dinforening.no", "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: "Åpningstider",
					links: [a("Man-fre 09-16", "#"), a("Lør 10-14", "#")]
				},
				{
					title: "Sider",
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: "Bli med i samtalen. Vi tar imot nye medlemmer hele året."
			},
			columns: [{
				title: "Utforsk",
				links: r(4)
			}, {
				title: "Følg oss",
				links: [a("Nyhetsbrev", "#"), a("post@dinforening.no", "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Laget med Urd", "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: Fa.version ?? 1,
					props: {
						...Fa.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: La.version ?? 1,
					props: {
						...La.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Gr(e) {
		Pr("footer-template", (t) => {
			let n = Wr(e);
			t.show = !0, delete t.text;
			for (let e of [
				"align",
				"brand",
				"columns",
				"social",
				"copyright",
				"baseline",
				"linkRow",
				"cta",
				"columnsAlign",
				"background"
			]) n[e] === void 0 ? delete t[e] : t[e] = n[e];
		});
	}
	function Kr(e) {
		Pr("footer", (t) => {
			t[e] ??= [], t[e].push(W(D).pages[0] ? {
				label: "Lenke",
				page: W(D).pages[0].id
			} : {
				label: "Lenke",
				href: "https://"
			});
		});
	}
	function qr(e, t) {
		Pr("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Jr(e, t, n) {
		Pr("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Yr(e, t, n) {
		Pr(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Zr(e, t, n) {
		Pr("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function $r(e, t, n) {
		Pr(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function ei(e) {
		Pr("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function ti(e) {
		Pr("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: "Bli medlem"
			} : delete t.cta;
		});
	}
	function ni(e, t) {
		Pr(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function ai(e) {
		Pr("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function oi(e, t) {
		Pr("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function si() {
		Pr("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: "Kolonne",
				links: [{
					label: "Lenke",
					page: W(D).pages[0].id
				}]
			});
		});
	}
	function li(e) {
		Pr("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function ui(e, t) {
		Pr("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function di(e, t) {
		Pr(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function pi(e) {
		Pr("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: "Lenke",
				page: W(D).pages[0].id
			});
		});
	}
	function hi(e, t) {
		Pr("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function gi(e, t, n) {
		Pr("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function _i(e, t, n) {
		Pr(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function vi(e, t, n) {
		Pr("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function yi(e, t, n) {
		Pr(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function bi() {
		Pr("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function xi(e) {
		Pr("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Si(e, t) {
		Pr("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Ci(e, t) {
		Pr("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function wi(e, t) {
		Pr(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Ti = Vi.filter(([e]) => e === "Sosiale medier" || e === "Kommunikasjon").flatMap(([, e]) => e.map((e) => [e, Bi[e].label]));
	function Di(e, t) {
		V(`edit:nav-label-${e}`, () => {
			W(D).nav.items[e].label = t;
		});
	}
	function Oi(e, t) {
		V("nav", () => {
			let n = W(D).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function ki(e, t) {
		V(`edit:nav-href-${e}`, () => {
			W(D).nav.items[e].href = t;
		});
	}
	function Ni(e, t) {
		let n = e + t, r = W(D).nav.items;
		n < 0 || n >= r.length || V("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Pi(e) {
		V("nav", () => {
			W(D).nav.items.splice(e, 1);
		});
	}
	function Fi() {
		V("nav", () => {
			W(D).nav.items.push({
				label: "Lenke",
				page: W(D).pages[0].id
			});
		});
	}
	function Ii(e) {
		V("nav", () => {
			let t = W(D).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: W(D).pages[0].id
			});
		});
	}
	function Li(e, t, n) {
		V(`edit:nav-child-label-${e}-${t}`, () => {
			W(D).nav.items[e].children[t].label = n;
		});
	}
	function Ri(e, t, n) {
		V("nav", () => {
			let r = W(D).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function zi(e, t, n) {
		V(`edit:nav-child-href-${e}-${t}`, () => {
			W(D).nav.items[e].children[t].href = n;
		});
	}
	function Ui(e, t, n) {
		let r = t + n, i = W(D).nav.items[e].children;
		r < 0 || r >= i.length || V("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Wi(e, t) {
		V("nav", () => {
			let n = W(D).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = W(D).pages[0].id));
		});
	}
	function Gi(e, t) {
		V(`edit:theme-color-${e}`, () => {
			W(D).theme.tokens.color[e] = t;
		});
	}
	function Ki(e, t) {
		V("theme", () => {
			W(D).theme.tokens.font[e] = t;
		});
	}
	function qi(e, t) {
		V("theme", () => {
			W(D).theme.tokens.radius[e] = t;
		});
	}
	function Ji(e) {
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
	function Yi() {
		return Object.fromEntries(Object.entries(W(D).theme.tokens.color).map(([e, t]) => [e, Ji(t)]));
	}
	function Xi() {
		V("theme", () => {
			W(D).theme.alt = { tokens: { color: Yi() } };
		});
	}
	function Zi() {
		V("theme", () => {
			W(D).theme.alt.tokens.color = Yi();
		});
	}
	function Qi() {
		V("theme", () => {
			delete W(D).theme.alt;
		});
	}
	function ta(e, t) {
		V(`edit:theme-alt-${e}`, () => {
			W(D).theme.alt.tokens.color[e] = t;
		});
	}
	function na(e) {
		V("theme", () => {
			e === "light" ? delete W(D).theme.scheme : W(D).theme.scheme = e;
		});
	}
	function ra() {
		L(ee, !W(ee)), E?.sendChrome(W(ee));
	}
	function ia(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (pe(`edit:${e.blockId}`), n.props = e.props, w.save(), O(), W(A)?.blockId === e.blockId && Me(), e.rerender && E?.sendSection(W(h), t), L(_, ""));
	}
	function sa(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		pe(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ie(t, "desktop-endret-etter-mobil"), w.save(), O(), W(A)?.blockId === e.blockId && Me();
	}
	function ca(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (w.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), w.hasDraft() && pe(`edit:${e.blockId}`), t.frames.desktop.h = e.h, w.save(), O(), W(A)?.blockId === e.blockId && Me());
	}
	function la(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			pe("mobile-manual");
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
	function ua(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			pe("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, w.save(), O(), re(), E?.sendSection(W(h), t);
		}
	}
	function pa(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (pe("review-done"), t.responsive.mobile.attention = null, w.save(), O(), re());
	}
	function ma(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (pe("decor"), t.decor = e.decor, w.save(), O(), W(A)?.blockId === e.blockId && Me());
	}
	function ga(e) {
		pe("add-section"), e.section.id || (e.section.id = va("sec")), w.data.sections.splice(e.index, 0, e.section), w.save(), O(), E?.sendPage(W(h), w.data), L(Qe, e.section.id, !0), at(e.section), W(ke) !== "Egenskaper" && (L(ke, "Egenskaper"), E?.sendShowGrid(!1));
	}
	function ya(e) {
		let t = w.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (pe("move-section"), [t[n], t[r]] = [t[r], t[n]], w.save(), O(), E?.sendPage(W(h), w.data));
	}
	function xa(e) {
		pe("delete-section"), e.sectionId === W(Qe) && (L(Qe, null), L($e, null)), W(A)?.sectionId === e.sectionId && L(A, null), w.data.sections = w.data.sections.filter((t) => t.id !== e.sectionId), w.save(), O(), E?.sendPage(W(h), w.data);
	}
	function Sa(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			pe("section-size"), t.size = {
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
			e.moves?.length && (ie(t, "seksjonshøyde"), W(A)?.sectionId === e.sectionId && Me()), e.sectionId === W(Qe) && L(et, e.minHeight, !0), w.save(), O();
		}
	}
	function Ca(e) {
		let t = w.data.sections.find((t) => t.id === e.fromSectionId), n = w.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (pe("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ie(t, "blokk-flyttet"), ie(n, "blokk-flyttet"), w.save(), O(), re(), E?.sendPage(W(h), w.data), W(A)?.blockId === e.blockId && (L(A, {
			...W(A),
			sectionId: e.toSectionId
		}, !0), Me()));
	}
	function wa(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		pe("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(W(A)?.blockId) && L(A, null), ie(t, "blokk-slettet"), w.save(), O(), E?.sendSection(W(h), t);
	}
	let Ta = {
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
	function Ea(e) {
		let t = Ta[e];
		return t ? {
			id: va("blk"),
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
	function Da(e) {
		E ? E.sendPlaceBlock(e) : Oa(Kt()?.id, e);
	}
	function Oa(e, t) {
		let n = w.data.sections.find((t) => t.id === e) ?? w.data.sections[0];
		if (!n) return;
		pe("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ie(n, "blokk-lagt-til"), w.save(), O(), E?.sendSection(W(h), n);
	}
	function ka(e, t, n, r) {
		let i = w.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		pe("add-blocks");
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
		}), ie(i, "blokk-lagt-til"), w.save(), O(), E?.sendSection(W(h), i);
	}
	function Aa(e) {
		Da(Ea(e));
	}
	let ja = /* @__PURE__ */ I(tn([]));
	function Ma(e, t = {}) {
		Da({
			id: va("blk"),
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
	function Na(e) {
		let t = Ea(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = w.data.sections.find((t) => t.id === e.sectionId)?.grid ?? W(D).grid, r = Ja({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Oa(e.sectionId, t), E?.sendSelect(t.id), e.kind === "image" && b("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && b("Galleri lagt til - legg til bilder i Egenskaper");
		}
	}
	async function Ia(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		b("Komprimerer bildet…");
		let n;
		try {
			n = await Ai(t);
		} catch {
			b("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(x)?.clientWidth ?? 1280));
		Da({
			id: va("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ji(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? b(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : b("");
	}
	async function za(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Ai(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ji(i.name).replaceAll("-", " "),
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
	function Ba(e, t, n) {
		t ? b(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? b(`${n} av bildene er store - vurder mindre utsnitt`, "error") : b(e ? "" : "Ingen bilder lagt til");
	}
	async function Va(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		b("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await za(t);
		n.length && Le("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Ba(n.length, r, i);
	}
	async function Wa(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		b("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await za(t);
		if (!n.length) {
			Ba(0, r, i);
			return;
		}
		let a = Ea("galleri");
		a.props.images = n, Da(a), Ba(n.length, r, i);
	}
	function Ga(e, t) {
		Le("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function vc(e) {
		Le("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function yc(e, t, n) {
		Le(`edit:${W(A).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function bc(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${ji(n || "bilde")}-${Mi(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function xc(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && bc(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) bc(e, "src", "bakgrunn", t);
	}
	function Sc(e) {
		let t = [];
		for (let n of e.sections) {
			xc(n.background, t);
			for (let e of n.blocks) if (e.type === "image" && bc(e.props, "src", e.props.alt, t), e.type === "icon" && bc(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) bc(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function Cc(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && bc(n, "value", "logo", t), n?.type === "both" && bc(n, "image", "logo", t), e.nav?.style && bc(e.nav.style, "image", "meny", t), xc(e.nav?.style?.background, t), xc(e.footer?.background, t), e.footer?.brand && bc(e.footer.brand, "logo", "footer-logo", t), bc(e.site, "icon", "ikon", t), t;
	}
	let wc = /* @__PURE__ */ I(!1);
	function Tc() {
		if (!W(wc)) {
			L(wc, !0);
			return;
		}
		L(wc, !1), Ec();
	}
	yn(() => {
		if (!W(wc)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || L(wc, !1);
		}, t = (e) => {
			e.key === "Escape" && L(wc, !1);
		}, n = () => L(wc, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Ec() {
		pe("discard");
		for (let e of W(D).pages) e.id !== W(h) && !se.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = w.reset();
		if (T.reset(), dr && (dr.reset(), wr()), Gn) {
			Gn.reset(), L(qn, [...Gn.data.samlinger ?? []], !0);
			for (let e of Object.keys(Kn)) W(qn).includes(e) ? Kn[e].reset() : delete Kn[e];
			er();
		}
		ae(), L(C, {
			snap: !0,
			...W(D).grid
		}, !0), O(), L(_, ""), oe(), W(D).pages.some((e) => e.id === W(h)) ? E?.sendPage(W(h), e) : pn(W(D).pages[0].id);
	}
	async function Dc() {
		if (cn) {
			b("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		b("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(D).pages) {
			let a = `urd-draft-${i.id}`, o = se.has(i.id) || !W(p).pages.some((e) => e.id === i.id), s = null;
			if (i.id === W(h) && (w.hasDraft() || o)) s = w.data;
			else if (i.id !== W(h)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = fa(JSON.parse(e), T.data);
				} catch {}
			}
			if (!s && o && (s = fn(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Sc(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (T.hasDraft()) {
			let r = JSON.parse(JSON.stringify(W(D)));
			e.push(...Cc(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(W(p).theme, W(D).theme) || t.push("tema"), i(W(p).nav, W(D).nav) || t.push("menyen"), i(W(p).footer, W(D).footer) || t.push("footeren"), i(W(p).pages, W(D).pages) || t.push("sideregisteret"), i(W(p).grid, W(D).grid) || t.push("gridet"), (W(p).site.icon ?? null) !== (W(D).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = W(p).site, { icon: s, ...c } = W(D).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Kn).filter(([, e]) => e.hasDraft());
		if (i.length || Gn?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) bc(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Gn?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Gn.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!W(qn).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		dr?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(dr.data, null, 2) + "\n",
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
		for (let e of W(p).pages) {
			let t = W(D).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await $t(e);
		if (!s.ok) {
			b("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
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
			e ? Zt = e : Qt(), Sc(w.data), Cc(W(D));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) se.add(e);
			if (L(p, JSON.parse(JSON.stringify(W(D))), !0), T = mi("urd-draft-site", () => W(p)), ae(), dr) {
				let e = JSON.parse(JSON.stringify(dr.data));
				dr = mi("urd-draft-plugins", () => e), wr();
			}
			if (Gn) {
				for (let e of Object.values(Kn)) for (let t of e.data.entries) bc(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Gn.data));
				Gn = mi("urd-draft-samlinger", () => e);
				for (let e of W(qn)) {
					if (!Kn[e]) continue;
					let t = JSON.parse(JSON.stringify(Kn[e].data));
					Kn[e] = mi(`urd-draft-samling-${e}`, () => t);
				}
				er();
			}
			L(C, {
				snap: !0,
				...W(D).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(w.data));
			w = mi(`urd-draft-${W(h)}`, () => t), se.has(W(h)) && localStorage.setItem(`urd-draft-${W(h)}`, JSON.stringify(t)), O(), b("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (l?.status === 401) {
			let e = (await l.json().catch(() => null))?.error;
			b(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await Xt();
		} else l?.status === 403 ? b((await l.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : l?.status === 409 ? b("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : b(l ? (await l.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	ye();
	var Oc = _c();
	br("keydown", nn, ve), br("pointerdown", nn, _e);
	var kc = z(Oc), Ac = R(kc), jc = (e) => {
		var t = zo();
		X(R(t), () => c.pencil), M(), j(t), G("click", t, ra), q(e, t);
	};
	Y(Ac, (e) => {
		W(ee) || e(jc);
	});
	var Mc = B(Ac, 2);
	let Nc;
	var Pc = R(Mc), Fc = B(R(Pc), 2);
	$(Fc, {
		get value() {
			return W(u);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return l;
		},
		onchange: (e) => L(u, e, !0)
	});
	var Ic = B(Fc, 2), Lc = (e) => {
		var t = Bo(), n = z(t), r = R(n, !0);
		j(n);
		var i = B(n, 2), a = R(i);
		let o;
		X(a, () => c.desktop, !0), j(a);
		var s = B(a, 2);
		let l;
		X(s, () => c.phone, !0), j(s), j(i);
		var u = B(i, 2);
		let d;
		X(u, () => c.guides, !0), j(u), H((e) => {
			J(r, e), o = Xr(a, 1, "ghost svelte-1n46o8q", null, o, { active: W(te) === "desktop" }), l = Xr(s, 1, "ghost svelte-1n46o8q", null, l, { active: W(te) === "mobile" }), d = Xr(u, 1, "ghost svelte-1n46o8q", null, d, { active: W(gn) });
		}, [() => ce()?.title ?? ""]), G("click", n, () => Ae("Sider")), G("click", a, () => L(te, "desktop")), G("click", s, () => L(te, "mobile")), G("click", u, _n), q(e, t);
	};
	Y(Ic, (e) => {
		W(p) && e(Lc);
	});
	var Rc = B(Ic, 2), zc = (e) => {
		var t = Vo(), n = R(t);
		X(n, () => c.phone);
		var r = B(n);
		j(t), H(() => J(r, ` ${W(ne) ?? ""} ${W(ne) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(te, "mobile")), q(e, t);
	};
	Y(Rc, (e) => {
		W(ne) > 0 && e(zc);
	});
	var Bc = B(Rc, 2), Vc = (e) => {
		var t = Ho(), n = B(z(t), 2);
		let r;
		var i = R(n, !0);
		j(n), H(() => {
			r = Xr(n, 1, "ghost discard-btn svelte-1n46o8q", null, r, { armed: W(wc) }), ii(n, "title", W(wc) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), J(i, W(wc) ? "Sikker?" : "Forkast utkast");
		}), G("click", n, Tc), q(e, t);
	};
	Y(Bc, (e) => {
		W(g) && e(Vc);
	}), j(Pc);
	var Hc = B(Pc, 2), Uc = R(Hc), Wc = (e) => {
		var t = qo(), n = z(t), r = R(n), i = (e) => {
			var t = Uo();
			X(z(t), () => c.eye), M(), q(e, t);
		}, a = (e) => {
			var t = Wo();
			X(z(t), () => c.pencil), M(), q(e, t);
		};
		Y(r, (e) => {
			W(ee) ? e(i) : e(a, -1);
		}), j(n);
		var o = B(n, 2), s = (e) => {
			var t = Go(), n = R(t), r = (e) => {
				var t = kr();
				X(z(t), () => c.warn), q(e, t);
			};
			Y(n, (e) => {
				W(S).allowed || e(r);
			});
			var i = B(n, 1, !0);
			j(t), H(() => {
				ii(t, "title", W(S).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(i, W(S).login);
			}), q(e, t);
		}, l = (e) => {
			q(e, Ko());
		};
		Y(o, (e) => {
			W(S)?.loggedIn ? e(s) : W(S) && e(l, 1);
		});
		var u = B(o, 2), d = B(u, 2);
		H((e) => {
			ii(n, "title", W(ee) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ii(u, "href", e), d.disabled = !W(g);
		}, [() => ce()?.path ?? "/"]), G("click", n, ra), G("click", d, Dc), q(e, t);
	};
	Y(Uc, (e) => {
		W(p) && e(Wc);
	}), j(Hc), j(Mc);
	var Gc = B(Mc, 2), Kc = (e) => {
		var t = uc(), i = R(t), o = (e) => {
			var t = lc(), i = z(t);
			zr(i, 21, () => k, Fr, (e, t, n) => {
				var r = Xo(), i = z(r), a = (e) => {
					q(e, Jo());
				};
				Y(i, (e) => {
					n > 0 && e(a);
				}), zr(B(i, 2), 16, () => W(t), (e) => e, (e, t) => {
					var n = Yo();
					let r;
					var i = R(n, !0);
					j(n), H(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: W(ke) === t }), J(i, t);
					}), G("click", n, () => Ae(t)), q(e, n);
				}), q(e, r);
			}), j(i);
			var o = B(i, 2), s = (e) => {
				var t = cc(), i = R(t), o = R(i, !0);
				j(i);
				var s = B(i, 2), l = (e) => {
					var t = ts(), n = B(R(t), 2);
					zr(n, 17, () => W(D).pages, (e) => e.id, (e, t) => {
						var n = es();
						let r;
						var i = R(n);
						Z(i);
						var a = B(i, 2), o = (e) => {
							q(e, Zo());
						}, s = (e) => {
							var n = Qo();
							Z(n), H((e) => Q(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => En(W(t), e.target.value)), q(e, n);
						};
						Y(a, (e) => {
							W(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = B(a, 2), u = R(l);
						X(u, () => c.right, !0), j(u);
						var d = B(u, 2), f = (e) => {
							var n = $o();
							X(n, () => c.cross, !0), j(n), G("click", n, () => Dn(W(t))), q(e, n);
						};
						Y(d, (e) => {
							W(t).path !== "/" && e(f);
						}), j(l), j(n), H(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(h) }), Q(i, W(t).title), u.disabled = W(t).id === W(h);
						}), G("change", i, (e) => wn(W(t), e.target.value)), G("click", u, () => pn(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					Z(r);
					var i = B(r, 2);
					M(2), j(t), H((e) => i.disabled = e, [() => !W(bn).trim()]), G("keydown", r, (e) => e.key === "Enter" && Cn()), ci(r, () => W(bn), (e) => L(bn, e)), G("click", i, Cn), q(e, t);
				}, u = (e) => {
					var t = ps(), r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(R(a));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.logo?.type ?? "text");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => kn(e)
						});
					}
					j(a);
					var s = B(a, 2), l = (e) => {
						var t = ns(), n = z(t);
						Z(n);
						var r = B(n, 2), i = R(r);
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.logo?.font ?? ""), t = /* @__PURE__ */ P(() => [["", "Arv"], ...qa.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => On({ font: e || void 0 })
							});
						}
						var a = B(i, 2);
						Z(a);
						var o = B(a, 2);
						let s;
						var c = B(o, 2);
						let l;
						j(r), H((e) => {
							Q(n, W(D).nav.logo?.value ?? ""), Q(a, W(D).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: W(D).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!W(D).nav.logo?.italic })]), G("input", n, (e) => On({ value: e.target.value })), G("change", a, (e) => On({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", o, () => On({ bold: W(D).nav.logo?.bold === !1 })), G("click", c, () => On({ italic: !W(D).nav.logo?.italic })), q(e, t);
					};
					Y(s, (e) => {
						(W(D).nav.logo?.type ?? "text") !== "image" && e(l);
					});
					var u = B(s, 2), d = (e) => {
						var t = rs(), n = z(t), r = R(n), i = R(r), a = B(i);
						j(r);
						var o = B(r, 2);
						Z(o);
						var s = B(o, 2);
						Z(s), j(n), M(2), H(() => {
							J(i, `${(W(D).nav.logo?.type === "image" ? W(D).nav.logo?.value : W(D).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, W(D).nav.logo?.size ?? 32), Q(s, W(D).nav.logo?.radius ?? 0);
						}), G("change", a, An), G("change", o, (e) => On({ size: Number(e.target.value) })), G("change", s, (e) => On({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(u, (e) => {
						(W(D).nav.logo?.type ?? "text") !== "text" && e(d);
					});
					var f = B(u, 2), p = (e) => {
						var t = is(), n = B(R(t));
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return W(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => On({ order: e })
							});
						}
						j(t), q(e, t);
					};
					Y(f, (e) => {
						W(D).nav.logo?.type === "both" && e(p);
					}), M(2), j(i), j(r);
					var m = B(r, 2), h = B(R(m), 2), g = R(h), _ = B(R(g));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.variant ?? "bar");
						$(_, {
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
							onchange: (e) => Hn(e)
						});
					}
					j(g);
					var v = B(g, 2), y = (e) => {
						var t = as(), n = z(t), r = R(n);
						Z(r), M(), j(n);
						var i = B(n, 2), a = R(i);
						Z(a), M(), j(i), H(() => {
							ri(r, W(D).nav.style?.glow === !0), ri(a, W(D).nav.style?.topGap !== !1);
						}), G("change", r, (e) => Un(e.target.checked)), G("change", a, (e) => Wn(e.target.checked)), q(e, t);
					};
					Y(v, (e) => {
						W(zn) && e(y);
					});
					var b = B(v, 2), x = (e) => {
						var t = os(), n = B(R(t));
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
								onchange: (e) => Ln("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), q(e, t);
					};
					Y(b, (e) => {
						W(Rn) && e(x);
					});
					var S = B(b, 2), C = R(S);
					Z(C), M(), j(S);
					var ee = B(S, 2), te = B(R(ee));
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
							onchange: (e) => Ln("size", e === "md" ? void 0 : e)
						});
					}
					j(ee);
					var ne = B(ee, 2), re = B(R(ne)), ie = (e) => {
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
								onchange: (e) => Ln("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, w = (e) => {
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
								onchange: (e) => In(e)
							});
						}
					};
					Y(re, (e) => {
						W(Rn) ? e(ie) : e(w, -1);
					}), j(ne);
					var T = B(ne, 2), E = (e) => {
						var t = ss(), n = R(t);
						Z(n), M(), j(t), H(() => ri(n, W(D).nav.sticky !== !1)), G("change", n, (e) => V("nav", () => {
							W(D).nav.sticky = e.target.checked;
						})), q(e, t);
					};
					Y(T, (e) => {
						W(Rn) || e(E);
					});
					var ae = B(T, 2), oe = B(R(ae));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.hover ?? "standard");
						$(oe, {
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
							onchange: (e) => U(e)
						});
					}
					j(ae);
					var se = B(ae, 2), ce = (e) => {
						var t = cs(), n = z(t), r = B(R(n)), i = R(r);
						j(r), j(n);
						var a = B(n, 2);
						Z(a), H((e) => {
							J(i, `${e ?? ""}%`), Q(a, W(D).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((W(D).nav.style?.hoverGlow ?? .6) * 100)]), G("input", a, (e) => Ln("hoverGlow", Number(e.target.value))), q(e, t);
					};
					Y(se, (e) => {
						W(D).nav.style?.hover === "lift" && e(ce);
					});
					var O = B(se, 2), le = (e) => {
						var t = ls(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ P(Nt);
							Ei(r, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								get label() {
									return W(Vn)[1];
								},
								onchange: (e) => Ln("hoverColor", e)
							});
						}
						j(t), H(() => {
							ii(t, "title", W(Vn)[1]), J(n, `${W(Vn)[0] ?? ""} `);
						}), q(e, t);
					};
					Y(O, (e) => {
						W(Vn) && e(le);
					});
					var ue = B(O, 2), de = B(R(ue));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ P(Nt);
						Ei(de, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => Ln("hoverTextColor", e)
						});
					}
					j(ue);
					var fe = B(ue, 2), pe = B(R(fe));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(Nt);
						Ei(pe, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Ln("textColor", e)
						});
					}
					j(fe);
					var me = B(fe, 6);
					n(me, () => jt, () => W(D).nav?.style?.background?.layers ?? []), j(h), j(m);
					var he = B(m, 2), ge = B(R(he), 2), _e = R(ge), ve = B(R(_e));
					{
						let e = /* @__PURE__ */ P(() => W(D).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ P(() => W(Rn) ? [
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
						$(ve, {
							get value() {
								return W(e);
							},
							get options() {
								return W(t);
							},
							onchange: (e) => Ln("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(_e);
					var ye = B(_e, 2), be = (e) => {
						var t = us(), n = B(R(t));
						{
							let e = /* @__PURE__ */ P(() => W(D).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ P(Nt);
							Ei(n, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => Ln("subPillColor", e)
							});
						}
						j(t), q(e, t);
					};
					Y(ye, (e) => {
						W(D).nav.style?.subStyle === "pills" && e(be);
					});
					var xe = B(ye, 2), Se = B(R(xe));
					Z(Se), j(xe), j(ge), j(he);
					var Ce = B(he, 2), we = B(R(Ce), 2), Te = R(we);
					zr(Te, 17, () => W(D).nav.items, Fr, (e, t, n) => {
						var r = fs(), i = z(r), a = R(i);
						Z(a);
						var o = B(a, 2), s = R(o);
						X(s, () => c.plus, !0), j(s);
						var l = B(s, 2);
						l.disabled = n === 0, X(l, () => c.up, !0), j(l);
						var u = B(l, 2);
						X(u, () => c.down, !0), j(u);
						var d = B(u, 2);
						X(d, () => c.cross, !0), j(d), j(o);
						var f = B(o, 2), p = R(f);
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
								onchange: (e) => Oi(n, e)
							});
						}
						j(f);
						var m = B(f, 2), h = (e) => {
							var r = lo();
							Z(r), H(() => Q(r, W(t).href)), G("change", r, (e) => ki(n, e.target.value)), q(e, r);
						};
						Y(m, (e) => {
							!W(t).page && W(t).href != null && e(h);
						}), j(i), zr(B(i, 2), 17, () => W(t).children ?? [], Fr, (e, r, i) => {
							var a = ds(), o = R(a);
							Z(o);
							var s = B(o, 2), l = R(s);
							l.disabled = i === 0, X(l, () => c.up, !0), j(l);
							var u = B(l, 2);
							X(u, () => c.down, !0), j(u);
							var d = B(u, 2);
							X(d, () => c.cross, !0), j(d), j(s);
							var f = B(s, 2), p = R(f);
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
									onchange: (e) => Ri(n, i, e)
								});
							}
							j(f);
							var m = B(f, 2), h = (e) => {
								var t = lo();
								Z(t), H(() => Q(t, W(r).href ?? "")), G("change", t, (e) => zi(n, i, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), j(a), H(() => {
								Q(o, W(r).label), u.disabled = i === W(t).children.length - 1;
							}), G("input", o, (e) => Li(n, i, e.target.value)), G("click", l, () => Ui(n, i, -1)), G("click", u, () => Ui(n, i, 1)), G("click", d, () => Wi(n, i)), q(e, a);
						}), H(() => {
							Q(a, W(t).label), u.disabled = n === W(D).nav.items.length - 1;
						}), G("input", a, (e) => Di(n, e.target.value)), G("click", s, () => Ii(n)), G("click", l, () => Ni(n, -1)), G("click", u, () => Ni(n, 1)), G("click", d, () => Pi(n)), q(e, r);
					});
					var Ee = B(Te, 2);
					M(2), j(we), j(Ce), j(t), H(() => {
						ri(C, W(D).nav.style?.blur !== !1), Q(Se, W(D).nav.style?.subColumns ?? 1);
					}), G("change", C, (e) => Ln("blur", e.target.checked)), G("change", Se, (e) => Ln("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), G("click", Ee, Fi), q(e, t);
				}, d = (e) => {
					var t = vs(), n = B(R(t), 2);
					Ei(B(R(n)), {
						get value() {
							return W(D).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Gi("bg", e)
					}), j(n);
					var r = B(n, 2);
					Ei(B(R(r)), {
						get value() {
							return W(D).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Gi("surface", e)
					}), j(r);
					var i = B(r, 2);
					Ei(B(R(i)), {
						get value() {
							return W(D).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Gi("text", e)
					}), j(i);
					var a = B(i, 2);
					Ei(B(R(a)), {
						get value() {
							return W(D).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Gi("accent", e)
					}), j(a);
					var o = B(a, 2), s = B(R(o));
					{
						let e = /* @__PURE__ */ P(() => W(D).theme.tokens.color["accent-text"] ?? W(D).theme.tokens.color.bg);
						Ei(s, {
							get value() {
								return W(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => Gi("accent-text", e)
						});
					}
					j(o);
					var l = B(o, 2), u = B(R(l), 2), d = R(u), f = (e) => {
						var t = ms(), n = z(t), r = B(R(n));
						{
							let e = /* @__PURE__ */ P(() => W(D).theme.scheme ?? "light");
							$(r, {
								get value() {
									return W(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => na(e)
							});
						}
						j(n);
						var i = B(n, 4);
						zr(i, 17, () => Object.entries(W(D).theme.alt.tokens.color), Fr, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(W(t), 1));
							let r = () => W(n)[0];
							var i = ls(), a = R(i), o = B(a);
							{
								let e = /* @__PURE__ */ P(() => `Alternativ ${r()}`);
								Ei(o, {
									get value() {
										return W(D).theme.alt.tokens.color[r()];
									},
									get label() {
										return W(e);
									},
									onchange: (e) => ta(r(), e)
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
						var a = B(i, 2), o = R(a), s = B(o, 2);
						X(s, () => c.cross, !0), j(s), j(a), G("click", o, Zi), G("click", s, Qi), q(e, t);
					}, p = (e) => {
						var t = hs(), n = z(t);
						M(2), G("click", n, Xi), q(e, t);
					};
					Y(d, (e) => {
						W(D).theme.alt ? e(f) : e(p, -1);
					}), j(u), j(l);
					var h = B(l, 4), g = B(R(h));
					{
						let e = /* @__PURE__ */ P(() => [...qa.some(([, e]) => e === W(D).theme.tokens.font.heading) ? [] : [[W(D).theme.tokens.font.heading, "Egendefinert"]], ...qa.map(([e, t]) => [t, e])]);
						$(g, {
							get value() {
								return W(D).theme.tokens.font.heading;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => Ki("heading", e)
						});
					}
					j(h);
					var _ = B(h, 2), v = B(R(_));
					{
						let e = /* @__PURE__ */ P(() => [...qa.some(([, e]) => e === W(D).theme.tokens.font.body) ? [] : [[W(D).theme.tokens.font.body, "Egendefinert"]], ...qa.map(([e, t]) => [t, e])]);
						$(v, {
							get value() {
								return W(D).theme.tokens.font.body;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => Ki("body", e)
						});
					}
					j(_);
					var y = B(_, 4), b = B(R(y));
					Z(b), j(y);
					var x = B(y, 2), S = B(R(x));
					Z(S), j(x);
					var C = B(x, 4), ee = B(R(C)), te = (e) => {
						var t = gs();
						H(() => ii(t, "src", W(D).site.icon)), q(e, t);
					};
					Y(ee, (e) => {
						W(D).site.icon && e(te);
					}), j(C);
					var ne = B(C, 2), re = R(ne), ie = R(re), w = B(ie);
					j(re);
					var T = B(re, 2), E = (e) => {
						var t = _s(), n = z(t);
						X(n, () => c.pencil ?? "✎", !0), j(n);
						var r = B(n, 2);
						X(r, () => c.cross, !0), j(r), G("click", n, () => L(jn, W(D).site.icon, !0)), G("click", r, Pn), q(e, t);
					};
					Y(T, (e) => {
						W(D).site.icon && e(E);
					}), j(ne), M(2), j(t), H(() => {
						Q(b, W(D).theme.tokens.radius.sm), Q(S, W(D).theme.tokens.radius.md), J(ie, `${W(D).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), G("change", b, (e) => qi("sm", e.target.value)), G("change", S, (e) => qi("md", e.target.value)), G("change", w, Mn), q(e, t);
				}, f = (e) => {
					var t = Ss();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					j(i), j(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					j(c);
					var u = B(c, 2), d = B(u, 2), f = B(d, 2), p = B(f, 2), m = B(p, 2), h = B(R(m), 2), g = R(h), _ = B(g, 2), v = B(R(_));
					j(_), j(h), j(m);
					var y = B(m, 2), b = B(R(y), 2), x = R(b), S = B(x, 2), C = B(S, 2), ee = B(C, 2), ne = B(ee, 2);
					j(b), j(y);
					var re = B(y, 2), ie = (e) => {
						var t = xs(), n = B(R(t), 2);
						zr(n, 21, () => W(ja), (e) => e.type, (e, t) => {
							var n = kr(), r = z(n), i = (e) => {
								var n = bs(), r = R(n), i = R(r, !0);
								j(r);
								var a = B(r, 2);
								zr(a, 21, () => W(t).variants, (e) => e.label, (e, n) => {
									var r = ys(), i = R(r, !0);
									j(r), H(() => {
										ii(r, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(i, W(n).label);
									}), G("click", r, () => Ma(W(t), W(n).props)), q(e, r);
								}), j(a), j(n), H(() => J(i, W(t).label)), q(e, n);
							}, a = (e) => {
								var n = ys(), r = R(n, !0);
								j(n), H(() => {
									ii(n, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(r, W(t).label);
								}), G("click", n, () => Ma(W(t))), q(e, n);
							};
							Y(r, (e) => {
								W(t).variants?.length ? e(i) : e(a, -1);
							}), q(e, n);
						}), j(n), j(t), q(e, t);
					};
					Y(re, (e) => {
						W(ja).length && e(ie);
					}), j(t), H(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(te) === "mobile" }), ii(t, "title", W(te) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => Aa("text")), G("click", o, () => Aa("text-box")), G("click", s, () => Aa("button")), G("change", l, Ia), G("click", u, () => Aa("video")), G("click", d, () => Aa("icon")), G("click", f, () => Aa("samling")), G("click", p, () => Aa("faq")), G("click", g, () => Aa("galleri")), G("change", v, Wa), G("click", x, () => Aa("shape-line")), G("click", S, () => Aa("shape-arrow")), G("click", C, () => Aa("shape-circle")), G("click", ee, () => Aa("shape-rect")), G("click", ne, () => Aa("shape-triangle")), q(e, t);
				}, p = (e) => {
					var t = Cs(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					j(r), j(n);
					var a = B(n, 2);
					Z(a);
					var o = B(a, 2), s = R(o);
					Z(s), M(), j(o), M(2), j(t), H(() => {
						J(i, `${W(C).size ?? ""} px`), Q(a, W(C).size), ri(s, W(C).snap !== !1);
					}), G("input", a, (e) => Yt("size", Number(e.target.value))), G("change", s, (e) => Yt("snap", e.target.checked)), q(e, t);
				}, g = (e) => {
					var t = Os(), r = R(t), i = (e) => {
						var t = ws(), n = z(t), r = R(n);
						j(n);
						var i = B(n, 2);
						a(i), H(() => J(r, `${Ye[W(A).type] ?? W(A).type ?? ""}-blokk`)), q(e, t);
					}, o = (e) => {
						var t = Es(), r = B(z(t), 2), i = B(R(r));
						Z(i), j(r);
						var a = B(r, 6), o = R(a);
						Z(o), M(), j(a);
						var s = B(a, 2), c = (e) => {
							var t = Ts(), n = z(t), r = B(R(n)), i = R(r);
							j(r), j(n);
							var a = B(n, 2);
							Z(a), H(() => {
								J(i, `${W($e).size ?? ""} px`), Q(a, W($e).size);
							}), G("input", a, (e) => Jt("size", Number(e.target.value))), q(e, t);
						};
						Y(s, (e) => {
							W($e) && e(c);
						});
						var l = B(s, 6);
						n(l, () => W(At), () => W(tt));
						var u = B(l, 4), d = B(R(u));
						{
							let e = /* @__PURE__ */ P(() => Ft(W(nt)) ? W(nt).type : "");
							$(d, {
								get value() {
									return W(e);
								},
								get options() {
									return It;
								},
								onchange: (e) => Ht(e || null)
							});
						}
						j(u);
						var f = B(u, 2), p = (e) => {
							var t = Po(), n = z(t), r = B(R(n));
							Z(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Z(a), j(i), H(() => {
								Q(r, W(nt).props.duration), Q(a, W(nt).props.delay);
							}), G("change", r, (e) => Wt("duration", Number(e.target.value))), G("change", a, (e) => Wt("delay", Number(e.target.value))), q(e, t);
						}, m = /* @__PURE__ */ P(() => Ft(W(nt)));
						Y(f, (e) => {
							W(m) && e(p);
						});
						var h = B(f, 2), g = B(R(h));
						{
							let e = /* @__PURE__ */ P(() => W(rt)?.type ?? (W(nt) && !Ft(W(nt)) ? W(nt).type : ""));
							$(g, {
								get value() {
									return W(e);
								},
								get options() {
									return Lt;
								},
								onchange: (e) => Ut(e || null)
							});
						}
						j(h), H(() => {
							Q(i, W(et)), ri(o, W($e) !== null);
						}), G("change", i, (e) => Gt(e.target.value)), G("change", o, (e) => qt(e.target.checked)), q(e, t);
					}, s = (e) => {
						q(e, Ds());
					};
					Y(r, (e) => {
						W(A) ? e(i) : W(Qe) ? e(o, 1) : e(s, -1);
					}), j(t), q(e, t);
				}, _ = (e) => {
					var t = Vs(), i = R(t), a = R(i);
					Z(a), M(), j(i);
					var o = B(i, 2), s = (e) => {
						var t = As(), n = B(R(t), 2);
						zr(n, 21, () => W(D).pages ?? [], (e) => e.id, (e, t) => {
							var n = ks(), r = R(n);
							Z(r);
							var i = B(r);
							j(n), H((e) => {
								ri(r, e), J(i, ` ${(W(t).title || W(t).id) ?? ""}`);
							}, [() => !(W(D).footer?.hideOn ?? []).includes(W(t).id)]), G("change", r, (e) => oi(W(t).id, e.target.checked)), q(e, n);
						}), j(n), j(t), q(e, t);
					};
					Y(o, (e) => {
						W(D).footer?.show && e(s);
					});
					var l = B(o, 2), u = B(R(l), 2), d = R(u);
					zr(d, 21, () => Ur, (e) => e.id, (e, t) => {
						var n = js(), r = R(n);
						X(r, () => Ua(W(t).thumb), !0), j(r);
						var i = B(r, 2), a = R(i, !0);
						j(i), j(n), H(() => {
							ii(n, "title", `Fyller footeren med ${W(t).label ?? ""}-oppsettet - rediger fritt videre`), J(a, W(t).label);
						}), G("click", n, () => Gr(W(t).id)), q(e, n);
					}), j(d), j(u), j(l);
					var f = B(l, 2), p = B(R(f), 2), m = R(p), h = B(R(m));
					Z(h), j(m);
					var g = B(m, 2), _ = B(R(g));
					Z(_), j(g);
					var v = B(g, 2), y = B(R(v));
					{
						let e = /* @__PURE__ */ P(() => W(D).footer?.brand?.mode ?? "text");
						$(y, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Logo (bilde)"],
								["both", "Begge"]
							],
							onchange: (e) => Lr(e)
						});
					}
					j(v);
					var b = B(v, 2), x = (e) => {
						var t = Ps(), n = z(t), r = R(n), i = R(r), a = B(i);
						j(r);
						var o = B(r, 2), s = (e) => {
							var t = Ms();
							X(t, () => c.cross, !0), j(t), G("click", t, Br), q(e, t);
						};
						Y(o, (e) => {
							W(D).footer?.brand?.logo && e(s);
						}), j(n);
						var l = B(n, 2), u = (e) => {
							var t = Ns(), n = z(t), r = B(R(n)), i = R(r);
							j(r), j(n);
							var a = B(n, 2);
							Z(a), H(() => {
								J(i, `${W(D).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Q(a, W(D).footer?.brand?.logoHeight ?? 40);
							}), G("input", a, (e) => Vr(e.target.value)), q(e, t);
						};
						Y(l, (e) => {
							W(D).footer?.brand?.logo && e(u);
						}), H(() => J(i, `${W(D).footer?.brand?.logo ? "Bytt logo" : "Last opp logo"} `)), G("change", a, Rr), q(e, t);
					};
					Y(b, (e) => {
						(W(D).footer?.brand?.mode ?? "text") !== "text" && e(x);
					}), j(p), j(f);
					var S = B(f, 2), C = B(R(S), 2), ee = R(C);
					zr(ee, 17, () => W(D).footer?.columns ?? [], Fr, (e, t, n) => {
						var r = Fs(), i = z(r), a = R(i);
						Z(a);
						var o = B(a, 2), s = R(o);
						X(s, () => c.plus, !0), j(s);
						var l = B(s, 2);
						l.disabled = n === 0, X(l, () => c.up, !0), j(l);
						var u = B(l, 2);
						X(u, () => c.down, !0), j(u);
						var d = B(u, 2);
						X(d, () => c.cross, !0), j(d), j(o), j(i), zr(B(i, 2), 17, () => W(t).links ?? [], Fr, (e, r, i) => {
							var a = uo(), o = R(a);
							Z(o);
							var s = B(o, 2), l = R(s);
							l.disabled = i === 0, X(l, () => c.up, !0), j(l);
							var u = B(l, 2);
							X(u, () => c.down, !0), j(u);
							var d = B(u, 2);
							X(d, () => c.cross, !0), j(d), j(s);
							var f = B(s, 2), p = R(f);
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
									onchange: (e) => vi(n, i, e)
								});
							}
							j(f);
							var m = B(f, 2), h = (e) => {
								var t = lo();
								Z(t), H(() => Q(t, W(r).href ?? "")), G("change", t, (e) => yi(n, i, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), j(a), H(() => {
								Q(o, W(r).label), u.disabled = i === W(t).links.length - 1;
							}), G("input", o, (e) => _i(n, i, e.target.value)), G("click", l, () => gi(n, i, -1)), G("click", u, () => gi(n, i, 1)), G("click", d, () => hi(n, i)), q(e, a);
						}), H(() => {
							Q(a, W(t).title), u.disabled = n === W(D).footer.columns.length - 1;
						}), G("input", a, (e) => di(n, e.target.value)), G("click", s, () => pi(n)), G("click", l, () => ui(n, -1)), G("click", u, () => ui(n, 1)), G("click", d, () => li(n)), q(e, r);
					});
					var te = B(ee, 2), ne = B(te, 2), re = B(R(ne));
					{
						let e = /* @__PURE__ */ P(() => W(D).footer?.columnsAlign ?? "left");
						$(re, {
							get value() {
								return W(e);
							},
							options: [["left", "Venstre"], ["center", "Midtstilt"]],
							onchange: (e) => ei(e)
						});
					}
					j(ne), j(C), j(S);
					var ie = B(S, 2), w = B(R(ie), 2), T = R(w);
					zr(T, 17, () => W(D).footer?.social ?? [], Fr, (e, t, n) => {
						var r = Is(), i = R(r), a = R(i);
						X(a, () => Hi(W(t).icon) || "", !0), j(a), $(B(a, 2), {
							get value() {
								return W(t).icon;
							},
							title: "Ikon",
							get options() {
								return Ti;
							},
							onchange: (e) => Ci(n, e)
						}), j(i);
						var o = B(i, 2), s = R(o);
						s.disabled = n === 0, X(s, () => c.up, !0), j(s);
						var l = B(s, 2);
						X(l, () => c.down, !0), j(l);
						var u = B(l, 2);
						X(u, () => c.cross, !0), j(u), j(o);
						var d = B(o, 2);
						Z(d), j(r), H(() => {
							l.disabled = n === W(D).footer.social.length - 1, Q(d, W(t).url);
						}), G("click", s, () => Si(n, -1)), G("click", l, () => Si(n, 1)), G("click", u, () => xi(n)), G("change", d, (e) => wi(n, e.target.value)), q(e, r);
					});
					var E = B(T, 2);
					j(w), j(ie);
					var ae = B(ie, 2), oe = B(R(ae), 2), se = R(oe), ce = R(se);
					Z(ce), M(), j(se);
					var O = B(se, 2), le = (e) => {
						let t = /* @__PURE__ */ P(() => W(D).footer.cta);
						var n = Bs(), r = z(n), i = B(R(r));
						{
							let e = /* @__PURE__ */ P(() => W(t).kind ?? "button");
							$(i, {
								get value() {
									return W(e);
								},
								options: [["button", "Knapp (lenke)"], ["newsletter", "Nyhetsbrev (e-post)"]],
								onchange: (e) => ni("kind", e)
							});
						}
						j(r);
						var a = B(r, 2), o = R(a);
						Z(o), M(), j(a);
						var s = B(a, 2), c = B(R(s));
						Z(c), j(s);
						var l = B(s, 2), u = B(R(l));
						Z(u), j(l);
						var d = B(l, 2), f = B(R(d));
						Z(f), j(d);
						var p = B(d, 2), m = (e) => {
							var n = Rs(), r = z(n), i = B(R(r));
							{
								let e = /* @__PURE__ */ P(() => W(t).page ?? "__href"), n = /* @__PURE__ */ P(() => [...W(D).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke / mailto"]]);
								$(i, {
									get value() {
										return W(e);
									},
									get options() {
										return W(n);
									},
									onchange: (e) => ai(e)
								});
							}
							j(r);
							var a = B(r, 2), o = (e) => {
								var n = Ls();
								Z(n), H(() => Q(n, W(t).href ?? "")), G("change", n, (e) => ni("href", e.target.value)), q(e, n);
							};
							Y(a, (e) => {
								W(t).page || e(o);
							}), q(e, n);
						}, h = (e) => {
							var n = zs(), r = z(n), i = B(R(r));
							Z(i), j(r);
							var a = B(r, 2), o = B(R(a));
							Z(o), j(a);
							var s = B(a, 2), c = B(R(s));
							Z(c), j(s), H(() => {
								Q(i, W(t).endpoint ?? ""), Q(o, W(t).recipient ?? ""), Q(c, W(t).success ?? "");
							}), G("change", i, (e) => ni("endpoint", e.target.value)), G("change", o, (e) => ni("recipient", e.target.value)), G("input", c, (e) => ni("success", e.target.value)), q(e, n);
						};
						Y(p, (e) => {
							(W(t).kind ?? "button") === "button" ? e(m) : e(h, -1);
						}), H(() => {
							ri(o, W(t).big === !0), Q(c, W(t).heading ?? ""), Q(u, W(t).sub ?? ""), Q(f, W(t).label ?? "");
						}), G("change", o, (e) => ni("big", e.target.checked)), G("input", c, (e) => ni("heading", e.target.value)), G("input", u, (e) => ni("sub", e.target.value)), G("input", f, (e) => ni("label", e.target.value)), q(e, n);
					};
					Y(O, (e) => {
						W(D).footer?.cta && e(le);
					}), j(oe), j(ae);
					var ue = B(ae, 2), de = B(R(ue), 2), fe = R(de);
					r(fe, () => "linkRow", () => W(D).footer?.linkRow ?? []);
					var pe = B(fe, 2);
					j(de), j(ue);
					var me = B(ue, 2), he = B(R(me), 2), ge = R(he), _e = B(R(ge));
					{
						let e = /* @__PURE__ */ P(() => W(D).footer?.align ?? "left");
						$(_e, {
							get value() {
								return W(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => Pr("footer", (t) => {
								t.align = e;
							})
						});
					}
					j(ge);
					var ve = B(ge, 6);
					n(ve, () => Mt, () => W(D).footer?.background?.layers ?? []), j(he), j(me);
					var ye = B(me, 2), be = B(R(ye), 2), xe = R(be), Se = B(R(xe));
					Z(Se), j(xe);
					var Ce = B(xe, 4);
					r(Ce, () => "baseline", () => W(D).footer?.baseline ?? []);
					var we = B(Ce, 2);
					j(be), j(ye), j(t), H((e, t) => {
						ri(a, e), Q(h, W(D).footer?.brand?.title ?? ""), Q(_, W(D).footer?.brand?.tagline ?? ""), ri(ce, t), Q(Se, W(D).footer?.copyright ?? "");
					}, [() => !!W(D).footer?.show, () => !!W(D).footer?.cta]), G("change", a, (e) => Pr("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", h, (e) => Ir("title", e.target.value)), G("input", _, (e) => Ir("tagline", e.target.value)), G("click", te, si), G("click", E, bi), G("change", ce, (e) => ti(e.target.checked)), G("click", pe, () => Kr("linkRow")), G("input", Se, (e) => Hr(e.target.value)), G("click", we, () => Kr("baseline")), q(e, t);
				}, v = (e) => {
					var t = qs(), n = B(R(t), 2), r = (e) => {
						var t = Hs(), n = B(R(t));
						{
							let e = /* @__PURE__ */ P(() => W(Yn) ?? ""), t = /* @__PURE__ */ P(() => [["", "Velg …"], ...W(qn).map((e) => [e, W(Jn)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => L(Yn, e || null, !0)
							});
						}
						j(t), q(e, t);
					};
					Y(n, (e) => {
						W(qn).length && e(r);
					});
					var i = B(n, 2), a = (e) => {
						let t = /* @__PURE__ */ P(() => W(Jn)[W(Yn)]);
						var n = Ks(), r = z(n), i = R(r), a = B(i, 2);
						X(a, () => c.cross, !0), j(a), j(r);
						var o = B(r, 2);
						zr(o, 19, () => W(t).entries, (e) => e.id, (e, n, r) => {
							var i = Ws(), a = R(i), o = R(a);
							j(a);
							var s = B(a, 2), l = R(s), u = R(l);
							Z(u);
							var d = B(u, 2), f = R(d);
							X(f, () => c.up, !0), j(f);
							var p = B(f, 2);
							X(p, () => c.down, !0), j(p);
							var m = B(p, 2);
							X(m, () => c.cross, !0), j(m), j(d), j(l);
							var h = B(l, 2), g = B(R(h));
							Z(g), j(h);
							var _ = B(h, 2);
							it(_);
							var v = B(_, 2), y = B(R(v));
							Z(y), j(v);
							var b = B(v, 2), x = R(b), S = R(x), C = B(S);
							j(x);
							var ee = B(x, 2), te = (e) => {
								var t = Us(), r = z(t), i = B(r, 2);
								X(i, () => c.cross, !0), j(i), H(() => ii(r, "src", W(n).image)), G("click", i, () => sr(W(Yn), W(n).id, "image", "")), q(e, t);
							};
							Y(ee, (e) => {
								W(n).image && e(te);
							}), j(b), j(s), j(i), H((e) => {
								J(o, `${e ?? ""}${W(n).date ? ` · ${W(n).date}` : ""}`), Q(u, W(n).title), f.disabled = W(r) === 0, p.disabled = W(r) === W(t).entries.length - 1, Q(g, W(n).date ?? ""), Q(_, W(n).text ?? ""), Q(y, W(n).href ?? ""), J(S, `${W(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => W(n).title.replace(/<[^>]*>/g, "")]), G("change", u, (e) => sr(W(Yn), W(n).id, "title", e.target.value || "Uten tittel")), G("click", f, () => cr(W(Yn), W(r), -1)), G("click", p, () => cr(W(Yn), W(r), 1)), G("click", m, () => lr(W(Yn), W(n).id)), G("change", g, (e) => sr(W(Yn), W(n).id, "date", e.target.value)), G("change", _, (e) => sr(W(Yn), W(n).id, "text", e.target.value)), G("change", y, (e) => sr(W(Yn), W(n).id, "href", e.target.value)), G("change", C, (e) => ur(W(Yn), W(n).id, e)), q(e, i);
						});
						var s = B(o, 2), l = (e) => {
							q(e, Gs());
						};
						Y(s, (e) => {
							W(t).entries.length || e(l);
						}), M(2), G("click", i, () => or(W(Yn))), G("click", a, () => ar(W(Yn))), q(e, n);
					};
					Y(i, (e) => {
						W(Yn) && W(Jn)[W(Yn)] && e(a);
					});
					var o = B(i, 2), s = B(R(o));
					Z(s), j(o);
					var l = B(o, 2);
					$(B(R(l)), {
						get value() {
							return W(Zn);
						},
						get options() {
							return Qn;
						},
						onchange: (e) => L(Zn, e, !0)
					}), j(l);
					var u = B(l, 2);
					j(t), H((e) => u.disabled = e, [() => !W(Xn).trim()]), G("keydown", s, (e) => e.key === "Enter" && ir()), ci(s, () => W(Xn), (e) => L(Xn, e)), G("click", u, ir), q(e, t);
				}, y = (e) => {
					var t = nc(), n = B(R(t), 2), r = (e) => {
						q(e, Js());
					}, i = /* @__PURE__ */ P(() => !Cr().length);
					Y(n, (e) => {
						W(i) && e(r);
					});
					var a = B(n, 2);
					zr(a, 16, Cr, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => hr[t]), r = /* @__PURE__ */ P(() => (W(mr)?.enabled ?? []).includes(t));
						var i = Zs();
						let a;
						var o = R(i), s = R(o), l = R(s, !0);
						j(s);
						var u = B(s, 2), d = (e) => {
							var t = Ys(), r = R(t);
							j(t), H(() => J(r, `v${W(n).version ?? ""}`)), q(e, t);
						};
						Y(u, (e) => {
							W(n)?.version && e(d);
						});
						var f = B(u, 2), p = R(f), m = R(p);
						Z(m);
						var h = B(m);
						j(p);
						var g = B(p, 2);
						X(g, () => c.cross, !0), j(g), j(f), j(o);
						var _ = B(o, 2), v = (e) => {
							var t = Xs(), r = R(t, !0);
							j(t), H((e) => J(r, e), [() => W(n).errors.join("; ")]), q(e, t);
						}, y = (e) => {
							var t = Xs(), r = R(t);
							j(t), H(() => J(r, `Krever motorversjon ${W(n).requiresEngine ?? ""} (denne siden kjører ${W(gr) ?? ""}); pluginen hoppes over ved lasting.`)), q(e, t);
						}, b = (e) => {
							var t = Xs(), r = R(t);
							j(t), H((e) => J(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(W(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(W(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), q(e, t);
						};
						Y(_, (e) => {
							W(n)?.errors?.length ? e(v) : W(n) && !W(n).satisfied ? e(y, 1) : W(n)?.csp && e(b, 2);
						}), j(i), H((e) => {
							a = Xr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": W(n)?.errors?.length }), J(l, W(n)?.name ?? t), ii(p, "title", W(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, W(r)), m.disabled = e, J(h, ` ${W(r) ? "På" : "Av"}`);
						}, [() => !!W(n)?.errors?.length]), G("change", m, (e) => Or(t, e.target.checked)), G("click", g, () => jr(t)), q(e, i);
					});
					var o = B(a, 2), s = (e) => {
						var t = $s();
						zr(B(z(t), 4), 16, () => W(xr), (e) => e, (e, t) => {
							var n = Qs(), r = R(n), i = R(r), a = R(i, !0);
							j(i);
							var o = B(i, 2), s = (e) => {
								var n = Ys(), r = R(n);
								j(n), H(() => J(r, `v${hr[t].version ?? ""}`)), q(e, n);
							};
							Y(o, (e) => {
								hr[t]?.version && e(s);
							});
							var l = B(o, 2), u = R(l);
							X(u, () => c.right, !0), j(u), j(l), j(r), j(n), H(() => J(a, hr[t]?.name ?? t)), G("click", u, () => Nr(t)), q(e, n);
						}), q(e, t);
					};
					Y(o, (e) => {
						W(xr).length && e(s);
					});
					var l = B(o, 2), u = (e) => {
						var t = kr(), n = z(t), r = (e) => {
							q(e, ec());
						};
						Y(n, (e) => {
							W(xr).length || e(r);
						}), q(e, t);
					}, d = (e) => {
						var t = tc(), n = B(z(t), 2);
						Z(n);
						var r = B(n, 2), i = B(r, 2), a = (e) => {
							var t = Xs(), n = R(t, !0);
							j(t), H(() => J(n, W(yr))), q(e, t);
						};
						Y(i, (e) => {
							W(yr) && e(a);
						}), H((e) => r.disabled = e, [() => !W(_r).trim()]), G("keydown", n, (e) => e.key === "Enter" && Mr()), ci(n, () => W(_r), (e) => L(_r, e)), G("click", r, Mr), q(e, t);
					};
					Y(l, (e) => {
						W(Sr) === "ok" ? e(u) : e(d, -1);
					}), j(t), q(e, t);
				}, b = (e) => {
					var t = sc(), n = B(R(t), 2), r = (e) => {
						q(e, rc());
					}, i = (e) => {
						var t = Xo(), n = z(t), r = (e) => {
							var t = ic(), n = R(t, !0);
							j(t), H(() => J(n, W(rn))), q(e, t);
						};
						Y(n, (e) => {
							W(rn) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = oc(), n = z(t);
							zr(B(n, 2), 19, () => W(en), (e) => e.sha, (e, t, n) => {
								var r = ac();
								let i;
								var a = R(r), o = R(a, !0);
								j(a);
								var s = B(a, 2), c = R(s);
								j(s), j(r), H((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), ii(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${sn.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), H(() => {
								n.disabled = W(an) || !W(S)?.allowed, ii(n, "title", W(S)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, ln), q(e, t);
						};
						Y(i, (e) => {
							W(en).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(en) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(s, (e) => {
					W(ke) === "Sider" ? e(l) : W(ke) === "Nav" ? e(u, 1) : W(ke) === "Tema" ? e(d, 2) : W(ke) === "Blokker" ? e(f, 3) : W(ke) === "Grid" ? e(p, 4) : W(ke) === "Egenskaper" ? e(g, 5) : W(ke) === "Footer" ? e(_, 6) : W(ke) === "Samlinger" ? e(v, 7) : W(ke) === "Plugins" ? e(y, 8) : W(ke) === "Historikk" && e(b, 9);
				}), j(t), H(() => J(o, W(ke))), q(e, t);
			};
			Y(o, (e) => {
				W(ke) && e(s);
			}), q(e, t);
		};
		Y(i, (e) => {
			W(ee) && e(o);
		});
		var s = B(i, 2);
		let l;
		var u = R(s);
		fi(u, (e) => L(x, e), () => W(x)), j(s), j(t), H(() => {
			l = Xr(s, 1, "frame-wrap svelte-1n46o8q", null, l, { mobile: W(te) === "mobile" }), ii(u, "src", `/?page=${W(h)}&preview=1`);
		}), br("load", u, mn), vr(u), q(e, t);
	}, qc = (e) => {
		q(e, dc());
	};
	Y(Gc, (e) => {
		W(p) ? e(Kc) : e(qc, -1);
	});
	var Jc = B(Gc, 2), Yc = (e) => {
		aa(e, {
			get image() {
				return W(jn);
			},
			onapply: Nn,
			oncancel: () => L(jn, null)
		});
	};
	Y(Jc, (e) => {
		W(jn) && e(Yc);
	});
	var Xc = B(Jc, 2), Zc = (e) => {
		var t = pc(), n = R(t), r = R(n), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		zr(a, 16, () => W(be).lines, (e) => e, (e, t) => {
			var n = fc(), r = R(n, !0);
			j(n), H(() => J(r, t)), q(e, n);
		});
		var o = B(a, 2), s = R(o), c = R(s, !0);
		j(s);
		var l = B(s, 2), u = R(l, !0);
		j(l), j(o), j(n), j(t), H(() => {
			J(i, W(be).title), J(c, W(be).cancelLabel), J(u, W(be).okLabel);
		}), G("click", s, () => Se(!1)), G("click", l, () => Se(!0)), q(e, t);
	};
	Y(Xc, (e) => {
		W(be) && e(Zc);
	});
	var Qc = B(Xc, 2), $c = (e) => {
		var t = mc(), n = R(t), r = B(R(n), 4), i = B(R(r));
		Z(i), j(r);
		var a = B(r, 2);
		Ei(B(R(a)), {
			get value() {
				return W(Te);
			},
			label: "Aksentfarge",
			onchange: (e) => L(Te, e, !0)
		}), j(a);
		var o = B(a, 2);
		Ei(B(R(o)), {
			get value() {
				return W(Ee);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => L(Ee, e, !0)
		}), j(o);
		var s = B(o, 4), c = R(s), l = B(c, 2);
		j(s), j(n), j(t), H((e) => l.disabled = e, [() => !W(we).trim()]), G("keydown", i, (e) => e.key === "Enter" && Oe()), ci(i, () => W(we), (e) => L(we, e)), G("click", c, De), G("click", l, Oe), q(e, t);
	};
	Y(Qc, (e) => {
		W(Ce) && e($c);
	});
	var el = B(Qc, 2), tl = (e) => {
		var t = hc();
		let n;
		var r = R(t), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		j(t), H(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(v) === "ok",
				error: W(v) === "error"
			}), J(i, W(_));
		}), G("click", a, () => b("")), q(e, t);
	};
	Y(el, (e) => {
		W(_) && e(tl);
	}), j(kc);
	var nl = B(kc, 2), rl = (e) => {
		var t = gc(), n = R(t), r = R(n), i = R(r);
		j(r);
		var o = B(r, 2);
		X(o, () => c.cross, !0), j(o), j(n);
		var s = B(n, 2), l = R(s);
		a(l), j(s), j(t), H(() => {
			Qr(t, `left: ${W(Pe).left ?? ""}px; top: ${W(Pe).top ?? ""}px`), J(i, `${Ye[W(A).type] ?? W(A).type ?? ""}-blokk`);
		}), G("click", o, () => L(Pe, null)), q(e, t);
	};
	Y(nl, (e) => {
		W(Pe) && W(A) && e(rl);
	}), H(() => Nc = Xr(Mc, 1, "topbar svelte-1n46o8q", null, Nc, { hidden: !W(ee) })), q(e, Oc), Ue();
}
xr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]);
//#endregion
//#region src/main.js
var yc = Ar(vc, { target: document.getElementById("urd-admin") });
//#endregion
export { yc as default };
